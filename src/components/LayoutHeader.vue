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
      <template v-if="isDirt">
        <q-toolbar-title>Unsaved changes</q-toolbar-title>
        <q-btn
          no-caps
          @click="onDiscard"
          label="Discard"
          color="negative"
          class="q-mr-sm"
        />
        <q-btn
          no-caps
          label="Save"
          @click="onSave"
          type="submit"
          color="primary"
          :loading="isLoading"
        />
      </template>
      <template v-else>
        <q-toolbar-title>
          <img class="self-center" width="120" src="~assets/logo.png" />
        </q-toolbar-title>
        <q-space v-if="$q.screen.gt.xs" />
        <div class="row no-wrap q-col-gutter-md">
          <div v-if="user" class="column self-center">
            <base-current-user
              class="q-pa-none cursor-pointer"
              style="width: 180px"
            />
          </div>
        </div>
      </template>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "stores/app";

export default {
  emits: ["update-left-drawer"],
  methods: {
    onUpdateLeftDrawer() {
      this.$emit("update-left-drawer");
    },
    onSave() {
      console.func("layouts/Dashboard:methods.onSave()", arguments);
      window.dispatchEvent(new Event("form:save"));
    },
    onDiscard() {
      console.func("layouts/Dashboard:methods.onDiscard()", arguments);
      window.dispatchEvent(new Event("form:discard"));
    },
  },
  computed: {
    ...mapState(useAppStore, ["user", "isDirt", "isLoading"]),
  },
};
</script>
