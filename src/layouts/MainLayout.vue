<template>
  <q-layout view="hHh Lpr fFf">
    <q-header bordered class="base-header bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <router-link :to="{ name: 'Homepage' }">
            <img class="self-center" width="120" src="~assets/logo.png" />
          </router-link>
        </q-toolbar-title>
        <q-btn no-caps color="primary" :to="{ name: 'Posts' }" label="Posts" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="$router.fullPath" />
    </q-page-container>
  </q-layout>
</template>
