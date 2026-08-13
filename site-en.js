import './service-form.js';
import { loadSettings } from './neon-client.js';

const FALLBACK_PHONE='447915374776';
const fallbackMessages={
 tech:'Hi! 👋 I need help with a technology service in San Miguel de Allende. Can you help me? 💻\n\n[TECH]',
 art:'Hi! 👋 I’m looking for information related to art in San Miguel de Allende. Can you help me? 🎨\n\n[ART]',
 bodas:'Hi! 👋 I’m looking for wedding photography in San Miguel de Allende. I’d like to learn about the available options. 💍📸\n\n[BODAS]',
 eventos:'Hi! 👋 I need help with a service for an event in San Miguel de Allende. Can you help me? ✨\n\n[EVENTOS]',
 hogar:'Hi! 👋 I need help with a home service in San Miguel de Allende. Can you help me? 🏠\n\n[HOGAR]',
 realty:'Hi! 👋 I’m looking for information about a property in San Miguel de Allende. Can you help me? 🏡\n\n[REALTY]'
};
const fallbackDomains={tech:'https://www.sanmigueldeallende.tech/',art:'',bodas:'https://www.fotografosbodas.com.mx/',eventos:'',hogar:'',realty:''};
const labels={tech:'[TECH] · Technology',art:'[ART] · Art',bodas:'[BODAS] · Wedding photography',eventos:'[EVENTOS] · Events',hogar:'[HOGAR] · Home services',realty:'[REALTY] · Real estate'};
const routeNames={tech:'TECH',art:'ART',bodas:'WEDDINGS',eventos:'EVENTS',hogar:'HOME',realty:'REALTY'};
let settings={};

async function boot(){
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  try { settings=await loadSettings(); applySettings(); } catch(e){ console.warn('Settings fallback',e); }
  initWhatsApp();
  injectDomains();
}
function applySettings(){
  const keys={hero_eyebrow:'hero_en_eyebrow',hero_title_line1:'hero_en_title_line1',hero_title_line2:'hero_en_title_line2',hero_lead:'hero_en_lead'};
  document.querySelectorAll('[data-setting]').forEach(el=>{
    const key=keys[el.dataset.setting]||el.dataset.setting;
    const v=settings[key];
    if(typeof v==='string' && v.trim()) el.textContent=v;
  });
}
function initWhatsApp(){
  const phone=settings.whatsapp_phone || FALLBACK_PHONE;
  const messages={...fallbackMessages,...(settings.whatsapp_messages_en||{})};
  const wa=t=>`https://wa.me/${phone}?text=${encodeURIComponent(t)}`;
  document.querySelectorAll('[data-direct]').forEach(a=>a.href=wa(messages[a.dataset.direct]||messages.tech));
  const form=document.getElementById('leadForm');
  if(!form) return;
  const preview=document.getElementById('messagePreview');
  const update=()=>{const r=form.querySelector('input[name="route"]:checked')?.value||'tech'; if(preview) preview.textContent=`${labels[r]} · San Miguel de Allende`;};
  form.querySelectorAll('input[name="route"]').forEach(r=>r.addEventListener('change',update)); update();
  form.addEventListener('submit',e=>{
    e.preventDefault(); const r=form.querySelector('input[name="route"]:checked')?.value||'tech';
    const z=document.getElementById('zone')?.value.trim(); const d=document.getElementById('details')?.value.trim();
    let suffix=''; if(z) suffix+=`\n\nArea: ${z}`; if(d) suffix+=`\n\nDetails:\n${d}`;
    window.open(wa((messages[r]||messages.tech)+suffix),'_blank','noopener');
  });
}
function injectDomains(){
  const domains={...fallbackDomains,...(settings.service_domains||{})};
  const entries=Object.entries(domains).filter(([,url])=>typeof url==='string'&&url.trim());
  const catalogue=document.querySelector('.service-catalogue');
  if(catalogue&&entries.length){
    const section=document.createElement('section'); section.className='seo-section'; section.setAttribute('aria-label','Dedicated service websites');
    section.innerHTML=`<div class="seo-heading"><p class="overline dark">DEDICATED WEBSITES</p><h2>Go deeper.<br><span>One service at a time.</span></h2></div><div class="seo-copy"><p>Some Escríbeme routes already have their own dedicated website with more specialized information.</p><nav class="seo-nav">${entries.map(([r,u])=>`<a href="${safe(u)}" target="_blank" rel="noopener">${routeNames[r]||r} · ${host(u)} <span>↗</span></a>`).join('')}</nav></div>`;
    catalogue.closest('.services')?.insertAdjacentElement('afterend',section);
  }
  const route=currentRoute(); const url=domains[route]; const hero=document.querySelector('.subhero-copy');
  if(route&&url&&hero&&!hero.querySelector('.service-specialist')){
    const a=document.createElement('a'); a.className='text-action service-specialist'; a.href=url; a.target='_blank'; a.rel='noopener'; a.textContent=`Dedicated website · ${host(url)} ↗`; a.style.marginTop='18px'; a.style.alignSelf='flex-start'; hero.appendChild(a);
  }
}
function currentRoute(){const p=location.pathname; if(p.includes('tech-support'))return'tech'; if(p.includes('/art-'))return'art'; if(p.includes('wedding-photographers'))return'bodas'; if(p.includes('/events-'))return'eventos'; if(p.includes('home-services'))return'hogar'; if(p.includes('real-estate-services'))return'realty'; return''}
function host(url){try{return new URL(url).hostname.replace(/^www\./,'')}catch{return url}}
function safe(url){return String(url).replace(/"/g,'&quot;')}
boot();
