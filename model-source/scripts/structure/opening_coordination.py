"""Reviewable opening-fit proposal at the retained finished floor datums."""
import argparse
import copy
import hashlib
import json
from pathlib import Path
import numpy as np
from scripts.audits.audit_opening_fit import audit
from scripts.structure.junctions import solid,triangles,cuboid,horizontal_layer
from scripts.structure.build_study import triangulate,footprint
from shapely.geometry import Polygon,box as plan_box
from shapely.ops import unary_union

ROOT=Path(__file__).resolve().parents[2]
REVISION='structural-opening-fit-2026-10-27'
PREFIX='Opening fit | '


def bounds(o):
    v=np.asarray(o['vertices']);return [v.min(0).tolist(),v.max(0).tolist()]


def proposal(geometry,members,navigation=None):
    objects={o['object_name']:o for o in geometry['objects'] if o['vertices']}
    floor=2.3961;upper=5.1315;head=floor-.02;upper_head=upper-.02
    ops={};boxes=[]
    def change(name,axis,lo=None,hi=None,kind='opening-head'):
        ob=objects[name];old=bounds(ob);new=copy.deepcopy(ops.get(name,{}).get('newBounds',old))
        if lo is not None:new[0][axis]=lo
        if hi is not None:new[1][axis]=hi
        if new[1][axis]<=new[0][axis]:raise ValueError('Inverted opening component: '+name)
        ops[name]={'objectName':name,'oldBounds':old,'newBounds':new,'kind':kind}
    def z(name,lo=None,hi=None,kind='opening-head'):change(name,2,lo,hi,kind)
    def move(name,delta,kind):
        old=bounds(objects[name]);z(name,old[0][2]+delta,old[1][2]+delta,kind)
    def regular(prefix,old_head,new_head):
        for name,o in objects.items():
            if not name.startswith(prefix):continue
            a,b=bounds(o)
            if 'glass' in name.lower():z(name,hi=b[2]+new_head-old_head,kind='opening-pane')
            elif 'mullion' in name.lower():z(name,hi=new_head,kind='opening-upright')
            elif 'horizontal fram' in name.lower() and a[2]>old_head-.1:move(name,new_head-old_head,'opening-head-rail')
    def box(name,lo,hi,material,kind='opaque-head-band'):
        boxes.append({'objectName':PREFIX+name,'bounds':[lo,hi],'material':material,'kind':kind})
    regular('Proposal | Courtyard edge passage fixed',2.6,head)
    regular('Proposal | Courtyard edge passage entry leaf',2.5,2.2)
    for name,o in objects.items():
        if not name.startswith('Proposal | Courtyard edge passage fanlight'):continue
        a,b=bounds(o)
        if 'glass' in name:z(name,2.245,head-.045,'fanlight-pane')
        elif 'mullion' in name:z(name,2.2,head,'fanlight-upright')
        elif 'horizontal frame' in name:
            low,high=(2.2075,2.2625) if a[2]<2.52 else (head-.0625,head-.0075)
            z(name,low,high,'fanlight-rail')
    regular('Proposal | Internal garden gallery glazing 1',2.6,head)
    regular('Proposal | Courtyard upper landing',5.3,upper_head)
    z('Proposal | Level loft | 055 Flush courtyard glass',hi=upper_head-.08,kind='opening-pane')
    for i in (57,58,59):z(f'Proposal | Level loft | {i:03d} Flush courtyard mullion',hi=upper_head,kind='opening-upright')
    z('Proposal | Level loft | 061 Flush courtyard horizontal frame',upper_head-.055,upper_head,'opening-head-rail')
    # The upper east glazing meets the underside of the accepted loft
    # projection. Its head strip stops at the ceiling, not through the joists.
    box('east upper gallery sealed head trim',[9.61,-2.555,upper_head],[9.7,-.585,upper],
        'Proposal | Bronze black frames','head-closure')
    # Non-bearing prep partition; glazing aligns with the already coordinated
    # transom. A thin independent finish closes to the ceiling; it is no beam.
    for end in ('west','east'):z(f'Prep kitchen | partition {end} pier',hi=floor,kind='nonbearing-partition-head')
    z('Prep kitchen | partition glazing head',head,floor,kind='nonbearing-partition-head')
    for name,o in objects.items():
        if name.startswith('Prep kitchen | partition bronze mullion'):z(name,hi=head-.028,kind='opening-upright')
        elif name.startswith('Prep kitchen | partition clear glazing'):z(name,hi=head-.024,kind='opening-pane')
        elif name=='Prep kitchen | partition bronze horizontal.001':z(name,head-.028,head,'opening-head-rail')
    # Gym internal windows: keep their sills and frame sections, lower the
    # complete head and its reveal rather than only clipping the uprights.
    for i,y in ((0,'-9.705'),(2,'-6.405')):
        regular(f'Proposal | Gym west partition window {i} ',2.4,head)
        for suffix in ('internal head','internal first jamb','internal second jamb'):
            name=f'Gym 01 | west window {y} {suffix}';a,b=bounds(objects[name])
            if suffix=='internal head':z(name,head-(b[2]-a[2]),head,kind='window-reveal')
            else:z(name,hi=head,kind='window-reveal')
    for name in ['Ensuite 01 | bathroom doorway header','Bedroom 02 | dressing doorway header',
                 'Terrace suites | west wing east plaster door head','Terrace suites | west ensuite door head']:
        z(name,hi=upper,kind='door-head-lining')
    # Resolve existing reveal misalignment at the gym courtyard pair. The
    # door glazing already fits the structural head; preserve its opening.
    for suffix in ('internal head','internal first jamb','internal second jamb'):
        name='Gym 01 | courtyard doors '+suffix;a,b=bounds(objects[name])
        if suffix=='internal head':z(name,2.34-(b[2]-a[2]),2.34,kind='door-head-lining')
        else:z(name,0,2.34,'door-jamb-lining')
    z('Gym 01 | courtyard doors internal sill',0,.002,'door-sill-lining')
    # Decorative stone reveal was above the window opening and inside its
    # lintel. Its lower face now meets the actual clear opening head.
    z('Ensuite 01 | bath window stone head',5.038,5.05,kind='window-reveal')
    # At the garden west return the original 230 mm envelope was narrower
    # than the new cavity masonry. Keep its outside face and north glass
    # plane, move only the room-side wall face and the fixed bay's west jamb.
    change('Proposal | Garden west return',0,hi=-4.6475,kind='cavity-wall-depth')
    change('Proposal | Garden west return',1,lo=8.935,kind='cavity-wall-depth')
    for name,o in objects.items():
        if name.startswith('Garden limestone | course '):
            a,b=bounds(o);change(name,0,a[0]+.1375,b[0]+.1375,'wall-finish-offset')
    west,east=-4.6235,-.7
    for name,o in objects.items():
        if not name.startswith('Proposal | Garden north glazing fixed left'):continue
        a,b=bounds(o)
        if 'mullion' in name:
            old_centre=(a[0]+b[0])/2;f=(old_centre+4.78)/4.08;c=west+f*(east-west)
            half=(b[0]-a[0])/2;change(name,0,c-half,c+half,'cavity-jamb-fit')
        else:change(name,0,lo=west,kind='cavity-jamb-fit')
    # Move the whole projector and its mount together beneath the new slab
    # ceiling. Lens/case/vents retain their relative positions and dimensions.
    projector_delta=-.4639-bounds(objects['Cinema 01 | projector mounting plate'])[1][2]
    for name in objects:
        if name.startswith('Cinema 01 | projector '):move(name,projector_delta,'ceiling-mounted-projector')
    by={e['id']:e for e in members['elements']}
    bronze='Proposal | Bronze black frames';ivory='Proposal | Limestone render'
    # Thin spandrel skins sit outside full steel flange envelopes. Returns
    # meet the glazing head below the structure; caps meet the floor edge.
    for label,beam,z0,z1,y0,y1,floor_edge,glass_edge in [
        ('west ground gallery','M-FR-1-036',head,2.8,-4.0,-.33,5.585,5.65),
        ('west upper gallery','M-FR-3-025',upper_head,5.55,-4.024,-.306,5.5,5.65)]:
        face=min(floor_edge,by[beam]['bounds'][0][0]-.02);outer=face-.018
        top=z1
        if label=='west upper gallery':
            # The current roof meets the outside face below loft FFL. End
            # the skin under its actual sloping rafter envelope, rather than
            # making a vertical cladding board run through the rafters.
            for r in members['elements']:
                if r['category']!='rafters' or not r.get('axis'):continue
                a,b=r['bounds']
                if b[1]<y0 or a[1]>y1 or not(a[0]<outer<b[0]):continue
                p,q=np.asarray(r['axis']);d=q-p
                if abs(d[0])<1e-6:continue
                slope=d[2]/d[0];axis_z=p[2]+(outer-p[0])*slope
                underside=axis_z-r['sectionSizeM'][1]/2*np.sqrt(1+slope*slope)
                if underside>z0:top=min(top,underside-.01)
        box(label+' fascia',[outer,y0,z0],[face,y1,top],bronze)
        box(label+' soffit return',[outer,y0,z0],[glass_edge,y1,z0+.018],bronze)
        if label=='west ground gallery':box(label+' north end return',[outer,y1,z0],[5.6,y1+.012,z1],bronze)
        if top==z1 and floor_edge>outer+.001:box(label+' floor edge cap',[outer,y0,z1-.018],[floor_edge,y1,z1],bronze)
    face=by['M-FR-1-035']['bounds'][1][0]+.02;outer=face+.018
    spandrel='Proposal | Junction finish | courtyard bronze glazed spandrel'
    change(spandrel,0,face,outer,'opaque-head-band');z(spandrel,head,2.8,'opaque-head-band')
    for end in ('south','north'):
        name='Proposal | Junction finish | courtyard brick slab return '+end
        change(name,0,face,outer,'opaque-head-band');z(name,head,2.8,'opaque-head-band')
    box('east ground gallery soffit return',[9.65,-3.029,head],[outer,-.115,head+.018],ivory)
    box('east ground gallery floor edge cap',[9.7,-3.029,2.782],[outer,-.115,2.8],ivory)
    seal_material='Opening fit | charcoal perimeter seal'
    seal_number=0
    for prefix,target in [('Proposal | Courtyard edge passage',head),('Proposal | Internal garden gallery glazing 1',head),('Proposal | Courtyard upper landing',upper_head)]:
        frames=[(name,ops.get(name,{}).get('newBounds',bounds(o)))for name,o in objects.items()if name.startswith(prefix)]
        uprights=[bb for name,bb in frames if 'mullion'in name]
        for name,bb in frames:
            lo,hi=bb
            if 'horizontal fram'not in name or not(.006<target-hi[2]<.009):continue
            centre=(lo[0]+hi[0])/2;xs=[centre-.02,centre+.02];segments=[(lo[1],hi[1])]
            for a,b in uprights:
                if b[0]<xs[0]or a[0]>xs[1]or a[2]>hi[2]or b[2]<target-1e-5:continue
                kept=[]
                for y0,y1 in segments:
                    if a[1]>y0:kept.append((y0,min(y1,a[1])))
                    if b[1]<y1:kept.append((max(y0,b[1]),y1))
                segments=[pair for pair in kept if pair[1]-pair[0]>1e-5]
            for y0,y1 in segments:
                seal_number+=1;box(f'head perimeter seal {seal_number:02d}',[xs[0],y0,hi[2]],[xs[1],y1,target],seal_material,'compressible-head-seal')
    pockets=[]
    for r in members.get('junctionReview',{}).get('masonry',{}).get('retainedBearingSeats',[]):
        if r['beamId']not in ('M-FR-1-034','M-FR-1-035','M-FR-1-036'):continue
        pad=by[r['padId']];grout=by[r['groutId']]
        for index,pocket in enumerate(r.get('nativePockets',[r['nativePocket']])):
            pockets.append({**pocket,'beamId':r['beamId'],'cutBoxes':[[c['low'],c['high']]for c in r['nativeCutBoxes']]if r.get('nativeCutBoxes')else [[pocket['low'],pocket['high']]],
                'proxies':[{'id':e['id'],'name':PREFIX+e['id']+' finished bearing envelope','triangles':e['triangles']}for e in (pad,grout)]if index==0 else [],
                'basis':'Cut the retained masonry core to the reviewed pad/beam pocket. Separate normal-view finished pad/grout envelopes correspond to the structural members; they are excluded from structural extraction and quantities.'})
    # These native floor-zone bodies already provide the opaque retained
    # front-wall band. Cut only the finite beam pockets; do not duplicate
    # the assumed retained masonry shown in the structural study.
    band_names=['Proposal revision | Exterior brick floor band First front','Proposal revision | Exterior brick floor band First front.001','Proposal | Original ground junction lintel']
    for r in members.get('junctionReview',{}).get('masonry',{}).get('retainedPierContinuity',[]):
        lo,hi=r['pocketBounds'];cut=cuboid(lo,hi);proxy_added=False
        for name in band_names:
            if (solid(triangulate(objects[name]))^cut).volume()<1e-8:continue
            bed=by[r['bedId']]
            proxies=[]if proxy_added else [{'id':bed['id'],'name':PREFIX+bed['id']+' finished bearing envelope','triangles':bed['triangles']}]
            pockets.append({'sourceObject':name,'low':lo,'high':hi,'cutBoxes':[[lo,hi]],'beamId':r['beamId'],'proxies':proxies,
                'basis':'Finite beam pocket in the existing opaque architectural storey band. Exact top-bed envelope is a normal-view finish proxy, excluded from structural extraction. The retained masonry material and transfer capacity remain assumed and unverified.'})
            proxy_added=True
    for r in members.get('junctionReview',{}).get('masonry',{}).get('beamPassages',[]):
        if r.get('sourceObject')not in objects or r.get('beamId')not in ('M-FR-1-034','M-FR-1-035','M-FR-1-036'):continue
        if not r.get('pocketBounds'):continue
        lo,hi=r['pocketBounds'];ob=objects[r['sourceObject']]
        if (solid(triangulate(ob))^cuboid(lo,hi)).volume()<1e-8:continue
        pockets.append({'sourceObject':r['sourceObject'],'low':lo,'high':hi,'cutBoxes':[[lo,hi]],'beamId':r['beamId'],'proxies':[],
            'basis':'Non-bearing native masonry passage matching the exact structural beam clearance. This pocket does not assign bearing to the outer brick leaf.'})
    closed_bodies=[]
    for name in band_names[:2]:
        shape=solid(triangulate(objects[name]))
        for r in pockets:
            if r['sourceObject']!=name:continue
            for lo,hi in r.get('cutBoxes',[[r['low'],r['high']]]):shape=shape-cuboid(lo,hi)
        tri=triangles(shape)
        closed_bodies.append({'objectName':name,'vertices':tri,'faces':np.arange(len(tri)).reshape(-1,3).tolist(),
            'basis':'Closed solid result of the reviewed finite beam pockets. Replaces unstable repeated coplanar native Booleans while retaining authored face materials and UV mapping.'})
    floor_cuts=[];nav_cuts=[]
    masks=[[[5.5,-4.3,2.5],[5.585,0,2.85]],[[5.585,-4.3,2.5],[5.625,-4.0,2.85]]]
    floor_spec=json.loads((ROOT/'proposal/specs/structural-floor-layout.json').read_text())
    for notch in floor_spec.get('firstGalleryEdgeDetail',{}).get('retainedPierNotches',[]):
        lo,hi=notch['bounds'];masks.append([[*lo,2.5],[*hi,2.85]])
    plan_mask=unary_union([plan_box(*a[:2],*b[:2])for a,b in masks])
    for name in ['Proposal | Entrance first floor continuation','Proposal | Wing first floor','Landings 01 | continuous oak landing floor.006','Landings 01 | continuous oak landing floor.002']:
        o=objects[name];a,b=bounds(o);plan=footprint(triangulate(o));removed=plan.intersection(plan_mask)
        if removed.area<1e-8:continue
        record={'objectName':name,'boxes':masks,'oldBounds':[a,b],'sourcePlanAreaM2':plan.area,
            'expectedPlanAreaM2':plan.difference(plan_mask).area,'removedPlanAreaM2':removed.area}
        if name=='Proposal | Entrance first floor continuation':
            corrected=floor_spec['floorPlateCorrections'][name];physical=Polygon(corrected['polygon'])
            tri=horizontal_layer(physical,a[2],b[2])
            record.update(physicalReplacement={'vertices':tri,'faces':np.arange(len(tri)).reshape(-1,3).tolist(),'polygon':corrected['polygon']},
                expectedPlanAreaM2=physical.area,approvedAddedPlanAreaM2=physical.difference(plan).area,
                removedPlanAreaM2=plan.difference(physical).area)
        ref=o.get('structural_framing_reference')
        if ref:
            rp=footprint(triangulate(ref));v=np.asarray(ref['vertices']);z0,z1=v[:,2].min(),v[:,2].max()
            if name=='Proposal | Entrance first floor continuation':
                corrected=floor_spec['floorPlateCorrections'][name]
                rp=Polygon(corrected['polygon']);z0,z1=corrected['bottom'],corrected['top']
            tri=horizontal_layer(rp.difference(plan_mask),z0,z1)
            record['framingReference']={'vertices':tri,'faces':np.arange(len(tri)).reshape(-1,3).tolist(),
                'basis':'Corrected physical framing plate with the approved exterior gallery ledge and closed masonry-pier footprints removed. The structural generator separately retains an explicit original rectangular identity reference for receiver IDs; the old diagonal finish-derived outline is not used.'}
        floor_cuts.append(record)
    for s in (navigation or{}).get('surfaces',[]):
        if s['name']not in ('Proposal | Entrance first floor continuation','Proposal | Wing first floor') or abs(s['z']-2.8)>.01:continue
        shape=Polygon(s['polygon']);after=shape.difference(plan_mask)
        if abs(shape.area-after.area)<1e-8:continue
        polys=[after]if after.geom_type=='Polygon'else list(after.geoms)
        if any(p.interiors for p in polys):raise ValueError('Floor navigation trim unexpectedly needs a hole')
        nav_cuts.append({'name':s['name'],'z':s['z'],'oldPolygon':s['polygon'],'newPolygons':[list(p.exterior.coords)[:-1]for p in polys]})
    # Preserve the accepted glass plane while giving the returned masonry a
    # genuine3 mm reveal pocket around the corner frame, at each storey.
    reveal_pockets=[{'objectName':'Proposal | North ground facade pier 0','low':[5.588,-4.027,0],'high':[5.642,-3.973,head+.003]},
                    {'objectName':'Proposal | North upper facade pier 0','low':[5.588,-4.027,2.8],'high':[5.642,-3.973,upper_head+.003]}]
    for r in floor_spec.get('firstGalleryEdgeDetail',{}).get('retainedFramePockets',[]):
        for name in [r['sourceObject'],*r.get('additionalSourceObjects',[])]:
            reveal_pockets.append({'objectName':name,'low':r['bounds'][0],'high':r['bounds'][1]})
    for r in reveal_pockets:
        if r['objectName']not in objects:raise ValueError('Missing corner pier '+r['objectName'])
    return {'revision':REVISION,'approvedForConstruction':False,'operations':list(ops.values()),'boxes':boxes,'retainedBearingPockets':pockets,
            'floorCuts':floor_cuts,'navigationCuts':nav_cuts,'revealPockets':reveal_pockets,'closedBodyReplacements':closed_bodies,'newMaterials':[{'name':seal_material,'colour':[.012,.014,.013,1],'roughness':.85,'metallic':0}],
            'floorDatumsM':[0,2.8,5.55],'ceilingFacesM':[-.4639,floor,upper],
            'limits':'Opening and finish geometry only. Finished floor datums, glazing planes, door hinges and handle heights are retained. The 85 mm outboard gallery ledge and closed masonry pier footprints are removed from the floor, finish and navigation. The garden fixed-left bay is156.5 mm shorter at its west edge to accommodate the actual cavity-wall inner face and15 mm finish clearance; its mullions remain equally spaced. The recessed head seals close the measured 7.5 mm model slot; gasket products and compression/movement allowances remain unselected. Cavity/fire/acoustic/weathering systems, glazing products and fixings are unselected. New head skins are cladding, not structural supports. Existing masonry/roof extraction overlaps remain separately reported.'}


