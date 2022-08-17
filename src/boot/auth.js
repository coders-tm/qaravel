import { boot } from "quasar/wrappers";
import { useAppStore } from "stores/app";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router, store }) => {
  const app = useAppStore();
  router.beforeEach((to, from, next) => {
    const auth = to.meta.auth;
    if (auth) {
      if (app.isAuthenticated) {
        next();
      } else {
        next({ name: "Login", params: { to: to } });
      }
    } else {
      next();
    }
  });
  router.beforeResolve((to, from, next) => {
    const module = to.meta.module;
    if (module) {
      if (module === "Dashboard" && !app.hasPermission(module)) {
        next({ name: "Error 404" });
      } else if (app.hasPermission(module)) {
        next();
      } else {
        next({ name: "Dashboard" });
      }
    } else {
      next();
    }
  });
});
