/* === DATA:PERSONAS START === */
var PERSONAS = {
  retrato: 'modelo brasileira de 30 anos, pele oliva, traços marcantes, cabelo preto curto e geométrico, vestindo alfaiataria marfim ampla, expressão serena, presença editorial natural',
  moda: 'modelo brasileira de 26 anos, pele retinta, cabelo raspado, vestindo conjunto de seda azul-cobalto com silhueta fluida, styling minimalista, postura alongada e movimento natural',
  produto: 'frasco de perfume em vidro fumê, tampa metálica escovada, rótulo minimalista em preto e marfim, acabamento premium, produto novo e íntegro',
  campanha: 'protagonista brasileira de 32 anos em campanha de beleza, pele negra, cabelo cacheado preso, vestido escultural vermelho, atitude confiante, olhar direto para a câmera e presença magnética'
};
/* === DATA:PERSONAS END === */

/* === DATA:CREATIVE_TREATMENTS START === */
var CREATIVE_TREATMENTS = {
  commercial: {
    label:'Comercial',
    promptLabel:'Commercial',
    ui:'Clareza imediata, desejo, produto ou protagonista legível e acabamento publicitário premium.',
    direction:[
      'Build a premium advertising frame with immediate subject legibility, controlled visual hierarchy and a polished campaign finish.',
      'Treat the image as a high-end global campaign: desirable, precise, brand-safe and visually memorable without becoming obscure.',
      'Create an aspirational commercial image where every element supports the hero subject and the central message reads at a glance.',
      'Direct the frame with luxury-advertising restraint, tactile realism and a single unmistakable point of attention.',
      'Shape a contemporary commercial visual with clean storytelling, premium surface control and confident graphic clarity.',
      'Make the scene feel commissioned for a major launch campaign, balancing emotional desire with immediate product or subject recognition.',
      'Use disciplined advertising art direction: refined styling, purposeful color, clean separation and no irrelevant visual noise.',
      'Deliver a polished hero image with credible realism, elevated taste and enough simplicity to work across a complete campaign system.'
    ],
    composition:[
      'Use a clean hierarchy with one dominant hero, one supporting layer and deliberate negative space.',
      'Organize the frame around a strong graphic axis and a clear area of rest for campaign communication.',
      'Keep the silhouette instantly readable, with controlled asymmetry and no competing focal points.',
      'Use premium catalogue precision while preserving enough depth and gesture to avoid a sterile packshot.',
      'Balance the subject against a simple architectural or color-blocked structure with crisp separation.',
      'Compose for thumbnail impact first, then reward close viewing with restrained secondary detail.'
    ],
    material:[
      'Surfaces feel pristine yet tactile, with controlled highlights, believable texture and no synthetic plastic finish.',
      'Use refined material contrast between matte, gloss, glass, metal or fabric, keeping every reflection intentional.',
      'Treat color as a precise brand asset: limited palette, clean separation and controlled saturation.',
      'Keep set materials premium and physically credible, with subtle contact shadows and carefully managed specular response.',
      'Use translucent, polished or satin surfaces only where they improve product desire and shape readability.',
      'Favor immaculate construction, elegant edges and realistic microtexture over decorative clutter.'
    ],
    video:[
      'Motion behaves like a premium commercial reveal: concise, controlled and always serving recognition.',
      'Let the camera disclose the hero subject in one clean visual sentence, without ornamental movement.',
      'Use precise rhythm, elegant easing and a final frame that could function as the campaign key visual.',
      'Keep action readable throughout the shot and let material, light or gesture create the payoff.',
      'Build a controlled progression from context to hero detail, preserving brand and subject clarity.',
      'Make every movement feel choreographed for an advertising edit, with no dead time or chaotic drift.'
    ],
    seedance:[
      '以高端商业广告为目标，主体必须一眼可读，视觉层级清晰，整体完成度精致且可信。',
      '采用国际品牌广告的克制美学，画面具有明确主角、干净结构和高级材质表现。',
      '让主体成为唯一视觉核心，所有色彩、布景、光线和细节都服务于产品或人物识别。',
      '画面需要兼具商业吸引力与真实质感，避免无关装饰、视觉噪音和含糊焦点。',
      '以新品发布主视觉的标准进行艺术指导，保持精确、干净、可传播和令人向往。',
      '使用受控的色彩与材质对比，形成清楚的广告信息和高级的视觉记忆点。'
    ],
    seedanceVideo:[
      '运动方式像高端广告揭示镜头，简洁、稳定、精准，始终服务于主体识别。',
      '镜头从环境信息自然推进到主角细节，最后形成可作为广告主视觉的定格。',
      '动作与运镜经过精确编排，节奏清楚，没有多余漂移或无意义炫技。',
      '让材质、光线或人物动作形成明确的视觉回报，同时保持商业信息可读。'
    ]
  },
  cinematic: {
    label:'Cinema',
    promptLabel:'Cinematic',
    ui:'Narrativa implícita, luz motivada, profundidade e sensação de frame capturado no meio de uma história.',
    direction:[
      'Treat the frame as a decisive moment from a larger story, with an implied before and after rather than a posed tableau.',
      'Build cinematic tension through motivated light, spatial depth and a subject caught inside a believable unfolding event.',
      'Create a narrative still where environment, gesture and light reveal character without explaining everything literally.',
      'Direct the image with feature-film discipline: physical point of view, emotional subtext and controlled atmospheric depth.',
      'Make the frame feel discovered rather than arranged, while keeping every layer intentionally composed.',
      'Use cinematic realism with expressive blocking, practical light logic and a clear emotional turn inside the shot.',
      'Shape a filmic image with visual consequence: the subject has just acted, is acting, or is about to act.',
      'Favor narrative specificity, lived-in space and emotional restraint over generic cinematic color grading.'
    ],
    composition:[
      'Build foreground, subject plane and background as three readable narrative layers.',
      'Use off-axis balance and directional lines to suggest movement beyond the frame.',
      'Place the camera at a physically motivated viewpoint that feels present inside the scene.',
      'Let architecture or practical objects frame the subject without turning into decorative clutter.',
      'Use negative space as tension, distance or anticipation rather than empty decoration.',
      'Compose around a moment of interruption, arrival, departure, discovery or suspended decision.'
    ],
    material:[
      'The set feels lived-in and physically coherent, with atmosphere interacting naturally with light and surfaces.',
      'Use practical materials, restrained patina and believable environmental texture to create history without dirt for its own sake.',
      'Let glass, rain, haze, dust, fabric or reflections create depth while preserving subject legibility.',
      'Keep skin, wardrobe and architecture grounded in real surface behavior, never glossy CGI perfection.',
      'Use color temperature contrast motivated by the location, not an arbitrary teal-and-orange overlay.',
      'Allow subtle imperfection in surfaces and air so the scene feels inhabited rather than rendered.'
    ],
    video:[
      'Camera movement follows the emotional change in the scene, beginning with context and ending on consequence.',
      'Let blocking and camera movement reveal information progressively, as if this shot belongs inside a real sequence.',
      'Use restrained acceleration and deceleration so the camera feels operated by a person inside the space.',
      'Allow one motivated shift in focus, distance or angle to mark the dramatic beat.',
      'Keep motion continuous and spatially coherent, with atmosphere and light changing naturally as the camera moves.',
      'End on an emotionally charged composition rather than a generic centered hero pose.'
    ],
    seedance:[
      '把画面当作更大故事中的决定性瞬间，必须让观众感到事件发生之前与之后仍然存在。',
      '通过有动机的光线、空间纵深和人物调度建立电影叙事，而不是只套用电影调色。',
      '环境、动作与光线共同揭示人物状态，画面保留情绪潜台词和未说完的信息。',
      '采用真实的物理视点与电影场面调度，让镜头像身处事件内部，而不是旁观摆拍。',
      '画面看似被捕捉而非被僵硬安排，但前景、中景和背景仍然具有精确层次。',
      '强调叙事具体性、生活痕迹和克制情绪，避免空泛的电影感标签。'
    ],
    seedanceVideo:[
      '运镜跟随场景中的情绪变化，从环境信息开始，以事件结果或人物反应结束。',
      '通过人物调度与镜头运动逐步揭示信息，让镜头像真实电影段落中的一个镜头。',
      '运动速度自然克制，摄影机像由现场摄影师操作，并保持空间关系连续。',
      '只使用一次有明确动机的焦点、距离或角度变化来标记戏剧节点。'
    ]
  },
  art: {
    label:'Arte',
    promptLabel:'Art-driven',
    ui:'Metáfora visual, escala ou matéria transformada e uma composição menos previsível, sem perder o sujeito.',
    direction:[
      'Build the image around one clear visual metaphor derived from the subject, transforming reality without losing recognition.',
      'Treat the frame as contemporary image-making: concept first, one impossible rule and disciplined visual restraint.',
      'Create an art-directed world where scale, material or gravity changes in one coherent way that supports the central idea.',
      'Use surreal logic with photographic credibility, making the impossible feel physically present in front of the camera.',
      'Direct a gallery-grade campaign image with sculptural form, bold spatial decisions and a single memorable conceptual gesture.',
      'Let the subject interact with an altered material system, impossible architecture or transformed landscape that expresses the concept.',
      'Build visual poetry from contrast, repetition, suspension or metamorphosis while keeping the core message readable.',
      'Favor a strong authored proposition over decorative weirdness: every strange element must belong to the same idea.'
    ],
    composition:[
      'Use an unconventional but legible frame built around scale distortion, graphic repetition or sculptural negative space.',
      'Turn the subject silhouette into part of a larger abstract geometry without obscuring identity.',
      'Create tension through extreme placement, unexpected cropping or a deliberately unstable visual balance.',
      'Use symmetry only when it feels ritualistic or uncanny; otherwise prefer a bold off-center visual equation.',
      'Let one oversized, suspended, liquid or impossible form reorganize the entire frame.',
      'Compose with exhibition-scale clarity: one dominant gesture, controlled secondary detail and no random surreal clutter.'
    ],
    material:[
      'Introduce one transformed material system such as liquid chrome, translucent fabric, inflated mineral, colored glass or organic foam.',
      'Make materials tactile and physically convincing even when their scale, state or behavior is impossible.',
      'Use sculptural surfaces, iridescence, wet reflection, soft volume or crystalline structure as conceptual language, not decoration.',
      'Build the set from a limited family of materials so the surreal world remains coherent and art directed.',
      'Let color behave as matter through fog, gel, liquid, projection, stained glass or saturated architectural planes.',
      'Preserve microtexture, contact shadows and believable light interaction so the concept remains photographic rather than synthetic.'
    ],
    video:[
      'Let one material, spatial or gravitational rule transform continuously through the shot while the subject remains consistent.',
      'Use motion as the reveal of the concept, not as decoration: the impossible behavior should become clear over time.',
      'Move through the scene with confident, authored rhythm and one visually surprising transition grounded in the same metaphor.',
      'Allow scale, fabric, liquid, light or architecture to evolve around the subject without causing identity drift.',
      'Build toward a final tableau where the conceptual transformation becomes fully legible.',
      'Keep the surreal event physically coherent from frame to frame, with stable materials, shadows and spatial continuity.'
    ],
    seedance:[
      '围绕主体建立一个清晰的视觉隐喻，只改变一条现实规则，并保持主体身份与核心信息可读。',
      '以当代艺术影像的方式进行创作，概念优先，超现实元素克制且具有统一逻辑。',
      '让尺度、材质或重力发生一种连贯变化，使不可能的场景仍然具有摄影真实感。',
      '采用雕塑化造型、强烈空间关系和单一记忆点，避免无意义的奇怪元素堆叠。',
      '让人物或产品与液态、透明、膨胀、悬浮或建筑化材质系统发生明确互动。',
      '通过对比、重复、悬浮或形态变化形成视觉诗意，同时保持画面信息清楚。'
    ],
    seedanceVideo:[
      '在整个镜头中只让一种材质、空间或重力规则持续变化，主体身份必须稳定。',
      '运动本身负责揭示概念，超现实变化需要随时间逐步变得清楚，而不是装饰性晃动。',
      '镜头具有明确作者节奏，并用一次符合核心隐喻的视觉转化形成惊喜。',
      '让尺度、布料、液体、光线或建筑围绕主体演化，同时保持连续阴影与空间逻辑。'
    ]
  }
};

var CREATIVE_INTENSITIES = {
  refined: {
    label:'Refinado',
    ui:'Intervenção sutil e elegante. A cena permanece plausível e o conceito aparece nos detalhes.',
    prompt:'Keep the intervention subtle, elegant and plausible.',
    seedance:'创意介入保持克制、优雅且可信，通过一个精确细节表达概念，不追求夸张奇观。'
  },
  expressive: {
    label:'Expressivo',
    ui:'Uma intervenção visual evidente, sem perder sujeito, produto ou mensagem.',
    prompt:'Make the intervention clearly visible while preserving immediate readability.',
    seedance:'创意介入需要清楚可见，同时保持主体身份、产品信息与核心概念立即可读。'
  },
  radical: {
    label:'Radical',
    ui:'Uma ruptura dominante de escala, matéria, espaço ou física, mantendo uma única ideia coerente.',
    prompt:'Push one coherent rupture in scale, material, space or physics.',
    seedance:'允许尺度、材质、空间或物理规律出现一次主导性突破，大胆推进，但所有元素必须服从同一个核心概念。'
  }
};

var PERSONA_TREATMENT_DEFAULTS = {
  retrato:'cinematic',
  moda:'art',
  produto:'commercial',
  campanha:'cinematic'
};

var CREATIVE_CONCEPT_PLACEHOLDERS = {
  retrato:'ex: a identidade dividida entre sombra mineral e luz translúcida',
  moda:'ex: o tecido se comporta como arquitetura em movimento',
  produto:'ex: um perfume como uma aurora líquida presa dentro do vidro',
  campanha:'ex: liberdade representada por um corpo suspenso sobre a cidade',
  base:'ex: uma ideia impossível apresentada como uma fotografia real'
};

var INSPIRATION_PRESETS = {
  orbital_glass:{
    label:'Orbital Glass', category:'commercial', persona:'produto', sourceId:108,
    subject:'frasco de perfume sem marca em vidro violeta fumê, forma orgânica escultural, tampa transparente e acabamento impecável',
    concept:'um perfume tratado como um objeto orbital suspenso sobre matéria líquida',
    environment:'estúdio preto profundo com uma lâmina rasa de cromo líquido perfeitamente refletivo',
    action:'', mood:'luxo futurista, precisão óptica e desejo silencioso',
    palette:'violeta profundo, prata fria, branco óptico e preto absoluto',
    materials:'vidro fumê, cromo líquido, metal polido e reflexos controlados',
    treatment:'commercial', intensity:'expressive', shotId:'detail', lensId:'makro65', lightId:'spotlight', stockId:'kodak_2383', aspectRatio:'4:5'
  },
  amber_matter:{
    label:'Amber Matter', category:'commercial', persona:'produto', sourceId:100,
    subject:'pote cosmético cilíndrico sem marca em acabamento marfim fosco, novo, íntegro e minimalista',
    concept:'o produto protegido por uma onda de matéria âmbar translúcida',
    environment:'cenário mineral de travertino claro com espaço negativo e luz suave de manhã',
    action:'', mood:'calor mineral, pureza tátil e luxo natural',
    palette:'marfim, âmbar dourado, areia clara e sombra quente',
    materials:'travertino poroso, gel âmbar translúcido, cerâmica fosca e luz difusa',
    treatment:'commercial', intensity:'refined', shotId:'cu', lensId:'otus85', lightId:'window_soft', stockId:'portra_400', aspectRatio:'4:5'
  },
  after_rain:{
    label:'After Rain', category:'cinematic', persona:'moda', sourceId:42,
    subject:'modelo brasileira adulta de cabelo preto curto molhado, usando alfaiataria preta escultural sem marcas',
    concept:'o instante silencioso depois de uma decisão irreversível',
    environment:'sob um viaduto brutalista depois da chuva, asfalto molhado e pilares desaparecendo na névoa',
    action:'parada de costas, gira lentamente o rosto para fora do quadro enquanto a chuva termina',
    mood:'tensão urbana, solidão magnética e narrativa em suspensão',
    palette:'azul petróleo, âmbar de sódio, preto profundo e concreto úmido',
    materials:'alfaiataria molhada, asfalto reflexivo, concreto bruto e névoa fina',
    treatment:'cinematic', intensity:'expressive', shotId:'cowboy', lensId:'k35_55', lightId:'practical_neon', stockId:'v3_500t_5219', aspectRatio:'4:5'
  },
  blue_passage:{
    label:'Blue Passage', category:'cinematic', persona:'campanha', sourceId:1,
    subject:'figura adulta solitária em roupa neutra grafite sem marcas, silhueta alongada e gesto contido',
    concept:'um caminho azul costura o corpo à arquitetura e conduz a narrativa para o horizonte',
    environment:'estrutura monumental de concreto pálido atravessando um deserto amplo ao entardecer',
    action:'caminha em direção ao arco principal puxando um longo tecido azul-cobalto ao vento',
    mood:'escala épica, melancolia serena e sensação de travessia',
    palette:'azul-cobalto, concreto cinza, areia fria e laranja distante',
    materials:'concreto poroso, seda pesada ao vento, areia seca e céu de crepúsculo',
    treatment:'cinematic', intensity:'expressive', shotId:'ews', lensId:'k35_24', lightId:'blue_hour', stockId:'ektachrome_e100', aspectRatio:'4:5'
  },
  crimson_bloom:{
    label:'Crimson Bloom', category:'art', persona:'moda', sourceId:58,
    subject:'modelo adulta andrógina de cabelo preto curto usando roupa branca minimalista sem marcas',
    concept:'o tecido se transforma em um organismo carmesim que floresce ao redor do corpo',
    environment:'estúdio seamless cinza-claro sem objetos ou horizonte visível',
    action:'permanece imóvel enquanto a estrutura têxtil se expande em uma forma orgânica monumental',
    mood:'estranheza elegante, energia biológica e presença escultórica',
    palette:'carmesim translúcido, branco frio, cinza mineral e sombras vinho',
    materials:'tecido translúcido, membrana orgânica, malha branca fosca e ar em movimento',
    treatment:'art', intensity:'radical', shotId:'cowboy', lensId:'otus85', lightId:'hard_flash', stockId:'ektachrome_e100', aspectRatio:'4:5'
  },
  chrome_ritual:{
    label:'Chrome Ritual', category:'art', persona:'', sourceId:19,
    subject:'esfera de vidro cobalto perfeitamente lisa flutuando entre flores monumentais de cromo líquido',
    concept:'a gravidade se dobra em torno de um núcleo azul tratado como um objeto ritual',
    environment:'câmara brutalista de concreto escuro com piso espelhado e abertura circular no teto',
    action:'a esfera permanece suspensa enquanto as pétalas metálicas se inclinam em direção ao centro',
    mood:'ritual tecnológico, silêncio monumental e surrealismo físico',
    palette:'azul-cobalto, prata cromada, grafite e luz branca glacial',
    materials:'vidro azul, cromo líquido, concreto escuro, água espelhada e feixe volumétrico',
    treatment:'art', intensity:'radical', shotId:'ws', lensId:'k35_18', lightId:'spotlight', stockId:'bleach_bypass', aspectRatio:'4:5'
  }
};

