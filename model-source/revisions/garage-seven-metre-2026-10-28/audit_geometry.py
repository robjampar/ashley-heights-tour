import json,sys,itertools,math
from pathlib import Path
sys.path.insert(0,str(Path.cwd()))
from scripts.structure.junctions import solid
root=Path(__file__).resolve().parents[2];stage=root/'outputs/output-proposed-compact';m=json.loads((root/'walkthrough/public/structure/members.json').read_text());by={e['id']:e for e in m['elements']};old=json.loads((root/'revisions/garage-seven-metre-2026-10-28/original/walkthrough/public/structure/members.json').read_text());cache={};hits=[]
def shape(e):
 if e['id']not in cache:cache[e['id']]=solid(e['triangles'])
 return cache[e['id']]
def overlap(a,b):return all(min(a['bounds'][1][k],b['bounds'][1][k])-max(a['bounds'][0][k],b['bounds'][0][k])>1e-6 for k in range(3))
for a in m['elements']:
 if not a.get('cj01Joist') and not a.get('garageSevenMetre'):continue
 for b in m['elements']:
  if a['id']==b['id']or b['category']not in ['masonry','beams','joists','partitions','trimmers','rc']or not overlap(a,b):continue
  if a.get('cj01Joist')and b['category']not in ['masonry']:continue
  v=(shape(a)^shape(b)).volume()
  if v>1e-7:hits.append(dict(a=a['id'],b=b['id'],cm3=v*1e6))
new={}
for key in ['junctionReview','coveringFit']:
 a=m[key]['clashAudit']if key=='junctionReview'else m[key];b=old[key]['clashAudit']if key=='junctionReview'else old[key]
 pair=lambda e:tuple(sorted([e['a'],e['b']]))if key=='junctionReview'else(e['objectName'],e['memberId']);before={pair(e)for e in b['intersections']};new[key]=[e for e in a['intersections']if pair(e)not in before]
fails=[e['id']for e in m['elements']if (e.get('calculationRef')or'').startswith('CJ01')and any(not c['withinScreen']for c in e.get('supportScreen',{}).get('cases',[])+e.get('supportScreen',{}).get('patternCases',[]))]
report=dict(newScopedIntersections=new,joistAndPartitionIntersections=hits,failedCJGravity=fails,supportAudit=m['supportAudit'],connectionFit=m['junctionReview']['connectionFit'],bearings=[s for i in ['M-FR-3-001','M-FR-3-010']for s in by[i]['bearingSeats']],counts={k:len(m[k]['clashAudit'if k=='junctionReview'else'intersections']['intersections'])if k=='junctionReview'else len(m[k]['intersections'])for k in ['junctionReview','coveringFit']})
(root/'revisions/garage-seven-metre-2026-10-28/geometry-audit.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items()if k not in ['bearings','connectionFit']},indent=2));assert not hits and not any(new.values())and not fails and all(b['baseSupportedFraction']>.99999 for b in report['bearings'])
