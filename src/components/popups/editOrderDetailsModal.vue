<template>
  <q-dialog v-model="openPopup" persistent @keydown.esc="closeModal">
    <q-card class="order-modal">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Edit Order Details
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form>
        <q-card-section>
          <div class="text-bold">Customer - <span class="text-green">{{ customerName }}</span></div>
          <div class="text-bold q-mt-lg">Delivery Date</div>
          <q-input
              v-model="deliveryDate"
              style="max-width: 200px"
              outlined
              dense
              autofocus
              type="date"
          />
          <div class="text-bold q-mt-md">Delivery Number</div>
          <q-input
            v-model="deliveryNumber"
            style="max-width: 400px"
            outlined
            dense
            autofocus
            placeholder="Enter a Delivery Number"
            maxlength="128"
          />
          <div class="text-bold q-mt-md">Delivery Name</div>
          <q-input
            v-model="deliveryName"
            style="max-width: 400px"
            outlined
            dense
            autofocus
            placeholder="Enter a Delivery Partner"
            maxlength="128"
          />
          <div class="text-bold q-mt-md">Delivery Address</div>
          <q-input
            v-model="deliveryAddress"
            type="textarea"
            style="width: 400px"
            outlined
            dense
            autofocus
            rows="2"
            placeholder="Enter Delivery address."
            input-class="textarea-input"
          />
          <div class="text-bold q-mt-md">Order Status</div>
          <q-select
            style="width: 320px"
            filled
            v-model="orderStatus"
            :options="orderStatusOptions"
          />
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-card-actions class="q-px-none">
            <q-btn
              unelevated
              color="primary"
              label="Save"
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
  selectedData: {
    type: Object,
    required: true,
  },
});

// variable Initialization
const deliveryDate = ref(props.selectedData[0].delivery_date);
const deliveryNumber = ref(props.selectedData[0].delivery_name);
const customerName = ref(props.selectedData[0].customer_name);
const deliveryName = ref(props.selectedData[0].delivery_through);
const deliveryAddress = ref(props.selectedData[0].delivery_address);
const orderStatus = ref(props.selectedData[0].order_status);
const orderStatusData = [
  {label: 'pending', name: 'Pending'},
  {label: 'couriered', name: 'Couriered'},
  {label: 'delivered', name: 'Delivered'},
  {label: 'cancelled', name: 'Cancelled'},
];

// Computed
const openPopup = computed({
  get: () => props.showNewUserPopup,
  set: () => props.closeNewUserPopup(),
});

const orderStatusOptions = computed(() => {
  return orderStatusData.map((orderStatus) => orderStatus.name)
});

// Methods
const closeModal = () => {
  props.closeNewUserPopup();
};
</script>

<style scoped>
.order-modal {
  width: 35vw;
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
