(function(){ "use strict";
const MESSAGE = "Web sitesi temanızı seçtikten sonra ödeme sonrası seçtiğiniz temanın rengini yazılarını ve logosunu bize bildiriniz(Ödeme sonrası form karşınıza çıkacaktır.) 3 gün içerisinde istediğiniz değişiklikler yapılacak ve siteniz yayınlanacaktır. İlgi ve Anlayışınız için teşekkür ederiz.";

function findClickable(node){
  let el=node;
  while(el && el !== document){
    if (el.matches && el.matches('a,button,[role="button"]')) return el;
    el = el.parentNode;
  }
  return null;
}
function normalizeText(s){
  return (s||"")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .trim();
}
function isTarget(el){
  const txt = normalizeText(el.textContent);
  const href = normalizeText((el.getAttribute && el.getAttribute('href')) || el.href || "");
  const txtMatch = (txt.includes("urunleri incele") || txt.includes("ürünleri incele") || txt.includes("web siteleri") || txt.includes("web sitesi"));
  const hrefMatch = href.includes("/web-siteleri") || href.includes("websiteleri") || href.includes("web-siteleri") || href.includes("/web-sitesi") || href.includes("/websitesi");
  return txtMatch || hrefMatch;
}

let pendingNav=null, open=false;

function ensureModal(){
  let existed=document.getElementById('kvkk-consent-modal');
  if (existed) return existed;

  const overlay=document.createElement('div');
  overlay.id='kvkk-consent-modal';
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:2147483647;';

  const dialog=document.createElement('div');
  dialog.style.cssText='max-width:720px;width:92%;background:#fff;border-radius:14px;box-shadow:0 20px 40px rgba(0,0,0,.25);overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;';

  const body=document.createElement('div');
  body.style.cssText='padding:20px 22px;color:#111;font-size:15px;line-height:1.6;white-space:pre-wrap';
  body.textContent=MESSAGE;

  const bar=document.createElement('div');
  bar.style.cssText='display:flex;justify-content:flex-end;gap:12px;padding:14px 22px;background:#f6f6f7;border-top:1px solid #eee';

  const accept=document.createElement('button');
  accept.textContent='Kabul ediyorum';
  accept.style.cssText='padding:10px 16px;border-radius:10px;border:none;background:#111;color:#fff;font-weight:600;cursor:pointer';
  bar.appendChild(accept);

  dialog.append(body,bar);
  overlay.appendChild(dialog);

  accept.addEventListener('click', ()=>{
    closeModal();
    if (pendingNav){
      const nav=pendingNav; pendingNav=null;
      if (nav.type==='href'){ window.location.assign(nav.href); }
      else if (nav.type==='click' && nav.el){ nav.el.click(); }
    }
  });

  overlay.addEventListener('click', (e)=>{ e.stopPropagation(); });
  document.addEventListener('keydown', (e)=>{ if (open && e.key==='Escape'){ e.preventDefault(); } }, true);

  document.body.appendChild(overlay);
  return overlay;
}
function openModal(){ ensureModal().style.display='flex'; open=true; }
function closeModal(){ const m=document.getElementById('kvkk-consent-modal'); if(m){ m.style.display='none'; } open=false; }

function handleClick(e){
  const clickable=findClickable(e.target);
  if(!clickable) return;
  if(!isTarget(clickable)) return;

  e.preventDefault(); e.stopPropagation();
  if (clickable.tagName.toLowerCase()==='a'){
    const href=clickable.getAttribute('href') || clickable.href;
    pendingNav={type:'href',href};
  } else {
    pendingNav={type:'click',el:clickable};
  }
  openModal();
}

function onReady(fn){
  if (document.readyState === 'complete' || document.readyState === 'interactive') fn();
  else document.addEventListener('DOMContentLoaded', fn, { once:true });
}

onReady(()=>{
  document.addEventListener('click', handleClick, true);
  const p = location.pathname.toLowerCase();
  if (p.includes('/web-siteleri') || p.includes('websiteleri') || p.endsWith('/web-siteleri')) {
    setTimeout(()=>{ openModal(); pendingNav=null; }, 300);
  }
});
})();
