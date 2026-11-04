# Garden room and terrace corner — 20 October 2026

The owner confirmed the garden-facing east corner and the roof terrace above. The 2 m setback is measured along both adjoining walls, from the already inset glazing corner at (4.0, 14.1). A 2.828 m diagonal connects (2.0, 14.1) to (4.0, 12.1), giving two 135° internal junctions and removing 2 m² of enclosed floor.

Two new diagonal glass panes and shortened adjacent fixed bays retain the existing doors and hardware. Floor, ceiling, roof slab and terrace finish are genuinely clipped and closed. Continuous mitred frame rails, headers, fascia, drainage and timber balustrades follow the cut. The three rooflights stay unchanged. A stone apron finishes the outside cutout.

The indoor dining group moves 450 mm west and 200 mm south. The terrace café group moves 800 mm west and 400 mm north, including its lamp and tableware, to clear the new guard and rooflights. Two nearby edge fittings move with the corner. The garden room shortcut, floor polygons and collision segments follow the revised geometry.

Canonical implementation: `scripts/model/proposal_garden_chamfer.py`, registered after the existing rear inset pass for Compact only. Immediate native, public, visual and source recovery copies are in `original/`, with hashes in `recovery-manifest.json`. Isolated prepared assets are in `outputs/output-garden-chamfer-compact/`.

Evidence: `walkthrough/test-results/garden-corner-chamfer-2026-10-20/`. Four native renders were visually inspected, including both corner joins and the terrace. Native rendering uses neutral inspection lighting; these are not browser screenshots. Browser inventory was empty and Chrome application access timed out. The existing broader terrace route metadata includes legacy routes; the new café approach and retained door/diagonal approaches are explicitly tested.

This is a targeted local update. Planning and retained original scenes are preserved. No full model rebuild, drawing-pack regeneration or publication is claimed. Final checks are recorded in `final-validation.json` when complete.

Final verification: 234 viewer tests and 107 Python tests pass. Exported mesh geometry, native scene preservation and both 192-sample daylight audits pass. The local server serves the current model. The layout check has exactly its 345 pre-existing findings. Four native views were reviewed; browser screenshot review remains unavailable. No publication.