def box_object(spec):
    lo,hi=spec['bounds'];vertices=[[x,y,z]for x in (lo[0],hi[0])for y in (lo[1],hi[1])for z in (lo[2],hi[2])]
    faces=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]]
    return {'object_name':spec['objectName'],'vertices':vertices,'faces':faces,'materials':[spec['material']], 'layer':'P47 Coordinated opening heads'}


def simulate(geometry,spec):
    g=copy.deepcopy(geometry);by={o['object_name']:o for o in g['objects']}
    for op in spec['operations']:
        ob=by[op['objectName']];v=np.asarray(ob['vertices']);old=np.asarray(op['oldBounds']);new=np.asarray(op['newBounds'])
        span=old[1]-old[0]
        for axis in range(3):
            if abs(span[axis])>1e-9:v[:,axis]=new[0,axis]+(v[:,axis]-old[0,axis])*(new[1,axis]-new[0,axis])/span[axis]
        ob['vertices']=v.tolist()
    g['objects'] += [box_object(b) for b in spec['boxes']]
    for p in spec.get('retainedBearingPockets',[]):
        ob=by[p['sourceObject']];shape=solid(triangulate(ob))
        for low,high in p.get('cutBoxes',[[p['low'],p['high']]]):shape=shape-cuboid(low,high)
        tri=triangles(shape);ob.update(vertices=tri,faces=np.arange(len(tri)).reshape(-1,3).tolist())
        for proxy in p['proxies']:
            tri=proxy['triangles'];g['objects'].append({'object_name':proxy['name'],'layer':'P47 Coordinated opening heads','vertices':tri,'faces':np.arange(len(tri)).reshape(-1,3).tolist()})
    for r in spec.get('revealPockets',[]):
        ob=by[r['objectName']];tri=triangles(solid(triangulate(ob))-cuboid(r['low'],r['high']))
        ob.update(vertices=tri,faces=np.arange(len(tri)).reshape(-1,3).tolist())
    for r in spec.get('floorCuts',[]):
        ob=by[r['objectName']];a,b=bounds(ob)
        if r.get('physicalReplacement'):
            tri=r['physicalReplacement']['vertices']
        elif b[2]-a[2]<1e-6:
            poly=footprint(triangulate(ob)).difference(unary_union([plan_box(*lo[:2],*hi[:2])for lo,hi in r['boxes']]))
            # A tiny positive-depth audit sheet is safe here: none of these
            # sheets sits inside framing. Native retains its zero thickness.
            tri=horizontal_layer(poly,a[2]-1e-7,a[2])
        else:
            shape=solid(triangulate(ob))
            for lo,hi in r['boxes']:shape=shape-cuboid(lo,hi)
            tri=triangles(shape)
        ob.update(vertices=tri,faces=np.arange(len(tri)).reshape(-1,3).tolist())
    return g


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--members',type=Path,default=ROOT/'walkthrough/public/structure/members.json');args=parser.parse_args()
    geometry_path=ROOT/'outputs/output-proposed-compact/geometry.json';raw=geometry_path.read_bytes()
    geometry=json.loads(raw);member_raw=args.members.read_bytes();members=json.loads(member_raw)
    navigation=json.loads((geometry_path.parent/'navigation.json').read_text())
    spec=proposal(geometry,members,navigation);spec['sourceGeometrySHA256']=hashlib.sha256(raw).hexdigest();spec['reviewedMembersSHA256']=hashlib.sha256(member_raw).hexdigest();spec['floorSpecSHA256']=hashlib.sha256((ROOT/'proposal/specs/structural-floor-layout.json').read_bytes()).hexdigest()
    names={o['objectName'] for o in spec['operations'] if o['kind']!='cavity-wall-depth'}|{b['objectName']for b in spec['boxes']}
    after=simulate(geometry,spec);check=audit(after,members,names)
    out=ROOT/'revisions/structural-bearing-openings-2026-10-27';out.mkdir(parents=True,exist_ok=True)
    (out/'opening-fit-proposed-check.json').write_text(json.dumps(check,indent=2)+'\n')
    (ROOT/'proposal/specs/structural-opening-fit.json').write_text(json.dumps(spec,indent=2)+'\n')
    print(json.dumps({'operations':len(spec['operations']),'newDetails':len(spec['boxes']),'clashes':len(check['intersections']),'unmeasured':len(check['unmeasured'])}))
    for r in check['intersections']:print(r['objectName'],r['memberId'],r['overlapCm3'])
