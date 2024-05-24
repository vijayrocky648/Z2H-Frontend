<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        @click="props.toggleLeftDrawer"
        icon="menu"
        aria-label="Menu"
      />
      <q-toolbar-title> {{ pageTitle }} </q-toolbar-title>
      <q-space />
      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn
          v-if="$q.screen.gt.sm"
          round
          dense
          flat
          color="white"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="$q.fullscreen.toggle()"
        >
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { computed } from "vue";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";

// Store Initialization
const generalStore = useGeneralStore();

// Props
const props = defineProps({
  toggleLeftDrawer: {
    type: Function,
    required: true,
  },
});

// Variable Initialization
const { selectedPage } = storeToRefs(generalStore);

// Computed
const pageTitle = computed(() => {
  return `Zero To Hero / ${selectedPage.value}`;
});
</script>
