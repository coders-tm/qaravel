export default async function () {
  var routes = [];
  const host = window.location.host;
  const parts = host.split(".");
  const route = process.env.APP_MODE ? process.env.APP_MODE : parts[0];

  try {
    switch (route) {
      case "admin":
        routes = await import("./admin");
        routes = routes.default ? routes.default : [];
        break;

      case "app":
        routes = await import("./app");
        routes = routes.default ? routes.default : [];
        break;

      default:
        routes = await import("./public");
        routes = routes.default ? routes.default : [];
    }
  } catch (error) {
    console.log("Routes Error", error);
    routes = [];
  }

  // Always leave this as last one,
  // but you can also remove it
  routes.push({
    path: "/:catchAll(.*)*",
    name: "Error 404",
    component: () => import("pages/ErrorNotFound.vue"),
  });

  return routes;
}
