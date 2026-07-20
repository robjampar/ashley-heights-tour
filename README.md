# Ashley Heights — 360 Virtual Tour

An offline mirror of the Made Snappy 360 tour of Ashley Heights, with a
built-in **proposed-design** review mode: for each room you can flip between the
original photo and a proposed redesign, browse older render versions, download
the original, and upload a new render.

**Live site:** https://robjampar.github.io/ashley-heights-tour/

All 28 panoramas, the floorplan, fonts, icons, and the viewer JS/CSS are stored
under `assets/` — no internet connection is needed to view the tour.

## Proposed design mode

A control panel at the bottom of the tour acts on the room you're currently
viewing:

- **Original / Proposed** — toggle every room that has a redesign between the
  original photo and the proposed render (camera angle is kept; instant swap).
- **version dropdown** — when a room has more than one uploaded render, pick an
  older version; the newest is shown by default.
- **↓ Original** — download the original photo of the current room.
- **↑ Upload render** — upload a new `.png` render as the proposed design.
- **⚙** — set/change the GitHub token used to publish uploads.

### How uploads persist

Proposed designs live next to each original panorama as
`assets/…/high/<id>.png`, and every uploaded render is archived under
`assets/…/high/design_history/<id>/<timestamp>.png` (older versions are never
overwritten). A static `designs.json` manifest at the repo root lists, per room,
the available versions newest-first — the viewer reads it directly, so **just
viewing the site makes no API calls**.

Because GitHub Pages is static, an upload from the live site commits straight to
this repo via the **GitHub Contents API**. The first time you upload, the ⚙
dialog asks for a **fine-grained personal access token**:

- Resource owner: `robjampar`
- Repository access: only `ashley-heights-tour`
- Permissions → **Contents: Read and write**

The token is stored only in your browser (`localStorage`) and is never
committed. After an upload, GitHub Pages rebuilds and serves the new render
within ~1 minute (your own view updates instantly).

## Run locally

```bash
cd "path/to/ashley-heights-tour"
python3 -m http.server 8777      # or: python3 serve.py 8777
```

Then open **http://localhost:8777/**. It must be served over HTTP —
double-clicking `index.html` (`file://`) won't work because the viewer loads
panoramas via XHR. Uploads from a local copy still commit to the GitHub repo via
the Contents API (using the ⚙ token), exactly as on the live site.

To regenerate `designs.json` from the files on disk (e.g. after adding PNGs
manually): `python3 -c "import serve, json; open('designs.json','w').write(json.dumps(serve._all_designs(), indent=2))"`.

## Notes

- Analytics/tracking calls back to madesnappy.co.uk are stubbed out, so the tour
  runs with no network access.
- The "apply/contact" form posts to a stubbed endpoint; everything else (room
  navigation, hotspots, floorplan, fullscreen, design toggle) works.
