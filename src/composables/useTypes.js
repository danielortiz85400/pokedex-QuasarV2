/*
Acciión: Asignar color rgb según el tipo de pokemon.
Componentes injectados:
  Composables: usePokedex.js
 */

export const useColorType = (color) => {
  const { [color]: colorType } = {
    bug: "199,225,19",
    dark: "10,13,16",
    dragon: "240,12,64",
    electric: "232,169,3",
    fairy: "38,177,216",
    fighting: "164,41,27",
    fire: "237,16,17",
    flying: "32,138,185",
    ghost: "123,41,146",
    grass: "28,227,28",
    ground: "189,122,33",
    ice: "51,158,191",
    normal: "221,192,134",
    poison: "227,25,186",
    psychic: "114,35,195",
    rock: "136,55,33",
    steel: "155,158,175",
    water: "34,34,193",
  };
  return { colorType };
};
