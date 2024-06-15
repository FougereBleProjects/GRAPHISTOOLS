<script lang="ts" setup>
import GridCase from "~/components/screens/parts/grid-case.vue";

const props = defineProps({
  colors: {
    type: Array as () => string[],
    required: true,
  },
});

const greyMode = ref<boolean>(false);

const nbCols = computed(() => {
  return props.colors.length * 2 + 1;
});
</script>

<template>
  <div>
    <div class="mb-2">
      <input v-model="greyMode" type="checkbox" />
      Niveau de gris
    </div>
    <div class="border-4 inline-block">
      <div v-for="(line, lineIndex) in nbCols" :key="lineIndex">
        <div class="flex">
          <GridCase
            v-for="(col, colIndex) in nbCols"
            :key="colIndex"
            :col-index="colIndex"
            :colors="colors"
            :grey-mode="greyMode"
            :line-index="lineIndex"
            :nb-cols="nbCols"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
