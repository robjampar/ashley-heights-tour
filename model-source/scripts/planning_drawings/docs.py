"""Text and table sheets rendered from HTML with pymupdf.Story: drawing
register and checklist (PA-000), risk register (PA-005), floorspace schedule
(PA-080), materials and openings schedule (PA-090), Design & Access Statement,
application and CIL forms, report summaries."""
import html, json, datetime
from pathlib import Path
import pymupdf

A3L = pymupdf.paper_rect('a3-l'); A4 = pymupdf.paper_rect('a4')

CSS = """
body{font-family:'Helvetica',sans-serif;font-size:8.2pt;color:#1f2a2e;line-height:1.32}
h1{font-size:15pt;margin:0 0 3pt 0;color:#1f2a2e} h2{font-size:10.5pt;margin:10pt 0 3pt 0;color:#1f6f66;border-bottom:0.6pt solid #1f6f66;padding-bottom:1pt}
h3{font-size:9pt;margin:7pt 0 2pt 0} p{margin:0 0 4pt 0;page-break-inside:avoid} .muted{color:#5e6b70;font-size:7.4pt}
table{border-collapse:collapse;width:100%;margin:3pt 0 6pt 0} th,td{border:0.4pt solid #9aa3a6;padding:2pt 3.5pt;vertical-align:top;font-size:7.6pt;text-align:left}
td.num,th.num{text-align:right} .tag{font-weight:bold}
.red{color:#9f3025} .amber{color:#75500e} .green{color:#285a3d} .hdr{border-bottom:1.2pt solid #1f2a2e;padding-bottom:4pt;margin-bottom:8pt}
.hdr .right{float:right;text-align:right} .small{font-size:7pt} .box{border:0.6pt solid #9aa3a6;padding:4pt;margin:4pt 0}
"""


def header(ctx, number, title, subtitle=''):
    return (f'<div class="hdr"><div class="right"><b>{number}</b> &nbsp; Rev {ctx.revision}<br/>{ctx["sheet_status"]} · {ctx.issue_date_text}</div>'
            f'<h1>{html.escape(ctx["project"].upper())} — {html.escape(title)}</h1>'
            f'<div class="muted">{html.escape(ctx["address"])} · Title {ctx["title_number"]} · {html.escape(ctx["lpa"])} · {html.escape(ctx["application_type"])}'
            + (f'<br/>{html.escape(subtitle)}' if subtitle else '') + '</div></div>')


def html_to_pdf(body, path, rect=A3L, margin=28, compact=False):
    story = pymupdf.Story(html='<html><body>' + body + '</body></html>', user_css=CSS + (' table th,table td{font-size:7.2pt;padding:1.1pt 3.5pt;line-height:1.12} h2{margin-top:7pt}' if compact else ''))
    writer = pymupdf.DocumentWriter(str(path))
    more = True
    while more:
        dev = writer.begin_page(rect)
        more, _ = story.place(rect + (margin, margin, -margin, -margin))
        story.draw(dev)
        writer.end_page()
    writer.close()
    with pymupdf.open(str(path)) as document:
        for index, page in enumerate(document):
            page.insert_text((margin, page.rect.height - 14), f'Ashley Heights | {Path(path).stem} | Review issue | {index + 1} / {len(document)}', fontsize=7, color=(.37, .42, .44))
        document.saveIncr()
    return Path(path)


def table(rows, head=None, classes=None, num_cols=()):
    out = ['<table>']
    if head:
        out.append('<tr>' + ''.join(f'<th{" class=num" if i in num_cols else ""}>{html.escape(str(h))}</th>' for i, h in enumerate(head)) + '</tr>')
    for r_i, r in enumerate(rows):
        cls = classes[r_i] if classes else ''
        out.append(f'<tr class="{cls}">' + ''.join(f'<td{" class=num" if i in num_cols else ""}>{c if isinstance(c, str) and c.startswith("<") else html.escape(str(c))}</td>' for i, c in enumerate(r)) + '</tr>')
    out.append('</table>')
    return ''.join(out)


