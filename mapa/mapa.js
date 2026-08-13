import { loadHotspots, loadNeighborhoods } from '../neon-client.js';

const HOME=[20.91,-100.745], HOME_ZOOM=15;
const map=L.map('map',{minZoom:13,maxZoom:19,zoomControl:false}).setView(HOME,HOME_ZOOM);
L.control.zoom({position:'bottomright'}).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19}).addTo(map);

const barrioSelect=document.getElementById('barrio-select');
const hotspotSelect=document.getElementById('hotspot-select');
const info=document.getElementById('barrio-info');
const list=document.getElementById('map-list');
let geoLayer, hotspots=[], neighborhoods=[], markerRows=[];
const palette=['#9c3425','#1e526a','#6e7651','#a4783d','#73516f','#355c54','#a34d56','#5e6c82','#8b6f47','#64605b'];
const colors={}; let ci=0;
const colorFor=n=>colors[n]||(colors[n]=palette[ci++%palette.length]);

async function loadGeoJSON(){
  const res=await fetch('/map/barrios.geojson.gz');
  if(!res.ok) throw new Error('No se pudo cargar el mapa de colonias');
  if(typeof DecompressionStream==='undefined') throw new Error('Tu navegador no soporta la descompresión del mapa');
  const stream=res.body.pipeThrough(new DecompressionStream('gzip'));
  const text=await new Response(stream).text();
  return JSON.parse(text);
}

async function boot(){
  const [geo, hs, nb]=await Promise.all([loadGeoJSON(),loadHotspots(),loadNeighborhoods()]);
  hotspots=hs; neighborhoods=nb;
  buildGeo(geo); buildHotspots(); buildSelects(geo); renderList(hotspots);
}
function buildGeo(geo){
  geoLayer=L.geoJSON(geo,{style:f=>({color:colorFor(f.properties?.name||''),fillColor:colorFor(f.properties?.name||''),fillOpacity:.06,weight:1}),onEachFeature:(f,l)=>{
    const name=f.properties?.name||'Sin nombre'; l.bindTooltip(name,{sticky:true});
    l.on('mouseover',()=>l.setStyle({fillOpacity:.18,weight:2})); l.on('mouseout',()=>geoLayer.resetStyle(l));
    l.on('click',()=>selectBarrio(name,l));
  }}).addTo(map);
  const b=geoLayer.getBounds(); if(b.isValid()) map.fitBounds(b,{padding:[25,25],maxZoom:14});
}
function markerIcon(h){
  const label=(h.name||'?').trim().charAt(0).toUpperCase();
  return L.divIcon({className:'marker-logo',html:`<span>${label}</span>`,iconSize:[34,34],iconAnchor:[17,17],popupAnchor:[0,-18]});
}
function buildHotspots(){
  hotspots.forEach(h=>{
    const m=L.marker([h.latitude,h.longitude],{icon:markerIcon(h)}).addTo(map);
    const img=h.image_url?`<img src="${esc(h.image_url)}" alt="">`:'';
    const link=h.url?`<a href="${esc(h.url)}" target="_blank" rel="noopener">Visitar sitio ↗</a>`:'';
    m.bindPopup(`<div class="popup">${img}<h3>${esc(h.name)}</h3><p>${esc(h.description||h.neighborhood||'')}</p>${link}</div>`);
    m.on('click',()=>{hotspotSelect.value=h.id; highlightItem(h.id)});
    markerRows.push({data:h,marker:m});
  });
}
function buildSelects(geo){
  [...new Set(geo.features.map(f=>f.properties?.name).filter(Boolean))].sort().forEach(n=>barrioSelect.add(new Option(n,n)));
  hotspots.forEach(h=>hotspotSelect.add(new Option(h.name,h.id)));
  barrioSelect.addEventListener('change',()=>filterBarrio(barrioSelect.value));
  hotspotSelect.addEventListener('change',()=>focusHotspot(hotspotSelect.value));
  document.getElementById('reset-map').onclick=reset;
}
function selectBarrio(name,layer){
  barrioSelect.value=name; map.fitBounds(layer.getBounds(),{padding:[30,30],maxZoom:15}); filterBarrio(name,false); showBarrio(name);
}
function filterBarrio(name,fit=true){
  markerRows.forEach(({data,marker})=>{const show=name==='all'||data.neighborhood===name; if(show){if(!map.hasLayer(marker))marker.addTo(map)}else if(map.hasLayer(marker))map.removeLayer(marker)});
  renderList(name==='all'?hotspots:hotspots.filter(h=>h.neighborhood===name));
  hotspotSelect.innerHTML='<option value="all">Todos los puntos</option>'; hotspots.filter(h=>name==='all'||h.neighborhood===name).forEach(h=>hotspotSelect.add(new Option(h.name,h.id)));
  if(name==='all'){info.innerHTML=''; if(fit&&geoLayer) map.fitBounds(geoLayer.getBounds(),{padding:[25,25],maxZoom:14})} else showBarrio(name);
}
function showBarrio(name){const n=neighborhoods.find(x=>x.name===name||x.slug===slug(name)); info.innerHTML=n?`<h2>${esc(n.name)}</h2><p>${esc(n.description||'')}</p>`:`<h2>${esc(name)}</h2>`}
function focusHotspot(id){if(id==='all')return; const row=markerRows.find(x=>String(x.data.id)===String(id)); if(!row)return; if(!map.hasLayer(row.marker))row.marker.addTo(map); map.setView(row.marker.getLatLng(),17); row.marker.openPopup(); highlightItem(id)}
function renderList(rows){list.innerHTML=rows.map(h=>`<div class="map-item" data-id="${h.id}"><strong>${esc(h.name)}</strong><span>${esc(h.neighborhood||h.category||'')}</span></div>`).join(''); list.querySelectorAll('.map-item').forEach(el=>el.onclick=()=>focusHotspot(el.dataset.id))}
function highlightItem(id){list.querySelectorAll('.map-item').forEach(el=>el.style.opacity=String(el.dataset.id)===String(id)?'1':'.45')}
function reset(){barrioSelect.value='all'; hotspotSelect.value='all'; markerRows.forEach(x=>{if(!map.hasLayer(x.marker))x.marker.addTo(map)}); renderList(hotspots); info.innerHTML=''; if(geoLayer) map.fitBounds(geoLayer.getBounds(),{padding:[25,25],maxZoom:14})}
function slug(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
boot().catch(e=>{console.error(e); list.innerHTML='<p>No se pudo cargar el mapa. Intenta recargar la página.</p>'});
