<template>
  <div class="base-current-user base-user">
    <q-item class="user-info">
      <q-item-section class="q-pa-none q-mr-sm" avatar style="min-width: auto">
        <base-avatar size="28px" :user="user" />
      </q-item-section>
      <q-item-section class="gt-sm q-pa-none">
        <q-item-label class="text-subtitle2">{{ user.name }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
};
</script>
