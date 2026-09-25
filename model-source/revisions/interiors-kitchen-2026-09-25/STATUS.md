# Quiet oak kitchen — fitted in both current designs

Owner selected concept 01 and requested native detail down to oven buttons. Completed the kitchen and informal/garden dining furniture in Proposed and Proposed (planning application). The existing reconstruction, six additional alternatives and G1 remain separate.

Native geometry: 1,158 new meshes in Proposed; 848 in Planning. Includes independent oven knobs, 12:00 display segments, scale marks and touch controls; hob burners or induction controls; sink bowl/drain and curved mixer; cabinet joints/grips/plinths; limestone worktops and floors; soft curved chair backs, seams and tapered legs; pendants and fixings; ceramic vessels, individual leaves/fruit, cups, pepper mills, chopping-board hanging eye and linen folds/hem.

Build: both models plus viewer completed in approximately 400 seconds. Original source preservation passed in both. 13,883 retained Proposed meshes and 13,177 retained Planning meshes are unchanged, including every vertex and face. No unintended furniture overlaps were found. Native files are in `output-proposed-compact` and `output-proposed-planning`.

Validation:

- 115 viewer unit tests, 26 pipeline tests and seven saved-model finish/loft regressions passed.
- 144 Proposed and 108 Planning walking-route checks passed in both directions and at two body widths. The garden dining route now uses the clear east aisle around the new eight-chair arrangement.
- All 33 Proposed and 31 Planning room-access checks passed. The specific kitchen flood check passes with a 500 mm body, including both sides of furniture, the side living opening and Proposed's garden dining aisles.
- Both full browser models have the selected interior metadata, three correctly textured materials, 46 oven control meshes and a real open sink recess.
- 28 planning kitchen-white probes, 20 loft-wall probes and 88 exterior face/finish probes passed after rebuilding.
- The ten-option board passed annotation, local storage, per-design notes, shortlist, undo/clear, reference switching, PNG/HTML/JSON export and mobile coordinate checks. Comparison images are explicitly labelled generated concept versus actual native render.

Export issue fixed at source: Blender's glTF exporter followed the Bump node to a colour image and used that image as tangent normals. Native height nodes are preserved; their links are temporarily omitted during glTF export and restored afterward. The browser uses a separate linear height copy at a sub-millimetre relief scale. Authored UVs now survive lossless packing and material batching. Quiet oak material names bypass the generic procedural wood shader, including their ceramic and metal pieces.

The isolated room is at `model/interiors/kitchen/model.html`; the drawing/annotation board is at `model/interiors/kitchen/`. Source, prompts, textures, original camera references and restoration instructions are included in the source snapshot. The room models are losslessly packed to about 13.2 MB and 12.1 MB.

The generated references remain visual targets, not measured drawings. Native furniture fits the actual house envelope and verified routes. Browser lighting differs from Cycles; neither renderer is labelled photo-identical. Adjacent rooms are reserved for later room sessions.
