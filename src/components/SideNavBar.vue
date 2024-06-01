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
        to="/products"
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
        to="/registration-payments"
        active-class="q-item-no-link-highlighting"
      >
        <q-item-section avatar>
          <q-icon name="shopping_cart" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Reg Payments</q-item-label>
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

      <q-item
        v-if="showCommissionPage"
        active-class="q-item-no-link-highlighting"
        class="report-icon"
      >
        <q-item-section avatar>
          <q-icon name="fas fa-percent" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Commission</q-item-label>
        </q-item-section>
      </q-item>

      <q-expansion-item
        v-if="showReportsPage"
        icon="insert_chart"
        label="Reports"
      >
        <q-list class="q-pl-lg">
          <q-item
            active-class="q-item-no-link-highlighting"
            class="report-icon"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-bullhorn" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Sales</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            active-class="q-item-no-link-highlighting"
            class="report-icon"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-angle-down" />
            </q-item-section>
            <q-item-section>
              <q-item-label>No Downline</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            active-class="q-item-no-link-highlighting"
            class="report-icon"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-percent" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Commission</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            active-class="q-item-no-link-highlighting"
            class="report-icon"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-file-invoice" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Sales Tax</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            active-class="q-item-no-link-highlighting"
            class="report-icon"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-money-bill" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Income Tax</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

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

const showCommissionPage = computed(() => {
  return !!isUserRoleSuperAdmin.value;
});

// Methods
const logout = () => {
  userStore.logoutUser();
};
</script>

<style>
.report-icon .q-item__section--side > .q-icon {
  font-size: 19px;
}
</style>
