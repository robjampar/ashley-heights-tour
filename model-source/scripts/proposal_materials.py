"""World-scaled finish detail for proposal renders; original materials are untouched."""
proposal_roof_material=mat('Slate roof anthracite',(.048,.056,.060,1),.83)
m=materials[proposal_roof_material];nodes=m.node_tree.nodes;links=m.node_tree.links;shader=nodes.get('Principled BSDF')
geo=nodes.new('ShaderNodeNewGeometry');pos=nodes.new('ShaderNodeSeparateXYZ');normal=nodes.new('ShaderNodeSeparateXYZ');links.new(geo.outputs['Position'],pos.inputs[0]);links.new(geo.outputs['Normal'],normal.inputs[0])
absx=nodes.new('ShaderNodeMath');absx.operation='ABSOLUTE';absy=nodes.new('ShaderNodeMath');absy.operation='ABSOLUTE';links.new(normal.outputs['X'],absx.inputs[0]);links.new(normal.outputs['Y'],absy.inputs[0])
which=nodes.new('ShaderNodeMath');which.operation='GREATER_THAN';links.new(absx.outputs[0],which.inputs[0]);links.new(absy.outputs[0],which.inputs[1])
mixx=nodes.new('ShaderNodeMixRGB');mixx.blend_type='MIX';mixy=nodes.new('ShaderNodeMixRGB');mixy.blend_type='MIX'
for n in(mixx,mixy):links.new(which.outputs[0],n.inputs[0])
links.new(pos.outputs['X'],mixx.inputs[1]);links.new(pos.outputs['Y'],mixx.inputs[2]);links.new(pos.outputs['Y'],mixy.inputs[1]);links.new(pos.outputs['X'],mixy.inputs[2])
vec=nodes.new('ShaderNodeCombineXYZ');links.new(mixx.outputs[0],vec.inputs['X']);links.new(mixy.outputs[0],vec.inputs['Y'])
brick=nodes.new('ShaderNodeTexBrick');brick.offset=.5;brick.offset_frequency=2
brick.inputs['Color1'].default_value=(.035,.043,.048,1);brick.inputs['Color2'].default_value=(.068,.077,.080,1);brick.inputs['Mortar'].default_value=(.014,.017,.019,1)
brick.inputs['Scale'].default_value=1;brick.inputs['Mortar Size'].default_value=.004;brick.inputs['Mortar Smooth'].default_value=.005;brick.inputs['Brick Width'].default_value=.29;brick.inputs['Row Height'].default_value=.16
links.new(vec.outputs[0],brick.inputs['Vector']);links.new(brick.outputs['Color'],shader.inputs['Base Color'])
inv=nodes.new('ShaderNodeMath');inv.operation='MULTIPLY';inv.inputs[1].default_value=-1;links.new(brick.outputs['Fac'],inv.inputs[0]);bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.24;bump.inputs['Distance'].default_value=.008;links.new(inv.outputs[0],bump.inputs['Height']);links.new(bump.outputs['Normal'],shader.inputs['Normal'])
# Fine render/plaster roughness in metres, without altering the source geometry.
for name,scale,strength,distance in[(white,140,.1,.002),(plaster,180,.07,.001),(stone,110,.16,.0025),(oak,25,.11,.0015)]:
 m=materials[name];nodes=m.node_tree.nodes;links=m.node_tree.links;b=nodes.get('Principled BSDF');geo=nodes.new('ShaderNodeNewGeometry');noise=nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=scale;noise.inputs['Detail'].default_value=2
 links.new(geo.outputs['Position'],noise.inputs['Vector']);bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=strength;bump.inputs['Distance'].default_value=distance;links.new(noise.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs['Normal'],b.inputs['Normal'])
