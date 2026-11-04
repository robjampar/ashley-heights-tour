"""Checked local integration; deliberately contains no publishing step."""
from pathlib import Path
import subprocess,sys
R=Path(__file__).resolve().parents[2];rev='revisions/garden-workshop-envelope-2026-10-26';blender='/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender'
steps=[
 ('preservation',[blender,'--background','--python-exit-code','1','--python',rev+'/check-original-scenes.py','--','compact']),
 ('geometry',['node',rev+'/check-export.mjs']),
 ('install',[sys.executable,rev+'/install.py']),
 ('visuals-run',[sys.executable,rev+'/run-visuals.py','compact']),
 ('build-web',['make','build-web']),
 ('web-tests',['make','test-web']),
 ('visual-audit',[sys.executable,'scripts/audits/audit_visual_quality.py','--output','walkthrough/test-results/garden-workshop-envelope-2026-10-26/visual-quality-audit.json']),
 ('after-browser',['node',rev+'/browser-review.mjs','after']),
 ('served',['node',rev+'/check-served-assets.mjs']),
]
for label,cmd in steps:
    print('START',label,flush=True)
    with (R/f'logs/garden-workshop-{label}.log').open('w')as log:subprocess.run(cmd,cwd=R,stdout=log,stderr=subprocess.STDOUT,check=True)
    print('PASS',label,flush=True)
