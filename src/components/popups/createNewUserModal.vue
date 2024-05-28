<template>
  <q-dialog v-model="openPopup" persistent @keydown.esc="closeModal">
    <q-card class="user-modal">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Create New Web User
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form @submit="validateUser">
        <q-scroll-area style="height: calc(95vh - 170px)">
          <q-card-section>
            <div class="text-bold">Name</div>
            <q-input
              v-model="name"
              style="max-width: 500px"
              outlined
              dense
              autofocus
              placeholder="Enter a name"
              maxlength="128"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Date of Birth</div>
            <div class="dob-container">
              <div>
                <q-btn icon="event" round color="primary">
                  <q-popup-proxy
                    @before-show="updateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="proxyDob">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          @click="saveDob"
                          v-close-popup
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
              </div>
              <div>
                <div class="q-mt-sm">
                  <q-badge color="teal">
                    {{ dob }}
                  </q-badge>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Gender</div>
            <div class="row items-center">
              <div class="col-12">
                <q-radio
                  v-model="gender"
                  class="q-py-sm q-px-sm"
                  dense
                  keep-color
                  color="primary"
                  label="Male"
                  val="male"
                />
              </div>
              <div class="col-12">
                <q-radio
                  v-model="gender"
                  class="q-py-sm q-px-sm"
                  dense
                  keep-color
                  color="primary"
                  label="Female"
                  val="female"
                />
              </div>
              <div class="col-12">
                <q-radio
                  v-model="gender"
                  class="q-py-sm q-px-sm"
                  dense
                  keep-color
                  color="primary"
                  label="Others"
                  val="others"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Marital Status</div>
            <div class="row items-center">
              <div class="col-12">
                <q-radio
                  v-model="maritalStatus"
                  class="q-py-sm q-px-sm"
                  dense
                  keep-color
                  color="primary"
                  label="Single"
                  val="single"
                />
              </div>
              <div class="col-12">
                <q-radio
                  v-model="maritalStatus"
                  class="q-py-sm q-px-sm"
                  dense
                  keep-color
                  color="primary"
                  label="Married"
                  val="married"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Address Details</div>
            <div class="q-ml-lg q-mt-sm">
              <div class="text-bold">Street/House/Building No.</div>
              <q-input
                v-model="address"
                type="textarea"
                style="width: 500px"
                outlined
                dense
                autofocus
                rows="2"
                placeholder="Enter user address."
                input-class="textarea-input"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
              <div class="text-bold q-mt-sm">City</div>
              <q-input
                v-model="city"
                style="max-width: 320px"
                outlined
                dense
                autofocus
                placeholder="Enter the City"
                maxlength="128"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
              <div class="text-bold">Town</div>
              <q-input
                v-model="town"
                style="max-width: 320px"
                outlined
                dense
                autofocus
                placeholder="Enter the Town"
                maxlength="128"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
              <div class="text-bold">State</div>
              <q-select
                style="width: 320px"
                filled
                v-model="state"
                :options="stateListOptions"
              />
              <div class="text-bold q-mt-md">District</div>
              <q-select
                style="width: 320px"
                filled
                v-model="district"
                :options="dirstrictListOptions"
              />
              <div class="text-bold q-mt-md">Pincode</div>
              <q-input
                v-model="pincode"
                style="max-width: 320px"
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
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Aadhar Details</div>
            <div class="q-ml-lg q-mt-sm">
              <div class="text-bold">Aadhar Number</div>
              <q-input
                v-model="aadharNumber"
                style="max-width: 320px"
                outlined
                dense
                autofocus
                placeholder="Enter an Aadhar Number"
                maxlength="12"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                :rules="[
                  (val) =>
                    aadharNumberValidation(val) ||
                    'Enter a valid Aadhar Number!!!',
                ]"
              />
              <div class="text-bold">Adhar Name</div>
              <q-input
                v-model="aadharName"
                style="max-width: 320px"
                outlined
                dense
                autofocus
                placeholder="Enter a name as in Aadhar Card"
                maxlength="128"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">PAN Details</div>
            <div class="q-ml-lg q-mt-sm">
              <div class="text-bold">PAN</div>
              <q-input
                v-model="panNumber"
                style="max-width: 320px"
                outlined
                dense
                autofocus
                placeholder="Enter a PAN"
                maxlength="10"
                :rules="[(val) => validatePan(val) || 'Enter a Valid PAN']"
              />
              <div class="text-bold">PAN Name</div>
              <q-input
                v-model="panName"
                style="max-width: 320px"
                outlined
                dense
                autofocus
                placeholder="Enter a name as in PAN"
                maxlength="128"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Bank Details</div>
            <div class="q-ml-lg q-mt-sm">
              <div class="text-bold">Account Number</div>
              <q-input
                v-model="bankAccountNumber"
                style="max-width: 400px"
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
              <div class="text-bold">Account Name</div>
              <q-input
                v-model="bankAccountName"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter name as in bank"
                maxlength="256"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
              <div class="text-bold">Name of Bank</div>
              <q-input
                v-model="bankName"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter a bank name"
                maxlength="128"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
              <div class="text-bold">Name of Bank Branch</div>
              <q-input
                v-model="bankBranchName"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter a bank branch name"
                maxlength="128"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
              <div class="text-bold">IFSC Code</div>
              <q-input
                v-model="bankIfscCode"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter a IFSC code"
                maxlength="11"
                :rules="[
                  (val) =>
                    validateIFSCCode(val) || 'Enter a Valid IFSC Code!!!',
                ]"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">System Role</div>
            <div class="q-ml-lg q-mt-sm">
              <div class="row items-center">
                <div class="col-12">
                  <div>
                    <q-select
                      style="width: 400px"
                      filled
                      v-model="systemRole"
                      :options="systemRoleOptions"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="text-bold q-mt-md">System Email</div>
                  <q-input
                    v-model="userEmail"
                    style="max-width: 400px"
                    outlined
                    dense
                    autofocus
                    placeholder="Enter an Email Address"
                    maxlength="128"
                    :rules="[
                      (val) =>
                        validateEmail(val) || 'Enter a valid Email Id!!!',
                    ]"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Other Details</div>
            <div class="q-ml-lg q-mt-sm">
              <div class="text-bold">Personal Email</div>
              <q-input
                v-model="personalEmail"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter an Email Address"
                maxlength="128"
                :rules="[
                  (val) => validateEmail(val) || 'Enter a valid Email Id!!!',
                ]"
              />
              <div class="text-bold">Mobile Number</div>
              <q-input
                v-model="mobileNumber"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter a Mobile Number"
                maxlength="10"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                :rules="[
                  (val) =>
                    validateMobileNumber(val) ||
                    'Enter a valid Mobile Number!!!',
                ]"
              />
              <div class="text-bold">Nominee Name (Father/Mother)</div>
              <q-input
                v-model="alternateName"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter a Nominee Name"
                maxlength="128"
                :rules="[
                  (val) => dataEnteredValidation(val) || 'Field is required!!!',
                ]"
              />
              <div class="text-bold">Alternate Mobile Number</div>
              <q-input
                v-model="alternateMobileNumber"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter a Mobile Number"
                maxlength="10"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                :rules="[
                  (val) =>
                    validateMobileNumber(val) ||
                    'Enter a valid Mobile Number!!!',
                ]"
              />
            </div>
          </q-card-section>
        </q-scroll-area>
        <q-card-section class="row justify-end">
          <q-card-actions class="q-px-none">
            <q-btn
              flat
              color="primary"
              label="Cancel"
              no-caps
              @click="closeModal"
            />
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
import { ref, computed, onMounted, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import { useUserStore } from "src/stores/user";
import { storeToRefs } from "pinia";

// Store Initialization
const generalStore = useGeneralStore();
const userStore = useUserStore();

//Props
const props = defineProps({
  showNewUserPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeNewUserPopup: {
    type: Function,
    required: true,
  },
});

// Variable Initialization
const name = ref("");
const dob = ref("2019/02/01");
const proxyDob = ref("2019/02/01");
const gender = ref("male");
const maritalStatus = ref("married");
const city = ref("");
const town = ref("");
const stateList = ref([]);
const state = ref("Tamil Nadu");
const dirstrictList = ref([]);
const district = ref("");
const address = ref("");
const pincode = ref("");
const aadharNumber = ref("");
const aadharName = ref("");
const panNumber = ref("");
const panName = ref("");
const bankAccountNumber = ref("");
const userEmail = ref("");
const personalEmail = ref("");
const mobileNumber = ref("");
const alternateName = ref("");
const alternateMobileNumber = ref("");
const bankAccountName = ref("");
const bankName = ref("");
const bankBranchName = ref("");
const bankIfscCode = ref("");
const systemRole = ref("Superadmin");
const $q = useQuasar();

const { userRoles } = storeToRefs(generalStore);

// Computed
const openPopup = computed({
  get: () => props.showNewUserPopup,
  set: () => props.closeNewUserPopup(),
});

const systemRoleOptions = computed(() => {
  return userRoles.value.map((role) => role.name);
});

const getSystemRoleId = computed(() => {
  let chosenSystemRole = userRoles.value.find(
    (role) => role.name == systemRole.value
  );

  return chosenSystemRole.id;
});

const stateListOptions = computed(() => {
  return stateList.value?.map((state) => state.name);
});

const dirstrictListOptions = computed(() => {
  return dirstrictList.value?.map((district) => district.name);
});

const getChosenStateUid = computed(() => {
  let chosenState = stateList.value?.find((data) => data.name == state.value);
  return chosenState.uid;
});

const getChosenDistrictId = computed(() => {
  let chosenDistrict = dirstrictList.value.find(
    (data) => data.name == district.value
  );
  return chosenDistrict.id;
});

const validateSave = computed(() => {
  let isNameCorrect = dataEnteredValidation(name.value);
  let isAddressCorrect = dataEnteredValidation(address.value);
  let isCityCorrect = dataEnteredValidation(city.value);
  let isTownCorrect = dataEnteredValidation(town.value);
  let isPinCodeCorrect = pinCodeValidation(pincode.value);
  let isAadharNumberCorrect = aadharNumberValidation(aadharNumber.value);
  let isAadharNameCorrect = dataEnteredValidation(aadharName.value);
  let isPanCorrect = validatePan(panNumber.value);
  let isPanNameCorrect = dataEnteredValidation(panName.value);
  let isAccountNumberCorrect = dataEnteredValidation(bankAccountNumber.value);
  let isAccountNameCorrect = dataEnteredValidation(bankAccountName.value);
  let isNameOfBankCorrect = dataEnteredValidation(bankName.value);
  let isBankBranchCorrect = dataEnteredValidation(bankBranchName.value);
  let isIFSCCodeCorrect = validateIFSCCode(bankIfscCode.value);
  let isEmailAddressCorrect = validateEmail(personalEmail.value);
  let isUserEmailCorrect = validateEmail(userEmail.value);
  let isMobileNumberCorrect = validateMobileNumber(mobileNumber.value);
  let isAlternateNameCorrect = dataEnteredValidation(alternateName.value);
  let isAlternateMobileNumberCorrect = validateMobileNumber(
    alternateMobileNumber.value
  );

  let isAllDataCorrect =
    isNameCorrect &&
    isAddressCorrect &&
    isCityCorrect &&
    isTownCorrect &&
    isTownCorrect &&
    isPinCodeCorrect &&
    isAadharNumberCorrect &&
    isAadharNameCorrect &&
    isPanCorrect &&
    isPanNameCorrect &&
    isAccountNumberCorrect &&
    isAccountNameCorrect &&
    isNameOfBankCorrect &&
    isBankBranchCorrect &&
    isIFSCCodeCorrect &&
    isEmailAddressCorrect &&
    isUserEmailCorrect &&
    isMobileNumberCorrect &&
    isAlternateNameCorrect &&
    isAlternateMobileNumberCorrect;

  return !isAllDataCorrect;
});

// Watchers
watch(state, (value) => {
  getDistrictFromState();
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

const closeModal = (refreshWebUsers) => {
  props.closeNewUserPopup(refreshWebUsers);
};

const updateProxy = () => {
  proxyDob.value = dob.value;
};

const saveDob = () => {
  dob.value = proxyDob.value;
};

const dataEnteredValidation = (data) => {
  return data.trim().length > 2;
};

const pinCodeValidation = (pinCode) => {
  return pinCode.toString().length == 6;
};

const aadharNumberValidation = (aaharNumber) => {
  return aaharNumber.toString().length == 12;
};

const validatePan = (panNumber) => {
  const panRegex = /[A-Z]{5}\d{4}[A-Z]/;
  return panRegex.test(panNumber.toUpperCase());
};

const validateIFSCCode = (ifscCode) => {
  const ifscRegex = /^[A-Z]{4}0([A-Z0-9]{6})$/;
  return ifscRegex.test(ifscCode.toUpperCase());
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobileNumber = (mobileNumber) => {
  return mobileNumber.toString().length == 10;
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

const validateUser = () => {
  showLoader();

  let payload = {
    accessed_from: "web",
    role: getSystemRoleId.value,
    name: name.value,
    date_of_birth: dob.value.replace(/\//g, "-"),
    marital_status: maritalStatus.value,
    gender: gender.value,
    aadhar_number: aadharNumber.value,
    pan: panNumber.value,
    mobile_number: mobileNumber.value,
    district: getChosenDistrictId.value,
    city: city.value,
    town: town.value,
    address: address.value,
    pin_code: pincode.value,
    name_of_bank: bankName.value,
    name_as_in_bank: bankAccountName.value,
    ifsc_code: bankIfscCode.value,
    bank_branch: bankBranchName.value,
    account_number: bankAccountNumber.value,
    profile_photo_path: "",
    user_email: userEmail.value,
    personal_email: personalEmail.value,
    email_address: personalEmail.value,
    nominee_name: alternateName.value,
    alternate_mobile_number: alternateMobileNumber.value,
  };

  userStore
    .saveWebuser(payload)
    .then((res) => {
      let responseData = res.data;

      if (responseData.status === "user_exists") {
        $q.notify({
          message: "User with same email address already exists!!!",
          type: "negative",
          position: "top",
        });
      } else if (responseData.status === "success") {
        $q.notify({
          message: "Web User Created Successfully!!!",
          type: "positive",
          position: "top",
        });
        closeModal(true);
      }
    })
    .catch((err) => {
      $q.notify({
        message: "Error in creating User. Please contact your admin!!!",
        type: "negative",
        position: "top",
      });
    })
    .finally(() => {
      hideLoader();
    });
};

// Lifecycle Hooks
onMounted(async () => {
  generalStore.getWebUserRoles();
  getAllStates();
});
</script>

<style scoped>
.user-modal {
  width: 60vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}

.dob-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 150px;
}
</style>