# ---------------------------------------------------------------- PA-000
def register_sheet(ctx, sheets_manifest, checklist, replace_items, path):
    rows = [[m['sheet'], m['title'], ', '.join(f'1:{s}' for s in m['scales']) or 'NTS', m.get('paper', 'A3'), ctx.revision] for m in sheets_manifest]
    body = header(ctx, 'PA-000', 'Drawing register, notes and validation checklist')
    body += '<h2>Drawing register</h2>' + table(rows, ['No.', 'Title', 'Scale at stated paper size', 'Paper', 'Rev'])
    body += '<p class=box><b>Review issue. Not ready for submission.</b> The forms are unsigned preparation worksheets; report notes are not commissioned assessments. See REQUIRED-ACTIONS.md.</p>'
    body += '<h2>Proposal</h2><p>' + html.escape(ctx['proposal_description']) + '</p>'
    body += '<h2>Site designations (assumed for this working issue — verify on the Sevenoaks policies map)</h2>'
    d = ctx['designations']
    body += table([[k.replace('_', ' ').capitalize(), ctx.designation_text(k)] for k in ('green_belt', 'aonb', 'conservation_area', 'listed_building', 'tpo', 'flood_zone', 'article_4_direction')], ['Designation', 'Status'])
    body += '<p class="small">' + html.escape(d['basis']) + '</p>'
    body += '<h2>Validation checklist — Sevenoaks District Council householder requirements</h2>'
    crow = []; ccls = []
    for item in checklist:
        crow.append([item['item'], item['requirement'], item['where'], item['status'].upper(), item.get('note', '')])
        ccls.append({'satisfied': 'green', 'deferred': 'amber', 'external': 'amber', 'n/a': ''}.get(item['status'], ''))
    body += table(crow, ['Ref', 'Requirement', 'Where in this pack', 'Status', 'Note'], ccls)
    body += '<h2>Items to replace before submission</h2>' + table([[a, b] for a, b in replace_items], ['Item', 'What this issue uses and what the submission needs'])
    body += '<h2>General notes</h2><p>' + html.escape(ctx['existing_drawings_basis']) + '</p><p>' + html.escape(ctx['levels_basis']) + '</p>'
    body += '<p class="muted">Generated by scripts/planning_drawings from the saved model; see manifest.json for the geometry checksums.</p>'
    return html_to_pdf(body, path)


# ---------------------------------------------------------------- PA-080
def floorspace_sheet(ctx, ex_rows, pr_rows, garden_rows, gb, cil, heights, coverage, path):
    body = header(ctx, 'PA-080', 'Floorspace, footprint and volume schedule')
    body += '<h2>Floor areas — existing dwelling</h2>' + table([[r['label'], f"{r['external_m2']:.1f}", f"{r['gia_m2']:.1f}", f"{r['rooms_m2']:.1f}"] for r in ex_rows] + [['Total', f"{sum(r['external_m2'] for r in ex_rows):.1f}", f"{sum(r['gia_m2'] for r in ex_rows):.1f}", f"{sum(r['rooms_m2'] for r in ex_rows):.1f}"]], ['Level', 'External area m² (to outer wall face)', 'GIA m² (inner face)', 'Sum of room polygons m²'], num_cols=(1, 2, 3))
    body += '<h2>Floor areas — proposed dwelling</h2>' + table([[r['label'], f"{r['external_m2']:.1f}", f"{r['gia_m2']:.1f}", f"{r['rooms_m2']:.1f}"] for r in pr_rows] + [['Total', f"{sum(r['external_m2'] for r in pr_rows):.1f}", f"{sum(r['gia_m2'] for r in pr_rows):.1f}", f"{sum(r['rooms_m2'] for r in pr_rows):.1f}"]], ['Level', 'External area m²', 'GIA m²', 'Sum of room polygons m²'], num_cols=(1, 2, 3))
    body += '<h2>Garden buildings (enclosed floorspace)</h2>' + table([[r['label'], f"{r['external_m2']:.1f}", f"{r['gia_m2']:.1f}", r['note']] for r in garden_rows], ['Building', 'External m²', 'GIA m²', 'Note'], num_cols=(1, 2))
    body += '<h2>Green Belt SPD Appendix 2 test (' + ('applies' if ctx.green_belt_module else 'shown for information — the site is outside the Green Belt (confirmed)') + ')</h2>'
    body += table([['A  Original dwelling (external, all floors)', f"{gb['A']:.1f}"], ['C  Previous extensions', f"{gb['C']:.1f}"], ['B  Proposed additions (external, incl. basement outside the original footprint)', f"{gb['B']:.1f}"],
                   ['B + C', f"{gb['B'] + gb['C']:.1f}"], ['50% of A (limit)', f"{gb['A'] * .5:.1f}"], ['Result', gb['verdict']]], ['Item', 'm²'], num_cols=(1,))
    body += '<p class="small">' + html.escape(gb['basis']) + '</p>'
    body += '<p class=box>Area estimates require reconciliation with a measured survey and the independent wall-envelope diagnostic in manifest.json. Do not use these figures as a certified CIL calculation.</p>'
    body += '<h2>CIL</h2>' + table([['Existing GIA', f"{cil['existing_gia']:.1f}"], ['Proposed GIA', f"{cil['proposed_gia']:.1f}"], ['Net increase', f"{cil['increase']:.1f}"], ['Result', cil['verdict']]], ['Item', 'm²'], num_cols=(1,))
    body += '<h2>Heights, footprint and site coverage</h2>' + table(heights, ['Element', 'Existing', 'Proposed'])
    body += table([[k, v] for k, v in coverage.items()], ['Site coverage', 'Value'])
    body += '<p class="muted">Areas are measured from the model\'s room polygons (internal faces) with a 230 mm wall allowance; they are not a measured survey. Volumes are approximate (external area × storey height plus half the roof plan area × roof rise).</p>'
    return html_to_pdf(body, path, compact=True)


