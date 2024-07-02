import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    userInfo: undefined,
  }),
  getters: {},
  actions: {
    userLoginWithPassword(payload) {
      let url = '/api/z2h/user/login/';
      return api.post(url, payload)
    },

    async getUserInfo() {
      let url = '/api/z2h/user/info/';
      return api.get(url, {
        params: { accessed_from: 'web' }
      }).then(res => {
        this.userInfo = res.data.user_info;
      })
    },

    async logoutUser() {
      let url = '/api/z2h/user/logout/';
      return api.post(url).then(res => {
        localStorage.removeItem("token");
        this.token = null;
        this.userInfo = undefined;
      })
    },

    saveWebuser(payload) {
      let url = '/api/z2h/user/web_user/';
      return api.post(url, payload);
    },

    getWebUsersList() {
      let url = '/api/z2h/user/web_user/';
      return api.get(url);
    },

    getCustomersList() {
      let url = '/api/z2h/user/customer/';
      return api.get(url);
    },

    getCustomerDetails(customerUid) {
      let url = `/api/z2h/user/customer/customer_details/`;
      return api.get(url, { params: { customer_uid: customerUid } });
    },

    updateCustomerDetails(payload) {
      let url = `/api/z2h/user/register/`;
      return api.put(url, payload);
    },

    getCommissionDetails(queryParams) {
      let url = `/api/z2h/user/customer/commission_details/`;
      return api.get(url, { params: queryParams });
    },

    updateCommissionDetails(payload) {
      let url = `/api/z2h/user/customer/update_commission_details/`;
      return api.patch(url, payload);
    },

    getRegisteredUsers() {
      let url = '/api/z2h/user/web_user/registered_users/';
      return api.get(url);
    },
  },
});
