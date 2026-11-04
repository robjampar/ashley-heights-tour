import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from scripts.publication.structure_delivery import FILES, package_structure, redirect_structure


class StructureDeliveryTests(unittest.TestCase):
    def test_complete_runtime_and_versioned_model_reference(self):
        with TemporaryDirectory() as tmp:
            root=Path(tmp);folder=root/'structure';folder.mkdir()
            for name in FILES:(folder/name).write_bytes(b'content')
            (folder/'index.html').write_text('<a href="../?design=proposed">House</a>')
            (folder/'studio.js').write_text('load("../proposal-compact.glb")')
            (folder/'members.json').write_text(json.dumps({'revision':'R1','elements':[],'approvedForConstruction':False}))
            (folder/'members 2.json').write_text('unwanted local duplicate')
            prefix,payload,members=package_structure(root,'proposal-compact.abcdef.glb.gz')
            self.assertEqual(set(payload),set(FILES))
            self.assertIn(b'../../proposal-compact.abcdef.glb.gz',payload['studio.js'])
            self.assertIn(b'../../?design=proposed',payload['index.html'])
            self.assertFalse(members['approvedForConstruction'])
            self.assertEqual(package_structure(root,'proposal-compact.abcdef.glb.gz')[0],prefix)
            (folder/'members.json').write_text(json.dumps({'revision':'R2'}))
            self.assertNotEqual(package_structure(root,'proposal-compact.abcdef.glb.gz')[0],prefix)
            redirect=redirect_structure(prefix)
            self.assertIn(b'u.search=location.search',redirect)
            self.assertIn(b'u.hash=location.hash',redirect)

    def test_missing_member_data_prevents_partial_publication(self):
        with TemporaryDirectory() as tmp:
            root=Path(tmp);(root/'structure').mkdir()
            for name in FILES:
                if name!='members.json':(root/'structure'/name).write_bytes(b'content')
            with self.assertRaises(FileNotFoundError):package_structure(root,'model.glb.gz')
