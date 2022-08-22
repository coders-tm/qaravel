import { bt as __vitePreload } from "./index.b4c42063.js";
var app = [
  {
    path: "/",
    component: () => __vitePreload(() => import("./MainLayout.30a32422.js"), true ? ["assets/MainLayout.30a32422.js","assets/QToolbar.c240042e.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/QHeader.f1f85346.js","assets/logo.422851b2.js"] : void 0),
    children: [
      {
        path: "",
        name: "Homepage",
        component: () => __vitePreload(() => import("./IndexPage.3237dbe1.js"), true ? ["assets/IndexPage.3237dbe1.js","assets/QPage.6c9ffb08.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css"] : void 0)
      },
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          guard: "users"
        },
        component: () => __vitePreload(() => import("./IndexPage.0fb3546f.js"), true ? ["assets/IndexPage.0fb3546f.js","assets/QPage.6c9ffb08.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/api.0d7418d9.js","assets/BaseAlert.c811579e.js","assets/BaseAlert.84f44ca4.css"] : void 0)
      }
    ]
  },
  {
    path: "/",
    component: () => __vitePreload(() => import("./AccountLayout.aa66f01a.js"), true ? ["assets/AccountLayout.aa66f01a.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/QPage.6c9ffb08.js","assets/logo.422851b2.js","assets/LayoutDrawer.1635c4a1.js","assets/QToolbar.c240042e.js","assets/QDrawer.5f2d86d9.js","assets/QHeader.f1f85346.js","assets/app.d97044fa.js","assets/api.0d7418d9.js","assets/BaseAlert.c811579e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0),
    children: [
      {
        path: "my-account",
        name: "My Account",
        meta: {
          auth: true,
          title: "My Account",
          guard: "users"
        },
        component: () => __vitePreload(() => import("./MyAccountPage.dfefbae7.js"), true ? ["assets/MyAccountPage.dfefbae7.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/QForm.a5948230.js","assets/app.d97044fa.js","assets/api.0d7418d9.js","assets/BaseAlert.c811579e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  },
  {
    path: "/auth",
    component: () => __vitePreload(() => import("./AuthLayout.3b85fa24.js"), true ? ["assets/AuthLayout.3b85fa24.js","assets/AuthLayout.ef799aab.css","assets/QPage.6c9ffb08.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/logo.422851b2.js"] : void 0),
    children: [
      {
        path: "login",
        meta: {
          auth: false,
          guard: "users"
        },
        name: "Login",
        component: () => __vitePreload(() => import("./LoginPage.cf7c050a.js"), true ? ["assets/LoginPage.cf7c050a.js","assets/LoginPage.a0a2e583.css","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/QForm.a5948230.js","assets/app.d97044fa.js","assets/api.0d7418d9.js","assets/BaseAlert.c811579e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: "forgot-password",
        meta: {
          auth: false,
          guard: "users"
        },
        name: "Forget Password",
        component: () => __vitePreload(() => import("./ForgotPasswordPage.9a29e37f.js"), true ? ["assets/ForgotPasswordPage.9a29e37f.js","assets/ForgotPasswordPage.eb4cc67b.css","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/QForm.a5948230.js","assets/app.d97044fa.js","assets/api.0d7418d9.js","assets/BaseAlert.c811579e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: "reset-password",
        meta: {
          auth: false,
          guard: "users"
        },
        name: "Reset Password",
        component: () => __vitePreload(() => import("./ResetPasswordPage.11c89c2c.js"), true ? ["assets/ResetPasswordPage.11c89c2c.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/QForm.a5948230.js","assets/app.d97044fa.js","assets/api.0d7418d9.js","assets/BaseAlert.c811579e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  },
  {
    path: "/sign-up",
    component: () => __vitePreload(() => import("./MainLayout.30a32422.js"), true ? ["assets/MainLayout.30a32422.js","assets/QToolbar.c240042e.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/QHeader.f1f85346.js","assets/logo.422851b2.js"] : void 0),
    children: [
      {
        path: "",
        name: "Sign up",
        meta: {
          auth: false,
          guard: "users"
        },
        component: () => __vitePreload(() => import("./SignUpPage.d9410a8c.js"), true ? ["assets/SignUpPage.d9410a8c.js","assets/index.b4c42063.js","assets/index.aa5d9cca.css","assets/QForm.a5948230.js","assets/QPage.6c9ffb08.js","assets/app.d97044fa.js","assets/api.0d7418d9.js","assets/BaseAlert.c811579e.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  }
];
export { app as default };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBLElBQWU7QUFBQSxFQUNiO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixXQUFXLDBCQUFNLE9BQU8sNkJBQXdCO0FBQUEsSUFDaEQsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFdBQVcsTUFBSyxvQkFBQyxPQUFPLDRCQUFxQjtBQUFBLE1BQzlDO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBRUosT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELFdBQVcsTUFBTSwyQkFBTyw0QkFBMkI7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDRDtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sV0FBVyxNQUFNLDJCQUFPLGdDQUEyQjtBQUFBLElBQ25ELFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0QsV0FBVyxNQUFLLG9CQUFDLE9BQU8sZ0NBQXlCO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0Q7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFdBQVcsMEJBQU0sT0FBTyw2QkFBd0I7QUFBQSxJQUNoRCxVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELE1BQU07QUFBQSxRQUNOLFdBQVcsTUFBSyxvQkFBQyxPQUFPO01BQ3pCO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELE1BQU07QUFBQSxRQUNOLFdBQVcsMEJBQU0sT0FBTztNQUN6QjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRCxNQUFNO0FBQUEsUUFDTixXQUFXLE1BQU0sMkJBQU87TUFDekI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0Q7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFdBQVcsMEJBQU0sT0FBTyw2QkFBd0I7QUFBQSxJQUNoRCxVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELFdBQVcsTUFBTSwyQkFBTyw2QkFBc0I7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0giLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlci9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgcGF0aDogXCIvXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL01haW5MYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIG5hbWU6IFwiSG9tZXBhZ2VcIixcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9JbmRleFBhZ2UudnVlXCIpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJkYXNoYm9hcmRcIixcbiAgICAgICAgbmFtZTogXCJEYXNoYm9hcmRcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIC8vIGF1dGg6IHRydWUsXG4gICAgICAgICAgZ3VhcmQ6IFwidXNlcnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy91c2Vycy9JbmRleFBhZ2UudnVlXCIpLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgcGF0aDogXCIvXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL0FjY291bnRMYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwibXktYWNjb3VudFwiLFxuICAgICAgICBuYW1lOiBcIk15IEFjY291bnRcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgICAgdGl0bGU6IFwiTXkgQWNjb3VudFwiLFxuICAgICAgICAgIGd1YXJkOiBcInVzZXJzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwicGFnZXMvTXlBY2NvdW50UGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9hdXRoXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL0F1dGhMYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwibG9naW5cIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICAgIGd1YXJkOiBcInVzZXJzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IFwiTG9naW5cIixcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9jb3JlL2F1dGgvTG9naW5QYWdlLnZ1ZVwiKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiZm9yZ290LXBhc3N3b3JkXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgICBndWFyZDogXCJ1c2Vyc1wiLFxuICAgICAgICB9LFxuICAgICAgICBuYW1lOiBcIkZvcmdldCBQYXNzd29yZFwiLFxuICAgICAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcInBhZ2VzL2NvcmUvYXV0aC9Gb3Jnb3RQYXNzd29yZFBhZ2UudnVlXCIpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJyZXNldC1wYXNzd29yZFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgICAgZ3VhcmQ6IFwidXNlcnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZTogXCJSZXNldCBQYXNzd29yZFwiLFxuICAgICAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcInBhZ2VzL2NvcmUvYXV0aC9SZXNldFBhc3N3b3JkUGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9zaWduLXVwXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL01haW5MYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIG5hbWU6IFwiU2lnbiB1cFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgICAgZ3VhcmQ6IFwidXNlcnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9TaWduVXBQYWdlLnZ1ZVwiKSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iXSwiZmlsZSI6ImFzc2V0cy9hcHAuYWViZDY3MmQuanMifQ==
