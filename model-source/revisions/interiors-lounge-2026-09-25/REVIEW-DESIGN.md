# Quiet oak refinement and TV lounge

Owner direction: more detail, plants, TV space around the corner, and closer colour/design matching to selected AI image 01. Existing architecture remains measured source geometry.

Reference comparison before edits: current oak is too orange, limestone floor too pale and uniform, olive sprays too angular, pendants too white. Target subdued natural oak, beige limestone with fine light grout, cream linen and gently warm opal. Keep the existing oven controls and sink details.

Layout sketch, north at top (metres in existing model coordinates):
```
                 Garden opening y=8.82
west wall     ┌──────────────────────────┐ east / kitchen
              │ console    sofa │ clear │
              │ TV →       ←    │ route │
y=5.84        │                 │       ├─ kitchen opening
west window   ║   table         │       │
              ║  plant                 │
              │                        │
west door     ║          cellar stairs  │
              └──── front windows ──────┘
```
TV occupies the solid wall north of the west window. Console x=-5.01..-4.59, y=5.96..8.34; sofa x=-2.70..-1.73, y=5.76..8.34. Passage behind sofa is over 1.6 m to east wall before planting; cellar stair void x=-2.12..-.22,y=.69..3.20 remains untouched. Native collision and whole-house routes will validate actual clearances.

UI research: SketchUp's saved scenes (https://help.sketchup.com/en/sketchup/creating-scenes) provide named repeatable camera views. Adopt the existing room camera buttons for TV lounge and planting, with URL view state so links open the intended view. No new navigation mode or overlay is needed.

User journey: kitchen comparison → TV lounge camera → orbit details → switch Proposed/Planning while retaining camera → return to kitchen to compare with selected AI image. Full-house and reference links retain current design. The new TV view has its own native render; the comparison remains kitchen-to-kitchen, with accurate captions.

UI mock:
```
Quiet oak, in 3D.                       [Proposed / Planning]
[Kitchen] [TV lounge] [Plants] [Oven] [Table] [Sink] [Reset]
┌─────────────────────────────────────────────────────────┐
│                   Interactive room                      │
└─────────────────────────────────────────────────────────┘
Selected AI kitchen reference       Fitted kitchen render
```

Furniture references: cream modular forms with oak/neutral finishes align with BoConcept's beige/oak collection (https://www.boconcept.com/en-it/shop/beige-sofas/beige/oak/). Model custom dimensions to this room; no claim that the result is a particular commercial product.
