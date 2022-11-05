<template>
  <q-layout view="hHh LpR lFr" class="bg-main">
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

export default {
  components: { LayoutHeader, LayoutDrawer },
  computed: {
    sideMenus() {
      return [
        {
          title: "Dashboard",
          icon: "fas fa-tachometer-alt",
          route: "Dashboard",
        },
        {
          title: "Tickets",
          icon: "fas fa-square-question",
          route: "Support",
        },
        {
          title: "Members",
          icon: "fas fa-user-tag",
          route: "Members",
        },
        {
          title: "Staff",
          icon: "fas fa-user-shield",
          route: "Staff",
          subLinks: [
            {
              title: "All Staff",
              route: "Staff",
            },
            {
              title: "Groups",
              route: "Groups",
            },
          ],
        },
        {
          title: "Settings",
          icon: "fas fa-gear",
          route: "Settings",
        },
      ];
    },
  },
};
</script>
