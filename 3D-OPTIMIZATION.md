# 3D Optimization Guide

## Performance Targets

-   **Loading**: < 3s on 3G
-   **FPS**: 60fps on mid-range devices
-   **Memory**: < 100MB GPU per model
-   **File Size**: < 2MB for primary models

## Optimization Pipeline

### 1. Model Preparation

```bash
# Optimize GLB (NO DRACO for Vercel!)
gltf-transform optimize input.glb output.glb \
  --texture-compress webp \
  --texture-size 1024

# Convert textures
cwebp -q 85 input.png -o output.webp
```

### 2. Vercel Deployment Requirements

```json
// vercel.json - Required headers
{
    "headers": [
        {
            "source": "/(.*)\\.glb",
            "headers": [
                {
                    "key": "Cache-Control",
                    "value": "public, max-age=31536000, immutable"
                },
                { "key": "Content-Type", "value": "model/gltf-binary" }
            ]
        }
    ]
}
```

### 3. Loading Strategy

```javascript
// Progressive loading
useGLTF.preload("/models/rocket.glb");

// Memory cleanup
useEffect(() => {
    return () => {
        if (gltf) {
            gltf.scene.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
        }
    };
}, [gltf]);
```

## Known Pitfalls

### ❌ Draco Compression

-   **Problem**: `net::ERR_CONTENT_DECODING_FAILED` on Vercel
-   **Solution**: Use meshopt instead of Draco

### ❌ Wrong Headers

-   **Problem**: Setting `Content-Encoding: gzip` on GLB files
-   **Solution**: Use `Content-Type: model/gltf-binary` only

## Performance Monitoring

```javascript
// FPS tracking in R3F
import { ThreePerformanceMonitor } from "./ThreePerformanceMonitor";

// Add to Canvas
<ThreePerformanceMonitor />;
```

## Emergency Rollback

```bash
vercel rollback  # If deployment breaks 3D
```
