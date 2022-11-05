<template>
  <q-dialog ref="dialogRef" v-model="persistent" persistent class="wrapper">
    <q-img v-if="pokemonSpritesMain !== null" fit="contain" spinner-color="white" :src="pokemonSpritesMain"
      class="absolute-center overflow-hidden sprite" />
    <img v-else src="../assets/spriteNotAvailable.png" class="absolute-center" style="z-index: 100; margin-top: -280px"
      width="150" height="190" />

    <q-card class="q-dialog-plugin card-detail bg-white overflow-hidden" style="padding: 3px" @mousemove="onMouseMove">
      <q-toolbar class="header-card__tolbar">
        <q-toolbar-title class="text-h4 q-pa-md text-left text_3d">#{{ props.id }}</q-toolbar-title>
        <q-btn class="bg-red" icon="close" color="white" push @click="onDialogCancel" />
      </q-toolbar>
      <q-card-section class="bg-white">
        <q-toolbar-title class="text-h4 flex justify-center">
          <div class="text-capitalize no-pointer-events text_3d" style="line-height: 2.5">
            {{ props.name }}
          </div>
        </q-toolbar-title>

        <!-- TIPOS  -->
        <Types @showTypes="showTypes" :nameTypes="nameTypes" :colorMain="colorMain" />

        <!-- EVOLUCIONES -->
        <div class="q-gutter-y-sm">
          <q-option-group v-model="tab" class="flex justify-center options-group__tabs" :color="props.colorMain"
            :options="[
              { label: 'Evolutions', value: 'Evolutions' },
              { label: 'Details', value: 'Details' },
            ]" />
          <q-tab-panels v-model="tab" animated transition-prev="jump-left" transition-next="jump-right"
            class="tab-panels__options">
            <!--PANEL DE EVOLUCIONES-->
            <q-tab-panel name="Evolutions">
              <PokemonEvolutions v-bind="props" @onDialogCancel="onDialogCancel" />
              <!-- STATS -->
              <Stats :id="props.id" />
            </q-tab-panel>
            <q-tab-panel name="Details">
              <Detail :detailsDes="detailsDes" :detailsInfo="detailsInfo" v-bind="props" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { colorTransform } from "../utils/utils";
import Detail from "./PokemonDetails.vue";
import SearchByType from "./SearchByType.vue";
import Types from "./PokemonTypes.vue";
import PokemonEvolutions from "./PokemonEvolutions.vue";
import Stats from "./PokemonStats.vue";
import { usePokedex } from "../composables/usePokedex";

const props = defineProps([
  "existingEvolutions",
  "id",
  "colorMain",
  "name",
  "capture_rate",
  "generation",
  "growth_rate",
  "habitat",
  "shape",
  "egg_groups",
  "pal_park_encounters",
]);

const persistent = ref(false);
const tab = ref("Evolutions");

const $q = useQuasar();
const pokemonColorMain = colorTransform(props.colorMain);
const { dialogRef, onDialogCancel } = useDialogPluginComponent();
const { pokemonSpritesMain, nameTypes, detailsDes, detailsInfo } = usePokedex(
  props.id
);

const showTypes = (type) => {
  onDialogCancel();

  $q.dialog({
    component: SearchByType,
    componentProps: {
      type,
    },
  });
};

const $ = (selector) => document.querySelector(selector);
const onMouseMove = () => {
  const wrapper = $(".wrapper");
  const card = $(".card-detail");

  const { width, height } = wrapper.getBoundingClientRect();
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  wrapper.addEventListener("mousemove", (e) => {
    const { pageX, pageY } = e;
    const rotationX = ((pageX - halfWidth) / halfWidth) * 15;
    const rotationy = ((pageY - halfHeight) / halfHeight) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotationy}deg)  rotateY(${rotationX}deg)`;
  });
};
</script>

<style scoped>
@font-face {
  font-family: Pokemon_Solid;
  src: url(src/fonts/Pokemon_Solid.ttf);
}

* {
  --font-main: Pokemon_Solid, sans-serif;
  --box-shadow-main: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}

.wrapper {
  backdrop-filter: blur(4px);
}

.sprite {
  box-shadow: none;
  width: 170px;
  height: 190px;
  z-index: 100;
  margin-top: -270px;
  filter: drop-shadow(10px 0px 20px rgba(v-bind("pokemonColorMain"), 0.5)) drop-shadow(10px 0px 50px rgba(v-bind("pokemonColorMain"), 0.5));
}

.card-detail::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -10;
  background: linear-gradient(45deg,
      #fb0094,
      #0000ff,
      #00ff00,
      #ffff00,
      #ff0000,
      #fb0094,
      #0000ff,
      #00ff00,
      #ffff00,
      #ff0000);
  background-size: 250%;
  animation: degr 13s linear infinite;
  filter: blur(10px);
}

@keyframes degr {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 250% 0%;
  }

  100% {
    background-position: 0% 0;
  }
}

.header-card__tolbar {
  background-image: linear-gradient(to right,
      #ece9e6 0%,
      #ffffff 51%,
      #ece9e6 100%);
  transition: all 1s;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}

.card-detail .header-card__tolbar:hover {
  transition: 0.2s linear;
  background-position: right 290px center;
}

.options-group__tabs {
  font-family: var(--font-main);
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.9);
  text-shadow: 1px 2px 3px rgba(150, 150, 150, 1);
  box-shadow: var(--box-shadow-main);
  border-radius: 8px;
}

.tab-panels__options {
  box-shadow: var(--box-shadow-main);
  border-radius: 8px;
}

.text_3d {
  font-family: var(--font-main);
  letter-spacing: 4px;
  margin-top: -25px;
  cursor: pointer;
  color: #ffffff;
  -webkit-text-stroke: 0.4px rgba(v-bind(pokemonColorMain), 0.6);
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15), 0 20px 30px rgba(0, 0, 0, 0.15);
}
</style>
