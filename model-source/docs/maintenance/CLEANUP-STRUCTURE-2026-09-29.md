# Consistent structure — second cleanup pass

## Changes

- 347 implementation files moved into 14 responsibility-based packages (including the existing planning-drawing package). Canonical imports, command paths, Blender shared-execution inventories and source fingerprints updated together.
- Current house/site configuration moved to `proposal/specs/`.
- Numbered P2–P8 study scripts, plans and evidence grouped under `proposal/studies/p2/` through `p8/`. Unnumbered parking/site work and named previews have their own study folders.
- Browser screenshots, reports and logs moved to `walkthrough/test-results/`; output writers updated. Test scripts and HTML fixtures remain under `walkthrough/tests/`.
- Accidental nested revision captures retained under `archive/nested-revisions/`; the overnight capture script moved beside its dated study.
- Identical inspiration copies consolidated on `proposal/reference/`; originals retained in `archive/duplicate-inspiration-references/`.
- Removed 24 disposable Python cache/Finder metadata entries and the empty root `tools/` folder. No native model, design asset, review decision or recovery evidence deleted.
- Added package/folder guides, stricter layout checks and `docs/maintenance/path-map.json`. Source publication can resolve original report paths without editing historical provenance.
- Source links in the review inventory migrated; proposal wording and approval hashes verified identical to the pre-migration copy.

## Verification

- Python suite: **90/90 passed**.
- Direct invocation of relocated-import test consumer: **2/2 passed**.
- Web build: **passed**.
- Web unit suite: **122/123 passed**; the unchanged resident destination standability test remains at 88/105 against its 85% threshold. Its threshold was not weakened.
- Current Proposed/Planning input inventory: **126 / 118 paths resolve**.
- All seven additional design input inventories resolve.
- Original preserved model/export hashes match. All 100 review proposals have source files; all eight saved decisions still match.
- Python syntax, canonical package import targets, literal script targets and native launcher paths verified by `make check-layout`.
- Relative JavaScript imports checked; four apparent misses were inline esbuild source strings with the correct explicit `walkthrough/` resolution base.

## Limits

No Blender rebuild/render was performed: the current sandboxed Blender launch crashes during Metal startup, as recorded in the first cleanup. No geometry/design change was requested or applied here. Source caches correctly become stale after relocation; this does not invalidate preserved native files or make older exports newly current.

The existing local review server caches its inventory at startup. It needs restarting to pick up relocated source links. This session could not connect to localhost because the sandbox denied the socket operation, so the running server was left untouched. The on-disk board, saved decisions and source paths pass the checks.

The publishing checkout was not staged, committed or deployed. Its pre-existing untracked `model 2/` remains untouched.

## Recovery records

Move/edit manifests: `structure-code.json`, `structure-assets.json`, `structure-repairs.json`, `structure-groups.json`. Chained old-to-current path mapping: `path-map.json`. Disposable removals: `disposable-cache-cleanup.json`.

Original text backups live under `.cache/restructure-backup/2026-09-29-phase2`, `-phase3`, `-phase3-followup` and `-phase4`. Do not restore these wholesale over later work. Historical report hashes retain their original meaning; they were not refreshed to pretend a build ran.

Logs: `logs/structure-python-tests.log`, `logs/structure-direct-test.log`, `logs/structure-web-tests.log`, `logs/structure-web-build.log`, `logs/structure-import-check.json`.
