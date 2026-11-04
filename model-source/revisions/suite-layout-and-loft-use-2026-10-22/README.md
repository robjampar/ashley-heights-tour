# Suite layout, loft use and matching balcony — 22 October 2026

> Superseded: the owner rejected the suite sitting area and loft reading nook. The [23 October correction](../open-suite-eaves-storage-2026-10-23/README.md) restores the walk-through wardrobe and full-width bathroom with a privacy door, and replaces the nook with eaves cupboards. The matching balcony railings remain.

The first-floor combined bedroom now has a 1.95 m open connection to window seating and fitted dressing storage. Sleeping, sitting and dressing occupy approximately 24.04 m²; the rebalanced ensuite is 6.66 m², with a 1.2 m shower, 1.2 m vanity and WC. The two wardrobe runs provide about 3.64 m of frontage at 600 mm depth. The shorter bedroom run makes space to turn past the bedside table. The ensuite doorway sits farther south and opens 120° into the bathroom.

The former loft stair pocket now contains an upholstered storage daybed, low bookcase, reading chair, side table and reading light. The level gallery route to both loft rooms remains open. The original-house straight oak staircase and bottom winders are unchanged.

The original exterior balcony now uses the new terrace's timber finish, 90 mm posts and top rails, 60 mm bottom rails and 32 mm vertical balusters. The guard follows the retained chamfered deck, inset 75 mm to support the posts. Maximum clear gaps are below 100 mm. The deck, brick piers, roof and exterior glazing remain.

Canonical implementation is `scripts/model/proposal_suite_layout_loft.py`, with `proposal/specs/suite-layout-loft-use.json`; both belong to the compact/planning full-build inventory. The late refinement is idempotent. It preserves original-scene objects and UVs when widening the internal cross-wall opening.

`original/` holds recovery copies of current native models, exports, navigation, visual assets and changed source files. `prepare.py` creates isolated candidate models; the material-free regional export is only for early geometry checks. `export.py` creates full GLBs. `install.py` requires passing geometry, original-scene preservation, door-swing, navigation and preflight checks, plus unchanged baseline and source hashes. The installed `suite-layout-loft-refresh.json` records this targeted integration separately from historical full-build reports. Standalone drawing packs are not regenerated.

The widened opening in the retained cross-wall requires structural lintel and bearing design. The existing stair's previously recorded headroom and construction allowances remain. This is an architectural proposal, not a construction certification.

Final evidence belongs in `walkthrough/test-results/suite-layout-and-loft-use-2026-10-22/`. Native neutral-light images are explicitly separate from actual Chrome walkthrough screenshots. See `final-validation.json` for the completed verification scope. No publication is included.

A final close-fit check corrected the three fixed stops on each suite door to sit 1 mm behind its closed leaf. `patch-stops.py` updates those six native object transforms; `patch-stop-glb.mjs` applies the same world translations to the six GLB root nodes. It asserts that every mesh, accessor, material, image and unrelated node remains unchanged and preserves the binary chunk exactly. `pre-stop-correction/` retains the completed full exports before that correction. `install-stop-correction.py` records the correction and both sets of hashes in the targeted refresh report. Lighting, complete door-swing checks and the actual browser review use the corrected models.

The browser close-up also revealed six retained metal corner posts beside the inset timber guard. `remove-old-posts.py` retires them from proposal collections while retaining the original scenes; `remove-old-posts-glb.mjs` detaches their six exported scene roots without changing any binary geometry or image data. `install-balcony-post-correction.py` appends this correction to the same provenance chain. Pre-correction files are retained in `pre-balcony-post-correction/`, and the canonical builder removes these posts on fresh builds.
