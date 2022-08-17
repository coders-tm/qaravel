<template>
  <q-layout view="hHh Lpr fFf">
    <q-header bordered class="base-header bg-white text-black">
      <q-toolbar>
        <q-btn flat round size="15px" color="primary" icon="menu" aria-label="Menu" dense />
        <q-toolbar-title>
          <img class="self-center" width="120" src="~assets/logo.png" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="$router.fullPath" />
    </q-page-container>
  </q-layout>
</template>
