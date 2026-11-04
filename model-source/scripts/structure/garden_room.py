"""Rear extension and garage substructure coordination, not an engineered design.

Geometry follows the accepted architectural footprint. Explicit reservations do
not certify the soil, terrace loading, member capacities or connection details.
"""
import math
import numpy as np
from shapely.geometry import Polygon, LineString, Point, box
from shapely.ops import unary_union
from scripts.structure.build_study import footprint
from scripts.structure.junctions import solid, replace_geometry


def build_garage_and_garden(elements, model, nav, spec, catalog, add, bar, steel, issue):
    from scripts.structure.build_members import extrusion, parts, upper_roof_surface
    cfg=spec['gardenRoom'];garage=spec['garageOption']
    source=next(e for e in model['elements'] if e['name']=='Proposal | Rear flat roof')
    roof_poly,_=upper_roof_surface(source)
    floor_poly=Polygon(nav['rearGardenRoomChamfer']['floorPolygon'])
    wall_sources={e['name']:e for e in model['elements'] if e['category']=='walls'}
    west=wall_sources['Proposal | Garden west return']
    west_block=next(e for e in elements if west['id'] in e['sourceIds'] and e.get('leaf')=='block')
    west_x=sum(e[0] for e in west_block['bounds'])/2

    def concrete(ident,name,poly,bottom,top,scope='new',level=-1,issue_id='GARDEN-FOUNDATIONS'):
        tri=extrusion(poly,2,bottom,top)
        e=add(ident,name,'rc',tri,f'{(top-bottom)*1000:.0f} mm concrete reservation',scope=scope,level=level,
              rate='concrete',quantity=solid(tri).volume(),issueIds=[issue_id],
              basis=garage['basis'] if scope=='garage-rebuild' else cfg['basis'])
        e.update(areaM2=round(poly.area,5),material='concrete',foundationCoordination={
            'topZ':top,'bottomZ':bottom,'capacityVerified':False,
            'datum':'Ground-floor model FFL = 0 m, not surveyed ground level',
            'basis':'Concrete envelope for volume/fit only; reinforcement, soil bearing and excavation system are not designed.'})
        return e

    # Three connected strips under the actual cavity-wall centre, rather than
    # the old 230 mm architectural centreline. Allocate shared corners once.
    garage_lines=[LineString([[-5.11875,.785],[-5.11875,8.935]]),
                  LineString([[-5.11875,.96125],[0,.96125]]),
                  LineString([[-5.11875,8.75875],[0,8.75875]])]
    garage_feet=Polygon();garage_stems=Polygon();garage_ids=[]
    for i,line in enumerate(garage_lines,1):
        fp=line.buffer(.3,cap_style=2,join_style=2).difference(garage_feet)
        sp=line.buffer(.17625,cap_style=2,join_style=2).difference(garage_stems)
        # West strip extends to the faces of the transverse footing ends.
        if i==1:
            fp=box(-5.41875,.66125,-4.81875,9.05875)
        garage_feet=unary_union([garage_feet,fp]);garage_stems=unary_union([garage_stems,sp])
        footing=concrete(f'M-GF-{i}',f'Original garage rebuild · {("west","front","rear")[i-1]} footing',fp,garage['foundationBaseZ'],garage['foundationTopZ'],scope='garage-rebuild',issue_id='GARAGE')
        stem=concrete(f'M-GS-{i}',f'Original garage rebuild · {("west","front","rear")[i-1]} foundation wall to masonry',sp,garage['foundationTopZ'],0,scope='garage-rebuild',level=0,issue_id='GARAGE')
        footing['foundationCoordination']['depthSensitivityM']=garage['foundationDepthRangeM']
        footing['section']='600 mm wide × 300 mm deep strip footing reservation'
        stem['section']='352.5 mm wide × 850 mm high foundation wall; below floor level'
        stem['foundationCoordination']['bearingMemberId']=footing['id']
        stem['supportStatus']='Continuous concrete envelope reaches the brick/block bases at Z0. Damp-proofing, cavity treatment, reinforcement and existing-house junction still require design.'
        garage_ids += [footing['id'],stem['id']]

    # Perimeter substructure includes the chamfer and is distinct from the slab.
    # The west wall outer face is retained; its thicker cavity assembly extends
    # inward. Glazed edges have a supporting stem below floor level only.
    garden_path=LineString([[-4.83875,8.935],[-4.83875,14.1],[2,14.1],[4,12.1],[4,8.935]])
    stem_poly=garden_path.buffer(cfg['stemWidthM']/2,cap_style=2,join_style=2).difference(garage_stems)
    # One house-side post is tucked behind the solid kitchen pier, not a door.
    post_xy=[[-.7,13.98305],[1.1,13.98305]]
    north_y=13.98305;east_x=3.92305;diagonal=16.1-.11695*math.sqrt(2)
    corner_n=[diagonal-north_y,north_y];corner_e=[east_x,diagonal-east_x]
    post_xy += [corner_n,corner_e,[east_x,9.1],[.2,9.1]]
    pier=box(.04,8.945,.36,9.26)
    stem_poly=unary_union([stem_poly,pier])
    feet_poly=unary_union([garden_path.buffer(cfg['foundationWidthM']/2,cap_style=2,join_style=2),box(-.2,8.7,.6,9.5)]).difference(garage_feet)
    foundations=concrete('M-GARDEN-FOUNDATION','Garden room · perimeter footing and house-side post pad reservation',feet_poly,cfg['foundationBaseZ'],cfg['foundationTopZ'])
    stems=concrete('M-GARDEN-STEM','Garden room · foundation walls beneath masonry/glazing and post pedestal',stem_poly,cfg['foundationTopZ'],0,level=0)
    foundations['section']='600 mm wide × 300 mm deep perimeter strips; 800 mm post-pad envelope'
    stems['section']='352.5 mm wide × 850 mm high perimeter foundation walls; below floor level'
    stems['supportStatus']='Wall/glazing/post substructure is separate from the floor slab. Shared garage footing corners are counted once; the retained-garage comparison needs a surveyed junction design.'
    # Slab stops at structural stems, with a 10 mm isolation allowance; finishes
    # still reach the architectural floor level. No slab bears the brick wall.
    slab_poly=floor_poly.intersection(box(-100,8.945,100,100)).difference(unary_union([stem_poly,garage_stems]).buffer(cfg['movementJointM'],join_style=2))
    slab_top=cfg['slabTopZ'];slab_bottom=slab_top-cfg['slabThicknessM']
    slab=concrete('M-GARDEN-SLAB','Garden room / rear extension · poured concrete floor slab',slab_poly,slab_bottom,slab_top,level=0)
    slab.update(sourceIds=[source['id']],slabCoordination={'areaM2':round(slab_poly.area,5),'topZ':slab_top,'bottomZ':slab_bottom,'thicknessMm':cfg['slabThicknessM']*1000,'jointAllowanceMm':cfg['movementJointM']*1000,'capacityVerified':False})
    slab['basis']='150 mm poured concrete slab allowance inside the accepted chamfered footprint, separate from perimeter foundation walls. A 150 mm finish/insulation/screed zone reaches FFL0. Ground-bearing is an assumption only: ground, fill, settlement, reinforcement, damp/gas membranes and any suspended alternative require design.'
    for key,name,lo,hi in [('FINISH','Floor finish allowance',-.015,0),('BUILDUP','Insulation / screed / membrane coordination zone',slab_top,-.015),('SUBBASE','Compacted sub-base allowance',slab_bottom-.15,slab_bottom)]:
        add('M-GARDEN-LAYER-'+key,'Garden room · '+name,'layers',extrusion(slab_poly,2,lo,hi),f'{(hi-lo)*1000:.0f} mm layer allowance',level=0,source=[source['id']],
            basis='Unpriced build-up envelope. Material, insulation performance, membrane continuity and layer arrangement remain unselected.',issueIds=['GARDEN-FOUNDATIONS'])

    # Retire the old unsupported roof-outline-derived framing for this roof
    # only. Other roof group numbering and source openings remain unchanged.
    old=[e for e in elements if e['sourceIds']==[source['id']] and e['category'] in ('rafters','trimmers','fascia')]
    old_ids={e['id'] for e in old};elements[:]=[e for e in elements if e['id'] not in old_ids]
    roof_bottom=cfg['roofBottomZ'];beam_section=cfg['roofBeamSection']
    rim_points=[[west_x,9.1],[east_x,9.1],corner_e,corner_n,[west_x,north_y]]
    # South, east, chamfer and north beams; west rests on the block leaf.
    beams=[]
    for i,(a,b) in enumerate(zip(rim_points,rim_points[1:]),1):
        s=next(s for s in catalog['steel'] if s['name']==beam_section)
        z=roof_bottom+s['depthMm']/2000
        e=steel(f'M-GARDEN-BEAM-{i:02}',f'Garden room · {("house-side","east glazing","chamfer","north glazing")[i-1]} terrace receiver',a+[z],b+[z],beam_section,
                notes='Uncalculated terrace-support reservation. Posts/west wall are geometric bearing candidates; beam, post, base, lateral stability and joints require design.')
        e.update(level=1,sourceIds=[source['id']],structuralSystem='garden-terrace',issueIds=['GARDEN-FRAME'],basis=cfg['basis'])
        beams.append(e)
    # Clip true mitres, never draw two full steel solids through one another.
    def halfplane(point,normal,positive=True):
        n=np.array(normal,float);n/=np.linalg.norm(n);n*=1 if positive else -1;t=np.array([-n[1],n[0]]);p=np.array(point)
        return Polygon([p+t*100,p-t*100,p-t*100+n*100,p+t*100+n*100])
    for i,e in enumerate(beams):
        a=np.array(rim_points[i]);b=np.array(rim_points[i+1]);u=(b-a)/np.linalg.norm(b-a)
        poly=LineString([a-u*.25,b+u*.25]).buffer(e['sectionSizeM'][0]/2,cap_style=2)
        for point,normal,positive in [(a,u,True),(b,u,False)]:
            if positive and i>0:
                prev=a-np.array(rim_points[i-1]);normal=u+prev/np.linalg.norm(prev)
            if not positive and i<len(beams)-1:
                nex=np.array(rim_points[i+2])-b;normal=u+nex/np.linalg.norm(nex)
            poly=poly.intersection(halfplane(point,normal,positive))
        # Extend the I-profile first so a mitre is not limited by square ends.
        extended=steel('TEMP','temporary mitre blank',list(a-u*.25)+[e['axis'][0][2]],list(b+u*.25)+[e['axis'][1][2]],beam_section)
        replace_geometry(e,solid(extended['triangles'])^solid(extrusion(poly,2,2,3)))
        elements.remove(extended)
        e['connectionRequirement']='Mitred contact is geometry only. Cap/end plates, bolts/welds, stiffness and erection tolerances are not designed.'
    for i,(x,y) in enumerate(post_xy,1):
        w=cfg['postSizeM'];t=cfg['postWallM'];ring=box(x-w/2,y-w/2,x+w/2,y+w/2).difference(box(x-w/2+t,y-w/2+t,x+w/2-t,y+w/2-t))
        e=add(f'M-GARDEN-POST-{i:02}','Garden room · glazing-side terrace support post '+str(i),'beams',extrusion(ring,2,0,roof_bottom),
              '80 × 80 × 5 mm hollow steel space reservation; section unselected',level=0,rate='steel',quantity=ring.area*roof_bottom*7850,
              source=[source['id']],material='steel',issueIds=['GARDEN-FRAME','GARDEN-FOUNDATIONS'],structuralSystem='garden-terrace',
              basis='Posts sit on foundation stems/pedestal behind glazing or the solid house-side pier. Nominal sharp-corner section mass allowance, not a supplier section or capacity calculation. Baseplates, anchors, corrosion/fire protection and frame connections remain undesigned.')
        e['axis']=[[x,y,0],[x,y,roof_bottom]];e['sectionSizeM']=[w,w]
        e['supportStatus']='Concrete stem/pedestal below, terrace receiver above; contact only, load path and joint capacities unverified.'
    # Clear joist zone ends at receiver faces, and preserves the three rooflights.
    roof_inside=Polygon(rim_points)
    beam_masks=unary_union([footprint(e['triangles']) for e in beams])
    domain=roof_inside.difference(beam_masks)
    holes=[Polygon(r) for p in parts(roof_poly) if p.geom_type=='Polygon' for r in p.interiors]
    assert len(holes)==3, 'Review changed garden rooflight geometry before rebuilding framing'
    opening_masks=unary_union(holes)
    timber=[];trimmers=[]
    side_positions=[]
    for i,hole in enumerate(sorted(holes,key=lambda h:h.bounds[0]),1):
        x0,y0,x1,y1=hole.bounds
        side_positions += [x0-.045,x1+.045]
        for tag,y in [('S',y0-.045),('N',y1+.045)]:
            e=bar(f'M-GARDEN-RL-{i}-{tag}',f'Garden room · rooflight {i} {tag} doubled header','trimmers',[x0,y,roof_bottom+.11],[x1,y,roof_bottom+.11],.09,.22,'2 × 45 × 220 mm C24 reservation',level=1,source=[source['id']],rate='timber',issueIds=['GARDEN-FRAME'],structuralSystem='garden-terrace')
            trimmers.append(e)
    all_masks=unary_union([opening_masks,*[footprint(e['triangles']) for e in trimmers]])
    width,depth=cfg['roofJoistSizeM'];spacing=cfg['roofJoistSpacingM']
    positions=[(round(x,5),.09,'doubled rooflight side joist') for x in side_positions]
    x=math.ceil((west_x+.1)/spacing)*spacing
    while x<east_x-.1:
        if all(abs(x-s)>.0675+.001 for s in side_positions):positions.append((round(x,5),width,'terrace joist'))
        x+=spacing
    for col,(x,w,name) in enumerate(sorted(positions),1):
        # A full rectangular timber must clear the diagonal beam, not just its
        # centreline. Intersect the three parallel lines to get square end cuts.
        slices=[domain.intersection(LineString([[x+d,8],[x+d,15]])) for d in [-w/2,0,w/2]]
        min_y=max(s.bounds[1] for s in slices);max_y=min(s.bounds[3] for s in slices)
        runs=LineString([[x,min_y],[x,max_y]]).difference(all_masks)
        for j,run in enumerate(parts(runs),1):
            if run.geom_type!='LineString' or run.length<.1:continue
            a,b=list(run.coords)[0],list(run.coords)[-1]
            if a[1]>b[1]:a,b=b,a
            e=bar(f'M-GARDEN-J-{col:02}-{j}',f'Garden room · {name} {col:02}.{j}','rafters',list(a)+[roof_bottom+depth/2],list(b)+[roof_bottom+depth/2],w,depth,
                  f'{w*1000:.0f} × {depth*1000:.0f} mm C24 reservation',level=1,source=[source['id']],rate='timber',issueIds=['GARDEN-FRAME'],structuralSystem='garden-terrace')
            e['spacingMm']=spacing*1000;timber.append(e)
    # Explicit connection references for each timber end, including rooflight
    # headers; no unselected hanger is drawn as if it were a designed product.
    supports=beams+timber
    for e in timber+trimmers:
        refs=[]
        for p in e['axis']:
            near=sorted([(Point(p[:2]).distance(footprint(s['triangles'])),s['id']) for s in supports+trimmers if s is not e])
            refs.append({'memberId':near[0][1],'gapM':round(near[0][0],5),'capacityVerified':False})
        e['gardenEndSupports']=refs
        e['supportStatus']='End receivers: '+', '.join(r['memberId'] for r in refs)+'. Rooflight trimming, hangers, bolted steel-web infill and timber capacities remain uncalculated.'
    fascia_solid=None
    for i,(a,b) in enumerate(zip(list(roof_poly.exterior.coords),list(roof_poly.exterior.coords)[1:]),1):
        if abs(a[1]-8.935)<.001 and abs(b[1]-8.935)<.001:continue
        fascia=bar(f'M-GARDEN-FASCIA-{i:02}','Garden room · outer fascia backing '+str(i),'fascia',list(a)+[2.65],list(b)+[2.65],.045,.195,
            '45 × 195 mm fascia backing; projection support detail required',level=1,source=[source['id']],rate='timber',issueIds=['GARDEN-FRAME'],structuralSystem='garden-terrace')
        shape=solid(fascia['triangles'])
        if fascia_solid is not None:
            shape=shape-fascia_solid;replace_geometry(fascia,shape)
        fascia_solid=shape if fascia_solid is None else fascia_solid+shape
        fascia['cost']['quantity']=round(shape.volume(),5)
    # Surface zones retain rooflight holes; no solid layer caps the glazing.
    add('M-GARDEN-ROOF-DECK','Garden room · terrace structural deck allowance','layers',extrusion(roof_poly,2,2.77,2.792),'22 mm deck allowance',level=1,source=[source['id']],issueIds=['GARDEN-FRAME'],
        basis='Deck follows the chamfer and three rooflight apertures. The current architectural roof depth does not reserve a complete insulation, falls, waterproofing, terrace paving and ceiling assembly; resolve that separately without treating this envelope as construction ready.')
    new_ids=[e['id'] for e in elements if e['id'].startswith('M-GARDEN-')]
    for item in elements:
        if item['id'].startswith('M-GARDEN-') and item['category']=='layers':item['layerRole']='deck' if item['id'].endswith('DECK') else item['id'].rsplit('-',1)[-1].lower()
    masonry_ids=[e['id'] for e in elements if e['category']=='masonry' and any(s in e['sourceIds'] for s in [west['id'],wall_sources['Proposal | Rear inset | former kitchen window masonry infill']['id']])]
    issue('GARDEN-FRAME','Garden room / terrace frame added; capacities and roof depth unresolved',
          'Steel receivers and six posts provide an explicit support proposal behind the glazing. Solid timber follows the three rooflight openings, with separate doubled side joists/headers. Sections, roof terrace loading/deflection, diaphragm stability, steel/wood connections, glazing tolerances and the projecting roof edge require design. The 225 mm architectural roof band is not a complete warm-roof/terrace build-up; resolve insulation, falls, waterproofing and finishes before fixing levels.',[e['id'] for e in beams]+[e['id'] for e in timber[:2]],'unresolved')
    issue('GARDEN-FOUNDATIONS','Garden room poured slab and connected substructure included',
          'The 200 mm slab has a 150 mm build-up allowance and a 10 mm perimeter isolation gap. Foundation walls support the masonry and posts independently of the slab, rising from provisional 600 × 300 mm footings at reference underside Z−1.20 m to Z0. Depth is measured from model FFL, not surveyed ground; ground, trees, fill, settlement, loads, reinforcement, damp-proofing and existing-house junctions may require another depth or foundation system. No pour/rebar schedule is issued.',[slab['id'],foundations['id'],stems['id']]+masonry_ids,'unresolved')
    return {'basis':cfg['basis'],'memberIds':new_ids+masonry_ids,'retiredRoofMemberIds':sorted(old_ids),
            'slabAreaM2':round(slab_poly.area,5),'slabVolumeM3':slab['cost']['quantity'],'grossArchitecturalFloorM2':round(floor_poly.area,5),
            'rooflightCount':len(holes),'roofSourceId':source['id'],'garageFoundationIds':garage_ids,
            'sources':cfg['sources'],'capacityVerified':False}
