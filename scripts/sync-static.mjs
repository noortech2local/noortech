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
  "noor-bracelet-cutout.png",
  "noor-nfc.png",
  "noor-collection.png",
  "noor-packaging.png",
  "og.png",
  "og-riyadh.png",
]) {
  copyFileSync(resolve(root, "assets", file), resolve(publicAssets, file));
}
