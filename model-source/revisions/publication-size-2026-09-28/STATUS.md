## Publication started

All changes pushed to main as c57cab12a65bed131ae80f4b20625ae6a3447c57. GitHub Actions run 36493796197 is in progress. The staged rollout is automated, with two 30-minute cache waits. Do not infer that all stages are live until the workflow completes.

# Publication readiness — 28 September 2026

GitHub access restored. All missing original-tour files have been recovered. All four brochure downloads are uploaded and verified by downloading and comparing their SHA-256 hashes. The three-stage deployment workflow is prepared for the publication commit.

## Completed

- Shared identical textures across the tour and room models without changing image payloads, geometry or scene metadata.
- Added deterministic gzip delivery for all 63 model files, with native browser decompression and a bundled fallback. Source GLBs remain unchanged. Three.js parsing and external texture base paths are tested.
- Gzip delivery saves a further 370,392,235 bytes. Active site content is approximately 575 MB, excluding the 13 unavailable original-tour files.
- Verified all 63 delivered GLBs decompress to the exact built GLB bytes, and all 161 external texture references resolve to the correct SHA-256 image files.
- Recovered all 31 absent current-release model assets from the local Git object store. Current-release model assets are no longer missing.
- Prepared PDFs and JPEG ZIP downloads under `output/release-downloads/brochure-67ea50051a32` (approximately 102 MB). Uploaded and verified; see download-upload-verification.json.
- Prepared three rollout packages under `output/publication-rollout`. Their projected public sizes, including the assets required by the preceding cached release, are 967,136,433, 905,179,240 and 907,020,124 bytes. These final checks include the restored original-tour files.
- Checked every active and retained asset hash in each rollout package, and the content-hashed HTML references. Reports: `delivery-verification.json`, `rollout-verification.json`, `output/publication-rollout/rollout.json`.
- 123 JavaScript tests and 13 Python publication tests pass. The JavaScript tests include native/fallback decompression, HTTP failure handling, texture base paths and actual Three.js parsing. Browser visual QA was not performed in this environment.

## Publication sequence

1. DONE: GitHub access restored; Pages build type changed from legacy to workflow.
2. DONE: recovered all missing original files with `scripts/publication/recover_release_files.py --repo deployment/ashley-heights-tour --fetch`. It restores only absent committed files; it does not overwrite local edits. Reconcile any upstream changes against the rollout base commit `abc04e9535df6b055222b36dee5b92b65430ed77` before proceeding.
3. DONE: uploaded and verified the four assets in `output/release-downloads/brochure-67ea50051a32/upload-manifest.json` to the designated GitHub release, then verify their public download content against the recorded hashes.
4. Publish `output/publication-rollout/stage-1/model` in place of the deployment checkout's `model/`: this updates principal/kitchen studies and preserves the preceding release assets. Retain the complete original tour and staged editable sources. Run `pages_artifact.py` on the full checkout before committing/pushing.
5. Confirm the deployment succeeded; allow at least 30 minutes for cached HTML to expire. Publish stage 2 in the same way (remaining room studies), validate, and wait again after successful deployment.
6. Publish stage 3 (full tour and brochure) after verifying brochure downloads exist. Its package retains stage 2's model URLs. Keep them until the normal cache retention interval has elapsed.

Do not push the current unfiltered deployment working tree directly: it contains all release generations and is approximately 1.245 GB. Use the prepared phased packages. Staging age is not evidence that a deployment happened; wait intervals start only after confirmed live deployments.

No loss of geometry or model texture quality is required. Brochure photo downloads reuse the existing full-resolution JPEGs; source PNGs remain local.

## Separate native-model limitation

The principal-bedroom gable-wall change is present in the web-model preview, but the authoritative native Blender rebuild remains pending after Blender failed during Metal startup. Do not describe the native model or brochure as regenerated from that change.

The single publication push includes stage 1 and 2 model packages under model-source/publication-rollout and the final model under model/. GitHub Actions deploys the three stages in sequence, with 30-minute cache waits after each of the first two successful deployments. Future pushes use the final package directly; the initial staged rollout is selected by its exact preceding commit.
