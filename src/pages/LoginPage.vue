<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="company_logo.jpg" alt="" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit="validateUserLogin">
              <q-input
                autofocus
                outlined
                v-model="email"
                bg-color="grey-3"
                label="email"
                type="email"
                :rules="[(val) => !!val || 'Field is required']"
                no-error-icon
              />

              <q-input
                type="password"
                outlined
                v-model="password"
                bg-color="grey-3"
                label="Password"
                :rules="[(val) => !!val || 'Field is required']"
                no-error-icon
              />

              <div class="row justify-center">
                <q-btn label="Login" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user.js";

// Route Initialization
const router = useRouter();

// Store Initialization
const userStore = useUserStore();

// Variable Declarations
const email = ref("");
const password = ref("");
const $q = useQuasar();

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

const validateUserLogin = () => {
  showLoader();
  let payload = {
    email: email.value,
    password: password.value,
    accessed_from: "web",
  };
  userStore
    .userLoginWithPassword(payload)
    .then((res) => {
      let token = res.data.token;
      userStore.token = token;
      localStorage.setItem("token", token);
      userStore.getUserInfo();
      router.push({
        name: "main",
      });
    })
    .catch((err) => {
      let errors = null;
      let errorMessage = null;
      let errorResponse = err.response?.data;

      if (errorResponse?.non_field_errors) {
        errors = errorResponse.non_field_errors;
        errorMessage = errors[0];
      } else if (errorResponse?.email) {
        errors = errorResponse.email;
        errorMessage = errors[0];
      } else if (!errorResponse) {
        errorMessage = "Something went Wrong. Please contact your admin!!!";
      }

      if (errorMessage) {
        $q.notify({
          message: errorMessage,
          type: "negative",
          position: "top",
        });
      }
    })
    .finally(() => {
      hideLoader();
    });
};
</script>

<style scoped>
.bg-image {
  background-image: linear-gradient(135deg, #f0e9e8fb 0%, #0eb9c5 100%);
}
</style>
