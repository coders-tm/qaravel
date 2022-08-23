import { Q as QItem, a as QItemSection, b as QList, _ as __require_context_for_vite_0_0 } from "./BaseAlert.abd8bfd6.js";
import { _ as _export_sfc, S as openBlock, U as createBlock, V as withCtx, a9 as renderSlot, aa as normalizeClass, a2 as QBtn, v as createComponent, c as computed, h, I as hSlot, r as ref, O as isKeyCode, ab as prevent, ac as nextTick, ad as addEvt, w as watch, o as onMounted, x as onBeforeUnmount, g as getCurrentInstance, ae as cleanEvt, af as listenOpts, ag as portalList, ah as client, ai as getScrollbarWidth, aj as useModelToggleProps, J as useDarkProps, ak as useTransitionProps, al as useModelToggleEmits, L as useDark, am as useTick, an as useTimeout, ao as useTransition, ap as useModelToggle, aq as usePortal, ar as addFocusout, as as position, at as removeFocusout, au as removeEscapeKey, av as getScrollTarget, aw as Transition, ax as addEscapeKey, ay as addFocusFn, az as closePortalMenus, aA as childHasFocus, Q as stopAndPrevent, aB as useBtnProps, a5 as QIcon, aC as stop, aD as createDirective, aE as getPortalVm, aF as closePortals, d as createVNode, aG as normalizeStyle, a3 as QCard, a4 as QDialog, a6 as createTextVNode, $ as toDisplayString, aH as withDirectives, aI as vShow, aJ as QSeparator, Y as createCommentVNode, Z as QCardSection, X as createElementBlock, W as createBaseVNode, F as Fragment, aK as QInput, aL as useFieldProps, aM as useFieldEmits, aN as useField, aO as useFieldState, aP as useSizeProps, aQ as useSize, aR as hDir, aS as hMergeSlotSafely, aT as Ripple, n as noop, aU as debounce, aV as onBeforeMount, aW as onDeactivated, aX as onActivated, aY as useFormProps, aZ as useFormInputNameAttr, a_ as onBeforeUpdate, a$ as onUpdated, b0 as isDeepEqual, b1 as normalizeToInterval, b2 as shouldIgnoreKey, b3 as fieldValueIsFilled, b4 as hMergeSlot, b5 as useKeyComposition, b6 as createSlots, R as hUniqueSlot, b7 as vmHasRouter, b8 as History, b9 as isNumber, j as isDate, C as isObject, ba as injectMultipleProps, bb as QCheckbox, bc as injectProp, a0 as renderList, bd as resolveComponent, be as mergeProps, bf as normalizeProps, bg as guardReactiveProps, bh as withModifiers, bi as resolveDynamicComponent, bj as QSpinner, f as boot } from "./index.94c1c68b.js";
import { c as clearSelection, Q as QItemLabel, a as QDrawer } from "./QDrawer.52c6c3cc.js";
import { Q as QToolbarTitle } from "./QToolbarTitle.6fb5e67d.js";
import { Q as QToolbar } from "./QToolbar.9688c05b.js";
import { Q as QForm } from "./QForm.e37934b9.js";
import { Q as QSpace } from "./QSpace.a4fd6aed.js";
import { l as lodash } from "./lodash.2b44b28e.js";
import { Q as QSkeleton } from "./QSkeleton.9692c295.js";
var BaseBtn_vue_vue_type_style_index_0_lang = "";
const _sfc_main$d = {
  props: {
    link: {
      type: [Boolean],
      required: false,
      default: false
    },
    icon: String,
    verticalMiddel: Boolean
  }
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBtn, {
    color: "primary",
    "no-caps": "",
    ripple: !$props.link,
    class: normalizeClass({
      "base-btn__no-focus btn-link": $props.link,
      "has-icon": $props.icon,
      "no-icon": !$props.icon,
      "base-btn": true,
      "vertical-align-middle": $props.verticalMiddel
    }),
    flat: $props.link,
    dense: $props.link,
    icon: $props.icon,
    size: "13px"
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["ripple", "class", "flat", "dense", "icon"]);
}
var BaseBtn = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "BaseBtn.vue"]]);
var __require_context_for_vite_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseBtn
}, Symbol.toStringTag, { value: "Module" }));
var QBtnGroup = createComponent({
  name: "QBtnGroup",
  props: {
    unelevated: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    square: Boolean,
    push: Boolean,
    stretch: Boolean,
    glossy: Boolean,
    spread: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => {
      const cls = ["unelevated", "outline", "flat", "rounded", "square", "push", "stretch", "glossy"].filter((t) => props[t] === true).map((t) => `q-btn-group--${t}`).join(" ");
      return `q-btn-group row no-wrap${cls.length > 0 ? " " + cls : ""}` + (props.spread === true ? " q-btn-group--spread" : " inline");
    });
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const useAnchorProps = {
  target: {
    default: true
  },
  noParentEvent: Boolean,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  configureAnchorEl
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) {
          return;
        }
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        clearTimeout(touchTimer);
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) {
        return;
      }
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
let timer;
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  clearTimeout(timer);
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) {
    return;
  }
  let portalIndex = portalList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalList[portalIndex].$;
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) {
      return;
    }
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index > -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      clearTimeout(timer);
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width: width2, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width2 += offset[0];
    height += offset[1];
  }
  return {
    top,
    left,
    right,
    bottom,
    width: width2,
    height,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getTargetProps(el) {
  return {
    top: 0,
    center: el.offsetHeight / 2,
    bottom: el.offsetHeight,
    left: 0,
    middle: el.offsetWidth / 2,
    right: el.offsetWidth
  };
}
function setPosition(cfg) {
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  let anchorProps;
  const { scrollLeft, scrollTop } = cfg.el;
  if (cfg.absoluteOffset === void 0) {
    anchorProps = getAnchorProps(cfg.anchorEl, cfg.cover === true ? [0, 0] : cfg.offset);
  } else {
    const { top: anchorTop, left: anchorLeft } = cfg.anchorEl.getBoundingClientRect(), top = anchorTop + cfg.absoluteOffset.top, left = anchorLeft + cfg.absoluteOffset.left;
    anchorProps = { top, left, width: 1, height: 1, right: left + 1, center: top, middle: left, bottom: top + 1 };
  }
  let elStyle = {
    maxHeight: cfg.maxHeight,
    maxWidth: cfg.maxWidth,
    visibility: "visible"
  };
  if (cfg.fit === true || cfg.cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cfg.cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(cfg.el.style, elStyle);
  const targetProps = getTargetProps(cfg.el), props = {
    top: anchorProps[cfg.anchorOrigin.vertical] - targetProps[cfg.selfOrigin.vertical],
    left: anchorProps[cfg.anchorOrigin.horizontal] - targetProps[cfg.selfOrigin.horizontal]
  };
  applyBoundaries(props, anchorProps, targetProps, cfg.anchorOrigin, cfg.selfOrigin);
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(cfg.el.style, elStyle);
  if (cfg.el.scrollTop !== scrollTop) {
    cfg.el.scrollTop = scrollTop;
  }
  if (cfg.el.scrollLeft !== scrollLeft) {
    cfg.el.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
var QMenu = createComponent({
  name: "QMenu",
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },
    scrollTarget: {
      default: void 0
    },
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "escape-key"
  ],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;
    const innerRef = ref(null);
    const showing = ref(false);
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true
    );
    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout, removeTimeout } = useTimeout();
    const { transition, transitionStyle } = useTransition(props, showing);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow } = useAnchor({ showing });
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent);
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);
          if (e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      }
    };
    const anchorOrigin = computed(
      () => parsePosition(
        props.anchor || (props.cover === true ? "center middle" : "bottom start"),
        $q.lang.rtl
      )
    );
    const selfOrigin = computed(() => props.cover === true ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
    const menuClass = computed(
      () => (props.square === true ? " q-menu--square" : "") + (isDark.value === true ? " q-menu--dark q-dark" : "")
    );
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const handlesFocus = computed(
      () => showing.value === true && props.persistent !== true
    );
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      } else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function handleShow(evt) {
      removeTick();
      removeTimeout();
      refocusTarget = props.noRefocus === false ? document.activeElement : null;
      addFocusout(onFocusout);
      showPortal();
      configureScrollTarget();
      absoluteOffset = void 0;
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      if (props.noFocus !== true) {
        document.activeElement.blur();
      }
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }
        updatePosition();
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      removeTimeout();
      hidePortal();
      anchorCleanup(true);
      if (refocusTarget !== null && (evt === void 0 || evt.qClickOutside !== true)) {
        refocusTarget.focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0;
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit("click", e);
      } else {
        avoidAutoClose = false;
      }
    }
    function onFocusout(evt) {
      if (handlesFocus.value === true && props.noFocus !== true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    function onEscapeKey(evt) {
      emit("escape-key");
      hide(evt);
    }
    function updatePosition() {
      const el = innerRef.value;
      if (el === null || anchorEl.value === null) {
        return;
      }
      setPosition({
        el,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function renderPortalContent() {
      return h(
        Transition,
        { name: transition.value, appear: true },
        () => showing.value === true ? h("div", {
          ...attrs,
          ref: innerRef,
          tabindex: -1,
          class: [
            "q-menu q-position-engine scroll" + menuClass.value,
            attrs.class
          ],
          style: [
            attrs.style,
            transitionStyle.value
          ],
          ...onEvents.value
        }, hSlot(slots.default)) : null
      );
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(proxy, { focus, updatePosition });
    return renderPortal;
  }
});
var QBtnDropdown = createComponent({
  name: "QBtnDropdown",
  props: {
    ...useBtnProps,
    modelValue: Boolean,
    split: Boolean,
    dropdownIcon: String,
    contentClass: [Array, String, Object],
    contentStyle: [Array, String, Object],
    cover: Boolean,
    persistent: Boolean,
    noRouteDismiss: Boolean,
    autoClose: Boolean,
    menuAnchor: {
      type: String,
      default: "bottom end"
    },
    menuSelf: {
      type: String,
      default: "top end"
    },
    menuOffset: Array,
    disableMainBtn: Boolean,
    disableDropdown: Boolean,
    noIconAnimation: Boolean
  },
  emits: ["update:modelValue", "click", "before-show", "show", "before-hide", "hide"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const showing = ref(props.modelValue);
    const menuRef = ref(null);
    const attributes = computed(() => {
      const acc = {
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-haspopup": "true"
      };
      if (props.disable === true || (props.split === false && props.disableMainBtn === true || props.disableDropdown === true)) {
        acc["aria-disabled"] = "true";
      }
      return acc;
    });
    const iconClass = computed(
      () => "q-btn-dropdown__arrow" + (showing.value === true && props.noIconAnimation === false ? " rotate-180" : "") + (props.split === false ? " q-btn-dropdown__arrow-container" : "")
    );
    watch(() => props.modelValue, (val) => {
      menuRef.value !== null && menuRef.value[val ? "show" : "hide"]();
    });
    watch(() => props.split, hide);
    function onBeforeShow(e) {
      showing.value = true;
      emit("before-show", e);
    }
    function onShow(e) {
      emit("show", e);
      emit("update:modelValue", true);
    }
    function onBeforeHide(e) {
      showing.value = false;
      emit("before-hide", e);
    }
    function onHide(e) {
      emit("hide", e);
      emit("update:modelValue", false);
    }
    function onClick(e) {
      emit("click", e);
    }
    function onClickHide(e) {
      stop(e);
      hide();
      emit("click", e);
    }
    function toggle(evt) {
      menuRef.value !== null && menuRef.value.toggle(evt);
    }
    function show(evt) {
      menuRef.value !== null && menuRef.value.show(evt);
    }
    function hide(evt) {
      menuRef.value !== null && menuRef.value.hide(evt);
    }
    Object.assign(proxy, {
      show,
      hide,
      toggle
    });
    onMounted(() => {
      props.modelValue === true && show();
    });
    return () => {
      const Arrow = [
        h(QIcon, {
          class: iconClass.value,
          name: props.dropdownIcon || proxy.$q.iconSet.arrow.dropdown
        })
      ];
      props.disableDropdown !== true && Arrow.push(
        h(QMenu, {
          ref: menuRef,
          class: props.contentClass,
          style: props.contentStyle,
          cover: props.cover,
          fit: true,
          persistent: props.persistent,
          noRouteDismiss: props.noRouteDismiss,
          autoClose: props.autoClose,
          anchor: props.menuAnchor,
          self: props.menuSelf,
          offset: props.menuOffset,
          separateClosePopup: true,
          onBeforeShow,
          onShow,
          onBeforeHide,
          onHide
        }, slots.default)
      );
      if (props.split === false) {
        return h(QBtn, {
          class: "q-btn-dropdown q-btn-dropdown--simple",
          ...props,
          disable: props.disable === true || props.disableMainBtn === true,
          noWrap: true,
          round: false,
          ...attributes.value,
          onClick
        }, () => hSlot(slots.label, []).concat(Arrow));
      }
      return h(QBtnGroup, {
        class: "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",
        outline: props.outline,
        flat: props.flat,
        rounded: props.rounded,
        square: props.square,
        push: props.push,
        unelevated: props.unelevated,
        glossy: props.glossy,
        stretch: props.stretch
      }, () => [
        h(QBtn, {
          class: "q-btn-dropdown--current",
          ...props,
          disable: props.disable === true || props.disableMainBtn === true,
          noWrap: true,
          iconRight: props.iconRight,
          round: false,
          onClick: onClickHide
        }, slots.label),
        h(QBtn, {
          class: "q-btn-dropdown__arrow-container q-anchor--skip",
          ...attributes.value,
          disable: props.disable === true || props.disableDropdown === true,
          outline: props.outline,
          flat: props.flat,
          rounded: props.rounded,
          push: props.push,
          size: props.size,
          color: props.color,
          textColor: props.textColor,
          dense: props.dense,
          ripple: props.ripple
        }, () => Arrow)
      ]);
    };
  }
});
var BaseBtnDropdown_vue_vue_type_style_index_0_lang = "";
const _sfc_main$c = {
  props: {
    link: {
      type: [Boolean],
      required: false,
      default: false
    }
  }
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBtnDropdown, {
    color: "primary",
    "no-caps": "",
    ripple: !$props.link,
    class: normalizeClass({ "no-focus": $props.link, "base-btn-dropdown": true }),
    flat: $props.link,
    dense: $props.link,
    size: "13px"
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["ripple", "class", "flat", "dense"]);
}
var BaseBtnDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "BaseBtnDropdown.vue"]]);
var __require_context_for_vite_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseBtnDropdown
}, Symbol.toStringTag, { value: "Module" }));
function getDepth(value) {
  if (value === false) {
    return 0;
  }
  if (value === true || value === void 0) {
    return 1;
  }
  const depth = parseInt(value, 10);
  return isNaN(depth) ? 0 : depth;
}
var ClosePopup = createDirective(
  {
    name: "close-popup",
    beforeMount(el, { value }) {
      const ctx = {
        depth: getDepth(value),
        handler(evt) {
          ctx.depth !== 0 && setTimeout(() => {
            const vm = getPortalVm(el);
            if (vm !== void 0) {
              closePortals(vm, evt, ctx.depth);
            }
          });
        },
        handlerKey(evt) {
          isKeyCode(evt, 13) === true && ctx.handler(evt);
        }
      };
      el.__qclosepopup = ctx;
      el.addEventListener("click", ctx.handler);
      el.addEventListener("keyup", ctx.handlerKey);
    },
    updated(el, { value, oldValue }) {
      if (value !== oldValue) {
        el.__qclosepopup.depth = getDepth(value);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qclosepopup;
      el.removeEventListener("click", ctx.handler);
      el.removeEventListener("keyup", ctx.handlerKey);
      delete el.__qclosepopup;
    }
  }
);
const _sfc_main$b = {
  props: {
    title: {
      required: false,
      type: String,
      default: "Base dialog title"
    },
    contentStyle: {
      required: false,
      type: [String, Object],
      default: "width: 800px; max-width: 95vw"
    },
    bodyStyle: {
      required: false,
      type: [String, Object],
      default: "max-height: 60vh"
    },
    bodyClass: {
      required: false,
      type: [String],
      default: void 0
    },
    contentClass: {
      required: false,
      type: [String],
      default: void 0
    },
    hideFooter: {
      required: false,
      type: [Boolean],
      default: false
    },
    hideHeader: {
      required: false,
      type: [Boolean],
      default: false
    },
    useSeparator: {
      required: false,
      type: [Boolean],
      default: false
    }
  },
  emits: ["ok", "hide"],
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    }
  }
};
const _hoisted_1$6 = /* @__PURE__ */ createBaseVNode("div", { class: "q-py-xl" }, "Base dialog body content.", -1);
const _hoisted_2$5 = { class: "q-gutter-sm" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QDialog, {
    "transition-show": "jump-up",
    "transition-hide": "jump-down",
    class: "base-dialog",
    ref: "dialog",
    onHide: $options.onDialogHide
  }, {
    default: withCtx(() => [
      createVNode(QCard, {
        style: normalizeStyle($props.contentStyle),
        class: normalizeClass($props.contentClass)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            !$props.hideHeader ? renderSlot(_ctx.$slots, "header", { key: 0 }, () => [
              createVNode(QToolbar, {
                style: { "padding": "0 27px", "min-height": "60px" },
                class: "bg-transparent"
              }, {
                default: withCtx(() => [
                  createVNode(QToolbarTitle, { class: "text-h6 text-weight-medium" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString($props.title), 1)
                    ]),
                    _: 1
                  }),
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    size: "11px",
                    round: "",
                    dense: "",
                    icon: "fal fa-times"
                  }, null, 512), [
                    [ClosePopup]
                  ])
                ]),
                _: 1
              }),
              withDirectives(createVNode(QSeparator, null, null, 512), [
                [vShow, $props.useSeparator]
              ])
            ]) : createCommentVNode("", true),
            createVNode(QCardSection, {
              style: normalizeStyle($props.bodyStyle),
              class: normalizeClass($props.bodyClass)
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "body", {}, () => [
                  _hoisted_1$6
                ])
              ]),
              _: 3
            }, 8, ["style", "class"]),
            !$props.hideFooter ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              withDirectives(createVNode(QSeparator, null, null, 512), [
                [vShow, $props.useSeparator]
              ]),
              renderSlot(_ctx.$slots, "footer", {}, () => [
                createVNode(QCardSection, { class: "text-right" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$5, [
                      withDirectives(createVNode(QBtn, {
                        "no-caps": "",
                        label: "Done",
                        color: "primary"
                      }, null, 512), [
                        [ClosePopup]
                      ])
                    ])
                  ]),
                  _: 1
                })
              ])
            ], 64)) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "loading")
          ])
        ]),
        _: 3
      }, 8, ["style", "class"])
    ]),
    _: 3
  }, 8, ["onHide"]);
}
var BaseDialog = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "BaseDialog.vue"]]);
var __require_context_for_vite_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseDialog
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  props: {
    submited: {
      required: false,
      type: Boolean,
      default: () => false
    },
    resetable: {
      required: false,
      type: Boolean,
      default: () => false
    },
    disable: {
      required: false,
      type: Boolean,
      default: () => false
    },
    cancelable: {
      required: false,
      type: Boolean,
      default: () => true
    },
    square: {
      required: false,
      type: Boolean,
      default: () => false
    },
    bordered: {
      required: false,
      type: Boolean,
      default: () => false
    },
    submit: {
      required: false,
      type: Boolean,
      default: () => true
    },
    contentClass: {
      required: false,
      type: String,
      default: () => ""
    }
  },
  emits: ["cancel", "reset"],
  methods: {
    onCancel() {
      console.func("components/base/base-form:methods.onCancel()", arguments);
      this.$emit("cancel");
    },
    onReset() {
      console.func("components/base/base-form:methods.onReset()", arguments);
      this.$core.confirm(
        "If you discard changes, you\u2019ll delete any edits you made since you last saved.",
        {
          title: "Discard all unsaved changes?",
          ok: "Discard changes",
          cancel: "Continue editing",
          okColor: "negative"
        }
      ).then(() => {
        this.$store.commit("app/setDirt", false);
        this.$emit("reset");
      });
    },
    addHandler() {
      window.addEventListener("form:discard", this.onDiscard);
      window.addEventListener("form:save", this.onSave);
    },
    removeHandler() {
      window.removeEventListener("form:discard", this.onDiscard);
      window.removeEventListener("form:save", this.onSave);
    },
    onDiscard() {
      console.func("components/base/base-form:methods.onDiscard()", arguments);
      this.onReset();
    },
    onSave() {
      console.func("components/base/base-form:methods.onSave()", arguments);
      this.$refs.baseForm.submit();
    }
  },
  watch: {
    resetable(val) {
      this.$store.commit("app/setDirt", val);
    }
  },
  created() {
    this.addHandler();
  },
  beforeUnmount() {
    this.removeHandler();
  }
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QForm, {
    class: "base-form",
    ref: "baseForm"
  }, {
    default: withCtx(() => [
      createVNode(QCard, {
        flat: "",
        square: $props.square,
        bordered: $props.bordered,
        class: normalizeClass(`bg-transparent ${$props.contentClass}`)
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "q-pa-none form-body" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }),
          createVNode(QCardSection, { class: "form-actions q-pa-none q-mt-md" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "actions", {}, () => [
                $props.resetable && !$props.submited ? (openBlock(), createBlock(QBtn, {
                  key: 0,
                  "no-caps": "",
                  onClick: $options.onReset,
                  label: "Reset",
                  color: "grey",
                  class: "q-mr-sm"
                }, null, 8, ["onClick"])) : createCommentVNode("", true),
                $props.cancelable ? (openBlock(), createBlock(QBtn, {
                  key: 1,
                  disable: $props.submited,
                  "no-caps": "",
                  onClick: $options.onCancel,
                  label: "Cancel",
                  color: "negative",
                  class: "q-mr-sm"
                }, null, 8, ["disable", "onClick"])) : createCommentVNode("", true),
                withDirectives(createVNode(QBtn, {
                  disable: $props.disable,
                  loading: $props.submited,
                  "no-caps": "",
                  label: "Save",
                  type: "submit",
                  color: "primary"
                }, null, 8, ["disable", "loading"]), [
                  [vShow, $props.submit]
                ])
              ])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["square", "bordered", "class"])
    ]),
    _: 3
  }, 512);
}
var BaseForm = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "BaseForm.vue"]]);
var __require_context_for_vite_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseForm
}, Symbol.toStringTag, { value: "Module" }));
var QBanner = createComponent({
  name: "QBanner",
  props: {
    ...useDarkProps,
    inlineActions: Boolean,
    dense: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => "q-banner row items-center" + (props.dense === true ? " q-banner--dense" : "") + (isDark.value === true ? " q-banner--dark q-dark" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const actionClass = computed(
      () => `q-banner__actions row items-center justify-end col-${props.inlineActions === true ? "auto" : "all"}`
    );
    return () => {
      const child = [
        h("div", {
          class: "q-banner__avatar col-auto row items-center self-start"
        }, hSlot(slots.avatar)),
        h("div", {
          class: "q-banner__content col text-body2"
        }, hSlot(slots.default))
      ];
      const actions = hSlot(slots.action);
      actions !== void 0 && child.push(
        h("div", { class: actionClass.value }, actions)
      );
      return h("div", {
        class: classes.value + (props.inlineActions === false && actions !== void 0 ? " q-banner--top-padding" : ""),
        role: "alert"
      }, child);
    };
  }
});
const _sfc_main$9 = {};
const _hoisted_1$5 = { class: "flex row items-center" };
const _hoisted_2$4 = { class: "col-auto q-mr-md avatar" };
const _hoisted_3$4 = { class: "col message" };
function _sfc_render$9(_ctx, _cache) {
  return openBlock(), createBlock(QBanner, { class: "bg-orange-1" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$4, [
          renderSlot(_ctx.$slots, "avatar", {}, () => [
            createVNode(QIcon, {
              size: "sm",
              name: "fas fa-info-circle",
              color: "warning"
            })
          ])
        ]),
        createBaseVNode("div", _hoisted_3$4, [
          renderSlot(_ctx.$slots, "default")
        ])
      ])
    ]),
    _: 3
  });
}
var BaseInfo = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "BaseInfo.vue"]]);
var __require_context_for_vite_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseInfo
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {
  props: {
    modelValue: {},
    type: String,
    label: String,
    bgColor: String,
    dense: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onChange(value) {
      console.func("components/base/BaseInput:methods.onChange", arguments);
      this.$emit("update:model-value", value);
    }
  }
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QInput, {
    dense: $props.dense,
    "bg-color": $props.bgColor,
    outlined: $props.outlined,
    modelValue: $props.modelValue,
    type: $props.type,
    label: $props.label,
    "onUpdate:modelValue": $options.onChange
  }, null, 8, ["dense", "bg-color", "outlined", "modelValue", "type", "label", "onUpdate:modelValue"]);
}
var BaseInput = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "BaseInput.vue"]]);
var __require_context_for_vite_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseInput
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  props: {
    label: String,
    icon: String,
    iconColor: String,
    link: Boolean
  }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createBlock(QItem, {
    clickable: "",
    class: normalizeClass({
      "base-item text-weight-medium rounded-borders": true,
      link: $props.link
    })
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        $props.icon ? (openBlock(), createBlock(QItemSection, {
          key: 0,
          style: { "min-width": "auto" },
          avatar: ""
        }, {
          default: withCtx(() => [
            createVNode(QIcon, {
              color: $props.iconColor,
              size: "18px",
              name: $props.icon
            }, null, 8, ["color", "name"])
          ]),
          _: 1
        })) : createCommentVNode("", true),
        createVNode(QItemSection, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString($props.label), 1)
          ]),
          _: 1
        })
      ])
    ]),
    _: 3
  }, 8, ["class"])), [
    [ClosePopup]
  ]);
}
var BaseItem = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "BaseItem.vue"]]);
var __require_context_for_vite_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseItem
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  props: {
    title: String,
    required: Boolean
  }
};
const _hoisted_1$4 = { class: "base-label flex items-center" };
const _hoisted_2$3 = { class: "text-label" };
const _hoisted_3$3 = {
  key: 0,
  class: "q-ml-xs"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createBaseVNode("div", _hoisted_2$3, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString($props.title), 1)
      ]),
      $props.required ? (openBlock(), createElementBlock("span", _hoisted_3$3, "*")) : createCommentVNode("", true)
    ])
  ]);
}
var BaseLabel = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "BaseLabel.vue"]]);
var __require_context_for_vite_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseLabel
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  props: {
    dark: Boolean,
    square: Boolean,
    flat: Boolean,
    bordered: Boolean,
    hasBottom: Boolean,
    contentClass: {
      type: String,
      default: "base-section"
    },
    bodyClass: String,
    title: String,
    description: String,
    noRow: Boolean
  },
  computed: {
    hasTop() {
      return this.title ? true : this.description ? true : false;
    },
    getBodyClass() {
      return `${this.bodyClass} ${this.hasTop ? "q-pt-none" : ""}`;
    }
  }
};
const _hoisted_1$3 = { class: "flex" };
const _hoisted_2$2 = {
  key: 0,
  class: "text-h6"
};
const _hoisted_3$2 = {
  key: 0,
  class: "row q-col-gutter-lg"
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, {
    dark: $props.dark,
    square: $props.square,
    flat: $props.flat,
    bordered: $props.bordered,
    class: normalizeClass(`${$props.contentClass}`)
  }, {
    default: withCtx(() => [
      $options.hasTop ? (openBlock(), createBlock(QCardSection, {
        key: 0,
        class: "q-pb-xs"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$3, [
            $props.title ? (openBlock(), createElementBlock("div", _hoisted_2$2, toDisplayString($props.title), 1)) : createCommentVNode("", true),
            createVNode(QSpace),
            renderSlot(_ctx.$slots, "action")
          ]),
          $props.description ? (openBlock(), createBlock(QItemLabel, { key: 0 }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($props.description), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 3
      })) : createCommentVNode("", true),
      createVNode(QCardSection, {
        class: normalizeClass($options.getBodyClass)
      }, {
        default: withCtx(() => [
          !$props.noRow ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
            renderSlot(_ctx.$slots, "default")
          ])) : renderSlot(_ctx.$slots, "default", { key: 1 })
        ]),
        _: 3
      }, 8, ["class"]),
      $props.hasBottom ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createVNode(QSeparator),
        createVNode(QCardSection, null, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "bottom")
          ]),
          _: 3
        })
      ], 64)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["dark", "square", "flat", "bordered", "class"]);
}
var BaseSection = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "BaseSection.vue"]]);
var __require_context_for_vite_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseSection
}, Symbol.toStringTag, { value: "Module" }));
var QField = createComponent({
  name: "QField",
  inheritAttrs: false,
  props: useFieldProps,
  emits: useFieldEmits,
  setup() {
    return useField(useFieldState());
  }
});
const defaultSizes$1 = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes$1);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null)
    );
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 });
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(
        h("div", { class: "q-focus-helper" })
      );
      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--left",
          name: leftIcon.value
        })
      );
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(
        h("div", {
          class: "q-chip__content col row no-wrap items-center q-anchor--skip"
        }, hMergeSlotSafely(slots.default, label))
      );
      props.iconRight && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--right",
          name: props.iconRight
        })
      );
      props.removable === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--remove cursor-pointer",
          name: removeIcon.value,
          ...attributes.value,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );
      return child;
    }
    return () => {
      if (props.modelValue === false) {
        return;
      }
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(
        data,
        attributes.value,
        { onClick, onKeyup }
      );
      return hDir(
        "div",
        data,
        getContent(),
        "ripple",
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]]
      );
    };
  }
});
let rtlHasScrollBug = false;
{
  const scroller = document.createElement("div");
  const spacer = document.createElement("div");
  scroller.setAttribute("dir", "rtl");
  scroller.style.width = "1px";
  scroller.style.height = "1px";
  scroller.style.overflow = "auto";
  spacer.style.width = "1000px";
  spacer.style.height = "1px";
  document.body.appendChild(scroller);
  scroller.appendChild(spacer);
  scroller.scrollLeft = -1e3;
  rtlHasScrollBug = scroller.scrollLeft >= 0;
  scroller.remove();
}
const aggBucketSize = 1e3;
const scrollToEdges = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
];
const filterProto = Array.prototype.filter;
const setOverflowAnchor = window.getComputedStyle(document.body).overflowAnchor === void 0 ? noop : function(contentEl, index) {
  if (contentEl === null) {
    return;
  }
  cancelAnimationFrame(contentEl._qOverflowAnimationFrame);
  contentEl._qOverflowAnimationFrame = requestAnimationFrame(() => {
    if (contentEl === null) {
      return;
    }
    const children = contentEl.children || [];
    filterProto.call(children, (el2) => el2.dataset && el2.dataset.qVsAnchor !== void 0).forEach((el2) => {
      delete el2.dataset.qVsAnchor;
    });
    const el = children[index];
    if (el && el.dataset) {
      el.dataset.qVsAnchor = "";
    }
  });
};
function sumFn(acc, h2) {
  return acc + h2;
}
function getScrollDetails(parent, child, beforeRef, afterRef, horizontal, rtl, stickyStart, stickyEnd) {
  const parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent, propElSize = horizontal === true ? "offsetWidth" : "offsetHeight", details = {
    scrollStart: 0,
    scrollViewSize: -stickyStart - stickyEnd,
    scrollMaxSize: 0,
    offsetStart: -stickyStart,
    offsetEnd: -stickyEnd
  };
  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
      details.scrollViewSize += document.documentElement.clientWidth;
    } else {
      details.scrollStart = parentCalc.scrollLeft;
      details.scrollViewSize += parentCalc.clientWidth;
    }
    details.scrollMaxSize = parentCalc.scrollWidth;
    if (rtl === true) {
      details.scrollStart = (rtlHasScrollBug === true ? details.scrollMaxSize - details.scrollViewSize : 0) - details.scrollStart;
    }
  } else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
      details.scrollViewSize += document.documentElement.clientHeight;
    } else {
      details.scrollStart = parentCalc.scrollTop;
      details.scrollViewSize += parentCalc.clientHeight;
    }
    details.scrollMaxSize = parentCalc.scrollHeight;
  }
  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetStart += el[propElSize];
      }
    }
  }
  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetEnd += el[propElSize];
      }
    }
  }
  if (child !== parent) {
    const parentRect = parentCalc.getBoundingClientRect(), childRect = child.getBoundingClientRect();
    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left;
      details.offsetEnd -= childRect.width;
    } else {
      details.offsetStart += childRect.top - parentRect.top;
      details.offsetEnd -= childRect.height;
    }
    if (parent !== window) {
      details.offsetStart += details.scrollStart;
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart;
  }
  return details;
}
function setScroll(parent, scroll, horizontal, rtl) {
  if (scroll === "end") {
    scroll = (parent === window ? document.body : parent)[horizontal === true ? "scrollWidth" : "scrollHeight"];
  }
  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll = (rtlHasScrollBug === true ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - scroll;
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    } else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
    }
  } else if (horizontal === true) {
    if (rtl === true) {
      scroll = (rtlHasScrollBug === true ? parent.scrollWidth - parent.offsetWidth : 0) - scroll;
    }
    parent.scrollLeft = scroll;
  } else {
    parent.scrollTop = scroll;
  }
}
function sumSize(sizeAgg, size, from, to) {
  if (from >= to) {
    return 0;
  }
  const lastTo = size.length, fromAgg = Math.floor(from / aggBucketSize), toAgg = Math.floor((to - 1) / aggBucketSize) + 1;
  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);
  if (from % aggBucketSize !== 0) {
    total -= size.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
  }
  return total;
}
const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: null
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0
  },
  tableColspan: [Number, String]
};
const commonVirtPropsList = Object.keys(commonVirtScrollProps);
const useVirtualScrollProps = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...commonVirtScrollProps
};
function useVirtualScroll({
  virtualScrollLength,
  getVirtualScrollTarget,
  getVirtualScrollEl,
  virtualScrollItemSizeComputed
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  const { $q } = proxy;
  let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;
  const virtualScrollPaddingBefore = ref(0);
  const virtualScrollPaddingAfter = ref(0);
  const virtualScrollSliceSizeComputed = ref({});
  const beforeRef = ref(null);
  const afterRef = ref(null);
  const contentRef = ref(null);
  const virtualScrollSliceRange = ref({ from: 0, to: 0 });
  const colspanAttr = computed(() => props.tableColspan !== void 0 ? props.tableColspan : 100);
  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
  }
  const needsReset = computed(() => virtualScrollItemSizeComputed.value + ";" + props.virtualScrollHorizontal);
  const needsSliceRecalc = computed(
    () => needsReset.value + ";" + props.virtualScrollSliceRatioBefore + ";" + props.virtualScrollSliceRatioAfter
  );
  watch(needsSliceRecalc, () => {
    setVirtualScrollSize();
  });
  watch(needsReset, reset);
  function reset() {
    localResetVirtualScroll(prevToIndex, true);
  }
  function refresh(toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
  }
  function scrollTo(toIndex, edge) {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return;
    }
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    );
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)),
      0,
      scrollToEdges.indexOf(edge) > -1 ? edge : prevToIndex > -1 && toIndex > prevToIndex ? "end" : "start"
    );
  }
  function localOnVirtualScrollEvt() {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return;
    }
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    ), listLastIndex = virtualScrollLength.value - 1, listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;
    if (prevScrollStart === scrollDetails.scrollStart) {
      return;
    }
    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
      return;
    }
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
    const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) - Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2));
    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(
        scrollEl,
        scrollDetails,
        listLastIndex,
        scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0)
      );
      return;
    }
    let toIndex = 0, listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart, offset = listOffset;
    if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
      listOffset -= virtualScrollPaddingBefore.value;
      toIndex = virtualScrollSliceRange.value.from;
      offset = listOffset;
    } else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[j];
        toIndex += aggBucketSize;
      }
    }
    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[toIndex];
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++;
        offset = listOffset;
      } else {
        offset = virtualScrollSizes[toIndex] + listOffset;
      }
    }
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      toIndex,
      offset
    );
  }
  function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === "string" && align.indexOf("-force") > -1;
    const alignEnd = alignForce === true ? align.replace("-force", "") : align;
    const alignRange = alignEnd !== void 0 ? alignEnd : "start";
    let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]), to = from + virtualScrollSliceSizeComputed.value.total;
    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value;
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
    }
    prevScrollStart = scrollDetails.scrollStart;
    const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;
    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex);
      return;
    }
    const { activeElement } = document;
    const contentEl = contentRef.value;
    if (rangeChanged === true && contentEl !== null && contentEl !== activeElement && contentEl.contains(activeElement) === true) {
      contentEl.addEventListener("focusout", onBlurRefocusFn);
      setTimeout(() => {
        contentEl !== null && contentEl.removeEventListener("focusout", onBlurRefocusFn);
      });
    }
    setOverflowAnchor(contentEl, toIndex - from);
    const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;
    if (rangeChanged === true) {
      const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to ? virtualScrollSliceRange.value.to : to;
      virtualScrollSliceRange.value = { from, to: tempTo };
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
      requestAnimationFrame(() => {
        if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to };
          virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
        }
      });
    }
    requestAnimationFrame(() => {
      if (prevScrollStart !== scrollDetails.scrollStart) {
        return;
      }
      if (rangeChanged === true) {
        updateVirtualScrollSizes(from);
      }
      const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0), posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value, posEnd = posStart + virtualScrollSizes[toIndex];
      let scrollPosition = posStart + offset;
      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore;
        const scrollStart = scrollDetails.scrollStart + sizeDiff;
        scrollPosition = alignForce !== true && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize ? scrollStart : alignEnd === "end" ? posEnd - scrollDetails.scrollViewSize : posStart - (alignEnd === "start" ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2));
      }
      prevScrollStart = scrollPosition;
      setScroll(
        scrollEl,
        scrollPosition,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
      emitScroll(toIndex);
    });
  }
  function updateVirtualScrollSizes(from) {
    const contentEl = contentRef.value;
    if (contentEl) {
      const children = filterProto.call(
        contentEl.children,
        (el) => el.classList && el.classList.contains("q-virtual-scroll--skip") === false
      ), childrenLength = children.length, sizeFn = props.virtualScrollHorizontal === true ? (el) => el.getBoundingClientRect().width : (el) => el.offsetHeight;
      let index = from, size, diff;
      for (let i = 0; i < childrenLength; ) {
        size = sizeFn(children[i]);
        i++;
        while (i < childrenLength && children[i].classList.contains("q-virtual-scroll--with-prev") === true) {
          size += sizeFn(children[i]);
          i++;
        }
        diff = size - virtualScrollSizes[index];
        if (diff !== 0) {
          virtualScrollSizes[index] += diff;
          virtualScrollSizesAgg[Math.floor(index / aggBucketSize)] += diff;
        }
        index++;
      }
    }
  }
  function onBlurRefocusFn() {
    contentRef.value !== null && contentRef.value !== void 0 && contentRef.value.focus();
  }
  function localResetVirtualScroll(toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value;
    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = [];
    }
    const oldVirtualScrollSizesLength = virtualScrollSizes.length;
    virtualScrollSizes.length = virtualScrollLength.value;
    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[i] = defaultSize;
    }
    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
    virtualScrollSizesAgg = [];
    for (let j = 0; j <= jMax; j++) {
      let size = 0;
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size += virtualScrollSizes[i];
      }
      virtualScrollSizesAgg.push(size);
    }
    prevToIndex = -1;
    prevScrollStart = void 0;
    virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
    virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);
    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
      nextTick(() => {
        scrollTo(toIndex);
      });
    } else {
      onVirtualScrollEvt();
    }
  }
  function setVirtualScrollSize(scrollViewSize) {
    if (scrollViewSize === void 0 && typeof window !== "undefined") {
      const scrollEl = getVirtualScrollTarget();
      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(
          scrollEl,
          getVirtualScrollEl(),
          beforeRef.value,
          afterRef.value,
          props.virtualScrollHorizontal,
          $q.lang.rtl,
          props.virtualScrollStickySizeStart,
          props.virtualScrollStickySizeEnd
        ).scrollViewSize;
      }
    }
    localScrollViewSize = scrollViewSize;
    const virtualScrollSliceRatioBefore = parseFloat(props.virtualScrollSliceRatioBefore) || 0;
    const virtualScrollSliceRatioAfter = parseFloat(props.virtualScrollSliceRatioAfter) || 0;
    const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter;
    const view = scrollViewSize === void 0 || scrollViewSize <= 0 ? 1 : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);
    const baseSize = Math.max(
      1,
      view,
      Math.ceil((props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier)
    );
    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
      view
    };
  }
  function padVirtualScroll(tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? "width" : "height";
    const style = {
      ["--q-virtual-scroll-item-" + paddingSize]: virtualScrollItemSizeComputed.value + "px"
    };
    return [
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef,
        style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style }
      }),
      h(tag, {
        class: "q-virtual-scroll__content",
        key: "content",
        ref: contentRef,
        tabindex: -1
      }, content.flat()),
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef,
        style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style }
      })
    ];
  }
  function emitScroll(index) {
    if (prevToIndex !== index) {
      props.onVirtualScroll !== void 0 && emit("virtual-scroll", {
        index,
        from: virtualScrollSliceRange.value.from,
        to: virtualScrollSliceRange.value.to - 1,
        direction: index < prevToIndex ? "decrease" : "increase",
        ref: proxy
      });
      prevToIndex = index;
    }
  }
  setVirtualScrollSize();
  const onVirtualScrollEvt = debounce(
    localOnVirtualScrollEvt,
    $q.platform.is.ios === true ? 120 : 35
  );
  onBeforeMount(() => {
    setVirtualScrollSize();
  });
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    if (shouldActivate !== true) {
      return;
    }
    const scrollEl = getVirtualScrollTarget();
    if (prevScrollStart !== void 0 && scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
      setScroll(
        scrollEl,
        prevScrollStart,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
    } else {
      scrollTo(prevToIndex);
    }
  });
  onBeforeUnmount(() => {
    onVirtualScrollEvt.cancel();
  });
  Object.assign(proxy, { scrollTo, reset, refresh });
  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,
    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,
    scrollTo,
    reset,
    refresh
  };
}
const validateNewValueMode$1 = (v) => ["add", "add-unique", "toggle"].includes(v);
const reEscapeList = ".*+?^${}()|[]\\";
const fieldPropsList = Object.keys(useFieldProps);
var QSelect = createComponent({
  name: "QSelect",
  inheritAttrs: false,
  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,
    modelValue: {
      required: true
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode$1
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: String,
    transitionHide: String,
    transitionDuration: [String, Number],
    behavior: {
      type: String,
      validator: (v) => ["default", "menu", "dialog"].includes(v),
      default: "default"
    },
    virtualScrollItemSize: {
      type: [Number, String],
      default: void 0
    },
    onNewValue: Function,
    onFilter: Function
  },
  emits: [
    ...useFieldEmits,
    "add",
    "remove",
    "input-value",
    "new-value",
    "keyup",
    "keypress",
    "keydown",
    "filter-abort"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref("");
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);
    let inputTimer, innerValueCache, hasDialog, userInputValue, filterId, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const onComposition = useKeyComposition(onInput);
    const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
    const virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize === void 0 ? props.optionsDense === true ? 24 : 48 : props.virtualScrollItemSize);
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });
    const state = useFieldState();
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true) ? props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : [];
        const values = val.map((v) => getOption(v, cache));
        return props.modelValue === null && mapNull === true ? values.filter((v) => v !== null) : values;
      }
      return val;
    });
    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach((key) => {
        const val = props[key];
        if (val !== void 0) {
          acc[key] = val;
        }
      });
      return acc;
    });
    const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const computedInputClass = computed(() => {
      let cls = "q-field__input q-placeholder col";
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass];
      }
      cls += " q-field__input--padding";
      return props.inputClass === void 0 ? cls : [cls, props.inputClass];
    });
    const menuContentClass = computed(
      () => (props.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : "")
    );
    const noOptions = computed(() => virtualScrollLength.value === 0);
    const selectedString = computed(
      () => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", ")
    );
    const needsHtmlFn = computed(() => props.optionsHtml === true ? () => true : (opt) => opt !== void 0 && opt !== null && opt.html === true);
    const valueAsHtml = computed(() => props.displayValueHtml === true || props.displayValue === void 0 && (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value)));
    const tabindex = computed(() => state.focused.value === true ? props.tabindex : -1);
    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: "combobox",
        "aria-label": props.label,
        "aria-autocomplete": props.useInput === true ? "list" : "none",
        "aria-expanded": menu.value === true ? "true" : "false",
        "aria-owns": `${state.targetUid.value}_lb`,
        "aria-controls": `${state.targetUid.value}_lb`
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const listboxAttrs = computed(() => {
      const attrs = {
        id: `${state.targetUid.value}_lb`,
        role: "listbox",
        "aria-multiselectable": props.multiple === true ? "true" : "false"
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }));
    });
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const { from, to } = virtualScrollSliceRange.value;
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const index = from + i;
        const itemProps = {
          clickable: true,
          active: false,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: "option",
          id: `${state.targetUid.value}_${index}`,
          onClick: () => {
            toggleOption(opt);
          }
        };
        if (disable !== true) {
          isOptionSelected(opt) === true && (itemProps.active = true);
          optionIndex.value === index && (itemProps.focused = true);
          itemProps["aria-selected"] = itemProps.active === true ? "true" : "false";
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              menu.value === true && setOptionIndex(index);
            };
          }
        }
        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        };
      });
    });
    const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
    const squaredMenu = computed(
      () => props.optionsCover === false && props.outlined !== true && props.standout !== true && props.borderless !== true && props.rounded !== true
    );
    const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
    const innerOptionsValue = computed(() => innerValue.value.map((opt) => getOptionValue.value(opt)));
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e);
        }
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      return evt;
    });
    watch(innerValue, (val) => {
      innerValueCache = val;
      if (props.useInput === true && props.fillInput === true && props.multiple !== true && state.innerLoading.value !== true && (dialog.value !== true && menu.value !== true || hasValue.value !== true)) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter("");
        }
      }
    }, { immediate: true });
    watch(() => props.fillInput, resetInputValue);
    watch(menu, updateMenu);
    watch(virtualScrollLength, rerenderMenu);
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt;
    }
    function removeAtIndex(index) {
      if (index > -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit("remove", { index, value: model.splice(index, 1)[0] });
          emit("update:modelValue", model);
        } else {
          emit("update:modelValue", null);
        }
      }
    }
    function removeAtIndexAndFocus(index) {
      removeAtIndex(index);
      state.focus();
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt);
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(
          getOptionLabel.value(opt),
          true,
          true
        );
        emit("update:modelValue", val);
        return;
      }
      if (innerValue.value.length === 0) {
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      if (unique === true && isOptionSelected(opt) === true) {
        return;
      }
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) {
        return;
      }
      const model = props.modelValue.slice();
      emit("add", { index: model.length, value: val });
      model.push(val);
      emit("update:modelValue", model);
    }
    function toggleOption(opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) {
        return;
      }
      const optValue = getOptionValue.value(opt);
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(
            props.fillInput === true ? getOptionLabel.value(opt) : "",
            true,
            true
          );
          hidePopup();
        }
        targetRef.value !== null && targetRef.value.focus();
        if (innerValue.value.length === 0 || isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true) {
          emit("update:modelValue", props.emitValue === true ? optValue : opt);
        }
        return;
      }
      (hasDialog !== true || dialogFieldFocused.value === true) && state.focus();
      selectInputText();
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      const model = props.modelValue.slice(), index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
      if (index > -1) {
        emit("remove", { index, value: model.splice(index, 1)[0] });
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) {
          return;
        }
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: model.length, value: val });
        model.push(val);
      }
      emit("update:modelValue", model);
    }
    function setOptionIndex(index) {
      if ($q.platform.is.desktop !== true) {
        return;
      }
      const val = index > -1 && index < virtualScrollLength.value ? index : -1;
      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value;
        do {
          index = normalizeToInterval(
            index + offset,
            -1,
            virtualScrollLength.value - 1
          );
        } while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[index]) === true);
        if (optionIndex.value !== index) {
          setOptionIndex(index);
          scrollTo(index);
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue
            );
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value;
    }
    function getPropValueFn(propValue, defaultVal) {
      const val = propValue !== void 0 ? propValue : defaultVal;
      return typeof val === "function" ? val : (opt) => opt !== null && typeof opt === "object" && val in opt ? opt[val] : opt;
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
    }
    function selectInputText(e) {
      if (props.useInput === true && targetRef.value !== null && (e === void 0 || targetRef.value === e.target && e.target.value === selectedString.value)) {
        targetRef.value.select();
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        hidePopup();
        resetInputValue();
      }
      emit("keyup", e);
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target;
      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return;
      }
      e.target.value = "";
      clearTimeout(inputTimer);
      resetInputValue();
      if (typeof value === "string" && value.length > 0) {
        const needle = value.toLocaleLowerCase();
        const findFn = (extractFn) => {
          const option = props.options.find((opt) => extractFn.value(opt).toLocaleLowerCase() === needle);
          if (option === void 0) {
            return false;
          }
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          } else {
            hidePopup();
          }
          return true;
        };
        const fillFn = (afterFilter) => {
          if (findFn(getOptionValue) === true) {
            return;
          }
          if (findFn(getOptionLabel) === true || afterFilter === true) {
            return;
          }
          filter(value, true, () => fillFn(true));
        };
        fillFn();
      } else {
        state.clearValue(e);
      }
    }
    function onTargetKeypress(e) {
      emit("keypress", e);
    }
    function onTargetKeydown(e) {
      emit("keydown", e);
      if (shouldIgnoreKey(e) === true) {
        return;
      }
      const newValueModeValid = inputValue.value.length > 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
      const tabShouldSelect = e.shiftKey !== true && props.multiple !== true && (optionIndex.value > -1 || newValueModeValid === true);
      if (e.keyCode === 27) {
        prevent(e);
        return;
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return;
      }
      if (e.target === void 0 || e.target.id !== state.targetUid.value) {
        return;
      }
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e);
        showPopup();
        return;
      }
      if (e.keyCode === 8 && props.hideSelected !== true && inputValue.value.length === 0) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit("update:modelValue", null);
        }
        return;
      }
      if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }
      if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view
          )
        );
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }
      const optionsLength = virtualScrollLength.value;
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = "";
      }
      if (optionsLength > 0 && props.useInput !== true && e.key !== void 0 && e.key.length === 1 && e.altKey === e.ctrlKey && (e.keyCode !== 32 || searchBuffer.length > 0)) {
        menu.value !== true && showPopup(e);
        const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }
        const searchRe = new RegExp("^" + searchBuffer.split("").map((l) => reEscapeList.indexOf(l) > -1 ? "\\" + l : l).join(".*"), "i");
        let index = optionIndex.value;
        if (keyRepeat === true || index < 0 || searchRe.test(getOptionLabel.value(props.options[index])) !== true) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1);
          } while (index !== optionIndex.value && (isOptionDisabled.value(props.options[index]) === true || searchRe.test(getOptionLabel.value(props.options[index])) !== true));
        }
        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index);
            scrollTo(index);
            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index]));
            }
          });
        }
        return;
      }
      if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== "") && (e.keyCode !== 9 || tabShouldSelect === false)) {
        return;
      }
      e.keyCode !== 9 && stopAndPrevent(e);
      if (optionIndex.value > -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value]);
        return;
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode$1(mode) !== true) {
              return;
            }
          } else {
            mode = props.newValueMode;
          }
          if (val === void 0 || val === null) {
            return;
          }
          updateInputValue("", props.multiple !== true, true);
          const fn = mode === "toggle" ? toggleOption : add;
          fn(val, mode === "add-unique");
          if (props.multiple !== true) {
            targetRef.value !== null && targetRef.value.focus();
            hidePopup();
          }
        };
        if (props.onNewValue !== void 0) {
          emit("new-value", inputValue.value, done);
        } else {
          done(inputValue.value);
        }
        if (props.multiple !== true) {
          return;
        }
      }
      if (menu.value === true) {
        closeMenu();
      } else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true ? menuContentRef.value : menuRef.value !== null && menuRef.value.__qPortalInnerRef.value !== null ? menuRef.value.__qPortalInnerRef.value : void 0;
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl();
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return [];
      }
      if (slots["selected-item"] !== void 0) {
        return selectedScope.value.map((scope) => slots["selected-item"](scope)).slice();
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected());
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: "option-" + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove() {
            scope.removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          [scope.html === true ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
        })));
      }
      return [
        h("span", {
          [valueAsHtml.value === true ? "innerHTML" : "textContent"]: props.displayValue !== void 0 ? props.displayValue : selectedString.value
        })
      ];
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
      }
      const fn = slots.option !== void 0 ? slots.option : (scope) => {
        return h(QItem, {
          key: scope.index,
          ...scope.itemProps
        }, () => {
          return h(
            QItemSection,
            () => h(
              QItemLabel,
              () => h("span", {
                [scope.html === true ? "innerHTML" : "textContent"]: scope.label
              })
            )
          );
        });
      };
      let options = padVirtualScroll("div", optionScope.value.map(fn));
      if (slots["before-options"] !== void 0) {
        options = slots["before-options"]().concat(options);
      }
      return hMergeSlot(slots["after-options"], options);
    }
    function getInput(fromDialog, isTarget) {
      const attrs = isTarget === true ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value } : void 0;
      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: "i_t",
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : "",
        type: "search",
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        "data-autofocus": fromDialog !== true && props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value
      };
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [...data.class, "no-pointer-events"];
        } else {
          data.class += " no-pointer-events";
        }
      }
      return h("input", data);
    }
    function onInput(e) {
      clearTimeout(inputTimer);
      if (e && e.target && e.target.qComposing === true) {
        return;
      }
      setInputValue(e.target.value || "");
      userInputValue = true;
      defaultInputValue = inputValue.value;
      if (state.focused.value !== true && (hasDialog !== true || dialogFieldFocused.value === true)) {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        inputTimer = setTimeout(() => {
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }
    function setInputValue(val) {
      if (inputValue.value !== val) {
        inputValue.value = val;
        emit("input-value", val);
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true;
      if (props.useInput === true) {
        setInputValue(val);
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }
        noFiltering !== true && filter(val);
      }
    }
    function filter(val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || keepClosed !== true && state.focused.value !== true) {
        return;
      }
      if (state.innerLoading.value === true) {
        emit("filter-abort");
      } else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }
      if (val !== "" && props.multiple !== true && innerValue.value.length > 0 && userInputValue !== true && val === getOptionLabel.value(innerValue.value[0])) {
        val = "";
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);
      clearTimeout(filterId);
      filterId = localFilterId;
      emit(
        "filter",
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId);
            typeof fn === "function" && fn();
            innerLoadingIndicator.value = false;
            nextTick(() => {
              state.innerLoading.value = false;
              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup();
                } else if (menu.value === true) {
                  updateMenu(true);
                } else {
                  menu.value = true;
                }
              }
              typeof afterFn === "function" && nextTick(() => {
                afterFn(proxy);
              });
              typeof afterUpdateFn === "function" && nextTick(() => {
                afterUpdateFn(proxy);
              });
            });
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId);
            state.innerLoading.value = false;
            innerLoadingIndicator.value = false;
          }
          menu.value === true && (menu.value = false);
        }
      );
    }
    function getMenu() {
      return h(QMenu, {
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true,
        ...listboxAttrs.value,
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }, getAllOptions);
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e);
      closeMenu();
    }
    function onMenuShow() {
      setVirtualScrollSize();
    }
    function onDialogFieldFocus(e) {
      stop(e);
      targetRef.value !== null && targetRef.value.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function onDialogFieldBlur(e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }
    function getDialog() {
      const content = [
        h(QField, {
          class: `col-auto ${state.fieldClass.value}`,
          ...innerFieldProps.value,
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length > 0,
          ...state.splitAttrs.listeners.value,
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }, {
          ...slots,
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        })
      ];
      menu.value === true && content.push(
        h("div", {
          ref: menuContentRef,
          class: menuContentClass.value + " scroll",
          style: props.popupContentStyle,
          ...listboxAttrs.value,
          onClick: prevent,
          onScrollPassive: onVirtualScrollEvt
        }, getAllOptions())
      );
      return h(QDialog, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? "top" : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h("div", {
        class: "q-select__dialog" + (isOptionsDark.value === true ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value === true ? " q-select__dialog--focused" : "")
      }, content));
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e);
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")
        );
      }
      state.focused.value = false;
    }
    function onDialogHide(e) {
      hidePopup();
      state.focused.value === false && emit("blur", e);
      resetInputValue();
    }
    function onDialogShow() {
      const el = document.activeElement;
      if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) {
        targetRef.value.focus();
      }
      setVirtualScrollSize();
    }
    function closeMenu() {
      if (dialog.value === true) {
        return;
      }
      optionIndex.value = -1;
      if (menu.value === true) {
        menu.value = false;
      }
      if (state.focused.value === false) {
        clearTimeout(filterId);
        filterId = void 0;
        if (state.innerLoading.value === true) {
          emit("filter-abort");
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) {
        return;
      }
      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      } else {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      } else if (noOptions.value !== true || slots["no-option"] !== void 0) {
        menu.value = true;
      }
    }
    function hidePopup() {
      dialog.value = false;
      closeMenu();
    }
    function resetInputValue() {
      props.useInput === true && updateInputValue(
        props.multiple !== true && props.fillInput === true && innerValue.value.length > 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "",
        true,
        true
      );
    }
    function updateMenu(show) {
      let optionIndex2 = -1;
      if (show === true) {
        if (innerValue.value.length > 0) {
          const val = getOptionValue.value(innerValue.value[0]);
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
        }
        localResetVirtualScroll(optionIndex2);
      }
      setOptionIndex(optionIndex2);
    }
    function rerenderMenu(newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true);
        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll();
            } else {
              updateMenu(true);
            }
          }
        });
      }
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e);
      emit("popup-show", e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e);
      emit("popup-hide", e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }
    function updatePreState() {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput === true ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || noOptions.value === false : true);
      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true ? "fade" : props.transitionShow;
    }
    onBeforeUpdate(updatePreState);
    onUpdated(updateMenuPosition);
    updatePreState();
    onBeforeUnmount(() => {
      clearTimeout(inputTimer);
    });
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-select q-field--auto-height q-select--with${props.useInput !== true ? "out" : ""}-input q-select--with${props.useChips !== true ? "out" : ""}-chips q-select--${props.multiple === true ? "multiple" : "single"}`
      ),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(
        () => props.hideSelected !== true && hasValue.value === true || typeof inputValue.value === "number" || inputValue.value.length > 0 || fieldValueIsFilled(props.displayValue)
      ),
      getControlChild: () => {
        if (state.editable.value !== false && (dialog.value === true || noOptions.value !== true || slots["no-option"] !== void 0)) {
          return hasDialog === true ? getDialog() : getMenu();
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false;
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e);
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick(e) {
          prevent(e);
          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            targetRef.value !== null && targetRef.value.focus();
            return;
          }
          showPopup(e);
        }
      },
      getControl: (fromDialog) => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        } else if (state.editable.value === true) {
          const attrs2 = isTarget === true ? comboboxAttrs.value : void 0;
          child.push(
            h("input", {
              ref: isTarget === true ? targetRef : void 0,
              key: "d_t",
              class: "q-select__focus-target",
              id: isTarget === true ? state.targetUid.value : void 0,
              readonly: true,
              "data-autofocus": fromDialog !== true && props.autofocus === true || void 0,
              ...attrs2,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress
            })
          );
          if (isTarget === true && typeof props.autocomplete === "string" && props.autocomplete.length > 0) {
            child.push(
              h("input", {
                class: "q-select__autocomplete-input",
                autocomplete: props.autocomplete,
                onKeyup: onTargetAutocomplete
              })
            );
          }
        }
        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length > 0) {
          const opts = innerOptionsValue.value.map((value) => h("option", { value, selected: true }));
          child.push(
            h("select", {
              class: "hidden",
              name: nameProp.value,
              multiple: props.multiple
            }, opts)
          );
        }
        const attrs = props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value;
        return h("div", {
          class: "q-field__native row items-center",
          ...attrs
        }, child);
      },
      getInnerAppend: () => props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true ? [
        h(QIcon, {
          class: "q-select__dropdown-icon" + (menu.value === true ? " rotate-180" : ""),
          name: dropdownArrowIcon.value
        })
      ] : null
    });
    return useField(state);
  }
});
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);
const _sfc_main$4 = {
  props: {
    modelValue: {
      required: true
    },
    filterMethod: Function,
    placeholder: String,
    mapOptions: {
      required: false,
      type: [Boolean],
      default: true
    },
    optionsDense: {
      required: false,
      type: [Boolean],
      default: true
    },
    icon: {
      required: false,
      type: [String, Boolean],
      default: false
    },
    noOptionMessage: {
      required: false,
      type: [String],
      default: "No option found."
    },
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },
    onNewValue: Function,
    preventDefault: Boolean,
    useFilter: Boolean,
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    query: {
      required: false,
      type: [Function],
      default: () => (val) => {
        return {
          filter: val,
          limit: 5
        };
      }
    },
    multiple: Boolean,
    bgColor: String,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    debounce: {
      type: [Number, String],
      default: 500
    }
  },
  emits: ["update:model-value", "new-value"],
  data() {
    return {
      value: this.modelValue,
      options: [],
      filter: ""
    };
  },
  methods: {
    onFilter(val, update, abort) {
      console.func("components/base/BaseSelect:methods.onFilter()", arguments);
      if (!this.filterMethod)
        return update();
      if (this.filterMethod && !val)
        return abort();
      this.filter = val;
      this.filterMethod(this.query(val)).then(({ data }) => {
        update(() => {
          this.options = data;
        });
      }).catch(() => {
        abort();
      });
    },
    onLoadFromServer(val) {
      if (!this.filterMethod)
        return false;
      console.func("components/base/BaseSelect:methods.onLoadFromServer()", arguments);
      this.filterMethod(this.query(val)).then(({ data }) => {
        this.options = data;
      });
    },
    onChange(val) {
      console.func("components/base/BaseSelect:methods.onChange()", arguments);
      this.$emit("update:model-value", val);
    },
    onCreate() {
      console.func("components/base/BaseSelect:methods.onCreate()", arguments);
      if (this.onNewValue !== void 0) {
        this.$emit("new-value", this.filter, this.done);
      } else {
        this.done(this.filter);
      }
      this.filter = null;
    },
    clear() {
      console.func("components/base/BaseSelect:methods.clear()", arguments);
      this.value = null;
      this.$emit("update:model-value", null);
    },
    done(val, mode) {
      if (mode) {
        if (validateNewValueMode(mode) !== true) {
          return;
        }
      } else {
        mode = this.newValueMode;
      }
      if (val === void 0 || val === null) {
        return;
      }
      this.$refs.baseSelect.updateInputValue("", this.multiple !== true, true);
      const fn = mode === "toggle" ? this.$refs.baseSelect.toggleOption : this.$refs.baseSelect.add;
      fn(val, mode === "add-unique");
      if (this.multiple !== true) {
        this.$refs.baseSelect.focus();
        this.$refs.baseSelect.hidePopup();
      }
    }
  },
  computed: {
    showPlaceholder() {
      return !this.value && !this.useChips || !this.value || this.value.length < 1;
    }
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.value = val;
      }
    }
  }
};
const _hoisted_1$2 = { class: "text-grey-8" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QSelect, {
    ref: "baseSelect",
    class: "base-select",
    modelValue: $data.value,
    "onUpdate:modelValue": [
      _cache[2] || (_cache[2] = ($event) => $data.value = $event),
      $options.onChange
    ],
    placeholder: $props.placeholder,
    options: $data.options,
    bgColor: $props.bgColor,
    useChips: $props.useChips,
    useInput: $props.useInput,
    mapOptions: $props.mapOptions,
    inputDebounce: $props.inputDebounce,
    debounce: $props.debounce,
    newValueMode: $props.newValueMode,
    optionLabel: $props.optionLabel,
    optionValue: $props.optionValue,
    optionsDense: $props.optionsDense,
    "popup-content-class": "q-pa-sm base-dropdown",
    onFilter: $options.onFilter,
    onNewValue: $props.onNewValue
  }, createSlots({
    "after-options": withCtx(() => [
      renderSlot(_ctx.$slots, "after-options"),
      renderSlot(_ctx.$slots, "button", { onCreate: $options.onCreate }, () => [
        $props.newValueMode && $data.filter ? (openBlock(), createBlock(QItem, {
          key: 0,
          dense: "",
          class: "q-pa-none"
        }, {
          default: withCtx(() => [
            createVNode(QItemSection, null, {
              default: withCtx(() => [
                createVNode(QBtn, {
                  flat: "",
                  "no-caps": "",
                  class: "add-button",
                  align: "left",
                  icon: "fad fa-plus-circle",
                  label: `Add ${$data.filter}`,
                  onClick: $options.onCreate
                }, null, 8, ["label", "onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ])
    ]),
    "no-option": withCtx(() => [
      renderSlot(_ctx.$slots, "no-option", {}, () => [
        !$props.useInput ? (openBlock(), createBlock(QInput, {
          key: 0,
          class: "q-mb-sm base-dropdown-filter",
          "onUpdate:modelValue": [
            $options.onLoadFromServer,
            _cache[1] || (_cache[1] = ($event) => $data.filter = $event)
          ],
          placeholder: "Search",
          dense: "",
          outlined: "",
          modelValue: $data.filter,
          type: "text",
          "input-debounce": "500",
          debounce: "500"
        }, {
          prepend: withCtx(() => [
            createVNode(QIcon, {
              size: "xs",
              name: "fal fa-search"
            })
          ]),
          _: 1
        }, 8, ["onUpdate:modelValue", "modelValue"])) : createCommentVNode("", true),
        withDirectives((openBlock(), createBlock(QItem, {
          clickable: "",
          class: "no-options"
        }, {
          default: withCtx(() => [
            createVNode(QItemSection, { class: "text-grey" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($props.noOptionMessage), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })), [
          [ClosePopup]
        ])
      ]),
      renderSlot(_ctx.$slots, "button", { onCreate: $options.onCreate }, () => [
        $props.newValueMode && $data.filter ? (openBlock(), createBlock(QItem, {
          key: 0,
          dense: "",
          class: "q-pa-none"
        }, {
          default: withCtx(() => [
            createVNode(QItemSection, null, {
              default: withCtx(() => [
                createVNode(QBtn, {
                  flat: "",
                  "no-caps": "",
                  class: "add-button",
                  align: "left",
                  icon: "fad fa-plus-circle",
                  label: `Add ${$data.filter}`,
                  onClick: $options.onCreate
                }, null, 8, ["label", "onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ])
    ]),
    append: withCtx(() => [
      renderSlot(_ctx.$slots, "append")
    ]),
    _: 2
  }, [
    $props.icon ? {
      name: "prepend",
      fn: withCtx(() => [
        createVNode(QIcon, {
          size: "xs",
          name: $props.icon
        }, null, 8, ["name"])
      ])
    } : void 0,
    !$props.useInput && $options.showPlaceholder ? {
      name: "selected",
      fn: withCtx(() => [
        createBaseVNode("div", _hoisted_1$2, toDisplayString($props.placeholder), 1)
      ])
    } : void 0,
    $props.useFilter ? {
      name: "before-options",
      fn: withCtx(() => [
        renderSlot(_ctx.$slots, "before-options", {}, () => [
          !$props.useInput ? (openBlock(), createBlock(QInput, {
            key: 0,
            class: "q-mb-sm base-dropdown-filter",
            "onUpdate:modelValue": [
              $options.onLoadFromServer,
              _cache[0] || (_cache[0] = ($event) => $data.filter = $event)
            ],
            placeholder: "Search",
            dense: "",
            outlined: "",
            modelValue: $data.filter,
            type: "text",
            "input-debounce": "500",
            debounce: "500"
          }, createSlots({
            prepend: withCtx(() => [
              createVNode(QIcon, {
                size: "xs",
                name: "fal fa-search"
              })
            ]),
            _: 2
          }, [
            $props.newValueMode && $data.filter ? {
              name: "append",
              fn: withCtx(() => [
                createVNode(QBtn, {
                  icon: "control_point",
                  size: "sm",
                  color: "positive",
                  flat: "",
                  round: "",
                  dense: "",
                  onClick: $options.onCreate
                }, null, 8, ["onClick"])
              ])
            } : void 0
          ]), 1032, ["onUpdate:modelValue", "modelValue"])) : createCommentVNode("", true)
        ])
      ])
    } : void 0
  ]), 1032, ["modelValue", "placeholder", "options", "bgColor", "useChips", "useInput", "mapOptions", "inputDebounce", "debounce", "newValueMode", "optionLabel", "optionValue", "optionsDense", "onUpdate:modelValue", "onFilter", "onNewValue"]);
}
var BaseSelect = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "BaseSelect.vue"]]);
var __require_context_for_vite_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseSelect
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  props: {
    icon: String,
    label: String
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBtn, {
    class: "base-icon-label",
    ripple: false,
    dense: "",
    flat: "",
    color: "primary",
    icon: $props.icon,
    label: $props.label,
    "no-caps": ""
  }, null, 8, ["icon", "label"]);
}
var BaseStatic = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "BaseStatic.vue"]]);
var __require_context_for_vite_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseStatic
}, Symbol.toStringTag, { value: "Module" }));
var QTd = createComponent({
  name: "QTd",
  props: {
    props: Object,
    autoWidth: Boolean,
    noHover: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const classes = computed(
      () => "q-td" + (props.autoWidth === true ? " q-table--col-auto-width" : "") + (props.noHover === true ? " q-td--no-hover" : "") + " "
    );
    return () => {
      if (props.props === void 0) {
        return h("td", { class: classes.value }, hSlot(slots.default));
      }
      const name = vm.vnode.key;
      const col = (props.props.colsMap !== void 0 ? props.props.colsMap[name] : null) || props.props.col;
      if (col === void 0) {
        return;
      }
      const { row } = props.props;
      return h("td", {
        class: classes.value + col.__tdClass(row),
        style: col.__tdStyle(row)
      }, hSlot(slots.default));
    };
  }
});
var QTh = createComponent({
  name: "QTh",
  props: {
    props: Object,
    autoWidth: Boolean
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const onClick = (evt) => {
      emit("click", evt);
    };
    return () => {
      if (props.props === void 0) {
        return h("th", {
          class: props.autoWidth === true ? "q-table--col-auto-width" : "",
          onClick
        }, hSlot(slots.default));
      }
      let col, child;
      const name = vm.vnode.key;
      if (name) {
        col = props.props.colsMap[name];
        if (col === void 0) {
          return;
        }
      } else {
        col = props.props.col;
      }
      if (col.sortable === true) {
        const action = col.align === "right" ? "unshift" : "push";
        child = hUniqueSlot(slots.default, []);
        child[action](
          h(QIcon, {
            class: col.__iconClass,
            name: $q.iconSet.table.arrowUp
          })
        );
      } else {
        child = hSlot(slots.default);
      }
      const data = {
        class: col.__thClass + (props.autoWidth === true ? " q-table--col-auto-width" : ""),
        style: col.headerStyle,
        onClick: (evt) => {
          col.sortable === true && props.props.sort(col);
          onClick(evt);
        }
      };
      return h("th", data, child);
    };
  }
});
const separatorValues = ["horizontal", "vertical", "cell", "none"];
var QMarkupTable = createComponent({
  name: "QMarkupTable",
  props: {
    ...useDarkProps,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (v) => separatorValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => `q-markup-table q-table__container q-table__card q-table--${props.separator}-separator` + (isDark.value === true ? " q-table--dark q-table__card--dark q-dark" : "") + (props.dense === true ? " q-table--dense" : "") + (props.flat === true ? " q-table--flat" : "") + (props.bordered === true ? " q-table--bordered" : "") + (props.square === true ? " q-table--square" : "") + (props.wrapCells === false ? " q-table--no-wrap" : "")
    );
    return () => h("div", {
      class: classes.value
    }, [
      h("table", { class: "q-table" }, hSlot(slots.default))
    ]);
  }
});
function getTableMiddle(props, content) {
  return h("div", props, [
    h("table", { class: "q-table" }, content)
  ]);
}
const comps = {
  list: QList,
  table: QMarkupTable
};
const typeOptions = ["list", "table", "__qtable"];
var QVirtualScroll = createComponent({
  name: "QVirtualScroll",
  props: {
    ...useVirtualScrollProps,
    type: {
      type: String,
      default: "list",
      validator: (v) => typeOptions.includes(v)
    },
    items: {
      type: Array,
      default: () => []
    },
    itemsFn: Function,
    itemsSize: Number,
    scrollTarget: {
      default: void 0
    }
  },
  setup(props, { slots, attrs }) {
    let localScrollTarget;
    const rootRef = ref(null);
    const virtualScrollLength = computed(() => props.itemsSize >= 0 && props.itemsFn !== void 0 ? parseInt(props.itemsSize, 10) : Array.isArray(props.items) ? props.items.length : 0);
    const {
      virtualScrollSliceRange,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl
    });
    const virtualScrollScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const mapFn = (item, i) => ({
        index: virtualScrollSliceRange.value.from + i,
        item
      });
      return props.itemsFn === void 0 ? props.items.slice(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to).map(mapFn) : props.itemsFn(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to - virtualScrollSliceRange.value.from).map(mapFn);
    });
    const classes = computed(
      () => "q-virtual-scroll q-virtual-scroll" + (props.virtualScrollHorizontal === true ? "--horizontal" : "--vertical") + (props.scrollTarget !== void 0 ? "" : " scroll")
    );
    const attributes = computed(() => props.scrollTarget !== void 0 ? {} : { tabindex: 0 });
    watch(virtualScrollLength, () => {
      localResetVirtualScroll();
    });
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function getVirtualScrollEl() {
      return rootRef.value.$el || rootRef.value;
    }
    function getVirtualScrollTarget() {
      return localScrollTarget;
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(getVirtualScrollEl(), props.scrollTarget);
      localScrollTarget.addEventListener("scroll", onVirtualScrollEvt, listenOpts.passive);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", onVirtualScrollEvt, listenOpts.passive);
        localScrollTarget = void 0;
      }
    }
    function __getVirtualChildren() {
      let child = padVirtualScroll(
        props.type === "list" ? "div" : "tbody",
        virtualScrollScope.value.map(slots.default)
      );
      if (slots.before !== void 0) {
        child = slots.before().concat(child);
      }
      return hMergeSlot(slots.after, child);
    }
    onBeforeMount(() => {
      localResetVirtualScroll();
    });
    onMounted(() => {
      configureScrollTarget();
    });
    onActivated(() => {
      configureScrollTarget();
    });
    onDeactivated(() => {
      unconfigureScrollTarget();
    });
    onBeforeUnmount(() => {
      unconfigureScrollTarget();
    });
    return () => {
      if (slots.default === void 0) {
        console.error("QVirtualScroll: default scoped slot is required for rendering");
        return;
      }
      return props.type === "__qtable" ? getTableMiddle(
        { ref: rootRef, class: "q-table__middle " + classes.value },
        __getVirtualChildren()
      ) : h(comps[props.type], {
        ...attrs,
        ref: rootRef,
        class: [attrs.class, classes.value],
        ...attributes.value
      }, __getVirtualChildren);
    };
  }
});
const defaultSizes = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14
};
function width(val, reverse, $q) {
  return {
    transform: reverse === true ? `translateX(${$q.lang.rtl === true ? "-" : ""}100%) scale3d(${-val},1,1)` : `scale3d(${val},1,1)`
  };
}
var QLinearProgress = createComponent({
  name: "QLinearProgress",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    value: {
      type: Number,
      default: 0
    },
    buffer: Number,
    color: String,
    trackColor: String,
    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    animationSpeed: {
      type: [String, Number],
      default: 2100
    },
    instantFeedback: Boolean
  },
  setup(props, { slots }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, defaultSizes);
    const motion = computed(() => props.indeterminate === true || props.query === true);
    const widthReverse = computed(() => props.reverse !== props.query);
    const style = computed(() => ({
      ...sizeStyle.value !== null ? sizeStyle.value : {},
      "--q-linear-progress-speed": `${props.animationSpeed}ms`
    }));
    const classes = computed(
      () => "q-linear-progress" + (props.color !== void 0 ? ` text-${props.color}` : "") + (props.reverse === true || props.query === true ? " q-linear-progress--reverse" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const trackStyle = computed(() => width(props.buffer !== void 0 ? props.buffer : 1, widthReverse.value, proxy.$q));
    const trackClass = computed(
      () => `q-linear-progress__track absolute-full q-linear-progress__track--with${props.instantFeedback === true ? "out" : ""}-transition q-linear-progress__track--${isDark.value === true ? "dark" : "light"}` + (props.trackColor !== void 0 ? ` bg-${props.trackColor}` : "")
    );
    const modelStyle = computed(() => width(motion.value === true ? 1 : props.value, widthReverse.value, proxy.$q));
    const modelClass = computed(
      () => `q-linear-progress__model absolute-full q-linear-progress__model--with${props.instantFeedback === true ? "out" : ""}-transition q-linear-progress__model--${motion.value === true ? "in" : ""}determinate`
    );
    const stripeStyle = computed(() => ({ width: `${props.value * 100}%` }));
    const stripeClass = computed(
      () => `q-linear-progress__stripe absolute-${props.reverse === true ? "right" : "left"}`
    );
    return () => {
      const child = [
        h("div", {
          class: trackClass.value,
          style: trackStyle.value
        }),
        h("div", {
          class: modelClass.value,
          style: modelStyle.value
        })
      ];
      props.stripe === true && motion.value === false && child.push(
        h("div", {
          class: stripeClass.value,
          style: stripeStyle.value
        })
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": props.indeterminate === true ? void 0 : props.value
      }, hMergeSlot(slots.default, child));
    };
  }
});
let counter = 0;
const useFullscreenProps = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
};
const useFullscreenEmits = ["update:fullscreen", "fullscreen"];
function useFullscreen() {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let historyEntry, fullscreenFillerNode, container;
  const inFullscreen = ref(false);
  vmHasRouter(vm) === true && watch(() => proxy.$route.fullPath, () => {
    props.noRouteFullscreenExit !== true && exitFullscreen();
  });
  watch(() => props.fullscreen, (v) => {
    if (inFullscreen.value !== v) {
      toggleFullscreen();
    }
  });
  watch(inFullscreen, (v) => {
    emit("update:fullscreen", v);
    emit("fullscreen", v);
  });
  function toggleFullscreen() {
    if (inFullscreen.value === true) {
      exitFullscreen();
    } else {
      setFullscreen();
    }
  }
  function setFullscreen() {
    if (inFullscreen.value === true) {
      return;
    }
    inFullscreen.value = true;
    container = proxy.$el.parentNode;
    container.replaceChild(fullscreenFillerNode, proxy.$el);
    document.body.appendChild(proxy.$el);
    counter++;
    if (counter === 1) {
      document.body.classList.add("q-body--fullscreen-mixin");
    }
    historyEntry = {
      handler: exitFullscreen
    };
    History.add(historyEntry);
  }
  function exitFullscreen() {
    if (inFullscreen.value !== true) {
      return;
    }
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
    container.replaceChild(proxy.$el, fullscreenFillerNode);
    inFullscreen.value = false;
    counter = Math.max(0, counter - 1);
    if (counter === 0) {
      document.body.classList.remove("q-body--fullscreen-mixin");
      if (proxy.$el.scrollIntoView !== void 0) {
        setTimeout(() => {
          proxy.$el.scrollIntoView();
        });
      }
    }
  }
  onBeforeMount(() => {
    fullscreenFillerNode = document.createElement("span");
  });
  onMounted(() => {
    props.fullscreen === true && setFullscreen();
  });
  onBeforeUnmount(exitFullscreen);
  Object.assign(proxy, {
    toggleFullscreen,
    setFullscreen,
    exitFullscreen
  });
  return {
    inFullscreen,
    toggleFullscreen
  };
}
function sortDate(a, b) {
  return new Date(a) - new Date(b);
}
const useTableSortProps = {
  sortMethod: Function,
  binaryStateSort: Boolean,
  columnSortOrder: {
    type: String,
    validator: (v) => v === "ad" || v === "da",
    default: "ad"
  }
};
function useTableSort(props, computedPagination, colList, setPagination) {
  const columnToSort = computed(() => {
    const { sortBy } = computedPagination.value;
    return sortBy ? colList.value.find((def) => def.name === sortBy) || null : null;
  });
  const computedSortMethod = computed(() => props.sortMethod !== void 0 ? props.sortMethod : (data, sortBy, descending) => {
    const col = colList.value.find((def) => def.name === sortBy);
    if (col === void 0 || col.field === void 0) {
      return data;
    }
    const dir = descending === true ? -1 : 1, val = typeof col.field === "function" ? (v) => col.field(v) : (v) => v[col.field];
    return data.sort((a, b) => {
      let A = val(a), B = val(b);
      if (A === null || A === void 0) {
        return -1 * dir;
      }
      if (B === null || B === void 0) {
        return 1 * dir;
      }
      if (col.sort !== void 0) {
        return col.sort(A, B, a, b) * dir;
      }
      if (isNumber(A) === true && isNumber(B) === true) {
        return (A - B) * dir;
      }
      if (isDate(A) === true && isDate(B) === true) {
        return sortDate(A, B) * dir;
      }
      if (typeof A === "boolean" && typeof B === "boolean") {
        return (A - B) * dir;
      }
      [A, B] = [A, B].map((s) => (s + "").toLocaleString().toLowerCase());
      return A < B ? -1 * dir : A === B ? 0 : dir;
    });
  });
  function sort(col) {
    let sortOrder = props.columnSortOrder;
    if (isObject(col) === true) {
      if (col.sortOrder) {
        sortOrder = col.sortOrder;
      }
      col = col.name;
    } else {
      const def = colList.value.find((def2) => def2.name === col);
      if (def !== void 0 && def.sortOrder) {
        sortOrder = def.sortOrder;
      }
    }
    let { sortBy, descending } = computedPagination.value;
    if (sortBy !== col) {
      sortBy = col;
      descending = sortOrder === "da";
    } else if (props.binaryStateSort === true) {
      descending = !descending;
    } else if (descending === true) {
      if (sortOrder === "ad") {
        sortBy = null;
      } else {
        descending = false;
      }
    } else {
      if (sortOrder === "ad") {
        descending = true;
      } else {
        sortBy = null;
      }
    }
    setPagination({ sortBy, descending, page: 1 });
  }
  return {
    columnToSort,
    computedSortMethod,
    sort
  };
}
const useTableFilterProps = {
  filter: [String, Object],
  filterMethod: Function
};
function useTableFilter(props, setPagination) {
  const computedFilterMethod = computed(() => props.filterMethod !== void 0 ? props.filterMethod : (rows, terms, cols, cellValue) => {
    const lowerTerms = terms ? terms.toLowerCase() : "";
    return rows.filter(
      (row) => cols.some((col) => {
        const val = cellValue(col, row) + "";
        const haystack = val === "undefined" || val === "null" ? "" : val.toLowerCase();
        return haystack.indexOf(lowerTerms) !== -1;
      })
    );
  });
  watch(
    () => props.filter,
    () => {
      nextTick(() => {
        setPagination({ page: 1 }, true);
      });
    },
    { deep: true }
  );
  return { computedFilterMethod };
}
function samePagination(oldPag, newPag) {
  for (const prop in newPag) {
    if (newPag[prop] !== oldPag[prop]) {
      return false;
    }
  }
  return true;
}
function fixPagination(p) {
  if (p.page < 1) {
    p.page = 1;
  }
  if (p.rowsPerPage !== void 0 && p.rowsPerPage < 1) {
    p.rowsPerPage = 0;
  }
  return p;
}
const useTablePaginationProps = {
  pagination: Object,
  rowsPerPageOptions: {
    type: Array,
    default: () => [5, 7, 10, 15, 20, 25, 50, 0]
  },
  "onUpdate:pagination": [Function, Array]
};
function useTablePaginationState(vm, getCellValue) {
  const { props, emit } = vm;
  const innerPagination = ref(
    Object.assign({
      sortBy: null,
      descending: false,
      page: 1,
      rowsPerPage: props.rowsPerPageOptions.length > 0 ? props.rowsPerPageOptions[0] : 5
    }, props.pagination)
  );
  const computedPagination = computed(() => {
    const pag = props["onUpdate:pagination"] !== void 0 ? { ...innerPagination.value, ...props.pagination } : innerPagination.value;
    return fixPagination(pag);
  });
  const isServerSide = computed(() => computedPagination.value.rowsNumber !== void 0);
  function sendServerRequest(pagination) {
    requestServerInteraction({
      pagination,
      filter: props.filter
    });
  }
  function requestServerInteraction(prop = {}) {
    nextTick(() => {
      emit("request", {
        pagination: prop.pagination || computedPagination.value,
        filter: prop.filter || props.filter,
        getCellValue
      });
    });
  }
  function setPagination(val, forceServerRequest) {
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val
    });
    if (samePagination(computedPagination.value, newPagination) === true) {
      if (isServerSide.value === true && forceServerRequest === true) {
        sendServerRequest(newPagination);
      }
      return;
    }
    if (isServerSide.value === true) {
      sendServerRequest(newPagination);
      return;
    }
    if (props.pagination !== void 0 && props["onUpdate:pagination"] !== void 0) {
      emit("update:pagination", newPagination);
    } else {
      innerPagination.value = newPagination;
    }
  }
  return {
    innerPagination,
    computedPagination,
    isServerSide,
    requestServerInteraction,
    setPagination
  };
}
function useTablePagination(vm, innerPagination, computedPagination, isServerSide, setPagination, filteredSortedRowsNumber) {
  const { props, emit, proxy: { $q } } = vm;
  const computedRowsNumber = computed(() => isServerSide.value === true ? computedPagination.value.rowsNumber || 0 : filteredSortedRowsNumber.value);
  const firstRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value;
    return (page - 1) * rowsPerPage;
  });
  const lastRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value;
    return page * rowsPerPage;
  });
  const isFirstPage = computed(() => computedPagination.value.page === 1);
  const pagesNumber = computed(() => computedPagination.value.rowsPerPage === 0 ? 1 : Math.max(
    1,
    Math.ceil(computedRowsNumber.value / computedPagination.value.rowsPerPage)
  ));
  const isLastPage = computed(() => lastRowIndex.value === 0 ? true : computedPagination.value.page >= pagesNumber.value);
  const computedRowsPerPageOptions = computed(() => {
    const opts = props.rowsPerPageOptions.includes(innerPagination.value.rowsPerPage) ? props.rowsPerPageOptions : [innerPagination.value.rowsPerPage].concat(props.rowsPerPageOptions);
    return opts.map((count) => ({
      label: count === 0 ? $q.lang.table.allRows : "" + count,
      value: count
    }));
  });
  watch(pagesNumber, (lastPage2, oldLastPage) => {
    if (lastPage2 === oldLastPage) {
      return;
    }
    const currentPage = computedPagination.value.page;
    if (lastPage2 && !currentPage) {
      setPagination({ page: 1 });
    } else if (lastPage2 < currentPage) {
      setPagination({ page: lastPage2 });
    }
  });
  function firstPage() {
    setPagination({ page: 1 });
  }
  function prevPage() {
    const { page } = computedPagination.value;
    if (page > 1) {
      setPagination({ page: page - 1 });
    }
  }
  function nextPage() {
    const { page, rowsPerPage } = computedPagination.value;
    if (lastRowIndex.value > 0 && page * rowsPerPage < computedRowsNumber.value) {
      setPagination({ page: page + 1 });
    }
  }
  function lastPage() {
    setPagination({ page: pagesNumber.value });
  }
  if (props["onUpdate:pagination"] !== void 0) {
    emit("update:pagination", { ...computedPagination.value });
  }
  return {
    firstRowIndex,
    lastRowIndex,
    isFirstPage,
    isLastPage,
    pagesNumber,
    computedRowsPerPageOptions,
    computedRowsNumber,
    firstPage,
    prevPage,
    nextPage,
    lastPage
  };
}
const useTableRowSelectionProps = {
  selection: {
    type: String,
    default: "none",
    validator: (v) => ["single", "multiple", "none"].includes(v)
  },
  selected: {
    type: Array,
    default: () => []
  }
};
const useTableRowSelectionEmits = ["update:selected", "selection"];
function useTableRowSelection(props, emit, computedRows, getRowKey) {
  const selectedKeys = computed(() => {
    const keys = {};
    props.selected.map(getRowKey.value).forEach((key) => {
      keys[key] = true;
    });
    return keys;
  });
  const hasSelectionMode = computed(() => {
    return props.selection !== "none";
  });
  const singleSelection = computed(() => {
    return props.selection === "single";
  });
  const multipleSelection = computed(() => {
    return props.selection === "multiple";
  });
  const allRowsSelected = computed(
    () => computedRows.value.length > 0 && computedRows.value.every(
      (row) => selectedKeys.value[getRowKey.value(row)] === true
    )
  );
  const someRowsSelected = computed(
    () => allRowsSelected.value !== true && computedRows.value.some((row) => selectedKeys.value[getRowKey.value(row)] === true)
  );
  const rowsSelectedNumber = computed(() => props.selected.length);
  function isRowSelected(key) {
    return selectedKeys.value[key] === true;
  }
  function clearSelection2() {
    emit("update:selected", []);
  }
  function updateSelection(keys, rows, added, evt) {
    emit("selection", { rows, added, keys, evt });
    const payload = singleSelection.value === true ? added === true ? rows : [] : added === true ? props.selected.concat(rows) : props.selected.filter(
      (row) => keys.includes(getRowKey.value(row)) === false
    );
    emit("update:selected", payload);
  }
  return {
    hasSelectionMode,
    singleSelection,
    multipleSelection,
    allRowsSelected,
    someRowsSelected,
    rowsSelectedNumber,
    isRowSelected,
    clearSelection: clearSelection2,
    updateSelection
  };
}
function getVal(val) {
  return Array.isArray(val) ? val.slice() : [];
}
const useTableRowExpandProps = {
  expanded: Array
};
const useTableRowExpandEmits = ["update:expanded"];
function useTableRowExpand(props, emit) {
  const innerExpanded = ref(getVal(props.expanded));
  watch(() => props.expanded, (val) => {
    innerExpanded.value = getVal(val);
  });
  function isRowExpanded(key) {
    return innerExpanded.value.includes(key);
  }
  function setExpanded(val) {
    if (props.expanded !== void 0) {
      emit("update:expanded", val);
    } else {
      innerExpanded.value = val;
    }
  }
  function updateExpanded(key, add) {
    const target = innerExpanded.value.slice();
    const index = target.indexOf(key);
    if (add === true) {
      if (index === -1) {
        target.push(key);
        setExpanded(target);
      }
    } else if (index !== -1) {
      target.splice(index, 1);
      setExpanded(target);
    }
  }
  return {
    isRowExpanded,
    setExpanded,
    updateExpanded
  };
}
const useTableColumnSelectionProps = {
  visibleColumns: Array
};
function useTableColumnSelection(props, computedPagination, hasSelectionMode) {
  const colList = computed(() => {
    if (props.columns !== void 0) {
      return props.columns;
    }
    const row = props.rows[0];
    return row !== void 0 ? Object.keys(row).map((name) => ({
      name,
      label: name.toUpperCase(),
      field: name,
      align: isNumber(row[name]) ? "right" : "left",
      sortable: true
    })) : [];
  });
  const computedCols = computed(() => {
    const { sortBy, descending } = computedPagination.value;
    const cols = props.visibleColumns !== void 0 ? colList.value.filter((col) => col.required === true || props.visibleColumns.includes(col.name) === true) : colList.value;
    return cols.map((col) => {
      const align = col.align || "right";
      const alignClass = `text-${align}`;
      return {
        ...col,
        align,
        __iconClass: `q-table__sort-icon q-table__sort-icon--${align}`,
        __thClass: alignClass + (col.headerClasses !== void 0 ? " " + col.headerClasses : "") + (col.sortable === true ? " sortable" : "") + (col.name === sortBy ? ` sorted ${descending === true ? "sort-desc" : ""}` : ""),
        __tdStyle: col.style !== void 0 ? typeof col.style !== "function" ? () => col.style : col.style : () => null,
        __tdClass: col.classes !== void 0 ? typeof col.classes !== "function" ? () => alignClass + " " + col.classes : (row) => alignClass + " " + col.classes(row) : () => alignClass
      };
    });
  });
  const computedColsMap = computed(() => {
    const names = {};
    computedCols.value.forEach((col) => {
      names[col.name] = col;
    });
    return names;
  });
  const computedColspan = computed(() => {
    return props.tableColspan !== void 0 ? props.tableColspan : computedCols.value.length + (hasSelectionMode.value === true ? 1 : 0);
  });
  return {
    colList,
    computedCols,
    computedColsMap,
    computedColspan
  };
}
const bottomClass = "q-table__bottom row items-center";
const commonVirtPropsObj = {};
commonVirtPropsList.forEach((p) => {
  commonVirtPropsObj[p] = {};
});
var QTable = createComponent({
  name: "QTable",
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: [String, Function],
      default: "id"
    },
    columns: Array,
    loading: Boolean,
    iconFirstPage: String,
    iconPrevPage: String,
    iconNextPage: String,
    iconLastPage: String,
    title: String,
    hideHeader: Boolean,
    grid: Boolean,
    gridHeader: Boolean,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (v) => ["horizontal", "vertical", "cell", "none"].includes(v)
    },
    wrapCells: Boolean,
    virtualScroll: Boolean,
    virtualScrollTarget: {
      default: void 0
    },
    ...commonVirtPropsObj,
    noDataLabel: String,
    noResultsLabel: String,
    loadingLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,
    color: {
      type: String,
      default: "grey-8"
    },
    titleClass: [String, Array, Object],
    tableStyle: [String, Array, Object],
    tableClass: [String, Array, Object],
    tableHeaderStyle: [String, Array, Object],
    tableHeaderClass: [String, Array, Object],
    cardContainerClass: [String, Array, Object],
    cardContainerStyle: [String, Array, Object],
    cardStyle: [String, Array, Object],
    cardClass: [String, Array, Object],
    hideBottom: Boolean,
    hideSelectedBanner: Boolean,
    hideNoData: Boolean,
    hidePagination: Boolean,
    onRowClick: Function,
    onRowDblclick: Function,
    onRowContextmenu: Function,
    ...useDarkProps,
    ...useFullscreenProps,
    ...useTableColumnSelectionProps,
    ...useTableFilterProps,
    ...useTablePaginationProps,
    ...useTableRowExpandProps,
    ...useTableRowSelectionProps,
    ...useTableSortProps
  },
  emits: [
    "request",
    "virtual-scroll",
    ...useFullscreenEmits,
    ...useTableRowExpandEmits,
    ...useTableRowSelectionEmits
  ],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { inFullscreen, toggleFullscreen } = useFullscreen();
    const getRowKey = computed(() => typeof props.rowKey === "function" ? props.rowKey : (row) => row[props.rowKey]);
    const rootRef = ref(null);
    const virtScrollRef = ref(null);
    const hasVirtScroll = computed(() => props.grid !== true && props.virtualScroll === true);
    const cardDefaultClass = computed(
      () => " q-table__card" + (isDark.value === true ? " q-table__card--dark q-dark" : "") + (props.square === true ? " q-table--square" : "") + (props.flat === true ? " q-table--flat" : "") + (props.bordered === true ? " q-table--bordered" : "")
    );
    const __containerClass = computed(
      () => `q-table__container q-table--${props.separator}-separator column no-wrap` + (props.grid === true ? " q-table--grid" : cardDefaultClass.value) + (isDark.value === true ? " q-table--dark" : "") + (props.dense === true ? " q-table--dense" : "") + (props.wrapCells === false ? " q-table--no-wrap" : "") + (inFullscreen.value === true ? " fullscreen scroll" : "")
    );
    const containerClass = computed(
      () => __containerClass.value + (props.loading === true ? " q-table--loading" : "")
    );
    watch(
      () => props.tableStyle + props.tableClass + props.tableHeaderStyle + props.tableHeaderClass + __containerClass.value,
      () => {
        hasVirtScroll.value === true && virtScrollRef.value !== null && virtScrollRef.value.reset();
      }
    );
    const {
      innerPagination,
      computedPagination,
      isServerSide,
      requestServerInteraction,
      setPagination
    } = useTablePaginationState(vm, getCellValue);
    const { computedFilterMethod } = useTableFilter(props, setPagination);
    const { isRowExpanded, setExpanded, updateExpanded } = useTableRowExpand(props, emit);
    const filteredSortedRows = computed(() => {
      let rows = props.rows;
      if (isServerSide.value === true || rows.length === 0) {
        return rows;
      }
      const { sortBy, descending } = computedPagination.value;
      if (props.filter) {
        rows = computedFilterMethod.value(rows, props.filter, computedCols.value, getCellValue);
      }
      if (columnToSort.value !== null) {
        rows = computedSortMethod.value(
          props.rows === rows ? rows.slice() : rows,
          sortBy,
          descending
        );
      }
      return rows;
    });
    const filteredSortedRowsNumber = computed(() => filteredSortedRows.value.length);
    const computedRows = computed(() => {
      let rows = filteredSortedRows.value;
      if (isServerSide.value === true) {
        return rows;
      }
      const { rowsPerPage } = computedPagination.value;
      if (rowsPerPage !== 0) {
        if (firstRowIndex.value === 0 && props.rows !== rows) {
          if (rows.length > lastRowIndex.value) {
            rows = rows.slice(0, lastRowIndex.value);
          }
        } else {
          rows = rows.slice(firstRowIndex.value, lastRowIndex.value);
        }
      }
      return rows;
    });
    const {
      hasSelectionMode,
      singleSelection,
      multipleSelection,
      allRowsSelected,
      someRowsSelected,
      rowsSelectedNumber,
      isRowSelected,
      clearSelection: clearSelection2,
      updateSelection
    } = useTableRowSelection(props, emit, computedRows, getRowKey);
    const { colList, computedCols, computedColsMap, computedColspan } = useTableColumnSelection(props, computedPagination, hasSelectionMode);
    const { columnToSort, computedSortMethod, sort } = useTableSort(props, computedPagination, colList, setPagination);
    const {
      firstRowIndex,
      lastRowIndex,
      isFirstPage,
      isLastPage,
      pagesNumber,
      computedRowsPerPageOptions,
      computedRowsNumber,
      firstPage,
      prevPage,
      nextPage,
      lastPage
    } = useTablePagination(vm, innerPagination, computedPagination, isServerSide, setPagination, filteredSortedRowsNumber);
    const nothingToDisplay = computed(() => computedRows.value.length === 0);
    const virtProps = computed(() => {
      const acc = {};
      commonVirtPropsList.forEach((p) => {
        acc[p] = props[p];
      });
      if (acc.virtualScrollItemSize === void 0) {
        acc.virtualScrollItemSize = props.dense === true ? 28 : 48;
      }
      return acc;
    });
    function resetVirtualScroll() {
      hasVirtScroll.value === true && virtScrollRef.value.reset();
    }
    function getBody() {
      if (props.grid === true) {
        return getGridBody();
      }
      const header = props.hideHeader !== true ? getTHead : null;
      if (hasVirtScroll.value === true) {
        const topRow = slots["top-row"];
        const bottomRow = slots["bottom-row"];
        const virtSlots = {
          default: (props2) => getTBodyTR(props2.item, slots.body, props2.index)
        };
        if (topRow !== void 0) {
          const topContent = h("tbody", topRow({ cols: computedCols.value }));
          virtSlots.before = header === null ? () => topContent : () => [header()].concat(topContent);
        } else if (header !== null) {
          virtSlots.before = header;
        }
        if (bottomRow !== void 0) {
          virtSlots.after = () => h("tbody", bottomRow({ cols: computedCols.value }));
        }
        return h(QVirtualScroll, {
          ref: virtScrollRef,
          class: props.tableClass,
          style: props.tableStyle,
          ...virtProps.value,
          scrollTarget: props.virtualScrollTarget,
          items: computedRows.value,
          type: "__qtable",
          tableColspan: computedColspan.value,
          onVirtualScroll: onVScroll
        }, virtSlots);
      }
      const child = [
        getTBody()
      ];
      if (header !== null) {
        child.unshift(header());
      }
      return getTableMiddle({
        class: ["q-table__middle scroll", props.tableClass],
        style: props.tableStyle
      }, child);
    }
    function scrollTo(toIndex, edge) {
      if (virtScrollRef.value !== null) {
        virtScrollRef.value.scrollTo(toIndex, edge);
        return;
      }
      toIndex = parseInt(toIndex, 10);
      const rowEl = rootRef.value.querySelector(`tbody tr:nth-of-type(${toIndex + 1})`);
      if (rowEl !== null) {
        const scrollTarget = rootRef.value.querySelector(".q-table__middle.scroll");
        const { offsetTop } = rowEl;
        const direction = offsetTop < scrollTarget.scrollTop ? "decrease" : "increase";
        scrollTarget.scrollTop = offsetTop;
        emit("virtual-scroll", {
          index: toIndex,
          from: 0,
          to: innerPagination.value.rowsPerPage - 1,
          direction
        });
      }
    }
    function onVScroll(info) {
      emit("virtual-scroll", info);
    }
    function getProgress() {
      return [
        h(QLinearProgress, {
          class: "q-table__linear-progress",
          color: props.color,
          dark: isDark.value,
          indeterminate: true,
          trackColor: "transparent"
        })
      ];
    }
    function getTBodyTR(row, bodySlot, pageIndex) {
      const key = getRowKey.value(row), selected = isRowSelected(key);
      if (bodySlot !== void 0) {
        return bodySlot(
          getBodyScope({
            key,
            row,
            pageIndex,
            __trClass: selected ? "selected" : ""
          })
        );
      }
      const bodyCell = slots["body-cell"], child = computedCols.value.map((col) => {
        const bodyCellCol = slots[`body-cell-${col.name}`], slot = bodyCellCol !== void 0 ? bodyCellCol : bodyCell;
        return slot !== void 0 ? slot(getBodyCellScope({ key, row, pageIndex, col })) : h("td", {
          class: col.__tdClass(row),
          style: col.__tdStyle(row)
        }, getCellValue(col, row));
      });
      if (hasSelectionMode.value === true) {
        const slot = slots["body-selection"];
        const content = slot !== void 0 ? slot(getBodySelectionScope({ key, row, pageIndex })) : [
          h(QCheckbox, {
            modelValue: selected,
            color: props.color,
            dark: isDark.value,
            dense: props.dense,
            "onUpdate:modelValue": (adding, evt) => {
              updateSelection([key], [row], adding, evt);
            }
          })
        ];
        child.unshift(
          h("td", { class: "q-table--col-auto-width" }, content)
        );
      }
      const data = { key, class: { selected } };
      if (props.onRowClick !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onClick = (evt) => {
          emit("RowClick", evt, row, pageIndex);
        };
      }
      if (props.onRowDblclick !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onDblclick = (evt) => {
          emit("RowDblclick", evt, row, pageIndex);
        };
      }
      if (props.onRowContextmenu !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onContextmenu = (evt) => {
          emit("RowContextmenu", evt, row, pageIndex);
        };
      }
      return h("tr", data, child);
    }
    function getTBody() {
      const body = slots.body, topRow = slots["top-row"], bottomRow = slots["bottom-row"];
      let child = computedRows.value.map(
        (row, pageIndex) => getTBodyTR(row, body, pageIndex)
      );
      if (topRow !== void 0) {
        child = topRow({ cols: computedCols.value }).concat(child);
      }
      if (bottomRow !== void 0) {
        child = child.concat(bottomRow({ cols: computedCols.value }));
      }
      return h("tbody", child);
    }
    function getBodyScope(data) {
      injectBodyCommonScope(data);
      data.cols = data.cols.map((col) => {
        const c = { ...col };
        injectProp(c, "value", () => getCellValue(col, data.row));
        return c;
      });
      return data;
    }
    function getBodyCellScope(data) {
      injectBodyCommonScope(data);
      injectProp(data, "value", () => getCellValue(data.col, data.row));
      return data;
    }
    function getBodySelectionScope(data) {
      injectBodyCommonScope(data);
      return data;
    }
    function injectBodyCommonScope(data) {
      Object.assign(data, {
        cols: computedCols.value,
        colsMap: computedColsMap.value,
        sort,
        rowIndex: firstRowIndex.value + data.pageIndex,
        color: props.color,
        dark: isDark.value,
        dense: props.dense
      });
      hasSelectionMode.value === true && injectProp(
        data,
        "selected",
        () => isRowSelected(data.key),
        (adding, evt) => {
          updateSelection([data.key], [data.row], adding, evt);
        }
      );
      injectProp(
        data,
        "expand",
        () => isRowExpanded(data.key),
        (adding) => {
          updateExpanded(data.key, adding);
        }
      );
    }
    function getCellValue(col, row) {
      const val = typeof col.field === "function" ? col.field(row) : row[col.field];
      return col.format !== void 0 ? col.format(val, row) : val;
    }
    const marginalsScope = computed(() => ({
      pagination: computedPagination.value,
      pagesNumber: pagesNumber.value,
      isFirstPage: isFirstPage.value,
      isLastPage: isLastPage.value,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      inFullscreen: inFullscreen.value,
      toggleFullscreen
    }));
    function getTopDiv() {
      const top = slots.top, topLeft = slots["top-left"], topRight = slots["top-right"], topSelection = slots["top-selection"], hasSelection = hasSelectionMode.value === true && topSelection !== void 0 && rowsSelectedNumber.value > 0, topClass = "q-table__top relative-position row items-center";
      if (top !== void 0) {
        return h("div", { class: topClass }, [top(marginalsScope.value)]);
      }
      let child;
      if (hasSelection === true) {
        child = topSelection(marginalsScope.value).slice();
      } else {
        child = [];
        if (topLeft !== void 0) {
          child.push(
            h("div", { class: "q-table-control" }, [
              topLeft(marginalsScope.value)
            ])
          );
        } else if (props.title) {
          child.push(
            h("div", { class: "q-table__control" }, [
              h("div", {
                class: ["q-table__title", props.titleClass]
              }, props.title)
            ])
          );
        }
      }
      if (topRight !== void 0) {
        child.push(
          h("div", { class: "q-table__separator col" })
        );
        child.push(
          h("div", { class: "q-table__control" }, [
            topRight(marginalsScope.value)
          ])
        );
      }
      if (child.length === 0) {
        return;
      }
      return h("div", { class: topClass }, child);
    }
    const headerSelectedValue = computed(() => someRowsSelected.value === true ? null : allRowsSelected.value);
    function getTHead() {
      const child = getTHeadTR();
      if (props.loading === true && slots.loading === void 0) {
        child.push(
          h("tr", { class: "q-table__progress" }, [
            h("th", {
              class: "relative-position",
              colspan: computedColspan.value
            }, getProgress())
          ])
        );
      }
      return h("thead", child);
    }
    function getTHeadTR() {
      const header = slots.header, headerCell = slots["header-cell"];
      if (header !== void 0) {
        return header(
          getHeaderScope({ header: true })
        ).slice();
      }
      const child = computedCols.value.map((col) => {
        const headerCellCol = slots[`header-cell-${col.name}`], slot = headerCellCol !== void 0 ? headerCellCol : headerCell, props2 = getHeaderScope({ col });
        return slot !== void 0 ? slot(props2) : h(QTh, {
          key: col.name,
          props: props2
        }, () => col.label);
      });
      if (singleSelection.value === true && props.grid !== true) {
        child.unshift(
          h("th", { class: "q-table--col-auto-width" }, " ")
        );
      } else if (multipleSelection.value === true) {
        const slot = slots["header-selection"];
        const content = slot !== void 0 ? slot(getHeaderScope({})) : [
          h(QCheckbox, {
            color: props.color,
            modelValue: headerSelectedValue.value,
            dark: isDark.value,
            dense: props.dense,
            "onUpdate:modelValue": onMultipleSelectionSet
          })
        ];
        child.unshift(
          h("th", { class: "q-table--col-auto-width" }, content)
        );
      }
      return [
        h("tr", {
          class: props.tableHeaderClass,
          style: props.tableHeaderStyle
        }, child)
      ];
    }
    function getHeaderScope(data) {
      Object.assign(data, {
        cols: computedCols.value,
        sort,
        colsMap: computedColsMap.value,
        color: props.color,
        dark: isDark.value,
        dense: props.dense
      });
      if (multipleSelection.value === true) {
        injectProp(
          data,
          "selected",
          () => headerSelectedValue.value,
          onMultipleSelectionSet
        );
      }
      return data;
    }
    function onMultipleSelectionSet(val) {
      if (someRowsSelected.value === true) {
        val = false;
      }
      updateSelection(
        computedRows.value.map(getRowKey.value),
        computedRows.value,
        val
      );
    }
    const navIcon = computed(() => {
      const ico = [
        props.iconFirstPage || $q.iconSet.table.firstPage,
        props.iconPrevPage || $q.iconSet.table.prevPage,
        props.iconNextPage || $q.iconSet.table.nextPage,
        props.iconLastPage || $q.iconSet.table.lastPage
      ];
      return $q.lang.rtl === true ? ico.reverse() : ico;
    });
    function getBottomDiv() {
      if (props.hideBottom === true) {
        return;
      }
      if (nothingToDisplay.value === true) {
        if (props.hideNoData === true) {
          return;
        }
        const message = props.loading === true ? props.loadingLabel || $q.lang.table.loading : props.filter ? props.noResultsLabel || $q.lang.table.noResults : props.noDataLabel || $q.lang.table.noData;
        const noData = slots["no-data"];
        const children = noData !== void 0 ? [noData({ message, icon: $q.iconSet.table.warning, filter: props.filter })] : [
          h(QIcon, {
            class: "q-table__bottom-nodata-icon",
            name: $q.iconSet.table.warning
          }),
          message
        ];
        return h("div", { class: bottomClass + " q-table__bottom--nodata" }, children);
      }
      const bottom = slots.bottom;
      if (bottom !== void 0) {
        return h("div", { class: bottomClass }, [bottom(marginalsScope.value)]);
      }
      const child = props.hideSelectedBanner !== true && hasSelectionMode.value === true && rowsSelectedNumber.value > 0 ? [
        h("div", { class: "q-table__control" }, [
          h("div", [
            (props.selectedRowsLabel || $q.lang.table.selectedRecords)(rowsSelectedNumber.value)
          ])
        ])
      ] : [];
      if (props.hidePagination !== true) {
        return h("div", {
          class: bottomClass + " justify-end"
        }, getPaginationDiv(child));
      }
      if (child.length > 0) {
        return h("div", { class: bottomClass }, child);
      }
    }
    function onPagSelection(pag) {
      setPagination({
        page: 1,
        rowsPerPage: pag.value
      });
    }
    function getPaginationDiv(child) {
      let control;
      const { rowsPerPage } = computedPagination.value, paginationLabel = props.paginationLabel || $q.lang.table.pagination, paginationSlot = slots.pagination, hasOpts = props.rowsPerPageOptions.length > 1;
      child.push(
        h("div", { class: "q-table__separator col" })
      );
      if (hasOpts === true) {
        child.push(
          h("div", { class: "q-table__control" }, [
            h("span", { class: "q-table__bottom-item" }, [
              props.rowsPerPageLabel || $q.lang.table.recordsPerPage
            ]),
            h(QSelect, {
              class: "q-table__select inline q-table__bottom-item",
              color: props.color,
              modelValue: rowsPerPage,
              options: computedRowsPerPageOptions.value,
              displayValue: rowsPerPage === 0 ? $q.lang.table.allRows : rowsPerPage,
              dark: isDark.value,
              borderless: true,
              dense: true,
              optionsDense: true,
              optionsCover: true,
              "onUpdate:modelValue": onPagSelection
            })
          ])
        );
      }
      if (paginationSlot !== void 0) {
        control = paginationSlot(marginalsScope.value);
      } else {
        control = [
          h("span", rowsPerPage !== 0 ? { class: "q-table__bottom-item" } : {}, [
            rowsPerPage ? paginationLabel(firstRowIndex.value + 1, Math.min(lastRowIndex.value, computedRowsNumber.value), computedRowsNumber.value) : paginationLabel(1, filteredSortedRowsNumber.value, computedRowsNumber.value)
          ])
        ];
        if (rowsPerPage !== 0 && pagesNumber.value > 1) {
          const btnProps = {
            color: props.color,
            round: true,
            dense: true,
            flat: true
          };
          if (props.dense === true) {
            btnProps.size = "sm";
          }
          pagesNumber.value > 2 && control.push(
            h(QBtn, {
              key: "pgFirst",
              ...btnProps,
              icon: navIcon.value[0],
              disable: isFirstPage.value,
              onClick: firstPage
            })
          );
          control.push(
            h(QBtn, {
              key: "pgPrev",
              ...btnProps,
              icon: navIcon.value[1],
              disable: isFirstPage.value,
              onClick: prevPage
            }),
            h(QBtn, {
              key: "pgNext",
              ...btnProps,
              icon: navIcon.value[2],
              disable: isLastPage.value,
              onClick: nextPage
            })
          );
          pagesNumber.value > 2 && control.push(
            h(QBtn, {
              key: "pgLast",
              ...btnProps,
              icon: navIcon.value[3],
              disable: isLastPage.value,
              onClick: lastPage
            })
          );
        }
      }
      child.push(
        h("div", { class: "q-table__control" }, control)
      );
      return child;
    }
    function getGridHeader() {
      const child = props.gridHeader === true ? [
        h("table", { class: "q-table" }, [
          getTHead()
        ])
      ] : props.loading === true && slots.loading === void 0 ? getProgress() : void 0;
      return h("div", { class: "q-table__middle" }, child);
    }
    function getGridBody() {
      const item = slots.item !== void 0 ? slots.item : (scope) => {
        const child = scope.cols.map(
          (col) => h("div", { class: "q-table__grid-item-row" }, [
            h("div", { class: "q-table__grid-item-title" }, [col.label]),
            h("div", { class: "q-table__grid-item-value" }, [col.value])
          ])
        );
        if (hasSelectionMode.value === true) {
          const slot = slots["body-selection"];
          const content = slot !== void 0 ? slot(scope) : [
            h(QCheckbox, {
              modelValue: scope.selected,
              color: props.color,
              dark: isDark.value,
              dense: props.dense,
              "onUpdate:modelValue": (adding, evt) => {
                updateSelection([scope.key], [scope.row], adding, evt);
              }
            })
          ];
          child.unshift(
            h("div", { class: "q-table__grid-item-row" }, content),
            h(QSeparator, { dark: isDark.value })
          );
        }
        const data = {
          class: [
            "q-table__grid-item-card" + cardDefaultClass.value,
            props.cardClass
          ],
          style: props.cardStyle
        };
        if (props.onRowClick !== void 0 || props.onRowDblclick !== void 0) {
          data.class[0] += " cursor-pointer";
          if (props.onRowClick !== void 0) {
            data.onClick = (evt) => {
              emit("RowClick", evt, scope.row, scope.pageIndex);
            };
          }
          if (props.onRowDblclick !== void 0) {
            data.onDblclick = (evt) => {
              emit("RowDblclick", evt, scope.row, scope.pageIndex);
            };
          }
        }
        return h("div", {
          class: "q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3" + (scope.selected === true ? " q-table__grid-item--selected" : "")
        }, [
          h("div", data, child)
        ]);
      };
      return h("div", {
        class: [
          "q-table__grid-content row",
          props.cardContainerClass
        ],
        style: props.cardContainerStyle
      }, computedRows.value.map((row, pageIndex) => {
        return item(getBodyScope({
          key: getRowKey.value(row),
          row,
          pageIndex
        }));
      }));
    }
    Object.assign(vm.proxy, {
      requestServerInteraction,
      setPagination,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      isRowSelected,
      clearSelection: clearSelection2,
      isRowExpanded,
      setExpanded,
      sort,
      resetVirtualScroll,
      scrollTo,
      getCellValue
    });
    injectMultipleProps(vm.proxy, {
      filteredSortedRows: () => filteredSortedRows.value,
      computedRows: () => computedRows.value,
      computedRowsNumber: () => computedRowsNumber.value
    });
    return () => {
      const child = [getTopDiv()];
      const data = { ref: rootRef, class: containerClass.value };
      if (props.grid === true) {
        child.push(getGridHeader());
      } else {
        Object.assign(data, {
          class: [data.class, props.cardClass],
          style: props.cardStyle
        });
      }
      child.push(
        getBody(),
        getBottomDiv()
      );
      if (props.loading === true && slots.loading !== void 0) {
        child.push(
          slots.loading()
        );
      }
      return h("div", data, child);
    };
  }
});
const _sfc_main$2 = {
  props: {
    rowNumners: {
      type: Number,
      default: 10,
      required: false
    },
    hideTop: {
      type: Boolean,
      default: false,
      required: false
    }
  }
};
const _hoisted_1$1 = {
  key: 0,
  class: "row q-col-gutter-md"
};
const _hoisted_2$1 = { class: "col-xs-8" };
const _hoisted_3$1 = { class: "col-xs-4" };
const _hoisted_4$1 = {
  class: "text-left",
  style: { "width": "150px" }
};
const _hoisted_5$1 = { class: "text-right" };
const _hoisted_6$1 = { class: "text-right" };
const _hoisted_7$1 = { class: "text-right" };
const _hoisted_8 = { class: "text-right" };
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("th", { class: "text-right" }, null, -1);
const _hoisted_10 = { class: "text-left" };
const _hoisted_11 = { class: "text-right" };
const _hoisted_12 = { class: "text-right" };
const _hoisted_13 = { class: "text-right" };
const _hoisted_14 = { class: "text-right" };
const _hoisted_15 = { class: "text-right" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    !$props.hideTop ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      createBaseVNode("div", _hoisted_2$1, [
        createVNode(QSkeleton, {
          height: "39px",
          type: "QBtn",
          width: "250px"
        })
      ]),
      createBaseVNode("div", _hoisted_3$1, [
        createVNode(QSkeleton, {
          height: "39px",
          width: "150px",
          class: "float-right",
          type: "QBtn"
        })
      ])
    ])) : createCommentVNode("", true),
    createVNode(QMarkupTable, {
      square: "",
      flat: "",
      class: "q-mt-lg"
    }, {
      default: withCtx(() => [
        createBaseVNode("thead", null, [
          createBaseVNode("tr", null, [
            createBaseVNode("th", _hoisted_4$1, [
              createVNode(QSkeleton, {
                animation: "blink",
                type: "text"
              })
            ]),
            createBaseVNode("th", _hoisted_5$1, [
              createVNode(QSkeleton, {
                animation: "blink",
                type: "text"
              })
            ]),
            createBaseVNode("th", _hoisted_6$1, [
              createVNode(QSkeleton, {
                animation: "blink",
                type: "text"
              })
            ]),
            createBaseVNode("th", _hoisted_7$1, [
              createVNode(QSkeleton, {
                animation: "blink",
                type: "text"
              })
            ]),
            createBaseVNode("th", _hoisted_8, [
              createVNode(QSkeleton, {
                animation: "blink",
                type: "text"
              })
            ]),
            _hoisted_9
          ])
        ]),
        createBaseVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.rowNumners, (n) => {
            return openBlock(), createElementBlock("tr", { key: n }, [
              createBaseVNode("td", _hoisted_10, [
                createVNode(QSkeleton, {
                  animation: "blink",
                  type: "text",
                  width: "85px"
                })
              ]),
              createBaseVNode("td", _hoisted_11, [
                createVNode(QSkeleton, {
                  animation: "blink",
                  type: "text",
                  width: "50px"
                })
              ]),
              createBaseVNode("td", _hoisted_12, [
                createVNode(QSkeleton, {
                  animation: "blink",
                  type: "text",
                  width: "35px"
                })
              ]),
              createBaseVNode("td", _hoisted_13, [
                createVNode(QSkeleton, {
                  animation: "blink",
                  type: "text",
                  width: "65px"
                })
              ]),
              createBaseVNode("td", _hoisted_14, [
                createVNode(QSkeleton, {
                  animation: "blink",
                  type: "text",
                  width: "25px"
                })
              ]),
              createBaseVNode("td", _hoisted_15, [
                createVNode(QIcon, {
                  name: "fal fa-ellipsis-h",
                  color: "grey-4",
                  class: "q-mr-sm",
                  size: "sm"
                })
              ])
            ]);
          }), 128))
        ])
      ]),
      _: 1
    })
  ]);
}
var TableSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "TableSkeleton.vue"]]);
const exceptSlots = [
  "advanced-filter",
  "pre-loader",
  "header-selection",
  "body-selection",
  "body-cell-actions",
  "bottom",
  "item",
  "item-selection",
  "top",
  "top-left",
  "top-right",
  "top-bottom"
];
const _sfc_main$1 = {
  components: { TableSkeleton },
  data() {
    return {
      selected: []
    };
  },
  props: {
    store: {
      required: false
    },
    module: {
      required: false,
      type: [Object]
    },
    columns: {
      required: true,
      type: [Array],
      default: () => []
    },
    rows: {
      required: true,
      type: [Array],
      default: () => []
    },
    toolbar: {
      required: false,
      type: [Array],
      default: () => []
    },
    actions: {
      required: false,
      type: [Array],
      default: () => []
    },
    filters: {
      required: false,
      type: [Array],
      default: () => []
    },
    pagination: {
      required: true,
      type: [Object]
    },
    grid: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    hidePagination: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    hideItemLabel: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    noActions: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    noTrash: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    rowsPerPageOptions: {
      required: false,
      type: [Array],
      default: () => [15, 30, 50]
    },
    filter: {
      required: false,
      type: [Boolean],
      default: () => true
    },
    bordered: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    flat: {
      required: false,
      type: [Boolean],
      default: () => true
    },
    hideHeader: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    hideTop: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    noPermissions: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    loading: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    loaded: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    preventDefault: {
      required: false,
      type: [Boolean],
      default: () => false
    },
    selection: {
      required: false,
      description: "Available options: single, multiple and none",
      type: [String],
      default: "none"
    },
    filterTitle: {
      required: false,
      type: [String],
      default: "Filters"
    },
    filterIcon: {
      required: false,
      type: [String],
      default: "fal fa-filter"
    },
    relatedDeleteMessage: {
      required: false,
      type: [String, Boolean],
      default: "Please note that once you permanently delete type module, any related(s) where they have added to will lose them too."
    },
    noDataLabel: {
      type: [String],
      default: void 0
    },
    cardClass: {
      type: [String],
      default: void 0
    },
    topRightWidth: {
      required: false,
      type: [Number],
      default: 9,
      description: "max value 12 and min value 1",
      validator(value) {
        return value <= 12 || value >= 1;
      }
    }
  },
  watch: {
    "syncPagination.rowsPerPage"() {
      this.sendServerRequest();
    }
  },
  methods: {
    onRequest(props) {
      console.func("components/base/base-table:methods.onRequest()", arguments);
      this.$emit("request", props);
    },
    onRowClicked(evt, row) {
      console.func("components/base/base-table:methods.onRowClicked()", arguments);
      this.$emit("row-clicked", evt, row);
    },
    onActionClicked(item, props) {
      console.func("components/base/base-table:methods.onActionClicked()", arguments);
      this.$emit("action-clicked", item.action, props.row);
      if (this.preventDefault)
        return false;
      switch (item.action) {
        case "delete":
          this.hasStore();
          this.$core.confirm(`Are you sure you want to delete this ${this.module.singular}?`).then(() => {
            this.store.delete(props.row.id).then(() => {
              this.sendServerRequest();
            }).catch((error) => {
              this.$core.error(error, { title: "Error" });
            });
          });
          break;
        case "restore":
          this.hasStore();
          this.$core.confirm(`Are you sure you want to restore this ${this.module.singular}?`).then(() => {
            this.store.restore(props.row.id).then(() => {
              this.sendServerRequest();
            }).catch((error) => {
              this.$core.error(error, { title: "Error" });
            });
          });
          break;
        case "force-delete":
          this.hasStore();
          this.$core.confirm(`Are you sure you want to permanently delete this ${this.module.singular}?`, {
            subTitle: this.relatedDeleteMessage.replace(/type/g, "this").replace(/module/g, this.module.singular)
          }).then(() => {
            this.store.forceDelete(props.row.id).then(() => {
              this.sendServerRequest();
            }).catch((error) => {
              this.$core.error(error, { title: "Error" });
            });
          });
          break;
        case "route":
          this.$router.push({
            name: item.route,
            params: item.params ? item.params(props.row) : {},
            query: item.query ? item.query(props.row) : {}
          });
          break;
        default:
          if (typeof item.action === "function") {
            item.action(props.row);
          }
          break;
      }
    },
    onToolbarClicked(item) {
      console.func("components/base/base-table:methods.onToolbarClicked()", arguments);
      this.$emit("toolbar-clicked", item);
      if (this.preventDefault)
        return false;
      switch (item.action) {
        case "delete":
          this.hasStore();
          this.$core.confirm(`Are you sure you want to delete selected ${this.module.plural}?`).then(() => {
            this.store.deleteSelected(lodash.exports.map(this.selected, "id")).then(() => {
              this.sendServerRequest();
            }).catch((error) => {
              this.$core.error(error, { title: "Error" });
            });
          });
          break;
        case "restore":
          this.hasStore();
          this.$core.confirm(`Are you sure you want to restore selected ${this.module.plural}?`).then(() => {
            this.store.restoreSelected(lodash.exports.map(this.selected, "id")).then(() => {
              this.sendServerRequest();
            }).catch((error) => {
              this.$core.error(error, { title: "Error" });
            });
          });
          break;
        case "force-delete":
          this.hasStore();
          this.$core.confirm(
            `Are you sure you want to permanently delete selected ${this.module.plural}?`,
            {
              subTitle: this.relatedDeleteMessage.replace(/type/g, "selected").replace(/module/g, this.module.plural)
            }
          ).then(() => {
            this.store.forceDeleteSelected(lodash.exports.map(this.selected, "id")).then(() => {
              this.sendServerRequest();
            }).catch((error) => {
              this.$core.error(error, { title: "Error" });
            });
          });
          break;
        case "route":
          this.$router.push({
            name: item.route,
            params: item.params,
            query: item.query
          });
          break;
        case "filter":
          this.$refs.filter.show();
          break;
        case "request":
          this.sendServerRequest();
          break;
        default:
          if (typeof item.action === "function") {
            item.action(item);
          }
          break;
      }
    },
    sendServerRequest() {
      this.selected = [];
      this.onRequest({
        pagination: this.syncPagination
      });
    },
    showFilter() {
      console.func("components/base/base-table:methods.showFilter()", arguments);
      this.$refs.filter.show();
    },
    hasPermission(item, props = false) {
      if (this.noPermissions)
        return true;
      if (item.module) {
        return true;
      }
      if (item.condition && item.permission && props) {
        return this.permissions.includes(item.permission) && item.condition(props.row, this.permissions);
      } else if (item.condition && !item.permission && props) {
        return item.condition(props.row, this.permissions);
      }
      return this.permissions.includes(item.permission) || !item.permission;
    },
    hasStore() {
      if (!this.store)
        return false;
    }
  },
  computed: {
    syncPagination: {
      get() {
        return this.pagination;
      },
      set(val) {
        return val;
      }
    },
    actionItems() {
      return (this.actions || []).filter(
        (item) => item.deleted === this.syncPagination.deleted || item.deleted === "all"
      );
    },
    toolbarItems() {
      return (this.toolbar || []).filter(
        (item) => item.deleted === this.syncPagination.deleted || item.deleted === "all"
      );
    },
    permissions() {
      return [];
    },
    tableSlots() {
      return Object.keys(this.$slots).filter((item) => !exceptSlots.includes(item));
    },
    topLeftWidth() {
      const width2 = 12 - this.topRightWidth;
      return width2 || 12;
    }
  }
};
const _hoisted_1 = {
  key: 0,
  class: "text-label"
};
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row q-col-gutter-md" };
const _hoisted_4 = { class: "q-gutter-sm" };
const _hoisted_5 = {
  key: 0,
  class: "toolbar-item"
};
const _hoisted_6 = {
  key: 1,
  class: "toolbar-item"
};
const _hoisted_7 = {
  key: 0,
  class: "q-table__grid-item-title"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_base_item = resolveComponent("base-item");
  const _component_table_skeleton = resolveComponent("table-skeleton");
  return openBlock(), createElementBlock("div", null, [
    createVNode(QDrawer, {
      side: "right",
      ref: "filter",
      bordered: "",
      width: 280,
      breakpoint: 500,
      "content-class": "bg-grey-3"
    }, {
      default: withCtx(() => [
        createVNode(QToolbar, {
          style: { "height": "89px" },
          light: ""
        }, {
          default: withCtx(() => [
            createVNode(QToolbarTitle, { class: "q-ml-xs" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($props.filterTitle), 1)
              ]),
              _: 1
            }),
            createVNode(QBtn, {
              icon: "close",
              flat: "",
              round: "",
              dense: "",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$refs.filter.hide())
            })
          ]),
          _: 1
        }),
        createVNode(QSeparator),
        createVNode(QCard, {
          class: "bg-transparent",
          flat: "",
          square: ""
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row q-col-gutter-md" }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "advanced-filter", { syncPagination: $options.syncPagination }, () => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($props.filters, (item, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
                      class: "col-12 filter-item"
                    }, [
                      item.title ? (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(item.title), 1)) : createCommentVNode("", true),
                      (openBlock(), createBlock(resolveDynamicComponent(item.component), mergeProps({
                        modelValue: $options.syncPagination[item.key],
                        "onUpdate:modelValue": [($event) => $options.syncPagination[item.key] = $event, $options.sendServerRequest]
                      }, item), null, 16, ["modelValue", "onUpdate:modelValue"]))
                    ]);
                  }), 128))
                ])
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 512),
    $options.syncPagination.loaded ? (openBlock(), createBlock(QTable, {
      key: 0,
      class: "main-table",
      square: "",
      grid: $props.grid,
      rows: $props.rows,
      columns: $props.columns,
      bordered: $props.bordered,
      "hide-header": $props.hideHeader,
      flat: $props.flat,
      "row-key": "id",
      "hide-pagination": $props.hidePagination,
      "rows-per-page-options": $props.rowsPerPageOptions,
      filter: $options.syncPagination.filter,
      pagination: $options.syncPagination,
      "onUpdate:pagination": _cache[6] || (_cache[6] = ($event) => $options.syncPagination = $event),
      loading: $props.loading,
      selection: $props.selection,
      selected: $data.selected,
      "onUpdate:selected": _cache[7] || (_cache[7] = ($event) => $data.selected = $event),
      onRequest: $options.onRequest,
      onRowClick: $options.onRowClicked,
      "no-data-label": $props.noDataLabel
    }, createSlots({
      "header-selection": withCtx((scope) => [
        renderSlot(_ctx.$slots, "header-selection", normalizeProps(guardReactiveProps(scope)), () => [
          createVNode(QCheckbox, {
            size: "sm",
            modelValue: scope.selected,
            "onUpdate:modelValue": ($event) => scope.selected = $event
          }, null, 8, ["modelValue", "onUpdate:modelValue"])
        ])
      ]),
      "body-selection": withCtx((scope) => [
        renderSlot(_ctx.$slots, "body-selection", normalizeProps(guardReactiveProps(scope)), () => [
          createVNode(QCheckbox, {
            size: "sm",
            modelValue: scope.selected,
            "onUpdate:modelValue": ($event) => scope.selected = $event
          }, null, 8, ["modelValue", "onUpdate:modelValue"])
        ])
      ]),
      "body-cell-actions": withCtx((props) => [
        createVNode(QTd, { props }, {
          default: withCtx(() => [
            createVNode(QBtn, {
              round: "",
              flat: "",
              dense: "",
              icon: "fal fa-ellipsis-h",
              onClick: _cache[4] || (_cache[4] = withModifiers(() => {
              }, ["stop"]))
            }, {
              default: withCtx(() => [
                createVNode(QMenu, { dense: "" }, {
                  default: withCtx(() => [
                    createVNode(QList, {
                      class: "q-pa-sm",
                      dense: "",
                      style: { "min-width": "100px" }
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList($options.actionItems, (item, index) => {
                          return withDirectives((openBlock(), createBlock(_component_base_item, {
                            key: index,
                            onClick: ($event) => $options.onActionClicked(item, props),
                            icon: item.icon,
                            label: item.label
                          }, null, 8, ["onClick", "icon", "label"])), [
                            [vShow, $options.hasPermission(item, props)]
                          ]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["props"])
      ]),
      item: withCtx((props) => [
        renderSlot(_ctx.$slots, "item", {
          props,
          permissions: $options.permissions,
          actions: $options.actionItems,
          onActionClicked: $options.onActionClicked,
          hasPermission: $options.hasPermission
        }, () => [
          createBaseVNode("div", {
            class: normalizeClass([$props.cardClass, "col-xs-12 col-sm-12"])
          }, [
            createVNode(QItem, {
              tag: "label",
              class: normalizeClass({
                "bg-green-2": props.selected,
                "bg-white": !props.selected
              })
            }, {
              default: withCtx(() => [
                ["single", "multiple"].includes($props.selection) ? (openBlock(), createBlock(QItemSection, {
                  key: 0,
                  avatar: ""
                }, {
                  default: withCtx(() => [
                    createVNode(QCheckbox, {
                      dense: "",
                      modelValue: props.selected,
                      "onUpdate:modelValue": ($event) => props.selected = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1024)) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "item-selection", {
                  props,
                  permissions: $options.permissions,
                  actions: $options.actionItems,
                  onActionClicked: $options.onActionClicked,
                  hasPermission: $options.hasPermission
                }, () => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "item-body", normalizeProps(guardReactiveProps(props)), () => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(props.cols.filter(
                          (item) => !["actions", "id"].includes(item.name) && item.value
                        ), (col) => {
                          return openBlock(), createElementBlock("div", {
                            class: "q-mb-xs",
                            key: col.name
                          }, [
                            !$props.hideItemLabel ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(col.label), 1)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, `item-body-${col.name}`, mergeProps(props, {
                              value: col.value
                            }), () => [
                              createTextVNode(toDisplayString(col.value), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                !$props.noActions ? (openBlock(), createBlock(QItemSection, {
                  key: 1,
                  side: ""
                }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      round: "",
                      flat: "",
                      dense: "",
                      icon: "fal fa-ellipsis-h",
                      onClick: _cache[5] || (_cache[5] = withModifiers(() => {
                      }, ["stop"]))
                    }, {
                      default: withCtx(() => [
                        createVNode(QMenu, { dense: "" }, {
                          default: withCtx(() => [
                            createVNode(QList, {
                              class: "q-pa-sm",
                              dense: "",
                              style: { "min-width": "100px" }
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(Fragment, null, renderList($options.actionItems, (item, index) => {
                                  return withDirectives((openBlock(), createBlock(_component_base_item, {
                                    key: index,
                                    onClick: ($event) => $options.onActionClicked(item, props),
                                    icon: item.icon,
                                    label: item.label
                                  }, null, 8, ["onClick", "icon", "label"])), [
                                    [vShow, $options.hasPermission(item, props)]
                                  ]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["class"]),
            createVNode(QSeparator)
          ], 2)
        ])
      ]),
      _: 2
    }, [
      !$props.hideTop ? {
        name: "top",
        fn: withCtx((scope) => [
          renderSlot(_ctx.$slots, "top", mergeProps(scope, {
            permissions: $options.permissions,
            selected: $data.selected,
            toolbar: $options.toolbarItems,
            onToolbarClicked: $options.onToolbarClicked
          }), () => [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("div", {
                  class: normalizeClass(`col-sm-${$options.topLeftWidth} col-xs-12`)
                }, [
                  renderSlot(_ctx.$slots, "top-left", mergeProps(scope, {
                    permissions: $options.permissions,
                    selected: $data.selected,
                    toolbar: $options.toolbarItems
                  }), () => [
                    createVNode(QInput, {
                      modelValue: $options.syncPagination.filter,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.syncPagination.filter = $event),
                      outlined: "",
                      clearable: "",
                      placeholder: "Quick search",
                      dense: ""
                    }, {
                      append: withCtx(() => [
                        !$options.syncPagination.filter ? (openBlock(), createBlock(QIcon, {
                          key: 0,
                          name: "fas fa-search",
                          size: "16px"
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ])
                ], 2),
                createBaseVNode("div", {
                  class: normalizeClass(`col-sm-${$props.topRightWidth} col-xs-12 text-right`)
                }, [
                  renderSlot(_ctx.$slots, "top-right", mergeProps(scope, {
                    permissions: $options.permissions,
                    selected: $data.selected,
                    toolbar: $options.toolbarItems
                  }), () => [
                    createBaseVNode("div", _hoisted_4, [
                      !$options.syncPagination.deleted && $data.selected.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5, [
                        createVNode(QBtn, {
                          disable: !$options.hasPermission({
                            permission: "Delete"
                          }),
                          icon: "fas fa-trash-alt",
                          color: "negative",
                          size: "13px",
                          flat: "",
                          onClick: _cache[2] || (_cache[2] = ($event) => $options.onToolbarClicked({
                            action: "delete"
                          })),
                          padding: "8px 20px",
                          class: "toolbar",
                          label: "Delete",
                          "no-caps": ""
                        }, null, 8, ["disable"])
                      ])) : $options.syncPagination.deleted && $data.selected.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_6, [
                        createVNode(QBtn, {
                          disable: !$options.hasPermission({
                            permission: "Delete"
                          }),
                          icon: "fas fa-trash-undo",
                          color: "primary",
                          size: "13px",
                          flat: "",
                          onClick: _cache[3] || (_cache[3] = ($event) => $options.onToolbarClicked({
                            action: "restore"
                          })),
                          padding: "8px 20px",
                          class: "toolbar",
                          label: "Restore",
                          "no-caps": ""
                        }, null, 8, ["disable"])
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList($options.toolbarItems, (item, index) => {
                        return withDirectives((openBlock(), createElementBlock("div", {
                          key: index,
                          class: "toolbar-item"
                        }, [
                          item.component ? (openBlock(), createBlock(resolveDynamicComponent(item.component), mergeProps({
                            key: 0,
                            modelValue: $options.syncPagination[item.key],
                            "onUpdate:modelValue": [($event) => $options.syncPagination[item.key] = $event, ($event) => $options.onToolbarClicked(item)]
                          }, item), null, 16, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(QBtn, mergeProps({
                            key: 1,
                            size: "13px",
                            onClick: ($event) => $options.onToolbarClicked(item),
                            padding: "9px 20px"
                          }, item, { "no-caps": "" }), null, 16, ["onClick"]))
                        ])), [
                          [vShow, $options.hasPermission(item)]
                        ]);
                      }), 128))
                    ])
                  ])
                ], 2)
              ])
            ])
          ])
        ])
      } : void 0,
      renderList($options.tableSlots, (slot) => {
        return {
          name: slot,
          fn: withCtx((props) => [
            renderSlot(_ctx.$slots, slot, mergeProps(props, {
              props,
              permissions: $options.permissions,
              actions: $options.actionItems,
              onActionClicked: $options.onActionClicked
            }), () => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(props.value), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ])
          ])
        };
      }),
      !!_ctx.$slots.bottom ? {
        name: "bottom",
        fn: withCtx((scope) => [
          renderSlot(_ctx.$slots, "bottom", normalizeProps(guardReactiveProps(scope)))
        ])
      } : void 0
    ]), 1032, ["grid", "rows", "columns", "bordered", "hide-header", "flat", "hide-pagination", "rows-per-page-options", "filter", "pagination", "loading", "selection", "selected", "onRequest", "onRowClick", "no-data-label"])) : renderSlot(_ctx.$slots, "pre-loader", { key: 1 }, () => [
      createVNode(_component_table_skeleton, {
        "hide-top": $props.hideTop,
        "row-numners": 8
      }, null, 8, ["hide-top"])
    ])
  ]);
}
var BaseTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "BaseTable.vue"]]);
var __require_context_for_vite_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseTable
}, Symbol.toStringTag, { value: "Module" }));
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    let loadTimer;
    const images = [
      ref(null),
      ref(props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null)
    ];
    const position2 = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    watch(() => getCurrentSrc(), addImage);
    function getCurrentSrc() {
      return props.src || props.srcset || props.sizes ? {
        src: props.src,
        srcset: props.srcset,
        sizes: props.sizes
      } : null;
    }
    function addImage(imgProps) {
      clearTimeout(loadTimer);
      hasError.value = false;
      if (imgProps === null) {
        isLoading.value = false;
        images[0].value = null;
        images[1].value = null;
        return;
      }
      isLoading.value = true;
      images[position2.value].value = imgProps;
    }
    function onLoad({ target }) {
      if (loadTimer === null) {
        return;
      }
      clearTimeout(loadTimer);
      naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
      waitForCompleteness(target, 1);
    }
    function waitForCompleteness(target, count) {
      if (loadTimer === null || count === 1e3) {
        return;
      }
      if (target.complete === true) {
        onReady(target);
      } else {
        loadTimer = setTimeout(() => {
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(img) {
      if (loadTimer === null) {
        return;
      }
      position2.value = position2.value === 1 ? 0 : 1;
      images[position2.value].value = null;
      isLoading.value = false;
      hasError.value = false;
      emit("load", img.currentSrc || img.src);
    }
    function onError(err) {
      clearTimeout(loadTimer);
      isLoading.value = false;
      hasError.value = true;
      images[0].value = null;
      images[1].value = null;
      emit("error", err);
    }
    function getContainer(key, child) {
      return h(
        "div",
        { class: "q-img__container absolute-full", key },
        child
      );
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position2.value === index) {
        data.class += " q-img__image--waiting";
        Object.assign(data, { onLoad, onError });
      } else {
        data.class += " q-img__image--loaded";
      }
      return getContainer("img" + index, h("img", data));
    }
    function getContent() {
      if (isLoading.value !== true) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      {
        addImage(getCurrentSrc());
      }
      onBeforeUnmount(() => {
        clearTimeout(loadTimer);
        loadTimer = null;
      });
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (hasError.value !== true) {
        if (images[0].value !== null) {
          content.push(getImage(0));
        }
        if (images[1].value !== null) {
          content.push(getImage(1));
        }
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
const _sfc_main = {
  props: {
    media: {
      type: Object
    },
    ratio: {
      type: Number,
      default: () => 16 / 9
    }
  },
  computed: {
    src() {
      return this.media ? this.media.url : "/img/placeholder.png";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QImg, {
    ratio: $props.ratio,
    class: "thumbnail",
    src: $options.src
  }, null, 8, ["ratio", "src"]);
}
var BaseThumbnail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "BaseThumbnail.vue"]]);
var __require_context_for_vite_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": BaseThumbnail
}, Symbol.toStringTag, { value: "Module" }));
var __require_context_for_vite_map_0 = {
  "./BaseAlert.vue": __require_context_for_vite_0_0,
  "./BaseBtn.vue": __require_context_for_vite_0_1,
  "./BaseBtnDropdown.vue": __require_context_for_vite_0_2,
  "./BaseDialog.vue": __require_context_for_vite_0_3,
  "./BaseForm.vue": __require_context_for_vite_0_4,
  "./BaseInfo.vue": __require_context_for_vite_0_5,
  "./BaseInput.vue": __require_context_for_vite_0_6,
  "./BaseItem.vue": __require_context_for_vite_0_7,
  "./BaseLabel.vue": __require_context_for_vite_0_8,
  "./BaseSection.vue": __require_context_for_vite_0_9,
  "./BaseSelect.vue": __require_context_for_vite_0_10,
  "./BaseStatic.vue": __require_context_for_vite_0_11,
  "./BaseTable.vue": __require_context_for_vite_0_12,
  "./BaseThumbnail.vue": __require_context_for_vite_0_13
};
function __require_context_for_vite_function_0(req) {
  __require_context_for_vite_function_0_resolve(req);
  return __require_context_for_vite_map_0[req];
}
function __require_context_for_vite_function_0_resolve(req) {
  if (req in __require_context_for_vite_map_0) {
    return __require_context_for_vite_map_0[req];
  }
  var e = new Error("Cannot find module '" + req + "'");
  e.code = "MODULE_NOT_FOUND";
  throw e;
}
__require_context_for_vite_function_0.keys = function __require_context_for_vite_function_0_keys() {
  return Object.keys(__require_context_for_vite_map_0);
};
__require_context_for_vite_function_0.resolve = __require_context_for_vite_function_0_resolve;
__require_context_for_vite_function_0.id = "__require_context_for_vite_function_0";
var baseComponents = boot(async ({ app }) => {
  console.core("Auto loading base components");
  const requireComponent = __require_context_for_vite_function_0;
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = lodash.exports.upperFirst(
      lodash.exports.camelCase(
        fileName.split("/").pop().replace(/\.\w+$/, "")
      )
    );
    app.component(componentName, componentConfig.default || componentConfig);
  });
});
export { baseComponents as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb21wb25lbnRzLmYzNTkxOWY2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9iYXNlL0Jhc2VCdG4udnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4tZ3JvdXAvUUJ0bkdyb3VwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYW5jaG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2Nyb2xsLXRhcmdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvY2xpY2stb3V0c2lkZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcG9zaXRpb24tZW5naW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9tZW51L1FNZW51LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4tZHJvcGRvd24vUUJ0bkRyb3Bkb3duLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlQnRuRHJvcGRvd24udnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy9DbG9zZVBvcHVwLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlRGlhbG9nLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZUZvcm0udnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9iYW5uZXIvUUJhbm5lci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZUlucHV0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZUl0ZW0udnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlTGFiZWwudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlU2VjdGlvbi52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZpZWxkL1FGaWVsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2hpcC9RQ2hpcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcnRsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NlbGVjdC9RU2VsZWN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlU2VsZWN0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZVN0YXRpYy52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL1FUZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvUVRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9tYXJrdXAtdGFibGUvUU1hcmt1cFRhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJsZS9nZXQtdGFibGUtbWlkZGxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy92aXJ0dWFsLXNjcm9sbC9RVmlydHVhbFNjcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbGluZWFyLXByb2dyZXNzL1FMaW5lYXJQcm9ncmVzcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZ1bGxzY3JlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3NvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLXNvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLWZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcGFnaW5hdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcm93LXNlbGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcm93LWV4cGFuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtY29sdW1uLXNlbGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvUVRhYmxlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvc2tlbGV0b24vVGFibGVTa2VsZXRvbi52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9iYXNlL0Jhc2VUYWJsZS52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yYXRpby5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW1nL1FJbWcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9iYXNlL0Jhc2VUaHVtYm5haWwudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICBuby1jYXBzXG4gICAgOnJpcHBsZT1cIiFsaW5rXCJcbiAgICA6Y2xhc3M9XCJ7XG4gICAgICAnYmFzZS1idG5fX25vLWZvY3VzIGJ0bi1saW5rJzogbGluayxcbiAgICAgICdoYXMtaWNvbic6IGljb24sXG4gICAgICAnbm8taWNvbic6ICFpY29uLFxuICAgICAgJ2Jhc2UtYnRuJzogdHJ1ZSxcbiAgICAgICd2ZXJ0aWNhbC1hbGlnbi1taWRkbGUnOiB2ZXJ0aWNhbE1pZGRlbCxcbiAgICB9XCJcbiAgICA6ZmxhdD1cImxpbmtcIlxuICAgIDpkZW5zZT1cImxpbmtcIlxuICAgIDppY29uPVwiaWNvblwiXG4gICAgc2l6ZT1cIjEzcHhcIlxuICA+XG4gICAgPHNsb3Q+PC9zbG90PlxuICA8L3EtYnRuPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBsaW5rOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIGljb246IFN0cmluZyxcbiAgICB2ZXJ0aWNhbE1pZGRlbDogQm9vbGVhbixcbiAgfSxcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzYXNzXCI+XG4uYmFzZS1idG5cbiAgJi52ZXJ0aWNhbC1hbGlnbi1taWRkbGVcbiAgICBwYWRkaW5nOiA5cHggMTZweFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGVcbiAgLnEtaWNvbiwgLnEtc3Bpbm5lclxuICAgIGZvbnQtc2l6ZTogMS4yNWVtXG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCdG5Hcm91cCcsXG5cbiAgcHJvcHM6IHtcbiAgICB1bmVsZXZhdGVkOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBwdXNoOiBCb29sZWFuLFxuICAgIHN0cmV0Y2g6IEJvb2xlYW4sXG4gICAgZ2xvc3N5OiBCb29sZWFuLFxuICAgIHNwcmVhZDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNscyA9IFsgJ3VuZWxldmF0ZWQnLCAnb3V0bGluZScsICdmbGF0JywgJ3JvdW5kZWQnLCAnc3F1YXJlJywgJ3B1c2gnLCAnc3RyZXRjaCcsICdnbG9zc3knIF1cbiAgICAgICAgLmZpbHRlcih0ID0+IHByb3BzWyB0IF0gPT09IHRydWUpXG4gICAgICAgIC5tYXAodCA9PiBgcS1idG4tZ3JvdXAtLSR7IHQgfWApLmpvaW4oJyAnKVxuXG4gICAgICByZXR1cm4gYHEtYnRuLWdyb3VwIHJvdyBuby13cmFwJHsgY2xzLmxlbmd0aCA+IDAgPyAnICcgKyBjbHMgOiAnJyB9YFxuICAgICAgICArIChwcm9wcy5zcHJlYWQgPT09IHRydWUgPyAnIHEtYnRuLWdyb3VwLS1zcHJlYWQnIDogJyBpbmxpbmUnKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IHJlZiwgd2F0Y2gsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjbGVhclNlbGVjdGlvbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JQcm9wcyA9IHtcbiAgdGFyZ2V0OiB7XG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBub1BhcmVudEV2ZW50OiBCb29sZWFuLFxuICBjb250ZXh0TWVudTogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoe1xuICBzaG93aW5nLFxuICBhdm9pZEVtaXQsIC8vIHJlcXVpcmVkIGZvciBRUG9wdXBQcm94eSAodHJ1ZSlcbiAgY29uZmlndXJlQW5jaG9yRWwgLy8gb3B0aW9uYWxcbn0pIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHksIGVtaXQgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgYW5jaG9yRWwgPSByZWYobnVsbClcblxuICBsZXQgdG91Y2hUaW1lclxuXG4gIGZ1bmN0aW9uIGNhblNob3cgKGV2dCkge1xuICAgIC8vIGFib3J0IHdpdGggbm8gcGFyZW50IGNvbmZpZ3VyZWQgb3Igb24gbXVsdGktdG91Y2hcbiAgICByZXR1cm4gYW5jaG9yRWwudmFsdWUgPT09IG51bGxcbiAgICAgID8gZmFsc2VcbiAgICAgIDogKGV2dCA9PT0gdm9pZCAwIHx8IGV2dC50b3VjaGVzID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoIDw9IDEpXG4gIH1cblxuICBjb25zdCBhbmNob3JFdmVudHMgPSB7fVxuXG4gIGlmIChjb25maWd1cmVBbmNob3JFbCA9PT0gdm9pZCAwKSB7XG4gICAgLy8gZGVmYXVsdCBjb25maWd1cmVBbmNob3JFbCBpcyBkZXNpZ25lZCBmb3JcbiAgICAvLyBRTWVudSAmIFFQb3B1cFByb3h5ICh3aGljaCBpcyB3aHkgaXQncyBoYW5kbGVkIGhlcmUpXG5cbiAgICBPYmplY3QuYXNzaWduKGFuY2hvckV2ZW50cywge1xuICAgICAgaGlkZSAoZXZ0KSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlIChldnQpIHtcbiAgICAgICAgcHJveHkudG9nZ2xlKGV2dClcbiAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlS2V5IChldnQpIHtcbiAgICAgICAgaXNLZXlDb2RlKGV2dCwgMTMpID09PSB0cnVlICYmIGFuY2hvckV2ZW50cy50b2dnbGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgY29udGV4dENsaWNrIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHByZXZlbnQoZXZ0KVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgcHJveHkuc2hvdyhldnQpXG4gICAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgcHJldmVudCxcblxuICAgICAgbW9iaWxlVG91Y2ggKGV2dCkge1xuICAgICAgICBhbmNob3JFdmVudHMubW9iaWxlQ2xlYW51cChldnQpXG5cbiAgICAgICAgaWYgKGNhblNob3coZXZ0KSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBbXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdwcmV2ZW50JywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgXSlcblxuICAgICAgICB0b3VjaFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcHJveHkuc2hvdyhldnQpXG4gICAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgICB9LCAzMDApXG4gICAgICB9LFxuXG4gICAgICBtb2JpbGVDbGVhbnVwIChldnQpIHtcbiAgICAgICAgYW5jaG9yRWwudmFsdWUuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuICAgICAgICBjbGVhclRpbWVvdXQodG91Y2hUaW1lcilcblxuICAgICAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBldnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25maWd1cmVBbmNob3JFbCA9IGZ1bmN0aW9uIChjb250ZXh0ID0gcHJvcHMuY29udGV4dE1lbnUpIHtcbiAgICAgIGlmIChwcm9wcy5ub1BhcmVudEV2ZW50ID09PSB0cnVlIHx8IGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGxldCBldnRzXG5cbiAgICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm94eS4kcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnbW9iaWxlVG91Y2gnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZG93bicsICdoaWRlJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY29udGV4dG1lbnUnLCAnY29udGV4dENsaWNrJywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldnRzID0gW1xuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjbGljaycsICd0b2dnbGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAna2V5dXAnLCAndG9nZ2xlS2V5JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZUFuY2hvckVsICgpIHtcbiAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICdhbmNob3InKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yRWwgKGVsKSB7XG4gICAgYW5jaG9yRWwudmFsdWUgPSBlbFxuICAgIHdoaWxlIChhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtYW5jaG9yLS1za2lwJykpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gYW5jaG9yRWwudmFsdWUucGFyZW50Tm9kZVxuICAgIH1cbiAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gIH1cblxuICBmdW5jdGlvbiBwaWNrQW5jaG9yRWwgKCkge1xuICAgIGlmIChwcm9wcy50YXJnZXQgPT09IGZhbHNlIHx8IHByb3BzLnRhcmdldCA9PT0gJycgfHwgcHJveHkuJGVsLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgIHNldEFuY2hvckVsKHByb3h5LiRlbC5wYXJlbnROb2RlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBlbCA9IHByb3BzLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvcHMudGFyZ2V0KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBlbCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbCAhPT0gdm9pZCAwICYmIGVsICE9PSBudWxsKSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gZWwuJGVsIHx8IGVsXG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhbmNob3JFbC52YWx1ZSA9IG51bGxcbiAgICAgICAgY29uc29sZS5lcnJvcihgQW5jaG9yOiB0YXJnZXQgXCIkeyBwcm9wcy50YXJnZXQgfVwiIG5vdCBmb3VuZGApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuY29udGV4dE1lbnUsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudGFyZ2V0LCAoKSA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICB9XG5cbiAgICBwaWNrQW5jaG9yRWwoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwaWNrQW5jaG9yRWwoKVxuXG4gICAgaWYgKGF2b2lkRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgIH1cbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0b3VjaFRpbWVyKVxuICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgYW5jaG9yRWwsXG4gICAgY2FuU2hvdyxcbiAgICBhbmNob3JFdmVudHNcbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBsaXN0ZW5PcHRzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChcbiAgcHJvcHMsXG4gIGNvbmZpZ3VyZVNjcm9sbFRhcmdldFxuKSB7XG4gIGNvbnN0IGxvY2FsU2Nyb2xsVGFyZ2V0ID0gcmVmKG51bGwpXG4gIGxldCBzY3JvbGxGblxuXG4gIGZ1bmN0aW9uIGNoYW5nZVNjcm9sbEV2ZW50IChzY3JvbGxUYXJnZXQsIGZuKSB7XG4gICAgY29uc3QgZm5Qcm9wID0gYCR7IGZuICE9PSB2b2lkIDAgPyAnYWRkJyA6ICdyZW1vdmUnIH1FdmVudExpc3RlbmVyYFxuICAgIGNvbnN0IGZuSGFuZGxlciA9IGZuICE9PSB2b2lkIDAgPyBmbiA6IHNjcm9sbEZuXG5cbiAgICBpZiAoc2Nyb2xsVGFyZ2V0ICE9PSB3aW5kb3cpIHtcbiAgICAgIHNjcm9sbFRhcmdldFsgZm5Qcm9wIF0oJ3Njcm9sbCcsIGZuSGFuZGxlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgIH1cblxuICAgIHdpbmRvd1sgZm5Qcm9wIF0oJ3Njcm9sbCcsIGZuSGFuZGxlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuXG4gICAgc2Nyb2xsRm4gPSBmblxuICB9XG5cbiAgZnVuY3Rpb24gdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgY2hhbmdlU2Nyb2xsRXZlbnQobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUpXG4gICAgICBsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSA9IG51bGxcbiAgICB9XG4gIH1cblxuICBjb25zdCBub1BhcmVudEV2ZW50V2F0Y2hlciA9IHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsICgpID0+IHtcbiAgICBpZiAobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudChub1BhcmVudEV2ZW50V2F0Y2hlcilcblxuICByZXR1cm4ge1xuICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LFxuICAgIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0LFxuICAgIGNoYW5nZVNjcm9sbEV2ZW50XG4gIH1cbn1cbiIsImltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi9ldmVudC5qcydcbmltcG9ydCB7IHBvcnRhbExpc3QgfSBmcm9tICcuLi9wcml2YXRlL3BvcnRhbC5qcydcblxubGV0IHRpbWVyXG5cbmNvbnN0XG4gIHsgbm90UGFzc2l2ZUNhcHR1cmUgfSA9IGxpc3Rlbk9wdHMsXG4gIHJlZ2lzdGVyZWRMaXN0ID0gW11cblxuZnVuY3Rpb24gZ2xvYmFsSGFuZGxlciAoZXZ0KSB7XG4gIGNsZWFyVGltZW91dCh0aW1lcilcblxuICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG5cbiAgaWYgKFxuICAgIHRhcmdldCA9PT0gdm9pZCAwXG4gICAgfHwgdGFyZ2V0Lm5vZGVUeXBlID09PSA4XG4gICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbm8tcG9pbnRlci1ldmVudHMnKSA9PT0gdHJ1ZVxuICApIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIGNoZWNrIGxhc3QgcG9ydGFsIHZtIGlmIGl0J3NcbiAgLy8gYSBRRGlhbG9nIGFuZCBub3QgaW4gc2VhbWxlc3MgbW9kZVxuICBsZXQgcG9ydGFsSW5kZXggPSBwb3J0YWxMaXN0Lmxlbmd0aCAtIDFcblxuICB3aGlsZSAocG9ydGFsSW5kZXggPj0gMCkge1xuICAgIGNvbnN0IHByb3h5ID0gcG9ydGFsTGlzdFsgcG9ydGFsSW5kZXggXS4kXG5cbiAgICBpZiAocHJveHkudHlwZS5uYW1lICE9PSAnUURpYWxvZycpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaWYgKHByb3h5LnByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBwb3J0YWxJbmRleC0tXG4gIH1cblxuICBmb3IgKGxldCBpID0gcmVnaXN0ZXJlZExpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBjb25zdCBzdGF0ZSA9IHJlZ2lzdGVyZWRMaXN0WyBpIF1cblxuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgc3RhdGUuYW5jaG9yRWwudmFsdWUgPT09IG51bGxcbiAgICAgICAgfHwgc3RhdGUuYW5jaG9yRWwudmFsdWUuY29udGFpbnModGFyZ2V0KSA9PT0gZmFsc2VcbiAgICAgIClcbiAgICAgICYmIChcbiAgICAgICAgdGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5XG4gICAgICAgIHx8IChcbiAgICAgICAgICBzdGF0ZS5pbm5lclJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICYmIHN0YXRlLmlubmVyUmVmLnZhbHVlLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgIClcbiAgICApIHtcbiAgICAgIC8vIG1hcmsgdGhlIGV2ZW50IGFzIGJlaW5nIHByb2Nlc3NlZCBieSBjbGlja091dHNpZGVcbiAgICAgIC8vIHVzZWQgdG8gcHJldmVudCByZWZvY3VzIGFmdGVyIG1lbnUgY2xvc2VcbiAgICAgIGV2dC5xQ2xpY2tPdXRzaWRlID0gdHJ1ZVxuICAgICAgc3RhdGUub25DbGlja091dHNpZGUoZXZ0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xpY2tPdXRzaWRlIChjbGlja091dHNpZGVQcm9wcykge1xuICByZWdpc3RlcmVkTGlzdC5wdXNoKGNsaWNrT3V0c2lkZVByb3BzKVxuXG4gIGlmIChyZWdpc3RlcmVkTGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsaWNrT3V0c2lkZSAoY2xpY2tPdXRzaWRlUHJvcHMpIHtcbiAgY29uc3QgaW5kZXggPSByZWdpc3RlcmVkTGlzdC5maW5kSW5kZXgoaCA9PiBoID09PSBjbGlja091dHNpZGVQcm9wcylcblxuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIHJlZ2lzdGVyZWRMaXN0LnNwbGljZShpbmRleCwgMSlcblxuICAgIGlmIChyZWdpc3RlcmVkTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0U2Nyb2xsYmFyV2lkdGggfSBmcm9tICcuLi9zY3JvbGwuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5sZXQgdnBMZWZ0LCB2cFRvcFxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVQb3NpdGlvbiAocG9zKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICd0b3AnLCAnY2VudGVyJywgJ2JvdHRvbScgXS5pbmNsdWRlcyhwYXJ0c1sgMCBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3Qgc3RhcnQgd2l0aCBvbmUgb2YgdG9wL2NlbnRlci9ib3R0b20nKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcsICdzdGFydCcsICdlbmQnIF0uaW5jbHVkZXMocGFydHNbIDEgXSkgIT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBbmNob3IvU2VsZiBwb3NpdGlvbiBtdXN0IGVuZCB3aXRoIG9uZSBvZiBsZWZ0L21pZGRsZS9yaWdodC9zdGFydC9lbmQnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU9mZnNldCAodmFsKSB7XG4gIGlmICghdmFsKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKHZhbC5sZW5ndGggIT09IDIpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHR5cGVvZiB2YWxbIDAgXSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbFsgMSBdICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IGhvcml6b250YWxQb3MgPSB7XG4gICdzdGFydCNsdHInOiAnbGVmdCcsXG4gICdzdGFydCNydGwnOiAncmlnaHQnLFxuICAnZW5kI2x0cic6ICdyaWdodCcsXG4gICdlbmQjcnRsJzogJ2xlZnQnXG59XG5cbjtbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcgXS5mb3JFYWNoKHBvcyA9PiB7XG4gIGhvcml6b250YWxQb3NbIGAkeyBwb3MgfSNsdHJgIF0gPSBwb3NcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I3J0bGAgXSA9IHBvc1xufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUG9zaXRpb24gKHBvcywgcnRsKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgcmV0dXJuIHtcbiAgICB2ZXJ0aWNhbDogcGFydHNbIDAgXSxcbiAgICBob3Jpem9udGFsOiBob3Jpem9udGFsUG9zWyBgJHsgcGFydHNbIDEgXSB9IyR7IHJ0bCA9PT0gdHJ1ZSA/ICdydGwnIDogJ2x0cicgfWAgXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNob3JQcm9wcyAoZWwsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgaWYgKG9mZnNldCAhPT0gdm9pZCAwKSB7XG4gICAgdG9wIC09IG9mZnNldFsgMSBdXG4gICAgbGVmdCAtPSBvZmZzZXRbIDAgXVxuICAgIGJvdHRvbSArPSBvZmZzZXRbIDEgXVxuICAgIHJpZ2h0ICs9IG9mZnNldFsgMCBdXG5cbiAgICB3aWR0aCArPSBvZmZzZXRbIDAgXVxuICAgIGhlaWdodCArPSBvZmZzZXRbIDEgXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3AsXG4gICAgbGVmdCxcbiAgICByaWdodCxcbiAgICBib3R0b20sXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIG1pZGRsZTogbGVmdCArIChyaWdodCAtIGxlZnQpIC8gMixcbiAgICBjZW50ZXI6IHRvcCArIChib3R0b20gLSB0b3ApIC8gMlxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXJnZXRQcm9wcyAoZWwpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgY2VudGVyOiBlbC5vZmZzZXRIZWlnaHQgLyAyLFxuICAgIGJvdHRvbTogZWwub2Zmc2V0SGVpZ2h0LFxuICAgIGxlZnQ6IDAsXG4gICAgbWlkZGxlOiBlbC5vZmZzZXRXaWR0aCAvIDIsXG4gICAgcmlnaHQ6IGVsLm9mZnNldFdpZHRoXG4gIH1cbn1cblxuLy8gY2ZnOiB7IGVsLCBhbmNob3JFbCwgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luLCBvZmZzZXQsIGFic29sdXRlT2Zmc2V0LCBjb3ZlciwgZml0LCBtYXhIZWlnaHQsIG1heFdpZHRoIH1cbmV4cG9ydCBmdW5jdGlvbiBzZXRQb3NpdGlvbiAoY2ZnKSB7XG4gIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlICYmIHdpbmRvdy52aXN1YWxWaWV3cG9ydCAhPT0gdm9pZCAwKSB7XG4gICAgLy8gdXNlcyB0aGUgcS1wb3NpdGlvbi1lbmdpbmUgQ1NTIGNsYXNzXG5cbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmJvZHkuc3R5bGVcbiAgICBjb25zdCB7IG9mZnNldExlZnQ6IGxlZnQsIG9mZnNldFRvcDogdG9wIH0gPSB3aW5kb3cudmlzdWFsVmlld3BvcnRcblxuICAgIGlmIChsZWZ0ICE9PSB2cExlZnQpIHtcbiAgICAgIGVsLnNldFByb3BlcnR5KCctLXEtcGUtbGVmdCcsIGxlZnQgKyAncHgnKVxuICAgICAgdnBMZWZ0ID0gbGVmdFxuICAgIH1cbiAgICBpZiAodG9wICE9PSB2cFRvcCkge1xuICAgICAgZWwuc2V0UHJvcGVydHkoJy0tcS1wZS10b3AnLCB0b3AgKyAncHgnKVxuICAgICAgdnBUb3AgPSB0b3BcbiAgICB9XG4gIH1cblxuICBsZXQgYW5jaG9yUHJvcHNcblxuICAvLyBzY3JvbGwgcG9zaXRpb24gbWlnaHQgY2hhbmdlXG4gIC8vIGlmIG1heC1oZWlnaHQvLXdpZHRoIGNoYW5nZXMsIHNvIHdlXG4gIC8vIG5lZWQgdG8gcmVzdG9yZSBpdCBhZnRlciB3ZSBjYWxjdWxhdGVcbiAgLy8gdGhlIG5ldyBwb3NpdGlvbmluZ1xuICBjb25zdCB7IHNjcm9sbExlZnQsIHNjcm9sbFRvcCB9ID0gY2ZnLmVsXG5cbiAgaWYgKGNmZy5hYnNvbHV0ZU9mZnNldCA9PT0gdm9pZCAwKSB7XG4gICAgYW5jaG9yUHJvcHMgPSBnZXRBbmNob3JQcm9wcyhjZmcuYW5jaG9yRWwsIGNmZy5jb3ZlciA9PT0gdHJ1ZSA/IFsgMCwgMCBdIDogY2ZnLm9mZnNldClcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdFxuICAgICAgeyB0b3A6IGFuY2hvclRvcCwgbGVmdDogYW5jaG9yTGVmdCB9ID0gY2ZnLmFuY2hvckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgdG9wID0gYW5jaG9yVG9wICsgY2ZnLmFic29sdXRlT2Zmc2V0LnRvcCxcbiAgICAgIGxlZnQgPSBhbmNob3JMZWZ0ICsgY2ZnLmFic29sdXRlT2Zmc2V0LmxlZnRcblxuICAgIGFuY2hvclByb3BzID0geyB0b3AsIGxlZnQsIHdpZHRoOiAxLCBoZWlnaHQ6IDEsIHJpZ2h0OiBsZWZ0ICsgMSwgY2VudGVyOiB0b3AsIG1pZGRsZTogbGVmdCwgYm90dG9tOiB0b3AgKyAxIH1cbiAgfVxuXG4gIGxldCBlbFN0eWxlID0ge1xuICAgIG1heEhlaWdodDogY2ZnLm1heEhlaWdodCxcbiAgICBtYXhXaWR0aDogY2ZnLm1heFdpZHRoLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICB9XG5cbiAgaWYgKGNmZy5maXQgPT09IHRydWUgfHwgY2ZnLmNvdmVyID09PSB0cnVlKSB7XG4gICAgZWxTdHlsZS5taW5XaWR0aCA9IGFuY2hvclByb3BzLndpZHRoICsgJ3B4J1xuICAgIGlmIChjZmcuY292ZXIgPT09IHRydWUpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gYW5jaG9yUHJvcHMuaGVpZ2h0ICsgJ3B4J1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY2ZnLmVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIGNvbnN0XG4gICAgdGFyZ2V0UHJvcHMgPSBnZXRUYXJnZXRQcm9wcyhjZmcuZWwpLFxuICAgIHByb3BzID0ge1xuICAgICAgdG9wOiBhbmNob3JQcm9wc1sgY2ZnLmFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdIC0gdGFyZ2V0UHJvcHNbIGNmZy5zZWxmT3JpZ2luLnZlcnRpY2FsIF0sXG4gICAgICBsZWZ0OiBhbmNob3JQcm9wc1sgY2ZnLmFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gLSB0YXJnZXRQcm9wc1sgY2ZnLnNlbGZPcmlnaW4uaG9yaXpvbnRhbCBdXG4gICAgfVxuXG4gIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBjZmcuYW5jaG9yT3JpZ2luLCBjZmcuc2VsZk9yaWdpbilcblxuICBlbFN0eWxlID0ge1xuICAgIHRvcDogcHJvcHMudG9wICsgJ3B4JyxcbiAgICBsZWZ0OiBwcm9wcy5sZWZ0ICsgJ3B4J1xuICB9XG5cbiAgaWYgKHByb3BzLm1heEhlaWdodCAhPT0gdm9pZCAwKSB7XG4gICAgZWxTdHlsZS5tYXhIZWlnaHQgPSBwcm9wcy5tYXhIZWlnaHQgKyAncHgnXG5cbiAgICBpZiAoYW5jaG9yUHJvcHMuaGVpZ2h0ID4gcHJvcHMubWF4SGVpZ2h0KSB7XG4gICAgICBlbFN0eWxlLm1pbkhlaWdodCA9IGVsU3R5bGUubWF4SGVpZ2h0XG4gICAgfVxuICB9XG4gIGlmIChwcm9wcy5tYXhXaWR0aCAhPT0gdm9pZCAwKSB7XG4gICAgZWxTdHlsZS5tYXhXaWR0aCA9IHByb3BzLm1heFdpZHRoICsgJ3B4J1xuXG4gICAgaWYgKGFuY2hvclByb3BzLndpZHRoID4gcHJvcHMubWF4V2lkdGgpIHtcbiAgICAgIGVsU3R5bGUubWluV2lkdGggPSBlbFN0eWxlLm1heFdpZHRoXG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihjZmcuZWwuc3R5bGUsIGVsU3R5bGUpXG5cbiAgLy8gcmVzdG9yZSBzY3JvbGwgcG9zaXRpb25cbiAgaWYgKGNmZy5lbC5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgIGNmZy5lbC5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcbiAgfVxuICBpZiAoY2ZnLmVsLnNjcm9sbExlZnQgIT09IHNjcm9sbExlZnQpIHtcbiAgICBjZmcuZWwuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnRcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUJvdW5kYXJpZXMgKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbikge1xuICBjb25zdFxuICAgIGN1cnJlbnRIZWlnaHQgPSB0YXJnZXRQcm9wcy5ib3R0b20sXG4gICAgY3VycmVudFdpZHRoID0gdGFyZ2V0UHJvcHMucmlnaHQsXG4gICAgbWFyZ2luID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKSxcbiAgICBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIG1hcmdpbixcbiAgICBpbm5lcldpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuXG4gIGlmIChwcm9wcy50b3AgPCAwIHx8IHByb3BzLnRvcCArIGN1cnJlbnRIZWlnaHQgPiBpbm5lckhlaWdodCkge1xuICAgIGlmIChzZWxmT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJykge1xuICAgICAgcHJvcHMudG9wID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgID8gTWF0aC5tYXgoMCwgaW5uZXJIZWlnaHQgLSBjdXJyZW50SGVpZ2h0KVxuICAgICAgICA6IDBcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gPiBpbm5lckhlaWdodCAvIDIpIHtcbiAgICAgIGNvbnN0IGFuY2hvclkgPSBNYXRoLm1pbihcbiAgICAgICAgaW5uZXJIZWlnaHQsXG4gICAgICAgIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcidcbiAgICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLmJvdHRvbSA6IGFuY2hvclByb3BzLnRvcClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGFuY2hvclkpXG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JZIC0gY3VycmVudEhlaWdodClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgID8gYW5jaG9yUHJvcHMuY2VudGVyXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLnRvcCA6IGFuY2hvclByb3BzLmJvdHRvbSlcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0IC0gcHJvcHMudG9wKVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9wcy5sZWZ0IDwgMCB8fCBwcm9wcy5sZWZ0ICsgY3VycmVudFdpZHRoID4gaW5uZXJXaWR0aCkge1xuICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBpbm5lcldpZHRoKVxuICAgIGlmIChzZWxmT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnKSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVyV2lkdGggLSBjdXJyZW50V2lkdGgpXG4gICAgICAgIDogMFxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSA+IGlubmVyV2lkdGggLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JYID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVyV2lkdGgsXG4gICAgICAgIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgICAgOiAoYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09IHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA/IGFuY2hvclByb3BzLnJpZ2h0IDogYW5jaG9yUHJvcHMubGVmdClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBhbmNob3JYKVxuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvclggLSBwcm9wcy5tYXhXaWR0aClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnXG4gICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5sZWZ0IDogYW5jaG9yUHJvcHMucmlnaHQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aCAtIHByb3BzLmxlZnQpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbmNob3IsIHsgdXNlQW5jaG9yUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1hbmNob3IuanMnXG5pbXBvcnQgdXNlU2Nyb2xsVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNjcm9sbC10YXJnZXQuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBvcnRhbC5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGltZW91dC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjbG9zZVBvcnRhbE1lbnVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9wb3J0YWwuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQgfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwuanMnXG5pbXBvcnQgeyBwb3NpdGlvbiwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBhZGRFc2NhcGVLZXksIHJlbW92ZUVzY2FwZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZXNjYXBlLWtleS5qcydcbmltcG9ydCB7IGFkZEZvY3Vzb3V0LCByZW1vdmVGb2N1c291dCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXNvdXQuanMnXG5pbXBvcnQgeyBjaGlsZEhhc0ZvY3VzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZG9tLmpzJ1xuaW1wb3J0IHsgYWRkQ2xpY2tPdXRzaWRlLCByZW1vdmVDbGlja091dHNpZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NsaWNrLW91dHNpZGUuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5pbXBvcnQge1xuICB2YWxpZGF0ZVBvc2l0aW9uLCB2YWxpZGF0ZU9mZnNldCwgc2V0UG9zaXRpb24sIHBhcnNlUG9zaXRpb25cbn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9wb3NpdGlvbi1lbmdpbmUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTWVudScsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFuY2hvclByb3BzLFxuICAgIC4uLnVzZU1vZGVsVG9nZ2xlUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgYXV0b0Nsb3NlOiBCb29sZWFuLFxuICAgIHNlcGFyYXRlQ2xvc2VQb3B1cDogQm9vbGVhbixcblxuICAgIG5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUmVmb2N1czogQm9vbGVhbixcbiAgICBub0ZvY3VzOiBCb29sZWFuLFxuXG4gICAgZml0OiBCb29sZWFuLFxuICAgIGNvdmVyOiBCb29sZWFuLFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuXG4gICAgYW5jaG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUG9zaXRpb25cbiAgICB9LFxuICAgIHNlbGY6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVPZmZzZXRcbiAgICB9LFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiB7XG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuXG4gICAgdG91Y2hQb3NpdGlvbjogQm9vbGVhbixcblxuICAgIG1heEhlaWdodDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgbWF4V2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdlc2NhcGUta2V5J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGxldCByZWZvY3VzVGFyZ2V0ID0gbnVsbCwgYWJzb2x1dGVPZmZzZXQsIHVud2F0Y2hQb3NpdGlvbiwgYXZvaWRBdXRvQ2xvc2VcblxuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5IH0gPSB2bVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCBpbm5lclJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoZmFsc2UpXG5cbiAgICBjb25zdCBoaWRlT25Sb3V0ZUNoYW5nZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ub1JvdXRlRGlzbWlzcyAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCwgcmVtb3ZlVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyB0cmFuc2l0aW9uLCB0cmFuc2l0aW9uU3R5bGUgfSA9IHVzZVRyYW5zaXRpb24ocHJvcHMsIHNob3dpbmcpXG4gICAgY29uc3QgeyBsb2NhbFNjcm9sbFRhcmdldCwgY2hhbmdlU2Nyb2xsRXZlbnQsIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0IH0gPSB1c2VTY3JvbGxUYXJnZXQocHJvcHMsIGNvbmZpZ3VyZVNjcm9sbFRhcmdldClcblxuICAgIGNvbnN0IHsgYW5jaG9yRWwsIGNhblNob3cgfSA9IHVzZUFuY2hvcih7IHNob3dpbmcgfSlcblxuICAgIGNvbnN0IHsgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZywgY2FuU2hvdywgaGFuZGxlU2hvdywgaGFuZGxlSGlkZSxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgcHJvY2Vzc09uTW91bnQ6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBzaG93UG9ydGFsLCBoaWRlUG9ydGFsLCByZW5kZXJQb3J0YWwgfSA9IHVzZVBvcnRhbCh2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQpXG5cbiAgICBjb25zdCBjbGlja091dHNpZGVQcm9wcyA9IHtcbiAgICAgIGFuY2hvckVsLFxuICAgICAgaW5uZXJSZWYsXG4gICAgICBvbkNsaWNrT3V0c2lkZSAoZSkge1xuICAgICAgICBpZiAocHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgaGlkZShlKVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgLy8gYWx3YXlzIHByZXZlbnQgdG91Y2ggZXZlbnRcbiAgICAgICAgICAgIGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnXG4gICAgICAgICAgICAvLyBwcmV2ZW50IGNsaWNrIGlmIGl0J3Mgb24gYSBkaWFsb2cgYmFja2Ryb3BcbiAgICAgICAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncS1kaWFsb2dfX2JhY2tkcm9wJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFuY2hvck9yaWdpbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwYXJzZVBvc2l0aW9uKFxuICAgICAgICBwcm9wcy5hbmNob3IgfHwgKFxuICAgICAgICAgIHByb3BzLmNvdmVyID09PSB0cnVlID8gJ2NlbnRlciBtaWRkbGUnIDogJ2JvdHRvbSBzdGFydCdcbiAgICAgICAgKSxcbiAgICAgICAgJHEubGFuZy5ydGxcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBzZWxmT3JpZ2luID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY292ZXIgPT09IHRydWVcbiAgICAgICAgPyBhbmNob3JPcmlnaW4udmFsdWVcbiAgICAgICAgOiBwYXJzZVBvc2l0aW9uKHByb3BzLnNlbGYgfHwgJ3RvcCBzdGFydCcsICRxLmxhbmcucnRsKVxuICAgICkpXG5cbiAgICBjb25zdCBtZW51Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1tZW51LS1zcXVhcmUnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtbWVudS0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5hdXRvQ2xvc2UgPT09IHRydWVcbiAgICAgICAgPyB7IG9uQ2xpY2s6IG9uQXV0b0Nsb3NlIH1cbiAgICAgICAgOiB7fVxuICAgICkpXG5cbiAgICBjb25zdCBoYW5kbGVzRm9jdXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgKVxuXG4gICAgd2F0Y2goaGFuZGxlc0ZvY3VzLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBhZGRFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIGFkZENsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgICBpZiAobm9kZSAmJiBub2RlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICE9PSB0cnVlKSB7XG4gICAgICAgICAgbm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKSB8fCBub2RlXG4gICAgICAgICAgbm9kZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTaG93IChldnQpIHtcbiAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgcmVtb3ZlVGltZW91dCgpXG5cbiAgICAgIHJlZm9jdXNUYXJnZXQgPSBwcm9wcy5ub1JlZm9jdXMgPT09IGZhbHNlXG4gICAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICA6IG51bGxcblxuICAgICAgYWRkRm9jdXNvdXQob25Gb2N1c291dClcblxuICAgICAgc2hvd1BvcnRhbCgpXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuXG4gICAgICBhYnNvbHV0ZU9mZnNldCA9IHZvaWQgMFxuXG4gICAgICBpZiAoZXZ0ICE9PSB2b2lkIDAgJiYgKHByb3BzLnRvdWNoUG9zaXRpb24gfHwgcHJvcHMuY29udGV4dE1lbnUpKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICBpZiAocG9zLmxlZnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBhbmNob3JFbC52YWx1ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIGFic29sdXRlT2Zmc2V0ID0geyBsZWZ0OiBwb3MubGVmdCAtIGxlZnQsIHRvcDogcG9zLnRvcCAtIHRvcCB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHdhdGNoKFxuICAgICAgICAgICgpID0+ICRxLnNjcmVlbi53aWR0aCArICd8JyArICRxLnNjcmVlbi5oZWlnaHQgKyAnfCcgKyBwcm9wcy5zZWxmICsgJ3wnICsgcHJvcHMuYW5jaG9yICsgJ3wnICsgJHEubGFuZy5ydGwsXG4gICAgICAgICAgdXBkYXRlUG9zaXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKVxuICAgICAgfVxuXG4gICAgICByZWdpc3RlclRpY2soKCkgPT4ge1xuICAgICAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAgICAgIHByb3BzLm5vRm9jdXMgIT09IHRydWUgJiYgZm9jdXMoKVxuICAgICAgfSlcblxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gcmVxdWlyZWQgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiZG91YmxlLXRhcCBuZWVkZWRcIiBpc3N1ZVxuICAgICAgICBpZiAoJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gaWYgYXV0by1jbG9zZSwgdGhlbiB0aGlzIGNsaWNrIHNob3VsZFxuICAgICAgICAgIC8vIG5vdCBjbG9zZSB0aGUgbWVudVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gcHJvcHMuYXV0b0Nsb3NlXG4gICAgICAgICAgaW5uZXJSZWYudmFsdWUuY2xpY2soKVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBzaG93UG9ydGFsKHRydWUpIC8vIGRvbmUgc2hvd2luZyBwb3J0YWxcbiAgICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQpIHtcbiAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgcmVtb3ZlVGltZW91dCgpXG4gICAgICBoaWRlUG9ydGFsKClcblxuICAgICAgYW5jaG9yQ2xlYW51cCh0cnVlKVxuXG4gICAgICBpZiAoXG4gICAgICAgIHJlZm9jdXNUYXJnZXQgIT09IG51bGxcbiAgICAgICAgJiYgKFxuICAgICAgICAgIC8vIG1lbnUgd2FzIGhpZGRlbiBmcm9tIGNvZGUgb3IgRVNDIHBsdWdpblxuICAgICAgICAgIGV2dCA9PT0gdm9pZCAwXG4gICAgICAgICAgLy8gbWVudSB3YXMgbm90IGNsb3NlZCBmcm9tIGEgbW91c2Ugb3IgdG91Y2ggY2xpY2tPdXRzaWRlXG4gICAgICAgICAgfHwgZXZ0LnFDbGlja091dHNpZGUgIT09IHRydWVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQuZm9jdXMoKVxuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuY2hvckNsZWFudXAgKGhpZGluZykge1xuICAgICAgYWJzb2x1dGVPZmZzZXQgPSB2b2lkIDBcblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbigpXG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nID09PSB0cnVlIHx8IHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmVtb3ZlRm9jdXNvdXQob25Gb2N1c291dClcbiAgICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgICByZW1vdmVDbGlja091dHNpZGUoY2xpY2tPdXRzaWRlUHJvcHMpXG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyAhPT0gdHJ1ZSkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwgfHwgcHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQudmFsdWUgPSBnZXRTY3JvbGxUYXJnZXQoYW5jaG9yRWwudmFsdWUsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgICAgY2hhbmdlU2Nyb2xsRXZlbnQobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUsIHVwZGF0ZVBvc2l0aW9uKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQXV0b0Nsb3NlIChlKSB7XG4gICAgICAvLyBpZiBhdXRvLWNsb3NlLCB0aGVuIHRoZSBpb3MgZG91YmxlLXRhcCBmaXggd2hpY2hcbiAgICAgIC8vIGlzc3VlcyBhIGNsaWNrIHNob3VsZCBub3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgIGlmIChhdm9pZEF1dG9DbG9zZSAhPT0gdHJ1ZSkge1xuICAgICAgICBjbG9zZVBvcnRhbE1lbnVzKHByb3h5LCBlKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNvdXQgKGV2dCkge1xuICAgICAgLy8gdGhlIGZvY3VzIGlzIG5vdCBpbiBhIHZ1ZSBjaGlsZCBjb21wb25lbnRcbiAgICAgIGlmIChcbiAgICAgICAgaGFuZGxlc0ZvY3VzLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm5vRm9jdXMgIT09IHRydWVcbiAgICAgICAgJiYgY2hpbGRIYXNGb2N1cyhpbm5lclJlZi52YWx1ZSwgZXZ0LnRhcmdldCkgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICBmb2N1cygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Fc2NhcGVLZXkgKGV2dCkge1xuICAgICAgZW1pdCgnZXNjYXBlLWtleScpXG4gICAgICBoaWRlKGV2dClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICBjb25zdCBlbCA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgIGlmIChlbCA9PT0gbnVsbCB8fCBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgc2V0UG9zaXRpb24oe1xuICAgICAgICBlbCxcbiAgICAgICAgb2Zmc2V0OiBwcm9wcy5vZmZzZXQsXG4gICAgICAgIGFuY2hvckVsOiBhbmNob3JFbC52YWx1ZSxcbiAgICAgICAgYW5jaG9yT3JpZ2luOiBhbmNob3JPcmlnaW4udmFsdWUsXG4gICAgICAgIHNlbGZPcmlnaW46IHNlbGZPcmlnaW4udmFsdWUsXG4gICAgICAgIGFic29sdXRlT2Zmc2V0LFxuICAgICAgICBmaXQ6IHByb3BzLmZpdCxcbiAgICAgICAgY292ZXI6IHByb3BzLmNvdmVyLFxuICAgICAgICBtYXhIZWlnaHQ6IHByb3BzLm1heEhlaWdodCxcbiAgICAgICAgbWF4V2lkdGg6IHByb3BzLm1heFdpZHRoXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIFRyYW5zaXRpb24sXG4gICAgICAgIHsgbmFtZTogdHJhbnNpdGlvbi52YWx1ZSwgYXBwZWFyOiB0cnVlIH0sXG4gICAgICAgICgpID0+IChcbiAgICAgICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAncS1tZW51IHEtcG9zaXRpb24tZW5naW5lIHNjcm9sbCcgKyBtZW51Q2xhc3MudmFsdWUsXG4gICAgICAgICAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6IFtcbiAgICAgICAgICAgICAgICBhdHRycy5zdHlsZSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uU3R5bGUudmFsdWVcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgLi4ub25FdmVudHMudmFsdWVcbiAgICAgICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoYW5jaG9yQ2xlYW51cClcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgZm9jdXMsIHVwZGF0ZVBvc2l0aW9uIH0pXG5cbiAgICByZXR1cm4gcmVuZGVyUG9ydGFsXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFCdG4gZnJvbSAnLi4vYnRuL1FCdG4uanMnXG5pbXBvcnQgUUJ0bkdyb3VwIGZyb20gJy4uL2J0bi1ncm91cC9RQnRuR3JvdXAuanMnXG5pbXBvcnQgUU1lbnUgZnJvbSAnLi4vbWVudS9RTWVudS5qcydcblxuaW1wb3J0IHsgdXNlQnRuUHJvcHMgfSBmcm9tICcuLi9idG4vdXNlLWJ0bi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJ0bkRyb3Bkb3duJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUJ0blByb3BzLFxuXG4gICAgbW9kZWxWYWx1ZTogQm9vbGVhbixcbiAgICBzcGxpdDogQm9vbGVhbixcbiAgICBkcm9wZG93bkljb246IFN0cmluZyxcblxuICAgIGNvbnRlbnRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBjb250ZW50U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgICBjb3ZlcjogQm9vbGVhbixcbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIG5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuICAgIGF1dG9DbG9zZTogQm9vbGVhbixcblxuICAgIG1lbnVBbmNob3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdib3R0b20gZW5kJ1xuICAgIH0sXG4gICAgbWVudVNlbGY6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0b3AgZW5kJ1xuICAgIH0sXG4gICAgbWVudU9mZnNldDogQXJyYXksXG5cbiAgICBkaXNhYmxlTWFpbkJ0bjogQm9vbGVhbixcbiAgICBkaXNhYmxlRHJvcGRvd246IEJvb2xlYW4sXG5cbiAgICBub0ljb25BbmltYXRpb246IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAnY2xpY2snLCAnYmVmb3JlLXNob3cnLCAnc2hvdycsICdiZWZvcmUtaGlkZScsICdoaWRlJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYocHJvcHMubW9kZWxWYWx1ZSlcbiAgICBjb25zdCBtZW51UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge1xuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJ1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgfHwgKFxuICAgICAgICAgIChwcm9wcy5zcGxpdCA9PT0gZmFsc2UgJiYgcHJvcHMuZGlzYWJsZU1haW5CdG4gPT09IHRydWUpXG4gICAgICAgICAgfHwgcHJvcHMuZGlzYWJsZURyb3Bkb3duID09PSB0cnVlXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgaWNvbkNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJ0bi1kcm9wZG93bl9fYXJyb3cnXG4gICAgICArIChzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vSWNvbkFuaW1hdGlvbiA9PT0gZmFsc2UgPyAnIHJvdGF0ZS0xODAnIDogJycpXG4gICAgICArIChwcm9wcy5zcGxpdCA9PT0gZmFsc2UgPyAnIHEtYnRuLWRyb3Bkb3duX19hcnJvdy1jb250YWluZXInIDogJycpXG4gICAgKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdmFsID0+IHtcbiAgICAgIG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZVsgdmFsID8gJ3Nob3cnIDogJ2hpZGUnIF0oKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5zcGxpdCwgaGlkZSlcblxuICAgIGZ1bmN0aW9uIG9uQmVmb3JlU2hvdyAoZSkge1xuICAgICAgc2hvd2luZy52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ2JlZm9yZS1zaG93JywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNob3cgKGUpIHtcbiAgICAgIGVtaXQoJ3Nob3cnLCBlKVxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmVmb3JlSGlkZSAoZSkge1xuICAgICAgc2hvd2luZy52YWx1ZSA9IGZhbHNlXG4gICAgICBlbWl0KCdiZWZvcmUtaGlkZScsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25IaWRlIChlKSB7XG4gICAgICBlbWl0KCdoaWRlJywgZSlcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tIaWRlIChlKSB7XG4gICAgICBzdG9wKGUpXG4gICAgICBoaWRlKClcbiAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgICAgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCAmJiBtZW51UmVmLnZhbHVlLnRvZ2dsZShldnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvdyAoZXZ0KSB7XG4gICAgICBtZW51UmVmLnZhbHVlICE9PSBudWxsICYmIG1lbnVSZWYudmFsdWUuc2hvdyhldnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZSAoZXZ0KSB7XG4gICAgICBtZW51UmVmLnZhbHVlICE9PSBudWxsICYmIG1lbnVSZWYudmFsdWUuaGlkZShldnQpXG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgc2hvdywgaGlkZSwgdG9nZ2xlXG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIHNob3coKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgQXJyb3cgPSBbXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogaWNvbkNsYXNzLnZhbHVlLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmRyb3Bkb3duSWNvbiB8fCBwcm94eS4kcS5pY29uU2V0LmFycm93LmRyb3Bkb3duXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIHByb3BzLmRpc2FibGVEcm9wZG93biAhPT0gdHJ1ZSAmJiBBcnJvdy5wdXNoKFxuICAgICAgICBoKFFNZW51LCB7XG4gICAgICAgICAgcmVmOiBtZW51UmVmLFxuICAgICAgICAgIGNsYXNzOiBwcm9wcy5jb250ZW50Q2xhc3MsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmNvbnRlbnRTdHlsZSxcbiAgICAgICAgICBjb3ZlcjogcHJvcHMuY292ZXIsXG4gICAgICAgICAgZml0OiB0cnVlLFxuICAgICAgICAgIHBlcnNpc3RlbnQ6IHByb3BzLnBlcnNpc3RlbnQsXG4gICAgICAgICAgbm9Sb3V0ZURpc21pc3M6IHByb3BzLm5vUm91dGVEaXNtaXNzLFxuICAgICAgICAgIGF1dG9DbG9zZTogcHJvcHMuYXV0b0Nsb3NlLFxuICAgICAgICAgIGFuY2hvcjogcHJvcHMubWVudUFuY2hvcixcbiAgICAgICAgICBzZWxmOiBwcm9wcy5tZW51U2VsZixcbiAgICAgICAgICBvZmZzZXQ6IHByb3BzLm1lbnVPZmZzZXQsXG4gICAgICAgICAgc2VwYXJhdGVDbG9zZVBvcHVwOiB0cnVlLFxuICAgICAgICAgIG9uQmVmb3JlU2hvdyxcbiAgICAgICAgICBvblNob3csXG4gICAgICAgICAgb25CZWZvcmVIaWRlLFxuICAgICAgICAgIG9uSGlkZVxuICAgICAgICB9LCBzbG90cy5kZWZhdWx0KVxuICAgICAgKVxuXG4gICAgICBpZiAocHJvcHMuc3BsaXQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBoKFFCdG4sIHtcbiAgICAgICAgICBjbGFzczogJ3EtYnRuLWRyb3Bkb3duIHEtYnRuLWRyb3Bkb3duLS1zaW1wbGUnLFxuICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMuZGlzYWJsZU1haW5CdG4gPT09IHRydWUsXG4gICAgICAgICAgbm9XcmFwOiB0cnVlLFxuICAgICAgICAgIHJvdW5kOiBmYWxzZSxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgIG9uQ2xpY2tcbiAgICAgICAgfSwgKCkgPT4gaFNsb3Qoc2xvdHMubGFiZWwsIFtdKS5jb25jYXQoQXJyb3cpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChRQnRuR3JvdXAsIHtcbiAgICAgICAgY2xhc3M6ICdxLWJ0bi1kcm9wZG93biBxLWJ0bi1kcm9wZG93bi0tc3BsaXQgbm8td3JhcCBxLWJ0bi1pdGVtJyxcbiAgICAgICAgb3V0bGluZTogcHJvcHMub3V0bGluZSxcbiAgICAgICAgZmxhdDogcHJvcHMuZmxhdCxcbiAgICAgICAgcm91bmRlZDogcHJvcHMucm91bmRlZCxcbiAgICAgICAgc3F1YXJlOiBwcm9wcy5zcXVhcmUsXG4gICAgICAgIHB1c2g6IHByb3BzLnB1c2gsXG4gICAgICAgIHVuZWxldmF0ZWQ6IHByb3BzLnVuZWxldmF0ZWQsXG4gICAgICAgIGdsb3NzeTogcHJvcHMuZ2xvc3N5LFxuICAgICAgICBzdHJldGNoOiBwcm9wcy5zdHJldGNoXG4gICAgICB9LCAoKSA9PiBbXG4gICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgIGNsYXNzOiAncS1idG4tZHJvcGRvd24tLWN1cnJlbnQnLFxuICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMuZGlzYWJsZU1haW5CdG4gPT09IHRydWUsXG4gICAgICAgICAgbm9XcmFwOiB0cnVlLFxuICAgICAgICAgIGljb25SaWdodDogcHJvcHMuaWNvblJpZ2h0LFxuICAgICAgICAgIHJvdW5kOiBmYWxzZSxcbiAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrSGlkZVxuICAgICAgICB9LCBzbG90cy5sYWJlbCksXG5cbiAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWJ0bi1kcm9wZG93bl9fYXJyb3ctY29udGFpbmVyIHEtYW5jaG9yLS1za2lwJyxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMuZGlzYWJsZURyb3Bkb3duID09PSB0cnVlLFxuICAgICAgICAgIG91dGxpbmU6IHByb3BzLm91dGxpbmUsXG4gICAgICAgICAgZmxhdDogcHJvcHMuZmxhdCxcbiAgICAgICAgICByb3VuZGVkOiBwcm9wcy5yb3VuZGVkLFxuICAgICAgICAgIHB1c2g6IHByb3BzLnB1c2gsXG4gICAgICAgICAgc2l6ZTogcHJvcHMuc2l6ZSxcbiAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgdGV4dENvbG9yOiBwcm9wcy50ZXh0Q29sb3IsXG4gICAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICAgIHJpcHBsZTogcHJvcHMucmlwcGxlXG4gICAgICAgIH0sICgpID0+IEFycm93KVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0bi1kcm9wZG93blxuICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgbm8tY2Fwc1xuICAgIDpyaXBwbGU9XCIhbGlua1wiXG4gICAgOmNsYXNzPVwieyAnbm8tZm9jdXMnOiBsaW5rLCAnYmFzZS1idG4tZHJvcGRvd24nOiB0cnVlIH1cIlxuICAgIDpmbGF0PVwibGlua1wiXG4gICAgOmRlbnNlPVwibGlua1wiXG4gICAgc2l6ZT1cIjEzcHhcIlxuICA+XG4gICAgPHNsb3Q+PC9zbG90PlxuICA8L3EtYnRuLWRyb3Bkb3duPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBsaW5rOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNhc3NcIj5cbi5iYXNlLWJ0bi1kcm9wZG93biAucS1pY29uLCAuYmFzZS1idG4tZHJvcGRvd24gLnEtc3Bpbm5lclxuICBmb250LXNpemU6IDEuMjVlbVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2xvc2VQb3J0YWxzLCBnZXRQb3J0YWxWbSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvcG9ydGFsLmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG4vKlxuICogZGVwdGhcbiAqICAgPCAwICAtLT4gY2xvc2UgYWxsIGNoYWluXG4gKiAgIDAgICAgLS0+IGRpc2FibGVkXG4gKiAgID4gMCAgLS0+IGNsb3NlIGNoYWluIHVwIHRvIE4gcGFyZW50XG4gKi9cblxuZnVuY3Rpb24gZ2V0RGVwdGggKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIGNvbnN0IGRlcHRoID0gcGFyc2VJbnQodmFsdWUsIDEwKVxuICByZXR1cm4gaXNOYU4oZGVwdGgpID8gMCA6IGRlcHRoXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICdjbG9zZS1wb3B1cCcsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAnY2xvc2UtcG9wdXAnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUgfSkge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgZGVwdGg6IGdldERlcHRoKHZhbHVlKSxcblxuICAgICAgICAgIGhhbmRsZXIgKGV2dCkge1xuICAgICAgICAgICAgLy8gYWxsb3cgQGNsaWNrIHRvIGJlIGVtaXR0ZWRcbiAgICAgICAgICAgIGN0eC5kZXB0aCAhPT0gMCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgdm0gPSBnZXRQb3J0YWxWbShlbClcbiAgICAgICAgICAgICAgaWYgKHZtICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcnRhbHModm0sIGV2dCwgY3R4LmRlcHRoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBoYW5kbGVyS2V5IChldnQpIHtcbiAgICAgICAgICAgIGlzS2V5Q29kZShldnQsIDEzKSA9PT0gdHJ1ZSAmJiBjdHguaGFuZGxlcihldnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xY2xvc2Vwb3B1cCA9IGN0eFxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgeyB2YWx1ZSwgb2xkVmFsdWUgfSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgZWwuX19xY2xvc2Vwb3B1cC5kZXB0aCA9IGdldERlcHRoKHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICAgIGRlbGV0ZSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICB9XG4gICAgfVxuKVxuIiwiPHRlbXBsYXRlPlxuICA8cS1kaWFsb2dcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICAgIGNsYXNzPVwiYmFzZS1kaWFsb2dcIlxuICAgIHJlZj1cImRpYWxvZ1wiXG4gICAgQGhpZGU9XCJvbkRpYWxvZ0hpZGVcIlxuICA+XG4gICAgPHEtY2FyZCA6c3R5bGU9XCJjb250ZW50U3R5bGVcIiB2LWJpbmQ6Y2xhc3M9XCJjb250ZW50Q2xhc3NcIj5cbiAgICAgIDxzbG90PlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIiFoaWRlSGVhZGVyXCI+XG4gICAgICAgICAgPHNsb3QgbmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgICAgPHEtdG9vbGJhciBzdHlsZT1cInBhZGRpbmc6IDAgMjdweDsgbWluLWhlaWdodDogNjBweFwiIGNsYXNzPVwiYmctdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAgPHEtdG9vbGJhci10aXRsZSBjbGFzcz1cInRleHQtaDYgdGV4dC13ZWlnaHQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAge3sgdGl0bGUgfX1cbiAgICAgICAgICAgICAgPC9xLXRvb2xiYXItdGl0bGU+XG4gICAgICAgICAgICAgIDxxLWJ0biBmbGF0IHNpemU9XCIxMXB4XCIgcm91bmQgZGVuc2UgaWNvbj1cImZhbCBmYS10aW1lc1wiIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgICAgICAgIDwvcS10b29sYmFyPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIHYtc2hvdz1cInVzZVNlcGFyYXRvclwiIC8+XG4gICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gOnN0eWxlPVwiYm9keVN0eWxlXCIgdi1iaW5kOmNsYXNzPVwiYm9keUNsYXNzXCI+XG4gICAgICAgICAgPHNsb3QgbmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLXB5LXhsXCI+QmFzZSBkaWFsb2cgYm9keSBjb250ZW50LjwvZGl2PlxuICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCIhaGlkZUZvb3RlclwiPlxuICAgICAgICAgIDxxLXNlcGFyYXRvciB2LXNob3c9XCJ1c2VTZXBhcmF0b3JcIiAvPlxuICAgICAgICAgIDxzbG90IG5hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgICAgPHEtYnRuIG5vLWNhcHMgbGFiZWw9XCJEb25lXCIgY29sb3I9XCJwcmltYXJ5XCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8c2xvdCBuYW1lPVwibG9hZGluZ1wiPjwvc2xvdD5cbiAgICAgIDwvc2xvdD5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdCYXNlIGRpYWxvZyB0aXRsZScsXG4gICAgfSxcbiAgICBjb250ZW50U3R5bGU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgICBkZWZhdWx0OiAnd2lkdGg6IDgwMHB4OyBtYXgtd2lkdGg6IDk1dncnLFxuICAgIH0sXG4gICAgYm9keVN0eWxlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdLFxuICAgICAgZGVmYXVsdDogJ21heC1oZWlnaHQ6IDYwdmgnLFxuICAgIH0sXG4gICAgYm9keUNsYXNzOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIGNvbnRlbnRDbGFzczoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW1N0cmluZ10sXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgfSxcbiAgICBoaWRlRm9vdGVyOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIGhpZGVIZWFkZXI6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgdXNlU2VwYXJhdG9yOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICBlbWl0czogWydvaycsICdoaWRlJ10sXG4gIG1ldGhvZHM6IHtcbiAgICBzaG93KCkge1xuICAgICAgLy8gY29uc29sZS5mdW5jKCdjb21wb25lbnRzL2Jhc2UvYmFzZS1kaWFsb2c6bWV0aG9kcy5zaG93KCknLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kcmVmcy5kaWFsb2cuc2hvdygpO1xuICAgIH0sXG4gICAgaGlkZSgpIHtcbiAgICAgIC8vIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL2Jhc2UtZGlhbG9nOm1ldGhvZHMuY2xvc2UoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRyZWZzLmRpYWxvZy5oaWRlKCk7XG4gICAgfSxcbiAgICBvbkRpYWxvZ0hpZGUoKSB7XG4gICAgICAvLyBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9iYXNlLWRpYWxvZzptZXRob2RzLm9uRGlhbG9nSGlkZSgpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuJGVtaXQoJ2hpZGUnKTtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1mb3JtIGNsYXNzPVwiYmFzZS1mb3JtXCIgcmVmPVwiYmFzZUZvcm1cIj5cbiAgICA8cS1jYXJkXG4gICAgICBmbGF0XG4gICAgICA6c3F1YXJlPVwic3F1YXJlXCJcbiAgICAgIDpib3JkZXJlZD1cImJvcmRlcmVkXCJcbiAgICAgIDpjbGFzcz1cImBiZy10cmFuc3BhcmVudCAke2NvbnRlbnRDbGFzc31gXCJcbiAgICA+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLW5vbmUgZm9ybS1ib2R5XCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJmb3JtLWFjdGlvbnMgcS1wYS1ub25lIHEtbXQtbWRcIj5cbiAgICAgICAgPHNsb3QgbmFtZT1cImFjdGlvbnNcIj5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgIHYtaWY9XCJyZXNldGFibGUgJiYgIXN1Ym1pdGVkXCJcbiAgICAgICAgICAgIEBjbGljaz1cIm9uUmVzZXRcIlxuICAgICAgICAgICAgbGFiZWw9XCJSZXNldFwiXG4gICAgICAgICAgICBjb2xvcj1cImdyZXlcIlxuICAgICAgICAgICAgY2xhc3M9XCJxLW1yLXNtXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgOmRpc2FibGU9XCJzdWJtaXRlZFwiXG4gICAgICAgICAgICBuby1jYXBzXG4gICAgICAgICAgICB2LWlmPVwiY2FuY2VsYWJsZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJvbkNhbmNlbFwiXG4gICAgICAgICAgICBsYWJlbD1cIkNhbmNlbFwiXG4gICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIDpkaXNhYmxlPVwiZGlzYWJsZVwiXG4gICAgICAgICAgICA6bG9hZGluZz1cInN1Ym1pdGVkXCJcbiAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgIHYtc2hvdz1cInN1Ym1pdFwiXG4gICAgICAgICAgICBsYWJlbD1cIlNhdmVcIlxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc2xvdD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1mb3JtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBzdWJtaXRlZDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgcmVzZXRhYmxlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICBkaXNhYmxlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICBjYW5jZWxhYmxlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHNxdWFyZToge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgYm9yZGVyZWQ6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIHN1Ym1pdDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICBjb250ZW50Q2xhc3M6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFwiXCIsXG4gICAgfSxcbiAgfSxcbiAgZW1pdHM6IFtcImNhbmNlbFwiLCBcInJlc2V0XCJdLFxuICBtZXRob2RzOiB7XG4gICAgb25DYW5jZWwoKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoXCJjb21wb25lbnRzL2Jhc2UvYmFzZS1mb3JtOm1ldGhvZHMub25DYW5jZWwoKVwiLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kZW1pdChcImNhbmNlbFwiKTtcbiAgICB9LFxuICAgIG9uUmVzZXQoKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoXCJjb21wb25lbnRzL2Jhc2UvYmFzZS1mb3JtOm1ldGhvZHMub25SZXNldCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRjb3JlXG4gICAgICAgIC5jb25maXJtKFxuICAgICAgICAgIFwiSWYgeW91IGRpc2NhcmQgY2hhbmdlcywgeW914oCZbGwgZGVsZXRlIGFueSBlZGl0cyB5b3UgbWFkZSBzaW5jZSB5b3UgbGFzdCBzYXZlZC5cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogXCJEaXNjYXJkIGFsbCB1bnNhdmVkIGNoYW5nZXM/XCIsXG4gICAgICAgICAgICBvazogXCJEaXNjYXJkIGNoYW5nZXNcIixcbiAgICAgICAgICAgIGNhbmNlbDogXCJDb250aW51ZSBlZGl0aW5nXCIsXG4gICAgICAgICAgICBva0NvbG9yOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoXCJhcHAvc2V0RGlydFwiLCBmYWxzZSk7XG4gICAgICAgICAgdGhpcy4kZW1pdChcInJlc2V0XCIpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGFkZEhhbmRsZXIoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImZvcm06ZGlzY2FyZFwiLCB0aGlzLm9uRGlzY2FyZCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImZvcm06c2F2ZVwiLCB0aGlzLm9uU2F2ZSk7XG4gICAgfSxcbiAgICByZW1vdmVIYW5kbGVyKCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb3JtOmRpc2NhcmRcIiwgdGhpcy5vbkRpc2NhcmQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb3JtOnNhdmVcIiwgdGhpcy5vblNhdmUpO1xuICAgIH0sXG4gICAgb25EaXNjYXJkKCkge1xuICAgICAgY29uc29sZS5mdW5jKFwiY29tcG9uZW50cy9iYXNlL2Jhc2UtZm9ybTptZXRob2RzLm9uRGlzY2FyZCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLm9uUmVzZXQoKTtcbiAgICB9LFxuICAgIG9uU2F2ZSgpIHtcbiAgICAgIGNvbnNvbGUuZnVuYyhcImNvbXBvbmVudHMvYmFzZS9iYXNlLWZvcm06bWV0aG9kcy5vblNhdmUoKVwiLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kcmVmcy5iYXNlRm9ybS5zdWJtaXQoKTtcbiAgICB9LFxuICB9LFxuICB3YXRjaDoge1xuICAgIHJlc2V0YWJsZSh2YWwpIHtcbiAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChcImFwcC9zZXREaXJ0XCIsIHZhbCk7XG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLmFkZEhhbmRsZXIoKTtcbiAgfSxcbiAgYmVmb3JlVW5tb3VudCgpIHtcbiAgICB0aGlzLnJlbW92ZUhhbmRsZXIoKTtcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCYW5uZXInLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgaW5saW5lQWN0aW9uczogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJhbm5lciByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtYmFubmVyLS1kZW5zZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1iYW5uZXItLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcm91bmRlZC1ib3JkZXJzJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGFjdGlvbkNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJhbm5lcl9fYWN0aW9ucyByb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kJ1xuICAgICAgKyBgIGNvbC0keyBwcm9wcy5pbmxpbmVBY3Rpb25zID09PSB0cnVlID8gJ2F1dG8nIDogJ2FsbCcgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYmFubmVyX19hdmF0YXIgY29sLWF1dG8gcm93IGl0ZW1zLWNlbnRlciBzZWxmLXN0YXJ0J1xuICAgICAgICB9LCBoU2xvdChzbG90cy5hdmF0YXIpKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWJhbm5lcl9fY29udGVudCBjb2wgdGV4dC1ib2R5MidcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICBdXG5cbiAgICAgIGNvbnN0IGFjdGlvbnMgPSBoU2xvdChzbG90cy5hY3Rpb24pXG4gICAgICBhY3Rpb25zICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogYWN0aW9uQ2xhc3MudmFsdWUgfSwgYWN0aW9ucylcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICAgICAgICArIChwcm9wcy5pbmxpbmVBY3Rpb25zID09PSBmYWxzZSAmJiBhY3Rpb25zICE9PSB2b2lkIDAgPyAnIHEtYmFubmVyLS10b3AtcGFkZGluZycgOiAnJyksXG4gICAgICAgIHJvbGU6ICdhbGVydCdcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtaW5wdXRcbiAgICA6ZGVuc2U9XCJkZW5zZVwiXG4gICAgOmJnLWNvbG9yPVwiYmdDb2xvclwiXG4gICAgOm91dGxpbmVkPVwib3V0bGluZWRcIlxuICAgIDptb2RlbFZhbHVlPVwibW9kZWxWYWx1ZVwiXG4gICAgOnR5cGU9XCJ0eXBlXCJcbiAgICA6bGFiZWw9XCJsYWJlbFwiXG4gICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIm9uQ2hhbmdlXCJcbiAgLz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgbW9kZWxWYWx1ZToge30sXG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgYmdDb2xvcjogU3RyaW5nLFxuICAgIGRlbnNlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICB9LFxuICAgIG91dGxpbmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25DaGFuZ2UodmFsdWUpIHtcbiAgICAgIGNvbnNvbGUuZnVuYyhcImNvbXBvbmVudHMvYmFzZS9CYXNlSW5wdXQ6bWV0aG9kcy5vbkNoYW5nZVwiLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbC12YWx1ZVwiLCB2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtaXRlbVxuICAgIGNsaWNrYWJsZVxuICAgIHYtY2xvc2UtcG9wdXBcbiAgICA6Y2xhc3M9XCJ7XG4gICAgICAnYmFzZS1pdGVtIHRleHQtd2VpZ2h0LW1lZGl1bSByb3VuZGVkLWJvcmRlcnMnOiB0cnVlLFxuICAgICAgbGluazogbGluayxcbiAgICB9XCJcbiAgPlxuICAgIDxzbG90PlxuICAgICAgPHEtaXRlbS1zZWN0aW9uIHYtaWY9XCJpY29uXCIgc3R5bGU9XCJtaW4td2lkdGg6IGF1dG9cIiBhdmF0YXI+XG4gICAgICAgIDxxLWljb24gOmNvbG9yPVwiaWNvbkNvbG9yXCIgc2l6ZT1cIjE4cHhcIiA6bmFtZT1cImljb25cIiAvPlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgIDxxLWl0ZW0tc2VjdGlvbj57eyBsYWJlbCB9fTwvcS1pdGVtLXNlY3Rpb24+XG4gICAgPC9zbG90PlxuICA8L3EtaXRlbT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBpY29uOiBTdHJpbmcsXG4gICAgaWNvbkNvbG9yOiBTdHJpbmcsXG4gICAgbGluazogQm9vbGVhbixcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImJhc2UtbGFiZWwgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1sYWJlbFwiPlxuICAgICAgPHNsb3Q+e3sgdGl0bGUgfX08L3Nsb3Q+XG4gICAgICA8c3BhbiB2LWlmPVwicmVxdWlyZWRcIiBjbGFzcz1cInEtbWwteHNcIj4qPC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgdGl0bGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogQm9vbGVhbixcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtY2FyZFxuICAgIDpkYXJrPVwiZGFya1wiXG4gICAgOnNxdWFyZT1cInNxdWFyZVwiXG4gICAgOmZsYXQ9XCJmbGF0XCJcbiAgICA6Ym9yZGVyZWQ9XCJib3JkZXJlZFwiXG4gICAgdi1iaW5kOmNsYXNzPVwiYCR7Y29udGVudENsYXNzfWBcIlxuICA+XG4gICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wYi14c1wiIHYtaWY9XCJoYXNUb3BcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmbGV4XCI+XG4gICAgICAgIDxkaXYgdi1pZj1cInRpdGxlXCIgY2xhc3M9XCJ0ZXh0LWg2XCI+e3sgdGl0bGUgfX08L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHNsb3QgbmFtZT1cImFjdGlvblwiPjwvc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHEtaXRlbS1sYWJlbCB2LWlmPVwiZGVzY3JpcHRpb25cIj57eyBkZXNjcmlwdGlvbiB9fTwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPHEtY2FyZC1zZWN0aW9uIHYtYmluZDpjbGFzcz1cImdldEJvZHlDbGFzc1wiPlxuICAgICAgPHRlbXBsYXRlIHYtaWY9XCIhbm9Sb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbGdcIj5cbiAgICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8dGVtcGxhdGUgdi1pZj1cImhhc0JvdHRvbVwiPlxuICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxzbG90IG5hbWU9XCJib3R0b21cIj48L3Nsb3Q+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBkYXJrOiBCb29sZWFuLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGhhc0JvdHRvbTogQm9vbGVhbixcbiAgICBjb250ZW50Q2xhc3M6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IFwiYmFzZS1zZWN0aW9uXCIsXG4gICAgfSxcbiAgICBib2R5Q2xhc3M6IFN0cmluZyxcbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcsXG4gICAgbm9Sb3c6IEJvb2xlYW4sXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaGFzVG9wKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGl0bGUgPyB0cnVlIDogdGhpcy5kZXNjcmlwdGlvbiA/IHRydWUgOiBmYWxzZTtcbiAgICB9LFxuICAgIGdldEJvZHlDbGFzcygpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmJvZHlDbGFzc30gJHt0aGlzLmhhc1RvcCA/IFwicS1wdC1ub25lXCIgOiBcIlwifWA7XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsImltcG9ydCB1c2VGaWVsZCwgeyB1c2VGaWVsZFN0YXRlLCB1c2VGaWVsZFByb3BzLCB1c2VGaWVsZEVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZpZWxkJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB1c2VGaWVsZFByb3BzLFxuXG4gIGVtaXRzOiB1c2VGaWVsZEVtaXRzLFxuXG4gIHNldHVwICgpIHtcbiAgICByZXR1cm4gdXNlRmllbGQodXNlRmllbGRTdGF0ZSgpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9SaXBwbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90U2FmZWx5LCBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoaXAnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25SaWdodDogU3RyaW5nLFxuICAgIGljb25SZW1vdmU6IFN0cmluZyxcbiAgICBpY29uU2VsZWN0ZWQ6IFN0cmluZyxcbiAgICBsYWJlbDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIHJlbW92YWJsZTogQm9vbGVhbixcblxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGlzYWJsZTogQm9vbGVhbixcblxuICAgIHJpcHBsZToge1xuICAgICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ3VwZGF0ZTpzZWxlY3RlZCcsICdyZW1vdmUnLCAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBkZWZhdWx0U2l6ZXMpXG5cbiAgICBjb25zdCBoYXNMZWZ0SWNvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnNlbGVjdGVkID09PSB0cnVlIHx8IHByb3BzLmljb24gIT09IHZvaWQgMClcblxuICAgIGNvbnN0IGxlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2VsZWN0ZWQgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5pY29uU2VsZWN0ZWQgfHwgJHEuaWNvblNldC5jaGlwLnNlbGVjdGVkXG4gICAgICAgIDogcHJvcHMuaWNvblxuICAgICkpXG5cbiAgICBjb25zdCByZW1vdmVJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuaWNvblJlbW92ZSB8fCAkcS5pY29uU2V0LmNoaXAucmVtb3ZlKVxuXG4gICAgY29uc3QgaXNDbGlja2FibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gZmFsc2VcbiAgICAgICYmIChwcm9wcy5jbGlja2FibGUgPT09IHRydWUgfHwgcHJvcHMuc2VsZWN0ZWQgIT09IG51bGwpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBwcm9wcy5vdXRsaW5lID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuY29sb3IgfHwgcHJvcHMudGV4dENvbG9yXG4gICAgICAgIDogcHJvcHMudGV4dENvbG9yXG5cbiAgICAgIHJldHVybiAncS1jaGlwIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IGZhbHNlICYmIHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICsgKHRleHQgPyBgIHRleHQtJHsgdGV4dCB9IHEtY2hpcC0tY29sb3JlZGAgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWNoaXAtLWRlbnNlJyA6ICcnKVxuICAgICAgICArIChwcm9wcy5vdXRsaW5lID09PSB0cnVlID8gJyBxLWNoaXAtLW91dGxpbmUnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNlbGVjdGVkID09PSB0cnVlID8gJyBxLWNoaXAtLXNlbGVjdGVkJyA6ICcnKVxuICAgICAgICArIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1jbGlja2FibGUgY3Vyc29yLXBvaW50ZXIgbm9uLXNlbGVjdGFibGUgcS1ob3ZlcmFibGUnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1zcXVhcmUnIDogJycpXG4gICAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jaGlwLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICB9KVxuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7IHRhYmluZGV4OiAtMSwgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHsgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4IHx8IDAgfVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzIC8qIEVOVEVSICovICYmIG9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoIXByb3BzLmRpc2FibGUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgIXByb3BzLnNlbGVjdGVkKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZW1vdmUgKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IHZvaWQgMCB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInIH0pXG4gICAgICApXG5cbiAgICAgIGhhc0xlZnRJY29uLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLWxlZnQnLFxuICAgICAgICAgIG5hbWU6IGxlZnRJY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IFsgaCgnZGl2JywgeyBjbGFzczogJ2VsbGlwc2lzJyB9LCBbIHByb3BzLmxhYmVsIF0pIF1cbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19jb250ZW50IGNvbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgbGFiZWwpKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5pY29uUmlnaHQgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmlnaHQnLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5yZW1vdmFibGUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmVtb3ZlIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICBuYW1lOiByZW1vdmVJY29uLnZhbHVlLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgb25DbGljazogb25SZW1vdmUsXG4gICAgICAgICAgb25LZXl1cDogb25SZW1vdmVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICBkYXRhLFxuICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICB7IG9uQ2xpY2ssIG9uS2V5dXAgfVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdldENvbnRlbnQoKSxcbiAgICAgICAgJ3JpcHBsZScsXG4gICAgICAgIHByb3BzLnJpcHBsZSAhPT0gZmFsc2UgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSxcbiAgICAgICAgKCkgPT4gWyBbIFJpcHBsZSwgcHJvcHMucmlwcGxlIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImxldCBydGxIYXNTY3JvbGxCdWcgPSBmYWxzZVxuXG4vLyBtb2JpbGUgQ2hyb21lIHRha2VzIHRoZSBjcm93biBmb3IgdGhpc1xuaWYgKCFfX1FVQVNBUl9TU1JfXykge1xuICBjb25zdCBzY3JvbGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnN0IHNwYWNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgc2Nyb2xsZXIuc2V0QXR0cmlidXRlKCdkaXInLCAncnRsJylcbiAgc2Nyb2xsZXIuc3R5bGUud2lkdGggPSAnMXB4J1xuICBzY3JvbGxlci5zdHlsZS5oZWlnaHQgPSAnMXB4J1xuICBzY3JvbGxlci5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJ1xuXG4gIHNwYWNlci5zdHlsZS53aWR0aCA9ICcxMDAwcHgnXG4gIHNwYWNlci5zdHlsZS5oZWlnaHQgPSAnMXB4J1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsZXIpXG4gIHNjcm9sbGVyLmFwcGVuZENoaWxkKHNwYWNlcilcbiAgc2Nyb2xsZXIuc2Nyb2xsTGVmdCA9IC0xMDAwXG5cbiAgcnRsSGFzU2Nyb2xsQnVnID0gc2Nyb2xsZXIuc2Nyb2xsTGVmdCA+PSAwXG5cbiAgc2Nyb2xsZXIucmVtb3ZlKClcbn1cblxuZXhwb3J0IHtcbiAgcnRsSGFzU2Nyb2xsQnVnXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlTW91bnQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uLy4uL3V0aWxzL2RlYm91bmNlLmpzJ1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgcnRsSGFzU2Nyb2xsQnVnIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9ydGwuanMnXG5cbmNvbnN0IGFnZ0J1Y2tldFNpemUgPSAxMDAwXG5cbmNvbnN0IHNjcm9sbFRvRWRnZXMgPSBbXG4gICdzdGFydCcsXG4gICdjZW50ZXInLFxuICAnZW5kJyxcbiAgJ3N0YXJ0LWZvcmNlJyxcbiAgJ2NlbnRlci1mb3JjZScsXG4gICdlbmQtZm9yY2UnXG5dXG5cbmNvbnN0IGZpbHRlclByb3RvID0gQXJyYXkucHJvdG90eXBlLmZpbHRlclxuXG5jb25zdCBzZXRPdmVyZmxvd0FuY2hvciA9IF9fUVVBU0FSX1NTUl9fIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLm92ZXJmbG93QW5jaG9yID09PSB2b2lkIDBcbiAgPyBub29wXG4gIDogZnVuY3Rpb24gKGNvbnRlbnRFbCwgaW5kZXgpIHtcbiAgICBpZiAoY29udGVudEVsID09PSBudWxsKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShjb250ZW50RWwuX3FPdmVyZmxvd0FuaW1hdGlvbkZyYW1lKVxuICAgIGNvbnRlbnRFbC5fcU92ZXJmbG93QW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKGNvbnRlbnRFbCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGRyZW4gPSBjb250ZW50RWwuY2hpbGRyZW4gfHwgW11cblxuICAgICAgZmlsdGVyUHJvdG9cbiAgICAgICAgLmNhbGwoY2hpbGRyZW4sIGVsID0+IGVsLmRhdGFzZXQgJiYgZWwuZGF0YXNldC5xVnNBbmNob3IgIT09IHZvaWQgMClcbiAgICAgICAgLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGRlbGV0ZSBlbC5kYXRhc2V0LnFWc0FuY2hvclxuICAgICAgICB9KVxuXG4gICAgICBjb25zdCBlbCA9IGNoaWxkcmVuWyBpbmRleCBdXG5cbiAgICAgIGlmIChlbCAmJiBlbC5kYXRhc2V0KSB7XG4gICAgICAgIGVsLmRhdGFzZXQucVZzQW5jaG9yID0gJydcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbmZ1bmN0aW9uIHN1bUZuIChhY2MsIGgpIHtcbiAgcmV0dXJuIGFjYyArIGhcbn1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsRGV0YWlscyAoXG4gIHBhcmVudCxcbiAgY2hpbGQsXG4gIGJlZm9yZVJlZixcbiAgYWZ0ZXJSZWYsXG4gIGhvcml6b250YWwsXG4gIHJ0bCxcbiAgc3RpY2t5U3RhcnQsXG4gIHN0aWNreUVuZFxuKSB7XG4gIGNvbnN0XG4gICAgcGFyZW50Q2FsYyA9IHBhcmVudCA9PT0gd2luZG93ID8gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBwYXJlbnQsXG4gICAgcHJvcEVsU2l6ZSA9IGhvcml6b250YWwgPT09IHRydWUgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCcsXG4gICAgZGV0YWlscyA9IHtcbiAgICAgIHNjcm9sbFN0YXJ0OiAwLFxuICAgICAgc2Nyb2xsVmlld1NpemU6IC1zdGlja3lTdGFydCAtIHN0aWNreUVuZCxcbiAgICAgIHNjcm9sbE1heFNpemU6IDAsXG4gICAgICBvZmZzZXRTdGFydDogLXN0aWNreVN0YXJ0LFxuICAgICAgb2Zmc2V0RW5kOiAtc3RpY2t5RW5kXG4gICAgfVxuXG4gIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgaWYgKHBhcmVudCA9PT0gd2luZG93KSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwXG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSBwYXJlbnRDYWxjLnNjcm9sbExlZnRcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gcGFyZW50Q2FsYy5jbGllbnRXaWR0aFxuICAgIH1cbiAgICBkZXRhaWxzLnNjcm9sbE1heFNpemUgPSBwYXJlbnRDYWxjLnNjcm9sbFdpZHRoXG5cbiAgICBpZiAocnRsID09PSB0cnVlKSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gKHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gdHJ1ZSA/IGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSAtIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgOiAwKSAtIGRldGFpbHMuc2Nyb2xsU3RhcnRcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHBhcmVudCA9PT0gd2luZG93KSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDBcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSBwYXJlbnRDYWxjLnNjcm9sbFRvcFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBwYXJlbnRDYWxjLmNsaWVudEhlaWdodFxuICAgIH1cbiAgICBkZXRhaWxzLnNjcm9sbE1heFNpemUgPSBwYXJlbnRDYWxjLnNjcm9sbEhlaWdodFxuICB9XG5cbiAgaWYgKGJlZm9yZVJlZiAhPT0gbnVsbCkge1xuICAgIGZvciAobGV0IGVsID0gYmVmb3JlUmVmLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IGVsICE9PSBudWxsOyBlbCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXNraXAnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBlbFsgcHJvcEVsU2l6ZSBdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGFmdGVyUmVmICE9PSBudWxsKSB7XG4gICAgZm9yIChsZXQgZWwgPSBhZnRlclJlZi5uZXh0RWxlbWVudFNpYmxpbmc7IGVsICE9PSBudWxsOyBlbCA9IGVsLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZSkge1xuICAgICAgICBkZXRhaWxzLm9mZnNldEVuZCArPSBlbFsgcHJvcEVsU2l6ZSBdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNoaWxkICE9PSBwYXJlbnQpIHtcbiAgICBjb25zdFxuICAgICAgcGFyZW50UmVjdCA9IHBhcmVudENhbGMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBjaGlsZFJlY3QgPSBjaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gY2hpbGRSZWN0LmxlZnQgLSBwYXJlbnRSZWN0LmxlZnRcbiAgICAgIGRldGFpbHMub2Zmc2V0RW5kIC09IGNoaWxkUmVjdC53aWR0aFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gY2hpbGRSZWN0LnRvcCAtIHBhcmVudFJlY3QudG9wXG4gICAgICBkZXRhaWxzLm9mZnNldEVuZCAtPSBjaGlsZFJlY3QuaGVpZ2h0XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudCAhPT0gd2luZG93KSB7XG4gICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGRldGFpbHMuc2Nyb2xsU3RhcnRcbiAgICB9XG4gICAgZGV0YWlscy5vZmZzZXRFbmQgKz0gZGV0YWlscy5zY3JvbGxNYXhTaXplIC0gZGV0YWlscy5vZmZzZXRTdGFydFxuICB9XG5cbiAgcmV0dXJuIGRldGFpbHNcbn1cblxuZnVuY3Rpb24gc2V0U2Nyb2xsIChwYXJlbnQsIHNjcm9sbCwgaG9yaXpvbnRhbCwgcnRsKSB7XG4gIGlmIChzY3JvbGwgPT09ICdlbmQnKSB7XG4gICAgc2Nyb2xsID0gKHBhcmVudCA9PT0gd2luZG93ID8gZG9jdW1lbnQuYm9keSA6IHBhcmVudClbXG4gICAgICBob3Jpem9udGFsID09PSB0cnVlID8gJ3Njcm9sbFdpZHRoJyA6ICdzY3JvbGxIZWlnaHQnXG4gICAgXVxuICB9XG5cbiAgaWYgKHBhcmVudCA9PT0gd2luZG93KSB7XG4gICAgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChydGwgPT09IHRydWUpIHtcbiAgICAgICAgc2Nyb2xsID0gKHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gdHJ1ZSA/IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGggLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiAwKSAtIHNjcm9sbFxuICAgICAgfVxuICAgICAgd2luZG93LnNjcm9sbFRvKHNjcm9sbCwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgc2Nyb2xsKVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgaWYgKHJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgc2Nyb2xsID0gKHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gdHJ1ZSA/IHBhcmVudC5zY3JvbGxXaWR0aCAtIHBhcmVudC5vZmZzZXRXaWR0aCA6IDApIC0gc2Nyb2xsXG4gICAgfVxuICAgIHBhcmVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsXG4gIH1cbiAgZWxzZSB7XG4gICAgcGFyZW50LnNjcm9sbFRvcCA9IHNjcm9sbFxuICB9XG59XG5cbmZ1bmN0aW9uIHN1bVNpemUgKHNpemVBZ2csIHNpemUsIGZyb20sIHRvKSB7XG4gIGlmIChmcm9tID49IHRvKSB7IHJldHVybiAwIH1cblxuICBjb25zdFxuICAgIGxhc3RUbyA9IHNpemUubGVuZ3RoLFxuICAgIGZyb21BZ2cgPSBNYXRoLmZsb29yKGZyb20gLyBhZ2dCdWNrZXRTaXplKSxcbiAgICB0b0FnZyA9IE1hdGguZmxvb3IoKHRvIC0gMSkgLyBhZ2dCdWNrZXRTaXplKSArIDFcblxuICBsZXQgdG90YWwgPSBzaXplQWdnLnNsaWNlKGZyb21BZ2csIHRvQWdnKS5yZWR1Y2Uoc3VtRm4sIDApXG5cbiAgaWYgKGZyb20gJSBhZ2dCdWNrZXRTaXplICE9PSAwKSB7XG4gICAgdG90YWwgLT0gc2l6ZS5zbGljZShmcm9tQWdnICogYWdnQnVja2V0U2l6ZSwgZnJvbSkucmVkdWNlKHN1bUZuLCAwKVxuICB9XG4gIGlmICh0byAlIGFnZ0J1Y2tldFNpemUgIT09IDAgJiYgdG8gIT09IGxhc3RUbykge1xuICAgIHRvdGFsIC09IHNpemUuc2xpY2UodG8sIHRvQWdnICogYWdnQnVja2V0U2l6ZSkucmVkdWNlKHN1bUZuLCAwKVxuICB9XG5cbiAgcmV0dXJuIHRvdGFsXG59XG5cbmNvbnN0IGNvbW1vblZpcnRTY3JvbGxQcm9wcyA9IHtcbiAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmU6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMVxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQWZ0ZXI6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMVxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAyNFxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxTdGlja3lTaXplU3RhcnQ6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMFxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxTdGlja3lTaXplRW5kOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcblxuICB0YWJsZUNvbHNwYW46IFsgTnVtYmVyLCBTdHJpbmcgXVxufVxuXG5leHBvcnQgY29uc3QgY29tbW9uVmlydFByb3BzTGlzdCA9IE9iamVjdC5rZXlzKGNvbW1vblZpcnRTY3JvbGxQcm9wcylcblxuZXhwb3J0IGNvbnN0IHVzZVZpcnR1YWxTY3JvbGxQcm9wcyA9IHtcbiAgdmlydHVhbFNjcm9sbEhvcml6b250YWw6IEJvb2xlYW4sXG4gIG9uVmlydHVhbFNjcm9sbDogRnVuY3Rpb24sXG4gIC4uLmNvbW1vblZpcnRTY3JvbGxQcm9wc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVmlydHVhbFNjcm9sbCAoe1xuICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0LCBnZXRWaXJ0dWFsU2Nyb2xsRWwsXG4gIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkIC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gdm1cbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBsZXQgcHJldlNjcm9sbFN0YXJ0LCBwcmV2VG9JbmRleCwgbG9jYWxTY3JvbGxWaWV3U2l6ZSwgdmlydHVhbFNjcm9sbFNpemVzQWdnID0gW10sIHZpcnR1YWxTY3JvbGxTaXplc1xuXG4gIGNvbnN0IHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlID0gcmVmKDApXG4gIGNvbnN0IHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIgPSByZWYoMClcbiAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkID0gcmVmKHt9KVxuXG4gIGNvbnN0IGJlZm9yZVJlZiA9IHJlZihudWxsKVxuICBjb25zdCBhZnRlclJlZiA9IHJlZihudWxsKVxuICBjb25zdCBjb250ZW50UmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UgPSByZWYoeyBmcm9tOiAwLCB0bzogMCB9KVxuXG4gIGNvbnN0IGNvbHNwYW5BdHRyID0gY29tcHV0ZWQoKCkgPT4gKHByb3BzLnRhYmxlQ29sc3BhbiAhPT0gdm9pZCAwID8gcHJvcHMudGFibGVDb2xzcGFuIDogMTAwKSlcblxuICBpZiAodmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgPT09IHZvaWQgMCkge1xuICAgIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplKVxuICB9XG5cbiAgY29uc3QgbmVlZHNSZXNldCA9IGNvbXB1dGVkKCgpID0+IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlICsgJzsnICsgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwpXG5cbiAgY29uc3QgbmVlZHNTbGljZVJlY2FsYyA9IGNvbXB1dGVkKCgpID0+XG4gICAgbmVlZHNSZXNldC52YWx1ZSArICc7JyArIHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlICsgJzsnICsgcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlclxuICApXG5cbiAgd2F0Y2gobmVlZHNTbGljZVJlY2FsYywgKCkgPT4geyBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpIH0pXG4gIHdhdGNoKG5lZWRzUmVzZXQsIHJlc2V0KVxuXG4gIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbChwcmV2VG9JbmRleCwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2ggKHRvSW5kZXgpIHtcbiAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCh0b0luZGV4ID09PSB2b2lkIDAgPyBwcmV2VG9JbmRleCA6IHRvSW5kZXgpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxUbyAodG9JbmRleCwgZWRnZSkge1xuICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICBpZiAoc2Nyb2xsRWwgPT09IHZvaWQgMCB8fCBzY3JvbGxFbCA9PT0gbnVsbCB8fCBzY3JvbGxFbC5ub2RlVHlwZSA9PT0gOCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc2Nyb2xsRGV0YWlscyA9IGdldFNjcm9sbERldGFpbHMoXG4gICAgICBzY3JvbGxFbCxcbiAgICAgIGdldFZpcnR1YWxTY3JvbGxFbCgpLFxuICAgICAgYmVmb3JlUmVmLnZhbHVlLFxuICAgICAgYWZ0ZXJSZWYudmFsdWUsXG4gICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCxcbiAgICAgICRxLmxhbmcucnRsLFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydCxcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplRW5kXG4gICAgKVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSAhPT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAmJiBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZShzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKVxuXG4gICAgc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UoXG4gICAgICBzY3JvbGxFbCxcbiAgICAgIHNjcm9sbERldGFpbHMsXG4gICAgICBNYXRoLm1pbih2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMSwgTWF0aC5tYXgoMCwgcGFyc2VJbnQodG9JbmRleCwgMTApIHx8IDApKSxcbiAgICAgIDAsXG4gICAgICBzY3JvbGxUb0VkZ2VzLmluZGV4T2YoZWRnZSkgPiAtMSA/IGVkZ2UgOiAocHJldlRvSW5kZXggPiAtMSAmJiB0b0luZGV4ID4gcHJldlRvSW5kZXggPyAnZW5kJyA6ICdzdGFydCcpXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxPblZpcnR1YWxTY3JvbGxFdnQgKCkge1xuICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICBpZiAoc2Nyb2xsRWwgPT09IHZvaWQgMCB8fCBzY3JvbGxFbCA9PT0gbnVsbCB8fCBzY3JvbGxFbC5ub2RlVHlwZSA9PT0gOCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIHNjcm9sbERldGFpbHMgPSBnZXRTY3JvbGxEZXRhaWxzKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICAgIGJlZm9yZVJlZi52YWx1ZSxcbiAgICAgICAgYWZ0ZXJSZWYudmFsdWUsXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICAgICksXG4gICAgICBsaXN0TGFzdEluZGV4ID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSAtIDEsXG4gICAgICBsaXN0RW5kT2Zmc2V0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRTdGFydCAtIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kIC0gdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZVxuXG4gICAgaWYgKHByZXZTY3JvbGxTdGFydCA9PT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbERldGFpbHMuc2Nyb2xsTWF4U2l6ZSA8PSAwKSB7XG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShzY3JvbGxFbCwgc2Nyb2xsRGV0YWlscywgMCwgMClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxvY2FsU2Nyb2xsVmlld1NpemUgIT09IHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgJiYgc2V0VmlydHVhbFNjcm9sbFNpemUoc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSlcblxuICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyh2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tKVxuXG4gICAgY29uc3Qgc2Nyb2xsTWF4U3RhcnQgPSBNYXRoLmZsb29yKHNjcm9sbERldGFpbHMuc2Nyb2xsTWF4U2l6ZVxuICAgICAgLSBNYXRoLm1heChzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplLCBzY3JvbGxEZXRhaWxzLm9mZnNldEVuZClcbiAgICAgIC0gTWF0aC5taW4odmlydHVhbFNjcm9sbFNpemVzWyBsaXN0TGFzdEluZGV4IF0sIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgLyAyKSlcblxuICAgIGlmIChzY3JvbGxNYXhTdGFydCA+IDAgJiYgTWF0aC5jZWlsKHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQpID49IHNjcm9sbE1heFN0YXJ0KSB7XG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShcbiAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgIHNjcm9sbERldGFpbHMsXG4gICAgICAgIGxpc3RMYXN0SW5kZXgsXG4gICAgICAgIHNjcm9sbERldGFpbHMuc2Nyb2xsTWF4U2l6ZSAtIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kIC0gdmlydHVhbFNjcm9sbFNpemVzQWdnLnJlZHVjZShzdW1GbiwgMClcbiAgICAgIClcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0XG4gICAgICB0b0luZGV4ID0gMCxcbiAgICAgIGxpc3RPZmZzZXQgPSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0IC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRTdGFydCxcbiAgICAgIG9mZnNldCA9IGxpc3RPZmZzZXRcblxuICAgIGlmIChsaXN0T2Zmc2V0IDw9IGxpc3RFbmRPZmZzZXQgJiYgbGlzdE9mZnNldCArIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgPj0gdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUpIHtcbiAgICAgIGxpc3RPZmZzZXQgLT0gdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWVcbiAgICAgIHRvSW5kZXggPSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tXG4gICAgICBvZmZzZXQgPSBsaXN0T2Zmc2V0XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGxpc3RPZmZzZXQgPj0gdmlydHVhbFNjcm9sbFNpemVzQWdnWyBqIF0gJiYgdG9JbmRleCA8IGxpc3RMYXN0SW5kZXg7IGorKykge1xuICAgICAgICBsaXN0T2Zmc2V0IC09IHZpcnR1YWxTY3JvbGxTaXplc0FnZ1sgaiBdXG4gICAgICAgIHRvSW5kZXggKz0gYWdnQnVja2V0U2l6ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlIChsaXN0T2Zmc2V0ID4gMCAmJiB0b0luZGV4IDwgbGlzdExhc3RJbmRleCkge1xuICAgICAgbGlzdE9mZnNldCAtPSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIHRvSW5kZXggXVxuICAgICAgaWYgKGxpc3RPZmZzZXQgPiAtc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSkge1xuICAgICAgICB0b0luZGV4KytcbiAgICAgICAgb2Zmc2V0ID0gbGlzdE9mZnNldFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG9mZnNldCA9IHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdICsgbGlzdE9mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKFxuICAgICAgc2Nyb2xsRWwsXG4gICAgICBzY3JvbGxEZXRhaWxzLFxuICAgICAgdG9JbmRleCxcbiAgICAgIG9mZnNldFxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlIChzY3JvbGxFbCwgc2Nyb2xsRGV0YWlscywgdG9JbmRleCwgb2Zmc2V0LCBhbGlnbikge1xuICAgIGNvbnN0IGFsaWduRm9yY2UgPSB0eXBlb2YgYWxpZ24gPT09ICdzdHJpbmcnICYmIGFsaWduLmluZGV4T2YoJy1mb3JjZScpID4gLTFcbiAgICBjb25zdCBhbGlnbkVuZCA9IGFsaWduRm9yY2UgPT09IHRydWUgPyBhbGlnbi5yZXBsYWNlKCctZm9yY2UnLCAnJykgOiBhbGlnblxuICAgIGNvbnN0IGFsaWduUmFuZ2UgPSBhbGlnbkVuZCAhPT0gdm9pZCAwID8gYWxpZ25FbmQgOiAnc3RhcnQnXG5cbiAgICBsZXRcbiAgICAgIGZyb20gPSBNYXRoLm1heCgwLCB0b0luZGV4IC0gdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlWyBhbGlnblJhbmdlIF0pLFxuICAgICAgdG8gPSBmcm9tICsgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlLnRvdGFsXG5cbiAgICBpZiAodG8gPiB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKSB7XG4gICAgICB0byA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcbiAgICAgIGZyb20gPSBNYXRoLm1heCgwLCB0byAtIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZS50b3RhbClcbiAgICB9XG5cbiAgICBwcmV2U2Nyb2xsU3RhcnQgPSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0XG5cbiAgICBjb25zdCByYW5nZUNoYW5nZWQgPSBmcm9tICE9PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tIHx8IHRvICE9PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50b1xuXG4gICAgaWYgKHJhbmdlQ2hhbmdlZCA9PT0gZmFsc2UgJiYgYWxpZ25FbmQgPT09IHZvaWQgMCkge1xuICAgICAgZW1pdFNjcm9sbCh0b0luZGV4KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyBhY3RpdmVFbGVtZW50IH0gPSBkb2N1bWVudFxuICAgIGNvbnN0IGNvbnRlbnRFbCA9IGNvbnRlbnRSZWYudmFsdWVcbiAgICBpZiAoXG4gICAgICByYW5nZUNoYW5nZWQgPT09IHRydWVcbiAgICAgICYmIGNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICAgJiYgY29udGVudEVsICE9PSBhY3RpdmVFbGVtZW50XG4gICAgICAmJiBjb250ZW50RWwuY29udGFpbnMoYWN0aXZlRWxlbWVudCkgPT09IHRydWVcbiAgICApIHtcbiAgICAgIGNvbnRlbnRFbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIG9uQmx1clJlZm9jdXNGbilcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnRlbnRFbCAhPT0gbnVsbCAmJiBjb250ZW50RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBvbkJsdXJSZWZvY3VzRm4pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHNldE92ZXJmbG93QW5jaG9yKGNvbnRlbnRFbCwgdG9JbmRleCAtIGZyb20pXG5cbiAgICBjb25zdCBzaXplQmVmb3JlID0gYWxpZ25FbmQgIT09IHZvaWQgMCA/IHZpcnR1YWxTY3JvbGxTaXplcy5zbGljZShmcm9tLCB0b0luZGV4KS5yZWR1Y2Uoc3VtRm4sIDApIDogMFxuXG4gICAgaWYgKHJhbmdlQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gdnVlIGtleSBtYXRjaGluZyBhbGdvcml0aG0gd29ya3Mgb25seSBpZlxuICAgICAgLy8gdGhlIGFycmF5IG9mIFZOb2RlcyBjaGFuZ2VzIG9uIG9ubHkgb25lIG9mIHRoZSBlbmRzXG4gICAgICAvLyBzbyB3ZSBmaXJzdCBjaGFuZ2Ugb25lIGVuZCBhbmQgdGhlbiB0aGUgb3RoZXJcblxuICAgICAgY29uc3QgdGVtcFRvID0gdG8gPj0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSAmJiBmcm9tIDw9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvXG4gICAgICAgID8gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG9cbiAgICAgICAgOiB0b1xuXG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZSA9IHsgZnJvbSwgdG86IHRlbXBUbyB9XG4gICAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSA9IHN1bVNpemUodmlydHVhbFNjcm9sbFNpemVzQWdnLCB2aXJ0dWFsU2Nyb2xsU2l6ZXMsIDAsIGZyb20pXG4gICAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgdG8sIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpXG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGlmICh2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50byAhPT0gdG8gJiYgcHJldlNjcm9sbFN0YXJ0ID09PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSB7XG4gICAgICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUgPSB7IGZyb206IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sIHRvIH1cbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgdG8sIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIGlmIHRoZSBzY3JvbGwgd2FzIGNoYW5nZWQgZ2l2ZSB1cFxuICAgICAgLy8gKGFub3RoZXIgY2FsbCB0byBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSBiZWZvcmUgYW5pbWF0aW9uIGZyYW1lKVxuICAgICAgaWYgKHByZXZTY3JvbGxTdGFydCAhPT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHJhbmdlQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2l6ZXMoZnJvbSlcbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgc2l6ZUFmdGVyID0gdmlydHVhbFNjcm9sbFNpemVzLnNsaWNlKGZyb20sIHRvSW5kZXgpLnJlZHVjZShzdW1GbiwgMCksXG4gICAgICAgIHBvc1N0YXJ0ID0gc2l6ZUFmdGVyICsgc2Nyb2xsRGV0YWlscy5vZmZzZXRTdGFydCArIHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlLFxuICAgICAgICBwb3NFbmQgPSBwb3NTdGFydCArIHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdXG5cbiAgICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9IHBvc1N0YXJ0ICsgb2Zmc2V0XG5cbiAgICAgIGlmIChhbGlnbkVuZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IHNpemVEaWZmID0gc2l6ZUFmdGVyIC0gc2l6ZUJlZm9yZVxuICAgICAgICBjb25zdCBzY3JvbGxTdGFydCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQgKyBzaXplRGlmZlxuXG4gICAgICAgIHNjcm9sbFBvc2l0aW9uID0gYWxpZ25Gb3JjZSAhPT0gdHJ1ZSAmJiBzY3JvbGxTdGFydCA8IHBvc1N0YXJ0ICYmIHBvc0VuZCA8IHNjcm9sbFN0YXJ0ICsgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZVxuICAgICAgICAgID8gc2Nyb2xsU3RhcnRcbiAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgYWxpZ25FbmQgPT09ICdlbmQnXG4gICAgICAgICAgICAgICAgPyBwb3NFbmQgLSBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplXG4gICAgICAgICAgICAgICAgOiBwb3NTdGFydCAtIChhbGlnbkVuZCA9PT0gJ3N0YXJ0JyA/IDAgOiBNYXRoLnJvdW5kKChzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplIC0gdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF0pIC8gMikpXG4gICAgICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHByZXZTY3JvbGxTdGFydCA9IHNjcm9sbFBvc2l0aW9uXG5cbiAgICAgIHNldFNjcm9sbChcbiAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgIHNjcm9sbFBvc2l0aW9uLFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCxcbiAgICAgICAgJHEubGFuZy5ydGxcbiAgICAgIClcblxuICAgICAgZW1pdFNjcm9sbCh0b0luZGV4KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2l6ZXMgKGZyb20pIHtcbiAgICBjb25zdCBjb250ZW50RWwgPSBjb250ZW50UmVmLnZhbHVlXG5cbiAgICBpZiAoY29udGVudEVsKSB7XG4gICAgICBjb25zdFxuICAgICAgICBjaGlsZHJlbiA9IGZpbHRlclByb3RvLmNhbGwoXG4gICAgICAgICAgY29udGVudEVsLmNoaWxkcmVuLFxuICAgICAgICAgIGVsID0+IGVsLmNsYXNzTGlzdCAmJiBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXNraXAnKSA9PT0gZmFsc2VcbiAgICAgICAgKSxcbiAgICAgICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgIHNpemVGbiA9IHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsID09PSB0cnVlXG4gICAgICAgICAgPyBlbCA9PiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgICAgIDogZWwgPT4gZWwub2Zmc2V0SGVpZ2h0XG5cbiAgICAgIGxldFxuICAgICAgICBpbmRleCA9IGZyb20sXG4gICAgICAgIHNpemUsIGRpZmZcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDspIHtcbiAgICAgICAgc2l6ZSA9IHNpemVGbihjaGlsZHJlblsgaSBdKVxuICAgICAgICBpKytcblxuICAgICAgICB3aGlsZSAoaSA8IGNoaWxkcmVuTGVuZ3RoICYmIGNoaWxkcmVuWyBpIF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdxLXZpcnR1YWwtc2Nyb2xsLS13aXRoLXByZXYnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNpemUgKz0gc2l6ZUZuKGNoaWxkcmVuWyBpIF0pXG4gICAgICAgICAgaSsrXG4gICAgICAgIH1cblxuICAgICAgICBkaWZmID0gc2l6ZSAtIHZpcnR1YWxTY3JvbGxTaXplc1sgaW5kZXggXVxuXG4gICAgICAgIGlmIChkaWZmICE9PSAwKSB7XG4gICAgICAgICAgdmlydHVhbFNjcm9sbFNpemVzWyBpbmRleCBdICs9IGRpZmZcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2dbIE1hdGguZmxvb3IoaW5kZXggLyBhZ2dCdWNrZXRTaXplKSBdICs9IGRpZmZcbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4KytcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkJsdXJSZWZvY3VzRm4gKCkge1xuICAgIGNvbnRlbnRSZWYudmFsdWUgIT09IG51bGwgJiYgY29udGVudFJlZi52YWx1ZSAhPT0gdm9pZCAwICYmIGNvbnRlbnRSZWYudmFsdWUuZm9jdXMoKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwgKHRvSW5kZXgsIGZ1bGxSZXNldCkge1xuICAgIGNvbnN0IGRlZmF1bHRTaXplID0gMSAqIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlXG5cbiAgICBpZiAoZnVsbFJlc2V0ID09PSB0cnVlIHx8IEFycmF5LmlzQXJyYXkodmlydHVhbFNjcm9sbFNpemVzKSA9PT0gZmFsc2UpIHtcbiAgICAgIHZpcnR1YWxTY3JvbGxTaXplcyA9IFtdXG4gICAgfVxuXG4gICAgY29uc3Qgb2xkVmlydHVhbFNjcm9sbFNpemVzTGVuZ3RoID0gdmlydHVhbFNjcm9sbFNpemVzLmxlbmd0aFxuXG4gICAgdmlydHVhbFNjcm9sbFNpemVzLmxlbmd0aCA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcblxuICAgIGZvciAobGV0IGkgPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMTsgaSA+PSBvbGRWaXJ0dWFsU2Nyb2xsU2l6ZXNMZW5ndGg7IGktLSkge1xuICAgICAgdmlydHVhbFNjcm9sbFNpemVzWyBpIF0gPSBkZWZhdWx0U2l6ZVxuICAgIH1cblxuICAgIGNvbnN0IGpNYXggPSBNYXRoLmZsb29yKCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMSkgLyBhZ2dCdWNrZXRTaXplKVxuICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZyA9IFtdXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPD0gak1heDsgaisrKSB7XG4gICAgICBsZXQgc2l6ZSA9IDBcbiAgICAgIGNvbnN0IGlNYXggPSBNYXRoLm1pbigoaiArIDEpICogYWdnQnVja2V0U2l6ZSwgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcbiAgICAgIGZvciAobGV0IGkgPSBqICogYWdnQnVja2V0U2l6ZTsgaSA8IGlNYXg7IGkrKykge1xuICAgICAgICBzaXplICs9IHZpcnR1YWxTY3JvbGxTaXplc1sgaSBdXG4gICAgICB9XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cucHVzaChzaXplKVxuICAgIH1cblxuICAgIHByZXZUb0luZGV4ID0gLTFcbiAgICBwcmV2U2Nyb2xsU3RhcnQgPSB2b2lkIDBcblxuICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgMCwgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSlcbiAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG8sIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpXG5cbiAgICBpZiAodG9JbmRleCA+PSAwKSB7XG4gICAgICB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2l6ZXModmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSlcbiAgICAgIG5leHRUaWNrKCgpID0+IHsgc2Nyb2xsVG8odG9JbmRleCkgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFZpcnR1YWxTY3JvbGxTaXplIChzY3JvbGxWaWV3U2l6ZSkge1xuICAgIGlmIChzY3JvbGxWaWV3U2l6ZSA9PT0gdm9pZCAwICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBzY3JvbGxFbCA9IGdldFZpcnR1YWxTY3JvbGxUYXJnZXQoKVxuXG4gICAgICBpZiAoc2Nyb2xsRWwgIT09IHZvaWQgMCAmJiBzY3JvbGxFbCAhPT0gbnVsbCAmJiBzY3JvbGxFbC5ub2RlVHlwZSAhPT0gOCkge1xuICAgICAgICBzY3JvbGxWaWV3U2l6ZSA9IGdldFNjcm9sbERldGFpbHMoXG4gICAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICAgICAgYmVmb3JlUmVmLnZhbHVlLFxuICAgICAgICAgIGFmdGVyUmVmLnZhbHVlLFxuICAgICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAgICRxLmxhbmcucnRsLFxuICAgICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplU3RhcnQsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICAgICAgKS5zY3JvbGxWaWV3U2l6ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvY2FsU2Nyb2xsVmlld1NpemUgPSBzY3JvbGxWaWV3U2l6ZVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgPSBwYXJzZUZsb2F0KHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSB8fCAwXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlciA9IHBhcnNlRmxvYXQocHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlcikgfHwgMFxuICAgIGNvbnN0IG11bHRpcGxpZXIgPSAxICsgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyXG4gICAgY29uc3QgdmlldyA9IHNjcm9sbFZpZXdTaXplID09PSB2b2lkIDAgfHwgc2Nyb2xsVmlld1NpemUgPD0gMFxuICAgICAgPyAxXG4gICAgICA6IE1hdGguY2VpbChzY3JvbGxWaWV3U2l6ZSAvIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlKVxuXG4gICAgY29uc3QgYmFzZVNpemUgPSBNYXRoLm1heChcbiAgICAgIDEsXG4gICAgICB2aWV3LFxuICAgICAgTWF0aC5jZWlsKChwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VTaXplID4gMCA/IHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVNpemUgOiAxMCkgLyBtdWx0aXBsaWVyKVxuICAgIClcblxuICAgIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZSA9IHtcbiAgICAgIHRvdGFsOiBNYXRoLmNlaWwoYmFzZVNpemUgKiBtdWx0aXBsaWVyKSxcbiAgICAgIHN0YXJ0OiBNYXRoLmNlaWwoYmFzZVNpemUgKiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSksXG4gICAgICBjZW50ZXI6IE1hdGguY2VpbChiYXNlU2l6ZSAqICgwLjUgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSkpLFxuICAgICAgZW5kOiBNYXRoLmNlaWwoYmFzZVNpemUgKiAoMSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSksXG4gICAgICB2aWV3XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkVmlydHVhbFNjcm9sbCAodGFnLCBjb250ZW50KSB7XG4gICAgY29uc3QgcGFkZGluZ1NpemUgPSBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgWyAnLS1xLXZpcnR1YWwtc2Nyb2xsLWl0ZW0tJyArIHBhZGRpbmdTaXplIF06IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlICsgJ3B4J1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICB0YWcgPT09ICd0Ym9keSdcbiAgICAgICAgPyBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYmVmb3JlJyxcbiAgICAgICAgICByZWY6IGJlZm9yZVJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgndHInLCBbXG4gICAgICAgICAgICBoKCd0ZCcsIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHsgWyBwYWRkaW5nU2l6ZSBdOiBgJHsgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgfXB4YCwgLi4uc3R5bGUgfSxcbiAgICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbkF0dHIudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgICAgOiBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYmVmb3JlJyxcbiAgICAgICAgICByZWY6IGJlZm9yZVJlZixcbiAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9XG4gICAgICAgIH0pLFxuXG4gICAgICBoKHRhZywge1xuICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX2NvbnRlbnQnLFxuICAgICAgICBrZXk6ICdjb250ZW50JyxcbiAgICAgICAgcmVmOiBjb250ZW50UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQuZmxhdCgpKSxcblxuICAgICAgdGFnID09PSAndGJvZHknXG4gICAgICAgID8gaCh0YWcsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX3BhZGRpbmcnLFxuICAgICAgICAgIGtleTogJ2FmdGVyJyxcbiAgICAgICAgICByZWY6IGFmdGVyUmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCd0cicsIFtcbiAgICAgICAgICAgIGgoJ3RkJywge1xuICAgICAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlIH1weGAsIC4uLnN0eWxlIH0sXG4gICAgICAgICAgICAgIGNvbHNwYW46IGNvbHNwYW5BdHRyLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICAgIDogaCh0YWcsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX3BhZGRpbmcnLFxuICAgICAgICAgIGtleTogJ2FmdGVyJyxcbiAgICAgICAgICByZWY6IGFmdGVyUmVmLFxuICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgfXB4YCwgLi4uc3R5bGUgfVxuICAgICAgICB9KVxuICAgIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXRTY3JvbGwgKGluZGV4KSB7XG4gICAgaWYgKHByZXZUb0luZGV4ICE9PSBpbmRleCkge1xuICAgICAgcHJvcHMub25WaXJ0dWFsU2Nyb2xsICE9PSB2b2lkIDAgJiYgZW1pdCgndmlydHVhbC1zY3JvbGwnLCB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBmcm9tOiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tLFxuICAgICAgICB0bzogdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG8gLSAxLFxuICAgICAgICBkaXJlY3Rpb246IGluZGV4IDwgcHJldlRvSW5kZXggPyAnZGVjcmVhc2UnIDogJ2luY3JlYXNlJyxcbiAgICAgICAgcmVmOiBwcm94eVxuICAgICAgfSlcblxuICAgICAgcHJldlRvSW5kZXggPSBpbmRleFxuICAgIH1cbiAgfVxuXG4gIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgY29uc3Qgb25WaXJ0dWFsU2Nyb2xsRXZ0ID0gZGVib3VuY2UoXG4gICAgbG9jYWxPblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlID8gMTIwIDogMzVcbiAgKVxuXG4gIG9uQmVmb3JlTW91bnQoKCkgPT4ge1xuICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgfSlcblxuICBsZXQgc2hvdWxkQWN0aXZhdGUgPSBmYWxzZVxuXG4gIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID0gdHJ1ZVxuICB9KVxuXG4gIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICBpZiAoc2hvdWxkQWN0aXZhdGUgIT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICBpZiAocHJldlNjcm9sbFN0YXJ0ICE9PSB2b2lkIDAgJiYgc2Nyb2xsRWwgIT09IHZvaWQgMCAmJiBzY3JvbGxFbCAhPT0gbnVsbCAmJiBzY3JvbGxFbC5ub2RlVHlwZSAhPT0gOCkge1xuICAgICAgc2V0U2Nyb2xsKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgcHJldlNjcm9sbFN0YXJ0LFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCxcbiAgICAgICAgJHEubGFuZy5ydGxcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzY3JvbGxUbyhwcmV2VG9JbmRleClcbiAgICB9XG4gIH0pXG5cbiAgX19RVUFTQVJfU1NSX18gfHwgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBvblZpcnR1YWxTY3JvbGxFdnQuY2FuY2VsKClcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBzY3JvbGxUbywgcmVzZXQsIHJlZnJlc2ggfSlcblxuICByZXR1cm4ge1xuICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLFxuICAgIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZCxcblxuICAgIHNldFZpcnR1YWxTY3JvbGxTaXplLFxuICAgIG9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICBwYWRWaXJ0dWFsU2Nyb2xsLFxuXG4gICAgc2Nyb2xsVG8sXG4gICAgcmVzZXQsXG4gICAgcmVmcmVzaFxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVcGRhdGUsIG9uVXBkYXRlZCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUZpZWxkIGZyb20gJy4uL2ZpZWxkL1FGaWVsZC5qcydcbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFDaGlwIGZyb20gJy4uL2NoaXAvUUNoaXAuanMnXG5cbmltcG9ydCBRSXRlbSBmcm9tICcuLi9pdGVtL1FJdGVtLmpzJ1xuaW1wb3J0IFFJdGVtU2VjdGlvbiBmcm9tICcuLi9pdGVtL1FJdGVtU2VjdGlvbi5qcydcbmltcG9ydCBRSXRlbUxhYmVsIGZyb20gJy4uL2l0ZW0vUUl0ZW1MYWJlbC5qcydcblxuaW1wb3J0IFFNZW51IGZyb20gJy4uL21lbnUvUU1lbnUuanMnXG5pbXBvcnQgUURpYWxvZyBmcm9tICcuLi9kaWFsb2cvUURpYWxvZy5qcydcblxuaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMsIGZpZWxkVmFsdWVJc0ZpbGxlZCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHsgdXNlVmlydHVhbFNjcm9sbCwgdXNlVmlydHVhbFNjcm9sbFByb3BzIH0gZnJvbSAnLi4vdmlydHVhbC1zY3JvbGwvdXNlLXZpcnR1YWwtc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlS2V5Q29tcG9zaXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pcy5qcydcbmltcG9ydCB7IHN0b3AsIHByZXZlbnQsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBub3JtYWxpemVUb0ludGVydmFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgc2hvdWxkSWdub3JlS2V5LCBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgdmFsaWRhdGVOZXdWYWx1ZU1vZGUgPSB2ID0+IFsgJ2FkZCcsICdhZGQtdW5pcXVlJywgJ3RvZ2dsZScgXS5pbmNsdWRlcyh2KVxuY29uc3QgcmVFc2NhcGVMaXN0ID0gJy4qKz9eJHt9KCl8W11cXFxcJ1xuY29uc3QgZmllbGRQcm9wc0xpc3QgPSBPYmplY3Qua2V5cyh1c2VGaWVsZFByb3BzKVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNlbGVjdCcsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVZpcnR1YWxTY3JvbGxQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG4gICAgLi4udXNlRmllbGRQcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcblxuICAgIG11bHRpcGxlOiBCb29sZWFuLFxuXG4gICAgZGlzcGxheVZhbHVlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGlzcGxheVZhbHVlSHRtbDogQm9vbGVhbixcbiAgICBkcm9wZG93bkljb246IFN0cmluZyxcblxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuXG4gICAgb3B0aW9uVmFsdWU6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuICAgIG9wdGlvbkxhYmVsOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcbiAgICBvcHRpb25EaXNhYmxlOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcblxuICAgIGhpZGVTZWxlY3RlZDogQm9vbGVhbixcbiAgICBoaWRlRHJvcGRvd25JY29uOiBCb29sZWFuLFxuICAgIGZpbGxJbnB1dDogQm9vbGVhbixcblxuICAgIG1heFZhbHVlczogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gICAgb3B0aW9uc0RlbnNlOiBCb29sZWFuLFxuICAgIG9wdGlvbnNEYXJrOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgb3B0aW9uc1NlbGVjdGVkQ2xhc3M6IFN0cmluZyxcbiAgICBvcHRpb25zSHRtbDogQm9vbGVhbixcblxuICAgIG9wdGlvbnNDb3ZlcjogQm9vbGVhbixcblxuICAgIG1lbnVTaHJpbms6IEJvb2xlYW4sXG4gICAgbWVudUFuY2hvcjogU3RyaW5nLFxuICAgIG1lbnVTZWxmOiBTdHJpbmcsXG4gICAgbWVudU9mZnNldDogQXJyYXksXG5cbiAgICBwb3B1cENvbnRlbnRDbGFzczogU3RyaW5nLFxuICAgIHBvcHVwQ29udGVudFN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuXG4gICAgdXNlSW5wdXQ6IEJvb2xlYW4sXG4gICAgdXNlQ2hpcHM6IEJvb2xlYW4sXG5cbiAgICBuZXdWYWx1ZU1vZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVOZXdWYWx1ZU1vZGVcbiAgICB9LFxuXG4gICAgbWFwT3B0aW9uczogQm9vbGVhbixcbiAgICBlbWl0VmFsdWU6IEJvb2xlYW4sXG5cbiAgICBpbnB1dERlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiA1MDBcbiAgICB9LFxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgdGFiaW5kZXg6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgYXV0b2NvbXBsZXRlOiBTdHJpbmcsXG5cbiAgICB0cmFuc2l0aW9uU2hvdzogU3RyaW5nLFxuICAgIHRyYW5zaXRpb25IaWRlOiBTdHJpbmcsXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnbWVudScsICdkaWFsb2cnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuXG4gICAgb25OZXdWYWx1ZTogRnVuY3Rpb24sXG4gICAgb25GaWx0ZXI6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdhZGQnLCAncmVtb3ZlJywgJ2lucHV0LXZhbHVlJywgJ25ldy12YWx1ZScsXG4gICAgJ2tleXVwJywgJ2tleXByZXNzJywgJ2tleWRvd24nLFxuICAgICdmaWx0ZXItYWJvcnQnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCBtZW51ID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBvcHRpb25JbmRleCA9IHJlZigtMSlcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gcmVmKCcnKVxuICAgIGNvbnN0IGRpYWxvZ0ZpZWxkRm9jdXNlZCA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBpbm5lckxvYWRpbmdJbmRpY2F0b3IgPSByZWYoZmFsc2UpXG5cbiAgICBsZXQgaW5wdXRUaW1lciwgaW5uZXJWYWx1ZUNhY2hlLFxuICAgICAgaGFzRGlhbG9nLCB1c2VySW5wdXRWYWx1ZSwgZmlsdGVySWQsIGRlZmF1bHRJbnB1dFZhbHVlLFxuICAgICAgdHJhbnNpdGlvblNob3dDb21wdXRlZCwgc2VhcmNoQnVmZmVyLCBzZWFyY2hCdWZmZXJFeHBcblxuICAgIGNvbnN0IGlucHV0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgdGFyZ2V0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbWVudVJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IG1lbnVDb250ZW50UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qgb25Db21wb3NpdGlvbiA9IHVzZUtleUNvbXBvc2l0aW9uKG9uSW5wdXQpXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgQXJyYXkuaXNBcnJheShwcm9wcy5vcHRpb25zKVxuICAgICAgICA/IHByb3BzLm9wdGlvbnMubGVuZ3RoXG4gICAgICAgIDogMFxuICAgICkpXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZSA9PT0gdm9pZCAwXG4gICAgICAgID8gKHByb3BzLm9wdGlvbnNEZW5zZSA9PT0gdHJ1ZSA/IDI0IDogNDgpXG4gICAgICAgIDogcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplXG4gICAgKSlcblxuICAgIGNvbnN0IHtcbiAgICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLFxuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLFxuICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwsXG4gICAgICBwYWRWaXJ0dWFsU2Nyb2xsLFxuICAgICAgb25WaXJ0dWFsU2Nyb2xsRXZ0LFxuICAgICAgc2Nyb2xsVG8sXG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZVxuICAgIH0gPSB1c2VWaXJ0dWFsU2Nyb2xsKHtcbiAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgsIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQsIGdldFZpcnR1YWxTY3JvbGxFbCxcbiAgICAgIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkXG4gICAgfSlcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSgpXG5cbiAgICBjb25zdCBpbm5lclZhbHVlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3RcbiAgICAgICAgbWFwTnVsbCA9IHByb3BzLm1hcE9wdGlvbnMgPT09IHRydWUgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWUsXG4gICAgICAgIHZhbCA9IHByb3BzLm1vZGVsVmFsdWUgIT09IHZvaWQgMCAmJiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbCB8fCBtYXBOdWxsID09PSB0cnVlKVxuICAgICAgICAgID8gKHByb3BzLm11bHRpcGxlID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPyBwcm9wcy5tb2RlbFZhbHVlIDogWyBwcm9wcy5tb2RlbFZhbHVlIF0pXG4gICAgICAgICAgOiBbXVxuXG4gICAgICBpZiAocHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBBcnJheS5pc0FycmF5KHByb3BzLm9wdGlvbnMpID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGNhY2hlID0gcHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBpbm5lclZhbHVlQ2FjaGUgIT09IHZvaWQgMFxuICAgICAgICAgID8gaW5uZXJWYWx1ZUNhY2hlXG4gICAgICAgICAgOiBbXVxuICAgICAgICBjb25zdCB2YWx1ZXMgPSB2YWwubWFwKHYgPT4gZ2V0T3B0aW9uKHYsIGNhY2hlKSlcblxuICAgICAgICByZXR1cm4gcHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCAmJiBtYXBOdWxsID09PSB0cnVlXG4gICAgICAgICAgPyB2YWx1ZXMuZmlsdGVyKHYgPT4gdiAhPT0gbnVsbClcbiAgICAgICAgICA6IHZhbHVlc1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsXG4gICAgfSlcblxuICAgIGNvbnN0IGlubmVyRmllbGRQcm9wcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHt9XG4gICAgICBmaWVsZFByb3BzTGlzdC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzWyBrZXkgXVxuICAgICAgICBpZiAodmFsICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBhY2NbIGtleSBdID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IGlzT3B0aW9uc0RhcmsgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zRGFyayA9PT0gbnVsbFxuICAgICAgICA/IHN0YXRlLmlzRGFyay52YWx1ZVxuICAgICAgICA6IHByb3BzLm9wdGlvbnNEYXJrXG4gICAgKSlcblxuICAgIGNvbnN0IGhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKGlubmVyVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3QgY29tcHV0ZWRJbnB1dENsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IGNscyA9ICdxLWZpZWxkX19pbnB1dCBxLXBsYWNlaG9sZGVyIGNvbCdcblxuICAgICAgaWYgKHByb3BzLmhpZGVTZWxlY3RlZCA9PT0gdHJ1ZSB8fCBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gWyBjbHMsIHByb3BzLmlucHV0Q2xhc3MgXVxuICAgICAgfVxuXG4gICAgICBjbHMgKz0gJyBxLWZpZWxkX19pbnB1dC0tcGFkZGluZydcblxuICAgICAgcmV0dXJuIHByb3BzLmlucHV0Q2xhc3MgPT09IHZvaWQgMFxuICAgICAgICA/IGNsc1xuICAgICAgICA6IFsgY2xzLCBwcm9wcy5pbnB1dENsYXNzIF1cbiAgICB9KVxuXG4gICAgY29uc3QgbWVudUNvbnRlbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAocHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwgPT09IHRydWUgPyAncS12aXJ0dWFsLXNjcm9sbC0taG9yaXpvbnRhbCcgOiAnJylcbiAgICAgICsgKHByb3BzLnBvcHVwQ29udGVudENsYXNzID8gJyAnICsgcHJvcHMucG9wdXBDb250ZW50Q2xhc3MgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBub09wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlID09PSAwKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTdHJpbmcgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaW5uZXJWYWx1ZS52YWx1ZVxuICAgICAgICAubWFwKG9wdCA9PiBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpKVxuICAgICAgICAuam9pbignLCAnKVxuICAgIClcblxuICAgIGNvbnN0IG5lZWRzSHRtbEZuID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMub3B0aW9uc0h0bWwgPT09IHRydWVcbiAgICAgICAgPyAoKSA9PiB0cnVlXG4gICAgICAgIDogb3B0ID0+IG9wdCAhPT0gdm9pZCAwICYmIG9wdCAhPT0gbnVsbCAmJiBvcHQuaHRtbCA9PT0gdHJ1ZVxuICAgICkpXG5cbiAgICBjb25zdCB2YWx1ZUFzSHRtbCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRpc3BsYXlWYWx1ZUh0bWwgPT09IHRydWUgfHwgKFxuICAgICAgICBwcm9wcy5kaXNwbGF5VmFsdWUgPT09IHZvaWQgMCAmJiAoXG4gICAgICAgICAgcHJvcHMub3B0aW9uc0h0bWwgPT09IHRydWVcbiAgICAgICAgICB8fCBpbm5lclZhbHVlLnZhbHVlLnNvbWUobmVlZHNIdG1sRm4udmFsdWUpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApKVxuXG4gICAgY29uc3QgdGFiaW5kZXggPSBjb21wdXRlZCgoKSA9PiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/IHByb3BzLnRhYmluZGV4IDogLTEpKVxuXG4gICAgY29uc3QgY29tYm9ib3hBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICB0YWJpbmRleDogcHJvcHMudGFiaW5kZXgsXG4gICAgICAgIHJvbGU6ICdjb21ib2JveCcsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6IHByb3BzLnVzZUlucHV0ID09PSB0cnVlID8gJ2xpc3QnIDogJ25vbmUnLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IG1lbnUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1vd25zJzogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9X2xiYCxcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fbGJgXG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSA+PSAwKSB7XG4gICAgICAgIGF0dHJzWyAnYXJpYS1hY3RpdmVkZXNjZW5kYW50JyBdID0gYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9XyR7IG9wdGlvbkluZGV4LnZhbHVlIH1gXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhdHRyc1xuICAgIH0pXG5cbiAgICBjb25zdCBsaXN0Ym94QXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhdHRycyA9IHtcbiAgICAgICAgaWQ6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV9sYmAsXG4gICAgICAgIHJvbGU6ICdsaXN0Ym94JyxcbiAgICAgICAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSA+PSAwKSB7XG4gICAgICAgIGF0dHJzWyAnYXJpYS1hY3RpdmVkZXNjZW5kYW50JyBdID0gYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9XyR7IG9wdGlvbkluZGV4LnZhbHVlIH1gXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhdHRyc1xuICAgIH0pXG5cbiAgICBjb25zdCBzZWxlY3RlZFNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIGlubmVyVmFsdWUudmFsdWUubWFwKChvcHQsIGkpID0+ICh7XG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICBvcHQsXG4gICAgICAgIGh0bWw6IG5lZWRzSHRtbEZuLnZhbHVlKG9wdCksXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICByZW1vdmVBdEluZGV4OiByZW1vdmVBdEluZGV4QW5kRm9jdXMsXG4gICAgICAgIHRvZ2dsZU9wdGlvbixcbiAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlXG4gICAgICB9KSlcbiAgICB9KVxuXG4gICAgY29uc3Qgb3B0aW9uU2NvcGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAodmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBmcm9tLCB0byB9ID0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWVcblxuICAgICAgcmV0dXJuIHByb3BzLm9wdGlvbnMuc2xpY2UoZnJvbSwgdG8pLm1hcCgob3B0LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc2FibGUgPSBpc09wdGlvbkRpc2FibGVkLnZhbHVlKG9wdCkgPT09IHRydWVcbiAgICAgICAgY29uc3QgaW5kZXggPSBmcm9tICsgaVxuXG4gICAgICAgIGNvbnN0IGl0ZW1Qcm9wcyA9IHtcbiAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICBhY3RpdmVDbGFzczogY29tcHV0ZWRPcHRpb25zU2VsZWN0ZWRDbGFzcy52YWx1ZSxcbiAgICAgICAgICBtYW51YWxGb2N1czogdHJ1ZSxcbiAgICAgICAgICBmb2N1c2VkOiBmYWxzZSxcbiAgICAgICAgICBkaXNhYmxlLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICBkZW5zZTogcHJvcHMub3B0aW9uc0RlbnNlLFxuICAgICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgICAgcm9sZTogJ29wdGlvbicsXG4gICAgICAgICAgaWQ6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV8keyBpbmRleCB9YCxcbiAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB7IHRvZ2dsZU9wdGlvbihvcHQpIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXNhYmxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgaXNPcHRpb25TZWxlY3RlZChvcHQpID09PSB0cnVlICYmIChpdGVtUHJvcHMuYWN0aXZlID0gdHJ1ZSlcbiAgICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9PT0gaW5kZXggJiYgKGl0ZW1Qcm9wcy5mb2N1c2VkID0gdHJ1ZSlcblxuICAgICAgICAgIGl0ZW1Qcm9wc1sgJ2FyaWEtc2VsZWN0ZWQnIF0gPSBpdGVtUHJvcHMuYWN0aXZlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuXG4gICAgICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmRlc2t0b3AgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGl0ZW1Qcm9wcy5vbk1vdXNlbW92ZSA9ICgpID0+IHsgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBzZXRPcHRpb25JbmRleChpbmRleCkgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgIGh0bWw6IG5lZWRzSHRtbEZuLnZhbHVlKG9wdCksXG4gICAgICAgICAgbGFiZWw6IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCksXG4gICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1Qcm9wcy5hY3RpdmUsXG4gICAgICAgICAgZm9jdXNlZDogaXRlbVByb3BzLmZvY3VzZWQsXG4gICAgICAgICAgdG9nZ2xlT3B0aW9uLFxuICAgICAgICAgIHNldE9wdGlvbkluZGV4LFxuICAgICAgICAgIGl0ZW1Qcm9wc1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBjb25zdCBkcm9wZG93bkFycm93SWNvbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRyb3Bkb3duSWNvbiAhPT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMuZHJvcGRvd25JY29uXG4gICAgICAgIDogJHEuaWNvblNldC5hcnJvdy5kcm9wZG93blxuICAgICkpXG5cbiAgICBjb25zdCBzcXVhcmVkTWVudSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5vcHRpb25zQ292ZXIgPT09IGZhbHNlXG4gICAgICAmJiBwcm9wcy5vdXRsaW5lZCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuc3RhbmRvdXQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLmJvcmRlcmxlc3MgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnJvdW5kZWQgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBjb21wdXRlZE9wdGlvbnNTZWxlY3RlZENsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMub3B0aW9uc1NlbGVjdGVkQ2xhc3MgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLm9wdGlvbnNTZWxlY3RlZENsYXNzXG4gICAgICAgIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICkpXG5cbiAgICAvLyByZXR1cm5zIG1ldGhvZCB0byBnZXQgdmFsdWUgb2YgYW4gb3B0aW9uO1xuICAgIC8vIHRha2VzIGludG8gYWNjb3VudCAnb3B0aW9uLXZhbHVlJyBwcm9wXG4gICAgY29uc3QgZ2V0T3B0aW9uVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9wVmFsdWVGbihwcm9wcy5vcHRpb25WYWx1ZSwgJ3ZhbHVlJykpXG5cbiAgICAvLyByZXR1cm5zIG1ldGhvZCB0byBnZXQgbGFiZWwgb2YgYW4gb3B0aW9uO1xuICAgIC8vIHRha2VzIGludG8gYWNjb3VudCAnb3B0aW9uLWxhYmVsJyBwcm9wXG4gICAgY29uc3QgZ2V0T3B0aW9uTGFiZWwgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9wVmFsdWVGbihwcm9wcy5vcHRpb25MYWJlbCwgJ2xhYmVsJykpXG5cbiAgICAvLyByZXR1cm5zIG1ldGhvZCB0byB0ZWxsIGlmIGFuIG9wdGlvbiBpcyBkaXNhYmxlZDtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi1kaXNhYmxlJyBwcm9wXG4gICAgY29uc3QgaXNPcHRpb25EaXNhYmxlZCA9IGNvbXB1dGVkKCgpID0+IGdldFByb3BWYWx1ZUZuKHByb3BzLm9wdGlvbkRpc2FibGUsICdkaXNhYmxlJykpXG5cbiAgICBjb25zdCBpbm5lck9wdGlvbnNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGlubmVyVmFsdWUudmFsdWUubWFwKG9wdCA9PiBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpKSlcblxuICAgIGNvbnN0IGlucHV0Q29udHJvbEV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGV2dCA9IHtcbiAgICAgICAgb25JbnB1dCxcbiAgICAgICAgLy8gU2FmYXJpIDwgMTAuMiAmIFVJV2ViVmlldyBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgd2hlblxuICAgICAgICAvLyBzd2l0Y2hpbmcgZm9jdXMgYmVmb3JlIGNvbmZpcm1pbmcgY29tcG9zaXRpb24gY2hvaWNlXG4gICAgICAgIC8vIHRoaXMgYWxzbyBmaXhlcyB0aGUgaXNzdWUgd2hlcmUgc29tZSBicm93c2VycyBlLmcuIGlPUyBDaHJvbWVcbiAgICAgICAgLy8gZmlyZXMgXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIiBvbiBhdXRvY29tcGxldGUuXG4gICAgICAgIG9uQ2hhbmdlOiBvbkNvbXBvc2l0aW9uLFxuICAgICAgICBvbktleWRvd246IG9uVGFyZ2V0S2V5ZG93bixcbiAgICAgICAgb25LZXl1cDogb25UYXJnZXRBdXRvY29tcGxldGUsXG4gICAgICAgIG9uS2V5cHJlc3M6IG9uVGFyZ2V0S2V5cHJlc3MsXG4gICAgICAgIG9uRm9jdXM6IHNlbGVjdElucHV0VGV4dCxcbiAgICAgICAgb25DbGljayAoZSkgeyBoYXNEaWFsb2cgPT09IHRydWUgJiYgc3RvcChlKSB9XG4gICAgICB9XG5cbiAgICAgIGV2dC5vbkNvbXBvc2l0aW9uc3RhcnQgPSBldnQub25Db21wb3NpdGlvbnVwZGF0ZSA9IGV2dC5vbkNvbXBvc2l0aW9uZW5kID0gb25Db21wb3NpdGlvblxuXG4gICAgICByZXR1cm4gZXZ0XG4gICAgfSlcblxuICAgIHdhdGNoKGlubmVyVmFsdWUsIHZhbCA9PiB7XG4gICAgICBpbm5lclZhbHVlQ2FjaGUgPSB2YWxcblxuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWVcbiAgICAgICAgLy8gUHJldmVudCByZS1lbnRlcmluZyBpbiBmaWx0ZXIgd2hpbGUgZmlsdGVyaW5nXG4gICAgICAgIC8vIEFsc28gcHJldmVudCBjbGVhcmluZyBpbnB1dFZhbHVlIHdoaWxlIGZpbHRlcmluZ1xuICAgICAgICAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgKChkaWFsb2cudmFsdWUgIT09IHRydWUgJiYgbWVudS52YWx1ZSAhPT0gdHJ1ZSkgfHwgaGFzVmFsdWUudmFsdWUgIT09IHRydWUpXG4gICAgICApIHtcbiAgICAgICAgdXNlcklucHV0VmFsdWUgIT09IHRydWUgJiYgcmVzZXRJbnB1dFZhbHVlKClcbiAgICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gdHJ1ZSB8fCBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgZmlsdGVyKCcnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmZpbGxJbnB1dCwgcmVzZXRJbnB1dFZhbHVlKVxuXG4gICAgd2F0Y2gobWVudSwgdXBkYXRlTWVudSlcblxuICAgIHdhdGNoKHZpcnR1YWxTY3JvbGxMZW5ndGgsIHJlcmVuZGVyTWVudSlcblxuICAgIGZ1bmN0aW9uIGdldEVtaXR0aW5nT3B0aW9uVmFsdWUgKG9wdCkge1xuICAgICAgcmV0dXJuIHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdClcbiAgICAgICAgOiBvcHRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBdEluZGV4IChpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID4gLTEgJiYgaW5kZXggPCBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuICAgICAgICAgIGVtaXQoJ3JlbW92ZScsIHsgaW5kZXgsIHZhbHVlOiBtb2RlbC5zcGxpY2UoaW5kZXgsIDEpWyAwIF0gfSlcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0SW5kZXhBbmRGb2N1cyAoaW5kZXgpIHtcbiAgICAgIHJlbW92ZUF0SW5kZXgoaW5kZXgpXG4gICAgICBzdGF0ZS5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkIChvcHQsIHVuaXF1ZSkge1xuICAgICAgY29uc3QgdmFsID0gZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZShvcHQpXG5cbiAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgJiYgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgICBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG5cbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogMCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gWyB2YWwgXSA6IHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICh1bmlxdWUgPT09IHRydWUgJiYgaXNPcHRpb25TZWxlY3RlZChvcHQpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMubWF4VmFsdWVzICE9PSB2b2lkIDAgJiYgcHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggPj0gcHJvcHMubWF4VmFsdWVzKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuXG4gICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiBtb2RlbC5sZW5ndGgsIHZhbHVlOiB2YWwgfSlcbiAgICAgIG1vZGVsLnB1c2godmFsKVxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBtb2RlbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVPcHRpb24gKG9wdCwga2VlcE9wZW4pIHtcbiAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZSB8fCBvcHQgPT09IHZvaWQgMCB8fCBpc09wdGlvbkRpc2FibGVkLnZhbHVlKG9wdCkgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdFZhbHVlID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgaWYgKGtlZXBPcGVuICE9PSB0cnVlKSB7XG4gICAgICAgICAgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgICAgIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkgOiAnJyxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgIHx8IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSksIG9wdFZhbHVlKSAhPT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0KVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAoaGFzRGlhbG9nICE9PSB0cnVlIHx8IGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkgJiYgc3RhdGUuZm9jdXMoKVxuXG4gICAgICBzZWxlY3RJbnB1dFRleHQoKVxuXG4gICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlID8gb3B0VmFsdWUgOiBvcHRcbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogMCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gWyB2YWwgXSA6IHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpLFxuICAgICAgICBpbmRleCA9IGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmZpbmRJbmRleCh2ID0+IGlzRGVlcEVxdWFsKHYsIG9wdFZhbHVlKSlcblxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgZW1pdCgncmVtb3ZlJywgeyBpbmRleCwgdmFsdWU6IG1vZGVsLnNwbGljZShpbmRleCwgMSlbIDAgXSB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChwcm9wcy5tYXhWYWx1ZXMgIT09IHZvaWQgMCAmJiBtb2RlbC5sZW5ndGggPj0gcHJvcHMubWF4VmFsdWVzKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWwgPSBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWUgPyBvcHRWYWx1ZSA6IG9wdFxuXG4gICAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IG1vZGVsLmxlbmd0aCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBtb2RlbC5wdXNoKHZhbClcbiAgICAgIH1cblxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBtb2RlbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPcHRpb25JbmRleCAoaW5kZXgpIHtcbiAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5kZXNrdG9wICE9PSB0cnVlKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0IHZhbCA9IGluZGV4ID4gLTEgJiYgaW5kZXggPCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG4gICAgICAgID8gaW5kZXhcbiAgICAgICAgOiAtMVxuXG4gICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVPcHRpb25TZWxlY3Rpb24gKG9mZnNldCA9IDEsIHNraXBJbnB1dFZhbHVlKSB7XG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBvcHRpb25JbmRleC52YWx1ZVxuICAgICAgICBkbyB7XG4gICAgICAgICAgaW5kZXggPSBub3JtYWxpemVUb0ludGVydmFsKFxuICAgICAgICAgICAgaW5kZXggKyBvZmZzZXQsXG4gICAgICAgICAgICAtMSxcbiAgICAgICAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpbmRleCAhPT0gLTEgJiYgaW5kZXggIT09IG9wdGlvbkluZGV4LnZhbHVlICYmIGlzT3B0aW9uRGlzYWJsZWQudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkgPT09IHRydWUpXG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgICAgIHNldE9wdGlvbkluZGV4KGluZGV4KVxuICAgICAgICAgIHNjcm9sbFRvKGluZGV4KVxuXG4gICAgICAgICAgaWYgKHNraXBJbnB1dFZhbHVlICE9PSB0cnVlICYmIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZShpbmRleCA+PSAwXG4gICAgICAgICAgICAgID8gZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSlcbiAgICAgICAgICAgICAgOiBkZWZhdWx0SW5wdXRWYWx1ZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbiAodmFsdWUsIHZhbHVlQ2FjaGUpIHtcbiAgICAgIGNvbnN0IGZuID0gb3B0ID0+IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdCksIHZhbHVlKVxuICAgICAgcmV0dXJuIHByb3BzLm9wdGlvbnMuZmluZChmbikgfHwgdmFsdWVDYWNoZS5maW5kKGZuKSB8fCB2YWx1ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb3BWYWx1ZUZuIChwcm9wVmFsdWUsIGRlZmF1bHRWYWwpIHtcbiAgICAgIGNvbnN0IHZhbCA9IHByb3BWYWx1ZSAhPT0gdm9pZCAwXG4gICAgICAgID8gcHJvcFZhbHVlXG4gICAgICAgIDogZGVmYXVsdFZhbFxuXG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHZhbFxuICAgICAgICA6IG9wdCA9PiAob3B0ICE9PSBudWxsICYmIHR5cGVvZiBvcHQgPT09ICdvYmplY3QnICYmIHZhbCBpbiBvcHQgPyBvcHRbIHZhbCBdIDogb3B0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzT3B0aW9uU2VsZWN0ZWQgKG9wdCkge1xuICAgICAgY29uc3QgdmFsID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuICAgICAgcmV0dXJuIGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmZpbmQodiA9PiBpc0RlZXBFcXVhbCh2LCB2YWwpKSAhPT0gdm9pZCAwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0SW5wdXRUZXh0IChlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAmJiAoZSA9PT0gdm9pZCAwIHx8ICh0YXJnZXRSZWYudmFsdWUgPT09IGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlID09PSBzZWxlY3RlZFN0cmluZy52YWx1ZSkpXG4gICAgICApIHtcbiAgICAgICAgdGFyZ2V0UmVmLnZhbHVlLnNlbGVjdCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRLZXl1cCAoZSkge1xuICAgICAgLy8gaWYgRVNDIGFuZCB3ZSBoYXZlIGFuIG9wZW5lZCBtZW51XG4gICAgICAvLyB0aGVuIHN0b3AgcHJvcGFnYXRpb24gKG1pZ2h0IGJlIGNhdWdodCBieSBhIFFEaWFsb2dcbiAgICAgIC8vIGFuZCBzbyBpdCB3aWxsIGFsc28gY2xvc2UgdGhlIFFEaWFsb2csIHdoaWNoIGlzIHdyb25nKVxuICAgICAgaWYgKGlzS2V5Q29kZShlLCAyNykgPT09IHRydWUgJiYgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdG9wKGUpXG4gICAgICAgIC8vIG9uIEVTQyB3ZSBuZWVkIHRvIGNsb3NlIHRoZSBkaWFsb2cgYWxzb1xuICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICByZXNldElucHV0VmFsdWUoKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdrZXl1cCcsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRBdXRvY29tcGxldGUgKGUpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0XG5cbiAgICAgIGlmIChlLmtleUNvZGUgIT09IHZvaWQgMCkge1xuICAgICAgICBvblRhcmdldEtleXVwKGUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnXG4gICAgICBjbGVhclRpbWVvdXQoaW5wdXRUaW1lcilcbiAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbmVlZGxlID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UoKVxuICAgICAgICBjb25zdCBmaW5kRm4gPSBleHRyYWN0Rm4gPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHByb3BzLm9wdGlvbnMuZmluZChvcHQgPT4gZXh0cmFjdEZuLnZhbHVlKG9wdCkudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gbmVlZGxlKVxuXG4gICAgICAgICAgaWYgKG9wdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5pbmRleE9mKG9wdGlvbikgPT09IC0xKSB7XG4gICAgICAgICAgICB0b2dnbGVPcHRpb24ob3B0aW9uKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxsRm4gPSBhZnRlckZpbHRlciA9PiB7XG4gICAgICAgICAgaWYgKGZpbmRGbihnZXRPcHRpb25WYWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZmluZEZuKGdldE9wdGlvbkxhYmVsKSA9PT0gdHJ1ZSB8fCBhZnRlckZpbHRlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlsdGVyKHZhbHVlLCB0cnVlLCAoKSA9PiBmaWxsRm4odHJ1ZSkpXG4gICAgICAgIH1cblxuICAgICAgICBmaWxsRm4oKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLmNsZWFyVmFsdWUoZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEtleXByZXNzIChlKSB7XG4gICAgICBlbWl0KCdrZXlwcmVzcycsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRLZXlkb3duIChlKSB7XG4gICAgICBlbWl0KCdrZXlkb3duJywgZSlcblxuICAgICAgaWYgKHNob3VsZElnbm9yZUtleShlKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3VmFsdWVNb2RlVmFsaWQgPSBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA+IDBcbiAgICAgICAgJiYgKHByb3BzLm5ld1ZhbHVlTW9kZSAhPT0gdm9pZCAwIHx8IHByb3BzLm9uTmV3VmFsdWUgIT09IHZvaWQgMClcblxuICAgICAgY29uc3QgdGFiU2hvdWxkU2VsZWN0ID0gZS5zaGlmdEtleSAhPT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAmJiAob3B0aW9uSW5kZXgudmFsdWUgPiAtMSB8fCBuZXdWYWx1ZU1vZGVWYWxpZCA9PT0gdHJ1ZSlcblxuICAgICAgLy8gZXNjYXBlXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICBwcmV2ZW50KGUpIC8vIHByZXZlbnQgY2xlYXJpbmcgdGhlIGlucHV0VmFsdWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIHRhYlxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSAmJiB0YWJTaG91bGRTZWxlY3QgPT09IGZhbHNlKSB7XG4gICAgICAgIGNsb3NlTWVudSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQgPT09IHZvaWQgMCB8fCBlLnRhcmdldC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKSB7IHJldHVybiB9XG5cbiAgICAgIC8vIGRvd25cbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlID09PSA0MFxuICAgICAgICAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgbWVudS52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBzaG93UG9wdXAoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gYmFja3NwYWNlXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSA9PT0gOFxuICAgICAgICAmJiBwcm9wcy5oaWRlU2VsZWN0ZWQgIT09IHRydWVcbiAgICAgICAgJiYgaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgICkge1xuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJlbW92ZUF0SW5kZXgocHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggLSAxKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlICYmIHByb3BzLm1vZGVsVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIGhvbWUsIGVuZCAtIDM2LCAzNVxuICAgICAgaWYgKFxuICAgICAgICAoZS5rZXlDb2RlID09PSAzNSB8fCBlLmtleUNvZGUgPT09IDM2KVxuICAgICAgICAmJiAodHlwZW9mIGlucHV0VmFsdWUudmFsdWUgIT09ICdzdHJpbmcnIHx8IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID09PSAwKVxuICAgICAgKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIG9wdGlvbkluZGV4LnZhbHVlID0gLTFcbiAgICAgICAgbW92ZU9wdGlvblNlbGVjdGlvbihlLmtleUNvZGUgPT09IDM2ID8gMSA6IC0xLCBwcm9wcy5tdWx0aXBsZSlcbiAgICAgIH1cblxuICAgICAgLy8gcGcgdXAsIHBnIGRvd24gLSAzMywgMzRcbiAgICAgIGlmIChcbiAgICAgICAgKGUua2V5Q29kZSA9PT0gMzMgfHwgZS5rZXlDb2RlID09PSAzNClcbiAgICAgICAgJiYgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlICE9PSB2b2lkIDBcbiAgICAgICkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IE1hdGgubWF4KFxuICAgICAgICAgIC0xLFxuICAgICAgICAgIE1hdGgubWluKFxuICAgICAgICAgICAgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSxcbiAgICAgICAgICAgIG9wdGlvbkluZGV4LnZhbHVlICsgKGUua2V5Q29kZSA9PT0gMzMgPyAtMSA6IDEpICogdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlLnZpZXdcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgbW92ZU9wdGlvblNlbGVjdGlvbihlLmtleUNvZGUgPT09IDMzID8gMSA6IC0xLCBwcm9wcy5tdWx0aXBsZSlcbiAgICAgIH1cblxuICAgICAgLy8gdXAsIGRvd25cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4IHx8IGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgbW92ZU9wdGlvblNlbGVjdGlvbihlLmtleUNvZGUgPT09IDM4ID8gLTEgOiAxLCBwcm9wcy5tdWx0aXBsZSlcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3B0aW9uc0xlbmd0aCA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcblxuICAgICAgLy8gY2xlYXIgc2VhcmNoIGJ1ZmZlciBpZiBleHBpcmVkXG4gICAgICBpZiAoc2VhcmNoQnVmZmVyID09PSB2b2lkIDAgfHwgc2VhcmNoQnVmZmVyRXhwIDwgRGF0ZS5ub3coKSkge1xuICAgICAgICBzZWFyY2hCdWZmZXIgPSAnJ1xuICAgICAgfVxuXG4gICAgICAvLyBrZXlib2FyZCBzZWFyY2ggd2hlbiBub3QgaGF2aW5nIHVzZS1pbnB1dFxuICAgICAgaWYgKFxuICAgICAgICBvcHRpb25zTGVuZ3RoID4gMFxuICAgICAgICAmJiBwcm9wcy51c2VJbnB1dCAhPT0gdHJ1ZVxuICAgICAgICAmJiBlLmtleSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGUua2V5Lmxlbmd0aCA9PT0gMSAvLyBwcmludGFibGUgY2hhclxuICAgICAgICAmJiBlLmFsdEtleSA9PT0gZS5jdHJsS2V5IC8vIG5vdCBrYmQgc2hvcnRjdXRcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gMzIgfHwgc2VhcmNoQnVmZmVyLmxlbmd0aCA+IDApIC8vIHNwYWNlIGluIG1pZGRsZSBvZiBzZWFyY2hcbiAgICAgICkge1xuICAgICAgICBtZW51LnZhbHVlICE9PSB0cnVlICYmIHNob3dQb3B1cChlKVxuXG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgY2hhciA9IGUua2V5LnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgICAgICAga2V5UmVwZWF0ID0gc2VhcmNoQnVmZmVyLmxlbmd0aCA9PT0gMSAmJiBzZWFyY2hCdWZmZXJbIDAgXSA9PT0gY2hhclxuXG4gICAgICAgIHNlYXJjaEJ1ZmZlckV4cCA9IERhdGUubm93KCkgKyAxNTAwXG4gICAgICAgIGlmIChrZXlSZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICBzZWFyY2hCdWZmZXIgKz0gY2hhclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoUmUgPSBuZXcgUmVnRXhwKCdeJyArIHNlYXJjaEJ1ZmZlci5zcGxpdCgnJykubWFwKGwgPT4gKHJlRXNjYXBlTGlzdC5pbmRleE9mKGwpID4gLTEgPyAnXFxcXCcgKyBsIDogbCkpLmpvaW4oJy4qJyksICdpJylcblxuICAgICAgICBsZXQgaW5kZXggPSBvcHRpb25JbmRleC52YWx1ZVxuXG4gICAgICAgIGlmIChrZXlSZXBlYXQgPT09IHRydWUgfHwgaW5kZXggPCAwIHx8IHNlYXJjaFJlLnRlc3QoZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkpICE9PSB0cnVlKSB7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgaW5kZXggPSBub3JtYWxpemVUb0ludGVydmFsKGluZGV4ICsgMSwgLTEsIG9wdGlvbnNMZW5ndGggLSAxKVxuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoaW5kZXggIT09IG9wdGlvbkluZGV4LnZhbHVlICYmIChcbiAgICAgICAgICAgIGlzT3B0aW9uRGlzYWJsZWQudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkgPT09IHRydWVcbiAgICAgICAgICAgIHx8IHNlYXJjaFJlLnRlc3QoZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkpICE9PSB0cnVlXG4gICAgICAgICAgKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBzZXRPcHRpb25JbmRleChpbmRleClcbiAgICAgICAgICAgIHNjcm9sbFRvKGluZGV4KVxuXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZShnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIGVudGVyLCBzcGFjZSAod2hlbiBub3QgdXNpbmcgdXNlLWlucHV0IGFuZCBub3QgaW4gc2VhcmNoKSwgb3IgdGFiICh3aGVuIG5vdCB1c2luZyBtdWx0aXBsZSBhbmQgb3B0aW9uIHNlbGVjdGVkKVxuICAgICAgLy8gc2FtZSB0YXJnZXQgaXMgY2hlY2tlZCBhYm92ZVxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgIT09IDEzXG4gICAgICAgICYmIChlLmtleUNvZGUgIT09IDMyIHx8IHByb3BzLnVzZUlucHV0ID09PSB0cnVlIHx8IHNlYXJjaEJ1ZmZlciAhPT0gJycpXG4gICAgICAgICYmIChlLmtleUNvZGUgIT09IDkgfHwgdGFiU2hvdWxkU2VsZWN0ID09PSBmYWxzZSlcbiAgICAgICkgeyByZXR1cm4gfVxuXG4gICAgICBlLmtleUNvZGUgIT09IDkgJiYgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlID4gLTEgJiYgb3B0aW9uSW5kZXgudmFsdWUgPCBvcHRpb25zTGVuZ3RoKSB7XG4gICAgICAgIHRvZ2dsZU9wdGlvbihwcm9wcy5vcHRpb25zWyBvcHRpb25JbmRleC52YWx1ZSBdKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlTW9kZVZhbGlkID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGRvbmUgPSAodmFsLCBtb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZU5ld1ZhbHVlTW9kZShtb2RlKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb2RlID0gcHJvcHMubmV3VmFsdWVNb2RlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdXBkYXRlSW5wdXRWYWx1ZSgnJywgcHJvcHMubXVsdGlwbGUgIT09IHRydWUsIHRydWUpXG5cbiAgICAgICAgICBjb25zdCBmbiA9IG1vZGUgPT09ICd0b2dnbGUnID8gdG9nZ2xlT3B0aW9uIDogYWRkXG4gICAgICAgICAgZm4odmFsLCBtb2RlID09PSAnYWRkLXVuaXF1ZScpXG5cbiAgICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMub25OZXdWYWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgZW1pdCgnbmV3LXZhbHVlJywgaW5wdXRWYWx1ZS52YWx1ZSwgZG9uZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkb25lKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHNob3dQb3B1cCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbEVsICgpIHtcbiAgICAgIHJldHVybiBoYXNEaWFsb2cgPT09IHRydWVcbiAgICAgICAgPyBtZW51Q29udGVudFJlZi52YWx1ZVxuICAgICAgICA6IChcbiAgICAgICAgICAgIG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZS5fX3FQb3J0YWxJbm5lclJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICAgICA/IG1lbnVSZWYudmFsdWUuX19xUG9ydGFsSW5uZXJSZWYudmFsdWVcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCAoKSB7XG4gICAgICByZXR1cm4gZ2V0VmlydHVhbFNjcm9sbEVsKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3Rpb24gKCkge1xuICAgICAgaWYgKHByb3BzLmhpZGVTZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cblxuICAgICAgaWYgKHNsb3RzWyAnc2VsZWN0ZWQtaXRlbScgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFNjb3BlLnZhbHVlLm1hcChzY29wZSA9PiBzbG90c1sgJ3NlbGVjdGVkLWl0ZW0nIF0oc2NvcGUpKS5zbGljZSgpXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90cy5zZWxlY3RlZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoc2xvdHMuc2VsZWN0ZWQoKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnVzZUNoaXBzID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFNjb3BlLnZhbHVlLm1hcCgoc2NvcGUsIGkpID0+IGgoUUNoaXAsIHtcbiAgICAgICAgICBrZXk6ICdvcHRpb24tJyArIGksXG4gICAgICAgICAgcmVtb3ZhYmxlOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBpc09wdGlvbkRpc2FibGVkLnZhbHVlKHNjb3BlLm9wdCkgIT09IHRydWUsXG4gICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgdGV4dENvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgb25SZW1vdmUgKCkgeyBzY29wZS5yZW1vdmVBdEluZGV4KGkpIH1cbiAgICAgICAgfSwgKCkgPT4gaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ2VsbGlwc2lzJyxcbiAgICAgICAgICBbIHNjb3BlLmh0bWwgPT09IHRydWUgPyAnaW5uZXJIVE1MJyA6ICd0ZXh0Q29udGVudCcgXTogZ2V0T3B0aW9uTGFiZWwudmFsdWUoc2NvcGUub3B0KVxuICAgICAgICB9KSkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXG4gICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgWyB2YWx1ZUFzSHRtbC52YWx1ZSA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyBdOiBwcm9wcy5kaXNwbGF5VmFsdWUgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBwcm9wcy5kaXNwbGF5VmFsdWVcbiAgICAgICAgICAgIDogc2VsZWN0ZWRTdHJpbmcudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbGxPcHRpb25zICgpIHtcbiAgICAgIGlmIChub09wdGlvbnMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzWyAnbm8tb3B0aW9uJyBdKHsgaW5wdXRWYWx1ZTogaW5wdXRWYWx1ZS52YWx1ZSB9KVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZuID0gc2xvdHMub3B0aW9uICE9PSB2b2lkIDBcbiAgICAgICAgPyBzbG90cy5vcHRpb25cbiAgICAgICAgOiBzY29wZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGgoUUl0ZW0sIHtcbiAgICAgICAgICAgIGtleTogc2NvcGUuaW5kZXgsXG4gICAgICAgICAgICAuLi5zY29wZS5pdGVtUHJvcHNcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaChcbiAgICAgICAgICAgICAgUUl0ZW1TZWN0aW9uLFxuICAgICAgICAgICAgICAoKSA9PiBoKFxuICAgICAgICAgICAgICAgIFFJdGVtTGFiZWwsXG4gICAgICAgICAgICAgICAgKCkgPT4gaCgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgIFsgc2NvcGUuaHRtbCA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyBdOiBzY29wZS5sYWJlbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgIGxldCBvcHRpb25zID0gcGFkVmlydHVhbFNjcm9sbCgnZGl2Jywgb3B0aW9uU2NvcGUudmFsdWUubWFwKGZuKSlcblxuICAgICAgaWYgKHNsb3RzWyAnYmVmb3JlLW9wdGlvbnMnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0gc2xvdHNbICdiZWZvcmUtb3B0aW9ucycgXSgpLmNvbmNhdChvcHRpb25zKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaE1lcmdlU2xvdChzbG90c1sgJ2FmdGVyLW9wdGlvbnMnIF0sIG9wdGlvbnMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SW5wdXQgKGZyb21EaWFsb2csIGlzVGFyZ2V0KSB7XG4gICAgICBjb25zdCBhdHRycyA9IGlzVGFyZ2V0ID09PSB0cnVlID8geyAuLi5jb21ib2JveEF0dHJzLnZhbHVlLCAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUgfSA6IHZvaWQgMFxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6IGlzVGFyZ2V0ID09PSB0cnVlID8gdGFyZ2V0UmVmIDogdm9pZCAwLFxuICAgICAgICBrZXk6ICdpX3QnLFxuICAgICAgICBjbGFzczogY29tcHV0ZWRJbnB1dENsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogcHJvcHMuaW5wdXRTdHlsZSxcbiAgICAgICAgdmFsdWU6IGlucHV0VmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlucHV0VmFsdWUudmFsdWUgOiAnJyxcbiAgICAgICAgLy8gcmVxdWlyZWQgZm9yIEFuZHJvaWQgaW4gb3JkZXIgdG8gc2hvdyBFTlRFUiBrZXkgd2hlbiBpbiBmb3JtXG4gICAgICAgIHR5cGU6ICdzZWFyY2gnLFxuICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgaWQ6IGlzVGFyZ2V0ID09PSB0cnVlID8gc3RhdGUudGFyZ2V0VWlkLnZhbHVlIDogdm9pZCAwLFxuICAgICAgICBtYXhsZW5ndGg6IHByb3BzLm1heGxlbmd0aCxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiBwcm9wcy5hdXRvY29tcGxldGUsXG4gICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IChmcm9tRGlhbG9nICE9PSB0cnVlICYmIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSkgfHwgdm9pZCAwLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlLFxuICAgICAgICAuLi5pbnB1dENvbnRyb2xFdmVudHMudmFsdWVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21EaWFsb2cgIT09IHRydWUgJiYgaGFzRGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuY2xhc3MpID09PSB0cnVlKSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyA9IFsgLi4uZGF0YS5jbGFzcywgJ25vLXBvaW50ZXItZXZlbnRzJyBdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyArPSAnIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdpbnB1dCcsIGRhdGEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KGlucHV0VGltZXIpXG5cbiAgICAgIGlmIChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHNldElucHV0VmFsdWUoZS50YXJnZXQudmFsdWUgfHwgJycpXG4gICAgICAvLyBtYXJrIGl0IGhlcmUgYXMgdXNlciBpbnB1dCBzbyB0aGF0IGlmIHVwZGF0ZUlucHV0VmFsdWUgaXMgY2FsbGVkXG4gICAgICAvLyBiZWZvcmUgZmlsdGVyIGlzIGNhbGxlZCB0aGUgaW5kaWNhdG9yIGlzIHJlc2V0XG4gICAgICB1c2VySW5wdXRWYWx1ZSA9IHRydWVcbiAgICAgIGRlZmF1bHRJbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS52YWx1ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgKGhhc0RpYWxvZyAhPT0gdHJ1ZSB8fCBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPT09IHRydWUpXG4gICAgICApIHtcbiAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBpbnB1dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZmlsdGVyKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICAgIH0sIHByb3BzLmlucHV0RGVib3VuY2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZSAodmFsKSB7XG4gICAgICBpZiAoaW5wdXRWYWx1ZS52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIGlucHV0VmFsdWUudmFsdWUgPSB2YWxcbiAgICAgICAgZW1pdCgnaW5wdXQtdmFsdWUnLCB2YWwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlSW5wdXRWYWx1ZSAodmFsLCBub0ZpbHRlcmluZywgaW50ZXJuYWwpIHtcbiAgICAgIHVzZXJJbnB1dFZhbHVlID0gaW50ZXJuYWwgIT09IHRydWVcblxuICAgICAgaWYgKHByb3BzLnVzZUlucHV0ID09PSB0cnVlKSB7XG4gICAgICAgIHNldElucHV0VmFsdWUodmFsKVxuXG4gICAgICAgIGlmIChub0ZpbHRlcmluZyA9PT0gdHJ1ZSB8fCBpbnRlcm5hbCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGRlZmF1bHRJbnB1dFZhbHVlID0gdmFsXG4gICAgICAgIH1cblxuICAgICAgICBub0ZpbHRlcmluZyAhPT0gdHJ1ZSAmJiBmaWx0ZXIodmFsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlciAodmFsLCBrZWVwQ2xvc2VkLCBhZnRlclVwZGF0ZUZuKSB7XG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgPT09IHZvaWQgMCB8fCAoa2VlcENsb3NlZCAhPT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlICE9PSB0cnVlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCdmaWx0ZXItYWJvcnQnKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IHRydWVcbiAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHZhbCAhPT0gJydcbiAgICAgICAgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWVcbiAgICAgICAgJiYgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPiAwXG4gICAgICAgICYmIHVzZXJJbnB1dFZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIHZhbCA9PT0gZ2V0T3B0aW9uTGFiZWwudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKVxuICAgICAgKSB7XG4gICAgICAgIHZhbCA9ICcnXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvY2FsRmlsdGVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiAobWVudS52YWx1ZSA9IGZhbHNlKVxuICAgICAgfSwgMTApXG5cbiAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgIGZpbHRlcklkID0gbG9jYWxGaWx0ZXJJZFxuXG4gICAgICBlbWl0KFxuICAgICAgICAnZmlsdGVyJyxcbiAgICAgICAgdmFsLFxuICAgICAgICAoZm4sIGFmdGVyRm4pID0+IHtcbiAgICAgICAgICBpZiAoKGtlZXBDbG9zZWQgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkgJiYgZmlsdGVySWQgPT09IGxvY2FsRmlsdGVySWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcblxuICAgICAgICAgICAgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIGZuKClcblxuICAgICAgICAgICAgLy8gaGlkZSBpbmRpY2F0b3IgdG8gYWxsb3cgYXJyb3cgdG8gYW5pbWF0ZVxuICAgICAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gZmFsc2VcblxuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuXG4gICAgICAgICAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChrZWVwQ2xvc2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIGhpZGVQb3B1cCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU1lbnUodHJ1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBtZW51LnZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHR5cGVvZiBhZnRlckZuID09PSAnZnVuY3Rpb24nICYmIG5leHRUaWNrKCgpID0+IHsgYWZ0ZXJGbihwcm94eSkgfSlcbiAgICAgICAgICAgICAgdHlwZW9mIGFmdGVyVXBkYXRlRm4gPT09ICdmdW5jdGlvbicgJiYgbmV4dFRpY2soKCkgPT4geyBhZnRlclVwZGF0ZUZuKHByb3h5KSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSAmJiBmaWx0ZXJJZCA9PT0gbG9jYWxGaWx0ZXJJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuICAgICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgKG1lbnUudmFsdWUgPSBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1lbnUgKCkge1xuICAgICAgcmV0dXJuIGgoUU1lbnUsIHtcbiAgICAgICAgcmVmOiBtZW51UmVmLFxuICAgICAgICBjbGFzczogbWVudUNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHByb3BzLnBvcHVwQ29udGVudFN0eWxlLFxuICAgICAgICBtb2RlbFZhbHVlOiBtZW51LnZhbHVlLFxuICAgICAgICBmaXQ6IHByb3BzLm1lbnVTaHJpbmsgIT09IHRydWUsXG4gICAgICAgIGNvdmVyOiBwcm9wcy5vcHRpb25zQ292ZXIgPT09IHRydWUgJiYgbm9PcHRpb25zLnZhbHVlICE9PSB0cnVlICYmIHByb3BzLnVzZUlucHV0ICE9PSB0cnVlLFxuICAgICAgICBhbmNob3I6IHByb3BzLm1lbnVBbmNob3IsXG4gICAgICAgIHNlbGY6IHByb3BzLm1lbnVTZWxmLFxuICAgICAgICBvZmZzZXQ6IHByb3BzLm1lbnVPZmZzZXQsXG4gICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgIG5vUGFyZW50RXZlbnQ6IHRydWUsXG4gICAgICAgIG5vUmVmb2N1czogdHJ1ZSxcbiAgICAgICAgbm9Gb2N1czogdHJ1ZSxcbiAgICAgICAgc3F1YXJlOiBzcXVhcmVkTWVudS52YWx1ZSxcbiAgICAgICAgdHJhbnNpdGlvblNob3c6IHByb3BzLnRyYW5zaXRpb25TaG93LFxuICAgICAgICB0cmFuc2l0aW9uSGlkZTogcHJvcHMudHJhbnNpdGlvbkhpZGUsXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgICBzZXBhcmF0ZUNsb3NlUG9wdXA6IHRydWUsXG4gICAgICAgIC4uLmxpc3Rib3hBdHRycy52YWx1ZSxcbiAgICAgICAgb25TY3JvbGxQYXNzaXZlOiBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgICAgIG9uQmVmb3JlU2hvdzogb25Db250cm9sUG9wdXBTaG93LFxuICAgICAgICBvbkJlZm9yZUhpZGU6IG9uTWVudUJlZm9yZUhpZGUsXG4gICAgICAgIG9uU2hvdzogb25NZW51U2hvd1xuICAgICAgfSwgZ2V0QWxsT3B0aW9ucylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1lbnVCZWZvcmVIaWRlIChlKSB7XG4gICAgICBvbkNvbnRyb2xQb3B1cEhpZGUoZSlcbiAgICAgIGNsb3NlTWVudSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NZW51U2hvdyAoKSB7XG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dGaWVsZEZvY3VzIChlKSB7XG4gICAgICBzdG9wKGUpXG4gICAgICB0YXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgdGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgIGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9IHRydWVcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dGaWVsZEJsdXIgKGUpIHtcbiAgICAgIHN0b3AoZSlcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGlhbG9nICgpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXG4gICAgICAgIGgoUUZpZWxkLCB7XG4gICAgICAgICAgY2xhc3M6IGBjb2wtYXV0byAkeyBzdGF0ZS5maWVsZENsYXNzLnZhbHVlIH1gLFxuICAgICAgICAgIC4uLmlubmVyRmllbGRQcm9wcy52YWx1ZSxcbiAgICAgICAgICBmb3I6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgICAgICBkYXJrOiBpc09wdGlvbnNEYXJrLnZhbHVlLFxuICAgICAgICAgIHNxdWFyZTogdHJ1ZSxcbiAgICAgICAgICBsb2FkaW5nOiBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUsXG4gICAgICAgICAgaXRlbUFsaWduZWQ6IGZhbHNlLFxuICAgICAgICAgIGZpbGxlZDogdHJ1ZSxcbiAgICAgICAgICBzdGFja0xhYmVsOiBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA+IDAsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWUsXG4gICAgICAgICAgb25Gb2N1czogb25EaWFsb2dGaWVsZEZvY3VzLFxuICAgICAgICAgIG9uQmx1cjogb25EaWFsb2dGaWVsZEJsdXJcbiAgICAgICAgfSwge1xuICAgICAgICAgIC4uLnNsb3RzLFxuICAgICAgICAgIHJhd0NvbnRyb2w6ICgpID0+IHN0YXRlLmdldENvbnRyb2wodHJ1ZSksXG4gICAgICAgICAgYmVmb3JlOiB2b2lkIDAsXG4gICAgICAgICAgYWZ0ZXI6IHZvaWQgMFxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIGNvbnRlbnQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogbWVudUNvbnRlbnRSZWYsXG4gICAgICAgICAgY2xhc3M6IG1lbnVDb250ZW50Q2xhc3MudmFsdWUgKyAnIHNjcm9sbCcsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLnBvcHVwQ29udGVudFN0eWxlLFxuICAgICAgICAgIC4uLmxpc3Rib3hBdHRycy52YWx1ZSxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50LFxuICAgICAgICAgIG9uU2Nyb2xsUGFzc2l2ZTogb25WaXJ0dWFsU2Nyb2xsRXZ0XG4gICAgICAgIH0sIGdldEFsbE9wdGlvbnMoKSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoUURpYWxvZywge1xuICAgICAgICByZWY6IGRpYWxvZ1JlZixcbiAgICAgICAgbW9kZWxWYWx1ZTogZGlhbG9nLnZhbHVlLFxuICAgICAgICBwb3NpdGlvbjogcHJvcHMudXNlSW5wdXQgPT09IHRydWUgPyAndG9wJyA6IHZvaWQgMCxcbiAgICAgICAgdHJhbnNpdGlvblNob3c6IHRyYW5zaXRpb25TaG93Q29tcHV0ZWQsXG4gICAgICAgIHRyYW5zaXRpb25IaWRlOiBwcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgIG9uQmVmb3JlU2hvdzogb25Db250cm9sUG9wdXBTaG93LFxuICAgICAgICBvbkJlZm9yZUhpZGU6IG9uRGlhbG9nQmVmb3JlSGlkZSxcbiAgICAgICAgb25IaWRlOiBvbkRpYWxvZ0hpZGUsXG4gICAgICAgIG9uU2hvdzogb25EaWFsb2dTaG93XG4gICAgICB9LCAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1zZWxlY3RfX2RpYWxvZydcbiAgICAgICAgICArIChpc09wdGlvbnNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNlbGVjdF9fZGlhbG9nLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICAgICArIChkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPT09IHRydWUgPyAnIHEtc2VsZWN0X19kaWFsb2ctLWZvY3VzZWQnIDogJycpXG4gICAgICB9LCBjb250ZW50KSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0JlZm9yZUhpZGUgKGUpIHtcbiAgICAgIG9uQ29udHJvbFBvcHVwSGlkZShlKVxuXG4gICAgICBpZiAoZGlhbG9nUmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGRpYWxvZ1JlZi52YWx1ZS5fX3VwZGF0ZVJlZm9jdXNUYXJnZXQoXG4gICAgICAgICAgc3RhdGUucm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCcucS1maWVsZF9fbmF0aXZlID4gW3RhYmluZGV4XTpsYXN0LWNoaWxkJylcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0hpZGUgKGUpIHtcbiAgICAgIGhpZGVQb3B1cCgpXG4gICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSAmJiBlbWl0KCdibHVyJywgZSlcbiAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dTaG93ICgpIHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgaWYgKFxuICAgICAgICAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSlcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIHRhcmdldFJlZi52YWx1ZSAhPT0gZWxcbiAgICAgICkge1xuICAgICAgICB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNZW51ICgpIHtcbiAgICAgIGlmIChkaWFsb2cudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIG9wdGlvbkluZGV4LnZhbHVlID0gLTFcblxuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgbWVudS52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG4gICAgICAgIGZpbHRlcklkID0gdm9pZCAwXG5cbiAgICAgICAgaWYgKHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGVtaXQoJ2ZpbHRlci1hYm9ydCcpXG4gICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1BvcHVwIChlKSB7XG4gICAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNEaWFsb2cgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub25Db250cm9sRm9jdXNpbihlKVxuICAgICAgICBkaWFsb2cudmFsdWUgPSB0cnVlXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBmaWx0ZXIoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG5vT3B0aW9ucy52YWx1ZSAhPT0gdHJ1ZSB8fCBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1lbnUudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZVBvcHVwICgpIHtcbiAgICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlXG4gICAgICBjbG9zZU1lbnUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0SW5wdXRWYWx1ZSAoKSB7XG4gICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSAmJiB1cGRhdGVJbnB1dFZhbHVlKFxuICAgICAgICBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgJiYgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPiAwXG4gICAgICAgICAgPyBnZXRPcHRpb25MYWJlbC52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pIHx8ICcnXG4gICAgICAgICAgOiAnJyxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1lbnUgKHNob3cpIHtcbiAgICAgIGxldCBvcHRpb25JbmRleCA9IC0xXG5cbiAgICAgIGlmIChzaG93ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCB2YWwgPSBnZXRPcHRpb25WYWx1ZS52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pXG4gICAgICAgICAgb3B0aW9uSW5kZXggPSBwcm9wcy5vcHRpb25zLmZpbmRJbmRleCh2ID0+IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKHYpLCB2YWwpKVxuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwob3B0aW9uSW5kZXgpXG4gICAgICB9XG5cbiAgICAgIHNldE9wdGlvbkluZGV4KG9wdGlvbkluZGV4KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcmVuZGVyTWVudSAobmV3TGVuZ3RoLCBvbGRMZW5ndGgpIHtcbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwoLTEsIHRydWUpXG5cbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChuZXdMZW5ndGggPiBvbGRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHVwZGF0ZU1lbnUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWVudVBvc2l0aW9uICgpIHtcbiAgICAgIGlmIChkaWFsb2cudmFsdWUgPT09IGZhbHNlICYmIG1lbnVSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgbWVudVJlZi52YWx1ZS51cGRhdGVQb3NpdGlvbigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250cm9sUG9wdXBTaG93IChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuICAgICAgZW1pdCgncG9wdXAtc2hvdycsIGUpXG4gICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250cm9sUG9wdXBIaWRlIChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuICAgICAgZW1pdCgncG9wdXAtaGlkZScsIGUpXG4gICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSBmYWxzZVxuICAgICAgc3RhdGUub25Db250cm9sRm9jdXNvdXQoZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQcmVTdGF0ZSAoKSB7XG4gICAgICBoYXNEaWFsb2cgPSAkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUgJiYgcHJvcHMuYmVoYXZpb3IgIT09ICdkaWFsb2cnXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiBwcm9wcy5iZWhhdmlvciAhPT0gJ21lbnUnICYmIChcbiAgICAgICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwIHx8IHByb3BzLm9uRmlsdGVyICE9PSB2b2lkIDAgfHwgbm9PcHRpb25zLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAgICAgOiB0cnVlXG4gICAgICAgIClcblxuICAgICAgdHJhbnNpdGlvblNob3dDb21wdXRlZCA9ICRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSAmJiBoYXNEaWFsb2cgPT09IHRydWUgJiYgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgPyAnZmFkZSdcbiAgICAgICAgOiBwcm9wcy50cmFuc2l0aW9uU2hvd1xuICAgIH1cblxuICAgIG9uQmVmb3JlVXBkYXRlKHVwZGF0ZVByZVN0YXRlKVxuICAgIG9uVXBkYXRlZCh1cGRhdGVNZW51UG9zaXRpb24pXG5cbiAgICB1cGRhdGVQcmVTdGF0ZSgpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KGlucHV0VGltZXIpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHNob3dQb3B1cCwgaGlkZVBvcHVwLFxuICAgICAgcmVtb3ZlQXRJbmRleCwgYWRkLCB0b2dnbGVPcHRpb24sXG4gICAgICBnZXRPcHRpb25JbmRleDogKCkgPT4gb3B0aW9uSW5kZXgudmFsdWUsXG4gICAgICBzZXRPcHRpb25JbmRleCwgbW92ZU9wdGlvblNlbGVjdGlvbixcbiAgICAgIGZpbHRlciwgdXBkYXRlTWVudVBvc2l0aW9uLCB1cGRhdGVJbnB1dFZhbHVlLFxuICAgICAgaXNPcHRpb25TZWxlY3RlZCxcbiAgICAgIGdldEVtaXR0aW5nT3B0aW9uVmFsdWUsXG4gICAgICBpc09wdGlvbkRpc2FibGVkOiAoLi4uYXJncykgPT4gaXNPcHRpb25EaXNhYmxlZC52YWx1ZS5hcHBseShudWxsLCBhcmdzKSA9PT0gdHJ1ZSxcbiAgICAgIGdldE9wdGlvblZhbHVlOiAoLi4uYXJncykgPT4gZ2V0T3B0aW9uVmFsdWUudmFsdWUuYXBwbHkobnVsbCwgYXJncyksXG4gICAgICBnZXRPcHRpb25MYWJlbDogKC4uLmFyZ3MpID0+IGdldE9wdGlvbkxhYmVsLnZhbHVlLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICAgIGlubmVyVmFsdWUsXG5cbiAgICAgIGZpZWxkQ2xhc3M6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGBxLXNlbGVjdCBxLWZpZWxkLS1hdXRvLWhlaWdodCBxLXNlbGVjdC0td2l0aCR7IHByb3BzLnVzZUlucHV0ICE9PSB0cnVlID8gJ291dCcgOiAnJyB9LWlucHV0YFxuICAgICAgICArIGAgcS1zZWxlY3QtLXdpdGgkeyBwcm9wcy51c2VDaGlwcyAhPT0gdHJ1ZSA/ICdvdXQnIDogJycgfS1jaGlwc2BcbiAgICAgICAgKyBgIHEtc2VsZWN0LS0keyBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/ICdtdWx0aXBsZScgOiAnc2luZ2xlJyB9YFxuICAgICAgKSxcblxuICAgICAgaW5wdXRSZWYsXG4gICAgICB0YXJnZXRSZWYsXG4gICAgICBoYXNWYWx1ZSxcbiAgICAgIHNob3dQb3B1cCxcblxuICAgICAgZmxvYXRpbmdMYWJlbDogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKHByb3BzLmhpZGVTZWxlY3RlZCAhPT0gdHJ1ZSAmJiBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgfHwgdHlwZW9mIGlucHV0VmFsdWUudmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgIHx8IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID4gMFxuICAgICAgICB8fCBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMuZGlzcGxheVZhbHVlKVxuICAgICAgKSxcblxuICAgICAgZ2V0Q29udHJvbENoaWxkOiAoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gZmFsc2UgJiYgKFxuICAgICAgICAgICAgZGlhbG9nLnZhbHVlID09PSB0cnVlIC8vIGRpYWxvZyBhbHdheXMgaGFzIG1lbnUgZGlzcGxheWVkLCBzbyBuZWVkIHRvIHJlbmRlciBpdFxuICAgICAgICAgICAgfHwgbm9PcHRpb25zLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICAgICB8fCBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gaGFzRGlhbG9nID09PSB0cnVlID8gZ2V0RGlhbG9nKCkgOiBnZXRNZW51KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS5oYXNQb3B1cE9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBleHBsaWNpdGx5IHNldCBpdCBvdGhlcndpc2UgVEFCIHdpbGwgbm90IGJsdXIgY29tcG9uZW50XG4gICAgICAgICAgc3RhdGUuaGFzUG9wdXBPcGVuID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgY29udHJvbEV2ZW50czoge1xuICAgICAgICBvbkZvY3VzaW4gKGUpIHsgc3RhdGUub25Db250cm9sRm9jdXNpbihlKSB9LFxuICAgICAgICBvbkZvY3Vzb3V0IChlKSB7XG4gICAgICAgICAgc3RhdGUub25Db250cm9sRm9jdXNvdXQoZSwgKCkgPT4ge1xuICAgICAgICAgICAgcmVzZXRJbnB1dFZhbHVlKClcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgb25DbGljayAoZSkge1xuICAgICAgICAgIC8vIGxhYmVsIGZyb20gUUZpZWxkIHdpbGwgcHJvcGFnYXRlIGNsaWNrIG9uIHRoZSBpbnB1dFxuICAgICAgICAgIHByZXZlbnQoZSlcblxuICAgICAgICAgIGlmIChoYXNEaWFsb2cgIT09IHRydWUgJiYgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgICAgIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2hvd1BvcHVwKGUpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGdldENvbnRyb2w6IGZyb21EaWFsb2cgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IGdldFNlbGVjdGlvbigpXG4gICAgICAgIGNvbnN0IGlzVGFyZ2V0ID0gZnJvbURpYWxvZyA9PT0gdHJ1ZSB8fCBkaWFsb2cudmFsdWUgIT09IHRydWUgfHwgaGFzRGlhbG9nICE9PSB0cnVlXG5cbiAgICAgICAgaWYgKHByb3BzLnVzZUlucHV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgY2hpbGQucHVzaChnZXRJbnB1dChmcm9tRGlhbG9nLCBpc1RhcmdldCkpXG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlcmUgY2FuIGJlIG9ubHkgb25lICh3aGVuIGRpYWxvZyBpcyBvcGVuZWQgdGhlIGNvbnRyb2wgaW4gZGlhbG9nIHNob3VsZCBiZSB0YXJnZXQpXG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgYXR0cnMgPSBpc1RhcmdldCA9PT0gdHJ1ZSA/IGNvbWJvYm94QXR0cnMudmFsdWUgOiB2b2lkIDBcblxuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICAgICAgcmVmOiBpc1RhcmdldCA9PT0gdHJ1ZSA/IHRhcmdldFJlZiA6IHZvaWQgMCxcbiAgICAgICAgICAgICAga2V5OiAnZF90JyxcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZm9jdXMtdGFyZ2V0JyxcbiAgICAgICAgICAgICAgaWQ6IGlzVGFyZ2V0ID09PSB0cnVlID8gc3RhdGUudGFyZ2V0VWlkLnZhbHVlIDogdm9pZCAwLFxuICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogKGZyb21EaWFsb2cgIT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlKSB8fCB2b2lkIDAsXG4gICAgICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgICAgICBvbktleWRvd246IG9uVGFyZ2V0S2V5ZG93bixcbiAgICAgICAgICAgICAgb25LZXl1cDogb25UYXJnZXRLZXl1cCxcbiAgICAgICAgICAgICAgb25LZXlwcmVzczogb25UYXJnZXRLZXlwcmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAoaXNUYXJnZXQgPT09IHRydWUgJiYgdHlwZW9mIHByb3BzLmF1dG9jb21wbGV0ZSA9PT0gJ3N0cmluZycgJiYgcHJvcHMuYXV0b2NvbXBsZXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAncS1zZWxlY3RfX2F1dG9jb21wbGV0ZS1pbnB1dCcsXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBwcm9wcy5hdXRvY29tcGxldGUsXG4gICAgICAgICAgICAgICAgb25LZXl1cDogb25UYXJnZXRBdXRvY29tcGxldGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZVByb3AudmFsdWUgIT09IHZvaWQgMCAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBvcHRzID0gaW5uZXJPcHRpb25zVmFsdWUudmFsdWUubWFwKHZhbHVlID0+IGgoJ29wdGlvbicsIHsgdmFsdWUsIHNlbGVjdGVkOiB0cnVlIH0pKVxuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lUHJvcC52YWx1ZSxcbiAgICAgICAgICAgICAgbXVsdGlwbGU6IHByb3BzLm11bHRpcGxlXG4gICAgICAgICAgICB9LCBvcHRzKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF0dHJzID0gcHJvcHMudXNlSW5wdXQgPT09IHRydWUgfHwgaXNUYXJnZXQgIT09IHRydWUgPyB2b2lkIDAgOiBzdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWVcblxuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHJvdyBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIC4uLmF0dHJzXG4gICAgICAgIH0sIGNoaWxkKVxuICAgICAgfSxcblxuICAgICAgZ2V0SW5uZXJBcHBlbmQ6ICgpID0+IChcbiAgICAgICAgcHJvcHMubG9hZGluZyAhPT0gdHJ1ZSAmJiBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgIT09IHRydWUgJiYgcHJvcHMuaGlkZURyb3Bkb3duSWNvbiAhPT0gdHJ1ZVxuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZHJvcGRvd24taWNvbicgKyAobWVudS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcm90YXRlLTE4MCcgOiAnJyksXG4gICAgICAgICAgICAgICAgbmFtZTogZHJvcGRvd25BcnJvd0ljb24udmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IG51bGxcbiAgICAgIClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHVzZUZpZWxkKHN0YXRlKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8cS1zZWxlY3RcbiAgICByZWY9XCJiYXNlU2VsZWN0XCJcbiAgICBjbGFzcz1cImJhc2Utc2VsZWN0XCJcbiAgICB2LW1vZGVsPVwidmFsdWVcIlxuICAgIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCJcbiAgICA6b3B0aW9ucz1cIm9wdGlvbnNcIlxuICAgIDpiZ0NvbG9yPVwiYmdDb2xvclwiXG4gICAgOnVzZUNoaXBzPVwidXNlQ2hpcHNcIlxuICAgIDp1c2VJbnB1dD1cInVzZUlucHV0XCJcbiAgICA6bWFwT3B0aW9ucz1cIm1hcE9wdGlvbnNcIlxuICAgIDppbnB1dERlYm91bmNlPVwiaW5wdXREZWJvdW5jZVwiXG4gICAgOmRlYm91bmNlPVwiZGVib3VuY2VcIlxuICAgIDpuZXdWYWx1ZU1vZGU9XCJuZXdWYWx1ZU1vZGVcIlxuICAgIDpvcHRpb25MYWJlbD1cIm9wdGlvbkxhYmVsXCJcbiAgICA6b3B0aW9uVmFsdWU9XCJvcHRpb25WYWx1ZVwiXG4gICAgOm9wdGlvbnNEZW5zZT1cIm9wdGlvbnNEZW5zZVwiXG4gICAgcG9wdXAtY29udGVudC1jbGFzcz1cInEtcGEtc20gYmFzZS1kcm9wZG93blwiXG4gICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIm9uQ2hhbmdlXCJcbiAgICBAZmlsdGVyPVwib25GaWx0ZXJcIlxuICAgIEBuZXctdmFsdWU9XCJvbk5ld1ZhbHVlXCJcbiAgPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwiaWNvblwiIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgPHEtaWNvbiBzaXplPVwieHNcIiA6bmFtZT1cImljb25cIiAvPlxuICAgIDwvdGVtcGxhdGU+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCIhdXNlSW5wdXQgJiYgc2hvd1BsYWNlaG9sZGVyXCIgdi1zbG90OnNlbGVjdGVkPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtZ3JleS04XCI+e3sgcGxhY2Vob2xkZXIgfX08L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwidXNlRmlsdGVyXCIgdi1zbG90OmJlZm9yZS1vcHRpb25zPlxuICAgICAgPHNsb3QgbmFtZT1cImJlZm9yZS1vcHRpb25zXCI+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1pZj1cIiF1c2VJbnB1dFwiXG4gICAgICAgICAgY2xhc3M9XCJxLW1iLXNtIGJhc2UtZHJvcGRvd24tZmlsdGVyXCJcbiAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwib25Mb2FkRnJvbVNlcnZlclwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgaW5wdXQtZGVib3VuY2U9XCI1MDBcIlxuICAgICAgICAgIGRlYm91bmNlPVwiNTAwXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZD5cbiAgICAgICAgICAgIDxxLWljb24gc2l6ZT1cInhzXCIgbmFtZT1cImZhbCBmYS1zZWFyY2hcIiAvPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJuZXdWYWx1ZU1vZGUgJiYgZmlsdGVyXCIgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICBpY29uPVwiY29udHJvbF9wb2ludFwiXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIEBjbGljaz1cIm9uQ3JlYXRlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLWlucHV0PlxuICAgICAgPC9zbG90PlxuICAgIDwvdGVtcGxhdGU+XG4gICAgPHRlbXBsYXRlIHYtc2xvdDphZnRlci1vcHRpb25zPlxuICAgICAgPHNsb3QgbmFtZT1cImFmdGVyLW9wdGlvbnNcIj48L3Nsb3Q+XG4gICAgICA8c2xvdCBuYW1lPVwiYnV0dG9uXCIgdi1iaW5kOm9uQ3JlYXRlPVwib25DcmVhdGVcIj5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJuZXdWYWx1ZU1vZGUgJiYgZmlsdGVyXCI+XG4gICAgICAgICAgPHEtaXRlbSBkZW5zZSBjbGFzcz1cInEtcGEtbm9uZVwiPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgICAgIGNsYXNzPVwiYWRkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgYWxpZ249XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICBpY29uPVwiZmFkIGZhLXBsdXMtY2lyY2xlXCJcbiAgICAgICAgICAgICAgICA6bGFiZWw9XCJgQWRkICR7ZmlsdGVyfWBcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uQ3JlYXRlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3Nsb3Q+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgIDxzbG90IG5hbWU9XCJuby1vcHRpb25cIj5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LWlmPVwiIXVzZUlucHV0XCJcbiAgICAgICAgICBjbGFzcz1cInEtbWItc20gYmFzZS1kcm9wZG93bi1maWx0ZXJcIlxuICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJvbkxvYWRGcm9tU2VydmVyXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjUwMFwiXG4gICAgICAgICAgZGVib3VuY2U9XCI1MDBcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICAgICAgPHEtaWNvbiBzaXplPVwieHNcIiBuYW1lPVwiZmFsIGZhLXNlYXJjaFwiIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8cS1pdGVtIHYtY2xvc2UtcG9wdXAgY2xpY2thYmxlIGNsYXNzPVwibm8tb3B0aW9uc1wiPlxuICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInRleHQtZ3JleVwiPnt7IG5vT3B0aW9uTWVzc2FnZSB9fTwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgIDwvcS1pdGVtPlxuICAgICAgPC9zbG90PlxuICAgICAgPHNsb3QgbmFtZT1cImJ1dHRvblwiIHYtYmluZDpvbkNyZWF0ZT1cIm9uQ3JlYXRlXCI+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwibmV3VmFsdWVNb2RlICYmIGZpbHRlclwiPlxuICAgICAgICAgIDxxLWl0ZW0gZGVuc2UgY2xhc3M9XCJxLXBhLW5vbmVcIj5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgICAgICBjbGFzcz1cImFkZC1idXR0b25cIlxuICAgICAgICAgICAgICAgIGFsaWduPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgaWNvbj1cImZhZCBmYS1wbHVzLWNpcmNsZVwiXG4gICAgICAgICAgICAgICAgOmxhYmVsPVwiYEFkZCAke2ZpbHRlcn1gXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJvbkNyZWF0ZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9zbG90PlxuICAgIDwvdGVtcGxhdGU+XG4gICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICA8c2xvdCBuYW1lPVwiYXBwZW5kXCI+PC9zbG90PlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvcS1zZWxlY3Q+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuY29uc3QgdmFsaWRhdGVOZXdWYWx1ZU1vZGUgPSAodikgPT4gWydhZGQnLCAnYWRkLXVuaXF1ZScsICd0b2dnbGUnXS5pbmNsdWRlcyh2KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgZmlsdGVyTWV0aG9kOiBGdW5jdGlvbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIG1hcE9wdGlvbnM6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgfSxcbiAgICBvcHRpb25zRGVuc2U6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgfSxcbiAgICBpY29uOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbU3RyaW5nLCBCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgbm9PcHRpb25NZXNzYWdlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICdObyBvcHRpb24gZm91bmQuJyxcbiAgICB9LFxuICAgIHVzZUlucHV0OiBCb29sZWFuLFxuICAgIHVzZUNoaXBzOiBCb29sZWFuLFxuICAgIG5ld1ZhbHVlTW9kZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU5ld1ZhbHVlTW9kZSxcbiAgICB9LFxuICAgIG9uTmV3VmFsdWU6IEZ1bmN0aW9uLFxuICAgIHByZXZlbnREZWZhdWx0OiBCb29sZWFuLFxuICAgIHVzZUZpbHRlcjogQm9vbGVhbixcbiAgICBvcHRpb25WYWx1ZTogW0Z1bmN0aW9uLCBTdHJpbmddLFxuICAgIG9wdGlvbkxhYmVsOiBbRnVuY3Rpb24sIFN0cmluZ10sXG4gICAgb3B0aW9uRGlzYWJsZTogW0Z1bmN0aW9uLCBTdHJpbmddLFxuICAgIHF1ZXJ5OiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbRnVuY3Rpb25dLFxuICAgICAgZGVmYXVsdDogKCkgPT4gKHZhbCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGZpbHRlcjogdmFsLFxuICAgICAgICAgIGxpbWl0OiA1LFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICB9LFxuICAgIG11bHRpcGxlOiBCb29sZWFuLFxuICAgIGJnQ29sb3I6IFN0cmluZyxcbiAgICBpbnB1dERlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogNTAwLFxuICAgIH0sXG4gICAgZGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiA1MDAsXG4gICAgfSxcbiAgfSxcbiAgZW1pdHM6IFsndXBkYXRlOm1vZGVsLXZhbHVlJywgJ25ldy12YWx1ZSddLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5tb2RlbFZhbHVlLFxuICAgICAgb3B0aW9uczogW10sXG4gICAgICBmaWx0ZXI6ICcnLFxuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkZpbHRlcih2YWwsIHVwZGF0ZSwgYWJvcnQpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL0Jhc2VTZWxlY3Q6bWV0aG9kcy5vbkZpbHRlcigpJywgYXJndW1lbnRzKTtcbiAgICAgIGlmICghdGhpcy5maWx0ZXJNZXRob2QpIHJldHVybiB1cGRhdGUoKTtcbiAgICAgIGlmICh0aGlzLmZpbHRlck1ldGhvZCAmJiAhdmFsKSByZXR1cm4gYWJvcnQoKTtcbiAgICAgIHRoaXMuZmlsdGVyID0gdmFsO1xuICAgICAgdGhpcy5maWx0ZXJNZXRob2QodGhpcy5xdWVyeSh2YWwpKVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICB1cGRhdGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gZGF0YTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG9uTG9hZEZyb21TZXJ2ZXIodmFsKSB7XG4gICAgICBpZiAoIXRoaXMuZmlsdGVyTWV0aG9kKSByZXR1cm4gZmFsc2U7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9CYXNlU2VsZWN0Om1ldGhvZHMub25Mb2FkRnJvbVNlcnZlcigpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuZmlsdGVyTWV0aG9kKHRoaXMucXVlcnkodmFsKSkudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gZGF0YTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25DaGFuZ2UodmFsKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9CYXNlU2VsZWN0Om1ldGhvZHMub25DaGFuZ2UoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6bW9kZWwtdmFsdWUnLCB2YWwpO1xuICAgIH0sXG4gICAgb25DcmVhdGUoKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9CYXNlU2VsZWN0Om1ldGhvZHMub25DcmVhdGUoKScsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAodGhpcy5vbk5ld1ZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnbmV3LXZhbHVlJywgdGhpcy5maWx0ZXIsIHRoaXMuZG9uZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRvbmUodGhpcy5maWx0ZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXIgPSBudWxsO1xuICAgIH0sXG4gICAgY2xlYXIoKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9CYXNlU2VsZWN0Om1ldGhvZHMuY2xlYXIoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTptb2RlbC12YWx1ZScsIG51bGwpO1xuICAgIH0sXG4gICAgZG9uZSh2YWwsIG1vZGUpIHtcbiAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgIGlmICh2YWxpZGF0ZU5ld1ZhbHVlTW9kZShtb2RlKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kZSA9IHRoaXMubmV3VmFsdWVNb2RlO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy4kcmVmcy5iYXNlU2VsZWN0LnVwZGF0ZUlucHV0VmFsdWUoJycsIHRoaXMubXVsdGlwbGUgIT09IHRydWUsIHRydWUpO1xuICAgICAgY29uc3QgZm4gPSBtb2RlID09PSAndG9nZ2xlJyA/IHRoaXMuJHJlZnMuYmFzZVNlbGVjdC50b2dnbGVPcHRpb24gOiB0aGlzLiRyZWZzLmJhc2VTZWxlY3QuYWRkO1xuICAgICAgZm4odmFsLCBtb2RlID09PSAnYWRkLXVuaXF1ZScpO1xuICAgICAgaWYgKHRoaXMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy4kcmVmcy5iYXNlU2VsZWN0LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuJHJlZnMuYmFzZVNlbGVjdC5oaWRlUG9wdXAoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3dQbGFjZWhvbGRlcigpIHtcbiAgICAgIHJldHVybiAoIXRoaXMudmFsdWUgJiYgIXRoaXMudXNlQ2hpcHMpIHx8ICF0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUubGVuZ3RoIDwgMTtcbiAgICB9LFxuICB9LFxuICB3YXRjaDoge1xuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyKHZhbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjbGFzcz1cImJhc2UtaWNvbi1sYWJlbFwiXG4gICAgOnJpcHBsZT1cImZhbHNlXCJcbiAgICBkZW5zZVxuICAgIGZsYXRcbiAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgIDppY29uPVwiaWNvblwiXG4gICAgOmxhYmVsPVwibGFiZWxcIlxuICAgIG5vLWNhcHNcbiAgLz5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGljb246IFN0cmluZyxcbiAgICBsYWJlbDogU3RyaW5nLFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRkJyxcblxuICBwcm9wczoge1xuICAgIHByb3BzOiBPYmplY3QsXG4gICAgYXV0b1dpZHRoOiBCb29sZWFuLFxuICAgIG5vSG92ZXI6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRkJyArIChwcm9wcy5hdXRvV2lkdGggPT09IHRydWUgPyAnIHEtdGFibGUtLWNvbC1hdXRvLXdpZHRoJyA6ICcnKVxuICAgICAgKyAocHJvcHMubm9Ib3ZlciA9PT0gdHJ1ZSA/ICcgcS10ZC0tbm8taG92ZXInIDogJycpXG4gICAgICArICcgJ1xuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMucHJvcHMgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaCgndGQnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBuYW1lID0gdm0udm5vZGUua2V5XG4gICAgICBjb25zdCBjb2wgPSAoXG4gICAgICAgIChwcm9wcy5wcm9wcy5jb2xzTWFwICE9PSB2b2lkIDAgPyBwcm9wcy5wcm9wcy5jb2xzTWFwWyBuYW1lIF0gOiBudWxsKVxuICAgICAgICB8fCBwcm9wcy5wcm9wcy5jb2xcbiAgICAgIClcblxuICAgICAgaWYgKGNvbCA9PT0gdm9pZCAwKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0IHsgcm93IH0gPSBwcm9wcy5wcm9wc1xuXG4gICAgICByZXR1cm4gaCgndGQnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlICsgY29sLl9fdGRDbGFzcyhyb3cpLFxuICAgICAgICBzdHlsZTogY29sLl9fdGRTdHlsZShyb3cpXG4gICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90LCBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRoJyxcblxuICBwcm9wczoge1xuICAgIHByb3BzOiBPYmplY3QsXG4gICAgYXV0b1dpZHRoOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IG9uQ2xpY2sgPSBldnQgPT4geyBlbWl0KCdjbGljaycsIGV2dCkgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5wcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCd0aCcsIHtcbiAgICAgICAgICBjbGFzczogcHJvcHMuYXV0b1dpZHRoID09PSB0cnVlID8gJ3EtdGFibGUtLWNvbC1hdXRvLXdpZHRoJyA6ICcnLFxuICAgICAgICAgIG9uQ2xpY2tcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICB9XG5cbiAgICAgIGxldCBjb2wsIGNoaWxkXG4gICAgICBjb25zdCBuYW1lID0gdm0udm5vZGUua2V5XG5cbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIGNvbCA9IHByb3BzLnByb3BzLmNvbHNNYXBbIG5hbWUgXVxuICAgICAgICBpZiAoY29sID09PSB2b2lkIDApIHsgcmV0dXJuIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb2wgPSBwcm9wcy5wcm9wcy5jb2xcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbC5zb3J0YWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb2wuYWxpZ24gPT09ICdyaWdodCdcbiAgICAgICAgICA/ICd1bnNoaWZ0J1xuICAgICAgICAgIDogJ3B1c2gnXG5cbiAgICAgICAgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcbiAgICAgICAgY2hpbGRbIGFjdGlvbiBdKFxuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiBjb2wuX19pY29uQ2xhc3MsXG4gICAgICAgICAgICBuYW1lOiAkcS5pY29uU2V0LnRhYmxlLmFycm93VXBcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY29sLl9fdGhDbGFzc1xuICAgICAgICAgICsgKHByb3BzLmF1dG9XaWR0aCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tY29sLWF1dG8td2lkdGgnIDogJycpLFxuICAgICAgICBzdHlsZTogY29sLmhlYWRlclN0eWxlLFxuICAgICAgICBvbkNsaWNrOiBldnQgPT4ge1xuICAgICAgICAgIGNvbC5zb3J0YWJsZSA9PT0gdHJ1ZSAmJiBwcm9wcy5wcm9wcy5zb3J0KGNvbCkgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgIG9uQ2xpY2soZXZ0KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCd0aCcsIGRhdGEsIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3Qgc2VwYXJhdG9yVmFsdWVzID0gWyAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcsICdjZWxsJywgJ25vbmUnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FNYXJrdXBUYWJsZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICB3cmFwQ2VsbHM6IEJvb2xlYW4sXG5cbiAgICBzZXBhcmF0b3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdob3Jpem9udGFsJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBzZXBhcmF0b3JWYWx1ZXMuaW5jbHVkZXModilcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLW1hcmt1cC10YWJsZSBxLXRhYmxlX19jb250YWluZXIgcS10YWJsZV9fY2FyZCdcbiAgICAgICsgYCBxLXRhYmxlLS0keyBwcm9wcy5zZXBhcmF0b3IgfS1zZXBhcmF0b3JgXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtdGFibGUtLWRhcmsgcS10YWJsZV9fY2FyZC0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5mbGF0ID09PSB0cnVlID8gJyBxLXRhYmxlLS1mbGF0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtdGFibGUtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXRhYmxlLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy53cmFwQ2VsbHMgPT09IGZhbHNlID8gJyBxLXRhYmxlLS1uby13cmFwJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIFtcbiAgICAgIGgoJ3RhYmxlJywgeyBjbGFzczogJ3EtdGFibGUnIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgIF0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGNvbnRlbnQpIHtcbiAgcmV0dXJuIGgoJ2RpdicsIHByb3BzLCBbXG4gICAgaCgndGFibGUnLCB7IGNsYXNzOiAncS10YWJsZScgfSwgY29udGVudClcbiAgXSlcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZU1vdW50LCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRTGlzdCBmcm9tICcuLi9pdGVtL1FMaXN0LmpzJ1xuaW1wb3J0IFFNYXJrdXBUYWJsZSBmcm9tICcuLi9tYXJrdXAtdGFibGUvUU1hcmt1cFRhYmxlLmpzJ1xuaW1wb3J0IGdldFRhYmxlTWlkZGxlIGZyb20gJy4uL3RhYmxlL2dldC10YWJsZS1taWRkbGUuanMnXG5cbmltcG9ydCB7IHVzZVZpcnR1YWxTY3JvbGwsIHVzZVZpcnR1YWxTY3JvbGxQcm9wcyB9IGZyb20gJy4vdXNlLXZpcnR1YWwtc2Nyb2xsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgY29tcHMgPSB7XG4gIGxpc3Q6IFFMaXN0LFxuICB0YWJsZTogUU1hcmt1cFRhYmxlXG59XG5cbmNvbnN0IHR5cGVPcHRpb25zID0gWyAnbGlzdCcsICd0YWJsZScsICdfX3F0YWJsZScgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVZpcnR1YWxTY3JvbGwnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlVmlydHVhbFNjcm9sbFByb3BzLFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xpc3QnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHR5cGVPcHRpb25zLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcblxuICAgIGl0ZW1zRm46IEZ1bmN0aW9uLFxuICAgIGl0ZW1zU2l6ZTogTnVtYmVyLFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiB7XG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBhdHRycyB9KSB7XG4gICAgbGV0IGxvY2FsU2Nyb2xsVGFyZ2V0XG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbExlbmd0aCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLml0ZW1zU2l6ZSA+PSAwICYmIHByb3BzLml0ZW1zRm4gIT09IHZvaWQgMFxuICAgICAgICA/IHBhcnNlSW50KHByb3BzLml0ZW1zU2l6ZSwgMTApXG4gICAgICAgIDogKEFycmF5LmlzQXJyYXkocHJvcHMuaXRlbXMpID8gcHJvcHMuaXRlbXMubGVuZ3RoIDogMClcbiAgICApKVxuXG4gICAgY29uc3Qge1xuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHBhZFZpcnR1YWxTY3JvbGwsXG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnRcbiAgICB9ID0gdXNlVmlydHVhbFNjcm9sbCh7XG4gICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0LCBnZXRWaXJ0dWFsU2Nyb2xsRWxcbiAgICB9KVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcEZuID0gKGl0ZW0sIGkpID0+ICh7XG4gICAgICAgIGluZGV4OiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tICsgaSxcbiAgICAgICAgaXRlbVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHByb3BzLml0ZW1zRm4gPT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLml0ZW1zLnNsaWNlKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvKS5tYXAobWFwRm4pXG4gICAgICAgIDogcHJvcHMuaXRlbXNGbih2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50byAtIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pLm1hcChtYXBGbilcbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS12aXJ0dWFsLXNjcm9sbCBxLXZpcnR1YWwtc2Nyb2xsJyArIChwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICctLWhvcml6b250YWwnIDogJy0tdmVydGljYWwnKVxuICAgICAgKyAocHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDAgPyAnJyA6ICcgc2Nyb2xsJylcbiAgICApXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDAgPyB7fSA6IHsgdGFiaW5kZXg6IDAgfVxuICAgICkpXG5cbiAgICB3YXRjaCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCAoKSA9PiB7XG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNjcm9sbFRhcmdldCwgKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbEVsICgpIHtcbiAgICAgIHJldHVybiByb290UmVmLnZhbHVlLiRlbCB8fCByb290UmVmLnZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCAoKSB7XG4gICAgICByZXR1cm4gbG9jYWxTY3JvbGxUYXJnZXRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSBnZXRTY3JvbGxUYXJnZXQoZ2V0VmlydHVhbFNjcm9sbEVsKCksIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uVmlydHVhbFNjcm9sbEV2dCwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uVmlydHVhbFNjcm9sbEV2dCwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldCA9IHZvaWQgMFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9fZ2V0VmlydHVhbENoaWxkcmVuICgpIHtcbiAgICAgIGxldCBjaGlsZCA9IHBhZFZpcnR1YWxTY3JvbGwoXG4gICAgICAgIHByb3BzLnR5cGUgPT09ICdsaXN0JyA/ICdkaXYnIDogJ3Rib2R5JyxcbiAgICAgICAgdmlydHVhbFNjcm9sbFNjb3BlLnZhbHVlLm1hcChzbG90cy5kZWZhdWx0KVxuICAgICAgKVxuXG4gICAgICBpZiAoc2xvdHMuYmVmb3JlICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQgPSBzbG90cy5iZWZvcmUoKS5jb25jYXQoY2hpbGQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoTWVyZ2VTbG90KHNsb3RzLmFmdGVyLCBjaGlsZClcbiAgICB9XG5cbiAgICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKClcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHNsb3RzLmRlZmF1bHQgPT09IHZvaWQgMCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdRVmlydHVhbFNjcm9sbDogZGVmYXVsdCBzY29wZWQgc2xvdCBpcyByZXF1aXJlZCBmb3IgcmVuZGVyaW5nJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wcy50eXBlID09PSAnX19xdGFibGUnXG4gICAgICAgID8gZ2V0VGFibGVNaWRkbGUoXG4gICAgICAgICAgeyByZWY6IHJvb3RSZWYsIGNsYXNzOiAncS10YWJsZV9fbWlkZGxlICcgKyBjbGFzc2VzLnZhbHVlIH0sXG4gICAgICAgICAgX19nZXRWaXJ0dWFsQ2hpbGRyZW4oKVxuICAgICAgICApXG4gICAgICAgIDogaChjb21wc1sgcHJvcHMudHlwZSBdLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICAgIGNsYXNzOiBbIGF0dHJzLmNsYXNzLCBjbGFzc2VzLnZhbHVlIF0sXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgICB9LCBfX2dldFZpcnR1YWxDaGlsZHJlbilcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDIsXG4gIHNtOiA0LFxuICBtZDogNixcbiAgbGc6IDEwLFxuICB4bDogMTRcbn1cblxuZnVuY3Rpb24gd2lkdGggKHZhbCwgcmV2ZXJzZSwgJHEpIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2Zvcm06IHJldmVyc2UgPT09IHRydWVcbiAgICAgID8gYHRyYW5zbGF0ZVgoJHsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnLScgOiAnJyB9MTAwJSkgc2NhbGUzZCgkeyAtdmFsIH0sMSwxKWBcbiAgICAgIDogYHNjYWxlM2QoJHsgdmFsIH0sMSwxKWBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUxpbmVhclByb2dyZXNzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgYnVmZmVyOiBOdW1iZXIsXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHRyYWNrQ29sb3I6IFN0cmluZyxcblxuICAgIHJldmVyc2U6IEJvb2xlYW4sXG4gICAgc3RyaXBlOiBCb29sZWFuLFxuICAgIGluZGV0ZXJtaW5hdGU6IEJvb2xlYW4sXG4gICAgcXVlcnk6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhbixcblxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAyMTAwXG4gICAgfSxcblxuICAgIGluc3RhbnRGZWVkYmFjazogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCBwcm94eS4kcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBkZWZhdWx0U2l6ZXMpXG5cbiAgICBjb25zdCBtb3Rpb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlIHx8IHByb3BzLnF1ZXJ5ID09PSB0cnVlKVxuICAgIGNvbnN0IHdpZHRoUmV2ZXJzZSA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnJldmVyc2UgIT09IHByb3BzLnF1ZXJ5KVxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIC4uLihzaXplU3R5bGUudmFsdWUgIT09IG51bGwgPyBzaXplU3R5bGUudmFsdWUgOiB7fSksXG4gICAgICAnLS1xLWxpbmVhci1wcm9ncmVzcy1zcGVlZCc6IGAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXNgXG4gICAgfSkpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWxpbmVhci1wcm9ncmVzcydcbiAgICAgICsgKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICsgKHByb3BzLnJldmVyc2UgPT09IHRydWUgfHwgcHJvcHMucXVlcnkgPT09IHRydWUgPyAnIHEtbGluZWFyLXByb2dyZXNzLS1yZXZlcnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcm91bmRlZC1ib3JkZXJzJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHRyYWNrU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB3aWR0aChwcm9wcy5idWZmZXIgIT09IHZvaWQgMCA/IHByb3BzLmJ1ZmZlciA6IDEsIHdpZHRoUmV2ZXJzZS52YWx1ZSwgcHJveHkuJHEpKVxuICAgIGNvbnN0IHRyYWNrQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGluZWFyLXByb2dyZXNzX190cmFjayBhYnNvbHV0ZS1mdWxsJ1xuICAgICAgKyBgIHEtbGluZWFyLXByb2dyZXNzX190cmFjay0td2l0aCR7IHByb3BzLmluc3RhbnRGZWVkYmFjayA9PT0gdHJ1ZSA/ICdvdXQnIDogJycgfS10cmFuc2l0aW9uYFxuICAgICAgKyBgIHEtbGluZWFyLXByb2dyZXNzX190cmFjay0tJHsgaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJ2RhcmsnIDogJ2xpZ2h0JyB9YFxuICAgICAgKyAocHJvcHMudHJhY2tDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy50cmFja0NvbG9yIH1gIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgbW9kZWxTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHdpZHRoKG1vdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/IDEgOiBwcm9wcy52YWx1ZSwgd2lkdGhSZXZlcnNlLnZhbHVlLCBwcm94eS4kcSkpXG4gICAgY29uc3QgbW9kZWxDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1saW5lYXItcHJvZ3Jlc3NfX21vZGVsIGFic29sdXRlLWZ1bGwnXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX21vZGVsLS13aXRoJHsgcHJvcHMuaW5zdGFudEZlZWRiYWNrID09PSB0cnVlID8gJ291dCcgOiAnJyB9LXRyYW5zaXRpb25gXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX21vZGVsLS0keyBtb3Rpb24udmFsdWUgPT09IHRydWUgPyAnaW4nIDogJycgfWRldGVybWluYXRlYFxuICAgIClcblxuICAgIGNvbnN0IHN0cmlwZVN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHsgd2lkdGg6IGAkeyBwcm9wcy52YWx1ZSAqIDEwMCB9JWAgfSkpXG4gICAgY29uc3Qgc3RyaXBlQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtbGluZWFyLXByb2dyZXNzX19zdHJpcGUgYWJzb2x1dGUtJHsgcHJvcHMucmV2ZXJzZSA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogdHJhY2tDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogdHJhY2tTdHlsZS52YWx1ZVxuICAgICAgICB9KSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IG1vZGVsQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IG1vZGVsU3R5bGUudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgcHJvcHMuc3RyaXBlID09PSB0cnVlICYmIG1vdGlvbi52YWx1ZSA9PT0gZmFsc2UgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiBzdHJpcGVDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogc3RyaXBlU3R5bGUudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcm9sZTogJ3Byb2dyZXNzYmFyJyxcbiAgICAgICAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxuICAgICAgICAnYXJpYS12YWx1ZW1heCc6IDEsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogcHJvcHMuaW5kZXRlcm1pbmF0ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gdm9pZCAwXG4gICAgICAgICAgOiBwcm9wcy52YWx1ZVxuICAgICAgfSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBjaGlsZCkpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25CZWZvcmVNb3VudCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeS5qcydcbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxubGV0IGNvdW50ZXIgPSAwXG5cbmV4cG9ydCBjb25zdCB1c2VGdWxsc2NyZWVuUHJvcHMgPSB7XG4gIGZ1bGxzY3JlZW46IEJvb2xlYW4sXG4gIG5vUm91dGVGdWxsc2NyZWVuRXhpdDogQm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgdXNlRnVsbHNjcmVlbkVtaXRzID0gWyAndXBkYXRlOmZ1bGxzY3JlZW4nLCAnZnVsbHNjcmVlbicgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IGhpc3RvcnlFbnRyeSwgZnVsbHNjcmVlbkZpbGxlck5vZGUsIGNvbnRhaW5lclxuICBjb25zdCBpbkZ1bGxzY3JlZW4gPSByZWYoZmFsc2UpXG5cbiAgdm1IYXNSb3V0ZXIodm0pID09PSB0cnVlICYmIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgIHByb3BzLm5vUm91dGVGdWxsc2NyZWVuRXhpdCAhPT0gdHJ1ZSAmJiBleGl0RnVsbHNjcmVlbigpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZnVsbHNjcmVlbiwgdiA9PiB7XG4gICAgaWYgKGluRnVsbHNjcmVlbi52YWx1ZSAhPT0gdikge1xuICAgICAgdG9nZ2xlRnVsbHNjcmVlbigpXG4gICAgfVxuICB9KVxuXG4gIHdhdGNoKGluRnVsbHNjcmVlbiwgdiA9PiB7XG4gICAgZW1pdCgndXBkYXRlOmZ1bGxzY3JlZW4nLCB2KVxuICAgIGVtaXQoJ2Z1bGxzY3JlZW4nLCB2KVxuICB9KVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGV4aXRGdWxsc2NyZWVuKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzZXRGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRGdWxsc2NyZWVuICgpIHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpbkZ1bGxzY3JlZW4udmFsdWUgPSB0cnVlXG4gICAgY29udGFpbmVyID0gcHJveHkuJGVsLnBhcmVudE5vZGVcbiAgICBjb250YWluZXIucmVwbGFjZUNoaWxkKGZ1bGxzY3JlZW5GaWxsZXJOb2RlLCBwcm94eS4kZWwpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwcm94eS4kZWwpXG5cbiAgICBjb3VudGVyKytcbiAgICBpZiAoY291bnRlciA9PT0gMSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWZ1bGxzY3JlZW4tbWl4aW4nKVxuICAgIH1cblxuICAgIGhpc3RvcnlFbnRyeSA9IHtcbiAgICAgIGhhbmRsZXI6IGV4aXRGdWxsc2NyZWVuXG4gICAgfVxuICAgIEhpc3RvcnkuYWRkKGhpc3RvcnlFbnRyeSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4aXRGdWxsc2NyZWVuICgpIHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaGlzdG9yeUVudHJ5ICE9PSB2b2lkIDApIHtcbiAgICAgIEhpc3RvcnkucmVtb3ZlKGhpc3RvcnlFbnRyeSlcbiAgICAgIGhpc3RvcnlFbnRyeSA9IHZvaWQgMFxuICAgIH1cblxuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGQocHJveHkuJGVsLCBmdWxsc2NyZWVuRmlsbGVyTm9kZSlcbiAgICBpbkZ1bGxzY3JlZW4udmFsdWUgPSBmYWxzZVxuXG4gICAgY291bnRlciA9IE1hdGgubWF4KDAsIGNvdW50ZXIgLSAxKVxuXG4gICAgaWYgKGNvdW50ZXIgPT09IDApIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1mdWxsc2NyZWVuLW1peGluJylcblxuICAgICAgaWYgKHByb3h5LiRlbC5zY3JvbGxJbnRvVmlldyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBwcm94eS4kZWwuc2Nyb2xsSW50b1ZpZXcoKSB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQmVmb3JlTW91bnQoKCkgPT4ge1xuICAgIGZ1bGxzY3JlZW5GaWxsZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm9wcy5mdWxsc2NyZWVuID09PSB0cnVlICYmIHNldEZ1bGxzY3JlZW4oKVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudChleGl0RnVsbHNjcmVlbilcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgIHRvZ2dsZUZ1bGxzY3JlZW4sXG4gICAgc2V0RnVsbHNjcmVlbixcbiAgICBleGl0RnVsbHNjcmVlblxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgaW5GdWxsc2NyZWVuLFxuICAgIHRvZ2dsZUZ1bGxzY3JlZW5cbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNvcnREYXRlIChhLCBiKSB7XG4gIHJldHVybiAobmV3IERhdGUoYSkpIC0gKG5ldyBEYXRlKGIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydEJvb2xlYW4gKGEsIGIpIHtcbiAgcmV0dXJuIGEgJiYgIWJcbiAgICA/IC0xXG4gICAgOiAoIWEgJiYgYiA/IDEgOiAwKVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHNvcnREYXRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zb3J0LmpzJ1xuaW1wb3J0IHsgaXNOdW1iZXIsIGlzRGF0ZSwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2lzLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlVGFibGVTb3J0UHJvcHMgPSB7XG4gIHNvcnRNZXRob2Q6IEZ1bmN0aW9uLFxuICBiaW5hcnlTdGF0ZVNvcnQ6IEJvb2xlYW4sXG4gIGNvbHVtblNvcnRPcmRlcjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA9PT0gJ2FkJyB8fCB2ID09PSAnZGEnLFxuICAgIGRlZmF1bHQ6ICdhZCdcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVTb3J0IChwcm9wcywgY29tcHV0ZWRQYWdpbmF0aW9uLCBjb2xMaXN0LCBzZXRQYWdpbmF0aW9uKSB7XG4gIGNvbnN0IGNvbHVtblRvU29ydCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB7IHNvcnRCeSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG5cbiAgICByZXR1cm4gc29ydEJ5XG4gICAgICA/IGNvbExpc3QudmFsdWUuZmluZChkZWYgPT4gZGVmLm5hbWUgPT09IHNvcnRCeSkgfHwgbnVsbFxuICAgICAgOiBudWxsXG4gIH0pXG5cbiAgY29uc3QgY29tcHV0ZWRTb3J0TWV0aG9kID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLnNvcnRNZXRob2QgIT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy5zb3J0TWV0aG9kXG4gICAgICA6IChkYXRhLCBzb3J0QnksIGRlc2NlbmRpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBjb2wgPSBjb2xMaXN0LnZhbHVlLmZpbmQoZGVmID0+IGRlZi5uYW1lID09PSBzb3J0QnkpXG4gICAgICAgICAgaWYgKGNvbCA9PT0gdm9pZCAwIHx8IGNvbC5maWVsZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICBkaXIgPSBkZXNjZW5kaW5nID09PSB0cnVlID8gLTEgOiAxLFxuICAgICAgICAgICAgdmFsID0gdHlwZW9mIGNvbC5maWVsZCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICA/IHYgPT4gY29sLmZpZWxkKHYpXG4gICAgICAgICAgICAgIDogdiA9PiB2WyBjb2wuZmllbGQgXVxuXG4gICAgICAgICAgcmV0dXJuIGRhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgbGV0XG4gICAgICAgICAgICAgIEEgPSB2YWwoYSksXG4gICAgICAgICAgICAgIEIgPSB2YWwoYilcblxuICAgICAgICAgICAgaWYgKEEgPT09IG51bGwgfHwgQSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMSAqIGRpclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKEIgPT09IG51bGwgfHwgQiA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiAxICogZGlyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29sLnNvcnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gY29sLnNvcnQoQSwgQiwgYSwgYikgKiBkaXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc051bWJlcihBKSA9PT0gdHJ1ZSAmJiBpc051bWJlcihCKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gKEEgLSBCKSAqIGRpclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRGF0ZShBKSA9PT0gdHJ1ZSAmJiBpc0RhdGUoQikgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNvcnREYXRlKEEsIEIpICogZGlyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIEEgPT09ICdib29sZWFuJyAmJiB0eXBlb2YgQiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgIHJldHVybiAoQSAtIEIpICogZGlyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFsgQSwgQiBdID0gWyBBLCBCIF0ubWFwKHMgPT4gKHMgKyAnJykudG9Mb2NhbGVTdHJpbmcoKS50b0xvd2VyQ2FzZSgpKVxuXG4gICAgICAgICAgICByZXR1cm4gQSA8IEJcbiAgICAgICAgICAgICAgPyAtMSAqIGRpclxuICAgICAgICAgICAgICA6IChBID09PSBCID8gMCA6IGRpcilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICkpXG5cbiAgZnVuY3Rpb24gc29ydCAoY29sIC8qIFN0cmluZyhjb2wgbmFtZSkgb3IgT2JqZWN0KGNvbCBkZWZpbml0aW9uKSAqLykge1xuICAgIGxldCBzb3J0T3JkZXIgPSBwcm9wcy5jb2x1bW5Tb3J0T3JkZXJcblxuICAgIGlmIChpc09iamVjdChjb2wpID09PSB0cnVlKSB7XG4gICAgICBpZiAoY29sLnNvcnRPcmRlcikge1xuICAgICAgICBzb3J0T3JkZXIgPSBjb2wuc29ydE9yZGVyXG4gICAgICB9XG5cbiAgICAgIGNvbCA9IGNvbC5uYW1lXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgZGVmID0gY29sTGlzdC52YWx1ZS5maW5kKGRlZiA9PiBkZWYubmFtZSA9PT0gY29sKVxuICAgICAgaWYgKGRlZiAhPT0gdm9pZCAwICYmIGRlZi5zb3J0T3JkZXIpIHtcbiAgICAgICAgc29ydE9yZGVyID0gZGVmLnNvcnRPcmRlclxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB7IHNvcnRCeSwgZGVzY2VuZGluZyB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG5cbiAgICBpZiAoc29ydEJ5ICE9PSBjb2wpIHtcbiAgICAgIHNvcnRCeSA9IGNvbFxuICAgICAgZGVzY2VuZGluZyA9IHNvcnRPcmRlciA9PT0gJ2RhJ1xuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5iaW5hcnlTdGF0ZVNvcnQgPT09IHRydWUpIHtcbiAgICAgIGRlc2NlbmRpbmcgPSAhZGVzY2VuZGluZ1xuICAgIH1cbiAgICBlbHNlIGlmIChkZXNjZW5kaW5nID09PSB0cnVlKSB7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYWQnKSB7XG4gICAgICAgIHNvcnRCeSA9IG51bGxcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZXNjZW5kaW5nID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7IC8vIGFzY2VuZGluZ1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FkJykge1xuICAgICAgICBkZXNjZW5kaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNvcnRCeSA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQYWdpbmF0aW9uKHsgc29ydEJ5LCBkZXNjZW5kaW5nLCBwYWdlOiAxIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNvbHVtblRvU29ydCxcbiAgICBjb21wdXRlZFNvcnRNZXRob2QsXG4gICAgc29ydFxuICB9XG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCwgd2F0Y2gsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlVGFibGVGaWx0ZXJQcm9wcyA9IHtcbiAgZmlsdGVyOiBbIFN0cmluZywgT2JqZWN0IF0sXG4gIGZpbHRlck1ldGhvZDogRnVuY3Rpb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYmxlRmlsdGVyIChwcm9wcywgc2V0UGFnaW5hdGlvbikge1xuICBjb25zdCBjb21wdXRlZEZpbHRlck1ldGhvZCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5maWx0ZXJNZXRob2QgIT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy5maWx0ZXJNZXRob2RcbiAgICAgIDogKHJvd3MsIHRlcm1zLCBjb2xzLCBjZWxsVmFsdWUpID0+IHtcbiAgICAgICAgICBjb25zdCBsb3dlclRlcm1zID0gdGVybXMgPyB0ZXJtcy50b0xvd2VyQ2FzZSgpIDogJydcbiAgICAgICAgICByZXR1cm4gcm93cy5maWx0ZXIoXG4gICAgICAgICAgICByb3cgPT4gY29scy5zb21lKGNvbCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGNlbGxWYWx1ZShjb2wsIHJvdykgKyAnJ1xuICAgICAgICAgICAgICBjb25zdCBoYXlzdGFjayA9ICh2YWwgPT09ICd1bmRlZmluZWQnIHx8IHZhbCA9PT0gJ251bGwnKSA/ICcnIDogdmFsLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgcmV0dXJuIGhheXN0YWNrLmluZGV4T2YobG93ZXJUZXJtcykgIT09IC0xXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICApKVxuXG4gIHdhdGNoKFxuICAgICgpID0+IHByb3BzLmZpbHRlcixcbiAgICAoKSA9PiB7XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiAxIH0sIHRydWUpXG4gICAgICB9KVxuICAgIH0sXG4gICAgeyBkZWVwOiB0cnVlIH1cbiAgKVxuXG4gIHJldHVybiB7IGNvbXB1dGVkRmlsdGVyTWV0aG9kIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuZnVuY3Rpb24gc2FtZVBhZ2luYXRpb24gKG9sZFBhZywgbmV3UGFnKSB7XG4gIGZvciAoY29uc3QgcHJvcCBpbiBuZXdQYWcpIHtcbiAgICBpZiAobmV3UGFnWyBwcm9wIF0gIT09IG9sZFBhZ1sgcHJvcCBdKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gZml4UGFnaW5hdGlvbiAocCkge1xuICBpZiAocC5wYWdlIDwgMSkge1xuICAgIHAucGFnZSA9IDFcbiAgfVxuICBpZiAocC5yb3dzUGVyUGFnZSAhPT0gdm9pZCAwICYmIHAucm93c1BlclBhZ2UgPCAxKSB7XG4gICAgcC5yb3dzUGVyUGFnZSA9IDBcbiAgfVxuICByZXR1cm4gcFxufVxuXG5leHBvcnQgY29uc3QgdXNlVGFibGVQYWdpbmF0aW9uUHJvcHMgPSB7XG4gIHBhZ2luYXRpb246IE9iamVjdCxcbiAgcm93c1BlclBhZ2VPcHRpb25zOiB7XG4gICAgdHlwZTogQXJyYXksXG4gICAgZGVmYXVsdDogKCkgPT4gWyA1LCA3LCAxMCwgMTUsIDIwLCAyNSwgNTAsIDAgXVxuICB9LFxuXG4gICdvblVwZGF0ZTpwYWdpbmF0aW9uJzogWyBGdW5jdGlvbiwgQXJyYXkgXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVQYWdpbmF0aW9uU3RhdGUgKHZtLCBnZXRDZWxsVmFsdWUpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCB9ID0gdm1cblxuICBjb25zdCBpbm5lclBhZ2luYXRpb24gPSByZWYoXG4gICAgT2JqZWN0LmFzc2lnbih7XG4gICAgICBzb3J0Qnk6IG51bGwsXG4gICAgICBkZXNjZW5kaW5nOiBmYWxzZSxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICByb3dzUGVyUGFnZTogcHJvcHMucm93c1BlclBhZ2VPcHRpb25zLmxlbmd0aCA+IDBcbiAgICAgICAgPyBwcm9wcy5yb3dzUGVyUGFnZU9wdGlvbnNbIDAgXVxuICAgICAgICA6IDVcbiAgICB9LCBwcm9wcy5wYWdpbmF0aW9uKVxuICApXG5cbiAgY29uc3QgY29tcHV0ZWRQYWdpbmF0aW9uID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHBhZyA9IHByb3BzWyAnb25VcGRhdGU6cGFnaW5hdGlvbicgXSAhPT0gdm9pZCAwXG4gICAgICA/IHsgLi4uaW5uZXJQYWdpbmF0aW9uLnZhbHVlLCAuLi5wcm9wcy5wYWdpbmF0aW9uIH1cbiAgICAgIDogaW5uZXJQYWdpbmF0aW9uLnZhbHVlXG5cbiAgICByZXR1cm4gZml4UGFnaW5hdGlvbihwYWcpXG4gIH0pXG5cbiAgY29uc3QgaXNTZXJ2ZXJTaWRlID0gY29tcHV0ZWQoKCkgPT4gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLnJvd3NOdW1iZXIgIT09IHZvaWQgMClcblxuICBmdW5jdGlvbiBzZW5kU2VydmVyUmVxdWVzdCAocGFnaW5hdGlvbikge1xuICAgIHJlcXVlc3RTZXJ2ZXJJbnRlcmFjdGlvbih7XG4gICAgICBwYWdpbmF0aW9uLFxuICAgICAgZmlsdGVyOiBwcm9wcy5maWx0ZXJcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVxdWVzdFNlcnZlckludGVyYWN0aW9uIChwcm9wID0ge30pIHtcbiAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICBlbWl0KCdyZXF1ZXN0Jywge1xuICAgICAgICBwYWdpbmF0aW9uOiBwcm9wLnBhZ2luYXRpb24gfHwgY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLFxuICAgICAgICAvLyBGSVhNRTogJ3Byb3BzLmZpbHRlcicgaXMgc3RyaW5nL29iamVjdCwgYnV0ICdwcm9wLmZpbHRlcicgY2FuIGJlIGNvbnRyb2xsZWQgYnkgdGhlIHVzZXIsIGFuZCB0aGUgZG9jcyBhcmUgc3VnZ2VzdGluZyAncHJvcC5maWx0ZXInIGlzIGEgZnVuY3Rpb25cbiAgICAgICAgLy8gU28sIHZhbHVlIG9mICdmaWx0ZXInIGJlY29tZXMgZnVuY3Rpb24vc3RyaW5nL29iamVjdCwgd2hpY2ggbWFrZXMgYSBsb3Qgb2YgdGhpbmdzIHVucHJlZGljdGFibGUgYW5kIGNhbiBicmVhayB0aGluZ3NcbiAgICAgICAgLy8gRWl0aGVyIHVwZGF0ZSB0aGUgZG9jcyB0byBzYXkgJ3Byb3AuZmlsdGVyJyBzaG91bGQgYmUgYSBzdHJpbmcvb2JqZWN0LCBvciB1c2UgJ3Byb3AuZmlsdGVyIHx8IHByb3BzLmZpbHRlck1ldGhvZCcgb3IgbWF5YmUgZ2V0ICdjb21wdXRlZEZpbHRlckZ1bmN0aW9uJyBoZXJlIGFuZCB1c2UgdGhhdCBpbnN0ZWFkIG9mICdwcm9wcy5maWx0ZXJNZXRob2QnXG4gICAgICAgIC8vIFRoZSBleGFtcGxlcyBvbiBvdXIgZG9jcyBhcmUgdXNpbmcgJ2ZpbHRlcicgYXMgYSBzdHJpbmcgaW4gb25SZXF1ZXN0IGhhbmRsZXIsIGJ1dCB0aGUgSlNPTiBBUEkgaXMgc2F5aW5nICdmaWx0ZXInIGlzIGEgZnVuY3Rpb25cbiAgICAgICAgZmlsdGVyOiBwcm9wLmZpbHRlciB8fCBwcm9wcy5maWx0ZXIsXG4gICAgICAgIGdldENlbGxWYWx1ZVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0UGFnaW5hdGlvbiAodmFsLCBmb3JjZVNlcnZlclJlcXVlc3QpIHtcbiAgICBjb25zdCBuZXdQYWdpbmF0aW9uID0gZml4UGFnaW5hdGlvbih7XG4gICAgICAuLi5jb21wdXRlZFBhZ2luYXRpb24udmFsdWUsXG4gICAgICAuLi52YWxcbiAgICB9KVxuXG4gICAgaWYgKHNhbWVQYWdpbmF0aW9uKGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZSwgbmV3UGFnaW5hdGlvbikgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc1NlcnZlclNpZGUudmFsdWUgPT09IHRydWUgJiYgZm9yY2VTZXJ2ZXJSZXF1ZXN0ID09PSB0cnVlKSB7XG4gICAgICAgIHNlbmRTZXJ2ZXJSZXF1ZXN0KG5ld1BhZ2luYXRpb24pXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaXNTZXJ2ZXJTaWRlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBzZW5kU2VydmVyUmVxdWVzdChuZXdQYWdpbmF0aW9uKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgcHJvcHMucGFnaW5hdGlvbiAhPT0gdm9pZCAwXG4gICAgICAmJiBwcm9wc1sgJ29uVXBkYXRlOnBhZ2luYXRpb24nIF0gIT09IHZvaWQgMFxuICAgICkge1xuICAgICAgZW1pdCgndXBkYXRlOnBhZ2luYXRpb24nLCBuZXdQYWdpbmF0aW9uKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlubmVyUGFnaW5hdGlvbi52YWx1ZSA9IG5ld1BhZ2luYXRpb25cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlubmVyUGFnaW5hdGlvbixcbiAgICBjb21wdXRlZFBhZ2luYXRpb24sXG4gICAgaXNTZXJ2ZXJTaWRlLFxuXG4gICAgcmVxdWVzdFNlcnZlckludGVyYWN0aW9uLFxuICAgIHNldFBhZ2luYXRpb25cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVQYWdpbmF0aW9uICh2bSwgaW5uZXJQYWdpbmF0aW9uLCBjb21wdXRlZFBhZ2luYXRpb24sIGlzU2VydmVyU2lkZSwgc2V0UGFnaW5hdGlvbiwgZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgY29uc3QgY29tcHV0ZWRSb3dzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGlzU2VydmVyU2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucm93c051bWJlciB8fCAwXG4gICAgICA6IGZpbHRlcmVkU29ydGVkUm93c051bWJlci52YWx1ZVxuICApKVxuXG4gIGNvbnN0IGZpcnN0Um93SW5kZXggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgeyBwYWdlLCByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG4gICAgcmV0dXJuIChwYWdlIC0gMSkgKiByb3dzUGVyUGFnZVxuICB9KVxuXG4gIGNvbnN0IGxhc3RSb3dJbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB7IHBhZ2UsIHJvd3NQZXJQYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcbiAgICByZXR1cm4gcGFnZSAqIHJvd3NQZXJQYWdlXG4gIH0pXG5cbiAgY29uc3QgaXNGaXJzdFBhZ2UgPSBjb21wdXRlZCgoKSA9PiBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucGFnZSA9PT0gMSlcblxuICBjb25zdCBwYWdlc051bWJlciA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucm93c1BlclBhZ2UgPT09IDBcbiAgICAgID8gMVxuICAgICAgOiBNYXRoLm1heChcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC5jZWlsKGNvbXB1dGVkUm93c051bWJlci52YWx1ZSAvIGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSlcbiAgICAgIClcbiAgKSlcblxuICBjb25zdCBpc0xhc3RQYWdlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGxhc3RSb3dJbmRleC52YWx1ZSA9PT0gMFxuICAgICAgPyB0cnVlXG4gICAgICA6IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5wYWdlID49IHBhZ2VzTnVtYmVyLnZhbHVlXG4gICkpXG5cbiAgY29uc3QgY29tcHV0ZWRSb3dzUGVyUGFnZU9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qgb3B0cyA9IHByb3BzLnJvd3NQZXJQYWdlT3B0aW9ucy5pbmNsdWRlcyhpbm5lclBhZ2luYXRpb24udmFsdWUucm93c1BlclBhZ2UpXG4gICAgICA/IHByb3BzLnJvd3NQZXJQYWdlT3B0aW9uc1xuICAgICAgOiBbIGlubmVyUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSBdLmNvbmNhdChwcm9wcy5yb3dzUGVyUGFnZU9wdGlvbnMpXG5cbiAgICByZXR1cm4gb3B0cy5tYXAoY291bnQgPT4gKHtcbiAgICAgIGxhYmVsOiBjb3VudCA9PT0gMCA/ICRxLmxhbmcudGFibGUuYWxsUm93cyA6ICcnICsgY291bnQsXG4gICAgICB2YWx1ZTogY291bnRcbiAgICB9KSlcbiAgfSlcblxuICB3YXRjaChwYWdlc051bWJlciwgKGxhc3RQYWdlLCBvbGRMYXN0UGFnZSkgPT4ge1xuICAgIGlmIChsYXN0UGFnZSA9PT0gb2xkTGFzdFBhZ2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLnBhZ2VcbiAgICBpZiAobGFzdFBhZ2UgJiYgIWN1cnJlbnRQYWdlKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogMSB9KVxuICAgIH1cbiAgICBlbHNlIGlmIChsYXN0UGFnZSA8IGN1cnJlbnRQYWdlKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogbGFzdFBhZ2UgfSlcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gZmlyc3RQYWdlICgpIHtcbiAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogMSB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldlBhZ2UgKCkge1xuICAgIGNvbnN0IHsgcGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG4gICAgaWYgKHBhZ2UgPiAxKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogcGFnZSAtIDEgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0UGFnZSAoKSB7XG4gICAgY29uc3QgeyBwYWdlLCByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG4gICAgaWYgKGxhc3RSb3dJbmRleC52YWx1ZSA+IDAgJiYgcGFnZSAqIHJvd3NQZXJQYWdlIDwgY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogcGFnZSArIDEgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsYXN0UGFnZSAoKSB7XG4gICAgc2V0UGFnaW5hdGlvbih7IHBhZ2U6IHBhZ2VzTnVtYmVyLnZhbHVlIH0pXG4gIH1cblxuICBpZiAocHJvcHNbICdvblVwZGF0ZTpwYWdpbmF0aW9uJyBdICE9PSB2b2lkIDApIHtcbiAgICBlbWl0KCd1cGRhdGU6cGFnaW5hdGlvbicsIHsgLi4uY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZpcnN0Um93SW5kZXgsXG4gICAgbGFzdFJvd0luZGV4LFxuICAgIGlzRmlyc3RQYWdlLFxuICAgIGlzTGFzdFBhZ2UsXG4gICAgcGFnZXNOdW1iZXIsXG4gICAgY29tcHV0ZWRSb3dzUGVyUGFnZU9wdGlvbnMsXG4gICAgY29tcHV0ZWRSb3dzTnVtYmVyLFxuXG4gICAgZmlyc3RQYWdlLFxuICAgIHByZXZQYWdlLFxuICAgIG5leHRQYWdlLFxuICAgIGxhc3RQYWdlXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlVGFibGVSb3dTZWxlY3Rpb25Qcm9wcyA9IHtcbiAgc2VsZWN0aW9uOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdub25lJyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gWyAnc2luZ2xlJywgJ211bHRpcGxlJywgJ25vbmUnIF0uaW5jbHVkZXModilcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICB0eXBlOiBBcnJheSxcbiAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVJvd1NlbGVjdGlvbkVtaXRzID0gWyAndXBkYXRlOnNlbGVjdGVkJywgJ3NlbGVjdGlvbicgXVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVSb3dTZWxlY3Rpb24gKHByb3BzLCBlbWl0LCBjb21wdXRlZFJvd3MsIGdldFJvd0tleSkge1xuICBjb25zdCBzZWxlY3RlZEtleXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHt9XG4gICAgcHJvcHMuc2VsZWN0ZWQubWFwKGdldFJvd0tleS52YWx1ZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAga2V5c1sga2V5IF0gPSB0cnVlXG4gICAgfSlcbiAgICByZXR1cm4ga2V5c1xuICB9KVxuXG4gIGNvbnN0IGhhc1NlbGVjdGlvbk1vZGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLnNlbGVjdGlvbiAhPT0gJ25vbmUnXG4gIH0pXG5cbiAgY29uc3Qgc2luZ2xlU2VsZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiBwcm9wcy5zZWxlY3Rpb24gPT09ICdzaW5nbGUnXG4gIH0pXG5cbiAgY29uc3QgbXVsdGlwbGVTZWxlY3Rpb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLnNlbGVjdGlvbiA9PT0gJ211bHRpcGxlJ1xuICB9KVxuXG4gIGNvbnN0IGFsbFJvd3NTZWxlY3RlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgY29tcHV0ZWRSb3dzLnZhbHVlLmxlbmd0aCA+IDAgJiYgY29tcHV0ZWRSb3dzLnZhbHVlLmV2ZXJ5KFxuICAgICAgcm93ID0+IHNlbGVjdGVkS2V5cy52YWx1ZVsgZ2V0Um93S2V5LnZhbHVlKHJvdykgXSA9PT0gdHJ1ZVxuICAgIClcbiAgKVxuXG4gIGNvbnN0IHNvbWVSb3dzU2VsZWN0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgIGFsbFJvd3NTZWxlY3RlZC52YWx1ZSAhPT0gdHJ1ZVxuICAgICYmIGNvbXB1dGVkUm93cy52YWx1ZS5zb21lKHJvdyA9PiBzZWxlY3RlZEtleXMudmFsdWVbIGdldFJvd0tleS52YWx1ZShyb3cpIF0gPT09IHRydWUpXG4gIClcblxuICBjb25zdCByb3dzU2VsZWN0ZWROdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5zZWxlY3RlZC5sZW5ndGgpXG5cbiAgZnVuY3Rpb24gaXNSb3dTZWxlY3RlZCAoa2V5KSB7XG4gICAgcmV0dXJuIHNlbGVjdGVkS2V5cy52YWx1ZVsga2V5IF0gPT09IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uICgpIHtcbiAgICBlbWl0KCd1cGRhdGU6c2VsZWN0ZWQnLCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGlvbiAoa2V5cywgcm93cywgYWRkZWQsIGV2dCkge1xuICAgIGVtaXQoJ3NlbGVjdGlvbicsIHsgcm93cywgYWRkZWQsIGtleXMsIGV2dCB9KVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHNpbmdsZVNlbGVjdGlvbi52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyAoYWRkZWQgPT09IHRydWUgPyByb3dzIDogW10pXG4gICAgICA6IChcbiAgICAgICAgICBhZGRlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBwcm9wcy5zZWxlY3RlZC5jb25jYXQocm93cylcbiAgICAgICAgICAgIDogcHJvcHMuc2VsZWN0ZWQuZmlsdGVyKFxuICAgICAgICAgICAgICByb3cgPT4ga2V5cy5pbmNsdWRlcyhnZXRSb3dLZXkudmFsdWUocm93KSkgPT09IGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgIClcblxuICAgIGVtaXQoJ3VwZGF0ZTpzZWxlY3RlZCcsIHBheWxvYWQpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhhc1NlbGVjdGlvbk1vZGUsXG4gICAgc2luZ2xlU2VsZWN0aW9uLFxuICAgIG11bHRpcGxlU2VsZWN0aW9uLFxuICAgIGFsbFJvd3NTZWxlY3RlZCxcbiAgICBzb21lUm93c1NlbGVjdGVkLFxuICAgIHJvd3NTZWxlY3RlZE51bWJlcixcblxuICAgIGlzUm93U2VsZWN0ZWQsXG4gICAgY2xlYXJTZWxlY3Rpb24sXG4gICAgdXBkYXRlU2VsZWN0aW9uXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnXG5cbmZ1bmN0aW9uIGdldFZhbCAodmFsKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbClcbiAgICA/IHZhbC5zbGljZSgpXG4gICAgOiBbXVxufVxuXG5leHBvcnQgY29uc3QgdXNlVGFibGVSb3dFeHBhbmRQcm9wcyA9IHtcbiAgZXhwYW5kZWQ6IEFycmF5IC8vIHYtbW9kZWw6ZXhwYW5kZWRcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlUm93RXhwYW5kRW1pdHMgPSBbICd1cGRhdGU6ZXhwYW5kZWQnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYmxlUm93RXhwYW5kIChwcm9wcywgZW1pdCkge1xuICBjb25zdCBpbm5lckV4cGFuZGVkID0gcmVmKGdldFZhbChwcm9wcy5leHBhbmRlZCkpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZXhwYW5kZWQsIHZhbCA9PiB7XG4gICAgaW5uZXJFeHBhbmRlZC52YWx1ZSA9IGdldFZhbCh2YWwpXG4gIH0pXG5cbiAgZnVuY3Rpb24gaXNSb3dFeHBhbmRlZCAoa2V5KSB7XG4gICAgcmV0dXJuIGlubmVyRXhwYW5kZWQudmFsdWUuaW5jbHVkZXMoa2V5KVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0RXhwYW5kZWQgKHZhbCkge1xuICAgIGlmIChwcm9wcy5leHBhbmRlZCAhPT0gdm9pZCAwKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6ZXhwYW5kZWQnLCB2YWwpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaW5uZXJFeHBhbmRlZC52YWx1ZSA9IHZhbFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUV4cGFuZGVkIChrZXksIGFkZCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGlubmVyRXhwYW5kZWQudmFsdWUuc2xpY2UoKVxuICAgIGNvbnN0IGluZGV4ID0gdGFyZ2V0LmluZGV4T2Yoa2V5KVxuXG4gICAgaWYgKGFkZCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0YXJnZXQucHVzaChrZXkpXG4gICAgICAgIHNldEV4cGFuZGVkKHRhcmdldClcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0YXJnZXQuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgc2V0RXhwYW5kZWQodGFyZ2V0KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaXNSb3dFeHBhbmRlZCxcbiAgICBzZXRFeHBhbmRlZCxcbiAgICB1cGRhdGVFeHBhbmRlZFxuICB9XG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2lzLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlVGFibGVDb2x1bW5TZWxlY3Rpb25Qcm9wcyA9IHtcbiAgdmlzaWJsZUNvbHVtbnM6IEFycmF5XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZUNvbHVtblNlbGVjdGlvbiAocHJvcHMsIGNvbXB1dGVkUGFnaW5hdGlvbiwgaGFzU2VsZWN0aW9uTW9kZSkge1xuICBjb25zdCBjb2xMaXN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5jb2x1bW5zICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBwcm9wcy5jb2x1bW5zXG4gICAgfVxuXG4gICAgLy8gd2UgaW5mZXIgY29sdW1ucyBmcm9tIGZpcnN0IHJvd1xuICAgIGNvbnN0IHJvdyA9IHByb3BzLnJvd3NbIDAgXVxuXG4gICAgcmV0dXJuIHJvdyAhPT0gdm9pZCAwXG4gICAgICA/IE9iamVjdC5rZXlzKHJvdykubWFwKG5hbWUgPT4gKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbGFiZWw6IG5hbWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgZmllbGQ6IG5hbWUsXG4gICAgICAgIGFsaWduOiBpc051bWJlcihyb3dbIG5hbWUgXSkgPyAncmlnaHQnIDogJ2xlZnQnLFxuICAgICAgICBzb3J0YWJsZTogdHJ1ZVxuICAgICAgfSkpXG4gICAgICA6IFtdXG4gIH0pXG5cbiAgY29uc3QgY29tcHV0ZWRDb2xzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHsgc29ydEJ5LCBkZXNjZW5kaW5nIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcblxuICAgIGNvbnN0IGNvbHMgPSBwcm9wcy52aXNpYmxlQ29sdW1ucyAhPT0gdm9pZCAwXG4gICAgICA/IGNvbExpc3QudmFsdWUuZmlsdGVyKGNvbCA9PiBjb2wucmVxdWlyZWQgPT09IHRydWUgfHwgcHJvcHMudmlzaWJsZUNvbHVtbnMuaW5jbHVkZXMoY29sLm5hbWUpID09PSB0cnVlKVxuICAgICAgOiBjb2xMaXN0LnZhbHVlXG5cbiAgICByZXR1cm4gY29scy5tYXAoY29sID0+IHtcbiAgICAgIGNvbnN0IGFsaWduID0gY29sLmFsaWduIHx8ICdyaWdodCdcbiAgICAgIGNvbnN0IGFsaWduQ2xhc3MgPSBgdGV4dC0keyBhbGlnbiB9YFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5jb2wsXG4gICAgICAgIGFsaWduLFxuICAgICAgICBfX2ljb25DbGFzczogYHEtdGFibGVfX3NvcnQtaWNvbiBxLXRhYmxlX19zb3J0LWljb24tLSR7IGFsaWduIH1gLFxuICAgICAgICBfX3RoQ2xhc3M6IGFsaWduQ2xhc3NcbiAgICAgICAgICArIChjb2wuaGVhZGVyQ2xhc3NlcyAhPT0gdm9pZCAwID8gJyAnICsgY29sLmhlYWRlckNsYXNzZXMgOiAnJylcbiAgICAgICAgICArIChjb2wuc29ydGFibGUgPT09IHRydWUgPyAnIHNvcnRhYmxlJyA6ICcnKVxuICAgICAgICAgICsgKGNvbC5uYW1lID09PSBzb3J0QnkgPyBgIHNvcnRlZCAkeyBkZXNjZW5kaW5nID09PSB0cnVlID8gJ3NvcnQtZGVzYycgOiAnJyB9YCA6ICcnKSxcblxuICAgICAgICBfX3RkU3R5bGU6IGNvbC5zdHlsZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyAoXG4gICAgICAgICAgICAgIHR5cGVvZiBjb2wuc3R5bGUgIT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICA/ICgpID0+IGNvbC5zdHlsZVxuICAgICAgICAgICAgICAgIDogY29sLnN0eWxlXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiAoKSA9PiBudWxsLFxuXG4gICAgICAgIF9fdGRDbGFzczogY29sLmNsYXNzZXMgIT09IHZvaWQgMFxuICAgICAgICAgID8gKFxuICAgICAgICAgICAgICB0eXBlb2YgY29sLmNsYXNzZXMgIT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICA/ICgpID0+IGFsaWduQ2xhc3MgKyAnICcgKyBjb2wuY2xhc3Nlc1xuICAgICAgICAgICAgICAgIDogcm93ID0+IGFsaWduQ2xhc3MgKyAnICcgKyBjb2wuY2xhc3Nlcyhyb3cpXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiAoKSA9PiBhbGlnbkNsYXNzXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICBjb25zdCBjb21wdXRlZENvbHNNYXAgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgbmFtZXMgPSB7fVxuICAgIGNvbXB1dGVkQ29scy52YWx1ZS5mb3JFYWNoKGNvbCA9PiB7XG4gICAgICBuYW1lc1sgY29sLm5hbWUgXSA9IGNvbFxuICAgIH0pXG4gICAgcmV0dXJuIG5hbWVzXG4gIH0pXG5cbiAgY29uc3QgY29tcHV0ZWRDb2xzcGFuID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiBwcm9wcy50YWJsZUNvbHNwYW4gIT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy50YWJsZUNvbHNwYW5cbiAgICAgIDogY29tcHV0ZWRDb2xzLnZhbHVlLmxlbmd0aCArIChoYXNTZWxlY3Rpb25Nb2RlLnZhbHVlID09PSB0cnVlID8gMSA6IDApXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBjb2xMaXN0LFxuICAgIGNvbXB1dGVkQ29scyxcbiAgICBjb21wdXRlZENvbHNNYXAsXG4gICAgY29tcHV0ZWRDb2xzcGFuXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRVGggZnJvbSAnLi9RVGguanMnXG5cbmltcG9ydCBRU2VwYXJhdG9yIGZyb20gJy4uL3NlcGFyYXRvci9RU2VwYXJhdG9yLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVZpcnR1YWxTY3JvbGwgZnJvbSAnLi4vdmlydHVhbC1zY3JvbGwvUVZpcnR1YWxTY3JvbGwuanMnXG5pbXBvcnQgUVNlbGVjdCBmcm9tICcuLi9zZWxlY3QvUVNlbGVjdC5qcydcbmltcG9ydCBRTGluZWFyUHJvZ3Jlc3MgZnJvbSAnLi4vbGluZWFyLXByb2dyZXNzL1FMaW5lYXJQcm9ncmVzcy5qcydcbmltcG9ydCBRQ2hlY2tib3ggZnJvbSAnLi4vY2hlY2tib3gvUUNoZWNrYm94LmpzJ1xuaW1wb3J0IFFCdG4gZnJvbSAnLi4vYnRuL1FCdG4uanMnXG5cbmltcG9ydCBnZXRUYWJsZU1pZGRsZSBmcm9tICcuL2dldC10YWJsZS1taWRkbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgeyBjb21tb25WaXJ0UHJvcHNMaXN0IH0gZnJvbSAnLi4vdmlydHVhbC1zY3JvbGwvdXNlLXZpcnR1YWwtc2Nyb2xsLmpzJ1xuaW1wb3J0IHVzZUZ1bGxzY3JlZW4sIHsgdXNlRnVsbHNjcmVlblByb3BzLCB1c2VGdWxsc2NyZWVuRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mdWxsc2NyZWVuLmpzJ1xuXG5pbXBvcnQgeyB1c2VUYWJsZVNvcnQsIHVzZVRhYmxlU29ydFByb3BzIH0gZnJvbSAnLi90YWJsZS1zb3J0LmpzJ1xuaW1wb3J0IHsgdXNlVGFibGVGaWx0ZXIsIHVzZVRhYmxlRmlsdGVyUHJvcHMgfSBmcm9tICcuL3RhYmxlLWZpbHRlci5qcydcbmltcG9ydCB7IHVzZVRhYmxlUGFnaW5hdGlvblN0YXRlLCB1c2VUYWJsZVBhZ2luYXRpb24sIHVzZVRhYmxlUGFnaW5hdGlvblByb3BzIH0gZnJvbSAnLi90YWJsZS1wYWdpbmF0aW9uLmpzJ1xuaW1wb3J0IHsgdXNlVGFibGVSb3dTZWxlY3Rpb24sIHVzZVRhYmxlUm93U2VsZWN0aW9uUHJvcHMsIHVzZVRhYmxlUm93U2VsZWN0aW9uRW1pdHMgfSBmcm9tICcuL3RhYmxlLXJvdy1zZWxlY3Rpb24uanMnXG5pbXBvcnQgeyB1c2VUYWJsZVJvd0V4cGFuZCwgdXNlVGFibGVSb3dFeHBhbmRQcm9wcywgdXNlVGFibGVSb3dFeHBhbmRFbWl0cyB9IGZyb20gJy4vdGFibGUtcm93LWV4cGFuZC5qcydcbmltcG9ydCB7IHVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uLCB1c2VUYWJsZUNvbHVtblNlbGVjdGlvblByb3BzIH0gZnJvbSAnLi90YWJsZS1jb2x1bW4tc2VsZWN0aW9uLmpzJ1xuXG5pbXBvcnQgeyBpbmplY3RQcm9wLCBpbmplY3RNdWx0aXBsZVByb3BzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pbmplY3Qtb2JqLXByb3AuanMnXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuY29uc3QgYm90dG9tQ2xhc3MgPSAncS10YWJsZV9fYm90dG9tIHJvdyBpdGVtcy1jZW50ZXInXG5cbmNvbnN0IGNvbW1vblZpcnRQcm9wc09iaiA9IHt9XG5jb21tb25WaXJ0UHJvcHNMaXN0LmZvckVhY2gocCA9PiB7IGNvbW1vblZpcnRQcm9wc09ialsgcCBdID0ge30gfSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWJsZScsXG5cbiAgcHJvcHM6IHtcbiAgICByb3dzOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcbiAgICByb3dLZXk6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBGdW5jdGlvbiBdLFxuICAgICAgZGVmYXVsdDogJ2lkJ1xuICAgIH0sXG5cbiAgICBjb2x1bW5zOiBBcnJheSxcbiAgICBsb2FkaW5nOiBCb29sZWFuLFxuXG4gICAgaWNvbkZpcnN0UGFnZTogU3RyaW5nLFxuICAgIGljb25QcmV2UGFnZTogU3RyaW5nLFxuICAgIGljb25OZXh0UGFnZTogU3RyaW5nLFxuICAgIGljb25MYXN0UGFnZTogU3RyaW5nLFxuXG4gICAgdGl0bGU6IFN0cmluZyxcblxuICAgIGhpZGVIZWFkZXI6IEJvb2xlYW4sXG5cbiAgICBncmlkOiBCb29sZWFuLFxuICAgIGdyaWRIZWFkZXI6IEJvb2xlYW4sXG5cbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBzZXBhcmF0b3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdob3Jpem9udGFsJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdob3Jpem9udGFsJywgJ3ZlcnRpY2FsJywgJ2NlbGwnLCAnbm9uZScgXS5pbmNsdWRlcyh2KVxuICAgIH0sXG4gICAgd3JhcENlbGxzOiBCb29sZWFuLFxuXG4gICAgdmlydHVhbFNjcm9sbDogQm9vbGVhbixcbiAgICB2aXJ0dWFsU2Nyb2xsVGFyZ2V0OiB7XG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuICAgIC4uLmNvbW1vblZpcnRQcm9wc09iaixcblxuICAgIG5vRGF0YUxhYmVsOiBTdHJpbmcsXG4gICAgbm9SZXN1bHRzTGFiZWw6IFN0cmluZyxcbiAgICBsb2FkaW5nTGFiZWw6IFN0cmluZyxcbiAgICBzZWxlY3RlZFJvd3NMYWJlbDogRnVuY3Rpb24sXG4gICAgcm93c1BlclBhZ2VMYWJlbDogU3RyaW5nLFxuICAgIHBhZ2luYXRpb25MYWJlbDogRnVuY3Rpb24sXG5cbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2dyZXktOCdcbiAgICB9LFxuXG4gICAgdGl0bGVDbGFzczogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICB0YWJsZVN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIHRhYmxlQ2xhc3M6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgdGFibGVIZWFkZXJTdHlsZTogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICB0YWJsZUhlYWRlckNsYXNzOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIGNhcmRDb250YWluZXJDbGFzczogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICBjYXJkQ29udGFpbmVyU3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgY2FyZFN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIGNhcmRDbGFzczogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcblxuICAgIGhpZGVCb3R0b206IEJvb2xlYW4sXG4gICAgaGlkZVNlbGVjdGVkQmFubmVyOiBCb29sZWFuLFxuICAgIGhpZGVOb0RhdGE6IEJvb2xlYW4sXG4gICAgaGlkZVBhZ2luYXRpb246IEJvb2xlYW4sXG5cbiAgICBvblJvd0NsaWNrOiBGdW5jdGlvbixcbiAgICBvblJvd0RibGNsaWNrOiBGdW5jdGlvbixcbiAgICBvblJvd0NvbnRleHRtZW51OiBGdW5jdGlvbixcblxuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VGdWxsc2NyZWVuUHJvcHMsXG5cbiAgICAuLi51c2VUYWJsZUNvbHVtblNlbGVjdGlvblByb3BzLFxuICAgIC4uLnVzZVRhYmxlRmlsdGVyUHJvcHMsXG4gICAgLi4udXNlVGFibGVQYWdpbmF0aW9uUHJvcHMsXG4gICAgLi4udXNlVGFibGVSb3dFeHBhbmRQcm9wcyxcbiAgICAuLi51c2VUYWJsZVJvd1NlbGVjdGlvblByb3BzLFxuICAgIC4uLnVzZVRhYmxlU29ydFByb3BzXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAncmVxdWVzdCcsICd2aXJ0dWFsLXNjcm9sbCcsXG4gICAgLi4udXNlRnVsbHNjcmVlbkVtaXRzLFxuICAgIC4uLnVzZVRhYmxlUm93RXhwYW5kRW1pdHMsXG4gICAgLi4udXNlVGFibGVSb3dTZWxlY3Rpb25FbWl0c1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgaW5GdWxsc2NyZWVuLCB0b2dnbGVGdWxsc2NyZWVuIH0gPSB1c2VGdWxsc2NyZWVuKClcblxuICAgIGNvbnN0IGdldFJvd0tleSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHR5cGVvZiBwcm9wcy5yb3dLZXkgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBwcm9wcy5yb3dLZXlcbiAgICAgICAgOiByb3cgPT4gcm93WyBwcm9wcy5yb3dLZXkgXVxuICAgICkpXG5cbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgdmlydFNjcm9sbFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGhhc1ZpcnRTY3JvbGwgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5ncmlkICE9PSB0cnVlICYmIHByb3BzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpXG5cbiAgICBjb25zdCBjYXJkRGVmYXVsdENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICcgcS10YWJsZV9fY2FyZCdcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZV9fY2FyZC0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtdGFibGUtLXNxdWFyZScgOiAnJylcbiAgICAgICsgKHByb3BzLmZsYXQgPT09IHRydWUgPyAnIHEtdGFibGUtLWZsYXQnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tYm9yZGVyZWQnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgX19jb250YWluZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS10YWJsZV9fY29udGFpbmVyIHEtdGFibGUtLSR7IHByb3BzLnNlcGFyYXRvciB9LXNlcGFyYXRvciBjb2x1bW4gbm8td3JhcGBcbiAgICAgICsgKHByb3BzLmdyaWQgPT09IHRydWUgPyAnIHEtdGFibGUtLWdyaWQnIDogY2FyZERlZmF1bHRDbGFzcy52YWx1ZSlcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXRhYmxlLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLndyYXBDZWxscyA9PT0gZmFsc2UgPyAnIHEtdGFibGUtLW5vLXdyYXAnIDogJycpXG4gICAgICArIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUgPyAnIGZ1bGxzY3JlZW4gc2Nyb2xsJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIF9fY29udGFpbmVyQ2xhc3MudmFsdWUgKyAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tbG9hZGluZycgOiAnJylcbiAgICApXG5cbiAgICB3YXRjaChcbiAgICAgICgpID0+IHByb3BzLnRhYmxlU3R5bGUgKyBwcm9wcy50YWJsZUNsYXNzICsgcHJvcHMudGFibGVIZWFkZXJTdHlsZSArIHByb3BzLnRhYmxlSGVhZGVyQ2xhc3MgKyBfX2NvbnRhaW5lckNsYXNzLnZhbHVlLFxuICAgICAgKCkgPT4geyBoYXNWaXJ0U2Nyb2xsLnZhbHVlID09PSB0cnVlICYmIHZpcnRTY3JvbGxSZWYudmFsdWUgIT09IG51bGwgJiYgdmlydFNjcm9sbFJlZi52YWx1ZS5yZXNldCgpIH1cbiAgICApXG5cbiAgICBjb25zdCB7XG4gICAgICBpbm5lclBhZ2luYXRpb24sXG4gICAgICBjb21wdXRlZFBhZ2luYXRpb24sXG4gICAgICBpc1NlcnZlclNpZGUsXG5cbiAgICAgIHJlcXVlc3RTZXJ2ZXJJbnRlcmFjdGlvbixcbiAgICAgIHNldFBhZ2luYXRpb25cbiAgICB9ID0gdXNlVGFibGVQYWdpbmF0aW9uU3RhdGUodm0sIGdldENlbGxWYWx1ZSlcblxuICAgIGNvbnN0IHsgY29tcHV0ZWRGaWx0ZXJNZXRob2QgfSA9IHVzZVRhYmxlRmlsdGVyKHByb3BzLCBzZXRQYWdpbmF0aW9uKVxuICAgIGNvbnN0IHsgaXNSb3dFeHBhbmRlZCwgc2V0RXhwYW5kZWQsIHVwZGF0ZUV4cGFuZGVkIH0gPSB1c2VUYWJsZVJvd0V4cGFuZChwcm9wcywgZW1pdClcblxuICAgIGNvbnN0IGZpbHRlcmVkU29ydGVkUm93cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGxldCByb3dzID0gcHJvcHMucm93c1xuXG4gICAgICBpZiAoaXNTZXJ2ZXJTaWRlLnZhbHVlID09PSB0cnVlIHx8IHJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiByb3dzXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc29ydEJ5LCBkZXNjZW5kaW5nIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcblxuICAgICAgaWYgKHByb3BzLmZpbHRlcikge1xuICAgICAgICByb3dzID0gY29tcHV0ZWRGaWx0ZXJNZXRob2QudmFsdWUocm93cywgcHJvcHMuZmlsdGVyLCBjb21wdXRlZENvbHMudmFsdWUsIGdldENlbGxWYWx1ZSlcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtblRvU29ydC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICByb3dzID0gY29tcHV0ZWRTb3J0TWV0aG9kLnZhbHVlKFxuICAgICAgICAgIHByb3BzLnJvd3MgPT09IHJvd3MgPyByb3dzLnNsaWNlKCkgOiByb3dzLFxuICAgICAgICAgIHNvcnRCeSxcbiAgICAgICAgICBkZXNjZW5kaW5nXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvd3NcbiAgICB9KVxuXG4gICAgY29uc3QgZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gZmlsdGVyZWRTb3J0ZWRSb3dzLnZhbHVlLmxlbmd0aClcblxuICAgIGNvbnN0IGNvbXB1dGVkUm93cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGxldCByb3dzID0gZmlsdGVyZWRTb3J0ZWRSb3dzLnZhbHVlXG5cbiAgICAgIGlmIChpc1NlcnZlclNpZGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJvd3NcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG5cbiAgICAgIGlmIChyb3dzUGVyUGFnZSAhPT0gMCkge1xuICAgICAgICBpZiAoZmlyc3RSb3dJbmRleC52YWx1ZSA9PT0gMCAmJiBwcm9wcy5yb3dzICE9PSByb3dzKSB7XG4gICAgICAgICAgaWYgKHJvd3MubGVuZ3RoID4gbGFzdFJvd0luZGV4LnZhbHVlKSB7XG4gICAgICAgICAgICByb3dzID0gcm93cy5zbGljZSgwLCBsYXN0Um93SW5kZXgudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJvd3MgPSByb3dzLnNsaWNlKGZpcnN0Um93SW5kZXgudmFsdWUsIGxhc3RSb3dJbmRleC52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm93c1xuICAgIH0pXG5cbiAgICBjb25zdCB7XG4gICAgICBoYXNTZWxlY3Rpb25Nb2RlLFxuICAgICAgc2luZ2xlU2VsZWN0aW9uLFxuICAgICAgbXVsdGlwbGVTZWxlY3Rpb24sXG4gICAgICBhbGxSb3dzU2VsZWN0ZWQsXG4gICAgICBzb21lUm93c1NlbGVjdGVkLFxuICAgICAgcm93c1NlbGVjdGVkTnVtYmVyLFxuXG4gICAgICBpc1Jvd1NlbGVjdGVkLFxuICAgICAgY2xlYXJTZWxlY3Rpb24sXG4gICAgICB1cGRhdGVTZWxlY3Rpb25cbiAgICB9ID0gdXNlVGFibGVSb3dTZWxlY3Rpb24ocHJvcHMsIGVtaXQsIGNvbXB1dGVkUm93cywgZ2V0Um93S2V5KVxuXG4gICAgY29uc3QgeyBjb2xMaXN0LCBjb21wdXRlZENvbHMsIGNvbXB1dGVkQ29sc01hcCwgY29tcHV0ZWRDb2xzcGFuIH0gPSB1c2VUYWJsZUNvbHVtblNlbGVjdGlvbihwcm9wcywgY29tcHV0ZWRQYWdpbmF0aW9uLCBoYXNTZWxlY3Rpb25Nb2RlKVxuXG4gICAgY29uc3QgeyBjb2x1bW5Ub1NvcnQsIGNvbXB1dGVkU29ydE1ldGhvZCwgc29ydCB9ID0gdXNlVGFibGVTb3J0KHByb3BzLCBjb21wdXRlZFBhZ2luYXRpb24sIGNvbExpc3QsIHNldFBhZ2luYXRpb24pXG5cbiAgICBjb25zdCB7XG4gICAgICBmaXJzdFJvd0luZGV4LFxuICAgICAgbGFzdFJvd0luZGV4LFxuICAgICAgaXNGaXJzdFBhZ2UsXG4gICAgICBpc0xhc3RQYWdlLFxuICAgICAgcGFnZXNOdW1iZXIsXG4gICAgICBjb21wdXRlZFJvd3NQZXJQYWdlT3B0aW9ucyxcbiAgICAgIGNvbXB1dGVkUm93c051bWJlcixcblxuICAgICAgZmlyc3RQYWdlLFxuICAgICAgcHJldlBhZ2UsXG4gICAgICBuZXh0UGFnZSxcbiAgICAgIGxhc3RQYWdlXG4gICAgfSA9IHVzZVRhYmxlUGFnaW5hdGlvbih2bSwgaW5uZXJQYWdpbmF0aW9uLCBjb21wdXRlZFBhZ2luYXRpb24sIGlzU2VydmVyU2lkZSwgc2V0UGFnaW5hdGlvbiwgZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyKVxuXG4gICAgY29uc3Qgbm90aGluZ1RvRGlzcGxheSA9IGNvbXB1dGVkKCgpID0+IGNvbXB1dGVkUm93cy52YWx1ZS5sZW5ndGggPT09IDApXG5cbiAgICBjb25zdCB2aXJ0UHJvcHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuXG4gICAgICBjb21tb25WaXJ0UHJvcHNMaXN0XG4gICAgICAgIC5mb3JFYWNoKHAgPT4geyBhY2NbIHAgXSA9IHByb3BzWyBwIF0gfSlcblxuICAgICAgaWYgKGFjYy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUgPT09IHZvaWQgMCkge1xuICAgICAgICBhY2MudmlydHVhbFNjcm9sbEl0ZW1TaXplID0gcHJvcHMuZGVuc2UgPT09IHRydWUgPyAyOCA6IDQ4XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gcmVzZXRWaXJ0dWFsU2Nyb2xsICgpIHtcbiAgICAgIGhhc1ZpcnRTY3JvbGwudmFsdWUgPT09IHRydWUgJiYgdmlydFNjcm9sbFJlZi52YWx1ZS5yZXNldCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keSAoKSB7XG4gICAgICBpZiAocHJvcHMuZ3JpZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZ2V0R3JpZEJvZHkoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoZWFkZXIgPSBwcm9wcy5oaWRlSGVhZGVyICE9PSB0cnVlID8gZ2V0VEhlYWQgOiBudWxsXG5cbiAgICAgIGlmIChoYXNWaXJ0U2Nyb2xsLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRvcFJvdyA9IHNsb3RzWyAndG9wLXJvdycgXVxuICAgICAgICBjb25zdCBib3R0b21Sb3cgPSBzbG90c1sgJ2JvdHRvbS1yb3cnIF1cblxuICAgICAgICBjb25zdCB2aXJ0U2xvdHMgPSB7XG4gICAgICAgICAgZGVmYXVsdDogcHJvcHMgPT4gZ2V0VEJvZHlUUihwcm9wcy5pdGVtLCBzbG90cy5ib2R5LCBwcm9wcy5pbmRleClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3BSb3cgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnN0IHRvcENvbnRlbnQgPSBoKCd0Ym9keScsIHRvcFJvdyh7IGNvbHM6IGNvbXB1dGVkQ29scy52YWx1ZSB9KSlcblxuICAgICAgICAgIHZpcnRTbG90cy5iZWZvcmUgPSBoZWFkZXIgPT09IG51bGxcbiAgICAgICAgICAgID8gKCkgPT4gdG9wQ29udGVudFxuICAgICAgICAgICAgOiAoKSA9PiBbIGhlYWRlcigpIF0uY29uY2F0KHRvcENvbnRlbnQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGVhZGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgdmlydFNsb3RzLmJlZm9yZSA9IGhlYWRlclxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvdHRvbVJvdyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgdmlydFNsb3RzLmFmdGVyID0gKCkgPT4gaCgndGJvZHknLCBib3R0b21Sb3coeyBjb2xzOiBjb21wdXRlZENvbHMudmFsdWUgfSkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaChRVmlydHVhbFNjcm9sbCwge1xuICAgICAgICAgIHJlZjogdmlydFNjcm9sbFJlZixcbiAgICAgICAgICBjbGFzczogcHJvcHMudGFibGVDbGFzcyxcbiAgICAgICAgICBzdHlsZTogcHJvcHMudGFibGVTdHlsZSxcbiAgICAgICAgICAuLi52aXJ0UHJvcHMudmFsdWUsXG4gICAgICAgICAgc2Nyb2xsVGFyZ2V0OiBwcm9wcy52aXJ0dWFsU2Nyb2xsVGFyZ2V0LFxuICAgICAgICAgIGl0ZW1zOiBjb21wdXRlZFJvd3MudmFsdWUsXG4gICAgICAgICAgdHlwZTogJ19fcXRhYmxlJyxcbiAgICAgICAgICB0YWJsZUNvbHNwYW46IGNvbXB1dGVkQ29sc3Bhbi52YWx1ZSxcbiAgICAgICAgICBvblZpcnR1YWxTY3JvbGw6IG9uVlNjcm9sbFxuICAgICAgICB9LCB2aXJ0U2xvdHMpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBnZXRUQm9keSgpXG4gICAgICBdXG5cbiAgICAgIGlmIChoZWFkZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2hpbGQudW5zaGlmdChoZWFkZXIoKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldFRhYmxlTWlkZGxlKHtcbiAgICAgICAgY2xhc3M6IFsgJ3EtdGFibGVfX21pZGRsZSBzY3JvbGwnLCBwcm9wcy50YWJsZUNsYXNzIF0sXG4gICAgICAgIHN0eWxlOiBwcm9wcy50YWJsZVN0eWxlXG4gICAgICB9LCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUbyAodG9JbmRleCwgZWRnZSkge1xuICAgICAgaWYgKHZpcnRTY3JvbGxSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdmlydFNjcm9sbFJlZi52YWx1ZS5zY3JvbGxUbyh0b0luZGV4LCBlZGdlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdG9JbmRleCA9IHBhcnNlSW50KHRvSW5kZXgsIDEwKVxuICAgICAgY29uc3Qgcm93RWwgPSByb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoYHRib2R5IHRyOm50aC1vZi10eXBlKCR7IHRvSW5kZXggKyAxIH0pYClcblxuICAgICAgaWYgKHJvd0VsICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbFRhcmdldCA9IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignLnEtdGFibGVfX21pZGRsZS5zY3JvbGwnKVxuICAgICAgICBjb25zdCB7IG9mZnNldFRvcCB9ID0gcm93RWxcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gb2Zmc2V0VG9wIDwgc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcCA/ICdkZWNyZWFzZScgOiAnaW5jcmVhc2UnXG5cbiAgICAgICAgc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcCA9IG9mZnNldFRvcFxuXG4gICAgICAgIGVtaXQoJ3ZpcnR1YWwtc2Nyb2xsJywge1xuICAgICAgICAgIGluZGV4OiB0b0luZGV4LFxuICAgICAgICAgIGZyb206IDAsXG4gICAgICAgICAgdG86IGlubmVyUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSAtIDEsXG4gICAgICAgICAgZGlyZWN0aW9uXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25WU2Nyb2xsIChpbmZvKSB7XG4gICAgICBlbWl0KCd2aXJ0dWFsLXNjcm9sbCcsIGluZm8pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvZ3Jlc3MgKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgaChRTGluZWFyUHJvZ3Jlc3MsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdGFibGVfX2xpbmVhci1wcm9ncmVzcycsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxuICAgICAgICAgIHRyYWNrQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUQm9keVRSIChyb3csIGJvZHlTbG90LCBwYWdlSW5kZXgpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGtleSA9IGdldFJvd0tleS52YWx1ZShyb3cpLFxuICAgICAgICBzZWxlY3RlZCA9IGlzUm93U2VsZWN0ZWQoa2V5KVxuXG4gICAgICBpZiAoYm9keVNsb3QgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gYm9keVNsb3QoXG4gICAgICAgICAgZ2V0Qm9keVNjb3BlKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgIHBhZ2VJbmRleCxcbiAgICAgICAgICAgIF9fdHJDbGFzczogc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJydcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGJvZHlDZWxsID0gc2xvdHNbICdib2R5LWNlbGwnIF0sXG4gICAgICAgIGNoaWxkID0gY29tcHV0ZWRDb2xzLnZhbHVlLm1hcChjb2wgPT4ge1xuICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICBib2R5Q2VsbENvbCA9IHNsb3RzWyBgYm9keS1jZWxsLSR7IGNvbC5uYW1lIH1gIF0sXG4gICAgICAgICAgICBzbG90ID0gYm9keUNlbGxDb2wgIT09IHZvaWQgMCA/IGJvZHlDZWxsQ29sIDogYm9keUNlbGxcblxuICAgICAgICAgIHJldHVybiBzbG90ICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gc2xvdChnZXRCb2R5Q2VsbFNjb3BlKHsga2V5LCByb3csIHBhZ2VJbmRleCwgY29sIH0pKVxuICAgICAgICAgICAgOiBoKCd0ZCcsIHtcbiAgICAgICAgICAgICAgY2xhc3M6IGNvbC5fX3RkQ2xhc3Mocm93KSxcbiAgICAgICAgICAgICAgc3R5bGU6IGNvbC5fX3RkU3R5bGUocm93KVxuICAgICAgICAgICAgfSwgZ2V0Q2VsbFZhbHVlKGNvbCwgcm93KSlcbiAgICAgICAgfSlcblxuICAgICAgaWYgKGhhc1NlbGVjdGlvbk1vZGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgc2xvdCA9IHNsb3RzWyAnYm9keS1zZWxlY3Rpb24nIF1cbiAgICAgICAgY29uc3QgY29udGVudCA9IHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdChnZXRCb2R5U2VsZWN0aW9uU2NvcGUoeyBrZXksIHJvdywgcGFnZUluZGV4IH0pKVxuICAgICAgICAgIDogW1xuICAgICAgICAgICAgICBoKFFDaGVja2JveCwge1xuICAgICAgICAgICAgICAgIG1vZGVsVmFsdWU6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWUsXG4gICAgICAgICAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICAgICAgICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogKGFkZGluZywgZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3Rpb24oWyBrZXkgXSwgWyByb3cgXSwgYWRkaW5nLCBldnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuXG4gICAgICAgIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgICAgaCgndGQnLCB7IGNsYXNzOiAncS10YWJsZS0tY29sLWF1dG8td2lkdGgnIH0sIGNvbnRlbnQpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IHsga2V5LCBjbGFzczogeyBzZWxlY3RlZCB9IH1cblxuICAgICAgaWYgKHByb3BzLm9uUm93Q2xpY2sgIT09IHZvaWQgMCkge1xuICAgICAgICBkYXRhLmNsYXNzWyAnY3Vyc29yLXBvaW50ZXInIF0gPSB0cnVlXG4gICAgICAgIGRhdGEub25DbGljayA9IGV2dCA9PiB7XG4gICAgICAgICAgZW1pdCgnUm93Q2xpY2snLCBldnQsIHJvdywgcGFnZUluZGV4KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vblJvd0RibGNsaWNrICE9PSB2b2lkIDApIHtcbiAgICAgICAgZGF0YS5jbGFzc1sgJ2N1cnNvci1wb2ludGVyJyBdID0gdHJ1ZVxuICAgICAgICBkYXRhLm9uRGJsY2xpY2sgPSBldnQgPT4ge1xuICAgICAgICAgIGVtaXQoJ1Jvd0RibGNsaWNrJywgZXZ0LCByb3csIHBhZ2VJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25Sb3dDb250ZXh0bWVudSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRhdGEuY2xhc3NbICdjdXJzb3ItcG9pbnRlcicgXSA9IHRydWVcbiAgICAgICAgZGF0YS5vbkNvbnRleHRtZW51ID0gZXZ0ID0+IHtcbiAgICAgICAgICBlbWl0KCdSb3dDb250ZXh0bWVudScsIGV2dCwgcm93LCBwYWdlSW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ3RyJywgZGF0YSwgY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VEJvZHkgKCkge1xuICAgICAgY29uc3RcbiAgICAgICAgYm9keSA9IHNsb3RzLmJvZHksXG4gICAgICAgIHRvcFJvdyA9IHNsb3RzWyAndG9wLXJvdycgXSxcbiAgICAgICAgYm90dG9tUm93ID0gc2xvdHNbICdib3R0b20tcm93JyBdXG5cbiAgICAgIGxldCBjaGlsZCA9IGNvbXB1dGVkUm93cy52YWx1ZS5tYXAoXG4gICAgICAgIChyb3csIHBhZ2VJbmRleCkgPT4gZ2V0VEJvZHlUUihyb3csIGJvZHksIHBhZ2VJbmRleClcbiAgICAgIClcblxuICAgICAgaWYgKHRvcFJvdyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkID0gdG9wUm93KHsgY29sczogY29tcHV0ZWRDb2xzLnZhbHVlIH0pLmNvbmNhdChjaGlsZClcbiAgICAgIH1cbiAgICAgIGlmIChib3R0b21Sb3cgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZCA9IGNoaWxkLmNvbmNhdChib3R0b21Sb3coeyBjb2xzOiBjb21wdXRlZENvbHMudmFsdWUgfSkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCd0Ym9keScsIGNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHlTY29wZSAoZGF0YSkge1xuICAgICAgaW5qZWN0Qm9keUNvbW1vblNjb3BlKGRhdGEpXG5cbiAgICAgIGRhdGEuY29scyA9IGRhdGEuY29scy5tYXAoY29sID0+IHtcbiAgICAgICAgY29uc3QgYyA9IHsgLi4uY29sIH1cbiAgICAgICAgaW5qZWN0UHJvcChjLCAndmFsdWUnLCAoKSA9PiBnZXRDZWxsVmFsdWUoY29sLCBkYXRhLnJvdykpXG4gICAgICAgIHJldHVybiBjXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHlDZWxsU2NvcGUgKGRhdGEpIHtcbiAgICAgIGluamVjdEJvZHlDb21tb25TY29wZShkYXRhKVxuICAgICAgaW5qZWN0UHJvcChkYXRhLCAndmFsdWUnLCAoKSA9PiBnZXRDZWxsVmFsdWUoZGF0YS5jb2wsIGRhdGEucm93KSlcbiAgICAgIHJldHVybiBkYXRhXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keVNlbGVjdGlvblNjb3BlIChkYXRhKSB7XG4gICAgICBpbmplY3RCb2R5Q29tbW9uU2NvcGUoZGF0YSlcbiAgICAgIHJldHVybiBkYXRhXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5qZWN0Qm9keUNvbW1vblNjb3BlIChkYXRhKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgY29sczogY29tcHV0ZWRDb2xzLnZhbHVlLFxuICAgICAgICBjb2xzTWFwOiBjb21wdXRlZENvbHNNYXAudmFsdWUsXG4gICAgICAgIHNvcnQsXG4gICAgICAgIHJvd0luZGV4OiBmaXJzdFJvd0luZGV4LnZhbHVlICsgZGF0YS5wYWdlSW5kZXgsXG4gICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2VcbiAgICAgIH0pXG5cbiAgICAgIGhhc1NlbGVjdGlvbk1vZGUudmFsdWUgPT09IHRydWUgJiYgaW5qZWN0UHJvcChcbiAgICAgICAgZGF0YSxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICAgICAgKCkgPT4gaXNSb3dTZWxlY3RlZChkYXRhLmtleSksXG4gICAgICAgIChhZGRpbmcsIGV2dCkgPT4ge1xuICAgICAgICAgIHVwZGF0ZVNlbGVjdGlvbihbIGRhdGEua2V5IF0sIFsgZGF0YS5yb3cgXSwgYWRkaW5nLCBldnQpXG4gICAgICAgIH1cbiAgICAgIClcblxuICAgICAgaW5qZWN0UHJvcChcbiAgICAgICAgZGF0YSxcbiAgICAgICAgJ2V4cGFuZCcsXG4gICAgICAgICgpID0+IGlzUm93RXhwYW5kZWQoZGF0YS5rZXkpLFxuICAgICAgICBhZGRpbmcgPT4geyB1cGRhdGVFeHBhbmRlZChkYXRhLmtleSwgYWRkaW5nKSB9XG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q2VsbFZhbHVlIChjb2wsIHJvdykge1xuICAgICAgY29uc3QgdmFsID0gdHlwZW9mIGNvbC5maWVsZCA9PT0gJ2Z1bmN0aW9uJyA/IGNvbC5maWVsZChyb3cpIDogcm93WyBjb2wuZmllbGQgXVxuICAgICAgcmV0dXJuIGNvbC5mb3JtYXQgIT09IHZvaWQgMCA/IGNvbC5mb3JtYXQodmFsLCByb3cpIDogdmFsXG4gICAgfVxuXG4gICAgY29uc3QgbWFyZ2luYWxzU2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgcGFnaW5hdGlvbjogY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLFxuICAgICAgcGFnZXNOdW1iZXI6IHBhZ2VzTnVtYmVyLnZhbHVlLFxuICAgICAgaXNGaXJzdFBhZ2U6IGlzRmlyc3RQYWdlLnZhbHVlLFxuICAgICAgaXNMYXN0UGFnZTogaXNMYXN0UGFnZS52YWx1ZSxcbiAgICAgIGZpcnN0UGFnZSxcbiAgICAgIHByZXZQYWdlLFxuICAgICAgbmV4dFBhZ2UsXG4gICAgICBsYXN0UGFnZSxcblxuICAgICAgaW5GdWxsc2NyZWVuOiBpbkZ1bGxzY3JlZW4udmFsdWUsXG4gICAgICB0b2dnbGVGdWxsc2NyZWVuXG4gICAgfSkpXG5cbiAgICBmdW5jdGlvbiBnZXRUb3BEaXYgKCkge1xuICAgICAgY29uc3RcbiAgICAgICAgdG9wID0gc2xvdHMudG9wLFxuICAgICAgICB0b3BMZWZ0ID0gc2xvdHNbICd0b3AtbGVmdCcgXSxcbiAgICAgICAgdG9wUmlnaHQgPSBzbG90c1sgJ3RvcC1yaWdodCcgXSxcbiAgICAgICAgdG9wU2VsZWN0aW9uID0gc2xvdHNbICd0b3Atc2VsZWN0aW9uJyBdLFxuICAgICAgICBoYXNTZWxlY3Rpb24gPSBoYXNTZWxlY3Rpb25Nb2RlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgJiYgdG9wU2VsZWN0aW9uICE9PSB2b2lkIDBcbiAgICAgICAgICAmJiByb3dzU2VsZWN0ZWROdW1iZXIudmFsdWUgPiAwLFxuICAgICAgICB0b3BDbGFzcyA9ICdxLXRhYmxlX190b3AgcmVsYXRpdmUtcG9zaXRpb24gcm93IGl0ZW1zLWNlbnRlcidcblxuICAgICAgaWYgKHRvcCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiB0b3BDbGFzcyB9LCBbIHRvcChtYXJnaW5hbHNTY29wZS52YWx1ZSkgXSlcbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkXG5cbiAgICAgIGlmIChoYXNTZWxlY3Rpb24gPT09IHRydWUpIHtcbiAgICAgICAgY2hpbGQgPSB0b3BTZWxlY3Rpb24obWFyZ2luYWxzU2NvcGUudmFsdWUpLnNsaWNlKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IFtdXG5cbiAgICAgICAgaWYgKHRvcExlZnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZS1jb250cm9sJyB9LCBbXG4gICAgICAgICAgICAgIHRvcExlZnQobWFyZ2luYWxzU2NvcGUudmFsdWUpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcy50aXRsZSkge1xuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fY29udHJvbCcgfSwgW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6IFsgJ3EtdGFibGVfX3RpdGxlJywgcHJvcHMudGl0bGVDbGFzcyBdXG4gICAgICAgICAgICAgIH0sIHByb3BzLnRpdGxlKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRvcFJpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fc2VwYXJhdG9yIGNvbCcgfSlcbiAgICAgICAgKVxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19jb250cm9sJyB9LCBbXG4gICAgICAgICAgICB0b3BSaWdodChtYXJnaW5hbHNTY29wZS52YWx1ZSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiB0b3BDbGFzcyB9LCBjaGlsZClcbiAgICB9XG5cbiAgICBjb25zdCBoZWFkZXJTZWxlY3RlZFZhbHVlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc29tZVJvd3NTZWxlY3RlZC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IG51bGxcbiAgICAgICAgOiBhbGxSb3dzU2VsZWN0ZWQudmFsdWVcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gZ2V0VEhlYWQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBnZXRUSGVhZFRSKClcblxuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgc2xvdHMubG9hZGluZyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgndHInLCB7IGNsYXNzOiAncS10YWJsZV9fcHJvZ3Jlc3MnIH0sIFtcbiAgICAgICAgICAgIGgoJ3RoJywge1xuICAgICAgICAgICAgICBjbGFzczogJ3JlbGF0aXZlLXBvc2l0aW9uJyxcbiAgICAgICAgICAgICAgY29sc3BhbjogY29tcHV0ZWRDb2xzcGFuLnZhbHVlXG4gICAgICAgICAgICB9LCBnZXRQcm9ncmVzcygpKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ3RoZWFkJywgY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VEhlYWRUUiAoKSB7XG4gICAgICBjb25zdFxuICAgICAgICBoZWFkZXIgPSBzbG90cy5oZWFkZXIsXG4gICAgICAgIGhlYWRlckNlbGwgPSBzbG90c1sgJ2hlYWRlci1jZWxsJyBdXG5cbiAgICAgIGlmIChoZWFkZXIgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaGVhZGVyKFxuICAgICAgICAgIGdldEhlYWRlclNjb3BlKHsgaGVhZGVyOiB0cnVlIH0pXG4gICAgICAgICkuc2xpY2UoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IGNvbXB1dGVkQ29scy52YWx1ZS5tYXAoY29sID0+IHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBoZWFkZXJDZWxsQ29sID0gc2xvdHNbIGBoZWFkZXItY2VsbC0keyBjb2wubmFtZSB9YCBdLFxuICAgICAgICAgIHNsb3QgPSBoZWFkZXJDZWxsQ29sICE9PSB2b2lkIDAgPyBoZWFkZXJDZWxsQ29sIDogaGVhZGVyQ2VsbCxcbiAgICAgICAgICBwcm9wcyA9IGdldEhlYWRlclNjb3BlKHsgY29sIH0pXG5cbiAgICAgICAgcmV0dXJuIHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdChwcm9wcylcbiAgICAgICAgICA6IGgoUVRoLCB7XG4gICAgICAgICAgICBrZXk6IGNvbC5uYW1lLFxuICAgICAgICAgICAgcHJvcHNcbiAgICAgICAgICB9LCAoKSA9PiBjb2wubGFiZWwpXG4gICAgICB9KVxuXG4gICAgICBpZiAoc2luZ2xlU2VsZWN0aW9uLnZhbHVlID09PSB0cnVlICYmIHByb3BzLmdyaWQgIT09IHRydWUpIHtcbiAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICBoKCd0aCcsIHsgY2xhc3M6ICdxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgfSwgJyAnKVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChtdWx0aXBsZVNlbGVjdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNbICdoZWFkZXItc2VsZWN0aW9uJyBdXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzbG90ICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3QoZ2V0SGVhZGVyU2NvcGUoe30pKVxuICAgICAgICAgIDogW1xuICAgICAgICAgICAgICBoKFFDaGVja2JveCwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICBtb2RlbFZhbHVlOiBoZWFkZXJTZWxlY3RlZFZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgICAgICAgICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBvbk11bHRpcGxlU2VsZWN0aW9uU2V0XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICBoKCd0aCcsIHsgY2xhc3M6ICdxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgfSwgY29udGVudClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCd0cicsIHtcbiAgICAgICAgICBjbGFzczogcHJvcHMudGFibGVIZWFkZXJDbGFzcyxcbiAgICAgICAgICBzdHlsZTogcHJvcHMudGFibGVIZWFkZXJTdHlsZVxuICAgICAgICB9LCBjaGlsZClcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXJTY29wZSAoZGF0YSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgICAgIGNvbHM6IGNvbXB1dGVkQ29scy52YWx1ZSxcbiAgICAgICAgc29ydCxcbiAgICAgICAgY29sc01hcDogY29tcHV0ZWRDb2xzTWFwLnZhbHVlLFxuICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlXG4gICAgICB9KVxuXG4gICAgICBpZiAobXVsdGlwbGVTZWxlY3Rpb24udmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaW5qZWN0UHJvcChcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgICdzZWxlY3RlZCcsXG4gICAgICAgICAgKCkgPT4gaGVhZGVyU2VsZWN0ZWRWYWx1ZS52YWx1ZSxcbiAgICAgICAgICBvbk11bHRpcGxlU2VsZWN0aW9uU2V0XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk11bHRpcGxlU2VsZWN0aW9uU2V0ICh2YWwpIHtcbiAgICAgIGlmIChzb21lUm93c1NlbGVjdGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHZhbCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZVNlbGVjdGlvbihcbiAgICAgICAgY29tcHV0ZWRSb3dzLnZhbHVlLm1hcChnZXRSb3dLZXkudmFsdWUpLFxuICAgICAgICBjb21wdXRlZFJvd3MudmFsdWUsXG4gICAgICAgIHZhbFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG5hdkljb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBpY28gPSBbXG4gICAgICAgIHByb3BzLmljb25GaXJzdFBhZ2UgfHwgJHEuaWNvblNldC50YWJsZS5maXJzdFBhZ2UsXG4gICAgICAgIHByb3BzLmljb25QcmV2UGFnZSB8fCAkcS5pY29uU2V0LnRhYmxlLnByZXZQYWdlLFxuICAgICAgICBwcm9wcy5pY29uTmV4dFBhZ2UgfHwgJHEuaWNvblNldC50YWJsZS5uZXh0UGFnZSxcbiAgICAgICAgcHJvcHMuaWNvbkxhc3RQYWdlIHx8ICRxLmljb25TZXQudGFibGUubGFzdFBhZ2VcbiAgICAgIF1cbiAgICAgIHJldHVybiAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IGljby5yZXZlcnNlKCkgOiBpY29cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm90dG9tRGl2ICgpIHtcbiAgICAgIGlmIChwcm9wcy5oaWRlQm90dG9tID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAobm90aGluZ1RvRGlzcGxheS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAocHJvcHMuaGlkZU5vRGF0YSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHByb3BzLmxvYWRpbmcgPT09IHRydWVcbiAgICAgICAgICA/IHByb3BzLmxvYWRpbmdMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLmxvYWRpbmdcbiAgICAgICAgICA6IChwcm9wcy5maWx0ZXIgPyBwcm9wcy5ub1Jlc3VsdHNMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLm5vUmVzdWx0cyA6IHByb3BzLm5vRGF0YUxhYmVsIHx8ICRxLmxhbmcudGFibGUubm9EYXRhKVxuXG4gICAgICAgIGNvbnN0IG5vRGF0YSA9IHNsb3RzWyAnbm8tZGF0YScgXVxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vRGF0YSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBbIG5vRGF0YSh7IG1lc3NhZ2UsIGljb246ICRxLmljb25TZXQudGFibGUud2FybmluZywgZmlsdGVyOiBwcm9wcy5maWx0ZXIgfSkgXVxuICAgICAgICAgIDogW1xuICAgICAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXRhYmxlX19ib3R0b20tbm9kYXRhLWljb24nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICRxLmljb25TZXQudGFibGUud2FybmluZ1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgXVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBib3R0b21DbGFzcyArICcgcS10YWJsZV9fYm90dG9tLS1ub2RhdGEnIH0sIGNoaWxkcmVuKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBib3R0b20gPSBzbG90cy5ib3R0b21cblxuICAgICAgaWYgKGJvdHRvbSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBib3R0b21DbGFzcyB9LCBbIGJvdHRvbShtYXJnaW5hbHNTY29wZS52YWx1ZSkgXSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBwcm9wcy5oaWRlU2VsZWN0ZWRCYW5uZXIgIT09IHRydWUgJiYgaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSAmJiByb3dzU2VsZWN0ZWROdW1iZXIudmFsdWUgPiAwXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2NvbnRyb2wnIH0sIFtcbiAgICAgICAgICAgICAgaCgnZGl2JywgW1xuICAgICAgICAgICAgICAgIChwcm9wcy5zZWxlY3RlZFJvd3NMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLnNlbGVjdGVkUmVjb3Jkcykocm93c1NlbGVjdGVkTnVtYmVyLnZhbHVlKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW11cblxuICAgICAgaWYgKHByb3BzLmhpZGVQYWdpbmF0aW9uICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IGJvdHRvbUNsYXNzICsgJyBqdXN0aWZ5LWVuZCdcbiAgICAgICAgfSwgZ2V0UGFnaW5hdGlvbkRpdihjaGlsZCkpXG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBib3R0b21DbGFzcyB9LCBjaGlsZClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhZ1NlbGVjdGlvbiAocGFnKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHtcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgcm93c1BlclBhZ2U6IHBhZy52YWx1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYWdpbmF0aW9uRGl2IChjaGlsZCkge1xuICAgICAgbGV0IGNvbnRyb2xcbiAgICAgIGNvbnN0XG4gICAgICAgIHsgcm93c1BlclBhZ2UgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZSxcbiAgICAgICAgcGFnaW5hdGlvbkxhYmVsID0gcHJvcHMucGFnaW5hdGlvbkxhYmVsIHx8ICRxLmxhbmcudGFibGUucGFnaW5hdGlvbixcbiAgICAgICAgcGFnaW5hdGlvblNsb3QgPSBzbG90cy5wYWdpbmF0aW9uLFxuICAgICAgICBoYXNPcHRzID0gcHJvcHMucm93c1BlclBhZ2VPcHRpb25zLmxlbmd0aCA+IDFcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX3NlcGFyYXRvciBjb2wnIH0pXG4gICAgICApXG5cbiAgICAgIGlmIChoYXNPcHRzID09PSB0cnVlKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2NvbnRyb2wnIH0sIFtcbiAgICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAncS10YWJsZV9fYm90dG9tLWl0ZW0nIH0sIFtcbiAgICAgICAgICAgICAgcHJvcHMucm93c1BlclBhZ2VMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLnJlY29yZHNQZXJQYWdlXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGgoUVNlbGVjdCwge1xuICAgICAgICAgICAgICBjbGFzczogJ3EtdGFibGVfX3NlbGVjdCBpbmxpbmUgcS10YWJsZV9fYm90dG9tLWl0ZW0nLFxuICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICAgIG1vZGVsVmFsdWU6IHJvd3NQZXJQYWdlLFxuICAgICAgICAgICAgICBvcHRpb25zOiBjb21wdXRlZFJvd3NQZXJQYWdlT3B0aW9ucy52YWx1ZSxcbiAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiByb3dzUGVyUGFnZSA9PT0gMFxuICAgICAgICAgICAgICAgID8gJHEubGFuZy50YWJsZS5hbGxSb3dzXG4gICAgICAgICAgICAgICAgOiByb3dzUGVyUGFnZSxcbiAgICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgb3B0aW9uc0RlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICBvcHRpb25zQ292ZXI6IHRydWUsXG4gICAgICAgICAgICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogb25QYWdTZWxlY3Rpb25cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAocGFnaW5hdGlvblNsb3QgIT09IHZvaWQgMCkge1xuICAgICAgICBjb250cm9sID0gcGFnaW5hdGlvblNsb3QobWFyZ2luYWxzU2NvcGUudmFsdWUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29udHJvbCA9IFtcbiAgICAgICAgICBoKCdzcGFuJywgcm93c1BlclBhZ2UgIT09IDAgPyB7IGNsYXNzOiAncS10YWJsZV9fYm90dG9tLWl0ZW0nIH0gOiB7fSwgW1xuICAgICAgICAgICAgcm93c1BlclBhZ2VcbiAgICAgICAgICAgICAgPyBwYWdpbmF0aW9uTGFiZWwoZmlyc3RSb3dJbmRleC52YWx1ZSArIDEsIE1hdGgubWluKGxhc3RSb3dJbmRleC52YWx1ZSwgY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlKSwgY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlKVxuICAgICAgICAgICAgICA6IHBhZ2luYXRpb25MYWJlbCgxLCBmaWx0ZXJlZFNvcnRlZFJvd3NOdW1iZXIudmFsdWUsIGNvbXB1dGVkUm93c051bWJlci52YWx1ZSlcbiAgICAgICAgICBdKVxuICAgICAgICBdXG5cbiAgICAgICAgaWYgKHJvd3NQZXJQYWdlICE9PSAwICYmIHBhZ2VzTnVtYmVyLnZhbHVlID4gMSkge1xuICAgICAgICAgIGNvbnN0IGJ0blByb3BzID0ge1xuICAgICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgIGZsYXQ6IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocHJvcHMuZGVuc2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGJ0blByb3BzLnNpemUgPSAnc20nXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGFnZXNOdW1iZXIudmFsdWUgPiAyICYmIGNvbnRyb2wucHVzaChcbiAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICBrZXk6ICdwZ0ZpcnN0JyxcbiAgICAgICAgICAgICAgLi4uYnRuUHJvcHMsXG4gICAgICAgICAgICAgIGljb246IG5hdkljb24udmFsdWVbIDAgXSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNGaXJzdFBhZ2UudmFsdWUsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IGZpcnN0UGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBjb250cm9sLnB1c2goXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAga2V5OiAncGdQcmV2JyxcbiAgICAgICAgICAgICAgLi4uYnRuUHJvcHMsXG4gICAgICAgICAgICAgIGljb246IG5hdkljb24udmFsdWVbIDEgXSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNGaXJzdFBhZ2UudmFsdWUsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IHByZXZQYWdlXG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICAgIGtleTogJ3BnTmV4dCcsXG4gICAgICAgICAgICAgIC4uLmJ0blByb3BzLFxuICAgICAgICAgICAgICBpY29uOiBuYXZJY29uLnZhbHVlWyAyIF0sXG4gICAgICAgICAgICAgIGRpc2FibGU6IGlzTGFzdFBhZ2UudmFsdWUsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG5leHRQYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcblxuICAgICAgICAgIHBhZ2VzTnVtYmVyLnZhbHVlID4gMiAmJiBjb250cm9sLnB1c2goXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAga2V5OiAncGdMYXN0JyxcbiAgICAgICAgICAgICAgLi4uYnRuUHJvcHMsXG4gICAgICAgICAgICAgIGljb246IG5hdkljb24udmFsdWVbIDMgXSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNMYXN0UGFnZS52YWx1ZSxcbiAgICAgICAgICAgICAgb25DbGljazogbGFzdFBhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19jb250cm9sJyB9LCBjb250cm9sKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRHcmlkSGVhZGVyICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gcHJvcHMuZ3JpZEhlYWRlciA9PT0gdHJ1ZVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoJ3RhYmxlJywgeyBjbGFzczogJ3EtdGFibGUnIH0sIFtcbiAgICAgICAgICAgICAgZ2V0VEhlYWQoaClcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgc2xvdHMubG9hZGluZyA9PT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gZ2V0UHJvZ3Jlc3MoaClcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fbWlkZGxlJyB9LCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRHcmlkQm9keSAoKSB7XG4gICAgICBjb25zdCBpdGVtID0gc2xvdHMuaXRlbSAhPT0gdm9pZCAwXG4gICAgICAgID8gc2xvdHMuaXRlbVxuICAgICAgICA6IHNjb3BlID0+IHtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IHNjb3BlLmNvbHMubWFwKFxuICAgICAgICAgICAgY29sID0+IGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0tcm93JyB9LCBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0tdGl0bGUnIH0sIFsgY29sLmxhYmVsIF0pLFxuICAgICAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fZ3JpZC1pdGVtLXZhbHVlJyB9LCBbIGNvbC52YWx1ZSBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAoaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3Qgc2xvdCA9IHNsb3RzWyAnYm9keS1zZWxlY3Rpb24nIF1cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzbG90ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyBzbG90KHNjb3BlKVxuICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgIGgoUUNoZWNrYm94LCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWU6IHNjb3BlLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICAgICAgICAgICAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IChhZGRpbmcsIGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGlvbihbIHNjb3BlLmtleSBdLCBbIHNjb3BlLnJvdyBdLCBhZGRpbmcsIGV2dClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdXG5cbiAgICAgICAgICAgIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0tcm93JyB9LCBjb250ZW50KSxcbiAgICAgICAgICAgICAgaChRU2VwYXJhdG9yLCB7IGRhcms6IGlzRGFyay52YWx1ZSB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgICAncS10YWJsZV9fZ3JpZC1pdGVtLWNhcmQnICsgY2FyZERlZmF1bHRDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgcHJvcHMuY2FyZENsYXNzXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3R5bGU6IHByb3BzLmNhcmRTdHlsZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHByb3BzLm9uUm93Q2xpY2sgIT09IHZvaWQgMFxuICAgICAgICAgICAgfHwgcHJvcHMub25Sb3dEYmxjbGljayAhPT0gdm9pZCAwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBkYXRhLmNsYXNzWyAwIF0gKz0gJyBjdXJzb3ItcG9pbnRlcidcblxuICAgICAgICAgICAgaWYgKHByb3BzLm9uUm93Q2xpY2sgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBkYXRhLm9uQ2xpY2sgPSBldnQgPT4ge1xuICAgICAgICAgICAgICAgIGVtaXQoJ1Jvd0NsaWNrJywgZXZ0LCBzY29wZS5yb3csIHNjb3BlLnBhZ2VJbmRleClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub25Sb3dEYmxjbGljayAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGRhdGEub25EYmxjbGljayA9IGV2dCA9PiB7XG4gICAgICAgICAgICAgICAgZW1pdCgnUm93RGJsY2xpY2snLCBldnQsIHNjb3BlLnJvdywgc2NvcGUucGFnZUluZGV4KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS10YWJsZV9fZ3JpZC1pdGVtIGNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtNCBjb2wtbGctMydcbiAgICAgICAgICAgICAgKyAoc2NvcGUuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtdGFibGVfX2dyaWQtaXRlbS0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgaCgnZGl2JywgZGF0YSwgY2hpbGQpXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogW1xuICAgICAgICAgICdxLXRhYmxlX19ncmlkLWNvbnRlbnQgcm93JyxcbiAgICAgICAgICBwcm9wcy5jYXJkQ29udGFpbmVyQ2xhc3NcbiAgICAgICAgXSxcbiAgICAgICAgc3R5bGU6IHByb3BzLmNhcmRDb250YWluZXJTdHlsZVxuICAgICAgfSwgY29tcHV0ZWRSb3dzLnZhbHVlLm1hcCgocm93LCBwYWdlSW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0oZ2V0Qm9keVNjb3BlKHtcbiAgICAgICAgICBrZXk6IGdldFJvd0tleS52YWx1ZShyb3cpLFxuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBwYWdlSW5kZXhcbiAgICAgICAgfSkpXG4gICAgICB9KSlcbiAgICB9XG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHMgYW5kIG5lZWRlZCBjb21wdXRlZCBwcm9wc1xuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHtcbiAgICAgIHJlcXVlc3RTZXJ2ZXJJbnRlcmFjdGlvbixcbiAgICAgIHNldFBhZ2luYXRpb24sXG4gICAgICBmaXJzdFBhZ2UsXG4gICAgICBwcmV2UGFnZSxcbiAgICAgIG5leHRQYWdlLFxuICAgICAgbGFzdFBhZ2UsXG4gICAgICBpc1Jvd1NlbGVjdGVkLFxuICAgICAgY2xlYXJTZWxlY3Rpb24sXG4gICAgICBpc1Jvd0V4cGFuZGVkLFxuICAgICAgc2V0RXhwYW5kZWQsXG4gICAgICBzb3J0LFxuICAgICAgcmVzZXRWaXJ0dWFsU2Nyb2xsLFxuICAgICAgc2Nyb2xsVG8sXG4gICAgICBnZXRDZWxsVmFsdWVcbiAgICB9KVxuXG4gICAgaW5qZWN0TXVsdGlwbGVQcm9wcyh2bS5wcm94eSwge1xuICAgICAgZmlsdGVyZWRTb3J0ZWRSb3dzOiAoKSA9PiBmaWx0ZXJlZFNvcnRlZFJvd3MudmFsdWUsXG4gICAgICBjb21wdXRlZFJvd3M6ICgpID0+IGNvbXB1dGVkUm93cy52YWx1ZSxcbiAgICAgIGNvbXB1dGVkUm93c051bWJlcjogKCkgPT4gY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFsgZ2V0VG9wRGl2KCkgXVxuICAgICAgY29uc3QgZGF0YSA9IHsgcmVmOiByb290UmVmLCBjbGFzczogY29udGFpbmVyQ2xhc3MudmFsdWUgfVxuXG4gICAgICBpZiAocHJvcHMuZ3JpZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZC5wdXNoKGdldEdyaWRIZWFkZXIoKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgICBjbGFzczogWyBkYXRhLmNsYXNzLCBwcm9wcy5jYXJkQ2xhc3MgXSxcbiAgICAgICAgICBzdHlsZTogcHJvcHMuY2FyZFN0eWxlXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGdldEJvZHkoKSxcbiAgICAgICAgZ2V0Qm90dG9tRGl2KClcbiAgICAgIClcblxuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgc2xvdHMubG9hZGluZygpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIGRhdGEsIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8ZGl2IHYtaWY9XCIhaGlkZVRvcFwiIGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1tZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy04XCI+XG4gICAgICAgIDxxLXNrZWxldG9uIGhlaWdodD1cIjM5cHhcIiB0eXBlPVwiUUJ0blwiIHdpZHRoPVwiMjUwcHhcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTRcIj5cbiAgICAgICAgPHEtc2tlbGV0b24gaGVpZ2h0PVwiMzlweFwiIHdpZHRoPVwiMTUwcHhcIiBjbGFzcz1cImZsb2F0LXJpZ2h0XCIgdHlwZT1cIlFCdG5cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHEtbWFya3VwLXRhYmxlIHNxdWFyZSBmbGF0IGNsYXNzPVwicS1tdC1sZ1wiPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoIGNsYXNzPVwidGV4dC1sZWZ0XCIgc3R5bGU9XCJ3aWR0aDogMTUwcHhcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPHRoIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gYW5pbWF0aW9uPVwiYmxpbmtcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgPC90aD5cbiAgICAgICAgICA8dGggY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1za2VsZXRvbiBhbmltYXRpb249XCJibGlua1wiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICA8L3RoPlxuICAgICAgICAgIDx0aCBjbGFzcz1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPHRoIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gYW5pbWF0aW9uPVwiYmxpbmtcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgPC90aD5cbiAgICAgICAgICA8dGggY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+PC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgPHRyIHYtZm9yPVwibiBpbiByb3dOdW1uZXJzXCIgOmtleT1cIm5cIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiB3aWR0aD1cIjg1cHhcIiAvPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gYW5pbWF0aW9uPVwiYmxpbmtcIiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNTBweFwiIC8+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1za2VsZXRvbiBhbmltYXRpb249XCJibGlua1wiIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCIzNXB4XCIgLz5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiB3aWR0aD1cIjY1cHhcIiAvPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gYW5pbWF0aW9uPVwiYmxpbmtcIiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiMjVweFwiIC8+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJmYWwgZmEtZWxsaXBzaXMtaFwiIGNvbG9yPVwiZ3JleS00XCIgY2xhc3M9XCJxLW1yLXNtXCIgc2l6ZT1cInNtXCIgLz5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90Ym9keT5cbiAgICA8L3EtbWFya3VwLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIHJvd051bW5lcnM6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDEwLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgaGlkZVRvcDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtZHJhd2VyXG4gICAgICBzaWRlPVwicmlnaHRcIlxuICAgICAgcmVmPVwiZmlsdGVyXCJcbiAgICAgIGJvcmRlcmVkXG4gICAgICA6d2lkdGg9XCIyODBcIlxuICAgICAgOmJyZWFrcG9pbnQ9XCI1MDBcIlxuICAgICAgY29udGVudC1jbGFzcz1cImJnLWdyZXktM1wiXG4gICAgPlxuICAgICAgPHEtdG9vbGJhciBzdHlsZT1cImhlaWdodDogODlweFwiIGxpZ2h0PlxuICAgICAgICA8cS10b29sYmFyLXRpdGxlIGNsYXNzPVwicS1tbC14c1wiPnt7IGZpbHRlclRpdGxlIH19PC9xLXRvb2xiYXItdGl0bGU+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IHJvdW5kIGRlbnNlIEBjbGljaz1cIiRyZWZzLmZpbHRlci5oaWRlKClcIiAvPlxuICAgICAgPC9xLXRvb2xiYXI+XG4gICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgIDxxLWNhcmQgY2xhc3M9XCJiZy10cmFuc3BhcmVudFwiIGZsYXQgc3F1YXJlPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgcS1jb2wtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPHNsb3QgbmFtZT1cImFkdmFuY2VkLWZpbHRlclwiIHYtYmluZDpzeW5jUGFnaW5hdGlvbj1cInN5bmNQYWdpbmF0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBmaWx0ZXJzXCIgOmtleT1cImluZGV4XCIgY2xhc3M9XCJjb2wtMTIgZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiaXRlbS50aXRsZVwiIGNsYXNzPVwidGV4dC1sYWJlbFwiPnt7IGl0ZW0udGl0bGUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPGNvbXBvbmVudFxuICAgICAgICAgICAgICAgIDppcz1cIml0ZW0uY29tcG9uZW50XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic3luY1BhZ2luYXRpb25baXRlbS5rZXldXCJcbiAgICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VuZFNlcnZlclJlcXVlc3RcIlxuICAgICAgICAgICAgICAgIHYtYmluZD1cIml0ZW1cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRyYXdlcj5cbiAgICA8dGVtcGxhdGUgdi1pZj1cInN5bmNQYWdpbmF0aW9uLmxvYWRlZFwiPlxuICAgICAgPHEtdGFibGVcbiAgICAgICAgY2xhc3M9XCJtYWluLXRhYmxlXCJcbiAgICAgICAgc3F1YXJlXG4gICAgICAgIDpncmlkPVwiZ3JpZFwiXG4gICAgICAgIDpyb3dzPVwicm93c1wiXG4gICAgICAgIDpjb2x1bW5zPVwiY29sdW1uc1wiXG4gICAgICAgIDpib3JkZXJlZD1cImJvcmRlcmVkXCJcbiAgICAgICAgOmhpZGUtaGVhZGVyPVwiaGlkZUhlYWRlclwiXG4gICAgICAgIDpmbGF0PVwiZmxhdFwiXG4gICAgICAgIHJvdy1rZXk9XCJpZFwiXG4gICAgICAgIDpoaWRlLXBhZ2luYXRpb249XCJoaWRlUGFnaW5hdGlvblwiXG4gICAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJyb3dzUGVyUGFnZU9wdGlvbnNcIlxuICAgICAgICA6ZmlsdGVyPVwic3luY1BhZ2luYXRpb24uZmlsdGVyXCJcbiAgICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwic3luY1BhZ2luYXRpb25cIlxuICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICA6c2VsZWN0aW9uPVwic2VsZWN0aW9uXCJcbiAgICAgICAgdi1tb2RlbDpzZWxlY3RlZD1cInNlbGVjdGVkXCJcbiAgICAgICAgQHJlcXVlc3Q9XCJvblJlcXVlc3RcIlxuICAgICAgICBAcm93LWNsaWNrPVwib25Sb3dDbGlja2VkXCJcbiAgICAgICAgOm5vLWRhdGEtbGFiZWw9XCJub0RhdGFMYWJlbFwiXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiIWhpZGVUb3BcIiB2LXNsb3Q6dG9wPVwic2NvcGVcIj5cbiAgICAgICAgICA8c2xvdFxuICAgICAgICAgICAgbmFtZT1cInRvcFwiXG4gICAgICAgICAgICB2LWJpbmQ9XCJzY29wZVwiXG4gICAgICAgICAgICB2LWJpbmQ6cGVybWlzc2lvbnM9XCJwZXJtaXNzaW9uc1wiXG4gICAgICAgICAgICB2LWJpbmQ6c2VsZWN0ZWQ9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICB2LWJpbmQ6dG9vbGJhcj1cInRvb2xiYXJJdGVtc1wiXG4gICAgICAgICAgICB2LWJpbmQ6b25Ub29sYmFyQ2xpY2tlZD1cIm9uVG9vbGJhckNsaWNrZWRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IDpjbGFzcz1cImBjb2wtc20tJHt0b3BMZWZ0V2lkdGh9IGNvbC14cy0xMmBcIj5cbiAgICAgICAgICAgICAgICAgIDxzbG90XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ0b3AtbGVmdFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBlcm1pc3Npb25zPVwicGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c2VsZWN0ZWQ9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDp0b29sYmFyPVwidG9vbGJhckl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwic3luY1BhZ2luYXRpb24uZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUXVpY2sgc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhc3luY1BhZ2luYXRpb24uZmlsdGVyXCIgbmFtZT1cImZhcyBmYS1zZWFyY2hcIiBzaXplPVwiMTZweFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgOmNsYXNzPVwiYGNvbC1zbS0ke3RvcFJpZ2h0V2lkdGh9IGNvbC14cy0xMiB0ZXh0LXJpZ2h0YFwiPlxuICAgICAgICAgICAgICAgICAgPHNsb3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInRvcC1yaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBlcm1pc3Npb25zPVwicGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c2VsZWN0ZWQ9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDp0b29sYmFyPVwidG9vbGJhckl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIiFzeW5jUGFnaW5hdGlvbi5kZWxldGVkICYmIHNlbGVjdGVkLmxlbmd0aCA+IDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b29sYmFyLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZT1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFoYXNQZXJtaXNzaW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246ICdEZWxldGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGljb249XCJmYXMgZmEtdHJhc2gtYWx0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCIxM3B4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRvb2xiYXJDbGlja2VkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2RlbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZz1cIjhweCAyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b29sYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuby1jYXBzXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cInN5bmNQYWdpbmF0aW9uLmRlbGV0ZWQgJiYgc2VsZWN0ZWQubGVuZ3RoID4gMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRvb2xiYXItaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWhhc1Blcm1pc3Npb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogJ0RlbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImZhcyBmYS10cmFzaC11bmRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIjEzcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG9vbGJhckNsaWNrZWQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAncmVzdG9yZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZz1cIjhweCAyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b29sYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJSZXN0b3JlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gdG9vbGJhckl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LXNob3c9XCJoYXNQZXJtaXNzaW9uKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9vbGJhci1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIml0ZW0uY29tcG9uZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXM9XCJpdGVtLmNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInN5bmNQYWdpbmF0aW9uW2l0ZW0ua2V5XVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIm9uVG9vbGJhckNsaWNrZWQoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZD1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCIxM3B4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvblRvb2xiYXJDbGlja2VkKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nPVwiOXB4IDIwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZD1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmhlYWRlci1zZWxlY3Rpb249XCJzY29wZVwiPlxuICAgICAgICAgIDxzbG90IG5hbWU9XCJoZWFkZXItc2VsZWN0aW9uXCIgdi1iaW5kPVwic2NvcGVcIj5cbiAgICAgICAgICAgIDxxLWNoZWNrYm94IHNpemU9XCJzbVwiIHYtbW9kZWw9XCJzY29wZS5zZWxlY3RlZFwiIC8+XG4gICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1zZWxlY3Rpb249XCJzY29wZVwiPlxuICAgICAgICAgIDxzbG90IG5hbWU9XCJib2R5LXNlbGVjdGlvblwiIHYtYmluZD1cInNjb3BlXCI+XG4gICAgICAgICAgICA8cS1jaGVja2JveCBzaXplPVwic21cIiB2LW1vZGVsPVwic2NvcGUuc2VsZWN0ZWRcIiAvPlxuICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJzbG90IGluIHRhYmxlU2xvdHNcIiB2LXNsb3Q6W3Nsb3RdPVwicHJvcHNcIj5cbiAgICAgICAgICA8c2xvdFxuICAgICAgICAgICAgOm5hbWU9XCJzbG90XCJcbiAgICAgICAgICAgIHYtYmluZD1cInByb3BzXCJcbiAgICAgICAgICAgIHYtYmluZDpwcm9wcz1cInByb3BzXCJcbiAgICAgICAgICAgIHYtYmluZDpwZXJtaXNzaW9ucz1cInBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgIHYtYmluZDphY3Rpb25zPVwiYWN0aW9uSXRlbXNcIlxuICAgICAgICAgICAgdi1iaW5kOm9uQWN0aW9uQ2xpY2tlZD1cIm9uQWN0aW9uQ2xpY2tlZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj57eyBwcm9wcy52YWx1ZSB9fTwvcS10ZD5cbiAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9ucz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLWJ0biByb3VuZCBmbGF0IGRlbnNlIGljb249XCJmYWwgZmEtZWxsaXBzaXMtaFwiIEBjbGljay5zdG9wPlxuICAgICAgICAgICAgICA8cS1tZW51IGRlbnNlPlxuICAgICAgICAgICAgICAgIDxxLWxpc3QgY2xhc3M9XCJxLXBhLXNtXCIgZGVuc2Ugc3R5bGU9XCJtaW4td2lkdGg6IDEwMHB4XCI+XG4gICAgICAgICAgICAgICAgICA8YmFzZS1pdGVtXG4gICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBhY3Rpb25JdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIHYtc2hvdz1cImhhc1Blcm1pc3Npb24oaXRlbSwgcHJvcHMpXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25BY3Rpb25DbGlja2VkKGl0ZW0sIHByb3BzKVwiXG4gICAgICAgICAgICAgICAgICAgIDppY29uPVwiaXRlbS5pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwiaXRlbS5sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICA8L3EtbWVudT5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6aXRlbT1cInByb3BzXCI+XG4gICAgICAgICAgPHNsb3RcbiAgICAgICAgICAgIG5hbWU9XCJpdGVtXCJcbiAgICAgICAgICAgIHYtYmluZDpwcm9wcz1cInByb3BzXCJcbiAgICAgICAgICAgIHYtYmluZDpwZXJtaXNzaW9ucz1cInBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgIHYtYmluZDphY3Rpb25zPVwiYWN0aW9uSXRlbXNcIlxuICAgICAgICAgICAgdi1iaW5kOm9uQWN0aW9uQ2xpY2tlZD1cIm9uQWN0aW9uQ2xpY2tlZFwiXG4gICAgICAgICAgICB2LWJpbmQ6aGFzUGVybWlzc2lvbj1cImhhc1Blcm1pc3Npb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgdi1iaW5kOmNsYXNzPVwiY2FyZENsYXNzXCIgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICB0YWc9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgOmNsYXNzPVwie1xuICAgICAgICAgICAgICAgICAgJ2JnLWdyZWVuLTInOiBwcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICdiZy13aGl0ZSc6ICFwcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiB2LWlmPVwiWydzaW5nbGUnLCAnbXVsdGlwbGUnXS5pbmNsdWRlcyhzZWxlY3Rpb24pXCIgYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgPHEtY2hlY2tib3ggZGVuc2Ugdi1tb2RlbD1cInByb3BzLnNlbGVjdGVkXCIgLz5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxzbG90XG4gICAgICAgICAgICAgICAgICBuYW1lPVwiaXRlbS1zZWxlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgdi1iaW5kOnByb3BzPVwicHJvcHNcIlxuICAgICAgICAgICAgICAgICAgdi1iaW5kOnBlcm1pc3Npb25zPVwicGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgdi1iaW5kOmFjdGlvbnM9XCJhY3Rpb25JdGVtc1wiXG4gICAgICAgICAgICAgICAgICB2LWJpbmQ6b25BY3Rpb25DbGlja2VkPVwib25BY3Rpb25DbGlja2VkXCJcbiAgICAgICAgICAgICAgICAgIHYtYmluZDpoYXNQZXJtaXNzaW9uPVwiaGFzUGVybWlzc2lvblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiaXRlbS1ib2R5XCIgdi1iaW5kPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInEtbWIteHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJjb2wgaW4gcHJvcHMuY29scy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtKSA9PiAhWydhY3Rpb25zJywgJ2lkJ10uaW5jbHVkZXMoaXRlbS5uYW1lKSAmJiBpdGVtLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICApXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJjb2wubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIWhpZGVJdGVtTGFiZWxcIiBjbGFzcz1cInEtdGFibGVfX2dyaWQtaXRlbS10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBjb2wubGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJgaXRlbS1ib2R5LSR7Y29sLm5hbWV9YFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZD1cInByb3BzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnZhbHVlPVwiY29sLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7IGNvbC52YWx1ZSB9fTwvc2xvdFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gdi1pZj1cIiFub0FjdGlvbnNcIiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGZsYXQgZGVuc2UgaWNvbj1cImZhbCBmYS1lbGxpcHNpcy1oXCIgQGNsaWNrLnN0b3A+XG4gICAgICAgICAgICAgICAgICAgIDxxLW1lbnUgZGVuc2U+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtbGlzdCBjbGFzcz1cInEtcGEtc21cIiBkZW5zZSBzdHlsZT1cIm1pbi13aWR0aDogMTAwcHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxiYXNlLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGFjdGlvbkl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1zaG93PVwiaGFzUGVybWlzc2lvbihpdGVtLCBwcm9wcylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvbkFjdGlvbkNsaWNrZWQoaXRlbSwgcHJvcHMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOmljb249XCJpdGVtLmljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJpdGVtLmxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1tZW51PlxuICAgICAgICAgICAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCIhISRzbG90cy5ib3R0b21cIiB2LXNsb3Q6Ym90dG9tPVwic2NvcGVcIj5cbiAgICAgICAgICA8c2xvdCBuYW1lPVwiYm90dG9tXCIgdi1iaW5kPVwic2NvcGVcIj48L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtdGFibGU+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgPHNsb3QgbmFtZT1cInByZS1sb2FkZXJcIj5cbiAgICAgICAgPHRhYmxlLXNrZWxldG9uIDpoaWRlLXRvcD1cImhpZGVUb3BcIiA6cm93LW51bW5lcnM9XCI4XCIgLz5cbiAgICAgIDwvc2xvdD5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFRhYmxlU2tlbGV0b24gZnJvbSAnLi4vc2tlbGV0b24vVGFibGVTa2VsZXRvbi52dWUnO1xuXG5jb25zdCBleGNlcHRTbG90cyA9IFtcbiAgJ2FkdmFuY2VkLWZpbHRlcicsXG4gICdwcmUtbG9hZGVyJyxcbiAgJ2hlYWRlci1zZWxlY3Rpb24nLFxuICAnYm9keS1zZWxlY3Rpb24nLFxuICAnYm9keS1jZWxsLWFjdGlvbnMnLFxuICAnYm90dG9tJyxcbiAgJ2l0ZW0nLFxuICAnaXRlbS1zZWxlY3Rpb24nLFxuICAndG9wJyxcbiAgJ3RvcC1sZWZ0JyxcbiAgJ3RvcC1yaWdodCcsXG4gICd0b3AtYm90dG9tJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czogeyBUYWJsZVNrZWxldG9uIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdGVkOiBbXSxcbiAgICB9O1xuICB9LFxuICBwcm9wczoge1xuICAgIHN0b3JlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgfSxcbiAgICBtb2R1bGU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtPYmplY3RdLFxuICAgIH0sXG4gICAgY29sdW1uczoge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0eXBlOiBbQXJyYXldLFxuICAgICAgZGVmYXVsdDogKCkgPT4gW10sXG4gICAgfSxcbiAgICByb3dzOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR5cGU6IFtBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXSxcbiAgICB9LFxuICAgIHRvb2xiYXI6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXSxcbiAgICB9LFxuICAgIGFjdGlvbnM6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXSxcbiAgICB9LFxuICAgIGZpbHRlcnM6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXSxcbiAgICB9LFxuICAgIHBhZ2luYXRpb246IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHlwZTogW09iamVjdF0sXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIGhpZGVQYWdpbmF0aW9uOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIGhpZGVJdGVtTGFiZWw6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgbm9BY3Rpb25zOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIG5vVHJhc2g6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgcm93c1BlclBhZ2VPcHRpb25zOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQXJyYXldLFxuICAgICAgZGVmYXVsdDogKCkgPT4gWzE1LCAzMCwgNTBdLFxuICAgIH0sXG4gICAgZmlsdGVyOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAgYm9yZGVyZWQ6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgZmxhdDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW0Jvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIGhpZGVIZWFkZXI6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgaGlkZVRvcDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW0Jvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICBub1Blcm1pc3Npb25zOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIGxvYWRpbmc6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgbG9hZGVkOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIHByZXZlbnREZWZhdWx0OiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIHNlbGVjdGlvbjoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdBdmFpbGFibGUgb3B0aW9uczogc2luZ2xlLCBtdWx0aXBsZSBhbmQgbm9uZScsXG4gICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICdub25lJyxcbiAgICB9LFxuICAgIGZpbHRlclRpdGxlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICdGaWx0ZXJzJyxcbiAgICB9LFxuICAgIGZpbHRlckljb246IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJ2ZhbCBmYS1maWx0ZXInLFxuICAgIH0sXG4gICAgcmVsYXRlZERlbGV0ZU1lc3NhZ2U6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEJvb2xlYW5dLFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgJ1BsZWFzZSBub3RlIHRoYXQgb25jZSB5b3UgcGVybWFuZW50bHkgZGVsZXRlIHR5cGUgbW9kdWxlLCBhbnkgcmVsYXRlZChzKSB3aGVyZSB0aGV5IGhhdmUgYWRkZWQgdG8gd2lsbCBsb3NlIHRoZW0gdG9vLicsXG4gICAgfSxcbiAgICBub0RhdGFMYWJlbDoge1xuICAgICAgdHlwZTogW1N0cmluZ10sXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgfSxcbiAgICBjYXJkQ2xhc3M6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmddLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgIH0sXG4gICAgdG9wUmlnaHRXaWR0aDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW051bWJlcl0sXG4gICAgICBkZWZhdWx0OiA5LFxuICAgICAgZGVzY3JpcHRpb246ICdtYXggdmFsdWUgMTIgYW5kIG1pbiB2YWx1ZSAxJyxcbiAgICAgIHZhbGlkYXRvcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPD0gMTIgfHwgdmFsdWUgPj0gMTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICAnc3luY1BhZ2luYXRpb24ucm93c1BlclBhZ2UnKCkge1xuICAgICAgdGhpcy5zZW5kU2VydmVyUmVxdWVzdCgpO1xuICAgIH0sXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvblJlcXVlc3QocHJvcHMpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL2Jhc2UtdGFibGU6bWV0aG9kcy5vblJlcXVlc3QoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KCdyZXF1ZXN0JywgcHJvcHMpO1xuICAgIH0sXG4gICAgb25Sb3dDbGlja2VkKGV2dCwgcm93KSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9iYXNlLXRhYmxlOm1ldGhvZHMub25Sb3dDbGlja2VkKCknLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kZW1pdCgncm93LWNsaWNrZWQnLCBldnQsIHJvdyk7XG4gICAgfSxcbiAgICBvbkFjdGlvbkNsaWNrZWQoaXRlbSwgcHJvcHMpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL2Jhc2UtdGFibGU6bWV0aG9kcy5vbkFjdGlvbkNsaWNrZWQoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KCdhY3Rpb24tY2xpY2tlZCcsIGl0ZW0uYWN0aW9uLCBwcm9wcy5yb3cpO1xuXG4gICAgICAvLyBjaGVja2VkIGRlZmF1bHQgYWN0aW9ucyBzdGF0dXNcbiAgICAgIGlmICh0aGlzLnByZXZlbnREZWZhdWx0KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHN3aXRjaCAoaXRlbS5hY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICB0aGlzLmhhc1N0b3JlKCk7XG4gICAgICAgICAgdGhpcy4kY29yZVxuICAgICAgICAgICAgLmNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyAke3RoaXMubW9kdWxlLnNpbmd1bGFyfT9gKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlXG4gICAgICAgICAgICAgICAgLmRlbGV0ZShwcm9wcy5yb3cuaWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kU2VydmVyUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kY29yZS5lcnJvcihlcnJvciwgeyB0aXRsZTogJ0Vycm9yJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXN0b3JlJzpcbiAgICAgICAgICB0aGlzLmhhc1N0b3JlKCk7XG4gICAgICAgICAgdGhpcy4kY29yZVxuICAgICAgICAgICAgLmNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXN0b3JlIHRoaXMgJHt0aGlzLm1vZHVsZS5zaW5ndWxhcn0/YClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZVxuICAgICAgICAgICAgICAgIC5yZXN0b3JlKHByb3BzLnJvdy5pZClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKGVycm9yLCB7IHRpdGxlOiAnRXJyb3InIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZvcmNlLWRlbGV0ZSc6XG4gICAgICAgICAgdGhpcy5oYXNTdG9yZSgpO1xuICAgICAgICAgIHRoaXMuJGNvcmVcbiAgICAgICAgICAgIC5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcGVybWFuZW50bHkgZGVsZXRlIHRoaXMgJHt0aGlzLm1vZHVsZS5zaW5ndWxhcn0/YCwge1xuICAgICAgICAgICAgICBzdWJUaXRsZTogdGhpcy5yZWxhdGVkRGVsZXRlTWVzc2FnZVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90eXBlL2csICd0aGlzJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvbW9kdWxlL2csIHRoaXMubW9kdWxlLnNpbmd1bGFyKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmVcbiAgICAgICAgICAgICAgICAuZm9yY2VEZWxldGUocHJvcHMucm93LmlkKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFNlcnZlclJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGNvcmUuZXJyb3IoZXJyb3IsIHsgdGl0bGU6ICdFcnJvcicgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncm91dGUnOlxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0ucm91dGUsXG4gICAgICAgICAgICBwYXJhbXM6IGl0ZW0ucGFyYW1zID8gaXRlbS5wYXJhbXMocHJvcHMucm93KSA6IHt9LFxuICAgICAgICAgICAgcXVlcnk6IGl0ZW0ucXVlcnkgPyBpdGVtLnF1ZXJ5KHByb3BzLnJvdykgOiB7fSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpdGVtLmFjdGlvbihwcm9wcy5yb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uVG9vbGJhckNsaWNrZWQoaXRlbSkge1xuICAgICAgY29uc29sZS5mdW5jKCdjb21wb25lbnRzL2Jhc2UvYmFzZS10YWJsZTptZXRob2RzLm9uVG9vbGJhckNsaWNrZWQoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KCd0b29sYmFyLWNsaWNrZWQnLCBpdGVtKTtcblxuICAgICAgLy8gY2hlY2tlZCBkZWZhdWx0IGFjdGlvbnMgc3RhdHVzXG4gICAgICBpZiAodGhpcy5wcmV2ZW50RGVmYXVsdCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBzd2l0Y2ggKGl0ZW0uYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgdGhpcy5oYXNTdG9yZSgpO1xuICAgICAgICAgIHRoaXMuJGNvcmVcbiAgICAgICAgICAgIC5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHNlbGVjdGVkICR7dGhpcy5tb2R1bGUucGx1cmFsfT9gKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlXG4gICAgICAgICAgICAgICAgLmRlbGV0ZVNlbGVjdGVkKG1hcCh0aGlzLnNlbGVjdGVkLCAnaWQnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKGVycm9yLCB7IHRpdGxlOiAnRXJyb3InIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Jlc3RvcmUnOlxuICAgICAgICAgIHRoaXMuaGFzU3RvcmUoKTtcbiAgICAgICAgICB0aGlzLiRjb3JlXG4gICAgICAgICAgICAuY29uZmlybShgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc3RvcmUgc2VsZWN0ZWQgJHt0aGlzLm1vZHVsZS5wbHVyYWx9P2ApXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmVcbiAgICAgICAgICAgICAgICAucmVzdG9yZVNlbGVjdGVkKG1hcCh0aGlzLnNlbGVjdGVkLCAnaWQnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKGVycm9yLCB7IHRpdGxlOiAnRXJyb3InIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZvcmNlLWRlbGV0ZSc6XG4gICAgICAgICAgdGhpcy5oYXNTdG9yZSgpO1xuICAgICAgICAgIHRoaXMuJGNvcmVcbiAgICAgICAgICAgIC5jb25maXJtKFxuICAgICAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHBlcm1hbmVudGx5IGRlbGV0ZSBzZWxlY3RlZCAke3RoaXMubW9kdWxlLnBsdXJhbH0/YCxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN1YlRpdGxlOiB0aGlzLnJlbGF0ZWREZWxldGVNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdHlwZS9nLCAnc2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL21vZHVsZS9nLCB0aGlzLm1vZHVsZS5wbHVyYWwpLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmVcbiAgICAgICAgICAgICAgICAuZm9yY2VEZWxldGVTZWxlY3RlZChtYXAodGhpcy5zZWxlY3RlZCwgJ2lkJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kU2VydmVyUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kY29yZS5lcnJvcihlcnJvciwgeyB0aXRsZTogJ0Vycm9yJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyb3V0ZSc6XG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogaXRlbS5yb3V0ZSxcbiAgICAgICAgICAgIHBhcmFtczogaXRlbS5wYXJhbXMsXG4gICAgICAgICAgICBxdWVyeTogaXRlbS5xdWVyeSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmlsdGVyJzpcbiAgICAgICAgICB0aGlzLiRyZWZzLmZpbHRlci5zaG93KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JlcXVlc3QnOlxuICAgICAgICAgIHRoaXMuc2VuZFNlcnZlclJlcXVlc3QoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpdGVtLmFjdGlvbihpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZW5kU2VydmVyUmVxdWVzdCgpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgIHRoaXMub25SZXF1ZXN0KHtcbiAgICAgICAgcGFnaW5hdGlvbjogdGhpcy5zeW5jUGFnaW5hdGlvbixcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2hvd0ZpbHRlcigpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL2Jhc2UtdGFibGU6bWV0aG9kcy5zaG93RmlsdGVyKCknLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kcmVmcy5maWx0ZXIuc2hvdygpO1xuICAgIH0sXG4gICAgaGFzUGVybWlzc2lvbihpdGVtLCBwcm9wcyA9IGZhbHNlKSB7XG4gICAgICAvLyBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9iYXNlLXRhYmxlOm1ldGhvZHMuaGFzUGVybWlzc2lvbigpJywgYXJndW1lbnRzKVxuXG4gICAgICAvLyBwZXJtaXNzaW9uIGRvZXNuJ3QgZXhpc3RcbiAgICAgIGlmICh0aGlzLm5vUGVybWlzc2lvbnMpIHJldHVybiB0cnVlO1xuXG4gICAgICBpZiAoaXRlbS5tb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vIHJldHVybiAoXG4gICAgICAgIC8vICAgdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXBwL2hhc1Blcm1pc3Npb24nXShpdGVtLm1vZHVsZSkgJiZcbiAgICAgICAgLy8gICB0aGlzLiRzdG9yZS5nZXR0ZXJzWydhcHAvaGFzTW9kdWxlUGVybWlzc2lvbiddKGl0ZW0ubW9kdWxlLCBpdGVtLnBlcm1pc3Npb24pXG4gICAgICAgIC8vICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtLmNvbmRpdGlvbiAmJiBpdGVtLnBlcm1pc3Npb24gJiYgcHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zLmluY2x1ZGVzKGl0ZW0ucGVybWlzc2lvbikgJiYgaXRlbS5jb25kaXRpb24ocHJvcHMucm93LCB0aGlzLnBlcm1pc3Npb25zKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmNvbmRpdGlvbiAmJiAhaXRlbS5wZXJtaXNzaW9uICYmIHByb3BzKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmNvbmRpdGlvbihwcm9wcy5yb3csIHRoaXMucGVybWlzc2lvbnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wZXJtaXNzaW9ucy5pbmNsdWRlcyhpdGVtLnBlcm1pc3Npb24pIHx8ICFpdGVtLnBlcm1pc3Npb247XG4gICAgfSxcbiAgICBoYXNTdG9yZSgpIHtcbiAgICAgIGlmICghdGhpcy5zdG9yZSkgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc3luY1BhZ2luYXRpb246IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnaW5hdGlvbjtcbiAgICAgIH0sXG4gICAgICBzZXQodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9LFxuICAgIH0sXG4gICAgYWN0aW9uSXRlbXMoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuYWN0aW9ucyB8fCBbXSkuZmlsdGVyKFxuICAgICAgICAoaXRlbSkgPT4gaXRlbS5kZWxldGVkID09PSB0aGlzLnN5bmNQYWdpbmF0aW9uLmRlbGV0ZWQgfHwgaXRlbS5kZWxldGVkID09PSAnYWxsJ1xuICAgICAgKTtcbiAgICB9LFxuICAgIHRvb2xiYXJJdGVtcygpIHtcbiAgICAgIHJldHVybiAodGhpcy50b29sYmFyIHx8IFtdKS5maWx0ZXIoXG4gICAgICAgIChpdGVtKSA9PiBpdGVtLmRlbGV0ZWQgPT09IHRoaXMuc3luY1BhZ2luYXRpb24uZGVsZXRlZCB8fCBpdGVtLmRlbGV0ZWQgPT09ICdhbGwnXG4gICAgICApO1xuICAgIH0sXG4gICAgcGVybWlzc2lvbnMoKSB7XG4gICAgICAvLyByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXBwL2dldFBlcm1pc3Npb25zJ10odGhpcy5tb2R1bGUubmFtZSk7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICB0YWJsZVNsb3RzKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuJHNsb3RzKS5maWx0ZXIoKGl0ZW0pID0+ICFleGNlcHRTbG90cy5pbmNsdWRlcyhpdGVtKSk7XG4gICAgfSxcbiAgICB0b3BMZWZ0V2lkdGgoKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IDEyIC0gdGhpcy50b3BSaWdodFdpZHRoO1xuICAgICAgcmV0dXJuIHdpZHRoIHx8IDEyO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVJhdGlvUHJvcHMgPSB7XG4gIHJhdGlvOiBbIFN0cmluZywgTnVtYmVyIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBuYXR1cmFsUmF0aW8pIHtcbiAgLy8gcmV0dXJuIHJhdGlvU3R5bGVcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCByYXRpbyA9IE51bWJlcihcbiAgICAgIHByb3BzLnJhdGlvIHx8IChuYXR1cmFsUmF0aW8gIT09IHZvaWQgMCA/IG5hdHVyYWxSYXRpby52YWx1ZSA6IHZvaWQgMClcbiAgICApXG5cbiAgICByZXR1cm4gaXNOYU4ocmF0aW8pICE9PSB0cnVlICYmIHJhdGlvID4gMFxuICAgICAgPyB7IHBhZGRpbmdCb3R0b206IGAkeyAxMDAgLyByYXRpbyB9JWAgfVxuICAgICAgOiBudWxsXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyL1FTcGlubmVyLmpzJ1xuXG5pbXBvcnQgdXNlUmF0aW8sIHsgdXNlUmF0aW9Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJhdGlvLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5jb25zdCBkZWZhdWx0UmF0aW8gPSAxNiAvIDlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbWcnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUmF0aW9Qcm9wcyxcblxuICAgIHNyYzogU3RyaW5nLFxuICAgIHNyY3NldDogU3RyaW5nLFxuICAgIHNpemVzOiBTdHJpbmcsXG5cbiAgICBhbHQ6IFN0cmluZyxcbiAgICBjcm9zc29yaWdpbjogU3RyaW5nLFxuICAgIGRlY29kaW5nOiBTdHJpbmcsXG4gICAgcmVmZXJyZXJwb2xpY3k6IFN0cmluZyxcblxuICAgIGRyYWdnYWJsZTogQm9vbGVhbixcblxuICAgIGxvYWRpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsYXp5J1xuICAgIH0sXG4gICAgZmV0Y2hwcmlvcml0eToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2F1dG8nXG4gICAgfSxcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIGluaXRpYWxSYXRpbzoge1xuICAgICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgICAgZGVmYXVsdDogZGVmYXVsdFJhdGlvXG4gICAgfSxcblxuICAgIHBsYWNlaG9sZGVyU3JjOiBTdHJpbmcsXG5cbiAgICBmaXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjb3ZlcidcbiAgICB9LFxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnNTAlIDUwJSdcbiAgICB9LFxuXG4gICAgaW1nQ2xhc3M6IFN0cmluZyxcbiAgICBpbWdTdHlsZTogT2JqZWN0LFxuXG4gICAgbm9TcGlubmVyOiBCb29sZWFuLFxuICAgIG5vTmF0aXZlTWVudTogQm9vbGVhbixcbiAgICBub1RyYW5zaXRpb246IEJvb2xlYW4sXG5cbiAgICBzcGlubmVyQ29sb3I6IFN0cmluZyxcbiAgICBzcGlubmVyU2l6ZTogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2xvYWQnLCAnZXJyb3InIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCBuYXR1cmFsUmF0aW8gPSByZWYocHJvcHMuaW5pdGlhbFJhdGlvKVxuICAgIGNvbnN0IHJhdGlvU3R5bGUgPSB1c2VSYXRpbyhwcm9wcywgbmF0dXJhbFJhdGlvKVxuXG4gICAgbGV0IGxvYWRUaW1lclxuXG4gICAgY29uc3QgaW1hZ2VzID0gW1xuICAgICAgcmVmKG51bGwpLFxuICAgICAgcmVmKHByb3BzLnBsYWNlaG9sZGVyU3JjICE9PSB2b2lkIDAgPyB7IHNyYzogcHJvcHMucGxhY2Vob2xkZXJTcmMgfSA6IG51bGwpXG4gICAgXVxuXG4gICAgY29uc3QgcG9zaXRpb24gPSByZWYoMClcblxuICAgIGNvbnN0IGlzTG9hZGluZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBoYXNFcnJvciA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtaW1nIHEtaW1nLS0keyBwcm9wcy5ub05hdGl2ZU1lbnUgPT09IHRydWUgPyAnbm8tJyA6ICcnIH1tZW51YFxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcbiAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0XG4gICAgfSkpXG5cbiAgICBjb25zdCBpbWdDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1pbWdfX2ltYWdlICR7IHByb3BzLmltZ0NsYXNzICE9PSB2b2lkIDAgPyBwcm9wcy5pbWdDbGFzcyArICcgJyA6ICcnIH1gXG4gICAgICArIGBxLWltZ19faW1hZ2UtLXdpdGgkeyBwcm9wcy5ub1RyYW5zaXRpb24gPT09IHRydWUgPyAnb3V0JyA6ICcnIH0tdHJhbnNpdGlvbmBcbiAgICApXG5cbiAgICBjb25zdCBpbWdTdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICAuLi5wcm9wcy5pbWdTdHlsZSxcbiAgICAgIG9iamVjdEZpdDogcHJvcHMuZml0LFxuICAgICAgb2JqZWN0UG9zaXRpb246IHByb3BzLnBvc2l0aW9uXG4gICAgfSkpXG5cbiAgICB3YXRjaCgoKSA9PiBnZXRDdXJyZW50U3JjKCksIGFkZEltYWdlKVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudFNyYyAoKSB7XG4gICAgICByZXR1cm4gcHJvcHMuc3JjIHx8IHByb3BzLnNyY3NldCB8fCBwcm9wcy5zaXplc1xuICAgICAgICA/IHtcbiAgICAgICAgICAgIHNyYzogcHJvcHMuc3JjLFxuICAgICAgICAgICAgc3Jjc2V0OiBwcm9wcy5zcmNzZXQsXG4gICAgICAgICAgICBzaXplczogcHJvcHMuc2l6ZXNcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEltYWdlIChpbWdQcm9wcykge1xuICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcblxuICAgICAgaWYgKGltZ1Byb3BzID09PSBudWxsKSB7XG4gICAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGltYWdlc1sgMCBdLnZhbHVlID0gbnVsbFxuICAgICAgICBpbWFnZXNbIDEgXS52YWx1ZSA9IG51bGxcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlzTG9hZGluZy52YWx1ZSA9IHRydWVcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXS52YWx1ZSA9IGltZ1Byb3BzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Mb2FkICh7IHRhcmdldCB9KSB7XG4gICAgICAvLyBpZiBjb21wb25lbnQgaGFzIGJlZW4gYWxyZWFkeSBkZXN0cm95ZWRcbiAgICAgIGlmIChsb2FkVGltZXIgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcblxuICAgICAgbmF0dXJhbFJhdGlvLnZhbHVlID0gdGFyZ2V0Lm5hdHVyYWxIZWlnaHQgPT09IDBcbiAgICAgICAgPyAwLjVcbiAgICAgICAgOiB0YXJnZXQubmF0dXJhbFdpZHRoIC8gdGFyZ2V0Lm5hdHVyYWxIZWlnaHRcblxuICAgICAgd2FpdEZvckNvbXBsZXRlbmVzcyh0YXJnZXQsIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2FpdEZvckNvbXBsZXRlbmVzcyAodGFyZ2V0LCBjb3VudCkge1xuICAgICAgLy8gcHJvdGVjdCBhZ2FpbnN0IHJ1bm5pbmcgZm9yZXZlclxuICAgICAgaWYgKGxvYWRUaW1lciA9PT0gbnVsbCB8fCBjb3VudCA9PT0gMTAwMCkgeyByZXR1cm4gfVxuXG4gICAgICBpZiAodGFyZ2V0LmNvbXBsZXRlID09PSB0cnVlKSB7XG4gICAgICAgIG9uUmVhZHkodGFyZ2V0KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxvYWRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdhaXRGb3JDb21wbGV0ZW5lc3ModGFyZ2V0LCBjb3VudCArIDEpXG4gICAgICAgIH0sIDUwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkgKGltZykge1xuICAgICAgLy8gaWYgY29tcG9uZW50IGhhcyBiZWVuIGFscmVhZHkgZGVzdHJveWVkXG4gICAgICBpZiAobG9hZFRpbWVyID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIHBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24udmFsdWUgPT09IDEgPyAwIDogMVxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gbnVsbFxuICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcbiAgICAgIGVtaXQoJ2xvYWQnLCBpbWcuY3VycmVudFNyYyB8fCBpbWcuc3JjKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycikge1xuICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICBoYXNFcnJvci52YWx1ZSA9IHRydWVcbiAgICAgIGltYWdlc1sgMCBdLnZhbHVlID0gbnVsbFxuICAgICAgaW1hZ2VzWyAxIF0udmFsdWUgPSBudWxsXG4gICAgICBlbWl0KCdlcnJvcicsIGVycilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250YWluZXIgKGtleSwgY2hpbGQpIHtcbiAgICAgIHJldHVybiBoKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBjbGFzczogJ3EtaW1nX19jb250YWluZXIgYWJzb2x1dGUtZnVsbCcsIGtleSB9LFxuICAgICAgICBjaGlsZFxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEltYWdlIChpbmRleCkge1xuICAgICAgY29uc3QgaW1nID0gaW1hZ2VzWyBpbmRleCBdLnZhbHVlXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGtleTogJ2ltZ18nICsgaW5kZXgsXG4gICAgICAgIGNsYXNzOiBpbWdDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IGltZ1N0eWxlLnZhbHVlLFxuICAgICAgICBjcm9zc29yaWdpbjogcHJvcHMuY3Jvc3NvcmlnaW4sXG4gICAgICAgIGRlY29kaW5nOiBwcm9wcy5kZWNvZGluZyxcbiAgICAgICAgcmVmZXJyZXJwb2xpY3k6IHByb3BzLnJlZmVycmVycG9saWN5LFxuICAgICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodCxcbiAgICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgICBsb2FkaW5nOiBwcm9wcy5sb2FkaW5nLFxuICAgICAgICBmZXRjaHByaW9yaXR5OiBwcm9wcy5mZXRjaHByaW9yaXR5LFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgIGRyYWdnYWJsZTogcHJvcHMuZHJhZ2dhYmxlLFxuICAgICAgICAuLi5pbWdcbiAgICAgIH1cblxuICAgICAgaWYgKHBvc2l0aW9uLnZhbHVlID09PSBpbmRleCkge1xuICAgICAgICBkYXRhLmNsYXNzICs9ICcgcS1pbWdfX2ltYWdlLS13YWl0aW5nJ1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHsgb25Mb2FkLCBvbkVycm9yIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGF0YS5jbGFzcyArPSAnIHEtaW1nX19pbWFnZS0tbG9hZGVkJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0Q29udGFpbmVyKCdpbWcnICsgaW5kZXgsIGgoJ2ltZycsIGRhdGEpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgaWYgKGlzTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGtleTogJ2NvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1pbWdfX2NvbnRlbnQgYWJzb2x1dGUtZnVsbCBxLWFuY2hvci0tc2tpcCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHNbIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJ2Vycm9yJyA6ICdkZWZhdWx0JyBdKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAga2V5OiAnbG9hZGluZycsXG4gICAgICAgIGNsYXNzOiAncS1pbWdfX2xvYWRpbmcgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyJ1xuICAgICAgfSwgKFxuICAgICAgICBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzLmxvYWRpbmcoKVxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBwcm9wcy5ub1NwaW5uZXIgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHZvaWQgMFxuICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICBoKFFTcGlubmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHByb3BzLnNwaW5uZXJDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICBzaXplOiBwcm9wcy5zcGlubmVyU2l6ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKVxuICAgICAgKSlcbiAgICB9XG5cbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBpZiAoX19RVUFTQVJfU1NSX0NMSUVOVF9fICYmIGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgICAgIGFkZEltYWdlKGdldEN1cnJlbnRTcmMoKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhZGRJbWFnZShnZXRDdXJyZW50U3JjKCkpXG4gICAgICB9XG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dChsb2FkVGltZXIpXG4gICAgICAgIGxvYWRUaW1lciA9IG51bGxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXVxuXG4gICAgICBpZiAocmF0aW9TdHlsZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb250ZW50LnB1c2goXG4gICAgICAgICAgaCgnZGl2JywgeyBrZXk6ICdmaWxsZXInLCBzdHlsZTogcmF0aW9TdHlsZS52YWx1ZSB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNFcnJvci52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAoaW1hZ2VzWyAwIF0udmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb250ZW50LnB1c2goZ2V0SW1hZ2UoMCkpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1hZ2VzWyAxIF0udmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb250ZW50LnB1c2goZ2V0SW1hZ2UoMSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICBoKFRyYW5zaXRpb24sIHsgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZScgfSwgZ2V0Q29udGVudClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcm9sZTogJ2ltZycsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMuYWx0XG4gICAgICB9LCBjb250ZW50KVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtaW1nIDpyYXRpbz1cInJhdGlvXCIgY2xhc3M9XCJ0aHVtYm5haWxcIiA6c3JjPVwic3JjXCIgLz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgbWVkaWE6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICB9LFxuICAgIHJhdGlvOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAoKSA9PiAxNiAvIDksXG4gICAgfSxcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzcmMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tZWRpYSA/IHRoaXMubWVkaWEudXJsIDogJy9pbWcvcGxhY2Vob2xkZXIucG5nJztcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9zZmNfbWFpbiIsIl9jcmVhdGVCbG9jayIsIl9ub3JtYWxpemVDbGFzcyIsIl9yZW5kZXJTbG90IiwiaCIsIndpZHRoIiwiX2hvaXN0ZWRfMSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfaG9pc3RlZF8yIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9vcGVuQmxvY2siLCJfaG9pc3RlZF8zIiwiX3RvRGlzcGxheVN0cmluZyIsImRlZmF1bHRTaXplcyIsImVsIiwidmFsaWRhdGVOZXdWYWx1ZU1vZGUiLCJvcHRpb25JbmRleCIsImF0dHJzIiwiZGVmIiwibGFzdFBhZ2UiLCJjbGVhclNlbGVjdGlvbiIsInByb3BzIiwiX2hvaXN0ZWRfNSIsIl9ob2lzdGVkXzYiLCJfaG9pc3RlZF83IiwiX2hvaXN0ZWRfNCIsIl9yZW5kZXJMaXN0IiwibWFwIiwiX3Jlc29sdmVEeW5hbWljQ29tcG9uZW50IiwiX21lcmdlUHJvcHMiLCJfd2l0aEN0eCIsIl9ub3JtYWxpemVQcm9wcyIsIl9ndWFyZFJlYWN0aXZlUHJvcHMiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3ZTaG93IiwicG9zaXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFzQkEsTUFBS0EsY0FBVTtBQUFBLEVBQ2IsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLE1BQ0osTUFBTSxDQUFDLE9BQU87QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxN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
