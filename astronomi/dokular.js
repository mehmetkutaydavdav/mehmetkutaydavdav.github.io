/* Lazy local texture loading; no third-party requests. */
(() => {
  const keys=new Set(['mercury','venus','earth','earth-night','earth-clouds','moon','mars','jupiter','saturn','uranus','neptune','sun','pluto','io','europa','enceladus','ceres','bennu']);
  const pending=new Map();
  window.AstroTextures={load(key) {
    if(!keys.has(key))return Promise.resolve(null);
    if(pending.has(key)){const task=pending.get(key);pending.delete(key);pending.set(key,task);while(pending.size>4)pending.delete(pending.keys().next().value);return task;}
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
            const canvas=document.createElement('canvas');canvas.width=['moon','enceladus'].includes(key)?4096:2048;canvas.height=canvas.width/2;
            const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,canvas.width,canvas.height);
            const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
            pixels.width=canvas.width;pixels.height=canvas.height;finish(pixels);
          } catch {finish(null);}
        };
        img.src=window.AstroTextureData[key];
        delete window.AstroTextureData[key];
      };
      document.head.append(script);
    });
    pending.set(key,task);while(pending.size>4)pending.delete(pending.keys().next().value);return task;
  }};
})();
