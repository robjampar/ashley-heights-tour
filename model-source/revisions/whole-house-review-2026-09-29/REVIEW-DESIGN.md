# Whole-house review — local approval board

## Scope
100 proposed improvements, not implemented changes. Owner review first. Work until 08:00 BST on 29 September 2026. Default balance: mostly house/garden, some model/presentation/build improvements. Retain approved oak/limestone/ivory interiors, brick Proposed exterior, roof forms, headboards, fixed TVs, full room brief and minimal original-house changes.

## Interface research and references
- Existing local kitchen studio: options + selected detail + explicit shortlist + notes + export. Reuse its warm restrained appearance and explanation of concept status, but improve persistence by saving decisions to a local JSON file.
- Nielsen Norman Group, Data Tables: Four Major User Tasks: https://www.nngroup.com/articles/data-tables/ — scanning, comparison and acting on records inform a compact searchable proposal list with a separate detail pane.
- NN/G, Bulk Actions: https://www.nngroup.com/videos/bulk-actions-design-guidelines/ — explicit selection and reversible feedback. No global approve-all action: each proposal merits review. All decisions remain reversible.

## Journey
Open local page → understand scope and counts → choose room or priority → read observation, proposal and trade-off with source/image → approve, defer or reject → add conditions → move to next undecided item → export review. Reload must preserve choices. Approval records a preference; it does not run design code or deploy.

## Desktop sketch
┌ Ashley Heights / Whole-house review          Save status • Export ┐
│ 100 proposals · local only   Approved / Deferred / Rejected counts │
│ Search…              Area ▾      Status ▾      Priority ▾          │
├─────────────────────────┬─────────────────────────────────────────┤
│ ID / title / area       │ 017  Improve bedside night controls      │
│ concise opportunity     │ [current source image / plan]             │
│ status / effort         │ What I found → proposed change            │
│ … scrollable list       │ Why / trade-offs / evidence / scope       │
│                         │ Approve  Defer  Reject   Reset             │
│                         │ Notes / conditions…                        │
│                         │ ← Previous          Next undecided →       │
└─────────────────────────┴─────────────────────────────────────────┘

Mobile: list then selected detail, focus heading on selection, back-to-list button. Controls remain touch-sized. No modals required for individual reversible decisions.

## Data and trust
Stable IDs; category; area; priority; scale; evidence basis (measured/recorded/design opportunity); source paths; observation; change; benefit; trade-off; validation; image/plan references. One item = one owner decision. Avoid splitting one obvious task into cosmetic duplicates. Distinguish specification notes that are stale from actual current model faults.

Local server binds loopback only. Save individual decisions atomically, retain history, export JSON and human-readable Markdown. No dependencies on CDN or accounts. Status must not claim a disk save before acknowledgement. Tests use temporary decisions, never seed approvals into the owner's real board.

## Matched native model photographs — 29 September owner refinement
The owner explicitly requires before/after photos from the 3D model. Use native Blender renders, not image-generated decoration. Existing kitchen/principal studio reference grids demonstrate useful side-by-side framing, but their AI concept method is not used here. Each verified pair has identical source, camera, resolution and photographic lighting. The after is a separate preview variant; no accepted model is overwritten. Show the source revision and a concise exact-change caption. Investigations/nonvisual changes must not be falsely presented as visible completed improvements.

Sketch: proposal heading → [BEFORE native render | AFTER isolated variant] → caption and open-full-size links → findings/trade-offs → decision. On mobile stack the same two labelled views. Pairs sit above the written proposal rather than hidden in Evidence. Loading must be lazy. A separate manifest allows pairs to arrive without changing proposal wording or invalidating owner decisions.

## Larger-alternative review journey
Owner asks for more substantial ideas. Retain the existing compare/approve interaction, but open on twenty larger layout/design moves. Preserve all 100 IDs and historical decisions; changed wording produces a new proposal hash and forces re-review. Keep small detail options accessible via All priorities. Native before/after comparisons stay immediately below the selected title.

## Owner round-dining direction
AH-014 now compares the existing rectangular table with a centred 1.70 m round pedestal table and eight chairs. Retain the established paired-native-photo UI; use the evidence panel for the scaled chair-pullback plan and measured trade-offs. Approve/defer/reject continues to record direction only. Default recommendation filter selects a visible item; direct links to smaller items clear that filter.
