# Ashley Heights — whole-house analysis

This review proposes 100 improvements for owner approval. It does not apply those changes. The starting point is the full Proposed design in brick, the derived Planning option, and the accepted warm oak, limestone and ivory interiors. The scope is deliberately broader than decoration: how the house works, the details that make it feel finished, the grounds, the accuracy of its drawings and the speed/reliability of the model workflow.

## Revised priority: substantial design alternatives

The owner has asked for larger, more consequential proposals. Twenty entries now examine complete room layouts, adjacent-room trade-offs, fitted architecture and outdoor living, rather than accessory changes. The approval board opens on these twenty options. See `SUBSTANTIAL-OPTIONS.md` for the complete shortlist.

The strongest new spatial experiment is AH-058: moving the games table to the west bay and the seating to the north/east bay, removing the separate TV nook while retaining the bar, darts, six-foot table and room shell. Unlike the earlier constrained search below, this changes the furniture zoning itself. The original fixed-furniture findings remain valid for their narrower assumptions, but are not proof that a full replan cannot work.

Other larger options include a coordinated gym/utility replan, a more usable side bedroom through a local family-room trade-off, a pantry/appliance wall, an acoustically separable TV lounge, a unified ensuite layout, a fitted dressing room, a two-zone hobby loft, proper pool-changing facilities and complete pool/terrace/workshop layouts. Each has explicit sacrifices and feasibility checks. A bigger intervention is not automatically better.

The four initial detail render pairs remain available, but are secondary to this revised shortlist. Native render coverage is tracked independently; a proposal without a built preview is not shown as a completed after.

## Original audit finding

The design does not need another wholesale stylistic change. Most useful improvements are in the transition from a convincing furnished concept to a coordinated home: real storage contents, controls within reach, wet and dirty routes, summer comfort, acoustic relationships, actual equipment, service access and clear evidence of the remaining spatial compromises.

Several tempting suggestions were removed after reading the builders. Bedside charging and reading lights, principal vanity face lights, a dressing mirror, an office cable tray, a dartboard surround, a hall charging point and ventilated pool storage already exist. The final list identifies what would change instead of asking the owner to approve them again.

## What to preserve

- The bed headboards remain against their selected walls; no headboard colour/form overhaul.
- Both principal TVs remain fixed and equal in size. No pivoting screen.
- The rounded equal-arm L desk, enlarged ensuite and shifted wardrobe/windows remain the accepted suite baseline.
- The garage roof stays unchanged and the lower central gable opening remains the selected concept.
- Gate-facing treadmills, shallow corner coat storage, under-stair reading chair and removed loft-eaves units remain the owner-selected arrangement.
- Formal dining remains six daily places, extending for eight to ten where occupied-use checks support it.
- Double garage, four exterior spaces, pool, gym, cinema and wine/games room remain in the full brief.
- Brick belongs to the house/extension exterior; interiors remain neutral. Dormer cheeks/fronts stay tiled and flat caps stay flat.
- Variation should come from proportion, texture, lighting and small tonal differences. The rejected blue headboard, teal formal sofas and green bar palette are not reinstated.

## Earlier audit priorities (superseded by the twenty-option shortlist)

| Proposal | Why review it early |
|---|---|
| AH-007 · Occupied kitchen use | Protect the selected kitchen while testing the routines that determine whether its compact island and adjoining routes work. |
| AH-025 · Low gable alcove use | A 1.70 m opening is a real constraint. Make the space beyond an intentional occasional seated destination. |
| AH-028 · Bath installation/cleaning | Preserve the sculptural bath but coordinate product, waste access, cleaning and floor support. |
| AH-031 · Survey reconciliation | Detailed room dimensions still depend on a provisional reconstruction. Corrections should be controlled and visible. |
| AH-043 · Minimum-change planning case | Quantify retained/new fabric and bulk before deciding whether any fallback reduction is worthwhile. |
| AH-044 · Loft bridge section | Recorded 1.78–1.90 m headroom cannot be made comfortable merely by a good-looking plan. |
| AH-054 · Cinema table | A concrete, modest furniture change can improve the front approach, with an explicit reach trade-off. |
| AH-065 · Actual cars | The garage is checked with 4.40 x 1.80 m concept cars; final vehicle sizes could materially change usable storage. |
| AH-068 · Pool cover | Cover housing and operation should be integrated before the deck details are fixed. |
| AH-076 · Terrace build-up | Thresholds, rooflights, drainage and finished levels must agree before the terrace is treated as resolved. |
| AH-082 · Gable load path | The floor-concealed beam remains structural intent, not an engineered supporting detail. |
| AH-096 · Native/web parity | A measured source discrepancy exists and should not be hidden behind polished presentation. |

These are suggested review priorities, not automatic approvals or instructions to commission work.

## Spatial comparisons carried out for this review

### Cinema

The current coffee table occupies 1.74 x 0.66 m. The empty sofa-to-table gap is 0.65 m. Keeping the screen-side table edge fixed and reducing depth to 0.36 m increases that empty gap to 0.95 m: a 300 mm gain without moving the sofa, screen or room shell.

That is not a free improvement. The table becomes harder to reach while seated. The proposal therefore compares a shallower table with reliance on the existing drinks console/side surfaces. Real knees and occupied passage still need to be drawn. This is a furniture-envelope comparison, not an accessibility conclusion.

