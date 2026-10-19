// The previous WhatsApp Business destination is retired. Contact links and
// WhatsApp-dependent forms stay hidden until a verified channel replaces it.
const style=document.createElement('style');
style.textContent='[data-direct], #leadForm, .service-request, a[href*="wa.me/"]{display:none!important}';
document.head.appendChild(style);
document.querySelectorAll('[data-direct]').forEach(a=>a.remove());
document.getElementById('leadForm')?.remove();
import('/service-form.js').catch(()=>{});
