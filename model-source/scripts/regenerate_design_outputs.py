#!/usr/bin/env python3
"""Build selected designs, reusing models only when inputs and outputs match."""
import argparse
import os
from pathlib import Path
import subprocess

if __package__:
    from .build_support import Timings, current_build
else:
    from build_support import Timings, current_build

ROOT = Path(__file__).resolve().parents[1]


def run(args, env=None, cwd=ROOT):
    print('RUN', ' '.join(map(str, args)), flush=True)
    subprocess.run(list(map(str, args)), cwd=cwd, env=env, check=True)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--variant', choices=('compact', 'planning', 'all'), default='all',
                        help='Build only this design (default: both)')
    parser.add_argument('--appearance-only', action='store_true', help='Refresh exterior finishes from a verified completed model; refuse architecture changes')
    parser.add_argument('--force', action='store_true', help='Rebuild even when checksums match')
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--models-only', action='store_true', help='Skip drawing packs and the viewer build')
    mode.add_argument('--viewer-only', action='store_true', help='Build model and viewer; skip drawing packs')
    parser.add_argument('--exchange', action='store_true', help='Also export SketchUp and USDZ for selected designs and existing')
    parser.add_argument('--renders', action='store_true', help='Render matching views of selected designs and existing')
    args = parser.parse_args(argv)
    blender = next((p for p in (
        Path.home() / 'Applications/Blender.app/Contents/MacOS/Blender',
        Path('/Applications/Blender.app/Contents/MacOS/Blender'),
    ) if p.is_file()), None)
    if not blender:
        raise SystemExit('Blender not found')
    python = ROOT / '.venv/bin/python'
    variants = ('compact', 'planning') if args.variant == 'all' else (args.variant,)
    timings = Timings(ROOT / f'regenerate-{args.variant}-timings.json', variants=variants)
    succeeded = False

    def timed(label, command, env=None, cwd=ROOT):
        with timings.phase(label):
            run(command, env, cwd)

    try:
        if args.exchange:
            env = os.environ | {'ASHLEY_OUTPUT': 'output-walkthrough'}
            timed('existing.sketchup', [python, 'scripts/export_sketchup.py'], env)
            timed('existing.usdz', [blender, '--background', '--python-exit-code', '1',
                                  '--python', 'scripts/export_mac_preview.py'], env)
        for variant in variants:
            env = os.environ | {'PROPOSAL_VARIANT': variant}
            with timings.phase(variant + '.freshness'):
                fresh, reason = (False, 'forced') if args.force else current_build(ROOT, variant, blender)
            print(('SKIP' if fresh else 'BUILD'), variant, reason, flush=True)
            if not fresh:
                script = 'scripts/refresh_exterior_appearance.py' if args.appearance_only else 'scripts/build_extension_proposal.py'
                command = [blender, '--background', '--python-exit-code', '1', '--python', script]
                if args.appearance_only:
                    command.extend(['--', variant])
                timed(variant + '.model', command, env)
            if args.exchange:
                timed(variant + '.sketchup', [python, 'scripts/export_sketchup.py'],
                      env | {'ASHLEY_OUTPUT': 'output-proposed-' + variant})
                timed(variant + '.usdz', [blender, '--background', '--python-exit-code', '1',
                      '--python', 'scripts/export_proposal_mac_preview.py'], env)
        if args.renders:
            for variant, original in [(variants[0], '1')] + [(v, '0') for v in variants]:
                timed(('existing' if original == '1' else variant) + '.renders',
                      [blender, '--background', '--python-exit-code', '1', '--python', 'scripts/render_proposal.py'],
                      os.environ | {'PROPOSAL_VARIANT': variant, 'PROPOSAL_COMPARE_ORIGINAL': original,
                                    'PROPOSAL_VIEWS': 'aerial-southwest,rear-house',
                                    'PROPOSAL_SAMPLES': '12', 'PROPOSAL_WIDTH': '1000'})
        if not args.models_only and not args.viewer_only:
            for variant in variants:
                command = [python, '-m', 'scripts.planning_drawings.build_pack', '--variant', variant]
                timed(variant + '.drawings', command)
                timed(variant + '.check_drawings', command + ['--check'])
        if not args.models_only:
            timed('viewer', ['npm', 'run', 'build'], cwd=ROOT / 'walkthrough')
        succeeded = True
    finally:
        timings.write(success=succeeded)


if __name__ == '__main__':
    main()