# ---------------------------------------------------------------- PA-090
def materials_sheet(ctx, records_ex, records_pr, path):
    body = header(ctx, 'PA-090', 'Materials and window/door schedule')
    body += '<h2>External materials</h2>' + table([[k.replace('_', ' ').capitalize(), v] for k, v in ctx['materials'].items()], ['Element', 'Proposed material and finish'])
    roof = "weathered dark brown-grey tiled roof" if ctx.get("design_variant") == "planning" else "natural slate roof"
    body += f'<p class="small">Existing: red-brown facing brick, {roof}, white painted timber windows, oak front door. Retained brick and roof coverings are made good where the porch, chimney and front wall are removed.</p>'
    def rows(recs):
        out = []
        for r in sorted(recs, key=lambda r: (r.tag[0], int(r.tag[1:]))):
            face = {'N': 'North (rear)', 'S': 'South (front)', 'E': 'East', 'W': 'West', 'ROOF': 'Roof', 'OUTB': 'Outbuilding'}.get(r.face, r.face)
            lvl = {-2.8: 'Basement', 0.0: 'Ground', 2.8: 'First', 5.55: 'Loft'}.get(round(r.floor_z, 2), f'{r.floor_z:.2f}')
            mat = 'Roof glazing, aluminium frame' if r.kind == 'rooflight' else ('Bronze-black aluminium, clear double glazing' if r.model == 'proposed' and r.source != 'walls.openings' else ('White painted timber (existing)' if r.model == 'existing' or r.source == 'walls.openings' else 'Bronze-black aluminium'))
            if r.kind in ('door',) and r.source == 'interactiveDoors':
                mat = 'Pale oak, solid'
            if r.source == 'garden_mesh':
                mat = 'Existing timber / glazed joinery retained'
            if r.model == 'proposed' and r.kind in ('window', 'french') and r.floor_z >= 2.8 and ((r.face == 'W' and r.centre[0] < -4) or (r.face == 'E' and r.centre[0] > 12)):
                mat = 'Obscure glazing below 1700 mm; opening restriction and sightlines to confirm'
            out.append([r.tag, face, lvl, r.kind, f'{r.width * 1000:.0f}', f'{(r.head - r.sill) * 1000:.0f}' if r.kind != 'rooflight' else '—', f'{r.sill * 1000:.0f}' if r.kind != 'rooflight' else '—', mat, r.note])
        return out
    body += '<h2>Proposed openings (tags as shown on PA-020 to PA-040)</h2>' + table(rows(records_pr), ['Tag', 'Elevation', 'Level', 'Type', 'Width mm', 'Height mm', 'Sill mm', 'Material', 'Note'], num_cols=(4, 5, 6))
    body += '<h2>Existing openings (tags as shown on PA-010 to PA-012)</h2>' + table(rows(records_ex), ['Tag', 'Elevation', 'Level', 'Type', 'Width mm', 'Height mm', 'Sill mm', 'Material', 'Note'], num_cols=(4, 5, 6))
    body += '<p class="muted">Widths are structural opening widths measured in the model; bay windows are listed as one opening with their girth.</p>'
    return html_to_pdf(body, path, compact=True)


