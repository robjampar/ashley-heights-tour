"""Geometric junction coordination, never a fabrication or capacity approval."""
import math
import collections
import numpy as np
import trimesh
import manifold3d as mf
from shapely.geometry import box, LineString, Point
from shapely.strtree import STRtree
from scripts.structure.build_study import mesh_edges


def solid(triangles):
    points=np.asarray(triangles,dtype=float)
    mesh=trimesh.Trimesh(vertices=points,faces=np.arange(len(points)).reshape(-1,3),process=True)
    # Boolean results may contain inward-facing cavity shells. Forcing every
    # disconnected shell to positive volume would silently fill those voids.
    if not mesh.is_winding_consistent:mesh.fix_normals(multibody=False)
    if mesh.volume<0:mesh.invert()
    result=mf.Manifold(mf.Mesh64(np.asarray(mesh.vertices,dtype=np.float64),np.asarray(mesh.faces,dtype=np.uint64)))
    if result.status()!=mf.Error.NoError:
        raise ValueError(f'Invalid closed solid for junction audit: {result.status()}')
    return result


def triangles(shape):
    m=shape.to_mesh64()
    return np.asarray(m.vert_properties)[np.asarray(m.tri_verts)].reshape(-1,3).round(9).tolist()


def replace_geometry(e,shape):
    tri=triangles(shape)
    if not tri:raise ValueError('A correction removed the entire member: '+e['id'])
    v=np.array(tri);e.update(triangles=tri,edges=mesh_edges(tri),bounds=[v.min(axis=0).tolist(),v.max(axis=0).tolist()])
    e['measurements']['envelopeM']=(v.max(axis=0)-v.min(axis=0)).round(6).tolist()


def normalise_masonry_winding(elements):
    """Use the same closed-solid orientation for display and the existing audit.

    Authored prisms may be inward wound, or have inconsistent return faces.
    Reorient only those leaves; preserve shape, units and priced quantities.
    """
    corrected=[]
    for e in elements:
        if e['category']!='masonry':continue
        points=np.asarray(e['triangles'],dtype=float)
        mesh=trimesh.Trimesh(vertices=points,faces=np.arange(len(points)).reshape(-1,3),process=True)
        if mesh.is_winding_consistent and mesh.volume>0:continue
        replace_geometry(e,solid(e['triangles']));corrected.append(e['id'])
    return corrected


def cuboid(lo,hi):
    return mf.Manifold.cube((np.array(hi)-lo).tolist()).translate(lo)


def horizontal_layer(poly,low,high):
    """Closed board/air-envelope extrusion, retaining exact holes and returns.

    The display triangulator rounds vertices to 10 microns and can leave a
    non-manifold seam at a nearly coincident wall return. CrossSection creates
    the caps and sides together, so the same solid can be checked and drawn.
    """
    if not high>low:raise ValueError('A physical layer needs positive depth')
    polygons=[poly] if poly.geom_type=='Polygon' else list(poly.geoms)
    contours=[list(ring.coords)[:-1] for p in polygons if p.geom_type=='Polygon' for ring in [p.exterior,*p.interiors]]
    shape=mf.CrossSection(contours,mf.FillRule.EvenOdd).extrude(high-low).translate([0,0,low])
    if shape.status()!=mf.Error.NoError:raise ValueError('Invalid layer extrusion')
    if abs(shape.volume()-poly.area*(high-low))>1e-6:raise ValueError('Layer extrusion changed the intended volume')
    return triangles(shape)


def trim_end(child,support,clearance):
    """A full-section end setback, never a flange notch or interior cut."""
    a,b=np.array(child['axis'][0]),np.array(child['axis'][1]);p,q=np.array(support['axis'][0]),np.array(support['axis'][1])
    direction=q[:2]-p[:2];direction/=np.linalg.norm(direction)
    run=b[:2]-a[:2];length=np.linalg.norm(run)
    if length<.05 or abs(np.dot(run/length,direction))>.999:return None
    normal=np.array([-direction[1],direction[0],0.])
    if np.dot((a+b)/2-p,normal)<0:normal=-normal
    width=support['sectionSizeM'][0] if support.get('sectionSizeM') else support['steelProfile']['widthMm']/1000
    offset=float(np.dot(p,normal)+width/2+clearance)
    distances=[float(np.dot(pt,normal)-offset) for pt in (a,b)]
    if min(distances)>=0 or max(distances)<=0:return None
    end=0 if distances[0]<0 else 1;t=-distances[0]/(distances[1]-distances[0]);cut=a+t*(b-a)
    setback=math.dist((a,b)[end],cut)
    if setback>min(.5,math.dist(a,b)*.45):return None
    shape=solid(child['triangles']).trim_by_plane(normal.tolist(),offset)
    if shape.is_empty():return None
    before=child['axis'][end];child['axis'][end]=cut.tolist();replace_geometry(child,shape)
    child['measurements']['lengthM']=round(math.dist(*child['axis']),6)
    if child.get('cost'):
        if child['cost']['rateKey']=='steel':quantity=child['measurements']['lengthM']*child['steelProfile']['kgPerM']
        elif child['cost']['rateKey']=='timber':quantity=shape.volume()
        else:quantity=child['measurements']['lengthM']
        child['cost']['quantity']=round(quantity,6)
    detail={'memberId':child['id'],'supportId':support['id'],'end':end+1,'originalEnd':before,'currentEnd':cut.round(6).tolist(),
            'setbackMm':round(setback*1000,2),'modelClearanceMm':clearance*1000,
            'cut':'Full-section end cut; vertical plane' if child['category']=='rafters' else 'Full-section end setback',
            'planeNormal':normal.tolist(),'planeOffsetM':offset,'fabricationReady':False,
            'connection':'Connection plates, bolts/welds, bearing and restraint still require design; no notches or holes inferred.'}
    child.setdefault('endCutDetails',[]).append(detail)
    return detail


