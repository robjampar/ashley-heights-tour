# Ashley Heights

The project has three current design options. **Proposed** remains the full design. **Proposed (planning application)** is generated from the same design specification with a small, separate scope overlay.

| Option | Editable Blender model | Drawings |
|---|---|---|
| Existing | `output-walkthrough/Ashley Heights.blend` | [Existing drawings](proposal/planning/Ashley%20Heights%20-%20Existing%20Drawings.pdf) |
| Proposed (planning application) | `output-proposed-planning/Ashley Heights — Proposed (planning application).blend` | [Planning drawings](proposal/planning/Ashley%20Heights%20-%20Planning%20Drawings.pdf) |
| Proposed | `output-proposed-compact/Ashley Heights — Proposed (compact).blend` | [Proposed drawings](proposal/proposed/Ashley%20Heights%20-%20Proposed%20Drawings.pdf) |

The local walkthrough's Design menu offers all three. Use **Open Walkthrough.command**, **Open Planning Walkthrough.command**, or **Open Proposed Walkthrough.command**. The Blender and SketchUp launchers also identify the design explicitly. Each proposed output directory contains its own geometry, navigation, GLB, SketchUp model and Mac Quick Look views.

In either proposed walkthrough, open **Settings → Exterior finishes**. Choose **White render + oak slats** or **Plain brick**, independently of **Dark grey** or **Light grey** roof tiles. Changes are immediate and remembered separately for each design in this browser. Dormer fronts and cheeks always use matching tiles. These controls cover the house and extensions; interiors, garden buildings and boundary walls retain their finishes. The choices are walkthrough previews and do not rewrite the native model or drawing specifications.

The planning scheme uses matching red-brown brick externally, white painted internal wall faces, and weathered dark brown-grey roof tiles matching the existing house and neighbours. Dormer cheeks and front panels are tile hung to match the roof; the owner's tile photograph is retained in `proposal/reference/roof-tile-colour-reference.png`. It retains the garden buildings and rear garden layout, and has a 4.95 m rear opening with four French-door leaves and a normal first-floor window above. The full proposal retains its garden room, roof terrace, pool/spa, loggia, workshop and current finishes.

Both proposed designs set the former-garage side extension's front wall and roof edge back 900 mm from their previous alignment. The existing house and the side wing's rear alignment remain fixed.

[Planning review](proposal/planning/Ashley%20Heights%20-%20Planning%20Review.pdf) and [required submission actions](proposal/planning/REQUIRED-ACTIONS.md): review issue only. Measured survey, official forms and specialist evidence remain outstanding. [Full proposed review](proposal/proposed/Ashley%20Heights%20-%20Proposed%20Review.pdf) is a separate design option.

Regenerate from the current existing model:

```sh
.venv/bin/python scripts/regenerate_design_outputs.py --exchange --renders
```

Or double-click **Regenerate All Outputs.command**. The two selected native models build concurrently, followed by exchange formats, drawing packs and the local viewer. The two drawing packs also build concurrently after the native models finish. Use `--jobs 1` to run each group sequentially and reduce memory load. Each model has its own output directory and log; an overlapping runner is rejected, and the viewer is built only after every selected model and requested drawing-pack check succeeds. This does not rebuild the existing reconstruction or publish the online tour. Save manual Blender edits separately: generated models are replaced on rebuild.

For day-to-day planning edits, build just that design and the local viewer:

```sh
.venv/bin/python scripts/regenerate_design_outputs.py --variant planning --viewer-only
```

Use `--variant compact` for the full proposal, or omit `--variant` to select both. `--viewer-only` skips drawing packs; `--models-only` also skips the viewer build. Both still save the editable Blender model, geometry, navigation and GLB. Requested exchange formats and renders apply to the selected designs plus the existing house.

Successful models are reused when all source hashes, the Blender executable identity and required output checksums match. Missing or edited outputs, changed inputs and failed builds require rebuilding. Use `--force` to bypass reuse. The first build with this pipeline establishes the cache; older outputs are not assumed current. This reuses whole completed models, not intermediate Blender checkpoints.

