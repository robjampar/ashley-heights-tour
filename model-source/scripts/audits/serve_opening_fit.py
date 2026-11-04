"""Serve a staged opening model without changing active viewer/model assets."""
import argparse
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parents[2]

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',type=Path,required=True);p.add_argument('--port',type=int,default=8768);p.add_argument('--structure',type=Path,default=ROOT/'walkthrough/public/structure');a=p.parse_args()
    stage=a.stage.resolve()
    class Handler(SimpleHTTPRequestHandler):
        def translate_path(self,path):
            name=urlsplit(path).path.lstrip('/')
            overrides={'proposal-compact.glb':stage/'candidate.glb','proposal-compact.glb.gz':stage/'candidate.glb','proposal-compact-navigation.json':stage/'navigation.json'}
            if name in overrides:return str(overrides[name])
            if name.startswith('structure/') and name.endswith(('.json','.csv')):return str(a.structure.resolve()/name[len('structure/'):])
            if name.startswith('opening-fit-textures/'):return str(stage/name)
            if name.startswith('visual-quality/compact-') and ('furnishings'in name or 'daylight.json'in name):
                return str(stage/'deliberately-disabled-stale-visual-assets')
            return str(ROOT/'walkthrough/dist'/(name or'index.html'))
        def end_headers(self):self.send_header('Cache-Control','no-store');super().end_headers()
    ThreadingHTTPServer(('127.0.0.1',a.port),Handler).serve_forever()
