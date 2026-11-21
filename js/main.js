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
// lightbox
const lb=document.getElementById('lb');
document.querySelectorAll('.gal a').forEach(a=>a.onclick=e=>{e.preventDefault();lb.querySelector('img').src=a.querySelector('img').src;lb.classList.add('open')});
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
