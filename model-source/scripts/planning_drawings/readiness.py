"""Human-readable handover generated alongside every planning issue."""
import json


def write_readiness(out, manifest):
    checklist = json.loads((out / 'checks/validation-checklist.json').read_text())
    risks = json.loads((out / 'planning-risk-register.json').read_text())
    outstanding = [r for r in checklist if r['status'] not in ('satisfied', 'n/a')]
    lines = [
        '# Ashley Heights - required actions before submission', '',
        f"Review issue {manifest['revision']}, generated {manifest['built']}. Current design: {"Proposed (planning application)" if manifest["variant"] == "planning" else "Proposed"}.", '',
        '**Not ready for submission.** The drawing generation checks and the planning submission requirements are separate. No application has been lodged. Worksheets are unsigned and do not replace official forms; consultant briefs are not completed reports.', '',
        '## Priority actions', '',
        '1. Commission a measured building and topographical survey, then reconcile plans, heights, levels, boundaries and floorspace. Confirm the application red line, any blue-line land and title interests.',
        '2. Obtain the licensed location-plan base; verify address/postcode, legal applicant details, ownership certificate, declarations and application fee. No signature or certificate choice has been inferred.',
        '3. Complete the official CIL additional information form using verified areas, demolition quantities and lawful-use evidence. Confirm exemption eligibility; obtain any exemption before work begins.',
        '4. Commission tree and ecology assessments. Confirm TPOs, ancient/veteran tree constraints and any further bat surveys. The model tree improvements do not replace a BS5837 survey.',
        '5. Resolve basement structure, groundwater, excavation and drainage with the relevant consultants. Verify flood and heritage constraints rather than relying on the current assumptions.',
        '6. Confirm a workable bin/cycle layout and access splays with the highway adviser.',
        '7. Verify neighbour levels, flank window opening restrictions and daylight effects. Obtain the cited precedent decision notices and confirm the local character-area policy.', '',
        '## Model and schedule diagnostic', '',
    ]
    for name, diagnostic in manifest['footprint_consistency'].items():
        lines.append(f"- {name.capitalize()}: wall extraction {diagnostic['wall_envelope_m2']:.1f} m²; room-envelope estimate {diagnostic['room_envelope_m2']:.1f} m²; difference {diagnostic['difference'] * 100:.1f}%. {'Within the 5% diagnostic tolerance.' if diagnostic['pass'] else 'Reconciliation required.'}")
    lines += ['', 'These are two model extraction methods, not survey measurements. The schedule uses room envelopes plus a nominal wall allowance. A failed diagnostic is now exposed instead of being recorded as an unconditional pass.', '',
              '## Outstanding register', '', '| Ref | Action | Evidence / location |', '|---|---|---|']
    for item in outstanding:
        lines.append(f"| {item['item']} | {item['requirement']}: {item['note']} | {item['where']} |")
    counts = {v: sum(r['verdict'] == v for r in risks) for v in ('red', 'amber', 'green')}
    lines += ['', '## Planning judgement', '',
              f"The concept risk register has {counts['red']} red, {counts['amber']} amber and {counts['green']} green items. These colours do not establish consent or validation readiness. Particular review points are the front wing scale, dormers, neighbour amenity.", '',
              '## Current evidence and reference sources', '',
              '- [Sevenoaks householder validation checklist, September 2026](https://www.sevenoaks.gov.uk/download/downloads/id/4896/1_application_for_householder_planning_permission_validation_checklist.pdf). Checked 23 September 2026. The register above combines relevant council requirements with project-specific preparation tasks.',
              '- [Sevenoaks application guidance](https://www.sevenoaks.gov.uk/info/20013/planning_applications/282/apply_for_planning_permission/2): the council says not to submit its validation checklists. The drawings-only PDF therefore excludes PA-000, PA-005 and the preparation worksheets. Verify photograph/base-map publication rights.',
              '- [Sevenoaks CIL guidance](https://www.sevenoaks.gov.uk/info/20075/community_infrastrucure_levy/305/cil_guidance_for_planning_applicants) and [national CIL guidance](https://www.gov.uk/guidance/community-infrastructure-levy): official additional information and eligibility evidence remain outstanding. Any claimed residential extension exemption must be obtained before commencement.',
              '- [Manual for Streets, Table 7.1](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/3891/pdfmanforstreets.pdf): 25 m corresponds to 20 mph; 43 m to 30 mph. The shown 25 m splay is a concept pending speed and highway verification.',
              '- [Sevenoaks Residential Extensions SPD](https://www.sevenoaks.gov.uk/downloads/download/141/residential_extensions_spd): retained as the design-policy reference. The precedent case files and site-specific constraints have not been independently verified in this issue.', '',
              '## Regenerate after parallel model work', '',
              'Run `.venv/bin/python -m scripts.planning_drawings.build_pack`, then the same command with `--check`. Builds read the saved geometry/navigation and do not modify the trees, model or viewer. If inputs change during generation, the previous issue is retained. A partial sheet build writes a separate preview and never marks the whole pack current.', '']
    (out / 'REQUIRED-ACTIONS.md').write_text('\n'.join(lines))
    (out / 'checks/submission-readiness.json').write_text(json.dumps({
        'ready': False, 'outstanding': outstanding, 'risk_counts': counts,
        'area_reconciliation_required': any(not r['pass'] for r in manifest['footprint_consistency'].values()),
        'official_forms_completed': False, 'application_submitted': False,
    }, indent=2) + '\n')
