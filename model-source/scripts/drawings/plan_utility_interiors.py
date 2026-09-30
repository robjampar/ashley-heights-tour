"""Compare the old galley with a usable single-wall laundry sequence."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,html,textwrap
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];cfg=json.loads((ROOT/'proposal/interiors/leisure/utility.json').read_text());OUT=ROOT/'revisions/interiors-overnight-2026-09-27/utility';OUT.mkdir(exist_ok=True)
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1000"><style>text{font-family:Arial,sans-serif;fill:#294036}.title{font-size:28px;font-weight:700}.h{font-size:21px;font-weight:700}.body{font-size:16px}.small{font-size:12px}.wall{fill:#f0eee5;stroke:#354d42;stroke-width:3}.cabinet{fill:#cdbc9f;stroke:#8a7b63;stroke-width:1.3}.machine{fill:#deded6;stroke:#526558;stroke-width:1.3}.open{fill:#caa470;fill-opacity:.28;stroke:#b28451;stroke-dasharray:7 5}.door{stroke:#496954;stroke-width:3;fill:none}</style><rect width="1200" height="1000" fill="#faf9f4"/><text x="55" y="50" class="title">Utility — a clear route and a useful folding surface</text><text x="55" y="82" class="body">Retain the windows, door openings and east service wall. Actual modelled wall faces: 2.32 × 3.466 m.</text>']
S=145
for i in range(2):
    ox=85+i*600;oy=195
    def p(x,y):return ox+(x-11.43)*S,oy+(-12.61-y)*S
    def rect(box,cls,label=None):
        x,y=p(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S
        svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="{cls}"/>')
        if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2+4}" class="small" text-anchor="middle">{html.escape(label)}</text>')
    def line(a,d,cls='door',style=''):
        x,y=p(*a);u,v=p(*d);svg.append(f'<path d="M{x},{y}L{u},{v}" class="{cls}" {style}/>')
    svg.append(f'<text x="{ox}" y="{oy-29}" class="h">{("A · Existing opposing fittings","B · One fitted laundry run")[i]}</text>');rect(cfg['bounds'],'wall')
    line((11.43,-13.85),(11.43,-12.95),'', 'stroke="#faf9f4" stroke-width="6"');line((12.03,-12.61),(12.93,-12.61),'','stroke="#faf9f4" stroke-width="6"')
    line((11.315,-13.85 if i==0 else -12.95),(12.215,-13.85 if i==0 else -12.95))
    line((13.75,-15.75),(13.75,-14.75),'','stroke="#68a0b2" stroke-width="6"')
    line((12.195,-16.076),(13.195,-16.076),'','stroke="#68a0b2" stroke-width="6"')
    if i==0:
        rect([13.09,-15.9,13.71,-12.70],'cabinet','Counter')
        for y,label in((-15.55,'Washer'),(-14.85,'Dryer')):
            rect([11.61,y-.32,12.25,y+.32],'machine',label)
            line((11.61,y-.25),(11.61,y+.25),'','stroke="#b36c54" stroke-width="4"')
        caption='Appliance fronts face the west wall. About 840 mm remains between opposing fittings.'
    else:
        for m in cfg['modules']:
            kind=m['kind'];rect([cfg['run']['frontX'],m['south'],cfg['run']['backX'],m['north']],'machine'if kind in('washer','dryer')else'cabinet',kind.title())
            if kind in('washer','dryer'):
                rect([cfg['appliance']['backX']-cfg['appliance']['openDepth'],m['south']+.01,cfg['run']['frontX'],m['north']-.01],'open')
        # Show the retained garage leaf and the limiting passage around its tip.
        line((12.30,-12.95),(12.92,-12.95),'','stroke="#518879" stroke-width="2"')
        caption='1.595 m from worktop to west wall; appliance-open envelopes are shown in amber.'
    for row,part in enumerate(textwrap.wrap(caption,70)):
        svg.append(f'<text x="{ox}" y="{oy+3.466*S+35+row*18}" class="small">{html.escape(part)}</text>')
lines=['Washer → dryer → pull-out laundry hamper → sink → tall storage. A 1.2 m folding surface sits above the appliances.',
       'The window sill is 1.20 m high; the 935 mm worktop stays below it. Tall joinery occupies the solid north end.',
       'The garage leaf is rehung at the north jamb of its existing opening, keeping the work area usable.',
       'Machine references: 850 × 596 × 643 mm, with a conservative 1077 mm overall depth when open.',
       'Six plan states pass with a 600 mm body: closed/open machines, open hamper, sorting, folding and sink use.',
       'DEVELOPED STUDY — local pipe adjustments, final appliances and detailed installation remain to be verified.']
for i,line in enumerate(lines):svg.append(f'<text x="55" y="{805+i*29}" class="body">{html.escape(line)}</text>')
svg.append('</svg>');(OUT/'layout-plan.svg').write_text(''.join(svg));print('Wrote utility alternatives and operating envelopes')
