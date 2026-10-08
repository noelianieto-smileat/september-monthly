$('hdr').innerHTML=header('es');
$('ftr').innerHTML=footer('Smileat · Reporte septiembre 2026 · España');
const M=DATA.meta_es,T=M.tot,A=DATA.ga,gE=A.es_google,GA=DATA.gads.es,gt=GA.tot;
const roas=T.val/T.spend;
$('collage').innerHTML=collage('es',['promo_img2','susc1','kids1'],x(roas),'ROAS META');
$('kpis').innerHTML=kpis([[eur(T.spend),'Inversión en Meta Ads','var(--blue)'],[eur(T.val),'Valor de compra Meta','var(--green)'],[x(roas),'ROAS Meta','var(--pink)'],[num(T.purch),'Compras atribuidas por Meta','var(--yellow)'],[num(T.impr),'Impresiones Meta','var(--purple)']]);
$('kpis-g').innerHTML=kpis([[eur(gt.cost),'Inversión en Google Ads','var(--orange)'],[eur(gt.val),'Valor de conversión Google','var(--navy)'],[x(gt.val/gt.cost),'ROAS Google','var(--pink)'],[num(gt.conv),'Compras en Google Ads','var(--yellow)'],[num(gt.impr),'Impresiones Google','var(--purple)']]);
const EX=['Seguidores y perfil','Recetas y consejos','Otras campañas'];
const F=M.fams.filter(f=>f.spend>50&&!EX.includes(f.n)).sort((a,b)=>b.purch-a.purch),FP=F.filter(f=>f.purch>0&&f.spend>500);
const fr=f=>f.val/f.spend;
const bestF=[...FP].sort((a,b)=>fr(b)-fr(a))[0],lowF=[...FP].sort((a,b)=>fr(a)-fr(b))[0];
const promoF=M.fams.find(f=>f.n=='Promo Suscripción');
const topG=GA.camps[0],noBr=(gt.val-topG.val)/(gt.cost-topG.cost);
$('insights').innerHTML=[
 [Math.round(promoF.purch/T.purch*100)+'%',`de las compras de Meta vienen de la Promo Suscripción, con el ${Math.round(promoF.spend/T.spend*100)}% de la inversión y un ROAS de ${x(fr(promoF))}.`,'var(--blue)'],
 [x(fr(bestF)),`ROAS más alto entre las campañas con inversión relevante: ${bestF.n}, con ${num(bestF.purch)} compras.`,'var(--green)'],
 [x(fr(lowF)),`ROAS de ${lowF.n}, la campaña con peor resultado y el ${Math.round(lowF.spend/T.spend*100)}% de la inversión.`,'var(--pink)'],
 [Math.round(topG.conv/gt.conv*100)+'%',`de las compras de Google Ads vienen de ${topG.n} (${num(topG.conv)} de ${num(gt.conv)}), con el ${Math.round(topG.cost/gt.cost*100)}% de la inversión. Sin esa campaña, el ROAS de Google es ${x(noBr)}.`,'var(--purple)']
].map(([n,t,c])=>`<div class="insight" style="--c:${c}"><div class="num">${n}</div><p>${t}</p></div>`).join('');
$('fams').innerHTML=F.map((f,i)=>`<div class="gcard" style="--c:${FC[i%6]}"><h3>${f.n}</h3><div class="sub">${f.ads} anuncios con inversión · ${num(f.spend/T.spend*100,1)}% de la inversión</div><div class="num">${num(f.purch)}<small>compras</small></div><div class="stats">${stat('ROAS',x(fr(f))).replace('class="stat"','class="stat hi"')}${stat('Inversión',eur(f.spend,2))}${stat('Valor de compra',eur(f.val))}${stat('Coste por compra',f.purch?eur(f.spend/f.purch,2):'–')}${stat('Impresiones',num(f.impr))}${stat('Clics',num(f.clicks))}</div></div>`).join('');
$('b-fpu').innerHTML=bars(F.map((f,i)=>({n:f.n,v:f.purch,l:num(f.purch),c:FC[i%6]})),'var(--blue)');
$('b-froas').innerHTML=bars(F.map((f,i)=>({n:f.n,v:fr(f),l:x(fr(f)),c:FC[i%6]})),'var(--green)');
const C=M.ads;
$('grid').innerHTML=C.map((c,i)=>`<article class="card ${i==0?'top':''}">${media('es',c,i,c.vid)}<div class="body"><h3>${c.name}</h3><div class="fam">${c.fam}</div><div class="big">${num(c.purch)}<small>compras</small></div><div class="stats">${stat('ROAS',x(c.val/c.spend)).replace('class="stat"','class="stat hi"')}${stat('Valor de compra',eur(c.val))}${stat('Inversión',eur(c.spend,2))}${stat('Coste por compra',eur(c.spend/c.purch,2))}${stat('CTR',num(c.clicks/c.impr*100,2)+'%')}${stat('Impresiones',num(c.impr))}</div></div></article>`).join('');
$('b-res').innerHTML=bars(C.map(c=>({n:short(c.name),v:c.purch,l:num(c.purch)})),'var(--blue)');
$('b-roas').innerHTML=bars(C.filter(c=>c.spend>300).sort((a,b)=>b.val/b.spend-a.val/a.spend).map(c=>({n:short(c.name),v:c.val/c.spend,l:x(c.val/c.spend)})),'var(--green)');
const gcol=['var(--blue)','var(--orange)','var(--green)','var(--pink)','var(--purple)','var(--yellow)','var(--navy)'];
$('google').innerHTML=GA.camps.map((g,i)=>`<div class="gcard" style="--c:${gcol[i%7]}"><h3>${g.n}</h3><div class="sub">Google Ads · ${num(g.cost/gt.cost*100,1)}% de la inversión</div><div class="num">${num(g.conv)}<small>compras</small></div><div class="stats">${stat('ROAS',x(g.val/g.cost)).replace('class="stat"','class="stat hi"')}${stat('Inversión',eur(g.cost,2))}${stat('Valor de conversión',eur(g.val))}${stat('Coste por compra',eur(g.cost/g.conv,2))}${stat('Impresiones',num(g.impr))}${stat('Clics',num(g.clicks))}</div></div>`).join('');
const prod=(t,s,g,c)=>{const m=Math.max(...g.top.map(p=>p.q));return `<div class="panel"><h3>${t}</h3><div class="sub">${s}</div>${g.top.map((p,i)=>`<div class="prod" style="--c:${c}"><span class="i">${i+1}</span><span class="nm">${p.n}<span class="t"><i style="width:${p.q/m*100}%"></i></span></span><span class="v"><b>${p.q} uds</b><em>${eur(p.r,2)}</em></span></div>`).join('')}</div>`};
$('prods').innerHTML=prod('Meta Ads',`${num(A.es_meta.tot.q)} unidades vendidas · ${eur(A.es_meta.tot.r)} de ingresos`,A.es_meta,'var(--blue)')+prod('Google Ads',`${num(gE.tot.q)} unidades vendidas · ${eur(gE.tot.r)} de ingresos`,gE,'var(--orange)');
$('b-ga-meta').innerHTML=bars(A.es_meta.by_creative.map(c=>({n:short(c.n),v:c.q,l:num(c.q)})),'var(--blue)');
$('b-ga-google').innerHTML=bars(GA.camps.map(c=>({n:c.n,v:c.conv,l:num(c.conv)})),'var(--orange)');
animate();
