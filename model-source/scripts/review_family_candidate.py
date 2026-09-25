"""Check candidate furniture clearances and build four source/before/after boards."""
from pathlib import Path
import json
from PIL import Image,ImageDraw,ImageFont
from shapely.geometry import MultiPoint,LineString
from circulation_geometry import doorways
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'photo-review/family-audit-candidate'
g=json.loads((OUT/'candidate-furniture-geometry.json').read_text())
report=json.loads((OUT/'candidate-review.json').read_text())
keys=['Family east glass bookcase','Family CD bookcase','Family cane chair A','Family cane chair B',
      'Family cane chair C','Family photo detail | Small wooden chair','Family photo detail | West tray table and lamp']
shapes={key:MultiPoint([v[:2] for o in g['objects'] if o.get('assembly')==key for v in o['vertices']]).convex_hull
        for key in keys}
source_views = {
    keys[0]: ['2445661-1', '2445661-2'],
    keys[1]: ['2445661-3', '2445661-0'],
    keys[2]: ['2445661-0', '2445661-3'],
    keys[3]: ['2445661-1', '2445661-2'],
    keys[4]: ['2445661-3', '2445661-0'],
    keys[5]: ['2445661-1', '2445661-2'],
    keys[6]: ['2445661-3', '2445661-2'],
}
report['actual_assembly_bounds'] = []
for key in keys:
    vertices = [v for o in g['objects'] if o.get('assembly') == key for v in o['vertices']]
    report['actual_assembly_bounds'].append({
        'assembly':key, 'min_xyz_m':[min(v[i] for v in vertices) for i in range(3)],
        'max_xyz_m':[max(v[i] for v in vertices) for i in range(3)],
        'source_views':source_views[key],
        'basis':'Photo-inferred position; furniture forms are simplified, not surveyed.'})
report['minimum_pair_separation_m'] = min(shapes[a].distance(shapes[b])
                                        for i,a in enumerate(keys) for b in keys[i+1:])
door=next(d for d in doorways(g)if d['name']=='Family hall door')
report['doorway_clearance']=[{'furniture':key,'threshold_overlap_m2':shape.intersection(door['threshold']).area,
                            'approach_overlap_m2':shape.intersection(door['approach']).area,
                            'distance_to_threshold_m':shape.distance(door['threshold'])}
                           for key,shape in shapes.items()]
report['furniture_overlaps']=[{'a':a,'b':b,'overlap_area_m2':shapes[a].intersection(shapes[b]).area,
                              'distance_m':shapes[a].distance(shapes[b])}
                             for i,a in enumerate(keys)for b in keys[i+1:]if shapes[a].distance(shapes[b])<.02]
route=LineString([(4.32,door['centre'][1]),(3.35,3.28),(2.20,2.10),(2.35,1.1)])
report['walking_route_0_25m_radius']={'points':list(route.coords),'collisions':[key for key,shape in shapes.items()
                                                                          if shape.intersects(route.buffer(.25))]}
report['minimum_boundary_margins']=[{'furniture':key,'west_m':shape.bounds[0]-.115,
                                   'east_m':4.255-shape.bounds[2],'north_m':3.915-shape.bounds[3]}
                                  for key,shape in shapes.items()]
assert not report['furniture_overlaps']
assert not report['walking_route_0_25m_radius']['collisions']
assert all(r['threshold_overlap_m2']==0 and r['approach_overlap_m2']==0 for r in report['doorway_clearance'])
(OUT/'candidate-review.json').write_text(json.dumps(report,indent=2))
font=lambda size:ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',size)
boards=[]
for view,heading in enumerate(('North wall','East wall and doorway','Front bay','West wall')):
    board=Image.new('RGB',(2160,618),'#f4f2ed');draw=ImageDraw.Draw(board)
    draw.text((14,8),f'Family Room — {heading}',font=font(26),fill='#243b35')
    rows=[(ROOT/f'photo-review/originals/2445661-{view}.jpg','Original photograph'),
          (ROOT/f'photo-review/family-audit-baseline/2445661-{view}.png','Before'),
          (OUT/f'2445661-{view}.png','Furniture candidate — same camera')]
    for i,(path,label) in enumerate(rows):
        draw.text((i*720+12,43),label,font=font(21),fill='#304139')
        board.paste(Image.open(path).convert('RGB').resize((712,534),Image.Resampling.LANCZOS),(i*720+4,76))
    board.save(OUT/f'Comparison {view} — {heading}.jpg',quality=96)
    boards.append(board)
boards[0].save(OUT/'Family Room comparison.pdf',save_all=True,append_images=boards[1:],resolution=180)
(OUT/'Family review.md').write_text('''# Family Room four-view furniture review

The candidate changes furnishings only. The source camera, room walls, openings and calibrated floorplan remain unchanged. Four actual Blender comparisons show the original, before and furniture candidate using the same views.

Clear positional corrections: the west CD shelf moves north fromY2.54 toY3.45; the pale cane chair moves from(.54,1.30) toapproximately(1.02,2.40), freeing the photographed tray-table position. The east bookcase moves south fromY1.85 toY1.34. The north cane chair moves east and back, leaving space for the CD shelf. The small wooden chair now faces west, with its back behind the cushion rather than an opaque front-facing block. The source's missing west tray table/lamp and three wall pictures are included. North-wall pictures are regrouped as one larger print and three small ones.

All seven furniture footprints are checked using actual candidate mesh outlines: no pair overlaps or comes within20mm; no item intersects the doorway threshold or its0.8m approach zone. A0.25m-radius route from the hall through the room to the bay remains clear. The closest furniture is the east bookcase,0.96m from the doorway threshold. This is a physical clash check, not an accessibility certification.

The structural check did not justify altering the camera to move furniture into place: the overall bay/corner alignment is close, while one east-jamb residual and unequal bay pane widths remain. The existing open-vs-closed door state differs between source and render. Furniture forms, woven backs, cushions, art contents, radiator curvature and materials remain simplified. Black gaps above/in the bay are being handled separately. No window-height alternative was selected or applied by this work.

The repeatable helper is `scripts/refine_family_comparison.py`. It is not connected to the canonical build pipeline by this audit. Exact target coordinates and clearance data are in `candidate-review.json`.
''')
print('Family comparison boards and clearance report ready:',OUT)
