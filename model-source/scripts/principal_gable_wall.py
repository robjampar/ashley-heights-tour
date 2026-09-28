"""Roof-constrained principal gable wall geometry, independent of Blender.

The opening shape is explicit: a rectangular opening is rejected if it cuts
the retained roof. Structural support sizing is deliberately not inferred.
"""
import math


def wall_sections(spec, width_m, shape, head_height_m=None):
    bay = spec['garageBay']
    floor = float(bay['first_floor_z'])
    south, north = map(float, bay['y'])
    centre = (south + north) / 2
    slope = math.tan(math.radians(float(bay['pitch_degrees'])))
    ridge_soffit = float(bay['ridge_z']) - .25
    soffit = lambda y: max(floor, ridge_soffit - slope * abs(y-centre))
    a, b = centre-width_m/2, centre+width_m/2
    if not south < a < b < north:
        raise ValueError('Opening must fit within the garage gable')
    if shape not in ('roof-following', 'rectangular'):
        raise ValueError('Choose an explicit opening shape')
    if shape == 'rectangular':
        if head_height_m is None or head_height_m <= 0:
            raise ValueError('A rectangular opening needs a positive clear height')
        head = floor+head_height_m
        if head > min(soffit(a), soffit(b)) + 1e-8:
            raise ValueError('Rectangular opening intersects retained garage roof')
    else:
        head = None
    # These infills join the retained upper wall at its exact soffit profile.
    sections = [
        ('south pier', [(south,floor),(a,floor),(a,soffit(a)),(south,soffit(south))]),
        ('north pier', [(b,floor),(north,floor),(north,soffit(north)),(b,soffit(b))]),
    ]
    if head is not None:
        sections.append(('opening head', [(a,head),(b,head),(b,soffit(b)),(centre,soffit(centre)),(a,soffit(a))]))
    opening = [(a,floor),(b,floor)] + ([(b,head),(a,head)] if head is not None else [(b,soffit(b)),(centre,soffit(centre)),(a,soffit(a))])
    return dict(wall_x_m=float(spec['frontWing'][0])+.115,
                thickness_m=.23, floor_z_m=floor, centre_y_m=centre,
                opening_width_m=width_m, opening_shape=shape,
                centre_clear_height_m=(head if head is not None else ridge_soffit)-floor,
                jamb_clear_height_m=(head if head is not None else soffit(a))-floor,
                sections=sections, opening=opening,
                floor_beam='Concept: concealed in floor; section and bearings unverified')


PREFIX = 'Principal gable wall | '


def mesh_parts(spec, config):
    result = wall_sections(spec, config['opening_width_m'],
                           config['opening_shape'], config.get('opening_height_m'))
    x, half = result['wall_x_m'], result['thickness_m']/2
    parts = []
    sections = [(label, section, x-half, x+half) for label,section in result['sections']]
    # A continuous plaster face hides the former triangular alcove perimeter;
    # its existing upper masonry and exterior materials remain untouched.
    if config.get('room_lining_thickness_m'):
        south,north=spec['garageBay']['y']
        centre=result['centre_y_m'];a=centre-config['opening_width_m']/2;b=centre+config['opening_width_m']/2
        floor=result['floor_z_m'];top=config['room_ceiling_z_m'];head=floor+config['opening_height_m']
        for label,ya,yb,za,zb in [('south lining',south,a,floor,top),('north lining',b,north,floor,top),('head lining',a,b,head,top)]:
            sections.append((label,[(ya,za),(yb,za),(yb,zb),(ya,zb)],x+half,x+half+config['room_lining_thickness_m']))
    for label, section, x_min, x_max in sections:
        n = len(section)
        vertices = [(xx,y,z) for xx in (x_min,x_max) for y,z in section]
        faces = [list(reversed(range(n))),list(range(n,2*n))]
        faces += [[i,(i+1)%n,(i+1)%n+n,i+n] for i in range(n)]
        low = [min(v[k] for v in vertices) for k in range(3)]
        high = [max(v[k] for v in vertices) for k in range(3)]
        name = PREFIX+label
        parts.append(dict(name=name,vertices=vertices,faces=faces,
                          obstacle=dict(name=name,box=[low[0],low[1],high[0],high[1]],
                                        bottom=low[2],top=high[2])))
    return result, parts


def apply_gable_wall(ns):
    """Add the reviewed infills after the accepted suite import, before export."""
    import json
    config = json.loads((ns['ROOT']/'proposal/interiors/principal/gable-wall.json').read_text())
    if ns['VARIANT'] not in config['enabled_variants']:
        return
    result, parts = mesh_parts(ns['spec'],config)
    material = config['finish_material']
    assert material in ns['materials'], material
    for part in parts:
        ob = ns['mesh'](part['name'],part['vertices'],part['faces'],material,
                        'P62 Principal suite — accepted interior')
        ob['gable_wall_revision'] = config['revision']
        ob['structural_status'] = config['structural_status']
        ns['new_obstacles'].append(part['obstacle'])
    result['structural_status'] = config['structural_status']
    result['native_rebuild_pending'] = False
    ns['nav']['principalGableWall'] = result
    (ns['OUT']/'principal-gable-wall-report.json').write_text(json.dumps(result,indent=2)+'\n')
    return result
