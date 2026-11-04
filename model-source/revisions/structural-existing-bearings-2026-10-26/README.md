# M08 — brick display, gallery return and retained-wall bearings

26 October 2026. Local experimental structural coordination issue, not construction design or publication.

## Brickwork

All three owner-reported leaves now render as brick: **M-BRICK-9AC1EAD**, **M-BRICK-CB5B264**, and **M-BRICK-303DDFE**. The pale surfaces were mortar backing displaced outward by reversed triangle winding, not a white brick material selection. See the [display correction record](../structural-brick-colours-2026-10-26/README.md). The fix covers the affected masonry generally and preserves the 25,219 modelled pieces and their quantities.

## Gallery steel layout

**M-FR-3-023** moves 50 mm east to X7.35, aligning with the entrance trimmer **M-FR-3-009** across the continuous transfer **M-FR-3-010**. The three receiving gallery joists and their hangers follow that face; the architectural floor outline is unchanged. Its north end reaches Y−4.2175. The cut member length is 0.990 m; the projection from the transfer axis is 1.0825 m.

**M-FR-3-024** is now explicitly secondary. Its ends stop at the eaves receiver and the side of 023 with the existing 10 mm modelling clearance. It no longer acts as the apparent support for the end of 023. The hierarchy is 010 → 023 → 024, while the west eaves receiver remains a separate unverified bearing proposal. No steel/joist overlaps occur in the changed joint, and existing member references are preserved.

This is a **moment-transfer proposal**, not a pin-jointed supported corner. The connection through/into 010, torsion/stiffening of the transfer, aligned backspan, restraint and combined roof/floor/edge loads need engineering design. No plate, bolt or weld sizes have been invented. The inspector and open issue explicitly reject an ordinary simple-shear interpretation. The earlier failed long-girder/transfer screens remain failed; this revision does not validate the overall frame.

## Reuse of existing solid walls

The owner identifies the existing house walls as solid construction and proposes using them as bearings. The three hypothetical steel members **M-HIP-FLOOR-BEARING-02/03/04** are removed from the original-house base scheme and quantities. New loft joists remain in place.

The bearing study intersects each of the 36 original-house loft joists with actual retained wall footprints at appropriate wall-head heights. **26** have geometric wall-bearing candidates; **10** shorter runs have no intermediate wall contact and retain explicit span/support checks. Inspectors link to the existing wall references, list the geometric crossing lengths and clear runs, and expose wall-head discrepancies. Retained walls remain excluded from new-work quantities.

For example, **M-LOFT-HOUSE-027** crosses **W-3EF1AA0 — Principal bedroom 2 wall**, giving a 160 mm geometric crossing with clear runs of 3.82 m and 4.74 m. The wall head is **44 mm above the proposed joist underside**. A proper seat/hanger or coordinated level detail is required; the model does not approve cutting the wall or joist, nor claim that this overlap is a completed connection.

**M-HIP-FLOOR-BEARING-01 remains** and is renamed **West extension under-hip transfer · no retained wall below**. It serves the new west extension, where the current register contains no retained first-floor crossing wall. The existing-house assumption cannot be used to remove that separate transfer. Its span, size, supports and ceiling depth are still unresolved.

Solid construction alone does not establish adequate capacity. Existing openings/heads, wall strength and continuity, foundations, loads, restraint and proprietary joist details need checking. [NHBC Chapter 6.4](https://nhbcprod.blob.core.windows.net/shared/CC2981-NHBC-Standards-2024-aw-digital-version-lr-151223.pdf) describes joist support on internal bearing walls and requirements for bearings and restraint; it does not validate the existing walls in this house.

## Validation and recovery

- **57 structural Python tests and 29 structural viewer tests pass.**
- Final Chrome checks cover the return's moment warning, visible joist/wall pairs, the 44 mm mismatch, navigation to the actual wall, removal of the original-house steel line and the three corrected brick areas. Seven screenshots are reviewed; the final browser run reports no errors or failed requests.
- **2,720 member/assembly references**, **311 joists**, **95 receivers**, **615 hanger assemblies**, **43 open items**.
- Zero unmapped joist ends. Linked-connection audit: 2,367 solid pairs, no measured overlaps or seat-height errors.
- The wider audit has **143 intersections**, down from 147 through removal of four clashes involving the removed hip steel. No new pair is introduced. Other previously recorded clashes remain, including the M07 steel/masonry return.
- The workspace check retains the identical 345 pre-existing findings. Native architectural geometry/navigation hashes are unchanged. Structural source fingerprints pass the build.

`original/` preserves the preceding sources/specs/data after the brick correction and before the bearing/layout changes. New test: `tests/test_structural_existing_bearings.py`. Rebuild using `make build-structure`; browser reproduction is `node revisions/structural-existing-bearings-2026-10-26/browser-review.mjs` against the local port-8765 server. Final results are under `walkthrough/test-results/structural-existing-bearings-2026-10-26/`; logs share the same revision prefix. Neither the native house model nor the published walkthrough was changed.
