# Ashley Heights - planning review issue

Current design: **Proposed (planning application)**. This pack is **not ready for submission**. Start with [REQUIRED-ACTIONS.md](REQUIRED-ACTIONS.md).

- [Planning Review.pdf](Ashley%20Heights%20-%20Planning%20Review.pdf): drawings, internal register/risk review, statement and unsigned preparation worksheets.
- [Planning Drawings.pdf](Ashley%20Heights%20-%20Planning%20Drawings.pdf): drawings and schedules only. Still a review issue; excludes PA-000, PA-005 and worksheets.
- `supporting/DAS.pdf`: design/planning statement; policy case references remain research leads to verify.
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

The full build stages and checks the issue before replacing generated files. Changed inputs during generation cause it to retain the previous issue. A subset or `--no-docs` build writes a separate dated preview under `checks/previews/`; it does not update the full issue's manifest. The default build uses the planning application design.

Inputs: existing `output-walkthrough/geometry.json` and `walkthrough/public/navigation.json`; current `output-proposed-planning/{geometry,navigation}.json`; `proposal/planning-context.json`; registered map/street context and listing photographs. The generator does not modify models, tree scripts, design specifications or the viewer.

`manifest.json` records input and deliverable hashes, page checks, model timestamps, opening cross-checks and area diagnostics. `--check` covers all of those inputs and outputs. `PACK_CURRENT` means technically current, not ready for submission. Check `checks/submission-readiness.json` and `REQUIRED-ACTIONS.md` separately.

The [September 2026 council checklist](https://www.sevenoaks.gov.uk/download/downloads/id/4896/1_application_for_householder_planning_permission_validation_checklist.pdf) was checked on 23 September. The pack's checklist also includes project-specific tasks; it is not the council's official form. [Council application guidance](https://www.sevenoaks.gov.uk/info/20013/planning_applications/282/apply_for_planning_permission/2) says not to submit validation checklists.
