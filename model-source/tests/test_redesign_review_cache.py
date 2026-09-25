import json
from pathlib import Path
import tempfile
import unittest

from scripts.regenerate_redesign_review import cache_current, record_cache


class ReviewCacheTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.marker = self.root / 'cache.json'
        (self.root / 'drawing.svg').write_text('verified drawing')
        self.inputs = {'files': {'model.json': 'model-hash'}, 'runtime': 'runtime-1'}

    def test_completed_output_reuses_until_it_is_changed_or_removed(self):
        record_cache(self.root, self.marker, self.inputs, self.inputs, ['drawing.svg'])
        self.assertTrue(cache_current(self.root, self.marker, self.inputs))
        (self.root / 'drawing.svg').write_text('modified drawing')
        self.assertFalse(cache_current(self.root, self.marker, self.inputs))
        (self.root / 'drawing.svg').unlink()
        self.assertFalse(cache_current(self.root, self.marker, self.inputs))

    def test_source_change_during_generation_never_creates_success_marker(self):
        with self.assertRaisesRegex(RuntimeError, 'Inputs changed'):
            record_cache(self.root, self.marker, self.inputs, {'files': {}}, ['drawing.svg'])
        self.assertFalse(self.marker.exists())

    def test_environment_and_input_changes_require_regeneration(self):
        record_cache(self.root, self.marker, self.inputs, self.inputs, ['drawing.svg'])
        self.assertFalse(cache_current(self.root, self.marker, {**self.inputs, 'runtime': 'runtime-2'}))
        self.assertFalse(cache_current(self.root, self.marker, {**self.inputs, 'files': {'model.json': 'new-hash'}}))

    def test_incomplete_or_escaping_output_records_are_rejected(self):
        self.marker.write_text(json.dumps({'schema': 1, 'inputs': self.inputs, 'outputs': {}}))
        self.assertFalse(cache_current(self.root, self.marker, self.inputs))
        self.marker.write_text(json.dumps({'schema': 1, 'inputs': self.inputs, 'outputs': {'../other': 'hash'}}))
        self.assertFalse(cache_current(self.root, self.marker, self.inputs))
        self.marker.write_text('{interrupted')
        self.assertFalse(cache_current(self.root, self.marker, self.inputs))


if __name__ == '__main__':
    unittest.main()
