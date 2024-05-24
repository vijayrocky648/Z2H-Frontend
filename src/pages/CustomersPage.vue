<template>
  <div style="margin-top: 30px" class="q-ml-md q-mr-lg q-pa-md">
    <q-table
      class="customers-table"
      flat
      bordered
      title="Customers"
      :rows="rows"
      :columns="columns"
      row-key="name"
      selection="single"
      v-model:selected="selected"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilter"
          filled
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          icon="filter_list"
          @click="showFilter = !showFilter"
          flat
        />
      </template>
    </q-table>
  </div>

  <div v-if="enableCustomerLevels" class="q-ml-md q-mr-lg q-pa-md">
    <q-table
      class="customers-table"
      flat
      bordered
      :title="firstLevelTitle"
      :rows="rowsFirstLevel"
      :columns="columns"
      row-key="name"
      :filter="filterFirstLevel"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilterFirstLevel"
          filled
          borderless
          dense
          debounce="300"
          v-model="filterFirstLevel"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          icon="filter_list"
          @click="showFilterFirstLevel = !showFilterFirstLevel"
          flat
        />
      </template>
    </q-table>
  </div>

  <div v-if="enableCustomerLevels" class="q-ml-md q-mr-lg q-pa-md">
    <q-table
      class="customers-table"
      flat
      bordered
      :title="secondLevelTitle"
      :rows="rowsSecondLevel"
      :columns="columns"
      row-key="name"
      :filter="filterSecondLevel"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilterSecondLevel"
          filled
          borderless
          dense
          debounce="300"
          v-model="filterSecondLevel"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          icon="filter_list"
          @click="showFilterSecondLevel = !showFilterSecondLevel"
          flat
        />
      </template>
    </q-table>
  </div>

  <div v-if="enableCustomerLevels" class="q-ml-md q-mr-lg q-pa-md">
    <q-table
      class="customers-table"
      flat
      bordered
      :title="thirdLevelTitle"
      :rows="rowsThirdLevel"
      :columns="columns"
      row-key="name"
      :filter="filterThirdLevel"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilterThirdLevel"
          filled
          borderless
          dense
          debounce="300"
          v-model="filterThirdLevel"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          icon="filter_list"
          @click="showFilterThirdLevel = !showFilterThirdLevel"
          flat
        />
      </template>
    </q-table>
  </div>

  <div v-if="enableCustomerLevels" class="q-ml-md q-mr-lg q-pa-md">
    <q-table
      class="customers-table"
      flat
      bordered
      :title="fourthLevelTitle"
      :rows="rowsFourthLevel"
      :columns="columns"
      row-key="name"
      :filter="filterFourthLevel"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilterFourthLevel"
          filled
          borderless
          dense
          debounce="300"
          v-model="filterFourthLevel"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          icon="filter_list"
          @click="showFilterFourthLevel = !showFilterFourthLevel"
          flat
        />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useUserStore } from "src/stores/user";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";

// Store Initialization
const userStore = useUserStore();
const generalStore = useGeneralStore();

// Variable Initializations
const $q = useQuasar();
const { selectedPage } = storeToRefs(generalStore);
let columnsData = [
  {
    name: "name",
    required: true,
    label: "Customer name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "dob", label: "Date of birth", field: "date_of_birth" },
  { name: "gender", label: "Gender", field: "gender", sortable: true },
  { name: "plan", label: "Plan Name", field: "plan" },
  { name: "planStartDate", label: "Plan Start Date", field: "plan_start_date" },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    field: "mobile_number",
  },
  {
    name: "levelOneCount",
    label: "Level One Count",
    field: "level_one_count",
  },
  {
    name: "levelTwoCount",
    label: "Level Two Count",
    field: "level_two_count",
  },
  {
    name: "levelThreeCount",
    label: "Level Three Count",
    field: "level_three_count",
  },
  {
    name: "levelFourCount",
    label: "Level Four Count",
    field: "level_four_count",
  },
];

const columns = ref(columnsData);
const rows = ref([]);
const rowsFirstLevel = ref([]);
const rowsSecondLevel = ref([]);
const rowsThirdLevel = ref([]);
const rowsFourthLevel = ref([]);
const selected = ref([]);
const filter = ref("");
const filterFirstLevel = ref("");
const filterSecondLevel = ref("");
const filterThirdLevel = ref("");
const filterFourthLevel = ref("");
const showFilter = ref(false);
const showFilterFirstLevel = ref(false);
const showFilterSecondLevel = ref(false);
const showFilterThirdLevel = ref(false);
const showFilterFourthLevel = ref(false);
const firstLevelTitle = ref("");
const secondLevelTitle = ref("");
const thirdLevelTitle = ref("");
const fourthLevelTitle = ref("");
const enableCustomerLevels = ref(false);

// Functions
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

const customersList = () => {
  showLoader();
  userStore
    .getCustomersList()
    .then((res) => {
      rows.value = res.data;
    })
    .catch((err) => {
      console.log("errror", err);
    })
    .finally(() => {
      hideLoader();
    });
};

const getCustomersUnderSelectedUser = () => {
  showLoader();
  let selectedUserUid = selected.value[0].uid;
  firstLevelTitle.value = `First Level Customers Under ${selected.value[0].name}`;
  secondLevelTitle.value = `Second Level Customers Under ${selected.value[0].name}`;
  thirdLevelTitle.value = `Third Level Customers Under ${selected.value[0].name}`;
  fourthLevelTitle.value = `Fourth Level Customers Under ${selected.value[0].name}`;
  userStore
    .getCustomerDetails(selectedUserUid)
    .then((response) => {
      let responseData = response.data;
      rowsFirstLevel.value = responseData.first_level_customers;
      rowsSecondLevel.value = responseData.second_level_customers;
      rowsThirdLevel.value = responseData.third_level_customers;
      rowsFourthLevel.value = responseData.fourth_level_customers;
      enableCustomerLevels.value = true;
    })
    .catch((error) => {
      console.log("error", error);
    })
    .finally(() => {
      hideLoader();
    });
};

// Watchers
watch(selected, (value) => {
  if (value.length) {
    getCustomersUnderSelectedUser();
  } else {
    rowsFirstLevel.value = [];
    rowsSecondLevel.value = [];
    rowsThirdLevel.value = [];
    rowsFourthLevel.value = [];
    enableCustomerLevels.value = false;
  }
});

// Lifecycle Hooks
onMounted(() => {
  selectedPage.value = "Customers";
  customersList();
});
</script>

<style>
.customers-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.customers-table thead {
  color: #123499;
}
</style>
