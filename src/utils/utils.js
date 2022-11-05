import { ColorTranslator } from "colortranslator";

export const colorTransform = (color) =>
  Object.values(new ColorTranslator(color).rgb).toString();

export const staticAssets = (name) =>
  new URL(`../assets/images/types/${name}.png`, import.meta.url).href;
