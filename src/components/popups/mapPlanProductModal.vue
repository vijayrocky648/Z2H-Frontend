<template>
  <q-dialog v-model="openPopup" persistent @keydown.esc="closeModal">
    <q-card class="map-plan-modal q-pl-md">
      <q-card-section class="row items-center">
        <div class="text-h6 text-bold" style="color: #123499">
          Map a Product to Plan
        </div>
        <q-space />
        <q-btn icon="close" flat round @click="closeModal" />
      </q-card-section>
      <q-form @submit="mapProductToPlan">
        <q-card-section>
          <div class="text-bold">Plan</div>
          <q-select
            style="width: 400px"
            filled
            v-model="chosenPlan"
            :options="planOptions"
            label="Choose Plan"
          />
          <div class="text-bold q-mt-lg">Products</div>
          <q-select
            filled
            v-model="chosenProducts"
            multiple
            :options="productOptions"
            style="width: 400px"
            label="Choose Product(s)"
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

// Props
const props = defineProps({
  showNewMapPlanPopup: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeNewMapPlanPopup: {
    type: Function,
    required: true,
  },
});

// Store Initialization
const generalStore = useGeneralStore();

// Variable Initializations
const chosenPlan = ref(null);
const chosenProducts = ref(null);
const $q = useQuasar();

const { planDetails, inactiveProducts } = storeToRefs(generalStore);

// Computed
const openPopup = computed({
  get: () => props.showNewMapPlanPopup,
  set: () => props.closeNewMapPlanPopup(),
});

const planOptions = computed(() => {
  return planDetails.value.map((plan) => plan.name);
});

const productOptions = computed(() => {
  return inactiveProducts.value?.map((item) => item.name);
});

const validateSave = computed(() => {
  let isChosenPlanValid = !!chosenPlan.value;
  let isChosenProductsValid =
    chosenProducts.value && chosenProducts.value.length;

  return !isChosenPlanValid || !isChosenProductsValid;
});

const chosenPlanUid = computed(() => {
  return planDetails.value.find((item) => item.name === chosenPlan.value).uid;
});

const chosenProductUids = computed(() => {
  let productUids = [];

  for (let product of chosenProducts.value) {
    let matchingProduct = inactiveProducts.value.find(
      (item) => item.name === product
    );
    productUids.push(matchingProduct?.uid);
  }

  return productUids;
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
  props.closeNewMapPlanPopup(refreshProducts);
};

const mapProductToPlan = () => {
  showLoader();

  let payload = {
    plan_uid: chosenPlanUid.value,
    product_uids: chosenProductUids.value,
  };

  generalStore
    .mapProductToPlan(payload)
    .then((res) => {
      $q.notify({
        message: "Product(s) mapped to Plan Successfully!!!",
        type: "positive",
        position: "top",
      });

      closeModal(true);
    })
    .catch((err) => {
      $q.notify({
        message:
          "Error in Mapping Pan to Product(s). Please contact your admin!!!",
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
  generalStore.getAppPlanDetails();
  generalStore.getAllProducts({
    product_type: "inactive",
  });
});
</script>

<style scoped>
.map-plan-modal {
  width: 30vw;
  height: auto;
  max-width: 75vw;
  overflow: hidden;
}
</style>
