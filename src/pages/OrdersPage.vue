<template>
  <div class="row q-pt-md q-ml-lg">
    <div class="col-2">
      <p style="color: #123499" class="text-bold">From Order Date</p>
      <q-input
        v-model="orderFromDate"
        style="max-width: 150px"
        outlined
        dense
        autofocus
        type="date"
      />
    </div>
    <div class="col-2">
      <p style="color: #123499" class="text-bold">To Order Date</p>
      <q-input
        v-model="orderToDate"
        style="max-width: 150px"
        outlined
        dense
        autofocus
        type="date"
      />
    </div>
    <div class="col-2">
      <p style="color: #123499" class="text-bold">Order Status</p>
      <q-select
        filled
        style="width: 200px; max-height: 100px"
        v-model="orderStatus"
        :options="orderStatusOptions"
      />
    </div>
    <div class="col-2 q-ml-lg q-mt-lg">
      <q-btn
        unelevated
        color="primary"
        label="Search"
        no-caps
        @click="getSearchData"
      />
    </div>
  </div>
  <div class="q-ml-md q-mt-sm q-mr-lg q-pa-md">
    <q-btn color="green" class="q-mb-md" no-caps @click="excelExport">
      <div class="row justify-start items-center">
        <q-icon name="fas fa-file-excel" />
        <span class="q-ml-sm">Export</span>
      </div>
    </q-btn>
    <q-table
      class="orders-table"
      flat
      bordered
      title="Orders"
      :rows="rows"
      :columns="columns"
      row-key="order_id"
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
    <q-btn
      class="q-mt-md"
      color="primary"
      label="Edit"
      :disable="!selected.length"
      @click="editOrderDetails"
    />
  </div>
  <edit-order-details-modal
    v-if="openNewUserPopup"
    v-model="openNewUserPopup"
    :show-new-user-popup="openNewUserPopup"
    :close-new-user-popup="closeNewUserPopup"
    :selected-data="selected"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import editOrderDetailsModal from "src/components/popups/editOrderDetailsModal.vue";
import { exportToExcel } from "src/utils/exportToExcel";

// Store Initialization
const generalStore = useGeneralStore();

// Variable Initializations
const openNewUserPopup = ref(false);
const $q = useQuasar();
let columnsData = [
  {
    name: "orderId",
    required: true,
    label: "Order Id",
    align: "left",
    field: (row) => row.order_id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "orderDate",
    label: "Order Date",
    field: "order_date",
    sortable: true,
  },
  { name: "customerName", label: "Customer Name", field: "customer_name" },
  { name: "mobileNumber", label: "Mobile Number", field: "mobile_number" },
  { name: "cgst", label: "CGST Amount", field: "order_cgst_amount" },
  { name: "sgst", label: "SGST Amount", field: "order_sgst_amount" },
  { name: "igst", label: "IGST Amount", field: "order_igst_amount" },
  {
    name: "gstTotal",
    label: "GST Total Amount",
    field: "order_gst_total_amount",
  },
  {
    name: "orderTotal",
    label: "Order Total Amount",
    field: "order_total_amount",
  },
  { name: "orderStatus", label: "Order Status", field: "order_status" },
  { name: "courierDate", label: "Courier Date", field: "courier_date" },
  {
    name: "deliveryThrough",
    label: "Courier Name",
    field: "delivery_through",
  },
  {
    name: "deliveryNumber",
    label: "Courier Number",
    field: "delivery_number",
  },
  {
    name: "deliveryAddress",
    label: "Delivery Address",
    field: "delivery_address",
  },
  { name: "deliveryDate", label: "Delivery Date", field: "delivery_date" },
  { name: "paymentMode", label: "Payment Mode", field: "payment_mode" },
  { name: "paymentStatus", label: "Payment Status", field: "payment_status" },
  { name: "paymentDate", label: "Payment Date", field: "payment_date" },
  {
    name: "paymentReference",
    label: "Payment Reference",
    field: "payment_reference",
  },
];

const columns = ref(columnsData);
const rows = ref([]);
const selected = ref([]);
const filter = ref("");
const showFilter = ref(false);
const orderStatus = ref("Pending");
const orderFromDate = ref("");
const orderToDate = ref("");
let orderStatusData = [
  { label: "pending", name: "Pending" },
  { label: "couriered", name: "Couriered" },
  { label: "delivered", name: "Delivered" },
  { label: "cancelled", name: "Cancelled" },
];

// Computed
const orderStatusOptions = computed(() => {
  return orderStatusData.map((orderStatus) => orderStatus.name);
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

const closeNewUserPopup = (refreshData = false) => {
  openNewUserPopup.value = false;

  if (refreshData === true) {
    selected.value = [];
    ordersList();
  }
};

const editOrderDetails = () => {
  openNewUserPopup.value = true;
};

const ordersList = () => {
  showLoader();
  let queryParams = {
    fromDate: orderFromDate.value == "" ? null : orderFromDate.value,
    toDate: orderToDate.value == "" ? null : orderToDate.value,
    orderStatus: orderStatus.value,
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
  if (orderToDate.value < orderFromDate.value) {
    $q.notify({
      message:
        "Order From Date should be less than or equal to Order To Date!!!",
      type: "negative",
      position: "top",
    });

    return;
  }

  ordersList();
};

const excelExport = () => {
  let fileName = `${orderStatus.value}_orders.xlsx`;

  let requiredData = [];

  for (let row of rows.value) {
    let data = {
      "Order Id": row.order_id,
      "Order Date": row.order_date,
      "Customer Name": row.customer_name,
      "Mobile Number": row.mobile_number,
      "CGST Amount": row.order_cgst_amount,
      "SGST Amount": row.order_sgst_amount,
      "IGST Amount": row.order_igst_amount,
      "GST Total Amount": row.order_gst_total_amount,
      "Order Total Amount": row.order_total_amount,
      "Order Status": row.order_status,
      "Courier Date": row.courier_date,
      "Courier Name": row.delivery_through,
      "Courier Number": row.delivery_number,
      "Delivery Address": row.delivery_address,
      "Delivery Date": row.delivery_date,
      "Payment Mode": row.payment_mode,
      "Payment Status": row.payment_status,
      "Payment Date": row.payment_date,
    };

    requiredData.push(data);
  }

  exportToExcel(requiredData, fileName);
};

// Lifecycle Hooks
onMounted(() => {
  ordersList();
});
</script>

<style>
.orders-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.orders-table thead {
  color: #123499;
}
</style>
