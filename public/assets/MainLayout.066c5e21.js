import { _ as _export_sfc, bd as resolveComponent, U as createBlock, V as withCtx, S as openBlock, d as createVNode, a2 as QBtn, W as createBaseVNode } from "./index.38989ee5.js";
import { Q as QToolbar, a as QToolbarTitle } from "./QToolbar.17c2ac15.js";
import { Q as QHeader } from "./QHeader.e673dc4d.js";
import { Q as QLayout, a as QPageContainer, _ as _imports_0 } from "./logo.3e8e03b2.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("img", {
  class: "self-center",
  width: "120",
  src: _imports_0
}, null, -1);
function _sfc_render(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "hHh Lpr fFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, {
        bordered: "",
        class: "base-header bg-white text-black"
      }, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                round: "",
                size: "15px",
                color: "primary",
                icon: "menu",
                "aria-label": "Menu",
                dense: ""
              }),
              createVNode(QToolbarTitle, null, {
                default: withCtx(() => [
                  _hoisted_1
                ]),
                _: 1
              }),
              createVNode(QBtn, {
                "no-caps": "",
                color: "primary",
                to: { name: "Dashboard" },
                label: "Posts"
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          (openBlock(), createBlock(_component_router_view, {
            key: _ctx.$router.fullPath
          }))
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MainLayout.vue"]]);
export { MainLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC4wNjZjNWUyMS5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
