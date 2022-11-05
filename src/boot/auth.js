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
        app.currentUser(to.meta.guard).catch((error) => {
          router.push({ name: "Login", query: { redirect: to.fullPath } });
        });
      } else {
        next({ name: "Login", query: { redirect: to.fullPath } });
      }
    } else {
      next();
    }
  });
  router.beforeResolve((to, from, next) => {
    // const module = to.meta.module;
    const module = false;
    if (module) {
      if (app.hasPermission(module)) {
        next();
      } else {
        next({ name: "Dashboard" });
      }
    } else {
      next();
    }
  });
});
