import subprocess,os
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
R=Path(__file__).resolve().parents[2];REV='door-wall-junctions-2026-10-19';E=R/'walkthrough/test-results'/REV;B=str(Path.home()/'Applications/Blender.app/Contents/MacOS/Blender')
def run(name,args,env=None):
 print('START',name,flush=True)
 with (R/f'logs/door-wall-final-{name}.log').open('w')as f:r=subprocess.run(args,cwd=R,stdout=f,stderr=subprocess.STDOUT,env=env)
 print('END',name,r.returncode,flush=True)
 if r.returncode:raise RuntimeError(name+' failed')
run('surface-check',['node','--test','walkthrough/tests/door-wall-surfaces.test.mjs'])
run('geometry-preservation',['.venv/bin/python',str(R/'revisions'/REV/'check-preservation.py')])
def visuals(v):
 run(v+'-daylight',[B,'--background','--python-exit-code','1','--python','scripts/exports/bake_walkthrough_daylight.py','--',v,'--samples','192'])
with ThreadPoolExecutor(max_workers=2)as p:list(p.map(visuals,['compact','planning']))
run('visual-audit',['.venv/bin/python','scripts/audits/audit_visual_quality.py','--output',str(E/'visual-quality-audit.json')])
run('web-build',['make','build-web'])
with ThreadPoolExecutor(max_workers=3)as p:list(p.map(lambda t:run(*t),[('web-tests',['make','test-web']),('python',['make','test-python'])]))
run('layout-baseline',['.venv/bin/python',str(R/'revisions'/REV/'check-layout-baseline.py')])
print('DOOR_WALL_FIX_COMPLETE',flush=True)
