# Gaps, Hardening & Technical Debt: Gourmet Restaurant

| Priority | Area | Current State | Recommendation |
|---|---|---|---|
| **P1** | Token Security | JWT in `localStorage` | Migrate to HttpOnly Secure SameSite cookies to protect from XSS credential theft. |
| **P2** | Dynamic 3D Models | Primitive geometry | Load GLTF / GLB culinary dish models using `@react-three/drei`'s `useGLTF` with Draco compression. |
| **P3** | Image CDN | Static SVG placeholders | Implement an asset CDN (Cloudinary / Imgix) for automatic WebP/AVIF transformation and lazy-loading. |
