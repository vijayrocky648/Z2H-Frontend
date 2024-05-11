<template>
  <div class="row">
    <div class="col-12">
      <q-card class="card-size h-100vh">
        <div class="container-height">
          <div class="row q-ml-lg q-pt-lg">
            <div class="">
              <div
                style="font-size: 18px"
                class="text-bold q-pr-md header-text"
              >
                User Settings
                <q-img
                  style="width: 1.2rem"
                  class="cursor-pointer q-mx-xs"
                  :src="infoCircleIcon"
                >
                  <custom-tooltip
                    :content="userSettingsInfoContent"
                    :max-width="'20rem'"
                  />
                </q-img>
              </div>
              <div class="q-ml-lg q-mt-sm">
                <div class="row">
                  <div class="q-pt-md">
                    <span class="text-bold">
                      Page Access for different Users
                    </span>
                    <q-img
                      style="width: 1.2rem"
                      class="cursor-pointer q-mx-xs"
                      :src="infoCircleIcon"
                    >
                      <custom-tooltip
                        :content="pageAccessInfo"
                        :max-width="'24rem'"
                      />
                    </q-img>
                    <div class="q-ml-lg q-mt-sm">
                      <div class="row">
                        <div class="col-12 flex items-center justify-start">
                          <div style="min-width: 53px">Select Role:</div>
                          <div class="q-ml-sm flex items-center">
                            <div
                              style="max-width: 300px; min-width: 220px"
                              class="q-pa-md"
                            >
                              <div class="q-gutter-md">
                                <q-select
                                  filled
                                  v-model="systemRole"
                                  :options="systemRoleOptions"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <q-checkbox v-model="usersPage" label="Users">
                          <q-img
                            style="width: 1.2rem"
                            class="cursor-pointer q-mx-xs"
                            :src="infoCircleIcon"
                          >
                            <custom-tooltip
                              :content="usersPageContent"
                              :max-width="'20rem'"
                            />
                          </q-img>
                        </q-checkbox>
                      </div>
                      <div class="q-ml-lg">
                        <q-checkbox v-model="productsPage" label="Products">
                          <q-img
                            style="width: 1.2rem"
                            class="cursor-pointer q-mx-xs"
                            :src="infoCircleIcon"
                          >
                            <custom-tooltip
                              :content="productsPageContent"
                              :max-width="'20rem'"
                            />
                          </q-img>
                        </q-checkbox>
                      </div>
                      <div class="q-ml-lg">
                        <q-checkbox v-model="ordersPage" label="Orders">
                          <q-img
                            style="width: 1.2rem"
                            class="cursor-pointer q-mx-xs"
                            :src="infoCircleIcon"
                          >
                            <custom-tooltip
                              :content="ordersPageContent"
                              :max-width="'20rem'"
                            />
                          </q-img>
                        </q-checkbox>
                      </div>
                      <div class="q-ml-lg">
                        <q-checkbox v-model="customersPage" label="Customers">
                          <q-img
                            style="width: 1.2rem"
                            class="cursor-pointer q-mx-xs"
                            :src="infoCircleIcon"
                          >
                            <custom-tooltip
                              :content="customersPageContent"
                              :max-width="'20rem'"
                            />
                          </q-img>
                        </q-checkbox>
                      </div>
                      <div class="q-ml-lg">
                        <q-checkbox v-model="reportsPage" label="Reports">
                          <q-img
                            style="width: 1.2rem"
                            class="cursor-pointer q-mx-xs"
                            :src="infoCircleIcon"
                          >
                            <custom-tooltip
                              :content="reportsPageContent"
                              :max-width="'20rem'"
                            />
                          </q-img>
                        </q-checkbox>
                      </div>
                      <div class="q-ml-lg">
                        <q-checkbox v-model="settingsPage" label="Settings">
                          <q-img
                            style="width: 1.2rem"
                            class="cursor-pointer q-mx-xs"
                            :src="infoCircleIcon"
                          >
                            <custom-tooltip
                              :content="settingsPageContent"
                              :max-width="'20rem'"
                            />
                          </q-img>
                        </q-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>

      <q-card-section class="flex justify-end fixed-table-bottom">
        <div class="row no-wrap items-start justify-end">
          <div class="col-auto row justify-end pr-15">
            <q-btn
              color="primary"
              label="Save"
              class="q-ml-md"
              :disable="validateSave"
              @click="saveUserSettings"
            />
          </div>
        </div>
      </q-card-section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";
