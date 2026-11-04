# Door frames and white-wall junctions — 19 October 2026

The owner reported continuing clashes between internal frames and white walls. The earlier host-wall/architrave checks missed plaster faces exactly coincident with the exposed jamb and head linings. A broader check also found duplicated cloakroom casings, skirting crossing trim, and the multimaterial front-door panels.

## Correction

`scripts/interiors/door_frame_details.py` now makes a real installation pocket behind the 28 mm door lining, with 2 mm clearance. Skirting ends beside the outside of the casing. Spatially matched obsolete cloakroom architraves and the classical overdoor are retired in the proposal. Original-house objects reused by the proposal are copied before editing, keeping the retained original scenes intact. The door leaves, clear openings, swings and navigation stay unchanged.

The current Proposed and Planning native models are under `outputs/output-proposed-{compact,planning}/`. Prepared derivatives are under `outputs/output-door-wall-junctions-{compact,planning}/`. Recovery copies of the previous source models, visual derivatives, visual assets and frame builder are in `original/`.

The model update uses a complete native GLB export for each proposal and a fresh furnishings export. A final four-piece cinema-casing refinement is then exported from both editable native models and substituted into the full-model GLB and furnishing overlay, preserving all other nodes and previous binary buffers. Directional daylight is rebaked at 192 samples afterward. Current provenance is recorded in `door-wall-final-refresh.json` and the subsequent `door-wall-cinema-refresh.json` beside each main native model. Earlier `door-wall-junctions-refresh.json` and `door-wall-panel-refresh.json` records describe intermediate checkpoints, superseded by the final complete exports. This is a targeted model correction, not a full procedural rebuild.

The cinema casing is scribed narrower where it meets the perpendicular wall, with a notched head following the return and a 1 mm clearance. Boolean-created reveal faces inherit the room finish, keeping the planning partitions white. The original garden-building piers remain unchanged.

The subsequent native render review found a small dark patch at the cinema head notch. The residual east-wall end pier lay wholly inside the north wall, leaving two exactly coincident plaster surfaces. `retire_covered_cinema_pier` verifies evaluated containment before removing that redundant fragment. The replacement render exposed the adjacent 27 mm header overlap as well; `trim_covered_cinema_header` trims that header to the perpendicular wall. The remaining wall retains the exact outer face and the casing stays unchanged. The two further updates are recorded by `door-wall-cinema-pier-refresh.json` and `door-wall-cinema-header-refresh.json` after the earlier refresh records. Native recovery copies, previous overlays, lighting and intermediate renders are retained in `before-cinema-pier/` and `before-cinema-header/`; all earlier provenance hashes remain historical.

## Verification and review

`walkthrough/tests/door-wall-surfaces.test.mjs` tests nearby exported white/plaster meshes independently of the builder's host list. It includes every primitive of multimaterial meshes and samples both architrave faces and the visible jamb/head faces. The test reproduced the original clashes and passes on the corrected 33 Proposed and 32 Planning surrounds.

Evidence is under `walkthrough/test-results/door-wall-junctions-2026-10-19/`; logs use `logs/door-wall-*`. Geometry comparisons verify that unrelated objects and all navigation are preserved. Native signatures verify the seven retained original scenes in each version. The existing host-wall test also resolves proposal copies by their original source identity and checks actual triangle intersections when an adjacent wall return occludes a casing.

The browser was inspected before the correction, but the computer/browser connection then became unavailable. No post-correction browser screenshots are claimed. The final browser review remains a limitation; see `validation-summary.json` for the completed automated checks.

`native-review/index.html` in the evidence directory contains read-only, isolated native geometry renders of both sides of six doorways in each variant. These use neutral inspection lighting with door leaves and furniture omitted; they do not verify browser rendering or room lighting. Original render manifests retain their actual source hashes. Later `*-corrected-manifest.json` records identify replacement cinema and loft-store views from the final native model. The original cinema images remain alongside the replacements as evidence of the defect. The new cinema surface regression reproduced the duplicate in both previous exports before the correction.

No publication was performed.
