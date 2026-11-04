# M02 — wall corrections and two roof strategies

Local experimental structural issue, 26 October 2026. Open [Roof options](http://127.0.0.1:8765/structure/?view=roof-options). This updates the structural study, without changing the architectural native models, exterior design or published walkthrough.

## Two options

- **A — retain and adapt the existing roof.** Surviving original roof surfaces remain grey survey context. New wings, dormers and agreed roof alterations remain in the common scheme. Existing member sizes and capacity are unknown; strengthening is not inferred from the architectural surfaces.
- **B — remove and rebuild the existing roof entirely.** The remaining original roof surfaces are replaced with selectable framing reservations, following their actual upper planes, openings and edges. The agreed roof shape, floor levels, dormers and stair position remain. Existing walls and floors are not automatically replaced. The optional original-garage rebuild and original-house loft-floor upgrade remain independent and off by default.

Use the roof strategy selector from the same camera, drawing or register. The comparison cards open roof-only 3D views or plans. Roof plans include the lower roofs and omit unrelated room labels. The member inspector, drawing issue, partial cost subtotal and CSV identify the chosen option. Drawings can be exported as SVG; earlier PDF download links remain disabled because those issues are stale.

B adds **212 replacement framing references**, covering approximately **91.392 m²** of surviving original-roof surfaces. This is not the original roof's entire demolition area: roof zones already removed or altered for the agreed extensions/dormers are common work. Soffit boards and decorative seams are excluded from roof-framing generation. Replacement rafters are 45 × 220 mm at 400 mm centres, with doubled perimeter/opening edge reservations and a UB ridge space. These dimensions are **uncalculated reservations**, not a final section schedule.

At the default study rates, B's additional modelled framing allowance is about **£9,123 / £13,685 / £21,190 ex VAT** (lower/reference/higher). This is not the full replacement premium. Demolition, access/scaffolding, temporary stability/weather protection, coverings/insulation, connections, wall-head work and any additional strengthening remain unpriced. Rates are editable assumptions, not supplier quotes or guaranteed cost bounds.

## Wall corrections

`proposal/specs/structural-wall-assemblies.json` now explicitly identifies shaped wall bodies and exposed-face directions. Their geometry is taken from the current architectural source, not a filled bounding rectangle.

- All loft/dormer/knee-wall bodies use timber framing, with zero loft-level masonry assemblies. This corrects the two loft piers previously assigned brick/block leaves.
- Garage south/north returns, all four shaped gable wall pieces and both parts of the wall above the garage vault/roof are represented. The central gable window stays open.
- Entrance side returns and shaped rake bands are included. Brick/block leaves wrap both exposed faces of the entrance corner piers without intersecting in the corner.
- Missing lower facade and upper loft/dormer wall bodies are classified explicitly. A first-floor wall head below the loft eaves stays associated with the first floor.

The entrance gable can rise above the loft floor without being a loft-room wall; its masonry follows the lower entrance facade. External tile/brick finishes remain a separate architectural layer. The 352.5 mm cavity-wall study still needs room/reveal coordination against thinner authored walls. Masonry bonds, lintel-bearing courses, ties, supports and wall loading remain unverified.

## Reproduction and evidence

Run `make build-structure`. It regenerates the architectural register, UK trials and member layer, verifies their input hashes and bundles the local structural viewer. New wall specifications are included in both data-generation hash chains. Prior implementation/data files are in `original/`; M01 remains documented separately.

Current result: **597 architectural references**, **2,065 member/assembly references** across both roof strategies, **22,208 visible masonry pieces**, and **23 open coordination items**. Counts across both options are not simultaneous construction quantities.

Validation covers timber loft scope, exact wall profiles/openings, non-overlapping entrance corners, replacement framing inside original roof footprints, roof-option visibility and unchanged common work, lower-roof plan coverage, cost reconciliation and CSV selection. **23 Python checks** and **293 web-suite tests** passed before the final plan-label refinement; the final targeted drawing/member checks are recorded in the matching log. Chrome review captures 13 views, including garage/entrance close-ups, loft timber, matching A/B cameras, plans, costs and mobile comparison; no page errors were reported.

Evidence is under `walkthrough/test-results/structural-walls-roof-options-2026-10-26/`; logs are `logs/structural-walls-roof-options-*.log`. The layout check still reports the same **345 pre-existing findings** as `logs/garden-workshop-check-layout.log`, byte-for-byte, with no new findings. This is not a passing layout audit or engineering approval.

The complete load path, supports, connections, wind/snow, stability, foundations, basement reinforcement and temporary works still need professional engineering design and validation before physical work. No construction issue or publication is claimed.
