#!/bin/zsh
set -e
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if ! curl --silent --fail http://127.0.0.1:8900/ >/dev/null; then
  nohup "$PROJECT_ROOT/.venv/bin/python" "$PROJECT_ROOT/revisions/front-window-alignment-2026-10-23/serve-review.py" > "$PROJECT_ROOT/logs/front-window-alignment-review-server.log" 2>&1 &
  sleep 1
fi
open http://127.0.0.1:8900/
