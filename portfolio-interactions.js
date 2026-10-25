(()=>{
'use strict';
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const style=document.createElement('link');style.rel='stylesheet';style.href='portfolio-interactions.css?v=1';document.head.append(style);
const home=!!document.querySelector('.desk-world');
if(home){
 const toggle=document.createElement('button');toggle.className='pi-explore';toggle.textContent='✦ 探索作品';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','pi-directory');
 const panel=document.createElement('aside');panel.id='pi-directory';panel.className='pi-directory';panel.hidden=true;panel.setAttribute('aria-label','桌面作品快捷目录');panel.innerHTML='<div class="pi-directory-head"><b>桌上的作品</b><button aria-label="收起作品目录">×</button></div><p>也可以直接点击桌上的物件。</p>';
 const names={'.desk-laptop':'电脑 · 游戏与网站','.desk-phone':'手机 · APP 设计','.desk-sketchbook':'画册 · 绘画与平面','.desk-game':'桌游 · SEVEN DAYS','.desk-pet':'桌宠 · SIPPY','.stage-mannequin':'木偶 · 舞台设计','.research-folder':'资料夹 · 用户研究','.desk-record':'唱片 · 专辑包装','.desk-book':'手工书 · Mark Making','.pinned-type':'海报 · 字体实验','.pinned-render':'Zirma · 三维空间','.desk-model':'Spatial World · 轴测世界'};
 const list=document.createElement('div');list.className='pi-directory-list';
 for(const [selector,name] of Object.entries(names)){const item=document.querySelector(selector);if(!item)continue;const b=document.createElement('button');b.textContent=name+' ↗';b.addEventListener('click',()=>{close();item.click()});list.append(b)}panel.append(list);

 function close(){panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus()}
 toggle.addEventListener('click',()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden){panel.querySelector('button').focus();if(!reduced.matches)panel.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'cubic-bezier(.2,.7,.2,1)'})}});panel.querySelector('button').addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close()});document.body.append(toggle,panel);
}else{
 const main=document.querySelector('main');if(main){
 const progress=document.createElement('div');progress.className='pi-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 const dock=document.createElement('nav');dock.className='pi-dock';dock.setAttribute('aria-label','项目浏览工具');
 const chapters=document.createElement('button');chapters.textContent='章节';chapters.setAttribute('aria-expanded','false');chapters.setAttribute('aria-controls','pi-chapters');
 const panel=document.createElement('div');panel.id='pi-chapters';panel.className='pi-chapters';panel.hidden=true;
 const top=document.createElement('button');top.textContent='↑ 顶部';top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'}));dock.append(chapters,top,panel);document.body.append(dock);
 function sections(){const nodes=[...main.querySelectorAll('section,.process-chapter')].filter(x=>x.getClientRects().length&&x.querySelector('h2,h3'));return nodes.filter(x=>!nodes.some(y=>y!==x&&y.contains(x)))}
 function refresh(){panel.replaceChildren();sections().forEach((s,i)=>{const heading=s.querySelector('h2,h3');const b=document.createElement('button');b.textContent=String(i+1).padStart(2,'0')+'  '+heading.textContent;b.addEventListener('click',()=>{s.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});panel.hidden=true;chapters.setAttribute('aria-expanded','false')});panel.append(b)});if(!panel.children.length){const note=document.createElement('p');note.textContent='当前内容可直接向下浏览。';panel.append(note)}}
 chapters.addEventListener('click',()=>{refresh();panel.hidden=!panel.hidden;chapters.setAttribute('aria-expanded',String(!panel.hidden))});document.addEventListener('click',e=>{if(!dock.contains(e.target)){panel.hidden=true;chapters.setAttribute('aria-expanded','false')}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){panel.hidden=true;chapters.setAttribute('aria-expanded','false')}});
 let ticking=false;function update(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});addEventListener('resize',update);update();
 }
}
function toast(text){const node=document.createElement('div');node.className='pi-toast';node.setAttribute('role','status');node.textContent=text;document.body.append(node);setTimeout(()=>node.remove(),2200)}
for(const dialog of document.querySelectorAll('#evidence-dialog,#zoom-dialog,#sketch-zoom')){
 let ready=false,scale=1,x=0,y=0,start=null,img,viewport,buttons;
 function reset(){scale=1;x=0;y=0;paint()}
 function paint(){if(!img)return;img.style.transform=`translate(${x}px,${y}px) scale(${scale})`;viewport.classList.toggle('pi-zoomed',scale>1);buttons.querySelector('[data-scale]').textContent=Math.round(scale*100)+'%';buttons.querySelector('[data-minus]').disabled=scale<=1;buttons.querySelector('[data-plus]').disabled=scale>=4}
 function zoom(delta){scale=Math.max(1,Math.min(4,scale+delta));if(scale===1){x=0;y=0}paint()}
 function setup(){if(ready)return;img=dialog.querySelector('img');if(!img)return;ready=true;if(dialog.id==='evidence-dialog'){const hint=dialog.querySelector('p');if(hint)hint.textContent='双击放大 · 放大后拖动 · + / − 缩放 · 0 复位'}dialog.classList.add('pi-image-dialog');viewport=document.createElement('div');viewport.className='pi-image-viewport';img.before(viewport);viewport.append(img);img.draggable=false;buttons=document.createElement('div');buttons.className='pi-image-tools';buttons.setAttribute('aria-label','大图查看工具');buttons.innerHTML='<button data-minus aria-label="缩小图片">−</button><output data-scale aria-live="polite">100%</output><button data-plus aria-label="放大图片">＋</button><button data-reset>复位</button><button data-full>全屏</button>';
 dialog.append(buttons);buttons.querySelector('[data-minus]').onclick=()=>zoom(-.25);buttons.querySelector('[data-plus]').onclick=()=>zoom(.25);buttons.querySelector('[data-reset]').onclick=reset;buttons.querySelector('[data-full]').onclick=async()=>{try{if(document.fullscreenElement===dialog)await document.exitFullscreen();else await dialog.requestFullscreen()}catch{toast('当前浏览器不支持全屏，可使用放大按钮')}};
 viewport.addEventListener('dblclick',()=>scale===1?zoom(1):reset());viewport.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();zoom(e.deltaY<0?.15:-.15)}},{passive:false});viewport.addEventListener('pointerdown',e=>{if(scale<=1||e.button!==0)return;start={px:e.clientX,py:e.clientY,x,y};viewport.setPointerCapture(e.pointerId);e.preventDefault()});viewport.addEventListener('pointermove',e=>{if(!start)return;const limitX=viewport.clientWidth*(scale-1)/2,limitY=viewport.clientHeight*(scale-1)/2;x=Math.max(-limitX,Math.min(limitX,start.x+e.clientX-start.px));y=Math.max(-limitY,Math.min(limitY,start.y+e.clientY-start.py));paint()});for(const event of ['pointerup','pointercancel','lostpointercapture'])viewport.addEventListener(event,()=>start=null);
 dialog.addEventListener('keydown',e=>{if(e.target.closest('input,textarea'))return;if(e.key==='+'||e.key==='='){e.preventDefault();zoom(.25)}if(e.key==='-'){e.preventDefault();zoom(-.25)}if(e.key==='0'){e.preventDefault();reset()}});
 const watch=new MutationObserver(()=>reset());watch.observe(img,{attributes:true,attributeFilter:['src']});
 }
 new MutationObserver(()=>{if(dialog.open){setup();reset()}else if(document.fullscreenElement===dialog)document.exitFullscreen().catch(()=>{})}).observe(dialog,{attributes:true,attributeFilter:['open']});
}
})();
