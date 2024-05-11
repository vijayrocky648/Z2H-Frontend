<template>
  <div style="margin-top: 50px" class="q-ml-md q-mr-lg q-pa-md">
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
import { ref, onMounted } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import editOrderDetailsModal from  "src/components/popups/editOrderDetailsModal.vue";

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
  { name: "orderDate", label: "Order Date", field: "order_date", sortable: true },
  { name: "customerName", label: "Customer Name", field: "customer_name" },
  { name: "mobileNumber", label: "Mobile Number", field: "mobile_number"},
  { name: "cgst", label: "CGST Amount", field: "order_cgst_amount" },
  { name: "sgst", label: "SGST Amount", field: "order_sgst_amount" },
  { name: "igst", label: "IGST Amount", field: "order_igst_amount" },
  { name: "gstTotal", label: "GST Total Amount", field: "order_gst_total_amount" },
  { name: "orderTotal", label: "Order Total Amount", field: "order_total_amount" },
  { name: "orderStatus", label: "Order Status", field: "order_status"},
  { name: "deliveryDate", label: "Delivery Date", field: "delivery_date"},
  { name: "deliveryThrough", label: "Delivery Through", field: "delivery_through"},
  { name: "deliveryNumber", label: "Delivery Number", field: "delivery_number"},
  { name: "deliveryAddress", label: "Delivery Address", field: "delivery_address"},
  { name: "paymentMode", label: "Payment Mode", field: "payment_mode"},
  { name: "paymentStatus", label: "Payment Status", field: "payment_status"},
  { name: "paymentDate", label: "Payment Date", field: "payment_date"},
  { name: "paymentReference", label: "Payment Reference", field: "payment_reference"},
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

const closeNewUserPopup = () => {
  openNewUserPopup.value = false;
};

const editOrderDetails = () => {
  openNewUserPopup.value = true;
};

const ordersList = () => {
  showLoader();
  generalStore
    .getOrders()
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
  ordersList();
});
</script>

<style>
.orders-table .q-table__title{
  color: #1A43BF;
  font-weight: bold;
}

.orders-table thead {
  color: #123499;
}
</style>
