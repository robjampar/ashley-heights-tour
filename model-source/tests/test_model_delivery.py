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