def coordinate_member_ends(elements,spec):
    by={e['id']:e for e in elements};cuts=[]
    steels=[e for e in elements if e.get('steelProfile')]
    # Through-girders first, then longer proposed beam lines; deterministic order.
    def priority(e):
        beam_line=e.get('proposedBeamLine',{}).get('line',e['axis'])
        return (e.get('throughPriority',0),e.get('steelProfile',{}).get('depthMm',0),math.dist(*beam_line),e['id'])
    steels.sort(key=priority,reverse=True)
    for i,support in enumerate(steels):
        for child in steels[i+1:]:
            if support.get('condition') and child.get('condition')!=support['condition']:continue
            if not bounds_overlap(support,child):continue
            if (solid(support['triangles'])^solid(child['triangles'])).volume()<1e-7:continue
            result=trim_end(child,support,spec['beamEndClearanceMm']/1000)
            if result:cuts.append(result)
    for child in elements:
        if child['category'] not in ('trimmers','rafters','fascia') or not child.get('axis'):continue
        for support in steels:
            if support.get('condition') and child.get('condition')!=support['condition']:continue
            if not bounds_overlap(support,child):continue
            if (solid(support['triangles'])^solid(child['triangles'])).volume()<1e-7:continue
            result=trim_end(child,support,spec['rafterEndClearanceMm']/1000)
            if result:cuts.append(result)
    return cuts


def bounds_overlap(a,b,tolerance=0):
    return all(min(a['bounds'][1][i],b['bounds'][1][i])-max(a['bounds'][0][i],b['bounds'][0][i])>tolerance for i in range(3))


