<template>
  <LineChart :chartData="testData" :options="options" style="height: 190px; width: 360px; border-radius: 8px"
    class="shadow-6 rounded-borders q-mt-sm q-pa-sm" />
</template>

<script setup>
import { ref, computed } from "vue";
import { usePokedex } from "../composables/usePokedex";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps(["id"]);
const { pokemonStats } = usePokedex(props.id);

const options = ref({
  responsive: true,
  chartArea: {
    backgroundColor: "rgba(251, 85, 85, 0.4)",
  },

  title: {
    display: false,
  },
  scales: {
    y: {
      suggestedMin: 1,
      suggestedMax: 200,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
});
const testData = computed(() => ({
  labels: ["Hp", "Atk", "Def", "Spc-atk", "Spc-def", "Sp"],
  datasets: [
    {
      data: pokemonStats.value,
      pointRadius: 8,
      backgroundColor: ["rgba(75, 192, 192, .3)"],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
}));
</script>
