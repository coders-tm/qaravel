import { _ as _export_sfc, bC as mapActions, X as createElementBlock, d as createVNode, V as withCtx, W as createBaseVNode, a6 as createTextVNode, S as openBlock, aK as QInput, a2 as QBtn } from "./index.94c1c68b.js";
import { Q as QForm } from "./QForm.e37934b9.js";
import { u as useAppStore } from "./app.a880281b.js";
import "./api.636d00fa.js";
import "./BaseAlert.abd8bfd6.js";
import "./lodash.2b44b28e.js";
var ForgotPasswordPage_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  data() {
    return {
      form: {
        email: "",
        guard: this.$route.meta.guard
      },
      errors: {},
      visible: false
    };
  },
  methods: {
    ...mapActions(useAppStore, ["forgotPassword"]),
    onSubmit() {
      console.func("pages/auth/ForgotPasswordPage:methods.onSubmit()", arguments);
      this.onReset();
      this.forgotPassword(this.form).then((response) => {
        this.visible = false;
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
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6 text-center q-mb" }, "Forgot Password.", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("p", { class: "text-center q-mb-lg" }, [
  /* @__PURE__ */ createTextVNode(" Forgot your password? Not to worry!"),
  /* @__PURE__ */ createBaseVNode("br"),
  /* @__PURE__ */ createTextVNode("Simply enter your email address below and our system will send you a password reset email. ")
], -1);
const _hoisted_3 = { class: "col q-mb-lg" };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Email", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    createVNode(QForm, {
      ref: "forgetPasswordForm",
      onSubmit: $options.onSubmit
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_3, [
          _hoisted_4,
          createVNode(QInput, {
            outlined: "",
            dense: "",
            modelValue: $data.form.email,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.email = $event),
            ref: "email",
            "bottom-slots": "",
            "error-message": "email" in $data.errors ? $data.errors.email.join(", ") : "",
            error: "email" in $data.errors,
            autofocus: ""
          }, null, 8, ["modelValue", "error-message", "error"])
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
var ForgotPasswordPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ForgotPasswordPage.vue"]]);
export { ForgotPasswordPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9yZ290UGFzc3dvcmRQYWdlLjA5MWQ5NzhjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvY29yZS9hdXRoL0ZvcmdvdFBhc3N3b3JkUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtY2VudGVyIHEtbWJcIj5Gb3Jnb3QgUGFzc3dvcmQuPC9kaXY+XG4gICAgPHAgY2xhc3M9XCJ0ZXh0LWNlbnRlciBxLW1iLWxnXCI+XG4gICAgICBGb3Jnb3QgeW91ciBwYXNzd29yZD8gTm90IHRvIHdvcnJ5ITxiciAvPlNpbXBseSBlbnRlciB5b3VyIGVtYWlsIGFkZHJlc3MgYmVsb3cgYW5kIG91ciBzeXN0ZW1cbiAgICAgIHdpbGwgc2VuZCB5b3UgYSBwYXNzd29yZCByZXNldCBlbWFpbC5cbiAgICA8L3A+XG4gICAgPHEtZm9ybSByZWY9XCJmb3JnZXRQYXNzd29yZEZvcm1cIiBAc3VibWl0PVwib25TdWJtaXRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgcS1tYi1sZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPkVtYWlsPC9kaXY+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLmVtYWlsXCJcbiAgICAgICAgICByZWY9XCJlbWFpbFwiXG4gICAgICAgICAgYm90dG9tLXNsb3RzXG4gICAgICAgICAgOmVycm9yLW1lc3NhZ2U9XCInZW1haWwnIGluIGVycm9ycyA/IGVycm9ycy5lbWFpbC5qb2luKCcsICcpIDogJydcIlxuICAgICAgICAgIDplcnJvcj1cIidlbWFpbCcgaW4gZXJyb3JzXCJcbiAgICAgICAgICBhdXRvZm9jdXM9XCJcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxxLWJ0blxuICAgICAgICA6bG9hZGluZz1cInZpc2libGVcIlxuICAgICAgICBuby1jYXBzXG4gICAgICAgIGxhYmVsPVwiU3VibWl0XCJcbiAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgIC8+XG4gICAgICA8cS1idG5cbiAgICAgICAgbm8tY2Fwc1xuICAgICAgICBsYWJlbD1cIkdvIEJhY2tcIlxuICAgICAgICBjbGFzcz1cInEtbXQtc20gZnVsbC13aWR0aFwiXG4gICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICBhbGlnbj1cImNlbnRlclwiXG4gICAgICAgIGZsYXRcbiAgICAgICAgOnRvPVwieyBuYW1lOiAnTG9naW4nIH1cIlxuICAgICAgLz5cbiAgICA8L3EtZm9ybT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgbWFwQWN0aW9ucyB9IGZyb20gJ3BpbmlhJztcbmltcG9ydCB7IHVzZUFwcFN0b3JlIH0gZnJvbSAnc3RvcmVzL2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9ybToge1xuICAgICAgICBlbWFpbDogJycsXG4gICAgICAgIGd1YXJkOiB0aGlzLiRyb3V0ZS5tZXRhLmd1YXJkLFxuICAgICAgfSxcbiAgICAgIGVycm9yczoge30sXG4gICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgLi4ubWFwQWN0aW9ucyh1c2VBcHBTdG9yZSwgWydmb3Jnb3RQYXNzd29yZCddKSxcbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygncGFnZXMvYXV0aC9Gb3Jnb3RQYXNzd29yZFBhZ2U6bWV0aG9kcy5vblN1Ym1pdCgpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMub25SZXNldCgpO1xuICAgICAgdGhpcy5mb3Jnb3RQYXNzd29yZCh0aGlzLmZvcm0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuJGNvcmUuc3VjY2VzcyhyZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChlcnJvci5lcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3IuZXJyb3JzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvblJlc2V0KCkge1xuICAgICAgdGhpcy5lcnJvcnMgPSB7fTtcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzYXNzXCI+XG5oM1xuICBmb250LXNpemU6IDEuN3JlbVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWdEQSxNQUFLLFlBQVU7QUFBQSxFQUNiLE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxPQUFPLEtBQUssT0FBTyxLQUFLO0FBQUEsTUFDekI7QUFBQSxNQUNELFFBQVEsQ0FBRTtBQUFBLE1BQ1YsU0FBUztBQUFBO0VBRVo7QUFBQSxFQUNELFNBQVM7QUFBQSxJQUNQLEdBQUcsV0FBVyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFBQSxJQUM3QyxXQUFXO0FBQ1QsY0FBUSxLQUFLLG9EQUFvRCxTQUFTO0FBQzFFLFdBQUssUUFBTztBQUNaLFdBQUssZUFBZSxLQUFLLElBQUksRUFDMUIsS0FBSyxDQUFDLGFBQWE7QUFDbEIsYUFBSyxVQUFVO0FBQ2YsYUFBSyxNQUFNLFFBQVEsU0FBUyxPQUFPO0FBQUEsT0FDcEMsRUFDQSxNQUFNLENBQUMsVUFBVTtBQUNoQixhQUFLLFVBQVU7QUFDZixZQUFJLE1BQU0sUUFBUTtBQUNoQixlQUFLLFNBQVMsTUFBTTtBQUFBLGVBQ2Y7QUFDTCxlQUFLLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxRQUNoQztBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0o7QUFBQSxJQUNELFVBQVU7QUFDUixXQUFLLFNBQVM7QUFDZCxXQUFLLFVBQVU7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDSDtBQWpGSSxNQUFBLGFBQUFBLGdDQUE0RCxPQUF2RCxFQUFBLE9BQU0sOEJBQTJCLG9CQUFnQixFQUFBO21CQUN0REEsZ0NBR0ksS0FBQSxFQUhELE9BQU0sc0JBQXFCLEdBQUE7QUFBQSxrQ0FBQyxzQ0FDTTtBQUFBLEVBQUFBLGdDQUFNLElBQUE7QUFBQSxrQ0FBQSw2RkFFM0M7O0FBRU8sTUFBQSxhQUFBLEVBQUEsT0FBTSxjQUFhO0FBQ3RCLE1BQUEsYUFBQUEsZ0NBQW1DLE9BQTlCLEVBQUEsT0FBTSxnQkFBYSxTQUFLLEVBQUE7O3NCQVJuQ0MsbUJBd0NNLE9BQUEsTUFBQTtBQUFBLElBdkNKO0FBQUEsSUFDQTtBQUFBLElBSUFDLFlBaUNTLE9BQUE7QUFBQSxNQWpDRCxLQUFJO0FBQUEsTUFBc0IsVUFBUSxTQUFRO0FBQUE7dUJBQ2hELE1BWU07QUFBQSxRQVpORixnQkFZTSxPQVpOLFlBWU07QUFBQSxVQVhKO0FBQUEsVUFDQUUsWUFTRSxRQUFBO0FBQUEsWUFSQSxVQUFBO0FBQUEsWUFDQSxPQUFBO0FBQUEsWUFDUyxZQUFBLE1BQUEsS0FBSztBQUFBLFlBQUwsdUJBQUEsT0FBQSxPQUFBLE9BQUEsS0FBQSxZQUFBLE1BQUEsS0FBSyxRQUFLO0FBQUEsWUFDbkIsS0FBSTtBQUFBLFlBQ0osZ0JBQUE7QUFBQSxZQUNDLDRCQUEwQixNQUFNLFNBQUcsYUFBTyxNQUFNLEtBQUksSUFBQSxJQUFBO0FBQUEsWUFDcEQsa0JBQWtCLE1BQU07QUFBQSxZQUN6QixXQUFVO0FBQUE7O1FBSWRBLFlBUUUsTUFBQTtBQUFBLFVBUEMsU0FBUyxNQUFPO0FBQUEsVUFDakIsV0FBQTtBQUFBLFVBQ0EsT0FBTTtBQUFBLFVBQ04sT0FBTTtBQUFBLFVBQ04sT0FBTTtBQUFBLFVBQ04sT0FBTTtBQUFBLFVBQ04sTUFBSztBQUFBO1FBRVBBLFlBUUUsTUFBQTtBQUFBLFVBUEEsV0FBQTtBQUFBLFVBQ0EsT0FBTTtBQUFBLFVBQ04sT0FBTTtBQUFBLFVBQ04sT0FBTTtBQUFBLFVBQ04sT0FBTTtBQUFBLFVBQ04sTUFBQTtBQUFBLFVBQ0MsSUFBSSxFQUFpQixNQUFBLFFBQUE7QUFBQTs7Ozs7Ozs7In0=
