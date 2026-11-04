#!/bin/zsh
cd "${0:A:h:h}"
if ! curl -fsS http://127.0.0.1:8899/ >/dev/null; then
  nohup .venv/bin/python revisions/lengthwise-bathroom-2026-10-23/serve-review.py > logs/lengthwise-bathroom-review-server.log 2>&1 &
fi
open 'http://127.0.0.1:8899/'
