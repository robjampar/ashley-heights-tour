# Original-house loft stair and combined suite · 22 October 2026

The loft staircase moves out of the mezzanine and into Bedroom 4’s former ensuite. It is one 900 mm straight oak flight with three winders at the bottom, reached from the existing ground-to-first landing. Its upper arrival is under the retained flat-ceiling strip, with level routes to both loft rooms. The existing lower stair, roof and outside glazing are unchanged.

There are 16 rises of 171.875 mm and 270 mm straight goings. Pale oak treads, 50 mm round rails, fine oak spindles and ivory side strings follow the lower stair. The straight treads retain their recessed open-riser nibs; the three winders are closed. The stair sides house the tread ends. A fitted ivory enclosure closes the lower underside. The dark hobby-room work mat is removed from the new upper arrival, leaving oak underfoot. The previous mezzanine stair is removed, the loft deck/first-floor ceiling are repaired, and oak covers the old ensuite wall line.

Bedroom 4 and Sidebed 01 form one suite:

- Sleeping room: about 13.20 m², with a superking bed, bedside drawers and reading lights.
- Dressing room: about 8.24 m², with 3.855 m of full-depth wardrobes and low drawers beneath the existing front window.
- Bathroom: about 8.77 m², with a 1.6 m double vanity, 1.2 m shower and WC. There is no bathtub in this arrangement.

The retained cross-wall has a 920 mm opening between sleeping and dressing spaces. The superseded side-bedroom entrance is closed and plastered. New nominal 826 mm oak room doors have jambs, stops, architraves and bronze hardware. The bathroom leaf opens back toward its wall to clear the shower route. Navigation, door interaction, room shortcuts, floor supports and stair ramps follow the new arrangement.

[Open the local walkthrough](http://127.0.0.1:8765/?design=proposed) or [the plan and render review](http://127.0.0.1:8896/). The review has a Finder launcher in `launchers/Open Original-house Stair Review.command`.

## Scope and verification

This is a targeted integration into both current native proposal models, followed by complete GLB exports, refreshed visual derivatives and daylight. It is not a full architectural rebuild or publication. `bedroom4-stair-suite-refresh.json` in each main output records the new inputs and hashes separately from historical build reports. Recovery copies and their manifest are retained here under `original/`.

Canonical implementation is `scripts/model/proposal_bedroom4_stair_suite.py`; its component/layout input is `proposal/specs/bedroom4-stair-suite-components.json`. Both are registered in the build inventory. `prepare.py` creates the coordinated full candidates from recovery models. The final `close-crosswall.py` increment adds the same canonical wall helper identified during native review, records its geometry/navigation and updates the input fingerprint only after that change has actually run. `clear-partition-remnants.py` removes planning-only remnants of the retired ensuite walls; `finish-joinery.py` applies the canonical floor, enclosure and hollow-vanity dimensions identified by render review. `finish-arrival.py` clears that mat and completes the last oak corner. `install.py` gates installation on preservation, exported-geometry, door-swing, navigation and preflight results.

Evidence is in `walkthrough/test-results/bedroom4-stair-suite-2026-10-22/`. Native neutral-light renders are not browser screenshots. `final-validation.json` is the final completion record. Initial cropped-study files remain as development history; use `proposed-plan.png`, `stair-section.png`, `integrated-review/` and the main walkthrough for the final arrangement.

The final close render exposed coplanar hobby-floor and bridge-floor finishes at the upper arrival, producing a black patch even after removal of the work mat. `finish-surface-joins.py` applies the canonical clipping of the redundant finish, retaining its unique south edge. It also aligns the housed strings' stepped undersides with the enclosure, closing 20 mm notches at the riser lines. Export tests check single floor coverage and the string joins near both tread ends.

Completed locally: both native models and full exports installed; visual derivatives and 192-sample daylight refreshed; viewer rebuilt. All 246 viewer tests, 107 Python tests, 42 targeted preflight checks, exported headroom/body routes, door-swing checks and navigation checks pass. All seven original scenes are preserved, and the workspace retains its 345 baseline findings without additions. Legacy test expectations were updated for the removed Bedroom 4 ceiling, retired basin emitter and four retired generic door surrounds.

Ten actual walkthrough screenshots were captured in headless Google Chrome and visually reviewed, covering both variants. There were no browser errors, warnings or failed requests. The review page includes these separately from the native renders. `served-assets.json` verifies that the local HTTP server serves the current built files, that packed geometry/textures match the source model, and that navigation differs only by the normal vehicle build transforms. `final-validation.json` records the completion evidence.

The checked 900 mm main-hall strip beneath the stair has approximately **2.01 m minimum headroom**. That leaves little construction tolerance. The housed supports, floor trimming and opening through the original wall are architectural allowances requiring structural design and coordination of finished dimensions. These geometry checks do not establish structural capacity, fire strategy or construction compliance.
