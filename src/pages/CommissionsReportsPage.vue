<template>
  <div class="row q-pt-md q-ml-lg">
    <div class="col-1 comp-size">
      <p style="color: #123499" class="text-bold">From Date</p>
      <q-input
        v-model="commissionFromDate"
        style="max-width: 150px"
        outlined
        dense
        autofocus
        type="date"
      />
    </div>
    <div class="col-1 comp-size">
      <p style="color: #123499" class="text-bold">To Date</p>
      <q-input
        v-model="commissionToDate"
        style="max-width: 150px"
        outlined
        dense
        autofocus
        type="date"
      />
    </div>
    <div class="col-1 comp-size">
      <p style="color: #123499" class="text-bold">Commission Level</p>
      <q-select
        filled
        dense
        style="width: 150px"
        v-model="commissionLevel"
        :options="commissionLevelOptions"
      />
    </div>
    <div class="col-1 comp-size">
      <p style="color: #123499" class="text-bold">Paid Status</p>
      <q-select
        filled
        dense
        style="width: 200px"
        v-model="commissionStatus"
        :options="commissionStatusOptions"
      />
    </div>
    <div class="col-1 q-ml-lg q-mt-lg">
      <q-btn
        unelevated
        color="primary"
        label="Search"
        no-caps
        :disable="validateSearch"
        @click="getCommissionsData"
      />
    </div>
  </div>

  <div class="q-ml-md q-mt-sm q-mr-lg q-pa-md">
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
      class="commissions-table"
      flat
      bordered
      title="Commissions"
      :rows="rows"
      :columns="columns"
      row-key="customer_number"
      :filter="filter"
      :visible-columns="visibleColumns"
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
          class="q-ml-sm q-mr-sm"
          icon="filter_list"
          @click="showFilter = !showFilter"
          flat
        />

        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </template>

      <template #body-cell-userStatus="props">
        <q-td :props="props">
          <q-chip
            :color="props.row.user_status === 'Active' ? 'green' : 'orange'"
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.user_status }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-levelOneCompletionStatus="props">
        <q-td :props="props">
          <q-chip
            :color="
              props.row.level_one_completion_status === 'Completed'
                ? 'green'
                : 'orange'
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.level_one_completion_status }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-levelTwoCompletionStatus="props">
        <q-td :props="props">
          <q-chip
            :color="
              props.row.level_two_completion_status === 'Completed'
                ? 'green'
                : 'orange'
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.level_two_completion_status }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-levelThreeCompletionStatus="props">
        <q-td :props="props">
          <q-chip
            :color="
              props.row.level_three_completion_status === 'Completed'
                ? 'green'
                : 'orange'
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.level_three_completion_status }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-levelFourCompletionStatus="props">
        <q-td :props="props">
          <q-chip
            :color="
              props.row.level_four_completion_status === 'Completed'
                ? 'green'
                : 'orange'
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.level_four_completion_status }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-levelOneCommissionPaidStatus="props">
        <q-td :props="props">
          <q-chip
            :color="
              commissionPaymentColor(props.row.level_one_commission_paid_status)
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.level_one_commission_paid_status }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-levelTwoCommissionPaidStatus="props">
        <q-td :props="props">
          <q-chip
            :color="
              commissionPaymentColor(props.row.level_two_commission_paid_status)
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.level_two_commission_paid_status }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-levelThreeCommissionPaidStatus="props">
        <q-td :props="props">
          <q-chip
            :color="
              commissionPaymentColor(
                props.row.level_three_commission_paid_status
              )
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.level_three_commission_paid_status }}</q-chip
          >
        </q-td>
      </template>

      <template #body-cell-levelFourCommissionPaidStatus="props">
        <q-td :props="props">
          <q-chip
            :color="
              commissionPaymentColor(
                props.row.level_four_commission_paid_status
              )
            "
            text-color="white"
            dense
            class="text-weight-bolder"
            square
            >{{ props.row.level_four_commission_paid_status }}</q-chip
          >
        </q-td>
      </template>
    </q-table>
  </div>

  <edit-commission-details-modal
    v-if="openEditCommissionPopup"
    v-model="openEditCommissionPopup"
    :show-edit-commission-popup="openEditCommissionPopup"
    :close-edit-commission-popup="closeEditCommissionPopup"
    :selected-data="selected"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useUserStore } from "src/stores/user";
