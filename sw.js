/* App-Shell-Cache: kein Supabase-API-Verkehr und keine Familieninhalte werden gecacht. */
const VERSION = 'familienherz-shell-v5';
const scopeUrl = new URL(self.registration.scope);
const local = (path) => new URL(path, scopeUrl).toString();
const SHELL = ['./', './index.html','./styles.css','./app.js','./config.js','./lib/ics.mjs','./lib/dates.mjs','./lib/pdf.mjs','./manifest.webmanifest','./icons/icon-192.png'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(local))).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin || !url.pathname.startsWith(scopeUrl.pathname)) return;
  if(/\/api\/|\/auth\/|\/rest\/|\/functions\/|\/storage\//i.test(url.pathname)) return;
  if(req.mode === 'navigate') {
    event.respondWith(fetch(req).then(res => {if(res.ok) caches.open(VERSION).then(c => c.put(req,res.clone())); return res;}).catch(() => caches.match(local('./index.html'))));
    return;
  }
  if(['script','style','image','font'].includes(req.destination)) {
    event.respondWith(fetch(req).then(res => {if(res.ok) caches.open(VERSION).then(c => c.put(req,res.clone()));return res;}).catch(() => caches.match(req)));
  }
});
self.addEventListener('push', (event) => {
  let data = {title:'Familienherz',body:'Neuer Eintrag',url:'./'};
  try {data={...data,...event.data?.json()}} catch {}
  event.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:local('./icons/icon-192.png'),badge:local('./icons/icon-192.png'),tag:data.tag||undefined,data:{url:data.url||'./'}}));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const url = new URL(event.notification.data?.url||'./',scopeUrl).toString();
  if(new URL(url).origin!==scopeUrl.origin)return;
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(async wins=>{
    for(const w of wins){if(new URL(w.url).origin===scopeUrl.origin){await w.focus(); if(w.navigate) await w.navigate(url);return}}
    await self.clients.openWindow(url);
  }));
});
