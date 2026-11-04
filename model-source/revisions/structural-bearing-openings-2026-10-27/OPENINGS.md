# Opening, gallery deck and finish coordination

This is a local experimental fit revision. Structural capacities, connections, glazing products and the fire/weather/acoustic details are not approved for construction. The active model is installed separately after review; these notes do not claim publication or a completed visual/drawing rebuild.

The staged Compact model is in `outputs/output-structural-openings-compact`. Its untouched input is preserved in `revisions/structural-bearing-openings-2026-10-27/original/openings`. Earlier candidates and their failed or superseded checks are retained separately.

## Geometry

- Coordinate the ground and first-floor courtyard glazing heads, prep partition, gym internal windows, selected door/window linings and cinema projector with the accepted deeper floor zones. Finished floor datums remain 0, 2.8 and 5.55 m. Door hinges and handle heights remain unchanged; the courtyard entry leaf is 2.20 m high.
- Put the opaque head skins outside the full steel flanges. Ten recessed charcoal seal pieces close the actual 7.5 mm head-rail slots, touching the rails and opaque closures while clearing mullions and structure. They are dimensional gasket allowances, not selected products.
- Rebuild the previously disjoint entrance gallery deck as a complete 17.450675 m² body, retaining Z2.756–2.8 and authored material/UV mapping. Remove the 85 mm exterior ledge and exact masonry-pier footprints from that deck and overlapping oak finishes. Preserve the separate existing Y0–0.14 navigation connection into the original house. The structural generator retains a separate legacy rectangular identity reference; it is not the physical deck.
- Keep the garden wall outside face at X−5.015 and move its room-side face to X−4.6475, enclosing the 352.5 mm cavity assembly and 15 mm lining. Shorten only the north fixed-left bay by 156.5 mm, keep its glazing plane, and redistribute its equal-width mullions. Translate the original limestone pieces 137.5 mm with the wall face.
- Cut five real 3 mm frame reveals. Cut the reviewed pad, grout and finite beam pockets in retained piers, the existing opaque floor bands and original junction-head envelope. The two problematic native coplanar Boolean results are replaced by the same closed solids used in the dimensional audit, retaining authored materials/UVs.
- Include nine normal-view pad/grout/top-bed finish proxies that exactly match their structural members, including the small west-bed reveal notch. Their explicit finish tags exclude them from structural extraction and quantities.

## Checks and limits

The exact native check covers the complete deck footprint/volume, navigation masks, five frame reveals, every retained pocket and proxy, all edited opening/finish components, and contact/clearance of all ten seals. Original native scenes and every unrelated Proposed object are compared separately, including vertices, faces, UVs, material assignments, transforms and modifiers.

The broader opening audit still records 29 intersections: 18 involving roof framing, and 11 involving workshop framing or opaque masonry/head envelopes. These are listed in `native-geometry-check.json`; the edited-opening result is not a whole-building clearance approval. In particular, the loft suite doorway/roof and other upper roof-head interfaces remain outstanding.

Browser evidence is under `walkthrough/test-results/structural-bearing-openings-2026-10-27/openings`. The staging server disables stale daylight/furnishing overlays deliberately. Their rebuilt derivatives restore the refined upholstery, limestone normals and directional-light treatment after installation. Geometry review images therefore are not the final appearance release.

Canonical implementations are `scripts/structure/opening_coordination.py`, `scripts/model/proposal_opening_fit.py` and `proposal/specs/structural-opening-fit.json`. The Compact build inventory runs the module immediately after structural finish coordination; Planning omits it. `prepare_opening_fit.py` exports a reviewed stage from the preserved baseline and checks idempotency. No install/build-success cache is written by this staging step.
