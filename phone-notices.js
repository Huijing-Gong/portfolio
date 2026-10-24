(()=>{
 const phone=document.querySelector('.desk-phone');if(!phone)return;
 const svg=phone.querySelector('svg'),reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const notices=[
 {icon:'assets/desk/dogo-icon.png',title:'出去走走吧',message:'附近发现了新的好去处'},
 {icon:'assets/desk/meow-icon.png',title:'小猫在等你',message:'记下今天的陪伴时光'},
 {icon:'assets/desk/cookup-icon-new.png',title:'今晚一起做饭？',message:'邻居发来了一份邀请'}
 ];
 const rows=notices.map((n,i)=>`<g class="lock-notice notice-${i}" transform="translate(2 ${43+i*19})"><rect width="63" height="18" rx="5" fill="#edf2e6" fill-opacity=".93"/><image href="${n.icon}" x="3" y="4" width="10" height="10" preserveAspectRatio="xMidYMid meet"/><text x="16" y="7.5" font-size="4.6" font-weight="600" fill="#34463d">${n.title}</text><text x="16" y="13.5" font-size="3.4" fill="#647269">${n.message}</text><text x="59" y="5" text-anchor="end" font-size="2.8" fill="#819086">现在</text></g>`).join('');
 svg.insertAdjacentHTML('beforeend',`<g class="phone-live" pointer-events="none" aria-hidden="true" clip-path="url(#phone-inner-contour)"><defs><clipPath id="phone-inner-contour"><path d="M1163.5 623.7 L1177.8 624.2 L1179 628.8 Q1179.5 630.1 1181.3 630.1 L1208.2 631 Q1210.4 631 1211 628.6 L1212.2 625.6 L1228.7 626.4 Q1234.5 626.4 1233.4 633.8 L1214.4 761.5 Q1213.5 768.4 1208 768.4 L1142.5 764.3 Q1137.6 764 1138.6 757.7 L1157.6 630.7 Q1158.5 623.5 1163.5 623.7Z"/></clipPath></defs><rect class="phone-dark-screen" x="1136" y="620" width="102" height="155" fill="#253137"/><g transform="matrix(1.075 .045 -.204 1.285 1161 625)"><defs><clipPath id="phone-screen-live"><rect width="67" height="108" rx="3"/></clipPath><linearGradient id="lock-wallpaper" x2="1" y2="1"><stop stop-color="#b4d2c4"/><stop offset="1" stop-color="#e9dfb7"/></linearGradient></defs><g class="phone-awake-content"><rect x="-6" y="-6" width="82" height="126" fill="url(#lock-wallpaper)"/><path d="M-15 94Q20 29 82 66V115H-15Z" fill="#719b8a" opacity=".2"/><text x="33" y="13" text-anchor="middle" fill="#53695b" font-size="4.5">今天，也是好的一天</text><text x="33" y="33" text-anchor="middle" fill="#435e50" font-size="20" font-family="Arial, sans-serif" font-style="normal" font-weight="500">09:41</text>${rows}<rect x="24" y="104" width="19" height="1.5" rx=".75" fill="#fafaf1"/></g></g></g>`);
 const live=svg.querySelector('.phone-live');let phase=0;
 if(!reduced)setInterval(()=>{
 if(document.hidden||document.querySelector('dialog[open]'))return;
 phase=(phase+1)%14;
 if(phase===2)live.classList.add('screen-awake');
 if(phase===3)live.classList.add('message-1');
 if(phase===5)live.classList.add('message-2');
 if(phase===7)live.classList.add('message-3');
 if(phase===10)live.classList.remove('screen-awake');
 if(phase===12)live.classList.remove('message-1','message-2','message-3');
 },1000);
 phone.querySelector('.item-label small').textContent='点开手机，探索我的三个 APP';
})();
