# Principal suite — revised layout study

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
