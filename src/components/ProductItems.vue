<template>
  <q-card class="no-shadow" bordered>
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      height="300px"
      class="bg-light-blue-11 shadow-1 rounded-borders"
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn
          v-if="active"
          size="md"
          icon="home"
          color="primary"
          flat
          round
          dense
          @click="onClick"
        />
        <q-btn
          v-else
          size="sm"
          :icon="btnProps.icon"
          color="white"
          flat
          round
          dense
          @click="onClick"
        />
      </template>

      <q-carousel-slide
        :name="item.uid"
        class="column no-wrap flex-center"
        v-for="(item, itemIndex) in data.product_image_urls"
      >
        <div class="text-center q-mt-sm">
          <q-img :src="item.url" height="170px" style="width: 50vh">
            <q-chip
              class="text-white absolute-top-right"
              :color="
                data.product_active_status === 'Inactive'
                  ? 'red-14'
                  : 'green-10'
              "
              :label="data.product_active_status"
            ></q-chip>
            <q-chip
              class="text-white absolute-top-left"
              :color="!data.plan_name ? 'red-14' : 'indigo-14'"
              :label="!data.plan_name ? 'No Plan' : data.plan_name"
            >
              <custom-tooltip
                :content="`Registration Fee : ${data.price}`"
                :max-width="'15rem'"
              />
            </q-chip>
          </q-img>
          <q-card-section class="q-pa-none">
            <q-btn
              fab
              color="primary"
              icon="fas fa-edit"
              padding="sm"
              class="absolute"
              style="top: 0; right: 6px; transform: translateY(-50%)"
            />
          </q-card-section>
          <q-card-section class="q-pa-none">
            <div class="text-h6 q-mt-sm">
              {{ data.name }}
              <span class="product-code"> [{{ data.product_code }}] </span>
            </div>
            <div class="text-subtitle1 q-mt-xm q-pb-md">
              {{ data.description }}
            </div>
          </q-card-section>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import customTooltip from "src/components/shared/CustomTooltip.vue";

// Variable Initialization
const slide = ref("");

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Lifecycle Hooks
onMounted(() => {
  slide.value = props.data.product_image_urls.length
    ? props.data.product_image_urls[0].uid
    : "";
});
</script>

<style scoped>
.product-code {
  font-weight: 500;
  font-size: medium;
  color: #123499;
}
</style>
