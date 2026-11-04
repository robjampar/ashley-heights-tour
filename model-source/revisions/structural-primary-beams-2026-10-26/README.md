# M04 — framing roles and structural coordination corrections

Local experimental issue, 26 October 2026. Open [Structure & blueprint](http://127.0.0.1:8765/structure/). No construction approval or publication.

## Framing roles

**Bearing timber** and **Partitions only** isolate the two proposed roles. A third system, **Framing · role unresolved**, keeps uncertain walls separate. The role applies to studs, plates and associated headers, and follows each reference through 3D, plans/elevations, the inspector and CSV. **Costs → Wall framing by role** lists the quantities and allowances separately within the existing subtotal, without adding them twice.

The current register contains 206 proposed-bearing, 253 non-bearing and 225 unresolved wall-framing references. Explicit non-bearing partitions are excluded from candidate wall-bearing contacts. The map is in `proposal/specs/structural-wall-assemblies.json`; it records proposed intent, not a survey or capacity determination. Knee walls are not automatically treated as non-bearing.

Omitted prep-kitchen partitions/heads, ensuite dividing walls, bedroom media partition and suite north partition are included from their authored geometry. The gym bearing-wall proposal now includes ordinary infill studs, sill cripples and sill plates. This does not constitute a complete connection, blocking or bracing schedule.

## Beam, roof, floor and masonry corrections

- Thirteen spatial beam-line proposals cover 18 primary receiver references. M-FR-1-035, M-FR-1-036 and M-FR-3-025 retain their IDs and now show steel. The UB 305×165×40 profile is a dimensional reservation comparing fit with the former 300 mm timber envelope, **not a calculated section selection**. Costs use steel mass. Model segments sharing a beam-line reference do not imply fabrication splices.
- Joist endpoints and hanger positions follow the actual receiver flange width. Steel receivers require a designed bracket or engineered timber-infill detail; generic hanger meshes do not specify fixings. Focusing a member selects its own level and retains a compatible system filter.
- Roof extraction previously admitted underside triangles and split nearly identical planes because of rounding noise. It now uses the dominant upward skin and unions coplanar fragments before generating rafters and perimeters. Shared hip edges are consolidated. Roof-edge reservations are removed or trimmed where an explicit ridge profile already occupies the line, with quantities recalculated.
- Eaves/fascia backing has a separate category and continuous geometric runs. It is distinct from dormer bearing headers such as M-TH-AE21020. Removing the old 350 mm edge cutoff closes omitted short connections. These are coordination runs; fabrication lengths, corner joints, rafter connections and eaves details remain undesigned.
- Loft floor framing continues beneath the western and original-house hips to the wall-bearing lines, retaining the actual stair aperture. M-LOFT-HOUSE-027 stays at X10.8 and runs from Y−0.07 to Y8.66. Four intermediate bearing proposals are shown below the joists. The 8.73 m modelled member length is not an approved clear span. Original-house strengthening remains optional and off by default; the accepted habitable floor and exterior roof are unchanged.
- Seventy-six new ground-floor joists cover the new wing, courtyard notch and entrance link using their floor polygons, preserving the basement stair aperture. The central receiver is a steel proposal. Basement transfer, perimeter bearings and the deeper floor build-up remain open. The existing house ground floor is not replaced; the projecting garage/entrance ground-slab areas are not silently converted to timber.
- Twelve omitted rear/east upper-wing facade bodies are restored: eight piers/sills and four heads. They had been stored in an interior authoring layer and excluded by the registry. Brick/block leaves and lintel reservations now continue around all four preserved windows.

The roof-only B view falls from 681 to 495 displayed references after removing false/duplicate geometry. The conditional replacement roof itself is 127 references over 90.292 m². This does **not** certify the entire native roof as one perfect mesh. Native architectural objects, external form and materials were not edited.

## Validation and evidence

`make build-structure` and the final bundle build pass, including source-fingerprint checks. Thirty-six Python structural tests pass. The full viewer suite passes 297 tests; a final structural viewer rerun passes 18 tests after the focus adjustment. `make check-layout` still exits 2 for the same 345 pre-existing findings, byte-identical to `logs/garden-workshop-check-layout.log`.

The [browser evidence](../../walkthrough/test-results/structural-primary-beams-2026-10-26/) contains 22 reviewed Chrome screenshots and the final validation record. Four before/after roof comparisons use identical cameras: the before images load saved pre-M04 registry/member data into the current viewer. They are not a historic browser bundle or a new native-model audit. Other captures cover the three named steel receivers, ground-floor framing and plan, full hip floor, joist 027, rear masonry, both framing isolations, unresolved framing and costs. There are no browser errors, warnings or failed requests. Automated browser checks verify both role isolations and the focus-level behaviour.

The current issue has 626 architectural references, 2,479 member/assembly references, 24,957 visible masonry pieces and 35 open coordination items. Its geometric support audit maps 305 joists to 99 receiver members, with seven explicit cantilever tips and no unmapped joist ends. **Eighty-one receiver ends have no direct nearby wall-envelope candidate.** Other contacts are unverified as well. Complete load paths, roof/floor capacity, bearings, basement transfer, stability, foundations and connections remain unresolved; known floor-depth clashes are exposed in **Fit & issues**.

Architecture geometry and navigation match their prior hashes. No Blender/GLB rebuild, completed structural calculation package, procurement schedule or publication is claimed. Existing PDF study files retain their earlier issue; stale downloads remain disabled.

## Reproduce and recover

Run `make build-structure`, then the structural Python suite and viewer tests. `browser-review.mjs` captures the local server on port 8765; artifacts and logs use this revision's name.

`original/` preserves selected pre-M04 source/spec/viewer/data/test files. It is a partial recovery snapshot, not a whole-workspace backup. Earlier M01–M03 records and native recovery evidence are preserved. `WORKING-NOTES.md` is the dated intermediate record; this README and the final validation JSON describe the completed local issue.
