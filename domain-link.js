import { loadSettings } from './neon-client.js';
const paths={tech:'soporte-tecnico',art:'arte-san-miguel',bodas:'fotografos-bodas',eventos:'eventos-san-miguel',hogar:'servicios-hogar',realty:'servicios-inmobiliarios'};
async function start(){const item=Object.entries(paths).find(([,part])=>location.pathname.includes(part));if(!item)return;try{const s=await loadSettings();const u=s.service_domains?.[item[0]];if(!u)return;const h=document.querySelector('.subhero-copy');if(!h)return;const a=document.createElement('a');a.className='text-action';a.href=u;a.target='_blank';a.rel='noopener';a.textContent='Sitio especializado ↗';a.style.marginTop='18px';a.style.alignSelf='flex-start';h.appendChild(a)}catch(e){console.warn(e)}}
start();
