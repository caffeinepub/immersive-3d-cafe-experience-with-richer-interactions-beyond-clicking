# Specification

## Summary
**Goal:** Add a visible 3D coffee/espresso machine prop on the counter in the always-rendered fallback scene.

**Planned changes:**
- Add a new coffee/espresso machine mesh/group to the fallback room scene, placed on top of the counter surface (not intersecting the counter geometry).
- Apply a shiny silver/chrome material to the machine (high metalness, low roughness) consistent with existing machine styling.
- Position the machine aligned with the existing counter placement (z aligned with the counter group at z = -5), avoiding overlap with existing fallback countertop props (cups, to-go cups, syrup bottles), and ensure it’s visible from the default camera view.
- Ensure the machine casts/receives shadows consistently with other countertop props when shadows are enabled.

**User-visible outcome:** In normal app usage (default fallback room), users can see a chrome-looking espresso machine sitting on the counter without it colliding with other props.
