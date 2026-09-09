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
patterns = [
    ('Star overlap', 'تداخل النجوم', 'Intersection and balance', 'التقاطع والتوازن', 40),
    ('Deconstructed star', 'نجمة مفككة', 'Break apart and recompose', 'التفكيك وإعادة التكوين', 250),
    ('Radiating star', 'نجمة مشعة', 'Light and expansion', 'الضوء والامتداد', 458),
    ('Star flow', 'تدفق النجوم', 'Continuity and rhythm', 'الاستمرارية والإيقاع', 667),
    ('Layered star', 'نجمة متعددة الطبقات', 'Layers and order', 'الطبقات والنظام', 873),
    ('Star mosaic', 'فسيفساء النجوم', 'Diversity and harmony', 'التنوع والانسجام', 1083),
    ('Abstract star line', 'خط نجمي تجريدي', 'Minimalism and purity', 'البساطة والنقاء', 1290),
]
for title, title_ar, description, description_ar, _ in patterns:
    translations[title] = [title, title_ar]
    translations[description] = [description, description_ar]
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
# The source board has rasterised Chinese captions. Display the upper board and
# its seven texture crops with locale-aware HTML captions instead of that strip.
board_image = '(0,d.jsx)("img",{loading:"lazy",decoding:"async",src:"/assets/star-collection.webp",alt:noorT("Seven designs in the Noor Tech Islamic Art Series")})'
assert code.count(board_image) == 1
# Cropped images extend beyond their visible cards. Load them eagerly and reserve
# their intrinsic proportions so mobile lazy-loading cannot leave blank textures.
cards = []
for title, _, description, _, x in patterns:
    cards.append('(0,d.jsxs)("li",{children:['
        '(0,d.jsx)("div",{className:"pattern-texture","aria-hidden":"true",children:'
        '(0,d.jsx)("img",{loading:"eager",decoding:"async",width:1536,height:1024,src:"/assets/star-collection.webp",alt:"",style:{left:"' + str(-x / 198 * 100) + '%"}})}),'
        '(0,d.jsx)("h3",{children:noorT(' + json.dumps(title) + ')}),'
        '(0,d.jsx)("p",{children:noorT(' + json.dumps(description) + ')})]})')
localized_board = '(0,d.jsxs)("div",{children:[' \
    '(0,d.jsx)("div",{className:"collection-board-art",children:' + board_image + '}),' \
    '(0,d.jsxs)("ol",{className:"pattern-captions",children:[' + ','.join(cards) + ']})]})'
code = code.replace(board_image, localized_board)
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
