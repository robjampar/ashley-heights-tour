# CJ02 — 7 m garage and flush wall junctions

Owner instruction: 7 m clear garage depth; remove the projecting `M-BLOCK-6FBC0C0` return and the resulting stepped `M-FR-1-028` framing; replace the room-side `M-BRICK-393739F` projection with studwork.

The revised native Proposed model, walkthrough lighting and structural overlay are installed locally. Final browser verification and screenshot review are complete. Nothing is published. This remains an experimental coordination model, not a construction issue.

## Installed changes

- **Garage:** 7.000 m from the painted inner block face of the front pier, X3.6125, to the rear finished face, X10.6125. The roller door is outboard of the front measurement plane. The rear enclosure is a 150 mm finished partition allowance, centred at X10.6875, with a 95 mm nonbearing timber core. Its door remains an 826 mm leaf. The utility storage moves behind it; floors, ceiling, skirting, collision geometry and floor-plan polygons follow the partition. The existing van remains.
- **Garage structure:** remove the redundant longitudinal masonry partition, concrete door-head allowance and its two parallel floor rims. Two additional north–south joists fill the former wall strip, maintaining a maximum 400 mm nominal spacing. The existing vehicle slab, basement/cinema bearing walls, transverse ground opening head and principal-suite loft cross-beam stay in place. A separate nonbearing return closes the garage below the ground opening head. The slab sensitivity includes the partition at its new position, using explicit 0.75/1.25/2 kN/m self-weight assumptions; wheel/jack loads and slab support axes remain unchanged.
- **Entrance corner:** the north-return block ends at X5.1825 against the perpendicular inner leaf. `M-FR-1-028` becomes a straight room-side ledger at X5.3325, with 5 mm geometric clearance from the block face. The redundant stepped first/ground-floor closures and basement buttress are removed; the ground joists extend to the straight existing-wall ledger. The main entrance void remains.
- **Loft transfer bearing:** `M-FR-3-010` extends west to X5.1825 and moves 100 mm north, to Y−5.2, clearing both complete roof timbers. Its 100 × 600 × 140 mm padstone envelopes have full geometric masonry contact below. The adjacent bathroom window is 160 mm narrower, with its pier, glass, frames, cill and stone/plaster reveals coordinated. Both steel end seats now fit within the masonry leaves. Floor gravity checks use the revised 8.445 m support-centre span. Padstone dimensions remain unverified reservations.
- **Upper recess:** remove the brick leaf `M-BRICK-393739F`. Retain only the short inner-block bearing pier ending at Y−9.59 beneath the existing loft cross-beam padstone. Nonbearing 95 mm studs fill the remaining wall lengths, stopping at the intersecting masonry return and suite partition. They are separately selectable under Partitions. The lower west-wall transfer extends a further 100 mm beneath the complete retained pier; its neighbouring ledger stops 5 mm clear of the steel end. The lower transfer sensitivity uses the revised 6.3135 m support span. Separate insulation and closure-profile allowances terminate the adjoining 150 mm cavity at the masonry-to-stud transition.
- **Finish corrections:** repair four gym equipment feet stretched by an older remap, preserve the resized ceiling's downward-facing normals, close inherited garage door-casing cut-outs, and cut the first-floor ceiling cleanly around the coordinated entrance wall/bearing. Original reference scenes and the accepted suite furnishings remain.

## Validation

The staged native operation is idempotent and preserves all seven original/reference scenes. The same final geometry is copied into the active native exports and structural source.

The final scoped geometry audit records **239 joists**, **478 hanger assemblies**, **zero unmapped joist ends**, no linked hanger/joist/receiver collisions or seat-level errors, and no collisions between the revised joists and masonry or the new studs and nearby structure. All four inspected loft cross-beam padstones have full geometric base contact. The revised linked floor-gravity sensitivity cases pass.

The existing scoped structural intersection count falls from **83 to 81**. The wider finish-interface count remains **1,159**, with **no new pair** in either audit. These are scoped coordination results, not a claim that the whole building is clash-free. The register retains **60 open issues** including this revision's unresolved engineering details.

`make check-layout` still reports the same 345 pre-existing findings (347 log lines including command/error wrapper), byte-for-byte identical to the previous CJ01 log. No new layout finding was introduced.

**299 Python tests and 317 web tests pass.** The final browser run has no JavaScript errors and passes three walking routes through the garage/utility/gym area. Eleven screenshots were captured; final visual inspection confirms the repaired garage door surround and straight entrance framing. `validation.json` records the results, real file hashes and matching native input fingerprints. Screenshots are in `walkthrough/test-results/garage-seven-metre-2026-10-28/`.

## Design limits

The floor-gravity checks assume rigid receiving supports and bounded loads. Complete masonry bearing/eccentricity, padstones, steel connections, roof and stability loads, foundation/ground capacity, slab shear/punching/cracking/reinforcement, deflection compatibility, temporary works and fire protection remain unverified. The garage enclosure needs a selected tested fire-resisting wall/ceiling/door system; the drawn thicknesses, seals and header are allowances. Review and design must precede construction.

## Recovery and source

- `original/` and `recovery.json`: preserved CJ01 native/exported data, structural outputs and visual assets.
- `proposal/specs/garage-seven-metre.json`: explicit native operations, finished dimensions and reason for the window adjustment.
- `scripts/model/proposal_garage_seven_metre.py`: proposed-only native integration, navigation and finish coordination.
- `scripts/build/prepare_garage_seven_metre.py`: targeted staging, idempotence, preserved-scene and source-hash checks.
- `scripts/structure/garage_seven_metre.py`: revised floor fields, receivers, masonry, individual studs, partition loading and bearing reservations.
- `outputs/output-cj02-staging/`: final staged model and checks; `cj02-source.json` records the real recovery source and build inputs. This targeted integration is not recorded as a full-source Blender rebuild.
- `geometry-audit.json`: scoped collision, bearing and connection evidence.
