#!/bin/zsh
cd "${0:A:h:h}"
if [[ -x .venv/bin/python ]]; then
  exec .venv/bin/python walkthrough/serve.py
else
  exec python3 walkthrough/serve.py
fi
