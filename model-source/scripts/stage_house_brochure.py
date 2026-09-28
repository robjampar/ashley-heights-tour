"""Stage referenced brochure assets, omitting unused drafts and duplicate PNGs."""
from pathlib import Path
import hashlib
import re
import zipfile
from urllib.parse import urlsplit


def stage_brochure(source, destination, downloads=None, release_base=None):
    destination.mkdir(parents=True,exist_ok=True)
    html=(source/'index.html').read_text()
    refs=set(re.findall(r'(?:src|href)="([^"]+)"',html))
    files={urlsplit(ref).path for ref in refs if ref and not ref.startswith(('#','/','data:','http:','https:'))}
    mapping={};manifest={}
    archive='ashley-heights-presentation-images.zip'
    # The display JPEGs retain the source resolution; reuse them for downloads
    # rather than publishing duplicate PNGs and a >100MB Git-incompatible ZIP.
    for name in sorted(files):
        if name==archive:continue
        relative=Path(name)
        if relative.parts[0]=='originals':relative=Path('images')/(relative.stem+'.jpg')
        origin=(source/relative).resolve()
        if not origin.is_relative_to(source.resolve()):raise ValueError(name)
        payload=origin.read_bytes();digest=hashlib.sha256(payload).hexdigest()
        target=relative.with_name(relative.stem+'.'+digest[:16]+relative.suffix)
        out=destination/target;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(payload)
        mapping[name]=target.as_posix()
        manifest[target.as_posix()]={'source':relative.as_posix(),'bytes':len(payload),'sha256':digest}
    zip_path=destination/archive
    image_names=sorted({v['source']for v in manifest.values()if v['source'].startswith('images/')})
    with zipfile.ZipFile(zip_path,'w',compression=zipfile.ZIP_STORED)as z:
        for name in image_names:
            info=zipfile.ZipInfo(Path(name).name,date_time=(2026,9,28,0,0,0))
            z.writestr(info,(source/name).read_bytes())
    digest=hashlib.sha256(zip_path.read_bytes()).hexdigest()
    target=zip_path.with_name(zip_path.stem+'.'+digest[:16]+zip_path.suffix)
    zip_path.replace(target);mapping[archive]=target.name
    manifest[target.name]={'source':'archive of full-resolution display JPEGs','bytes':target.stat().st_size,'sha256':digest}
    external={}
    if downloads is not None:
        if not release_base or not release_base.startswith('https://github.com/'):
            raise ValueError('Explicit GitHub release download URL required')
        downloads.mkdir(parents=True,exist_ok=True)
        for name,info in list(manifest.items()):
            if Path(name).suffix not in ('.pdf','.zip'):continue
            import shutil
            shutil.copy2(destination/name,downloads/name)
            external[name]={**info,'url':release_base.rstrip('/')+'/'+name}
            for original,target_name in list(mapping.items()):
                if target_name==name:mapping[original]=external[name]['url']
            (destination/name).unlink()
            del manifest[name]
    def rewrite(match):
        attr,ref=match.groups()
        if ref=='/?design=proposed':return attr+'="../?design=proposed"'
        parsed=urlsplit(ref)
        if parsed.path not in mapping:return match.group(0)
        value=mapping[parsed.path]+('?' + parsed.query if parsed.query else '')+('#'+parsed.fragment if parsed.fragment else '')
        return attr+'="'+value+'"'
    html=re.sub(r'(src|href)="([^"]+)"',rewrite,html)
    html=re.sub(r'Download all (\d+) images',r'Download all \1 images (JPEG)',html)
    (destination/'index.html').write_text(html)
    for name,info in manifest.items():
        if info['bytes']>=100_000_000:raise ValueError('Asset exceeds GitHub file limit: '+name)
    pages=re.search(r'(\d+) pages,',html)
    return {'path':'./brochure/','pages':int(pages[1]) if pages else None,'images':len(image_names),'download_format':'Full-resolution high-quality JPEG','assets':manifest,'external_downloads':external}
