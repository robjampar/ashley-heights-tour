# Overnight structural coordination — 27 October 2026

Owner instruction: work autonomously until 08:00 London, improve the experimental structure, simplify construction and costs, and coordinate necessary changes to the house. Best assumptions are permitted. Publication is not part of this work.

## Morning review — local integration complete

The final checked floor/ceiling candidate, including the service-cupboard ventilation correction, is installed in the **local Compact native model**. The normal viewer, furnishings and 192-sample daylight cache have been rebuilt. The final refresh/review extended beyond the requested 08:00 checkpoint. Nothing was published. The Planning model and all seven original-house scenes remain unchanged.

The current structural study has 2,555 members/assemblies, 262 floor joists and 80 receivers. Every joist end has a mapped geometric receiver; this does **not** establish a complete supported load path. Seventy receiver ends lack a direct architectural wall candidate, including beam-to-beam networks that need engineering verification. The selected priced subset is approximately £145k / £215k / £323k ex VAT at the lower/reference/higher allowances. This is not a full shell budget or supplier quote; concrete reinforcement, formwork, temporary works and other listed omissions remain unpriced.

### Implemented experimental proposals

- **LP02:** split the long main loft girder onto a stair-side steel column; align the north transfer with explicit masonry pads/grout/pockets. Seven linked floor-gravity screens pass their stated load budgets. Roof loads, stability, connections, wall/raft reactions and structural approval remain outstanding.
- **LP03:** replace the small gallery support fragments with a continuous receiver and close the small floor notch. Keep the accepted loft level and access routes. Patterned-load sensitivity includes possible uplift at the outer bearing.
- **G01:** model a 250 mm suspended RC vehicle-deck candidate above the cinema, with 215 mm bearing walls down to the raft, local opening bands and a shorter northern ground-floor girder. The 108 strip cases expose load-distribution uncertainty; they are not a completed reinforcement, shear, deflection or vehicle-load design. The exact interface audit of its 18 target members has no positive-volume overlaps.
- **G02:** the short northern ground-floor bays now use 45 × 295 mm C24 candidates at 400 mm centres, with staggered full-depth blocking. Both nominal and smaller-section floor-load sensitivities pass the stated screens. Vibration, restraint, hangers, fixings, fire and acoustic design remain open. The stock comparison shows 28 illustrative 4.8 m lengths with blocks taken from offcuts; it is not an order or fabrication schedule.
- **F02:** retain basement FFL −2.800 m, reserve 200 mm for finishes/insulation/waterproofing above a raft top at −3.000 m, and continue walls to the raft. Garden/garage foundation dimensions remain assumption-led proposals. Groundwater uplift and construction-stage stability are unresolved.
- **Architectural fit:** preserve finished floor levels, place deck/finish above the floor framing, coordinate flat ceiling boards below the governing beams, move attached fittings/joinery, add column casing penetrations and extend the basement stair opening. The sampled exported stair clearances are 2.3961 m basement, 2.3275 m loft winders and 2.0500 m loft straight flight. This is a geometric check, not stair compliance approval.

### What is still wrong

The successful **57 horizontal-covering / horizontal-framing check is deliberately limited**. The expanded native-finish audit measures 238 coverings and records 1,467 overlaps plus 24 unmeasured surfaces against the broader structural selection. Many findings concern thick roof-lining envelopes, roof framing crossing floor edges, concrete wall/finish interfaces and pads projecting past the architectural wall faces. The count includes all structural options, and is filtered in the viewer by the selected option. It is not 1,467 independently diagnosed construction defects.

The current 230 mm architectural external-wall envelopes do not yet fully accommodate the proposed 352.5 mm cavity masonry and interior finishes. Some roof assemblies have insufficient depth for their rafters, lining and thermal/weathering layers. These require coordinated architectural changes; they have **not** been hidden by cutting down beams or removing linings. The roof-depth alternatives remain uninstalled. The main ridge and whole-roof support system are not calculated.

Connections & fit now lists the exact authored covering and structural member for each measured clash, including unmeasured surfaces. Individual member inspectors show their associated covering clashes. Cost quantities distinguish timber volume from bearing-blockwork area; supplier-list stock benchmarks are separate from installed allowances. All quantities remain partial and omit substantial work.

### Construction review sequence

1. Survey retained walls, foundations, levels, openings, drainage and hidden structure; carry out ground investigation and groundwater assessment. Confirm which garage walls/foundations are to be replaced.
2. Resolve the roof structure and full wall/floor build-ups before freezing architecture. Check planning dimensions and clear room/stair heights after the complete assemblies are drawn.
3. Design excavation support, underpinning/propping, basement raft/walls, waterproofing and construction joints together. Verify temporary groundwater and uplift cases before excavation or removing retained support.
4. Establish concrete wall/slab bearing nodes and column base before loading them. Design anchorage, reinforcement, local bearing and temporary stability; the model does not prescribe these details.
5. Issue coordinated steel fabrication and connection design, then supplier-designed joists/hangers and restraint/diaphragm details. Confirm actual finished timber dimensions and installation tolerances.
6. Coordinate services, fire protection, acoustic layers and moisture/thermal assemblies before closing floors and ceilings. No site holes, flange cuts or notches are approved by the geometry model.

