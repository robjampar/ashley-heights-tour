# Unified viewer settings

The owner requested publication of the new people/zombies plus a clean interface
with the design and structural controls moved into Settings. No geometry changes.

References researched before implementation:
- Autodesk Viewer groups settings by task in tabs:
  https://help.autodesk.com/cloudhelp/ENU/ADSKVIEWER-Help/files/AutodeskViewerTools/ADSKVIEWER_Help_AutodeskViewerTools_ViewerSettings_html.html
- Sketchfab exposes optional inspector/settings rather than requiring the entire
  viewer interface at once:
  https://sketchfab.com/developers/viewer/initialization

Selected pattern: one right-hand Settings panel with three task tabs. Design:
current scheme, exterior finishes, brochure/comparison/360 links. View: camera,
quality, residents/cars/context, identify, fullscreen/presentation. Structure:
show/hide overlay, overlay/split, opacity, vivid colours, layers and independent
cutaways, drawings/data. Structure uses the existing member registry and renderer.

The main view keeps the brand, room navigation, Walk/Fly, controls help, Settings,
location and floorplan. Remove the floating design/proposal/document controls.
The inspector opens only for a selection; drawings replace the view only when
requested. Close Settings to resume walking. Keyboard focus and Escape return to
the invoking control; switching design retains the comparison viewpoint.

Desktop: 390 px panel, sticky title/tabs, scrollable body. Mobile: inset panel,
44 px minimum control targets, no viewport overflow. No nested modal and no second
floating structure-controls rail. A mock was made in interface-mock.html before
changing viewer code; screenshot in the dated browser evidence folder.
