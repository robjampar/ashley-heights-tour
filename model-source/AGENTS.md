# Ashley Heights workspace

Read README.md and docs/WORKSPACE.md before moving files or rebuilding.

- This workspace has no .git. The publishing checkout is deployment/ashley-heights-tour; the parent Git repository is unrelated. Verify the Git root before any commit or push.
- Preserve existing designs, accepted assets, review decisions, dated evidence and native recovery copies.
- Generated full model outputs belong under outputs/, launchers under launchers/, workspace logs under logs/, documentation under docs/, and dated studies under revisions/.
- Use the scripts/ packages and proposal/specs/ for current specifications; keep older stage work under proposal/studies/. Update imports, shared execution inventories, fingerprints and all consumers when moving code. Browser test artifacts go in walkthrough/test-results/, never beside test source.
- Run make check-layout and relevant tests after structural changes. A web build is make build-web. Full Blender builds and publication are separate actions.
- Local review does not authorize publication. Do not stage or deploy merely to verify a cleanup.
- Historical provenance reports may retain old paths; use docs/maintenance/restructure-manifest.json to resolve relocated files. Never rewrite hashes to claim an unperformed build or audit succeeded.
