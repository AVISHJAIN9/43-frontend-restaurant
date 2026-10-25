# Security Audit & Hardening Matrix: Gourmet Restaurant

| Threat Category | Severity | Implemented Protection | Recommendation |
|---|---|---|---|
| **Token Theft (XSS)** | High | User JWT currently stored in `localStorage`. | Migrate authentication token storage to HttpOnly secure cookies. |
| **WebGL Context Loss** | Low | Three.js handles canvas unmount cleanly in `useEffect`. | Add explicit `gl.dispose()` on geometry assets to prevent GPU memory leaks. |
| **API Injection** | Medium | Axios parameterized query formatting. | Enforce strict schema validation on recipe creation inputs using Zod. |
