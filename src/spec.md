# Specification

## Summary
**Goal:** Make the behind-counter wall-frame label (“Seven Balance”) clearly readable from across the room and add a neon green glow to the menu board frame edge in both the basic fallback room and the full scene dressing.

**Planned changes:**
- Increase the 3D label text size for the “Seven Balance” WallFrameLabel in BasicCafeRoomFallback while keeping it crisp, centered, and unclipped.
- Increase the 3D label text size for the “Seven Balance” WallFrameLabel in CafeSceneDressing while keeping it crisp, centered, and unclipped.
- Add a neon green edge-glow effect to the menu board rectangular frame in BasicCafeRoomFallback, constrained to the frame edge and avoiding z-fighting.
- Add a neon green edge-glow effect to the menu board rectangular frame in CafeSceneDressing, constrained to the frame edge and avoiding z-fighting.

**User-visible outcome:** In both versions of the cafe room, the “Seven Balance” menu-board label is larger and readable from the default camera view, and the frame around it has a clearly visible neon green glow along its edge.
