<script lang="ts" setup>
const props = defineProps({
  colors: {
    type: Array as () => string[],
    required: true,
  },
  colorIndex: {
    type: Number,
    required: true,
  },
  nextColorIndex: {
    type: Number,
    required: true,
  },
});

const colorManager = useColor();

const color = computed(() => {
  return props.colors[props.colorIndex];
});
const nextColor = computed(() => {
  return props.colors[
    (props.colorIndex + props.nextColorIndex) % props.colors.length
  ];
});
const contrast = computed(() => {
  const rgbBg = colorManager.hexToRgb(color.value);
  const rgbText = colorManager.hexToRgb(nextColor.value);

  return colorManager.contrast(rgbBg, rgbText);
});
</script>

<template>
  <div
    :style="{
      'background-color': color,
      color: nextColor,
    }"
    class="flex flex-col justify-center items-center text-xl text-center w-40 min-w-40 h-20"
  >
    <div>Lorem ipsum</div>
    <div
      :class="{ 'bg-green-200': contrast >= 3, 'bg-red-200': contrast < 3 }"
      class="mt-2 text-black inline-block px-2 py-0.5 text-xs"
    >
      {{ contrast }}

      <span v-if="contrast >= 3" class="text-green-700 font-bold"> ✓ </span>
      <span v-else class="text-red-700 font-bold"> X </span>
    </div>
  </div>
</template>

<style scoped></style>
