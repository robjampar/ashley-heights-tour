"""A running review must follow moved evidence without losing owner decisions."""
import importlib.util
import io
import json
from pathlib import Path
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('owner_review', ROOT/'revisions/whole-house-review-2026-09-29/serve.py')
review = importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)

class InventoryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        self.here = self.root/'review';self.here.mkdir()
        self.state = self.here/'decisions';self.state.mkdir()
        (self.state/'decisions.json').write_text(json.dumps({'revision':3,'decisions':{'AH-001':{'status':'approved','proposalHash':'same-design'}},'history':[]}))
        self.inventory('old.txt')
        self.context = patch.multiple(review,ROOT=self.root,HERE=self.here,STATE_DIR=self.state,DATA={},ITEMS={},ALLOWED=set(),_INVENTORY_BYTES=None)
        self.context.start();self.addCleanup(self.context.stop)
        (self.root/'docs/maintenance').mkdir(parents=True)
        (self.root/'docs/maintenance/path-map.json').write_text(json.dumps({'old.txt':'new.txt'}))
        (self.root/'new.txt').write_text('current evidence')
        review.refresh_inventory()
    def inventory(self,source,proposal_hash='same-design'):
        (self.here/'proposals.json').write_text(json.dumps({'items':[{'id':'AH-001','sources':[source],'proposalHash':proposal_hash}]}))
    def get(self,path):
        handler=object.__new__(review.Handler)
        handler.headers={'Host':'127.0.0.1:8878'};handler.server=SimpleNamespace(server_port=8878);handler.path=path
        responses=[];handler.respond=lambda *args,**kwargs:responses.append(args)
        handler.do_GET()
        return responses[0]
    def test_inventory_reloads_and_old_evidence_link_resolves(self):
        saved=(self.state/'decisions.json').read_bytes()
        self.inventory('new.txt')
        response=self.get('/source?path=old.txt')
        self.assertEqual(response[:2],(200,b'current evidence'))
        self.assertEqual(review.DATA['items'][0]['sources'],['new.txt'])
        self.assertEqual(review.state()['decisions']['AH-001']['status'],'approved')
        self.assertEqual((self.state/'decisions.json').read_bytes(),saved)
    def test_relocation_does_not_bypass_evidence_allowlist(self):
        self.inventory('allowed.txt')
        self.assertEqual(self.get('/source?path=old.txt')[0],404)
        self.assertEqual(self.get('/source?path=../../private.txt')[0],404)
    def test_changed_proposal_requires_review_again_without_rewriting_decision(self):
        self.inventory('new.txt','changed-design')
        response=self.get('/api/review')
        self.assertEqual(response[0],200)
        self.assertEqual(response[1]['state']['decisions']['AH-001']['status'],'unreviewed')
        saved=json.loads((self.state/'decisions.json').read_text())
        self.assertEqual(saved['decisions']['AH-001']['status'],'approved')

class RestartTests(unittest.TestCase):
    def test_restart_refuses_other_workspaces(self):
        with patch.object(review.sys,'argv',['serve.py','--restart','--no-open']), \
             patch.object(review.urllib.request,'urlopen'), \
             patch.object(review.json,'load',return_value={'app':review.IDENTITY,'root':'/another/workspace'}), \
             patch.object(review,'stop_review') as stop:
            with self.assertRaisesRegex(RuntimeError,'No free local review port'):
                review.main()
            stop.assert_not_called()
    def test_restart_replaces_only_the_matching_review(self):
        identity={'app':review.IDENTITY,'root':str(review.HERE)}
        with patch.object(review.sys,'argv',['serve.py','--restart','--no-open']), \
             patch.object(review.urllib.request,'urlopen'), \
             patch.object(review.json,'load',return_value=identity), \
             patch.object(review.socket,'socket'), \
             patch.object(review.subprocess,'Popen') as spawn, \
             patch.object(review,'stop_review') as stop, \
             patch('builtins.open'),patch('builtins.print'):
            review.main()
            stop.assert_called_once_with(8878)
            self.assertEqual(spawn.call_args.args[0][-2:],['--serve','8878'])

if __name__ == '__main__':
    unittest.main()
