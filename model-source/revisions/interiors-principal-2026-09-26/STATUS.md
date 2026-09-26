# Principal suite — layout research

The owner has rejected the five alternatives and requested research into better room planning. No option is selected. See `LAYOUT-RESEARCH.md` for the sourced study, critique of the previous method and dimensional targets for the next sketches. In particular, the shared-TV arrangement and the bed position must be reconsidered, and 500 mm route connectivity must not be presented as proof of comfort. The five published plans remain a record of that unselected study.

The owner then required proper headboard walls, rejected pivoting TVs and requested more room-planning research. The active arrangement board is withdrawn pending a considered replacement. The house-wide framework now has 20 concrete rules and a reusable room-review template, separating owner requirements, composition, occupied use, building verification and owner selection.

Two corrected working sketches use existing solid north/south headboard walls and fixed TVs. Both pass the geometric checks, including full headboard-to-wall contact, no opening conflicts and 800 mm routes. A is nevertheless rejected on design quality: compact bedsides and the entrance relationship do not suit the generous-suite brief. B is unresolved pending adjoining rooms, everyday routines, daylight, acoustics and eye-level review. Their 24.5 m² adjoining reserve is not a fitted bathroom/dressing arrangement. No selected full-house change has been made. Old browser feedback is left intact; Git retains the previous studies.

## Previous five floorplan alternatives

The latest review requests a clear entrance, less wardrobe space, a larger desk and ensuite, and exploration of a north ensuite before choosing a layout. Five measured SVG alternatives are published at `interiors/principal/plans.html`. The old native study is explicitly labelled as the previous issue and retained for reference. No alternative has yet been fitted into a whole-house model.

1. North spa through dressing: 20.0 m² ensuite/WC, 13.6 m² dressing, 8.5 m² enclosed south-east study.
2. North spa with direct access: 20.0 m² ensuite/WC, 12.6 m² south dressing, 7.6 m² separate study.
3. North spa and open studio: 20.0 m² ensuite/WC, 10.9 m² dressing, 7.9 m² open work zone.
4. Central spa: 17.3 m² ensuite/WC, 8.9 m² dressing, 11.8 m² private north study.
5. Enlarged south spa: 23.8 m² ensuite/WC, 16.5 m² dressing, 7.5 m² north study.

The plans share the measured envelope, external openings, vaulted alcove and 950 mm entrance. Each moves the bed west and retains one shared bed/sofa screen. The first three relocate the ensuite to the former north office, with different dressing/study connections. Option 4 relocates wet functions along the east wall; Option 5 retains the wet-room position and moves its WC partition clear of the existing east glazing. Bathroom relocation needs plumbing-route and structural feasibility checks; these are layout studies, not surveyed or construction documents.

Source: `proposal/interiors/principal/floorplans.json`. Reproduce with `.venv/bin/python scripts/draw_principal_floorplans.py`. The audit reproduces the previous bed/entrance-sweep overlap, then checks every new plan for room/furniture containment and overlaps, all hinged sweeps, the arrival area, walls through furniture, partition/glazing conflicts, 500 mm body routes and 2D TV sightlines. All five pass. This does not claim native 3D/headroom/plumbing verification of these unselected alternatives.

The shared annotation engine now handles variable option counts, optional current-room references and a per-page options source. Existing kitchen/bedroom boards retain their sessions, image labels and references. The five floorplans have their own feedback session and allow independent notes/marks by proposal, shortlist and SVG-to-PNG/JSON/HTML exports. Browser checks cover all ten option/design combinations, persistence, exported feedback identity and 1440/768/390 px layouts. Existing kitchen annotation and principal colour-board tests pass.

## Previous layout 01 (superseded for layout selection)


The owner replaced the original furnishing-only brief with a layout rethink: TV visible from bed and a separate sofa, more walk-in wardrobe and a smaller desk. The native candidate at `interiors/principal/model.html` addresses that brief in the common suite envelope of Proposed and Planning. It is deliberately a separate editable study; neither completed house has been overwritten.

Move the bed north-east, sofa south and fit a shared fixed angled 85-inch-class screen at the north-west corner. Remove the old dressing/study partition, extend the bedroom's east partition and move its doorway south. Dressing grows from 7.6152 to 27.3215 m² including circulation; a 4.72648 m² window desk zone replaces the 24.03198 m² office. The 1.5 × 0.6 m desk and slim island fit around the retained glazing. Island aisles are 0.99 and 1.05 m. Bathroom, WC, external windows, suite entrance and vaulted west alcove retain their positions.

`proposal/interiors/principal/layout.json` and `scripts/preview_principal_layout.py` reproduce the two native studies. `scripts/draw_principal_layout.py` produces the measured SVG and area/window/viewing-angle report. Evidence is in `layout/`: 13 circulation targets reachable by a 500 mm body in each design and 20 native screen sightlines passing. Screen centres are 3.66 m from the bed eye and 4.27 m from the sofa eye, around 35° off-axis for both. The measured plan and browser cameras are a spatial study, not final photoreal furnishing approval.

The previous ten concepts remain available for material feedback, explicitly labelled as the earlier arrangement. Their saved annotation session is preserved.

Verification: both native GLBs packed with byte-exact decoded geometry; all seven review cameras load in both designs; the selected camera survives reload and design switching; the measured SVG resolves through the publication asset map; mobile layout fits at 390 px. No browser errors or failed asset requests. The existing kitchen room tests and the 20 principal-board design/image combinations also pass. The publication manifest retains unchanged native-house/geometry checksums and full-house asset entries. Visual review corrected inward furniture face winding and removed neighbouring gallery/stair/tree fragments from the room crop.

## Earlier colour and furnishing board

Ten generated furnishing options continue the chosen Quiet oak palette. This round is confined to the principal sleeping area. The adjoining sitting area and study are documented with current-model references; the dressing room and ensuite remain in the brief. No bedroom scheme has been selected or fitted to the native models.

Both current proposals have the same principal suite room polygons and furniture poses. Each has its own current-model reference capture and feedback state, while the ten concept images are shared. Six captured views have supported, collision-free cameras recorded in `walkthrough/public/interiors/principal/references/captures.json`.

Image source: built-in image_gen, one call per option. Original generated files are preserved; project copies and SHA256 records are in `walkthrough/public/interiors/principal/images/` and `image-manifest.json`. Full prompts are in `prompts.json`. All outputs were visually reviewed for the intended palette and the recognizable existing bedroom arrangement. AI geometry is illustrative and will be reconciled with actual model dimensions during fitting.

Verification: viewer build succeeded using cached current models. Browser checks exercised all ten images in both designs; reference images; correct principal-session JSON exports; cross-room navigation retaining the selected design; isolated local feedback; 1440, 768 and 390 px layouts. Existing annotation checks passed on both room boards: circles, freehand, undo/clear, refresh persistence, shortlist, per-design notes, current-reference toggle and JSON/HTML/PNG downloads. The board loads no house GLB. Browser errors and failed asset requests: zero.

The source of the shared drawing engine remains the kitchen studio file. The viewer build copies it and the shared stylesheet to the principal room; publication creates independent immutable asset maps and a `principal_studio` entry in `release.json`. The existing kitchen manifest and feedback storage key remain compatible.
