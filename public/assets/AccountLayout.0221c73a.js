import { _ as _export_sfc, bC as mapActions, bv as mapState, bd as resolveComponent, U as createBlock, V as withCtx, S as openBlock, d as createVNode, W as createBaseVNode, $ as toDisplayString, a3 as QCard, Z as QCardSection } from "./index.94c1c68b.js";
import { Q as QPage } from "./QPage.d14d1fc7.js";
import { Q as QLayout, a as QPageContainer } from "./logo.8dc3ac27.js";
import { L as LayoutHeader, a as LayoutDrawer } from "./LayoutDrawer.9c7717c7.js";
import { u as useAppStore } from "./app.a880281b.js";
import "./QToolbarTitle.6fb5e67d.js";
import "./QSpace.a4fd6aed.js";
import "./QToolbar.9688c05b.js";
import "./QHeader.fa68a155.js";
import "./BaseAlert.abd8bfd6.js";
import "./QDrawer.52c6c3cc.js";
import "./api.636d00fa.js";
import "./lodash.2b44b28e.js";
const _sfc_main = {
  components: { LayoutHeader, LayoutDrawer },
  methods: {
    ...mapActions(useAppStore, ["logout"]),
    onLogout() {
      this.logout().then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  },
  computed: {
    ...mapState(useAppStore, ["user"])
  }
};
const _hoisted_1 = { class: "text-h5 q-mb-md" };
const _hoisted_2 = { class: "row q-col-gutter-lg" };
const _hoisted_3 = { class: "col-sm-3 col-xs-12" };
const _hoisted_4 = { class: "text-h6 text-weight-medium q-mb-lg" };
const _hoisted_5 = { class: "col-sm-9 col-xs-12" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_layout_header = resolveComponent("layout-header");
  const _component_layout_drawer = resolveComponent("layout-drawer");
  const _component_base_avatar_widget = resolveComponent("base-avatar-widget");
  const _component_router_view = resolveComponent("router-view");
  const _component_base_btn = resolveComponent("base-btn");
  return openBlock(), createBlock(QLayout, {
    view: "hHh Lpr fFf",
    class: "bg-main"
  }, {
    default: withCtx(() => [
      createVNode(_component_layout_header, {
        onUpdateLeftDrawer: _cache[0] || (_cache[0] = ($event) => _ctx.$refs.layoutDrawer.toggle())
      }),
      createVNode(_component_layout_drawer, { ref: "layoutDrawer" }, null, 512),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(QPage, { padding: "" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, toDisplayString(_ctx.$route.meta.title), 1),
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(QCard, null, {
                    default: withCtx(() => [
                      createVNode(QCardSection, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode(_component_base_avatar_widget, {
                            size: "100px",
                            user: _ctx.user
                          }, null, 8, ["user"]),
                          createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.user.name), 1),
                          createBaseVNode("div", null, "Member Since " + toDisplayString(_ctx.user.member_since), 1),
                          createBaseVNode("div", null, toDisplayString(_ctx.user.email), 1),
                          createBaseVNode("div", null, toDisplayString(_ctx.user.phone_number), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createBaseVNode("div", _hoisted_5, [
                  (openBlock(), createBlock(_component_router_view, {
                    key: _ctx.$router.fullPath
                  })),
                  createVNode(_component_base_btn, {
                    onClick: $options.onLogout,
                    style: { "width": "150px" },
                    class: "q-mt-lg main-btn",
                    color: "primary",
                    label: "Logout"
                  }, null, 8, ["onClick"])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var AccountLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "AccountLayout.vue"]]);
export { AccountLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudExheW91dC4wMjIxYzczYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xheW91dHMvQWNjb3VudExheW91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1sYXlvdXQgdmlldz1cImhIaCBMcHIgZkZmXCIgY2xhc3M9XCJiZy1tYWluXCI+XG4gICAgPGxheW91dC1oZWFkZXIgQHVwZGF0ZS1sZWZ0LWRyYXdlcj1cIiRyZWZzLmxheW91dERyYXdlci50b2dnbGUoKVwiIC8+XG5cbiAgICA8bGF5b3V0LWRyYXdlciByZWY9XCJsYXlvdXREcmF3ZXJcIiAvPlxuXG4gICAgPHEtcGFnZS1jb250YWluZXI+XG4gICAgICA8cS1wYWdlIHBhZGRpbmc+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbWItbWRcIj57eyAkcm91dGUubWV0YS50aXRsZSB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wteHMtMTJcIj5cbiAgICAgICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPGJhc2UtYXZhdGFyLXdpZGdldCBzaXplPVwiMTAwcHhcIiA6dXNlcj1cInVzZXJcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtd2VpZ2h0LW1lZGl1bSBxLW1iLWxnXCI+XG4gICAgICAgICAgICAgICAgICB7eyB1c2VyLm5hbWUgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2Pk1lbWJlciBTaW5jZSB7eyB1c2VyLm1lbWJlcl9zaW5jZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgdXNlci5lbWFpbCB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgdXNlci5waG9uZV9udW1iZXIgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOSBjb2wteHMtMTJcIj5cbiAgICAgICAgICAgIDxyb3V0ZXItdmlldyA6a2V5PVwiJHJvdXRlci5mdWxsUGF0aFwiIC8+XG5cbiAgICAgICAgICAgIDxiYXNlLWJ0blxuICAgICAgICAgICAgICBAY2xpY2s9XCJvbkxvZ291dFwiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJxLW10LWxnIG1haW4tYnRuXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJMb2dvdXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtcGFnZT5cbiAgICA8L3EtcGFnZS1jb250YWluZXI+XG4gIDwvcS1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IExheW91dEhlYWRlciBmcm9tIFwiY29tcG9uZW50cy9MYXlvdXRIZWFkZXIudnVlXCI7XG5pbXBvcnQgTGF5b3V0RHJhd2VyIGZyb20gXCJjb21wb25lbnRzL0xheW91dERyYXdlci52dWVcIjtcbmltcG9ydCB7IG1hcEFjdGlvbnMsIG1hcFN0YXRlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyB1c2VBcHBTdG9yZSB9IGZyb20gXCJzdG9yZXMvYXBwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czogeyBMYXlvdXRIZWFkZXIsIExheW91dERyYXdlciB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBBY3Rpb25zKHVzZUFwcFN0b3JlLCBbXCJsb2dvdXRcIl0pLFxuICAgIG9uTG9nb3V0KCkge1xuICAgICAgdGhpcy5sb2dvdXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goeyBuYW1lOiBcIkxvZ2luXCIgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcFN0YXRlKHVzZUFwcFN0b3JlLCBbXCJ1c2VyXCJdKSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQThDQSxNQUFLLFlBQVU7QUFBQSxFQUNiLFlBQVksRUFBRSxjQUFjLGFBQWM7QUFBQSxFQUUxQyxTQUFTO0FBQUEsSUFDUCxHQUFHLFdBQVcsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUFBLElBQ3JDLFdBQVc7QUFDVCxXQUFLLFNBQVMsS0FBSyxNQUFNO0FBQ3ZCLGFBQUssUUFBUSxLQUFLLEVBQUUsTUFBTSxRQUFTLENBQUE7QUFBQSxNQUNyQyxDQUFDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNELFVBQVU7QUFBQSxJQUNSLEdBQUcsU0FBUyxhQUFhLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDbEM7QUFDSDtBQXBEYSxNQUFBLGFBQUEsRUFBQSxPQUFNLGtCQUFpQjtBQUN2QixNQUFBLGFBQUEsRUFBQSxPQUFNLHNCQUFxQjtBQUN6QixNQUFBLGFBQUEsRUFBQSxPQUFNLHFCQUFvQjtBQUlwQixNQUFBLGFBQUEsRUFBQSxPQUFNLHFDQUFvQztBQVNoRCxNQUFBLGFBQUEsRUFBQSxPQUFNLHFCQUFvQjs7Ozs7OztzQkF0QnZDQSxZQW9DVyxTQUFBO0FBQUEsSUFwQ0QsTUFBSztBQUFBLElBQWMsT0FBTTtBQUFBO3FCQUNqQyxNQUFtRTtBQUFBLE1BQW5FQyxZQUFtRSwwQkFBQTtBQUFBLFFBQW5ELG9CQUFvQixPQUFBLE9BQUEsT0FBQSxLQUFBLFlBQUEsS0FBQSxNQUFNLGFBQWEsT0FBTTtBQUFBO01BRTdEQSxZQUFvQywwQkFBQSxFQUFyQixLQUFJLGVBQWMsR0FBQSxNQUFBLEdBQUE7QUFBQSxNQUVqQ0EsWUE4Qm1CLGdCQUFBLE1BQUE7QUFBQSx5QkE3QmpCLE1BNEJTO0FBQUEsVUE1QlRBLFlBNEJTLE9BQUEsRUFBQSxTQUFBLEdBQUEsR0E1Qk07QUFBQSw2QkFDYixNQUEwRDtBQUFBLGNBQTFEQyxnQkFBMEQsT0FBMUQsWUFBMERDLGdCQUExQixZQUFPLEtBQUssS0FBSyxHQUFBLENBQUE7QUFBQSxjQUNqREQsZ0JBeUJNLE9BekJOLFlBeUJNO0FBQUEsZ0JBeEJKQSxnQkFZTSxPQVpOLFlBWU07QUFBQSxrQkFYSkQsWUFVUyxPQUFBLE1BQUE7QUFBQSxxQ0FUUCxNQVFpQjtBQUFBLHNCQVJqQkEsWUFRaUIsY0FBQSxFQUFBLE9BQUEsY0FSSyxHQUFhO0FBQUEseUNBQ2pDLE1BQWdEO0FBQUEsMEJBQWhEQSxZQUFnRCwrQkFBQTtBQUFBLDRCQUE1QixNQUFLO0FBQUEsNEJBQVMsTUFBTSxLQUFJO0FBQUE7MEJBQzVDQyxnQkFFTSxPQUZOLFlBQ0tDLGdCQUFBLEtBQUEsS0FBSyxJQUFJLEdBQUEsQ0FBQTtBQUFBLDBCQUVkRCxnQkFBK0MsT0FBMUMsTUFBQSxrQkFBZ0JDLGdCQUFBLEtBQUEsS0FBSyxZQUFZLEdBQUEsQ0FBQTtBQUFBLDBCQUN0Q0QsZ0JBQTJCLE9BQUEsTUFBQUMsZ0JBQW5CLEtBQUksS0FBQyxLQUFLLEdBQUEsQ0FBQTtBQUFBLDBCQUNsQkQsZ0JBQWtDLE9BQUEsTUFBQUMsZ0JBQTFCLEtBQUksS0FBQyxZQUFZLEdBQUEsQ0FBQTtBQUFBOzs7Ozs7O2dCQUkvQkQsZ0JBVU0sT0FWTixZQVVNO0FBQUEsZ0NBVEpGLFlBQXVDLHdCQUFBO0FBQUEsb0JBQXpCLEtBQUssS0FBTyxRQUFDO0FBQUE7a0JBRTNCQyxZQU1FLHFCQUFBO0FBQUEsb0JBTEMsU0FBTyxTQUFRO0FBQUEsb0JBQ2hCLE9BQUEsRUFBb0IsU0FBQSxRQUFBO0FBQUEsb0JBQ3BCLE9BQU07QUFBQSxvQkFDTixPQUFNO0FBQUEsb0JBQ04sT0FBTTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7In0=
