import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { rocketSettings } from "../config/rocketSettings";
import { useState, useEffect } from "react";
import RocketCubeEmissions from "./RocketCubeEmissions";
import RocketMotionStreaks from "./RocketMotionStreaks";
import { modelPreloader } from "../services/ModelPreloader";

// Constants to replace Leva controls
const ROCKET_CONTROLS = {
    // Position
    positionX: 0.7,
    positionY: -0.7,
    positionZ: 0.4,
    // Rotation (static)
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0.6,
    // Scale
    scaleControl: 1.6,
    // Animation
    animationSpeed: 0.1,
    rotationIntensity: 0,
    floatSpeed: 1,
    floatIntensity: 2,
    floatXIntensity: 0.35,
};

const CUBE_EMISSIONS_CONTROLS = {
    enableCubeEmissions: true,
    cubeIntensity: 0.45,
    cubeCount: 275,
    cubeSize: 0.08,
    cubeSpeed: 3.5,
    cubeColor: "#ff7c00",
    cubeTrailLength: 0.3,
    emissionPosX: 0.1,
    emissionPosY: -0.1,
    emissionPosZ: -0.16,
    emissionRotX: -1.08,
    emissionRotY: -2.25,
    emissionRotZ: -0.31,
    emissionScale: 1.0,
    floatXScaler: 0.0,
    floatYScaler: 0.3,
};

const MATERIAL_CONTROLS = {
    enableMetallic: true,
    metalness: 0.67,
    roughness: 0.37,
    reflectivity: 0.38,
    materialColor: "#b1b1b1",
    emissive: "#000000",
    emissiveIntensity: 0,
};

const MOTION_STREAK_CONTROLS = {
    enableMotionStreaks: true,
    streakIntensity: 1.75,
    streakCount: 50,
    streakSpeed: 10,
    streakLength: 5.5,
    streakWidth: 0.013,
    streakColor: "#ffffed",
    trailDistance: 6.0,
    streakPosX: 2.54,
    streakPosY: -4.16,
    streakPosZ: -0.29,
    streakRotX: 0,
    streakRotY: 0,
    streakRotZ: 0.94,
    streakSpreadY: 0.4,
    streakSpreadZ: 0.2,
    streakLifespan: 0.13,
};

const SCENE_CONTROLS = {
    // Camera
    cameraX: 0,
    cameraY: 0,
    cameraZ: 5,
    fov: 50,
    // Ambient light
    ambientIntensity: 5,
    ambientColor: "#ffffff",
    // Directional light
    dirIntensity: 10,
    dirPositionX: 7,
    dirPositionY: 4.5,
    dirPositionZ: 2,
    dirColor: "#0300ff",
    // Point light
    pointIntensity: 5,
    pointPositionX: 1,
    pointPositionY: 0,
    pointPositionZ: -0.5,
    pointColor: "#00b2ff",
    // Second Point light
    point2Intensity: 2.6,
    point2PositionX: -0.5,
    point2PositionY: -0.5,
    point2PositionZ: 2,
    point2Color: "#0d00ff",
    // Environment
    environmentPreset: "warehouse" as const,
};

