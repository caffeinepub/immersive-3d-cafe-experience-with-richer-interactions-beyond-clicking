# Specification

## Summary
**Goal:** Restore reliable visibility of the 3D cafe room after the latest deploy so the scene never appears blank, and provide clear recovery/error feedback when scene startup fails.

**Planned changes:**
- Ensure the Canvas scene always renders visible fallback geometry (at minimum floor and walls) independent of async/Suspense-loaded elements (e.g., Environment preset, textures, physics children), with basic lighting if Environment fails.
- Add a timed scene startup watchdog that switches from loading overlay to an error overlay if first successful render is not signaled within a timeout, including a “Retry Loading Scene” action that remounts the Canvas/scene.
- Improve failure diagnostics by logging categorized scene startup/load/render stages and showing a concise details section in the error overlay with the latest stage + message, refreshed on each retry.

**User-visible outcome:** On fresh load, the user always sees at least a basic 3D room behind the UI (never a blank scene). If the scene doesn’t finish loading, they see an error overlay with clear details and a Retry action that attempts to reload the 3D scene.
