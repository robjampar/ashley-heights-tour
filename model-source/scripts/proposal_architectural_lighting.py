"""Small, physical proposal fixtures for the arrival, rear facade and pool.

Sources remain in the editable native model. The browser gets their visible
meshes/emission without adding more per-frame shadow lights. No source house
objects or materials are altered, and no room/door/navigation geometry moves.
"""
_lighting_report={'fixtures':[], 'additional_browser_point_lights':0,
                  'original_geometry_changed':False}

def _architectural_spot(name,position,direction,power,angle,color=(1,.76,.49)):
    data=bpy.data.lights.new(name,'SPOT');data.energy=power
    data.color=color;data.spot_size=math.radians(angle);data.spot_blend=.65
    data.shadow_soft_size=.025
    ob=bpy.data.objects.new(name,data);collection(I).objects.link(ob)
    ob.location=position
    ob.rotation_euler=Vector(direction).to_track_quat('-Z','Y').to_euler()
    _lighting_report['fixtures'].append({'source':name,'position_m':list(position),
        'direction':list(direction),'power_w':power,'cone_degrees':angle})
    return ob

def _fixture_part(ob,label):
    ob['proposal_light_fixture']=label
    return ob

# The four earlier fittings now sit outside their actual wall faces. Add a
# matching upper lens and connect each visible lens to a small native source.
for index,(x,y,z,normal) in enumerate([
    (4.88,float(spec['entranceBay']['y'][0])+.56,2.0,(-1,0)),(4.88,float(spec['entranceBay']['y'][1])-.30,2.0,(-1,0)),
    (.45,-.16,1.9,(0,-1)),(4.15,-.16,1.9,(0,-1))]):
    label='Arrival sconce '+str(index+1)
    for ob in list(scene.objects):
        if ob.type!='MESH' or not ob.name.startswith(('Proposal | Bronze wall light body','Proposal | Wall light warm lens')):continue
        points=[ob.matrix_world@v.co for v in ob.data.vertices]
        centre=Vector(tuple((min(p[i]for p in points)+max(p[i]for p in points))/2 for i in range(3)))
        if abs(centre.x-x)<.002 and abs(centre.y-y)<.002 and abs(centre.z-z)<.15:
            _fixture_part(ob,label)
    _fixture_part(cylinder('Proposal | Arrival sconce upper lens '+str(index+1),
             (x,y,z+.125),.031,.014,warm,I,16),label)
    for sign in (-1,1):
        _fixture_part(_architectural_spot('Proposal | Arrival sconce '+str(index+1)+(' up' if sign>0 else ' down'),
            (x,y,z+sign*.144),(normal[0]*.11,normal[1]*.11,sign),9,56),label)

# Existing rear masonry stays in place. All four bodies mount on opaque brick
# piers rather than glazing or the balcony door openings.
for index,x in enumerate((.55,4.55,9.65,13.50)):
    y,z=9.00,3.50
    label='Rear sconce '+str(index+1)
    _fixture_part(box('Proposal | Rear bronze sconce '+str(index+1),(x,y,z),(.08,.085,.25),black,I),label)
    for sign in (-1,1):
        _fixture_part(cylinder('Proposal | Rear sconce lens '+str(index+1)+' '+str(sign),
                 (x,y,z+sign*.131),.031,.012,warm,I,16),label)
        _fixture_part(_architectural_spot('Proposal | Rear sconce '+str(index+1)+(' up' if sign>0 else ' down'),
            (x,y,z+sign*.146),(0,.09,sign),12,60),label)

# A recessed channel above the new garage's moving opening washes the timber.
# It is fixed to the head; none of these pieces belongs to the garage leaf.
_gfx=spec['frontWing'][0]-spec['garageBay']['projection_m']-.10;_gdc=sum(spec['garageBay']['door_y'])/2
_fixture_part(box('Proposal | Garage soffit light channel',(_gfx,_gdc,2.525),(.075,5.0,.032),black,I),'Garage timber wash')
_fixture_part(box('Proposal | Garage soffit warm diffuser',(_gfx,_gdc,2.507),(.042,4.92,.008),warm,I),'Garage timber wash')
_data=bpy.data.lights.new('Proposal | Garage timber wash','AREA')
_data.energy=65;_data.color=(1,.78,.54);_data.shape='RECTANGLE'
_data.size=4.92;_data.size_y=.042
_ob=bpy.data.objects.new(_data.name,_data);collection(I).objects.link(_ob)
_ob.location=(_gfx,_gdc,2.497);_ob.rotation_euler=(0,0,math.pi/2)
_fixture_part(_ob,'Garage timber wash')
_lighting_report['fixtures'].append({'source':_ob.name,'position_m':list(_ob.location),
    'power_w':65,'size_m':[4.92,.042],'fixed_above_moving_garage_leaf':True})

# Surface-mounted pool lenses sit just inside the east shell face; they do
# not pretend to define underground services or an electrical installation.
_pool_lens=mat('Pool light frosted lens',(.62,.80,.91,1),.26,0,4)
for index,y in enumerate(() if PLANNING else (18.0,20.0,22.0)):
    x,z=9.884,-.49
    for suffix,radius,xx,material in [('bezel',.079,x,black),('lens',.066,x-.009,_pool_lens)]:
        verts=[(xx+depth,y+radius*math.cos(j*math.tau/24),z+radius*math.sin(j*math.tau/24))
               for depth in (-.004,.004)for j in range(24)]
        faces=[tuple(reversed(range(24))),tuple(range(24,48))]+[
            (j,(j+1)%24,(j+1)%24+24,j+24)for j in range(24)]
        _fixture_part(mesh('Proposal | Pool light '+str(index+1)+' '+suffix,verts,faces,material,I),'Pool light '+str(index+1))
    _fixture_part(_architectural_spot('Proposal | Pool underwater light '+str(index+1),
        (x-.018,y,z),(-1,0,-.13),22,105,(.66,.83,1)),'Pool light '+str(index+1))

# Refraction is native-only; the walkthrough's existing lightweight water
# shader retains its own ripple/reflection treatment and source alpha.
_water_shader=materials[water].node_tree.nodes.get('Principled BSDF')
_water_shader.inputs['IOR'].default_value=1.333
_water_shader.inputs['Transmission Weight'].default_value=.90
_water_shader.inputs['Roughness'].default_value=.10
(OUT/'architectural-lighting-review.json').write_text(json.dumps(_lighting_report,indent=2)+'\n')
