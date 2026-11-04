from pathlib import Path
import subprocess,json,hashlib
root=Path(__file__).resolve().parents[2];out=Path(__file__).resolve().parent/'original';files=[]
for v in ('compact','planning'):
 files.extend(p for p in (root/f'outputs/output-proposed-{v}').glob('*')if p.is_file()and p.suffix in('.blend','.glb','.json'))
 files.extend(p for p in (root/f'outputs/output-visual-realism-{v}').glob('*')if p.is_file())
 files.extend(root/f'walkthrough/public/proposal-{v}{suffix}'for suffix in('.glb','-navigation.json'))
files.extend(p for p in (root/'walkthrough/public/visual-quality').rglob('*')if p.is_file())
files.extend(root/p for p in ['scripts/model/modern_loft_stair.py','scripts/model/proposal_level_loft.py','scripts/model/proposal_loft_bedroom_expansion.py','proposal/interiors/leisure/loft-stair.json','walkthrough/tests/modern-loft-stair.test.mjs','README.md','docs/WORKSPACE.md'])
report={}
for p in files:
 rel=p.relative_to(root);dest=out/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 assert not dest.exists(),dest
 subprocess.run(['cp','-c',str(p),str(dest)],check=True)
 report[str(rel)]=hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
(out.parent/'recovery-manifest.json').write_text(json.dumps(report,indent=2)+'\n')
print('RECOVERED',len(report),flush=True)
