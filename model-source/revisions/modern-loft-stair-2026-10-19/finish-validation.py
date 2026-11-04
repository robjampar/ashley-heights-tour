import fcntl,json,subprocess,sys
from concurrent.futures import ThreadPoolExecutor,as_completed
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import current_build
blender=Path.home()/'Applications/Blender.app/Contents/MacOS/Blender'
REV='modern-loft-stair-2026-10-19';E=ROOT/'walkthrough/test-results'/REV
print('Waiting for current full native builds',flush=True)
for variant in ['compact','planning']:
 with (ROOT/f'outputs/output-proposed-{variant}/.runner.lock').open('r') as f:fcntl.flock(f,fcntl.LOCK_SH)
 fresh,why=current_build(ROOT,variant,blender)
 assert fresh,(variant,why)
print('Both current full builds verified',flush=True)
def run(name,args):
 print('START',name,flush=True)
 with (ROOT/f'logs/modern-loft-{name}-2026-10-19.log').open('w') as f:
  code=subprocess.run(args,cwd=ROOT,stdout=f,stderr=subprocess.STDOUT).returncode
 print('END',name,code,flush=True)
 return name,code
for variant in ['compact','planning']:
 if run('gutter-'+variant,[str(blender),'--background','--python-exit-code','1','--python',str(ROOT/'revisions'/REV/'finish-gutter.py'),'--',variant])[1]:raise SystemExit(1)
stages=[('geometry',['node','scripts/audits/audit_level_loft.mjs']),('originals',[str(blender),'--background','--python-exit-code','1','--python','scripts/audits/audit_level_loft_native.py','--','compact','planning']),('visuals',['make','build-visuals'])]
results=[]
with ThreadPoolExecutor(max_workers=3) as pool:
 for future in as_completed([pool.submit(run,*stage) for stage in stages]):results.append(future.result())
if any(code for _,code in results):raise SystemExit(1)
for name,args in [('visual-audit',['.venv/bin/python','scripts/audits/audit_visual_quality.py','--output',str(E/'visual-quality-audit.json')]),('web-build',['make','build-web']),('web-tests',['make','test-web'])]:
 if run(name,args)[1]:raise SystemExit(1)
print('VALIDATION_COMPLETE',flush=True)
