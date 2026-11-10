"""Stage a checked main walkthrough, preserving published tours and study links.

Runtime visual/vehicle directories are immutable per release, so cached pages
cannot combine a new model with an earlier lighting or furnishing overlay.
No native projects, local duplicates or private workspace files are published.
"""
import hashlib,json,re,sys,shutil,argparse
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.publication.model_delivery import delivery_asset
from scripts.publication.pages_artifact import public_bytes
from scripts.publication.structure_delivery import package_structure, redirect_structure

def stage(root=ROOT,recovery_dir=None,repo=None):
    recovery_dir=recovery_dir or root/'revisions/structural-publication-2026-11-04/expired-public-assets'
    dist=root/'walkthrough/dist';repo=Path(repo) if repo else root/'deployment/ashley-heights-tour';dest=repo/'model'
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
            'people':[m['file'] for m in json.loads((dist/'people/assets.json').read_text())['models']]+['assets.json','LICENSE.txt'],
            'zombies':[m['file'] for m in json.loads((dist/'zombies/assets.json').read_text())['models']]+['assets.json','LICENSE.txt'],
            'vehicles':[f'{v}.{s}'for v in('tesla-model-3','fiat-500','nissan-nv200')for s in('glb','json')]+['credits.html','CREDITS.md']}
    for directory,names in groups.items():
        payload={name:(dist/directory/name).read_bytes()for name in sorted(names)}
        if directory=='vehicles':
            credits=payload['credits.html'].decode()
            for characters in ('people','zombies'):
                credits=credits.replace('../'+characters+'/', '../../'+directories[characters])
            credits=credits.replace('href="../?design=proposed"','href="../../?design=proposed"')
            payload['credits.html']=credits.encode()
        key=sha(json.dumps({n:sha(v)for n,v in payload.items()},sort_keys=True).encode())[:16]
        prefix=f'{directory}/{key}/';directories[directory]=prefix
        assert './'+directory+'/' in app,directory
        app=app.replace('./'+directory+'/', './'+prefix)
        for name,data in payload.items():runtime[prefix+name]=write(prefix+name,data)
    prefix,payload,members=package_structure(dist,sources['proposal-compact.glb']['path'])
    assert app.count('./structure/')==1
    app=app.replace('./structure/', './'+prefix)
    app=app.replace('../proposal-compact.glb','../../'+sources['proposal-compact.glb']['path'])
    for name,data in payload.items():runtime[prefix+name]=write(prefix+name,data)
    directories['structure']=prefix
    write('structure/index.html',redirect_structure(prefix))
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
    # Preserve the currently published issue for cached clients. Only previously
    # retired assets whose retention window has elapsed may leave the site.
    now=datetime.now(timezone.utc);retained=manifest.setdefault('previous_assets',{})
    archived=[]
    for name,info in list(retained.items()):
        if name in previous['assets'] or name in assets or info.get('retain_until_epoch',float('inf'))>now.timestamp():continue
        source=dest/name
        assert source.resolve().is_relative_to(dest.resolve())
        if source.exists():
            assert sha(source.read_bytes())==info['sha256'],name
            recovery=recovery_dir/name
            recovery.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,recovery)
            source.unlink();archived.append('model/'+name)
        retained.pop(name)
    for name,info in previous['assets'].items():
        if name not in assets:retained[name]={**info,'retired_at_epoch':now.timestamp(),'retain_until_epoch':now.timestamp()+1800}
    for name in assets:retained.pop(name,None)
    manifest['previous_runtime_assets']={**previous.get('previous_runtime_assets',{}),**previous.get('runtime_assets',{})}
    for name in runtime:manifest['previous_runtime_assets'].pop(name,None)
    manifest.update(assets=assets,runtime_assets=runtime,runtime_directories=directories,source_assets=sources,published_utc=now.isoformat(),release_method='Verified main walkthrough update; existing photo tour, brochure and room studies preserved.')
    manifest['characters']={name:{'runtimePath':'./'+directories[name],
        'models':len(json.loads((dist/name/'assets.json').read_text())['models']),
        'bytes':sum(m['bytes'] for m in json.loads((dist/name/'assets.json').read_text())['models'])}
        for name in ('people','zombies')}
    for variant,key in [('compact','proposal'),('planning','planning')]:
        n=json.loads((dist/f'proposal-{variant}-navigation.json').read_text());folder=root/f'outputs/output-proposed-{variant}';label='compact'if variant=='compact'else'planning application'
        for suffix,path in [('native',folder/f'Ashley Heights — Proposed ({label}).blend'),('geometry',folder/'geometry.json')]:manifest['designs'][key+'_'+suffix+'_sha256']=sha(path.read_bytes())
        manifest['designs'][key+'_updated_at']=n['modelUpdatedAt']
        manifest.setdefault('current_revisions',{})[variant]={k:n[k]['revision']for k in('continuousWingRoof','gardenWorkshopEnvelope')if k in n}
    manifest['structure']={'path':'./structure/','runtimePath':'./'+prefix,'revision':members['revision'],'members':len(members['elements']),'approvedForConstruction':members['approvedForConstruction']}
    if members.get('garageBeamBlock'):
        deck=members['garageBeamBlock']
        manifest['structure']['garageDeck']={'defaultOption':deck['defaultOption'],'selection':deck['selection'],'members':len(deck['elements']),'enquiryPack':'./'+prefix+'garage-deck-enquiry.pdf','approvedForConstruction':False}
    manifest['validation']={'revision':'WM01-west-brick-finish-2026-10-29','sha256':sha((root/'revisions/west-recess-brick-finish-2026-10-29/validation.json').read_bytes()),'scope':'Material/export checks and prior WM01 model validation; publication browser checks recorded separately.'}
    write('release.json',(json.dumps(manifest,indent=2)+'\n').encode())
    total=public_bytes(repo);assert total<1_000_000_000,total
    manifest['staged_site_bytes']=total;write('release.json',(json.dumps(manifest,indent=2)+'\n').encode())
    return {'stagedBytes':public_bytes(repo),'writtenFiles':sorted(set(written)),'archivedExpiredFiles':archived,'sourceAssets':sources,'runtimeDirectories':directories,'currentRevisions':manifest['current_revisions'],'structure':manifest['structure']}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--record-dir',type=Path,default=ROOT/'walkthrough/test-results/structural-publication-2026-11-04');parser.add_argument('--recovery-dir',type=Path);parser.add_argument('--repo',type=Path);args=parser.parse_args()
    result=stage(recovery_dir=args.recovery_dir,repo=args.repo);out=args.record_dir;out.mkdir(parents=True,exist_ok=True)
    (out/'staging.json').write_text(json.dumps(result,indent=2));print(json.dumps({k:v for k,v in result.items()if k not in('writtenFiles','sourceAssets')},indent=2));print('Files written:',len(result['writtenFiles']))
