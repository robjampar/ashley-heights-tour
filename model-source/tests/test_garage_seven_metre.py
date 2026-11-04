"""CJ02 dimensions, supported bearings, independent partitions and joist fit."""
import json,math,unittest
from pathlib import Path
from scripts.structure.junctions import solid
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'revisions/garage-seven-metre-2026-10-28/original'
def read(p):return json.loads(p.read_text())
def bbox(o):return [[min(v[k]for v in o['vertices'])for k in range(3)],[max(v[k]for v in o['vertices'])for k in range(3)]]
class GarageSevenMetreTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.m=read(ROOT/'walkthrough/public/structure/members.json');cls.by={e['id']:e for e in cls.m['elements']}
  cls.nav=read(ROOT/'outputs/output-proposed-compact/navigation.json');cls.native={e['object_name']:e for e in read(ROOT/'outputs/output-proposed-compact/geometry.json')['objects']}
  cls.old=read(BASE/'walkthrough/public/structure/members.json');cls.oldby={e['id']:e for e in cls.old['elements']}
 def test_seven_metres_between_actual_native_faces(self):
  front=bbox(self.native['Proposal | West garage facade pier 0'])[1][0]
  back=bbox(self.native['Proposal | Garage east separation pier 0'])[0][0]
  self.assertAlmostEqual(back-front,7,places=5)
  door=next(d for d in self.nav['interactiveDoors']if d['id']=='Proposal | Garage east separation door 0')
  self.assertAlmostEqual(door['hinge'][0],10.6875);self.assertEqual(door['apertureWidth'],.826)
  room=next(r for r in self.nav['planRooms']if r['name']=='New garage')
  self.assertAlmostEqual(max(p[0]for p in room['polygon_m'])-min(p[0]for p in room['polygon_m']),7)
 def test_primary_slab_and_basement_supports_preserved(self):
  for key in ['M-G01-GARAGE-SLAB','M-G01-CINEMA-EAST-1','M-SW02-CINEMA-NORTH-PIER']:
   for field in ['triangles','axis','bounds']:self.assertEqual(self.by[key].get(field),self.oldby[key].get(field),(key,field))
  for key in ['M-FR-3-001','M-CJ01-GROUND-HEAD']:
   self.assertEqual([p[:2]for p in self.by[key]['axis']],[p[:2]for p in self.oldby[key]['axis']])
   self.assertEqual(self.by[key]['bounds'][1][2],self.oldby[key]['bounds'][1][2])
 def test_straight_entrance_corner_with_no_stepped_receivers(self):
  self.assertAlmostEqual(self.by['M-BLOCK-6FBC0C0']['bounds'][1][0],self.by['M-BLOCK-7C51DD7']['bounds'][0][0])
  e=self.by['M-FR-1-028'];self.assertEqual([p[0]for p in e['axis']],[5.3325,5.3325])
  self.assertGreaterEqual(e['bounds'][0][0]-self.by['M-BLOCK-7C51DD7']['bounds'][1][0],.00499)
  self.assertFalse(any(k.startswith('M-LP02-FIRST-')for k in self.by))
 def test_wall_tails_are_nonbearing_and_pier_remains_under_pad(self):
  self.assertNotIn('M-BRICK-393739F',self.by)
  for key in ['M-BLOCK-A2CE383','M-BLOCK-73B5665','M-BLOCK-2B9EE51','M-FR-1-001','M-FR-1-009']:self.assertNotIn(key,self.by)
  panel=[e for e in self.by.values()if e.get('garageSevenMetre')];self.assertGreater(len(panel),25)
  self.assertTrue(all(e['category']=='partitions'and e['framingRole']=='non-loadbearing'for e in panel))
  self.assertAlmostEqual(self.by['M-BLOCK-393739F']['bounds'][1][1],-9.59)
  for key in ['M-FR-3-001','M-FR-3-010']:
   for seat in self.by[key]['bearingSeats']:self.assertAlmostEqual(seat['baseSupportedFraction'],1)
  north=self.by['M-FR-3-010'];self.assertAlmostEqual(north['axis'][0][1],-5.2)
  self.assertTrue(all(s['contactAreaM2']>=.99*north['sectionSizeM'][0]*.1 for s in north['bearingSeats']))
 def test_new_studs_and_extended_joists_do_not_intersect_other_structure(self):
  cache={}
  for a in self.by.values():
   if not a.get('garageSevenMetre')and not a.get('cj01Joist'):continue
   for b in self.by.values():
    if a['id']==b['id']or b['category']not in ['masonry','beams','joists','partitions','trimmers','rc']:continue
    if a.get('cj01Joist')and b['category']!='masonry':continue
    if not all(min(a['bounds'][1][k],b['bounds'][1][k])-max(a['bounds'][0][k],b['bounds'][0][k])>1e-6 for k in range(3)):continue
    for e in (a,b):
     if e['id']not in cache:cache[e['id']]=solid(e['triangles'])
    self.assertLess((cache[a['id']]^cache[b['id']]).volume(),1e-7,(a['id'],b['id']))
 def test_connections_and_bounded_gravity_still_pass(self):
  self.assertEqual(self.m['supportAudit']['unmappedJoistEnds'],0)
  fit=self.m['junctionReview']['connectionFit'];self.assertEqual(fit['intersections'],[]);self.assertEqual(fit['seatLevelErrors'],[])
  for e in self.by.values():
   if not (e.get('calculationRef')or'').startswith('CJ01'):continue
   for case in e.get('supportScreen',{}).get('cases',[])+e.get('supportScreen',{}).get('patternCases',[]):self.assertTrue(case['withinScreen'],e['id'])
  self.assertFalse(self.m['approvedForConstruction'])
 def test_no_new_scoped_intersections(self):
  for key in ['junctionReview','coveringFit']:
   a=self.m[key]['clashAudit']if key=='junctionReview'else self.m[key];b=self.old[key]['clashAudit']if key=='junctionReview'else self.old[key]
   pair=lambda e:tuple(sorted([e['a'],e['b']]))if key=='junctionReview'else(e['objectName'],e['memberId'])
   before={pair(e)for e in b['intersections']};self.assertEqual([pair(e)for e in a['intersections']if pair(e)not in before],[])
 def test_utility_storage_is_outside_garage(self):
  cabinet=next(e for e in self.nav['obstacles']if e['name']=='Garage 01 | complete bench and cupboard')
  self.assertGreater(cabinet['box'][0],10.7625)
  floor=bbox(self.native['Utility 01 | limestone floor']);self.assertAlmostEqual(floor[0][0],10.7665,places=5)
  self.assertEqual(len(read(ROOT/'outputs/output-cj02-staging/cj02-report.json')['preservedScenes']),7)

 def test_clipped_ceiling_keeps_its_room_facing_normal(self):
  import numpy as np
  from scripts.geometry.mesh_face_triangles import triangulate_face
  for name,sign in [('Gym 01 | ivory ceiling finish',-1),('Gym 01 | continuous rubber floor',1)]:
   o=self.native[name];area=sum(np.cross(t[1]-t[0],t[2]-t[0])[2]for f in o['faces']for t in triangulate_face(o['vertices'],f))
   self.assertGreater(sign*area,60)

 def test_short_bearing_pier_has_continuous_support_below_it(self):
  from scripts.structure.junctions import cuboid
  pier=self.by['M-BLOCK-393739F'];lo,hi=pier['bounds']
  sample=cuboid([lo[0],lo[1],lo[2]-.001],[hi[0],hi[1],lo[2]])
  beam=solid(self.by['M-GABLE-FLOOR-BLOCK']['triangles'])
  self.assertGreater((sample^beam).volume()/sample.volume(),.99999)
 def test_garage_door_head_has_no_inherited_casing_holes(self):
  from scripts.geometry.mesh_face_triangles import triangulate_face
  from scripts.structure.junctions import cuboid
  shapes=[]
  for name in ['Proposal | Garage east separation pier 0','Proposal | Garage east separation end pier','Proposal | Garage east separation head 0']:
   o=self.native[name];shapes.append(solid([p for f in o['faces']for t in triangulate_face(o['vertices'],f)for p in t]))
  body=shapes[0]+shapes[1]+shapes[2]
  strip=cuboid([10.613,-12.45,2.27],[10.762,-11.40,2.35])
  self.assertLess((strip-body).volume(),1e-7)

 def test_west_external_return_is_closed_without_reinstating_internal_brick_tail(self):
  from scripts.structure.junctions import cuboid
  wall=self.by['M-WM01-WEST-RECESS-BRICK']
  self.assertNotIn('M-CJ02-RECESS-CLOSER-CORE',self.by)
  self.assertLessEqual(wall['bounds'][1][1],-9.2975)
  band=cuboid([4.93,-9.79,3.2],[5.0325,-9.4,5.25])
  self.assertLess((band-solid(wall['triangles'])).volume(),1e-8)
