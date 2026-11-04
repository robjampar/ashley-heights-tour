from pathlib import Path
p=Path(__file__).parent/'build-study.mjs';s=p.read_text()
s=s.replace("cutters.push([3.6,3.09,2.79,4.5,3.29,4.95],[3.65,3.125,2.79,3.91,4.53,5.05]);", "cutters.push([0,3.1,2.795,5.83,3.28,5.25],[-2.88,4.20,2.795,0,4.36,5.17],[3.65,3.125,2.79,3.91,4.53,5.05]);")
s=s.replace("box('Winder west integrated enclosure',[4.5,.28,4.6,1.31],2.8,5.237);",'// Suite dividing wall also encloses the west side of the winders.')
s=s.replace("// Landing guarding stops at the stair mouth. No glass balustrade.","""// Closed plaster edges to the new trimmed loft opening.
for(const x of[4.53,5.57])box('New stairwell plaster reveal',[x-.003,2.286,x+.003,4.55],5.10,5.55,'plaster','roof');
box('New stairwell top landing fascia',[4.53,4.55,5.57,4.556],5.10,5.55,'plaster','roof');
// Landing guarding stops at the stair mouth. No glass balustrade.""")
p.write_text(s)
