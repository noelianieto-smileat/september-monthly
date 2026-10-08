$('hdr').innerHTML=header('pt');
$('ftr').innerHTML=footer('Smileat · Reporte septiembre 2026 · Portugal');
const M=DATA.meta_pt,T=M.tot,A=DATA.ga;
const cont=M.fams.find(f=>f.n=='Recetas y consejos');
const cpa=(T.spend-cont.spend)/T.purch;
$('collage').innerHTML=collage('pt',['envio_img1','envio_img2','smilotes2'],num(T.purch),'COMPRAS META');
$('kpis').innerHTML=kpis([[eur(T.spend,2),'Inversión en Meta Ads','var(--blue)'],[num(T.purch),'Compras atribuidas','var(--pink)'],[eur(cpa,2),'Coste por compra (sin recetas)','var(--green)'],[num(T.impr),'Impresiones','var(--yellow)'],[num(T.atc),'Añadidos al carrito (recetas y consejos)','var(--purple)']]);
const F=M.fams,envio=F.find(f=>f.n=='Envío gratis +20€'),cat=F.find(f=>f.n=='Catálogo dinámico'),kids=F.find(f=>f.n=='Smileat Kids');
const bestAtc=M.ads.filter(a=>a.atc>0).sort((a,b)=>a.spend/a.atc-b.spend/b.atc)[0];
$('insights').innerHTML=[
 [Math.round(envio.purch/T.purch*100)+'%',`de las compras vienen del envío gratis desde 20€ (${num(envio.purch)} compras), con el ${Math.round(envio.spend/T.spend*100)}% de la inversión.`,'var(--blue)'],
 [eur(cat.spend/cat.purch,2),`Coste por compra del catálogo dinámico, frente a ${eur(envio.spend/envio.purch,2)} del envío gratis.`,'var(--green)'],
 [eur(bestAtc.spend/bestAtc.atc,2),`Coste por añadido al carrito de ${bestAtc.name}, el mejor contenido de recetas y consejos.`,'var(--pink)'],
 [num(kids.purch),`compra de Smileat Kids con ${eur(kids.spend)} invertidos: el lanzamiento aún no convierte en Portugal.`,'var(--purple)']
].map(([n,t,c])=>`<div class="insight" style="--c:${c}"><div class="num">${n}</div><p>${t}</p></div>`).join('');
$('fams').innerHTML=F.map((f,i)=>{const c=FC[i%6],ct=f.n=='Recetas y consejos';
return `<div class="gcard" style="--c:${c}"><h3>${f.n}</h3><div class="sub">${num(f.spend/T.spend*100,1)}% de la inversión</div>${ct?`<div class="num">${num(f.atc)}<small>añadidos al carrito</small></div><div class="stats">${stat('Inversión',eur(f.spend,2))}${stat('Coste por añadido',eur(f.spend/f.atc,2))}${stat('Impresiones',num(f.impr))}${stat('Clics en enlace',num(f.lclicks))}</div>`:`<div class="num">${num(f.purch)}<small>compras</small></div><div class="stats">${stat('Inversión',eur(f.spend,2))}${stat('Coste por compra',f.purch?eur(f.spend/f.purch,2):'–')}${stat('Impresiones',num(f.impr))}${stat('Clics en enlace',num(f.lclicks))}</div>`}</div>`}).join('');
const C=M.ads.filter(a=>a.atc==0&&a.spend>=40&&(a.purch>0||a.img));
$('grid').innerHTML=C.map((c,i)=>`<article class="card ${i==0?'top':''}">${media('pt',c,i,false)}<div class="body"><h3>${c.name}</h3><div class="fam">${c.fam}</div><div class="big">${num(c.purch)}<small>compras</small></div><div class="stats">${stat('Coste por compra',c.purch?eur(c.spend/c.purch,2):'–').replace('class="stat"','class="stat hi"')}${stat('Inversión',eur(c.spend,2))}${stat('CPM',eur(c.spend/c.impr*1000,2))}${stat('Clics en enlace',num(c.lclicks))}${stat('Impresiones',num(c.impr))}${stat('Alcance',num(c.reach))}</div></div></article>`).join('');
$('b-res').innerHTML=bars(C.filter(c=>c.purch>0).map(c=>({n:short(c.name),v:c.purch,l:num(c.purch)})),'var(--blue)');
$('b-cpa').innerHTML=bars(C.filter(c=>c.purch>=4).sort((a,b)=>a.spend/a.purch-b.spend/b.purch).map(c=>({n:short(c.name),v:c.spend/c.purch,l:eur(c.spend/c.purch,2)})),'var(--green)');
$('b-atc').innerHTML=bars(M.ads.filter(a=>a.atc>0).sort((a,b)=>b.atc-a.atc).map(a=>({n:short(a.name),v:a.atc,l:num(a.atc)+' · '+eur(a.spend/a.atc,2)})),'var(--purple)');
const gP=A.pt_google,gcol=['var(--blue)','var(--orange)','var(--green)'];
$('google').innerHTML=gP.camps.map((g,i)=>`<div class="gcard" style="--c:${gcol[i%3]}"><h3>${g.n}</h3><div class="sub">GA4 · sesiones de Google Ads</div><div class="num">${num(g.q)}<small>artículos comprados</small></div><div class="stats">${stat('Ingresos de artículo',eur(g.r))}${stat('Añadidos al carrito',num(g.cart))}${stat('Ingreso por artículo',eur(g.r/g.q,2))}${stat('% de artículos Google',num(g.q/gP.tot.q*100,1)+'%')}</div></div>`).join('');
const prod=(t,s,g,c)=>{const m=Math.max(...g.top.map(p=>p.q));return `<div class="panel"><h3>${t}</h3><div class="sub">${s}</div>${g.top.map((p,i)=>`<div class="prod" style="--c:${c}"><span class="i">${i+1}</span><span class="nm">${p.n}<span class="t"><i style="width:${p.q/m*100}%"></i></span></span><span class="v"><b>${p.q} uds</b><em>${eur(p.r,2)}</em></span></div>`).join('')}</div>`};
$('prods').innerHTML=prod('Meta Ads',`${num(A.pt_meta.tot.q)} artículos comprados · ${eur(A.pt_meta.tot.r)} de ingresos`,A.pt_meta,'var(--blue)')+prod('Google Ads',`${num(gP.tot.q)} artículos comprados · ${eur(gP.tot.r)} de ingresos`,gP,'var(--orange)');
animate();
