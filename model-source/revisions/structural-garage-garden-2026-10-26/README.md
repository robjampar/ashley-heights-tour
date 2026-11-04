# M11 — garage rebuild and garden-room structure, 26 October 2026

Local structural coordination only. No native architecture, published site,
construction drawings, foundation approval or fabrication schedule changed.
The `original/` folder preserves M10 inputs, UI and generated evidence.

## Scope

- Original-garage rebuilding is on by default in 3D, drawings, junctions,
  member quantities and CSV/cost exports. It remains switchable for comparison.
- Garage footing strips now align with both cavity-wall leaves. Separate
  foundation walls reach the masonry base at model Z0. Intersecting strip
  corners are counted once. Existing house-side foundations are unsurveyed.
- Garden west return and narrowed former kitchen-window masonry infill are
  restored to the structural registry. The infill uses a 215 mm solid core
  within the existing 230 mm wall envelope, with a 15 mm finish allowance.
- Garden-room poured slab, perimeter substructure and house-side post pedestal
  follow the accepted 500 mm inset / 2 m chamfer. The slab is isolated from
  the foundation walls; masonry and posts do not bear on this ground slab.
- Four terrace steel receiver reservations, six hollow posts, solid-timber
  joists and three trimmed rooflight openings replace the previous unsupported
  roof-outline framing. The source roof apertures and other roof IDs remain.
  True steel mitres and trimmed fascia junctions avoid overlapping solids.
- Slab/finish/build-up/sub-base and roof deck envelopes are selectable through
  Floor build-ups. Member costs include net concrete, steel and timber
  allowances. Construction layers and unspecified connections remain unpriced.
- `M-FR-3-OPT-011` is renamed as a doubled timber perimeter closure. No joist
  ends frame into it; its solid profile is different from adjacent JJI joists.
  It is not a verified long-span girder. No geometry or capacity change is
  implied by the clearer name.
- Original-house hip steel proposals 02/03/04 remain removed. 01 is the
  separate west-extension support reservation, with no retained wall below.

## Model dimensions and open decisions

The garden floor slab is a **200 mm reference allowance**, top Z−0.15 m,
underside Z−0.35 m, approximately **40.17 m² / 8.034 m³**. The gross accepted
room footprint is 44.102 m²; slab area excludes the independent perimeter
substructure, pedestal, house interface and 10 mm isolation allowance.

Garage and garden footing strips reserve 600 mm width and 300 mm depth,
underside Z−1.20 m. Foundation walls reserve 352.5 mm width and 900 mm height
from footing top Z−0.90 m to wall base Z0. The inspector distinguishes wall
height from slab thickness. These buried walls are fully exposed in the
structural view, which can make the assembly look like a very thick slab.

The owner's subsequent concern that the concrete looks too large is being
clarified: thickness/depth versus projection beyond the walls. No member was
shrunk merely to improve appearance. These dimensions remain provisional,
including the concrete stem-wall construction itself. Masonry substructure or
another foundation system may be preferable after design; no pour is authorised.

The 1.0/1.2/2.0 m depth sensitivity is measured from model FFL, **not surveyed
ground**. It is neither a site minimum nor an upper bound on required depth.
Soil, trees, drains, settlement, existing foundations and loads can require a
different system or much deeper founding. The retained-garage comparison needs
a separately verified foundation junction.

The terrace uses UB 203×133×30 and nominal 80×80×5 hollow-post **space
reservations**, not calculated section selections. The post mass allowance
uses nominal sharp-corner geometry, not a purchased section's certified mass.
Roof joists are 45×220 reservations with doubled rooflight side members and
headers. Steel joints, timber hangers/bolted infill, bracing, post bases,
corrosion/fire protection, roof-edge support and capacities remain undesigned.

The **225 mm architectural roof band does not accommodate a complete terrace
build-up**. Falls, insulation, vapour control, waterproofing, paving, guarding
connections and ceiling levels must be coordinated separately. The current
members cannot be treated as construction-ready just because their solids fit.

Reference guidance reviewed: [NHBC chapter 7.1, terraces and flat roofs](https://nhbc-standards.co.uk/downloads/NHBC-Standards-2024-7.pdf)
for terrace loads, deflection and weathering; [NHBC chapter 5.1, substructure and
ground-bearing floors](https://nhbc-standards.co.uk/downloads/NHBC-Standards-2024-5.pdf)
for ground-floor/substructure coordination. These sources do not validate this
site or select its members. [Forterra's foundation-block data](https://www.forterra.co.uk/wp-content/uploads/2021/02/Thermalite_Hi-Strength_Trenchblock_datasheet.pdf)
was reviewed as an alternative construction route; no product is selected.

## Reproduction and evidence

```sh
make build-structure
.venv/bin/python -m unittest discover -s tests -p 'test_structural*.py'
node --test walkthrough/tests/structure-*.test.mjs
node revisions/structural-garage-garden-2026-10-26/browser-review.mjs
make check-layout
```

Browser captures and validation belong in
`walkthrough/test-results/structural-garage-garden-2026-10-26/`; command logs use
`logs/structural-garage-garden-2026-10-26-*`. The first browser review completed
all seven visual/scope checks and loaded the architectural overlay, but recorded
one `ERR_ABORTED` GLB event. Final validation is recorded separately.

The user's open Chrome tab was directly inspected and was showing M07. A later
observation confirmed they had loaded M11. No duplicate 02/03 hip steels exist
in current public/dist member data; the older in-memory page explained them.

## Final validation

- 72 structural Python tests and 30 structural viewer tests pass.
- Seven final Chrome checks pass with no page errors or failed requests; six screenshots reviewed. The final run resolves the earlier transient GLB abort.
- 2,625 member/assembly references, 26,339 masonry pieces and 47 open coordination issues.
- 141 wider audited intersections remain, with no new intersection pair versus M10. The scoped 557-hanger connection check has zero overlap or seat-height errors.
- Garage wall-base coverage, slab/stem isolation, concrete-volume reconciliation, post bearings, three rooflight voids and all new frame solid intersections have targeted regression checks. These establish geometric fit only.
- Source fingerprints match, native geometry/navigation hashes remain unchanged, and layout findings exactly match the existing 345-item baseline.
- `final-validation.json` records the remaining concrete-size clarification and the explicit unverified engineering basis. No publication.
