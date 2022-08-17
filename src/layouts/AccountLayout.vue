<template>
  <q-layout view="hHh Lpr fFf" class="bg-main">
    <layout-header @update-left-drawer="$refs.layoutDrawer.toggle()" />

    <layout-drawer ref="layoutDrawer" />

    <q-page-container>
      <q-page padding>
        <div class="text-h5 q-mb-md">{{ $route.meta.title }}</div>
        <div class="row q-col-gutter-lg">
          <div class="col-sm-3 col-xs-12">
            <q-card>
              <q-card-section class="text-center">
                <base-avatar-widget size="100px" :user="user" />
                <div class="text-h6 text-weight-medium q-mb-lg">{{ user.name }}</div>
                <div>Member Since {{ user.member_since }}</div>
                <div>{{ user.email }}</div>
                <div>{{ user.phone_number }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-sm-9 col-xs-12">
            <router-view :key="$router.fullPath" />

            <base-btn
              @click="onLogout"
              style="width: 150px"
              class="q-mt-lg main-btn"
              color="primary"
              label="Logout"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import LinksList from 'components/LinksList.vue';
import LayoutHeader from 'components/LayoutHeader.vue';
import LayoutDrawer from 'components/LayoutDrawer.vue';
import { mapActions, mapState } from 'pinia';
import { useAppStore } from 'stores/app';

export default {
  components: { LinksList, LayoutHeader, LayoutDrawer },

  methods: {
    ...mapActions(useAppStore, ['logout']),
    onLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
  computed: {
    ...mapState(useAppStore, ['user']),
  },
};
</script>
