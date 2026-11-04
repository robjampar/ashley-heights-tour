import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Navigation} from '../src/navigation.js';
const read=name=>JSON.parse(readFileSync(new URL('../public/'+name,import.meta.url)));
for(const variant of ['compact','planning'])test(variant+': bar lounge additions block furniture and preserve circulation and cabinet access',()=>{
 const data=read('proposal-'+variant+'-navigation.json');
 const detail=read('visual-quality/'+variant+'-furnishings.json').barDetails;
 assert.equal(detail.addedClubChairs,2);assert.equal(detail.addedDiningChairs,0);assert(detail.openRoom);
 assert(detail.retainedBarIsland);assert.equal(detail.retainedHighStools,3);
 assert.equal(detail.barHeightMetres,1.105);assert.equal(detail.cabinetAccessMetres,1.30);
 assert.equal(detail.selectedConcept,'04-parisian-art-deco');
 const relocated=new Set(detail.relocatedObjects.map(o=>o.original));
 const superseded=new Set(detail.supersededBySourceRevision??[]);
 const sourceRemovals=new Set([...(data.basementRoofCorrections?.removedObjects??[]),...(data.sw02Integration?.removed??[]),...(data.continuousJoistIntegration?.removed??[])]);
 assert([...superseded].every(n=>sourceRemovals.has(n)),'structural retirements match the accepted basement revision');
 assert([...superseded].every(n=>!detail.addedObjects.includes(n)),'retired floor/panel pieces are absent from the current overlay inventory');
 assert(detail.removedObjects.every(n=>relocated.has(n)||superseded.has(n)||/bar pendant|bar small appliance|bar appliance|stone coaster|display wine|upper display|display stem glass|serving tray|ready stem glass|skirting/.test(n)),'only superseded or explicitly relocated fittings are retired');
 assert.equal(detail.addedHighTables,1);assert.equal(detail.addedHighStools,2);
 assert.equal(detail.darts.face[1],-8.65);assert(detail.darts.sharedWithPool);
 assert(detail.relocatedObjects.some(o=>o.original==='Bar 01 | dartboard base'));
 const extra=detail.navigationExtras.obstacles;assert.equal(extra.length,8);
 const removed=new Set([...detail.navigationExtras.removeObstacles,...extra.map(o=>o.name)]);data.obstacles=data.obstacles.filter(o=>!removed.has(o.name));data.obstacles.push(...extra);
 const nav=new Navigation(data);
 for(const name of ['Bar 01 | social counter',...Array.from({length:3},(_,i)=>'Bar 01 | stool '+(i+1))]){
  const o=data.obstacles.find(o=>o.name===name);assert(o,'retained island/stool collision '+name);
  const [a,b,c,d]=o.box;assert.equal(nav.canStand({x:(a+c)/2,y:(b+d)/2,z:-2.8}),false,name);
 }
 for(const o of extra){const [a,b,c,d]=o.box;assert.equal(nav.canStand({x:(a+c)/2,y:(b+d)/2,z:-2.8}),false,o.name);}
 for(const [x,y]of [[9.9,-11.1],[9.9,-12.2],[9.9,-13.3],[9.9,-14.7],[10.3,-15.10],[11.1,-15.10],[12,-15.10],[12.8,-15.10],[13.25,-13.5]])assert(nav.canStand({x,y,z:-2.8}),'clear route '+[x,y]);
 for(const [x,y]of [[11.8,-11.0],[11.8,-10.0],[11.0,-8.65]])assert(nav.canStand({x,y,z:-2.8}),'clear salon approach and oche '+[x,y]);
 assert(detail.addedObjects.some(n=>n.includes('back bar mirror')));
 assert(detail.addedObjects.some(n=>n.includes('island selected wine')));
 assert(detail.addedObjects.some(n=>n.includes('counter cream flute')));
 assert(detail.addedObjects.some(n=>n.includes('reeded glass shade')));
 assert(detail.addedObjects.some(n=>n.includes('picture moulding')));
 assert(!detail.addedObjects.some(n=>/social table|social chair|table pendant|bar wall panel/.test(n)),'no round dining set or enclosing wall panels');
 const glb=readFileSync(new URL('../public/visual-quality/'+variant+'-furnishings.glb',import.meta.url));
 const model=JSON.parse(glb.subarray(20,20+glb.readUInt32LE(12)).toString());
 const glass=model.materials.filter(m=>/Bar Art Deco (reeded|crystal) glass/.test(m.name));
 assert.equal(glass.length,2);
 for(const m of glass){assert.equal(m.alphaMode,'BLEND');assert(m.pbrMetallicRoughness.baseColorFactor[3]<.5,'native exported glass alpha');}
});
