<template>
  <router-view />
</template>
<script>
import { createMetaMixin } from "quasar";

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
      this.title = to.name;
    },
  },
  computed: {
    title: {
      get() {
        return this.$route.name;
      },
      set(val) {
        return val;
      },
    },
  },
};
</script>
