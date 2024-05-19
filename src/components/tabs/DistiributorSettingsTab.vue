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
                            <q-radio
                              v-model="levelOneFlatOrPercentage"
                              class="q-ml-lg"
                              label="Flat"
                              val="flat"
                            />
                            <div class="q-ml-sm">(₹)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelOneFlatFee"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                              :rules="[
                                (val) =>
                                  dataEnteredValidation(val) ||
                                  'Field is required!!!',
                              ]"
                              :disable="levelOneFlatDisable"
                            />
                            <q-radio
                              v-model="levelOneFlatOrPercentage"
                              class="q-ml-lg"
                              label="Percentage"
                              val="percentage"
                            />
                            <div class="q-ml-sm">(%)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelOnePercentageValue"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46"
                              :rules="[
                                (val) =>
                                  decimalEnteredValidation(val) ||
                                  'Enter a proper decimal Value!!!',
                              ]"
                              :disable="levelOnePercentageDisable"
                            />
                            <div class="q-ml-lg text-bold">Toatl Value (₹)</div>
                            <div
                              style="
                                max-width: 100px;
                                max-height: 40px;
                                color: #123499;
                              "
                              class="q-ml-lg text-bold"
                            >
                              {{ levelOneCommissionFee }}
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
                            <q-radio
                              v-model="levelTwoFlatOrPercentage"
                              class="q-ml-lg"
                              label="Flat"
                              val="flat"
                            />
                            <div class="q-ml-sm">(₹)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelTwoFlatFee"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                              :rules="[
                                (val) =>
                                  dataEnteredValidation(val) ||
                                  'Field is required!!!',
                              ]"
                              :disable="levelTwoFlatDisable"
                            />
                            <q-radio
                              v-model="levelTwoFlatOrPercentage"
                              class="q-ml-lg"
                              label="Percentage"
                              val="percentage"
                            />
                            <div class="q-ml-sm">(%)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelTwoPercentageValue"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46"
                              :rules="[
                                (val) =>
                                  decimalEnteredValidation(val) ||
                                  'Enter a proper decimal Value!!!',
                              ]"
                              :disable="levelTwoPercentageDisable"
                            />
                            <div class="q-ml-lg text-bold">Toatl Value (₹)</div>
                            <div
                              style="
                                max-width: 100px;
                                max-height: 40px;
                                color: #123499;
                              "
                              class="q-ml-lg text-bold"
                            >
                              {{ levelTwoCommissionFee }}
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
                            <q-radio
                              v-model="levelThreeFlatOrPercentage"
                              class="q-ml-lg"
                              label="Flat"
                              val="flat"
                            />
                            <div class="q-ml-sm">(₹)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelThreeFlatFee"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                              :rules="[
                                (val) =>
                                  dataEnteredValidation(val) ||
                                  'Field is required!!!',
                              ]"
                              :disable="levelThreeFlatDisable"
                            />
                            <q-radio
                              v-model="levelThreeFlatOrPercentage"
                              class="q-ml-lg"
                              label="Percentage"
                              val="percentage"
                            />
                            <div class="q-ml-sm">(%)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelThreePercentageValue"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46"
                              :rules="[
                                (val) =>
                                  decimalEnteredValidation(val) ||
                                  'Enter a proper decimal Value!!!',
                              ]"
                              :disable="levelThreePercentageDisable"
                            />
                            <div class="q-ml-lg text-bold">Toatl Value (₹)</div>
                            <div
                              style="
                                max-width: 100px;
                                max-height: 40px;
                                color: #123499;
                              "
                              class="q-ml-lg text-bold"
                            >
                              {{ levelThreeCommissionFee }}
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
                            <q-radio
                              v-model="levelFourFlatOrPercentage"
                              class="q-ml-lg"
                              label="Flat"
                              val="flat"
                            />
                            <div class="q-ml-sm">(₹)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelFourFlatFee"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                              :rules="[
                                (val) =>
                                  dataEnteredValidation(val) ||
                                  'Field is required!!!',
                              ]"
                              :disable="levelFourFlatDisable"
                            />
                            <q-radio
                              v-model="levelFourFlatOrPercentage"
                              class="q-ml-lg"
                              label="Percentage"
                              val="percentage"
                            />
                            <div class="q-ml-sm">(%)</div>
                            <q-input
                              class="q-ml-sm"
                              v-model="levelFourPercentageValue"
                              style="max-width: 100px; max-height: 40px"
                              dense
                              onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46"
                              :rules="[
                                (val) =>
                                  decimalEnteredValidation(val) ||
                                  'Enter a proper decimal Value!!!',
                              ]"
                              :disable="levelFourPercentageDisable"
                            />
                            <div class="q-ml-lg text-bold">Toatl Value (₹)</div>
                            <div
                              style="
                                max-width: 100px;
                                max-height: 40px;
                                color: #123499;
                              "
                              class="q-ml-lg text-bold"
                            >
                              {{ levelFourCommissionFee }}
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
                                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                maxlength="8"
                                :rules="[
                                  (val) =>
                                    dataEnteredValidation(val) ||
                                    'Field is required!!!',
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
const levelOneFlatOrPercentage = ref("flat");
const levelTwoFlatOrPercentage = ref("flat");
const levelThreeFlatOrPercentage = ref("flat");
const levelFourFlatOrPercentage = ref("flat");
const levelOneFlatFee = ref(0);
const levelTwoFlatFee = ref(0);
const levelThreeFlatFee = ref(0);
const levelFourFlatFee = ref(0);
const levelOnePercentageValue = ref("0.00");
const levelTwoPercentageValue = ref("0.00");
const levelThreePercentageValue = ref("0.00");
const levelFourPercentageValue = ref("0.00");
const levelOneFlatDisable = ref(false);
const levelTwoFlatDisable = ref(false);
const levelThreeFlatDisable = ref(false);
const levelFourFlatDisable = ref(false);
const levelOnePercentageDisable = ref(false);
const levelTwoPercentageDisable = ref(false);
const levelThreePercentageDisable = ref(false);
const levelFourPercentageDisable = ref(false);
const registrationFee = ref(0);
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
  let isLevelOneFlatFeeValid = dataEnteredValidation(levelOneFlatFee.value);
  let isLevelOnePercentageValid = decimalEnteredValidation(
    levelOnePercentageValue.value
  );
  let isLevelTwoFlatFeeValid = dataEnteredValidation(levelTwoFlatFee.value);
  let isLevelTwoPercentageValid = decimalEnteredValidation(
    levelTwoPercentageValue.value
  );
  let isLevelThreeFlatFeeValid = dataEnteredValidation(levelThreeFlatFee.value);
  let isLevelThreePercentageValid = decimalEnteredValidation(
    levelThreePercentageValue.value
  );
  let isLevelFourFlatFeeValid = dataEnteredValidation(levelFourFlatFee.value);
  let isLevelFourPercentageValid = decimalEnteredValidation(
    levelFourPercentageValue.value
  );
  let isRegistrationFeeValid = dataEnteredValidation(registrationFee.value);

  return (
    !isLevelOneFlatFeeValid ||
    !isLevelOnePercentageValid ||
    !isLevelTwoFlatFeeValid ||
    !isLevelTwoPercentageValid ||
    !isLevelThreeFlatFeeValid ||
    !isLevelThreePercentageValid ||
    !isLevelFourFlatFeeValid ||
    !isLevelFourPercentageValid ||
    !isRegistrationFeeValid
  );
});

