# Kitchen and dining: design session 01

User journey: open ten options → inspect one at useful size → circle favourite details → add why/where → shortlist → export feedback for the next fitted proposal. Keep work confined to this area for Proposed and Proposed (planning application).

Research: Milanote supports drawing directly over images with marks resizing with the image (https://help.milanote.com/en/articles/5537688-drawing). Figma keeps comments anchored to visual context (https://help.figma.com/hc/en-us/articles/360039825314-Guide-to-comments-in-Figma). Adopt their direct annotation and contextual feedback patterns; do not require another account or a complex canvas editor.

Local precedent: existing six-option review uses light neutral surfaces, large images, concise option headings and direct links back to the house. This page should be a quieter working board with one photograph dominating the screen.

Mock A (chosen, desktop):
```
Ashley Heights / Interiors                 Back to house    Export feedback
Kitchen & dining             Session 01 · Proposed + planning
[01 thumb] [02 thumb] [03 thumb] [04 thumb] ... horizontally scrollable
┌───────────────────────────────┬──────────────────────┐
│                               │ 01 Warm oak          │
│       LARGE ROOM IMAGE        │ Short material story │
│                               │ [☆ Shortlist]        │
│      circled details          │ Circle / Freehand    │
│                               │ Undo · Clear marks   │
│                               │ What do you like?    │
│                               │ [Notes textarea]     │
└───────────────────────────────┴──────────────────────┘
[Current room & constraints, expandable]    [Previous] [Next]
```
Mock B (rejected): a ten-card masonry board with drawing on each. Too small for reliable furniture/material feedback; lots of scrolling and accidental marks.

Mobile sketch: title → scrolling thumbnail strip → full-width image → Circle/Freehand/Undo toolbar → short description/shortlist → notes. Draw mode prevents browser panning only on the image; page remains scrollable around it. Always provide a Browse mode.

Data model: ten concept records, each linked to generation prompt, source reference and immutable image; feedback keyed by session + concept ID, with normalized coordinates, notes and shortlist boolean. State saves locally, and feedback can be exported as a JSON file and standalone HTML contact sheet with annotated images. No automatic external sending. Explain local-only storage and explicit handoff concisely.

Controls: circle is default deliberate tool, freehand optional, browse mode for touch; undo removes one stroke, clear marks leaves notes. Save status, keyboard-accessible previous/next and option buttons. Current-room references selectable by design, with no GLB dependency on this page.

Reality boundary: AI concepts guide materials, furniture and cabinetry; preserve structural envelope in prompts. Verify the selected combination against measured geometry and both designs before native model changes. Main models remain at their verified current issue during this preference round.

## Selected scheme → native room preview

Owner selected 01 Quiet oak before the board was delivered and asked for a detailed native model matching the images. Add a lightweight separate 3D room preview to the studio, using the same page framing. Controls mirror model data: Proposed / Planning, Kitchen / Reverse / Dining / Oven detail / Table detail, orbit/zoom, and a link to the full house. Fixed comparison cameras provide the direct image-to-model review journey; only nearby room geometry is exported for this view. Keep material detail in native geometry and GLB, not a photograph laid over the room.

Sketch: header with Back to ideas / Full house; selected scheme heading; design selector and camera buttons; large 3D canvas; compact instructions. This reuses the studio visual language and existing house renderer lighting. No new drawing controls in the 3D view; annotations remain on the concept board.
