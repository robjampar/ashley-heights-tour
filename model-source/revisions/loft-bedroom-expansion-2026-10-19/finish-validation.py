import subprocess,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];E=ROOT/'walkthrough/test-results/loft-bedroom-expansion-2026-10-19'
assert json.loads((E/'layout-comparison.json').read_text())['unchanged']
assert all(r['equal']for r in json.loads((E/'native-preservation.json').read_text()))
assert '\nOK\n' in (ROOT/'logs/loft-bedroom-final-python-rechecked-2026-10-19.log').read_text()
for name,args in [('visual-audit',['.venv/bin/python','scripts/audits/audit_visual_quality.py','--output',str(E/'visual-quality-audit.json')]),('web-build',['make','build-web']),('web-tests',['make','test-web'])]:
 print('START',name,flush=True)
 with (ROOT/f'logs/loft-bedroom-final-head-{name}-2026-10-19.log').open('w')as f:r=subprocess.run(args,cwd=ROOT,stdout=f,stderr=subprocess.STDOUT)
 print('END',name,r.returncode,flush=True)
 if r.returncode:raise SystemExit(r.returncode)
print('VALIDATION_COMPLETE',flush=True)
