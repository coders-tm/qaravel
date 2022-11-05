<template>
  <q-page padding class="flex flex-center">
    <div class="text-center" style="width: 300px">
      <img style="width: 150px" src="/images/logo.png" />
      <div class="sub-title">
        Qaravel is a Combination of Laravel and Quasar.
      </div>
      <div class="q-pt-sm q-gutter-x-sm">
        <base-btn :href="`http://admin.${app_domain}/`">
          Admin Dashboard
        </base-btn>
        <base-btn :href="`http://app.${app_domain}/`">App Dashboard</base-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    app_domain() {
      return process.env.APP_DOMAIN;
    },
  },
};
</script>
