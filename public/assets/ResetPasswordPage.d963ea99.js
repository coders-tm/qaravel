import { _ as _export_sfc, bC as mapActions, X as createElementBlock, d as createVNode, V as withCtx, W as createBaseVNode, S as openBlock, aK as QInput, a5 as QIcon, a2 as QBtn } from "./index.94c1c68b.js";
import { Q as QForm } from "./QForm.e37934b9.js";
import { u as useAppStore } from "./app.a880281b.js";
import "./api.636d00fa.js";
import "./BaseAlert.abd8bfd6.js";
import "./lodash.2b44b28e.js";
const _sfc_main = {
  data() {
    return {
      form: {
        password: "",
        password_confirmation: "",
        guard: this.$route.meta.guard
      },
      errors: {},
      visible: false,
      isPwd1: true,
      isPwd2: true
    };
  },
  methods: {
    ...mapActions(useAppStore, ["resetPassword"]),
    onSubmit() {
      console.func("pages/auth/ResetPasswordPage:methods.onSubmit()", arguments);
      this.onReset();
      this.resetPassword(this.form).then((response) => {
        this.visible = false;
        this.$router.push({ name: "Login" });
        this.$core.success(response.message);
      }).catch((error) => {
        this.visible = false;
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.$core.error(error.message);
        }
      });
    },
    onReset() {
      this.errors = {};
      this.visible = true;
    }
  },
  created() {
    this.form.token = this.$route.query.token;
    this.form.email = this.$route.query.email;
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6 text-center" }, "Reset Password.", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("p", { class: "text-center q-mb-lg" }, "Please set your new password below.", -1);
const _hoisted_3 = { class: "col" };
const _hoisted_4 = { class: "col q-mb-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    createVNode(QForm, {
      ref: "restPasswordForm",
      onSubmit: $options.onSubmit
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_3, [
          createVNode(QInput, {
            outlined: "",
            dense: "",
            placeholder: "Password",
            modelValue: $data.form.password,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.password = $event),
            "error-message": "password" in $data.errors ? $data.errors.password.join(", ") : "",
            error: "password" in $data.errors,
            type: $data.isPwd1 ? "password" : "text"
          }, {
            append: withCtx(() => [
              createVNode(QIcon, {
                name: $data.isPwd1 ? "visibility_off" : "visibility",
                class: "cursor-pointer",
                onClick: _cache[0] || (_cache[0] = ($event) => $data.isPwd1 = !$data.isPwd1)
              }, null, 8, ["name"])
            ]),
            _: 1
          }, 8, ["modelValue", "error-message", "error", "type"])
        ]),
        createBaseVNode("div", _hoisted_4, [
          createVNode(QInput, {
            outlined: "",
            dense: "",
            placeholder: "Password Confirm",
            modelValue: $data.form.password_confirmation,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.form.password_confirmation = $event),
            "error-message": "password_confirmation" in $data.errors ? $data.errors.password_confirmation.join(", ") : "",
            error: "password_confirmation" in $data.errors,
            type: $data.isPwd2 ? "password" : "text"
          }, {
            append: withCtx(() => [
              createVNode(QIcon, {
                name: $data.isPwd2 ? "visibility_off" : "visibility",
                class: "cursor-pointer",
                onClick: _cache[2] || (_cache[2] = ($event) => $data.isPwd2 = !$data.isPwd2)
              }, null, 8, ["name"])
            ]),
            _: 1
          }, 8, ["modelValue", "error-message", "error", "type"])
        ]),
        createVNode(QBtn, {
          loading: $data.visible,
          "no-caps": "",
          label: "Submit",
          class: "full-width",
          color: "primary",
          align: "center",
          type: "submit"
        }, null, 8, ["loading"]),
        createVNode(QBtn, {
          "no-caps": "",
          label: "Go Back",
          class: "q-mt-sm full-width",
          color: "negative",
          align: "center",
          flat: "",
          to: { name: "Login" }
        })
      ]),
      _: 1
    }, 8, ["onSubmit"])
  ]);
}
var ResetPasswordPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ResetPasswordPage.vue"]]);
export { ResetPasswordPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzZXRQYXNzd29yZFBhZ2UuZDk2M2VhOTkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9jb3JlL2F1dGgvUmVzZXRQYXNzd29yZFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiB0ZXh0LWNlbnRlclwiPlJlc2V0IFBhc3N3b3JkLjwvZGl2PlxuICAgIDxwIGNsYXNzPVwidGV4dC1jZW50ZXIgcS1tYi1sZ1wiPlBsZWFzZSBzZXQgeW91ciBuZXcgcGFzc3dvcmQgYmVsb3cuPC9wPlxuICAgIDxxLWZvcm0gcmVmPVwicmVzdFBhc3N3b3JkRm9ybVwiIEBzdWJtaXQ9XCJvblN1Ym1pdFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCJcbiAgICAgICAgICB2LW1vZGVsPVwiZm9ybS5wYXNzd29yZFwiXG4gICAgICAgICAgOmVycm9yLW1lc3NhZ2U9XCIncGFzc3dvcmQnIGluIGVycm9ycyA/IGVycm9ycy5wYXNzd29yZC5qb2luKCcsICcpIDogJydcIlxuICAgICAgICAgIDplcnJvcj1cIidwYXNzd29yZCcgaW4gZXJyb3JzXCJcbiAgICAgICAgICA6dHlwZT1cImlzUHdkMSA/ICdwYXNzd29yZCcgOiAndGV4dCdcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2QxID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5J1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJpc1B3ZDEgPSAhaXNQd2QxXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLWlucHV0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgcS1tYi1tZFwiPlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkIENvbmZpcm1cIlxuICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLnBhc3N3b3JkX2NvbmZpcm1hdGlvblwiXG4gICAgICAgICAgOmVycm9yLW1lc3NhZ2U9XCJcbiAgICAgICAgICAgICdwYXNzd29yZF9jb25maXJtYXRpb24nIGluIGVycm9ycyA/IGVycm9ycy5wYXNzd29yZF9jb25maXJtYXRpb24uam9pbignLCAnKSA6ICcnXG4gICAgICAgICAgXCJcbiAgICAgICAgICA6ZXJyb3I9XCIncGFzc3dvcmRfY29uZmlybWF0aW9uJyBpbiBlcnJvcnNcIlxuICAgICAgICAgIDp0eXBlPVwiaXNQd2QyID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0J1wiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgICAgOm5hbWU9XCJpc1B3ZDIgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkMiA9ICFpc1B3ZDJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHEtYnRuXG4gICAgICAgIDpsb2FkaW5nPVwidmlzaWJsZVwiXG4gICAgICAgIG5vLWNhcHNcbiAgICAgICAgbGFiZWw9XCJTdWJtaXRcIlxuICAgICAgICBjbGFzcz1cImZ1bGwtd2lkdGhcIlxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICBhbGlnbj1cImNlbnRlclwiXG4gICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgLz5cbiAgICAgIDxxLWJ0blxuICAgICAgICBuby1jYXBzXG4gICAgICAgIGxhYmVsPVwiR28gQmFja1wiXG4gICAgICAgIGNsYXNzPVwicS1tdC1zbSBmdWxsLXdpZHRoXCJcbiAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgIGFsaWduPVwiY2VudGVyXCJcbiAgICAgICAgZmxhdFxuICAgICAgICA6dG89XCJ7IG5hbWU6ICdMb2dpbicgfVwiXG4gICAgICAvPlxuICAgIDwvcS1mb3JtPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBtYXBBY3Rpb25zIH0gZnJvbSAncGluaWEnO1xuaW1wb3J0IHsgdXNlQXBwU3RvcmUgfSBmcm9tICdzdG9yZXMvYXBwJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmb3JtOiB7XG4gICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOiAnJyxcbiAgICAgICAgZ3VhcmQ6IHRoaXMuJHJvdXRlLm1ldGEuZ3VhcmQsXG4gICAgICB9LFxuICAgICAgZXJyb3JzOiB7fSxcbiAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgaXNQd2QxOiB0cnVlLFxuICAgICAgaXNQd2QyOiB0cnVlLFxuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBBY3Rpb25zKHVzZUFwcFN0b3JlLCBbJ3Jlc2V0UGFzc3dvcmQnXSksXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ3BhZ2VzL2F1dGgvUmVzZXRQYXNzd29yZFBhZ2U6bWV0aG9kcy5vblN1Ym1pdCgpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMub25SZXNldCgpO1xuICAgICAgdGhpcy5yZXNldFBhc3N3b3JkKHRoaXMuZm9ybSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goeyBuYW1lOiAnTG9naW4nIH0pO1xuICAgICAgICAgIHRoaXMuJGNvcmUuc3VjY2VzcyhyZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChlcnJvci5lcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3IuZXJyb3JzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvblJlc2V0KCkge1xuICAgICAgdGhpcy5lcnJvcnMgPSB7fTtcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLmZvcm0udG9rZW4gPSB0aGlzLiRyb3V0ZS5xdWVyeS50b2tlbjtcbiAgICB0aGlzLmZvcm0uZW1haWwgPSB0aGlzLiRyb3V0ZS5xdWVyeS5lbWFpbDtcbiAgfSxcbn07XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBeUVBLE1BQUssWUFBVTtBQUFBLEVBQ2IsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQSxRQUNKLFVBQVU7QUFBQSxRQUNWLHVCQUF1QjtBQUFBLFFBQ3ZCLE9BQU8sS0FBSyxPQUFPLEtBQUs7QUFBQSxNQUN6QjtBQUFBLE1BQ0QsUUFBUSxD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
