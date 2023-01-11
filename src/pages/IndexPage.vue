<template>
  <q-page padding class="flex flex-center">
    <div class="text-center" style="width: 300px">
      <img style="width: 150px" src="/images/logo.png" />
      <div class="sub-title">
        Qaravel is a Combination of Laravel and Quasar.
      </div>
      <div class="q-pt-sm q-gutter-x-sm">
        <base-btn :href="adminLink"> Admin Dashboard </base-btn>
        <base-btn :href="appLink">App Dashboard</base-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    adminLink() {
      return this.origin.replace(this.hostname, `admin.${this.appDomain}`);
    },
    appLink() {
      return this.origin.replace(this.hostname, `app.${this.appDomain}`);
    },
    appDomain() {
      return process.env.APP_DOMAIN;
    },
    origin() {
      return window.location.origin;
    },
    hostname() {
      return window.location.hostname;
    },
  },
};
</script>
