<template>
  <q-dialog v-model="openPopup" persistent @keydown.esc="closeModal">
    <q-card class="commission-modal q-pl-sm">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Edit Commission Details
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form>
        <q-scroll-area style="height: calc(58vh - 170px)">
          <q-card-section>
            <div class="text-bold">
              Customer -
              <span class="text-green">{{
                `${props.selectedData.customer_name} - ${props.selectedData.customer_number}`
              }}</span>
            </div>
            <div class="text-bold q-mt-md">Commission Level</div>
            <q-select
              class="q-mt-sm"
              style="width: 250px"
              filled
              dense
              v-model="commissionLevel"
              :options="commissionLevelOptions"
            />
            <div class="text-bold q-mt-md">Commission Pay Date</div>
            <q-input
              v-model="commissionPaidDate"
              style="max-width: 250px"
              outlined
              dense
              autofocus
              type="date"
            />
            <div class="text-bold q-mt-md">Comments</div>
            <q-input
              v-model="comments"
              type="textarea"
              style="width: 250px"
              outlined
              dense
              autofocus
              rows="6"
              input-class="textarea-input"
              placeholder="Payment Comments"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
          </q-card-section>
        </q-scroll-area>
        <q-card-section class="row justify-end">
          <q-card-actions class="q-px-none">
            <q-btn
              class="q-mr-sm"
              unelevated
              color="primary"
              label="Payment Issue"
              :disable="validatePayment"
              @click="updateCommissionDetails('paymentIssue')"
              no-caps
            />
          </q-card-actions>
          <q-card-actions class="q-px-none">
            <q-btn
              unelevated
              color="primary"
              label="Paid"
              :disable="validatePayment"
              @click="updateCommissionDetails('paid')"
              no-caps
            />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "src/stores/user";
import { useQuasar, QSpinnerFacebook } from "quasar";

// Store Initialization
const userStore = useUserStore();

// Variable Initialization
const commissionLevel = ref("One");
const commissionLevelOptions = ref(["One", "Two", "Three", "Four"]);
const commissionPaidDate = ref("");
const comments = ref("");
const $q = useQuasar();

// Props
const props = defineProps({
  showEditCommissionPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeEditCommissionPopup: {
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
  get: () => props.showEditCommissionPopup,
  set: () => props.closeEditCommissionPopup(),
});

const validatePayment = computed(() => {
  let isCommissionPayDateValid = dataEnteredValidation(
    commissionPaidDate.value
  );
  let isCommentValid = dataEnteredValidation(comments.value);
  return !isCommissionPayDateValid || !isCommentValid;
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

const closeModal = (refreshCommissions) => {
  props.closeEditCommissionPopup(refreshCommissions);
};

const dataEnteredValidation = (data) => {
  return data.trim().length > 2;
};

const updateCommissionDetails = (commissionStatus) => {
  showLoader();

  let payload = {
    commissionStatus: commissionStatus,
    commissionLevel: commissionLevel.value,
    commissionPayDate: commissionPaidDate.value,
    comments: comments.value,
    customerNumber: props.selectedData.customer_number,
  };

  userStore
    .updateCommissionDetails(payload)
    .then((res) => {
      $q.notify({
        message: "Commission Details Updated Successfully!!!",
        type: "positive",
        position: "top",
      });

      closeModal(true);
    })
    .catch((err) => {
      $q.notify({
        message:
          "Error in updating Commission details. Please contact your admin!!!",
        type: "negative",
        position: "top",
      });
    })
    .finally(() => {
      hideLoader();
    });
};
</script>

<style scoped>
.commission-modal {
  width: 25vw;
  height: auto;
  max-width: 55vw;
  overflow: hidden;
}
</style>
