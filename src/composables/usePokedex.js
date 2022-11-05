/*
-Endpoint usado -> https://pokeapi.co/api/v2/pokemon/namePokemon
Componentes injectados: DialogMain, PokemonStats, PokemonTypes.
Acción:
  -Obtener detalles del pokemon elegido.

*/
import { ref, inject, watchEffect } from "vue";
import { useColorType } from "../composables/useTypes";

export const usePokedex = (id) => {
  const pokemonSpritesMain = ref("");
  const nameTypes = ref([]);
  const pokemonStats = ref([]);
  const detailsDes = ref(null);
  const detailsInfo = ref();

  watchEffect(async () => {
    const res = await fetch(inject("$POKEDEX") + id);
    const {
      sprites: {
        other: {
          dream_world: { front_default },
        },
      },
      types,
      stats,
      abilities,
      base_experience,
      height,
      weight,
    } = await res.json();
    pokemonSpritesMain.value = front_default;
    nameTypes.value = types.map(({ type: { name } }) => {
      const { colorType } = useColorType(name);
      return {
        name,
        color: colorType,
      };
    });

    pokemonStats.value = stats.map(({ base_stat }) => base_stat);

    detailsDes.value = {
      base_experience,
      height,
      weight,
    };
    detailsInfo.value = {
      abilities: Object.values(abilities.map(({ ability: { name } }) => name)),
    };
  });
  return {
    pokemonSpritesMain,
    nameTypes,
    pokemonStats,
    detailsDes,
    detailsInfo,
  };
};
