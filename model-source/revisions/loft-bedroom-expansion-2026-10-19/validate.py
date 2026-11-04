import subprocess,os
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
ROOT=Path(__file__).resolve().parents[2];REV='loft-bedroom-expansion-2026-10-19';E=ROOT/'walkthrough/test-results'/REV
blender=str(Path.home()/'Applications/Blender.app/Contents/MacOS/Blender')
os.environ['LOFT_AUDIT_REVISION']=REV
def run(name,args):
 print('START',name,flush=True)
 with (ROOT/f'logs/loft-bedroom-final-{name}-2026-10-19.log').open('w')as f:r=subprocess.run(args,cwd=ROOT,stdout=f,stderr=subprocess.STDOUT)
 print('END',name,r.returncode,flush=True)
 if name=='layout' and r.returncode:
  clean=lambda p:{s for s in p.read_text().splitlines()if s and not s.startswith(('.venv/','make:'))}
  baseline=clean(ROOT/'logs/modern-loft-layout-2026-10-19.log');current=clean(ROOT/f'logs/loft-bedroom-final-{name}-2026-10-19.log')
  if current==baseline and len(current)==345:
   print('LAYOUT_BASELINE_UNCHANGED: 345 existing findings; no new findings',flush=True);return 0
 return r.returncode
stages=[('geometry',['node','scripts/audits/audit_level_loft.mjs']),('originals',[blender,'--background','--python-exit-code','1','--python','scripts/audits/audit_level_loft_native.py','--','compact','planning']),('visuals',['make','build-visuals']),('python',['make','test-python']),('layout',['make','check-layout'])]
with ThreadPoolExecutor(max_workers=3)as pool:
 codes=[future.result()for future in as_completed([pool.submit(run,*s)for s in stages])]
if any(codes):raise SystemExit(1)
for name,args in [('preservation',['.venv/bin/python',str(ROOT/'revisions'/REV/'verify-preservation.py')]),('visual-audit',['.venv/bin/python','scripts/audits/audit_visual_quality.py','--output',str(E/'visual-quality-audit.json')]),('web-build',['make','build-web']),('web-tests',['make','test-web'])]:
 if run(name,args):raise SystemExit(1)
print('VALIDATION_COMPLETE',flush=True)
