<template>
  <q-dialog v-model="openPopup" persistent @keydown.esc="closeModal">
    <q-card class="customer-modal q-pl-sm">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Edit Customer Details
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form @submit="updateCustomerDetails">
        <q-scroll-area style="height: calc(95vh - 170px)">
          <q-card-section>
            <div class="text-bold">
              Customer -
              <span class="text-green">{{
                `${props.selectedData[0].name} - ${props.selectedData[0].customer_number}`
              }}</span>
            </div>
            <div class="text-bold q-mt-md">Name of the Bank</div>
            <q-input
              v-model="nameOfBank"
              style="max-width: 350px"
              outlined
              dense
              autofocus
              placeholder="Enter name of the Bank"
              maxlength="128"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Bank Account Number</div>
            <q-input
              v-model="bankAccountNumber"
              style="max-width: 350px"
              outlined
              dense
              autofocus
              placeholder="Enter an account number"
              maxlength="64"
              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Name as in Bank</div>
            <q-input
              v-model="nameAsInBank"
              style="max-width: 350px"
              outlined
              dense
              autofocus
              placeholder="Enter name as in bank"
              maxlength="256"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Bank Branch</div>
            <q-input
              v-model="bankBranch"
              style="max-width: 350px"
              outlined
              dense
              autofocus
              placeholder="Enter a bank branch name"
              maxlength="128"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">IFSC Code</div>
            <q-input
              v-model="ifscCode"
              style="max-width: 350px"
              outlined
              dense
              autofocus
              placeholder="Enter a IFSC code"
              maxlength="11"
              :rules="[
                (val) => validateIFSCCode(val) || 'Enter a Valid IFSC Code!!!',
              ]"
            />
            <div class="text-bold q-mt-md">City</div>
            <q-input
              v-model="city"
              style="max-width: 350px"
              outlined
              dense
              autofocus
              placeholder="Enter a City"
              maxlength="128"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Town</div>
            <q-input
              v-model="town"
              style="max-width: 350px"
              outlined
              dense
              autofocus
              placeholder="Enter a Town"
              maxlength="128"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">State</div>
            <q-select
              style="width: 350px"
              filled
              dense
              v-model="state"
              :options="stateListOptions"
            />
            <div class="text-bold q-mt-md">District</div>
            <q-select
              style="width: 350px"
              filled
              dense
              v-model="district"
              :options="dirstrictListOptions"
            />
            <div class="text-bold q-mt-md">Address</div>
            <q-input
              v-model="address"
              type="textarea"
              style="width: 350px"
              outlined
              dense
              autofocus
              rows="2"
              input-class="textarea-input"
              placeholder="Enter an Address"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Pin Code</div>
            <q-input
              v-model="pinCode"
              style="max-width: 350px"
              outlined
              dense
              autofocus
              placeholder="Enter the Pincode"
              maxlength="6"
              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              :rules="[
                (val) => pinCodeValidation(val) || 'Enter a valid Pincode!!!',
              ]"
            />
            <div class="text-bold q-mt-md">User Status</div>
            <q-select
              style="width: 350px"
              filled
              dense
              v-model="userStatus"
              :options="userStatusOptions"
            />
          </q-card-section>
        </q-scroll-area>
        <q-card-section class="row justify-end">
          <q-card-actions class="q-px-none">
            <q-btn
              unelevated
              color="primary"
              label="Save"
              :disable="validateSave"
              type="submit"
              no-caps
            />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import { useUserStore } from "src/stores/user";

// Store Initialization
const generalStore = useGeneralStore();
const userStore = useUserStore();

// Variable Initialization
const bankAccountNumber = ref(props.selectedData[0].account_number);
const bankBranch = ref(props.selectedData[0].bank_branch);
const ifscCode = ref(props.selectedData[0].ifsc_code);
const nameOfBank = ref(props.selectedData[0].name_of_bank);
const nameAsInBank = ref(props.selectedData[0].name_as_in_bank);
const city = ref(props.selectedData[0].city);
const town = ref(props.selectedData[0].town);
const address = ref(props.selectedData[0].address);
const pinCode = ref(props.selectedData[0].pin_code);
const stateList = ref([]);
const state = ref(props.selectedData[0].state);
const dirstrictList = ref([]);
const district = ref("");
const userStatus = ref(props.selectedData[0].user_status);
const $q = useQuasar();

