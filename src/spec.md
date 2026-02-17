# Specification

## Summary
**Goal:** Restore reliable 3D café scene loading and refresh the scene layout/theme by removing humans, adding more seating and dogs, and adding a beige “MENU” counter label.

**Planned changes:**
- Fix the GLB loading failure for `/assets/models/furniture/table-chair-set.glb` by ensuring the asset is served at that exact path or updating the code to reference the correct existing GLB under `frontend/public/assets/models/furniture/`.
- Ensure tables/chairs render from the GLB when available, and fall back to existing primitive furniture without crashing if the GLB fails to load.
- Remove/skip rendering of all human characters (do not render `CafeHumans` in the active scene composition).
- Add at least two additional static table + chair clusters in open areas on the floor plane (y=0), avoiding intersections and not blocking the camera start position.
- Add at least two additional static dogs near some of the new seating areas using the existing `DogModel` pattern.
- Add an in-scene 3D “MENU” label in bold with a beige color on/near the counter front, positioned for readability from the default camera.
- Update UI overlays (loading/error/menus) to use a cohesive warm café palette (cream/beige surfaces, espresso-brown accents, subtle neon-green highlights) while keeping all user-facing text in English.

**User-visible outcome:** The café scene loads without the GLB path error, shows no humans, includes more seating and more dogs, displays a readable beige “MENU” label on the counter, and has warm-themed UI overlays that match the café aesthetic.
