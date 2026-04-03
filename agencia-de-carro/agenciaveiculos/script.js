// CARROSSEL HERO
var slidess = document.querySelectorAll(`.slidee`);
var dotss = document.querySelectorAll(`.dott`);
var heroCurrent = 0;
var heroInterval = setInterval(heroNext, 5500);

function showHeroSlide(index) {
slidess.forEach(function(s) { s.classList.remove(`activee`); });
dotss.forEach(function(d) { d.classList.remove(`activee`); });
slidess[index].classList.add(`activee`);
dotss[index].classList.add(`activee`);
heroCurrent = index;
}

function heroNext() {
heroCurrent = (heroCurrent + 1) % slidess.length;
showHeroSlide(heroCurrent);
}

function heroPrev() {
heroCurrent = (heroCurrent - 1 + slidess.length) % slidess.length;
showHeroSlide(heroCurrent);
}

dotss.forEach(function(dot) {
dot.addEventListener(`click`, function(e) {
var idx = parseInt(e.target.getAttribute(`data-index`));
showHeroSlide(idx);
clearInterval(heroInterval);
heroInterval = setInterval(heroNext, 5500);
});
});

slidess.forEach(function(slide) {
slide.addEventListener(`click`, function(e) {
var half = slide.clientWidth / 2;
if (e.offsetX < half) { heroPrev(); } else { heroNext(); }
clearInterval(heroInterval);
heroInterval = setInterval(heroNext, 5500);
});
});

var heroTouchStart = 0;
var heroEl = document.querySelector(`.carousel`);
if (heroEl) {
heroEl.addEventListener(`touchstart`, function(e) {
heroTouchStart = e.touches[0].clientX;
}, { passive: true });
heroEl.addEventListener(`touchend`, function(e) {
var diff = heroTouchStart - e.changedTouches[0].clientX;
if (Math.abs(diff) > 50) {
if (diff > 0) { heroNext(); } else { heroPrev(); }
clearInterval(heroInterval);
heroInterval = setInterval(heroNext, 5500);
}
}, { passive: true });
}
const ADMIN_PASS='autoprime2025';
let cars=[
  {id:1,brand:'BMW',model:'X5',version:'xDrive40i Sport',year:2024,km:'5.000',price:'480000',cambio:'Automático',fuel:'Gasolina',color:'Preto',status:'destaque',images:[],views:247,desc:'BMW X5 em perfeito estado. Teto panorâmico, bancos em couro, som Harman Kardon, câmera 360°. Único dono.'},
  {id:2,brand:'Toyota',model:'Corolla Cross',version:'XRE 2.0 Hybrid',year:2023,km:'28.000',price:'165000',cambio:'CVT',fuel:'Híbrido',color:'Branco',status:'usado',images:[],views:189,desc:'Corolla Cross híbrido, baixo consumo. Multimídia 9", câmera de ré, Toyota Safety Sense.'},
  {id:3,brand:'Jeep',model:'Compass',version:'Limited 1.3T',year:2024,km:'0',price:'220000',cambio:'Automático',fuel:'Flex',color:'Cinza',status:'novo',images:[],views:312,desc:'Compass 0km, garantia de fábrica. Teto solar, sensor de estacionamento, câmera 360°.'},
  {id:4,brand:'Volvo',model:'XC60',version:'Ultimate T8 Plug-in',year:2023,km:'18.000',price:'395000',cambio:'Automático',fuel:'Híbrido',color:'Azul',status:'destaque',images:[],views:156,desc:'XC60 topo de linha. Couro Nappa, som Bowers & Wilkins, heads-up display, Pilot Assist.'},
  {id:5,brand:'Honda',model:'Civic',version:'Touring 1.5T',year:2024,km:'0',price:'175000',cambio:'CVT',fuel:'Gasolina',color:'Vermelho',status:'novo',images:[],views:203,desc:'Civic Touring 0km. Teto solar panorâmico, bancos em couro aquecidos, Honda Sensing completo.'},
  {id:6,brand:'Mercedes',model:'GLC 300',version:'4MATIC AMG Line',year:2022,km:'42.000',price:'370000',cambio:'Automático',fuel:'Gasolina',color:'Prata',status:'destaque',images:[],views:98,desc:'GLC 300 AMG Line. MBUX, suspensão pneumática, câmera 360°, faróis Multibeam LED.'},
  {id:7,brand:'Hyundai',model:'HB20s',version:'Vison 1.0',year:2022,km:'112.000',price:'59.900',cambio:'Manual',fuel:'Flex',color:'Branco',status:'usado',images:['images/carro.jpg'],views:98,desc:'GLC 300 AMG Line. MBUX, suspensão pneumática, câmera 360°, faróis Multibeam LED.'},
];
let curFilter='all',galIdx=0,curId=null,addImgs=[];
let identityPhotos=[null,null,null],idxBanner=0,timerBanner=null;
let tIdx=0,tTimer=null;

