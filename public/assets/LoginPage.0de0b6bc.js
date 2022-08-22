import { _ as _export_sfc, bC as mapActions, bd as resolveComponent, X as createElementBlock, d as createVNode, V as withCtx, W as createBaseVNode, S as openBlock, aK as QInput, a5 as QIcon, bb as QCheckbox, a2 as QBtn, Y as createCommentVNode, a6 as createTextVNode } from "./index.38989ee5.js";
import { Q as QForm } from "./QForm.d7022362.js";
import { u as useAppStore } from "./app.c721dd8d.js";
import "./api.7a924254.js";
import "./BaseAlert.bfd34481.js";
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
        this.$router.push({ name: "Dashboard" });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5QYWdlLjBkZTBiNmJjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvY29yZS9hdXRoL0xvZ2luUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtY2VudGVyIHEtbWIteGxcIj5BY2NvdW50IExvZ2luPC9kaXY+XG4gICAgPHEtZm9ybSByZWY9XCJsb2dpbkZvcm1cIiBAc3VibWl0PVwib25TdWJtaXRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5FbWFpbDwvZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLmVtYWlsXCJcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgcmVmPVwiZW1haWxcIlxuICAgICAgICAgIGJvdHRvbS1zbG90c1xuICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiJ2VtYWlsJyBpbiBlcnJvcnMgPyBlcnJvcnMuZW1haWwuam9pbignLCAnKSA6ICcnXCJcbiAgICAgICAgICA6ZXJyb3I9XCInZW1haWwnIGluIGVycm9yc1wiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPlBhc3N3b3JkPC9kaXY+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgYm90dG9tLXNsb3RzXG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiXG4gICAgICAgICAgICAncGFzc3dvcmQnIGluIGVycm9ycyA/IGVycm9ycy5wYXNzd29yZC5qb2luKCcsICcpIDogJydcbiAgICAgICAgICBcIlxuICAgICAgICAgIDplcnJvcj1cIidwYXNzd29yZCcgaW4gZXJyb3JzXCJcbiAgICAgICAgICB2LW1vZGVsPVwiZm9ybS5wYXNzd29yZFwiXG4gICAgICAgICAgOnR5cGU9XCJpc1B3ZCA/ICdwYXNzd29yZCcgOiAndGV4dCdcIlxuICAgICAgICAgIGNsYXNzPVwicGFzc3dvcmRcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkID0gIWlzUHdkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmNvdW50ZXI+XG4gICAgICAgICAgICA8YmFzZS1idG5cbiAgICAgICAgICAgICAgc2l6ZT1cIjExcHhcIlxuICAgICAgICAgICAgICBjb2xvcj1cImdyZXlcIlxuICAgICAgICAgICAgICA6dG89XCJ7IG5hbWU6ICdGb3JnZXQgUGFzc3dvcmQnIH1cIlxuICAgICAgICAgICAgICBsaW5rXG4gICAgICAgICAgICAgIHR5cGU9XCJhXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJGb3Jnb3R0ZW4gcGFzc3dvcmQ/XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLWlucHV0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtbWItc20gY29sXCI+XG4gICAgICAgIDxxLWNoZWNrYm94IGRlbnNlIHYtbW9kZWw9XCJmb3JtLnJlbWVtYmVyXCIgbGFiZWw9XCJSZW1lbWJlciBtZT9cIiAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxxLWJ0blxuICAgICAgICA6bG9hZGluZz1cInZpc2libGVcIlxuICAgICAgICBsYWJlbD1cIkxvZ2luXCJcbiAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcbiAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxuICAgICAgICBhbGlnbj1cImNlbnRlclwiXG4gICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICBuby1jYXBzXG4gICAgICAvPlxuICAgICAgPGRpdiB2LWlmPVwiISRyb3V0ZS5tZXRhLmFkbWluXCIgY2xhc3M9XCJxLW10LW1kIHRleHQtY2VudGVyXCI+XG4gICAgICAgIERvbuKAmXQgaGF2ZSBhbiBhY2NvdW50P1xuICAgICAgICA8YmFzZS1idG4gOnRvPVwieyBuYW1lOiAnU2lnbiB1cCcgfVwiIGxpbmsgdHlwZT1cImFcIiBsYWJlbD1cIlNpZ24gdXBcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWZvcm0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEFjdGlvbnMgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IHVzZUFwcFN0b3JlIH0gZnJvbSBcInN0b3Jlcy9hcHBcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmb3JtOiB7XG4gICAgICAgIGVtYWlsOiBcInVzZXJAZXhhbXBsZS5jb21cIixcbiAgICAgICAgcGFzc3dvcmQ6IFwicGFzc3dvcmRcIixcbiAgICAgICAgcmVtZW1iZXI6IGZhbHNlLFxuICAgICAgICBndWFyZDogdGhpcy4kcm91dGUubWV0YS5ndWFyZCxcbiAgICAgIH0sXG4gICAgICBpc1B3ZDogdHJ1ZSxcbiAgICAgIGVycm9yczoge30sXG4gICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgLi4ubWFwQWN0aW9ucyh1c2VBcHBTdG9yZSwgW1wibG9naW5cIl0pLFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5lcnJvcnMgPSB7fTtcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICBjb25zb2xlLmZ1bmMoXCJwYWdlcy9sb2dpbi9Mb2dpblBhZ2U6bWV0aG9kcy5vblN1Ym1pdCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLmxvZ2luKHRoaXMuZm9ybSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goeyBuYW1lOiBcIkRhc2hib2FyZFwiIH0pO1xuICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGVycm9yLmVycm9ycykge1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvci5lcnJvcnM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGNvcmUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbi5wYXNzd29yZCB7XG4gICYucS1maWVsZC0td2l0aC1ib3R0b20ge1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICB9XG4gIC5xLWZpZWxkX19ib3R0b20ge1xuICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICBhbGlnbi1pdGVtczogc2VsZi1zdGFydDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLnEtZmllbGRfX21lc3NhZ2VzIHtcbiAgICAgIHBhZGRpbmctdG9wOiA1cHg7XG4gICAgfVxuICAgIC5xLWZpZWxkX19jb3VudGVyIHtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlRWxlbWVudEJsb2Nr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