// Watchers
watch(planPackage, (value) => {
  updatePlanPackageDetails();
});

watch(levelOneFlatFee, (value) => {
  if (levelOneFlatOrPercentage.value == "percentage") {
    return;
  }

  levelOneCommissionFee.value = parseFloat(value).toFixed(2).toString();
});

watch(levelTwoFlatFee, (value) => {
  if (levelTwoFlatOrPercentage.value == "percentage") {
    return;
  }

  levelTwoCommissionFee.value = parseFloat(value).toFixed(2).toString();
});

watch(levelThreeFlatFee, (value) => {
  if (levelThreeFlatOrPercentage.value == "percentage") {
    return;
  }

  levelThreeCommissionFee.value = parseFloat(value).toFixed(2).toString();
});

watch(levelFourFlatFee, (value) => {
  if (levelFourFlatOrPercentage.value == "percentage") {
    return;
  }

  levelFourCommissionFee.value = parseFloat(value).toFixed(2).toString();
});

watch(levelOnePercentageValue, (value) => {
  if (levelOneFlatOrPercentage.value == "flat") {
    return;
  }

  levelOneCommissionFee.value = getValueOfCommissionPercentage(
    value,
    registrationFee.value
  );
});

watch(levelTwoPercentageValue, (value) => {
  if (levelTwoFlatOrPercentage.value == "flat") {
    return;
  }

  levelTwoCommissionFee.value = getValueOfCommissionPercentage(
    value,
    registrationFee.value
  );
});

