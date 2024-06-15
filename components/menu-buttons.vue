<script lang="ts" setup>
const mode = defineModel<string>("mode", {
  required: true,
});
</script>

<template>
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
</template>

<style scoped></style>
