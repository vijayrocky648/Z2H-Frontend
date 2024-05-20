<template>
  <div class="q-px-md q-pt-md q-pb-xs float-right">
    <q-btn
      color="primary"
      class="q-mb-md"
      no-caps
      @click="openNewUserPopup = true"
    >
      <div class="row justify-start items-center">
        <q-icon name="add" />
        <span class="q-ml-sm">New Web User</span>
      </div>
    </q-btn>
  </div>

  <div style="margin-top: 100px" class="q-ml-md q-mr-lg">
    <q-btn color="green" class="q-mb-md" no-caps @click="excelExport">
      <div class="row justify-start items-center">
        <q-icon name="fas fa-file-excel" />
        <span class="q-ml-sm">Export</span>
      </div>
    </q-btn>
    <q-table
      class="users-table"
      flat
      bordered
      title="Web Users"
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

  <create-new-user-modal
    v-if="openNewUserPopup"
    v-model="openNewUserPopup"
    :show-new-user-popup="openNewUserPopup"
    :close-new-user-popup="closeNewUserPopup"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useUserStore } from "src/stores/user";
import createNewUserModal from "src/components/popups/createNewUserModal.vue";
import { exportToExcel } from "src/utils/exportToExcel";

// Store Initialization
const userStore = useUserStore();

// Variable Initializations
const openNewUserPopup = ref(false);
const $q = useQuasar();

let columnsData = [
  {
    name: "name",
    required: true,
    label: "Web user name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "dob", label: "Date of birth", field: "date_of_birth" },
  { name: "gender", label: "Gender", field: "gender", sortable: true },
  { name: "aadharNumber", label: "AAdhar No.", field: "aadhar_number" },
  { name: "pan", label: "PAN", field: "pan" },
  {
    name: "bankAccountNumber",
    label: "Bank Account No",
    field: "account_number",
  },
  {
    name: "bankName",
    label: "Bank",
    field: "name_of_bank",
  },
  {
    name: "systemRole",
    label: "System Role",
    field: "system_role",
    sortable: true,
  },
  {
    name: "systemEmail",
    label: "System Email",
    field: "system_email",
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    field: "mobile_number",
  },
];

const columns = ref(columnsData);
const rows = ref([]);
const selected = ref([]);
const filter = ref("");
const showFilter = ref(false);

// Functions
const closeNewUserPopup = () => {
  openNewUserPopup.value = false;
};

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

const webUsersList = () => {
  showLoader();
  userStore
    .getWebUsersList()
    .then((res) => {
      rows.value = res.data;
    })
    .catch((err) => {
      console.log("errror", error);
    })
    .finally(() => {
      hideLoader();
    });
};

const excelExport = () => {
  let requiredRows = [];

  for (let row of rows.value) {
    let data = {
      Name: row.name,
      "Email Address": row.system_email,
      "Date of Birth": row.date_of_birth,
      "Marital Status": row.marital_status,
      Gender: row.gender,
      "Aadhar Number": row.aadhar_number,
      PAN: row.pan,
      "Mobile Number": row.mobile_number,
      City: row.city,
      Town: row.town,
      Address: row.address,
      "Pin Code": row.pin_code,
      "Bank Account Number": row.account_number,
      "Bank Name": row.name_of_bank,
      "User Name In Bank": row.name_as_in_bank,
      "IFSC Code": row.ifsc_code,
      "Bank Branch": row.bank_branch,
      "Personal Email Address": row.email_address,
      "Alternate Mobile Number": row.alternate_mobile_number,
    };

    requiredRows.push(data);
  }

  exportToExcel(requiredRows, "web_users.xlsx");
};

// Lifecycle Hooks
onMounted(() => {
  webUsersList();
});
</script>

<style>
.users-table .q-table__title {
  color: #123499;
  font-weight: bold;
}

.users-table thead {
  color: #123499;
}
</style>
