/* Bağımsız Canvas 2D çizimleri. Ağ isteği, WebGL ve harici bağımlılık yok.
   Fizik simülatörü değil: görünüm ve hareketler öğretici temsillerdir. */
(() => {
  'use strict';
  const TAU = Math.PI * 2;
  const TW = 2048, TH = 1024, SPHERE = 640;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const random = seed => () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  const textures = new Map();
  const noise3=(x,y,z)=>{
    const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z),smooth=t=>t*t*(3-2*t);
    const fx=smooth(x-ix),fy=smooth(y-iy),fz=smooth(z-iz);
    let total=0;
    for(let a=0;a<2;a++)for(let b=0;b<2;b++)for(let c=0;c<2;c++){
      let h=Math.imul(ix+a,374761393)^Math.imul(iy+b,668265263)^Math.imul(iz+c,1274126177);
      h=Math.imul(h^(h>>>13),1274126177);
      total+=((h^(h>>>16))>>>0)/4294967296*(a?fx:1-fx)*(b?fy:1-fy)*(c?fz:1-fz);
    }
    return total;
  };

  function texture(kind) {
    if (textures.has(kind)) return textures.get(kind);
    const off = document.createElement('canvas');
    off.width = TW; off.height = TH;
    const ctx = off.getContext('2d');
    const data = ctx.createImageData(TW, TH);
    const rand = random(827);
    for (let y = 0; y < TH; y++) {
      for (let x = 0; x < TW; x++) {
        const u = x / TW, v = y / TH;
        const grain = (rand() - .5) * 14;
        const wave = Math.sin(u * TAU * 5 + v * 11) * .007 + Math.sin(u * TAU * 11 - v * 15) * .003;
        const band = Math.sin((v + wave) * 67) * .6 + Math.sin((v + wave) * 161) * .25 + Math.sin(v * 307) * .15;
        let rgb;
        if (kind === 'saturn') rgb = [198 + band * 24 + grain, 178 + band * 22 + grain, 139 + band * 20 + grain];
        else if (kind === 'jupiter') {
          rgb = [194 + band * 38 + grain, 153 + band * 48 + grain, 117 + band * 46 + grain];
          const spot = ((u - .55) / .065) ** 2 + ((v - .62) / .047) ** 2;
          if (spot < 1) { const swirl = Math.sin(spot * 30) * 12; rgb = [174 + swirl, 91 + swirl, 57 + swirl]; }
        } else if (kind === 'uranus') rgb = [128+band*4,190+band*5,198+band*5];
        else if (kind === 'neptune') rgb = [55+band*10,104+band*15,183+band*19];
        else if (kind === 'venus') rgb = [200+band*9+grain,158+band*8+grain,85+grain];
        else if (kind === 'titan') {
          const latitude=(v-.5)*Math.PI,hemisphere=Math.sin(latitude)*7;
          const polarHaze=Math.exp(-(((latitude+.95)/.27)**2))*5;
          const haze=Math.sin(u*TAU*2)*Math.cos(latitude)*.8;
          rgb=[205+hemisphere+haze-polarHaze,146+hemisphere+haze-polarHaze*.5,77+hemisphere];
        }
        else if (kind === 'redgiant') {
          const lat=(v-.5)*Math.PI,px=Math.cos(u*TAU)*Math.cos(lat),py=Math.sin(lat),pz=Math.sin(u*TAU)*Math.cos(lat);
          const cell=noise3(px*5+20,py*5+20,pz*5+20)*.58+noise3(px*16+45,py*16+45,pz*16+45)*.3+noise3(px*42+9,py*42+9,pz*42+9)*.12;
          rgb=[183+cell*72,66+cell*115,29+cell*58];
        }
        else if (kind === 'reddwarf' || kind === 'sunlike') {
          const lat=(v-.5)*Math.PI,px=Math.cos(u*TAU)*Math.cos(lat),py=Math.sin(lat),pz=Math.sin(u*TAU)*Math.cos(lat);
          const granule=noise3(px*60+70,py*60+70,pz*60+70)-.5;
          rgb=kind==='reddwarf'?[237+granule*23,158+granule*21,106+granule*18]:[249+granule*12,239+granule*15,218+granule*18];
        }
        else if (kind === 'io') rgb=[202+grain,179+grain,104+grain];
        else if (kind === 'comet') {
          const latitude=(v-.5)*Math.PI,px=Math.cos(u*TAU)*Math.cos(latitude),py=Math.sin(latitude),pz=Math.sin(u*TAU)*Math.cos(latitude);
          const patches=noise3(px*18+40,py*18+40,pz*18+40);
          const dust=122+patches*24+grain*.65;rgb=[dust,dust*.97,dust*.93];
        }
        else if (kind === 'whitedwarf') rgb = [226+grain*.08,238+grain*.08,251+grain*.08];
        else if (kind === 'europa' || kind === 'enceladus') {
          const crack=Math.abs(Math.sin(u*TAU*7+Math.sin(v*19+Math.cos(u*TAU*3))*3));
          const terrain=Math.sin(u*TAU*17+v*24)*Math.cos(v*39);
          rgb=crack<.024?(kind==='europa'?[137,110,87]:[155,177,192]):[221+terrain*10+grain,217+terrain*9+grain,204+grain];
        }
        else if (kind === 'pluto') {const t=Math.sin(u*17+Math.sin(v*9));rgb=[168+t*37+grain,142+t*38+grain,120+t*37+grain];}
        else if (kind === 'earth') rgb = [34 + grain, 82 + grain, 108 + grain];
        else if (kind === 'mars') {
          const terrain = Math.sin(u * TAU * 3 + Math.sin(v * 18)) * Math.sin(v * 27 + Math.cos(u * TAU * 4));
          rgb = [176 + terrain * 31 + grain, 102 + terrain * 25 + grain, 68 + terrain * 19 + grain];
          if (v < .075 + Math.sin(u * TAU * 5) * .015 || v > .94) rgb = [210 + grain, 201 + grain, 180 + grain];
        } else if (kind === 'sun') {
          const granule = Math.sin(u * TAU * 96 + Math.sin(v * 315)) * Math.cos(v * 300 + Math.sin(u * TAU * 64));
          rgb = [245 + grain, 178 + granule * 33 + grain, 81 + granule * 28 + grain];
        } else rgb = [155 + grain, 158 + grain, 147 + grain];
        const i = (y * TW + x) * 4;
        data.data[i] = rgb[0]; data.data[i + 1] = rgb[1]; data.data[i + 2] = rgb[2]; data.data[i + 3] = 255;
      }
    }
    ctx.putImageData(data, 0, 0);
    ctx.scale(4,4);
    if (kind === 'earth') {
      // Yaklaşık kıta siluetleri; kartta gerçek harita olmadığı açıklanır.
      const lands = [
        [[37,62],[65,33],[97,25],[127,37],[155,39],[182,59],[170,82],[147,88],[137,112],[121,104],[105,94],[88,74],[67,81]],
        [[141,113],[166,109],[187,131],[178,158],[164,177],[154,207],[144,186],[151,157],[136,138]],
        [[236,104],[258,90],[284,100],[298,122],[283,144],[275,170],[260,180],[245,153],[233,132]],
        [[244,86],[236,69],[260,44],[294,35],[321,40],[352,32],[390,42],[430,39],[468,58],[461,86],[435,101],[402,93],[389,110],[370,119],[350,98],[337,127],[321,108],[294,85],[281,97],[265,78]],
        [[414,160],[439,152],[457,164],[465,184],[443,192],[418,184]],
        [[182,26],[207,15],[220,27],[207,48],[192,52]],
        [[0,239],[65,229],[122,236],[170,229],[214,234],[260,228],[310,232],[369,223],[425,234],[475,229],[512,236],[512,256],[0,256]]
      ];
      lands.forEach((points, j) => {
        ctx.beginPath(); points.forEach(([x,y], i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y)); ctx.closePath();
        ctx.fillStyle = j === 6 ? '#D6DDD3' : '#709274'; ctx.fill();
        if (j < 6) {
          ctx.save(); ctx.clip();
          for (let n = 0; n < 120; n++) {
            ctx.fillStyle = n % 2 ? '#C0AA6638' : '#224B4338';
            ctx.beginPath(); ctx.ellipse(rand()*TW,rand()*TH,rand()*20+5,rand()*10+4,0,0,TAU);ctx.fill();
          }
          ctx.restore();
        }
      });
      ctx.strokeStyle = '#E9EFDF8A'; ctx.lineCap = 'round';
      for (let i = 0; i < 48; i++) {
        const x = rand()*TW, y = 15+rand()*225;
        ctx.lineWidth = rand()*3+1; ctx.beginPath();ctx.moveTo(x,y);
        ctx.bezierCurveTo(x+10,y-9,x+24,y+6,x+rand()*44+15,y-7);ctx.stroke();
      }
    }
    if (['moon','mars','ceres','bennu','comet','enceladus'].includes(kind)) {
      if (kind === 'moon') {
        for (let i = 0; i < 12; i++) {
          ctx.fillStyle = '#626F6755';ctx.beginPath();
          ctx.ellipse(rand()*TW,45+rand()*170,rand()*38+10,rand()*20+10,rand()*3,0,TAU);ctx.fill();
        }
      }
      for (let i = 0; i < (kind === 'moon' ? 310 : kind==='enceladus'?45:180); i++) {
        const x = rand()*512, y = 12+rand()*232, r = .4 + rand()**4*6;
        const bowl=ctx.createRadialGradient(x-r*.22,y-r*.18,0,x,y,r);
        bowl.addColorStop(0,'#34394148');bowl.addColorStop(.68,'#35373C24');bowl.addColorStop(.85,'#EEE5D126');bowl.addColorStop(1,'#EEEEEE00');
        ctx.fillStyle=bowl;ctx.beginPath();ctx.ellipse(x,y,r,r*.8,0,0,TAU);ctx.fill();
      }
    }
    const result = ctx.getImageData(0,0,TW,TH).data;
    textures.set(kind, result);
    return result;
  }

  class AstroScene {
    constructor(canvas, onState) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.available = !!this.ctx;
      if (!this.available) return;
      this.onState = onState;
      this.motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.playing = !this.motion.matches;
      this.speed = 1;
      this.zoom = 1; this.phase = -.65;
      this.angle = 0;
      this.view = -.28;
      this.time = 0;
      this.inView = true;
      this.frameId = 0;
      this.lastFrame = null;
      this.drag = null;
      this.surface = document.createElement('canvas');
      this.surface.width = this.surface.height = SPHERE;
      this.surfaceCtx = this.surface.getContext('2d');
      this.sphereData = this.surfaceCtx.createImageData(SPHERE, SPHERE);
      this.samples = [];
      for (let y = 0; y < SPHERE; y++) for (let x = 0; x < SPHERE; x++) {
        const nx = (x+.5)/SPHERE*2-1, ny = (y+.5)/SPHERE*2-1;
        const d = nx*nx+ny*ny;
        if (d > 1) continue;
        const nz = Math.sqrt(1-d);
        this.samples.push({i:(y*SPHERE+x)*4, u:Math.floor((Math.atan2(nx,nz)/TAU+.5)*TW), v:clamp(Math.floor((Math.asin(ny)/Math.PI+.5)*TH),0,TH-1)*TW,
          nx,ny,nz, light:.065 + Math.max(0,-nx*.58-ny*.35+nz*.73)*.935, z:nz});
      }
      const rand = random(42);
      this.stars = Array.from({length:260}, () => ({x:rand(),y:rand(),r:rand()*.95+.18,a:rand()*.62+.18,twinkle:rand()*TAU,color:rand()}));
      this.dust = Array.from({length:4200}, () => ({r:Math.sqrt(rand()),a:rand()*TAU,j:(rand()-.5),s:rand(),arm:Math.floor(rand()*4)}));
      this.clouds = Array.from({length:75}, () => ({x:(rand()-.5)*2,y:(rand()-.5)*1.3,z:(rand()-.5)*.9,r:rand()*.26+.12,a:rand()*TAU}));
      this.frame = this.frame.bind(this);
      this.resize = this.resize.bind(this);
      this.visibility = () => this.sync();
      document.addEventListener('visibilitychange', this.visibility);
      this.motionChange = () => { if (this.motion.matches) this.setPlaying(false); };
      this.motion.addEventListener('change', this.motionChange);
      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(canvas.parentElement);
      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(entries => {this.inView=entries[0].isIntersecting;this.sync();});
        this.intersectionObserver.observe(canvas);
      }
      canvas.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !e.isPrimary) return;
        const rect=canvas.getBoundingClientRect();
        this.drag = {id:e.pointerId,x:e.clientX,y:e.clientY,localX:(e.clientX-rect.left)*this.w/(rect.width||this.w),localY:(e.clientY-rect.top)*this.h/(rect.height||this.h)};
        this.drag.direction=this.dragDirection(this.drag.localX,this.drag.localY);
        this.draw();
        canvas.setPointerCapture(e.pointerId);
      });
      canvas.addEventListener('pointermove', e => {
        if (!this.drag || this.drag.id !== e.pointerId) return;
        const rect=canvas.getBoundingClientRect(),dx=(e.clientX-this.drag.x)*this.w/(rect.width||this.w),dy=(e.clientY-this.drag.y)*this.h/(rect.height||this.h);
        this.moveView(dx,dy);
        this.drag.localX+=dx;this.drag.localY+=dy;
        this.drag.x=e.clientX;this.drag.y=e.clientY;this.draw();
      });
      const release = e => {if(this.drag&&this.drag.id===e.pointerId){this.drag=null;this.draw();}};
      canvas.addEventListener('pointerup',release);
      canvas.addEventListener('pointercancel',release);
      canvas.addEventListener('lostpointercapture',release);
      canvas.addEventListener('wheel', e => {
        if(e.ctrlKey)return; // Preserve browser accessibility zoom.
        e.preventDefault();
        const pixels=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?this.h:1);
        const factor=Math.exp(-clamp(pixels,-300,300)*.0012);
        this.setZoom(this.zoom*factor);
      }, {passive:false});
      canvas.addEventListener('keydown', e => {
        const keys = {ArrowLeft:.16,ArrowRight:-.16,ArrowUp:.08,ArrowDown:-.08};
        if (e.key in keys) {
          e.preventDefault();
          this.moveView(e.key==='ArrowLeft'?-18:e.key==='ArrowRight'?18:0,e.key==='ArrowUp'?-20:e.key==='ArrowDown'?20:0);
          this.draw();
        }
        if (e.code==='Space') {e.preventDefault();this.setPlaying(!this.playing);}
      });
      this.resize();
    }
    dragDirection(x,y) {
      if(!['galaxy','andromeda'].includes(this.object?.kind))return 1;
      const m=this.orientation,px=x-this.w*.5,py=y-this.h*.49;
      if(Math.abs(m[7])<.08)return 1;
      const z=-(m[1]*px+m[4]*py)/m[7];
      const extent=Math.min(this.w*.28,this.h*.27)*this.zoom*.83*1.85;
      return Math.hypot(px,py,z)<extent*1.15&&Math.abs(z)>extent*.03&&z<0?-1:1;
    }
    moveView(dx,dy) {
      // Lock the picked disk side on pointer-down. Never recompute it as the
      // pointer crosses the centre/edge or fall back to the opposite convention.
      const distance=Math.hypot(dx,dy);if(!distance)return;
      const direction=this.drag?.direction||1;
      this.rotateAxis([-dy/distance*direction,dx/distance*direction,0],distance*.006);
    }
    rotateAxis([x,y,z],a){
      const c=Math.cos(a),s=Math.sin(a),t=1-c;
      const r=[t*x*x+c,t*x*y-s*z,t*x*z+s*y,t*x*y+s*z,t*y*y+c,t*y*z-s*x,t*x*z-s*y,t*y*z+s*x,t*z*z+c],m=this.orientation;
      this.orientation=Array.from({length:9},(_,i)=>{const row=Math.floor(i/3),col=i%3;return r[row*3]*m[col]+r[row*3+1]*m[col+3]+r[row*3+2]*m[col+6];});
      this.projectionView=null;
    }
    resetOrientation(){const a=['galaxy','andromeda'].includes(this.object?.kind)?.65:-.28,c=Math.cos(a),s=Math.sin(a);this.orientation=[1,0,0,0,c,-s,0,s,c];this.projectionView=null;}
    setObject(object) {
      this.drag=null;this.panX=0;this.panY=0;
      this.object=object;this.angle=0;this.view=['galaxy','andromeda'].includes(object.kind)?.65:-.28;this.time=0;this.showSun=false;
      this.resetOrientation();
      this.tex=texture(object.kind);
      this.zoom=1;this.phase=-.65;this.projectionView=null;
      this.night=null;this.cloudMap=null;
      const chosen=object;
      window.AstroTextures?.load(object.kind).then(map=>{
        if(this.object!==chosen)return;
        if(map)this.tex=object.kind==='pluto'?this.completePluto(map):map;
        this.draw();
      });
      if(object.kind==='earth') for(const key of ['earth-night','earth-clouds']) {
        window.AstroTextures?.load(key).then(map=>{
          if(this.object!==chosen)return;
          if(key==='earth-night')this.night=map;else this.cloudMap=map;
          this.draw();
        });
      }
      this.draw();this.sync();
    }
    setPlaying(value) {this.playing=!!value;this.onState?.(this.playing);this.sync();}
    completePluto(map) {
      // Preserve observation data; replace only the unobserved black southern mask in a display copy.
      const result=new Uint8ClampedArray(map);
      for(let x=0;x<TW;x++){
        let edge=TH;
        while(edge>TH*.5){const i=((edge-1)*TW+x)*4;if(Math.max(map[i],map[i+1],map[i+2])>=28)break;edge--;}
        if(edge===TH)continue;
        const start=Math.max(0,edge-24),neutral=[155,145,132],border=[0,0,0];
        for(let offset=24;offset<48;offset++){
          const sample=(Math.max(0,edge-offset)*TW+x)*4;
          for(let c=0;c<3;c++)border[c]+=map[sample+c]/24;
        }
        for(let y=start;y<TH;y++){
          const i=(y*TW+x)*4;
          const t=clamp((y-start)/128,0,1),blend=t*t*(3-2*t);
          for(let c=0;c<3;c++)result[i+c]=border[c]*(1-blend)+neutral[c]*blend;
        }
      }
      return result;
    }
    setSpeed(value) {this.speed=clamp(Number(value)||1,.5,2);}
    setZoom(value) {this.zoom=clamp(Number(value)||1,.7,1.5);this.canvas.dispatchEvent(new CustomEvent('astrozoom',{detail:this.zoom}));this.draw();}
    setPhase(value) {this.phase=clamp(Number(value)||0,-2.5,2.5);this.draw();}
    reset() {this.drag=null;this.panX=0;this.panY=0;this.zoom=1;this.phase=-.65;this.angle=0;this.view=['galaxy','andromeda'].includes(this.object?.kind)?.65:-.28;this.time=0;this.resetOrientation();this.draw();}
    resize() {
      const rect=this.canvas.parentElement.getBoundingClientRect();
      this.w=Math.max(1,rect.width);this.h=Math.max(1,rect.height);
      const dpr=Math.min(window.devicePixelRatio||1,1.75);
      this.canvas.width=Math.round(this.w*dpr);this.canvas.height=Math.round(this.h*dpr);
      this.ctx.setTransform(dpr,0,0,dpr,0,0);this.draw();
    }
    sync() {
      const run=this.playing&&!document.hidden&&this.inView&&!!this.object;
      if (run&&!this.frameId) {this.lastFrame=null;this.frameId=requestAnimationFrame(this.frame);}
      if (!run&&this.frameId) {cancelAnimationFrame(this.frameId);this.frameId=0;this.lastFrame=null;}
    }
    frame(now) {
      this.frameId=0;
      if (!this.playing||document.hidden||!this.inView||!this.object) return;
      if (this.lastFrame===null) this.lastFrame=now;
      const elapsed=now-this.lastFrame;
      // 24 fps ve tek etkin sahne; görünmeyen sekme/sahne işlem yapmaz.
      if (elapsed>=1000/24) {
        const dt=Math.min(elapsed/1000,.1)*this.speed;
        this.time+=dt;
        if (!this.drag) this.angle+=dt*.105*(['venus','uranus'].includes(this.object.kind)?-1:1);
        this.lastFrame=now;this.draw();
      }
      this.frameId=requestAnimationFrame(this.frame);
    }
    glow(x,y,r,color,alpha=1) {
      const ctx=this.ctx,g=ctx.createRadialGradient(x,y,0,x,y,r);
      g.addColorStop(0,color);g.addColorStop(1,'transparent');
      ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();
    }
    sphere(r,kind) {
      const output=this.sphereData.data, offset=Math.floor(this.angle/TAU*TW);
      if(this.projectionView!==this.orientation) {
        const m=this.orientation;
        for(const p of this.samples) {
          const x=m[0]*p.nx+m[3]*p.ny+m[6]*p.nz,y=m[1]*p.nx+m[4]*p.ny+m[7]*p.nz,z=m[2]*p.nx+m[5]*p.ny+m[8]*p.nz;
          p.ut=Math.atan2(x,z)/TAU+.5;p.vt=Math.asin(clamp(y,-1,1))/Math.PI+.5;
          p.u=Math.floor(p.ut*TW);
          p.v=clamp(Math.floor((Math.asin(clamp(y,-1,1))/Math.PI+.5)*TH),0,TH-1)*TW;
        }
        this.projectionView=this.orientation;
      }
      const lx=Math.sin(this.phase),lz=Math.cos(this.phase);
      const luminous=['sun','reddwarf','sunlike','redgiant','whitedwarf'].includes(kind);
      const cloudOffset=Math.floor(this.time*1.3);
      const detailed=['moon','io','europa','enceladus','ceres'].includes(kind),mw=this.tex.width||TW,mh=this.tex.height||TH;
      for (const p of this.samples) {
        const u=((p.u+offset)%TW+TW)%TW, source=(p.v+u)*4;
        let s00=0,s10=0,s01=0,s11=0,fx=0,fy=0;
        if(detailed){
          const tx=((p.ut+this.angle/TAU)%1+1)%1*mw,ty=clamp(p.vt*mh,0,mh-1),ix=Math.floor(tx),iy=Math.floor(ty);
          fx=tx-ix;fy=ty-iy;s00=(iy*mw+ix)*4;s10=(iy*mw+(ix+1)%mw)*4;
          s01=(Math.min(iy+1,mh-1)*mw+ix)*4;s11=(Math.min(iy+1,mh-1)*mw+(ix+1)%mw)*4;
        }
        const illumination=p.nx*lx-p.ny*.24+p.nz*lz;
        let light=luminous?.62+p.z*.38:Math.sqrt(.008+Math.max(0,illumination)*.94);
        if(kind==='redgiant')light=(.38+.62*p.nz)*(1+.045*Math.sin(this.time*.35+u/TW*TAU*7)*Math.sin(p.v/TW/TH*Math.PI));
        if(kind==='whitedwarf')light=.43+.57*Math.sqrt(p.nz);
        // Approximate ring shadow on the cloud tops; same light direction as the sphere.
        if(kind==='saturn' && illumination>0) {
          const m=this.orientation,den=m[1]*lx-m[4]*.24+m[7]*lz;
          const t=-(m[1]*p.nx+m[4]*p.ny+m[7]*p.nz)/(Math.abs(den)<1e-6?1e-6:den);
          if(t>0) {
            const x=p.nx+t*lx,y=p.ny-t*.24,z=p.nz+t*lz;
            const rr=Math.sqrt(x*x+y*y+z*z);
            if(rr>1.26&&rr<2.37&&!(rr>1.99&&rr<2.08))light*=.42;
          }
        }
        const cloud=kind==='earth'&&this.cloudMap?this.cloudMap[(p.v+(u+cloudOffset)%TW)*4]/255*.82:0;
        let oceanGlint=0;
        if(kind==='earth'){
          const ocean=this.tex[source+2]>this.tex[source]*1.2&&this.tex[source+2]>this.tex[source+1]*.95;
          const norm=Math.hypot(lx,-.24,lz+1),half=(p.nx*lx-p.ny*.24+p.nz*(lz+1))/norm;
          oceanGlint=ocean?Math.pow(Math.max(0,half),70)*85*(1-cloud)*Math.max(0,illumination):0;
          const shadow=this.cloudMap?this.cloudMap[(p.v+(u+cloudOffset+8)%TW)*4]/255:0;
          light*=1-shadow*.18*(1-cloud);
        }
        for(let c=0;c<3;c++) {
          let sample=this.tex[source+c];
          if(detailed)sample=(this.tex[s00+c]*(1-fx)+this.tex[s10+c]*fx)*(1-fy)+(this.tex[s01+c]*(1-fx)+this.tex[s11+c]*fx)*fy;
          let color=sample*(1-cloud)+cloud*245;
          if(kind==='neptune')color=this.tex[source+1]*.25+[137,185,197][c]*.75+(color-this.tex[source+1])*.12;
          color*=light;
          if(kind==='earth'&&this.night)color+=this.night[source+c]*Math.max(0,-illumination)*.95*(1-cloud);
          const rim=kind==='earth'?Math.pow(1-p.z,4)*Math.max(0,illumination)*.6:0;
          const titanHaze=kind==='titan'?Math.pow(1-p.z,5)*Math.max(0,illumination)*.65:0;
          output[p.i+c]=color+rim*[45,125,230][c]+oceanGlint+titanHaze*[70,130,210][c];
        }
        output[p.i+3]=Math.min(255,p.nz*3500);
      }
      this.surfaceCtx.putImageData(this.sphereData,0,0);
      this.ctx.drawImage(this.surface,-r,-r,r*2,r*2);
    }
    rings(r,front) {
      const ctx=this.ctx,m=this.orientation;
      ctx.save();ctx.transform(m[0],m[3],m[2],m[5],0,0);
      const start=Math.atan2(m[8],m[6])-Math.PI/2+(front?0:Math.PI),end=start+Math.PI;
      for (let i=0;i<105;i++) {
        const radius=r*(1.26+i*.0107);
        if (i>68&&i<76) continue; // Cassini aralığının temsili
        const shade=Math.round(149+Math.sin(i*2.6)*23+Math.sin(i*.14)*20);
        ctx.strokeStyle=`rgba(${shade+30},${shade+20},${shade-3},${front?.83:.56})`;
        ctx.lineWidth=r*.013;
        ctx.beginPath();ctx.arc(0,0,radius,start,end);ctx.stroke();
      }
      ctx.restore();
    }
    blackhole(r) {
      const ctx=this.ctx,m=this.orientation,normal=[m[1],m[4],m[7]],opening=Math.max(.012,Math.abs(normal[2]));
      const roll=Math.atan2(-normal[0],normal[1]),cr=Math.cos(roll),sr=Math.sin(roll);
      ctx.save();ctx.rotate(roll);
      this.glow(0,0,r*3,'#BA652A',.12);
      // Illustrative lensing, not a numerical solution of photon geodesics.
      // Continuous curved bands show the far side above and below the shadow.
      for(let i=100;i>=0;i--){
        const q=i/100,rr=r*(1.035+q*.58);
        const heat=1-q,alpha=(.03+.18*heat)*(1-q*.7);
        ctx.strokeStyle='rgba(255,'+Math.round(145+heat*100)+','+Math.round(66+heat*135)+','+alpha+')';
        ctx.lineWidth=r*.019;
        ctx.beginPath();ctx.ellipse(0,-r*.015,rr,rr*.94,0,Math.PI,TAU);ctx.stroke();
        ctx.globalAlpha=.28+.72*opening;ctx.beginPath();ctx.ellipse(0,0,rr,rr*.94,0,0,Math.PI);ctx.stroke();ctx.globalAlpha=1;
      }
      ctx.fillStyle='#000';ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.fill();
      const dw=640,dh=640;
      if(!this.disk){this.disk=document.createElement('canvas');this.disk.width=dw;this.disk.height=dh;this.diskCtx=this.disk.getContext('2d');this.diskData=this.diskCtx.createImageData(dw,dh);}
      const pixels=this.diskData.data;pixels.fill(0);
      for(let y=0;y<dh;y++)for(let x=0;x<dw;x++){
        const xx=(x+.5-dw/2)/dw*5.5,yy=(y+.5-dh/2)/dh*5.5,rr=Math.hypot(xx,yy/opening);
        const sx=cr*xx-sr*yy,sy=sr*xx+cr*yy,sz=-(normal[0]*sx+normal[1]*sy)/(Math.abs(normal[2])<.012?(normal[2]<0?-.012:.012):normal[2]);
        if(rr<1.13||rr>2.7||(sz<0&&Math.hypot(xx,yy)<1.015))continue;
        const q=(rr-1.13)/1.57,a=Math.atan2(m[2]*sx+m[5]*sy+m[8]*sz,m[0]*sx+m[3]*sy+m[6]*sz),flow=this.time*.55/Math.pow(rr,1.5);
        const filaments=.78+.12*Math.sin(rr*135+Math.sin(a*5-flow*3)*2)+.1*Math.sin(a*19-flow*8+rr*31);
        const doppler=.42+.58*(1-xx/rr)/2;
        const edge=clamp((rr-1.13)*26,0,1)*clamp((2.7-rr)*7,0,1);
        const heat=Math.pow(1-q,.6),i=(y*dw+x)*4;
        pixels[i]=255;pixels[i+1]=90+heat*151;pixels[i+2]=30+heat*174;
        pixels[i+3]=255*edge*filaments*doppler*(.2+.8*heat);
      }
      this.diskCtx.putImageData(this.diskData,0,0);ctx.drawImage(this.disk,-r*2.75,-r*2.75,r*5.5,r*5.5);
      ctx.strokeStyle='#FFEBD1A0';ctx.lineWidth=Math.max(.65,r*.012);
      ctx.beginPath();ctx.arc(0,0,r*1.018,Math.PI,TAU);ctx.stroke();
      ctx.restore();
    }
    neutron(r) {
      const ctx=this.ctx,spin=this.angle*5,tilt=.48;
      // A tilted magnetic axis rotates in depth; the opposing beams share it.
      const axis=[Math.sin(tilt)*Math.cos(spin),-Math.cos(tilt),Math.sin(tilt)*Math.sin(spin)];
      const m=this.orientation,project=(x,y,z)=>[(m[0]*x+m[1]*y+m[2]*z)*r,(m[3]*x+m[4]*y+m[5]*z)*r,m[6]*x+m[7]*y+m[8]*z];
      const axisDepth=project(...axis)[2];
      ctx.save();
      const drawBeam=sign=>{
        const tip=project(axis[0]*sign*2.1,axis[1]*sign*2.1,axis[2]*sign*2.1);
        const length=Math.max(.001,Math.hypot(tip[0],tip[1])),nx=-tip[1]/length,ny=tip[0]/length;
        ctx.save();ctx.globalCompositeOperation='screen';
        for(let i=7;i>=1;i--){
          const width=r*(.055+i*.025),g=ctx.createLinearGradient(0,0,tip[0],tip[1]);
          g.addColorStop(0,'rgba(210,242,255,.12)');g.addColorStop(.35,'rgba(115,184,250,.055)');g.addColorStop(1,'rgba(75,133,230,0)');
          ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(nx*r*.04,ny*r*.04);
          ctx.lineTo(tip[0]+nx*width,tip[1]+ny*width);ctx.lineTo(tip[0]-nx*width,tip[1]-ny*width);
          ctx.lineTo(-nx*r*.04,-ny*r*.04);ctx.closePath();ctx.fill();
        }ctx.restore();
      };
      // Dipole-shaped guides, sampled as 3D curves rather than concentric ellipses.
      for(let j=0;j<6;j++){
        const az=j*TAU/6;
        ctx.strokeStyle='#75ADD22C';ctx.lineWidth=.8;ctx.beginPath();
        for(let i=0;i<=80;i++){
          const theta=.16+(Math.PI-.32)*i/80,rr=1.35*Math.sin(theta)**2;
          const x=rr*Math.sin(theta)*Math.cos(az),z=rr*Math.sin(theta)*Math.sin(az),y=rr*Math.cos(theta);
          const tx=x*Math.cos(tilt)-y*Math.sin(tilt),ty=x*Math.sin(tilt)+y*Math.cos(tilt);
          const p=project(tx*Math.cos(spin)-z*Math.sin(spin),ty,tx*Math.sin(spin)+z*Math.cos(spin));
          if(i===0)ctx.moveTo(p[0],p[1]);else ctx.lineTo(p[0],p[1]);
        }ctx.stroke();
      }
      drawBeam(axisDepth>0?-1:1);
      this.glow(0,0,r*.5,'#8DCBFF',.32);
      const surface=ctx.createRadialGradient(-r*.055,-r*.055,0,0,0,r*.2);
      surface.addColorStop(0,'#FFFFFF');surface.addColorStop(.6,'#DBF1FF');surface.addColorStop(.9,'#93BBD8');surface.addColorStop(1,'#436A90');
      ctx.fillStyle=surface;ctx.beginPath();ctx.arc(0,0,r*.2,0,TAU);ctx.fill();
      drawBeam(axisDepth>0?1:-1);
      ctx.restore();
    }
    nebula(r) {
      const ctx=this.ctx,m=this.orientation,a=this.angle*.08,c=Math.cos(a),s=Math.sin(a);
      const project=(x,y,z)=>{
        const xx=x*c-z*s,zz=x*s+z*c;
        return [(m[0]*xx+m[1]*y+m[2]*zz)*r,(m[3]*xx+m[4]*y+m[5]*zz)*r,m[6]*xx+m[7]*y+m[8]*zz];
      };
      // A finite cloud volume, not a photograph painted on a movable plane.
      const clouds=this.clouds.map((cloud,i)=>({cloud,i,p:project(cloud.x,cloud.y,cloud.z)})).sort((a,b)=>a.p[2]-b.p[2]);
      ctx.save();
      for(const {cloud,i,p} of clouds)this.glow(p[0],p[1],r*cloud.r*(1.45+p[2]*.12),i%3?'#779EAF':'#B68FAD',.2);
      ctx.globalCompositeOperation='screen';
      for(let i=0;i<18;i++){
        const d=this.dust[i],p=project(d.j*1.7,Math.sin(d.a)*.65,Math.cos(d.a)*.4);
        this.glow(p[0],p[1],9+i%3,'#C7DBDA',.5);
        ctx.fillStyle='#DFE7D8';ctx.fillRect(p[0],p[1],1.5,1.5);
      }
      ctx.restore();
    }
    galaxy(r) {
      const ctx=this.ctx,milky=this.object.kind==='galaxy',extent=r*1.85,spin=this.angle*(.018/.105);
      // Camera yaw and pitch, independent of time: the disk and its annotations share this projection.
      const project=(x,z,height=0)=>{
        const m=this.orientation;
        return [m[0]*x+m[1]*height+m[2]*z,m[3]*x+m[4]*height+m[5]*z,m[6]*x+m[7]*height+m[8]*z];
      };
      const diskPoint=(radius,a,height=0)=>project(Math.cos(a+spin)*radius,Math.sin(a+spin)*radius,height);
      const normal=project(0,0,1),flatten=Math.max(.035,Math.abs(normal[2]));
      ctx.save();ctx.rotate(Math.atan2(normal[1],normal[0])+Math.PI/2);ctx.scale(1,flatten);
      this.glow(0,0,extent,'#ABB1B3',.44);ctx.restore();
      const particles=[];
      for(const p of this.dust){
        const arms=milky?4:2,a=p.arm%arms*TAU/arms+Math.log(.14+p.r)*3.7+p.j*(.25+p.r*.35);
        const q=diskPoint((.035+p.r*.965)*extent,a,p.j*extent*.025);
        particles.push({q,size:.25+p.s*.8,color:p.s>.86?'#E4E1D1A0':p.s>.45?'#ACC1D17A':'#C3C1B355'});
        // An older, diffuse disk under the younger stars concentrated in the arms.
        const old=diskPoint(p.r*extent,p.a,p.j*extent*.07);
        particles.push({q:old,size:.3+p.s*.45,color:'#C8C0AB28'});
      }
      if(milky)for(let i=0;i<160;i++){
        const t=i/159-.5,a=.58+t*.5,rr=extent*(.52+t*.045+Math.sin(i*137.5)*.014);
        particles.push({q:diskPoint(rr,a),size:.25+Math.abs(Math.sin(i*2.7))*.35,color:'#B4C5D555'});
      }
      particles.sort((a,b)=>a.q[2]-b.q[2]);
      for(const p of particles){ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.q[0],p.q[1],p.size,0,TAU);ctx.fill();}
      // The stellar bulge has finite thickness, so it remains visible edge-on.
      ctx.save();ctx.scale(1,milky?.6:.8);this.glow(0,0,r*.62,'#D6BD92',.72);ctx.restore();
      if(milky){
        for(let i=0;i<20;i++){const p=diskPoint((i/19-.5)*r*.8,.15);this.glow(p[0],p[1],r*.12,'#D8C7A5',.09);}
      }
      this.glow(0,0,r*.19,'#F1E1C4',.8);
      this.sunScreen=null;
      if(milky&&this.showSun){
        const [x,y]=diskPoint(extent*.52,.58);this.sunScreen=[x,y];
        this.glow(x,y,13,'#FFE6A5',.75);
        ctx.strokeStyle='#FFD789';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,6,0,TAU);ctx.stroke();
        ctx.fillStyle='#FFF3D0';ctx.beginPath();ctx.arc(x,y,2.5,0,TAU);ctx.fill();
        const tx=clamp(x+18,-this.w*.45,this.w*.45-105),ty=clamp(y-20,-this.h*.38,this.h*.34);
        ctx.beginPath();ctx.moveTo(x+5,y-5);ctx.lineTo(tx,ty+3);ctx.stroke();
        ctx.font='12px sans-serif';ctx.fillStyle='#071019E8';ctx.fillRect(tx-5,ty-15,116,22);
        ctx.fillStyle='#FFE6AD';ctx.fillText('Sun · Local Arm',tx,ty);
      }
    }
    mesh(r,kind) {
      const mesh=window.AstroModels?.[kind];if(!mesh){this.smallBody(r,kind==='comet');return;}
      const out=this.sphereData.data;out.fill(0);
      if(!this.depth)this.depth=new Float32Array(SPHERE*SPHERE);this.depth.fill(-Infinity);
      const count=mesh.positions.length/3,points=new Float32Array(count*4),m=this.orientation,c=Math.cos(this.angle),s=Math.sin(this.angle),scale=SPHERE*.45;
      for(let i=0;i<count;i++){
        const k=i*3,x=mesh.positions[k]*c-mesh.positions[k+2]*s,y=mesh.positions[k+1],z=mesh.positions[k]*s+mesh.positions[k+2]*c;
        const nx=mesh.normals[k]*c-mesh.normals[k+2]*s,ny=mesh.normals[k+1],nz=mesh.normals[k]*s+mesh.normals[k+2]*c;
        const xx=m[0]*nx+m[1]*ny+m[2]*nz,yy=m[3]*nx+m[4]*ny+m[5]*nz,zz=m[6]*nx+m[7]*ny+m[8]*nz;
        points[i*4]=(m[0]*x+m[1]*y+m[2]*z)*scale+SPHERE/2;
        points[i*4+1]=(m[3]*x+m[4]*y+m[5]*z)*scale+SPHERE/2;
        points[i*4+2]=m[6]*x+m[7]*y+m[8]*z;
        const diffuse=Math.max(0,(xx*Math.sin(this.phase)-yy*.3+zz*Math.cos(this.phase))/1.044);
        points[i*4+3]=22+175*Math.sqrt(diffuse);
      }
      const edge=(ax,ay,bx,by,x,y)=>(x-ax)*(by-ay)-(y-ay)*(bx-ax);
      for(let k=0;k<mesh.faces.length;k+=3){
        const a=mesh.faces[k]*4,b=mesh.faces[k+1]*4,c=mesh.faces[k+2]*4;
        const ax=points[a],ay=points[a+1],bx=points[b],by=points[b+1],cx=points[c],cy=points[c+1],area=edge(ax,ay,bx,by,cx,cy);
        if(Math.abs(area)<.001)continue;
        const minx=Math.max(0,Math.floor(Math.min(ax,bx,cx))),maxx=Math.min(SPHERE-1,Math.ceil(Math.max(ax,bx,cx)));
        const miny=Math.max(0,Math.floor(Math.min(ay,by,cy))),maxy=Math.min(SPHERE-1,Math.ceil(Math.max(ay,by,cy)));
        for(let y=miny;y<=maxy;y++)for(let x=minx;x<=maxx;x++){
          const u=edge(bx,by,cx,cy,x+.5,y+.5)/area,v=edge(cx,cy,ax,ay,x+.5,y+.5)/area,w=1-u-v;
          if(u<0||v<0||w<0)continue;
          const z=u*points[a+2]+v*points[b+2]+w*points[c+2],index=y*SPHERE+x;if(z<=this.depth[index])continue;
          this.depth[index]=z;const light=u*points[a+3]+v*points[b+3]+w*points[c+3],i=index*4;
          const ia=mesh.faces[k]*3,ib=mesh.faces[k+1]*3,ic=mesh.faces[k+2]*3;
          const px=u*mesh.positions[ia]+v*mesh.positions[ib]+w*mesh.positions[ic],py=u*mesh.positions[ia+1]+v*mesh.positions[ib+1]+w*mesh.positions[ic+1],pz=u*mesh.positions[ia+2]+v*mesh.positions[ib+2]+w*mesh.positions[ic+2];
          const tu=((Math.atan2(pz,px)/TAU+1)%1)*TW,tv=clamp((.5+Math.asin(clamp(py/Math.max(.001,Math.hypot(px,py,pz)),-1,1))/Math.PI)*TH,0,TH-1);
          const texel=(Math.floor(tv)*TW+Math.floor(tu))*4;
          // Exposure is raised for inspection; neither body is this bright in absolute albedo.
          const exposure=kind==='bennu'?1.3:.95;
          for(let channel=0;channel<3;channel++)out[i+channel]=this.tex[texel+channel]*light/195*exposure;
          out[i+3]=255;
        }
      }
      this.surfaceCtx.putImageData(this.sphereData,0,0);this.ctx.drawImage(this.surface,-r*1.12,-r*1.12,r*2.24,r*2.24);
    }
    smallBody(r,comet) {
      const ctx=this.ctx;
      ctx.save();
      if(comet) {
        ctx.save();ctx.filter=`blur(${Math.max(2,r*.035)}px)`;
        const ion=ctx.createLinearGradient(0,0,r*2.6,0);ion.addColorStop(0,'#ADCFF566');ion.addColorStop(1,'#ADCFF500');
        ctx.fillStyle=ion;ctx.beginPath();ctx.moveTo(0,-r*.05);ctx.lineTo(r*2.6,-r*.22);ctx.lineTo(r*2.6,r*.22);ctx.lineTo(0,r*.05);ctx.closePath();ctx.fill();
        const dust=ctx.createLinearGradient(0,0,r*2.5,0);dust.addColorStop(0,'#DDC9A655');dust.addColorStop(1,'#DDC9A600');
        ctx.fillStyle=dust;ctx.beginPath();ctx.moveTo(0,-r*.04);ctx.bezierCurveTo(r*.8,r*.02,r*1.8,r*.15,r*2.5,r*.65);ctx.lineTo(r*2.5,r*1.12);ctx.bezierCurveTo(r*1.7,r*.5,r*.8,r*.18,0,r*.08);ctx.closePath();ctx.fill();
        ctx.restore();
        this.glow(0,0,r*1.3,'#A3CBEF',.24);
      }
      // Faceted three-dimensional morphology; illustrative, not a mission shape model.
      const faces=[],rotate=p=>{
        const c=Math.cos(this.angle),s=Math.sin(this.angle),x=p[0]*c-p[2]*s,z=p[0]*s+p[2]*c;
        const m=this.orientation;
        return [m[0]*x+m[1]*p[1]+m[2]*z,m[3]*x+m[4]*p[1]+m[5]*z,m[6]*x+m[7]*p[1]+m[8]*z];
      };
      const lobes=comet?[[.5,.46,.44,-.26,.12,0],[.35,.3,.33,.27,-.18,.02]]:[[.7,.66,.7,0,0,0]];
      for(const [rx,ry,rz,cx,cy,cz] of lobes){
        const point=(i,j)=>{
          const t=i/36*Math.PI,a=j/72*TAU;
          let hash=Math.imul(i+827,(j%72)+3761);hash=Math.imul(hash^(hash>>>16),2246822519);hash=(hash^(hash>>>13))>>>0;
          const relief=1+(hash/4294967296-.5)*.055*Math.sin(t)+.025*Math.sin(a*5+t*3)*Math.sin(t*4);
          const ridge=comet?1:1+.1*Math.exp(-(((t-Math.PI/2)/.22)**2));
          return rotate([cx+rx*Math.sin(t)*Math.cos(a)*relief*ridge,cy+ry*Math.cos(t)*relief,cz+rz*Math.sin(t)*Math.sin(a)*relief*ridge]);
        };
        for(let i=0;i<36;i++)for(let j=0;j<72;j++) {
          const a=point(i,j),b=point(i+1,j),c=point(i+1,j+1),d=point(i,j+1);
          for(const v of [[a,b,c],[a,c,d]]){
            const u=v[1].map((x,k)=>x-v[0][k]),w=v[2].map((x,k)=>x-v[0][k]);
            let n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]],length=Math.hypot(...n);
            if(length<1e-9)continue;
            const center=rotate([cx,cy,cz]);
            if(n.reduce((sum,x,k)=>sum+x*(v[0][k]-center[k]),0)<0)n=n.map(x=>-x);
            if(n[2]<=0)continue;
            const light=.09+.91*Math.max(0,(n[0]*Math.sin(this.phase)-n[1]*.3+n[2]*Math.cos(this.phase))/length);
            const albedo=.94+.06*Math.sin(i*19+j*13);
            faces.push({v,z:(v[0][2]+v[1][2]+v[2][2])/3,shade:Math.round(163*light*albedo)});
          }
        }
      }
      faces.sort((a,b)=>a.z-b.z);
      for(const {v,shade} of faces){ctx.fillStyle=ctx.strokeStyle=`rgb(${shade},${Math.round(shade*.98)},${Math.round(shade*.94)})`;ctx.lineWidth=.45;ctx.beginPath();v.forEach((p,i)=>i?ctx.lineTo(p[0]*r,p[1]*r):ctx.moveTo(p[0]*r,p[1]*r));ctx.closePath();ctx.fill();ctx.stroke();}
      ctx.restore();
    }
    draw() {
      if (!this.ctx||!this.object||!this.w) return;
      const ctx=this.ctx,w=this.w,h=this.h,kind=this.object.kind;
      ctx.clearRect(0,0,w,h);
      // Uzay zemini: renkli panel yerine gerçek gözlemdeki siyaha yakın boşluk.
      ctx.fillStyle='#000106';ctx.fillRect(0,0,w,h);
      for (const s of this.stars) {
        const twinkle=s.a; // No atmospheric scintillation when observing from space.
        const color=s.color>.87?'255,238,203':s.color>.62?'205,222,255':'238,244,255';
        ctx.fillStyle=`rgba(${color},${twinkle})`;ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.r,0,TAU);ctx.fill();
      }
      const radius=Math.min(w*.28,h*.27)*this.zoom;
      ctx.save();ctx.translate(w*.5+(this.panX||0),h*.49+(this.panY||0));
      // İnce referans çemberi, bütün cisimlerde aynı gözlem alanı.
      // Referans çemberi yalnızca klavye ile incelenen sahnelerde dikkat dağıtmasın.
      if(kind==='comet'||kind==='bennu') this.mesh(radius,kind);
      else if (kind==='blackhole') this.blackhole(radius*.51);
      else if (kind==='neutron') this.neutron(radius*.65);
      else if (kind==='nebula') this.nebula(radius*1.3);
      else if (kind==='galaxy'||kind==='andromeda') this.galaxy(radius*.83);
      else {
        const r=kind==='saturn'?Math.min(w*.19,h*.225)*this.zoom:kind==='whitedwarf'?radius*.58:radius;
        if (kind==='sun') this.glow(0,0,r*1.65,'#EBA04D',.32);
        if(kind==='reddwarf'||kind==='sunlike')this.glow(0,0,r*1.14,kind==='reddwarf'?'#EAAA77':'#FFF1CF',.15);
        if (kind==='redgiant') this.glow(0,0,r*1.13,'#DD5B26',.2);
        if (kind==='whitedwarf') this.glow(0,0,r*1.2,'#A9D8FF',.2);
        if (kind==='earth') this.glow(0,0,r*1.045,'#70B1DB',.24);
        if(kind==='titan'){
          ctx.save();ctx.lineWidth=Math.max(1,r*.009);
          for(let i=0;i<180;i++){
            const a=i/180*TAU,lit=Math.max(0,Math.cos(a)*Math.sin(this.phase)-Math.sin(a)*.24);
            ctx.strokeStyle=`rgba(145,175,205,${.025+lit*.36})`;
            ctx.beginPath();ctx.arc(0,0,r*1.007,a,a+TAU/180+.002);ctx.stroke();
          }ctx.restore();
        }
        if (kind==='saturn') this.rings(r,false);
        ctx.save();
        this.sphere(r,kind);ctx.restore();
        if (kind==='saturn') this.rings(r,true);
        if(kind==='whitedwarf'&&this.drag){
          const m=this.orientation;ctx.strokeStyle='#8ABBD999';ctx.lineWidth=1;
          for(let meridian=0;meridian<3;meridian++){
            ctx.beginPath();let visible=false;
            for(let i=0;i<=180;i++){
              const a=i/180*TAU,b=meridian*Math.PI/3,x=Math.cos(a)*Math.cos(b),y=Math.sin(a),z=Math.cos(a)*Math.sin(b);
              const px=m[0]*x+m[1]*y+m[2]*z,py=m[3]*x+m[4]*y+m[5]*z,pz=m[6]*x+m[7]*y+m[8]*z;
              if(pz>=0){if(visible)ctx.lineTo(px*r,py*r);else ctx.moveTo(px*r,py*r);visible=true;}else visible=false;
            }ctx.stroke();
          }
        }
      }
      ctx.restore();
    }
  }
  window.AstroScene=AstroScene;
})();
