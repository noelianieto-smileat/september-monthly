$('hdr').innerHTML=header('es');
$('ftr').innerHTML=footer('Smileat · Reporte septiembre 2026 · España');
const M=DATA.meta_es,T=M.tot,A=DATA.ga;
const roas=T.val/T.spend;
$('collage').innerHTML=collage('es',['promo_img2','susc1','kids1'],x(roas),'ROAS META');
$('kpis').innerHTML=kpis([[eur(T.spend),'Inversión en Meta Ads','var(--blue)'],[eur(T.val),'Valor de compra Meta','var(--green)'],[x(roas),'ROAS Meta','var(--pink)'],[num(T.purch),'Compras atribuidas','var(--yellow)'],[num(T.impr),'Impresiones','var(--purple)']]);
const F=M.fams.filter(f=>f.spend>50),FP=F.filter(f=>f.purch>0&&f.spend>500);
const fr=f=>f.val/f.spend;
const bestF=[...FP].sort((a,b)=>fr(b)-fr(a))[0],lowF=[...FP].sort((a,b)=>fr(a)-fr(b))[0];
const promoF=M.fams.find(f=>f.n=='Promo Suscripción');
const gE=A.es_google,topCamp=gE.camps[0];
$('insights').innerHTML=[
 [Math.round(promoF.purch/T.purch*100)+'%',`de las compras de Meta vienen de la Promo Suscripción, con el ${Math.round(promoF.spend/T.spend*100)}% de la inversión y un ROAS de ${x(fr(promoF))}.`,'var(--blue)'],
 [x(fr(bestF)),`ROAS más alto entre las campañas con inversión relevante: ${bestF.n}, con ${num(bestF.purch)} compras.`,'var(--green)'],
 [x(fr(lowF)),`ROAS de ${lowF.n}, la campaña con peor resultado y el ${Math.round(lowF.spend/T.spend*100)}% de la inversión.`,'var(--pink)'],
 [Math.round(topCamp.q/gE.tot.q*100)+'%',`de los artículos comprados desde Google Ads vienen de ${topCamp.n} (${num(topCamp.q)} de ${num(gE.tot.q)}, según GA4).`,'var(--purple)']
].map(([n,t,c])=>`<div class="insight" style="--c:${c}"><div class="num">${n}</div><p>${t}</p></div>`).join('');
$('fams').innerHTML=F.map((f,i)=>{const c=FC[i%6],seg=f.n=='Seguidores y perfil';
return `<div class="gcard" style="--c:${c}"><h3>${f.n}</h3><div class="sub">${f.ads} anuncios con inversión · ${num(f.spend/T.spend*100,1)}% de la inversión</div>${seg?`<div class="num">${num(f.visits)}<small>visitas al perfil</small></div><div class="stats">${stat('Inversión',eur(f.spend,2))}${stat('Coste por visita',eur(f.spend/f.visits,2))}${stat('Impresiones',num(f.impr))}${stat('Clics',num(f.clicks))}</div>`:`<div class="num">${x(fr(f))}<small>ROAS</small></div><div class="stats">${stat('Inversión',eur(f.spend,2))}${stat('Valor de compra',eur(f.val))}${stat('Compras',num(f.purch))}${stat('Coste por compra',f.purch?eur(f.spend/f.purch,2):'–')}${stat('Impresiones',num(f.impr))}${stat('Clics',num(f.clicks))}</div>`}</div>`}).join('');
$('b-fsp').innerHTML=bars(F.map((f,i)=>({n:f.n,v:f.spend,l:eur(f.spend),c:FC[i%6]})),'var(--blue)');
$('b-froas').innerHTML=bars(F.map((f,i)=>({f,i})).filter(o=>o.f.purch>0).sort((a,b)=>fr(b.f)-fr(a.f)).map(o=>({n:o.f.n,v:fr(o.f),l:x(fr(o.f)),c:FC[o.i%6]})),'var(--green)');
const C=M.ads;
$('grid').innerHTML=C.map((c,i)=>{const vid=c.vid;
return `<article class="card ${i==0?'top':''}">${media('es',c,i,vid)}<div class="body"><h3>${c.name}</h3><div class="fam">${c.fam}</div><div class="big">${num(c.purch)}<small>compras</small></div><div class="stats">${stat('ROAS',x(c.val/c.spend)).replace('class="stat"','class="stat hi"')}${stat('Valor de compra',eur(c.val))}${stat('Inversión',eur(c.spend,2))}${stat('Coste por compra',eur(c.spend/c.purch,2))}${stat('CTR',num(c.clicks/c.impr*100,2)+'%')}${stat('Impresiones',num(c.impr))}</div></div></article>`}).join('');
$('b-res').innerHTML=bars(C.map(c=>({n:short(c.name),v:c.purch,l:num(c.purch)})),'var(--blue)');
$('b-roas').innerHTML=bars(C.filter(c=>c.spend>300).sort((a,b)=>b.val/b.spend-a.val/a.spend).map(c=>({n:short(c.name),v:c.val/c.spend,l:x(c.val/c.spend)})),'var(--green)');
const gcol=['var(--blue)','var(--orange)','var(--green)','var(--pink)','var(--purple)','var(--yellow)','var(--navy)'];
$('google').innerHTML=gE.camps.map((g,i)=>`<div class="gcard" style="--c:${gcol[i%7]}"><h3>${g.n}</h3><div class="sub">GA4 · sesiones de Google Ads</div><div class="num">${num(g.q)}<small>artículos comprados</small></div><div class="stats">${stat('Ingresos de artículo',eur(g.r))}${stat('Añadidos al carrito',num(g.cart))}${stat('Ingreso por artículo',eur(g.r/g.q,2))}${stat('% de artículos Google',num(g.q/gE.tot.q*100,1)+'%')}</div></div>`).join('');
const prod=(t,s,g,c)=>{const m=Math.max(...g.top.map(p=>p.q));return `<div class="panel"><h3>${t}</h3><div class="sub">${s}</div>${g.top.map((p,i)=>`<div class="prod" style="--c:${c}"><span class="i">${i+1}</span><span class="nm">${p.n}<span class="t"><i style="width:${p.q/m*100}%"></i></span></span><span class="v"><b>${p.q} uds</b><em>${eur(p.r,2)}</em></span></div>`).join('')}</div>`};
$('prods').innerHTML=prod('Meta Ads',`${num(A.es_meta.tot.q)} artículos comprados · ${eur(A.es_meta.tot.r)} de ingresos`,A.es_meta,'var(--blue)')+prod('Google Ads',`${num(gE.tot.q)} artículos comprados · ${eur(gE.tot.r)} de ingresos`,gE,'var(--orange)');
$('b-ga-meta').innerHTML=bars(A.es_meta.by_creative.map(c=>({n:short(c.n),v:c.q,l:num(c.q)})),'var(--blue)');
$('b-ga-google').innerHTML=bars(gE.camps.map(c=>({n:c.n,v:c.q,l:num(c.q)})),'var(--orange)');
animate();
