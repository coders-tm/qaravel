<template>
  <q-card class="post-card">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
      <div class="text-subtitle2">{{ user.name }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none" v-html="description" />
  </q-card>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    user: Object,
  },
};
</script>
