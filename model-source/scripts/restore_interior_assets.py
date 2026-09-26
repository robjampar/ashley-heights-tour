"""Restore authored room assets from the repo's immutable publication manifest."""
import argparse,hashlib,json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--published',type=Path,required=True,help='Published model directory, e.g. ../model from model-source')
parser.add_argument('--room',choices=('kitchen','principal'),default='kitchen')
parser.add_argument('--destination',type=Path)
args=parser.parse_args()
release=json.loads((args.published/'release.json').read_text())['interior_studio' if args.room=='kitchen' else 'principal_studio']
source=(args.published/'interiors'/args.room).resolve();target=(args.destination or ROOT/'walkthrough/public/interiors'/args.room).resolve();count=0
for hashed,info in release['assets'].items():
    name=info['source']
    if name in ('room-model.js','studio.js') or (args.room!='kitchen' and name=='studio.css'):continue  # Shared engine/style are supplied by the build; generated bundles contain publication URLs.
    src=(source/hashed).resolve();dst=(target/name).resolve()
    assert src.is_relative_to(source) and dst.is_relative_to(target)
    data=src.read_bytes();assert hashlib.sha256(data).hexdigest()==info['sha256'],src
    dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(data);count+=1
print('Restored',count,'verified room assets to',target)
