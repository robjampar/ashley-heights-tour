#!/usr/bin/env python3
"""Local owner-review board. Never changes design files or publishes."""
import argparse, signal, hashlib, http.server, json, mimetypes, os, secrets, socket, subprocess, sys, tempfile, threading, time, urllib.parse, urllib.request
from datetime import datetime, timezone
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
IDENTITY='ashley-heights-100-review-v1'
LOCK=threading.RLock()
TOKEN=secrets.token_urlsafe(32)
sys.path.insert(0,str(ROOT))
from scripts.maintenance.recorded_paths import current_path
DATA={};ITEMS={};ALLOWED=set();_INVENTORY_BYTES=None
def refresh_inventory():
 global DATA,ITEMS,ALLOWED,_INVENTORY_BYTES
 raw=(HERE/'proposals.json').read_bytes()
 if raw==_INVENTORY_BYTES:return
 data=json.loads(raw)
 items={x['id']:x for x in data['items']}
 if len(items)!=len(data['items']):raise ValueError('Duplicate review proposal IDs')
 allowed={source for x in items.values() for source in x['sources']}
 allowed.add('revisions/whole-house-review-2026-09-29/ANALYSIS.md')
 for x in items.values():
  for key in ('plan','image'):
   if x.get(key):allowed.add(x[key])
 DATA,ITEMS,ALLOWED,_INVENTORY_BYTES=data,items,allowed,raw
refresh_inventory()
STATE_DIR=HERE/'decisions'
def comparisons():
 p=HERE/'comparisons.json'
 return json.loads(p.read_text()).get('items',{}) if p.exists() else {}
def comparison_files():
 return {v[k] for v in comparisons().values() for k in ('before','after','manifest','preview') if v.get(k)}
def now():return datetime.now(timezone.utc).isoformat()
def initial():return {'version':1,'revision':0,'decisions':{},'history':[]}
def state():
 p=STATE_DIR/'decisions.json'
 st=json.loads(p.read_text()) if p.exists() else initial()
 for ident,entry in st['decisions'].items():
  if ident in ITEMS and entry.get('proposalHash')!=ITEMS[ident].get('proposalHash'):
   entry['previousStatus']=entry.get('previousStatus',entry['status']);entry['status']='unreviewed';entry['outdated']=True
 return st
def atomic_write(path,data):
 path.parent.mkdir(parents=True,exist_ok=True)
 fd,name=tempfile.mkstemp(prefix='.saving-',dir=path.parent)
 try:
  with os.fdopen(fd,'w') as f:
   json.dump(data,f,indent=2,ensure_ascii=False);f.write('\n');f.flush();os.fsync(f.fileno())
  os.replace(name,path)
 finally:
  if os.path.exists(name):os.unlink(name)
def markdown(st):
 lines=['# Ashley Heights — 100 improvement proposals','',DATA['status'],'',DATA['approvalMeaning'],'']
 for x in DATA['items']:
  decision=st['decisions'].get(x['id'],{})
  visual=comparisons().get(x['id'],{})
  lines += [f"## {x['id']} · {x['title']}",'',f"**{x['area']} · {x['priority']} priority · {x['scale']} change · {decision.get('status','unreviewed').upper()}**",'',f"**Basis:** {x['basis']}. {x['observation']}",'',f"**Proposal:** {x['proposal']}",'',f"**Benefit:** {x['benefit']}",'',f"**Trade-off:** {x['tradeoff']}",'',f"**Success check:** {x['validation']}",'',f"**Scope:** {x['scope']}",'',f"**Your notes:** {decision.get('notes','') or '—'}",'',f"**Sources:** {', '.join(x['sources'])}",'']
  if visual.get('status')=='ready':
   lines += [f"**Native model comparison:** {visual['caption']}",'',f"![Before]({visual['before']})",'',f"![After — separate preview]({visual['after']})",'',f"[Source and camera record]({visual['manifest']})",'']
 return '\n'.join(lines)
