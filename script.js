
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);
class Particle{
  constructor(){this.reset();}
  reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.size=Math.random()*1.5+.3;this.speedX=(Math.random()-.5)*.4;this.speedY=(Math.random()-.5)*.4;this.opacity=Math.random()*.5+.1;const r=Math.random();this.color=r>.6?'0,229,255':r>.3?'139,92,246':'0,255,163';}
  update(){this.x+=this.speedX;this.y+=this.speedY;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();}
  draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fillStyle=`rgba(${this.color},${this.opacity})`;ctx.fill();}
}
for(let i=0;i<130;i++)particles.push(new Particle());
function connectParticles(){for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<110){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(0,229,255,${.045*(1-dist/110)})`;ctx.lineWidth=.5;ctx.stroke();}}}}
function animParticles(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.update();p.draw();});connectParticles();requestAnimationFrame(animParticles);}
animParticles();

const cursorEl=document.getElementById('cursor'),ringEl=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursorEl.style.left=mx-5+'px';cursorEl.style.top=my-5+'px';});
function animCursor(){rx+=(mx-rx-18)*.12;ry+=(my-ry-18)*.12;ringEl.style.left=rx+'px';ringEl.style.top=ry+'px';requestAnimationFrame(animCursor);}
animCursor();
document.querySelectorAll('a,button,.tag,.cert-card,.skill-card,.about-card').forEach(el=>{el.addEventListener('mouseenter',()=>ringEl.classList.add('hovered'));el.addEventListener('mouseleave',()=>ringEl.classList.remove('hovered'));});

const phrases=['Análisis de Datos','Power BI & SQL','Business Intelligence','Automatización','Data Storytelling'];
let pIdx=0,cIdx=0,deleting=false;
const typedEl=document.getElementById('typedText');
function type(){const phrase=phrases[pIdx];if(!deleting){typedEl.textContent=phrase.slice(0,++cIdx);if(cIdx===phrase.length){deleting=true;setTimeout(type,1800);return;}setTimeout(type,70);}else{typedEl.textContent=phrase.slice(0,--cIdx);if(cIdx===0){deleting=false;pIdx=(pIdx+1)%phrases.length;setTimeout(type,400);return;}setTimeout(type,40);}}
setTimeout(type,800);

function animCounter(el,target,suffix){let cur=0;const step=target/50;const timer=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(timer);}el.textContent=Math.floor(cur)+suffix;},30);}
const counterObs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){animCounter(entry.target,parseInt(entry.target.dataset.target),entry.target.dataset.suffix||'');counterObs.unobserve(entry.target);}});},{threshold:.5});
document.querySelectorAll('.metric-num[data-target]').forEach(el=>counterObs.observe(el));

const revObs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revObs.unobserve(entry.target);}});},{threshold:.08});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>revObs.observe(el));

const navbar=document.getElementById('navbar'),backTop=document.getElementById('backTop');
window.addEventListener('scroll',()=>{navbar.classList.toggle('scrolled',window.scrollY>50);backTop.classList.toggle('show',window.scrollY>400);});

const ham=document.getElementById('hamburger'),mob=document.getElementById('mobileMenu');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mob.classList.toggle('open');});
function closeMobile(){ham.classList.remove('open');mob.classList.remove('open');}

function handleSubmit(btn){btn.textContent='✓ ¡Enviado correctamente!';btn.classList.add('sent');setTimeout(()=>{btn.textContent='Enviar mensaje →';btn.classList.remove('sent');},3500);}

document.querySelectorAll('.skills-grid .skill-card').forEach((c,i)=>c.style.transitionDelay=i*.07+'s');
document.querySelectorAll('.certs-grid .cert-card').forEach((c,i)=>c.style.transitionDelay=i*.08+'s');
document.querySelectorAll('.about-cards .about-card').forEach((c,i)=>c.style.transitionDelay=i*.1+'s');
</script>