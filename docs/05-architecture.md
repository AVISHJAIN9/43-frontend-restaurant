# Architecture & System Design: Gourmet Restaurant Hub

```mermaid
flowchart TD
    User([User Browser]) --> App[App.jsx: React Router v7]
    App --> Lenis[Lenis Smooth Scroll Provider]
    App --> Context[UserContextProvider: Auth State]
    App --> Motion[Framer Motion PageWrapper]
    
    Motion --> Home[pages/home.jsx]
    Home --> R3F[components/scene3d.jsx: Three.js Canvas]
    Home --> Magnetic[components/magnetic.jsx: GSAP Physics]
    
    Motion --> Feed[pages/feed.jsx]
    Feed --> API[utils/api.js: Axios Client]
    API --> Backend[(External Backend REST API)]
```
