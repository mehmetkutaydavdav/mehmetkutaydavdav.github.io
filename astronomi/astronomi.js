(() => {
  'use strict';
  if (!Array.isArray(window.AstroCatalog) || !window.AstroCatalog.length) return;
  const sections = [
    ['planets','Planets and moons',['merkur','venus','dunya','ay','mars','jupiter','io','europa','saturn','titan','enceladus','uranus','neptun']],
    ['dwarfs','Dwarf planets',['ceres','pluton']],
    ['small-bodies','Asteroids and comets',['bennu','67p']],
    ['stars','Stars',['gunes','alpha-centauri-a','proxima-centauri','kirmizi-dev']],
    ['compact','Compact objects',['beyaz-cuce','notron-yildizi','kara-delik']],
    ['nebulae','Nebulae',['orion']],
    ['galaxies','Galaxies',['samanyolu','andromeda']]
  ];
  const parentOf = {ay:'dunya',io:'jupiter',europa:'jupiter',titan:'saturn',enceladus:'saturn'};
  const order = sections.flatMap(([, ,ids])=>ids);
  const catalog = [...window.AstroCatalog].sort((a,b)=>{
    const rank=id=>order.includes(id)?order.indexOf(id):order.length;
    return rank(a.id)-rank(b.id);
  });
  const byId = new Map(catalog.map(object=>[object.id,object]));
  const extra = catalog.filter(object=>!order.includes(object.id)).map(object=>object.id);
  if(extra.length)sections.push(['other','Other objects',extra]);
  const $ = id => document.getElementById(id);
  const categories = [['tumu','All'],['gunes-sistemi','Solar system'],['yildizlar','Stars'],['derin-uzay','Deep space']];
  const normalize = text => String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
  let category = 'tumu', selected = null;
  $('catalog-total').textContent='01 — '+catalog.length;

  const settings = typeof site === 'undefined' ? {} : site;
  const fullName = [settings.ad,settings.ikinciAd].filter(Boolean).join(' ') || 'Kutay';
  $('wordmark').textContent = settings.ad || 'Kutay';
  if (settings.ikinciAd) {
    const surname = document.createElement('em');
    surname.textContent = settings.ikinciAd;
    $('wordmark').append(' ',surname);
  }
  $('astro-credit').textContent = `${fullName} · ${new Date().getFullYear()} · Astronomy`;

  function animationState(playing) {
    $('toggle-animation').textContent = playing ? 'Ⅱ Pause' : '▷ Play';
    $('toggle-animation').setAttribute('aria-label', playing ? 'Pause animation' : 'Play animation');
    $('animation-status').textContent = playing ? 'Animating' : 'Paused';
  }
  const canvas = $('space-canvas');
  const scene = typeof window.AstroScene === 'function' ? new window.AstroScene(canvas,animationState) : null;
  if (scene?.available) {
    $('scene-poster').hidden = true;
    canvas.hidden = false;
    ['toggle-animation','animation-speed','reset-view','scene-zoom','scene-phase'].forEach(id => {$(id).disabled=false;});
    animationState(scene.playing);
    canvas.addEventListener('astrozoom',e=>{$('scene-zoom').value=String(e.detail);});
    $('scene-zoom').addEventListener('input',e=>scene.setZoom(e.target.value));
    $('scene-phase').addEventListener('input',e=>scene.setPhase(e.target.value));
    $('toggle-sun').addEventListener('click',()=>{
      scene.showSun=!scene.showSun;scene.draw();
      $('toggle-sun').setAttribute('aria-pressed',String(scene.showSun));
      $('sun-location-note').hidden=!scene.showSun;
    });
    $('toggle-animation').addEventListener('click',() => scene.setPlaying(!scene.playing));
    $('animation-speed').addEventListener('change',e => scene.setSpeed(e.target.value));
    $('reset-view').addEventListener('click',() => {scene.reset();scene.setSpeed(1);$('animation-speed').value='1';$('scene-zoom').value='1';$('scene-phase').value='-0.65';});
  } else {
    $('scene-poster').removeAttribute('role');
    $('scene-poster').removeAttribute('aria-label');
    $('scene-poster').replaceChildren();
    const notice=document.createElement('p');
    notice.textContent='The interactive view is unavailable. You can still explore every object’s information.';
    $('scene-poster').append(notice);
    $('scene-help').textContent='Use a browser with Canvas support for the interactive view.';
    $('animation-status').textContent='Text view';
  }

  function filtered() {
    const query=normalize($('object-search').value.trim());
    return catalog.filter(object => (category==='tumu'||object.category===category) &&
      normalize(`${object.name} ${object.type} ${object.subtitle} ${object.id} ${byId.get(parentOf[object.id])?.name||''}`).includes(query));
  }
  function updateSelection() {
    $('object-list').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.id===selected?.id)));
  }
  function renderList() {
    const objects=filtered();
    const matches=new Set(objects.map(object=>object.id));
    const visible=new Set(matches);
    for(const object of objects)if(parentOf[object.id])visible.add(parentOf[object.id]);
    $('object-list').replaceChildren();
    function objectRow(object) {
      const li=document.createElement('li'), button=document.createElement('button');
      button.type='button';button.className='astro-object-button';button.dataset.id=object.id;
      button.setAttribute('aria-pressed',String(selected?.id===object.id));
      const mini=document.createElement('span');mini.className='astro-mini';mini.dataset.kind=object.kind;mini.setAttribute('aria-hidden','true');
      const text=document.createElement('span');text.textContent=object.name;
      const subtitle=document.createElement('small');
      subtitle.textContent=parentOf[object.id]?`Moon of ${byId.get(parentOf[object.id]).name}`:object.subtitle;
      if(!matches.has(object.id))subtitle.textContent='Parent planet';
      text.append(subtitle);
      if(parentOf[object.id])button.setAttribute('aria-label',`${object.name}, moon of ${byId.get(parentOf[object.id]).name}`);
      const dot=document.createElement('span');dot.className='astro-selected-dot';dot.setAttribute('aria-hidden','true');
      button.append(mini,text,dot);
      button.addEventListener('click',() => selectObject(object,true));
      li.append(button);
      const moons=catalog.filter(moon=>parentOf[moon.id]===object.id&&visible.has(moon.id));
      if(moons.length){
        const children=document.createElement('ul');children.className='astro-moon-list';
        children.setAttribute('aria-label',`${object.name} moons`);
        for(const moon of moons)children.append(objectRow(moon));
        li.append(children);
      }
      return li;
    }
    for(const [id,title,ids] of sections){
      const roots=ids.map(id=>byId.get(id)).filter(object=>object&&visible.has(object.id)&&!parentOf[object.id]);
      if(!roots.length)continue;
      const section=document.createElement('li'),heading=document.createElement('h3'),list=document.createElement('ul');
      section.className='astro-catalog-group';heading.className='astro-group-title';heading.id=`catalog-group-${id}`;heading.textContent=title;
      list.className='astro-group-list';list.setAttribute('aria-labelledby',heading.id);
      for(const object of roots)list.append(objectRow(object));
      section.append(heading,list);$('object-list').append(section);
    }
    const searching=$('object-search').value.trim().length>0;
    $('object-count').textContent=searching?`${objects.length} ${objects.length===1?'match':'matches'}`:`${objects.length} objects`;
    $('empty-state').hidden=objects.length!==0;
    return objects;
  }
  function selectObject(object,saveHash=false) {
    selected=object;
    const index=catalog.indexOf(object)+1;
    document.title=`${object.name} · Astronomy — ${fullName}`;
    $('object-title').textContent=object.name;
    $('object-type').textContent=object.type;
    $('object-intro').textContent=object.intro;
    $('technical-facts').replaceChildren();
    for(const [label,value] of object.technical||[]) {
      const dt=document.createElement('dt'),dd=document.createElement('dd');
      dt.textContent=label;dd.textContent=value;$('technical-facts').append(dt,dd);
    }
    $('orbital-section').hidden=!object.orbit;
    $('orbit-note').textContent=object.orbitNote||'';
    $('orbit-reference').textContent=object.orbitReference||'';
    $('orbit-reference').parentElement.open=false;
    $('orbit-elements').replaceChildren();
    for(const [label,value,unit] of object.orbit||[]) {
      const tr=document.createElement('tr'),th=document.createElement('th');th.scope='row';th.textContent=label;tr.append(th);
      for(const text of [value.toLocaleString('en-US',{maximumFractionDigits:8}),unit]) {const td=document.createElement('td');td.textContent=text;tr.append(td);}
      $('orbit-elements').append(tr);
    }
    $('object-highlight').textContent=object.highlight;
    $('object-appearance').textContent=object.appearance;
    $('explanation-title').textContent=object.question;
    $('object-explanation').textContent=object.explanation;
    $('object-model-note').textContent=object.modelNote;
    $('scene-help').textContent=(object.kind==='nebula'
      ? 'Drag to move this illustrative view. '
      : 'Drag to rotate. ')
      +'Scroll to zoom. Arrow keys also work. Reset restores the initial view.';
    $('scene-name').textContent=object.name.toUpperCase();
    $('scene-caption').textContent=object.sceneLabel;
    $('scene-category').textContent=`${object.group} / ${String(index).padStart(2,'0')}`;
    $('object-source').href=object.source;
    $('object-source').textContent='Source ↗';
    if(object.kind==='whitedwarf')$('scene-help').textContent+=' The grid shown while dragging is an orientation guide, not a surface feature.';
    $('object-facts').replaceChildren();
    for (const [label,value,unit] of object.facts) {
      const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd'),small=document.createElement('small');
      dt.textContent=label;dd.textContent=value;small.textContent=unit;dd.append(small);row.append(dt,dd);$('object-facts').append(row);
    }
    canvas.setAttribute('aria-label',`${object.name}: ${object.appearance}`);
    if(scene?.available)scene.setObject(object);
    $('toggle-sun').hidden=object.id!=='samanyolu';$('toggle-sun').disabled=!scene?.available;
    $('toggle-sun').setAttribute('aria-pressed','false');$('sun-location-note').hidden=true;
    $('scene-zoom').value='1';$('scene-phase').value='-0.65';
    $('phase-control').hidden=['sun','reddwarf','sunlike','redgiant','whitedwarf','neutron','blackhole','galaxy','andromeda','nebula'].includes(object.kind);
    updateSelection();
    $('selection-status').textContent=`${object.name} selected. Model and information updated.`;
    if (saveHash && location.hash!==`#${object.id}`) {
      // file:// için de çalışır. Tarayıcı geçmişinde geri/ileri seçimleri korunur.
      try {history.pushState(null,'',`#${object.id}`);} catch {location.hash=object.id;}
    }
  }
  function updateFilters() {
    $('category-filters').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.category===category)));
  }
  for (const [id,name] of categories) {
    const button=document.createElement('button');button.type='button';button.className='astro-filter';
    button.textContent=name;button.dataset.category=id;button.setAttribute('aria-pressed',String(id===category));
    button.addEventListener('click',() => {
      category=id;updateFilters();const objects=renderList();
      if(objects.length&&!objects.some(object=>object.id===selected?.id))selectObject(objects[0],true);
    });
    $('category-filters').append(button);
  }
  $('object-search').addEventListener('input',renderList);
  $('clear-filters').addEventListener('click',() => {category='tumu';$('object-search').value='';updateFilters();renderList();$('object-search').focus();});

  function fromHash() {
    let hash='';
    try {hash=decodeURIComponent(location.hash.slice(1));} catch { /* Bozuk URL: varsayılan cisme dön. */ }
    return catalog.find(object=>object.id===hash)||catalog.find(object=>object.id==='saturn')||catalog[0];
  }
  window.addEventListener('hashchange',() => {
    const object=fromHash();
    if (!filtered().some(item=>item.id===object.id)) {category='tumu';$('object-search').value='';updateFilters();renderList();}
    selectObject(object);
  });
  renderList();selectObject(fromHash());
})();
