<template>
  <q-dialog
    v-model="openNewProductSubCategoryPopup"
    persistent
    @keydown.esc="closeModal"
  >
    <q-card class="product-sub-category-modal">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Create New Product Sub Category
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>

      <q-form @submit="createProductSubCategoryDetails">
        <q-card-section>
          <div class="text-bold">Name</div>
          <q-input
            v-model="productSubCategoryName"
            style="max-width: 400px"
            outlined
            dense
            autofocus
            placeholder="Enter a Product Sub Catgeoty name"
            maxlength="64"
            :rules="[
              (val) => dataEnteredValidation(val) || 'Field is required!!!',
            ]"
          />
          <div class="text-bold">Description</div>
          <q-input
            v-model="productSubCategoryDescription"
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
          <div class="text-bold">Product Category</div>
          <q-select
            style="width: 400px"
            filled
            v-model="productCategory"
            :options="productCategoryOptions"
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
import { ref, computed, onMounted } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";

// Store Initalization
const generalStore = useGeneralStore();

// Props
const props = defineProps({
  showNewProductSubCategoryPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeNewProductSubCategoryPopup: {
    type: Function,
    required: true,
  },
});

// Variable Initialization
const productCategory = ref("");
const productSubCategoryDescription = ref("");
const productSubCategoryName = ref("");
const $q = useQuasar();

const { productCategories } = storeToRefs(generalStore);

// Computed
const openNewProductSubCategoryPopup = computed({
  get: () => props.showNewProductSubCategoryPopup,
  set: () => props.closeNewProductSubCategoryPopup(),
});

const productCategoryOptions = computed(() => {
  let prodCategories = productCategories.value?.map(
    (productCategory) => productCategory.name
  );
  productCategory.value = prodCategories && prodCategories[0];
  return prodCategories;
});

const getProductCategoryId = computed(() => {
  let chosenProductCategory = productCategories.value?.find(
    (item) => item.name === productCategory.value
  );

  return chosenProductCategory.id;
});

const getProductCategoryUid = computed(() => {
  let chosenProductCategory = productCategories.value?.find(
    (item) => item.name === productCategory.value
  );

  return chosenProductCategory.uid;
});

const validateSave = computed(() => {
  let isProductSubCategoryNameValid = dataEnteredValidation(
    productSubCategoryName.value
  );
  let isProductSubCategoryDescriptionValid = dataEnteredValidation(
    productSubCategoryDescription.value
  );

  return (
    !isProductSubCategoryNameValid || !isProductSubCategoryDescriptionValid
  );
});

// Funtions
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
  props.closeNewProductSubCategoryPopup();
};

const dataEnteredValidation = (data) => {
  return data.trim().length > 2;
};

const createProductSubCategoryDetails = () => {
  showLoader();

  let payload = {
    name: productSubCategoryName.value,
    description: productSubCategoryDescription.value,
    category: getProductCategoryId.value,
  };

  generalStore
    .createProductSubCategory(payload, getProductCategoryUid.value)
    .then((res) => {
      $q.notify({
        message: "Product Sub Category Created Successfully!!!",
        type: "positive",
        position: "top",
      });

      closeModal();
    })
    .catch((err) => {
      $q.notify({
        message:
          "Error in updating Product Sub Category. Please contact your admin!!!",
        type: "negative",
        position: "top",
      });
    })
    .finally(() => {
      hideLoader();
    });
};

onMounted(() => {
  generalStore.getProductCategories();
});
</script>

<style scoped>
.product-sub-category-modal {
  width: 40vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}
</style>
