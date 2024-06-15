<script lang="ts" setup>
import TextWithBg from "~/components/screens/parts/text-with-bg.vue";

const props = defineProps({
  colors: {
    type: Array as () => string[],
    required: true,
  },
});
</script>

<template>
  <div v-for="(colorB, colorBIndex) in props.colors" :key="colorB" class="mb-1">
    <div v-if="colorBIndex > 0" class="flex gap-1">
      <TextWithBg
        v-for="(colorA, colorAIndex) in props.colors"
        :key="colorA"
        :color-index="colorAIndex"
        :colors="props.colors"
        :next-color-index="colorBIndex"
      />
    </div>
  </div>
</template>

<style scoped></style>
