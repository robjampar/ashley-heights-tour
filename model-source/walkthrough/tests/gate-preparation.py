"""Read-only extraction test: never runs prepare_walkthrough's public writes."""
import ast,json,math,struct
from pathlib import Path
from shapely.geometry import Point,Polygon
ROOT=Path(__file__).resolve().parents[2]
script=ROOT/'scripts/prepare_walkthrough.py';tree=ast.parse(script.read_text())
ns={'math':math,'json':json,'struct':struct}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in('gate_navigation','interactive_doors')],type_ignores=[]),str(script),'exec'),ns)
model=json.loads((ROOT/'output-walkthrough/geometry.json').read_text());old=json.loads((ROOT/'walkthrough/public/navigation.json').read_text())
gates=ns['gate_navigation'](model);doors=ns['interactive_doors'](model,ROOT/'output-walkthrough/Ashley Heights.glb')
prior=[d for d in old['interactiveDoors']if d['wall']!='Entrance driveway gates']
assert doors[:len(prior)]==prior and len(prior)==21
assert len(doors)==23
assert [len(d['members'])for d in gates['doors']]==[483,483]
members=[n for d in gates['doors']for n in d['members']]
assert len(set(members))==966
assert all('Gate connector'not in n and 'pier'not in n and 'lantern'not in n for n in members)
assert len(gates['obstacles'])==4
arrival=Point(gates['arrival']['position'][:2])
assert not Polygon(model['site']['outline_m']).contains(arrival)
assert Polygon(gates['approachSurface']['polygon']).contains(arrival)
for d in gates['doors']:assert abs(abs(d['closedDelta'])-math.pi/2)<.00001
candidate={**old,'walls':[w for w in old['walls']if w['name']!='Entrance driveway gates']+[gates['wall']],
 'rooms':[r for r in old['rooms']if r['id']!='arrival']+[gates['arrival']],
 'obstacles':[o for o in old['obstacles']if o['name']not in {v['name']for v in gates['obstacles']}]+gates['obstacles'],
 'interactiveDoors':doors,'approachSurface':gates['approachSurface']}
out=ROOT/'walkthrough/tests/gates';out.mkdir(exist_ok=True)
(out/'navigation-candidate.json').write_text(json.dumps(candidate,separators=(',',':')))
result={'prior_assemblies_unchanged':21,'assemblies':23,'gate_leaves':2,'gate_parts':966,'fixed_piers':4,
 'arrival_outside_title_boundary':True,'arrival_on_approach_surface':True,'arrival':gates['arrival'],'errors':[]}
(out/'preparation-validation.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
