# Terrace lounge and two bedroom suites

Owner request, 23 October 2026: convert Bedroom 3 to a terrace lounge, connect it to one large bedroom suite above the original garage, and use the former connecting landing as the original front bedroom’s ensuite.

The new layout is authored by `scripts/model/proposal_terrace_lounge_suite.py`, with furnishings in `scripts/interiors/terrace_suite_furnishings.py` and dimensions in `proposal/specs/terrace-lounge-west-suite.json`.

- Bedroom 3 becomes a shared lounge with a three-seat sofa, reading chair, media cabinet and limestone coffee table. The existing hall and east-balcony doors remain. A new oak door leads west into the bedroom suite.
- In Compact, the specified 2.427 m rear window becomes a full-height glazed pair opening outward onto the existing terrace. The sill wall and radiator are removed; a slim radiator moves to the east wall. The nearby planter moves beside the terrace seating, clear of the new door swing. Planning retains its rear window because that variant has no roof terrace.
- The west wing contains a 23.88 m² bedroom, approximately 7.43 m² walk-through wardrobe and 5.83 m² ensuite. The bedroom occupies the full rear width. The wardrobe leads to the bathroom’s privacy door. Front window positions remain aligned with the windows below; the new partitions meet solid wall between openings.
- The former connecting landing becomes a 7.94 m² private shower room for the original front bedroom. It has a walk-in shower, double vanity, WC and linen cupboard. A new door connects it directly to the bedroom, while a separate 930 mm passage retains access beside the stairs.
- The original front bedroom has its bed on the west wall and its own fitted wardrobe. Its former connection into the west wing is closed and continuously plastered.

The loft staircase, loft rooms and eaves storage, principal suite, aligned front windows, exterior balcony, terrace footprint and roofs remain. The seven retained original scenes are checked against immediate recovery natives.

This is a local design-model revision. Structural openings, drainage connections and construction details still need coordination in the building drawings. The existing planning variant is maintained separately; no application drawings or publication are represented as updated by this targeted model refresh.

Recovery copies and checksums are under `original/` and `recovery.json`. Generated models are in `outputs/output-terrace-lounge-west-suite-{compact,planning}/`. Validation and browser screenshots are in `walkthrough/test-results/terrace-lounge-west-suite-2026-10-23/`.

## Final verification

Installed both editable natives, complete GLBs, navigation and rebuilt lighting in the local walkthrough. All 107 Python tests, 270 viewer tests and 44 export preflight tests pass. Body, floor and head-clearance checks pass in both exports; all seven retained original scenes match the recovery models. The workspace layout checker matches the existing 345-finding baseline exactly.

Reviewed 20 final Chrome screenshots across both variants, with no browser errors, warnings or failed requests. Evidence is in `walkthrough/test-results/terrace-lounge-west-suite-2026-10-23/final-validation.json`; the local screenshot gallery is `review.html`. Publication and drawing packs are unchanged.
