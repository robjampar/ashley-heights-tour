# Rear glass extension inset — 20 October 2026

Owner instruction: move the rear extension inward 400 mm at `Proposal | Garden east glazing entry right` and infill the newly exposed former-window opening.

The east facade moves from x=4.50 to x=4.10 m. Both opening leaves retain their 775 mm widths and complete hardware; their hinge axes, fixed panels, headers and collisions move together. The north fixed bay shortens, with mullion sections retained. The room floor, ceiling, roof fascia, terrace deck, guard and drainage follow the inset. The three walk-on rooflights and the furniture stay in place. Duplicate shared corner posts are removed.

New masonry closes the exposed eastern end of the original kitchen rear-window opening, up to its retained lintel. The opening remains approximately 3.096 m wide. Its plaster jamb finishes 2 mm behind the glazing frame to avoid coincident faces, with brick on the exterior and a coordinated floor threshold/skirting. The original piers and lintel remain unchanged.

This change belongs to Proposed (Compact): the Planning variant omits this extension. The preceding loft/courtyard junction repairs remain in both variants.

The canonical late pass is `scripts/model/proposal_rear_glass_inset.py`, registered in `build_support.py`; `rearGardenRoomInset.eastInsetM` in the Compact specification controls it. Dated scripts prepare an isolated native derivative, export the entire GLB and install the checked pair locally. The immediate recovery copy and checksums are under `original/` and `recovery-manifest.json`. Historical full-build caches and drawing-pack provenance are retained unchanged. This is not a full model rebuild or publication.

Evidence is under `walkthrough/test-results/rear-glass-inset-2026-10-20/`. Native neutral-light before/after inspection images are explicitly distinguished from browser screenshots. The final validation record will identify completed geometry, retained-scene, visual/daylight and viewer checks.

Final verification: **107 Python tests and 229 viewer tests pass**, both 192-sample visual/daylight audits pass, retained original scenes match their recovery copies, and the local web build serves the current model/navigation. The workspace check retains exactly its 345 existing findings. Native close renders were reviewed; live browser screenshot review remains unavailable. See the matching `walkthrough/test-results/rear-glass-inset-2026-10-20/final-validation.json`. No publication took place.
