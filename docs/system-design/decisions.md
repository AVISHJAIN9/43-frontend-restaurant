# Architectural Decision Records (ADRs): Gourmet Restaurant

| ADR ID | Decision Title | Chosen Option | Alternatives Considered | Deciding Factors | Trade-Off Accepted | Revisit Trigger |
|---|---|---|---|---|---|---|
| **ADR-01** | Frontend Framework | React 19 + Vite 7 | Next.js 15, Vanilla JS | Latest React compiler optimizations; sub-second HMR | Client-side CSR rendering | Strict SSR SEO requirements |
| **ADR-02** | 3D Engine | React Three Fiber (R3F) | Babylon.js, Spline | Native JSX component structure; `@react-three/drei` helpers | WebGL context memory on mobile | Low-end mobile device throttling |
| **ADR-03** | Smooth Scrolling | Lenis Engine | Locomotive Scroll, Native CSS | Superior performance; zero hijack of native touch events | Modest JS bundle size | Browser native smooth-scroll maturity |
| **ADR-04** | Styling Architecture | Tailwind CSS 4 | CSS Modules, Styled Components | High-speed utility workflow; modern CSS variable engine | Utility class markup density | Migrating to Web Components |
