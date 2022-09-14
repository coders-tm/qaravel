export default [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
        },
        component: () => import("pages/admins/IndexPage.vue"),
      },
      {
        path: "my-account",
        name: "My Account",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          title: "My Account",
        },
        component: () => import("pages/admins/MyAccountPage.vue"),
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
          admin: true,
          guard: "admins",
        },
        name: "Login",
        component: () => import("pages/core/auth/LoginPage.vue"),
      },
      {
        path: "forgot-password",
        meta: {
          auth: false,
          admin: true,
          guard: "admins",
        },
        name: "Forget Password",
        component: () => import("pages/core/auth/ForgotPasswordPage.vue"),
      },
      {
        path: "reset-password",
        meta: {
          auth: false,
          admin: true,
          guard: "admins",
        },
        name: "Reset Password",
        component: () => import("pages/core/auth/ResetPasswordPage.vue"),
      },
    ],
  },
  {
    path: "/staff",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Staff",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          base: "Staff",
          module: "Staff",
        },
        component: () => import("pages/core/staffs/StaffsPage.vue"),
      },
      {
        path: ":id",
        name: "Single Staff",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          base: "Staff",
          module: "Staff",
        },
        component: () => import("pages/core/staffs/StaffPage.vue"),
      },
    ],
  },
  {
    path: "/groups",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Groups",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          base: "Staff",
          module: "Groups",
        },
        component: () => import("pages/core/groups/GroupsPage.vue"),
      },
      {
        path: ":id",
        name: "Single Group",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          base: "Staff",
          module: "Groups",
        },
        component: () => import("pages/core/groups/GroupPage.vue"),
      },
    ],
  },
  {
    path: "/members",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Members",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Members",
        },
        component: () => import("pages/admins/members/MembersPage.vue"),
      },
      {
        path: ":id",
        name: "Single Member",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Members",
        },
        component: () => import("pages/admins/members/MemberPage.vue"),
      },
    ],
  },
];
