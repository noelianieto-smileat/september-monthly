$('hdr').innerHTML=header('pt');
$('ftr').innerHTML=footer('Smileat · Reporte septiembre 2026 · Promociones · Portugal');
$('collage').innerHTML=collage('pt',['img1','img2','img3'],'0 €','ENVÍO GRATIS +20€');
const P=DATA.meta_pt,sum=k=>P.reduce((a,c)=>a+c[k],0);
const spend=sum('spend'),res=sum('res'),impr=sum('impr'),eng=sum('eng');
$('kpis').innerHTML=kpis([[eur(spend,2),'Inversión en Meta Ads','var(--blue)'],[num(res),'Compras atribuidas','var(--pink)'],[eur(spend/res,2),'Coste por compra','var(--green)'],[num(impr),'Impresiones','var(--yellow)'],[num(eng),'Interacciones con la publicación','var(--purple)']]);
const best=[...P].sort((a,b)=>a.cpa-b.cpa)[0],worst=[...P].sort((a,b)=>b.cpa-a.cpa)[0],best1=P[0];
$('insights').innerHTML=[
 [Math.round(best1.res/res*100)+'%',`de las compras vienen de ${best1.id.toUpperCase()}, con ${Math.round(best1.spend/spend*100)}% de la inversión.`,'var(--blue)'],
 [eur(best.cpa,2),`Coste por compra más bajo: ${best.id.toUpperCase()}.`,'var(--green)'],
 [eur(worst.cpa,2),`Coste por compra más alto: ${worst.id.toUpperCase()}, con solo ${worst.res} compras.`,'var(--pink)']
].map(([n,t,c])=>`<div class="insight" style="--c:${c}"><div class="num">${n}</div><p>${t}</p></div>`).join('');
$('grid').innerHTML=P.map((c,i)=>`<article class="card ${i==0?'top':''}"><div class="media"><img src="assets/pt/${c.id}.jpg" alt="${c.name}" loading="lazy"><span class="rank">#${i+1}</span><span class="tag">Imagen</span></div>
<div class="body"><h3>${c.name}</h3><div class="big">${num(c.res)}<small>compras</small></div><div class="stats">${stat('Coste por compra',eur(c.cpa,2)).replace('class="stat"','class="stat hi"')}${stat('Inversión',eur(c.spend,2))}${stat('CPM',eur(c.spend/c.impr*1000,2))}${stat('Interacciones',num(c.eng))}${stat('Impresiones',num(c.impr))}${stat('Alcance',num(c.reach))}</div></div></article>`).join('');
$('b-res').innerHTML=bars(P.map(c=>({n:c.id.toUpperCase(),v:c.res,l:num(c.res)})),'var(--blue)');
$('b-cpa').innerHTML=bars([...P].sort((a,b)=>a.cpa-b.cpa).map(c=>({n:c.id.toUpperCase(),v:c.cpa,l:eur(c.cpa,2)})),'var(--green)');
animate();
