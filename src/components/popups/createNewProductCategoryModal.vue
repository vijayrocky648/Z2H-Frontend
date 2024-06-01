<template>
  <q-dialog
    v-model="openNewProductCategoryPopup"
    persistent
    @keydown.esc="closeModal"
  >
    <q-card class="product-category-modal">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Create New Product Category
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form @submit="createProductCategoryDetails">
        <q-card-section>
          <div class="text-bold">Name</div>
          <q-input
            v-model="productCategoryName"
            style="max-width: 400px"
            outlined
            dense
            autofocus
            placeholder="Enter a Product Catgeoty name"
            maxlength="64"
            :rules="[
              (val) => dataEnteredValidation(val) || 'Field is required!!!',
            ]"
          />
          <div class="text-bold">Description</div>
          <q-input
            v-model="productCategoryDescription"
            type="textarea"
            style="width: 400px"
            outlined
            dense
            autofocus
            rows="3"
            placeholder="Enter a Product Category Description"
            input-class="textarea-input"
            :rules="[
              (val) => dataEnteredValidation(val) || 'Field is required!!!',
            ]"
          />
        </q-card-section>
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

// Store Initalization
const generalStore = useGeneralStore();

// Props
const props = defineProps({
  showNewProductCategoryPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeNewProductCategoryPopup: {
    type: Function,
    required: true,
  },
});

// Variable Initialization
const productCategoryName = ref("");
const productCategoryDescription = ref("");
const $q = useQuasar();

// Computed
const openNewProductCategoryPopup = computed({
  get: () => props.showNewProductCategoryPopup,
  set: () => props.closeNewProductCategoryPopup(),
});

const validateSave = computed(() => {
  let isProductCategoryNameCorrect = dataEnteredValidation(
    productCategoryName.value
  );
  let isProductCategoryDescriptionCorrect = dataEnteredValidation(
    productCategoryDescription.value
  );

  return !isProductCategoryNameCorrect || !isProductCategoryDescriptionCorrect;
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

const closeModal = () => {
  props.closeNewProductCategoryPopup();
};

const dataEnteredValidation = (data) => {
  return data.trim().length > 2;
};

const createProductCategoryDetails = () => {
  showLoader();

  let payload = {
    name: productCategoryName.value,
    description: productCategoryDescription.value,
  };

  generalStore
    .createProductCategory(payload)
    .then((res) => {
      $q.notify({
        message: "Product Category Created Successfully!!!",
        type: "positive",
        position: "top",
      });

      closeModal();
    })
    .catch((err) => {
      $q.notify({
        message:
          "Error in updating Product Category. Please contact your admin!!!",
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
.product-category-modal {
  width: 40vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}
</style>
