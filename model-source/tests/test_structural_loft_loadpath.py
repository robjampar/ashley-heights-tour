"""Reaction balance, real drawn sections and the repaired opening support route."""
import json,unittest
from pathlib import Path
from scripts.structure.junctions import solid

ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
BY={e['id']:e for e in D['elements']}


class LoftLoadpathTests(unittest.TestCase):
 def test_void_header_reaches_edge_trimmer_between_cross_beams(self):
  header,edge,cross=[BY[k]for k in ('M-FR-3-008','M-FR-3-009','M-FR-3-001')]
  self.assertIn(edge['id'],header['endSupportCandidates'][1]['connectedReceivers'])
  self.assertIn(cross['id'],edge['endSupportCandidates'][0]['connectedReceivers'])
  self.assertIn('M-FR-3-010',edge['endSupportCandidates'][1]['connectedReceivers'])
  for a,b in ((header,edge),(edge,cross)):
   self.assertLess((solid(a['triangles'])^solid(b['triangles'])).volume(),1e-8)
  self.assertAlmostEqual(edge['bounds'][0][0]-header['bounds'][1][0],.01)
 def test_joist_loads_and_beam_self_weight_balance_at_external_supports(self):
  self.assertEqual(len(D['loftLoadpath']['cases']),12)
  for c in D['loftLoadpath']['cases']:
   self.assertLess(c['equilibriumResidualKN'],1e-7)
   self.assertAlmostEqual(c['externalReactionsKN'][0],c['inputFloorLoadsKN'][0]+c['beamSelfWeightKN']+c.get('additionalPermanentLoadKN',0))
   self.assertAlmostEqual(c['externalReactionsKN'][1],c['inputFloorLoadsKN'][1])
   for key,r in c['members'].items():
    for state in ('uls','permanent','variable'):
     self.assertAlmostEqual(sum(r[state]['reactionsKN']),r[state]['totalLoadKN'])
     self.assertLess(max(map(abs,r[state]['endDeflectionsMm'])),1e-7)
   self.assertGreater(len(c['members']['M-FR-3-010']['loads']['permanentPoints']),4)
 def test_current_drawn_sections_are_used_without_auto_sizing_or_approval(self):
  for key,ident in D['loftLoadpath']['memberIds'].items():
   e=BY[ident]
   for c in e['supportScreen']['cases']:
    self.assertAlmostEqual(c['depthMm'],e['sectionSizeM'][1]*1000)
    self.assertFalse(c['approvedForConstruction'])
   self.assertIn('Roof',e['supportScreen']['limits'])
   self.assertFalse(e['loadRoute']['capacityVerified'])
 def test_foundation_issue_describes_the_current_geometry(self):
  text=next(i for i in D['issues'] if i['id']=='GARDEN-FOUNDATIONS')['detail']
  self.assertIn('150 mm thick',text);self.assertIn('Z-1.15 m',text);self.assertNotIn('200 mm slab',text)


if __name__=='__main__':unittest.main()
