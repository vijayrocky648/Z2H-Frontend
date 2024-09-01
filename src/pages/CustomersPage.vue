<template>
  <div style="margin-top: 30px" class="q-ml-md q-mr-lg q-pa-md">
    <div>
      <q-btn-toggle
        v-model="toggleSelect"
        push
        glossy
        toggle-color="primary"
        :options="toggleSelectOptions"
        no-caps
      />
    </div>
  </div>
  <div
    style="margin-top: 30px"
    class="q-ml-md q-mr-lg q-pa-md"
    v-if="toggleSelect === 'customers'"
  >
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

  <div
    v-if="enableCustomerLevels && toggleSelect === 'customers'"
    class="q-ml-md q-mr-lg q-pa-md"
  >
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

  <div
    v-if="enableCustomerLevels && toggleSelect === 'customers'"
    class="q-ml-md q-mr-lg q-pa-md"
  >
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

  <div
    v-if="enableCustomerLevels && toggleSelect === 'customers'"
    class="q-ml-md q-mr-lg q-pa-md"
  >
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

  <div
    v-if="enableCustomerLevels && toggleSelect === 'customers'"
    class="q-ml-md q-mr-lg q-pa-md"
  >
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

  <div
    v-if="toggleSelect === 'registeredUsers'"
    style="margin-top: 30px"
    class="q-ml-md q-mr-lg q-pa-md"
  >
    <q-btn
      color="green"
      class="q-mb-md"
      style="width: 20px"
      no-caps
      @click="excelExportRegisteredUsers"
    >
      <div class="row justify-start items-center">
        <q-icon name="fas fa-file-excel" />
        <span class="q-ml-sm"></span>
      </div>
    </q-btn>
    <q-table
      class="registered-users-table"
      flat
      bordered
      title="Registered Users"
      :rows="registeredUsersRows"
      :columns="registeredUsersColumns"
      row-key="name"
      :filter="registeredUserFilter"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilterRegisteredUsers"
          filled
          borderless
          dense
          debounce="300"
          v-model="registeredUserFilter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="q-ml-sm q-mr-sm"
          icon="filter_list"
          @click="showFilterRegisteredUsers = !showFilterRegisteredUsers"
          flat
        />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            style="color: #990f02"
            dense
            round
            flat
            @click="deleteRegisterUser(props)"
            icon="delete"
          ></q-btn>
        </q-td>
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
    align: "center",
  },
  {
    name: "dob",
    label: "Date of birth",
    field: "date_of_birth",
    align: "center",
  },
  {
    name: "emailAddress",
    label: "Email Address",
    field: "email_address",
    align: "center",
  },
  { name: "gender", label: "Gender", field: "gender", align: "center" },
  { name: "plan", label: "Plan Name", field: "plan", align: "center" },
  {
    name: "planStartDate",
    label: "Customer Registration Date",
    field: "plan_start_date",
    sortable: true,
    align: "center",
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    field: "mobile_number",
    align: "center",
  },
  {
    name: "nomineeName",
    label: "Nominee Name",
    field: "nominee_name",
    align: "center",
  },
  {
    name: "aadharNumber",
    label: "Aadhar Number",
    field: "aadhar_number",
    align: "center",
  },
  { name: "pan", label: "PAN", field: "pan", align: "center" },
  { name: "city", label: "City", field: "city", align: "center" },
  { name: "town", label: "Town", field: "town", align: "center" },
  {
    name: "district",
    label: "District",
    field: "district",
    sortable: true,
    align: "center",
  },
  {
    name: "state",
    label: "State",
    field: "state",
    sortable: true,
    align: "center",
  },
  { name: "address", label: "Address", field: "address", align: "center" },
  { name: "pinCode", label: "Pin Code", field: "pin_code", align: "center" },
  {
    name: "nameOfBank",
    label: "Name of Bank",
    field: "name_of_bank",
    align: "center",
  },
  {
    name: "nameAsInBank",
    label: "Name as in Bank",
    field: "name_as_in_bank",
    align: "center",
  },
  { name: "ifscCode", label: "IFSC Code", field: "ifsc_code", align: "center" },
  {
    name: "bankBranch",
    label: "Bank Branch",
    field: "bank_branch",
    align: "center",
  },
  {
    name: "accountNumber",
    label: "Account Number",
    field: "account_number",
    align: "center",
  },
  {
    name: "referrerId",
    label: "Referrrer Id",
    field: "referrer_id",
    align: "center",
  },
  {
    name: "referrerName",
    label: "Referrer Name",
    field: "referrer_name",
    align: "center",
  },
  {
    name: "orderNumber",
    label: "Order Number",
    field: "order_number",
    align: "center",
  },
  {
    name: "productName",
    label: "Product Name",
    field: "product_name",
    align: "center",
  },
  {
    name: "deliveryThrough",
    label: "Courier Name",
    field: "delivery_through",
    align: "center",
  },
  {
    name: "deliveryNumber",
    label: "Courier Number",
    field: "delivery_number",
    align: "center",
  },
  {
    name: "courierDate",
    label: "Courier Date",
    field: "courier_date",
    align: "center",
  },
  {
    name: "deliveryDate",
    label: "Delivery Date",
    field: "delivery_date",
    align: "center",
  },
  {
    name: "orderStatus",
    label: "Courier Status",
    field: "order_status",
    sortable: true,
    align: "center",
  },
  {
    name: "paymentDate",
    label: "Payment Date",
    field: "payment_date",
    align: "center",
  },
  {
    name: "paymentMode",
    label: "Payment Mode",
    field: "payment_mode",
    align: "center",
  },
  {
    name: "paymentReference",
    label: "Payment Reference",
    field: "payment_reference",
    align: "center",
  },
  {
    name: "paymentStatus",
    label: "Payment Status",
    field: "payment_status",
    sortable: true,
    align: "center",
  },
  {
    name: "levelOneCount",
    label: "Level One Count",
    field: "level_one_count",
    align: "center",
  },
  {
    name: "levelOneCompleted",
    label: "Level One Status",
    field: "level_one_completed",
    sortable: true,
    align: "center",
  },
  {
    name: "levelOneCompletedDate",
    label: "Level One Completed Date",
    field: "level_one_completed_date",
    align: "center",
  },
  {
    name: "levelOneCommission",
    label: "Level One Commission",
    field: "level_one_commission_status",
    sortable: true,
    align: "center",
  },
  {
    name: "levelTwoCount",
    label: "Level Two Count",
    field: "level_two_count",
    align: "center",
  },
  {
    name: "levelTwoCompleted",
    label: "Level Two Status",
    field: "level_two_completed",
    sortable: true,
    align: "center",
  },
  {
    name: "levelTwoCompletedDate",
    label: "Level Two Completed Date",
    field: "level_two_completed_date",
    align: "center",
  },
  {
    name: "levelTwoCommission",
    label: "Level Two Commission",
    field: "level_two_commission_status",
    sortable: true,
    align: "center",
  },
  {
    name: "levelThreeCount",
    label: "Level Three Count",
    field: "level_three_count",
    align: "center",
  },
  {
    name: "levelThreeCompleted",
    label: "Level Three Status",
    field: "level_three_completed",
    sortable: true,
    align: "center",
  },
  {
    name: "levelThreeCompletedDate",
    label: "Level Three Completed Date",
    field: "level_three_completed_date",
    align: "center",
  },
  {
    name: "levelThreeCommission",
    label: "Level Three Commission",
    field: "level_three_commission_status",
    sortable: true,
    align: "center",
  },
  {
    name: "levelFourCount",
    label: "Level Four Count",
    field: "level_four_count",
    align: "center",
  },
  {
    name: "levelFourCompleted",
    label: "Level Four Status",
    field: "level_four_completed",
    sortable: true,
    align: "center",
  },
  {
    name: "levelFourCompletedDate",
    label: "Level Four Completed Date",
    field: "level_four_completed_date",
    align: "center",
  },
  {
    name: "levelFourCommission",
    label: "Level Four Commission",
    field: "level_four_commission_status",
    sortable: true,
    align: "center",
  },
  {
    name: "userStatus",
    label: "User Status",
    field: "user_status",
    sortable: true,
    align: "center",
  },
];
let registerUsersColumnData = [
  {
    name: "name",
    required: true,
    label: "name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "registredDate",
    label: "Registered Date",
    field: "registered_date",
    align: "center",
  },
  {
    name: "dob",
    label: "Date of birth",
    field: "date_of_birth",
    align: "center",
  },
  { name: "gender", label: "Gender", field: "gender", align: "center" },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    field: "mobile_number",
    align: "center",
  },
  {
    name: "nomineeName",
    label: "Nominee Name",
    field: "nominee_name",
    align: "center",
  },
  {
    name: "aadharNumber",
    label: "Aadhar Number",
    field: "aadhar_number",
    align: "center",
  },
  { name: "pan", label: "PAN", field: "pan", align: "center" },
  { name: "city", label: "City", field: "city", align: "center" },
  { name: "town", label: "Town", field: "town", align: "center" },
  {
    name: "district",
    label: "District",
    field: "district",
    sortable: true,
    align: "center",
  },
  {
    name: "state",
    label: "State",
    field: "state",
    sortable: true,
    align: "center",
  },
  { name: "address", label: "Address", field: "address", align: "center" },
  { name: "pinCode", label: "Pin Code", field: "pin_code", align: "center" },
  {
    name: "nameOfBank",
    label: "Name of Bank",
    field: "name_of_bank",
    align: "center",
  },
  {
    name: "nameAsInBank",
    label: "Name as in Bank",
    field: "name_as_in_bank",
    align: "center",
  },
  { name: "ifscCode", label: "IFSC Code", field: "ifsc_code", align: "center" },
  {
    name: "bankBranch",
    label: "Bank Branch",
    field: "bank_branch",
    align: "center",
  },
  {
    name: "accountNumber",
    label: "Account Number",
    field: "account_number",
    align: "center",
  },
  {
    name: "referrerId",
    label: "Referrrer Id",
    field: "referrer_id",
    align: "center",
  },
  {
    name: "referrerName",
    label: "Referrer Name",
    field: "referrer_name",
    align: "center",
  },
  { name: "actions", label: "Actions", field: "", align: "center" },
];

