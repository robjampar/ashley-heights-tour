"""Coordinate the full main-wing basement and the owner's roof/junction fixes."""
import json
import math

REVISION = 'basement-roof-corrections-2026-10-20'
PREFIX = 'Basement full | '


def apply_corrections(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    scene, nav = ns['scene'], ns['nav']
    if scene.get('basement_roof_revision') == REVISION:
        return [], json.loads(scene['basement_roof_report'])
    b = RoomBuilder(ns, 'basement extension', PREFIX, 'P34 Basement and envelope corrections')
    changed, removed = [], []
    owners = set(scene.collection.children_recursive)

    def mark(ob):
        if ob not in changed:
            changed.append(ob)
        ob['basement_roof_revision'] = REVISION

    def retire(ob):
        removed.append(ob.name)
        for collection in tuple(ob.users_collection):
            if collection in owners:
                collection.objects.unlink(ob)
        if not ob.users_collection:
            bpy.data.objects.remove(ob)

    def edit(ob, fn):
        ob.data = ob.data.copy()
        inverse = ob.matrix_world.inverted()
        for vertex in ob.data.vertices:
            vertex.co = inverse @ Vector(fn(ob.matrix_world @ vertex.co))
        ob.data.update()
        mark(ob)

    def values(key, pending):
        result = [nav.setdefault(key, [])]
        if pending in ns and ns[pending] is not result[0]:
            result.append(ns[pending])
        return result

    def material(name):
        return bpy.data.materials['Interior | Bar Art Deco ' + name]

    def replace_mesh(ob, vertices, faces):
        old = ob.data
        mesh = bpy.data.meshes.new(ob.name)
        mesh.from_pydata(vertices, [], faces)
        for mat in old.materials:
            mesh.materials.append(mat)
        mesh.update()
        inverse = ob.matrix_world.inverted()
        for vertex in mesh.vertices:
            vertex.co = inverse @ vertex.co
        ob.data = mesh
        b.uv(ob)
        mark(ob)

    # A step follows the existing gym slab exactly. No excavation beneath the
    # open courtyard, no change to the cinema, stair, island or accepted seating.
    spec=ns.get('spec') or json.loads((ns['ROOT']/'proposal/specs/design-spec-compact.json').read_text())
    outer = spec['entertainmentBasement']['fullFootprintPolygon']
    room = [[5.16,-8.845],[9.22,-8.845],[9.22,-16.076],[13.75,-16.076],
            [13.75,-3.259],[9.93,-3.259],[9.93,-4.23],[5.16,-4.23]]
    z = -2.8
    floor = scene.objects['Proposal | Entertainment basement floor']
    floor_material = floor.data.materials[0]
    n = len(outer)
    replace_mesh(floor, [(x,y,h) for h in (z-.25,z) for x,y in outer],
                 [tuple(reversed(range(n))),tuple(range(n,2*n))] +
                 [(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)])
    wallmat = scene.objects['Proposal | Entertainment basement retaining north'].data.materials[0]
    # End vertices are changed in world space, preserving the authored mesh.
    edit(scene.objects['Proposal | Entertainment basement retaining north'],
         lambda p: (min(p.x,9.93),p.y,p.z))
    edit(scene.objects['Proposal | Entertainment basement retaining east'],
         lambda p: (p.x,-3.144 if p.y>-4.116 else p.y,p.z))
    b.box_bounds('north retaining wall under gym',[9.70,-3.259,13.98,-3.029],z,-.22,wallmat)
    b.box_bounds('courtyard step retaining return',[9.70,-4.0,9.93,-3.259],z,-.22,wallmat)
    b.box_bounds('ceiling extension under gym',[9.93,-4.23,13.75,-3.259],-.247,-.222,wallmat)
    for key, pending in [('surfaces','new_surfaces')]:
        for items in values(key,pending):
            for item in items:
                if item['name']=='Proposal | Entertainment basement floor':
                    item['polygon']=outer
    for items in values('segments','new_segments'):
        for item in items:
            if item['name']=='Proposal | Entertainment basement retaining north':
                item['b']=[9.815,-4.115]
            if item['name']=='Proposal | Entertainment basement retaining east':
                item['b']=[13.865,-3.144]
    for label,a,c in [('north retaining wall under gym',[9.815,-3.144],[13.865,-3.144]),
                       ('courtyard step retaining return',[9.815,-4.115],[9.815,-3.144])]:
        ns.get('new_segments',nav['segments']).append(
            {'name':PREFIX+label,'a':a,'b':c,'bottom':z,'top':-.22,'thickness':.23})
    for items in values('planRooms','new_rooms'):
        for item in items:
            if item['name']=='Basement bar and games room':
                item['polygon_m']=room
    for name, height, downward in [('Bar 01 | limestone floor finish',z+.012,False),
                                     ('Bar 01 | ivory ceiling lining',-.267,True)]:
        replace_mesh(scene.objects[name],[(x,y,height) for x,y in room],
                     [tuple(reversed(range(len(room)))) if downward else tuple(range(len(room)))])

    # Continue the same limestone grid; narrow old cut tiles are replaced by
    # full modules running across the former wall line.
    for ob in list(scene.objects):
        if ob.name.startswith('Bar detail | limestone slab '):
            retire(ob)
    for col in range(15):
        x0=5.16+col*.60; x1=min(13.75,x0+.60)
        if x0>=13.75:continue
        for row in range(11):
            y0=-16.076+row*1.20; y1=min(-3.259,y0+1.20)
            if y0>=-3.259:continue
            for suffix,rect in [('south',[9.22,-16.076,13.75,-8.845]),
                                ('games',[5.16,-8.845,13.75,-4.23]),
                                ('gym',[9.93,-4.23,13.75,-3.259])]:
                xa,ya,xb,yb=max(x0,rect[0]),max(y0,rect[1]),min(x1,rect[2]),min(y1,rect[3])
                # Merge the two north bands when the full tile is east of the step.
                if x0>=9.93 and suffix=='games':yb=min(y1,-3.259)
                if x0>=9.93 and suffix=='gym':continue
                if xb-xa>.003 and yb-ya>.003:
                    b.box_bounds(f'limestone slab {col}-{row} {suffix}',
                                 [xa+.001,ya+.001,xb-.001,yb-.001],z+.0125,z+.018,
                                 material('beige limestone slabs'),.0008)
    # Replace the continuous north mouldings with three properly mitred runs.
    # The old east mouldings retain their profiles and simply meet the new corner.
    for ob in list(scene.objects):
        if ob.name.startswith('Bar detail | panelling north games'):
            retire(ob)
        elif ob.name.startswith('Bar detail | panelling east bar and games') and ob.type=='MESH':
            edit(ob, lambda p:(p.x,p.y+.971 if p.y>-4.30 else p.y,p.z))
        elif ob.name.startswith('Bar 01 | art ') and ob.type=='MESH':
            edit(ob,lambda p:(p.x+.35,p.y+.971,p.z))

    profile=[('skirting',.105,.024,.18),('skirting cap',.205,.030,.018),
             ('dado',.82,.027,.025),('dado bead',.85,.020,.012),
             ('cornice lower',2.43,.030,.025),('cornice middle',2.46,.043,.025),
             ('cornice crown',2.49,.057,.032)]
    def lining(label,start,end,panels=(),turns=(1,1)):
        a=Vector((*start,0)); d=Vector((*end,0))-a; length=d.length
        t=d.normalized(); normal=Vector((-t.y,t.x,0))
        def strip(part,lo,hi,bottom,top,depth,mat,mitre=True):
            p=a+t*lo;q=a+t*hi
            pa=p+normal*depth+(t*depth*turns[0] if mitre and abs(lo)<1e-5 else Vector())
            qa=q+normal*depth-(t*depth*turns[1] if mitre and abs(hi-length)<1e-5 else Vector())
            ob=b.mesh(f'panelling {label} {part}',
                      [tuple(v+Vector((0,0,z+h))) for h in (bottom,top) for v in (p,q,qa,pa)],
                      [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],mat)
            return ob
        strip('cream wall lining',0,length,.018,2.533,.006,material('warm cream plaster'))
        for part,h,depth,height in profile:
            strip(part,0,length,h-height/2,h+height/2,depth,material('cream lacquer fluting'))
        for center,width in panels:
            for lo,hi in [(.29,.72),(.96,2.32)]:
                for x in (center-width/2,center+width/2):
                    strip('picture stile',x-.011,x+.011,lo,hi,.022,material('cream lacquer fluting'),False)
                for h in (lo,hi):
                    strip('picture rail',center-width/2-.011,center+width/2+.011,h-.011,h+.011,.022,material('cream lacquer fluting'),False)
    lining('north gym',(13.749,-3.260),(9.931,-3.260),[(1.909,3.15)])
    lining('courtyard step',(9.931,-3.260),(9.931,-4.231),[(.485,.64)],(1,-1))
    lining('north media',(9.931,-4.231),(5.161,-4.231),
           [(9.931-8.75,1.36),(9.931-6.63,2.34)],(-1,1))
    # Small recessed fittings serve the new alcove without loose floor lights.
    ivory=material('cream lacquer fluting')
    led=material('concealed warm LED')
    for i,x in enumerate((10.65,12.8)):
        b.ring(f'extension downlight {i} trim',(x,-3.82,-.269),.034,.025,.005,ivory)
        b.cylinder(f'extension downlight {i} lens',(x,-3.82,-.272),.024,.003,led)
        b.light(f'extension downlight {i}',(x,-3.82,-.31),.20,8,2.5)
    # Keep the accepted-fit-out inventory valid for the visual refinement pass.
    accepted=json.loads(scene['accepted_bar_fitout'])
    accepted['sourceObjects']=[name for name in accepted['sourceObjects'] if name not in removed]
    accepted['details']['fullFootprintRevision']=REVISION
    scene['accepted_bar_fitout']=json.dumps(accepted)

    # Clear the added excavation in proposal terrain copies only.
    cutter=b.box_bounds('temporary excavation',[9.93,-4.23,13.75,-3.259],-3.15,0,wallmat)
    with BooleanWorkspace([cutter]) as workspace:
        for name in ('Proposal revision | Plot ground - title plan approximate',
                     'Proposal revision | Circular driveway - tarmac'):
            ob=scene.objects.get(name)
            if ob:
                workspace.difference(ob,[cutter],'Full gym-footprint basement excavation');mark(ob)
    b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)

    # Role-tag the specific exterior faces, retaining plaster on room faces.
    hanging=next(m for m in bpy.data.materials if m.get('appearance_role')=='dormer').copy()
    hanging.name='Appearance | dormer | Coordinated vertical roof tiles'
    # Pitched-roof materials project XY. Vertical cheeks need horizontal/Z
    # coursing in the native model as well as the viewer's dormer shader.
    texcoord=hanging.node_tree.nodes.new('ShaderNodeTexCoord')
    for node in hanging.node_tree.nodes:
        if node.type=='TEX_BRICK':
            hanging.node_tree.links.new(texcoord.outputs['UV'],node.inputs['Vector'])
    brick=bpy.data.materials['Red brown brick']
    finishes=[]
    for name,axis,sign,mat in [
        ('Proposal | North east elevation closure 0',1,1,hanging),
        ('Proposal | North east elevation closure 1',1,1,brick),
        *[(f'Proposal | Original loft dormer {side} cheek {part}',0,sign,hanging)
          for side,sign in [('west',-1),('east',1)] for part in ('pier 0','head 0')]]:
        ob=scene.objects[name];ob.data=ob.data.copy();ob.data.materials.append(mat)
        index=len(ob.data.materials)-1
        for face in ob.data.polygons:
            if (ob.matrix_world.to_3x3()@face.normal)[axis]*sign>.7:
                face.material_index=index
                for uv in ob.data.uv_layers:
                    for loop in face.loop_indices:
                        p=ob.matrix_world@ob.data.vertices[ob.data.loops[loop].vertex_index].co
                        uv.data[loop].uv=(p[1-axis],p.z)
        mark(ob);finishes.append({'object':name,'outsideMaterial':mat.name})
    ea=nav.setdefault('exteriorAppearance',{})
    ea.setdefault('materials',{})[hanging.name]={'role':'dormer','source':hanging.get('appearance_source_material',hanging.name)}
    for item in finishes:
        if item['outsideMaterial']==hanging.name:
            names=ea.setdefault('objects',{}).setdefault('dormer',[])
            if item['object'] not in names:names.append(item['object'])

    # Re-form both southern caps against the approved offset ridge.
    roof=nav['levelLoftStair']['roof']
    cap_names=[]
    for side,x in [('west',roof['eaves'][0]),('east',roof['eaves'][2])]:
        name='Proposal | Roof weathering | new main hip cap south '+side
        old=scene.objects.get(name)
        mat=old.data.materials[0] if old else next(m for m in bpy.data.materials if m.get('appearance_role')=='roof')
        if old:retire(old)
        a=Vector((x,roof['eaves'][1],5.37))
        c=Vector((roof['ridgeX'],roof['southRidgeY'],roof['ridgeZ']+.02))
        axis=(c-a).normalized();u=axis.cross(Vector((0,0,1))).normalized();v=axis.cross(u)
        # A narrow ridge strip; underside follows the two actual roof planes.
        ob=b.mesh('temporary hip cap '+side,
                  [tuple(p+u*dx+v*dy) for p in (a,c) for dx,dy in
                   [(-.0325,-.0325),(.0325,-.0325),(.0325,.0325),(-.0325,.0325)]],
                  [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],mat)
        ob.name=name;ob['source_name']=name;cap_names.append(name)

    # The accepted rooflights were added after the weathering pass. Cut their
    # clear apertures through every covering roof skin, including membranes.
    cutters=[b.box_bounds(f'temporary rooflight aperture {i}',r,7.59,8.10,wallmat)
             for i,r in enumerate(roof['rooflights'])]
    opened=[]
    with BooleanWorkspace(cutters) as workspace:
        for ob in list(scene.objects):
            if ob.type!='MESH' or not ob.name.startswith(
                ('Proposal | Roof weathering | wing dormer link','Proposal | Joined roof')):
                continue
            pts=[ob.matrix_world@Vector(v) for v in ob.bound_box]
            lo=[min(p[k] for p in pts) for k in range(3)]
            hi=[max(p[k] for p in pts) for k in range(3)]
            hits=[cut for r,cut in zip(roof['rooflights'],cutters)
                  if lo[0]<r[2] and hi[0]>r[0] and lo[1]<r[3] and hi[1]>r[1] and hi[2]>7.59]
            if hits:
                workspace.difference(ob,hits,'Clear retained rooflight aperture')
                if ob.data.polygons:mark(ob);opened.append(ob.name)
                else:retire(ob)
    for cutter in cutters:
        b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
    link=scene.objects['Proposal | Roof weathering | wing dormer link membrane']
    edit(link,lambda p:(p.x,max(-2.829,min(p.y,-.115)),p.z))

    # The original-house loft has its own roof lining. Stop the new-wing
    # vertical return at the house junction instead of carrying it into that room.
    lining_ob=scene.objects['Proposal | Level loft | 051 Scribed west loft lining']
    edit(lining_ob,lambda p:(p.x,min(p.y,-.115),min(p.z,7.60)))
    oak=bpy.data.materials['Interior | Landings natural oak']
    # This strip was cut out with the former loft stair and hidden by the long
    # lining. Restore its structural deck and continue the adjoining oak finish.
    b.box_bounds('loft room reclaimed deck',[5.50,-.115,7.30,4.95],5.35,5.55,
                 bpy.data.materials['Interior | Landings warm ivory'])
    b.mesh('loft room continuous oak floor',[(5.5,-.115,5.554),(7.3,-.115,5.554),
           (7.3,4.95,5.554),(5.5,4.95,5.554)],[(0,1,2,3)],oak)
    # Only the existing full-headroom band becomes a walking surface.
    ns.get('new_surfaces',nav['surfaces']).append(
        {'name':PREFIX+'loft room reclaimed deck','polygon':[[5.5,3.9712],[7.3,3.9712],
         [7.3,4.95],[5.5,4.95]],'z':5.55})
    retire(scene.objects['Proposal | Courtyard upper return'])
    for items in values('segments','new_segments'):
        items[:]=[item for item in items if item['name']!='Proposal | Courtyard upper return']
        for item in items:
            if item['name']==lining_ob.name:
                item['b'][1]=min(item['b'][1],-.115);item['top']=min(item['top'],7.60)
    area=abs(sum(a[0]*c[1]-c[0]*a[1] for a,c in zip(outer,outer[1:]+outer[:1])))/2
    basement=nav['proposalBasement']
    basement.update(outerBounds=[4.93,-16.306,13.98,-3.029],outerPolygon=outer,
                    outer_area_m2=round(area,6),fullMainWingFootprint=True,
                    addedFootprintM2=round(4.28*.971,6),
                    basis='20 October: full stepped main-wing footprint, including the enlarged gym; courtyard remains outside the basement shell.')
    if 'lifestyleProgramme' in spec:
        spec['lifestyleProgramme']['entertainment_basement'].update(basement)
    (ns['OUT']/'entertainment-basement-review.json').write_text(json.dumps(basement,indent=2)+'\n')
    b.finish({'revision':REVISION})
    report={'revision':REVISION,'basement':{'outerPolygon':outer,'roomPolygon':room,
              'areaM2':round(area,6),'addedAreaM2':round(4.28*.971,6)},
            'exteriorFaces':finishes,'hipCaps':cap_names,'rooflightCuts':opened,
            'removedObjects':removed,'changedObjects':sorted(o.name for o in changed),
            'newObjects':sorted(o.name for o in b.objects)}
    nav['basementRoofCorrections']=report
    scene['basement_roof_revision']=REVISION;scene['basement_roof_report']=json.dumps(report)
    return changed+b.objects,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    apply_corrections(globals())
