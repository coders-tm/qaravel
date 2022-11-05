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
          title: "Members",
          icon: "fas fa-user-tag",
          route: "Members",
          subLinks: [
            {
              title: "All Members",
              route: "Members",
            },
            {
              title: "Enquiry",
              route: "Enquiry",
            },
            {
              title: "Reports",
              route: "Reports",
            },
          ],
        },
        {
          title: "Finance",
          icon: "fas fa-coins",
          route: "Finance Admin",
          subLinks: [
            {
              title: "Admin",
              route: "Finance Admin",
            },
            {
              title: "Membership",
              route: "Finance Membership",
            },
            {
              title: "Type",
              route: "Finance Type",
            },
            {
              title: "Plans",
              route: "Plans",
            },
          ],
        },
        {
          title: "Classes",
          icon: "fas fa-book-sparkles",
          route: "Classes",
          subLinks: [
            {
              title: "All Classes",
              route: "Classes",
            },
            {
              title: "Templates",
              route: "Templates",
            },
            {
              title: "Week Schedules",
              route: "Class Schedules",
            },
            {
              title: "Locations",
              route: "Locations",
            },
          ],
        },
        {
          title: "Instructors",
          icon: "fas fa-chalkboard-user",
          route: "Instructors",
        },
        {
          title: "Registrations",
          icon: "fas fa-calendar-circle-user",
          route: "Registrations",
        },
        {
          title: "Announcements",
          icon: "fas fa-bullhorn",
          route: "Announcements",
        },
        {
          title: "Offers",
          icon: "fas fa-gifts",
          route: "Offers",
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
