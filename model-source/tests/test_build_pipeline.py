"""Freshness, dependency isolation and command routing for incremental builds."""
import json
from pathlib import Path
import subprocess
import tempfile
import threading
from types import SimpleNamespace
import unittest
from unittest.mock import patch

from scripts import build_support as build
from scripts import regenerate_design_outputs as runner
from scripts.refresh_exterior_appearance import validate_checkpoint
from scripts.blender_collections import collection_memberships, object_collections


class BuildCacheTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        names = {
            'output-walkthrough/Ashley Heights.blend', 'output-walkthrough/geometry.json',
            'walkthrough/public/navigation.json', 'proposal/design-spec.json',
            'proposal/design-spec-compact.json', 'proposal/design-spec-planning.json',
            'proposal/site-terrain.json', 'proposal/P4_site-feasibility.json',
            'proposal/P4_parking-validated.json', 'scripts/build_model.py',
            'scripts/build_extension_proposal.py', 'scripts/build_support.py',
            'scripts/blender_collections.py', 'scripts/blender_booleans.py', 'scripts/exterior_exposure.py',
        }
        names.update('scripts/' + name for v in ('compact', 'planning') for name in build.modules_for(v))
        for name in names:
            self.put(name, name)
        self.put('proposal/original-preservation.json', '{"files": {}}')
        self.binary = self.put('Blender', 'binary')
        for variant in ('planning', 'compact'):
            for path in build.required_outputs(self.root, variant):
                self.put(path.relative_to(self.root), path.name)
            self.put(build.output_dir(self.root, variant).relative_to(self.root) / 'build-inputs.json',
                     json.dumps(build.source_hashes(self.root, variant)))
            build.record_success(self.root, variant, self.binary, build.source_hashes(self.root, variant))

    def put(self, name, content):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)
        return path

    def fresh(self, variant='planning'):
        return build.current_build(self.root, variant, self.binary)[0]

    def test_no_change_reuses_both_models(self):
        self.assertTrue(self.fresh())
        self.assertTrue(self.fresh('compact'))

    def test_planning_overlay_does_not_invalidate_compact(self):
        self.put('proposal/design-spec-planning.json', '{"changed": true}')
        self.assertFalse(self.fresh())
        self.assertTrue(self.fresh('compact'))

    def test_garden_and_shared_primitive_changes_invalidate_both(self):
        for name in ('scripts/proposal_garden_levels.py', 'scripts/build_model.py'):
            with self.subTest(name=name):
                original = (self.root / name).read_text()
                self.put(name, 'changed')
                self.assertFalse(self.fresh())
                self.assertFalse(self.fresh('compact'))
                self.put(name, original)

    def test_compact_only_module_does_not_invalidate_planning(self):
        self.put('scripts/proposal_workshop.py', 'changed')
        self.assertTrue(self.fresh())
        self.assertFalse(self.fresh('compact'))

    def test_missing_or_manually_modified_output_is_not_reused(self):
        for path in build.required_outputs(self.root, 'planning'):
            with self.subTest(path=path):
                data = path.read_bytes()
                path.unlink()
                self.assertFalse(self.fresh())
                path.write_bytes(data + b'edited')
                self.assertFalse(self.fresh())
                path.write_bytes(data)
                self.assertTrue(self.fresh())

    def test_new_optional_input_invalidates_cache(self):
        self.put('proposal/P5_internal-garden-area.json', '{}')
        self.assertFalse(self.fresh())

    def test_blender_change_invalidates_cache(self):
        self.binary.write_text('a new Blender binary')
        self.assertFalse(self.fresh())

    def test_source_change_during_build_cannot_record_success(self):
        inputs = build.source_hashes(self.root, 'planning')
        self.put('proposal/site-terrain.json', 'changed during build')
        with self.assertRaises(RuntimeError):
            build.record_success(self.root, 'planning', self.binary, inputs)
        self.assertFalse(self.fresh())

    def test_missing_or_corrupt_manifest_is_not_reused(self):
        record = build.output_dir(self.root, 'planning') / 'build-cache.json'
        record.write_text('{broken')
        self.assertFalse(self.fresh())
        record.write_text('[]')
        self.assertFalse(self.fresh())
        record.unlink()
        self.assertFalse(self.fresh())

    def test_planning_stage_is_timed_and_garden_is_a_dependency(self):
        modules = list(build.modules_for('planning'))
        self.assertLess(modules.index('proposal_garden_levels.py'), modules.index('proposal_planning.py'))
        self.assertEqual(modules[modules.index('proposal_planning.py') + 1], 'proposal_appearance.py')
        self.assertIn('scripts/proposal_garden_levels.py', build.source_hashes(self.root, 'planning'))

    def test_finish_refresh_accepts_only_finish_source_changes(self):
        self.put('scripts/proposal_appearance.py', 'updated tagging')
        self.put('scripts/exterior_exposure.py', 'updated exposure')
        self.assertFalse(self.fresh())
        self.assertEqual(validate_checkpoint(self.root, 'planning', self.binary),
                         build.source_hashes(self.root, 'planning'))
        self.put('proposal/design-spec-planning.json', 'changed architecture')
        with self.assertRaisesRegex(RuntimeError, 'Architecture/build inputs changed'):
            validate_checkpoint(self.root, 'planning', self.binary)

    def test_finish_refresh_rejects_modified_or_missing_outputs(self):
        path = build.required_outputs(self.root, 'planning')[0]
        path.write_text('modified model')
        with self.assertRaisesRegex(RuntimeError, 'Output changed'):
            validate_checkpoint(self.root, 'planning', self.binary)
        path.unlink()
        with self.assertRaises(RuntimeError):
            validate_checkpoint(self.root, 'planning', self.binary)

    def test_finish_refresh_rejects_different_blender_and_corrupt_cache(self):
        self.binary.write_text('different binary')
        with self.assertRaisesRegex(RuntimeError, 'Blender changed'):
            validate_checkpoint(self.root, 'planning', self.binary)
        self.put('output-proposed-planning/build-cache.json', '[]')
        with self.assertRaises(RuntimeError):
            validate_checkpoint(self.root, 'planning', self.binary)


class RunnerTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.root_patch = patch.object(runner, 'ROOT', self.root)
        self.root_patch.start()
        self.addCleanup(self.root_patch.stop)
        self.blender_patch = patch.object(Path, 'is_file', return_value=True)
        self.blender_patch.start()
        self.addCleanup(self.blender_patch.stop)

    def test_selected_viewer_build_only_runs_selected_model_and_viewer(self):
        with patch.object(runner, 'current_build', return_value=(False, 'changed')), patch.object(runner, 'run') as run:
            runner.main(['--variant', 'planning', '--viewer-only'])
        self.assertEqual(len(run.call_args_list), 2)
        self.assertEqual(run.call_args_list[0].args[1]['PROPOSAL_VARIANT'], 'planning')
        self.assertEqual(run.call_args_list[1].args[0], ['npm', 'run', 'build'])

    def test_current_models_only_build_runs_no_subprocesses(self):
        with patch.object(runner, 'current_build', return_value=(True, 'current')), patch.object(runner, 'run') as run:
            runner.main(['--models-only'])
        run.assert_not_called()

    def test_force_rebuilds_selected_model(self):
        with patch.object(runner, 'current_build') as freshness, patch.object(runner, 'run') as run:
            runner.main(['--variant', 'compact', '--models-only', '--force'])
        freshness.assert_not_called()
        self.assertEqual(run.call_count, 1)
        self.assertEqual(run.call_args.args[1]['PROPOSAL_VARIANT'], 'compact')

    def test_finish_refresh_uses_completed_model_path(self):
        with patch.object(runner, 'current_build', return_value=(False, 'finish source changed')), patch.object(runner, 'run') as run:
            runner.main(['--variant', 'planning', '--appearance-only', '--models-only'])
        self.assertEqual(run.call_count, 1)
        command = run.call_args.args[0]
        self.assertEqual(command[-4:], ['--python', 'scripts/refresh_exterior_appearance.py', '--', 'planning'])

    def test_failure_stops_before_viewer_and_records_failed_timing(self):
        with patch.object(runner, 'current_build', return_value=(False, 'changed')), patch.object(
                runner, 'run', side_effect=subprocess.CalledProcessError(1, 'Blender')) as run:
            with self.assertRaises(subprocess.CalledProcessError):
                runner.main(['--variant', 'planning', '--viewer-only'])
        self.assertEqual(run.call_count, 1)
        report = json.loads((self.root / 'regenerate-planning-timings.json').read_text())
        self.assertFalse(report['success'])
        self.assertFalse(report['stages'][-1]['success'])

    def test_both_models_overlap_and_viewer_waits_for_both(self):
        barrier = threading.Barrier(2)
        completed = set()
        def execute(command, env=None, cwd=None, log=None):
            if command[0] == 'npm':
                self.assertEqual(completed, {'compact', 'planning'})
            else:
                barrier.wait(timeout=2)
                completed.add(env['PROPOSAL_VARIANT'])
        with patch.object(runner, 'current_build', return_value=(False, 'changed')), patch.object(runner, 'run', side_effect=execute) as run:
            runner.main(['--viewer-only'])
        self.assertEqual(run.call_count, 3)
        report = json.loads((self.root / 'regenerate-all-timings.json').read_text())
        self.assertTrue(report['success'])
        self.assertEqual({r['variant'] for r in report['model_results']}, completed)

    def test_parallel_failure_waits_for_peer_and_never_builds_viewer(self):
        barrier = threading.Barrier(2)
        completed = set()
        def execute(command, env=None, cwd=None, log=None):
            self.assertNotEqual(command[0], 'npm')
            barrier.wait(timeout=2)
            completed.add(env['PROPOSAL_VARIANT'])
            if env['PROPOSAL_VARIANT'] == 'planning':
                raise subprocess.CalledProcessError(1, 'Blender')
        with patch.object(runner, 'current_build', return_value=(False, 'changed')), patch.object(runner, 'run', side_effect=execute):
            with self.assertRaises(subprocess.CalledProcessError):
                runner.main(['--viewer-only'])
        self.assertEqual(completed, {'compact', 'planning'})
        self.assertFalse(json.loads((self.root / 'regenerate-all-timings.json').read_text())['success'])

    def test_overlapping_runner_is_rejected_without_replacing_outputs(self):
        with runner.selected_build_lock(('planning',)):
            with self.assertRaisesRegex(RuntimeError, 'already being regenerated'):
                with runner.selected_build_lock(('compact', 'planning')):
                    self.fail('Overlapping runner acquired a lock')
            # Failed multi-lock acquisition releases its non-conflicting lock.
            with runner.selected_build_lock(('compact',)):
                pass
        with runner.selected_build_lock(('planning',)):
            pass


class CollectionIndexTests(unittest.TestCase):
    def test_shared_membership_and_scene_roots_preserve_blender_order(self):
        a = SimpleNamespace(as_pointer=lambda: 1)
        b = SimpleNamespace(as_pointer=lambda: 2)
        first = SimpleNamespace(objects=[b, a])
        second = SimpleNamespace(objects=[a])
        scene_root = SimpleNamespace(objects=[a])
        data = SimpleNamespace(collections=[first, second], scenes=[SimpleNamespace(collection=scene_root)])
        index = collection_memberships(data)
        self.assertEqual(object_collections(a, index), (first, second, scene_root))
        self.assertEqual(object_collections(b, index), (first,))
        new = SimpleNamespace(as_pointer=lambda: 3, users_collection=(second,))
        self.assertEqual(object_collections(new, index), (second,))


if __name__ == '__main__':
    unittest.main()
