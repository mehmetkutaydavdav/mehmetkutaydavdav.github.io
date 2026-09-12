/* Lazy local texture loading; no third-party requests. */
(() => {
  const keys=new Set(['mercury','venus','earth','earth-night','earth-clouds','moon','mars','jupiter','saturn','uranus','neptune','sun']);
  const pending=new Map();
  window.AstroTextures={load(key) {
    if(!keys.has(key))return Promise.resolve(null);
    if(pending.has(key))return pending.get(key);
    const task=new Promise(resolve=>{
      const script=document.createElement('script');
      const finish=value=>{clearTimeout(timer);script.remove();resolve(value);};
      const timer=setTimeout(()=>finish(null),15000);
      script.src='dokular/'+key+'.js';
      script.onerror=()=>finish(null);
      script.onload=()=>{
        const img=new Image();
        img.onerror=()=>finish(null);
        img.onload=()=>{
          try {
            const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;
            const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,1024,512);
            finish(ctx.getImageData(0,0,1024,512).data);
          } catch {finish(null);}
        };
        img.src=window.AstroTextureData[key];
        delete window.AstroTextureData[key];
      };
      document.head.append(script);
    });
    pending.set(key,task);return task;
  }};
})();
