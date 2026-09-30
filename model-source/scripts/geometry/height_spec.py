"""Photo-estimated vertical dimensions; no surveyed heights were supplied."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
LEVEL = 2.80
GROUND_CEILING = 2.60
FIRST_CEILING = 2.45
CEILINGS = (GROUND_CEILING, FIRST_CEILING)
EAVES = LEVEL + FIRST_CEILING + .10
ROOF_RISE = 2.70
