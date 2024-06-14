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
      class="q-mb-md q-mr-sm"
      no-caps
      :disable="!enableProduct"
      @click="openNewProductPopup = true"
    >
      <div class="row justify-start items-center">
        <q-icon name="add" />
        <span class="q-ml-sm">New Product</span>
      </div>
    </q-btn>
    <q-btn
      color="primary"
      class="q-mb-md q-mr-sm"
      no-caps
      :disable="!enableProduct"
      @click="openNewMapPlanProductPopup = true"
    >
      <div class="row justify-start items-center">
        <q-icon name="add" />
        <span class="q-ml-sm">Map Product Plan</span>
      </div>
    </q-btn>
    <q-btn
      color="primary"
      class="q-mb-md"
      no-caps
      :disable="!enableProduct"
      @click="openNewReturnPopup = true"
    >
      <div class="row justify-start items-center">
        <q-icon name="add" />
        <span class="q-ml-sm">Returns</span>
      </div>
    </q-btn>
  </div>

  <div class="q-px-md q-pt-lg q-pb-xs">
    <q-breadcrumbs gutter="md">
      <q-breadcrumbs-el
        :label="productCategoryLabel"
        class="text-bold"
        style="cursor: pointer"
        @click="productCategoriesClick"
      />
      <q-breadcrumbs-el
        :label="productSubCategoryLabel"
        style="cursor: pointer"
        class="text-bold"
        @click="productSubCategoriesClick"
      />
      <q-breadcrumbs-el label="Products" class="text-bold" />
      <q-breadcrumbs-el
        label="Returns"
        style="cursor: pointer"
        class="text-bold"
        @click="productReturnsClick"
      />
    </q-breadcrumbs>
  </div>

  <div class="q-ml-md q-mt-lg q-mr-lg q-pa-md">
    <q-table
      v-if="enableProductCategoriesTable"
      class="product-categories-table"
      flat
      bordered
      title="Product Categories"
      :rows="productCategoryRows"
      :columns="productCategoryColumns"
      row-key="category_code"
      selection="single"
      v-model:selected="selectedProductCategory"
      :filter="filterProductCategory"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilterProductCategory"
          filled
          borderless
          dense
          debounce="300"
          v-model="filterProductCategory"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          icon="filter_list"
          @click="showFilterProductCategory = !showFilterProductCategory"
          flat
        />
      </template>
    </q-table>

    <q-table
      v-if="enableProductSubCategoriesTable"
      class="product-sub-categories-table"
      flat
      bordered
      title="Product Sub Categories"
      :rows="productSubCategoryRows"
      :columns="productSubCategoryColumns"
      row-key="sub_category_code"
      selection="single"
      v-model:selected="selectedProductSubCategory"
      :filter="filterProductSubCategory"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilterProductSubCategory"
          filled
          borderless
          dense
          debounce="300"
          v-model="filterProductSubCategory"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          icon="filter_list"
          @click="showFilterProductSubCategory = !showFilterProductSubCategory"
          flat
        />
      </template>
    </q-table>

    <q-table
      v-if="enableProductReturnedTable"
      class="product-returned-table"
      flat
      bordered
      title="Product(s) Returned"
      :rows="productsReturned"
      :columns="productReturnedColumns"
      row-key="id"
      :filter="filterProductReturned"
    >
      <template v-slot:top-right>
        <q-input
          v-if="showFilterProductReturned"
          filled
          borderless
          dense
          debounce="300"
          v-model="filterProductSubCategory"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          icon="filter_list"
          @click="showFilterProductReturned = !showFilterProductReturned"
          flat
        />
      </template>
    </q-table>

    <div class="row q-col-gutter-sm" v-if="enableProductItems">
      <div
        class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
        v-for="(item, item_index) in displayProducts"
      >
        <product-items :data="item" />
      </div>
    </div>
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

  <map-plan-product-modal
    v-if="openNewMapPlanProductPopup"
    v-model="openNewMapPlanProductPopup"
    :show-new-map-plan-popup="openNewMapPlanProductPopup"
    :close-new-map-plan-popup="closeNewMapPlanPopup"
  />

  <create-new-product-returns-modal
    v-if="openNewReturnPopup"
    v-model="openNewReturnPopup"
    :show-new-return-popup="openNewReturnPopup"
    :close-new-return-popup="closeNewReturnPopup"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import createNewProductModal from "src/components/popups/createNewProductModal.vue";
import createNewProductCategoryModal from "src/components/popups/createNewProductCategoryModal.vue";
import createNewProductSubCategoryModal from "src/components/popups/createNewProductSubCategoryModal.vue";
import mapPlanProductModal from "src/components/popups/mapPlanProductModal.vue";
import createNewProductReturnsModal from "src/components/popups/createNewProductReturnsModal.vue";
import productItems from "src/components/ProductItems.vue";
import { useGeneralStore } from "src/stores/general";
import { storeToRefs } from "pinia";

// Store Initalization
const generalStore = useGeneralStore();

