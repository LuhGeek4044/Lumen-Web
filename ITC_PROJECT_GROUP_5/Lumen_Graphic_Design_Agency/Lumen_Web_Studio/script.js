// Theme toggle (dark by default, remembers choice)
const themeBtn=document.getElementById('theme');
try{if(localStorage.getItem('theme')==='light')document.body.classList.add('light');}catch(e){}
themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  try{localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');}catch(e){}
});
// Mobile menu
const menu=document.getElementById('menu'),links=document.getElementById('navlinks');
menu.addEventListener('click',()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o);});
// Portfolio filters
const chips=document.querySelectorAll('.chip');
chips.forEach(c=>c.addEventListener('click',()=>{
  chips.forEach(x=>{x.classList.toggle('on',x===c);x.setAttribute('aria-pressed',x===c);});
  document.querySelectorAll('.work').forEach(w=>{w.hidden=c.dataset.f!=='All'&&w.dataset.cat!==c.dataset.f;});
}));
// Light scroll reveal for cards
const items=document.querySelectorAll('.card,.steps li');
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1});
  items.forEach(i=>{i.classList.add('reveal');io.observe(i);});
}
// Request form: front-end only, nothing is sent
const form=document.getElementById('quoteForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.name.value.trim(),email=form.email.value.trim();
    const services=[...form.querySelectorAll('input[name=service]:checked')];
    const budget=form.querySelector('input[name=budget]:checked');
    const err=document.getElementById('err'),msg=document.getElementById('msg');
    msg.style.display='none';
    if(!name||!/^\S+@\S+\.\S+$/.test(email)||!services.length||!budget){
      err.textContent='Please enter your name, a valid email, at least one service and a budget.';
      return;
    }
    err.textContent='';
    msg.style.display='block';
    msg.textContent='Request preview for '+name+': '+services.map(s=>s.value).join(', ')+' ('+budget.value+'). This website has no server connected yet, so nothing was sent. To reach us, contact a team member from the Team page.';
    form.reset();
  });
}