watch(levelThreePercentageValue, (value) => {
  if (levelThreeFlatOrPercentage.value == "flat") {
    return;
  }

  levelThreeCommissionFee.value = getValueOfCommissionPercentage(
    value,
    registrationFee.value
  );
});

watch(levelFourPercentageValue, (value) => {
  if (levelFourFlatOrPercentage.value == "flat") {
    return;
  }

  levelFourCommissionFee.value = getValueOfCommissionPercentage(
    value,
    registrationFee.value
  );
});

watch(registrationFee, (value) => {
  if (value == "0") {
    levelOnePercentageValue.value = "0.00";
    levelTwoPercentageValue.value = "0.00";
    levelThreePercentageValue.value = "0.00";
    levelFourPercentageValue.value = "0.00";
  }

  if (levelOneFlatOrPercentage.value == "percentage") {
    levelOneCommissionFee.value = getValueOfCommissionPercentage(
      levelOnePercentageValue.value,
      value
    );
  }

  if (levelTwoFlatOrPercentage.value == "percentage") {
    levelTwoCommissionFee.value = getValueOfCommissionPercentage(
      levelTwoPercentageValue.value,
      value
    );
  }

  if (levelThreeFlatOrPercentage.value == "percentage") {
    levelThreeCommissionFee.value = getValueOfCommissionPercentage(
      levelThreePercentageValue.value,
      value
    );
  }

  if (levelFourFlatOrPercentage.value == "percentage") {
    levelFourCommissionFee.value = getValueOfCommissionPercentage(
      levelFourPercentageValue.value,
      value
    );
  }
});

watch(levelOneFlatOrPercentage, (value) => {
  if (value == "flat") {
    levelOnePercentageValue.value = "0.00";
    levelOneFlatDisable.value = false;
    levelOnePercentageDisable.value = true;
  } else if (value == "percentage") {
    levelOneFlatFee.value = "0.00";
    levelOneCommissionFee.value = "0.00";
    levelOnePercentageDisable.value = false;
    levelOneFlatDisable.value = true;
  }
});

watch(levelTwoFlatOrPercentage, (value) => {
  if (value == "flat") {
    levelTwoPercentageValue.value = "0.00";
    levelTwoFlatDisable.value = false;
    levelTwoPercentageDisable.value = true;
  } else if (value == "percentage") {
    levelTwoFlatFee.value = "0.00";
    levelTwoCommissionFee.value = "0.00";
    levelTwoPercentageDisable.value = false;
    levelTwoFlatDisable.value = true;
  }
});

watch(levelThreeFlatOrPercentage, (value) => {
  if (value == "flat") {
    levelThreePercentageValue.value = "0.00";
    levelThreeFlatDisable.value = false;
    levelThreePercentageDisable.value = true;
  } else if (value == "percentage") {
    levelThreeFlatFee.value = "0.00";
    levelThreeCommissionFee.value = "0.00";
    levelThreePercentageDisable.value = false;
    levelThreeFlatDisable.value = true;
  }
});

