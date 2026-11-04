# UK01 — smaller beam trials with explicit UK design assumptions

Owner request: reduce the large full-width beam and other large members to what would satisfy Building Regulations. This revision advances a conditional structural proposal; it does **not** establish that the building or these members satisfy Building Regulations. No minimum compliant section is claimed.

The native CJ02 house, its 7 m garage, room layout and finishes are unchanged. Four smaller steel trials are installed in the local structural overlay, drawings and schedules. No native rebuild or publication was performed. The preserved preceding structural output is in `original/`; `recovery.json` records actual hashes.

## Sections and results

All dimensions below are actual depth × width, excluding fire protection. The sections are assumed S355. The reported movements are the maximum in the current linked low/reference/high floor-gravity and variable-pattern cases, with updated beam self-weight. They exclude receiving-support movement and do not include a complete roof load or floor-vibration model.

| Member | Previous section | Current trial | Actual depth × width | Maximum total movement | Trial target |
|---|---|---|---|---|---|
| M-FR-3-001, full-width loft cross-beam | UC356×368×196 | UC305×305×129 | 318 × 308 mm | 18.48 mm | 20 mm |
| M-FR-3-010, north loft transfer | UC305×305×198 | UC305×305×129 | 318 × 308 mm | 13.42 mm | 20 mm |
| M-CJ01-GROUND-HEAD, wide opening head | UB356×171×51 | UB305×165×40 | 303.4 × 165 mm | 5.80 mm | 10 mm |
| M-GABLE-FLOOR-BLOCK, west wall transfer | UC305×305×129 | UC305×305×97 | 307.9 × 305.3 mm | 7.96 mm | 10 mm |

The full-width beam is 54 mm shallower and 66 mm narrower; its nominal line mass falls from 196 to 129 kg/m. This smaller section still fails the previous 10 mm total-deflection target. Its inclusion depends on the **unverified** 20 mm floor-only movement assumption. The inspector states that explicitly. The north transfer's roof/glazing-related duties must be resolved before treating it as a floor-only beam.

## Design basis and limits

- Retain the existing 1.35Gk + 1.50Qk adverse floor-load combination and section resistance factors. No safety factor is reduced.
- Retain the UK NA suggested variable-action deflection limit L/360 for these beams carrying brittle finishes.
- For the two loft beam trials, use total min(L/250,20 mm) as a **provisional project assumption**, not a legal entitlement, a verified assembly limit, or a regulatory minimum. A specific finish, partition, glazing, vibration and cumulative-movement assessment must confirm or replace it.
- Keep the tighter total min(L/360,10 mm) target for the ground head and wall-carrying transfer. Their reduced sections pass the same limited gravity targets as before.
- Recompute linked floor/header reactions and beam self-weight, including the west wall transfer's received cross-beam reaction. The 6/10/14 kN/m masonry/roof budgets on that lower transfer remain assumptions.
- `approvedForConstruction` remains false. `buildingRegulationsCompliance` is `not-demonstrated`. No criterion is silently relaxed for other members.

Outstanding work includes actual floor/partition/concentrated and roof loads; end and compression-flange restraint and lateral-torsional stability; full-floor vibration and flexible-support movement; connections and web bearing; masonry/padstone eccentricity and capacity; foundation/soil verification; fire protection; and construction sequence. This is not a complete structural calculation package or an instruction to order or install these sections. Review and design must precede construction.

The [Approved Document A guidance](https://www.gov.uk/government/publications/structure-approved-document-a) sets the structural compliance framework. [SCI's UK design-code guidance](https://steelconstruction.info/topics/design/design-codes-and-standards) distinguishes suggested variable-action movement limits from project-specific limits. [SCI P449](https://www.steelconstruction.info/images/0/0d/SCI_P449.pdf) discusses deflection, cumulative movement, finishes and dynamic response; it does not approve this house or the chosen 20 mm assumption.

## Implementation and verification

The separate `beam-optimisation.json` and `beam_optimisation.py` apply after CJ02, preserving previous native-stage specifications and provenance. The gravity function takes an optional explicit serviceability policy; its original defaults remain unchanged. The inspector displays each modified member's assumed movement limits and absence of demonstrated regulatory compliance.

Validation results and file hashes are recorded in `validation.json`. Browser screenshots are in `walkthrough/test-results/beam-optimisation-2026-10-28/`. The full Python and web tests verify default preservation, unchanged load factors, linked reactions, conditional status, geometric bearings and existing scoped collision checks. Passing software tests verifies the implementation; it is not structural certification.

The previous 345 workspace-layout findings remain unchanged. Wider whole-building geometry issues remain; this is not a clash-free claim. See the saved audit for scope and counts.
