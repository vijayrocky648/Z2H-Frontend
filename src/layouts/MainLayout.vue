<template>
  <q-layout view="lHh Lpr lFf">
    <header-comp :toggle-left-drawer="toggleLeftDrawer" />

    <side-nav-bar :leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import HeaderComp from "src/components/HeaderComp.vue";
import SideNavBar from "src/components/SideNavBar.vue";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";

// Store Initialization
const generalStore = useGeneralStore();

// Variable Initialization
const $q = useQuasar();
const leftDrawerOpen = ref(true);
const { selectedPage } = storeToRefs(generalStore);

// Functions
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

// Lifecycle Hooks
onMounted(() => {
  selectedPage.value = "Dashboard";
});
</script>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>
