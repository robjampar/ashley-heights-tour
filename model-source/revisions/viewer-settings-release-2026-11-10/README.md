# Unified viewer controls and detailed characters · 10 November 2026

The walkaround keeps room navigation, Walk/Fly, Controls and Settings in its toolbar. Settings contains three tabs:

- **Design:** house version, exterior finishes, brochure, comparison and 360 tour.
- **View:** lens, visual quality, street context, people, cars, object identification, fullscreen and presentation.
- **Structure:** overlay/split view, opacity, vivid colours, layers, both cutaways, drawings and member data.

All structural controls use the existing scene and member register. Selection details stay beside the model; drawings open only when requested. Settings pauses navigation and restores it when closed. Keyboard tab navigation and mobile sizing are included, and the drawings return button stays clear of the member inspector.

This release also packages six detailed resident models and four adult zombie variants with independent skinning and animation, including an injured gait, missing arm and prone crawler. Characters are downloaded on demand and reused. Immutable character and credit URLs keep cached pages paired with their assets. Source licences and attribution are included.

The native architectural models, structural data and selected beam-and-block garage deck retain their existing hashes. Structural assessments remain experimental. Planning application review files are separate from this viewer release.

## Verification

The build and thirteen publication unit tests pass. Desktop and mobile browser checks cover Settings, design switching, overlay/split view, cutaways, member inspection, drawings, keyboard navigation and direct structural links. Packaged-site character checks exercise loading, toggling, independent skeletons, gameplay and hit detection. Structural publication checks cover the current register, standalone links, plans and the existing/planning variants. See the corresponding JSON records under `walkthrough/test-results/viewer-settings-2026-11-10/`, `realistic-residents-2026-11-09/preview/` and `realistic-zombies-2026-11-10/preview/`.

`artifact-verification.json` records all 90 release-manifest file hashes and credit links. The public artifact contains 689 files and is 825,851,049 bytes. Existing photo tours and room studies are retained. An expired older app bundle was archived locally; the current previously published runtime remains available for cached clients.

Publication uses the existing isolated checkout at `/tmp/ashley-heights-release-2026-11-09`, as documented in the preceding release. `staging.json` lists the exact public changes; `source-files.json` lists the selected source snapshot. Original downloaded character source files and native recovery copies remain local.
