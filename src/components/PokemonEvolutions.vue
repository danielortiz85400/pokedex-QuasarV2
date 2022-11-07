<template>
  <div class="wrapper row justify-center text-center shadow-6 q-py-sm">
    <transition-group appear enter-active-class="animated zoomIn">
      <div v-for="({ value }, i) in props.existingEvolutions.filter(
        ({ status }) => status === 'fulfilled'
      )" :key="i" class="q-mx-sm">
        <q-btn class="shadow-2" glossy round size="18px"
          @click="showDetail($POKEDEX_SPECIES + value.id + `/`, value.id)">
          <q-avatar class="avatar__evolutions">
            <img :src="$POKEDEX_SPRITES + value.id + '.png'" width="96" height="96" />
            <q-badge rounded size="32px" floating :label="i + 1"
              :color="props.colorMain === 'white' ? 'second' : props.colorMain" />
          </q-avatar>
        </q-btn>
        <div class="text-center evolutions-name__tab">
          {{ value.name }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useQuasar } from "quasar";
import { usePokedexFind } from "../composables/usePokedexFind";
import { useColorType } from "../composables/useTypes";
import DialogMain from "./DialogMain.vue";

const props = defineProps(["existingEvolutions", "colorMain", "id"]);
const emit = defineEmits(["onDialogCancel"]);

const $q = useQuasar();
const { colorType: colorMain } = useColorType(props.colorMain);

const avatarNotify = inject("$SPRITES_INJECT");

const showDetail = async (pokedexSpecies, idPokemon) => {
  if (idPokemon === Number(props.id)) {
    return $q.notify({
      progress: true,
      message: "This is the pokemon on screen",
      color: "white",
      badgeColor: `${props.colorMain}`,
      textColor: `${props.colorMain}`,
      avatar: `${avatarNotify + props.id + ".png"}`,
    });
  }
  $q.loading.show();
  emit("onDialogCancel");
  const { existingEvolutions, id, colorMain, name,egg_groups,
    pal_park_encounters } = await usePokedexFind(
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
      egg_groups,
      pal_park_encounters
    },
  });
  $q.loading.hide();
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Acme");

.wrapper {
  border-radius: 8px;
}

.evolutions-name__tab {
  color: transparent;
  background-image: linear-gradient(to right,
      #403b4a 0%,
      #e7e9bb 51%,
      #403b4a 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  font-family: acme;
  font-size: 1.2em;
  text-transform: capitalize;
}

.avatar__evolutions {
  background: rgba(v-bind("colorMain"), 0.1);
}
</style>
