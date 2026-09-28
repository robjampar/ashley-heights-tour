import gzip
import hashlib
import unittest
from scripts.model_delivery import delivery_asset

class ModelDeliveryTests(unittest.TestCase):
    def test_gzip_round_trip_and_stable_name(self):
        raw=b'glTF'+bytes(range(256))*32
        path,packed=delivery_asset('models/room.glb',raw)
        self.assertEqual(gzip.decompress(packed),raw)
        self.assertEqual(path.as_posix(),'models/room.'+hashlib.sha256(packed).hexdigest()[:16]+'.glb.gz')
        self.assertEqual(delivery_asset('models/room.glb',raw),(path,packed))
    def test_other_assets_unchanged(self):
        path,payload=delivery_asset('plan.svg',b'original')
        self.assertEqual(payload,b'original');self.assertEqual(path.suffix,'.svg')

    def test_unchanged_model_skips_compression(self):
        from tempfile import TemporaryDirectory
        from unittest.mock import patch
        with TemporaryDirectory() as folder:
            first=delivery_asset('room.glb',b'glTFdata',folder)
            with patch('scripts.model_delivery.gzip.compress',side_effect=AssertionError('recompressed')):
                self.assertEqual(delivery_asset('room.glb',b'glTFdata',folder),first)

    def test_changed_model_and_corrupt_cache_rebuild(self):
        from tempfile import TemporaryDirectory
        from pathlib import Path
        with TemporaryDirectory() as folder:
            first=delivery_asset('room.glb',b'first',folder)
            second=delivery_asset('room.glb',b'second',folder)
            self.assertNotEqual(first[0],second[0])
            for file in Path(folder).glob('*.gz'):file.write_bytes(b'broken cache')
            self.assertEqual(delivery_asset('room.glb',b'first',folder),first)