def coordinate_masonry(elements,spec):
    """Align cavity corner returns and alternate ownership of shared courses.

    Only close perpendicular exterior corners identified by touching/near
    outer leaves. Do not close window openings or infer movement-joint design.
    """
    retired=spec.get('replacedMasonryReturns',[]);by_all={e['id']:e for e in elements}
    for rule in retired:
        old,replacement=by_all[rule['id']],by_all[rule['replacementId']]
        replacement['sourceIds']=list(dict.fromkeys(replacement['sourceIds']+old['sourceIds']))
        replacement.setdefault('replacedMasonryReturns',[]).append(rule)
    retired_ids={r['id']for r in retired};elements[:]=[e for e in elements if e['id']not in retired_ids]
    walls=[e for e in elements if e['category']=='masonry' and not e.get('foundationSubstructure')];shapes={e['id']:solid(e['triangles']) for e in walls}
    original_volumes={k:v.volume() for k,v in shapes.items()}
    changed=set();corners=[];adjustments=[];removed=[{**r,'sourceIds':by_all[r['id']]['sourceIds']}for r in retired]
    def edit_end(e,end,target,zlo,zhi,explicit=False):
        normal=e['wallNormal'];along=1-normal;lo,hi=e['bounds'];old=(lo,hi)[end][along]
        if abs(old-target)<.00001:return
        if not explicit and abs(old-target)>spec['masonryCornerMaxAdjustmentMm']/1000:return
        extend=(target-old)*(1 if end else -1)>0
        if extend:
            bbox_volume=math.prod(np.array(hi)-lo)
            if not explicit and abs(original_volumes[e['id']]-bbox_volume)>1e-5:return
            aa=lo.copy();bb=hi.copy();aa[2]=zlo;bb[2]=zhi
            aa[along]=min(target,old);bb[along]=max(target,old)
            shapes[e['id']]=shapes[e['id']]+cuboid(aa,bb)
        else:
            aa=[-100.,-100.,zlo];bb=[100.,100.,zhi]
            if end:aa[along]=target
            else:bb[along]=target
            shapes[e['id']]=shapes[e['id']]-cuboid(aa,bb)
        changed.add(e['id']);adjustments.append({'memberId':e['id'],'axis':along,'end':end+1,'fromM':old,'toM':target,'zRange':[zlo,zhi]})
    outer=[e for e in walls if e['leaf'] in ('brick','solidbrick')]
    for i,a in enumerate(outer):
        for b in outer[i+1:]:
            if a['leaf']!=b['leaf'] or a['wallNormal']==b['wallNormal'] or a['region']!=b['region']:continue
            zlo=max(a['bounds'][0][2],b['bounds'][0][2]);zhi=min(a['bounds'][1][2],b['bounds'][1][2])
            if zhi-zlo<.1:continue
            ra=box(*a['bounds'][0][:2],*a['bounds'][1][:2]);rb=box(*b['bounds'][0][:2],*b['bounds'][1][:2])
            if ra.distance(rb)>spec['cornerSearchMm']/1000:continue
            ends=[]
            for wall,other in ((a,b),(b,a)):
                along=1-wall['wallNormal'];mid=(other['bounds'][0][along]+other['bounds'][1][along])/2
                end=min((0,1),key=lambda k:abs(wall['bounds'][k][along]-mid))
                if abs(wall['bounds'][end][along]-mid)>.15:break
                ends.append(end)
            if len(ends)!=2:continue
            corners.append({'a':a['id'],'b':b['id'],'zRange':[zlo,zhi],'bond':'Alternate-course corner ownership; product bond, closures, ties and movement joints remain to be detailed.'})
            for wall,other,end in ((a,b,ends[0]),(b,a,ends[1])):
                along=1-wall['wallNormal'];edit_end(wall,end,other['bounds'][end][along],zlo,zhi)
                inner=[w for w in walls if w['leaf']=='block' and w['wallNormal']==wall['wallNormal'] and set(w['sourceIds'])&set(wall['sourceIds'])]
                mates=[w for w in walls if w['leaf']=='block' and w['wallNormal']==other['wallNormal'] and set(w['sourceIds'])&set(other['sourceIds'])]
                for w in inner:
                    for mate in mates:edit_end(w,end,mate['bounds'][end][along],zlo,zhi)
    # Named returns resolve re-entrant / T junctions that cannot be inferred
    # safely from the old thin architectural envelope. Apply before bonding,
    # so intersecting leaves still share alternate courses without duplicates.
    by={e['id']:e for e in walls}
    for rule in spec.get('masonryEndCorrections',[]):
        wall=by[rule['memberId']]
        zlo,zhi=rule.get('zRange',[wall['bounds'][0][2],wall['bounds'][1][2]])
        if rule['axis']!=1-wall['wallNormal']:raise ValueError('Masonry end rule changes leaf thickness: '+wall['id'])
        edit_end(wall,rule['end'],rule['targetM'],zlo,zhi,explicit=True)
    # Divide overlaps at common course heights, alternating the through leaf.
    for i,a in enumerate(walls):
        for b in walls[i+1:]:
            if a['leaf']!=b['leaf'] or a['region']!=b['region']:continue
            if not bounds_overlap(a,b,-.36):continue
            overlap=shapes[a['id']]^shapes[b['id']]
            if overlap.volume()<1e-7:continue
            course=.225 if a['leaf']=='block' else .075
            lo,hi=max(a['bounds'][0][2],b['bounds'][0][2]),min(a['bounds'][1][2],b['bounds'][1][2])
            masks=[]
            for row in range(math.floor(lo/course),math.ceil(hi/course)):
                if row%2==0:masks.append(cuboid([-100,-100,row*course],[100,100,(row+1)*course]))
            even=mf.Manifold.batch_boolean(masks,mf.OpType.Add)
            shapes[b['id']]=shapes[b['id']]-(overlap^even)
            shapes[a['id']]=shapes[a['id']]-(overlap-even)
            changed.update((a['id'],b['id']))
    for e in walls:
        if e['id'] not in changed:continue
        old_volume=solid(e['triangles']).volume();shape=shapes[e['id']]
        if shape.is_empty():
            if e['leaf']!='block' or not any(a['memberId']==e['id'] for a in adjustments):
                raise ValueError('Unexpected empty corner member '+e['id'])
            removed.append({'id':e['id'],'sourceIds':e['sourceIds'],
                            'reason':'The short architectural return falls inside the perpendicular cavity after inner-leaf corner alignment; no separate block leaf fits here.'})
            continue
        replace_geometry(e,shape)
        thickness=e.get('leafThicknessM',.215 if e['leaf']=='solidbrick' else .1 if e['leaf']=='block' else .1025)
        e['areaM2']=round(shape.volume()/thickness,6);e['cost']['quantity']=e['areaM2']
        e['cornerCoordination']={'volumeChangeM3':round(shape.volume()-old_volume,6),'basis':'Connected returns and alternating course ownership; no duplicate corner volume. Bond/closer/tie schedule is still provisional.'}
        rebuild_masonry_units(e,shape)
    removed_ids={r['id'] for r in removed};elements[:]=[e for e in elements if e['id'] not in removed_ids]
    return {'corners':corners,'adjustments':adjustments,'changedAssemblies':sorted(changed-removed_ids),'removedCornerReturns':removed}


def rebuild_masonry_units(e,shape):
    """Re-cut standard unit cells against the coordinated wall solid."""
    lo,hi=e['bounds'];normal=e['wallNormal'];along=1-normal;kind=e['leaf'];unitheight=.215 if kind=='block' else .065
    course=unitheight+.01;units=[];cuts=[];count=0;volume=0
    for row in range(math.floor(lo[2]/course),math.ceil(hi[2]/course)):
        length=.1025 if kind=='solidbrick' and row%2 else .44 if kind=='block' else .215
        depth=.1025 if kind=='solidbrick' and row%2==0 else .215 if kind=='solidbrick' else e.get('leafThicknessM',.1) if kind=='block' else .1025
        normals=[lo[normal],lo[normal]+.1125] if kind=='solidbrick' and row%2==0 else [lo[normal]]
        shift=(row%2)*(length+.01)/2
        for col in range(math.floor((lo[along]-shift)/(length+.01)),math.ceil((hi[along]-shift)/(length+.01))):
            for n in normals:
                aa=[0.,0.,row*course];bb=[0.,0.,row*course+unitheight]
                aa[normal]=n;bb[normal]=n+depth;aa[along]=col*(length+.01)+shift;bb[along]=aa[along]+length
                cell=cuboid(aa,bb)^shape;v=cell.volume()
                if v<1e-8:continue
                count+=1;volume+=v
                if abs(v-length*depth*unitheight)<1e-8:
                    units.append([*((np.array(aa)+bb)/2).round(6).tolist(),*(np.array(bb)-aa).round(6).tolist()])
                else:cuts+=triangles(cell)
    e.update(units=units,cutUnitTriangles=cuts,unitCount=count,equivalentWholeUnits=round(volume/(.44*e.get('leafThicknessM',.1)*.215 if kind=='block' else .215*.1025*.065),1))


