import { Q as QLayout, a as QPageContainer } from "./logo.1c05ebb7.js";
import { L as LayoutHeader, a as LayoutDrawer } from "./LayoutDrawer.4b6aea49.js";
import { _ as _export_sfc, bv as mapState, bd as resolveComponent, U as createBlock, V as withCtx, S as openBlock, d as createVNode } from "./index.8d5ea4b7.js";
import { u as useAppStore } from "./app.89142b40.js";
import "./QToolbar.562c56d5.js";
import "./QDrawer.9837841e.js";
import "./QHeader.cc19d22f.js";
import "./BaseAlert.7b9d1a3e.js";
import "./api.ea8a70e6.js";
import "./lodash.2b44b28e.js";
const _sfc_main = {
  components: { LayoutHeader, LayoutDrawer },
  computed: {
    ...mapState(useAppStore, ["statistics"]),
    sideMenus() {
      return [
        {
          title: "Dashboard",
          icon: "fas fa-tachometer-alt",
          route: "Dashboard"
        },
        {
          title: "Confidential Listings",
          icon: "fas fa-laptop-house",
          route: "Confidential Listings"
        },
        {
          title: "Listings",
          icon: "fas fa-home",
          route: "Property Listings"
        },
        {
          title: "Enquiries",
          icon: "fas fa-paper-plane",
          route: "Enquiry Index",
          notification: this.statistics.unseen_enquiry
        },
        {
          title: "Tags",
          icon: "fas fa-tag",
          route: "Tags"
        },
        {
          title: "Types",
          icon: "fas fa-tag",
          route: "Types"
        },
        {
          title: "Categories",
          icon: "fas fa-tag",
          route: "Categories"
        }
      ];
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_layout_header = resolveComponent("layout-header");
  const _component_layout_drawer = resolveComponent("layout-drawer");
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, {
    view: "hHh Lpr fFf",
    class: "bg-main"
  }, {
    default: withCtx(() => [
      createVNode(_component_layout_header, {
        onUpdateLeftDrawer: _cache[0] || (_cache[0] = ($event) => _ctx.$refs.layoutDrawer.toggle())
      }),
      createVNode(_component_layout_drawer, {
        class: "admin-side-links",
        ref: "layoutDrawer",
        "side-menus": $options.sideMenus
      }, null, 8, ["side-menus"]),
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
var AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "AdminLayout.vue"]]);
export { AdminLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5MYXlvdXQuNjlmM2QwZTYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXRzL0FkbWluTGF5b3V0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWxheW91dCB2aWV3PVwiaEhoIExwciBmRmZcIiBjbGFzcz1cImJnLW1haW5cIj5cbiAgICA8bGF5b3V0LWhlYWRlciBAdXBkYXRlLWxlZnQtZHJhd2VyPVwiJHJlZnMubGF5b3V0RHJhd2VyLnRvZ2dsZSgpXCIgLz5cblxuICAgIDxsYXlvdXQtZHJhd2VyXG4gICAgICBjbGFzcz1cImFkbWluLXNpZGUtbGlua3NcIlxuICAgICAgcmVmPVwibGF5b3V0RHJhd2VyXCJcbiAgICAgIDpzaWRlLW1lbnVzPVwic2lkZU1lbnVzXCJcbiAgICAvPlxuXG4gICAgPHEtcGFnZS1jb250YWluZXI+XG4gICAgICA8cm91dGVyLXZpZXcgOmtleT1cIiRyb3V0ZXIuZnVsbFBhdGhcIiAvPlxuICAgIDwvcS1wYWdlLWNvbnRhaW5lcj5cbiAgPC9xLWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTGF5b3V0SGVhZGVyIGZyb20gXCJjb21wb25lbnRzL0xheW91dEhlYWRlci52dWVcIjtcbmltcG9ydCBMYXlvdXREcmF3ZXIgZnJvbSBcImNvbXBvbmVudHMvTGF5b3V0RHJhd2VyLnZ1ZVwiO1xuaW1wb3J0IHsgbWFwU3RhdGUgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IHVzZUFwcFN0b3JlIH0gZnJvbSBcInN0b3Jlcy9hcHBcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IExheW91dEhlYWRlciwgTGF5b3V0RHJhd2VyIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgLi4ubWFwU3RhdGUodXNlQXBwU3RvcmUsIFtcInN0YXRpc3RpY3NcIl0pLFxuICAgIHNpZGVNZW51cygpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogXCJEYXNoYm9hcmRcIixcbiAgICAgICAgICBpY29uOiBcImZhcyBmYS10YWNob21ldGVyLWFsdFwiLFxuICAgICAgICAgIHJvdXRlOiBcIkRhc2hib2FyZFwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwiQ29uZmlkZW50aWFsIExpc3RpbmdzXCIsXG4gICAgICAgICAgaWNvbjogXCJmYXMgZmEtbGFwdG9wLWhvdXNlXCIsXG4gICAgICAgICAgcm91dGU6IFwiQ29uZmlkZW50aWFsIExpc3RpbmdzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogXCJMaXN0aW5nc1wiLFxuICAgICAgICAgIGljb246IFwiZmFzIGZhLWhvbWVcIixcbiAgICAgICAgICByb3V0ZTogXCJQcm9wZXJ0eSBMaXN0aW5nc1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwiRW5xdWlyaWVzXCIsXG4gICAgICAgICAgaWNvbjogXCJmYXMgZmEtcGFwZXItcGxhbmVcIixcbiAgICAgICAgICByb3V0ZTogXCJFbnF1aXJ5IEluZGV4XCIsXG4gICAgICAgICAgbm90aWZpY2F0aW9uOiB0aGlzLnN0YXRpc3RpY3MudW5zZWVuX2VucXVpcnksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogXCJUYWdzXCIsXG4gICAgICAgICAgaWNvbjogXCJmYXMgZmEtdGFnXCIsXG4gICAgICAgICAgcm91dGU6IFwiVGFnc1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwiVHlwZXNcIixcbiAgICAgICAgICBpY29uOiBcImZhcyBmYS10YWdcIixcbiAgICAgICAgICByb3V0ZTogXCJUeXBlc1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwiQ2F0ZWdvcmllc1wiLFxuICAgICAgICAgIGljb246IFwiZmFzIGZhLXRhZ1wiLFxuICAgICAgICAgIHJvdXRlOiBcIkNhdGVnb3JpZXNcIixcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFzQkEsTUFBSyxZQUFVO0FBQUEsRUFDYixZQUFZLEVBQUUsY0FBYyxhQUFjO0FBQUEsRUFDMUMsVUFBVTtBQUFBLElBQ1IsR0FBRyxTQUFTLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFBQSxJQUN2QyxZQUFZO0FBQ1YsYUFBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRDtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQSxRQUNEO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0Q7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxVQUNQLGNBQWMsS0FBSyxXQUFXO0FBQUEsUUFDL0I7QUFBQSxRQUNEO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDUjtBQUFBLFFBQ0Q7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNSO0FBQUEsUUFDRDtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1I7QUFBQTtJQUVKO0FBQUEsRUFDRjtBQUNIOzs7OztzQkFsRUVBLFlBWVcsU0FBQTtBQUFBLElBWkQsTUFBSztBQUFBLElBQWMsT0FBTTtBQUFBO3FCQUNqQyxNQUFtRTtBQUFBLE1BQW5FQyxZQUFtRSwwQkFBQTtBQUFBLFFBQW5ELG9CQUFvQixPQUFBLE9BQUEsT0FBQSxLQUFBLFlBQUEsS0FBQSxNQUFNLGFBQWEsT0FBTTtBQUFBO01BRTdEQSxZQUlFLDBCQUFBO0FBQUEsUUFIQSxPQUFNO0FBQUEsUUFDTixLQUFJO0FBQUEsUUFDSCxjQUFZLFNBQVM7QUFBQTtNQUd4QkEsWUFFbUIsZ0JBQUEsTUFBQTtBQUFBLHlCQURqQixNQUF1QztBQUFBLHdCQUF2Q0QsWUFBdUMsd0JBQUE7QUFBQSxZQUF6QixLQUFLLEtBQU8sUUFBQztBQUFBOzs7Ozs7Ozs7OyJ9
