#!/bin/zsh
cd "${0:A:h:h}"
if ! curl -fsS http://127.0.0.1:8897/ >/dev/null; then
  nohup .venv/bin/python revisions/suite-layout-and-loft-use-2026-10-22/serve-review.py > logs/suite-layout-review-server.log 2>&1 &
fi
open 'http://127.0.0.1:8897/'
