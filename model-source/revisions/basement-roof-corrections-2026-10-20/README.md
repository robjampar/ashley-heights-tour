# Basement, roof and planting corrections — 20 October 2026

Both local proposals now have a basement beneath the full stepped main-wing footprint, including the enlarged gym. The gross outer area increases from **111.3693 m² to 115.52518 m²** (+4.15588 m²). The new northern section runs from x=9.70 to 13.98 m and reaches y=-3.029 m; the western section remains at y=-4.0 m. The open courtyard is outside the shell. This does not extend the basement beneath the original house or projecting entrance/garage bays.

The retaining walls, slab, ceiling, limestone modules, Art Deco panelling, artwork, two recessed lights, collision boundaries and room polygon follow the extension. The accepted cinema, basement stair, bar island, stools, pool table and seating remain.

The named north-east elevation closure `0` has a tiled exterior; closure `1` has brick outside. Both original-loft dormer cheek piers and heads have tiled exterior faces and retain their room-side finishes. The viewer's dormer appearance role remains active.

Both southern hip caps follow the approved x=7.30 m ridge. The two retained rooflights have clear openings through all covering roof skins, and the overlapping link membranes meet without duplicate sheets. `Courtyard upper return` is removed. `051 Scribed west loft lining` stops at the original-house junction, y=-0.115 m; the exposed floor strip is completed.

M1, M3 and M5 have denser branch/leaf profiles and an additional 60% upper-crown spray allowance above 3 m. Existing fitted height/spread, trunk positions, building clipping and lower foliage are retained. Rear bushes use a separate, denser leaf-card profile. These detailed plants are generated in the browser; native models and the diffuse bake retain simpler foliage proxies.

## Implementation and evidence

- Canonical structural update: `scripts/model/proposal_basement_roof_corrections.py`, registered in the full build inventory. The basement polygon is in `proposal/specs/design-spec-compact.json`.
- Hip-cap source calculation: `scripts/model/proposal_roof_weathering.py`.
- Planting: `proposal/neighbours/planting-photo-match.json`, `walkthrough/src/planting-profiles.js` and `vegetation.js`.
- `prepare.py` creates isolated derivatives in `outputs/output-basement-roof-{variant}`; `export.py` exports complete GLBs; `install.py` installs the local model pair.
- Recovery copies are in `original/`. Initial render iterations remain alongside the final images.
- Each current native output has `basement-roof-refresh.json`. This records a targeted update, not a full rebuild; historical full-build fingerprints are unchanged.
- The bar's accepted source inventory already excluded superseded floor/panel meshes, but its historical added-object declarations did not. `bar_lounge_details.py` now reconciles those declarations. `refresh-bar-inventory.py` applied the equivalent metadata-only correction to the already exported manifests. Native files, geometry, navigation and light-cache hashes were unchanged by that repair. Reports are in `inventory-refresh.json` and the per-output `basement-roof-inventory-refresh.json`.

[Native inspection gallery](../../walkthrough/test-results/basement-roof-corrections-2026-10-20/native-review/index.html) · [Validation summary](../../walkthrough/test-results/basement-roof-corrections-2026-10-20/validation-summary.json)

**214 web tests and 106 Python tests pass.** Exported-geometry checks cover the stepped basement, walking access, both rooflight apertures, hip lines, exterior materials and the shortened lining. All retained original native scenes are unchanged. The geometry comparison preserves 17,799 existing Compact meshes and 15,971 Planning meshes unchanged.

Both visual derivatives and 192-sample daylight caches are refreshed; the asset hash audit and local web build pass. The workspace layout audit has the same 345 pre-existing findings and no additions.

Native renders were inspected under neutral diagnostic lighting. Live browser screenshot review remains unavailable because the browser/computer-use connection is disconnected. Detailed foliage has geometry/profile checks but no new browser screenshot verification. Nothing was published.
