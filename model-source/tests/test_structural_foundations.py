"""Independent arithmetic, solid-fit and cost checks for the assumed F01 basis."""
import json
import unittest
from pathlib import Path
from itertools import combinations
from shapely.ops import unary_union
from scripts.structure.build_study import footprint
from scripts.structure.junctions import solid
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
BY={e['id']:e for e in D['elements']}
F=D['foundations']

class FoundationTests(unittest.TestCase):
 def test_reference_dimensions_and_masonry_are_distinct_from_concrete(self):
  for id in ('M-GF-1','M-GF-2','M-GF-3','M-GARDEN-FOUNDATION'):
   e=BY[id];self.assertAlmostEqual(e['bounds'][0][2],-1.15);self.assertAlmostEqual(e['bounds'][1][2],-.85)
   self.assertAlmostEqual(F['assumedGroundZ']-e['bounds'][0][2],1)
  for id in ('M-GS-1','M-GS-2','M-GS-3','M-GARDEN-STEM'):
   e=BY[id];self.assertEqual(e['cost']['rateKey'],'foundationMasonry');self.assertTrue(e['foundationSubstructure'])
   self.assertNotIn('units',e);self.assertEqual(e['category'],'masonry');self.assertAlmostEqual(e['bounds'][1][2]-e['bounds'][0][2],.85)
  slab=BY['M-GARDEN-SLAB'];self.assertAlmostEqual(slab['bounds'][1][2]-slab['bounds'][0][2],.15)

 def test_concrete_and_masonry_quantities_use_closed_volume_without_duplicate_joins(self):
  es=[BY[id] for id in F['memberIds'] if BY[id].get('cost')]
  for e in es:self.assertAlmostEqual(e['cost']['quantity'],solid(e['triangles']).volume(),delta=5.1e-6)
  for a,b in combinations(es,2):self.assertLess((solid(a['triangles'])^solid(b['triangles'])).volume(),1e-7,(a['id'],b['id']))

 def test_raft_carries_all_wall_footprints_and_has_connected_formation_layers(self):
  raft=BY['M-RC-EEBF948'];poly=footprint(raft['triangles']);self.assertAlmostEqual(raft['bounds'][0][2],-3.3)
  self.assertAlmostEqual(raft['bounds'][1][2],-3.0)
  for e in BY.values():
   if e.get('concreteWallCoordination'):
    self.assertEqual(e['bounds'][0][2],raft['bounds'][1][2]);self.assertLess(footprint(e['triangles']).difference(poly).area,1e-7)
  self.assertEqual(BY['M-BASEMENT-BLINDING']['bounds'][1][2],raft['bounds'][0][2])
  self.assertEqual(BY['M-BASEMENT-SUBBASE']['bounds'][1][2],BY['M-BASEMENT-BLINDING']['bounds'][0][2])

 def test_bearing_arithmetic_includes_foundation_and_soil_self_weights_and_exposes_upper_failure(self):
  reference=F['cases'][1]
  expected=(45+.6*.3*24+.3525*.85*20+(.6-.3525)*.7*18)/.6
  self.assertAlmostEqual(reference['garagePressureKPa'],expected,places=2)
  self.assertTrue(reference['garageWithinPressureScreen']);self.assertFalse(F['cases'][2]['garageWithinPressureScreen'])
  self.assertFalse(F['cases'][2]['housePostPadWithinScreen']);self.assertFalse(F['approvedForConstruction'])

 def test_uplift_uses_raft_underside_and_separates_empty_from_completed_stage(self):
  raft=BY['M-RC-EEBF948'];weight=solid(raft['triangles']).volume()*25
  weight+=sum(solid(e['triangles']).volume()*25 for e in BY.values() if e.get('concreteWallCoordination'))
  for c in F['cases']:
   uplift=9.81*max(0,c['waterLevelZ']-raft['bounds'][0][2])*footprint(raft['triangles']).area
   self.assertAlmostEqual(c['upliftKN'],uplift,places=2);self.assertAlmostEqual(c['emptyBoxDeadWeightKN'],weight,places=2)
   added=sum(solid(e['triangles']).volume()*(20 if e['category']=='masonry'else 25)for e in BY.values()if 'additionalPermanentWeightKN'in e)
   self.assertAlmostEqual(c['completedIllustrativeBalanceKN']-c['emptyBoxBalanceKN'],800+added,delta=.011)
  self.assertLess(F['cases'][2]['completedIllustrativeBalanceKN'],0)
