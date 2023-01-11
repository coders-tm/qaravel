import { boot } from "quasar/wrappers";
import core from "../services/core";
import { useAppStore } from "stores/app";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store, router }) => {
  const app = useAppStore();
  const msg = "Do you really want to leave? you have unsaved changes!";
  if (process.env.CLIENT) {
    window.addEventListener("beforeunload", function (evt) {
      if (app.isDirt) {
        evt.returnValue = msg;
        return msg;
      }
      return true;
    });
  }
  router.beforeEach((to, from, next) => {
    if (app.isDirt) {
      core
        .confirm(msg, {
          title: "Discard unsaved changes?",
          ok: "Leave page",
          cancel: "Cancel",
          okColor: "negative",
        })
        .then(() => {
          app.setIsDirt(false);
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  });
});
