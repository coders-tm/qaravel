<template>
  <q-layout view="hHh Lpr fFf" class="bg-main">
    <layout-header @update-left-drawer="$refs.layoutDrawer.toggle()" />

    <layout-drawer
      class="admin-side-links"
      ref="layoutDrawer"
      :side-menus="sideMenus"
    />

    <q-page-container>
      <router-view :key="$router.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import LayoutHeader from "components/LayoutHeader.vue";
import LayoutDrawer from "components/LayoutDrawer.vue";
import { mapState } from "pinia";
import { useAppStore } from "stores/app";

export default {
  components: { LayoutHeader, LayoutDrawer },
  computed: {
    ...mapState(useAppStore, ["statistics"]),
    sideMenus() {
      return [
        {
          title: "Dashboard",
          icon: "fas fa-tachometer-alt",
          route: "Dashboard",
        },
        {
          title: "Posts",
          icon: "fas fa-tag",
          route: "Posts",
        },
      ];
    },
  },
};
</script>
