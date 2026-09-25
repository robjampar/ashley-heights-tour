"""Loads one geometry+navigation export (existing house or a proposal variant)
as numpy-backed objects with a layer classification and interior culling.

Existing house: output-walkthrough/geometry.json + walkthrough/public/navigation.json
Proposal:       output-proposed[-compact]/{geometry,navigation}.json

Coordinates are model metres: x east(ish), y towards the rear garden, z up.
"""
import json, re, hashlib, pickle, datetime
from pathlib import Path
import numpy as np
from shapely.geometry import Polygon, MultiPoint, box
from shapely.ops import unary_union

from .context import ROOT

CACHE = ROOT / '.cache' / 'planning_drawings'

# Existing-house layers (scripts/build_model.py) and proposal collections.
EXISTING_ENVELOPE_LAYERS = ('10', '11', '12', '13', '20', '21', '22', '23', '30', '40', '41')
FURNITURE = re.compile(r'sofa|chair|desk|mattress|cushion|wardrobe|curtain|radiator|towel|tap |toilet|basin|oven|hob|lamp|chandelier|'
                       r'blossom|foliage|tree |tree$|hedge|grass|fountain|plate|photo|painting|mirror|picture|shelf|book|shell rib|'
                       r'scalloped|swag|dining table|bed |bed$|rug|vase|bottle|glass ware|stool|bench|pillow|linen|table|cabinet|'
                       r'dresser|sideboard|display|ornament|pendant|downlight|spot|fitting|diffuser|treadmill|bike|rower|rack|dumbbell|'
                       r'pool table|cinema seat|projector|speaker|car |car$|planter|olive|box hedge|topiary|lawn|gravel|paving|path|'
                       r'stepping stone|boiler|pipe|cistern|vanity|shower|bath ', re.I)
FENCE = re.compile(r'fence|vertical board|timber post|boundary|gate', re.I)


def _sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


class Obj:
    __slots__ = ('name', 'object_name', 'layer', 'v', 'faces', 'materials', 'low', 'high', 'category', 'material_class', 'leaf')

    def __init__(self, o, category):
        self.name = o['name']; self.object_name = o.get('object_name', o['name']); self.layer = o['layer']
        self.v = np.asarray(o['vertices'], dtype=float).reshape(-1, 3)
        self.faces = o['faces']; self.materials = o.get('materials', [])
        self.low = self.v.min(axis=0) if len(self.v) else np.zeros(3); self.high = self.v.max(axis=0) if len(self.v) else np.zeros(3)
        self.category = category; self.material_class = material_class(self.materials, self.name)
        self.leaf = bool(o.get('walkthrough_opening_leaf'))

    def bbox2d(self):
        return box(self.low[0], self.low[1], self.high[0], self.high[1])

    def hull2d(self):
        return MultiPoint([(x, y) for x, y in self.v[:, :2]]).convex_hull


def material_class(materials, name=''):
    m = ' '.join(materials).lower() + ' ' + name.lower()
    if 'glaz' in m or 'glass' in m or 'window pane' in m:
        return 'glass'
    if 'slate' in m or 'roof tiles' in m or 'roof' in m and 'membrane' in m or 'zinc' in m or 'membrane' in m:
        return 'roof'
    if 'render' in m or 'limestone render' in m:
        return 'render'
    if 'brick' in m:
        return 'brick'
    if 'white joinery' in m or 'white' in m and 'dormer' in m or 'cladding' in m:
        return 'white'
    if 'oak' in m or 'timber' in m:
        return 'timber'
    if 'stone' in m or 'concrete' in m or 'paving' in m:
        return 'stone'
    if 'black' in m or 'bronze' in m or 'metal' in m or 'anthracite' in m:
        return 'dark'
    return 'neutral'


