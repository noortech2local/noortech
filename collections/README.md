# NOOR TECH bilingual collections

Open `../collections.html` directly in a browser. All 12 original images are embedded, so the page works offline without a server. English is the default; the language switch opens Arabic with `?lang=ar` and preserves the current city or section.

The original supplied HTML is retained in `original.html`. The four city stories, NFC demos, packaging selector, navigation and FAQs remain available. Arabic uses document-level RTL and translated text, image descriptions, controls and page titles.

To update the page:

1. Edit `translated-copy.txt` (English and Arabic pairs corresponding to `source-strings.json`), `arabic-ui.txt`, or `mobile.css`.
2. Run `python3 scripts/build-collections.py` from the repository root.
3. Run the existing project build. The static sync includes `collections.html` at `/collections.html`.

`collections.html` is generated. The source snapshot contains the original bundled React runtime and its embedded licence notices. Text embedded in the original design-board images is preserved as artwork.

Validation: generated script syntax checked with Node; all 71 source-language copy entries are covered; 12 embedded images retained; project production build passed. Browser interaction testing was not performed.
