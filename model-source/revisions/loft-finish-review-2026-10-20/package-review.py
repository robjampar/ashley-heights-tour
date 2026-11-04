"""Package the inspected native renders as a local evidence gallery."""
from pathlib import Path
import html,json
ROOT=Path(__file__).resolve().parents[2]
out=ROOT/'walkthrough/test-results/loft-finish-review-2026-10-20/native-review'
def figure(filename,title):
    assert (out/filename).is_file(),filename
    return f'<figure><a href="{filename}"><img src="{filename}" alt="{html.escape(title)}"></a><figcaption>{html.escape(title)}</figcaption></figure>'
parts=[
    ('Bedroom enclosure and layout',[
        ('planning-before-bedroom-north.png','Before · low knee wall and exposed ceiling step'),
        ('planning-final-bedroom-north.png','After · wall-backed bed, finished enclosure and fitted wardrobe')]),
    ('Desk and reading corner',[
        ('compact-final-bedroom-desk.png','Desk below the retained dormer window, with task lighting and a separate reading chair')]),
    ('Gallery ceiling junction',[
        ('planning-before-gallery-ceiling.png','Before · exposed junction between ceiling levels'),
        ('planning-final-gallery-ceiling.png','After · continuous finished ceiling')]),
    ('Courtyard pier',[
        ('planning-final-courtyard-pier.png','Planning · continuous brick return, with duplicate panels removed'),
        ('compact-final-courtyard-pier.png','Proposed · matching exterior finish role; native default shown')]),
]
body=''.join('<section><h2>'+html.escape(title)+'</h2><div class="grid">'+''.join(figure(*v)for v in views)+'</div></section>'for title,views in parts)
(out/'index.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ashley Heights · loft finish review</title><style>
body{margin:0;background:#f4f1eb;color:#292723;font:16px/1.5 system-ui,sans-serif}main{max-width:1500px;margin:auto;padding:40px 24px}h1{font-size:36px;line-height:1.15;max-width:750px}h2{font-size:23px;margin:40px 0 16px}.note{max-width:850px;color:#605c54}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr));gap:20px}figure{margin:0;background:white;border-radius:10px;overflow:hidden}img{width:100%;display:block}figcaption{padding:14px 18px}footer{margin-top:44px;padding:24px;background:#e9e4da;border-radius:10px}a{color:inherit}
</style><main><p>ASHLEY HEIGHTS · 20 OCTOBER 2026</p><h1>Finished loft bedroom and clean ceiling junctions</h1>
<p class="note">Native geometry review under neutral inspection lighting. These are not browser screenshots or a preview of the walkthrough’s baked lighting. Click an image to inspect it at full size.</p>'''+body+'''
<footer><strong>Basement footprint check</strong><p>The existing basement is approximately 111.37 m² beneath the main rectangular wing. It excludes projecting bays and stops 0.971 m short of the enlarged gym’s courtyard edge. The basement geometry is unchanged.</p>
<p><a href="http://127.0.0.1:8765/?design=proposed">Open the local Proposed walkthrough</a></p></footer></main></html>''')
print(out/'index.html')
