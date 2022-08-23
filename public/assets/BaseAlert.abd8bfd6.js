import { h, v as createComponent, G as useSpinnerProps, H as useSpinner, c as computed, I as hSlot, J as useDarkProps, K as useRouterLinkProps, L as useDark, M as useRouterLink, r as ref, O as isKeyCode, Q as stopAndPrevent, R as hUniqueSlot, g as getCurrentInstance, _ as _export_sfc, S as openBlock, U as createBlock, V as withCtx, d as createVNode, W as createBaseVNode, X as createElementBlock, Y as createCommentVNode, Z as QCardSection, $ as toDisplayString, a0 as renderList, F as Fragment, a1 as QCardActions, a2 as QBtn, a3 as QCard, a4 as QDialog, a5 as QIcon, a6 as createTextVNode, a7 as pushScopeId, a8 as popScopeId } from "./index.94c1c68b.js";
const svg = [
  h("g", {
    transform: "translate(1 1)",
    "stroke-width": "2",
    fill: "none",
    "fill-rule": "evenodd"
  }, [
    h("circle", {
      "stroke-opacity": ".5",
      cx: "18",
      cy: "18",
      r: "18"
    }),
    h("path", {
      d: "M36 18c0-9.94-8.06-18-18-18"
    }, [
      h("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        from: "0 18 18",
        to: "360 18 18",
        dur: "1s",
        repeatCount: "indefinite"
      })
    ])
  ])
];
var QSpinnerOval = createComponent({
  name: "QSpinnerOval",
  props: useSpinnerProps,
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value,
      stroke: "currentColor",
      width: cSize.value,
      height: cSize.value,
      viewBox: "0 0 38 38",
      xmlns: "http://www.w3.org/2000/svg"
    }, svg);
  }
});
var QItemSection = createComponent({
  name: "QItemSection",
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-item__section column q-item__section--${props.avatar === true || props.side === true || props.thumbnail === true ? "side" : "main"}` + (props.top === true ? " q-item__section--top justify-start" : " justify-center") + (props.avatar === true ? " q-item__section--avatar" : "") + (props.thumbnail === true ? " q-item__section--thumbnail" : "") + (props.noWrap === true ? " q-item__section--nowrap" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QItem = createComponent({
  name: "QItem",
  props: {
    ...useDarkProps,
    ...useRouterLinkProps,
    tag: {
      type: String,
      default: "div"
    },
    active: {
      type: Boolean,
      default: null
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean
  },
  emits: ["click", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const { hasRouterLink, hasLink, linkProps, linkClass, linkTag, navigateToRouterLink } = useRouterLink();
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    const isActionable = computed(
      () => props.clickable === true || hasLink.value === true || props.tag === "label"
    );
    const isClickable = computed(
      () => props.disable !== true && isActionable.value === true
    );
    const classes = computed(
      () => "q-item q-item-type row no-wrap" + (props.dense === true ? " q-item--dense" : "") + (isDark.value === true ? " q-item--dark" : "") + (hasLink.value === true && props.active === null ? linkClass.value : props.active === true ? `${props.activeClass !== void 0 ? ` ${props.activeClass}` : ""} q-item--active` : "") + (props.disable === true ? " disabled" : "") + (isClickable.value === true ? " q-item--clickable q-link cursor-pointer " + (props.manualFocus === true ? "q-manual-focusable" : "q-focusable q-hoverable") + (props.focused === true ? " q-manual-focusable--focused" : "") : "")
    );
    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: 16 + props.insetLevel * 56 + "px"
      };
    });
    function onClick(e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          } else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }
        hasRouterLink.value === true && navigateToRouterLink(e);
        emit("click", e);
      }
    }
    function onKeyup(e) {
      if (isClickable.value === true && isKeyCode(e, 13) === true) {
        stopAndPrevent(e);
        e.qKeyEvent = true;
        const evt = new MouseEvent("click", e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }
      emit("keyup", e);
    }
    function getContent() {
      const child = hUniqueSlot(slots.default, []);
      isClickable.value === true && child.unshift(
        h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef })
      );
      return child;
    }
    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        onClick,
        onKeyup
      };
      if (isClickable.value === true) {
        data.tabindex = props.tabindex || "0";
        Object.assign(data, linkProps.value);
      } else if (isActionable.value === true) {
        data["aria-disabled"] = "true";
      }
      return h(
        linkTag.value,
        data,
        getContent()
      );
    };
  }
});
var QList = createComponent({
  name: "QList",
  props: {
    ...useDarkProps,
    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => "q-list" + (props.bordered === true ? " q-list--bordered" : "") + (props.dense === true ? " q-list--dense" : "") + (props.separator === true ? " q-list--separator" : "") + (isDark.value === true ? " q-list--dark" : "") + (props.padding === true ? " q-list--padding" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var BaseAlert_vue_vue_type_style_index_0_scoped_true_lang = "";
const availableIcons = ["success", "warning", "error", "info", "loading", "question", "none"];
const _sfc_main = {
  props: {
    icon: {
      type: String,
      default: "none",
      validator: (value) => {
        return availableIcons.indexOf(value) !== -1;
      }
    },
    msg: {},
    title: { type: [String, Boolean], default: "" },
    subTitle: { type: [String, Boolean], default: "" },
    ok: {
      type: Object,
      default: () => {
        return { label: "Ok" };
      }
    },
    cancel: { type: Object }
  },
  emits: [
    "ok",
    "hide",
    "cancel"
  ],
  methods: {
    show() {
      console.func("components/BaseAlert:methods.show()", arguments);
      this.$refs.dialog.show();
    },
    hide() {
      console.func("components/BaseAlert:methods.hide()", arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func("components/BaseAlert:methods.onDialogHide()", arguments);
      this.$emit("hide");
    },
    onOKClick() {
      console.func("components/BaseAlert:methods.onOKClick()", arguments);
      this.$emit("ok");
      this.hide();
    },
    onCancelClick() {
      console.func("components/BaseAlert:methods.onCancelClick()", arguments);
      this.$emit("cancel");
      this.hide();
    },
    isIcon(icon) {
      console.func("components/BaseAlert:methods.isIcon()", arguments);
      return icon === this.icon;
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-18f8f3bb"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "swal2" };
const _hoisted_2 = {
  key: 0,
  class: "swal2-icon swal2-error swal2-icon-show"
};
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "swal2-x-mark" }, [
  /* @__PURE__ */ createBaseVNode("span", { class: "swal2-x-mark-line-left" }),
  /* @__PURE__ */ createBaseVNode("span", { class: "swal2-x-mark-line-right" })
], -1));
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = {
  key: 1,
  class: "swal2-icon swal2-warning swal2-icon-show"
};
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "swal2-icon-content" }, "!", -1));
const _hoisted_7 = [
  _hoisted_6
];
const _hoisted_8 = {
  key: 2,
  class: "swal2-icon swal2-info swal2-icon-show"
};
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "swal2-icon-content" }, "i", -1));
const _hoisted_10 = [
  _hoisted_9
];
const _hoisted_11 = {
  key: 4,
  class: "swal2-icon swal2-success swal2-icon-show"
};
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "swal2-success-circular-line-left",
  style: { "background-color": "rgb(255, 255, 255)" }
}, null, -1));
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "swal2-success-line-tip" }, null, -1));
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "swal2-success-line-long" }, null, -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "swal2-success-ring" }, null, -1));
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "swal2-success-fix",
  style: { "background-color": "rgb(255, 255, 255)" }
}, null, -1));
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "swal2-success-circular-line-right",
  style: { "background-color": "rgb(255, 255, 255)" }
}, null, -1));
const _hoisted_18 = [
  _hoisted_12,
  _hoisted_13,
  _hoisted_14,
  _hoisted_15,
  _hoisted_16,
  _hoisted_17
];
const _hoisted_19 = {
  key: 5,
  class: "swal2-icon swal2-question swal2-icon-show"
};
const _hoisted_20 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "swal2-icon-content" }, "?", -1));
const _hoisted_21 = [
  _hoisted_20
];
const _hoisted_22 = {
  key: 0,
  class: "text-h6"
};
const _hoisted_23 = {
  key: 1,
  class: "text-grey-9 text-weight-medium"
};
const _hoisted_24 = {
  key: 2,
  class: "text-grey-9 text-weight-medium"
};
const _hoisted_25 = {
  key: 3,
  class: "text-grey-9 text-weight-medium"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QDialog, {
    persistent: "",
    "transition-show": "jump-up",
    "transition-hide": "jump-down",
    ref: "dialog",
    onHide: $options.onDialogHide
  }, {
    default: withCtx(() => [
      createVNode(QCard, { class: "q-dialog-plugin" }, {
        default: withCtx(() => [
          $props.icon ? (openBlock(), createBlock(QItemSection, {
            key: 0,
            class: "text-center"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                $options.isIcon("error") ? (openBlock(), createElementBlock("div", _hoisted_2, _hoisted_4)) : $options.isIcon("warning") ? (openBlock(), createElementBlock("div", _hoisted_5, _hoisted_7)) : $options.isIcon("info") ? (openBlock(), createElementBlock("div", _hoisted_8, _hoisted_10)) : $options.isIcon("loading") ? (openBlock(), createBlock(QSpinnerOval, {
                  key: 3,
                  class: "swal2-icon swal2-loading",
                  color: "primary",
                  size: "5em"
                })) : $options.isIcon("success") ? (openBlock(), createElementBlock("div", _hoisted_11, _hoisted_18)) : $options.isIcon("question") ? (openBlock(), createElementBlock("div", _hoisted_19, _hoisted_21)) : createCommentVNode("", true)
              ])
            ]),
            _: 1
          })) : createCommentVNode("", true),
          $props.title ? (openBlock(), createBlock(QCardSection, {
            key: 1,
            class: "text-center"
          }, {
            default: withCtx(() => [
              $props.title ? (openBlock(), createElementBlock("div", _hoisted_22, toDisplayString($props.title), 1)) : createCommentVNode("", true),
              $props.subTitle ? (openBlock(), createElementBlock("div", _hoisted_23, toDisplayString($props.subTitle), 1)) : createCommentVNode("", true),
              typeof $props.msg === "string" ? (openBlock(), createElementBlock("div", _hoisted_24, toDisplayString($props.msg), 1)) : $props.msg.length === 1 && typeof $props.msg[0] === "string" ? (openBlock(), createElementBlock("div", _hoisted_25, toDisplayString($props.msg[0]), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              $props.msg.length && typeof $props.msg[0] !== `string` ? (openBlock(), createBlock(QList, {
                key: 0,
                bordered: "",
                separator: ""
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($props.msg, (m, idx) => {
                    return openBlock(), createBlock(QItem, { key: idx }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { avatar: "" }, {
                          default: withCtx(() => [
                            m.icon ? (openBlock(), createBlock(QIcon, {
                              key: 0,
                              color: m.color ? m.color : "",
                              name: "fal fa-" + m.icon
                            }, null, 8, ["color", "name"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(m.text), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(QCardActions, {
            align: "center",
            class: "q-pa-lg"
          }, {
            default: withCtx(() => [
              $props.cancel ? (openBlock(), createBlock(QBtn, {
                key: 0,
                outline: "",
                "no-caps": "",
                padding: "6px 18px",
                color: $props.cancel.color,
                label: $props.cancel.label,
                onClick: $options.onCancelClick
              }, null, 8, ["color", "label", "onClick"])) : createCommentVNode("", true),
              createVNode(QBtn, {
                "no-caps": "",
                padding: "6px 18px",
                color: $props.ok.color,
                label: $props.ok.label,
                onClick: $options.onOKClick
              }, null, 8, ["color", "label", "onClick"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["onHide"]);
}
var BaseAlert = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-18f8f3bb"], ["__file", "BaseAlert.vue"]]);
var __require_context_for_vite_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseAlert
}, Symbol.toStringTag, { value: "Module" }));
export { BaseAlert as B, QItem as Q, __require_context_for_vite_0_0 as _, QItemSection as a, QList as b };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUFsZXJ0LmFiZDhiZmQ2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvUVNwaW5uZXJPdmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pdGVtL1FJdGVtU2VjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaXRlbS9RSXRlbS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaXRlbS9RTGlzdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZUFsZXJ0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU3Bpbm5lciwgeyB1c2VTcGlubmVyUHJvcHMgfSBmcm9tICcuL3VzZS1zcGlubmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuY29uc3Qgc3ZnID0gW1xuICBoKCdnJywge1xuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgxIDEpJyxcbiAgICAnc3Ryb2tlLXdpZHRoJzogJzInLFxuICAgIGZpbGw6ICdub25lJyxcbiAgICAnZmlsbC1ydWxlJzogJ2V2ZW5vZGQnXG4gIH0sIFtcbiAgICBoKCdjaXJjbGUnLCB7XG4gICAgICAnc3Ryb2tlLW9wYWNpdHknOiAnLjUnLFxuICAgICAgY3g6ICcxOCcsXG4gICAgICBjeTogJzE4JyxcbiAgICAgIHI6ICcxOCdcbiAgICB9KSxcbiAgICBoKCdwYXRoJywge1xuICAgICAgZDogJ00zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCdcbiAgICB9LCBbXG4gICAgICBoKCdhbmltYXRlVHJhbnNmb3JtJywge1xuICAgICAgICBhdHRyaWJ1dGVOYW1lOiAndHJhbnNmb3JtJyxcbiAgICAgICAgdHlwZTogJ3JvdGF0ZScsXG4gICAgICAgIGZyb206ICcwIDE4IDE4JyxcbiAgICAgICAgdG86ICczNjAgMTggMTgnLFxuICAgICAgICBkdXI6ICcxcycsXG4gICAgICAgIHJlcGVhdENvdW50OiAnaW5kZWZpbml0ZSdcbiAgICAgIH0pXG4gICAgXSlcbiAgXSlcbl1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTcGlubmVyT3ZhbCcsXG5cbiAgcHJvcHM6IHVzZVNwaW5uZXJQcm9wcyxcblxuICBzZXR1cCAocHJvcHMpIHtcbiAgICBjb25zdCB7IGNTaXplLCBjbGFzc2VzIH0gPSB1c2VTcGlubmVyKHByb3BzKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ3N2ZycsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHdpZHRoOiBjU2l6ZS52YWx1ZSxcbiAgICAgIGhlaWdodDogY1NpemUudmFsdWUsXG4gICAgICB2aWV3Qm94OiAnMCAwIDM4IDM4JyxcbiAgICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG4gICAgfSwgc3ZnKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtU2VjdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICBhdmF0YXI6IEJvb2xlYW4sXG4gICAgdGh1bWJuYWlsOiBCb29sZWFuLFxuICAgIHNpZGU6IEJvb2xlYW4sXG4gICAgdG9wOiBCb29sZWFuLFxuICAgIG5vV3JhcDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtX19zZWN0aW9uIGNvbHVtbidcbiAgICAgICsgYCBxLWl0ZW1fX3NlY3Rpb24tLSR7IHByb3BzLmF2YXRhciA9PT0gdHJ1ZSB8fCBwcm9wcy5zaWRlID09PSB0cnVlIHx8IHByb3BzLnRodW1ibmFpbCA9PT0gdHJ1ZSA/ICdzaWRlJyA6ICdtYWluJyB9YFxuICAgICAgKyAocHJvcHMudG9wID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLXRvcCBqdXN0aWZ5LXN0YXJ0JyA6ICcganVzdGlmeS1jZW50ZXInKVxuICAgICAgKyAocHJvcHMuYXZhdGFyID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLWF2YXRhcicgOiAnJylcbiAgICAgICsgKHByb3BzLnRodW1ibmFpbCA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19zZWN0aW9uLS10aHVtYm5haWwnIDogJycpXG4gICAgICArIChwcm9wcy5ub1dyYXAgPT09IHRydWUgPyAnIHEtaXRlbV9fc2VjdGlvbi0tbm93cmFwJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVJvdXRlckxpbmssIHsgdXNlUm91dGVyTGlua1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utcm91dGVyLWxpbmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFVuaXF1ZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIGFjdGl2ZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIGluc2V0TGV2ZWw6IE51bWJlcixcblxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBmb2N1c2VkOiBCb29sZWFuLFxuICAgIG1hbnVhbEZvY3VzOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJywgJ2tleXVwJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyBoYXNSb3V0ZXJMaW5rLCBoYXNMaW5rLCBsaW5rUHJvcHMsIGxpbmtDbGFzcywgbGlua1RhZywgbmF2aWdhdGVUb1JvdXRlckxpbmsgfSA9IHVzZVJvdXRlckxpbmsoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGlzQWN0aW9uYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5jbGlja2FibGUgPT09IHRydWVcbiAgICAgICAgfHwgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBwcm9wcy50YWcgPT09ICdsYWJlbCdcbiAgICApXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaXRlbSBxLWl0ZW0tdHlwZSByb3cgbm8td3JhcCdcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWl0ZW0tLWRlbnNlJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWl0ZW0tLWRhcmsnIDogJycpXG4gICAgICArIChcbiAgICAgICAgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hY3RpdmUgPT09IG51bGxcbiAgICAgICAgICA/IGxpbmtDbGFzcy52YWx1ZVxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBwcm9wcy5hY3RpdmUgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IGAkeyBwcm9wcy5hY3RpdmVDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5hY3RpdmVDbGFzcyB9YCA6ICcnIH0gcS1pdGVtLS1hY3RpdmVgXG4gICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgKVxuICAgICAgKVxuICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgICArIChcbiAgICAgICAgaXNDbGlja2FibGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICcgcS1pdGVtLS1jbGlja2FibGUgcS1saW5rIGN1cnNvci1wb2ludGVyICdcbiAgICAgICAgICAgICsgKHByb3BzLm1hbnVhbEZvY3VzID09PSB0cnVlID8gJ3EtbWFudWFsLWZvY3VzYWJsZScgOiAncS1mb2N1c2FibGUgcS1ob3ZlcmFibGUnKVxuICAgICAgICAgICAgKyAocHJvcHMuZm9jdXNlZCA9PT0gdHJ1ZSA/ICcgcS1tYW51YWwtZm9jdXNhYmxlLS1mb2N1c2VkJyA6ICcnKVxuICAgICAgICAgIDogJydcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5pbnNldExldmVsID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyAnUmlnaHQnIDogJ0xlZnQnXG4gICAgICByZXR1cm4ge1xuICAgICAgICBbICdwYWRkaW5nJyArIGRpciBdOiAoMTYgKyBwcm9wcy5pbnNldExldmVsICogNTYpICsgJ3B4J1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGJsdXJUYXJnZXRSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAoZS5xS2V5RXZlbnQgIT09IHRydWUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICAgICAgYmx1clRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGJsdXJUYXJnZXRSZWYudmFsdWUpIHtcbiAgICAgICAgICAgIHJvb3RSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWUgJiYgbmF2aWdhdGVUb1JvdXRlckxpbmsoZSlcbiAgICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBpc0tleUNvZGUoZSwgMTMpID09PSB0cnVlKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgICAgLy8gZm9yIHJpcHBsZVxuICAgICAgICBlLnFLZXlFdmVudCA9IHRydWVcblxuICAgICAgICAvLyBmb3IgY2xpY2sgdHJpZ2dlclxuICAgICAgICBjb25zdCBldnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snLCBlKVxuICAgICAgICBldnQucUtleUV2ZW50ID0gdHJ1ZVxuICAgICAgICByb290UmVmLnZhbHVlLmRpc3BhdGNoRXZlbnQoZXZ0KVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdrZXl1cCcsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGhVbmlxdWVTbG90KHNsb3RzLmRlZmF1bHQsIFtdKVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC51bnNoaWZ0KFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLCB0YWJpbmRleDogLTEsIHJlZjogYmx1clRhcmdldFJlZiB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICBvbkNsaWNrLFxuICAgICAgICBvbktleXVwXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhLnRhYmluZGV4ID0gcHJvcHMudGFiaW5kZXggfHwgJzAnXG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgbGlua1Byb3BzLnZhbHVlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGFbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFxuICAgICAgICBsaW5rVGFnLnZhbHVlLFxuICAgICAgICBkYXRhLFxuICAgICAgICBnZXRDb250ZW50KClcbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUxpc3QnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZGVuc2U6IEJvb2xlYW4sXG4gICAgc2VwYXJhdG9yOiBCb29sZWFuLFxuICAgIHBhZGRpbmc6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGlzdCdcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWxpc3QtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtbGlzdC0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5zZXBhcmF0b3IgPT09IHRydWUgPyAnIHEtbGlzdC0tc2VwYXJhdG9yJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWxpc3QtLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxpc3QtLXBhZGRpbmcnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZ1xuICAgIHBlcnNpc3RlbnRcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICAgIHJlZj1cImRpYWxvZ1wiXG4gICAgQGhpZGU9XCJvbkRpYWxvZ0hpZGVcIlxuICA+XG4gICAgPHEtY2FyZCBjbGFzcz1cInEtZGlhbG9nLXBsdWdpblwiPlxuICAgICAgPHEtaXRlbS1zZWN0aW9uIHYtaWY9XCJpY29uXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3dhbDJcIj5cbiAgICAgICAgICA8ZGl2IHYtaWY9XCJpc0ljb24oJ2Vycm9yJylcIiBjbGFzcz1cInN3YWwyLWljb24gc3dhbDItZXJyb3Igc3dhbDItaWNvbi1zaG93XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN3YWwyLXgtbWFya1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN3YWwyLXgtbWFyay1saW5lLWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3dhbDIteC1tYXJrLWxpbmUtcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cImlzSWNvbignd2FybmluZycpXCIgY2xhc3M9XCJzd2FsMi1pY29uIHN3YWwyLXdhcm5pbmcgc3dhbDItaWNvbi1zaG93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dhbDItaWNvbi1jb250ZW50XCI+ITwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiB2LWVsc2UtaWY9XCJpc0ljb24oJ2luZm8nKVwiIGNsYXNzPVwic3dhbDItaWNvbiBzd2FsMi1pbmZvIHN3YWwyLWljb24tc2hvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3YWwyLWljb24tY29udGVudFwiPmk8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiaXNJY29uKCdsb2FkaW5nJylcIj5cbiAgICAgICAgICAgIDxxLXNwaW5uZXItb3ZhbCBjbGFzcz1cInN3YWwyLWljb24gc3dhbDItbG9hZGluZ1wiIGNvbG9yPVwicHJpbWFyeVwiIHNpemU9XCI1ZW1cIiAvPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cImlzSWNvbignc3VjY2VzcycpXCIgY2xhc3M9XCJzd2FsMi1pY29uIHN3YWwyLXN1Y2Nlc3Mgc3dhbDItaWNvbi1zaG93XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwic3dhbDItc3VjY2Vzcy1jaXJjdWxhci1saW5lLWxlZnRcIlxuICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtbGluZS10aXBcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtbGluZS1sb25nXCI+PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtcmluZ1wiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtZml4XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSlcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtcmlnaHRcIlxuICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cImlzSWNvbigncXVlc3Rpb24nKVwiIGNsYXNzPVwic3dhbDItaWNvbiBzd2FsMi1xdWVzdGlvbiBzd2FsMi1pY29uLXNob3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2FsMi1pY29uLWNvbnRlbnRcIj4/PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiB2LWlmPVwidGl0bGVcIiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCIgdi1pZj1cInRpdGxlXCI+XG4gICAgICAgICAge3sgdGl0bGUgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyZXktOSB0ZXh0LXdlaWdodC1tZWRpdW1cIiB2LWlmPVwic3ViVGl0bGVcIj5cbiAgICAgICAgICB7eyBzdWJUaXRsZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJ0eXBlb2YgbXNnID09PSAnc3RyaW5nJ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyZXktOSB0ZXh0LXdlaWdodC1tZWRpdW1cIj57eyBtc2cgfX08L2Rpdj48L3RlbXBsYXRlXG4gICAgICAgID5cbiAgICAgICAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cIm1zZy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIG1zZ1swXSA9PT0gJ3N0cmluZydcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ncmV5LTkgdGV4dC13ZWlnaHQtbWVkaXVtXCI+e3sgbXNnWzBdIH19PC9kaXY+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIm1zZy5sZW5ndGggJiYgdHlwZW9mIG1zZ1swXSAhPT0gYHN0cmluZ2BcIj5cbiAgICAgICAgICA8cS1saXN0IGJvcmRlcmVkIHNlcGFyYXRvcj5cbiAgICAgICAgICAgIDxxLWl0ZW0gdi1mb3I9XCIobSwgaWR4KSBpbiBtc2dcIiA6a2V5PVwiaWR4XCI+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiB2LWlmPVwibS5pY29uXCIgOmNvbG9yPVwibS5jb2xvciA/IG0uY29sb3IgOiAnJ1wiIDpuYW1lPVwiJ2ZhbCBmYS0nICsgbS5pY29uXCIgLz5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPnt7IG0udGV4dCB9fTwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8IS0tIGJ1dHRvbnMgZXhhbXBsZSAtLT5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cImNlbnRlclwiIGNsYXNzPVwicS1wYS1sZ1wiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICB2LWlmPVwiY2FuY2VsXCJcbiAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgIHBhZGRpbmc9XCI2cHggMThweFwiXG4gICAgICAgICAgOmNvbG9yPVwiY2FuY2VsLmNvbG9yXCJcbiAgICAgICAgICA6bGFiZWw9XCJjYW5jZWwubGFiZWxcIlxuICAgICAgICAgIEBjbGljaz1cIm9uQ2FuY2VsQ2xpY2tcIlxuICAgICAgICAvPlxuICAgICAgICA8cS1idG4gbm8tY2FwcyBwYWRkaW5nPVwiNnB4IDE4cHhcIiA6Y29sb3I9XCJvay5jb2xvclwiIDpsYWJlbD1cIm9rLmxhYmVsXCIgQGNsaWNrPVwib25PS0NsaWNrXCIgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuY29uc3QgYXZhaWxhYmxlSWNvbnMgPSBbJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdlcnJvcicsICdpbmZvJywgJ2xvYWRpbmcnLCAncXVlc3Rpb24nLCAnbm9uZSddO1xuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdub25lJyxcbiAgICAgIHZhbGlkYXRvcjogKHZhbHVlKSA9PiB7XG4gICAgICAgIHJldHVybiBhdmFpbGFibGVJY29ucy5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICB9LFxuICAgIH0sXG4gICAgbXNnOiB7fSxcbiAgICB0aXRsZTogeyB0eXBlOiBbU3RyaW5nLCBCb29sZWFuXSwgZGVmYXVsdDogJycgfSxcbiAgICBzdWJUaXRsZTogeyB0eXBlOiBbU3RyaW5nLCBCb29sZWFuXSwgZGVmYXVsdDogJycgfSxcbiAgICBvazoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgZGVmYXVsdDogKCkgPT4ge1xuICAgICAgICByZXR1cm4geyBsYWJlbDogJ09rJyB9O1xuICAgICAgfSxcbiAgICB9LFxuICAgIGNhbmNlbDogeyB0eXBlOiBPYmplY3QgfSxcbiAgfSxcbiAgZW1pdHM6IFtcbiAgICAvLyBSRVFVSVJFRFxuICAgICdvaycsXG4gICAgJ2hpZGUnLFxuICAgICdjYW5jZWwnLFxuICBdLFxuICBtZXRob2RzOiB7XG4gICAgLy8gZm9sbG93aW5nIG1ldGhvZCBpcyBSRVFVSVJFRFxuICAgIC8vIChkb24ndCBjaGFuZ2UgaXRzIG5hbWUgLS0+IFwic2hvd1wiKVxuICAgIHNob3coKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvQmFzZUFsZXJ0Om1ldGhvZHMuc2hvdygpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuJHJlZnMuZGlhbG9nLnNob3coKTtcbiAgICB9LFxuXG4gICAgLy8gZm9sbG93aW5nIG1ldGhvZCBpcyBSRVFVSVJFRFxuICAgIC8vIChkb24ndCBjaGFuZ2UgaXRzIG5hbWUgLS0+IFwiaGlkZVwiKVxuICAgIGhpZGUoKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvQmFzZUFsZXJ0Om1ldGhvZHMuaGlkZSgpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuJHJlZnMuZGlhbG9nLmhpZGUoKTtcbiAgICB9LFxuXG4gICAgb25EaWFsb2dIaWRlKCkge1xuICAgICAgY29uc29sZS5mdW5jKCdjb21wb25lbnRzL0Jhc2VBbGVydDptZXRob2RzLm9uRGlhbG9nSGlkZSgpJywgYXJndW1lbnRzKTtcbiAgICAgIC8vIHJlcXVpcmVkIHRvIGJlIGVtaXR0ZWRcbiAgICAgIC8vIHdoZW4gUURpYWxvZyBlbWl0cyBcImhpZGVcIiBldmVudFxuICAgICAgdGhpcy4kZW1pdCgnaGlkZScpO1xuICAgIH0sXG5cbiAgICBvbk9LQ2xpY2soKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvQmFzZUFsZXJ0Om1ldGhvZHMub25PS0NsaWNrKCknLCBhcmd1bWVudHMpO1xuICAgICAgLy8gb24gT0ssIGl0IGlzIFJFUVVJUkVEIHRvXG4gICAgICAvLyBlbWl0IFwib2tcIiBldmVudCAod2l0aCBvcHRpb25hbCBwYXlsb2FkKVxuICAgICAgLy8gYmVmb3JlIGhpZGluZyB0aGUgUURpYWxvZ1xuICAgICAgdGhpcy4kZW1pdCgnb2snKTtcbiAgICAgIC8vIG9yIHdpdGggcGF5bG9hZDogdGhpcy4kZW1pdCgnb2snLCB7IC4uLiB9KVxuXG4gICAgICAvLyB0aGVuIGhpZGluZyBkaWFsb2dcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0sXG5cbiAgICBvbkNhbmNlbENsaWNrKCkge1xuICAgICAgY29uc29sZS5mdW5jKCdjb21wb25lbnRzL0Jhc2VBbGVydDptZXRob2RzLm9uQ2FuY2VsQ2xpY2soKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKTtcbiAgICAgIC8vIHdlIGp1c3QgbmVlZCB0byBoaWRlIGRpYWxvZ1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSxcblxuICAgIGlzSWNvbihpY29uKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvQmFzZUFsZXJ0Om1ldGhvZHMuaXNJY29uKCknLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIGljb24gPT09IHRoaXMuaWNvbjtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxuLyoqXG4qIENyZWRpdHNcbiogQGxpbmsgaHR0cHM6Ly9zd2VldGFsZXJ0Mi5naXRodWIuaW8vXG4qL1xuLnN3YWwyIHtcbiAgd2lkdGg6IDE0MHB4O1xuICBoZWlnaHQ6IDE0MHB4O1xuICBwYWRkaW5nOiAyNnB4O1xuICBtYXJnaW46IGF1dG87XG59XG5cbi5zd2FsMi1pY29uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiA1ZW07XG4gIGhlaWdodDogNWVtO1xuICBtYXJnaW46IDIuNWVtIGF1dG8gMC42ZW07XG4gIGJvcmRlcjogMC4yNWVtIHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlci1jb2xvcjogIzAwMDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGxpbmUtaGVpZ2h0OiA1ZW07XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcblxuICAuc3dhbDItaWNvbi1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAzLjc1ZW07XG4gIH1cblxuICAmLnN3YWwyLWVycm9yIHtcbiAgICBib3JkZXItY29sb3I6ICNmMjc0NzQ7XG4gICAgY29sb3I6ICNmMjc0NzQ7XG5cbiAgICAuc3dhbDIteC1tYXJrIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICB9XG5cbiAgICBbY2xhc3NePSdzd2FsMi14LW1hcmstbGluZSddIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAyLjMxMjVlbTtcbiAgICAgIHdpZHRoOiAyLjkzNzVlbTtcbiAgICAgIGhlaWdodDogMC4zMTI1ZW07XG4gICAgICBib3JkZXItcmFkaXVzOiAwLjEyNWVtO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YyNzQ3NDtcblxuICAgICAgJltjbGFzcyQ9J2xlZnQnXSB7XG4gICAgICAgIGxlZnQ6IDEuMDYyNWVtO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgICZbY2xhc3MkPSdyaWdodCddIHtcbiAgICAgICAgcmlnaHQ6IDFlbTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLnN3YWwyLWljb24tc2hvdyB7XG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3dhbDItYW5pbWF0ZS1lcnJvci1pY29uIDAuNXM7XG4gICAgICBhbmltYXRpb246IHN3YWwyLWFuaW1hdGUtZXJyb3ItaWNvbiAwLjVzO1xuXG4gICAgICAuc3dhbDIteC1tYXJrIHtcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHN3YWwyLWFuaW1hdGUtZXJyb3IteC1tYXJrIDAuNXM7XG4gICAgICAgIGFuaW1hdGlvbjogc3dhbDItYW5pbWF0ZS1lcnJvci14LW1hcmsgMC41cztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmLnN3YWwyLXdhcm5pbmcge1xuICAgIGJvcmRlci1jb2xvcjogI2ZhY2VhODtcbiAgICBjb2xvcjogI2Y4YmI4NjtcblxuICAgICYuc3dhbDItaWNvbi1zaG93IHtcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLWVycm9yLWljb24gMC41cztcbiAgICAgIGFuaW1hdGlvbjogc3dhbDItYW5pbWF0ZS1lcnJvci1pY29uIDAuNXM7XG5cbiAgICAgIC5zd2FsMi1pY29uLWNvbnRlbnQge1xuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3dhbDItYW5pbWF0ZS1pLW1hcmsgMC41cztcbiAgICAgICAgYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLWktbWFyayAwLjVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYuc3dhbDItaW5mbyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjOWRlMGY2O1xuICAgIGNvbG9yOiAjM2ZjM2VlO1xuXG4gICAgJi5zd2FsMi1pY29uLXNob3cge1xuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHN3YWwyLWFuaW1hdGUtZXJyb3ItaWNvbiAwLjVzO1xuICAgICAgYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLWVycm9yLWljb24gMC41cztcblxuICAgICAgLnN3YWwyLWljb24tY29udGVudCB7XG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLWktbWFyayAwLjhzO1xuICAgICAgICBhbmltYXRpb246IHN3YWwyLWFuaW1hdGUtaS1tYXJrIDAuOHM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJi5zd2FsMi1xdWVzdGlvbiB7XG4gICAgYm9yZGVyLWNvbG9yOiAjYzlkYWUxO1xuICAgIGNvbG9yOiAjODdhZGJkO1xuXG4gICAgJi5zd2FsMi1pY29uLXNob3cge1xuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHN3YWwyLWFuaW1hdGUtZXJyb3ItaWNvbiAwLjVzO1xuICAgICAgYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLWVycm9yLWljb24gMC41cztcblxuICAgICAgLnN3YWwyLWljb24tY29udGVudCB7XG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLXF1ZXN0aW9uLW1hcmsgMC44cztcbiAgICAgICAgYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLXF1ZXN0aW9uLW1hcmsgMC44cztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmLnN3YWwyLXN1Y2Nlc3Mge1xuICAgIGJvcmRlci1jb2xvcjogI2E1ZGM4NjtcbiAgICBjb2xvcjogI2E1ZGM4NjtcblxuICAgIFtjbGFzc149J3N3YWwyLXN1Y2Nlc3MtY2lyY3VsYXItbGluZSddIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiAzLjc1ZW07XG4gICAgICBoZWlnaHQ6IDcuNWVtO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuXG4gICAgICAmW2NsYXNzJD0nbGVmdCddIHtcbiAgICAgICAgdG9wOiAtMC40Mzc1ZW07XG4gICAgICAgIGxlZnQ6IC0yLjA2MzVlbTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMy43NWVtIDMuNzVlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNy41ZW0gMCAwIDcuNWVtO1xuICAgICAgfVxuXG4gICAgICAmW2NsYXNzJD0ncmlnaHQnXSB7XG4gICAgICAgIHRvcDogLTAuNjg3NWVtO1xuICAgICAgICBsZWZ0OiAxLjg3NWVtO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDMuNzVlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCA3LjVlbSA3LjVlbSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5zd2FsMi1zdWNjZXNzLXJpbmcge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgei1pbmRleDogMjtcbiAgICAgIHRvcDogLTAuMjVlbTtcbiAgICAgIGxlZnQ6IC0wLjI1ZW07XG4gICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYm9yZGVyOiAwLjI1ZW0gc29saWQgcmdiYSgxNjUsIDIyMCwgMTM0LCAwLjMpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIH1cblxuICAgIC5zd2FsMi1zdWNjZXNzLWZpeCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB6LWluZGV4OiAxO1xuICAgICAgdG9wOiAwLjVlbTtcbiAgICAgIGxlZnQ6IDEuNjI1ZW07XG4gICAgICB3aWR0aDogMC40Mzc1ZW07XG4gICAgICBoZWlnaHQ6IDUuNjI1ZW07XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgIH1cblxuICAgIFtjbGFzc149J3N3YWwyLXN1Y2Nlc3MtbGluZSddIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgei1pbmRleDogMjtcbiAgICAgIGhlaWdodDogMC4zMTI1ZW07XG4gICAgICBib3JkZXItcmFkaXVzOiAwLjEyNWVtO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E1ZGM4NjtcblxuICAgICAgJltjbGFzcyQ9J3RpcCddIHtcbiAgICAgICAgdG9wOiAyLjg3NWVtO1xuICAgICAgICBsZWZ0OiAwLjgxMjVlbTtcbiAgICAgICAgd2lkdGg6IDEuNTYyNWVtO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgICZbY2xhc3MkPSdsb25nJ10ge1xuICAgICAgICB0b3A6IDIuMzc1ZW07XG4gICAgICAgIHJpZ2h0OiAwLjVlbTtcbiAgICAgICAgd2lkdGg6IDIuOTM3NWVtO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgfVxuICAgIH1cblxuICAgICYuc3dhbDItaWNvbi1zaG93IHtcbiAgICAgIC5zd2FsMi1zdWNjZXNzLWxpbmUtdGlwIHtcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHN3YWwyLWFuaW1hdGUtc3VjY2Vzcy1saW5lLXRpcCAwLjc1cztcbiAgICAgICAgYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLXN1Y2Nlc3MtbGluZS10aXAgMC43NXM7XG4gICAgICB9XG5cbiAgICAgIC5zd2FsMi1zdWNjZXNzLWxpbmUtbG9uZyB7XG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzd2FsMi1hbmltYXRlLXN1Y2Nlc3MtbGluZS1sb25nIDAuNzVzO1xuICAgICAgICBhbmltYXRpb246IHN3YWwyLWFuaW1hdGUtc3VjY2Vzcy1saW5lLWxvbmcgMC43NXM7XG4gICAgICB9XG5cbiAgICAgIC5zd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtcmlnaHQge1xuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3dhbDItcm90YXRlLXN1Y2Nlc3MtY2lyY3VsYXItbGluZSA0LjI1cyBlYXNlLWluO1xuICAgICAgICBhbmltYXRpb246IHN3YWwyLXJvdGF0ZS1zdWNjZXNzLWNpcmN1bGFyLWxpbmUgNC4yNXMgZWFzZS1pbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmLnN3YWwyLWxvYWRpbmcge1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbn1cblxuW2NsYXNzXj0nc3dhbDInXSB7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBzd2FsMi10b2FzdC1zaG93IHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC42MjVlbSkgcm90YXRlWigyZGVnKTtcbiAgfVxuXG4gIDMzJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHJvdGF0ZVooLTJkZWcpO1xuICB9XG5cbiAgNjYlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMC4zMTI1ZW0pIHJvdGF0ZVooMmRlZyk7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgcm90YXRlWigwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHN3YWwyLXRvYXN0LXNob3cge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjYyNWVtKSByb3RhdGVaKDJkZWcpO1xuICB9XG5cbiAgMzMlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgcm90YXRlWigtMmRlZyk7XG4gIH1cblxuICA2NiUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwLjMxMjVlbSkgcm90YXRlWigyZGVnKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGVaKDApO1xuICB9XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBzd2FsMi10b2FzdC1oaWRlIHtcbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVaKDFkZWcpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBzd2FsMi10b2FzdC1oaWRlIHtcbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVaKDFkZWcpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHN3YWwyLXRvYXN0LWFuaW1hdGUtc3VjY2Vzcy1saW5lLXRpcCB7XG4gIDAlIHtcbiAgICB0b3A6IDAuNTYyNWVtO1xuICAgIGxlZnQ6IDAuMDYyNWVtO1xuICAgIHdpZHRoOiAwO1xuICB9XG5cbiAgNTQlIHtcbiAgICB0b3A6IDAuMTI1ZW07XG4gICAgbGVmdDogMC4xMjVlbTtcbiAgICB3aWR0aDogMDtcbiAgfVxuXG4gIDcwJSB7XG4gICAgdG9wOiAwLjYyNWVtO1xuICAgIGxlZnQ6IC0wLjI1ZW07XG4gICAgd2lkdGg6IDEuNjI1ZW07XG4gIH1cblxuICA4NCUge1xuICAgIHRvcDogMS4wNjI1ZW07XG4gICAgbGVmdDogMC43NWVtO1xuICAgIHdpZHRoOiAwLjVlbTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIHRvcDogMS4xMjVlbTtcbiAgICBsZWZ0OiAwLjE4NzVlbTtcbiAgICB3aWR0aDogMC43NWVtO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgc3dhbDItdG9hc3QtYW5pbWF0ZS1zdWNjZXNzLWxpbmUtdGlwIHtcbiAgMCUge1xuICAgIHRvcDogMC41NjI1ZW07XG4gICAgbGVmdDogMC4wNjI1ZW07XG4gICAgd2lkdGg6IDA7XG4gIH1cblxuICA1NCUge1xuICAgIHRvcDogMC4xMjVlbTtcbiAgICBsZWZ0OiAwLjEyNWVtO1xuICAgIHdpZHRoOiAwO1xuICB9XG5cbiAgNzAlIHtcbiAgICB0b3A6IDAuNjI1ZW07XG4gICAgbGVmdDogLTAuMjVlbTtcbiAgICB3aWR0aDogMS42MjVlbTtcbiAgfVxuXG4gIDg0JSB7XG4gICAgdG9wOiAxLjA2MjVlbTtcbiAgICBsZWZ0OiAwLjc1ZW07XG4gICAgd2lkdGg6IDAuNWVtO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdG9wOiAxLjEyNWVtO1xuICAgIGxlZnQ6IDAuMTg3NWVtO1xuICAgIHdpZHRoOiAwLjc1ZW07XG4gIH1cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHN3YWwyLXRvYXN0LWFuaW1hdGUtc3VjY2Vzcy1saW5lLWxvbmcge1xuICAwJSB7XG4gICAgdG9wOiAxLjYyNWVtO1xuICAgIHJpZ2h0OiAxLjM3NWVtO1xuICAgIHdpZHRoOiAwO1xuICB9XG5cbiAgNjUlIHtcbiAgICB0b3A6IDEuMjVlbTtcbiAgICByaWdodDogMC45Mzc1ZW07XG4gICAgd2lkdGg6IDA7XG4gIH1cblxuICA4NCUge1xuICAgIHRvcDogMC45Mzc1ZW07XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6IDEuMTI1ZW07XG4gIH1cblxuICAxMDAlIHtcbiAgICB0b3A6IDAuOTM3NWVtO1xuICAgIHJpZ2h0OiAwLjE4NzVlbTtcbiAgICB3aWR0aDogMS4zNzVlbTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHN3YWwyLXRvYXN0LWFuaW1hdGUtc3VjY2Vzcy1saW5lLWxvbmcge1xuICAwJSB7XG4gICAgdG9wOiAxLjYyNWVtO1xuICAgIHJpZ2h0OiAxLjM3NWVtO1xuICAgIHdpZHRoOiAwO1xuICB9XG5cbiAgNjUlIHtcbiAgICB0b3A6IDEuMjVlbTtcbiAgICByaWdodDogMC45Mzc1ZW07XG4gICAgd2lkdGg6IDA7XG4gIH1cblxuICA4NCUge1xuICAgIHRvcDogMC45Mzc1ZW07XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6IDEuMTI1ZW07XG4gIH1cblxuICAxMDAlIHtcbiAgICB0b3A6IDAuOTM3NWVtO1xuICAgIHJpZ2h0OiAwLjE4NzVlbTtcbiAgICB3aWR0aDogMS4zNzVlbTtcbiAgfVxufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3dhbDItc2hvdyB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XG4gIH1cblxuICA0NSUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gIH1cblxuICA4MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgc3dhbDItc2hvdyB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XG4gIH1cblxuICA0NSUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gIH1cblxuICA4MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBzd2FsMi1oaWRlIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgc3dhbDItaGlkZSB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3dhbDItYW5pbWF0ZS1zdWNjZXNzLWxpbmUtdGlwIHtcbiAgMCUge1xuICAgIHRvcDogMS4xODc1ZW07XG4gICAgbGVmdDogMC4wNjI1ZW07XG4gICAgd2lkdGg6IDA7XG4gIH1cblxuICA1NCUge1xuICAgIHRvcDogMS4wNjI1ZW07XG4gICAgbGVmdDogMC4xMjVlbTtcbiAgICB3aWR0aDogMDtcbiAgfVxuXG4gIDcwJSB7XG4gICAgdG9wOiAyLjE4NzVlbTtcbiAgICBsZWZ0OiAtMC4zNzVlbTtcbiAgICB3aWR0aDogMy4xMjVlbTtcbiAgfVxuXG4gIDg0JSB7XG4gICAgdG9wOiAzZW07XG4gICAgbGVmdDogMS4zMTI1ZW07XG4gICAgd2lkdGg6IDEuMDYyNWVtO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdG9wOiAyLjgxMjVlbTtcbiAgICBsZWZ0OiAwLjgxMjVlbTtcbiAgICB3aWR0aDogMS41NjI1ZW07XG4gIH1cbn1cblxuQGtleWZyYW1lcyBzd2FsMi1hbmltYXRlLXN1Y2Nlc3MtbGluZS10aXAge1xuICAwJSB7XG4gICAgdG9wOiAxLjE4NzVlbTtcbiAgICBsZWZ0OiAwLjA2MjVlbTtcbiAgICB3aWR0aDogMDtcbiAgfVxuXG4gIDU0JSB7XG4gICAgdG9wOiAxLjA2MjVlbTtcbiAgICBsZWZ0OiAwLjEyNWVtO1xuICAgIHdpZHRoOiAwO1xuICB9XG5cbiAgNzAlIHtcbiAgICB0b3A6IDIuMTg3NWVtO1xuICAgIGxlZnQ6IC0wLjM3NWVtO1xuICAgIHdpZHRoOiAzLjEyNWVtO1xuICB9XG5cbiAgODQlIHtcbiAgICB0b3A6IDNlbTtcbiAgICBsZWZ0OiAxLjMxMjVlbTtcbiAgICB3aWR0aDogMS4wNjI1ZW07XG4gIH1cblxuICAxMDAlIHtcbiAgICB0b3A6IDIuODEyNWVtO1xuICAgIGxlZnQ6IDAuODEyNWVtO1xuICAgIHdpZHRoOiAxLjU2MjVlbTtcbiAgfVxufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3dhbDItYW5pbWF0ZS1zdWNjZXNzLWxpbmUtbG9uZyB7XG4gIDAlIHtcbiAgICB0b3A6IDMuMzc1ZW07XG4gICAgcmlnaHQ6IDIuODc1ZW07XG4gICAgd2lkdGg6IDA7XG4gIH1cblxuICA2NSUge1xuICAgIHRvcDogMy4zNzVlbTtcbiAgICByaWdodDogMi44NzVlbTtcbiAgICB3aWR0aDogMDtcbiAgfVxuXG4gIDg0JSB7XG4gICAgdG9wOiAyLjE4NzVlbTtcbiAgICByaWdodDogMDtcbiAgICB3aWR0aDogMy40Mzc1ZW07XG4gIH1cblxuICAxMDAlIHtcbiAgICB0b3A6IDIuMzc1ZW07XG4gICAgcmlnaHQ6IDAuNWVtO1xuICAgIHdpZHRoOiAyLjkzNzVlbTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHN3YWwyLWFuaW1hdGUtc3VjY2Vzcy1saW5lLWxvbmcge1xuICAwJSB7XG4gICAgdG9wOiAzLjM3NWVtO1xuICAgIHJpZ2h0OiAyLjg3NWVtO1xuICAgIHdpZHRoOiAwO1xuICB9XG5cbiAgNjUlIHtcbiAgICB0b3A6IDMuMzc1ZW07XG4gICAgcmlnaHQ6IDIuODc1ZW07XG4gICAgd2lkdGg6IDA7XG4gIH1cblxuICA4NCUge1xuICAgIHRvcDogMi4xODc1ZW07XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6IDMuNDM3NWVtO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdG9wOiAyLjM3NWVtO1xuICAgIHJpZ2h0OiAwLjVlbTtcbiAgICB3aWR0aDogMi45Mzc1ZW07XG4gIH1cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHN3YWwyLXJvdGF0ZS1zdWNjZXNzLWNpcmN1bGFyLWxpbmUge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgfVxuXG4gIDUlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICB9XG5cbiAgMTIlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDA1ZGVnKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC00MDVkZWcpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgc3dhbDItcm90YXRlLXN1Y2Nlc3MtY2lyY3VsYXItbGluZSB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICB9XG5cbiAgNSUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gIH1cblxuICAxMiUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC00MDVkZWcpO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQwNWRlZyk7XG4gIH1cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHN3YWwyLWFuaW1hdGUtZXJyb3IteC1tYXJrIHtcbiAgMCUge1xuICAgIG1hcmdpbi10b3A6IDEuNjI1ZW07XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICA1MCUge1xuICAgIG1hcmdpbi10b3A6IDEuNjI1ZW07XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICA4MCUge1xuICAgIG1hcmdpbi10b3A6IC0wLjM3NWVtO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xNSk7XG4gIH1cblxuICAxMDAlIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHN3YWwyLWFuaW1hdGUtZXJyb3IteC1tYXJrIHtcbiAgMCUge1xuICAgIG1hcmdpbi10b3A6IDEuNjI1ZW07XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICA1MCUge1xuICAgIG1hcmdpbi10b3A6IDEuNjI1ZW07XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICA4MCUge1xuICAgIG1hcmdpbi10b3A6IC0wLjM3NWVtO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xNSk7XG4gIH1cblxuICAxMDAlIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3dhbDItYW5pbWF0ZS1lcnJvci1pY29uIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWCgxMDBkZWcpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMCk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHN3YWwyLWFuaW1hdGUtZXJyb3ItaWNvbiB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTAwZGVnKTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDApO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHN3YWwyLXJvdGF0ZS1sb2FkaW5nIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHN3YWwyLXJvdGF0ZS1sb2FkaW5nIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgfVxufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3dhbDItYW5pbWF0ZS1xdWVzdGlvbi1tYXJrIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWSgtMzYwZGVnKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWSgwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHN3YWwyLWFuaW1hdGUtcXVlc3Rpb24tbWFyayB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTM2MGRlZyk7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMCk7XG4gIH1cbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHN3YWwyLWFuaW1hdGUtaS1tYXJrIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuXG4gIDI1JSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVaKC0yNWRlZyk7XG4gICAgb3BhY2l0eTogMC40O1xuICB9XG5cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMTVkZWcpO1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxuXG4gIDc1JSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVaKC01ZGVnKTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDApO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBzd2FsMi1hbmltYXRlLWktbWFyayB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooNDVkZWcpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICAyNSUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWigtMjVkZWcpO1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgfVxuXG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVaKDE1ZGVnKTtcbiAgICBvcGFjaXR5OiAwLjg7XG4gIH1cblxuICA3NSUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWigtNWRlZyk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWCgwKTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl90b0Rpc3BsYXlTdHJpbmciLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGlu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
