<script lang="ts" setup>
const props = defineProps({
  colors: {
    type: Array as () => string[],
    required: true,
  },
});

const nbCols = computed(() => {
  return props.colors.length * 2 + 1;
});

const getBgColor = (lineIndex: number, colIndex: number) => {
  if (colIndex % 2 === 0 && lineIndex % 2 === 0) {
    return "transparent";
  }

  if (colIndex % 2 === 0) {
    return props.colors[(lineIndex - 1) / 2];
  } else {
    return props.colors[(colIndex - 1) / 2];
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
</script>

<template>
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
</template>

<style scoped></style>
