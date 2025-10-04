import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ModelPreloader {
  private static instance: ModelPreloader;
  private gltfLoader: GLTFLoader;
  private dracoLoader: DRACOLoader;
  private loadingManager: THREE.LoadingManager;
  private preloadedModels: Map<string, any> = new Map();
  private loadingPromises: Map<string, Promise<any>> = new Map();
  private isInitialized = false;

  private constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.setupLoaders();
  }

  public static getInstance(): ModelPreloader {
    if (!ModelPreloader.instance) {
      ModelPreloader.instance = new ModelPreloader();
    }
    return ModelPreloader.instance;
  }

  private setupLoaders() {
    // Setup DRACO loader with correct path
    this.dracoLoader = new DRACOLoader(this.loadingManager);
    this.dracoLoader.setDecoderPath('/draco/gltf/');
    
    // Setup GLTF loader with DRACO support
    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    // Loading manager callbacks
    this.loadingManager.onLoad = () => {
      // Models loaded successfully
    };

    this.loadingManager.onProgress = (url, loaded, total) => {
      // Loading progress tracking
    };

    this.loadingManager.onError = (url) => {
      console.error('ModelPreloader: Failed to load:', url);
    };
  }

  /**
   * Start preloading models immediately when app boots
   */
  public initializePreloading(): void {
    if (this.isInitialized) {
      return;
    }
    
    this.isInitialized = true;

    // Preload the rocket model
    const modelPath = '/models/rocket-draco.glb';
    this.preloadModel(modelPath, 'rocket')
      .catch(error => console.error('ModelPreloader: Failed to preload rocket model:', error));
    
    // Preload any other 3D assets here
    // this.preloadModel('/models/other-model.glb', 'other');
  }

  /**
   * Preload a specific model
   */
  public preloadModel(modelPath: string, key: string): Promise<any> {
    // Return existing promise if already loading
    if (this.loadingPromises.has(key)) {
      return this.loadingPromises.get(key)!;
    }

    // Return cached model if already loaded
    if (this.preloadedModels.has(key)) {
      return Promise.resolve(this.preloadedModels.get(key));
    }


    const loadingPromise = new Promise((resolve, reject) => {
      this.gltfLoader.load(
        modelPath,
        (gltf) => {
          
          // Clone the scene to avoid sharing issues
          const clonedScene = gltf.scene.clone();
          
          // Store both original and cloned for flexibility
          const modelData = {
            scene: clonedScene,
            animations: gltf.animations,
            original: gltf,
            clone: () => gltf.scene.clone()
          };
          
          this.preloadedModels.set(key, modelData);
          this.loadingPromises.delete(key);
          resolve(modelData);
        },
        (progress) => {
          // Loading progress tracking
        },
        (error) => {
          this.loadingPromises.delete(key);
          reject(error);
        }
      );
    });

    this.loadingPromises.set(key, loadingPromise);
    return loadingPromise;
  }

  /**
   * Get a preloaded model (returns immediately if cached)
   */
  public getModel(key: string): any | null {
    const model = this.preloadedModels.get(key);
    if (model) {
      // Return a fresh clone to avoid sharing issues
      return {
        scene: model.clone(),
        animations: model.animations,
        original: model.original
      };
    }
    return null;
  }

  /**
   * Check if a model is preloaded and ready
   */
  public isModelReady(key: string): boolean {
    return this.preloadedModels.has(key);
  }

  /**
   * Get loading status for a model
   */
  public getLoadingStatus(key: string): 'ready' | 'loading' | 'not-started' {
    if (this.preloadedModels.has(key)) return 'ready';
    if (this.loadingPromises.has(key)) return 'loading';
    return 'not-started';
  }

  /**
   * Preload Three.js and R3F chunks (for when user is about to navigate)
   */
  public async warmupR3F(): Promise<void> {
    try {
      // Dynamically import R3F components to trigger chunk loading
      const imports = [
        // Core R3F
        import('@react-three/fiber'),
        // R3F Drei components used in rocket scene
        import('@react-three/drei'),
        // Core Three.js (if not already loaded)
        import('three')
      ];
      
      // Load all chunks in parallel
      await Promise.all(imports);
      
    } catch (error) {
      console.error('ModelPreloader: R3F warmup failed:', error);
    }
  }


  /**
   * Clean up resources
   */
  public dispose(): void {
    this.preloadedModels.clear();
    this.loadingPromises.clear();
    this.dracoLoader.dispose();
  }
}

// Export singleton instance
export const modelPreloader = ModelPreloader.getInstance();

// Export types for TypeScript
export type ModelData = {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  original: any;
  clone: () => THREE.Group;
};

export type LoadingStatus = 'ready' | 'loading' | 'not-started';
