<script lang="ts" setup>
import AppHeader from "~/components/app/app-header.vue";
import ColorsManager from "~/components/colors-manager.vue";
import MenuButtons from "~/components/menu-buttons.vue";
import LeftPane from "~/components/panes/left-pane.vue";
import RightPane from "~/components/panes/right-pane.vue";
import GridScreen from "~/components/screens/grid-screen.vue";
import TextScreen from "~/components/screens/text-screen.vue";

const colors = ref<string[]>(["#f97316", "#84cc16", "#06b6d4", "#d946ef"]);
const mode = ref<"grid" | "text">("grid");
</script>

<template>
  <div class="flex flex-col h-screen">
    <AppHeader />

    <div class="grid max-h-screen grid-cols-1 md:grid-cols-2 gap-0 flex-1">
      <LeftPane>
        <MenuButtons v-model:mode="mode" />

        <div v-if="mode === 'grid'">
          <GridScreen :colors="colors" />
        </div>
        <div v-if="mode === 'text'">
          <TextScreen :colors="colors" />
        </div>
      </LeftPane>

      <RightPane>
        <ColorsManager v-model:colors="colors" />
      </RightPane>
    </div>
  </div>
</template>

<style scoped></style>