Final verification:

- `make build-structure` and `make build-web` pass. Native, furnishing and structural audit source hashes agree.
- **227 Python tests and 313 web tests pass.** The 27 door frames and their visible wall faces are included in the web geometry checks.
- **57 coordinated horizontal coverings** clear the checked horizontal framing. Closed floor/ceiling bodies also pass independent plan-area, analytical-volume and watertight-mesh checks; the floor repair cannot pass by accidentally deleting a surface.
- Eight physical service-cupboard vent apertures remain clear, with the adjacent louvres present. The fixed battery/electrical equipment positions are preserved.
- Original native scenes and 15,469 unrelated proposal object records remain unchanged. Floor levels and stair routes remain; only the reviewed basement stair opening changes navigation floor area.
- The actual Chrome walkthrough was screenshot-reviewed. Live architecture/structure overlay, split view, independent cutaways, simultaneous floor/steel/concrete toggles, vivid colours, opacity, G01 member inspection, G02 cost links and the expanded finish audit function without page errors.
- `make check-layout` still fails with **345 pre-existing findings**, exactly matching the previous structural revision's report; no findings were added or removed.
- Evidence: `walkthrough/test-results/structural-overnight-2026-10-27/final-integration-check.json`, `final-browser-check.json`, `native-geometry-check.json`, `native-preservation-compact.json`, `stair-headroom.json`, and the adjacent `final-*.png` captures. This is local experimental coordination, **not** a completed construction or fabrication design.

## Starting point

M14: 2,666 members/assemblies, 292 joists, 137 scoped solid-intersection pairs, 50 open issues. The current 10.7035 m main loft girder and 8.445 m north transfer fail the limited floor-load screens. Thirteen floor zones have insufficient architectural depth. No site investigation, measured existing-structure survey or engineer's design is available.

The `original/` directory and `baseline-manifest.json` preserve structural inputs, generation code and generated geometry before this work. Native architecture will receive a separate recovery copy before any edit.

## Work programme

1. Trace the main loft load path through each storey; compare practical shorter-span alternatives against the accepted room layout.
2. Coordinate floor, beam, ceiling and opening levels. Keep the loft on one level and preserve the accepted stair/headroom arrangement.
3. Develop actual connection locations and installation clearances without concealing unresolved capacities with arbitrary mesh cuts.
4. Audit wall continuity, opening heads and foundation interfaces; distinguish new work from retained building assumptions.
5. Add construction sequence, repeated-component and cost comparisons tied to the model. Record loads, sensitivities and exclusions.
6. Rebuild, review in the walkaround with screenshots, and run geometry/calculation and UI checks.

## Engineering status

This is an experimental coordination design. A passing local screen is not a verified whole-building design. Survey, ground/water conditions, all actions, stability, connection capacities, fire/acoustic performance, temporary works and regulatory approval remain subject to appointed designers' verification before procurement or construction. Assumption cases are sensitivities, not guaranteed site bounds.

## Progress

- 00:12: baseline preserved; beginning room-by-room load-path and floor-depth review.

