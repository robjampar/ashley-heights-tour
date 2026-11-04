# UK-T01 experimental structural study

Local preview: http://127.0.0.1:8765/structure/?view=trials

Final booklet: `Ashley-Heights-UK-Structural-Trial-Study-T01.pdf` (23 landscape A3 pages; nine numerical-study pages plus 14 current architectural coordination pages). This is NOT FOR CONSTRUCTION. Native architecture, GLBs and the published release are unchanged.

## Decisions captured

- England regulations/UK National Annex basis and UK supplier data where available.
- New external walls: brick / insulated cavity / load-bearing blockwork. No ground or structural engineer reports available.
- Lower/reference/higher values are chosen scenarios, not guaranteed bounds or verified site data.
- 8.59 m was a floor-mesh bounding width, not a clear joist span. Do not infer span/direction from a bounding box.
- Compare local bays: garage 6.056 m north-south, utility 2.32 m east-west, gym 4.49 m east-west, west wing 4.95 m east-west; all supporting lines are provisional.
- Preferred gym line: load-bearing TIMBER STUD WALL with headers and supporting studs around glazing/door; masonry piers are not required by the concept. Small framing adjustments are authorized. No architectural adjustments are made by this study.
- The gym wall bears over a full basement. Its transfer/support below is unresolved, not presumed to be provided by the visual floor slab.

## Scope and omissions

Four local first-floor JJI table comparisons, three timber-header screens, two steel hypotheses (full-span gym steel is not preferred), six generic cavity-lintel comparisons, 103-head register, earth/water pressure and buoyancy sensitivity, concrete geometric volumes and brick/block rates per net 100 m2.

All source dimensions are model dimensions. Neither the original structure nor ground has been surveyed for engineering. No complete roof/wind/snow/stability analysis, floor layout, wall/stud design, bearing/connection/padstone design, basement reinforcement/crack control/waterproofing design, foundation design, temporary works or whole-house order quantities are issued. Steel lateral stability is unchecked. Timber ply load sharing, axial studs, connections and restraint are unchecked. Supplier table conditions may not fit actual rooms, finishes or moisture conditions. Validation is required before physical works.

## Files and regeneration

- `proposal/specs/structural-design.json`: coordination scope and checks.
- `proposal/specs/structural-trials.json`: inputs, scenario labels, local bays, timber-wall preference, sources and unresolved work.
- `proposal/specs/structural-uk-catalog.json`: British Steel UB shortlist, James Jones JJI Table 16 and Catnic SWL data.
- `scripts/structure/build_study.py`: current architectural register.
- `scripts/structure/trial_calculations.py`: explicit-unit numerical study and schematic trial axes.
- `walkthrough/src/structure-geometry.js`: shared plan/section/elevation engine.
- `walkthrough/src/structure-trials.js`: scenario UI and direction diagram.
- `walkthrough/public/structure/`: generated register, trials, PDFs and issue metadata.

From the workspace root:

```sh
make build-structure
node revisions/structural-workspace-2026-10-26/browser-review.mjs
node revisions/structural-trials-2026-10-26/browser-review.mjs
.venv/bin/python -m scripts.structure.build_pack
.venv/bin/python -m scripts.structure.build_trial_pack
.venv/bin/python -m unittest tests.test_structural_trials
make test-web
make check-layout
```

Render and inspect PDF pages before issuing. `build-structure` does not produce a fresh PDF automatically: browser exports and review precede PDF generation. Stale issue metadata disables downloads. Full web builds include the structural studio. Current publication staging does not include these files; publication needs explicit authorization and staging integration first.

## Validation evidence

- Nine calculation tests: independently checked beam equilibrium/deflection, unit conversion, supplier boundaries, invalid load cases, analytical and numerical earth/water integration, timber creep and corrected direction/preference.
- 284 web tests pass, including five structural geometry tests.
- Desktop/mobile Chrome checks pass with no reported page errors or HTTP failures; shared selection, plans/elevations/section, architectural overlay, three scenarios and optional trial axes exercised.
- All 23 PDF pages rendered and visually inspected; unsupported superscript glyph corrected.
- Workspace checker retains the pre-existing 345 findings; compare the final validation JSON for exact baseline match.
- Evidence: `walkthrough/test-results/structural-workspace-2026-10-26/` and `walkthrough/test-results/structural-trials-2026-10-26/`. Logs under `logs/structural-*`.
