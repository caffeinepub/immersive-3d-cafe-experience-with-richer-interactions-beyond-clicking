# Specification

## Summary
**Goal:** Improve 3D café scene load reliability by reducing texture, geometry, and rendering workload.

**Planned changes:**
- Replace the 2048×2048 contour floor/furniture texture with a smaller generated texture and update all 3D scene references to use the new filename.
- Reduce geometric complexity by lowering segment counts for high-segment primitives across the café environment, dressing, and furniture components while preserving overall shapes and layout.
- Adjust the React Three Fiber `Canvas` configuration to cap device pixel ratio (DPR) and avoid expensive rendering features that are not required for functionality.

**User-visible outcome:** The 3D café scene loads more reliably and is less likely to time out on startup, while keeping the same overall look, layout, and interactions.
