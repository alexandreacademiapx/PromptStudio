/* === ENGINE START === */
var MAX_LEN = 1500;
var CHARACTER_SHEET_MAX_LEN = 2800;

function pick(arr, seed, salt){
  var idx = (seed + salt * 7) % arr.length;
  if(idx < 0) idx += arr.length;
  return arr[idx];
}
function cap(s){
  s = s || '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function lowerFirst(s){
  s = s || '';
  return s.charAt(0).toLowerCase() + s.slice(1);
}
function stripPeriod(s){
  return (s || '').replace(/\.\s*$/, '');
}
// Adapta bancos de luz, fundo e pós para sujeitos não humanos.
var ITEM_WORD_MAP = [
  // Idiomas figurativos primeiro (antes do mapa anatômico de 'eye').
  [/\b(leads?|leading|draws?|drawing) the eye\b/gi, '$1 the line'],
  [/\bthe eye\b/gi, 'the line'],
  [/\bskin\b/gi, 'surface'], [/\bface\b/gi, 'surface'], [/\beyes\b/gi, 'highlights'],
  [/\beye\b/gi, 'highlight'], [/\bfigure\b/gi, 'item'], [/\bsubject\b/gi, 'item'],
  [/\bcheekbone\b/gi, 'panel edge'], [/\bcheek\b/gi, 'panel'], [/\bnose\b/gi, 'edge'],
  [/\bjaw\b/gi, 'edge'], [/\bshoulders\b/gi, 'frame'], [/\bchest\b/gi, 'body'],
  [/\bhair\b/gi, 'trim'], [/\bhead\b/gi, 'top'], [/\bhips\b/gi, 'base'],
  [/\bwaist\b/gi, 'midline'], [/\blash(es)?\b/gi, 'edge detail'], [/\bbrow\b/gi, 'edge'],
  [/\bforehead\b/gi, 'panel'], [/\bgesture\b/gi, 'motion'], [/\blips\b/gi, 'seams']
];
function itemizeText(text){
  var out = text || '';
  for(var i=0;i<ITEM_WORD_MAP.length;i++){ out = out.replace(ITEM_WORD_MAP[i][0], ITEM_WORD_MAP[i][1]); }
  return out;
}
// Neutraliza linguagem de objeto para PRODUTO e troca "item" por "product".
var PRODUCT_WORD_MAP = [
  [/\bmain mechanism\b/gi, 'main form'],
  [/\bkey mechanism\b/gi, 'key feature'],
  [/\bmechanism\b/gi, 'form'],
  [/\bworking section\b/gi, 'front'],
  [/\bworking parts\b/gi, 'main features'],
  [/\bstructural core\b/gi, 'form'],
  [/\bstructure\b/gi, 'form'],
  [/\bfasteners\b/gi, 'details'],
  [/\bpanel seams\b/gi, 'edges'],
  [/\bitems\b/gi, 'products'],
  [/\bitem\b/gi, 'product']
];
function productizeText(text){
  var out = itemizeText(text || '');
  for(var i=0;i<PRODUCT_WORD_MAP.length;i++){ out = out.replace(PRODUCT_WORD_MAP[i][0], PRODUCT_WORD_MAP[i][1]); }
  return out;
}
// Toque leve p/ bancos compartilhados (luz/grão/movimento) no modo produto: só troca
// "item" por "product", sem mexer em termos legítimos como "grain structure".
function itemToProduct(text){
  return (text || '').replace(/\bitems\b/gi, 'products').replace(/\bitem\b/gi, 'product');
}
function truncateWords(s, maxLen){
  s = (s || '').trim();
  if(s.length <= maxLen) return s;
  var cut = s.slice(0, maxLen);
  var lastSpace = cut.lastIndexOf(' ');
  if(lastSpace > 20) cut = cut.slice(0, lastSpace);
  return cut.replace(/[,;:]+$/, '');
}
function fillEnv(template, envText){
  var env = envText || 'the surrounding space';
  return template.split('{env}').join(env);
}
function firstSentences(s, n){
  var count = 0;
  for(var i = 0; i < s.length; i++){
    if(s.charAt(i) === '.' && (s.charAt(i+1) === ' ' || i === s.length - 1)){
      count++;
      if(count === n) return s.slice(0, i + 1).trim();
    }
  }
  return s;
}
function hashStr(s){
  var h = 0;
  for(var i = 0; i < s.length; i++){ h = (h * 31 + s.charCodeAt(i)) | 0; }
  return Math.abs(h);
}
function hardCap(text, maxLen){
  if(text.length <= maxLen) return text;
  var lines = text.split('\n');
  // Linhas protegidas que devem sobreviver ao corte duro: a trava de FIDELITY e a linha final.
  var tail = [lines[lines.length - 1]];
  var bodyLines = lines.slice(0, -1);
  for(var i = bodyLines.length - 1; i >= 0; i--){
    if(/^FIDELITY:/.test(bodyLines[i])){ tail.unshift(bodyLines[i]); bodyLines.splice(i, 1); break; }
  }
  var tailText = tail.join('\n');
  var budget = maxLen - tailText.length - 1;
  if(budget < 0) budget = 0;
  var kept = [];
  var used = 0;
  for(var j = 0; j < bodyLines.length; j++){
    var line = bodyLines[j];
    var cost = line.length + (kept.length ? 1 : 0);
    if(used + cost > budget){
      if(!kept.length && budget > 0){ kept.push(truncateWords(line, budget)); }
      break;
    }
    kept.push(line);
    used += cost;
  }
  return kept.length ? (kept.join('\n') + '\n' + tailText) : tailText;
}

function isSeedanceModel(model){
  return !!(model && model.family === 'Seedance');
}

var SEEDANCE_SHOT = {
  ews:[
    '超大全景，人物或主体在画面中占比很小，重点交代空间尺度与环境关系',
    '极远距离建立镜头，主体只是环境中的一个小点，先让场景气氛成立',
    '宽阔全景构图，主体被置于庞大场域之中，环境信息优先于人物细节',
    '远景建立空间，画面首先强调地点、纵深与孤独感，再让主体进入阅读',
    '超广角式大全景，主体占比极小，画面重点是环境规模与真实距离感',
    '环境主导的远景镜头，主体只作为场景中的视觉锚点存在'
  ],
  ws:[
    '全身广角镜头，主体完整进入画面，同时保留足够环境信息',
    '宽景全身构图，既看清动作姿态，也让场地关系保持可读',
    '完整人物与环境并重的远中景，动作与空间同时成立',
    '主体全身清晰可见，背景场景仍占据重要比重，适合真实叙事',
    '开放式广景构图，让主体与工作环境共同构成画面主信息',
    '从头到脚完整呈现主体，并让周围场地保持明确可辨'
  ],
  cowboy:[
    '美式中远景，从大腿中部以上取景，兼顾表情、手势与姿态',
    '半身偏广的姿态镜头，人物存在感强，同时保留一部分空间上下文',
    '从腿部上方切入的叙事构图，既能读到动作，也能保留环境线索',
    '强调站姿与气场的中远景，人物与环境保持平衡',
    '从大腿附近取景的人物镜头，适合展示手部动作与身体语言',
    '带有姿态张力的美式景别，主体轮廓清晰，环境不被完全压缩'
  ],
  ms:[
    '标准中景，从腰部以上取景，面部、手势和环境关系都清晰',
    '人物中景构图，叙事重心落在动作与表情之间的平衡',
    '从腰线上方切入，既能看清人物状态，也能保留部分背景信息',
    '中景镜头，方便读取表情、上肢动作与工作语境',
    '自然叙事型中景，主体清楚，空间上下文仍然可感',
    '腰部以上的稳定构图，适合动作说明与人物状态呈现'
  ],
  mcu:[
    '中近景，从胸口以上取景，重点转向表情与上半身细节',
    '胸像式构图，让情绪与视线成为画面主轴，同时保留少量环境',
    '中近距离观察主体，表情、呼吸感与细微动作更容易被读到',
    '从胸部以上切入的叙事镜头，情绪信息优先，空间信息次之',
    '靠近人物的中近景，突出脸部、肩颈和手部起始动作',
    '半近距离人物构图，让观众更贴近主体的情绪与状态'
  ],
  cu:[
    '近景特写，脸部或关键主体占据画面大部分区域',
    '人物或物件被拉近到画面前景，重点突出细节、情绪与质感',
    '紧凑的近景构图，背景退居次要，只保留少量氛围信息',
    '以主体细节为主的特写镜头，让观看重心集中在局部变化上',
    '近距离压缩背景的特写画面，主体成为唯一视觉中心',
    '脸部或核心区域主导画面，周边环境只作为模糊氛围存在'
  ],
  ecu:[
    '极近特写，只保留一个局部细节进入画面，强调质感与紧张感',
    '超近距离局部构图，主体被裁切到只剩关键细节',
    '极端近景，只呈现一个视觉碎片，让细节本身成为叙事',
    '局部放大式镜头，把单一细节推到画面中心',
    '超紧裁切的特写构图，空间信息几乎完全消失',
    '仅保留最重要的局部特征，放大纹理、材质与微小变化'
  ],
  detail:[
    '细节镜头，专注单一部位、部件或动作接触点',
    '局部特写构图，把一个关键细节单独拎出来呈现',
    '细部近拍，强调材质、结构或动作中的关键接触点',
    '只拍一个必要细节，让它承担整幅画面的信息重心',
    '紧扣局部的细节镜头，突出纹理、工艺或操作点',
    '单点信息型特写，让一个细节代替整体讲述场景'
  ]
};

var SEEDANCE_MOTION = {
  static:[
    '保持完全固定，整个镜头没有任何平移、推拉或摇移',
    '机位锁定不动，让画面内部动作自然发生',
    '镜头全程静止，构图从头到尾保持稳定',
    '使用固定机位，镜头不参与动作，只负责稳定观察',
    '画面像被牢牢锁在三脚架上，没有任何额外运动',
    '机位静止不变，把全部注意力交给主体与环境本身',
    '始终保持稳定定机，节奏克制，没有任何晃动',
    '采用严谨的固定构图，镜头完全不打扰场景推进'
  ],
  push_in:[
    '缓慢而稳定地向主体推进，距离一点点收紧',
    '镜头持续轻推向前，节奏均匀，不突然加速',
    '以顺滑的前移方式逐步逼近主体，让关注点自然集中',
    '缓慢推近主体，构图随时间逐渐收束',
    '镜头平稳向前靠近，画面压缩感逐步增强',
    '以克制的推进动作接近主体，始终保持顺滑连续',
    '稳定地向主体贴近，让情绪与细节逐步被放大',
    '前推动作轻柔而持续，整个镜头没有明显顿挫'
  ],
  pull_out:[
    '缓慢后拉镜头，让主体周围的空间逐步展开',
    '镜头平稳向后撤离，环境信息一点点变得完整',
    '以连续后移的方式拉开距离，让场景规模慢慢显现',
    '稳定后退，构图从紧到松自然过渡',
    '镜头向后缓缓抽离，让主体重新回到环境关系中',
    '平顺地拉远画面，释放出更多空间层次',
    '后撤动作均匀克制，让观众逐步看到更广的现场',
    '用连续的后拉镜头打开空间，不出现突兀变化'
  ],
  track:[
    '镜头沿侧向平稳移动，与主体保持并行关系',
    '做连续横移，让主体稳定留在画面中，背景产生真实视差',
    '侧向滑动镜头，速度均匀，空间层次自然展开',
    '镜头以平行移动方式跟住主体，背景从侧后方缓慢流过',
    '横向移动构图保持克制，让环境与主体一起发生关系',
    '平稳侧移，不抢戏，只用视差增强真实空间感',
    '镜头沿一条清晰水平路径移动，动作连贯、稳定',
    '通过侧向轨道式运动建立空间流动感，同时保持主体可读'
  ],
  follow:[
    '镜头与主体同步前进，始终维持稳定距离',
    '平顺地跟随主体移动，不忽快忽慢，也不突然偏离',
    '保持连续跟拍，让主体始终处在清晰可读的位置',
    '镜头稳定追随主体，背景自然后移，形成真实现场感',
    '以柔和的跟拍节奏陪着主体前行，动作完整不断裂',
    '跟随主体移动时保持克制，不做多余摆动和抢节奏的调整',
    '镜头像陪行者一样稳定贴住主体，整体推进自然流畅',
    '连续跟拍主体，让动作路径和空间关系都清楚成立'
  ],
  crane:[
    '镜头以平稳升降方式移动，垂直方向变化干净利落',
    '使用轻缓的升降镜头，让视角高度逐步变化',
    '镜头在垂直方向连续移动，节奏平顺，没有晃动',
    '通过上升或下降的机位变化，重新组织主体与空间关系',
    '镜头稳稳地抬升或落下，让画面层次慢慢打开',
    '升降动作克制、均匀，保持电影化的空间调度感',
    '镜头以柔和的垂直运动重构视线高度，不出现突然停顿',
    '采用平稳升降的机位轨迹，让空间层次更立体'
  ],
  orbit:[
    '镜头围绕主体做缓慢环绕，半径稳定，速度均匀',
    '以顺滑弧线绕主体移动，让背景在后方缓慢旋转',
    '环绕主体的运动连贯而克制，不出现突兀偏移',
    '镜头沿圆弧轨迹缓慢转动，保持主体始终是中心',
    '稳定绕拍主体，让空间关系在旋转中逐渐展开',
    '通过均匀环绕建立立体感，同时维持画面清晰与控制力',
    '镜头以持续弧线移动观察主体，背景形成温和旋转视差',
    '围绕主体缓慢滑行，运动完整流畅，没有断点'
  ],
  handheld:[
    '带有非常轻微的手持漂浮感，但整体依然稳定克制',
    '镜头保留细小而真实的手持呼吸感，不出现明显抖动',
    '轻手持质感存在，但始终平顺、受控、可读',
    '画面有一点自然的人体持机微动，增强现场真实感',
    '手持感非常细微，只提供生命感，不破坏稳定构图',
    '镜头以轻柔手持方式贴近主体，保持连贯和真实',
    '存在微弱的人体重心起伏，但没有突兀颠簸',
    '手持气质克制自然，让画面既真实又不会失控'
  ]
};

var SEEDANCE_PROGRESS = [
  '主体持续进行“{action}”，整个片段里动作不断裂，节奏自然连贯',
  '从镜头开始到结束，主体始终在“{action}”，动作推进清晰可读',
  '主体一直保持“{action}”这一状态，过程真实、稳定、不跳变',
  '动作“{action}”贯穿整个镜头，时间流逝感自然，没有突兀停顿',
  '主体围绕“{action}”连续行动，每一个动作节点都保持合理衔接',
  '画面中的主要行为就是“{action}”，并且全程稳定发展',
  '主体反复而连贯地完成“{action}”，没有中断、没有突变',
  '以“{action}”作为核心动作，让整段视频在同一行为逻辑内推进',
  '“{action}”这一动作从第一帧延续到最后一帧，过程完整可信',
  '主体一直处在“{action}”的进行中，动作幅度与节奏保持一致'
];

var SEEDANCE_ITEM_PROGRESS = [
  '物件在整个镜头中持续处于“{action}”这一状态，位置与状态不突然变化',
  '整段视频里，物件始终表现为“{action}”，情境保持稳定一致',
  '镜头全程围绕“{action}”这一物件状态展开，不出现无关变化',
  '物件持续以“{action}”的方式被呈现，状态前后一致、清晰可靠',
  '“{action}”是物件在本镜头中的核心状态，整个片段都围绕它成立',
  '物件一直保持“{action}”，没有突兀位移、跳变或形态漂移',
  '镜头内物件持续处在“{action}”之中，状态稳定，逻辑明确',
  '整段片段都以“{action}”作为物件状态主轴，场景条件前后一致'
];

var SEEDANCE_PACING = [
  '整体节奏是真实时间感，动作速度自然，不做夸张加速或减速',
  '画面以接近 24fps 的自然电影节奏推进，动作流畅可信',
  '节奏平稳克制，像真实现场被连续记录下来一样',
  '时间推进保持均匀，动作没有突然抽帧感或拖影感',
  '整体运动遵循自然物理节奏，不做慢动作炫技，也不快放',
  '片段节奏连贯顺滑，每一个动作都在真实时间里发生',
  '画面推进速度均匀，运动具有生活化、可信的时间感',
  '整体是稳定的电影式运动节奏，没有突变、没有抢拍',
  '镜头节拍柔和连续，动作展开不仓促，也不拖沓',
  '时间感真实可感，所有运动都服从自然速度逻辑'
];

var SEEDANCE_GUARDS = [
  '镜头运动必须保持单一、线性、连续，禁止突然加速、急停、甩镜或跳切',
  '主体外形、五官、服装和比例在每一帧都要稳定，禁止融化、变形、漂移',
  '整段视频保持一个连续镜头，不闪烁、不重构、不突然改变构图',
  '所有运动都要符合真实物理逻辑，不能出现无原因抖动或空间错乱',
  '主体必须保持身份一致与外观一致，不能在中途换脸、换衣、变材质',
  '镜头轨迹要平滑受控，不允许突兀摆动、抽动或不稳定抖动',
  '环境结构要稳定，背景不要扭曲、塌陷、穿模或发生无意义变化',
  '动作推进要连续可信，禁止帧间跳跃、节奏断裂和时间错位',
  '如果有手部、面部或细小结构，必须保持解剖与结构稳定，不能多出或缺失',
  '主体与道具的接触关系要始终正确，禁止穿透、漂浮或忽然错位'
];

var SEEDANCE_STYLE = [
  '整体风格偏电影级真实影像，构图克制，质感扎实，不要 AI 味过重',
  '画面追求真实摄影质感与成熟美术控制，不做夸张特效化处理',
  '保持高级电影感、真实灯光逻辑与自然材质表现',
  '风格上强调纪实与电影化之间的平衡，避免廉价 CG 质感',
  '整体美术方向成熟、克制、可信，优先真实而不是炫技',
  '画面应具有专业摄影与电影场景调度感，细节真实、层次明确',
  '视觉方向以真实工业质感和高级镜头语言为主，不要卡通化',
  '保持电影级构图、真实材质、可信光线和自然运动，避免虚假感'
];

