# M07 — masonry floor junctions and independent cutaways

26 October 2026. Local structural coordination issue. No native architectural rebuild or publication.

## Corrected geometry

The named **M-BLOCK-BDBECC2 — North upper facade east end pier** previously began at Z2.8, above a lower wall ending at Z2.6. Its inner leaf overshot the perpendicular block leaf, and a 371 mm section of the east-side upper corner was missing. Floor receivers followed the thin architectural wall envelope rather than the room face of the proposed cavity-wall blockwork.

The missing corner now has separate brick and block leaves. The upper north block return ends at X13.7275, meeting the perpendicular inner leaf. Both leaves join around the corner without duplicate solid volume, while the adjacent window and cavity remain open. The named pier now continues down to Z2.6 onto M-BLOCK-DC23D41. Its inspector links to that lower wall.

The same floor-band correction applies to **28 north/east upper wall leaves**. The new 200 mm band is generated only where an upper leaf's base coincides with the corresponding lower masonry/head. All 28 corrected bases have zero unmatched area in this geometric check. This does not verify the capacity of the lower walls, heads/lintels, bearings or foundations.

Nine first-floor receiver axes move with the three affected joist zones. East room-side ledgers centre at X13.5825; the north ledger centres at Y−3.4265. Joists and hangers follow the new receiving faces, and floor sheets stop at the masonry room face. Existing member identities are preserved. The ledgers are proposals for supporting the **floor**, not the masonry above; their anchors, bearing, restraint, movement and fire/moisture details require design.

A further inner-leaf return, M-BLOCK-36EE5E4, is aligned to the lower blockwork at X9.8375. Brick/block areas, units and partial costs are regenerated from the corrected solids. Rendered mortar backing is recessed behind every face, including return faces and course steps, removing the flickering that the former thickness-only recess produced at corners. This display backing adds no priced masonry.

## Model controls

- Architectural overlay has clear outlines and adjustable surface visibility, defaulting to 14%.
- **Architecture cutaway height** controls the GLB overlay, architectural envelopes and retained context.
- **Structure cutaway height** controls detailed structural members and trial axes independently.
- Both controls disable in drawing views. Focusing a structural member preserves the architecture cutoff.
- A pre-existing batching fault is corrected: Three.js material copies clone clipping planes, so grouped members previously stopped following slider changes. Batch materials now share the live plane, including after selection/filter/view refreshes.

## Verification and limits

53 structural Python checks and 28 structural viewer checks pass. Browser review exercises the two cutaways in both directions, overlay toggling/visibility, focus, view changes, live batched-material planes, lower-wall inspector links and mobile controls. Nine captures are recorded under the matching `walkthrough/test-results/` directory; `final-validation.json` records the completed review.

Current issue: **2,722 members/assemblies**, **25,219 masonry pieces**, **42 open items**. No measured wall/joist or wall/timber-receiver intersections remain at the corrected first-floor interfaces. The separate linked-connection audit checks 615 assemblies and 2,364 solid pairs, with no measured overlap or seat-level error. These are scoped geometric checks, not connection-capacity verification.

The wider solid audit retains **147 intersections across all options**, compared with 146 in M06. Restoring the omitted floor band exposes a **131.09 cm³** overlap between **M-FR-1-035** and **M-BRICK-36EE5E4** at another return. This remains visible in Junctions; no arbitrary steel cut or hidden masonry pocket has been used to claim a resolution. M06's failed long-loft-girder/transfer screens and other unresolved load paths remain explicitly unapproved.

`make check-layout` returns the identical 345 pre-existing findings. Architectural geometry/navigation hashes are unchanged. Source-fingerprint verification passes during the structural build. The main walkthrough and published release are unchanged.

Reference basis: the existing [NHBC Part 6 guidance](https://nhbc-standards.co.uk/downloads/2025/NHBC-Standards-2025-Part-6.pdf) informs wall/floor interface coordination. This issue does not select an engineered hanger/anchor detail or approve masonry carried by timber.

## Recovery and reproduction

`original/` contains prior sources, specifications, generated data and the bundled viewer. Four previously omitted M06 text sources (`structure-members.js`, `structure-geometry.js`, `structure-junctions.js`, and the member viewer test) were reconstructed by reversing the recorded M07-only text edits; other files are direct snapshots. New files are the wall-bearing regression test, browser review script and this issue record.

Rebuild using `make build-structure`. Run `.venv/bin/python -m unittest discover -s tests -p 'test_structural*.py'`, `node --test walkthrough/tests/structure-*.test.mjs`, and `node revisions/structural-overlay-and-wall-bearings-2026-10-26/browser-review.mjs`. The browser script requires the local server on port 8765. Logs use the `structural-overlay-and-wall-bearings` prefix.
