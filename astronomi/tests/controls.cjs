// Run with: node astronomi/tests/controls.cjs (no packages required).
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const box={window:{}};
vm.createContext(box);
for(const file of ['sahne.js','catalog.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),box);
const Scene=box.window.AstroScene;
function scene(kind){
  const s=Object.create(Scene.prototype);
  Object.assign(s,{object:{kind},w:640,h:495,zoom:1,panX:0,panY:0});
  s.resetOrientation();return s;
}
// A picked landmark must follow the pointer on both halves of a disk,
// including after the disk has been turned over. Test actual projected position.
let cases=0;
for(const kind of ['galaxy','andromeda'])for(const flip of [0,2.2])
for(const az of [.58,3.72])for(const [dx,dy] of [[3,0],[-3,0],[0,3],[0,-3]]){
  const s=scene(kind);if(flip)s.rotateAxis([1,0,0],flip);
  const r=Math.min(s.w*.28,s.h*.27)*.83*1.85*.52,p=[Math.cos(az)*r,0,Math.sin(az)*r];
  const project=()=>{const m=s.orientation;return [m[0]*p[0]+m[2]*p[2],m[3]*p[0]+m[5]*p[2]];};
  const before=project();s.drag={localX:s.w*.5+before[0],localY:s.h*.49+before[1]};
  s.moveView(dx,dy);const after=project();
  assert(Math.abs(after[0]-before[0]-dx)<.001,`${kind}: horizontal grab direction`);
  assert(Math.abs(after[1]-before[1]-dy)<.001,`${kind}: vertical grab direction`);
  cases++;
}
for(const kind of ['blackhole','neutron','whitedwarf','earth','io','reddwarf','sunlike']){
  const s=scene(kind),before=[...s.orientation];s.moveView(35,-24);
  assert.notDeepEqual([...s.orientation],before,`${kind} must rotate`);
  assert.equal(s.panX,0);assert.equal(s.panY,0);
  // Repeated rotations must preserve lengths (no scaling or shear).
  for(let i=0;i<300;i++)s.moveView(i%2?5:-3,i%3?2:-4);
  for(let row=0;row<3;row++)assert(Math.abs(Math.hypot(...s.orientation.slice(row*3,row*3+3))-1)<1e-10);
}
const catalogue=box.window.AstroCatalog;
assert.equal(new Set(catalogue.map(o=>o.id)).size,catalogue.length);
for(const id of ['io','proxima-centauri','alpha-centauri-a']){
  const o=catalogue.find(o=>o.id===id);assert(o);assert(o.source.startsWith('https://'));assert(o.modelNote.length>40);
}
console.log(`PASS: ${cases} galaxy landmark cases, seven rotation kinds and catalogue integrity.`);
