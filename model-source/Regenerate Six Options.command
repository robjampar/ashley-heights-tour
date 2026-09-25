#!/bin/zsh
set -e
cd "${0:A:h}"
exec .venv/bin/python scripts/regenerate_redesign_review.py --browser-check