const WASVG=`<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

function fmt(p){return 'R$ '+Number(String(p).replace(/\D/g,'')).toLocaleString('pt-BR');}
function parcel(p){return 'R$ '+Math.round(Number(String(p).replace(/\D/g,''))/60).toLocaleString('pt-BR')+'/mês';}

// ESTOQUE
function render(){
  const list=curFilter==='all'?cars:cars.filter(c=>c.status===curFilter);
  document.getElementById('cnt').textContent=cars.length+'+';
  let h='';
  list.forEach(c=>{
    const slbl={novo:'Novo',usado:'Usado',destaque:'⭐ Destaque'}[c.status];
    const cover=c.images.length
      ?`<img src="${c.images[0]}" alt="${c.brand} ${c.model}" loading="lazy">`
      :`<div class="v-placeholder"><svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg><span style="font-size:12px">Sem foto</span></div>`;
    h+=`<div class="v-card" onclick="openDetail(${c.id})">
      <div class="v-img">${cover}<span class="v-badge s-${c.status}">${slbl}</span></div>
      <div class="v-info"><div class="v-brand">${c.brand}</div><div class="v-name">${c.model}</div></div>
      <div class="v-price-bar">
        <div class="v-price">${fmt(c.price)}</div>
        <div class="v-cta">Ver detalhes <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></div>
      </div>
    </div>`;
  });
  document.getElementById('grid').innerHTML=h;
}
function doFilter(t,btn){curFilter=t;document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render();}

// DETAIL
function openDetail(id){curId=id;galIdx=0;const c=cars.find(x=>x.id===id);if(!c)return;buildGallery(c);buildBody(c);document.getElementById('detailOverlay').classList.add('open');document.body.style.overflow='hidden';c.views++;}
function closeDetail(){document.getElementById('detailOverlay').classList.remove('open');document.body.style.overflow='';}
document.getElementById('detailOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('detailOverlay'))closeDetail();});
function buildGallery(c){
  const gc=document.getElementById('galContent');
  const gp=document.getElementById('gPrev'),gn=document.getElementById('gNext'),ctr=document.getElementById('galCtr'),th=document.getElementById('galThumbs');
  if(!c.images.length){gc.innerHTML=`<div class="gal-placeholder"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg><span style="font-size:14px">Sem foto</span></div>`;gp.style.display=gn.style.display=ctr.style.display='none';th.innerHTML='';return;}
  gp.style.display=gn.style.display=c.images.length>1?'flex':'none';ctr.style.display='block';updateGalImg(c);
  th.innerHTML=c.images.map((s,i)=>`<img class="gal-thumb${i===galIdx?' active':''}" src="${s}" onclick="galGoTo(${i})">`).join('');
}
function updateGalImg(c){document.getElementById('galContent').innerHTML=`<img class="gal-img" src="${c.images[galIdx]}" alt="foto">`;document.getElementById('galCtr').textContent=`${galIdx+1} / ${c.images.length}`;document.querySelectorAll('.gal-thumb').forEach((t,i)=>t.classList.toggle('active',i===galIdx));}
function galNav(d){const c=cars.find(x=>x.id===curId);if(!c||!c.images.length)return;galIdx=(galIdx+d+c.images.length)%c.images.length;updateGalImg(c);}
function galGoTo(i){const c=cars.find(x=>x.id===curId);if(!c)return;galIdx=i;updateGalImg(c);}
function buildBody(c){
  const km=c.km==='0'||c.km===''?'0 km':c.km+' km';
  document.getElementById('detBody').innerHTML=`<div class="det-header"><div><div class="det-brand">${c.brand}</div><div class="det-title">${c.model}</div><div class="det-version">${c.version}</div></div><div class="det-year">${c.year}</div></div>
  <div class="det-price-box"><div><div style="font-size:12px;color:rgba(0,0,0,.5);margin-bottom:2px">Preço à vista</div><div class="det-price">${fmt(c.price)}</div></div><div style="text-align:right"><div class="det-parcel">${parcel(c.price)}</div><div class="det-parcel-lbl">em até 60x</div></div></div>
  <div class="specs-grid"><div class="spec-box"><div class="spec-lbl">Ano</div><div class="spec-val">${c.year}</div></div><div class="spec-box"><div class="spec-lbl">Quilometragem</div><div class="spec-val">${km}</div></div><div class="spec-box"><div class="spec-lbl">Câmbio</div><div class="spec-val">${c.cambio}</div></div><div class="spec-box"><div class="spec-lbl">Combustível</div><div class="spec-val">${c.fuel}</div></div><div class="spec-box"><div class="spec-lbl">Cor</div><div class="spec-val">${c.color}</div></div><div class="spec-box"><div class="spec-lbl">Status</div><div class="spec-val" style="text-transform:capitalize">${c.status}</div></div></div>
  ${c.desc?`<div class="det-desc-label">Descrição</div><div class="det-desc">${c.desc}</div>`:''}
  <div class="det-actions"><button class="det-btn det-btn-wa" onclick="waV(${c.id})">${WASVG} Falar no WhatsApp</button><button class="det-btn det-btn-p" onclick="waV(${c.id})">Solicitar proposta</button></div>
  <div class="det-views">👁 ${c.views} pessoas viram este veículo hoje</div>`;
}

// BANNER IDENTIDADE
function uploadIdentity(slot,file){
  if(!file)return;
  const r=new FileReader();
  r.onload=e=>{
    identityPhotos[slot]=e.target.result;
    document.getElementById('idPrev'+slot).innerHTML=`<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
    buildIdentityBanner();
    notify('✓ Foto '+(slot+1)+' adicionada ao banner!');
  };
  r.readAsDataURL(file);
}
function buildIdentityBanner(){
  const photos=identityPhotos.filter(Boolean);
  const banner=document.getElementById('identityBanner');
  if(!photos.length){banner.className='identity-banner empty';banner.innerHTML=`<span style="font-size:16px">📷</span><span>Adicione as fotos da loja no painel admin</span>`;clearInterval(timerBanner);return;}
  idxBanner=0;
  banner.className='identity-banner';
  banner.innerHTML=`<div class="id-track" id="idTrack">${photos.map(src=>`<div class="id-slide"><img src="${src}" alt="loja"><div class="id-slide-overlay"></div></div>`).join('')}</div>${photos.length>1?`<button class="id-nav prev" onclick="idNav(-1)">‹</button><button class="id-nav next" onclick="idNav(1)">›</button><div class="id-dots" id="idDots">${photos.map((_,i)=>`<button class="id-dot${i===0?' active':''}" onclick="idGo(${i})"></button>`).join('')}</div>`:``}`;
  clearInterval(timerBanner);
  if(photos.length>1)timerBanner=setInterval(()=>{idxBanner=(idxBanner+1)%photos.length;idUpdateBanner();},3000);
}
function idNav(d){const n=identityPhotos.filter(Boolean).length;idxBanner=(idxBanner+d+n)%n;idUpdateBanner();}
function idGo(i){idxBanner=i;idUpdateBanner();}
function idUpdateBanner(){const t=document.getElementById('idTrack');if(t)t.style.transform=`translateX(-${idxBanner*100}%)`;document.querySelectorAll('.id-dot').forEach((d,i)=>d.classList.toggle('active',i===idxBanner));}

