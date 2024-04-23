<template>
  <q-dialog v-model="openPopup" @keydown.esc="closeModal">
    <q-card class="user-modal">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: blue">
          Create New Web User
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form>
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
              :rules="[(val) => !!val.trim() || 'Field is required']"
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
            <div class="text-bold">Address</div>
            <q-input
              v-model="address"
              type="textarea"
              style="width: 500px"
              outlined
              dense
              rows="3"
              placeholder="Enter user address."
              input-class="textarea-input"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Aadhar Details</div>
            <div class="q-ml-lg q-mt-sm">
              <div class="text-bold">Adhar Number</div>
              <q-input
                v-model="aadharNumber"
                style="max-width: 320px"
                outlined
                dense
                autofocus
                placeholder="Enter an Aadhar Number"
                maxlength="128"
                :rules="[(val) => !!val.trim() || 'Field is required']"
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
                :rules="[(val) => !!val.trim() || 'Field is required']"
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
                maxlength="128"
                :rules="[(val) => !!val.trim() || 'Field is required']"
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
                :rules="[(val) => !!val.trim() || 'Field is required']"
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
                maxlength="128"
                :rules="[(val) => !!val.trim() || 'Field is required']"
              />
              <div class="text-bold">Account Name</div>
              <q-input
                v-model="bankAccountName"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter name as in bank"
                maxlength="128"
                :rules="[(val) => !!val.trim() || 'Field is required']"
              />
              <div class="text-bold">Name of Bank and Branch</div>
              <q-input
                v-model="bankNameAndBranch"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter a bank name and Branch"
                maxlength="128"
                :rules="[(val) => !!val.trim() || 'Field is required']"
              />
              <div class="text-bold">IFSC Code</div>
              <q-input
                v-model="bankIfscCode"
                style="max-width: 400px"
                outlined
                dense
                autofocus
                placeholder="Enter a IFSC code"
                maxlength="128"
                :rules="[(val) => !!val.trim() || 'Field is required']"
              />
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
                :rules="[(val) => !!val.trim() || 'Field is required']"
              />
              <div class="text-bold">Mobile Number</div>
              <q-input
                  v-model="mobileNumber"
                  style="max-width: 400px"
                  outlined
                  dense
                  autofocus
                  placeholder="Enter a Mobile Number"
                  maxlength="128"
                  :rules="[(val) => !!val.trim() || 'Field is required']"
                />
                <div class="text-bold">Alternate Name (Father/Mother)</div>
                <q-input
                  v-model="alternateName"
                  style="max-width: 400px"
                  outlined
                  dense
                  autofocus
                  placeholder="Enter an Alternate Name"
                  maxlength="128"
                  :rules="[(val) => !!val.trim() || 'Field is required']"
                />
                <div class="text-bold">Alternate Mobile Number</div>
                <q-input
                    v-model="alternateMobileNumber"
                    style="max-width: 400px"
                    outlined
                    dense
                    autofocus
                    placeholder="Enter a Mobile Number"
                    maxlength="128"
                    :rules="[(val) => !!val.trim() || 'Field is required']"
                  />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold">System Role</div>
            <div class="row items-center">
              <div class="col-12">
                <q-radio
                  v-model="systemRole"
                  class="q-py-sm q-px-sm"
                  dense
                  keep-color
                  color="primary"
                  label="Superadmin"
                  val="superadmin"
                />
              </div>
              <div class="col-12">
                <q-radio
                  v-model="systemRole"
                  class="q-py-sm q-px-sm"
                  dense
                  keep-color
                  color="primary"
                  label="Telecaler"
                  val="telecaler"
                />
              </div>
              <div class="col-12">
                <q-radio
                  v-model="systemRole"
                  class="q-py-sm q-px-sm"
                  dense
                  keep-color
                  color="primary"
                  label="Admin"
                  val="admin"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-uploader label="User Photo" auto-upload url="" />
          </q-card-section>
        </q-scroll-area>
        <q-card-section class="row justify-end">
          <q-card-actions class="q-px-none">
            <q-btn flat color="primary" label="Cancel" no-caps />
            <q-btn unelevated color="primary" label="Save" no-caps />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";

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
const address = ref("");
const aadharNumber = ref("");
const aadharName = ref("");
const panNumber = ref("");
const panName = ref("");
const bankAccountNumber = ref("");
const personalEmail = ref("");
const mobileNumber = ref("");
const alternateName = ref("");
const alternateMobileNumber = ref("");
const bankAccountName = ref("");
const bankNameAndBranch = ref("");
const bankIfscCode = ref("");
const systemRole = ref("superadmin");

// Computed
const openPopup = computed({
  get: () => props.showNewUserPopup,
  set: () => props.closeNewUserPopup(),
});

// Functions
const closeModal = () => {
  props.closeNewUserPopup();
};

const updateProxy = () => {
  proxyDob.value = dob.value;
};

const saveDob = () => {
  dob.value = proxyDob.value;
};
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