When changing only exterior surface tagging or exposure rules, reuse the completed architecture:

```sh
.venv/bin/python scripts/regenerate_design_outputs.py --appearance-only --viewer-only
```

This refreshes both designs from their verified native models, then exports the matching geometry, navigation and viewer. Add `--variant planning` or `--variant compact` to select one. It refuses changed architecture/specification inputs, modified outputs or incomplete models; run the normal build in those cases. Browser colour and texture choices need no rebuild at all. Appearance refresh timings are recorded in each model's `appearance-refresh-timings.json`.

Each model writes `build-inputs.json`, `build-cache.json` and `build-timings.json` in its output directory. The runner writes `regenerate-<variant>-timings.json` at the project root, including child-process and viewer times. Stage timings include nested breakdowns, so do not sum parent stages and their children together.

The exterior-finish audit retains the same ray samples and material rules, but indexes collection membership once and classifies materials once per object. To compare reports without replacing the normal audit output:

```sh
~/Applications/Blender.app/Contents/MacOS/Blender --background --python-exit-code 1 \
  --python scripts/audit_exterior_finishes.py -- planning --output /tmp/planning-finish-audit.json
```

The audit writes a companion `.timings.json`; `--blend` and `--navigation` can select a matching saved model and navigation file explicitly.

Drawings only, after model exports are current:

```sh
.venv/bin/python -m scripts.planning_drawings.build_pack
.venv/bin/python -m scripts.planning_drawings.build_pack --check
.venv/bin/python -m scripts.planning_drawings.build_pack --variant compact
```

The model inheritance is `design-spec.json` → `design-spec-compact.json` → `design-spec-planning.json`. Keep shared architecture in the compact specification; the planning overlay contains only planning differences. Model and drawing builds check source stability so concurrent site/tree work cannot silently produce a mixed issue.

See [the editing guide](proposal/START-HERE.md), [planning issue guide](proposal/planning/README.md), and [decision history](proposal/CURRENT-BRIEF.md). Old P2–P8 books and `output-proposed/` are historical. Some old files remain reconstruction inputs; see the [cleanup record](revisions/planning-cleanup-2026-09-23/CLEANUP.md). The hosted tour changes only on an explicit deployment; the rebuilt options are available locally.

## Six additional design studies

The walkthrough also contains **I1 Garden kitchen**, **I2 Social east**, **I3 Garden principal**, **E1 Retained front**, **E2 Garden courtyard** and **E3 Short forecourt wing**. I1–I3 keep the current Proposed envelope; E1–E3 start from the original house. They preserve the full seven-bedroom/leisure/pool/parking brief with the compromises set out in the review. They are concept alternatives, not replacements for the three current designs or approved planning proposals.

Open `walkthrough/dist/redesigns/index.html` through a local HTTP server, or use the **Compare six options** link in the tour. The review has actual model images, floor/site plans, approximate room schedules and a 38-page drawing pack. [Built concepts](proposal/redesigns/CONCEPTS.md) and [external layout notes](proposal/redesigns/EXTERNAL-LAYOUT-NOTES.md) describe the issue. The same house-only wall/roof finish switches work on every new option.

Regenerate the complete review, including current models, drawings, route checks, photographs, PDF and viewer:

```sh
.venv/bin/python scripts/regenerate_redesign_review.py --browser-check
```

Or double-click **Regenerate Six Options.command**. Add option IDs, for example `e1 e2`, to rebuild and check only those models while packaging the complete six-option comparison. The other models must still be verified current. Two independent options are processed at a time; `--jobs 1` reduces memory use. The runner serves its own temporary local viewer for photographs and browser checks, then closes that server. It does not commit or publish.

