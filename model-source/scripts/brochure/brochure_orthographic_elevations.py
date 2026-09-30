"""Occlusion-correct orthographic drawings from exact exported triangles."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import os, json, re, subprocess, hashlib
ROOT=Path(__file__).resolve().parents[2]
os.environ.setdefault('MPLCONFIGDIR',str(ROOT/'.cache/matplotlib'))
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from PIL import Image
from scripts.brochure.brochure_context_views import srgb
from scripts.geometry.mesh_face_triangles import triangulate_face
OUT=ROOT/'revisions/brochure-spatial-2026-09-28/elevations'
raw=json.loads((ROOT/'outputs/output-proposed-compact/geometry.json').read_text())
nav=json.loads((ROOT/'outputs/output-proposed-compact/navigation.json').read_text())
hidden=set(nav.get('hiddenObjects',[]));count=0
ignore=re.compile(r'foliage|tree|hedge|lawn|plot ground|terrain|grass|gravel|paving|path|boundary|gate|fence|car |flower|shrub|olive|topiary|plant|pool water|forecourt|frontage|retaining|driveway|kerb|soil|mulch',re.I)
binary=OUT/'house-envelope-triangles.bin'
with binary.open('wb') as f:
 for o in raw['objects']:
  n=o.get('object_name',o['name'])
  if n in hidden or ignore.search(o['name']) or o['layer'].startswith(('P50','50')) or 'Garden and site' in o['layer']:continue
  v=np.asarray(o['vertices'],dtype=np.float32).reshape(-1,3)
  if not len(v):continue
  lo=v.min(0);hi=v.max(0)
  if hi[0]<-7 or lo[0]>15 or hi[1]<-17.5 or lo[1]>14.9 or hi[2]<0:continue
  tris=[];col=[];mats=o.get('materials',[]);apps=o.get('material_appearance',[]);slots=o.get('face_materials',[])
  for fi,face in enumerate(o['faces']):
   mi=slots[fi] if fi<len(slots) else 0
   mat=mats[mi] if mi<len(mats) else '';role=apps[mi] if mi<len(apps) else None
   c=raw['materials'].get(mat,[.65,.65,.62,1])[:3]
   if role in ('wall','oak-panel'):c=[.50,.255,.155]
   elif role in ('roof','dormer'):c=[.085,.10,.11]
   elif role=='oak-detail':continue
   if re.search(r'glass|glazing',mat,re.I):c=[.43,.60,.63]
   for tri in triangulate_face(v,face):tris.append(tri);col.append(c)
  if tris:
   np.concatenate([np.asarray(tris).reshape(-1,9),srgb(col)],axis=1).astype('<f4').tofile(f);count+=len(tris)
views={'S':([4,-100,4],[4,0,4],25,'South-facing elevation'),
       'W':([-100,-1,4],[0,-1,4],35,'Entrance courtyard / west-facing elevation'),
       'E':([100,-1,4],[0,-1,4],35,'East-facing elevation'),
       'N':([4,100,4],[4,0,4],25,'Rear / north-facing elevation')}
for key,(eye,target,width,title) in views.items():
 ppm=OUT/(key+'-ortho.ppm');raster=OUT/(key+'-ortho.png');height=width*1600/3600
 subprocess.run(['/tmp/ashley-brochure-cpu-render',str(binary),str(ppm),'3600','1600',*map(str,eye+target),str(-width)],check=True)
 with Image.open(ppm) as im:im.save(raster)
 ppm.unlink()
 fig,ax=plt.subplots(figsize=(12,5.6));fig.subplots_adjust(.01,.02,.99,.99)
 ax.imshow(Image.open(raster),extent=(-width/2,width/2,4-height/2,4+height/2),zorder=2)
 ax.fill_between([-width/2,width/2],[-10,-10],[0,0],color='white',zorder=3)
 ax.plot([-width/2,width/2],[0,0],lw=.8,color='#465046',zorder=4)
 for z,label in ((0,'Ground +0.00 m'),(2.8,'First floor +2.80 m'),(5.55,'Loft datum +5.55 m')):
  ax.text(-width/2+.2,z+.13,label,fontsize=7,color='#465046',bbox=dict(fc='white',ec='none',pad=2),zorder=5)
 x=-width/2+1; y=-.62
 ax.plot([x,x+5],[y,y],lw=1,color='#273c34')
 for d in (0,2.5,5):
  ax.plot([x+d,x+d],[y-.06,y+.06],lw=.8,color='#273c34');ax.text(x+d,y+.13,f'{d:g}'+(' m' if d==5 else ''),ha='center',fontsize=7,color='#273c34')
 ax.set_xlim(-width/2,width/2);ax.set_ylim(min(-1.1,4-height/2),4+height/2);ax.set_aspect('equal');ax.axis('off')
 fig.savefig(OUT/(key+'.svg'),transparent=True);fig.savefig(OUT/(key+'.png'),dpi=220,facecolor='white');plt.close(fig)
 (OUT/(key+'.json')).write_text(json.dumps({'view':key,'title':title,'method':'Orthographic triangle z-buffer, no AI; raster geometry with vector datum and scale annotations','triangles':count,'geometrySha256':hashlib.sha256((ROOT/'outputs/output-proposed-compact/geometry.json').read_bytes()).hexdigest(),'basis':'Current Proposed geometry, brick palette. Not a measured elevation.'},indent=2)+'\n')
 print('ORTHOGRAPHIC',key,flush=True)
