import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
    Points,
    ShaderMaterial,
    Vector3,
    AdditiveBlending,
    BufferGeometry,
    Float32BufferAttribute,
} from "three";
import * as THREE from "three";

interface RocketCubeEmissionsProps {
    rocketPosition: Vector3;
    rocketRotation: Vector3;
    intensity?: number;
    cubeCount?: number;
    emissionSpeed?: number;
    cubeSize?: number;
    color?: string;
    trailLength?: number;
    emissionOffset?: Vector3;
    emissionRotation?: Vector3;
    emissionScale?: number;
    floatXScaler?: number;
    floatXIntensity?: number;
    floatSpeed?: number;
    floatIntensity?: number;
    floatYScaler?: number;
    thrustPhase?: "fast" | "slow";
}

const RocketCubeEmissions: React.FC<RocketCubeEmissionsProps> = ({
    rocketPosition,
    rocketRotation,
    intensity = 1.0,
    cubeCount = 275,
    emissionSpeed = 2.0,
    cubeSize = 0.08,
    color = "#ff4400",
    trailLength = 4.0,
    emissionOffset = new Vector3(-0.6, 0, 0),
    emissionRotation = new Vector3(0, 0, 0),
    emissionScale = 1.0,
    floatXScaler = 0.8,
    floatXIntensity = 0.35,
    floatSpeed = 1.0,
    floatIntensity = 2.0,
    floatYScaler = 0.3,
    thrustPhase = "slow",
}) => {
    const pointsRef = useRef<Points>(null);
    const materialRef = useRef<ShaderMaterial>(null);

    // Vertex shader for cube emissions
    const vertexShader = `
    uniform float time;
    uniform float cubeSize;
    uniform vec3 rocketPosition;
    uniform vec3 rocketRotation;
    uniform float emissionSpeed;
    uniform float trailLength;
    uniform vec3 emissionOffset;
    uniform vec3 emissionRotation;
    uniform float emissionScale;
    uniform float floatXScaler;
    uniform float floatXIntensity;
    uniform float floatSpeed;
    uniform float floatIntensity;
    uniform float floatYScaler;
    uniform float colorMix;
    
    attribute float cubeId;
    attribute float startTime;
    attribute vec3 initialVelocity;
    attribute float cubeRotation;
    
    varying float vLife;
    varying float vIntensity;
    varying vec3 vWorldPos;
    varying float vCubeRotation;
    
    mat3 rotationMatrix(vec3 axis, float angle) {
      axis = normalize(axis);
      float s = sin(angle);
      float c = cos(angle);
      float oc = 1.0 - c;
      
      return mat3(
        oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c
      );
    }
    
    void main() {
      float life = mod(time * emissionSpeed + startTime, trailLength);
      vLife = life / trailLength;
      
      // Rocket transform
      mat3 rocketRot = rotationMatrix(vec3(1.0, 0.0, 0.0), rocketRotation.x) *
                       rotationMatrix(vec3(0.0, 1.0, 0.0), rocketRotation.y) *
                       rotationMatrix(vec3(0.0, 0.0, 1.0), rocketRotation.z);
      
      // Apply emission offset and rotation
      mat3 emissionRot = rotationMatrix(vec3(1.0, 0.0, 0.0), emissionRotation.x) *
                         rotationMatrix(vec3(0.0, 1.0, 0.0), emissionRotation.y) *
                         rotationMatrix(vec3(0.0, 0.0, 1.0), emissionRotation.z);
      
      // Create emission point - completely static position, no vertical bobbing
      vec3 baseRocketPos = vec3(0.0, 0.0, rocketPosition.z);
      vec3 emissionPoint = baseRocketPos + rocketRot * (emissionOffset * emissionScale);
      
      // Initial velocity with spread and emission rotation
      vec3 velocity = rocketRot * emissionRot * vec3(-1.5, 0.0, 0.0) * emissionScale + initialVelocity * 0.8;
      
      // Cube position over time
      vec3 pos = emissionPoint + velocity * life;
      
      // Apply dampened floatX thrust movement to particles
      // Calculate the thrust wave similar to rocket's floatX animation
      float thrustTime = time * 1.0; // Match rocket's floatSpeed
      float cycle = mod(thrustTime, 6.283185); // 2π cycle
      float thrustWave = 0.0;
      
      if (cycle < 0.942) { // 30% of cycle (fast thrust)
        float fastPhase = cycle / 0.942;
        thrustWave = sin(fastPhase * 3.14159) * floatXIntensity;
      } else { // 70% of cycle (slow drift)
        float slowPhase = (cycle - 0.942) / 5.341;
        thrustWave = sin(3.14159 + slowPhase * 3.14159) * floatXIntensity;
      }
      
      // DAMPEN the amplitude of the thrust wave for better alignment
      // This reduces both the left AND right movement proportionally
      float dampenedThrust = thrustWave * floatXScaler;
      float particleThrust = dampenedThrust * (1.0 - vLife * 0.3);
      pos.x += particleThrust;
      
      // Add gravity and turbulence
      pos.y -= life * life * 0.4;
      pos += sin(time * 3.0 + cubeId * 0.5) * 0.1 * life;
      
      vWorldPos = pos;
      vCubeRotation = cubeRotation + time * 2.0;
      vIntensity = 1.0 - vLife;
      vIntensity *= vIntensity; // Quadratic falloff
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = cubeSize * 300.0 * vIntensity * emissionScale / (-mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

    // Fragment shader with mBox distance field
    const fragmentShader = `
    uniform float time;
    uniform vec3 cubeColor;
    uniform vec3 thrustColor;
    uniform float colorMix;
    uniform float intensity;
    
    varying float vLife;
    varying float vIntensity;
    varying vec3 vWorldPos;
    varying float vCubeRotation;
    
    // Your mBox distance field function
    float mBox(vec3 p, vec3 b) {
      return max(max(abs(p.x) - b.x, abs(p.y) - b.y), abs(p.z) - b.z);
    }
    
    // 2D rotation
    vec2 rotate(vec2 v, float a) {
      float s = sin(a);
      float c = cos(a);
      mat2 m = mat2(c, -s, s, c);
      return m * v;
    }
    
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      
      // Create 3D cube using mBox
      vec3 p = vec3(uv * 2.0, 0.0);
      
      // Rotate the cube
      p.xy = rotate(p.xy, vCubeRotation);
      p.xz = rotate(p.xz, vCubeRotation * 0.7);
      
      // Create cube shape
      float cube = mBox(p, vec3(0.3));
      
      // Create multiple cube outlines for depth
      float outline1 = mBox(p, vec3(0.25));
      float outline2 = mBox(p, vec3(0.2));
      float core = mBox(p, vec3(0.15));
      
      // Distance to edge for anti-aliasing
      float edge = 1.0 - smoothstep(0.0, 0.05, abs(cube));
      float innerEdge = 1.0 - smoothstep(0.0, 0.03, abs(outline1));
      float coreEdge = 1.0 - smoothstep(0.0, 0.02, abs(core));
      
      // Combine edges
      float mask = edge + innerEdge * 0.5 + coreEdge * 0.8;
      
      // Energy pulse
      float pulse = sin(time * 8.0 + vLife * 15.0) * 0.3 + 0.7;
      
      // Smooth color mixing between base and thrust colors
      vec3 baseColor = mix(cubeColor, thrustColor, colorMix);
      vec3 hotColor = baseColor;
      vec3 coolColor = baseColor * 0.4;
      vec3 color = mix(coolColor, hotColor, vIntensity * pulse);
      
      // Add white hot core
      color = mix(color, vec3(1.0, 0.9, 0.7), coreEdge * vIntensity * 0.6);
      
      float alpha = mask * vIntensity * intensity * pulse;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

    // Create geometry with cube attributes
    const { geometry, material } = useMemo(() => {
        const geo = new BufferGeometry();
        const positions = new Float32Array(cubeCount * 3);
        const cubeIds = new Float32Array(cubeCount);
        const startTimes = new Float32Array(cubeCount);
        const initialVelocities = new Float32Array(cubeCount * 3);
        const cubeRotations = new Float32Array(cubeCount);

        for (let i = 0; i < cubeCount; i++) {
            // Initial positions (overridden by shader)
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;

            cubeIds[i] = i;
            startTimes[i] = Math.random() * trailLength;
            cubeRotations[i] = Math.random() * Math.PI * 2;

            // Random emission spread
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * Math.PI * 0.5;
            const spread = 0.3;

            initialVelocities[i * 3] = Math.cos(phi) * Math.cos(theta) * spread;
            initialVelocities[i * 3 + 1] = Math.sin(phi) * spread;
            initialVelocities[i * 3 + 2] =
                Math.cos(phi) * Math.sin(theta) * spread;
        }

        geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
        geo.setAttribute("cubeId", new Float32BufferAttribute(cubeIds, 1));
        geo.setAttribute(
            "startTime",
            new Float32BufferAttribute(startTimes, 1)
        );
        geo.setAttribute(
            "initialVelocity",
            new Float32BufferAttribute(initialVelocities, 3)
        );
        geo.setAttribute(
            "cubeRotation",
            new Float32BufferAttribute(cubeRotations, 1)
        );

        const mat = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0 },
                cubeSize: { value: cubeSize },
                rocketPosition: { value: rocketPosition.clone() },
                rocketRotation: { value: rocketRotation.clone() },
                emissionSpeed: { value: emissionSpeed },
                trailLength: { value: trailLength },
                cubeColor: { value: new THREE.Color(color) },
                thrustColor: { value: new THREE.Color("#00bcff") },
                colorMix: { value: 0.0 },
                intensity: { value: intensity },
                emissionOffset: { value: emissionOffset.clone() },
                emissionRotation: { value: emissionRotation.clone() },
                emissionScale: { value: emissionScale },
                floatXScaler: { value: floatXScaler },
                floatXIntensity: { value: floatXIntensity },
                floatSpeed: { value: floatSpeed },
                floatIntensity: { value: floatIntensity },
                floatYScaler: { value: floatYScaler },
            },
            transparent: true,
            blending: AdditiveBlending,
            depthWrite: false,
        });

        return { geometry: geo, material: mat };
    }, [cubeCount, cubeSize, emissionSpeed, trailLength, color, intensity]);

    // Update uniforms
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.elapsedTime;
            materialRef.current.uniforms.rocketPosition.value.copy(
                rocketPosition
            );
            materialRef.current.uniforms.rocketRotation.value.copy(
                rocketRotation
            );

            // Calculate smooth thrust wave for color mixing (0-1)
            const time = state.clock.elapsedTime * floatSpeed;
            const cycle = time % (2 * Math.PI);
            let thrustWave = 0;

            if (cycle < Math.PI * 0.3) {
                // Fast thrust phase
                const fastPhase = cycle / (Math.PI * 0.3);
                thrustWave = Math.sin(fastPhase * Math.PI);
            } else {
                // Slow drift phase
                const slowPhase = (cycle - Math.PI * 0.3) / (Math.PI * 1.7);
                thrustWave = Math.sin(Math.PI + slowPhase * Math.PI);
            }

            // Convert to smooth 0-1 mix factor
            const colorMixValue = Math.max(0, thrustWave);

            // Dynamic thrust-based properties
            const currentSpeed =
                thrustPhase === "fast" ? emissionSpeed + 1 : emissionSpeed;
            const currentTrailLength =
                thrustPhase === "fast" ? 0.2 : trailLength;

            materialRef.current.uniforms.emissionSpeed.value = currentSpeed;
            materialRef.current.uniforms.trailLength.value = currentTrailLength;
            materialRef.current.uniforms.colorMix.value = colorMixValue;
            materialRef.current.uniforms.intensity.value = intensity;
            materialRef.current.uniforms.cubeSize.value = cubeSize;
            materialRef.current.uniforms.emissionOffset.value.copy(
                emissionOffset
            );
            materialRef.current.uniforms.emissionRotation.value.copy(
                emissionRotation
            );
            materialRef.current.uniforms.emissionScale.value = emissionScale;
            materialRef.current.uniforms.floatXScaler.value = floatXScaler;
            materialRef.current.uniforms.floatXIntensity.value =
                floatXIntensity;
            materialRef.current.uniforms.floatSpeed.value = floatSpeed;
            materialRef.current.uniforms.floatIntensity.value = floatIntensity;
            materialRef.current.uniforms.floatYScaler.value = floatYScaler;
            materialRef.current.uniforms.colorMix.value = colorMixValue;
        }
    });

    return (
        <points ref={pointsRef}>
            <primitive object={geometry} />
            <primitive object={material} ref={materialRef} />
        </points>
    );
};

export default RocketCubeEmissions;