// CARROSSEL DEPOIMENTOS
function tPerView(){return window.innerWidth<=600?1:window.innerWidth<=900?2:3;}
function tMaxIdx(){return Math.max(0,document.querySelectorAll('.testi-card').length-tPerView());}
function tUpdate(){
  const max=tMaxIdx();if(tIdx>max)tIdx=max;
  const card=document.querySelector('.testi-card');if(!card)return;
  document.getElementById('tTrack').style.transform=`translateX(-${tIdx*(card.offsetWidth+24)}px)`;
  document.getElementById('tPrev').disabled=tIdx===0;
  document.getElementById('tNext').disabled=tIdx>=max;
  document.getElementById('tDots').innerHTML=Array.from({length:max+1},(_,i)=>`<button class="testi-dot${i===tIdx?' active':''}" onclick="tGo(${i})"></button>`).join('');
}
function tNav(d){tIdx=Math.max(0,Math.min(tMaxIdx(),tIdx+d));tUpdate();tResetTimer();}
function tGo(i){tIdx=i;tUpdate();tResetTimer();}
function tResetTimer(){clearInterval(tTimer);tTimer=setInterval(()=>{tIdx=tIdx>=tMaxIdx()?0:tIdx+1;tUpdate();},3000);}
window.addEventListener('resize',tUpdate);