Drawings and audits are reused only when their model inputs, checking scripts, runtime identities and output checksums still match. `--force-review` repeats them. Photographs have separate records tied to the model, navigation, built viewer, capture script and image checksum; stale photographs prevent packaging. The PDF is reused only when the checked models, plans, photographs, review narrative and document scripts match. Failed or interrupted work cannot create a successful cache record. SVG drawings also use stable identifiers and omit generation timestamps, so redrawing unchanged model data produces identical assets. A repeat-render check confirmed eight E1 SVGs byte for byte, with unchanged PNG renders.

With the native models already current, a complete redraw, geometry audit, photograph verification, PDF refresh and desktop/phone browser review took **125.9 s**. An unchanged repeat took **29.93 s**, or **16.17 s** without the optional browser check. These timings exclude a cold native-model rebuild; unchanged photographs were checksum-verified and reused.

For native models alone, use `.venv/bin/python scripts/build_redesign_options.py e1`. For manual drawing or audit work, the complete sequence is defined in `scripts/regenerate_redesign_review.py`; circulation must write its debug grid before the private-bedroom and en-suite audits use it.

Each option writes `output-redesign-<id>/` with its own native `.blend`, GLB, geometry, navigation and build report. Unchanged options are reused only when source hashes, Blender identity and all native/public output checksums match. `--force` bypasses reuse; `--jobs 1` uses less memory. The builder checks that the source model is unchanged and that borrowed visible mesh objects are present in the GLB. Do not change shared builder inputs during a native build. Run circulation, private bedroom/en-suite access, stair/headroom, pool, site-clearance and parking audits after rebuilding; stale audits are cleared by the builder. Browser captures and the public PDF are refreshed separately after model validation.

The viewer caches derived driving paths and lossless GLB packing by source/code hashes and verifies cached output checksums. Driving keys include only the geometry, gates and parking inputs consumed by the planner: a material, room label or export-timestamp change reuses the existing paths, while moved obstacles and changed openings invalidate them. Measured here, the nine-design viewer took **93.6 s cold and 1.07 s unchanged**. The planning garden-levels step fell from about **202 s to 2.36 s** and the same exterior-finish audit from **1008.5 s to 5.60 s**. These are individual measured operations, not a claim that every cold end-to-end build is ten times faster. Unchanged completed model builds are reused; intermediate Blender checkpoints are not yet implemented.

Complete current-design drawing packs now use the same verified-reuse approach, including rendering-library versions and output checksums. Each unchanged pack took about **1.0 s** instead of about **169 s** to redraw. After enabling parallel drawing packs, the standard command refreshing both current models, both drawing packs and the nine-design viewer took **3.55–4.06 s** across the final unchanged runs. A forced redraw of both packs together took **167.0 s**. Shared geometry caches publish atomically, so concurrent cold loads cannot read partial files. `--force` redraws; partial sheet previews do not replace or reuse a complete issue.

The deployment repository is `deployment/ashley-heights-tour`. `scripts/stage_github_pages.py` stages immutable browser/review assets, and `scripts/stage_redesign_sources.py` stages a curated editable source snapshot plus check evidence. Large native baseline models remain in this workspace with their checksums recorded in the snapshot. Superseded public assets are retained for two hours (the hosted HTML cache is ten minutes), then removed on staging to keep repeated model builds within the hosting size limit. Staging does not commit or push.

Before the loft optimisation below, both current native models built in parallel in **418.3 s** (about 7 minutes), versus **702.8 s** for the earlier sequential builds. Verified reuse of both took **0.62 s**. The six additional native models built together in **237.9 s** with two workers; verifying and reusing all six took **2.02 s**. These times exclude drawings and viewer processing. Model vertices, topology, room polygons and wall metadata for both current designs were checked against the preserved pre-parallel baseline and are unchanged.

The exact loft-wall Boolean cuts now run on temporary copies in a small Blender work scene. A real-model comparison reduced this stage from **65–67 s to 7–8 s** with identical mesh vertices, topology and materials; the complete parallel rebuild of both current designs took **344.9 s**. Every exported object record, room and wall remained exactly equal to the prior build. Targets with existing modifiers, constraints or animation use the original scene; failure cleanup preserves the source and removes temporary work data.

