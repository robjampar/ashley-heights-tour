# CJ01 — integrated same-direction floors and extended bearing line

The owner accepted the same-direction arrangement after asking to repeat `M-J-01-009` through the rear/upper floors and extend `M-BLOCK-4D5245A` with wide heads across open areas. This revision is installed in the local native Proposed model, normal walkthrough and structural overlay. It preserves the preferred principal-suite layout. Nothing was deployed, and the model is not a construction issue.

[Open the suite and structure](http://127.0.0.1:8765/?design=proposed&room=proposal-new-principal-suite&structure=1&element=M-FR-3-001). The [27 October comparison](../continuous-joist-line-2026-10-27/README.md) is the historical sketch; the integrated sections below supersede its approximate candidates.

## Implemented arrangement

- Main-wing first-floor and loft fields use north–south JJI joists, normally 300D at 400 mm centres. The longer northern gym bay uses 350D. Original-house and west-wing framing retain their established local directions.
- The garage/store core is 215 mm blockwork on the concrete slab. Its line continues through a wide steel opening head to the rear outside wall. The rear window is narrowed 230 mm for the return/bearing envelope. The accepted cinema/garage alignment is retained.
- Two hall-side wall-face ledgers keep joists outside the blockwork, with a full-section break at the entrance steel. The gallery and eastern loft edge joists have small local spacing adjustments. South/west ledgers are moved inside the external block faces, and the first west joist moves clear of the wall/rim. No joist flange is notched to erase a clash.
- A transverse loft girder replaces the concealed SW02 post and longitudinal girder junction. Its old casing and floor/ceiling penetrations are removed. The preferred bed, sofa, wardrobe, bathroom and desk remain: 124 principal-suite furniture objects are unchanged.
- The ground ceiling moves down 55 mm and the first-floor ceiling 60 mm. Four ground door leaves/heads, fixtures, ceiling sheets and pad/lining clearances follow. Native garage casings follow the lower head; packed jambs remain behind the regenerated visible frames. A bar-panel/AV-door trim overlap is corrected.
- Eight gym light meshes regain their original narrow footprints after an earlier utility transform had stretched them. Furnishings and 192-sample daylight are regenerated. The oak materials remain authored textures.

| Member | Current provisional section | Model length | Largest limited floor SLS deflection |
|---|---|---:|---:|
| M-FR-3-001, open-suite loft cross-beam | UC356×368×196 | 8.545 m | 9.22 mm |
| M-FR-3-010, north transfer | UC305×305×198 | 8.428 m | 7.85 mm |
| M-CJ01-GROUND-HEAD, wide ground opening | UB356×171×51 | 4.620 m | 3.37 mm |
| M-GABLE-FLOOR-BLOCK, onward west transfer | UC305×305×129 | 6.400 m | 5.58 mm |

The cross-beam is substantial: approximately 1.67 tonnes before plates and connections. Preserving the open suite while repeating the joist direction has this steel/depth cost. No optimisation or complete capacity approval is implied.

## Calculation basis and limits

Thirteen linked floor beams/headers are screened for low/reference/high floor assumptions and all/south/north/gallery live-load patterns. Actual joist reaction stations, a conservative maximum 400 mm tributary width and 0.15 kPa joist allowance are used. Each case balances input loads, beam self-weight and external reactions. Secondary header reactions pass into their receiving girders. The lower west transfer receives the actual cross-beam reaction plus explicit assumed masonry/roof line-load budgets.

All displayed candidates pass these isolated gravity screens. Supports are treated as rigid. Whole-floor vibration, concentrated bath/partition loads, flexible-support interaction, roof reactions, lateral stability, fire resistance, connections, wall anchors, masonry/padstone capacities and foundations remain unverified. Passing a span table or these calculations does not establish a buildable structure.

The JJI comparison uses [James Jones Table 16](https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf): 300D/400 mm has a 6.286 m table span and 350D/400 mm 6.817 m, subject to the manual's domestic floor conditions. The inspector shows actual receiver spans and those limits. Steel properties use the [British Steel UC datasheet](https://www.britishsteel.co.uk/wp-content/uploads/2026/02/british-steel-universal-columns-datasheet-100723.pdf); the downloaded reference is preserved in `references/`.

## Validation and remaining work

- Native staging verifies idempotence and preservation of all seven original comparison scenes. Source files are not modified during staging. This is a targeted update from preserved SW02, not a full source-model rebuild.
- 287 Python tests pass on the final revision, including a new solid-intersection check of every reoriented joist against masonry. Twenty-two affected geometry/load-path checks also pass.
- All 317 web tests passed across two runs: 12 detailed frame/gym checks and the other 305 tests. The unchanged detailed frame tests were not repeated; they include exported geometry and actual wall/trim surface sampling. Sixteen member-view tests passed after the final member update.
- The live Chrome check captures seven normal views and two structural overlays, confirms the current native/member revisions, two new hall ledgers, the adjusted joist and absence of the post, and walks through the garage, cinema and new wide opening. Evidence is under [walkthrough/test-results/continuous-joists-2026-10-28](../../walkthrough/test-results/continuous-joists-2026-10-28/).
- The register contains 2,535 members/assemblies, 237 joists, zero unmapped joist ends and 474 linked hanger assemblies. The hanger fit audit records zero overlaps/seat errors; this is geometry, not connection capacity.
- The existing **steel/masonry-scoped** clash audit contains 83 pairs, versus 86 before CJ01, with no new pair. This audit does not cover every material combination. An additional [joist/masonry review](joist-masonry-review.json) identified **44 external-wall/end overlaps**, now cleared by moving the affected ledgers to the room side and adjusting edge joists. All reoriented CJ01 joists now clear masonry solids, including the internal garage/store wall and store-door head. This does not verify ledger anchors, hanger capacity, masonry strength or the other untouched timber interfaces.
- The covering audit records 1,159 remaining pairs, with no new pair against the SW02 comparison. The reduction partly reflects correcting the horizontal-sheet audit to use the solid section at the sheet elevation, rather than the whole projected sloping rafter. It must not be presented as 308 physical defects repaired. Wider roof build-ups and wall/finish interfaces remain unresolved.
- `make check-layout` retains its pre-existing 345 findings; its failure is not claimed as a pass.

Hashes, fit counts and concise load-screen results are in [validation.json](validation.json). Logs are in `logs/cj01-*2026-10-28.log`. Full structural certification, fabrication drawings and a complete construction cost are outside the verified result.

## Recovery and reproduction

`original/` preserves the prior SW02 native Blend/GLB/geometry/navigation, structural assets and relevant source/docs. `outputs/output-cj01-release-staging/` holds the prepared replacement and source/provenance reports. Active files are `outputs/output-proposed-compact/` and `walkthrough/public/`.

Current sources are `scripts/model/proposal_continuous_joists.py`, `scripts/structure/continuous_joist_integration.py` and `proposal/specs/continuous-joist-integration.json`. The Compact build inventory runs CJ01 after SW02 and excludes Planning. For targeted native staging, run `scripts/build/prepare_continuous_joists.py` through Blender with the preserved SW02 `--source` and a separate `--output`. Then regenerate structural assets, Compact visual assets/daylight and the web viewer. The structural-only final update uses `node walkthrough/tools/build-structure.mjs` to copy the verified member pack into the already-built viewer.
