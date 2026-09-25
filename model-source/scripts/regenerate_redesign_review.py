#!/usr/bin/env python3
"""Build, check, photograph and package the six design studies; never publish."""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from contextlib import ExitStack, contextmanager
import fcntl
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from importlib.metadata import version
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
from threading import Thread
import time

try:
    from .build_support import atomic_json, blender_identity, sha256
    from .redesign_support import OPTIONS, current_redesign
    from .redesign_captures import verify_captures
except ImportError:
    from build_support import atomic_json, blender_identity, sha256
    from redesign_support import OPTIONS, current_redesign
    from redesign_captures import verify_captures

ROOT = Path(__file__).resolve().parents[1]
COMMON_CHECKS = ('circulation', 'private-access', 'ensuite-access', 'parking')
EXTERNAL_CHECKS = ('stairs-navigation', 'stair-headroom', 'pool-navigation', 'site-clearance', 'garage-access')


def fingerprints(root, names):
    return {name: sha256(root / name) for name in sorted(set(names))}


def cache_current(root, marker, inputs):
    try:
        record = json.loads(marker.read_text())
        if record.get('schema') != 1 or record.get('inputs') != inputs or not record.get('outputs'):
            return False
        for name, digest in record['outputs'].items():
            target = (root / name).resolve()
            if not target.is_relative_to(root.resolve()) or sha256(target) != digest:
                return False
        return True
    except (OSError, ValueError, TypeError, KeyError):
        return False


def record_cache(root, marker, before, after, outputs):
    if before != after:
        raise RuntimeError('Inputs changed while preparing review artifacts')
    if not outputs:
        raise RuntimeError('Cannot record an empty review cache')
    atomic_json(marker, {'schema': 1, 'inputs': before, 'outputs': fingerprints(root, outputs)})


def runtime_identity(blender):
    return {'python': sys.version, 'node': subprocess.check_output(['node', '--version'], text=True).strip(),
            'packages': {p: version(p) for p in ('matplotlib', 'shapely', 'Pillow', 'numpy', 'reportlab', 'svglib', 'pypdf')},
            'blender': blender_identity(blender)}


def run(command, log, *, cwd=ROOT, env=None):
    print('RUN', ' '.join(str(p) for p in command), flush=True)
    with log.open('a') as handle:
        subprocess.run([str(p) for p in command], cwd=cwd, check=True,
                       stdout=handle, stderr=subprocess.STDOUT, env={**os.environ, **(env or {})})


def plan_files(option, *, public=False):
    folder = ('walkthrough/public/redesigns/plans/' if public else 'proposal/redesigns/plans/') + option
    manifest = json.loads((ROOT / folder / 'manifest.json').read_text())
    names = [folder + '/manifest.json']
    for plan in manifest['plans']:
        for key in ('file', 'detail'):
            name = folder + '/' + plan[key]
            if not (ROOT / name).resolve().is_relative_to((ROOT / folder).resolve()):
                raise ValueError('Drawing path is outside the option folder')
            names.append(name)
    return names


def option_inputs(option, runtime):
    out = 'output-redesign-' + option
    report = json.loads((ROOT / out / 'build-report.json').read_text())
    scripts = ['scripts/regenerate_redesign_review.py', 'scripts/build_support.py',
               'scripts/redesign_walk_masks.py', 'scripts/draw_redesign_plans.py', 'scripts/draw_redesign_sites.py',
               'walkthrough/tests/redesign-circulation.mjs', 'walkthrough/tests/redesign-private-access.mjs',
               'walkthrough/tests/redesign-ensuite-access.mjs', 'walkthrough/tests/redesign-parking.mjs',
               'walkthrough/src/navigation.js', 'walkthrough/src/drive.js', 'walkthrough/tools/plan-drive.mjs',
               'walkthrough/package-lock.json', 'walkthrough/public/navigation.json',
               'proposal/redesigns/original-drive-outline.json']
    names = [out + '/' + name for name in ('navigation.json', 'geometry.json', 'build-report.json')]
    if option.startswith('e'):
        scripts += ['scripts/audit_redesign_headroom.py', 'scripts/audit_redesign_site.py',
                    'walkthrough/tests/redesign-stairs.mjs', 'walkthrough/tests/redesign-pool.mjs', 'walkthrough/tests/redesign-garage-access.mjs']
        names.append(report['native'])
    return {'runtime': runtime, 'files': fingerprints(ROOT, names + scripts), 'parking_margin': .12 if option == 'e1' else .22}


