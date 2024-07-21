<template>
  <div class="q-pa-md q-gutter-md dashboard-flex-container">
    <q-card
      class="my-card text-white"
      style="background: #ffa755; border-radius: 12px"
    >
      <q-card-section>
        <div class="section-one-flex-container">
          <div class="text-bold text-center" style="font-size: 16px">
            Yet to be Couriered Orders
          </div>
          <div class="text-bold text-center" style="font-size: 30px">
            {{ yetToBeCourieredOrdersCount }}
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      class="my-card text-white"
      style="background: #663399; border-radius: 12px"
    >
      <q-card-section>
        <div class="section-one-flex-container">
          <div class="text-bold text-center" style="font-size: 16px">
            In Transit Orders
          </div>
          <div class="text-bold text-center" style="font-size: 30px">
            {{ inTransitOrdersCount }}
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      class="my-card text-white"
      style="background: #008000; border-radius: 12px"
    >
      <q-card-section>
        <div class="section-one-flex-container">
          <div class="text-bold text-center" style="font-size: 16px">
            Delivered Orders
          </div>
          <div class="text-bold text-center" style="font-size: 30px">
            {{ deliveredOrdersCount }}
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      class="my-card text-white"
      style="background: #b22222; border-radius: 12px"
    >
      <q-card-section>
        <div class="section-one-flex-container">
          <div class="text-bold text-center" style="font-size: 16px">
            Cancelled Orders
          </div>
          <div class="text-bold text-center" style="font-size: 30px">
            {{ cancelledOrdersCount }}
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      class="my-card text-white"
      style="background: #808000; border-radius: 12px"
    >
      <q-card-section>
        <div class="section-one-flex-container">
          <div class="text-bold text-center" style="font-size: 16px">
            Registered Users
          </div>
          <div class="text-bold text-center" style="font-size: 30px">
            {{ registeredUsersCount }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <div class="q-pa-md q-gutter-md dashboard-flex-container">
    <q-card
      class="section-two-card"
      style="background: #caf1de; border-radius: 12px"
    >
      <q-card-section>
        <div class="section-one-flex-container text-blue">
          <div class="text-bold text-center" style="font-size: 18px">
            Not yet Paid Commissions
          </div>
          <div class="q-mt-sm" v-if="isChartDataLoaded">
            <Doughnut :data="chartData" :options="options" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useUserStore } from "src/stores/user";

ChartJS.register(ArcElement, Tooltip, Legend);

// Store Initialization
const userStore = useUserStore();

// Variable Initialization
const $q = useQuasar();
const chartData = ref({});
const options = {
  responsive: true,
  maintainAspectRatio: false,
};
const yetToBeCourieredOrdersCount = ref(0);
const inTransitOrdersCount = ref(0);
const deliveredOrdersCount = ref(0);
const cancelledOrdersCount = ref(0);
const registeredUsersCount = ref(0);
const isChartDataLoaded = ref(false);

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

const getDashboardReportData = () => {
  showLoader();
  userStore
    .getDashboardReports()
    .then((res) => {
      let responseData = res.data;
      yetToBeCourieredOrdersCount.value =
        responseData.yet_to_be_couriered_orders_count;
      inTransitOrdersCount.value = responseData.in_transit_orders_count;
      deliveredOrdersCount.value = responseData.delivered_orders_count;
      cancelledOrdersCount.value = responseData.cancelled_orders_count;
      registeredUsersCount.value = responseData.register_user_count;

      let requiredChartData = [
        responseData.customers_level_one_commission_not_got_paid_count,
        responseData.customer_level_two_commission_not_got_paid_count,
        responseData.customer_level_three_commission_not_got_paid_count,
        responseData.customer_level_four_commission_not_got_paid_count,
      ];
      chartData.value = {
        labels: ["1st  Level", "2nd Level", "3rd Third", "4th Level"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: requiredChartData,
          },
        ],
      };
      isChartDataLoaded.value = true;
    })
    .catch((err) => {
      console.log("error", err);
    })
    .finally(() => {
      hideLoader();
    });
};

// Lifecycle Methods
onMounted(() => {
  getDashboardReportData();
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
  height: 100px

.section-two-card
  width: 100%
  max-width: 500px
  height: 360px
</style>

<style>
.dashboard-flex-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

.section-one-flex-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
}
</style>
