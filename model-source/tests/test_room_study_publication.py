import hashlib,json,tempfile,unittest
from pathlib import Path
from scripts.stage_room_studies import stage_room_studies


class RoomStudyPublicationTests(unittest.TestCase):
    def test_changed_model_gets_new_url_while_cached_page_assets_are_retained(self):
        with tempfile.TemporaryDirectory()as folder:
            source=Path(folder)/'source';destination=Path(folder)/'published';(source/'models').mkdir(parents=True)
            for name in ('studio.css','room-model.js','cinema-plan.svg'):(source/name).write_text(name)
            for variant in ('compact','planning'):
                (source/'models'/(variant+'-cinema.glb')).write_bytes(b'first geometry')
                (source/'models'/(variant+'-cinema.json')).write_text('{}')
            (source/'index.html').write_text('<link href="studio.css">')
            (source/'cinema.html').write_text('<link href="studio.css"><script type="module" src="room-model.js"></script>')
            retire=lambda info,now:{**info,'retain_until_epoch':info.get('retain_until_epoch',now+7200)}
            first=stage_room_studies(source,destination,{},100,retire,('cinema',))
            old=next(k for k,v in first['assets'].items()if v['source']=='models/compact-cinema.glb')
            (source/'models/compact-cinema.glb').write_bytes(b'updated geometry')
            second=stage_room_studies(source,destination,first,101,retire,('cinema',))
            new=next(k for k,v in second['assets'].items()if v['source']=='models/compact-cinema.glb')
            self.assertNotEqual(old,new);self.assertTrue((destination/old).exists())
            html=(destination/'cinema.html').read_text();self.assertIn(new,html);self.assertNotIn(old,html)
            self.assertNotIn('src="room-model.js"',html);self.assertNotIn('href="studio.css"',html)
            third=stage_room_studies(source,destination,second,7400,retire,('cinema',))
            self.assertFalse((destination/old).exists());self.assertTrue((destination/new).exists())
            self.assertEqual(hashlib.sha256((destination/new).read_bytes()).hexdigest(),third['assets'][new]['sha256'])
