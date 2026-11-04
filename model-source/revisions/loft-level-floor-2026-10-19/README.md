# One-level loft and return stair

The proposed solution keeps the loft at **+5.55 m throughout** and uses an ordinary return stair with two straight flights and one rectangular half landing. A separate first-floor route reaches the principal bedroom. At loft level, a flat-ceiling landing joins a continuous gallery to the hobby room and loft suite. There are no steps into either room.

**The necessary architectural change is the proposed wing roof.** Its ridge moves 2.155 m toward the drive, from x=9.455 to x=7.300, while retaining its +8.05 m height and existing eaves. The front slope remains plain, with no front dormer, but its pitch changes from 29.7° to 46.4°. The rear pitch becomes 21.4°, and the existing rear flat cap follows the ridge. The courtyard wall is flush at x=9.70 m on both upper floors; its normal 120 mm roof drip remains.

This is a reviewable architectural proposal, **not owner acceptance or construction approval**. The main Compact and Planning models, specifications, navigation and published walkthrough are unchanged. The browser study and editable native are isolated derivatives. The earlier lowered-gallery and front-dormer studies remain rejected.

## Review

- Open `launchers/Open Level Loft Study.command`, or use the local preview at <http://127.0.0.1:8895/> while its server is running.
- The view menu contains the first-floor plan, loft plan, roof section, matching exterior comparison, 3D cutaways and four walking routes.
- The [saved review](http://127.0.0.1:8895/review.html) puts the plans, section, exterior comparison and selected eye-level screenshots on one page. Standalone SVG plans and all 17 reviewed PNG views are retained with the evidence.
- The editable file is `outputs/output-loft-level-study-2026-10-19/Ashley Heights — One-level loft study.blend`. Scene 01 contains the upper-floor study with both destination rooms and the principal bedroom. Scenes 02 and 03 compare the roof profiles. Materials are simplified for spatial review; this is not a photorealistic finish proposal.
- Browser evidence, diagrams and geometry reports are in `walkthrough/test-results/loft-level-floor-2026-10-19/`.

## Final dimensions

| Item | Modelled dimension |
|---|---:|
| First floor / loft floor | +2.80 m / +5.55 m |
| Rise | 15 equal rises of 183.333 mm |
| Going | 260 mm in both flights |
| Arrangement | 7 rises, rectangular half landing, 8 rises |
| Flight width | 1.10 m; approximately 1.055 m between handrails |
| Stair pitch | Approximately 35.19° |
| Half landing | 2.35 × 1.10 m at +4.0833 m |
| Top landing depth | 1.10 m |
| Gallery ceiling | +7.60 m, giving 2.05 m clear |
| Gallery at the tightest facade pier | Approximately 955 mm between pier and guard |
| Suite entry | Reframed 1.10 m opening; planted head stop gives 2.033 m clear |
| First-floor hall ceiling | +5.25 m, giving 2.45 m clear |
| Narrowest measured first-floor route envelope headroom | Approximately 2.12 m beside the high end of the upper flight |

The upper floor stays flat. Only the gallery ceiling lining sits 40 mm below the existing room ceilings, to pass cleanly beneath the retained roof junction. The original 570 mm lowered gallery, its end steps, lowered first-floor ceiling, cut-back wall heads and wardrobe alterations are all gone.

The first step faces the approach from the existing main landing. The upper flight ends on a full-height landing, with a short turn into the level gallery. This is a return stair with a shared gallery, replacing the earlier bifurcated stair. The wider treads of this final 15-rise version improve on the initially validated 16-rise/240 mm study; that reference is retained in `validated-16-riser-reference/`.

The existing reading chair, table, lamp and accessories move together into the wider north gallery. Both rooflight positions are retained, now opening through the rear flat cap. The suite doorway is widened and its low head is raised, with new linings, stops and an open leaf. The principal-bedroom doorway, gable wall, approach balustrade and fitted furniture remain.

## Verification and limits

`check-study.mjs` raycasts the exported triangles, including walls, frames, handrails, furniture, roof shells and floor edges. It checks 900 mm walking envelopes along the principal-bedroom route, stair approach, both upper room routes and across the half landing; floor continuity; tread and landing headroom; pitch-line clearance every 20 mm across 1.00 m of each flight; transverse stair-body clearance; and thin door-stop/facade-pier locations that regular sampling could miss. The last completed run records **zero body, headroom or floor-continuity failures**, with 1,713 overhead samples. The tightest overhead result is the suite door stop at 2.033 m. These are model measurements and sampled collision tests, not a survey or certification.

`check-constraints.mjs` checks 13 design constraints, including unchanged floor/ridge heights, a flush facade, rear-side flat caps, rectangular landings, uniform stair dimensions, the retained reading group and rooflights. The source GLB SHA256 is verified unchanged. The native writer imports the same triangle buffer and records its hash separately, so the editable study can be tied to the geometry that was checked.

`check-native.py` compared every vertex in all three editable scenes with the exact browser buffers: maximum coordinate error **0 m**. The spatial scene contains 3,744,237 vertices. The native was not saved or changed by that check. `browser-review.json` records the screenshots and review scope; browser warning/error logs were empty. Route playback was also checked from a drawing view. `make check-layout` still exits with the **345 previously documented workspace findings**; it is not a passing check, and none of its entries names this dated study or launcher.

The roof is reconstructed as the highest envelope of planar surfaces using the supplied original roof control vertices. Previously hidden original-roof patches are regenerated; the result is not made by hiding head collisions or cutting arbitrary holes out of structural geometry. The stair opening is one ordinary rectangular opening. Structural member sizes, support reactions, insulation, fire strategy, drainage and construction tolerances are not designed by this study. In particular, its inherited nominal roof packages—350 mm vertically for the new pitched roof and 220 mm for the flat cap—must be coordinated with the required clear heights rather than assumed to be an engineered specification.

The stair dimensions fall within the private-stair dimensional ranges in England's [Approved Document K](https://www.gov.uk/government/publications/protection-from-falling-collision-and-impact-approved-document-k); that limited comparison is not a whole-design compliance assessment. The 21.4° rear pitch needs an appropriate covering and site-specific headlap/fixing specification. [CUPA PIZARRAS's roofing guide](https://cdn.cupapizarras.com/uk/roofing-slate-guide/) explains that low pitches depend on exposure, slate size and headlap. [Pasquill's roof-design information](https://pasquill.co.uk/roof-solutions/) describes project-specific engineered roof design and calculations; no supplier has reviewed this particular scheme, and no enquiry has been sent.

## Reproduce

From the workspace root:

```sh
node revisions/loft-level-floor-2026-10-19/build-study.mjs
node revisions/loft-level-floor-2026-10-19/build-exterior.mjs
node revisions/loft-level-floor-2026-10-19/check-constraints.mjs
node revisions/loft-level-floor-2026-10-19/check-study.mjs
```

Copy the authored `index.html`, `review.html` and `study-viewer.js` into the dated browser-evidence directory, then bundle the latter with the workspace's existing esbuild. Run `build-native.py` and then `check-native.py` through Blender to regenerate and verify the isolated native. Rebuilding invalidates any saved visual-review status until the new model is reviewed. Do not run the saved 16-rise reference as the active study or overwrite the live proposals with this derivative.
