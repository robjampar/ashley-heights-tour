"""Build the planning drawing pack from the current model exports.

    .venv/bin/python -m scripts.planning_drawings.build_pack [--variant compact|default]
                                                           [--sheets PA-021,PA-040] [--check] [--no-docs]

Outputs proposal/planning/: one PDF per sheet, supporting/ documents,
checks/, the merged pack, manifest.json and CHANGELOG.md.
"""
import argparse, json, hashlib, datetime, sys, time, shutil, tempfile, os, fcntl
from pathlib import Path
import pymupdf

from .context import Context, OUT, ROOT
from .model import load_existing, load_proposed
from . import openings as op, sheets, footprints as fp, docs, risks as risks_mod, statement, checks, site as site_mod, release


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def schedule_data(ctx, ex, pr):
    ex_rows = fp.area_schedule(ex, [(0, 0.0, 'Ground floor'), (1, 2.8, 'First floor')])
    pr_rows = fp.area_schedule(pr, pr.floor_levels)
    garden = []
    for name, note in (('Garden workshop', 'new, detached'), ('Expanded garden pavilion', 'loggia, open-sided — not floorspace'), ('Outside WC', 'existing'), ('Tool store', 'existing'), ('Summer house', 'existing')):
        rooms = [r for r in (pr.nav.get('planRooms') or []) if r['name'] == name]
        if rooms:
            from shapely.geometry import Polygon
            p = Polygon(rooms[0]['polygon_m']); ext = p.buffer(.12, join_style=2)
            garden.append({'label': name, 'external_m2': round(ext.area, 1), 'gia_m2': round(p.area, 1) if 'open-sided' not in note else 0.0, 'note': note})
    A = sum(r['external_m2'] for r in ex_rows)
    B = sum(r['external_m2'] for r in pr_rows) - A + sum(g['external_m2'] for g in garden if 'new' in g['note'])
    C = float(ctx['original_dwelling'].get('previous_extensions_m2', 0))
    gb = {'A': round(A, 1), 'B': round(B, 1), 'C': C, 'verdict': ('NOT APPLICABLE - outside Green Belt (owner confirmed)' if not ctx.green_belt_module else ('PASS' if B + C <= .5 * A else f'FAIL — {(B + C) / A * 100:.0f}% increase against a 50% limit')),
          'basis': 'A = existing ground and first floor external areas (the house is treated as the original dwelling; no previous extensions known). B = proposed external areas on all levels less A, including the basement (outside the original footprint, so not exempt under GB2) and any new enclosed garden buildings. Open-sided structures are excluded.'}
    ex_gia = sum(r['gia_m2'] for r in ex_rows); pr_gia = sum(r['gia_m2'] for r in pr_rows) + sum(g['gia_m2'] for g in garden if 'new' in g['note'])
    demolished = None
    cil = {'existing_gia': round(ex_gia, 1), 'proposed_gia': round(pr_gia, 1), 'increase': round(pr_gia - ex_gia, 1), 'demolished': demolished, 'verdict': 'CIL additional information form required (≥ 100 m²); exemption eligibility to be confirmed' if pr_gia - ex_gia >= 100 else 'Below the 100 m² threshold'}
    ex_gf = ex_rows[0]['external']; pr_gf = [r for r in pr_rows if abs(r['z']) < .05][0]['external']
    ex_roof = fp.roof_outline(ex, fp.HOUSE_REGION); pr_roof = fp.roof_outline(pr, fp.HOUSE_REGION)
    vol_ex = A * 2.8 + .5 * ex_roof.area * 2.7; vol_pr = sum(r['external_m2'] for r in pr_rows) * 2.8 + .5 * pr_roof.area * 2.7
    heights = [['Ridge height (main)', '8.05 m', '8.05 m (new wing) / 8.05 m retained'], ['Eaves height', '5.35 m', '5.35 m'], ['Dormer roof', '—', '7.86 m'], ['Entrance bay ridge', '—', '6.62 m'], ['Garage bay ridge', '3.0 m flat', '5.20 m'],
               ['Ground-floor footprint (walls)', f'{ex_gf.area:.0f} m²', f'{pr_gf.area:.0f} m²'], ['Roof plan area', f'{ex_roof.area:.0f} m²', f'{pr_roof.area:.0f} m²'], ['Approximate volume', f'{vol_ex:.0f} m³', f'{vol_pr:.0f} m³'],
               ['Basement', '—', f"{pr.nav['proposalBasement']['outer_area_m2']:.0f} m² external, floor −2.80"], *([['Garden workshop', '—', f"{pr.nav['proposalWorkshop']['outside_area_m2']:.1f} m², 2.64 m high"]] if pr.nav.get('proposalWorkshop') else [])]
    site_area = pr.site_polygon.area
    ex_all = fp.building_footprints(ex); pr_all = fp.building_footprints(pr)
    coverage = {'Site area': f'{site_area:,.0f} m²', 'Existing buildings': f'{ex_all.area:.0f} m² ({ex_all.area / site_area * 100:.0f}%)', 'Proposed buildings': f'{pr_all.area:.0f} m² ({pr_all.area / site_area * 100:.0f}%)', **({'Proposed swimming pool': '8.0 × 3.5 m (new works)'} if pr.spec.get('pool') else {})}
    return {'existing': ex_rows, 'proposed': pr_rows, 'garden': garden, 'green_belt': gb, 'cil': cil, 'heights': heights, 'coverage': coverage}


