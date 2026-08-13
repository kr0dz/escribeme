import { loadSettings } from './neon-client.js';

const FALLBACK_PHONE='447915374776';
const fallbackMessages={
 tech:'¡Hola! 👋 Necesito ayuda con un servicio de tecnología en San Miguel de Allende. ¿Me pueden ayudar? 💻\n\n[TECH]',
 art:'¡Hola! 👋 Estoy buscando información relacionada con arte en San Miguel de Allende. ¿Me pueden ayudar? 🎨\n\n[ART]',
 bodas:'¡Hola! 👋 Estoy buscando información sobre fotografía para mi boda en San Miguel de Allende. Me gustaría conocer las opciones disponibles. 💍📸\n\n[BODAS]',
 eventos:'¡Hola! 👋 Necesito ayuda con un servicio para un evento en San Miguel de Allende. ¿Me pueden ayudar? ✨\n\n[EVENTOS]',
 hogar:'¡Hola! 👋 Necesito ayuda con un servicio para el hogar en San Miguel de Allende. ¿Me pueden ayudar? 🏠\n\n[HOGAR]',
 realty:'¡Hola! 👋 Estoy buscando información sobre una propiedad en San Miguel de Allende. ¿Me pueden ayudar? 🏡\n\n[REALTY]'
};
const labels={tech:'[TECH] · Tecnología',art:'[ART] · Arte',bodas:'[BODAS] · Fotografía para bodas',eventos:'[EVENTOS] · Eventos',hogar:'[HOGAR] · Servicios para el hogar',realty:'[REALTY] · Servicios inmobiliarios'};
let settings={};

async function boot(){
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  try { settings=await loadSettings(); applySettings(); } catch(e){ console.warn('Settings fallback',e); }
  initWhatsApp();
}
function applySettings(){
  document.querySelectorAll('[data-setting]').forEach(el=>{
    const v=settings[el.dataset.setting];
    if(typeof v==='string' && v.trim()) el.textContent=v;
  });
}
function initWhatsApp(){
  const phone=settings.whatsapp_phone || FALLBACK_PHONE;
  const messages={...fallbackMessages,...(settings.whatsapp_messages||{})};
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
    let suffix=''; if(z) suffix+=`\n\nZona: ${z}`; if(d) suffix+=`\n\nDetalles:\n${d}`;
    window.open(wa((messages[r]||messages.tech)+suffix),'_blank','noopener');
  });
}
boot();
