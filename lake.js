window.mountLake=(host,enlarge)=>{
 const scenes=[
 ['lake-clean.webp','湖区漫游','先看见世界，再选择自己的路线。','岸线、岛屿、房屋与高处地标帮助定向。探索与两处试炼是准备途径，玩家可以决定何时迎接 Guardian。'],
 ['map.jpg','旅程之书','把“我要去哪儿”变成可采取的行动。','任务、地图与装备连接旅程。地图支持选择目的地、查看距离与相对高度，并开启方向指引。'],
 ['side-a-stage2.jpg','平台交锋','积累伤害，寻找击出场外的机会。','Trial A 的核心是击退与出界。平台、回场和防御时机比单纯消耗生命值更重要。'],
 ['side-b.jpg','像素试炼','用跳跃与落点，读懂一条道路。','Trial B 结合平台、陷阱、战斗与收集。难度与角色选择让玩家以不同方式练习穿越。'],
 ['hero-combat.jpg','日蚀挑战','从准备，走向面对守护者。','Eclipse Warden 的两阶段战斗强调预警、站位和收招窗口，连接探索积累与最后的行动判断。'],
 ['black-sun.jpg','Black Sun','让蓄力成为一次空间判断。','黑日逐渐积聚，场地中央形成压力，四角保留逃离空间。技能的形状、镜头与攻击范围共同传达危险。']
 ];
 host.innerHTML=`<section class="lake-showcase"><div class="lake-stage"><button class="lake-image" aria-label="放大当前游戏画面"><img src="assets/lake-domain/lake-clean.webp" alt="Lake Domain 湖区" fetchpriority="high"></button><span class="lake-image-note">场景展示</span></div><div class="lake-scene-bar"><span class="eyebrow">Lake Domain · KingOfGraphic</span><span class="lake-counter">01 / 06</span></div><nav class="lake-places" aria-label="探索游戏场景">${scenes.map((s,i)=>`<button data-lake-scene="${i}" aria-pressed="${i===0}">${s[1]}</button>`).join('')}</nav><div class="lake-scene-description" aria-live="polite"><h2></h2><p></p></div><div class="lake-actions"><button class="paper-button" id="lake-trailer">▷ 观看宣传片</button><a href="#design-process">阅读设计与开发过程 ↓</a></div><details class="lake-sources"><summary>项目资料 ↗</summary><div><a href="https://github.com/feit-comp30019/2026s2-project-2-kingofgraphic" target="_blank" rel="noopener">课程仓库</a><a href="https://github.com/kennyxu04/king-of-graphic" target="_blank" rel="noopener">开发仓库</a><a href="https://unimelbit.atlassian.net/wiki/spaces/GAI/overview" target="_blank" rel="noopener">Confluence 开发记录</a></div></details></section>`;
 let current=0;const image=host.querySelector('.lake-image img'),copy=host.querySelector('.lake-scene-description');
 const select=i=>{current=i;const s=scenes[i];image.src='assets/lake-domain/'+s[0];image.alt='Lake Domain · '+s[1];copy.querySelector('h2').textContent=s[2];copy.querySelector('p').textContent=s[3];host.querySelector('.lake-counter').textContent=String(i+1).padStart(2,'0')+' / 06';host.querySelectorAll('[data-lake-scene]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.lakeScene===i)));window.portfolioMotion?.enter(image);};
 host.querySelectorAll('[data-lake-scene]').forEach(b=>b.onclick=()=>select(+b.dataset.lakeScene));host.querySelector('.lake-image').onclick=()=>enlarge(image.src,image.alt);host.querySelector('#lake-trailer').onclick=()=>{document.querySelector('[data-view="video"]').click();host.scrollIntoView({behavior:'smooth',block:'start'})};select(0);
};
