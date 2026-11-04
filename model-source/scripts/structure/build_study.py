"""Build a review-only structural registry from the CURRENT architectural export.

No member selection, foundation sizing or certification is inferred from meshes.
The exact same element geometries drive 3D and orthographic drawings.
"""
from pathlib import Path
import collections
import hashlib
import json
import math
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
import numpy as np
from shapely.geometry import Polygon
from scripts.geometry.mesh_face_triangles import triangulate_face

SOURCE = ROOT / 'outputs/output-proposed-compact'
OUT = ROOT / 'walkthrough/public/structure'
SPEC = ROOT / 'proposal/specs/structural-design.json'
WALL_SPEC = ROOT / 'proposal/specs/structural-wall-assemblies.json'
FLOOR_SPEC = ROOT / 'proposal/specs/structural-floor-layout.json'
WALL_BODIES = set(json.loads(WALL_SPEC.read_text())['wallBodies'])
OPENING_HEADS = set(json.loads(WALL_SPEC.read_text()).get('openingHeads',[]))

# Exclude finishes, fittings, furnishings and landscape even when their name
# contains 'wall', 'floor' or 'roof'. Nothing is classified by material alone.
DETAIL = re.compile(r'skirting|cornice|cove|architrave|curtain|blind|frame|mullion|glass|glaz|door|window|cill|sash|gasket|bead|trim|fascia|drain|gutter|pipe|cap |cap$|capping|flash|ridge tile|hip cap|roof tile|weathering|furniture|seat|table|shelf|shelv|cabinet|cupboard|wardrobe|drawers|bed |bed$|worktop|counter|rug|mat |carpet|limestone slab|oak plank|fitting|light|pendant|lamp|panell|panelled|plaster lining|ceiling|lining|balust|handrail|newel|spindle|rail|artwork|picture|mirror|fixing|casing|socket|switch|duct|tile finish', re.I)
BODY = re.compile(r'wall|partition|pier|head|lintel|floor|slab|deck|roof|tread|winder|riser|retaining|support', re.I)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def role(o):
    if o.get('structural_finish_detail'):return None
    n, layer = o['name'], o['layer']
    # Authored wall returns/rakes sometimes omit "wall", and shaped gable
    # bodies sometimes say "head". Resolve these named bodies before heuristics.
    if n in WALL_BODIES:return 'walls'
    if n in OPENING_HEADS:return 'openings'
    if layer.startswith(('P50','P60','P61','P62','P63','P64','P65','P66','P67','P68','P69','P7','P8')):
        if not layer.startswith('P85'):
            return None
    if layer.startswith('Visual') or 'Garden and site' in layer or layer == 'Scene Collection':
        return None
    if re.search(r'head stop|oak threshold|planted head|privacy head|wall-hung WC|shower head|upholstered headboard|soffit board|soffit west|west soffit|east soffit|rear soffit|boarded soffit', n, re.I):
        return None
    if layer.startswith('P00') and re.search(r'\| (end|pier \d+|lintel \d+|sill \d+)$', n):
        return 'openings' if '| lintel ' in n else 'walls'
    # Wall bodies below windows and terminal fragments are structural envelopes,
    # even when the authored label omits the word "wall".
    if n.startswith('Proposal revision |') and re.search(r'\| (?:end|below \d+)$', n):
        return 'walls'
    if n.startswith('Proposal |') and re.search(r'\bsill \d+$', n) and not DETAIL.search(n):
        return 'walls'
    if not BODY.search(n) or DETAIL.search(n):
        return None
    if 'floor band' in n.lower():return None
    if re.search(r'boundary|fence|landscape|pool|pavilion|summer house|outbuilding|terrain|kerb', n, re.I):
        return None
    if 'steel roof support' in n.lower():
        return 'steel'
    if 'retaining' in n.lower() or n == 'Proposal | Entertainment basement floor' or 'washable concrete floor' in n.lower():
        return 'concrete'
    if re.search(r'\bhead\b|lintel', n, re.I):
        return 'openings'
    if re.search(r'\broof\b', n, re.I) and not re.search(r'wall|pier|closure', n, re.I):
        return 'roof'
    if re.search(r'floor|slab|deck', n, re.I):
        return 'floors'
    if re.search(r'wall|partition|pier|closure', n, re.I):
        return 'walls'
    return None


