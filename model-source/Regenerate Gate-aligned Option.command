#!/bin/zsh
set -e
cd "${0:A:h}"
exec .venv/bin/python scripts/regenerate_gate_aligned.py