// Compact source data for the expanded deck. Every entry becomes a complete editable preset below.
var INSPIRATION_EXPANSION = {
  commercial:[
    ['silver_sonic','Silver Sonic','Tech','produto','fones over-ear sem marca em alumínio escovado','som tratado como uma escultura metálica em suspensão','estúdio grafite com pedestal cromado e sombra circular precisa','prata fria, grafite e branco óptico','alumínio escovado, couro fosco e cromo'],
    ['night_elixir','Night Elixir','Beauty','produto','frasco de perfume violeta sem marca com tampa de vidro','uma fragrância noturna condensada em um objeto luminoso','estúdio preto com névoa violeta muito fina e reflexo controlado','violeta elétrico, preto e prata','vidro colorido, acrílico e vapor'],
    ['ivory_ritual','Ivory Ritual','Skincare','produto','linha de skincare marfim sem textos ou logotipos','pureza clínica apresentada como ritual tátil','blocos de pedra clara banhados por luz difusa','marfim, areia e cinza pérola','cerâmica fosca, travertino e creme'],
    ['white_lift','White Lift','Footwear','produto','tênis branco minimalista sem marca, novo e impecável','leveza transformada em arquitetura flutuante','estúdio branco com planos inclinados e sombra azul suave','branco, gelo e azul pálido','mesh técnico, borracha e espuma'],
    ['obsidian_time','Obsidian Time','Watch','produto','relógio preto sem marca com caixa de aço polido','tempo preciso emergindo de uma superfície escura','mesa de obsidiana molhada sob recorte de luz','preto, prata e azul meia-noite','aço, vidro safira e pedra molhada'],
    ['sky_aluminum','Sky Aluminum','Beverage','produto','lata de bebida prateada sem marca com condensação','frescor absoluto contra uma escala de céu aberto','plano azul infinito com nuvens gráficas','azul-céu, prata e branco','alumínio, água e vapor frio'],
    ['burgundy_gold','Burgundy Gold','Jewelry','produto','brincos e anéis dourados sem assinatura visual','joias como pequenos corpos celestes sobre veludo','mesa vinho profunda com recortes de sombra','vinho, ouro e preto','ouro polido, veludo e vidro fumê'],
    ['quiet_form','Quiet Form','Furniture','produto','poltrona creme de desenho orgânico sem marca','conforto reduzido a uma forma silenciosa','interior brutalista claro com grande espaço negativo','creme, concreto e sombra quente','bouclé, madeira clara e concreto'],
    ['cobalt_frame','Cobalt Frame','Eyewear','produto','óculos de sol azul-cobalto sem marca','um acessório tratado como desenho óptico puro','placas translúcidas azuis em estúdio branco','cobalto, cristal e prata','acetato, vidro e acrílico'],
    ['coral_veil','Coral Veil','Beauty','produto','batom coral sem marca com acabamento metálico','cor e textura se expandem como uma dobra de seda','estúdio rosa queimado com tecido suspenso','coral, rosa seco e ouro pálido','metal, pigmento cremoso e seda'],
    ['black_pulse','Black Pulse','Tech','produto','caixa de som preta compacta sem marca','o grave visualizado por ondas concêntricas de luz','câmara escura com linhas de luz branca','preto, branco e violeta discreto','malha acústica, polímero e luz'],
    ['red_arc','Red Arc','Fashion','produto','bolsa vermelha estrutural sem logos','a silhueta do produto prolongada por um arco gráfico','estúdio bordô com pedestal curvo','vermelho vivo, bordô e preto','couro liso, metal e laca'],
    ['citrus_clear','Citrus Clear','Beverage','produto','garrafa transparente sem rótulo com líquido cítrico','energia solar capturada dentro de vidro gelado','mesa clara com fatias cítricas e sombras duras','amarelo-limão, vidro e branco','vidro, água, gelo e casca cítrica'],
    ['chrome_halo','Chrome Halo','Design','produto','luminária cromada minimalista sem marca','a própria luz desenha um halo material ao redor do objeto','estúdio cinza com parede curva e névoa baixa','prata, cinza e branco quente','cromo espelhado, vidro e luz difusa'],
    ['soft_stack','Soft Stack','Fashion','produto','pilha de roupas básicas neutras sem etiquetas','texturas cotidianas organizadas como composição editorial','mesa bege com luz lateral ampla','areia, cinza, branco e carvão','algodão, lã fina e linho'],
    ['morning_crema','Morning Crema','Food','produto','xícara de café artesanal sem marca com crema perfeita','o primeiro café tratado como um instante de luxo silencioso','mesa de pedra sob luz de manhã','caramelo, creme e marrom profundo','cerâmica, café, vapor e pedra'],
    ['electric_curve','Electric Curve','Mobility','produto','bicicleta urbana preta sem marca com quadro escultural','mobilidade como uma linha contínua desenhada no espaço','galeria industrial limpa com faixa de luz lateral','preto, prata e verde ácido discreto','fibra de carbono, borracha e alumínio'],
    ['aqua_serum','Aqua Serum','Skincare','produto','frasco conta-gotas azul-claro sem textos','hidratação visualizada como uma bolha de água perfeita','estúdio aquático translúcido com reflexos ondulados','aqua, branco e prata','vidro, água, gel e acrílico'],
    ['dune_noir','Dune Noir','Fragrance','produto','frasco de perfume preto sem marca, geometrico e impecavel','uma fragrancia noturna emerge como monolito de uma paisagem mineral','dunas escuras sob luz azul de estudio','preto, azul profundo e prata','vidro fumê, areia fina e metal escovado'],
    ['clay_court_tailoring','Clay Court Tailoring','Fashion','moda','homem adulto em alfaiataria azul sem marcas','elegancia formal deslocada para a geometria de uma quadra esportiva','quadra de tenis de saibro vazia','azul royal, terracota e branco','la fria, saibro e metal pintado'],
    ['western_still','Western Still','Portrait','retrato','homem maduro em camisa denim neutra e chapeu sem marca','um retrato comercial combina autenticidade, textura e silencio','interior de madeira iluminado por janela lateral','denim, madeira mel e sombra quente','algodao, couro e madeira'],
    ['street_interruption','Street Interruption','Campaign','campanha','duas figuras adultas em looks claros sem marcas','uma campanha urbana interrompe a rotina com um acontecimento impossivel','rua industrial ampla sob sol duro','branco, cinza, azul e pele natural','asfalto, algodao e metal'],
    ['city_audio','City Audio','Tech','produto','mulher adulta usando fones neutros sem logotipo','o som cria uma zona privada dentro do fluxo da cidade','passarela urbana de vidro e concreto','grafite, prata e azul frio','aluminio, couro fosco e vidro'],
    ['lived_in_blue','Lived In Blue','Lifestyle','campanha','mulher adulta em roupa casual neutra sem marcas','conforto cotidiano apresentado com intimidade editorial','sala residencial clara com sofa azul e objetos discretos','azul, creme e madeira clara','linho, madeira e ceramica'],
    ['stone_stance','Stone Stance','Fashion','moda','homem adulto em streetwear cinza sem logos','postura e escala transformam uma rua simples em editorial','rua europeia de pedra com perspectiva profunda','cinza, pedra e azul desaturado','nylon, algodao e calcario'],
    ['mirror_portal','Mirror Portal','Fashion','moda','mulher adulta em vestido azul minimalista sem marcas','um arco refletivo amplia a silhueta como simbolo de campanha','praca urbana diante de um portal espelhado','azul, prata e ceu cinza','tecido acetinado, espelho e pedra'],
    ['night_creator','Night Creator','Tech','campanha','mulher adulta trabalhando em notebook sem marcas','criatividade digital tratada como um momento de concentracao premium','interior noturno aquecido por luz de tela e luminaria','ambar, preto e azul de tela','aluminio, madeira e vidro'],
    ['red_double','Red Double','Fashion','moda','duas modelos adultas em vestidos vermelhos sem marcas','repeticao e simetria criam uma assinatura visual memoravel','galeria clara com linhas arquitetonicas diagonais','vermelho, branco e azul frio','tecido estruturado, vidro e concreto'],
    ['sunroom_release','Sunroom Release','Lifestyle','campanha','mulher adulta em conjunto amarelo neutro sem logos','energia e liberdade entram pela luz superior','terraco residencial claro sob grande claraboia','amarelo, branco e verde discreto','linho, concreto e vidro'],
    ['street_reflection','Street Reflection','Fashion','moda','homem adulto em casaco neutro sem marcas','o reflexo da vitrine duplica a presenca do personagem','rua comercial europeia na hora azul','marrom, azul petroleo e ambar','la, vidro e pedra molhada'],
    ['violet_ascent','Violet Ascent','Fashion','moda','mulher adulta em alfaiataria violeta sem marcas','uma subida arquitetonica transforma postura em icone','escadaria classica com luz lateral','violeta, creme e sombra azul','la fria, marmore e metal'],
    ['empty_decision','Empty Decision','Business','campanha','sala de reuniao vazia com cadeiras escuras','a ausencia de pessoas torna a decisao o verdadeiro produto','escritorio minimalista sob luz fria recortada','grafite, azul gelo e preto','vidro, couro e aluminio'],
    ['formal_amphibian','Formal Amphibian','Concept','campanha','personagem anfibio em smoking preto sem qualquer marca','sofisticacao e humor surreal convivem em uma imagem publicitaria','interior corporativo escuro e impecavel','verde profundo, preto e branco','tecido, pele umida e vidro'],
    ['slatted_light','Slatted Light','Fashion','moda','mulher adulta em vestido neutro sem marcas','faixas de luz esculpem o look com precisao editorial','corredor de madeira com persianas abertas','ambar, bege e sombra marrom','madeira, seda fosca e luz dura'],
    ['blue_tailoring','Blue Tailoring','Material','produto','detalhe de alfaiataria azul sem etiqueta ou logotipo','o tecido vira arquitetura por meio de dobra, costura e sombra','estudio azul monocromatico','azul cobalto, marinho e preto','la fria, linha e cetim'],
    ['midnight_reserve','Midnight Reserve','Beverage','campanha','homem adulto em camisa clara segurando um copo sem marca','um ritual noturno comunica maturidade e desejo silencioso','bar escuro com luz lateral cinematografica','azul noite, ambar e creme','vidro, linho e madeira escura']
  ],
  cinematic:[
    ['noon_backlot','Noon Backlot','Drama','campanha','mulher adulta em roupa neutra clara sem marcas','uma pausa decisiva sob o excesso de luz','rua de estúdio vazia ao meio-dia','olha para trás antes de atravessar a rua','calor, expectativa e silêncio','ocre, branco queimado e azul seco','asfalto, algodão e poeira'],
    ['wood_room','Wood Room','Drama','retrato','homem adulto em camisa neutra sem marcas','memória e tensão contidas em um interior antigo','sala anos 1970 revestida de madeira','permanece sentado com as mãos tensas sobre a mesa','intimidade, dúvida e peso emocional','âmbar, tabaco e verde oliva','madeira, tecido gasto e vidro'],
    ['gravity_gym','Gravity Gym','Sport','campanha','atleta adulta com roupa esportiva neutra sem logos','força humana isolada contra uma escala monumental','ginásio escuro com um globo branco suspenso','avança para o centro enquanto pó sobe do piso','energia controlada e grandeza','preto, branco e azul aço','borracha, magnésio e metal'],
    ['last_escalator','Last Escalator','Urban','campanha','figura adulta em sobretudo cinza sem marca','uma viagem urbana sem destino declarado','estação brutalista vazia com escada rolante','sobe sozinha sem olhar para a câmera','solidão moderna e movimento contínuo','cinza, verde frio e âmbar','concreto, aço e tecido pesado'],
    ['rain_witness','Rain Witness','Suspense','retrato','rosto adulto parcialmente visto através do vidro','uma presença observa a cidade sem ser notada','interior de carro sob chuva noturna','mantém os olhos fixos além do para-brisa','suspense íntimo e paranoia suave','azul petróleo, vermelho distante e preto','vidro molhado, couro e néon'],
    ['yellow_table','Yellow Table','Surreal','campanha','duas pessoas adultas em roupas neutras com um mascote amarelo abstrato','o cotidiano aceita uma presença impossível','lanchonete vazia de luz fluorescente','dividem a mesa em silêncio absoluto','humor estranho e narrativa aberta','amarelo, creme e verde hospitalar','vinil, fórmica e pelúcia'],
    ['wet_crossing','Wet Crossing','Ensemble','campanha','grupo diverso de adultos em roupas urbanas sem marcas','trajetórias diferentes se cruzam por um segundo','avenida molhada sob prédios altos','atravessam em direções opostas sem contato','ritmo metropolitano e tensão coletiva','ciano, grafite e laranja de trânsito','asfalto molhado, nylon e vidro'],
    ['runway_blue','Runway Blue','Youth','moda','jovem skatista adulta em look azul neutro sem logos','velocidade e liberdade ocupam uma pista vazia','pista de aeroporto desativada ao entardecer','desliza em diagonal enquanto o tecido responde ao vento','euforia limpa e juventude','azul royal, cinza e pôr do sol pálido','denim, concreto e vento'],
    ['doorway_amber','Doorway Amber','Portrait','retrato','mulher adulta com roupa preta minimalista sem marcas','um retrato construído entre proteção e exposição','corredor escuro com porta iluminada em âmbar','fica imóvel na fronteira entre sombra e luz','mistério, força e contenção','preto, âmbar e marrom profundo','tecido fosco, madeira e poeira luminosa'],
    ['neon_turn','Neon Turn','Action','campanha','motociclista adulta com equipamento preto sem logos','velocidade recortada por uma cidade elétrica','viaduto noturno com néon refletido no piso','inclina a moto em uma curva fechada','adrenalina e precisão','magenta, ciano e preto','metal, borracha, chuva e néon'],
    ['concrete_silence','Concrete Silence','Drama','retrato','homem adulto em camiseta cinza neutra','um corpo pequeno diante de uma arquitetura opressiva','pátio de concreto com paredes monumentais','caminha lentamente para uma faixa de luz','austeridade e introspecção','cinza mineral, preto e branco frio','concreto, algodão e poeira'],
    ['glass_dawn','Glass Dawn','Fashion','moda','modelo adulta em alfaiataria creme sem marcas','delicadeza e estrutura despertam juntas','estufa de vidro ao amanhecer com condensação','atravessa as plantas tocando o vidro úmido','renovação e elegância silenciosa','verde névoa, creme e prata','vidro, folhagem e lã fria'],
    ['city_frequency','City Frequency','Urban','campanha','mulher adulta usando fones neutros e casaco grafite','a cidade desaparece quando o som começa','calçada movimentada com fundo em arrasto','caminha em foco enquanto o entorno se dissolve','imersão e autonomia','grafite, azul elétrico e pele natural','tecido técnico, vidro e luz urbana'],
    ['station_archive','Station Archive','Travel','campanha','viajante adulta com mala sem marca e sobretudo marrom','uma partida carrega vestígios de muitas histórias','plataforma ferroviária antiga com vapor baixo','espera diante de um trem que ainda não chegou','nostalgia e possibilidade','marrom, azul fumaça e âmbar','couro, aço, vapor e pedra'],
    ['night_curve','Night Curve','World','campanha','pequeno grupo de adultos em roupa neutra escura','a arquitetura curva conduz uma procissão silenciosa','vale noturno com parede branca sinuosa','segue em fila a curva até desaparecer','escala, rito e estranheza','azul-noite, branco e preto','pedra, concreto e tecido'],
    ['rooftop_weather','Rooftop Weather','Drama','campanha','mulher adulta em casaco longo neutro sem marca','uma decisão pessoal enfrenta a chegada da tempestade','cobertura urbana ampla sob nuvens densas','avança contra o vento segurando o casaco','urgência e coragem contida','chumbo, azul frio e pele quente','lã, concreto molhado e vento'],
    ['red_coast','Red Coast','Fashion','moda','modelo adulta em roupa preta minimalista com tecido vermelho','cor e vento desenham uma presença na paisagem','falésia costeira sob céu cinza','permanece firme enquanto o tecido vermelho se abre','romance épico e risco','vermelho, preto e cinza oceânico','seda, rocha e espuma do mar'],
    ['window_transit','Window Transit','Portrait','retrato','homem adulto em camisa neutra visto junto à janela','a viagem transforma o reflexo em memória','interior de trem durante a hora azul','observa o exterior enquanto seu rosto se duplica no vidro','melancolia e passagem do tempo','azul, âmbar suave e cinza','vidro, tecido e luz em movimento'],
    ['morning_song','Morning Song','Drama','retrato','homem adulto tocando violao em roupa neutra sem marcas','uma musica domestica suspende a passagem da manha','cozinha antiga tomada por luz e fumaca suave','toca uma sequencia curta olhando para fora do quadro','intimidade, memoria e calor','ambar, azul cinza e madeira','madeira, algodao e vapor'],
    ['corner_witnesses','Corner Witnesses','Urban','campanha','grupo diverso de adultos em roupas urbanas sem logos','desconhecidos compartilham um instante de alerta na esquina','rua estreita entre predios antigos','todos observam algo fora de quadro em direcoes diferentes','tensao coletiva e curiosidade','cinza, marrom e verde frio','concreto, algodao e metal'],
    ['last_skater','Last Skater','Youth','campanha','skatista adulto em roupa escura neutra','o ultimo movimento do dia recorta uma silhueta contra o horizonte','pista vazia ao anoitecer','desliza sozinho em uma linha longa','liberdade, distancia e fim de tarde','azul profundo, laranja e preto','concreto, borracha e vento'],
    ['shared_table','Shared Table','Drama','campanha','grupo de amigos adultos em roupas neutras','uma conversa importante acontece no meio de um jantar simples','apartamento antigo iluminado por luminarias quentes','brindam enquanto uma pessoa permanece em silencio','afeto, tensao e verdade cotidiana','ambar, verde oliva e marrom','madeira, vidro e tecido'],
    ['night_carriage','Night Carriage','Urban','retrato','mulher adulta em jaqueta colorida sem logos','uma viagem curta se torna um retrato de independencia','vagao de metro noturno com reflexos frios','permanece em pe enquanto o trem atravessa tuneis','movimento, isolamento e energia urbana','ciano, amarelo e preto','nylon, vidro e metal'],
    ['laser_crowd','Laser Crowd','Music','campanha','multidao adulta em silhueta sem marcas visiveis','a musica transforma o espaco em linhas de velocidade','show noturno com feixes convergentes','levanta os bracos diante do palco','euforia, escala e pulsacao','laranja, vermelho e preto','luz volumetrica, fumaca e tecido'],
    ['long_walk','Long Walk','Urban','campanha','homem adulto em roupa casual neutra','um deslocamento cotidiano ganha peso de decisao','rua estreita entre edificios altos','caminha em direcao a camera sem desviar o olhar','foco, solidao e determinacao','grafite, azul frio e pele quente','asfalto, algodao e vidro'],
    ['ceiling_silence','Ceiling Silence','Drama','retrato','homem adulto sozinho em roupa escura neutra','a distancia vertical transforma espera em vulnerabilidade','sala vazia vista de cima','permanece sentado sem movimento','isolamento e suspensao','verde cinza, preto e madeira clara','concreto, tecido e madeira'],
    ['brick_horizon','Brick Horizon','Portrait','retrato','mulher adulta de cabelo volumoso em jaqueta neutra','a cidade ao fundo funciona como memoria e futuro','cobertura de tijolos sob ceu nublado','encara o horizonte antes de virar para a camera','presenca, expectativa e dignidade','marrom, azul cinza e pele natural','tijolo, denim e vento'],
    ['underground_smile','Underground Smile','Urban','retrato','mulher adulta em casaco vinho sem marcas','um sorriso espontaneo quebra a frieza da estacao','plataforma subterranea quase vazia','caminha olhando lateralmente','leveza, movimento e proximidade','vinho, verde frio e preto','la, azulejo e metal'],
    ['window_departure','Window Departure','Drama','retrato','mulher adulta em jaqueta denim neutra','luz de janela marca o instante anterior a uma partida','galpao industrial vazio','permanece parada diante da janela respirando fundo','decisao, calma e despedida','azul, cinza e ambar','denim, tijolo e poeira'],
    ['forest_stand','Forest Stand','World','retrato','homem adulto em casaco preto sem marcas','uma figura imovel mede forcas com a densidade da floresta','mata alta umida sob luz difusa','fica parado entre as arvores olhando para frente','mistério, resistencia e escala','verde profundo, preto e cinza','folhagem, la e nevoa'],
    ['carpet_after','Carpet After','Drama','campanha','mulher adulta deitada em vestido neutro','o silencio apos um acontecimento domina o quadro','sala antiga com tapete persa','permanece imovel olhando para o teto','ambiguidade, exaustao e memoria','vinho, bege e marrom','tapete, tecido e madeira'],
    ['moving_wait','Moving Wait','Urban','retrato','homem adulto em moletom escuro sem logos','a escada se move enquanto o personagem permanece suspenso','estacao moderna de concreto e metal','senta sozinho olhando para cima','espera, distancia e fluxo','cinza, verde frio e preto','concreto, borracha e aluminio'],
    ['foreign_ground','Foreign Ground','Sci-Fi','campanha','exploradora adulta em traje espacial sem insignias','uma chegada humana encontra uma paisagem impossivel','vale rochoso alienigena sob luz baixa','avanca lentamente segurando o capacete','assombro, isolamento e descoberta','ocre, grafite e azul frio','tecido tecnico, rocha e poeira'],
    ['edge_of_fire','Edge of Fire','Drama','retrato','mulher adulta em casaco vermelho neutro','o fogo ao fundo materializa uma decisao irreversivel','campo aberto com veiculo em chamas distante','permanece sentada olhando para o vazio','perda, choque e quietude','vermelho, cinza e preto','la, fumaca e capim seco'],
    ['paper_storm','Paper Storm','Surreal','campanha','mulher madura em sobretudo claro sem marcas','documentos e objetos se libertam da gravidade urbana','rua vazia cercada por predios altos','caminha enquanto papeis orbitam ao redor','absurdo elegante e energia narrativa','bege, azul cinza e preto','papel, la e asfalto'],
    ['vertical_escape','Vertical Escape','Action','campanha','motociclista adulto em roupa tecnica sem logos','a cidade vira parede para um movimento impossivel','estrutura brutalista inclinada','conduz a moto em uma trajetoria vertical','adrenalina, desafio e velocidade','grafite, branco e azul frio','concreto, borracha e metal']
  ],
  art:[
    ['lavender_organism','Lavender Organism','Material','','formas biomórficas lilás translúcidas','um organismo impossível cresce como escultura de estúdio','espaço branco sem horizonte','','curiosidade tátil e beleza alienígena','lavanda, branco e violeta','gel translúcido, silicone e vidro'],
    ['red_petal_portrait','Red Petal','Portrait','retrato','rosto adulto envolvido por pétalas vermelhas monumentais','identidade humana emergindo de uma flor impossível','fundo vermelho profundo','','intensidade, delicadeza e estranheza','vermelho, pele natural e preto','pétalas, pele e veludo'],
    ['blue_shrine','Blue Shrine','Object','','esfera cobalto entre flores metálicas','um núcleo azul organiza uma natureza artificial','câmara cinza de piso refletivo','','silêncio ritual e precisão surreal','cobalto, prata e grafite','vidro, cromo e água'],
    ['smoke_body','Smoke Body','Motion','retrato','figura adulta neutra formada parcialmente por fumaça','o corpo se desfaz sem perder sua identidade','estúdio preto com feixe lateral','','impermanência e movimento etéreo','preto, cinza e branco','fumaça, tecido e luz volumétrica'],
    ['solar_crown','Solar Crown','Portrait','retrato','mulher adulta com coroa radial dourada sem símbolos','a luz se torna uma extensão física do pensamento','fundo ocre liso','','presença icônica e calor solar','ouro, ocre e preto','metal, cabelo e luz dura'],
    ['carpet_dream','Carpet Dream','Narrative','campanha','figura adulta sob um tapete persa flutuante','um interior doméstico perde a gravidade','sala minimalista creme','','humor onírico e suspensão','vinho, creme e azul','tapete tecido, madeira e ar'],
    ['clay_panic','Clay Panic','Sculpture','','rosto de argila expressivo deformado pelas próprias mãos','ansiedade traduzida em matéria tátil','mesa de oficina branca','','energia bruta e humor desconfortável','terracota, branco e sombra azul','argila úmida, gesso e pele'],
    ['material_choir','Material Choir','Study','','conjunto de pedras, metais e tecidos em formas verticais','materiais diferentes parecem cantar a mesma nota','plataforma cinza neutra','','equilíbrio, ritmo e pesquisa material','areia, prata, vinho e carvão','pedra, cromo, feltro e vidro'],
    ['mirror_fracture','Mirror Fracture','Portrait','retrato','rosto adulto refletido em fragmentos suspensos','uma identidade aparece por ângulos incompatíveis','espaço preto sem horizonte','','tensão psicológica e beleza precisa','prata, preto e pele natural','espelho, vidro e luz fria'],
    ['infinite_ribbon','Infinite Ribbon','Object','','fita prateada contínua dobrada no ar','uma superfície impossível desenha seu próprio espaço','estúdio cinza-claro','','elegância matemática e fluidez','prata, branco e azul frio','metal líquido e névoa'],
    ['amber_mask','Amber Mask','Portrait','retrato','máscara translúcida âmbar diante de um rosto adulto','proteção e identidade ocupam camadas diferentes','fundo creme uniforme','','intimidade e ambiguidade','âmbar, creme e pele natural','resina, pele e vidro'],
    ['cobalt_horse','Cobalt Horse','World','','cavalo azul monocromático em escala real','um animal impossível habita um espaço doméstico','sala branca minimalista','','calma absurda e fascínio','cobalto, branco e cinza','pelagem, gesso e madeira'],
    ['ceramic_dress','Ceramic Dress','Fashion','moda','modelo adulta usando vestido composto por placas cerâmicas','a roupa se torna arquitetura frágil','estúdio mineral claro','','força, fragilidade e precisão','marfim, argila e pele natural','cerâmica, tecido e metal'],
    ['forest_within','Forest Within','Portrait','retrato','silhueta adulta contendo uma floresta iluminada','uma paisagem interior substitui o corpo','fundo preto profundo','','contemplação e mistério','verde escuro, âmbar e preto','folhagem, névoa e luz'],
    ['red_knot','Red Knot','Installation','','corda vermelha monumental formando um nó impossível','tensão e vínculo transformados em escala arquitetônica','galeria de concreto claro','','força gráfica e conflito','vermelho, cinza e sombra preta','corda têxtil e concreto'],
    ['mercury_fruit','Mercury Fruit','Still Life','','frutas familiares com superfície de mercúrio espelhado','o orgânico recebe uma pele industrial perfeita','mesa preta refletiva','','sedução e desconforto material','prata, preto e reflexos frios','metal líquido, vidro e água'],
    ['cloud_figure','Cloud Figure','Fashion','moda','figura adulta vestida por volume branco semelhante a nuvem','o corpo carrega seu próprio clima','campo cinza sem horizonte','','leveza monumental e estranheza','branco, cinza e azul pálido','fibra, vapor e tecido'],
    ['frozen_roses','Frozen Roses','Still Life','','rosas vermelhas presas dentro de blocos de gelo','beleza preservada no instante antes de desaparecer','estúdio azul muito claro','','delicadeza, frio e tempo suspenso','vermelho, gelo e branco','gelo, pétalas e água'],
    ['black_mountain','Black Mountain','Fashion','moda','mulher adulta em vestido prateado junto a uma forma negra monumental','uma presenca humana tenta mover uma massa impossivel','campo aberto ao entardecer','','tensao, escala e elegancia surreal','preto, prata e azul noturno','tecido metalico, rocha e vento'],
    ['field_office','Field Office','Narrative','campanha','mulher madura sentada diante de uma mesa de escritorio','a burocracia ocupa sozinha uma paisagem sem limites','campo verde sob ceu uniforme','','absurdo silencioso e isolamento','verde, cinza e bege','grama, madeira e papel'],
    ['white_velocity','White Velocity','Object','','pista branca sinuosa atravessando um vazio azul','o movimento existe sem veiculo ou personagem','espaco abstrato sem horizonte','','velocidade, precisao e silencio','branco, azul profundo e prata','asfalto sintetico, luz e nevoa'],
    ['masked_commute','Masked Commute','Narrative','campanha','passageiros usando mascaras animais de papel dentro de um carro','o deslocamento cotidiano vira um ritual estranho','interior de carro em cidade noturna','','humor inquietante e misterio','preto, branco e vermelho distante','papel, vidro e couro'],
    ['botanical_twins','Botanical Twins','Fashion','moda','duas modelos adultas em vestidos verdes sem marcas','os corpos repetidos se confundem com a vegetacao','estufa antiga tomada por plantas','','simetria organica e presenca cerimonial','verde, dourado e preto','folhagem, seda e vidro'],
    ['glass_procession','Glass Procession','Fashion','moda','duas figuras adultas em roupas claras sem marcas','uma travessia ritual acontece acima de uma floresta interna','passarela suspensa em estufa monumental','','calma, escala e estranheza','verde nevoa, branco e prata','vidro, tecido e vegetacao'],
    ['floor_break','Floor Break','Motion','campanha','dancarinos adultos em roupas coloridas sem logos','o corpo dobra a perspectiva de um palco domestico','sala rosa com luz de estudio','','energia, humor e impacto grafico','rosa, azul, amarelo e vermelho','vinil, tecido e luz dura'],
    ['hand_of_mist','Hand of Mist','Material','','mao translucida formada por nevoa azul','um gesto humano existe apenas por alguns segundos','vazio branco azulado','','fragilidade, toque e aparicao','azul gelo, branco e cinza','vapor, pele translucida e luz'],
    ['golden_profile','Golden Profile','Portrait','retrato','mulher adulta de perfil com acessorio dourado escultural e roupa neutra sem marcas','ornamento e identidade se fundem em um retrato editorial preciso','estudio com fundo magenta e luz lateral limpa','','elegancia, presenca e estranheza controlada','magenta, dourado, azul frio e pele natural','metal polido, tecido acetinado e luz colorida'],
    ['paper_cosmos','Paper Cosmos','Narrative','','personagem adulto com coroa de papel sobre um pequeno planeta cenografico','um universo infantil ganha escala teatral','ceu azul escuro coberto por estrelas recortadas','','encantamento, solidao e fantasia','azul, branco e cinza','papel, tecido e luz de palco'],
    ['soft_panic','Soft Panic','Sculpture','','rosto de argila colorida com expressao exagerada','ansiedade vira um objeto tatil e quase comico','fundo rosa uniforme','','humor desconfortavel e energia plastica','rosa, laranja, azul e branco','argila, silicone e tinta fosca'],
    ['warm_embrace','Warm Embrace','Illustration','','duas formas humanas organicas unidas em um abraco continuo','afeto e protecao se tornam uma unica silhueta grafica','campo azul petroleo contido por uma moldura suave','','acolhimento, calma e intimidade','laranja quente, amarelo, azul petroleo e preto','textura granulada, tinta digital e luz difusa'],
    ['edge_architecture','Edge Architecture','World','campanha','homem adulto em sobretudo preto sem marcas','o corpo mede a escala de uma parede curva impossivel','plataforma minimalista sob ceu limpo','','solidao, ordem e monumentalidade','preto, cinza e azul palido','concreto, la e metal'],
    ['marble_frequency','Marble Frequency','Object','','busto classico de marmore usando fones sem marca','antiguidade e tecnologia compartilham a mesma materia','fundo cinza mineral','','silencio, ironia e precisao','cinza, prata e preto','marmore, aluminio e couro'],
    ['lunar_swim','Lunar Swim','World','','arraia negra atravessando a frente de uma lua monumental','o oceano e o cosmos ocupam o mesmo espaco','ceu preto sem horizonte','','calma, misterio e escala impossivel','preto, branco lunar e azul profundo','pele organica, luz e nevoa'],
    ['coastal_double','Coastal Double','Fashion','moda','duas figuras adultas em moda preta experimental sem logos','identidades duplicadas ocupam uma paisagem costeira','margem de lago sob ceu nublado','','atitude, juventude e estranheza','preto, verde frio e pele natural','couro, malha e agua'],
    ['color_fold','Color Fold','Material','','planos abstratos azul e laranja dobrados como materia macia','cor e volume formam um espaco sem escala','vazio luminoso sem horizonte','','fluidez, energia e contemplacao','azul, ciano, laranja e preto','luz, gel e superficie acetinada'],
    ['gravity_cut','Gravity Cut','Motion','campanha','figura adulta em movimento extremo sobre formacao rochosa','o corpo corta um vazio branco como sinal grafico','paisagem montanhosa reduzida a alto contraste','','risco, impulso e abstracao','preto, branco e cinza','rocha, tecido e luz dura']
  ]
};

