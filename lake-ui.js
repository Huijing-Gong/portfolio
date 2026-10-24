window.lakeUIMedia={
  "items": [
    {
      "src": "assets/lake-ui/ui-01.gif",
      "title": "对话框 · 初稿",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-02.gif",
      "title": "对话框 · 透明动效",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-03.gif",
      "title": "对话框 · 主世界预览",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-04.png",
      "title": "对话框 · P5R 风格探索",
      "animated": false
    },
    {
      "src": "assets/lake-ui/ui-05.gif",
      "title": "暂停界面",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-07.png",
      "title": "场景互动按钮",
      "animated": false
    },
    {
      "src": "assets/lake-ui/ui-08.gif",
      "title": "道具获得 · 第一版",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-09.gif",
      "title": "道具获得 · 透明动效",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-10.gif",
      "title": "道具获得 · 主世界预览",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-11.png",
      "title": "背包 · 整体布局",
      "animated": false
    },
    {
      "src": "assets/lake-ui/ui-12.gif",
      "title": "装备栏 · 动效细节",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-13.gif",
      "title": "装备栏 · 主世界预览",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-14.gif",
      "title": "Practice Sword",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-15.gif",
      "title": "Reinforced Sword",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-16.gif",
      "title": "Ruin Armour",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-17.gif",
      "title": "Lake Charm",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-18.gif",
      "title": "Health Pendant",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-19.gif",
      "title": "Climbing Gloves",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-20.gif",
      "title": "生命、能量与死亡状态",
      "animated": true
    },
    {
      "src": "assets/lake-ui/ui-21.png",
      "title": "地图 · 视觉方案",
      "animated": false
    },
    {
      "src": "assets/lake-ui/ui-22.png",
      "title": "小地图 · 界面框架",
      "animated": false
    }
  ],
  "groups": [
    {
      "title": "对话与角色",
      "text": "从初版信息框到透明动效、主世界叠加与另一种视觉风格。",
      "ids": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "title": "暂停与互动",
      "text": "暂停菜单的入场节奏，以及场景中清楚、简短的互动提示。",
      "ids": [
        4,
        5
      ]
    },
    {
      "title": "道具获得",
      "text": "让奖励的出现、物件与名称成为一次完整的反馈。",
      "ids": [
        6,
        7,
        8
      ]
    },
    {
      "title": "背包与装备",
      "text": "整体布局、装备栏动效和放回主世界后的显示效果。",
      "ids": [
        9,
        10,
        11
      ]
    },
    {
      "title": "道具图标",
      "text": "六种道具分别保留原始图形与动画。",
      "ids": [
        12,
        13,
        14,
        15,
        16,
        17
      ],
      "icons": true
    },
    {
      "title": "状态与地图",
      "text": "生命与能量的状态表现，以及地图和小地图的视觉设计。",
      "ids": [
        18,
        19,
        20
      ]
    }
  ]
};
window.mountLakeUI=(host,enlarge)=>{
 const {items,groups}=window.lakeUIMedia;
 host.innerHTML=`<section class="lake-ui-gallery"><header class="lake-ui-intro"><span class="eyebrow">Lake Domain · 界面与动效设计</span><h2>让界面，也成为旅程的一部分。</h2><p>对话、暂停、奖励、背包与地图。这里展示我在项目中制作和整理的界面版本，动图保留原始动画。</p></header><nav class="lake-ui-jumps" aria-label="UI 设计分类">${groups.map((g,i)=>`<a href="#lake-ui-group-${i}">${g.title} ↓</a>`).join('')}</nav>${groups.map((g,i)=>`<section class="lake-ui-group" id="lake-ui-group-${i}"><header><span>${String(i+1).padStart(2,'0')}</span><div><h3>${g.title}</h3><p>${g.text}</p></div></header><div class="lake-ui-grid ${g.icons?'is-icons':''}">${g.ids.map(id=>{const a=items[id];return `<figure><button data-ui-open="${id}" aria-label="放大 ${a.title}"><img src="${a.src}" alt="${a.title}" loading="lazy" decoding="async"><span class="lake-ui-expand" aria-hidden="true">↗</span></button><figcaption><span>${a.title}</span><small>${a.animated?'GIF 动效':'静态设计'}</small></figcaption></figure>`}).join('')}</div></section>`).join('')}</section>`;
 host.querySelectorAll('[data-ui-open]').forEach(b=>b.onclick=()=>{const a=items[+b.dataset.uiOpen];enlarge(a.src,a.title)});
};
window.addEventListener('DOMContentLoaded',()=>{const copy=document.querySelector('#research-step-4 .chapter-copy');if(!copy)return;const b=document.createElement('button');b.className='lake-ui-process-link';b.textContent='查看全部 UI 与动效 ↗';b.onclick=()=>{document.querySelector('[data-view="ui"]').click();document.querySelector('#project-view').scrollIntoView({behavior:'smooth',block:'start'})};copy.append(b);});
