# Project Pitch: Gourmet Restaurant & Culinary Hub

## 30-Second Elevator Pitch
"I developed the Gourmet Culinary Hub, an award-winning restaurant editorial platform built on React 19, Vite 7, and Tailwind CSS 4. The application pioneers immersive web standards by integrating Three.js 3D WebGL canvases with React Three Fiber, physics-based GSAP magnetic cursor tracking, Lenis inertia smooth scrolling, and complete culinary blogging workflows across ten dedicated single-page routes."

---

## 2-Minute Technical Interview Pitch
"In designing the Gourmet Culinary Hub, my goal was to combine modern editorial content management with bleeding-edge creative web engineering. I wanted to deliver an experience that feels alive and tactile on every interaction.

The core of the application is built on React 19 and bundled with Vite 7 for instantaneous development and sub-millisecond production builds. For visual immersion, I integrated Three.js through `@react-three/fiber` and `@react-three/drei` in `scene3d.jsx`, rendering interactive, hardware-accelerated 3D geometries that respond to mouse movement. To elevate interaction fidelity, I built a custom magnetic physics wrapper in `magnetic.jsx` using GSAP that pulls CTA buttons toward the user's cursor based on distance vectors, paired with a custom trailing cursor follower in `cursor.jsx` and Lenis momentum smooth scrolling.

On the application architecture side, the platform routes across ten single-page views using React Router v7, with animated route transitions orchestrated by Framer Motion. Global user state—including authentication tokens, active author sessions, and profile preferences—is centralized in `UserContext.jsx` with persistent LocalStorage hydration. The result is a showcase of modern frontend craftsmanship proving how 3D WebGL, physics-based motion, and clean React architecture converge into an unforgettable digital culinary journey."
