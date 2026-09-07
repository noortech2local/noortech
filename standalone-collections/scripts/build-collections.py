"""Build the bilingual, offline-capable collections page from the supplied snapshot."""
from pathlib import Path
import json, re
ROOT = Path(__file__).resolve().parent.parent
src = ROOT / 'collections'
original = (src / 'original.html').read_text()
source_strings = json.loads((src / 'source-strings.json').read_text())
rows = (src / 'translated-copy.txt').read_text().splitlines()
assert len(rows) == len(source_strings), (len(rows), len(source_strings))
translations = {key: row.split('|', 1) for key, row in zip(source_strings, rows)}
for row in (src / 'arabic-ui.txt').read_text().splitlines():
    if row.count('|') != 1:
        continue
    en, ar = row.split('|')
    translations[en] = [en, ar]
assert all(len(value) == 2 and all(value) for value in translations.values())
start = original.index('var At=')
prefix, code = original[:start], original[start:]
used = set()
def translate(match):
    raw = match.group()
    try:
        value = json.loads(re.sub(r'\\x([0-9a-fA-F]{2})', r'\\u00\1', raw))
    except ValueError:
        return raw
    if value in translations:
        used.add(value)
        return 'noorT(' + json.dumps(value, ensure_ascii=False) + ')'
    return raw
code = re.sub(r'"(?:[^"\\]|\\.)*"', translate, code)
assert all(key in used for key in source_strings), 'Untranslated Chinese content'
# Translate dynamic image descriptions while preserving the asset routes.
for en, ar in [
 (' City Series circular wristband',' — سوار دائري من مجموعة المدن'),
 (' City Series design board showing the circular wristband, flat layout and architectural details',' — لوحة التصميم وتفاصيل السوار والعمارة'),
 (' wristband woven material detail',' — تفاصيل نسيج السوار'),
]:
    code = code.replace(en + '`', '${noorLocale === "ar" ? ' + json.dumps(ar, ensure_ascii=False) + ' : ' + json.dumps(en) + '}`')
# The original hash router updates titles; localise its dynamic title as well.
old='c[1].charAt(0).toUpperCase()+c[1].slice(1)+" City Series | NOOR TECH"'
code=code.replace(old, 'noorT(c[1].charAt(0).toUpperCase()+c[1].slice(1))+(noorLocale==="ar"?" | مجموعة المدن — نور تك":" City Series | NOOR TECH")')
setup = '''<script>
const noorLocale = new URLSearchParams(location.search).get('lang') === 'ar' ? 'ar' : 'en';
const noorDictionary = DICTIONARY;
function noorT(key){return noorDictionary[key]?.[noorLocale === 'ar' ? 1 : 0] ?? key;}
document.documentElement.lang = noorLocale;
document.documentElement.dir = noorLocale === 'ar' ? 'rtl' : 'ltr';
document.title = noorT('NOOR TECH — Collections');
document.querySelector('meta[name="description"]').content = noorLocale === 'ar' ? 'اكتشف أساور نور تك ومجموعة المدن: الرياض وجدة ومكة والمدينة المنورة. تصاميم منسوجة وتجارب NFC وهدايا مميزة.' : 'Discover NOOR TECH woven wristbands, NFC experiences and the Riyadh, Jeddah, Makkah and Madinah city collections.';
</script>'''.replace('DICTIONARY', json.dumps(translations, ensure_ascii=False))
controls = '''<nav class="locale-switch" aria-label="Language / اللغة">
<a href="?lang=en" lang="en" hreflang="en" data-locale="en">EN</a>
<a href="?lang=ar" lang="ar" hreflang="ar" data-locale="ar">العربية</a>
</nav><script>
function updateLanguageLinks(){
 document.querySelectorAll('[data-locale]').forEach(link=>{
  const url = new URL(location.href);url.searchParams.set('lang',link.dataset.locale);link.href=url.href;
  if(link.dataset.locale===noorLocale)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
 });
}
updateLanguageLinks();window.addEventListener('hashchange',updateLanguageLinks);
</script>'''
output = prefix + code
output = output.replace('<html lang="zh-CN">', '<html lang="en" dir="ltr">')
output = output.replace('</head>', '<style>' + (src / 'mobile.css').read_text() + '</style>' + setup + '</head>')
output = output.replace('<body>', '<body>' + controls + '<noscript><p>Please enable JavaScript to view the collection. / يرجى تفعيل جافاسكريبت لعرض المجموعة.</p></noscript>')
(ROOT / 'index.html').write_text(output)
print(f'Built index.html: {len(used)} translated strings, {len(output):,} characters; English and Arabic with embedded assets.')
