# West recess exterior finish correction

The exterior faces covering M-WM01-WEST-RECESS-BRICK had inherited the internal white-plaster material. They therefore stayed white when the normal viewer's exterior finish was set to brick.

The west-facing skin of `Proposal | West recess upper facade`, `WM01 | West recess exterior closure` and `WM01 | West recess floor-band closure` now uses the existing tagged exterior brick material. It follows the same brick/render control as neighbouring walls. Room-side faces retain plaster. No wall, window, floor, beam or joist geometry changed; all 2,576 structural member geometries are identical to the preceding WM01 issue.

The current native, GLB and navigation were updated through the guarded WM01 staging driver, with seven retained scenes preserved. Compact furnishings/daylight and structural data were refreshed, followed by the local web build. This is a targeted material correction, not a full-source house rebuild. Nothing was published.

`original/` and `recovery.json` preserve the preceding source and models. `installation.json` records the exact four native faces across three objects. Browser evidence is in `walkthrough/test-results/west-recess-brick-2026-10-29/`: a close-up with brick selected reproduces the white strip before the fix; the after review also checks the interior and render option. Existing appearance/floor tests and the WM01 masonry tests verify the relevant behaviour. The workspace-layout findings remain at the previous baseline.
