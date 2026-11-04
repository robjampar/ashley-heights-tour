# WF01 — frame the loft floor from the walls below

The owner asked to reconsider the floor using the walls already beneath it. Earlier alternatives had retained the central girder and moved or replaced its column, without first reconsidering the floor system. WF01 changes that starting point. **It is an uninstalled framing study, not an approved structural design.**

[Wall map and framing plan](wall-supported-floor.png) · [Calculation record](study.json)

## What the trial changes

The affected wing uses repeated east–west joists supported at the side-wall lines. The central main girder, its intermediate column and its cap/base are absent from this alternative. The current room partitions and entrance void remain. Local trimmers collect the joists around that void. There are no new room walls or internal columns in the trial.

The affected floor area is 83.3398 m². Its three tributary rectangles exactly cover the corresponding current floor footprint: no floor is lost, no joists are assumed over the entrance void, and the projected floor area outside the source footprint is zero. The remaining gallery load path is included in the reaction network; the original-house loft is shown for context and is not redesigned in this trial.

The principal-room bay has **8.345 m clear between block faces**, or **8.445 m between wall axes**. This is the specific open room, not a claim that every joist in the house spans that distance. There is no supporting wall continuing down through its middle. The north suite and wardrobe partitions cannot be declared load-bearing simply because they appear on the plan: they are currently stud partitions supported on the first-floor structure, with no established direct route to the foundations.

Two joist families are shown:

| Trial member | Use | Maximum nominal centres | Scope |
|---|---|---|---|
| UB305×165×40, actual depth 303.4 mm | Long wall-to-wall bay | 500 mm | Initial individual-member gravity and frequency screen |
| UB203×133×30 | Short strip and east side of entrance void | 500 mm | Initial individual-member gravity and frequency screen |

Actual equal row spacings are 470–493.1 mm. The drawing contains 23 joist pieces, including the short strip beside the trimmer. Their axis-length mass is **6.347 tonnes**, before end allowances, connections, fire protection and supporting heads. This is a substantial steel quantity, not a claim of the cheapest shell design. The load model includes exactly the same joist self-weight as the drawn quantity.

A separate trial uses UB356×171×57 at up to 1 m centres for the long bay. It is 54.6 mm deeper and reduces long-bay steel by about 1.395 tonnes, before adding the required secondary timber/deck supports and connections. Its altered ceiling, deck and junctions have not been coordinated. It is not the drawn default.

## What the walls actually support

- The original-house loft already contains retained-wall bearing candidates. These walls remain survey-dependent; the existing register still has some joists without an intermediate wall candidate and unresolved long runs. WF01 does not certify or silently replace those details.
- The west recess masonry aligns with masonry and basement concrete below, but floor-band continuity and actual bearing details remain to design.
- The west upper wall over the garage is supported by an existing **proposed transfer beam**. It cannot be treated as masonry continuing directly to the raft. Re-routing floor loads onto this wall increases that beam's demand.
- The east side has windows at both storeys. The amber line on the drawing means **engineered heads and wall bearings still required**, not uninterrupted masonry. The south void header is at Y−9.10, joining the west entrance return and the east window-head line. Its east end must connect to a designed head; it must not bear on glass or an imaginary pier.
- Roof and floor loads must be separated and then recombined at the real supports. Removal of the floor girder/column is not permission to remove an unidentified roof support.

## Calculation findings and limits

The individual long joist passes six limited static cases (low/reference/high permanent floor allowances, with either domestic UDL or a separate 2 kN midspan point action). Its high-case total deflection is approximately 6.75 mm. An isolated-member frequency estimate is approximately 8.34 Hz at the high permanent load plus 0.3 kN/m². This estimate is **not** a whole-floor vibration or comfort verification. The short-joist trial also passes its individual static cases.

The floor network includes twelve scenario/pattern combinations, with explicit load transfer from joists to the void trimmer, local headers, gallery beams and named wall lines. All individual member screens pass and each case conserves force to within 10⁻⁸ kN. These results do not include the complete support movement or prove that the receiving wall/head has sufficient capacity.

The existing M-GABLE-FLOOR-BLOCK 305×165×40 transfer fails the redistributed-load sensitivity. The trial includes lower/reference/upper wall dead loads of 4/7/10 kN/m and **unverified** roof allowances of 2/3/4 kN/m permanent plus 0.5/1/1.5 kN/m variable. These are sensitivity inputs, not site snow calculations or guaranteed bounds. UC305×305×129 passes its isolated static screen at approximately 9.90 mm high-case deflection; the heavier 305×305×198 gives approximately 6.13 mm. Neither is selected, because the effect of this movement on the floor above, all real roof/wall loads and the masonry/raft bearings still require assessment.

Full floor vibration, accumulated deflection, joist lateral restraint, deck/diaphragm action, connections and bearings, eccentricity, masonry capacity, roof load paths, foundations, fire/acoustic layers, services and fabrication tolerances remain unverified. A passing isolated beam calculation is not a safe-to-build floor system. The 10 mm static and 8 Hz frequency comparisons are study indicators, not universal statutory limits.

## Verification and state

Twenty-two relevant calculation tests pass. They include exact self-weight/quantity reconciliation, load conservation across all gallery patterns, the separate point-load case and rejection of an inadequate long-span section. `make check-layout` retains exactly the previous 345 findings. The plan was visually inspected; this is a 2D framing review, not a completed native-model or browser-3D clash audit.

No native architecture, current structural register or published viewer geometry has changed. The original live column remains until a complete replacement is coordinated. The rejected media-wall and wall-adjacent-column studies remain historical evidence only.

Regenerate with `.venv/bin/python -m scripts.structure.wall_supported_floor_study`.

Primary references: [British Steel UB properties](https://www.britishsteel.co.uk/wp-content/uploads/2026/02/british-steel-universal-beams-datasheet-190724.pdf), [SCI guidance on light-steel floor serviceability](https://www.steelconstruction.info/images/3/38/SCI_P301.pdf), and [James Jones JJI technical manual](https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf). The SCI light-steel guidance motivates the explicit vibration question; it is not used to claim compliance of this rolled-steel scheme. The JJI catalogue supplied in this project does not establish an 8.445 m span within the current 300 mm floor zone.
