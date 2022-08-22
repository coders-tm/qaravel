import { bv as mapState, _ as _export_sfc, bd as resolveComponent, S as openBlock, U as createBlock, V as withCtx, d as createVNode, a2 as QBtn, W as createBaseVNode, X as createElementBlock, Y as createCommentVNode, v as createComponent, x as onBeforeUnmount, h, aw as Transition, bB as shallowReactive, K as useRouterLinkProps, aj as useModelToggleProps, J as useDarkProps, al as useModelToggleEmits, L as useDark, r as ref, ap as useModelToggle, c as computed, w as watch, u as uid, aJ as QSeparator, g as getCurrentInstance, aH as withDirectives, aI as vShow, I as hSlot, a5 as QIcon, Q as stopAndPrevent, a0 as renderList, aT as Ripple, aa as normalizeClass, a6 as createTextVNode, $ as toDisplayString, F as Fragment, be as mergeProps } from "./index.b4c42063.js";
import { a as QToolbarTitle, Q as QToolbar } from "./QToolbar.c240042e.js";
import { Q as QSpace, a as QItemLabel, b as QDrawer } from "./QDrawer.5f2d86d9.js";
import { Q as QHeader } from "./QHeader.f1f85346.js";
import { u as useAppStore } from "./app.d97044fa.js";
import { _ as _imports_0 } from "./logo.422851b2.js";
import { Q as QItem, a as QItemSection, b as QList } from "./BaseAlert.c811579e.js";
const _sfc_main$2 = {
  emits: ["update-left-drawer"],
  methods: {
    onUpdateLeftDrawer() {
      this.$emit("update-left-drawer");
    }
  },
  computed: {
    ...mapState(useAppStore, ["user"])
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("img", {
  class: "self-center",
  width: "120",
  src: _imports_0
}, null, -1);
const _hoisted_2 = { class: "row no-wrap q-col-gutter-md" };
const _hoisted_3 = {
  key: 0,
  class: "column self-center"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_base_current_user_widget = resolveComponent("base-current-user-widget");
  return openBlock(), createBlock(QHeader, {
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
            dense: "",
            onClick: $options.onUpdateLeftDrawer
          }, null, 8, ["onClick"]),
          createVNode(QToolbarTitle, null, {
            default: withCtx(() => [
              _hoisted_1
            ]),
            _: 1
          }),
          createVNode(QSpace),
          createBaseVNode("div", _hoisted_2, [
            _ctx.user ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createVNode(_component_base_current_user_widget, {
                class: "q-pa-none cursor-pointer",
                style: { "width": "180px" }
              })
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var LayoutHeader = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "LayoutHeader.vue"]]);
var QSlideTransition = createComponent({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit }) {
    let animating = false, doneFn, element;
    let timer, timerFallback, animListener, lastEvent;
    function cleanup() {
      doneFn && doneFn();
      doneFn = null;
      animating = false;
      clearTimeout(timer);
      clearTimeout(timerFallback);
      element !== void 0 && element.removeEventListener("transitionend", animListener);
      animListener = null;
    }
    function begin(el, height, done) {
      el.style.overflowY = "hidden";
      if (height !== void 0) {
        el.style.height = `${height}px`;
      }
      el.style.transition = `height ${props.duration}ms cubic-bezier(.25, .8, .50, 1)`;
      animating = true;
      doneFn = done;
    }
    function end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;
      cleanup();
      event !== lastEvent && emit(event);
    }
    function onEnter(el, done) {
      let pos = 0;
      element = el;
      if (animating === true) {
        cleanup();
        pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
      } else {
        lastEvent = "hide";
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        el.style.height = `${el.scrollHeight}px`;
        animListener = (evt) => {
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "show");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    function onLeave(el, done) {
      let pos;
      element = el;
      if (animating === true) {
        cleanup();
      } else {
        lastEvent = "show";
        pos = el.scrollHeight;
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        el.style.height = 0;
        animListener = (evt) => {
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "hide");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    onBeforeUnmount(() => {
      animating === true && cleanup();
    });
    return () => h(Transition, {
      css: false,
      appear: props.appear,
      onEnter,
      onLeave
    }, slots.default);
  }
});
const itemGroups = shallowReactive({});
const LINK_PROPS = Object.keys(useRouterLinkProps);
var QExpansionItem = createComponent({
  name: "QExpansionItem",
  props: {
    ...useRouterLinkProps,
    ...useModelToggleProps,
    ...useDarkProps,
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [Array, String, Object],
    duration: Number,
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "after-show",
    "after-hide"
  ],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const showing = ref(
      props.modelValue !== null ? props.modelValue : props.defaultOpened
    );
    const blurTargetRef = ref(null);
    const { hide, toggle } = useModelToggle({ showing });
    let uniqueId, exitGroup;
    const classes = computed(
      () => `q-expansion-item q-item-type q-expansion-item--${showing.value === true ? "expanded" : "collapsed"} q-expansion-item--${props.popup === true ? "popup" : "standard"}`
    );
    const contentStyle = computed(() => {
      if (props.contentInsetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: props.contentInsetLevel * 56 + "px"
      };
    });
    const hasLink = computed(
      () => props.disable !== true && (props.href !== void 0 || props.to !== void 0 && props.to !== null && props.to !== "")
    );
    const linkProps = computed(() => {
      const acc = {};
      LINK_PROPS.forEach((key) => {
        acc[key] = props[key];
      });
      return acc;
    });
    const isClickable = computed(
      () => hasLink.value === true || props.expandIconToggle !== true
    );
    const expansionIcon = computed(() => props.expandedIcon !== void 0 && showing.value === true ? props.expandedIcon : props.expandIcon || $q.iconSet.expansionItem[props.denseToggle === true ? "denseIcon" : "icon"]);
    const activeToggleIcon = computed(
      () => props.disable !== true && (hasLink.value === true || props.expandIconToggle === true)
    );
    watch(() => props.group, (name) => {
      exitGroup !== void 0 && exitGroup();
      name !== void 0 && enterGroup();
    });
    function onHeaderClick(e) {
      hasLink.value !== true && toggle(e);
      emit("click", e);
    }
    function toggleIconKeyboard(e) {
      e.keyCode === 13 && toggleIcon(e, true);
    }
    function toggleIcon(e, keyboard) {
      keyboard !== true && blurTargetRef.value !== null && blurTargetRef.value.focus();
      toggle(e);
      stopAndPrevent(e);
    }
    function onShow() {
      emit("after-show");
    }
    function onHide() {
      emit("after-hide");
    }
    function enterGroup() {
      if (uniqueId === void 0) {
        uniqueId = uid();
      }
      if (showing.value === true) {
        itemGroups[props.group] = uniqueId;
      }
      const show = watch(showing, (val) => {
        if (val === true) {
          itemGroups[props.group] = uniqueId;
        } else if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
      });
      const group = watch(
        () => itemGroups[props.group],
        (val, oldVal) => {
          if (oldVal === uniqueId && val !== void 0 && val !== uniqueId) {
            hide();
          }
        }
      );
      exitGroup = () => {
        show();
        group();
        if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
        exitGroup = void 0;
      };
    }
    function getToggleIcon() {
      const data = {
        class: [
          `q-focusable relative-position cursor-pointer${props.denseToggle === true && props.switchToggleSide === true ? " items-end" : ""}`,
          props.expandIconClass
        ],
        side: props.switchToggleSide !== true,
        avatar: props.switchToggleSide
      };
      const child = [
        h(QIcon, {
          class: "q-expansion-item__toggle-icon" + (props.expandedIcon === void 0 && showing.value === true ? " q-expansion-item__toggle-icon--rotated" : ""),
          name: expansionIcon.value
        })
      ];
      if (activeToggleIcon.value === true) {
        Object.assign(data, {
          tabindex: 0,
          onClick: toggleIcon,
          onKeyup: toggleIconKeyboard
        });
        child.unshift(
          h("div", {
            ref: blurTargetRef,
            class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
            tabindex: -1
          })
        );
      }
      return h(QItemSection, data, () => child);
    }
    function getHeaderChild() {
      let child;
      if (slots.header !== void 0) {
        child = [].concat(slots.header({ expanded: showing.value === true }));
      } else {
        child = [
          h(QItemSection, () => [
            h(QItemLabel, { lines: props.labelLines }, () => props.label || ""),
            props.caption ? h(QItemLabel, { lines: props.captionLines, caption: true }, () => props.caption) : null
          ])
        ];
        props.icon && child[props.switchToggleSide === true ? "push" : "unshift"](
          h(QItemSection, {
            side: props.switchToggleSide === true,
            avatar: props.switchToggleSide !== true
          }, () => h(QIcon, { name: props.icon }))
        );
      }
      props.disable !== true && child[props.switchToggleSide === true ? "unshift" : "push"](
        getToggleIcon()
      );
      return child;
    }
    function getHeader() {
      const data = {
        ref: "item",
        style: props.headerStyle,
        class: props.headerClass,
        dark: isDark.value,
        disable: props.disable,
        dense: props.dense,
        insetLevel: props.headerInsetLevel
      };
      if (isClickable.value === true) {
        data.clickable = true;
        data.onClick = onHeaderClick;
        hasLink.value === true && Object.assign(
          data,
          linkProps.value
        );
      }
      return h(QItem, data, getHeaderChild);
    }
    function getTransitionChild() {
      return withDirectives(
        h("div", {
          key: "e-content",
          class: "q-expansion-item__content relative-position",
          style: contentStyle.value
        }, hSlot(slots.default)),
        [[
          vShow,
          showing.value
        ]]
      );
    }
    function getContent() {
      const node = [
        getHeader(),
        h(QSlideTransition, {
          duration: props.duration,
          onShow,
          onHide
        }, getTransitionChild)
      ];
      if (props.expandSeparator === true) {
        node.push(
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
            dark: isDark.value
          }),
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
            dark: isDark.value
          })
        );
      }
      return node;
    }
    props.group !== void 0 && enterGroup();
    onBeforeUnmount(() => {
      exitGroup !== void 0 && exitGroup();
    });
    return () => h("div", { class: classes.value }, [
      h("div", { class: "q-expansion-item__container relative-position" }, getContent())
    ]);
  }
});
const _sfc_main$1 = {
  props: {
    title: {
      type: String,
      required: true
    },
    route: {
      type: String,
      default: ""
    },
    params: {
      type: Object,
      default: () => ({})
    },
    icon: {
      type: String,
      default: ""
    },
    notification: [String, Number],
    subLinks: {
      type: [Object, Boolean],
      default: false
    }
  },
  computed: {
    active: {
      get() {
        return this.$route.meta.base === this.route;
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    isActive(item) {
      return item.route === this.$route.meta.module || item.route === this.$route.meta.premission || item.route === this.$route.name;
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.subLinks ? (openBlock(), createBlock(QExpansionItem, {
    key: 0,
    modelValue: $options.active,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.active = $event),
    icon: $props.icon,
    label: $props.title,
    "expand-icon-class": "hidden",
    "active-class": "sublink-active",
    to: { name: $props.route },
    dense: ""
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.subLinks, (item, index) => {
        return withDirectives((openBlock(), createBlock(QItem, {
          key: index,
          clickable: "",
          tag: "a",
          to: { name: item.route, params: item.params },
          "active-class": "active",
          class: normalizeClass({
            active: $options.isActive(item)
          }),
          exact: ""
        }, {
          default: withCtx(() => [
            createVNode(QItemSection, {
              avatar: "",
              style: { "min-width": "auto" },
              class: "q-pr-md"
            }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: item.icon,
                  size: "18px"
                }, null, 8, ["name"])
              ]),
              _: 2
            }, 1024),
            createVNode(QItemSection, { class: "title" }, {
              default: withCtx(() => [
                createVNode(QItemLabel, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(item.title), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["to", "class"])), [
          [Ripple]
        ]);
      }), 128))
    ]),
    _: 1
  }, 8, ["modelValue", "icon", "label", "to"])) : withDirectives((openBlock(), createBlock(QItem, {
    key: 1,
    clickable: "",
    tag: "a",
    to: { name: $props.route, params: $props.params },
    "active-class": "active"
  }, {
    default: withCtx(() => [
      createVNode(QItemSection, {
        avatar: "",
        style: { "min-width": "auto" },
        class: "q-pr-md"
      }, {
        default: withCtx(() => [
          createVNode(QIcon, {
            name: $props.icon,
            size: "18px"
          }, null, 8, ["name"])
        ]),
        _: 1
      }),
      createVNode(QItemSection, { class: "title" }, {
        default: withCtx(() => [
          createVNode(QItemLabel, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($props.title), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      $props.notification ? (openBlock(), createBlock(QItemSection, {
        key: 0,
        side: "",
        class: "notification"
      }, {
        default: withCtx(() => [
          createVNode(QBtn, {
            size: "10px",
            flat: "",
            class: "bg-primary text-bold",
            color: "white",
            label: $props.notification,
            round: "",
            dense: ""
          }, null, 8, ["label"])
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["to"])), [
    [Ripple]
  ]);
}
var LinksList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "LinksList.vue"]]);
const _sfc_main = {
  components: {
    LinksList
  },
  props: {
    modelValue: {
      required: false
    },
    sideMenus: {
      required: true,
      type: Array
    }
  },
  emits: ["update:model-value"],
  data() {
    return {
      value: this.modelValue
    };
  },
  methods: {
    toggle() {
      this.$refs.drawer.toggle();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_links_list = resolveComponent("links-list");
  return openBlock(), createBlock(QDrawer, {
    ref: "drawer",
    modelValue: $data.value,
    "onUpdate:modelValue": [
      _cache[0] || (_cache[0] = ($event) => $data.value = $event),
      _cache[1] || (_cache[1] = (val) => _ctx.$emit("update:model-value", val))
    ],
    "show-if-above": "",
    width: 250,
    side: "left",
    class: "bg-main text-black"
  }, {
    default: withCtx(() => [
      createVNode(QList, { class: "bg-white" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.sideMenus, (link) => {
            return openBlock(), createBlock(_component_links_list, mergeProps({
              class: "link-item",
              key: link.title
            }, link), null, 16);
          }), 128))
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
var LayoutDrawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "LayoutDrawer.vue"]]);
export { LayoutHeader as L, LayoutDrawer as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0RHJhd2VyLjE2MzVjNGExLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9MYXlvdXRIZWFkZXIudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2V4cGFuc2lvbi1pdGVtL1FFeHBhbnNpb25JdGVtLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvTGlua3NMaXN0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0xheW91dERyYXdlci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1oZWFkZXIgYm9yZGVyZWQgY2xhc3M9XCJiYXNlLWhlYWRlciBiZy13aGl0ZSB0ZXh0LWJsYWNrXCI+XG4gICAgPHEtdG9vbGJhcj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBmbGF0XG4gICAgICAgIHJvdW5kXG4gICAgICAgIHNpemU9XCIxNXB4XCJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgaWNvbj1cIm1lbnVcIlxuICAgICAgICBhcmlhLWxhYmVsPVwiTWVudVwiXG4gICAgICAgIGRlbnNlXG4gICAgICAgIEBjbGljaz1cIm9uVXBkYXRlTGVmdERyYXdlclwiXG4gICAgICAvPlxuICAgICAgPHEtdG9vbGJhci10aXRsZT5cbiAgICAgICAgPGltZyBjbGFzcz1cInNlbGYtY2VudGVyXCIgd2lkdGg9XCIxMjBcIiBzcmM9XCJ+YXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDwvcS10b29sYmFyLXRpdGxlPlxuICAgICAgPHEtc3BhY2UgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8td3JhcCBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgPGRpdiB2LWlmPVwidXNlclwiIGNsYXNzPVwiY29sdW1uIHNlbGYtY2VudGVyXCI+XG4gICAgICAgICAgPGJhc2UtY3VycmVudC11c2VyLXdpZGdldCBjbGFzcz1cInEtcGEtbm9uZSBjdXJzb3ItcG9pbnRlclwiIHN0eWxlPVwid2lkdGg6IDE4MHB4XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtdG9vbGJhcj5cbiAgPC9xLWhlYWRlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gJ3BpbmlhJztcbmltcG9ydCB7IHVzZUFwcFN0b3JlIH0gZnJvbSAnc3RvcmVzL2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZW1pdHM6IFsndXBkYXRlLWxlZnQtZHJhd2VyJ10sXG4gIG1ldGhvZHM6IHtcbiAgICBvblVwZGF0ZUxlZnREcmF3ZXIoKSB7XG4gICAgICB0aGlzLiRlbWl0KCd1cGRhdGUtbGVmdC1kcmF3ZXInKTtcbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcFN0YXRlKHVzZUFwcFN0b3JlLCBbJ3VzZXInXSksXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBoLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNsaWRlVHJhbnNpdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICBhcHBlYXI6IEJvb2xlYW4sXG4gICAgZHVyYXRpb246IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAnc2hvdycsICdoaWRlJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgbGV0IGFuaW1hdGluZyA9IGZhbHNlLCBkb25lRm4sIGVsZW1lbnRcbiAgICBsZXQgdGltZXIsIHRpbWVyRmFsbGJhY2ssIGFuaW1MaXN0ZW5lciwgbGFzdEV2ZW50XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIGRvbmVGbiAmJiBkb25lRm4oKVxuICAgICAgZG9uZUZuID0gbnVsbFxuICAgICAgYW5pbWF0aW5nID0gZmFsc2VcblxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyRmFsbGJhY2spXG4gICAgICBlbGVtZW50ICE9PSB2b2lkIDAgJiYgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgYW5pbUxpc3RlbmVyID0gbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZ2luIChlbCwgaGVpZ2h0LCBkb25lKSB7XG4gICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgICAgaWYgKGhlaWdodCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAkeyBoZWlnaHQgfXB4YFxuICAgICAgfVxuICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbiA9IGBoZWlnaHQgJHsgcHJvcHMuZHVyYXRpb24gfW1zIGN1YmljLWJlemllciguMjUsIC44LCAuNTAsIDEpYFxuXG4gICAgICBhbmltYXRpbmcgPSB0cnVlXG4gICAgICBkb25lRm4gPSBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kIChlbCwgZXZlbnQpIHtcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9IG51bGxcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IG51bGxcbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBudWxsXG4gICAgICBjbGVhbnVwKClcbiAgICAgIGV2ZW50ICE9PSBsYXN0RXZlbnQgJiYgZW1pdChldmVudClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVudGVyIChlbCwgZG9uZSkge1xuICAgICAgbGV0IHBvcyA9IDBcbiAgICAgIGVsZW1lbnQgPSBlbFxuXG4gICAgICBpZiAoYW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFudXAoKVxuICAgICAgICBwb3MgPSBlbC5vZmZzZXRIZWlnaHQgPT09IGVsLnNjcm9sbEhlaWdodCA/IDAgOiB2b2lkIDBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnaGlkZSdcbiAgICAgIH1cblxuICAgICAgYmVnaW4oZWwsIHBvcywgZG9uZSlcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7IGVsLnNjcm9sbEhlaWdodCB9cHhgXG4gICAgICAgIGFuaW1MaXN0ZW5lciA9IGV2dCA9PiB7XG4gICAgICAgICAgaWYgKE9iamVjdChldnQpICE9PSBldnQgfHwgZXZ0LnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVuZChlbCwgJ3Nob3cnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gc2V0VGltZW91dChhbmltTGlzdGVuZXIsIHByb3BzLmR1cmF0aW9uICogMS4xKVxuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTGVhdmUgKGVsLCBkb25lKSB7XG4gICAgICBsZXQgcG9zXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnc2hvdydcbiAgICAgICAgcG9zID0gZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIGJlZ2luKGVsLCBwb3MsIGRvbmUpXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IDBcbiAgICAgICAgYW5pbUxpc3RlbmVyID0gZXZ0ID0+IHtcbiAgICAgICAgICBpZiAoT2JqZWN0KGV2dCkgIT09IGV2dCB8fCBldnQudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgICAgZW5kKGVsLCAnaGlkZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBzZXRUaW1lb3V0KGFuaW1MaXN0ZW5lciwgcHJvcHMuZHVyYXRpb24gKiAxLjEpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGFuaW1hdGluZyA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoVHJhbnNpdGlvbiwge1xuICAgICAgY3NzOiBmYWxzZSxcbiAgICAgIGFwcGVhcjogcHJvcHMuYXBwZWFyLFxuICAgICAgb25FbnRlcixcbiAgICAgIG9uTGVhdmVcbiAgICB9LCBzbG90cy5kZWZhdWx0KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgc2hhbGxvd1JlYWN0aXZlLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSwgdlNob3csIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJdGVtIGZyb20gJy4uL2l0ZW0vUUl0ZW0uanMnXG5pbXBvcnQgUUl0ZW1TZWN0aW9uIGZyb20gJy4uL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzJ1xuaW1wb3J0IFFJdGVtTGFiZWwgZnJvbSAnLi4vaXRlbS9RSXRlbUxhYmVsLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNsaWRlVHJhbnNpdGlvbiBmcm9tICcuLi9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMnXG5pbXBvcnQgUVNlcGFyYXRvciBmcm9tICcuLi9zZXBhcmF0b3IvUVNlcGFyYXRvci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgdWlkIGZyb20gJy4uLy4uL3V0aWxzL3VpZC5qcydcblxuY29uc3QgaXRlbUdyb3VwcyA9IHNoYWxsb3dSZWFjdGl2ZSh7fSlcbmNvbnN0IExJTktfUFJPUFMgPSBPYmplY3Qua2V5cyh1c2VSb3V0ZXJMaW5rUHJvcHMpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRXhwYW5zaW9uSXRlbScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBpY29uOiBTdHJpbmcsXG5cbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGxhYmVsTGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGNhcHRpb246IFN0cmluZyxcbiAgICBjYXB0aW9uTGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgZXhwYW5kSWNvbjogU3RyaW5nLFxuICAgIGV4cGFuZGVkSWNvbjogU3RyaW5nLFxuICAgIGV4cGFuZEljb25DbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBkdXJhdGlvbjogTnVtYmVyLFxuXG4gICAgaGVhZGVySW5zZXRMZXZlbDogTnVtYmVyLFxuICAgIGNvbnRlbnRJbnNldExldmVsOiBOdW1iZXIsXG5cbiAgICBleHBhbmRTZXBhcmF0b3I6IEJvb2xlYW4sXG4gICAgZGVmYXVsdE9wZW5lZDogQm9vbGVhbixcbiAgICBleHBhbmRJY29uVG9nZ2xlOiBCb29sZWFuLFxuICAgIHN3aXRjaFRvZ2dsZVNpZGU6IEJvb2xlYW4sXG4gICAgZGVuc2VUb2dnbGU6IEJvb2xlYW4sXG4gICAgZ3JvdXA6IFN0cmluZyxcbiAgICBwb3B1cDogQm9vbGVhbixcblxuICAgIGhlYWRlclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGhlYWRlckNsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdhZnRlci1zaG93JywgJ2FmdGVyLWhpZGUnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBzaG93aW5nID0gcmVmKFxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbFxuICAgICAgICA/IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgICAgOiBwcm9wcy5kZWZhdWx0T3BlbmVkXG4gICAgKVxuXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgeyBoaWRlLCB0b2dnbGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHsgc2hvd2luZyB9KVxuXG4gICAgbGV0IHVuaXF1ZUlkLCBleGl0R3JvdXBcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZXhwYW5zaW9uLWl0ZW0gcS1pdGVtLXR5cGUnXG4gICAgICArIGAgcS1leHBhbnNpb24taXRlbS0tJHsgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJyB9YFxuICAgICAgKyBgIHEtZXhwYW5zaW9uLWl0ZW0tLSR7IHByb3BzLnBvcHVwID09PSB0cnVlID8gJ3BvcHVwJyA6ICdzdGFuZGFyZCcgfWBcbiAgICApXG5cbiAgICBjb25zdCBjb250ZW50U3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY29udGVudEluc2V0TGV2ZWwgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFsgJ3BhZGRpbmcnICsgZGlyIF06IChwcm9wcy5jb250ZW50SW5zZXRMZXZlbCAqIDU2KSArICdweCdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgaGFzTGluayA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIChcbiAgICAgICAgcHJvcHMuaHJlZiAhPT0gdm9pZCAwXG4gICAgICAgIHx8IChwcm9wcy50byAhPT0gdm9pZCAwICYmIHByb3BzLnRvICE9PSBudWxsICYmIHByb3BzLnRvICE9PSAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBsaW5rUHJvcHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuICAgICAgTElOS19QUk9QUy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGFjY1sga2V5IF0gPSBwcm9wc1sga2V5IF1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGV4cGFuc2lvbkljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5leHBhbmRlZEljb24gIT09IHZvaWQgMCAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuZXhwYW5kZWRJY29uXG4gICAgICAgIDogcHJvcHMuZXhwYW5kSWNvbiB8fCAkcS5pY29uU2V0LmV4cGFuc2lvbkl0ZW1bIHByb3BzLmRlbnNlVG9nZ2xlID09PSB0cnVlID8gJ2RlbnNlSWNvbicgOiAnaWNvbicgXVxuICAgICkpXG5cbiAgICBjb25zdCBhY3RpdmVUb2dnbGVJY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgKGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5ncm91cCwgbmFtZSA9PiB7XG4gICAgICBleGl0R3JvdXAgIT09IHZvaWQgMCAmJiBleGl0R3JvdXAoKVxuICAgICAgbmFtZSAhPT0gdm9pZCAwICYmIGVudGVyR3JvdXAoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkhlYWRlckNsaWNrIChlKSB7XG4gICAgICBoYXNMaW5rLnZhbHVlICE9PSB0cnVlICYmIHRvZ2dsZShlKVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUljb25LZXlib2FyZCAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAmJiB0b2dnbGVJY29uKGUsIHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSWNvbiAoZSwga2V5Ym9hcmQpIHtcbiAgICAgIGtleWJvYXJkICE9PSB0cnVlICYmIGJsdXJUYXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgYmx1clRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICB0b2dnbGUoZSlcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TaG93ICgpIHtcbiAgICAgIGVtaXQoJ2FmdGVyLXNob3cnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSGlkZSAoKSB7XG4gICAgICBlbWl0KCdhZnRlci1oaWRlJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbnRlckdyb3VwICgpIHtcbiAgICAgIGlmICh1bmlxdWVJZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVuaXF1ZUlkID0gdWlkKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9IHVuaXF1ZUlkXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3cgPSB3YXRjaChzaG93aW5nLCB2YWwgPT4ge1xuICAgICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9IHVuaXF1ZUlkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9PT0gdW5pcXVlSWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBjb25zdCBncm91cCA9IHdhdGNoKFxuICAgICAgICAoKSA9PiBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdLFxuICAgICAgICAodmFsLCBvbGRWYWwpID0+IHtcbiAgICAgICAgICBpZiAob2xkVmFsID09PSB1bmlxdWVJZCAmJiB2YWwgIT09IHZvaWQgMCAmJiB2YWwgIT09IHVuaXF1ZUlkKSB7XG4gICAgICAgICAgICBoaWRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcblxuICAgICAgZXhpdEdyb3VwID0gKCkgPT4ge1xuICAgICAgICBzaG93KClcbiAgICAgICAgZ3JvdXAoKVxuXG4gICAgICAgIGlmIChpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdID09PSB1bmlxdWVJZCkge1xuICAgICAgICAgIGRlbGV0ZSBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdXG4gICAgICAgIH1cblxuICAgICAgICBleGl0R3JvdXAgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUb2dnbGVJY29uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgJ3EtZm9jdXNhYmxlIHJlbGF0aXZlLXBvc2l0aW9uIGN1cnNvci1wb2ludGVyJ1xuICAgICAgICAgICAgKyBgJHsgcHJvcHMuZGVuc2VUb2dnbGUgPT09IHRydWUgJiYgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICcgaXRlbXMtZW5kJyA6ICcnIH1gLFxuICAgICAgICAgIHByb3BzLmV4cGFuZEljb25DbGFzc1xuICAgICAgICBdLFxuICAgICAgICBzaWRlOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlICE9PSB0cnVlLFxuICAgICAgICBhdmF0YXI6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGVcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1pY29uJ1xuICAgICAgICAgICAgKyAocHJvcHMuZXhwYW5kZWRJY29uID09PSB2b2lkIDAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/ICcgcS1leHBhbnNpb24taXRlbV9fdG9nZ2xlLWljb24tLXJvdGF0ZWQnXG4gICAgICAgICAgICAgIDogJycpLFxuICAgICAgICAgIG5hbWU6IGV4cGFuc2lvbkljb24udmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgaWYgKGFjdGl2ZVRvZ2dsZUljb24udmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgb25DbGljazogdG9nZ2xlSWNvbixcbiAgICAgICAgICBvbktleXVwOiB0b2dnbGVJY29uS2V5Ym9hcmRcbiAgICAgICAgfSlcblxuICAgICAgICBjaGlsZC51bnNoaWZ0KFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIHJlZjogYmx1clRhcmdldFJlZixcbiAgICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fdG9nZ2xlLWZvY3VzIHEtaWNvbiBxLWZvY3VzLWhlbHBlciBxLWZvY3VzLWhlbHBlci0tcm91bmRlZCcsXG4gICAgICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFFJdGVtU2VjdGlvbiwgZGF0YSwgKCkgPT4gY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyQ2hpbGQgKCkge1xuICAgICAgbGV0IGNoaWxkXG5cbiAgICAgIGlmIChzbG90cy5oZWFkZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZCA9IFtdLmNvbmNhdChzbG90cy5oZWFkZXIoeyBleHBhbmRlZDogc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSB9KSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IFtcbiAgICAgICAgICBoKFFJdGVtU2VjdGlvbiwgKCkgPT4gW1xuICAgICAgICAgICAgaChRSXRlbUxhYmVsLCB7IGxpbmVzOiBwcm9wcy5sYWJlbExpbmVzIH0sICgpID0+IHByb3BzLmxhYmVsIHx8ICcnKSxcblxuICAgICAgICAgICAgcHJvcHMuY2FwdGlvblxuICAgICAgICAgICAgICA/IGgoUUl0ZW1MYWJlbCwgeyBsaW5lczogcHJvcHMuY2FwdGlvbkxpbmVzLCBjYXB0aW9uOiB0cnVlIH0sICgpID0+IHByb3BzLmNhcHRpb24pXG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIF0pXG4gICAgICAgIF1cblxuICAgICAgICBwcm9wcy5pY29uICYmIGNoaWxkWyBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlID09PSB0cnVlID8gJ3B1c2gnIDogJ3Vuc2hpZnQnIF0oXG4gICAgICAgICAgaChRSXRlbVNlY3Rpb24sIHtcbiAgICAgICAgICAgIHNpZGU6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUsXG4gICAgICAgICAgICBhdmF0YXI6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgIT09IHRydWVcbiAgICAgICAgICB9LCAoKSA9PiBoKFFJY29uLCB7IG5hbWU6IHByb3BzLmljb24gfSkpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBjaGlsZFsgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJyBdKFxuICAgICAgICBnZXRUb2dnbGVJY29uKClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogJ2l0ZW0nLFxuICAgICAgICBzdHlsZTogcHJvcHMuaGVhZGVyU3R5bGUsXG4gICAgICAgIGNsYXNzOiBwcm9wcy5oZWFkZXJDbGFzcyxcbiAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlLFxuICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgIGluc2V0TGV2ZWw6IHByb3BzLmhlYWRlckluc2V0TGV2ZWxcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEuY2xpY2thYmxlID0gdHJ1ZVxuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBvbkhlYWRlckNsaWNrXG5cbiAgICAgICAgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgbGlua1Byb3BzLnZhbHVlXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUl0ZW0sIGRhdGEsIGdldEhlYWRlckNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25DaGlsZCAoKSB7XG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdlLWNvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fY29udGVudCByZWxhdGl2ZS1wb3NpdGlvbicsXG4gICAgICAgICAgc3R5bGU6IGNvbnRlbnRTdHlsZS52YWx1ZVxuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSksXG4gICAgICAgIFsgW1xuICAgICAgICAgIHZTaG93LFxuICAgICAgICAgIHNob3dpbmcudmFsdWVcbiAgICAgICAgXSBdXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBub2RlID0gW1xuICAgICAgICBnZXRIZWFkZXIoKSxcblxuICAgICAgICBoKFFTbGlkZVRyYW5zaXRpb24sIHtcbiAgICAgICAgICBkdXJhdGlvbjogcHJvcHMuZHVyYXRpb24sXG4gICAgICAgICAgb25TaG93LFxuICAgICAgICAgIG9uSGlkZVxuICAgICAgICB9LCBnZXRUcmFuc2l0aW9uQ2hpbGQpXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5leHBhbmRTZXBhcmF0b3IgPT09IHRydWUpIHtcbiAgICAgICAgbm9kZS5wdXNoKFxuICAgICAgICAgIGgoUVNlcGFyYXRvciwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXIgcS1leHBhbnNpb24taXRlbV9fYm9yZGVyLS10b3AgYWJzb2x1dGUtdG9wJyxcbiAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGgoUVNlcGFyYXRvciwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXIgcS1leHBhbnNpb24taXRlbV9fYm9yZGVyLS1ib3R0b20gYWJzb2x1dGUtYm90dG9tJyxcbiAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBwcm9wcy5ncm91cCAhPT0gdm9pZCAwICYmIGVudGVyR3JvdXAoKVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGV4aXRHcm91cCAhPT0gdm9pZCAwICYmIGV4aXRHcm91cCgpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIFtcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19jb250YWluZXIgcmVsYXRpdmUtcG9zaXRpb24nIH0sIGdldENvbnRlbnQoKSlcbiAgICBdKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8cS1leHBhbnNpb24taXRlbVxuICAgIHYtaWY9XCJzdWJMaW5rc1wiXG4gICAgdi1tb2RlbD1cImFjdGl2ZVwiXG4gICAgOmljb249XCJpY29uXCJcbiAgICA6bGFiZWw9XCJ0aXRsZVwiXG4gICAgZXhwYW5kLWljb24tY2xhc3M9XCJoaWRkZW5cIlxuICAgIGFjdGl2ZS1jbGFzcz1cInN1YmxpbmstYWN0aXZlXCJcbiAgICA6dG89XCJ7IG5hbWU6IHJvdXRlIH1cIlxuICAgIGRlbnNlXG4gID5cbiAgICA8cS1pdGVtXG4gICAgICB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gc3ViTGlua3NcIlxuICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgIGNsaWNrYWJsZVxuICAgICAgdGFnPVwiYVwiXG4gICAgICA6dG89XCJ7IG5hbWU6IGl0ZW0ucm91dGUsIHBhcmFtczogaXRlbS5wYXJhbXMgfVwiXG4gICAgICB2LXJpcHBsZVxuICAgICAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCJcbiAgICAgIDpjbGFzcz1cIntcbiAgICAgICAgYWN0aXZlOiBpc0FjdGl2ZShpdGVtKSxcbiAgICAgIH1cIlxuICAgICAgZXhhY3RcbiAgICA+XG4gICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyIHN0eWxlPVwibWluLXdpZHRoOiBhdXRvXCIgY2xhc3M9XCJxLXByLW1kXCI+XG4gICAgICAgIDxxLWljb24gOm5hbWU9XCJpdGVtLmljb25cIiBzaXplPVwiMThweFwiPjwvcS1pY29uPlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBpdGVtLnRpdGxlIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgIDwvcS1pdGVtPlxuICA8L3EtZXhwYW5zaW9uLWl0ZW0+XG4gIDxxLWl0ZW1cbiAgICB2LWVsc2VcbiAgICBjbGlja2FibGVcbiAgICB0YWc9XCJhXCJcbiAgICA6dG89XCJ7IG5hbWU6IHJvdXRlLCBwYXJhbXM6IHBhcmFtcyB9XCJcbiAgICB2LXJpcHBsZVxuICAgIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiXG4gID5cbiAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyIHN0eWxlPVwibWluLXdpZHRoOiBhdXRvXCIgY2xhc3M9XCJxLXByLW1kXCI+XG4gICAgICA8cS1pY29uIDpuYW1lPVwiaWNvblwiIHNpemU9XCIxOHB4XCI+PC9xLWljb24+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsPnt7IHRpdGxlIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB2LWlmPVwibm90aWZpY2F0aW9uXCIgc2lkZSBjbGFzcz1cIm5vdGlmaWNhdGlvblwiPlxuICAgICAgPHEtYnRuXG4gICAgICAgIHNpemU9XCIxMHB4XCJcbiAgICAgICAgZmxhdFxuICAgICAgICBjbGFzcz1cImJnLXByaW1hcnkgdGV4dC1ib2xkXCJcbiAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgIDpsYWJlbD1cIm5vdGlmaWNhdGlvblwiXG4gICAgICAgIHJvdW5kXG4gICAgICAgIGRlbnNlXG4gICAgICAvPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICByb3V0ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJycsXG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6ICgpID0+ICh7fSksXG4gICAgfSxcbiAgICBpY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJyxcbiAgICB9LFxuICAgIG5vdGlmaWNhdGlvbjogW1N0cmluZywgTnVtYmVyXSxcbiAgICBzdWJMaW5rczoge1xuICAgICAgdHlwZTogW09iamVjdCwgQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGFjdGl2ZToge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kcm91dGUubWV0YS5iYXNlID09PSB0aGlzLnJvdXRlO1xuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzQWN0aXZlKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGl0ZW0ucm91dGUgPT09IHRoaXMuJHJvdXRlLm1ldGEubW9kdWxlIHx8XG4gICAgICAgIGl0ZW0ucm91dGUgPT09IHRoaXMuJHJvdXRlLm1ldGEucHJlbWlzc2lvbiB8fFxuICAgICAgICBpdGVtLnJvdXRlID09PSB0aGlzLiRyb3V0ZS5uYW1lXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRyYXdlclxuICAgIHJlZj1cImRyYXdlclwiXG4gICAgdi1tb2RlbD1cInZhbHVlXCJcbiAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gJGVtaXQoJ3VwZGF0ZTptb2RlbC12YWx1ZScsIHZhbClcIlxuICAgIHNob3ctaWYtYWJvdmVcbiAgICA6d2lkdGg9XCIyNTBcIlxuICAgIHNpZGU9XCJsZWZ0XCJcbiAgICBjbGFzcz1cImJnLW1haW4gdGV4dC1ibGFja1wiXG4gID5cbiAgICA8cS1saXN0IGNsYXNzPVwiYmctd2hpdGVcIj5cbiAgICAgIDxsaW5rcy1saXN0IGNsYXNzPVwibGluay1pdGVtXCIgdi1mb3I9XCJsaW5rIGluIHNpZGVNZW51c1wiIDprZXk9XCJsaW5rLnRpdGxlXCIgdi1iaW5kPVwibGlua1wiIC8+XG4gICAgPC9xLWxpc3Q+XG4gIDwvcS1kcmF3ZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IExpbmtzTGlzdCBmcm9tICcuL0xpbmtzTGlzdC52dWUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBMaW5rc0xpc3QsXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgc2lkZU1lbnVzOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgIH0sXG4gIH0sXG4gIGVtaXRzOiBbJ3VwZGF0ZTptb2RlbC12YWx1ZSddLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5tb2RlbFZhbHVlLFxuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB0b2dnbGUoKSB7XG4gICAgICB0aGlzLiRyZWZzLmRyYXdlci50b2dnbGUoKTtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9zZmNfbWFpbiIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfbWVyZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQThCQSxNQUFLQSxjQUFVO0FBQUEsRUFDYixPQUFPLENBQUMsb0JBQW9CO0FBQUEsRUFDNUIsU0FBUztBQUFBLElBQ1AscUJBQXFCO0FBQ25CLFdBQUssTUFBTSxvQkFBb0I7QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFBQSxFQUNELFVBQVU7QUFBQSxJQUNSLEdBQUcsU0FBUyxhQUFhLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDbEM7QUFDSDttQkExQlFDLGdDQUE4RCxPQUFBO0FBQUEsRUFBekQsT0FBTTtBQUFBLEVBQWMsT0FBTTtBQUFBLEVBQU0sS0FBQTs7QUFHbEMsTUFBQSxhQUFBLEVBQUEsT0FBTSw4QkFBNkI7OztFQUNyQixPQUFNOzs7O3NCQWpCN0JDLFlBc0JXLFNBQUE7QUFBQSxJQXRCRCxVQUFBO0FBQUEsSUFBUyxPQUFNO0FBQUE7cUJBQ3ZCLE1Bb0JZO0FBQUEsTUFwQlpDLFlBb0JZLFVBQUEsTUFBQTtBQUFBLHlCQW5CVixNQVNFO0FBQUEsVUFURkEsWUFTRSxNQUFBO0FBQUEsWUFSQSxNQUFBO0FBQUEsWUFDQSxPQUFBO0FBQUEsWUFDQSxNQUFLO0FBQUEsWUFDTCxPQUFNO0FBQUEsWUFDTixNQUFLO0FBQUEsWUFDTCxjQUFXO0FBQUEsWUFDWCxPQUFBO0FBQUEsWUFDQyxTQUFPLFNBQWtCO0FBQUE7VUFFNUJBLFlBRWtCLGVBQUEsTUFBQTtBQUFBLDZCQURoQixNQUE4RDtBQUFBLGNBQTlEO0FBQUE7OztVQUVGQSxZQUFXLE1BQUE7QUFBQSxVQUNYRixnQkFJTSxPQUpOLFlBSU07QUFBQSxZQUhPLEtBQUksUUFBZkcsYUFBQUMsbUJBRU0sT0FGTixZQUVNO0FBQUEsY0FESkYsWUFBa0YscUNBQUE7QUFBQSxnQkFBeEQsT0FBTTtBQUFBLGdCQUEyQixPQUFBLEVBQW9CLFNBQUEsUUFBQTtBQUFBOzs7Ozs7Ozs7OztBQ2Z6RixJQUFBLG1CQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTyxDQUFFLFFBQVEsTUFBUTtBQUFBLEVBRXpCLE1BQU8sT0FBTyxFQUFFLE9BQU8sS0FBSSxHQUFJO0FBQzdCLFFBQUksWUFBWSxPQUFPLFFBQVE7QUFDL0IsUUFBSSxPQUFPLGVBQWUsY0FBYztBQUV4QyxhQUFTLFVBQVc7QUFDbEIsZ0JBQVUsT0FBUTtBQUNsQixlQUFTO0FBQ1Qsa0JBQVk7QUFFWixtQkFBYSxLQUFLO0FBQ2xCLG1CQUFhLGFBQWE7QUFDMUIsa0JBQVksVUFBVSxRQUFRLG9CQUFvQixpQkFBaUIsWUFBWTtBQUMvRSxxQkFBZTtBQUFBLElBQ2hCO0FBRUQsYUFBUyxNQUFPLElBQUksUUFBUSxNQUFNO0FBQ2hDLFNBQUcsTUFBTSxZQUFZO0FBQ3JCLFVBQUksV0FBVyxRQUFRO0FBQ3JCLFdBQUcsTUFBTSxTQUFTLEdBQUk7QUFBQSxNQUN2QjtBQUNELFNBQUcsTUFBTSxhQUFhLFVBQVcsTUFBTTtBQUV2QyxrQkFBWTtBQUNaLGVBQVM7QUFBQSxJQUNWO0FBRUQsYUFBUyxJQUFLLElBQUksT0FBTztBQUN2QixTQUFHLE1BQU0sWUFBWTtBQUNyQixTQUFHLE1BQU0sU0FBUztBQUNsQixTQUFHLE1BQU0sYUFBYTtBQUN0QixjQUFTO0FBQ1QsZ0JBQVUsYUFBYSxLQUFLLEtBQUs7QUFBQSxJQUNsQztBQUVELGFBQVMsUUFBUyxJQUFJLE1BQU07QUFDMUIsVUFBSSxNQUFNO0FBQ1YsZ0JBQVU7QUFFVixVQUFJLGNBQWMsTUFBTTtBQUN0QixnQkFBUztBQUNULGNBQU0sR0FBRyxpQkFBaUIsR0FBRyxlQUFlLElBQUk7QUFBQSxNQUNqRCxPQUNJO0FBQ0gsb0JBQVk7QUFBQSxNQUNiO0FBRUQsWUFBTSxJQUFJLEtBQUssSUFBSTtBQUVuQixjQUFRLFdBQVcsTUFBTTtBQUN2QixXQUFHLE1BQU0sU0FBUyxHQUFJLEdBQUc7QUFDekIsdUJBQWUsU0FBTztBQUNwQixjQUFJLE9BQU8sR0FBRyxNQUFNLE9BQU8sSUFBSSxXQUFXLElBQUk7QUFDNUMsZ0JBQUksSUFBSSxNQUFNO0FBQUEsVUFDZjtBQUFBLFFBQ0Y7QUFDRCxXQUFHLGlCQUFpQixpQkFBaUIsWUFBWTtBQUNqRCx3QkFBZ0IsV0FBVyxjQUFjLE1BQU0sV0FBVyxHQUFHO0FBQUEsTUFDOUQsR0FBRSxHQUFHO0FBQUEsSUFDUDtBQUVELGFBQVMsUUFBUyxJQUFJLE1BQU07QUFDMUIsVUFBSTtBQUNKLGdCQUFVO0FBRVYsVUFBSSxjQUFjLE1BQU07QUFDdEIsZ0JBQVM7QUFBQSxNQUNWLE9BQ0k7QUFDSCxvQkFBWTtBQUNaLGNBQU0sR0FBRztBQUFBLE1BQ1Y7QUFFRCxZQUFNLElBQUksS0FBSyxJQUFJO0FBRW5CLGNBQVEsV0FBVyxNQUFNO0FBQ3ZCLFdBQUcsTUFBTSxTQUFTO0FBQ2xCLHVCQUFlLFNBQU87QUFDcEIsY0FBSSxPQUFPLEdBQUcsTUFBTSxPQUFPLElBQUksV0FBVyxJQUFJO0FBQzVDLGdCQUFJLElBQUksTUFBTTtBQUFBLFVBQ2Y7QUFBQSxRQUNGO0FBQ0QsV0FBRyxpQkFBaUIsaUJBQWlCLFlBQVk7QUFDakQsd0JBQWdCLFdBQVcsY0FBYyxNQUFNLFdBQVcsR0FBRztBQUFBLE1BQzlELEdBQUUsR0FBRztBQUFBLElBQ1A7QUFFRCxvQkFBZ0IsTUFBTTtBQUNwQixvQkFBYyxRQUFRLFFBQVM7QUFBQSxJQUNyQyxDQUFLO0FBRUQsV0FBTyxNQUFNLEVBQUUsWUFBWTtBQUFBLE1BQ3pCLEtBQUs7QUFBQSxNQUNMLFFBQVEsTUFBTTtBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsSUFDTixHQUFPLE1BQU0sT0FBTztBQUFBLEVBQ2pCO0FBQ0gsQ0FBQztBQ2hHRCxNQUFNLGFBQWEsZ0JBQWdCLEVBQUU7QUFDckMsTUFBTSxhQUFhLE9BQU8sS0FBSyxrQkFBa0I7QUFFakQsSUFBQSxpQkFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFFSCxNQUFNO0FBQUEsSUFFTixPQUFPO0FBQUEsSUFDUCxZQUFZLENBQUUsUUFBUSxNQUFRO0FBQUEsSUFFOUIsU0FBUztBQUFBLElBQ1QsY0FBYyxDQUFFLFFBQVEsTUFBUTtBQUFBLElBRWhDLE9BQU87QUFBQSxJQUVQLFlBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLGlCQUFpQixDQUFFLE9BQU8sUUFBUSxNQUFRO0FBQUEsSUFDMUMsVUFBVTtBQUFBLElBRVYsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFFbkIsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsSUFDbEIsa0JBQWtCO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBRVAsYUFBYSxDQUFFLE9BQU8sUUFBUSxNQUFRO0FBQUEsSUFDdEMsYUFBYSxDQUFFLE9BQU8sUUFBUSxNQUFRO0FBQUEsRUFDdkM7QUFBQSxFQUVELE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNIO0FBQUEsSUFBUztBQUFBLElBQWM7QUFBQSxFQUN4QjtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsVUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFJLEVBQUEsSUFBSyxtQkFBb0I7QUFDOUMsVUFBTSxTQUFTLFFBQVEsT0FBTyxFQUFFO0FBRWhDLFVBQU0sVUFBVTtBQUFBLE1BQ2QsTUFBTSxlQUFlLE9BQ2pCLE1BQU0sYUFDTixNQUFNO0FBQUEsSUFDWDtBQUVELFVBQU0sZ0JBQWdCLElBQUksSUFBSTtBQUU5QixVQUFNLEVBQUUsTUFBTSxPQUFNLElBQUssZUFBZSxFQUFFLFFBQU8sQ0FBRTtBQUVuRCxRQUFJLFVBQVU7QUFFZCxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLGtEQUN5QixRQUFRLFVBQVUsT0FBTyxhQUFhLGlDQUN0QyxNQUFNLFVBQVUsT0FBTyxVQUFVO0FBQUEsSUFDM0Q7QUFFRCxVQUFNLGVBQWUsU0FBUyxNQUFNO0FBQ2xDLFVBQUksTUFBTSxzQkFBc0IsUUFBUTtBQUN0QyxlQUFPO0FBQUEsTUFDUjtBQUVELFlBQU0sTUFBTSxHQUFHLEtBQUssUUFBUSxPQUFPLFVBQVU7QUFDN0MsYUFBTztBQUFBLFFBQ0wsQ0FBRSxZQUFZLE1BQVEsTUFBTSxvQkFBb0IsS0FBTTtBQUFBLE1BQ3ZEO0FBQUEsSUFDUCxDQUFLO0FBRUQsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixNQUFNLFlBQVksU0FDaEIsTUFBTSxTQUFTLFVBQ1gsTUFBTSxPQUFPLFVBQVUsTUFBTSxPQUFPLFFBQVEsTUFBTSxPQUFPO0FBQUEsSUFFaEU7QUFFRCxVQUFNLFlBQVksU0FBUyxNQUFNO0FBQy9CLFlBQU0sTUFBTSxDQUFFO0FBQ2QsaUJBQVcsUUFBUSxTQUFPO0FBQ3hCLFlBQUssT0FBUSxNQUFPO0FBQUEsTUFDNUIsQ0FBTztBQUNELGFBQU87QUFBQSxJQUNiLENBQUs7QUFFRCxVQUFNLGNBQWM7QUFBQSxNQUFTLE1BQzNCLFFBQVEsVUFBVSxRQUFRLE1BQU0scUJBQXFCO0FBQUEsSUFDdEQ7QUFFRCxVQUFNLGdCQUFnQixTQUFTLE1BQzdCLE1BQU0saUJBQWlCLFVBQVUsUUFBUSxVQUFVLE9BQy9DLE1BQU0sZUFDTixNQUFNLGNBQWMsR0FBRyxRQUFRLGNBQWUsTUFBTSxnQkFBZ0IsT0FBTyxjQUFjLE9BQzlGO0FBRUQsVUFBTSxtQkFBbUI7QUFBQSxNQUFTLE1BQ2hDLE1BQU0sWUFBWSxTQUFTLFFBQVEsVUFBVSxRQUFRLE1BQU0scUJBQXFCO0FBQUEsSUFDakY7QUFFRCxVQUFNLE1BQU0sTUFBTSxPQUFPLFVBQVE7QUFDL0Isb0JBQWMsVUFBVSxVQUFXO0FBQ25DLGVBQVMsVUFBVSxXQUFZO0FBQUEsSUFDckMsQ0FBSztBQUVELGFBQVMsY0FBZSxHQUFHO0FBQ3pCLGNBQVEsVUFBVSxRQUFRLE9BQU8sQ0FBQztBQUNsQyxXQUFLLFNBQVMsQ0FBQztBQUFBLElBQ2hCO0FBRUQsYUFBUyxtQkFBb0IsR0FBRztBQUM5QixRQUFFLFlBQVksTUFBTSxXQUFXLEdBQUcsSUFBSTtBQUFBLElBQ3ZDO0FBRUQsYUFBUyxXQUFZLEdBQUcsVUFBVTtBQUNoQyxtQkFBYSxRQUFRLGNBQWMsVUFBVSxRQUFRLGNBQWMsTUFBTSxNQUFPO0FBQ2hGLGFBQU8sQ0FBQztBQUNSLHFCQUFlLENBQUM7QUFBQSxJQUNqQjtBQUVELGFBQVMsU0FBVTtBQUNqQixXQUFLLFlBQVk7QUFBQSxJQUNsQjtBQUVELGFBQVMsU0FBVTtBQUNqQixXQUFLLFlBQVk7QUFBQSxJQUNsQjtBQUVELGFBQVMsYUFBYztBQUNyQixVQUFJLGFBQWEsUUFBUTtBQUN2QixtQkFBVyxJQUFLO0FBQUEsTUFDakI7QUFFRCxVQUFJLFFBQVEsVUFBVSxNQUFNO0FBQzFCLG1CQUFZLE1BQU0sU0FBVTtBQUFBLE1BQzdCO0FBRUQsWUFBTSxPQUFPLE1BQU0sU0FBUyxTQUFPO0FBQ2pDLFlBQUksUUFBUSxNQUFNO0FBQ2hCLHFCQUFZLE1BQU0sU0FBVTtBQUFBLFFBQzdCLFdBQ1EsV0FBWSxNQUFNLFdBQVksVUFBVTtBQUMvQyxpQkFBTyxXQUFZLE1BQU07QUFBQSxRQUMxQjtBQUFBLE1BQ1QsQ0FBTztBQUVELFlBQU0sUUFBUTtBQUFBLFFBQ1osTUFBTSxXQUFZLE1BQU07QUFBQSxRQUN4QixDQUFDLEtBQUssV0FBVztBQUNmLGNBQUksV0FBVyxZQUFZLFFBQVEsVUFBVSxRQUFRLFVBQVU7QUFDN0QsaUJBQU07QUFBQSxVQUNQO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFRCxrQkFBWSxNQUFNO0FBQ2hCLGFBQU07QUFDTixjQUFPO0FBRVAsWUFBSSxXQUFZLE1BQU0sV0FBWSxVQUFVO0FBQzFDLGlCQUFPLFdBQVksTUFBTTtBQUFBLFFBQzFCO0FBRUQsb0JBQVk7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUVELGFBQVMsZ0JBQWlCO0FBQ3hCLFlBQU0sT0FBTztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0wsK0NBQ1EsTUFBTSxnQkFBZ0IsUUFBUSxNQUFNLHFCQUFxQixPQUFPLGVBQWU7QUFBQSxVQUN2RixNQUFNO0FBQUEsUUFDUDtBQUFBLFFBQ0QsTUFBTSxNQUFNLHFCQUFxQjtBQUFBLFFBQ2pDLFFBQVEsTUFBTTtBQUFBLE1BQ2Y7QUFFRCxZQUFNLFFBQVE7QUFBQSxRQUNaLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTyxtQ0FDRixNQUFNLGlCQUFpQixVQUFVLFFBQVEsVUFBVSxPQUNsRCw0Q0FDQTtBQUFBLFVBQ04sTUFBTSxjQUFjO0FBQUEsUUFDOUIsQ0FBUztBQUFBLE1BQ0Y7QUFFRCxVQUFJLGlCQUFpQixVQUFVLE1BQU07QUFDbkMsZUFBTyxPQUFPLE1BQU07QUFBQSxVQUNsQixVQUFVO0FBQUEsVUFDVixTQUFTO0FBQUEsVUFDVCxTQUFTO0FBQUEsUUFDbkIsQ0FBUztBQUVELGNBQU07QUFBQSxVQUNKLEVBQUUsT0FBTztBQUFBLFlBQ1AsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsVUFBVTtBQUFBLFVBQ3RCLENBQVc7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVELGFBQU8sRUFBRSxjQUFjLE1BQU0sTUFBTSxLQUFLO0FBQUEsSUFDekM7QUFFRCxhQUFTLGlCQUFrQjtBQUN6QixVQUFJO0FBRUosVUFBSSxNQUFNLFdBQVcsUUFBUTtBQUMzQixnQkFBUSxDQUFFLEVBQUMsT0FBTyxNQUFNLE9BQU8sRUFBRSxVQUFVLFFBQVEsVUFBVSxLQUFJLENBQUUsQ0FBQztBQUFBLE1BQ3JFLE9BQ0k7QUFDSCxnQkFBUTtBQUFBLFVBQ04sRUFBRSxjQUFjLE1BQU07QUFBQSxZQUNwQixFQUFFLFlBQVksRUFBRSxPQUFPLE1BQU0sV0FBVSxHQUFJLE1BQU0sTUFBTSxTQUFTLEVBQUU7QUFBQSxZQUVsRSxNQUFNLFVBQ0YsRUFBRSxZQUFZLEVBQUUsT0FBTyxNQUFNLGNBQWMsU0FBUyxLQUFNLEdBQUUsTUFBTSxNQUFNLE9BQU8sSUFDL0U7QUFBQSxVQUNoQixDQUFXO0FBQUEsUUFDRjtBQUVELGNBQU0sUUFBUSxNQUFPLE1BQU0scUJBQXFCLE9BQU8sU0FBUztBQUFBLFVBQzlELEVBQUUsY0FBYztBQUFBLFlBQ2QsTUFBTSxNQUFNLHFCQUFxQjtBQUFBLFlBQ2pDLFFBQVEsTUFBTSxxQkFBcUI7QUFBQSxVQUMvQyxHQUFhLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLEtBQUksQ0FBRSxDQUFDO0FBQUEsUUFDeEM7QUFBQSxNQUNGO0FBRUQsWUFBTSxZQUFZLFFBQVEsTUFBTyxNQUFNLHFCQUFxQixPQUFPLFlBQVk7QUFBQSxRQUM3RSxjQUFlO0FBQUEsTUFDaEI7QUFFRCxhQUFPO0FBQUEsSUFDUjtBQUVELGFBQVMsWUFBYTtBQUNwQixZQUFNLE9BQU87QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sTUFBTTtBQUFBLFFBQ2IsT0FBTyxNQUFNO0FBQUEsUUFDYixNQUFNLE9BQU87QUFBQSxRQUNiLFNBQVMsTUFBTTtBQUFBLFFBQ2YsT0FBTyxNQUFNO0FBQUEsUUFDYixZQUFZLE1BQU07QUFBQSxNQUNuQjtBQUVELFVBQUksWUFBWSxVQUFVLE1BQU07QUFDOUIsYUFBSyxZQUFZO0FBQ2pCLGFBQUssVUFBVTtBQUVmLGdCQUFRLFVBQVUsUUFBUSxPQUFPO0FBQUEsVUFDL0I7QUFBQSxVQUNBLFVBQVU7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUVELGFBQU8sRUFBRSxPQUFPLE1BQU0sY0FBYztBQUFBLElBQ3JDO0FBRUQsYUFBUyxxQkFBc0I7QUFDN0IsYUFBTztBQUFBLFFBQ0wsRUFBRSxPQUFPO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxPQUFPLGFBQWE7QUFBQSxRQUM5QixHQUFXLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxRQUN2QixDQUFFO0FBQUEsVUFDQTtBQUFBLFVBQ0EsUUFBUTtBQUFBLFFBQ2xCLENBQVc7QUFBQSxNQUNKO0FBQUEsSUFDRjtBQUVELGFBQVMsYUFBYztBQUNyQixZQUFNLE9BQU87QUFBQSxRQUNYLFVBQVc7QUFBQSxRQUVYLEVBQUUsa0JBQWtCO0FBQUEsVUFDbEIsVUFBVSxNQUFNO0FBQUEsVUFDaEI7QUFBQSxVQUNBO0FBQUEsUUFDRCxHQUFFLGtCQUFrQjtBQUFBLE1BQ3RCO0FBRUQsVUFBSSxNQUFNLG9CQUFvQixNQUFNO0FBQ2xDLGFBQUs7QUFBQSxVQUNILEVBQUUsWUFBWTtBQUFBLFlBQ1osT0FBTztBQUFBLFlBQ1AsTUFBTSxPQUFPO0FBQUEsVUFDekIsQ0FBVztBQUFBLFVBQ0QsRUFBRSxZQUFZO0FBQUEsWUFDWixPQUFPO0FBQUEsWUFDUCxNQUFNLE9BQU87QUFBQSxVQUN6QixDQUFXO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFRCxhQUFPO0FBQUEsSUFDUjtBQUVELFVBQU0sVUFBVSxVQUFVLFdBQVk7QUFFdEMsb0JBQWdCLE1BQU07QUFDcEIsb0JBQWMsVUFBVSxVQUFXO0FBQUEsSUFDekMsQ0FBSztBQUVELFdBQU8sTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLFFBQVEsU0FBUztBQUFBLE1BQzlDLEVBQUUsT0FBTyxFQUFFLE9BQU8sZ0RBQWlELEdBQUUsV0FBVSxDQUFFO0FBQUEsSUFDdkYsQ0FBSztBQUFBLEVBQ0Y7QUFDSCxDQUFDO0FDcFJELE1BQUtILGNBQVU7QUFBQSxFQUNiLE9BQU87QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNYO0FBQUEsSUFDRCxPQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUyxPQUFPLENBQUE7QUFBQSxJQUNqQjtBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUNELGNBQWMsQ0FBQyxRQUFRLE1BQU07QUFBQSxJQUM3QixVQUFVO0FBQUEsTUFDUixNQUFNLENBQUMsUUFBUSxPQUFPO0FBQUEsTUFDdEIsU0FBUztBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDRCxVQUFVO0FBQUEsSUFDUixRQUFRO0FBQUEsTUFDTixNQUFNO0FBQ0osZUFBTyxLQUFLLE9BQU8sS0FBSyxTQUFTLEtBQUs7QUFBQSxNQUN2QztBQUFBLE1BQ0QsSUFBSSxLQUFLO0FBQ1AsZUFBTztBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0QsU0FBUztBQUFBLElBQ1AsU0FBUyxNQUFNO0FBQ2IsYUFDRSxLQUFLLFVBQVUsS0FBSyxPQUFPLEtBQUssVUFDaEMsS0FBSyxVQUFVLEtBQUssT0FBTyxLQUFLLGNBQ2hDLEtBQUssVUFBVSxLQUFLLE9BQU87QUFBQSxJQUU5QjtBQUFBLEVBQ0Y7QUFDSDs7U0F6R1UsT0FBUSx5QkFEaEJFLFlBK0JtQixnQkFBQTtBQUFBO2dCQTdCUixTQUFNO0FBQUEsaUVBQU4sU0FBTSxTQUFBO0FBQUEsSUFDZCxNQUFNLE9BQUk7QUFBQSxJQUNWLE9BQU8sT0FBSztBQUFBLElBQ2IscUJBQWtCO0FBQUEsSUFDbEIsZ0JBQWE7QUFBQSxJQUNaLFlBQVksT0FBSyxNQUFBO0FBQUEsSUFDbEIsT0FBQTtBQUFBO3FCQUdFLE1BQWlDO0FBQUEsT0FEbkNFLFVBQUEsSUFBQSxHQUFBQyxtQkFvQlNDLFVBbkJpQixNQUFBQyxXQUFBLE9BQUEsVUFBaEIsQ0FBQSxNQUFNLFVBQUs7NENBRHJCTCxZQW9CUyxPQUFBO0FBQUEsVUFsQk4sS0FBSztBQUFBLFVBQ04sV0FBQTtBQUFBLFVBQ0EsS0FBSTtBQUFBLFVBQ0gsWUFBWSxLQUFLLE9BQWUsUUFBQSxLQUFLLE9BQU07QUFBQSxVQUU1QyxnQkFBYTtBQUFBLFVBQ1osT0FBS00sZUFBQTtBQUFBLFlBQW9CLFFBQUEsU0FBQSxTQUFTLElBQUk7QUFBQTtVQUd2QyxPQUFBO0FBQUE7MkJBRUEsTUFFaUI7QUFBQSxZQUZqQkwsWUFFaUIsY0FBQTtBQUFBLGNBRkQsUUFBQTtBQUFBLGNBQU8sT0FBQSxFQUF1QixhQUFBLE9BQUE7QUFBQSxjQUFDLE9BQU07QUFBQTsrQkFDbkQsTUFBK0M7QUFBQSxnQkFBL0NBLFlBQStDLE9BQUE7QUFBQSxrQkFBdEMsTUFBTSxLQUFLO0FBQUEsa0JBQU0sTUFBSztBQUFBOzs7O1lBR2pDQSxZQUVpQixjQUFBLEVBQUEsT0FBQSxRQUZJLEdBQUE7QUFBQSwrQkFDbkIsTUFBNkM7QUFBQSxnQkFBN0NBLFlBQTZDLFlBQUEsTUFBQTtBQUFBLG1DQUEvQixNQUFnQjtBQUFBLG9CQUFiTSxnQkFBQUMsZ0JBQUEsS0FBSyxLQUFLLEdBQUEsQ0FBQTtBQUFBOzs7Ozs7Ozs7Ozs7OzsrRUFJakNSLFlBMkJTLE9BQUE7QUFBQTtJQXpCUCxXQUFBO0FBQUEsSUFDQSxLQUFJO0FBQUEsSUFDSCxJQUFFLEVBQUEsTUFBVSxPQUFLLE9BQUEsUUFBVSxPQUFNLE9BQUE7QUFBQSxJQUVsQyxnQkFBYTtBQUFBO3FCQUViLE1BRWlCO0FBQUEsTUFGakJDLFlBRWlCLGNBQUE7QUFBQSxRQUZELFFBQUE7QUFBQSxRQUFPLE9BQUEsRUFBdUIsYUFBQSxPQUFBO0FBQUEsUUFBQyxPQUFNO0FBQUE7eUJBQ25ELE1BQTBDO0FBQUEsVUFBMUNBLFlBQTBDLE9BQUE7QUFBQSxZQUFqQyxNQUFNLE9BQUk7QUFBQSxZQUFFLE1BQUs7QUFBQTs7OztNQUc1QkEsWUFFaUIsY0FBQSxFQUFBLE9BQUEsUUFGSSxHQUFBO0FBQUEseUJBQ25CLE1BQXdDO0FBQUEsVUFBeENBLFlBQXdDLFlBQUEsTUFBQTtBQUFBLDZCQUExQixNQUFXO0FBQUEsOENBQVIsT0FBSyxLQUFBLEdBQUEsQ0FBQTtBQUFBOzs7Ozs7TUFHRixPQUFZLDZCQUFsQ0QsWUFVaUIsY0FBQTtBQUFBO1FBVm1CLE1BQUE7QUFBQSxRQUFLLE9BQU07QUFBQTt5QkFDN0MsTUFRRTtBQUFBLFVBUkZDLFlBUUUsTUFBQTtBQUFBLFlBUEEsTUFBSztBQUFBLFlBQ0wsTUFBQTtBQUFBLFlBQ0EsT0FBTTtBQUFBLFlBQ04sT0FBTTtBQUFBLFlBQ0wsT0FBTyxPQUFZO0FBQUEsWUFDcEIsT0FBQTtBQUFBLFlBQ0EsT0FBQTtBQUFBOzs7Ozs7Ozs7OztBQ3RDUixNQUFLLFlBQVU7QUFBQSxFQUNiLFlBQVk7QUFBQSxJQUNWO0FBQUEsRUFDRDtBQUFBLEVBQ0QsT0FBTztBQUFBLElBQ0wsWUFBWTtBQUFBLE1BQ1YsVUFBVTtBQUFBLElBQ1g7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0QsT0FBTyxDQUFDLG9CQUFvQjtBQUFBLEVBQzVCLE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxPQUFPLEtBQUs7QUFBQTtFQUVmO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQ1AsV0FBSyxNQUFNLE9BQU87SUFDbkI7QUFBQSxFQUNGO0FBQ0g7OztzQkExQ0VELFlBWVcsU0FBQTtBQUFBLElBWFQsS0FBSTtBQUFBLGdCQUNLLE1BQUs7QUFBQTs0Q0FBTCxNQUFLLFFBQUE7QUFBQSxpQ0FDUSxRQUFRLEtBQUssTUFBQSxzQkFBdUIsR0FBRztBQUFBO0lBQzdELGlCQUFBO0FBQUEsSUFDQyxPQUFPO0FBQUEsSUFDUixNQUFLO0FBQUEsSUFDTCxPQUFNO0FBQUE7cUJBRU4sTUFFUztBQUFBLE1BRlRDLFlBRVMsT0FBQSxFQUFBLE9BQUEsV0FGSSxHQUFXO0FBQUEseUJBQ1EsTUFBeUI7QUFBQSw0QkFBdkRFLG1CQUEwRkMsVUFBQSxNQUFBQyxXQUE3QyxPQUFTLFdBQUEsQ0FBakIsU0FBSTtBQUF6QyxtQkFBQUgsVUFBQSxHQUFBRixZQUEwRix1QkFBMUZTLFdBQTBGO0FBQUEsY0FBOUUsT0FBTTtBQUFBLGNBQXVDLEtBQUssS0FBSztBQUFBLGVBQWUsSUFBSSxHQUFBLE1BQUEsRUFBQTtBQUFBOzs7Ozs7Ozs7OyJ9
