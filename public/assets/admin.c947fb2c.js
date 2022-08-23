import { bt as __vitePreload } from "./index.94c1c68b.js";
var admin = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => __vitePreload(() => import("./AdminLayout.6738150d.js"), true ? ["assets/AdminLayout.6738150d.js","assets/logo.8dc3ac27.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/LayoutDrawer.9c7717c7.js","assets/QToolbarTitle.6fb5e67d.js","assets/QSpace.a4fd6aed.js","assets/QToolbar.9688c05b.js","assets/QHeader.fa68a155.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js","assets/QDrawer.52c6c3cc.js"] : void 0),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          auth: true,
          admin: true,
          guard: "admins"
        },
        component: () => __vitePreload(() => import("./IndexPage.f6221e24.js"), true ? ["assets/IndexPage.f6221e24.js","assets/QPage.d14d1fc7.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css"] : void 0)
      },
      {
        path: "my-account",
        name: "My Account",
        meta: {
          auth: true,
          admin: true,
          guard: "admins",
          title: "My Account"
        },
        component: () => __vitePreload(() => import("./MyAccountPage.d40089ad.js"), true ? ["assets/MyAccountPage.d40089ad.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/QPage.d14d1fc7.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  },
  {
    path: "/auth",
    component: () => __vitePreload(() => import("./AuthLayout.f43b3c9b.js"), true ? ["assets/AuthLayout.f43b3c9b.js","assets/AuthLayout.ef799aab.css","assets/QPage.d14d1fc7.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/logo.8dc3ac27.js"] : void 0),
    children: [
      {
        path: "login",
        meta: {
          auth: false,
          admin: true,
          guard: "admins"
        },
        name: "Login",
        component: () => __vitePreload(() => import("./LoginPage.2ca09db4.js"), true ? ["assets/LoginPage.2ca09db4.js","assets/LoginPage.a0a2e583.css","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: "forgot-password",
        meta: {
          auth: false,
          admin: true,
          guard: "admins"
        },
        name: "Forget Password",
        component: () => __vitePreload(() => import("./ForgotPasswordPage.091d978c.js"), true ? ["assets/ForgotPasswordPage.091d978c.js","assets/ForgotPasswordPage.eb4cc67b.css","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: "reset-password",
        meta: {
          auth: false,
          admin: true,
          guard: "admins"
        },
        name: "Reset Password",
        component: () => __vitePreload(() => import("./ResetPasswordPage.d963ea99.js"), true ? ["assets/ResetPasswordPage.d963ea99.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  }
];
export { admin as default };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBLElBQWU7QUFBQSxFQUNiO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixXQUFXLDBCQUFNLE9BQU8sOEJBQXlCO0FBQUEsSUFDakQsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRCxXQUFXLE1BQUssb0JBQUMsT0FBTyw0QkFBNEI7QUFBQSxNQUNyRDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRCxXQUFXLE1BQU0sMkJBQU87TUFDekI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0Q7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFdBQVcsMEJBQU0sT0FBTyw2QkFBd0I7QUFBQSxJQUNoRCxVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELE1BQU07QUFBQSxRQUNOLFdBQVcsTUFBSyxvQkFBQyxPQUFPO01BQ3pCO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELE1BQU07QUFBQSxRQUNOLFdBQVcsMEJBQU0sT0FBTztNQUN6QjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRCxNQUFNO0FBQUEsUUFDTixXQUFXLE1BQU0sMkJBQU87TUFDekI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNIIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXIvYWRtaW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgcGF0aDogXCIvXCIsXG4gICAgcmVkaXJlY3Q6IFwiL2Rhc2hib2FyZFwiLFxuICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwibGF5b3V0cy9BZG1pbkxheW91dC52dWVcIiksXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJkYXNoYm9hcmRcIixcbiAgICAgICAgbmFtZTogXCJEYXNoYm9hcmRcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgICAgYWRtaW46IHRydWUsXG4gICAgICAgICAgZ3VhcmQ6IFwiYWRtaW5zXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwicGFnZXMvYWRtaW5zL0luZGV4UGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIm15LWFjY291bnRcIixcbiAgICAgICAgbmFtZTogXCJNeSBBY2NvdW50XCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICAgIGFkbWluOiB0cnVlLFxuICAgICAgICAgIGd1YXJkOiBcImFkbWluc1wiLFxuICAgICAgICAgIHRpdGxlOiBcIk15IEFjY291bnRcIixcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9hZG1pbnMvTXlBY2NvdW50UGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9hdXRoXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL0F1dGhMYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwibG9naW5cIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICAgIGFkbWluOiB0cnVlLFxuICAgICAgICAgIGd1YXJkOiBcImFkbWluc1wiLFxuICAgICAgICB9LFxuICAgICAgICBuYW1lOiBcIkxvZ2luXCIsXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwicGFnZXMvY29yZS9hdXRoL0xvZ2luUGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcImZvcmdvdC1wYXNzd29yZFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgICAgYWRtaW46IHRydWUsXG4gICAgICAgICAgZ3VhcmQ6IFwiYWRtaW5zXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IFwiRm9yZ2V0IFBhc3N3b3JkXCIsXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwicGFnZXMvY29yZS9hdXRoL0ZvcmdvdFBhc3N3b3JkUGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcInJlc2V0LXBhc3N3b3JkXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgICBhZG1pbjogdHJ1ZSxcbiAgICAgICAgICBndWFyZDogXCJhZG1pbnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZTogXCJSZXNldCBQYXNzd29yZFwiLFxuICAgICAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcInBhZ2VzL2NvcmUvYXV0aC9SZXNldFBhc3N3b3JkUGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuIl0sImZpbGUiOiJhc3NldHMvYWRtaW4uYzk0N2ZiMmMuanMifQ==
