<template>
  <q-drawer
    ref="drawer"
    v-model="value"
    @update:model-value="(val) => $emit('update:model-value', val)"
    show-if-above
    :width="250"
    side="left"
    class="bg-white text-black"
  >
    <q-toolbar v-if="user && $q.screen.lt.sm" class="q-pa-md">
      <base-current-user-widget
        class="q-pa-none cursor-pointer"
        style="width: 100%"
      />
    </q-toolbar>
    <q-list class="bg-white">
      <links-list
        class="link-item"
        v-for="link in sideMenus"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<script>
import { mapState } from "pinia";
import LinksList from "./LinksList.vue";
import { useAppStore } from "src/stores/app";

export default {
  components: {
    LinksList,
  },
  props: {
    modelValue: {
      required: false,
    },
    sideMenus: {
      required: true,
      type: Array,
    },
  },
  emits: ["update:model-value"],
  data() {
    return {
      value: this.modelValue,
    };
  },
  methods: {
    toggle() {
      this.$refs.drawer.toggle();
    },
  },
  computed: {
    ...mapState(useAppStore, ["user"]),
  },
};
</script>
