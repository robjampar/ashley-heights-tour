> Completed local issue: see README.md and the final validation record. The notes below are preserved as an intermediate work log; their counts and pending-task statements are superseded.

# Active M04 — primary steel, roof conversion, floor and wall completeness

## User scope (all still active)
- Why M-FR-3-025, M-FR-1-036 and M-FR-1-035 are timber; include primary edges around entrance floor openings.
- False roof edges in Option B Joined roof 013/023/026 (hip1), 032/033 (hip2), 056 (hip3 fascia gaps), plus Side wing 084/088/091.
- Roof should be continuous. Diagnose actual surface continuity, not delete named members individually.
- Floor joists beneath side-wing / original-house hips should reach the wall-bearing lines, including M-LOFT-HOUSE-027.
- Dormer header M-TH-AE21020 and front roof edge should have distinct roles, not appear as duplicate bearing beams.
- First-floor east/rear wing masonry missing above New wing east pier1 across elevation.
- Missing new ground-floor joists and internal framing.
- Separate non-loadbearing partitions from structural timber; unknown roles must not be silently classified.

## Implemented, awaiting final verification
- All active labels/data revision M04. Pre-M04 selected files in original/; preserve M03 history/evidence.
- structural-floor-layout.json: 13 explicit spatial steel beam-line proposals, covering 18 existing member refs (three named refs stable). UB305x165x40 is a dimensional reservation against old 300mm timber depth, NOT calculated selection. Model fragments on one line are NOT implied fabrication splices. Builder fails if reviewed member refs drift.
- Beam profiles/category/cost use steel; joist end/hanger positions follow actual wider flange. Steel-receiver hangers disclose unresolved steel bracket/infill detail.
- Original loft deck03 structural polygon extended to first-floor wall lines beneath hips; actual stair aperture retained. Original house upgrade remains optional. Reference-line map preserves pre-M04 joist IDs by overlapping old axes, including 027 at X10.8. New under-hip runs get new numbers.
- Four intermediate under-hip beam reservations shown under continuous joists at Y4.405 (west base; three original-house optional). Bearings, downstands and room-wall stations unverified. Full joist length is NOT an approved clear span.
- Ground west/east wing and entrance-gallery zones added at FFL0 using real plate/stair void. Central beam at X9.2 is a support proposal; basement transfer remains unresolved. No old-house ground floors replaced.
- build_study explicit openingHeads override before layer exclusion; partition keyword now recognized.
- Restored 12 east upper wing facade bodies (8 piers/sills +4 heads) previously excluded as P62 interiors; proper lintels/upper masonry preserve windows.
- Restored prep-kitchen partitions/heads, ensuite dividing walls, bedroom media partition, suite north partition. All via explicit bodies/heads and source geometry.
- Structural wall role map: loadbearing-proposal / non-loadbearing / unresolved. Categories studs / partitions / framing-review, including associated headers/plates. New separate toggle buttons. Gym explicitly proposed bearing; added ordinary infill studs/sill cripples/sill plates.
- Roof extractor upper_roof_surface uses upward faces and dominant roof plane; excludes underside and numerical sliver normals. roof_group merges near-coplanar source pieces geometrically; precision100 microns and simplification close export seams. Huge reduction in false roof groups/edges. Roof B intermediate count fell212→130, area91.392→90.292m² before later fascia updates.
- Roof edge cutoff .35m removed (now .015m) so short fascia connections are not simply omitted. Horizontal exterior eaves without adjacent roof planes become separate fascia category (45x195 enclosure backing reservation), not extra bearing header; true roof junction/opening edges remain trimmers. Shared hip duplication dedupe needs visual/geometry audit.

## Last build state
First M04 ground/wall/roof build:626 arch refs,2493 members,24957 masonry pieces,35 issues;305joists,99receivers,0 unmapped ends,7canttips. This precedes final joist-ID stability/gym infill/role adjustments. Build currently launched, see tool session/log.
No final tests or screenshots yet. Existing tests NEED updates for new roles/fascia and eaves width, plus new meaningful regression tests.

## Required next work
1. Wait latest build; inspect logs and counts. Run Python structural suite & viewer suite, fix real failures.
2. Update tests: loft wall allowed timber categories; roof replacement allows fascia; exact eaves endpoint derived receiver width (now5.6975); source-footprint tests small roof precision tolerance; new tests assert all18 primary refs steel+mass, preservedIDs, full hips, ground void/fullplate coverage, all rear wall fragments, role separation, no downward/ghost roof surfaces and no duplicate roof-edge lines.
3. Browser actual before/after roof closeups: can Playwright route members.json/model.json to original/ snapshot for before. UI can current M04 modules render M03 data. Capture user-mentioned areas + eaves/steel, full ground framing, hip floor, dormer/header vs fascia, rear masonry, partition-only and bearing-only.
4. Inspect roof continuity properly. Exact snapshots after dominant upper-face fix looked much cleaner from data, but some group edges remain split at original ridge Y4.405 vs4.45 or very short returns. Do NOT claim native roof audited/perfect yet. Native architecture has NOT been edited.
5. Ensure eaves fascia exclusion and roof-only filters include new category. Current filter accepts M-RE IDs; works regardlesscategory. JS tests categories need fascia in roof options.
6. Verify original-house optional staysoff default, existing framing not fabricated. New ground deck/build-ups still uncalculated.
7. Fix UI inspector support rows/role labels if needed. Existing costCSV lacks explicit material/beamLine but category +section/name currently identify steel. Tests should check cost unit kg.
8. make check-layout expected fail345 findings, match logs/garden-workshop-check-layout.log exactly. No publication.
9. Write README + final-validation evidence and update rootREADME/docsWORKSPACE currentM04; preserve prior dated M03.

## Research
Primary-source search: NHBC 2025 Chapter6.5 steelwork describes support of timber floors including trimmed openings, section/connection limitations. SCI P360 emphasizes positive timber/steel connections for restraint. No new section sizing from tables; all new profiles remain reservations. Citations if using generic claims:
https://nhbc-standards.co.uk/downloads/2025/NHBC-Standards-2025-Chapter-6-5.pdf
https://www.steelconstruction.info/images/0/0e/Sci_p360.pdf
PDFs were search results only, not downloaded/read fully. Do not claim detailed manual compliance.
