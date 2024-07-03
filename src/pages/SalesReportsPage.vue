<template>
  <div class="row q-pt-md q-ml-lg">
    <div class="col-2">
      <p style="color: #123499" class="text-bold">Sales From Date</p>
      <q-input
        v-model="salesFromDate"
        style="max-width: 150px"
        outlined
        dense
        autofocus
        type="date"
      />
    </div>
    <div class="col-2">
      <p style="color: #123499" class="text-bold">Sales To Date</p>
      <q-input
        v-model="salesToDate"
        style="max-width: 150px"
        outlined
        dense
        autofocus
        type="date"
      />
    </div>
    <div class="col-2">
      <p style="color: #123499" class="text-bold">Courier Status</p>
      <q-select
        filled
        dense
        style="width: 200px; max-height: 100px"
        v-model="courierStatus"
        :options="courierStatusOptions"
      />
    </div>
    <div class="col-2 q-ml-lg q-mt-lg">
      <q-btn
        unelevated
        color="primary"
        label="Search"
        no-caps
        :disable="validateSearch"
        @click="getSearchData"
      />
    </div>
  </div>

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
      class="sales-table"
      flat
      bordered
      title="Sales"
      :rows="rows"
      :columns="columns"
      row-key="order_id"
      selection="multiple"
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

      <template #body-cell-courierStatus="props">
        <q-td :props="props">
          <q-chip
            :color="courierStatusColor(props.row.order_status)"
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.order_status }}</q-chip
          >
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import { exportToExcel } from "src/utils/exportToExcel";

// Store Initialization
const generalStore = useGeneralStore();

// Variable Initialization
let columnsData = [
  {
    name: "salesId",
    required: true,
    label: "Sales ID",
    align: "left",
    field: (row) => row.order_id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "salesDate",
    label: "Sales Date",
    field: "order_date",
    sortable: true,
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
    name: "uplineId",
    label: "Upline Id",
    field: "referrer_id",
    align: "center",
  },
  {
    name: "referrerName",
    label: "Upline Name",
    field: "referrer_name",
    align: "center",
  },
  {
    name: "referrerMobileNumber",
    label: "Upline Mobile Number",
    field: "referrer_mobile_number",
    align: "center",
  },
  {
    name: "courierStatus",
    label: "Courier Status",
    field: "order_status",
    align: "center",
  },
  {
    name: "deliveryNumber",
    label: "Courier Tracking Number",
    field: "delivery_number",
    align: "center",
  },
  {
    name: "deliveryThrough",
    label: "Courier Company",
    field: "delivery_through",
    align: "center",
  },
  {
    name: "deliveryDate",
    label: "Delivery Date",
    field: "delivery_date",
    align: "center",
  },
];
let courierStatusData = [
  { label: "all", name: "All" },
  { label: "yet_to_be_couriered", name: "Yet to be Couriered" },
  { label: "in_transit", name: "In transit" },
  { label: "delivered", name: "Delivered" },
  { label: "cancelled", name: "Cancelled" },
];
const salesFromDate = ref("");
const salesToDate = ref("");
const courierStatus = ref("All");
const rows = ref([]);
const columns = ref(columnsData);
const selected = ref([]);
const filter = ref("");
const showFilter = ref(false);
const $q = useQuasar();

// Computed
const courierStatusOptions = computed(() => {
  return courierStatusData.map((orderStatus) => orderStatus.name);
});

const validateSearch = computed(() => {
  return !salesFromDate.value || !salesToDate.value;
});

const getCourierStatus = computed(() => {
  let requiredCourierStatus = courierStatusData.find(
    (status) => status.name === courierStatus.value
  );
  return requiredCourierStatus.label;
});

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

const courierStatusColor = (orderStatus) => {
  if (orderStatus === "Yet to be Couriered") {
    return "orange";
  } else if (orderStatus === "In Transit") {
    return "purple";
  } else if (orderStatus === "Delivered") {
    return "green";
  }

  return "red";
};

const salesList = () => {
  showLoader();
  let queryParams = {
    fromDate: salesFromDate.value,
    toDate: salesToDate.value,
    orderStatus: getCourierStatus.value,
  };
  generalStore
    .getOrders(queryParams)
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

const getSearchData = () => {
  if (salesToDate.value <= salesFromDate.value) {
    $q.notify({
      message:
        "Sales From Date should be less than or equal to Sales To Date!!!",
      type: "warning",
      position: "top",
    });

    return;
  }

  selected.value = [];
  salesList();
};

const excelExport = () => {
  showLoader();

  let courierStatusReplacedSpaces = courierStatus.value.replace(/ /g, "_");
  let fileName = `Sales_${courierStatusReplacedSpaces}_from_${salesFromDate.value}_to_${salesToDate.value}.xlsx`;

  let requiredData = [];

  for (let row of rows.value) {
    let data = {
      "Sales Id": row.order_number,
      "Sales Date": row.order_date,
      "Customer ID": row.customer_number,
      "Customer Name": row.customer_name,
      "Customer Mobile Number": row.mobile_number,
      "Upline ID": row.referrer_id,
      "Upline Name": row.referrer_name,
      "Upline Mobile Number": row.referrer_mobile_number,
      "Courier Status": row.order_status,
      "Courier Tracking Number": row.delivery_number,
      "Courier Company": row.delivery_through,
      "Delivery Date": row.delivery_date,
    };

    requiredData.push(data);
  }

  exportToExcel(requiredData, fileName);
  hideLoader();
};
</script>

<style>
.sales-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.sales-table thead {
  color: #123499;
}
</style>
