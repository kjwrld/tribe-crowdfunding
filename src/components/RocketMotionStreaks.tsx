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

interface RocketMotionStreaksProps {
    rocketPosition: Vector3;
    rocketRotation: Vector3;
    intensity?: number;
    streakCount?: number;
    streakSpeed?: number;
    streakLength?: number;
    streakWidth?: number;
    color?: string;
    trailDistance?: number;
    streakOffset?: Vector3;
    streakRotation?: Vector3;
    streakSpreadY?: number;
    streakSpreadZ?: number;
    streakLifespan?: number;
    thrustPhase?: "fast" | "slow";
}

const RocketMotionStreaks: React.FC<RocketMotionStreaksProps> = ({
    rocketPosition,
    rocketRotation,
    intensity = 1.0,
    streakCount = 80,
    streakSpeed = 10.0,
    streakLength = 5.0,
    streakWidth = 0.02,
    color = "#00aaff",
    trailDistance = 8.0,
    streakOffset = new Vector3(0, 0, 0),
    streakRotation = new Vector3(0, 0, 0),
    streakSpreadY = 0.4,
    streakSpreadZ = 0.2,
    streakLifespan = 0.36,
    thrustPhase = "slow",
}) => {
    const pointsRef = useRef<Points>(null);
    const materialRef = useRef<ShaderMaterial>(null);

    // Vertex shader for motion streaks
    const vertexShader = `
    uniform float time;
    uniform float streakSpeed;
    uniform float dynamicStreakSpeed;
    uniform float streakLength;
    uniform float streakLifespan;
    uniform float trailDistance;
    uniform float streakVisibility;
    uniform vec3 rocketPosition;
    uniform vec3 rocketRotation;
    uniform vec3 streakOffset;
    uniform vec3 streakRotation;
    uniform float streakSpreadY;
    uniform float streakSpreadZ;
    
    attribute float streakId;
    attribute float startTime;
    attribute vec3 initialPosition;
    attribute float streakLife;
    
    varying float vLife;
    varying float vIntensity;
    varying vec3 vWorldPos;
    
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
      // Calculate streak lifecycle with dynamic speed
      float life = mod(time * dynamicStreakSpeed + startTime, streakLife);
      vLife = life / streakLife;
      
      // Calculate lifespan-based fade using the actual particle life
      // vLife goes from 0 to 1 over the particle's lifetime
      // Apply the lifespan control to determine when particles should start fading
      float normalizedLifespan = streakLifespan / streakLife; // How much of the streak cycle should the particle live
      float lifeFade = 1.0;
      
      if (normalizedLifespan < 1.0) {
        // If lifespan is shorter than full cycle, fade out early
        lifeFade = 1.0 - smoothstep(normalizedLifespan * 0.7, normalizedLifespan, vLife);
      }
      
      // Rocket transform
      mat3 rocketRot = rotationMatrix(vec3(1.0, 0.0, 0.0), rocketRotation.x) *
                       rotationMatrix(vec3(0.0, 1.0, 0.0), rocketRotation.y) *
                       rotationMatrix(vec3(0.0, 0.0, 1.0), rocketRotation.z);
      
      // Streak rotation
      mat3 streakRot = rotationMatrix(vec3(1.0, 0.0, 0.0), streakRotation.x) *
                       rotationMatrix(vec3(0.0, 1.0, 0.0), streakRotation.y) *
                       rotationMatrix(vec3(0.0, 0.0, 1.0), streakRotation.z);
      
      // Apply streak offset relative to rocket
      vec3 offsetPos = rocketPosition + rocketRot * streakOffset;
      
      // Apply controlled spread using the spread parameters
      vec3 spreadPos = initialPosition;
      spreadPos.y *= streakSpreadY;
      spreadPos.z *= streakSpreadZ;
      
      // Start streaks behind the offset position
      vec3 startPos = offsetPos + rocketRot * streakRot * vec3(-trailDistance, 0.0, 0.0) + rocketRot * streakRot * spreadPos;
      
      // Move streaks in the direction determined by rotations
      vec3 velocity = rocketRot * streakRot * vec3(dynamicStreakSpeed * 2.0, 0.0, 0.0);
      vec3 pos = startPos + velocity * life;
      
      vWorldPos = pos;
      vIntensity = (1.0 - vLife) * streakVisibility * lifeFade;
      
      // Fade out as streaks get farther from rocket
      float distanceFromRocket = length(pos - rocketPosition);
      vIntensity *= smoothstep(15.0, 8.0, distanceFromRocket);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (streakLength * 100.0 * vIntensity) / (-mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

    // Fragment shader for motion streaks
    const fragmentShader = `
    uniform float time;
    uniform vec3 streakColor;
    uniform float intensity;
    uniform vec3 streakRotation;
    
    varying float vLife;
    varying float vIntensity;
    varying vec3 vWorldPos;
    
    // 2D rotation function
    vec2 rotate2D(vec2 v, float angle) {
      float s = sin(angle);
      float c = cos(angle);
      mat2 m = mat2(c, -s, s, c);
      return m * v;
    }
    
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      
      // Apply streak rotation to the UV coordinates
      // Use the Z rotation to rotate the streak lines to match movement direction
      uv = rotate2D(uv, streakRotation.z);
      
      // Create horizontal streak shape (now rotated)
      float streak = 1.0 - smoothstep(0.0, 0.1, abs(uv.y));
      streak *= smoothstep(0.5, 0.2, abs(uv.x));
      
      // Add some glow
      float glow = exp(-length(uv) * 4.0);
      
      // Combine streak and glow
      float mask = streak + glow * 0.3;
      
      // Pulsing effect
      float pulse = sin(time * 8.0 + vLife * 10.0) * 0.2 + 0.8;
      
      // Color with intensity
      vec3 color = streakColor * pulse;
      
      float alpha = mask * vIntensity * intensity;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

    // Create geometry with streak attributes
    const { geometry, material } = useMemo(() => {
        const geo = new BufferGeometry();
        const positions = new Float32Array(streakCount * 3);
        const streakIds = new Float32Array(streakCount);
        const startTimes = new Float32Array(streakCount);
        const initialPositions = new Float32Array(streakCount * 3);
        const streakLives = new Float32Array(streakCount);

        for (let i = 0; i < streakCount; i++) {
            // Initial positions (overridden by shader)
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;

            streakIds[i] = i;
            startTimes[i] = Math.random() * streakLength;
            streakLives[i] = streakLength + Math.random() * 2.0;

            // Random vertical and depth spread around rocket
            initialPositions[i * 3] = (Math.random() - 0.5) * 1.0; // X spread
            initialPositions[i * 3 + 1] = (Math.random() - 0.5) * 2.0; // Y spread (will be multiplied by streakSpreadY)
            initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 2.0; // Z spread (will be multiplied by streakSpreadZ)
        }

        geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
        geo.setAttribute("streakId", new Float32BufferAttribute(streakIds, 1));
        geo.setAttribute(
            "startTime",
            new Float32BufferAttribute(startTimes, 1)
        );
        geo.setAttribute(
            "initialPosition",
            new Float32BufferAttribute(initialPositions, 3)
        );
        geo.setAttribute(
            "streakLife",
            new Float32BufferAttribute(streakLives, 1)
        );

        const mat = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0 },
                streakSpeed: { value: streakSpeed },
                dynamicStreakSpeed: { value: streakSpeed },
                streakLength: { value: streakLength },
                streakLifespan: { value: streakLifespan },
                trailDistance: { value: trailDistance },
                streakVisibility: { value: 1.0 },
                rocketPosition: { value: rocketPosition.clone() },
                rocketRotation: { value: new THREE.Vector3() },
                streakOffset: { value: streakOffset.clone() },
                streakRotation: { value: streakRotation.clone() },
                streakSpreadY: { value: streakSpreadY },
                streakSpreadZ: { value: streakSpreadZ },
                streakColor: { value: new THREE.Color(color) },
                intensity: { value: intensity },
            },
            transparent: true,
            blending: AdditiveBlending,
            depthWrite: false,
        });

        return { geometry: geo, material: mat };
    }, [
        streakCount,
        streakSpeed,
        streakLength,
        trailDistance,
        color,
        intensity,
    ]);

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
            materialRef.current.uniforms.streakOffset.value.copy(streakOffset);
            materialRef.current.uniforms.streakRotation.value.copy(
                streakRotation
            );
            materialRef.current.uniforms.streakSpreadY.value = streakSpreadY;
            materialRef.current.uniforms.streakSpreadZ.value = streakSpreadZ;
            materialRef.current.uniforms.streakSpeed.value = streakSpeed;
            materialRef.current.uniforms.streakLength.value = streakLength;
            materialRef.current.uniforms.streakLifespan.value = streakLifespan;
            materialRef.current.uniforms.trailDistance.value = trailDistance;
            materialRef.current.uniforms.intensity.value = intensity;

            // Dynamic thrust-based properties
            const time = state.clock.elapsedTime;
            const cycle = (time * 1.0) % (2 * Math.PI); // Match rocket's floatSpeed

            if (thrustPhase === "fast") {
                // Fast thrust: Keep streaks invisible
                materialRef.current.uniforms.streakVisibility.value =
                    25 / streakCount;
                materialRef.current.uniforms.dynamicStreakSpeed.value = 4.0;
                materialRef.current.uniforms.intensity.value = 0.0; // Completely invisible during thrust
            } else {
                // Slow drift: Handle pre-thrust fade and post-thrust restoration
                const preThrust = cycle > 2 * Math.PI - Math.PI * 0.08; // Fade in last 8% before thrust

                if (preThrust) {
                    // Pre-thrust fade out - start fading before thrust begins
                    const fadeProgress =
                        (cycle - (2 * Math.PI - Math.PI * 0.08)) /
                        (Math.PI * 0.08);
                    materialRef.current.uniforms.dynamicStreakSpeed.value = 4.0;
                    materialRef.current.uniforms.streakVisibility.value =
                        25 / streakCount;
                    materialRef.current.uniforms.intensity.value =
                        intensity * (1.0 - fadeProgress);
                } else if (cycle < Math.PI * 0.3) {
                    // Just after thrust phase - start with high intensity and speed
                    const progress = cycle / (Math.PI * 0.3); // 0 to 1
                    const easedProgress = 1.0 - Math.pow(1.0 - progress, 3); // Ease out cubic

                    // Start even higher speed (8.0) and ease down to 1.4
                    materialRef.current.uniforms.dynamicStreakSpeed.value =
                        8.0 - 6.6 * easedProgress;
                    // Ease from 65 to 25 streaks (more dramatic)
                    materialRef.current.uniforms.streakVisibility.value =
                        (65 - 40 * easedProgress) / streakCount;
                    // Quick but smooth intensity restoration over first 25% of slow phase
                    const intensityProgress = Math.min(1.0, progress * 4.0);
                    const smoothIntensity =
                        intensityProgress *
                        intensityProgress *
                        (3.0 - 2.0 * intensityProgress); // Smoothstep
                    materialRef.current.uniforms.intensity.value =
                        intensity * smoothIntensity;
                } else {
                    // Normal drift phase - maintain 25 streaks at 1.4 speed
                    materialRef.current.uniforms.dynamicStreakSpeed.value = 4.0;
                    materialRef.current.uniforms.streakVisibility.value =
                        25 / streakCount;
                    materialRef.current.uniforms.intensity.value = intensity;
                }
            }
        }
    });

    return (
        <points ref={pointsRef}>
            <primitive object={geometry} />
            <primitive object={material} ref={materialRef} />
        </points>
    );
};

export default RocketMotionStreaks;
