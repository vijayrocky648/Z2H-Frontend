<template>
  <div class="container">
    <div class="q-pa-lg hidescroll">
      <q-tabs
        v-model="tab"
        indicator-color="black"
        class="text-black top-borders-rounded"
        align="left"
        active-color="blue-10"
      >
        <q-route-tab
          to="/user-settings"
          class="text-capitalize q-px-xl bg-white top-borders-rounded"
          name="userSettings"
          label="User"
        />
        <q-route-tab
          to="/customer-settings"
          class="text-capitalize q-px-xl bg-white top-borders-rounded"
          name="customerSettings"
          label="Customer"
        />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        class="rounded-edges gray-bg"
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel name="userSettings" class="q-pa-none">
          <user-settings-tab v-if="route.name === 'user-settings'" />
        </q-tab-panel>

        <q-tab-panel name="customerSettings" class="q-pa-none">
          <distiributor-settings-tab
            v-if="route.name === 'customer-settings'"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import UserSettingsTab from "src/components/tabs/UserSettingsTab.vue";
import DistiributorSettingsTab from "src/components/tabs/DistiributorSettingsTab.vue";

// Route Initialization
const route = useRoute();

// variable Initialization
const tab = ref("userSettings");
</script>

<style scoped>
.gray-bg {
  background: #e2e2e2;
}

.top-borders-rounded {
  border-radius: 10px 10px 0px 0px;
}

.rounded-edges {
  border-radius: 0px 4px 4px 4px;
}

.hidescroll {
  overflow: hidden;
  height: 100%;
  padding-bottom: 0 !important;
}

.container {
  background: rgb(226, 226, 226);
  height: 100vh;
  max-height: calc(100vh - 50px);
}
</style>
