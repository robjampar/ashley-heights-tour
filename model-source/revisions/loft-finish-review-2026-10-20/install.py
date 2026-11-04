"""Install checked local assets; no publishing or historical build-cache edits."""
import json,hashlib,shutil
from pathlib import Path
from datetime import datetime,timezone
import sys
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
for v in ('compact','planning'):
    source=ROOT/f'outputs/output-loft-finish-{v}';target=ROOT/f'outputs/output-proposed-{v}';name=native_name(v)
    followup=json.loads((source/'navigation-followup.json').read_text())
    assert followup['finalSourceInputs']==source_hashes(ROOT,v)
    files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
    for filename in files:shutil.copyfile(source/filename,target/filename)
    shutil.copyfile(target/(name+'.glb'),ROOT/f'walkthrough/public/proposal-{v}.glb')
    shutil.copyfile(target/'navigation.json',ROOT/f'walkthrough/public/proposal-{v}-navigation.json')
    report={'revision':'loft-finish-review-2026-10-20','variant':v,'updatedAt':datetime.now(timezone.utc).isoformat(),
      'method':'Targeted native enclosure and furnishing update, complete GLB export, followed by navigation-only wall collision addition.',
      'fullRebuildPerformed':False,'sourceInputsAtPreparation':json.loads((source/'source-inputs.json').read_text()),
      'navigationFollowup':followup,'changes':json.loads((source/'finish-report.json').read_text()),
      'files':{filename:sha(target/filename)for filename in files}}
    (target/'loft-finish-refresh.json').write_text(json.dumps(report,indent=2))
    print('LOCAL_LOFT_INSTALLED',v)
