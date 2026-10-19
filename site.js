import { loadSettings } from './neon-client.js';

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
  // Old WhatsApp Business number retired. Keep WhatsApp actions unavailable
  // until a replacement number or another verified contact channel is provided.
  const style=document.createElement('style');
  style.textContent='[data-direct], #leadForm, .service-request, a[href*="wa.me/"]{display:none!important}';
  document.head.appendChild(style);
  document.querySelectorAll('[data-direct]').forEach(a=>a.remove());
  document.getElementById('leadForm')?.remove();
}
boot();
