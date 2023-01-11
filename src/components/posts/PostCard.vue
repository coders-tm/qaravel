<template>
  <q-card
    :class="{
      'post-card': true,
      'bg-red-1': isOffline,
    }"
  >
    <q-card-section>
      <template v-if="isOffline">
        <div class="text-h6 ellipsis">{{ title }}</div>
      </template>
      <template v-else>
        <router-link :to="{ name: 'Single Post', params: { post: id } }">
          <div class="text-h6 ellipsis">{{ title }}</div>
        </router-link>
      </template>
      <div v-if="created_at" class="text-subtitle2">{{ created_at }}</div>
      <div v-if="user" class="text-subtitle2">{{ user.name }}</div>
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
    isOffline: Boolean,
  },
};
</script>