def reserve_masonry_lintel_pockets(elements,spec):
    """Reserve named head/bearing volumes without overlapping masonry units."""
    rule=spec.get('masonryLintelPockets');audit=[]
    if not rule:return audit
    lintels=[e for e in elements if e['category']=='lintels' and any(e['name'].startswith(p) for p in rule['lintelNamePrefixes'])]
    walls=[e for e in elements if e['category']=='masonry' and any(e['name'].startswith(p) for p in rule['wallNamePrefixes'])]
    for wall in walls:
        shape=solid(wall['triangles']);before=shape.volume();ids=[]
        for head in lintels:
            if not bounds_overlap(wall,head,0):continue
            mask=solid(head['triangles'])
            if (shape^mask).volume()<1e-9:continue
            shape=shape-mask;ids.append(head['id'])
        if not ids:continue
        replace_geometry(wall,shape);rebuild_masonry_units(wall,shape)
        thickness=wall.get('leafThicknessM',.1 if wall['leaf']=='block' else .1025)
        wall['areaM2']=round(shape.volume()/thickness,6);wall['cost']['quantity']=wall['areaM2']
        wall['lintelPockets']={'lintelIds':ids,'basis':rule['basis']}
        audit.append({'memberId':wall['id'],'lintelIds':ids,'reservedVolumeM3':round(before-shape.volume(),6)})
    return audit


def reserve_bearing_seats(elements,spec,add):
    """Named inner-leaf seats; keep bearing contact and separate the cavity.

    Pad / grout dimensions are spatial allowances, never product selections.
    The beam is not trimmed to hide a clash and the outer leaf is not cut.
    """
    by={e['id']:e for e in elements};records=[]
    for r in spec.get('bearingSeatReservations',[]):
        beam=by[r['beamId']];wall=by[r['wallId']]
        support_walls=[by[i]for i in dict.fromkeys([r['wallId'],*r.get('additionalSupportWallIds',[])])]
        if any(w.get('leaf')!=wall.get('leaf')for w in support_walls):
            raise ValueError('A padstone must not join different cavity leaves: '+r['id'])
        low,high=r['planBounds'];bearing=beam['bounds'][0][2];grout_top=bearing;grout_bottom=bearing-r['groutDepthM']
        pad_bottom=grout_bottom-r['padDepthM'];gap=r.get('sideAndTopClearanceM',r.get('sideClearanceM',.01))
        pad_shape=cuboid([*low,pad_bottom],[*high,grout_bottom])
        beam_low,beam_high=beam['bounds']
        seat_low=[max(beam_low[k],low[k]) for k in (0,1)]+[grout_bottom]
        seat_high=[min(beam_high[k],high[k]) for k in (0,1)]+[grout_top]
        if any(seat_high[k]<=seat_low[k] for k in (0,1)):raise ValueError('Bearing pad misses beam: '+r['id'])
        grout_shape=cuboid(seat_low,seat_high)
        # Clearance around the steel above the bearing; never beneath it.
        pocket_bounds=[[beam_low[0]-gap,beam_low[1]-gap,bearing],[beam_high[0]+gap,beam_high[1]+gap,beam_high[2]+gap]]
        pocket=cuboid(*pocket_bounds)
        originals={w['id']:solid(w['triangles'])for w in support_walls}
        original=mf.Manifold.batch_boolean(list(originals.values()),mf.OpType.Add)
        below=cuboid([*low,pad_bottom-.001],[*high,pad_bottom])
        supported_fraction=min(1.,max(0.,(original^below).volume()/below.volume()))
        if r.get('requireFullMasonryContact') and supported_fraction<.9999:
            raise ValueError('Padstone base extends beyond masonry: '+r['id'])
        mask=pad_shape+grout_shape+pocket;result=original-mask
        for support_wall in support_walls:
            cut=originals[support_wall['id']]-mask
            replace_geometry(support_wall,cut);rebuild_masonry_units(support_wall,cut)
            thickness=support_wall.get('leafThicknessM',.215 if support_wall.get('leaf')=='solidbrick' else .1025 if support_wall.get('leaf')=='brick' else .1)
            support_wall['areaM2']=round(cut.volume()/thickness,6);support_wall['cost']['quantity']=support_wall['areaM2']
        source_ids=list(dict.fromkeys(i for w in support_walls for i in w['sourceIds']))
        level=r.get('level',beam['level']);issues=r.get('issueIds',['GALLERY-SHARED-RECEIVER'])
        pad=add(r['id'],r['name'],'rc',triangles(pad_shape),f'{(high[0]-low[0])*1000:g} x {(high[1]-low[1])*1000:g} x {r["padDepthM"]*1000:g} mm bearing-pad reservation',
            level=level,source=source_ids,basis=r['basis'],issueIds=issues,material='concrete',
            supportMemberIds=[w['id']for w in support_walls],supportedMemberIds=[beam['id']],capacityVerified=False)
        grout=add(r['id']+'-GROUT',r['name']+' · levelling grout allowance','rc',triangles(grout_shape),f'{r["groutDepthM"]*1000:g} mm grout allowance',
            level=level,source=source_ids,basis='Unselected levelling grout bearing layer. Strength, installation, thickness and cure before loading require design and product instructions.',
            issueIds=issues,material='grout',supportMemberIds=[pad['id']],supportedMemberIds=[beam['id']],capacityVerified=False)
        record={'beamId':beam['id'],'wallId':wall['id'],'wallIds':[w['id']for w in support_walls],'padId':pad['id'],'groutId':grout['id'],
            'nominalBearingM':r['nominalBearingM'],'bearingZ':bearing,'removedMasonryM3':round(original.volume()-result.volume(),7),
            'padBounds':[[*low,pad_bottom],[*high,grout_bottom]],'groutBounds':[seat_low,seat_high],'steelPocketBounds':pocket_bounds,
            'contactAreaM2':round((seat_high[0]-seat_low[0])*(seat_high[1]-seat_low[1]),7),
            'baseSupportedFraction':round(supported_fraction,7),'capacityVerified':False,'basis':r['basis']}
        beam.setdefault('bearingSeat',record);beam.setdefault('bearingSeats',[]).append(record)
        for support_wall in support_walls:
            support_wall.setdefault('bearingSeat',record);support_wall.setdefault('bearingSeats',[]).append(record)
        records.append(record)
    return records


