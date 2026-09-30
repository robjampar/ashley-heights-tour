"""Build the current Proposed brick brochure and local gallery.

The original six-page builder is archived with the expanded edition.
Run with .venv/bin/python scripts/brochure/build_house_brochure.py.
"""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from scripts.brochure.build_house_brochure_spatial import main

if __name__ == '__main__':
    main()