var INSPIRATION_MOOD_BY_TYPE = {
  Tech:'precisão tecnológica, silêncio e sofisticação contemporânea',
  Beauty:'sensualidade tátil, desejo e acabamento premium',
  Skincare:'pureza, cuidado e confiança clínica',
  Footwear:'leveza, energia e inovação funcional',
  Watch:'precisão, exclusividade e tensão silenciosa',
  Beverage:'frescor, desejo e presença sensorial',
  Jewelry:'luxo íntimo, brilho controlado e contemplação',
  Furniture:'calma, conforto e sofisticação espacial',
  Eyewear:'clareza gráfica, atitude e modernidade',
  Fashion:'presença editorial, elegância e confiança',
  Design:'precisão formal, serenidade e fascínio material',
  Food:'aconchego, desejo e prazer silencioso',
  Mobility:'movimento, precisão e liberdade urbana',
  Fragrance:'mistério, desejo e sofisticação noturna',
  Portrait:'intimidade, presença e autenticidade',
  Campaign:'impacto narrativo, desejo e reconhecimento de marca',
  Lifestyle:'proximidade, conforto e espontaneidade editorial',
  Business:'tensão contida, ordem e decisão',
  Concept:'humor sofisticado, estranheza e memorabilidade',
  Material:'precisão tátil, abstração e pesquisa de superfície'
};

var INSPIRATION_ACTION_OVERRIDES = {
  street_interruption:'as duas figuras interrompem o passo e reagem ao acontecimento impossível que atravessa a rua',
  lived_in_blue:'acomoda-se no sofá em um gesto natural enquanto a luz percorre o ambiente',
  stone_stance:'sustenta uma postura firme no eixo da rua e encara a câmera sem rigidez',
  mirror_portal:'alinha o corpo ao arco espelhado e avança um passo em direção ao reflexo',
  night_creator:'digita concentrada enquanto a luz da tela recorta o rosto e as mãos',
  red_double:'as duas modelos mantêm poses espelhadas com pequenas diferenças de gesto',
  sunroom_release:'abre o corpo em direção à claraboia enquanto o tecido responde à luz',
  street_reflection:'caminha junto à vitrine enquanto o reflexo acompanha sua trajetória',
  violet_ascent:'sobe a escadaria e faz uma pausa breve antes de olhar para a câmera',
  empty_decision:'a sala permanece vazia enquanto a luz recortada avança sobre a mesa e as cadeiras',
  formal_amphibian:'ajusta o punho do smoking e encara a câmera com absoluta seriedade',
  slatted_light:'atravessa lentamente as faixas de luz mantendo o look legível',
  midnight_reserve:'eleva o copo até a luz e observa o líquido antes do primeiro gole',
  red_petal_portrait:'mantém o olhar frontal enquanto as pétalas se abrem ao redor do rosto',
  blue_shrine:'a esfera permanece suspensa enquanto as flores metálicas se orientam ao seu redor',
  smoke_body:'permanece de pé enquanto partes do corpo se desfazem em fumaça contínua',
  solar_crown:'sustenta uma pose frontal serena enquanto a coroa radial captura a luz',
  carpet_dream:'permanece sob o tapete enquanto ele flutua e ondula sobre o ambiente',
  clay_panic:'pressiona o próprio rosto de argila com as duas mãos, deformando a matéria',
  material_choir:'as formas permanecem alinhadas enquanto reflexos e texturas criam um ritmo comum',
  mirror_fracture:'mantém o rosto imóvel enquanto os fragmentos revelam ângulos diferentes da mesma identidade',
  infinite_ribbon:'a fita se dobra em uma curva contínua e impossível sem tocar o chão',
  amber_mask:'aproxima a máscara do rosto sem ocultar completamente a expressão',
  forest_within:'a silhueta permanece imóvel enquanto a luz atravessa a floresta contida no corpo',
  red_knot:'a corda tensiona suas curvas e sustenta o nó monumental no centro da galeria',
  mercury_fruit:'as frutas permanecem organizadas enquanto reflexos líquidos percorrem suas superfícies',
  cloud_figure:'avança lentamente enquanto o volume branco se expande ao redor do corpo',
  frozen_roses:'as rosas permanecem suspensas no gelo enquanto gotas começam a surgir na superfície',
  white_velocity:'a pista atravessa o vazio em uma curva contínua que conduz o olhar',
  masked_commute:'os passageiros permanecem sentados e voltam as máscaras em direções diferentes',
  botanical_twins:'as duas modelos sustentam poses simétricas entre a vegetação',
  glass_procession:'as figuras atravessam a passarela em ritmo lento e cerimonial',
  floor_break:'os dançarinos dobram o corpo em direções opostas como se alterassem a perspectiva da sala',
  hand_of_mist:'a mão se forma na névoa, estende os dedos e começa a desaparecer',
  golden_profile:'mantém o perfil imóvel enquanto o acessório dourado intercepta a luz lateral',
  paper_cosmos:'equilibra-se sobre o pequeno planeta e observa o céu de papel',
  soft_panic:'o rosto de argila comprime a expressão como se a matéria reagisse à ansiedade',
  warm_embrace:'as duas formas se aproximam até compor uma única silhueta contínua',
  edge_architecture:'permanece no limite da plataforma enquanto acompanha a curva monumental com o olhar',
  marble_frequency:'o busto permanece imóvel enquanto os fones introduzem um contraste tecnológico preciso',
  lunar_swim:'a arraia cruza lentamente o disco lunar sem alterar sua silhueta',
  coastal_double:'as duas figuras ocupam pontos distintos da margem e sustentam poses complementares',
  color_fold:'os planos se dobram e deslizam uns sobre os outros como matéria macia',
  gravity_cut:'a figura corta o vazio em um salto extremo acima da formação rochosa'
};

var INSPIRATION_TECH_ROTATIONS = {
  commercial:[
    ['commercial','refined','detail','makro65','spotlight','kodak_2383','4:5'],
    ['commercial','expressive','cu','otus85','window_soft','portra_400','4:5'],
    ['commercial','expressive','ms','k35_55','hard_flash','ektachrome_e100','4:5'],
    ['commercial','refined','ws','k35_35','golden_hour','v3_250d_5207','4:5']
  ],
  cinematic:[
    ['cinematic','expressive','ws','k35_35','practical_neon','v3_500t_5219','4:5'],
    ['cinematic','refined','ms','k35_55','chiaroscuro','eterna_500t_8573','4:5'],
    ['cinematic','expressive','cowboy','anamorphic_50','backlight_rim','kodak_2383','4:5'],
    ['cinematic','refined','cu','otus85','window_soft','portra_400','4:5'],
    ['cinematic','expressive','ews','k35_24','blue_hour','ektachrome_e100','4:5'],
    ['cinematic','radical','ms','panchro_40','hard_flash','double_x_5222','4:5']
  ],
  art:[
    ['art','radical','detail','makro65','spotlight','bleach_bypass','4:5'],
    ['art','expressive','cu','otus85','colored_gels','ektachrome_e100','4:5'],
    ['art','radical','ws','k35_18','chiaroscuro','technicolor_3strip','4:5'],
    ['art','radical','cowboy','anamorphic_50','hard_flash','cinestill_800t','4:5'],
    ['art','expressive','ews','k35_24','backlight_rim','velvia_50','4:5'],
    ['art','expressive','ms','panchro_40','window_soft','portra_400','4:5']
  ]
};

// Asset provenance keeps each curated card tied to the exact source frame.
var INSPIRATION_SOURCE_IDS = {
  commercial:[85,109,95,97,75,35,84,80,74,63,104,110,16,81,77,82,57,106,2,7,21,22,43,45,53,55,70,71,72,73,76,78,79,86,91,96],
  cinematic:[23,8,13,46,20,32,14,37,18,49,30,64,36,10,51,4,41,5,3,24,26,34,39,47,60,66,89,90,92,93,98,99,103,107,112,120],
  art:[9,44,6,25,61,29,48,52,28,56,59,50,12,38,65,54,62,33,11,15,27,40,67,68,69,83,101,94,102,117,113,114,115,116,118,119]
};

Object.keys(INSPIRATION_PRESETS).forEach(function(id){
  var preset = INSPIRATION_PRESETS[id];
  preset.sourcePrompt = (window.INSPIRATION_SOURCE_PROMPTS && window.INSPIRATION_SOURCE_PROMPTS[preset.sourceId]) || '';
  preset.sourceDirection = (window.INSPIRATION_SOURCE_DIRECTIONS && window.INSPIRATION_SOURCE_DIRECTIONS[preset.sourceId]) || null;
});

Object.keys(INSPIRATION_EXPANSION).forEach(function(category){
  INSPIRATION_EXPANSION[category] = INSPIRATION_EXPANSION[category].map(function(row,index){
    var tech = INSPIRATION_TECH_ROTATIONS[category][index % INSPIRATION_TECH_ROTATIONS[category].length];
    var sourceId = INSPIRATION_SOURCE_IDS[category][index];
    var compactCommercial = category === 'commercial' && row.length === 9;
    var action = compactCommercial ? '' : row[7];
    var mood = compactCommercial ? (INSPIRATION_MOOD_BY_TYPE[row[2]] || 'sofisticação, clareza e impacto comercial') : row[8];
    var palette = compactCommercial ? row[7] : row[9];
    var materials = compactCommercial ? row[8] : row[10];
    action = action || INSPIRATION_ACTION_OVERRIDES[row[0]] || (row[3] === 'produto' ? '' : 'mantém uma presença controlada que materializa o conceito no ambiente');
    var item = {
      id:row[0], label:row[1], type:row[2], persona:row[3], subject:row[4], concept:row[5], environment:row[6],
      action:action, mood:mood, palette:palette, materials:materials, category:category,
      sourceId:sourceId,
      image:'./media/inspiration-' + category + '-' + String(index + 3).padStart(2,'0') + '.webp'
    };
    INSPIRATION_PRESETS[item.id] = {
      label:item.label, category:category, persona:item.persona, subject:item.subject, concept:item.concept,
      environment:item.environment, action:item.action, mood:item.mood, palette:item.palette, materials:item.materials,
      treatment:tech[0], intensity:tech[1], shotId:tech[2], lensId:tech[3], lightId:tech[4], stockId:tech[5], aspectRatio:tech[6],
      sourceId:sourceId,
      sourcePrompt:(window.INSPIRATION_SOURCE_PROMPTS && window.INSPIRATION_SOURCE_PROMPTS[sourceId]) || '',
      sourceDirection:(window.INSPIRATION_SOURCE_DIRECTIONS && window.INSPIRATION_SOURCE_DIRECTIONS[sourceId]) || null
    };
    return item;
  });
});

var CAMPAIGN_BLUEPRINTS = [
  { id:'hero', label:'Hero Shot', note:'A imagem-chave que apresenta a campanha.', shotId:null, lensId:null, lightId:null, stockId:null, motionId:null },
  { id:'world', label:'Contexto', note:'Abre o mundo e estabelece escala e atmosfera.', shotId:'ws', lensId:'k35_24', lightId:'blue_hour', stockId:'ektachrome_e100', motionId:'pull_out' },
  { id:'gesture', label:'Gesto', note:'Aproxima a narrativa do corpo, uso ou interação.', shotId:'ms', lensId:'k35_55', lightId:'window_soft', stockId:'portra_400', motionId:'follow' },
  { id:'detail', label:'Detalhe', note:'Isola material, textura, produto ou gesto decisivo.', shotId:'detail', lensId:'makro120', lightId:'spotlight', stockId:'kodak_2383', motionId:'push_in' },
  { id:'motion', label:'Movimento', note:'Entrega energia e um frame com ação legível.', shotId:'cowboy', lensId:'anamorphic_50', lightId:'practical_neon', stockId:'v3_500t_5219', motionId:'orbit' }
];
/* === DATA:CREATIVE_TREATMENTS END === */

