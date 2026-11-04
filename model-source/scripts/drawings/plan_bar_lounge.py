"""Draw the retained wine-bar island and added lounge furniture."""
import argparse
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, default=ROOT/'outputs/bar-layout/wine-bar-lounge.svg')
    args = parser.parse_args()
    base = json.loads((ROOT/'proposal/interiors/leisure/bar.json').read_text())
    detail = json.loads((ROOT/'walkthrough/public/visual-quality/compact-furnishings.json').read_text())['barDetails']
    scale = 63

    def point(x, y):
        return 70+(x-5.16)*scale, 130+(-4.23-y)*scale

    svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1000" viewBox="0 0 1200 1000"><style>text{font-family:Arial,sans-serif;fill:#283f36}.title{font-size:28px;font-weight:700}.body{font-size:17px}.small{font-size:12px}.furniture{fill:#c4b297;stroke:#7f7260;stroke-width:1.2}.cloth{fill:#9d6068;stroke:#65373f}.activity{fill:#cfddcf;stroke:#75927b;fill-opacity:.4;stroke-dasharray:6 4}</style><rect width="1200" height="1000" fill="#faf9f5"/><text x="55" y="50" class="title">Wine bar, lounge &amp; games</text><text x="55" y="82" class="body">Parisian Art Deco bar, a second high table and a fuller open lounge.</text>']

    def rect(bounds, css='furniture', label=None, rounded=False):
        a, b, c, d = bounds
        x, y = point(a, d)
        w, h = (c-a)*scale, (d-b)*scale
        svg.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" rx="{8 if rounded else 0}" class="{css}"/>')
        if label:
            svg.append(f'<text x="{x+w/2:.2f}" y="{y+h/2+4:.2f}" class="small" text-anchor="middle">{html.escape(label)}</text>')

    polygon = [(5.16,-8.845),(9.22,-8.845),(9.22,-16.076),(13.75,-16.076),(13.75,-4.23),(5.16,-4.23)]
    svg.append('<polygon points="'+' '.join(','.join(map(str,point(x,y))) for x,y in polygon)+'" fill="#f0ece2" stroke="#405749" stroke-width="4"/>')
    x,y = base['pool']['center']
    length,width = base['pool']['playfield']
    clearance = base['pool']['cueClearanceM']
    rect([x-length/2-clearance,y-width/2-clearance,x+length/2+clearance,y+width/2+clearance], 'activity')
    rect(detail.get('darts',base['darts'])['activityBounds'], 'activity', 'Darts activity')
    length,width = base['pool']['outer']
    rect([x-length/2,y-width/2,x+length/2,y+width/2], label='Pool')
    rect(base['sofa'], 'cloth', 'Sofa', True)
    rect(base['coffeeTable'], label='Table')
    rect([5.16,-7.66,5.65,-5.34], label='TV')
    rect(base['backCabinet'], label='Drinks storage / coolers')
    rect(base['counter'], label='Bar-height island')
    for x,y in base['stoolCenters']:
        rect([x-.23,y-.235,x+.23,y+.235], 'cloth', rounded=True)
    for furniture in detail['navigationExtras']['obstacles']:
        name = furniture['name']
        bounds = furniture['box']
        if 'side table' in name:
            a,b,c,d = bounds
            x,y = point((a+c)/2,(b+d)/2)
            svg.append(f'<circle cx="{x}" cy="{y}" r="{(c-a)*scale/2}" class="furniture"/>')
        else:
            rect(bounds, 'cloth' if any(word in name for word in ('chair','stool')) else 'furniture',
                 'High table' if 'salon high table' in name else None, rounded=True)
    rect([5.30,-9.785,10.02,-8.845], label='Retained stair')
    rect([5.16,-15.17,9.10,-10.027], label='Separate cinema')
    for bottom,top in [(-10.85,-10),(-15.95,-15.35)]:
        a,b = point(9.22,bottom)
        c,d = point(9.22,top)
        svg.append(f'<path d="M{a},{b}L{c},{d}" stroke="#faf9f5" stroke-width="7"/>')
    lines = [
        'The wine-bar island stays',
        'The 1.105 m-high island retains its',
        'three high stools and bronze footrail.',
        'Mirrored wine storage lines the wall.',
        '',
        'More places to settle in',
        'Two burgundy club chairs join the sofa.',
        'Stone side tables, books, a low console,',
        'artwork and lamps complete the room.',
        '',
        'Keep the routes usable',
        'The original 1.30 m aisle remains',
        'between the island and drinks cabinet.',
        'The room stays open at both ends.',
        '',
        'A second high table adds two seats.',
        'Darts moves beside pool; play alternately.',
        'The stair-side passing strip remains',
        'approximately 620 mm during pool play.',
        '',
        'Current visual proposal · 16 October 2026',
        'Furniture footprints come from the',
        'same manifest used by the walkthrough.',
    ]
    for i,line in enumerate(lines):
        svg.append(f'<text x="680" y="{160+i*29}" class="body">{html.escape(line)}</text>')
    svg.append('<text x="55" y="956" class="small">Concept arrangement. Dimensions from the model; furniture selection and detailed construction remain to be developed.</text></svg>')
    args.output.parent.mkdir(parents=True,exist_ok=True)
    args.output.write_text(''.join(svg))
    print('Wrote current wine-bar island and lounge plan')


if __name__ == '__main__':
    main()
