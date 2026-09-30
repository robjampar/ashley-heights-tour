#!/bin/zsh
cd "${0:A:h:h}" || exit 1
if [[ -x .venv/bin/python ]]; then
  preview_python=.venv/bin/python
else
  preview_python=python3
fi
if ! preview_url="$("$preview_python" walkthrough/serve.py --no-open)"; then
  print -u2 "The local preview could not start. See the error above."
  read "?Press Return to close."
  exit 1
fi
preview_url="${preview_url}/brochure/"
print "Local house brochure: $preview_url"
if [[ -d '/Applications/Google Chrome.app' ]]; then
  open -a 'Google Chrome' "$preview_url"
else
  open "$preview_url"
fi
