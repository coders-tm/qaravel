<template>
  <router-view />
</template>
<script>
import { createMetaMixin } from "quasar";
import { mapActions, mapState } from "pinia";
import { useAppStore } from "./stores/app";

const getTitle = (route) =>
  route.params.title || route.meta.title || route.name;

export default {
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {
        // sets document title
        title: this.title,
        // optional; sets final title as "Index Page - My Website", useful for multiple level meta
        titleTemplate: (title) => `${title} | ${process.env.APP_NAME}`,

        // <noscript> tags
        noscript: {
          default: "This is content for browsers with no JS (or disabled JS)",
        },
      };
    }),
  ],
  watch: {
    $route(to, from) {
      this.setTitle(getTitle(to));
    },
  },
  methods: {
    ...mapActions(useAppStore, ["setTitle"]),
  },
  computed: {
    ...mapState(useAppStore, ["title"]),
  },
  mounted() {
    this.setTitle(getTitle(this.$route));
  },
};
</script>
