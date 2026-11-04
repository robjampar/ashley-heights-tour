"""Reconcile metadata for explicitly retired bar meshes; all geometry hashes stay fixed."""
from pathlib import Path
import json,struct,hashlib,shutil,sys
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import source_hashes
rev=ROOT/'revisions/basement-roof-corrections-2026-10-20';records=[]
for v in ('compact','planning'):
 root=ROOT/'walkthrough/public/visual-quality';p=root/(v+'-furnishings.json');g=root/(v+'-furnishings.glb')
 with g.open('rb') as f:
  f.seek(12);n,t=struct.unpack('<II',f.read(8));doc=json.loads(f.read(n))
 names={o.get('name') for o in doc['nodes']};meta=json.loads(p.read_text());bar=meta['barDetails']
 retired=set(bar['addedObjects'])-names
 reported=set(json.loads((ROOT/f'outputs/output-basement-roof-{v}/finish-report.json').read_text())['removedObjects'])
 assert retired<=reported,retired-reported
 report_path=ROOT/f'outputs/output-visual-realism-{v}/refinement-report.json'
 for old in [p,report_path]:
  q=rev/'before-bar-inventory-fix'/old.relative_to(ROOT);q.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(old,q)
 bar['addedObjects']=[x for x in bar['addedObjects']if x not in retired]
 bar['removedObjects']=sorted(set(bar['removedObjects'])|retired)
 bar['supersededBySourceRevision']=sorted(retired)
 p.write_text(json.dumps(meta,indent=2)+'\n');report_path.write_text(json.dumps(meta,indent=2)+'\n')
 record={'variant':v,'revision':'basement-roof-corrections-2026-10-20','method':'Metadata-only reconciliation of explicitly retired bar floor/panel meshes; no native, GLB, navigation or daylight data modified.','retiredInventoryEntries':sorted(retired),'unchangedFurnishingsSHA256':hashlib.file_digest(g.open('rb'),'sha256').hexdigest(),'sourceInputsAfterMetadataFix':source_hashes(ROOT,v)}
 (ROOT/f'outputs/output-proposed-{v}/basement-roof-inventory-refresh.json').write_text(json.dumps(record,indent=2))
 records.append(record);print(v,len(retired),'retired declarations reconciled')
(rev/'inventory-refresh.json').write_text(json.dumps(records,indent=2))