// 3D Rocket component with modular settings
function Rocket() {
    const rocketRef = useRef<THREE.Group>(null);
    const [gltf, setGltf] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Track rocket position and rotation for effects
    const rocketPosition = useRef(new THREE.Vector3());
    const rocketRotation = useRef(new THREE.Vector3());

    // Thrust animation state
    const [thrustPhase, setThrustPhase] = useState<"fast" | "slow">("slow");

    // Dynamic scale based on screen size
    const [scale, setScale] = useState(rocketSettings.scale);
    const [responsiveCubeSize, setResponsiveCubeSize] = useState(0.68);

    // Load model from preloader
    useEffect(() => {
        const loadModel = async () => {
            try {
                // Check if model is already preloaded
                if (modelPreloader.isModelReady('rocket')) {
                    const model = modelPreloader.getModel('rocket');
                    setGltf(model);
                    setIsLoaded(true);
                } else {
                    // If not preloaded yet, wait for it
                    const model = await modelPreloader.preloadModel('/models/rocket-draco.glb', 'rocket');
                    setGltf(model);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error('Rocket Component: Preloader failed, using fallback:', error);
                // Fallback to useGLTF if preloader fails
                try {
                    const { useGLTF } = await import("@react-three/drei");
                    const fallbackGltf = useGLTF("/models/rocket-draco.glb");
                    setGltf(fallbackGltf);
                    setIsLoaded(true);
                } catch (fallbackError) {
                    console.error('Rocket Component: Fallback also failed:', fallbackError);
                }
            }
        };

        loadModel();
    }, []);

    useEffect(() => {
        const updateResponsiveValues = () => {
            const isDesktop = window.innerWidth >= 1024;
            setScale(isDesktop ? 1.5 : 1.8);
            setResponsiveCubeSize(isDesktop ? 3.0 : 1.88);
        };

        updateResponsiveValues();
        window.addEventListener("resize", updateResponsiveValues);

        return () =>
            window.removeEventListener("resize", updateResponsiveValues);
    }, []);

    // Check if model is loaded
    useEffect(() => {
        if (gltf && gltf.scene) {
            setIsLoaded(true);
        }
    }, [gltf]);

    // Use modular settings as defaults, but allow Leva control override
    const settings = rocketSettings;

    // Use constants instead of Leva controls
    const {
        // Position controls
        positionX,
        positionY,
        positionZ,
        // Rotation controls
        rotationX,
        rotationY,
        rotationZ,
        // Scale controls
        scaleControl,
        // Animation controls
        animationSpeed,
        rotationIntensity,
        floatSpeed,
        floatIntensity,
        floatXIntensity,
    } = ROCKET_CONTROLS;

    /* 
    // Leva controls for fine-tuning the rocket
    const {
        // Position controls
        positionX,
        positionY,
        positionZ,
        // Rotation controls
        rotationX,
        rotationY,
        rotationZ,
        // Scale controls
        scaleControl,
        // Animation controls
        animationSpeed,
        rotationIntensity,
        floatSpeed,
        floatIntensity,
        floatXIntensity,
    } = useControls(
        "🚀 Rocket Controls",
        {
            // Position
            positionX: {
                value: settings.position.x,
                min: -5,
                max: 5,
                step: 0.1,
            },
            positionY: {
                value: settings.position.y,
                min: -3,
                max: 3,
                step: 0.1,
            },
            positionZ: {
                value: settings.position.z,
                min: -2,
                max: 2,
                step: 0.1,
            },
            // Rotation (static)
            rotationX: {
                value: settings.rotation.x,
                min: -Math.PI,
                max: Math.PI,
                step: 0.1,
            },
            rotationY: {
                value: settings.rotation.y,
                min: -Math.PI,
                max: Math.PI,
                step: 0.1,
            },
            rotationZ: {
                value: settings.rotation.z,
                min: -Math.PI,
                max: Math.PI,
                step: 0.1,
            },
            // Scale
            scaleControl: {
                value: settings.scale,
                min: 0.5,
                max: 3,
                step: 0.1,
            },
            // Animation
            animationSpeed: {
                value: settings.animation.speed,
                min: 0,
                max: 2,
                step: 0.1,
            },
            rotationIntensity: {
                value: settings.animation.rotationIntensity,
                min: 0,
                max: 0.5,
                step: 0.01,
            },
            floatSpeed: {
                value: settings.animation.floatSpeed,
                min: 0.5,
                max: 3,
                step: 0.1,
            },
            floatIntensity: {
                value: settings.animation.floatIntensity,
                min: 0,
                max: 2,
                step: 0.1,
            },
            floatXIntensity: {
                value: settings.animation.floatXIntensity,
                min: 0,
                max: 1,
                step: 0.05,
            },
        },
        { collapsed: true }
    );
    */

    // Use constants instead of Leva controls
    const {
        enableCubeEmissions,
        cubeIntensity,
        cubeCount,
        cubeSize,
        cubeSpeed,
        cubeColor,
        cubeTrailLength,
        emissionPosX,
        emissionPosY,
        emissionPosZ,
        emissionRotX,
        emissionRotY,
        emissionRotZ,
        emissionScale,
        floatXScaler,
        floatYScaler,
    } = CUBE_EMISSIONS_CONTROLS;

    /*
    // Cube emission controls
    const {
        enableCubeEmissions,
        cubeIntensity,
        cubeCount,
        cubeSize,
        cubeSpeed,
        cubeColor,
        cubeTrailLength,
        emissionPosX,
        emissionPosY,
        emissionPosZ,
        emissionRotX,
        emissionRotY,
        emissionRotZ,
        emissionScale,
        floatXScaler,
        floatYScaler,
    } = useControls("🔥 Cube Emissions", {
        enableCubeEmissions: { value: true },
        cubeIntensity: { value: 0.45, min: 0, max: 5, step: 0.05 },
        cubeCount: { value: 275, min: 10, max: 500, step: 5 },
        cubeSize: { value: 0.08, min: 0.01, max: 3.0, step: 0.01 },
        cubeSpeed: { value: 3.5, min: 0.1, max: 8, step: 0.05 },
        cubeColor: { value: "#ff7c00" },
        cubeTrailLength: { value: 0.3, min: 0.1, max: 10, step: 0.05 },
        emissionPosX: { value: 0.1, min: -3, max: 3, step: 0.01 },
        emissionPosY: { value: -0.1, min: -2, max: 2, step: 0.01 },
        emissionPosZ: { value: -0.16, min: -2, max: 2, step: 0.01 },
        emissionRotX: {
            value: -1.08,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01,
        },
        emissionRotY: {
            value: -2.25,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01,
        },
        emissionRotZ: {
            value: -0.31,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01,
        },
        emissionScale: { value: 1.0, min: 0.1, max: 5, step: 0.01 },
        floatXScaler: { value: 0.0, min: 0, max: 1.5, step: 0.01 },
        floatYScaler: { value: 0.3, min: 0, max: 1.5, step: 0.01 },
    });
    */

    // Use constants instead of Leva controls
    const {
        enableMetallic,
        metalness,
        roughness,
        reflectivity,
        materialColor,
        emissive,
        emissiveIntensity,
    } = MATERIAL_CONTROLS;

    /*
    // Material controls for metallic rocket
    const {
        enableMetallic,
        metalness,
        roughness,
        reflectivity,
        materialColor,
        emissive,
        emissiveIntensity,
    } = useControls("🛸 Material", {
        enableMetallic: { value: true },
        metalness: { value: 0.67, min: 0, max: 1, step: 0.01 },
        roughness: { value: 0.37, min: 0, max: 1, step: 0.01 },
        reflectivity: { value: 0.38, min: 0, max: 1, step: 0.01 },
        materialColor: { value: "#b1b1b1" },
        emissive: { value: "#000000" },
        emissiveIntensity: { value: 0, min: 0, max: 2, step: 0.01 },
    });
    */

    // Use constants instead of Leva controls
    const {
        enableMotionStreaks,
        streakIntensity,
        streakCount,
        streakSpeed,
        streakLength,
        streakWidth,
        streakColor,
        trailDistance,
        streakPosX,
        streakPosY,
        streakPosZ,
        streakRotX,
        streakRotY,
        streakRotZ,
        streakSpreadY,
        streakSpreadZ,
        streakLifespan,
    } = MOTION_STREAK_CONTROLS;

    /*
    // Motion streak controls
    const {
        enableMotionStreaks,
        streakIntensity,
        streakCount,
        streakSpeed,
        streakLength,
        streakWidth,
        streakColor,
        trailDistance,
        streakPosX,
        streakPosY,
        streakPosZ,
        streakRotX,
        streakRotY,
        streakRotZ,
        streakSpreadY,
        streakSpreadZ,
        streakLifespan,
    } = useControls("⚡ Motion Streaks", {
        enableMotionStreaks: { value: true },
        streakIntensity: { value: 1.75, min: 0, max: 2, step: 0.05 },
        streakCount: { value: 50, min: 20, max: 200, step: 5 },
        streakSpeed: { value: 10, min: 1, max: 10, step: 0.1 },
        streakLength: { value: 5.5, min: 2, max: 15, step: 0.5 },
        streakWidth: { value: 0.013, min: 0.01, max: 0.1, step: 0.001 },
        streakColor: { value: "#ffffed" },
        trailDistance: { value: 6.0, min: 3, max: 20, step: 0.5 },
        streakPosX: { value: 2.54, min: -30, max: 30, step: 0.01 },
        streakPosY: { value: -4.16, min: -20, max: 20, step: 0.01 },
        streakPosZ: { value: -0.29, min: -20, max: 20, step: 0.01 },
        streakRotX: {
            value: 0,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01,
        },
        streakRotY: {
            value: 0,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01,
        },
        streakRotZ: {
            value: 0.94,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01,
        },
        streakSpreadY: { value: 0.4, min: 0.1, max: 5, step: 0.1 },
        streakSpreadZ: { value: 0.2, min: 0.1, max: 5, step: 0.1 },
        streakLifespan: { value: 0.13, min: 0.001, max: 1, step: 0.001 },
    });
    */

    // Apply metallic materials to rocket
    useEffect(() => {
        if (gltf && gltf.scene && enableMetallic) {
            gltf.scene.traverse((child) => {
                if (child.isMesh && child.material) {
                    // Handle both single material and array of materials
                    const materials = Array.isArray(child.material)
                        ? child.material
                        : [child.material];

                    materials.forEach((material) => {
                        if (
                            material.isMeshStandardMaterial ||
                            material.isMeshPhysicalMaterial
                        ) {
                            material.metalness = metalness;
                            material.roughness = roughness;
                            material.reflectivity = reflectivity;
                            material.color.set(materialColor);
                            material.emissive.set(emissive);
                            material.emissiveIntensity = emissiveIntensity;
                            material.needsUpdate = true;
                        }
                    });
                }
            });
        }
    }, [
        gltf,
        enableMetallic,
        metalness,
        roughness,
        reflectivity,
        materialColor,
        emissive,
        emissiveIntensity,
    ]);

    // Animation with Leva controls
    useFrame((state) => {
        if (rocketRef.current) {
            // Y rotation animation
            if (animationSpeed > 0) {
                rocketRef.current.rotation.y =
                    rotationY +
                    Math.sin(state.clock.elapsedTime * animationSpeed) *
                        rotationIntensity;
            }
            // X-axis propulsion motion (faster left, slower right like rocket thrust)
            if (floatXIntensity > 0) {
                const time = state.clock.elapsedTime * floatSpeed;

                // Create a perfect loop with asymmetric timing
                const cycle = time % (2 * Math.PI); // Complete cycle from 0 to 2π
                let thrustWave = 0;

                // Update thrust phase for coordinated effects
                const newThrustPhase = cycle < Math.PI * 0.3 ? "fast" : "slow";
                if (newThrustPhase !== thrustPhase) {
                    setThrustPhase(newThrustPhase);
                }

                if (cycle < Math.PI * 0.3) {
                    // Fast left thrust (30% of cycle)
                    const fastPhase = cycle / (Math.PI * 0.3); // 0 to 1
                    thrustWave =
                        Math.sin(fastPhase * Math.PI) * floatXIntensity;
                } else {
                    // Slow right drift back (70% of cycle)
                    const slowPhase = (cycle - Math.PI * 0.3) / (Math.PI * 1.7); // 0 to 1
                    thrustWave =
                        Math.sin(Math.PI + slowPhase * Math.PI) *
                        floatXIntensity;
                }

                rocketRef.current.position.x = positionX + thrustWave;
            }

            // Update position and rotation tracking for effects
            rocketRef.current.getWorldPosition(rocketPosition.current);
            rocketRotation.current.copy(rocketRef.current.rotation);
        }
    });

    // Don't render anything until model is loaded
    if (!gltf || !gltf.scene) {
        return null;
    }

    return (
        <Float
            speed={floatSpeed}
            rotationIntensity={0.3}
            floatIntensity={floatIntensity}
        >
            <group
                ref={rocketRef}
                scale={[scaleControl, scaleControl, scaleControl]}
                position={[0, positionY, positionZ]}
                rotation={[rotationX, rotationY, rotationZ]}
            >
                <primitive object={gltf.scene.clone()} />

                {/* Cube Emissions */}
                {enableCubeEmissions && (
                    <RocketCubeEmissions
                        rocketPosition={rocketPosition.current}
                        rocketRotation={rocketRotation.current}
                        intensity={cubeIntensity}
                        cubeCount={cubeCount}
                        emissionSpeed={cubeSpeed}
                        cubeSize={responsiveCubeSize}
                        color={cubeColor}
                        trailLength={cubeTrailLength}
                        emissionOffset={
                            new THREE.Vector3(
                                emissionPosX,
                                emissionPosY,
                                emissionPosZ
                            )
                        }
                        emissionRotation={
                            new THREE.Vector3(
                                emissionRotX,
                                emissionRotY,
                                emissionRotZ
                            )
                        }
                        emissionScale={emissionScale}
                        floatXScaler={floatXScaler}
                        floatXIntensity={floatXIntensity}
                        floatSpeed={floatSpeed}
                        floatIntensity={floatIntensity}
                        floatYScaler={floatYScaler}
                        thrustPhase={thrustPhase}
                    />
                )}

                {/* Motion Streaks */}
                {enableMotionStreaks && (
                    <RocketMotionStreaks
                        rocketPosition={rocketPosition.current}
                        rocketRotation={rocketRotation.current}
                        intensity={streakIntensity}
                        streakCount={streakCount}
                        streakSpeed={streakSpeed}
                        streakLength={streakLength}
                        streakWidth={streakWidth}
                        color={streakColor}
                        trailDistance={trailDistance}
                        streakOffset={
                            new THREE.Vector3(
                                streakPosX,
                                streakPosY,
                                streakPosZ
                            )
                        }
                        streakRotation={
                            new THREE.Vector3(
                                streakRotX,
                                streakRotY,
                                streakRotZ
                            )
                        }
                        streakSpreadY={streakSpreadY}
                        streakSpreadZ={streakSpreadZ}
                        streakLifespan={streakLifespan}
                        thrustPhase={thrustPhase}
                    />
                )}
            </group>
        </Float>
    );
}

// Enhanced loading fallback component
function RocketLoader() {
    const [loadingText, setLoadingText] = useState("Loading 3D model...");

    useEffect(() => {
        const messages = [
            "Loading 3D model...",
            "Preparing rocket engines...",
            "Calibrating navigation...",
            "Ready for launch!",
        ];

        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setLoadingText(messages[index]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {/* 3D loading animation */}
            <div className="relative mb-6">
                <div className="w-32 h-48 bg-gradient-to-t from-purple-500/20 to-cyan-400/20 rounded-lg animate-pulse"></div>
                <div
                    className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-lg animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                ></div>

                {/* Floating particles */}
                <div
                    className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                    className="absolute top-1/3 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.6s" }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            {/* Loading text */}
            <div className="text-center">
                <p className="text-white/90 font-medium mb-2">{loadingText}</p>
                <div className="flex space-x-1 justify-center">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.3}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface R3FRocketModelProps {
    className?: string;
}

export function R3FRocketModel({ className = "" }: R3FRocketModelProps) {
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    // Use modular settings as defaults
    const settings = rocketSettings;

    // Use constants instead of Leva controls
    const {
        // Camera
        cameraX,
        cameraY,
        cameraZ,
        fov,
        // Ambient light
        ambientIntensity,
        ambientColor,
        // Directional light
        dirIntensity,
        dirPositionX,
        dirPositionY,
        dirPositionZ,
        dirColor,
        // Point light
        pointIntensity,
        pointPositionX,
        pointPositionY,
        pointPositionZ,
        pointColor,
        // Second point light
        point2Intensity,
        point2PositionX,
        point2PositionY,
        point2PositionZ,
        point2Color,
        // Environment
        environmentPreset,
    } = SCENE_CONTROLS;

    /*
    // Camera and lighting controls
    const {
        // Camera
        cameraX,
        cameraY,
        cameraZ,
        fov,
        // Ambient light
        ambientIntensity,
        ambientColor,
        // Directional light
        dirIntensity,
        dirPositionX,
        dirPositionY,
        dirPositionZ,
        dirColor,
        // Point light
        pointIntensity,
        pointPositionX,
        pointPositionY,
        pointPositionZ,
        pointColor,
        // Second point light
        point2Intensity,
        point2PositionX,
        point2PositionY,
        point2PositionZ,
        point2Color,
        // Environment
        environmentPreset,
    } = useControls(
        "🎬 Scene Controls",
        {
            // Camera
            cameraX: {
                value: settings.camera.position.x,
                min: -10,
                max: 10,
                step: 0.5,
            },
            cameraY: {
                value: settings.camera.position.y,
                min: -10,
                max: 10,
                step: 0.5,
            },
            cameraZ: {
                value: settings.camera.position.z,
                min: 1,
                max: 15,
                step: 0.5,
            },
            fov: { value: settings.camera.fov, min: 20, max: 120, step: 5 },
            // Ambient light
            ambientIntensity: {
                value: 5,
                min: 0,
                max: 5,
                step: 0.1,
            },
            ambientColor: { value: "#ffffff" },
            // Directional light
            dirIntensity: {
                value: 10,
                min: 0,
                max: 10,
                step: 0.1,
            },
            dirPositionX: {
                value: 7,
                min: -10,
                max: 10,
                step: 0.5,
            },
            dirPositionY: {
                value: 4.5,
                min: -10,
                max: 10,
                step: 0.5,
            },
            dirPositionZ: {
                value: 2,
                min: -10,
                max: 10,
                step: 0.5,
            },
            dirColor: { value: "#0300ff" },
            // Point light
            pointIntensity: {
                value: 5,
                min: 0,
                max: 5,
                step: 0.1,
            },
            pointPositionX: {
                value: 1,
                min: -10,
                max: 10,
                step: 0.5,
            },
            pointPositionY: {
                value: 0,
                min: -10,
                max: 10,
                step: 0.5,
            },
            pointPositionZ: {
                value: -0.5,
                min: -10,
                max: 10,
                step: 0.5,
            },
            pointColor: { value: "#00b2ff" },
            // Second Point light
            point2Intensity: {
                value: 2.6,
                min: 0,
                max: 5,
                step: 0.1,
            },
            point2PositionX: {
                value: -0.5,
                min: -10,
                max: 10,
                step: 0.5,
            },
            point2PositionY: {
                value: -0.5,
                min: -10,
                max: 10,
                step: 0.5,
            },
            point2PositionZ: {
                value: 2,
                min: -10,
                max: 10,
                step: 0.5,
            },
            point2Color: { value: "#0d00ff" },
            // Environment (default to warehouse as requested)
            environmentPreset: {
                value: "warehouse",
                options: [
                    "studio",
                    "sunset",
                    "dawn",
                    "night",
                    "warehouse",
                    "forest",
                    "apartment",
                    "city",
                    "park",
                    "lobby",
                ],
            },
        },
        { collapsed: true }
    );
    */

    // Monitor loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModelLoaded(true);
        }, 2000); // Show loading for minimum 2 seconds for better UX

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`relative ${className}`}>
            {/* Loading overlay */}
            {/* {!isModelLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent">
                    <RocketLoader />
                </div>
            )} */}

            <Canvas
                camera={{
                    position: [cameraX, cameraY, cameraZ],
                    fov: fov,
                    near: 0.1,
                    far: 1000,
                }}
                style={{ background: "transparent" }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <Suspense fallback={null}>
                    {/* Controllable lighting */}
                    <ambientLight
                        intensity={ambientIntensity}
                        color={ambientColor}
                    />
                    <directionalLight
                        position={[dirPositionX, dirPositionY, dirPositionZ]}
                        intensity={dirIntensity}
                        color={dirColor}
                        castShadow
                    />
                    <pointLight
                        position={[
                            pointPositionX,
                            pointPositionY,
                            pointPositionZ,
                        ]}
                        intensity={pointIntensity}
                        color={pointColor}
                    />
                    <pointLight
                        position={[
                            point2PositionX,
                            point2PositionY,
                            point2PositionZ,
                        ]}
                        intensity={point2Intensity}
                        color={point2Color}
                    />

                    {/* Environment re-enabled */}
                    <Environment preset={environmentPreset} />

                    {/* 3D Rocket */}
                    <Rocket />

                    {/* Performance monitoring removed to clean up Leva */}
                </Suspense>
            </Canvas>
        </div>
    );
}

// Preload the optimized model for better performance
useGLTF.preload("/models/rocket-draco.glb");
