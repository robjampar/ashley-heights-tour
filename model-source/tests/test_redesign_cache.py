"""An independent option is reusable only with matching sources and deliverables."""
import json
from pathlib import Path
import tempfile
import unittest
from scripts import redesign_support as support
from scripts.build_support import blender_identity, sha256


class RedesignReuseTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.binary = self.root / 'Blender'; self.binary.write_text('binary')
        for option in ('i1', 'e1', 'e2'):
            for path in support.input_paths(self.root, option):
                path.parent.mkdir(parents=True, exist_ok=True)
                if not path.exists(): path.write_text(str(path.relative_to(self.root)))
            (self.root / f'proposal/redesigns/{option}.json').write_text(json.dumps({'code': option.upper(), 'name': 'Study'}))
        for option in ('i1', 'e1', 'e2'):
            for path in support.required_outputs(self.root, option):
                path.parent.mkdir(parents=True, exist_ok=True); path.write_text(path.name)
            self.record(option)

    def record(self, option):
        report = {'cache_schema': 1, 'option': option, 'blender': blender_identity(self.binary),
                  'inputs': support.input_hashes(self.root, option), 'original_preserved': {'original': True},
                  'outputs': {str(p.relative_to(self.root)): sha256(p) for p in support.required_outputs(self.root, option)}}
        (self.root / f'output-redesign-{option}/build-report.json').write_text(json.dumps(report))

    def fresh(self, option):
        return support.current_redesign(self.root, option, self.binary)[0]

    def test_unchanged_is_reused_and_design_specific_code_is_isolated(self):
        self.assertTrue(all(self.fresh(o) for o in ('i1', 'e1', 'e2')))
        (self.root / 'scripts/redesign_e2.py').write_text('changed')
        self.assertFalse(self.fresh('e2'))
        self.assertTrue(self.fresh('e1')); self.assertTrue(self.fresh('i1'))

    def test_changed_missing_or_unpublished_output_requires_rebuild(self):
        for path in support.required_outputs(self.root, 'e1'):
            with self.subTest(path=path):
                content = path.read_bytes(); path.write_bytes(content + b'edited'); self.assertFalse(self.fresh('e1'))
                path.unlink(); self.assertFalse(self.fresh('e1')); path.write_bytes(content); self.assertTrue(self.fresh('e1'))

    def test_shared_helpers_and_blender_identity_are_dependencies(self):
        path = self.root / 'scripts/blender_collections.py'; content = path.read_text(); path.write_text('changed')
        self.assertFalse(self.fresh('e1')); self.assertFalse(self.fresh('i1'))
        path.write_text(content); self.binary.write_text('different binary')
        self.assertFalse(self.fresh('e1'))

    def test_incomplete_or_failed_preservation_record_is_not_reused(self):
        path = self.root / 'output-redesign-e1/build-report.json'; report = json.loads(path.read_text())
        report['original_preserved']['original'] = False; path.write_text(json.dumps(report)); self.assertFalse(self.fresh('e1'))
        self.record('e1'); report = json.loads(path.read_text()); report['outputs'].pop(next(iter(report['outputs'])))
        path.write_text(json.dumps(report)); self.assertFalse(self.fresh('e1'))
        path.write_text('[]'); self.assertFalse(self.fresh('e1'))
        path.unlink(); self.assertFalse(self.fresh('e1'))


if __name__ == '__main__':
    unittest.main()
