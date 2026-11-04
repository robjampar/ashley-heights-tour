# Main model integration — 19 October 2026

Owner approval: “yeah perfect implement it” accepts the one-level loft and offset-ridge study. Follow-up instructions also remove the covered recess outside the gym, enlarge the gym and provide a more generous landing at the bottom of the loft stair.

Implementation is complete in both current Proposed and Planning native models and local walkthroughs. The isolated 19 October study remains as historical evidence of the accepted design; it is not the final main-model export.

The roof retains the approved height, offset ridge, uninterrupted front slope and flush courtyard gallery. The loft floor stays at +5.55 m, with the gallery ceiling at +7.60 m. The return stair retains fifteen equal rises, 260 mm goings, 1.10 m flights and a 2.35 × 1.10 m half landing. The complete stair and its rectangular opening move 650 mm south for the follow-up request. This creates a 1.725 m-deep bottom landing. The old wall head crossing the relocated half landing is cut only within the rectangular shaft, clearing the walking envelope.

The gym courtyard wall and double doors move 1.20 m north to y=-3.029 m, enclosing the former loggia. The proposal includes extended rubber flooring, ivory ceiling, oak perimeter trim, door reveals and an extra ceiling light. Existing equipment positions, west-facing treadmills and hall/utility access are retained.

Recovery copies of both native proposals, source specifications, affected scripts and visual assets are under `original/`. Validation and screenshots belong in `walkthrough/test-results/level-loft-integration-2026-10-19/`. Logs belong in `logs/` and each generated model directory. No publishing is included.

Both full native builds completed. All 106 Python tests and 174 web tests pass. Actual exported-geometry checks cover 1,809 overhead samples per variant, floor continuity, the stair body and 900 mm circulation envelopes, with zero failures and 2.033 m minimum measured overhead clearance. All seven original scenes and 11,883 original objects remain identical to recovery copies in each variant. Both 192-sample lighting audits pass; the local web build is complete. The workspace checker retains its 345 pre-existing findings.

Live Chrome review covered the bottom landing, stair arrival, level gallery, suite doorway, expanded gym and flush courtyard elevations across the two variants. Thirteen screenshots are recorded in [browser-review.json](../../walkthrough/test-results/level-loft-integration-2026-10-19/browser-review.json); both variants had no console warnings or errors. The final [Joined first-floor landing](http://127.0.0.1:8765/?design=proposed&room=proposal-joined-first-floor-landing) shortcut now stands on clear floor beside the stair. The gym's west planter is shortened to clear the moved doors' full outward sweep.

Post-build corrections split Planning's mixed-finish inventory, repositioned that landing shortcut and kept regenerated door-frame labels tied to their original doorway. Both visual derivatives and daylight caches were subsequently rebuilt. The extra gym diffuser has its own physical emitter, replacing the approximate point fill. Native models and base GLBs still match their successful full-build hashes; navigation records the later metadata corrections. Historical full-build caches are intentionally untouched and no longer describe the final source exactly. See [final-provenance.json](../../walkthrough/test-results/level-loft-integration-2026-10-19/final-provenance.json) and the separate refresh reports; do not substitute fresh hashes into historical build records.

Geometry checks are model measurements. Roof and stairwell framing, roof build-up and weathering require project-specific construction design.
