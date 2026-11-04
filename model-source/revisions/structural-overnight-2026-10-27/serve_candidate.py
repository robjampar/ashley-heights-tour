"""Stream the staged model for review without changing the active viewer assets."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[2]
STAGE = ROOT / 'outputs/output-structural-fit-compact'


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = urlsplit(path).path.lstrip('/')
        overrides = {
            'proposal-compact.glb': STAGE / 'candidate.glb',
            'proposal-compact.glb.gz': STAGE / 'candidate.glb',
            'proposal-compact-navigation.json': STAGE / 'navigation.json',
        }
        if p in overrides:
            return str(overrides[p])
        if p.startswith('candidate-textures/'):
            return str(STAGE / p)
        if p.startswith('visual-quality/compact-') and ('furnishings' in p or 'daylight.json' in p):
            return str(STAGE / 'deliberately-unavailable-stale-visual-assets')
        return str(ROOT / 'walkthrough/dist' / (p or 'index.html'))

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


ThreadingHTTPServer(('127.0.0.1', 8767), Handler).serve_forever()