- 02:29: M15 / LP03 generated locally. The long main loft girder is split over a stair-side SHS column with a continuous route to the basement raft. The entrance transfer bears on an extended pier and RC return; an existing rafter is replaced by two flanking rafters without changing the roof plane. These are floor-only gravity and axial sensitivities, not an approved whole-building scheme.
- The courtyard projection now has a continuous outer-edge beam over two existing wall/pier lines and the south transfer. This removes the deeper beam previously suspended below the joists. Exact continuous-beam solver benchmarks pass; adverse live-load patterns and roof/facade loading remain to check.
- Actual Chrome walkaround captures reviewed: `lp03-loft-east`, `lp03-gallery`, `lp03-principal`, `lp03-column-base` in the matching `walkthrough/test-results` folder. They expose the remaining principal partition/door-head collision and the uncoordinated finish bodies; these are not being treated as solved by structural-only changes.
- Finish audit: 17 suspended architectural floor bodies and 39 flat ceiling/lining surfaces require adjustment. The initial dimensional proposal reduces measured covering/framing intersections from 893 to 20; deeper/perimeter beams, attached lights, door heads, edge closures and column penetrations are being coordinated before installing native changes.
- F02 in progress: retain basement FFL −2.800 m, reserve 200 mm above the raft for floor finish, screed, insulation and waterproofing/protection. Raft top moves to −3.000 m and walls/base plate follow; quantities and groundwater-head sensitivities must rebuild. This is an assembly-space budget, not a waterproofing or thermal specification.
- A classification bug was found during the finish review: first-floor enclosures containing “loft” in their names had been mistaken for loft floor-band closures. The deck-seat rule is now restricted to bodies actually starting in that elevation band; the lower-storey panels remain.
- 03:15–03:23: the staged native model passes the 57-covering/horizontal-framing check (zero intersections), preserves unrelated objects and all seven original scenes, and opens in Chrome without page errors. Seven actual room screenshots were inspected. The staged review deliberately omits stale furnishings/daylight overlays; those must be regenerated after installation. The principal entry, wardrobe and bathroom leaves are coordinated to 2100 mm, and curtains, joinery and service-cupboard tops are being fitted to the lower ceilings. Native changes are **not yet installed**.
- LP03 now includes nine adverse variable-load patterns and separate 0.90G + 1.50Q uplift sensitivity. The lighter isolated-gallery case gives approximately 0.62 kN upward reaction at the south connection; a positive connection is required. Passing floor-only member screens do not verify that connection.
- 03:28: actual GLB headroom sampling finds 1.90–1.91 m over lower basement treads after the ceiling correction. The proposed response extends the opening from X8.60 to X9.11, meeting the main girder, removes the end rim/stub joists and moves the ground-level guard and landing light. This correction is in preparation. The loft flight remains clear of the staged architectural ceilings, with minimum sampled clearance about 2.05 m; roof framing itself remains a separate audit.
- The expanded roof-covering audit finds 911 solid intersections across 142 linings/fittings, plus 15 invalid/open lining meshes. These include thick architectural roof shells and flat dormer joists below the 7.60 m ceiling. They are not included in the earlier successful horizontal floor-frame check. Sloped lining thickness, flat-roof build-up, roof member levels and headroom need a coordinated correction.
- 03:50: a separate garage-floor study identifies vehicle wheel/axle loading omitted from domestic floor assumptions. `ground-floor-option.json` and `ground-floor-calculations.json` compare a suspended concrete garage/utility deck supported on proposed 215 mm cinema bearing walls, leaving a shorter northern ground-floor girder. A 5.6525 m UB356×171×67 candidate passes the three explicitly assumed two-floor gravity screens (6.38–9.52 mm deflection). The 250 mm slab's required flexural reinforcement varies substantially with assumed wheel-load distribution; shear, cracking, deflection and load distribution are not verified, and no reinforcement schedule is selected. This option is not installed yet.

- 04:24–04:35: G01 now replaces the vehicle-loaded southern floor with a 250 mm suspended concrete spatial proposal, 215 mm cinema bearing walls, two local RC doorway bands and explicit girder bearing nodes. The cinema/bar faces and both doorways are preserved in the staged native layout. The remaining ground girder is below ground FFL at Z−0.4074…−0.044, with a 5.6525 m engineering support span. A general receiver-revision elevation bug was fixed (ground-floor revisions had incorrectly used the loft datum).
- The G01 exact-interface audit checks the slab, walls, pads, grout, floor layers and ledgers against the other members. Its latest completed targeted run has zero positive-volume intersections. The stair opening remains clear: the western slab-edge ledger is shortened to the strip beside the stairs, with the west stair trimmer returning directly to the concrete/wall face. All structural connections remain unverified.
- Staged native prepare04: 473 changed objects, 15,745 unrelated objects preserved, 57 floor/ceiling coverings clear of the checked horizontal framing and concrete slab. Actual GLB stair sampling has no <2 m findings: basement minimum 2.3961 m; loft winders 2.3275 m; loft straight flight 2.0500 m. The first headroom run correctly rejected a concurrent GLB change; only headroom04b is valid. Seven Chrome screenshots were reviewed with no page errors; stale furnishing/daylight overlays were deliberately disabled.
- Rebuilding the structure from staged architecture exposed finish-cut mapping: column-casing holes had been mistaken for structural joist/receiver boundaries. Floor objects now preserve a separate framing-reference plate, while explicit structural openings and casing penetrations remain in the physical layers. The nearby ground joists are relocated with reduced local spacing. A casing/first-floor joist edge conflict is still being corrected before installation.
- The vehicle slab strip study now uses actual wall-centre spans of 3.99125 / 4.70625 m, replacing the earlier mixed face/centre approximation. `vehicle_deck_study.py` is the canonical calculation, exposed in the slab inspector. It is flexural equilibrium sensitivity only; no effective wheel-load distribution, reinforcement schedule, shear, cracking, deflection, anchorage or fire design is selected.
- Roof-depth alternatives are recorded in `roof-depth-options.json`, not installed. Thin 25 mm pitched boards preserving the current interior face still intersect the current roof frame. A 150 mm external roof/frame lift clears most of those intersections, leaving local dormer/hip transitions; flat-roof insulation/falls and bearing/roofline changes still need a coherent design. No lowered loft ceiling or unreviewed roof lift has been installed.
- Prepare05 also adapts the Art Deco cornice, crown, display shelf and contents, pool suspension, blind cassettes and shower drop to the lower ceiling. Native installation, final derivative rebake, complete tests and final structural walkthrough review remain outstanding. Build-cache checks: 32 pass after adding the new finish-spec dependency to the fixture.
