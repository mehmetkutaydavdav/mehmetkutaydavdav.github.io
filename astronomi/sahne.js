/* Bağımsız Canvas 2D çizimleri. Ağ isteği, WebGL ve harici bağımlılık yok.
   Fizik simülatörü değil: görünüm ve hareketler öğretici temsillerdir. */
(() => {
  'use strict';
  const TAU = Math.PI * 2;
  const TW = 1024, TH = 512, SPHERE = 360;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const random = seed => () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  const textures = new Map();

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
        else if (kind === 'venus' || kind === 'titan') rgb = [200+band*9+grain,158+band*8+grain,85+grain];
        else if (kind === 'redgiant') {const cell=Math.sin(u*TAU*19+Math.sin(v*31))*Math.sin(v*47+Math.cos(u*TAU*11));rgb=[237+grain,133+cell*28+grain,72+cell*18];}
        else if (kind === 'whitedwarf') rgb = [199+grain,221+grain,247+grain];
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
    ctx.scale(2,2);
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
      this.clouds = Array.from({length:75}, () => ({x:(rand()-.5)*2,y:(rand()-.5)*1.3,r:rand()*.26+.12,a:rand()*TAU}));
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
        this.drag = {id:e.pointerId,x:e.clientX,y:e.clientY};
        canvas.setPointerCapture(e.pointerId);
      });
      canvas.addEventListener('pointermove', e => {
        if (!this.drag || this.drag.id !== e.pointerId) return;
        this.moveView(e.clientX-this.drag.x,e.clientY-this.drag.y);
        this.drag.x=e.clientX;this.drag.y=e.clientY;this.draw();
      });
      const release = () => {this.drag=null;};
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
    moveView(dx,dy) {
      if(['blackhole','neutron','nebula','galaxy','andromeda'].includes(this.object?.kind)) {
        this.panX=clamp((this.panX||0)+dx,-this.w*.3,this.w*.3);
        this.panY=clamp((this.panY||0)+dy,-this.h*.3,this.h*.3);
      } else {
        this.angle-=dx*.009;
        this.view=clamp(this.view-dy*.004,-.8,.8);
      }
    }
    setObject(object) {
      this.panX=0;this.panY=0;
      this.object=object;this.angle=0;this.view=-.28;this.time=0;
      this.tex=texture(object.kind);
      this.zoom=1;this.phase=-.65;this.projectionView=null;
      this.night=null;this.cloudMap=null;
      const chosen=object;
      window.AstroTextures?.load(object.kind).then(map=>{
        if(this.object!==chosen)return;
        if(map)this.tex=map;
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
    setSpeed(value) {this.speed=clamp(Number(value)||1,.5,2);}
    setZoom(value) {this.zoom=clamp(Number(value)||1,.7,1.5);this.canvas.dispatchEvent(new CustomEvent('astrozoom',{detail:this.zoom}));this.draw();}
    setPhase(value) {this.phase=clamp(Number(value)||0,-2.5,2.5);this.draw();}
    reset() {this.panX=0;this.panY=0;this.zoom=1;this.phase=-.65;this.angle=0;this.view=-.28;this.time=0;this.draw();}
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
      if(this.projectionView!==this.view) {
        const c=Math.cos(this.view),s=Math.sin(this.view);
        for(const p of this.samples) {
          const y=p.ny*c+p.nz*s,z=p.nz*c-p.ny*s;
          p.u=Math.floor((Math.atan2(p.nx,z)/TAU+.5)*TW);
          p.v=clamp(Math.floor((Math.asin(clamp(y,-1,1))/Math.PI+.5)*TH),0,TH-1)*TW;
        }
        this.projectionView=this.view;
      }
      const lx=Math.sin(this.phase),lz=Math.cos(this.phase);
      const luminous=['sun','redgiant','whitedwarf'].includes(kind);
      const cloudOffset=Math.floor(this.time*1.3);
      for (const p of this.samples) {
        const u=((p.u+offset)%TW+TW)%TW, source=(p.v+u)*4;
        const illumination=p.nx*lx-p.ny*.24+p.nz*lz;
        let light=luminous?.68+p.z*.32:.025+Math.max(0,illumination)*.94;
        // Approximate ring shadow on the cloud tops; same light direction as the sphere.
        if(kind==='saturn' && illumination>0) {
          const tilt=.34+this.view*.18,c=Math.sqrt(1-tilt*tilt);
          const t=-(p.ny*c-p.nz*tilt)/(-.24*c-lz*tilt);
          if(t>0) {
            const x=p.nx+t*lx,y=p.ny-t*.24,z=p.nz+t*lz;
            const rr=Math.sqrt(x*x+y*y+z*z);
            if(rr>1.26&&rr<2.37&&!(rr>1.99&&rr<2.08))light*=.42;
          }
        }
        const cloud=kind==='earth'&&this.cloudMap?this.cloudMap[(p.v+(u+cloudOffset)%TW)*4]/255*.82:0;
        for(let c=0;c<3;c++) {
          let color=this.tex[source+c]*(1-cloud)+cloud*245;
          color*=light;
          if(kind==='earth'&&this.night)color+=this.night[source+c]*Math.max(0,-illumination)*.95*(1-cloud);
          const rim=kind==='earth'?Math.pow(1-p.z,4)*Math.max(0,illumination)*.6:0;
          output[p.i+c]=color+rim*[45,125,230][c];
        }
        output[p.i+3]=Math.min(255,p.nz*3500);
      }
      this.surfaceCtx.putImageData(this.sphereData,0,0);
      this.ctx.drawImage(this.surface,-r,-r,r*2,r*2);
    }
    rings(r,front) {
      const ctx=this.ctx,flatten=.34+this.view*.18;
      ctx.save();ctx.rotate(-.38+this.view*.35);
      const start=front?0:Math.PI,end=front?Math.PI:TAU;
      for (let i=0;i<105;i++) {
        const radius=r*(1.26+i*.0107);
        if (i>68&&i<76) continue; // Cassini aralığının temsili
        const shade=Math.round(149+Math.sin(i*2.6)*23+Math.sin(i*.14)*20);
        ctx.strokeStyle=`rgba(${shade+30},${shade+20},${shade-3},${front?.83:.56})`;
        ctx.lineWidth=r*.013;
        ctx.beginPath();ctx.ellipse(0,0,radius,radius*flatten,0,start,end);ctx.stroke();
      }
      ctx.restore();
    }
    blackhole(r) {
      const ctx=this.ctx,opening=clamp(.27+this.view*.22,.09,.5);
      ctx.save();ctx.rotate(-.13);
      this.glow(0,0,r*2.9,'#C77731',.14);
      // Lensed far side of the accretion disk: visual approximation, not a geodesic solver.
      for(let i=0;i<80;i++){
        const q=i/80,rr=r*(1.04+q*.68);
        ctx.strokeStyle=`rgba(255,${Math.round(206-q*96)},${Math.round(133-q*94)},${.32*(1-q)})`;
        ctx.lineWidth=r*.025;
        ctx.beginPath();ctx.ellipse(0,0,rr,rr*.91,0,Math.PI,TAU);ctx.stroke();
        ctx.globalAlpha=.35;ctx.beginPath();ctx.ellipse(0,0,rr,rr*.87,0,0,Math.PI);ctx.stroke();ctx.globalAlpha=1;
      }
      ctx.fillStyle='#000';ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.fill();
      // Continuous disk filaments with differential motion and approaching-side brightening.
      for(let i=0;i<96;i++){
        const q=i/95,rr=r*(1.15+q*1.55),flow=this.angle*2/Math.pow(1+q,1.5);
        for(let k=0;k<80;k++){
          const a=k/80*TAU,b=(k+1.08)/80*TAU;
          const front=Math.sin(a)>0,y=Math.sin(a)*rr*opening;
          if(!front && Math.hypot(Math.cos(a)*rr,y)<r*1.06)continue;
          const boost=.32+.68*(1-Math.cos(a))*.5;
          const detail=.75+.25*Math.sin(i*2.13+Math.sin(a*7+flow)*2);
          ctx.strokeStyle=`rgba(255,${Math.round(110+(1-q)*118)},${Math.round(42+(1-q)*135)},${boost*detail*(.14+.38*(1-q))})`;
          ctx.lineWidth=Math.max(.6,r*.022);ctx.beginPath();ctx.ellipse(0,0,rr,rr*opening,0,a,b);ctx.stroke();
        }
      }
      // The observed shadow is not the event horizon; no stars/particles are painted inside it.
      ctx.save();ctx.globalCompositeOperation='source-over';
      ctx.strokeStyle='#FFE2ACB0';ctx.lineWidth=r*.018;ctx.beginPath();ctx.arc(0,0,r*1.025,Math.PI,TAU);ctx.stroke();ctx.restore();
      ctx.restore();
    }
    neutron(r) {
      const ctx=this.ctx,a=this.angle*2;
      ctx.save();ctx.rotate(this.view);
      ctx.strokeStyle='#86B7C52B';ctx.lineWidth=1;
      for (let i=0;i<5;i++) {ctx.beginPath();ctx.ellipse(0,0,r*(.7+i*.12),r*(1.2+i*.25),0,0,TAU);ctx.stroke();}
      const dx=Math.sin(a)*r*1.1,dy=-r*2;
      for (const sign of [-1,1]) {
        const g=ctx.createLinearGradient(0,0,dx*sign,dy*sign);
        g.addColorStop(0,'#C4EEFA99');g.addColorStop(1,'#7DA9D600');ctx.fillStyle=g;
        ctx.beginPath();ctx.moveTo(-r*.09,0);ctx.lineTo(dx*sign-r*.3,dy*sign);ctx.lineTo(dx*sign+r*.3,dy*sign);ctx.lineTo(r*.09,0);ctx.closePath();ctx.fill();
      }
      this.glow(0,0,r*.65,'#9DCCE7',.7);
      ctx.fillStyle='#D9F0E8';ctx.beginPath();ctx.arc(0,0,r*.18,0,TAU);ctx.fill();
      ctx.restore();
    }
    nebula(r) {
      const ctx=this.ctx;
      ctx.save();ctx.rotate(this.view*.5+this.angle*.08);
      for (const [i,c] of this.clouds.entries()) {
        const drift=Math.sin(this.time*.18+c.a)*r*.035;
        this.glow(c.x*r+drift,c.y*r,r*c.r*1.5,i%3?'#779EAF':'#B68FAD',.2);
      }
      ctx.globalCompositeOperation='screen';
      for (let i=0;i<18;i++) {
        const d=this.dust[i],x=d.j*r*1.7,y=Math.sin(d.a)*r*.65;
        this.glow(x,y,9+i%3,'#C7DBDA',.5);
        ctx.fillStyle='#DFE7D8';ctx.fillRect(x,y,1.5,1.5);
      }
      ctx.restore();
    }
    galaxy(r) {
      const ctx=this.ctx;
      ctx.save();ctx.rotate(-.38+this.view);ctx.scale(1,clamp(.55+this.view*.45,.18,.92));
      this.glow(0,0,r*1.95,'#A4ABA7',.55);
      const arms=this.object.kind==='andromeda'?2:4;
      for (const p of this.dust) {
        const angle=p.arm%arms*TAU/arms+Math.log(.14+p.r)*3.7+this.angle*.2+p.j*(.4+p.r*.45);
        const radius=(.04+p.r*.96)*r*1.85;
        const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius;
        ctx.fillStyle=p.s>.85?'#DAD8CC99':p.s>.5?'#A6B9CC55':'#BDB9AB33';
        ctx.beginPath();ctx.arc(x,y,p.s*.65+.15,0,TAU);ctx.fill();
        if(p.s>.92)this.glow(x,y,r*.035,'#A5BDDC',.11);
      }
      ctx.save();ctx.rotate(this.angle*.2);ctx.scale(1,this.object.kind==='andromeda'?.72:.32);
      this.glow(0,0,r*.68,'#DBC69F',.6);ctx.restore();
      this.glow(0,0,r*.32,'#F1E0BE',.8);
      ctx.restore();
    }
    smallBody(r,comet) {
      const ctx=this.ctx;
      ctx.save();
      if(comet) {
        for(let i=0;i<40;i++) {
          const ion=ctx.createLinearGradient(0,0,r*2.5,0);
          ion.addColorStop(0,'rgba(113,163,236,.035)');ion.addColorStop(1,'rgba(113,163,236,0)');
          ctx.strokeStyle=ion;ctx.lineWidth=r*.07;
          ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(r*1.1,i*r*.005,r*2.5,r*(i-20)*.018);ctx.stroke();
          const dust=ctx.createLinearGradient(0,0,r*2.5,r);
          dust.addColorStop(0,'rgba(230,207,174,.025)');dust.addColorStop(1,'rgba(230,207,174,0)');
          ctx.strokeStyle=dust;
          ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(r*1.5,r*.3,r*2.5,r*(.9+i*.012));ctx.stroke();
        }
        this.glow(0,0,r*1.3,'#A3CBEF',.24);
      }
      // Faceted three-dimensional morphology; illustrative, not a mission shape model.
      const faces=[],rotate=p=>{
        const c=Math.cos(this.angle),s=Math.sin(this.angle),x=p[0]*c-p[2]*s,z=p[0]*s+p[2]*c;
        const cv=Math.cos(this.view),sv=Math.sin(this.view);
        return [x,p[1]*cv-z*sv,p[1]*sv+z*cv];
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
      if(kind==='comet'||kind==='bennu') this.smallBody(radius,kind==='comet');
      else if (kind==='blackhole') this.blackhole(radius*.51);
      else if (kind==='neutron') this.neutron(radius*.95);
      else if (kind==='nebula') this.nebula(radius*1.3);
      else if (kind==='galaxy'||kind==='andromeda') this.galaxy(radius*.83);
      else {
        const r=kind==='saturn'?Math.min(w*.19,h*.225)*this.zoom:kind==='whitedwarf'?radius*.58:radius;
        if (kind==='sun'||kind==='redgiant') this.glow(0,0,r*1.65,'#EBA04D',.32);
        if (kind==='earth') this.glow(0,0,r*1.09,'#70B1DB',.45);
        if (kind==='saturn') this.rings(r,false);
        ctx.save();ctx.rotate(kind==='saturn'?-.38+this.view*.35:0);
        if(kind==='jupiter'||kind==='saturn')ctx.scale(1,.92);
        this.sphere(r,kind);ctx.restore();
        if (kind==='saturn') this.rings(r,true);
      }
      ctx.restore();
    }
  }
  window.AstroScene=AstroScene;
})();
