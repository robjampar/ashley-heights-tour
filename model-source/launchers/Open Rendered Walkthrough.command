#!/bin/zsh
cd "${0:A:h:h}"
BLENDER_APP="$HOME/Applications/Blender.app"
if [[ ! -x "$BLENDER_APP/Contents/MacOS/Blender" ]]; then
  BLENDER_APP="/Applications/Blender.app"
fi
if [[ ! -x "$BLENDER_APP/Contents/MacOS/Blender" ]]; then
  print "Blender was not found in Applications. Open outputs/output-walkthrough/Ashley Heights Rendered Walkthrough.blend in Blender."
  read "?Press Return to close."
  exit 1
fi
exec "$BLENDER_APP/Contents/MacOS/Blender" \
  "$PWD/outputs/output-walkthrough/Ashley Heights Rendered Walkthrough.blend" \
  --python "$PWD/scripts/build/start_rendered_walkthrough.py"
