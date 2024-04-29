<template>
  <q-layout view="lHh Lpr lFf">
    <header-comp :toggle-left-drawer="toggleLeftDrawer" />

    <side-nav-bar :leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref} from "vue";
import {useQuasar} from "quasar";
import HeaderComp from "src/components/HeaderComp.vue";
import SideNavBar from "src/components/SideNavBar.vue";

// Variable Initialization
const $q = useQuasar();
const leftDrawerOpen = ref(true);

// Functions
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

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
