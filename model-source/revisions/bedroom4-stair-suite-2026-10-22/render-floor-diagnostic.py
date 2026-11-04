from pathlib import Path
p=Path(__file__).with_name('render-integrated.py');s=p.read_text();at=s.index("views=[('approach'")
s=s[:at]+'''for label in ['Hobby 01 | oak hobby floor','Basement full | loft room continuous oak floor']:
    ob=scene.objects.get(label)
    print('FLOOR_FLAGS',label,{k:getattr(ob,k,None)for k in ['hide_render','is_holdout','is_shadow_catcher','visible_camera','visible_shadow','visible_diffuse']},flush=True)
    mat=bpy.data.materials.new('Diagnostic pink');mat.use_nodes=True;mat.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=(.8,.12,.3,1);mat.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.8
    ob.data=ob.data.copy();ob.data.materials[0]=mat
'''+s[at:]
s=s.replace("('arrival',", "('floor-diagnostic',").replace('scene.cycles.samples=16','scene.cycles.samples=8').replace('resolution_x=1080;scene.render.resolution_y=720','resolution_x=900;scene.render.resolution_y=600')
exec(compile(s,str(p),'exec'))
