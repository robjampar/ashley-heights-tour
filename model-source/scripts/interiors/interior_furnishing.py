"""Small native furnishing primitives shared by isolated and complete room builds."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import math


class RoomBuilder:
    def __init__(self, ns, area, prefix, collection_name):
        import bpy
        self.ns,self.scene,self.area,self.prefix=ns,ns['scene'],area,prefix
        self.objects=[];self.obstacles=[];self.removed=[]
        self.collection=bpy.data.collections.get(collection_name)
        if self.collection is None:self.collection=bpy.data.collections.new(collection_name)
        if self.collection.name not in self.scene.collection.children:self.scene.collection.children.link(self.collection)

    def remove(self,prefixes,within=None):
        import bpy
        owners=set(self.scene.collection.children_recursive)
        for ob in list(self.scene.objects):
            name=ob.get('source_name',ob.name)
            if not name.startswith(tuple(prefixes)+(self.prefix,)):continue
            if within is not None:
                from mathutils import Vector
                points=[ob.matrix_world@Vector(v)for v in ob.bound_box]
                if not all(within[i]-.0001<=p[i]<=within[i+3]+.0001 for p in points for i in range(3)):continue
            self.removed.append({'name':name,'object_name':ob.name})
            for collection in tuple(ob.users_collection):
                if collection in owners:collection.objects.unlink(ob)
            if not ob.users_collection:bpy.data.objects.remove(ob)
        if within is not None:return
        for key,pending in (('obstacles','new_obstacles'),('surfaces','new_surfaces'),('segments','new_segments')):
            for values in (self.ns['nav'].get(key,[]),self.ns.get(pending,[])):
                values[:]=[v for v in values if not v['name'].startswith(tuple(prefixes)+(self.prefix,))]

    def material(self,label,color,rough=.6,metal=0,texture=None,emission=0):
        import bpy
        name='Interior | '+self.area.title()+' '+label
        mat=bpy.data.materials.get(name) or bpy.data.materials.new(name)
        mat.use_nodes=True;nodes,links=mat.node_tree.nodes,mat.node_tree.links;nodes.clear()
        shader=nodes.new('ShaderNodeBsdfPrincipled');shader.inputs['Base Color'].default_value=color
        shader.inputs['Roughness'].default_value=rough;shader.inputs['Metallic'].default_value=metal
        if emission:shader.inputs['Emission Color'].default_value=color;shader.inputs['Emission Strength'].default_value=emission
        out=nodes.new('ShaderNodeOutputMaterial');links.new(shader.outputs['BSDF'],out.inputs['Surface'])
        if texture:
            image=bpy.data.images.load(str(self.ns['ROOT']/texture),check_existing=True);image.pack()
            tex=nodes.new('ShaderNodeTexImage');tex.image=image;tex.extension='REPEAT'
            uv=nodes.new('ShaderNodeTexCoord');links.new(uv.outputs['UV'],tex.inputs['Vector'])
            tint=nodes.new('ShaderNodeMix');tint.data_type='RGBA';tint.blend_type='MULTIPLY'
            tint.inputs[0].default_value=1;tint.inputs[7].default_value=color
            links.new(tex.outputs['Color'],tint.inputs[6]);links.new(tint.outputs[2],shader.inputs['Base Color'])
        mat.diffuse_color=color;mat['interior_room']=self.area
        self.ns['materials'][name]=mat;self.ns['PALETTE'][name]=list(color)
        return mat

    def mesh(self,label,vertices,faces,material,smooth=False):
        import bpy
        name=self.prefix+label;mesh=bpy.data.meshes.new(name);mesh.from_pydata(vertices,[],faces);mesh.update()
        ob=bpy.data.objects.new(name,mesh);self.collection.objects.link(ob);mesh.materials.append(material)
        ob['source_name']=name;ob['interior_room']=self.area;ob['interior_assembly']=label
        if smooth:
            for face in mesh.polygons:face.use_smooth=True
        self.objects.append(ob)
        self.uv(ob,.25 if any(t in material.name.lower() for t in ('upholstery','acoustic fabric')) else .5 if 'carpet' in material.name.lower() else 1)
        return ob

    def uv(self,ob,scale=1):
        uv=ob.data.uv_layers.get('UVMap') or ob.data.uv_layers.new(name='UVMap')
        for face in ob.data.polygons:
            n=face.normal;axes=(0,1) if abs(n.z)>.6 else (1,2) if abs(n.x)>abs(n.y) else (0,2)
            for index in face.loop_indices:
                p=ob.data.vertices[ob.data.loops[index].vertex_index].co;uv.data[index].uv=(p[axes[0]]/scale,p[axes[1]]/scale)

    def box(self,label,center,size,mat,bevel=0):
        x,y,z=center;a,b,c=[v/2 for v in size]
        vertices=[(x+dx*a,y+dy*b,z+dz*c)for dz in(-1,1)for dy in(-1,1)for dx in(-1,1)]
        faces=[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)]
        ob=self.mesh(label,vertices,faces,mat)
        if bevel:
            mod=ob.modifiers.new('Soft edge','BEVEL');mod.width=min(bevel,min(size)*.48);mod.segments=3;mod.affect='EDGES'
            mod=ob.modifiers.new('Weighted face normals','WEIGHTED_NORMAL');mod.keep_sharp=True
        return ob

    def box_bounds(self,label,bounds,bottom,top,mat,bevel=0):
        a,b,c,d=bounds;return self.box(label,((a+c)/2,(b+d)/2,(bottom+top)/2),(c-a,d-b,top-bottom),mat,bevel)

    def cylinder(self,label,center,radius,depth,mat,axis=(0,0,1),sides=32):
        from mathutils import Vector
        rotation=Vector((0,0,1)).rotation_difference(Vector(axis).normalized());origin=Vector(center)
        vertices=[list(origin+rotation@Vector((radius*math.cos(2*math.pi*i/sides),radius*math.sin(2*math.pi*i/sides),z)))for z in(-depth/2,depth/2)for i in range(sides)]
        faces=[tuple(reversed(range(sides))),tuple(range(sides,sides*2))]+[(i,(i+1)%sides,(i+1)%sides+sides,i+sides)for i in range(sides)]
        ob=self.mesh(label,vertices,faces,mat)
        for face in list(ob.data.polygons)[2:]:face.use_smooth=True
        return ob

    def tube(self,label,points,radius,mat,resolution=3):
        import bpy
        name=self.prefix+label;curve=bpy.data.curves.new(name,'CURVE');curve.dimensions='3D';curve.resolution_u=1
        curve.bevel_depth=radius;curve.bevel_resolution=resolution;curve.use_fill_caps=True
        path=curve.splines.new('POLY');path.points.add(len(points)-1)
        for vertex,point in zip(path.points,points):vertex.co=(*point,1)
        ob=bpy.data.objects.new(name,curve);self.collection.objects.link(ob);curve.materials.append(mat)
        ob['source_name']=name;ob['interior_room']=self.area;ob['interior_assembly']=label;self.objects.append(ob)
        return ob

    def ring(self,label,center,outer,inner,height,mat,sides=40):
        x,y,z=center
        vertices=[(x+r*math.cos(i*math.tau/sides),y+r*math.sin(i*math.tau/sides),z+dz)for dz in(-height/2,height/2)for r in(outer,inner)for i in range(sides)]
        faces=[]
        for i in range(sides):
            j=(i+1)%sides
            faces.extend([(i,j,j+2*sides,i+2*sides),(i+sides,i+3*sides,j+3*sides,j+sides),(i+2*sides,j+2*sides,j+3*sides,i+3*sides),(i,i+sides,j+sides,j)])
        return self.mesh(label,vertices,faces,mat)

    def lathe(self,label,center,profile,mat,sides=32,axis=(0,0,1)):
        from mathutils import Vector
        origin=Vector(center);rotation=Vector((0,0,1)).rotation_difference(Vector(axis).normalized())
        vertices=[list(origin+rotation@Vector((r*math.cos(i*math.tau/sides),r*math.sin(i*math.tau/sides),h)))for r,h in profile for i in range(sides)]
        faces=[(j*sides+i,j*sides+(i+1)%sides,(j+1)*sides+(i+1)%sides,(j+1)*sides+i)for j in range(len(profile)-1)for i in range(sides)]
        return self.mesh(label,vertices,faces,mat,True)

    def sphere(self,label,center,radius,mat):
        profile=[(radius*math.sin(i*math.pi/16),-radius*math.cos(i*math.pi/16))for i in range(17)]
        return self.lathe(label,center,profile,mat,24)

    def obstacle(self,label,bounds,bottom,top):
        item={'name':self.prefix+label,'box':list(bounds),'bottom':bottom,'top':top}
        self.ns['new_obstacles'].append(item);self.obstacles.append(item)

    def window_reveal(self,label,axis,inside,frame,a,d,sill,head,mat):
        """Thin internal plaster returns, ending at the inside of the frame."""
        mid=(inside+frame)/2;depth=abs(inside-frame)
        for name,zz in(('sill',sill+.001),('head',head-.001)):
            center=(mid,(a+d)/2,zz)if axis=='x'else((a+d)/2,mid,zz)
            size=(depth,d-a,.002)if axis=='x'else(d-a,depth,.002)
            self.box(label+' internal '+name,center,size,mat)
        for name,v in(('first jamb',a+.001),('second jamb',d-.001)):
            center=(mid,v,(sill+head)/2)if axis=='x'else(v,mid,(sill+head)/2)
            size=(depth,.002,head-sill)if axis=='x'else(.002,depth,head-sill)
            self.box(label+' internal '+name,center,size,mat)

    def light(self,label,position,intensity=.35,power=35,range_m=3.5):
        import bpy
        name=self.prefix+label;light=bpy.data.lights.new(name,'POINT');light.energy=power;light.color=(1,.83,.65);light.shadow_soft_size=.28
        ob=bpy.data.objects.new(name,light);ob.location=position;self.collection.objects.link(ob);ob['source_name']=name;ob['interior_room']=self.area
        self.objects.append(ob);self.ns['nav'].setdefault('proposalLights',[]).append({'name':name,'position':list(position),'range':range_m,'intensity':intensity})

    def finish(self,config):
        import bpy,json
        self.scene.view_layers[0].update()
        # The complete-house geometry dump exports meshes. Resolve small tube
        # primitives here so cables, handles and stitching are present in every
        # output, not only the native renderer.
        deps=bpy.context.evaluated_depsgraph_get()
        for i,ob in enumerate(self.objects):
            if ob.type!='CURVE':continue
            name=ob.name;mesh=bpy.data.meshes.new_from_object(ob.evaluated_get(deps))
            replacement=bpy.data.objects.new(name+' mesh',mesh);self.collection.objects.link(replacement)
            replacement.matrix_world=ob.matrix_world.copy()
            for key in ob.keys():replacement[key]=ob[key]
            bpy.data.objects.remove(ob,do_unlink=True);replacement.name=name;self.objects[i]=replacement
        self.scene.view_layers[0].update()
        record={'area':self.area,'revision':config['revision'],'objects':len(self.objects),'mesh_objects':sum(o.type=='MESH'for o in self.objects),'lights':sum(o.type=='LIGHT'for o in self.objects),'removed_objects':self.removed,'collision_records':self.obstacles,'configuration':config}
        self.ns['nav'].setdefault('interiorRooms',{})[self.area]={'revision':config['revision'],'status':'developed concept','objects':len(self.objects)}
        (self.ns['OUT']/(self.area+'-interior-report.json')).write_text(json.dumps(record,indent=2)+'\n')
        print('ROOM_INTERIOR',self.area,len(self.objects),'objects',flush=True);return record
