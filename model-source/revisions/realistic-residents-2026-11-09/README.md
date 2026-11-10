# Detailed household residents

Implemented 9–10 November 2026 following the request to make people photorealistic.

The normal walkthrough's optional People setting now loads six detailed Microsoft Rocketbox characters. Seven residents run on desktop and four on touch devices, using the existing navigation, seating and car routines. The old primitive figures remain as a test/default factory for non-browser consumers, but the normal viewer does not silently show them on an asset failure; it gives a retry message.

The MIT-licensed library is pinned at commit `0943055db6ec570bcef9f2c8b41c9e5467c808f9`. Original downloads, source URLs, hashes and the licence are retained in `source/assets/people/`. Browser adaptations retain skin weights, UVs and body detail, rebuild materials from colour/normal maps, retarget the library's animation to each skeleton's proportions, and remove root travel so navigation remains authoritative. The child uses the source child mesh and corrected Bip02 naming. Skin and clothing are non-metallic; hair uses alpha testing. Moving materials use the existing house daylight probes and live shadows. The seated clip receives a smooth final return to its first pose; walk cadence follows navigation speed and leg proportions. Chair height offsets follow the actual figure's leg scale.

Six embedded GLBs total 17,015,876 bytes, approximately 88% smaller than the initial Blender exports. Face colour maps retain 2048 px resolution; clothing, normals and hair use 1024 px. Colour and normal maps are high-quality JPEG, while alpha maps retain PNG transparency. Assets load only after People is enabled, then reuse cached geometry/textures. Each resident owns an independent skeleton and mixer. Turning People off during a pending download cannot spawn late figures; repeated toggles release instance resources without destroying shared assets.

## Rebuild

1. Restore pinned downloads using the retained `download-assets.py` if needed.
2. Run Blender with `--background --python-exit-code 1 --python scripts/exports/prepare_people_assets.py`.
3. Run `.venv/bin/python scripts/exports/optimise_people_textures.py` once on the fresh exports.
4. Run `make build-web`.

Editable derivatives are in `outputs/output-people-assets/`. The browser files and MIT notice are in `walkthrough/public/people/`; the existing Settings → 3D model credits page includes their provenance.

## Review and validation

- Local walkthrough: `http://127.0.0.1:8765/?design=proposed` → Settings → People.
- Browser evidence: `walkthrough/test-results/realistic-residents-2026-11-09/`.
- Verified all six styles in idle/walk/run/seated poses and reviewed the normal model at full-body and face distance.
- Eight existing life/navigation checks, three focused asset/loop checks and seven browser checks pass.
- Measured skin bounds across sampled motion cycles confirm life-size heights and foot contact within roughly 20 mm during walking; running has a small airborne phase.
- Detailed textured real-time characters are a substantial improvement over the previous box/capsule people. These are not a claim of photographic equivalence at face-to-face distance; facial performance and skin subsurface rendering remain limited.

Native architecture, structural data and planning documents are unchanged. This update is local; no publication was performed. The preceding viewer sources are preserved under `before/`.
