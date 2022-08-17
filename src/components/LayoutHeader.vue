<template>
  <q-header bordered class="base-header bg-white text-black">
    <q-toolbar>
      <q-btn
        flat
        round
        size="15px"
        color="primary"
        icon="menu"
        aria-label="Menu"
        dense
        @click="onUpdateLeftDrawer"
      />
      <q-toolbar-title>
        <img class="self-center" width="120" src="~assets/logo.png" />
      </q-toolbar-title>
      <q-space />
      <div class="row no-wrap q-col-gutter-md">
        <div v-if="user" class="column self-center">
          <base-current-user-widget class="q-pa-none cursor-pointer" style="width: 180px" />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from 'pinia';
import { useAppStore } from 'stores/app';

export default {
  emits: ['update-left-drawer'],
  methods: {
    onUpdateLeftDrawer() {
      this.$emit('update-left-drawer');
    },
  },
  computed: {
    ...mapState(useAppStore, ['user']),
  },
};
</script>
