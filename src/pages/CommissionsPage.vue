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
    <div class="col-1 q-ml-lg q-mt-lg">
      <q-btn
        unelevated
        color="primary"
        label="Search"
        no-caps
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
import { ref } from "vue";

// Variable Initialization
const commissionFromDate = ref(null);
const commissionToDate = ref(null);
const selected = ref([]);
const filter = ref("");
const showFilter = ref(false);
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
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    field: "mobile_number",
    sortable: true,
  },
  {
    name: "bankName",
    label: "Bank Name",
    field: "bank_name",
  },
  {
    name: "accountNumber",
    label: "Account Number",
    field: "account_number",
  },
  {
    name: "ifscCode",
    label: "IFSC Code",
    field: "ifsc_code",
  },
  {
    name: "pan",
    label: "PAN",
    field: "pan",
  },
  {
    name: "plan",
    label: "Plan",
    field: "plan",
  },
  {
    name: "registrationAmount",
    label: "Registration Amount",
    field: "registration_amount",
  },
  {
    name: "commissionStartDate",
    label: "Commission Start Date",
    field: "commission_start_date",
    sortable: true,
  },
  {
    name: "commissionEndDate",
    label: "Commission End Date",
    field: "commission_end_date",
    sortable: true,
  },
  {
    name: "levelOneCompletionStatus",
    label: "Level One Completion Status",
    field: "level_one_completion_status",
  },
  {
    name: "levelOneCompletionDate",
    label: "Level One Completion Date",
    field: "level_one_completion_date",
  },
  {
    name: "levelOneCommissionAmount",
    label: "Level One Commission Amount",
    field: "level_one_commission_amount",
  },
  {
    name: "levelOneTdsAmount",
    label: "Level One TDS Amount (10%)",
    field: "level_one_tds_amount",
  },
  {
    name: "levelOneAmountPayable",
    label: "Level One Amount Payable",
    field: "level_one_amount_payable",
  },
  {
    name: "levelOneCommissionStatus",
    label: "Level One Commission Status",
    field: "level_one_commission_status",
    sortable: true,
  },
  {
    name: "levelOneCommisionPaidDate",
    label: "Level One Commission Paid Date",
    field: "level_one_commission_paid_date",
    sortable: true,
  },
  {
    name: "levelOneCommissionPaymentComments",
    label: "Level One Commission Payment Comments",
    field: "level_one_commission_payment_comments",
  },
  {
    name: "levelTwoCompletionStatus",
    label: "Level Two Completion Status",
    field: "level_two_completion_status",
  },
  {
    name: "levelTwoCompletionDate",
    label: "Level Two Completion Date",
    field: "level_two_completion_date",
  },
  {
    name: "levelTwoCommissionAmount",
    label: "Level Two Commission Amount",
    field: "level_two_commission_amount",
  },
  {
    name: "levelTwoTdsAmount",
    label: "Level Two TDS Amount (10%)",
    field: "level_two_tds_amount",
  },
  {
    name: "levelTwoAmountPayable",
    label: "Level Two Amount Payable",
    field: "level_two_amount_payable",
  },
  {
    name: "levelTwoCommissionStatus",
    label: "Level Two Commission Status",
    field: "level_two_commission_status",
    sortable: true,
  },
  {
    name: "levelTwoCommisionPaidDate",
    label: "Level Two Commission Paid Date",
    field: "level_two_commission_paid_date",
    sortable: true,
  },
  {
    name: "levelTwoCommissionPaymentComments",
    label: "Level Two Commission Payment Comments",
    field: "level_two_commission_payment_comments",
  },
  {
    name: "levelThreeCompletionStatus",
    label: "Level Three Completion Status",
    field: "level_three_completion_status",
  },
  {
    name: "levelThreeCompletionDate",
    label: "Level Three Completion Date",
    field: "level_three_completion_date",
  },
  {
    name: "levelThreeCommissionAmount",
    label: "Level Three Commission Amount",
    field: "level_three_commission_amount",
  },
  {
    name: "levelThreeTdsAmount",
    label: "Level Three TDS Amount (10%)",
    field: "level_three_tds_amount",
  },
  {
    name: "levelThreeAmountPayable",
    label: "Level One Amount Payable",
    field: "level_one_amount_payable",
  },
  {
    name: "levelThreeCommissionStatus",
    label: "Level Three Commission Status",
    field: "level_three_commission_status",
    sortable: true,
  },
  {
    name: "levelThreeCommisionPaidDate",
    label: "Level Three Commission Paid Date",
    field: "level_three_commission_paid_date",
    sortable: true,
  },
  {
    name: "levelThreeCommissionPaymentComments",
    label: "Level Three Commission Payment Comments",
    field: "level_three_commission_payment_comments",
  },
  {
    name: "levelFourCompletionStatus",
    label: "Level Four Completion Status",
    field: "level_four_completion_status",
  },
  {
    name: "levelFourCompletionDate",
    label: "Level Four Completion Date",
    field: "level_four_completion_date",
  },
  {
    name: "levelFourCommissionAmount",
    label: "Level Four Commission Amount",
    field: "level_four_commission_amount",
  },
  {
    name: "levelFourTdsAmount",
    label: "Level Four TDS Amount (10%)",
    field: "level_four_tds_amount",
  },
  {
    name: "levelFourAmountPayable",
    label: "Level One Amount Payable",
    field: "level_one_amount_payable",
  },
  {
    name: "levelFourCommissionStatus",
    label: "Level Four Commission Status",
    field: "level_four_commission_status",
    sortable: true,
  },
  {
    name: "levelFourCommisionPaidDate",
    label: "Level Four Commission Paid Date",
    field: "level_four_commission_paid_date",
    sortable: true,
  },
  {
    name: "levelFourCommissionPaymentComments",
    label: "Level Four Commission Payment Comments",
    field: "level_four_commission_payment_comments",
  },
];
const columns = ref(columnsData);
const rows = ref([]);

// Functions
const getCommissionsData = () => {};

const excelExport = () => {};
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
