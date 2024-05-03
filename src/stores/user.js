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
      return api.get(url).then(res => {
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
  },
});
