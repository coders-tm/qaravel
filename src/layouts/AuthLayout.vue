<template>
  <q-layout view="hHh Lpr fFf" class="bg-main">
    <q-page-container>
      <q-page class="row flex-center items-center vertical-middle" padding>
        <div class="login-container row vertical-middle">
          <div class="login-left col q-pa-xl">
            <div class="row items-center flex-center">
              <img
                style="width: 150px"
                src="~assets/logo.png"
                transition="fade"
                :alt="app_name"
                class="gm-logo"
              />
            </div>
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  computed: {
    app_name: {
      get() {
        return process.env.APP_NAME;
      },
      set(val) {
        return val;
      },
    },
  },
};
</script>

<style lang="scss">
.login-container {
  width: 400px;
  background: #ffffff;
  box-shadow: 0px 8px 24px rgba(153, 153, 153, 0.15);
  border-radius: 20px;
}
</style>
