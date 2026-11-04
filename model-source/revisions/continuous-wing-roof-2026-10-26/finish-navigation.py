"""Register the reinstated strip as indoor floor as well as walking surface."""
from pathlib import Path
import json,hashlib,sys,shutil
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import source_hashes
for v in ('compact','planning'):
 out=R/f'outputs/output-continuous-wing-roof-{v}';target=R/f'outputs/output-proposed-{v}';p=out/'navigation.json';n=json.loads(p.read_text())
 n['planRooms']=[r for r in n['planRooms']if r['name']!='Restored loft gallery']+[{'name':'Restored loft gallery','floor':3,'base_z':5.55,'polygon_m':[[9.7,-3.03],[10.42,-3.03],[10.42,-.115],[9.7,-.115]],'proposal':True}]
 p.write_text(json.dumps(n,separators=(',',':')));shutil.copyfile(p,target/'navigation.json');shutil.copyfile(p,R/f'walkthrough/public/proposal-{v}-navigation.json')
 sources=source_hashes(R,v);(out/'source-inputs.json').write_text(json.dumps(sources,indent=2));manifest=target/'continuous-wing-roof-refresh.json';m=json.loads(manifest.read_text());m['sourceInputs']=sources;m['files']['navigation.json']=hashlib.file_digest(p.open('rb'),'sha256').hexdigest();m['navigationFollowup']='Registered the restored overhang as an indoor plan room using the canonical pass.';manifest.write_text(json.dumps(m,indent=2))
 print('GALLERY_INDOOR_FOOTPRINT_UPDATED',v)
