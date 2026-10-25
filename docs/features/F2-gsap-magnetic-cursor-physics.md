# F2: GSAP Magnetic Cursor & Inertia Physics

## Overview
A custom cursor system featuring spring-damped magnetic snapping on interactive navigation links and CTA buttons, powered by GreenSock Animation Platform (GSAP) quickTo physics engines.

## Architectural Flow
```mermaid
flowchart TD
    PointerMove[Pointer Movement Event] --> MagneticComp[magnetic.jsx Component]
    MagneticComp --> BoundingRect[getBoundingClientRect Element Center]
    BoundingRect --> DistanceCalc[Euclidean Distance Vector Computation]
    DistanceCalc --> ThresholdCheck{Distance < Trigger Radius?}
    ThresholdCheck -->|Yes| QuickToInterpolation[GSAP quickTo X/Y with Elastic Easing]
    ThresholdCheck -->|No| NaturalReturn[Animate Back to Origin 0,0]
    QuickToInterpolation --> DOMTransform[Apply translate3d CSS Matrix]
```

## Sequence Diagram
```mermaid
sequenceDiagram
    autonumber
    actor User as User Cursor
    participant TargetBtn as CTA Button (.magnetic-target)
    participant MagneticHook as Magnetic Component
    participant GSAPEngine as GSAP quickSetter / quickTo
    participant DOM as Element Style Transform

    User->>TargetBtn: Hovers near button perimeter (within 80px)
    TargetBtn->>MagneticHook: Trigger onMouseMove capture
    MagneticHook->>MagneticHook: Calculate offset: (clientX - centerX) * 0.35
    MagneticHook->>GSAPEngine: Dispatch target x/y coordinates
    GSAPEngine->>DOM: Update transform: translate3d(x, y, 0)
    User->>TargetBtn: Moves cursor away from perimeter
    TargetBtn->>GSAPEngine: quickTo(0, 0) with ease: 'elastic.out(1, 0.3)'
    GSAPEngine->>DOM: Reset transform smoothly to default layout
```

## Failure Path Diagram
```mermaid
flowchart TD
    TouchDevice[Touch Device or Reduced Motion Detected] --> CheckMedia[window.matchMedia '(pointer: coarse)']
    CheckMedia --> DisableMagnetic[Bypass GSAP quickTo listeners]
    DisableMagnetic --> NativeBehavior[Render standard native button clicks without transform]
```

## Technical Implementation
- **File**: `src/components/magnetic.jsx` (Lines 1-52)
- **Engine**: GSAP `gsap.quickTo()` for performance-optimized high-frequency DOM manipulation without React state re-render thrashing.
- **Accessibility**: Listens to `prefers-reduced-motion: reduce` and touch device media queries to completely disable magnetic offsets on mobile touchscreens.

## Say It Out Loud
I implemented a high-performance magnetic cursor attraction effect using GSAP to give menu selections and table reservation actions an ultra-responsive, tactile feel. As the user approaches any interactive CTA or luxury dish card, the magnetic component calculates the distance between the cursor and the element's bounding center, pulling the target button toward the pointer using GSAP's quickTo function. I specifically used quickTo rather than triggering React state updates on every mousemove because quickTo bypasses React's reconciliation cycle entirely, mutating CSS transform matrices directly on the compositor thread for zero frame drops. If a user visits on an iPad or mobile phone, the component automatically detects touch input via CSS media queries and disables the magnetic calculation to avoid touch gesture interference. The primary constraint is managing bounding rect re-calculations during viewport resizing, which I solved by debouncing the dimension queries with a ResizeObserver.\n