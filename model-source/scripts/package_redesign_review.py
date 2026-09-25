"""Publish the reviewed narrative, drawings and validation evidence as static assets."""
from pathlib import Path
import json,shutil
from redesign_support import current_redesign
from redesign_captures import verify_captures
ROOT=Path(__file__).resolve().parents[1]
notes=json.loads((ROOT/'proposal/redesigns/review-notes.json').read_text());dest=ROOT/'walkthrough/public/redesigns';dest.mkdir(exist_ok=True)
options=[]
for id in ('i1','i2','i3','e1','e2','e3'):
 out=ROOT/('output-redesign-'+id);nav=json.loads((out/'navigation.json').read_text())
 report=json.loads((out/'build-report.json').read_text())
 fresh,reason=current_redesign(ROOT,id,Path(report['blender']['path']))
 assert fresh,id+' is not a verified current model: '+reason
 verify_captures(ROOT,id,nav['modelUpdatedAt'])
 spec=nav['redesign'];plans=json.loads((ROOT/'proposal/redesigns/plans'/id/'manifest.json').read_text())
 assert plans['modelUpdatedAt']==nav['modelUpdatedAt'],id+' plans are stale'
 d={k:spec[k]for k in ('code','name','group','summary','bedrooms','ensuites','retained','main_changes')};d.update(notes[id]);d['id']=id;d['modelUpdatedAt']=nav['modelUpdatedAt'];d['plans']=plans['plans'];d['footprint']={k:v for k,v in plans.items()if k.endswith('footprint_m2')};d['tourUrl']='../?design='+id
 view=next((r for r in nav['rooms']if r['label']==d['tourRoom']),None)
 if view:d['tourView']=view['id']
 checks={}
 for name,file in [('circulation','circulation-audit.json'),('privateAccess','private-access-audit.json'),('ensuiteAccess','ensuite-access-audit.json'),('stairs','stairs-navigation-audit.json'),('parking','parking-audit.json'),('headroom','stair-headroom-audit.json'),('pool','pool-navigation-audit.json'),('site','site-clearance-audit.json'),('garageAccess','garage-access-audit.json')]:
  p=out/file
  if p.exists():
   a=json.loads(p.read_text())
   assert a.get('modelUpdatedAt')==nav['modelUpdatedAt'],id+' '+name+' audit is stale'
   checks[name]={k:a[k]for k in ('passed','groups','limitations','body_width_m','search_margin_m','vehicle_m','clearances','positions','bedrooms','ensuite_bedrooms')if k in a}
 assert all(checks.get(k,{}).get('passed')for k in ('circulation','privateAccess','ensuiteAccess')),id+' needs passing circulation, private-access and en-suite audits'
 if id.startswith('e'):
  assert all(checks.get(k,{}).get('passed')for k in ('stairs','parking','pool','garageAccess')),id+' needs current passing stairs, parking and pool audits'
  assert 'headroom'in checks,id+' needs current native-mesh stair headroom measurements'
 assert checks['ensuiteAccess']['ensuite_bedrooms']==spec['ensuites'],id+' en-suite count differs from checked routes'
 d['checks']=checks;d['groundworks']=nav.get('proposalSite',{}).get('groundworks')
 folder=dest/'plans'/id;folder.mkdir(parents=True,exist_ok=True)
 for p in (ROOT/'proposal/redesigns/plans'/id).glob('*.svg'):shutil.copyfile(p,folder/p.name)
 shutil.copyfile(ROOT/'proposal/redesigns/plans'/id/'manifest.json',folder/'manifest.json')
 options.append(d)
(dest/'options.json').write_text(json.dumps({'date':'25 September 2026','options':options},indent=2)+'\n')
print('Six-option review data packaged')
