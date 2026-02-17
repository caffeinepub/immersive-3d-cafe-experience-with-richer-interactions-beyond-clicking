# Specification

## Summary
**Goal:** Add three more identical table + 4-chair seating sets to the right side of the café in both the full and fallback 3D environments.

**Planned changes:**
- In `frontend/src/scene/environment/CafeEnvironment.tsx`, duplicate the existing table + 4-chair set 3 times and place the new sets on the room’s right side (positive X) with clear gaps and no overlaps.
- In `frontend/src/scene/environment/BasicCafeRoomFallback.tsx`, duplicate the existing table + 4-chair set 3 times and place the new sets on the room’s right side (positive X) with clear gaps and no overlaps.
- Ensure chairs in each duplicated set remain rotated to face their corresponding table, matching the original set’s orientation behavior.

**User-visible outcome:** The 3D cafe scene (and its fallback) shows four total table+chair seating sets, with three additional sets clearly arranged on the right side without intersecting other furniture.
