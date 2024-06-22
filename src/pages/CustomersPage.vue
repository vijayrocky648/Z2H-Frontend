<template>
  <div style="margin-top: 30px" class="q-ml-md q-mr-lg q-pa-md">
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
      class="customers-table"
      flat
      bordered
      title="Customers"
      :rows="rows"
      :columns="columns"
      row-key="customer_number"
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
      @click="editCustomerDetails"
    />
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

  <edit-customer-details-modal
    v-if="openEditCustomerPopup"
    v-model="openEditCustomerPopup"
    :show-edit-customer-popup="openEditCustomerPopup"
    :close-edit-customer-popup="closeEditCustomerPopup"
    :selected-data="selected"
  />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useUserStore } from "src/stores/user";
import { exportToExcel } from "src/utils/exportToExcel";
import editCustomerDetailsModal from "src/components/popups/editCustomerDetailsModal.vue";

// Store Initialization
const userStore = useUserStore();

// Variable Initializations
const $q = useQuasar();
let columnsData = [
  {
    name: "customerNumber",
    required: true,
    label: "Customer Number",
    align: "left",
    field: (row) => row.customer_number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    label: "Customer Name",
    field: "name",
  },
  { name: "dob", label: "Date of birth", field: "date_of_birth" },
  { name: "gender", label: "Gender", field: "gender" },
  { name: "plan", label: "Plan Name", field: "plan" },
  {
    name: "planStartDate",
    label: "Customer Registration Date",
    field: "plan_start_date",
    sortable: true,
  },
  { name: "mobileNumber", label: "Mobile Number", field: "mobile_number" },
  { name: "nomineeName", label: "Nominee Name", field: "nominee_name" },
  { name: "aadharNumber", label: "Aadhar Number", field: "aadhar_number" },
  { name: "pan", label: "PAN", field: "pan" },
  { name: "city", label: "City", field: "city" },
  { name: "town", label: "Town", field: "town" },
  { name: "district", label: "District", field: "district", sortable: true },
  { name: "state", label: "State", field: "state", sortable: true },
  { name: "address", label: "Address", field: "address" },
  { name: "pinCode", label: "Pin Code", field: "pin_code" },
  { name: "nameOfBank", label: "Name of Bank", field: "name_of_bank" },
  { name: "nameAsInBank", label: "Name as in Bank", field: "name_as_in_bank" },
  { name: "ifscCode", label: "IFSC Code", field: "ifsc_code" },
  { name: "bankBranch", label: "Bank Branch", field: "bank_branch" },
  { name: "accountNumber", label: "Account Number", field: "account_number" },
  { name: "referrerId", label: "Referrrer Id", field: "referrer_id" },
  { name: "referrerName", label: "Referrer Name", field: "referrer_name" },
  { name: "orderNumber", label: "Order Number", field: "order_number" },
  { name: "productName", label: "Product Name", field: "product_name" },
  { name: "deliveryThrough", label: "Courier Name", field: "delivery_through" },
  { name: "deliveryNumber", label: "Courier Number", field: "delivery_number" },
  { name: "courierDate", label: "Courier Date", field: "courier_date" },
  { name: "deliveryDate", label: "Delivery Date", field: "delivery_date" },
  {
    name: "orderStatus",
    label: "Courier Status",
    field: "order_status",
    sortable: true,
  },
  { name: "paymentDate", label: "Payment Date", field: "payment_date" },
  { name: "paymentMode", label: "Payment Mode", field: "payment_mode" },
  {
    name: "paymentReference",
    label: "Payment Reference",
    field: "payment_reference",
  },
  {
    name: "paymentStatus",
    label: "Payment Status",
    field: "payment_status",
    sortable: true,
  },
  {
    name: "levelOneCount",
    label: "Level One Count",
    field: "level_one_count",
  },
  {
    name: "levelOneCompleted",
    label: "Level One Status",
    field: "level_one_completed",
    sortable: true,
  },
  {
    name: "levelOneCompletedDate",
    label: "Level One Completed Date",
    field: "level_one_completed_date",
  },
  {
    name: "levelOneCommission",
    label: "Level One Commission",
    field: "level_one_commission_status",
    sortable: true,
  },
  {
    name: "levelTwoCount",
    label: "Level Two Count",
    field: "level_two_count",
  },
  {
    name: "levelTwoCompleted",
    label: "Level Two Status",
    field: "level_two_completed",
    sortable: true,
  },
  {
    name: "levelTwoCompletedDate",
    label: "Level Two Completed Date",
    field: "level_two_completed_date",
  },
  {
    name: "levelTwoCommission",
    label: "Level Two Commission",
    field: "level_two_commission_status",
    sortable: true,
  },
  {
    name: "levelThreeCount",
    label: "Level Three Count",
    field: "level_three_count",
  },
  {
    name: "levelThreeCompleted",
    label: "Level Three Status",
    field: "level_three_completed",
    sortable: true,
  },
  {
    name: "levelThreeCompletedDate",
    label: "Level Three Completed Date",
    field: "level_three_completed_date",
  },
  {
    name: "levelThreeCommission",
    label: "Level Three Commission",
    field: "level_three_commission_status",
    sortable: true,
  },
  {
    name: "levelFourCount",
    label: "Level Four Count",
    field: "level_four_count",
  },
  {
    name: "levelFourCompleted",
    label: "Level Four Status",
    field: "level_four_completed",
    sortable: true,
  },
  {
    name: "levelFourCompletedDate",
    label: "Level Four Completed Date",
    field: "level_four_completed_date",
  },
  {
    name: "levelFourCommission",
    label: "Level Four Commission",
    field: "level_four_commission_status",
    sortable: true,
  },
  {
    name: "userStatus",
    label: "User Status",
    field: "user_status",
    sortable: true,
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
const openEditCustomerPopup = ref(false);

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

const editCustomerDetails = () => {
  openEditCustomerPopup.value = true;
};

const closeEditCustomerPopup = (refreshCustomers) => {
  openEditCustomerPopup.value = false;
  if (refreshCustomers === true) {
    selected.value = [];
    customersList();
  }
};

const customersList = () => {
  showLoader();
  userStore
    .getCustomersList()
    .then((res) => {
      let responseData = res.data;
      let requiredArray = [];

      for (let data of responseData) {
        let orderDetails = data.order_details[0];
        let orderItems = orderDetails.order_items[0];

        delete data.order_details;

        let dataAdded = {
          ...data,
          ...orderDetails,
          ...orderItems,
        };

        delete dataAdded.order_items;

        requiredArray.push(dataAdded);
      }

      rows.value = requiredArray;
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
  let selectedUserUid = selected.value[0].customer_uid;
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

const excelExport = () => {
  let requiredRows = [];

  for (let row of rows.value) {
    let data = {
      "Customer Name": row.name,
      "Customer Number": row.customer_number,
      "Date of Birth": row.date_of_birth,
      Gender: row.gender,
      "Plan Name": row.plan,
      "Customer Registration Date": row.plan_start_date,
      "Mobile Number": row.mobile_number,
      "Nominee Name": row.nominee_name,
      "Aadhar Name": row.aadhar_number,
      PAN: row.pan,
      City: row.city,
      Town: row.town,
      District: row.district,
      State: row.state,
      Address: row.address,
      "Pin Code": row.pin_code,
      "Name of Bank": row.name_of_bank,
      "Name as in Bank": row.name_as_in_bank,
      "IFSC Code": row.ifsc_code,
      "Bank Branch": row.bank_branch,
      "Account Number": row.account_number,
      "Referrer Id": row.referrer_id,
      "Referrer Name": row.referrer_name,
      "Order Number": row.order_number,
      "Product Name": row.product_name,
      "Courier Name": row.delivery_through,
      "Courier Number": row.delivery_number,
      "Courier Date": row.courier_date,
      "Delivery Date": row.delivery_date,
      "Courier Status": row.order_status,
      "Payment Date": row.payment_date,
      "Payment Mode": row.payment_mode,
      "Payment Reference": row.payment_reference,
      "Payment Status": row.payment_status,
      "Level One Count": row.level_one_count,
      "Level One Status": row.level_one_completed,
      "Level One Completed Date": row.level_one_completed_date,
      "Level One Commission": row.level_one_commission_status,
      "Level Two Count": row.level_two_count,
      "Level Tow Status": row.level_two_completed,
      "Level Two Completed Date": row.level_two_completed_date,
      "Level Two Commission": row.level_two_commission_status,
      "Level Three Count": row.level_three_count,
      "Level Three Status": row.level_three_completed,
      "Level Three Completed Date": row.level_three_completed_date,
      "Level Three Commission": row.level_three_commission_status,
      "Level Four Count": row.level_four_count,
      "Level Four Status": row.level_four_completed,
      "Level Four Completed Date": row.level_four_completed_date,
      "Level Four Commission": row.level_four_commission_status,
      "User Status": row.user_status,
    };

    requiredRows.push(data);
  }

  exportToExcel(requiredRows, "customers.xlsx");
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
