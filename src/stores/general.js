import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    userRoles: [],
    userRolePages: [],
    planDetails: [],
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
    }
  }
})
