<template>
  <q-expansion-item
    v-if="subLinks"
    v-model="active"
    :icon="icon"
    :label="title"
    expand-icon-class="hidden"
    class="sublinks"
    :header-class="{
      'sublink-active': active,
    }"
    :to="{ name: route }"
  >
    <q-item
      v-for="(item, index) in subLinks"
      :key="index"
      clickable
      tag="a"
      :to="{ name: item.route, params: item.params }"
      v-ripple
      active-class="active"
      exact
    >
      <q-item-section avatar style="min-width: auto" class="q-pr-md">
        <q-icon :name="item.icon" size="18px"></q-icon>
      </q-item-section>

      <q-item-section class="title">
        <q-item-label>{{ item.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
  <q-item
    v-else
    clickable
    tag="a"
    :to="{ name: route, params: params }"
    v-ripple
    active-class="active"
  >
    <q-item-section avatar style="min-width: auto" class="q-pr-md">
      <q-icon :name="icon" size="18px"></q-icon>
    </q-item-section>

    <q-item-section class="title">
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="notification" side class="notification">
      <q-btn
        size="10px"
        flat
        class="bg-primary text-bold"
        color="white"
        :label="notification"
        round
        dense
      />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      default: "",
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    icon: {
      type: String,
      default: "",
    },
    notification: [String, Number],
    subLinks: {
      type: [Object, Boolean],
      default: false,
    },
  },
  computed: {
    active: {
      get() {
        return this.$route.meta.base === this.route;
      },
      set(val) {
        return val;
      },
    },
  },
  methods: {
    isActive(item) {
      return (
        item.route === this.$route.meta.module ||
        item.route === this.$route.meta.premission ||
        item.route === this.$route.name
      );
    },
  },
};
</script>