var SEEDANCE_LIGHT = {
  golden_hour:[
    '低角度暖色夕阳从侧后方扫入画面，阴影拉长，亮部有柔和溢光，整体空气感温暖而通透',
    '傍晚金色光线斜切主体，天空反射提供柔和补光，明暗层次自然，画面带轻微暖调',
    '日落前后的金色自然光主导画面，边缘高光柔和，阴影不过死，氛围带疲惫而温暖的电影感'
  ],
  low_key:[
    '低调布光，主光集中而硬朗，大面积阴影压住画面，只保留关键受光面可读',
    '整体曝光偏低，暗部占比高，光线只雕出主体的重要轮廓与表面信息',
    '深色低调光比结构明显，亮面与暗面分离清楚，情绪更紧张、压迫、戏剧化'
  ],
  spotlight:[
    '单束聚光切出主体，光束边缘清晰，主体之外迅速落入黑暗',
    '顶部或侧上方聚光集中照亮主体，周围环境压暗，形成明确的视觉舞台感',
    '硬质聚光将注意力锁定在主体上，背景尽量简化，光束本身成为构图元素'
  ],
  chiaroscuro:[
    '明暗对照强烈但层次细腻，像绘画式侧光一样塑造体积与轮廓',
    '偏古典的侧向窗光或定向柔光雕刻主体，阴影深但不死黑，气质更沉稳',
    '采用绘画感强的明暗布光，亮面有体积，暗面保留少量可读细节'
  ],
  cutter_lights:[
    '硬光被旗板切成几道清晰的光带，明暗边界锐利，画面更图形化',
    '几何切光横穿主体与背景，形成明显的条带式明暗结构',
    '利用切割后的硬光制造建筑感和秩序感，阴影像图形块面一样明确'
  ],
  hard_flash:[
    '正面硬闪直接击中主体，高光更直接，背景迅速变暗，整体有粗粝编辑感',
    '裸闪式强硬正面光让表面反差更明显，影子清脆，画面带即时抓拍质感',
    '直打硬闪制造直接、坦率、略粗粝的视觉效果，阴影边缘清晰，层次明确'
  ],
  overcast:[
    '阴天漫射光均匀铺开，反差较低，色温偏冷，整体自然克制',
    '云层过滤后的柔和自然光覆盖整个场景，阴影很轻，细节稳定可读',
    '无明显硬阴影的阴天光线主导画面，质感平实、冷静、真实'
  ],
  window_soft:[
    '柔和窗光从一侧进入，亮暗过渡平滑，面部与材质细节自然显现',
    '大面积柔光窗光作为主光源，阴影轻柔，空间带日常真实感',
    '侧向窗光温和塑形，主体边缘与环境过渡自然，不生硬'
  ],
  hard_noon:[
    '正午硬日光从上方压下，阴影短而硬，亮部更直接，整体更锐利',
    '高角度正午阳光带来明显硬阴影与高反差，空气感偏干燥、直接',
    '午间日光强烈而明确，地面反光与主体受光都更硬朗，层次利落'
  ],
  direct_flash:[
    '直接闪光正面打亮主体，画面对比明确，背景退暗，质感偏编辑风',
    '相机直闪带来清晰反差和即刻感，让主体从环境中直接跳出来',
    '硬质直闪形成非常清楚的正面高光与背景阴影分离，视觉干脆'
  ],
  silhouette:[
    '主体主要以剪影方式出现，逆光定义轮廓，内部细节尽量压暗',
    '强逆光让主体轮廓清晰分离，主体内部只保留少量必要信息',
    '以剪影和轮廓边缘光为主，画面更强调形体而不是表面细节'
  ],
  high_key:[
    '整体高调明亮，阴影很轻，画面干净、通透、信息清晰',
    '明亮均匀的高调光包裹主体，层次柔和，整体更轻盈整洁',
    '高调曝光控制让整个画面更洁净、更开阔，几乎没有沉重暗部'
  ],
  practical_neon:[
    '现场霓虹和实用灯主导色彩，局部高饱和，暗部保留夜景层次',
    '霓虹实景光在主体表面形成彩色反射，空间更都市、更夜间化',
    '利用现场招牌灯和霓虹光源塑造夜景，色彩带轻微赛博感但保持真实'
  ],
  backlight_rim:[
    '逆光边缘光把主体从背景中剥离出来，正面仅保留轻微补光',
    '后方光源勾出轮廓边线，让主体与背景形成明确分离',
    '背光勾边为主体建立发光轮廓，前侧保持克制，突出立体感'
  ],
  firelight:[
    '火光从低位跳动照亮主体，暖色不均匀闪烁，周围环境快速陷入暗部',
    '低位火焰光制造温暖但不稳定的明暗变化，情绪更原始、更贴身',
    '火源带来的跳动暖光塑造表面细节，暗部深，氛围更有生存感'
  ],
  blue_hour:[
    '蓝调时刻的冷色自然光覆盖场景，整体安静、湿润、略带过渡感',
    '日落后短暂的蓝色环境光主导画面，冷暖关系更细腻、情绪更克制',
    '黄昏蓝调时段的低照度自然光让画面更柔、更静，也更有时间感'
  ],
  colored_gels:[
    '彩色片光源在主体表面形成明确色块，风格化但仍保持材质可信',
    '两种或多种染色光交错塑形，画面更图形化，同时维持真实体积',
    '彩色灯片带来明显色相对撞，让主体更突出，但不能失去真实质感'
  ]
};

var SEEDANCE_STOCK = {
  v3_500t_5219:[
    '整体色彩参考 Kodak Vision3 500T 5219 的夜景质感，颗粒明显，暗部厚实，钨丝灯暖色更浓',
    '采用 500T 夜景胶片观感，保留较强颗粒、深色层次和柔和高光压缩',
    '画面后期偏向 Vision3 500T 的夜间电影质地，暗部沉稳，暖色灯光更有包裹感'
  ],
  v3_250d_5207:[
    '整体色彩参考 Kodak Vision3 250D 5207，自然日光、颗粒适中、层次干净',
    '后期朝 250D 日景胶片风格靠拢，色彩中性偏暖，亮部回卷柔和',
    '画面呈现 Vision3 250D 的自然白天电影感，层次平衡，颗粒细腻可感'
  ],
  eterna_500t_8573:[
    '整体色彩参考 Fuji Eterna 500T，夜景和混合光下更柔和，带一点低饱和都市感',
    '后期偏向 Eterna 500T 的混光夜景气质，颗粒可见，色彩轻微粉青分离',
    '画面呈现 Fuji Eterna 500T 式的柔和夜景层次，色彩不过分艳丽，质感偏城市电影'
  ],
  double_x_5222:[
    '后期做成 Kodak Double-X 5222 风格的高反差黑白影像，颗粒粗粝、明暗分明',
    '整体是强图形感黑白胶片效果，黑位厚重，白位干净，颗粒存在感明确',
    '画面接近 Double-X 的黑白电影质地，反差高、纹理重、情绪直接'
  ],
  kodak_2383:[
    '整体色彩参考 Kodak 2383 电影拷贝质感，肤色与中间调更丰厚，黑位深而不死',
    '后期偏向 2383 print 风格，色彩控制成熟、层次扎实、影院感更强',
    '画面呈现 Kodak 2383 的电影发行拷贝风格，整体更浓郁、更完整、更像成片'
  ],
  k7222_bw:[
    '采用粗粝的 16mm 黑白纪实胶片质感，颗粒更重，画面更原生',
    '后期偏向 16mm 黑白记录片气质，纹理明显，质感不修饰',
    '整体是带明显颗粒和不完美感的黑白纪实风格，真实、直接、未经抛光'
  ],
  portra_400:[
    '色彩参考 Kodak Portra 400，肤色柔和偏暖，整体更轻、更自然、更生活化',
    '后期偏向 Portra 400 的柔和暖调与低反差层次，氛围更亲近',
    '画面保留 Portra 式的温暖肤色和略带粉感的柔和色彩，颗粒细腻可见'
  ],
  cinestill_800t:[
    '后期参考 Cinestill 800T 的夜景霓虹质感，亮点有轻微溢光，夜色更有氛围',
    '采用 800T 式的夜间胶片观感，灯光边缘可见轻微光晕，颗粒明显',
    '整体朝 Cinestill 800T 靠拢，夜景亮点带一点光晕，色彩更具都市夜生活气息'
  ],
  velvia_50:[
    '色彩参考 Velvia 50，饱和度更高，层次锐利，适合强调景观和色块',
    '后期更接近 Velvia 的高饱和、高锐度、清晰反差风格',
    '画面具有 Velvia 式的鲜明色彩与清透层次，但仍保持真实摄影感'
  ],
  bleach_bypass:[
    '采用漂白跳洗式后期，反差更高，饱和度压低，金属和阴影更硬朗',
    '整体做成 bleach bypass 风格，色彩收敛，银盐感更强，气质更冷硬',
    '后期强调漂白跳洗带来的高反差与低饱和，让画面更粗粝、更工业'
  ],
  ektachrome_e100:[
    '画面参考 Ektachrome E100 的反转片质感，色彩清透，锐度更直接',
    '后期带有 E100 式的清亮色彩和更明显的透明感，层次更挺拔',
    '整体接近 Ektachrome 反转片观感，颜色更通透，质感更利落'
  ],
  technicolor_3strip:[
    '整体向三色分离式 Technicolor 靠拢，色彩更经典、更戏剧化，但不能失真',
    '后期参考 Technicolor 3-strip 的复古电影色彩分离感，层次更有戏剧性',
    '画面呈现经典三色分离胶片风格，颜色干净、明确、带复古戏剧气息'
  ]
};

var SEEDANCE_PT_MAP = [
  [/\bmodelo brasileira de 30 anos\b/gi, '30岁的巴西模特'],
  [/\bmodelo brasileira de 26 anos\b/gi, '26岁的巴西模特'],
  [/\bprotagonista brasileira de 32 anos em campanha de beleza\b/gi, '32岁的巴西女性美妆广告主角'],
  [/\bde\s+(\d{1,3})\s+anos\b/gi, '$1岁'],
  [/\bmodelo brasileira\b/gi, '巴西模特'],
  [/\bmodelo brasileiro\b/gi, '巴西男模特'],
  [/\bmodelo adulto\b/gi, '成年模特'],
  [/\bmodelo\b/gi, '模特'],
  [/\bprotagonista de campanha\b/gi, '品牌广告主角'],
  [/\bretrato editorial\b/gi, '时尚编辑肖像'],
  [/\bcampanha de moda\b/gi, '时尚广告大片'],
  [/\bcampanha de marca\b/gi, '品牌广告大片'],
  [/\blookbook\b/gi, '时装型录'],
  [/\balfaiataria marfim ampla\b/gi, '宽松象牙白剪裁服装'],
  [/\balfaiataria ampla\b/gi, '宽松剪裁服装'],
  [/\bconjunto de seda azul-cobalto com silhueta fluida\b/gi, '钴蓝色丝绸套装，廓形流畅'],
  [/\bseda fluida\b/gi, '飘逸丝绸'],
  [/\bcouro fosco\b/gi, '哑光皮革'],
  [/\bmalha transl[uú]cida\b/gi, '半透明针织材质'],
  [/\btecido acompanhando o movimento\b/gi, '布料随动作自然摆动'],
  [/\bcabelo preto curto e geom[eé]trico\b/gi, '黑色短发，轮廓利落几何'],
  [/\bcabelo raspado\b/gi, '剃短发型'],
  [/\bcabelo cacheado preso\b/gi, '束起的自然卷发'],
  [/\bpele oliva\b/gi, '橄榄色皮肤'],
  [/\bpele retinta\b/gi, '深色皮肤'],
  [/\bpele negra\b/gi, '深棕色皮肤'],
  [/\btra[cç]os marcantes\b/gi, '面部轮廓鲜明'],
  [/\bexpress[aã]o serena\b/gi, '神情平静'],
  [/\bpresen[cç]a escult[oó]rica\b/gi, '雕塑般的存在感'],
  [/\bpresen[cç]a editorial natural\b/gi, '自然的时尚编辑气质'],
  [/\bpresen[cç]a magn[eé]tica\b/gi, '极具吸引力的存在感'],
  [/\bstyling minimalista\b/gi, '极简造型'],
  [/\bpostura alongada e movimento natural\b/gi, '修长姿态与自然动作'],
  [/\bvestido escultural vermelho\b/gi, '红色雕塑感连衣裙'],
  [/\batitude confiante\b/gi, '姿态自信'],
  [/\bolhar direto para a c[aâ]mera\b/gi, '直视镜头'],
  [/\bvestindo\b/gi, '身穿'],
  [/\bcaminhando lentamente em dire[cç][aã]o [aà] c[aâ]mera\b/gi, '缓慢走向镜头'],
  [/\bolhar fora do quadro\b/gi, '视线望向画外'],
  [/\bgaleria contempor[aâ]nea\b/gi, '当代艺术画廊'],
  [/\bconcreto claro\b/gi, '浅色清水混凝土'],
  [/\bp[eé]-direito alto\b/gi, '挑高空间'],
  [/\bpiso levemente refletivo\b/gi, '略带反射的地面'],
  [/\bpiso refletivo\b/gi, '反射地面'],
  [/\brecortes de luz natural\b/gi, '自然光形成清晰光区'],
  [/\bluz natural recortada\b/gi, '形成清晰光区的自然光'],
  [/\best[uú]dio seamless\b/gi, '无缝摄影棚'],
  [/\brooftop\b/gi, '城市屋顶'],
  [/\bhotel modernista\b/gi, '现代主义酒店'],
  [/\bpraia mineral\b/gi, '矿物质感海滩'],
  [/\brua noturna\b/gi, '夜间街道'],
  [/\barquitetura brutalista\b/gi, '粗野主义建筑'],
  [/\bluxo silencioso\b/gi, '静奢氛围'],
  [/\btens[aã]o elegante\b/gi, '克制而优雅的张力'],
  [/\benergia pop\b/gi, '鲜明流行能量'],
  [/\bluz lateral difusa\b/gi, '柔和侧光'],
  [/\bcontraluz [aâ]mbar\b/gi, '琥珀色逆光'],
  [/\bneon magenta\b/gi, '洋红霓虹光'],
  [/\bproduto\b/gi, '产品'],
  [/\bfrasco de perfume\b/gi, '香水瓶'],
  [/\bfrasco\b/gi, '瓶身'],
  [/\bgarrafa\b/gi, '瓶子'],
  [/\bembalagem\b/gi, '包装'],
  [/\br[oó]tulo\b/gi, '标签'],
  [/\blogo\b/gi, '品牌标志'],
  [/\bmarca\b/gi, '品牌'],
  [/\bpl[aá]stico\b/gi, '塑料'],
  [/\bvidro fosco\b/gi, '磨砂玻璃'],
  [/\bvidro fum[eê]\b/gi, '烟熏玻璃'],
  [/\bvidro\b/gi, '玻璃'],
  [/\btampa met[aá]lica escovada\b/gi, '拉丝金属瓶盖'],
  [/\br[oó]tulo minimalista em preto e marfim\b/gi, '黑色与象牙白的极简标签'],
  [/\bacabamento premium\b/gi, '高端精致表面'],
  [/\balum[ií]nio\b/gi, '铝'],
  [/\bpapel[aã]o\b/gi, '纸板'],
  [/\bmet[aá]lico\b/gi, '金属质感'],
  [/\btransparente\b/gi, '透明'],
  [/\bnovo e [ií]ntegro\b/gi, '全新且完好'],
  [/\bproduto novo e [ií]ntegro\b/gi, '产品全新且完好'],
  [/\bcom\b/gi, '搭配'],
  [/\bem\b/gi, '在'],
  [/\bde\b/gi, '的'],
  [/\be\b/gi, '和'],
  [/\bao fundo\b/gi, '在背景中'],
  [/\bno fundo\b/gi, '在背景中'],
  [/\bfim de tarde\b/gi, '傍晚'],
  [/\bamanhecer\b/gi, '清晨'],
  [/\bnoite\b/gi, '夜晚'],
  [/a clean seamless studio backdrop/gi, '干净的无缝棚拍背景'],
  [/a smooth studio gradient background/gi, '柔和的棚拍渐变背景'],
  [/a plain neutral surface/gi, '简洁中性的摆拍表面'],
  [/the product isolated and uncluttered/gi, '产品主体被干净利落地单独呈现'],
  [/evenly lit and free of distractions/gi, '光线均匀，没有干扰元素']
];

function seedanceLocalizeFreeText(text){
  var out = (text || '').trim();
  if(!out) return '';
  for(var i=0;i<SEEDANCE_PT_MAP.length;i++){ out = out.replace(SEEDANCE_PT_MAP[i][0], SEEDANCE_PT_MAP[i][1]); }
  out = out.replace(/\s+/g, ' ').replace(/\s*,\s*/g, '，').replace(/\s*;\s*/g, '；');
  out = out.replace(/\s*-\s*/g, ' - ').replace(/,,+/g, '，').replace(/，，+/g, '，');
  return out.trim().replace(/[.;:,，；]+$/, '');
}

function seedancePickMap(map, key, seed, salt, fallback){
  var arr = map[key];
  if(arr && arr.length) return pick(arr, seed, salt);
  return fallback || '';
}

function seedanceLightFallback(light){
  return '光线风格参考“' + ((light && light.label) ? light.label : '当前布光') + '”，保持真实、电影化且层次清晰。';
}

function seedanceStockFallback(stock){
  return '整体色彩与颗粒质感参考“' + ((stock && stock.label) ? stock.label : '当前胶片风格') + '”，保持电影感与真实纹理。';
}

function baseSeedFor(state){
  return hashStr([
    state.shotId,
    state.lensId,
    state.lightId,
    state.stockId,
    state.treatmentId || 'cinematic',
    state.intensityId || 'expressive',
    state.concept || '',
    state.palette || '',
    state.materials || ''
  ].join('|'));
}

function creativeTreatmentFor(state){
  return CREATIVE_TREATMENTS[state.treatmentId] || CREATIVE_TREATMENTS.cinematic;
}

function creativeIntensityFor(state){
  return CREATIVE_INTENSITIES[state.intensityId] || CREATIVE_INTENSITIES.expressive;
}

function characterSheetTerm(group, key){
  var set = CHARACTER_SHEET_TERMS[group] || {};
  return set[key] ? set[key].prompt : '';
}

function buildCharacterSheetPrompt(state, variation){
  var cs = state.character || {};
  var presentation = characterSheetTerm('presentation', cs.presentation);
  var age = characterSheetTerm('age', cs.age);
  var ethnicity = characterSheetTerm('ethnicity', cs.ethnicity);
  var skinTone = characterSheetTerm('skinTone', cs.skinTone);
  var hairColor = characterSheetTerm('hairColor', cs.hairColor);
  var hairStyle = characterSheetTerm('hairStyle', cs.hairStyle);
  var eyeColor = characterSheetTerm('eyeColor', cs.eyeColor);
  var bodyType = characterSheetTerm('bodyType', cs.bodyType);
  var facialHair = characterSheetTerm('facialHair', cs.facialHair);
  var wardrobe = characterSheetTerm('wardrobe', cs.wardrobe);
  var details = (cs.skinDetails || []).map(function(key){
    return CHARACTER_SHEET_TERMS.skinDetail[key] || '';
  }).filter(Boolean);

  var hairDescription = hairStyle.indexOf('bald scalp') >= 0
    ? hairStyle
    : hairColor + ', ' + hairStyle;
  var skinDescription = details.length
    ? skinTone + ', ' + details.join(', ')
    : skinTone + ', naturally uneven tone and subtle individual facial asymmetry';
  var seed = hashStr(JSON.stringify(cs)) + (variation || 0);
  var capture = pick([
    'professional technical casting photography straight from camera, neutral RAW-like capture, natural perspective, exceptionally high optical sharpness, uniform deep focus and real microcontrast',
    'professional identity-reference photography with a clean straight-from-camera RAW look, natural perspective, edge-to-edge optical clarity, uniform deep focus and authentic microcontrast',
    'high-end technical casting photography captured as a neutral unretouched RAW frame, natural perspective, consistent deep focus, crisp optical detail and realistic microcontrast'
  ], seed, 1);

  var text = [
    'Create a professional photographic character reference sheet for Nano Banana Pro showing one single consistent person.',
    'IDENTITY: One ' + age + ' ' + presentation + ' with ' + ethnicity + ', ' + bodyType + ' and ' + skinDescription + '. ' + cap(hairDescription) + '; ' + eyeColor + '; ' + facialHair + '. Neutral expression and relaxed natural posture.',
    'WARDROBE: ' + cap(wardrobe) + '. Fabrics are plain, matte, neutral and realistically textured. Keep the exact same clothing, fit and colors in every panel.',
    'CONSISTENCY: Preserve exactly the same facial geometry, skull shape, ears, nose, mouth, eye spacing, body proportions, skin marks, hairline, hairstyle, eye color and wardrobe across all six views. This is one person only, not six similar people.',
    'LAYOUT: One horizontal 16:9 canvas with six clean panels separated only by narrow white gutters. Left side: two large vertical full-body panels: 1) exact front view, arms relaxed at the sides, hands and feet fully visible; 2) exact left profile, same neutral posture, complete body visible. Right side: four smaller panels in a 2x2 grid: 3) frontal head-and-shoulders; 4) back of head, neck and shoulders, face completely hidden; 5) left three-quarter head-and-shoulders; 6) exact left profile head-and-shoulders. Every angle is unique. No repeated frontal portrait, no mirrored duplicate and no cropped head, hands or feet.',
    'PHOTOGRAPHY: ' + cap(capture) + '. Neutral diffuse studio light, slightly lateral at about 5200K, reveals volume and surface texture without drama. Matte seamless white background, true white balance, soft contact shadows and realistic color. No color grade.',
    'SURFACE REALISM: Preserve visible pores, peach fuzz, individual facial and scalp hairs, natural under-eye texture, subtle tonal variation, facial asymmetry, fabric weave and real folds. No beauty retouching, skin smoothing, waxy or plastic skin, CGI, mannequin look, stylization, grain, halation or shallow depth of field.',
    'CONTENT RESTRICTIONS: No text, logos, brand marks, labels, prints, numbers, symbols, watermarks, captions, props, accessories or decorative graphics anywhere in the image.'
  ].join('\n\n');

  return {
    text: text,
    length: text.length,
    maxLength: CHARACTER_SHEET_MAX_LEN,
    cameraLabel: 'Technical casting photography',
    lensName: 'Natural perspective',
    stockLabel: 'Neutral RAW capture'
  };
}

