<template>
  <div class="q-px-md q-pt-md q-pb-xs float-right">
    <q-btn
      color="primary"
      class="q-mb-md"
      no-caps
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
</template>

<script setup>
import { ref } from "vue";
import createNewProductModal from "src/components/popups/createNewProductModal.vue";

// Variable Initializations
const openNewProductPopup = ref(false);

// Functions
const closeNewProductPopup = (refreshProducts) => {
  openNewProductPopup.value = false;
};
</script>
