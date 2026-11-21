const hdr=document.getElementById('top');
const onScroll=()=>hdr.classList.toggle('solid',scrollY>20);onScroll();addEventListener('scroll',onScroll,{passive:true});
const menu=document.getElementById('menu');
document.getElementById('burger').onclick=()=>menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>menu.classList.remove('open'));
// scrollspy
const links=[...menu.querySelectorAll('a')];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -55% 0px'});
links.forEach(l=>{const s=document.querySelector(l.getAttribute('href'));s&&spy.observe(s)});
// hero
const imgs=[...document.querySelectorAll('#art img')],dots=[...document.querySelectorAll('#dots button')],cap=document.getElementById('cap');let cur=0,timer;
function go(i){imgs[cur].classList.remove('on');dots[cur].classList.remove('on');cur=(i+imgs.length)%imgs.length;imgs[cur].classList.add('on');dots[cur].classList.add('on');cap.textContent=imgs[cur].dataset.cap}
function auto(){clearInterval(timer);timer=setInterval(()=>go(cur+1),5500)}
dots.forEach((d,i)=>d.onclick=()=>{go(i);auto()});auto();
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// galería: se pinta desde data/galeria.json; si falla, queda el HTML estático de respaldo
const gal=document.getElementById('gal');
const FORMATOS={alto:'tall',ancho:'wide',grande:'big'};
// Acepta rutas guardadas por el CMS como "/images/galeria/x.jpg", "images/galeria/x.jpg" o solo "x.jpg"
// y las vuelve relativas, para que funcionen bajo /GastronomySolution/ y bajo un dominio propio.
const rutaImg=r=>{r=String(r||'').trim().replace(/^(\.\/|\/)+/,'');return r.includes('/')?r:'images/galeria/'+r};
function pintarGaleria(fotos){
  const html=fotos.filter(f=>f&&f.imagen).map(f=>{
    const src=rutaImg(f.imagen),cls=FORMATOS[f.formato]||'';
    const a=document.createElement('a');a.href=src;if(cls)a.className=cls;
    const img=document.createElement('img');img.loading='lazy';img.src=src;img.alt=f.alt||'';
    if(f.posicion)img.style.objectPosition=f.posicion;
    a.appendChild(img);return a;
  });
  if(!html.length)return;
  gal.replaceChildren(...html);
}
fetch(gal.dataset.src,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})
  .then(d=>{
    const l=(Array.isArray(d)?d:d.fotos)||[];
    // "orden" ordena de menor a mayor; si falta o hay empates, se respeta el orden de la lista
    pintarGaleria(l.map((f,i)=>[f,i]).sort((x,y)=>((+x[0].orden)||x[1]+1)-((+y[0].orden)||y[1]+1)||x[1]-y[1]).map(x=>x[0]));
  }).catch(e=>console.warn('Galería: se usa el respaldo estático',e));
// lightbox (delegado, funciona con la galería pintada por JS)
const lb=document.getElementById('lb');
gal.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();lb.querySelector('img').src=a.querySelector('img').src;lb.classList.add('open')});
lb.onclick=()=>lb.classList.remove('open');addEventListener('keydown',e=>e.key==='Escape'&&lb.classList.remove('open'));
// testimonios
const ts=[...document.querySelectorAll('.ts')];let ti=0;
function showT(i){ts[ti].classList.remove('on');ti=(i+ts.length)%ts.length;ts[ti].classList.add('on')}
document.getElementById('prev').onclick=()=>showT(ti-1);document.getElementById('next').onclick=()=>showT(ti+1);
// reserva -> WhatsApp
document.getElementById('resForm').onsubmit=e=>{
  e.preventDefault();const f=new FormData(e.target);
  const msg=`Hola, soy ${f.get('n')}. Quiero reservar: ${f.get('t')}${f.get('f')?', fecha '+f.get('f'):''}${f.get('p')?', para '+f.get('p')+' personas':''}. `;
  window.open('https://wa.me/573005866674?text='+encodeURIComponent(msg),'_blank');
};
