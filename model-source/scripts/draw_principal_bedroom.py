"""Measured room plan and explicit circulation checks for bedroom revision 02."""
from pathlib import Path
import json, math
from shapely.geometry import Polygon, box, LineString, Point
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[1];cfg=json.loads((ROOT/'proposal/interiors/principal/bedroom.json').read_text());out=ROOT/'revisions/interiors-principal-2026-09-26/bedroom'
room=Polygon(cfg['bedroom_polygon']);alcove=Polygon(cfg['alcove_polygon']);reserved=Polygon(cfg['reserved_polygon'])
# Only the central strip of the vault is part of standing circulation.
walkable=unary_union([room,box(4.07,-13.49,5.17,-12.39)])
rects={'bed':[10.13,-15.926,12.17,-13.846],'left bedside':[9.475,-15.895,10.085,-15.385],'right bedside':[12.215,-15.895,12.825,-15.385],'bench':[10.325,-13.36,11.975,-12.94],'sofa':[5.83,-11.625,8.13,-10.675],'coffee table':[6.43,-10.275,7.53,-9.775],'sofa media':[5.58,-9.24,8.38,-8.83],'bed media':[9.95,-10.76,12.35,-10.35],'desk':cfg['desk']['bounds'],'occupied desk':cfg['desk']['chair_operation'],'side table':[5.24,-11.54,5.68,-11.10],'floor lamp':[5.34,-10.91,5.64,-10.61],'planter':[13.009,-12.910,13.740,-12.168],'east curtains lower':[13.55,-15.72,13.67,-15.42],'east curtains upper':[13.55,-13.79,13.67,-13.49]}
# Main shared routes deliberately omit the locally narrower retained doorway.
routes={
 'main spine':([[9.10,-10.50],[9.10,-12.1],[8.6,-13.05],[8.6,-14.75]],1.2),
 'bed left':([[9.10,-12.1],[9.40,-13.85],[9.40,-14.75]],1.0),
 'bed right':([[9.1,-12.05],[12.495,-12.05],[12.495,-13.4],[12.8,-13.75],[12.8,-14.75]],1.0),
 'desk approach with chair occupied':([[8.6,-13.1],[7.6,-13.3],[7.6,-14.96]],1.0),
 'vault window seat approach':([[8.6,-12.94],[4.65,-12.94]],1.0),
 'sofa east approach':([[9.1,-10.5],[8.63,-10.50]],.9)
}
checks=[]
for name,(points,width)in routes.items():
 area=LineString(points).buffer(width/2,cap_style=2,join_style=2)
 hits=[n for n,r in rects.items()if area.intersection(box(*r)).area>1e-6]
 outside=area.difference(walkable).area
 checks.append({'route':name,'width_m':width,'points':points,'obstructions':hits,'outside_walkable_m2':round(outside,6),'pass':not hits and outside<1e-5})
# Door sweep clear of furnishings. Retained 950 mm structural opening is not
# represented as a 1200 mm accessible door. Leaf thickness reduces clear width.
hinge=cfg['entry']['hinge'];r=.95
sweep=Polygon([hinge]+[(hinge[0]+r*math.cos(-math.pi/2*i/90),hinge[1]+r*math.sin(-math.pi/2*i/90))for i in range(91)])
entryhits=[n for n,b in rects.items()if sweep.intersection(box(*b)).area>1e-6]
assert not entryhits,entryhits
assert abs((-15.926-.11-.04)-cfg['bed']['headboard_wall_y'])<1e-8
for c in checks:assert c['pass'],c
report={'revision':2,'status':'PASS','routes':checks,'entry':{'opening_m':.95,'estimated_clear_at_90_deg_m':.928,'furniture_hits':entryhits},'bed':{'headboard_contacts_wall_through_panel':True,'mattress_m':[1.8,2.0],'frame_m':[2.04,2.08],'bedside_width_m':.6,'east_access_below_bedside_to_curtains_m':1.38,'main_foot_route_m':1.2,'bench_gap_to_bed_m':.486},'seating':{'coffee_table_gap_m':.4,'sofa_width_m':2.3,'fixed_screens':2},'desk':{'top_m':[1.8,.7],'chair_operation_depth_m':.9,'separate_passing_route_m':1.0},'reserved_north_wing_m2':round(reserved.area,2),'limitations':['Clearances derive from the current design model, not a measured site survey','Detailed dressing and ensuite fit remains unresolved','Native ray tests are reported separately for each variant']}
(out/'measurements.json').write_text(json.dumps(report,indent=2)+'\n')
# A simple architectural drawing in the same coordinate system as the native model.
S=66;OX=40;OY=106;X=lambda x:OX+(x-3)*S;Y=lambda y:OY+(-2.65-y)*S
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1100" viewBox="0 0 1200 1100"><title>Principal bedroom — south wall arrangement</title><rect width="1200" height="1100" fill="#f7f4ed"/><style>text{font-family:Arial,sans-serif;fill:#343c34}.small{font-size:13px}.label{font-size:15px;font-weight:600}</style>']
def poly(points,fill,stroke='#6e736b',width=2,dash=''):
 svg.append(f'<polygon points="'+ ' '.join(f'{X(x):.1f},{Y(y):.1f}'for x,y in points)+f'" fill="{fill}" stroke="{stroke}" stroke-width="{width}"'+(f' stroke-dasharray="{dash}"'if dash else'')+'/>')
def rect(r,fill,stroke='#9c9586',radius=0):
 x0,y0,x1,y1=r;svg.append(f'<rect x="{X(x0):.1f}" y="{Y(y1):.1f}" width="{(x1-x0)*S:.1f}" height="{(y1-y0)*S:.1f}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>')
