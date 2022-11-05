import { boot } from "quasar/wrappers";
import { ColorTranslator } from "colortranslator";

export default boot(({ app }) => {
  app.provide("$POKEDEX", "https://pokeapi.co/api/v2/pokemon/");
  app.provide(
    "$SPRITES_INJECT",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  );
  app.provide("$SPECIES_INJECT", "https://pokeapi.co/api/v2/pokemon-species/");
  app.provide("$TYPES", "https://pokeapi.co/api/v2/type/");

  app.config.globalProperties.$POKEDEX_SPRITES =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  app.config.globalProperties.$POKEDEX_SPECIES =
    "https://pokeapi.co/api/v2/pokemon-species/";
});
