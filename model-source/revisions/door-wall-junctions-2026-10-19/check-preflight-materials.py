import json
from pathlib import Path
import numpy as np
R=Path(__file__).resolve().parents[2];g=json.loads((R/'outputs/output-door-wall-junctions-planning/geometry.json').read_text());nav=json.loads((R/'outputs/output-door-wall-junctions-planning/navigation.json').read_text());white=nav['planningApplication']['internal_wall_material'];a={o['object_name']:o for o in g['objects']}
for o in g['objects']:
 if o['name'].startswith(('Proposal | Garage north store separation','Proposal | Garage east separation')) and ' door 'not in o['name']:assert {o['materials'][i]for i in o['face_materials']}=={white},o['name']
old=json.loads((R/'revisions/door-wall-junctions-2026-10-19/original/outputs/output-proposed-planning/geometry.json').read_text());b={o['object_name']:o for o in old['objects']}
for name in ('Outside WC front pier','Outside WC front pier.001','Tool store front pier','Tool store front pier.001'):assert a[name]==b[name],name
print('All partition reveal faces are white; original outbuilding piers unchanged')
