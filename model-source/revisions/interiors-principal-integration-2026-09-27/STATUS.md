# Accepted interiors in the complete proposals

The owner requested publication of the finished principal suite and the prior
kitchen/lounge into both complete house models. Proposed (`compact`) and Proposed
Planning (`planning`) now include bedroom revision 3, bathroom/wardrobe revision 2
and Quiet oak kitchen/lounge revision 2.

The suite includes the curved equal-arm L desk, fixed bed and sofa TVs, shifted
wardrobe, enlarged bathroom, two moved east windows and the new window behind the
bath. Four room-menu entries open the bedroom, desk, wardrobe and bathroom.
Three automatic doors connect the suite to the full house. Bathroom and wardrobe
mirrors use the existing room-preview reflection method. Coplanar basin mirrors
share one reflection across two separate panels, with at most one nearby visible
mirror group rendering the full house per frame.

## Native and movement verification

- All 903 accepted suite meshes match the saved full model exactly in each
  variant: zero vertex difference and identical face topology.
- All 25 bed/sofa/desk TV rays and 9 bathroom privacy rays pass in each full house.
- All 1,028 kitchen/lounge meshes in Proposed and 919 in Planning preserve their
  geometry and materials. All other non-suite meshes retain their geometry;
  original reconstruction checks pass.
- A 500 mm body connects from the landing to both bed sides, the desk, sofa,
  wardrobe, bath, vanity, shower and WC. All four suite viewpoints are clear.
- Existing whole-house circulation, room access and kitchen/lounge circulation
  checks pass in both variants.

## Browser verification

The staged release passes the full-suite desktop and 390 px mobile review: four
room viewpoints, three automatic doors with restored open/closed poses, TV
views, three mirror panels in two groups and no JavaScript or asset errors.
Both fitted kitchens retain 46 oven control meshes, five textured finishes and
open sink basins. All 88 exterior face/finish probes, 28 kitchen opening probes
and 20 loft bedroom wall probes pass. Bedroom, desk, bathroom, wardrobe and
lounge captures were visually inspected.

Existing-house and all seven alternative model/navigation assets remain
byte-identical to the previous public release.

Machine-readable results are alongside this file and in the variant folders.
The pre-integration complete native models, geometry and navigation are preserved
in `compact-before/` and `planning-before/`. The accepted suite assets have a
separate manifest under `proposal/interiors/principal/accepted/`; builds verify
their hashes and every imported part's placement before export.

This publication updates the editable native houses and browser tour. It does
not regenerate the separate drawing/PDF packs.
