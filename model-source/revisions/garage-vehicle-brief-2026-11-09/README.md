# VB01 — van and Tesla loading brief

9 November 2026. The owner explicitly accepted **a fully laden van up to 3.5 tonnes and a Tesla allowance up to 3.1 tonnes, potentially parked together**. These are maximum gross allowances, not kerb weights or claims about particular production models.

The [four-page enquiry PDF](garage-deck-enquiry.pdf) includes the brief, a plan derived from the current member geometry, floor-depth and bearing diagrams, quantities and the requested supplier/engineer return. It is also available at `/structure/garage-deck-enquiry.pdf` and from both viewer inspectors. The pack is prepared for review and has not been sent. Neither deck is approved for construction.

## Updated assumptions and calculations

| Quantity | Van | Tesla allowance |
|---|---:|---:|
| Maximum gross mass | 3500 kg | 3100 kg |
| Static weight at 9.81 m/s² | 34.335 kN | 30.411 kN |
| Assumed heavy axle, 65% of gross | 22.318 kN | 19.767 kN |
| Axle with illustrative ×1.20 movement factor | 26.781 kN | 23.721 kN |
| Heavier wheel, 60% of that axle | 16.069 kN | 14.232 kN |

The combined static weight is **64.746 kN (6.6 tonnes)**. The 65% axle fraction, 60:40 wheel split, 1.6/1.8/2.0 m tracks and ×1.20 movement factor are explicit study assumptions, not plated vehicle data or prescribed code values. Confirm axle ratings, wheelbase, contact patches and actual use before design. No access-control or future-vehicle restriction has been physically installed.

Both gross allowances exceed the 30 kN light-vehicle threshold. [JRC's first-generation guidance](https://eurocodes.jrc.ec.europa.eu/sites/default/files/2022-06/EN1991_2_Malakatas.pdf), page 32, gives Category G for 30–160 kN vehicles and a 5 kPa UDL. The study now uses **5 kPa vehicle UDL in all three permanent-load sensitivities**, plus **separate 20/25/30 kN point cases**. The upper point case is a provisional jacking floor action. These are not combined by adding vehicle gross weights again. The exact UK local-action rules and combinations have not been verified from the normative text, and the generic 40–90 kN axle range is not silently adopted as a UK project requirement.

[IStructE's transition guidance](https://www.istructe.org/resources/eurocodes/) states that first-generation Eurocodes remain the applicable UK standards until 30 March 2028 unless otherwise specified. Confirm the coordinated code/UK National Annex editions at the design appointment; this study is not a compliance assessment.

The existing RC strip calculation and precast comparison use the same brief. The precast payload adds 20 paired-axle envelopes: two bays × two vehicles × one to five hypothetical sharing beams. Each samples three tracks, eleven positions and both heavy-wheel orientations (66 layouts). The worst ULS moment, SLS moment and each end reaction are saved with their actual wheel positions. The separate reaction envelopes must not be summed as though they occur together. The study retains no calculated deflection without supplier stiffness/prestress data.

The paired-axle calculation assumes an axle parallel to the precast beam. It is not a two-dimensional slab/topping analysis or a whole-garage simultaneous parking analysis. Actual transverse sharing, both axles, turns, edge approaches, wheelbase and combined central-wall/opening-head reactions still need design. The two-vehicle combined weight is an operational brief, not a distributed load substituted across the whole floor.

## Effect on the option comparison

The 150 mm precast option's worst UDL demand/legacy-reference ratio is approximately **0.95**. The upper local 30 kN case gives about **3.82** on one beam and **1.21** even with hypothetical equal sharing across five beams. The van paired-axle screen approaches the legacy benchmark with five-beam sharing (worst ratio about **0.97**), but the model does not establish that sharing. The legacy tables are BS 8110 benchmarks, not current supplier resistance verification.

This strengthens the reason to keep the solid RC proposal as the default while asking suppliers to assess 225 mm beams, altered spacing/multiple beams, a designed load-spreading topping or another suitable floor. No alternative has been automatically adopted or resized. The RC slab also remains unverified; its revised demand study is not a selected reinforcement design.

All member geometry, the 335 beam-and-block objects, floor/ceiling levels and quantities are unchanged. The existing and alternative foundation data are unchanged: vehicle weight is variable and is **not credited against groundwater uplift**.

## Deliverable and reproducibility

- Specification: `proposal/specs/garage-vehicle-brief.json`.
- Shared brief and axle calculations: `scripts/structure/garage_vehicle_brief.py`.
- Enquiry generator: `scripts/structure/garage_supplier_pack.py`, called by `build_members`.
- Viewer brief, load tables and download link: `walkthrough/src/structure-garage-deck.js`.
- Rebuild: `.venv/bin/python -m scripts.structure.build_members`, then `make build-web`.

The PDF is stamped with a hash of the brief, geometry, quantities and calculation data. It requests a complete design and comparable price, including reinforcement, local RC strips, bearings, topping, restraint/diaphragm behaviour, basement interfaces, fire, temporary works and lifting. It does not select bars, mesh, tendons or fabricated parts. All four rendered pages were inspected for readability, layout and clipping.

Validation and source hashes are recorded in `validation.json`; browser screenshots and the integration report are in `walkthrough/test-results/garage-vehicle-brief-2026-11-09/`. Recovery copies and their provenance are in `original/` and `recovery.json`. The original BB01 record is preserved as historical evidence with a supersession notice. No native Blender rebuild, third-party message or publication was performed.
