"""Stage the authored model/viewer source and review evidence, excluding private logs and large native baselines."""
from pathlib import Path
import json,hashlib,shutil
ROOT=Path(__file__).resolve().parents[1];DEST=ROOT/'deployment/ashley-heights-tour/model-source';DEST.mkdir(exist_ok=True)
paths=set()
for id in ('i1','i2','i3','e1','e2','e3'):
 report=json.loads((ROOT/f'output-redesign-{id}/build-report.json').read_text());paths.update(report['inputs'])
for id in ('compact','planning'):paths.update(json.loads((ROOT/f'output-proposed-{id}/build-inputs.json').read_text()))
paths.update(str(p.relative_to(ROOT))for p in (ROOT/'scripts').rglob('*.py'))
for directory in ('walkthrough/src','walkthrough/tools','tests'):
 paths.update(str(p.relative_to(ROOT))for p in (ROOT/directory).rglob('*')if p.is_file()and p.suffix in('.js','.mjs','.py','.html','.css','.json','.svg'))
paths.update(str(p.relative_to(ROOT))for p in (ROOT/'walkthrough/tests').rglob('*')if p.is_file()and p.suffix in('.js','.mjs','.py')and 'site'not in p.relative_to(ROOT/'walkthrough/tests').parts)
paths.add('walkthrough/tests/doors/index.html')
paths.update(('README.md','walkthrough/build.mjs','walkthrough/index.html','walkthrough/style.css','walkthrough/package.json','walkthrough/package-lock.json','proposal/redesigns/review-notes.json','proposal/redesigns/research/RESEARCH.md','proposal/redesigns/CONCEPTS.md','proposal/redesigns/EXTERNAL-LAYOUT-NOTES.md'))
paths.update(str(p.relative_to(ROOT))for p in (ROOT/'walkthrough/public/redesigns').glob('*')if p.is_file()and p.suffix in('.html','.css','.js','.json'))
manifest={};baseline={}
for name in sorted(paths):
 source=ROOT/name
 if name.startswith(('output-','walkthrough/public/house','walkthrough/public/proposal'))or source.suffix in('.blend','.glb'):
  if source.is_file():
   with source.open('rb')as handle:digest=hashlib.file_digest(handle,'sha256').hexdigest()
   baseline[name]={'sha256':digest,'bytes':source.stat().st_size}
  continue
 if not source.is_file():raise FileNotFoundError(source)
 staged_name='WORKSPACE-README.md'if name=='README.md'else name
 target=DEST/staged_name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,target)
 manifest[staged_name]={'source':name,'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'bytes':source.stat().st_size}
for id in ('i1','i2','i3','e1','e2','e3'):
 for file in ('build-report.json','circulation-audit.json','stairs-navigation-audit.json','stair-headroom-audit.json','parking-audit.json','pool-navigation-audit.json','site-clearance-audit.json'):
  source=ROOT/f'output-redesign-{id}'/file
  if source.is_file():
   target=DEST/'review-evidence'/id/file;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,target)
previous_path=DEST/'source-manifest.json'
if previous_path.exists():
 for name in json.loads(previous_path.read_text())['files'].keys()-manifest.keys():
  target=(DEST/name).resolve()
  if not target.is_relative_to(DEST.resolve()):raise ValueError(name)
  target.unlink(missing_ok=True)
previous_path.write_text(json.dumps({'files':manifest,'required_local_baselines':baseline},indent=2)+'\n')
(DEST/'README.md').write_text('''# Editable model source snapshot\n\nThis directory preserves the authored Blender scripts, design specifications, browser source and concept-check evidence for the six-option study. The published review is at `../model/redesigns/`; the current designs remain separate choices in `../model/`.\n\nThe large native reconstruction and existing generated baselines are retained in the local Ashley Heights model workspace, not duplicated in Git. `source-manifest.json` records the required baseline checksums. This source snapshot is not a standalone reconstruction from photographs: restore the listed baselines into their recorded relative paths before running Blender builds.\n\nSee `WORKSPACE-README.md` under this directory for the current-model pipeline. Build an additional option with Blender 4.5 LTS: `Blender --background --python-exit-code 1 --python scripts/build_redesign.py -- e1`. The other IDs are `i1`, `i2`, `i3`, `e2`, `e3`. Each writes its own native model, geometry, navigation and GLB. Never hand-edit a generated model without saving a separate copy.\n\nThe viewer uses `npm ci` then `npm run build` from `walkthrough/`. Python drawing/review tooling requires matplotlib, shapely, Pillow, reportlab, pypdf and svglib. Drawings and layouts are concept studies, not surveyed application or construction documents.\n\nAccount usage records, browser session logs, credentials and temporary captures are excluded from this snapshot.\n''')
print('Staged',len(manifest),'source files;',len(baseline),'local baseline references')
