export default [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Homepage",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          auth: true,
          guard: "users",
        },
        component: () => import("pages/users/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/AccountLayout.vue"),
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
    component: () => import("layouts/MainLayout.vue"),
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
];
