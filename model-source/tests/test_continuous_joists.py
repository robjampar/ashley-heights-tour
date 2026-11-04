"""CJ01 live geometry, traceable loads, supplier conditions and finish fit."""
import json,math,unittest
from pathlib import Path
import numpy as np
from scripts.structure.junctions import solid,cuboid
ROOT=Path(__file__).resolve().parents[1]
OLD=ROOT/'revisions/continuous-joist-integration-2026-10-28/original'
def read(p):return json.loads(p.read_text())

class ContinuousJoistTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.m=read(ROOT/'walkthrough/public/structure/members.json');cls.by={e['id']:e for e in cls.m['elements']}
  cls.old=read(OLD/'walkthrough/public/structure/members.json')
  cls.nav=read(ROOT/'outputs/output-proposed-compact/navigation.json')
  cls.g=read(ROOT/'outputs/output-proposed-compact/geometry.json');cls.native={e['object_name']:e for e in cls.g['objects']}
  cls.before=read(OLD/'outputs/output-proposed-compact/geometry.json')
 def test_accepted_suite_furniture_and_original_design_scenes_preserved(self):
  n=0
  for e in self.before['objects']:
   name=e['object_name']
   if name.startswith(('Bedroom 02 |','Ensuite 02 |'))and any(t in name.lower()for t in ('bed ','sofa','desk','wardrobe','bath ','shower','basin','wc ')):
    self.assertEqual(e,self.native[name],name);n+=1
  self.assertGreater(n,100)
  report=read(ROOT/'outputs/output-cj01-release-staging/cj01-report.json')
  self.assertEqual(len(report['preservedScenes']),7)
  self.assertTrue(self.nav['continuousJoistIntegration']['suiteLayoutPreserved'])
 def test_repeated_fields_are_north_south_with_real_supports(self):
  js=[e for e in self.by.values()if e.get('cj01Joist')];self.assertGreater(len(js),90)
  for e in js:
   a,b=e['axis'];self.assertAlmostEqual(a[0],b[0]);self.assertGreater(abs(a[1]-b[1]),.15)
   self.assertTrue(all(s['kind']=='receiver-reservation'and s['memberId']in self.by for s in e['endSupports']),e['id'])
   self.assertTrue(e['supplierSpanCheck']['withinTable']);self.assertEqual(e['spacingMm'],400)
   self.assertEqual(e['profileM'],[.009,.045])
   self.assertEqual(e['sectionSizeM'],[.097,.35 if e['id'].startswith('M-J-03-')else .3])
  self.assertEqual(self.m['supportAudit']['unmappedJoistEnds'],0)
 def test_max_spacing_in_main_clear_bays(self):
  js=[e for e in self.by.values()if e.get('cj01Joist')]
  for level,ys in [(1,[-15,-10.5,-9,-5.7]),(3,[-15,-10.5,-9,-5.7,-4.7])]:
   for y in ys:
    positions=[e['axis'][0][0]for e in js if e['level']==level and min(p[1]for p in e['axis'])<y<max(p[1]for p in e['axis'])]
    positions += [e['axis'][0][0]for e in self.by.values()if e.get('receiver')and e['level']==level and abs(e['axis'][0][0]-e['axis'][1][0])<1e-5 and min(p[1]for p in e['axis'])<y<max(p[1]for p in e['axis']) and 5.16<e['axis'][0][0]<13.8]
    positions=sorted(set(round(x,5)for x in positions if 5.16<x<13.8))
    for a,b in zip(positions,positions[1:]):
     # The genuine entrance void and the bearing-wall gap are not joist bays.
     if y>-9.7 and a<7.7 and b-a>.6:continue
     self.assertLessEqual(b-a,.40002,(level,y,a,b))
 def test_reoriented_joists_clear_all_masonry_faces(self):
  walls=[e for e in self.by.values()if e['category']=='masonry'];cache={}
  for j in self.by.values():
   if not j.get('cj01Joist'):continue
   a,b=j['bounds']
   for wall in walls:
    c,d=wall['bounds']
    if any(min(b[k],d[k])-max(a[k],c[k])<=1e-6 for k in range(3)):continue
    for e in (j,wall):
     if e['id']not in cache:cache[e['id']]=solid(e['triangles'])
    self.assertLess((cache[j['id']]^cache[wall['id']]).volume(),1e-7,(j['id'],wall['id']))
 def test_column_removed_and_lower_wall_opening_has_no_floating_blockwork(self):
  self.assertNotIn('M-SW02-POST',self.by);self.assertFalse(any(n.startswith('SW02 | Suite support')for n in self.native))
  e=self.by['M-BLOCK-4D5245A'];self.assertAlmostEqual(e['leafThicknessM'],.215)
  self.assertAlmostEqual(e['bounds'][0][2],self.by['M-G01-GARAGE-SLAB']['bounds'][1][2])
  self.assertLess((solid(e['triangles'])^cuboid([9.578,-10.03,0],[13.62,-9.78,2.756])).volume(),1e-8)
  self.assertEqual(len(self.by['M-CJ01-GROUND-HEAD']['bearingSeats']),2)
  for ident in ('M-BLOCK-4D5245A','M-BLOCK-291FC58'):
   wall=solid(self.by[ident]['triangles'])
   for j in self.by.values():
    if j.get('cj01Joist'):self.assertLess((wall^solid(j['triangles'])).volume(),1e-7,(ident,j['id']))
 def test_no_new_structure_or_covering_intersections(self):
  for key in ('junctionReview','coveringFit'):
   a=self.m[key]['clashAudit']if key=='junctionReview'else self.m[key];b=self.old[key]['clashAudit']if key=='junctionReview'else self.old[key]
   def pair(e):return tuple(sorted([e['a'],e['b']]))if key=='junctionReview'else(e['objectName'],e['memberId'])
   before={pair(e)for e in b['intersections']}
   self.assertEqual([pair(e)for e in a['intersections']if pair(e)not in before],[])
  self.assertEqual(self.m['junctionReview']['connectionFit']['intersections'],[])
  self.assertEqual(self.m['junctionReview']['connectionFit']['seatLevelErrors'],[])
 def test_new_ceiling_datums_and_clear_service_gap(self):
  cfg=self.m['continuousJoistIntegration'];self.assertEqual(cfg['groundCeilingDropM'],.055);self.assertEqual(cfg['firstCeilingDropM'],.06)
  for name,z in [('Proposal | Wing Ground ceiling',2.3411),('Proposal | Wing First ceiling',5.0715)]:
   v=np.array(self.native[name]['vertices']);self.assertAlmostEqual(v[:,2].min(),z,places=5)
  for beam,ceiling in [('M-FR-3-001',5.103),('M-CJ01-GROUND-HEAD',2.3726)]:self.assertGreaterEqual(self.by[beam]['bounds'][0][2]-ceiling,.025)
 def test_adjusted_roof_rafters_keep_full_sections(self):
  for i in ('M-RF05-016','M-RF12-016','M-RF05-017','M-RF12-017'):
   e=self.by[i];self.assertEqual(e['sectionSizeM'],[.045,.22]);self.assertEqual(e['localSpacingRevision']['maxLocalCentresMm'],490)
 def test_lower_transfer_includes_actual_new_loft_reaction(self):
  e=self.by['M-GABLE-FLOOR-BLOCK']
  for c in e['supportScreen']['cases']:
   self.assertTrue(c['withinScreen']);self.assertEqual(len(c['loads']['permanentPoints']),1)
   self.assertAlmostEqual(c['loads']['permanentPoints'][0][0],6.0985)
  self.assertTrue(all(e['category']=='partitions'and e['framingRole']=='non-loadbearing'for e in self.by.values()if e['id'].startswith('M-TW-')))
