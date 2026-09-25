"""Photo-backed trim corrections, without changing openings or room dimensions.

Profiles distinguish the photographed room types. Unlabelled widths, projections
and low-relief sculpture are inferred; the supplied tour is not a moulding survey.
Run after refine_circulation and other fitting helpers, before editable origins.
"""
import ast
import math
from pathlib import Path
import bpy
import bmesh
from mathutils import Vector

PREFIX = 'Trim comparison | '


def refine_trim_comparison(g):
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    by_name = {w['name']:w for w in walls}
    box, mesh = g['box'], g['mesh']
    env = dict(g, bpy=bpy, bmesh=bmesh, math=math, Vector=Vector,
               mats=g['materials'], palette=g['PALETTE'], assembly_counts={})
    tree = ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    body = next(n.body for n in tree.body if isinstance(n, ast.FunctionDef) and n.name=='refine')
    exec(compile(ast.Module(body=[n for n in body if isinstance(n,ast.FunctionDef)
                                 and n.name=='tube'],type_ignores=[]),'<trim-tools>','exec'),env)
    tube = env['tube']

    def drop(ob):
        bpy.data.objects.remove(ob, do_unlink=True)

    def clean_mesh(ob):
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free(); ob.data.update()
        return ob

    def extrude(name, origin, along, length, across, normal, profile, layer):
        verts = [list(origin+along*t+across*q+normal*d)
                 for t in (0, length) for q,d in profile]
        n = len(profile)
        faces = [tuple(reversed(range(n))),tuple(range(n,2*n))]
        faces += [(j,(j+1)%n,(j+1)%n+n,j+n) for j in range(n)]
        return clean_mesh(mesh(PREFIX+name,verts,faces,'White joinery',layer))

    def mitred_u(name, centre, u, normal, width, head, floor_z, profile, layer):
        # Each cross-section follows the same three-sided U path. Changing the
        # offset at the corners produces actual 45-degree mitres, not overlaps.
        verts = []
        for off,depth in profile:
            for x,z in [(-width/2-off,0),(-width/2-off,head+off),
                        (width/2+off,head+off),(width/2+off,0)]:
                verts.append(list(centre+u*x+normal*depth+Vector((0,0,floor_z+z))))
        n=len(profile); faces=[]
        for i in range(n):
            ni=(i+1)%n
            for j in range(3):faces.append((i*4+j,i*4+j+1,ni*4+j+1,ni*4+j))
        faces += [tuple(i*4 for i in range(n)),tuple(reversed([i*4+3 for i in range(n)]))]
        return clean_mesh(mesh(PREFIX+name,verts,faces,'White joinery',layer))

    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and ob.name.startswith(PREFIX):drop(ob)

    profiles = {
        'reeded': [(0,0),(.095,0),(.095,.014)]+
                  [(.095*i/72,.012+.003*math.cos(i/72*6*math.pi)) for i in range(72,-1,-1)],
        'mitred': [(0,0),(.095,0),(.095,.017),(.084,.017),(.080,.024),
                   (.073,.024),(.069,.015),(.060,.015),(.056,.020),
                   (.049,.020),(.044,.010),(.035,.010),(.031,.015),
                   (.024,.015),(.019,.007),(0,.007)],
        'plain': [(0,0),(.075,0),(.075,.017),(.062,.017),(.058,.021),
                  (.052,.021),(.047,.012),(.020,.012),(.015,.008),(0,.008)],
        'flat_external': [(0,0),(.065,0),(.065,.020),(0,.020)],
    }
    configurations = {
        'Family hall door': ['reeded'],
        'Kitchen hall door': ['reeded'],
        'Garage kitchen partition': ['reeded','plain'],
        'Garage rear': ['rear_external'],
        'Utility rear': ['rear_external'],
        # Upstairs sources show one continuous stepped casing, without the
        # projecting multi-board crown used by the old generic joinery.
        'Bedroom 3 hall door': ['mitred'],
        'Bedroom 5 hall': ['mitred'],
        'Linen cupboard hall': ['mitred'],
        'Bathroom hall': ['mitred'],
        'Principal hall entrance': ['mitred'],
        'Principal en suite east': ['mitred'],
        'Bedroom 2 door': ['mitred'],
        'Bedroom 4 hall': ['mitred'],
        'Bedroom 4 en suite divider': ['mitred'],
        # Both wall directions put the balcony outside on side +1. Source
        # 2445674-0/2 shows flat plastic exterior surrounds; the room faces
        # retain the stepped interior casing visible in 2445673-1/2445679-0.
        'Bedroom 3 balcony door': ['balcony'],
        'Principal balcony door': ['balcony'],
        'Drawing hall partition': ['crown'],
        'Dining hall doors': ['crown'],
    }
    corrected=[]
    for wall_name,kinds in configurations.items():
        w=by_name[wall_name];a,b=Vector((*w['a'],0)),Vector((*w['b'],0))
        u=(b-a).normalized();left=Vector((-u.y,u.x,0));f=w['floor'];z=f*2.8
        ceiling=2.45 if f else 2.60;layer=f'{f+1}4 Trim'
        for ob in list(bpy.data.objects):
            if ob.type!='MESH':continue
            name=ob.get('source_name',ob.name)
            if name.startswith(wall_name+' | door architrave') or name.startswith(wall_name+' classical overdoor'):
                drop(ob)
        for idx,op in enumerate(w['openings']):
            along,width,sill,head,opening_kind=op
            if sill>.15 or opening_kind not in ('door','double','entry'):continue
            opening_profile=kinds[min(idx,len(kinds)-1)];centre=a+u*along
            for side in (-1,1):
                kind=('mitred' if side==-1 else 'flat_external') if opening_profile in ('balcony','rear_external') else opening_profile
                normal=left*side;face=centre+normal*w['thickness_m']/2
                label=f'{wall_name} opening {idx+1} side {side}'
                before=set(bpy.data.objects)
                if kind in ('plain','mitred','flat_external'):
                    suffix=' flat exterior surround' if kind=='flat_external' else ' mitred casing'
                    mitred_u(label+suffix,face,u,normal,width,head,z,profiles[kind],layer)
                else:
                    profile=profiles['reeded'];cw=.095;up=Vector((0,0,1))
                    for sign in (-1,1):
                        start=face+u*(sign*width/2)+Vector((0,0,z+.16))
                        extrude(label+' reeded jamb',start,up,head-.16,u*sign,normal,profile,layer)
                        # Plain plinth block belongs beneath the reeded casing.
                        p=face+u*(sign*(width/2+cw/2))+normal*.012+Vector((0,0,z+.08))
                        angle=math.atan2(u.y,u.x)
                        box(PREFIX+label+' plinth block',p,(cw+.008,.024,.16),'White joinery',layer,angle)
                        p=face+u*(sign*(width/2+cw/2))+normal*.010+Vector((0,0,z+head+cw/2))
                        box(PREFIX+label+' square corner block',p,(cw,.020,cw),'White joinery',layer,angle)
                        for edge in (.077,.052):
                            for s in (-1,1):
                                p=face+u*(sign*(width/2+cw/2)+s*edge/2)+normal*.022+Vector((0,0,z+head+cw/2))
                                box(PREFIX+label+' corner block frame',p,(.006,.009,edge+.006),'White joinery',layer,angle)
                                p=face+u*(sign*(width/2+cw/2))+normal*.022+Vector((0,0,z+head+cw/2+s*edge/2))
                                box(PREFIX+label+' corner block frame',p,(edge+.006,.009,.006),'White joinery',layer,angle)
                    extrude(label+' reeded head',face-u*width/2+Vector((0,0,z+head)),
                            u,width,up,normal,profile,layer)
                    if kind=='crown':
                        base=head+cw;h=min(.16,ceiling-base)
                        # A continuous closed body replaces three floating boards.
                        # Six low rolls express the visible moulded crown.
                        crown=[(0,0),(h,0)]
                        for i in range(96,-1,-1):
                            t=i/96;depth=.022+.061*t+.0035*math.sin(t*math.tau*6)
                            crown.append((h*t,depth))
                        extrude(label+' connected beaded crown',face-u*(width/2+cw+.025)+Vector((0,0,z+base)),
                                u,width+2*cw+.05,up,normal,crown,layer)
                for ob in set(bpy.data.objects)-before:
                    if ob.type=='MESH':
                        ob['assembly']=PREFIX+label
                        ob['basis']='Profile inferred from original panoramas; door opening unchanged'
            corrected.append({'wall':wall_name,'opening':idx+1,'profile':opening_profile,
                              'side_profiles':{'interior':'mitred','exterior':'flat_external'} if opening_profile in ('balcony','rear_external') else None,
                              'head_unchanged_m':head})

    # Drawing-room cornice alone has the photographed decorative frieze. Other
    # rooms retain their plain cove. This single closed loop mitres every corner.
    selected={w['name']:-1 for w in walls if w['name'].startswith('Drawing ')
              and w['name']!='Drawing hall partition'}
    selected.update({'Drawing hall partition':1,'Dining drawing partition':1})
    for ob in list(bpy.data.objects):
        if ob.type!='MESH':continue
        wall_name=ob.get('cornice_wall');side=ob.get('cornice_side')
        if wall_name in selected and side==selected[wall_name]:drop(ob)
        elif wall_name=='House front centre' and side==-1:
            # Keep the hall/family part of this shared frontage cove. Its final
            # short length belongs to the drawing-room loop rebuilt below.
            inv=ob.matrix_world.inverted();points=[ob.matrix_world@v.co for v in ob.data.vertices]
            lo,hi=min(p.x for p in points),max(p.x for p in points);end=9.015
            for v in ob.data.vertices:
                p=ob.matrix_world@v.co;p.x=lo+(p.x-lo)*(end-lo)/(hi-lo);v.co=inv@p
            ob.data.update()
    w=by_name
    points=[Vector((w['Drawing hall partition']['a'][0],0)),
            Vector(w['Drawing rear']['a']),Vector(w['Drawing rear']['b']),
            Vector(w['Drawing east']['b']),Vector(w['Drawing front east']['b'])]
    # Bay caps meet the 2.30 m window heads; the main cornice stays at the
    # recessed front wall plane above, rather than floating outside the house.
    points += [Vector(w['Drawing bay 4']['b'])]
    n=len(points);halves=[w['Drawing hall partition']['thickness_m']/2]+[.115]*(n-1)
    directions=[(points[(i+1)%n]-points[i]).normalized() for i in range(n)]
    normals=[Vector((u.y,-u.x)) for u in directions] # clockwise ring, inward
    def cross(a,b):return a.x*b.y-a.y*b.x
    def ring(offset):
        out=[]
        for i in range(n):
            prev=(i-1)%n;pa=points[prev]+normals[prev]*(halves[prev]+offset)
            pb=points[i]+normals[i]*(halves[i]+offset);ua,ub=directions[prev],directions[i]
            den=cross(ua,ub)
            out.append(pb if abs(den)<1e-9 else pa+ua*(cross(pb-pa,ub)/den))
        return out
    profile=[(0,.150),(.015,.150),(.022,.144),(.028,.138),(.028,.055),
             (.036,.045),(.058,.025),(.091,.013),(.110,.009),(.110,0),(0,0)]
    vertices=[(*p,2.60-drop)for offset,drop in profile for p in ring(offset)]
    faces=[]
    for j in range(len(profile)):
        j2=(j+1)%len(profile)
        for i in range(n):faces.append((j*n+i,j*n+(i+1)%n,j2*n+(i+1)%n,j2*n+i))
    cornice=clean_mesh(mesh(PREFIX+'Drawing room continuous mitred cornice',vertices,faces,'White joinery','14 Trim'))
    cornice['basis']='Plain cove replaced only here: source2445666-1 and2445667-1 show decorated frieze'
    # The source supports alternating shallow oval relief and U-shaped swags.
    # Fine sculpture cannot be measured; keep it shallow and explicitly inferred.
    start_ring=ring(.030);end_ring=ring(.030);motif_count=0
    for i in range(n):
        a=start_ring[i];b=end_ring[(i+1)%n];u=(b-a).normalized();length=(b-a).length
        if length<.35:continue
        pitch=.38;count=max(1,int((length-.18)/pitch));spacing=(length-.18)/count
        for k in range(count):
            c=a+u*(.09+(k+.5)*spacing);zc=2.503
            oval=[(*(c+u*(.016*math.cos(j*math.tau/32))),zc+.028*math.sin(j*math.tau/32))for j in range(32)]
            ob=tube(PREFIX+'Drawing frieze oval relief',oval,.0020,'White joinery','14 Trim',8,True)
            ob['basis']='Shallow oval/rosette silhouette inferred from drawing-room source close-ups'
            # Two short inner curves suggest the visible inner relief, rather
            # than adding unsupported ornate flowers or deep carved decoration.
            for sign in (-1,1):
                inner=[(*(c+u*(sign*(.004+.004*math.sin(j*math.pi/20)))),zc-.021+j*.042/20)for j in range(21)]
                tube(PREFIX+'Drawing frieze oval inner relief',inner,.0017,'White joinery','14 Trim',8)
            if k+1<count:
                c2=c+u*spacing/2
                for dz in (0,.009):
                    arc=[(*(c2+u*(-.054+j*.108/24)),zc+.018+dz-.042*math.sin(j*math.pi/24))for j in range(25)]
                    tube(PREFIX+'Drawing frieze shallow swag',arc,.002,'White joinery','14 Trim',8)
            motif_count+=1
    for ob in bpy.data.objects:
        if ob.type=='MESH' and ob.name.startswith(PREFIX):
            if not ob.get('assembly'):ob['assembly']=PREFIX+'Drawing room cornice'
            ob['trim_comparison_revision']=3
    return {'revision':3,'openings_unchanged':True,'wall_spans_unchanged':True,
            'door_surrounds':corrected,'drawing_cornice_drop_m':.150,'drawing_cornice_projection_m':.110,
            'drawing_relief_projection_m':.004,'drawing_oval_motifs':motif_count,
            'sources':['2445658-0','2445658-2','2445662-2','2445662-3','2445667-1','2445666-1','2445676-2',
                       '2445670-0','2445670-2','2445671-2','2445672-0','2445673-1','2445678-0',
                       '2445674-0','2445674-2','2445679-0'],
            'limits':'Widths and profile sections inferred; exact decorative relief sculpture is not established by the tour.'}
