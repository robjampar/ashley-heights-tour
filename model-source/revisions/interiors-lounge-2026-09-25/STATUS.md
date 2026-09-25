# Quiet oak revision 2

Owner requested a TV space around the corner, more plants and detail, then closer matching to the colours and design of AI reference 01.

Refinements: desaturated pale oak; warmer beige limestone flooring separated from lighter worktops; softer ivory linen at a finer weave scale; warmer open-bottom opal globes and correctly proportioned ribbed pendant; squat stoneware vases; curved olive leaves with irregular branching.

Side garden living: cream three-seat sofa with welt seams, scatter cushions, draped linen and tassels; low stone coffee table, stone/bronze side table, books with covers/leaves, cup and coaster; slim wall-mounted TV, mount/vents/status LED, floating four-drawer oak media console with recessed light, soundbar grille/touch keys, remote/navigation ring/buttons. Two large olive planters have hollow rims, soil, pebbles and native trunks/leaves. The kitchen also gains a small potted herb and finer cornice.

The TV fits beyond the retained west window. The cellar stair and all structural openings remain unchanged. Added review cameras cover the TV lounge and planting; camera state is linkable and preserved across design switches. The isolated export now includes the west window frames beyond the room's inner wall face.

Both saved models rebuilt in 409 seconds, followed by 12 seconds for the viewer. Revision 2 contains 1,028 native interior meshes in Proposed and 919 in Planning, with 19/14 collision items. Leaves are aggregated by spray for efficient rendering rather than exported as hundreds of separate leaf objects.

Verification completed:
- Original source preservation passed in both. 13,861 retained Proposed meshes and 13,155 retained Planning meshes are unchanged, with zero vertex difference. Nineteen visible detail checks pass; the TV and console clear the west window; no unintended furniture overlaps.
- 144 Proposed and 108 Planning route checks pass. All 33/31 room-access checks pass. A separate 500 mm body reaches all 12/9 room targets, including both sides of the TV furniture, the route behind the sofa, the west door and cellar landing.
- 115 viewer unit tests and 33 pipeline/finish/loft tests pass.
- Both full browser models load five textured material finishes with valid UVs and separate height bumps; 46 oven controls and both open sink recesses remain correct.

The isolated models pass six camera views in both variants, URL reload retaining the lounge view, correct reference links, concept/native image loading and mobile layout. The exports are 19.6 MB (Proposed) and 18.0 MB (Planning), with decoded mesh buffers verified byte-for-byte during packing. The retained-window crop is corrected.

Existing owner fixes remain verified: 28 planning kitchen-opening material probes, 20 loft-wall probes and 88 exterior-finish face probes pass in the rebuilt browser models.

Publication uses immutable room/model assets and the existing Pages pipeline. Native geometry and the selected AI reference are shown separately; lighting differs between Cycles and the interactive renderer, so this is not claimed to be pixel-identical.


Close-up correction: fine stems and leaves now attach to the actual bent tube centrelines, rather than straight interpolations between their endpoints. An independent exported-mesh audit reconstructs each tube centreline from cap-ring centroids and checks all roots. It caught the earlier approximately 30 mm gaps and now passes 252 branch / 2,460 leaf joins in Proposed and 219 branch / 2,130 leaf joins in Planning; maximum numerical gap is below 0.001 mm. The correction leaves all tested navigation obstacles, segments, walls, surfaces, door definitions and room polygons byte-for-value unchanged.


Final packaged-site checks: both current full models and both isolated models pass on the staged Pages site, including all six detail cameras, mobile layout, reference/design links, retained camera URLs, five textured finishes, oven controls and sink recesses. All 149 current immutable assets and the room HTML match their release-manifest SHA-256 hashes. No browser errors.