See `cinema-comparison.svg` and `spatial-comparisons.json`.

### Wine bar and games

The current full-cue reservation leaves 622.5 mm between its edge and the projecting stair guard. A sampled translation/rotation search retained the six-foot playing surface, 1.525 m cue allowance, sofa, fixed furniture, occupied stools and darts activity area.

Of 1,052 feasible sampled placements, the best tested body-route result was about 697 mm. It requires a 75 mm north move, leaving only 5 mm between the cue envelope and the nominal north room boundary. That is not a robust installation tolerance. A smaller move yields a smaller gain. The result does not justify a claim that rearranging the table produces a broad route.

A shorter cue allowance at the constrained edge can release more room, but changes how the game is played. AH-058 asks the owner to choose that compromise explicitly rather than silently shrinking the table or its activity zone. The simulation uses simplified XY envelopes and fixed approach points; it does not prove every shot, occupant or 3D clearance.

See `games-comparison.svg`, `spatial_audit.py` and `spatial-comparisons.json`.

### Side bedroom

The current side clearances are recorded as 940 mm and 835 mm; the tight turn at the bed foot is 665 mm. The complete frame is 2.02 m long around a 1.90 m mattress. Only 120 mm in total lies outside the mattress length, including both frame ends. A shorter frame cannot honestly promise a dramatic improvement. AH-035 therefore requires a real product envelope and keeps further partition movement as a separately justified consequence.

### Other recorded constraints

- The loft suite has about 2.09 m structural dormer headroom before finishes. Shower-head and finished-floor sections matter.
- The gym uses separate running/rowing/strength activity states; it is not a promise that every machine can be occupied together.
- The double garage uses staggered concept cars and partial door openings. Its fit does not establish that larger household cars work.
- Pool routes are recorded at roughly 950 mm on the west and 1.14 m on the east. The changing building is raised, so the wet route includes steps.
- The terrace has three rooflights and retained guarding/privacy screens. Furniture planning alone does not resolve loading, waterproofing or wind restraint.

## Model and drawing consistency

A read-only parse of the current public GLBs found all six `Principal gable wall | ...` parts in both Proposed and Planning. Neither corresponding `output-proposed-*/geometry.json` snapshot contains those parts. This confirms a current feature-level mismatch rather than relying solely on an old status note. It does not mean the web wall is missing; it means native-export-dependent documents can lag behind it.

The audit records 17,157 web nodes for Proposed and 15,425 for Planning; the export object counts differ because the formats organise data differently. Those counts are not a one-to-one parity test. The named gable feature is the specific comparison. See `model-parity-audit.json`.

Several historical notes also still say unpublished, working or unapproved after later owner decisions and deployments. They remain useful history, but should not be treated as a current issue register. AH-100 proposes one authoritative current register with links to that history.

The earlier false front-wing notch in the two brochure site diagrams is already fixed and published. This review does not list that completed repair as another proposed improvement.

## Planning and site interpretation

The existing project register says measured building/topographic surveys, neighbour levels, several site constraints and consultant work remain outstanding. The review uses that register to propose a controlled evidence-led next step, not to claim planning readiness.

Sevenoaks' extension guidance discusses scale/form, materials, neighbour privacy, outlook and light. These support the review topics; old policy references in the 2009 document must be checked against the current policy framework before an application decision. Passing a simple diagrammatic screen does not guarantee approval. [Council extension guidance](https://www.sevenoaks.gov.uk/downloads/download/141/residential_extensions_spd).

For office refinements, HSE's workstation guidance supports checking usable desk space, under-desk room and glare. It is used as ergonomic guidance here, not as a domestic-room certification. [HSE display-screen guidance](https://www.hse.gov.uk/pubns/indg36.pdf).

Summer comfort is proposed as a whole-house design assessment. The regulatory applicability of Part O to this particular project has not been established and is not assumed. [Government overheating guidance](https://www.gov.uk/government/publications/overheating-approved-document-o).

## Presentation and speed

The current brochure contains 95 pages, 61 selected images and 27 area plans. That gives broad coverage, but needs easy navigation and transparent comparison with native geometry where enhanced images are used. The proposals distinguish improved photographic presentation from architecture that is actually present in the model.

The build already has meaningful optimisation: the recorded finish audit fell from about 1,008.5 s to 5.6 s with equal reports, and a later compression cache reduced its measured repeated stage from 15.333 s to 0.638 s. These are stage measurements, not an end-to-end promise. The review does not propose doing those completed optimisations again. AH-097 and AH-099 instead target dependency-aware iteration and measured on-demand detail delivery.

## Review method and limits

The review examined room specifications, relevant authoring code, navigation data, selected geometry features, historical validation reports, brochure content, model-derived plans, native reference contact sheets and official guidance. It did not perform a new building survey, structural calculation, acoustic simulation, thermal model or planning submission.

Each proposal includes an observation, a specific change or study, the expected benefit, a disadvantage, scope and a success check. Optional opportunities are not represented as observed defects. Existing studies with superseded details are not used as current proof. The UI saves owner choices separately from the design and includes no model-edit or publishing operation.

The complete list is in `ALL-100-PROPOSALS.md` and in the local approval board.
