# Ashley Heights - planning review issue

Current design: **Proposed (planning application), revision H, 3 October 2026**. The house envelope is unchanged; pool, spa and loggia are excluded. This is a **saved-model review, not ready for submission**. Start with [REQUIRED-ACTIONS.md](REQUIRED-ACTIONS.md).

- [Planning Review.pdf](Ashley%20Heights%20-%20Planning%20Review.pdf): drawings, internal register/risk review, statement and unsigned preparation worksheets.
- [Planning Drawings.pdf](Ashley%20Heights%20-%20Planning%20Drawings.pdf): drawings and schedules only. Still a review issue; excludes PA-000, PA-005 and worksheets.
- `supporting/DAS.pdf`: updated design/planning statement with current scope, model quantities and qualified conclusions.
- `supporting/planning-evidence.pdf`: balanced decision history, extension/replacement comparison and detailed consultant briefs.
- `supporting/pre-application-draft.pdf`: focused council questions; not sent, booked or paid for.
- `supporting/evidence-register.json`: primary sources, outcome status and material differences between cases.
- `supporting/householder-application-form.pdf` and `supporting/cil-form.pdf`: preparation worksheets, not completed official forms.
- `supporting/report-summaries.pdf`: consultant briefs, not commissioned assessments.

| Sheet | Current content | Paper / scale |
|---|---|---|
| PA-000 | Internal drawing register, notes and preparation checklist | A3, NTS |
| PA-001 | Location plan and site plan | A1, 1:1250 / 1:500 |
| PA-002 / PA-003 | Existing / proposed block plans | A1, 1:200 |
| PA-005 | Internal planning risk register | A3, NTS |
| PA-010 | Existing ground, first, roof-space and roof plans | A1, 1:100 |
| PA-011 | Existing garden buildings | A1, 1:100 |
| PA-012 | Existing elevations and sections | A1, 1:100 |
| PA-020 | Proposed basement and ground floor | A1, 1:100 |
| PA-021 | Proposed first floor and loft | A1, 1:100 |
| PA-022 | Retained garden buildings, unchanged | A1, 1:100 |
| PA-030 / PA-031 | Proposed south/north and east/west elevations | A1, 1:100 |
| PA-040 | Proposed roof plan | A1, 1:100 |
| PA-050 / PA-051 | Proposed sections A/B and C/D | A1, 1:100 |
| PA-070 | Existing/proposed street scene | A1, 1:200 |
| PA-080 | Floorspace, coverage, heights and provisional CIL quantities | A3, NTS |
| PA-090 | Materials and opening schedules | A3, NTS |
| PA-100 | Site photographs and key plan | A1, photographs NTS |

A1 drawings print at their stated scale at 100%. Reducing A1 to A3 halves the scale; schedules already use A3. The older PA-013, PA-023, PA-024, PA-041 and PA-060–062 numbering is retired.

From the project root:

```sh
.venv/bin/python -m scripts.planning_drawings.build_pack
.venv/bin/python -m scripts.planning_drawings.build_pack --check
.venv/bin/python -m scripts.planning_drawings.build_pack --sheets PA-040
```

Revision H was deliberately generated with `--snapshot-review --force` from the existing saved exports. `--check` still reports stale source/model provenance: this is expected and is not a submission pass. Historical source hashes have not been rewritten. The prior issue and generator sources are preserved in `revisions/planning-evidence-2026-10-03/before/`; model preservation hashes and retained primary evidence are in that dated folder.

Older numbered copies (` 2`, ` 3`, etc.) are preserved in `revisions/planning-evidence-2026-10-03/superseded-numbered-copies/`, with a move log. The source archive contains 15 successful primary-source retrievals and a retrieval log recording the three council HTML pages that could not be re-downloaded. Those outcomes were checked during the preceding research; a failed later download is not presented as a newly verified decision notice.

The full build stages and checks the issue before replacing generated files. Changed inputs during generation cause it to retain the previous issue. A subset or `--no-docs` build writes a separate dated preview under `checks/previews/`; it does not update the full issue's manifest. The default build uses the planning application design.

Inputs: existing `outputs/output-walkthrough/geometry.json` and `walkthrough/public/navigation.json`; current `outputs/output-proposed-planning/{geometry,navigation}.json`; `proposal/specs/planning-context.json`; registered map/street context and listing photographs. The generator does not modify models, tree scripts, house design specifications or the viewer.

`manifest.json` records input and deliverable hashes, page checks, model timestamps, opening cross-checks and area diagnostics. `--check` covers all of those inputs and outputs. `PACK_CURRENT` means technically current, not ready for submission. Check `checks/submission-readiness.json` and `REQUIRED-ACTIONS.md` separately.

The [September 2026 council checklist](https://www.sevenoaks.gov.uk/download/downloads/id/4896/1_application_for_householder_planning_permission_validation_checklist.pdf) was checked on 23 September. The pack's checklist also includes project-specific tasks; it is not the council's official form. [Council application guidance](https://www.sevenoaks.gov.uk/info/20013/planning_applications/282/apply_for_planning_permission/2) says not to submit validation checklists.