def check_reports(option):
    out = ROOT / ('output-redesign-' + option)
    nav = json.loads((out / 'navigation.json').read_text())
    kinds = COMMON_CHECKS + (EXTERNAL_CHECKS if option.startswith('e') else ())
    for kind in kinds:
        report = json.loads((out / (kind + '-audit.json')).read_text())
        assert report['modelUpdatedAt'] == nav['modelUpdatedAt'], option + ': stale ' + kind
        if kind == 'stair-headroom':
            assert report['groups'], option + ': missing headroom samples'
            for name, group in report['groups'].items():
                assert group['reduced_loft_geometry'] if name == 'loft' else group['all_samples_2m'], option + ': headroom geometry failed'
        else:
            assert report['passed'], option + ': failed ' + kind
    ensuite = json.loads((out / 'ensuite-access-audit.json').read_text())
    assert ensuite['ensuite_bedrooms'] == nav['redesign']['ensuites']
    return [str((out / (kind + '-audit.json')).relative_to(ROOT)) for kind in kinds]


def validate_option(option, blender, runtime, force):
    out = ROOT / ('output-redesign-' + option)
    marker = out / 'review-cache.json'
    inputs = option_inputs(option, runtime)
    if not force and cache_current(ROOT, marker, inputs):
        check_reports(option)
        print('REUSE', option, 'verified drawings and checks', flush=True)
        return
    marker.unlink(missing_ok=True)
    log = out / 'regenerate-review.log'; log.write_text('')
    py = sys.executable
    for script in ('redesign_walk_masks.py', 'draw_redesign_plans.py', 'draw_redesign_sites.py'):
        run([py, 'scripts/' + script, option], log)
    run(['node', 'walkthrough/tests/redesign-circulation.mjs', option], log, env={'AUDIT_DEBUG': '1'})
    for name in ('private-access', 'ensuite-access', 'parking'):
        run(['node', 'walkthrough/tests/redesign-' + name + '.mjs', option], log,
            env={'PARKING_MARGIN': str(inputs['parking_margin'])})
    if option.startswith('e'):
        for name in ('stairs', 'pool', 'garage-access'):
            run(['node', 'walkthrough/tests/redesign-' + name + '.mjs', option], log)
        run([py, 'scripts/audit_redesign_site.py', option], log)
        run([blender, '--background', '--python-exit-code', '1', '--python', 'scripts/audit_redesign_headroom.py', '--', option], log)
    outputs = check_reports(option) + plan_files(option)
    outputs += [str((out / name).relative_to(ROOT)) for name in ('walk-masks.json', 'circulation-grid.json', 'parking-paths.json')]
    record_cache(ROOT, marker, inputs, option_inputs(option, runtime), outputs)
    print('VERIFIED', option, flush=True)


@contextmanager
def review_server():
    class QuietHandler(SimpleHTTPRequestHandler):
        def log_message(self, *_):
            pass
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT / 'walkthrough/dist')))
    thread = Thread(target=server.serve_forever, daemon=True); thread.start()
    try:
        yield 'http://127.0.0.1:' + str(server.server_port) + '/'
    finally:
        server.shutdown(); server.server_close(); thread.join(timeout=5)


def publication_inputs(runtime):
    names = ['scripts/package_redesign_review.py', 'scripts/redesign_captures.py',
             'scripts/build_redesign_pdf.py', 'scripts/regenerate_redesign_review.py',
             'proposal/redesigns/review-notes.json']
    for option in OPTIONS:
        names += plan_files(option)
        names += check_reports(option)
        names += ['output-redesign-' + option + '/' + name for name in ('navigation.json', 'build-report.json', 'review-cache.json')]
        for view in ('front', 'rear', 'interior'):
            image = f'walkthrough/public/redesigns/images/{option}-{view}.jpg'
            names += [image, image + '.capture.json']
    return {'runtime': runtime, 'files': fingerprints(ROOT, names)}


