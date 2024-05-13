<template>
  <div class="row">
    <div class="col-12">
      <q-card class="card-size h-100vh">
        <div class="container-height">
          <div class="row q-ml-lg q-pt-lg">
            <div class="">
              <div
                style="font-size: 18px"
                class="text-bold q-pr-md header-text"
              >
                Customer Settings
                <q-img
                  style="width: 1.2rem"
                  class="cursor-pointer q-mx-xs"
                  :src="infoCircleIcon"
                >
                  <custom-tooltip
                    :content="customerSettingsInfoContent"
                    :max-width="'20rem'"
                  />
                </q-img>
              </div>
              <div class="q-ml-lg q-mt-sm">
                <div class="row">
                  <div class="q-pt-md">
                    <span class="text-bold">
                      Registration fee and Commission Amount on various levels
                    </span>
                    <q-img
                      style="width: 1.2rem"
                      class="cursor-pointer q-mx-xs"
                      :src="infoCircleIcon"
                    >
                      <custom-tooltip
                        :content="commissionPercentageInfo"
                        :max-width="'20rem'"
                      />
                    </q-img>
                    <div class="q-ml-lg q-mt-sm">
                      <div class="row">
                        <div
                          class="col-12 flex items-center justify-start q-pb-md"
                        >
                          <div style="min-width: 53px">Select Package:</div>
                          <div class="q-ml-sm flex items-center">
                            <div
                              style="max-width: 300px; min-width: 220px"
                              class="q-pa-md"
                            >
                              <div class="q-gutter-md">
                                <q-select
                                  filled
                                  v-model="planPackage"
                                  :options="planPackageOptions"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <div class="row">
                          <div
                            class="col-12 flex items-center justify-start q-pb-md"
                          >
                            <div style="min-width: 53px">
                              Level 1 commission
                            </div>
                            <q-checkbox
                              v-model="levelOneFlat"
                              class="q-ml-lg"
                              label="Flat"
                            />
                            <div class="q-ml-sm">(₹)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelOneCommissionFee"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              :rules="[
                                (val) =>
                                  (val !== null &&
                                    val !== '' &&
                                    parseInt(val) != NaN) ||
                                  'Please type a number',
                                (val) => val > 0 || 'Please type a real number',
                              ]"
                            />
                            <q-checkbox
                              v-model="levelOnePercentage"
                              class="q-ml-lg"
                              label="Percentage"
                            />
                            <div class="q-ml-sm">(%)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelOnePercentageValue"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              :rules="[
                                (val) =>
                                  (val !== null &&
                                    val !== '' &&
                                    parseInt(val) != NaN) ||
                                  'Please type a number',
                                (val) => val > 0 || 'Please type a real number',
                              ]"
                            />
                            <div class="q-ml-lg text-bold">Toatl Value (₹)</div>
                            <div
                              style="max-width: 100px; max-height: 40px"
                              class="q-ml-lg"
                            >
                              <q-input
                                v-model="levelOneCommissionFee"
                                dense
                                :rules="[
                                  (val) =>
                                    (val !== null &&
                                      val !== '' &&
                                      parseInt(val) != NaN) ||
                                    'Please type a number',
                                  (val) =>
                                    val > 0 || 'Please type a real number',
                                ]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <div class="row">
                          <div
                            class="col-12 flex items-center justify-start q-pb-md"
                          >
                            <div style="min-width: 53px">
                              Level 2 commission
                            </div>
                            <q-checkbox
                              v-model="levelTwoFlat"
                              class="q-ml-lg"
                              label="Flat"
                            />
                            <div class="q-ml-sm">(₹)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelTwoCommissionFee"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              :rules="[
                                (val) =>
                                  (val !== null &&
                                    val !== '' &&
                                    parseInt(val) != NaN) ||
                                  'Please type a number',
                                (val) => val > 0 || 'Please type a real number',
                              ]"
                            />
                            <q-checkbox
                              v-model="levelTwoPercentage"
                              class="q-ml-lg"
                              label="Percentage"
                            />
                            <div class="q-ml-sm">(%)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelTwoPercentageValue"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              :rules="[
                                (val) =>
                                  (val !== null &&
                                    val !== '' &&
                                    parseInt(val) != NaN) ||
                                  'Please type a number',
                                (val) => val > 0 || 'Please type a real number',
                              ]"
                            />
                            <div class="q-ml-lg text-bold">Toatl Value (₹)</div>
                            <div
                              style="max-width: 100px; max-height: 40px"
                              class="q-ml-lg"
                            >
                              <q-input
                                v-model="levelTwoCommissionFee"
                                dense
                                :rules="[
                                  (val) =>
                                    (val !== null &&
                                      val !== '' &&
                                      parseInt(val) != NaN) ||
                                    'Please type a number',
                                  (val) =>
                                    val > 0 || 'Please type a real number',
                                ]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <div class="row">
                          <div
                            class="col-12 flex items-center justify-start q-pb-md"
                          >
                            <div style="min-width: 53px">
                              Level 3 commission
                            </div>
                            <q-checkbox
                              v-model="levelThreeFlat"
                              class="q-ml-lg"
                              label="Flat"
                            />
                            <div class="q-ml-sm">(₹)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelThreeCommissionFee"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              :rules="[
                                (val) =>
                                  (val !== null &&
                                    val !== '' &&
                                    parseInt(val) != NaN) ||
                                  'Please type a number',
                                (val) => val > 0 || 'Please type a real number',
                              ]"
                            />
                            <q-checkbox
                              v-model="levelThreePercentage"
                              class="q-ml-lg"
                              label="Percentage"
                            />
                            <div class="q-ml-sm">(%)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelThreePercentageValue"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              :rules="[
                                (val) =>
                                  (val !== null &&
                                    val !== '' &&
                                    parseInt(val) != NaN) ||
                                  'Please type a number',
                                (val) => val > 0 || 'Please type a real number',
                              ]"
                            />
                            <div class="q-ml-lg text-bold">Toatl Value (₹)</div>
                            <div
                              style="max-width: 100px; max-height: 40px"
                              class="q-ml-lg"
                            >
                              <q-input
                                v-model="levelThreeCommissionFee"
                                dense
                                :rules="[
                                  (val) =>
                                    (val !== null &&
                                      val !== '' &&
                                      parseInt(val) != NaN) ||
                                    'Please type a number',
                                  (val) =>
                                    val > 0 || 'Please type a real number',
                                ]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <div class="row">
                          <div
                            class="col-12 flex items-center justify-start q-pb-md"
                          >
                            <div style="min-width: 53px">
                              Level 4 commission
                            </div>
                            <q-checkbox
                              v-model="levelFourFlat"
                              class="q-ml-lg"
                              label="Flat"
                            />
                            <div class="q-ml-sm">(₹)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelFourCommissionFee"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              :rules="[
                                (val) =>
                                  (val !== null &&
                                    val !== '' &&
                                    parseInt(val) != NaN) ||
                                  'Please type a number',
                                (val) => val > 0 || 'Please type a real number',
                              ]"
                            />
                            <q-checkbox
                              v-model="levelFourPercentage"
                              class="q-ml-lg"
                              label="Percentage"
                            />
                            <div class="q-ml-sm">(%)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelFourPercentageValue"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              :rules="[
                                (val) =>
                                  (val !== null &&
                                    val !== '' &&
                                    parseInt(val) != NaN) ||
                                  'Please type a number',
                                (val) => val > 0 || 'Please type a real number',
                              ]"
                            />
                            <div class="q-ml-lg text-bold">Toatl Value (₹)</div>
                            <div
                              style="max-width: 100px; max-height: 40px"
                              class="q-ml-lg"
                            >
                              <q-input
                                v-model="levelFourCommissionFee"
                                dense
                                :rules="[
                                  (val) =>
                                    (val !== null &&
                                      val !== '' &&
                                      parseInt(val) != NaN) ||
                                    'Please type a number',
                                  (val) =>
                                    val > 0 || 'Please type a real number',
                                ]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg q-mt-md">
                        <div class="row">
                          <div
                            class="col-12 flex items-center justify-start q-pb-md"
                          >
                            <div style="min-width: 53px">
                              Registration Fee (₹)
                            </div>
                            <div
                              style="max-width: 100px; max-height: 40px"
                              class="q-ml-lg"
                            >
                              <q-input
                                v-model="registrationFee"
                                dense
                                :rules="[
                                  (val) =>
                                    (val !== null &&
                                      val !== '' &&
                                      parseInt(val) != NaN) ||
                                    'Please type a number',
                                  (val) =>
                                    val > 0 || 'Please type a real number',
                                ]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>

      <q-card-section class="flex justify-end fixed-table-bottom">
        <div class="row no-wrap items-start justify-end">
          <div class="col-auto row justify-end pr-15">
            <q-btn
              color="primary"
              label="Save"
              class="q-ml-md"
              :disable="validateSave"
              @click="updateCustomerSettings"
            />
          </div>
        </div>
      </q-card-section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";
