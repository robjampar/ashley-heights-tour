from pathlib import Path
p=Path('walkthrough/tests/modern-loft-stair.test.mjs')
s=p.read_text().replace('Closed ivory riser|Closed stair soffit|spindle|Continuous closed stair string','Closed ivory riser|Closed stair soffit|Continuous closed stair string')
s=s.replace("assert(all.filter(m=>m.userData.level_loft_part==='Clear glass balustrade').length>=10);", "assert(!all.some(m=>/glass|clamp/i.test(m.name)), 'no glass panels or clamps remain');\n  assert(all.filter(m=>m.userData.level_loft_part==='Oak spindle').length>=70);")
s=s.replace("assert.equal(strings.length,4);", "assert.equal(new Set(strings.map(m=>m.name)).size,4);")
s=s.replace("const joinery=all.filter(m=>/oak handrail|oak apron|oak support|Continuous oak cut string/.test(m.name));", "const joinery=all.filter(m=>/oak handrail|oak apron|Oak spindle|Oak newel/.test(m.name));")
a=s.index("for(const variant of ['compact','planning'])test(variant+': oak landing rails")
b=s.index("for(const variant of ['compact','planning'])test(variant+': old junction heads",a)
s=s[:a]+'''for(const variant of ['compact','planning'])test(variant+': rounded oak rails match the lower stair and join the gallery guard',()=>{
 const all=[];
 inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>/Continuous outer oak handrail|returned landing rounded oak/.test(n))
  .traverse(o=>{if(o.isMesh)all.push(o)});
 assert.equal(all.length,2);
 for(const o of all){
  assert(o.userData.materialName.includes('Landings natural oak'));
  assert.equal(o.userData.handrail_diameter_m,.068);
 }
 // Both sides of the actual butt joint remain oak at a consistent rail height.
 for(const y of [-1.65,-1.66,-1.80,-2.5,-3.1]){
  const hits=new Raycaster(new Vector3(8.52,6.8,-y),new Vector3(0,-1,0),0,.3).intersectObjects(all,false);
  assert(hits.length>0,`gap at returned guard y=${y}`);
  assert(Math.abs(hits[0].point.y-6.634)<.001);
 }
 const returned=[];
 inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>/returned landing/.test(n)).traverse(o=>{if(o.isMesh)returned.push(o)});
 assert(!returned.some(m=>/glass|shoe/.test(m.name)));
 assert(returned.filter(m=>m.userData.level_loft_part==='Oak spindle').length>=10);
});
''' + s[b:]
p.write_text(s)
