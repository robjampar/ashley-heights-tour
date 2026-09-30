"""Read-only concept geometry experiments. No design files are changed."""
import json, math, hashlib
from pathlib import Path
from shapely.geometry import Polygon,box,Point
from shapely.affinity import rotate,translate
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).resolve().parent
load=lambda p:json.loads((ROOT/p).read_text())
bar=load('proposal/interiors/leisure/bar.json');cinema=load('proposal/interiors/leisure/cinema.json');side=load('proposal/interiors/leisure/sidebed.json')
floor=Polygon([[5.16,-8.845],[9.22,-8.845],[9.22,-16.076],[13.75,-16.076],[13.75,-4.23],[5.16,-4.23]])
fixed=unary_union([box(6.92,-8.865,9.08,-8.8125),box(*bar['sofa']),box(*bar['coffeeTable']),box(5.16,-7.66,5.65,-5.34),box(*bar['counter']),box(*bar['backCabinet']),box(*bar['darts']['activityBounds']),*[box(x-.3,y-.3,x+.3,y+.4)for x,y in bar['stoolCenters']]])
start=Point(9.7,-9.28);target=Point(8.42,-7.98)
def bottleneck(cue):
 free=floor.difference(unary_union([fixed,cue]))
 lo,hi=0,1.3
 for _ in range(13):
  width=(lo+hi)/2;inner=free.buffer(-width/2,join_style=2)
  parts=list(inner.geoms) if inner.geom_type=='MultiPolygon' else [inner]
  if any(p.covers(start)and p.covers(target) for p in parts):lo=width
  else:hi=width
 return round(lo,3)
px,py=bar['pool']['center'];l,w=bar['pool']['playfield'];c=bar['pool']['cueClearanceM']
base=box(px-l/2-c,py-w/2-c,px+l/2+c,py+w/2+c)
rows=[]
for angle in (0,90):
 shape=rotate(base,angle,origin=(px,py))
 for dx in [i*.025 for i in range(-12,25)]:
  for dy in [i*.025 for i in range(-32,5)]:
   candidate=translate(shape,dx,dy)
   if not floor.covers(candidate) or fixed.intersects(candidate):continue
   rows.append({'rotation_deg':angle,'shift_m':[round(dx,3),round(dy,3)],'bottleneck_m':bottleneck(candidate),'cue_bounds':list(candidate.bounds)})
rows.sort(key=lambda r:r['bottleneck_m'],reverse=True)
# Same placement and 1.525 m cue allowance except the stair-facing edge.
shorter=box(px-l/2-c,py-w/2-1.40+.075,px+l/2+c,py+w/2+c+.075)
cinema_gap=cinema['sofa']['bounds'][1]-cinema['coffeeTable'][3]
cinema_new=cinema['coffeeTable'].copy();cinema_new[3]-=.30
report={'scope':'Concept XY operating envelopes only; not surveyed or accessibility/construction verification','sources':{p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest()for p in ['proposal/interiors/leisure/bar.json','proposal/interiors/leisure/cinema.json','proposal/interiors/leisure/sidebed.json']},'bar':{'assumptions':['Both pool playfield axes retain 1.525 m cue allowance in the full-cue search.','Darts and occupied stools are reserved simultaneously.','Body treated as a circular plan envelope; no 3D/headroom check. The north stair guard projects 32.5 mm into the room floor outline.','Entry and lounge approach held fixed for comparison.'],'start':list(start.coords)[0],'target':list(target.coords)[0],'baseline_reserved_cue_band_m':round(base.bounds[1]-(-8.8125),4),'baseline_tested_body_width_m':bottleneck(base),'full_cue_candidates_tested':len(rows),'best_candidates':rows[:10],'shorter_stair_side_cue_study':{'south_allowance_m':1.4,'table_north_shift_m':.075,'reserved_band_m':round(shorter.bounds[1]-(-8.8125),4),'tested_body_width_m':bottleneck(shorter),'fits':floor.covers(shorter) and not fixed.intersects(shorter)}},'cinema':{'current_table_bounds':cinema['coffeeTable'],'current_empty_sofa_to_table_gap_m':round(cinema_gap,3),'candidate_table_bounds':cinema_new,'candidate_table_depth_m':round(cinema_new[3]-cinema_new[1],3),'candidate_empty_sofa_to_table_gap_m':round(cinema['sofa']['bounds'][1]-cinema_new[3],3),'tradeoff':'The 300 mm improvement comes by moving the table edge away from the seats. It reduces seated reach; side/console drink surfaces need to carry that function. Occupied knees still need testing.'},'sidebed':{'current_foot_turn_m':round(side['bed']['envelope'][0]-(-2.82),3),'frame_length_m':side['bed']['frameLength'],'mattress_length_m':side['bed']['mattress'][1],'maximum_theoretical_gain_without_mattress_change_m':round(side['bed']['frameLength']-side['bed']['mattress'][1],3),'finding':'Only 120 mm is outside the mattress length, including both frame ends. A shorter frame cannot honestly promise a large clearance improvement; use a real product or assess a local partition adjustment separately.'}}
(OUT/'spatial-comparisons.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
