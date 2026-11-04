"""Owner-directed concrete substitution; no capacity inferred from geometry."""
import json,unittest
from pathlib import Path
from scripts.structure.junctions import solid
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text());BY={e['id']:e for e in D['elements']}
class GallerySlabTests(unittest.TestCase):
 def test_entrance_link_replaces_all_joists_hangers_and_edge_receivers(self):
  e=BY['M-RC-GROUND-GALLERY'];self.assertEqual(e['category'],'rc');self.assertEqual(e['level'],0)
  self.assertFalse(any(id.startswith('M-GROUND-GALLERY-') for id in BY))
  for id in ['M-FR-0-016','M-FR-0-017','M-FR-0-018','M-FR-0-GALLERY-SOUTH']:
   self.assertNotIn(id,BY);self.assertIn(id,e['consolidatedReferences'])
  self.assertFalse(e['slabCoordination']['capacityVerified'])
 def test_slab_geometry_quantity_and_basement_joints_agree(self):
  e=BY['M-RC-GROUND-GALLERY'];shape=solid(e['triangles']);a,b=e['bounds']
  self.assertAlmostEqual(b[2]-a[2],.25);self.assertAlmostEqual(b[2],-.1)
  self.assertAlmostEqual(e['cost']['quantity'],shape.volume(),places=5)
  self.assertAlmostEqual(shape.volume(),15.790625*.25,places=6)
  self.assertAlmostEqual(a[1]-BY['M-RC-3D10A2B']['bounds'][1][1],.01)
  self.assertAlmostEqual(BY['M-RC-7BC42C7']['bounds'][0][0]-b[0],.01)
  for wall in BY.values():
   if wall.get('concreteWallCoordination'):self.assertLess((shape^solid(wall['triangles'])).volume(),1e-9)
 def test_floor_build_up_reaches_finished_level_without_a_timber_deck(self):
  finish=BY['M-LAYER-GROUND-GALLERY-FINISH'];build=BY['M-LAYER-GROUND-GALLERY-BUILDUP'];slab=BY['M-RC-GROUND-GALLERY']
  self.assertAlmostEqual(finish['bounds'][1][2],0)
  self.assertAlmostEqual(finish['bounds'][0][2],build['bounds'][1][2])
  self.assertAlmostEqual(build['bounds'][0][2],slab['bounds'][1][2])
  for tag in ['DECK','SERVICE','CEILING']:self.assertNotIn('M-LAYER-GROUND-GALLERY-'+tag,BY)
 def test_roof_mapping_slivers_are_retired_without_renumbering_neighbours(self):
  import math
  retired={e['removed']:e for e in D['roofEdgeAudit']['subsectionFragments']}
  for id in ['M-RE15-011','M-RE15-012']:
   self.assertNotIn(id,BY);self.assertIn(id,retired)
   self.assertLess(retired[id]['lengthM'],retired[id]['widthM'])
  self.assertTrue(all(math.dist(*e['axis'])>=e['sectionSizeM'][0] for e in BY.values() if e.get('roofEdgeRole')))
  architecture=json.loads((ROOT/'walkthrough/public/structure/model.json').read_text())
  valid=set(BY)|{e['id'] for e in architecture['elements']}
  self.assertTrue(all(id in valid for issue in D['issues'] for id in issue['elementIds']))
 def test_named_first_floor_receivers_and_linked_hangers_clear_masonry(self):
  walls=[e for e in BY.values() if e['category']=='masonry']
  for id in ['M-FR-1-028','M-FR-1-032']:
   e=BY[id];self.assertAlmostEqual(e['bounds'][0][0],5.2875 if id=='M-FR-1-028'else 5.2825)
   self.assertFalse(any(id in (c['a'],c['b']) for c in D['junctionReview']['clashAudit']['intersections']))
   # CJ01 joists run parallel to these side ledgers and now bear on the
   # transverse headers. Check the linked joists/hangers against masonry.
   header=BY['M-FR-1-027'if id=='M-FR-1-028'else'M-FR-1-033']
   js=[j for j in BY.values() if j['category']=='joists' and any(s.get('memberId')==header['id'] for s in j.get('endSupports',[]))]
   self.assertTrue(js)
   ids={j['id'] for j in js};check=[e,header,*js,*[h for h in BY.values() if h.get('parentId') in ids and h['category']=='connections']]
   for member in check:
    for wall in walls:
     a,b=member['bounds'];c,d=wall['bounds']
     if any(min(b[i],d[i])-max(a[i],c[i])<=1e-7 for i in range(3)):continue
     self.assertLess((solid(member['triangles'])^solid(wall['triangles'])).volume(),1e-7,(member['id'],wall['id']))
