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
      <q-form @submit="updateOrderStatus">
        <q-scroll-area style="height: calc(95vh - 170px)">
          <q-card-section>
            <div class="text-bold">
              Customer - <span class="text-green">{{ customerName }}</span>
            </div>
            <div class="text-bold q-mt-md">Delivery Date</div>
            <q-input
              v-model="deliveryDate"
              style="max-width: 200px"
              outlined
              dense
              autofocus
              type="date"
              :disable="disableDeliveryDate"
            />
            <div class="text-bold q-mt-md">Courier Date</div>
            <q-input
              v-model="courierDate"
              style="max-width: 200px"
              outlined
              dense
              autofocus
              type="date"
              :disable="disableCourierDate"
            />
            <div class="text-bold q-mt-md">Courier Tracking Number</div>
            <q-input
              v-model="deliveryNumber"
              style="max-width: 400px"
              outlined
              dense
              autofocus
              placeholder="Enter a Courier Tracking Number"
              maxlength="128"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
              :disable="disableCourierNumber"
            />
            <div class="text-bold q-mt-xs">Name of the Courier</div>
            <q-input
              v-model="deliveryName"
              style="max-width: 400px"
              outlined
              dense
              autofocus
              placeholder="Enter a Name of the Courier"
              maxlength="128"
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
              :disable="disableNameOfCourier"
            />
            <div class="text-bold q-mt-xs">Delivery Address</div>
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
              :rules="[
                (val) => dataEnteredValidation(val) || 'Field is required!!!',
              ]"
              :disable="disbaleDeliveryAddress"
            />
            <div class="text-bold q-mt-xs">Order Status</div>
            <q-select
              style="width: 320px"
              filled
              v-model="orderStatus"
              :options="orderStatusOptions"
            />
          </q-card-section>
        </q-scroll-area>
        <q-card-section class="row justify-end">
          <q-card-actions class="q-px-none">
            <q-btn
              unelevated
              color="primary"
              label="Save"
              type="submit"
              no-caps
              :disable="validateSave"
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

// Store Initialization
const generalStore = useGeneralStore();

// Variable Initialization
const $q = useQuasar();

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
const deliveryDate = ref("");
const courierDate = ref("");
const deliveryNumber = ref(props.selectedData[0].delivery_number);
const customerName = ref(props.selectedData[0].customer_name);
const deliveryName = ref(props.selectedData[0].delivery_through);
const deliveryAddress = ref(props.selectedData[0].delivery_address);
const orderStatus = ref(props.selectedData[0].order_status);
let orderStatusData = [
  { label: "yet_to_be_couriered", name: "Yet to be Couriered" },
  { label: "in_transit", name: "In Transit" },
  { label: "delivered", name: "Delivered" },
  { label: "cancelled", name: "Cancelled" },
];

// Computed
const openPopup = computed({
  get: () => props.showNewUserPopup,
  set: () => props.closeNewUserPopup(),
});

const orderStatusOptions = computed(() => {
  return orderStatusData.map((orderStatus) => orderStatus.name);
});

const disableDeliveryDate = computed(() => {
  let disableStatusArray = ["Yet to be Couriered", "Delivered", "Cancelled"];
  return disableStatusArray.includes(props.selectedData[0].order_status);
});

const disableCourierDate = computed(() => {
  return props.selectedData[0].order_status !== "Yet to be Couriered";
});

const disableCourierNumber = computed(() => {
  return props.selectedData[0].order_status === "In Transit";
});

const disableNameOfCourier = computed(() => {
  return props.selectedData[0].order_status === "In Transit";
});

const disbaleDeliveryAddress = computed(() => {
  return props.selectedData[0].order_status === "In Transit";
});

const getOrderStatus = computed(() => {
  let requiredOrder = orderStatusData.find(
    (status) => status.name === orderStatus.value
  );

  return requiredOrder.label;
});

const validateSave = computed(() => {
  let isDeliveryNumberValid = dataEnteredValidation(deliveryNumber.value);
  let isDeliveryNameValid = dataEnteredValidation(deliveryName.value);
  let isDeliveryAddressValid = dataEnteredValidation(deliveryAddress.value);
  let isOrderStatusPending = orderStatus.value === "Yet to be Couriered";
  let isOrderStatusCouriered = orderStatus.value === "In Transit";
  let isOrderStatusDelivered = orderStatus.value === "Delivered";
  let isCourierDateValid = isOrderStatusCouriered && courierDate.value;
  let isDeliveryDateValid = isOrderStatusDelivered && deliveryDate.value;
  let courierDateGreaterThanDeliveryDate =
    courierDate.value &&
    deliveryDate.value &&
    courierDate.value > deliveryDate.value;

  if (courierDateGreaterThanDeliveryDate) {
    return true;
  }

  if (
    props.selectedData[0].order_status === "In Transit" &&
    !deliveryDate.value
  ) {
    return true;
  }

  if (isOrderStatusCouriered && deliveryDate.value) {
    return true;
  }

  if (isOrderStatusDelivered) {
    return !isDeliveryDateValid;
  }

  return (
    !isDeliveryNumberValid ||
    !isDeliveryNameValid ||
    !isDeliveryAddressValid ||
    isOrderStatusPending ||
    !isCourierDateValid
  );
});

// Methods
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

const closeModal = (refreshData = false) => {
  props.closeNewUserPopup(refreshData);
};

const dataEnteredValidation = (data) => {
  return data && data.toString().trim().length > 0;
};

const updateOrderStatusData = () => {
  let selectedDataOrderStatus = props.selectedData[0].order_status;

  if (selectedDataOrderStatus === "Yet to be Couriered") {
    return;
  }

  if (selectedDataOrderStatus === "In Transit") {
    orderStatusData = [
      { label: "delivered", name: "Delivered" },
      { label: "cancelled", name: "Cancelled" },
    ];
  } else if (
    selectedDataOrderStatus === "Delivered" ||
    selectedDataOrderStatus === "Cancelled"
  ) {
    orderStatusData = [];
  }
};

const changeDate = (inputDate) => {
  const [day, month, year] = inputDate.split("-");
  return `${year}-${month}-${day}`;
};

const updateOrderStatus = () => {
  showLoader();
  console.log("courier date", courierDate.value);

  let payload = {
    delivery_date: deliveryDate.value ?? null,
    courier_date: courierDate.value,
    delivery_details: {
      delivery_through: deliveryName.value,
      delivery_number: deliveryNumber.value,
      delivery_address: deliveryAddress.value,
    },
    order_status: getOrderStatus.value,
  };
  generalStore
    .updateOrders(payload, props.selectedData[0].uid)
    .then((res) => {
      closeModal(true);
      $q.notify({
        message: "Order Details Updated Successfully!!!",
        type: "positive",
        position: "top",
      });
    })
    .catch((err) => {
      $q.notify({
        message: "Something went Wrong. Please contact your admin!!!",
        type: "negative",
        position: "top",
      });
    })
    .finally(() => {
      hideLoader();
    });
};

// Lifecycle Hooks
onMounted(() => {
  if (props.selectedData[0].courier_date) {
    courierDate.value = changeDate(props.selectedData[0].courier_date);
  }

  if (props.selectedData[0].delivery_date) {
    deliveryDate.value = changeDate(props.selectedData[0].delivery_date);
  }

  updateOrderStatusData();
});
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
