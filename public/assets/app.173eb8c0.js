import { bt as __vitePreload } from "./index.94c1c68b.js";
var app = [
  {
    path: "/",
    component: () => __vitePreload(() => import("./MainLayout.07f88488.js"), true ? ["assets/MainLayout.07f88488.js","assets/QToolbarTitle.6fb5e67d.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QToolbar.9688c05b.js","assets/QHeader.fa68a155.js","assets/logo.8dc3ac27.js"] : void 0),
    children: [
      {
        path: "",
        name: "Homepage",
        component: () => __vitePreload(() => import("./IndexPage.41b841d1.js"), true ? ["assets/IndexPage.41b841d1.js","assets/QPage.d14d1fc7.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css"] : void 0)
      }
    ]
  },
  {
    path: "/posts",
    component: () => __vitePreload(() => import("./MainLayout.07f88488.js"), true ? ["assets/MainLayout.07f88488.js","assets/QToolbarTitle.6fb5e67d.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QToolbar.9688c05b.js","assets/QHeader.fa68a155.js","assets/logo.8dc3ac27.js"] : void 0),
    children: [
      {
        path: "",
        name: "Posts",
        meta: {
          auth: true,
          guard: "users"
        },
        component: () => __vitePreload(() => import("./IndexPage.bc70d58d.js"), true ? ["assets/IndexPage.bc70d58d.js","assets/QPage.d14d1fc7.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/posts.85f55872.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/app.a880281b.js","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: ":post",
        name: "Post",
        meta: {
          auth: true,
          guard: "users"
        },
        component: () => __vitePreload(() => import("./SinglePostPage.bf65fc24.js"), true ? ["assets/SinglePostPage.bf65fc24.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QSkeleton.9692c295.js","assets/QSpace.a4fd6aed.js","assets/QToolbar.9688c05b.js","assets/QPage.d14d1fc7.js","assets/posts.85f55872.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css"] : void 0)
      }
    ]
  },
  {
    path: "/",
    component: () => __vitePreload(() => import("./AccountLayout.0221c73a.js"), true ? ["assets/AccountLayout.0221c73a.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QPage.d14d1fc7.js","assets/logo.8dc3ac27.js","assets/LayoutDrawer.9c7717c7.js","assets/QToolbarTitle.6fb5e67d.js","assets/QSpace.a4fd6aed.js","assets/QToolbar.9688c05b.js","assets/QHeader.fa68a155.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js","assets/QDrawer.52c6c3cc.js"] : void 0),
    children: [
      {
        path: "my-account",
        name: "My Account",
        meta: {
          auth: true,
          title: "My Account",
          guard: "users"
        },
        component: () => __vitePreload(() => import("./MyAccountPage.0fcc1aaa.js"), true ? ["assets/MyAccountPage.0fcc1aaa.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
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
          guard: "users"
        },
        name: "Login",
        component: () => __vitePreload(() => import("./LoginPage.2ca09db4.js"), true ? ["assets/LoginPage.2ca09db4.js","assets/LoginPage.a0a2e583.css","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: "forgot-password",
        meta: {
          auth: false,
          guard: "users"
        },
        name: "Forget Password",
        component: () => __vitePreload(() => import("./ForgotPasswordPage.091d978c.js"), true ? ["assets/ForgotPasswordPage.091d978c.js","assets/ForgotPasswordPage.eb4cc67b.css","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      },
      {
        path: "reset-password",
        meta: {
          auth: false,
          guard: "users"
        },
        name: "Reset Password",
        component: () => __vitePreload(() => import("./ResetPasswordPage.d963ea99.js"), true ? ["assets/ResetPasswordPage.d963ea99.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  },
  {
    path: "/sign-up",
    component: () => __vitePreload(() => import("./MainLayout.07f88488.js"), true ? ["assets/MainLayout.07f88488.js","assets/QToolbarTitle.6fb5e67d.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QToolbar.9688c05b.js","assets/QHeader.fa68a155.js","assets/logo.8dc3ac27.js"] : void 0),
    children: [
      {
        path: "",
        name: "Sign up",
        meta: {
          auth: false,
          guard: "users"
        },
        component: () => __vitePreload(() => import("./SignUpPage.be3eabb9.js"), true ? ["assets/SignUpPage.be3eabb9.js","assets/index.94c1c68b.js","assets/index.9fd802ac.css","assets/QForm.e37934b9.js","assets/QPage.d14d1fc7.js","assets/app.a880281b.js","assets/api.636d00fa.js","assets/BaseAlert.abd8bfd6.js","assets/BaseAlert.84f44ca4.css","assets/lodash.2b44b28e.js"] : void 0)
      }
    ]
  }
];
export { app as default };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBLElBQWU7QUFBQSxFQUNiO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixXQUFXLDBCQUFNLE9BQU8sNkJBQXdCO0FBQUEsSUFDaEQsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFdBQVcsTUFBSyxvQkFBQyxPQUFPLDRCQUFxQjtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNEO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixXQUFXLDBCQUFNLE9BQU8sNkJBQXdCO0FBQUEsSUFDaEQsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRCxXQUFXLE1BQU0sMkJBQU8sNEJBQTJCO0FBQUEsTUFDcEQ7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0QsV0FBVyxNQUFNLDJCQUFPO01BQ3pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNEO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixXQUFXLE1BQU0sMkJBQU8sZ0NBQTJCO0FBQUEsSUFDbkQsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRCxXQUFXLE1BQUssb0JBQUMsT0FBTyxnQ0FBeUI7QUFBQSxNQUNsRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDRDtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sV0FBVywwQkFBTSxPQUFPLDZCQUF3QjtBQUFBLElBQ2hELFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0QsTUFBTTtBQUFBLFFBQ04sV0FBVyxNQUFLLG9CQUFDLE9BQU87TUFDekI7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0QsTUFBTTtBQUFBLFFBQ04sV0FBVywwQkFBTSxPQUFPO01BQ3pCO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNELE1BQU07QUFBQSxRQUNOLFdBQVcsTUFBTSwyQkFBTztNQUN6QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDRDtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sV0FBVywwQkFBTSxPQUFPLDZCQUF3QjtBQUFBLElBQ2hELFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0QsV0FBVyxNQUFNLDJCQUFPLDZCQUFzQjtBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVyL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBwYXRoOiBcIi9cIixcbiAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcImxheW91dHMvTWFpbkxheW91dC52dWVcIiksXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJcIixcbiAgICAgICAgbmFtZTogXCJIb21lcGFnZVwiLFxuICAgICAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcInBhZ2VzL0luZGV4UGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9wb3N0c1wiLFxuICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwibGF5b3V0cy9NYWluTGF5b3V0LnZ1ZVwiKSxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBwYXRoOiBcIlwiLFxuICAgICAgICBuYW1lOiBcIlBvc3RzXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICAgIGd1YXJkOiBcInVzZXJzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwicGFnZXMvdXNlcnMvSW5kZXhQYWdlLnZ1ZVwiKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiOnBvc3RcIixcbiAgICAgICAgbmFtZTogXCJQb3N0XCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICAgIGd1YXJkOiBcInVzZXJzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwicGFnZXMvdXNlcnMvU2luZ2xlUG9zdFBhZ2UudnVlXCIpLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgcGF0aDogXCIvXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL0FjY291bnRMYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwibXktYWNjb3VudFwiLFxuICAgICAgICBuYW1lOiBcIk15IEFjY291bnRcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgICAgdGl0bGU6IFwiTXkgQWNjb3VudFwiLFxuICAgICAgICAgIGd1YXJkOiBcInVzZXJzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudDogKCkgPT4gaW1wb3J0KFwicGFnZXMvTXlBY2NvdW50UGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9hdXRoXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL0F1dGhMYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwibG9naW5cIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICAgIGd1YXJkOiBcInVzZXJzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IFwiTG9naW5cIixcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9jb3JlL2F1dGgvTG9naW5QYWdlLnZ1ZVwiKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiZm9yZ290LXBhc3N3b3JkXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgICBndWFyZDogXCJ1c2Vyc1wiLFxuICAgICAgICB9LFxuICAgICAgICBuYW1lOiBcIkZvcmdldCBQYXNzd29yZFwiLFxuICAgICAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcInBhZ2VzL2NvcmUvYXV0aC9Gb3Jnb3RQYXNzd29yZFBhZ2UudnVlXCIpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJyZXNldC1wYXNzd29yZFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgICAgZ3VhcmQ6IFwidXNlcnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZTogXCJSZXNldCBQYXNzd29yZFwiLFxuICAgICAgICBjb21wb25lbnQ6ICgpID0+IGltcG9ydChcInBhZ2VzL2NvcmUvYXV0aC9SZXNldFBhc3N3b3JkUGFnZS52dWVcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9zaWduLXVwXCIsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJsYXlvdXRzL01haW5MYXlvdXQudnVlXCIpLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIG5hbWU6IFwiU2lnbiB1cFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgICAgZ3VhcmQ6IFwidXNlcnNcIixcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoXCJwYWdlcy9TaWduVXBQYWdlLnZ1ZVwiKSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iXSwiZmlsZSI6ImFzc2V0cy9hcHAuMTczZWI4YzAuanMifQ==
