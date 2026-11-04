# WM01 — exterior masonry and gallery beam infill

The gap beside M-BRICK-303DDFE is closed with an exterior brick return. The courtyard window piers formerly represented by M-S-A6681C6-02 and the matching northern timber assembly are now brick outer leaf, 150 mm cavity and block inner leaf. The missing ground-floor piers below are also included. The room-side stud tail from CJ02 and the actual timber loft walls remain.

M-FR-1-035 now has fitted cut-brick infill in its **outer channel**, with a separate bedding allowance. Its usable depth after web/root clearance is **68.6 mm**; a full 102.5 mm brick does not fit there. The inner channel retains the joist-hanger packing. Infill is not treated as full-width load-bearing masonry or as composite strengthening of the beam.

The piers above have separate shelf-plate and bedding reservations because the cavity wall is wider than the existing beam flange. The lower walls have a continuous concrete upstand/strip-footing allowance to avoid showing them over the slab edge without support. The strip uses the existing F01 reference envelope, 600 × 300 mm at model z −1.15 to −0.85 m; this is **not a selected foundation design**, and is not covered by the garage/garden pressure checks. Soil, nearby basement and retained foundations, settlement, reinforcement and construction sequence remain unresolved.

## Native coordination

The Proposed native model and normal walkthrough retain the glazing positions and exterior finish. The inner pier faces move inward to accommodate the block leaf and lining. Four fixed-frame pockets, the south internal corner, west return linings and floor/ceiling perimeter cuts follow the masonry. Structural framing references preserve the existing full-length joists; no existing steel section, axis, joist or hanger geometry changes.

This is a guarded **targeted native integration**, followed by regenerated compact furnishings, daylight and structural data, then the local web build. It is not a full-source house rebuild. Original files are preserved under `original/`; `recovery.json`, `installation.json` and `validation.json` record provenance and checks. The seven retained native scenes are unchanged. Nothing is published.

## Load and connection limits

Added first-floor masonry, plate, grout and channel-infill self-weight is counted once in the linked gravity calculation, including onward reactions into M-FR-1-030. Assumed densities produce approximately **9.09 / 11.45 / 14.23 kN** added permanent load in the low/reference/high scenarios. The corresponding all-bays loaded total deflections are **1.99 / 2.27 / 2.64 mm** for M-FR-1-035 and **2.31 / 2.53 / 2.83 mm** for M-FR-1-030. These are isolated simply-supported gravity screens, not complete assembly or masonry movement verification.

The 12 mm shelf thickness is a spatial allowance only. Eccentric masonry loads, beam torsion, flange bending, plate bending, welds, restraint, masonry strength, padstones, complete facade/roof actions, movement, fire protection and moisture/thermal details still require design. No fabrication or construction approval is implied. UK01 sections and its provisional 20 mm targets for the two other loft beams are unchanged.

The [IStructE masonry detailing guide](https://www.istructe.org/IStructE/media/Public/Resources/report-overview-specifying-detailing-masonry-construction-20190601.pdf) illustrates widened top plates and shelf support where the wall exceeds the beam flange, with eccentricity and movement requiring consideration. It does not verify these particular details.

## Review

Open the [courtyard piers](http://127.0.0.1:8765/?design=proposed&structure=1&element=M-BRICK-A6681C6), [outer channel infill](http://127.0.0.1:8765/?design=proposed&structure=1&element=M-WM01-GALLERY-CHANNEL-BRICK), or [west return](http://127.0.0.1:8765/?design=proposed&structure=1&element=M-WM01-WEST-RECESS-BRICK).

Before/after browser evidence is in `walkthrough/test-results/exterior-masonry-2026-10-29/`. Validation covers added-weight balance, onward reactions, unchanged existing joists/hangers/steel, support contact, window-frame fit, floor perimeter continuity and scoped collision changes. Whole-building unresolved collisions remain. The workspace-layout check retains its pre-existing 345 findings; it is not reported as passing.

The final software suites pass: **312 Python tests and 318 web tests**. The floor regression now checks that actual wall geometry occupies the trimmed samples, with no oak embedded in the thickened pier; open landing samples still require continuous oak. Pipeline fixtures include the new specification. These software checks do not certify structural safety.

The final browser check passed with no JavaScript errors and saved seven views. Screenshots show both levels of courtyard masonry, the fitted outer-channel infill, the inner shelf and the repaired west return; normal architectural views retain the existing glazing and finish.