def build(argv=None):
    ap = argparse.ArgumentParser(); ap.add_argument('--variant', default='planning'); ap.add_argument('--sheets', default=''); ap.add_argument('--check', action='store_true'); ap.add_argument('--no-docs', action='store_true'); ap.add_argument('--out', default=str(OUT))
    a = ap.parse_args(argv)
    t0 = time.time(); ctx = Context(ROOT / ("proposal/planning-context.json" if a.variant == "planning" else "proposal/planning-context-proposed.json")); out = Path(a.out); out.mkdir(parents=True, exist_ok=True); (out / 'supporting').mkdir(exist_ok=True); (out / 'checks').mkdir(exist_ok=True)
    ex = load_existing(); pr = load_proposed(a.variant)
    manifest_path = out / 'manifest.json'; old = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    only = set(s.strip() for s in a.sheets.split(',') if s.strip())
    want = lambda n: not only or n in only
    rec_ex, ch_ex = op.assign_tags(op.extract(ex), 'existing', out / 'opening-tags.json'); rec_pr, ch_pr = op.assign_tags(op.extract(pr), 'proposed', out / 'opening-tags.json')
    demolished = pr.demolished_names(); sm = []; log = []
    def run(name, fn):
        if not want(name):
            return
        t = time.time(); m = fn(); sm.append(m); log.append(f'{name} {time.time() - t:.1f}s'); print(f'  {name}  {m["bytes"] / 1e6:.2f} MB  {time.time() - t:.1f}s', flush=True)
    sched = schedule_data(ctx, ex, pr)
    # Demolition polygons for the existing block plan.
    from .plans import draw_demolition
    import matplotlib.pyplot as plt
    fig, axd = plt.subplots(); dem_polys = draw_demolition(axd, ex, demolished, 0.0, None); plt.close(fig)
    if not only:   # clear sheets from any earlier numbering
        for f in list(out.glob('PA-*.pdf')) + list((out / 'png').glob('PA-*.png')):
            f.unlink()
    run('PA-001', lambda: sheets.location_sheet(ctx, ex, pr, out, a.variant))
    run('PA-002', lambda: sheets.block_sheet(ctx, ex, 'PA-002', 'Existing block plan', True, dem_polys, out, a.variant))
    run('PA-003', lambda: sheets.block_sheet(ctx, pr, 'PA-003', 'Proposed block plan', False, None, out, a.variant))
    run('PA-010', lambda: sheets.existing_plans_sheet(ctx, ex, rec_ex, demolished, out, a.variant))
    run('PA-011', lambda: sheets.outbuilding_sheet(ctx, ex, rec_ex, 'PA-011', 'Existing outbuildings — plan and elevations', True, out, a.variant))
    run('PA-012', lambda: sheets.existing_elevations_sheet(ctx, ex, rec_ex, demolished, out, a.variant))
    run('PA-020', lambda: sheets.proposed_plans_sheet(ctx, pr, rec_pr, 'PA-020', 'Proposed basement and ground floor plans', [(-2.8, 'Basement'), (0.0, 'Ground floor')], out, a.variant,
        notes=['Basement wholly below ground beneath the new wing; no external windows or doors. Excavation, waterproofing and structure to a specialist design (see report register).'] +
              ([f"Side-extension front wall and roof edge set back {round(1000*pr.nav['proposal']['specification']['sideWingFrontSetback_m'])} mm from the previous front alignment; rear alignment retained."] if pr.nav.get('proposal',{}).get('specification',{}).get('sideWingFrontSetback_m') else [])))
    run('PA-021', lambda: sheets.proposed_plans_sheet(ctx, pr, rec_pr, 'PA-021', 'Proposed first floor and loft plans', [(2.8, 'First floor'), (5.55, 'Loft')], out, a.variant,
        notes=(["Roof terrace over the rear garden room with a 1.8 m opal glass privacy screen to the west edge and 1.1 m guarding elsewhere."] if pr.nav.get('proposalRoofTerrace') else ["Side-wing rear window: 2.40 m wide, sill 0.80 m above first-floor level."]) + ['Loft rooms within the rear dormer and the wing dormer; eaves stores are unheated storage.']))
    run('PA-022', lambda: sheets.outbuilding_sheet(ctx, pr, rec_pr, 'PA-022', ('Proposed garden buildings — workshop, loggia and pool terrace' if pr.nav.get('proposalWorkshop') else 'Retained outbuildings — plan and elevations'), False, out, a.variant))
    run('PA-030', lambda: sheets.elevation_sheet(ctx, pr, ['S', 'N'], 'PA-030', 'Proposed elevations — south and north', False, rec_pr, None, None, out, a.variant))
    run('PA-031', lambda: sheets.elevation_sheet(ctx, pr, ['E', 'W'], 'PA-031', 'Proposed elevations — east and west', False, rec_pr, None, None, out, a.variant))
    run('PA-040', lambda: sheets.roof_sheet(ctx, pr, 'PA-040', 'Proposed roof plan', False, rec_pr, None, ex, out, a.variant))
    run('PA-050', lambda: sheets.section_sheet(ctx, pr, ['A', 'B'], 'PA-050', 'Proposed sections A–A and B–B', False, out, a.variant))
    run('PA-051', lambda: sheets.section_sheet(ctx, pr, ['C', 'D'], 'PA-051', 'Proposed site sections C–C and D–D', False, out, a.variant))
    run('PA-070', lambda: sheets.street_sheet(ctx, ex, pr, out, a.variant))
    run('PA-100', lambda: sheets.photo_sheet(ctx, ex, out, a.variant))
    # Documents and schedules.
    site_info = {'trees': site_mod.trees(pr)}
    rk = risks_mod.evaluate(ctx, ex, pr, sched)
    (out / 'planning-risk-register.json').write_text(json.dumps(rk, indent=1))
    (out / 'planning-risk-register.md').write_text('# Planning risk and opportunity register\n\n' + '\n'.join(f"- **{r['id']} {r['topic']}** — {r['verdict'].upper()}. {r['measured']}. Test: {r['threshold']}. Fix: {r['fix']} (spec: {', '.join(r['spec_keys'])})" for r in rk) + '\n')
    doc_manifest = []
    if not a.no_docs:
        p = docs.risk_sheet(ctx, rk, out / 'PA-005.pdf'); doc_manifest.append({'sheet': 'PA-005', 'title': 'Planning risk and opportunity register', 'scales': [], 'file': p.name, 'bytes': p.stat().st_size, 'sha256': sha(p)})
        p = docs.floorspace_sheet(ctx, sched['existing'], sched['proposed'], sched['garden'], sched['green_belt'], sched['cil'], sched['heights'], sched['coverage'], out / 'PA-080.pdf'); doc_manifest.append({'sheet': 'PA-080', 'title': 'Floorspace, footprint and volume schedule', 'scales': [], 'file': p.name, 'bytes': p.stat().st_size, 'sha256': sha(p)})
        p = docs.materials_sheet(ctx, rec_ex, rec_pr, out / 'PA-090.pdf'); doc_manifest.append({'sheet': 'PA-090', 'title': 'Materials and window/door schedule', 'scales': [], 'file': p.name, 'bytes': p.stat().st_size, 'sha256': sha(p)})
        docs.statement_pdf(ctx, statement.das_sections(ctx, sched, rk, site_info, pr), out / 'supporting' / 'DAS.pdf')
        docs.application_form_pdf(ctx, statement.application_form_data(ctx, sched, site_info, pr), out / 'supporting' / 'householder-application-form.pdf')
        docs.cil_form_pdf(ctx, sched['cil'], out / 'supporting' / 'cil-form.pdf')
        docs.report_summaries_pdf(ctx, statement.report_summaries(ctx, sched, site_info, rk, pr), out / 'supporting' / 'report-summaries.pdf')
        (out / 'supporting' / 'schedules.json').write_text(json.dumps({k: v for k, v in sched.items() if k in ('green_belt', 'cil', 'heights', 'coverage')} | {'existing': [{k: v for k, v in r.items() if k in ('label', 'external_m2', 'gia_m2', 'rooms_m2')} for r in sched['existing']], 'proposed': [{k: v for k, v in r.items() if k in ('label', 'external_m2', 'gia_m2', 'rooms_m2')} for r in sched['proposed']], 'garden': sched['garden']}, indent=1))
    all_sheets = sorted(sm + doc_manifest, key=lambda m: m['sheet'])
    # Checks.
    cl = statement.checklist(ctx, all_sheets)
    xc = checks.openings_crosscheck(pr, rec_pr, sheets.SITE_REGION) + checks.openings_crosscheck(ex, rec_ex, sheets.SITE_REGION)
    (out / 'checks' / 'openings-crosscheck.json').write_text(json.dumps(xc, indent=1))
    fc = {'existing': checks.footprint_consistency(ex, sched['existing']), 'proposed': checks.footprint_consistency(pr, sched['proposed'])}
    rl = checks.red_line_hash(pr.site_polygon)
    (out / 'checks' / 'validation-checklist.json').write_text(json.dumps(cl, indent=1))
    if not a.no_docs:
        p = docs.register_sheet(ctx, all_sheets, cl, ctx.replace_before_submission(), out / 'PA-000.pdf'); all_sheets.insert(0, {'sheet': 'PA-000', 'title': 'Drawing register, notes and validation checklist', 'scales': [], 'file': p.name, 'bytes': p.stat().st_size, 'sha256': sha(p)})
    pc = checks.pdf_checks(sorted(out.glob('PA-*.pdf')) + sorted((out / 'supporting').glob('*.pdf')))
    # Merge.
    merged = out / 'Ashley Heights - Planning Review.pdf'
    if not only:
        m = pymupdf.open()
        for s in all_sheets:
            m.insert_pdf(pymupdf.open(str(out / s['file'])))
        for f in ('DAS.pdf', 'householder-application-form.pdf', 'cil-form.pdf', 'report-summaries.pdf'):
            if (out / 'supporting' / f).exists():
                m.insert_pdf(pymupdf.open(str(out / 'supporting' / f)))
        m.set_metadata({'title': 'Ashley Heights — planning drawings', 'author': ctx.get('drawn_by', ''), 'subject': ctx['address']}); m.save(str(merged), garbage=3, deflate=True); m.close()
        # Drawing bundle excludes the internal checklist/risk register and worksheets.
        drawing_pack = pymupdf.open()
        for item in all_sheets:
            if item['sheet'] not in ('PA-000', 'PA-005'):
                with pymupdf.open(str(out / item['file'])) as source:
                    drawing_pack.insert_pdf(source)
        drawing_pack.save(str(out / 'Ashley Heights - Planning Drawings.pdf'), garbage=3, deflate=True)
        drawing_pack.close()
        existing_pack = pymupdf.open()
        for item in all_sheets:
            if item['sheet'] in ('PA-002', 'PA-010', 'PA-011', 'PA-012', 'PA-100'):
                with pymupdf.open(str(out / item['file'])) as source:
                    existing_pack.insert_pdf(source)
        existing_pack.save(str(out / 'Ashley Heights - Existing Drawings.pdf'), garbage=3, deflate=True)
        existing_pack.close()
        if a.variant == 'compact':
            merged.rename(out / 'Ashley Heights - Proposed Review.pdf')
            merged = out / 'Ashley Heights - Proposed Review.pdf'
            (out / 'Ashley Heights - Planning Drawings.pdf').rename(out / 'Ashley Heights - Proposed Drawings.pdf')
        # Contact sheet.
        contact = pymupdf.open(str(merged)); cols = 4; tw, th = 300, 212; rows = (len(contact) + cols - 1) // cols
        from PIL import Image
        board = Image.new('RGB', (cols * tw, rows * th), 'white')
        for i, pg in enumerate(contact):
            pix = pg.get_pixmap(dpi=18); im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples); im.thumbnail((tw - 8, th - 8)); board.paste(im, ((i % cols) * tw + 4, (i // cols) * th + 4))
        board.save(out / 'checks' / 'contact-sheet.png'); contact.close()
    # Manifest, revision and changelog.
    new_manifest = {'built': datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds'), 'variant': a.variant, 'revision': ctx.revision,
                    'inputs': {'existing_geometry_sha': ex.geometry_sha, 'proposed_geometry_sha': pr.geometry_sha, 'proposed_navigation_sha': pr.navigation_sha, 'model_updated': pr.model_updated, 'context_sha': sha(ctx.path)},
                    'red_line_sha': rl, 'sheets': all_sheets, 'openings_crosscheck_pass': all(x['pass'] for x in xc), 'openings_failures': [x for x in xc if not x['pass']], 'pdf_checks_pass': all(p['pass'] for p in pc), 'pdf_checks': pc,
                    'footprint_consistency': fc, 'tags_changed': {'existing': ch_ex, 'proposed': ch_pr}, 'merged': merged.name if merged.exists() else None, 'merged_bytes': merged.stat().st_size if merged.exists() else None, 'timings': log}
    changed = []
    if old.get('sheets'):
        prev = {s['sheet']: s['sha256'] for s in old['sheets']}
        changed = [s['sheet'] for s in all_sheets if prev.get(s['sheet']) != s['sha256']]
    new_manifest['changed_sheets'] = changed
    manifest_path.write_text(json.dumps(new_manifest, indent=1))
    with (out / 'CHANGELOG.md').open('a') as f:
        f.write(f"- {new_manifest['built']}  rev {ctx.revision}  variant {a.variant}  model {pr.model_updated}  sheets changed: {', '.join(changed) if changed else ('all (first build)' if not old else 'none')}; red {sum(1 for r in rk if r['verdict'] == 'red')} amber {sum(1 for r in rk if r['verdict'] == 'amber')} green {sum(1 for r in rk if r['verdict'] == 'green')}\n")
    print(json.dumps({'sheets': len(all_sheets), 'merged_mb': round(new_manifest['merged_bytes'] / 1e6, 2) if new_manifest['merged_bytes'] else None, 'openings_ok': new_manifest['openings_crosscheck_pass'], 'openings_failures': len(new_manifest['openings_failures']), 'pdf_ok': new_manifest['pdf_checks_pass'], 'footprints': fc, 'seconds': round(time.time() - t0)}, indent=1))
    return 0 if new_manifest['pdf_checks_pass'] and new_manifest['openings_crosscheck_pass'] else 1



def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--variant', choices=['planning', 'compact'], default='planning', help='Planning application or the full Proposed design')
    parser.add_argument('--sheets', default='')
    parser.add_argument('--no-docs', action='store_true')
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--out', default=None)
    args = parser.parse_args(argv)
    out = Path(args.out or (OUT if args.variant == "planning" else ROOT / "proposal/proposed")).resolve()
    if args.check:
        reasons = release.freshness(out)
        print('PACK_STALE' if reasons else 'PACK_CURRENT (technical freshness only; see REQUIRED-ACTIONS.md for submission readiness)')
        for reason in reasons:
            print('  ' + reason)
        return int(bool(reasons))
    source_issues = release.model_source_issues(args.variant)
    if source_issues:
        print('\n'.join(source_issues), file=sys.stderr)
        return 2
    only = {s.strip() for s in args.sheets.split(',') if s.strip()}
    if only - release.SHEET_IDS:
        parser.error('Unknown or retired sheets: ' + ', '.join(sorted(only - release.SHEET_IDS)))
    out.parent.mkdir(parents=True, exist_ok=True)
    # One pack writer at a time; model/tree writers remain independent.
    with (out.parent / ('.' + out.name + '.lock')).open('w') as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            print('Another planning build is running; no outputs changed.', file=sys.stderr)
            return 2
        inputs = release.input_fingerprints(args.variant)
        with tempfile.TemporaryDirectory(prefix='.' + out.name + '-build-', dir=out.parent) as tmp:
            staging = Path(tmp)
            for name in ('opening-tags.json', 'manifest.json', 'CHANGELOG.md'):
                if (out / name).exists():
                    shutil.copy2(out / name, staging / name)
            command = ['--variant', args.variant, '--out', str(staging)]
            if only:
                command += ['--sheets', ','.join(sorted(only))]
            if args.no_docs:
                command += ['--no-docs']
            result = build(command)
            if result:
                print('Build checks failed; previous issue preserved.', file=sys.stderr)
                return result
            if release.input_fingerprints(args.variant) != inputs:
                print('Inputs changed during generation (possibly the tree work). Previous issue preserved; run again.', file=sys.stderr)
                return 2
            manifest = json.loads((staging / 'manifest.json').read_text())
            complete = not only and not args.no_docs
            manifest.update(complete_build=complete, source_files=inputs, submission_ready=False)
            from .readiness import write_readiness
            write_readiness(staging, manifest)
            manifest['artifacts'] = release.inventory(staging)
            (staging / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
            destination = out if complete else out / 'checks' / 'previews' / datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
            destination.mkdir(parents=True, exist_ok=True)
            # Publish files only after input stability and PDF checks pass; manifest goes last.
            for source in sorted(staging.rglob('*')):
                if source.is_file() and source.name != 'manifest.json':
                    target = destination / source.relative_to(staging)
                    target.parent.mkdir(parents=True, exist_ok=True)
                    os.replace(source, target)
            if complete:
                for p in list(destination.glob('PA-*.pdf')) + list((destination / 'png').glob('PA-*.png')):
                    if p.stem not in release.SHEET_IDS:
                        p.unlink()
            os.replace(staging / 'manifest.json', destination / 'manifest.json')
            print('PUBLISHED ' + str(destination))
    return 0

if __name__ == '__main__':
    sys.exit(main())