/* === DATA:CHARACTER_SHEET START === */
var CHARACTER_SHEET_TERMS = {
  presentation: {
    man: { label:'Homem', prompt:'man' },
    woman: { label:'Mulher', prompt:'woman' },
    androgynous: { label:'Pessoa andrógina', prompt:'androgynous adult' }
  },
  age: {
    age_18_24: { label:'18 a 24 anos', prompt:'18-to-24-year-old' },
    age_25_34: { label:'25 a 34 anos', prompt:'25-to-34-year-old' },
    age_35_44: { label:'35 a 44 anos', prompt:'35-to-44-year-old' },
    age_45_59: { label:'45 a 59 anos', prompt:'45-to-59-year-old' },
    age_60_74: { label:'60 a 74 anos', prompt:'60-to-74-year-old' }
  },
  ethnicity: {
    mixed_brazilian: { label:'Parda / mestiça brasileira', prompt:'mixed-race Brazilian appearance' },
    afro_brazilian: { label:'Afro-brasileira', prompt:'Afro-Brazilian appearance' },
    white_brazilian: { label:'Branca brasileira', prompt:'white Brazilian appearance' },
    indigenous_brazilian: { label:'Indígena brasileira', prompt:'Indigenous Brazilian appearance' },
    east_asian: { label:'Leste-asiática', prompt:'East Asian appearance' },
    south_asian: { label:'Sul-asiática', prompt:'South Asian appearance' },
    middle_eastern: { label:'Árabe / Oriente Médio', prompt:'Middle Eastern appearance' },
    latino: { label:'Latina', prompt:'Latino appearance' }
  },
  skinTone: {
    fair_neutral: { label:'Clara · subtom neutro', prompt:'fair skin with neutral undertones' },
    light_warm: { label:'Clara · subtom quente', prompt:'light skin with warm undertones' },
    medium_neutral: { label:'Média · subtom neutro', prompt:'medium skin with neutral undertones' },
    medium_warm: { label:'Morena · subtom quente', prompt:'tan skin with warm undertones' },
    deep_neutral: { label:'Marrom profunda · neutra', prompt:'deep brown skin with neutral undertones' },
    dark_cool: { label:'Retinta · subtom frio', prompt:'dark brown skin with cool undertones' }
  },
  hairColor: {
    black: { label:'Preto', prompt:'black hair' },
    dark_brown: { label:'Castanho escuro', prompt:'dark brown hair' },
    medium_brown: { label:'Castanho médio', prompt:'medium brown hair' },
    blonde: { label:'Loiro', prompt:'blonde hair' },
    auburn: { label:'Ruivo / acobreado', prompt:'natural auburn hair' },
    salt_pepper: { label:'Grisalho', prompt:'naturally salt-and-pepper hair' },
    gray: { label:'Cinza', prompt:'natural gray hair' },
    white: { label:'Branco', prompt:'natural white hair' }
  },
  hairStyle: {
    short_straight: { label:'Curto · liso', prompt:'cut short and naturally straight' },
    short_wavy: { label:'Curto · ondulado', prompt:'cut short and naturally wavy' },
    short_curly: { label:'Curto · cacheado', prompt:'cut short with natural curls' },
    short_coily: { label:'Curto · crespo', prompt:'cut short with a natural coily texture' },
    medium_straight: { label:'Médio · liso', prompt:'medium length and naturally straight' },
    medium_wavy: { label:'Médio · ondulado', prompt:'medium length and naturally wavy' },
    medium_curly: { label:'Médio · cacheado', prompt:'medium length with natural curls' },
    long_straight: { label:'Longo · liso', prompt:'long and naturally straight' },
    long_wavy: { label:'Longo · ondulado', prompt:'long and naturally wavy' },
    long_curly: { label:'Longo · cacheado', prompt:'long with natural curls' },
    shaved: { label:'Raspado', prompt:'closely shaved with a visible natural hairline' },
    bald: { label:'Calvo / careca', prompt:'a naturally bald scalp with visible follicle texture' }
  },
  eyeColor: {
    dark_brown: { label:'Castanho escuro', prompt:'dark brown eyes' },
    brown: { label:'Castanho', prompt:'brown eyes' },
    hazel: { label:'Mel', prompt:'hazel eyes' },
    green: { label:'Verde', prompt:'green eyes' },
    blue: { label:'Azul', prompt:'blue eyes' },
    gray: { label:'Cinza', prompt:'gray eyes' }
  },
  bodyType: {
    lean: { label:'Magro', prompt:'average height with a lean build' },
    average: { label:'Médio', prompt:'average height with a medium natural build' },
    athletic: { label:'Atlético', prompt:'average height with a naturally athletic build' },
    broad: { label:'Largo / robusto', prompt:'average height with a broad sturdy build' },
    plus: { label:'Corpo grande', prompt:'average height with a large full build' },
    tall_lean: { label:'Alto e magro', prompt:'tall with a lean build' },
    short_sturdy: { label:'Baixo e robusto', prompt:'short with a sturdy build' }
  },
  facialHair: {
    none: { label:'Sem pelos faciais', prompt:'no visible facial hair' },
    stubble: { label:'Barba por fazer', prompt:'natural short stubble' },
    short_beard: { label:'Barba curta', prompt:'a short naturally uneven beard' },
    full_beard: { label:'Barba cheia', prompt:'a full natural beard with individual strands' },
    mustache: { label:'Bigode', prompt:'a natural mustache' }
  },
  wardrobe: {
    charcoal: { label:'Camiseta grafite + calça preta', prompt:'a plain matte charcoal-gray crew-neck T-shirt, straight black trousers and plain dark-gray low-top shoes' },
    off_white: { label:'Camiseta off-white + calça cinza', prompt:'a plain matte off-white crew-neck T-shirt, straight charcoal trousers and plain gray low-top shoes' },
    black_long: { label:'Manga longa preta + calça cinza', prompt:'a plain matte black long-sleeve crew-neck top, straight dark-gray trousers and plain black low-top shoes' },
    gray_sweatshirt: { label:'Moletom cinza + calça preta', prompt:'a plain matte medium-gray crew-neck sweatshirt, straight black trousers and plain dark-gray low-top shoes' },
    beige: { label:'Camiseta bege + calça grafite', prompt:'a plain matte beige crew-neck T-shirt, straight charcoal trousers and plain dark-gray low-top shoes' }
  },
  skinDetail: {
    light_freckles: 'light natural freckles across the nose and cheeks',
    moles: 'a few small naturally placed facial moles',
    subtle_scar: 'one subtle healed facial scar',
    expression_lines: 'natural expression lines around the eyes and mouth',
    mild_acne: 'mild natural acne texture and a few healed marks',
    under_eye: 'natural under-eye darkness and fine creasing',
    vitiligo: 'a small localized area of natural vitiligo'
  }
};

var CHARACTER_SHEET_PRESETS = {
  adult_man: { presentation:'man',age:'age_25_34',ethnicity:'mixed_brazilian',skinTone:'medium_warm',hairColor:'dark_brown',hairStyle:'short_wavy',eyeColor:'dark_brown',bodyType:'average',facialHair:'stubble',wardrobe:'charcoal' },
  adult_woman: { presentation:'woman',age:'age_25_34',ethnicity:'mixed_brazilian',skinTone:'medium_warm',hairColor:'dark_brown',hairStyle:'medium_wavy',eyeColor:'dark_brown',bodyType:'average',facialHair:'none',wardrobe:'off_white' },
  mature_man: { presentation:'man',age:'age_45_59',ethnicity:'afro_brazilian',skinTone:'deep_neutral',hairColor:'salt_pepper',hairStyle:'short_curly',eyeColor:'dark_brown',bodyType:'broad',facialHair:'short_beard',wardrobe:'gray_sweatshirt' },
  mature_woman: { presentation:'woman',age:'age_45_59',ethnicity:'white_brazilian',skinTone:'light_warm',hairColor:'salt_pepper',hairStyle:'medium_wavy',eyeColor:'hazel',bodyType:'average',facialHair:'none',wardrobe:'beige' }
};
/* === DATA:CHARACTER_SHEET END === */


/* === DATA:LENSES START === */
var LENSES = {
  makro65:    { group:'imax',  cameraLabel:'IMAX MK IV 65mm', iso:250, name:'Zeiss Makro-Planar 65mm T2.2', label:'Close-up ritualístico — Zeiss Makro-Planar 65mm T2.2' },
  hasselblad80:{ group:'imax', cameraLabel:'IMAX MK IV 65mm', iso:250, name:'Hasselblad/Zeiss 80mm T2.2', label:'Medium-wide calmo — Hasselblad/Zeiss 80mm T2.2' },
  otus85:     { group:'imax',  cameraLabel:'IMAX MK IV 65mm', iso:250, name:'Zeiss Otus 85mm T2.5', label:'Retrato denso — Zeiss Otus 85mm T2.5' },
  summilux40: { group:'imax',  cameraLabel:'IMAX MK IV 65mm', iso:250, name:'Leica Summilux-C 40mm T1.4', label:'Wide natural — Leica Summilux-C 40mm T1.4' },
  k35_24:     { group:'alexa', cameraLabel:'ARRI Alexa 35',   iso:800, name:'Canon K35 24mm T1.5', label:'Wide dinâmico — Canon K35 24mm T1.5' },
  k35_35:     { group:'alexa', cameraLabel:'ARRI Alexa 35',   iso:800, name:'Canon K35 35mm T1.5', label:'Narrativa padrão (default) — Canon K35 35mm T1.5' },
  k35_55:     { group:'alexa', cameraLabel:'ARRI Alexa 35',   iso:800, name:'Canon K35 55mm T1.5', label:'Retrato urbano — Canon K35 55mm T1.5' },
  k35_85:     { group:'alexa', cameraLabel:'ARRI Alexa 35',   iso:800, name:'Canon K35 85mm T1.8', label:'Close-up — Canon K35 85mm T1.8' },
  makro120:   { group:'imax',  cameraLabel:'IMAX MK IV 65mm', iso:250, name:'Zeiss Makro-Planar 120mm T2.4', label:'Tele longa, compressão — Zeiss Makro-Planar 120mm T2.4' },
  k35_18:     { group:'alexa', cameraLabel:'ARRI Alexa 35',   iso:800, name:'Canon K35 18mm T1.5', label:'Ultra wide — Canon K35 18mm T1.5' },
  cooke_s4_32:{ group:'alexa', cameraLabel:'ARRI Alexa 35',   iso:800, name:'Cooke S4/i 32mm T2.0', label:'Pele suave, caráter — Cooke S4/i 32mm T2.0' },
  master_50:  { group:'alexa', cameraLabel:'ARRI Alexa 35',   iso:800, name:'Zeiss Master Prime 50mm T1.3', label:'Clínica, ultranítida — Zeiss Master Prime 50mm T1.3' },
  anamorphic_50:{ group:'special', cameraLabel:'ARRI Alexa 35', iso:800, name:'Cooke Anamorphic/i 50mm T2.3', label:'Anamórfica — bokeh oval, flares horizontais — Cooke Anamorphic/i 50mm T2.3' },
  probe_24:   { group:'special', cameraLabel:'ARRI Alexa 35', iso:800, name:'Laowa 24mm T14 Probe macro', label:'Macro / ângulo de inseto — Laowa 24mm Probe' },
  panchro_40: { group:'special', cameraLabel:'ARRI Alexa 35', iso:800, name:'Cooke Speed Panchro 40mm T2.2', label:'Vintage, swirl quente — Cooke Speed Panchro 40mm T2.2' },
  fisheye_8:  { group:'special', cameraLabel:'ARRI Alexa 35', iso:800, name:'8mm T3.5 fisheye', label:'Fisheye — distorção extrema — 8mm T3.5' }
};
/* === DATA:LENSES END === */

/* === DATA:STOCKS START === */
var STOCKS = {
  v3_500t_5219: {
    label:'Neon / tungstênio noturno — Kodak Vision3 500T 5219',
    post:[
      'Kodak Vision3 500T 5219, heavy visible grain through the shadow side, deep crushed blacks, restrained highlight roll-off, halation barely present.',
      'Kodak Vision3 500T 5219, coarse organic grain riding through the underexposed zones, tungsten warmth pooling in the midtones, hard highlight roll-off.',
      'Kodak Vision3 500T 5219, tactile visible grain structure, deep blacks holding detail at the toe, slight magenta cast in the deepest shadows.',
      'Kodak Vision3 500T 5219, prominent grain riding the night exposure, tungsten orange holding through the midtones, blacks dense but never fully crushed.',
      'Kodak Vision3 500T 5219, heavy organic grain across the frame, warm tungsten base, highlights compressing gently into a soft halation bloom.',
      'Kodak Vision3 500T 5219, coarse grain alive in the shadow side, tungsten warmth banked in the midtones, blacks dense and detailed.',
      'Kodak Vision3 500T 5219, heavy visible grain through the night exposure, restrained highlights, deep blacks with a faint magenta toe.',
      'Kodak Vision3 500T 5219, prominent organic grain, warm tungsten cast pooling low, gentle halation around the brightest points.',
      'Kodak Vision3 500T 5219, tactile grain riding the underexposure, crushed yet readable blacks, hard but clean highlight roll-off.',
      'Kodak Vision3 500T 5219, coarse grain across the frame, orange tungsten base, shadows deep, highlights compressing softly.',
      'Kodak Vision3 500T 5219, heavy grain structure at night, warm midtones, blacks holding shape at the toe, restrained bloom.'
    ]
  },
  v3_250d_5207: {
    label:'Diurno natural — Kodak Vision3 250D 5207',
    post:[
      'Kodak Vision3 250D 5207, visible organic grain, restrained contrast, midtone priority, halation on the highlights, warm shadow falloff.',
      'Kodak Vision3 250D 5207, organic grain visible across the midtones, daylight neutrality with a faint warm shadow falloff, gentle highlight bloom.',
      'Kodak Vision3 250D 5207, tactile grain across the midtones, natural daylight color response, highlights rolling off softly into halation.',
      'Kodak Vision3 250D 5207, visible grain holding through the daylight exposure, neutral warm balance, highlights blooming gently at the edge.',
      'Kodak Vision3 250D 5207, organic grain structure throughout, clean daylight rendition, restrained contrast, soft roll-off at the top end.',
      'Kodak Vision3 250D 5207, visible grain across the midtones, neutral daylight balance, warm shadow toe, highlights blooming faintly.',
      'Kodak Vision3 250D 5207, tactile organic grain, gentle contrast curve, natural skin rendition, soft halation at the brightest edges.',
      'Kodak Vision3 250D 5207, prominent grain holding through the exposure, clean whites, warm low end, restrained highlight bloom.',
      'Kodak Vision3 250D 5207, organic grain throughout, daylight neutrality, midtone priority, highlights rolling off without clipping.',
      'Kodak Vision3 250D 5207, visible grain structure, balanced daylight colour, soft warm falloff in the shadows, gentle top-end bloom.',
      'Kodak Vision3 250D 5207, tactile grain across the frame, clean neutral base, restrained contrast, halation light on the highlights.'
    ]
  },
  eterna_500t_8573: {
    label:'Pastel urbano / interiores mistos — Fuji Eterna 500T 8573',
    post:[
      'Fuji Eterna 500T 8573, coarse visible grain in the underexposed zones, slight cyan cast in the shadows, magenta shift through the skin, highlight roll-off retained.',
      'Fuji Eterna 500T 8573, tactile grain structure, pastel desaturation across the midtones, mixed-light color response holding through the highlights.',
      'Fuji Eterna 500T 8573, organic visible grain, cool shadow toe against warmer skin tones, gentle highlight compression.',
      'Fuji Eterna 500T 8573, tactile grain across mixed-light zones, muted pastel cast, highlights holding without clipping.',
      'Fuji Eterna 500T 8573, visible coarse grain in low light, soft cyan-magenta split between shadow and skin, restrained highlight roll-off.',
      'Fuji Eterna 500T 8573, coarse grain through the underexposed zones, pastel desaturation, cool shadow toe, gentle highlight compression.',
      'Fuji Eterna 500T 8573, tactile grain in mixed light, muted midtones, faint cyan in the blacks, warm skin holding through.',
      'Fuji Eterna 500T 8573, prominent organic grain, soft pastel palette, magenta drift in the skin, highlights retained without clipping.',
      'Fuji Eterna 500T 8573, visible grain across low light, desaturated cool base, restrained contrast, highlights rolling off softly.',
      'Fuji Eterna 500T 8573, coarse grain structure, pastel mixed-light response, cyan-magenta shadow split, gentle top-end roll-off.',
      'Fuji Eterna 500T 8573, tactile grain in the shadows, muted urban palette, cool toe against warmer skin, soft highlight bloom.'
    ]
  },
  double_x_5222: {
    label:'Preto e branco alto contraste — Kodak Double-X 5222',
    post:[
      'Kodak Double-X 5222 monochrome emulation, heavy visible grain, deep blacks, sharp highlight roll-off, no halation, maximum graphic contrast.',
      'Kodak Double-X 5222, coarse black-and-white grain structure, crushed blacks holding shape, abrupt highlight cutoff, zero halation bloom.',
      'Kodak Double-X 5222, prominent tactile grain, hard separation between black and white masses, no halation, graphic contrast throughout.',
      'Kodak Double-X 5222, heavy grain dominating the frame, stark black-and-white separation, no bloom, contrast pushed hard.',
      'Kodak Double-X 5222, coarse visible grain, deep black masses against bright whites, abrupt roll-off, no halation anywhere.',
      'Kodak Double-X 5222, heavy monochrome grain, stark tonal separation, crushed blacks, hard whites, graphic contrast throughout.',
      'Kodak Double-X 5222, prominent grain riding the frame, deep black masses, abrupt highlight cutoff, no bloom at all.',
      'Kodak Double-X 5222, coarse tactile grain, maximum black-and-white separation, dense shadows, clean hard whites.',
      'Kodak Double-X 5222, heavy grain structure, graphic monochrome contrast, blacks holding shape, no halation present.',
      'Kodak Double-X 5222, prominent visible grain, stark separation of light and dark, abrupt roll-off, contrast pushed hard.',
      'Kodak Double-X 5222, coarse organic grain, deep crushed blacks against bright highlights, zero bloom, raw graphic contrast.'
    ]
  },
  kodak_2383: {
    label:'Print final / peles ricas — Kodak 2383 print',
    post:[
      'Kodak 2383 print emulation, visible organic grain, rich midtone separation, warm shadow falloff, restrained saturation, deep blacks without crush.',
      'Kodak 2383 print, tactile grain through the print stock, warm rounded highlight roll-off, rich skin midtones, blacks deep but never crushed.',
      'Kodak 2383 print, heavy print-stock grain, saturated but controlled color, warm falloff into the shadow without losing separation.',
      'Kodak 2383 print, visible organic grain throughout, deep warm blacks, rich skin rendition, highlight roll-off rounded and filmic.',
      'Kodak 2383 print, tactile print-stock grain, controlled saturation, warm midtone density, shadows holding separation without crushing.',
      'Kodak 2383 print, visible grain through the print stock, rich skin midtones, warm deep blacks, rounded filmic highlight roll-off.',
      'Kodak 2383 print, heavy organic grain, controlled saturated colour, warm falloff into the shadows, blacks deep yet separated.',
      'Kodak 2383 print, tactile grain throughout, lush midtone density, restrained saturation, highlights rolling off warm and soft.',
      'Kodak 2383 print, prominent print-stock grain, rich skin rendition, warm shadow toe, deep blacks without crush.',
      'Kodak 2383 print, visible organic grain, balanced saturation, warm midtone weight, filmic rounded highlight behaviour.',
      'Kodak 2383 print, tactile grain across the frame, rich warm skin, deep separated blacks, soft rounded roll-off.'
    ]
  },
  k7222_bw: {
    label:'16mm indie / documental B&W — Kodak 7219/7222',
    post:[
      'Kodak 7222 16mm monochrome emulation, coarse heavy grain, restless texture across the frame, hard contrast, documentary rawness.',
      'Kodak 7219 16mm emulation, prominent tactile grain structure, unstable contrast, raw and unpolished tonal range.',
      'Kodak 7222 16mm, heavy organic grain dominating the frame, gritty contrast, immediate and unrefined.',
      'Kodak 7219 16mm, coarse heavy grain throughout, raw documentary contrast, tonal range unstable and unpolished.',
      'Kodak 7222 16mm, prominent restless grain, hard graphic contrast, immediate handheld documentary character.',
      'Kodak 7222 16mm monochrome, coarse heavy grain churning across the frame, gritty contrast, raw unpolished tonal range.',
      'Kodak 7219 16mm, prominent organic grain, unstable contrast, documentary rawness, blacks dense and immediate.',
      'Kodak 7222 16mm, heavy restless grain, hard separation of tones, gritty handheld character, no polish anywhere.',
      'Kodak 7219 16mm, coarse grain dominating the frame, raw contrast, tonal range loose and unrefined.',
      'Kodak 7222 16mm, prominent heavy grain, gritty documentary contrast, immediate texture, unstable tonal balance.',
      'Kodak 7219 16mm, coarse organic grain throughout, raw graphic contrast, unpolished and direct.'
    ]
  },
  portra_400: {
    label:'Pele quente e suave, pastel — Kodak Portra 400',
    post:[
      'Kodak Portra 400 emulation, visible organic grain, soft warm skin tones, pastel midtones, gentle highlight roll-off, restrained saturation.',
      'Kodak Portra 400, tactile grain across the midtones, creamy warm skin, low contrast, highlights rolling off softly.',
      'Kodak Portra 400, visible tight grain structure, muted pastel palette, warm neutral balance, forgiving highlight latitude.',
      'Kodak Portra 400, organic grain across the midtones, warm forgiving skin rendition, soft contrast, gentle highlight roll-off.',
      'Kodak Portra 400, visible grain throughout, pastel warmth in the shadows, low contrast curve, highlights never clipping hard.',
      'Kodak Portra 400, tight visible grain, creamy warm skin, muted pastel midtones, gentle forgiving highlight roll-off.',
      'Kodak Portra 400, organic grain across the frame, soft warm balance, low contrast, highlights holding wide latitude.',
      'Kodak Portra 400, visible tight grain, pastel palette, warm neutral skin, shadows soft and open.',
      'Kodak Portra 400, tactile grain through the midtones, creamy warmth, restrained saturation, gentle top-end roll-off.',
      'Kodak Portra 400, visible grain structure, muted warm tones, low contrast curve, forgiving highlight latitude.',
      'Kodak Portra 400, tight organic grain, soft pastel skin, warm shadow falloff, highlights rolling off without clipping.'
    ]
  },
  cinestill_800t: {
    label:'Tungstênio noturno, halation vermelho — CineStill 800T',
    post:[
      'CineStill 800T emulation, visible organic grain, red halation blooming around every highlight, tungsten cool shadows, neon color response.',
      'CineStill 800T, tactile grain in the underexposed zones, signature red halation glow around point lights, cool shadow toe against warm practicals.',
      'CineStill 800T, prominent grain, heavy red halation ringing the highlights, saturated neon midtones, deep cool blacks.',
      'CineStill 800T, visible organic grain at night exposure, red halation wrapping every practical light, cool tungsten base throughout.',
      'CineStill 800T, coarse grain across the underexposed frame, halation bleeding warm around highlights, deep cool shadow density.',
      'CineStill 800T, visible grain at night, red halation ringing every point light, neon midtones, cool tungsten shadows.',
      'CineStill 800T, tactile organic grain, signature red bloom around practicals, saturated neon palette, deep cool blacks.',
      'CineStill 800T, prominent grain in low light, halation glowing warm at the highlights, cool shadow toe, vivid colour.',
      'CineStill 800T, coarse grain through the exposure, red halation wrapping the lights, neon-saturated midtones, dense blacks.',
      'CineStill 800T, visible grain structure, warm red bloom on every highlight, cool tungsten base, saturated night colour.',
      'CineStill 800T, tactile grain across the frame, halation bleeding red around point sources, deep cool shadow density.'
    ]
  },
  velvia_50: {
    label:'Saturação alta, paisagem punchy — Fuji Velvia 50',
    post:[
      'Fuji Velvia 50 emulation, visible tight grain, very high saturation, punchy contrast, deep greens and reds, crisp highlight separation.',
      'Fuji Velvia 50, tactile grain structure, intense saturated color, steep contrast curve, vivid landscape palette.',
      'Fuji Velvia 50, visible grain, bold oversaturated tones, hard contrast, brilliant color rendition throughout.',
      'Fuji Velvia 50, tight visible grain, punchy saturated palette, steep contrast curve, deep rich color separation.',
      'Fuji Velvia 50, organic grain structure, vivid high-saturation rendition, hard contrast, crisp clean highlight edge.',
      'Fuji Velvia 50, tight visible grain, intense saturated colour, steep contrast, deep greens and reds, crisp highlights.',
      'Fuji Velvia 50, tactile grain, bold oversaturated palette, hard contrast curve, brilliant landscape rendition.',
      'Fuji Velvia 50, visible grain structure, punchy vivid tones, deep colour separation, clean sharp highlight edge.',
      'Fuji Velvia 50, tight organic grain, very high saturation, steep contrast, rich reds and greens throughout.',
      'Fuji Velvia 50, visible grain, intense colour rendition, hard punchy contrast, crisp brilliant highlights.',
      'Fuji Velvia 50, tactile tight grain, oversaturated bold palette, steep curve, vivid clean colour separation.'
    ]
  },
  bleach_bypass: {
    label:'Dessaturado, alto contraste, prata — Bleach Bypass',
    post:[
      'Bleach bypass emulation, visible coarse grain, heavily desaturated color, retained silver, crushed blacks, harsh metallic contrast.',
      'Bleach bypass, prominent gritty grain, near-monochrome desaturation, blown highlights, deep contrast, raw industrial feel.',
      'Bleach bypass, heavy tactile grain, muted color with silver sheen, steep contrast, hard shadow falloff.',
      'Bleach bypass, coarse visible grain, washed-out desaturated palette, retained silver density, harsh graphic contrast.',
      'Bleach bypass, prominent grain throughout, near-monochrome with silver bite, blown highlights, crushed industrial shadows.',
      'Bleach bypass, coarse heavy grain, heavily desaturated colour, retained silver, crushed blacks, harsh metallic contrast.',
      'Bleach bypass, gritty visible grain, near-monochrome palette, blown highlights, deep contrast, raw industrial feel.',
      'Bleach bypass, prominent tactile grain, muted colour with silver sheen, steep contrast, hard shadow falloff.',
      'Bleach bypass, coarse grain across the frame, washed desaturated tones, retained silver density, harsh graphic contrast.',
      'Bleach bypass, heavy grain structure, near-monochrome with metallic bite, blown whites, crushed industrial blacks.',
      'Bleach bypass, prominent grain, silver-retained desaturation, steep contrast curve, raw hard-edged shadows.'
    ]
  },
  ektachrome_e100: {
    label:'Slide limpo e nítido, cor neutra — Kodak Ektachrome E100',
    post:[
      'Kodak Ektachrome E100 emulation, visible tight grain, clean crisp color, neutral-to-cool balance, accurate saturation, controlled contrast.',
      'Kodak Ektachrome E100, tactile tight grain structure, precise color rendition, slight cool cast, clean highlight roll-off.',
      'Kodak Ektachrome E100, visible grain, sharp clean palette, neutral whites, restrained but accurate saturation.',
      'Kodak Ektachrome E100, tight organic grain, crisp neutral rendition, cool-accurate whites, controlled highlight roll-off.',
      'Kodak Ektachrome E100, visible grain throughout, clean slide-film clarity, precise neutral balance, contrast held steady.',
      'Kodak Ektachrome E100, tight visible grain, crisp clean colour, neutral-to-cool whites, accurate controlled saturation.',
      'Kodak Ektachrome E100, tactile grain structure, sharp precise rendition, slight cool cast, clean highlight roll-off.',
      'Kodak Ektachrome E100, visible grain, crisp neutral palette, accurate whites, restrained controlled contrast.',
      'Kodak Ektachrome E100, tight organic grain, slide-film clarity, cool-accurate balance, steady highlight behaviour.',
      'Kodak Ektachrome E100, visible grain across the frame, clean sharp colour, neutral whites, precise saturation.',
      'Kodak Ektachrome E100, tactile tight grain, crisp clarity, slight cool cast, contrast held clean and even.'
    ]
  },
  technicolor_3strip: {
    label:'Hiper-saturado clássico — Technicolor 3-strip (vintage)',
    post:[
      'Technicolor three-strip emulation, visible organic grain, hyper-saturated primaries, rich reds and cyans, glossy vintage Hollywood contrast.',
      'Technicolor three-strip, tactile grain, bold saturated color separation, deep blacks, lush retro highlight bloom.',
      'Technicolor three-strip, prominent grain, vivid oversaturated palette, theatrical contrast, classic dye-transfer richness.',
      'Technicolor three-strip, visible organic grain, hyper-saturated reds and cyans, deep glossy blacks, classic Hollywood punch.',
      'Technicolor three-strip, tactile grain throughout, rich dye-transfer color, theatrical contrast curve, vintage saturated bloom.',
      'Technicolor three-strip, visible organic grain, hyper-saturated primaries, deep glossy blacks, classic Hollywood punch.',
      'Technicolor three-strip, tactile grain, bold saturated separation, theatrical contrast, lush dye-transfer richness.',
      'Technicolor three-strip, prominent grain, vivid oversaturated reds and cyans, deep blacks, retro highlight bloom.',
      'Technicolor three-strip, visible grain structure, rich vintage colour, glossy contrast, saturated theatrical palette.',
      'Technicolor three-strip, tactile organic grain, hyper-saturated dye-transfer tones, deep blacks, classic glossy bloom.',
      'Technicolor three-strip, prominent grain, bold primary saturation, theatrical contrast curve, vintage Hollywood richness.'
    ]
  }
};
/* === DATA:STOCKS END === */

