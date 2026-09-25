# Editable model source snapshot

This directory preserves the authored Blender scripts, design specifications, browser source and concept-check evidence for the six-option study. The published review is at `../model/redesigns/`; the current designs remain separate choices in `../model/`.

The large native reconstruction and existing generated baselines are retained in the local Ashley Heights model workspace, not duplicated in Git. `source-manifest.json` records the required baseline checksums. This source snapshot is not a standalone reconstruction from photographs: restore the listed baselines into their recorded relative paths before running Blender builds.

See `WORKSPACE-README.md` under this directory for the current-model pipeline. Build an additional option with Blender 4.5 LTS: `Blender --background --python-exit-code 1 --python scripts/build_redesign.py -- e1`. The other IDs are `i1`, `i2`, `i3`, `e2`, `e3`, and the separate gate-aligned alternative `g1`. Each writes its own native model, geometry, navigation and GLB. Never hand-edit a generated model without saving a separate copy.

The viewer uses `npm ci` then `npm run build` from `walkthrough/`. Python drawing/review tooling requires matplotlib, shapely, Pillow, reportlab, pypdf and svglib. Drawings and layouts are concept studies, not surveyed application or construction documents.

Account usage records, browser session logs, credentials and temporary captures are excluded from this snapshot.
