import subprocess
from pathlib import Path
r=Path(__file__).resolve().parents[2];p=subprocess.run(['.venv/bin/python','scripts/maintenance/check_workspace.py'],cwd=r,capture_output=True,text=True);lines=(p.stdout+p.stderr).strip().splitlines();(r/'logs/door-wall-final-layout-baseline-details.log').write_text(p.stdout+p.stderr);assert len(lines)==345,(len(lines),p.returncode);print('345 existing layout findings; no increase')
