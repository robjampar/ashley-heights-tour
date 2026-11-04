# Bearings, cavity ends and opening coordination — 27 October 2026

This revision addresses the requested exposed cavity ends, missing beam-bearing details and openings that conflict with the deeper floor/ceiling assemblies. It also studies a wall-supported alternative to the stair-side column. This is a local experimental coordination model, not a construction issue.

## Wall alternative to the column

**Owner decision, 27 October:** LW01 was rejected after visual review. Preserve it as study evidence only. The follow-up [concealed-column study](../concealed-column-2026-10-27/README.md) investigates retaining the column within a thickened existing wall line.

[Plan and section](wall-transfer-option.png) · [Calculation record and assumptions](wall-transfer-option.json)

LW01 keeps the 318 mm girder depth and floor levels. A new 2.67 m media wall in the principal suite aligns with a locally widened garage/store wall and the proposed basement cinema wall. The main girder becomes continuous over three supports, with approximately 6.10 m and 4.61 m spans. The sofa group moves, retaining approximately 1.00 m at the main route into the suite.

Eighteen low/reference/high floor-load and pattern cases pass the limited gravity screen. The maximum floor-only wall reaction is approximately 125 kN. A favourable dead-load sensitivity produces approximately 0.68 kN of uplift at the north support, so a positive connection is still necessary. Neither figure includes the complete wall, roof, other-storey and foundation design. Support movement, masonry capacity, restraint, connections, fire protection and temporary works remain unverified.

**LW01 is not installed.** The current column remains in the live model. The much deeper column-free girder comparison was rejected by the owner and is retained only as evidence in `column-removal.json`.

## Coordinated details

- The named C99/ACE, 6F/7C and 34AD/0C wall interfaces use joined leaves and separate insulated cavity closures. Closures do not carry structural loads or bridge the cavity with solid masonry.
- Padstone and grout envelopes are provided at the investigated masonry-bearing ends. Checks require actual contact with the correct wall leaf, including both pieces at bonded corners. Steel-to-steel joints and reinforced-concrete seats are distinguished from masonry bearings.
- Gallery receivers are aligned with actual pier positions. The east receiver is continuous, the north cross-beam terminates at the earlier retained pier, and the west receiver moves inward to clear the window pier. The small outboard floor ledge is trimmed; a separate edge-angle allowance supports the remaining deck margin.
- Assumed concealed masonry between aligned retained piers is shown as retained context, excluded from new-work quantities. Finite steel pockets and top bearing beds are separate. These assumptions require survey and full load checks.
- The inspector and bearing schedule distinguish modelled seats, unresolved masonry bearing and joints that still require design. A nearby wall is never treated automatically as a verified support.
- The native opening revision lowers selected heads and coordinates frames, fanlights, soffits, internal door heads and the garden-room wall finish with the revised structural depths. Glazing planes and finished floor levels remain fixed.

## Verification and installation

**Installed locally as M16.** The native Proposed model, public GLB/navigation, structural register and viewer bundle were rebuilt and checked. Compact furnishings and daylight were regenerated at 192 samples. The original source files and previous visual derivatives remain in `original/`. The full-model build cache was not promoted to claim an unperformed drawing-pack rebuild. Nothing was published.

The final opening issue changes 245 objects and adds 28, including ten recessed head seals. All seven original native scenes and 16,002 unrelated exported geometry records are preserved. The complete gallery floor is 17.450675 m². Scoped opening checks report zero solid clashes and zero unmeasured components; 29 broader roof/head/workshop items remain separately listed.

255 Python tests and 316 viewer tests pass. Actual Chrome captures of the installed structure and eleven opening views report no page errors; the corrected heads, garden jamb, floor edge, retained junction and overlay were visually reviewed. The workspace layout check still reports exactly the pre-existing 345 findings, with no additions. The oak-board generator now rejects zero-area source triangles and clipped boundary contacts, preserving its area assertion and authored UV scale.

The register contains 2,582 members and 61 open coordination issues. Its scoped primary clash count is 86 versus 98 before this work, with no new pair IDs; this does not imply that every existing overlap became smaller. Joist endpoint mapping and the linked connection-fit audit report no missing mappings or measured intersections. Source hashes match the installed native data and current structural inputs.

Evidence: [installation manifest](installation.json), [final validation](validation.json), [opening scope](OPENINGS.md), and browser screenshots under `walkthrough/test-results/structural-bearing-openings-2026-10-27/`. Staged records retain their original hashes; the final installed check is `openings/installed-geometry-check.json` in that browser evidence folder.

## Limits

Beam sections, pads and edge angles are coordination envelopes unless a linked calculation explicitly says otherwise. Existing masonry is unsurveyed. All supported masonry/facade/roof loads, steel connections, bearing stresses, restraint, foundations and construction sequences remain to be designed. Remaining issues elsewhere in the model are retained in the issue register. No publication is included.

The beam-end register still identifies four unresolved masonry ends: one each on `M-FR-3-025` and `M-FR-3-008`, and both ends of `M-B01`. Six ridge-beam ends also lack an established support detail. Garden terrace post contacts are classified as steel joints requiring design, rather than missing supports or masonry seats.

The [independent gallery review](gallery-bearing-final-independent-review.json) records eight remaining local clash pairs. “No new clash pairs” does not mean the gallery is clear: moving the west receiver increases its existing overlap with the generic `M-L-6BA8A41` head envelope by 78.3 cm³. The other remaining masonry, head and gym-framing interfaces require further coordination. The [native-stage addendum](gallery-native-stage-addendum.json) separately records the complete floor-body correction and actual source-pier contact checks; its stage hashes are historical snapshots, not the final installation record.
