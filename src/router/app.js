export default [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          auth: true,
          guard: "users",
        },
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/support",
    component: () => import("src/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Support",
        meta: {
          auth: true,
          admin: true,
          guard: "users",
          module: "Support",
          title: "Messages",
          base: "Support",
        },
        component: () => import("pages/core/supports/SupportsPage.vue"),
      },
      {
        path: ":id",
        name: "Single Support",
        meta: {
          auth: true,
          admin: true,
          guard: "users",
          title: "Create Message",
          module: "Support",
          base: "Support",
        },
        component: () => import("pages/core/supports/SupportPage.vue"),
      },
    ],
  },
  {
    path: "/classes",
    redirect: "/classes/bookable",
    component: () => import("src/layouts/AppLayout.vue"),
    children: [
      {
        path: "bookable",
        name: "Bookable",
        meta: {
          auth: true,
          admin: true,
          guard: "users",
          title: "Bookable Classes",
          module: "Bookable",
          base: "Classes",
        },
        component: () => import("pages/users/BookablePage.vue"),
      },
      {
        path: "booked",
        name: "Classes",
        meta: {
          auth: true,
          admin: true,
          guard: "users",
          title: "Booked Classes",
          module: "Classes",
          base: "Classes",
        },
        component: () => import("pages/users/ClassSchedulesPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "my-account",
        name: "My Account",
        meta: {
          auth: true,
          title: "My Account",
          guard: "users",
        },
        component: () => import("pages/MyAccountPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        meta: {
          auth: false,
          guard: "users",
        },
        name: "Login",
        component: () => import("pages/core/auth/LoginPage.vue"),
      },
      {
        path: "forgot-password",
        meta: {
          auth: false,
          guard: "users",
        },
        name: "Forget Password",
        component: () => import("pages/core/auth/ForgotPasswordPage.vue"),
      },
      {
        path: "reset-password",
        meta: {
          auth: false,
          guard: "users",
        },
        name: "Reset Password",
        component: () => import("pages/core/auth/ResetPasswordPage.vue"),
      },
    ],
  },
  {
    path: "/sign-up",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "Sign up",
        meta: {
          auth: false,
          guard: "users",
        },
        component: () => import("pages/SignUpPage.vue"),
      },
    ],
  },
  {
    path: "/class-schedules",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "",
        name: "Class Schedules",
        meta: {
          auth: false,
        },
        component: () => import("pages/public/ClassScheduleCalendarPage.vue"),
      },
    ],
  },
];
