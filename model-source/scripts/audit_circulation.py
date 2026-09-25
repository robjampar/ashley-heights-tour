"""Report furniture intrusion into doors and plot actual floor-level obstructions."""
import json, sys, hashlib
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch
from circulation_geometry import furniture_footprints, doorways

ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'output-walkthrough'
suffix=sys.argv[1] if len(sys.argv)>1 else 'current'
g=json.loads((OUT/'geometry.json').read_text())
furniture=furniture_footprints(g); doors=doorways(g); rows=[]
for d in doors:
    threshold=[]; approach=[]
    for f in furniture:
        if f['floor'] != d['floor']: continue
        for zone, result in [('threshold',threshold),('approach',approach)]:
            overlap=f['polygon'].intersection(d[zone]).area
            if overlap>.002:result.append({'furniture':f['name'],'overlap_m2':round(overlap,4)})
    rows.append({'door':d['name'],'floor':d['floor'],'width_m':d['width'],
        'threshold_intrusions':threshold,'approach_furniture':approach})
report={'basis':'Actual exported furniture meshes, open door apertures, 0.80 m approach on both sides. Approach overlap is a review flag, not automatically a blocked route.',
    'geometry_sha256':hashlib.sha256((OUT/'geometry.json').read_bytes()).hexdigest(),
    'door_count':len(rows),'furniture_envelopes':len(furniture),
    'threshold_intrusion_count':sum(bool(r['threshold_intrusions']) for r in rows),'doors':rows}
(OUT/f'circulation-{suffix}.json').write_text(json.dumps(report,indent=2))
fig,axes=plt.subplots(1,2,figsize=(18,10))
for floor,ax in enumerate(axes):
    for r in g['rooms']:
        if r['floor']!=floor:continue
        ax.add_patch(Patch(r['polygon_m'],facecolor='#f9f6ed',edgecolor='#aaa'))
    for f in furniture:
        if f['floor']==floor:ax.add_patch(Patch(list(f['polygon'].exterior.coords),facecolor='#a8916a',alpha=.75))
    for d in doors:
        if d['floor']!=floor:continue
        clash=any(r['door']==d['name'] and r['floor']==floor and r['threshold_intrusions'] for r in rows)
        ax.add_patch(Patch(list(d['approach'].exterior.coords),facecolor='#df5959' if clash else '#5fb990',alpha=.30))
        ax.annotate(d['name'],d['centre'],fontsize=5,rotation=30)
    ax.set_aspect('equal');ax.autoscale();ax.set_xlabel('East (m)');ax.set_ylabel('Rear / north (m)')
    ax.set_title(('Ground floor' if floor==0 else 'First floor')+' — '+suffix)
fig.suptitle('Door approaches and furniture: red = threshold intrusion; green = review approach')
fig.tight_layout();fig.savefig(OUT/f'Circulation {suffix}.png',dpi=150);plt.close(fig)
for row in rows:
    if row['threshold_intrusions'] or row['approach_furniture']:print(json.dumps(row))
print('THRESHOLD_INTRUSIONS',report['threshold_intrusion_count'])
