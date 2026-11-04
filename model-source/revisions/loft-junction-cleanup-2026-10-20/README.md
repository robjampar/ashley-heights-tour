# Loft and courtyard junction cleanup — 20 October 2026

Owner review: screenshots at 12:14:49 and 12:16:22; original front knee wall 1; oversized loft suite door.

The retained front knee walls are scribed to the actual roof underside. A continuous plaster enclosure closes the unfinished low eaves pocket beside the staircase; the old short projecting wall end now terminates at that enclosure. The connecting gallery and both stair routes retain their accepted levels and geometry.

The suite leaf is 826 mm wide and retains its 2,032 mm height. Jambs, stops, head, architraves, lever, hinges, wall piers and interactive-door metadata move together. Native plaster is recessed behind the oak lining. The complete door is checked both open and closed.

The rooflight rough openings are recessed behind their finished plaster reveals. The ceiling butts to the reveal perimeter, eliminating coincident surfaces while retaining the glass, curbs and original clear apertures.

A bronze spandrel finishes the exposed landing slab between the courtyard glazing, with matching exterior-wall returns. Ground-floor piers align with the upper facade; the duplicate gym corner face is cut back, and the formal-room ceiling stops at the outside wall instead of projecting into the courtyard. Interior oak walking surfaces are retained.

Canonical pass: `scripts/model/proposal_loft_junction_cleanup.py`, registered after the earlier landing finish repair in `scripts/build/build_support.py`. Its idempotence and the full builder's pending-door path are exercised during preparation. This is a targeted native integration and complete GLB export, not a full model regeneration. Original inputs and current model recovery copies are retained in `original/`, indexed by `recovery-manifest.json`.

## Review and validation

Dated evidence: `walkthrough/test-results/loft-junction-cleanup-2026-10-20/`.

- Native neutral-light close renders compare the loft junction, front knee wall, suite entrance and courtyard; additional views check the closed door and rooflight.
- Triangle checks use Blender's tessellator: a fan triangulation of Boolean-cut concave polygons falsely fills the rooflight apertures.
- Checks cover clear rooflights and separated reveal faces, wall/lining clearance, the door's dimensions and closed fit, exterior band materials, removed overlapping faces, preserved stair routes and unchanged unrelated geometry records.
- Original retained native scenes are compared against recovery copies.
- Python suite: 107 checks passed. Workspace check retains the previous 345 findings; it does not pass.
- Live Chrome control times out. Native renders and exported geometry are not a claim of browser screenshot verification.

Local integration, visual asset refresh and web build status are recorded in the final validation summary. No publication is authorized or performed.

Final verification: **107 Python tests and 229 viewer tests pass**, both 192-sample visual/daylight audits pass, retained original scenes match their recovery copies, and the local web build serves the current model/navigation. The workspace check retains exactly its 345 existing findings. Native close renders were reviewed; live browser screenshot review remains unavailable. See the matching `walkthrough/test-results/loft-junction-cleanup-2026-10-20/final-validation.json`. No publication took place.
