"""User-confirmed R5 roof and entrance corrections, applicable to a saved R4 scene."""
import bpy, math
from mathutils import Vector

PROJECTION=.215 # About one brick: user estimate, not surveyed.
FRONT_CENTER=6.94
BAY_LEFT,BAY_RIGHT=4.675,9.205

def apply_feedback(wall_specs):
    def remove(ob): bpy.data.objects.remove(ob,do_unlink=True)
    def world_edit(ob,fn):
        inv=ob.matrix_world.inverted()
        for v in ob.data.vertices:v.co=inv@Vector(fn(ob.matrix_world@v.co))
        ob.data.update()
    def make_box(name,x1,x2,y1,y2,z1,z2,layer):
        vs=[(x,y,z) for z in (z1,z2) for y in (y1,y2) for x in (x1,x2)]
        faces=[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)]
        mesh=bpy.data.meshes.new(name);mesh.from_pydata(vs,[],faces);mesh.update()
        ob=bpy.data.objects.new(name,mesh);bpy.data.collections[layer].objects.link(ob)
        ob['source_name']=name
        for m in ('Warm plaster','Red brown brick'):mesh.materials.append(bpy.data.materials[m])
        for i,p in enumerate(mesh.polygons):p.material_index=1 if i==2 else 0
        return ob
    for ob in list(bpy.data.objects):
        if ob.name in ('Balcony soffit','Balcony flat roof'):remove(ob)
        elif ob.name.startswith('Garage shallow barrel roof'):
            world_edit(ob,lambda v:(v.x,v.y,2.72+(.09 if v.z>2.72+.25*math.sin((v.x+5.4)/5.46*math.pi)+.045 else 0)))
            ob.name='Garage flat roof';ob['source_name']=ob.name
        elif ob.name.startswith('Garage curved timber roof beam'):
            world_edit(ob,lambda v:(v.x,v.y,v.z-.25*math.sin((v.x+5.4)/5.46*math.pi)))
            ob.name=ob.name.replace('curved','flat');ob['source_name']='Garage flat timber roof beam'
    roof=bpy.data.objects['Main hipped roof']
    vs=[tuple(roof.matrix_world@v.co) for v in roof.data.vertices][:6]
    # Retain the normal rear hip/eaves. No special canopy projecting over the balcony.
    inv=roof.matrix_world.inverted();roof.data.clear_geometry()
    roof.data.from_pydata([inv@Vector(v) for v in vs],[],[(0,1,5,4),(1,2,5),(2,3,4,5),(3,0,4)]);roof.data.update()
    # Original balcony photograph has dark metal rails.
    for ob in bpy.data.objects:
        if ob.type=='MESH' and ob.users_collection[0].name=='23 Balcony' and not ob.name.startswith(('Balcony deck','Balcony brick')):
            for i,m in enumerate(ob.data.materials):
                if m.name=='White joinery':ob.data.materials[i]=bpy.data.materials['Metal']
    # Match paired windows; central window, entrance and gable share one centreline.
    configs={
      'House front centre':[(6.94,1.665,0,2.49,'entry'),(5.40,.40,.95,2.05,'window'),(8.48,.40,.95,2.05,'window')],
      'First front':[(None,None,None,None,None),(6.94,1.33,.75,2.35,'window'),(5.50,.64,.75,1.97,'window'),(8.38,.64,.75,1.97,'window'),(None,None,None,None,None)]}
    new_specs=[]
    for name,updates in configs.items():
        spec=next(s for s in wall_specs if s['name']==name);f=spec['floor'];base=f*2.8;h=2.6 if f==0 else 2.45
        old=list(spec['openings']);new=[];maps=[]
        for op,change in zip(old,updates):
            dist,w,sill,head,kind=op;cx=spec['a'][0]-dist
            nc,nw,ns,nh,nk=change
            if nc is None:nc,nw,ns,nh,nk=cx,w,sill,head,kind
            new.append([spec['a'][0]-nc,nw,ns,nh,nk]);maps.append((cx,w,sill,head,nc,nw,ns,nh))
        knots=sorted([(a,b) for cx,w,s,h,nc,nw,ns,nh in maps for a,b in [(cx-w/2,nc-nw/2),(cx+w/2,nc+nw/2)]]+[(0,0),(13.98,13.98)])
        def xmap(x):
            for (a,b),(c,d) in zip(knots,knots[1:]):
                if a<=x<=c:return b+(x-a)/(c-a)*(d-b)
            return x
        for ob in list(bpy.data.objects):
            if ob.type!='MESH' or not ob.name.startswith(name):continue
            layer=ob.users_collection[0].name
            if layer.endswith('walls') and ' arched masonry infill' not in ob.name:
                remove(ob);continue
            if layer.endswith('Trim'):
                # Interior trim remains on the original inner face; track opening widths.
                world_edit(ob,lambda v:(xmap(v.x),v.y,v.z));continue
            center=sum((ob.matrix_world@v.co for v in ob.data.vertices),Vector())/len(ob.data.vertices)
            cx,w,sill,head,nc,nw,ns,nh=min(maps,key=lambda m:abs(m[0]-center.x))
            def transform(v):
                xx=nc+(v.x-cx)*nw/w
                zz=base+ns+(v.z-base-sill)*(nh-ns)/(head-sill)
                yy=v.y
                if BAY_LEFT<xx<BAY_RIGHT:
                    if layer.endswith('walls'): yy=.115+(v.y-.115)*(.23+PROJECTION)/.23
                    else: yy-=PROJECTION
                return xx,yy,zz
            world_edit(ob,transform)
        # Rebuild structural front face around the moved openings. Split at projected-bay returns.
        spec['openings']=new
        sorted_open=sorted([(spec['a'][0]-d-w/2,spec['a'][0]-d+w/2,s,h) for d,w,s,h,k in new])
        xa,xb=sorted((spec['a'][0],spec['b'][0]));spans=[];cursor=xa
        for l,r,s,h1 in sorted_open:
            if l>cursor:spans.append((cursor,l,0,h))
            if s>0:spans.append((l,r,0,s))
            if h1<h:spans.append((l,r,h1,h))
            cursor=r
        if cursor<xb:spans.append((cursor,xb,0,h))
        index=0
        for l,r,lo,hi in spans:
            edges=sorted(set([l,r]+[q for q in (BAY_LEFT,BAY_RIGHT) if l<q<r]))
            for aa,bb in zip(edges,edges[1:]):
                projected=BAY_LEFT<(aa+bb)/2<BAY_RIGHT
                make_box(name+' | corrected wall '+str(index),aa,bb,-.115-(PROJECTION if projected else 0),.115,base+lo,base+hi,f'{f+1}1 '+('Ground' if f==0 else 'First')+' floor - walls');index+=1
        # Retain the overall wall label for dimension audits; navigation uses per-section thickness.
        spec['front_projection_m']=PROJECTION;spec['projected_x_span']=[BAY_LEFT,BAY_RIGHT]
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        if ob.name.startswith('Front gable'):
            world_edit(ob,lambda v:(v.x+FRONT_CENTER-7.085,v.y-PROJECTION,v.z))
        elif ob.name.startswith(('Entrance porch','Entrance stone step','Porch pediment')):
            world_edit(ob,lambda v:(v.x,v.y-PROJECTION,v.z))
    return {'revision':'R5','garage_roof':'Flat outer roof at 2.81 m; flat beams beneath',
      'balcony':'Dedicated soffit/canopy removed; normal rear hip retained; open sky over outer deck',
      'front_projection_m':PROJECTION,'front_projection_basis':'User says about a single brick; 215 mm estimated',
      'front_centreline_x_m':FRONT_CENTER,'upper_side_windows':'Equal widths, sill/head heights and distance from centre',
      'interior_dimensions':'Existing inner front wall face retained at y=0.115 m'}
