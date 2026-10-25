(()=>{
 const world=document.querySelector('.desk-world');if(!world)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 // Pull the real paper group; ordinary clicks still open the existing directory.
 const folder=world.querySelector('.research-folder'),sheets=folder?.querySelector('.research-sheets');
 if(folder&&sheets){let pull=null,suppress=false;
 folder.style.touchAction='none';folder.querySelector('small').textContent='向上抽出纸张，打开研究作品 · 也可点击';
 folder.addEventListener('pointerdown',e=>{if(e.button!==0)return;pull={id:e.pointerId,x:e.clientX,y:e.clientY,amount:0};folder.setPointerCapture(e.pointerId)});
 folder.addEventListener('pointermove',e=>{if(!pull)return;const r=folder.getBoundingClientRect();pull.amount=Math.max(0,Math.min(r.height*.8,pull.y-e.clientY));if(Math.hypot(e.clientX-pull.x,e.clientY-pull.y)>6)suppress=true;sheets.style.transition='none';sheets.style.transform=`translate(${pull.amount*.24*290/r.width}px,${-pull.amount*170/r.height}px)`});
 function release(e,cancel=false){if(!pull)return;const open=!cancel&&pull.amount>Math.min(30,folder.clientHeight*.3);pull=null;sheets.style.transition=reduced?'none':'transform .45s cubic-bezier(.2,.8,.2,1)';sheets.style.transform='';if(folder.hasPointerCapture(e.pointerId))folder.releasePointerCapture(e.pointerId);if(open)document.querySelector('#research-dialog').showModal();setTimeout(()=>suppress=false,0)}
 folder.addEventListener('pointerup',e=>release(e));folder.addEventListener('pointercancel',e=>release(e,true));folder.addEventListener('click',e=>{if(suppress){e.preventDefault();e.stopImmediatePropagation()}},true);
 }
 function attach(){const pencil=world.querySelector('.object-pencil'),foliage=world.querySelector('.plant-foliage');if(!pencil||!foliage)return false;
 const ns='http://www.w3.org/2000/svg',drawing=document.createElementNS(ns,'svg');drawing.classList.add('desk-doodles');drawing.setAttribute('viewBox','0 0 1672 941');drawing.setAttribute('aria-hidden','true');world.append(drawing);
 const grip=document.createElement('button');grip.className='pencil-grip';grip.setAttribute('aria-label','拿起铅笔在桌面画线；双击铅笔擦除');grip.innerHTML='<span>拖动铅笔，在桌上画几笔 · 双击擦除</span>';world.append(grip);let sketch=null;
 function position(e){const r=world.getBoundingClientRect();return {x:(e.clientX-r.left)*1672/r.width,y:(e.clientY-r.top)*941/r.height}}
 grip.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();const p=position(e);grip.setPointerCapture(e.pointerId);const path=document.createElementNS(ns,'path');path.setAttribute('d',`M${p.x} ${p.y}`);drawing.append(path);if(drawing.children.length>25)drawing.firstElementChild.remove();sketch={id:e.pointerId,start:p,path,d:`M${p.x} ${p.y}`};pencil.classList.add('held');pencil.querySelector('.pencil-roll').style.animationPlayState='paused'});
 grip.addEventListener('pointermove',e=>{if(!sketch)return;const p=position(e),dx=p.x-sketch.start.x,dy=p.y-sketch.start.y;pencil.style.transform=`translate(${dx*world.clientWidth/1672}px,${dy*world.clientHeight/941}px)`;if(p.y>=740){sketch.d+=` L${p.x.toFixed(1)} ${p.y.toFixed(1)}`;sketch.path.setAttribute('d',sketch.d)}else sketch.d+=` M${p.x.toFixed(1)} ${p.y.toFixed(1)}`});
 function putBack(e){if(!sketch)return;sketch=null;pencil.classList.remove('held');pencil.style.transform='';pencil.querySelector('.pencil-roll').style.animationPlayState='';if(grip.hasPointerCapture(e.pointerId))grip.releasePointerCapture(e.pointerId)}
 for(const type of ['pointerup','pointercancel','lostpointercapture'])grip.addEventListener(type,putBack);grip.addEventListener('dblclick',()=>drawing.replaceChildren());grip.addEventListener('keydown',e=>{if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();drawing.replaceChildren()}});
 const leafGrip=document.createElement('button');leafGrip.className='plant-grip';leafGrip.setAttribute('aria-label','轻拨盆栽叶片');leafGrip.innerHTML='<span>轻轻拖动，拨一拨叶片</span>';world.append(leafGrip);let leaf=null;
 function sway(deg){foliage.style.animation='none';foliage.style.transform=`rotate(${deg}deg)`}
 leafGrip.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();leaf={id:e.pointerId,x:e.clientX};leafGrip.setPointerCapture(e.pointerId);sway(0)});
 leafGrip.addEventListener('pointermove',e=>{if(leaf)sway(Math.max(-14,Math.min(14,(e.clientX-leaf.x)/5)))});
 function settle(e){if(!leaf)return;leaf=null;const start=foliage.style.transform;foliage.style.transform='';if(!reduced){const anim=foliage.animate([{transform:start},{transform:'rotate(-5deg)',offset:.35},{transform:'rotate(3deg)',offset:.62},{transform:'rotate(0deg)'}],{duration:850,easing:'ease-out'});anim.onfinish=()=>foliage.style.animation=''}else foliage.style.animation='';if(leafGrip.hasPointerCapture(e.pointerId))leafGrip.releasePointerCapture(e.pointerId)}
 for(const type of ['pointerup','pointercancel','lostpointercapture'])leafGrip.addEventListener(type,settle);leafGrip.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();foliage.animate([{transform:'rotate(0deg)'},{transform:'rotate(9deg)'},{transform:'rotate(-5deg)'},{transform:'rotate(0deg)'}],{duration:reduced?0:850})}});
 return true}
 if(!attach()){const observer=new MutationObserver(()=>{if(attach())observer.disconnect()});observer.observe(world,{childList:true,subtree:true})}
})();
