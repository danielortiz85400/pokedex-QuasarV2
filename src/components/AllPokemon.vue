<template>
  <q-page class="flex justify-center items-center">
    <div>
      <q-card class="card-content">
        <q-card-section class="q-pa-xs bg-grey-1" style="z-index: 60;">
          <img src="../assets/pokedexQuasarV2.png" style="width: 100%; height: 300px" />
          <form @submit.prevent="
            showDetail($POKEDEX_SPECIES + searchvalue + `/`, searchvalue)
          " class="absolute-bottom" style="width: 130px; margin-left: 32%">
            <q-input class="input-search" label="Search (id)" placeholder="###" dense borderless clearable
              autocomplete="off" mask="####" v-model="searchvalue">
              <template v-slot:prepend>
                <q-btn round size="10px" class="q-ml-sm">
                  <q-avatar size="30px">
                    <q-img src="https://i.pinimg.com/originals/a9/4f/4d/a94f4d75a2e429a20838d28d2ae2b996.png" />
                  </q-avatar>
                </q-btn>
              </template>
            </q-input>
          </form>
        </q-card-section>

        <q-separator />

        <q-card-section class="my-card bg-grey-1 scroll">
          <q-intersection v-for="({ id, name }, i) in pokemons" :key="i" transition="scale"
            class="intersection-height q-pa-sm" style="height: 120px">
            <q-btn class="q-pa-md" padding="xs" push>
              <q-badge color="blue-6" floating transparent>{{ id }}</q-badge>
              <img style="filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.3))" class="cursor-pointer"
                :src="$POKEDEX_SPRITES + id + '.png'" width="80" height="80"
                @click.prevent="showDetail($POKEDEX_SPECIES + id + `/`, id)" />
              <q-tooltip class="text-capitalize bg-light-blue-8" transition-show="scale" transition-hide="scale"
                anchor="bottom middle" self="bottom middle" style="z-index: 1">
                {{ name }}
              </q-tooltip>
            </q-btn>
          </q-intersection>

          <div ref="loadingObserve">
            <img src="../assets/pokeLoad.gif" width="96" height="96" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { usePokedexFind } from "../composables/usePokedexFind";
import DialogMain from "../components/DialogMain.vue";
import { ref, watchEffect, onMounted, inject } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();

let currentUrl = ref(inject("$POKEDEX"));
let loadingObserve = ref(null);
let nextPokemon = ref("");
let pokemons = ref([]);
const searchvalue = ref("");

const showDetail = async (pokedexSpecies, idPokemon) => {
  $q.loading.show();

  try {
    const {
      existingEvolutions,
      id,
      colorMain,
      name,
      capture_rate,
      generation,
      growth_rate,
      habitat,
      shape,
      egg_groups,
      pal_park_encounters,
    } = await usePokedexFind(pokedexSpecies, idPokemon);
    $q.dialog({
      component: DialogMain,
      componentProps: {
        existingEvolutions,
        id,
        colorMain,
        name,
        //Para ser usados en component: PokemonDetail(Descripcion)
        capture_rate,
        generation,
        growth_rate,
        habitat,
        shape,
        //Render para PokemonDetail (info)
        egg_groups,
        pal_park_encounters,
      },
    });
    searchvalue.value = "";
  } catch (err) {
    $q.notify({
      progress: true,
      timeout: 1500,
      message: "Not found",
      color: "red-6",
      icon: "catching_pokemon",
    });
  }
  $q.loading.hide();
};
watchEffect(async () => {
  try {
    const res = await fetch(currentUrl.value);
    const { next, results } = await res.json();

    pokemons.value.push(
      ...results.map((p, i) => ({
        ...p,
        id: p.url
          .split("/")
          .filter((id) => id)
          .pop(),
        name: p.name,
      }))
    );
    nextPokemon.value = next;
  } catch (error) {
    console.log(error);
  }
});
onMounted(() => {
  (async () => {
    const scroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          currentUrl.value = nextPokemon.value;
        }
      });
    });
    scroll.observe(loadingObserve.value);
  })();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Acme");

.card-content {
  max-width: 410px;
  border-radius: 12px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}

.my-card {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1px;
  max-width: 410px;
  height: 50vh;
  font-size: 1px;
  color: #333;
}

.input-search {
  font-family: acme;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin: -12px;
  background: #fff;
}

*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  border-radius: 9px;
  background-color: rgb(2, 123, 227, 0.2);
  width: 7px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-image: linear-gradient(to right,
      rgba(86, 204, 242) 0%,
      rgba(47, 128, 237, 0.9) 71%,
      rgba(86, 204, 242));
  width: 5px;
  background-size: 160% auto;
  box-shadow: 0px 3px 7px 2px rgba(0, 0, 0, 0.3);
}
</style>
