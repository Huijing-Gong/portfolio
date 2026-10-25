(()=>{
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const entries=[['computer-dialog','.desk-laptop'],['sketchbook-dialog','.desk-sketchbook'],['research-dialog','.research-folder'],['stage-dialog','.stage-mannequin'],['about-dialog','.contact-note']];
 for(const [id,selector] of entries){const dialog=document.getElementById(id),source=document.querySelector(selector);if(!dialog||!source)continue;dialog.classList.add('object-dialog-motion');let animation=null,closing=false;
 function origin(){const a=source.getBoundingClientRect(),b=dialog.getBoundingClientRect();return `translate(${a.left+a.width/2-b.left-b.width/2}px,${a.top+a.height/2-b.top-b.height/2}px) scale(${Math.max(.12,a.width/b.width)},${Math.max(.12,a.height/b.height)})`}
 dialog.addEventListener('toggle',()=>{if(!dialog.open){animation?.cancel();closing=false;return}if(reduced.matches)return;animation?.cancel();dialog.style.transformOrigin='50% 50%';animation=dialog.animate([{transform:origin(),opacity:.12},{transform:'translate(0,0) scale(1,1)',opacity:1}],{duration:580,easing:'cubic-bezier(.22,.8,.22,1)'});});
 async function close(){if(closing||!dialog.open)return;if(reduced.matches){dialog.close();return}closing=true;animation?.cancel();animation=dialog.animate([{transform:'translate(0,0) scale(1,1)',opacity:1},{transform:origin(),opacity:0}],{duration:380,easing:'cubic-bezier(.4,0,.25,1)',fill:'forwards'});try{await animation.finished}catch{}dialog.close();animation?.cancel();closing=false;source.focus({preventScroll:true})}
 dialog.addEventListener('cancel',e=>{e.preventDefault();close()});
 dialog.addEventListener('click',e=>{if(e.target.closest('.dialog-close')){e.preventDefault();e.stopImmediatePropagation();close();return}if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){e.stopImmediatePropagation();close()}}},true);
 }
})();
