# SW01 — simplify the layout before adding structure

27 October 2026. The owner now permits room/floor-layout changes and asks for simplicity. This supersedes the recommendation to preserve all partitions with the steel-heavy WF01 floor. **SW01 is a drawn, calculated feasibility study, not installed in the main model and not a construction design.** The live model still contains LP02.

## Concrete layout change

- One 215 mm bearing-wall candidate at X9.455, from Y−16.0035 to −9.905, with a west return on the existing cinema north-wall axis. Core continues through the floor zones; joists hang from it rather than carrying it. Nothing in this proposal introduces masonry within the loft.
- Move the proposed cinema east wall 357.5 mm east, extend the return walls and finishes, and relocate its north entrance to Y−11.8…−10.85. The existing cinema sofa has 1.22 m beside it. Keep the small southern service opening, with a separately designed head.
- Relocate the basement wall console to the northern seating area. The accepted bar island and stools stay; its west aisle is then 932.5 mm. A simple translation of the console with the wall would make the aisle too narrow and is **not** proposed. Final furniture and door-swing coordination is needed in the 3D integration.
- Move the garage/service division 1.86 m west onto the same bearing axis. Clear garage depth becomes 5.72 m. Reposition the specified 4.73 m van with 495 mm at each end. Preserve the external garage opening. Utility/storage occupies the larger eastern strip.
- Replan the principal suite around the same wall: bedroom and sitting area east, walk-through wardrobe and ensuite west. Retain the existing suite entry, omit a door between bedroom and wardrobe, retain the bathroom door. The west gable window remains in the ensuite. Superseded north dressing/bathroom partitions are removed; that space becomes part of the suite sitting area.
- Use aligned 950 mm rough openings in the three main wall divisions; exact leaves, fire strategy, head design and finishes need coordination. The 215 mm core is a spatial candidate, not an established masonry specification.
- Keep the entrance void. Stop the masonry spine at its return, south of the basement stair opening. A 4.605 m local girder continues north above the suite, with short trimmers beside the void. Omit the freestanding LP02 column and long southern main girder **only in this alternative**.

## Checks and limits

The affected loft footprint is 83.3397825 m². Five rectangular load regions cover it without extending into the entrance void or leaving an uncovered strip. Fifty-seven timber joist pieces are drawn, at up to 400 mm centres, with two named bearing lines per piece. Their axis-length timber volume is 3.9095 m³, excluding cutting allowances, blocking, trimmers and hangers. All main bays use the same section and two equal 4.2225 m wall-axis spans.

The solid-timber candidate is **C24, 72 × 245 mm actual dimensions**. Six gravity cases use Gk 0.75 / 1.00 / 1.35 kN/m² and either Qk 1.50 kN/m² or a separate unshared 2 kN point load, with joist self-weight added. Maximum final deflection is approximately 8.47 mm under the study's creep assumptions and 10 mm screening limit. This is not a vibration, support-movement, fire, acoustic or full Eurocode design. Heavy baths and concentrated partitions are not covered by casually reusing the general floor allowance.

The linked loft/gallery network includes twelve gravity/load-pattern cases. Individual beams pass the isolated member screens, and load balance closes within 3 × 10⁻¹³ kN. The remaining north transfer reaches about 9.55 mm isolated deflection in the high case: combined movement through supports and the deck must still be checked. Passing individual screens is not approval of the assembled floor.

**The west upper wall still spans over the garage.** The currently drawn UB305×165×40 below it fails the reduced-load sensitivity in all three scenarios (approximately 13.5–25.0 mm isolated deflection). A UC305×305×97 trial passes that isolated envelope, but is not selected: actual roof/wall actions, the separate brick-leaf support, lateral restraint, bearing geometry and cumulative movement remain unresolved. This support cannot be silently retained or removed.

The longer approximately 5.9 m garage bay may need engineered joists around 300 mm deep. James Jones Table 16 lists 6.286 m for JJI300D at 400 mm centres under its 1.35 kN/m² dead-load column; this is a supplier-table feasibility comparison, **not a garage/bathroom floor design**. The actual first-floor outline, deck, wet-room loads and support details must be checked before integration.

The basement spine line-load sensitivity is about 116–149 kN/m ULS before local girder reactions, roof-transfer effects and door-head concentrations. It includes a conservative two-floor/vehicle-slab/wall-weight envelope. Neither this number nor alignment with a wall establishes raft or soil capacity. Masonry, RC heads, wall/slab joints, raft bending, punching, soil, water and stability need design from surveyed information.

## Sources and reproducibility

- [UK supplier listing for 72 × 245 mm C24](https://www.stoketimber.com/product/75-x-250-72-x-245mm-finished-sizes-treated-c16-c24-grade-timber-joists/): explicitly select the C24 product, not an interchangeable C16 option. Other merchants have different finished widths.
- [James Jones JJI technical manual, November 2023](https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf), Table 16; manufacturer design still required for nonstandard loading.
- [Simpson Strong-Tie SFH instructions](https://pim.strongtie.eu/api/v1/public/download/gb/en/product/400/SFH.pdf): full prescribed fixing, cured masonry, bearing, fit and construction-loading requirements. No hanger SKU or load capacity has been selected here.
- [NHBC technical requirements](https://www.nhbc.co.uk/homeowners/standards-technical-requirements): full structural design and site/ground information remain required. Guidance is not a substitute for project-specific verification.

Specification: `proposal/specs/simple-stacked-wall-study.json`.
Regenerate: `.venv/bin/python -m scripts.structure.simple_stacked_wall_study`.
Tests: `.venv/bin/python -m unittest tests.test_simple_stacked_wall_study`.
`study.json` contains source hashes, all reactions, load assumptions and limits. This generator reads the live model/register but never edits them. The PNG/SVG and browser review are plan studies; no 3D clash audit or native rebuild is claimed.
