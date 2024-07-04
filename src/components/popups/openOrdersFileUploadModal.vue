<template>
  <q-dialog
    v-model="openOrdersFileUplodPopup"
    persistent
    @keydown.esc="closeModal"
  >
    <q-card class="orders-file-upload-modal q-pl-md">
      <q-card-section class="items-center">
        <q-btn
          icon="close"
          class="float-right"
          flat
          round
          @click="closeModal"
        />
        <div
          class="text-h6 text-bold text-center q-mt-lg q-pb-lg"
          style="color: #123499"
        >
          Orders Excel File Upload
        </div>
        <div style="height: 50px">
          <q-file
            outlined
            v-model="ordersFile"
            accept=".xlsx"
            label="Upload File"
            style="width: 300px"
            class="q-ml-sm"
          />
        </div>
        <q-space />
      </q-card-section>
      <q-card-section class="row justify-end">
        <q-card-actions class="q-px-none">
          <q-btn
            unelevated
            color="primary"
            label="Upload"
            :disable="validateUpload"
            type="submit"
            no-caps
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
  showOrdersFileUploadPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeOrdersFileUploadPopup: {
    type: Function,
    required: true,
  },
});

// Variable Initialization
const ordersFile = ref(null);

// Computed
const openOrdersFileUplodPopup = computed({
  get: () => props.showOrdersFileUploadPopup,
  set: () => props.closeOrdersFileUploadPopup(),
});

const validateUpload = computed(() => {
  return !ordersFile.value;
});

// Functions
const closeModal = () => {
  let isFileUploaded = ordersFile.value && ordersFile.value.length;

  props.closeOrdersFileUploadPopup(isFileUploaded);
};
</script>

<style scoped>
.orders-file-upload-modal {
  width: 20vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}
</style>
