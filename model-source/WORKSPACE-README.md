# Ashley Heights

The project has three current design options. **Proposed** remains the full design. **Proposed (planning application)** is generated from the same design specification with a small, separate scope overlay.

| Option | Editable Blender model | Drawings |
|---|---|---|
| Existing | `output-walkthrough/Ashley Heights.blend` | [Existing drawings](proposal/planning/Ashley%20Heights%20-%20Existing%20Drawings.pdf) |
| Proposed (planning application) | `output-proposed-planning/Ashley Heights — Proposed (planning application).blend` | [Planning drawings](proposal/planning/Ashley%20Heights%20-%20Planning%20Drawings.pdf) |
| Proposed | `output-proposed-compact/Ashley Heights — Proposed (compact).blend` | [Proposed drawings](proposal/proposed/Ashley%20Heights%20-%20Proposed%20Drawings.pdf) |

The local walkthrough's Design menu offers all three. Use **Open Walkthrough.command**, **Open Planning Walkthrough.command**, or **Open Proposed Walkthrough.command**. The Blender and SketchUp launchers also identify the design explicitly. Each proposed output directory contains its own geometry, navigation, GLB, SketchUp model and Mac Quick Look views.

In either proposed walkthrough, open **Settings → Exterior finishes**. Choose **White render + oak slats** or **Plain brick**, independently of **Dark grey** or **Light grey** roof tiles. Changes are immediate and remembered separately for each design in this browser. Dormer fronts and cheeks always use matching tiles. These controls cover the house and extensions; interiors, garden buildings and boundary walls retain their finishes. The choices are walkthrough previews and do not rewrite the native model or drawing specifications.

The planning scheme uses matching red-brown brick externally, white painted internal wall faces, and weathered dark brown-grey roof tiles matching the existing house and neighbours. Dormer cheeks and front panels are tile hung to match the roof; the owner's tile photograph is retained in `proposal/reference/roof-tile-colour-reference.png`. It retains the garden buildings and rear garden layout, and has a 2.40 m pair of rear garden doors with a normal first-floor window above. The full proposal retains its garden room, roof terrace, pool/spa, loggia, workshop and current finishes.

Both proposed designs set the former-garage side extension's front wall and roof edge back 450 mm from their previous alignment. The existing house and the side wing's rear alignment remain fixed.

[Planning review](proposal/planning/Ashley%20Heights%20-%20Planning%20Review.pdf) and [required submission actions](proposal/planning/REQUIRED-ACTIONS.md): review issue only. Measured survey, official forms and specialist evidence remain outstanding. [Full proposed review](proposal/proposed/Ashley%20Heights%20-%20Proposed%20Review.pdf) is a separate design option.

Regenerate from the current existing model:

```sh
.venv/bin/python scripts/regenerate_design_outputs.py --exchange --renders
```

Or double-click **Regenerate All Outputs.command**. The two selected native models build concurrently, followed by exchange formats, drawing packs and the local viewer. Use `--jobs 1` to run the native builds sequentially and reduce memory load. Each model has its own output directory and log; an overlapping runner is rejected, and the viewer is built only after every selected model succeeds. This does not rebuild the existing reconstruction or publish the online tour. Save manual Blender edits separately: generated models are replaced on rebuild.

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

Open `walkthrough/dist/redesigns/index.html` through a local HTTP server, or use the **Compare six options** link in the tour. The review has actual model images, floor/site plans, approximate room schedules and a 36-page drawing pack. [Built concepts](proposal/redesigns/CONCEPTS.md) and [external layout notes](proposal/redesigns/EXTERNAL-LAYOUT-NOTES.md) describe the issue. The same house-only wall/roof finish switches work on every new option.

Build selected options with the verified runner (defaults to all six, two at a time), then regenerate their walk masks and drawings:

```sh
.venv/bin/python scripts/build_redesign_options.py e1
.venv/bin/python scripts/redesign_walk_masks.py e1
.venv/bin/python scripts/draw_redesign_plans.py e1
.venv/bin/python scripts/draw_redesign_sites.py e1
.venv/bin/python scripts/package_redesign_review.py
.venv/bin/python scripts/build_redesign_pdf.py
```

Each option writes `output-redesign-<id>/` with its own native `.blend`, GLB, geometry, navigation and build report. Unchanged options are reused only when source hashes, Blender identity and all native/public output checksums match. `--force` bypasses reuse; `--jobs 1` uses less memory. The builder checks that the source model is unchanged and that borrowed visible mesh objects are present in the GLB. Do not change shared builder inputs during a native build. Run circulation, stair/headroom and parking audits after rebuilding; stale audits are cleared by the builder. Browser captures and the public PDF are refreshed separately after model validation.

The viewer caches derived driving paths and lossless GLB packing by source/code hashes and verifies cached output checksums. Measured here, the nine-design viewer took **93.6 s cold and 1.07 s unchanged**. The planning garden-levels step fell from about **202 s to 2.36 s** and the same exterior-finish audit from **1008.5 s to 5.60 s**. These are individual measured operations, not a claim that every cold end-to-end build is ten times faster. Unchanged completed model builds are reused; intermediate Blender checkpoints are not yet implemented.

The deployment repository is `deployment/ashley-heights-tour`. `scripts/stage_github_pages.py` stages immutable browser/review assets, and `scripts/stage_redesign_sources.py` stages a curated editable source snapshot plus check evidence. Large native baseline models remain in this workspace with their checksums recorded in the snapshot. Staging does not commit or push.

Both current native models now build in parallel in **418.3 s** (about 7 minutes), versus **702.8 s** for the earlier sequential builds. Verified reuse of both took **0.62 s**. The six additional native models built together in **237.9 s** with two workers; verifying and reusing all six took **2.02 s**. These times exclude drawings and viewer processing. Model vertices, topology, room polygons and wall metadata for both current designs were checked against the preserved pre-parallel baseline and are unchanged.