## Validation

Run `.venv/bin/python -m unittest discover -s tests` for the Python pipeline, drawing-cache and current-model geometry checks. The final 25 September issue passes all **65 tests**. The current-model checks include the owner's 24 September 900 mm side-wing setback, four-leaf rear opening and planning tiled verge; front-face overlap and internal/external material checks remain active. The viewer's `npm test` suite passes **113 tests**.

Use the six-option review runner with `--browser-check` to validate the model-linked drawings and photographs, tour handoff, phone layout and PDF download. These software checks do not certify planning compliance, construction details or surveyed dimensions. The final printed pack includes the public planning-history and aquifer-screening notes, with the limitations recorded in [research notes](proposal/redesigns/research/RESEARCH.md).

The final vehicle checker expands its spatial lookup to the complete body radius, so a wall beyond the centre's grid cell cannot be omitted; large containing polygons are also retained. Both reproductions failed before the fix and pass afterward. All six compact-car parking audits were regenerated successfully. A separate 4.8 x 1.95 m / 5.4 m turning-radius sensitivity study fits all parked bodies but does not find both journeys for every bay within the bounded search; it does not establish larger-car manoeuvrability. See the [parking sensitivity note](proposal/redesigns/PARKING-SENSITIVITY.md).

A full review refresh after the driving-checker change, including regenerated route checks, driving paths and all model photographs, took **186.2 s** with native models reused. The final PDF also omits variable generation metadata: two independent builds produced identical SHA-256 hashes, and all 38 pages retained identical text and rendered pixels. This avoids issuing duplicate PDF assets when content has not changed.

### Gate-aligned frontage alternative

**G1 · Gate-aligned frontage** is a separate option based on Proposed, available at `?design=g1`. Its entrance and double-garage frontage follow the main-gate angle, narrowing the southern end while retaining the entrance link's position and angle. See [the option notes](proposal/redesigns/GATE-ALIGNED.md) for its room changes and validation scope. Run `Regenerate Gate-aligned Option.command` to rebuild and check it independently of the six-option study.

### Selected kitchen interior: 01 Quiet oak

The owner selected the first generated kitchen concept for **Proposed and Proposed (planning application)**. The fitted native room includes oak cabinetry, limestone worktops and flooring, upholstered chairs and tables, sink and tap, appliance controls and displays, pendant fittings, tableware, linen and foliage. The existing reconstruction, six alternatives and G1 remain separate. The adjoining Side garden living room now contains a coordinated TV lounge: cream sofa and linen throw, stone tables, floating oak console, slim TV, soundbar and remote controls, and floor olives. The separate formal dining bay remains a later room session. Revision 2 refines the oak, limestone, ceramic, upholstery and pendant colours/shapes against the selected reference.

Open `interiors/kitchen/model.html` in the tour for the isolated room and detail cameras, or `interiors/kitchen/` for the twenty concept images (ten schemes in both designs) with circle/freehand annotations. Feedback saves in that browser; export the marked images or review file to share it. Concepts were created with built-in `image_gen`; prompts and original camera references are recorded alongside them. Native renders are labelled separately and show the actual measured model geometry.

Edit `proposal/interiors/kitchen/quiet-oak.json` and `scripts/proposal_kitchen_interiors.py`. Run `Blender --background --python-exit-code 1 --python scripts/preview_kitchen_interiors.py -- planning --render` for a room-only experiment from a completed house. It writes only isolated review assets and evidence; it does not replace the completed native house. Use `compact` for Proposed; add `--view lounge --render-only` for the TV camera (or `--view plants --render-only` for a planting close-up) without another GLB export. Camera links accept `?design=compact&view=lounge` and preserve the view when switching designs. After a verified full build, add `--native-current` to export the completed fitted model without applying the room module again.

