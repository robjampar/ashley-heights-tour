# BB01 — garage floor / basement roof comparison

9 November 2026. Experimental coordination study; neither the existing RC proposal nor this alternative is approved for construction.

**Later vehicle-brief update:** the owner accepted a 3.5 t laden van plus 3.1 t Tesla together. [VB01](../garage-vehicle-brief-2026-11-09/README.md) supersedes this record's original load sensitivities and legacy demand ratios. This document preserves the first comparison; the live viewer, regenerated calculation data and supplier enquiry PDF use VB01. Geometry, quantities and the RC default remain unchanged.

## Decision and local review

Beam and block is a credible alternative, but **the evidence does not yet establish that it is better overall**. It reduces site concrete and full-area soffit formwork and fits the present floor depth. Current vehicle-loading/topping design and comparable installed prices are missing, so the existing solid RC proposal remains the default. The alternative is implemented as a selectable, inspectable option in both structural viewers, plans and quantity exports.

[Open the exposed beams, blocks and bearings](http://127.0.0.1:8765/structure/?garageDeck=beam-block&deckView=framing). Use **Show topping** to cover the infill, or **Garage / basement deck → Solid RC** to compare. The same selector is available through **Layers & cutaways** in the normal walkthrough's structural overlay. This is a local change; nothing was published or rebuilt in Blender.

## Drawn arrangement

| Item | Current RC proposal | BB01 alternative |
|---|---:|---:|
| Structural depth | 250 mm | 150 mm beam + 100 mm nominal topping |
| Finish and screed allowance | 75 mm | 75 mm, unchanged |
| Finished floor / soffit | 0 / −0.325 m | Unchanged |
| Basement ceiling face | −0.4639 m | Unchanged |
| Site-poured concrete | 13.618 m³ | 6.964 m³, plus 0.253 m³ joint grout |
| Estimated deck self-weight | 340.46 kN | 297.18 kN |
| Precast beams | — | 32 × 4.290 m; 137.28 m total |
| Infill pieces | — | 300, including 60 end cuts |

The existing central basement bearing wall is at X9.455 m. The floor spans east–west in **two 4.065 m clear bays**, or 4.1775 m between nominal bearing centres. It is not a single span across the garage width. Each end bears on actual modelled perimeter concrete, central wall or a concrete head over a cinema doorway: 125 mm at the perimeter and 100 mm at the centre, with a 15 mm gap between opposing beam ends. Existing support capacity remains unverified.

The beam envelopes are 165 mm wide × 150 mm deep at 345 mm centres. Their simplified 115 mm web and 50 mm flange are visual allowances, not a supplier profile. Tendons, camber curves and reinforcement are not fabricated from these meshes. Dense infill pieces have a nominal 440 × 215 × 100 mm size and balanced 250 mm end cuts. The model shows a 17.5 mm flange seat on each side; the supplier must verify actual section, seating, tolerances and permissible cuts.

Solid concrete strips remain beneath the upper bearing wall `M-BLOCK-4D5245A`, at the stair/girder junction and around the perimeter/central closure. Upper masonry is not assigned to infill blocks. Their reinforcement, anchorage, diaphragm action and connections to basement walls still need design. The 100 mm nominal topping reserves 25 mm for camber/tolerance above a 75 mm comparison allowance; this is not a selected reinforcement or topping design.

## Loads and the deeper-beam alternative

The calculation records 156 statics cases: two bays, three load assumptions, uniform vehicle loading or an isolated wheel/jack load, five point positions and hypothetical equal sharing over one to five beams. It uses the existing model's superimposed permanent loads of 0.5 / 1.0 / 1.5 kPa, vehicle UDL of 2.5 / 3.0 / 3.5 kPa, wheel/jack loads of 10 / 15 / 20 kN and actual lightweight-partition position with 0.75 / 1.25 / 2.0 kN/m. The beam/block floor's published 2.63 kPa self-weight and 2.50 kPa nominal topping weight are added. Demand factors are 1.35 G + 1.50 Q, with separate unfactored service cases.

These are sensitivity cases, **not validated design bounds**. Vehicle axle weights, paired wheels, tyre/jack patches, local topping bending/punching and actual transverse sharing remain unresolved. No composite beam credit, current prestress resistance or deflection result is invented.

The old supplier table gives a useful screening comparison only. Its worst demand/reference ratio is about 0.84 for uniform loading but 2.74 for a local load on one beam. Hypothetical equal sharing across two, three, four and five beams reduces that ratio to approximately 1.65, 1.29, 1.10 and 1.00 respectively. **The model does not establish any of those sharing assumptions.** Falling below a legacy benchmark is not approval or a current-code capacity check.

A 125 × 225 mm beam at 530 mm centres is also considered in the calculation metadata, without replacing the drawn scheme. With 100 mm topping and 22 mm finish, it totals 347 mm: removing the current 53 mm screed allowance would put its underside 22 mm lower than the present envelope, leaving approximately 85 mm above the ceiling board. It would require revised bearing seats, opening-head levels and a complete build-up design. It is a credible supplier alternative rather than ruled out solely for depth; its capacity and wheel-load sharing remain unverified.

The 43.27 kN reduction in deck weight is carried through the existing unfactored foundation sensitivities exactly once. It reduces ground pressure **and** completed-building resistance to groundwater uplift. Empty-box construction-stage uplift is unchanged. No foundation reduction is authorised by this study.

## Cost and construction implications

The 48.86% reduction is in **site-poured concrete**, not total material, total floor weight or installed cost. Precast beams, infill, grout, lifting, support strips, reinforcement, membranes, temporary works and design must also be priced.

The UI retains editable, explicitly unquoted allowances. The old slab has only its placed-concrete allowance priced; its reinforcement and full soffit formwork are missing. BB01 adds beam/block/grout allowances but also lacks several packages. Comparing those partial totals cannot establish which complete floor is cheaper. Obtain like-for-like installed quotes against the same garage/van loading, fire requirement, waterproofing and basement-restraint specification before adopting either proposal.

The displayed sequence is: agree supplier/engineer layout and temporary works; construct and check walls/opening heads; install beams and floor-grade infill; grout and form local RC strips; install designed ties/reinforcement/membranes; place and cure topping under controlled construction loads; complete floor and protected/insulated ceiling. Precast beams must not be cut or drilled from this model. Basement waterproofing, lateral restraint, fire protection, thermal/acoustic layers and construction-stage stability are outstanding design interfaces.

## Research sources

- [MPA Precast — Beam and Block Floor Systems](https://www.mpaprecast.org/MPAPrecast/media/root/Publications/Flooring/Beam-and-Block-Floor-Systems_1.pdf): application and garage topping context.
- [Stressline Flooring Systems Guide](https://www.stressline.net/wp-content/uploads/2017/03/Stressline-Flooring-Brochure-2016_V9_LR.pdf), pages 10 and 12: envelope, mass and span/reference values. **Legacy BS 8110 tables, not current Eurocode verification.** The downloaded PDF is preserved in `sources/` and its tables were rendered for inspection.
- [Forterra / Bison beam-and-block floors](https://www.forterra.co.uk/bison/beam-block-floors/): bearing, partition and camber coordination guidance.
- [Southcrete — Slaney, Sevenoaks](https://www.southcrete.co.uk/case-study-slaney-sevenoaks.html): supplier example of beam-and-block over a basement; not a design for this project.
- [The Basement Information Centre — in-situ concrete retaining walls](https://www.tbic.org.uk/TBIC/Construction-Waterproofing/In-situ-concrete-retaining-walls.aspx): floor/wall interface context.

## Implementation, validation and recovery

The specification is `proposal/specs/garage-beam-block.json`; generator `scripts/structure/garage_beam_block.py` runs after the existing baseline member audits. Alternative objects live in a separate `garageBeamBlock` payload. The browser installer appends and tags them for exclusive option filtering; the baseline JSON element register remains unchanged. Drawings, quantities/CSV, member facts, junction notes and foundation displays share the selection. A standalone `deckView=framing` link opens a useful review camera directly.

The alternative contains 335 separate objects: 32 beams, 300 infill pieces, one retained-RC strip assembly, topping and grout. Geometric checks find 64 complete bearing contacts, no internal or shared-register structural intersections and no volume outside the old slab envelope. Independent tests check block flange contact, retained upper-wall support and continuous upper surface. A visual review found coplanar boolean skins that volume checks missed; through-cutting the original slab removed them, and a face-projection regression check now catches this issue. Selected-object batching was also corrected to avoid double-render flicker.

The full Python suite passed 320 tests and the web suite passed 323 before that final visual correction. The final targeted runs passed seven geometric/load tests, nine web tests and nine Chrome integration checks, including the direct comparison link and normal walk/fly overlay. Browser reports contain no JavaScript or HTTP errors. The corrected beam/block, topping, plan, costs and walkthrough screenshots were visually reviewed. Existing whole-model coordination issues are retained; this does not claim an all-building clash or engineering pass. See `validation.json` and [browser evidence](../../walkthrough/test-results/beam-block-garage-2026-11-09/).

All 2,576 baseline member records are unchanged apart from nonsemantic ordering of their source-ID lists; the baseline foundation data is identical. The previous 81 recorded structural intersections remain. `make check-layout` still exits with the same 345 pre-existing findings as the 4 November performance issue, with no added or removed finding.

`original/` and `recovery.json` preserve pre-change source/data copies. Three late UI recovery copies come from the unchanged local publishing checkout, explicitly labelled with that provenance. `initial-study.json` records the first investigation; its unadopted dimensions are historical and the live specification/model take precedence. Native Blender models and deployment files were not changed. Regenerate with `.venv/bin/python -m scripts.structure.build_members`, then `make build-web`.
