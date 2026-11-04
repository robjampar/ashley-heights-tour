import test from 'node:test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Raycaster, Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';

for (const variant of ['compact', 'planning']) {
  const nav=JSON.parse(fs.readFileSync(new URL(`../public/proposal-${variant}-navigation.json`,import.meta.url)));
  let meshes;
  const load = () => {
    if (meshes) return meshes;
    meshes = [];
    inspectGlb(new URL(`../public/proposal-${variant}.glb`, import.meta.url), name =>
      name.startsWith('Proposal | Junction finish |') ||
      name.startsWith('Proposal | Joined roof') || name.startsWith('Continuous wing |') ||
      name.startsWith('Proposal | Roof weathering | wing dormer link') ||
      name.startsWith('Proposal | Level loft |') ||
      ['Proposal | Original loft front knee wall 2', 'Proposal | Courtyard ground return',
       'Proposal | North ground facade east pier 0', 'Formal 01 | ivory ceiling',
       'Proposal | Entrance first floor continuation'].includes(name)
    ).traverse(o => { if (o.isMesh) meshes.push(o); });
    return meshes;
  };
  const ray = (p, d, far = 3) => new Raycaster(
    new Vector3(p[0], p[2], -p[1]),
    new Vector3(d[0], d[2], -d[1]), 0, far
  ).intersectObjects(load(), false);
  const ownersAtFront = hits => new Set(hits.filter(h =>
    Math.abs(h.distance - hits[0].distance) < .0005).map(h => h.object.name));

  test(`${variant}: the loft eaves pocket has continuous plaster without an overlapping end face`, () => {
    for (const y of [.2, 1, 2.18, 2.19, 2.21, 2.25]) {
      // Under the new low pitch the backing is behind the retained skirting.
      const hits = ray([6.5, y, nav.continuousWingRoof?5.58:5.8], [-1, 0, 0], 1).filter(h=>!nav.continuousWingRoof||!h.object.name.includes('skirting'));
      assert(hits.length, `closed eaves at ${y}`);
      assert(Math.abs(hits[0].point.x - 5.80) < .001);
      assert(hits[0].object.userData.materialName.includes('warm ivory'));
      assert.equal(ownersAtFront(hits).size, 1, `single finished face at ${y}`);
    }
  });

  test(`${variant}: rooflights are clear with one plaster face at each reveal`, () => {
    for (const y of [-1.5, 1.35]) {
      const opaque = ray([nav.continuousWingRoof?9.95:8.15, y, 7.605], [0, 0, 1], .5).filter(h =>
        !h.object.userData.materialName.toLowerCase().includes('glazing'));
      assert.equal(opaque.length, 0, `open rooflight at ${y}`);
      for (const z of [7.65, 7.8]) for (const dx of [-1, 1]) {
        const hits = ray([nav.continuousWingRoof?9.95:8.15, y, z], [dx, 0, 0], .5);
        assert(hits.length);
        assert(hits[0].object.name.toLowerCase().includes('reveal'));
        assert.equal(ownersAtFront(hits).size, 1);
      }
    }
  });

  test(`${variant}: courtyard slab and corner have exterior finishes without duplicate faces`, () => {
    const centre = ray([10, -1.5, 2.7], [-1, 0, 0], .5)[0];
    assert(centre.object.userData.materialName.includes('Bronze black frames'));
    for (const y of [-2.8, -.3]) {
      const hits = ray([10, y, 2.7], [-1, 0, 0], .5);
      assert.equal(hits[0].object.userData.materialExtras.appearance_role, 'wall');
      // The coordinated skin sits outside the gallery steel flange, with
      // its existing render material and one outward finished face.
      const finishedFace=nav.structuralOpeningFit?9.8205:9.7;
      assert(Math.abs(hits[0].point.x - finishedFace) < .001);
      assert.equal(ownersAtFront(hits).size, 1);
    }
    const corner = ray([9.75, -2.8, 1.5], [0, -1, 0], .5);
    assert(corner.length);
    assert.equal(ownersAtFront(corner).size, 1, 'no duplicate gym corner face');
    assert(!ray([10, -.25, 2.65], [0, 0, -1], .15).some(h =>
      h.object.name === 'Formal 01 | ivory ceiling'), 'no ceiling sheet outside the wall');
  });
}
