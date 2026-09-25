"""Rectilinear reference views from the actual tour panoramas, no generative edits."""
import json,math,sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates
from scipy.spatial.transform import Rotation
from dimension_spec import point
from height_spec import LEVEL
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'photo-review';OUT.mkdir(exist_ok=True)
REF=OUT/'originals';REF.mkdir(exist_ok=True)
data=json.loads((ROOT/'source/tour-data.json').read_text())
links=data['floorplans'][0]['links'];views=[]
W,H=960,720;HFOV=86
for pic in data['pictures']:
    ident=pic['id'];link=links.get('id_'+str(ident))
    if not link:
        if ident not in (2445683,2445684,2445688,2445692,2445696):continue
        link={'x':99,'y':0,'angle':0}
    px=link['x']/100*2048;py=link['y']/100*(2358/6681*2048)
    if px>1630:
        pos=[1.0,24.95,1.58];floor=2
    else:
        floor=1 if px>950 else 0;x,y=point(px,py,floor);pos=[x,y,floor*LEVEL+1.48]
    original=np.asarray(Image.open(ROOT/'source/panoramas'/pic['url'].rsplit('/',1)[-1]),dtype=np.float32)
    ih,iw=original.shape[:2]
    # THREE.Euler('XYZ') sphere correction from the original viewer.
    correction=Rotation.from_euler('XYZ',[float(pic['tilt']),float(pic['pan']),float(pic['roll'])]).as_matrix()
    for n,offset in enumerate([0,math.pi/2,math.pi,3*math.pi/2]):
        lon=float(pic['longitude'])+offset;lat=0
        xs=(2*(np.arange(W)+.5)/W-1)*math.tan(math.radians(HFOV/2))
        ys=(1-2*(np.arange(H)+.5)/H)*math.tan(math.radians(HFOV/2))*H/W
        xx,yy=np.meshgrid(xs,ys)
        forward=np.array([-math.sin(lon),0,math.cos(lon)])
        right=np.array([-math.cos(lon),0,-math.sin(lon)]);up=np.array([0,1,0])
        rays=forward+xx[...,None]*right+yy[...,None]*up
        rays=rays@correction # inverse transform for row vectors
        rays/=np.linalg.norm(rays,axis=-1,keepdims=True)
        lamb=np.arctan2(-rays[:,:,0],rays[:,:,2]);phi=np.arcsin(rays[:,:,1])
        u=((lamb/(2*math.pi)+.5)%1)*iw;v=(.5-phi/math.pi)*ih
        arr=np.stack([map_coordinates(original[:,:,c],[v,u],order=1,mode='wrap') for c in range(3)],axis=-1)
        key=f'{ident}-{n}';Image.fromarray(np.clip(arr,0,255).astype('uint8')).save(REF/f'{key}.jpg',quality=95)
        heading=float(link['angle'])-lon
        views.append({'key':key,'id':ident,'room':pic['title'],'view':n,'floor':floor,'position':pos,
            'direction':[math.sin(heading),-math.cos(heading),0],'longitude':lon,'horizontal_fov':HFOV,
            'width':W,'height':H,'source':str(REF/f'{key}.jpg')})
overrides=json.loads((OUT/'pose-overrides.json').read_text()) if (OUT/'pose-overrides.json').exists() else {}
for v in views:
    o=overrides.get(str(v['id']))
    if o:
        v['position']=o['position'];head=o['yaw']-v['longitude'];v['direction']=[math.sin(head),-math.cos(head),0];v['pose_basis']=o['basis']
(OUT/'views.json').write_text(json.dumps(views,indent=2));print('Prepared',len(views),'reference views')
