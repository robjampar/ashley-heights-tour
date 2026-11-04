# Viewer performance and visual refinement — 4 November 2026

The owner reported slow loading and movement in the published viewer and requested better visuals. Profiling used Chrome on this Mac at 1440 × 960, device scale 2, with a fresh browser cache. The public baseline opened in 9.94 s. Its five movement samples usually reached a 16.7 ms median, but slower frames reached 33–50 ms; automatic resolution reduction persisted after the slowdown. These are device-specific observations, not universal frame-rate guarantees.

Implemented changes:

- Start the house, furnishing detail, daylight, navigation and vehicle downloads concurrently. Index full-house overlay replacements by object name rather than scanning every original object repeatedly.
- Losslessly pack furnishing geometry using the existing verified meshopt pipeline. Compact furnishings shrink from 38,315,148 to 24,334,128 bytes (36.5%); the same source geometry, textures and UVs are retained. Gzip transfer savings are smaller, approximately 11% for that asset.
- Remove hidden individual structural meshes from the render hierarchy while retaining member identity, selection, filters and drawings. The default structural layer has 206 render-scene children. Freeze static world transforms; doors and moving objects remain dynamic.
- Skip the house pass when its opacity is zero in overlay mode, and skip the member pass when structure opacity is zero. Split view still renders the visible house half.
- Recover image resolution after sustained rendering headroom, with hysteresis to prevent oscillation. Settings now offers Automatic, High detail and Faster movement, remembered between visits.
- Increase restrained contact shading slightly and use more directional structural lighting for clearer depth. Accepted materials, baked daylight, vegetation and native architecture remain unchanged.
- Publish compact structural JSON with identical values, reducing parsing and artifact size. The public server already compresses JSON in transit; this is not presented as removing a 36 MB network download.

The first local movement comparison reduced structural overlay render CPU median from 17.8 to 11.1 ms and split view from 15.4 to 9.7 ms. Median frame intervals stayed broadly similar; split-view p95 improved in that run. Its local load time is not directly comparable to the internet baseline. The final live comparison is recorded after publication.

Validation before publication: 319 full web tests, 10 later targeted tests, nine publication tests, nine packaged browser checks, and three quality/control browser checks passed. Reviewed screenshots cover the principal bedroom, Art Deco bar and structural views. The workspace check retains its existing 345 findings. The prior door-architrave geometry audit issue is unchanged; this work does not alter or revalidate structural calculations. The structure remains experimental and unapproved for construction.

Raw profiles, screenshots, resource timings and browser checks are in `walkthrough/test-results/viewer-performance-2026-11-04/`. Original edited source files are retained under `original/`; earlier published assets remain recoverable in Git, with expired transport assets copied under `expired-public-assets/`. The exact public artifact contains 678 files and 949,344,348 bytes, excluding four unrelated untracked brochure context files.

The approach follows the Three.js guidance to reduce scene-graph and rendering overhead: https://threejs.org/manual/pages/optimize-lots-of-objects.html. No claim of photorealism is made by these incremental visual improvements.
