import subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
blender=Path.home()/'Applications/Blender.app/Contents/MacOS/Blender'
stages=[
 ('models',['.venv/bin/python','scripts/build/regenerate_design_outputs.py','--models-only','--jobs','2'],'logs/level-loft-integration-build-2026-10-19.log'),
 ('geometry',['node','scripts/audits/audit_level_loft.mjs'],'logs/level-loft-final-geometry.log'),
 ('python',['make','test-python'],'logs/level-loft-python-tests-2026-10-19.log'),
 ('originals',[str(blender),'--background','--python-exit-code','1','--python','scripts/audits/audit_level_loft_native.py','--','compact','planning'],'logs/level-loft-native-preservation.log'),
 ('visuals',['make','build-visuals'],'logs/level-loft-visual-build-2026-10-19.log'),
 ('visual-audit',['.venv/bin/python','scripts/audits/audit_visual_quality.py','--output','walkthrough/test-results/level-loft-integration-2026-10-19/visual-quality-audit.json'],'logs/level-loft-visual-audit.log'),
 ('web-build',['make','build-web'],'logs/level-loft-web-build-2026-10-19.log'),
 ('web-tests',['make','test-web'],'logs/level-loft-web-tests-2026-10-19.log'),
]
start=sys.argv[1] if len(sys.argv)>1 else 'models'
stages=stages[next(i for i,s in enumerate(stages) if s[0]==start):]
for name,cmd,log in stages:
 print('START',name,flush=True)
 with (ROOT/log).open('w') as f:result=subprocess.run(cmd,cwd=ROOT,stdout=f,stderr=subprocess.STDOUT)
 print('END',name,result.returncode,flush=True)
 if result.returncode:raise SystemExit(result.returncode)
