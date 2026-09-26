import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
const source = readFileSync(new URL('../app.js', import.meta.url), 'utf8').split('/* Events */')[0];
function setup(demo = false) {
  const nodes = new Map();
  const node = () => ({ hidden: true, textContent: '', children: [], classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, append(...items) { this.children.push(...items); }, replaceChildren() { this.children = []; }, addEventListener(name, fn) { this[name] = fn; }, close() {}, scrollIntoView() {}, focus() {}, querySelector() { return this.children.find(x => x.click); } });
  const values = new Map();
  const requests = [];
  const context = vm.createContext({ console, URLSearchParams, AbortController, Intl,
    localStorage: { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) },
    document: { querySelector: node, getElementById(id) { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); }, createElement: node },
    window: { location: { search: '' } },
    setTimeout, clearTimeout,
    fetch(url, options) { return new Promise((resolve, reject) => { requests.push({ url, resolve, reject }); options.signal.addEventListener('abort', () => reject(new Error('timeout'))); }); },
  });
  vm.runInContext(readFileSync(new URL('../assets/quran-verses.js', import.meta.url), 'utf8'), context);
  vm.runInContext(demo ? source : source.replace('const DEMO_MODE = true;', 'const DEMO_MODE = false;'), context);
  // Keep preloading bounded and observable without leaving real network timers running.
  vm.runInContext('preloadNextVerse = () => { nextVerse = null; };', context);
  return { run: code => vm.runInContext(code, context), nodes, values: vm.runInContext("demoValues", context), requests };
}
const response = number => ({ ok: true, json: async () => ({ data: [
  { text: 'Arabic verse', number, edition: { identifier: 'quran-uthmani' } },
  { text: 'Translation', number, edition: { identifier: 'en.sahih' }, surah: { englishName: 'Test', number: 1 }, numberInSurah: number },
] }) });
test('failure preserves verse and retry targets the failed verse', async () => {
  const s = setup();
  const before = s.run('currentVerse.ar');
  const loading = s.run('loadRandomVerse(false, 42)');
  s.requests[0].reject(new Error('offline')); await loading;
  assert.equal(s.run('currentVerse.ar'), before);
  assert.equal(s.run('pendingVerseNumber'), 42);
  assert.equal(s.nodes.get('verseFeedback').hidden, false);
  const retry = s.run('loadRandomVerse(false, pendingVerseNumber)');
  assert.match(s.requests[1].url, /\/42\/editions/);
  s.requests[1].resolve(response(42)); await retry;
  assert.equal(s.run('currentVerseNumber'), 42);
  assert.equal(JSON.parse(s.values.get('noortech-last-verse')).number, 42);
});
test('late request cannot replace a more recent selection', async () => {
  const s = setup();
  const first = s.run('loadRandomVerse(false, 10)');
  const second = s.run('loadRandomVerse(false, 20)');
  s.requests[1].resolve(response(20)); await second;
  s.requests[0].resolve(response(10)); await first;
  assert.equal(s.run('currentVerseNumber'), 20);
});
test('prefetched verse is consumed without another fetch', async () => {
  const s = setup();
  s.run('nextVerse = { number: 23, promise: Promise.resolve({ ar: "a", en: "e", ref: "Test 1:23", number: 23 }) }');
  await s.run('loadRandomVerse(false)');
  assert.equal(s.requests.length, 0);
  assert.equal(s.run('currentVerseNumber'), 23);
});
test('saved full text opens offline and can be removed; legacy references remain', () => {
  const s = setup();
  s.run('displayVerse({ ar: "a", en: "e", ref: "Test 1:23", number: 23 }, false); toggleFavorite(); favorites.add("Al-Baqarah 2:201"); renderFavorites();');
  const list = s.nodes.get('favoritesList');
  assert.equal(list.children.length, 2);
  const savedRow = list.children[1];
  savedRow.children[1].click();
  assert.equal(s.requests.length, 0);
  assert.equal(s.run('currentVerseNumber'), 23);
  savedRow.children[2].click();
  assert.equal(s.run('favorites.has("Test 1:23")'), false);
  assert.equal(s.run('favorites.has("Al-Baqarah 2:201")'), true);
});
test('request aborts after its deadline', async () => {
  const s = setup();
  s.run('setTimeout = callback => { globalThis.expire = callback; return 1; }; clearTimeout = () => {};');
  const pending = s.run('loadRandomVerse(false, 30)');
  s.run('expire()'); await pending;
  assert.equal(s.nodes.get('verseFeedback').hidden, false);
});

test('demo draws different bundled verses and resolves shared references without requests', async () => {
  const s = setup(true);
  assert.equal(s.run('NOOR_QURAN_VERSES.length'), 6236);
  assert.equal(s.run('NOOR_QURAN_VERSES.every((verse, index) => validVerse(verse) && verse.number === index + 1)'), true);
  await s.run('loadRandomVerse(false, 1)');
  assert.equal(s.run('currentVerse.ref'), 'Al-Faatiha 1:1');
  for (let i = 0; i < 30; i++) {
    const previous = s.run('currentVerseNumber');
    await s.run('loadRandomVerse(false)');
    assert.notEqual(s.run('currentVerseNumber'), previous);
    assert.equal(s.nodes.get('verseFeedback').hidden, true);
  }
  await s.run('loadRandomVerse(false, "94:6")');
  assert.equal(s.run('currentVerse.ref'), 'Ash-Sharh 94:6');
  s.run('toggleFavorite(); renderFavorites()');
  assert.equal(s.run('favorites.has("Ash-Sharh 94:6")'), true);
  assert.equal(s.requests.length, 0);
});
test('missing bundle keeps the existing verse and shows a retry instead of calling the API', async () => {
  const s = setup(true);
  const before = s.run('currentVerse.ar');
  s.run('NOOR_QURAN_VERSES.length = 0');
  await s.run('loadRandomVerse(false, 1)');
  assert.equal(s.run('currentVerse.ar'), before);
  assert.equal(s.nodes.get('verseFeedback').hidden, false);
  assert.equal(s.requests.length, 0);
});
