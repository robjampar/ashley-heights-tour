import subprocess,os,json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
R=Path(__file__).resolve().parents[2];REV='loft-dormer-alignment-2026-10-19';E=R/'walkthrough/test-results'/REV;blender=str(Path.home()/'Applications/Blender.app/Contents/MacOS/Blender')
os.environ['LOFT_AUDIT_REVISION']=REV

def run(name,args,env=None):
 print('START',name,flush=True)
 with (R/f'logs/loft-dormer-alignment-final-{name}-2026-10-19.log').open('w')as f:r=subprocess.run(args,cwd=R,stdout=f,stderr=subprocess.STDOUT,env=env)
 print('END',name,r.returncode,flush=True)
 if r.returncode:raise RuntimeError(name+' failed')

def export(v):run('export-'+v,[blender,'--background','--python-exit-code','1','--python',str(R/'revisions'/REV/'export-and-integrate.py'),'--',v])
env={**os.environ,'LOFT_BEDROOM_ASSET_DIR':str(E),'LOFT_AUDIT_ASSET_DIR':str(E)}
run('preflight-tests',['node','--test','walkthrough/tests/loft-bedroom-expansion.test.mjs','walkthrough/tests/loft-eaves-access.test.mjs'],env)
run('preflight-geometry',['node','scripts/audits/audit_level_loft.mjs'],env)
run('preservation',['.venv/bin/python',str(R/'revisions'/REV/'check-preservation.py')])
with ThreadPoolExecutor(max_workers=2)as p:list(p.map(export,['compact','planning']))

def verify(task):run(*task)
with ThreadPoolExecutor(max_workers=3)as p:
 list(p.map(verify,[('geometry',['node','scripts/audits/audit_level_loft.mjs']),('originals',[blender,'--background','--python-exit-code','1','--python','scripts/audits/audit_level_loft_native.py','--','compact','planning']),('python',['make','test-python'])]))
run('visuals',['.venv/bin/python',str(R/'revisions'/REV/'refresh-final-visuals.py')])
run('visual-audit',['.venv/bin/python','scripts/audits/audit_visual_quality.py','--output',str(E/'visual-quality-audit.json')])
run('web-build',['make','build-web'])
run('web-tests',['make','test-web'])
print('VALIDATION_COMPLETE',flush=True)
