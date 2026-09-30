# Ashley Heights

Editable house models, design specifications, room studies and the local walkthrough.

## Open the project

Double-click a launcher in **[launchers/](launchers/)**:

- **Open Proposed Walkthrough.command** — the full proposed house.
- **Open Planning Walkthrough.command** — the planning application variant.
- **Open House Brochure.command** — the local illustrated brochure.
- **Open improvement review.command** — proposals, before/after images and your saved decisions.
- **Open Proposed Design.command** / **Open Planning Design.command** — editable Blender models.

The walkthrough normally runs at `http://127.0.0.1:8765/?design=proposed`; the improvement review normally uses port `8878`. Launchers start or reuse the appropriate local server.

## Where things belong

| Folder | Contents |
|---|---|
| [proposal/](proposal/) | Design briefs, specifications, accepted interior assets and drawing packs |
| [source/](source/) | Original supplied reference material |
| [scripts/](scripts/README.md) | Blender construction, exports, drawing and validation tools |
| [walkthrough/](walkthrough/) | Browser application, public assets and local server |
| [tests/](tests/) | Python checks; browser application tests live in `walkthrough/tests/` |
| [outputs/](outputs/README.md) | Generated native models, exports and per-build reports |
| [revisions/](revisions/README.md) | Dated studies, before/after evidence, approvals and recovery copies |
| [archive/](archive/README.md) | Earlier photo-comparison work and retained scratch material |
| [docs/](docs/WORKSPACE.md) | Workspace guide, detailed project history and maintenance records |
| [logs/](logs/) | Workspace-wide build and test logs |
| [launchers/](launchers/) | Finder entry points |
| [deployment/](deployment/) | Separate publishing checkout |

## Everyday commands

Run `make help` from this folder. Common commands:

```sh
make build-web      # rebuild the local viewer
make preview        # open the proposed design locally
make review         # open the owner review board
make test-python
make test-web
make check-layout
```

Full model rebuilds use `.venv/bin/python scripts/build/regenerate_design_outputs.py --help` and the launchers. They take longer and may replace generated outputs. See [the workspace guide](docs/WORKSPACE.md) before rebuilding or publishing.

**This folder is the working model workspace, not the publishing Git checkout.** The independent repository is `deployment/ashley-heights-tour`. A Git command run here otherwise finds the unrelated parent repository. Publishing is a separate explicit action.

Detailed design and pipeline notes are preserved in [Project history](docs/PROJECT-HISTORY.md).
