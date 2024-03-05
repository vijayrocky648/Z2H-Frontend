<template>
  <q-tooltip
    class="bg-grey-10 q-pa-md"
    outlined
    :delay="$tooltipDelay"
    anchor="center right"
    self="center left"
    :offset="[10, 10]"
    :max-width="props.maxWidth"
  >
    <div v-html="props.content"></div>
  </q-tooltip>
</template>
<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  maxWidth: {
    type: String,
    default: "14rem",
  },
});
</script>
