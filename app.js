const PHONE='447915374776';
const messages={
  tech:'¡Hola! 👋 Necesito ayuda con un servicio de tecnología en San Miguel de Allende. ¿Me pueden ayudar? 💻\n\n[TECH]',
  art:'¡Hola! 👋 Estoy buscando información relacionada con arte en San Miguel de Allende. ¿Me pueden ayudar? 🎨\n\n[ART]',
  bodas:'¡Hola! 👋 Estoy buscando información sobre fotografía para mi boda en San Miguel de Allende. Me gustaría conocer las opciones disponibles. 💍📸\n\n[BODAS]',
  eventos:'¡Hola! 👋 Necesito ayuda con un servicio para un evento en San Miguel de Allende. ¿Me pueden ayudar? ✨\n\n[EVENTOS]',
  hogar:'¡Hola! 👋 Necesito ayuda con un servicio para el hogar en San Miguel de Allende. ¿Me pueden ayudar? 🏠\n\n[HOGAR]',
  realty:'¡Hola! 👋 Estoy buscando información sobre una propiedad en San Miguel de Allende. ¿Me pueden ayudar? 🏡\n\n[REALTY]'
};
const labels={tech:'[TECH] · Tecnología',art:'[ART] · Arte',bodas:'[BODAS] · Fotografía para bodas',eventos:'[EVENTOS] · Eventos',hogar:'[HOGAR] · Servicios para el hogar',realty:'[REALTY] · Servicios inmobiliarios'};
const wa=text=>`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('[data-direct]').forEach(a=>{const route=a.dataset.direct;a.href=wa(messages[route]||messages.tech)});

const form=document.getElementById('leadForm');
if(form){
  const preview=document.getElementById('messagePreview');
  const radios=[...form.querySelectorAll('input[name="route"]')];
  const update=()=>{const route=form.querySelector('input[name="route"]:checked')?.value||'tech';if(preview)preview.textContent=`${labels[route]} · San Miguel de Allende`};
  radios.forEach(r=>r.addEventListener('change',update));
  update();
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const route=form.querySelector('input[name="route"]:checked')?.value||'tech';
    const zone=document.getElementById('zone')?.value.trim();
    const details=document.getElementById('details')?.value.trim();
    let suffix='';
    if(zone) suffix+=`\n\nZona: ${zone}`;
    if(details) suffix+=`\n\nDetalles:\n${details}`;
    window.open(wa(messages[route]+suffix),'_blank','noopener');
  });
}

import('/service-form.js').catch(()=>{});
