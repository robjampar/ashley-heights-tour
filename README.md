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
- **⚙** — enter the passcode that unlocks publishing (or a manual token).

### How uploads persist

Proposed designs live next to each original panorama as
`assets/…/high/<id>.png`, and every uploaded render is archived under
`assets/…/high/design_history/<id>/<timestamp>.png` (older versions are never
overwritten). A static `designs.json` manifest at the repo root lists, per room,
the available versions newest-first — the viewer reads it directly, so **just
viewing the site makes no API calls**.

Because GitHub Pages is static, an upload commits straight to this repo via the
**GitHub Contents API**. The write token is stored in `auth.js` **encrypted**
(AES-GCM, PBKDF2), and unlocked in the browser with a **passcode** you type once
per session (⚙). The decrypted token is held in memory only — never written to
disk, never committed in the clear.

> ⚠️ **Security note.** `auth.js` is committed to this **public** repo, so its
> security rests entirely on the passcode. A short passcode can be brute-forced
> offline against the committed ciphertext — this setup trades security for
> convenience and is only appropriate because the token is scoped to **just this
> repo** (worst case: someone edits this one repo). Use a long passcode if you
> want it to actually be strong.

**Setting/rotating the embedded token** (needs a token only you can create):

1. Create a **fine-grained** PAT at
   <https://github.com/settings/personal-access-tokens/new> — Resource owner
   `robjampar`, Repository access → only `ashley-heights-tour`, Permissions →
   **Contents: Read and write**.
2. Open `encrypt-setup.html` locally (e.g. http://localhost:8777/encrypt-setup.html),
   paste the token + passcode, click **Encrypt**. The token never leaves your
   browser — only the encrypted blob does.
3. Put the output into `auth.js`, then commit &amp; push. Pages rebuilds (~1 min)
   and uploads work for anyone who knows the passcode. `encrypt-setup.html` is
   git-ignored (local tool, not published).

After an upload, Pages rebuilds and serves the new render within ~1 minute (your
own view updates instantly).

## Run locally

```bash
cd "path/to/ashley-heights-tour"
python3 -m http.server 8777      # or: python3 serve.py 8777
```

Then open **http://localhost:8777/**. It must be served over HTTP —
double-clicking `index.html` (`file://`) won't work because the viewer loads
panoramas via XHR. Uploads from a local copy still commit to the GitHub repo via
the Contents API (unlocked by the same passcode), exactly as on the live site.

To regenerate `designs.json` from the files on disk (e.g. after adding PNGs
manually): `python3 -c "import serve, json; open('designs.json','w').write(json.dumps(serve._all_designs(), indent=2))"`.

## Notes

- Analytics/tracking calls back to madesnappy.co.uk are stubbed out, so the tour
  runs with no network access.
- The "apply/contact" form posts to a stubbed endpoint; everything else (room
  navigation, hotspots, floorplan, fullscreen, design toggle) works.

## Editable-house walkthrough

The reconstructed house is available at [3D model](https://robjampar.github.io/ashley-heights-tour/model/), linked from the original tour. On phones, use the left movement pad and drag the scene to look; on desktop use W/A/S/D and the mouse. A room picker and collapsible floorplan provide shortcuts.

Both the model and [Easter mode](https://robjampar.github.io/ashley-heights-tour/easter/) start outside the front gates, which open inward on approach and close afterwards. Easter mode starts a 30-second active-time countdown only after entering the house, then three zombies pursue the visitor. Controls, loading and an unfocused window pause the timer. Retry starts outside again. Normal model mode has no zombies.

The viewer includes daylight shadows, sky reflections, tailored material roughness and warm interior fill. Phones use reduced shadow resolution and a lighter rendering profile. `easter/` shares the content-hashed assets in `model/`; it does not duplicate the house download.

**Settings** (top right) has three switches, remembered per browser: *Street & neighbours* (approximate surroundings along Ashley Close), *People* (residents going about the house — walking between rooms through the real doors and stairs, sitting, working, using the gym) and *Cars* (the proposals' outside cars coming and going on the drive, one at a time, waiting for the gate and for anyone in the way, with their owners walking out to them and back in).

The model tour offers **Existing**, **Proposed (planning application)** (`model/?design=planning`) and the full **Proposed** design (`model/?design=proposed`). The Design menu keeps the viewpoint where the destination model supports it. The older `?design=compact` link opens Proposed.

In either proposal, **Settings → Exterior finishes** switches the house and extensions between **White render + oak slats** and **Plain brick**, independently of **Dark grey** and **Light grey** roof tiles. Dormer fronts and cheeks always use matching tiles. Preferences are remembered separately for each design. Garden buildings, boundary walls and interiors keep their finishes. These are visual comparisons, not amendments to a planning application.

Current checkpoint: 25 September 2026. Both proposal models include the latest site levels, roof junctions and exterior finishes. The planning scheme keeps the existing garden buildings/layout; the full proposal includes its garden and leisure additions.

`model/` contains the static viewer, nine GLBs, their navigation data and content-hashed JavaScript/CSS. GitHub Pages serves it from the same `main` branch. Large native Blender/SketchUp projects remain local. Geometry is a photo/plan reconstruction; unmeasured details remain estimates.


## Six additional design options

The [six-option review](https://robjampar.github.io/ashley-heights-tour/model/redesigns/) compares three internal layouts within Proposed (I1 Garden kitchen, I2 Social east, I3 Garden principal) and three complete alternatives starting from the original house (E1 Retained front, E2 Garden courtyard, E3 Short forecourt wing). Each has a separate tour, floor/site plans, approximate room schedule, model images and a downloadable 36-page drawing pack. The three current designs remain available.

Every option keeps seven bedrooms, most en suite, principal study/dressing/bathroom, open-plan family space, gym, cinema, wine bar, pool, double garage and four outside parking positions. The review explains compromises, including E1's tight retained garage and E3's greater front/basement intervention. All six support house-only wall and roof finish previews with tiled dormers. These are concept options, not surveyed application or construction drawings and not a guarantee of planning permission.

The curated [editable source snapshot](model-source/) includes Blender scripts, specifications, browser code and audit evidence. Required large local baselines are identified by checksum in `model-source/source-manifest.json`. See `model-source/WORKSPACE-README.md` for build instructions and measured speed improvements. Account/session records and credentials are excluded.
