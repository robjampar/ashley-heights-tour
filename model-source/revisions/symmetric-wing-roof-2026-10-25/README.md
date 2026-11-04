# Symmetrical main wing roof — 25 October 2026

The main wing now has a centred ridge, equal roof pitches and a coordinated loft interior. The original-house stair stays in its accepted position.

| Element | Revised model |
|---|---|
| Main ridge | X9.455, Z8.05 m |
| Main eaves | X4.73 / X14.18, Z5.35 m |
| Main pitches | 29.745° each side |
| Roof junction | Straight abutment at Y−5.0; northern gallery roof retained |
| Loft floor | Z5.55 m throughout |
| Finished dormer ceiling | Z7.60 m; approximately 2.036 m above finished carpet |
| Rear dormer | Western roof edge X9.55 south of the junction; existing glazing retained |
| Level approach | Turn at Y−4.35 into the rear dormer, then south at X10.35 |

The bedroom furniture fits the new roof: the bed is against the south bathroom partition, the dresser uses the west eaves, and the desk and reading chair leave access to the ensuite. The eaves-store door, its complete frame and opening move 1.50 m east; the original opening is filled. The standard ensuite doorway and lower eaves-store doorway retain their existing leaf heights. The entrance pendants retain their hanging heights, with shorter cables and refitted ceiling plates.

The original building roof, north gallery, rooflights, flush courtyard facade, external glazing, level floor and staircase are retained. No front dormer is added. The symmetrical roof reduces full-height space on the western side of the loft bedroom; the room’s floor footprint is unchanged.

Canonical inputs are [the roof spec](../../proposal/specs/symmetric-wing-roof.json), [envelope geometry](../../scripts/geometry/symmetric_roof.py) and [coordinated model pass](../../scripts/model/proposal_symmetric_wing_roof.py). Recovery copies are in `original/`. Preparation and full GLB export are isolated from the current models until geometry, circulation and native-preservation checks pass. `install.py` checks hashes before replacing the local model pair.

Validation evidence is under [the dated test-results folder](../../walkthrough/test-results/symmetric-wing-roof-2026-10-25/). Screenshots from the isolated study are geometry previews; final `after/` screenshots use the main walkthrough with regenerated visual assets and daylight.

This revision is local. It does not issue planning drawings or certify structural construction details. The centred main roof and separate connector define the geometry for architectural and structural coordination.

Final verification passes 111 Python tests and 272 viewer tests. Both full exports pass 1,737 sampled headroom checks plus floor/body clearance checks, with a minimum sampled habitable ceiling clearance of 2.019 m; the existing lower eaves-store doorway is checked separately. Both 192-sample lighting audits and served-file checks pass. All seven original scenes and unrelated proposal objects are preserved. Sixteen final Chrome screenshots were visually reviewed, including the corrected plaster finish at the connector and continuous south cheek around the storage door. No console errors, warnings or failed requests occurred. The workspace retains its unchanged 345-finding layout baseline. See [final validation](../../walkthrough/test-results/symmetric-wing-roof-2026-10-25/final-validation.json) and [visual review](../../walkthrough/test-results/symmetric-wing-roof-2026-10-25/visual-review.json).
