# Implementation packages

| Package | Responsibility |
|---|---|
| `build/` | Build runners, shared input fingerprints, export orchestration |
| `model/` | Existing-house construction and proposed architectural geometry |
| `interiors/` | Room furnishings, material helpers and accepted interior details |
| `geometry/` | Mesh primitives, dimensions, collections, exposure and circulation helpers |
| `redesigns/` | Additional layout alternatives and gate-aligned geometry |
| `planning_drawings/` | Planning sheets, annotations, sections and issue checks |
| `drawings/` | Room plans, reports, design reviews and estimates |
| `brochure/` | Brochure content, drawings, CPU renderer and document builders |
| `exports/` | SketchUp and Mac model exports |
| `publication/` | Source/site staging, delivery, retention and release verification |
| `audits/` | Geometry, room access, preservation and model checks |
| `studies/` | Isolated previews, proof renders and camera experiments |
| `reconstruction/` | Original-house reconstruction/refinement operations |
| `maintenance/` | Workspace integrity and recorded-path migration support |

## Common entry points

```sh
.venv/bin/python scripts/build/regenerate_design_outputs.py --help
.venv/bin/python scripts/build/regenerate_redesign_review.py --help
.venv/bin/python -m scripts.planning_drawings.build_pack --help
make check-layout
```

`build/build_extension_proposal.py` and `model/build_model.py` require Blender. See `build/build_support.py` for the **ordered** shared-execution module list. Those modules are not standalone commands. Ordinary helper imports use `scripts.<package>.<module>`; direct Python/Blender entry points establish the workspace import root explicitly.

Study and reconstruction scripts can mutate assets immediately when executed. Do not run every script to test imports. Use the Python suite, static import/path checks and the appropriate targeted Blender audit instead.

The Makefile exposes common local tasks. Publication tools are deliberately separate from those commands. Numbered historical P2–P8 studies stay with their evidence in `proposal/studies/`, including their own reproduction scripts.
