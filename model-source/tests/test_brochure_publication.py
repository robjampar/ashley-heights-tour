import tempfile
import unittest
from pathlib import Path
from scripts.stage_house_brochure import stage_brochure


class BrochurePublicationTests(unittest.TestCase):
    def test_only_referenced_assets_and_correct_nested_tour_link(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder);source=root/'source';dest=root/'site';source.mkdir()
            (source/'images').mkdir();(source/'originals').mkdir()
            (source/'images/room.jpg').write_bytes(b'jpeg')
            (source/'originals/room.png').write_bytes(b'unneeded duplicate')
            (source/'draft.blend').write_bytes(b'private unused draft')
            (source/'book.pdf').write_bytes(b'pdf')
            (source/'index.html').write_text('95 pages, <a href="/?design=proposed">Tour</a><img src="images/room.jpg"><a href="originals/room.png">Download</a><a href="book.pdf#page=6">Page</a><a href="ashley-heights-presentation-images.zip">Download all 1 images</a>')
            result=stage_brochure(source,dest);html=(dest/'index.html').read_text()
            self.assertEqual(result['pages'],95);self.assertEqual(result['images'],1)
            self.assertIn('../?design=proposed',html);self.assertIn('.pdf#page=6',html)
            self.assertNotIn('originals/',html);self.assertIn('(JPEG)',html)
            self.assertFalse((dest/'draft.blend').exists())
            self.assertEqual(len(list(dest.rglob('*.jpg'))),1)

    def test_external_downloads_preserve_bytes_and_page_fragment(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder);source=root/'source';source.mkdir()
            (source/'book.pdf').write_bytes(b'original pdf bytes')
            (source/'index.html').write_text('95 pages, <a href="book.pdf#page=6">Page</a>')
            base='https://github.com/example/house/releases/download/review'
            result=stage_brochure(source,root/'site',root/'downloads',base)
            self.assertFalse(list((root/'site').glob('*.pdf')))
            self.assertEqual(next((root/'downloads').glob('*.pdf')).read_bytes(),b'original pdf bytes')
            html=(root/'site/index.html').read_text()
            self.assertIn(base,html);self.assertIn('.pdf#page=6',html)
            self.assertEqual(len(result['external_downloads']),2)


if __name__=='__main__':unittest.main()
