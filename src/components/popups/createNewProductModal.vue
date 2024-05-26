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
      <q-form>
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
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";

// Variable Initialization
const productName = ref("");
const productDescription = ref("");

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

// Functions
const closeModal = (refreshProducts) => {
  props.closeNewProductPopup(refreshProducts);
};

const dataEnteredValidation = (data) => {
  return data.trim().length > 2;
};
</script>

<style scoped>
.product-modal {
  width: 40vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}
</style>