import infoCircleIcon from "src/assets/icons/info-circle.svg";
import customTooltip from "src/components/shared/CustomTooltip.vue";

// Store Initialization
const generalStore = useGeneralStore();

// Variable Initialization
const systemRole = ref("Superadmin");
const usersPage = ref(true);
const productsPage = ref(true);
const ordersPage = ref(true);
const customersPage = ref(true);
const reportsPage = ref(true);
const settingsPage = ref(true);
const $q = useQuasar();

const { userRoles, userRolePages } = storeToRefs(generalStore);

// Tooltip Variables
const userSettingsInfoContent = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Web User Settings</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Configuration of information regarding users
    (Admin Level Users). With this data, system
    will allow the user to perform actions across
    web application.
  </div>
`);
const pageAccessInfo = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Role Based Access</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Configuration of page access against different roles
    in the system.
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Example: Super Admin - All Page Access, Telecaler - Customers
  </div>
`);
const usersPageContent = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Users Page</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Contains personal information and role details of a web user.
    Also can able to add or edit or remove an user from the
    system.
  </div>
`);
const productsPageContent = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Products Page</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Contains Information about products and its prices
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Example: Sony LED TV 44 inches - Rs.64,234/-
  </div>
`);
const ordersPageContent = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Orders Page</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Contains Information about orders booked or purchases
    made by customers (Independent Distributors).
  </div>
`);
const customersPageContent = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Customers Page</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Contains Information about customers(Independent Distributors).
    Their personal info, plan details etc.,
  </div>
`);
const reportsPageContent = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Reports Page</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Different types of reports with respect to different
    business use cases. Can able to generate report and
    export an excel file.
  </div>
  <div class="q-mt-sm q-pl-md text-body2 text-white">
    Example:
  </div>
  <div class="text-body2 text-white">
    <ul>
      <li>Purchases made by customer within a certain period</li>
      <li>GST Report for an Auditors</li>
      <li>Customer Joining Report for a Telecaler</li>
    </ul>
  </div>
`);

const settingsPageContent = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Settings Page</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Has a control over the entire application configurations.
  </div>
  <div class="q-mt-sm q-pl-md text-body2 text-white">
    Example:
  </div>
  <div class="text-body2 text-white">
    <ul>
      <li>Web User Settings Configurations</li>
      <li>Mobile Users Settings Configurations</li>
    </ul>
  </div>
`);

// computed
const systemRoleOptions = computed(() => {
  return userRoles.value.map((role) => role.name);
});

const isSystemRoleSuperAdmin = computed(() => {
  return systemRole.value === "Superadmin";
});

const validateSave = computed(() => {
  if (isSystemRoleSuperAdmin.value) {
    return true;
  }

  return !(
    usersPage.value ||
    productsPage.value ||
    ordersPage.value ||
    customersPage.value ||
    reportsPage.value ||
    settingsPage.value
  );
});

// Watchers
watch(usersPage, (value) => {
  if (isSystemRoleSuperAdmin.value) {
    usersPage.value = true;
  }
});

watch(productsPage, (value) => {
  if (isSystemRoleSuperAdmin.value) {
    productsPage.value = true;
  }
});

watch(ordersPage, (value) => {
  if (isSystemRoleSuperAdmin.value) {
    ordersPage.value = true;
  }
});

watch(customersPage, (value) => {
  if (isSystemRoleSuperAdmin.value) {
    customersPage.value = true;
  }
});

