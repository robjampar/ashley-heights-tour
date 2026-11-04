# Landing oak and front knee wall — 20 October 2026

The owner reported that `Landings 01 | continuous oak landing floor.009` was not oak and that the browser mesh `Proposal_|_Original_loft_front_knee_wall_2003` extended too far. The latter is the exported mesh of native object `Proposal | Original loft front knee wall 2`.

The landing had an empty material slot, despite retaining its oak UV coordinates. Twelve surfaces in each proposal had lost their materials in the loft surface-cut fallback: the landing strip, six hobby-room oak floors/decks and five ceiling panels. Their material names were recovered from the existing geometry records. The planning knee wall had the same problem. The repairs restore the existing oak and ivory/plaster materials without replacing their textures, changing UV scale, or moving these surfaces.

`proposal_level_loft.py` now keeps persistent source material IDs when rebuilding a cut mesh instead of retaining temporary evaluated material references. `proposal_landing_oak_knee_wall.py` repairs the current delivered models and fits the knee wall's eastern end to x=6.200611591 m, the existing sloping-roof/top-of-wall junction. This removes approximately 1.099 m from its former x=7.30 m end. The cut end is closed and plastered. The retained western wall, roof and glazing remain unchanged.

An initial native review tried terminating at the reclaimed floor edge (x=5.50 m); that exposed an unnecessary recess under the slope. The final termination follows the actual roof junction instead. The iteration images are retained as review evidence and are not the delivered result.

## Delivery and recovery

This is a targeted native repair with complete GLB re-exports, refreshed visual derivatives and directional daylight, and a local web build. It is not a full architectural rebuild, publication, or rewrite of historical build claims. Current source records use `landing-oak-knee-wall-refresh.json` beside each proposal.

`original/` and `recovery-manifest.json` preserve both current native proposals, base/visual assets, metadata and edited implementation files before the change. Preparation, export, native checks, rendering and installation scripts are retained here. Prepared outputs are in `outputs/output-landing-oak-{compact,planning}/`.

## Review

[Native before/after gallery](../../walkthrough/test-results/landing-oak-knee-wall-2026-10-20/native-review/index.html).

Native renders use neutral inspection lighting, not the live viewer's lighting. Computer-use initially had no available connection. The final retry found native Chrome, but its controls timed out twice and no browser surface was connected; no live browser screenshots were taken. Native material checks compare exact mesh topology, transforms and UV hashes for all twelve restored surfaces. Export checks verify textured oak, retained plaster, the shortened wall and its closed end.

## Final checks

- All 220 web tests pass. The existing 106 Python checks and the new surface-bounds regression check pass.
- Both visual-asset audits pass with 192-sample daylight and matching native, base GLB, navigation and furnishing hashes.
- The twelve repaired surfaces per variant retain exact geometry, transform and UV hashes. Original native scenes are unchanged. The only changed geometry record is the shortened knee wall: 18,042 Compact and 16,214 Planning records remain unchanged.
- The layout checker retains its 345 pre-existing findings, with no additions.

The final audit also exposed four zero-area triangles left by an old cut in `Hobby 01 | landing oak floor`. These extended the source accessor bounds across the removed opening; the detailed floor correctly omitted them. Surface-bound checks now use non-degenerate triangles for jointed floors, with a regression test proving real extensions are still measured. No visible floor area was removed.

The bar circulation test now checks the previously accepted basement floor/panelling retirements against the explicit source-revision removal inventory. The accepted bar geometry and circulation are unchanged by this correction. Earlier failed audit/test logs are retained; the `*-final.log` files record the passing checks.