def triangulate(o):
    # Keep real cut-outs: never replace a concave floor or roof with its bbox.
    triangles = [t for f in o['faces'] for t in triangulate_face(o['vertices'], f)]
    if not triangles:
        return []
    return np.round(np.asarray(triangles).reshape(-1, 3), 5).tolist()


def footprint(triangles):
    from shapely.ops import unary_union
    polys=[]
    for i in range(0,len(triangles),3):
        p=Polygon([v[:2] for v in triangles[i:i+3]])
        if p.is_valid and p.area > 1e-8: polys.append(p)
    return unary_union(polys)


def footprint_edges(triangles):
    p=footprint(triangles);out=[]
    polygons=[p] if p.geom_type=='Polygon' else list(getattr(p,'geoms',[]))
    for poly in polygons:
        if poly.geom_type!='Polygon':continue
        for ring in [poly.exterior,*poly.interiors]:
            pts=list(ring.coords)
            out.extend([[list(a),list(b)] for a,b in zip(pts,pts[1:])])
    return out


def mesh_edges(triangles):
    groups=collections.defaultdict(list)
    for i in range(0,len(triangles),3):
        t=np.asarray(triangles[i:i+3]); normal=np.cross(t[1]-t[0],t[2]-t[0]); length=np.linalg.norm(normal)
        if length<1e-9:continue
        normal/=length
        for a,b in zip(t,np.roll(t,-1,axis=0)):
            key=tuple(sorted((tuple(a),tuple(b))))
            groups[key].append(normal)
    return [list(k) for k,v in groups.items() if len(v)==1 or any(abs(float(np.dot(v[0],n)))<.999 for n in v[1:])]


