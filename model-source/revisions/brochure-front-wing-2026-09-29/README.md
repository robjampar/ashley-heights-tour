# Front-wing footprint correction

The site and neighbourhood diagrams previously combined buffered room-navigation polygons. Room clearances left a false long notch between the entrance gallery and garage; these polygons also approximated the projecting bays' outside edges.

The shared plan generator now derives the front-wing exterior footprint from the three authored ground-floor mesh objects in `output-proposed-compact/geometry.json`. Internal stair openings are omitted from the external site silhouette. The genuine external recess between the garage and entrance bays is preserved. Both diagrams use the same corrected footprint, so rerunning the brochure generator preserves the fix.

Regenerated: site-plan.svg/png, neighbourhood-plan.svg/png, brochure pages 4 and 5, web drawing gallery, drawing archive and 95-page PDF. All brochure text remains unchanged. Reviewed both standalone plans and rendered PDF pages 4 and 5. Geometry checks confirm the false internal gap is filled and the external recess remains open. The building model itself was not changed.

Before copies and rendered QA pages remain local. See the footprint audit, PDF verification and download verification for evidence.
