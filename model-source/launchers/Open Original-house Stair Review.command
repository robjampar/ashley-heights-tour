#!/bin/zsh
cd "${0:A:h:h}"
if ! curl -fsS http://127.0.0.1:8896/ >/dev/null; then
  nohup .venv/bin/python revisions/bedroom4-stair-suite-2026-10-22/serve-review.py > logs/bedroom4-review-server.log 2>&1 &
fi
open 'http://127.0.0.1:8896/'
