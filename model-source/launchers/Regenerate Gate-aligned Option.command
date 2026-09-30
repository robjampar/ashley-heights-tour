#!/bin/zsh
set -e
cd "${0:A:h:h}"
exec .venv/bin/python scripts/build/regenerate_gate_aligned.py