import { exportToExcel } from "src/utils/exportToExcel";
import editCommissionDetailsModal from "src/components/popups/editCommissionDetailsModal.vue";

// Store Initialization
const userStore = useUserStore();

// Variable Initialization
const commissionFromDate = ref(null);
const commissionToDate = ref(null);
const commissionStatus = ref("All");
const commissionLevel = ref("All");
const commissionStatusOptions = ref([
  "All",
  "Paid",
  "Yet to be paid",
  "Issue with payments",
]);
const commissionLevelOptions = ref(["All", "One", "Two", "Three", "Four"]);
const filter = ref("");
const showFilter = ref(false);
const openEditCommissionPopup = ref(false);
const selected = ref([]);
let columnsData = [
  {
    name: "customerNumber",
    required: true,
    label: "Customer ID",
    align: "left",
    field: (row) => row.customer_number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "customerName",
    label: "Customer Name",
    field: "customer_name",
    sortable: true,
    align: "left",
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    field: "mobile_number",
    sortable: true,
    align: "left",
  },
  {
    name: "bankName",
    label: "Bank Name",
    field: "name_of_bank",
    align: "left",
  },
  {
    name: "accountNumber",
    label: "Account Number",
    field: "account_number",
    align: "left",
  },
  {
    name: "ifscCode",
    label: "IFSC Code",
    field: "ifsc_code",
    align: "left",
  },
  {
    name: "pan",
    label: "PAN",
    field: "pan",
    align: "left",
  },
  {
    name: "plan",
    label: "Plan",
    field: "plan",
    align: "left",
  },
  {
    name: "registrationFee",
    label: "Registration Fee (Rs.)",
    field: "registration_fee",
    align: "center",
  },
  {
    name: "commissionFromDate",
    label: "Commission From Date",
    field: "commission_from_date",
    sortable: true,
    align: "left",
  },
  {
    name: "commissionToDate",
    label: "Commission To Date",
    field: "commission_to_date",
    sortable: true,
    align: "left",
  },
  {
    name: "levelOneCompletionStatus",
    label: "Completion (1st)",
    field: "level_one_completion_status",
    align: "center",
  },
  {
    name: "levelOneCompletionDate",
    label: "Completion Date (1st)",
    field: "level_one_completion_date",
    align: "left",
  },
  {
    name: "levelOneCommissionAmount",
    label: "Commission Amount (1st) (Rs.)",
    field: "level_one_commission_amount",
    align: "center",
  },
  {
    name: "levelOneTdsAmount",
    label: "TDS Amount (1st) (10%) (Rs.)",
    field: "level_one_tds_amount",
    align: "center",
  },
  {
    name: "levelOneAmountPayable",
    label: "Amount Payable (1st) (Rs.)",
    field: "level_one_amount_payable",
    align: "center",
  },
  {
    name: "levelOneCommissionPaidStatus",
    label: "Commission Payment (1st)",
    field: "level_one_commission_paid_status",
    sortable: true,
    align: "center",
  },
  {
    name: "levelOneCommisionPaidDate",
    label: "Commission Paid Date (1st)",
    field: "level_one_commission_paid_date",
    sortable: true,
    align: "center",
  },
  {
    name: "levelOneCommissionPaymentComments",
    label: "Commission Payment Comments (1st)",
    field: "level_one_payment_comments",
    align: "center",
  },
  {
    name: "levelTwoCompletionStatus",
    label: "Completion (2nd)",
    field: "level_two_completion_status",
    align: "center",
  },
  {
    name: "levelTwoCompletionDate",
    label: "Completion Date (2nd)",
    field: "level_two_completion_date",
    align: "left",
  },
  {
    name: "levelTwoCommissionAmount",
    label: "Commission Amount (2nd) (Rs.)",
    field: "level_two_commission_amount",
    align: "center",
  },
  {
    name: "levelTwoTdsAmount",
    label: "TDS Amount (2nd) (10%) (Rs.)",
    field: "level_two_tds_amount",
    align: "center",
  },
  {
    name: "levelTwoAmountPayable",
    label: "Amount Payable (2nd) (Rs.)",
    field: "level_two_amount_payable",
    align: "center",
  },
  {
    name: "levelTwoCommissionPaidStatus",
    label: "Commission Payment (2nd)",
    field: "level_two_commission_paid_status",
    sortable: true,
    align: "center",
  },
  {
    name: "levelTwoCommisionPaidDate",
    label: "Commission Paid Date (2nd)",
    field: "level_two_commission_paid_date",
    sortable: true,
    align: "center",
  },
  {
    name: "levelTwoCommissionPaymentComments",
    label: "Commission Payment Comments (2nd)",
    field: "level_two_payment_comments",
    align: "left",
  },
  {
    name: "levelThreeCompletionStatus",
    label: "Completion (3rd)",
    field: "level_three_completion_status",
    align: "center",
  },
  {
    name: "levelThreeCompletionDate",
    label: "Completion Date (3rd)",
    field: "level_three_completion_date",
    align: "center",
  },
  {
    name: "levelThreeCommissionAmount",
    label: "Commission Amount (3rd) (Rs.)",
    field: "level_three_commission_amount",
    align: "center",
  },
  {
    name: "levelThreeTdsAmount",
    label: "TDS Amount (3rd) (10%) (Rs.)",
    field: "level_three_tds_amount",
    align: "center",
  },
  {
    name: "levelThreeAmountPayable",
    label: "Amount Payable (3rd) (Rs.)",
    field: "level_three_amount_payable",
    align: "center",
  },
  {
    name: "levelThreeCommissionPaidStatus",
    label: "Commission Payment (3rd)",
    field: "level_three_commission_paid_status",
    sortable: true,
    align: "center",
  },
  {
    name: "levelThreeCommisionPaidDate",
    label: "Commission Paid Date (3rd)",
    field: "level_three_commission_paid_date",
    sortable: true,
    align: "center",
  },
  {
    name: "levelThreeCommissionPaymentComments",
    label: "Commission Payment Comments (3rd)",
    field: "level_three_payment_comments",
    align: "left",
  },
  {
    name: "levelFourCompletionStatus",
    label: "Completion (4th)",
    field: "level_four_completion_status",
    align: "center",
  },
  {
    name: "levelFourCompletionDate",
    label: "Completion Date (4th)",
    field: "level_four_completion_date",
    align: "center",
  },
  {
    name: "levelFourCommissionAmount",
    label: "Commission Amount (4th) (Rs.)",
    field: "level_four_commission_amount",
    align: "center",
  },
  {
    name: "levelFourTdsAmount",
    label: "TDS Amount (4th) (10%) (Rs.)",
    field: "level_four_tds_amount",
    align: "center",
  },
  {
    name: "levelFourAmountPayable",
    label: "Amount Payable (4th) (Rs.)",
    field: "level_four_amount_payable",
    align: "center",
  },
  {
    name: "levelFourCommissionPaidStatus",
    label: "Commission Payment (4th)",
    field: "level_four_commission_paid_status",
    sortable: true,
    align: "center",
  },
  {
    name: "levelFourCommisionPaidDate",
    label: "Commission Paid Date (4th)",
    field: "level_four_commission_paid_date",
    sortable: true,
    align: "center",
  },
  {
    name: "levelFourCommissionPaymentComments",
    label: "Commission Payment Comments (4th)",
    field: "level_four_payment_comments",
    align: "left",
  },
  {
    name: "userStatus",
    label: "User Status",
    field: "user_status",
    align: "center",
  },
];
const columns = ref(columnsData);
const rows = ref([]);
const visibleColumns = ref([
  "customerNumber",
  "customerName",
  "levelOneCompletionStatus",
  "levelOneCommissionPaidStatus",
  "levelTwoCompletionStatus",
  "levelTwoCommissionPaidStatus",
  "levelThreeCompletionStatus",
  "levelThreeCommissionPaidStatus",
  "levelFourCompletionStatus",
  "levelFourCommissionPaidStatus",
  "userStatus",
]);
const $q = useQuasar();

