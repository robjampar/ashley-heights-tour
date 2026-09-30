"""Publish the existing static tours; keep editable source in Git, outside Pages."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import argparse
import shutil
import subprocess

PUBLIC_NAMES = ('.nojekyll', 'index.html', 'auth.js', 'designs.json', 'assets', 'model', 'easter')
BUDGET = 1_000_000_000

def public_files(repo):
    repo = Path(repo)
    result = []
    for name in PUBLIC_NAMES + ('CNAME',):
        source = repo / name
        if not source.exists():
            if name == 'CNAME':
                continue
            raise FileNotFoundError(source)
        paths = sorted(source.rglob('*')) if source.is_dir() else [source]
        for path in paths:
            if path.is_symlink():
                raise ValueError(f'Pages artifact cannot contain links: {path}')
            if path.is_file() and path.name != '.DS_Store':
                result.append(path)
    return result

def public_bytes(repo):
    return sum(path.stat().st_size for path in public_files(repo))

def prepare(repo, output, budget=BUDGET):
    repo, output = Path(repo).resolve(), Path(output).resolve()
    if output == repo or output.is_relative_to(repo) or repo.is_relative_to(output):
        raise ValueError('Use an independent artifact directory outside the checkout')
    # A partial sparse/promisor checkout may contain assets/ but still lack
    # panorama tiles. Never publish a silently incomplete original tour.
    if (repo / '.git' / 'HEAD').exists():
        tracked = subprocess.check_output(
            ['git', '-C', str(repo), 'ls-tree', '-r', '--name-only', 'HEAD', '--', 'assets'],
            text=True).splitlines()
        missing = [name for name in tracked if not (repo / name).is_file()]
        if missing:
            raise FileNotFoundError(f'Missing {len(missing)} tracked panorama assets: {missing}')
    files = public_files(repo)
    size = sum(path.stat().st_size for path in files)
    if size > budget:
        raise RuntimeError(f'Public Pages files total {size:,} bytes; budget is {budget:,}')
    if output.exists():
        raise FileExistsError(output)
    output.mkdir(parents=True)
    for source in files:
        target = output / source.relative_to(repo)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
    return {'files': len(files), 'bytes': size}

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    print(prepare(args.repo, args.output))
