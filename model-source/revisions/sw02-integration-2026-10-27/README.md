# SW02 — approved proposal integrated, 27 October 2026

The owner approved the retained-suite proposal: “that looks perfect lets do it”. The main native Compact Proposed model, normal walkthrough and structural overlay now contain it. The earlier SW01 suite replan and wall-transfer alternatives remain uninstalled historical studies.

Open the [principal suite](http://127.0.0.1:8765/?design=proposed&room=proposal-new-principal-suite) or [its support overlay](http://127.0.0.1:8765/?design=proposed&room=proposal-new-principal-suite&structure=1&element=M-SW02-POST). The original concept drawings remain at `/reviews/simple-structure/#suite`; final details are in the main model.

## Implemented arrangement

- All 124 checked principal-suite furniture objects retain their previous geometry and positions. The bedroom, sitting area, desk, walk-through wardrobe, bathroom and entrance arrangement are retained.
- Two provisional UB305 × 165 × 54 ceiling girders meet at `M-SW02-POST`, a one-storey SHS150 × 150 × 8 trial concealed in a 565 mm extension of the existing media/wardrobe partition end. The previous exposed column and its encasement are removed.
- Cinema and garage divisions align at X9.455 m, with 215 mm bearing cores and 15 mm finishes each side. Their 826 mm door leaves and 950 mm rough openings align south of the post bearing. The garage north entrance remains.
- Main-wing loft joists are 72 × 245 C24 at no more than 400 mm centres, spanning nominally 4.2225 m to the coordinated receiving lines. The enlarged utility/gym strip has a matching solid-timber trial; the remaining garage bay retains its JJI proposal.
- The north transfer and west garage transfer use provisional UC305 × 305 × 129 sections. The gallery east member retains the narrower 254 × 146 × 31 trial after checking the actual floor-load patterns, avoiding the concept's larger section at that interface.
- The lower cores, padstone, grout, base plate, post and cap plate have explicit modelled contact. New ground-floor cores bear on the vehicle slab; the aligned cinema core continues below it. These are bearing/connection envelopes, not fabrication details.
- The van fits the narrowed garage. Its bench and cupboard move to the enlarged utility. The basement console, including books, pulls, lamp, plant and artwork, moves to the clear north wall east of the media sofa, preserving the bar island, seating, stairs and existing media joinery.
- Door linings, architraves, stops, skirting, floor finishes and moved lights follow the revised walls. The final furnishings export replaces duplicate temporary trim and removes the cinema door's obsolete corner-scribed head.

## Validation and evidence

- The complete Python suite passes **278 tests**: `logs/sw02-all-python-final-2026-10-27.log`.
- The relevant viewer suites pass **33 tests**: `logs/sw02-viewer-tests-2026-10-27.log`.
- The native stage verifies idempotence and unchanged hashes for all seven original comparison scenes. `final-sw02-report.json` records the final changes and scene checks; `final-sw02-source.json` records the stage's inputs.
- The structural register contains **2,577 members/assemblies**, **27,645 masonry pieces** and **61 open coordination issues**. Eighteen bounded floor-loading patterns are screened; these do not verify the complete structure.
- Scoped structural intersections remain **86**, with **no new unordered pair** relative to the saved baseline. Covering intersections reduce from 1,476 to 1,467 with no new pair. Existing issues elsewhere are not cleared by this revision.
- **514** linked hanger assemblies pass the limited solid-intersection and seat-level check (2,004 tested solid pairs). Joist ends are mapped to receivers; the new post load-route geometry is checked through the lower core.
- `make check-layout` still reports the identical **345 pre-existing findings**, exit status 2. No new layout finding was introduced.
- Final walkthrough screenshots and browser passage checks are saved under `walkthrough/test-results/sw02-integration-2026-10-27/`. The browser report records errors, both relocated-door passage checks, the selected post and its bounds. Final asset hashes and verification links are recorded in `native-validation.json`.

Build logs: `logs/sw02-native-release-2026-10-27.log`, `logs/sw02-structure-release-2026-10-27.log`, `logs/sw02-visuals-release-2026-10-27.log`, `logs/sw02-web-release-2026-10-27.log` and `logs/sw02-browser-release-2026-10-27.log`.

## Sources and recovery

The targeted native edits are in `proposal/specs/sw02-native-integration.json` and `scripts/model/proposal_sw02.py`. Structural coordination is in `scripts/structure/sw02_integration.py`; the retained-suite study supplies the load assumptions. `scripts/build/prepare_sw02.py` stages changes from an explicit source into a separate output directory before promotion. The build inventory includes the new module and specifications.

The final native stage is `outputs/output-sw02-release-staging/`, promoted to `outputs/output-proposed-compact/`. `original/` preserves the pre-integration native model, exports and structural records. Intermediate stages/reports remain available as dated evidence. `initial-native-validation.json` is the first stage's historical hash record; `native-validation.json` identifies the actual final assets. Do not overwrite current work with an older stage accidentally.

The full native source-build manifest is deliberately not relabelled as a completed rebuild: this was a verified targeted integration followed by actual structural, furnishing, daylight and web builds. The frozen concept-study status describes its original issue; this record documents installation.

## Limits

This is an experimental coordination model, not a construction-ready structural design. The isolated steel/timber/axial screens do not establish assembled-floor movement, lateral stability, roof loads, fire resistance, connections, masonry bearing/buckling, existing-wall capacity, slab punching/bending, basement reinforcement, ground conditions or foundation adequacy. Those remain for the appointed engineer and suppliers before physical works. No publication or deployment was performed.
