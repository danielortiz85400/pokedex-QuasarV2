/*
Endpoint usado: https://pokeapi.co/api/v2/pokemon-species
Acción: Obtener evoluciones del pokemon elegido (+ detalles)
Componentes injectados:[
  Componentes: DialogMain, PokemonEvolutions, PokemonsStats
  Pages: IndexPage
]
*/
export const usePokedexFind = async (pokedexSpecies, id) => {
  const especiesRequest = await fetch(`${pokedexSpecies}`);
  const {
    evolution_chain,
    color: { name: colorMain },
    name,
    capture_rate,
    generation: { name: generation },
    growth_rate: { name: growth_rate },
    habitat: habitatVerify,
    shape: { name: shape },
    egg_groups: egg,
    pal_park_encounters: encounters,
  } = await especiesRequest.json();

  const habitat = habitatVerify?.name ?? "Not found";
  const egg_groups = egg.map(({ name }) => name);
  const pal_park_encounters = encounters?.length
    ? encounters.map(({ area: { name } }) => name)
    : [...encounters, "Not found"];

  //EVOLUCIONES EXISTENTES
  const evolutionRequest = await fetch(evolution_chain.url);
  const { chain } = await evolutionRequest.json();

  const evolutionRoutes = [
    chain?.species.url,
    chain?.evolves_to[0]?.species.url,
    chain?.evolves_to[0]?.evolves_to[0]?.species.url,
  ];
  const existingEvolutions = await Promise.allSettled(
    [...evolutionRoutes].map((url) => fetch(url).then((res) => res.json()))
  );

  return {
    existingEvolutions,
    id,
    colorMain,
    name,
    //Render para PokemonDetail (Descripcion)
    capture_rate,
    generation,
    growth_rate,
    habitat,
    shape,
    //Render para PokemonDetail (info)
    egg_groups,
    pal_park_encounters,
  };
};
