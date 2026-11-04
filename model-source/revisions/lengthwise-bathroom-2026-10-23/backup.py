from pathlib import Path
import shutil,hashlib,json,sys
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name
rev=R/'revisions/lengthwise-bathroom-2026-10-23';saved=[]
files=['scripts/build/build_support.py','tests/test_build_pipeline.py','README.md','docs/WORKSPACE.md','walkthrough/tests/suite-layout-loft.test.mjs','walkthrough/tests/modern-loft-stair.test.mjs','walkthrough/tests/construction-details.test.mjs']
for v in ('compact','planning'):
 base=f'outputs/output-proposed-{v}/';files +=[base+n for n in [native_name(v)+'.blend',native_name(v)+'.glb','geometry.json','navigation.json','open-suite-eaves-refresh.json']]
 files += [str(p.relative_to(R))for p in (R/'walkthrough/public').glob(f'proposal-{v}*') if p.is_file()]
for rel in files:
 p=R/rel;q=rev/'original'/rel;q.parent.mkdir(parents=True,exist_ok=True)
 if not q.exists():shutil.copyfile(p,q)
 saved.append({'path':rel,'sha256':hashlib.file_digest(q.open('rb'),'sha256').hexdigest()})
(rev/'recovery.json').write_text(json.dumps(saved,indent=2)+'\n');print('RECOVERY',len(saved))
