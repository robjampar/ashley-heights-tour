# Lighter oak loft staircase · 22 October 2026

The owner asked to reduce both the staircase footprint and its general visual impact. This refinement retains the lower stair's pale oak, rounded handrails and ivory outside faces, while removing the large solid half-landing plinth.

Both flights are now 900 mm wide. The lower flight moves 150 mm east and the upper flight 50 mm west; their straight runs, 15 rises, 260 mm goings, floor heights and longitudinal start/end positions remain. The half landing reduces from 2.25 × 1.10 m to 1.95 × 1.00 m. The existing full-height loft arrival, roof, generous bottom landing, original stairwell lining and principal-bedroom passage remain. Movement ramps, turn surface, low-soffit collision bounds and stair viewpoints follow the new assembly.

Visible tread edges reduce from 90 to 50 mm, round oak rails from 60 to 50 mm, and oak spindles from 28 to 22 mm. Newels reduce from 40 × 90 to 30 × 60 mm. Side strings reduce from 90 to 60 mm thick, with a shallower lower profile. The half landing has a shallow ivory support frame and two slender recessed rear posts; it is open underneath. The outer faces remain ivory and the inner joinery remains oak. Guarding remains on the open edges; there is no new full-height enclosing wall to replace it with a wall-mounted rail.

The slimmer treads have recessed 40 mm oak nibs beneath the nosings. These retain an effective open-riser gap of approximately 93 mm and 20 mm tread overlap. Spindle spacing is at most 115 mm between centres, giving gaps below 100 mm. The reference is [Approved Document K, paragraph 1.9 and guarding guidance](https://assets.publishing.service.gov.uk/media/60d5bdcde90e07716f516cfd/Approved_Document_K.pdf). This is an architectural model: the support frame and slimmer joinery are design allowances, not structural fabrication specifications.

The earlier exposed-lintel and landing-floor repairs, lower staircase, loft rooms, garden-room inset/chamfer and unrelated design geometry are preserved. Canonical sources are `scripts/model/modern_loft_stair.py`, `proposal_level_loft.py`, `proposal_loft_bedroom_expansion.py` and `proposal/interiors/leisure/loft-stair.json`.

This is a targeted native and full-GLB refresh of both current proposal variants, with new visual derivatives and 192-sample daylight bakes. It is not a full architectural rebuild or publication. Immediate recovery copies and SHA-256 hashes are in `original/` and `recovery-manifest.json`.

Evidence lives in `walkthrough/test-results/light-oak-stair-2026-10-22/`; `final-validation.json` is the completion record. The rejected first thin-string trial is retained separately. Native renders are not browser screenshots.

Final verification: 238 viewer tests and 107 Python tests pass. Exported mesh geometry, 900 mm passage checks, stair headroom, native scene preservation and both 192-sample daylight audits pass. The local server serves the current model. The layout check has exactly its 345 pre-existing findings. Five native views were reviewed; browser screenshot review remains unavailable. No publication.