// Variable Initializations
const openNewProductPopup = ref(false);
const openNewProductCategoryPopup = ref(false);
const openNewProductSubCategoryPopup = ref(false);
const openNewMapPlanProductPopup = ref(false);
const openNewReturnPopup = ref(false);
let columnsDataProductCategories = [
  {
    name: "categoryCode",
    required: true,
    label: "Category Code",
    align: "left",
    field: (row) => row.category_code,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    sortable: true,
  },
  {
    name: "productCategoryStatus",
    label: "Status",
    field: "product_category_status",
    sortable: true,
  },
];
let columnsDataProductSubCategories = [
  {
    name: "subCategoryCode",
    required: true,
    label: "Sub Category Code",
    align: "left",
    field: (row) => row.sub_category_code,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "categoryCode",
    label: "Category Code",
    field: "category_code",
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    sortable: true,
  },
  {
    name: "productSubCategoryStatus",
    label: "Status",
    field: "product_sub_category_status",
    sortable: true,
  },
];
let columnsDataProductReturned = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
  },
  {
    name: "productId",
    label: "Product ID",
    field: "product_id",
  },
  {
    name: "customerId",
    label: "Customer ID",
    field: "customer_id",
  },
  {
    name: "customerName",
    label: "Customer Name",
    field: "customer_name",
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    field: "mobile_number",
  },
  {
    name: "productReturnedDate",
    label: "Product Returned Date",
    field: "product_returned_date",
  },
  {
    name: "comments",
    label: "Comments",
    field: "comments",
  },
];
const selectedProductCategory = ref([]);
const selectedProductSubCategory = ref([]);
const filterProductCategory = ref("");
const filterProductSubCategory = ref("");
const filterProductReturned = ref("");
const showFilterProductCategory = ref(false);
const showFilterProductSubCategory = ref(false);
const showFilterProductReturned = ref(false);
const productCategoryColumns = ref(columnsDataProductCategories);
const productSubCategoryColumns = ref(columnsDataProductSubCategories);
const productReturnedColumns = ref(columnsDataProductReturned);
const productCategoryRows = ref([]);
const productSubCategoryRows = ref([]);
const productCategoryLabel = ref("Category");
const productSubCategoryLabel = ref("Sub Category");
const enableProductCategoriesTable = ref(true);
const enableProductSubCategoriesTable = ref(false);
const enableProductItems = ref(false);
const enableProductReturnedTable = ref(false);

const $q = useQuasar();

const { productCategories, products, productsReturned } =
  storeToRefs(generalStore);

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

const displayProducts = computed(() => {
  return products.value?.filter((item) => item.product_image_urls.length);
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

const closeNewProductPopup = (refreshProducts) => {
  openNewProductPopup.value = false;
};

const closeNewProductCategoryPopup = () => {
  openNewProductCategoryPopup.value = false;
};

const closeNewProductSubCategoryPopup = () => {
  openNewProductSubCategoryPopup.value = false;
};

const closeNewMapPlanPopup = (refreshProducts) => {
  openNewMapPlanProductPopup.value = false;

  if (refreshProducts === true) {
    productCategoriesClick();
  }
};

const closeNewReturnPopup = (refreshProducts) => {
  openNewReturnPopup.value = false;
};

const productCategoriesClick = () => {
  enableProductSubCategoriesTable.value = false;
  selectedProductCategory.value = [];
  selectedProductSubCategory.value = [];
  enableProductItems.value = false;
  enableProductReturnedTable.value = false;
  enableProductCategoriesTable.value = true;
};

const productSubCategoriesClick = () => {
  enableProductItems.value = false;
  enableProductReturnedTable.value = false;

  if (enableProductCategoriesTable.value) {
    return;
  }

  selectedProductSubCategory.value = [];
  enableProductSubCategoriesTable.value = true;
};

const productReturnsClick = () => {
  enableProductCategoriesTable.value = false;
  enableProductSubCategoriesTable.value = false;
  selectedProductCategory.value = [];
  selectedProductSubCategory.value = [];
  enableProductItems.value = false;
  productSubCategoryRows.value = [];
  enableProductReturnedTable.value = true;
};

const getProductCategories = () => {
  showLoader();
  generalStore
    .getProductCategories()
    .then((res) => {
      productCategories.value = res.data;
      productCategoryRows.value = productCategories.value;
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      hideLoader();
    });
};

const getProduct = (subCategory) => {
  showLoader();
  generalStore
    .getProducts(subCategory.uid)
    .then((res) => {
      products.value = res.data;
      enableProductItems.value = true;
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      hideLoader();
    });
};

// Watchers
watch(selectedProductCategory, (value) => {
  if (value.length) {
    productCategoryLabel.value = value[0].name;
    enableProductCategoriesTable.value = false;
    enableProductSubCategoriesTable.value = true;
    productSubCategoryRows.value = value[0].sub_categories;
  } else {
    productCategoryLabel.value = "Category";
  }
});

watch(selectedProductSubCategory, (value) => {
  if (value.length) {
    productSubCategoryLabel.value = value[0].name;
    enableProductSubCategoriesTable.value = false;
    getProduct(value[0]);
  } else {
    productSubCategoryLabel.value = "Sub Category";
  }
});

// Lifecycle Hooks
onMounted(() => {
  getProductCategories();
  generalStore.getProductsReturned();
});
</script>

<style>
.product-categories-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.product-categories-table thead {
  color: #123499;
}

.product-sub-categories-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.product-sub-categories-table thead {
  color: #123499;
}

.product-returned-table .q-table__title {
  color: #1a43bf;
  font-weight: bold;
}

.product-returned-table thead {
  color: #123499;
}
</style>
