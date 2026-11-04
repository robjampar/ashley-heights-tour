# Open lounge entrance

The owner asked to remove the door into the new lounge, formerly Bedroom 3. The landing entrance is now an open, oak-lined passage. Its leaf, handles, hinges and three planted stops are removed; the nine lining/architrave pieces and oak threshold remain. The private door into the west bedroom suite and the glazed terrace doors are unchanged.

`open_lounge_entry` in `scripts/model/proposal_terrace_lounge_suite.py` applies the change to future builds and is idempotent. Retained linings have independent names so visual refinement does not remove them when rebuilding the remaining door frames.

Immediate recovery copies are under `original/`, with SHA-256 values in `recovery.json`. Candidates are in `outputs/output-lounge-open-entry-{compact,planning}/`; current local native/GLB/navigation/geometry records are in `lounge-open-entry-refresh.json`. GLB scene roots are updated without changing any mesh, index or image bytes. All seven original native scenes are preserved. Earlier revision reports remain historical.

Both variants receive the open internal entrance. Lighting and visual overlays are rebuilt from the updated native models. Evidence and actual browser screenshots are under `walkthrough/test-results/lounge-open-entry-2026-10-23/`. This is a local model update; nothing is published.

Final verification: 270 viewer tests pass. Both open entrances pass mesh-ray and walking checks, all other interactive doors match the previous revision, and both lighting/served-asset audits pass. Four actual Chrome screenshots were reviewed with no console errors, warnings or failed requests. The workspace checker matches the existing 345-finding baseline. See `final-validation.json` in the evidence directory.
