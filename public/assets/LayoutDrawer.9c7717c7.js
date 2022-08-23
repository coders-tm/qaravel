import { bv as mapState, _ as _export_sfc, bd as resolveComponent, S as openBlock, U as createBlock, V as withCtx, d as createVNode, a2 as QBtn, W as createBaseVNode, X as createElementBlock, Y as createCommentVNode, v as createComponent, x as onBeforeUnmount, h, aw as Transition, bB as shallowReactive, K as useRouterLinkProps, aj as useModelToggleProps, J as useDarkProps, al as useModelToggleEmits, L as useDark, r as ref, ap as useModelToggle, c as computed, w as watch, u as uid, aJ as QSeparator, g as getCurrentInstance, aH as withDirectives, aI as vShow, I as hSlot, a5 as QIcon, Q as stopAndPrevent, a0 as renderList, aT as Ripple, aa as normalizeClass, a6 as createTextVNode, $ as toDisplayString, F as Fragment, be as mergeProps } from "./index.94c1c68b.js";
import { Q as QToolbarTitle } from "./QToolbarTitle.6fb5e67d.js";
import { Q as QSpace } from "./QSpace.a4fd6aed.js";
import { Q as QToolbar } from "./QToolbar.9688c05b.js";
import { Q as QHeader } from "./QHeader.fa68a155.js";
import { u as useAppStore } from "./app.a880281b.js";
import { _ as _imports_0 } from "./logo.8dc3ac27.js";
import { Q as QItem, a as QItemSection, b as QList } from "./BaseAlert.abd8bfd6.js";
import { Q as QItemLabel, a as QDrawer } from "./QDrawer.52c6c3cc.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0RHJhd2VyLjljNzcxN2M3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9MYXlvdXRIZWFkZXIudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2V4cGFuc2lvbi1pdGVtL1FFeHBhbnNpb25JdGVtLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvTGlua3NMaXN0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0xheW91dERyYXdlci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1oZWFkZXIgYm9yZGVyZWQgY2xhc3M9XCJiYXNlLWhlYWRlciBiZy13aGl0ZSB0ZXh0LWJsYWNrXCI+XG4gICAgPHEtdG9vbGJhcj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBmbGF0XG4gICAgICAgIHJvdW5kXG4gICAgICAgIHNpemU9XCIxNXB4XCJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgaWNvbj1cIm1lbnVcIlxuICAgICAgICBhcmlhLWxhYmVsPVwiTWVudVwiXG4gICAgICAgIGRlbnNlXG4gICAgICAgIEBjbGljaz1cIm9uVXBkYXRlTGVmdERyYXdlclwiXG4gICAgICAvPlxuICAgICAgPHEtdG9vbGJhci10aXRsZT5cbiAgICAgICAgPGltZyBjbGFzcz1cInNlbGYtY2VudGVyXCIgd2lkdGg9XCIxMjBcIiBzcmM9XCJ+YXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDwvcS10b29sYmFyLXRpdGxlPlxuICAgICAgPHEtc3BhY2UgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8td3JhcCBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgPGRpdiB2LWlmPVwidXNlclwiIGNsYXNzPVwiY29sdW1uIHNlbGYtY2VudGVyXCI+XG4gICAgICAgICAgPGJhc2UtY3VycmVudC11c2VyLXdpZGdldCBjbGFzcz1cInEtcGEtbm9uZSBjdXJzb3ItcG9pbnRlclwiIHN0eWxlPVwid2lkdGg6IDE4MHB4XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtdG9vbGJhcj5cbiAgPC9xLWhlYWRlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gJ3BpbmlhJztcbmltcG9ydCB7IHVzZUFwcFN0b3JlIH0gZnJvbSAnc3RvcmVzL2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZW1pdHM6IFsndXBkYXRlLWxlZnQtZHJhd2VyJ10sXG4gIG1ldGhvZHM6IHtcbiAgICBvblVwZGF0ZUxlZnREcmF3ZXIoKSB7XG4gICAgICB0aGlzLiRlbWl0KCd1cGRhdGUtbGVmdC1kcmF3ZXInKTtcbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcFN0YXRlKHVzZUFwcFN0b3JlLCBbJ3VzZXInXSksXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBoLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNsaWRlVHJhbnNpdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICBhcHBlYXI6IEJvb2xlYW4sXG4gICAgZHVyYXRpb246IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAnc2hvdycsICdoaWRlJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgbGV0IGFuaW1hdGluZyA9IGZhbHNlLCBkb25lRm4sIGVsZW1lbnRcbiAgICBsZXQgdGltZXIsIHRpbWVyRmFsbGJhY2ssIGFuaW1MaXN0ZW5lciwgbGFzdEV2ZW50XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIGRvbmVGbiAmJiBkb25lRm4oKVxuICAgICAgZG9uZUZuID0gbnVsbFxuICAgICAgYW5pbWF0aW5nID0gZmFsc2VcblxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyRmFsbGJhY2spXG4gICAgICBlbGVtZW50ICE9PSB2b2lkIDAgJiYgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgYW5pbUxpc3RlbmVyID0gbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZ2luIChlbCwgaGVpZ2h0LCBkb25lKSB7XG4gICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgICAgaWYgKGhlaWdodCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAkeyBoZWlnaHQgfXB4YFxuICAgICAgfVxuICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbiA9IGBoZWlnaHQgJHsgcHJvcHMuZHVyYXRpb24gfW1zIGN1YmljLWJlemllciguMjUsIC44LCAuNTAsIDEpYFxuXG4gICAgICBhbmltYXRpbmcgPSB0cnVlXG4gICAgICBkb25lRm4gPSBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kIChlbCwgZXZlbnQpIHtcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9IG51bGxcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IG51bGxcbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBudWxsXG4gICAgICBjbGVhbnVwKClcbiAgICAgIGV2ZW50ICE9PSBsYXN0RXZlbnQgJiYgZW1pdChldmVudClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVudGVyIChlbCwgZG9uZSkge1xuICAgICAgbGV0IHBvcyA9IDBcbiAgICAgIGVsZW1lbnQgPSBlbFxuXG4gICAgICBpZiAoYW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFudXAoKVxuICAgICAgICBwb3MgPSBlbC5vZmZzZXRIZWlnaHQgPT09IGVsLnNjcm9sbEhlaWdodCA/IDAgOiB2b2lkIDBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnaGlkZSdcbiAgICAgIH1cblxuICAgICAgYmVnaW4oZWwsIHBvcywgZG9uZSlcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7IGVsLnNjcm9sbEhlaWdodCB9cHhgXG4gICAgICAgIGFuaW1MaXN0ZW5lciA9IGV2dCA9PiB7XG4gICAgICAgICAgaWYgKE9iamVjdChldnQpICE9PSBldnQgfHwgZXZ0LnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVuZChlbCwgJ3Nob3cnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gc2V0VGltZW91dChhbmltTGlzdGVuZXIsIHByb3BzLmR1cmF0aW9uICogMS4xKVxuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTGVhdmUgKGVsLCBkb25lKSB7XG4gICAgICBsZXQgcG9zXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnc2hvdydcbiAgICAgICAgcG9zID0gZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIGJlZ2luKGVsLCBwb3MsIGRvbmUpXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IDBcbiAgICAgICAgYW5pbUxpc3RlbmVyID0gZXZ0ID0+IHtcbiAgICAgICAgICBpZiAoT2JqZWN0KGV2dCkgIT09IGV2dCB8fCBldnQudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgICAgZW5kKGVsLCAnaGlkZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBzZXRUaW1lb3V0KGFuaW1MaXN0ZW5lciwgcHJvcHMuZHVyYXRpb24gKiAxLjEpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGFuaW1hdGluZyA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoVHJhbnNpdGlvbiwge1xuICAgICAgY3NzOiBmYWxzZSxcbiAgICAgIGFwcGVhcjogcHJvcHMuYXBwZWFyLFxuICAgICAgb25FbnRlcixcbiAgICAgIG9uTGVhdmVcbiAgICB9LCBzbG90cy5kZWZhdWx0KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgc2hhbGxvd1JlYWN0aXZlLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSwgdlNob3csIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJdGVtIGZyb20gJy4uL2l0ZW0vUUl0ZW0uanMnXG5pbXBvcnQgUUl0ZW1TZWN0aW9uIGZyb20gJy4uL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzJ1xuaW1wb3J0IFFJdGVtTGFiZWwgZnJvbSAnLi4vaXRlbS9RSXRlbUxhYmVsLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNsaWRlVHJhbnNpdGlvbiBmcm9tICcuLi9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMnXG5pbXBvcnQgUVNlcGFyYXRvciBmcm9tICcuLi9zZXBhcmF0b3IvUVNlcGFyYXRvci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgdWlkIGZyb20gJy4uLy4uL3V0aWxzL3VpZC5qcydcblxuY29uc3QgaXRlbUdyb3VwcyA9IHNoYWxsb3dSZWFjdGl2ZSh7fSlcbmNvbnN0IExJTktfUFJPUFMgPSBPYmplY3Qua2V5cyh1c2VSb3V0ZXJMaW5rUHJvcHMpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRXhwYW5zaW9uSXRlbScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBpY29uOiBTdHJpbmcsXG5cbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGxhYmVsTGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGNhcHRpb246IFN0cmluZyxcbiAgICBjYXB0aW9uTGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgZXhwYW5kSWNvbjogU3RyaW5nLFxuICAgIGV4cGFuZGVkSWNvbjogU3RyaW5nLFxuICAgIGV4cGFuZEljb25DbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBkdXJhdGlvbjogTnVtYmVyLFxuXG4gICAgaGVhZGVySW5zZXRMZXZlbDogTnVtYmVyLFxuICAgIGNvbnRlbnRJbnNldExldmVsOiBOdW1iZXIsXG5cbiAgICBleHBhbmRTZXBhcmF0b3I6IEJvb2xlYW4sXG4gICAgZGVmYXVsdE9wZW5lZDogQm9vbGVhbixcbiAgICBleHBhbmRJY29uVG9nZ2xlOiBCb29sZWFuLFxuICAgIHN3aXRjaFRvZ2dsZVNpZGU6IEJvb2xlYW4sXG4gICAgZGVuc2VUb2dnbGU6IEJvb2xlYW4sXG4gICAgZ3JvdXA6IFN0cmluZyxcbiAgICBwb3B1cDogQm9vbGVhbixcblxuICAgIGhlYWRlclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGhlYWRlckNsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdhZnRlci1zaG93JywgJ2FmdGVyLWhpZGUnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBzaG93aW5nID0gcmVmKFxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbFxuICAgICAgICA/IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgICAgOiBwcm9wcy5kZWZhdWx0T3BlbmVkXG4gICAgKVxuXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgeyBoaWRlLCB0b2dnbGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHsgc2hvd2luZyB9KVxuXG4gICAgbGV0IHVuaXF1ZUlkLCBleGl0R3JvdXBcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZXhwYW5zaW9uLWl0ZW0gcS1pdGVtLXR5cGUnXG4gICAgICArIGAgcS1leHBhbnNpb24taXRlbS0tJHsgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJyB9YFxuICAgICAgKyBgIHEtZXhwYW5zaW9uLWl0ZW0tLSR7IHByb3BzLnBvcHVwID09PSB0cnVlID8gJ3BvcHVwJyA6ICdzdGFuZGFyZCcgfWBcbiAgICApXG5cbiAgICBjb25zdCBjb250ZW50U3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY29udGVudEluc2V0TGV2ZWwgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFsgJ3BhZGRpbmcnICsgZGlyIF06IChwcm9wcy5jb250ZW50SW5zZXRMZXZlbCAqIDU2KSArICdweCdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgaGFzTGluayA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIChcbiAgICAgICAgcHJvcHMuaHJlZiAhPT0gdm9pZCAwXG4gICAgICAgIHx8IChwcm9wcy50byAhPT0gdm9pZCAwICYmIHByb3BzLnRvICE9PSBudWxsICYmIHByb3BzLnRvICE9PSAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBsaW5rUHJvcHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuICAgICAgTElOS19QUk9QUy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGFjY1sga2V5IF0gPSBwcm9wc1sga2V5IF1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGV4cGFuc2lvbkljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5leHBhbmRlZEljb24gIT09IHZvaWQgMCAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuZXhwYW5kZWRJY29uXG4gICAgICAgIDogcHJvcHMuZXhwYW5kSWNvbiB8fCAkcS5pY29uU2V0LmV4cGFuc2lvbkl0ZW1bIHByb3BzLmRlbnNlVG9nZ2xlID09PSB0cnVlID8gJ2RlbnNlSWNvbicgOiAnaWNvbicgXVxuICAgICkpXG5cbiAgICBjb25zdCBhY3RpdmVUb2dnbGVJY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgKGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5ncm91cCwgbmFtZSA9PiB7XG4gICAgICBleGl0R3JvdXAgIT09IHZvaWQgMCAmJiBleGl0R3JvdXAoKVxuICAgICAgbmFtZSAhPT0gdm9pZCAwICYmIGVudGVyR3JvdXAoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkhlYWRlckNsaWNrIChlKSB7XG4gICAgICBoYXNMaW5rLnZhbHVlICE9PSB0cnVlICYmIHRvZ2dsZShlKVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUljb25LZXlib2FyZCAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAmJiB0b2dnbGVJY29uKGUsIHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSWNvbiAoZSwga2V5Ym9hcmQpIHtcbiAgICAgIGtleWJvYXJkICE9PSB0cnVlICYmIGJsdXJUYXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgYmx1clRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICB0b2dnbGUoZSlcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TaG93ICgpIHtcbiAgICAgIGVtaXQoJ2FmdGVyLXNob3cnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSGlkZSAoKSB7XG4gICAgICBlbWl0KCdhZnRlci1oaWRlJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbnRlckdyb3VwICgpIHtcbiAgICAgIGlmICh1bmlxdWVJZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVuaXF1ZUlkID0gdWlkKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9IHVuaXF1ZUlkXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3cgPSB3YXRjaChzaG93aW5nLCB2YWwgPT4ge1xuICAgICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9IHVuaXF1ZUlkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9PT0gdW5pcXVlSWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBjb25zdCBncm91cCA9IHdhdGNoKFxuICAgICAgICAoKSA9PiBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdLFxuICAgICAgICAodmFsLCBvbGRWYWwpID0+IHtcbiAgICAgICAgICBpZiAob2xkVmFsID09PSB1bmlxdWVJZCAmJiB2YWwgIT09IHZvaWQgMCAmJiB2YWwgIT09IHVuaXF1ZUlkKSB7XG4gICAgICAgICAgICBoaWRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcblxuICAgICAgZXhpdEdyb3VwID0gKCkgPT4ge1xuICAgICAgICBzaG93KClcbiAgICAgICAgZ3JvdXAoKVxuXG4gICAgICAgIGlmIChpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdID09PSB1bmlxdWVJZCkge1xuICAgICAgICAgIGRlbGV0ZSBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdXG4gICAgICAgIH1cblxuICAgICAgICBleGl0R3JvdXAgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUb2dnbGVJY29uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgJ3EtZm9jdXNhYmxlIHJlbGF0aXZlLXBvc2l0aW9uIGN1cnNvci1wb2ludGVyJ1xuICAgICAgICAgICAgKyBgJHsgcHJvcHMuZGVuc2VUb2dnbGUgPT09IHRydWUgJiYgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICcgaXRlbXMtZW5kJyA6ICcnIH1gLFxuICAgICAgICAgIHByb3BzLmV4cGFuZEljb25DbGFzc1xuICAgICAgICBdLFxuICAgICAgICBzaWRlOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlICE9PSB0cnVlLFxuICAgICAgICBhdmF0YXI6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGVcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1pY29uJ1xuICAgICAgICAgICAgKyAocHJvcHMuZXhwYW5kZWRJY29uID09PSB2b2lkIDAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/ICcgcS1leHBhbnNpb24taXRlbV9fdG9nZ2xlLWljb24tLXJvdGF0ZWQnXG4gICAgICAgICAgICAgIDogJycpLFxuICAgICAgICAgIG5hbWU6IGV4cGFuc2lvbkljb24udmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgaWYgKGFjdGl2ZVRvZ2dsZUljb24udmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgb25DbGljazogdG9nZ2xlSWNvbixcbiAgICAgICAgICBvbktleXVwOiB0b2dnbGVJY29uS2V5Ym9hcmRcbiAgICAgICAgfSlcblxuICAgICAgICBjaGlsZC51bnNoaWZ0KFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIHJlZjogYmx1clRhcmdldFJlZixcbiAgICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fdG9nZ2xlLWZvY3VzIHEtaWNvbiBxLWZvY3VzLWhlbHBlciBxLWZvY3VzLWhlbHBlci0tcm91bmRlZCcsXG4gICAgICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFFJdGVtU2VjdGlvbiwgZGF0YSwgKCkgPT4gY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyQ2hpbGQgKCkge1xuICAgICAgbGV0IGNoaWxkXG5cbiAgICAgIGlmIChzbG90cy5oZWFkZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZCA9IFtdLmNvbmNhdChzbG90cy5oZWFkZXIoeyBleHBhbmRlZDogc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSB9KSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IFtcbiAgICAgICAgICBoKFFJdGVtU2VjdGlvbiwgKCkgPT4gW1xuICAgICAgICAgICAgaChRSXRlbUxhYmVsLCB7IGxpbmVzOiBwcm9wcy5sYWJlbExpbmVzIH0sICgpID0+IHByb3BzLmxhYmVsIHx8ICcnKSxcblxuICAgICAgICAgICAgcHJvcHMuY2FwdGlvblxuICAgICAgICAgICAgICA/IGgoUUl0ZW1MYWJlbCwgeyBsaW5lczogcHJvcHMuY2FwdGlvbkxpbmVzLCBjYXB0aW9uOiB0cnVlIH0sICgpID0+IHByb3BzLmNhcHRpb24pXG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIF0pXG4gICAgICAgIF1cblxuICAgICAgICBwcm9wcy5pY29uICYmIGNoaWxkWyBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlID09PSB0cnVlID8gJ3B1c2gnIDogJ3Vuc2hpZnQnIF0oXG4gICAgICAgICAgaChRSXRlbVNlY3Rpb24sIHtcbiAgICAgICAgICAgIHNpZGU6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUsXG4gICAgICAgICAgICBhdmF0YXI6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgIT09IHRydWVcbiAgICAgICAgICB9LCAoKSA9PiBoKFFJY29uLCB7IG5hbWU6IHByb3BzLmljb24gfSkpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBjaGlsZFsgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJyBdKFxuICAgICAgICBnZXRUb2dnbGVJY29uKClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogJ2l0ZW0nLFxuICAgICAgICBzdHlsZTogcHJvcHMuaGVhZGVyU3R5bGUsXG4gICAgICAgIGNsYXNzOiBwcm9wcy5oZWFkZXJDbGFzcyxcbiAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlLFxuICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgIGluc2V0TGV2ZWw6IHByb3BzLmhlYWRlckluc2V0TGV2ZWxcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEuY2xpY2thYmxlID0gdHJ1ZVxuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBvbkhlYWRlckNsaWNrXG5cbiAgICAgICAgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgbGlua1Byb3BzLnZhbHVlXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUl0ZW0sIGRhdGEsIGdldEhlYWRlckNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25DaGlsZCAoKSB7XG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdlLWNvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fY29udGVudCByZWxhdGl2ZS1wb3NpdGlvbicsXG4gICAgICAgICAgc3R5bGU6IGNvbnRlbnRTdHlsZS52YWx1ZVxuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSksXG4gICAgICAgIFsgW1xuICAgICAgICAgIHZTaG93LFxuICAgICAgICAgIHNob3dpbmcudmFsdWVcbiAgICAgICAgXSBdXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBub2RlID0gW1xuICAgICAgICBnZXRIZWFkZXIoKSxcblxuICAgICAgICBoKFFTbGlkZVRyYW5zaXRpb24sIHtcbiAgICAgICAgICBkdXJhdGlvbjogcHJvcHMuZHVyYXRpb24sXG4gICAgICAgICAgb25TaG93LFxuICAgICAgICAgIG9uSGlkZVxuICAgICAgICB9LCBnZXRUcmFuc2l0aW9uQ2hpbGQpXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5leHBhbmRTZXBhcmF0b3IgPT09IHRydWUpIHtcbiAgICAgICAgbm9kZS5wdXNoKFxuICAgICAgICAgIGgoUVNlcGFyYXRvciwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXIgcS1leHBhbnNpb24taXRlbV9fYm9yZGVyLS10b3AgYWJzb2x1dGUtdG9wJyxcbiAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGgoUVNlcGFyYXRvciwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXIgcS1leHBhbnNpb24taXRlbV9fYm9yZGVyLS1ib3R0b20gYWJzb2x1dGUtYm90dG9tJyxcbiAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBwcm9wcy5ncm91cCAhPT0gdm9pZCAwICYmIGVudGVyR3JvdXAoKVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGV4aXRHcm91cCAhPT0gdm9pZCAwICYmIGV4aXRHcm91cCgpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIFtcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19jb250YWluZXIgcmVsYXRpdmUtcG9zaXRpb24nIH0sIGdldENvbnRlbnQoKSlcbiAgICBdKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8cS1leHBhbnNpb24taXRlbVxuICAgIHYtaWY9XCJzdWJMaW5rc1wiXG4gICAgdi1tb2RlbD1cImFjdGl2ZVwiXG4gICAgOmljb249XCJpY29uXCJcbiAgICA6bGFiZWw9XCJ0aXRsZVwiXG4gICAgZXhwYW5kLWljb24tY2xhc3M9XCJoaWRkZW5cIlxuICAgIGFjdGl2ZS1jbGFzcz1cInN1YmxpbmstYWN0aXZlXCJcbiAgICA6dG89XCJ7IG5hbWU6IHJvdXRlIH1cIlxuICAgIGRlbnNlXG4gID5cbiAgICA8cS1pdGVtXG4gICAgICB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gc3ViTGlua3NcIlxuICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgIGNsaWNrYWJsZVxuICAgICAgdGFnPVwiYVwiXG4gICAgICA6dG89XCJ7IG5hbWU6IGl0ZW0ucm91dGUsIHBhcmFtczogaXRlbS5wYXJhbXMgfVwiXG4gICAgICB2LXJpcHBsZVxuICAgICAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCJcbiAgICAgIDpjbGFzcz1cIntcbiAgICAgICAgYWN0aXZlOiBpc0FjdGl2ZShpdGVtKSxcbiAgICAgIH1cIlxuICAgICAgZXhhY3RcbiAgICA+XG4gICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyIHN0eWxlPVwibWluLXdpZHRoOiBhdXRvXCIgY2xhc3M9XCJxLXByLW1kXCI+XG4gICAgICAgIDxxLWljb24gOm5hbWU9XCJpdGVtLmljb25cIiBzaXplPVwiMThweFwiPjwvcS1pY29uPlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBpdGVtLnRpdGxlIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgIDwvcS1pdGVtPlxuICA8L3EtZXhwYW5zaW9uLWl0ZW0+XG4gIDxxLWl0ZW1cbiAgICB2LWVsc2VcbiAgICBjbGlja2FibGVcbiAgICB0YWc9XCJhXCJcbiAgICA6dG89XCJ7IG5hbWU6IHJvdXRlLCBwYXJhbXM6IHBhcmFtcyB9XCJcbiAgICB2LXJpcHBsZVxuICAgIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiXG4gID5cbiAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyIHN0eWxlPVwibWluLXdpZHRoOiBhdXRvXCIgY2xhc3M9XCJxLXByLW1kXCI+XG4gICAgICA8cS1pY29uIDpuYW1lPVwiaWNvblwiIHNpemU9XCIxOHB4XCI+PC9xLWljb24+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsPnt7IHRpdGxlIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB2LWlmPVwibm90aWZpY2F0aW9uXCIgc2lkZSBjbGFzcz1cIm5vdGlmaWNhdGlvblwiPlxuICAgICAgPHEtYnRuXG4gICAgICAgIHNpemU9XCIxMHB4XCJcbiAgICAgICAgZmxhdFxuICAgICAgICBjbGFzcz1cImJnLXByaW1hcnkgdGV4dC1ib2xkXCJcbiAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgIDpsYWJlbD1cIm5vdGlmaWNhdGlvblwiXG4gICAgICAgIHJvdW5kXG4gICAgICAgIGRlbnNlXG4gICAgICAvPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICByb3V0ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJycsXG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6ICgpID0+ICh7fSksXG4gICAgfSxcbiAgICBpY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJyxcbiAgICB9LFxuICAgIG5vdGlmaWNhdGlvbjogW1N0cmluZywgTnVtYmVyXSxcbiAgICBzdWJMaW5rczoge1xuICAgICAgdHlwZTogW09iamVjdCwgQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGFjdGl2ZToge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kcm91dGUubWV0YS5iYXNlID09PSB0aGlzLnJvdXRlO1xuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzQWN0aXZlKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGl0ZW0ucm91dGUgPT09IHRoaXMuJHJvdXRlLm1ldGEubW9kdWxlIHx8XG4gICAgICAgIGl0ZW0ucm91dGUgPT09IHRoaXMuJHJvdXRlLm1ldGEucHJlbWlzc2lvbiB8fFxuICAgICAgICBpdGVtLnJvdXRlID09PSB0aGlzLiRyb3V0ZS5uYW1lXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRyYXdlclxuICAgIHJlZj1cImRyYXdlclwiXG4gICAgdi1tb2RlbD1cInZhbHVlXCJcbiAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gJGVtaXQoJ3VwZGF0ZTptb2RlbC12YWx1ZScsIHZhbClcIlxuICAgIHNob3ctaWYtYWJvdmVcbiAgICA6d2lkdGg9XCIyNTBcIlxuICAgIHNpZGU9XCJsZWZ0XCJcbiAgICBjbGFzcz1cImJnLW1haW4gdGV4dC1ibGFja1wiXG4gID5cbiAgICA8cS1saXN0IGNsYXNzPVwiYmctd2hpdGVcIj5cbiAgICAgIDxsaW5rcy1saXN0IGNsYXNzPVwibGluay1pdGVtXCIgdi1mb3I9XCJsaW5rIGluIHNpZGVNZW51c1wiIDprZXk9XCJsaW5rLnRpdGxlXCIgdi1iaW5kPVwibGlua1wiIC8+XG4gICAgPC9xLWxpc3Q+XG4gIDwvcS1kcmF3ZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IExpbmtzTGlzdCBmcm9tICcuL0xpbmtzTGlzdC52dWUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBMaW5rc0xpc3QsXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgc2lkZU1lbnVzOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgIH0sXG4gIH0sXG4gIGVtaXRzOiBbJ3VwZGF0ZTptb2RlbC12YWx1ZSddLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5tb2RlbFZhbHVlLFxuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB0b2dnbGUoKSB7XG4gICAgICB0aGlzLiRyZWZzLmRyYXdlci50b2dnbGUoKTtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9zZmNfbWFpbiIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfbWVyZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBOEJBLE1BQUtBLGNBQVU7QUFBQSxFQUNiLE9BQU8sQ0FBQyxvQkFBb0I7QUFBQSxFQUM1QixTQUFTO0FBQUEsSUFDUCxxQkFBcUI7QUFDbkIsV0FBSyxNQUFNLG9CQUFvQjtBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUFBLEVBQ0Qs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
