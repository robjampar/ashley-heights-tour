"""Prepare exact, reviewable native edits from the current compact export."""
import json,math,hashlib
from pathlib import Path
import numpy as np
from shapely.geometry import box,Polygon
from shapely.ops import triangulate as triangles2d
from scripts.structure.build_study import triangulate,footprint
from scripts.structure.junctions import horizontal_layer

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'proposal/specs/sw02-native-integration.json'


def build():
    source=ROOT/'outputs/output-proposed-compact/geometry.json';g=json.loads(source.read_text())
    objects={e['object_name']:e for e in g['objects'] if e.get('vertices')};ops={};retire=set();new=[];meshes={}
    def bounds(e):
        v=np.array(e['vertices']);return [v.min(axis=0).tolist(),v.max(axis=0).tolist()]
    def op(name):return ops.setdefault(name,{'name':name,'before':bounds(objects[name]),'maps':[]})
    def translate(name,dx=0,dy=0):op(name)['maps'].append({'translate':[dx,dy,0]})
    def mapping(name,axis,old,new):op(name)['maps'].append({'axis':axis,'old':old,'new':new})
    def remap_bound(name,axis,low=None,high=None):
        a,b=bounds(objects[name]);mapping(name,axis,[a[axis],b[axis]],[a[axis] if low is None else low,b[axis] if high is None else high])
    def rigid(name,old,new,angle):op(name)['maps'].append({'rotateZ':angle,'origin':old,'destination':new})
    def addbox(name,lo,hi,material_from,finish=True):new.append({'name':name,'low':lo,'high':hi,'materialFrom':material_from,'finish':finish})
    def replacement(name,poly):
        e=objects[name];a,b=bounds(e)
        if poly.is_empty:raise ValueError('Empty replacement '+name)
        if b[2]-a[2]>1e-6:tri=horizontal_layer(poly,a[2],b[2])
        else:
            tri=[]
            for t in triangles2d(poly):
                if poly.covers(t.representative_point()) and t.intersection(poly).area>t.area-1e-8:
                    pts=list(t.exterior.coords)[:3]
                    if 'ceiling' in name.lower():pts.reverse()
                    tri.extend([[x,y,a[2]]for x,y in pts])
        meshes[name]={'name':name,'before':bounds(e),'triangles':tri}
    dx=.3575;gx=-1.86;oldcol=box(8.215,-8.745,8.425,-8.525);panel=box(9.335,-11.13,9.96,-10.89)
    # Retire the previous full-height casing. Heal its small local cuts without
    # changing the actual stair/entrance openings or any floor level.
    for name,e in objects.items():
        if name.startswith('Structure fit | stair-side column'):retire.add(name)
        a,b=bounds(e)
        if any(t in name.lower() for t in ('floor','ceiling','carpet')) and a[2]<5.193 and b[2]>-3 and box(a[0],a[1],b[0],b[1]).intersects(oldcol):
            p=footprint(triangulate(e));patch=oldcol.intersection(box(a[0],a[1],b[0],b[1]))
            if patch.area and b[2]-a[2]<.05:replacement(name,p.union(patch))
    # Reconstitute the former wall interruption at the suite entrance.
    name='Proposal | Principal suite north partition pier 0'
    meshes[name]={'name':name,'before':bounds(objects[name]),'box':[[5.045,-8.76,2.8],[8.47,-8.64,5.163]]}
    # Garage partition: keep canonical body names/IDs; change thickness and
    # move the opening into the enlarged service/gym-storage area.
    for name in ('Proposal | Garage east separation pier 0','Proposal | Garage east separation head 0','Proposal | Garage east separation end pier'):
        remap_bound(name,0,9.3325,9.5775)
        remap_bound(name,2,high=2.756)
    remap_bound('Proposal | Garage east separation pier 0',1,high=-12.4)
    remap_bound('Proposal | Garage east separation head 0',1,-12.4,-11.45)
    remap_bound('Proposal | Garage east separation end pier',1,low=-11.45)
    remap_bound('Proposal | Boot utility partition pier 0',0,low=9.5775)
    for name in ('Garage 01 | durable grey skirting','Garage 01 | durable grey skirting.002'):remap_bound(name,0,high=9.3225)
    for name,yr in [('Garage 01 | durable grey skirting.003',[-16.06,-12.42]),('Garage 01 | durable grey skirting.004',[-11.43,-10.035])]:
        remap_bound(name,0,9.3175,9.3315);remap_bound(name,1,*yr)
    remap_bound('Gym 01 | utility return skirting',0,9.5795,9.5995)
    remap_bound('Gym 01 | utility return skirting',1,low=-11.43)
    remap_bound('Gym 01 | south return skirting',0,high=9.5775)
    # Cinema bearing wall and all attached finishes south of its doorway.
    cinema_y_old=[-16.076,-15.35,-10.85,-10.0,-9.7825]
    cinema_y_new=[-16.076,-15.35,-12.4,-11.45,-9.7825]
    console_groups=('Bar detail | west library','Bar detail | library inset','Bar detail | console ','Bar detail | west artwork','Bar detail | library brass pull','Bar detail | library horizontal book','Bar detail | book 0 bound cover','Bar detail | book 1 bound cover','Bar detail | book 2 bound cover','Bar detail | book 3 bound cover')
    for name,e in objects.items():
        a,b=bounds(e)
        if name.startswith(console_groups):rigid(name,[9.4,-13.1],[8.8,-4.45],-math.pi/2);continue
        if name.startswith('Proposal | Cinema east wall') and 'door 0' not in name:
            translate(name,dx);mapping(name,1,cinema_y_old,cinema_y_new)
        elif name.startswith('Proposal | Cinema east wall door 0'):translate(name,dx)
        elif name.startswith('Cinema 01 | ') and a[0]>8.8 and b[0]<9.25:
            translate(name,dx)
            if a[1]<-10.85:mapping(name,1,cinema_y_old,cinema_y_new)
        elif name.startswith('Bar detail | panelling west bar'):
            if b[1]>-10.85:retire.add(name)
            else:translate(name,dx);mapping(name,1,cinema_y_old,cinema_y_new)
        elif name.startswith(('Bar detail | west wall sconce','Bar detail | west sconce brass backplate','Bar detail | panelling cinema corner')):
            translate(name,dx)
            if a[1]<-10.85:mapping(name,1,cinema_y_old,cinema_y_new)
        if name.startswith('Proposal | Compact car G1'):translate(name,-.4275)
        if name.startswith('Garage 01 | ') and a[0]>10.4 and b[1]<-14.0:
            rigid(name,[10.885,-15.04],[9.8925,-15.04],math.pi)
        if name.startswith('Utility 01 | west oak skirting'):retire.add(name)
        if name.startswith('Utility 01 | floor tile fine joint'):
            if b[0]-a[0]>1:remap_bound(name,0,low=9.5825)
    mapping('Proposal | Cinema north wall',0,[5.16,9.43,9.45],[5.16,9.43,9.5775])
    remap_bound('Proposal | Cinema south wall',0,high=9.3325)
    name='Proposal | Cinema east wall head 1'
    ops[name]['maps']=[{'translate':[dx,0,0]}]
    remap_bound(name,1,-12.4,-11.45)
    # The new north pier is real geometry; there was no corresponding long
    # pier in the former doorway position.
    addbox('SW02 | Cinema east north pier',[9.3325,-11.45,-2.8],[9.5775,-9.905,-.325],'Proposal | Cinema east wall pier 1',False)
    for name,e in objects.items():
        a,b=bounds(e)
        if name.startswith('Proposal | Garage north store separation') and abs(b[0]-11.315)<.01:remap_bound(name,0,high=9.455)
        if 'Utility' in name and name.startswith('Proposal | ') and abs(a[0]-11.43)<.01 and abs(a[1]+12.61)<.02:remap_bound(name,0,low=9.5775)
    # Repair the affected finish polygons using their true outlines, rather
    # than scaling rooms or bridging real floor openings.
    basal=[box(9.3325,-16.076,9.5775,-15.95),box(9.3325,-15.35,9.5775,-12.4),box(9.3325,-11.45,9.5775,-9.905),box(5.16,-10.0275,9.5775,-9.7825),box(5.16,-15.29,9.3325,-15.17)]
    ground=[box(9.3325,-16.191,9.5775,-12.4),box(9.3325,-11.45,9.5775,-9.905)]
    for name,e in objects.items():
        a,b=bounds(e)
        if not any(t in name.lower()for t in ('floor','ceiling','carpet')) or b[2]-a[2]>.05:continue
        if name in meshes and 'triangles'in meshes[name]:p=footprint(meshes[name]['triangles'])
        else:p=footprint(triangulate(e))
        changed=False
        if name in ('Cinema 01 | fitted carpet','Cinema 01 | acoustic ceiling lining'):
            p=box(5.165,-15.165,9.3285,-10.032)
            if 'carpet'in name:p=p.union(box(9.3285,-12.341,9.58,-11.509))
            replacement(name,p);ops.pop(name,None);continue
        if name.startswith('Garage 01') and ('floor'in name or 'ceiling'in name) and b[0]>9.4:p=p.intersection(box(-100,-100,9.3285,100));changed=True
        if name.startswith('Utility 01') and ('floor'in name or 'ceiling'in name) and b[0]-a[0]>2:p=p.union(box(9.5815,a[1],a[0]+.001,b[1]));changed=True
        if name.startswith('Gym 01') and ('floor'in name or 'ceiling'in name):p=p.union(box(9.5815,-12.5,11.431,-9.85));changed=True
        if name in ('Bar 01 | limestone floor finish','Bar 01 | ivory ceiling lining','Proposal | Entertainment basement floor','Proposal | Entertainment basement ceiling'):
            p=p.union(box(8.975,-15.35,9.22,-10.85).intersection(box(a[0],a[1],b[0],b[1])))
            for cut in basal:p=p.difference(cut)
            if a[2]>-.7:p=p.difference(box(9.3325,-16.076,9.5775,-9.905))
            changed=True
        if -.05<=a[2]<2.5 and not name.startswith(('Utility 01','Gym 01','Garage 01')):
            for cut in ground:
                if p.intersects(cut):p=p.difference(cut);changed=True
            if a[2]>2.333 and p.intersects(box(9.3325,-12.4,9.5775,-11.45)):
                p=p.difference(box(9.3325,-12.4,9.5775,-11.45));changed=True
        if 2.7<a[2]<5.2 and p.intersects(panel):p=p.difference(panel);changed=True
        if changed:replacement(name,p)
    # Keep the suite furniture exactly where it is. A hollow finish enclosure
    # replaces only the first 60 mm of the existing media partition.
    remap_bound('Bedroom 02 | north media partition',0,low=9.96)
    for label,lo,hi in [('west',[9.335,-11.13,2.8],[9.36,-10.89,5.1956]),('south',[9.36,-11.13,2.8],[9.96,-11.105,5.1956]),('north',[9.36,-10.915,2.8],[9.96,-10.89,5.1956]),('end',[9.935,-11.105,2.8],[9.96,-10.915,5.1956])]:
        addbox('SW02 | Suite support '+label+' lining',lo,hi,'Bedroom 02 | north media partition')
    addbox('SW02 | Utility west skirting',[9.5775,-16.076,.012],[9.5935,-12.61,.12],'Utility 01 | west oak skirting')
    # Finished jamb/stop/architrave assemblies around standard 826 mm leaves.
    # 950 mm rough openings include 31 mm packed returns each side.
    doors=[]
    for label,prefix,z0,head,angle in [('Garage','Proposal | Garage east separation door 0',0,2.3,-math.pi/2),('Cinema','Proposal | Basement cinema door',-2.8,-.65,math.pi/2)]:
        old=[11.315,-13.4] if label=='Garage'else[9.16,-10.425]
        width=.9 if label=='Garage'else .85
        for name,e in objects.items():
            a,b=bounds(e)
            if name.startswith(prefix):
                translate(name,9.455-old[0],-11.925-old[1]);mapping(name,1,[-11.925-width/2,-11.925+width/2],[-12.338,-11.512])
                rigid(name,[9.455,-11.925],[9.455,-11.925],math.pi)
            if name.startswith(('Frame detail','Construction detail')) and a[0]>old[0]-.3 and b[0]<old[0]+.3 and a[1]>old[1]-.7 and b[1]<old[1]+.7 and a[2]>=z0-.01 and b[2]<head+.15:retire.add(name)
        mat=prefix+' leaf'
        for side,yl,yh in [('south',-12.369,-12.341),('north',-11.509,-11.481)]:
            addbox('SW02 | '+label+' '+side+' jamb',[9.3315,yl,z0],[9.5785,yh,head+.003],mat)
        addbox('SW02 | '+label+' head lining',[9.3315,-12.369,head+.003],[9.5785,-11.481,head+.031],mat)
        for yl,yh in [(-12.4,-12.369),(-11.481,-11.45)]:addbox('SW02 | '+label+' packed jamb '+str(yl),[9.3325,yl,z0],[9.5775,yh,head+.031],mat)
        for side,xx in [('front',9.3195),('back',9.5785)]:
            for j,(yl,yh)in enumerate([(-12.406,-12.346),(-11.504,-11.444)]):addbox('SW02 | '+label+' '+side+' arch '+str(j),[xx,yl,z0],[xx+.012,yh,head+.008],mat)
            addbox('SW02 | '+label+' '+side+' head arch',[xx,-12.406,head+.008],[xx+.012,-11.444,head+.068],mat)
        for j,(yl,yh)in enumerate([(-12.346,-12.324),(-11.526,-11.504)]):addbox('SW02 | '+label+' stop '+str(j),[9.413,yl,z0],[9.429,yh,head+.003],mat)
        addbox('SW02 | '+label+' head stop',[9.413,-12.341,head-.014],[9.429,-11.509,head+.008],mat)
        doors.append({'id':prefix,'hinge':[9.455,-12.338,z0],'openingCenter':[9.455,-11.925,z0],'apertureAxis':[0,1],'apertureWidth':.826,'openDelta':angle})
    # New northern cinema wall finish and continuation of the bar panelling.
    addbox('SW02 | Cinema north east acoustic lining',[9.296,-11.39,-2.79],[9.331,-10.03,-.466],'Cinema 01 | east acoustic lining')
    addbox('SW02 | Bar north pier lining',[9.5785,-11.44,-2.788],[9.5845,-10.032,-.466],'Bar detail | panelling west bar cream wall lining')
    for z,h in [(-2.70,.18),(-1.98,.025),(-.53,.04)]:addbox('SW02 | Bar north pier mould '+str(z),[9.5845,-11.44,z-h/2],[9.6115,-10.032,z+h/2],'Bar detail | west library walnut console' if z<-2.5 else 'Bar detail | panelling west bar cream wall lining')
    # Material references may have Blender suffixes; choose a stable matching
    # source and fail rather than silently use a random replacement material.
    for item in new:
        target=item['materialFrom']
        if target not in objects:
            matches=[n for n in objects if n.startswith(target)]
            if not matches:raise ValueError('Material reference not found: '+target)
            item['materialFrom']=matches[0]
    # Replacement geometry takes precedence over affine edits of the same body.
    retire.add('Proposal | Cinema east wall end pier')
    for name in retire:ops.pop(name,None)
    for name in meshes:ops.pop(name,None)
    result={'revision':'SW02-native-2026-10-27','sourceGeometrySHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'operations':list(ops.values()),'replacementMeshes':list(meshes.values()),'retire':sorted(retire),'boxes':new,'doors':doors,
            'consoleTransform':{'origin':[9.4,-13.1],'destination':[8.8,-4.45],'rotateZ':-math.pi/2},'published':False,'approvedForConstruction':False}
    OUT.write_text(json.dumps(result,indent=2)+'\n');print({'operations':len(ops),'replacements':len(meshes),'retired':len(retire),'boxes':len(new)})


if __name__=='__main__':build()
