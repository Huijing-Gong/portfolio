(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const active=new WeakSet();
 function unfold(table){
  if(active.has(table)||table.hidden||!table.classList.contains('is-dealt'))return;
  active.add(table);const button=table.querySelector('.sd-map'),img=button?.querySelector('img');
  if(!img||reduced.matches)return;
  const start=()=>{
   if(table.hidden||!img.isConnected){active.delete(table);return}
   const h=img.clientHeight,w=Math.min(img.clientWidth,h*img.naturalWidth/img.naturalHeight);if(!w||!h){active.delete(table);return}
   const canvas=document.createElement('canvas'),d=Math.min(devicePixelRatio||1,2);canvas.width=(w+24)*d;canvas.height=(h+64)*d;
   canvas.style.cssText=`position:absolute;left:50%;top:-24px;transform:translateX(-50%);width:${w+24}px;height:${h+64}px;pointer-events:none;z-index:2`;
   button.style.position='relative';button.append(canvas);img.style.visibility='hidden';const ctx=canvas.getContext('2d'),t0=performance.now();
   function done(){img.style.visibility='';canvas.remove()}
   function frame(now){
    if(!img.isConnected||table.hidden){done();return}
    const t=Math.min(1,(now-t0)/1250),p=1-Math.pow(1-t,3),length=h*p,r=26*Math.pow(1-p,.65),top=24;
    ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w+24,h+64);
    ctx.save();ctx.shadowColor='#0008';ctx.shadowBlur=12;ctx.shadowOffsetY=6;
    if(length>0)ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight*p,12,top,w,length);ctx.restore();
    if(r>.25){
     // Project the final strips around a cylinder, including the pale paper reverse.
     for(let i=0;i<48;i++){
      const a=i/48*Math.PI,b=(i+1)/48*Math.PI,y=top+length+Math.sin(a)*r,y2=top+length+Math.sin(b)*r;
      const sy=Math.min(.999,p+(a/Math.PI)*Math.min(1-p,.14));
      if(i<24){ctx.fillStyle=`rgb(${Math.round(200+35*Math.sin(a))},${Math.round(194+34*Math.sin(a))},${Math.round(161+29*Math.sin(a))})`;ctx.fillRect(12,y,w,Math.max(.7,y2-y+1));}
      else{const hh=Math.max(.6,Math.abs(y2-y));ctx.drawImage(img,0,sy*img.naturalHeight,img.naturalWidth,Math.max(1,img.naturalHeight*.14/48),12,y2,w,hh+1);ctx.fillStyle=`rgba(0,0,0,${.3*Math.abs(Math.cos(a))})`;ctx.fillRect(12,y2,w,hh+1)}
     }
     for(const x of [12,12+w]){ctx.beginPath();ctx.ellipse(x,top+length+r*.5,2,r*.5,0,0,Math.PI*2);ctx.fillStyle='#b8b08b';ctx.fill()}
    }
    if(t<1)requestAnimationFrame(frame);else done();
   }requestAnimationFrame(frame);
  };if(img.complete&&img.naturalWidth)start();else img.addEventListener('load',start,{once:true});
 }
 function scan(){document.querySelectorAll('.sd-open-table').forEach(t=>{if(t.hidden)active.delete(t);else unfold(t)})}
 const style=document.createElement('style');style.textContent='.is-dealt .sd-map{animation:none!important}';document.head.append(style);
 new MutationObserver(scan).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','class']});scan();
})();
