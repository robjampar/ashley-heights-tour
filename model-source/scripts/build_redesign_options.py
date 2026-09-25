#!/usr/bin/env python3
"""Build selected additional options, skipping verified unchanged native models."""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from contextlib import ExitStack
import fcntl
import os
from pathlib import Path
import subprocess
import time
try:
    from .build_support import Timings
    from .redesign_support import OPTIONS, current_redesign
except ImportError:
    from build_support import Timings
    from redesign_support import OPTIONS, current_redesign
ROOT = Path(__file__).resolve().parents[1]


def execute(option, blender):
    start = time.perf_counter()
    log_path = ROOT / ('output-redesign-' + option) / 'regenerate-model.log'
    print('MODEL_START', option, 'log:', log_path, flush=True)
    with log_path.open('w') as log:
        subprocess.run([str(blender), '--background', '--python-exit-code', '1', '--python',
                        'scripts/build_redesign.py', '--', option], cwd=ROOT, check=True,
                       stdout=log, stderr=subprocess.STDOUT)
    elapsed = time.perf_counter() - start
    print('MODEL_DONE', option, round(elapsed, 2), 'seconds', flush=True)
    return {'option': option, 'seconds': round(elapsed, 4), 'log': str(log_path)}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('options', nargs='*', help='Option IDs; default all six')
    parser.add_argument('--jobs', type=int, choices=(1, 2), default=2)
    parser.add_argument('--force', action='store_true')
    args = parser.parse_args(argv)
    options = tuple(dict.fromkeys(args.options or OPTIONS))
    if any(option not in OPTIONS for option in options):
        parser.error('Options must be one of: ' + ', '.join(OPTIONS))
    blender = next((p for p in (Path.home() / 'Applications/Blender.app/Contents/MacOS/Blender',
                                Path('/Applications/Blender.app/Contents/MacOS/Blender')) if p.is_file()), None)
    if not blender:
        raise SystemExit('Blender not found')
    with ExitStack() as stack:
        for option in sorted(options):
            out = ROOT / ('output-redesign-' + option)
            out.mkdir(parents=True, exist_ok=True)
            handle = stack.enter_context((out / '.runner.lock').open('a+'))
            try:
                fcntl.flock(handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
            except BlockingIOError as error:
                raise RuntimeError(option + ' is already being regenerated') from error
            handle.seek(0); handle.truncate(); handle.write(str(os.getpid()) + '\n'); handle.flush()
        timing = Timings(ROOT / 'regenerate-redesigns-timings.json', options=options, jobs=args.jobs)
        success = False
        results = []
        try:
            pending = []
            for option in options:
                with timing.phase(option + '.freshness'):
                    fresh, reason = (False, 'forced') if args.force else current_redesign(ROOT, option, blender)
                print('SKIP' if fresh else 'BUILD', option, reason, flush=True)
                if not fresh:
                    pending.append(option)
            if pending:
                with timing.phase('native_models'):
                    errors = []
                    with ThreadPoolExecutor(max_workers=args.jobs) as pool:
                        futures = {pool.submit(execute, option, blender): option for option in pending}
                        for future in as_completed(futures):
                            try:
                                results.append(future.result())
                            except Exception as error:
                                errors.append(error)
                                print('MODEL_FAILED', futures[future], str(error), flush=True)
                    if errors:
                        raise errors[0]
            success = True
        finally:
            timing.metadata['model_results'] = results
            timing.write(success=success)


if __name__ == '__main__':
    main()
