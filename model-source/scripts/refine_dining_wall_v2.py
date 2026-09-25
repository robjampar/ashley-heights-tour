"""Dining west-wall joinery and furniture from 2445659-3 / 2445662-1.

Run after the existing furniture, kitchen and dining-small-detail refiners.
Only the serving hatch is a new wall aperture. All sizes here are photo
estimates; published room spans and existing door apertures are preserved.
"""
import json
import math

import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube

PREFIX = 'Dining wall v2 | '
WALL = 'Kitchen dining partition'
WALL_PREFIX = WALL+' | V2 hatch '
CHAIRS = ('Dining chair 3', 'Dining chair 4')


def apply(g):
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    wall = next(w for w in walls if w['name'] == WALL)
    box, mesh = g['box'], g['mesh']
    layer = '16 Fittings and furniture'
    before_openings = [list(o) for o in wall['openings']]

    def source(ob):
        return ob.get('source_name', ob.name)

    old = ('Dining carved sideboard', 'Dining west sconce shade',
           'Photo detail | Kitchen white recess back',
           'Photo detail | Kitchen recess side',
           'Photo detail | Kitchen recess head')
    removed = []
    for ob in list(bpy.data.objects):
        if ob.type != 'MESH':
            continue
        name = source(ob)
        if name.startswith((PREFIX, WALL_PREFIX)+old) or name == WALL+' | end':
            removed.append(ob.name)
            bpy.data.objects.remove(ob, do_unlink=True)

    def finish(ob, assembly='Dining west wall details'):
        ob['assembly'] = assembly
        ob['basis'] = 'Original 2445659-3 and reverse kitchen 2445662-1; dimensions inferred'
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free(); ob.data.update()
        return ob

    def b(name, center, size, mat='Dark walnut', assembly='Dining carved sideboard', target_layer=layer):
        return finish(box(PREFIX+name, center, size, mat, target_layer), assembly)

    def tube(name, points, r=.006, mat='Dark walnut', closed=False, assembly='Dining carved sideboard'):
        return finish(make_tube(mesh, PREFIX+name, points, r, mat, layer, 8, closed), assembly)

    def extrude(name, yz, x0, x1, mat='Dark walnut', assembly='Dining carved sideboard'):
        n = len(yz)
        vv = [(x,y,z) for x in (x0,x1) for y,z in yz]
        ff = [tuple(reversed(range(n))), tuple(range(n,2*n))]
        ff += [(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
        return finish(mesh(PREFIX+name,vv,ff,mat,layer),assembly)

    def lathe(name, x, y, rings, mat='Dark walnut'):
        count=20; vv=[(x+r*math.cos(i*math.tau/count),y+r*math.sin(i*math.tau/count),z)
                     for z,r in rings for i in range(count)]
        ff=[tuple(reversed(range(count))),tuple((len(rings)-1)*count+i for i in range(count))]
        for j in range(len(rings)-1):
            ff += [(j*count+i,j*count+(i+1)%count,(j+1)*count+(i+1)%count,(j+1)*count+i) for i in range(count)]
        return finish(mesh(PREFIX+name,vv,ff,mat,layer),'Dining carved sideboard')

    # Replace the false kitchen niche backing with the photographed through
    # hatch. The sill remains above 1 m, so navigation cannot treat it as a door.
    cy, width, sill, head = 6.80, .78, 1.01, 1.56
    yc0, yc1 = cy-width/2, cy+width/2
    xc = wall['a'][0]; half = wall['thickness_m']/2
    y0, y1 = sorted((wall['a'][1],wall['b'][1]))
    aperture=[abs(wall['a'][1]-cy),width,sill,head,'window']
    previous = wall.get('dining_wall_v2_hatch')
    existing=[o for o in before_openings if not (previous and all(abs(o[i]-previous[i])<1e-6 for i in range(4)))]
    if existing:
        raise ValueError('Unexpected pre-existing Kitchen dining partition aperture; preserve it explicitly')
    wall['openings']=[aperture]
    wall['dining_wall_v2_hatch']=aperture
    for label,lo,hi,zlo,zhi in [('south',y0,yc0,0,2.60),('north',yc1,y1,0,2.60),
                              ('sill',yc0,yc1,0,sill),('head',yc0,yc1,head,2.60)]:
        ob=box(WALL_PREFIX+label,(xc,(lo+hi)/2,(zlo+zhi)/2),
               (half*2,hi-lo,zhi-zlo),'Warm plaster','11 Ground floor - walls')
        ob['basis']='Photographed through-wall serving hatch, 2445659-3 / 2445662-1'
        ob['structural_wall']=WALL
    for side in (-1,1):
        face=xc+side*half
        # Three stepped white casing bands reproduce the broad dining frame.
        for j,(offset,thick) in enumerate(((.008,.014),(.031,.020),(.060,.014))):
            r=.018 if j==0 else .022
            for yy in (yc0-offset-r/2,yc1+offset+r/2):
                b('Hatch casing upright',(face+side*(.010+j*.006),yy,(sill+head)/2),
                  (thick,r,head-sill+2*(offset+r)),'White joinery','Dining serving hatch','12 Doors and windows')
            for zz in (sill-offset-r/2,head+offset+r/2):
                b('Hatch casing rail',(face+side*(.010+j*.006),cy,zz),
                  (thick,width+2*offset,r),'White joinery','Dining serving hatch','12 Doors and windows')
    # Solid jamb linings span the wall thickness; one closed glazed panel sits
    # in the dining-side rebate. No opaque image or fake backing covers the hole.
    for yy in (yc0+.015,yc1-.015):
        b('Hatch jamb lining',(xc,yy,(sill+head)/2),(half*2+.018,.030,head-sill),
          'White joinery','Dining serving hatch','12 Doors and windows')
    for zz in (sill+.012,head-.012):
        b('Hatch head sill lining',(xc,cy,zz),(half*2+.020,width-.060,.024),
          'White joinery','Dining serving hatch','12 Doors and windows')
    b('Hatch glazing',(xc+half-.035,cy,(sill+head)/2),(.009,width-.065,head-sill-.053),
      'Bathroom mist glass','Dining serving hatch','12 Doors and windows')
    b('Hatch projecting lower board',(xc+half+.035,cy,sill-.022),(.115,width+.17,.028),
      'White joinery','Dining serving hatch','12 Doors and windows')

    # Keep the two complete chairs intact. Absolute vertex baselines avoid a
    # second 280 mm movement when running this helper on an incremental file.
    moved=[]
    for ob in bpy.data.objects:
        if ob.type!='MESH' or ob.get('assembly') not in CHAIRS:
            continue
        key='dining_wall_v2_original_vertices'
        if key not in ob:
            ob[key]=json.dumps([list(ob.matrix_world@v.co) for v in ob.data.vertices])
        baseline=json.loads(ob[key])
        if len(baseline)!=len(ob.data.vertices):raise ValueError('Chair topology changed: '+ob.name)
        inv=ob.matrix_world.inverted()
        for v,p in zip(ob.data.vertices,baseline):
            q=Vector(p);q.x+=.28;v.co=inv@q
        ob.data.update();moved.append(ob.name)

    # Legged carved sideboard: hollow case, two side doors and central drawers,
    # shaped panels, raised three-panel back and low stretchers.
    ya,yb=7.34,8.74;back,front=5.215,5.695
    b('Sideboard carcass back',(back+.016,(ya+yb)/2,.628),(.032,yb-ya,.650))
    for yy in (ya+.020,yb-.020):b('Sideboard carcass side',((back+front)/2,yy,.628),(front-back,.040,.650))
    b('Sideboard carcass lower shelf',((back+front)/2,(ya+yb)/2,.325),(front-back,yb-ya,.040))
    b('Sideboard carcass projecting top',((back+front)/2+.006,(ya+yb)/2,.972),(front-back+.068,yb-ya+.055,.046))
    b('Sideboard under-top moulding',(front+.009,(ya+yb)/2,.933),(.055,yb-ya,.025))
    for xx in (back+.045,front-.028):
        for yy in (ya+.063,yb-.063):
            lathe('Sideboard turned foot',xx,yy,[(.01,.020),(.035,.029),(.075,.024),(.11,.014),
                   (.145,.027),(.18,.023),(.205,.014),(.24,.030),(.28,.026),(.34,.026)])
    b('Sideboard low long stretcher',(front-.050,(ya+yb)/2,.130),(.045,yb-ya-.12,.042))
    for yy in (ya+.063,yb-.063):b('Sideboard side stretcher',((back+front)/2,yy,.130),(front-back-.04,.040,.042))
    for yy in (ya+.014,ya+.443,yb-.443,yb-.014):
        b('Sideboard front stile',(front+.010,yy,.627),(.040,.027,.600))
    for yc in (ya+.221,yb-.221):
        w,h,zc=.390,.545,.625
        b('Sideboard cupboard door',(front+.004,yc,zc),(.026,w,h))
        # Stepped central field and four square projecting shoulders.
        py=[(-.5,-.50),(.5,-.50),(.5,-.30),(.37,-.30),(.37,.30),(.5,.30),
            (.5,.50),(.25,.50),(.25,.38),(-.25,.38),(-.25,.50),(-.5,.50),
            (-.5,.30),(-.37,.30),(-.37,-.30),(-.5,-.30)]
        shape=[(yc+y*w,zc+z*h) for y,z in py]
        extrude('Sideboard shaped cupboard panel',shape,front+.019,front+.038)
        tube('Sideboard cupboard panel bead',[(front+.045,y,z)for y,z in shape],.006,closed=True)
        tube('Sideboard cupboard oval carving',[(front+.048,yc+.022*math.sin(t),zc+.052*math.cos(t))
            for t in [i*math.tau/40 for i in range(40)]],.004,closed=True)
        lathe('Sideboard door handle rose',front+.060,yc-.145,[(.618,.011),(.630,.011)],'Brass')
    center=(ya+yb)/2
    for zc,h in ((.428,.192),(.777,.207)):
        b('Sideboard central drawer',(front+.009,center,zc),(.031,.466,h))
        for yy in (center-.217,center+.217):b('Sideboard drawer side bead',(front+.032,yy,zc),(.012,.011,h-.020))
        for zz in (zc-h/2+.012,zc+h/2-.012):b('Sideboard drawer rail bead',(front+.032,center,zz),(.012,.435,.013))
        for yy in (center-.128,center+.128):
            tube('Sideboard hanging drawer pull',[(front+.060,yy+.020*math.sin(i*math.tau/32),zc+.024*math.cos(i*math.tau/32))for i in range(32)],.0045,'Brass',True)
    b('Sideboard central carved frieze',(front+.016,center,.605),(.040,.465,.095))
    for side in (-1,1):
        tube('Sideboard frieze scroll',[(front+.041,center+side*(.025+.035*t)*math.cos(t*math.pi*3),.605+.024*math.sin(t*math.pi*3))for t in [i/44 for i in range(45)]],.005)
    # Shaped scalloped apron lies below the doors, above the open leg space.
    apron=[(ya,.320),(yb,.320),(yb,.295)]
    apron += [(yb-(yb-ya)*i/56,.280-.013*(.5+.5*math.cos(i*math.pi/4)))for i in range(57)]
    extrude('Sideboard scalloped lower apron',apron,front-.007,front+.024)
    b('Sideboard raised back',(back+.043,center,1.181),(.063,yb-ya-.012,.378))
    b('Sideboard raised back cap',(back+.048,center,1.381),(.093,yb-ya+.028,.024))
    for yc,w in ((ya+.240,.370),(center,.434),(yb-.240,.370)):
        b('Sideboard back panel',(back+.080,yc,1.183),(.023,w,.253))
        for yy in (yc-w/2,yc+w/2):b('Sideboard back panel stile',(back+.098,yy,1.183),(.021,.018,.275))
        for zz in (1.053,1.314):b('Sideboard back panel rail',(back+.098,yc,zz),(.021,w+.035,.021))
    # Small photographed objects on the top: speaker and pale ornaments.
    b('Sideboard black speaker',(back+.159,ya+.184,1.084),(.100,.218,.171),'Black screen')
    tube('Sideboard speaker ring',[(back+.212,ya+.184+.054*math.cos(t),1.086+.054*math.sin(t))for t in [i*math.tau/48 for i in range(48)]],.0026,'Metal',True)
    for yy in (center-.07,center+.035):
        lathe('Sideboard pale ornament',back+.208,yy,[(.999,.012),(1.010,.021),(1.027,.021),(1.040,.012)],'Cream ceramic')

    # Four separate framed prints visible above the hatch/sideboard. Artwork
    # subjects are not invented as photographs: only small tonal blocks are used.
    face=xc+half+.018
    pictures=[]
    for label,y,z,w,h,frame in [('upper small',6.74,2.010,.158,.176,'Dark walnut'),
                               ('lower small',6.76,1.804,.116,.104,'Brass'),
                               ('left landscape',8.13,1.788,.256,.298,'Brass'),
                               ('right landscape',8.48,1.788,.292,.298,'Brass')]:
        ass='Dining picture '+label
        b('Picture backing '+label,(face,y,z),(.012,w,h),'Metal',ass)
        b('Picture mount '+label,(face+.009,y,z),(.009,w-.020,h-.020),'Cream ceramic',ass)
        for yy in (y-w/2+.009,y+w/2-.009):b('Picture frame upright '+label,(face+.015,yy,z),(.021,.018,h),frame,ass)
        for zz in (z-h/2+.009,z+h/2-.009):b('Picture frame rail '+label,(face+.015,y,zz),(.021,w-.020,.018),frame,ass)
        pw,ph=w*.63,h*.61
        b('Picture print '+label,(face+.015,y,z),(.002,pw,ph),'Picture print',ass)
        # Small stylised pale architecture/foliage marks, deliberately simplified.
        for j,(wy,hz,mat) in enumerate(((-.23,-.17,'Stone'),(.18,-.21,'Foliage'),(.06,.03,'White joinery'))):
            b('Picture print tone '+label,(face+.017+j*.0003,y+wy*pw,z+hz*ph),(.001,pw*.30,ph*.43),mat,ass)
        pictures.append({'label':label,'centre_m':[face,y,z],'size_m':[w,h]})

    # Replace the flat opaque triangular west light with its truncated, faceted
    # shade and fine metal perimeter. Its mounting point remains on this wall.
    yc,zc=7.38,2.012
    shade=[(yc-.134,zc+.115),(yc-.025,zc-.114),(yc+.025,zc-.114),(yc+.134,zc+.115)]
    extrude('West wall light shade',shade,xc+half+.044,xc+half+.113,'Lampshade','Dining west sconce')
    tube('West wall light brass perimeter',[(xc+half+.115,y,z)for y,z in shade],.004,'Brass',False,'Dining west sconce')
    tube('West wall light central seam',[(xc+half+.117,yc,zc+.105),(xc+half+.117,yc,zc-.108)],.002,'Brass',False,'Dining west sconce')

    bpy.context.view_layer.update()
    def bounds(obs):
        vv=[o.matrix_world@v.co for o in obs for v in o.data.vertices]
        return [[min(p[i]for p in vv)for i in range(3)],[max(p[i]for p in vv)for i in range(3)]]
    sideboard=bounds([o for o in bpy.data.objects if o.type=='MESH' and o.get('assembly')=='Dining carved sideboard'])
    chair_info=[]
    for name in CHAIRS:
        bb=bounds([o for o in bpy.data.objects if o.type=='MESH' and o.get('assembly')==name])
        gap=bb[0][0]-sideboard[1][0]
        if gap<.06:raise ValueError('Dining chair still too close to sideboard: '+name)
        chair_info.append({'assembly':name,'bounds_m':bb,'sideboard_x_clearance_m':gap})
    report={'sources':['2445659-3','2445659-0','2445659-2','2445662-1'],
            'hatch':{'wall':WALL,'centre_y_m':cy,'clear_width_m':width,'sill_m':sill,'head_m':head,
                     'metadata_opening':aperture,'walkable':False},
            'sideboard_bounds_m':sideboard,'chair_shift_x_m':.28,'chairs':chair_info,
            'moved_chair_parts':len(moved),'pictures':pictures,
            'preserved':'Room spans, floor levels, rear bay B, table, all existing door openings and cabinet bodies',
            'estimates':'Furniture/hatch sizes, moulding profiles, decorative carving and picture tones are inferred. Picture subjects are simplified.'}
    data['dining_wall_v2_review']=report
    return report


refine_dining_wall_v2 = apply
