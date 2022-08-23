import { _ as _export_sfc, bC as mapActions, bd as resolveComponent, X as createElementBlock, d as createVNode, V as withCtx, W as createBaseVNode, S as openBlock, aK as QInput, a5 as QIcon, bb as QCheckbox, a2 as QBtn, Y as createCommentVNode, a6 as createTextVNode } from "./index.fb242601.js";
import { Q as QForm } from "./QForm.256cb651.js";
import { u as useAppStore } from "./app.44106148.js";
import "./api.b3e7b694.js";
import "./BaseAlert.d7479406.js";
import "./lodash.2b44b28e.js";
var LoginPage_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  data() {
    return {
      form: {
        email: "user@example.com",
        password: "password",
        remember: false,
        guard: this.$route.meta.guard
      },
      isPwd: true,
      errors: {},
      visible: false
    };
  },
  methods: {
    ...mapActions(useAppStore, ["login"]),
    onSubmit() {
      this.errors = {};
      this.visible = true;
      console.func("pages/login/LoginPage:methods.onSubmit()", arguments);
      this.login(this.form).then((response) => {
        this.$router.push({ name: "Homepage" });
        this.visible = false;
      }).catch((error) => {
        this.visible = false;
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.$core.error(error.message);
        }
      });
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6 text-center q-mb-xl" }, "Account Login", -1);
const _hoisted_2 = { class: "col" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Email", -1);
const _hoisted_4 = { class: "col" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Password", -1);
const _hoisted_6 = { class: "q-mt-lg q-mb-sm col" };
const _hoisted_7 = {
  key: 0,
  class: "q-mt-md text-center"
};
const _hoisted_8 = /* @__PURE__ */ createTextVNode(" Don\u2019t have an account? ");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_base_btn = resolveComponent("base-btn");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createVNode(QForm, {
      ref: "loginForm",
      onSubmit: $options.onSubmit
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          createVNode(QInput, {
            modelValue: $data.form.email,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.email = $event),
            outlined: "",
            dense: "",
            ref: "email",
            "bottom-slots": "",
            "error-message": "email" in $data.errors ? $data.errors.email.join(", ") : "",
            error: "email" in $data.errors
          }, null, 8, ["modelValue", "error-message", "error"])
        ]),
        createBaseVNode("div", _hoisted_4, [
          _hoisted_5,
          createVNode(QInput, {
            "bottom-slots": "",
            outlined: "",
            dense: "",
            "error-message": "password" in $data.errors ? $data.errors.password.join(", ") : "",
            error: "password" in $data.errors,
            modelValue: $data.form.password,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.form.password = $event),
            type: $data.isPwd ? "password" : "text",
            class: "password"
          }, {
            append: withCtx(() => [
              createVNode(QIcon, {
                name: $data.isPwd ? "visibility_off" : "visibility",
                class: "cursor-pointer",
                onClick: _cache[1] || (_cache[1] = ($event) => $data.isPwd = !$data.isPwd)
              }, null, 8, ["name"])
            ]),
            counter: withCtx(() => [
              createVNode(_component_base_btn, {
                size: "11px",
                color: "grey",
                to: { name: "Forget Password" },
                link: "",
                type: "a",
                label: "Forgotten password?"
              })
            ]),
            _: 1
          }, 8, ["error-message", "error", "modelValue", "type"])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createVNode(QCheckbox, {
            dense: "",
            modelValue: $data.form.remember,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.form.remember = $event),
            label: "Remember me?"
          }, null, 8, ["modelValue"])
        ]),
        createVNode(QBtn, {
          loading: $data.visible,
          label: "Login",
          class: "full-width",
          color: "secondary",
          align: "center",
          type: "submit",
          "no-caps": ""
        }, null, 8, ["loading"]),
        !_ctx.$route.meta.admin ? (openBlock(), createElementBlock("div", _hoisted_7, [
          _hoisted_8,
          createVNode(_component_base_btn, {
            to: { name: "Sign up" },
            link: "",
            type: "a",
            label: "Sign up"
          })
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["onSubmit"])
  ]);
}
var LoginPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "LoginPage.vue"]]);
export { LoginPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5QYWdlLmIxYTg4MDI5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvY29yZS9hdXRoL0xvZ2luUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtY2VudGVyIHEtbWIteGxcIj5BY2NvdW50IExvZ2luPC9kaXY+XG4gICAgPHEtZm9ybSByZWY9XCJsb2dpbkZvcm1cIiBAc3VibWl0PVwib25TdWJtaXRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5FbWFpbDwvZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLmVtYWlsXCJcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgcmVmPVwiZW1haWxcIlxuICAgICAgICAgIGJvdHRvbS1zbG90c1xuICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiJ2VtYWlsJyBpbiBlcnJvcnMgPyBlcnJvcnMuZW1haWwuam9pbignLCAnKSA6ICcnXCJcbiAgICAgICAgICA6ZXJyb3I9XCInZW1haWwnIGluIGVycm9yc1wiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPlBhc3N3b3JkPC9kaXY+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgYm90dG9tLXNsb3RzXG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiXG4gICAgICAgICAgICAncGFzc3dvcmQnIGluIGVycm9ycyA/IGVycm9ycy5wYXNzd29yZC5qb2luKCcsICcpIDogJydcbiAgICAgICAgICBcIlxuICAgICAgICAgIDplcnJvcj1cIidwYXNzd29yZCcgaW4gZXJyb3JzXCJcbiAgICAgICAgICB2LW1vZGVsPVwiZm9ybS5wYXNzd29yZFwiXG4gICAgICAgICAgOnR5cGU9XCJpc1B3ZCA/ICdwYXNzd29yZCcgOiAndGV4dCdcIlxuICAgICAgICAgIGNsYXNzPVwicGFzc3dvcmRcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkID0gIWlzUHdkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmNvdW50ZXI+XG4gICAgICAgICAgICA8YmFzZS1idG5cbiAgICAgICAgICAgICAgc2l6ZT1cIjExcHhcIlxuICAgICAgICAgICAgICBjb2xvcj1cImdyZXlcIlxuICAgICAgICAgICAgICA6dG89XCJ7IG5hbWU6ICdGb3JnZXQgUGFzc3dvcmQnIH1cIlxuICAgICAgICAgICAgICBsaW5rXG4gICAgICAgICAgICAgIHR5cGU9XCJhXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJGb3Jnb3R0ZW4gcGFzc3dvcmQ/XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLWlucHV0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtbWItc20gY29sXCI+XG4gICAgICAgIDxxLWNoZWNrYm94IGRlbnNlIHYtbW9kZWw9XCJmb3JtLnJlbWVtYmVyXCIgbGFiZWw9XCJSZW1lbWJlciBtZT9cIiAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxxLWJ0blxuICAgICAgICA6bG9hZGluZz1cInZpc2libGVcIlxuICAgICAgICBsYWJlbD1cIkxvZ2luXCJcbiAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcbiAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxuICAgICAgICBhbGlnbj1cImNlbnRlclwiXG4gICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICBuby1jYXBzXG4gICAgICAvPlxuICAgICAgPGRpdiB2LWlmPVwiISRyb3V0ZS5tZXRhLmFkbWluXCIgY2xhc3M9XCJxLW10LW1kIHRleHQtY2VudGVyXCI+XG4gICAgICAgIERvbuKAmXQgaGF2ZSBhbiBhY2NvdW50P1xuICAgICAgICA8YmFzZS1idG4gOnRvPVwieyBuYW1lOiAnU2lnbiB1cCcgfVwiIGxpbmsgdHlwZT1cImFcIiBsYWJlbD1cIlNpZ24gdXBcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWZvcm0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEFjdGlvbnMgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IHVzZUFwcFN0b3JlIH0gZnJvbSBcInN0b3Jlcy9hcHBcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmb3JtOiB7XG4gICAgICAgIGVtYWlsOiBcInVzZXJAZXhhbXBsZS5jb21cIixcbiAgICAgICAgcGFzc3dvcmQ6IFwicGFzc3dvcmRcIixcbiAgICAgICAgcmVtZW1iZXI6IGZhbHNlLFxuICAgICAgICBndWFyZDogdGhpcy4kcm91dGUubWV0YS5ndWFyZCxcbiAgICAgIH0sXG4gICAgICBpc1B3ZDogdHJ1ZSxcbiAgICAgIGVycm9yczoge30sXG4gICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgLi4ubWFwQWN0aW9ucyh1c2VBcHBTdG9yZSwgW1wibG9naW5cIl0pLFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5lcnJvcnMgPSB7fTtcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICBjb25zb2xlLmZ1bmMoXCJwYWdlcy9sb2dpbi9Mb2dpblBhZ2U6bWV0aG9kcy5vblN1Ym1pdCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLmxvZ2luKHRoaXMuZm9ybSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goeyBuYW1lOiBcIkhvbWVwYWdlXCIgfSk7XG4gICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoZXJyb3IuZXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9yLmVycm9ycztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kY29yZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLnBhc3N3b3JkIHtcbiAgJi5xLWZpZWxkLS13aXRoLWJvdHRvbSB7XG4gICAgcGFkZGluZy1ib3R0b206IDA7XG4gIH1cbiAgLnEtZmllbGRfX2JvdHRvbSB7XG4gICAgZGlzcGxheTogaW5saW5lO1xuICAgIGFsaWduLWl0ZW1zOiBzZWxmLXN0YXJ0O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAucS1maWVsZF9fbWVzc2FnZXMge1xuICAgICAgcGFkZGluZy10b3A6IDVweDtcbiAgICB9XG4gICAgLnEtZmllbGRfX2NvdW50ZXIge1xuICAgICAgcGFkZGluZzogMDtcbiAgICB9XG4gIH1cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2si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