// LOGIN / ADMIN
function openLogin(){document.getElementById('loginOverlay').classList.add('open');document.getElementById('loginPass').value='';document.getElementById('loginErr').style.display='none';setTimeout(()=>document.getElementById('loginPass').focus(),200);}
function closeLogin(){document.getElementById('loginOverlay').classList.remove('open');}
document.getElementById('loginOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('loginOverlay'))closeLogin();});
function doLogin(){if(document.getElementById('loginPass').value===ADMIN_PASS){closeLogin();openAdmin();}else{document.getElementById('loginErr').style.display='block';document.getElementById('loginPass').value='';document.getElementById('loginPass').focus();}}
function openAdmin(){document.getElementById('adminPage').classList.add('open');document.body.style.overflow='hidden';renderAdminList();}
function closeAdmin(){document.getElementById('adminPage').classList.remove('open');document.body.style.overflow='';}
function renderAdminList(){
  document.getElementById('adminCount').textContent=cars.length;
  document.getElementById('adminList').innerHTML=cars.map(c=>`<div class="admin-item">${c.images.length?`<img class="admin-item-img" src="${c.images[0]}" alt="">`:`<div class="admin-item-img-ph">🚗</div>`}<div class="admin-item-info"><div class="admin-item-name">${c.brand} ${c.model} ${c.version}</div><div class="admin-item-price">${fmt(c.price)} · ${c.year} · ${c.status}</div></div><button class="admin-item-del" onclick="delVehicle(${c.id})">Remover</button></div>`).join('');
}
function delVehicle(id){if(!confirm('Remover este veículo?'))return;cars=cars.filter(c=>c.id!==id);render();renderAdminList();notify('Veículo removido.');}

// UPLOAD FOTOS VEÍCULO
function handleF(files){readFiles(Array.from(files),srcs=>{addImgs.push(...srcs);renderPrevs();});}
function dropF(e){e.preventDefault();document.getElementById('upZone').classList.remove('dragover');handleF(e.dataTransfer.files);}
function dragOv(e){e.preventDefault();document.getElementById('upZone').classList.add('dragover');}
function dragLv(){document.getElementById('upZone').classList.remove('dragover');}
function renderPrevs(){document.getElementById('aPrevs').innerHTML=addImgs.map((s,i)=>`<div class="prev-w"><img src="${s}"><button class="prev-rm" onclick="rmP(${i})">✕</button></div>`).join('');}
function rmP(i){addImgs.splice(i,1);renderPrevs();}
function saveVehicle(){
  const brand=document.getElementById('a-brand').value.trim(),model=document.getElementById('a-model').value.trim(),year=document.getElementById('a-year').value.trim(),price=document.getElementById('a-price').value.trim();
  if(!brand||!model||!year||!price){alert('Preencha: Marca, Modelo, Ano e Preço.');return;}
  cars.unshift({id:Date.now(),brand,model,version:document.getElementById('a-version').value.trim(),year:parseInt(year),km:document.getElementById('a-km').value.trim()||'0',price:price.replace(/\D/g,''),cambio:document.getElementById('a-cambio').value,fuel:document.getElementById('a-fuel').value,color:document.getElementById('a-color').value.trim()||'Não informado',status:document.getElementById('a-status').value,desc:document.getElementById('a-desc').value.trim(),images:[...addImgs],views:0});
  render();renderAdminList();resetForm();notify('✓ Veículo publicado!');
}
function resetForm(){['a-brand','a-model','a-version','a-year','a-km','a-price','a-color','a-desc'].forEach(id=>document.getElementById(id).value='');addImgs=[];renderPrevs();}

// LOGO
function uploadLogo(file){
  if(!file)return;
  const r=new FileReader();
  r.onload=e=>{const src=e.target.result;document.getElementById('logoPreviewWrap').innerHTML=`<img src="${src}" style="max-width:100%;max-height:100%;object-fit:contain;">`;const tag=`<img src="${src}" class="logo-img" alt="Logo">`;document.getElementById('headerLogo').innerHTML=tag;document.getElementById('footerLogo').innerHTML=tag;notify('✓ Logo atualizada!');};
  r.readAsDataURL(file);
}

// MENU MOBILE
function toggleMenu(){document.getElementById('mobileNav').classList.toggle('open');document.getElementById('menuToggle').classList.toggle('open');}
function closeMenu(){document.getElementById('mobileNav').classList.remove('open');document.getElementById('menuToggle').classList.remove('open');}

// UTILS
function readFiles(files,cb){if(!files.length)return;const srcs=[];let done=0;files.forEach(f=>{const r=new FileReader();r.onload=e=>{srcs.push(e.target.result);if(++done===files.length)cb(srcs);};r.readAsDataURL(f);});}
function wa(msg=''){window.open(`https://wa.me/5511999990000?text=${encodeURIComponent(msg||'Olá! Tenho interesse em um veículo da AutoPrime. Pode me ajudar?')}`,'_blank');}
function waV(id){const c=cars.find(x=>x.id===id);wa(c?`Olá! Tenho interesse no ${c.brand} ${c.model} ${c.year} — ${fmt(c.price)}. Pode me ajudar?`:'');}
function notify(msg){const el=document.getElementById('notif');document.getElementById('notif-txt').textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),3500);}

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeDetail();closeLogin();}
  if(document.getElementById('detailOverlay').classList.contains('open')){if(e.key==='ArrowLeft')galNav(-1);if(e.key==='ArrowRight')galNav(1);}
});

render();
setTimeout(()=>{tUpdate();tResetTimer();},100);
