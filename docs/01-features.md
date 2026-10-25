# Master Feature Inventory: Gourmet Restaurant & Hub

| Feature ID | Feature Name | Core Files | Primary Architectural Mechanism |
|---|---|---|---|
| **F1** | 3D WebGL Interactive Scene | `src/components/scene3d.jsx` | Three.js, `@react-three/fiber`, `@react-three/drei`, WebGL canvas rendering. |
| **F2** | Magnetic Cursor Physics | `src/components/magnetic.jsx`, `cursor.jsx` | GSAP vector calculations, elastic magnetic attraction, trailing follower. |
| **F3** | Lenis Inertia Smooth Scrolling | `src/components/smoothscroll.jsx` | `@studio-freight/lenis`, `requestAnimationFrame` scroll loop normalization. |
| **F4** | User Authentication Context | `src/context/UserContext.jsx` | React Context API, `localStorage` state hydration, reactive auth hooks. |
| **F5** | Editorial Recipe Feed & Detail | `src/pages/feed.jsx`, `blogdetail.jsx` | REST API consumption via Axios, responsive grid cards, rich text layout. |
| **F6** | Recipe Publishing Studio | `src/pages/createblog.jsx` | Dynamic form management, banner image preview, ingredient tags, API POST. |
