# M10 — gallery notch, concrete entrance link and receiver corrections

26 October 2026. Local structural coordination model; no construction approval or publication.

## Loft notch

The owner confirmed **“Close the small notch only.”** The larger loft-level entrance void south of Y−5.3 and the relocated original-house stair aperture remain.

The former 1.735 m² notch between X5.615–7.35 and Y−5.3–−4.3 is filled in the structural floor. **M-FR-3-023 and M-FR-3-024 are retired**, along with the old aligned-cantilever premise. **M-FR-3-025** extends back to the main transfer M-FR-3-010. The three adjacent gallery joists now extend to it, with linked hangers; their modelled lengths are approximately 4.668 m and remain uncalculated. The eaves receiver's modelled cut length is 5.0375 m.

A detached 0.18658125 m² low-eaves floor-margin fragment and its four tiny perimeter receivers are removed from the structural framing. It lay outside the continuous gallery bearing line and did not form a useful separate joisted bay. The new gallery plate has a clean perimeter. No new habitable headroom is inferred beneath the roof.

The changed floor and member geometry is present in the structural viewer, plans and quantities. The native architectural model and its GLB are unchanged; this is not a full architectural/native rebuild.

**Remaining junction:** extending 025 exposes three roof-rafter intersections, with M-RF12-028/029/030 (13.77, 20.66 and 20.66 cm³). The new `GALLERY-ROOF-SEATS` issue links to them. A coordinated wall plate/seat, restraint and level detail is required; no rafter notch or section reduction has been invented to erase the overlap. [NHBC Chapter 7.2](https://nhbc-standards.co.uk/downloads/2025/NHBC-Standards-2025-Chapter-7-2.pdf) describes designed roof joints and wall-plate support, but does not validate this steel/roof junction. The existing long-girder failed screens and other unresolved load paths remain.

## Concrete entrance link

The owner requested concrete instead of the joisted area between former **M-FR-0-018** and **M-FR-0-017**. That bay now contains **M-RC-GROUND-GALLERY — Entrance link · concrete slab in place of joisted floor**.

- Footprint: 15.790625 m², within the existing entrance-link area.
- Concrete allowance: 250 mm thick, Z−0.35 to −0.10; 3.94766 m³.
- Floor-build-up allowance: 78 mm plus 22 mm finish, reaching FFL0. These are coordination allowances, not selected products.
- A 10 mm joint envelope separates it from the adjacent basement concrete.
- Nine joists, their 18 hangers and four perimeter timber receivers are removed. The former under-joist service/ceiling layers and timber deck are removed from this bay. The concrete appears in Concrete isolation and the concrete quantity allowance.

The area is outside the modelled basement. Ground bearing is a working assumption only: the ground/backfill condition, settlement beside the basement, possible suspended alternative, reinforcement, foundations, insulation, membranes and waterproofing require design. It must not be treated as a verified slab bridging unsupported fill. The displayed thickness is not calculated.

## First-floor masonry clashes

**M-FR-1-028 and M-FR-1-032** had followed the old X5.16 floor boundary through the inner block leaf. They move to X5.3275, giving a west timber face at the room-side masonry face X5.2825. Their adjoining entrance trims and linked joist ends follow.

028 stops clear of the north masonry return. The northern edge joist and its whole hanger move 40 mm south to Y−4.44; local spacing is reduced. 032 stops at Y−9.785, 5 mm clear of the gable transfer steel end. Floor-layer limits now honour minimum coordinates as well as maximum coordinates, stopping at the actual inner wall faces.

Closed-solid checks find no masonry overlap for either named receiver, their linked joists or hangers. Neither receiver has a remaining overlap in the wider steel/masonry audit. This does not verify ledger anchors, interrupted wall bearings, end fixings or section capacity. The timber does not become support for the masonry.

## M-RE15-011

This was an automatically generated roof-perimeter trimmer with a **16.531 mm** centreline, smaller than its own 90 mm timber width. The adjoining **M-RE15-012** was only **20.891 mm** long. They were isolated roof-panel mapping residues, not meaningful members.

Both are removed from the geometry and quantities. The generator now rejects roof-edge residues shorter than their own assigned section width after consolidation/numbering, recording the retired IDs, axes and source references in `roofEdgeAudit.subsectionFragments`. Other member references, actual roof skins and roof openings are unchanged. These fragments belonged to roof option B.

## Validation and recovery

67 structural Python tests and 29 structural viewer tests pass. Six Chrome integration checks pass with no browser errors or failed requests. Seven actual-model screenshots were reviewed, including the retained entrance opening, concrete slab, both first-floor junctions, removed roof residues and the unresolved roof-seat intersections.

The final issue contains 2,610 members/assemblies, 282 joists, 75 receivers and 45 open coordination issues. There are zero unmapped joist ends. The 557 linked hanger assemblies have zero measured overlaps or seat errors across 2,193 scoped solid-pair checks. The wider audit has 141 intersections: three new explicitly exposed rafter/eaves-seat pairs and one removed 032/gable-steel pair relative to M09's 139. Other open clashes remain. Masonry piece counts are unchanged.

The workspace-layout check equals the prior 345-finding baseline. Native geometry/navigation hashes are unchanged. Structural source fingerprints pass. Recovery copies are in `original/`; browser evidence and `final-validation.json` are under `walkthrough/test-results/structural-gallery-slabs-2026-10-26/`. Logs use the same revision prefix. Rebuild with `make build-structure`, run the structural tests and `make check-layout`, then `node revisions/structural-gallery-slabs-2026-10-26/browser-review.mjs`. No staging, publishing or native architectural rebuild was performed.
