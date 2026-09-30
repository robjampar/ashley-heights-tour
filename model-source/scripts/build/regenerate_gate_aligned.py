#!/usr/bin/env python3
"""Regenerate and verify the independent G1 option without publishing."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import json,os,subprocess,sys
from scripts.redesigns.redesign_support import current_redesign
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'outputs/output-redesign-g1'
BLENDER=next(p for p in (Path.home()/'Applications/Blender.app/Contents/MacOS/Blender',Path('/Applications/Blender.app/Contents/MacOS/Blender'))if p.is_file())
def run(args,**kwargs):
 print('RUN',' '.join(str(x)for x in args),flush=True);subprocess.run([str(x)for x in args],cwd=ROOT,check=True,**kwargs)
current,reason=current_redesign(ROOT,'g1',BLENDER)
if not current:run([BLENDER,'--background','--python-exit-code','1','--python','scripts/build/build_redesign.py','--','g1'])
else:print('REUSE G1:',reason,flush=True)
for script in ('audits/audit_gate_aligned.py','redesigns/redesign_walk_masks.py','drawings/draw_redesign_plans.py'):run([sys.executable,'scripts/'+script,'g1'])
run(['node','walkthrough/tests/redesign-circulation.mjs','g1'],env={**os.environ,'AUDIT_DEBUG':'1'})
for script in ('redesign-private-access','redesign-ensuite-access','redesign-stairs','redesign-garage-access','gate-aligned-parking'):run(['node','walkthrough/tests/'+script+'.mjs','g1'])
run([BLENDER,'--background','--python-exit-code','1','--python','scripts/audits/audit_gate_headroom.py'])
nav=json.loads((OUT/'navigation.json').read_text())
for report in nav['gateAlignment']['audit_reports']:
 data=json.loads((OUT/report).read_text());assert data['modelUpdatedAt']==nav['modelUpdatedAt']and data['passed'],report
assert current_redesign(ROOT,'g1',BLENDER)[0]
subprocess.run(['npm','run','build'],cwd=ROOT/'walkthrough',check=True)
print('G1 model, drawings, checks and browser assets ready. No publication performed.',flush=True)