const columns = ref(columnsData);
const registeredUsersColumns = ref(registerUsersColumnData);
const rows = ref([]);
const registeredUsersRows = ref([]);
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
const registeredUserFilter = ref("");
const showFilter = ref(false);
const showFilterFirstLevel = ref(false);
const showFilterSecondLevel = ref(false);
const showFilterThirdLevel = ref(false);
const showFilterFourthLevel = ref(false);
const showFilterRegisteredUsers = ref(false);
const firstLevelTitle = ref("");
const secondLevelTitle = ref("");
const thirdLevelTitle = ref("");
const fourthLevelTitle = ref("");
const enableCustomerLevels = ref(false);
const openEditCustomerPopup = ref(false);
const toggleSelectOptions = ref([
  { label: "Customers", value: "customers" },
  { label: "Registered Users", value: "registeredUsers" },
]);
const toggleSelect = ref("customers");

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

const deleteRegisterUser = (registeredUser) => {
  let payload = {
    registerUserUid: registeredUser.row.uid,
  };
  userStore
    .deleteRegisteredUser(payload)
    .then((res) => {
      registeredUsersList();
      $q.notify({
        message: "Registered User Deleted Successfully!!!",
        type: "positive",
        position: "top",
      });
    })
    .catch((err) => {
      $q.notify({
        message: "Something went Wrong. Please contact your admin!!!",
        type: "negative",
        position: "top",
      });
    })
    .finally(() => {});
};

