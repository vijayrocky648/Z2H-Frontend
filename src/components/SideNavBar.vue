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
      <q-item
        v-if="showUsersPage"
        to="/users"
        active-class="q-item-no-link-highlighting"
      >
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Users</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="showProductsPage"
        active-class="q-item-no-link-highlighting"
      >
        <q-item-section avatar>
          <q-icon name="card_giftcard" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Products</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="showOrdersPage"
        to="/orders"
        active-class="q-item-no-link-highlighting"
      >
        <q-item-section avatar>
          <q-icon name="shopping_cart" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Orders</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="showCustomersPage"
        to="/customers"
        active-class="q-item-no-link-highlighting"
      >
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Customers</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-if="showReportsPage" active-class="q-item-no-link-highlighting">
        <q-item-section avatar>
          <q-icon name="insert_chart" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Reports</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="showSettingsPage"
        to="/customer-settings"
        active-class="q-item-no-link-highlighting"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        to="/sign-in"
        active-class="q-item-no-link-highlighting"
        @click="logout"
      >
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";

// Store Initialization
const userStore = useUserStore();

// variable Initialization
const miniState = ref(false);
const { userInfo } = storeToRefs(userStore);

// Props
const props = defineProps({
  leftDrawerOpen: {
    type: Boolean,
    required: true,
  },
});

// Computed
const userWebPages = computed(() => {
  return userInfo.value?.web_pages;
});

const isUserRoleSuperAdmin = computed(() => {
  return userInfo.value?.role === "Superadmin";
});

const showSettingsPage = computed(() => {
  if (isUserRoleSuperAdmin.value) {
    return true;
  }

  return userWebPages.value && userWebPages.value.includes("settings");
});

const showReportsPage = computed(() => {
  if (isUserRoleSuperAdmin.value) {
    return true;
  }

  return userWebPages.value && userWebPages.value.includes("reports");
});

const showCustomersPage = computed(() => {
  if (isUserRoleSuperAdmin.value) {
    return true;
  }

  return userWebPages.value && userWebPages.value.includes("customers");
});

const showOrdersPage = computed(() => {
  if (isUserRoleSuperAdmin.value) {
    return true;
  }

  return userWebPages.value && userWebPages.value.includes("orders");
});

const showProductsPage = computed(() => {
  if (isUserRoleSuperAdmin.value) {
    return true;
  }

  return userWebPages.value && userWebPages.value.includes("products");
});

const showUsersPage = computed(() => {
  if (isUserRoleSuperAdmin.value) {
    return true;
  }

  return userWebPages.value && userWebPages.value.includes("users");
});

// Methods
const logout = () => {
  userStore.logoutUser();
};
</script>
