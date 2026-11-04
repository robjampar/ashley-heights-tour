"""Package native diagnostic renders separately from browser-review evidence."""
import html
import json
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
out = ROOT / 'walkthrough/test-results/door-wall-junctions-2026-10-19/native-review'
panels = []
for variant in ('compact', 'planning'):
    manifest = json.loads((out / f'{variant}-manifest.json').read_text())
    corrected = out / f'{variant}-corrected-manifest.json'
    if corrected.exists():
        new = json.loads(corrected.read_text())
        by_key = {(v['door'],v['side']):v for v in new['views']}
        manifest['views'] = [by_key.get((v['door'],v['side']),v) for v in manifest['views']]
    sheet = Image.new('RGB', (1800, 1730), '#ecebea')
    draw = ImageDraw.Draw(sheet)
    draw.text((20, 15), f'{variant.upper()} | Native geometry diagnostics — not walkthrough screenshots', fill='#222222')
    for index, view in enumerate(manifest['views']):
        picture = Image.open(out / view['image']).convert('RGB')
        picture.thumbnail((430, 530))
        x, y = (index % 4) * 450 + 10, (index // 4) * 560 + 45
        sheet.paste(picture, (x + (430 - picture.width) // 2, y))
        title = view['image'].replace(variant + '-', '').replace('.png', '')
        draw.text((x + 8, y + 532), title, fill='#222222')
        panels.append(f'<figure><a href="{view["image"]}"><img loading="lazy" src="{view["image"]}" alt="{html.escape(view["door"])}"></a><figcaption>{html.escape(variant + " · " + view["door"])} · side {view["side"]:+d}</figcaption></figure>')
    sheet.save(out / f'{variant}-contact-sheet.jpg', quality=94)
    corrected_image=out/f'{variant}-cinema--1-corrected.png'
    if corrected_image.exists():
        comparison=Image.new('RGB',(770,660),'#ecebea')
        labels=ImageDraw.Draw(comparison)
        labels.text((20,15),variant.upper()+' | Cinema header | Native geometry diagnostics',fill='#222222')
        for index,(label,path)in enumerate([('Before: coincident wall faces',out/f'{variant}-cinema--1.png'),('After: redundant pier removed and header trimmed',corrected_image)]):
            labels.text((25,50+index*300),label,fill='#222222')
            crop=Image.open(path).convert('RGB').crop((180,90,540,220)).resize((720,260))
            comparison.paste(crop,(25,75+index*300))
        comparison.save(out/f'{variant}-cinema-comparison.png')
(out / 'index.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Door junction geometry review</title><style>body{font:16px/1.5 system-ui;margin:32px;background:#eee;color:#222}header{max-width:900px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}figure{margin:0;background:white;padding:12px}img{width:100%;height:auto}figcaption{padding:10px 0}</style><header><h1>Door junction geometry review</h1><p>Actual final native geometry under neutral inspection lighting. Door leaves and furniture are omitted to expose both sides of the frame. Click an image for full resolution.</p><p><strong>These are not walkthrough screenshots.</strong> They check model geometry; browser materials and runtime rendering remain pending because the browser connection is unavailable.</p></header><main>''' + ''.join(panels) + '</main></html>')
