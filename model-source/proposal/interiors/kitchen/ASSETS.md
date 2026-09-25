# Room assets and provenance

The ten concepts in each of the two current designs and the three surface textures were generated with built-in `image_gen`. The exact prompts are in `walkthrough/public/interiors/kitchen/prompts.json` and `texture-prompts.json`. The initial reference captures and their camera/model timestamps are preserved separately from the fitted model renders.

The editable source snapshot contains all three texture PNGs. To restore the concept images, source captures and isolated preview assets from the published repository without duplicating them in Git, run this from `model-source`:

```sh
python3 scripts/restore_interior_assets.py --published ../model
```

The command resolves the immutable files using `model/release.json` and verifies every SHA-256 before copying. Authored `studio.js` and the source of the room bundle remain in the source snapshot; generated bundles are not restored over them. The large native house baseline is still required to regenerate the full designs, as described in the source snapshot README.

`scripts/preview_kitchen_interiors.py` opens a completed house read-only, fits the room from its current source and exports only the review room. `--native-current` exports the completed fitted house exactly. Neither mode saves or replaces the native house. Final native publication uses the normal verified pipeline.

Concept images guide appearance; actual wall/window geometry and clear circulation govern furniture placement. The adjacent formal lounge and formal dining bay are separate room sessions. Browser lighting and the native Cycles renderer are different rendering systems, so neither is claimed to reproduce the generated reference pixel for pixel.
