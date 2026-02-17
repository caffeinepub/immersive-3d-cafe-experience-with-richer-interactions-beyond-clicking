# Specification

## Summary
**Goal:** Add a switchable alternate café layout with no seating, and display a neon “Menu” label on the counter front—consistently across both the WebGL 3D room and the fallback/basic room.

**Planned changes:**
- Add a user-facing way to switch between the current café layout and an alternate “no chairs / no tables” layout.
- Implement the alternate layout by not rendering any chair or table meshes while keeping the rest of the room (walls, floor, counter, and other props) intact.
- Render a “Menu” label on the counter front face in both room implementations, styled as bold white text with a green neon glow/shadow effect, sized to match a ~70px intent.

**User-visible outcome:** Users can toggle between the standard café and a no-seating variant, and will see a legible neon “Menu” sign on the counter front in both the WebGL experience and the non-WebGL fallback.