# ---------------------------------------------------------------- PA-005
def risk_sheet(ctx, risks, path):
    body = header(ctx, 'PA-005', 'Planning risk and opportunity register', 'Where the scheme could be adjusted to make consent easier — for the owner to assess')
    body += '<p>Each item is measured from the current model against the policy or guidance named. RED: likely reason for refusal or a required change; AMBER: officer scrutiny likely, mitigation available; GREEN: no issue identified by this limited check; survey and planning judgement still required. The "spec key" is the field in proposal/design-spec-compact.json that controls the element, so a change is a spec edit and a rebuild.</p>'
    rows = []; cls = []
    for r in risks:
        rows.append([r['id'], r['topic'], r['policy'], r['measured'], r['threshold'], r['verdict'].upper(), r['fix'], ', '.join(r['spec_keys'])])
        cls.append(r['verdict'])
    body += table(rows, ['Ref', 'Topic', 'Policy / guidance', 'Measured (model)', 'Test', 'Verdict', 'Adjustment that would clear it', 'Spec key(s)'], cls)
    counts = {v: sum(1 for r in risks if r['verdict'] == v) for v in ('red', 'amber', 'green')}
    body += f'<p><b>Summary:</b> {counts["red"]} red, {counts["amber"]} amber, {counts["green"]} green.</p>'
    body += '<p class="muted">Policy references: Sevenoaks Residential Extensions SPD (2009); Development in the Green Belt SPD (2015); Sevenoaks Local Plan ADMP policies EN1/EN2; NPPF chapter 12; Town and Country Planning (General Permitted Development) Order 2015 Schedule 2 Part 1 as a benchmark for scale; Manual for Streets.</p>'
    return html_to_pdf(body, path, compact=True)


# ------------------------------------------------------------------ DAS
def statement_pdf(ctx, data, path):
    body = header(ctx, 'DAS', 'Design and Access Statement and Planning Statement')
    for h, paras in data['sections']:
        page_break = ' style="page-break-before:always"' if h.startswith(('4a.', '7.')) else ''
        body += f'<h2{page_break}>{html.escape(h)}</h2>' + ''.join(f'<p>{html.escape(p)}</p>' for p in paras)
    body += '<h2>Reports to accompany the application</h2>' + table([[r['id'], r['title'], r['trigger'], r['status']] for r in ctx['reports_to_commission']], ['Ref', 'Report', 'Trigger', 'Status'])
    return html_to_pdf(body, path, rect=A4, margin=36)


# ----------------------------------------------------------------- forms
def application_form_pdf(ctx, data, path):
    body = header(ctx, 'FORM', 'Householder application preparation worksheet - unsigned')
    for h, rows in data:
        page_break = ' style="page-break-before:always"' if h.startswith('6.') else ''
        body += f'<h2{page_break}>{html.escape(h)}</h2>' + table(rows, ['Field', 'Entry'])
    body += '<p class="muted">Preparation worksheet only. Complete the official application, verify ownership and applicant details, sign the declaration and pay the fee at submission.</p>'
    return html_to_pdf(body, path, rect=A4, margin=36)


def cil_form_pdf(ctx, cil, path):
    body = header(ctx, 'CIL', 'CIL preparation worksheet - official form outstanding')
    rows = [['1. Application type', 'Householder'], ['2. Does the proposal create new floorspace of 100 m² or more?', 'Yes' if cil['increase'] >= 100 else 'No'],
            ['3. Existing gross internal area (m²)', f"{cil['existing_gia']:.1f}"], ['4. Proposed gross internal area (m²)', f"{cil['proposed_gia']:.1f}"], ['5. Net additional floorspace (m²)', f"{cil['increase']:.1f}"],
            ['6. Floorspace to be demolished (m²)', 'To be measured and confirmed' if cil['demolished'] is None else f"{cil['demolished']:.1f}"], ['7. Existing buildings in lawful use for 6 of the last 36 months', 'Unconfirmed - applicant to supply lawful-use evidence'],
            ['8. Relief / exemption to be claimed', 'Potential residential extension exemption, subject to owner-occupation and eligibility. Confirm eligibility with the collecting authority; obtain any exemption before commencement.'], ['9. Liable party', 'To be confirmed by the owner']]
    body += table(rows, ['Question', 'Answer'])
    body += '<p class="muted">Sevenoaks District Council charges CIL on residential development; a householder extension over 100 m² is liable unless the residential extension exemption is claimed and acknowledged before work starts.</p>'
    return html_to_pdf(body, path, rect=A4, margin=36)


def report_summaries_pdf(ctx, summaries, path):
    body = header(ctx, 'REPORTS', 'Consultant briefs - assessments not yet supplied')
    for h, paras in summaries:
        body += f'<h2>{html.escape(h)}</h2>' + ''.join(f'<p>{html.escape(p)}</p>' for p in paras)
    return html_to_pdf(body, path, rect=A4, margin=36)
