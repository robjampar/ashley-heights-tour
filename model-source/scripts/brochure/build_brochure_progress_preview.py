"""Keep the earlier progress URL pointed at the completed local edition."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import shutil
from scripts.brochure.build_house_brochure_expanded import CSS
ROOT=Path(__file__).resolve().parents[2]
TARGET=ROOT/'walkthrough/public/brochure/progress'
DIST=ROOT/'walkthrough/dist/brochure/progress'
TARGET.mkdir(parents=True,exist_ok=True)
html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ashley Heights | Review edition</title><style>'+CSS+'</style></head><body><main><header><div class="eyebrow">Proposed in brick / Local owner review</div><h1>The expanded brochure is ready</h1><p>The completed local edition contains 97 pages, 63 presentation views and 37 drawings. Your latest feedback is included: photographic elevations, a corrected courtyard roof, clearer entrance views and the previously accepted interiors.</p><nav class="actions"><a href="../">Open the current gallery</a><a href="../ashley-heights-house-brochure.pdf">Open the brochure</a></nav><p>New decoration remains a visual study, with model integration pending. Nothing has been published.</p></header></main></body></html>'
(TARGET/'index.html').write_text(html)
DIST.mkdir(parents=True,exist_ok=True)
shutil.copy2(TARGET/'index.html',DIST/'index.html')
print(TARGET/'index.html')
