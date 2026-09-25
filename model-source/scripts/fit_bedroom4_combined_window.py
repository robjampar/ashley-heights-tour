"""Add user's shorter window with externally aligned head to ceiling audit."""
from pathlib import Path
import json,math
import numpy as np
from scipy.optimize import least_squares
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'photo-review/bedroom4-ceiling-audit'
r=json.loads((OUT/'ceiling-audit.json').read_text())
old=json.loads((ROOT/'photo-review/pose-audit-bedroom4/proposed-pose.json').read_text())
base=np.array(old['candidate_pose_xyz_yaw']);f=480/math.tan(math.radians(43))
def project(p,world,view):
    d=np.array(world)-p[:3];a=p[3]-view*math.pi/2;depth=d@np.array([math.cos(a),math.sin(a),0])
    return np.array([480+f*(d@np.array([math.sin(a),-math.cos(a),0]))/depth,360-f*d[2]/depth])
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text())
ob=next(o for o in g['objects'] if o['object_name']=='First front clear glass.004');v=np.array(ob['vertices']);lo=v.min(axis=0);hi=v.max(axis=0)
x=(lo[0]+hi[0])/2;y=hi[1]
warp=lambda z:3.92+(z-3.55)*(5-3.92)/(5-3.55)
controls=[]
for c in old['landmarks']:
    if 0 in c['components'] or c['components']==[1]:
        controls.append(dict(label=c['label'],view=c['view'],world=list(c['world_m']),observed=list(c['pixel']),components=c['components'],sigma=c['sigma_pixels'],kind='structure'))
controls += [dict(label='West SW cornice lower edge',view=0,world=[.115,.115,5.13],observed=[200,177],components=[1],sigma=[10,10],kind='ceiling'),
             dict(label='West NW cornice lower edge',view=0,world=[.115,3.125,5.13],observed=[803,165],components=[1],sigma=[10,10],kind='ceiling'),
             dict(label='Window clear head',view=3,world=[x,y,warp(hi[2])],observed=[635,230],components=[1],sigma=[10,15],kind='window'),
             dict(label='Window clear sill',view=3,world=[x,y,warp(lo[2])],observed=[635,550],components=[1],sigma=[10,15],kind='window')]
def residual(p):
    out=[]
    for c in controls:
        xyz=c['world'].copy()
        if c['kind']=='ceiling':xyz[2]=p[4]-.12
        err=project(p,xyz,c['view'])-c['observed']
        out.extend(err[i]/c['sigma'][i] for i in c['components'])
    return out
fit=least_squares(residual,[*base,5.25],bounds=([2.3,1.2,3.9,base[3]-.1,5.1],[3.1,2.1,4.7,base[3]+.1,5.95]),loss='linear').x
window_z=float(least_squares(lambda z:[project([base[0],base[1],z[0],base[3]],(x,y,warp(hi[2])),3)[1]-230,project([base[0],base[1],z[0],base[3]],(x,y,warp(lo[2])),3)[1]-550],[4.55]).x[0])
cases=[('combined_fixed',np.array([*base,5.25])),
       ('combined_window_fit',np.array([base[0],base[1],window_z,base[3],5.25+window_z-base[2]])),
       ('combined_joint_fit',fit)]
for name,p in cases:
    errors=[]
    for c in controls:
        xyz=c['world'].copy()
        if c['kind']=='ceiling':xyz[2]=p[4]-.12
        pred=project(p,xyz,c['view'])
        errors.append(dict(label=c['label'],view=c['view'],components=c['components'],source_pixel=c['observed'],render_pixel=pred.tolist(),error_px=(pred-c['observed']).tolist()))
    variant=dict(label=name,ceiling_above_floor_m=p[4]-2.8,camera_above_floor_m=p[2]-2.8,window='B_height_C_head',camera_xyz=p[:3].tolist(),camera_yaw=float(p[3]),controls=errors)
    r['variants']=[v for v in r['variants'] if v['label']!=name]+[variant]
r['combined_window']={'sill_world_m':3.92,'head_world_m':5,'height_m':1.08,
 'source':'User says approximately B height, external alignment resembling C, internal appearance between B/C; qualitative dimensions, not a measurement.',
 'joint_fit_policy':'Fit camera XYZ/yaw and flat ceiling jointly to prior physical jamb/corner/window-mullion bearings, physical doorway head/foot observations, west ceiling corners and shortened-window vertical edges. No furniture heights. Fixed floor datum 2.8 and current door/window geometries remain estimates.',
 'joint_pose_xyz_yaw_ceiling_world':fit.tolist(),'window_only_camera_z_m':window_z}
(OUT/'ceiling-audit.json').write_text(json.dumps(r,indent=2))
print(json.dumps(r['combined_window'],indent=2))
for v in r['variants'][-3:]:
 print(v['label'],'ceiling',v['ceiling_above_floor_m'],'cam',v['camera_xyz'])
 for c in v['controls']:
  if c['components']==[1]:print(c['label'],round(c['error_px'][1],1))