var BACKGROUND_PRODUCT_TYPES = {
  generic:'a product or object, preserving its original real-world scale cues',
  beauty:'a perfume or cosmetic product, with exact glass, cap, liquid, label and transparency details',
  watch:'a watch or jewelry object, with exact metal, stones, dial, engraving and micro-detail',
  eyewear:'eyewear or an accessory, with exact frame geometry, lens tint, transparency and hardware',
  package:'packaging, bottle or container, with exact silhouette, closure, print, label and volume proportions',
  furniture:'a finished textured 3D object or character asset, preserving the exact modeled geometry, silhouette, dimensions, UV-aligned texture maps, materials, surface details, seams, construction details, proportions and original camera-facing view',
  tech:'an electronic or technology product, with exact industrial design, ports, controls, screen, finish and branding'
};
var BACKGROUND_ENVIRONMENTS = {
  studio:'a physically built photographic studio set with controlled planes, practical depth and no generic digital gradient',
  architectural:'an architectural environment with believable scale, structural rhythm, perspective and material junctions',
  natural:'a controlled natural environment with physically plausible terrain, vegetation, atmosphere and daylight behavior',
  retail:'a premium display or retail environment with deliberate merchandising space, clean circulation and refined material detailing',
  surreal:'a surreal but physically coherent environment, driven by one clear spatial idea and continuous gravity, shadows and perspective',
  abstract:'an abstract material set built from real surfaces, volumes and transitions rather than floating decorative graphics'
};
var BACKGROUND_SURFACES = {
  matte:'a neutral matte base with restrained texture and a clean contact zone',
  acrylic:'a translucent acrylic base with controlled transmission, edge glow and subtle internal reflection',
  stone:'a stone or mineral base with credible weight, pores, veins and scale',
  metal:'a brushed metal base with directional grain and controlled specular reflections',
  glass:'a clean glass base with physically correct transmission, edge reflections and restrained glare',
  fabric:'a fabric or paper base with real weave, folds, thickness and natural falloff',
  liquid:'a shallow reflective liquid base with coherent ripples and a physically matched reflection',
  floating:'no visible support; reserve clean negative space around the product and use a plausible soft grounding shadow below it'
};
var BACKGROUND_COMPOSITIONS = {
  center:'centered hero placement with balanced breathing room and a single dominant focal point',
  left_space:'place the product on the left third and preserve intentional negative space on the right',
  right_space:'place the product on the right third and preserve intentional negative space on the left',
  low_hero:'place the product low in frame while the environment establishes scale above and behind it',
  close:'use a tight product-led crop while keeping every visible edge from the reference intact and uncropped unless already cropped'
};
var BACKGROUND_DEPTHS = {
  seamless:'a seamless set with no visible horizon line and a smooth but physical tonal falloff',
  layered:'a layered set with clear foreground, placement plane, midground and background separation',
  bokeh:'a softly resolved background with optical depth and restrained bokeh, while the product remains fully sharp',
  deep:'a deep, legible environment with coherent perspective from foreground to far background'
};
var BACKGROUND_LIGHTING = {
  match:'derive the environment lighting from the direction, softness, color and contrast already visible on the reference product',
  soft:'use broad commercial studio light with gentle falloff and clean controlled reflections in the environment',
  hard:'use one hard graphic source with deliberate shadow geometry and crisp separation in the set',
  lowkey:'use controlled low-key illumination with deep but detailed shadows and restrained practical highlights',
  daylight:'use natural daylight with a believable sky contribution, directional key and neutral color response',
  color:'use restrained colored accents in the environment while keeping neutral, accurate color on the product itself'
};
var BACKGROUND_INTEGRATIONS = {
  shadow:'Create a contact shadow that follows the product footprint, elevation and the established light direction.',
  reflection:'Create only a physically plausible reflection from the unchanged source product, matching surface roughness and viewing angle.',
  atmosphere:'Allow subtle atmosphere or haze to exist behind and around the product, never covering its label, logo or critical edges.',
  depth_wrap:'Use believable occlusion and depth ordering around the placement zone without painting over or deforming the product.'
};

function buildBackgroundScenePrompt(state, variation){
  var bg = state.backgroundScene || {};
  var task = bg.task || 'composite';
  var productType = BACKGROUND_PRODUCT_TYPES[bg.productType] || BACKGROUND_PRODUCT_TYPES.generic;
  var environment = BACKGROUND_ENVIRONMENTS[bg.environmentStyle] || BACKGROUND_ENVIRONMENTS.studio;
  var surface = BACKGROUND_SURFACES[bg.surface] || BACKGROUND_SURFACES.matte;
  var composition = BACKGROUND_COMPOSITIONS[bg.composition] || BACKGROUND_COMPOSITIONS.center;
  var depth = BACKGROUND_DEPTHS[bg.depth] || BACKGROUND_DEPTHS.layered;
  var lighting = BACKGROUND_LIGHTING[bg.lighting] || BACKGROUND_LIGHTING.match;
  var idea = truncateWords(bg.idea || 'a refined, physically built product environment', 420);
  if(task === 'scene_only' && (!bg.lighting || bg.lighting === 'match')){
    lighting = 'use controlled neutral studio illumination with one readable direction, soft tonal separation and no implied hero object';
  }
  var paletteFallback = task === 'scene_only'
    ? 'a restrained neutral palette derived only from the requested environment'
    : 'a restrained palette derived from the product and the requested environment';
  var palette = truncateWords(bg.palette || paletteFallback, 180);
  var integrations = (bg.integrations || []).map(function(key){ return BACKGROUND_INTEGRATIONS[key]; }).filter(Boolean);
  var variationLines = [
    'Keep the scene disciplined: every environmental element must support scale, placement and product readability.',
    'Favor physically built set logic, precise material transitions and controlled negative space over decorative clutter.',
    'Make the environment feel photographed in one exposure, with continuous perspective, shadow direction and color response.',
    'Use one clear spatial hierarchy and remove any element that competes with the placement zone.'
  ];
  var variationLine = variationLines[Math.abs(variation || 0) % variationLines.length];
  var rows = [];

  if(task === 'scene_only'){
    rows.push('TASK: Create an EMPTY high-end product environment. Do not add, invent or imply any product, logo, packaging, text or hero object.');
    rows.push('PLACEMENT ZONE: Reserve a clean, believable area sized for ' + productType + '. ' + cap(composition) + '. The zone must be ready for later compositing, with unobstructed edges and sufficient negative space.');
  } else {
    rows.push('IMAGE EDITING TASK: Use the attached image as the exact source product. Remove only the white or transparent background and composite the source product into a newly created environment.');
    rows.push('IMMUTABLE PRODUCT LOCK: Treat the product as a locked source layer, not as a generation target. Preserve the exact same silhouette, geometry, dimensions, proportions, camera angle, perspective, crop, logo, label text, typography, colors, material, texture, transparency, reflections, micro-details and visible imperfections. Do not redraw, relight, retouch, simplify, enhance, clean up, restyle or reinterpret any pixel belonging to the product.');
    rows.push('MASKING AND EDGES: Extract only the background. Preserve original antialiasing, fine edges, transparent or translucent areas, holes, glass, hairline parts and natural edge softness. No white halo, dark fringe, cutout edge, invented edge or missing detail.');
    rows.push('PRODUCT TYPE: ' + cap(productType) + '.');
    rows.push('COMPOSITION: ' + cap(composition) + '. Reposition or uniformly scale the locked layer only when needed; never warp, rotate into a new view or change its internal perspective.');
  }

  rows.push('ENVIRONMENT: ' + cap(environment) + '. Creative brief: ' + cap(idea) + '.');
  rows.push('SURFACE AND PLACEMENT: ' + cap(surface) + '.');
  if(task === 'scene_only'){
    rows.push('LIGHTING: ' + cap(lighting) + '. Establish one clear light direction across the empty set and leave the placement zone evenly readable for later compositing.');
    rows.push('COMPOSITING READINESS: Do not render a contact shadow, product reflection, silhouette, cutout or placeholder. Leave the surface physically coherent and unobstructed so those interactions can be created only after a real product is added.');
    rows.push('DEPTH AND PERSPECTIVE: ' + cap(depth) + '. Use a coherent horizon, camera height, vanishing points and believable real-world scale across the empty environment.');
  } else {
    rows.push('LIGHTING INTEGRATION: ' + cap(lighting) + '. Build the environment, cast shadow and reflections around the existing product lighting; do not repaint highlights, shadows or color on the locked product layer.');
    if(integrations.length) rows.push('PHYSICAL INTEGRATION: ' + integrations.join(' '));
    rows.push('DEPTH AND PERSPECTIVE: ' + cap(depth) + '. Match horizon, camera height, vanishing points and scale to the reference image so the composite reads as one photograph.');
  }
  rows.push('PALETTE AND MATERIAL LANGUAGE: ' + cap(palette) + '. Keep material scale physically credible and avoid generic CGI smoothness.');
  rows.push('PHOTOGRAPHIC FINISH: Natural optical sharpness, realistic surface response, controlled highlight roll-off, coherent noise and fine real-world imperfections. The final image must feel captured in one professional studio or location exposure, not assembled from separate layers. ' + variationLine);
  rows.push(task === 'scene_only'
    ? 'EXCLUSIONS: No product, no placeholder object, no text, no logo, no watermark, no floating decorative icon and no fake packaging.'
    : 'EXCLUSIONS: No product redesign, no altered branding, no changed label, no invented text, no extra product, no duplicated object, no deformation, no melting, no new camera angle, no white outline, no watermark and no unrelated prop crossing the product.');

  var text = rows.join('\n\n');
  return {
    text:text,
    length:text.length,
    maxLength:3200,
    cameraLabel:'Reference-matched composite',
    lensName:'Locked source perspective',
    stockLabel:'Photographic environment integration'
  };
}

var ANGLE_VARIATION_PRESETS = {
  front:{orbit:'front',elevation:'eye',distance:'same',lens:'preserve',framing:'same'},
  high15:{orbit:'front',elevation:'high15',distance:'same',lens:'50mm',framing:'center'},
  high30:{orbit:'three_left',elevation:'high30',distance:'medium',lens:'85mm',framing:'center'},
  three_left:{orbit:'three_left',elevation:'eye',distance:'same',lens:'50mm',framing:'same'},
  profile_left:{orbit:'profile_left',elevation:'eye',distance:'same',lens:'50mm',framing:'same'},
  rear:{orbit:'rear',elevation:'eye',distance:'same',lens:'50mm',framing:'same'},
  three_right:{orbit:'three_right',elevation:'eye',distance:'same',lens:'50mm',framing:'same'},
  profile_right:{orbit:'profile_right',elevation:'eye',distance:'same',lens:'50mm',framing:'same'},
  top:{orbit:'front',elevation:'top',distance:'medium',lens:'50mm',framing:'center'},
  hero:{orbit:'three_right',elevation:'low30',distance:'medium',lens:'35mm',framing:'low'}
};

var ANGLE_PROMPT_LIBRARY = {
  subjectType:{
    product:'the exact product or packshot shown in the reference',
    object3d:'the exact 3D render or object shown in the reference',
    person:'the exact same person or character shown in the reference',
    fashion:'the exact same person, garment and styling shown in the reference',
    vehicle:'the exact same vehicle shown in the reference',
    environment:'the exact same environment or architecture shown in the reference'
  },
  orbit:{
    front:'front view, 0-degree horizontal orbit',
    micro_left:'subtle left three-quarter shift, camera orbiting 15 degrees counterclockwise',
    three_left:'left three-quarter view, camera orbiting 45 degrees counterclockwise',
    left_steep:'steep left three-quarter view, camera orbiting 65 degrees counterclockwise',
    profile_left:'exact left profile, camera orbiting 90 degrees counterclockwise',
    rear_three_left:'rear left three-quarter view, camera orbiting 135 degrees counterclockwise',
    rear:'direct rear view, 180-degree horizontal orbit',
    rear_three_right:'rear right three-quarter view, camera orbiting 135 degrees clockwise',
    profile_right:'exact right profile, camera orbiting 90 degrees clockwise',
    right_steep:'steep right three-quarter view, camera orbiting 65 degrees clockwise',
    three_right:'right three-quarter view, camera orbiting 45 degrees clockwise',
    micro_right:'subtle right three-quarter shift, camera orbiting 15 degrees clockwise'
  },
  elevation:{
    same:'preserve the original camera height and vertical angle',
    eye:'camera level with the visual center of the subject, zero vertical tilt',
    high15:'camera elevated 15 degrees with a subtle downward view',
    high30:'camera elevated 30 degrees with a controlled downward view',
    high45:'45-degree high-angle view with readable top surfaces',
    top:'true 90-degree top-down view, optical axis perpendicular to the base plane',
    low15:'camera lowered 15 degrees for a restrained low-angle view',
    low30:'camera lowered 30 degrees for a confident hero view',
    ground:'camera near the support plane with a 45-degree upward view'
  },
  distance:{
    same:'preserve the original subject scale, crop and breathing room',
    macro:'move to a precise macro detail while keeping the selected feature optically sharp',
    close:'use a tight close view without clipping essential silhouette information',
    medium:'show the complete subject with a controlled medium amount of surrounding space',
    wide:'use a wider contextual view while keeping the reference subject clearly dominant'
  },
  lens:{
    preserve:'preserve the apparent focal length, perspective compression and distortion of the source image',
    '35mm':'use a natural 35mm full-frame perspective with moderate spatial context and controlled edge distortion',
    '50mm':'use a neutral 50mm full-frame perspective with physically natural proportions',
    '85mm':'use an 85mm full-frame perspective with elegant compression and minimal geometric distortion',
    '100macro':'use a 100mm macro perspective with flat-field detail and realistic working distance',
    orthographic:'use an almost orthographic product-view perspective with parallel lines and minimal convergence'
  },
  framing:{
    same:'preserve the original subject position and negative-space balance',
    center:'center the subject precisely without changing its proportions',
    left:'place the subject on the left third while preserving its complete silhouette',
    right:'place the subject on the right third while preserving its complete silhouette',
    low:'place the subject lower in frame and preserve deliberate open space above'
  },
  precision:[
    'Solve the new view as a physically coherent camera relocation, not as a redesign.',
    'Maintain stable anchor points across silhouette, seams, edges, openings and printed details.',
    'Use strict multiview consistency: every visible feature must occupy the position implied by the original geometry.',
    'Treat the result as another photograph from the same locked set, captured seconds apart.',
    'Preserve scale relationships and construct the unseen side conservatively from visible evidence only.',
    'Keep the object stationary in world space; only the camera position changes.',
    'Reproject light, shadow and perspective consistently from the new camera without changing the lighting setup.',
    'Preserve manufacturing logic, thickness, curvature, joins and material boundaries across the new view.',
    'Do not beautify or correct the source; retain its real asymmetries and visible imperfections.',
    'Keep all brand assets pixel-faithful where visible and never invent text on newly revealed surfaces.',
    'Maintain the same exposure, white balance, contrast response and depth-of-field character.',
    'The result must register as the same subject and same shoot before it reads as a new composition.'
  ]
};

function buildAngleVariationPrompt(state, variation){
  var angle = state.angleVariation || {};
  var library = ANGLE_PROMPT_LIBRARY;
  var target = library.subjectType[angle.subjectType] || library.subjectType.product;
  var orbit = library.orbit[angle.orbit] || library.orbit.front;
  var elevation = library.elevation[angle.elevation] || library.elevation.same;
  var distance = library.distance[angle.distance] || library.distance.same;
  var lens = library.lens[angle.lens] || library.lens.preserve;
  var framing = library.framing[angle.framing] || library.framing.same;
  var precision = library.precision[Math.abs(variation || 0) % library.precision.length];
  var note = truncateWords(angle.note || '', 180);
  var rows = [];

  rows.push('REFERENCE-TO-VIEW TASK: Use the single attached image as the mandatory and exclusive visual source. Generate one new standalone image of ' + target + ' from a different camera viewpoint.');
  rows.push('CAMERA CHANGE ONLY: Keep the subject completely stationary in the same world position. Move only the camera to: ' + orbit + '; ' + elevation + '; ' + distance + '; ' + lens + '; ' + framing + '.');
  rows.push('IMMUTABLE IDENTITY LOCK: Preserve the exact same identity, silhouette, geometry, dimensions, proportions, construction, pose, expression, wardrobe, styling, colors, materials, texture, surface finish, transparency, wear, imperfections and all visible micro-details from the reference.');
  rows.push('BRAND AND TEXT LOCK: Preserve every visible logo, label, symbol, typography, number, graphic and placement exactly. Do not rewrite, mirror, repair, simplify or invent text. If a newly revealed surface was not visible in the source, keep it clean and structurally consistent; never fabricate branding.');
  rows.push('WORLD LOCK: Preserve the same environment, set design, support surface, prop positions, lighting direction, light quality, exposure, white balance, color palette, atmosphere and time of day. Reconstruct only the parallax and occlusion changes physically required by the new camera position.');
  rows.push('GEOMETRY CONTINUITY: Infer hidden surfaces conservatively from visible evidence, symmetry and real construction logic. No shape drift, swelling, melting, duplicated parts, missing parts, changed thickness, altered facial structure or changed garment cut.');
  rows.push('OPTICAL CONSISTENCY: Preserve realistic perspective, contact, scale, focus behavior, reflections and shadow logic for the requested camera. ' + precision);
  if(note) rows.push('USER NOTE: ' + cap(note) + '. Apply it only when it does not conflict with the identity and world locks above.');
  rows.push('OUTPUT: One image only. No contact sheet, no split screen, no before-and-after, no captions, no labels, no border and no watermark.');
  rows.push('EXCLUSIONS: No redesign, no restyling, no relighting concept, no recoloring, no background replacement, no new props, no subject rotation, no new pose, no expression change, no wardrobe change, no material change, no logo change, no invented text, no beauty retouching and no unrelated creative variation.');

  var text = rows.join('\n\n');
  return {
    text:text,
    length:text.length,
    maxLength:3400,
    cameraLabel:'Reference-locked camera orbit',
    lensName:angle.lens === 'preserve' ? 'Source perspective locked' : String(angle.lens || '').toUpperCase(),
    stockLabel:'Same shoot, new viewpoint'
  };
}