class SourceModel:
    def __init__(self, tag, geometry_path, navigation_path, blend_path=None, variant=None):
        self.tag = tag; self.variant = variant
        self.geometry_path = Path(geometry_path); self.navigation_path = Path(navigation_path)
        self.blend_path = Path(blend_path) if blend_path else None
        self.geometry_sha = _sha(self.geometry_path); self.navigation_sha = _sha(self.navigation_path)
        self.nav = json.loads(self.navigation_path.read_text())
        CACHE.mkdir(parents=True, exist_ok=True)
        cache = CACHE / f'{tag}-{self.geometry_sha[:16]}-{_sha(__file__)[:8]}.pkl'
        if cache.exists():
            self.g, self.objects = pickle.loads(cache.read_bytes())
        else:
            g = json.loads(self.geometry_path.read_text())
            self.objects = [Obj(o, self._category(o)) for o in g['objects'] if o.get('vertices')]
            g = {k: v for k, v in g.items() if k != 'objects'}
            self.g = g
            cache.write_bytes(pickle.dumps((g, self.objects), protocol=pickle.HIGHEST_PROTOCOL))
        self.by_name = {o.name: o for o in self.objects}
        self.site = self.g.get('site') or self.nav.get('site')
        self.site_polygon = Polygon(self.site['outline_m'])
        self.model_updated = self.nav.get('modelUpdatedAt') or datetime.datetime.fromtimestamp(self.geometry_path.stat().st_mtime, datetime.timezone.utc).isoformat()
        self.spec = (self.nav.get('proposal') or {}).get('brief') or (self.nav.get('proposal') or {}).get('specification') or {}

    # ---- classification -------------------------------------------------
    @property
    def proposed(self):
        return self.tag != 'existing'

    def _category(self, o):
        layer = o['layer']
        if self.tag == 'existing':
            return 'retained'
        if layer.startswith('P00'):
            return 'retained'
        if layer.startswith('P01'):
            return 'altered'
        if layer.startswith('P50'):
            return 'landscape'
        if layer.startswith(('P60', 'P70')):
            return 'skip'
        return 'new'

    def is_envelope(self, o):
        """Building envelope: walls, roofs, floors, openings, stairs — no furniture or planting."""
        if o.category in ('skip', 'landscape'):
            return False
        if self.tag == 'existing':
            if not o.layer.startswith(EXISTING_ENVELOPE_LAYERS):
                return False
        n = o.name
        # Terrain can rise through the wall-cut band on a sloping site.
        # It remains landscape, even when the proposal owns an excavated copy.
        if re.search(r'plot ground|site terrain|terrain mesh', n, re.I):
            return False
        if FURNITURE.search(n) and not re.search(r'wall|roof|floor|slab|door|window|dormer|stair|tread|parapet|chimney|balcony|terrace', n, re.I):
            return False
        return True

    def envelope_objects(self):
        return [o for o in self.objects if self.is_envelope(o)]

    def site_objects(self):
        """Fences, gates, hard landscape, pool and planting for the block plan."""
        return [o for o in self.objects if o.category in ('landscape', 'retained') and (FENCE.search(o.name) or o.layer.startswith('50') or o.layer.startswith('P50'))]

    # ---- levels ------------------------------------------------------------
    @property
    def floor_levels(self):
        if 'floorLevels' in self.nav:
            return [(f['id'], f['z'], f['label']) for f in self.nav['floorLevels']]
        return [(0, 0.0, 'Ground floor'), (1, 2.8, 'First floor')]

    def plan_rooms(self, z):
        rooms = self.nav.get('planRooms') or self.g.get('rooms')
        out = []
        for r in rooms:
            # Floor 2 identifies the detached garden buildings, not a second
            # upper storey. Older existing exports do not provide base_z.
            rz = r.get('base_z', {0: 0.0, 1: 2.8, 2: 0.0, -1: -2.8, 3: 5.55}.get(r.get('floor', 0), 0.0))
            if abs(rz - z) < .03:
                out.append(r)
        return out

    def outbuilding_rooms(self):
        rooms = self.nav.get('planRooms') or self.g.get('rooms')
        return [r for r in rooms if r.get('floor') == 2 or min(p[1] for p in r['polygon_m']) > 14.8]

    def walls(self, floor_index=None, z=None):
        out = []
        for w in (self.nav.get('walls') or self.g['walls']):
            if floor_index is not None and w['floor'] != floor_index:
                continue
            out.append(w)
        return out

    # ---- demolition -----------------------------------------------------
    def demolished_names(self):
        """Original objects that physically go in the proposal: omitted for a
        demolition/opening reason, not merely re-finished or re-framed in place."""
        ch = (self.nav.get('proposal') or {}).get('changes') or []
        keep = re.compile(r'finish|frames? in retained|geometry (and apertures )?unchanged|re-?finish|render|colour|material|repaint|adopt|integration|reproduced|trimmed', re.I)
        gone = re.compile(r'demoli|remov|cut|open(ing|ed)? |opens|convert|replaced by|becomes|join|widen|new opening|through|lowered|raised|fill', re.I)
        out = set()
        for c in ch:
            if not str(c.get('action', '')).startswith(('omitted', 'replaced', 'merged')):
                continue
            reason = str(c.get('reason', ''))
            if keep.search(reason) and not re.search(r'demoli|remov', reason, re.I):
                continue
            if gone.search(reason):
                out.add(c['original'])
        return out

    # ---- helpers ---------------------------------------------------------
    def objects_in(self, x0, y0, x1, y1, z0=-9, z1=99):
        return [o for o in self.objects if o.high[0] >= x0 and o.low[0] <= x1 and o.high[1] >= y0 and o.low[1] <= y1 and o.high[2] >= z0 and o.low[2] <= z1]

    def find(self, pattern):
        rx = re.compile(pattern, re.I)
        return [o for o in self.objects if rx.search(o.name)]


def load_existing():
    return SourceModel('existing', ROOT / 'output-walkthrough' / 'geometry.json', ROOT / 'walkthrough' / 'public' / 'navigation.json',
                       ROOT / 'output-walkthrough' / 'Ashley Heights.blend')


def load_proposed(variant='compact'):
    if variant not in ('planning', 'compact'):
        raise ValueError('Unknown proposed design: ' + variant)
    d = ROOT / ('output-proposed-' + variant)
    return SourceModel('proposed', d / 'geometry.json', d / 'navigation.json', d / ('Ashley Heights — Proposed (planning application).blend' if variant == 'planning' else 'Ashley Heights — Proposed (compact).blend'), variant)
