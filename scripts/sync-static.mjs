import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicDir = resolve(root, "public");
const publicAssets = resolve(publicDir, "assets");
const salesSource = readFileSync(resolve(root, "sales.html"), "utf8");
const translationsMarker = "const translations=";
const translationsStart = salesSource.indexOf(translationsMarker) + translationsMarker.length;
const translationsEnd = salesSource.indexOf(";\n  const nav=", translationsStart);

if (translationsStart < translationsMarker.length || translationsEnd < 0) {
  throw new Error("Could not locate the sales-page translation dictionary.");
}

const translations = Function(`"use strict";return (${salesSource.slice(translationsStart, translationsEnd)});`)();
const productionBase = "https://noortech2local.github.io/noortech";

const escapeText = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const escapeAttribute = (value) => escapeText(value).replaceAll('"', "&quot;");

const replaceTranslatedElements = (html, attribute, copy, allowHtml = false) => {
  const pattern = new RegExp(`<([a-z][\\w-]*)\\b([^>]*\\b${attribute}="([^"]+)"[^>]*)>[\\s\\S]*?<\\/\\1>`, "gi");
  return html.replace(pattern, (match, tag, attributes, key) => {
    if (!(key in copy)) return match;
    const value = allowHtml ? copy[key] : escapeText(copy[key]);
    return `<${tag}${attributes}>${value}</${tag}>`;
  });
};

const replaceTranslatedAttributes = (html, copy) => html.replace(
  /<[^>]+\bdata-i18n-(alt|aria-label)="([^"]+)"[^>]*>/g,
  (tag, type, key) => {
    if (!(key in copy)) return tag;
    const attribute = type === "alt" ? "alt" : "aria-label";
    return tag.replace(new RegExp(`${attribute}="[^"]*"`), `${attribute}="${escapeAttribute(copy[key])}"`);
  },
);

const buildLocalePage = (locale) => {
  const copy = translations[locale];
  const isArabic = locale === "ar";
  let html = salesSource
    .replace('<html lang="en">', `<html lang="${locale}" dir="${isArabic ? "rtl" : "ltr"}" data-locale="${locale}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(copy.pageTitle)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" data-page-description>)/, `$1${escapeAttribute(copy.pageDescription)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(" data-canonical>)/, `$1${productionBase}/${locale}/$2`)
    .replace('href="sales.css"', 'href="../sales.css"')
    .replaceAll('src="assets/', 'src="../assets/')
    .replace('href="en/" data-language="en"', 'href="../en/" data-language="en"')
    .replace('href="ar/" data-language="ar"', 'href="../ar/" data-language="ar"')
    .replace(/(<button class="menu"[^>]*aria-label=")[^"]*(")/, `$1${escapeAttribute(copy.menuOpen)}$2`);

  if (locale === "ar") {
    html = html
      .replace('data-language="en" aria-current="page"', 'data-language="en"')
      .replace('data-language="ar">', 'data-language="ar" aria-current="page">');
  }

  html = replaceTranslatedElements(html, "data-i18n-html", copy, true);
  html = replaceTranslatedElements(html, "data-i18n", copy);
  html = replaceTranslatedAttributes(html, copy);
  return html;
};

const localePages = Object.fromEntries(
  ["en", "ar"].map((locale) => [locale, buildLocalePage(locale)]),
);

for (const [locale, html] of Object.entries(localePages)) {
  const localeDir = resolve(root, locale);
  mkdirSync(localeDir, { recursive: true });
  writeFileSync(resolve(localeDir, "index.html"), html);
}

rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicAssets, { recursive: true });

for (const file of ["sales.html", "sales.css", "sales.js"]) {
  copyFileSync(resolve(root, file), resolve(publicDir, file));
}

for (const [locale, html] of Object.entries(localePages)) {
  const localeDir = resolve(publicDir, locale);
  mkdirSync(localeDir, { recursive: true });
  writeFileSync(resolve(localeDir, "index.html"), html);
}

for (const file of [
  "riyadh-wristband.png",
  "riyadh-wristband-detail.png",
  "riyadh-wristband-lifestyle.png",
  "noor-hero.png",
  "noor-hero-mobile.jpg",
  "noor-bracelet-cutout.png",
  "noor-nfc.png",
  "noor-nfc-mobile.jpg",
  "noor-collection.png",
  "noor-collection-mobile.jpg",
  "noor-packaging.png",
  "noor-packaging-mobile.jpg",
  "riyadh-wristband-detail-mobile.jpg",
  "og.png",
  "og-riyadh.png",
]) {
  copyFileSync(resolve(root, "assets", file), resolve(publicAssets, file));
}
