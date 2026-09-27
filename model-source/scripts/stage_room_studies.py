"""Cache-safe publication of measured, furnished room studies."""
from pathlib import Path
import hashlib,json


def stage_room_studies(source,destination,previous,now,retirement,rooms):
    destination.mkdir(parents=True,exist_ok=True)
    sha=lambda payload:hashlib.sha256(payload).hexdigest()
    names={'studio.css','room-model.js'}
    for room in rooms:
        names.add(room+'-plan.svg')
        names.update('models/'+variant+'-'+room+suffix for variant in ('compact','planning')for suffix in ('.glb','.json'))
    shared=source/'shared-textures.json'
    if shared.exists():names.update(json.loads(shared.read_text()))
    mapping,manifest={},{}
    for name in sorted(names):
        payload=(source/name).read_bytes();relative=Path(name)
        if relative.parts[0]=='textures':
            assert len(relative.parts)==2 and relative.stem==sha(payload), 'Shared texture name must match exact image bytes'
            target=relative
        else:target=relative.with_name(relative.stem+'.'+sha(payload)[:16]+relative.suffix)
        mapping[name]=target.as_posix();out=destination/target;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(payload)
        manifest[target.as_posix()]={'source':name,'bytes':len(payload),'sha256':sha(payload)}
    pages={}
    for page in ('index',*rooms):
        html=(source/(page+'.html')).read_text()
        for name in ('studio.css','room-model.js'):html=html.replace('="'+name+'"','="'+mapping[name]+'"')
        if '<script type="module"'in html:html=html.replace('<script type="module"','<script>window.INTERIOR_ASSETS='+json.dumps(mapping)+';</script><script type="module"',1)
        (destination/(page+'.html')).write_text(html);pages[page+'.html']=sha(html.encode())
    retained={}
    for name,info in {**previous.get('previous_assets',{}),**previous.get('assets',{})}.items():
        target=(destination/name).resolve();assert target.is_relative_to(destination.resolve())
        if name in manifest:continue
        retired=retirement(info,now)
        if retired['retain_until_epoch']>now:retained[name]=retired
        else:target.unlink(missing_ok=True)
    return {'path':'./interiors/leisure/','rooms':list(rooms),'method':'Measured native room geometry; developed concepts for review','pages':pages,'assets':manifest,'previous_assets':retained}