def reserve_retained_bearing_seats(elements,model,spec,add):
    """New pad geometry in a named existing pier; record its native pocket."""
    from scripts.structure.build_study import footprint
    by={e['id']:e for e in elements};sources={e['id']:e for e in model['elements']};records=[]
    for r in spec.get('retainedBearingSeatReservations',[]):
        beam=by[r['beamId']];wall=sources[r['sourceWallId']];lo,hi=r['planBounds'];bearing=beam['bounds'][0][2]
        pad_top=bearing-r['groutDepthM'];pad_bottom=pad_top-r['padDepthM'];plan=box(*lo,*hi)
        if plan.difference(footprint(wall['triangles'])).area>1e-6:raise ValueError('Retained bearing pad crosses a wall opening: '+r['id'])
        level=r.get('level',beam['level']);name=r.get('name','Gallery edge beam · new pad in retained front pier');issues=r.get('issueIds',['GALLERY-SHARED-RECEIVER'])
        pad=add(r['id'],name,'rc',triangles(cuboid([*lo,pad_bottom],[*hi,pad_top])),
            f'{(hi[0]-lo[0])*1000:g} x {(hi[1]-lo[1])*1000:g} x {r["padDepthM"]*1000:g} mm pad envelope',
            level=level,scope='alteration',source=[wall['id']],issueIds=issues,material='concrete',
            supportedMemberIds=[beam['id']],supportSourceIds=[wall['id']],capacityVerified=False,basis=r['basis'])
        b0,b1=beam['bounds'];seat0=[max(lo[k],b0[k]) for k in (0,1)];seat1=[min(hi[k],b1[k]) for k in (0,1)]
        grout=add(r['id']+'-GROUT',name+' · levelling grout','rc',triangles(cuboid([*seat0,pad_top],[*seat1,bearing])),
            f'{r["groutDepthM"]*1000:g} mm unselected grout allowance',level=level,scope='alteration',source=[wall['id']],material='grout',issueIds=issues,
            supportedMemberIds=[beam['id']],supportMemberIds=[pad['id']],capacityVerified=False,basis=r['basis'])
        record={'beamId':beam['id'],'wallId':wall['id'],'padId':pad['id'],'groutId':grout['id'],'bearingZ':bearing,
            'nominalBearingM':r.get('nominalBearingM',hi[1]-lo[1]),'contactAreaM2':(seat1[0]-seat0[0])*(seat1[1]-seat0[1]),
            'nativePocket':{'sourceObject':wall['sourceObject'],'low':[*lo,pad_bottom],'high':[*hi,max(wall['bounds'][1][2],bearing)]},
            'capacityVerified':False,'basis':r['basis']}
        gap=r.get('sideAndTopClearanceM',.01)
        record['nativeCutBoxes']=[
            {'role':'pad','low':[*lo,pad_bottom],'high':[*hi,pad_top]},
            {'role':'grout','low':[*seat0,pad_top],'high':[*seat1,bearing]},
            {'role':'steel-pocket','low':[b0[0]-gap,b0[1]-gap,bearing],
             'high':[b1[0]+gap,b1[1]+gap,b1[2]+gap]}]
        record['nativePockets']=[record['nativePocket']]
        for ident in r.get('additionalSourceWallIds',[]):
            other=sources[ident]
            record['nativePockets'].append({'sourceObject':other['sourceObject'],'low':[*lo,pad_bottom],
                'high':[*hi,max(other['bounds'][1][2],bearing)]})
        beam.setdefault('bearingSeats',[]).append(record);pad['retainedBearingPocket']=record;records.append(record)
    return records


