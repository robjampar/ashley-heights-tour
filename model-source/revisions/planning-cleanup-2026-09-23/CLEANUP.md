# Planning cleanup - 23 September 2026

The current proposal is the former compact/Proposal B design. The planning generator reads its saved exports. No model, tree script, design specification, browser source or deployed tour was edited by this cleanup.

## Removed and retained

- Consolidated 169 historical logs into `historical-build-logs.zip`, checked byte-for-byte before removing the loose copies.
- Removed 14 obsolete regenerable planning caches.
- Net space recovered from those operations: 864.4 MB (decimal).
- Inspected historical Blender backup files; none were byte-identical, so they were retained.
- Kept source photographs/plans, existing/proposed native files, base specifications and previous model stages. Older stages remain inputs to reconstruction and comparison scripts; `output-final` in particular feeds `create_walkthrough_revision.py`.
- Replaced stale P6 start pages and the old latest notice. The proposed-model launcher now points at the current compact file.
- Removed the unused planning-sheet functions for the retired 27-sheet numbering; the current issue contains 20 drawing numbers.

`cleanup-manifest.json` lists every removed path and recovery source or reason. `before-cleanup.zip` preserves the previous planning issue, generator, context and guides. `changes.patch` records modifications to those pre-existing text files. New helper modules and tests are in the project itself.

## Corrections

The rebuilt issue fixes stale sheet references, A1/A3 register labels, detached garden-building floor classification, missing garden-building plan cuts/elevations, the omitted new swimming pool in the works description, and misleading roof/material/plant descriptions. Ownership and declaration fields are unsigned; the CIL worksheet no longer assumes lawful use, zero demolition or exemption eligibility. Flood/heritage assumptions and precedent evidence remain open checks.

Full issues are staged, source-hashed and protected against concurrent input changes. Partial builds publish previews separately. Missing/tampered PDFs and navigation/context changes now make the freshness check fail. Review and drawings-only bundles are separate. Footprint disagreement is reported as requiring reconciliation instead of an unconditional pass.

The current council householder validation checklist (September 2026) and CIL guidance were reviewed. See `proposal/planning/REQUIRED-ACTIONS.md` for the outstanding evidence and source links. No application was submitted and no external messages were sent.

## Verification

Regression tests cover freshness, missing/tampered files, partial issues, concurrent model changes, unsigned declarations, sheet references, designation logic, ground-level garden buildings and horizontal mesh cuts. Final PDF review and issue hashes are recorded in the planning manifest and QA record.

Final issue: 20 drawing numbers, 32 review pages, 21 drawings-only pages; 12 regression tests passed. All final pages were visually reviewed; PDF integrity and source/output freshness checks passed. See `verification.json` and `visual-proof.zip`.
