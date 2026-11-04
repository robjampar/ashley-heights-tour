import bpy,sys
from pathlib import Path
R=Path(__file__).resolve().parents[2];bpy.ops.wm.open_mainfile(filepath=str(R/'outputs/output-bedroom4-stair-suite-compact/Ashley Heights — Proposed (compact).blend'))
for name in ['Interior | Landings natural oak','Interior | Hobby natural oak']:
 m=bpy.data.materials[name];print('MAT',name,[(n.name,n.type,[(s.name,str(s.default_value))for s in n.inputs if not s.is_linked and hasattr(s,'default_value')],n.image.filepath if n.type=='TEX_IMAGE'else None)for n in m.node_tree.nodes],[(l.from_node.name,l.from_socket.name,l.to_node.name,l.to_socket.name)for l in m.node_tree.links],flush=True)
