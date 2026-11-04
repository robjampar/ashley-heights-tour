# M14 — west loft transfer and side-extension front masonry

The owner identified `M-HIP-FLOOR-BEARING-01` as an awkward transfer and reported missing front brickwork. The former transfer ran across the west bedroom at Y4.405, beneath 7.705 m north–south loft joists. Its western end aligned with a window opening and its eastern end with the opening in the original west wall. It had no verified end-bearing scheme and was an uncalculated reservation.

## West loft revision

The transfer and the thirteen former west-extension joists are retired. Their IDs are recorded in `westLoftShortSpanStudy`; new joists use new references 014–038. Twenty-five **89 × 235 mm solid C24 trial joists** run east–west, normally at **300 mm centres**, with a reduced first spacing at the perimeter. Modelled timber length is **4.6375 m**, between connected room-side receiver faces. The four perimeter receivers retain their references and move inside the blockwork/retained-wall faces. Two obsolete tiny perimeter segments are removed. Hangers, floor build-up layers, quantities, drawings and inspectors regenerate from that layout. The original-house joist direction is unchanged.

WLT-01 uses a conservative **4.7375 m receiver-axis span**, floor Gk 0.75 / 1.00 / 1.35 kN/m², Qk 1.50 kN/m², and timber self-weight. The limited C24 bending/shear/deformation calculation gives final assumed-creep deflections **6.63 / 7.40 / 8.48 mm** and maximum high-case end ULS reaction **3.175 kN per joist**. Each case is within this limited screen's study thresholds. The calculation exposes all assumptions and exclusions in each joist inspector.

These are experimental floor-only candidates. The concentrated floor-load case, vibration, roof/wall reactions, restraints, ledger anchors, opening-head capacity, fire/acoustics and load paths through walls/foundations remain unverified. The perimeter receivers are not silently certified by the joist screen. The remaining floor/ceiling-envelope depth issue is still listed. No structural approval, fabrication schedule or construction-ready design is issued.

A section/spacing benchmark was checked against Timber Development UK's 2023 C24 tables, domestic floor section p6, hosted by Jewson; the exact primary-source PDF link is included in the member register's Sources. Its 89 × 235 mm / 400 mm row is not treated as approval for this particular building or the higher-load case. Existing UK-T01 calculation conventions provide the separately stated conditional WLT-01 screen.

## Front masonry

The accepted model's five `Aligned front windows` pier/sill wall bodies and two window heads were excluded because their names contain “windows.” They are now explicitly mapped rather than relying on keyword classification. The ten brick/block leaves preserve both 1.2 m glazing apertures. They continue through the 200 mm floor band to the actual lower wall/head slices; automatic corner bonding connects the west return without duplicated volume. No masonry is assigned to a floor joist.

Two full cavity-width lintel **envelopes**, with 150 mm end allowances, occupy explicit pockets in the adjoining piers and roof-head masonry. This removes duplicate brick/block volume from the proposed head/bearing space. These are still unselected products: leaf loading, bearing/padstones, cavity trays, ties and restraints need design. The architectural finish/glazing geometry is unchanged.

## Evidence and limits

- 2,666 members/assemblies, 27,381 masonry pieces, 50 open coordination items.
- 52 scoped masonry floor continuations have zero unmatched base area and no checked floor-timber intersections.
- Scoped solid intersections fall from 141 to 137, with **no new intersecting pair** relative to saved M13.
- All 577 linked hanger assemblies pass the limited geometry/seat check. This does not validate fasteners or capacities.
- Structural source fingerprints match. Native `geometry.json` and `navigation.json` hashes remain unchanged.
- Four new geometric/arithmetic regression tests extend the structural suite to 83 passing tests. Viewer tests and real Chrome captures cover the combined overlay and M14 data. Final results are in the matching logs and `validation.json`.

Recovery inputs are in `original/`; `browser-captures.mjs` records before/after views, and `validate.py` checks the M13/M14 comparison. Evidence is under `walkthrough/test-results/structural-west-loft-front-2026-10-26/`. The before/after front elevation and west loft images were visually reviewed. The workspace layout check retains the existing baseline findings; no publication or native Blender rebuild is included.
