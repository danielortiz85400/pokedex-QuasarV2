<template>
  <q-dialog ref="dialogRef" v-model="persistent" persistent class="wrapper">
    <img :src="getImageUrl(props.type)" class="absolute-center sprite" v-if="props.type" />
    <q-card class="q-dialog-plugin" style="border-radius: 12px">
      <q-toolbar class="header-card__tolbar">
        <q-toolbar-title></q-toolbar-title>

        <q-btn class="bg-red" icon="close" color="white" push @click="onDialogCancel" />
      </q-toolbar>
      <q-card-section>
        <q-toolbar-title class="flex justify-center text_3d">
          {{ props.type }}
        </q-toolbar-title>

        <div class="card-content__types scroll q-pt-md rounded-borders">
          <q-intersection v-for="({ id }, i) in pokemons" :key="i" transition="scale"
            class="intersection-height q-pa-sm" style="height: 120px">
            <q-btn padding="xs" :style="`background:rgba(${colorType},0.1)`" glossy push
              @click="showDetail($POKEDEX_SPECIES + value.id + `/`, value.id)">
              <q-avatar size="70px">
                <q-img :src="$POKEDEX_SPRITES + id + '.png'" width="96" height="96" spinner-color="grey-1"
                  spinner-size="10px" @click="showDetail($POKEDEX_SPECIES + id + `/`, id)" />
                <q-badge rounded size="32px" floating :label="id" :style="`background:rgba(${colorType},0.9)`" />
              </q-avatar>
            </q-btn>
          </q-intersection>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { watchEffect, inject, ref } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { usePokedexFind } from "../composables/usePokedexFind";
import { useColorType } from "../composables/useTypes";
import { staticAssets } from "../utils/utils";
import DialogMain from "./DialogMain.vue";

const props = defineProps(["nameTypes", "colorMain", "type"]);

const pokemons = ref([]);
const persistent = ref(false);

const $q = useQuasar();
const { dialogRef, onDialogCancel } = useDialogPluginComponent();
const { colorType } = useColorType(props.type);
const getImageUrl = (name) => staticAssets(name);

const showDetail = async (pokedexSpecies, idPokemon) => {
  onDialogCancel();
  $q.loading.show();
  const { existingEvolutions, id, colorMain, name } = await usePokedexFind(
    pokedexSpecies,
    idPokemon
  );

  $q.dialog({
    component: DialogMain,
    componentProps: {
      existingEvolutions,
      id,
      colorMain,
      name,
    },
  });
  $q.loading.hide();
};
watchEffect(async () => {
  try {
    const req = await fetch(inject("$TYPES") + props.type + "/");
    const { pokemon } = await req.json();
    pokemons.value.push(
      ...pokemon.map(({ pokemon }) => ({
        ...pokemon,
        id: pokemon.url
          .split("/")
          .filter((id) => id)
          .pop(),
      }))
    );
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
@font-face {
  font-family: Pokemon_Solid;
  src: url(src/fonts/Pokemon_Solid.ttf);
}

.wrapper {
  backdrop-filter: blur(4px);
}

.card-content__types {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  max-width: 510px;
  height: 50vh;
  text-align: center;
  font-size: 1px;
  color: #333;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}

.sprite {
  width: 90px;
  height: 90px;
  z-index: 100;
  margin-top: -250px;
  filter: drop-shadow(1px 1px 20px rgba(v-bind("colorType"), 0.7)) drop-shadow(1px 1px 30px rgba(v-bind("colorType"), 0.7));
}

.header-card__tolbar {
  background-image: linear-gradient(to right,
      #ece9e6 0%,
      #ffffff 51%,
      #ece9e6 100%);
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}

.img-caption__card {
  padding: 0px;
  color: transparent;
  background-image: linear-gradient(to right,
      #403b4a 0%,
      #e7e9bb 51%,
      #403b4a 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  font-family: acme;
  text-transform: capitalize;
}

.text_3d {
  font-family: Pokemon_Solid, sans-serif;
  font-size: 2.125rem;
  letter-spacing: 4px;
  text-transform: capitalize;
  line-height: 2.5;
  margin-top: -28px;
  cursor: default;
  color: #ffffff;
  -webkit-text-stroke: 0.4px rgba(v-bind("colorType"), 0.6);
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15), 0 20px 30px rgba(0, 0, 0, 0.15);
}

*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  border-radius: 9px;
  background-color: rgb(v-bind("colorType"), 0.2);
  width: 7px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgb(v-bind("colorType"), 0.6);
  width: 5px;
  box-shadow: 0px 3px 7px 2px rgba(0, 0, 0, 0.3);
}
</style>
