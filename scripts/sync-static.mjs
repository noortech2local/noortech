import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicDir = resolve(root, "public");
const publicAssets = resolve(publicDir, "assets");

rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicAssets, { recursive: true });

for (const file of ["sales.html", "sales.css", "sales.js"]) {
  copyFileSync(resolve(root, file), resolve(publicDir, file));
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
