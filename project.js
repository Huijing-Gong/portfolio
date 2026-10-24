const all=window.PORTFOLIO,p=all[document.body.dataset.project],view=document.querySelector('#project-view');let cleanup=()=>{},active='',galleryIndex=0;
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
$('#project-meta').textContent=p.facts[0];
function renderResearch(research){
 $('.process-title h2').textContent=research.heading||research.tag||'设计过程';
 $('#process-intro').textContent=research.intro;
 const groups={sippy:[[0],[],[1]],sevendays:[[],[1,2],[0]],reswap:[[0],[1,2,3,4],[]],cookup:[[0],[1,2],[3]],'art-spatial':[[0,1],[2,3],[]],'art-render':[[0],[1,2],[]]};
 const items=research.assets||p.process;const mapping=research.groups||groups[p.id]||[[],[],[]];
 const evidence=(ids,step)=>!ids.length?'':`<div class="process-evidence"><button class="evidence-image" data-evidence-open="${ids[0]}"><img src="${items[ids[0]].src}" alt="${esc(items[ids[0]].title)}" loading="lazy"><span>查看大图 ↗</span></button><div class="evidence-tabs" aria-label="这一阶段的过程图">${ids.map((id,j)=>`<button data-evidence="${id}" aria-pressed="${j===0}">${esc(items[id].title.split(' / ').pop())}</button>`).join('')}</div></div>`;
 $('.process-steps').innerHTML=research.steps.map(([h,t],i)=>`<article id="research-step-${i}" class="process-chapter ${mapping[i]?.length?'has-evidence':''}"><div class="chapter-copy"><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(h)}</h3><p>${esc(t)}</p></div>${evidence(mapping[i]||[],i)}</article>`).join('');
 let jumps=$('.research-jumps');if(!jumps){jumps=document.createElement('nav');jumps.className='research-jumps';jumps.setAttribute('aria-label','设计过程章节');$('.process-steps').before(jumps)}jumps.hidden=!research.sections;jumps.innerHTML=(research.sections||[]).map(([title,index])=>`<a href="#research-step-${index}">${esc(title)} <span>↓</span></a>`).join('');
 const metrics=research.metrics||[];let rail=$('.research-metrics');if(!rail){rail=document.createElement('div');rail.className='research-metrics';$('.process-title').append(rail)}rail.innerHTML=metrics.map(([value,label])=>`<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('');rail.hidden=!metrics.length;

 let iterationHost=$('.iteration-notes');if(!iterationHost){iterationHost=document.createElement('section');iterationHost.className='iteration-notes';$('.process-credit').before(iterationHost)}
 iterationHost.hidden=!research.iterations;iterationHost.innerHTML=research.iterations?`<span class="eyebrow">${esc(research.iterationLabel||'试玩记录')}</span><h3>${esc(research.iterationHeading||'每一轮，具体改了什么？')}</h3>${research.iterations.map(([title,problem,change],i)=>`<details ${i===0?'open':''}><summary>${esc(title)}<span>＋</span></summary><div class="iteration-comparison"><div><h4>发现的问题</h4><p>${esc(problem)}</p></div><div><h4>${esc(research.changeLabel||'我们的调整')}</h4><p>${esc(change)}</p></div></div>${evidence(research.iterationGroups?.[i]||[],i)}</details>`).join('')}`:'';
 $('.process-credit').textContent='';$('.process-credit').hidden=true;
 document.querySelectorAll('[data-evidence]').forEach(button=>button.onclick=()=>{const host=button.closest('.process-evidence'),id=+button.dataset.evidence,a=items[id];host.querySelector('img').src=a.src;host.querySelector('img').alt=a.title;host.querySelector('[data-evidence-open]').dataset.evidenceOpen=id;host.querySelectorAll('[data-evidence]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))});
 document.querySelectorAll('[data-evidence-open]').forEach(button=>button.onclick=()=>{const a=items[+button.dataset.evidenceOpen];enlarge(a.src,a.title)});
}renderResearch(p.research);
const graphicCases={
  "album": {
    "title": "窦唯《梦》· 专辑设计",
    "tag": "让声音，留下形状。",
    "heading": "从一场内心的梦，到一整套视觉语言。",
    "intro": "我将《梦》理解为从自我封闭、内省走向自我救赎的过程。传统器乐与电子效果交织出的幽暗感，成为这套封套、海报与周边设计的出发点。",
    "steps": [
      [
        "把听觉感受转成图像",
        "深蓝与红色贯穿封面和封底；骨骼、人物形象与书法文字并置，把音乐的幽暗感转成强烈的明暗和色彩对比。"
      ],
      [
        "从身体图像里寻找新的构图",
        "在身体与肌理图像中选取局部，放大、重组，再加入文字。三组图像转化分别形成红黑文字海报、橙蓝「梦」字海报和红黑「梦」字海报。"
      ],
      [
        "让同一套图形走出封套",
        "将封面与唱片中心图案延展到织物、折扇、钥匙扣和抱枕。不同物件使用不同尺度的图形，延续专辑的红蓝色彩与装饰语言。"
      ]
    ],
    "assets": [
      {
        "src": "assets/graphic-process/album-front.webp",
        "title": "封面：骨骼与红蓝色彩"
      },
      {
        "src": "assets/graphic-process/album-back.webp",
        "title": "封底：人物形象与曲目"
      },
      {
        "src": "assets/graphic-process/album-source-a.webp",
        "title": "纹理局部与取景范围"
      },
      {
        "src": "assets/graphic-process/album-poster-a.webp",
        "title": "红黑肌理与文字"
      },
      {
        "src": "assets/graphic-process/album-source-b.webp",
        "title": "图像局部与取景范围"
      },
      {
        "src": "assets/graphic-process/album-poster-b.webp",
        "title": "橙蓝叠加与「梦」"
      },
      {
        "src": "assets/graphic-process/album-source-c.webp",
        "title": "身体图像的局部"
      },
      {
        "src": "assets/graphic-process/album-poster-c.webp",
        "title": "红黑构图与「梦」"
      },
      {
        "src": "assets/graphic-process/album-fabric.webp",
        "title": "织物应用"
      },
      {
        "src": "assets/graphic-process/album-fan.webp",
        "title": "折扇应用"
      },
      {
        "src": "assets/graphic-process/album-key.webp",
        "title": "钥匙扣应用"
      },
      {
        "src": "assets/graphic-process/album-pillow.webp",
        "title": "抱枕应用"
      }
    ],
    "groups": [
      [
        0,
        1
      ],
      [
        2,
        3,
        4,
        5,
        6,
        7
      ],
      [
        8,
        9,
        10,
        11
      ]
    ]
  },
  "book": {
    "title": "Mark Making · 手工书",
    "tag": "让身体的痕迹，留在纸上。",
    "heading": "翻开纸页，走进身体的内部。",
    "intro": "我把这本书想象成一次对身体的观看：从皮肤表面的颗粒与纹路，走向细胞、血管，再到支撑身体的骨骼。先让日常材料在纸上留下痕迹，再用 Photoshop 调色、拼接与重组，让抽象印痕慢慢显露出身体的形态。",
    "steps": [
      [
        "皮肤｜让珠链与笔触留下表情",
        "我让蘸墨的珠链在纸上滚动，连续的小颗粒使我想到皮肤上的鸡皮疙瘩；毛笔刷出的纹路，则像皮肤细微的起伏。另一组画面把泼墨产生的红色印迹与刷痕并置，像血迹落在皮肤表面，让平静的纹理有了突然的扰动。"
      ],
      [
        "细胞｜让水和褶皱参与作画",
        "将纸提前揉皱，淋上稀释后的墨水，再用吸管吹动。水沿着纸面的褶皱聚散，形成深浅不一的痕迹。我从这些形状里读到细胞的联想，并通过 Photoshop 调色，让蓝与红的肌理和黑白图形在跨页中相互回应。"
      ],
      [
        "血管｜把线的运动留在纸上",
        "让线蘸上墨水，在纸面反复抽拉与滑动，留下交错、延伸的细线。随后在 Photoshop 中编辑图像，为部分线条加入红色。原本随机的运动痕迹，由此成为我理解血管的方式：细密、分叉，也在画面中持续生长。"
      ],
      [
        "头发与伤痕｜从材料中辨认身体",
        "我用羽毛和从草坪采来的草穗一类的材料划出痕迹，让交错的细线唤起头发的联想；纱布也成为另一种留下肌理的工具。伤痕跨页则在 Photoshop 中由多张图像拼接而成，让不同的纹理共同构成皮肤被缝合、留下印记的感受。"
      ],
      [
        "骨骼｜用 Photoshop 重组身体",
        "一张抽象印痕让我联想到骨盆。我在 Photoshop 中将图像左右对称，选取局部复制，并把部分形态改成红色；珠链滚出的长条印痕，也进入了骨骼的视觉表达。随着对称与重复，零散的痕迹逐渐形成胸腔般的结构，让身体内部的秩序从抽象图形中浮现。"
      ],
      [
        "封皮与书脊｜把阅读变成一次打开",
        "外部包装延续脊柱的意象，银白色布面的褶皱沿书脊聚拢，让身体的主题从图像延伸到触感。翻开这本书，像是打开胸腔，逐步观察不同部位；纸页的遮挡、显露与跨页的疏密，把单张画面连成一次缓慢的观看。"
      ]
    ],
    "assets": [
      {
        "src": "assets/book-making/spread-02.webp",
        "title": "皮肤：珠链滚墨与毛笔刷痕"
      },
      {
        "src": "assets/book-making/spread-03.webp",
        "title": "血迹：泼墨与刷痕的并置"
      },
      {
        "src": "assets/book-making/spread-04.webp",
        "title": "细胞：揉皱纸面与吹墨后的图像"
      },
      {
        "src": "assets/book-making/spread-05.webp",
        "title": "细胞：另一组调色与跨页组合"
      },
      {
        "src": "assets/book-making/spread-06.webp",
        "title": "血管：线的抽拉与红色编辑"
      },
      {
        "src": "assets/book-making/spread-07.webp",
        "title": "血管：不同尺度的分支形态"
      },
      {
        "src": "assets/book-making/spread-08.webp",
        "title": "头发：羽毛与草穗留下的线条"
      },
      {
        "src": "assets/book-making/spread-09.webp",
        "title": "伤痕：多图拼接后的跨页"
      },
      {
        "src": "assets/book-making/spread-13.webp",
        "title": "骨盆：图像对称与局部重组"
      },
      {
        "src": "assets/book-making/spread-14.webp",
        "title": "胸腔：复制、对称与红色变化"
      },
      {
        "src": "assets/book-making/spread-16.webp",
        "title": "骨骼：同一组形态的重新编排"
      },
      {
        "src": "assets/graphic-process/book-22.webp",
        "title": "布面封皮与书脊的褶皱"
      },
      {
        "src": "assets/graphic-process/book-4.webp",
        "title": "封皮、纸页与装订的连接"
      },
      {
        "src": "assets/graphic-process/book-6.webp",
        "title": "翻动中的纸页层次"
      }
    ],
    "groups": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        6,
        7
      ],
      [
        8,
        9,
        10
      ],
      [
        11,
        12,
        13
      ]
    ],
    "metrics": [
      [
        "手工取痕",
        "珠链 · 毛笔 · 线 · 羽毛 · 纱布"
      ],
      [
        "Photoshop",
        "调色 · 拼接 · 局部复制 · 左右对称"
      ],
      [
        "实体成书",
        "跨页编排 · 布面封皮 · 手工装订"
      ]
    ],
    "sections": [
      [
        "材料如何变成身体",
        0
      ],
      [
        "Photoshop 图像重构",
        4
      ],
      [
        "从画面到手中的书",
        5
      ]
    ]
  },
  "type": {
    "title": "模块化字体与海报",
    "tag": "让字母成为图形。",
    "heading": "一套字形，三种画面中的性格。",
    "intro": "从模块化字形出发，设计字母与数字，再把它们放进建筑场景、人物肖像和金属质感的海报中，探索文字在不同画面里的视觉表现。",
    "steps": [
      [
        "用重复的形态建立字形系统",
        "字母以粗重块面、直线、圆弧和切口构成；重复的轮廓与留白让不同字符形成联系。字母与数字放在同一张字样表中，展示整套形态关系。"
      ],
      [
        "把文字放进场景",
        "在建筑场景中让字形呈现立体块面的效果；在红蓝肖像中调整字母的大小与纵向排列，使文字参与图像构图。"
      ],
      [
        "用材质与层次改变气质",
        "另一张海报把字形表现为银色的立体形态，与人物和环绕的线状元素交叠。同一套模块化语言因此呈现出不同于黑色字样表的空间感。"
      ]
    ],
    "assets": [
      {
        "src": "assets/graphic-process/type-system.webp",
        "title": "模块化字母与数字"
      },
      {
        "src": "assets/graphic-process/type-3.webp",
        "title": "立体字与建筑场景"
      },
      {
        "src": "assets/graphic-process/type-4.webp",
        "title": "字形与人物肖像"
      },
      {
        "src": "assets/graphic-process/type-5.webp",
        "title": "金属质感与空间层次"
      }
    ],
    "groups": [
      [
        0
      ],
      [
        1,
        2
      ],
      [
        3
      ]
    ]
  }
};

$('.process-archive').hidden=true;
const zoom=$('#zoom-dialog');function enlarge(src,title){zoom.querySelector('img').src=src;zoom.querySelector('img').alt=title;zoom.querySelector('p').textContent=title;zoom.showModal()}

for(const d of document.querySelectorAll('dialog')){d.querySelector('.close-dialog').onclick=()=>d.close();d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})}$('#contact-open').onclick=()=>$('#contact-dialog').showModal();
const modes={object:[['object','产品与互动'],['motion','桌宠动画'],['video','开发视频']],game:[['game','打开桌游'],['components','卡牌与规则'],['video','宣传视频']],service:[['service','完整服务'],['flows','Sam 对话设计'],['video','服务演示']],prototype:[['prototype','点击体验原型'],['screens','界面细节']],spatial:[['spatial','空间与轴测图'],['sketch','从线稿开始']],model:[['model','模型与相机'],['renders','两种城市视角']],album:[['album','唱片包装'],['book','翻阅手工书'],['type','字体海报']],website:[['website','浏览网站'],['concept','世界观']]};
const choices=p.id==='lake-domain'?[['lake','探索游戏'],['ui','UI 与动效'],['video','宣传片']]:p.id==='meow'?[['prototype','点击体验原型'],['screens','界面细节'],['video','项目视频'],['history','完整迭代']]:p.id==='dogo'?[['prototype','点击体验原型'],['screens','界面细节'],['storyboard','情境故事']]:p.id==='art-game'?[['website','浏览官网'],['concept','世界与玩法'],['video','战斗表现研究']]:modes[p.presentation];$('.project-tabs').innerHTML=choices.map(([id,label])=>`<button data-view="${id}" aria-pressed="false">${label}</button>`).join('')+'<button data-view="process" aria-pressed="false">设计过程</button>';
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>show(b.dataset.view));
const thumb=(a,i)=>`<button data-image="${i}"><img src="${a.src}" alt="${esc(a.title)}"><span>${esc(a.title)}</span></button>`;
function notes(){return `<div class="work-notes"><h2>${esc(p.tag)}</h2><p>${esc(p.summary)}</p>${p.insights.map(([h,t])=>`<details><summary>${esc(h)}<span>＋</span></summary><p>${esc(t)}</p></details>`).join('')}</div>`}
function showProcess(){cleanup();cleanup=()=>{};view.hidden=true;$('.process-section').hidden=false;document.querySelectorAll('[data-view]').forEach(b=>{const selected=b.dataset.view==='process';b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});}
document.addEventListener('click',e=>{const link=e.target.closest('a[href^="#"]');if(!link)return;const target=link.getAttribute('href');if(target==='#design-process'||target.startsWith('#research-step-')){e.preventDefault();showProcess();requestAnimationFrame(()=>document.querySelector(target)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));}});
function show(mode){if(mode==='process'){showProcess();return}view.hidden=false;$('.process-section').hidden=true;document.documentElement.dataset.theme=p.id==='art-graphic'?mode:p.id;cleanup();cleanup=()=>{};active=mode;if(p.id==='art-graphic'&&graphicCases[mode]){const c=graphicCases[mode];renderResearch(c);$('.project-heading h1').textContent=c.title;$('.project-tag').textContent=c.tag;document.title=c.title+' · Huijing Gong';$('.album-music').hidden=mode!=='album';}view.className='view-'+mode;requestAnimationFrame(()=>window.portfolioMotion?.enter(view));document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===mode);b.setAttribute('aria-pressed',String(b.dataset.view===mode))});
 if(mode==='lake')return window.mountLake(view,enlarge);if(mode==='ui'&&p.id==='lake-domain')return window.mountLakeUI(view,enlarge);if(mode==='storyboard'&&p.id==='dogo')return dogoStory();if(mode==='history'&&p.id==='meow')return meowHistory();if(mode==='prototype')return prototype();if(mode==='object')return object();if(mode==='motion')return motion();if(mode==='game')return game();if(mode==='components')return components();if(mode==='service')return service();if(mode==='flows')return flows();if(mode==='spatial')return spatial();if(mode==='sketch')return sketch();if(mode==='model')return model();if(mode==='renders')return renders();if(mode==='album')return album();if(mode==='book')return book();if(mode==='type')return typography();if(mode==='website')return website();if(mode==='concept')return concept();if(mode==='video')return video();if(mode==='screens')return screens();}
function prototype(){const source=p.frames.find(f=>f.type==='prototype').src;const u=new URL(source);u.searchParams.set('device-frame','false');u.searchParams.set('footer','false');u.searchParams.set('hide-ui','1');view.innerHTML=`<div class="prototype-composition"><aside class="prototype-left"><span class="eyebrow">${p.name}</span><h2>${esc(p.tag)}</h2><p>${esc(p.summary)}</p><span class="live-status">● 可操作的高保真原型</span><p class="tiny">点击界面中的按钮与导航<br>向下滚动查看完整页面</p></aside><div class="prototype-focus"><div class="phone-tools"><button id="restart">↻ 重新开始</button><a id="full-prototype" target="_blank" rel="noopener">单独打开 ↗</a></div><div class="phone-player"></div>${p.id==='cookup'?'<div class="entry-options"><button data-start="5039-42464">从欢迎页开始</button><button data-start="5039-43083">体验六步引导 ↗</button></div>':''}</div><aside class="prototype-right"><span class="eyebrow">为什么这样设计</span>${p.insights.map(([h,t])=>`<div><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join('')}<a href="#design-process">看看调研与迭代 ↓</a></aside></div>`;
 const external=new URL(u);external.hostname='www.figma.com';external.searchParams.set('scaling','contain');$('#full-prototype').href=external.href;let observer;
 function load(url=u.href){observer?.disconnect();const holder=$('.phone-player');holder.innerHTML='';const f=document.createElement('iframe');f.src=url;f.title=p.name+' 可点击交互原型';f.allowFullscreen=true;f.allow='fullscreen; clipboard-write';holder.append(f);const fit=()=>{const r=holder.getBoundingClientRect(),w=holder.clientWidth,h=holder.clientHeight;f.style.width=Math.round(w*1.4+8)+'px';f.style.height=Math.round(h*1.4+8)+'px';f.style.left=(-w*.2-4)+'px';f.style.top=(-h*.2-4)+'px'};observer=new ResizeObserver(fit);observer.observe(holder);holder.classList.add('is-loading');f.onload=()=>{fit();holder.classList.remove('is-loading');window.portfolioMotion?.enter(holder)};requestAnimationFrame(fit)}load();$('#restart').onclick=()=>load();document.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>{const next=new URL(u);next.searchParams.set('node-id',b.dataset.start);next.searchParams.set('starting-point-node-id',b.dataset.start.replace('-',':'));load(next.href)});cleanup=()=>observer?.disconnect();}
function object(){view.innerHTML=`<div class="product-composition"><div class="object-spot"><img src="${p.cover}" alt="SIPPY 杯托机器人"><span class="object-shadow"></span><button class="paper-button" id="pet-action">逗逗它，看看回应 ↗</button></div>${notes()}</div>`;$('#pet-action').onclick=()=>show('motion')}
function motion(){const clips=p.slides.slice(1);view.innerHTML=`<div class="animation-workspace"><div><span class="eyebrow">一只桌宠的几种小动作</span><h2>让提醒，有一点性格。</h2><p>动作从轻微提示逐渐增强，回应杯子与用户的状态。</p></div><div class="motion-player"><video controls playsinline loop preload="metadata" src="assets/motion/sippy-0.mp4" aria-label="SIPPY 桌宠动画"></video></div><div class="motion-choices">${clips.map((c,i)=>`<button data-clip="${i}" class="${i===0?'active':''}">${c.title}</button>`).join('')}</div></div>`;const player=$('video');document.querySelectorAll('[data-clip]').forEach(b=>b.onclick=()=>{player.src=`assets/motion/sippy-${b.dataset.clip}.mp4`;player.play().catch(()=>{});document.querySelectorAll('[data-clip]').forEach(c=>c.classList.toggle('active',c===b))});cleanup=()=>player.pause()}
function game(){if(p.id==='sevendays'&&window.sevenDays){cleanup=window.sevenDays.game(view,()=>show('components'));return}view.innerHTML=`<div class="game-workspace"><div class="game-closed"><button id="open-game" aria-label="打开SEVEN DAYS 桌游盒"><img src="assets/desk/game-box-original-cards.svg" alt="SEVEN DAYS 桌游包装盒"><span>打开盒子 ↗</span></button><p>七天，有限的资源，和并不完全可靠的同伴。</p></div><div class="game-open" hidden><img class="game-map" src="${p.slides[4].src}" alt="SEVEN DAYS 地图"><div class="game-components">${p.slides.slice(0,4).map((a,i)=>`<button data-component="${i}" style="--i:${i}"><img src="${a.src}" alt="${a.title}"><span>${a.title} ↗</span></button>`).join('')}</div><button class="paper-button" id="game-rules">看看卡牌与游玩手册 ↗</button></div></div>`;$('#open-game').onclick=()=>{$('.game-closed').hidden=true;$('.game-open').hidden=false};document.querySelectorAll('[data-component]').forEach(b=>b.onclick=()=>{const a=p.slides[+b.dataset.component];enlarge(a.src,a.title)});$('#game-rules').onclick=()=>show('components')}
function components(){if(p.id==='sevendays'&&window.sevenDays){cleanup=window.sevenDays.components(view);return}view.innerHTML=`<div class="components-spread">${[...p.slides,...p.process.slice(1)].map((a,i)=>`<button data-comp="${i}"><img src="${a.src}" alt="${a.title}"><span>${a.title} ↗</span></button>`).join('')}</div>`;const images=[...p.slides,...p.process.slice(1)];document.querySelectorAll('[data-comp]').forEach(b=>b.onclick=()=>{const a=images[+b.dataset.comp];enlarge(a.src,a.title)})}
function service(){if(p.id==='reswap')return unifiedReSwap();let n=0;view.innerHTML=`<div class="service-workspace"><div class="mini-browser"><div class="browser-bar"><span>● ● ●</span><span>校园交换站 · ReSwap</span></div><button class="browser-screen"><img src="${p.slides[0].src}" alt="ReSwap 交换站界面"></button><div class="browser-pager"><button id="service-prev">← 上一页</button><span id="service-count">1 / 4</span><button id="service-next">下一页 →</button></div></div>${notes()}</div>`;const select=i=>{n=(i+p.slides.length)%p.slides.length;$('.browser-screen img').src=p.slides[n].src;$('#service-count').textContent=`${n+1} / ${p.slides.length}`};$('#service-prev').onclick=()=>select(n-1);$('#service-next').onclick=()=>select(n+1);$('.browser-screen').onclick=()=>enlarge(p.slides[n].src,p.slides[n].title)}
function flows(){const diagrams=p.id==='reswap'?p.process.slice(1):p.process;view.innerHTML=`<div class="conversation-journey"><div><span class="eyebrow">ReSwap 中的 Sam</span><h2>把同一套服务，变成下一句对话。</h2><p>Token 规则、物品交换、站点查询与取送预约，共同承接交换站的用户旅程。</p></div><div class="flow-choices">${diagrams.map((a,i)=>`<button data-flow="${i}" aria-pressed="${i===0}">${a.title}</button>`).join('')}</div><button class="flow-canvas"><img src="${diagrams[0].src}" alt="${diagrams[0].title}"></button></div>`;let n=0;document.querySelectorAll('[data-flow]').forEach(b=>b.onclick=()=>{n=+b.dataset.flow;$('.flow-canvas img').src=diagrams[n].src;$('.flow-canvas img').alt=diagrams[n].title;document.querySelectorAll('[data-flow]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));window.portfolioMotion?.enter($('.flow-canvas'))});$('.flow-canvas').onclick=()=>enlarge(diagrams[n].src,diagrams[n].title)}
function sketch(){view.innerHTML=`<div class="sketch-spread">${p.process.map((a,i)=>`<button data-sketch="${i}" style="--i:${i}"><img src="${a.src}" alt="${a.title}"><span>${a.title} ↗</span></button>`).join('')}</div>`;document.querySelectorAll('[data-sketch]').forEach(b=>b.onclick=()=>{const a=p.process[+b.dataset.sketch];enlarge(a.src,a.title)})}
function spatial(){view.innerHTML=`<div class="spatial-composition"><div class="spatial-art"><img src="${p.cover}" alt="最终彩色轴测图"><button class="paper-button" id="spatial-zoom">放大看空间 ↗</button></div><aside><span class="eyebrow">平面与投影</span><h2>台阶、遮挡与层叠，<br>构成一个小世界。</h2><p>${p.summary}</p></aside></div>`;$('#spatial-zoom').onclick=()=>enlarge(p.cover,'最终彩色轴测图');}

function renders(){let n=0,timer;view.innerHTML=`<div class="render-cinema"><img src="${p.slides[0].src}" alt="${p.slides[0].title}"><div class="render-controls"><button id="render-prev">←</button><span id="render-name">渲染图一</span><button id="render-play">▷ 播放视角巡览</button><button id="render-next">→</button><button id="render-zoom">放大 ↗</button></div></div>`;const select=i=>{n=(i+2)%2;$('.render-cinema>img').src=p.slides[n].src;$('#render-name').textContent=n?'渲染图二':'渲染图一'};$('#render-prev').onclick=()=>select(n-1);$('#render-next').onclick=()=>select(n+1);$('#render-zoom').onclick=()=>enlarge(p.slides[n].src,p.slides[n].title);$('#render-play').onclick=()=>{if(timer){clearInterval(timer);timer=null;$('.render-cinema').classList.remove('playing');$('#render-play').textContent='▷ 播放视角巡览'}else{timer=setInterval(()=>select(n+1),6500);$('.render-cinema').classList.add('playing');$('#render-play').textContent='Ⅱ 暂停巡览'}};cleanup=()=>clearInterval(timer)}
function album(){const images=p.slides.slice(6,10);view.innerHTML=`<div class="album-composition"><div class="album-object"><button id="album-open"><img src="assets/album-transparent.webp" alt="窦唯《梦》专辑封套与唱片"><span>展开这张专辑 ↗</span></button></div><aside><span class="eyebrow">窦唯《梦》· 唱片包装设计</span><h2>让声音，留下形状。</h2><p>从音乐中的诡异、黑暗与自我救赎出发，将听觉情绪转译为封套、盘面与海报。</p></aside></div><div class="album-spread" hidden>${images.map((a,i)=>`<button data-album="${i}" style="--i:${i}"><img src="${a.src}" alt="${a.title}"><span>${a.title} ↗</span></button>`).join('')}</div>`;$('#album-open').onclick=()=>{const spread=$('.album-spread');spread.hidden=!spread.hidden;$('#album-open span').textContent=spread.hidden?'展开这张专辑 ↗':'收起包装 ↑';if(!spread.hidden)spread.scrollIntoView({behavior:'smooth',block:'center'})};document.querySelectorAll('[data-album]').forEach(b=>b.onclick=()=>{const a=images[+b.dataset.album];enlarge(a.src,a.title)})}
function book(){
 const raw=p.slides.slice(10),pages=[raw[1],...raw.slice(2),raw[0]];let n=0,busy=false,drag=null,timer=null,disposed=false;
 view.innerHTML=`<div class="folio"><div class="folio-caption"><span class="eyebrow">Mark Making · 手工实体书</span><p>从布面封皮开始，慢慢翻阅。</p></div><div class="folio-stage"><div class="folio-spread" tabindex="0" role="group" aria-label="可拖动翻页的手工书"><div class="folio-paper folio-left"></div><div class="folio-paper folio-right"></div><div class="folio-gutter"></div><div class="folio-leaf" hidden><div class="folio-face folio-front"></div><div class="folio-face folio-back"></div></div><button class="folio-edge folio-edge-left" aria-label="翻向上一页">‹</button><button class="folio-edge folio-edge-right" aria-label="翻向下一页">›</button></div></div><div class="folio-controls"><button id="book-prev">← 上一页</button><span id="book-page" aria-live="polite"></span><button id="book-next">打开封面 →</button><button id="book-zoom">放大细节 ↗</button></div><p class="folio-hint">点击页角或左右拖动翻页 · 也可以使用方向键</p></div>`;
 const spread=$('.folio-spread'),left=$('.folio-left'),right=$('.folio-right'),leaf=$('.folio-leaf'),front=$('.folio-front'),back=$('.folio-back');
 const single=i=>i===0||i===1||i===17||i===pages.length-1;
 function paint(el,i,side){const key=i+':'+side;if(el.dataset.page===key)return;el.dataset.page=key;el.replaceChildren();el.classList.remove('blank','cover');if((single(i)&&side==='left'&&i!==pages.length-1)||(i===pages.length-1&&side==='right')){el.classList.add('blank');return}const img=document.createElement('img');img.src=pages[i].src;img.alt='Mark Making · '+(i===0?'封面':i===pages.length-1?'封底':'第 '+i+' 组书页');img.draggable=false;if(single(i)){el.classList.add('cover');img.style.cssText='width:100%;height:100%;object-fit:contain'}else img.style.cssText=`width:200%;max-width:none;height:100%;object-fit:fill;transform:translateX(${side==='left'?'0':'-50%'})`;el.append(img)}
 function draw(){paint(left,n,'left');paint(right,n,'right');spread.classList.toggle('is-cover',n===0);spread.classList.toggle('is-back',n===pages.length-1);$('#book-page').textContent=n===0?'封面':n===pages.length-1?'封底':`${n} / ${pages.length-2}`;$('#book-prev').disabled=n===0;$('#book-next').disabled=n===pages.length-1;$('.folio-edge-left').disabled=n===0;$('.folio-edge-right').disabled=n===pages.length-1;$('#book-next').textContent=n===0?'打开封面 →':'下一页 →';[n-1,n+1].filter(i=>i>=0&&i<pages.length).forEach(i=>{const img=new Image();img.src=pages[i].src;img.decode().catch(()=>{})})}
 function prepare(dir){if(busy||n+dir<0||n+dir>=pages.length)return false;busy=true;leaf.hidden=false;leaf.style.transition='none';leaf.classList.toggle('backwards',dir<0);if(dir>0){paint(front,n,'right');paint(back,n+1,'left');paint(right,n+1,'right')}else{paint(front,n,'left');paint(back,n-1,'right');paint(left,n-1,'left')}leaf.style.transform='rotateY(0deg)';return true}
 function progress(dir,value){leaf.style.transform=`rotateY(${-dir*180*value}deg)`;leaf.style.setProperty('--shade',Math.sin(Math.PI*value)*.28)}
 // Keep the leaf in place until its underlying destination has decoded and painted.
 async function finish(dir,commit){if(disposed)return;const target=commit?n+dir:n;paint(left,target,'left');paint(right,target,'right');await Promise.all([...left.querySelectorAll('img'),...right.querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));if(disposed)return;n=target;draw();leaf.hidden=true;busy=false;drag=null}
 function settle(dir,commit=true){const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;let ended=false;const done=()=>{if(ended)return;ended=true;clearTimeout(timer);leaf.removeEventListener('transitionend',onEnd);finish(dir,commit)};const onEnd=e=>{if(e.target===leaf&&e.propertyName==='transform')done()};leaf.addEventListener('transitionend',onEnd);leaf.style.transition=reduced?'none':'transform 720ms cubic-bezier(.2,.65,.25,1)';progress(dir,commit?1:0);timer=setTimeout(done,reduced?0:800)}
 function turn(dir){if(!prepare(dir))return;requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!disposed)settle(dir)}))}
 $('#book-prev').onclick=()=>turn(-1);$('#book-next').onclick=()=>turn(1);$('.folio-edge-left').onclick=()=>turn(-1);$('.folio-edge-right').onclick=()=>turn(1);$('#book-zoom').onclick=()=>enlarge(pages[n].src,n===0?'Mark Making · 封面':'Mark Making · 书页 '+n);
 spread.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.button!==0||busy)return;const r=spread.getBoundingClientRect();const dir=e.clientX>r.left+r.width/2?1:-1;if(!prepare(dir))return;drag={x:e.clientX,dir,width:r.width/2,value:0};spread.setPointerCapture(e.pointerId)});
 spread.addEventListener('pointermove',e=>{if(!drag)return;drag.value=Math.max(0,Math.min(1,(drag.x-e.clientX)*drag.dir/drag.width));progress(drag.dir,drag.value)});
 spread.addEventListener('pointerup',e=>{if(!drag)return;const d=drag;settle(d.dir,d.value>.18||Math.abs(d.x-e.clientX)<6);drag=null});spread.addEventListener('pointercancel',()=>{if(drag){settle(drag.dir,false);drag=null}});
 const keys=e=>{if(zoom.open||e.target.matches('input,textarea,select'))return;if(e.key==='ArrowRight'){e.preventDefault();turn(1)}if(e.key==='ArrowLeft'){e.preventDefault();turn(-1)}};addEventListener('keydown',keys);draw();cleanup=()=>{disposed=true;clearTimeout(timer);removeEventListener('keydown',keys)};
}
function typography(){const posters=p.slides.slice(1,5);view.innerHTML=`<div class="type-intro"><span class="eyebrow">字母实验</span><h2>把字母，当成图形来玩。</h2></div><div class="poster-wall">${posters.map((a,i)=>`<button data-poster="${i}" style="--i:${i}"><img src="${a.src}" alt="字体海报 ${i+1}"></button>`).join('')}</div>`;document.querySelectorAll('[data-poster]').forEach(b=>b.onclick=()=>{const a=posters[+b.dataset.poster];enlarge(a.src,'字体海报 '+(+b.dataset.poster+1))})}
function website(){const src=p.frames[0].src;view.innerHTML=`<div class="site-workspace"><div class="site-toolbar"><span class="traffic-dots">● ● ●</span><span class="site-address">huijingg.wixsite.com/dualguardians</span><a href="${src}" target="_blank" rel="noopener">在新窗口浏览 ↗</a></div><div class="site-screen"><img src="${p.cover}" alt="Dual Guardians 网站首页"><button id="open-site" class="paper-button">在这里浏览网站 ↗</button></div></div>`;$('#open-site').onclick=()=>{$('.site-screen').innerHTML=`<iframe src="${src}" title="Dual Guardians 游戏概念网站"></iframe>`}}
function concept(){
 const entries=[
 ['世界规则','一座被困住的岛。','Roan Sea → Siren Island → Devil’s Wall','诅咒构成冒险的起点。玩家以驱魔人的身份保护城镇，寻找通往 Devil’s Castle 与解除诅咒的线索。'],
 ['玩法循环','从遭遇，到成为伙伴。','探索 → 捕获 → 净化与培养 → 进化 → 新区域','Siren Talents、属性关系与伙伴组合连接成长和回合制策略；Book of Demons 记录已经发现的恶魔。'],
 ['角色设定','能力，来自它生活的地方。','Tree bird demon · Miss Mirror · Igneous Demon','森林、城堡与火山分别关联角色的性格、主题和力量。Kabiya 则作为起始伙伴，带玩家进入培养系统。'],
 ['Elara 支线','诅咒，也是一段个人经历。','Curse of the Sirens → 歌声 → 疏离 → 理解','Elara 的歌声承载祖辈的痛苦。对话和不同选择逐步揭开她的故事，让宏大的世界设定落在一个具体的人身上。']
 ];
 view.innerHTML=`<section class="dual-explorer"><span class="eyebrow">DualGuardians · 概念探索</span><nav aria-label="世界与玩法">${entries.map((e,i)=>`<button data-lore="${i}" aria-pressed="${i===0}">${e[0]}</button>`).join('')}</nav><div id="dual-lore"></div><small>课程概念设定，非可游玩的游戏客户端。</small></section>`;
 const showLore=i=>{const e=entries[i],host=$('#dual-lore');host.innerHTML=`<h2>${esc(e[1])}</h2><div class="dual-path">${esc(e[2])}</div><p>${esc(e[3])}</p>`;view.querySelectorAll('[data-lore]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.lore===i)));window.portfolioMotion?.enter(host)};
 view.querySelectorAll('[data-lore]').forEach(b=>b.onclick=()=>showLore(+b.dataset.lore));showLore(0);
}
function video(){if(p.id==='art-game'){view.innerHTML=`<div class="dual-film"><div class="film-view"><iframe src="https://www.youtube.com/embed/2aiIIoyNTR8" title="DualGuardians 战斗表现研究" allow="fullscreen; autoplay" allowfullscreen></iframe></div><p>作业中的战斗表现研究视频：用于说明回合制策略与战斗方向，不作为已完成游戏实机展示。</p></div>`;return}if(p.id==='meow')return meowVideos();if(p.id==='sippy')return sippyDevelopment();const f=p.frames.find(f=>f.type==='video');view.innerHTML=`<div class="film-view"><iframe src="${f.src}" title="${p.name} 项目视频" allow="fullscreen; autoplay" allowfullscreen></iframe></div>`}
function screens(){let n=0;view.innerHTML=`<div class="screens-workspace"><div class="screen-overview">${p.slides.map((a,i)=>`<button data-screen="${i}"><img src="${a.src}" alt="${a.title}" loading="lazy"><span>${a.title}</span></button>`).join('')}</div></div>`;document.querySelectorAll('[data-screen]').forEach(b=>b.onclick=()=>{const a=p.slides[+b.dataset.screen];enlarge(a.src,a.title)})}
const siblings=Object.values(all),next=siblings[(siblings.findIndex(x=>x.id===p.id)+1)%siblings.length];$('#next-project').href=next.url;$('#next-project').innerHTML=`下一件作品 <strong>${next.name} ↗</strong>`;
if(p.id==='lake-domain'){$('#next-project').href='index.html#computer';$('#next-project').innerHTML='回到电脑 <strong>继续探索 ↗</strong>';}
let initial=p.presentation;const hash=location.hash.slice(1);if(choices.some(([id])=>id===hash))initial=hash;show(initial);if(hash==='design-process'||hash.startsWith('research-step-')){showProcess();requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView())}

function sippyDevelopment(){
 const chapters=[
 [0,'日常问题','专注工作时忘记喝水，成为杯托设计的起点。'],
 [44,'早期原型','先验证可移动底盘与摄像头识别手势，控制靠近和远离。'],
 [67,'加入系统逻辑','补上行为状态、Unity 动画、称重检测、电池与蓝牙。'],
 [104,'完成外壳','用 3D 打印外壳和毛绒包覆，形成最终桌面伙伴。'],
 [121,'完整交互','自主靠近、挥手移开、拿杯回应，连接实体与屏幕反馈。'],
 [152,'未来方向','更小的形态与更丰富的回应是探索方向，尚未实现。']
 ];
 view.innerHTML=`<section class="development-workspace"><div class="development-intro"><span class="eyebrow">SIPPY · 开发记录</span><h2>从一个会移动的杯托开始。</h2><p>沿着视频，看看动作、感知和性格如何逐步合在一起。</p></div><div class="development-player"><iframe src="https://www.youtube.com/embed/CZCz15ocryM" title="SIPPY 开发视频" allow="fullscreen; autoplay" allowfullscreen></iframe></div><div class="development-chapters" aria-label="开发视频章节">${chapters.map(([time,title,text],i)=>`<button data-development="${i}" aria-pressed="${i===0}"><span>${Math.floor(time/60)}:${String(time%60).padStart(2,'0')}</span><strong>${title}</strong><small>${text}</small></button>`).join('')}</div><p class="development-caption" aria-live="polite">${chapters[0][2]}</p></section>`;
 document.querySelectorAll('[data-development]').forEach(b=>b.onclick=()=>{const i=+b.dataset.development;$('.development-player iframe').src='https://www.youtube.com/embed/CZCz15ocryM?autoplay=1&start='+chapters[i][0];$('.development-caption').textContent=chapters[i][2];document.querySelectorAll('[data-development]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));window.portfolioMotion?.enter($('.development-caption'))});
}

function unifiedReSwap(){
 const stops=[
 ['发现与询问','用户从校园生活中的闲置与需求出发。Sam 帮助解释规则、寻找物品和站点。','assets/reswap-process/journey.webp','Lynn 的用户旅程'],
 ['寄存与估值','物品进入 Swap Station，由工作人员检查和评估；Token 作为站内兑换积分，让用户无需等待一对一等值交换。','assets/reswap-process/token-storyboard.webp','Token 交换故事板'],
 ['站点与取送','用户可到站兑换，也可预约志愿者配送。线下通道与数字入口共同影响服务是否可达。','assets/reswap-process/lego-walkthrough.webp','LEGO 服务走查'],
 ['Sam 的引导','Sam 是服务的对话入口：按物品和预算推荐、解释 Token、查询站点、预约取送。','assets/reswap-process/interface-flow.webp','网页、物品与 Sam 的连接'],
 ['查询与跟进','功能原型连接订单数据、备注与地图入口，将后台状态变成清楚的下一步。','assets/reswap-process/map-navigation.webp','Sam 的地图导航']
 ];
 view.innerHTML=`<section class="reswap-unified"><div class="reswap-intro"><span class="eyebrow">ReSwap · Sam</span><h2>从一件闲置，到一段完整的服务。</h2><p>线下交换站、Token、志愿者配送和对话助手，沿着同一条旅程协作。</p></div><nav class="service-route" aria-label="ReSwap 服务旅程">${stops.map(([title],i)=>`<button data-service-stop="${i}" aria-pressed="${i===0}"><span>0${i+1}</span>${title}</button>`).join('')}</nav><div class="service-stage"><button class="service-stage-image"><img src="${stops[0][2]}" alt="${stops[0][3]}"><span>放大查看 ↗</span></button><aside><span class="eyebrow" id="service-stage-step">01 / 05</span><h3>${stops[0][0]}</h3><p>${stops[0][1]}</p><div class="service-stage-links"><button class="paper-button" id="service-to-sam">看看 Sam 的对话设计 ↗</button><a href="#design-process">阅读调研与迭代 ↓</a></div></aside></div><p class="service-scope">服务设计与功能原型 · 线下站点以桌面走查验证，线上对话以 Voiceflow 实现。</p></section>`;
 let current=0;document.querySelectorAll('[data-service-stop]').forEach(b=>b.onclick=()=>{current=+b.dataset.serviceStop;const item=stops[current],img=$('.service-stage-image img');img.src=item[2];img.alt=item[3];$('.service-stage aside h3').textContent=item[0];$('.service-stage aside>p').textContent=item[1];$('#service-stage-step').textContent='0'+(current+1)+' / 05';document.querySelectorAll('[data-service-stop]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));window.portfolioMotion?.enter($('.service-stage'))});$('.service-stage-image').onclick=()=>enlarge(stops[current][2],stops[current][3]);$('#service-to-sam').onclick=()=>show('flows');
}

function meowVideos(){
 view.innerHTML=`<section class="meow-media"><div class="archive-intro"><span class="eyebrow">Meow Smart · 影像记录</span><h2>研究如何走到这个界面。</h2><p>项目演示串起草图、测试与最终界面；研究汇报保留问卷、观察和竞品分析的前期工作。</p></div><div class="media-switch" aria-label="选择 Meow Smart 视频"><button data-meow-video="demo" aria-pressed="true">项目演示 · 2:01</button><button data-meow-video="research" aria-pressed="false">前期研究汇报 · 2:30</button></div><div class="meow-video-player"><iframe src="https://www.youtube.com/embed/sGnkr4mHPvY" title="Meow Smart 项目演示视频" allow="fullscreen; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div><p class="media-note" aria-live="polite">项目演示：从草图与线框、原型测试，到健康、家居与社区界面。</p></section>`;
 document.querySelectorAll('[data-meow-video]').forEach(b=>b.onclick=()=>{const research=b.dataset.meowVideo==='research',host=$('.meow-video-player');host.innerHTML=research?'<video controls playsinline preload="metadata" src="assets/meow-media/research-presentation.mp4" poster="assets/meow-media/research-poster.webp" aria-label="Meow Smart 前期研究汇报"></video>':'<iframe src="https://www.youtube.com/embed/sGnkr4mHPvY" title="Meow Smart 项目演示视频" allow="fullscreen; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';$('.media-note').textContent=research?'前期研究汇报：问题背景、问卷分析、照护情境、竞品比较与设计方向。':'项目演示：从草图与线框、原型测试，到健康、家居与社区界面。';document.querySelectorAll('[data-meow-video]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));window.portfolioMotion?.enter(host)});
 cleanup=()=>{$('.meow-video-player video')?.pause()};
}
function meowHistory(){
 const base='https://3538402983.wixsite.com/group3-info10003';
 view.innerHTML=`<section class="meow-history"><div class="archive-intro"><span class="eyebrow">Meow Smart · 原始迭代档案</span><h2>两版草图、两版线框，四版原型。</h2><p>Report 2 中的原始 Wix 网站直接展示在下方。可以滚动浏览，并使用网站左侧的版本导航查看完整界面与细节。</p></div><div class="history-context"><span>草图 → 线框 → 原型</span><button class="paper-button" id="history-expand" aria-expanded="false">展开浏览区域 ↗</button></div><div class="wix-archive"><iframe src="${base}" title="Meow Smart Wix 完整迭代历史：两版草图、两版线框、四版原型" loading="eager" allow="fullscreen" allowfullscreen></iframe></div><div class="history-support"><p>上方是保留原有设计的实时网站，版本名称沿用原档案。</p><a href="${base}" target="_blank" rel="noopener">独立窗口浏览原始档案 ↗</a></div><div class="history-summary">${[['草图','先探索页面与功能结构'],['线框','连接任务路径与界面关系'],['原型','通过视觉暗示、首次点击和访谈继续调整']].map(([h,t])=>`<div><h3>${h}</h3><p>${t}</p></div>`).join('')}</div></section>`;
 $('#history-expand').onclick=()=>{const host=$('.wix-archive'),expanded=host.classList.toggle('expanded');$('#history-expand').setAttribute('aria-expanded',String(expanded));$('#history-expand').textContent=expanded?'收起浏览区域 ↑':'展开浏览区域 ↗';window.portfolioMotion?.enter(host)};
}

function dogoStory(){
 const scenes=[
 ['一个小需求，开启一次出门','发现狗的项圈牌不见了，主人想到在 Dogo 兑换一个新的。','动机：从生活里的具体需要开始。'],
 ['还差一些骨头','喜欢的项圈牌需要 150 根骨头，目前有 130 根。主人开始寻找获得奖励的方法。','设计连接：当前余额 → 目标奖励。'],
 ['向 Max 问路','主人用语音向 Max 求助，得到附近 Bark & Brew 活动与骨头奖励的建议。','设计连接：对话帮助 → 可采取的行动。'],
 ['先确认，适不适合一起去','出发前检查场所照片、饮水设施、牵引要求与如厕区域，判断是否适合自己的狗。','设计连接：推荐 → 场所详情 → 决定。'],
 ['带着狗出门','故事离开手机，进入实际步行的过程。奖励成为外出的一个契机。','情境重点：屏幕中的目标，怎样连接日常行动。'],
 ['在地图上确认到达','主人对照地图与现实中的场所，找到活动地点。','设计连接：位置表达 → 线下定位。'],
 ['和人，也和狗相遇','在咖啡馆参加活动，与其他狗主人和狗互动，获得活动奖励。','情境重点：场所与活动承担社交体验。'],
 ['让线上奖励落到店里','骨头达到 150 根后，主人向店员询问兑换，并出示 Dogo 的奖励页面。','设计连接：兑换界面 → 店员与服务流程。'],
 ['带走新的项圈牌','主人与狗带着新的奖励离开，完成从需求、探索到兑换的整个故事。','体验闭环：最初的需求得到回应。']
 ];let current=0;
 view.innerHTML=`<section class="dogo-story"><header><div><span class="eyebrow">Dogo · 情境演绎</span><h2>一次出门，怎样发生？</h2><p>团队以拍摄与界面合成串联的九格 storyboard。它用于表达使用情境，属于设计演绎。</p></div><button id="dogo-whole-board">查看完整 storyboard ↗</button></header><div class="dogo-story-layout"><div class="dogo-scene-image"></div><div class="dogo-scene-copy" aria-live="polite"></div></div><div class="dogo-story-controls"><button id="dogo-story-prev" aria-label="上一格">←</button><span id="dogo-story-count"></span><button id="dogo-story-next" aria-label="下一格">→</button></div><nav class="dogo-story-index" aria-label="选择故事场景">${scenes.map((a,i)=>`<button data-scene="${i}" aria-pressed="false"><span>${String(i+1).padStart(2,'0')}</span>${esc(['新的需求','奖励目标','询问 Max','检查场所','带狗出门','确认到达','参加活动','店内兑换','完成体验'][i])}</button>`).join('')}</nav></section>`;
 const paint=()=>{const a=scenes[current],img=view.querySelector('.dogo-scene-image'),copy=view.querySelector('.dogo-scene-copy');img.innerHTML=`<img src="assets/dogo-process/scene-${current+1}.webp" alt="团队 storyboard 第 ${current+1} 格：${esc(a[0])}">`;copy.innerHTML=`<span class="eyebrow">情境 ${String(current+1).padStart(2,'0')} / 09</span><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p><div class="dogo-scene-insight">${esc(a[2])}</div>`;$('#dogo-story-count').textContent=`${current+1} / ${scenes.length}`;$('#dogo-story-prev').disabled=current===0;$('#dogo-story-next').disabled=current===scenes.length-1;view.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.scene===current)));window.portfolioMotion?.enter(img);window.portfolioMotion?.enter(copy)};
 view.querySelectorAll('[data-scene]').forEach(b=>b.onclick=()=>{current=+b.dataset.scene;paint()});$('#dogo-story-prev').onclick=()=>{current=Math.max(0,current-1);paint()};$('#dogo-story-next').onclick=()=>{current=Math.min(scenes.length-1,current+1);paint()};$('#dogo-whole-board').onclick=()=>enlarge('assets/dogo-process/storyboard.webp','Dogo · 团队九格 storyboard');paint();
}
