<template>
  <q-drawer
    v-model="props.leftDrawerOpen"
    show-if-above
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    :width="200"
    bordered
    class="bg-primary text-white"
  >
  <q-list>
    <q-item active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="person"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Users</q-item-label>
      </q-item-section>
    </q-item>

    <q-item active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="card_giftcard"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Products</q-item-label>
      </q-item-section>
    </q-item>

    <q-item active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="shopping_cart"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Orders</q-item-label>
      </q-item-section>
    </q-item>

    <q-item active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="person"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Customers</q-item-label>
      </q-item-section>
    </q-item>

    <q-item active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="insert_chart"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Reports</q-item-label>
      </q-item-section>
    </q-item>

    <q-item to="/customer-settings" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="settings"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Settings</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  </q-drawer>
</template>

<script setup>
import {ref} from "vue";

// variable Initialization
const miniState = ref(false);

// Props
const props = defineProps({
  leftDrawerOpen: {
    type: Boolean,
    required: true,
  }
});

</script>
