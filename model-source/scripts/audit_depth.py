"""Independent GLB-to-native depth checks and an annotated source-plan comparison."""
from pathlib import Path
import hashlib, json, math, struct, sys
import numpy as np
from scipy.spatial.transform import Rotation
from shapely.geometry import Polygon, MultiPoint
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch
from matplotlib.backends.backend_pdf import PdfPages
from PIL import Image
from area_geometry import internal_envelope

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough'
g=json.loads((OUT/'geometry.json').read_text())
raw=(OUT/'Ashley Heights.glb').read_bytes();jlen=struct.unpack_from('<I',raw,12)[0]
gl=json.loads(raw[20:20+jlen]);bin_start=28+jlen;binary=raw[bin_start:]
parents={c:i for i,n in enumerate(gl['nodes']) for c in n.get('children',[])}
matrices={}
def matrix(i):
    if i in matrices:return matrices[i]
    n=gl['nodes'][i]
    if 'matrix' in n:m=np.array(n['matrix']).reshape((4,4),order='F')
    else:
        m=np.eye(4);m[:3,:3]=Rotation.from_quat(n.get('rotation',[0,0,0,1])).as_matrix()@np.diag(n.get('scale',[1,1,1]));m[:3,3]=n.get('translation',[0,0,0])
    if i in parents:m=matrix(parents[i])@m
    matrices[i]=m;return m
def positions(accessor):
    a=gl['accessors'][accessor];v=gl['bufferViews'][a['bufferView']]
    assert a['componentType']==5126 and a['type']=='VEC3'
    return np.ndarray((a['count'],3),dtype='<f4',buffer=binary,offset=v.get('byteOffset',0)+a.get('byteOffset',0),strides=(v.get('byteStride',12),4))
wall_names={o['object_name'] for o in g['objects'] if o['layer'].endswith('walls')}
exported={}
for i,n in enumerate(gl['nodes']):
    if n.get('name') not in wall_names or 'mesh' not in n:continue
    parts=[]
    for p in gl['meshes'][n['mesh']]['primitives']:
        v=positions(p['attributes']['POSITION']);v=np.c_[v,np.ones(len(v))]@matrix(i).T
        parts.append(np.c_[v[:,0],-v[:,2],v[:,1]]) # glTF Y-up to native Z-up
    exported[n['name']]=np.concatenate(parts)
def points(name,from_glb=False):
    obs=[o for o in g['objects']if o['layer'].endswith('walls') and (o['name']==name or o['name'].startswith(name+' |'))]
    assert obs,name
    return np.concatenate([exported[o['object_name']] if from_glb else np.array(o['vertices']) for o in obs])
def clear(a,b):return float(points(b)[:,1].min()-points(a)[:,1].max())
specs=[('Drawing room including front bay','Drawing bay 2','Drawing rear',8.92),
       ('Family room including front bay','Family bay 2','Kitchen family partition',4.13),
       ('Kitchen front to back','Kitchen family partition','Kitchen rear',4.63),
       ('Principal bedroom front to back','Principal bedroom 2','Principal rear',4.79),
       ('Bedroom 2 front to back','First front','Principal bedroom 2',3.64)]
checks=[]
for label,a,b,target in specs:
    native=clear(a,b);web=float(points(b,True)[:,1].min()-points(a,True)[:,1].max())
    assert abs(native-web)<1e-5,(label,native,web)
    checks.append(dict(span=label,plan_m=target,native_m=round(native,6),walkthrough_glb_m=round(web,6)))
extent=[o for o in g['objects']if o['layer']=='11 Ground floor - walls' and any(o['name'].startswith(w['name']+' |')for w in g['walls']if w['floor']==0 and w['external'])]
v=np.concatenate([o['vertices']for o in extent]);lo=v.min(axis=0);hi=v.max(axis=0)
depths={'main_rectangular_body_external_m':round(float(points('Drawing rear')[:,1].max()-points('Garage front')[:,1].min()),4),
        'drawing_bay_to_rear_external_m':round(float(points('Drawing rear')[:,1].max()-points('Drawing bay 2')[:,1].min()),4),
        'overall_front_bay_to_dining_rear_external_m':round(float(hi[1]-lo[1]),4),
        'overall_width_including_garage_external_m':round(float(hi[0]-lo[0]),4)}