class Handler(http.server.BaseHTTPRequestHandler):
 def log_message(self,*args):pass
 def respond(self,code,data,kind='application/json; charset=utf-8',headers=None):
  if not isinstance(data,bytes):data=(json.dumps(data,ensure_ascii=False) if kind.startswith('application/json') else str(data)).encode()
  self.send_response(code);self.send_header('Content-Type',kind);self.send_header('Content-Length',str(len(data)));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.send_header('Referrer-Policy','no-referrer');self.send_header('X-Frame-Options','DENY')
  for k,v in (headers or {}).items():self.send_header(k,v)
  self.end_headers();self.wfile.write(data)
 def valid_host(self):
  return self.headers.get("Host") in {f"127.0.0.1:{self.server.server_port}",f"localhost:{self.server.server_port}"}
 def do_GET(self):
  with LOCK:
   refresh_inventory()
   self.get_response()
 def get_response(self):
  if not self.valid_host():return self.respond(403,{"error":"Use the local review address."})
  p=urllib.parse.urlparse(self.path)
  if p.path=='/__identity':return self.respond(200,{'app':IDENTITY,'root':str(HERE)})
  if p.path=='/api/review':
   with LOCK:st=state()
   return self.respond(200,{'data':DATA,'state':st,'token':TOKEN,'storage':str(STATE_DIR/'decisions.json'),'comparisons':comparisons()})
  if p.path=='/api/export':
   with LOCK:st=state()
   fmt=urllib.parse.parse_qs(p.query).get('format',['json'])[0]
   if fmt=='md':return self.respond(200,markdown(st),'text/markdown; charset=utf-8',{'Content-Disposition':'attachment; filename="ashley-heights-review.md"'})
   return self.respond(200,{'exportedAt':now(),'proposals':DATA,'comparisons':comparisons(),'review':st},headers={'Content-Disposition':'attachment; filename="ashley-heights-review.json"'})
  if p.path=='/source':
   name=urllib.parse.parse_qs(p.query).get('path',[''])[0]
   name=current_path(ROOT,name)
   if name not in ALLOWED and name not in comparison_files():return self.respond(404,{'error':'This file is not part of the review evidence.'})
   target=(ROOT/name).resolve()
   if not target.is_relative_to(ROOT) or not target.is_file():return self.respond(404,{'error':'Evidence file unavailable.'})
   return self.respond(200,target.read_bytes(),mimetypes.guess_type(str(target))[0] or 'text/plain; charset=utf-8')
  files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/style.css':'style.css'}
  if p.path in files:
   target=HERE/files[p.path]
   return self.respond(200,target.read_bytes(),mimetypes.guess_type(str(target))[0] or 'text/plain')
  return self.respond(404,{'error':'Not found'})
 def do_POST(self):
  with LOCK:
   refresh_inventory()
   self.post_response()
 def post_response(self):
  if not self.valid_host():return self.respond(403,{'error':'Use the local review address.'})
  if self.path!='/api/decision':return self.respond(404,{'error':'Not found'})
  origin=self.headers.get('Origin')
  if self.headers.get('X-Review-Token')!=TOKEN or (origin and origin!=f'http://{self.headers.get("Host")}'):
   return self.respond(403,{'error':'Open the local review page to save decisions.'})
  try:
   length=int(self.headers.get('Content-Length','0'))
   if not 0<length<=30000:raise ValueError('Invalid request size')
   body=json.loads(self.rfile.read(length));ident=body['id'];status=body['status'];notes=body.get('notes','')
   if ident not in ITEMS or status not in ('unreviewed','approved','deferred','rejected') or not isinstance(notes,str) or len(notes)>10000:raise ValueError('Invalid decision')
   with LOCK:
    st=state()
    if body.get('revision')!=st['revision']:return self.respond(409,{'error':'Another tab saved a change. Reload the latest review before saving again.','state':st})
    if body.get('proposalHash')!=ITEMS[ident].get('proposalHash'):return self.respond(409,{'error':'This proposal has changed. Reload the page to review its latest wording.','state':st})
    previous=st['decisions'].get(ident,{'status':'unreviewed','notes':''})
    entry={'status':status,'notes':notes,'updatedAt':now(),'proposalHash':ITEMS[ident]['proposalHash']}
    st['decisions'][ident]=entry;st['revision']+=1
    st['history'].append({'id':ident,'revision':st['revision'],'at':entry['updatedAt'],'before':previous,'after':entry})
    atomic_write(STATE_DIR/'decisions.json',st)
   return self.respond(200,{'revision':st['revision'],'decision':entry})
  except (ValueError,KeyError,TypeError) as e:return self.respond(400,{'error':str(e)})
  except OSError:return self.respond(500,{'error':'Could not save to disk. Your draft remains in this browser; retry after checking disk access.'})
def stop_review(port):
 # Called only after main verifies the listener's application and workspace identity.
 result=subprocess.run(['lsof','-nP',f'-tiTCP:{port}','-sTCP:LISTEN'],capture_output=True,text=True,check=True)
 pids={int(line) for line in result.stdout.splitlines() if line.strip()}
 if len(pids)!=1:raise RuntimeError('Cannot identify a single review server to restart')
 os.kill(pids.pop(),signal.SIGTERM)
 for _ in range(40):
  with socket.socket() as probe:
   probe.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
   try:probe.bind(('127.0.0.1',port));return
   except OSError:time.sleep(.1)
 raise RuntimeError('Review server did not release its port; no replacement started')
def main():
 global STATE_DIR
 p=argparse.ArgumentParser();p.add_argument('--serve',type=int);p.add_argument('--state-dir',type=Path);p.add_argument('--no-open',action='store_true');p.add_argument('--restart',action='store_true',help='Restart only the server matching this workspace');args=p.parse_args()
 if args.state_dir:STATE_DIR=args.state_dir.resolve()
 if args.serve:
  http.server.ThreadingHTTPServer(('127.0.0.1',args.serve),Handler).serve_forever();return
 for port in range(8878,8890):
  url=f'http://127.0.0.1:{port}'
  identity=None
  try:
   with urllib.request.urlopen(url+'/__identity',timeout=.3) as response:identity=json.load(response)
  except Exception:pass
  if identity is not None:
   if identity!={'app':IDENTITY,'root':str(HERE)}:continue
   if not args.restart:break
   stop_review(port)
  with socket.socket() as s:
   try:s.bind(('127.0.0.1',port))
   except OSError:continue
  with (HERE/'server.log').open('a') as log:
   subprocess.Popen([sys.executable,str(Path(__file__).resolve()),'--serve',str(port)],stdin=subprocess.DEVNULL,stdout=log,stderr=log,start_new_session=True)
  for _ in range(30):
   try:
    with urllib.request.urlopen(url+'/__identity',timeout=.3) as r:
     if json.load(r).get('app')==IDENTITY:break
   except Exception:time.sleep(.1)
  else:continue
  break
 else:raise RuntimeError('No free local review port')
 print(url,flush=True)
 if not args.no_open:subprocess.run(['open','-a','Google Chrome',url],check=True)
if __name__=='__main__':main()
