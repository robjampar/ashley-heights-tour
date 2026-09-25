# G1 · Gate-aligned frontage

A separate alternative based on **Proposed**, requested on 25 September 2026. Open `?design=g1` in the house tour; Proposed and the planning application remain independent choices.

The front entrance doors, garage door and west elevation follow the measured main-gate axis, 24.839° west of north. The wing tapers within its previous east and south limits, from 9.05 m wide at the retained junction to 3.68 m at the southern end. The entrance link keeps its position and angle. The original house and its source files are retained.

## Programme

- Seven bedrooms, five with private en suites.
- Principal suite with a study desk, walk-through wardrobe and bathroom.
- A 6.0 × 5.3 m clear double garage, with a 5.2 m door and two unscaled 4.4 × 1.8 m model cars.
- Gym in the broader northeast part of the wing; utility in its southern wedge.
- Existing proposed kitchen, living spaces, pool, cinema and wine bar retained.
- Four outside parking spaces, in addition to the double garage.

The narrower roof slopes down toward the front and stays below the retained 8.05 m ridge. Its reduced loft space becomes storage. To retain seven bedrooms, the existing proposed upstairs family lounge becomes a guest bedroom with an en suite. The original loft workspace remains.

The cellar keeps its current proposed footprint. The area exposed by the narrower wing becomes paved forecourt over the cellar roof. Its stair moves 1.5 m north at the same width, rise and going; the games sofa moves clear of its approach. The existing loft stair remains in place, with a small extension to its ceiling aperture for headroom.

## Review and reproduction

The native model, geometry, navigation and all option-specific checks are under `output-redesign-g1/`. Checks cover gate parallelism, retained link geometry, room envelope fit, seven-bedroom access without crossing other bedrooms, private en-suite access, two-way stair traversal, actual stair headroom, six compact-car parking positions and pedestrian access beside both garage cars. Read the individual reports for scope and limitations.

Build the native option from the saved Proposed checkpoint:

```sh
Blender --background --python-exit-code 1 --python scripts/build_redesign.py -- g1
```

Then run `scripts/regenerate_gate_aligned.py` for the checked browser issue. This option uses the same house-only wall finishes and dark/light roof switches. Dormer cheeks remain tiled.

This is a concept comparison, not an approved planning scheme or construction design. The reduced footprint does not establish planning acceptability; the street elevation, trees, neighbours, cellar structure and drainage still need measured professional assessment. The car study is for the model's compact cars and does not prove SUV fit or real vehicle door sweeps.
