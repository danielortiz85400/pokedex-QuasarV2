<template>
  <div>
    <q-card class="card-content shadow-18">
      <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png
      `" class="img-card-content" />
      <q-toolbar class="glossy text-white flex justify-center"
        :style="`background:rgba(${colorCorrectionToolbar},0.7)`">
        <q-tabs v-model="tab" dense class="text-white shadow-1" narrow-indicator align="justify">
          <q-tab class="text-white" name="description" icon="description" label="Description" />
          <q-tab class="text-white" name="information" icon="info" label="Information" />
        </q-tabs>
      </q-toolbar>
      <q-separator />

      <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
        <!-- DESCRIPCION -->
        <q-tab-panel name="description" class="q-tab-panel__detail">
          <div class="q-px-lg no-pointer-events">
            <q-timeline :color="colorCorrectionTabPanel">
              <q-timeline-entry v-for="(detail, k, i) in description" :key="i" icon="info">
                <template v-slot:subtitle>
                  <q-chip class="text-white glossy shadow-5 no-pointer-event" square :color="colorCorrectionTabPanel">
                    {{ k }}
                  </q-chip>
                </template>
                <div class="text-detail q-pl-md text-capitalize">
                  <q-item-label caption>{{
                      detail || "Not found"
                  }}</q-item-label>
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </q-tab-panel>
        <!-- INFORMACION -->
        <q-tab-panel name="information" class="q-pa-sm q-tab-panel__detail">
          <div class="q-px-lg no-pointer-events">
            <q-timeline :color="colorCorrectionTabPanel">
              <q-timeline-entry v-for="(detail, k, i) in information" :key="i" icon="info">
                <template v-slot:subtitle>
                  <q-chip class="text-white glossy shadow-5" square :color="colorCorrectionTabPanel">
                    {{ k }}
                  </q-chip>
                </template>

                <div v-for="(info, i) in detail" :key="i" class="text-detail q-pl-md text-capitalize">
                  <q-item-label caption>{{ info }}</q-item-label>
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { colorTransform } from "../utils/utils";
const props = defineProps([
  "id",
  "colorMain",
  "detailsDes", //Descripcion
  "capture_rate",
  "generation",
  "growth_rate",
  "habitat",
  "shape",
  "detailsInfo", //Info
  "egg_groups",
  "pal_park_encounters",
]);

const colorMainRgb = colorTransform(props.colorMain);

//Mejora de aspecto (COLOR AMARILLO Y BLANCO) en q-toolbar y q-tab-panel
const colorCorrectionToolbar = computed(() =>
  ["yellow", "white"].includes(props.colorMain) ? "248, 176, 49" : colorMainRgb
);
const colorCorrectionTabPanel = computed(() =>
  ["yellow", "white"].includes(props.colorMain) ? "orange-4" : props.colorMain
);
const description = ref({
  ...props.detailsDes,
  capture_rate: props.capture_rate,
  generation: props.generation,
  growth_rate: props.growth_rate,
  habitat: props.habitat,
  shape: props.shape,
});

const information = ref({
  ...props.detailsInfo,
  egg_groups: props.egg_groups,
  pal_park_encounters: props.pal_park_encounters,
});

const tab = ref("description");
const innerTab = ref("abilities");
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Acme");

.card-content {
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: 8px;
}

.img-card-content {
  position: absolute;
  opacity: 0.12;
  left: 150px;
  top: 90px;
  z-index: 1;
  width: 80%;
  height: 80%;
}

.q-timeline--dense--right .q-timeline__entry {
  padding-left: 25px;
}

.text-detail {
  font-family: acme;
}

.q-tab-panel__detail {
  max-height: 250px;
  overflow-y: scroll;
  position: relative;
  z-index: 20;
}

.q-tab-panel {
  padding: 0px;
}

*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  border-radius: 9px;
  background-color: rgb(v-bind("colorMainRgb"), 0.2);
  width: 7px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgb(v-bind("colorMainRgb"), 0.6);
  width: 5px;
  box-shadow: 0px 3px 7px 2px rgba(0, 0, 0, 0.3);
}
</style>