def line(points,color='#486c61',width=2,dash=''):
 svg.append('<polyline points="'+' '.join(f'{X(x):.1f},{Y(y):.1f}'for x,y in points)+f'" fill="none" stroke="{color}" stroke-width="{width}"'+(f' stroke-dasharray="{dash}"'if dash else'')+'/>')
def txt(x,y,t,cls='small',anchor='middle'):
 svg.append(f'<text x="{X(x):.1f}" y="{Y(y):.1f}" class="{cls}" text-anchor="{anchor}">{t}</text>')
svg+=['<text x="64" y="49" font-size="27" font-weight="600">Principal bedroom · South wall</text><text x="64" y="77" font-size="14">Room development 02 · Existing openings · Two fixed screens · Both proposals</text>']
poly(reserved.exterior.coords,'#e5e7de','#9ba194',1.5,'6 4');poly(room.exterior.coords,'#eee5d4','#535c52',5);poly(alcove.exterior.coords,'#e3dbcd','#535c52',3)
rect([3.49,-15.86,5.16,-13.54],'#d0c9bc');rect([3.49,-12.34,5.16,-10.02],'#d0c9bc');rect([3.54,-13.59,4.06,-12.29],'#b9b7a5',radius=4)
rect([9.4,-15.90,12.9,-12.72],'#d7cebc');rect([5.39,-11.83,8.49,-9.21],'#ddd6c9')
for name,r in rects.items():
 if name in('occupied desk','east curtains lower','east curtains upper'):continue
 rect(r,'#f7f3e9'if name in('bed','sofa','bench')else'#c5ac88',radius=4 if name in('bed','sofa','coffee table')else 1)
rect([10.25,-15.7,11.07,-15.25],'#fffdf6',radius=6);rect([11.23,-15.7,12.05,-15.25],'#fffdf6',radius=6)
rect([10.20,-14.39,12.10,-13.99],'#aaa08c');rect([9.34,-16.076,12.96,-16.036],'#9e7955');rect([10.09,-16.036,12.21,-15.926],'#b8aa94')
rect([6.48,-15.24,7.02,-14.68],'#f7f3e9',radius=6)
line([[9.90,-10.26],[13.75,-10.26]],'#535c52',7);line([[9.90,-10.26],[9.90,-9.975]],'#535c52',7);line([[9.90,-9.025],[9.90,-8.76]],'#535c52',7)
line([[8.47,-8.76],[9.42,-8.76]],'#f7f4ed',8);line([[8.47,-8.7],[8.47,-9.65]],'#976e49',3);line([[9.9,-9.975],[10.85,-9.975]],'#976e49',3)
for a,b in[([6.345,-16.076],[8.145,-16.076]),([13.75,-15.325],[13.75,-13.875]),([13.75,-12.12],[13.75,-10.52]),([13.75,-8.89],[13.75,-7.09]),([10.705,-3.259],[11.705,-3.259]),([12.185,-3.259],[13.185,-3.259]),([3.49,-13.59],[3.49,-12.29])]:line([a,b],'#9cbed0',6)
for tv in cfg['tvs']:
 x,y=tv['center'];w=tv['screen_m'][0];line([[x-w/2,y],[x+w/2,y]],'#202c2a',5)
for name in('main spine','bed right','desk approach with chair occupied','vault window seat approach'):
 line(routes[name][0],'#4a796b',2,'6 5')
txt(11.85,-5.1,'DRESSING + ENSUITE','label');txt(11.85,-5.5,f'{reserved.area:.1f} m² reserved');txt(11.85,-5.9,'Detailed fit is the next step');txt(11.85,-6.3,'Bathroom services unresolved')
txt(8.94,-8.30,'ENTRY');txt(6.98,-11.25,'SOFA','label');txt(11.15,-14.91,'1.8 × 2 m','label');txt(11.15,-12.43,'CLEAR FOOT ROUTE');txt(7.70,-14.84,'DESK');txt(4.31,-11.55,'LOW VAULT');txt(4.31,-14.5,'LOW VAULT')
# Side notes, away from the room drawing.
notes=[('01  A real headboard wall','Existing solid south wall.','Two 600 mm bedsides and reading lights.'),('02  Straight-ahead viewing','85-inch bed TV; 55-inch sofa TV.','Both fixed. No rotating mechanism.'),('03  Two complete furniture groups','2.3 m sofa, coffee table and side table.','400 mm sofa-to-table reach gap.'),('04  Room to move','1.2 m central route after the entrance.','1 m checked side and desk routes.'),('05  Desk beside daylight','1.8 × 0.7 m top; 900 mm chair space.','Separate passing route behind chair.'),('06  Keep the shell','Retain windows, entrance and vault.','Old bathroom moves to the north wing.')]
for i,(title,a,b)in enumerate(notes):
 yy=190+i*122;svg.append(f'<text x="825" y="{yy}" font-size="16" font-weight="600">{title}</text><text x="825" y="{yy+27}" font-size="13">{a}</text><text x="825" y="{yy+48}" font-size="13">{b}</text>')
svg.append('<text x="64" y="1037" font-size="13">Model-based dimensions · 950 mm nominal entry opening · Native eye-level views accompany this plan</text>')
line([[3.5,-17.10],[5.5,-17.10]],'#343c34',3);txt(4.5,-17.43,'2 metres')
svg.append('</svg>');(ROOT/'walkthrough/public/interiors/principal/bedroom-plan.svg').write_text('\n'.join(svg))
print('PASS',len(checks),'width-aware routes; clear entry sweep; headboard backing; measured SVG')
