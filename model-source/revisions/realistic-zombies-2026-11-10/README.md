# Detailed adult zombies — local review, 10 November 2026

After Hours now uses detailed adult Rocketbox human derivatives in place of the
procedural figures. The house and ordinary household residents are unchanged.
This work has been built and reviewed locally; it has not been published.

Four skinned assets provide decayed man/woman characters, a missing-left-arm
variant, and a prone crawler with both lower legs partly missing. Six appearance
slots mix these with shambler, runner, brute and flanker gameplay. The boss retains
its health/reward mechanics and uses a larger adult figure. These derivatives
do not use the previous child character.

Injured walking/running motion comes from the pinned Microsoft Rocketbox library.
The crawler has an authored prone clip with alternating arm pulls and trailing
stumps. Injury profiles change navigation speed as well as animation: crawler
base speed is 0.43 m/s; the limping profile is capped at 0.74 m/s before normal
wave/personality modifiers. Limb ends are closed skinned geometry. Attacks,
recoil, collapse and fading use the actual deformed meshes; missing limbs do
not retain invisible hit geometry. Loose hair cards were removed after close
inspection exposed black strips; the continuous textured scalp remains.

## Sources and editable assets

- Base models, textures and source motion: `source/assets/people/rocketbox/`,
  Microsoft Rocketbox commit `0943055db6ec570bcef9f2c8b41c9e5467c808f9`, MIT.
- Additional motion downloads and SHA-256 provenance:
  `source/assets/zombies/motion-sources.json`.
- Four generated decay albedos: `source/assets/zombies/textures/`.
- Exact texture prompt set: `source/assets/zombies/texture-prompts.json`.
  Generated with the **built-in image_gen** tool, using the original head/body
  UV atlases as edit targets. Original inputs remain in `texture-inputs/`.
- Editable injury/animation models: `outputs/output-zombie-assets/*.blend`.
- Browser assets and checksums: `walkthrough/public/zombies/assets.json`.
- Runtime: `walkthrough/src/realistic-zombies.js`; lazy loading is owned by
  `wave-game.js`, and `horde.js` accepts appearance/figure factories.

Rebuild with Blender running `scripts/exports/prepare_zombie_assets.py`, then
`.venv/bin/python scripts/exports/optimise_people_textures.py --directory walkthrough/public/zombies`.
Optimise only fresh exports. Both scripts support `--only crawler` (the Blender
script uses `-- --only=crawler`) for a single derivative. Then run `make build-web`.
`prepare_people_assets.py` now has a main guard so its shared retarget helpers can
be imported without rebuilding the ordinary people.

## Verification

- 31 existing horde, combat, Easter-session and procedural animation tests passed.
- Two new asset/injury checks passed: complete skin/UV data, hashes, source
  notice, closed stump records and injury-dependent speed/radius.
- Browser motion checks measured every actual skinned vertex for 24 poses in
  each of five states, across all four figures. Floor penetration/float limits,
  crawler height, alternating arm reach and collapse passed.
- Browser gameplay checks covered lazy loading, bow pickup, entering the house,
  detailed wave spawns, actual headshot/damage/reward behaviour for both upright
  amputee and crawler, and cached reset/restart. See browser-checks.json below.
- Screenshots reviewed at face distance, in the house, during attacks, crawling
  and collapse. Animated review also opened and inspected in native Safari.
- `make build-web` completed. Workspace layout audit remains identical to the
  pre-existing 345 findings; it has not been relabelled as passing.

Evidence: `walkthrough/test-results/realistic-zombies-2026-11-10/`.
The animated review is at
`http://127.0.0.1:8892/test-results/realistic-zombies-2026-11-10/studio.html` while
the local QA server is running. Controls show locomotion, attacks and collapse.
The actual updated game is in the normal local model at port 8765; collect the
bow in the garden shed, then enter the house.

Performance samples are local headless-browser observations, not a claim about
physical mobile hardware. Contact correction uses the local navigation surface;
it is not a full physics ragdoll or per-limb stair IK solver.
