<template>
  <q-dialog v-model="openPopup" persistent @keydown.esc="closeModal">
    <q-card class="product-modal">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Create New Product
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form @submit="createNewProduct">
        <q-scroll-area style="height: calc(70vh - 170px)">
          <q-card-section>
            <div class="text-bold">Product Name</div>
            <q-input
              v-model="productName"
              style="max-width: 400px"
              outlined
              dense
              autofocus
              placeholder="Enter a Product name"
              maxlength="64"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
            />
            <div class="text-bold">Description</div>
            <q-input
              v-model="productDescription"
              type="textarea"
              style="width: 400px"
              outlined
              dense
              autofocus
              rows="2"
              placeholder="Enter Product Description"
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
            <div class="text-bold q-mt-lg">Product Sub Category</div>
            <q-select
              style="width: 400px"
              filled
              v-model="productSubCategory"
              :options="productSubCategoryOptions"
            />
            <div class="text-bold q-mt-lg">Product Images</div>
            <q-file
              v-model="productImages"
              label="Add Images"
              filled
              multiple
              append
              accept=".jpg,.jpeg,.png"
              style="width: 400px"
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
import { ref, computed, watch } from "vue";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";

// Store Initalization
const generalStore = useGeneralStore();

// Variable Initialization
const productName = ref("");
const productDescription = ref("");
const productCategory = ref("");
const productSubCategory = ref("");
const productSubCategoryOptions = ref([]);
const productImages = ref(null);
const productImageUrls = ref([]);

const { productCategories } = storeToRefs(generalStore);

// Props
const props = defineProps({
  showNewProductPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeNewProductPopup: {
    type: Function,
    required: true,
  },
});

// Computed
const openPopup = computed({
  get: () => props.showNewProductPopup,
  set: () => props.closeNewProductPopup(),
});

const productCategoryOptions = computed(() => {
  let productCategoriesNames = productCategories.value?.map(
    (item) => item.name
  );
  productCategory.value = productCategoriesNames && productCategoriesNames[0];

  return productCategoriesNames;
});

const validateSave = computed(() => {
  let isProductNameValid = dataEnteredValidation(productName.value);
  let isProductDescriptionValid = dataEnteredValidation(
    productDescription.value
  );
  let isProductImagesValid = productImages.value && productImages.value.length;

  return (
    !isProductNameValid || !isProductDescriptionValid || !isProductImagesValid
  );
});

// Functions
const closeModal = (refreshProducts) => {
  props.closeNewProductPopup(refreshProducts);
};

const dataEnteredValidation = (data) => {
  return data.trim().length > 2;
};

const updateProductSubCategoryOptions = (data) => {
  let chosenProductCategory = productCategories.value?.find(
    (item) => item.name === data
  );
  productSubCategory.value = chosenProductCategory.sub_categories[0].name;
  productSubCategoryOptions.value = chosenProductCategory.sub_categories.map(
    (item) => item.name
  );
};

const createNewProduct = () => {
  console.log("productImages.value", productImages.value);
  let payload = {
    file_name: productImages.value,
    upload_type: "test",
  };

  let form = new FormData();
  form.append("file_name", productImages.value[0]);
  form.append("file_name", productImages.value[1]);

  generalStore
    .createProductImageUrls(form)
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

// Watchers
watch(productCategory, (value) => {
  updateProductSubCategoryOptions(value);
});
</script>

<style scoped>
.product-modal {
  width: 40vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}
</style>
