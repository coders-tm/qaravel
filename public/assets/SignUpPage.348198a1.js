import { _ as _export_sfc, bC as mapActions, bv as mapState, bd as resolveComponent, U as createBlock, V as withCtx, S as openBlock, W as createBaseVNode, d as createVNode, bD as QOptionGroup, aK as QInput, a5 as QIcon, a6 as createTextVNode, $ as toDisplayString, X as createElementBlock, a0 as renderList, F as Fragment, bb as QCheckbox } from "./index.fb242601.js";
import { Q as QForm } from "./QForm.256cb651.js";
import { Q as QPage } from "./QPage.b2ce6e50.js";
import { u as useAppStore } from "./app.44106148.js";
import "./api.b3e7b694.js";
import "./BaseAlert.d7479406.js";
import "./lodash.2b44b28e.js";
const guard = "users";
const _sfc_main = {
  data() {
    return {
      form: {
        plan: "investing",
        terms: false,
        guard
      },
      errors: {},
      visible: false,
      isPwd1: true,
      isPwd2: true
    };
  },
  methods: {
    ...mapActions(useAppStore, ["signUp"]),
    onSubmit() {
      console.func("pages/SignUpPage:methods.onSubmit()", arguments);
      this.onReset();
      this.signUp(this.form).then((response) => {
        this.$router.push({ name: "Dashboard" });
        this.visible = false;
      }).catch(({ errors, message }) => {
        this.visible = false;
        if (errors) {
          this.errors = errors;
        } else {
          this.$core.error(message);
        }
      });
    },
    onReset() {
      this.errors = {};
      this.visible = true;
    }
  },
  computed: {
    plan() {
      return this.plans.find((item) => item.value === this.form.plan);
    },
    plans() {
      return this.defaultPlans.map((item) => ({
        ...item,
        label: item.name,
        value: item.key
      }));
    },
    ...mapState(useAppStore, ["defaultPlans"])
  }
};
const _hoisted_1 = { class: "signup-container q-pa-xl" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Sign Up", -1);
const _hoisted_3 = { class: "row q-pt-lg q-col-gutter-md" };
const _hoisted_4 = { class: "col-sm-8 co-xs-12" };
const _hoisted_5 = { class: "row q-col-gutter-sm" };
const _hoisted_6 = { class: "col-sm-12 col-xs-12" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "What are you plan in?", -1);
const _hoisted_8 = { class: "col-sm-6 col-xs-12" };
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "First Name", -1);
const _hoisted_10 = { class: "col-sm-6 col-xs-12" };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Surname", -1);
const _hoisted_12 = { class: "col-sm-6 col-xs-12" };
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Email", -1);
const _hoisted_14 = { class: "col-sm-6 col-xs-12" };
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Phone Number", -1);
const _hoisted_16 = { class: "col-sm-6 col-xs-12" };
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Address Line 1", -1);
const _hoisted_18 = { class: "col-sm-6 col-xs-12" };
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Address Line 2", -1);
const _hoisted_20 = { class: "col-sm-6 col-xs-12" };
const _hoisted_21 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "City", -1);
const _hoisted_22 = { class: "col-sm-6 col-xs-12" };
const _hoisted_23 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Postcode/Zip", -1);
const _hoisted_24 = { class: "col-sm-6 col-xs-12" };
const _hoisted_25 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Country", -1);
const _hoisted_26 = { class: "col-sm-6 col-xs-12" };
const _hoisted_27 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Password", -1);
const _hoisted_28 = { class: "col-sm-6 col-xs-12" };
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Confirm Password", -1);
const _hoisted_30 = { class: "col-sm-4 co-xs-12" };
const _hoisted_31 = { class: "plan q-pa-lg" };
const _hoisted_32 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Your plan", -1);
const _hoisted_33 = { class: "info" };
const _hoisted_34 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_35 = { class: "features" };
const _hoisted_36 = { class: "q-my-lg terms" };
const _hoisted_37 = /* @__PURE__ */ createTextVNode(" I have read and agree to the ");
const _hoisted_38 = /* @__PURE__ */ createTextVNode(" privacy policy ");
const _hoisted_39 = /* @__PURE__ */ createTextVNode(" and ");
const _hoisted_40 = /* @__PURE__ */ createTextVNode(" terms and conditions ");
const _hoisted_41 = { class: "submit-btn text-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_base_btn = resolveComponent("base-btn");
  return openBlock(), createBlock(QPage, {
    class: "row flex-center items-center vertical-middle",
    padding: ""
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        _hoisted_2,
        createVNode(QForm, { onSubmit: $options.onSubmit }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("div", _hoisted_6, [
                    _hoisted_7,
                    createVNode(QOptionGroup, {
                      dense: "",
                      modelValue: $data.form.plan,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.plan = $event),
                      type: "radio",
                      inline: "",
                      options: $options.plans,
                      class: "q-mb-md"
                    }, null, 8, ["modelValue", "options"])
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    _hoisted_9,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("first_name", $data.errors),
                      error: _ctx.$core.hasError("first_name", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.first_name,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.first_name = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_10, [
                    _hoisted_11,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("surname", $data.errors),
                      error: _ctx.$core.hasError("surname", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.surname,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.form.surname = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_12, [
                    _hoisted_13,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("email", $data.errors),
                      error: _ctx.$core.hasError("email", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.email,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.form.email = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_14, [
                    _hoisted_15,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("phone_number", $data.errors),
                      error: _ctx.$core.hasError("phone_number", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.phone_number,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.form.phone_number = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_16, [
                    _hoisted_17,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("line1", $data.errors),
                      error: _ctx.$core.hasError("line1", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.line1,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.form.line1 = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_18, [
                    _hoisted_19,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("line2", $data.errors),
                      error: _ctx.$core.hasError("line2", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.line2,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.form.line2 = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_20, [
                    _hoisted_21,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("city", $data.errors),
                      error: _ctx.$core.hasError("city", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.city,
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.form.city = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_22, [
                    _hoisted_23,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("postal_code", $data.errors),
                      error: _ctx.$core.hasError("postal_code", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.postal_code,
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.form.postal_code = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_24, [
                    _hoisted_25,
                    createVNode(QInput, {
                      "error-message": _ctx.$core.errorMessage("country", $data.errors),
                      error: _ctx.$core.hasError("country", $data.errors),
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.country,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.form.country = $event),
                      type: "text"
                    }, null, 8, ["error-message", "error", "modelValue"])
                  ]),
                  createBaseVNode("div", _hoisted_26, [
                    _hoisted_27,
                    createVNode(QInput, {
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.password,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.form.password = $event),
                      "error-message": _ctx.$core.errorMessage("password", $data.errors),
                      error: _ctx.$core.hasError("password", $data.errors),
                      type: $data.isPwd1 ? "password" : "text"
                    }, {
                      append: withCtx(() => [
                        createVNode(QIcon, {
                          name: $data.isPwd1 ? "visibility_off" : "visibility",
                          class: "cursor-pointer",
                          onClick: _cache[10] || (_cache[10] = ($event) => $data.isPwd1 = !$data.isPwd1)
                        }, null, 8, ["name"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "error-message", "error", "type"])
                  ]),
                  createBaseVNode("div", _hoisted_28, [
                    _hoisted_29,
                    createVNode(QInput, {
                      dense: "",
                      outlined: "",
                      modelValue: $data.form.password_confirmation,
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.form.password_confirmation = $event),
                      "error-message": _ctx.$core.errorMessage("password_confirmation", $data.errors),
                      error: _ctx.$core.hasError("password_confirmation", $data.errors),
                      type: $data.isPwd2 ? "password" : "text"
                    }, {
                      append: withCtx(() => [
                        createVNode(QIcon, {
                          name: $data.isPwd2 ? "visibility_off" : "visibility",
                          class: "cursor-pointer",
                          onClick: _cache[12] || (_cache[12] = ($event) => $data.isPwd2 = !$data.isPwd2)
                        }, null, 8, ["name"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "error-message", "error", "type"])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_30, [
                createBaseVNode("div", _hoisted_31, [
                  _hoisted_32,
                  createBaseVNode("div", _hoisted_33, [
                    createTextVNode(toDisplayString($options.plan.label) + " Plan", 1),
                    _hoisted_34,
                    createTextVNode(toDisplayString(_ctx.$core.money($options.plan.price)) + " per month ", 1)
                  ]),
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("ul", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($options.plan.features, (feature, index) => {
                        return openBlock(), createElementBlock("li", { key: index }, toDisplayString(feature), 1);
                      }), 128))
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_36, [
                  createVNode(QCheckbox, {
                    dense: "",
                    size: "sm",
                    modelValue: $data.form.terms,
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.form.terms = $event)
                  }, {
                    default: withCtx(() => [
                      _hoisted_37,
                      createVNode(_component_base_btn, {
                        to: { name: "Privacy policy" },
                        size: "11px",
                        type: "a",
                        link: ""
                      }, {
                        default: withCtx(() => [
                          _hoisted_38
                        ]),
                        _: 1
                      }),
                      _hoisted_39,
                      createVNode(_component_base_btn, {
                        to: { name: "Terms and conditions" },
                        size: "11px",
                        type: "a",
                        link: ""
                      }, {
                        default: withCtx(() => [
                          _hoisted_40
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                createBaseVNode("div", _hoisted_41, [
                  createVNode(_component_base_btn, {
                    disabled: !$data.form.terms,
                    loading: $data.visible,
                    style: { "width": "100px" },
                    label: "Sign up",
                    type: "submit"
                  }, null, 8, ["disabled", "loading"])
                ])
              ])
            ])
          ]),
          _: 1
        }, 8, ["onSubmit"])
      ])
    ]),
    _: 1
  });
}
var SignUpPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "SignUpPage.vue"]]);
export { SignUpPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnblVwUGFnZS4zNDgxOThhMS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL1NpZ25VcFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cInJvdyBmbGV4LWNlbnRlciBpdGVtcy1jZW50ZXIgdmVydGljYWwtbWlkZGxlXCIgcGFkZGluZz5cbiAgICA8ZGl2IGNsYXNzPVwic2lnbnVwLWNvbnRhaW5lciBxLXBhLXhsXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlNpZ24gVXA8L2Rpdj5cbiAgICAgIDxxLWZvcm0gQHN1Ym1pdD1cIm9uU3VibWl0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1wdC1sZyBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTggY28teHMtMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1jb2wtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTIgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5XaGF0IGFyZSB5b3UgcGxhbiBpbj88L2Rpdj5cbiAgICAgICAgICAgICAgICA8cS1vcHRpb24tZ3JvdXBcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZm9ybS5wbGFuXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgICBpbmxpbmVcbiAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwicGxhbnNcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW1iLW1kXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS02IGNvbC14cy0xMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxhYmVsXCI+Rmlyc3QgTmFtZTwvZGl2PlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgnZmlyc3RfbmFtZScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yPVwiJGNvcmUuaGFzRXJyb3IoJ2ZpcnN0X25hbWUnLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImZvcm0uZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNiBjb2wteHMtMTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPlN1cm5hbWU8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2U9XCIkY29yZS5lcnJvck1lc3NhZ2UoJ3N1cm5hbWUnLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIDplcnJvcj1cIiRjb3JlLmhhc0Vycm9yKCdzdXJuYW1lJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLnN1cm5hbWVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTYgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5FbWFpbDwvZGl2PlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgnZW1haWwnLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIDplcnJvcj1cIiRjb3JlLmhhc0Vycm9yKCdlbWFpbCcsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZm9ybS5lbWFpbFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNiBjb2wteHMtMTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPlBob25lIE51bWJlcjwvZGl2PlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgncGhvbmVfbnVtYmVyJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICA6ZXJyb3I9XCIkY29yZS5oYXNFcnJvcigncGhvbmVfbnVtYmVyJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLnBob25lX251bWJlclwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNiBjb2wteHMtMTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPkFkZHJlc3MgTGluZSAxPC9kaXY+XG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiJGNvcmUuZXJyb3JNZXNzYWdlKCdsaW5lMScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yPVwiJGNvcmUuaGFzRXJyb3IoJ2xpbmUxJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLmxpbmUxXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS02IGNvbC14cy0xMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxhYmVsXCI+QWRkcmVzcyBMaW5lIDI8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2U9XCIkY29yZS5lcnJvck1lc3NhZ2UoJ2xpbmUyJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICA6ZXJyb3I9XCIkY29yZS5oYXNFcnJvcignbGluZTInLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImZvcm0ubGluZTJcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTYgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5DaXR5PC9kaXY+XG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiJGNvcmUuZXJyb3JNZXNzYWdlKCdjaXR5JywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICA6ZXJyb3I9XCIkY29yZS5oYXNFcnJvcignY2l0eScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZm9ybS5jaXR5XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS02IGNvbC14cy0xMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxhYmVsXCI+UG9zdGNvZGUvWmlwPC9kaXY+XG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiJGNvcmUuZXJyb3JNZXNzYWdlKCdwb3N0YWxfY29kZScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yPVwiJGNvcmUuaGFzRXJyb3IoJ3Bvc3RhbF9jb2RlJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLnBvc3RhbF9jb2RlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS02IGNvbC14cy0xMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxhYmVsXCI+Q291bnRyeTwvZGl2PlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgnY291bnRyeScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yPVwiJGNvcmUuaGFzRXJyb3IoJ2NvdW50cnknLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImZvcm0uY291bnRyeVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNiBjb2wteHMtMTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPlBhc3N3b3JkPC9kaXY+XG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImZvcm0ucGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2U9XCIkY29yZS5lcnJvck1lc3NhZ2UoJ3Bhc3N3b3JkJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICA6ZXJyb3I9XCIkY29yZS5oYXNFcnJvcigncGFzc3dvcmQnLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIDp0eXBlPVwiaXNQd2QxID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0J1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImlzUHdkMSA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkMSA9ICFpc1B3ZDFcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTYgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5Db25maXJtIFBhc3N3b3JkPC9kaXY+XG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImZvcm0ucGFzc3dvcmRfY29uZmlybWF0aW9uXCJcbiAgICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiXG4gICAgICAgICAgICAgICAgICAgICRjb3JlLmVycm9yTWVzc2FnZSgncGFzc3dvcmRfY29uZmlybWF0aW9uJywgZXJyb3JzKVxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgIDplcnJvcj1cIiRjb3JlLmhhc0Vycm9yKCdwYXNzd29yZF9jb25maXJtYXRpb24nLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIDp0eXBlPVwiaXNQd2QyID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0J1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImlzUHdkMiA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkMiA9ICFpc1B3ZDJcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS00IGNvLXhzLTEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxhbiBxLXBhLWxnXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+WW91ciBwbGFuPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgICAgICAgICAge3sgcGxhbi5sYWJlbCB9fSBQbGFuPGJyIC8+e3sgJGNvcmUubW9uZXkocGxhbi5wcmljZSkgfX0gcGVyXG4gICAgICAgICAgICAgICAgbW9udGhcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmZWF0dXJlc1wiPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgIDxsaSB2LWZvcj1cIihmZWF0dXJlLCBpbmRleCkgaW4gcGxhbi5mZWF0dXJlc1wiIDprZXk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBmZWF0dXJlIH19XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1teS1sZyB0ZXJtc1wiPlxuICAgICAgICAgICAgICA8cS1jaGVja2JveCBkZW5zZSBzaXplPVwic21cIiB2LW1vZGVsPVwiZm9ybS50ZXJtc1wiPlxuICAgICAgICAgICAgICAgIEkgaGF2ZSByZWFkIGFuZCBhZ3JlZSB0byB0aGVcbiAgICAgICAgICAgICAgICA8YmFzZS1idG5cbiAgICAgICAgICAgICAgICAgIDp0bz1cInsgbmFtZTogJ1ByaXZhY3kgcG9saWN5JyB9XCJcbiAgICAgICAgICAgICAgICAgIHNpemU9XCIxMXB4XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJhXCJcbiAgICAgICAgICAgICAgICAgIGxpbmtcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBwcml2YWN5IHBvbGljeVxuICAgICAgICAgICAgICAgIDwvYmFzZS1idG4+XG4gICAgICAgICAgICAgICAgYW5kXG4gICAgICAgICAgICAgICAgPGJhc2UtYnRuXG4gICAgICAgICAgICAgICAgICA6dG89XCJ7IG5hbWU6ICdUZXJtcyBhbmQgY29uZGl0aW9ucycgfVwiXG4gICAgICAgICAgICAgICAgICBzaXplPVwiMTFweFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYVwiXG4gICAgICAgICAgICAgICAgICBsaW5rXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAgICAgICAgICAgICAgICA8L2Jhc2UtYnRuPlxuICAgICAgICAgICAgICA8L3EtY2hlY2tib3g+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWJtaXQtYnRuIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxiYXNlLWJ0blxuICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cIiFmb3JtLnRlcm1zXCJcbiAgICAgICAgICAgICAgICA6bG9hZGluZz1cInZpc2libGVcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlNpZ24gdXBcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWZvcm0+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcFN0YXRlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyB1c2VBcHBTdG9yZSB9IGZyb20gXCJzdG9yZXMvYXBwXCI7XG5jb25zdCBndWFyZCA9IFwidXNlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmb3JtOiB7XG4gICAgICAgIHBsYW46IFwiaW52ZXN0aW5nXCIsXG4gICAgICAgIHRlcm1zOiBmYWxzZSxcbiAgICAgICAgZ3VhcmQsXG4gICAgICB9LFxuICAgICAgZXJyb3JzOiB7fSxcbiAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgaXNQd2QxOiB0cnVlLFxuICAgICAgaXNQd2QyOiB0cnVlLFxuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBBY3Rpb25zKHVzZUFwcFN0b3JlLCBbXCJzaWduVXBcIl0pLFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgY29uc29sZS5mdW5jKFwicGFnZXMvU2lnblVwUGFnZTptZXRob2RzLm9uU3VibWl0KClcIiwgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMub25SZXNldCgpO1xuICAgICAgdGhpcy5zaWduVXAodGhpcy5mb3JtKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IG5hbWU6IFwiRGFzaGJvYXJkXCIgfSk7XG4gICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoeyBlcnJvcnMsIG1lc3NhZ2UgfSkgPT4ge1xuICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvblJlc2V0KCkge1xuICAgICAgdGhpcy5lcnJvcnMgPSB7fTtcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgfSxcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBwbGFuKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGxhbnMuZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gdGhpcy5mb3JtLnBsYW4pO1xuICAgIH0sXG4gICAgcGxhbnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UGxhbnMubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgICAgICB2YWx1ZTogaXRlbS5rZXksXG4gICAgICB9KSk7XG4gICAgfSxcbiAgICAuLi5tYXBTdGF0ZSh1c2VBcHBTdG9yZSwgW1wiZGVmYXVsdFBsYW5zXCJdKSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXdOQSxNQUFNLFFBQVE7QUFFZCxNQUFLLFlBQVU7QUFB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
