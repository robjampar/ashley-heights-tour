"""Regression checks for misleading freshness, forms and validation status."""
import json
import tempfile
import unittest
from pathlib import Path
from scripts.planning_drawings import release, statement
from scripts.planning_drawings.context import Context


class PackIntegrityTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.out = Path(self.tmp.name)
        (self.out / 'drawings.pdf').write_bytes(b'fixture')
        self.inputs = {'geometry': 'g', 'navigation': 'n', 'context': 'c'}
        self.manifest = {
            'complete_build': True, 'variant': 'compact', 'source_files': self.inputs,
            'sheets': [{'sheet': s} for s in release.SHEET_IDS],
            'artifacts': {'drawings.pdf': release.sha(self.out / 'drawings.pdf')},
            'pdf_checks_pass': True, 'openings_crosscheck_pass': True,
        }
        self.save()

    def save(self):
        (self.out / 'manifest.json').write_text(json.dumps(self.manifest))

    def test_unchanged_issue_is_current(self):
        self.assertEqual(release.freshness(self.out, self.inputs), [])

    def test_navigation_and_context_changes_are_stale(self):
        for key in ('navigation', 'context'):
            with self.subTest(key=key):
                self.assertIn('Input changed: ' + key, release.freshness(self.out, self.inputs | {key: 'changed'}))

    def test_deleted_and_tampered_outputs_are_stale(self):
        p = self.out / 'drawings.pdf'
        p.write_bytes(b'tampered')
        self.assertTrue(release.freshness(self.out, self.inputs))
        p.unlink()
        self.assertTrue(release.freshness(self.out, self.inputs))

    def test_partial_build_is_never_a_current_issue(self):
        self.manifest['complete_build'] = False
        self.save()
        self.assertTrue(release.freshness(self.out, self.inputs))

    def test_missing_sheet_is_stale(self):
        self.manifest['sheets'].pop()
        self.save()
        self.assertTrue(release.freshness(self.out, self.inputs))

    def test_corrupt_manifest_is_stale(self):
        (self.out / 'manifest.json').write_text('{interrupted')
        self.assertEqual(release.freshness(self.out, self.inputs), ['Unreadable build manifest'])

    def test_renderer_change_is_stale(self):
        self.inputs['@render-runtime'] = 'previous-renderer'
        self.manifest['source_files'] = dict(self.inputs)
        self.save()
        self.assertIn('Input changed: @render-runtime', release.freshness(
            self.out, self.inputs | {'@render-runtime': 'updated-renderer'}))

    def test_default_reuse_preserves_the_complete_issue(self):
        from unittest.mock import patch
        from scripts.planning_drawings import build_pack
        previous = (self.out / 'manifest.json').read_bytes()
        with patch.object(release, 'model_source_issues', return_value=[]), \
             patch.object(release, 'input_fingerprints', return_value=self.inputs), \
             patch.object(build_pack, 'build') as generate:
            self.assertEqual(build_pack.main(['--variant', 'compact', '--out', str(self.out)]), 0)
            generate.assert_not_called()
        self.assertEqual((self.out / 'manifest.json').read_bytes(), previous)
        self.assertEqual((self.out / 'drawings.pdf').read_bytes(), b'fixture')

    def test_force_or_changed_output_requires_redrawing(self):
        from unittest.mock import patch
        from scripts.planning_drawings import build_pack
        for force in (True, False):
            with self.subTest(force=force):
                if not force:
                    (self.out / 'drawings.pdf').write_bytes(b'changed')
                with patch.object(release, 'model_source_issues', return_value=[]), \
                     patch.object(release, 'input_fingerprints', return_value=self.inputs), \
                     patch.object(build_pack, 'build', return_value=1) as generate:
                    args = ['--variant', 'compact', '--out', str(self.out)] + (['--force'] if force else [])
                    self.assertEqual(build_pack.main(args), 1)
                    generate.assert_called_once()

    def test_input_change_during_build_preserves_previous_issue(self):
        from unittest.mock import patch
        from scripts.planning_drawings import build_pack
        previous = (self.out / 'manifest.json').read_bytes()
        with patch.object(build_pack.release, 'input_fingerprints', side_effect=[{'model': 'before'}, {'model': 'after'}]), patch.object(build_pack, 'build', return_value=0):
            result = build_pack.main(['--out', str(self.out)])
        self.assertEqual(result, 2)
        self.assertEqual((self.out / 'manifest.json').read_bytes(), previous)
        self.assertEqual((self.out / 'drawings.pdf').read_bytes(), b'fixture')

    def test_partial_preview_does_not_replace_full_issue(self):
        from unittest.mock import patch
        from scripts.planning_drawings import build_pack
        previous = (self.out / 'manifest.json').read_bytes()

        def fake_build(args):
            staging = Path(args[args.index('--out') + 1])
            (staging / 'manifest.json').write_text(json.dumps(self.manifest))
            (staging / 'PA-040.pdf').write_bytes(b'preview')
            return 0

        with patch.object(build_pack.release, 'input_fingerprints', return_value=self.inputs), patch.object(build_pack, 'build', side_effect=fake_build), patch('scripts.planning_drawings.readiness.write_readiness'):
            self.assertEqual(build_pack.main(['--out', str(self.out), '--sheets', 'PA-040']), 0)
        self.assertEqual((self.out / 'manifest.json').read_bytes(), previous)
        previews = list((self.out / 'checks/previews').glob('*/manifest.json'))
        self.assertEqual(len(previews), 1)
        self.assertFalse(json.loads(previews[0].read_text())['complete_build'])


