<template>
  <div class="q-pa-xs absolute-right flex justify-center">
    <div v-for="({ name, color }, i) in props.nameTypes" :key="i">
      <q-btn round class="shadow-4" @click="$emit('showTypes', name)">
        <q-avatar size="30px">
          <img :src="getImageUrl(name)" />
        </q-avatar>
        <q-tooltip transition-show="scale" transition-hide="scale" :style="`background:rgb(${color})`">
          {{ name }}
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { staticAssets } from "../utils/utils";
const props = defineProps(["nameTypes", "colorMain"]);

const getImageUrl = (name) => staticAssets(name);
</script>
