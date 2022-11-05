<template>
  <div class="base-current-user-widget">
    <q-item class="user-info">
      <q-item-section class="q-pa-none q-mr-sm" avatar style="min-width: auto">
        <base-avatar-widget size="28px" :user="user" />
      </q-item-section>
      <q-item-section class="q-pa-none">
        <q-item-label class="ellipsis text-subtitle2">{{
          user.name
        }}</q-item-label>
      </q-item-section>
      <q-item-section side class="q-pa-none" style="padding: 0">
        <q-icon color="white" name="fal fa-angle-down"></q-icon>
      </q-item-section>
    </q-item>
    <q-list class="menus q-pa-sm" style="min-width: 150px">
      <base-item
        icon-color="primary"
        link
        label="My Account"
        :to="{ name: 'My Account' }"
        icon="fal fa-user"
      />
      <base-item
        icon-color="primary"
        link
        label="Logout"
        icon="fal fa-sign-out"
        @click="onLogout"
      />
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";

export default {
  methods: {
    ...mapActions(useAppStore, ["logout"]),
    onLogout() {
      this.logout(this.$route.meta.guard)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          // this.$core.error(error);
          this.$router.push({ name: "Login" });
        });
    },
  },
  computed: {
    ...mapState(useAppStore, ["user"]),
  },
};
</script>
