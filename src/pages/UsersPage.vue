<template>
  <div class="q-px-md q-pt-md q-pb-xs float-right">
    <q-btn
      color="primary"
      class="q-mb-md"
      no-caps
      @click="openNewUserPopup=true"
    >
      <div class="row justify-start items-center">
        <q-icon name="add" />
        <span class="q-ml-sm">New Web User</span>
      </div>
    </q-btn>
  </div>

  <div style="margin-top: 100px;" class="q-ml-md q-mr-lg">
    <q-table
      flat bordered
      title="Web Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
      selection="single"
      v-model:selected="selected"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input v-if="showFilter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

        <q-btn class="q-ml-sm" icon="filter_list" @click="showFilter=!showFilter" flat/>
      </template>
    </q-table>
  </div>

  <create-new-user-modal
    v-model="openNewUserPopup"
    :show-new-user-popup="openNewUserPopup"
    :close-new-user-popup="closeNewUserPopup"
  />
</template>

<script setup>
import {ref} from "vue";
import createNewUserModal from 'src/components/popups/createNewUserModal.vue';

// Variable Initializations
const openNewUserPopup = ref(false);

let columnsData = [
  {
    name: 'name',
    required: true,
    label: 'Web user name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'dob', label: 'Date of birth', field: 'dob'},
  { name: 'gender', label: 'Gender', field: 'gender', sortable: true },
  { name: 'aadharNumber', label: 'AAdhar No.', field: 'aadharNumber' },
  { name: 'pan', label: 'PAN', field: 'pan' },
  { name: 'bankAccountNumber', label: 'Bank Account No', field: 'bankAccountNumber' },
  { name: 'systemRole', label: 'System Role', field: 'systemRole', sortable: true },
];
let rowsData = [
  {
    name: 'Ram Kumar',
    dob: '24-03-1997',
    gender: 'Male',
    aadharNumber: '123456789632',
    pan: 'CETTY9785K',
    bankAccountNumber: '26487894512536',
    systemRole: 'Superadmin'
  },
  {
    name: 'Saran Raj',
    dob: '05-05-1984',
    gender: 'Male',
    aadharNumber: '326587412359',
    pan: 'DETTY9785K',
    bankAccountNumber: '71487894512536',
    systemRole: 'Admin'
  },
  {
    name: 'Lavanya R',
    dob: '01-05-1994',
    gender: 'Female',
    aadharNumber: '874561234875',
    pan: 'FFTTY1284L',
    bankAccountNumber: '51425874585441',
    systemRole: 'Telecaler'
  },
  {
    name: 'Janani V',
    dob: '08-02-1995',
    gender: 'Female',
    aadharNumber: '974561234875',
    pan: 'GFTTY1284L',
    bankAccountNumber: '31225874585441',
    systemRole: 'Telecaler'
  },
  {
    name: 'Kartik',
    dob: '02-09-1334',
    gender: 'Male',
    aadharNumber: '874569321456',
    pan: 'GYTTY9785K',
    bankAccountNumber: '84784512365447',
    systemRole: 'Admin'
  },
];

const columns = ref(columnsData);
const rows = ref(rowsData);
const selected = ref([]);
const filter = ref('');
const showFilter = ref(false);

// Functions
const closeNewUserPopup = () => {
  openNewUserPopup.value = false;
};

</script>
