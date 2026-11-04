PYTHON := .venv/bin/python
export MPLCONFIGDIR := $(CURDIR)/.cache/matplotlib
export PYTHONDONTWRITEBYTECODE := 1
.PHONY: help build-structure build-web build-visuals preview review test test-python test-web check-layout
help:
	@printf '%s\n' 'build-web     Build the local walkthrough' 'build-structure Build structural geometry and UK trial calculations' 'build-visuals Rebuild proposal furnishings and baked daylight with Blender' 'preview       Open Proposed locally' 'review        Open the owner review board' 'test-python   Run Python checks' 'test-web      Run web unit checks' 'test          Run both check suites' 'check-layout  Verify workspace paths and preservation' 'No target publishes or deletes files.'
build-web:
	cd walkthrough && npm run build
build-structure:
	$(PYTHON) -m scripts.structure.build_study
	$(PYTHON) -m scripts.structure.trial_calculations
	$(PYTHON) -m scripts.structure.build_members
	node walkthrough/tools/build-structure.mjs
build-visuals:
	$(PYTHON) scripts/build/regenerate_visual_quality.py
preview:
	$(PYTHON) walkthrough/serve.py --design proposed
review:
	$(PYTHON) revisions/whole-house-review-2026-09-29/serve.py
test: test-python test-web
test-python:
	$(PYTHON) -m unittest discover -s tests -p 'test_*.py'
test-web:
	cd walkthrough && npm test
check-layout:
	$(PYTHON) scripts/maintenance/check_workspace.py
