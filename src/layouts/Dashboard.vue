<template>
  <q-layout view="LHr lpR lfr" class="bg-grey-3">
    <q-header class="bg-white shadow-2 text-primary">
      <q-toolbar style="height:70px">
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          @click="miniState = !miniState; miniMode = !miniMode; leftDrawer = true"
        />
        <q-toolbar-title class="row no-wrap">
          <img @click="$router.push({ name: 'Dashboard' })" class="self-center lt-md" width="120px" src="assets/logo.png" />
        </q-toolbar-title>
        <q-space />
        <template>
          <div class="row no-wrap q-col-gutter-md">
            <div class="column self-center">
              <q-btn dense round flat icon="notifications">
                <q-badge color="red" text-color="white" floating>2</q-badge>
                <q-menu
                  auto-close
                  square
                  max-width="width: 400px; max-width:95vw"
                  :offset="[10, 0]">
                  <q-list style="width: 400px; max-width:95vw">
                    <q-item-section header class="text-white text-bolder bg-grey q-pl-md q-pa-sm">
                      You have 4 messages
                    </q-item-section>
                    <notification v-for="item in notifications" :key="item.id" :notification="item" />
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
            <div v-if="user" class="column self-center">
              <q-item class="q-pa-none cursor-pointer">
                <q-item-section class="q-pa-none q-mr-xs" avatar style="min-width:auto">
                  <avatar size="30px" :user="user"/>
                </q-item-section>
                <q-item-section class="gt-sm q-pa-none">{{user.name}}</q-item-section>
                <q-item-section side class="gt-sm q-pa-none" style="padding: 0"><q-icon name="expand_more"></q-icon></q-item-section>
                <q-menu
                  auto-close
                  square
                  :offset="[10, 0]">
                  <q-list style="width: 200px">
                    <q-item clickable>
                      <q-item-section style="min-width:auto" avatar>
                        <q-icon color="primary" name="edit" size="xs" />
                      </q-item-section>
                      <q-item-section class="q-pl-none">Edit Profile</q-item-section>
                    </q-item>
                    <q-separator/>
                    <q-item clickable>
                      <q-item-section style="min-width:auto" avatar>
                        <q-icon color="primary" name="lock" size="xs" />
                      </q-item-section>
                      <q-item-section class="q-pl-none">Change Password</q-item-section>
                    </q-item>
                    <q-separator/>
                    <q-item @click="onLogout" clickable>
                      <q-item-section style="min-width:auto" avatar>
                        <q-icon color="primary" name="exit_to_app" size="xs" />
                      </q-item-section>
                      <q-item-section class="q-pl-none">Logout</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
            </div>
          </div>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawer"
      :mini="miniState"
      @mouseover="mouseOver"
      @mouseout="mouseOver"
      show-if-above bordered :width="250" side="left" content-class="bg-secondary text-white"
    >
      <div @click="$router.push({ name: 'Dashboard' })" class="bg-dark cursor-pointer full-width row wrap justify-center logo q-pa-sm" style="min-height: 70px">
        <img class="logo-full self-center" width="150px" src="assets/logo-alt.png" />
        <img class="logo-min self-center" width="150px" src="assets/icon-alt.png" />
      </div>
      <q-list>
        <links
          v-for="link in sideLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-transparent text-grey">
      <q-toolbar style="height: 70px">
          <div class="text-body q-mr-md">Copyright © 2020 | <b>{{appName}}.</b></div>
          <q-space class="gt-xs"></q-space>
          <div class="text-body">Powered by <a href="/">CodersTM</a></div>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      leftDrawer: false,
      miniState: false,
      miniMode: false,
      sideLinks: [
        {
          title: 'Dashboard',
          icon: 'home',
          route: 'Dashboard'
        },
        {
          title: 'Users',
          icon: 'group',
          route: 'Users'
        }
      ],
      appName: process.env.APP_NAME
    }
  },
  methods: {
    ...mapActions('app', ['Logout']),
    mouseOver () {
      if (this.miniMode) {
        this.miniState = !this.miniState
      }
    },
    onLogout () {
      this.Logout().then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.app.user
      },
      set (val) {
        this.$store.commit('app/currentUser', val)
      }
    },
    notifications: {
      get () {
        return this.$store.state.app.notifications
      },
      set (val) {
        this.$store.commit('app/updateNotifications', val)
      }
    }
  }
}
</script>
<style lang="scss">
  .q-drawer--mini .logo img {
    width: 100%;
  }
</style>
