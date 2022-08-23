import { _ as _export_sfc, bC as mapActions, bv as mapState, bd as resolveComponent, U as createBlock, V as withCtx, S as openBlock, W as createBaseVNode, d as createVNode, Z as QCardSection, aK as QInput, a3 as QCard } from "./index.94c1c68b.js";
import { Q as QForm } from "./QForm.e37934b9.js";
import { Q as QPage } from "./QPage.d14d1fc7.js";
import { u as useAppStore } from "./app.a880281b.js";
import "./api.636d00fa.js";
import "./BaseAlert.abd8bfd6.js";
import "./lodash.2b44b28e.js";
const _sfc_main = {
  data() {
    return {
      visible: false,
      errors: {}
    };
  },
  methods: {
    ...mapActions(useAppStore, ["update", "currentUser"]),
    onSaveProfile() {
      console.func("pages/SignUpPage:methods.onSaveProfile()", arguments);
      this.visible = true;
      this.errors = {};
      this.update({
        ...this.user,
        guard: this.$route.meta.guard
      }).then(() => {
        this.visible = false;
      }).catch(({ errors, message }) => {
        this.visible = false;
        if (errors) {
          this.errors = errors;
        } else {
          this.$core.error(message);
        }
      });
    }
  },
  computed: {
    ...mapState(useAppStore, ["user"])
  }
};
const _hoisted_1 = { class: "q-gutter-y-lg" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Profile Information", -1);
const _hoisted_3 = { class: "row q-pt-lg q-col-gutter-y-sm q-col-gutter-x-xl" };
const _hoisted_4 = { class: "col-sm-3 col-xs-12" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "First Name", -1);
const _hoisted_6 = { class: "col-sm-3 col-xs-12" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Surname", -1);
const _hoisted_8 = { class: "col-sm-3 col-xs-12" };
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Email", -1);
const _hoisted_10 = { class: "col-sm-3 col-xs-12" };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Phone Number", -1);
const _hoisted_12 = { class: "col-sm-3 col-xs-12" };
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Address Line 1", -1);
const _hoisted_14 = { class: "col-sm-3 col-xs-12" };
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Address Line 2", -1);
const _hoisted_16 = { class: "col-sm-3 col-xs-12" };
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "City", -1);
const _hoisted_18 = { class: "col-sm-3 col-xs-12" };
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Postcode/Zip", -1);
const _hoisted_20 = { class: "col-sm-3 col-xs-12" };
const _hoisted_21 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Country", -1);
const _hoisted_22 = { class: "col-sm-3 col-xs-12" };
const _hoisted_23 = /* @__PURE__ */ createBaseVNode("div", { class: "text-label" }, "Password", -1);
const _hoisted_24 = { class: "col-sm-6 col-xs-12 text-right self-end" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_base_btn = resolveComponent("base-btn");
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                _hoisted_2,
                createVNode(QForm, { onSubmit: $options.onSaveProfile }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3, [
                      createBaseVNode("div", _hoisted_4, [
                        _hoisted_5,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("first_name", $data.errors),
                          error: _ctx.$core.hasError("first_name", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.first_name,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.user.first_name = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_6, [
                        _hoisted_7,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("surname", $data.errors),
                          error: _ctx.$core.hasError("surname", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.surname,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.user.surname = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_8, [
                        _hoisted_9,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("email", $data.errors),
                          error: _ctx.$core.hasError("email", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.email,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.user.email = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_10, [
                        _hoisted_11,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("phone_number", $data.errors),
                          error: _ctx.$core.hasError("phone_number", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.phone_number,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.user.phone_number = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_12, [
                        _hoisted_13,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("line1", $data.errors),
                          error: _ctx.$core.hasError("line1", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.address.line1,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.user.address.line1 = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_14, [
                        _hoisted_15,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("line2", $data.errors),
                          error: _ctx.$core.hasError("line2", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.address.line2,
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.user.address.line2 = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_16, [
                        _hoisted_17,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("city", $data.errors),
                          error: _ctx.$core.hasError("city", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.address.city,
                          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.user.address.city = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_18, [
                        _hoisted_19,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("postal_code", $data.errors),
                          error: _ctx.$core.hasError("postal_code", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.address.postal_code,
                          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.user.address.postal_code = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_20, [
                        _hoisted_21,
                        createVNode(QInput, {
                          "error-message": _ctx.$core.errorMessage("country", $data.errors),
                          error: _ctx.$core.hasError("country", $data.errors),
                          dense: "",
                          outlined: "",
                          modelValue: _ctx.user.address.country,
                          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.user.address.country = $event),
                          type: "text"
                        }, null, 8, ["error-message", "error", "modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_22, [
                        _hoisted_23,
                        createVNode(QInput, {
                          type: "password",
                          readonly: "",
                          "bottom-slots": "",
                          dense: "",
                          outlined: "",
                          modelValue: "**********"
                        }, {
                          hint: withCtx(() => [
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
                        })
                      ]),
                      createBaseVNode("div", _hoisted_24, [
                        createVNode(_component_base_btn, {
                          class: "main-btn",
                          loading: $data.visible,
                          style: { "width": "100px" },
                          label: "Save",
                          type: "submit"
                        }, null, 8, ["loading"])
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["onSubmit"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ])
    ]),
    _: 1
  });
}
var MyAccountPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MyAccountPage.vue"]]);
export { MyAccountPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlBY2NvdW50UGFnZS5kNDAwODlhZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWlucy9NeUFjY291bnRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZz5cbiAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1sZ1wiPlxuICAgICAgPHEtY2FyZD5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+UHJvZmlsZSBJbmZvcm1hdGlvbjwvZGl2PlxuXG4gICAgICAgICAgPHEtZm9ybSBAc3VibWl0PVwib25TYXZlUHJvZmlsZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLXB0LWxnIHEtY29sLWd1dHRlci15LXNtIHEtY29sLWd1dHRlci14LXhsXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtMTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPkZpcnN0IE5hbWU8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgnZmlyc3RfbmFtZScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yPVwiJGNvcmUuaGFzRXJyb3IoJ2ZpcnN0X25hbWUnLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXIuZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC14cy0xMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxhYmVsXCI+U3VybmFtZTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiJGNvcmUuZXJyb3JNZXNzYWdlKCdzdXJuYW1lJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICA6ZXJyb3I9XCIkY29yZS5oYXNFcnJvcignc3VybmFtZScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlci5zdXJuYW1lXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5FbWFpbDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiJGNvcmUuZXJyb3JNZXNzYWdlKCdlbWFpbCcsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yPVwiJGNvcmUuaGFzRXJyb3IoJ2VtYWlsJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyLmVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5QaG9uZSBOdW1iZXI8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgncGhvbmVfbnVtYmVyJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICA6ZXJyb3I9XCIkY29yZS5oYXNFcnJvcigncGhvbmVfbnVtYmVyJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyLnBob25lX251bWJlclwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC14cy0xMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxhYmVsXCI+QWRkcmVzcyBMaW5lIDE8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgnbGluZTEnLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIDplcnJvcj1cIiRjb3JlLmhhc0Vycm9yKCdsaW5lMScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlci5hZGRyZXNzLmxpbmUxXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5BZGRyZXNzIExpbmUgMjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlPVwiJGNvcmUuZXJyb3JNZXNzYWdlKCdsaW5lMicsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yPVwiJGNvcmUuaGFzRXJyb3IoJ2xpbmUyJywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyLmFkZHJlc3MubGluZTJcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtMTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPkNpdHk8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgnY2l0eScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgOmVycm9yPVwiJGNvcmUuaGFzRXJyb3IoJ2NpdHknLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXIuYWRkcmVzcy5jaXR5XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5Qb3N0Y29kZS9aaXA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZT1cIiRjb3JlLmVycm9yTWVzc2FnZSgncG9zdGFsX2NvZGUnLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIDplcnJvcj1cIiRjb3JlLmhhc0Vycm9yKCdwb3N0YWxfY29kZScsIGVycm9ycylcIlxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlci5hZGRyZXNzLnBvc3RhbF9jb2RlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGFiZWxcIj5Db3VudHJ5PC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2U9XCIkY29yZS5lcnJvck1lc3NhZ2UoJ2NvdW50cnknLCBlcnJvcnMpXCJcbiAgICAgICAgICAgICAgICAgIDplcnJvcj1cIiRjb3JlLmhhc0Vycm9yKCdjb3VudHJ5JywgZXJyb3JzKVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyLmFkZHJlc3MuY291bnRyeVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC14cy0xMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxhYmVsXCI+UGFzc3dvcmQ8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICAgIGJvdHRvbS1zbG90c1xuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlPVwiKioqKioqKioqKlwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpoaW50PlxuICAgICAgICAgICAgICAgICAgICA8YmFzZS1idG5cbiAgICAgICAgICAgICAgICAgICAgICBzaXplPVwiMTFweFwiXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJncmV5XCJcbiAgICAgICAgICAgICAgICAgICAgICA6dG89XCJ7IG5hbWU6ICdGb3JnZXQgUGFzc3dvcmQnIH1cIlxuICAgICAgICAgICAgICAgICAgICAgIGxpbmtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYVwiXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJGb3Jnb3R0ZW4gcGFzc3dvcmQ/XCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTYgY29sLXhzLTEyIHRleHQtcmlnaHQgc2VsZi1lbmRcIj5cbiAgICAgICAgICAgICAgICA8YmFzZS1idG5cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWFpbi1idG5cIlxuICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU2F2ZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1mb3JtPlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcFN0YXRlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyB1c2VBcHBTdG9yZSB9IGZyb20gXCJzdG9yZXMvYXBwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICBlcnJvcnM6IHt9LFxuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBBY3Rpb25zKHVzZUFwcFN0b3JlLCBbXCJ1cGRhdGVcIiwgXCJjdXJyZW50VXNlclwiXSksXG4gICAgb25TYXZlUHJvZmlsZSgpIHtcbiAgICAgIGNvbnNvbGUuZnVuYyhcInBhZ2VzL1NpZ25VcFBhZ2U6bWV0aG9kcy5vblNhdmVQcm9maWxlKClcIiwgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLmVycm9ycyA9IHt9O1xuICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAuLi50aGlzLnVzZXIsXG4gICAgICAgIGd1YXJkOiB0aGlzLiRyb3V0ZS5tZXRhLmd1YXJkLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKHsgZXJyb3JzLCBtZXNzYWdlIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kY29yZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgLi4ubWFwU3RhdGUodXNlQXBwU3RvcmUsIFtcInVzZXJcIl0pLFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUEyS0EsTUFBSyxZQUFVO0FBQUEsRUFDYixPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLE1BQ1QsUUFBUSxDQUFFO0FBQUE7RUFFYjtBQUFBLEVBQ0QsU0FBUztBQUFBLElBQ1AsR0FBRyxXQUFXLGFBQWEsQ0FBQyxVQUFVLGFBQWEsQ0FBQztBQUFBLElBQ3BELGdCQUFnQjtBQUNkLGNBQVEsS0FBSyw0Q0FBNEMsU0FBUztBQUNsRSxXQUFLLFVBQVU7QUFDZixXQUFLLFNBQVM7QUFDZCxXQUFLLE9BQU87QUFBQSxRQUNWLEdBQUcsS0FBSztBQUFBLFFBQ1IsT0FBTyxLQUFLLE9BQU8sS0FBSztBQUFBLE9BQ3pCLEVBQ0UsS0FBSyxNQUFNO0FBQ1YsYUFBSyxVQUFVO0FBQUEsT0FDaEIsRUFDQSxNQUFNLENBQUMsRUFBRSxRQUFRLGNBQWM7QUFDOUIsYUFBSyxVQUFVO0FBQ2YsWUFBSSxRQUFRO0FBQ1YsZUFBSyxTQUFTO0FBQUEsZUFDVDtBQUNMLGVBQUssTUFB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