watch(levelFourFlatOrPercentage, (value) => {
  if (value == "flat") {
    levelFourPercentageValue.value = "0.00";
    levelFourFlatDisable.value = false;
    levelFourPercentageDisable.value = true;
  } else if (value == "percentage") {
    levelFourFlatFee.value = "0.00";
    levelFourCommissionFee.value = "0.00";
    levelFourPercentageDisable.value = false;
    levelFourFlatDisable.value = true;
  }
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

const dataEnteredValidation = (data) => {
  return data.toString().trim().length > 0;
};

const decimalEnteredValidation = (data) => {
  return data.toString().trim().length > 2;
};

const getValueOfCommissionPercentage = (
  commissionPercentage,
  registrationFee
) => {
  return parseFloat(
    (parseFloat(registrationFee) * parseFloat(commissionPercentage)) / 100
  )
    .toFixed(2)
    .toString();
};

const updatePlanPackageDetails = () => {
  let requiredPlan = planDetails.value.find(
    (plan) => plan.name === planPackage.value
  );

  levelOneFlatFee.value = requiredPlan.level_one_flat_value;
  levelTwoFlatFee.value = requiredPlan.level_two_flat_value;
  levelThreeFlatFee.value = requiredPlan.level_three_flat_value;
  levelFourFlatFee.value = requiredPlan.level_four_flat_value;
  levelOnePercentageValue.value = requiredPlan.level_one_percentage_value;
  levelTwoPercentageValue.value = requiredPlan.level_two_percentage_value;
  levelThreePercentageValue.value = requiredPlan.level_three_percentage_value;
  levelFourPercentageValue.value = requiredPlan.level_four_percentage_value;
  levelOneFlatDisable.value = requiredPlan.is_level_one_percentage;
  levelTwoFlatDisable.value = requiredPlan.is_level_two_percentage;
  levelThreeFlatDisable.value = requiredPlan.is_level_three_percentage;
  levelFourFlatDisable.value = requiredPlan.is_level_four_percentage;
  levelOnePercentageDisable.value = requiredPlan.is_level_one_flat;
  levelTwoPercentageDisable.value = requiredPlan.is_level_two_flat;
  levelThreePercentageDisable.value = requiredPlan.is_level_three_flat;
  levelFourPercentageDisable.value = requiredPlan.is_level_four_flat;
  levelOneFlatOrPercentage.value = requiredPlan.is_level_one_flat
    ? "flat"
    : "percentage";
  levelTwoFlatOrPercentage.value = requiredPlan.is_level_two_flat
    ? "flat"
    : "percentage";
  levelThreeFlatOrPercentage.value = requiredPlan.is_level_three_flat
    ? "flat"
    : "percentage";
  levelFourFlatOrPercentage.value = requiredPlan.is_level_four_flat
    ? "flat"
    : "percentage";
  levelOneCommissionFee.value = parseFloat(requiredPlan.level_one_amount)
    .toFixed(2)
    .toString();
  levelTwoCommissionFee.value = parseFloat(requiredPlan.level_two_amount)
    .toFixed(2)
    .toString();
  levelThreeCommissionFee.value = parseFloat(requiredPlan.level_three_amount)
    .toFixed(2)
    .toString();
  levelFourCommissionFee.value = parseFloat(requiredPlan.level_four_amount)
    .toFixed(2)
    .toString();
  registrationFee.value = parseFloat(requiredPlan.registration_fee);
};

const updateCustomerSettings = () => {
  showLoader();

  let payload = {
    level_one_amount: levelOneCommissionFee.value,
    level_two_amount: levelTwoCommissionFee.value,
    level_three_amount: levelThreeCommissionFee.value,
    level_four_amount: levelFourCommissionFee.value,
    is_level_one_flat: levelOneFlatOrPercentage.value == "flat",
    is_level_one_percentage: levelOneFlatOrPercentage.value == "percentage",
    level_one_percentage_value: levelOnePercentageValue.value,
    level_one_flat_value: levelOneFlatFee.value,
    is_level_two_flat: levelTwoFlatOrPercentage.value == "flat",
    is_level_two_percentage: levelTwoFlatOrPercentage.value == "percentage",
    level_two_percentage_value: levelTwoPercentageValue.value,
    level_two_flat_value: levelTwoFlatFee.value,
    is_level_three_flat: levelThreeFlatOrPercentage.value == "flat",
    is_level_three_percentage: levelThreeFlatOrPercentage.value == "percentage",
    level_three_percentage_value: levelThreePercentageValue.value,
    level_three_flat_value: levelThreeFlatFee.value,
    is_level_four_flat: levelFourFlatOrPercentage.value == "flat",
    is_level_four_percentage: levelFourFlatOrPercentage.value == "percentage",
    level_four_percentage_value: levelFourPercentageValue.value,
    level_four_flat_value: levelFourFlatFee.value,
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
