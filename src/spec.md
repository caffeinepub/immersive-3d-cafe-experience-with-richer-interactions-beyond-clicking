# Specification

## Summary
**Goal:** Replace procedural cafe characters and furniture with locally bundled free 3D models, and keep all human characters static (no movement/transform animation).

**Planned changes:**
- Remove/disable the walking customer behavior and any per-frame updates that change human character transforms so humans remain fixed in place.
- Add locally bundled (static) free-to-use GLB/GLTF assets for humans and dogs; update the scene to render at least 3 humans and at least 2 dogs from these models, with graceful fallback if a model fails to load.
- Add locally bundled (static) free-to-use GLB/GLTF assets for tables/chairs; replace primitive furniture in both BasicCafeRoomFallback and CafeEnvironment with the model-based furniture, placed/scaled to keep seating areas navigable.
- Add a repository attribution document listing each third-party model used (humans, dogs, tables/chairs) with source URL, author (if available), and license type.

**User-visible outcome:** The cafe scene displays static human figures and dogs rendered from bundled 3D models, with tables/chairs also rendered from bundled 3D furniture models; the scene loads without hotlinking external model URLs and includes attribution for used assets.
