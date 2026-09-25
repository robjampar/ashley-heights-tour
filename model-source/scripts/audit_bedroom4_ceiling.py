"""Read-only ceiling/camera ambiguity and current roof-section audit."""
import json,math,sys,copy
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from audit_roof_joins import Solid
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'photo-review/bedroom4-ceiling-audit';OUT.mkdir(exist_ok=True)
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text())
views={v['view']:v for v in json.loads((ROOT/'photo-review/views.json').read_text()) if v['id']==2445676}
cam=np.array(views[0]['position']);yaw=math.atan2(*views[0]['direction'][1::-1]);f=480/math.tan(math.radians(43))
def project(world,view,z=cam[2]):
    centre=cam.copy();centre[2]=z;angle=yaw-view*math.pi/2;d=np.array(world)-centre
    depth=d@np.array([math.cos(angle),math.sin(angle),0])
    return [480+f*(d@np.array([math.sin(angle),-math.cos(angle),0]))/depth,360-f*d[2]/depth]
glass=next(o for o in g['objects'] if o['object_name']=='First front clear glass.004')
vv=np.array(glass['vertices']);lo=vv.min(axis=0);hi=vv.max(axis=0);x=(lo[0]+hi[0])/2;y=hi[1]
def glass_c(z):return 3.84+(z-3.55)*(5-3.84)/(5-3.55)
c_low,c_high=glass_c(lo[2]),glass_c(hi[2])
z_c=float(least_squares(lambda z:[project((x,y,c_high),3,z[0])[1]-230,project((x,y,c_low),3,z[0])[1]-550],[cam[2]+.32]).x[0])
delta=z_c-cam[2];raised=5.25+delta
controls=[
 {'label':'West SW cornice lower edge','view':0,'world':(.115,.115,5.13),'observed_y':177,'kind':'ceiling'},
 {'label':'West NW cornice lower edge','view':0,'world':(.115,3.125,5.13),'observed_y':165,'kind':'ceiling'},
 {'label':'Window clear head','view':3,'world':(x,y,hi[2]),'observed_y':230,'kind':'window_head'},
 {'label':'Window clear sill','view':3,'world':(x,y,lo[2]),'observed_y':550,'kind':'window_sill'}]
old_fit=json.loads((ROOT/'photo-review/pose-audit-bedroom4/proposed-pose.json').read_text())
for l in old_fit['landmarks']:
    if l['components']==[1]:controls.append(dict(label=l['label'],view=l['view'],world=l['world_m'],observed_y=l['pixel'][1],kind='door'))
variants=[('current',0,0,'A'),('raised_fixed',delta,0,'A'),('raised_camera_A',delta,delta,'A'),('raised_camera_C',delta,delta,'C')]
rows=[]
for label,dh,dz,win in variants:
    values=[]
    for l in controls:
        p=list(l['world'])
        if l['kind']=='ceiling':p[2]+=dh
        if l['kind'].startswith('window') and win=='C':p[2]=glass_c(p[2])
        predicted=project(p,l['view'],cam[2]+dz)[1]
        values.append(dict(label=l['label'],view=l['view'],source_y=l['observed_y'],render_y=predicted,error_px=predicted-l['observed_y']))
    rows.append(dict(label=label,ceiling_above_floor_m=2.45+dh,camera_above_floor_m=cam[2]+dz-2.8,window=win,controls=values))
roof=next(o for o in g['objects'] if o['object_name']=='Main hipped roof');hyp=copy.deepcopy(roof)
# Concrete feasibility illustration only: retain ridge/eave heights but extend
# front and west roof bounds to 0.60 m beyond ordinary brick faces. No new room slope.
for v in hyp['vertices']:
    if v[0]<0:v[0]-=.445
    if v[1]<0:v[1]-=.435
actual=Solid(roof);extended=Solid(hyp)
samples=[]
for label,point in [('front inner wall',(2.25,.115)),('west inner wall',(.115,1.6)),('room centre',(2.25,1.6))]:
    samples.append(dict(label=label,xy=list(point),actual_roof_underside_m=min(actual.vertical_hits(np.array(point))),
                        extended_roof_underside_m=min(extended.vertical_hits(np.array(point))),raised_ceiling_m=raised))
fig,axes=plt.subplots(1,2,figsize=(13,5),constrained_layout=True)
for ax,coordinate,fixed,limit,title in [(axes[0],1,2.25,4.1,'Front-to-back section at window centre X=2.25 m'),(axes[1],0,1.6,4.6,'West-to-east section through camera Y=1.60 m')]:
    ts=np.linspace(-.75,limit,500)
    for solid,color,ls,label in [(actual,'#5b6265','-','Current roof underside'),(extended,'#008d96','--','Hypothesis: 0.60 m front/west projection')]:
        ys=[]
        for t in ts:
            hits=solid.vertical_hits(np.array([fixed,t] if coordinate==1 else [t,fixed]));ys.append(min(hits) if hits else np.nan)
        ax.plot(ts,ys,color=color,ls=ls,label=label)
    ax.hlines(5.25,.115,3.125 if coordinate==1 else 4.215,color='#306bb5',linewidth=2,label='Current flat ceiling 2.45 m')
    ax.hlines(raised,.115,3.125 if coordinate==1 else 4.215,color='#bb6131',linewidth=2,label=f'Raised flat ceiling {raised-2.8:.2f} m')
    ax.axvspan(-.115,.115,color='#ae775e',alpha=.25);ax.axhline(5.35,color='#ae775e',ls=':',label='Current brick/eave height')
    if coordinate==1:
        ax.plot([.115,.115],[3.55,5],'k',linewidth=3,label='Window A sill/head')
        ax.scatter([cam[1],cam[1]],[cam[2],z_c],c=['#306bb5','#bb6131'],s=35)
    ax.set(xlim=(-.75,limit),ylim=(3.3,8.1),xlabel='Distance from wall centreline (m)',ylabel='World height (m)',title=title);ax.grid(alpha=.2)
axes[1].legend(loc='upper left',fontsize=8)
fig.suptitle('Bedroom 4 — actual model sections and a roof-projection hypothesis (all vertical dimensions estimated)',fontsize=13)
fig.savefig(OUT/'Roof and ceiling sections.png',dpi=180);fig.savefig(OUT/'Roof and ceiling sections.pdf');plt.close(fig)
report=dict(original_camera=cam.tolist(),coupled_camera_z_m=z_c,delta_m=delta,raised_ceiling_world_m=raised,
            source_flat_ceiling=True,variants=rows,roof_sections=samples,
            roof_hypothesis={'front_overhang_m':.60,'west_overhang_m':.60,'ridge_and_eave_heights_unchanged':True,'ceiling_board_thickness_m':.02},
            controls_note='Door verticals use the previous manually identified physical jamb head/foot, with estimated frame dimensions; furniture is excluded. Cornice lower edges measured from source corners assume the model 120 mm drop. These constrain relative camera/ceiling height, not an independently surveyed height datum.',
            ambiguity='Raising camera and flat ceiling together leaves ceiling lines unchanged. Window C plus a roughly 0.3 m rise fits both window bounds better, but the unchanged door heads/feet then disagree. A shift of the entire upstairs floor datum would be a different hypothesis and would not establish a taller room. Source photos show no supported sloped room ceiling.',
            limitation='Current roof collisions constrain the current reconstruction only. The facade photo supports an overhang but cannot alone measure its depth. The 0.60 m alternative is a transparent feasibility test, not a confirmed roof measurement.')
(OUT/'ceiling-audit.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:report[k] for k in ['coupled_camera_z_m','delta_m','raised_ceiling_world_m','roof_sections']},indent=2))
