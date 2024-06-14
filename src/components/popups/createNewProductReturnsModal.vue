<template>
  <q-dialog v-model="openPopup" persistent @keydown.esc="closeModal">
    <q-card class="product-return-modal q-pl-md">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Add Product Returned
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form @submit="createProductReturns">
        <q-scroll-area style="height: calc(75vh - 170px)">
          <q-card-section>
            <div class="text-bold">Product ID</div>
            <q-input
              v-model="productId"
              style="max-width: 400px"
              outlined
              dense
              autofocus
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Customer ID</div>
            <q-input
              v-model="customerId"
              style="max-width: 400px"
              outlined
              dense
              autofocus
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Customer Name</div>
            <q-input
              v-model="customerName"
              style="max-width: 400px"
              outlined
              dense
              autofocus
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Mobile Number</div>
            <q-input
              v-model="mobileNumber"
              style="max-width: 400px"
              outlined
              dense
              autofocus
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold q-mt-md">Product Returned Date</div>
            <q-input
              v-model="productReturnedDate"
              style="max-width: 400px"
              outlined
              dense
              autofocus
              type="date"
            />
            <div class="text-bold q-mt-lg">Comments</div>
            <q-input
              v-model="comments"
              type="textarea"
              style="width: 400px"
              outlined
              dense
              autofocus
              rows="3"
              placeholder="Enter a comment."
              input-class="textarea-input"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
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
import { ref, computed } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";

// Props
const props = defineProps({
  showNewReturnPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeNewReturnPopup: {
    type: Function,
    required: true,
  },
});

// Store Initalization
const generalStore = useGeneralStore();

// Variable Initialization
const productId = ref("");
const customerId = ref("");
const customerName = ref("");
const mobileNumber = ref("");
const productReturnedDate = ref("");
const comments = ref("");
const $q = useQuasar();

// Computed
const openPopup = computed({
  get: () => props.showNewReturnPopup,
  set: () => props.closeNewReturnPopup(),
});

const validateSave = computed(() => {
  let isCustomerIdValid = dataEnteredValidation(customerId.value);
  let isProductIdValid = dataEnteredValidation(productId.value);
  let isCustomerNameValid = dataEnteredValidation(customerName.value);
  let isMobileNumberValid = dataEnteredValidation(mobileNumber.value);
  let isProductReturnedDateValid = dataEnteredValidation(
    productReturnedDate.value
  );
  let commentsValid = dataEnteredValidation(comments.value);

  return (
    !isCustomerIdValid ||
    !isProductIdValid ||
    !isCustomerNameValid ||
    !isMobileNumberValid ||
    !isProductReturnedDateValid ||
    !commentsValid
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

const closeModal = (refreshProducts) => {
  props.closeNewReturnPopup(refreshProducts);
};

const dataEnteredValidation = (data) => {
  return data && data.toString().trim().length > 0;
};

const createProductReturns = () => {
  showLoader();

  let payload = {
    product_id: productId.value,
    customer_id: customerId.value,
    customer_name: customerName.value,
    mobile_number: mobileNumber.value,
    product_returned_date: productReturnedDate.value,
    comments: comments.value,
  };

  generalStore
    .createProductReturned(payload)
    .then((res) => {
      $q.notify({
        message: "Product Returned Added Successfully!!!",
        type: "positive",
        position: "top",
      });

      closeModal();
    })
    .catch((err) => {
      $q.notify({
        message:
          "Error in adding Returned Product. Please contact your admin!!!",
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
.product-return-modal {
  width: 30vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}
</style>