class ContentTests(unittest.TestCase):
    def test_detached_buildings_are_ground_level(self):
        from scripts.planning_drawings.model import SourceModel
        model = object.__new__(SourceModel)
        model.nav = {'planRooms': [{'name': 'Summer house', 'floor': 2}, {'name': 'Bedroom', 'floor': 1}, {'name': 'Loft', 'floor': 3, 'base_z': 5.55}]}
        self.assertEqual([r['name'] for r in model.plan_rooms(0)], ['Summer house'])
        self.assertEqual([r['name'] for r in model.plan_rooms(5.55)], ['Loft'])

    def test_horizontal_mesh_cut_retains_wall_thickness(self):
        from types import SimpleNamespace
        import numpy as np
        from scripts.planning_drawings.sections import cut_mesh
        cube = SimpleNamespace(v=np.array([[0,0,0],[2,0,0],[2,.2,0],[0,.2,0],[0,0,2],[2,0,2],[2,.2,2],[0,.2,2]]), faces=[[0,1,2,3],[4,7,6,5],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0]])
        lines, polygons = cut_mesh(cube, 2, 1.2)
        self.assertEqual(len(lines), 4)
        self.assertAlmostEqual(sum(p.area for p in polygons), .4)

    def test_green_belt_confirmation_does_not_disable_positive_designation(self):
        ctx = Context()
        for value, confirmed, expected in ((True, ['green_belt'], True), (None, [], True), (False, [], True), (False, ['green_belt'], False)):
            ctx['designations'] = {'green_belt': value, 'confirmed': confirmed}
            self.assertEqual(ctx.green_belt_module, expected)

    def test_checklist_resolves_all_sheet_references(self):
        ctx = Context()
        full = statement.checklist(ctx, [{'sheet': s} for s in release.SHEET_IDS])
        self.assertFalse(any(r['status'] == 'missing' for r in full))
        missing = statement.checklist(ctx, [])
        self.assertTrue(any(r['status'] == 'missing' for r in missing))
        self.assertEqual(next(r for r in full if r['item'] == 'N14')['status'], 'deferred')
        for key in ('L4', 'L6'):
            self.assertEqual(next(r for r in full if r['item'] == key)['status'], 'verify')

    def test_ownership_and_signature_are_not_inferred(self):
        from types import SimpleNamespace
        from shapely.geometry import box
        data = statement.application_form_data(Context(), {}, {}, SimpleNamespace(site_polygon=box(0, 0, 1, 1), spec={}))
        fields = {key: value for _, rows in data for key, value in rows}
        self.assertTrue(fields['Signed'].startswith('Unsigned'))
        self.assertTrue(fields['Certificate'].startswith('Not selected'))
        self.assertTrue(fields['Has the work started?'].startswith('Unconfirmed'))


if __name__ == '__main__':
    unittest.main()