function buildPrompt(state, variation){
  var lens = LENSES[state.lensId];
  var shot = SHOTTYPES[state.shotId];
  var light = LIGHTING[state.lightId];
  var stock = STOCKS[state.stockId];
  var treatment = creativeTreatmentFor(state);
  var intensity = creativeIntensityFor(state);
  var seed = baseSeedFor(state) + (variation || 0);
  var isProduct = !!state.isProduct;
  var isItem    = !!state.isItem;
  var isItemLike = isItem || isProduct;     // ambos usam o framing neutro (ITEM_FRAMING)

  var subjectText = truncateWords(state.subject, 860);
  var actionText  = truncateWords(state.action, 140);
  var envText     = truncateWords(state.environment, 140);
  var moodText    = truncateWords(state.mood, 80);
  var conceptText = truncateWords(state.concept, 240);
  var paletteText = truncateWords(state.palette, 120);
  var materialsText = truncateWords(state.materials, 140);

  // Modo produto: injeta um fundo de estúdio limpo (a menos que o usuário escolha "contexto real").
  if(isProduct){
    var pbg = PRODUCT_BG[state.productBg || 'studio'] || '';
    if(pbg){ envText = envText ? (envText + ', ' + pbg) : pbg; }
  }

  var itemFraming = ITEM_FRAMING[state.shotId];

  var movement   = pick(light.movement, seed, 1);
  if(isItemLike){ movement = itemizeText(movement); }
  var position   = isItemLike ? pick(itemFraming.position, seed, 2) : pick(shot.position, seed, 2);
  var focus      = isItemLike ? pick(itemFraming.focus, seed, 3) : pick(shot.focus, seed, 3);
  var lightFull  = pick(light.light, seed, 4);
  var subjFrame  = isItemLike ? pick(itemFraming.frame, seed, 5) : pick(shot.subjectFrame, seed, 5);
  var fg         = isItemLike ? itemizeText(pick(shot.foreground, seed, 6)) : pick(shot.foreground, seed, 6);
  var mg         = isItemLike ? pick(itemFraming.midground, seed, 7) : pick(shot.midground, seed, 7);
  var bg         = pick(shot.background, seed, 8);
  var wardrobe   = pick(light.wardrobe, seed, 9);
  var makeup     = pick(light.makeup, seed, 10);
  var surface    = pick(isProduct ? PRODUCT_SURFACE : ITEM_SURFACE, seed, 9);
  var post       = pick(stock.post, seed, 11);
  if(isItemLike){ post = itemizeText(post); lightFull = itemizeText(lightFull); bg = itemizeText(bg); }
  var geomBase   = stripPeriod(isItemLike ? pick(itemFraming.geometry, seed, 12) : pick(shot.geometry, seed, 12));
  var geomFlavor = pick(light.geometryFlavor, seed, 13);
  var creativeDirection = pick(treatment.direction, seed, 31);
  var creativeComposition = pick(treatment.composition, seed, 32);
  var creativeMaterial = pick(treatment.material, seed, 33);
  if(isItemLike){ geomFlavor = itemizeText(geomFlavor); }

  // Produto: troca linguagem mecânica genérica por linguagem de produto limpo.
  if(isProduct){
    position = productizeText(position); focus = productizeText(focus);
    subjFrame = productizeText(subjFrame); mg = productizeText(mg);
    fg = productizeText(fg); bg = productizeText(bg);
    geomBase = stripPeriod(productizeText(geomBase));
    movement = itemToProduct(movement); lightFull = itemToProduct(lightFull); post = itemToProduct(post); geomFlavor = itemToProduct(geomFlavor);
  }

  function render(opts){
    // Bloco de intenção do usuário — sempre no topo, texto praticamente verbatim.
    var subjectClause = subjectText ? subjectText : 'The subject';

    // Ambiente completo só em SETTING; demais planos usam versão curta (1ª parte)
    // para não repetir texto longo e estourar o limite.
    var envShort = envText ? (envText.split(',')[0].trim() || envText) : '';

    var settingParts = [];
    if(envText) settingParts.push(envText);
    if(opts.includeMood && moodText) settingParts.push(moodText);

    var geom = opts.includeGeomFlavor ? (geomBase + ', ' + geomFlavor + '.') : (geomBase + '.');
    if(opts.includeCreativeComposition){ geom += ' ' + creativeComposition; }
    var lightText = opts.lightSentences ? firstSentences(lightFull, opts.lightSentences) : lightFull;

    // Ação reforçada no plano de foco SEM repetir o texto (ele já está na linha ACTION).
    var mgText = cap(fillEnv(mg, envShort));
    if(actionText){ mgText += ' Keep the action clear.'; }

    var rows = [];
    rows.push(['SUBJECT', cap(subjectClause) + '.']);
    if(conceptText) rows.push(['CONCEPT', cap(conceptText) + '.']);
    if(actionText) rows.push(['ACTION', cap(actionText) + '.']);
    if(settingParts.length) rows.push(['SETTING', cap(settingParts.join(', ')) + '.']);
    if(paletteText || materialsText){
      var dnaParts = [];
      if(paletteText) dnaParts.push('Palette: ' + paletteText);
      if(materialsText) dnaParts.push('Recurring materials: ' + materialsText);
      rows.push(['VISUAL DNA', cap(dnaParts.join('. ')) + '.']);
    }
    rows.push(['SHOT', cap(subjFrame) + '.']);
    rows.push(['CAMERA', lens.cameraLabel + ' at ISO ' + lens.iso + ', ' + movement + ', ' + position + '.']);
    rows.push(['LENS', lens.name + ', ' + focus + '.']);
    rows.push(['LIGHT', lightText]);
    if(opts.includeForeground) rows.push(['FOREGROUND', cap(fillEnv(fg, envShort))]);
    rows.push(['MIDGROUND', mgText]);
    if(opts.includeBackground) rows.push(['BACKGROUND', cap(fillEnv(bg, envShort))]);
    if(isItemLike){
      if(opts.includeWardrobe) rows.push([isProduct ? 'SURFACE / FINISH' : 'SURFACE / MATERIAL BEHAVIOR', surface]);
    } else {
      if(opts.includeWardrobe) rows.push(['WARDROBE TONAL BEHAVIOR', wardrobe]);
      if(opts.includeMakeup) rows.push(['MAKEUP SURFACE PHYSICS', makeup]);
    }
    if(opts.includeCreativeMaterial) rows.push(['SET / MATERIAL LANGUAGE', creativeMaterial]);
    rows.push(['POST BEHAVIOR', post]);
    if(opts.includeGeometry) rows.push(['COMPOSITIONAL GEOMETRY', cap(geom)]);
    if(opts.includeFidelity){
      rows.push(['FIDELITY', isProduct
        ? 'Preserve the described product, colour, material and branding exactly; keep it clean and undamaged.'
        : (isItem
          ? 'Preserve the described subject, action and setting exactly; do not replace them.'
          : 'Preserve the described subject, action, wardrobe and setting exactly; do not replace them.')]);
    }
    rows.push(['MOOD & ART DIRECTION', treatment.promptLabel + ' treatment. ' + creativeDirection + ' ' + intensity.prompt]);
    return rows.map(function(r){ return r[0] + ': ' + r[1]; }).join('\n');
  }

  // Ordem de corte: só encolhe scaffolding técnico/decorativo. Sujeito, ação e
  // ambiente ficam no topo e nunca são cortados (o hardCap apara a partir do fim).
  // Ordem de corte: primeiro o que é decorativo/genérico (trava, geomFlavor, clima,
  // foreground/background — redundantes com SETTING/MIDGROUND), encolhendo a luz por
  // último. Sujeito, AÇÃO, ambiente e os parágrafos técnicos centrais (MIDGROUND,
  // WARDROBE, MAKEUP, POST/grão, GEOMETRY) ficam protegidos. hardCap só em último caso.
  var opts = { includeMood:true, includeGeomFlavor:true, includeFidelity:true,
               includeForeground:true, includeBackground:true, includeGeometry:true,
               includeWardrobe:true, includeMakeup:true, includeCreativeMaterial:true,
               includeCreativeComposition:true, lightSentences:null };
  var text = render(opts);
  // Descarta primeiro o decorativo/redundante; preserva a trava de fidelidade,
  // o grão (POST), a ação e o ambiente. WARDROBE/MAKEUP só caem no extremo.
  if(text.length > MAX_LEN){ opts.includeGeomFlavor = false; text = render(opts); }
  if(text.length > MAX_LEN){ opts.includeForeground = false; text = render(opts); }
  if(text.length > MAX_LEN){ opts.includeBackground = false; text = render(opts); }
  if(text.length > MAX_LEN){ opts.includeCreativeMaterial = false; text = render(opts); }
  if(text.length > MAX_LEN){ opts.includeMood = false; text = render(opts); }
  if(text.length > MAX_LEN){ opts.lightSentences = 2; text = render(opts); }
  if(text.length > MAX_LEN){ opts.includeGeometry = false; text = render(opts); }
  if(text.length > MAX_LEN){ opts.includeCreativeComposition = false; text = render(opts); }
  if(text.length > MAX_LEN){ opts.lightSentences = 1; text = render(opts); }
  if(text.length > MAX_LEN){ opts.includeMakeup = false; text = render(opts); }
  if(text.length > MAX_LEN){ opts.includeWardrobe = false; text = render(opts); }
  // FIDELITY (trava de fidelidade) nunca é removida — o hardCap a preserva junto da linha final.
  if(text.length > MAX_LEN){ text = hardCap(text, MAX_LEN); }

  return {
    text: text,
    length: text.length,
    cameraLabel: lens.cameraLabel,
    lensName: lens.name,
    stockLabel: stock.label
  };
}

// Motor de VÍDEO — parágrafo fluido (movimento ao longo do tempo + progressão da ação).
function buildVideoPrompt(state, variation){
  var lens  = LENSES[state.lensId];
  var shot  = SHOTTYPES[state.shotId];
  var light = LIGHTING[state.lightId];
  var stock = STOCKS[state.stockId];
  var treatment = creativeTreatmentFor(state);
  var intensity = creativeIntensityFor(state);
  var model = VIDEO_MODELS[state.modelId] || null;
  var seedanceMode = isSeedanceModel(model);
  var motionKey = (state.motionId && VIDEO_MOTION[state.motionId]) ? state.motionId : 'static';
  var withSound = !!(model && model.sound);
  var isProduct = !!state.isProduct;
  var isItem    = !!state.isItem;
  var isItemLike = isItem || isProduct;

  var seed = baseSeedFor(state) + hashStr(motionKey + '|' + (state.modelId || '')) + (variation || 0);

  var subjectText = truncateWords(state.subject, 860);
  var actionText  = truncateWords(state.action, 140);
  var envText     = truncateWords(state.environment, 140);
  var moodText    = truncateWords(state.mood, 80);
  var conceptText = truncateWords(state.concept, 240);
  var paletteText = truncateWords(state.palette, 120);
  var materialsText = truncateWords(state.materials, 140);
  var seedanceSubject = seedanceLocalizeFreeText(subjectText);
  var seedanceAction  = seedanceLocalizeFreeText(actionText);
  var seedanceEnv     = seedanceLocalizeFreeText(envText);
  var seedanceMood    = seedanceLocalizeFreeText(moodText);
  var seedanceConcept = seedanceLocalizeFreeText(conceptText);
  var seedancePalette = seedanceLocalizeFreeText(paletteText);
  var seedanceMaterials = seedanceLocalizeFreeText(materialsText);

  if(isProduct){
    var pbg = PRODUCT_BG[state.productBg || 'studio'] || '';
    if(pbg){ envText = envText ? (envText + ', ' + pbg) : pbg; }
  }

  var motion   = pick(VIDEO_MOTION[motionKey], seed, 2);
  if(isItemLike){ motion = itemizeText(motion); }
  var progress = pick(isItemLike ? ITEM_PROGRESS : VIDEO_PROGRESS, seed, 3);
  var pacing   = pick(VIDEO_PACING, seed, 4);
  var guard    = pick(VIDEO_GUARDS, seed, 5);
  var itemFraming = ITEM_FRAMING[state.shotId];
  var subjFrame= isItemLike ? pick(itemFraming.frame, seed, 6) : pick(shot.subjectFrame, seed, 6);
  var lightFull= pick(light.light, seed, 7);
  var sound    = pick(VIDEO_SOUND, seed, 8);
  var post     = pick(stock.post, seed, 11);
  var creativeDirection = pick(treatment.direction, seed, 31);
  var creativeMaterial = pick(treatment.material, seed, 32);
  var creativeVideo = pick(treatment.video, seed, 33);
  var seedanceCreativeDirection = pick(treatment.seedance, seed, 34);
  var seedanceCreativeVideo = pick(treatment.seedanceVideo, seed, 35);
  if(isItemLike){ post = itemizeText(post); lightFull = itemizeText(lightFull); }
  if(isProduct){ subjFrame = productizeText(subjFrame); motion = itemToProduct(motion); lightFull = itemToProduct(lightFull); post = itemToProduct(post); }

  function renderSeedance(opts){
    var parts = [];
    var seedanceFrame = seedancePickMap(SEEDANCE_SHOT, state.shotId, seed, 21, '构图以主体清晰可读、环境关系明确为准。');
    var seedanceMotion = seedancePickMap(SEEDANCE_MOTION, motionKey, seed, 22, '镜头运动平稳、连续、克制。');
    var seedanceProgress = seedancePickMap(isItemLike ? { base:SEEDANCE_ITEM_PROGRESS } : { base:SEEDANCE_PROGRESS }, 'base', seed, 23, '');
    var seedancePacing = pick(SEEDANCE_PACING, seed, 24);
    var seedanceGuard = pick(SEEDANCE_GUARDS, seed, 25);
    var seedanceStyle = pick(SEEDANCE_STYLE, seed, 26);
    var seedanceLight = seedancePickMap(SEEDANCE_LIGHT, state.lightId, seed, 27, seedanceLightFallback(light));
    var seedancePost = seedancePickMap(SEEDANCE_STOCK, state.stockId, seed, 28, seedanceStockFallback(stock));

    parts.push('以下内容是 Seedance 专用中文视频提示词。整条提示词必须完全按照简体中文语义执行，不要输出英文句式，不要保留英文说明。');
    parts.push('画面必须真实、稳定、连续，优先保证人物、物件、环境和动作的一致性。');
    parts.push('主体设定：' + (seedanceSubject ? seedanceSubject : '主体未填写') + '。');
    if(seedanceConcept){ parts.push('核心概念：' + seedanceConcept + '。'); }
    if(seedanceAction){
      parts.push('动作设定：' + seedanceAction + '。');
      parts.push('动作推进：' + seedanceProgress.split('{action}').join(seedanceAction) + '。');
    }
    if(seedanceEnv){
      var setting = '环境设定：' + seedanceEnv;
      if(opts.includeMood && seedanceMood) setting += '；氛围：' + seedanceMood;
      parts.push(setting + '。');
    }
    if(seedancePalette){ parts.push('色彩DNA：' + seedancePalette + '。'); }
    if(seedanceMaterials){ parts.push('材质DNA：' + seedanceMaterials + '。'); }
    if(opts.includeFrame){ parts.push('构图设定：' + seedanceFrame + '。'); }
    parts.push('镜头运动：' + seedanceMotion + '。');
    if(opts.includeCreativeMotion){ parts.push('创意运动：' + seedanceCreativeVideo + '。'); }
    var camLine = '摄影机与镜头语言参考 ' + lens.cameraLabel + ' 搭配 ' + lens.name;
    if(opts.includePacing){ camLine += '，' + seedancePacing; }
    parts.push(camLine + '。');
    if(opts.lightSentences){ parts.push('布光方式：' + seedanceLight + '。'); }
    parts.push('质感与后期：' + seedancePost + '。');
    if(opts.includeGuard){ parts.push('稳定性要求：' + seedanceGuard + '。'); }
    if(withSound && opts.includeSound){ parts.push('声音：' + sound); }
    if(opts.includeFidelity){
      parts.push(isProduct
        ? '保真要求：产品的颜色、材质、品牌和文字信息必须严格按照描述呈现，保持干净、完整、无损，不得新增、遗漏或替换元素。'
        : (isItem
          ? '保真要求：物件、动作与环境必须严格按照描述呈现，不得新增、遗漏或替换。'
          : '保真要求：人物、服装、动作与环境必须严格按照描述呈现，不得新增、遗漏或替换。'));
    }
    parts.push('风格方向：' + seedanceStyle + ' ' + seedanceCreativeDirection + ' ' + intensity.seedance + '。');
    return parts.join(' ');
  }

  function render(opts){
    var parts = [];
    // Cena (sempre): sujeito, ação no tempo, ambiente.
    parts.push(cap(subjectText ? subjectText : 'The subject') + '.');
    if(conceptText){ parts.push('The central visual concept is ' + lowerFirst(conceptText) + '.'); }
    if(actionText){
      parts.push(cap(progress.split('{action}').join(lowerFirst(actionText))));
    }
    var setting = envText ? ('Set in ' + envText) : '';
    if(setting){
      if(opts.includeMood && moodText) setting += ' — ' + moodText;
      parts.push(setting + '.');
    }
    if(paletteText){ parts.push('Keep the campaign palette consistent: ' + paletteText + '.'); }
    if(materialsText){ parts.push('Keep the recurring material language consistent: ' + materialsText + '.'); }
    // Enquadramento (curto, descartável).
    if(opts.includeFrame){ parts.push(cap(stripPeriod(subjFrame)) + '.'); }
    // Movimento de câmera (sempre — é o coração do vídeo).
    parts.push('The camera ' + motion + '.');
    if(opts.includeCreativeMotion){ parts.push(creativeVideo); }
    // Lente / cadência.
    var camLine = 'Shot as if on ' + lens.cameraLabel + ' with the ' + lens.name;
    if(opts.includePacing){ camLine += ', ' + pacing; }
    parts.push(camLine + '.');
    // Luz (condensada).
    if(opts.lightSentences){ parts.push(firstSentences(lightFull, opts.lightSentences)); }
    // Cor / grão (sempre presente).
    parts.push(post);
    if(opts.includeCreativeMaterial){ parts.push(creativeMaterial); }
    // Travas de movimento.
    if(opts.includeGuard){ parts.push(guard); }
    // Som (só Veo).
    if(withSound && opts.includeSound){ parts.push(sound); }
    // Trava de fidelidade.
    if(opts.includeFidelity){
      parts.push(isProduct
        ? 'Render the product, its colour, material and branding exactly as described, clean and undamaged; do not invent, omit or replace elements.'
        : (isItem
          ? 'Render the item, action and setting exactly as described; do not invent, omit or replace them.'
          : 'Render the subject, wardrobe, action and setting exactly as described; do not invent, omit or replace them.'));
    }
    // Direção criativa escolhida pelo usuário.
    parts.push(treatment.promptLabel + ' visual treatment. ' + creativeDirection + ' ' + intensity.prompt);
    return parts.join(' ');
  }

  var opts = { includeMood:true, includeFrame:true, includePacing:true, lightSentences:2,
               includeGuard:true, includeSound:true, includeFidelity:true,
               includeCreativeMotion:true, includeCreativeMaterial:true };
  var renderer = seedanceMode ? renderSeedance : render;
  var text = renderer(opts);
  if(text.length > MAX_LEN){ opts.lightSentences = 1; text = renderer(opts); }
  if(text.length > MAX_LEN){ opts.includeFrame = false; text = renderer(opts); }
  if(text.length > MAX_LEN){ opts.includeCreativeMaterial = false; text = renderer(opts); }
  if(text.length > MAX_LEN){ opts.includeGuard = false; text = renderer(opts); }
  if(text.length > MAX_LEN){ opts.includeMood = false; text = renderer(opts); }
  if(text.length > MAX_LEN){ opts.includePacing = false; text = renderer(opts); }
  if(text.length > MAX_LEN){ opts.includeCreativeMotion = false; text = renderer(opts); }
  if(text.length > MAX_LEN){ opts.includeFidelity = false; text = renderer(opts); }
  if(text.length > MAX_LEN){ opts.includeSound = false; text = renderer(opts); }
  if(text.length > MAX_LEN){ text = hardCap(text, MAX_LEN); }

  return {
    text: text,
    length: text.length,
    cameraLabel: lens.cameraLabel,
    lensName: lens.name,
    stockLabel: stock.label,
    modelLabel: model ? model.label : '',
    withSound: withSound
  };
}
/* === ENGINE END === */

