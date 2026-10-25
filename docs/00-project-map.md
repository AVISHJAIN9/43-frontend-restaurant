# Codebase Anatomy & Project Map

```
49-frontend-restaurant/
├── index.html                       # HTML5 entry template
├── vite.config.js                   # Vite 7 build configuration & React plugin
├── package.json                     # React 19, Three.js, GSAP, Lenis dependencies
├── eslint.config.js                 # Modern ESLint configuration
├── src/                             # Application Source Root
│   ├── main.jsx                     # Application bootstrap mounting to #root
│   ├── App.jsx                      # React Router v7 route declarations
│   ├── index.css                    # Tailwind CSS 4 imports & global resets
│   ├── App.css                      # Global layout styles
│   ├── context/
│   │   └── UserContext.jsx          # User authentication context & storage sync
│   ├── utils/
│   │   ├── api.js                   # Axios HTTP client with Bearer token injection
│   │   └── animations.js            # GSAP timelines & Framer Motion transitions
│   ├── components/
│   │   ├── scene3d.jsx              # Three.js WebGL 3D Canvas
│   │   ├── magnetic.jsx             # GSAP magnetic cursor attraction wrapper
│   │   ├── cursor.jsx               # Custom animated trailing cursor
│   │   ├── smoothscroll.jsx         # Lenis momentum smooth scrolling engine
│   │   ├── pagewrapper.jsx          # Framer Motion page transition container
│   │   ├── navbar.jsx               # Glassmorphic top navigation bar
│   │   ├── navbar.css               # Navbar blur & navigation styles
│   │   └── search.jsx               # Live search dropdown component
│   └── pages/
│       ├── home.jsx                 # Hero section with 3D canvas & highlights
│       ├── feed.jsx                 # Community culinary article feed
│       ├── blogdetail.jsx           # Full recipe article view with comments
│       ├── createblog.jsx           # Recipe publishing studio with live preview
│       ├── profile.jsx              # Chef user profile & bio
│       ├── login.jsx                # Member sign-in view
│       ├── signup.jsx               # Member registration view
│       ├── myposts.jsx              # Published articles management dashboard
│       ├── search.jsx               # Full-page recipe discovery engine
│       └── pages.css                # Page-specific styling rules
└── docs/                            # Interview-Ready Documentation Portal
```
