# NOOR TECH Collections

Independent English and Arabic collections website. No backend, external images, installed packages, or connection to the original NOOR TECH sales website is required.

## View

Open `index.html` directly, or run `npm run build` followed by `npm run dev` and visit `http://127.0.0.1:4173/`.

English is the default. Choose العربية for Arabic, or use `?lang=ar`. City links use hash routes and work on ordinary static hosting without rewrite rules.

## Build and host

Run `npm run build` with Node.js. Upload the contents of `public/` to a static web host. `index.html` is the entry page. The build validates JavaScript syntax and the 12 embedded image assets.

Hosting has not yet been configured. This project has no shared deployment ID or Git remote with the existing NOOR TECH site.

## Edit

Edit the translation files or `collections/mobile.css`, run `npm run generate` (Python 3), and rebuild. `collections/original.html` preserves the supplied design snapshot and bundled licence notices. The generated root `index.html` is checked in for dependency-free viewing.
