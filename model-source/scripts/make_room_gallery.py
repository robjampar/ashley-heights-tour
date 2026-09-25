"""Standalone local photo/render gallery; both images are literal saved assets."""
import json
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
views = json.loads((ROOT/'photo-review/views.json').read_text())
native = ROOT/'output-walkthrough/Ashley Heights.blend'
stamp = datetime.fromtimestamp(native.stat().st_mtime, ZoneInfo('Europe/London')).strftime('%d %b %Y, %H:%M %Z')
for view in views:
    assert (ROOT/'photo-review/walkthrough'/f"{view['key']}.png").stat().st_mtime > native.stat().st_mtime
data = json.dumps([{k: v[k] for k in ('key', 'room')} for v in views])
html = r'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ashley Heights · photo comparisons</title>
<style>body{font:16px/1.5 system-ui;background:#f8f6ef;color:#243e33;margin:0}main{padding:24px;max-width:1900px;margin:auto}header{position:sticky;top:0;background:#f8f6eff5;padding:12px 0;z-index:2}h1{margin:0 0 10px;font-size:28px}select,button{font:inherit;padding:9px;margin:4px;border-radius:5px;border:1px solid #8da090;background:white;color:#243e33}small{display:block;color:#5b6d60}a{color:#245f48}.note{max-width:1050px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px;position:relative}.pair img{display:block;width:100%;height:auto}.pair figure{margin:0}.pair figcaption{font-weight:600;padding:8px 0}.overlay{display:block;max-width:1100px;margin:auto}.overlay figure:last-child{position:absolute;inset:0;opacity:var(--opacity,.5);pointer-events:none}.overlay figcaption{visibility:hidden}.slider{margin:10px 0}input{vertical-align:middle;width:240px}#error{color:#a32f28}@media(max-width:800px){.pair:not(.overlay){grid-template-columns:1fr}}</style>
<main><header><h1>Compare the house, room by room</h1><select id="room" aria-label="Select room view"></select><button id="prev">Previous</button><button id="next">Next</button><select id="mode" aria-label="Comparison layout"><option value="pair">Side by side</option><option value="overlay">Overlay</option></select><small id="key"></small></header>
<p class="note">Original photographs and actual Blender renders of the model updated __STAMP__. Positions, camera fits and decorative details still include estimates. Use the view number to identify a remaining difference.</p>
<div class="slider" id="slider" hidden><label for="opacity">Overlay: original <input id="opacity" type="range" min="0" max="100" value="50"> model</label></div><p id="error" role="status"></p>
<div id="pair" class="pair"><figure><figcaption>Original photograph</figcaption><a id="src-link" target="_blank"><img id="source" alt="Original house photograph"></a></figure><figure><figcaption>Current model render</figcaption><a id="render-link" target="_blank"><img id="render" alt="Blender render from the estimated matching viewpoint"></a></figure></div>
<p><a href="index.html">Review your selections and the remaining height conflict</a> · <a href="../../output-walkthrough/Photo%20comparison.pdf">All 114 comparisons as a PDF</a></p></main>
<script>const views=__DATA__;const $=id=>document.getElementById(id),rooms=$('room');
for(const v of views){const o=document.createElement('option');o.value=v.key;o.textContent=v.room+' · '+v.key;rooms.append(o)}
const initial=new URLSearchParams(location.search).get('view');rooms.value=views.some(v=>v.key===initial)?initial:'2445658-0';
function update(){const v=views[rooms.selectedIndex];const source=v.key.startsWith('listing-')?'../../source/listing-photos/'+v.key.split('-')[1]+'.jpg':'../originals/'+v.key+'.jpg';const render='../walkthrough/'+v.key+'.png';$('source').src=source;$('src-link').href=source;$('render').src=render;$('render-link').href=render;$('key').textContent='View '+v.key+' — '+v.room;$('error').textContent='';}
for(const id of ['source','render'])$(id).onerror=()=>{$('error').textContent='An image could not be loaded. Keep this page in the project folder with its source and render folders.';};
rooms.onchange=update;$('next').onclick=()=>{rooms.selectedIndex=(rooms.selectedIndex+1)%views.length;update()};$('prev').onclick=()=>{rooms.selectedIndex=(rooms.selectedIndex+views.length-1)%views.length;update()};
$('mode').onchange=()=>{const overlay=$('mode').value==='overlay';$('pair').classList.toggle('overlay',overlay);$('slider').hidden=!overlay;};$('mode').value=new URLSearchParams(location.search).get('mode')==='overlay'?'overlay':'pair';$('mode').onchange();$('opacity').oninput=()=>{$('pair').style.setProperty('--opacity',$('opacity').value/100)};update();</script></html>'''
(ROOT/'photo-review/decisions/rooms.html').write_text(html.replace('__STAMP__', stamp).replace('__DATA__', data))
print('ROOM_GALLERY', len(views), stamp)
