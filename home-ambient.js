(()=>{
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const letters={H:['10001','10001','10001','11111','10001','10001','10001'],u:['00000','00000','10001','10001','10001','10011','01101'],i:['00100','00000','01100','00100','00100','00100','01110'],j:['00010','00000','00110','00010','00010','10010','01100'],n:['00000','00000','11110','10001','10001','10001','10001'],g:['00000','01101','10011','10001','01111','00001','01110'],G:['01110','10001','10000','10111','10001','10001','01110'],o:['00000','00000','01110','10001','10001','10001','01110']};
 const ns='http://www.w3.org/2000/svg',name='Huijing Gong';
 document.querySelectorAll('.desk-identity h1,.mobile-identity h1').forEach(heading=>{
 heading.setAttribute('aria-label',name);heading.classList.add('pixel-name');const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 74 11');svg.setAttribute('aria-hidden','true');const groups=[];let x=0;
 for(const char of name){const g=document.createElementNS(ns,'g');g.setAttribute('transform',`translate(${x} 1)`);if(char!==' ')letters[char].forEach((row,y)=>[...row].forEach((on,c)=>{if(on==='1'){const r=document.createElementNS(ns,'rect');r.setAttribute('x',c);r.setAttribute('y',y);r.setAttribute('width','.9');r.setAttribute('height','.9');g.append(r)}}));svg.append(g);groups.push({g,x});x+=char===' '?4:6}
 const caret=document.createElementNS(ns,'rect');caret.setAttribute('width','1');caret.setAttribute('height','7');caret.setAttribute('y','1');caret.classList.add('name-caret');svg.append(caret);heading.replaceChildren(svg);
 function paint(count){groups.forEach(({g},i)=>g.style.visibility=i<count?'visible':'hidden');caret.setAttribute('x',count===groups.length?x:groups[count].x);caret.style.display=reduced?'none':''}
 if(reduced){paint(name.length);return}let elapsed=0,last=performance.now();paint(0);
 setInterval(()=>{const now=performance.now(),dt=now-last;last=now;if(document.hidden||document.querySelector('dialog[open]'))return;elapsed=(elapsed+Math.min(dt,300))%14500;let count=elapsed<1900?Math.min(name.length,Math.floor(elapsed/145)):name.length;if(elapsed>13500)count=Math.max(0,name.length-Math.floor((elapsed-13500)/65));paint(count)},80);
 });
 const pet=document.querySelector('.desk-pet svg');pet?.insertAdjacentHTML('beforeend','<ellipse class="coffee-ripple" cx="525" cy="605" rx="23" ry="3" fill="none" stroke="#d4ae7d" stroke-width=".8" pointer-events="none"/>');
 document.querySelectorAll('.pinned-render svg,.pinned-type svg,.desk-model svg').forEach((svg,i)=>{const vb=svg.viewBox.baseVal;svg.insertAdjacentHTML('beforeend',`<g class="paper-glimmer" style="animation-delay:${i*2.7}s" pointer-events="none" transform="translate(${vb.x+vb.width*.53} ${vb.y+vb.height*.12})"><path d="M-5 0H5M0-5V5" stroke="#fff2bc" stroke-width="1.4" stroke-linecap="round"/></g>`)});


})();