/* === DATA:SHOTTYPES START === */
var SHOTTYPES = {
  ews: {
    label:'Plano Geral (Extreme Wide Shot)',
    position:[
      'positioned at a great distance, elevated to take in the full scale of the location',
      'set far back and low, dwarfed by the scale of the surroundings',
      'placed at maximum distance, the horizon line dominating the frame',
      'held well back and slightly raised, the whole expanse of the location in frame',
      'set at a remove and elevated, the scene laid out in its entirety',
      'positioned far off and high, the surroundings reduced to pattern and scale',
      'pulled back to the edge of the location, the figure a distant accent'
    ],
    focus:[
      'set for deep focus, holding sharpness from the nearest texture to the farthest edge of the frame',
      'stopped down for deep focus across the entire depth of the scene',
      'focus spread across the whole field, nothing dissolving, the scale itself the subject',
      'deep focus carrying from the nearest ground to the far horizon',
      'stopped well down, every plane from foreground to distance held sharp',
      'focus held edge to edge, the whole expanse resolved in detail',
      'deep depth of field, the scene crisp from the closest texture to the skyline',
      'aperture closed down for sharpness across the entire frame'
    ],
    subjectFrame:[
      'reduced to a small silhouette against the vastness of the location',
      'a tiny figure within the frame, posture readable only as a distant gesture',
      'barely legible at this distance, identity carried by posture alone',
      'a minute shape against the scale of the place, recognisable only by stance',
      'dwarfed to a single mark, the body\'s outline the only readable trait'
    ],
    foreground:[
      '{env} stretches across the lower frame, empty and receding toward the horizon.',
      'A wide band of {env} dominates the foreground, dwarfing any other element.',
      '{env} opens up immediately in front of the lens, vast and unbroken.',
      '{env} sprawls across the base of the frame, its far edge lost to distance.',
      'The near reach of {env} fills the lower third, flat and uninterrupted.',
      '{env} runs to every edge of the foreground, scale established before anything else enters.',
      'A broad apron of {env} leads the eye outward, the horizon doing the rest.'
    ],
    midground:[
      'The subject sits small within the wider geometry of the frame, legible only as a shape.',
      'A single distant figure anchors the middle of the frame against the enormity of the location.',
      'The subject occupies a sliver of the frame, scale doing the storytelling.',
      'The figure reads as a lone mark against the breadth of the setting.',
      'A small silhouette holds the middle distance, dwarfed by everything around it.',
      'The subject is a single point of human scale inside an overwhelming space.',
      'The figure stands far off, its gesture reduced to a faint, distant outline.',
      'A diminished form marks the centre of the vastness, easy to miss at first glance.',
      'The subject is swallowed by the openness, present but almost incidental to the frame.'
    ],
    background:[
      '{env} extends to the horizon, layered and soft at the furthest edge.',
      '{env} fills the rest of the frame, the scale of the place outweighing the figure within it.',
      '{env} recedes into haze at the edge of visibility, swallowing the horizon line.',
      '{env} stacks in receding bands of tone toward a distant, hazed edge.',
      '{env} carries unbroken to the skyline, depth measured in fading layers.',
      '{env} dissolves into atmospheric distance, its furthest forms barely holding.',
      '{env} spreads wide behind the figure, the horizon line settling the composition.',
      '{env} thins toward the far edge, the air itself softening its outermost shapes.'
    ],
    geometry:[
      'The figure pushed to a single third, negative space dominating the rest of the frame.',
      'Vast negative space surrounding a small off-center figure, scale as the organizing principle.',
      'Horizon line cutting the frame, the subject reduced to a single graphic point within it.'
    ]
  },
  ws: {
    label:'Plano Aberto / Longo (Wide Shot)',
    position:[
      'positioned at a comfortable distance, taking in the subject\'s full body within the space',
      'set back to hold the entire figure inside the environment',
      'framed from a distance that keeps the body whole against its surroundings',
      'placed at a steady remove, the full figure standing within the scene',
      'set back enough to hold the whole body and the space it occupies',
      'positioned to keep the figure complete, the environment framing it on all sides',
      'held at a measured distance, body and setting sharing the frame'
    ],
    focus:[
      'focus held across a deep field, subject and environment both legible',
      'stopped down enough to keep the full figure and much of the space behind it sharp',
      'deep focus carrying from the subject through most of the environment',
      'a deep field of focus, the body and the place behind it both resolved',
      'stopped down for clarity from the figure through the surrounding space',
      'focus carried wide, subject and setting holding sharpness together',
      'deep depth of field, the whole figure and its surroundings legible',
      'aperture closed for a broad zone of focus across figure and scene'
    ],
    subjectFrame:[
      'visible head to foot, posture and gesture fully readable within the space',
      'full-bodied within the frame, the environment still claiming equal weight',
      'standing whole inside the scene, scale balanced between figure and place',
      'the entire figure held in frame, stance and silhouette doing the narrative work',
      'shown complete from head to foot, the body grounded firmly in its surroundings'
    ],
    foreground:[
      '{env} opens in front of the lens, leading the eye toward the figure beyond.',
      'A stretch of {env} occupies the lower frame, grounding the wider shot.',
      '{env} recedes gently from the bottom edge into the main scene.',
      '{env} lays out across the front of the frame, a path toward the standing figure.',
      'The near ground of {env} anchors the base, drawing the eye inward.',
      '{env} spreads at the foot of the frame, setting the depth of the shot.',
      'A low band of {env} fills the foreground, the figure resolving just beyond it.'
    ],
    midground:[
      'The full figure stands inside {env}, sharply resolved against the space around it.',
      'The subject, whole and upright, holds the center of a frame shared evenly with its surroundings.',
      'The body reads clearly against {env}, neither overwhelming the other.',
      'The standing figure occupies the middle plane, the space around it given equal weight.',
      'The whole body holds the frame\'s centre, its surroundings legible on every side.',
      'The subject stands resolved within {env}, balanced against the depth behind.',
      'The figure anchors the middle distance, the architecture of {env} framing it cleanly.',
      'The full form reads crisply against the setting, scale shared with the place.',
      'The body stands whole at mid-distance, the environment breathing around it.'
    ],
    background:[
      '{env} continues behind the figure, holding detail without overwhelming it.',
      '{env} closes the frame, giving the figure a legible architecture to stand against.',
      '{env} fills out the rest of the depth, soft toward the furthest plane.',
      '{env} carries on behind, its forms holding shape without pulling focus.',
      '{env} builds the depth behind the figure in receding, legible layers.',
      '{env} settles behind the subject, detailed enough to place the scene.',
      '{env} frames the figure from behind, the furthest planes easing into softness.',
      '{env} extends rearward, structure intact but yielding to the figure.'
    ],
    geometry:[
      'The figure placed on a vertical third, the rest of the frame carrying the weight of the space.',
      'Balanced geometry between body and environment, no single element overwhelming the other.',
      'The subject anchored low in the frame, headroom left to the scale of the place.'
    ]
  },
  cowboy: {
    label:'Plano Americano (Cowboy Shot)',
    position:[
      'positioned at mid-distance, framing from roughly mid-thigh upward',
      'set at a relaxed working distance, holding the figure from the thigh up',
      'framed loosely from the waistline down to just above the head',
      'placed at an easy remove, the figure held from mid-thigh to crown',
      'set at a working distance that keeps hands and stance in frame',
      'positioned mid-range, the upper body and gesture filling the frame',
      'held at conversational mid-distance, the figure framed thigh-up'
    ],
    focus:[
      'focus settled on the torso, hands and face both holding sharpness',
      'moderate depth of field, keeping the upper body resolved while the space around it softens slightly',
      'focus carried across the chest and hands, falling away gently at the edges',
      'a moderate field of focus, torso and hands crisp, the edges easing soft',
      'focus on the upper body, the surroundings beginning to give way',
      'mid-range depth of field, chest and hands sharp, background loosening',
      'focus held on the torso and gesture, the frame softening past it',
      'moderate aperture, the upper body resolved, the space around it gentle'
    ],
    subjectFrame:[
      'framed from the thigh up, hands and stance both readable',
      'visible from roughly the waist upward, weight and posture doing the work',
      'cropped just below the hips, the gesture of the hands fully in frame',
      'held from mid-thigh to crown, stance and hands carrying the shot',
      'shown from the legs\' upper reach upward, posture front and centre'
    ],
    foreground:[
      '{env} occupies a narrow strip at the bottom edge, slightly out of focus.',
      'A soft wedge of {env} sits low in frame, just beginning to dissolve.',
      '{env} edges into the lower corner, grounding the figure without competing.',
      'A thin run of {env} skims the base of the frame, softening as it nears.',
      '{env} brushes the lower edge, present but already easing out of focus.',
      'A low sliver of {env} grounds the shot, its detail just starting to give way.',
      '{env} sits at the frame\'s foot, blurred enough to keep the figure dominant.'
    ],
    midground:[
      'The subject\'s torso and hands hold the sharpest plane in the frame.',
      'The upper body, from the hips up, carries the focus of the composition.',
      'Hands and chest resolve sharply, the rest of the body trailing into looser focus.',
      'The torso commands the focal plane, the hands crisp and fully legible.',
      'The chest and arms hold the sharpest resolution, the hips easing softer.',
      'The figure\'s upper half is the focal anchor, gesture cleanly defined.',
      'Hands, chest and face stay sharp, the lower body falling gently away.',
      'The torso sits squarely on the focal plane, weight read through the stance.',
      'The upper body resolves cleanly, the hands the most legible point in frame.'
    ],
    background:[
      '{env} falls into a soft, legible blur behind the figure.',
      '{env} holds just enough shape to place the scene without distracting from the figure.',
      '{env} dissolves gradually, textures softening the further they sit from the subject.',
      '{env} blurs behind the figure, its colour and mass still placing the scene.',
      '{env} softens into recognisable shapes, never competing with the subject.',
      '{env} eases out of focus behind, depth suggested rather than detailed.',
      '{env} sits in gentle blur, enough form left to ground the moment.',
      '{env} recedes into soft tone, the figure held clear against it.'
    ],
    geometry:[
      'The figure occupies the central third, hands breaking the frame\'s lower edge.',
      'Weight concentrated in the upper two-thirds, the hips anchoring the base of the frame.',
      'A loose vertical column formed by the body, environment easing in at both edges.'
    ]
  },
  ms: {
    label:'Plano Médio (Medium Shot)',
    position:[
      'positioned at conversational distance, framing the subject from the waist up',
      'set at a natural mid-distance, the upper body filling most of the frame',
      'framed to hold the subject from roughly the waist to the top of the head',
      'placed at speaking distance, the upper body dominating the frame',
      'set close enough to read expression, the waist-up figure filling the frame',
      'positioned at a natural remove, face and chest carrying the shot',
      'held at conversational range, the subject framed from the waist'
    ],
    focus:[
      'focus resolved on the upper torso and face, background easing into softness',
      'shallow-to-moderate depth, the chest and face sharp, the space behind opening into blur',
      'focus settled across the shoulders and face, falling away just behind the subject',
      'focus on the face and chest, the background dissolving gently behind',
      'a shallow field, the upper body crisp, the space behind it opening soft',
      'focus held on the shoulders and face, depth falling away quickly',
      'moderate-shallow depth, the face sharp, the surroundings melting back',
      'focus settled on the upper body, the background easing into blur'
    ],
    subjectFrame:[
      'visible from the waist up, expression and posture both carrying the frame',
      'framed at chest height, gesture and gaze doing most of the narrative work',
      'the upper body fills a generous portion of the frame, presence concentrated',
      'held from the waist to the crown, face and hands sharing the storytelling',
      'shown chest-high, the gaze and the set of the shoulders leading the frame'
    ],
    foreground:[
      '{env} traces a thin, soft line along the bottom edge of the frame.',
      'A sliver of {env} intrudes gently at the lower corner, mostly out of focus.',
      '{env} is barely present, reduced to a soft texture skimming the frame\'s edge.',
      'A faint band of {env} grazes the lower edge, dissolved almost to colour.',
      '{env} barely enters the frame, a soft smear at the bottom corner.',
      'A whisper of {env} skims the base, its detail long since softened away.',
      '{env} reads only as a low, blurred wash at the frame\'s lower border.'
    ],
    midground:[
      'The subject\'s torso and face hold the sharpest focus in the composition.',
      'Shoulders and face resolve clearly, the rest of the frame falling away behind.',
      'The upper body anchors the frame, focus concentrated on the face and hands.',
      'The face and chest sit on the focal plane, the background already softening.',
      'Shoulders, face and hands resolve crisply against a yielding backdrop.',
      'The upper torso holds the focus, expression carried in full clarity.',
      'The face is the sharpest point, the shoulders grounding it in frame.',
      'The chest and face command focus, gesture legible in the hands.',
      'The subject\'s upper half stays crisp, the depth behind it opening into blur.'
    ],
    background:[
      '{env} dissolves into a soft field of color and shape behind the subject.',
      '{env} holds loosely recognizable shapes, softened well behind the focal plane.',
      '{env} recedes into bokeh, leaving only color and rough form.',
      '{env} melts into gentle tone behind, its forms suggested in soft colour.',
      '{env} blurs to a wash of hue and mass well behind the figure.',
      '{env} softens into rounded shapes, the scene readable only in outline.',
      '{env} falls away into out-of-focus colour, structure barely held.',
      '{env} settles into soft bokeh, its forms present but unresolved.'
    ],
    geometry:[
      'The subject\'s face placed on the upper third, shoulders anchoring the base.',
      'Centered weight with generous negative space to one side.',
      'A tight vertical block formed by the upper body, background reduced to soft shape.'
    ]
  }
};
SHOTTYPES.mcu = {
  label:'Meio Primeiro Plano (Medium Close-Up)',
  position:[
    'positioned close, framing from the chest upward',
    'set at an intimate working distance, shoulders and head filling the frame',
    'framed tightly from just below the collarbone to the top of the head',
    'placed near the subject, chest and head filling most of the frame',
    'set at close range, the shoulders anchoring a face-led frame',
    'positioned intimately, the head and upper chest dominating',
    'held close, the frame running from the collarbone to the crown'
  ],
  focus:[
    'focus locked on the eyes, the shoulders already losing sharpness',
    'shallow depth of field, eyes and brow sharp, everything past the cheekbone softening',
    'focus pulled tight to the face, shoulders dissolving into a soft mass',
    'focus pinned on the eyes, the collar already easing out of sharpness',
    'a shallow field, eyes and brow crisp, the jaw beginning to soften',
    'focus held tight on the face, the shoulders melting into blur',
    'narrow depth of field, the eyes sharp, everything beyond them giving way',
    'focus on the gaze, the rest of the face falling gently soft'
  ],
  subjectFrame:[
    'framed from the chest up, the face carrying the full weight of the shot',
    'shoulders and head fill most of the frame, expression fully legible',
    'cropped just below the collar, nothing left to distract from the face',
    'held from the upper chest to the crown, the face commanding the frame',
    'shoulders anchoring the base, the head and expression filling the rest'
  ],
  foreground:[
    '{env} softens to a wash of color at the very edge of the frame, still suggested.',
    'A faint, out-of-focus trace of {env} sits at the corner, its color still reading.',
    '{env} blurs gently at the frame\'s border, present but unresolved.',
    '{env} smears into soft hue at the frame\'s edge, barely holding form.',
    'A dissolved hint of {env} colours the corner, its shapes long gone.',
    '{env} reads only as soft tone along the border, its detail surrendered.',
    'A blurred edge of {env} touches the frame, present in colour alone.'
  ],
  midground:[
    'The face holds the sharpest plane, skin texture fully resolved.',
    'Eyes and brow anchor the focus, the jawline already softening.',
    'The face dominates the frame, every micro-expression readable.',
    'The eyes sit dead on the focal plane, skin texture crisp and present.',
    'The face holds absolute focus, the shoulders easing out beneath it.',
    'Every contour of the face resolves, expression carried in full.',
    'The brow and eyes are razor-clear, the cheek already turning soft.',
    'The face fills the focal plane, its surface detailed and immediate.',
    'The expression reads in complete clarity, the collar softening below.'
  ],
  background:[
    '{env} collapses into heavy bokeh behind the face, its forms still suggested in soft color.',
    '{env} is rendered as soft circles of light and tone, its shapes blurred but present.',
    '{env} dissolves into out-of-focus color behind, the scene still faintly legible.',
    '{env} melts to rounded bokeh behind, its masses held in soft colour.',
    '{env} blurs to gentle orbs of light and hue, the scene faintly suggested.',
    '{env} recedes into a soft field of tone, its forms barely readable.',
    '{env} dissolves to colour and blur behind the face, structure all but gone.',
    '{env} sits in deep bokeh, the scene present only as soft shape.'
  ],
  geometry:[
    'The face fills the frame off-center, one eye aligned near the upper third.',
    'Tight cropping leaves almost no negative space, the face the entire geometry.',
    'Asymmetric crop, more headroom on one side than the other, eyes on the dominant line.'
  ]
};
SHOTTYPES.cu = {
  label:'Primeiro Plano (Close-Up)',
  position:[
    'positioned close at eye level, the face filling most of the frame',
    'set near the subject, intimate and direct',
    'framed tightly on the face, no room for the surrounding space',
    'placed at eye level and close, the face spanning the frame',
    'set directly before the subject, the face claiming the whole frame',
    'positioned intimately at eye height, the surroundings shut out',
    'held tight on the face, nothing of the setting left in view'
  ],
  focus:[
    'focus pulled tight on the near eye, everything beyond a few centimeters dissolving',
    'wide open, the eye sharp and the rest of the face already softening',
    'razor focus on the eye and brow, cheekbone and ear falling out of resolution',
    'focus on the near eye, the far side of the face dissolving fast',
    'wide aperture, the eye crisp, the cheek and ear giving way to blur',
    'a razor-thin plane on the eye, everything past it softening quickly',
    'focus held on the iris, the rest of the face a soft gradient',
    'shallow focus on the near eye, the far features melting away'
  ],
  subjectFrame:[
    'the face fills the frame, every texture and micro-expression visible',
    'cropped at the jaw and forehead, nothing but the face remaining',
    'skin, eyes and expression occupy the entirety of the frame',
    'the face spans edge to edge, every pore and line on show',
    'held tight on the face alone, expression magnified and unguarded'
  ],
  foreground:[
    '{env} sits far out of focus at the frame\'s edge, its forms softened but still suggested.',
    'A soft, out-of-focus trace of {env} bleeds in at the corner, its colors still reading.',
    '{env} blurs into gentle tone at the very edge, present but unresolved.',
    '{env} dissolves at the border into soft colour, its forms barely held.',
    'A melted edge of {env} touches the corner, present only as hue.',
    '{env} reads as a soft smear at the frame\'s rim, detail surrendered.',
    'A faint blur of {env} bleeds in, its shape gone to colour and tone.'
  ],
  midground:[
    'The eye and brow hold absolute focus, skin pores and fine lines visible.',
    'Sharpness concentrated entirely on the eye, the rest of the face a gentle gradient of soft focus.',
    'The near eye is the only fully resolved point in the entire frame.',
    'The near eye sits razor-sharp, the far cheek already dissolving.',
    'Focus pins the eye and lash, every fine line on the skin legible.',
    'The eye and brow are the sole crisp plane, the jaw turning soft.',
    'The iris holds absolute clarity, the rest of the face a soft fall-off.',
    'The near eye anchors the focus, pores and moisture fully resolved.',
    'Sharpness lives only at the eye, the face softening on either side.'
  ],
  background:[
    '{env} sits well behind the focal plane, melted into soft bokeh yet still suggested in shape and color.',
    '{env} reads as soft out-of-focus forms behind the face, its colors and masses still present.',
    '{env} blurs into rounded bokeh behind, the scene legible as soft shapes and color.',
    '{env} dissolves to deep bokeh behind, its forms held only in soft colour.',
    '{env} melts to gentle orbs of tone, the scene suggested rather than seen.',
    '{env} recedes into soft colour and mass, structure all but gone.',
    '{env} blurs to a wash behind the face, its shapes faintly present.',
    '{env} sits in heavy bokeh, the scene legible only as soft hue.'
  ],
  geometry:[
    'The eye placed precisely on the upper third, the rest of the face falling away below.',
    'Extreme crop, the face breaking out of the frame on at least one edge.',
    'A single eye as the focal anchor, everything else secondary to it.'
  ]
};
SHOTTYPES.ecu = {
  label:'Primeiríssimo Plano (Extreme Close-Up)',
  position:[
    'positioned almost against the subject, isolating a single feature',
    'set at macro-like proximity, the frame holding only a fragment of the face',
    'framed so close that only part of the face remains inside it',
    'placed at extreme proximity, a single feature filling the frame',
    'set hard against the subject, only a fragment of the face in view',
    'positioned at macro range, the frame cropped to one detail of the face',
    'held so close the face breaks the frame on every edge'
  ],
  focus:[
    'focus narrowed to a sliver of depth, lashes sharp and skin already dissolving a centimeter away',
    'wide open at the closest working distance, a razor-thin plane in focus',
    'focus collapsed to almost nothing, only the nearest texture holding shape',
    'a hair-thin plane of focus, the nearest lashes sharp, all else gone soft',
    'focus on a sliver of skin, depth falling away within a centimetre',
    'wide open at minimum distance, the razor-thin focal plane on one feature',
    'focus reduced to a fraction, only the closest texture resolved',
    'a sliver of sharpness on the near feature, the rest melting instantly'
  ],
  subjectFrame:[
    'only a fragment of the face remains in frame — an eye, a brow, the edge of a mouth',
    'the frame holds a single feature, the rest of the face cropped away entirely',
    'skin texture and a single feature dominate, identity reduced to a fragment',
    'a lone detail of the face fills the frame, the rest cropped to nothing',
    'one feature spans the whole frame, texture standing in for identity'
  ],
  foreground:[
    '{env} lies far beyond the plane of focus, reduced to soft suggestion at the edge.',
    '{env} softens almost completely at this proximity, its shapes barely holding at the border.',
    '{env} blurs into faint out-of-focus color at the frame\'s edge, still faintly present.',
    '{env} is all but lost at this distance, a faint tone at the very rim.',
    'A trace of {env} survives only as soft colour at the frame\'s margin.',
    '{env} dissolves near completely, a whisper of hue at the edge.',
    '{env} reads as the faintest blur of colour beyond the focal sliver.'
  ],
  midground:[
    'Skin texture, pores and fine moisture dominate the entire visible plane.',
    'The fragment in focus reveals texture invisible at any greater distance.',
    'A single sliver of the face occupies the whole frame, hyper-legible in texture.',
    'Pores, fine hairs and moisture fill the plane, magnified past the everyday.',
    'The fragment shows grain of skin no wider view could resolve.',
    'A thread-thin plane of texture holds focus, every detail amplified.',
    'The visible sliver reveals surface detail invisible from any remove.',
    'Skin grain and the faintest sheen dominate the entire focal plane.',
    'The lone fragment carries the frame in pure, magnified texture.'
  ],
  background:[
    '{env} sits far out of focus behind, dissolved into soft color and faintly suggested shapes.',
    '{env} reads only as gentle bokeh and tone behind the fragment, its forms barely suggested.',
    '{env} blurs into a soft wash behind, its masses still faintly present in color.',
    '{env} dissolves to near-formless colour behind the fragment.',
    '{env} sits in deep blur, its shapes reduced to the faintest suggestion.',
    '{env} melts to soft tone behind, structure almost entirely gone.',
    '{env} reads only as a wash of colour beyond the focal sliver.',
    '{env} recedes into formless bokeh, its masses barely held in hue.'
  ],
  geometry:[
    'The fragment breaks the frame on more than one edge, scale itself the subject.',
    'An almost abstract composition, the feature filling the frame without margin.',
    'Radical crop, no negative space remaining anywhere in the frame.'
  ]
};
SHOTTYPES.detail = {
  label:'Plano Detalhe (Detail Shot)',
  position:[
    'positioned directly over the object or detail, removed from the wider scene',
    'set at close working distance from a single detail, the rest of the body or scene excluded',
    'framed to isolate one object or gesture entirely from its surroundings',
    'placed close above the object, the wider scene cropped away',
    'set near a single detail, the body and surroundings excluded',
    'positioned tight on one object, nothing of the scene around it in frame',
    'held close on the detail, isolating it from any wider context'
  ],
  focus:[
    'focus locked on the texture of the detail itself, the surrounding plane falling away fast',
    'a narrow plane of focus across the object, everything beyond it dissolving within centimeters',
    'tight focus on the surface in question, depth collapsing almost immediately around it',
    'focus held on the object\'s surface, the plane behind it gone soft at once',
    'a shallow plane across the detail, everything past it dissolving fast',
    'focus pinned to the object\'s texture, depth falling away within centimetres',
    'narrow focus on the surface, the surroundings collapsing into blur',
    'focus on the detail alone, the plane around it surrendering to soft'
  ],
  subjectFrame:[
    'only the detail is visible — a hand, an object, a fragment of wardrobe — the rest of the body excluded',
    'the frame holds a single object or gesture, isolated from any wider context',
    'identity is absent here; only the texture of the detail carries the frame',
    'a single object fills the frame, severed from the body and the scene',
    'the lone detail carries everything, its surface the entire subject'
  ],
  foreground:[
    'The detail itself sits at the very front of the frame, every texture exposed.',
    'Nothing precedes the object — it occupies the foreground entirely.',
    'The surface of the detail fills the nearest plane, texture immediate and tactile.',
    'The object presses to the front of the frame, its surface laid bare.',
    'The detail owns the near plane, nothing standing between it and the lens.',
    'The object\'s surface meets the frame directly, grain and edge exposed.',
    'The detail fills the foreground outright, its texture the first thing read.'
  ],
  midground:[
    'The object\'s texture is the only information the frame carries.',
    'Material grain, edge and wear are visible at a scale invisible from any distance.',
    'The detail dominates the entire visible plane, nothing else competing for focus.',
    'The object\'s surface — its grain, edge and wear — is the whole of the frame.',
    'Material texture holds the focal plane, magnified past ordinary sight.',
    'The detail occupies every part of the focus, its make-up fully exposed.',
    'Edge, grain and wear resolve at a scale no wider shot could carry.',
    'The object\'s surface is the sole subject, every mark of use legible.',
    'Texture is the entire content of the frame, immediate and tactile.'
  ],
  background:[
    '{env} sits softly out of focus behind the object, its forms reduced to gentle suggested shapes.',
    '{env} blurs into soft tone and color behind the detail, still faintly present.',
    '{env} reads as gentle bokeh behind the object, its shapes suggested rather than resolved.',
    '{env} dissolves to soft colour behind the detail, its forms barely held.',
    '{env} recedes into gentle blur, the scene placed but not resolved.',
    '{env} softens to tone and mass behind the object, structure faint.',
    '{env} sits in quiet bokeh behind, its shapes suggested in colour.',
    '{env} blurs to a soft field behind the detail, faintly legible.'
  ],
  geometry:[
    'The object placed off-center, negative space used deliberately around its edges.',
    'A tight, almost abstract crop, the detail itself becoming pure graphic shape.',
    'Asymmetric framing isolates the object against an empty field of soft tone.'
  ]
};
/* === DATA:SHOTTYPES END === */

