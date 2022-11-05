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
      {
        path: "settings",
        name: "Settings",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          title: "Settings",
        },
        component: () => import("pages/admins/SettingsPage.vue"),
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
          base: "Members",
        },
        component: () => import("pages/admins/members/MembersPage.vue"),
      },
      {
        path: "reports",
        name: "Reports",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Members",
          base: "Members",
        },
        component: () => import("pages/admins/members/ReportsPage.vue"),
      },
      {
        path: ":id",
        name: "Single Member",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Members",
          base: "Members",
        },
        component: () => import("pages/admins/members/MemberPage.vue"),
      },
    ],
  },
  {
    path: "/enquiry",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Enquiry",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Enquiry",
          base: "Members",
        },
        component: () => import("pages/admins/members/EnquiryPage.vue"),
      },
    ],
  },
  {
    path: "/instructors",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Instructors",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Instructors",
        },
        component: () => import("pages/admins/instructors/InstructorsPage.vue"),
      },
      {
        path: ":id",
        name: "Single Instructor",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Instructors",
        },
        component: () => import("pages/admins/instructors/InstructorPage.vue"),
      },
    ],
  },
  {
    path: "/classes",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Classes",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Classes",
          base: "Classes",
        },
        component: () => import("pages/admins/class-lists/ClassesPage.vue"),
      },
      {
        path: ":id",
        name: "Single Class",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Classes",
          base: "Classes",
        },
        component: () => import("pages/admins/class-lists/ClassPage.vue"),
      },
    ],
  },
  {
    path: "/support",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Support",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Support",
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
          guard: "admins",
          module: "Support",
          base: "Support",
        },
        component: () => import("pages/core/supports/SupportPage.vue"),
      },
    ],
  },
  {
    path: "/class-schedules",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Class Schedules",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Class Schedules",
          base: "Classes",
        },
        component: () => import("pages/admins/ClassSchedulesPage.vue"),
      },
    ],
  },
  {
    path: "/announcements",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Announcements",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Announcements",
        },
        component: () =>
          import("pages/admins/announcements/AnnouncementsPage.vue"),
      },
      {
        path: ":id",
        name: "Single Announcement",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Announcements",
        },
        component: () =>
          import("pages/admins/announcements/AnnouncementPage.vue"),
      },
    ],
  },
  {
    path: "/locations",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Locations",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Locations",
          base: "Classes",
        },
        component: () => import("pages/admins/locations/LocationsPage.vue"),
      },
      {
        path: ":id",
        name: "Single Location",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Locations",
          base: "Classes",
        },
        component: () => import("pages/admins/locations/LocationPage.vue"),
      },
    ],
  },
  {
    path: "/templates",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Templates",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Templates",
          base: "Classes",
        },
        component: () => import("pages/admins/templates/TemplatesPage.vue"),
      },
      {
        path: ":id",
        name: "Single Template",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Templates",
          base: "Classes",
        },
        component: () => import("pages/admins/templates/TemplatePage.vue"),
      },
    ],
  },
  {
    path: "/finance",
    redirect: "/finance/admin",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "admin",
        name: "Finance Admin",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Finance",
          base: "Finance Admin",
        },
        component: () => import("pages/admins/finance/AdminPage.vue"),
      },
      {
        path: "membership",
        name: "Finance Membership",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Finance",
          base: "Finance Admin",
        },
        component: () => import("pages/admins/finance/MembershipPage.vue"),
      },
      {
        path: "type",
        name: "Finance Type",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Finance",
          base: "Finance Admin",
        },
        component: () => import("pages/admins/finance/TypePage.vue"),
      },
    ],
  },
  {
    path: "/plans",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Plans",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Plans",
          base: "Finance Admin",
        },
        component: () => import("pages/admins/plans/PlansPage.vue"),
      },
      {
        path: ":id",
        name: "Single Plan",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Plans",
          base: "Finance Admin",
        },
        component: () => import("pages/admins/plans/PlanPage.vue"),
      },
    ],
  },
  {
    path: "/offers",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Offers",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Offers",
        },
        component: () => import("pages/admins/offers/OffersPage.vue"),
      },
      {
        path: ":id",
        name: "Single Offer",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Offers",
        },
        component: () => import("pages/admins/offers/OfferPage.vue"),
      },
    ],
  },
  {
    path: "/registrations",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Registrations",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Registrations",
        },
        component: () =>
          import("pages/admins/registrations/RegistrationsPage.vue"),
      },
      {
        path: ":id",
        name: "Single Registration",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          module: "Registrations",
        },
        component: () =>
          import("pages/admins/registrations/RegistrationPage.vue"),
      },
    ],
  },
];
