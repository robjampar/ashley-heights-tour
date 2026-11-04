import unittest
import numpy as np
from scripts.audits.audit_opening_fit import audit
from scripts.structure.junctions import cuboid,triangles
from scripts.build.build_support import modules_for


def component(name,low,high):
    tri=triangles(cuboid(low,high));return {'object_name':name,'layer':'P47 Test','vertices':tri,
        'faces':np.arange(len(tri)).reshape(-1,3).tolist()}


def member(shape,**extra):
    tri=triangles(shape);v=np.asarray(tri)
    return {'id':'B','name':'Test beam','category':'beams','triangles':tri,'bounds':[v.min(0).tolist(),v.max(0).tolist()],**extra}


class OpeningFitTests(unittest.TestCase):
    def test_flange_envelope_does_not_create_false_glass_clash_in_web_void(self):
        beam=cuboid([0,0,0],[4,.3,.02])+cuboid([0,0,.28],[4,.3,.3])+cuboid([0,.14,.02],[4,.16,.28])
        glass=component('Proposal | Test window glass',[1,.20,.05],[2,.22,.25])
        r=audit({'objects':[glass]},{'elements':[member(beam)]})
        self.assertEqual(len(r['measured']),1);self.assertFalse(r['intersections']);self.assertFalse(r['unmeasured'])

    def test_actual_flange_overlap_retains_conditional_scope(self):
        beam=member(cuboid([0,0,0],[4,.3,.02]),condition='roof-rebuild')
        glass=component('Proposal | Test window glass',[1,.20,.01],[2,.22,.03])
        r=audit({'objects':[glass]},{'elements':[beam]})
        self.assertEqual(len(r['intersections']),1)
        self.assertAlmostEqual(r['intersections'][0]['overlapCm3'],200,places=4)
        self.assertEqual(r['intersections'][0]['condition'],'roof-rebuild')

    def test_open_mesh_is_unmeasured_never_silently_reported_clear(self):
        sheet={'object_name':'Proposal | Open window glass','layer':'P47 Test','vertices':[[0,0,0],[1,0,1],[1,1,0]],'faces':[[0,1,2]]}
        r=audit({'objects':[sheet]},{'elements':[member(cuboid([0,0,0],[1,1,1]))]})
        self.assertEqual(len(r['unmeasured']),1);self.assertFalse(r['measured'])

    def test_opening_revision_follows_finishes_and_is_compact_only(self):
        compact=list(modules_for('compact'));planning=list(modules_for('planning'))
        self.assertLess(compact.index('model/proposal_structural_finishes.py'),compact.index('model/proposal_opening_fit.py'))
        self.assertNotIn('model/proposal_opening_fit.py',planning)


if __name__=='__main__':unittest.main()
