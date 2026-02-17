# Specification

## Summary
**Goal:** Rotate the four chairs in the 3D cafe so each chair faces toward the table at position [0, 0, 2] in both the full and fallback environments.

**Planned changes:**
- Update chair rotation values in `CafeEnvironment` so the two chairs at z=1.3 face +Z toward the table and the two chairs at z=2.7 face -Z toward the table.
- Update chair rotation values in `BasicCafeRoomFallback` to match the full environment so all four chairs face toward the table.

**User-visible outcome:** In both the full cafe scene and the fallback scene, all four chairs around the table are oriented correctly, with their seat openings facing the table and backrests facing away.
