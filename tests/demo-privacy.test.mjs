import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const read = name => readFileSync(new URL('../'+name,import.meta.url),'utf8');
function setup() {
 const legacy=new Map([['noortech-prayer-location','private'],['unrelated','keep']]);
 const requests=[]; let locationCalls=0, plays=0;
 const nodes=new Map();
 const node=()=>({value:'3',hidden:true,children:[],classList:{add(){},remove(){},toggle(){}},setAttribute(){},append(){},replaceChildren(){},addEventListener(){},focus(){},querySelector(){return node()},play(){plays++;return Promise.resolve()},pause(){}});
 const context=vm.createContext({Intl,URLSearchParams,console,Map,Date,setTimeout:()=>1,clearTimeout(){},
 window:{Notification:true,location:{search:''}},Notification:{permission:'granted'},
 document:{getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)},querySelector:node,createElement:node},
 localStorage:{get length(){return legacy.size},key:i=>[...legacy.keys()][i],removeItem:k=>legacy.delete(k),getItem(){throw Error('must not read saved values')},setItem(){throw Error('must not persist')}},
 navigator:{geolocation:{getCurrentPosition(callback){locationCalls++;callback({coords:{latitude:24.7136,longitude:46.6753}})}}},
 async fetch(url,options){requests.push({url,options});return {ok:true,json:async()=>url.includes('reverse-geocode')?{city:'Riyadh'}:url.includes('open-meteo')?{results:[]}:{data:{timings:{Fajr:'05:00',Dhuhr:'12:00',Asr:'15:00',Maghrib:'18:00',Isha:'19:00'},meta:{timezone:'Asia/Riyadh'}}}}}
 });
 vm.runInContext(read('assets/quran-verses.js'),context);
 vm.runInContext(read('app.js').split('/* Events */')[0],context);
 return {legacy,requests,nodes,run:code=>vm.runInContext(code,context),locationCalls:()=>locationCalls,plays:()=>plays};
}
test('location and reminders work without writing personal data to browser storage or Noor Tech',async()=>{
 const s=setup();
 s.run('enablePrayerReminders()');
 await s.run('loadLocalPrayerTimes();');
 assert.equal(s.locationCalls(),1);
 assert.equal(s.run('prayerRemindersEnabled'),true);
 s.run('updatePrayerTimes()');
 assert.equal(s.locationCalls(),2);
 assert.ok(s.requests.some(x=>x.url.includes('api.aladhan.com')));
 assert.ok(s.requests.some(x=>x.url.includes('api.bigdatacloud.net')));
 for(const {url,options} of s.requests){
  assert.ok(['api.aladhan.com','api.bigdatacloud.net'].includes(new URL(url).hostname));
  assert.equal(options.credentials,'omit');assert.equal(options.referrerPolicy,'no-referrer');
 }
 assert.equal(s.legacy.size,1);assert.equal(s.legacy.get('unrelated'),'keep');
 assert.equal(setup().run('prayerLocation'),null);
});
test('city search, manual city selection and music switching work without device location',async()=>{
 const s=setup();
 await s.run('searchCities("Riyadh")');
 assert.ok(s.requests[0].url.includes('geocoding-api.open-meteo.com'));
 s.run('selectPrayerCity({latitude:24.7,longitude:46.7,name:"Riyadh",timezone:"Asia/Riyadh"})');
 assert.equal(s.locationCalls(),0);
 assert.equal(s.run('prayerLocationMode'),'manual');
 s.run('loadTrack(0,false)');const first=s.nodes.get('audioEl').src;
 s.run('loadRandomTrack(true)');
 assert.notEqual(s.nodes.get('audioEl').src,first);assert.equal(s.plays(),1);
});
test('only Quran page allows the named live providers; all pages block form submission',()=>{
 const quran=read('index.html');
 assert.ok(quran.includes('preload="none"'));
 assert.ok(quran.includes('connect-src https://api.aladhan.com https://api.bigdatacloud.net https://geocoding-api.open-meteo.com;'));
 assert.ok(quran.includes("media-src 'self' https://www.soundhelix.com;"));
 for(const file of ['index.html','sales.html','en/index.html','ar/index.html','collections.html','standalone-collections/index.html','privacy.html']){
  const html=read(file);assert.ok(html.includes("form-action 'none'"),file);
  if(file!=='index.html')assert.ok(html.includes("connect-src 'none'"),file);
 }
});