import infoCircleIcon from "src/assets/icons/info-circle.svg";
import customTooltip from "src/components/shared/CustomTooltip.vue";

// Store Initialization
const generalStore = useGeneralStore();

// Variable Initialization
const planPackage = ref("Silver");
const levelOneCommissionFee = ref(0);
const levelTwoCommissionFee = ref(0);
const levelThreeCommissionFee = ref(0);
const levelFourCommissionFee = ref(0);
const registrationFee = ref(0);
const levelOneFlat = ref(false);
const levelOnePercentage = ref(false);
const levelOnePercentageValue = ref(null);
const levelTwoFlat = ref(false);
const levelTwoPercentage = ref(false);
const levelTwoPercentageValue = ref(null);
const levelThreeFlat = ref(false);
const levelThreePercentage = ref(false);
const levelThreePercentageValue = ref(null);
const levelFourFlat = ref(false);
const levelFourPercentage = ref(false);
const levelFourPercentageValue = ref(null);
const $q = useQuasar();

const { planDetails } = storeToRefs(generalStore);

// Tootltip contents
const customerSettingsInfoContent = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Mobile Customer Settings</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Configuration of information regarding customers
    (Independent Distributors). With this data, system
    will allow the customers to perform actions across
    the mobile application.
  </div>
`);
const commissionPercentageInfo = ref(`
  <div
    class="text-center text-body2 text-white"
    style="border-bottom: 1px solid white; padding-bottom: 0.35rem"
  >
    <b>Registration Fee & Commission Amount</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Commission Amount for Independent distributors
    across the different levels (Level1, Level2, Level3 and Level4)
    with respect to different packages (Silver, Gold, Platinum, Emerald and Diamond).
    The customer will get a commission percentage
    while reaching the target against levels.
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Registration fee is when customer joins he should pay an initial
    amount according to plan package he will be choosing.
  </div>
