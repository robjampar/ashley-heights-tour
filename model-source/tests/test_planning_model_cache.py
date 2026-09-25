"""Shared existing-house cache must remain readable during concurrent builds."""
import json
import pickle
import tempfile
import threading
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts.planning_drawings import model


class ModelCacheTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.cache = self.root / 'cache'
        self.cache_patch = patch.object(model, 'CACHE', self.cache)
        self.cache_patch.start()
        self.addCleanup(self.cache_patch.stop)
        self.geometry = self.root / 'geometry.json'
        self.navigation = self.root / 'navigation.json'
        self.geometry.write_text(json.dumps({'objects': [{
            'name': 'Roof', 'layer': '30 Roof', 'vertices': [[0, 0, 1], [1, 0, 1], [0, 1, 1]],
            'faces': [[0, 1, 2]], 'materials': ['Roof tiles'],
        }]}))
        self.navigation.write_text(json.dumps({'site': {'outline_m': [[0, 0], [2, 0], [2, 2], [0, 2]]}}))

    def load(self):
        return model.SourceModel('existing', self.geometry, self.navigation)

    def test_interrupted_legacy_cache_is_rebuilt(self):
        first = self.load()
        cache = next(self.cache.glob('*.pkl'))
        cache.write_bytes(b'\x80\x05')
        rebuilt = self.load()
        self.assertEqual(rebuilt.objects[0].name, first.objects[0].name)
        self.assertEqual(len(pickle.loads(cache.read_bytes())[1]), 1)

    def test_reader_during_partial_write_gets_complete_model(self):
        writing, resume = threading.Event(), threading.Event()
        real_dump = pickle.dump
        errors = []
        def slow_dump(value, stream, **kwargs):
            if threading.current_thread().name == 'paused-cache-writer':
                stream.write(b'\x80\x05')
                stream.flush()
                writing.set()
                if not resume.wait(5):
                    raise TimeoutError('test reader did not finish')
                stream.seek(0)
            real_dump(value, stream, **kwargs)
            stream.truncate()
        def write():
            try:
                self.load()
            except Exception as error:
                errors.append(error)
        with patch.object(model.pickle, 'dump', side_effect=slow_dump):
            worker = threading.Thread(target=write, name='paused-cache-writer', daemon=True)
            worker.start()
            try:
                self.assertTrue(writing.wait(5))
                concurrent = self.load()
                self.assertEqual(concurrent.objects[0].name, 'Roof')
                # The second process has published a complete cache while the
                # first is still writing its own private temporary file.
                self.assertEqual(len(pickle.loads(next(self.cache.glob('*.pkl')).read_bytes())[1]), 1)
            finally:
                resume.set()
                worker.join(5)
        self.assertFalse(worker.is_alive())
        self.assertEqual(errors, [])
        self.assertEqual(self.load().objects[0].name, 'Roof')
        self.assertEqual(list(self.cache.glob('*.tmp')), [])

    def test_failed_writer_leaves_no_cache_or_temporary_file(self):
        with patch.object(model.pickle, 'dump', side_effect=OSError('disk write failed')):
            with self.assertRaisesRegex(OSError, 'disk write failed'):
                self.load()
        self.assertEqual(list(self.cache.iterdir()), [])
        self.assertEqual(self.load().objects[0].name, 'Roof')


if __name__ == '__main__':
    unittest.main()