def reserve_masonry_passages(elements,spec):
    """Open-top outer-leaf block-outs; never count the brick as steel bearing."""
    by={e['id']:e for e in elements};records=[]
    for r in spec.get('masonryPassagePockets',[]):
        beam=by[r['beamId']];wall=by[r['wallId']];lo,hi=beam['bounds'];gap=r['clearanceM']
        pocket=cuboid([lo[0]-gap,lo[1]-gap,lo[2]-gap],[hi[0]+gap,hi[1]+gap,hi[2]+gap])
        before=solid(wall['triangles']);after=before-pocket
        replace_geometry(wall,after);rebuild_masonry_units(wall,after)
        thickness=wall['bounds'][1][wall['wallNormal']]-wall['bounds'][0][wall['wallNormal']]
        wall['areaM2']=after.volume()/thickness;wall['cost']['quantity']=wall['areaM2']
        record={**r,'removedVolumeM3':before.volume()-after.volume(),'capacityVerified':False,
                'pocketBounds':[[lo[0]-gap,lo[1]-gap,lo[2]-gap],[hi[0]+gap,hi[1]+gap,hi[2]+gap]]}
        wall.setdefault('beamPassages',[]).append(record);beam.setdefault('masonryPassages',[]).append(record);records.append(record)
    return records


def continue_masonry_through_floor(elements,spec):
    """Continue only aligned leaves, never use a timber floor as wall support.

    Intersection with the actual lower wall-head slice prevents filling across
    unsupported bays. Lower heads/bearings still require capacity verification.
    """
    rule=spec.get('masonryFloorContinuations')
    if not rule:return {'continuations':[],'timberIntersections':[]}
    for alignment in rule.get('innerLeafAlignments',[]):
        e=next(e for e in elements if e['id']==alignment['memberId'])
        lo=[-100.,-100.,-100.];hi=[100.,100.,100.];lo[alignment['axis']]=alignment['minimum']
        shape=solid(e['triangles'])^cuboid(lo,hi);replace_geometry(e,shape);rebuild_masonry_units(e,shape)
        e['areaM2']=round(shape.volume()/.1,6);e['cost']['quantity']=e['areaM2'];e['innerLeafAlignment']=alignment
    bottom,top=rule['bottomZ'],rule['topZ'];walls=[e for e in elements if e['category']=='masonry' and e['region']=='house']
    lower={kind:[e for e in walls if e['leaf']==kind and e['bounds'][0][2]<bottom-.001 and e['bounds'][1][2]>=bottom-.00001 and (e['scope']!='garage-rebuild' or rule.get('includeGarageRebuildHeads',False))] for kind in ('brick','block')}
    slices={kind:mf.Manifold.batch_boolean([solid(e['triangles']) for e in es],mf.OpType.Add).slice(bottom-.00001) for kind,es in lower.items()}
    records=[];timber_hits=[]
    for e in walls:
        if e['leaf'] not in slices or abs(e['bounds'][0][2]-top)>.00001:continue
        if not any(e['name'].startswith(prefix) for prefix in rule['sourceNamePrefixes']):continue
        original=solid(e['triangles']);base=original.slice(top+.00001);supported=base^slices[e['leaf']]
        if supported.area()<.000001:continue
        band=mf.Manifold.extrude(supported,top-bottom).translate([0,0,bottom])
        support_ids=[w['id'] for w in lower[e['leaf']] if (supported^solid(w['triangles']).slice(bottom-.00001)).area()>.000001]
        shape=original+band;replace_geometry(e,shape)
        thickness=.1025 if e['leaf']=='brick' else .1
        e['areaM2']=round(shape.volume()/thickness,6);e['cost']['quantity']=e['areaM2'];rebuild_masonry_units(e,shape)
        record={'memberId':e['id'],'bottomZ':bottom,'topZ':top,'lowerWallIds':support_ids,'baseAreaM2':round(base.area(),6),'continuedAreaM2':round(supported.area(),6),'unmatchedBaseAreaM2':round((base-supported).area(),6),'capacityVerified':False}
        e['floorBandSupport']=record;e['issueIds'].append('MASONRY-FLOOR');e['supportStatus']=rule['basis']+' Lower wall/head references: '+', '.join(support_ids)
        records.append(record)
        for timber in elements:
            if timber['category'] not in ('joists','trimmers') or timber['level']!=1 or not bounds_overlap(e,timber):continue
            volume=(shape^solid(timber['triangles'])).volume()
            if volume>1e-7:timber_hits.append({'masonryId':e['id'],'timberId':timber['id'],'overlapCm3':round(volume*1e6,2)})
    return {'continuations':records,'timberIntersections':timber_hits,'basis':rule['basis']}


