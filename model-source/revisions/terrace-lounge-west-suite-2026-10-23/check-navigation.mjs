import fs from 'node:fs';import {Navigation} from '../../walkthrough/src/navigation.js';
const variant=process.argv[2]??'compact',n=JSON.parse(fs.readFileSync(new URL(`../../outputs/output-terrace-lounge-west-suite-${variant}/navigation.json`,import.meta.url))),nav=new Navigation(n);nav.radius=.30;const fails=[];
const routes={
 hall:[[6.65,1.8],[6.65,3.98],[4.10,3.98],[4.43,4.55],[4.43,5.85],[3.99,6.98]],
 originalBedroom:[[4.10,3.98],[4.05,2.45],[2.98,2.45],[2.98,1.6]],
 originalEnsuite:[[2.98,2.45],[2.95,3.65],[2.55,3.65],[2.55,4.60]],
 originalShower:[[2.55,3.65],[1.01,3.65],[1.01,4.65]],
 westBedroom:[[3.99,6.98],[3.99,7.03],[.62,7.03],[.62,6.45],[-1.3,6.45],[-1.45,4.4],[-1.45,3.2],[-1.45,1.75],[-3.65,1.75]],
 westShower:[[-3.65,1.75],[-3.85,1.75],[-3.85,2.13],[-4.32,2.13],[-4.45,2.95]],
 westReading:[[-1.3,6.45],[-2.7,6.6],[-3.5,6.6]],
};
if(variant==='compact'){routes.terrace=[[3.99,6.98],[3.85,8.12],[3.0,8.25],[3.0,9.30]];routes.westTerrace=[[-1.3,6.45],[-1.2,7.1],[-2.0,8.2],[-2.0,9.3]];}
function path(name,pts){let current=2.8;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],len=Math.hypot(a[0]-b[0],a[1]-b[1]);for(let d=0;d<=len;d+=.025){const x=a[0]+(b[0]-a[0])*d/len,y=a[1]+(b[1]-a[1])*d/len,z=nav.support(x,y,current);if(z===null||nav.blocked(x,y,z)){fails.push({name,x,y,z,blockers:[...nav.segments,...n.obstacles].filter(o=>{const temp=Object.create(nav);temp.segments=nav.segments.includes(o)?[o]:[];temp.data={...n,obstacles:n.obstacles.includes(o)?[o]:[]};return temp.blocked(x,y,z??current)}).map(o=>o.name)});}if(z!==null)current=z}}}
for(const [name,pts]of Object.entries(routes))path(name,pts);
const result={variant,passed:!fails.length,routes,failures:fails};fs.writeFileSync(new URL(`../../walkthrough/test-results/terrace-lounge-west-suite-2026-10-23/navigation-${variant}.json`,import.meta.url),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,routes:undefined,failures:fails.slice(0,12),failureCount:fails.length},null,2));if(fails.length)process.exitCode=1;
