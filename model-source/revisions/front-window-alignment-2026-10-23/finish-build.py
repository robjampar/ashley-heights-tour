"""Refresh checked native models, lighting and actual-browser review evidence."""
from pathlib import Path
import subprocess,sys
from concurrent.futures import ThreadPoolExecutor
R=Path(__file__).resolve().parents[2];D=Path(__file__).parent;py=str(R/'.venv/bin/python');blender='/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender'
def run(label,args):
 with (R/f'logs/front-window-alignment-{label}.log').open('w') as log:subprocess.run(args,cwd=R,stdout=log,stderr=subprocess.STDOUT,check=True)
 print(label,'complete',flush=True)
run('geometry',[py,str(D/'check-geometry.py')])
for v in ('compact','planning'):run('navigation-'+v,['node',str(D/'check-navigation.mjs'),v])
with ThreadPoolExecutor(max_workers=2) as pool:
 futures=[pool.submit(run,'preservation',[blender,'--background','--python-exit-code','1','--python',str(D/'check-original-scenes.py'),'--','compact','planning']),pool.submit(run,'geometric-preflight',[py,str(D/'run-preflight.py')])]
 for f in futures:f.result()
run('installation',[py,str(D/'install.py')])
with ThreadPoolExecutor(max_workers=3) as pool:
 futures=[pool.submit(run,'visual-build-'+v,[py,str(D/'run-visuals.py'),v])for v in ('compact','planning')]
 futures.append(pool.submit(run,'web-tests',['make','test-web']))
 for f in futures:f.result()
with ThreadPoolExecutor(max_workers=2) as pool:
 futures=[pool.submit(run,'build-web',['make','build-web']),pool.submit(run,'visual-audit',[py,str(R/'scripts/audits/audit_visual_quality.py'),'--output',str(R/'walkthrough/test-results/front-window-alignment-2026-10-23/visual-quality-audit.json')])]
 for f in futures:f.result()
with ThreadPoolExecutor(max_workers=2) as pool:
 futures=[pool.submit(run,'served-assets',['node',str(D/'check-served-assets.mjs')]),pool.submit(run,'browser-review',['node',str(D/'browser-review.mjs'),'after'])]
 for f in futures:f.result()
run('review-content',[py,str(D/'write-review.py')])
run('review-page',['node',str(D/'check-review-page.mjs')])
print('CAPTURES_READY_FOR_VISUAL_REVIEW',flush=True)
