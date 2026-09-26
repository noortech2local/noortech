import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const read = name => readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('demo blocks APIs, device permissions and audio even when invoked directly', async()=>{
 const legacy=new Map([['noortech-prayer-location','private'],['unrelated','keep']]);
 const element={};
 const context=vm.createContext({Intl,URLSearchParams,console,Map,
 document:{getElementById:()=>element,querySelector:()=>element},
 localStorage:{get length(){return legacy.size},key:i=>[...legacy.keys()][i],removeItem:k=>legacy.delete(k),getItem(){throw Error('must not read saved values')},setItem(){throw Error('must not persist')}},
 navigator:new Proxy({}, {get(){throw Error('device API accessed')}}),
 fetch(){throw Error('network accessed')}
 });
 vm.runInContext(read('assets/quran-verses.js'),context);
 vm.runInContext(read('app.js').split('/* Events */')[0],context);
 for(const call of ['fetchVerse(1)','searchCities("Riyadh")','loadPrayerLocationName()','loadLocalPrayerTimes()','requestPrayerLocation()','requestPrayerNotificationPermission()','activatePrayerReminders()','loadTrack(0,true)','togglePlay()','preloadNextVerse()']) await vm.runInContext(call,context);
 assert.equal(legacy.has('noortech-prayer-location'),false);
 assert.equal(legacy.get('unrelated'),'keep');
 vm.runInContext('storage.setItem("test", "value")',context);
 assert.equal(vm.runInContext('storage.getItem("test")',context),'value');
 assert.equal(legacy.size,1);
});
test('all demo entry pages block outbound connections and forms',()=>{
 for(const file of ['index.html','sales.html','en/index.html','ar/index.html','collections.html','standalone-collections/index.html','privacy.html']){
  const html=read(file);
  assert.ok(html.includes("connect-src 'none'"),file);
  assert.ok(html.includes("form-action 'none'"),file);
  assert.ok(html.includes('privacy.html')||file==='privacy.html',file);
  assert.ok(!/fonts\.googleapis\.com/.test(html),file);
 }
 for(const file of ['sales.html','en/index.html','ar/index.html']) assert.ok(!read(file).includes('localStorage'),file);
 assert.ok(read('en/index.html').includes('href="../privacy.html"'));
});
