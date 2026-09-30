# Ashley Heights — 100 improvement proposals

Open **http://127.0.0.1:8878** on this Mac, or double-click `Open improvement review.command` in the project root. The launcher reuses this review server or starts it on a free local port. It opens Chrome and prints the actual address.

The board contains 100 proposed improvements. **No proposed design changes have been applied, committed or published.** Approval records a preferred direction, not construction sign-off or permission to purchase services. The earlier brochure site-footprint correction was a separate authorised publication and is live.

## Review

1. Filter by room, priority or decision; search titles, descriptions and your notes.
2. Read the finding, proposed change, benefit, trade-off and success check.
3. Open Evidence & drawings to inspect the baseline plan or measured comparison.
4. Approve, defer or reject each proposal and add conditions. Reset is reversible.
5. Use Next unreviewed to continue, or Read as one long list to scan everything.
6. Download list exports a complete Markdown review; Export decisions downloads JSON with all proposals, notes and history.

Choices save to `decisions/decisions.json` on this Mac after the page confirms **Saved to local file**. They are not limited to one browser's storage. An unsaved draft is also retained in that browser if the server becomes unavailable. Concurrent-tab conflicts are shown rather than silently overwriting changes. If a proposal's wording changes, an earlier choice is flagged for re-review and its notes remain.

The page is loopback-only and has no upload, model-edit, Git or deployment action. Closing Chrome does not erase saved decisions. Keep the decisions folder with the review; exports are portable backups.

## What was audited

- Owner brief and accepted house-wide design principles.
- 24 leisure-area specifications, kitchen and principal-suite specifications, relevant authoring scripts and existing room reviews.
- Current brochure's 27 area groups, model-derived plans/elevations, site diagrams and known image corrections.
- Existing geometry/navigation constraints, finish issues, native/web model consistency and publication/build reports.
- Planning preparation register and official Sevenoaks design/amenity guidance.
- Native reference contact sheets. Historical views are explicitly not treated as proof of the current layout when later changes superseded them.

The audit distinguishes measured concept constraints, recorded unresolved facts, owner preferences and optional design opportunities. Survey, construction and consultant work remain separate; there are no invented costs or guarantees of planning permission.

## Files

- `ANALYSIS.md`: findings, priorities and evaluation limits.
- `proposals.json`: complete curated list with stable IDs, evidence and proposal hashes.
- `ALL-100-PROPOSALS.md`: readable offline copy.
- `room-inventory.json`, `existing-detail-inventory.json`: evidence inventory.
- `spatial-comparisons.json`: read-only cinema/games/side-bedroom experiments.
- `cinema-comparison.svg`, `games-comparison.svg`: comparison drawings.
- `ui-verification.json`: isolated functional-test results; no owner decisions were seeded.
- `AUDIT-NOTES.md`: working source reconciliation notes.

Run the server manually with `.venv/bin/python revisions/whole-house-review-2026-09-29/serve.py` from the project root. The app uses Python's standard library and local HTML/CSS/JavaScript; no installation or cloud service is required. Content generation and spatial analysis scripts are separate from the launcher and do not modify the house.

## Native before/after photographs

Eight pairs are currently ready: AH-014 (round dining), AH-018, AH-046, AH-054, AH-058 (games-room replan), AH-060 and AH-062 (stacked laundry), and AH-079 (workshop). Select **With model photos** to see them. Each has matched native renders, full-size image links, a source/camera manifest and a separate downloadable 3D preview. The remaining 92 comparisons are not complete. Coverage and continuation notes are in `model-comparisons/STATUS.md`. No AI image generation is used.
