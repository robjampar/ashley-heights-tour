# Ashley Heights - design options

Keep three outputs: Existing, Proposed (planning application), and Proposed. The full Proposed design is the compact scheme. Its planning counterpart is always derived from that scheme, rather than maintained as an independent copy.

- Existing: `output-walkthrough/`.
- Proposed (planning application): `output-proposed-planning/`, drawings in [planning/](planning/README.md).
- Proposed: `output-proposed-compact/`, drawings in [proposed/](proposed/README.md).

The builder reads `design-spec.json`, overlays `design-spec-compact.json`, then overlays `design-spec-planning.json` only for planning. The latter omits the rear garden room and terrace, workshop, pool/spa and loggia/shed alterations; it specifies matching brick and a completed rear side-wing elevation. Shared tree/site sources stay with the existing model and their existing scripts.

Planning finishes: matching red-brown brick outside, white painted internal walls, and weathered dark brown-grey roof tiles. Dormer cheeks and front panels are tile hung to match. The reference photograph and colour values are recorded in the planning overlay; they do not change the full Proposed finishes.

The shared compact specification sets `sideWingFrontSetback_m` to 0.90 (owner, 24 Sep 2026: doubled from 0.45). Both proposed designs inherit the recessed side-wing front wall, windows and roof edge; the original house and rear alignment remain fixed.

Run `PROPOSAL_VARIANT=planning` with `scripts/build_extension_proposal.py` in Blender for the planning native model. The full design remains `PROPOSAL_VARIANT=compact`. The complete command is `.venv/bin/python scripts/regenerate_design_outputs.py --exchange` from the project root.

The browser menu preserves the view when changing design, moving to a supported room only where a walking position no longer exists. Each design has independent navigation and model files. Model exports include Blender, GLB, SketchUp and USDZ views. No public deployment is included in a local regeneration.

Save direct Blender edits separately. Update the specification or relevant shared module for repeatable edits. The chronological [decision history](CURRENT-BRIEF.md) remains useful background; this guide identifies the current design arrangement.

The planning documents describe the completed application scheme only. Keep project phasing and full-design comparison notes outside that pack. Review [required actions](planning/REQUIRED-ACTIONS.md) before submission: the reconstruction and its areas are provisional, and official forms and consultant reports remain outstanding.
