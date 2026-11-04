import json,numpy as np
from pathlib import Path
G=json.loads(Path(__file__).with_name('inspection-geometry.json').read_text());tri=[];names=[]
for o in G:
 if not ('roof lining' in o['object_name'].lower()):continue
 vs=o['vertices']
 for f in o['faces']:
  for i in range(1,len(f)-1):tri.append([vs[f[0]],vs[f[i]],vs[f[i+1]]]);names.append(o['object_name'])
T=np.array(tri);e1=T[:,1]-T[:,0];e2=T[:,2]-T[:,0]
def ray(p,d=(0,0,1)):
 d=np.array(d);h=np.cross(d,e2);a=np.einsum('ij,ij->i',e1,h);valid=np.abs(a)>1e-10;f=np.divide(1,a,out=np.zeros_like(a),where=valid);s=np.array(p)-T[:,0];u=f*np.einsum('ij,ij->i',s,h);q=np.cross(s,e1);v=f*(q@d);t=f*np.einsum('ij,ij->i',e2,q);ok=valid&(u>=-1e-8)&(v>=-1e-8)&(u+v<=1+1e-8)&(t>0)
 ids=np.where(ok)[0];ids=sorted(ids,key=lambda k:t[k]);return [(round(float(t[k]+p[2]),4),names[k])for k in ids[:2]]
for x,y in [(-3.5,3.186),(-3,3.186),(-1,3.186),(-.1,3.186),(.05,2.286),(1,2.286),(2,2.286),(5,2.286),(5.5,2.286),(6,2.286)]+[(x,y)for x in (5.6,5.8,6,6.2,6.5,7)for y in (0,.5,1,1.5,2,2.3,3,4)]:print(x,y,ray((x,y,5.54)))
