import subprocess,os,time,json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
R=Path(__file__).resolve().parents[2];REV='door-wall-junctions-2026-10-19';E=R/'walkthrough/test-results'/REV;B=str(Path.home()/'Applications/Blender.app/Contents/MacOS/Blender')
def run(name,args,env=None):
 print('START',name,flush=True)
 with (R/f'logs/door-wall-final-{name}.log').open('w')as f:r=subprocess.run(args,cwd=R,stdout=f,stderr=subprocess.STDOUT,env=env)
 print('END',name,r.returncode,flush=True)
 if r.returncode:raise RuntimeError(name+' failed')
for _ in range(200):
 if all('JUNCTION_PREFLIGHT '+v in (R/f'logs/door-wall-{v}-prepare.log').read_text() for v in ('compact','planning')):break
 time.sleep(2)
else:raise RuntimeError('Preparation did not finish')
run('preflight',['node','--test','walkthrough/tests/door-wall-surfaces.test.mjs'],{**os.environ,'JUNCTION_PREFLIGHT':'1'})
run('preflight-materials',['.venv/bin/python',str(R/'revisions'/REV/'check-preflight-materials.py')])
run('geometry-preservation',['.venv/bin/python',str(R/'revisions'/REV/'check-preservation.py')])
run('originals',[B,'--background','--python-exit-code','1','--python',str(R/'revisions'/REV/'check-native-preservation.py'),'--','compact','planning'])
def export(v):run('export-'+v,[B,'--background','--python-exit-code','1','--python',str(R/'revisions'/REV/'export-and-integrate.py'),'--',v])
with ThreadPoolExecutor(max_workers=2)as p:list(p.map(export,['compact','planning']))
def visuals(v):
 for label,script,extra in [('furnishings','scripts/exports/export_visual_refinement.py',[]),('daylight','scripts/exports/bake_walkthrough_daylight.py',['--samples','192'])]:run(v+'-'+label,[B,'--background','--python-exit-code','1','--python',script,'--',v,*extra])
with ThreadPoolExecutor(max_workers=2)as p:list(p.map(visuals,['compact','planning']))
run('visual-audit',['.venv/bin/python','scripts/audits/audit_visual_quality.py','--output',str(E/'visual-quality-audit.json')])
run('web-build',['make','build-web'])
with ThreadPoolExecutor(max_workers=3)as p:list(p.map(lambda task:run(*task),[('web-tests',['make','test-web']),('python',['make','test-python'])]))
run('layout-baseline',['.venv/bin/python',str(R/'revisions'/REV/'check-layout-baseline.py')])
print('DOOR_WALL_FIX_COMPLETE',flush=True)