areas=json.loads((OUT/'dimension-audit.json').read_text())['area_checks']
hashes={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest()for p in ['output-walkthrough/Ashley Heights.glb','walkthrough/public/house.glb','walkthrough/dist/house.glb']}
assert len(set(hashes.values()))==1,'The live viewer has an outdated GLB'
report={'revision':'R5','spans':checks,'whole_house':depths,'areas':areas,'glb_sha256':hashes,
        'conclusion':f"No front-to-back scale loss in the GLB export. Overall depth is inferred because the source gives no overall building dimension. Model scope shown on the estate-agent plan is {areas[-1]['difference_m2']:.3f} m² above its approximate 290 m² and remains unreconciled. Owner-selected rear bay B reduces dining and balcony depths by 300 mm; the side annex is accounted separately.",
        'calculation_correction':'Previous room-union area undercounted the upstairs stair opening. Supersedes the prior 290.226 m² total.'}
if (OUT/'site-registration.json').exists():
    reg=json.loads((OUT/'site-registration.json').read_text())
    report['new_site_plan_check']={k:reg[k]for k in ['house_depth_from_map_width_ratio_m','model_main_body_depth_m','corner_rms_m','method']}
(OUT/'depth-audit.json').write_text(json.dumps(report,indent=2))

ink='#263d34';accent='#087f8c';warn='#a4492a'
plt.rcParams.update({'font.size':10,'font.family':'DejaVu Sans'})
source=Image.open(ROOT/'source/floorplan.png');source.thumbnail((2048,1000))
with PdfPages(OUT/'Depth and area review.pdf') as pdf:
    fig=plt.figure(figsize=(16.54,11.69),facecolor='white')
    fig.text(.055,.94,'ASHLEY HEIGHTS — DEPTH AND AREA REVIEW',fontsize=22,color=ink,weight='bold')
    fig.text(.055,.90,'Printed dimensions checked independently in the actual walkthrough GLB. Overall area is not fully reconciled.',fontsize=12)
    data=[[a['floor'],f"{a['published_approximate_m2']} m² / {a['published_approximate_sqft']:,} sq ft",f"{a['model_internal_envelope_m2']:.2f} m² / {a['model_sqft']:,.0f} sq ft",f"{a['difference_m2']:+.2f} m²"]for a in areas]
    ax=fig.add_axes([.055,.61,.89,.22]);ax.axis('off');t=ax.table(cellText=data,colLabels=['Area','Source plan (approx.)','Model internal envelope','Difference'],loc='center',cellLoc='left',colWidths=[.22,.29,.32,.17]);t.auto_set_font_size(False);t.set_fontsize(12);t.scale(1,2.1)
    fig.text(.055,.57,'Corrected audit: the previous 290.226 m² result wrongly excluded the upstairs stairwell.',color=warn,fontsize=12,weight='bold')
    fig.text(.055,.535,'The new calculation closes the exterior perimeter, uses actual inner wall faces, and includes the stairs and partitions.\nThe balcony is excluded. Detached outbuildings are added separately to match the source-plan total.',fontsize=11)
    if g.get('side_annex'):
        fig.text(.055,.495,f"Additional owner-described side annex: approximately {g['side_annex']['clear_internal_area_m2']:.2f} m² internally; absent from the source plan and excluded above.",fontsize=10,color=warn)
    lines=['Main rectangular body: 9.05 m external depth; front bay to the ordinary rear wall: 9.38 m.',
           f"Farthest front bay to the dining-room rear: {depths['overall_front_bay_to_dining_rear_external_m']:.2f} m external depth (selected B).",
           'These whole-building figures are model-derived; the source plan does not label an overall depth.',
           'The drawing-room front-to-back span is 8.92 m in the source, native meshes and browser GLB.',
           'Family room 4.13 m + kitchen 4.63 m + their 0.16 m partition = the same 8.92 m clear chain.',
           'Principal bedroom 4.79 m + bedroom 2 3.64 m + 0.16 m partition = 8.59 m internal upstairs depth.']
    for i,line in enumerate(lines):fig.text(.055,.465-i*.045,line,fontsize=12,color=ink)
    fig.text(.055,.13,'No uniform depth stretch applied. Owner-selected B changes dining depth 5.20 → 4.90 m\nand balcony depth 2.60 → 2.30 m. The other 32 printed room spans remain matched.',fontsize=12,color=warn)
    fig.text(.055,.065,'New site-plan aspect ratio: about 9.30 m main-body depth versus 9.05 m in the model. This discrepancy remains unresolved.\nRoom spans, approximate floor area and the unscaled map crop do not uniquely determine a surveyed building.',fontsize=10)
    pdf.savefig(fig);fig.savefig(OUT/'Depth and area summary.png',dpi=150);plt.close(fig)
    for floor,title,crop in [(0,'GROUND FLOOR',(38,70,956,615)),(1,'FIRST FLOOR',(970,75,1635,598))]:
        fig=plt.figure(figsize=(16.54,11.69),facecolor='white');fig.suptitle(title+' — SOURCE ABOVE, MODEL BELOW',fontsize=18,y=.97,color=ink)
        a=fig.add_axes([.07,.55,.86,.37]);a.imshow(source);a.set_xlim(crop[0],crop[2]);a.set_ylim(crop[3],crop[1]);a.axis('off')
        a.set_title('Original plan: no redrawing, no independent X/Y stretching',fontsize=11)
        ax=fig.add_axes([.07,.09,.86,.39]);ax.set_aspect('equal');ax.set_facecolor('#fafbf9')
        env=internal_envelope(g,floor);ax.add_patch(Patch(env.exterior.coords,facecolor='#e0ece6',edgecolor=accent,lw=1.8))
        for r in g['rooms']:
            if r['floor']!=floor:continue
            poly=Polygon(r['polygon_m']);ax.add_patch(Patch(r['polygon_m'],fill=False,edgecolor='#9ca9a1',lw=.65))
            p=poly.representative_point();name=r['name'].replace(' breakfast room','').replace(' en suite','\nen suite').replace(' bedroom','\nbedroom')
            ax.text(p.x,p.y,name,fontsize=7,ha='center',va='center')
        for o in g['objects']:
            if o['layer']!=('11 Ground floor - walls'if floor==0 else'21 First floor - walls'):continue
            # Horizontal section through actual wall meshes, not a projection of
            # lintels and the upper-floor slab band onto the ground-floor plan.
            z=floor*2.8+1.2;section=[]
            for face in o['faces']:
                for ia,ib in zip(face,face[1:]+face[:1]):
                    a,b=o['vertices'][ia],o['vertices'][ib]
                    if (a[2]-z)*(b[2]-z)<0:
                        t=(z-a[2])/(b[2]-a[2]);section.append((a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])))
            if len(section)<3:continue
            p=MultiPoint(section).convex_hull
            if p.geom_type=='Polygon':ax.add_patch(Patch(p.exterior.coords,fc=ink,lw=0))
        def arrow(x,y1,y2,label):
            ax.annotate('',(x,y1),(x,y2),arrowprops={'arrowstyle':'<->','color':warn,'lw':1.5});ax.text(x+.10,(y1+y2)/2,label,rotation=90,va='center',fontsize=9,color=warn,bbox={'facecolor':'white','alpha':.9,'edgecolor':'none','pad':1})
        if floor==0:
            arrow(11.4,-.215,8.705,'8.92 m drawing room')
            arrow(1.0,-.215,3.915,'4.13 m family')
            arrow(1.0,4.075,8.705,'4.63 m kitchen')
            arrow(15.2,float(lo[1]),float(hi[1]),f"{depths['overall_front_bay_to_dining_rear_external_m']:.2f} m overall external")
            ax.set_xlim(-5.8,16.0)
        else:
            arrow(11.6,.115,3.755,'3.64 m bedroom 2')
            arrow(11.6,3.915,8.705,'4.79 m principal')
            ax.set_xlim(-.6,15.0)
        ax.set_ylim(-.85,11.1);ax.set_xlabel('Metres — equal horizontal and vertical scale');ax.set_ylabel('Metres, front → rear');ax.grid(alpha=.15)
        fig.text(.07,.035,'Walls: actual mesh section 1.2 m above this floor. Blue-green outline: internal envelope including stairs. Arrows: assigned depth spans.',fontsize=10)
        pdf.savefig(fig);fig.savefig(OUT/(title.title()+' depth comparison.png'),dpi=160);plt.close(fig)
    if (OUT/'Site plan registration.png').exists():
        fig,ax=plt.subplots(figsize=(11.69,11.69));ax.imshow(Image.open(OUT/'Site plan registration.png'));ax.axis('off');fig.subplots_adjust(0,0,1,1);pdf.savefig(fig);plt.close(fig)
    # Preserve both opposing axial drawing-room photos beside literal model renders.
    for key in ['2445666-0','2445667-0','2445657-0','2445658-3']:
        fig,axes=plt.subplots(1,2,figsize=(16.54,8.5));fig.suptitle('FRONT-TO-BACK PHOTO CHECK — '+key,fontsize=18)
        for ax,path,label in zip(axes,[ROOT/'photo-review/originals'/f'{key}.jpg',ROOT/'photo-review/walkthrough'/f'{key}.png'],['Original tour photograph','Blender model — same 86° horizontal field of view']):
            ax.imshow(Image.open(path));ax.set_title(label);ax.axis('off')
        fig.text(.035,.055,'Camera positions are estimated from tour markers; the views provide a visual check, not an independent measured survey.\nFurniture and decorative details are simplified. Retain the printed depth unless better dimensional evidence supports a change.',fontsize=11)
        fig.subplots_adjust(left=.025,right=.975,top=.9,bottom=.12,wspace=.03);pdf.savefig(fig);plt.close(fig)
print(json.dumps(report,indent=2))
