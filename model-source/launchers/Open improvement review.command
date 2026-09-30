#!/bin/zsh
review_root="$(cd "$(dirname "$0")/.." && pwd)"
exec "$review_root/.venv/bin/python" "$review_root/revisions/whole-house-review-2026-09-29/serve.py"
