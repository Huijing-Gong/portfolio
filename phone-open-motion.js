(()=>{
 const phone=document.querySelector('.desk-phone'),dialog=document.querySelector('#phone-dialog'),screen=dialog?.querySelector('.phone-os');if(!phone||!screen)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let moving=null,closing=false;
 function smallPose(){const from=(phone.querySelector('.phone-live')||phone).getBoundingClientRect(),to=screen.getBoundingClientRect();return `translate(${from.left+from.width/2-to.left-to.width/2}px,${from.top+from.height/2-to.top-to.height/2}px) rotate(8deg) scale(${from.width/to.width},${from.height/to.height})`}
 function fadeContent(open){const nodes=screen.querySelectorAll('.phone-heading,.app-launcher,.phone-footnote,.phone-dock');for(const node of nodes)node.animate(open?[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}]:[{opacity:1},{opacity:0}],{duration:open?300:160,delay:open?240:0,fill:'backwards',easing:'ease-out'})}
 function open(e){e.preventDefault();e.stopImmediatePropagation();if(dialog.open||closing)return;dialog.showModal();if(reduced.matches)return;moving?.cancel();screen.style.transformOrigin='50% 50%';fadeContent(true);moving=screen.animate([{transform:smallPose(),opacity:.7,borderRadius:'18px'},{transform:'translate(0,0) rotate(0) scale(1)',opacity:1,borderRadius:'43px'}],{duration:620,easing:'cubic-bezier(.22,.8,.22,1)'});}
 async function close(){if(closing||!dialog.open)return;if(reduced.matches){dialog.close();return}closing=true;moving?.cancel();fadeContent(false);moving=screen.animate([{transform:'translate(0,0) rotate(0) scale(1)',opacity:1},{transform:smallPose(),opacity:0}],{duration:420,easing:'cubic-bezier(.4,0,.25,1)',fill:'forwards'});try{await moving.finished}catch{}dialog.close();moving?.cancel();closing=false;phone.focus({preventScroll:true})}
 phone.addEventListener('click',open,true);
 dialog.querySelector('.dialog-close').addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();close()},true);
 dialog.addEventListener('cancel',e=>{e.preventDefault();close()});
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){e.stopImmediatePropagation();close()}},true);
})();
