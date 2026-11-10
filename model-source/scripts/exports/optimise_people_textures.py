"""Compact browser GLBs, retaining full skin/UV/geometry and animation buffers."""
from pathlib import Path
import json,struct,io,hashlib,argparse
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
parser=argparse.ArgumentParser();parser.add_argument('--directory',type=Path,default=ROOT/'walkthrough/public/people');parser.add_argument('--only');args=parser.parse_args();directory=args.directory
manifest=json.loads((directory/'assets.json').read_text())
for model in manifest['models']:
 if args.only and model['style']!=args.only:continue
 path=directory/model['file'];raw=path.read_bytes();length=struct.unpack_from('<I',raw,12)[0];doc=json.loads(raw[20:20+length]);binary=raw[28+length:]
 images={i['bufferView']:i for i in doc['images']};chunks=[];offset=0
 for index,view in enumerate(doc['bufferViews']):
  data=binary[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']]
  if index in images:
   meta=images[index];im=Image.open(io.BytesIO(data));alpha='opacity' in meta.get('name','');normal='normal' in meta.get('name','')
   limit=1024 if alpha or normal or 'body' in meta.get('name','') else 2048
   im.thumbnail((limit,limit),Image.Resampling.LANCZOS);out=io.BytesIO()
   if alpha:im.convert('RGBA').save(out,format='PNG',optimize=True);meta['mimeType']='image/png'
   else:im.convert('RGB').save(out,format='JPEG',quality=92 if normal else 90,subsampling=0,optimize=True);meta['mimeType']='image/jpeg'
   data=out.getvalue()
  view['byteOffset']=offset;view['byteLength']=len(data);pad=(-len(data))%4;chunks.extend([data,b'\0'*pad]);offset+=len(data)+pad
 for material in doc['materials']:
  if 'opacity' in material['name']:material['alphaMode']='MASK';material['alphaCutoff']=.42
  else:material['doubleSided']=False
 doc['buffers'][0]['byteLength']=offset
 j=json.dumps(doc,separators=(',',':')).encode();j+=b' '*((-len(j))%4);b=b''.join(chunks)
 result=struct.pack('<III',0x46546c67,2,28+len(j)+len(b))+struct.pack('<II',len(j),0x4e4f534a)+j+struct.pack('<II',len(b),0x004e4942)+b
 path.write_bytes(result);model.update({'sourceExportBytes':len(raw),'bytes':len(result),'sha256':hashlib.sha256(result).hexdigest()});print(model['style'],len(raw),'->',len(result))
manifest['texturePolicy']='2048 px face colour; 1024 px clothing, normal and hair maps; JPEG colour/normal, PNG alpha; source maps preserved.'
(directory/'assets.json').write_text(json.dumps(manifest,indent=2)+'\n')