const registeredUsersList = () => {
  showLoader();
  userStore
    .getRegisteredUsers()
    .then((res) => {
      let responseData = res.data;
      registeredUsersRows.value = responseData.data;
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      hideLoader();
    });
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
        };
        dataAdded.order_number = orderDetails.order_number;
        dataAdded.delivery_through = orderDetails.delivery_through;
        dataAdded.delivery_number = orderDetails.delivery_number;
        dataAdded.courier_date = orderDetails.courier_date;
        dataAdded.delivery_date = orderDetails.delivery_date;
        dataAdded.order_status = orderDetails.order_status;
        dataAdded.payment_date = orderDetails.payment_date;
        dataAdded.payment_mode = orderDetails.payment_mode;
        dataAdded.payment_reference = orderDetails.payment_reference;
        dataAdded.payment_status = orderDetails.payment_status;
        dataAdded.product_name = orderItems.product_name;

        delete dataAdded.order_items;

        requiredArray.push(dataAdded);
      }

      rows.value = requiredArray;

      registeredUsersList();
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
      "Email Address": row.email_address,
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

  exportToExcel(requiredRows, "Customers.xlsx");
};

const excelExportRegisteredUsers = () => {
  let requiredRows = [];

  for (let row of registeredUsersRows.value) {
    let data = {
      "Register User Name": row.name,
      "Registered Date": row.registered_date,
      "Date of Birth": row.date_of_birth,
      Gender: row.gender,
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
    };

    requiredRows.push(data);
  }

  exportToExcel(requiredRows, "Registered_Users.xlsx");
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

.registered-users-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.registered-users-table thead {
  color: #123499;
}
</style>

<style lang="sass">
.registered-users-table
  thead tr:last-child th:last-child
    background-color: #00b4ff

  td:last-child
    background-color: #00b4ff

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
