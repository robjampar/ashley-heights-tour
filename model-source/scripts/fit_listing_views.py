"""Approximate perspective fits to fixed landmarks in the agent's photos."""
import json,math
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares
ROOT=Path(__file__).resolve().parents[1]
# Image 00: facade corners, garage corners and gable apex in the 1024x683 original.
world=np.array([[0,0,0],[13.98,0,0],[0,0,5.35],[13.98,0,5.35],[-5.18,0,0],[-5.18,0,2.8],[6.94,-.43,6.72]],float)
image=np.array([[320,408],[722,380],[315,198],[739,257],[43,423],[43,316],[563,178]],float)
def project(p):
 eye=p[:3];yaw,pitch,f=p[3],p[4],math.exp(p[5]);fw=np.array([math.sin(yaw)*math.cos(pitch),math.cos(yaw)*math.cos(pitch),math.sin(pitch)]);rt=np.array([math.cos(yaw),-math.sin(yaw),0]);up=np.cross(rt,fw);d=world-eye
 return np.stack([512+f*(d@rt)/(d@fw),341.5-f*(d@up)/(d@fw)],1)
res=least_squares(lambda p:(project(p)-image).ravel(),[-7,-15,1.6,.5,.04,math.log(700)],bounds=([-25,-40,.5,-1,-.5,math.log(450)],[10,-5,4,1,.5,math.log(1600)]),loss='soft_l1',f_scale=8)
p=res.x;yaw,pitch=p[3:5];direction=[math.sin(yaw)*math.cos(pitch),math.cos(yaw)*math.cos(pitch),math.sin(pitch)];fov=math.degrees(2*math.atan(512/math.exp(p[5])))
extra=[{'key':'listing-00','id':900000,'room':'Front elevation — agent photo','view':0,'floor':2,'position':p[:3].tolist(),'direction':direction,'horizontal_fov':fov,'width':1024,'height':683,'source':str(ROOT/'source/listing-photos/00.jpg'),'pose_basis':'Approximate least-squares fit of seven facade landmarks; RMS pixel residual '+str(round(np.sqrt(np.mean((project(p)-image)**2)),2))},
{'key':'listing-02','id':900002,'room':'Entrance porch — agent close-up','view':0,'floor':2,'position':[6.94,-4.89,1.55],'direction':[0,1,0],'horizontal_fov':82,'width':1024,'height':683,'source':str(ROOT/'source/listing-photos/02.jpg'),'pose_basis':'Manual fit to column axes and doorway'}]
path=ROOT/'photo-review/views.json';views=[v for v in json.loads(path.read_text())if not v['key'].startswith('listing-')];views+=extra;path.write_text(json.dumps(views,indent=2));print(json.dumps(extra,indent=2))