Publish native changes through `.venv/bin/python scripts/regenerate_design_outputs.py --variant all --viewer-only`. Check `.venv/bin/python scripts/audit_kitchen_interiors.py`, `node walkthrough/tests/kitchen-circulation.mjs` and the interior browser checks. Native Blender bump nodes remain editable; glTF export omits their unsupported normal-map connection and the viewer applies the same small height relief in metres. This avoids interpreting a colour image as a tangent normal map.

### Principal bedroom: design session 02

Apply `proposal/interiors/DESIGN-PRINCIPLES.md` to every room, including occupied furniture, open doors/drawers, daylight, privacy, adjoining functions and existing-building constraints. Review one room at a time.

The five floorplans and first three furniture arrangements were not selected. The owner requires headboards against proper walls and rejects pivoting TVs. `interiors/principal/arrangements.html` now records that the review is withdrawn pending stronger room planning. The expanded rules and `proposal/interiors/ROOM-REVIEW-TEMPLATE.md` govern the next iteration. Two corrected working sketches are preserved in `proposal/interiors/principal/arrangements.json`: A is rejected on design quality despite a geometry pass; B remains unresolved. Neither is recommended as a completed suite or fitted. Run `.venv/bin/python scripts/draw_principal_arrangements.py` to reproduce the sketches and separate geometry/design findings. Research is in `revisions/interiors-principal-2026-09-26/LAYOUT-RESEARCH.md`.

Open `interiors/principal/plans.html` to compare five new floorplans with a clear entrance, smaller wardrobes and revised study/bathroom positions. Options 1–3 move the ensuite north; 4 puts it centrally along the east wall; 5 enlarges the existing south wet-room area. Circle changes, add notes and shortlist independently from the earlier bedroom colour board. `proposal/interiors/principal/floorplans.json` and `.venv/bin/python scripts/draw_principal_floorplans.py` reproduce all five measured SVGs and their 2D fit audit. Run `node walkthrough/tests/principal-floorplans-browser.mjs` after building the viewer. The selected plan will still need native fitting and plumbing/structural review.

Open `interiors/principal/model.html` for the previous isolated principal suite layout: north-east bed and south sofa sharing an angled TV, a 27.3 m² dressing zone in place of the old dressing room and most of the office, and a 1.5 m window desk. This is an isolated editable native study for both proposals; the current whole-house tour remains the preceding suite issue. Seven cameras and a measured plan support layout review. Bathroom, WC, external windows, entrance and vaulted alcove retain their positions.

Edit `proposal/interiors/principal/layout.json`, then run `Blender --background --python-exit-code 1 --python scripts/preview_principal_layout.py -- compact` and again with `planning`. The script writes separate native studies and room GLBs without overwriting either completed house. Run `.venv/bin/python scripts/draw_principal_layout.py`, `node walkthrough/tests/principal-layout-circulation.mjs` and `npm --prefix walkthrough run build`. Browser verification is `node walkthrough/tests/principal-layout-browser.mjs`. Checks cover 500 mm body circulation, native bed/sofa screen sightlines, window clearances, measured areas and the seven review cameras.

Open `interiors/principal/` for ten furnishing concepts continuing the oak, ivory and warm stone palette. Their previous furniture arrangement is superseded by the layout study; keep these images as material references. Notes and marks stay separate by design and room. Current-house bedroom, sitting-area and study captures provide context. `walkthrough/tools/capture-principal-room.mjs` records their exact cameras.

The annotation engine and CSS are authored once in `walkthrough/public/interiors/kitchen/`; `npm run build` also copies them into the principal board. Its own `options.json`, `prompts.json`, images and session supply the room-specific content. Build and publish this board without rebuilding Blender. Validate with `walkthrough/tests/principal-studio-browser.mjs` and the existing studio browser test pointed at the new URL. Restore its published image assets with `scripts/restore_interior_assets.py --published ../model --room principal` from the published source snapshot; the default remains the kitchen.
