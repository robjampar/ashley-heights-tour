# Structural walkthrough publication — 4 November 2026

The owner reported that the public Proposed link did not expose the structure. The live site still served the 26 October release, without the unified Structure button. The publication packager also omitted the structural runtime, so publishing the newer main JavaScript alone would not have repaired it.

The release now includes the current WM01 register (2,576 members), the unified overlay/split viewer, drawings and downloads, plus the current coordinated native model and west-recess brick finish. The structural workspace is packaged in an immutable content-addressed directory; its architectural model URL is rewritten to the corresponding compressed model. `/model/structure/` redirects to the current issue while preserving member/query links.

The exact public artifact passed eight browser checks: Proposed toggle, member inspector, split mode, plan view, member-schedule download, standalone member link and architectural context, Planning and Original. Screenshots were reviewed for overlay, split and plan modes. Nine publication unit tests passed. The artifact contains 663 files and 888,414,152 bytes. Browser records and captures are in `walkthrough/test-results/structural-publication-2026-11-04/`.

The currently published assets remain available for cached clients. Eleven older assets whose retention windows had already expired were archived locally in `expired-public-assets/` before removal from the public package; prior commits also preserve them. The existing photo tour, brochure and isolated studies remain in the artifact. No native geometry or structural calculations changed during this publication repair.

Checks remain limited: the broad visual-quality audit fails an existing door-architrave alignment assertion (approximately 0.3645 m against a 0.12 m tolerance). The native, furnishings and lighting input hashes agree; this publication does not claim that geometry issue is fixed. The workspace layout check retains its existing findings. The experimental structure remains explicitly unapproved for construction.

Release commit `1948826` was pushed with source commit `c182c0d`. GitHub Pages run [41811770120](https://github.com/robjampar/ashley-heights-tour/actions/runs/41811770120) successfully deployed the complete site. Its packaged inventory matches the preview: 663 files, 888,414,152 bytes. The public release manifest now exposes WM01 and the immutable structure runtime. Live browser results are recorded separately in `live-checks.json`.

All nine live browser checks passed with no page errors or HTTP failures. The public release manifest matches the staged release byte for byte. The direct `?design=proposed&structure=1` link enables the overlay automatically. Live screenshots were reviewed for the split view and initial structure view.
