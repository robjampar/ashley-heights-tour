import importlib.util
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch
spec=importlib.util.spec_from_file_location('pages_artifact',Path(__file__).resolve().parents[1]/'scripts/pages_artifact.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
class PagesArtifactTests(unittest.TestCase):
    def source(self,parent):
        repo=parent/'repo';repo.mkdir()
        for name in module.PUBLIC_NAMES:
            if name in ('assets','model','easter'):
                (repo/name).mkdir();(repo/name/'current.bin').write_bytes(b'public\0content')
            else:(repo/name).write_bytes(b'public')
        (repo/'model'/'previous-cache.bin').write_bytes(b'old cached model')
        (repo/'model-source').mkdir();(repo/'model-source'/'draft.txt').write_text('editable source, not a website asset')
        (repo/'.git').mkdir();(repo/'.git'/'config').write_text('not public')
        return repo
    def test_exact_public_content_and_retained_cache(self):
        with TemporaryDirectory()as tmp:
            parent=Path(tmp);repo=self.source(parent);out=parent/'artifact';result=module.prepare(repo,out)
            expected={p.relative_to(repo):p.read_bytes()for p in module.public_files(repo)}
            self.assertEqual(expected,{p.relative_to(out):p.read_bytes()for p in out.rglob('*')if p.is_file()})
            self.assertEqual(result['bytes'],sum(map(len,expected.values())))
            self.assertNotIn(Path('model-source/draft.txt'),expected)
    def test_budget_rejects_before_creating_output(self):
        with TemporaryDirectory()as tmp:
            parent=Path(tmp);repo=self.source(parent);out=parent/'artifact'
            with self.assertRaises(RuntimeError):module.prepare(repo,out,budget=1)
            self.assertFalse(out.exists())
    def test_partial_original_tour_is_rejected(self):
        with TemporaryDirectory()as tmp:
            parent=Path(tmp);repo=self.source(parent);out=parent/'artifact'
            (repo/'.git/HEAD').write_text('ref: refs/heads/main')
            with patch.object(module.subprocess,'check_output',return_value='assets/missing.js\n'):
                with self.assertRaises(FileNotFoundError):module.prepare(repo,out)
            self.assertFalse(out.exists())
    def test_rejects_links_and_checkout_destination(self):
        with TemporaryDirectory()as tmp:
            parent=Path(tmp);repo=self.source(parent)
            with self.assertRaises(ValueError):module.prepare(repo,repo/'artifact')
            (repo/'model'/'linked').symlink_to(repo/'model-source'/'draft.txt')
            with self.assertRaises(ValueError):module.prepare(repo,parent/'artifact')
