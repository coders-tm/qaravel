<template>
  <q-page padding class="flex flex-center">
    <div class="row" style="width: 300px">
      <div class="text-h5">Dashboard</div>
      <div class="sub-title">
        This page is blank, content is currently being developed.
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  async created() {
    this.$storage.set("name", "Dipak Sarkar");
    const value = await this.$storage.get("name");
    console.log(`Hello, ${value}!`);
  },
};
</script>