def audit_floor_masonry_bearings(elements):
    """Check actual base contact, separately from timber projected beneath walls.

    This limited audit covers horizontal masonry bases at the ground and first
    floor bands. Neither geometric contact nor a concrete envelope proves a
    load path, capacity, foundation or connection design.
    """
    cache={};sections={};rows=[];unresolved=[];timber_hits=[]
    def shape(e):
        if e['id'] not in cache:cache[e['id']]=solid(e['triangles'])
        return cache[e['id']]
    def slice_at(e,z):
        key=(e['id'],round(z,6))
        if key not in sections:sections[key]=shape(e).slice(z)
        return sections[key]
    supports=[e for e in elements if e['category'] in ('masonry','rc','beams','lintels') and e['region']=='house']
    timbers=[e for e in elements if e['category'] in ('joists','trimmers') and e.get('material')!='steel' and e['level'] in (0,1)]
    for wall in elements:
        if wall['category']!='masonry' or wall['region']!='house' or wall['scope']=='garage-rebuild':continue
        z=wall['bounds'][0][2]
        if min(abs(z-h) for h in (0,2.6,2.8))>.00001 and not wall.get('slabBearingMasonry'):continue
        base=slice_at(wall,z+.00001);contacts=[];supported=mf.CrossSection()
        lo,hi=wall['bounds']
        for member in supports:
            a,b=member['bounds']
            if member['id']==wall['id'] or a[2]>=z-.00001 or b[2]<z-.000001:continue
            if min(hi[0],b[0])<=max(lo[0],a[0]) or min(hi[1],b[1])<=max(lo[1],a[1]):continue
            contact=base^slice_at(member,z-.00001)
            if contact.area()<1e-7:continue
            supported=supported+contact;contacts.append({'memberId':member['id'],'contactAreaM2':round(contact.area(),6)})
        missing=base-supported
        projected=[]
        for timber in timbers:
            a,b=timber['bounds']
            if not z-.4<b[2]<=z+.00001:continue
            if min(hi[0],b[0])<=max(lo[0],a[0]) or min(hi[1],b[1])<=max(lo[1],a[1]):continue
            # A floor header below a wall is not accepted as its support.
            overlap=base^shape(timber).project()
            if overlap.area()>1e-6:projected.append({'memberId':timber['id'],'projectedAreaM2':round(overlap.area(),6)})
        row={'memberId':wall['id'],'baseZ':z,'baseAreaM2':round(base.area(),6),'contactAreaM2':round(supported.area(),6),
             'unmatchedAreaM2':round(missing.area(),6),'contacts':contacts,'timberBelow':projected,'capacityVerified':False}
        wall['masonryBearingAudit']=row;rows.append(row)
        if missing.area()>1e-5:
            unresolved.append(wall['id']);wall['issueIds'].append('GROUND-WALL-BEARING')
        if projected:timber_hits.append(row)
    # Concrete/joist checks are intentionally broader than the old steel-only
    # audit: no wall envelope may quietly swallow its adjacent floor timber.
    clashes=[]
    for wall in [e for e in supports if e.get('concreteWallCoordination')]:
        for timber in timbers:
            if timber['level']!=0 or not bounds_overlap(wall,timber):continue
            volume=(shape(wall)^shape(timber)).volume()
            if volume>1e-7:clashes.append({'concreteId':wall['id'],'timberId':timber['id'],'overlapCm3':round(volume*1e6,2)})
    return {'leaves':rows,'unresolvedIds':unresolved,'timberBelow':timber_hits,'concreteTimberIntersections':clashes,
            'basis':'Geometric contact at horizontal ground/first-floor masonry bases. Unmatched area is not a verified bearing. Timber projected below masonry is never accepted as its support. Retained walls, sloping bases, hidden work, capacities and downstream foundations require separate verification.'}


def intersections(elements):
    """Actual solid overlaps with steel, plus masonry/masonry corner overlaps.

    Geometry only; intended bearing contacts have zero volume. Existing house,
    services, fixings, architecture finishes and unmodelled work are not audited.
    """
    relevant=[e for e in elements if e.get('triangles') and e['category'] not in ('layers','connections','details')]
    rects=[box(e['bounds'][0][0],e['bounds'][0][1],e['bounds'][1][0],e['bounds'][1][1]) for e in relevant]
    tree=STRtree(rects);cache={};hits=[];invalid=[]
    def shape(e):
        if e['id'] not in cache:
            try:cache[e['id']]=solid(e['triangles'])
            except ValueError:cache[e['id']]=None;invalid.append(e['id'])
        return cache[e['id']]
    for i,a in enumerate(relevant):
        for j in tree.query(rects[i]):
            if j<=i:continue
            b=relevant[j]
            if not ('steelProfile' in a or 'steelProfile' in b or a['category']==b['category']=='masonry'):continue
            if min(a['bounds'][1][2],b['bounds'][1][2])-max(a['bounds'][0][2],b['bounds'][0][2])<.0001:continue
            aa,bb=shape(a),shape(b)
            if aa is None or bb is None:continue
            volume=(aa^bb).volume()
            if volume>1e-7:
                hits.append({'a':a['id'],'b':b['id'],'categories':[a['category'],b['category']],
                             'overlapCm3':round(volume*1e6,2),'conditions':sorted({e['condition'] for e in (a,b) if e.get('condition')}),
                             'scopeOptions':sorted({e['scope'] for e in (a,b) if e.get('scope')=='garage-rebuild'})})
    return {'method':'Closed mesh solid intersection; >0.1 cm³ recorded, contact alone excluded.',
            'scope':'All modelled steel against primary member/wall solids and masonry against masonry, across enabled option combinations. Excludes hangers/details, finishes, MEP and unknown retained structure.',
            'intersections':sorted(hits,key=lambda r:-r['overlapCm3']),'invalidSolids':invalid,
            'counts':dict(collections.Counter(' / '.join(sorted(h['categories'])) for h in hits))}


