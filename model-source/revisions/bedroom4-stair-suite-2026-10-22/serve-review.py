from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
R=Path(__file__).resolve().parents[2];folder=R/'walkthrough/test-results/bedroom4-stair-suite-2026-10-22'
ThreadingHTTPServer(('127.0.0.1',8896),partial(SimpleHTTPRequestHandler,directory=str(folder))).serve_forever()
