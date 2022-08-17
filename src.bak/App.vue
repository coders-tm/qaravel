<template>

  <router-view />

</template>

<script>
import { mapActions } from "pinia";
import { useAppStore } from "stores/app";
import { QSpinnerCube, createMetaMixin } from "quasar";

export default {
  mixins: [
    createMetaMixin(function() {
      // "this" here refers to your component
      return {
        // sets document title
        title: this.title,
        // optional; sets final title as "Index Page - My Website", useful for multiple level meta
        titleTemplate: title => `${title} | ${process.env.APP_NAME}`,

        // <noscript> tags
        noscript: {
          default: "This is content for browsers with no JS (or disabled JS)"
        }
      };
    })
  ],
  methods: {
    ...mapActions(useAppStore, ["currentUser"]),
    onReady() {
      this.$q.loading.show({
        spinner: QSpinnerCube,
        spinnerColor: "primary",
        spinnerSize: 80,
        backgroundColor: "white"
      });
      this.currentUser()
        .then(async () => {
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
          this.$router.push({ name: "Login" });
        });
    }
  },
  mounted() {
    if (this.$route.meta.auth) {
      this.onReady();
    }
  },
  watch: {
    $route(to, from) {
      this.title = to.name;
      if (!from.meta.auth && to.meta.auth) {
        this.onReady();
      }
    }
  },
  computed: {
    title: {
      get() {
        return this.$route.name;
      },
      set(val) {
        return val;
      }
    }
  }
};
</script>

