# LP03 — column concealed at the west wall

**Owner review: not accepted.** The owner questioned placing a separate column immediately beside the wall. LP03 is retained as a historical trial, not the recommended solution. The [wall-line review](wall-line-review.md) records the aligned masonry/concrete geometry and why direct bearing must be investigated before adding a duplicate support. No replacement has been installed or structurally approved.

Owner instruction: reject the LW01 bearing media wall; retain a column and investigate a position concealed within a wall through every storey. **This is an uninstalled feasibility proposal. The live LP02 column remains unchanged.**

[Plan and section](concealed-column.png) · [Detailed calculation and geometric record](study.json)

The candidate column centre moves from X8.32/Y−8.63 to X5.40/Y−9.67, beside the solid west recess at the garage/entrance junction. It remains straight down to the basement raft. A flat wall lining conceals the 150 mm SHS and a 210 mm overall encasement allowance. This adds 222.5 mm beyond the current inner block face, across a 0.73 m wall length downstairs and a 1.14 m wall length upstairs. It does **not** fit invisibly inside the existing 100 mm inner leaf. The bedroom stays open and the existing furniture layout is retained.

A transverse beam carries the split main loft girder to the relocated column and the east pier. The preferred trial is UC305×305×198, actual depth 339.9 mm, on an 8.2775 m support span. The modelled beam length including end allowances is 8.4025 m and its mass is approximately 1.665 tonnes. Its top sits 20 mm below the existing girder top to clear the roof, making its underside 41.9 mm lower. Floor levels and the 318 mm main-girder depth remain fixed. The heavier UC305×305×240 comparison is retained in the record; it is not the preferred trial.

The east upper inner-leaf pier would extend 140 mm towards the adjacent window, narrowing that opening. The actual pad and supporting masonry need design. The original 400 mm base-plate envelope intersects the inner 82.5 mm of the proposed basement retaining wall: this requires a formed pocket and reinforcement/waterproofing coordination, or a redesigned base. No cut to an existing retaining wall is proposed. The column shaft itself clears the retaining concrete by 42.5 mm and the casing envelope by 12.5 mm.

## Calculation scope and evidence

Twelve low/reference/high floor-load cases with gallery variable-load patterns pass the limited gravity screen for each trial section. The lighter trial's maximum calculated movement among the checked transfer, main-girder and opening members is 8.84 mm against the study's 10 mm target. These movements include cross-beam displacement, north-transfer displacement, elastic column shortening and the resulting support movements of the simple-jointed main and opening members. The target is not a universal statutory limit.

The maximum west base reaction is 78.37 kN, including column self-weight; the maximum additional floor reaction at the east pier is 45.61 kN. These are **floor-only** results, not the complete wall, roof, other-storey or foundation loads. Transfer equilibrium residuals are below 4×10⁻¹⁵ kN. No intermediate lateral column restraint is assumed in the axial-only check.

The current-solid audit records zero roof-body intersections, zero openings intersected by the casing envelope, zero uncovered base-plate footprint on the raft, and no unmeasured local candidate solids. It separately lists the actual intersections with existing joists, rafters, steel, floor layers and masonry that require redesign; these are **not** treated as completed joints. The first candidate, 85 mm farther south, was rejected because it intersected the garage head and cinema north wall.

Twenty-two relevant calculation tests pass, including independent checks of the support-movement calculation. `make check-layout` retains exactly the previous output (345 pre-existing findings). The final diagram was visually reviewed. No native model, live member register, viewer geometry or published site has been changed.

## Required development before installation

- Detail the cross-beam/main-girder intersection, column cap and east bearing; do not overlap or arbitrarily notch steel flanges.
- Re-coordinate the affected loft joists, two roof rafters, hangers, ledgers, floor penetrations and ceiling/service layer around the new steel. Preserve the roof surface and floor levels.
- Coordinate the east opening/pier, padstone and all loads below it; preserve brick/cavity separation.
- Design the column base, anchors, local raft bending/punching, wall pocket and waterproofing. Verify ground and foundation assumptions.
- Complete full load combinations, lateral stability and restraint, member/joint eccentricities, masonry capacities, movements, fire protection and construction sequence. No building or member is approved by this study.

## Primary references

Section dimensions and properties are from [British Steel universal columns](https://www.britishsteel.co.uk/wp-content/uploads/2026/02/british-steel-universal-columns-datasheet-100723.pdf). The 25 mm board thickness is a spatial reference to [British Gypsum FireCase D120001](https://www.british-gypsum.com/documents/technical-specification/british-gypsum-ts-d120001-l-en.pdf), not a selected fire-rated assembly; required resistance, section factor, temperature, details and fixings must be established for this project. SHS properties and the existing axial sensitivity use [SCI P363](https://www.steelconstruction.info/images/b/b7/SCI_P363.pdf).

Regenerate with `.venv/bin/python -m scripts.structure.concealed_column_study`. Logs are `logs/concealed-column-tests.log` and `logs/concealed-column-layout.log`.
