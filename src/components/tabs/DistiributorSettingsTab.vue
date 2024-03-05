<template>
  <div class="row">
    <div class="col-12">
      <q-card class="card-size h-100vh">
        <div class="container-height">
          <div class="row q-ml-lg q-pt-lg">
            <div class="">
              <div
                style="font-size: 18px;"
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
                      Registration fee and Commission percentage on various levels
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
                        <div class="col-12 flex items-center justify-start q-pb-md">
                          <div style="min-width: 53px;">
                            Select Package:
                          </div>
                          <div class="q-ml-sm flex items-center">
                            <div style="max-width: 300px; min-width: 220px;" class="q-pa-md">
                              <div class="q-gutter-md">
                                <q-select filled v-model="planPackage" :options="planPackageOptions" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <div class="row">
                          <div class="col-12 flex items-center justify-start q-pb-md">
                            <div style="min-width: 53px;">
                              Level 1 (%)
                            </div>
                            <div style="max-width: 100px; max-height: 40px;" class="q-ml-lg">
                                <q-input
                                  v-model="levelOnePercentage"
                                  outlined
                                  dense
                                  :rules="[
                                      val => (val !== null && val !== '' && parseInt(val)!=NaN)|| 'Please type a number',
                                      val => val > 0  || 'Please type a real number'
                                  ]"
                                />
                              </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <div class="row">
                          <div class="col-12 flex items-center justify-start q-pb-md">
                            <div style="min-width: 53px;">
                              Level 2 (%)
                            </div>
                            <div style="max-width: 100px; max-height: 40px;" class="q-ml-lg">
                                <q-input
                                  v-model="levelTwoPercentage"
                                  outlined
                                  dense
                                  :rules="[
                                      val => (val !== null && val !== '' && parseInt(val)!=NaN)|| 'Please type a number',
                                      val => val > 0  || 'Please type a real number'
                                  ]"
                                />
                              </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <div class="row">
                          <div class="col-12 flex items-center justify-start q-pb-md">
                            <div style="min-width: 53px;">
                              Level 3 (%)
                            </div>
                            <div style="max-width: 100px; max-height: 40px;" class="q-ml-lg">
                                <q-input
                                  v-model="levelThreePercentage"
                                  outlined
                                  dense
                                  :rules="[
                                      val => (val !== null && val !== '' && parseInt(val)!=NaN)|| 'Please type a number',
                                      val => val > 0  || 'Please type a real number'
                                  ]"
                                />
                              </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg">
                        <div class="row">
                          <div class="col-12 flex items-center justify-start q-pb-md">
                            <div style="min-width: 53px;">
                              Level 4 (%)
                            </div>
                            <div style="max-width: 100px; max-height: 40px;" class="q-ml-lg">
                                <q-input
                                  v-model="levelFourPercentage"
                                  outlined
                                  dense
                                  :rules="[
                                      val => (val !== null && val !== '' && parseInt(val)!=NaN)|| 'Please type a number',
                                      val => val > 0  || 'Please type a real number'
                                  ]"
                                />
                              </div>
                          </div>
                        </div>
                      </div>
                      <div class="q-ml-lg q-mt-md">
                        <div class="row">
                          <div class="col-12 flex items-center justify-start q-pb-md">
                            <div style="min-width: 53px;">
                              Registration Fee (Rs.)
                            </div>
                            <div style="max-width: 100px; max-height: 40px;" class="q-ml-lg">
                                <q-input
                                  v-model="registrationFee"
                                  dense
                                  :rules="[
                                      val => (val !== null && val !== '' && parseInt(val)!=NaN)|| 'Please type a number',
                                      val => val > 0  || 'Please type a real number'
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

      <q-card-section
        class="flex justify-end fixed-table-bottom"
      >
        <div class="row no-wrap items-start justify-end">
          <div class="col-auto row justify-end pr-15">
            <q-btn
              flat
              style="color: blue"
              label="Cancel"
            />
            <q-btn
              color="primary"
              label="Save"
              class="q-ml-md"
            />
          </div>
        </div>
      </q-card-section>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import infoCircleIcon from "src/assets/icons/info-circle.svg";
import customTooltip from "src/components/shared/CustomTooltip.vue";

// Variable Initialization
const planPackage = ref("Silver");
const planPackageOptions = ref(['Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond'])
const levelOnePercentage = ref(10);
const levelTwoPercentage = ref(20);
const levelThreePercentage = ref(30);
const levelFourPercentage = ref(40);
const registrationFee = ref(500);
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
    <b>Registration Fee & Commission %</b>
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Commission Percentage for Independent distributors
    across the different levels (Level1, Level2, Level3 and Level4)
    with respect to different packages (Silver, Gold, Platinum, Emerald and Diamond).
    Based on the percentage, the customer will get a commission percentage
    while reaching the target against levels.
  </div>
  <div class="q-pl-md q-py-sm text-body2 text-white">
    Registration fee is when customer joins he should pay an initial
    amount according to plan package he will be choosing.
  </div>
`);

</script>

<style scoped>
.card-size {
  overflow: auto;
  max-height: calc(100vh - 121px)
}

.container-height {
  overflow: auto;
  height: calc(100vh - 195px);
  padding-bottom: 30px;
}

.header-text {
  font-weight: bold;
  color: blue;
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
