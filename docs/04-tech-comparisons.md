# Technology Choice Comparisons & Trade-Off Analysis

## React Three Fiber (R3F) vs Raw Three.js vs Babylon.js vs CSS 3D

| Metric | Chosen: React Three Fiber | Raw Three.js | Babylon.js | Pure CSS 3D |
|---|---|---|---|---|
| **Component Reactivity** | **Declarative JSX (`<mesh>`, `<canvas>`)** | Imperative manual loop | Imperative scene tree | CSS transform properties |
| **State Integration** | Native React props & hooks | Manual synchronization | Separate framework | Zero JS state connection |
| **Shader & Lighting Power** | **Full WebGL2 capabilities** | Full WebGL | Full WebGL / WebGPU | Limited to flat planes |
| **Ecosystem & Helpers** | `@react-three/drei` primitives | Manual geometry loaders | Babylon ecosystem | None |
| **Fit with Project** | **Optimal** (Modern declarative 3D) | Verbose boilerplate | Overkill for web showcase | Lacks true 3D lighting |

- **Why R3F Was Used**: Enables seamless declarative composition of 3D WebGL scenes within React's component hierarchy without boilerplate animation loops.
