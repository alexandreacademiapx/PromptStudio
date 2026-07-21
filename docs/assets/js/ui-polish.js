(function(){
  'use strict';

  var doc = document;
  var body = doc.body;

  function make(tag, className, text){
    var el = doc.createElement(tag);
    if(className) el.className = className;
    if(typeof text === 'string') el.textContent = text;
    return el;
  }

  function addHeader(panel, title, eyebrow){
    if(!panel || panel.querySelector(':scope > .clean-work-header')) return;
    var header = make('div','clean-work-header');
    var copy = make('div','clean-work-header__copy');
    copy.appendChild(make('span','',eyebrow));
    copy.appendChild(make('h1','',title));
    header.appendChild(copy);
    panel.insertBefore(header,panel.firstChild);
  }

  function addSectionHead(card,index,title){
    if(!card || card.querySelector(':scope > .clean-section-head')) return;
    var button = make('button','clean-section-head');
    button.type = 'button';
    button.setAttribute('aria-expanded','true');
    var titleWrap = make('span','clean-section-head__title');
    titleWrap.appendChild(make('span','clean-section-head__index',index));
    titleWrap.appendChild(make('span','',title));
    var toggle = make('span','clean-section-head__toggle','\u2212');
    toggle.setAttribute('aria-hidden','true');
    button.appendChild(titleWrap);
    button.appendChild(toggle);
    button.addEventListener('click',function(){
      var collapsed = card.classList.toggle('clean-collapsed');
      button.setAttribute('aria-expanded',String(!collapsed));
      toggle.textContent = collapsed ? '+' : '\u2212';
    });
    card.insertBefore(button,card.firstChild);
  }

  function stopDecorativeVideo(){
    doc.querySelectorAll('video').forEach(function(video){
      try{ video.pause(); }catch(error){}
      video.autoplay = false;
      video.preload = 'none';
    });
  }

  var lowPower = false;
  try{
    lowPower = Boolean(
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType || ''))) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }catch(error){}
  if(lowPower) body.classList.add('clean-economy');
  stopDecorativeVideo();
  doc.addEventListener('visibilitychange',function(){ if(doc.hidden) stopDecorativeVideo(); });

  addHeader(doc.getElementById('panel-gerador'),'Prompt Studio','Creative direction system');
  addHeader(doc.getElementById('panel-guia'),'Guia de dire\u00e7\u00e3o','Biblioteca pr\u00e1tica');

  var sidebar = doc.querySelector('.hero');
  var modeWrap = doc.querySelector('.mode-toggle-wrap');
  if(sidebar && modeWrap && !sidebar.querySelector(':scope > .mode-toggle-wrap')){
    sidebar.querySelectorAll(':scope > .tabs [data-tab]').forEach(function(button){
      var icon = doc.createElement('img');
      icon.className = 'clean-nav-icon';
      icon.alt = '';
      icon.setAttribute('aria-hidden','true');
      icon.src = button.dataset.tab === 'guia' ? './media/icon-guide.svg' : './media/icon-generator.svg';
      button.insertBefore(icon,button.firstChild);
    });
    var divider = make('div','clean-sidebar-divider');
    divider.setAttribute('aria-hidden','true');
    sidebar.appendChild(divider);
    sidebar.appendChild(modeWrap);
    var collapse = make('button','clean-sidebar-collapse');
    collapse.type = 'button';
    collapse.setAttribute('aria-label','Recolher navega\u00e7\u00e3o lateral');
    collapse.setAttribute('aria-expanded','true');
    sidebar.appendChild(collapse);
    if(window.matchMedia('(max-width:860px)').matches){
      body.classList.add('clean-sidebar-collapsed');
      collapse.setAttribute('aria-expanded','false');
      collapse.setAttribute('aria-label','Abrir navega\u00e7\u00e3o lateral');
    }
    collapse.addEventListener('click',function(){
      var collapsed = body.classList.toggle('clean-sidebar-collapsed');
      collapse.setAttribute('aria-expanded',String(!collapsed));
      collapse.setAttribute('aria-label',collapsed ? 'Abrir navega\u00e7\u00e3o lateral' : 'Recolher navega\u00e7\u00e3o lateral');
    });
    sidebar.querySelectorAll('[data-tab],[data-mode]').forEach(function(button){
      button.addEventListener('click',function(){
        if(window.matchMedia('(max-width:860px)').matches) body.classList.add('clean-sidebar-collapsed');
      });
    });
  }

  var sceneCard = doc.querySelector('.stage-card-scene');
  var techCard = doc.querySelector('.stage-card-tech');
  addSectionHead(sceneCard,'01','Ideia e dire\u00e7\u00e3o');
  addSectionHead(techCard,'02','T\u00e9cnica e formato');

  function openCard(card){
    if(!card) return;
    card.classList.remove('mobile-step-collapsed','clean-collapsed');
    var cleanToggle = card.querySelector(':scope > .clean-section-head');
    if(cleanToggle){
      cleanToggle.setAttribute('aria-expanded','true');
      var glyph = cleanToggle.querySelector('.clean-section-head__toggle');
      if(glyph) glyph.textContent = '\u2212';
    }
    var legacyToggle = card.querySelector(':scope > .mobile-step-toggle');
    if(legacyToggle) legacyToggle.setAttribute('aria-expanded','true');
  }

  doc.querySelectorAll('.stage-card[data-mobile-step]').forEach(function(card){
    card.classList.remove('mobile-step-collapsed');
  });

  var personaChips = doc.getElementById('personaChipsMain');
  if(personaChips){
    personaChips.addEventListener('click',function(event){
      var chip = event.target.closest('.persona-chip[data-persona]');
      if(!chip || chip.classList.contains('clear')) return;
      window.setTimeout(function(){ openCard(techCard); },0);
    });
  }

  doc.querySelectorAll('.mode-toggle [data-mode]').forEach(function(button){
    button.addEventListener('click',function(){
      window.setTimeout(function(){ openCard(techCard); },0);
    });
  });

  var quickFloat = doc.getElementById('quickFloat');
  if(quickFloat){
    quickFloat.style.left = 'auto';
    quickFloat.style.top = 'auto';
    quickFloat.style.right = window.innerWidth <= 860 ? '16px' : '22px';
    quickFloat.style.bottom = window.innerWidth <= 860 ? '96px' : '22px';
    var quickToggle = doc.getElementById('quickFloatToggle');
    function constrainQuickFloat(){
      if(quickFloat.classList.contains('is-minimized')) return;
      var margin = 12;
      var rect = quickFloat.getBoundingClientRect();
      var left = Math.min(Math.max(margin,rect.left),Math.max(margin,window.innerWidth - rect.width - margin));
      var top = Math.min(Math.max(margin,rect.top),Math.max(margin,window.innerHeight - rect.height - margin));
      quickFloat.style.left = left + 'px';
      quickFloat.style.top = top + 'px';
      quickFloat.style.right = 'auto';
      quickFloat.style.bottom = 'auto';
    }
    if(quickToggle){
      quickToggle.addEventListener('click',function(){ window.requestAnimationFrame(constrainQuickFloat); });
    }
    window.addEventListener('pointerup',function(){ window.requestAnimationFrame(constrainQuickFloat); });
    window.addEventListener('resize',function(){ window.requestAnimationFrame(constrainQuickFloat); });
  }

  var palettes = [
    {name:'Mineral',value:'carv\u00e3o profundo, cinza mineral, marfim, \u00e2mbar queimado e verde petr\u00f3leo',colors:['#080a0a','#626966','#e8e8e2','#ad7a43','#183a32']},
    {name:'Cromo frio',value:'preto absoluto, grafite, prata fria, azul a\u00e7o e branco \u00f3ptico',colors:['#050607','#303638','#818f96','#42606d','#eef4f5']},
    {name:'Solar',value:'marrom profundo, terracota, \u00e2mbar solar, areia clara e creme quente',colors:['#1a120c','#8c4c2d','#dfa75d','#e8cf9f','#f3e7cf']},
    {name:'Vinho',value:'preto vinho, bord\u00f4 profundo, vermelho queimado, rosa antigo e cinza rosado',colors:['#12080b','#4d1220','#923144','#c9838e','#d9c5c6']},
    {name:'Noir neon',value:'preto carbono, grafite azulado, verde-lima el\u00e9trico, prata e branco frio',colors:['#030505','#151b1c','#d8ff3e','#8d9998','#eff5f2']},
    {name:'Oceano noturno',value:'azul meia-noite, petr\u00f3leo, ciano profundo, cinza n\u00e9voa e branco salino',colors:['#050b14','#0c3038','#167e91','#96a8aa','#edf2ef']},
    {name:'Editorial pele',value:'preto suave, cacau, caramelo, pele quente e marfim luminoso',colors:['#100d0c','#4a3029','#a96d4c','#d7a27e','#f2dfcf']},
    {name:'Floresta luxo',value:'preto musgo, verde floresta, oliva seco, bronze e bege mineral',colors:['#080d09','#173d2a','#657348','#9d7141','#d8ccb3']},
    {name:'Ultravioleta',value:'preto violeta, ameixa, ultravioleta, lavanda cinza e prata lunar',colors:['#0b0710','#3b1749','#7037bd','#aa95bd','#d9d6df']},
    {name:'Cer\u00e2mica',value:'grafite, argila escura, terracota seca, areia e porcelana quente',colors:['#171716','#5b392d','#a45f45','#d6b795','#efe5d5']},
    {name:'Cl\u00ednica',value:'preto azulado, cinza t\u00e9cnico, azul gelo, menta p\u00e1lida e branco puro',colors:['#071014','#39464c','#9bc6d2','#c5e1d7','#f7fbfb']},
    {name:'Golden hour',value:'marrom noite, cobre, ouro fosco, p\u00eassego solar e creme',colors:['#21120c','#8a4928','#c99546','#e8a77e','#f6e7cc']},
    {name:'Pop prim\u00e1rio',value:'preto tinta, azul cobalto, vermelho vivo, amarelo sinal e branco',colors:['#08090b','#174ac6','#db3338','#f0ce2f','#f5f3eb']},
    {name:'Rosa industrial',value:'preto chumbo, vinho frio, rosa industrial, a\u00e7o rosado e cinza p\u00e9rola',colors:['#0b0a0c','#481927','#b45270','#b9959f','#ded7d9']},
    {name:'Deserto lunar',value:'preto espacial, cinza basalto, areia fria, azul lunar e branco poeira',colors:['#070708','#3c3e42','#a59c8d','#71869c','#e5e3de']},
    {name:'C\u00edtrico',value:'preto oliva, verde \u00e1cido, lima, amarelo c\u00edtrico e creme p\u00e1lido',colors:['#0c0e08','#617516','#b8e32a','#f0d447','#f2efd4']},
    {name:'Atlantis',value:'preto oceano, azul abissal, turquesa mineral, cobre oxidado e espuma',colors:['#040a0d','#0e3448','#2a8d8a','#8a6548','#dbe8e2']},
    {name:'Monocrom\u00e1tica',value:'preto absoluto, grafite, cinza m\u00e9dio, cinza claro e branco \u00f3ptico',colors:['#030303','#242424','#707070','#bdbdbd','#f5f5f3']},
    {name:'Pastel estranho',value:'carv\u00e3o, lil\u00e1s empoeirado, azul p\u00e1lido, verde s\u00e1lvia e amarelo manteiga',colors:['#19191b','#aa91b7','#9cb9c7','#aebc9e','#e1d89d']},
    {name:'Luxo rubi',value:'preto veludo, rubi profundo, vermelho joia, ouro envelhecido e marfim',colors:['#080506','#4b0717','#941a31','#a78346','#eee4ce']}
  ];

  var paletteInput = doc.getElementById('fPalette');
  var dnaFields = doc.querySelector('.visual-dna-panel .dna-fields');
  var paletteButtons = [];
  var paletteExpanded = false;

  function selectPalette(button,palette,writeValue){
    paletteButtons.forEach(function(item){
      var active = item === button;
      item.classList.toggle('is-active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    if(writeValue && paletteInput){
      paletteInput.value = palette.value;
      paletteInput.dispatchEvent(new Event('input',{bubbles:true}));
      paletteInput.dispatchEvent(new Event('change',{bubbles:true}));
    }
  }

  function closestPalette(){
    if(!paletteInput || !paletteInput.value.trim()) return palettes[0];
    var text = paletteInput.value.toLowerCase();
    var exact = palettes.find(function(palette){ return palette.value.toLowerCase() === text; });
    if(exact) return exact;
    if(/rubi|vinho|bord\u00f4|vermelho/.test(text)) return palettes[19];
    if(/lima|c\u00edtric|verde-?lima/.test(text)) return palettes[15];
    if(/violeta|lil\u00e1s|lavanda|ameixa/.test(text)) return palettes[8];
    if(/azul|prata|cromo|a\u00e7o/.test(text)) return palettes[1];
    if(/\u00e2mbar|terracota|areia|creme|dourado|ouro/.test(text)) return palettes[2];
    return palettes[0];
  }

  function syncPaletteVisual(){
    var selected = closestPalette();
    paletteButtons.forEach(function(button){
      var active = button.dataset.palette === selected.name;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-pressed',String(active));
    });
  }

  function updatePaletteCap(control,toggle,track){
    control.classList.toggle('is-expanded',paletteExpanded);
    paletteButtons.forEach(function(button,index){
      button.classList.toggle('clean-palette-deferred',!paletteExpanded && index >= 8);
    });
    toggle.textContent = paletteExpanded ? 'Ver menos' : 'Ver '+palettes.length+' paletas';
    toggle.setAttribute('aria-expanded',String(paletteExpanded));
    if(!paletteExpanded) track.scrollTo({left:0,behavior:'smooth'});
  }

  if(dnaFields && paletteInput){
    var control = make('div','clean-palette-control');
    var paletteHead = make('div','clean-palette-head');
    var paletteTitle = make('div','clean-palette-title');
    paletteTitle.appendChild(make('span','clean-palette-control__label','Paletas r\u00e1pidas'));
    paletteTitle.appendChild(make('small','',palettes.length+' dire\u00e7\u00f5es crom\u00e1ticas'));
    var paletteActions = make('div','clean-palette-actions');
    var prevPalette = make('button','clean-palette-arrow','\u2039');
    var nextPalette = make('button','clean-palette-arrow','\u203a');
    var paletteToggle = make('button','clean-palette-toggle');
    prevPalette.type = nextPalette.type = paletteToggle.type = 'button';
    prevPalette.setAttribute('aria-label','Paletas anteriores');
    nextPalette.setAttribute('aria-label','Pr\u00f3ximas paletas');
    paletteToggle.setAttribute('aria-expanded','false');
    paletteActions.appendChild(prevPalette);
    paletteActions.appendChild(nextPalette);
    paletteActions.appendChild(paletteToggle);
    paletteHead.appendChild(paletteTitle);
    paletteHead.appendChild(paletteActions);
    var options = make('div','clean-palette-options');
    options.setAttribute('role','list');
    options.setAttribute('aria-label','Paletas r\u00e1pidas');
    palettes.forEach(function(palette){
      var button = make('button','clean-palette-option');
      button.type = 'button';
      button.dataset.palette = palette.name;
      button.setAttribute('aria-pressed','false');
      button.setAttribute('aria-label','Aplicar paleta '+palette.name);
      button.setAttribute('role','listitem');
      var swatches = make('span','clean-palette-swatches');
      palette.colors.forEach(function(color){
        var swatch = make('i');
        swatch.style.backgroundColor = color;
        swatches.appendChild(swatch);
      });
      button.appendChild(swatches);
      button.appendChild(make('b','',palette.name));
      button.addEventListener('click',function(){ selectPalette(button,palette,true); });
      paletteButtons.push(button);
      options.appendChild(button);
    });
    prevPalette.addEventListener('click',function(){ options.scrollBy({left:-Math.max(260,options.clientWidth*.72),behavior:'smooth'}); });
    nextPalette.addEventListener('click',function(){ options.scrollBy({left:Math.max(260,options.clientWidth*.72),behavior:'smooth'}); });
    paletteToggle.addEventListener('click',function(){
      paletteExpanded = !paletteExpanded;
      updatePaletteCap(control,paletteToggle,options);
    });
    control.appendChild(paletteHead);
    control.appendChild(options);
    dnaFields.appendChild(control);
    paletteInput.addEventListener('input',syncPaletteVisual);
    updatePaletteCap(control,paletteToggle,options);
    syncPaletteVisual();
  }

  var inspirationGrid = doc.getElementById('inspirationGrid');
  var inspirationHead = doc.querySelector('.inspiration-head');
  var deckExpanded = false;
  var deckControl = null;

  function updateDeckCap(){
    if(!inspirationGrid) return;
    var visible = Array.prototype.filter.call(inspirationGrid.querySelectorAll('.inspiration-card'),function(card){
      return !card.hidden;
    });
    visible.forEach(function(card,index){
      card.classList.toggle('clean-deferred',!deckExpanded && index >= 12);
    });
    inspirationGrid.querySelectorAll('.inspiration-card[hidden]').forEach(function(card){
      card.classList.remove('clean-deferred');
    });
    if(deckControl){
      deckControl.textContent = deckExpanded ? 'Mostrar menos' : 'Ver '+visible.length+' refer\u00eancias';
      deckControl.setAttribute('aria-expanded',String(deckExpanded));
    }
  }

  if(inspirationGrid && inspirationHead){
    deckControl = make('button','clean-deck-control');
    deckControl.type = 'button';
    deckControl.setAttribute('aria-expanded','false');
    deckControl.addEventListener('click',function(){
      deckExpanded = !deckExpanded;
      updateDeckCap();
      if(!deckExpanded) inspirationGrid.scrollTo({left:0,behavior:'smooth'});
    });
    inspirationHead.appendChild(deckControl);
    updateDeckCap();

    var filters = doc.getElementById('inspirationFilters');
    if(filters){
      filters.addEventListener('click',function(){
        deckExpanded = false;
        window.setTimeout(updateDeckCap,0);
      });
    }
    inspirationGrid.addEventListener('click',function(){
      window.setTimeout(function(){
        var actionField = doc.getElementById('fAcao');
        if(actionField && !actionField.value.trim()){
          actionField.value = 'produto em repouso, composi\u00e7\u00e3o est\u00e1tica com leitura clara de forma, material e volume';
          actionField.dispatchEvent(new Event('input',{bubbles:true}));
          actionField.dispatchEvent(new Event('change',{bubbles:true}));
        }
        syncPaletteVisual();
        openCard(sceneCard);
        openCard(techCard);
      },60);
    });
  }

  var guideNav = doc.querySelector('.guide-mobile-nav');
  if(guideNav){
    guideNav.addEventListener('click',function(event){
      var chip = event.target.closest('.guide-mobile-chip');
      if(!chip) return;
      window.setTimeout(function(){ chip.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'}); },0);
    });
  }

  var guideVisuals = {
    planos: [
      {src:'./media/guide-plan-01-general.webp',alt:'Plano geral extremo com figura pequena dominada pela paisagem',label:'EXTREME WIDE',position:'center'},
      {src:'./media/guide-plan-02-aberto.webp',alt:'Plano aberto com personagem de corpo inteiro dentro da paisagem',label:'WIDE SHOT',position:'center'},
      {src:'./media/guide-plan-03-americano.webp',alt:'Plano americano enquadrando o personagem aproximadamente das coxas para cima',label:'COWBOY SHOT',position:'center 42%'},
      {src:'./media/guide-plan-04-medio.webp',alt:'Plano medio enquadrando o personagem aproximadamente da cintura para cima',label:'MEDIUM SHOT',position:'center 34%'},
      {src:'./media/guide-plan-05-meio-primeiro.webp',alt:'Meio primeiro plano enquadrado do peito para cima',label:'MEDIUM CLOSE-UP',position:'center 38%'},
      {src:'./media/guide-plan-06-primeiro.webp',alt:'Primeiro plano com rosto e ombros dominando o enquadramento',label:'CLOSE-UP',position:'center 36%'},
      {src:'./media/guide-plan-07-primeirissimo.webp',alt:'Primeirissimo plano isolando o olho e a microtextura da pele',label:'EXTREME CLOSE-UP',position:'center'},
      {src:'./media/guide-plan-08-detalhe.webp',alt:'Plano detalhe isolando forma, textura e acabamento de um anel',label:'DETAIL SHOT',position:'center'}
    ],
    lentes: [
      {src:'./media/guide-lens-01-ultra-wide.webp',alt:'Ambiente interno com perspectiva expandida, linhas convergentes e distorcao nas bordas de uma lente ultra wide',label:'ULTRA-WIDE DEPTH',position:'center'},
      {src:'./media/guide-lens-02-normal-wide.webp',alt:'Retrato ambiental com perspectiva natural de uma lente normal wide',label:'NATURAL PERSPECTIVE',position:'center'},
      {src:'./media/guide-lens-03-tele-retrato.webp',alt:'Cena com forte compressao de planos e fundo aproximado caracteristica de uma teleobjetiva',label:'TELE PORTRAIT',position:'center'},
      {src:'./media/guide-lens-04-anamorfica.webp',alt:'Still cinematografico horizontal com flare alongado caracteristico de lente anamorfica',label:'ANAMORPHIC FEEL',position:'center'},
      {src:'./media/guide-lens-05-fisheye.webp',alt:'Arquitetura com forte curvatura radial caracteristica de uma lente fisheye',label:'FISHEYE · RADIAL BEND',position:'center'},
      {src:'./media/guide-lens-06-macro-probe.webp',alt:'Macro extremo revelando microtextura e detalhes de insetos',label:'MACRO DETAIL',position:'center'},
      {src:'./media/guide-lens-07-vintage.webp',alt:'Retrato com contraste suave e carater optico vintage',label:'VINTAGE CHARACTER',position:'center 42%'}
    ]
  };

  doc.querySelectorAll('.guide-sec').forEach(function(section){
    var heading = section.querySelector('h2');
    if(!heading) return;
    var headingText = heading.textContent.trim().toLowerCase();
    var visualSet = headingText.indexOf('planos') === 0 ? guideVisuals.planos : headingText.indexOf('lentes') === 0 ? guideVisuals.lentes : null;
    if(!visualSet) return;
    if(visualSet === guideVisuals.lentes && !section.querySelector('.guide-visual-note')){
      var visualNote = make('p','guide-visual-note');
      visualNote.textContent = 'Os stills abaixo demonstram a assinatura visual de cada familia optica. A perspectiva final tambem depende da distancia entre camera, sujeito e fundo.';
      var lead = section.querySelector('.lead');
      if(lead) lead.insertAdjacentElement('afterend',visualNote);
    }
    section.querySelectorAll('.guide-card .svg-demo').forEach(function(figure,index){
      var visual = visualSet[index];
      if(!visual) return;
      var image = new Image();
      image.src = visual.src;
      image.alt = visual.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = 720;
      image.height = 450;
      image.addEventListener('error',function(){ figure.classList.add('guide-photo--fallback'); });
      figure.classList.add('guide-photo');
      figure.dataset.visualLabel = visual.label;
      figure.style.setProperty('--guide-photo-position',visual.position);
      figure.style.setProperty('--guide-photo-source','url("' + visual.src + '")');
      figure.insertBefore(image,figure.firstChild);
    });
  });

  var observer = null;
  if('IntersectionObserver' in window && !lowPower){
    observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('clean-visible');
          observer.unobserve(entry.target);
        }
      });
    },{rootMargin:'0px 0px -5% 0px',threshold:.05});
    doc.querySelectorAll('.stage-card').forEach(function(section){
      section.classList.add('clean-reveal');
      observer.observe(section);
    });
  }

  var startButton = doc.getElementById('startAppButton');
  if(startButton){
    startButton.addEventListener('click',function(){
      window.setTimeout(function(){
        stopDecorativeVideo();
        var first = doc.querySelector('.inspiration-filter');
        if(first) first.focus({preventScroll:true});
      },620);
    });
    if(new URLSearchParams(window.location.search).get('open') === '1'){
      window.setTimeout(function(){ startButton.click(); },80);
    }
  }
})();
