#!/bin/zsh
set -e
cd "${0:A:h:h}"
exec .venv/bin/python revisions/whole-house-review-2026-09-29/serve.py --restart
