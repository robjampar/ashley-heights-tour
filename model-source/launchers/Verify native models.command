#!/bin/zsh
set -e
cd "${0:A:h:h}"
blender_binary="$HOME/Applications/Blender.app/Contents/MacOS/Blender"
[[ -x "$blender_binary" ]] || blender_binary="/Applications/Blender.app/Contents/MacOS/Blender"
mkdir -p logs
"$blender_binary" --background --factory-startup --python-exit-code 1 --python scripts/maintenance/verify_native_models.py > logs/native-model-verification.log 2>&1
cat logs/native-model-verification.log
read "?Press Return to close."
