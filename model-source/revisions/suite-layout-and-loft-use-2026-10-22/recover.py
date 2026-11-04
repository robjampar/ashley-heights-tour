from pathlib import Path
import subprocess,json,hashlib
R=Path(__file__).resolve().parents[2];D=Path(__file__).parent/'original';files=[]
for v in ('compact','planning'):
 files.extend(p for p in (R/f'outputs/output-proposed-{v}').iterdir() if p.suffix in ('.blend','.glb','.json'))
 files.extend(R/f'walkthrough/public/proposal-{v}{s}'for s in ('.glb','-navigation.json'))
for p in ['scripts/build/build_support.py','scripts/model/proposal_editability.py','scripts/model/proposal_edit_views.py','README.md','docs/WORKSPACE.md']:
 files.append(R/p)
report={}
for p in files:
 dest=D/p.relative_to(R);dest.parent.mkdir(parents=True,exist_ok=True)
 if not dest.exists():subprocess.run(['cp','-c',str(p),str(dest)],check=True)
 report[str(p.relative_to(R))]=hashlib.file_digest(dest.open('rb'),'sha256').hexdigest()
(D.parent/'recovery-manifest.json').write_text(json.dumps(report,indent=2))
print('recovery',len(report))