def floor_plate_triangles(correction):
    if 'polygons' in correction:
        return [t for poly in correction['polygons'] for t in floor_plate_triangles({'polygon':poly,'bottom':correction['bottom'],'top':correction['top']})]
    p=correction['polygon'];count=len(p)
    vertices=[[x,y,z] for z in (correction['bottom'],correction['top']) for x,y in p]
    faces=[list(reversed(range(count))),list(range(count,2*count))]
    faces += [[i,(i+1)%count,(i+1)%count+count,i+count] for i in range(count)]
    return triangulate({'vertices':vertices,'faces':faces})


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    gp, npth = SOURCE/'geometry.json', SOURCE/'navigation.json'
    before={str(p.relative_to(ROOT)):digest(p) for p in (gp,npth,SPEC,WALL_SPEC,FLOOR_SPEC,Path(__file__).resolve())}
    g=json.loads(gp.read_text()); nav=json.loads(npth.read_text()); spec=json.loads(SPEC.read_text())
    floor_spec=json.loads(FLOOR_SPEC.read_text());floor_corrections=floor_spec['floorPlateCorrections']
    items=[]; occurrence=collections.Counter()
    prefixes={'walls':'W','floors':'F','roof':'R','concrete':'C','openings':'O','steel':'S'}
    for o in g['objects']:
        category=role(o)
        if not category or not o.get('vertices'): continue
        v=np.asarray(o['vertices']); low=v.min(axis=0); high=v.max(axis=0); size=high-low
        if max(size)<.15: continue
        if category=='walls' and (size[2]<.12 or min(size[:2])<.07):continue
        if category=='floors' and ((size[2]<.05 and not o.get('structural_floor_datum')) or max(size[:2])<.5):continue
        name=o.get('object_name') or o['name']; key=o['layer']+'|'+name
        occurrence[key]+=1
        identity=hashlib.sha256((key+'|'+str(occurrence[key])).encode()).hexdigest()[:7].upper()
        ident=prefixes[category]+'-'+identity
        tri=triangulate(o)
        correction=floor_corrections.get(o['name'])
        original_area=footprint(tri).area if correction else None
        if correction:
            # A structural plate is distinct from the disjoint render/finish mesh.
            # Only these explicitly reviewed source polygons are reconstructed.
            tri=floor_plate_triangles(correction)
            low=np.min(tri,axis=0);high=np.max(tri,axis=0);size=high-low
        retained=o['layer'].startswith('P00')
        region='workshop' if low[0]<-15 and low[1]>18 else 'house'
        if region=='workshop':level=0
        elif category=='floors' or o['name']=='Proposal | Entertainment basement floor':
            level=min([(-1,-2.8),(0,0),(1,2.8),(3,5.55)],key=lambda f:abs(high[2]-f[1]))[0]
        else:level=-1 if low[2]<-.5 and high[2]<.3 else 3 if low[2]>=5.25 else 1 if low[2]>=2.5 else 0
        # Heads near the ceiling belong to the storey BELOW that ceiling.
        if category in ('walls','openings') and low[2]>=0 and high[2]<=2.81:level=0
        elif category in ('walls','openings') and low[2]>=2.8 and high[2]<=5.35:level=1
        measured={'envelopeM':[round(float(x),3) for x in size]}
        if category in ('floors','roof'):measured['projectedAreaM2']=round(footprint(tri).area,3)
        if category=='openings':measured['headEnvelopeLengthM']=round(float(max(size[:2])),3)
        items.append({'id':ident,'name':o['name'],'sourceObject':name,'sourceLayer':o['layer'],
            'category':category,'region':region,'level':level,'retained':retained,
            'status':'Existing - survey required' if retained else 'Architectural envelope - design required',
            'basis':'Extracted architectural mesh. Dimensions describe the model, not a verified structural member.',
            'bounds':[low.round(5).tolist(),high.round(5).tolist()],'triangles':tri,'edges':mesh_edges(tri),'measurements':measured,
            'design':{'section':None,'materialGrade':None,'loadCase':None,'calculationRef':None,'checkedBy':None,'bearingM':None,'approvedForConstruction':False},
            'checks':spec['designChecks'][category]})
        if category in ('floors','openings') or o['name']=='Proposal | Entertainment basement floor':items[-1]['planEdges']=footprint_edges(tri)
        if category=='floors' and correction and correction.get('framingReference'):
            # Physical plates may acquire local facade/pier notches without
            # renumbering the reviewed receiver network. Joist clearances and
            # sheet cuts remain explicit in the floor specification; this
            # reference is topology provenance, never the finished deck.
            items[-1]['framingReferenceTriangles']=floor_plate_triangles(correction['framingReference'])
            items[-1]['framingReferenceBasis']=correction['framingReference']['basis']
        elif category=='floors' and o.get('structural_framing_reference') and not correction:
            items[-1]['framingReferenceTriangles']=triangulate(o['structural_framing_reference'])
            items[-1]['framingReferenceBasis']=o['structural_framing_reference']['basis']
        if correction:
            items[-1]['basis']=correction['basis']+' Structural study correction only; native architectural asset unchanged.'
            items[-1]['floorPlateCorrection']={'sourceProjectedAreaM2':round(original_area,3),'structuralAreaM2':round(footprint(tri).area,3),'spec':'proposal/specs/structural-floor-layout.json'}
    for plate in floor_spec.get('additionalPlates',[]):
        tri=floor_plate_triangles(plate);low=np.min(tri,axis=0);high=np.max(tri,axis=0)
        items.append({'id':plate['id'],'name':plate['name'],'category':'floors','region':'house','level':plate['level'],'retained':False,
          'status':'Proposed structural continuation - design required','basis':plate['basis'],
          'bounds':[low.tolist(),high.tolist()],'triangles':tri,'edges':mesh_edges(tri),'planEdges':footprint_edges(tri),
          'measurements':{'projectedAreaM2':round(footprint(tri).area,3)},'design':{'section':None,'materialGrade':None,'loadCase':None,'calculationRef':None,'checkedBy':None,'bearingM':None,'approvedForConstruction':False},'checks':spec['designChecks']['floors']})
    for wall in json.loads(WALL_SPEC.read_text()).get('additionalBodies',[]):
        tri=floor_plate_triangles(wall);low=np.min(tri,axis=0);high=np.max(tri,axis=0)
        items.append({'id':wall['id'],'name':wall['name'],'category':'walls','region':'house','level':wall['level'],'retained':False,
          'status':'Proposed masonry continuity - design required','basis':wall['basis'],
          'bounds':[low.tolist(),high.tolist()],'triangles':tri,'edges':mesh_edges(tri),'planEdges':footprint_edges(tri),
          'measurements':{'envelopeM':(high-low).round(5).tolist()},'design':{'section':None,'materialGrade':None,'loadCase':None,'calculationRef':None,'checkedBy':None,'bearingM':None,'approvedForConstruction':False},'checks':spec['designChecks']['walls']})
    # Opening-head candidates are separately enumerated for checking. An authored
    # wall head is NOT presumed to be a steel lintel with known bearings/loads.
    # Candidate axes use actual geometry; their display thickness carries no size.
    roof=nav['continuousWingRoof']['configuration']; sym=nav['symmetricWingRoof']['configuration']
    bas=nav['proposalBasement']; void=bas['stairVoid']
    stair=nav['bedroom4StairSuite']['configuration']['stair']
    lines=[
      ('ST-01','New wing ridge support study',[roof['ridgeX'],sym['dormerSouthY'],roof['ridgeZ']],[roof['ridgeX'],roof['ridgeEndY'],roof['ridgeZ']],'roof','house','Support concept only; no single-span ridge beam or end-bearing solution is established.'),
      ('ST-02','Loft courtyard edge / projection',[roof['facadeX'],roof['courtyardY'][0],5.43],[roof['facadeX'],roof['courtyardY'][1],5.43],'steel','house','Coordinate the 720 mm projection, backspan, torsion and glazing support; section and supports unassigned.'),
      ('ST-03','Loft stair west trimming zone',[4.6,1.31,5.43],[4.6,5.55,5.43],'steel','house','Trimming study only. Verify existing joist direction, stair aperture, support and headroom.'),
      ('ST-04','Loft stair east trimming zone',[5.5,1.31,5.43],[5.5,5.55,5.43],'steel','house','Trimming study only. Timber or steel to be chosen after load analysis.'),
      ('ST-05','Loft stair landing trimming zone',[4.6,5.55,5.43],[5.5,5.55,5.43],'steel','house','Landing trimmer concept; connections and bearings not designed.'),
      ('ST-06','Basement stair south trimming zone',[void[0],void[1],-.13],[void[2],void[1],-.13],'steel','house','Ground-floor slab edge around the current stair opening; engineering pending.'),
      ('ST-07','Basement stair north trimming zone',[void[0],void[3],-.13],[void[2],void[3],-.13],'steel','house','Ground-floor slab edge around the current stair opening; engineering pending.')
    ]
    for ident,name,a,b,cat,region,basis in lines:
        items.append({'id':ident,'name':name,'category':cat,'region':region,'level':3 if a[2]>5 else 0,'retained':False,
          'status':'Support study - not designed','basis':basis,'line':[a,b],
          'bounds':[[min(a[i],b[i]) for i in range(3)],[max(a[i],b[i]) for i in range(3)]],
          'measurements':{'axisLengthM':round(math.dist(a,b),3)},
          'design':{'section':None,'materialGrade':None,'loadCase':None,'calculationRef':None,'checkedBy':None,'bearingM':None,'approvedForConstruction':False},'checks':spec['designChecks'][cat]})
    # Foundation requirement is a plane/outline only; no guessed depth or width.
    p=bas['outerPolygon'];z=bas['floorZ']-.25
    for i,(a,b) in enumerate(zip(p,p[1:]+p[:1])):
        ident=f'FD-{i+1:02}'
        aa=[*a,z];bb=[*b,z]
        items.append({'id':ident,'name':f'Basement foundation design boundary {i+1}',
          'category':'concrete','region':'house','level':-1,'retained':False,'line':[aa,bb],
          'status':'Foundation system undecided','basis':'Current basement base perimeter, not a footing centreline or excavation limit. Raft/footing/pile selection and founding level await geotechnical design.',
          'bounds':[[min(aa[j],bb[j]) for j in range(3)],[max(aa[j],bb[j]) for j in range(3)]],
          'measurements':{'axisLengthM':round(math.dist(aa,bb),3)},'design':{'section':None,'materialGrade':None,'loadCase':None,'calculationRef':None,'checkedBy':None,'bearingM':None,'approvedForConstruction':False},'checks':spec['designChecks']['concrete']})
    for path,h in before.items():
        if digest(ROOT/path)!=h:raise RuntimeError('Source changed during structural extraction: '+path)
    result={'schemaVersion':1,**spec,'sourceHashes':before,'modelUpdatedAt':nav['modelUpdatedAt'],
       'coordinateSystem':'Model metres: x east, y garden/rear, z up. Not survey setting-out coordinates.',
       'elements':items,'floorLevels':[{'id':-1,'z':-2.8,'label':'Basement'},{'id':0,'z':0,'label':'Ground floor'},{'id':1,'z':2.8,'label':'First floor'},{'id':3,'z':5.55,'label':'Loft'}],
       'rooms':[{**r,'labelPoint':list(Polygon(r['polygon_m']).representative_point().coords)[0]} for r in nav['planRooms'] if r['floor'] in [-1,0,1,3]],
       'basement':{'polygon':p,'architecturalFootprintM2':round(Polygon(p).area,3),'floorZ':bas['floorZ'],'modelWallThicknessM':bas['wallThickness'],'concreteOrderM3':None},
       'quantityStatus':'No construction order quantities. Areas and dimensions below are architectural envelopes; overlapping fragments and finishes must be reconciled into engineered assemblies.',
       'coverage':{'scope':'Main house and garden workshop architectural bodies plus named support studies. Landscape, pool, pavilion, decorative layers and services excluded.',
                   'openingSchedule':'Modelled head/lintel candidates only; not every structural opening has been reconciled.',
                   'joists':'No joist sizes, spacing or directions have been designed. Floor envelope zones identify where a floor system is required.',
                   'foundations':'Only the current basement base boundary is shown. Foundation types and all other foundation layouts are not designed.'}}
    (OUT/'model.json').write_text(json.dumps(result,separators=(',',':'))+'\n')
    schedule={**result,'elements':[{k:v for k,v in e.items() if k not in ('triangles','line','edges','planEdges')} for e in items]}
    (OUT/'schedule.json').write_text(json.dumps(schedule,indent=2)+'\n')
    # Keep previous PDF as historical evidence; disable its download if it no
    # longer represents the current register or orthographic drawing engine.
    pack_path=OUT/'pack.json'
    pack=json.loads(pack_path.read_text()) if pack_path.exists() else {}
    pack['available']=pack.get('dataSHA256')==digest(OUT/'model.json') and pack.get('viewSHA256')==digest(ROOT/'walkthrough/src/structure-geometry.js') and (OUT/'coordination-pack.pdf').exists()
    pack_path.write_text(json.dumps(pack,indent=2)+'\n')
    counts=collections.Counter(e['category'] for e in items)
    print(json.dumps({'elements':len(items),'categories':counts,'bytes':(OUT/'model.json').stat().st_size,'basementAreaM2':result['basement']['architecturalFootprintM2']}))


if __name__=='__main__':build()
