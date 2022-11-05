export default [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
];
