#!/usr/bin/env python3
"""Loopback-only offline viewer. Reuse only a server with our project identity."""
import argparse,http.server,json,subprocess,sys,urllib.request,webbrowser
from pathlib import Path
ROOT=Path(__file__).resolve().parent;IDENTITY='ashley-heights-local-walkthrough-v1'
class Handler(http.server.SimpleHTTPRequestHandler):
 def __init__(self,*args,**kw):super().__init__(*args,directory=str(ROOT/'dist'),**kw)
 def do_GET(self):
  if self.path=='/__identity':
   data=json.dumps({'app':IDENTITY,'root':str(ROOT)}).encode();self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data);return
  super().do_GET()
 def end_headers(self):self.send_header('Cache-Control','no-store');super().end_headers()
 def log_message(self,*args):pass

def main():
 p=argparse.ArgumentParser();p.add_argument('--serve',type=int);p.add_argument('--no-open',action='store_true');p.add_argument('--workspace',choices=('walkthrough','structure'),default='walkthrough');p.add_argument('--design',choices=('original','planning','proposed'),default='original');args=p.parse_args()
 if args.serve:
  http.server.ThreadingHTTPServer(('127.0.0.1',args.serve),Handler).serve_forever();return
 for port in range(8765,8785):
  url=f'http://127.0.0.1:{port}'
  try:
   with urllib.request.urlopen(url+'/__identity',timeout=.3)as r:ident=json.load(r)
   if ident=={'app':IDENTITY,'root':str(ROOT)}:break
   continue
  except Exception:pass
  import socket,time
  with socket.socket()as s:
   try:s.bind(('127.0.0.1',port))
   except OSError:continue
  (ROOT/'logs').mkdir(exist_ok=True)
  with open(ROOT/'logs/server.log','a')as log:
   proc=subprocess.Popen([sys.executable,str(Path(__file__).resolve()),'--serve',str(port)],stdin=subprocess.DEVNULL,stdout=log,stderr=log,start_new_session=True)
  for _ in range(40):
   try:
    with urllib.request.urlopen(url+'/__identity',timeout=.3)as r:
     if json.load(r)=={'app':IDENTITY,'root':str(ROOT)}:break
   except Exception:time.sleep(.1)
  else:continue
  break
 else:raise RuntimeError('No free local port in 8765–8784')
 if args.workspace=='structure':url+='/structure/'
 elif args.design!='original':url+='/?design='+args.design
 print(url,flush=True)
 if not args.no_open:
  command=['open','-a','Google Chrome',url]if Path('/Applications/Google Chrome.app').exists()else['open',url]
  subprocess.run(command,check=True)
if __name__=='__main__':main()
