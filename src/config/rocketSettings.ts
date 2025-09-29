// Rocket 3D Model Configuration
// All default settings for the rocket appearance and behavior

export const rocketSettings = {
  // Rocket Transform
  position: {
    x: 0.7,
    y: -0.7,
    z: 0.4,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0.6,
  },
  scale: 1.6,

  // Animation Settings
  animation: {
    speed: 0.1,
    rotationIntensity: 0,
    floatSpeed: 1,
    floatIntensity: 2,
    floatXIntensity: 0.35,
  },

  // Camera Settings
  camera: {
    position: {
      x: 0,
      y: 0,
      z: 5,
    },
    fov: 50,
  },

  // Lighting Configuration
  lighting: {
    ambient: {
      intensity: 2,
      color: "#80761d",
    },
    directional: {
      intensity: 5,
      position: {
        x: 8,
        y: 4.5,
        z: 10,
      },
      color: "#ffffff",
    },
    point: {
      intensity: 3,
      position: {
        x: 1,
        y: -1,
        z: 1,
      },
      color: "#ff2929",
    },
  },

  // Environment Settings
  environment: {
    preset: "city" as const,
  },
} as const;

// Type for the settings (useful for TypeScript)
export type RocketSettings = typeof rocketSettings;