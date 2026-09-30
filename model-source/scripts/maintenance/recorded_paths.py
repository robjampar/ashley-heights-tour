"""Resolve path locations from pre-migration reports without altering their evidence."""
import json
from pathlib import Path


def current_path(root, name):
    moves = json.loads((Path(root) / 'docs/maintenance/path-map.json').read_text())
    seen = set()
    while name not in seen:
        seen.add(name)
        match = next((old for old in sorted(moves, key=len, reverse=True)
                      if name == old or name.startswith(old + '/')), None)
        if match is None:
            return name
        name = moves[match] + name[len(match):]
    raise ValueError(f'Cyclic recorded path mapping: {name}')
