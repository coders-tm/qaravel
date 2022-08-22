import { bt as __vitePreload } from "./index.8d5ea4b7.js";
var app = [
  {
    path: "/",
    component: () => __vitePreload(() => import("./MainLayout.43a6f538.js"), true ? ["assets/MainLayout.43a6f538.js","assets/QToolbar.562c56d5.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/QHeader.cc19d22f.js","assets/logo.1c05ebb7.js"] : void 0),
    children: [
      {
        path: "",
        name: "Homepage",
        component: () => __vitePreload(() => import("./IndexPage.abad48e6.js"), true ? ["assets/IndexPage.abad48e6.js","assets/QPage.89ecc816.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/api.ea8a70e6.js","assets/BaseAlert.7b9d1a3e.js","assets/BaseAlert.84f44ca4.css"] : void 0)
      },
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          guard: "users"
        },
        component: () => __vitePreload(() => import("./IndexPage.d3aefa0b.js"), true ? ["assets/IndexPage.d3aefa0b.js","assets/QPage.89ecc816.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css"] : void 0)
      }
    ]
  },
  {
    path: "/",
    component: () => __vitePreload(() => import("./AccountLayout.d6515ba3.js"), true ? ["assets/AccountLayout.d6515ba3.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/QPage.89ecc816.js","assets/logo.1c05ebb7.js","assets/LayoutDrawer.4b6aea49.js","assets/QToolbar.562c56d5.js","assets/QDrawer.9837841e.js","assets/QHeader.cc19d22f.js","assets/app.89142b40.js","assets/api.ea8a70e6.js","assets/BaseAlert.7b9d1a3e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0),
    children: [
      {
        path: "my-account",
        name: "My Account",
        meta: {
          auth: true,
          title: "My Account",
          guard: "users"
        },
        component: () => __vitePreload(() => import("./MyAccountPage.b97f9012.js"), true ? ["assets/MyAccountPage.b97f9012.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/QForm.f020bae8.js","assets/app.89142b40.js","assets/api.ea8a70e6.js","assets/BaseAlert.7b9d1a3e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  },
  {
    path: "/auth",
    component: () => __vitePreload(() => import("./AuthLayout.11db6e94.js"), true ? ["assets/AuthLayout.11db6e94.js","assets/AuthLayout.ef799aab.css","assets/QPage.89ecc816.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/logo.1c05ebb7.js"] : void 0),
    children: [
      {
        path: "login",
        meta: {
          auth: false,
          guard: "users"
        },
        name: "Login",
        component: () => __vitePreload(() => import("./LoginPage.6e974f56.js"), true ? ["assets/LoginPage.6e974f56.js","assets/LoginPage.a0a2e583.css","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/QForm.f020bae8.js","assets/app.89142b40.js","assets/api.ea8a70e6.js","assets/BaseAlert.7b9d1a3e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: "forgot-password",
        meta: {
          auth: false,
          guard: "users"
        },
        name: "Forget Password",
        component: () => __vitePreload(() => import("./ForgotPasswordPage.440e1de6.js"), true ? ["assets/ForgotPasswordPage.440e1de6.js","assets/ForgotPasswordPage.eb4cc67b.css","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/QForm.f020bae8.js","assets/app.89142b40.js","assets/api.ea8a70e6.js","assets/BaseAlert.7b9d1a3e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: "reset-password",
        meta: {
          auth: false,
          guard: "users"
        },
        name: "Reset Password",
        component: () => __vitePreload(() => import("./ResetPasswordPage.89787b7f.js"), true ? ["assets/ResetPasswordPage.89787b7f.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/QForm.f020bae8.js","assets/app.89142b40.js","assets/api.ea8a70e6.js","assets/BaseAlert.7b9d1a3e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  },
  {
    path: "/sign-up",
    component: () => __vitePreload(() => import("./MainLayout.43a6f538.js"), true ? ["assets/MainLayout.43a6f538.js","assets/QToolbar.562c56d5.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/QHeader.cc19d22f.js","assets/logo.1c05ebb7.js"] : void 0),
    children: [
      {
        path: "",
        name: "Sign up",
        meta: {
          auth: false,
          guard: "users"
        },
        component: () => __vitePreload(() => import("./SignUpPage.0581fdf4.js"), true ? ["assets/SignUpPage.0581fdf4.js","assets/index.8d5ea4b7.js","assets/index.aa5d9cca.css","assets/QForm.f020bae8.js","assets/QPage.89ecc816.js","assets/app.89142b40.js","assets/api.ea8a70e6.js","assets/BaseAlert.7b9d1a3e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  }
];
export { app as default };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBLElBQWU7QUFBQSxFQUNiO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixXQUFXLDBCQUFNLE9BQU8sNkJBQXdCO0FBQUEsSUFDaEQsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFdBQVcsTUFBSyxvQkFBQyxPQUFPLDRCQUFxQjtBQUFBLE1BQzlDO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBRUosT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELFdBQVcsTUFBTSwyQkFBTyw0QkFBMkI7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDRDtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sV0FBVyxNQUFNLDJCQUFPLGdDQUEyQjtBQUFBLElBQ25ELFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0QsV0FBVyxNQUFLLG9CQUFDLE9BQU8sZ0NBQXlCO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0Q7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFdBQVcsMEJBQU0sT0FBTyw2QkFBd0I7QUFBQSxJQUNoRCxVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELE1BQU07QUFBQSxRQUNOLFdBQVcsTUFBSyxvQkFBQyxPQUFPO01BQ3pCO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELE1BQU07QUFBQSxRQUNOLFdBQVcsMEJBQU0sT0FBTztNQUN6QjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRCxNQUFNO0FBQUEsUUFDTixXQUFXLE1BQU0sMkJBQU87TUFDekI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0Q7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFdBQVcsMEJBQU0sT0FBTyw2QkFBd0I7QUFBQSxJQUNoRCxVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELFdBQVcsTUFBTSwyQkFBTyw2QkFBc0I7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0giLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlci9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgcGF0aDogXCIvXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL01haW5MYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIG5hbWU6IFwiSG9tZXBhZ2VcIixcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9JbmRleFBhZ2UudnVlXCIpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJkYXNoYm9hcmRcIixcbiAgICAgICAgbmFtZTogXCJEYXNoYm9hcmRcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIC8vIGF1dGg6IHRydWUsXG4gICAgICAgICAgZ3VhcmQ6IFwidXNlcnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy91c2Vycy9JbmRleFBhZ2UudnVlXCIpLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgcGF0aDogXCIvXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL0FjY291bnRMYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwibXktYWNjb3VudFwiLFxuICAgICAgICBuYW1lOiBcIk15IEFjY291bnRcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgICAgdGl0bGU6IFwiTXkgQWNjb3VudFwiLFxuICAgICAgICAgIGd1YXJkOiBcInVzZXJzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwicGFnZXMvTXlBY2NvdW50UGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9hdXRoXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL0F1dGhMYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwibG9naW5cIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICAgIGd1YXJkOiBcInVzZXJzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IFwiTG9naW5cIixcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9jb3JlL2F1dGgvTG9naW5QYWdlLnZ1ZVwiKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiZm9yZ290LXBhc3N3b3JkXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgICBndWFyZDogXCJ1c2Vyc1wiLFxuICAgICAgICB9LFxuICAgICAgICBuYW1lOiBcIkZvcmdldCBQYXNzd29yZFwiLFxuICAgICAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcInBhZ2VzL2NvcmUvYXV0aC9Gb3Jnb3RQYXNzd29yZFBhZ2UudnVlXCIpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJyZXNldC1wYXNzd29yZFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgICAgZ3VhcmQ6IFwidXNlcnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZTogXCJSZXNldCBQYXNzd29yZFwiLFxuICAgICAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcInBhZ2VzL2NvcmUvYXV0aC9SZXNldFBhc3N3b3JkUGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9zaWduLXVwXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL01haW5MYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIG5hbWU6IFwiU2lnbiB1cFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgICAgZ3VhcmQ6IFwidXNlcnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9TaWduVXBQYWdlLnZ1ZVwiKSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iXSwiZmlsZSI6ImFzc2V0cy9hcHAuYjQ3NDZhMjYuanMifQ==
