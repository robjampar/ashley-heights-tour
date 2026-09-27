# Stopped at the owner’s usage boundary — 27 September 2026

The latest successful Chrome usage reading showed 38% weekly usage remaining,
meaning 62% used. The owner requested stopping at 50% used, with unavailable
readings allowed to continue. New room work stopped when this reading became
visible. The in-flight build was allowed to finish and its checks were recorded.

## Live release

Eleven developed room areas through the family bathroom remain published in both
Proposed and Proposed Planning. Commit `3ecc538e74fe27b56d907bf7f40fc67d1e1e2cf3`,
Pages run `36299322522`, verified 62 assets and 13 pages. See
`publication-familybath.json`. No twelve-room candidate assets were staged or
pushed to the live viewer.

## Saved draft

Bedroom 4 and its ensuite are modelled in both native proposals and isolated
studies. The twelve-room full builds completed, including browser exports.
The source snapshot also contains refined cloakroom/family-bath vanity fronts
and shared identical image textures for isolated room delivery.

Passed: 33 pipeline/publication unit tests; all 24 isolated browser studies;
seven Bedroom 4 circulation states against each full-house navigation; detailed
native Bedroom 4 door/drawer/wall checks; 54 Proposed and 55 Planning white
internal-return rays; preservation of the accepted kitchen/lounge, principal
suite and all other explicitly retained meshes.

FAILED: `audit_leisure_native.py` in both variants. The full Bedroom 4 inventory
contains names absent from its isolated study inventory:

- `Bedroom4 01 | vanity finger recess 0`
- `Bedroom4 01 | vanity base`
- `Bedroom4 01 | vanity back`
- `Bedroom4 01 | vanity end`
- `Bedroom4 01 | vanity drawer front 0`

Diagnose the reused vanity primitives, generated names and study cropping before
changing the audit. Full reports count 279 Bedroom 4 mesh parts. Do not waive
the mismatch or claim exact native/study agreement. Rebuild only affected outputs,
rerun comparison and details/circulation checks as needed, then run the full-house
browser check. Only after success stage and verify publication, including the
1 GB site-size guard and retained-cache window.

## Remaining rooms

See `NEXT-ROOMS.md` and `remaining/room-inventory.json`. The original-house dormer,
hobby/multifunction room, bridge and landings are one connected layout task.
The bedroom and ensuite above the principal suite are separately recorded.
Owner confirmed six everyday formal dining places, with an extending table for
eight to ten; check occupied chair and garden routes in both table states.
These remaining rooms have not been redesigned. PDF drawing packs remain the
previous issue. Resume modelling only after the owner authorises more work
beyond the reached usage boundary.
