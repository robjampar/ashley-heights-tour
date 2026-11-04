import json,struct,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/bedroom4-stair-suite-2026-10-22'
meta=json.loads((E/'study.json').read_text());defs=json.loads((E/'study-meshes.json').read_text())['meshes'];raw=(E/'study.bin').read_bytes();floats=struct.unpack('<'+str(len(raw)//4)+'f',raw)
source_names=set(meta['altered'])|set(meta['removed']);parts=[]
for d in defs:
 if d['name'] in source_names or d['tag']=='furniture':continue
 data=floats[d['offset']:d['offset']+d['count']*3];vertices=[[round(data[i],6),round(-data[i+2],6),round(data[i+1],6)]for i in range(0,len(data),3)]
 parts.append({'name':d['name'],'role':d['tag'],'color':d['material']['color'],'vertices':vertices,'faces':[[i,i+1,i+2]for i in range(0,len(vertices),3)]})
asset={'revision':'bedroom4-stair-suite-2026-10-22','sourceStudyBufferSHA256':hashlib.sha256(raw).hexdigest(),'retired':meta['removed'],'parts':parts,'configuration':json.loads((Path(__file__).parent/'study.json').read_text())}
p=R/'proposal/specs/bedroom4-stair-suite-components.json';p.write_text(json.dumps(asset,separators=(',',':')))
print('frozen components',len(parts))
