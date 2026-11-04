# M06 — replacement loft, combined systems and receiver review

26 October 2026. Local structural study only; no publication, native architectural rebuild or construction approval.

## Owner instructions and default scope

The owner confirmed removal of the existing roof and loft joists, followed by a completely new loft floor. Roof **B — replace** and the original-house replacement floor are now enabled by default in 3D, drawings, the register, quantities, dimension export and junction review. Roof A and a disabled loft floor remain explicit comparisons. Lower-storey retained structure is unchanged; original-garage rebuilding remains separate.

There are 134 proposed loft joists across the complete agreed structural plates: 36 original-house, 13 west-extension, 59 main-wing and 26 gallery. The existing loft joists are not represented as surveyed members. Real stair and double-height apertures are preserved. Joist sizes, build-ups and bearings remain experimental.

## Visibility and masonry

The top system buttons now combine as independent toggles, with pressed states and an All members switch. Their union avoids duplicate elements. Joists + hangers and Hangers + infill may both enable hangers; disabling one preserves the other. Switching systems preserves the current 3D camera or drawing view and the user's retained-context setting. Lower category checkboxes remain available for finer selection.

Retained wall context follows the corresponding system when using the grouped buttons. Tall wall bodies are included in every storey they physically cross; their original authoring-level tag no longer hides them upstairs. Retained structure is still excluded from replacement costs.

The previous renderer drew individual bricks/blocks with completely empty mortar joints. A 2 mm recessed display backing now follows each exact leaf solid, closing these visual joints while preserving cavities, actual openings and the coordinated corner shapes. The backing is not additional priced masonry. No unrepresented thick new-wall body was found in the current 626-element architecture register. This is not a claim that the architectural register or construction wall design is complete.

## Receiver revisions

- **M-FR-1-026** extends to the garage/store separation-wall envelope at Y−9.905 and to **M-FR-1-030** at Y−4.23. Its model cut length is 5.5825 m; the simple-span load screen uses 5.675 m between assumed bearing axes. Six crossing infill joists are split and rehung, preserving their original references with additional segment suffixes.
- **M-FR-1-030** becomes one continuous gallery cross-beam, consolidating 018/029. Its ends have nearby architectural wall candidates; bearing pockets, padstones and their load paths remain unverified.
- **M-FR-1-027/033** carried no assigned joist ends. They become doubled timber deck-edge/balustrade trimming reservations instead of steel. Their span, edge loads and fixings still require design.
- **M-FR-3-010** becomes one continuous 8.445 m north transfer proposal, consolidating 011/012. **M-FR-3-001** terminates at its south face, instead of the cross-beam terminating against the long girder. The west inner-leaf bearing/return and east bearing need detailing. No column has been inserted into a room.

Receiver edits occur before joist/hanger generation; explicit connection hierarchy then controls end setbacks. Superseded IDs are retained in consolidation metadata. None of these geometric contacts establishes structural adequacy.

## Limited load screens and open decision

`scripts/structure/support_screen.py` reuses the UK-T01 elastic steel screening method and catalogue. Each changed beam inspector exposes the chosen lower/reference/higher floor-load cases, reactions, deflection and limits. These are sensitivity cases, not guaranteed site bounds. Member stability, connections, bearing, robustness, roof/wall/point loads, temporary works and support movement are not checked.

| Member | Displayed trial | Total deflection, low / reference / high | Limited result |
|---|---|---|---|
| M-FR-1-026 | UB 305×165×40 | 3.79 / 4.18 / 4.72 mm | Within limited floor-only screen; not approved |
| M-FR-3-001 | UB 356×171×51 | 57.05 / 63.08 / 71.51 mm | Fails screen |
| M-FR-3-010 | UB 305×165×40 | 39.08 / 43.05 / 48.60 mm | Fails screen |

The study target is total deflection ≤ min(L/360, 10 mm), not a universal statutory limit. The longitudinal loft girder uses a conservative rectangular floor tributary envelope; its computed end reaction is applied centrally to the transfer. Other reactions remain excluded. Passing this screen does not select a beam.

A hypothetical support over the garage/store division gives two independent simple spans of 6.0985 m and 4.605 m. Reference deflections become 6.65/2.16 mm, with approximately 85 kN combined intermediate ULS reaction in that simplified model. This is **not** a continuous-beam design or an installed support: a viable post/transfer route through first-floor accommodation, lower structure and foundations has not been established. The two long loft steel sections remain explicitly failed reservations pending a viable support scheme or a complete larger-section design.

Reference guidance reviewed: [SCI beam connections](https://steelconstruction.info/topics/design/simple-connections), [NHBC steelwork guidance](https://nhbc-standards.co.uk/downloads/2025/NHBC-Standards-2025-Chapter-6-5.pdf). Existing UK-T01 supplier/load sources remain in the catalogue and trial issue.

## Validation and recovery

- 49 structural Python checks; 28 structural viewer checks pass.
- 12 Chrome screenshots reviewed: default loft, combined systems, plans, build-ups, both receiver arrangements, masonry, elevation and mobile controls. No browser errors, warnings or failed requests.
- 2,719 members/assemblies; 311 floor joists; 95 receivers; 615 linked hanger assemblies.
- Zero unmapped joist ends, zero linked hanger overlaps/seat errors, and no measured steel/joist intersections. Seven deliberate cantilever tips remain.
- 146 scoped solid intersections remain across all options. Bearing pockets, roof clashes, wall junctions and floor-depth issues are not certified resolved. There are 41 open coordination items.
- `make check-layout` retains the identical 345 pre-existing findings. Architecture geometry/navigation hashes match M05.

`original/` preserves the preceding sources/specifications/data for changed existing files. New files are `support_screen.py`, `structure-systems.js` and their focused tests. Rebuild with `make build-structure`; reproduce browser checks using `node revisions/structural-replacement-and-supports-2026-10-26/browser-review.mjs`. Evidence is under `walkthrough/test-results/structural-replacement-and-supports-2026-10-26/`; logs use the same revision prefix.
