// Run with: node astronomi/tests/controls.cjs (no packages required).
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const box={window:{}};vm.createContext(box);
for(const file of ['sahne.js','catalog.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),box);
const Scene=box.window.AstroScene;
function scene(kind){const s=Object.create(Scene.prototype);Object.assign(s,{object:{kind},w:640,h:495,zoom:1,panX:0,panY:0});s.resetOrientation();return s;}
let cases=0;
// Verify actual projected near/far disk landmarks, including upside-down views.
for(const kind of ['galaxy','andromeda'])for(const flip of [0,2.2])for(const az of [.58,3.72])for(const [dx,dy] of [[3,0],[-3,0],[0,3],[0,-3]]){
 const s=scene(kind);if(flip)s.rotateAxis([1,0,0],flip);
 const r=Math.min(s.w*.28,s.h*.27)*.83*1.85*.52,p=[Math.cos(az)*r,0,Math.sin(az)*r];
 const project=()=>{const m=s.orientation;return [m[0]*p[0]+m[2]*p[2],m[3]*p[0]+m[5]*p[2]];};
 const before=project();s.drag={localX:s.w*.5+before[0],localY:s.h*.49+before[1]};
 s.drag.direction=s.dragDirection(s.drag.localX,s.drag.localY);s.moveView(dx,dy);const after=project();
 if(dx)assert((after[0]-before[0])*dx>0,`${kind}: horizontal landmark must follow drag`);
 if(dy)assert((after[1]-before[1])*dy>0,`${kind}: vertical landmark must follow drag`);
 // A long gesture crossing centre and edge must retain its original convention.
 const direction=s.drag.direction;
 for(let i=0;i<50;i++){s.drag.localX+=dx*10;s.drag.localY+=dy*10;s.moveView(dx,dy);assert.equal(s.drag.direction,direction);}
 cases++;
}
for(const kind of ['blackhole','neutron','whitedwarf','earth','io','reddwarf','sunlike','nebula','bennu','comet']){
 const s=scene(kind),before=[...s.orientation];s.moveView(35,-24);
 assert.notDeepEqual([...s.orientation],before,`${kind} must rotate`);assert.equal(s.panX,0);assert.equal(s.panY,0);
 for(let i=0;i<300;i++)s.moveView(i%2?5:-3,i%3?2:-4);
 for(let row=0;row<3;row++)assert(Math.abs(Math.hypot(...s.orientation.slice(row*3,row*3+3))-1)<1e-10);
}
const catalogue=box.window.AstroCatalog;assert.equal(new Set(catalogue.map(o=>o.id)).size,catalogue.length);
console.log(`PASS: ${cases} disk-direction cases and long gestures, ten rotation kinds, catalogue integrity.`);
