<template>
  <div class="q-px-md q-pt-md q-pb-xs float-right">
    <q-btn
      color="primary"
      class="q-mb-md q-mr-sm"
      no-caps
      @click="openNewProductCategoryPopup = true"
    >
      <div class="row justify-start items-center">
        <q-icon name="add" />
        <span class="q-ml-sm">New Category</span>
      </div>
    </q-btn>
    <q-btn
      color="primary"
      class="q-mb-md q-mr-sm"
      no-caps
      :disable="!enableProductSubCategories"
      @click="openNewProductSubCategoryPopup = true"
    >
      <div class="row justify-start items-center">
        <q-icon name="add" />
        <span class="q-ml-sm">New Sub Category</span>
      </div>
    </q-btn>
    <q-btn
      color="primary"
      class="q-mb-md"
      no-caps
      :disable="!enableProduct"
      @click="openNewProductPopup = true"
    >
      <div class="row justify-start items-center">
        <q-icon name="add" />
        <span class="q-ml-sm">New Product</span>
      </div>
    </q-btn>
  </div>

  <create-new-product-modal
    v-if="openNewProductPopup"
    v-model="openNewProductPopup"
    :show-new-product-popup="openNewProductPopup"
    :close-new-product-popup="closeNewProductPopup"
  />

  <create-new-product-category-modal
    v-if="openNewProductCategoryPopup"
    v-model="openNewProductCategoryPopup"
    :show-new-product-category-popup="openNewProductCategoryPopup"
    :close-new-product-category-popup="closeNewProductCategoryPopup"
  />

  <create-new-product-sub-category-modal
    v-if="openNewProductSubCategoryPopup"
    v-model="openNewProductSubCategoryPopup"
    :show-new-product-sub-category-popup="openNewProductSubCategoryPopup"
    :close-new-product-sub-category-popup="closeNewProductSubCategoryPopup"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import createNewProductModal from "src/components/popups/createNewProductModal.vue";
import createNewProductCategoryModal from "src/components/popups/createNewProductCategoryModal.vue";
import createNewProductSubCategoryModal from "src/components/popups/createNewProductSubCategoryModal.vue";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";

// Store Initalization
const generalStore = useGeneralStore();

// Variable Initializations
const openNewProductPopup = ref(false);
const openNewProductCategoryPopup = ref(false);
const openNewProductSubCategoryPopup = ref(false);
const { productCategories } = storeToRefs(generalStore);

// Computed
const enableProductSubCategories = computed(() => {
  return productCategories.value && productCategories.value.length;
});

const enableProduct = computed(() => {
  return (
    productCategories.value &&
    productCategories.value.length &&
    productCategories.value[0].sub_categories.length
  );
});

// Functions
const closeNewProductPopup = (refreshProducts) => {
  openNewProductPopup.value = false;
};

const closeNewProductCategoryPopup = () => {
  openNewProductCategoryPopup.value = false;
};

const closeNewProductSubCategoryPopup = () => {
  openNewProductSubCategoryPopup.value = false;
};

// Lifecycle Hooks
onMounted(() => {
  generalStore.getProductCategories();
});
</script>
