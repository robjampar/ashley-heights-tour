"""Draw distinct exercise states; a clear rear run-off is not spare equipment storage."""
import json,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];cfg=json.loads((ROOT/'proposal/interiors/leisure/gym.json').read_text())
OUT=ROOT/'revisions/interiors-overnight-2026-09-27/gym';OUT.mkdir(exist_ok=True)
S=75;svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1070"><style>text{font-family:Arial,sans-serif;fill:#243c34}.title{font-size:28px;font-weight:700}.h{font-size:21px;font-weight:700}.body{font-size:16px}.small{font-size:12px}.wall{fill:#f0eee6;stroke:#354b43;stroke-width:3}.equipment{fill:#8e9691;stroke:#3d5149;stroke-width:1.4}.furniture{fill:#cabb9f;stroke:#83765e;stroke-width:1.3}.activity{fill:#d7ab76;fill-opacity:.35;stroke:#bd8653;stroke-dasharray:7 5}.rowing{fill:#88b5ad;fill-opacity:.35;stroke:#568e83;stroke-dasharray:7 5}</style><rect width="1100" height="1070" fill="#faf9f4"/><text x="55" y="50" class="title">Gym — show the space while it is being used</text><text x="55" y="82" class="body">Retained doors and shell. Two west-facing treadmills. No mirrors. Dimensions from the model.</text>']
for i,state in enumerate(('running','rowing')):
    ox=75+i*535;oy=150
    def p(x,y):return ox+(x-9.1)*S,oy+(-4.12-y)*S
    def rect(box,cls,label=None):
        x,y=p(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S
        svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="{cls}" rx="3"/>')
        if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2+4}" text-anchor="middle" class="small">{html.escape(label)}</text>')
    svg.append(f'<text x="{ox}" y="{oy-25}" class="h">{("A · Running / strength","B · Rowing, treadmills off")[i]}</text>')
    pts=' '.join(','.join(map(str,p(*v)))for v in cfg['polygon']);svg.append(f'<polygon points="{pts}" class="wall"/>')
    for x,a,b in ((9.26,-9.505,-8.105),(9.26,-6.405,-4.605)):
        u,v=p(x,a);w,t=p(x,b);svg.append(f'<path d="M{u},{v}L{w},{t}" stroke="#70a8b8" stroke-width="5"/>')
    # Door apertures and fully open leaves.
    for a,b in (((9.26,-7.805),(9.26,-6.805)),((12.03,-12.5),(12.93,-12.5)),((10.745,-4.229),(13.145,-4.229))):
        u,v=p(*a);w,t=p(*b);svg.append(f'<path d="M{u},{v}L{w},{t}" stroke="#faf9f4" stroke-width="6"/>')
    for a,b in (((9.2,-7.805),(10.2,-7.805)),((12.93,-12.5),(12.93,-11.65))):
        u,v=p(*a);w,t=p(*b);svg.append(f'<path d="M{u},{v}L{w},{t}" stroke="#476451" stroke-width="3"/>')
    for t in cfg['treadmills']:
        rect([t['frontX'],t['centerY']-t['width']/2,t['frontX']+t['length'],t['centerY']+t['width']/2],'equipment','← Treadmill')
        if state=='running':rect([t['frontX']+t['length'],t['centerY']-.5,t['frontX']+t['length']+2,t['centerY']+.5],'activity','2 × 1 m clear')
    rect(cfg['bench'],'equipment','Bench')
    rect(cfg['dumbbells'],'furniture','Weights');rect([9.30,-9.835,9.70,-9.635],'furniture')
    rect([11.76,-10.555,12.98,-9.945],'equipment','Bike');rect(cfg['waterShelf'],'furniture')
    if state=='running':rect(cfg['rower']['stored'],'equipment','Rower stored')
    else:rect(cfg['rower']['activity'],'rowing');rect(cfg['rower']['deployed'],'equipment','Rower')
    x,y=p(12.05,-12.85);svg.append(f'<text x="{x}" y="{y}" class="small">Utility door retained</text>')
lines=['The running state keeps both 2 × 1 m rear safety spaces empty. The east passing strip is approximately 640 mm.',
       'Rowing uses that space only with both treadmills switched off; it is not a third simultaneous cardio position.',
       'The rower separates into two parts for storage. The bench and cable machine stay in place.',
       'Bench, cable and cycling activity areas are tested separately. The room is not an unrestricted multi-user gym.',
       'MyRun and Concept2 dimensions guide the fit. Selected products, exercises, floor loads and ventilation need review.',
       'PLAN DEVELOPMENT — review the route tests and eye-level model before adopting this arrangement.']
for i,line in enumerate(lines):svg.append(f'<text x="55" y="{866+i*29}" class="body">{html.escape(line)}</text>')
svg.append('</svg>');(OUT/'layout-plan.svg').write_text(''.join(svg))
print('Wrote gym activity-state plan')
