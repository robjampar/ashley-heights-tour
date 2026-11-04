# Oak loft staircase and first-floor landing joins · 21 October 2026

The loft stair follows the ground-to-first staircase's pale oak, rounded handrails, straight uprights and ivory side finishes. The owner's requested oak spindles replace the loft glass panels and metal clamps. Open risers, 1.00 m treads, the half landing, the larger bottom landing and the accepted stair position remain.

The new round rails are 60 mm in diameter, with eased continuous turns and a joined oak gallery guard. Slim 40 × 90 mm newels and housed side strings keep the principal-bedroom passage clear. The half landing has an integrated ivory base and oak edge finish; outward string faces are ivory to match the original staircase. The original ground-to-first stair is unchanged.

At the first-floor junction, the top of `Proposal | Original ground junction lintel` is recessed to 2.770 m and covered by a closed oak threshold at the existing 2.802 m finish level. The 400 mm strip beside the courtyard pier now joins the wing floor continuously, with a closed slab and matching oak finish. Overlapping floor skins are trimmed back, including a doubled strip at the head of the original staircase.

Canonical implementation: `scripts/model/modern_loft_stair.py`, `proposal_loft_bedroom_expansion.py`, `proposal_stair_landing_finish.py`, and the stair specification in `proposal/interiors/leisure/loft-stair.json`. This is a targeted refresh of both current proposal models, not a full architectural rebuild. All unrelated geometry, retained native original scenes and the accepted garden-room chamfer are preserved.

Recovery copies and the manifest are in `original/` and `recovery-manifest.json`. Evidence is in `walkthrough/test-results/oak-spindle-stair-2026-10-21/`. Native inspection renders are expressly not browser screenshots. The available browser inventory was empty and native Chrome control returned `timeoutReached` (-10005), so live browser visual review could not be performed in this session. No publication is included.

See `final-validation.json` in the evidence folder for the delivered asset hashes and completed checks; do not treat intermediate renders or audit attempts as final acceptance.

Final verification: 236 viewer tests and 107 Python tests pass. Exported mesh geometry, 900 mm passage checks, stair headroom, native scene preservation and both 192-sample daylight audits pass. The local server serves the current model. The layout check has exactly its 345 pre-existing findings. Eight native views were reviewed; browser screenshot review remains unavailable. No publication.
