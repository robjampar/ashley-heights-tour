"""Read-only Blender check of current models and their external image/library paths."""
from pathlib import Path
import hashlib
import json
import bpy

ROOT=Path(__file__).resolve().parents[2]
models=[('output-walkthrough','Ashley Heights'),
        ('output-proposed-compact','Ashley Heights — Proposed (compact)'),
        ('output-proposed-planning','Ashley Heights — Proposed (planning application)')]
report=[]
for folder,name in models:
    path=ROOT/'outputs'/folder/(name+'.blend')
    with path.open('rb') as stream:before=hashlib.file_digest(stream,'sha256').hexdigest()
    bpy.ops.wm.open_mainfile(filepath=str(path),load_ui=False,use_scripts=False)
    missing=[]
    for asset in list(bpy.data.images)+list(bpy.data.libraries):
        if getattr(asset,'packed_file',None) or getattr(asset,'packed_files',None):continue
        if getattr(asset,'source','FILE') not in ('FILE','TILED'):continue
        stored=getattr(asset,'filepath','')
        if not stored:continue
        resolved=Path(bpy.path.abspath(stored,library=getattr(asset,'library',None)))
        if not resolved.is_file():missing.append({'name':asset.name,'path':str(resolved)})
    with path.open('rb') as stream:after=hashlib.file_digest(stream,'sha256').hexdigest()
    report.append({'file':str(path.relative_to(ROOT)),'objects':len(bpy.data.objects),'missingAssets':missing,'unchanged':before==after})
(ROOT/'logs').mkdir(exist_ok=True)
(ROOT/'logs/native-model-verification.json').write_text(json.dumps(report,indent=2)+'\n')
assert all(row['unchanged'] and not row['missingAssets'] for row in report),report
print('PASS: all three native models opened; assets present and files unchanged')
