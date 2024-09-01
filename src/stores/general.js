import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    userRoles: [],
    userRolePages: [],
    planDetails: [],
    orders: [],
    selectedPage: '',
    productCategories: [],
    products: [],
    inactiveProducts: [],
    productsReturned: [],
  }),
  getters: {},
  actions: {
    async getWebUserRoles() {
      let url = "/api/z2h/app/web_roles_and_pages/";
      return await api.get(url).then((res) => {
        this.userRoles = res.data.roles;
      });
    },

    saveUserSettings(payload) {
      let url = "/api/z2h/app/save_web_user_settings/";
      return api.post(url, payload);
    },

    async getWebUserRolePages() {
      let url = "/api/z2h/app/web_user_role_page/";
      return await api.get(url).then((res) => {
        this.userRolePages = res.data;
      });;
    },

    async getAppPlanDetails() {
      let url = "/api/z2h/app/plan_details/";
      return await api.get(url).then((res) => {
        this.planDetails = res.data;
      });
    },

    updateCustomerSettings(payload, planDetailUid) {
      let url = `/api/z2h/app/plan_details/${planDetailUid}/`;
      return api.patch(url, payload);
    },

    getAllStates() {
      let url = "/api/z2h/utils/state/";
      return api.get(url);
    },

    getDistrictsForState(payload) {
      let url = `/api/z2h/utils/district/${payload.stateUid}/`;
      return api.get(url);
    },

    getOrders(queryParams) {
      let url = "/api/z2h/app/orders/";
      return api.get(url, {
        params: queryParams,
      });
    },

    updateOrders(payload, OrderUid) {
      let url = `/api/z2h/app/orders/${OrderUid}/`;
      return api.patch(url, payload);
    },

    async getProductCategories() {
      let url = "/api/z2h/app/product_categories/";
      return await api.get(url);
    },

    getProducts(productSubCategoryUid, queryParams) {
      let url = `/api/z2h/app/products/${productSubCategoryUid}/`;
      return api.get(url, {
        params: queryParams,
      });
    },

    async createProductCategory(payload) {
      let url = "/api/z2h/app/product_categories/";
      return await api.post(url, payload).then((res) => {
        this.productCategories.push(res.data);
      });
    },

    async createProductSubCategory(payload, productCategoryUid) {
      let url = `/api/z2h/app/product_sub_categories/${productCategoryUid}/`;
      return await api.post(url, payload).then((res) => {
        let responseData = res.data;
        let productCategory = this.productCategories.find((x) => x.uid === productCategoryUid);
        responseData.category_code = productCategory.category_code;
        this.productCategories.find((x) => x.uid === productCategoryUid).sub_categories.push(responseData);
      });
    },

    createProductImageUrls(payload) {
      let url = "/api/z2h/utils/image_upload/";
      return api.post(url, payload, {
        headers: { 'Content-Type': "multipart/form-data" },
      });
    },

    createProduct(payload, productSubCategoryUid) {
      let url = `/api/z2h/app/products/${productSubCategoryUid}/add/`;
      return api.post(url, payload).then((res) => {
        this.products.push(res.data);
      });
    },

    getAllProducts(queryParams) {
      let url = "/api/z2h/app/products_list/";
      return api.get(url, {
        params: queryParams,
      }).then((res) => {
        this.inactiveProducts = res.data;
      });
    },

    mapProductToPlan(payload) {
      let url = "/api/z2h/app/products_plan_map/";
      return api.post(url, payload);
    },

    createProductReturned(payload) {
      let url = "/api/z2h/app/products_returned/";
      return api.post(url, payload).then((res) => {
        this.productsReturned.push(res.data);
      });
    },

    getProductsReturned() {
      let url = "/api/z2h/app/products_returned/";
      return api.get(url).then((res) => {
        this.productsReturned = res.data;
      });
    },

    getOrdersCsvTemplate(payload) {
      let url = `/api/z2h/app/download_orders_template/${payload.fromDate}/${payload.toDate}/${payload.orderStatus}/`;
      return api.get(url, {
        responseType: 'blob',
      });
    },
  }
})
