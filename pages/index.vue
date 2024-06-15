<script lang="ts" setup>
const colors = ref<string[]>(["#f97316", "#84cc16", "#06b6d4", "#d946ef"]);
const mode = ref<string>("grid");

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

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

function luminance({ r, g, b }: any) {
  var a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrast(rgb1: any, rgb2: any) {
  var lum1 = luminance(rgb1);
  var lum2 = luminance(rgb2);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const getContrast = (bgColor: string, textColor: string) => {
  const rgbBg = hexToRgb(bgColor);
  const rgbText = hexToRgb(textColor);

  return parseFloat(contrast(rgbBg, rgbText).toFixed(2));
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
        <div class="mb-4 flex gap-2 border-b">
          <button
            :class="{ 'bg-gray-100': mode !== 'grid' }"
            class="border border-b-0 px-4 py-1"
            @click="mode = 'grid'"
          >
            Grille
          </button>
          <button
            :class="{ 'bg-gray-100': mode !== 'text' }"
            class="border border-b-0 px-4 py-1"
            @click="mode = 'text'"
          >
            Texte
          </button>
        </div>

        <div v-if="mode === 'grid'" class="border-4 inline-block">
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
        <div v-if="mode === 'text'">
          <div
            v-for="(colorB, colorBIndex) in colors"
            :key="colorB"
            class="mb-1"
          >
            <div v-if="colorBIndex > 0" class="flex gap-1">
              <div
                v-for="(colorA, colorAIndex) in colors"
                :key="colorA"
                :style="{
                  'background-color': colorA,
                  width: '200px',
                  height: '75px',
                  minWidth: '150px',
                  color: colors[(colorAIndex + colorBIndex) % colors.length],
                }"
                class="flex flex-col justify-center items-center text-xl text-center"
              >
                <div>Lorem ipsum</div>
                <div
                  :class="
                    getContrast(
                      colorA,
                      colors[(colorAIndex + colorBIndex) % colors.length],
                    ) >= 4.5
                      ? 'bg-green-200'
                      : 'bg-red-200'
                  "
                  class="mt-2 text-black inline-block px-2 py-0.5 text-xs"
                >
                  {{
                    getContrast(
                      colorA,
                      colors[(colorAIndex + colorBIndex) % colors.length],
                    )
                  }}

                  <span
                    v-if="
                      getContrast(
                        colorA,
                        colors[(colorAIndex + colorBIndex) % colors.length],
                      ) >= 4.5
                    "
                    class="text-green-700 font-bold"
                  >
                    ✓
                  </span>
                  <span v-else class="text-red-700 font-bold"> X </span>
                </div>
              </div>
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