def connection_fit(elements):
    """Check each authored joist/hanger/receiver/infill assembly, not capacity."""
    by={e['id']:e for e in elements};cache={};hits=[];seat_errors=[];checked=0;count=0
    def shape(e):
        if e['id'] not in cache:cache[e['id']]=solid(e['triangles'])
        return cache[e['id']]
    for h in elements:
        if h['category']!='connections' or h.get('connectionType')=='bearing-plate':continue
        count+=1;j=by[h['parentId']];r=by[h['receiverId']]
        pairs=[(j,r),(h,j),(h,r)]
        pack=h['connectionDetail'].get('infillMemberId')
        if pack:pairs.extend((by[pack],e) for e in (r,h,j))
        for a,b in pairs:
            checked+=1;v=(shape(a)^shape(b)).volume()
            if v>1e-7:hits.append({'a':a['id'],'b':b['id'],'overlapCm3':round(v*1e6,3)})
        dz=h['bounds'][0][2]+h['connectionDetail']['plateMm']/1000-j['bounds'][0][2]
        if abs(dz)>.00001:seat_errors.append({'hangerId':h['id'],'joistId':j['id'],'verticalErrorMm':round(dz*1000,3)})
    return {'assemblies':count,'solidPairsChecked':checked,'intersections':hits,'seatLevelErrors':seat_errors,
            'scope':'Each joist against its linked receiver, hanger against that joist/receiver, and its infill block against those three members. Seat top checked against joist underside. Other nearby members and product/fastener capacities are not covered.'}


def coordinate_partition_heads(elements,spec):
    """Lower complete non-bearing panel heads beneath parallel downstand steel.

    Only wholly covered horizontal heads are coordinated. Crossings, bearing
    frames and unresolved roles remain explicit clashes, rather than notching
    the structural steel or leaving shortened studs without a head plate.
    """
    groups=collections.defaultdict(list);changes=[]
    for e in elements:
        if e['category']=='partitions' and len(e['sourceIds'])==1:groups[e['sourceIds'][0]].append(e)
    steels=[e for e in elements if e.get('steelProfile')]
    gap=spec['partitionSteelClearanceMm']/1000
    for source,group in groups.items():
        highest=max(e['bounds'][1][2] for e in group)
        heads=[e for e in group if 'panel plate' in e['name'] and abs(e['axis'][0][2]-e['axis'][1][2])<1e-6 and abs(e['bounds'][1][2]-highest)<.001]
        for plate in heads:
            pa,pb=np.array(plate['axis'][0]),np.array(plate['axis'][1]);pd=pb-pa;pd/=np.linalg.norm(pd)
            for beam in steels:
                if beam.get('condition') and beam.get('condition')!=plate.get('condition'):continue
                ba,bb=np.array(beam['axis'][0]),np.array(beam['axis'][1]);bd=bb-ba;bd/=np.linalg.norm(bd)
                if abs(np.dot(pd,bd))<.999 or abs(bd[2])>1e-6:continue
                if not bounds_overlap(beam,plate) or (solid(beam['triangles'])^solid(plate['triangles'])).volume()<1e-7:continue
                if not box(*beam['bounds'][0][:2],*beam['bounds'][1][:2]).buffer(gap,join_style=2).covers(box(*plate['bounds'][0][:2],*plate['bounds'][1][:2])):continue
                old_top=plate['bounds'][1][2];new_top=beam['bounds'][0][2]-gap;drop=old_top-new_top
                if not .001<drop<.5:continue
                studs=[e for e in group if e['id'].startswith('M-S-') and abs(e['axis'][1][2]-plate['bounds'][0][2])<.001]
                if not studs or any(e['axis'][1][2]-drop-e['axis'][0][2]<.045 for e in studs):continue
                record={'sourceId':source,'headId':plate['id'],'beamId':beam['id'],'studIds':[e['id'] for e in studs],
                        'originalHeadTopM':old_top,'currentHeadTopM':new_top,'dropMm':round(drop*1000,2),
                        'nominalSteelClearanceMm':gap*1000,'fabricationReady':False,
                        'basis':'Complete non-load-bearing panel head moved below the parallel downstand beam; studs shorten to the retained head plate. Combined movement/fire-lining space is provisional, not a rated system or an approved deflection allowance.'}
                replace_geometry(plate,solid(plate['triangles']).translate([0,0,-drop]))
                for pt in plate['axis']:pt[2]-=drop
                for stud in studs:
                    top=stud['axis'][1][2]-drop
                    shape=solid(stud['triangles']).trim_by_plane([0,0,-1],-top)
                    replace_geometry(stud,shape);stud['axis'][1][2]=top
                    stud['measurements']['lengthM']=round(math.dist(*stud['axis']),6);stud['cost']['quantity']=round(shape.volume(),6)
                for e in [plate,*studs]:
                    e['partitionHeadCoordination']=record;e.setdefault('issueIds',[]).append('PARTITION-HEADS')
                changes.append(record);break
    return changes
