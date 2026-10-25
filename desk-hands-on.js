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
 grip.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();const p=position(e);grip.setPointerCapture(e.pointerId);const path=document.createElementNS(ns,'path');path.setAttribute('d','M532 832');drawing.append(path);if(drawing.children.length>25)drawing.firstElementChild.remove();sketch={id:e.pointerId,start:p,path,d:'M532 832'};pencil.classList.add('held');pencil.parentElement.style.zIndex='13';pencil.querySelector('.pencil-roll').style.animationPlayState='paused'});
 grip.addEventListener('pointermove',e=>{if(!sketch)return;const p=position(e),dx=p.x-sketch.start.x,dy=p.y-sketch.start.y;pencil.style.transform=`translate(${dx*world.clientWidth/1672}px,${dy*world.clientHeight/941}px)`;if(832+dy>=740){sketch.d+=` L${(532+dx).toFixed(1)} ${(832+dy).toFixed(1)}`;sketch.path.setAttribute('d',sketch.d)}else sketch.d+=` M${(532+dx).toFixed(1)} ${(832+dy).toFixed(1)}`});
 function putBack(e){if(!sketch)return;sketch=null;pencil.classList.remove('held');pencil.parentElement.style.zIndex='';pencil.style.transform='';pencil.querySelector('.pencil-roll').style.animationPlayState='';if(grip.hasPointerCapture(e.pointerId))grip.releasePointerCapture(e.pointerId)}
 for(const type of ['pointerup','pointercancel','lostpointercapture'])grip.addEventListener(type,putBack);grip.addEventListener('dblclick',()=>drawing.replaceChildren());grip.addEventListener('keydown',e=>{if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();drawing.replaceChildren()}});
 return true}
 if(!attach()){const observer=new MutationObserver(()=>{if(attach())observer.disconnect()});observer.observe(world,{childList:true,subtree:true})}
})();