`);

// Computed
const planPackageOptions = computed(() => {
  return planDetails.value.map((plan) => plan.name);
});

const planPackageUid = computed(() => {
  let requiredPlan = planDetails.value.find(
    (plan) => plan.name === planPackage.value
  );
  return requiredPlan.uid;
});

const validateSave = computed(() => {
  let isNoValueEntered =
    !levelOneCommissionFee.value ||
    !levelTwoCommissionFee.value ||
    !levelThreeCommissionFee.value ||
    !levelFourCommissionFee.value ||
    !registrationFee.value;
  if (isNoValueEntered) {
    return true;
  }

  let isLevelOneCommissionFeeWrong =
    (levelOneCommissionFee.value && levelOneCommissionFee.value == "") ||
    isNaN(parseInt(levelOneCommissionFee.value)) ||
    levelOneCommissionFee.value < 1;
  let isLevelTwoCommissionFeeWrong =
    (levelTwoCommissionFee.value && levelTwoCommissionFee.value == "") ||
    isNaN(parseInt(levelTwoCommissionFee.value)) ||
    levelTwoCommissionFee.value < 1;
  let isLevelThreeCommissionFeeWrong =
    (levelThreeCommissionFee.value && levelThreeCommissionFee.value == "") ||
    isNaN(parseInt(levelThreeCommissionFee.value)) ||
    levelThreeCommissionFee.value < 1;
  let isLevelFourCommissionFeeWrong =
    (levelFourCommissionFee.value && levelFourCommissionFee.value == "") ||
    isNaN(parseInt(levelFourCommissionFee.value)) ||
    levelFourCommissionFee.value < 1;
  let isRegistrationFeeWrong =
    (registrationFee.value && registrationFee.value == "") ||
    isNaN(parseInt(registrationFee.value)) ||
    registrationFee.value < 1;

  return (
    isLevelOneCommissionFeeWrong ||
    isLevelTwoCommissionFeeWrong ||
    isLevelThreeCommissionFeeWrong ||
    isLevelFourCommissionFeeWrong ||
    isRegistrationFeeWrong
  );
});

// Watchers
watch(planPackage, (value) => {
  updatePlanPackageDetails();
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

const updatePlanPackageDetails = () => {
  let requiredPlan = planDetails.value.find(
    (plan) => plan.name === planPackage.value
  );
  levelOneCommissionFee.value = parseFloat(requiredPlan.level_one_amount);
  levelTwoCommissionFee.value = parseFloat(requiredPlan.level_two_amount);
  levelThreeCommissionFee.value = parseFloat(requiredPlan.level_three_amount);
  levelFourCommissionFee.value = parseFloat(requiredPlan.level_four_amount);
  registrationFee.value = parseFloat(requiredPlan.registration_fee);
  levelOneFlat.value = requiredPlan.is_level_one_flat;
  levelOnePercentage.value = requiredPlan.is_level_one_percentage;
  levelOnePercentageValue.value = requiredPlan.level_one_percentage_value;
  levelTwoFlat.value = requiredPlan.is_level_two_flat;
  levelTwoPercentage.value = requiredPlan.is_level_two_percentage;
  levelTwoPercentageValue.value = requiredPlan.level_two_percentage_value;
  levelThreeFlat.value = requiredPlan.is_level_three_flat;
  levelThreePercentage.value = requiredPlan.is_level_three_percentage;
  levelThreePercentageValue.value = requiredPlan.level_three_percentage_value;
  levelFourFlat.value = requiredPlan.is_level_four_flat;
  levelFourPercentage.value = requiredPlan.is_level_four_percentage;
  levelFourPercentageValue.value = requiredPlan.level_four_percentage_value;
};

const updateCustomerSettings = () => {
  showLoader();

  let payload = {
    level_one_amount: levelOneCommissionFee.value,
    level_two_amount: levelTwoCommissionFee.value,
    level_three_amount: levelThreeCommissionFee.value,
    level_four_amount: levelFourCommissionFee.value,
    registration_fee: registrationFee.value,
  };

  generalStore
    .updateCustomerSettings(payload, planPackageUid.value)
    .then((res) => {
      generalStore.getAppPlanDetails();
      $q.notify({
        message: "Customer Settings Updated Successfully!!!",
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
    .finally(() => {
      hideLoader();
    });
};

// Lifecycle Hooks
onMounted(() => {
  generalStore.getAppPlanDetails().then((res) => {
    updatePlanPackageDetails();
  });
});
</script>

<style scoped>
.card-size {
  overflow: auto;
  max-height: calc(100vh - 121px);
}

.container-height {
  overflow: auto;
  height: calc(100vh - 195px);
  padding-bottom: 30px;
}

.header-text {
  font-weight: bold;
  color: #123499;
}

.h-100vh {
  height: 100vh !important;
}

.fixed-table-bottom {
  position: absolute;
  bottom: 0px;
  border-top: 1px solid #ccc;
  -webkit-box-shadow: 0px -2px 6px 1px rgb(0 0 0 / 52%);
  -moz-box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, 0.52);
  box-shadow: 0px -2px 6px 1px rgb(0 0 0 / 52%);
  -webkit-box-shadow: 0px -2px 6px 1px rgb(217 217 217);
  -moz-box-shadow: 0px -2px 6px 1px rgba(217, 217, 217, 1);
  box-shadow: 0px -2px 6px 1px rgb(217 217 217);
  background: #fff;
  width: 100%;
}
</style>
