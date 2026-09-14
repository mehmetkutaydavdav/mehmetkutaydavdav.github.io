(() => {
  'use strict';
  const catalog = window.AstroCatalog;
  if (!Array.isArray(catalog) || !catalog.length) return;
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
      normalize(`${object.name} ${object.type} ${object.subtitle} ${object.id}`).includes(query));
  }
  function updateSelection() {
    $('object-list').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.id===selected?.id)));
  }
  function renderList() {
    const objects=filtered();
    $('object-list').replaceChildren();
    for (const object of objects) {
      const li=document.createElement('li'), button=document.createElement('button');
      button.type='button';button.className='astro-object-button';button.dataset.id=object.id;
      button.setAttribute('aria-pressed',String(selected?.id===object.id));
      const mini=document.createElement('span');mini.className='astro-mini';mini.dataset.kind=object.kind;mini.setAttribute('aria-hidden','true');
      const text=document.createElement('span');text.textContent=object.name;
      const subtitle=document.createElement('small');subtitle.textContent=object.subtitle;text.append(subtitle);
      const dot=document.createElement('span');dot.className='astro-selected-dot';dot.setAttribute('aria-hidden','true');
      button.append(mini,text,dot);
      button.addEventListener('click',() => selectObject(object,true));
      li.append(button);$('object-list').append(li);
    }
    $('object-count').textContent=`${objects.length} objects`;
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
    $('scene-help').textContent=(['blackhole','neutron','nebula'].includes(object.kind)
      ? 'Drag to move this illustrative view. '
      : 'Drag to rotate: the near side follows your pointer in any orientation. ')
      +'Scroll to zoom. Arrow keys also work. Reset restores the initial view.';
    $('scene-name').textContent=object.name.toUpperCase();
    $('scene-caption').textContent=object.sceneLabel;
    $('scene-category').textContent=`${object.group} / ${String(index).padStart(2,'0')}`;
    $('object-source').href=object.source;
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
    $('phase-control').hidden=['sun','redgiant','whitedwarf','neutron','blackhole','galaxy','andromeda','nebula'].includes(object.kind);
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
