const root = document.documentElement, themeBtn = document.getElementById("theme");
try{ const t = localStorage.getItem("theme"); if(t) root.dataset.theme = t; }catch(e){}
function syncIcon(){ themeBtn.innerHTML = root.dataset.theme==="light" ? "&#9790;" : "&#9728;"; }
themeBtn.onclick = ()=>{
  root.dataset.theme = root.dataset.theme==="light" ? "dark" : "light";
  try{ localStorage.setItem("theme",root.dataset.theme); }catch(e){}
  syncIcon();
};
syncIcon();

const links = document.getElementById("links");
document.getElementById("burger").onclick = ()=>links.classList.toggle("open");
links.onclick = e=>{ if(e.target.tagName==="A") links.classList.remove("open"); };

const words = ["React websites","landing pages","business sites","pixel-perfect UI"];
const typed = document.getElementById("typed");
let wi=0, ci=0, del=false;
(function tick(){
  const w = words[wi];
  typed.textContent = w.slice(0,ci);
  if(!del && ci===w.length){ del=true; return setTimeout(tick,1400); }
  if(del && ci===0){ del=false; wi=(wi+1)%words.length; }
  ci += del?-1:1;
  setTimeout(tick,del?45:85);
})();

const PROJECTS = [
  {
    t:"Saffron & Smoke",
    c:"Websites",
    e:`<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>`,
    g:"linear-gradient(135deg,#e0a33a33,#c4452d33)",
    d:"Restaurant website with filterable menu and online table reservation form.",
    s:["HTML","CSS","JavaScript"],live:"#",code:"https://github.com/SaadSiddiqu-12?tab=repositories"
  },
  {
    t:"Lumière Salon Booking",
    c:"Web Apps",
    e:`<svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    g:"linear-gradient(135deg,#b5546b33,#f6e6ea44)",
    d:"Four-step booking flow with services, stylists, live time slots and confirmation.",
    s:["JavaScript","UX","Forms"],live:"#",code:"https://github.com/SaadSiddiqu-12?tab=repositories"
  },
  {
    t:"Developer Portfolio",
    c:"Websites",
    e:`<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    g:"linear-gradient(135deg,#6ee7b733,#60a5fa33)",
    d:"This portfolio: dark/light theme, animations and a validated contact form.",
    s:["HTML","CSS","JavaScript"],live:"#",code:"https://github.com/SaadSiddiqu-12?tab=repositories"
  },
  {
    t:"Task Tracker",
    c:"React",
    e:`<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    g:"linear-gradient(135deg,#a78bfa33,#60a5fa33)",
    d:"Replace this card with your own React project (todo app, dashboard, weather app).",
    s:["React","Hooks","LocalStorage"],live:"#",code:"https://github.com/SaadSiddiqu-12?tab=repositories"
  }
];

const cats = ["All",...new Set(PROJECTS.map(p=>p.c))];
let cat = "All";
const filters = document.getElementById("filters"), grid = document.getElementById("projects-grid");
function renderFilters(){ filters.innerHTML = cats.map(c=>`<button class="f ${c===cat?"active":""}" data-c="${c}">${c}</button>`).join(""); }
function renderProjects(){
  const list = cat==="All"?PROJECTS:PROJECTS.filter(p=>p.c===cat);
  grid.innerHTML = list.map(p=>`
    <article class="card">
      <div class="thumb" style="background:${p.g}">${p.e}</div>
      <div class="body">
        <h3>${p.t}</h3><p>${p.d}</p>
        <div class="stack">${p.s.map(x=>`<span>${x}</span>`).join("")}</div>
        <div class="links"><a href="${p.live}" target="_blank" rel="noopener">Live demo &rarr;</a><a href="${p.code}" target="_blank" rel="noopener">Source code</a></div>
      </div>
    </article>`).join("");
}
filters.onclick = e=>{ const b=e.target.closest(".f"); if(!b) return; cat=b.dataset.c; renderFilters(); renderProjects(); };
renderFilters(); renderProjects();

function countUp(el){
  const target = +el.dataset.count; let n = 0; const step = Math.max(1,Math.ceil(target/40));
  const id = setInterval(()=>{ n=Math.min(target,n+step); el.textContent=n; if(n>=target) clearInterval(id); },30);
}
const io = new IntersectionObserver(es=>es.forEach(x=>{
  if(!x.isIntersecting) return;
  x.target.classList.add("in");
  x.target.querySelectorAll("[data-count]").forEach(countUp);
  x.target.querySelectorAll(".bar i").forEach(i=>i.style.width=i.dataset.w+"%");
  io.unobserve(x.target);
}),{threshold:.2});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

const form = document.getElementById("form"), toast = document.getElementById("toast");
form.addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[data-e]").forEach(x => x.textContent = "");
  const f = form.elements;
  const err = (k, m) => { form.querySelector(`[data-e="${k}"]`).textContent = m; ok = false; };
  
  if(f.name.value.trim().length < 2) err("name", "Please enter your name");
  if(!/^\S+@\S+\.\S+$/.test(f.email.value.trim())) err("email", "Enter a valid email");
  if(f.message.value.trim().length < 10) err("msg", "Please write at least 10 characters");
  if(!ok) return;

  emailjs.sendForm('service_wkvoy1t', 'template_26v5gzw', '#form')
    .then(() => {
      form.reset();
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3500);
    }, (error) => {
      alert('Failed to send message, please try again.');
      console.log('FAILED...', error);
    });
});

document.getElementById("y").textContent = new Date().getFullYear();