/* === DATA:ITEM_FRAMING START === */
// Equivalente neutro de position/focus/subjectFrame/midground para quando o
// sujeito é um ITEM (sem corpo/rosto/mãos) — uma chave por plano (SHOTTYPES).
var ITEM_FRAMING = {
  ews:{
    position:[
      'positioned at a far remove, the location dominating the frame',
      'set deep within the wide shot, scale dwarfing the item',
      'placed far from the lens, the environment claiming most of the frame',
      'held at extreme distance, the item a small mark in the vastness',
      'pushed deep into the scene, the surrounding space overwhelming its size'
    ],
    focus:[
      'deep focus across the whole frame, the item sharp along with the location',
      'even focus throughout, no separation between item and surroundings',
      'everything resolved sharply, the item just one element among many',
      'focus spread evenly, the item legible only by shape at this distance',
      'broad depth of field, item and environment equally crisp',
      'focus carried edge to edge, the item one detail in a sharp wide field',
      'uniform sharpness across the depth, scale rather than focus separating the item'
    ],
    frame:[
      'reduced to a faint shape against the vastness of the location',
      'a small mark within the frame, recognisable only by silhouette',
      'barely legible at this distance, identity carried by outline alone',
      'dwarfed by the scale of the place, its form a single distant detail',
      'set small against an expanse of environment, scale the dominant note',
      'a minor element in a vast frame, the location doing the visual work',
      'held tiny within the wide field, its presence felt more than read',
      'occupying a fraction of the frame, the surroundings sprawling around it'
    ],
    midground:[
      'The item sits as a small but legible shape within the wider scene.',
      'The item\'s outline remains the sharpest small element in the frame.',
      'The item reads clearly by silhouette against the scale of the location.',
      'The item\'s form anchors the frame despite its small scale.',
      'The item holds as a single distinct point amid the surrounding space.',
      'The item stands out only by contrast against the broad environment.',
      'The item\'s shape stands out despite the dominance of the location.',
      'The item registers as the one deliberate mark in an open field.',
      'The item keeps its identity through silhouette alone at this remove.'
    ],
    geometry:[
      'The item pushed to a single third, negative space dominating the rest of the frame.',
      'Vast negative space surrounding a small off-center item, scale as the organizing principle.',
      'Horizon line cutting the frame, the item reduced to a single graphic point within it.',
      'The item set low against a tall expanse of environment above it.',
      'A wide horizontal composition, the item a small accent on one side.',
      'The item placed at an intersection of thirds, surroundings filling the rest.',
      'Layered bands of environment, the item a single break in the pattern.',
      'The item anchored to one edge, an open field stretching away from it.',
      'Strong negative space above and around, the item grounding the lower frame.',
      'The item as a lone vertical accent against broad horizontal masses.',
      'Deep perspective lines converging past the item, scale emphasised by the space.'
    ]
  },
  ws:{
    position:[
      'positioned at a natural working distance, the whole item inside the frame',
      'set at mid-distance, the item fully contained within the shot',
      'framed to hold the whole item, top to bottom, inside the space',
      'placed to show the item complete, environment surrounding it evenly',
      'set back enough to keep the entire item and its footing in frame'
    ],
    focus:[
      'focus resolved across the whole item, background easing into softness',
      'moderate depth, the item sharp end to end, the space behind softening',
      'focus settled on the full item, falling away just behind it',
      'focus on the item\'s whole form, the background dissolving gently behind',
      'even focus across the item, the surroundings beginning to blur past it',
      'the full item held crisp, depth falling away beyond its rear edge',
      'focus carried across the entire item, environment softening at the margins'
    ],
    frame:[
      'shown in full, every edge and surface of the item readable within the space',
      'fully visible within the frame, the environment still claiming equal weight',
      'standing whole inside the scene, scale balanced between item and place',
      'the entire item held in frame, its form doing the visual work',
      'complete within the frame, surroundings giving it room to read',
      'the whole item legible, balanced against the space it occupies',
      'shown top to bottom, the environment framing without crowding it',
      'the full form contained, scale shared evenly with the setting'
    ],
    midground:[
      'The item holds the sharpest focus in the composition, fully in frame.',
      'The whole item resolves clearly, the rest of the frame falling away behind.',
      'The item anchors the frame, focus concentrated across its full form.',
      'The item sits on the focal plane, the background already softening.',
      'The complete item carries the frame, surroundings yielding behind it.',
      'The item reads end to end, the environment receding into soft tone.',
      'The full form of the item holds focus, the scene easing back around it.',
      'The item dominates the focal plane while the space settles behind.',
      'The whole item stays crisp, the background drifting just out of focus.'
    ],
    geometry:[
      'The item placed on a vertical third, the rest of the frame carrying the weight of the space.',
      'Balanced geometry between item and environment, no single element overwhelming the other.',
      'The item anchored low in the frame, headroom left to the scale of the place.',
      'The item centred with even margins, the setting balanced around it.',
      'The item set on one third, the opposing space giving it room to breathe.',
      'A stable composition, the item\'s mass balanced against open environment.',
      'The item grounded at the base, vertical space rising above it.',
      'The item offset slightly, negative space drawing attention toward it.',
      'Even weight across the frame, the item the clear point of focus.',
      'The item\'s footprint anchoring the lower third, scene layered above.',
      'Symmetry loosely broken, the item just off the central axis.'
    ]
  },
  cowboy:{
    position:[
      'positioned at working distance, the item\'s base and body filling the frame',
      'set closer in, the item\'s lower section dominating the shot',
      'framed to hold the item\'s main body and base, closer to the lens',
      'placed at a tighter range, the item\'s structure carrying the frame',
      'brought in close, the item\'s lower body and base commanding the frame'
    ],
    focus:[
      'focus resolved on the item\'s main body, background easing into softness',
      'shallow-to-moderate depth, the item\'s structure sharp, space behind softening',
      'focus settled on the item\'s base and body, falling away just behind',
      'focus on the item\'s main section, the background dissolving gently behind',
      'the item\'s lower body crisp, depth opening into blur beyond it',
      'focus held across the item\'s base and structure, surroundings softening',
      'the item\'s main mass sharp, the rear of the frame easing out of focus'
    ],
    frame:[
      'framed from a closer distance, the item\'s lower half and base clearly visible',
      'visible from a tighter range, the item\'s main body and base readable',
      'cropped to the item\'s working section, key parts fully in frame',
      'held close enough to read the item\'s base and main structure',
      'the item\'s lower body and base dominating, top edge cropped lightly',
      'framed on the item\'s structural core, base anchoring the bottom edge',
      'cropped just above the item\'s body, its base firmly in frame',
      'the item\'s main section and footing held, surroundings minimal'
    ],
    midground:[
      'The item\'s main body holds the sharpest focus in the composition.',
      'The item\'s structure resolves clearly, the rest of the frame falling away behind.',
      'The item\'s base and body anchor the frame, focus concentrated there.',
      'The item\'s working section sits on the focal plane, background softening.',
      'The item\'s lower body carries the frame, the scene receding behind.',
      'The item\'s structural core stays crisp, surroundings drifting back.',
      'The item\'s base and mass hold focus, the background easing into blur.',
      'The item\'s main body commands the focal plane, the rest softening.',
      'The item\'s structure dominates, the environment dissolving behind it.'
    ],
    geometry:[
      'The item occupies the central third, its base breaking the frame\'s lower edge.',
      'Weight concentrated in the upper two-thirds, the item\'s base anchoring the bottom of the frame.',
      'A loose vertical column formed by the item, environment easing in at both edges.',
      'The item\'s mass filling the central frame, base grounded at the lower edge.',
      'The item set just off-centre, its body forming the dominant vertical.',
      'The item\'s structure rising from the lower edge, headroom held above.',
      'Strong vertical emphasis from the item\'s body, margins kept narrow.',
      'The item\'s base anchoring one third, its body climbing the frame.',
      'The item\'s lower mass weighting the composition toward the base.',
      'The item centred and solid, environment compressed to the edges.',
      'The item\'s body bisecting the frame, weight settled at the bottom.'
    ]
  },
  ms:{
    position:[
      'positioned at a close working range, the item\'s body dominating the frame',
      'set near, the item\'s main structure filling most of the shot',
      'framed tightly on the item\'s central section, little else included',
      'placed close enough to read the item\'s main parts clearly',
      'brought in tight, the item\'s central body owning the frame'
    ],
    focus:[
      'focus resolved on the item\'s main mechanism, background easing into softness',
      'shallow depth, the item\'s structure sharp, the space behind opening into blur',
      'focus settled on the item\'s body, falling away just behind it',
      'focus on the item\'s main section, the background dissolving gently behind',
      'the item\'s central body crisp, depth collapsing into blur beyond',
      'focus pinned to the item\'s main parts, surroundings melting back',
      'the item\'s structure sharp, the rear of the frame softening quickly'
    ],
    frame:[
      'framed at a close-medium distance, the item\'s main section filling most of the frame',
      'visible mid-range, the item\'s body and key parts dominating the frame',
      'cropped to the item\'s central structure, surrounding context minimal',
      'held close enough to read the item\'s main mechanism clearly',
      'the item\'s central body filling the frame, edges lightly cropped',
      'framed on the item\'s working parts, little surrounding context left',
      'the item\'s main section dominating, top and base edges trimmed',
      'cropped tight on the item\'s body, key parts fully legible'
    ],
    midground:[
      'The item\'s main structure holds the sharpest focus in the composition.',
      'The item\'s body resolves clearly, the rest of the frame falling away behind.',
      'The item\'s central section anchors the frame, focus concentrated there.',
      'The item\'s main mechanism sits on the focal plane, background softening.',
      'The item\'s body carries the frame, surroundings receding into blur.',
      'The item\'s central parts stay crisp, the scene dissolving behind.',
      'The item\'s working section commands focus, background easing out.',
      'The item\'s structure dominates the focal plane, the rest softening.',
      'The item\'s main body holds sharp, environment drifting out of focus.'
    ],
    geometry:[
      'The item\'s main section placed on the upper third, its base anchoring the bottom.',
      'Centered weight with generous negative space to one side.',
      'A tight vertical block formed by the item\'s body, background reduced to soft shape.',
      'The item\'s mass filling the central frame, margins kept tight.',
      'The item set off-centre, its body the dominant graphic shape.',
      'The item\'s structure weighting the frame, soft tone filling the rest.',
      'The item\'s body bisecting the frame, balance held to one side.',
      'The item centred and solid against a softened backdrop.',
      'The item\'s main section on a third, negative space opposite it.',
      'The item\'s mass anchoring the lower frame, headroom above.',
      'A compact composition, the item\'s body filling most of the frame.'
    ]
  },
  mcu:{
    position:[
      'positioned very close, a single section of the item filling the frame',
      'set tight on one part of the item, little else included',
      'framed to isolate a key section of the item, nothing else competing',
      'placed close enough to fill the frame with one part of the item',
      'brought right in, one defining section of the item owning the frame'
    ],
    focus:[
      'focus resolved on a single section of the item, fully sharp',
      'shallow depth, one part of the item crisp, everything else falling away',
      'focus held on a defining feature of the item, depth falling away quickly',
      'tight focus on the item\'s key section, surroundings melting back',
      'the item\'s key part pinned sharp, depth dissolving immediately behind',
      'focus narrowed to one section of the item, the rest blurring out',
      'a single feature held crisp, the surrounding frame softening fast'
    ],
    frame:[
      'framed close on a key section of the item, the rest cropped away',
      'a tight crop on one part of the item, fully legible and dominant',
      'cropped just past the item\'s main feature, nothing else distracting',
      'held tight on a defining section of the item, fully commanding the frame',
      'the item\'s key part filling the frame, surrounding form cropped off',
      'cropped close on one section, the item\'s feature the whole subject',
      'a single part of the item held large, edges trimmed tight',
      'framed on the item\'s defining feature, context cropped to nothing'
    ],
    midground:[
      'This section of the item commands the full weight of the shot.',
      'The key feature of the item fills most of the frame, fully legible.',
      'This part of the item anchors the frame, the rest cropped away.',
      'The defining section of the item fills the rest of the visible frame.',
      'This feature of the item carries the frame, nothing else competing.',
      'The item\'s key section dominates, surrounding form left behind.',
      'This part of the item holds the focal weight, edges falling away.',
      'The item\'s defining feature commands the frame, fully resolved.',
      'This section of the item is the clear subject, the rest cropped out.'
    ],
    geometry:[
      'The item\'s feature fills the frame off-center, one edge aligned near the upper third.',
      'Tight cropping leaves almost no negative space, the item\'s feature the entire geometry.',
      'Asymmetric crop, more margin on one side than the other, the feature on the dominant line.',
      'The item\'s key section dominating, only a sliver of margin remaining.',
      'The feature set on a third, the crop tight around its edges.',
      'The item\'s part filling the frame, balance held just off-centre.',
      'A near-full crop, the item\'s feature touching more than one edge.',
      'The item\'s section weighting one side, soft tone filling the rest.',
      'The feature placed high in the frame, lower edge cropped close.',
      'A compact graphic block formed by the item\'s key part.',
      'The item\'s feature centred and dominant, margins reduced to minimum.'
    ]
  },
  cu:{
    position:[
      'positioned extremely close, the item\'s surface dominating the entire frame',
      'set right up against the item, surface texture filling the shot',
      'framed to hold only the item\'s surface, nothing else in view',
      'placed at minimal distance, the item\'s material commanding the frame',
      'pressed in close, the item\'s surface spanning the whole frame'
    ],
    focus:[
      'the item\'s surface fills the frame, every texture and micro-detail visible',
      'focus held tight on the item\'s material, depth falling away instantly',
      'shallow depth, the item\'s surface sharp, nothing else readable',
      'focus on the item\'s material alone, magnified and fully resolved',
      'the item\'s surface pinned crisp, depth collapsing within millimetres',
      'focus locked on the item\'s texture, surroundings absent from the plane',
      'the material held sharp edge to edge, depth vanishing immediately'
    ],
    frame:[
      'the item\'s surface fills the frame, every texture and detail visible',
      'cropped tight on the item, nothing but its surface remaining',
      'the item\'s material occupies the entirety of the frame',
      'held tight on the item\'s surface, detail magnified and unguarded',
      'the item\'s texture spanning the frame, no context beyond it',
      'cropped to bare material, the surface the entire image',
      'the item\'s surface edge to edge, every flaw and grain legible',
      'framed wholly on the material, the wider form cropped out'
    ],
    midground:[
      'Every texture and detail of the item\'s surface is fully legible here.',
      'The item\'s material spans edge to edge, fully resolved.',
      'Surface texture of the item dominates, nothing else competing for focus.',
      'The item\'s surface fills the frame, detail magnified throughout.',
      'The item\'s material carries the whole frame, texture razor-clear.',
      'Every grain of the item\'s surface reads, the form reduced to texture.',
      'The item\'s surface is the entire subject, magnified and sharp.',
      'The material dominates completely, every mark on it legible.',
      'The item\'s texture fills the plane, nothing beyond it in view.'
    ],
    geometry:[
      'The item\'s detail placed precisely on the upper third, the rest falling away below.',
      'Extreme crop, the item breaking out of the frame on at least one edge.',
      'A single feature as the focal anchor, everything else secondary to it.',
      'The item\'s surface filling the frame, texture the only geometry.',
      'A near-abstract field of material, edges of the item cropped off.',
      'The item\'s texture aligned along one third, the rest of equal tone.',
      'The surface breaking every edge, scale of the material the subject.',
      'The item\'s grain running diagonally across the full frame.',
      'A flat plane of material, the item\'s surface its own composition.',
      'The item\'s texture weighting the frame, a single mark off-centre.',
      'The surface filling edge to edge, geometry reduced to pure texture.'
    ]
  },
  ecu:{
    position:[
      'positioned at extreme range, a single fragment of the item filling the frame',
      'set so close only one feature of the item remains visible',
      'framed to isolate a single fragment, everything else cropped away',
      'placed to hold only one part of the item, magnified and dominant',
      'pressed in to a single fragment, the rest of the item gone from frame'
    ],
    focus:[
      'focus held on a single fragment of the item, the rest cropped entirely',
      'extreme shallow depth, one tiny part of the item sharp, nothing else visible',
      'focus on a lone detail of the item, magnified and fully resolved',
      'tight focus on a single feature, the rest of the item absent from frame',
      'a sliver of the item held crisp, depth dissolving within a hair',
      'focus narrowed to one fragment, everything around it lost to blur',
      'the lone detail pinned sharp, the rest of the form cropped to nothing'
    ],
    frame:[
      'only a fragment of the item remains in frame — an edge, a seam, a single part',
      'the frame holds a single feature of the item, the rest cropped away entirely',
      'surface texture and a single part of the item dominate the frame',
      'a lone detail of the item fills the frame, the rest cropped to nothing',
      'a single seam or edge of the item filling the entire frame',
      'one fragment magnified to fill the frame, context gone',
      'the frame given over to a single part, the whole form unseen',
      'an isolated fragment dominating, every other part cropped out'
    ],
    midground:[
      'This single fragment of the item carries the entire weight of the frame.',
      'One feature of the item fills the frame, identity reduced to this detail.',
      'The isolated part of the item dominates, texture standing in for the whole.',
      'This fragment of the item is the entire visible subject.',
      'A lone part of the item holds the frame, the whole implied by it.',
      'This single feature carries everything, the rest absent from view.',
      'The fragment commands the frame, its texture the only subject.',
      'One isolated detail of the item fills the plane, fully magnified.',
      'This fragment is all that remains, identity carried by it alone.'
    ],
    geometry:[
      'The fragment breaks the frame on more than one edge, scale itself the subject.',
      'An almost abstract composition, the feature filling the frame without margin.',
      'Radical crop, no negative space remaining anywhere in the frame.',
      'The fragment running across the frame, geometry reduced to its lines.',
      'A single edge of the item bisecting the frame diagonally.',
      'The fragment off-centre, its texture the entire visual field.',
      'Extreme magnification, the item\'s detail abstracted into pure form.',
      'The feature touching all four edges, scale the only subject.',
      'A tight graphic crop, the fragment\'s shape its own composition.',
      'The fragment weighting one corner, the rest equal texture.',
      'No margin anywhere, the item\'s detail filling the frame completely.'
    ]
  },
  detail:{
    position:[
      'positioned to isolate a single detail of the item completely',
      'set so close that only one detail of the item remains in frame',
      'framed to hold nothing but a fragment of the item, context excluded',
      'placed to magnify a single part of the item, everything else absent',
      'set tight on one isolated detail, the rest of the item out of frame'
    ],
    focus:[
      'focus held entirely on the isolated detail of the item',
      'extreme shallow depth, a single part of the item sharp, nothing else present',
      'focus on the detail alone, magnified and fully resolved',
      'tight focus on this fragment of the item, context entirely excluded',
      'the isolated detail pinned crisp, depth gone everywhere else',
      'focus locked on one detail, the surrounding form dissolved',
      'the single detail held sharp, nothing around it in the plane'
    ],
    frame:[
      'only the detail of the item is visible — a part, a surface, a fragment — nothing else in frame',
      'the frame holds a single detail of the item, isolated from any wider context',
      'identity is carried entirely by this detail of the item, nothing else present',
      'a single part of the item fills the frame, severed from any wider scene',
      'the detail magnified to fill the frame, no surrounding context',
      'one isolated detail dominating, the whole item unseen',
      'the frame reduced to a single detail, everything else cropped away',
      'a lone detail held large, severed from the rest of the form'
    ],
    midground:[
      'The lone detail of the item carries everything, its surface the entire subject.',
      'This isolated part of the item is the entire visible frame.',
      'The detail of the item fills the frame, severed from any wider context.',
      'Only this fragment of the item is legible; nothing else is present.',
      'The single detail holds the whole frame, magnified and clear.',
      'This isolated part commands the frame, the rest unseen.',
      'The detail is the only subject, its texture carrying the image.',
      'One part of the item fills the plane, fully resolved and alone.',
      'This detail stands in for the whole, nothing else competing.'
    ],
    geometry:[
      'The item placed off-center, negative space used deliberately around its edges.',
      'A tight, almost abstract crop, the detail itself becoming pure graphic shape.',
      'Asymmetric framing isolates the item against an empty field of soft tone.',
      'The detail set on a third, soft empty tone filling the rest.',
      'The detail centred and isolated, clean negative space around it.',
      'A minimal composition, the detail the single deliberate mark.',
      'The detail weighting one side, an open field opposite it.',
      'The item\'s detail floating in soft tone, edges given room.',
      'A graphic, almost abstract framing of the single detail.',
      'The detail anchored low, empty tone rising above it.',
      'The detail offset against negative space, balance held off-centre.'
    ]
  }
};
/* === DATA:ITEM_FRAMING END === */

