# Masonry garden workshop — 26 October 2026

The owner requested further development of the detached garden workshop, below 30 m² and 2.5 m high, then selected substantially non-combustible construction and confirmed brick was suitable. This revises the Compact/Proposed workshop at the west end of the rear strip. The Planning native model remains unchanged.

## Design

- Retained external footprint: 6.45 × 4.359 m, approximately 28.12 m².
- Brick walls thicken inward to 215 mm, leaving approximately 6.02 × 3.929 m / 23.65 m² internally.
- Roof highest point: Z1.8711 m; floor: Z−0.4594 m; ceiling clear height: 2.15 m.
- Overall height: 2.4505 m above the existing modelled adjacent finished ground; approximately 2.4117 m above the highest original adjacent LIDAR ground. No ground level was raised by this revision.
- Roof/gutter clearances to reconstructed fences: north 0.538 m, south 0.586 m, west 1.494 m. These are geometric study measurements, not surveyed legal boundary distances. The west hedge remains closer than the fence.
- Matching red-brown brick is fixed independently of the main house's optional render finish. Concrete slab, masonry walls, steel roof support/deck, mineral-wool roof insulation, mineral ceiling lining, limited waterproof roof covering and metal trims form the proposed construction approach.
- The roof has a shallow 1:80 fall toward a north gutter. Steel supports are architectural allowances, not engineered member sizes.
- The steel-faced door and metal surround move to the inside reveal so the thicker wall does not obstruct the swing. Complete jambs, head, stops, threshold and hinge knuckles are modelled. The historic door's incorrect Z0 hinge is corrected.
- The 5.4 m oak workbench, mobile table, vice, tools and sliding storage are retained and fitted to the thicker walls. Timber furniture is separate from the building fabric.
- The original landscape remains. Browser foliage clipping now includes the garden workshop and has capacity for all current enclosed rooms, preventing leaves appearing inside.

## Regulatory basis

For a detached, single-storey building of 15–30 m² without sleeping accommodation, substantially non-combustible construction is an alternative to the 1 m boundary separation for the usual Building Regulations exemption. Brick cladding alone on combustible construction would not establish this: the complete assembly matters. [Planning Portal](https://www.planningportal.co.uk/permission/common-projects/outbuildings/is-building-regulations-approval-needed-for-an-outbuilding/)

The separate Class E permitted-development height limit is 2.5 m when any part is within 2 m of a boundary. Other planning conditions still apply. This study is not a determination of planning status; verify surveyed ground/boundaries and the complete construction specification before building. The source LIDAR itself records approximately 150 mm vertical uncertainty. [Government technical guidance](https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance/permitted-development-rights-for-householders-technical-guidance)

## Implementation and evidence

Canonical pass: `scripts/model/proposal_garden_workshop_envelope.py`; specification: `proposal/specs/garden-workshop-envelope.json`. It runs after the continuous wing roof and is omitted from Planning. The candidate is `outputs/output-garden-workshop-envelope-compact/`. The installed model records a targeted `garden-workshop-envelope-refresh.json`; historical full-build reports are not rewritten.

`original/` retains the immediate pre-revision model and source recovery. `review-before-finish/` preserves the first installed review, before screenshot inspection caught the house appearance selector overriding the brick and a roof material name being treated as water. Earlier screenshots are retained in `walkthrough/test-results/garden-workshop-envelope-2026-10-26/before-brick-finish/`.

Current validation and final screenshots are in `walkthrough/test-results/garden-workshop-envelope-2026-10-26/`. `final-validation.json` records the completed checks. Native preservation compares all seven original scenes and unrelated proposal objects. Export checks measure the actual GLB and sample the entry, bench, cupboard and assembly-table routes. Local installation and review do not publish the model.

Completed: 114 Python checks and 279 viewer tests pass; 269 exported route samples pass, with at least 2.031 m head clearance on the checked routes. All seven original scenes and 15,949 unrelated proposal objects are preserved. Seven final Chrome screenshots were visually inspected, including the open and closed workshop door; no browser errors, warnings or failed requests occurred. The 192-sample lighting audit and HTTP served-file verification pass. The 345 pre-existing workspace-layout findings match the baseline exactly. Final roof cappings are offset 2 mm from the insulated core to prevent coincident surfaces; their native and GLB transforms are coordinated without changing binary mesh/image bytes.
