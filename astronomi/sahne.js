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
        else if (kind === 'redgiant') rgb = [235+grain,99+band*20,43+grain];
        else if (kind === 'whitedwarf') rgb = [199+grain,221+grain,247+grain];
        else if (kind === 'europa' || kind === 'enceladus') {
          const crack=Math.abs(Math.sin(u*41+Math.sin(v*19)*3));
          rgb=crack<.06?[122,102,87]:[210+grain,205+grain,189+grain];
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
    if (kind === 'moon' || kind === 'mars') {
      if (kind === 'moon') {
        for (let i = 0; i < 12; i++) {
          ctx.fillStyle = '#626F6755';ctx.beginPath();
          ctx.ellipse(rand()*TW,45+rand()*170,rand()*38+10,rand()*20+10,rand()*3,0,TAU);ctx.fill();
        }
      }
      for (let i = 0; i < (kind === 'moon' ? 310 : 70); i++) {
        const x = rand()*TW, y = 18+rand()*220, r = 1 + rand()**3*11;
        ctx.beginPath();ctx.ellipse(x,y,r,r*.75,0,0,TAU);ctx.fillStyle = kind === 'moon' ? '#414F4A66' : '#703D293A';ctx.fill();
        ctx.beginPath();ctx.ellipse(x+.4,y+.5,r,r*.75,0,0,Math.PI);ctx.strokeStyle='#F2E6CF44';ctx.lineWidth=.8;ctx.stroke();
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
        this.angle += (e.clientX-this.drag.x)*.009;
        // Pointer yukarı gittiğinde kamera da yukarı baksın; önceki sürüm ters hareket ediyordu.
        this.view = clamp(this.view-(e.clientY-this.drag.y)*.004,-.8,.8);
        this.drag.x=e.clientX;this.drag.y=e.clientY;this.draw();
      });
      const release = () => {this.drag=null;};
      canvas.addEventListener('pointerup',release);
      canvas.addEventListener('pointercancel',release);
      canvas.addEventListener('lostpointercapture',release);
      canvas.addEventListener('wheel', e => {
        e.preventDefault();
        const factor=Math.exp(-e.deltaY*.0012);
        this.setZoom(this.zoom*factor);
      }, {passive:false});
      canvas.addEventListener('keydown', e => {
        const keys = {ArrowLeft:-.16,ArrowRight:.16,ArrowUp:-.08,ArrowDown:.08};
        if (e.key in keys) {
          e.preventDefault();
          if (e.key==='ArrowLeft'||e.key==='ArrowRight') this.angle+=keys[e.key];
          else this.view=clamp(this.view+keys[e.key],-.8,.8);
          this.draw();
        }
        if (e.code==='Space') {e.preventDefault();this.setPlaying(!this.playing);}
      });
      this.resize();
    }
    setObject(object) {
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
    setZoom(value) {this.zoom=clamp(Number(value)||1,.7,1.5);this.draw();}
    setPhase(value) {this.phase=clamp(Number(value)||0,-2.5,2.5);this.draw();}
    reset() {this.zoom=1;this.phase=-.65;this.angle=0;this.view=-.28;this.time=0;this.draw();}
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
      const ctx=this.ctx;
      ctx.save();
      const tilt=-.22+this.view*.22;ctx.rotate(tilt);
      this.glow(0,0,r*2.8,'#E18C43',.16);
      // İç ve dış birikim diski: diferansiyel dönüş ve Doppler parlaklığı için iki renkli akış.
      for(let i=0;i<150;i++) {
        const q=i/149,rr=r*(1.08+q*1.7),y=rr*(.18+.035*Math.sin(q*18));
        const warm=.12+.34*(1-q),blue=.08+.24*q;
        ctx.strokeStyle=`rgba(${245},${Math.round(115+100*(1-q))},${Math.round(48+55*(1-q))},${warm})`;
        ctx.lineWidth=Math.max(.55,r*.018*(1-q));
        ctx.beginPath();ctx.ellipse(0,y,rr,rr*(.18+.08*q),0,Math.PI,TAU);ctx.stroke();
        ctx.strokeStyle=`rgba(112,${Math.round(166+50*q)},255,${blue})`;
        ctx.beginPath();ctx.ellipse(0,y,rr,rr*(.18+.08*q),0,0,Math.PI);ctx.stroke();
      }
      // Foton halkası ve olay ufku.
      ctx.strokeStyle='#FFE2A8';ctx.lineWidth=Math.max(2,r*.035);ctx.beginPath();ctx.arc(0,0,r*1.08,0,TAU);ctx.stroke();
      ctx.fillStyle='#000';ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.fill();
      ctx.strokeStyle='#FFB866';ctx.globalAlpha=.48;ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(0,0,r*1.17,0,TAU);ctx.stroke();ctx.globalAlpha=1;
      for(let i=0;i<34;i++) {
        const a=this.angle*2+i*.31,rr=r*(1.22+(i%7)*.18),x=Math.cos(a)*rr,y=Math.sin(a)*rr*.22+r*.16;
        this.glow(x,y,r*.045,'#FFD18B',.38);
      }
      ctx.restore();
    }

    pluto(r) {
      const ctx=this.ctx;
      ctx.save();ctx.rotate(this.view*.35);
      this.glow(0,0,r*1.24,'#9AB2C8',.12);
      // New Horizons haritalarındaki kalp biçimli Tombaugh Regio için sadeleştirilmiş temsil.
      ctx.save();ctx.rotate(this.angle*.35);
      ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.clip();
      const grad=ctx.createLinearGradient(-r,-r,r,r);grad.addColorStop(0,'#E4D2BA');grad.addColorStop(.42,'#B99D88');grad.addColorStop(1,'#554B55');ctx.fillStyle=grad;ctx.fillRect(-r,-r,r*2,r*2);
      ctx.fillStyle='#E9DCC7';ctx.beginPath();ctx.moveTo(-r*.50,-r*.10);ctx.bezierCurveTo(-r*.78,-r*.72,-r*.08,-r*.82,r*.03,-r*.30);ctx.bezierCurveTo(r*.45,-r*.78,r*.80,-r*.42,r*.50,r*.19);ctx.bezierCurveTo(r*.22,r*.62,-r*.32,r*.48,-r*.50,-r*.10);ctx.fill();
      const rand=random(740);for(let i=0;i<85;i++){const a=rand()*TAU,d=Math.sqrt(rand())*r*.84,x=Math.cos(a)*d,y=Math.sin(a)*d;ctx.fillStyle=`rgba(48,41,52,${.12+rand()*.20})`;ctx.beginPath();ctx.arc(x,y,rand()*r*.045+r*.008,0,TAU);ctx.fill();}
      ctx.restore();
      ctx.strokeStyle='#D3C0B0';ctx.globalAlpha=.32;ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(0,0,r*1.01,0,TAU);ctx.stroke();ctx.restore();
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
      this.glow(0,0,r*1.2,'#7A9EAA',.14);
      // Soluk yayılı ışık, tekil yıldız noktalarının arasındaki sarmal yapıyı gösterir.
      ctx.save();ctx.lineWidth=r*.12;ctx.strokeStyle='#84B8CD18';ctx.shadowColor='#88B9CF';ctx.shadowBlur=r*.1;
      for (let arm=0;arm<4;arm++) {
        ctx.beginPath();
        for(let i=0;i<=90;i++) {
          const d=i/90,a=arm*TAU/4+d*5.4+this.angle*.2,rr=(.13+d*.88)*r*1.8;
          if(i===0)ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);
          else ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);
        }
        ctx.stroke();
      }
      ctx.restore();
      for (const p of this.dust) {
        const angle=(this.object.kind==='andromeda'?p.arm%2*TAU/2:p.arm*TAU/4)+p.r*5.4+this.angle*.2+p.j*.55;
        const radius=(.13+p.r*.88)*r*1.8;
        const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius;
        ctx.fillStyle=p.s>.78?'#D8D4B999':'#84AEBD66';
        ctx.beginPath();ctx.arc(x,y,p.s*1.15+.25,0,TAU);ctx.fill();
      }
      ctx.save();ctx.rotate(this.angle*.2);ctx.scale(1,.38);
      this.glow(0,0,r*.6,'#F0D8AC',.7);ctx.restore();
      this.glow(0,0,r*.27,'#F5E9C8',.9);
      ctx.restore();
    }
    smallBody(r,comet) {
      const ctx=this.ctx;
      ctx.save();ctx.rotate(this.view*.4);
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
      ctx.save();ctx.rotate(this.angle);
      ctx.beginPath();
      for(let i=0;i<=96;i++){
        const a=i/96*TAU;
        const rr=r*(comet?.48+.19*Math.cos(2*a):.68+.07*Math.cos(4*a))*(1+.035*Math.sin(a*17));
        if(i===0)ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);else ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);
      }
      ctx.closePath();ctx.clip();this.sphere(r,comet?'comet':'bennu');
      ctx.restore();ctx.restore();
    }
    draw() {
      if (!this.ctx||!this.object||!this.w) return;
      const ctx=this.ctx,w=this.w,h=this.h,kind=this.object.kind;
      ctx.clearRect(0,0,w,h);
      // Uzay zemini: renkli panel yerine gerçek gözlemdeki siyaha yakın boşluk.
      ctx.fillStyle='#000106';ctx.fillRect(0,0,w,h);
      for (const s of this.stars) {
        const twinkle=s.a*(.82+.18*Math.sin(this.time*1.6+s.twinkle));
        const color=s.color>.87?'255,238,203':s.color>.62?'205,222,255':'238,244,255';
        ctx.fillStyle=`rgba(${color},${twinkle})`;ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.r,0,TAU);ctx.fill();
      }
      const radius=Math.min(w*.28,h*.27)*this.zoom;
      ctx.save();ctx.translate(w*.5,h*.49);
      // İnce referans çemberi, bütün cisimlerde aynı gözlem alanı.
      // Referans çemberi yalnızca klavye ile incelenen sahnelerde dikkat dağıtmasın.
      if(kind==='comet'||kind==='bennu') this.smallBody(radius,kind==='comet');
      else if(kind==='pluto') this.pluto(radius);
      else if (kind==='blackhole') this.blackhole(radius*.51);
      else if (kind==='neutron') this.neutron(radius*.95);
      else if (kind==='nebula') this.nebula(radius*1.3);
      else if (kind==='galaxy'||kind==='andromeda') this.galaxy(radius*.83);
      else {
        const r=kind==='saturn'?Math.min(w*.19,h*.225)*this.zoom:kind==='whitedwarf'?radius*.58:radius;
        if (kind==='sun'||kind==='redgiant') this.glow(0,0,r*1.65,'#EBA04D',.32);
        if (kind==='earth') this.glow(0,0,r*1.09,'#70B1DB',.45);
        if (kind==='saturn') this.rings(r,false);
        ctx.save();ctx.rotate(kind==='saturn'?-.38+this.view*.35:this.view*.4);
        if(kind==='jupiter'||kind==='saturn')ctx.scale(1,.92);
        this.sphere(r,kind);ctx.restore();
        if (kind==='saturn') this.rings(r,true);
      }
      ctx.restore();
    }
  }
  window.AstroScene=AstroScene;
})();
