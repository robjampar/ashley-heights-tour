# BB02 — selected beam-and-block garage deck

9 November 2026. The owner instructed **“lets go with block and beam”** after reviewing the potential saving in temporary formwork beneath a poured slab. Beam and block is now the selected system and default for the garage floor / basement roof. Solid RC is retained as an alternative. No saving is represented as quoted or proven.

## What changes

- The specification records `defaultOption: beam-block` and `ownerSelectedSystem: true`.
- Fresh standalone and normal walk/fly structural views select beam and block. An explicit `garageDeck=solid-rc` link still opens the alternative.
- Plans, quantities, cost/CSV exports and the foundation comparison use the selected system. Raw data consumers and installed browser data select the same members without counting both floors.
- The enquiry PDF identifies beam and block as the owner's selected system and asks suppliers to design and price suitable beam sizes, spacing, reinforced topping, bearings and temporary works.
- The original slab is explicitly tagged as an RC comparison in the data and inspector. Its geometry/calculations remain available for audit and comparison.

[Open the selected deck](http://127.0.0.1:8765/structure/?deckView=framing). The updated [supplier enquiry PDF](garage-deck-enquiry.pdf) is also linked in the inspector.

## What the selection means

This selects the **construction system**, not the displayed 150 mm precast section or 100 mm topping as a completed design. `detailedSizingAccepted` and `approvedForConstruction` remain false. The current geometry still needs supplier/engineer development, especially under the separate wheel/jacking sensitivities. The enquiry asks for 225 mm beams or another suitable arrangement where required, rather than treating the earlier shallow illustration as verified.

The agreed **3.5 t laden van plus 3.1 t Tesla, potentially together**, remains the vehicle brief. No loads, beam dimensions, block cuts, support positions, floor/ceiling datums, material quantities or capacity calculations were relaxed to make the selected scheme appear compliant. The pre-existing geometry audits and load limits remain visible.

The base audit dataset retains the RC geometry and original foundation calculation for comparison. `garageDeckDefault` and the selected scheme payload tell consumers which option applies. The viewer's active foundation display uses the beam-and-block self-weight and associated uplift sensitivity; variable vehicle weights are not treated as permanent uplift resistance.

## Verification and recovery

`validation.json` records the actual tests, browser results, PDF render checks and source hashes. Browser evidence is in `walkthrough/test-results/beam-block-selection-2026-11-09/`. The dated BB01 and VB01 records preserve the earlier comparison and loading investigation.

`original/` and `recovery.json` preserve the previous source/data/PDF issue. The normal house finishes remain at the same geometric envelope. No native Blender rebuild, supplier message, procurement, commit or publication was performed.
