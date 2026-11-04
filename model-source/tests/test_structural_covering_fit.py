"""Independent solid/plane cases for the read-only architecture fit audit."""
import json,tempfile,unittest
from pathlib import Path
from scripts.structure.junctions import cuboid,triangles
from scripts.structure.covering_fit import audit_coverings

def mesh(name,lo,hi):
 t=triangles(cuboid(lo,hi));return {'object_name':name,'vertices':t,'faces':[list(range(i,i+3))for i in range(0,len(t),3)]}

class CoveringFitTests(unittest.TestCase):
 def run_audit(self,objects,kinds,members):
  with tempfile.TemporaryDirectory()as d:
   p=Path(d)/'geometry.json';p.write_text(json.dumps({'objects':objects,'proposal':{'structuralFinishCoordination':{'revision':'test','operations':[{'objectName':k,'kind':v}for k,v in kinds.items()]}}}))
   return audit_coverings(p,members)
 def member(self,lo,hi):return {'id':'M-T','name':'Trial member','category':'joists','bounds':[lo,hi],'triangles':triangles(cuboid(lo,hi))}
 def test_contact_is_not_a_clash_but_penetration_is_measured(self):
  board=mesh('board',[0,0,1],[2,2,1.02]);touch=self.member([0,0,0],[1,1,1])
  r=self.run_audit([board],{'board':'floor-body'},[touch]);self.assertFalse(r['intersections'])
  crossing=self.member([0,0,.5],[1,1,1.01]);r=self.run_audit([board],{'board':'floor-body'},[crossing])
  self.assertEqual(len(r['intersections']),1);self.assertAlmostEqual(r['intersections'][0]['overlapCm3'],10000,3)
  self.assertEqual(crossing['coveringFitClashes'][0]['objectName'],'board')
 def test_open_surface_is_reported_without_claiming_it_was_measured(self):
  ob={'object_name':'bad','vertices':[[0,0,0],[1,0,1],[0,1,1]],'faces':[[0,1,2]]}
  r=self.run_audit([ob],{'bad':'floor-body'},[self.member([0,0,0],[1,1,1])])
  self.assertEqual(len(r['unmeasured']),1);self.assertEqual(r['measured'],[])
 def test_zero_thickness_sheet_has_a_separate_crossing_check(self):
  ob={'object_name':'sheet','vertices':[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],'faces':[[0,1,2,3]]}
  r=self.run_audit([ob],{'sheet':'ceiling-finish'},[self.member([.2,.2,.9],[.8,.8,1.1])])
  self.assertEqual(r['intersections'][0]['method'],'horizontal-solid-slice')
  self.assertIsNone(r['intersections'][0]['overlapCm3']);self.assertAlmostEqual(r['intersections'][0]['planeOverlapM2'],.36)

 def test_remote_plan_projection_is_not_a_sheet_intersection(self):
  import numpy as np
  from scripts.structure.build_members import prism
  tr=prism([0,0,0],[4,0,4],.1,.2);v=np.array(tr)
  member={'id':'M-SLOPE','name':'Sloping rafter','category':'rafters','triangles':tr,'bounds':[v.min(0).tolist(),v.max(0).tolist()]}
  ob={'object_name':'sheet','vertices':[[3,-.3,1],[4,-.3,1],[4,.3,1],[3,.3,1]],'faces':[[0,1,2,3]]}
  r=self.run_audit([ob],{'sheet':'ceiling-finish'},[member]);self.assertFalse(r['intersections'])
  ob['vertices']=[[.8,-.3,1],[1.2,-.3,1],[1.2,.3,1],[.8,.3,1]]
  r=self.run_audit([ob],{'sheet':'ceiling-finish'},[member]);self.assertEqual(len(r['intersections']),1)

if __name__=='__main__':unittest.main()
