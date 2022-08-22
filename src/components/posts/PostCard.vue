<template>
  <q-card class="post-card">
    <q-card-section>
      <router-link :to="{ name: 'Post', params: { post: id } }">
        <div class="text-h6 ellipsis">{{ title }}</div>
      </router-link>
      <div class="text-subtitle2">{{ created_at }}</div>
      <div class="text-subtitle2">{{ user.name }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="ellipsis-2-lines" v-html="description"></div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    created_at: String,
    title: String,
    description: String,
    user: Object,
  },
};
</script>
