"""Stage a checked main walkthrough, preserving published tours and study links.

Runtime visual/vehicle directories are immutable per release, so cached pages
cannot combine a new model with an earlier lighting or furnishing overlay.
No native projects, local duplicates or private workspace files are published.
"""
import hashlib,json,re,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.publication.model_delivery import delivery_asset
from scripts.publication.pages_artifact import public_bytes

def stage(root=ROOT):
    dist=root/'walkthrough/dist';repo=root/'deployment/ashley-heights-tour';dest=repo/'model'
    previous=json.loads((dest/'release.json').read_text());manifest=json.loads(json.dumps(previous))
    sha=lambda data:hashlib.sha256(data).hexdigest()
    written=[];sources={};assets={}
    def write(relative,data):
        p=dest/relative;p.parent.mkdir(parents=True,exist_ok=True)
        if not p.exists()or p.read_bytes()!=data:p.write_bytes(data);written.append('model/'+relative)
        return {'bytes':len(data),'sha256':sha(data)}
    model_files=['house.glb','navigation.json','proposal-compact.glb','proposal-compact-navigation.json','proposal-planning.glb','proposal-planning-navigation.json']
    model_files += [f'redesign-{option}{suffix}'for option in('i1','i2','i3','e1','e2','e3','g1')for suffix in('.glb','-navigation.json')]
    for name in model_files+['style.css']:
        raw=(dist/name).read_bytes();target,data=delivery_asset(name,raw);sources[name]={'path':target.as_posix(),'sourceSHA256':sha(raw)}
        assets[target.as_posix()]=write(target.as_posix(),data)
    app=(dist/'app.js').read_text()
    for name in model_files:
        token=json.dumps(name);assert app.count(token)==1,(name,app.count(token))
        app=app.replace(token,json.dumps(sources[name]['path']))
    runtime={};directories={}
    groups={'visual-quality':[f'{v}-{s}'for v in('compact','planning')for s in('daylight.json','furnishings.json','furnishings.glb')]+['daylight-settings.json'],
            'vehicles':[f'{v}.{s}'for v in('tesla-model-3','fiat-500','nissan-nv200')for s in('glb','json')]+['credits.html','CREDITS.md']}
    for directory,names in groups.items():
        payload={name:(dist/directory/name).read_bytes()for name in sorted(names)}
        key=sha(json.dumps({n:sha(v)for n,v in payload.items()},sort_keys=True).encode())[:16]
        prefix=f'{directory}/{key}/';directories[directory]=prefix
        assert './'+directory+'/' in app,directory
        app=app.replace('./'+directory+'/', './'+prefix)
        for name,data in payload.items():runtime[prefix+name]=write(prefix+name,data)
    app=re.sub(r'\n?//# sourceMappingURL=.*','',app).encode();app_name=f'app.{sha(app)[:16]}.js';assets[app_name]=write(app_name,app)
    html=(dist/'index.html').read_text()
    for source,target in [('app.js',app_name),('style.css',sources['style.css']['path'])]:
        assert html.count('./'+source)==1;html=html.replace('./'+source,'./'+target)
    html=html.replace('./vehicles/credits.html','./'+directories['vehicles']+'credits.html')
    write('index.html',html.encode())
    textures=manifest.setdefault('shared_textures',{})
    for relative in json.loads((dist/'shared-textures.json').read_text()):
        p=Path(relative);data=(dist/p).read_bytes();assert p.parts[0]=='textures'and len(p.parts)==2 and p.stem==sha(data)
        textures[relative]=write(relative,data)
    for name in('THREE-LICENSE.txt','MESHOPT-LICENSE.txt'):write(name,(dist/name).read_bytes())
    # All formerly referenced files remain. This update is comfortably below
    # the Pages budget and needs no deletion or staged cache-expiry rollout.
    now=datetime.now(timezone.utc);retained=manifest.setdefault('previous_assets',{})
    for name,info in previous['assets'].items():
        if name not in assets:retained[name]={**info,'retired_at_epoch':now.timestamp(),'retain_until_epoch':now.timestamp()+1800}
    for name in assets:retained.pop(name,None)
    manifest['previous_runtime_assets']={**previous.get('previous_runtime_assets',{}),**previous.get('runtime_assets',{})}
    for name in runtime:manifest['previous_runtime_assets'].pop(name,None)
    manifest.update(assets=assets,runtime_assets=runtime,runtime_directories=directories,source_assets=sources,published_utc=now.isoformat(),release_method='Verified main walkthrough update; existing photo tour, brochure and room studies preserved.')
    for variant,key in [('compact','proposal'),('planning','planning')]:
        n=json.loads((dist/f'proposal-{variant}-navigation.json').read_text());folder=root/f'outputs/output-proposed-{variant}';label='compact'if variant=='compact'else'planning application'
        for suffix,path in [('native',folder/f'Ashley Heights — Proposed ({label}).blend'),('geometry',folder/'geometry.json')]:manifest['designs'][key+'_'+suffix+'_sha256']=sha(path.read_bytes())
        manifest['designs'][key+'_updated_at']=n['modelUpdatedAt']
        manifest.setdefault('current_revisions',{})[variant]={k:n[k]['revision']for k in('continuousWingRoof','gardenWorkshopEnvelope')if k in n}
    manifest['validation']={'revision':'garden-workshop-envelope-2026-10-26','sha256':sha((root/'walkthrough/test-results/garden-workshop-envelope-2026-10-26/final-validation.json').read_bytes()),'pythonTests':114,'viewerTests':279}
    write('release.json',(json.dumps(manifest,indent=2)+'\n').encode())
    total=public_bytes(repo);assert total<1_000_000_000,total
    manifest['staged_site_bytes']=total;write('release.json',(json.dumps(manifest,indent=2)+'\n').encode())
    return {'stagedBytes':public_bytes(repo),'writtenFiles':sorted(set(written)),'sourceAssets':sources,'runtimeDirectories':directories,'currentRevisions':manifest['current_revisions']}

if __name__=='__main__':
    result=stage();out=ROOT/'walkthrough/test-results/publication-2026-10-26';out.mkdir(parents=True,exist_ok=True)
    (out/'staging.json').write_text(json.dumps(result,indent=2));print(json.dumps({k:v for k,v in result.items()if k not in('writtenFiles','sourceAssets')},indent=2));print('Files written:',len(result['writtenFiles']))
