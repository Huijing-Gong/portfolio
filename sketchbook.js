(()=>{
 const pages=[
  ['assets/transparent/mario-book-cutout-v2.png','Spatial World Design','从二维线索出发，构建交错生长的空间世界。','project-art-spatial.html'],
  ['assets/gallery/067-letter1.webp','字体实验','从几何字形，到字体海报与视觉应用。','project-art-graphic.html#type'],
  ['assets/gallery/077-cover.webp','Mark Making','一本从皮肤、细胞走向骨骼的手工书。','project-art-graphic.html#book']
 ];
 const dialog=document.querySelector('#sketchbook-dialog'),stage=dialog.querySelector('.sketch-stage'),left=dialog.querySelector('.sketch-left'),right=dialog.querySelector('.sketch-right'),leaf=dialog.querySelector('.sketch-leaf'),front=dialog.querySelector('.sketch-front'),back=dialog.querySelector('.sketch-back'),zoom=document.querySelector('#sketch-zoom');
 const mobile=matchMedia('(max-width:650px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let index=0,busy=false,drag=null,suppressClick=false,transitionId=0;
 const step=()=>mobile.matches?1:2;
 const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function paint(el,i){
  if(el.dataset.page===String(i))return;
  el.dataset.page=String(i);const p=pages[i];
  el.innerHTML=p?`<span class="sketch-folio">${String(i+1).padStart(2,'0')}</span><button class="sketch-art" data-art="${i}" aria-label="查看完整作品 ${esc(p[1])}"><img src="${p[0]}" alt="${esc(p[1])}" draggable="false"></button><div class="sketch-caption"><h3>${esc(p[1])}</h3><p>${esc(p[2])}</p><a href="${p[3]}">查看完整作品 ↗</a></div>`:'<div class="sketch-endnote"><p>纸上的想法，<br>还在继续。</p><span>合上画册，回到桌面探索更多作品。</span></div>';
 }
 function pair(i){paint(left,i);paint(right,mobile.matches?i:i+1)}
 function controls(){
  const last=index+step()>=pages.length;
  dialog.querySelectorAll('.sketch-prev,#sketch-prev').forEach(b=>b.disabled=index===0);
  dialog.querySelectorAll('.sketch-next,#sketch-next').forEach(b=>b.disabled=last);
  document.querySelector('#sketch-status').textContent=mobile.matches?`${index+1} / ${pages.length}`:`${index+1} — ${Math.min(index+2,pages.length)} / ${pages.length}`;
  dialog.querySelectorAll('[data-sketch-chapter]').forEach(b=>b.setAttribute('aria-pressed',String(index>=+b.dataset.sketchChapter&&index<(+b.dataset.sketchChapter===0?2:+b.dataset.sketchChapter===2?6:pages.length))));
 }
 const decoded=el=>Promise.all([...el.querySelectorAll('img')].map(im=>im.decode().catch(()=>{})));
 function prepare(target){
  if(busy||target<0||target>=pages.length||target===index)return false;
  busy=true;const dir=target>index?1:-1;leaf.classList.toggle('backwards',dir<0);leaf.hidden=false;leaf.style.transition='none';leaf.style.transform='rotateY(0deg)';
  if(mobile.matches){paint(front,index);paint(back,target);paint(right,target)}
  else if(dir>0){paint(front,index+1);paint(back,target);paint(right,target+1)}
  else{paint(front,index);paint(back,target+1);paint(left,target)}
  return {dir,target};
 }
 function progress(dir,p){leaf.style.transform=`rotateY(${-dir*180*p}deg)`;leaf.style.setProperty('--page-shade',Math.sin(Math.PI*p)*.18)}
 async function settle(turn,commit=true){
  const id=++transitionId;const duration=reduced.matches?0:600;
  leaf.style.transition=`transform ${duration}ms cubic-bezier(.2,.65,.25,1)`;
  progress(turn.dir,commit?1:0);
  await new Promise(resolve=>{let timer;const done=()=>{clearTimeout(timer);leaf.removeEventListener('transitionend',onEnd);resolve()};const onEnd=e=>{if(e.target===leaf&&e.propertyName==='transform')done()};leaf.addEventListener('transitionend',onEnd);timer=setTimeout(done,duration+70)});
  if(id!==transitionId)return;
  const target=commit?turn.target:index;pair(target);await Promise.all([decoded(left),decoded(right)]);
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  if(id!==transitionId)return;
  index=target;controls();leaf.hidden=true;busy=false;
 }
 async function turn(target){const t=prepare(target);if(!t)return;await Promise.all([decoded(front),decoded(back),decoded(right),decoded(left)]);requestAnimationFrame(()=>requestAnimationFrame(()=>settle(t)))}
 dialog.querySelectorAll('.sketch-prev,#sketch-prev').forEach(b=>b.onclick=()=>turn(index-step()));
 dialog.querySelectorAll('.sketch-next,#sketch-next').forEach(b=>b.onclick=()=>turn(index+step()));
 dialog.querySelectorAll('[data-sketch-chapter]').forEach(b=>b.onclick=()=>turn(+b.dataset.sketchChapter));
 stage.addEventListener('click',e=>{const b=e.target.closest('[data-art]');if(!b||busy||suppressClick)return;location.href=pages[+b.dataset.art][3]});
 stage.addEventListener('pointerdown',e=>{
  if(busy||e.button!==0||e.target.closest('a,.sketch-edge'))return;
  const rect=stage.getBoundingClientRect();drag={x:e.clientX,y:e.clientY,width:rect.width/(mobile.matches?1:2),turn:null,p:0,id:e.pointerId};suppressClick=false;
 });
 stage.addEventListener('pointermove',e=>{
  if(!drag)return;const delta=drag.x-e.clientX;
  if(!drag.turn&&Math.abs(delta)>9){const dir=delta>0?1:-1;drag.turn=prepare(index+dir*step());if(!drag.turn){drag=null;return}stage.setPointerCapture(e.pointerId);suppressClick=true}
  if(drag.turn){drag.p=Math.max(0,Math.min(1,delta*drag.turn.dir/drag.width));progress(drag.turn.dir,drag.p)}
 });
 stage.addEventListener('pointerup',()=>{if(!drag)return;const d=drag;drag=null;if(d.turn){settle(d.turn,d.p>.18);setTimeout(()=>suppressClick=false,100)}});
 stage.addEventListener('pointercancel',()=>{if(drag?.turn)settle(drag.turn,false);drag=null;suppressClick=false});
 dialog.addEventListener('keydown',e=>{if(zoom.open)return;if(e.key==='ArrowRight'){e.preventDefault();turn(index+step())}if(e.key==='ArrowLeft'){e.preventDefault();turn(index-step())}});
 dialog.addEventListener('close',()=>{transitionId++;busy=false;drag=null;leaf.hidden=true;pair(index)});
 mobile.addEventListener('change',()=>{transitionId++;busy=false;drag=null;leaf.hidden=true;index=mobile.matches?index:Math.floor(index/2)*2;pair(index);controls()});
 const trigger=document.querySelector('.desk-sketchbook');
 trigger.addEventListener('click',()=>{
  const r=trigger.getBoundingClientRect();dialog.style.setProperty('--book-origin-x',`${r.left+r.width/2-innerWidth/2}px`);dialog.style.setProperty('--book-origin-y',`${r.top+r.height/2-innerHeight/2}px`);
  stage.focus({preventScroll:true});pages.forEach(p=>{const im=new Image();im.src=p[0];im.decode().catch(()=>{})});
 });
 pair(0);controls();
 if(location.hash==='#sketchbook'){dialog.showModal();stage.focus({preventScroll:true})}
})();
