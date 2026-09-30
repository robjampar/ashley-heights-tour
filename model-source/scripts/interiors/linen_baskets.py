"""Owner-approved removable upper linen baskets, shared by builds and updates."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
def add_baskets(b):
 linen=b.material('basket woven oatmeal',(.43,.36,.27,1),.95)
 ivory=b.material('basket ivory trim',(.72,.68,.59,1),.8)
 dark=b.material('basket bronze pocket',(.06,.05,.04,1),.45,.5)
 for x in [.82,1.88]:
  for z in [4.122,4.523]:
   b.box('basket base',(x,3.56,z+.012),(.79,.34,.024),linen,.009)
   for xx in [x-.387,x+.387]:b.box('basket side',(xx,3.56,z+.15),(.018,.34,.28),linen,.006)
   for y in [3.397,3.723]:
    b.box('basket face',(x,y,z+.15),(.79,.018,.28),linen,.006)
    for dz in [.04,.10,.16,.22,.28]:b.box('woven horizontal band',(x,y+.011,z+dz),(.78,.004,.003),ivory,.001)
   b.box('label pocket',(x,3.739,z+.15),(.14,.006,.07),dark,.003);b.box('ivory label',(x,3.744,z+.15),(.11,.004,.043),ivory,.001)
