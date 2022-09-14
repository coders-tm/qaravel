<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
let deferredPrompt;
let dismiss;
export default defineComponent({
  name: "App",
  methods: {
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
  mounted() {
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
        message: "Install qaravel?",
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
});
</script>
