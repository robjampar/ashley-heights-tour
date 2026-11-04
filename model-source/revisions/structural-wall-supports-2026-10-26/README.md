# M09 — independent wall bearings and continuous original-loft framing

26 October 2026. Local structural coordination study. No construction approval or publication.

## Ground-floor wall interface

The timber receiver network followed the outside architectural floor outline. In particular **M-FR-0-001** ran under the outside brick line, while the 230 mm basement concrete envelope stopped at Z−0.22 and did not reach beneath the new 352.5 mm cavity-wall assembly. This was not a valid model of independent masonry bearing.

The six basement perimeter wall envelopes now form one connected ring, reaching from Z−2.8 to Z0. Their **352.5 mm width is a coordination envelope matching the cavity-wall assembly, not a calculated RC thickness**. They meet without duplicated corner volume. The courtyard return follows the actual brick/block faces, and the slab envelope extends beneath it. The RC wall quantity is 42.68182 m³; reinforcing steel, formwork, joints and waterproofing remain excluded. Closed-solid winding is normalised before measuring the concrete, avoiding an extrusion-cap orientation error in signed volume.

The ground-floor timber receivers move to the room side of that concrete. **M-FR-0-001** is now at Y−15.9085, with its outer face touching the concrete inner face Y−15.9535. Its role is a floor-only ledger; it is not a masonry transfer. Joists, hangers, the courtyard-side gallery edge and floor-layer limits follow the revised faces. The basement stair aperture remains. Edge joists have locally reduced spacing to clear parallel ledgers without cutting their flanges.

Both south-wall leaves at **M-BRICK-8D5FD18 / M-BLOCK-8D5FD18**, and the adjacent sill leaves, have complete modelled base contact with **M-RC-FC244DE** and no timber projected beneath their footprint. The inspector links directly to the concrete and can isolate the wall and its bearing together. No timber intersects the six revised concrete wall bodies in the scoped check.

This changes the structural study only. The architectural basement lining/room model has not been rebuilt to the wider concrete envelope. Its internal dimensions, insulation, drainage/waterproofing, thermal and moisture separation, reinforcement, wall/slab/soil capacity and ledger anchors require coordination and design. The long ground-floor girder, its end connections and basement transfer remain unverified.

## Original-house loft direction

A 24.6209 m² patch of gallery finish geometry extended into the original house. Its priority in the framing generator gave that patch east–west 235 mm joists, while the rest of the house used north–south 300 mm joists. The new ownership boundary is the original façade at **Y−0.115**.

The original-house replacement field is now consistently north–south and 300 mm deep. The gallery outside the house retains its direction and the accepted courtyard cantilever. False internal receiver seams are retired; the real stair opening and identifiable existing joist references are retained. The combined deck loses no area. Unioning the zones also recovers a 0.14945 m² triangular display omission beside the stair, entirely within the actual source floor.

Existing solid-wall candidates and their mismatched head levels remain visible. The continuous joist objects do not imply an unsupported 8.72 m clear span or an approved member: each inspector still lists actual intermediate wall contacts and unverified clear runs. Replacement remains enabled by default.

## M-FR-3-024

No joist ends or masonry load directly into this crosspiece. It is now a **90 × 235 mm timber floor-edge reservation**, aligned to the gallery depth, with its ends clear of the steel faces. Its reference is preserved. It does not support **M-FR-3-023**. Removing this unnecessary steel also removes its previous deep-steel conflict with the non-bearing partition head.

The short 023 return still requires a designed moment-transfer connection into 010, including torsion/stiffening, restraint and the aligned 009 backspan. This revision does **not** resolve or certify that connection. The long loft girder/transfer screens remain failed. The three gallery steel ends at the original-house boundary stop clear of the new continuous front receiver; no timber bearing for those steels is inferred.

## Wider masonry audit and remaining work

A new audit samples **130** horizontal masonry bases at the ground/first-floor bands. It reports geometric contact with masonry, concrete and beam/lintel envelopes separately from timber projected below the wall. **48 leaves lack complete contact within this limited model**. This includes foundations/returns outside the basement envelope and other incomplete transfer locations; it is not a whole-building capacity assessment. Retained/hidden support, sloping bases and downstream foundations are outside its scope.

In particular, the internal garage/store walls **M-BLOCK-4D5245A**, **M-BLOCK-A2CE383** and **M-BLOCK-73B5665** still require dedicated support/transfer design. Their inspectors explicitly reject the floor timbers beneath them as an approved wall support. No column has been inserted into a basement room, and no arbitrary beam is marked adequate to conceal these unresolved paths.

This is consistent with the need for designed joist support and coordinated basement structure/waterproofing described in [NHBC Chapter 6.4](https://nhbc-standards.co.uk/downloads/NHBC-Standards-2024-6.pdf) and [Chapter 5.4](https://nhbcprod.blob.core.windows.net/shared/CC2981-NHBC-Standards-2024-aw-digital-version-lr-151223.pdf). Those references do not validate the model's sections or foundations.

## Validation and recovery

- 62 structural Python tests and 29 structural viewer tests pass.
- Six final Chrome integration checks, no browser errors or failed requests. Six actual-model screenshots reviewed.
- 2,654 member/assembly references; 293 joists, including 121 loft joists; 85 receivers; 44 open coordination issues; 25,219 masonry pieces unchanged.
- Zero unmapped joist ends. 579 linked hanger assemblies, 2,247 checked solid pairs, zero linked intersections or seat-level errors.
- Global scoped intersections fall from 143 to 139, with no new intersection pair. Existing unresolved clashes are retained.
- Revised concrete walls: zero timber intersections and no duplicated concrete corner volume.
- Workspace layout check matches the exact 345-finding pre-existing baseline.
- Architectural geometry/navigation hashes remain unchanged. Source fingerprints pass the structural build.

Recovery copies are in `original/`. Reproduce with `make build-structure`, the structural Python/web tests, `make check-layout`, and `node revisions/structural-wall-supports-2026-10-26/browser-review.mjs`. Evidence is under `walkthrough/test-results/structural-wall-supports-2026-10-26/`; corresponding logs are under `logs/`. `networkx==3.6.1` is now declared alongside the closed-solid audit dependency for Trimesh winding repair. Nothing was published.
