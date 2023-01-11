<template>
  <router-view />
</template>
<script>
import { createMetaMixin } from "quasar";
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";

let deferredPrompt;
let dismiss;

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
    onInstallApp() {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(({ outcome }) => {
        dismiss();
        // Act on the user's choice
        if (outcome === "accepted") {
          console.log("User accepted the install prompt.");
        } else if (outcome === "dismissed") {
          console.log("User dismissed the install prompt");
        }
      });
    },
  },
  computed: {
    ...mapState(useAppStore, ["title"]),
  },
  mounted() {
    this.setTitle(getTitle(this.$route));
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you'll need to trigger it later.
      deferredPrompt = e;
      // Show your customized install prompt for your PWA
      // Your own UI doesn't have to be a single element, you
      // can have buttons in different locations, or wait to prompt
      // as part of a critical journey.
      dismiss = this.$q.notify({
        message: "Install Qaravel?",
        color: "grey",
        avatar: "/images/icon.png",
        timeout: 0,
        actions: [
          {
            label: "Yes",
            color: "yellow",
            noDismiss: true,
            noCaps: true,
            handler: this.onInstallApp,
          },
          {
            label: "Dismiss",
            color: "white",
            noCaps: true,
            handler: () => {},
          },
        ],
      });
    });
  },
};
</script>
