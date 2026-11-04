# M05 — junction fit, corner coordination and construction layers

Local experimental issue, 26 October 2026. Open [Junctions](http://127.0.0.1:8765/structure/?view=junctions). This is a geometry coordination pass, not a completed structural design or fabrication package. Nothing has been published.

## Changes

- Joist ends stop 5 mm beyond their receiver faces: a generic 2 mm hanger back plate and nominal 3 mm joist-end gap. The generic seat provides 59 mm of modelled contact. These are modelling assumptions, not approved product dimensions or installation tolerances. I-joist flanges remain intact. Seven edge/grid lines shift locally to avoid parallel steel; members retain their references.
- 163 timber infill envelopes occupy the clear web space behind steel-supported hanger reservations. They avoid the web/root and flange envelopes. Grade, fastening, stiffeners, restraint and capacity are not selected.
- 111 whole-section end corrections comprise 12 steel ends, 18 timber trimmer ends, 80 roof-member ends and one fascia end. Nominal gaps are 10 mm at secondary steel ends and 5 mm at coordinated timber ends. Pitched members receive vertical end planes; no steel flange notches or service holes are inferred. Connection plates, bolts and welds are still absent. Common members are not cut to accommodate optional-only supports.
- M-EDGE-01 moves below the intact gallery cantilever joists, with its top at Z5.271 m. Its downstand, purpose in the cantilever scheme, glazing/ceiling conflict, connections and supports remain unresolved. This geometric correction does not validate the cantilever design.
- Twenty-two masonry corner junctions are coordinated. Eighty-two surviving assemblies have revised returns/course ownership and updated unit geometry/quantities. Same-leaf corner overlap is allocated on alternating courses rather than counted twice. M-BLOCK-7922371 and M-BLOCK-4DA05C5 are omitted because their tiny architectural returns fall inside the adjoining cavity after inner-leaf alignment. Ten cross-leaf junction conflicts remain explicit. Product bond, closers, ties, movement joints and insulation/cavity details are not complete.
- Two cinema non-bearing panel heads beneath the parallel ground-floor girder move down 177 mm, with their 16 studs shortened to the continuous head plates. Their nominal 25 mm gap is a combined movement/fire-lining space allowance, not a rated head detail or approved deflection allowance. Crossing-beam junctions remain flagged. No bearing or unresolved-role frame is modified by this operation.
- Fifty-six selectable floor build-up envelopes cover 14 zones: 22 mm finish, 22 mm deck, 25 mm service space below the joists and 12.5 mm ceiling. Actual floor/stair voids are preserved. These allowances are unpriced and do not resolve the known architectural depth/headroom conflicts. Fire, acoustics, insulation, moisture, panel support and service routes still need specification.

The inspector shows model levels, local grid changes, end cuts, head adjustments and linked overlaps. **Inspect junction** isolates the relevant pair or head assembly and looks from the member side of the connection. **Floor build-ups** enables the new layers in 3D, plans and sections. **Model dimensions · CSV** exports axis dimensions and recorded corrections for modelled bars, always with `fabricationReady: false`.

The user's material preference is recorded: consider solid timber where capacity, vibration, span and available depth permit; I-joists remain an acceptable common UK option. No whole-house solid-timber/steel alternative has been sized or substituted. The earlier UK-T01 comparisons remain conditional.

## Measured results and unresolved work

The closed-solid audit measures actual volume, not overlapping bounding boxes. It covers profiled steel against primary members/walls and masonry against masonry, excluding contact-only intersections. The reporting threshold is 0.1 cm³. Boolean round trips preserve enclosed voids; separate inward cavity shells must not be flipped to positive volume.

| Pair type | Before M05 | Current |
| --- | ---: | ---: |
| Steel / joists | 12 | 0 |
| Steel / steel | 15 | 1 |
| Steel / trimmers | 33 | 10 |
| Steel / rafters | 111 | 31 |
| Steel / fascia | 5 | 4 |
| Steel / masonry | 37 | 33 |
| Steel / lintel reservations | 6 | 6 |
| Steel / bearing frames | 3 | 3 |
| Steel / non-bearing partitions | 38 | 20 |
| Steel / unresolved-role frames | 26 | 26 |
| Steel / concrete | 2 | 2 |
| Masonry / masonry | 58 | 10 |
| **Total across all options** | **346** | **146** |

The default main-house A selection shows 114 pairs; enabling options changes that count. Some overlaps are intended bearing-pocket locations, while others need a revised assembly/level. The remaining ridge intersection, competing beam/lintel reservations, cavity returns, intermediate roof bearings and framing crossings are not silently trimmed away. Junctions explains the required next decision for each group.

Separately, 603 hanger assemblies and 2,298 linked solid pairs are checked: joist/receiver, hanger/joist/receiver and associated infill. There are zero measured overlaps and zero seat-level errors in this limited check. It does not validate hanger products, fixings, bearing length, web stiffeners, restraint or unrelated adjacent elements.

The current register contains 626 architectural references, 2,696 member/assembly references, 24,759 masonry pieces and 39 coordination issues. The support register still has 305 joists, 99 receivers, seven deliberate cantilever tips and zero unmapped joist ends. **Eighty receiver ends lack a nearby direct wall-envelope candidate.** Other recorded contacts and connections across model gaps are also unverified. The complete load path and member capacities are not established.

The layer inventory explicitly records outstanding wall ties/trays/barriers/closers, insulation, roof sheathing/membranes/ventilation, steel protection and fixings, and basement reinforcement/waterproofing/temporary works. Existing hidden structure and MEP are outside the measured-solid audit. The geometry cannot be used as a cutting, procurement or construction instruction.

## Evidence and reproduction

Run `uv pip install --python .venv/bin/python -r scripts/structure/requirements.txt` to add the pinned manifold3d dependency to the existing workspace environment, then `make build-structure`. `scripts/structure/junctions.py`, the junction spec and dependency file are included in the member source fingerprints. No native Blender/GLB build is needed for this isolated structural layer.

Forty-four structural Python tests pass. The full viewer suite passed 302 tests, followed by a final 23-test structural viewer rerun after the last model/UI changes. Build/source-fingerprint checks pass. `make check-layout` retains the same 345 pre-existing findings, byte-identical to `logs/garden-workshop-check-layout.log`.

[Browser evidence](../../walkthrough/test-results/structural-junction-details-2026-10-26/) contains actual Chrome captures of before/after joints, masonry, partition heads, remaining overlaps, hanger/infill fit, floor drawings and desktop/mobile controls. Before views load the saved pre-M05 data into the current viewer; they are not historic application screenshots. Targeted camera positions are for junction inspection, not guaranteed identical cameras between issues. The recorded browser checks cover pair/head isolation, dimensions, drawing layers, non-bearing role preservation and the CSV download, without browser errors/warnings or failed requests. See `final-validation.json` for the final counts.

Architecture geometry and navigation remain byte-identical to their pre-M05 hashes. Earlier PDFs retain their original issue/stale-download handling. No complete calculation package, native-model change, site validation or publication is claimed.

`original/` preserves selected pre-M05 source/spec/viewer/data/test files as a partial recovery copy. `before-intersections-final-method.json` applies the final audit method to that saved model for the table above; the earlier baseline audit is also preserved.

## Primary references

- [JJI installation guide](https://www.jamesjones.co.uk/assets/downloads/subdir/SAL04-20jm%20Site%20construction%20guide%20Dec18.pdf): flange integrity and manufacturer installation requirements.
- [NHBC 2025 Part 6](https://nhbc-standards.co.uk/downloads/2025/NHBC-Standards-2025-Part-6.pdf): floor, steelwork and masonry guidance; not a compliance determination for this design.
- [Simpson JHMI](https://www.strongtie.co.uk/en-UK/products/joist-hanger-for-masonry-i-joists-jhmi): steel support/infill guidance. No JHMI product has been selected for the generic hangers.
- [British Gypsum head detail](https://www.british-gypsum.com/download-documents/construction-details-pdf/cn-121-021-gwsf-def-head-ceiling-abutting-ptn-en-30-or-60-minutes.pdf): movement and fire performance depend on a complete specified system. This metal-partition detail is not approval of the modelled timber heads or their nominal gap.
