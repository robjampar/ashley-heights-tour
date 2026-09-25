"""Check delivered geometry, retained garden fabric, and planning-only content."""
import json,unittest
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[1]

class PlanningVariantTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.g=json.loads((ROOT/'output-proposed-planning/geometry.json').read_text())
  cls.nav=json.loads((ROOT/'output-proposed-planning/navigation.json').read_text())
  cls.ex=json.loads((ROOT/'output-walkthrough/geometry.json').read_text())
  cls.full=json.loads((ROOT/'output-proposed-compact/navigation.json').read_text())
 def test_omitted_works_absent_from_model_and_navigation(self):
  for key in ('proposalRoofTerrace','proposalHotTub','proposalWorkshop'):self.assertNotIn(key,self.nav)
  names={r['name'] for r in self.nav['planRooms']}
  self.assertFalse(names.intersection({'Garden workshop','Expanded garden pavilion','Pool terrace','Pool hot tub area','Shared roof terrace','Garden living and dining'}))
  for key in ('pool','pavilion','rearGardenRoom','hotTub','roofTerrace','gardenWorkshop'):self.assertNotIn(key,self.nav['proposal']['specification'])
  for o in self.g['objects']:self.assertFalse(o['name'].startswith(('Proposal | Pool','Proposal | Pavilion','Proposal | Terrace ','Proposal | Garden north glazing')))
 def test_existing_outbuildings_retained_without_geometry_or_material_changes(self):
  actual={o['object_name']:o for o in self.g['objects']}
  sources=[o for o in self.ex['objects'] if o['layer'] in ('40 Outbuildings','41 Outbuilding roof')]
  self.assertGreater(len(sources),10)
  for source in sources:
   ob=actual[source['object_name']]
   np.testing.assert_allclose(ob['vertices'],source['vertices'],atol=2e-5,rtol=0)
   self.assertEqual(ob['materials'],source['materials'])
 def test_matching_brick_and_door_dimensions(self):
  proposed=[o for o in self.g['objects'] if o['object_name'].startswith('Proposal')]
  self.assertFalse(any('Proposal | Limestone render' in o['materials'] for o in proposed))
  self.assertGreater(sum('Red brown brick' in o['materials'] for o in proposed),100)
  doors=[d for d in self.nav['interactiveDoors'] if 'Side living rear' in d['id']]
  self.assertEqual(len(doors),2)
  for d in doors:self.assertEqual(d['structuralOpening'],[-3.79,8.705,0,-1.39,8.935,2.25])
  upper=[o for o in proposed if o['name']=='Proposal | Side bedrooms rear window 0 glass']
  self.assertEqual(len(upper),1)
  self.assertAlmostEqual(min(v[2] for v in upper[0]['vertices']),3.655,places=3)
 def test_full_proposed_design_still_contains_garden_works(self):
  for key in ('proposalRoofTerrace','proposalHotTub','proposalWorkshop'):self.assertIn(key,self.full)
  self.assertIn('pool',self.full['proposal']['specification'])
 def test_internal_partitions_are_white_with_external_brick_retained(self):
  white=self.nav['planningApplication']['internal_wall_material']
  partitions=[o for o in self.g['objects'] if o['name'].startswith(('Proposal | Garage north store separation','Proposal | Garage east separation')) and ' door ' not in o['name']]
  self.assertGreater(len(partitions),4)
  for o in partitions:
   self.assertEqual({o['materials'][i] for i in o['face_materials']},{white},o['name'])
  walls=[o for o in self.g['objects'] if o['name'].startswith('Proposal | New wing east pier')]
  self.assertTrue(any(white in o['materials'] and 'Red brown brick' in o['materials'] for o in walls))
  front_inside=0
  for ob in self.g['objects']:
   if not ob['name'].startswith(('Proposal | Side wing front ground','Proposal | Side bedrooms front')):continue
   if 'Red brown brick' not in ob['materials']:continue
   for f,m in zip(ob['faces'],ob['face_materials']):
    v=np.asarray([ob['vertices'][i]for i in f])
    if np.max(np.abs(v[:,1]-.565))<2e-5 and np.ptp(v[:,2])>.05 and np.ptp(v[:,0])>.05:
     self.assertEqual(ob['materials'][m],white,ob['name']);front_inside+=1
  self.assertGreater(front_inside,5)
  for side,y in [('south',-8.9),('north',-5.5)]:
   pier=next(o for o in self.g['objects'] if o['name']=='Proposal | West entrance '+side+' pier')
   finishes=[]
   for f,m in zip(pier['faces'],pier['face_materials']):
    v=np.asarray([pier['vertices'][i] for i in f])
    if np.max(np.abs(v[:,1]-y))<2e-5 and v[:,0].min()>3.76-2e-5 and np.ptp(v[:,2])>.1:
     finishes.append(pier['materials'][m])
   self.assertTrue(finishes,side)
   self.assertEqual(set(finishes),{white},side)
 def test_roof_matches_existing_and_dormers_are_tile_hung(self):
  report=self.nav['planningApplication']
  objects={o['object_name']:o for o in self.g['objects']}
  self.assertEqual(report['roof_material'],'Proposal | Weathered brown-grey roof tiles')
  self.assertGreater(len(report['matching_roof_objects']),100)
  self.assertGreater(len(report['tile_hung_dormer_objects']),30)
  for name in report['matching_roof_objects']:
   self.assertIn(report['roof_material'],objects[name]['materials'])
  for name in report['tile_hung_dormer_objects']:
   self.assertIn(report['dormer_material'],objects[name]['materials'])
   self.assertNotIn('Red brown brick',objects[name]['materials'])
  np.testing.assert_allclose(self.g['materials'][report['dormer_material']],self.g['materials'][report['roof_material']],atol=1e-6)
  appearance=self.nav['proposal']['specification']['roofTileAppearance']
  np.testing.assert_allclose(self.g['materials'][report['roof_material']][:3],appearance['base_linear_rgb'],atol=1e-6)
  self.assertFalse(any('Proposal | Slate roof anthracite' in o['materials'] for o in self.g['objects']))
 def test_external_front_and_courtyard_wall_faces_stay_brick(self):
  checked=0
  for ob in self.g['objects']:
   if 'Red brown brick' not in ob['materials']:continue
   front=ob['name'].startswith('Proposal | New wing south ')
   courtyard=ob['name']=='Proposal | Courtyard overhang edge'
   if not(front or courtyard):continue
   target=-16.306 if front else max(v[1]for v in ob['vertices'])
   for f,m in zip(ob['faces'],ob['face_materials']):
    v=np.asarray([ob['vertices'][i]for i in f])
    if np.max(np.abs(v[:,1]-target))<2e-5 and np.ptp(v[:,2])>.05 and np.ptp(v[:,0])>.05:
     self.assertEqual(ob['materials'][m],'Red brown brick',ob['name']);checked+=1
  self.assertGreater(checked,5)
 def test_overlay_is_only_a_small_set_of_differences(self):
  overlay=json.loads((ROOT/'proposal/design-spec-planning.json').read_text())
  self.assertNotIn('frontWing',overlay);self.assertNotIn('entertainmentBasement',overlay)
 def test_side_extension_front_and_roof_are_set_back_in_both_options(self):
  original_roof=next(o for o in self.ex['objects']if o['name']=='Main hipped roof')
  expected_roof_y=original_roof['vertices'][0][1]+.45
  for variant in ('planning','compact'):
   data=self.g if variant=='planning' else json.loads((ROOT/'output-proposed-compact/geometry.json').read_text())
   nav=self.nav if variant=='planning' else self.full
   self.assertEqual(nav['proposalSideWing']['front_setback_m'],.45)
   self.assertEqual(nav['proposalSideWing']['wall_centrelines_m']['rear'],8.82)
   facing=next(o for o in data['objects']if o['name'] in ('Proposal | Side wing front brick facing','Proposal | Side wing front oak cladding'))
   self.assertAlmostEqual(min(v[1]for v in facing['vertices']),.45-.131,places=4)
   roofs=[o for o in data['objects']if 'Side wing continued front slope' in o['name']and 'lining'not in o['name']]
   self.assertTrue(roofs)
   self.assertAlmostEqual(min(v[1]for o in roofs for v in o['vertices']),expected_roof_y,places=4)
   room=next(r for r in nav['planRooms']if r['name']=='Side garden living')
   self.assertAlmostEqual(min(v[1]for v in room['polygon_m']),.565,places=4)
 def test_attached_rear_room_fits_the_house_area_region(self):
  from scripts.planning_drawings.model import load_proposed
  from scripts.planning_drawings.footprints import level_envelope,room_envelope,HOUSE_REGION
  for variant in ('planning','compact'):
   model=load_proposed(variant);walls=level_envelope(model,0,HOUSE_REGION);rooms,_=room_envelope(model,0,HOUSE_REGION)
   self.assertLess(abs(walls.area-rooms.area)/rooms.area,.05,variant)
 def test_wide_door_is_scheduled_as_one_glazed_pair(self):
  from scripts.planning_drawings.model import load_proposed
  from scripts.planning_drawings.openings import extract
  rows=[r for r in extract(load_proposed('planning')) if 'Side living rear' in r.wall]
  self.assertEqual(len(rows),1)
  self.assertEqual((rows[0].kind,rows[0].width,rows[0].height),('french',2.4,2.25))
if __name__=='__main__':unittest.main()
