<template>
  <q-layout view="hHh Lpr fFf" class="bg-main">
    <layout-header @update-left-drawer="$refs.layoutDrawer.toggle()" />

    <layout-drawer ref="layoutDrawer" />

    <q-page-container>
      <router-view :key="$router.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import LayoutHeader from 'components/LayoutHeader.vue';
import LayoutDrawer from 'components/LayoutDrawer.vue';

export default {
  components: { LayoutHeader, LayoutDrawer },
};
</script>
