"""Historical SW02 acceptance regression; live CJ01 has its own integration checks."""
import json,unittest
from pathlib import Path
import numpy as np
from scripts.structure.junctions import solid,cuboid

ROOT=Path(__file__).resolve().parents[1]
def read(path):
 if not path.startswith('revisions/'):path='revisions/continuous-joist-integration-2026-10-28/original/'+path
 return json.loads((ROOT/path).read_text())


class SW02IntegrationTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.m=read('walkthrough/public/structure/members.json');cls.by={e['id']:e for e in cls.m['elements']}
  cls.old=read('revisions/sw02-integration-2026-10-27/original/walkthrough/public/structure/members.json')
  cls.g=read('outputs/output-proposed-compact/geometry.json');cls.native={e['object_name']:e for e in cls.g['objects']}
  cls.before=read('revisions/sw02-integration-2026-10-27/original/outputs/output-proposed-compact/geometry.json')

 def test_suite_furniture_is_exactly_preserved(self):
  checked=0
  for e in self.before['objects']:
   n=e['object_name']
   if n.startswith(('Bedroom 02 |','Ensuite 02 |')) and any(t in n.lower()for t in ('bed ','sofa','desk','wardrobe','bath ','shower','basin','wc ')):
    self.assertEqual(e,self.native[n],n);checked+=1
  self.assertGreater(checked,100)

 def test_post_is_one_storey_and_the_old_column_is_absent(self):
  post=self.by['M-SW02-POST']
  self.assertNotIn('M-LP02-COLUMN',self.by)
  self.assertFalse(any(n.startswith('Structure fit | stair-side column')for n in self.native))
  self.assertAlmostEqual(post['axis'][0][0],9.455)
  self.assertAlmostEqual(post['axis'][0][1],-11.01)
  self.assertLess(post['measurements']['lengthM'],2.41)
  self.assertGreater(post['bounds'][0][2],2.7)
  self.assertFalse(post['columnScreen']['approvedForConstruction'])

 def test_post_has_an_unbroken_geometric_bearing_chain(self):
  ids=['M-FR-3-001','M-SW02-CAP','M-SW02-POST','M-SW02-BASE','M-SW02-GROUT','M-SW02-PAD']
  for above,below in zip(ids,ids[1:]):self.assertAlmostEqual(self.by[above]['bounds'][0][2],self.by[below]['bounds'][1][2],places=5)
  wall=self.by['M-BLOCK-73B5665'];pad=self.by['M-SW02-PAD'];lo,hi=pad['bounds'];z=lo[2]-.00001
  contact=solid(wall['triangles'])^cuboid([lo[0],lo[1],z-.001],[hi[0],hi[1],z])
  self.assertAlmostEqual(contact.volume(),.215*.45*.001,places=8)
  self.assertAlmostEqual(wall['bounds'][0][2],self.by['M-G01-GARAGE-SLAB']['bounds'][1][2])
  self.assertAlmostEqual(self.by['M-SW02-CINEMA-NORTH-PIER']['bounds'][1][2],self.by['M-G01-GARAGE-SLAB']['bounds'][0][2])
  self.assertAlmostEqual(self.by['M-SW02-CINEMA-NORTH-PIER']['bounds'][0][2],-3)

 def test_new_solid_joists_have_supported_ends_and_limited_spans(self):
  js=[e for e in self.by.values()if e.get('sw02Solid')]
  self.assertGreater(len(js),50)
  for e in js:
   self.assertLessEqual(e['engineeringSpanM'],4.22251,e['id'])
   self.assertEqual(e['sectionSizeM'],[.072,.245])
   self.assertTrue(all(s['kind']=='receiver-reservation'and s['memberId']in self.by for s in e['endSupports']),e['id'])
   self.assertTrue(all(c['withinScreen']for c in e['supportScreen']['cases']),e['id'])
  fit=self.m['junctionReview']['connectionFit'];self.assertEqual(fit['intersections'],[]);self.assertEqual(fit['seatLevelErrors'],[])

 def test_no_new_scoped_structure_or_covering_clashes(self):
  for doc,key in [('junctionReview','clashAudit'),('coveringFit',None)]:
   a=self.m[doc][key]if key else self.m[doc];b=self.old[doc][key]if key else self.old[doc]
   def pairs(data):return {tuple(sorted((e['a'],e['b'])))if key else(e['objectName'],e['memberId']) for e in data['intersections']}
   self.assertFalse(pairs(a)-pairs(b))

 def test_console_clears_the_stair_and_existing_media_furniture(self):
  e=self.native['Bar detail | west library walnut console'];v=np.array(e['vertices']);lo,hi=v.min(0),v.max(0)
  self.assertGreater(lo[0],7.9);self.assertLess(hi[0],9.7);self.assertGreater(lo[1],-4.65);self.assertLess(hi[1],-4.23)
  n=read('outputs/output-proposed-compact/navigation.json')
  for o in n['obstacles']:
   if not o['name'].startswith(('Bar 01 | media','Bar detail | club chair','Bar detail | lounge side table')):continue
   a,b,c,d=o['box'];overlap=min(hi[0],c)-max(lo[0],a),min(hi[1],d)-max(lo[1],b)
   self.assertFalse(all(v>1e-6 for v in overlap),o['name'])
  for e in self.g['objects']:
   if not e.get('vertices')or 'basement stair'not in e['object_name'].lower():continue
   v=np.array(e['vertices']);overlap=np.minimum(hi,v.max(0))-np.maximum(lo,v.min(0))
   self.assertFalse(np.all(overlap>1e-5),e['object_name'])

 def test_new_doorways_are_aligned_and_away_from_the_post_bearing(self):
  n=read('outputs/output-proposed-compact/navigation.json')
  ds=[d for d in n['interactiveDoors']if d['id']in ('Proposal | Garage east separation door 0','Proposal | Basement cinema door')]
  self.assertEqual(len(ds),2)
  for d in ds:self.assertEqual(d['openingCenter'][:2],[9.455,-11.925]);self.assertAlmostEqual(d['apertureWidth'],.826)
  self.assertGreater(self.by['M-SW02-PAD']['bounds'][0][1]-(-11.45),.2)


if __name__=='__main__':unittest.main()
