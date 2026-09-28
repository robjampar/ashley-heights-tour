# Faster publication

Implemented for subsequent builds and publications:

- Unchanged model compression is reused from `walkthrough/.cache/delivery`. The cache key includes the source SHA-256 and compression format version. Cached compressed bytes are checked against their recorded hash; missing/corrupt entries are rebuilt and round-trip verified before being saved atomically.
- Across all 63 current models, the first compression pass took 15.333 seconds and the cached pass took 0.638 seconds, with zero compression calls. This is a compression-stage measurement, not an end-to-end build speed claim. Existing mesh and navigation build caches remain in use.
- The deployment planner checks out only its small rollout manifest. Publication workers check out the public site, the artifact validator and (only for migration stages) the relevant stage package. Editable model sources and unused migration packages are omitted.
- Pushes that change only editable sources or documentation do not redeploy the unchanged website. Public assets and the artifact validator trigger deployment; manual dispatch remains available.
- Routine deployments continue to publish once, without sleep steps. Explicit three-stage migration replays now wait 15 minutes between successful deployments, compared with the observed 10-minute HTML cache lifetime. This is a propagation buffer, not a guarantee for indefinitely open tabs.
- The already-running migration uses the workflow committed when it started, so its original waits are unchanged. It was not cancelled or restarted.

Validation: 15 targeted Python tests pass. All three sparse checkout patterns were exercised in a disposable clone and yielded complete artifact inputs at 967,136,433, 905,179,240 and 907,020,124 bytes respectively. Workflow YAML parses successfully. See benchmark.json and sparse-checkout-validation.json.

GitHub Pages still receives a complete website artifact. Git pushes already transfer new Git objects, but incremental per-file website deployment would require another hosting/storage arrangement. No such service or infrastructure was introduced. Existing immutable previous-release assets remain available under the current retention policy.
