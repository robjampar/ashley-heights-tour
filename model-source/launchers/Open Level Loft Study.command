#!/bin/zsh
set -eu
TASK_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TASK_PORT=8895
TASK_URL="http://127.0.0.1:${TASK_PORT}/"
if ! curl -fsS "${TASK_URL}trials.json" | python3 -c 'import json,sys; d=json.load(sys.stdin); assert d.get("title")=="One-level loft · offset-ridge solution"' >/dev/null 2>&1; then
  nohup python3 -m http.server "$TASK_PORT" --bind 127.0.0.1 --directory "$TASK_ROOT/walkthrough/test-results/loft-level-floor-2026-10-19" > "$TASK_ROOT/logs/loft-level-study-server.log" 2>&1 < /dev/null &
  for TASK_TRY in {1..30}; do
    if curl -fsS "${TASK_URL}trials.json" | python3 -c 'import json,sys; d=json.load(sys.stdin); assert d.get("title")=="One-level loft · offset-ridge solution"' >/dev/null 2>&1; then
      break
    fi
    sleep 0.1
  done
fi
if curl -fsS "${TASK_URL}trials.json" | python3 -c 'import json,sys; d=json.load(sys.stdin); assert d.get("title")=="One-level loft · offset-ridge solution"' >/dev/null 2>&1; then
  open "$TASK_URL"
else
  print 'The study could not start on port 8895. Check logs/loft-level-study-server.log.'
  exit 1
fi
