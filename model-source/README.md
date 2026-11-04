# Editable model source snapshot

This directory preserves the authored Blender scripts, design specifications, browser source and concept-check evidence for the six-option study. The published review is at `../model/redesigns/`; the current designs remain separate choices in `../model/`.

The large native reconstruction and existing generated baselines are retained in the local Ashley Heights model workspace, not duplicated in Git. `source-manifest.json` records the required baseline checksums. Generated full-house navigation snapshots repeated in isolated room studies are also recorded as local baselines; rerunning the room preview regenerates them. This source snapshot is not a standalone reconstruction from photographs: restore the listed baselines into their recorded relative paths before running Blender builds.

See `WORKSPACE-README.md` under this directory for the current-model pipeline. Build an additional option with Blender 4.5 LTS: `Blender --background --python-exit-code 1 --python scripts/build/build_redesign.py -- e1`. The other IDs are `i1`, `i2`, `i3`, `e2`, `e3`, and the separate gate-aligned alternative `g1`. Each writes its own native model, geometry, navigation and GLB. Never hand-edit a generated model without saving a separate copy.

The viewer uses `npm ci` then `npm run build` from `walkthrough/`. Python drawing/review tooling requires matplotlib, shapely, Pillow, reportlab, pypdf and svglib. Drawings and layouts are concept studies, not surveyed application or construction documents.

Account usage records, browser session logs, credentials and temporary captures are excluded from this snapshot.

## Current house and structure

The snapshot also includes current proposal specifications, the unified structural walkthrough, structural calculation sources and generated member data, and dated coordination/finish review records. The structural design remains experimental. A source commit does not update the public tour: building, release staging and publishing are separate steps. Large native/geometry recovery files remain local and are identified by checksum in `required_local_baselines`. Restore those files before running checks that compare against earlier model issues.