def verify_complete_issue(blender, runtime, *, captures=False):
    for option in OPTIONS:
        fresh, reason = current_redesign(ROOT, option, blender)
        assert fresh, option + ': ' + reason + '; include this option in the rebuild'
        out = ROOT / ('output-redesign-' + option)
        assert cache_current(ROOT, out / 'review-cache.json', option_inputs(option, runtime)), option + ': drawings/checks changed; include this option in the review rebuild'
        if captures:
            nav = json.loads((out / 'navigation.json').read_text())
            verify_captures(ROOT, option, nav['modelUpdatedAt'])


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('options', nargs='*', help='Rebuild/check selected options; package the complete six-option comparison')
    parser.add_argument('--jobs', type=int, choices=(1, 2), default=2)
    parser.add_argument('--force-review', action='store_true', help='Repeat drawings and audits even when their verified cache matches')
    parser.add_argument('--browser-check', action='store_true', help='Also exercise the finished review on desktop and phone')
    args = parser.parse_args(argv)
    options = tuple(dict.fromkeys(args.options or OPTIONS))
    if any(option not in OPTIONS for option in options):
        parser.error('Options must be one of: ' + ', '.join(OPTIONS))
    blender = next((p for p in (Path.home() / 'Applications/Blender.app/Contents/MacOS/Blender',
                                Path('/Applications/Blender.app/Contents/MacOS/Blender')) if p.is_file()), None)
    if blender is None:
        raise SystemExit('Blender not found')
    started = time.perf_counter(); runtime = runtime_identity(blender)
    log = ROOT / 'regenerate-redesign-review.log'
    with ExitStack() as stack:
        lock = stack.enter_context((ROOT / 'proposal/redesigns/.review-runner.lock').open('a+'))
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        log.write_text('')
        run([sys.executable, 'scripts/build_redesign_options.py', *options, '--jobs', str(args.jobs)], log)
        for option in sorted(options):
            handle = stack.enter_context((ROOT / ('output-redesign-' + option) / '.runner.lock').open('a+'))
            fcntl.flock(handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
        with ThreadPoolExecutor(max_workers=args.jobs) as pool:
            futures = [pool.submit(validate_option, option, blender, runtime, args.force_review) for option in options]
            for future in as_completed(futures):
                future.result()
        verify_complete_issue(blender, runtime)
        run(['npm', 'run', 'build'], log, cwd=ROOT / 'walkthrough')
        with review_server() as base:
            # Captures verify their inputs and are reused independently per image.
            for script in ('capture-redesigns.mjs', 'capture-redesign-interiors.mjs'):
                run(['node', 'walkthrough/tests/' + script, *OPTIONS], log, env={'CAPTURE_BASE': base})
            for option in OPTIONS:
                nav = json.loads((ROOT / ('output-redesign-' + option) / 'navigation.json').read_text())
                verify_captures(ROOT, option, nav['modelUpdatedAt'])
            marker = ROOT / 'proposal/redesigns/publication-cache.json'
            before = publication_inputs(runtime)
            if cache_current(ROOT, marker, before):
                print('REUSE verified review data and PDF', flush=True)
            else:
                marker.unlink(missing_ok=True)
                run([sys.executable, 'scripts/package_redesign_review.py'], log)
                run([sys.executable, 'scripts/build_redesign_pdf.py'], log)
                pdf = 'output/pdf/Ashley Heights - Six design options.pdf'
                public_pdf = 'walkthrough/public/redesigns/six-options.pdf'
                shutil.copyfile(ROOT / pdf, ROOT / public_pdf)
                outputs = [pdf, public_pdf, 'walkthrough/public/redesigns/options.json']
                for option in OPTIONS:
                    outputs += plan_files(option, public=True)
                record_cache(ROOT, marker, before, publication_inputs(runtime), outputs)
            run(['npm', 'run', 'build'], log, cwd=ROOT / 'walkthrough')
            # Fail if a model, checker or rendered viewer changed after its
            # stage finished. A successful issue must be coherent end to end.
            verify_complete_issue(blender, runtime, captures=True)
            assert publication_inputs(runtime) == before, 'Review inputs changed before completion'
            if args.browser_check:
                run(['node', 'walkthrough/tests/redesign-review-browser.mjs'], log,
                    env={'REVIEW_BASE': base + 'redesigns/', 'REVIEW_OUTPUT': 'regenerated-review-browser'})
        print('REVIEW_READY', round(time.perf_counter() - started, 2), 'seconds; walkthrough/dist/redesigns/', flush=True)
        print('Nothing has been committed or published.', flush=True)


if __name__ == '__main__':
    main()
