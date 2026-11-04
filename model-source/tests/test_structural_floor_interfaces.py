"""Floor/wall geometry regression checks; contact never certifies capacity."""
import json,unittest
from pathlib import Path
from shapely.ops import unary_union
from scripts.structure.build_study import footprint
from scripts.structure.junctions import solid
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text());BY={e['id']:e for e in D['elements']}
class FloorInterfaceTests(unittest.TestCase):
 def test_original_house_is_one_direction_and_real_stair_void_remains(self):
  from shapely.geometry import box
  void=box(4.6,1.31,5.5,5.55)
  joists=[e for e in BY.values() if e['category']=='joists' and e['id'].startswith('M-LOFT-HOUSE-')]
  self.assertGreater(len(joists),30)
  for e in joists:
   a,b=e['axis'];self.assertAlmostEqual(a[0],b[0]);self.assertAlmostEqual(e['sectionSizeM'][1],.3)
   self.assertLess(footprint(e['triangles']).intersection(void).area,1e-8)
  for e in BY.values():
   if e['category']=='joists' and e['id'].startswith('M-LOFT-GALLERY-'):
    self.assertLess(e['bounds'][1][1],-.115)
  for id in ['M-LOFT-HOUSE-014','M-LOFT-HOUSE-015','M-LOFT-HOUSE-016']:
   self.assertAlmostEqual(BY[id]['axis'][0][1],-.065);self.assertAlmostEqual(BY[id]['axis'][1][1],8.655)
 def test_loft_area_is_preserved_while_false_internal_headers_are_removed(self):
  old=json.loads((ROOT/'revisions/structural-wall-supports-2026-10-26/original/walkthrough/public/structure/members.json').read_text())
  def plan(elements):return unary_union([footprint(e['triangles']) for e in elements if e['id'] in ('M-LAYER-LOFT-HOUSE-DECK','M-LAYER-LOFT-GALLERY-DECK','M-LAYER-LOFT-WING-DECK')])
  previous,current=plan(old['elements']),plan(D['elements'])
  from shapely.geometry import Polygon
  spec=json.loads((ROOT/'proposal/specs/structural-floor-layout.json').read_text())
  removed_eaves=Polygon(spec['loftGalleryInfill']['retiredEavesFragment'])
  self.assertLess(previous.difference(current.union(removed_eaves)).area,1e-7)
  # Unioning the zones also removes a 0.14945 m² triangulation omission beside
  # the stair. Any recovered area must lie inside the actual source floor.
  architecture=json.loads((ROOT/'walkthrough/public/structure/model.json').read_text())
  source=unary_union([footprint(e['triangles']) for e in architecture['elements'] if e['category']=='floors'and e['level']==3])
  self.assertLess(current.difference(previous.union(source)).area,1e-7)
  for id in ['M-FR-3-021','M-FR-3-OPT-001','M-FR-3-OPT-002']:self.assertNotIn(id,BY)
 def test_named_header_is_inside_the_concrete_and_both_wall_leaves_bear_separately(self):
  rc=BY['M-RC-FC244DE'];slab=BY['M-G01-GARAGE-SLAB']
  self.assertNotIn('M-FR-0-001',BY)
  self.assertAlmostEqual(rc['bounds'][1][1]-slab['bounds'][0][1],.15)
  self.assertLess((solid(rc['triangles'])^solid(slab['triangles'])).volume(),1e-8)
  self.assertAlmostEqual(rc['bounds'][1][2],0)
  self.assertIn(rc['id'],slab['slabCoordination']['supportIds'])
  for id in ['M-BRICK-8D5FD18','M-BLOCK-8D5FD18','M-BRICK-4117AFF','M-BLOCK-4117AFF']:
   a=BY[id]['masonryBearingAudit'];self.assertEqual(a['unmatchedAreaM2'],0);self.assertEqual(a['timberBelow'],[])
   self.assertFalse(a['capacityVerified']);self.assertIn(rc['id'],[c['memberId'] for c in a['contacts']])
 def test_concrete_ring_connects_without_overlap_and_floor_timbers_clear_it(self):
  walls=[e for e in BY.values() if e.get('concreteWallCoordination')]
  self.assertNotIn('M-LP02-WEST-BUTTRESS',{e['id']for e in walls})
  shapes=[solid(e['triangles']) for e in walls]
  # Boolean exports can differ by a nanometre at a shared plane. Check
  # connectivity at 0.1 µm precision, far below a construction tolerance.
  connected=[solid([[round(v,7)for v in p]for p in e['triangles']])for e in walls];u=connected[0]
  for s in connected[1:]:u=u+s
  self.assertEqual(len(u.decompose()),1)
  self.assertAlmostEqual(u.volume(),sum(s.volume() for s in shapes),places=6)
  for e,s in zip(walls,shapes):self.assertAlmostEqual(e['cost']['quantity'],s.volume(),places=5)
  self.assertEqual(D['junctionReview']['masonryBearings']['concreteTimberIntersections'],[])
  slab=footprint(BY['M-RC-EEBF948']['triangles'])
  for e in walls:self.assertLess(footprint(e['triangles']).difference(slab).area,1e-7)
 def test_internal_masonry_reaches_slab_without_implying_capacity(self):
  for id in ['M-BLOCK-4D5245A']:
   a=BY[id]['masonryBearingAudit'];self.assertEqual(a['unmatchedAreaM2'],0)
   self.assertEqual(a['timberBelow'],[]);self.assertFalse(a['capacityVerified'])
   self.assertIn('M-G01-GARAGE-SLAB',[r['memberId']for r in a['contacts']])
