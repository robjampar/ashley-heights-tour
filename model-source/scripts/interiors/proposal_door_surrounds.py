"""Retain complete door surrounds in future full proposal builds."""
from scripts.interiors.door_frame_details import refine_door_frames

if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    refine_door_frames(scene,{**nav,'interactiveDoors':nav['interactiveDoors']+globals().get('proposed_doors',[])})
