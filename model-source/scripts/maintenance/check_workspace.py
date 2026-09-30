#!/usr/bin/env python3
"""Read-only checks for workspace layout, baseline preservation and review assets."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import ast
import hashlib
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]

def main():
    failures = []
    def check(condition, message):
        if not condition:
            failures.append(message)
    for name in ('source', 'proposal', 'scripts', 'walkthrough', 'tests', 'outputs',
                 'revisions', 'archive', 'docs', 'launchers', 'logs'):
        check((ROOT / name).is_dir(), f'Missing directory: {name}')
    for path in ROOT.iterdir():
        check(not (path.name == 'output' or path.name.startswith('output-') or
                   path.suffix == '.command' or path.name.startswith('regenerate-')),
              f'File belongs in a grouped directory: {path.name}')
    for path in (ROOT / 'scripts').glob('*.py'):
        check(path.name == '__init__.py', f'Implementation needs a package: {path.name}')
    check(not list((ROOT / 'proposal').glob('*.json')), 'Current JSON specs belong in proposal/specs/')
    check(not list((ROOT / 'walkthrough/tests').glob('*.log')), 'Test logs belong in walkthrough/test-results/')
    for path in (ROOT / 'scripts').rglob('*.py'):
        try:
            tree = ast.parse(path.read_text(), filename=str(path))
            for node in ast.walk(tree):
                if isinstance(node, ast.ImportFrom) and node.module and node.module.startswith('scripts.'):
                    target = ROOT / node.module.replace('.', '/')
                    check(target.is_dir() or target.with_suffix('.py').is_file(), f'{path.name}: missing import {node.module}')
                if isinstance(node, ast.Constant) and isinstance(node.value, str) and node.value.startswith('scripts/') and node.value.endswith('.py') and '\n' not in node.value:
                    check((ROOT / node.value).is_file(), f'{path.name}: missing script {node.value}')
        except SyntaxError as error:
            failures.append(str(error))
    for path in (ROOT / 'launchers').glob('*.command'):
        result = subprocess.run(['zsh', '-n', str(path)], capture_output=True, text=True)
        check(result.returncode == 0, f'{path.name}: {result.stderr.strip()}')
        # Check literal native model targets without launching an application.
        for target in re.findall(r'"(outputs/[^"\n]+)"', path.read_text()):
            check((ROOT / target).is_file(), f'Launcher target missing: {target}')
    baseline = json.loads((ROOT / 'proposal/specs/original-preservation.json').read_text())
    for name, digest in baseline['files'].items():
        path = ROOT / name
        check(path.is_file(), f'Baseline missing: {name}')
        if path.is_file():
            with path.open('rb') as stream:
                actual = hashlib.file_digest(stream, 'sha256').hexdigest()
            check(actual == digest, f'Baseline changed: {name}')
    review = ROOT / 'revisions/whole-house-review-2026-09-29'
    proposals = json.loads((review / 'proposals.json').read_text())
    for item in proposals['items']:
        for source in item['sources']:
            check((ROOT / source).is_file(), f"{item['id']} source missing: {source}")
    comparisons = json.loads((review / 'comparisons.json').read_text())
    for ident, item in comparisons['items'].items():
        for key in ('before', 'after', 'manifest', 'preview'):
            if item.get(key):
                check((ROOT / item[key]).is_file(), f'{ident} {key} missing: {item[key]}')
    decisions = json.loads((review / 'decisions/decisions.json').read_text())
    hashes = {item['id']: item['proposalHash'] for item in proposals['items']}
    for ident, decision in decisions['decisions'].items():
        check(decision.get('proposalHash') == hashes.get(ident), f'{ident}: decision no longer matches proposal')
    if failures:
        print('\n'.join(failures), file=sys.stderr)
        return 1
    print(f'Workspace OK: {len(baseline["files"])} baseline hashes, '
          f'{len(proposals["items"])} review proposals, '
          f'{len(decisions["decisions"])} matching decisions; launchers and Python syntax valid.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
