#!/usr/bin/env python3
"""Local server for the Ashley Heights 360 tour.

Serves the current directory like `python -m http.server`, and adds two
endpoints used by the "proposed design" controls in index.html:

  POST /__upload?path=<relative .png path>   body = image bytes
        Saves a new proposed-design render. The upload is archived under
        high/design_history/<stem>/<timestamp>.png (older versions are kept,
        never overwritten) and promoted to high/<stem>.png (the newest, shown
        by default). The first time a stem gets an upload, any pre-existing
        high/<stem>.png is seeded into history first so no design is lost.

  GET  /__designs                            -> JSON
        { "<stem>": { "active": url,
                      "versions": [ {url, label, newest}, ... newest first ] } }

Run:  python3 serve.py [port]      (default 8777)
"""
import datetime
import glob
import http.server
import json
import os
import shutil
import sys
from urllib.parse import unquote, urlparse, parse_qs

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8777
ROOT = os.path.dirname(os.path.abspath(__file__))

# Uploads may only land inside the tour's high-res panorama folder, as .png.
HIGH_DIR = os.path.join(
    ROOT, "assets", "d2r6oqytw7cjbv.cloudfront.net",
    "tours", "0", "0", "172", "509", "high")
HISTORY_DIR = os.path.join(HIGH_DIR, "design_history")
MAX_UPLOAD = 80 * 1024 * 1024  # 80 MB
TS_FMT = "%Y%m%d-%H%M%S-%f"


def _rel_url(path):
    """Filesystem path -> forward-slash URL relative to the served root."""
    return os.path.relpath(path, ROOT).replace(os.sep, "/")


def _label(dt):
    return dt.strftime("%d %b %Y, %H:%M")


def _version_entry(path, dt):
    return {"url": _rel_url(path), "label": _label(dt)}


def _versions_for_stem(stem):
    """Newest-first list of design versions for a filename stem (e.g. 2445658_2)."""
    hist = sorted(
        glob.glob(os.path.join(HISTORY_DIR, stem, "*.png")),
        key=lambda p: os.path.basename(p), reverse=True)
    versions = []
    if hist:
        for p in hist:
            name = os.path.splitext(os.path.basename(p))[0]
            try:
                dt = datetime.datetime.strptime(name, TS_FMT)
            except ValueError:
                dt = datetime.datetime.fromtimestamp(os.path.getmtime(p))
            versions.append(_version_entry(p, dt))
    else:
        active = os.path.join(HIGH_DIR, stem + ".png")
        if os.path.isfile(active):
            dt = datetime.datetime.fromtimestamp(os.path.getmtime(active))
            versions.append(_version_entry(active, dt))
    if versions:
        versions[0]["newest"] = True
    return versions


def _all_designs():
    stems = set()
    for p in glob.glob(os.path.join(HIGH_DIR, "*.png")):
        stems.add(os.path.splitext(os.path.basename(p))[0])
    if os.path.isdir(HISTORY_DIR):
        for name in os.listdir(HISTORY_DIR):
            if os.path.isdir(os.path.join(HISTORY_DIR, name)):
                stems.add(name)
    result = {}
    for stem in stems:
        versions = _versions_for_stem(stem)
        if versions:
            result[stem] = {"active": versions[0]["url"], "versions": versions}
    return result


class Handler(http.server.SimpleHTTPRequestHandler):
    def _json(self, obj, code=200):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlparse(self.path).path == "/__designs":
            self._json(_all_designs())
            return
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/__upload":
            self.send_error(404, "Unknown endpoint")
            return

        qs = parse_qs(parsed.query)
        rel = unquote((qs.get("path") or [""])[0])
        target = os.path.normpath(os.path.join(ROOT, rel))

        # Safety: only .png files, only directly inside the high-res folder.
        if (os.path.dirname(target) != HIGH_DIR
                or not target.lower().endswith(".png")):
            self.send_error(403, "Uploads restricted to high/<stem>.png")
            return

        length = int(self.headers.get("Content-Length", 0))
        if length <= 0 or length > MAX_UPLOAD:
            self.send_error(413, "Missing or oversized body")
            return
        data = self.rfile.read(length)

        stem = os.path.splitext(os.path.basename(target))[0]
        stem_hist = os.path.join(HISTORY_DIR, stem)
        try:
            os.makedirs(stem_hist, exist_ok=True)

            # Seed history with the existing design the first time, so the
            # original proposed render is never lost when we promote the new one.
            if os.path.isfile(target) and not glob.glob(os.path.join(stem_hist, "*.png")):
                mtime = datetime.datetime.fromtimestamp(os.path.getmtime(target))
                seed = os.path.join(stem_hist, mtime.strftime(TS_FMT) + ".png")
                shutil.copy2(target, seed)

            # Archive this upload, then promote it to the active (newest) design.
            now = datetime.datetime.now()
            archive = os.path.join(stem_hist, now.strftime(TS_FMT) + ".png")
            with open(archive, "wb") as f:
                f.write(data)
            shutil.copyfile(archive, target)
        except OSError as e:
            self.send_error(500, "Write failed: %s" % e)
            return

        self._json({"ok": True, "stem": stem, "active": _rel_url(target)})

    def end_headers(self):
        # HTML and the JSON endpoints change, so never cache them. Panorama
        # images ARE cached (so toggling Original<->Proposed doesn't re-download
        # 2-3 MB each time) -- an upload always yields a fresh versioned URL, so
        # a cached <stem>.png is never shown stale.
        path = urlparse(self.path).path.lower()
        if path in ("", "/") or path.endswith(".html") or path.startswith("/__"):
            self.send_header("Cache-Control", "no-store")
        else:
            self.send_header("Cache-Control", "max-age=600")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    os.chdir(ROOT)
    httpd = http.server.ThreadingHTTPServer(("", PORT), Handler)
    print("Serving %s\n  http://localhost:%d/   (360 tour)\n"
          "  Local static preview. The live site publishes uploads via the\n"
          "  GitHub Contents API; this server's /__upload,/__designs are unused."
          % (ROOT, PORT))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