// Computed
const validateSearch = computed(() => {
  return !commissionFromDate.value || !commissionToDate.value;
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

const editCommissionDetails = (data) => {
  openEditCommissionPopup.value = true;
  selected.value = data.row;
};

const closeEditCommissionPopup = (refreshCommission) => {
  openEditCommissionPopup.value = false;
  if (refreshCommission === true) {
    selected.value = [];
    getCommissionsData();
  }
};

const commissionPaymentColor = (paymentStatus) => {
  if (paymentStatus == "Paid") {
    return "green";
  } else if (paymentStatus == "Payment Issue") {
    return "brown";
  }

  return "red";
};

const getCommissionsData = () => {
  if (commissionToDate.value < commissionFromDate.value) {
    $q.notify({
      message:
        "Commission From Date should be less than or equal to Commission To Date!!!",
      type: "warning",
      position: "top",
    });

    return;
  }

  showLoader();

  let queryParams = {
    commission_from_date: commissionFromDate.value,
    commission_to_date: commissionToDate.value,
    commission_status: commissionStatus.value,
    commission_level: commissionLevel.value,
  };

  userStore
    .getCommissionDetails(queryParams)
    .then((res) => {
      rows.value = res.data.commissions;
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

  let fileName = `Commissions_level_${commissionLevel.value}_${commissionStatus.value}_payment_status_${commissionFromDate.value}_to_${commissionToDate.value}.xlsx`;

  let requiredData = [];

  for (let row of rows.value) {
    let data = {
      "Customer Id": row.customer_number,
      "Customer Name": row.customer_name,
      "Mobile Number": row.mobile_number,
      "Bank Name": row.name_of_bank,
      "Account Number": row.account_number,
      "IFSC Code": row.ifsc_code,
      Pan: row.pan,
      Plan: row.plan,
      "Registration Fee (Rs.)": row.registration_fee,
      "Commission From Date": row.commission_from_date,
      "Commission To Date": row.commission_to_date,
      "Level One Completion Status": row.level_one_completion_status,
      "Level One Completion Date": row.level_one_completion_date,
      "Level One Commission Amount": row.level_one_commission_amount,
      "Level One TDS Amount (10%)": row.level_one_tds_amount,
      "Level One Amount Payable": row.level_one_amount_payable,
      "Level One Commssion Payment Status":
        row.level_one_commission_paid_status,
      "Level One Commission Paid Date": row.level_one_commission_paid_date,
      "Level One Commission Payment Comments": row.level_one_payment_comments,
      "Level Two Completion Status": row.level_two_completion_status,
      "Level Two Completion Date": row.level_two_completion_date,
      "Level Two Commission Amount": row.level_two_commission_amount,
      "Level Two TDS Amount (10%)": row.level_two_tds_amount,
      "Level Two Amount Payable": row.level_two_amount_payable,
      "Level Two Commssion Payment Status":
        row.level_two_commission_paid_status,
      "Level Two Commission Paid Date": row.level_two_commission_paid_date,
      "Level Two Commission Payment Comments": row.level_two_payment_comments,
      "Level Three Completion Status": row.level_three_completion_status,
      "Level Three Completion Date": row.level_three_completion_date,
      "Level Three Commission Amount": row.level_three_commission_amount,
      "Level Three TDS Amount (10%)": row.level_three_tds_amount,
      "Level Three Amount Payable": row.level_three_amount_payable,
      "Level Three Commssion Payment Status":
        row.level_three_commission_paid_status,
      "Level Three Commission Paid Date": row.level_three_commission_paid_date,
      "Level Three Commission Payment Comments":
        row.level_three_payment_comments,
      "Level Four Completion Status": row.level_four_completion_status,
      "Level Four Completion Date": row.level_four_completion_date,
      "Level Four Commission Amount": row.level_four_commission_amount,
      "Level Four TDS Amount (10%)": row.level_four_tds_amount,
      "Level Four Amount Payable": row.level_four_amount_payable,
      "Level Four Commssion Payment Status":
        row.level_four_commission_paid_status,
      "Level Four Commission Paid Date": row.level_four_commission_paid_date,
      "Level Four Commission Payment Comments": row.level_four_payment_comments,
    };

    requiredData.push(data);
  }

  exportToExcel(requiredData, fileName);
  hideLoader();
};
</script>

<style scoped>
.comp-size {
  width: 200px;
}
</style>

<style>
.commissions-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.commissions-table thead {
  color: #123499;
}
</style>

<!-- <style lang="sass">
.commissions-table
  thead tr:first-child th:first-child
    background-color: #00b4ff

  td:first-child
    background-color: #00b4ff

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1

  thead tr:last-child th:last-child
    background-color: #00b4ff

  td:last-child
    background-color: #00b4ff

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style> -->
