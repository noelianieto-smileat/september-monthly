$('hdr').innerHTML=header('es');
$('ftr').innerHTML=footer('Smileat · Reporte septiembre 2026 · Promociones · España');
$('collage').innerHTML=collage('es',['img2','img3','img4'],'-25%','3 PRIMEROS PACKS');
const M=DATA.meta_es,T=DATA.totals,gg=DATA.google.groups;
const G={cost:gg.reduce((a,g)=>a+g.cost,0),val:gg.reduce((a,g)=>a+g.val,0),conv:gg.reduce((a,g)=>a+g.conv,0)};
const spend=T.spend_meta_es+G.cost,val=T.val_meta_es+G.val;
$('kpis').innerHTML=kpis([[eur(spend),'Inversión Meta + Google','var(--blue)'],[eur(val),'Valor de conversión Meta + Google','var(--green)'],[x(val/spend),'ROAS combinado','var(--pink)'],[num(T.res_meta_es+Math.round(G.conv)),'Compras (Meta) + conversiones (Google)','var(--yellow)']]);
const best1=M[0],bestRoas=[...M].sort((a,b)=>b.roas-a.roas)[0],low=[...M].sort((a,b)=>a.roas-b.roas)[0];
const mRoas=T.val_meta_es/T.spend_meta_es,gRoas=G.val/G.cost;
$('insights').innerHTML=[
 [Math.round(best1.res/T.res_meta_es*100)+'%',`de las compras de Meta vienen de ${best1.name.split('-')[0]}, con ${Math.round(best1.spend/T.spend_meta_es*100)}% de la inversión.`,'var(--blue)'],
 [x(bestRoas.roas),`ROAS más alto en Meta: ${bestRoas.name.split('-')[0]}. IMG3 y los dos vídeos superan 6x.`,'var(--green)'],
 [x(gRoas),`ROAS de Google Ads (PMax) frente a ${x(mRoas)} en Meta.`,'var(--pink)'],
 [x(low.roas),`ROAS de ${low.name.split('-')[0]}, la creatividad con peor resultado en Meta.`,'var(--purple)']
].map(([n,t,c])=>`<div class="insight" style="--c:${c}"><div class="num">${n}</div><p>${t}</p></div>`).join('');
$('grid').innerHTML=M.map((c,i)=>{const id=c.id,vid=id.startsWith('vid');
return `<article class="card ${i==0?'top':''}"><div class="media"><img src="assets/es/${id}.jpg" alt="${c.name}" loading="lazy"><span class="rank">#${i+1}</span><span class="tag">${vid?'Vídeo':'Imagen'}</span>${vid?'<span class="play"></span>':''}</div>
<div class="body"><h3>${c.name}</h3><div class="big">${num(c.res)}<small>compras</small></div><div class="stats">${stat('ROAS',x(c.roas)).replace('class="stat"','class="stat hi"')}${stat('Valor de compra',eur(c.val))}${stat('Inversión',eur(c.spend,2))}${stat('Coste por compra',eur(c.cpa,2))}${stat('CTR',num(c.ctr,2)+'%')}${stat('Impresiones',num(c.impr))}</div></div></article>`}).join('');
const short=c=>c.id.toUpperCase();
$('b-res').innerHTML=bars(M.map(c=>({n:short(c),v:c.res,l:num(c.res)})),'var(--blue)');
$('b-roas').innerHTML=bars([...M].sort((a,b)=>b.roas-a.roas).map(c=>({n:short(c),v:c.roas,l:x(c.roas)})),'var(--green)');
const gnames=['PMáx · Suscripción','PMáx · Lanzamientos/Promos'],gcol=['var(--blue)','var(--orange)'];
const gs=DATA.google.groups;
$('google').innerHTML=gs.map((g,i)=>`<div class="gcard" style="--c:${gcol[i]}"><h3>${gnames[i]}</h3><div class="sub">Grupo de recursos: ${g.n}</div><div class="num">${x(g.val/g.cost)}<small>ROAS</small></div><div class="stats">${stat('Inversión',eur(g.cost,2))}${stat('Valor de conv.',eur(g.val))}${stat('Conversiones',num(g.conv,1))}${stat('Coste/conv.',eur(g.cost/g.conv,2))}${stat('Clics',num(g.clicks))}${stat('CTR',g.ctr)}</div></div>`).join('');
;
const prod=(t,s,g,c)=>{const m=Math.max(...g.top.map(p=>p.q));return `<div class="panel"><h3>${t}</h3><div class="sub">${s}</div>${g.top.map((p,i)=>`<div class="prod" style="--c:${c}"><span class="i">${i+1}</span><span class="nm">${p.n}<span class="t"><i style="width:${p.q/m*100}%"></i></span></span><span class="v"><b>${p.q} uds</b><em>${eur(p.r,2)}</em></span></div>`).join('')}</div>`};
$('prods').innerHTML=prod('Meta Ads',`${num(DATA.ga_meta.total_q)} artículos comprados · ${eur(DATA.ga_meta.total_r)} de ingresos`,DATA.ga_meta,'var(--blue)')+prod('Google Ads',`${num(DATA.ga_google.total_q)} artículos comprados · ${eur(DATA.ga_google.total_r)} de ingresos`,DATA.ga_google,'var(--orange)');
$('b-ga-meta').innerHTML=bars(DATA.ga_meta.by_creative.map(c=>({n:c.n.toUpperCase(),v:c.q,l:num(c.q)})),'var(--blue)');
const cn={'ES | PMÁX | Suscripción':'PMáx · Suscripción','ES | ESP | Search | Suscripción | Smileat':'Search · Suscripción','ES | DEMAND GEN | Suscripción':'Demand Gen'};
$('b-ga-google').innerHTML=bars(DATA.ga_google.by_camp.map(c=>({n:cn[c.n]||c.n,v:c.q,l:num(c.q)})),'var(--orange)');

const MIMO=[
 {l:'M',t:'Mantener',d:'Lo que funciona y seguimos haciendo',c:'var(--green)',items:[]},
 {l:'I',t:'Incorporar',d:'Lo nuevo que vamos a probar',c:'var(--blue)',items:[]},
 {l:'M',t:'Mejorar',d:'Lo que funciona a medias y se puede optimizar',c:'var(--yellow)',dk:1,items:[]},
 {l:'O',t:'Omitir',d:'Lo que dejamos de hacer',c:'var(--pink)',items:[]}
];
$('mimo-grid').innerHTML=MIMO.map(m=>`<article class="mimo-card${m.dk?' dk':''}" style="--c:${m.c}"><div class="top"><span class="letter">${m.l}</span><div><h3>${m.t}</h3><small>${m.d}</small></div></div><ul>${m.items.length?m.items.map(i=>`<li>${i}</li>`).join(''):'<li class="empty">Información pendiente de completar</li>'}</ul></article>`).join('');
animate();
