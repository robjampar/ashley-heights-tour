# M03 — floor mapping, eaves receivers and masonry continuity

Local experimental structural study, 26 October 2026. Open [the structural viewer](http://127.0.0.1:8765/structure/?element=M-LOFT-GALLERY-009). This updates the member overlay and structural registry; it does not change the accepted native architecture or publish the study.

## Corrections

The gallery's diagonal joist ends and several missing floor bays came from architectural meshes cut apart for floor-finish ownership. Those cuts were incorrectly treated as structural voids. `proposal/specs/structural-floor-layout.json` now records explicit structural plate polygons and their provenance. The real entrance double-height opening and original-house stair opening remain. The generator uses those polygons, removes duplicate bay coverage and closes only micrometre seams.

- The first-floor gallery is rectangular again; the missing entrance-hall and bathroom-side framing is restored. `M-INF-GALLERY-011` now reaches the proposed receiver instead of stopping on the diagonal finish seam. Member sequence numbers can change when omitted runs are restored.
- `M-LOFT-GALLERY-009` now runs from X5.660 to X10.420 at Y−2.000: 4.760 m of modelled joist. The west end meets the face of `M-FR-3-025`, the proposed eaves beam centred at X5.615. The floor extends into the low eaves; this does not create additional habitable room area. The external roof overhang remains.
- The accepted courtyard projection is explicitly a **720 mm cantilever**, with 4.040 m of geometric backspan for joist 009. Its proposed inboard bearing is `M-CANT-GALLERY-BEARING` at X9.700. Seven free tips have no fictitious end hanger. No cantilever capacity has been established.
- Main-wing loft framing reaches the proposed block-leaf bearing lines. A visible intermediate girder divides the long runs; its section and supports are uncalculated reservations.
- Proposed perimeter/bay receivers are selectable and linked from the joist/hanger inspector. Floor isolation includes these floor beams and excludes roof framing. A receiver touching another member is not treated as a verified load path.
- The lower principal gable piers and opening head were incorrectly omitted because they lived in an interior-design layer. They are now explicitly classified as structural masonry. Two floor-level transfer-beam reservations identify the required support beneath the brick/block leaves; the opening head remains unresolved.
- The full-height `Proposal | West north oak band` is restored as a wall body connecting the entrance to the north facade beside `M-BLOCK-0C22ABF`. Retained rear-house wall context is more visible and remains excluded from new-work quantities.
- The garage-gable roof perimeter member is identified as **timber roof edging**, with distinct edge numbers and the correct first-floor level. Its 220 mm verge projection still requires an outrigger/fly-rafter connection design.

M02's timber loft walls and both roof strategies remain: A retains/adapts the original roof; B replaces it to the same agreed external form. Original-garage rebuilding and original-loft floor strengthening remain separate options, off by default.

## What the geometry does not resolve

The issue contains **602 architectural references, 2,278 member/assembly references and 23,054 modelled masonry pieces** across all optional scopes. These are not procurement quantities. There are **28 open coordination items**.

The geometric audit records **219 joists**, **80 receiver members**, **zero unmapped joist ends**, and **seven cantilever free tips**. It also records **55 receiver ends without a nearby direct wall-envelope candidate**. The remainder only have geometric candidates, not verified bearings. Some depend on adjoining beams, and the optional original-house floor study is included in these counts. Zero unmapped ends does not mean zero unsupported members or an engineered support network.

The west eaves beam's roof seat, wall plate, rafter connection, glazing-head clearance and end bearings are not detailed. All new receiving/transfer/girder sections reserve space; they have not been sized for the newly identified reactions. The below-joist cantilever bearing introduces a depth/glazing-head clash. Existing 200 mm architectural floor envelopes are shallower than several trial floor build-ups. The gable opening has limited roof-scribed lintel space. These remain visible issues, not concealed modelling fixes.

There are no ground investigation or engineer reports. Roof loads, stability, connections, bearings, temporary works, foundations and basement reinforcement still require engineering design before physical work. No build-ready or construction-approved claim is made.

## Validation and evidence

`make build-structure` regenerates the registry, UK trial data and member issue, verifies their source fingerprints and bundles the local viewer. Current evidence is in [the browser evidence folder](../../walkthrough/test-results/structural-framing-mapping-2026-10-26/) and `logs/structural-framing-mapping-*.log`.

The Python structural suite and full viewer suite pass. Fourteen actual Chrome screenshots were reviewed, covering the gallery, entrance-hall framing, loft extension and cantilever, restored masonry, retained rear context, both roof choices and the eaves beam with the roof/architectural overlay. The runs report no page errors. The workspace-layout audit still fails on the same existing 345 findings; its output matches the prior workshop baseline exactly. See [final validation](../../walkthrough/test-results/structural-framing-mapping-2026-10-26/final-validation.json) for counts, hashes and limitations.

The pre-M03 editable files and generated registry/member data are preserved in `original/`. `WORKING-NOTES.md` records the initial diagnosis. `browser-review.mjs` and `eaves-review.mjs` reproduce the screenshots against the local server. Earlier M01/M02 studies remain historical evidence. No full native-model audit, Blender rebuild or publication was performed by M03.