/* === UI START === */
(function(){
  function mountExpandedInspirationCards(){
    var grid = document.getElementById('inspirationGrid');
    if(!grid) return;
    Object.keys(INSPIRATION_EXPANSION).forEach(function(category){
      INSPIRATION_EXPANSION[category].forEach(function(item){
        var card = document.createElement('button');
        var image = document.createElement('img');
        var meta = document.createElement('span');
        var type = document.createElement('span');
        var title = document.createElement('strong');
        var apply = document.createElement('span');
        var categoryLabel = category === 'commercial' ? 'Comercial' : category === 'cinematic' ? 'Cinema' : 'Arte';
        card.type = 'button';
        card.className = 'inspiration-card';
        card.setAttribute('data-inspiration',item.id);
        card.setAttribute('data-category',category);
        card.setAttribute('aria-pressed','false');
        image.src = item.image;
        image.alt = 'Referência visual ' + item.label;
        image.loading = 'lazy';
        image.decoding = 'async';
        meta.className = 'inspiration-card__meta';
        type.className = 'inspiration-card__type';
        type.textContent = categoryLabel + ' · ' + item.type;
        title.textContent = item.label;
        apply.className = 'inspiration-card__apply';
        apply.textContent = 'Usar direção';
        meta.appendChild(type);
        meta.appendChild(title);
        meta.appendChild(apply);
        card.appendChild(image);
        card.appendChild(meta);
        grid.appendChild(card);
      });
    });
  }

  mountExpandedInspirationCards();
  var fSujeito = document.getElementById('fSujeito');
  var fAmbiente = document.getElementById('fAmbiente');
  var fAcao = document.getElementById('fAcao');
  var fClima = document.getElementById('fClima');
  var fConceito = document.getElementById('fConceito');
  var fPalette = document.getElementById('fPalette');
  var fMaterials = document.getElementById('fMaterials');
  var fPlano = document.getElementById('fPlano');
  var fLente = document.getElementById('fLente');
  var fIluminacao = document.getElementById('fIluminacao');
  var fFilme = document.getElementById('fFilme');
  var fAspect = document.getElementById('fAspect');
  var fResolucao = document.getElementById('fResolucao');
  var fModelo = document.getElementById('fModelo');
  var fMovimento = document.getElementById('fMovimento');
  var fDuracao = document.getElementById('fDuracao');
  var modeloNote = document.getElementById('modeloNote');
  var modeHint = document.getElementById('modeHint');
  var modeBtns = document.querySelectorAll('.mode-toggle .tab-btn');
  var cameraEcho = document.getElementById('cameraEcho');
  var filmeAutoNote = document.getElementById('filmeAutoNote');
  var promptOut = document.getElementById('promptOut');
  var charCounter = document.getElementById('charCounter');
  var settingsReminder = document.getElementById('settingsReminder');
  var btnVariacao = document.getElementById('btnVariacao');
  var btnVariarTudo = document.getElementById('btnVariarTudo');
  var btnCopyPrompt = document.getElementById('btnCopyPrompt');
  var outputTitle = document.getElementById('outputTitle');
  var outputTabButtons = document.querySelectorAll('.output-tab-button[data-output-tab]');
  var outputViews = document.querySelectorAll('.output-view[data-output-view]');
  var campaignSetEl = document.getElementById('campaignSet');
  var campaignEmpty = document.getElementById('campaignEmpty');
  var campaignActions = document.getElementById('campaignActions');
  var btnCopyCampaign = document.getElementById('btnCopyCampaign');
  var recipeOut = document.getElementById('recipeOut');
  var recipeEmpty = document.getElementById('recipeEmpty');
  var recipeActions = document.getElementById('recipeActions');
  var btnCopyRecipe = document.getElementById('btnCopyRecipe');
  var historyList = document.getElementById('historyList');
  var historyEmpty = document.getElementById('historyEmpty');
  var btnClearHistory = document.getElementById('btnClearHistory');
  var inspirationCards = document.querySelectorAll('.inspiration-card[data-inspiration]');
  var inspirationFilters = document.querySelectorAll('.inspiration-filter[data-inspiration-filter]');
  var inspirationStatus = document.getElementById('inspirationStatus');
  var dnaLockButtons = document.querySelectorAll('.dna-lock[data-dna-lock]');
  var studioNoteTitle = document.getElementById('studioNoteTitle');
  var studioNoteText = document.getElementById('studioNoteText');
  var form = document.getElementById('promptForm');
  var characterSheetPanel = document.getElementById('characterSheetPanel');
  var angleVariationPanel = document.getElementById('angleVariationPanel');
  var anglePresetButtons = document.querySelectorAll('[data-angle-preset]');
  var angleReferenceGrid = document.getElementById('angleReferenceGrid');
  var angleScrollPrev = document.getElementById('angleScrollPrev');
  var angleScrollNext = document.getElementById('angleScrollNext');
  var refreshAngleReferenceControls = function(){};
  var angleSubjectType = document.getElementById('angleSubjectType');
  var angleOrbit = document.getElementById('angleOrbit');
  var angleElevation = document.getElementById('angleElevation');
  var angleDistance = document.getElementById('angleDistance');
  var angleLens = document.getElementById('angleLens');
  var angleFraming = document.getElementById('angleFraming');
  var angleNote = document.getElementById('angleNote');
  var backgroundScenePanel = document.getElementById('backgroundScenePanel');
  var backgroundWorkflowNote = document.getElementById('backgroundWorkflowNote');
  var backgroundControlButtons = document.querySelectorAll('[data-bg-control][data-bg-value]');
  var bgProductType = document.getElementById('bgProductType');
  var bgEnvironmentStyle = document.getElementById('bgEnvironmentStyle');
  var bgSceneIdea = document.getElementById('bgSceneIdea');
  var bgSurface = document.getElementById('bgSurface');
  var bgComposition = document.getElementById('bgComposition');
  var bgDepth = document.getElementById('bgDepth');
  var bgLighting = document.getElementById('bgLighting');
  var bgPalette = document.getElementById('bgPalette');
  var standardSceneFields = document.getElementById('standardSceneFields');
  var characterFields = {
    presentation: document.getElementById('csPresentation'),
    age: document.getElementById('csAge'),
    ethnicity: document.getElementById('csEthnicity'),
    skinTone: document.getElementById('csSkinTone'),
    hairColor: document.getElementById('csHairColor'),
    hairStyle: document.getElementById('csHairStyle'),
    eyeColor: document.getElementById('csEyeColor'),
    bodyType: document.getElementById('csBodyType'),
    facialHair: document.getElementById('csFacialHair'),
    wardrobe: document.getElementById('csWardrobe')
  };
  var activePersona = '';
  var activeTreatment = 'cinematic';
  var activeIntensity = 'expressive';
  var selectedInspiration = '';
  var dnaLocks = { direction:true, light:true, lens:true };
  var currentCampaign = [];
  var currentRecipeText = '';
  var HISTORY_KEY = 'prompt-studio-creative-history-v1';
  var treatmentCards = document.querySelectorAll('.treatment-card[data-treatment]');
  var intensityButtons = document.querySelectorAll('.intensity-btn[data-intensity]');
  var treatmentInsight = document.getElementById('treatmentInsight');
  var intensityNote = document.getElementById('intensityNote');

  function renderEmptyPrompt(){
    var empty = document.createElement('span');
    empty.className = 'empty-state';
    empty.textContent = 'Preencha o formulário e clique em "Gerar Prompt".';
    promptOut.textContent = '';
    promptOut.appendChild(empty);
  }

  function renderSettingsReminder(parts){
    settingsReminder.textContent = '';
    parts.forEach(function(part){
      if(part && typeof part === 'object' && Object.prototype.hasOwnProperty.call(part, 'strong')){
        var strong = document.createElement('b');
        strong.textContent = String(part.strong);
        settingsReminder.appendChild(strong);
        return;
      }
      settingsReminder.appendChild(document.createTextNode(String(part)));
    });
  }

  function invalidateGeneratedPrompt(){
    currentState = null;
    variation = 0;
    clearCampaignOutput();
    clearRecipeOutput();
    btnVariacao.disabled = true;
    btnVariarTudo.disabled = true;
    renderEmptyPrompt();
    charCounter.textContent = '0 / ' + (activePersona === 'character_sheet' ? CHARACTER_SHEET_MAX_LEN : (activePersona === 'angle_variation' ? 3400 : (activePersona === 'background_scene' ? 3200 : MAX_LEN)));
    charCounter.classList.remove('over');
    settingsReminder.textContent = '';
  }

  function setCreativeTreatment(id, silent){
    var treatment = CREATIVE_TREATMENTS[id];
    if(!treatment) return;
    activeTreatment = id;
    form.setAttribute('data-treatment', id);
    treatmentCards.forEach(function(card){
      var on = card.getAttribute('data-treatment') === id;
      card.classList.toggle('active', on);
      card.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    treatmentInsight.textContent = treatment.ui;
    if(!silent) invalidateGeneratedPrompt();
  }

  function setCreativeIntensity(id, silent){
    var intensity = CREATIVE_INTENSITIES[id];
    if(!intensity) return;
    activeIntensity = id;
    intensityButtons.forEach(function(button){
      var on = button.getAttribute('data-intensity') === id;
      button.classList.toggle('active', on);
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    intensityNote.textContent = intensity.ui;
    if(!silent) invalidateGeneratedPrompt();
  }

  treatmentCards.forEach(function(card){
    card.addEventListener('click', function(){
      setCreativeTreatment(card.getAttribute('data-treatment'), false);
    });
  });
  intensityButtons.forEach(function(button){
    button.addEventListener('click', function(){
      setCreativeIntensity(button.getAttribute('data-intensity'), false);
    });
  });
  setCreativeTreatment(activeTreatment, true);
  setCreativeIntensity(activeIntensity, true);
  fConceito.placeholder = CREATIVE_CONCEPT_PLACEHOLDERS.base;

  function setOutputView(id){
    var titles = {
      prompt:'Prompt final',
      campaign:'Campaign Set',
      recipe:'Receita técnica',
      history:'Histórico local'
    };
    outputTabButtons.forEach(function(button){
      var on = button.getAttribute('data-output-tab') === id;
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    outputViews.forEach(function(view){
      view.classList.toggle('is-active', view.getAttribute('data-output-view') === id);
    });
    outputTitle.textContent = titles[id] || 'Saída criativa';
    charCounter.style.visibility = id === 'prompt' ? 'visible' : 'hidden';
  }

  outputTabButtons.forEach(function(button){
    button.addEventListener('click', function(){
      setOutputView(button.getAttribute('data-output-tab'));
    });
  });

  function clearCampaignOutput(){
    currentCampaign = [];
    campaignSetEl.textContent = '';
    campaignEmpty.classList.remove('hidden');
    campaignActions.classList.add('hidden');
  }

  function clearRecipeOutput(){
    currentRecipeText = '';
    recipeOut.textContent = '';
    recipeEmpty.classList.remove('hidden');
    recipeActions.classList.add('hidden');
  }

  function updateDnaLockHint(){
    btnVariarTudo.title = dnaLocks.direction
      ? 'Mantém cena e direção; varia plano, lente, iluminação, filme e movimento.'
      : 'Mantém a cena; varia direção, plano, lente, iluminação, filme e movimento.';
  }

  dnaLockButtons.forEach(function(button){
    button.addEventListener('click', function(){
      var key = button.getAttribute('data-dna-lock');
      dnaLocks[key] = !dnaLocks[key];
      button.classList.toggle('is-locked', dnaLocks[key]);
      button.setAttribute('aria-pressed', dnaLocks[key] ? 'true' : 'false');
      updateDnaLockHint();
    });
  });
  updateDnaLockHint();

  function selectPersonaByKey(key){
    var selector = '.persona-chip[data-persona="' + key + '"]';
    var chip = document.querySelector(selector);
    if(chip) activatePersonaChip(chip);
  }

  function applyInspiration(id){
    var preset = INSPIRATION_PRESETS[id];
    if(!preset) return;
    var sourcePrompt = String(preset.sourcePrompt || '').replace(/\s+/g, ' ').trim();
    var useSourceDirection = sourcePrompt && preset.sourceId !== 4 && preset.sourceId !== 6;
    var sourceDirection = preset.sourceDirection || {};
    selectedInspiration = id;
    selectPersonaByKey(preset.persona || '');
    setCreativeTreatment(preset.treatment, true);
    setCreativeIntensity(preset.intensity, true);
    if(useSourceDirection){
      var firstSentence = (sourcePrompt.match(/^.*?[.!?](?:\s|$)/) || [sourcePrompt])[0].trim();
      fSujeito.value = sourceDirection.subject || (firstSentence.length > 360 ? firstSentence.slice(0, 357).trim() + '...' : firstSentence);
      fConceito.value = sourcePrompt;
      fAmbiente.value = sourceDirection.environment || preset.environment || '';
      fAcao.value = sourceDirection.action || preset.action || '';
      fClima.value = sourceDirection.mood || preset.mood || '';
      fPalette.value = sourceDirection.palette || preset.palette || '';
      fMaterials.value = sourceDirection.materials || preset.materials || '';
    } else {
      fSujeito.value = preset.subject;
      fConceito.value = preset.concept;
      fAmbiente.value = preset.environment;
      fAcao.value = preset.action || '';
      fClima.value = preset.mood;
      fPalette.value = preset.palette;
      fMaterials.value = preset.materials;
    }
    fPlano.value = preset.shotId;
    fLente.value = preset.lensId;
    fIluminacao.value = preset.lightId;
    fFilme.value = preset.stockId;
    fAspect.value = preset.aspectRatio;
    fLente.dispatchEvent(new Event('change'));
    inspirationCards.forEach(function(card){
      var on = card.getAttribute('data-inspiration') === id;
      card.classList.toggle('is-selected', on);
      card.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    inspirationStatus.textContent = preset.label + (useSourceDirection
      ? ' aplicado com a direção visual original. Ajuste os campos ou gere a campanha.'
      : ' aplicado com direção curada. Ajuste os campos ou gere a campanha.');
    inspirationStatus.classList.add('is-ready');
    studioNoteTitle.textContent = 'Direção aplicada: ' + preset.label + '.';
    studioNoteText.textContent = useSourceDirection
      ? 'A descrição visual ligada a este frame foi aplicada sem inventar outro conceito. Faça apenas os ajustes que quiser antes de gerar.'
      : 'A receita visual preencheu conceito, paleta, materiais e técnica. Use o Campaign Set para desdobrar o mesmo mundo em cinco shots.';
    invalidateGeneratedPrompt();
    var scenePanel = document.querySelector('.stage-card-scene');
    if(scenePanel) scenePanel.classList.remove('mobile-step-collapsed');
  }

  inspirationCards.forEach(function(card){
    card.addEventListener('click', function(){
      applyInspiration(card.getAttribute('data-inspiration'));
    });
  });

  inspirationFilters.forEach(function(button){
    button.addEventListener('click', function(){
      var filter = button.getAttribute('data-inspiration-filter');
      inspirationFilters.forEach(function(item){
        var on = item === button;
        item.classList.toggle('is-active', on);
        item.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      inspirationCards.forEach(function(card){
        card.hidden = filter !== 'all' && card.getAttribute('data-category') !== filter;
      });
    });
  });

  function initMobileSteps(){
    document.querySelectorAll('.stage-card[data-mobile-step]').forEach(function(panel){
      var button = document.createElement('button');
      var index = document.createElement('span');
      var copy = document.createElement('span');
      var title = document.createElement('strong');
      var note = document.createElement('small');
      button.type = 'button';
      button.className = 'mobile-step-toggle';
      if(!panel.id) panel.id = 'generator-step-' + panel.getAttribute('data-mobile-step');
      button.setAttribute('aria-controls', panel.id);
      button.setAttribute('aria-expanded', panel.getAttribute('data-mobile-step') === '1' ? 'true' : 'false');
      index.className = 'mobile-step-toggle__index';
      index.textContent = panel.getAttribute('data-mobile-step');
      title.textContent = panel.getAttribute('data-step-title');
      note.textContent = panel.getAttribute('data-step-note');
      copy.appendChild(title);
      copy.appendChild(note);
      button.appendChild(index);
      button.appendChild(copy);
      panel.insertBefore(button, panel.firstChild);
      if(panel.getAttribute('data-mobile-step') === '2') panel.classList.add('mobile-step-collapsed');
      button.addEventListener('click', function(){
        var collapsed = panel.classList.toggle('mobile-step-collapsed');
        button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      });
    });
  }
  initMobileSteps();

  // Required fields can live inside a collapsed stage. Reveal the stage before
  // native validation tries to focus the first missing control.
  form.addEventListener('invalid', function(event){
    var panel = event.target && event.target.closest
      ? event.target.closest('.stage-card[data-mobile-step]')
      : null;
    if(!panel || !panel.classList.contains('mobile-step-collapsed')) return;
    panel.classList.remove('mobile-step-collapsed');
    var toggle = panel.querySelector('.mobile-step-toggle');
    if(toggle) toggle.setAttribute('aria-expanded', 'true');
  }, true);

  function cloneState(state){
    var cloned = {};
    Object.keys(state).forEach(function(key){ cloned[key] = state[key]; });
    return cloned;
  }

  function buildCampaignSet(state){
    if(!state || state.isCharacterSheet || state.isBackgroundScene || state.isAngleVariation) return [];
    return CAMPAIGN_BLUEPRINTS.map(function(blueprint, index){
      var shotState = cloneState(state);
      if(blueprint.shotId) shotState.shotId = blueprint.shotId;
      if(!dnaLocks.lens && blueprint.lensId) shotState.lensId = blueprint.lensId;
      if(!dnaLocks.light){
        if(blueprint.lightId) shotState.lightId = blueprint.lightId;
        if(blueprint.stockId) shotState.stockId = blueprint.stockId;
      }
      if(state.mode === 'video' && blueprint.motionId) shotState.motionId = blueprint.motionId;
      var result = state.mode === 'video'
        ? buildVideoPrompt(shotState, 100 + index * 17)
        : buildPrompt(shotState, 100 + index * 17);
      return {
        id:blueprint.id,
        label:blueprint.label,
        note:blueprint.note,
        text:result.text,
        length:result.length
      };
    });
  }

  function renderCampaignSet(state){
    currentCampaign = buildCampaignSet(state);
    campaignSetEl.textContent = '';
    campaignEmpty.classList.toggle('hidden', currentCampaign.length > 0);
    campaignActions.classList.toggle('hidden', currentCampaign.length === 0);
    currentCampaign.forEach(function(shot, index){
      var card = document.createElement('article');
      var head = document.createElement('div');
      var badge = document.createElement('span');
      var heading = document.createElement('div');
      var title = document.createElement('h4');
      var note = document.createElement('p');
      var copyButton = document.createElement('button');
      var prompt = document.createElement('pre');
      card.className = 'campaign-shot';
      head.className = 'campaign-shot__head';
      badge.className = 'campaign-shot__index';
      badge.textContent = String(index + 1).padStart(2, '0');
      title.textContent = shot.label;
      note.textContent = shot.note;
      heading.appendChild(title);
      heading.appendChild(note);
      copyButton.type = 'button';
      copyButton.className = 'campaign-shot__copy';
      copyButton.textContent = 'Copiar';
      copyButton.addEventListener('click', function(){ copyText(shot.text, copyButton, 'Copiar'); });
      head.appendChild(badge);
      head.appendChild(heading);
      head.appendChild(copyButton);
      prompt.textContent = shot.text;
      card.appendChild(head);
      card.appendChild(prompt);
      campaignSetEl.appendChild(card);
    });
  }

  btnCopyCampaign.addEventListener('click', function(){
    if(!currentCampaign.length) return;
    var text = currentCampaign.map(function(shot, index){
      return String(index + 1).padStart(2, '0') + ' · ' + shot.label.toUpperCase() + '\n' + shot.text;
    }).join('\n\n--------------------\n\n');
    copyText(text, btnCopyCampaign, 'Copiar conjunto');
  });

  function addRecipeItem(label, value){
    if(!value) return;
    var item = document.createElement('div');
    var term = document.createElement('dt');
    var description = document.createElement('dd');
    item.className = 'recipe-item';
    term.textContent = label;
    description.textContent = value;
    item.appendChild(term);
    item.appendChild(description);
    recipeOut.appendChild(item);
  }

  function renderRecipe(state){
    recipeOut.textContent = '';
    if(!state){ clearRecipeOutput(); return; }
    if(state.isCharacterSheet){
      addRecipeItem('Modo', 'Character Sheet · Nano Banana Pro');
      addRecipeItem('Estrutura', '6 vistas únicas · 16:9 · fundo branco · RAW neutro');
      addRecipeItem('Resolução', state.resolution);
    } else if(state.isAngleVariation){
      addRecipeItem('Modo', 'Variação de Ângulo · Reference lock');
      addRecipeItem('Órbita', angleOrbit.options[angleOrbit.selectedIndex].text);
      addRecipeItem('Elevação', angleElevation.options[angleElevation.selectedIndex].text);
      addRecipeItem('Distância', angleDistance.options[angleDistance.selectedIndex].text);
      addRecipeItem('Lente', angleLens.options[angleLens.selectedIndex].text);
      addRecipeItem('Quadro', angleFraming.options[angleFraming.selectedIndex].text);
      addRecipeItem('Formato', state.aspectRatio + ' · ' + state.resolution);
    } else if(state.isBackgroundScene){
      var bgRecipe = state.backgroundScene || {};
      addRecipeItem('Modo', bgRecipe.task === 'scene_only' ? 'Somente cenário vazio' : 'Produto + cenário');
      addRecipeItem('Ambiente', bgEnvironmentStyle.options[bgEnvironmentStyle.selectedIndex].text);
      addRecipeItem('Superfície', bgSurface.options[bgSurface.selectedIndex].text);
      addRecipeItem('Composição', bgComposition.options[bgComposition.selectedIndex].text);
      addRecipeItem('Profundidade', bgDepth.options[bgDepth.selectedIndex].text);
      addRecipeItem('Luz', bgLighting.options[bgLighting.selectedIndex].text);
      addRecipeItem('Formato', state.aspectRatio + ' · ' + state.resolution);
    } else {
      var treatment = CREATIVE_TREATMENTS[state.treatmentId];
      var intensity = CREATIVE_INTENSITIES[state.intensityId];
      var shot = SHOTTYPES[state.shotId];
      var lens = LENSES[state.lensId];
      var light = LIGHTING[state.lightId];
      var stock = STOCKS[state.stockId];
      addRecipeItem('Modo', state.mode === 'video' ? 'Vídeo' : 'Imagem');
      addRecipeItem('Tratamento', (treatment ? treatment.label : state.treatmentId) + ' · ' + (intensity ? intensity.label : state.intensityId));
      addRecipeItem('Conceito', state.concept);
      addRecipeItem('Paleta', state.palette);
      addRecipeItem('Materiais', state.materials);
      addRecipeItem('Plano', shot ? shot.label : state.shotId);
      addRecipeItem('Câmera e lente', lens ? lens.cameraLabel + ' · ' + lens.name : state.lensId);
      addRecipeItem('Iluminação', light ? light.label : state.lightId);
      addRecipeItem('Filme', stock ? stock.label : state.stockId);
      addRecipeItem('Formato', state.aspectRatio + ' · ' + state.resolution);
      if(state.mode === 'video'){
        addRecipeItem('Modelo', VIDEO_MODELS[state.modelId] ? VIDEO_MODELS[state.modelId].label : state.modelId);
        addRecipeItem('Movimento', state.motionId);
        addRecipeItem('Duração', state.duration);
      }
    }
    var recipeParts = [];
    Array.prototype.forEach.call(recipeOut.querySelectorAll('.recipe-item'), function(item){
      recipeParts.push(item.querySelector('dt').textContent.toUpperCase() + ': ' + item.querySelector('dd').textContent);
    });
    currentRecipeText = recipeParts.join('\n');
    recipeEmpty.classList.toggle('hidden', !!currentRecipeText);
    recipeActions.classList.toggle('hidden', !currentRecipeText);
  }

  btnCopyRecipe.addEventListener('click', function(){
    copyText(currentRecipeText, btnCopyRecipe, 'Copiar receita');
  });

  function safeHistoryString(value, maxLength, fallback){
    return typeof value === 'string' ? value.slice(0, maxLength) : fallback;
  }

  function normalizeHistoryEntry(entry){
    if(!entry || typeof entry !== 'object') return null;
    var prompt = safeHistoryString(entry.prompt, 4000, '');
    if(!prompt) return null;
    var storedMax = Number(entry.maxLength);
    return {
      id:safeHistoryString(entry.id, 40, String(Date.now())),
      createdAt:safeHistoryString(entry.createdAt, 40, ''),
      mode:safeHistoryString(entry.mode, 40, 'Prompt'),
      treatment:safeHistoryString(entry.treatment, 80, 'Personalizado'),
      subject:safeHistoryString(entry.subject, 240, 'Projeto sem título'),
      maxLength:Number.isFinite(storedMax) ? Math.max(1, Math.min(4000, storedMax)) : MAX_LEN,
      prompt:prompt
    };
  }

  function readHistory(){
    try {
      var history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      if(!Array.isArray(history)) return [];
      return history.slice(0, 8).map(normalizeHistoryEntry).filter(Boolean);
    } catch(error){ return []; }
  }

  function writeHistory(history){
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 8))); } catch(error){}
  }

  function addHistoryEntry(state, promptText){
    if(!promptText) return;
    var history = readHistory();
    history.unshift({
      id:String(Date.now()),
      createdAt:new Date().toISOString(),
      mode:state.isCharacterSheet ? 'Character Sheet' : (state.isAngleVariation ? 'Variação de Ângulo' : (state.isBackgroundScene ? 'Cenário' : (state.mode === 'video' ? 'Vídeo' : 'Imagem'))),
      treatment:state.isCharacterSheet ? 'Consistência' : (state.isAngleVariation ? 'Reference lock' : (state.isBackgroundScene ? 'Product lock' : ((CREATIVE_TREATMENTS[state.treatmentId] || {}).label || state.treatmentId))),
      subject:state.isCharacterSheet ? 'Ficha técnica de personagem' : (state.isAngleVariation ? 'Nova vista da referência' : (state.isBackgroundScene ? ((state.backgroundScene || {}).idea || 'Cenário de produto') : (state.subject || state.concept || 'Projeto sem título'))),
      maxLength:state.isCharacterSheet ? CHARACTER_SHEET_MAX_LEN : (state.isAngleVariation ? 3400 : (state.isBackgroundScene ? 3200 : MAX_LEN)),
      prompt:promptText
    });
    writeHistory(history);
    renderHistory();
  }

  function renderHistory(){
    var history = readHistory();
    historyList.textContent = '';
    historyEmpty.classList.toggle('hidden', history.length > 0);
    history.forEach(function(entry){
      var card = document.createElement('article');
      var head = document.createElement('div');
      var type = document.createElement('span');
      var time = document.createElement('time');
      var summary = document.createElement('p');
      var actions = document.createElement('div');
      var openButton = document.createElement('button');
      var copyButton = document.createElement('button');
      card.className = 'history-card';
      head.className = 'history-card__head';
      type.className = 'history-card__type';
      type.textContent = entry.mode + ' · ' + entry.treatment;
      time.dateTime = entry.createdAt;
      try { time.textContent = new Date(entry.createdAt).toLocaleDateString('pt-BR', {day:'2-digit',month:'2-digit'}); }
      catch(error){ time.textContent = ''; }
      summary.textContent = entry.subject.length > 96 ? entry.subject.slice(0, 93) + '...' : entry.subject;
      actions.className = 'history-card__actions';
      openButton.type = 'button';
      openButton.textContent = 'Abrir';
      openButton.addEventListener('click', function(){
        promptOut.textContent = entry.prompt;
        charCounter.textContent = entry.prompt.length + ' / ' + (entry.maxLength || MAX_LEN);
        settingsReminder.textContent = 'Prompt carregado do histórico. Para variar, gere novamente pelo formulário.';
        btnVariacao.disabled = true;
        btnVariarTudo.disabled = true;
        setOutputView('prompt');
      });
      copyButton.type = 'button';
      copyButton.textContent = 'Copiar';
      copyButton.addEventListener('click', function(){ copyText(entry.prompt, copyButton, 'Copiar'); });
      head.appendChild(type);
      head.appendChild(time);
      actions.appendChild(openButton);
      actions.appendChild(copyButton);
      card.appendChild(head);
      card.appendChild(summary);
      card.appendChild(actions);
      historyList.appendChild(card);
    });
  }

  btnClearHistory.addEventListener('click', function(){
    try { localStorage.removeItem(HISTORY_KEY); } catch(error){}
    renderHistory();
  });
  renderHistory();

  function populateOptions(dataObj, target){
    Object.keys(dataObj).forEach(function(key){
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = dataObj[key].label;
      target(key, opt);
    });
  }

  // Lentes: optgroups gerados dinamicamente, na ordem dos grupos definidos.
  var LENS_GROUPS = [
    { id:'imax',    label:'IMAX MK IV 65mm' },
    { id:'alexa',   label:'ARRI Alexa 35' },
    { id:'special', label:'Lentes especiais / de caráter' }
  ];
  LENS_GROUPS.forEach(function(grp){
    var og = document.createElement('optgroup');
    og.label = grp.label;
    Object.keys(LENSES).forEach(function(key){
      if(LENSES[key].group !== grp.id) return;
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = LENSES[key].label;
      og.appendChild(opt);
    });
    if(og.children.length) fLente.appendChild(og);
  });
  populateOptions(LIGHTING, function(key, opt){ fIluminacao.appendChild(opt); });
  populateOptions(STOCKS, function(key, opt){ fFilme.appendChild(opt); });
  Object.keys(characterFields).forEach(function(group){
    populateOptions(CHARACTER_SHEET_TERMS[group], function(key, opt){
      characterFields[group].appendChild(opt);
    });
  });

  // Modelos de vídeo agrupados por família (Kling / Seedance / Veo).
  VIDEO_MODEL_GROUPS.forEach(function(fam){
    var og = document.createElement('optgroup');
    og.label = fam;
    Object.keys(VIDEO_MODELS).forEach(function(key){
      if(VIDEO_MODELS[key].family !== fam) return;
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = VIDEO_MODELS[key].label;
      og.appendChild(opt);
    });
    if(og.children.length) fModelo.appendChild(og);
  });
  // Opções de movimento de câmera.
  VIDEO_MOTION_OPTIONS.forEach(function(m){
    var opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = m.label;
    fMovimento.appendChild(opt);
  });

  // ---- Modo Imagem / Vídeo ----
  var mode = 'img';
  fModelo.addEventListener('change', function(){
    var m = VIDEO_MODELS[fModelo.value];
    modeloNote.textContent = m ? (m.sound ? 'Veo gera com áudio — o prompt incluirá som ambiente (sem música).' : 'Sem áudio — modelo gera apenas vídeo.') : '';
  });
  function applyMode(){
    var isVideo = (mode === 'video');
    var isCharacterSheet = (activePersona === 'character_sheet');
    var isAngleVariation = (activePersona === 'angle_variation');
    var isBackgroundScene = (activePersona === 'background_scene');
    var hasOwnTechnicalFlow = isCharacterSheet || isAngleVariation || isBackgroundScene;
    form.classList.toggle('is-video', isVideo);
    form.classList.toggle('is-character-sheet', isCharacterSheet);
    form.classList.toggle('is-angle-variation', isAngleVariation);
    form.classList.toggle('is-background-scene', isBackgroundScene);
    modeBtns.forEach(function(b){
      var on = b.getAttribute('data-mode') === mode;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    // Modos especiais têm gramática própria; os campos cinematográficos ficam fora da validação.
    fPlano.required = !hasOwnTechnicalFlow;
    fLente.required = !hasOwnTechnicalFlow;
    fIluminacao.required = !hasOwnTechnicalFlow;
    fFilme.required = !hasOwnTechnicalFlow;
    fModelo.required = isVideo;
    fMovimento.required = isVideo;
    fAspect.disabled = isCharacterSheet;
    bgSceneIdea.required = isBackgroundScene;
    btnVariacao.textContent = isCharacterSheet ? 'Variar redação' : (isAngleVariation ? 'Variar precisão' : (isBackgroundScene ? 'Variar cenário' : 'Gerar Variação'));
    if(isCharacterSheet){
      modeHint.textContent = 'Character Sheet — ficha fotográfica de seis vistas para Nano Banana Pro.';
      studioNoteTitle.textContent = 'Consistência nasce de decisões visuais fixas.';
      studioNoteText.textContent = 'A ficha mantém rosto, corpo, cabelo, pele e roupa idênticos em seis ângulos. Escolha os traços; o tratamento técnico já está travado.';
    } else if(isAngleVariation){
      modeHint.textContent = 'Variação de Ângulo — a referência fica bloqueada; somente a câmera muda.';
      studioNoteTitle.textContent = 'Mova a câmera, não o sujeito.';
      studioNoteText.textContent = 'Use sempre a imagem original como fonte. Gere uma vista por vez para impedir que pequenas alterações se acumulem entre as órbitas.';
    } else if(isBackgroundScene){
      modeHint.textContent = 'Cenário de Produto — o objeto fica bloqueado; apenas ambiente e integração física são dirigidos.';
      studioNoteTitle.textContent = 'O produto é a fonte da verdade.';
      studioNoteText.textContent = 'A IA não deve redesenhar o objeto. Construa perspectiva, superfície, sombra e luz ao redor da referência anexada.';
    } else {
      modeHint.textContent = isVideo
        ? 'Modo Vídeo — prompt fluido com movimento de câmera para Kling, Seedance ou Veo.'
        : 'Modo Imagem — prompt detalhado para geradores de imagem.';
      studioNoteTitle.textContent = 'Monte a cena como se estivesse dirigindo o frame.';
      studioNoteText.textContent = 'Se o conceito, o sujeito e o espaço estiverem fracos, não existe lente ou LUT que salve o prompt. Direção visual começa antes da técnica.';
    }
  }
  modeBtns.forEach(function(b){
    b.addEventListener('click', function(){
      var nextMode = b.getAttribute('data-mode');
      if(nextMode === 'video' && (activePersona === 'character_sheet' || activePersona === 'angle_variation' || activePersona === 'background_scene')){
        var clearPersona = document.querySelector('.persona-chip[data-persona=""]');
        if(clearPersona) clearPersona.click();
      }
      mode = nextMode;
      applyMode();
    });
  });
  applyMode();

  var personaChips = document.querySelectorAll('.persona-chip[data-persona]');
  var personaChipGroup = document.getElementById('personaChipsMain');
  var lblSujeito = document.getElementById('lblSujeito');
  var hintSujeito = document.getElementById('hintSujeito');
  var productEmphasisField = document.getElementById('productEmphasisField');
  var lblEmphasis = document.getElementById('lblEmphasis');
  var emphasisChips = document.querySelectorAll('.emphasis-chip');
  var emphasisGroups = document.querySelectorAll('.emphasis-group');
  var productBgField = document.getElementById('productBgField');
  var productMetaField = document.getElementById('productMetaField');
  var btnCopyMeta = document.getElementById('btnCopyMeta');
  var metaPreview = document.getElementById('metaPreview');
  var acaoField = document.getElementById('acaoField');
  var lblAcaoMain = document.getElementById('lblAcaoMain');
  var hintAcaoInline = document.getElementById('hintAcaoInline');
  var subhintAcao = document.getElementById('subhintAcao');

  // Prompt-base p/ colar no ChatGPT (junto com a foto) e obter a descrição fiel da marca/rótulo.
  function buildMetaPrompt(){
    var typed = (fSujeito.value || '').trim();
    var produtoLinha = typed ? typed : '[descreva aqui o produto/marca ou apenas anexe a foto]';
    return [
      'Você é um especialista em descrição visual de produtos para geração de imagem por IA.',
      'Vou te enviar a FOTO (e/ou o nome) de um produto de marca específica. Devolva UMA descrição visual fiel e objetiva do produto, pronta para colar como "sujeito" de um gerador de imagem.',
      '',
      'Regras:',
      '1. Descreva SOMENTE o que é visível/verificável na imagem. Não invente marca, texto, cor, logo, selo ou detalhe — se não tiver certeza, OMITA. Nunca chute.',
      '2. Transcreva o texto do rótulo/embalagem EXATAMENTE como aparece (marca, nome do produto, sabor/variação, volume/gramatura), entre aspas.',
      '3. Cores: descreva as cores reais do rótulo, da tampa e da embalagem, com especificidade (ex.: "rótulo laranja, tampa preta fosca").',
      '4. Material e formato: tipo (garrafa, pote, caixa, sachê, frasco, lata), material (plástico, vidro, alumínio, papelão) e acabamento (fosco, brilhante, transparente, metálico).',
      '5. Logo/identidade: descreva o logo fielmente e onde ele aparece na embalagem.',
      '6. SAÍDA: uma única frase corrida em português, separada por vírgulas, começando por "[tipo do produto] da marca [marca], ...". Sem cenário, iluminação, fundo, câmera ou clima (isso é tratado em outro lugar). Sem marcadores, sem títulos, só a frase.',
      '7. Mantenha tudo limpo e íntegro (produto novo), a menos que a foto mostre o contrário.',
      '',
      'Produto: ' + produtoLinha
    ].join('\n');
  }
  function refreshMeta(){
    if(activePersona === 'produto'){ metaPreview.textContent = buildMetaPrompt(); }
  }

  var characterPresetChips = document.querySelectorAll('.character-preset');
  var characterDetailChips = document.querySelectorAll('.character-detail');

  function clearCharacterPresetState(){
    characterPresetChips.forEach(function(chip){ chip.classList.remove('active'); });
  }
  function applyCharacterPreset(key){
    var preset = CHARACTER_SHEET_PRESETS[key];
    if(!preset) return;
    Object.keys(characterFields).forEach(function(group){
      characterFields[group].value = preset[group];
    });
    characterDetailChips.forEach(function(chip){ chip.classList.remove('active'); });
    characterPresetChips.forEach(function(chip){
      chip.classList.toggle('active', chip.getAttribute('data-character-preset') === key);
    });
  }
  characterPresetChips.forEach(function(chip){
    chip.addEventListener('click', function(){
      applyCharacterPreset(chip.getAttribute('data-character-preset'));
    });
  });
  characterDetailChips.forEach(function(chip){
    chip.addEventListener('click', function(){ chip.classList.toggle('active'); });
  });
  Object.keys(characterFields).forEach(function(group){
    characterFields[group].addEventListener('change', clearCharacterPresetState);
  });
  applyCharacterPreset('adult_man');

  function showEmphasisGroup(name){
    emphasisGroups.forEach(function(g){ g.classList.toggle('hidden', g.getAttribute('data-group') !== name); });
  }
  function updateBackgroundWorkflowNote(){
    var taskButton = document.querySelector('[data-bg-control="task"].is-active');
    var isSceneOnly = taskButton && taskButton.getAttribute('data-bg-value') === 'scene_only';
    backgroundWorkflowNote.textContent = isSceneOnly
      ? 'Gere um set vazio, sem produto ou objeto inventado. O prompt reserva uma zona limpa para inserir depois o render 3D, packshot ou fotografia original.'
      : 'Anexe a imagem original junto com o prompt. O fundo branco será removido; o produto deverá permanecer visualmente idêntico, incluindo bordas, detalhes impressos e transparências.';
  }
  backgroundControlButtons.forEach(function(button){
    button.addEventListener('click', function(){
      var control = button.getAttribute('data-bg-control');
      var isMulti = button.getAttribute('data-bg-multi') === 'true';
      if(isMulti){
        button.classList.toggle('is-active');
      } else {
        document.querySelectorAll('[data-bg-control="' + control + '"]').forEach(function(item){ item.classList.remove('is-active'); });
        button.classList.add('is-active');
      }
      document.querySelectorAll('[data-bg-control="' + control + '"]').forEach(function(item){
        item.setAttribute('aria-pressed', item.classList.contains('is-active') ? 'true' : 'false');
      });
      if(control === 'task') updateBackgroundWorkflowNote();
      invalidateGeneratedPrompt();
    });
  });
  [bgProductType,bgEnvironmentStyle,bgSceneIdea,bgSurface,bgComposition,bgDepth,bgLighting,bgPalette].forEach(function(field){
    field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', invalidateGeneratedPrompt);
  });
  updateBackgroundWorkflowNote();

  function applyAnglePreset(key){
    var preset = ANGLE_VARIATION_PRESETS[key];
    if(!preset) return;
    angleOrbit.value = preset.orbit;
    angleElevation.value = preset.elevation;
    angleDistance.value = preset.distance;
    angleLens.value = preset.lens;
    angleFraming.value = preset.framing;
    anglePresetButtons.forEach(function(button){
      var on = button.getAttribute('data-angle-preset') === key;
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    invalidateGeneratedPrompt();
  }
  anglePresetButtons.forEach(function(button){
    button.addEventListener('click', function(){ applyAnglePreset(button.getAttribute('data-angle-preset')); });
  });
  if(angleReferenceGrid && angleScrollPrev && angleScrollNext){
    var angleDrag = { active:false, startX:0, startScroll:0, moved:false };
    var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    function updateAngleScrollButtons(){
      var maxScroll = Math.max(0, angleReferenceGrid.scrollWidth - angleReferenceGrid.clientWidth);
      angleScrollPrev.disabled = angleReferenceGrid.scrollLeft <= 2;
      angleScrollNext.disabled = angleReferenceGrid.scrollLeft >= maxScroll - 2;
    }
    refreshAngleReferenceControls = updateAngleScrollButtons;
    function scrollAngleReferences(direction){
      angleReferenceGrid.scrollBy({
        left:direction * Math.max(220, angleReferenceGrid.clientWidth * .72),
        behavior:reducedMotionQuery.matches ? 'auto' : 'smooth'
      });
    }
    angleScrollPrev.addEventListener('click', function(){ scrollAngleReferences(-1); });
    angleScrollNext.addEventListener('click', function(){ scrollAngleReferences(1); });
    angleReferenceGrid.addEventListener('scroll', updateAngleScrollButtons, { passive:true });
    angleReferenceGrid.addEventListener('wheel', function(event){
      if(Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      var maxScroll = angleReferenceGrid.scrollWidth - angleReferenceGrid.clientWidth;
      var next = Math.max(0, Math.min(maxScroll, angleReferenceGrid.scrollLeft + event.deltaY));
      if(next !== angleReferenceGrid.scrollLeft){
        event.preventDefault();
        angleReferenceGrid.scrollLeft = next;
      }
    }, { passive:false });
    angleReferenceGrid.addEventListener('keydown', function(event){
      if(event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      scrollAngleReferences(event.key === 'ArrowLeft' ? -1 : 1);
    });
    angleReferenceGrid.addEventListener('pointerdown', function(event){
      if(event.pointerType === 'touch' || event.button !== 0) return;
      angleDrag.active = true;
      angleDrag.startX = event.clientX;
      angleDrag.startScroll = angleReferenceGrid.scrollLeft;
      angleDrag.moved = false;
    });
    angleReferenceGrid.addEventListener('pointermove', function(event){
      if(!angleDrag.active) return;
      var distance = event.clientX - angleDrag.startX;
      if(Math.abs(distance) > 5){
        angleDrag.moved = true;
        angleReferenceGrid.classList.add('is-dragging');
        if(!angleReferenceGrid.hasPointerCapture(event.pointerId)){
          angleReferenceGrid.setPointerCapture(event.pointerId);
        }
      }
      angleReferenceGrid.scrollLeft = angleDrag.startScroll - distance;
    });
    function endAngleDrag(event){
      if(!angleDrag.active) return;
      angleDrag.active = false;
      if(angleReferenceGrid.hasPointerCapture(event.pointerId)) angleReferenceGrid.releasePointerCapture(event.pointerId);
      angleReferenceGrid.classList.remove('is-dragging');
      window.setTimeout(function(){ angleDrag.moved = false; }, 0);
    }
    angleReferenceGrid.addEventListener('pointerup', endAngleDrag);
    angleReferenceGrid.addEventListener('pointercancel', endAngleDrag);
    angleReferenceGrid.addEventListener('click', function(event){
      if(angleDrag.moved){
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
    angleReferenceGrid.querySelectorAll('img').forEach(function(image){
      if(!image.complete) image.addEventListener('load', updateAngleScrollButtons, { once:true });
    });
    window.addEventListener('resize', updateAngleScrollButtons, { passive:true });
    updateAngleScrollButtons();
    window.requestAnimationFrame(updateAngleScrollButtons);
    window.setTimeout(updateAngleScrollButtons, 400);
  }
  [angleSubjectType,angleOrbit,angleElevation,angleDistance,angleLens,angleFraming].forEach(function(field){
    field.addEventListener('change', function(){
      anglePresetButtons.forEach(function(button){
        button.classList.remove('is-active');
        button.setAttribute('aria-pressed', 'false');
      });
      invalidateGeneratedPrompt();
    });
  });
  angleNote.addEventListener('input', invalidateGeneratedPrompt);

  function resetCreativeUI(){
    productEmphasisField.classList.add('hidden');
    productBgField.classList.add('hidden');
    productMetaField.classList.add('hidden');
    acaoField.classList.remove('hidden');
    characterSheetPanel.classList.add('hidden');
    characterSheetPanel.setAttribute('aria-hidden', 'true');
    angleVariationPanel.classList.add('hidden');
    angleVariationPanel.setAttribute('aria-hidden', 'true');
    backgroundScenePanel.classList.add('hidden');
    backgroundScenePanel.setAttribute('aria-hidden', 'true');
    standardSceneFields.classList.remove('hidden');
    emphasisChips.forEach(function(e){ e.classList.remove('active'); });
  }

  function activatePersonaChip(chip){
      var key = chip.getAttribute('data-persona');
      activePersona = key;
      fSujeito.value = key ? (PERSONAS[key] || '') : '';
      fConceito.placeholder = CREATIVE_CONCEPT_PLACEHOLDERS[key] || CREATIVE_CONCEPT_PLACEHOLDERS.base;
      if(PERSONA_TREATMENT_DEFAULTS[key]){
        setCreativeTreatment(PERSONA_TREATMENT_DEFAULTS[key], true);
      }
      personaChips.forEach(function(c){
        var selected = c === chip && !!key;
        c.classList.toggle('active', selected);
        c.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });
      resetCreativeUI();
      if(key === 'character_sheet'){
        mode = 'img';
        characterSheetPanel.classList.remove('hidden');
        characterSheetPanel.setAttribute('aria-hidden', 'false');
        standardSceneFields.classList.add('hidden');
        fAspect.value = '16:9';
        if(fResolucao.value === '1k') fResolucao.value = '2k';
      } else if(key === 'angle_variation'){
        mode = 'img';
        angleVariationPanel.classList.remove('hidden');
        angleVariationPanel.setAttribute('aria-hidden', 'false');
        standardSceneFields.classList.add('hidden');
        fAspect.value = '4:5';
        if(fResolucao.value === '1k') fResolucao.value = '2k';
        window.requestAnimationFrame(refreshAngleReferenceControls);
        window.setTimeout(refreshAngleReferenceControls, 120);
      } else if(key === 'background_scene'){
        mode = 'img';
        backgroundScenePanel.classList.remove('hidden');
        backgroundScenePanel.setAttribute('aria-hidden', 'false');
        standardSceneFields.classList.add('hidden');
        fAspect.value = '4:5';
        if(fResolucao.value === '1k') fResolucao.value = '2k';
      } else if(key === 'produto'){
        lblSujeito.textContent = 'Produto';
        hintSujeito.textContent = 'descreva nome, marca, forma, material, acabamento, cor e detalhes visíveis';
        fSujeito.placeholder = 'ex: frasco de perfume em vidro fumê, tampa metálica, rótulo minimalista';
        lblEmphasis.firstChild.textContent = 'Ênfase do produto ';
        showEmphasisGroup('produto');
        productEmphasisField.classList.remove('hidden');
        productBgField.classList.remove('hidden');
        productMetaField.classList.remove('hidden');
        acaoField.classList.add('hidden');
        refreshMeta();
      } else {
        lblSujeito.textContent = 'Sujeito / Personagem';
        hintSujeito.textContent = 'seja específico — idade, tipo, traços';
        fSujeito.placeholder = 'ex: modelo brasileira de 30 anos, cabelo curto, alfaiataria minimalista';
        lblAcaoMain.textContent = 'Ação';
        hintAcaoInline.textContent = '— o que está fazendo';
        fAcao.placeholder = 'ex: caminhando lentamente, tecido acompanhando o movimento';
        subhintAcao.textContent = 'a ação precisa caber no plano escolhido (um close não mostra o corpo inteiro)';
      }
      currentState = null;
      variation = 0;
      clearCampaignOutput();
      clearRecipeOutput();
      btnVariacao.disabled = true;
      btnVariarTudo.disabled = true;
      renderEmptyPrompt();
      charCounter.textContent = '0 / ' + (key === 'character_sheet' ? CHARACTER_SHEET_MAX_LEN : (key === 'angle_variation' ? 3400 : (key === 'background_scene' ? 3200 : MAX_LEN)));
      charCounter.classList.remove('over');
      settingsReminder.textContent = '';
      applyMode();
  }
  if(personaChipGroup){
    personaChipGroup.addEventListener('click', function(event){
      var chip = event.target.closest('.persona-chip[data-persona]');
      if(!chip || !personaChipGroup.contains(chip)) return;
      var scrollX = window.scrollX;
      var scrollY = window.scrollY;
      activatePersonaChip(chip);
      var preserveUntil = performance.now() + 180;
      function preservePresetPosition(){
        window.scrollTo({ left:scrollX, top:scrollY, behavior:'auto' });
        if(performance.now() < preserveUntil){
          window.requestAnimationFrame(preservePresetPosition);
        }
      }
      preservePresetPosition();
    });
  }

  // Fundo do produto (single-select).
  var productBg = 'studio';
  var productBgChips = document.querySelectorAll('#productBgChips .persona-chip');
  productBgChips.forEach(function(chip){
    chip.addEventListener('click', function(){
      productBg = chip.getAttribute('data-bg');
      productBgChips.forEach(function(c){ c.classList.toggle('active', c === chip); });
    });
  });

  emphasisChips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chip.classList.toggle('active');
    });
  });

  // Prompt-base p/ ChatGPT: copia (com o que já foi digitado no Sujeito) e mantém o preview vivo.
  btnCopyMeta.addEventListener('click', function(){
    copyText(buildMetaPrompt(), btnCopyMeta, 'Copiar prompt p/ descrever no ChatGPT');
  });
  fSujeito.addEventListener('input', refreshMeta);

  fLente.addEventListener('change', function(){
    var lens = LENSES[fLente.value];
    cameraEcho.textContent = lens ? ('Câmera definida automaticamente: ' + lens.cameraLabel + ' (ISO ' + lens.iso + ')') : '';
  });

  fIluminacao.addEventListener('change', function(){
    var light = LIGHTING[fIluminacao.value];
    if(light && light.defaultStock){
      fFilme.value = light.defaultStock;
      filmeAutoNote.textContent = 'sugerido pela iluminação escolhida — você pode trocar';
    }
  });

  var currentState = null;
  var variation = 0;

  function buildSubject(){
    var base = fSujeito.value;
    var active = document.querySelectorAll('.emphasis-chip.active');
    if(active.length === 0) return base;
    var extras = Array.prototype.map.call(active, function(c){ return c.getAttribute('data-emphasis'); });
    return base + (base ? ', ' : '') + extras.join(', ');
  }

  function readCharacterState(){
    var skinDetails = Array.prototype.map.call(
      document.querySelectorAll('.character-detail.active'),
      function(chip){ return chip.getAttribute('data-character-detail'); }
    );
    return {
      presentation: characterFields.presentation.value,
      age: characterFields.age.value,
      ethnicity: characterFields.ethnicity.value,
      skinTone: characterFields.skinTone.value,
      hairColor: characterFields.hairColor.value,
      hairStyle: characterFields.hairStyle.value,
      eyeColor: characterFields.eyeColor.value,
      bodyType: characterFields.bodyType.value,
      facialHair: characterFields.facialHair.value,
      wardrobe: characterFields.wardrobe.value,
      skinDetails: skinDetails
    };
  }

  function readBackgroundSceneState(){
    var taskButton = document.querySelector('[data-bg-control="task"].is-active');
    var integrations = Array.prototype.map.call(
      document.querySelectorAll('[data-bg-control="integration"].is-active'),
      function(button){ return button.getAttribute('data-bg-value'); }
    );
    return {
      task: taskButton ? taskButton.getAttribute('data-bg-value') : 'composite',
      productType: bgProductType.value,
      environmentStyle: bgEnvironmentStyle.value,
      idea: bgSceneIdea.value,
      surface: bgSurface.value,
      composition: bgComposition.value,
      depth: bgDepth.value,
      lighting: bgLighting.value,
      palette: bgPalette.value,
      integrations: integrations
    };
  }

  function readAngleVariationState(){
    return {
      subjectType:angleSubjectType.value,
      orbit:angleOrbit.value,
      elevation:angleElevation.value,
      distance:angleDistance.value,
      lens:angleLens.value,
      framing:angleFraming.value,
      note:angleNote.value
    };
  }

  function readState(){
    var isProduct = (activePersona === 'produto');
    var isCharacterSheet = (activePersona === 'character_sheet');
    var isAngleVariation = (activePersona === 'angle_variation');
    var isBackgroundScene = (activePersona === 'background_scene');
    return {
      mode: mode,
      isProduct: isProduct,
      isCharacterSheet: isCharacterSheet,
      isAngleVariation: isAngleVariation,
      isBackgroundScene: isBackgroundScene,
      character: isCharacterSheet ? readCharacterState() : null,
      angleVariation: isAngleVariation ? readAngleVariationState() : null,
      backgroundScene: isBackgroundScene ? readBackgroundSceneState() : null,
      productBg: productBg,
      subject: buildSubject(),
      concept: fConceito.value,
      palette: fPalette.value,
      materials: fMaterials.value,
      treatmentId: activeTreatment,
      intensityId: activeIntensity,
      environment: fAmbiente.value,
      action: isProduct ? '' : fAcao.value,   // produto é estático — sem ação
      mood: fClima.value,
      shotId: fPlano.value,
      lensId: fLente.value,
      lightId: fIluminacao.value,
      stockId: fFilme.value,
      aspectRatio: fAspect.value,
      resolution: fResolucao.value,
      modelId: fModelo.value,
      motionId: fMovimento.value,
      duration: fDuracao.value
    };
  }

  function renderResult(state, varSeed){
    var result = state.isCharacterSheet
      ? buildCharacterSheetPrompt(state, varSeed)
      : (state.isAngleVariation
        ? buildAngleVariationPrompt(state, varSeed)
        : (state.isBackgroundScene
          ? buildBackgroundScenePrompt(state, varSeed)
          : ((state.mode === 'video') ? buildVideoPrompt(state, varSeed) : buildPrompt(state, varSeed))));
    var maxLength = result.maxLength || MAX_LEN;
    promptOut.textContent = result.text;
    charCounter.textContent = result.length + ' / ' + maxLength;
    if(result.length > maxLength){ charCounter.classList.add('over'); }
    else { charCounter.classList.remove('over'); }
    if(state.isCharacterSheet){
      renderSettingsReminder([
        'No ', {strong:'Nano Banana Pro'}, ', use este prompt sem imagem de referência. Configure: proporção ',
        {strong:'16:9'}, ' · resolução ', {strong:state.resolution}, '.'
      ]);
    } else if(state.isAngleVariation){
      renderSettingsReminder([
        'Anexe a imagem original junto com este prompt. Gere uma vista por vez em proporção ', {strong:state.aspectRatio},
        ' · resolução ', {strong:state.resolution}, '. Use novamente a referência original na próxima órbita.'
      ]);
    } else if(state.isBackgroundScene){
      var sceneOnly = state.backgroundScene && state.backgroundScene.task === 'scene_only';
      renderSettingsReminder(sceneOnly
        ? ['Gere o cenário vazio em proporção ', {strong:state.aspectRatio}, ' · resolução ', {strong:state.resolution}, '. Não anexe a foto do produto neste fluxo.']
        : ['Anexe a imagem original junto com este prompt. Configure: proporção ', {strong:state.aspectRatio}, ' · resolução ', {strong:state.resolution}, '.']);
    } else if(state.mode === 'video'){
      var videoReminder = [
        'Em ', {strong:(result.modelLabel || 'seu modelo de vídeo')}, ', configure: duração ',
        {strong:state.duration}, ' · proporção ', {strong:state.aspectRatio}
      ];
      if(result.withSound){
        videoReminder.push(' · áudio ', {strong:'ativado'}, ' (som ambiente, sem música)');
      } else {
        videoReminder.push(' · ', {strong:'sem áudio'});
      }
      videoReminder.push('.');
      renderSettingsReminder(videoReminder);
    } else {
      renderSettingsReminder([
        'Na sua plataforma de imagem, configure: proporção ', {strong:state.aspectRatio},
        ' · resolução ', {strong:state.resolution}, '.'
      ]);
    }
    btnVariacao.disabled = false;
    btnVariarTudo.disabled = state.isCharacterSheet || state.isAngleVariation || state.isBackgroundScene;
    return result;
  }

  // Sorteia uma <option> com value real (ignora placeholders desabilitados e optgroups).
  function randomizeSelect(sel){
    var opts = Array.prototype.filter.call(sel.options, function(o){ return o.value && !o.disabled; });
    if(!opts.length) return;
    if(opts.length > 1){
      opts = opts.filter(function(o){ return o.value !== sel.value; });
    }
    var choice = opts[Math.floor(Math.random() * opts.length)];
    sel.value = choice.value;
    sel.dispatchEvent(new Event('change'));
  }

  function pulseTechnicalFields(fields){
    fields.forEach(function(field){
      var wrap = field.closest('.field');
      if(!wrap) return;
      wrap.classList.remove('is-varied');
      void wrap.offsetWidth;
      wrap.classList.add('is-varied');
      window.setTimeout(function(){ wrap.classList.remove('is-varied'); }, 460);
    });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    currentState = readState();
    variation = 0;
    var result = renderResult(currentState, variation);
    renderCampaignSet(currentState);
    renderRecipe(currentState);
    addHistoryEntry(currentState, result.text);
    setOutputView('prompt');
  });

  btnVariacao.addEventListener('click', function(){
    if(!currentState) return;
    variation++;
    renderResult(currentState, variation);
    renderCampaignSet(currentState);
    renderRecipe(currentState);
  });

  // A ação explícita varia toda a técnica. As travas continuam controlando o Campaign Set.
  btnVariarTudo.addEventListener('click', function(){
    if(!currentState) return;
    if(currentState.isCharacterSheet || currentState.isAngleVariation || currentState.isBackgroundScene) return;
    randomizeSelect(fPlano);
    randomizeSelect(fLente);
    randomizeSelect(fIluminacao);
    randomizeSelect(fFilme);
    if(!dnaLocks.direction){
      var treatmentKeys = Object.keys(CREATIVE_TREATMENTS);
      var intensityKeys = Object.keys(CREATIVE_INTENSITIES);
      setCreativeTreatment(treatmentKeys[Math.floor(Math.random() * treatmentKeys.length)], true);
      setCreativeIntensity(intensityKeys[Math.floor(Math.random() * intensityKeys.length)], true);
    }
    if(mode === 'video'){ randomizeSelect(fMovimento); }
    pulseTechnicalFields([fPlano,fLente,fIluminacao,fFilme]);
    currentState = readState();
    variation++;
    renderResult(currentState, variation);
    renderCampaignSet(currentState);
    renderRecipe(currentState);
    studioNoteTitle.textContent = 'Técnica atualizada.';
    studioNoteText.textContent = 'Plano, lente, iluminação e filme foram variados e os campos agora mostram exatamente a receita usada no novo prompt.';
  });

  function fallbackCopy(text){
    var sx = window.scrollX, sy = window.scrollY;   // preserva o scroll (evita pulo pro topo)
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.width = '1px';
    ta.style.height = '1px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    try { ta.focus({ preventScroll: true }); } catch(e){ ta.focus(); }
    ta.select();
    try { document.execCommand('copy'); } catch(err){}
    document.body.removeChild(ta);
    window.scrollTo(sx, sy);
  }

  function flashCopied(btn, original){
    btn.textContent = 'Copiado!';
    setTimeout(function(){ btn.textContent = original; }, 1400);
  }

  function copyText(text, btn, original){
    if(!text) return;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){
        flashCopied(btn, original);
      }).catch(function(){
        fallbackCopy(text);
        flashCopied(btn, original);
      });
    } else {
      fallbackCopy(text);
      flashCopied(btn, original);
    }
  }

  btnCopyPrompt.addEventListener('click', function(){
    copyText(promptOut.textContent, btnCopyPrompt, 'Copiar prompt');
  });
})();
/* === UI END === */

/* === APP ENTRY START === */
(function(){
  var body = document.body;
  var entry = document.getElementById('appEntry');
  var startBtn = document.getElementById('startAppButton');
  var entryBackgroundVideo = document.getElementById('entryBackgroundVideo');
  var heroMarkVideo = document.getElementById('heroMarkVideo');
  var quickMarkVideo = document.getElementById('quickMarkVideo');
  var lowPower = !!window.promptStudioLowPower;
  var opened = false;
  if(!body || !entry || !startBtn) return;

  function playVideo(video){
    if(!video) return;
    video.muted = true;
    video.playsInline = true;
    var playResult = video.play();
    if(playResult && typeof playResult.catch === 'function'){
      playResult.catch(function(){});
    }
  }

  function configureEntryVideo(){
    if(!entryBackgroundVideo) return;
    var highSource = entryBackgroundVideo.getAttribute('data-src-high');
    var lowSource = entryBackgroundVideo.getAttribute('data-src-low');
    var selectedSource = lowPower ? lowSource : highSource;
    if(!selectedSource) return;
    entryBackgroundVideo.src = selectedSource;
    entryBackgroundVideo.load();
    if(!lowPower && lowSource){
      entryBackgroundVideo.addEventListener('error', function(){
        if(entryBackgroundVideo.getAttribute('src') === lowSource) return;
        entryBackgroundVideo.src = lowSource;
        entryBackgroundVideo.load();
        playVideo(entryBackgroundVideo);
      }, { once:true });
    }
  }

  configureEntryVideo();
  [entryBackgroundVideo].forEach(playVideo);
  [heroMarkVideo, quickMarkVideo].forEach(function(video){ if(video) video.pause(); });

  function openApp(){
    if(opened) return;
    opened = true;
    body.classList.remove('prelaunch');
    body.classList.add('app-ready');
    body.style.overflow = '';
    body.style.overflowY = '';
    document.documentElement.style.overflowY = 'auto';
    entry.setAttribute('aria-hidden', 'true');
    window.scrollTo({ top:0, behavior:'auto' });
    if(!lowPower){
      window.requestAnimationFrame(function(){
        [heroMarkVideo, quickMarkVideo].forEach(playVideo);
      });
    }
    window.setTimeout(function(){
      [entryBackgroundVideo].forEach(function(video){
        if(video) video.pause();
      });
      entry.style.display = 'none';
      window.dispatchEvent(new Event('promptstudio:ready'));
    }, 560);
  }

  startBtn.addEventListener('click', openApp);
  startBtn.addEventListener('touchend', function(e){
    e.preventDefault();
    openApp();
  }, { passive:false });
})();
/* === APP ENTRY END === */

/* === UI MOTION V2 START === */
(function(){
  var root = document.documentElement;
  var lowPower = !!window.promptStudioLowPower;
  var amb = document.querySelector('.amb');
  var liquidCanvas = document.getElementById('liquidCanvas');
  var heroStage = document.querySelector('.hero-stage');
  var floatWrap = document.getElementById('quickFloat');
  var floatToggle = document.getElementById('quickFloatToggle');
  var floatHandle = document.getElementById('quickFloatHandle');
  var quickTabs = document.querySelectorAll('.quick-float__tab');
  var quickPanels = document.querySelectorAll('.quick-float__panel');
  // Reveal content-sized sections instead of the two giant form wrappers.
  // Large wrappers intersect on app launch and make the scroll effect disappear.
  var revealTargets = document.querySelectorAll([
    '.hero-stage',
    '.inspiration-lab',
    '.persona-row',
    '.character-sheet-panel',
    '.angle-lab-panel',
    '.background-scene-panel',
    '.creative-brief',
    '.visual-dna-panel',
    '#standardSceneFields > .grid2',
    '#standardSceneFields > .field',
    '.stage-card-tech > .grid2',
    '.studio-note',
    '.stage-card-output',
    '.guide-sec',
    '.guide-card',
    '.fill-card',
    '.scene-card',
    '.term-cat'
  ].join(','));
  var floatStateKey = 'promptStudio.quickFloat';

  revealTargets.forEach(function(el){ el.classList.add('scroll-reveal'); });

  function updateScrollFx(){
    var y = window.scrollY || window.pageYOffset || 0;
    root.style.setProperty('--scroll-shift', Math.min(y * 0.08, 48) + 'px');
    root.style.setProperty('--hero-shift', Math.min(y * 0.035, 18) + 'px');
    root.style.setProperty('--scroll-glow', Math.min(y * 0.06, 42) + 'px');
    if(heroStage && !lowPower){
      heroStage.style.filter = 'saturate(' + (1 + Math.min(y * 0.00045, 0.08)) + ')';
    }
  }

  var scrollFrame = 0;
  function requestScrollFx(){
    if(scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(function(){
      scrollFrame = 0;
      updateScrollFx();
    });
  }

  var revealStarted = false;
  function startRevealObserver(){
    if(revealStarted) return;
    revealStarted = true;
    if('IntersectionObserver' in window){
      var observer = new IntersectionObserver(function(entries){
        var incoming = entries.filter(function(entry){ return entry.isIntersecting; });
        incoming.sort(function(a,b){ return a.boundingClientRect.top - b.boundingClientRect.top; });
        incoming.forEach(function(entry,index){
          entry.target.style.setProperty('--reveal-delay', Math.min(index * 55, 165) + 'ms');
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        });
      }, { threshold:0.08, rootMargin:'0px 0px -10% 0px' });

      revealTargets.forEach(function(el){ observer.observe(el); });
    } else {
      revealTargets.forEach(function(el){ el.classList.add('in-view'); });
    }
  }

  if(document.body.classList.contains('app-ready')){
    startRevealObserver();
  } else {
    window.addEventListener('promptstudio:ready', startRevealObserver, { once:true });
  }

  updateScrollFx();
  window.addEventListener('scroll', requestScrollFx, { passive:true });

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion && amb && liquidCanvas && !document.querySelector('.site-background-video')){
    var ctx = liquidCanvas.getContext('2d');
    var blobs = [
      { color:'rgba(100, 49, 159, 0.30)', x:0.18, y:0.24, rx:0.32, ry:0.26, sx:0.84, sy:0.61, phase:0.2 },
      { color:'rgba(142, 99, 200, 0.24)', x:0.68, y:0.28, rx:0.30, ry:0.22, sx:0.73, sy:0.58, phase:1.1 },
      { color:'rgba(200, 164, 255, 0.12)', x:0.46, y:0.58, rx:0.36, ry:0.24, sx:0.62, sy:0.71, phase:2.2 },
      { color:'rgba(20, 8, 34, 0.88)', x:0.78, y:0.72, rx:0.28, ry:0.20, sx:0.76, sy:0.54, phase:3.0 },
      { color:'rgba(92, 63, 140, 0.16)', x:0.26, y:0.76, rx:0.26, ry:0.18, sx:0.66, sy:0.49, phase:4.1 },
      { color:'rgba(126, 84, 186, 0.16)', x:0.50, y:0.46, rx:0.22, ry:0.18, sx:0.57, sy:0.68, phase:5.2 },
      { color:'rgba(214, 194, 245, 0.08)', x:0.84, y:0.16, rx:0.18, ry:0.14, sx:0.91, sy:0.74, phase:1.8 }
    ];
    var lastLiquidFrame = 0;

    function resizeLiquid(){
      var dpr = lowPower ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      liquidCanvas.width = Math.floor(window.innerWidth * dpr);
      liquidCanvas.height = Math.floor(window.innerHeight * dpr);
      liquidCanvas.style.width = window.innerWidth + 'px';
      liquidCanvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawBlob(blob, t){
      var cx = window.innerWidth * (blob.x + Math.sin(t * blob.sx + blob.phase) * 0.08);
      var cy = window.innerHeight * (blob.y + Math.cos(t * blob.sy + blob.phase) * 0.07);
      var rx = window.innerWidth * blob.rx * (1 + Math.sin(t * 0.43 + blob.phase) * 0.10);
      var ry = window.innerHeight * blob.ry * (1 + Math.cos(t * 0.36 + blob.phase) * 0.12);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.sin(t * 0.18 + blob.phase) * 0.9);
      var grad = ctx.createRadialGradient(-rx * 0.18, -ry * 0.12, rx * 0.10, 0, 0, Math.max(rx, ry));
      grad.addColorStop(0, blob.color);
      grad.addColorStop(0.38, blob.color.replace(/0\.\d+\)/, '0.32)'));
      grad.addColorStop(0.58, 'rgba(122, 76, 182, 0.16)');
      grad.addColorStop(0.78, 'rgba(53, 24, 88, 0.10)');
      grad.addColorStop(1, 'rgba(18, 8, 29, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawVeins(t){
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.strokeStyle = 'rgba(210, 191, 243, 0.08)';
      ctx.lineWidth = 1;
      var veinCount = lowPower ? 6 : 11;
      var veinStep = lowPower ? 24 : 14;
      for(var i = 0; i < veinCount; i++){
        var yBase = window.innerHeight * (0.12 + i * 0.11);
        ctx.beginPath();
        for(var x = -40; x <= window.innerWidth + 40; x += veinStep){
          var y = yBase + Math.sin((x * 0.008) + (t * 1.7) + i) * 18 + Math.cos((x * 0.006) - (t * 1.12) + i) * 12;
          if(x === -40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    function animateLiquid(now){
      if(lowPower && now - lastLiquidFrame < 34){
        window.requestAnimationFrame(animateLiquid);
        return;
      }
      lastLiquidFrame = now;
      var t = now * 0.00042;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      var bg = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      bg.addColorStop(0, '#12081d');
      bg.addColorStop(0.45, '#1a0f29');
      bg.addColorStop(1, '#0f0718');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.globalCompositeOperation = 'lighter';
      blobs.forEach(function(blob){ drawBlob(blob, t); });
      ctx.globalCompositeOperation = 'source-over';

      drawVeins(t);

      var vignette = ctx.createRadialGradient(window.innerWidth * 0.5, window.innerHeight * 0.48, window.innerWidth * 0.08, window.innerWidth * 0.5, window.innerHeight * 0.5, window.innerWidth * 0.78);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.48)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      window.requestAnimationFrame(animateLiquid);
    }

    resizeLiquid();
    window.addEventListener('resize', resizeLiquid);
    window.requestAnimationFrame(animateLiquid);
  }

  if(!floatWrap || !floatToggle || !floatHandle) return;

  quickTabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      var next = tab.getAttribute('data-quick-tab');
      quickTabs.forEach(function(btn){ btn.classList.toggle('is-active', btn === tab); });
      quickPanels.forEach(function(panel){
        panel.classList.toggle('is-active', panel.getAttribute('data-quick-panel') === next);
      });
    });
  });

  var drag = null;
  var suppressToggleClick = false;
  function saveFloatState(){
    try{
      localStorage.setItem(floatStateKey, JSON.stringify({
        minimized: floatWrap.classList.contains('is-minimized'),
        left: floatWrap.style.left || '',
        top: floatWrap.style.top || '',
        right: floatWrap.style.right || '',
        bottom: floatWrap.style.bottom || ''
      }));
    } catch(_err){}
  }

  function loadFloatState(){
    try{
      return JSON.parse(localStorage.getItem(floatStateKey) || 'null');
    } catch(_err){
      return null;
    }
  }
  function setMinimized(next){
    floatWrap.classList.toggle('is-minimized', next);
    floatToggle.setAttribute('aria-expanded', next ? 'false' : 'true');
    floatToggle.setAttribute('aria-label', next ? 'Abrir guia rápido' : 'Minimizar guia rápido');
    floatToggle.title = (next ? 'Abrir guia rápido' : 'Minimizar guia rápido') + ' · arraste para mover';
    window.requestAnimationFrame(function(){
      constrainToViewport();
      saveFloatState();
    });
  }

  var savedState = loadFloatState();
  // O guia aberto cobre controles do Gerador em telas menores; comece recolhido em toda sessão.
  setMinimized(true);
  if(savedState){
    floatWrap.style.left = savedState.left || '';
    floatWrap.style.top = savedState.top || '';
    floatWrap.style.right = savedState.right || '';
    floatWrap.style.bottom = savedState.bottom || '';
  }

  floatToggle.addEventListener('click', function(e){
    if(suppressToggleClick){
      e.preventDefault();
      return;
    }
    setMinimized(!floatWrap.classList.contains('is-minimized'));
  });

  function applyPosition(x, y){
    var maxX = Math.max(8, window.innerWidth - floatWrap.offsetWidth - 8);
    var maxY = Math.max(8, window.innerHeight - floatWrap.offsetHeight - 8);
    var nextX = Math.min(Math.max(8, x), maxX);
    var nextY = Math.min(Math.max(8, y), maxY);
    floatWrap.style.left = nextX + 'px';
    floatWrap.style.top = nextY + 'px';
    floatWrap.style.right = 'auto';
    floatWrap.style.bottom = 'auto';
  }

  function constrainToViewport(){
    var rect = floatWrap.getBoundingClientRect();
    applyPosition(rect.left, rect.top);
  }

  function startDrag(e){
    if(typeof e.button === 'number' && e.button !== 0) return;
    var rect = floatWrap.getBoundingClientRect();
    drag = {
      pointerId:e.pointerId,
      startX:e.clientX,
      startY:e.clientY,
      offsetX:e.clientX - rect.left,
      offsetY:e.clientY - rect.top,
      moved:false,
      source:e.currentTarget
    };
    floatWrap.classList.add('is-dragging');
    floatHandle.style.cursor = 'grabbing';
    floatToggle.style.cursor = 'grabbing';
    if(e.currentTarget.setPointerCapture){
      try{ e.currentTarget.setPointerCapture(e.pointerId); } catch(_err){}
    }
  }

  function onMove(e){
    if(!drag || e.pointerId !== drag.pointerId) return;
    var distance = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);
    if(distance > 4) drag.moved = true;
    if(!drag.moved) return;
    e.preventDefault();
    applyPosition(e.clientX - drag.offsetX, e.clientY - drag.offsetY);
  }

  function endDrag(e){
    if(!drag || (e && e.pointerId !== drag.pointerId)) return;
    var moved = drag.moved;
    drag = null;
    floatWrap.classList.remove('is-dragging');
    floatHandle.style.cursor = 'grab';
    floatToggle.style.cursor = 'grab';
    if(moved){
      suppressToggleClick = true;
      window.setTimeout(function(){ suppressToggleClick = false; }, 0);
      saveFloatState();
    }
  }

  floatHandle.addEventListener('pointerdown', startDrag);
  floatToggle.addEventListener('pointerdown', startDrag);
  window.addEventListener('pointermove', onMove, { passive:false });
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  window.addEventListener('resize', function(){
    constrainToViewport();
    saveFloatState();
  });
})();
/* === UI MOTION V2 END === */

/* === GUIA: navegação curta por seções em desktop e mobile === */
(function(){
  var guide = document.getElementById('panel-guia');
  if(!guide) return;

  var sections = Array.prototype.filter.call(guide.children, function(child){
    return child.classList && child.classList.contains('guide-sec');
  });
  var groups = [
    { id:'inicio', label:'Início', sections:[0] },
    { id:'preencher', label:'Preencher', sections:[1,2] },
    { id:'direcao', label:'Direção', sections:[3,4] },
    { id:'character', label:'Character', sections:[5] },
    { id:'exemplo', label:'Exemplo', sections:[6] },
    { id:'termos', label:'Termos', sections:[7] },
    { id:'planos', label:'Planos', sections:[8] },
    { id:'lentes', label:'Lentes', sections:[9] },
    { id:'referencia', label:'Referência', sections:[10] },
    { id:'cenario', label:'Cenário', sections:[11] }
  ];
  if(sections.length < 12) return;

  var nav = document.createElement('div');
  nav.className = 'guide-mobile-nav';
  nav.setAttribute('role', 'tablist');
  nav.setAttribute('aria-label', 'Seções do guia');

  groups.forEach(function(group){
    group.sections.forEach(function(index){
      sections[index].classList.add('guide-mobile-section');
      sections[index].setAttribute('data-guide-group', group.id);
    });

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'guide-mobile-chip';
    button.textContent = group.label;
    button.setAttribute('role', 'tab');
    button.setAttribute('data-guide-target', group.id);
    button.setAttribute('aria-selected', 'false');
    nav.appendChild(button);
  });

  guide.insertBefore(nav, sections[0]);

  function activateGuideGroup(id, centerChip){
    sections.forEach(function(section){
      section.classList.toggle('is-mobile-active', section.getAttribute('data-guide-group') === id);
    });
    Array.prototype.forEach.call(nav.children, function(button){
      var active = button.getAttribute('data-guide-target') === id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
      if(active && centerChip){
        var left = button.offsetLeft - ((nav.clientWidth - button.offsetWidth) / 2);
        nav.scrollTo({ left:Math.max(0, left), behavior:'smooth' });
      }
    });
  }

  nav.addEventListener('click', function(event){
    var button = event.target.closest('.guide-mobile-chip');
    if(!button) return;
    activateGuideGroup(button.getAttribute('data-guide-target'), true);
  });

  activateGuideGroup('inicio', false);
})();
/* === GUIA MOBILE END === */

/* === LIQUID GLASS POINTER === */
(function(){
  if(!window.matchMedia || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  document.querySelectorAll('.tab-btn, .guide-mobile-chip').forEach(function(button){
    button.addEventListener('pointermove', function(event){
      var rect = button.getBoundingClientRect();
      var x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      var y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      button.style.setProperty('--glass-x', (x * 100).toFixed(1) + '%');
      button.style.setProperty('--glass-y', (y * 100).toFixed(1) + '%');
      button.style.setProperty('--mag-x', ((x - .5) * 6).toFixed(2) + 'px');
      button.style.setProperty('--mag-y', ((y - .5) * 4).toFixed(2) + 'px');
    });
    button.addEventListener('pointerleave', function(){
      button.style.setProperty('--glass-x', '50%');
      button.style.setProperty('--glass-y', '50%');
      button.style.setProperty('--mag-x', '0px');
      button.style.setProperty('--mag-y', '0px');
    });
  });
})();
/* === LIQUID GLASS POINTER END === */

/* === TABS: troca Gerador / Guia === */
(function(){
  // Só as abas do hero (data-tab) — NÃO o toggle Imagem/Vídeo (data-mode).
  var btns = document.querySelectorAll('.tab-btn[data-tab]');
  var panels = {
    gerador: document.getElementById('panel-gerador'),
    guia: document.getElementById('panel-guia')
  };
  btns.forEach(function(b){
    b.addEventListener('click', function(){
      var t = b.getAttribute('data-tab');
      btns.forEach(function(x){ x.classList.toggle('active', x === b); });
      Object.keys(panels).forEach(function(k){
        if(panels[k]) panels[k].classList.toggle('active', k === t);
      });
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  });
})();

/* === MOTION: símbolo de play 3D (fatias de vidro empilhadas) === */
(function(){
  var host = document.getElementById('play3d');
  if(!host) return;
  var N = 18, depth = 26;
  for(var i = 0; i < N; i++){
    var s = document.createElement('div');
    s.className = (i === 0 || i === N - 1) ? 'slice cap' : 'slice';
    var z = (i / (N - 1) - 0.5) * depth;
    s.style.transform = 'translateZ(' + z.toFixed(2) + 'px)';
    host.appendChild(s);
  }
})();
