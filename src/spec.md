# Specification

## Summary
**Goal:** Fix the “blank room” startup regression by making full café environment loading resilient, correctly tracked, and user-visible when it fails.

**Planned changes:**
- Update scene readiness tracking so `sceneReady` in `frontend/src/App.tsx` is set only after the full café environment (furniture + scene dressing) has mounted successfully, not when the minimal fallback room renders.
- Make `frontend/src/scene/environment/CafeSceneDressing.tsx` non-blocking by removing Suspense-based `useTexture` loading for `/assets/generated/contour-texture-warm.dim_2048x2048.png` and switching to the existing non-blocking texture loader hook with diagnostic logging on failure.
- Add a degraded-mode UI state when the full café environment (inside the `Physics` + Suspense block in `frontend/src/scene/CafeScene.tsx`) does not appear within the startup timeout, including clear English text and a Retry action that remounts the scene using the existing mechanism in `frontend/src/App.tsx`.
- Improve scene diagnostics to explicitly distinguish “fallback room rendered” vs “full café environment mounted,” and log a clear event when the full environment mount does not occur (keeping compatibility with the existing error overlay technical details).

**User-visible outcome:** On startup, the loading overlay stays up until the full café loads; if only the basic room appears for too long, the user sees an English message explaining the degraded mode plus a Retry button, and the message disappears automatically once the full café loads.
