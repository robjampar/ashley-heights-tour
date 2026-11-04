from pathlib import Path
import subprocess,json,hashlib
R=Path(__file__).resolve().parents[2];D=Path(__file__).parent/'original';M=Path(__file__).parent/'recovery-manifest.json';manifest=json.loads(M.read_text());files=list((R/'walkthrough/public/visual-quality').rglob('*'))
for v in ('compact','planning'):files+=list((R/f'outputs/output-visual-realism-{v}').glob('*'))
for p in files:
 if not p.is_file():continue
 rel=p.relative_to(R);dest=D/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 if not dest.exists():subprocess.run(['cp','-c',str(p),str(dest)],check=True)
 manifest[str(rel)]=hashlib.file_digest(dest.open('rb'),'sha256').hexdigest()
M.write_text(json.dumps(manifest,indent=2));print('RECOVERY',len(manifest))
