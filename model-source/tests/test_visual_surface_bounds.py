import json
from pathlib import Path
import struct
import tempfile
import unittest

import numpy as np

from scripts.audits.audit_visual_quality import mesh_bounds


class VisualSurfaceBoundsTests(unittest.TestCase):
    def test_cut_floor_bounds_ignore_degenerate_triangles_but_keep_real_extensions(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp)/'floor.glb'
            for height, expected in [(0,2),(0.02,50)]:
                vertices = np.array([[0,0,0],[2,0,0],[0,2,0],
                                     [20,0,0],[35,height,0],[50,0,0]],dtype='<f4')
                raw = vertices.tobytes()
                document = {
                    'asset':{'version':'2.0'},'scene':0,'scenes':[{'nodes':[0]}],
                    'nodes':[{'name':'floor','mesh':0,'translation':[3,4,5]}],
                    'meshes':[{'primitives':[{'attributes':{'POSITION':0}}]}],
                    'buffers':[{'byteLength':len(raw)}],
                    'bufferViews':[{'buffer':0,'byteLength':len(raw)}],
                    'accessors':[{'bufferView':0,'componentType':5126,'count':6,'type':'VEC3',
                                  'min':vertices.min(axis=0).tolist(),
                                  'max':vertices.max(axis=0).tolist()}],
                }
                content = json.dumps(document).encode()
                content += b' '*(-len(content)%4)
                path.write_bytes(struct.pack('<III',0x46546c67,2,28+len(content)+len(raw))+
                                 struct.pack('<II',len(content),0x4e4f534a)+content+
                                 struct.pack('<II',len(raw),0x004e4942)+raw)
                self.assertEqual(mesh_bounds(path)['floor'][1,0],53)
                actual = mesh_bounds(path,['floor'])['floor']
                np.testing.assert_allclose(actual,[[3,4,5],[expected+3,6,5]])


if __name__ == '__main__':
    unittest.main()
