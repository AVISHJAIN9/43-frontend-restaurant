# F1: Three.js & React Three Fiber 3D WebGL Canvas

## Overview
An interactive 3D WebGL presentation canvas embedded within the landing viewport, rendering procedural floating culinary spheres and interactive geometric food sculptures with realistic lighting, specular highlights, and mouse-parallax responsiveness.

## Architectural Flow
```mermaid
flowchart TD
    UserMouse[User Mouse Coordinates] --> MouseMove[Pointer Tracking Event]
    MouseMove --> R3FCanvas[Canvas Component scene3d.jsx]
    R3FCanvas --> PerspectiveCamera[PerspectiveCamera FOV 45]
    PerspectiveCamera --> AmbientLight[Ambient & Directional Lights]
    R3FCanvas --> MeshGeometry[Mesh Sphere & Torus Geometries]
    MeshGeometry --> MeshStandardMaterial[MeshStandardMaterial Metalness 0.4 Roughness 0.2]
    MeshGeometry --> UseFrameHook[useFrame Render Loop 60fps]
    UseFrameHook --> DynamicRotation[Euler Rotation Vector Delta]
    DynamicRotation --> WebGLRenderer[Three.js WebGLRenderer Canvas Draw]
```

## Sequence Diagram
```mermaid
sequenceDiagram
    autonumber
    actor User as Diner / Visitor
    participant Viewport as Browser Viewport
    participant Canvas as Scene3D (Canvas)
    participant Scene as Three.js Scene Graph
    participant FrameLoop as useFrame (requestAnimationFrame)
    participant GPU as WebGL GPU Buffer

    User->>Viewport: Moves pointer across hero screen
    Viewport->>Canvas: onPointerMove(clientX, clientY)
    Canvas->>Scene: Update target camera & mesh rotation coordinates
    loop 60 FPS Render Tick
        FrameLoop->>Scene: Compute delta-lerp quaternion rotation
        Scene->>GPU: Issue drawElements & shader uniform updates
        GPU-->>Viewport: Render antialiased WebGL pixels
    end
```

## Failure Path Diagram
```mermaid
flowchart TD
    WebGLError[WebGL Context Loss / Unsupported Hardware] --> Detection[Canvas onError Handler]
    Detection --> FallbackRender[Fallback to High-Res WebP Hero Image]
    FallbackRender --> DisableR3F[Tear down useFrame ticker to save CPU]
    DisableR3F --> NotifyConsole[Console Warning: Hardware Acceleration Disabled]
```

## Technical Implementation
- **File**: `src/components/scene3d.jsx` (Lines 1-85)
- **Dependencies**: `@react-three/fiber`, `@react-three/drei`, `three`
- **Render Loop**: Utilizes `useFrame((state, delta) => ...)` with delta-time lerping to prevent physics jitter across variable refresh rates (60Hz to 144Hz ProMotion displays).
- **Material Configuration**: Metallic glass refraction simulation via `MeshStandardMaterial` with roughness damping.

## Say It Out Loud
I built an interactive 3D WebGL hero stage using Three.js and React Three Fiber to create an unforgettable, luxury fine-dining visual impression the moment a guest lands on the restaurant portal. When the visitor moves their cursor across the screen, the component captures normalized pointer vectors and smoothly lerps the rotation and perspective camera angles using an internal sixty frames-per-second render loop managed by the useFrame hook. I chose React Three Fiber over raw imperative Three.js canvas scripts because R3F allows procedural three-dimensional meshes and physical lights to be declaratively managed as lifecycle-safe React components that clean up GPU buffers on unmount. If WebGL context loss occurs on low-end hardware, the canvas gracefully catches the error and falls back to a high-resolution static WebP asset so the hero section never displays an empty black box. One trade-off is the initial Three.js bundle weight, which I mitigated by code-splitting the 3D scene so the primary HTML text content renders instantly before the 3D canvas hydrates.\n