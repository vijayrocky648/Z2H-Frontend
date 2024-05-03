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
      <q-toolbar-title> Zero To Hero </q-toolbar-title>
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
// Props
const props = defineProps({
  toggleLeftDrawer: {
    type: Function,
    required: true,
  },
});
</script>
