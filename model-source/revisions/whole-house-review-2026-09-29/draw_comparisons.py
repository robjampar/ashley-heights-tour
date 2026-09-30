"""Standalone SVG analysis sheets; authoring model unchanged."""
from pathlib import Path
import json,html
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).resolve().parent
load=lambda p:json.loads((ROOT/p).read_text())
c=load('proposal/interiors/leisure/cinema.json');b=load('proposal/interiors/leisure/bar.json');report=json.loads((OUT/'spatial-comparisons.json').read_text())
STYLE='<style>text{font-family:Arial,sans-serif;fill:#2c3930}.title{font-size:26px;font-weight:bold}.sub{font-size:15px}.small{font-size:12px}.dim{font-size:15px;fill:#386550;font-weight:bold}</style>'
def start(title,subtitle):return [f'<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="950" viewBox="0 0 1300 950">{STYLE}<rect width="1300" height="950" fill="#fffdf7"/><text x="40" y="45" class="title">{html.escape(title)}</text><text x="40" y="75" class="sub">{html.escape(subtitle)}</text>']
def panel(svg,index,bb,title,scale=88):
 ox=50+index*630;oy=135
 def point(x,y):return ox+(x-bb[0])*scale,oy+(bb[3]-y)*scale
 def rect(bounds,fill='#cbbda6',stroke='#857762',dash=''):
  x,y=point(bounds[0],bounds[3]);svg.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{(bounds[2]-bounds[0])*scale:.2f}" height="{(bounds[3]-bounds[1])*scale:.2f}" fill="{fill}" stroke="{stroke}" stroke-width="1.5"'+(f' stroke-dasharray="{dash}"'if dash else'')+'/>')
 def text(x,y,s,cls='small'):
  a,d=point(x,y);svg.append(f'<text x="{a:.2f}" y="{d:.2f}" class="{cls}">{html.escape(s)}</text>')
 svg.append(f'<text x="{ox}" y="{oy-22}" class="sub" font-weight="bold">{html.escape(title)}</text>')
 return rect,text,point
s=start('AH-054 · Cinema: a clearer front approach','Comparison only · four seats, screen and room shell retained · not an applied design change')
for i,t in enumerate([c['coffeeTable'],report['cinema']['candidate_table_bounds']]):
 rect,text,p=panel(s,i,c['bounds'],'Current · 660 mm-deep table'if i==0 else'Candidate · 360 mm-deep table',95)
 rect(c['bounds'],'#f1eee4','#59685a');rect(c['sofa']['bounds'],'#d8cebd');rect(c['rearCabinet']);rect(t)
 sx,sy,_=c['screen']['center'];rect([sx-1.3,sy-.02,sx+1.3,sy+.02],'#35483f')
 rect([5.8,t[3],7.54,c['sofa']['bounds'][1]],'#e5eee3','#8eaa8c','6 4')
 gap=round((c['sofa']['bounds'][1]-t[3])*1000)
 text(5.9,(t[3]+c['sofa']['bounds'][1])/2,f'{gap} mm empty gap','dim')
 text(5.6,-12.1,'Four seats · unchanged');text(5.9,t[1]+.15,'Table')
 x,y=p(9.1,-10.85);x2,y2=p(9.1,-10.027);s.append(f'<path d="M{x},{y}L{x2},{y2}" stroke="#fffdf7" stroke-width="5"/>')
 s.append(f'<text x="{50+i*630}" y="690" class="sub">'+('Current table fills 1.74 x 0.66 m.'if i==0 else'300 mm gained by moving the front table edge away.')+'</text>')
 s.append(f'<text x="{50+i*630}" y="718" class="sub">'+('Occupied legs further reduce the available passing space.'if i==0 else'Use the existing drinks console for easy seated reach.')+'</text>')
for j,line in enumerate(['Recommended direction: test a shallow table or omit it in favour of reachable side/console surfaces.', 'This diagram measures furniture-to-furniture space. It does not certify an occupied or accessible aisle.', 'Next check: show realistic knees, a person entering, all four seats occupied and the side aisle clear.', 'Source: proposal/interiors/leisure/cinema.json · Measurements in metres from the current concept.']):s.append(f'<text x="40" y="{795+j*29}" class="sub">{html.escape(line)}</text>')
s.append('</svg>');(OUT/'cinema-comparison.svg').write_text(''.join(s))
s=start('AH-058 · Games room: what a small move actually gains','Full 1.525 m cue allowance preserved · unchanged sofa, stair and six-foot pool table')
bb=[5.16,-9.9,13.75,-4.23]
for i,dy in enumerate([0,.075]):
 rect,text,p=panel(s,i,bb,'Current · 622.5 mm reserved passing band'if i==0 else'Trial · 697.5 mm band, only 5 mm north tolerance',61)
 poly=[[5.16,-8.845],[9.22,-8.845],[9.22,-9.9],[13.75,-9.9],[13.75,-4.23],[5.16,-4.23]]
 s.append('<polygon points="'+' '.join(f'{x:.2f},{y:.2f}'for x,y in [p(*v)for v in poly])+'" fill="#f1eee4" stroke="#59685a" stroke-width="2"/>')
 px,py=b['pool']['center'];py+=dy;pl,pw=b['pool']['playfield'];a=b['pool']['cueClearanceM'];L,W=b['pool']['outer']
 rect([px-pl/2-a,py-pw/2-a,px+pl/2+a,py+pw/2+a],'#e5eee3','#8eaa8c','6 4')
 rect([px-L/2,py-W/2,px+L/2,py+W/2]);rect(b['sofa'],'#d8cebd');rect(b['coffeeTable']);rect([6.92,-8.865,9.08,-8.8125],'#7e8679');rect([5.16,-7.66,5.65,-5.34],'#87978a')
 text(10.65,py,'Pool');text(7.12,-6.4,'Sofa');text(6.95,-9.1,'Retained stair edge');text(8.6,py-pw/2-a-.22,f'{622.5+dy*1000:.0f} mm','dim')
 s.append(f'<text x="{50+i*630}" y="535" class="sub">'+('The green envelope reserves all shots with a full cue.'if i==0 else'The 75 mm move is a geometric limit, not robust fit.')+'</text>')
for j,line in enumerate([f"Finding: {report['bar']['full_cue_candidates_tested']:,} feasible sampled placements/rotations did not produce a generous full-cue route.", 'A 75 mm north move leaves almost no construction tolerance; a smaller move gives a smaller benefit.', 'An optional shorter cue allowance at the stair-facing edge can release more room, but changes how pool is played.', 'Do not represent a broad simultaneous-use aisle without accepting that compromise or a larger layout change.', 'Concept XY envelope analysis only. Fixed furniture, occupied stools and the darts zone remain reserved.', 'Source: proposal/interiors/leisure/bar.json and current stair-guard dimensions.']):s.append(f'<text x="40" y="{665+j*31}" class="sub">{html.escape(line)}</text>')
s.append('</svg>');(OUT/'games-comparison.svg').write_text(''.join(s))
print('Wrote two measured proposal comparison sheets')