watch(reportsPage, (value) => {
  if (isSystemRoleSuperAdmin.value) {
    reportsPage.value = true;
  }
});

watch(settingsPage, (value) => {
  if (isSystemRoleSuperAdmin.value) {
    settingsPage.value = true;
  }
});

watch(systemRole, (value) => {
  if (value === "Superadmin") {
    usersPage.value = true;
    productsPage.value = true;
    ordersPage.value = true;
    customersPage.value = true;
    reportsPage.value = true;
    settingsPage.value = true;
    return;
  }

  getRequiredPageListForRole();
});

// Methods
const showLoader = () => {
  $q.loading.show({
    spinner: QSpinnerFacebook,
    spinnerColor: "light-blue",
    messageColor: "white",
    backgroundColor: "light-blue",
    message: "",
  });
};

const hideLoader = () => {
  $q.loading.hide();
};

const getSystemRoleUid = () => {
  let chosenSystemRole = userRoles.value.find(
    (role) => role.name == systemRole.value
  );

  return chosenSystemRole.uid;
};

const resetAllPageChosen = () => {
  usersPage.value = false;
  productsPage.value = false;
  ordersPage.value = false;
  customersPage.value = false;
  reportsPage.value = false;
  settingsPage.value = false;
};

const getRequiredPageListForRole = () => {
  resetAllPageChosen();
  let requiredPages = userRolePages.value
    .filter((role) => role.role_name === systemRole.value && role.is_active)
    .map((page) => page.web_page_name);

  if (requiredPages.includes("users")) {
    usersPage.value = true;
  }

  if (requiredPages.includes("products")) {
    productsPage.value = true;
  }

  if (requiredPages.includes("orders")) {
    ordersPage.value = true;
  }

  if (requiredPages.includes("customers")) {
    customersPage.value = true;
  }

  if (requiredPages.includes("reports")) {
    reportsPage.value = true;
  }

  if (requiredPages.includes("settings")) {
    settingsPage.value = true;
  }
};

const saveUserSettings = () => {
  if (isSystemRoleSuperAdmin.value) {
    return;
  }

  showLoader();

  let data = {
    systemRoleUid: getSystemRoleUid(),
    users: usersPage.value,
    products: productsPage.value,
    orders: ordersPage.value,
    customers: customersPage.value,
    reports: reportsPage.value,
    settings: settingsPage.value,
  };

  generalStore
    .saveUserSettings(data)
    .then((res) => {
      if (res.data?.status === "success") {
        generalStore.getWebUserRolePages();
        $q.notify({
          message: "User Settings Updated Successfully!!!",
          type: "positive",
          position: "top",
        });
      }
    })
    .catch((err) => {
      $q.notify({
        message: "Something went Wrong. Please contact your admin!!!",
        type: "negative",
        position: "top",
      });
    })
    .finally(() => {
      hideLoader();
    });
};

// Life Cycle Hooks
onMounted(() => {
  generalStore.getWebUserRoles();
  generalStore.getWebUserRolePages();
});
</script>

<style scoped>
.card-size {
  overflow: auto;
  max-height: calc(100vh - 121px);
}

.container-height {
  overflow: auto;
  height: calc(100vh - 195px);
  padding-bottom: 30px;
}

.header-text {
  font-weight: bold;
  color: #123499;
}

.h-100vh {
  height: 100vh !important;
}

.fixed-table-bottom {
  position: absolute;
  bottom: 0px;
  border-top: 1px solid #ccc;
  -webkit-box-shadow: 0px -2px 6px 1px rgb(0 0 0 / 52%);
  -moz-box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, 0.52);
  box-shadow: 0px -2px 6px 1px rgb(0 0 0 / 52%);
  -webkit-box-shadow: 0px -2px 6px 1px rgb(217 217 217);
  -moz-box-shadow: 0px -2px 6px 1px rgba(217, 217, 217, 1);
  box-shadow: 0px -2px 6px 1px rgb(217 217 217);
  background: #fff;
  width: 100%;
}
</style>
