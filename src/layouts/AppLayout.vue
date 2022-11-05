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
          title: "Messages",
          icon: "fas fa-message-quote",
          route: "Support",
        },
        {
          title: "Classes",
          icon: "fas fa-book-sparkles",
          route: "Classes",
          subLinks: [
            {
              title: "Booked",
              route: "Classes",
            },
            {
              title: "Bookable",
              route: "Bookable",
            },
          ],
        },
      ];
    },
  },
};
</script>
