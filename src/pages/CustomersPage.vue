<template>
  <div style="margin-top: 50px" class="q-ml-md q-mr-lg q-pa-md">
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useUserStore } from "src/stores/user";

// Store Initialization
const userStore = useUserStore();

// Variable Initializations
const $q = useQuasar();
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
const selected = ref([]);
const filter = ref("");
const showFilter = ref(false);

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

// Lifecycle Hooks
onMounted(() => {
  customersList();
});
</script>

<style>
.customers-table .q-table__title{
  color: #1A43BF;
  font-weight: bold;
}

.customers-table thead {
  color: #123499;
}
</style>