/* === DATA:LIGHTING START === */
var LIGHTING = {
  golden_hour: {
    label:'Golden Hour',
    defaultStock:'v3_250d_5207',
    movement:[
      'drifting calmly, unhurried, holding its distance',
      'locked off, composed and patient, no urgency in the frame',
      'settled and still, letting the low sun do the work'
    ],
    light:[
      'Single source — sun low at roughly eight degrees above the horizon at 3.000K, raking in from the side at a three-quarter back angle. Sky fill at 5.500K lifts the shadows two stops below key. Shadows fall long and soft-edged. Specular highlights sit near 95 IRE with visible halation bloom.',
      'Late sun at 2.900K skims in nearly parallel to the ground, throwing long soft-edged shadows toward the lens. Open sky fill at roughly 5.400K holds detail two stops under key. Highlights bloom softly past 90 IRE.',
      'Warm low sun at 3.100K crosses the frame at a raking angle, shadows stretching long and gentle at the edges. Sky bounce fills the shade two stops below key, with halation lifting the brightest edges past 90 IRE.'
    ],
    wardrobe:[
      'Natural fabric in unbleached tones, rim-lit along the edge, absorbing the warmth of the midtones.',
      'Light cotton catching a thin rim of warm light along its silhouette, tone deepening where it folds away from the source.',
      'Loose natural fiber, edges glowing where the low sun grazes them, color sinking warm in the shadow folds.'
    ],
    makeup:[
      'Real skin texture, a faint sheen of sweat on the temple, oil at the bridge of the nose catching the rim light.',
      'Visible skin texture, light perspiration along the hairline, a thin highlight tracing the cheekbone in the raking light.',
      'Unretouched skin, faint oil catching the warm rim light across the brow and nose.'
    ],
    geometryFlavor:[
      'the warm flare bleeding in from one side pulling the eye away from center',
      'the low sun\'s flare anchoring one corner of the frame, soft and unbalanced',
      'a soft pool of flare breaking the frame\'s symmetry along the top edge'
    ]
  },
  low_key: {
    label:'Low Key (dramático)',
    defaultStock:'v3_500t_5219',
    movement:[
      'hand-held, breathing slightly, never fully settled',
      'tense and close, the frame drifting with the body',
      'held loosely, an unsteady weight to the movement'
    ],
    light:[
      'Single hard key at 3.200K, roughly 75 degrees off-axis and slightly above eye line. Fill held under two percent of key — effectively none. One half of the face crushes toward 15 IRE while the lit half sits near 55 IRE, the shadow line cutting cleanly across the bridge of the nose.',
      'A single hard source at 3.100K rakes in from a steep side angle, almost no fill surviving. The shadow side of the face falls near 15 IRE against a lit side closer to 55 IRE, the divide sharp across the nose.',
      'Hard tungsten key at 3.200K from high off-axis, fill essentially absent. Roughly two-thirds of the frame reads near black, the lit fraction of the face holding around 55 IRE.'
    ],
    wardrobe:[
      'Dark heavy fabric absorbing nearly all light, texture only readable where it edges into the lit half.',
      'Black material disappearing into the surrounding shadow, no surface detail surviving on the unlit side.',
      'Dense dark fiber swallowed by the low key, a single seam catching the only available light.'
    ],
    makeup:[
      'Real skin, visible pores on the lit cheek, dry texture, no sheen or powder.',
      'Unpolished skin texture on the lit half of the face, the shadow side rendered featureless.',
      'Bare skin, faint dryness visible in the one lit patch, the rest lost to the dark.'
    ],
    geometryFlavor:[
      'two-thirds of the frame sitting in pure black, tension held in the remaining sliver of light',
      'a hard shadow line slicing the frame in two, weight pulled entirely to the lit fraction',
      'deep black mass dominating the composition, the lit fragment small and isolated'
    ]
  },
  spotlight: {
    label:'Spotlight (foco isolado)',
    defaultStock:'eterna_500t_8573',
    movement:[
      'locked off, holding perfectly still under the beam',
      'static and deliberate, the frame fixed while the light does the work',
      'fixed in place, patient, waiting inside the cone of light'
    ],
    light:[
      'A single hard spot at 3.200K falls from above at a narrow angle, an 18-degree beam landing on the head and shoulders. The beam\'s edge cuts cleanly across the chest. Outside the cone, the frame drops near 5 IRE; inside it, the skin reads close to 65 IRE.',
      'Narrow hard spot at 3.300K, beam tight enough to isolate the head and upper torso, falloff brutal at its edge. Background sits near black while the lit zone climbs toward 65 IRE.',
      'A tight cone of light at roughly 5.600K drops straight down, its edge a hard graphic line across the shoulders. Everything outside the beam falls to near total darkness.'
    ],
    wardrobe:[
      'Pale fabric blowing out slightly where the beam lands directly, dropping to black at its edge.',
      'Light material catching the full intensity of the beam at the shoulder, fading to nothing past the cone\'s edge.',
      'Plain fabric reading bright only where the spot lands, swallowed by black everywhere else.'
    ],
    makeup:[
      'Real skin, sweat catching the overhead light, oil visible on the forehead, no powder.',
      'Unretouched skin under the hard top light, a faint sheen across the brow where the beam lands directly.',
      'Bare skin texture lit starkly from above, every pore and faint line legible inside the beam.'
    ],
    geometryFlavor:[
      'the beam\'s hard edge reading as a graphic line cutting straight across the frame',
      'a single illuminated column surrounded entirely by black, vertical compression dominating',
      'the cone of light as the only legible shape in an otherwise black frame'
    ]
  },
  chiaroscuro: {
    label:'Chiaroscuro (claro-escuro pictórico)',
    defaultStock:'kodak_2383',
    movement:[
      'composed and still, observed rather than rushed',
      'slightly elevated, deliberate, almost painterly in its patience',
      'settled into a quiet, studied stillness'
    ],
    light:[
      'Single source through a frosted window at roughly 2.900K, arriving from above and to the side at about 55 degrees — a classic Rembrandt triangle forming on the shadow cheek. Bounce fill from a nearby wall sits four stops under key, warming the shadow without erasing it. The lit side nears 70 IRE, the shadow side around 25 IRE.',
      'Soft directional window light at 2.800K crosses at a high side angle, modeling the face in the round. A weak bounce fill four stops below key keeps the shadow side warm rather than empty, lit skin near 70 IRE against shadow near 25 IRE.',
      'A single diffused source at roughly 3.000K falls from high and to one side, sculpting volume across the face. Fill arrives only as warm bounce, four stops under key, leaving the shadow side legible but dim.'
    ],
    wardrobe:[
      'Heavy natural fiber in earth tones, the shadow side of the fabric disappearing into the surrounding dark.',
      'Dense woven material, lit side modeled in soft gradients, shadow side reduced to a dark mass.',
      'Earth-toned fabric catching the window light unevenly, folds reading as soft volume rather than flat tone.'
    ],
    makeup:[
      'Real skin texture, fine lines around the eyes visible, no foundation, the light modeling every contour.',
      'Unretouched skin, the window light revealing fine surface texture across the lit cheek.',
      'Bare skin, faint texture and asymmetry visible exactly where the light models the face.'
    ],
    geometryFlavor:[
      'painterly geometry, weight balanced between the lit face and a dark mass opposite it',
      'the Rembrandt triangle anchoring the composition, the rest of the frame receding into shadow',
      'a quiet diagonal of light separating the modeled face from the surrounding dark'
    ]
  }
};
LIGHTING.cutter_lights = {
  label:'Cutter Lights (cortes gráficos de luz)',
  defaultStock:'double_x_5222',
  movement:[
    'locked on a fixed support, deliberate and architectural',
    'static, precise, holding the geometric pattern of light without drifting',
    'fixed and patient, letting the cut shadows do the framing'
  ],
  light:[
    'A single hard source at roughly 3.400K, cut by a vertical flag positioned a few feet from the subject, casts a clean shadow bar across the face and the wall behind. A second, narrower cut isolates a band of light across the eyes alone. The lit bands sit near 65 IRE, the cut shadow near 12 IRE, the transition between them sharp.',
    'Hard light at 3.300K is sliced by flags into clean bars, one crossing the bridge of the nose, another isolating a strip across the eyes. Lit fractions read near 65 IRE against shadow bands near 12 IRE, the edges razor sharp.',
    'A hard source cut by two flags breaks the light into graphic bands across the face and the wall, lit strips near 65 IRE against near-black gaps, every transition sharp rather than gradual.'
  ],
  wardrobe:[
    'Dark fabric absorbed by the shadow bands, only a narrow strip — a collar, a shoulder seam — catching any light.',
    'Plain dark material, lit only where a cut band happens to cross it, the rest folding into black.',
    'Black fabric broken by a single bar of light, the rest of the garment indistinguishable from the surrounding dark.'
  ],
  makeup:[
    'Real skin, sweat visible in the lit band across the eyes, no powder, the gaze wet and reflective.',
    'Bare skin texture, visible only within the lit bars, the rest of the face lost to the cut shadow.',
    'Unretouched skin catching light only in the narrow band the cutters allow through.'
  ],
  geometryFlavor:[
    'horizontal bands acting as a graphic ruling across the entire frame, architectural in its rigor',
    'the cut shadows slicing the subject into clean geometric thirds',
    'repeating bars of light and shadow turning the composition into a strict architectural grid'
  ]
};
LIGHTING.hard_flash = {
  label:'Hard Flash (editorial cru)',
  defaultStock:'eterna_500t_8573',
  movement:[
    'hand-held at a blunt, frontal angle, unpolished and immediate',
    'loose and direct, the framing slightly off-hand rather than composed',
    'held casually close, frontal and unguarded'
  ],
  light:[
    'A single on-axis hard flash at 5.600K fires straight at the subject with no modifier. Falloff is steep — highlights climb near 90 IRE while the background drops to roughly 18 IRE. A hard shadow projects onto the surface directly behind, displaced just below the subject\'s outline.',
    'Bare on-camera flash at 5.600K hits the subject directly, blowing the nearest highlights toward 90 IRE while the background collapses to near 18 IRE. A crisp shadow doubles the subject\'s silhouette on the wall behind.',
    'Direct flash at roughly 5.600K, unmodified, fires straight into the frame. Skin highlights spike hot while everything behind the subject falls away fast, a hard-edged shadow trailing just behind the outline.'
  ],
  wardrobe:[
    'Plain fabric slightly desaturated by the flash, edges blown toward white where the light hits directly.',
    'Simple material reading flat and slightly bleached wherever the flash lands head-on.',
    'Everyday fabric, color slightly washed out, texture flattened by the direct hit of light.'
  ],
  makeup:[
    'Real skin, oil and sweat catching hard specular hits on the forehead and nose, pores visible, no powder.',
    'Unretouched skin, the flash exaggerating every patch of oil and texture across the face.',
    'Bare skin reflecting the flash in small hard highlights across the nose and cheekbones.'
  ],
  geometryFlavor:[
    'frontal symmetry made intentionally banal by the flat hit of direct flash',
    'a doubled silhouette — subject and hard shadow — reading as a single graphic unit',
    'blunt centered framing, the flash flattening any sense of depth in the composition'
  ]
};
LIGHTING.silhouette = {
  label:'Silhouette (contorno)',
  defaultStock:'v3_250d_5207',
  movement:[
    'locked off, patient, letting the shape resolve on its own',
    'still and deliberate, composed against the light',
    'fixed low, holding the contour without drifting'
  ],
  light:[
    'A single motivated source behind the subject — exposed so the background itself reads near 75 IRE. No fill arrives from the camera side. The subject collapses to near 4 IRE, just a thin rim surviving where the light wraps around the edge.',
    'Backlight alone, bright enough to push the background past 70 IRE, leaves the subject as a near-total silhouette around 5 IRE, only the faintest rim tracing its outline.',
    'A bright source behind the frame exposes the background near 75 IRE while the unlit subject falls to near black, contour readable only through a thin edge of light.'
  ],
  wardrobe:[
    'Heavy fabric reading as a single solid black mass, no surface detail surviving against the light.',
    'Dense material collapsing entirely into the silhouette, only the outline of its shape legible.',
    'Dark clothing fused into the subject\'s contour, texture replaced entirely by shape.'
  ],
  makeup:[
    'Not visible — the subject reads as solid silhouette with no surface detail recoverable.',
    'No skin detail survives the exposure; only the contour of the face is legible.',
    'Featureless against the light, identity carried purely by outline and posture.'
  ],
  geometryFlavor:[
    'the subject as a vertical graphic mass against a luminous field, negative space dominant',
    'pure contour against a bright field, the silhouette doing all the compositional work',
    'a dark shape anchored to one side, the light-filled field carrying the rest of the frame\'s weight'
  ]
};
LIGHTING.high_key = {
  label:'High Key (claro e parejo)',
  defaultStock:'portra_400',
  movement:[
    'eye level, open and unhurried, the framing clean and direct',
    'steady and composed, the light even across the whole frame',
    'relaxed and frontal, nothing hidden in shadow'
  ],
  light:[
    'Broad soft key at 5.400K wrapping the subject almost shadowless, with a near-equal fill at 5.500K lifting every shadow to within one stop of key. Highlights held at 80 IRE, shadows never falling below 60 IRE. Background lit clean and bright behind.',
    'Large diffused frontal source at 5.500K, fill almost matching key for a one-to-one ratio, shadows barely present. The whole frame sits high on the curve, skin near 75 IRE, background bright and even.',
    'Even wraparound daylight-balanced light at 5.600K, soft and shadowless, fill lifting the darkest zones to 60 IRE. Low contrast, airy, clean highlights rolling off gently near the top of the scale.'
  ],
  wardrobe:[
    'Light fabric reading bright and clean, soft folds with gentle shadow, color held pastel under the even light.',
    'Pale material catching the soft key uniformly, texture readable, almost no dark side.',
    'Clean light-toned cloth, evenly lit, its color soft and unsaturated across the frame.'
  ],
  makeup:[
    'Real skin texture, soft and even under the wraparound light, faint natural sheen, pores still visible up close.',
    'Unretouched skin lit cleanly, minimal shadow in the contours, light catching a gentle highlight on the cheekbone.',
    'Bare skin reading bright and smooth, fine texture still present, no harsh modeling.'
  ],
  geometryFlavor:[
    'an airy, open composition with bright negative space surrounding the subject',
    'clean balanced framing, the even light flattening depth into a soft graphic field',
    'the subject floating in bright space, contrast low, weight carried by shape rather than shadow'
  ]
};
LIGHTING.practical_neon = {
  label:'Practical / Neon noturno',
  defaultStock:'cinestill_800t',
  movement:[
    'hand-held at street level, drifting with the city, never fully still',
    'loose and roaming, the framing shifting with the practical lights',
    'unsteady and close, breathing with the night around the subject'
  ],
  light:[
    'Lit entirely by in-scene practicals — neon signage at 4.000K and warm sodium lamps at 2.200K pooling unevenly across the face. No film light. Pools of saturated color fall off into deep shadow, lit zones near 55 IRE, gaps dropping below 12 IRE.',
    'Motivated only by the environment — magenta and cyan neon wrapping one side at mixed Kelvin, a warm practical kicking the other. Color pooling on wet surfaces, shadows deep and chromatic, highlights blooming where signage flares.',
    'Pure practical light — storefront neon, headlights and street lamps at clashing color temperatures, painting the subject in uneven saturated patches. Deep night shadows between the pools, specular glints on damp skin and surfaces.'
  ],
  wardrobe:[
    'Dark fabric picking up colored reflections from the neon, surface wet-looking where the signage catches it.',
    'Plain material stained by the practical colors, one side magenta, the other warm, shadow side near black.',
    'Night clothing soaked in chromatic light, color shifting across the folds, edges lost to the dark.'
  ],
  makeup:[
    'Real skin slick under the night air, neon catching specular hits on the cheekbone and brow, pores visible in the lit pools.',
    'Unretouched skin, sweat and city damp reflecting colored highlights, oil on the nose flaring under the signage.',
    'Bare skin lit in chromatic patches, wet sheen catching the practicals, texture stark where the light lands.'
  ],
  geometryFlavor:[
    'pools of saturated color carving the frame into uneven lit and unlit zones',
    'neon lines and reflections cutting diagonals across a deep night composition',
    'the subject embedded in chromatic clutter, light fragments breaking the frame'
  ]
};
LIGHTING.backlight_rim = {
  label:'Backlight / Rim (contraluz)',
  defaultStock:'v3_500t_5219',
  movement:[
    'low and deliberate, holding the rim of light along the subject\'s edge',
    'steady, slightly behind the subject\'s plane, letting the backlight separate them',
    'composed and patient, the contour glowing against the dark'
  ],
  light:[
    'Strong backlight at 4.800K behind and slightly above the subject, raking the edge of the hair and shoulders into a bright rim near 85 IRE. Minimal frontal fill at two stops under, keeping the face modeled but low at 30 IRE. Background falls dark behind the lit contour.',
    'Hard rim source at 5.000K three-quarters behind, drawing a clean line of light down the cheek and shoulder. Front fill barely present, the face holding shadow detail near 35 IRE while the edge flares bright.',
    'Backlight at 4.600K separating the subject from a dark ground, hair and jaw catching a luminous rim, a soft bounce lifting the front of the face just enough to read.'
  ],
  wardrobe:[
    'Dark fabric edged with a bright rim where the backlight grazes it, the front falling into soft shadow.',
    'Material catching a luminous outline along its silhouette, surface detail low on the camera side.',
    'Cloth rim-lit at the shoulders and arms, the body otherwise sinking into the dark ground.'
  ],
  makeup:[
    'Real skin, a bright rim tracing the jaw and ear, the front of the face soft and low-lit, pores visible along the lit edge.',
    'Unretouched skin with a luminous contour on the cheekbone, faint sweat catching the backlight, front kept in gentle shadow.',
    'Bare skin haloed at the edge by the rim, the modeled front holding texture in the low fill.'
  ],
  geometryFlavor:[
    'a bright contour line separating the subject from a dark negative-space ground',
    'the rim of light acting as a graphic edge against deep shadow',
    'the lit outline carrying the composition, the dark front pulling the eye inward'
  ]
};
LIGHTING.window_soft = {
  label:'Window Soft (luz de janela)',
  defaultStock:'v3_250d_5207',
  movement:[
    'still and quiet, observing the subject in the soft daylight',
    'composed at a gentle angle, the window light wrapping naturally',
    'settled and calm, letting the diffused daylight model the face'
  ],
  light:[
    'Soft daylight through a large window at 5.600K, arriving from the side and wrapping gently around the face. Open shade fill from the room lifts the shadows to two stops under key. Highlights soft near 70 IRE, shadows gentle at 40 IRE, contrast low and naturalistic.',
    'Diffused window light at 5.400K from camera-side, soft-edged shadows falling away naturally, the room bouncing a quiet fill. Skin sits near 68 IRE on the lit side, shadows soft and open, no hard line anywhere.',
    'Large soft daylight source at 5.700K spilling in from a window, wrapping the subject in even gradients. Gentle falloff across the face, fill from pale walls keeping the shadow side readable and warm-neutral.'
  ],
  wardrobe:[
    'Natural fabric softly lit by the window, gentle gradient across the folds, color reading true and calm.',
    'Light cloth catching the diffused daylight, soft shadows in the creases, muted natural tone.',
    'Everyday material modeled in soft window light, texture gentle, color neutral and unforced.'
  ],
  makeup:[
    'Real skin texture, soft daylight revealing gentle modeling and fine surface detail, faint natural sheen.',
    'Unretouched skin lit softly from the window, pores and fine lines visible in the gentle gradient.',
    'Bare skin in diffused daylight, smooth soft transitions, natural texture fully present.'
  ],
  geometryFlavor:[
    'a calm naturalistic balance, soft light gradient guiding the eye across the frame',
    'gentle window-lit geometry, the shadow side anchoring one edge quietly',
    'soft daylight modeling giving the composition quiet depth and air'
  ]
};
LIGHTING.firelight = {
  label:'Firelight / Candlelight',
  defaultStock:'v3_500t_5219',
  movement:[
    'close and intimate, the warm light flickering across the subject',
    'low and still, drawn near the small warm source',
    'quiet and near, the unsteady glow breathing on the face'
  ],
  light:[
    'A single low warm source at 1.900K from below and to the side, simulating firelight, flickering uneven across the face. No fill — the far side drops to deep warm shadow near 12 IRE while the near cheek glows at 55 IRE. Soft warm falloff into darkness beyond.',
    'Candlelight at 2.000K from low and close, warm and unsteady, modeling the face from underneath. Zero fill, the unlit side sinking to near black, highlights warm and soft on the nearest planes.',
    'Flickering fire at 1.800K below the eyeline, throwing warm uneven light upward, deep shadow swallowing everything past the glow. Specular warmth catching the eyes and the bridge of the nose.'
  ],
  wardrobe:[
    'Fabric glowing warm where the firelight reaches it, dropping fast into deep shadow on the far side.',
    'Material catching an unsteady warm light on its nearest folds, the rest lost to the dark.',
    'Cloth lit amber and low, texture warm and soft, edges dissolving into the surrounding black.'
  ],
  makeup:[
    'Real skin lit warm from below, sweat catching the flicker, pores and texture stark in the low amber light.',
    'Unretouched skin glowing in the firelight, oil on the brow catching the unsteady warm highlights.',
    'Bare skin modeled by the warm low source, fine texture visible where the glow lands, shadow side dissolving.'
  ],
  geometryFlavor:[
    'a warm pool of light surrounded by deep shadow, the glow drawing the eye to the face',
    'low warm modeling carving the subject out of an enveloping dark',
    'the small light source anchoring an intimate, shadow-heavy composition'
  ]
};
LIGHTING.blue_hour = {
  label:'Blue Hour / Twilight',
  defaultStock:'ektachrome_e100',
  movement:[
    'still and contemplative, holding the cool fading light',
    'composed and low, the twilight even and soft across the frame',
    'quiet and patient, letting the cool dusk settle on the scene'
  ],
  light:[
    'Soft ambient twilight at 8.000K after sunset, cool and directionless, wrapping the subject in even blue light. A faint warm practical kicks in somewhere for contrast. Low overall level, highlights gentle near 55 IRE, shadows soft and cool at 30 IRE.',
    'Post-sunset sky light at 7.600K, soft and shadowless, the whole scene reading cool and low-contrast. A distant warm light source warms one edge slightly, the rest holding blue twilight gradients.',
    'Cool diffused dusk at 8.500K, the light even and fading, modeling the subject in soft blue. Gentle falloff, a single warm accent in frame against the prevailing cool, low IRE throughout.'
  ],
  wardrobe:[
    'Fabric reading cool and desaturated in the twilight, soft gradients, color muted toward blue.',
    'Material in soft blue dusk light, gentle shadows, tone quiet and cool across the folds.',
    'Cloth lit by the fading sky, color drained toward cool neutral, texture soft and low-contrast.'
  ],
  makeup:[
    'Real skin reading cool under the twilight, soft even modeling, fine texture visible in the low light.',
    'Unretouched skin in blue dusk light, gentle gradients, a faint warm accent catching one edge of the face.',
    'Bare skin lit cool and soft, pores faint but present, the cool cast settling into the shadows.'
  ],
  geometryFlavor:[
    'a cool low-contrast composition, soft twilight gradients carrying the frame',
    'the blue dusk flattening depth, a single warm accent breaking the cool field',
    'quiet even twilight geometry, the subject settled into a soft cool ground'
  ]
};
LIGHTING.colored_gels = {
  label:'Colored Gels (duotone)',
  defaultStock:'cinestill_800t',
  movement:[
    'composed and deliberate, the two color sources framing the subject',
    'steady, slightly stylized, holding the duotone split across the face',
    'fixed and graphic, letting the opposing colors model the form'
  ],
  light:[
    'Two opposing gelled sources — teal at 6.500K from one side, magenta at 4.000K from the other, each at hard three-quarter angles. Where they overlap on the face a neutral seam forms. Lit sides near 60 IRE in saturated color, the center transition cooler, background split between the two hues.',
    'Dual color gels, cyan camera-left and magenta camera-right, hard-edged and saturated, splitting the face into two chromatic halves. Minimal neutral fill, the colors meeting along the nose, shadows deep between them.',
    'Contrasting gels — cool teal key against a warm magenta kicker, both hard, painting opposite sides of the subject in pure color. A thin neutral band where they cross, saturated falloff into chromatic shadow.'
  ],
  wardrobe:[
    'Fabric split between teal and magenta light, color saturated on each side, a neutral seam where they meet.',
    'Material rendered in two opposing hues, the folds catching cyan on one edge and magenta on the other.',
    'Cloth painted by the colored gels, saturated chromatic sides falling into deep colored shadow.'
  ],
  makeup:[
    'Real skin split into cyan and magenta halves by the gels, specular highlights picking up each color, pores visible in the lit zones.',
    'Unretouched skin modeled by opposing colors, a neutral seam down the center, sweat catching chromatic glints.',
    'Bare skin lit in two saturated hues, texture stark where each gel lands, the transition cool and neutral.'
  ],
  geometryFlavor:[
    'the frame split into two chromatic halves, color doing the compositional division',
    'opposing hues carving the subject into a graphic duotone, saturated and deliberate',
    'a chromatic seam down the center, the two colors balancing the frame\'s weight'
  ]
};
/* === DATA:LIGHTING END === */

