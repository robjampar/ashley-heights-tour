"""Regenerate against staged architecture without replacing active data."""
from pathlib import Path
import sys
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.structure import build_study,trial_calculations,build_members
P=R/'outputs/output-structural-fit-compact';O=P/'structure';O.mkdir(exist_ok=True)
build_study.SOURCE=P;build_study.OUT=O;build_study.build()
trial_calculations.MODEL=O/'model.json';trial_calculations.OUT=O/'trials.json';trial_calculations.build()
build_members.OUT=O;build_members.build(navpath=P/'navigation.json')
