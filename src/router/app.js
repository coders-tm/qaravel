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
        component: () => import("pages/app/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/enquiries",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Enquiries",
        meta: {
          auth: true,
          admin: true,
          guard: "users",
          module: "Enquiries",
          base: "Enquiries",
        },
        component: () => import("pages/core/enquiries/EnquiriesPage.vue"),
      },
      {
        path: ":id",
        name: "Single Enquiry",
        meta: {
          auth: true,
          admin: true,
          guard: "users",
          title: "Create Enquiry",
          module: "Enquiries",
          base: "Enquiries",
        },
        component: () => import("pages/core/enquiries/EnquiryPage.vue"),
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
];