/* === DATA:VIDEO START === */
// Modelos de vídeo disponíveis (agrupados por família). sound=true só para Veo.
var VIDEO_MODELS = {
  kling_21m:{label:'Kling 2.1 Master', family:'Kling', sound:false},
  kling_21 :{label:'Kling 2.1', family:'Kling', sound:false},
  kling_25 :{label:'Kling 2.5', family:'Kling', sound:false},
  kling_26 :{label:'Kling 2.6', family:'Kling', sound:false},
  kling_26mc:{label:'Kling 2.6 Motion Control', family:'Kling', sound:false},
  kling_30 :{label:'Kling 3.0', family:'Kling', sound:false},
  kling_30t:{label:'Kling 3.0 Turbo', family:'Kling', sound:false},
  kling_30o:{label:'Kling 3.0 Omni', family:'Kling', sound:false},
  kling_30mc:{label:'Kling 3.0 Motion Control', family:'Kling', sound:false},
  seed_15p :{label:'Seedance 1.5 Pro', family:'Seedance', sound:false},
  seed_20  :{label:'Seedance 2.0', family:'Seedance', sound:false},
  seed_20f :{label:'Seedance 2.0 Fast', family:'Seedance', sound:false},
  seed_20m :{label:'Seedance 2.0 Mini', family:'Seedance', sound:false},
  veo_3    :{label:'Veo 3', family:'Veo', sound:true},
  veo_3f   :{label:'Veo 3 Fast', family:'Veo', sound:true},
  veo_31   :{label:'Veo 3.1', family:'Veo', sound:true},
  veo_31f  :{label:'Veo 3.1 Fast', family:'Veo', sound:true},
  veo_31l  :{label:'Veo 3.1 Lite', family:'Veo', sound:true}
};
var VIDEO_MODEL_GROUPS = ['Kling','Seedance','Veo'];

// Opções de movimento de câmera (rótulo amigável -> chave em VIDEO_MOTION).
var VIDEO_MOTION_OPTIONS = [
  { id:'static',   label:'Fixo — câmera parada' },
  { id:'push_in',  label:'Aproximar lentamente (push in)' },
  { id:'pull_out', label:'Afastar (pull out)' },
  { id:'track',    label:'Travelling lateral (tracking)' },
  { id:'follow',   label:'Seguir o sujeito (follow)' },
  { id:'crane',    label:'Grua (subir / descer)' },
  { id:'orbit',    label:'Orbitar o sujeito (arc)' },
  { id:'handheld', label:'Câmera na mão (sutil)' }
];

// Frases de movimento ao longo do tempo (5 por opção).
var VIDEO_MOTION = {
  static:[
    'holds locked and still on its mount, no movement, the framing fixed for the entire take',
    'stays completely static, a fixed frame letting the action play out within it',
    'remains locked off and motionless, the composition unchanging from start to finish',
    'is fixed in place, no pan and no push, the frame steady throughout',
    'holds still on the tripod, the shot composed and unmoving for the whole clip'
  ],
  push_in:[
    'pushes in slowly and steadily toward the subject, the framing tightening at an even pace',
    'eases forward in a slow continuous dolly toward the subject, closing the distance smoothly',
    'creeps in gradually on the subject, the move unbroken and controlled from first frame to last',
    'tracks slowly inward, tightening on the subject at a constant, deliberate speed',
    'advances toward the subject in one smooth even push, never speeding up or slowing down'
  ],
  pull_out:[
    'pulls back slowly from the subject, the surrounding space opening up at a steady pace',
    'eases backward in a continuous dolly, revealing more of the scene around the subject',
    'retreats smoothly from the subject, the frame widening evenly across the take',
    'draws back in one controlled move, the environment growing around the figure',
    'glides backward at a constant speed, opening the shot from tight to wide'
  ],
  track:[
    'tracks laterally alongside the subject at a steady even speed, the parallax shifting smoothly',
    'glides sideways on a parallel dolly, holding the subject as the background slides past',
    'moves laterally in one continuous pass, the framing on the subject held constant',
    'tracks left to right at a constant pace, the scene drifting evenly behind the subject',
    'slides sideways smoothly, keeping the subject framed as the foreground passes through'
  ],
  follow:[
    'follows the subject from a steady distance, matching their pace without lurching',
    'trails the subject smoothly, holding a constant gap as they move through the space',
    'keeps pace with the subject in a continuous follow, the framing held steady on them',
    'moves with the subject at an even speed, the background flowing past behind',
    'tracks behind the subject in one smooth unbroken follow across the shot'
  ],
  crane:[
    'rises slowly on a crane move, the angle lifting above the subject at an even pace',
    'cranes gently upward across the take, the perspective climbing in one smooth move',
    'descends slowly on a crane, the framing settling down toward the subject',
    'lifts steadily on a jib, the vantage rising without any jolt',
    'moves vertically on a crane at a constant speed, smooth from start to finish'
  ],
  orbit:[
    'arcs slowly around the subject, orbiting at a steady radius and even speed',
    'circles the subject in one smooth continuous arc, the background rotating behind',
    'orbits gently around the figure, the move unbroken and controlled throughout',
    'sweeps around the subject on a constant arc, the parallax turning evenly',
    'rotates slowly about the subject, holding the radius steady across the shot'
  ],
  handheld:[
    'holds the subject with a subtle handheld float, small natural movements, never shaky',
    'carries a gentle handheld presence, soft organic drift, the framing kept steady on the subject',
    'has a light handheld feel, faint natural sway, no abrupt motion',
    'breathes slightly with a restrained handheld touch, the subject held in frame',
    'keeps a soft handheld quality, minute lifelike movement, smooth and controlled'
  ]
};

// Progressão da ação no tempo — {action} recebe o texto do usuário (7 frases).
var VIDEO_PROGRESS = [
  'The subject is {action}, the motion continuing naturally and without interruption across the entire shot.',
  'Throughout the take the subject keeps {action}, the gesture unbroken from the first frame to the last.',
  'The subject stays {action}, the movement unfolding at a real, unhurried pace.',
  'From the opening frame the subject is {action}, holding the action steadily as time passes.',
  'The subject continues {action}, every beat of the motion legible and deliberate.',
  'The action — {action} — plays out continuously, the subject never breaking from it.',
  'The subject is {action} throughout, the gesture carried smoothly the whole length of the clip.'
];

// Progressão da ação no tempo para ITENS sem pessoa (sem "gesture"/antropomorfismo, 6 frases).
var ITEM_PROGRESS = [
  'The item remains {action} throughout the entire shot, with no sudden change in its position or state.',
  'Across the whole take the item stays {action}, consistent from the first frame to the last.',
  'The item is shown {action}, the situation held steady and unchanged for the duration of the clip.',
  'Through the take the item continues {action}, with nothing about its state shifting abruptly.',
  'The item is {action} for the full length of the shot, the scene holding that same condition throughout.',
  'The item remains visibly {action}, the context staying consistent across the entire clip.'
];

// Comportamento de superfície/material para ITENS sem pessoa (substitui wardrobe/makeup, 8 frases).
var ITEM_SURFACE = [
  'Real material surface, visible wear, scuffs and paint chips catching the light unevenly across edges and corners.',
  'Worn surface texture, scratches and faded paint visible, light catching raised edges and dulled flat panels differently.',
  'Practical surface finish, dust and light grime settled into seams and joints, reflections breaking unevenly on painted panels.',
  'Material reads with honest use — small dents, sticker edges peeling slightly, light skimming across uneven, non-uniform surfaces.',
  'Surface shows real-world texture: matte paint dulled by handling, metal edges catching sharper specular highlights than the body.',
  'Decals and warning labels slightly worn at the corners, surface grime concentrated near handles and high-contact areas.',
  'Mixed material finish — metal, plastic and rubber parts each reflecting the light differently, none of it artificially clean.',
  'Surface detail kept honest and unpolished: visible fasteners, panel seams and use marks, no glossy or CGI-perfect finish.'
];

// Comportamento de superfície/acabamento para PRODUTOS hero (limpo, polido, sem desgaste, 8 frases).
var PRODUCT_SURFACE = [
  'Pristine surface finish, clean and unmarked, light reflecting evenly across smooth panels and edges.',
  'Flawless material surface, no scratches or dust, controlled specular highlights tracing the form cleanly.',
  'Polished, intact finish — even colour, crisp edges, reflections clean and deliberate, nothing worn.',
  'Immaculate surface, smooth and uniform, soft highlights gliding across the material without blemish.',
  'Factory-fresh finish, label and surface crisp and undamaged, light catching the form in clean gradients.',
  'Clean finish, glossy where the material is glossy and even matte where it is not, reflections controlled, no grime or wear.',
  'Spotless material, sharp printed detail on the label, highlights smooth and even across the body.',
  'Showroom-clean finish, every edge and surface intact, light modelling the form softly and precisely.'
];

// Fundo de estúdio para PRODUTOS — injetado no ambiente quando o modo produto está ativo.
var PRODUCT_BG = {
  studio:   'a clean seamless studio backdrop, evenly lit and free of distractions',
  gradient: 'a smooth studio gradient background, a soft transition from light to shadow',
  neutral:  'a plain neutral surface, the product isolated and uncluttered',
  context:  ''
};

// Cadência / frame-rate (9 frases).
var VIDEO_PACING = [
  'playing out in real time at a natural 24fps cadence',
  'unfolding at a steady 24fps, the motion smooth and lifelike',
  'rendered at a natural frame rate, the pacing calm and unhurried',
  'at 24fps, with motion that feels real and continuous',
  'the timing even and naturalistic across the whole clip',
  'paced in real time, with no ramping or speed changes',
  'a steady cadence throughout, the action at lifelike speed',
  '24fps, the movement fluid and free of stutter',
  'real-time pacing, every beat of the motion clear'
];

// Travas de movimento / consistência (8 frases).
var VIDEO_GUARDS = [
  'Keep the camera motion linear and continuous — no whip pans, no speed ramps, no sudden jumps.',
  'Camera movement stays smooth and even throughout; avoid jitter, morphing or warping of the subject.',
  'Hold a single continuous take with steady motion; no cuts, no flicker, no abrupt reframing.',
  'Motion remains controlled and linear from start to finish, with no stutter or speed change.',
  'Preserve the subject\'s shape and features across every frame; no melting, morphing or drifting anatomy.',
  'One unbroken shot with smooth deliberate movement — no jump cuts and no erratic camera behaviour.',
  'Keep timing constant and motion physically plausible; no slow-motion ramps and no fast-forward.',
  'Steady even camera throughout; the subject stays consistent and stable frame to frame.'
];

// Áudio (só Veo) — sempre som ambiente, nunca música (6 frases).
var VIDEO_SOUND = [
  'Audio: natural ambient sound of the scene only, no music.',
  'Audio: realistic diegetic ambience matching the location, no soundtrack or score.',
  'Audio: the real environmental sound of the setting, quiet and natural, no music bed.',
  'Audio: subtle on-location ambience consistent with the action, no added music.',
  'Audio: grounded natural sound from the scene itself, no musical accompaniment.',
  'Audio: ambient noise true to the place and the action, with no music.'
];
/* === DATA:VIDEO END === */
