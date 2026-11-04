"""Validate the additional correction found by the native render review."""
import subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

ROOT=Path(__file__).resolve().parents[2]
REV=ROOT/'revisions/door-wall-junctions-2026-10-19'
EVIDENCE=ROOT/'walkthrough/test-results/door-wall-junctions-2026-10-19'
BLENDER=str(Path.home()/'Applications/Blender.app/Contents/MacOS/Blender')
def run(name,args):
    print('START',name,flush=True)
    with (ROOT/f'logs/door-wall-corner-{name}.log').open('w')as stream:
        result=subprocess.run(args,cwd=ROOT,stdout=stream,stderr=subprocess.STDOUT)
    print('END',name,result.returncode,flush=True)
    if result.returncode:raise RuntimeError(name+' failed')
run('surface-tests',['node','--test','walkthrough/tests/door-wall-surfaces.test.mjs'])
run('geometry-preservation',['.venv/bin/python',str(REV/'check-preservation.py')])
def bake(variant):
    run(variant+'-daylight',[BLENDER,'--background','--python-exit-code','1','--python','scripts/exports/bake_walkthrough_daylight.py','--',variant,'--samples','192'])
with ThreadPoolExecutor(max_workers=2)as pool:list(pool.map(bake,('compact','planning')))
run('visual-audit',['.venv/bin/python','scripts/audits/audit_visual_quality.py','--output',str(EVIDENCE/'corner-visual-quality-audit.json')])
run('web-build',['make','build-web'])
with ThreadPoolExecutor(max_workers=2)as pool:list(pool.map(lambda task:run(*task),[('web-tests',['make','test-web']),('python-tests',['make','test-python'])]))
run('native-preservation',[BLENDER,'--background','--python-exit-code','1','--python',str(REV/'check-native-preservation.py')])
run('layout-baseline',['.venv/bin/python',str(REV/'check-layout-baseline.py')])
def render(variant):
    run(variant+'-renders',[BLENDER,'--background','--python-exit-code','1','--python',str(REV/'render-junction-review.py'),'--',variant,'cinema','loft-store'])
with ThreadPoolExecutor(max_workers=2)as pool:list(pool.map(render,('compact','planning')))
run('package',['.venv/bin/python',str(REV/'package-native-review.py')])
print('CORNER_REVIEW_CHECKS_COMPLETE',flush=True)
