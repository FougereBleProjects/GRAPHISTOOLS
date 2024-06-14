<script lang="ts" setup>
const colors = ref<string[]>(["#f97316", "#84cc16", "#06b6d4", "#d946ef"]);

const nbCols = computed(() => {
  return colors.value.length * 2 + 1;
});

const getBgColor = (lineIndex: number, colIndex: number) => {
  if (colIndex % 2 === 0 && lineIndex % 2 === 0) {
    return "transparent";
  }

  if (colIndex % 2 === 0) {
    return colors.value[(lineIndex - 1) / 2];
  } else {
    return colors.value[(colIndex - 1) / 2];
  }
};

const getWidth = (colIndex: number) => {
  if (colIndex === 0) {
    return "32px";
  } else if (colIndex === nbCols.value - 1) {
    return "32px";
  } else if (colIndex % 2 === 1) {
    return "32px";
  } else {
    return "8px";
  }
};

const getHeight = (lineIndex: number) => {
  if (lineIndex === 0) {
    return "32px";
  } else if (lineIndex === nbCols.value - 1) {
    return "32px";
  } else if (lineIndex % 2 === 1) {
    return "32px";
  } else {
    return "8px";
  }
};

const removeColor = (colorIndex: number) => {
  colors.value.splice(colorIndex, 1);
};

const addColor = () => {
  colors.value.push("#000000");
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div
      class="absolute left-0 right-0 top-0 bg-gray-800 text-white flex justify-center items-center font-bold uppercase py-4"
    >
      Graphistools
    </div>
    <div class="grid max-h-screen grid-cols-1 md:grid-cols-2 gap-0 flex-1">
      <div class="border-b md:border-r overflow-auto p-4 md:p-8 pt-20 md:pt-20">
        <div class="border-4 inline-block">
          <div v-for="(line, lineIndex) in nbCols" :key="lineIndex">
            <div class="flex">
              <div
                v-for="(col, colIndex) in nbCols"
                :key="colIndex"
                :style="{
                  'background-color': getBgColor(lineIndex, colIndex),
                  width: getWidth(colIndex),
                  height: getHeight(lineIndex),
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="border-t bg-gray-50 md:border-l p-4 md:p-8 overflow-y-auto pt-4 md:pt-20"
      >
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
      </div>
    </div>
  </div>
</template>

<style scoped></style>