//Props
const props = defineProps({
  showEditCustomerPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeEditCustomerPopup: {
    type: Function,
    required: true,
  },
  selectedData: {
    type: Object,
    required: true,
  },
});

// Computed
const openPopup = computed({
  get: () => props.showEditCustomerPopup,
  set: () => props.closeEditCustomerPopup(),
});

const stateListOptions = computed(() => {
  return stateList.value?.map((state) => state.name);
});

const dirstrictListOptions = computed(() => {
  return dirstrictList.value?.map((district) => district.name);
});

const userStatusOptions = computed(() => {
  return ["Active", "Inactive"];
});

const getChosenStateUid = computed(() => {
  let chosenState = stateList.value?.find((data) => data.name == state.value);
  return chosenState.uid;
});

const getChosenDistrictId = computed(() => {
  let chosenDistrict = dirstrictList.value?.find(
    (data) => data.name == district.value
  );
  return chosenDistrict.id;
});

const validateSave = computed(() => {
  let isNameOfBankCorrect = dataEnteredValidation(nameOfBank.value);
  let isBankAccountNumberCorrect = dataEnteredValidation(
    bankAccountNumber.value
  );
  let isNameAsInBankCorrect = dataEnteredValidation(nameAsInBank.value);
  let isBankBranchCorrect = dataEnteredValidation(bankBranch.value);
  let isIFSCCodeCorrect = validateIFSCCode(ifscCode.value);
  let isCityCorrect = dataEnteredValidation(city.value);
  let isTownCorrect = dataEnteredValidation(town.value);
  let isAddressCorrect = dataEnteredValidation(address.value);
  let isPinCodeCorrect = pinCodeValidation(pinCode.value);

  return (
    !isNameAsInBankCorrect ||
    !isBankBranchCorrect ||
    !isIFSCCodeCorrect ||
    !isCityCorrect ||
    !isTownCorrect ||
    !isAddressCorrect ||
    !isPinCodeCorrect ||
    !isBankAccountNumberCorrect ||
    !isNameOfBankCorrect
  );
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

const validateIFSCCode = (ifscCode) => {
  const ifscRegex = /^[A-Z]{4}0([A-Z0-9]{6})$/;
  return ifscRegex.test(ifscCode.toUpperCase());
};

const pinCodeValidation = (pinCode) => {
  return pinCode.toString().length == 6;
};

const closeModal = (refreshCustomers) => {
  props.closeEditCustomerPopup(refreshCustomers);
};

const getAllStates = () => {
  generalStore.getAllStates().then((res) => {
    stateList.value = res.data;
    getDistrictFromState();
  });
};

const getDistrictFromState = () => {
  district.value = "";
  let payload = {
    stateUid: getChosenStateUid.value,
  };
  generalStore.getDistrictsForState(payload).then((res) => {
    dirstrictList.value = res.data;
    district.value = res.data[0].name;
  });
};

const dataEnteredValidation = (data) => {
  return data.trim().length > 2;
};

const updateCustomerDetails = () => {
  showLoader();

  let payload = {
    customerUid: props.selectedData[0].customer_uid,
    bankName: nameOfBank.value,
    bankAccountNumber: bankAccountNumber.value,
    nameAsInBank: nameAsInBank.value,
    bankBranch: bankBranch.value,
    ifscCode: ifscCode.value,
    city: city.value,
    town: town.value,
    address: address.value,
    pinCode: pinCode.value,
    userStatus: userStatus.value,
    district: getChosenDistrictId.value,
  };

  userStore
    .updateCustomerDetails(payload)
    .then((res) => {
      $q.notify({
        message: "Customer Details Updated Successfully!!!",
        type: "positive",
        position: "top",
      });

      closeModal(true);
    })
    .catch((err) => {
      $q.notify({
        message:
          "Error in updating customer details. Please contact your admin!!!",
        type: "negative",
        position: "top",
      });
    })
    .finally(() => {
      hideLoader();
    });
};

// Watchers
watch(state, (value) => {
  getDistrictFromState();
});

// Lifecycle Hooks
onMounted(() => {
  getAllStates();
});
</script>

<style scoped>
.customer-modal {
  width: 35vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}
</style>
