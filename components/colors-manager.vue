<script lang="ts" setup>
const colors = defineModel<string[]>("colors", {
  required: true,
});

const removeColor = (colorIndex: number) => {
  colors.value.splice(colorIndex, 1);
};

const addColor = () => {
  colors.value.push("#000000");
};
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <h2 class="text-lg font-bold uppercase">Couleurs</h2>
    <div
      v-for="(color, colorIndex) in colors"
      :key="colorIndex"
      class="flex gap-2"
    >
      <input
        v-model="colors[colorIndex]"
        class="border w-32 shadow rounded"
        type="color"
      />
      <input
        v-model="colors[colorIndex]"
        class="border w-full shadow rounded px-2"
        type="text"
      />
      <button
        class="bg-red-100 text-red-400 rounded px-2"
        @click="removeColor(colorIndex)"
      >
        X
      </button>
    </div>
    <button
      class="bg-green-200 text-green-800 rounded px-2 py-2"
      @click="addColor"
    >
      + Ajouter une couleur
    </button>
  </div>
</template>

<style scoped></style>
