import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3, Raycaster, Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';

const nav = JSON.parse(readFileSync(process.env.REAR_INSET_NAV ??
  new URL('../public/proposal-compact-navigation.json', import.meta.url)));
let meshes;
function load() {
  if (meshes) return meshes;
  meshes = [];
  inspectGlb(process.env.REAR_INSET_MODEL ??
    new URL('../public/proposal-compact.glb', import.meta.url), name =>
    name.startsWith('Proposal | Garden ') || name.startsWith('Proposal | Rear inset |') ||
    name.startsWith('Proposal | Terrace ') || name === 'Proposal | Rear flat roof' ||
    name.startsWith('Proposal | Quiet oak | Proposal | Garden room floor') ||
    name.startsWith('Kitchen rear |') || name.startsWith('Proposal revision | Kitchen rear |')
  ).traverse(o => {if (o.isMesh) meshes.push(o);});
  return meshes;
}
const ray = (p, d, far = 2) => new Raycaster(
  new Vector3(p[0], p[2], -p[1]), new Vector3(d[0], d[2], -d[1]), 0, far
).intersectObjects(load(), false);
const mesh = name => {const o = load().find(o => o.name === name); assert(o, name); return o;};
const near = (a, b) => assert(Math.abs(a-b) < .0001, `${a} != ${b}`);

test('rear garden facade and door hinges move inward 500 mm without changing leaf sizes', () => {
  for (const side of ['left', 'right']) {
    const door = nav.interactiveDoors.find(d => d.id === `Proposal | Garden east glazing entry ${side}`);
    near(door.hinge[0], 4.0); near(door.openingCenter[0], 4.0);
    near(door.apertureWidth, .775);
    const bb = new Box3().setFromObject(mesh(door.id+' glass'));
    near((bb.min.x+bb.max.x)/2, 4.0);
    near(bb.max.z-bb.min.z, .775);
    assert(door.members.every(name => load().some(o => o.name === name)), 'complete moving assembly');
  }
  const floor = new Box3().setFromObject(mesh('Proposal | Quiet oak | Proposal | Garden room floor'));
  near(floor.max.x, 4.0);
  const movement = new Navigation(nav); movement.radius = .30;
  for (const p of [[3.65, 10.45, 0], [4.45, 10.45, 0], [2.8, 8.82, 0]]) {
    assert(!movement.blocked(...p), `clear approach ${p}`);
  }
});

test('former kitchen window has a sealed brick infill and retains its broad internal connection', () => {
  const wall = nav.walls.find(w => w.name === 'Kitchen rear'), [centre, width] = wall.openings[0];
  near(wall.a[0]+centre+width/2, 3.878);
  assert(width > 2.89 && width < 2.90);
  near(nav.rearGardenRoomInset.internalReturnM,.1);
  for(const z of [.2,1.2,2.09]){
    const hit=ray([3.92,9.1,z],[0,-1,0],.5)[0];assert(hit);
    assert(hit.object.name.includes('masonry infill'));
    assert(hit.object.userData.materialName.includes('Warm plaster'),'indoor nib has a plaster face');
    near(-hit.point.z,8.935);
  }
  for (const x of [4.13, 4.23, 4.33]) for (const z of [.2, 1.2, 2.09]) {
    const hit = ray([x, 9.1, z], [0, -1, 0], .5)[0]; assert(hit);
    assert(hit.object.name.includes('masonry infill'));
    assert(hit.object.userData.materialName.includes('Red brown brick'));
    near(-hit.point.z, 8.935);
  }
  assert.equal(ray([3.8, 9.1, 1.4], [0, -1, 0], .5).length, 0, 'open kitchen connection');
  const movement = new Navigation(nav);
  assert(movement.blocked(4.23, 8.82, 0), 'infill participates in wall collision');
  const corner = ray([4.5, 9.3, 1.5], [-1, 0, 0], .5)[0]; assert(corner);
  near(corner.point.x, 4.012);
});

test('smaller garden roof and terrace remain coordinated and all three rooflights stay clear', () => {
  for (const name of ['Proposal | Rear flat roof', 'Proposal | Terrace continuous stone finish'])
    near(new Box3().setFromObject(mesh(name)).max.x, 4.18);
  near(new Box3().setFromObject(mesh('Proposal | Garden living plaster ceiling')).max.x, 3.975);
  near(nav.proposalRoofTerrace.roof_bounds_m[2], 4.18);
  for (const x of [-.5, 1.2, 2.9]) {
    const hits = ray([x, 10.6, 2.4], [0, 0, 1], .5);
    assert(hits.length);
    assert(hits.every(h => h.object.name.includes('walk-on glass')), `clear rooflight ${x}`);
  }
  for (const m of load().filter(o => o.name.startsWith('Proposal | Terrace east guard'))) {
    const bb = new Box3().setFromObject(m);
    near((bb.min.x+bb.max.x)/2, 4.03);
  }
  assert(!load().some(o => o.name === 'Proposal | Garden north glazing fixed right mullion.003'));
  assert(!load().some(o => o.name === 'Proposal | Terrace north guard post.006'));
  const movement = new Navigation(nav); movement.radius = .30;
  assert(!movement.blocked(2.25, 13.3, 2.8), 'terrace approach inside the chamfer remains clear');
});
