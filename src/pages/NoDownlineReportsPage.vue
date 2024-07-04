<template>
  <div class="q-ml-md q-mt-lg q-mr-lg q-pa-md">
    <q-btn
      color="green"
      class="q-mb-md"
      style="width: 20px"
      no-caps
      @click="excelExport"
    >
      <div class="row justify-start items-center">
        <q-icon name="fas fa-file-excel" />
        <span class="q-ml-sm"></span>
      </div>
    </q-btn>
    <q-table
      class="no-downline-table"
      flat
      bordered
      title="No Downline (10 days from Payment Date)"
      :rows="rows"
      :columns="columns"
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
import { exportToExcel } from "src/utils/exportToExcel";

// Store Initialization
const userStore = useUserStore();

// Variable Initialization
let columnsData = [
  {
    name: "registerDate",
    label: "Register Date",
    field: "register_date",
    align: "left",
  },
  {
    name: "pendingDays",
    label: "Pending Days",
    field: "pending_days",
    align: "center",
  },
  {
    name: "customerNumber",
    label: "Customer ID",
    field: "customer_number",
    align: "center",
  },
  {
    name: "customerName",
    label: "Customer Name",
    field: "customer_name",
    align: "center",
  },
  {
    name: "customerMobileNumber",
    label: "Customer Mobile Number",
    field: "mobile_number",
    align: "center",
  },
  {
    name: "uplineID",
    label: "Upline ID",
    field: "referrer_id",
    align: "center",
  },
  {
    name: "uplineName",
    label: "Upline Name",
    field: "referrer_name",
    align: "center",
  },
  {
    name: "uplineMobileNumber",
    label: "Upline Mobile Number",
    field: "referrer_mobile_number",
    align: "center",
  },
];

const rows = ref([]);
const columns = ref(columnsData);
const filter = ref("");
const showFilter = ref(false);
const $q = useQuasar();

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

const noDownlineReport = () => {
  showLoader();

  userStore
    .getNoDownlineReports()
    .then((res) => {
      rows.value = res.data.customers_not_got_downline;
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      hideLoader();
    });
};

const excelExport = () => {
  showLoader();

  let fileName = "No_Downline_Ten_Days_From_Payment_Date.xlsx";

  let requiredData = [];

  for (let row of rows.value) {
    let data = {
      "Register Date": row.register_date,
      "Pending Days": row.pending_days,
      "Customer ID": row.customer_number,
      "Customer Name": row.customer_name,
      "Customer Mobile Number": row.mobile_number,
      "Upline ID": row.referrer_id,
      "Upline Name": row.referrer_name,
      "Upline Mobile Number": row.referrer_mobile_number,
    };

    requiredData.push(data);
  }

  exportToExcel(requiredData, fileName);
  hideLoader();
};

// Lifecycle Hooks
onMounted(() => {
  noDownlineReport();
});
</script>

<style>
.no-downline-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.no-downline-table thead {
  color: #123499;
}
</style>
