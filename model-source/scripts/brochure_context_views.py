"""Read-only geometry reference photography, using the registered viewer context."""
from pathlib import Path
import json,sys,math,subprocess,hashlib
import numpy as np
from PIL import Image
from mesh_face_triangles import triangulate_face
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'revisions/brochure-spatial-2026-09-28/context'
VIEWS={
 'street-approach':dict(position=[-33,-20,1.75],target=[5,-6,3],fov=73,title='Approach along Ashley Close'),
 'turning-head':dict(position=[-11,-23,1.75],target=[5,-5,3.8],fov=70,title='The house from the turning head'),
 'west-exterior':dict(position=[-18,-4,12],target=[5,-1,3.5],fov=70,title='West side and original house'),
 'east-exterior':dict(position=[28,-6,15],target=[8,-2,3],fov=68,title='East side of the principal wing'),
 'rear-exterior':dict(position=[8,20,4.2],target=[7,5,3.7],fov=72,title='Rear garden elevation in context'),
 'aerial-neighbourhood':dict(position=[-47,-65,63],target=[-2,-3,0],fov=64,title='Ashley Close from above'),
 'aerial-plot':dict(position=[-20,-36,38],target=[7,5,1],fov=62,title='The house and its garden'),
 'aerial-rear':dict(position=[29,40,39],target=[4,0,1],fov=65,title='Garden and roof forms from the north-east'),
}

def srgb(c):
 c=np.asarray(c,dtype=float)
 return np.where(c<=.0031308,c*12.92,1.055*np.maximum(c,0)**(1/2.4)-.055)

def export():
 source=ROOT/'output-proposed-compact/geometry.json';nav=json.loads((ROOT/'output-proposed-compact/navigation.json').read_text())
 g=json.loads(source.read_text());mats=g['materials'];hidden=set(nav.get('hiddenObjects',[]));target=OUT/'house-street-triangles.bin'
 roles=nav.get('exteriorAppearance',{}).get('materials',{})
 count=0
 with target.open('wb') as stream:
  for o in g['objects']:
   if o.get('object_name',o['name']) in hidden:continue
   verts=np.asarray(o['vertices'],dtype=np.float32).reshape(-1,3)
   if not len(verts):continue
   tris=[];colours=[];materials=o.get('materials',[])
   face_mats=o.get('face_materials',[])
   for fi,face in enumerate(o['faces']):
    if len(face)<3:continue
    mi=face_mats[fi] if fi<len(face_mats) else 0
    name=materials[mi] if mi<len(materials) else ''
    col=mats.get(name,[.6,.6,.57,1])[:3]
    appearances=o.get('material_appearance',[])
    role=appearances[mi] if mi<len(appearances) else roles.get(name,{}).get('role')
    if role in ('wall','oak-panel'):col=[.43,.19,.105]
    elif role in ('roof','dormer'):col=[.055,.063,.070]
    elif role=='oak-detail':continue
    if any(s in name.lower() for s in ('glass','glazing')) and not any(s in name.lower() for s in ('bottle','screen','tv')):col=[.20,.31,.34]
    for tri in triangulate_face(verts,face):tris.append(tri);colours.append(col)
   if not tris:continue
   rows=np.concatenate([np.asarray(tris).reshape(-1,9),srgb(colours)],axis=1).astype('<f4')
   rows.tofile(stream);count+=len(rows)
  street=np.fromfile(OUT/'street-triangles.bin',dtype='<f4').reshape(-1,12);street.tofile(stream);count+=len(street)
 meta={'geometrySha256':hashlib.sha256(source.read_bytes()).hexdigest(),'triangles':count,'finish':'brick / dark grey tile','nativeModelChanged':False,'method':'CPU triangle rasterisation, current model plus viewer street context; flat geometry reference for image enhancement','contextBasis':'Existing registered footprints; neighbour height and facade details include researched estimates.'}
 (OUT/'reference-provenance.json').write_text(json.dumps(meta,indent=2)+'\n');print('EXPORTED',count,flush=True)
 return target

def main():
 target=OUT/'house-street-triangles.bin'
 if not target.exists() or '--export' in sys.argv:export()
 selected=[a for a in sys.argv[1:] if not a.startswith('--')] or list(VIEWS)
 for key in selected:
  v=VIEWS[key];ppm=OUT/(key+'.ppm');png=OUT/(key+'-reference.png')
  cmd=['/tmp/ashley-brochure-cpu-render',str(target),str(ppm),'1800','1200']+[str(x)for x in v['position']+v['target']]+[str(v['fov'])]
  subprocess.run(cmd,check=True)
  with Image.open(ppm) as im:im.save(png)
  ppm.unlink();(OUT/(key+'.json')).write_text(json.dumps(v,indent=2)+'\n');print(png,flush=True)
 (OUT/'camera-manifest.json').write_text(json.dumps(VIEWS,indent=2)+'\n')

if __name__=='__main__':main()
