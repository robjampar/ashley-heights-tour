"""Fit only the Gates panorama pose; --install updates its four entries safely."""
import argparse
import json
import math
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'photo-review/gate-pose-final';OUT.mkdir(exist_ok=True)
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text());site=g['site']
original_views=json.loads((ROOT/'photo-review/views.json').read_text())
gates=[v for v in original_views if v['id']==2445684]
focal=480/math.tan(math.radians(gates[0]['horizontal_fov']/2))
south,north=np.array(site['gate_endpoints_m']);along=(north-south)/np.linalg.norm(north-south)
south_hinge=south+along*.31;north_hinge=north-along*.31
def item(label,pixel,world,components=(0,),sigma=(8,16),view=0):
    return dict(label=label,view=view,source_pixel=list(pixel),world_m=list(world),components=list(components),sigma_px=list(sigma))
landmarks=[
 item('Fountain centre bearing',(507,360),[*site['fountain_center_m'],1.4],sigma=(5,16)),
 item('Front gable apex bearing',(156,160),(6.94,-.435,6.83)),
 item('Left narrow frontage window',(113,236),(5.50,-.445,4.2)),
 item('Right narrow frontage window',(182,250),(8.38,-.445,4.2)),
 item('Bedroom 2 front window centre',(255,267),(11.722857,-.155,4.2)),
 item('Main frontage east corner',(301,310),(14.095,-.115,2.8)),
 item('North gate hinge at bottom rail',(30,635),[*north_hinge,.18],(0,1),(18,16)),
 item('South gate hinge at bottom rail',(890,620),[*south_hinge,.18],(0,1),(18,16)),
 item('Fountain finial top',(507,326),[*site['fountain_center_m'],2.24],(1,),(12,12)),
]
def project(pose,point,view=0):
    yaw=pose[3]-view*math.pi/2;d=np.array(point)-pose[:3]
    depth=d@np.array([math.cos(yaw),math.sin(yaw),0])
    return np.array([480+focal*(d@np.array([math.sin(yaw),-math.cos(yaw),0]))/depth,360-focal*d[2]/depth])
def residuals(pose):
    return [(project(pose,l['world_m'],l['view'])[c]-l['source_pixel'][c])/l['sigma_px'][c]
            for l in landmarks for c in l['components']]
fit=least_squares(residuals,[-4.34,-16.18,1.44,.3817],bounds=([-8,-19,1,-.2],[-3,-13,1.9,1]),loss='soft_l1')
pose=fit.x
for l in landmarks:
    l['predicted_pixel']=project(pose,l['world_m'],l['view']).tolist()
    l['residual_px']=(np.array(l['predicted_pixel'])-l['source_pixel']).tolist()
held_out=[
 item('South return outer endpoint (pier not modelled)',(370,410),(-2.7399466,-17.9491158,1.4),view=1),
 item('North return outer endpoint (pier not modelled)',(565,410),(-4.6858392,-13.7453451,1.4),view=3),
 item('Front gable apex height',(156,160),(6.94,-.435,6.83),(1,)),
 item('Bedroom 2 front window sill height',(255,282),(11.722857,-.155,3.55),(1,)),
]
for l in held_out:
    l['predicted_pixel']=project(pose,l['world_m'],l['view']).tolist()
    l['residual_px']=(np.array(l['predicted_pixel'])-l['source_pixel']).tolist()
yaw_override=float(pose[3]+gates[0]['longitude']+math.pi/2)
basis='Estimated gate camera fitted to source 2445684-0 gate hinges, fountain and frontage bearings; 86-degree FOV retained. Site levels/outer returns and neighbouring street remain approximate.'
proposed=[]
for v in gates:
    yaw=pose[3]-v['view']*math.pi/2
    proposed.append(dict(key=v['key'],position=pose[:3].tolist(),direction=[math.cos(yaw),math.sin(yaw),0]))
horizontal=[l['residual_px'][0] for l in landmarks if 0 in l['components']]
report=dict(position_m=pose[:3].tolist(),view0_cartesian_yaw_rad=float(pose[3]),override_yaw=yaw_override,
            status='Estimated, not exact calibration',basis=basis,landmarks=landmarks,
            horizontal_rms_px=float(np.sqrt(np.mean(np.square(horizontal)))),held_out_estimated_residuals=held_out,
            proposed_views=proposed,
            limits='Only view 0 has modelled correspondences suitable for fitting. Views 1/3 are qualitative side-return checks; their ornamental outer piers are absent from current geometry. View 2 looks into an unmodelled street and has no quantitative control. Vertical discrepancies may reflect estimated geometry/site levels; no geometry, FOV, source projections, pitch or roll changed.')
(OUT/'pose-fit.json').write_text(json.dumps(report,indent=2))
im=Image.open(ROOT/'photo-review/originals/2445684-0.jpg').convert('RGB');draw=ImageDraw.Draw(im)
for l in landmarks:
    x,y=l['source_pixel'];px,py=l['predicted_pixel']
    draw.ellipse((x-4,y-4,x+4,y+4),outline='yellow',width=2)
    if 0 in l['components']:draw.line((px,y-18,px,y+18),fill='cyan',width=2)
    if 1 in l['components']:draw.line((x-18,py,x+18,py),fill='cyan',width=2)
draw.rectangle((0,0,960,23),fill='black');draw.text((8,6),'Unmodified source projection + analysis marks: yellow source; cyan model fit. Furniture/geometry not changed.',fill='white')
im.save(OUT/'source-landmarks.png')
if argparse.ArgumentParser().parse_known_args()[1]==['--install']:
    # Reload both complete documents at the last moment. Only matching records
    # are changed; unrelated concurrent pose corrections are retained.
    path=ROOT/'photo-review/views.json';views=json.loads(path.read_text())
    before_other=[v for v in views if v['id']!=2445684]
    changes={v['key']:v for v in proposed}
    for v in views:
        if v['id']==2445684:
            v.update(changes[v['key']]);v['pose_basis']=basis
    assert [v for v in views if v['id']!=2445684]==before_other
    path.write_text(json.dumps(views,indent=2))
    path=ROOT/'photo-review/pose-overrides.json';overrides=json.loads(path.read_text())
    overrides['2445684']={'position':pose[:3].tolist(),'yaw':yaw_override,'basis':basis,
                         'estimated_horizontal_rms_px':report['horizontal_rms_px'],
                         'residual_report':'gate-pose-final/pose-fit.json'}
    path.write_text(json.dumps(overrides,indent=2))
    print('Installed only Gates pose entries')
print(json.dumps({k:report[k] for k in ['position_m','view0_cartesian_yaw_rad','horizontal_rms_px']},indent=2))
