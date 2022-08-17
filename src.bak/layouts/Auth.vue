<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page
        class="row flex-center items-center vertical-middle"
        padding
      >
        <div class="login-container row vertical-middle">
          <div class="login-left col q-pa-xl">
            <div class="row items-center flex-center q-mb-xl">
              <q-icon
                size="md"
                name="fa fa-align-center"
                class="header-icon"
              />
              <img
                src="assets/logo.png"
                transition="fade"
                :alt="app_name"
                class="gm-logo"
              >
            </div>
            <router-view />
          </div>
          <div class="login-right col gt-sm">
            <q-img
              src="assets/login-bg.jpg"
              transition="fade"
              :alt="app_name"
              position="100%"
              height="530px"
            />
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
      get () {
        return process.env.APP_NAME
      },
      set (val) {
        return val
      }
    }
  }
}
</script>

<style lang="sass">
body
  background-color: #e6e6e6

.login-container
  height: 530px
  width: 1000px
  background: #FFF
  box-shadow: 0px 0px 14px -4px rgba(0,0,0,0.2)

.header-icon
  padding-right: 40px
  border-right: 1px solid $dark

.gm-logo
  height: 32px
  margin-left: 20px
</style>
