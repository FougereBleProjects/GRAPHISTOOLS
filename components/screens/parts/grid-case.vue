<script lang="ts" setup>
const props = defineProps({
  colors: {
    type: Array as () => string[],
    required: true,
  },
  greyMode: {
    type: Boolean,
    default: false,
  },
  nbCols: {
    type: Number,
    required: true,
  },
  colIndex: {
    type: Number,
    required: true,
  },
  lineIndex: {
    type: Number,
    required: true,
  },
});

const colorManager = useColor();

const bgColor = computed(() => {
  if (props.colIndex % 2 === 0 && props.lineIndex % 2 === 0) {
    return "transparent";
  }

  if (props.greyMode === false) {
    if (props.colIndex % 2 === 0) {
      return props.colors[(props.lineIndex - 1) / 2];
    } else {
      return props.colors[(props.colIndex - 1) / 2];
    }
  } else {
    if (props.colIndex % 2 === 0) {
      const rgb = colorManager.hexToRgb(
        props.colors[(props.lineIndex - 1) / 2],
      );
      return colorManager.rgbToGrayscale(rgb);
    } else {
      const rgb = colorManager.hexToRgb(props.colors[(props.colIndex - 1) / 2]);
      return colorManager.rgbToGrayscale(rgb);
    }
  }
});

const width = computed(() => {
  if (props.colIndex === 0) {
    return "32px";
  } else if (props.colIndex === props.nbCols - 1) {
    return "32px";
  } else if (props.colIndex % 2 === 1) {
    return "32px";
  } else {
    return "8px";
  }
});

const height = computed(() => {
  if (props.lineIndex === 0) {
    return "32px";
  } else if (props.lineIndex === props.nbCols - 1) {
    return "32px";
  } else if (props.lineIndex % 2 === 1) {
    return "32px";
  } else {
    return "8px";
  }
});
</script>

<template>
  <div
    :style="{
      'background-color': bgColor,
      width: width,
      height: height,
    }"
  ></div>
</template>

<style scoped></style>
