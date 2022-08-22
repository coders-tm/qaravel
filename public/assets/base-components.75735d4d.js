import { Q as QItem, a as QItemSection, b as QList, _ as __require_context_for_vite_0_0 } from "./BaseAlert.7b9d1a3e.js";
import { _ as _export_sfc, S as openBlock, U as createBlock, V as withCtx, a9 as renderSlot, aa as normalizeClass, a2 as QBtn, v as createComponent, c as computed, h, I as hSlot, r as ref, O as isKeyCode, ab as prevent, ac as nextTick, ad as addEvt, w as watch, o as onMounted, x as onBeforeUnmount, g as getCurrentInstance, ae as cleanEvt, af as listenOpts, ag as portalList, ah as client, ai as getScrollbarWidth, aj as useModelToggleProps, J as useDarkProps, ak as useTransitionProps, al as useModelToggleEmits, L as useDark, am as useTick, an as useTimeout, ao as useTransition, ap as useModelToggle, aq as usePortal, ar as addFocusout, as as position, at as removeFocusout, au as removeEscapeKey, av as getScrollTarget, aw as Transition, ax as addEscapeKey, ay as addFocusFn, az as closePortalMenus, aA as childHasFocus, Q as stopAndPrevent, aB as useBtnProps, a5 as QIcon, aC as stop, aD as createDirective, aE as getPortalVm, aF as closePortals, d as createVNode, aG as normalizeStyle, a3 as QCard, a4 as QDialog, a6 as createTextVNode, $ as toDisplayString, aH as withDirectives, aI as vShow, aJ as QSeparator, Y as createCommentVNode, Z as QCardSection, X as createElementBlock, W as createBaseVNode, F as Fragment, aK as QInput, aL as useFieldProps, aM as useFieldEmits, aN as useField, aO as useFieldState, aP as useSizeProps, aQ as useSize, aR as hDir, aS as hMergeSlotSafely, aT as Ripple, n as noop, aU as debounce, aV as onBeforeMount, aW as onDeactivated, aX as onActivated, aY as useFormProps, aZ as useFormInputNameAttr, a_ as onBeforeUpdate, a$ as onUpdated, b0 as isDeepEqual, b1 as normalizeToInterval, b2 as shouldIgnoreKey, b3 as fieldValueIsFilled, b4 as hMergeSlot, b5 as useKeyComposition, b6 as createSlots, R as hUniqueSlot, b7 as vmHasRouter, b8 as History, b9 as isNumber, j as isDate, C as isObject, ba as injectMultipleProps, bb as QCheckbox, bc as injectProp, a0 as renderList, bd as resolveComponent, be as mergeProps, bf as normalizeProps, bg as guardReactiveProps, bh as withModifiers, bi as resolveDynamicComponent, bj as QSpinner, f as boot } from "./index.8d5ea4b7.js";
import { c as clearSelection, Q as QSpace, a as QItemLabel, b as QDrawer } from "./QDrawer.9837841e.js";
import { Q as QToolbar, a as QToolbarTitle } from "./QToolbar.562c56d5.js";
import { Q as QForm } from "./QForm.f020bae8.js";
import { l as lodash } from "./lodash.2b44b28e.js";
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
const skeletonTypes = [
  "text",
  "rect",
  "circle",
  "QBtn",
  "QBadge",
  "QChip",
  "QToolbar",
  "QCheckbox",
  "QRadio",
  "QToggle",
  "QSlider",
  "QRange",
  "QInput",
  "QAvatar"
];
const skeletonAnimations = [
  "wave",
  "pulse",
  "pulse-x",
  "pulse-y",
  "fade",
  "blink",
  "none"
];
var QSkeleton = createComponent({
  name: "QSkeleton",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    type: {
      type: String,
      validator: (v) => skeletonTypes.includes(v),
      default: "rect"
    },
    animation: {
      type: String,
      validator: (v) => skeletonAnimations.includes(v),
      default: "wave"
    },
    animationSpeed: {
      type: [String, Number],
      default: 1500
    },
    square: Boolean,
    bordered: Boolean,
    size: String,
    width: String,
    height: String
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const style = computed(() => {
      const size = props.size !== void 0 ? [props.size, props.size] : [props.width, props.height];
      return {
        "--q-skeleton-speed": `${props.animationSpeed}ms`,
        width: size[0],
        height: size[1]
      };
    });
    const classes = computed(
      () => `q-skeleton q-skeleton--${isDark.value === true ? "dark" : "light"} q-skeleton--type-${props.type}` + (props.animation !== "none" ? ` q-skeleton--anim q-skeleton--anim-${props.animation}` : "") + (props.square === true ? " q-skeleton--square" : "") + (props.bordered === true ? " q-skeleton--bordered" : "")
    );
    return () => h(props.tag, {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb21wb25lbnRzLjc1NzM1ZDRkLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9iYXNlL0Jhc2VCdG4udnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4tZ3JvdXAvUUJ0bkdyb3VwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYW5jaG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2Nyb2xsLXRhcmdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvY2xpY2stb3V0c2lkZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcG9zaXRpb24tZW5naW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9tZW51L1FNZW51LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4tZHJvcGRvd24vUUJ0bkRyb3Bkb3duLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlQnRuRHJvcGRvd24udnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy9DbG9zZVBvcHVwLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlRGlhbG9nLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZUZvcm0udnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9iYW5uZXIvUUJhbm5lci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZUlucHV0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZUl0ZW0udnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlTGFiZWwudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlU2VjdGlvbi52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZpZWxkL1FGaWVsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2hpcC9RQ2hpcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcnRsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NlbGVjdC9RU2VsZWN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFzZS9CYXNlU2VsZWN0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZVN0YXRpYy52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL1FUZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvUVRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9tYXJrdXAtdGFibGUvUU1hcmt1cFRhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJsZS9nZXQtdGFibGUtbWlkZGxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy92aXJ0dWFsLXNjcm9sbC9RVmlydHVhbFNjcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbGluZWFyLXByb2dyZXNzL1FMaW5lYXJQcm9ncmVzcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZ1bGxzY3JlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3NvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLXNvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLWZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcGFnaW5hdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcm93LXNlbGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcm93LWV4cGFuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtY29sdW1uLXNlbGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvUVRhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9za2VsZXRvbi9RU2tlbGV0b24uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9za2VsZXRvbi9UYWJsZVNrZWxldG9uLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZVRhYmxlLnZ1ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJhdGlvLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbWcvUUltZy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Jhc2UvQmFzZVRodW1ibmFpbC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgIG5vLWNhcHNcbiAgICA6cmlwcGxlPVwiIWxpbmtcIlxuICAgIDpjbGFzcz1cIntcbiAgICAgICdiYXNlLWJ0bl9fbm8tZm9jdXMgYnRuLWxpbmsnOiBsaW5rLFxuICAgICAgJ2hhcy1pY29uJzogaWNvbixcbiAgICAgICduby1pY29uJzogIWljb24sXG4gICAgICAnYmFzZS1idG4nOiB0cnVlLFxuICAgICAgJ3ZlcnRpY2FsLWFsaWduLW1pZGRsZSc6IHZlcnRpY2FsTWlkZGVsLFxuICAgIH1cIlxuICAgIDpmbGF0PVwibGlua1wiXG4gICAgOmRlbnNlPVwibGlua1wiXG4gICAgOmljb249XCJpY29uXCJcbiAgICBzaXplPVwiMTNweFwiXG4gID5cbiAgICA8c2xvdD48L3Nsb3Q+XG4gIDwvcS1idG4+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGxpbms6IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIHZlcnRpY2FsTWlkZGVsOiBCb29sZWFuLFxuICB9LFxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNhc3NcIj5cbi5iYXNlLWJ0blxuICAmLnZlcnRpY2FsLWFsaWduLW1pZGRsZVxuICAgIHBhZGRpbmc6IDlweCAxNnB4XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZVxuICAucS1pY29uLCAucS1zcGlubmVyXG4gICAgZm9udC1zaXplOiAxLjI1ZW1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJ0bkdyb3VwJyxcblxuICBwcm9wczoge1xuICAgIHVuZWxldmF0ZWQ6IEJvb2xlYW4sXG4gICAgb3V0bGluZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW4sXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIHB1c2g6IEJvb2xlYW4sXG4gICAgc3RyZXRjaDogQm9vbGVhbixcbiAgICBnbG9zc3k6IEJvb2xlYW4sXG4gICAgc3ByZWFkOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY2xzID0gWyAndW5lbGV2YXRlZCcsICdvdXRsaW5lJywgJ2ZsYXQnLCAncm91bmRlZCcsICdzcXVhcmUnLCAncHVzaCcsICdzdHJldGNoJywgJ2dsb3NzeScgXVxuICAgICAgICAuZmlsdGVyKHQgPT4gcHJvcHNbIHQgXSA9PT0gdHJ1ZSlcbiAgICAgICAgLm1hcCh0ID0+IGBxLWJ0bi1ncm91cC0tJHsgdCB9YCkuam9pbignICcpXG5cbiAgICAgIHJldHVybiBgcS1idG4tZ3JvdXAgcm93IG5vLXdyYXAkeyBjbHMubGVuZ3RoID4gMCA/ICcgJyArIGNscyA6ICcnIH1gXG4gICAgICAgICsgKHByb3BzLnNwcmVhZCA9PT0gdHJ1ZSA/ICcgcS1idG4tZ3JvdXAtLXNwcmVhZCcgOiAnIGlubGluZScpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zZWxlY3Rpb24uanMnXG5pbXBvcnQgeyBhZGRFdnQsIGNsZWFuRXZ0LCBwcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcblxuZXhwb3J0IGNvbnN0IHVzZUFuY2hvclByb3BzID0ge1xuICB0YXJnZXQ6IHtcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIG5vUGFyZW50RXZlbnQ6IEJvb2xlYW4sXG4gIGNvbnRleHRNZW51OiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGF2b2lkRW1pdCwgLy8gcmVxdWlyZWQgZm9yIFFQb3B1cFByb3h5ICh0cnVlKVxuICBjb25maWd1cmVBbmNob3JFbCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSwgZW1pdCB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBhbmNob3JFbCA9IHJlZihudWxsKVxuXG4gIGxldCB0b3VjaFRpbWVyXG5cbiAgZnVuY3Rpb24gY2FuU2hvdyAoZXZ0KSB7XG4gICAgLy8gYWJvcnQgd2l0aCBubyBwYXJlbnQgY29uZmlndXJlZCBvciBvbiBtdWx0aS10b3VjaFxuICAgIHJldHVybiBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgPyBmYWxzZVxuICAgICAgOiAoZXZ0ID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMgPT09IHZvaWQgMCB8fCBldnQudG91Y2hlcy5sZW5ndGggPD0gMSlcbiAgfVxuXG4gIGNvbnN0IGFuY2hvckV2ZW50cyA9IHt9XG5cbiAgaWYgKGNvbmZpZ3VyZUFuY2hvckVsID09PSB2b2lkIDApIHtcbiAgICAvLyBkZWZhdWx0IGNvbmZpZ3VyZUFuY2hvckVsIGlzIGRlc2lnbmVkIGZvclxuICAgIC8vIFFNZW51ICYgUVBvcHVwUHJveHkgKHdoaWNoIGlzIHdoeSBpdCdzIGhhbmRsZWQgaGVyZSlcblxuICAgIE9iamVjdC5hc3NpZ24oYW5jaG9yRXZlbnRzLCB7XG4gICAgICBoaWRlIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICB9LFxuXG4gICAgICB0b2dnbGUgKGV2dCkge1xuICAgICAgICBwcm94eS50b2dnbGUoZXZ0KVxuICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICB9LFxuXG4gICAgICB0b2dnbGVLZXkgKGV2dCkge1xuICAgICAgICBpc0tleUNvZGUoZXZ0LCAxMykgPT09IHRydWUgJiYgYW5jaG9yRXZlbnRzLnRvZ2dsZShldnQpXG4gICAgICB9LFxuXG4gICAgICBjb250ZXh0Q2xpY2sgKGV2dCkge1xuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgcHJldmVudChldnQpXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBwcmV2ZW50LFxuXG4gICAgICBtb2JpbGVUb3VjaCAoZXZ0KSB7XG4gICAgICAgIGFuY2hvckV2ZW50cy5tb2JpbGVDbGVhbnVwKGV2dClcblxuICAgICAgICBpZiAoY2FuU2hvdyhldnQpICE9PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgYW5jaG9yRWwudmFsdWUuY2xhc3NMaXN0LmFkZCgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcbiAgICAgICAgYWRkRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicsIFtcbiAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2NvbnRleHRtZW51JywgJ3ByZXZlbnQnLCAnbm90UGFzc2l2ZScgXVxuICAgICAgICBdKVxuXG4gICAgICAgIHRvdWNoVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0sIDMwMClcbiAgICAgIH0sXG5cbiAgICAgIG1vYmlsZUNsZWFudXAgKGV2dCkge1xuICAgICAgICBhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG4gICAgICAgIGNsZWFyVGltZW91dCh0b3VjaFRpbWVyKVxuXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIGV2dCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbmZpZ3VyZUFuY2hvckVsID0gZnVuY3Rpb24gKGNvbnRleHQgPSBwcm9wcy5jb250ZXh0TWVudSkge1xuICAgICAgaWYgKHByb3BzLm5vUGFyZW50RXZlbnQgPT09IHRydWUgfHwgYW5jaG9yRWwudmFsdWUgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgbGV0IGV2dHNcblxuICAgICAgaWYgKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHByb3h5LiRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAndG91Y2hzdGFydCcsICdtb2JpbGVUb3VjaCcsICdwYXNzaXZlJyBdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnbW91c2Vkb3duJywgJ2hpZGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdjb250ZXh0Q2xpY2snLCAnbm90UGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2NsaWNrJywgJ3RvZ2dsZScsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdrZXl1cCcsICd0b2dnbGVLZXknLCAncGFzc2l2ZScgXVxuICAgICAgICBdXG4gICAgICB9XG5cbiAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBldnRzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVuY29uZmlndXJlQW5jaG9yRWwgKCkge1xuICAgIGNsZWFuRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicpXG4gIH1cblxuICBmdW5jdGlvbiBzZXRBbmNob3JFbCAoZWwpIHtcbiAgICBhbmNob3JFbC52YWx1ZSA9IGVsXG4gICAgd2hpbGUgKGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5jb250YWlucygncS1hbmNob3ItLXNraXAnKSkge1xuICAgICAgYW5jaG9yRWwudmFsdWUgPSBhbmNob3JFbC52YWx1ZS5wYXJlbnROb2RlXG4gICAgfVxuICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpY2tBbmNob3JFbCAoKSB7XG4gICAgaWYgKHByb3BzLnRhcmdldCA9PT0gZmFsc2UgfHwgcHJvcHMudGFyZ2V0ID09PSAnJyB8fCBwcm94eS4kZWwucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgYW5jaG9yRWwudmFsdWUgPSBudWxsXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLnRhcmdldCA9PT0gdHJ1ZSkge1xuICAgICAgc2V0QW5jaG9yRWwocHJveHkuJGVsLnBhcmVudE5vZGUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IGVsID0gcHJvcHMudGFyZ2V0XG5cbiAgICAgIGlmICh0eXBlb2YgcHJvcHMudGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwcm9wcy50YXJnZXQpXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgIGVsID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVsICE9PSB2b2lkIDAgJiYgZWwgIT09IG51bGwpIHtcbiAgICAgICAgYW5jaG9yRWwudmFsdWUgPSBlbC4kZWwgfHwgZWxcbiAgICAgICAgY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgICAgICBjb25zb2xlLmVycm9yKGBBbmNob3I6IHRhcmdldCBcIiR7IHByb3BzLnRhcmdldCB9XCIgbm90IGZvdW5kYClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5jb250ZXh0TWVudSwgdmFsID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgY29uZmlndXJlQW5jaG9yRWwodmFsKVxuICAgIH1cbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy50YXJnZXQsICgpID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgIH1cblxuICAgIHBpY2tBbmNob3JFbCgpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgdmFsID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHBpY2tBbmNob3JFbCgpXG5cbiAgICBpZiAoYXZvaWRFbWl0ICE9PSB0cnVlICYmIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgYW5jaG9yRWwudmFsdWUgPT09IG51bGwpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgfVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhbmNob3JFbCxcbiAgICBjYW5TaG93LFxuICAgIGFuY2hvckV2ZW50c1xuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKFxuICBwcm9wcyxcbiAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0XG4pIHtcbiAgY29uc3QgbG9jYWxTY3JvbGxUYXJnZXQgPSByZWYobnVsbClcbiAgbGV0IHNjcm9sbEZuXG5cbiAgZnVuY3Rpb24gY2hhbmdlU2Nyb2xsRXZlbnQgKHNjcm9sbFRhcmdldCwgZm4pIHtcbiAgICBjb25zdCBmblByb3AgPSBgJHsgZm4gIT09IHZvaWQgMCA/ICdhZGQnIDogJ3JlbW92ZScgfUV2ZW50TGlzdGVuZXJgXG4gICAgY29uc3QgZm5IYW5kbGVyID0gZm4gIT09IHZvaWQgMCA/IGZuIDogc2Nyb2xsRm5cblxuICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IHdpbmRvdykge1xuICAgICAgc2Nyb2xsVGFyZ2V0WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgd2luZG93WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG5cbiAgICBzY3JvbGxGbiA9IGZuXG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSlcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vUGFyZW50RXZlbnRXYXRjaGVyID0gd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgKCkgPT4ge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KG5vUGFyZW50RXZlbnRXYXRjaGVyKVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxTY3JvbGxUYXJnZXQsXG4gICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQsXG4gICAgY2hhbmdlU2Nyb2xsRXZlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgbGlzdGVuT3B0cyB9IGZyb20gJy4uL2V2ZW50LmpzJ1xuaW1wb3J0IHsgcG9ydGFsTGlzdCB9IGZyb20gJy4uL3ByaXZhdGUvcG9ydGFsLmpzJ1xuXG5sZXQgdGltZXJcblxuY29uc3RcbiAgeyBub3RQYXNzaXZlQ2FwdHVyZSB9ID0gbGlzdGVuT3B0cyxcbiAgcmVnaXN0ZXJlZExpc3QgPSBbXVxuXG5mdW5jdGlvbiBnbG9iYWxIYW5kbGVyIChldnQpIHtcbiAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuXG4gIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcblxuICBpZiAoXG4gICAgdGFyZ2V0ID09PSB2b2lkIDBcbiAgICB8fCB0YXJnZXQubm9kZVR5cGUgPT09IDhcbiAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduby1wb2ludGVyLWV2ZW50cycpID09PSB0cnVlXG4gICkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gY2hlY2sgbGFzdCBwb3J0YWwgdm0gaWYgaXQnc1xuICAvLyBhIFFEaWFsb2cgYW5kIG5vdCBpbiBzZWFtbGVzcyBtb2RlXG4gIGxldCBwb3J0YWxJbmRleCA9IHBvcnRhbExpc3QubGVuZ3RoIC0gMVxuXG4gIHdoaWxlIChwb3J0YWxJbmRleCA+PSAwKSB7XG4gICAgY29uc3QgcHJveHkgPSBwb3J0YWxMaXN0WyBwb3J0YWxJbmRleCBdLiRcblxuICAgIGlmIChwcm94eS50eXBlLm5hbWUgIT09ICdRRGlhbG9nJykge1xuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBpZiAocHJveHkucHJvcHMuc2VhbWxlc3MgIT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHBvcnRhbEluZGV4LS1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSByZWdpc3RlcmVkTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHN0YXRlID0gcmVnaXN0ZXJlZExpc3RbIGkgXVxuXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICBzdGF0ZS5hbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgICB8fCBzdGF0ZS5hbmNob3JFbC52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgKVxuICAgICAgJiYgKFxuICAgICAgICB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICAgfHwgKFxuICAgICAgICAgIHN0YXRlLmlubmVyUmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgJiYgc3RhdGUuaW5uZXJSZWYudmFsdWUuY29udGFpbnModGFyZ2V0KSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkge1xuICAgICAgLy8gbWFyayB0aGUgZXZlbnQgYXMgYmVpbmcgcHJvY2Vzc2VkIGJ5IGNsaWNrT3V0c2lkZVxuICAgICAgLy8gdXNlZCB0byBwcmV2ZW50IHJlZm9jdXMgYWZ0ZXIgbWVudSBjbG9zZVxuICAgICAgZXZ0LnFDbGlja091dHNpZGUgPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNsaWNrT3V0c2lkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIHJlZ2lzdGVyZWRMaXN0LnB1c2goY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xpY2tPdXRzaWRlIChjbGlja091dHNpZGVQcm9wcykge1xuICBjb25zdCBpbmRleCA9IHJlZ2lzdGVyZWRMaXN0LmZpbmRJbmRleChoID0+IGggPT09IGNsaWNrT3V0c2lkZVByb3BzKVxuXG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgcmVnaXN0ZXJlZExpc3Quc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRTY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uL3Njcm9sbC5qcydcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmxldCB2cExlZnQsIHZwVG9wXG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVBvc2l0aW9uIChwb3MpIHtcbiAgY29uc3QgcGFydHMgPSBwb3Muc3BsaXQoJyAnKVxuICBpZiAocGFydHMubGVuZ3RoICE9PSAyKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKFsgJ3RvcCcsICdjZW50ZXInLCAnYm90dG9tJyBdLmluY2x1ZGVzKHBhcnRzWyAwIF0pICE9PSB0cnVlKSB7XG4gICAgY29uc29sZS5lcnJvcignQW5jaG9yL1NlbGYgcG9zaXRpb24gbXVzdCBzdGFydCB3aXRoIG9uZSBvZiB0b3AvY2VudGVyL2JvdHRvbScpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKFsgJ2xlZnQnLCAnbWlkZGxlJywgJ3JpZ2h0JywgJ3N0YXJ0JywgJ2VuZCcgXS5pbmNsdWRlcyhwYXJ0c1sgMSBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3QgZW5kIHdpdGggb25lIG9mIGxlZnQvbWlkZGxlL3JpZ2h0L3N0YXJ0L2VuZCcpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlT2Zmc2V0ICh2YWwpIHtcbiAgaWYgKCF2YWwpIHsgcmV0dXJuIHRydWUgfVxuICBpZiAodmFsLmxlbmd0aCAhPT0gMikgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAodHlwZW9mIHZhbFsgMCBdICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsWyAxIF0gIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgaG9yaXpvbnRhbFBvcyA9IHtcbiAgJ3N0YXJ0I2x0cic6ICdsZWZ0JyxcbiAgJ3N0YXJ0I3J0bCc6ICdyaWdodCcsXG4gICdlbmQjbHRyJzogJ3JpZ2h0JyxcbiAgJ2VuZCNydGwnOiAnbGVmdCdcbn1cblxuO1sgJ2xlZnQnLCAnbWlkZGxlJywgJ3JpZ2h0JyBdLmZvckVhY2gocG9zID0+IHtcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I2x0cmAgXSA9IHBvc1xuICBob3Jpem9udGFsUG9zWyBgJHsgcG9zIH0jcnRsYCBdID0gcG9zXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQb3NpdGlvbiAocG9zLCBydGwpIHtcbiAgY29uc3QgcGFydHMgPSBwb3Muc3BsaXQoJyAnKVxuICByZXR1cm4ge1xuICAgIHZlcnRpY2FsOiBwYXJ0c1sgMCBdLFxuICAgIGhvcml6b250YWw6IGhvcml6b250YWxQb3NbIGAkeyBwYXJ0c1sgMSBdIH0jJHsgcnRsID09PSB0cnVlID8gJ3J0bCcgOiAnbHRyJyB9YCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuY2hvclByb3BzIChlbCwgb2Zmc2V0KSB7XG4gIGxldCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICBpZiAob2Zmc2V0ICE9PSB2b2lkIDApIHtcbiAgICB0b3AgLT0gb2Zmc2V0WyAxIF1cbiAgICBsZWZ0IC09IG9mZnNldFsgMCBdXG4gICAgYm90dG9tICs9IG9mZnNldFsgMSBdXG4gICAgcmlnaHQgKz0gb2Zmc2V0WyAwIF1cblxuICAgIHdpZHRoICs9IG9mZnNldFsgMCBdXG4gICAgaGVpZ2h0ICs9IG9mZnNldFsgMSBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcCxcbiAgICBsZWZ0LFxuICAgIHJpZ2h0LFxuICAgIGJvdHRvbSxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgbWlkZGxlOiBsZWZ0ICsgKHJpZ2h0IC0gbGVmdCkgLyAyLFxuICAgIGNlbnRlcjogdG9wICsgKGJvdHRvbSAtIHRvcCkgLyAyXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhcmdldFByb3BzIChlbCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogMCxcbiAgICBjZW50ZXI6IGVsLm9mZnNldEhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBlbC5vZmZzZXRIZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICBtaWRkbGU6IGVsLm9mZnNldFdpZHRoIC8gMixcbiAgICByaWdodDogZWwub2Zmc2V0V2lkdGhcbiAgfVxufVxuXG4vLyBjZmc6IHsgZWwsIGFuY2hvckVsLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4sIG9mZnNldCwgYWJzb2x1dGVPZmZzZXQsIGNvdmVyLCBmaXQsIG1heEhlaWdodCwgbWF4V2lkdGggfVxuZXhwb3J0IGZ1bmN0aW9uIHNldFBvc2l0aW9uIChjZmcpIHtcbiAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDApIHtcbiAgICAvLyB1c2VzIHRoZSBxLXBvc2l0aW9uLWVuZ2luZSBDU1MgY2xhc3NcblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYm9keS5zdHlsZVxuICAgIGNvbnN0IHsgb2Zmc2V0TGVmdDogbGVmdCwgb2Zmc2V0VG9wOiB0b3AgfSA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydFxuXG4gICAgaWYgKGxlZnQgIT09IHZwTGVmdCkge1xuICAgICAgZWwuc2V0UHJvcGVydHkoJy0tcS1wZS1sZWZ0JywgbGVmdCArICdweCcpXG4gICAgICB2cExlZnQgPSBsZWZ0XG4gICAgfVxuICAgIGlmICh0b3AgIT09IHZwVG9wKSB7XG4gICAgICBlbC5zZXRQcm9wZXJ0eSgnLS1xLXBlLXRvcCcsIHRvcCArICdweCcpXG4gICAgICB2cFRvcCA9IHRvcFxuICAgIH1cbiAgfVxuXG4gIGxldCBhbmNob3JQcm9wc1xuXG4gIC8vIHNjcm9sbCBwb3NpdGlvbiBtaWdodCBjaGFuZ2VcbiAgLy8gaWYgbWF4LWhlaWdodC8td2lkdGggY2hhbmdlcywgc28gd2VcbiAgLy8gbmVlZCB0byByZXN0b3JlIGl0IGFmdGVyIHdlIGNhbGN1bGF0ZVxuICAvLyB0aGUgbmV3IHBvc2l0aW9uaW5nXG4gIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wIH0gPSBjZmcuZWxcblxuICBpZiAoY2ZnLmFic29sdXRlT2Zmc2V0ID09PSB2b2lkIDApIHtcbiAgICBhbmNob3JQcm9wcyA9IGdldEFuY2hvclByb3BzKGNmZy5hbmNob3JFbCwgY2ZnLmNvdmVyID09PSB0cnVlID8gWyAwLCAwIF0gOiBjZmcub2Zmc2V0KVxuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0XG4gICAgICB7IHRvcDogYW5jaG9yVG9wLCBsZWZ0OiBhbmNob3JMZWZ0IH0gPSBjZmcuYW5jaG9yRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB0b3AgPSBhbmNob3JUb3AgKyBjZmcuYWJzb2x1dGVPZmZzZXQudG9wLFxuICAgICAgbGVmdCA9IGFuY2hvckxlZnQgKyBjZmcuYWJzb2x1dGVPZmZzZXQubGVmdFxuXG4gICAgYW5jaG9yUHJvcHMgPSB7IHRvcCwgbGVmdCwgd2lkdGg6IDEsIGhlaWdodDogMSwgcmlnaHQ6IGxlZnQgKyAxLCBjZW50ZXI6IHRvcCwgbWlkZGxlOiBsZWZ0LCBib3R0b206IHRvcCArIDEgfVxuICB9XG5cbiAgbGV0IGVsU3R5bGUgPSB7XG4gICAgbWF4SGVpZ2h0OiBjZmcubWF4SGVpZ2h0LFxuICAgIG1heFdpZHRoOiBjZmcubWF4V2lkdGgsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnXG4gIH1cblxuICBpZiAoY2ZnLmZpdCA9PT0gdHJ1ZSB8fCBjZmcuY292ZXIgPT09IHRydWUpIHtcbiAgICBlbFN0eWxlLm1pbldpZHRoID0gYW5jaG9yUHJvcHMud2lkdGggKyAncHgnXG4gICAgaWYgKGNmZy5jb3ZlciA9PT0gdHJ1ZSkge1xuICAgICAgZWxTdHlsZS5taW5IZWlnaHQgPSBhbmNob3JQcm9wcy5oZWlnaHQgKyAncHgnXG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihjZmcuZWwuc3R5bGUsIGVsU3R5bGUpXG5cbiAgY29uc3RcbiAgICB0YXJnZXRQcm9wcyA9IGdldFRhcmdldFByb3BzKGNmZy5lbCksXG4gICAgcHJvcHMgPSB7XG4gICAgICB0b3A6IGFuY2hvclByb3BzWyBjZmcuYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gLSB0YXJnZXRQcm9wc1sgY2ZnLnNlbGZPcmlnaW4udmVydGljYWwgXSxcbiAgICAgIGxlZnQ6IGFuY2hvclByb3BzWyBjZmcuYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSAtIHRhcmdldFByb3BzWyBjZmcuc2VsZk9yaWdpbi5ob3Jpem9udGFsIF1cbiAgICB9XG5cbiAgYXBwbHlCb3VuZGFyaWVzKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGNmZy5hbmNob3JPcmlnaW4sIGNmZy5zZWxmT3JpZ2luKVxuXG4gIGVsU3R5bGUgPSB7XG4gICAgdG9wOiBwcm9wcy50b3AgKyAncHgnLFxuICAgIGxlZnQ6IHByb3BzLmxlZnQgKyAncHgnXG4gIH1cblxuICBpZiAocHJvcHMubWF4SGVpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heEhlaWdodCA9IHByb3BzLm1heEhlaWdodCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy5oZWlnaHQgPiBwcm9wcy5tYXhIZWlnaHQpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gZWxTdHlsZS5tYXhIZWlnaHRcbiAgICB9XG4gIH1cbiAgaWYgKHByb3BzLm1heFdpZHRoICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heFdpZHRoID0gcHJvcHMubWF4V2lkdGggKyAncHgnXG5cbiAgICBpZiAoYW5jaG9yUHJvcHMud2lkdGggPiBwcm9wcy5tYXhXaWR0aCkge1xuICAgICAgZWxTdHlsZS5taW5XaWR0aCA9IGVsU3R5bGUubWF4V2lkdGhcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKGNmZy5lbC5zdHlsZSwgZWxTdHlsZSlcblxuICAvLyByZXN0b3JlIHNjcm9sbCBwb3NpdGlvblxuICBpZiAoY2ZnLmVsLnNjcm9sbFRvcCAhPT0gc2Nyb2xsVG9wKSB7XG4gICAgY2ZnLmVsLnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICB9XG4gIGlmIChjZmcuZWwuc2Nyb2xsTGVmdCAhPT0gc2Nyb2xsTGVmdCkge1xuICAgIGNmZy5lbC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdFxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5Qm91bmRhcmllcyAocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKSB7XG4gIGNvbnN0XG4gICAgY3VycmVudEhlaWdodCA9IHRhcmdldFByb3BzLmJvdHRvbSxcbiAgICBjdXJyZW50V2lkdGggPSB0YXJnZXRQcm9wcy5yaWdodCxcbiAgICBtYXJnaW4gPSBnZXRTY3JvbGxiYXJXaWR0aCgpLFxuICAgIGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gbWFyZ2luLFxuICAgIGlubmVyV2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoXG5cbiAgaWYgKHByb3BzLnRvcCA8IDAgfHwgcHJvcHMudG9wICsgY3VycmVudEhlaWdodCA+IGlubmVySGVpZ2h0KSB7XG4gICAgaWYgKHNlbGZPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInKSB7XG4gICAgICBwcm9wcy50b3AgPSBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gPiBpbm5lckhlaWdodCAvIDJcbiAgICAgICAgPyBNYXRoLm1heCgwLCBpbm5lckhlaWdodCAtIGN1cnJlbnRIZWlnaHQpXG4gICAgICAgIDogMFxuICAgICAgcHJvcHMubWF4SGVpZ2h0ID0gTWF0aC5taW4oY3VycmVudEhlaWdodCwgaW5uZXJIZWlnaHQpXG4gICAgfVxuICAgIGVsc2UgaWYgKGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4udmVydGljYWwgXSA+IGlubmVySGVpZ2h0IC8gMikge1xuICAgICAgY29uc3QgYW5jaG9yWSA9IE1hdGgubWluKFxuICAgICAgICBpbm5lckhlaWdodCxcbiAgICAgICAgYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJ1xuICAgICAgICAgID8gYW5jaG9yUHJvcHMuY2VudGVyXG4gICAgICAgICAgOiAoYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSBzZWxmT3JpZ2luLnZlcnRpY2FsID8gYW5jaG9yUHJvcHMuYm90dG9tIDogYW5jaG9yUHJvcHMudG9wKVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4SGVpZ2h0ID0gTWF0aC5taW4oY3VycmVudEhlaWdodCwgYW5jaG9yWSlcbiAgICAgIHByb3BzLnRvcCA9IE1hdGgubWF4KDAsIGFuY2hvclkgLSBjdXJyZW50SGVpZ2h0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHByb3BzLnRvcCA9IE1hdGgubWF4KDAsIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcidcbiAgICAgICAgPyBhbmNob3JQcm9wcy5jZW50ZXJcbiAgICAgICAgOiAoYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSBzZWxmT3JpZ2luLnZlcnRpY2FsID8gYW5jaG9yUHJvcHMudG9wIDogYW5jaG9yUHJvcHMuYm90dG9tKVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4SGVpZ2h0ID0gTWF0aC5taW4oY3VycmVudEhlaWdodCwgaW5uZXJIZWlnaHQgLSBwcm9wcy50b3ApXG4gICAgfVxuICB9XG5cbiAgaWYgKHByb3BzLmxlZnQgPCAwIHx8IHByb3BzLmxlZnQgKyBjdXJyZW50V2lkdGggPiBpbm5lcldpZHRoKSB7XG4gICAgcHJvcHMubWF4V2lkdGggPSBNYXRoLm1pbihjdXJyZW50V2lkdGgsIGlubmVyV2lkdGgpXG4gICAgaWYgKHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA9PT0gJ21pZGRsZScpIHtcbiAgICAgIHByb3BzLmxlZnQgPSBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSA+IGlubmVyV2lkdGggLyAyXG4gICAgICAgID8gTWF0aC5tYXgoMCwgaW5uZXJXaWR0aCAtIGN1cnJlbnRXaWR0aClcbiAgICAgICAgOiAwXG4gICAgfVxuICAgIGVsc2UgaWYgKGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdID4gaW5uZXJXaWR0aCAvIDIpIHtcbiAgICAgIGNvbnN0IGFuY2hvclggPSBNYXRoLm1pbihcbiAgICAgICAgaW5uZXJXaWR0aCxcbiAgICAgICAgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnXG4gICAgICAgICAgPyBhbmNob3JQcm9wcy5taWRkbGVcbiAgICAgICAgICA6IChhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gc2VsZk9yaWdpbi5ob3Jpem9udGFsID8gYW5jaG9yUHJvcHMucmlnaHQgOiBhbmNob3JQcm9wcy5sZWZ0KVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4V2lkdGggPSBNYXRoLm1pbihjdXJyZW50V2lkdGgsIGFuY2hvclgpXG4gICAgICBwcm9wcy5sZWZ0ID0gTWF0aC5tYXgoMCwgYW5jaG9yWCAtIHByb3BzLm1heFdpZHRoKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHByb3BzLmxlZnQgPSBNYXRoLm1heCgwLCBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gJ21pZGRsZSdcbiAgICAgICAgPyBhbmNob3JQcm9wcy5taWRkbGVcbiAgICAgICAgOiAoYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09IHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA/IGFuY2hvclByb3BzLmxlZnQgOiBhbmNob3JQcm9wcy5yaWdodClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBpbm5lcldpZHRoIC0gcHJvcHMubGVmdClcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBUcmFuc2l0aW9uLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUFuY2hvciwgeyB1c2VBbmNob3JQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFuY2hvci5qcydcbmltcG9ydCB1c2VTY3JvbGxUYXJnZXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2Nyb2xsLXRhcmdldC5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VQb3J0YWwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVRyYW5zaXRpb24sIHsgdXNlVHJhbnNpdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdHJhbnNpdGlvbi5qcydcbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpY2suanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aW1lb3V0LmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGNsb3NlUG9ydGFsTWVudXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3BvcnRhbC5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IHBvc2l0aW9uLCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGFkZEVzY2FwZUtleSwgcmVtb3ZlRXNjYXBlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9lc2NhcGUta2V5LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNvdXQsIHJlbW92ZUZvY3Vzb3V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1c291dC5qcydcbmltcG9ydCB7IGNoaWxkSGFzRm9jdXMgfSBmcm9tICcuLi8uLi91dGlscy9kb20uanMnXG5pbXBvcnQgeyBhZGRDbGlja091dHNpZGUsIHJlbW92ZUNsaWNrT3V0c2lkZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY2xpY2stb3V0c2lkZS5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmltcG9ydCB7XG4gIHZhbGlkYXRlUG9zaXRpb24sIHZhbGlkYXRlT2Zmc2V0LCBzZXRQb3NpdGlvbiwgcGFyc2VQb3NpdGlvblxufSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3Bvc2l0aW9uLWVuZ2luZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FNZW51JyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQW5jaG9yUHJvcHMsXG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlVHJhbnNpdGlvblByb3BzLFxuXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBhdXRvQ2xvc2U6IEJvb2xlYW4sXG4gICAgc2VwYXJhdGVDbG9zZVBvcHVwOiBCb29sZWFuLFxuXG4gICAgbm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9SZWZvY3VzOiBCb29sZWFuLFxuICAgIG5vRm9jdXM6IEJvb2xlYW4sXG5cbiAgICBmaXQ6IEJvb2xlYW4sXG4gICAgY292ZXI6IEJvb2xlYW4sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgICBhbmNob3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgc2VsZjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU9mZnNldFxuICAgIH0sXG5cbiAgICBzY3JvbGxUYXJnZXQ6IHtcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG5cbiAgICB0b3VjaFBvc2l0aW9uOiBCb29sZWFuLFxuXG4gICAgbWF4SGVpZ2h0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBtYXhXaWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHMsXG4gICAgJ2NsaWNrJywgJ2VzY2FwZS1rZXknXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgbGV0IHJlZm9jdXNUYXJnZXQgPSBudWxsLCBhYnNvbHV0ZU9mZnNldCwgdW53YXRjaFBvc2l0aW9uLCBhdm9pZEF1dG9DbG9zZVxuXG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHkgfSA9IHZtXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLm5vUm91dGVEaXNtaXNzICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0LCByZW1vdmVUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcbiAgICBjb25zdCB7IHRyYW5zaXRpb24sIHRyYW5zaXRpb25TdHlsZSB9ID0gdXNlVHJhbnNpdGlvbihwcm9wcywgc2hvd2luZylcbiAgICBjb25zdCB7IGxvY2FsU2Nyb2xsVGFyZ2V0LCBjaGFuZ2VTY3JvbGxFdmVudCwgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgfSA9IHVzZVNjcm9sbFRhcmdldChwcm9wcywgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KVxuXG4gICAgY29uc3QgeyBhbmNob3JFbCwgY2FuU2hvdyB9ID0gdXNlQW5jaG9yKHsgc2hvd2luZyB9KVxuXG4gICAgY29uc3QgeyBoaWRlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLCBjYW5TaG93LCBoYW5kbGVTaG93LCBoYW5kbGVIaWRlLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2UsXG4gICAgICBwcm9jZXNzT25Nb3VudDogdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCB7IHNob3dQb3J0YWwsIGhpZGVQb3J0YWwsIHJlbmRlclBvcnRhbCB9ID0gdXNlUG9ydGFsKHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudClcblxuICAgIGNvbnN0IGNsaWNrT3V0c2lkZVByb3BzID0ge1xuICAgICAgYW5jaG9yRWwsXG4gICAgICBpbm5lclJlZixcbiAgICAgIG9uQ2xpY2tPdXRzaWRlIChlKSB7XG4gICAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBoaWRlKGUpXG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAvLyBhbHdheXMgcHJldmVudCB0b3VjaCBldmVudFxuICAgICAgICAgICAgZS50eXBlID09PSAndG91Y2hzdGFydCdcbiAgICAgICAgICAgIC8vIHByZXZlbnQgY2xpY2sgaWYgaXQncyBvbiBhIGRpYWxvZyBiYWNrZHJvcFxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWRpYWxvZ19fYmFja2Ryb3AnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYW5jaG9yT3JpZ2luID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHBhcnNlUG9zaXRpb24oXG4gICAgICAgIHByb3BzLmFuY2hvciB8fCAoXG4gICAgICAgICAgcHJvcHMuY292ZXIgPT09IHRydWUgPyAnY2VudGVyIG1pZGRsZScgOiAnYm90dG9tIHN0YXJ0J1xuICAgICAgICApLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHNlbGZPcmlnaW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5jb3ZlciA9PT0gdHJ1ZVxuICAgICAgICA/IGFuY2hvck9yaWdpbi52YWx1ZVxuICAgICAgICA6IHBhcnNlUG9zaXRpb24ocHJvcHMuc2VsZiB8fCAndG9wIHN0YXJ0JywgJHEubGFuZy5ydGwpXG4gICAgKSlcblxuICAgIGNvbnN0IG1lbnVDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLW1lbnUtLXNxdWFyZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1tZW51LS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmF1dG9DbG9zZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgb25DbGljazogb25BdXRvQ2xvc2UgfVxuICAgICAgICA6IHt9XG4gICAgKSlcblxuICAgIGNvbnN0IGhhbmRsZXNGb2N1cyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICApXG5cbiAgICB3YXRjaChoYW5kbGVzRm9jdXMsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIGFkZEVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgYWRkQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgcmVtb3ZlQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBpbm5lclJlZi52YWx1ZVxuXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgIT09IHRydWUpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSwgW2RhdGEtYXV0b2ZvY3VzXScpIHx8IG5vZGVcbiAgICAgICAgICBub2RlLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNob3cgKGV2dCkge1xuICAgICAgcmVtb3ZlVGljaygpXG4gICAgICByZW1vdmVUaW1lb3V0KClcblxuICAgICAgcmVmb2N1c1RhcmdldCA9IHByb3BzLm5vUmVmb2N1cyA9PT0gZmFsc2VcbiAgICAgICAgPyBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIDogbnVsbFxuXG4gICAgICBhZGRGb2N1c291dChvbkZvY3Vzb3V0KVxuXG4gICAgICBzaG93UG9ydGFsKClcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG5cbiAgICAgIGFic29sdXRlT2Zmc2V0ID0gdm9pZCAwXG5cbiAgICAgIGlmIChldnQgIT09IHZvaWQgMCAmJiAocHJvcHMudG91Y2hQb3NpdGlvbiB8fCBwcm9wcy5jb250ZXh0TWVudSkpIHtcbiAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb24oZXZ0KVxuXG4gICAgICAgIGlmIChwb3MubGVmdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IGFuY2hvckVsLnZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgYWJzb2x1dGVPZmZzZXQgPSB7IGxlZnQ6IHBvcy5sZWZ0IC0gbGVmdCwgdG9wOiBwb3MudG9wIC0gdG9wIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodW53YXRjaFBvc2l0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uID0gd2F0Y2goXG4gICAgICAgICAgKCkgPT4gJHEuc2NyZWVuLndpZHRoICsgJ3wnICsgJHEuc2NyZWVuLmhlaWdodCArICd8JyArIHByb3BzLnNlbGYgKyAnfCcgKyBwcm9wcy5hbmNob3IgKyAnfCcgKyAkcS5sYW5nLnJ0bCxcbiAgICAgICAgICB1cGRhdGVQb3NpdGlvblxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5ub0ZvY3VzICE9PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gICAgICB9XG5cbiAgICAgIHJlZ2lzdGVyVGljaygoKSA9PiB7XG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKClcbiAgICAgICAgcHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZSAmJiBmb2N1cygpXG4gICAgICB9KVxuXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyByZXF1aXJlZCBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJkb3VibGUtdGFwIG5lZWRlZFwiIGlzc3VlXG4gICAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBpZiBhdXRvLWNsb3NlLCB0aGVuIHRoaXMgY2xpY2sgc2hvdWxkXG4gICAgICAgICAgLy8gbm90IGNsb3NlIHRoZSBtZW51XG4gICAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSBwcm9wcy5hdXRvQ2xvc2VcbiAgICAgICAgICBpbm5lclJlZi52YWx1ZS5jbGljaygpXG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAgICAgIHNob3dQb3J0YWwodHJ1ZSkgLy8gZG9uZSBzaG93aW5nIHBvcnRhbFxuICAgICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCkge1xuICAgICAgcmVtb3ZlVGljaygpXG4gICAgICByZW1vdmVUaW1lb3V0KClcbiAgICAgIGhpZGVQb3J0YWwoKVxuXG4gICAgICBhbmNob3JDbGVhbnVwKHRydWUpXG5cbiAgICAgIGlmIChcbiAgICAgICAgcmVmb2N1c1RhcmdldCAhPT0gbnVsbFxuICAgICAgICAmJiAoXG4gICAgICAgICAgLy8gbWVudSB3YXMgaGlkZGVuIGZyb20gY29kZSBvciBFU0MgcGx1Z2luXG4gICAgICAgICAgZXZ0ID09PSB2b2lkIDBcbiAgICAgICAgICAvLyBtZW51IHdhcyBub3QgY2xvc2VkIGZyb20gYSBtb3VzZSBvciB0b3VjaCBjbGlja091dHNpZGVcbiAgICAgICAgICB8fCBldnQucUNsaWNrT3V0c2lkZSAhPT0gdHJ1ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgcmVmb2N1c1RhcmdldC5mb2N1cygpXG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGhpZGVQb3J0YWwodHJ1ZSkgLy8gZG9uZSBoaWRpbmcsIG5vdyBkZXN0cm95XG4gICAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5jaG9yQ2xlYW51cCAoaGlkaW5nKSB7XG4gICAgICBhYnNvbHV0ZU9mZnNldCA9IHZvaWQgMFxuXG4gICAgICBpZiAodW53YXRjaFBvc2l0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uKClcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uID0gdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgPT09IHRydWUgfHwgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3Vzb3V0KVxuICAgICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgICAgcmVtb3ZlRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChhbmNob3JFbC52YWx1ZSAhPT0gbnVsbCB8fCBwcm9wcy5zY3JvbGxUYXJnZXQgIT09IHZvaWQgMCkge1xuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSA9IGdldFNjcm9sbFRhcmdldChhbmNob3JFbC52YWx1ZSwgcHJvcHMuc2Nyb2xsVGFyZ2V0KVxuICAgICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSwgdXBkYXRlUG9zaXRpb24pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BdXRvQ2xvc2UgKGUpIHtcbiAgICAgIC8vIGlmIGF1dG8tY2xvc2UsIHRoZW4gdGhlIGlvcyBkb3VibGUtdGFwIGZpeCB3aGljaFxuICAgICAgLy8gaXNzdWVzIGEgY2xpY2sgc2hvdWxkIG5vdCBjbG9zZSB0aGUgbWVudVxuICAgICAgaWYgKGF2b2lkQXV0b0Nsb3NlICE9PSB0cnVlKSB7XG4gICAgICAgIGNsb3NlUG9ydGFsTWVudXMocHJveHksIGUpXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c291dCAoZXZ0KSB7XG4gICAgICAvLyB0aGUgZm9jdXMgaXMgbm90IGluIGEgdnVlIGNoaWxkIGNvbXBvbmVudFxuICAgICAgaWYgKFxuICAgICAgICBoYW5kbGVzRm9jdXMudmFsdWUgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZVxuICAgICAgICAmJiBjaGlsZEhhc0ZvY3VzKGlubmVyUmVmLnZhbHVlLCBldnQudGFyZ2V0KSAhPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIGZvY3VzKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVzY2FwZUtleSAoZXZ0KSB7XG4gICAgICBlbWl0KCdlc2NhcGUta2V5JylcbiAgICAgIGhpZGUoZXZ0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgIGNvbnN0IGVsID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgaWYgKGVsID09PSBudWxsIHx8IGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBzZXRQb3NpdGlvbih7XG4gICAgICAgIGVsLFxuICAgICAgICBvZmZzZXQ6IHByb3BzLm9mZnNldCxcbiAgICAgICAgYW5jaG9yRWw6IGFuY2hvckVsLnZhbHVlLFxuICAgICAgICBhbmNob3JPcmlnaW46IGFuY2hvck9yaWdpbi52YWx1ZSxcbiAgICAgICAgc2VsZk9yaWdpbjogc2VsZk9yaWdpbi52YWx1ZSxcbiAgICAgICAgYWJzb2x1dGVPZmZzZXQsXG4gICAgICAgIGZpdDogcHJvcHMuZml0LFxuICAgICAgICBjb3ZlcjogcHJvcHMuY292ZXIsXG4gICAgICAgIG1heEhlaWdodDogcHJvcHMubWF4SGVpZ2h0LFxuICAgICAgICBtYXhXaWR0aDogcHJvcHMubWF4V2lkdGhcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydGFsQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gaChcbiAgICAgICAgVHJhbnNpdGlvbixcbiAgICAgICAgeyBuYW1lOiB0cmFuc2l0aW9uLnZhbHVlLCBhcHBlYXI6IHRydWUgfSxcbiAgICAgICAgKCkgPT4gKFxuICAgICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICAgICAgcmVmOiBpbm5lclJlZixcbiAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgICAgICdxLW1lbnUgcS1wb3NpdGlvbi1lbmdpbmUgc2Nyb2xsJyArIG1lbnVDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogW1xuICAgICAgICAgICAgICAgIGF0dHJzLnN0eWxlLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25TdHlsZS52YWx1ZVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAuLi5vbkV2ZW50cy52YWx1ZVxuICAgICAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudChhbmNob3JDbGVhbnVwKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBmb2N1cywgdXBkYXRlUG9zaXRpb24gfSlcblxuICAgIHJldHVybiByZW5kZXJQb3J0YWxcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUUJ0biBmcm9tICcuLi9idG4vUUJ0bi5qcydcbmltcG9ydCBRQnRuR3JvdXAgZnJvbSAnLi4vYnRuLWdyb3VwL1FCdG5Hcm91cC5qcydcbmltcG9ydCBRTWVudSBmcm9tICcuLi9tZW51L1FNZW51LmpzJ1xuXG5pbXBvcnQgeyB1c2VCdG5Qcm9wcyB9IGZyb20gJy4uL2J0bi91c2UtYnRuLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQnRuRHJvcGRvd24nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQnRuUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiBCb29sZWFuLFxuICAgIHNwbGl0OiBCb29sZWFuLFxuICAgIGRyb3Bkb3duSWNvbjogU3RyaW5nLFxuXG4gICAgY29udGVudENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGNvbnRlbnRTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcblxuICAgIGNvdmVyOiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgbm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG4gICAgYXV0b0Nsb3NlOiBCb29sZWFuLFxuXG4gICAgbWVudUFuY2hvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2JvdHRvbSBlbmQnXG4gICAgfSxcbiAgICBtZW51U2VsZjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RvcCBlbmQnXG4gICAgfSxcbiAgICBtZW51T2Zmc2V0OiBBcnJheSxcblxuICAgIGRpc2FibGVNYWluQnRuOiBCb29sZWFuLFxuICAgIGRpc2FibGVEcm9wZG93bjogQm9vbGVhbixcblxuICAgIG5vSWNvbkFuaW1hdGlvbjogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdjbGljaycsICdiZWZvcmUtc2hvdycsICdzaG93JywgJ2JlZm9yZS1oaWRlJywgJ2hpZGUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihwcm9wcy5tb2RlbFZhbHVlKVxuICAgIGNvbnN0IG1lbnVSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7XG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgICB8fCAoXG4gICAgICAgICAgKHByb3BzLnNwbGl0ID09PSBmYWxzZSAmJiBwcm9wcy5kaXNhYmxlTWFpbkJ0biA9PT0gdHJ1ZSlcbiAgICAgICAgICB8fCBwcm9wcy5kaXNhYmxlRHJvcGRvd24gPT09IHRydWVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0pXG5cbiAgICBjb25zdCBpY29uQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYnRuLWRyb3Bkb3duX19hcnJvdydcbiAgICAgICsgKHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9JY29uQW5pbWF0aW9uID09PSBmYWxzZSA/ICcgcm90YXRlLTE4MCcgOiAnJylcbiAgICAgICsgKHByb3BzLnNwbGl0ID09PSBmYWxzZSA/ICcgcS1idG4tZHJvcGRvd25fX2Fycm93LWNvbnRhaW5lcicgOiAnJylcbiAgICApXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCB2YWwgPT4ge1xuICAgICAgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCAmJiBtZW51UmVmLnZhbHVlWyB2YWwgPyAnc2hvdycgOiAnaGlkZScgXSgpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNwbGl0LCBoaWRlKVxuXG4gICAgZnVuY3Rpb24gb25CZWZvcmVTaG93IChlKSB7XG4gICAgICBzaG93aW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgZW1pdCgnYmVmb3JlLXNob3cnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2hvdyAoZSkge1xuICAgICAgZW1pdCgnc2hvdycsIGUpXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CZWZvcmVIaWRlIChlKSB7XG4gICAgICBzaG93aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIGVtaXQoJ2JlZm9yZS1oaWRlJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkhpZGUgKGUpIHtcbiAgICAgIGVtaXQoJ2hpZGUnLCBlKVxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbGlja0hpZGUgKGUpIHtcbiAgICAgIHN0b3AoZSlcbiAgICAgIGhpZGUoKVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZSAoZXZ0KSB7XG4gICAgICBtZW51UmVmLnZhbHVlICE9PSBudWxsICYmIG1lbnVSZWYudmFsdWUudG9nZ2xlKGV2dClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93IChldnQpIHtcbiAgICAgIG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZS5zaG93KGV2dClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRlIChldnQpIHtcbiAgICAgIG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZS5oaWRlKGV2dClcbiAgICB9XG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBzaG93LCBoaWRlLCB0b2dnbGVcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgc2hvdygpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBBcnJvdyA9IFtcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiBpY29uQ2xhc3MudmFsdWUsXG4gICAgICAgICAgbmFtZTogcHJvcHMuZHJvcGRvd25JY29uIHx8IHByb3h5LiRxLmljb25TZXQuYXJyb3cuZHJvcGRvd25cbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgcHJvcHMuZGlzYWJsZURyb3Bkb3duICE9PSB0cnVlICYmIEFycm93LnB1c2goXG4gICAgICAgIGgoUU1lbnUsIHtcbiAgICAgICAgICByZWY6IG1lbnVSZWYsXG4gICAgICAgICAgY2xhc3M6IHByb3BzLmNvbnRlbnRDbGFzcyxcbiAgICAgICAgICBzdHlsZTogcHJvcHMuY29udGVudFN0eWxlLFxuICAgICAgICAgIGNvdmVyOiBwcm9wcy5jb3ZlcixcbiAgICAgICAgICBmaXQ6IHRydWUsXG4gICAgICAgICAgcGVyc2lzdGVudDogcHJvcHMucGVyc2lzdGVudCxcbiAgICAgICAgICBub1JvdXRlRGlzbWlzczogcHJvcHMubm9Sb3V0ZURpc21pc3MsXG4gICAgICAgICAgYXV0b0Nsb3NlOiBwcm9wcy5hdXRvQ2xvc2UsXG4gICAgICAgICAgYW5jaG9yOiBwcm9wcy5tZW51QW5jaG9yLFxuICAgICAgICAgIHNlbGY6IHByb3BzLm1lbnVTZWxmLFxuICAgICAgICAgIG9mZnNldDogcHJvcHMubWVudU9mZnNldCxcbiAgICAgICAgICBzZXBhcmF0ZUNsb3NlUG9wdXA6IHRydWUsXG4gICAgICAgICAgb25CZWZvcmVTaG93LFxuICAgICAgICAgIG9uU2hvdyxcbiAgICAgICAgICBvbkJlZm9yZUhpZGUsXG4gICAgICAgICAgb25IaWRlXG4gICAgICAgIH0sIHNsb3RzLmRlZmF1bHQpXG4gICAgICApXG5cbiAgICAgIGlmIChwcm9wcy5zcGxpdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGgoUUJ0biwge1xuICAgICAgICAgIGNsYXNzOiAncS1idG4tZHJvcGRvd24gcS1idG4tZHJvcGRvd24tLXNpbXBsZScsXG4gICAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5kaXNhYmxlTWFpbkJ0biA9PT0gdHJ1ZSxcbiAgICAgICAgICBub1dyYXA6IHRydWUsXG4gICAgICAgICAgcm91bmQ6IGZhbHNlLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgb25DbGlja1xuICAgICAgICB9LCAoKSA9PiBoU2xvdChzbG90cy5sYWJlbCwgW10pLmNvbmNhdChBcnJvdykpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFFCdG5Hcm91cCwge1xuICAgICAgICBjbGFzczogJ3EtYnRuLWRyb3Bkb3duIHEtYnRuLWRyb3Bkb3duLS1zcGxpdCBuby13cmFwIHEtYnRuLWl0ZW0nLFxuICAgICAgICBvdXRsaW5lOiBwcm9wcy5vdXRsaW5lLFxuICAgICAgICBmbGF0OiBwcm9wcy5mbGF0LFxuICAgICAgICByb3VuZGVkOiBwcm9wcy5yb3VuZGVkLFxuICAgICAgICBzcXVhcmU6IHByb3BzLnNxdWFyZSxcbiAgICAgICAgcHVzaDogcHJvcHMucHVzaCxcbiAgICAgICAgdW5lbGV2YXRlZDogcHJvcHMudW5lbGV2YXRlZCxcbiAgICAgICAgZ2xvc3N5OiBwcm9wcy5nbG9zc3ksXG4gICAgICAgIHN0cmV0Y2g6IHByb3BzLnN0cmV0Y2hcbiAgICAgIH0sICgpID0+IFtcbiAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWJ0bi1kcm9wZG93bi0tY3VycmVudCcsXG4gICAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5kaXNhYmxlTWFpbkJ0biA9PT0gdHJ1ZSxcbiAgICAgICAgICBub1dyYXA6IHRydWUsXG4gICAgICAgICAgaWNvblJpZ2h0OiBwcm9wcy5pY29uUmlnaHQsXG4gICAgICAgICAgcm91bmQ6IGZhbHNlLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2tIaWRlXG4gICAgICAgIH0sIHNsb3RzLmxhYmVsKSxcblxuICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICBjbGFzczogJ3EtYnRuLWRyb3Bkb3duX19hcnJvdy1jb250YWluZXIgcS1hbmNob3ItLXNraXAnLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5kaXNhYmxlRHJvcGRvd24gPT09IHRydWUsXG4gICAgICAgICAgb3V0bGluZTogcHJvcHMub3V0bGluZSxcbiAgICAgICAgICBmbGF0OiBwcm9wcy5mbGF0LFxuICAgICAgICAgIHJvdW5kZWQ6IHByb3BzLnJvdW5kZWQsXG4gICAgICAgICAgcHVzaDogcHJvcHMucHVzaCxcbiAgICAgICAgICBzaXplOiBwcm9wcy5zaXplLFxuICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICB0ZXh0Q29sb3I6IHByb3BzLnRleHRDb2xvcixcbiAgICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgICAgcmlwcGxlOiBwcm9wcy5yaXBwbGVcbiAgICAgICAgfSwgKCkgPT4gQXJyb3cpXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuLWRyb3Bkb3duXG4gICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICBuby1jYXBzXG4gICAgOnJpcHBsZT1cIiFsaW5rXCJcbiAgICA6Y2xhc3M9XCJ7ICduby1mb2N1cyc6IGxpbmssICdiYXNlLWJ0bi1kcm9wZG93bic6IHRydWUgfVwiXG4gICAgOmZsYXQ9XCJsaW5rXCJcbiAgICA6ZGVuc2U9XCJsaW5rXCJcbiAgICBzaXplPVwiMTNweFwiXG4gID5cbiAgICA8c2xvdD48L3Nsb3Q+XG4gIDwvcS1idG4tZHJvcGRvd24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGxpbms6IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Fzc1wiPlxuLmJhc2UtYnRuLWRyb3Bkb3duIC5xLWljb24sIC5iYXNlLWJ0bi1kcm9wZG93biAucS1zcGlubmVyXG4gIGZvbnQtc2l6ZTogMS4yNWVtXG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjbG9zZVBvcnRhbHMsIGdldFBvcnRhbFZtIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9wb3J0YWwuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcbmltcG9ydCBnZXRTU1JQcm9wcyBmcm9tICcuLi91dGlscy9wcml2YXRlL25vb3Atc3NyLWRpcmVjdGl2ZS10cmFuc2Zvcm0uanMnXG5cbi8qXG4gKiBkZXB0aFxuICogICA8IDAgIC0tPiBjbG9zZSBhbGwgY2hhaW5cbiAqICAgMCAgICAtLT4gZGlzYWJsZWRcbiAqICAgPiAwICAtLT4gY2xvc2UgY2hhaW4gdXAgdG8gTiBwYXJlbnRcbiAqL1xuXG5mdW5jdGlvbiBnZXREZXB0aCAodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgY29uc3QgZGVwdGggPSBwYXJzZUludCh2YWx1ZSwgMTApXG4gIHJldHVybiBpc05hTihkZXB0aCkgPyAwIDogZGVwdGhcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGlyZWN0aXZlKF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IHsgbmFtZTogJ2Nsb3NlLXBvcHVwJywgZ2V0U1NSUHJvcHMgfVxuICA6IHtcbiAgICAgIG5hbWU6ICdjbG9zZS1wb3B1cCcsXG5cbiAgICAgIGJlZm9yZU1vdW50IChlbCwgeyB2YWx1ZSB9KSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICBkZXB0aDogZ2V0RGVwdGgodmFsdWUpLFxuXG4gICAgICAgICAgaGFuZGxlciAoZXZ0KSB7XG4gICAgICAgICAgICAvLyBhbGxvdyBAY2xpY2sgdG8gYmUgZW1pdHRlZFxuICAgICAgICAgICAgY3R4LmRlcHRoICE9PSAwICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2bSA9IGdldFBvcnRhbFZtKGVsKVxuICAgICAgICAgICAgICBpZiAodm0gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIGNsb3NlUG9ydGFscyh2bSwgZXZ0LCBjdHguZGVwdGgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGhhbmRsZXJLZXkgKGV2dCkge1xuICAgICAgICAgICAgaXNLZXlDb2RlKGV2dCwgMTMpID09PSB0cnVlICYmIGN0eC5oYW5kbGVyKGV2dClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbC5fX3FjbG9zZXBvcHVwID0gY3R4XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguaGFuZGxlcilcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjdHguaGFuZGxlcktleSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZWQgKGVsLCB7IHZhbHVlLCBvbGRWYWx1ZSB9KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICBlbC5fX3FjbG9zZXBvcHVwLmRlcHRoID0gZ2V0RGVwdGgodmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZVVubW91bnQgKGVsKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcWNsb3NlcG9wdXBcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguaGFuZGxlcilcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjdHguaGFuZGxlcktleSlcbiAgICAgICAgZGVsZXRlIGVsLl9fcWNsb3NlcG9wdXBcbiAgICAgIH1cbiAgICB9XG4pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZ1xuICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gICAgY2xhc3M9XCJiYXNlLWRpYWxvZ1wiXG4gICAgcmVmPVwiZGlhbG9nXCJcbiAgICBAaGlkZT1cIm9uRGlhbG9nSGlkZVwiXG4gID5cbiAgICA8cS1jYXJkIDpzdHlsZT1cImNvbnRlbnRTdHlsZVwiIHYtYmluZDpjbGFzcz1cImNvbnRlbnRDbGFzc1wiPlxuICAgICAgPHNsb3Q+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiIWhpZGVIZWFkZXJcIj5cbiAgICAgICAgICA8c2xvdCBuYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICA8cS10b29sYmFyIHN0eWxlPVwicGFkZGluZzogMCAyN3B4OyBtaW4taGVpZ2h0OiA2MHB4XCIgY2xhc3M9XCJiZy10cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICA8cS10b29sYmFyLXRpdGxlIGNsYXNzPVwidGV4dC1oNiB0ZXh0LXdlaWdodC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgICAgICAgICA8L3EtdG9vbGJhci10aXRsZT5cbiAgICAgICAgICAgICAgPHEtYnRuIGZsYXQgc2l6ZT1cIjExcHhcIiByb3VuZCBkZW5zZSBpY29uPVwiZmFsIGZhLXRpbWVzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICAgICAgPC9xLXRvb2xiYXI+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3Igdi1zaG93PVwidXNlU2VwYXJhdG9yXCIgLz5cbiAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiA6c3R5bGU9XCJib2R5U3R5bGVcIiB2LWJpbmQ6Y2xhc3M9XCJib2R5Q2xhc3NcIj5cbiAgICAgICAgICA8c2xvdCBuYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtcHkteGxcIj5CYXNlIGRpYWxvZyBib2R5IGNvbnRlbnQuPC9kaXY+XG4gICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIiFoaWRlRm9vdGVyXCI+XG4gICAgICAgICAgPHEtc2VwYXJhdG9yIHYtc2hvdz1cInVzZVNlcGFyYXRvclwiIC8+XG4gICAgICAgICAgPHNsb3QgbmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgICA8cS1idG4gbm8tY2FwcyBsYWJlbD1cIkRvbmVcIiBjb2xvcj1cInByaW1hcnlcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDxzbG90IG5hbWU9XCJsb2FkaW5nXCI+PC9zbG90PlxuICAgICAgPC9zbG90PlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICB0aXRsZToge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ0Jhc2UgZGlhbG9nIHRpdGxlJyxcbiAgICB9LFxuICAgIGNvbnRlbnRTdHlsZToge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW1N0cmluZywgT2JqZWN0XSxcbiAgICAgIGRlZmF1bHQ6ICd3aWR0aDogODAwcHg7IG1heC13aWR0aDogOTV2dycsXG4gICAgfSxcbiAgICBib2R5U3R5bGU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgICBkZWZhdWx0OiAnbWF4LWhlaWdodDogNjB2aCcsXG4gICAgfSxcbiAgICBib2R5Q2xhc3M6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmddLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgIH0sXG4gICAgY29udGVudENsYXNzOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIGhpZGVGb290ZXI6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgaGlkZUhlYWRlcjoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW0Jvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICB1c2VTZXBhcmF0b3I6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGVtaXRzOiBbJ29rJywgJ2hpZGUnXSxcbiAgbWV0aG9kczoge1xuICAgIHNob3coKSB7XG4gICAgICAvLyBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9iYXNlLWRpYWxvZzptZXRob2RzLnNob3coKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRyZWZzLmRpYWxvZy5zaG93KCk7XG4gICAgfSxcbiAgICBoaWRlKCkge1xuICAgICAgLy8gY29uc29sZS5mdW5jKCdjb21wb25lbnRzL2Jhc2UvYmFzZS1kaWFsb2c6bWV0aG9kcy5jbG9zZSgpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuJHJlZnMuZGlhbG9nLmhpZGUoKTtcbiAgICB9LFxuICAgIG9uRGlhbG9nSGlkZSgpIHtcbiAgICAgIC8vIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL2Jhc2UtZGlhbG9nOm1ldGhvZHMub25EaWFsb2dIaWRlKCknLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kZW1pdCgnaGlkZScpO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWZvcm0gY2xhc3M9XCJiYXNlLWZvcm1cIiByZWY9XCJiYXNlRm9ybVwiPlxuICAgIDxxLWNhcmRcbiAgICAgIGZsYXRcbiAgICAgIDpzcXVhcmU9XCJzcXVhcmVcIlxuICAgICAgOmJvcmRlcmVkPVwiYm9yZGVyZWRcIlxuICAgICAgOmNsYXNzPVwiYGJnLXRyYW5zcGFyZW50ICR7Y29udGVudENsYXNzfWBcIlxuICAgID5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGEtbm9uZSBmb3JtLWJvZHlcIj5cbiAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cImZvcm0tYWN0aW9ucyBxLXBhLW5vbmUgcS1tdC1tZFwiPlxuICAgICAgICA8c2xvdCBuYW1lPVwiYWN0aW9uc1wiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgdi1pZj1cInJlc2V0YWJsZSAmJiAhc3VibWl0ZWRcIlxuICAgICAgICAgICAgQGNsaWNrPVwib25SZXNldFwiXG4gICAgICAgICAgICBsYWJlbD1cIlJlc2V0XCJcbiAgICAgICAgICAgIGNvbG9yPVwiZ3JleVwiXG4gICAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICA6ZGlzYWJsZT1cInN1Ym1pdGVkXCJcbiAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgIHYtaWY9XCJjYW5jZWxhYmxlXCJcbiAgICAgICAgICAgIEBjbGljaz1cIm9uQ2FuY2VsXCJcbiAgICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgICAgY2xhc3M9XCJxLW1yLXNtXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgOmRpc2FibGU9XCJkaXNhYmxlXCJcbiAgICAgICAgICAgIDpsb2FkaW5nPVwic3VibWl0ZWRcIlxuICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgdi1zaG93PVwic3VibWl0XCJcbiAgICAgICAgICAgIGxhYmVsPVwiU2F2ZVwiXG4gICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9zbG90PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWZvcm0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIHN1Ym1pdGVkOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICByZXNldGFibGU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIGRpc2FibGU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIGNhbmNlbGFibGU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAgc3F1YXJlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICBib3JkZXJlZDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgc3VibWl0OiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIGNvbnRlbnRDbGFzczoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogKCkgPT4gXCJcIixcbiAgICB9LFxuICB9LFxuICBlbWl0czogW1wiY2FuY2VsXCIsIFwicmVzZXRcIl0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNhbmNlbCgpIHtcbiAgICAgIGNvbnNvbGUuZnVuYyhcImNvbXBvbmVudHMvYmFzZS9iYXNlLWZvcm06bWV0aG9kcy5vbkNhbmNlbCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KFwiY2FuY2VsXCIpO1xuICAgIH0sXG4gICAgb25SZXNldCgpIHtcbiAgICAgIGNvbnNvbGUuZnVuYyhcImNvbXBvbmVudHMvYmFzZS9iYXNlLWZvcm06bWV0aG9kcy5vblJlc2V0KClcIiwgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuJGNvcmVcbiAgICAgICAgLmNvbmZpcm0oXG4gICAgICAgICAgXCJJZiB5b3UgZGlzY2FyZCBjaGFuZ2VzLCB5b3XigJlsbCBkZWxldGUgYW55IGVkaXRzIHlvdSBtYWRlIHNpbmNlIHlvdSBsYXN0IHNhdmVkLlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRpc2NhcmQgYWxsIHVuc2F2ZWQgY2hhbmdlcz9cIixcbiAgICAgICAgICAgIG9rOiBcIkRpc2NhcmQgY2hhbmdlc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIkNvbnRpbnVlIGVkaXRpbmdcIixcbiAgICAgICAgICAgIG9rQ29sb3I6IFwibmVnYXRpdmVcIixcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdChcImFwcC9zZXREaXJ0XCIsIGZhbHNlKTtcbiAgICAgICAgICB0aGlzLiRlbWl0KFwicmVzZXRcIik7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYWRkSGFuZGxlcigpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZm9ybTpkaXNjYXJkXCIsIHRoaXMub25EaXNjYXJkKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZm9ybTpzYXZlXCIsIHRoaXMub25TYXZlKTtcbiAgICB9LFxuICAgIHJlbW92ZUhhbmRsZXIoKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvcm06ZGlzY2FyZFwiLCB0aGlzLm9uRGlzY2FyZCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvcm06c2F2ZVwiLCB0aGlzLm9uU2F2ZSk7XG4gICAgfSxcbiAgICBvbkRpc2NhcmQoKSB7XG4gICAgICBjb25zb2xlLmZ1bmMoXCJjb21wb25lbnRzL2Jhc2UvYmFzZS1mb3JtOm1ldGhvZHMub25EaXNjYXJkKClcIiwgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMub25SZXNldCgpO1xuICAgIH0sXG4gICAgb25TYXZlKCkge1xuICAgICAgY29uc29sZS5mdW5jKFwiY29tcG9uZW50cy9iYXNlL2Jhc2UtZm9ybTptZXRob2RzLm9uU2F2ZSgpXCIsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRyZWZzLmJhc2VGb3JtLnN1Ym1pdCgpO1xuICAgIH0sXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgcmVzZXRhYmxlKHZhbCkge1xuICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KFwiYXBwL3NldERpcnRcIiwgdmFsKTtcbiAgICB9LFxuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIHRoaXMuYWRkSGFuZGxlcigpO1xuICB9LFxuICBiZWZvcmVVbm1vdW50KCkge1xuICAgIHRoaXMucmVtb3ZlSGFuZGxlcigpO1xuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJhbm5lcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBpbmxpbmVBY3Rpb25zOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYmFubmVyIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1iYW5uZXItLWRlbnNlJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWJhbm5lci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyByb3VuZGVkLWJvcmRlcnMnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgYWN0aW9uQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYmFubmVyX19hY3Rpb25zIHJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQnXG4gICAgICArIGAgY29sLSR7IHByb3BzLmlubGluZUFjdGlvbnMgPT09IHRydWUgPyAnYXV0bycgOiAnYWxsJyB9YFxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1iYW5uZXJfX2F2YXRhciBjb2wtYXV0byByb3cgaXRlbXMtY2VudGVyIHNlbGYtc3RhcnQnXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmF2YXRhcikpLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYmFubmVyX19jb250ZW50IGNvbCB0ZXh0LWJvZHkyJ1xuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgIF1cblxuICAgICAgY29uc3QgYWN0aW9ucyA9IGhTbG90KHNsb3RzLmFjdGlvbilcbiAgICAgIGFjdGlvbnMgIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBhY3Rpb25DbGFzcy52YWx1ZSB9LCBhY3Rpb25zKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgICAgICAgICsgKHByb3BzLmlubGluZUFjdGlvbnMgPT09IGZhbHNlICYmIGFjdGlvbnMgIT09IHZvaWQgMCA/ICcgcS1iYW5uZXItLXRvcC1wYWRkaW5nJyA6ICcnKSxcbiAgICAgICAgcm9sZTogJ2FsZXJ0J1xuICAgICAgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8cS1pbnB1dFxuICAgIDpkZW5zZT1cImRlbnNlXCJcbiAgICA6YmctY29sb3I9XCJiZ0NvbG9yXCJcbiAgICA6b3V0bGluZWQ9XCJvdXRsaW5lZFwiXG4gICAgOm1vZGVsVmFsdWU9XCJtb2RlbFZhbHVlXCJcbiAgICA6dHlwZT1cInR5cGVcIlxuICAgIDpsYWJlbD1cImxhYmVsXCJcbiAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwib25DaGFuZ2VcIlxuICAvPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiB7fSxcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBiZ0NvbG9yOiBTdHJpbmcsXG4gICAgZGVuc2U6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlLFxuICAgIH0sXG4gICAgb3V0bGluZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNoYW5nZSh2YWx1ZSkge1xuICAgICAgY29uc29sZS5mdW5jKFwiY29tcG9uZW50cy9iYXNlL0Jhc2VJbnB1dDptZXRob2RzLm9uQ2hhbmdlXCIsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KFwidXBkYXRlOm1vZGVsLXZhbHVlXCIsIHZhbHVlKTtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1pdGVtXG4gICAgY2xpY2thYmxlXG4gICAgdi1jbG9zZS1wb3B1cFxuICAgIDpjbGFzcz1cIntcbiAgICAgICdiYXNlLWl0ZW0gdGV4dC13ZWlnaHQtbWVkaXVtIHJvdW5kZWQtYm9yZGVycyc6IHRydWUsXG4gICAgICBsaW5rOiBsaW5rLFxuICAgIH1cIlxuICA+XG4gICAgPHNsb3Q+XG4gICAgICA8cS1pdGVtLXNlY3Rpb24gdi1pZj1cImljb25cIiBzdHlsZT1cIm1pbi13aWR0aDogYXV0b1wiIGF2YXRhcj5cbiAgICAgICAgPHEtaWNvbiA6Y29sb3I9XCJpY29uQ29sb3JcIiBzaXplPVwiMThweFwiIDpuYW1lPVwiaWNvblwiIC8+XG4gICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgPHEtaXRlbS1zZWN0aW9uPnt7IGxhYmVsIH19PC9xLWl0ZW0tc2VjdGlvbj5cbiAgICA8L3Nsb3Q+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGljb246IFN0cmluZyxcbiAgICBpY29uQ29sb3I6IFN0cmluZyxcbiAgICBsaW5rOiBCb29sZWFuLFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiYmFzZS1sYWJlbCBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxhYmVsXCI+XG4gICAgICA8c2xvdD57eyB0aXRsZSB9fTwvc2xvdD5cbiAgICAgIDxzcGFuIHYtaWY9XCJyZXF1aXJlZFwiIGNsYXNzPVwicS1tbC14c1wiPio8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiBCb29sZWFuLFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1jYXJkXG4gICAgOmRhcms9XCJkYXJrXCJcbiAgICA6c3F1YXJlPVwic3F1YXJlXCJcbiAgICA6ZmxhdD1cImZsYXRcIlxuICAgIDpib3JkZXJlZD1cImJvcmRlcmVkXCJcbiAgICB2LWJpbmQ6Y2xhc3M9XCJgJHtjb250ZW50Q2xhc3N9YFwiXG4gID5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBiLXhzXCIgdi1pZj1cImhhc1RvcFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZsZXhcIj5cbiAgICAgICAgPGRpdiB2LWlmPVwidGl0bGVcIiBjbGFzcz1cInRleHQtaDZcIj57eyB0aXRsZSB9fTwvZGl2PlxuICAgICAgICA8cS1zcGFjZSAvPlxuICAgICAgICA8c2xvdCBuYW1lPVwiYWN0aW9uXCI+PC9zbG90PlxuICAgICAgPC9kaXY+XG4gICAgICA8cS1pdGVtLWxhYmVsIHYtaWY9XCJkZXNjcmlwdGlvblwiPnt7IGRlc2NyaXB0aW9uIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24gdi1iaW5kOmNsYXNzPVwiZ2V0Qm9keUNsYXNzXCI+XG4gICAgICA8dGVtcGxhdGUgdi1pZj1cIiFub1Jvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1sZ1wiPlxuICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwiaGFzQm90dG9tXCI+XG4gICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHNsb3QgbmFtZT1cImJvdHRvbVwiPjwvc2xvdD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGRhcms6IEJvb2xlYW4sXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgaGFzQm90dG9tOiBCb29sZWFuLFxuICAgIGNvbnRlbnRDbGFzczoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogXCJiYXNlLXNlY3Rpb25cIixcbiAgICB9LFxuICAgIGJvZHlDbGFzczogU3RyaW5nLFxuICAgIHRpdGxlOiBTdHJpbmcsXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyxcbiAgICBub1JvdzogQm9vbGVhbixcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBoYXNUb3AoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aXRsZSA/IHRydWUgOiB0aGlzLmRlc2NyaXB0aW9uID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0sXG4gICAgZ2V0Qm9keUNsYXNzKCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMuYm9keUNsYXNzfSAke3RoaXMuaGFzVG9wID8gXCJxLXB0LW5vbmVcIiA6IFwiXCJ9YDtcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWVsZC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRmllbGQnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHVzZUZpZWxkUHJvcHMsXG5cbiAgZW1pdHM6IHVzZUZpZWxkRW1pdHMsXG5cbiAgc2V0dXAgKCkge1xuICAgIHJldHVybiB1c2VGaWVsZCh1c2VGaWVsZFN0YXRlKCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL1JpcHBsZS5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHksIGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFNpemVzID0ge1xuICB4czogOCxcbiAgc206IDEwLFxuICBtZDogMTQsXG4gIGxnOiAyMCxcbiAgeGw6IDI0XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQ2hpcCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlU2l6ZVByb3BzLFxuXG4gICAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgICBpY29uOiBTdHJpbmcsXG4gICAgaWNvblJpZ2h0OiBTdHJpbmcsXG4gICAgaWNvblJlbW92ZTogU3RyaW5nLFxuICAgIGljb25TZWxlY3RlZDogU3RyaW5nLFxuICAgIGxhYmVsOiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHRleHRDb2xvcjogU3RyaW5nLFxuXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIHNlbGVjdGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgb3V0bGluZTogQm9vbGVhbixcbiAgICBjbGlja2FibGU6IEJvb2xlYW4sXG4gICAgcmVtb3ZhYmxlOiBCb29sZWFuLFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAndXBkYXRlOnNlbGVjdGVkJywgJ3JlbW92ZScsICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IGhhc0xlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgfHwgcHJvcHMuaWNvbiAhPT0gdm9pZCAwKVxuXG4gICAgY29uc3QgbGVmdEljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmljb25TZWxlY3RlZCB8fCAkcS5pY29uU2V0LmNoaXAuc2VsZWN0ZWRcbiAgICAgICAgOiBwcm9wcy5pY29uXG4gICAgKSlcblxuICAgIGNvbnN0IHJlbW92ZUljb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pY29uUmVtb3ZlIHx8ICRxLmljb25TZXQuY2hpcC5yZW1vdmUpXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlID09PSBmYWxzZVxuICAgICAgJiYgKHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5zZWxlY3RlZCAhPT0gbnVsbClcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWNoaXAgcm93IGlubGluZSBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gZmFsc2UgJiYgcHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgKyAodGV4dCA/IGAgdGV4dC0keyB0ZXh0IH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtY2hpcC0tZGVuc2UnIDogJycpXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IHRydWUgPyAnIHEtY2hpcC0tb3V0bGluZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtY2hpcC0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICsgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWNsaWNrYWJsZSBjdXJzb3ItcG9pbnRlciBub24tc2VsZWN0YWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNoaXAtLXNxdWFyZScgOiAnJylcbiAgICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgdGFiaW5kZXg6IC0xLCAnYXJpYS1kaXNhYmxlZCc6ICd0cnVlJyB9XG4gICAgICAgIDogeyB0YWJpbmRleDogcHJvcHMudGFiaW5kZXggfHwgMCB9XG4gICAgKSlcblxuICAgIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICAgIGUua2V5Q29kZSA9PT0gMTMgLyogRU5URVIgKi8gJiYgb25DbGljayhlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmICghcHJvcHMuZGlzYWJsZSkge1xuICAgICAgICBlbWl0KCd1cGRhdGU6c2VsZWN0ZWQnLCAhcHJvcHMuc2VsZWN0ZWQpXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlbW92ZSAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gdm9pZCAwIHx8IGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgaWYgKHByb3BzLmRpc2FibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgICAgICBlbWl0KCdyZW1vdmUnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtdXG5cbiAgICAgIGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWZvY3VzLWhlbHBlcicgfSlcbiAgICAgIClcblxuICAgICAgaGFzTGVmdEljb24udmFsdWUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tbGVmdCcsXG4gICAgICAgICAgbmFtZTogbGVmdEljb24udmFsdWVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgY29uc3QgbGFiZWwgPSBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gICAgICAgID8gWyBoKCdkaXYnLCB7IGNsYXNzOiAnZWxsaXBzaXMnIH0sIFsgcHJvcHMubGFiZWwgXSkgXVxuICAgICAgICA6IHZvaWQgMFxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNoaXBfX2NvbnRlbnQgY29sIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCdcbiAgICAgICAgfSwgaE1lcmdlU2xvdFNhZmVseShzbG90cy5kZWZhdWx0LCBsYWJlbCkpXG4gICAgICApXG5cbiAgICAgIHByb3BzLmljb25SaWdodCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNoaXBfX2ljb24gcS1jaGlwX19pY29uLS1yaWdodCcsXG4gICAgICAgICAgbmFtZTogcHJvcHMuaWNvblJpZ2h0XG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHByb3BzLnJlbW92YWJsZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNoaXBfX2ljb24gcS1jaGlwX19pY29uLS1yZW1vdmUgY3Vyc29yLXBvaW50ZXInLFxuICAgICAgICAgIG5hbWU6IHJlbW92ZUljb24udmFsdWUsXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICBvbkNsaWNrOiBvblJlbW92ZSxcbiAgICAgICAgICBvbktleXVwOiBvblJlbW92ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlXG4gICAgICB9XG5cbiAgICAgIGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgIHsgb25DbGljaywgb25LZXl1cCB9XG4gICAgICApXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ2V0Q29udGVudCgpLFxuICAgICAgICAncmlwcGxlJyxcbiAgICAgICAgcHJvcHMucmlwcGxlICE9PSBmYWxzZSAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlLFxuICAgICAgICAoKSA9PiBbIFsgUmlwcGxlLCBwcm9wcy5yaXBwbGUgXSBdXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwibGV0IHJ0bEhhc1Njcm9sbEJ1ZyA9IGZhbHNlXG5cbi8vIG1vYmlsZSBDaHJvbWUgdGFrZXMgdGhlIGNyb3duIGZvciB0aGlzXG5pZiAoIV9fUVVBU0FSX1NTUl9fKSB7XG4gIGNvbnN0IHNjcm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY29uc3Qgc3BhY2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBzY3JvbGxlci5zZXRBdHRyaWJ1dGUoJ2RpcicsICdydGwnKVxuICBzY3JvbGxlci5zdHlsZS53aWR0aCA9ICcxcHgnXG4gIHNjcm9sbGVyLnN0eWxlLmhlaWdodCA9ICcxcHgnXG4gIHNjcm9sbGVyLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nXG5cbiAgc3BhY2VyLnN0eWxlLndpZHRoID0gJzEwMDBweCdcbiAgc3BhY2VyLnN0eWxlLmhlaWdodCA9ICcxcHgnXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxlcilcbiAgc2Nyb2xsZXIuYXBwZW5kQ2hpbGQoc3BhY2VyKVxuICBzY3JvbGxlci5zY3JvbGxMZWZ0ID0gLTEwMDBcblxuICBydGxIYXNTY3JvbGxCdWcgPSBzY3JvbGxlci5zY3JvbGxMZWZ0ID49IDBcblxuICBzY3JvbGxlci5yZW1vdmUoKVxufVxuXG5leHBvcnQge1xuICBydGxIYXNTY3JvbGxCdWdcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVNb3VudCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UuanMnXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBydGxIYXNTY3JvbGxCdWcgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3J0bC5qcydcblxuY29uc3QgYWdnQnVja2V0U2l6ZSA9IDEwMDBcblxuY29uc3Qgc2Nyb2xsVG9FZGdlcyA9IFtcbiAgJ3N0YXJ0JyxcbiAgJ2NlbnRlcicsXG4gICdlbmQnLFxuICAnc3RhcnQtZm9yY2UnLFxuICAnY2VudGVyLWZvcmNlJyxcbiAgJ2VuZC1mb3JjZSdcbl1cblxuY29uc3QgZmlsdGVyUHJvdG8gPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyXG5cbmNvbnN0IHNldE92ZXJmbG93QW5jaG9yID0gX19RVUFTQVJfU1NSX18gfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkub3ZlcmZsb3dBbmNob3IgPT09IHZvaWQgMFxuICA/IG5vb3BcbiAgOiBmdW5jdGlvbiAoY29udGVudEVsLCBpbmRleCkge1xuICAgIGlmIChjb250ZW50RWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGNvbnRlbnRFbC5fcU92ZXJmbG93QW5pbWF0aW9uRnJhbWUpXG4gICAgY29udGVudEVsLl9xT3ZlcmZsb3dBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoY29udGVudEVsID09PSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGNvbnRlbnRFbC5jaGlsZHJlbiB8fCBbXVxuXG4gICAgICBmaWx0ZXJQcm90b1xuICAgICAgICAuY2FsbChjaGlsZHJlbiwgZWwgPT4gZWwuZGF0YXNldCAmJiBlbC5kYXRhc2V0LnFWc0FuY2hvciAhPT0gdm9pZCAwKVxuICAgICAgICAuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgZGVsZXRlIGVsLmRhdGFzZXQucVZzQW5jaG9yXG4gICAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGVsID0gY2hpbGRyZW5bIGluZGV4IF1cblxuICAgICAgaWYgKGVsICYmIGVsLmRhdGFzZXQpIHtcbiAgICAgICAgZWwuZGF0YXNldC5xVnNBbmNob3IgPSAnJ1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuZnVuY3Rpb24gc3VtRm4gKGFjYywgaCkge1xuICByZXR1cm4gYWNjICsgaFxufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxEZXRhaWxzIChcbiAgcGFyZW50LFxuICBjaGlsZCxcbiAgYmVmb3JlUmVmLFxuICBhZnRlclJlZixcbiAgaG9yaXpvbnRhbCxcbiAgcnRsLFxuICBzdGlja3lTdGFydCxcbiAgc3RpY2t5RW5kXG4pIHtcbiAgY29uc3RcbiAgICBwYXJlbnRDYWxjID0gcGFyZW50ID09PSB3aW5kb3cgPyBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IHBhcmVudCxcbiAgICBwcm9wRWxTaXplID0gaG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0JyxcbiAgICBkZXRhaWxzID0ge1xuICAgICAgc2Nyb2xsU3RhcnQ6IDAsXG4gICAgICBzY3JvbGxWaWV3U2l6ZTogLXN0aWNreVN0YXJ0IC0gc3RpY2t5RW5kLFxuICAgICAgc2Nyb2xsTWF4U2l6ZTogMCxcbiAgICAgIG9mZnNldFN0YXJ0OiAtc3RpY2t5U3RhcnQsXG4gICAgICBvZmZzZXRFbmQ6IC1zdGlja3lFbmRcbiAgICB9XG5cbiAgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDBcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHBhcmVudENhbGMuc2Nyb2xsTGVmdFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBwYXJlbnRDYWxjLmNsaWVudFdpZHRoXG4gICAgfVxuICAgIGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSA9IHBhcmVudENhbGMuc2Nyb2xsV2lkdGhcblxuICAgIGlmIChydGwgPT09IHRydWUpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gZGV0YWlscy5zY3JvbGxNYXhTaXplIC0gZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSA6IDApIC0gZGV0YWlscy5zY3JvbGxTdGFydFxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHBhcmVudENhbGMuc2Nyb2xsVG9wXG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IHBhcmVudENhbGMuY2xpZW50SGVpZ2h0XG4gICAgfVxuICAgIGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSA9IHBhcmVudENhbGMuc2Nyb2xsSGVpZ2h0XG4gIH1cblxuICBpZiAoYmVmb3JlUmVmICE9PSBudWxsKSB7XG4gICAgZm9yIChsZXQgZWwgPSBiZWZvcmVSZWYucHJldmlvdXNFbGVtZW50U2libGluZzsgZWwgIT09IG51bGw7IGVsID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZSkge1xuICAgICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGVsWyBwcm9wRWxTaXplIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYWZ0ZXJSZWYgIT09IG51bGwpIHtcbiAgICBmb3IgKGxldCBlbCA9IGFmdGVyUmVmLm5leHRFbGVtZW50U2libGluZzsgZWwgIT09IG51bGw7IGVsID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLXZpcnR1YWwtc2Nyb2xsLS1za2lwJykgPT09IGZhbHNlKSB7XG4gICAgICAgIGRldGFpbHMub2Zmc2V0RW5kICs9IGVsWyBwcm9wRWxTaXplIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2hpbGQgIT09IHBhcmVudCkge1xuICAgIGNvbnN0XG4gICAgICBwYXJlbnRSZWN0ID0gcGFyZW50Q2FsYy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGNoaWxkUmVjdCA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBjaGlsZFJlY3QubGVmdCAtIHBhcmVudFJlY3QubGVmdFxuICAgICAgZGV0YWlscy5vZmZzZXRFbmQgLT0gY2hpbGRSZWN0LndpZHRoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBjaGlsZFJlY3QudG9wIC0gcGFyZW50UmVjdC50b3BcbiAgICAgIGRldGFpbHMub2Zmc2V0RW5kIC09IGNoaWxkUmVjdC5oZWlnaHRcbiAgICB9XG5cbiAgICBpZiAocGFyZW50ICE9PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gZGV0YWlscy5zY3JvbGxTdGFydFxuICAgIH1cbiAgICBkZXRhaWxzLm9mZnNldEVuZCArPSBkZXRhaWxzLnNjcm9sbE1heFNpemUgLSBkZXRhaWxzLm9mZnNldFN0YXJ0XG4gIH1cblxuICByZXR1cm4gZGV0YWlsc1xufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGwgKHBhcmVudCwgc2Nyb2xsLCBob3Jpem9udGFsLCBydGwpIHtcbiAgaWYgKHNjcm9sbCA9PT0gJ2VuZCcpIHtcbiAgICBzY3JvbGwgPSAocGFyZW50ID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogcGFyZW50KVtcbiAgICAgIGhvcml6b250YWwgPT09IHRydWUgPyAnc2Nyb2xsV2lkdGgnIDogJ3Njcm9sbEhlaWdodCdcbiAgICBdXG4gIH1cblxuICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGwgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IDApIC0gc2Nyb2xsXG4gICAgICB9XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oc2Nyb2xsLCB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwLCBzY3JvbGwpXG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICBpZiAocnRsID09PSB0cnVlKSB7XG4gICAgICBzY3JvbGwgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gcGFyZW50LnNjcm9sbFdpZHRoIC0gcGFyZW50Lm9mZnNldFdpZHRoIDogMCkgLSBzY3JvbGxcbiAgICB9XG4gICAgcGFyZW50LnNjcm9sbExlZnQgPSBzY3JvbGxcbiAgfVxuICBlbHNlIHtcbiAgICBwYXJlbnQuc2Nyb2xsVG9wID0gc2Nyb2xsXG4gIH1cbn1cblxuZnVuY3Rpb24gc3VtU2l6ZSAoc2l6ZUFnZywgc2l6ZSwgZnJvbSwgdG8pIHtcbiAgaWYgKGZyb20gPj0gdG8pIHsgcmV0dXJuIDAgfVxuXG4gIGNvbnN0XG4gICAgbGFzdFRvID0gc2l6ZS5sZW5ndGgsXG4gICAgZnJvbUFnZyA9IE1hdGguZmxvb3IoZnJvbSAvIGFnZ0J1Y2tldFNpemUpLFxuICAgIHRvQWdnID0gTWF0aC5mbG9vcigodG8gLSAxKSAvIGFnZ0J1Y2tldFNpemUpICsgMVxuXG4gIGxldCB0b3RhbCA9IHNpemVBZ2cuc2xpY2UoZnJvbUFnZywgdG9BZ2cpLnJlZHVjZShzdW1GbiwgMClcblxuICBpZiAoZnJvbSAlIGFnZ0J1Y2tldFNpemUgIT09IDApIHtcbiAgICB0b3RhbCAtPSBzaXplLnNsaWNlKGZyb21BZ2cgKiBhZ2dCdWNrZXRTaXplLCBmcm9tKS5yZWR1Y2Uoc3VtRm4sIDApXG4gIH1cbiAgaWYgKHRvICUgYWdnQnVja2V0U2l6ZSAhPT0gMCAmJiB0byAhPT0gbGFzdFRvKSB7XG4gICAgdG90YWwgLT0gc2l6ZS5zbGljZSh0bywgdG9BZ2cgKiBhZ2dCdWNrZXRTaXplKS5yZWR1Y2Uoc3VtRm4sIDApXG4gIH1cblxuICByZXR1cm4gdG90YWxcbn1cblxuY29uc3QgY29tbW9uVmlydFNjcm9sbFByb3BzID0ge1xuICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcblxuICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlcjoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDI0XG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydDoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmQ6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMFxuICB9LFxuXG4gIHRhYmxlQ29sc3BhbjogWyBOdW1iZXIsIFN0cmluZyBdXG59XG5cbmV4cG9ydCBjb25zdCBjb21tb25WaXJ0UHJvcHNMaXN0ID0gT2JqZWN0LmtleXMoY29tbW9uVmlydFNjcm9sbFByb3BzKVxuXG5leHBvcnQgY29uc3QgdXNlVmlydHVhbFNjcm9sbFByb3BzID0ge1xuICB2aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbDogQm9vbGVhbixcbiAgb25WaXJ0dWFsU2Nyb2xsOiBGdW5jdGlvbixcbiAgLi4uY29tbW9uVmlydFNjcm9sbFByb3BzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VWaXJ0dWFsU2Nyb2xsICh7XG4gIHZpcnR1YWxTY3JvbGxMZW5ndGgsIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQsIGdldFZpcnR1YWxTY3JvbGxFbCxcbiAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgLy8gb3B0aW9uYWxcbn0pIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGxldCBwcmV2U2Nyb2xsU3RhcnQsIHByZXZUb0luZGV4LCBsb2NhbFNjcm9sbFZpZXdTaXplLCB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cgPSBbXSwgdmlydHVhbFNjcm9sbFNpemVzXG5cbiAgY29uc3QgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUgPSByZWYoMClcbiAgY29uc3QgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlciA9IHJlZigwKVxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQgPSByZWYoe30pXG5cbiAgY29uc3QgYmVmb3JlUmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGFmdGVyUmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSA9IHJlZih7IGZyb206IDAsIHRvOiAwIH0pXG5cbiAgY29uc3QgY29sc3BhbkF0dHIgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMudGFibGVDb2xzcGFuICE9PSB2b2lkIDAgPyBwcm9wcy50YWJsZUNvbHNwYW4gOiAxMDApKVxuXG4gIGlmICh2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZCA9PT0gdm9pZCAwKSB7XG4gICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUpXG4gIH1cblxuICBjb25zdCBuZWVkc1Jlc2V0ID0gY29tcHV0ZWQoKCkgPT4gdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbClcblxuICBjb25zdCBuZWVkc1NsaWNlUmVjYWxjID0gY29tcHV0ZWQoKCkgPT5cbiAgICBuZWVkc1Jlc2V0LnZhbHVlICsgJzsnICsgcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyXG4gIClcblxuICB3YXRjaChuZWVkc1NsaWNlUmVjYWxjLCAoKSA9PiB7IHNldFZpcnR1YWxTY3JvbGxTaXplKCkgfSlcbiAgd2F0Y2gobmVlZHNSZXNldCwgcmVzZXQpXG5cbiAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKHByZXZUb0luZGV4LCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAodG9JbmRleCkge1xuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKHRvSW5kZXggPT09IHZvaWQgMCA/IHByZXZUb0luZGV4IDogdG9JbmRleClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvICh0b0luZGV4LCBlZGdlKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChzY3JvbGxFbCA9PT0gdm9pZCAwIHx8IHNjcm9sbEVsID09PSBudWxsIHx8IHNjcm9sbEVsLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGxEZXRhaWxzID0gZ2V0U2Nyb2xsRGV0YWlscyhcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICBiZWZvcmVSZWYudmFsdWUsXG4gICAgICBhZnRlclJlZi52YWx1ZSxcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgJHEubGFuZy5ydGwsXG4gICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0LFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICApXG5cbiAgICBsb2NhbFNjcm9sbFZpZXdTaXplICE9PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplICYmIHNldFZpcnR1YWxTY3JvbGxTaXplKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUpXG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgIE1hdGgubWluKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxLCBNYXRoLm1heCgwLCBwYXJzZUludCh0b0luZGV4LCAxMCkgfHwgMCkpLFxuICAgICAgMCxcbiAgICAgIHNjcm9sbFRvRWRnZXMuaW5kZXhPZihlZGdlKSA+IC0xID8gZWRnZSA6IChwcmV2VG9JbmRleCA+IC0xICYmIHRvSW5kZXggPiBwcmV2VG9JbmRleCA/ICdlbmQnIDogJ3N0YXJ0JylcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbE9uVmlydHVhbFNjcm9sbEV2dCAoKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChzY3JvbGxFbCA9PT0gdm9pZCAwIHx8IHNjcm9sbEVsID09PSBudWxsIHx8IHNjcm9sbEVsLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdFxuICAgICAgc2Nyb2xsRGV0YWlscyA9IGdldFNjcm9sbERldGFpbHMoXG4gICAgICAgIHNjcm9sbEVsLFxuICAgICAgICBnZXRWaXJ0dWFsU2Nyb2xsRWwoKSxcbiAgICAgICAgYmVmb3JlUmVmLnZhbHVlLFxuICAgICAgICBhZnRlclJlZi52YWx1ZSxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICRxLmxhbmcucnRsLFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0LFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZUVuZFxuICAgICAgKSxcbiAgICAgIGxpc3RMYXN0SW5kZXggPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMSxcbiAgICAgIGxpc3RFbmRPZmZzZXQgPSBzY3JvbGxEZXRhaWxzLnNjcm9sbE1heFNpemUgLSBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0IC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRFbmQgLSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlXG5cbiAgICBpZiAocHJldlNjcm9sbFN0YXJ0ID09PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIDw9IDApIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKHNjcm9sbEVsLCBzY3JvbGxEZXRhaWxzLCAwLCAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSAhPT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAmJiBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZShzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKVxuXG4gICAgdXBkYXRlVmlydHVhbFNjcm9sbFNpemVzKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pXG5cbiAgICBjb25zdCBzY3JvbGxNYXhTdGFydCA9IE1hdGguZmxvb3Ioc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplXG4gICAgICAtIE1hdGgubWF4KHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUsIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kKVxuICAgICAgLSBNYXRoLm1pbih2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGxpc3RMYXN0SW5kZXggXSwgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAvIDIpKVxuXG4gICAgaWYgKHNjcm9sbE1heFN0YXJ0ID4gMCAmJiBNYXRoLmNlaWwoc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkgPj0gc2Nyb2xsTWF4U3RhcnQpIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgICAgbGlzdExhc3RJbmRleCxcbiAgICAgICAgc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRFbmQgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cucmVkdWNlKHN1bUZuLCAwKVxuICAgICAgKVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXRcbiAgICAgIHRvSW5kZXggPSAwLFxuICAgICAgbGlzdE9mZnNldCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQgLSBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0LFxuICAgICAgb2Zmc2V0ID0gbGlzdE9mZnNldFxuXG4gICAgaWYgKGxpc3RPZmZzZXQgPD0gbGlzdEVuZE9mZnNldCAmJiBsaXN0T2Zmc2V0ICsgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSA+PSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSkge1xuICAgICAgbGlzdE9mZnNldCAtPSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZVxuICAgICAgdG9JbmRleCA9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb21cbiAgICAgIG9mZnNldCA9IGxpc3RPZmZzZXRcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgbGlzdE9mZnNldCA+PSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2dbIGogXSAmJiB0b0luZGV4IDwgbGlzdExhc3RJbmRleDsgaisrKSB7XG4gICAgICAgIGxpc3RPZmZzZXQgLT0gdmlydHVhbFNjcm9sbFNpemVzQWdnWyBqIF1cbiAgICAgICAgdG9JbmRleCArPSBhZ2dCdWNrZXRTaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKGxpc3RPZmZzZXQgPiAwICYmIHRvSW5kZXggPCBsaXN0TGFzdEluZGV4KSB7XG4gICAgICBsaXN0T2Zmc2V0IC09IHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdXG4gICAgICBpZiAobGlzdE9mZnNldCA+IC1zY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKSB7XG4gICAgICAgIHRvSW5kZXgrK1xuICAgICAgICBvZmZzZXQgPSBsaXN0T2Zmc2V0XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb2Zmc2V0ID0gdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF0gKyBsaXN0T2Zmc2V0XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UoXG4gICAgICBzY3JvbGxFbCxcbiAgICAgIHNjcm9sbERldGFpbHMsXG4gICAgICB0b0luZGV4LFxuICAgICAgb2Zmc2V0XG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UgKHNjcm9sbEVsLCBzY3JvbGxEZXRhaWxzLCB0b0luZGV4LCBvZmZzZXQsIGFsaWduKSB7XG4gICAgY29uc3QgYWxpZ25Gb3JjZSA9IHR5cGVvZiBhbGlnbiA9PT0gJ3N0cmluZycgJiYgYWxpZ24uaW5kZXhPZignLWZvcmNlJykgPiAtMVxuICAgIGNvbnN0IGFsaWduRW5kID0gYWxpZ25Gb3JjZSA9PT0gdHJ1ZSA/IGFsaWduLnJlcGxhY2UoJy1mb3JjZScsICcnKSA6IGFsaWduXG4gICAgY29uc3QgYWxpZ25SYW5nZSA9IGFsaWduRW5kICE9PSB2b2lkIDAgPyBhbGlnbkVuZCA6ICdzdGFydCdcblxuICAgIGxldFxuICAgICAgZnJvbSA9IE1hdGgubWF4KDAsIHRvSW5kZXggLSB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWVbIGFsaWduUmFuZ2UgXSksXG4gICAgICB0byA9IGZyb20gKyB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUudG90YWxcblxuICAgIGlmICh0byA+IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpIHtcbiAgICAgIHRvID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuICAgICAgZnJvbSA9IE1hdGgubWF4KDAsIHRvIC0gdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlLnRvdGFsKVxuICAgIH1cblxuICAgIHByZXZTY3JvbGxTdGFydCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnRcblxuICAgIGNvbnN0IHJhbmdlQ2hhbmdlZCA9IGZyb20gIT09IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20gfHwgdG8gIT09IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvXG5cbiAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSBmYWxzZSAmJiBhbGlnbkVuZCA9PT0gdm9pZCAwKSB7XG4gICAgICBlbWl0U2Nyb2xsKHRvSW5kZXgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB7IGFjdGl2ZUVsZW1lbnQgfSA9IGRvY3VtZW50XG4gICAgY29uc3QgY29udGVudEVsID0gY29udGVudFJlZi52YWx1ZVxuICAgIGlmIChcbiAgICAgIHJhbmdlQ2hhbmdlZCA9PT0gdHJ1ZVxuICAgICAgJiYgY29udGVudEVsICE9PSBudWxsXG4gICAgICAmJiBjb250ZW50RWwgIT09IGFjdGl2ZUVsZW1lbnRcbiAgICAgICYmIGNvbnRlbnRFbC5jb250YWlucyhhY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgY29udGVudEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0Jywgb25CbHVyUmVmb2N1c0ZuKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29udGVudEVsICE9PSBudWxsICYmIGNvbnRlbnRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIG9uQmx1clJlZm9jdXNGbilcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0T3ZlcmZsb3dBbmNob3IoY29udGVudEVsLCB0b0luZGV4IC0gZnJvbSlcblxuICAgIGNvbnN0IHNpemVCZWZvcmUgPSBhbGlnbkVuZCAhPT0gdm9pZCAwID8gdmlydHVhbFNjcm9sbFNpemVzLnNsaWNlKGZyb20sIHRvSW5kZXgpLnJlZHVjZShzdW1GbiwgMCkgOiAwXG5cbiAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyB2dWUga2V5IG1hdGNoaW5nIGFsZ29yaXRobSB3b3JrcyBvbmx5IGlmXG4gICAgICAvLyB0aGUgYXJyYXkgb2YgVk5vZGVzIGNoYW5nZXMgb24gb25seSBvbmUgb2YgdGhlIGVuZHNcbiAgICAgIC8vIHNvIHdlIGZpcnN0IGNoYW5nZSBvbmUgZW5kIGFuZCB0aGVuIHRoZSBvdGhlclxuXG4gICAgICBjb25zdCB0ZW1wVG8gPSB0byA+PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tICYmIGZyb20gPD0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG9cbiAgICAgICAgPyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50b1xuICAgICAgICA6IHRvXG5cbiAgICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlID0geyBmcm9tLCB0bzogdGVtcFRvIH1cbiAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgMCwgZnJvbSlcbiAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB0bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgaWYgKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvICE9PSB0byAmJiBwcmV2U2Nyb2xsU3RhcnQgPT09IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQpIHtcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZSA9IHsgZnJvbTogdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSwgdG8gfVxuICAgICAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB0bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gaWYgdGhlIHNjcm9sbCB3YXMgY2hhbmdlZCBnaXZlIHVwXG4gICAgICAvLyAoYW5vdGhlciBjYWxsIHRvIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlIGJlZm9yZSBhbmltYXRpb24gZnJhbWUpXG4gICAgICBpZiAocHJldlNjcm9sbFN0YXJ0ICE9PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyhmcm9tKVxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBzaXplQWZ0ZXIgPSB2aXJ0dWFsU2Nyb2xsU2l6ZXMuc2xpY2UoZnJvbSwgdG9JbmRleCkucmVkdWNlKHN1bUZuLCAwKSxcbiAgICAgICAgcG9zU3RhcnQgPSBzaXplQWZ0ZXIgKyBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0ICsgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUsXG4gICAgICAgIHBvc0VuZCA9IHBvc1N0YXJ0ICsgdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF1cblxuICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gcG9zU3RhcnQgKyBvZmZzZXRcblxuICAgICAgaWYgKGFsaWduRW5kICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3Qgc2l6ZURpZmYgPSBzaXplQWZ0ZXIgLSBzaXplQmVmb3JlXG4gICAgICAgIGNvbnN0IHNjcm9sbFN0YXJ0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCArIHNpemVEaWZmXG5cbiAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSBhbGlnbkZvcmNlICE9PSB0cnVlICYmIHNjcm9sbFN0YXJ0IDwgcG9zU3RhcnQgJiYgcG9zRW5kIDwgc2Nyb2xsU3RhcnQgKyBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplXG4gICAgICAgICAgPyBzY3JvbGxTdGFydFxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBhbGlnbkVuZCA9PT0gJ2VuZCdcbiAgICAgICAgICAgICAgICA/IHBvc0VuZCAtIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemVcbiAgICAgICAgICAgICAgICA6IHBvc1N0YXJ0IC0gKGFsaWduRW5kID09PSAnc3RhcnQnID8gMCA6IE1hdGgucm91bmQoKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIHRvSW5kZXggXSkgLyAyKSlcbiAgICAgICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcHJldlNjcm9sbFN0YXJ0ID0gc2Nyb2xsUG9zaXRpb25cblxuICAgICAgc2V0U2Nyb2xsKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgc2Nyb2xsUG9zaXRpb24sXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuXG4gICAgICBlbWl0U2Nyb2xsKHRvSW5kZXgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyAoZnJvbSkge1xuICAgIGNvbnN0IGNvbnRlbnRFbCA9IGNvbnRlbnRSZWYudmFsdWVcblxuICAgIGlmIChjb250ZW50RWwpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGNoaWxkcmVuID0gZmlsdGVyUHJvdG8uY2FsbChcbiAgICAgICAgICBjb250ZW50RWwuY2hpbGRyZW4sXG4gICAgICAgICAgZWwgPT4gZWwuY2xhc3NMaXN0ICYmIGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZVxuICAgICAgICApLFxuICAgICAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgc2l6ZUZuID0gcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwgPT09IHRydWVcbiAgICAgICAgICA/IGVsID0+IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgICAgOiBlbCA9PiBlbC5vZmZzZXRIZWlnaHRcblxuICAgICAgbGV0XG4gICAgICAgIGluZGV4ID0gZnJvbSxcbiAgICAgICAgc2l6ZSwgZGlmZlxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOykge1xuICAgICAgICBzaXplID0gc2l6ZUZuKGNoaWxkcmVuWyBpIF0pXG4gICAgICAgIGkrK1xuXG4gICAgICAgIHdoaWxlIChpIDwgY2hpbGRyZW5MZW5ndGggJiYgY2hpbGRyZW5bIGkgXS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXdpdGgtcHJldicpID09PSB0cnVlKSB7XG4gICAgICAgICAgc2l6ZSArPSBzaXplRm4oY2hpbGRyZW5bIGkgXSlcbiAgICAgICAgICBpKytcbiAgICAgICAgfVxuXG4gICAgICAgIGRpZmYgPSBzaXplIC0gdmlydHVhbFNjcm9sbFNpemVzWyBpbmRleCBdXG5cbiAgICAgICAgaWYgKGRpZmYgIT09IDApIHtcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGluZGV4IF0gKz0gZGlmZlxuICAgICAgICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZ1sgTWF0aC5mbG9vcihpbmRleCAvIGFnZ0J1Y2tldFNpemUpIF0gKz0gZGlmZlxuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXgrK1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQmx1clJlZm9jdXNGbiAoKSB7XG4gICAgY29udGVudFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBjb250ZW50UmVmLnZhbHVlICE9PSB2b2lkIDAgJiYgY29udGVudFJlZi52YWx1ZS5mb2N1cygpXG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCAodG9JbmRleCwgZnVsbFJlc2V0KSB7XG4gICAgY29uc3QgZGVmYXVsdFNpemUgPSAxICogdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWVcblxuICAgIGlmIChmdWxsUmVzZXQgPT09IHRydWUgfHwgQXJyYXkuaXNBcnJheSh2aXJ0dWFsU2Nyb2xsU2l6ZXMpID09PSBmYWxzZSkge1xuICAgICAgdmlydHVhbFNjcm9sbFNpemVzID0gW11cbiAgICB9XG5cbiAgICBjb25zdCBvbGRWaXJ0dWFsU2Nyb2xsU2l6ZXNMZW5ndGggPSB2aXJ0dWFsU2Nyb2xsU2l6ZXMubGVuZ3RoXG5cbiAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXMubGVuZ3RoID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuXG4gICAgZm9yIChsZXQgaSA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxOyBpID49IG9sZFZpcnR1YWxTY3JvbGxTaXplc0xlbmd0aDsgaS0tKSB7XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGkgXSA9IGRlZmF1bHRTaXplXG4gICAgfVxuXG4gICAgY29uc3Qgak1heCA9IE1hdGguZmxvb3IoKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxKSAvIGFnZ0J1Y2tldFNpemUpXG4gICAgdmlydHVhbFNjcm9sbFNpemVzQWdnID0gW11cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBqTWF4OyBqKyspIHtcbiAgICAgIGxldCBzaXplID0gMFxuICAgICAgY29uc3QgaU1heCA9IE1hdGgubWluKChqICsgMSkgKiBhZ2dCdWNrZXRTaXplLCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKVxuICAgICAgZm9yIChsZXQgaSA9IGogKiBhZ2dCdWNrZXRTaXplOyBpIDwgaU1heDsgaSsrKSB7XG4gICAgICAgIHNpemUgKz0gdmlydHVhbFNjcm9sbFNpemVzWyBpIF1cbiAgICAgIH1cbiAgICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZy5wdXNoKHNpemUpXG4gICAgfVxuXG4gICAgcHJldlRvSW5kZXggPSAtMVxuICAgIHByZXZTY3JvbGxTdGFydCA9IHZvaWQgMFxuXG4gICAgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCAwLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tKVxuICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcblxuICAgIGlmICh0b0luZGV4ID49IDApIHtcbiAgICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyh2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tKVxuICAgICAgbmV4dFRpY2soKCkgPT4geyBzY3JvbGxUbyh0b0luZGV4KSB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9uVmlydHVhbFNjcm9sbEV2dCgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmlydHVhbFNjcm9sbFNpemUgKHNjcm9sbFZpZXdTaXplKSB7XG4gICAgaWYgKHNjcm9sbFZpZXdTaXplID09PSB2b2lkIDAgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICAgIGlmIChzY3JvbGxFbCAhPT0gdm9pZCAwICYmIHNjcm9sbEVsICE9PSBudWxsICYmIHNjcm9sbEVsLm5vZGVUeXBlICE9PSA4KSB7XG4gICAgICAgIHNjcm9sbFZpZXdTaXplID0gZ2V0U2Nyb2xsRGV0YWlscyhcbiAgICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgICBnZXRWaXJ0dWFsU2Nyb2xsRWwoKSxcbiAgICAgICAgICBiZWZvcmVSZWYudmFsdWUsXG4gICAgICAgICAgYWZ0ZXJSZWYudmFsdWUsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICAgJHEubGFuZy5ydGwsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydCxcbiAgICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZUVuZFxuICAgICAgICApLnNjcm9sbFZpZXdTaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSA9IHNjcm9sbFZpZXdTaXplXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSA9IHBhcnNlRmxvYXQocHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUpIHx8IDBcbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyID0gcGFyc2VGbG9hdChwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyKSB8fCAwXG4gICAgY29uc3QgbXVsdGlwbGllciA9IDEgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQWZ0ZXJcbiAgICBjb25zdCB2aWV3ID0gc2Nyb2xsVmlld1NpemUgPT09IHZvaWQgMCB8fCBzY3JvbGxWaWV3U2l6ZSA8PSAwXG4gICAgICA/IDFcbiAgICAgIDogTWF0aC5jZWlsKHNjcm9sbFZpZXdTaXplIC8gdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUpXG5cbiAgICBjb25zdCBiYXNlU2l6ZSA9IE1hdGgubWF4KFxuICAgICAgMSxcbiAgICAgIHZpZXcsXG4gICAgICBNYXRoLmNlaWwoKHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVNpemUgPiAwID8gcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlU2l6ZSA6IDEwKSAvIG11bHRpcGxpZXIpXG4gICAgKVxuXG4gICAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlID0ge1xuICAgICAgdG90YWw6IE1hdGguY2VpbChiYXNlU2l6ZSAqIG11bHRpcGxpZXIpLFxuICAgICAgc3RhcnQ6IE1hdGguY2VpbChiYXNlU2l6ZSAqIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSxcbiAgICAgIGNlbnRlcjogTWF0aC5jZWlsKGJhc2VTaXplICogKDAuNSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSksXG4gICAgICBlbmQ6IE1hdGguY2VpbChiYXNlU2l6ZSAqICgxICsgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUpKSxcbiAgICAgIHZpZXdcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYWRWaXJ0dWFsU2Nyb2xsICh0YWcsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBwYWRkaW5nU2l6ZSA9IHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsID09PSB0cnVlID8gJ3dpZHRoJyA6ICdoZWlnaHQnXG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBbICctLXEtdmlydHVhbC1zY3JvbGwtaXRlbS0nICsgcGFkZGluZ1NpemUgXTogdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUgKyAncHgnXG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHRhZyA9PT0gJ3Rib2R5J1xuICAgICAgICA/IGgodGFnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19wYWRkaW5nJyxcbiAgICAgICAgICBrZXk6ICdiZWZvcmUnLFxuICAgICAgICAgIHJlZjogYmVmb3JlUmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCd0cicsIFtcbiAgICAgICAgICAgIGgoJ3RkJywge1xuICAgICAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9LFxuICAgICAgICAgICAgICBjb2xzcGFuOiBjb2xzcGFuQXR0ci52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgICA6IGgodGFnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19wYWRkaW5nJyxcbiAgICAgICAgICBrZXk6ICdiZWZvcmUnLFxuICAgICAgICAgIHJlZjogYmVmb3JlUmVmLFxuICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlIH1weGAsIC4uLnN0eWxlIH1cbiAgICAgICAgfSksXG5cbiAgICAgIGgodGFnLCB7XG4gICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fY29udGVudCcsXG4gICAgICAgIGtleTogJ2NvbnRlbnQnLFxuICAgICAgICByZWY6IGNvbnRlbnRSZWYsXG4gICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgfSwgY29udGVudC5mbGF0KCkpLFxuXG4gICAgICB0YWcgPT09ICd0Ym9keSdcbiAgICAgICAgPyBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYWZ0ZXInLFxuICAgICAgICAgIHJlZjogYWZ0ZXJSZWZcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ3RyJywgW1xuICAgICAgICAgICAgaCgndGQnLCB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgfXB4YCwgLi4uc3R5bGUgfSxcbiAgICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbkF0dHIudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgICAgOiBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYWZ0ZXInLFxuICAgICAgICAgIHJlZjogYWZ0ZXJSZWYsXG4gICAgICAgICAgc3R5bGU6IHsgWyBwYWRkaW5nU2l6ZSBdOiBgJHsgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9XG4gICAgICAgIH0pXG4gICAgXVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdFNjcm9sbCAoaW5kZXgpIHtcbiAgICBpZiAocHJldlRvSW5kZXggIT09IGluZGV4KSB7XG4gICAgICBwcm9wcy5vblZpcnR1YWxTY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCd2aXJ0dWFsLXNjcm9sbCcsIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGZyb206IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sXG4gICAgICAgIHRvOiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50byAtIDEsXG4gICAgICAgIGRpcmVjdGlvbjogaW5kZXggPCBwcmV2VG9JbmRleCA/ICdkZWNyZWFzZScgOiAnaW5jcmVhc2UnLFxuICAgICAgICByZWY6IHByb3h5XG4gICAgICB9KVxuXG4gICAgICBwcmV2VG9JbmRleCA9IGluZGV4XG4gICAgfVxuICB9XG5cbiAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICBjb25zdCBvblZpcnR1YWxTY3JvbGxFdnQgPSBkZWJvdW5jZShcbiAgICBsb2NhbE9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICAkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUgPyAxMjAgOiAzNVxuICApXG5cbiAgb25CZWZvcmVNb3VudCgoKSA9PiB7XG4gICAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICB9KVxuXG4gIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gIH0pXG5cbiAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgIGlmIChzaG91bGRBY3RpdmF0ZSAhPT0gdHJ1ZSkgeyByZXR1cm4gfVxuXG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChwcmV2U2Nyb2xsU3RhcnQgIT09IHZvaWQgMCAmJiBzY3JvbGxFbCAhPT0gdm9pZCAwICYmIHNjcm9sbEVsICE9PSBudWxsICYmIHNjcm9sbEVsLm5vZGVUeXBlICE9PSA4KSB7XG4gICAgICBzZXRTY3JvbGwoXG4gICAgICAgIHNjcm9sbEVsLFxuICAgICAgICBwcmV2U2Nyb2xsU3RhcnQsXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNjcm9sbFRvKHByZXZUb0luZGV4KVxuICAgIH1cbiAgfSlcblxuICBfX1FVQVNBUl9TU1JfXyB8fCBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIG9uVmlydHVhbFNjcm9sbEV2dC5jYW5jZWwoKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHNjcm9sbFRvLCByZXNldCwgcmVmcmVzaCB9KVxuXG4gIHJldHVybiB7XG4gICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLFxuXG4gICAgc2V0VmlydHVhbFNjcm9sbFNpemUsXG4gICAgb25WaXJ0dWFsU2Nyb2xsRXZ0LFxuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsLFxuICAgIHBhZFZpcnR1YWxTY3JvbGwsXG5cbiAgICBzY3JvbGxUbyxcbiAgICByZXNldCxcbiAgICByZWZyZXNoXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVwZGF0ZSwgb25VcGRhdGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRRmllbGQgZnJvbSAnLi4vZmllbGQvUUZpZWxkLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUUNoaXAgZnJvbSAnLi4vY2hpcC9RQ2hpcC5qcydcblxuaW1wb3J0IFFJdGVtIGZyb20gJy4uL2l0ZW0vUUl0ZW0uanMnXG5pbXBvcnQgUUl0ZW1TZWN0aW9uIGZyb20gJy4uL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzJ1xuaW1wb3J0IFFJdGVtTGFiZWwgZnJvbSAnLi4vaXRlbS9RSXRlbUxhYmVsLmpzJ1xuXG5pbXBvcnQgUU1lbnUgZnJvbSAnLi4vbWVudS9RTWVudS5qcydcbmltcG9ydCBRRGlhbG9nIGZyb20gJy4uL2RpYWxvZy9RRGlhbG9nLmpzJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMnXG5pbXBvcnQgeyB1c2VWaXJ0dWFsU2Nyb2xsLCB1c2VWaXJ0dWFsU2Nyb2xsUHJvcHMgfSBmcm9tICcuLi92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMnXG5pbXBvcnQgeyB1c2VGb3JtUHJvcHMsIHVzZUZvcm1JbnB1dE5hbWVBdHRyIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1rZXktY29tcG9zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2lzLmpzJ1xuaW1wb3J0IHsgc3RvcCwgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IG5vcm1hbGl6ZVRvSW50ZXJ2YWwgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXksIGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5jb25zdCB2YWxpZGF0ZU5ld1ZhbHVlTW9kZSA9IHYgPT4gWyAnYWRkJywgJ2FkZC11bmlxdWUnLCAndG9nZ2xlJyBdLmluY2x1ZGVzKHYpXG5jb25zdCByZUVzY2FwZUxpc3QgPSAnLiorP14ke30oKXxbXVxcXFwnXG5jb25zdCBmaWVsZFByb3BzTGlzdCA9IE9iamVjdC5rZXlzKHVzZUZpZWxkUHJvcHMpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2VsZWN0JyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlVmlydHVhbFNjcm9sbFByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG5cbiAgICBkaXNwbGF5VmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNwbGF5VmFsdWVIdG1sOiBCb29sZWFuLFxuICAgIGRyb3Bkb3duSWNvbjogU3RyaW5nLFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICAgIH0sXG5cbiAgICBvcHRpb25WYWx1ZTogWyBGdW5jdGlvbiwgU3RyaW5nIF0sXG4gICAgb3B0aW9uTGFiZWw6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuICAgIG9wdGlvbkRpc2FibGU6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuXG4gICAgaGlkZVNlbGVjdGVkOiBCb29sZWFuLFxuICAgIGhpZGVEcm9wZG93bkljb246IEJvb2xlYW4sXG4gICAgZmlsbElucHV0OiBCb29sZWFuLFxuXG4gICAgbWF4VmFsdWVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBvcHRpb25zRGVuc2U6IEJvb2xlYW4sXG4gICAgb3B0aW9uc0Rhcms6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBvcHRpb25zU2VsZWN0ZWRDbGFzczogU3RyaW5nLFxuICAgIG9wdGlvbnNIdG1sOiBCb29sZWFuLFxuXG4gICAgb3B0aW9uc0NvdmVyOiBCb29sZWFuLFxuXG4gICAgbWVudVNocmluazogQm9vbGVhbixcbiAgICBtZW51QW5jaG9yOiBTdHJpbmcsXG4gICAgbWVudVNlbGY6IFN0cmluZyxcbiAgICBtZW51T2Zmc2V0OiBBcnJheSxcblxuICAgIHBvcHVwQ29udGVudENsYXNzOiBTdHJpbmcsXG4gICAgcG9wdXBDb250ZW50U3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG5cbiAgICB1c2VJbnB1dDogQm9vbGVhbixcbiAgICB1c2VDaGlwczogQm9vbGVhbixcblxuICAgIG5ld1ZhbHVlTW9kZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU5ld1ZhbHVlTW9kZVxuICAgIH0sXG5cbiAgICBtYXBPcHRpb25zOiBCb29sZWFuLFxuICAgIGVtaXRWYWx1ZTogQm9vbGVhbixcblxuICAgIGlucHV0RGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIGRlZmF1bHQ6IDUwMFxuICAgIH0sXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgICB0YWJpbmRleDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBhdXRvY29tcGxldGU6IFN0cmluZyxcblxuICAgIHRyYW5zaXRpb25TaG93OiBTdHJpbmcsXG4gICAgdHJhbnNpdGlvbkhpZGU6IFN0cmluZyxcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGJlaGF2aW9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnZGVmYXVsdCcsICdtZW51JywgJ2RpYWxvZycgXS5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdkZWZhdWx0J1xuICAgIH0sXG5cbiAgICB2aXJ0dWFsU2Nyb2xsSXRlbVNpemU6IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG5cbiAgICBvbk5ld1ZhbHVlOiBGdW5jdGlvbixcbiAgICBvbkZpbHRlcjogRnVuY3Rpb25cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgJ2FkZCcsICdyZW1vdmUnLCAnaW5wdXQtdmFsdWUnLCAnbmV3LXZhbHVlJyxcbiAgICAna2V5dXAnLCAna2V5cHJlc3MnLCAna2V5ZG93bicsXG4gICAgJ2ZpbHRlci1hYm9ydCdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IG1lbnUgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gcmVmKC0xKVxuICAgIGNvbnN0IGlucHV0VmFsdWUgPSByZWYoJycpXG4gICAgY29uc3QgZGlhbG9nRmllbGRGb2N1c2VkID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGlubmVyTG9hZGluZ0luZGljYXRvciA9IHJlZihmYWxzZSlcblxuICAgIGxldCBpbnB1dFRpbWVyLCBpbm5lclZhbHVlQ2FjaGUsXG4gICAgICBoYXNEaWFsb2csIHVzZXJJbnB1dFZhbHVlLCBmaWx0ZXJJZCwgZGVmYXVsdElucHV0VmFsdWUsXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkLCBzZWFyY2hCdWZmZXIsIHNlYXJjaEJ1ZmZlckV4cFxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB0YXJnZXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBtZW51UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgZGlhbG9nUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbWVudUNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxMZW5ndGggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBBcnJheS5pc0FycmF5KHByb3BzLm9wdGlvbnMpXG4gICAgICAgID8gcHJvcHMub3B0aW9ucy5sZW5ndGhcbiAgICAgICAgOiAwXG4gICAgKSlcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplID09PSB2b2lkIDBcbiAgICAgICAgPyAocHJvcHMub3B0aW9uc0RlbnNlID09PSB0cnVlID8gMjQgOiA0OClcbiAgICAgICAgOiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemVcbiAgICApKVxuXG4gICAgY29uc3Qge1xuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQsXG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHBhZFZpcnR1YWxTY3JvbGwsXG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplXG4gICAgfSA9IHVzZVZpcnR1YWxTY3JvbGwoe1xuICAgICAgdmlydHVhbFNjcm9sbExlbmd0aCwgZ2V0VmlydHVhbFNjcm9sbFRhcmdldCwgZ2V0VmlydHVhbFNjcm9sbEVsLFxuICAgICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWRcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlubmVyVmFsdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBtYXBOdWxsID0gcHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSxcbiAgICAgICAgdmFsID0gcHJvcHMubW9kZWxWYWx1ZSAhPT0gdm9pZCAwICYmIChwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsIHx8IG1hcE51bGwgPT09IHRydWUpXG4gICAgICAgICAgPyAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA/IHByb3BzLm1vZGVsVmFsdWUgOiBbIHByb3BzLm1vZGVsVmFsdWUgXSlcbiAgICAgICAgICA6IFtdXG5cbiAgICAgIGlmIChwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMub3B0aW9ucykgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSBwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIGlubmVyVmFsdWVDYWNoZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBpbm5lclZhbHVlQ2FjaGVcbiAgICAgICAgICA6IFtdXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbC5tYXAodiA9PiBnZXRPcHRpb24odiwgY2FjaGUpKVxuXG4gICAgICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsICYmIG1hcE51bGwgPT09IHRydWVcbiAgICAgICAgICA/IHZhbHVlcy5maWx0ZXIodiA9PiB2ICE9PSBudWxsKVxuICAgICAgICAgIDogdmFsdWVzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxcbiAgICB9KVxuXG4gICAgY29uc3QgaW5uZXJGaWVsZFByb3BzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cbiAgICAgIGZpZWxkUHJvcHNMaXN0LmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHNbIGtleSBdXG4gICAgICAgIGlmICh2YWwgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGFjY1sga2V5IF0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgaXNPcHRpb25zRGFyayA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNEYXJrID09PSBudWxsXG4gICAgICAgID8gc3RhdGUuaXNEYXJrLnZhbHVlXG4gICAgICAgIDogcHJvcHMub3B0aW9uc0RhcmtcbiAgICApKVxuXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBjb21wdXRlZElucHV0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgY2xzID0gJ3EtZmllbGRfX2lucHV0IHEtcGxhY2Vob2xkZXIgY29sJ1xuXG4gICAgICBpZiAocHJvcHMuaGlkZVNlbGVjdGVkID09PSB0cnVlIHx8IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbIGNscywgcHJvcHMuaW5wdXRDbGFzcyBdXG4gICAgICB9XG5cbiAgICAgIGNscyArPSAnIHEtZmllbGRfX2lucHV0LS1wYWRkaW5nJ1xuXG4gICAgICByZXR1cm4gcHJvcHMuaW5wdXRDbGFzcyA9PT0gdm9pZCAwXG4gICAgICAgID8gY2xzXG4gICAgICAgIDogWyBjbHMsIHByb3BzLmlucHV0Q2xhc3MgXVxuICAgIH0pXG5cbiAgICBjb25zdCBtZW51Q29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdxLXZpcnR1YWwtc2Nyb2xsLS1ob3Jpem9udGFsJyA6ICcnKVxuICAgICAgKyAocHJvcHMucG9wdXBDb250ZW50Q2xhc3MgPyAnICcgKyBwcm9wcy5wb3B1cENvbnRlbnRDbGFzcyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IG5vT3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApXG5cbiAgICBjb25zdCBzZWxlY3RlZFN0cmluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpbm5lclZhbHVlLnZhbHVlXG4gICAgICAgIC5tYXAob3B0ID0+IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkpXG4gICAgICAgIC5qb2luKCcsICcpXG4gICAgKVxuXG4gICAgY29uc3QgbmVlZHNIdG1sRm4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICA/ICgpID0+IHRydWVcbiAgICAgICAgOiBvcHQgPT4gb3B0ICE9PSB2b2lkIDAgJiYgb3B0ICE9PSBudWxsICYmIG9wdC5odG1sID09PSB0cnVlXG4gICAgKSlcblxuICAgIGNvbnN0IHZhbHVlQXNIdG1sID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzcGxheVZhbHVlSHRtbCA9PT0gdHJ1ZSB8fCAoXG4gICAgICAgIHByb3BzLmRpc3BsYXlWYWx1ZSA9PT0gdm9pZCAwICYmIChcbiAgICAgICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IGlubmVyVmFsdWUudmFsdWUuc29tZShuZWVkc0h0bWxGbi52YWx1ZSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkpXG5cbiAgICBjb25zdCB0YWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gcHJvcHMudGFiaW5kZXggOiAtMSkpXG5cbiAgICBjb25zdCBjb21ib2JveEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCxcbiAgICAgICAgcm9sZTogJ2NvbWJvYm94JyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgJ2FyaWEtYXV0b2NvbXBsZXRlJzogcHJvcHMudXNlSW5wdXQgPT09IHRydWUgPyAnbGlzdCcgOiAnbm9uZScsXG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogbWVudS52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLW93bnMnOiBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fbGJgLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV9sYmBcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlID49IDApIHtcbiAgICAgICAgYXR0cnNbICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnIF0gPSBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fJHsgb3B0aW9uSW5kZXgudmFsdWUgfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGNvbnN0IGxpc3Rib3hBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9X2xiYCxcbiAgICAgICAgcm9sZTogJ2xpc3Rib3gnLFxuICAgICAgICAnYXJpYS1tdWx0aXNlbGVjdGFibGUnOiBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZSdcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlID49IDApIHtcbiAgICAgICAgYXR0cnNbICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnIF0gPSBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fJHsgb3B0aW9uSW5kZXgudmFsdWUgfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGNvbnN0IHNlbGVjdGVkU2NvcGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gaW5uZXJWYWx1ZS52YWx1ZS5tYXAoKG9wdCwgaSkgPT4gKHtcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIG9wdCxcbiAgICAgICAgaHRtbDogbmVlZHNIdG1sRm4udmFsdWUob3B0KSxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgIHJlbW92ZUF0SW5kZXg6IHJlbW92ZUF0SW5kZXhBbmRGb2N1cyxcbiAgICAgICAgdG9nZ2xlT3B0aW9uLFxuICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWVcbiAgICAgIH0pKVxuICAgIH0pXG5cbiAgICBjb25zdCBvcHRpb25TY29wZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmICh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGZyb20sIHRvIH0gPSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZVxuXG4gICAgICByZXR1cm4gcHJvcHMub3B0aW9ucy5zbGljZShmcm9tLCB0bykubWFwKChvcHQsIGkpID0+IHtcbiAgICAgICAgY29uc3QgZGlzYWJsZSA9IGlzT3B0aW9uRGlzYWJsZWQudmFsdWUob3B0KSA9PT0gdHJ1ZVxuICAgICAgICBjb25zdCBpbmRleCA9IGZyb20gKyBpXG5cbiAgICAgICAgY29uc3QgaXRlbVByb3BzID0ge1xuICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgIGFjdGl2ZUNsYXNzOiBjb21wdXRlZE9wdGlvbnNTZWxlY3RlZENsYXNzLnZhbHVlLFxuICAgICAgICAgIG1hbnVhbEZvY3VzOiB0cnVlLFxuICAgICAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgICAgIGRpc2FibGUsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIGRlbnNlOiBwcm9wcy5vcHRpb25zRGVuc2UsXG4gICAgICAgICAgZGFyazogaXNPcHRpb25zRGFyay52YWx1ZSxcbiAgICAgICAgICByb2xlOiAnb3B0aW9uJyxcbiAgICAgICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9XyR7IGluZGV4IH1gLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgdG9nZ2xlT3B0aW9uKG9wdCkgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgICAgICBpc09wdGlvblNlbGVjdGVkKG9wdCkgPT09IHRydWUgJiYgKGl0ZW1Qcm9wcy5hY3RpdmUgPSB0cnVlKVxuICAgICAgICAgIG9wdGlvbkluZGV4LnZhbHVlID09PSBpbmRleCAmJiAoaXRlbVByb3BzLmZvY3VzZWQgPSB0cnVlKVxuXG4gICAgICAgICAgaXRlbVByb3BzWyAnYXJpYS1zZWxlY3RlZCcgXSA9IGl0ZW1Qcm9wcy5hY3RpdmUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnXG5cbiAgICAgICAgICBpZiAoJHEucGxhdGZvcm0uaXMuZGVza3RvcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaXRlbVByb3BzLm9uTW91c2Vtb3ZlID0gKCkgPT4geyBtZW51LnZhbHVlID09PSB0cnVlICYmIHNldE9wdGlvbkluZGV4KGluZGV4KSB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgaHRtbDogbmVlZHNIdG1sRm4udmFsdWUob3B0KSxcbiAgICAgICAgICBsYWJlbDogZ2V0T3B0aW9uTGFiZWwudmFsdWUob3B0KSxcbiAgICAgICAgICBzZWxlY3RlZDogaXRlbVByb3BzLmFjdGl2ZSxcbiAgICAgICAgICBmb2N1c2VkOiBpdGVtUHJvcHMuZm9jdXNlZCxcbiAgICAgICAgICB0b2dnbGVPcHRpb24sXG4gICAgICAgICAgc2V0T3B0aW9uSW5kZXgsXG4gICAgICAgICAgaXRlbVByb3BzXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnN0IGRyb3Bkb3duQXJyb3dJY29uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZHJvcGRvd25JY29uICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5kcm9wZG93bkljb25cbiAgICAgICAgOiAkcS5pY29uU2V0LmFycm93LmRyb3Bkb3duXG4gICAgKSlcblxuICAgIGNvbnN0IHNxdWFyZWRNZW51ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm9wdGlvbnNDb3ZlciA9PT0gZmFsc2VcbiAgICAgICYmIHByb3BzLm91dGxpbmVkICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5zdGFuZG91dCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuYm9yZGVybGVzcyAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMucm91bmRlZCAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGNvbXB1dGVkT3B0aW9uc1NlbGVjdGVkQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zU2VsZWN0ZWRDbGFzcyAhPT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMub3B0aW9uc1NlbGVjdGVkQ2xhc3NcbiAgICAgICAgOiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKSlcblxuICAgIC8vIHJldHVybnMgbWV0aG9kIHRvIGdldCB2YWx1ZSBvZiBhbiBvcHRpb247XG4gICAgLy8gdGFrZXMgaW50byBhY2NvdW50ICdvcHRpb24tdmFsdWUnIHByb3BcbiAgICBjb25zdCBnZXRPcHRpb25WYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGdldFByb3BWYWx1ZUZuKHByb3BzLm9wdGlvblZhbHVlLCAndmFsdWUnKSlcblxuICAgIC8vIHJldHVybnMgbWV0aG9kIHRvIGdldCBsYWJlbCBvZiBhbiBvcHRpb247XG4gICAgLy8gdGFrZXMgaW50byBhY2NvdW50ICdvcHRpb24tbGFiZWwnIHByb3BcbiAgICBjb25zdCBnZXRPcHRpb25MYWJlbCA9IGNvbXB1dGVkKCgpID0+IGdldFByb3BWYWx1ZUZuKHByb3BzLm9wdGlvbkxhYmVsLCAnbGFiZWwnKSlcblxuICAgIC8vIHJldHVybnMgbWV0aG9kIHRvIHRlbGwgaWYgYW4gb3B0aW9uIGlzIGRpc2FibGVkO1xuICAgIC8vIHRha2VzIGludG8gYWNjb3VudCAnb3B0aW9uLWRpc2FibGUnIHByb3BcbiAgICBjb25zdCBpc09wdGlvbkRpc2FibGVkID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uRGlzYWJsZSwgJ2Rpc2FibGUnKSlcblxuICAgIGNvbnN0IGlubmVyT3B0aW9uc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gaW5uZXJWYWx1ZS52YWx1ZS5tYXAob3B0ID0+IGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdCkpKVxuXG4gICAgY29uc3QgaW5wdXRDb250cm9sRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZXZ0ID0ge1xuICAgICAgICBvbklucHV0LFxuICAgICAgICAvLyBTYWZhcmkgPCAxMC4yICYgVUlXZWJWaWV3IGRvZXNuJ3QgZmlyZSBjb21wb3NpdGlvbmVuZCB3aGVuXG4gICAgICAgIC8vIHN3aXRjaGluZyBmb2N1cyBiZWZvcmUgY29uZmlybWluZyBjb21wb3NpdGlvbiBjaG9pY2VcbiAgICAgICAgLy8gdGhpcyBhbHNvIGZpeGVzIHRoZSBpc3N1ZSB3aGVyZSBzb21lIGJyb3dzZXJzIGUuZy4gaU9TIENocm9tZVxuICAgICAgICAvLyBmaXJlcyBcImNoYW5nZVwiIGluc3RlYWQgb2YgXCJpbnB1dFwiIG9uIGF1dG9jb21wbGV0ZS5cbiAgICAgICAgb25DaGFuZ2U6IG9uQ29tcG9zaXRpb24sXG4gICAgICAgIG9uS2V5ZG93bjogb25UYXJnZXRLZXlkb3duLFxuICAgICAgICBvbktleXVwOiBvblRhcmdldEF1dG9jb21wbGV0ZSxcbiAgICAgICAgb25LZXlwcmVzczogb25UYXJnZXRLZXlwcmVzcyxcbiAgICAgICAgb25Gb2N1czogc2VsZWN0SW5wdXRUZXh0LFxuICAgICAgICBvbkNsaWNrIChlKSB7IGhhc0RpYWxvZyA9PT0gdHJ1ZSAmJiBzdG9wKGUpIH1cbiAgICAgIH1cblxuICAgICAgZXZ0Lm9uQ29tcG9zaXRpb25zdGFydCA9IGV2dC5vbkNvbXBvc2l0aW9udXBkYXRlID0gZXZ0Lm9uQ29tcG9zaXRpb25lbmQgPSBvbkNvbXBvc2l0aW9uXG5cbiAgICAgIHJldHVybiBldnRcbiAgICB9KVxuXG4gICAgd2F0Y2goaW5uZXJWYWx1ZSwgdmFsID0+IHtcbiAgICAgIGlubmVyVmFsdWVDYWNoZSA9IHZhbFxuXG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAvLyBQcmV2ZW50IHJlLWVudGVyaW5nIGluIGZpbHRlciB3aGlsZSBmaWx0ZXJpbmdcbiAgICAgICAgLy8gQWxzbyBwcmV2ZW50IGNsZWFyaW5nIGlucHV0VmFsdWUgd2hpbGUgZmlsdGVyaW5nXG4gICAgICAgICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiAoKGRpYWxvZy52YWx1ZSAhPT0gdHJ1ZSAmJiBtZW51LnZhbHVlICE9PSB0cnVlKSB8fCBoYXNWYWx1ZS52YWx1ZSAhPT0gdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICB1c2VySW5wdXRWYWx1ZSAhPT0gdHJ1ZSAmJiByZXNldElucHV0VmFsdWUoKVxuICAgICAgICBpZiAoZGlhbG9nLnZhbHVlID09PSB0cnVlIHx8IG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBmaWx0ZXIoJycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZmlsbElucHV0LCByZXNldElucHV0VmFsdWUpXG5cbiAgICB3YXRjaChtZW51LCB1cGRhdGVNZW51KVxuXG4gICAgd2F0Y2godmlydHVhbFNjcm9sbExlbmd0aCwgcmVyZW5kZXJNZW51KVxuXG4gICAgZnVuY3Rpb24gZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZSAob3B0KSB7XG4gICAgICByZXR1cm4gcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlXG4gICAgICAgID8gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuICAgICAgICA6IG9wdFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0SW5kZXggKGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPiAtMSAmJiBpbmRleCA8IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJywgeyBpbmRleCwgdmFsdWU6IG1vZGVsLnNwbGljZShpbmRleCwgMSlbIDAgXSB9KVxuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbW9kZWwpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBudWxsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXRJbmRleEFuZEZvY3VzIChpbmRleCkge1xuICAgICAgcmVtb3ZlQXRJbmRleChpbmRleClcbiAgICAgIHN0YXRlLmZvY3VzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQgKG9wdCwgdW5pcXVlKSB7XG4gICAgICBjb25zdCB2YWwgPSBnZXRFbWl0dGluZ09wdGlvblZhbHVlKG9wdClcblxuICAgICAgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlKSB7XG4gICAgICAgIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSAmJiB1cGRhdGVJbnB1dFZhbHVlKFxuICAgICAgICAgIGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCksXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcblxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiAwLCB2YWx1ZTogdmFsIH0pXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyBbIHZhbCBdIDogdmFsKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHVuaXF1ZSA9PT0gdHJ1ZSAmJiBpc09wdGlvblNlbGVjdGVkKG9wdCkgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5tYXhWYWx1ZXMgIT09IHZvaWQgMCAmJiBwcm9wcy5tb2RlbFZhbHVlLmxlbmd0aCA+PSBwcm9wcy5tYXhWYWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpXG5cbiAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IG1vZGVsLmxlbmd0aCwgdmFsdWU6IHZhbCB9KVxuICAgICAgbW9kZWwucHVzaCh2YWwpXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU9wdGlvbiAob3B0LCBrZWVwT3Blbikge1xuICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlIHx8IG9wdCA9PT0gdm9pZCAwIHx8IGlzT3B0aW9uRGlzYWJsZWQudmFsdWUob3B0KSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3B0VmFsdWUgPSBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG5cbiAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAoa2VlcE9wZW4gIT09IHRydWUpIHtcbiAgICAgICAgICB1cGRhdGVJbnB1dFZhbHVlKFxuICAgICAgICAgICAgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlID8gZ2V0T3B0aW9uTGFiZWwudmFsdWUob3B0KSA6ICcnLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApXG5cbiAgICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsICYmIHRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICAgICAgfHwgaXNEZWVwRXF1YWwoZ2V0T3B0aW9uVmFsdWUudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKSwgb3B0VmFsdWUpICE9PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlID8gb3B0VmFsdWUgOiBvcHQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIChoYXNEaWFsb2cgIT09IHRydWUgfHwgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID09PSB0cnVlKSAmJiBzdGF0ZS5mb2N1cygpXG5cbiAgICAgIHNlbGVjdElucHV0VGV4dCgpXG5cbiAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCB2YWwgPSBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWUgPyBvcHRWYWx1ZSA6IG9wdFxuICAgICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiAwLCB2YWx1ZTogdmFsIH0pXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyBbIHZhbCBdIDogdmFsKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlLnNsaWNlKCksXG4gICAgICAgIGluZGV4ID0gaW5uZXJPcHRpb25zVmFsdWUudmFsdWUuZmluZEluZGV4KHYgPT4gaXNEZWVwRXF1YWwodiwgb3B0VmFsdWUpKVxuXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBlbWl0KCdyZW1vdmUnLCB7IGluZGV4LCB2YWx1ZTogbW9kZWwuc3BsaWNlKGluZGV4LCAxKVsgMCBdIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHByb3BzLm1heFZhbHVlcyAhPT0gdm9pZCAwICYmIG1vZGVsLmxlbmd0aCA+PSBwcm9wcy5tYXhWYWx1ZXMpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0XG5cbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogbW9kZWwubGVuZ3RoLCB2YWx1ZTogdmFsIH0pXG4gICAgICAgIG1vZGVsLnB1c2godmFsKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9wdGlvbkluZGV4IChpbmRleCkge1xuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmRlc2t0b3AgIT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgICAgY29uc3QgdmFsID0gaW5kZXggPiAtMSAmJiBpbmRleCA8IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcbiAgICAgICAgPyBpbmRleFxuICAgICAgICA6IC0xXG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIG9wdGlvbkluZGV4LnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZU9wdGlvblNlbGVjdGlvbiAob2Zmc2V0ID0gMSwgc2tpcElucHV0VmFsdWUpIHtcbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IG9wdGlvbkluZGV4LnZhbHVlXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBpbmRleCA9IG5vcm1hbGl6ZVRvSW50ZXJ2YWwoXG4gICAgICAgICAgICBpbmRleCArIG9mZnNldCxcbiAgICAgICAgICAgIC0xLFxuICAgICAgICAgICAgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSAtIDFcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGluZGV4ICE9PSAtMSAmJiBpbmRleCAhPT0gb3B0aW9uSW5kZXgudmFsdWUgJiYgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSA9PT0gdHJ1ZSlcblxuICAgICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgIT09IGluZGV4KSB7XG4gICAgICAgICAgc2V0T3B0aW9uSW5kZXgoaW5kZXgpXG4gICAgICAgICAgc2Nyb2xsVG8oaW5kZXgpXG5cbiAgICAgICAgICBpZiAoc2tpcElucHV0VmFsdWUgIT09IHRydWUgJiYgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzZXRJbnB1dFZhbHVlKGluZGV4ID49IDBcbiAgICAgICAgICAgICAgPyBnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKVxuICAgICAgICAgICAgICA6IGRlZmF1bHRJbnB1dFZhbHVlXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uICh2YWx1ZSwgdmFsdWVDYWNoZSkge1xuICAgICAgY29uc3QgZm4gPSBvcHQgPT4gaXNEZWVwRXF1YWwoZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KSwgdmFsdWUpXG4gICAgICByZXR1cm4gcHJvcHMub3B0aW9ucy5maW5kKGZuKSB8fCB2YWx1ZUNhY2hlLmZpbmQoZm4pIHx8IHZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvcFZhbHVlRm4gKHByb3BWYWx1ZSwgZGVmYXVsdFZhbCkge1xuICAgICAgY29uc3QgdmFsID0gcHJvcFZhbHVlICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wVmFsdWVcbiAgICAgICAgOiBkZWZhdWx0VmFsXG5cbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gdmFsXG4gICAgICAgIDogb3B0ID0+IChvcHQgIT09IG51bGwgJiYgdHlwZW9mIG9wdCA9PT0gJ29iamVjdCcgJiYgdmFsIGluIG9wdCA/IG9wdFsgdmFsIF0gOiBvcHQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPcHRpb25TZWxlY3RlZCAob3B0KSB7XG4gICAgICBjb25zdCB2YWwgPSBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG4gICAgICByZXR1cm4gaW5uZXJPcHRpb25zVmFsdWUudmFsdWUuZmluZCh2ID0+IGlzRGVlcEVxdWFsKHYsIHZhbCkpICE9PSB2b2lkIDBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RJbnB1dFRleHQgKGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIChlID09PSB2b2lkIDAgfHwgKHRhcmdldFJlZi52YWx1ZSA9PT0gZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgPT09IHNlbGVjdGVkU3RyaW5nLnZhbHVlKSlcbiAgICAgICkge1xuICAgICAgICB0YXJnZXRSZWYudmFsdWUuc2VsZWN0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEtleXVwIChlKSB7XG4gICAgICAvLyBpZiBFU0MgYW5kIHdlIGhhdmUgYW4gb3BlbmVkIG1lbnVcbiAgICAgIC8vIHRoZW4gc3RvcCBwcm9wYWdhdGlvbiAobWlnaHQgYmUgY2F1Z2h0IGJ5IGEgUURpYWxvZ1xuICAgICAgLy8gYW5kIHNvIGl0IHdpbGwgYWxzbyBjbG9zZSB0aGUgUURpYWxvZywgd2hpY2ggaXMgd3JvbmcpXG4gICAgICBpZiAoaXNLZXlDb2RlKGUsIDI3KSA9PT0gdHJ1ZSAmJiBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0b3AoZSlcbiAgICAgICAgLy8gb24gRVNDIHdlIG5lZWQgdG8gY2xvc2UgdGhlIGRpYWxvZyBhbHNvXG4gICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2tleXVwJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEF1dG9jb21wbGV0ZSAoZSkge1xuICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZS50YXJnZXRcblxuICAgICAgaWYgKGUua2V5Q29kZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG9uVGFyZ2V0S2V5dXAoZSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gJydcbiAgICAgIGNsZWFyVGltZW91dChpbnB1dFRpbWVyKVxuICAgICAgcmVzZXRJbnB1dFZhbHVlKClcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBuZWVkbGUgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpXG4gICAgICAgIGNvbnN0IGZpbmRGbiA9IGV4dHJhY3RGbiA9PiB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uID0gcHJvcHMub3B0aW9ucy5maW5kKG9wdCA9PiBleHRyYWN0Rm4udmFsdWUob3B0KS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSBuZWVkbGUpXG5cbiAgICAgICAgICBpZiAob3B0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmluZGV4T2Yob3B0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRvZ2dsZU9wdGlvbihvcHRpb24pXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbGxGbiA9IGFmdGVyRmlsdGVyID0+IHtcbiAgICAgICAgICBpZiAoZmluZEZuKGdldE9wdGlvblZhbHVlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmaW5kRm4oZ2V0T3B0aW9uTGFiZWwpID09PSB0cnVlIHx8IGFmdGVyRmlsdGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmaWx0ZXIodmFsdWUsIHRydWUsICgpID0+IGZpbGxGbih0cnVlKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbGxGbigpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuY2xlYXJWYWx1ZShlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0S2V5cHJlc3MgKGUpIHtcbiAgICAgIGVtaXQoJ2tleXByZXNzJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEtleWRvd24gKGUpIHtcbiAgICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgICBpZiAoc2hvdWxkSWdub3JlS2V5KGUpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdWYWx1ZU1vZGVWYWxpZCA9IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID4gMFxuICAgICAgICAmJiAocHJvcHMubmV3VmFsdWVNb2RlICE9PSB2b2lkIDAgfHwgcHJvcHMub25OZXdWYWx1ZSAhPT0gdm9pZCAwKVxuXG4gICAgICBjb25zdCB0YWJTaG91bGRTZWxlY3QgPSBlLnNoaWZ0S2V5ICE9PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlXG4gICAgICAgICYmIChvcHRpb25JbmRleC52YWx1ZSA+IC0xIHx8IG5ld1ZhbHVlTW9kZVZhbGlkID09PSB0cnVlKVxuXG4gICAgICAvLyBlc2NhcGVcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgIHByZXZlbnQoZSkgLy8gcHJldmVudCBjbGVhcmluZyB0aGUgaW5wdXRWYWx1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gdGFiXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA5ICYmIHRhYlNob3VsZFNlbGVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldCA9PT0gdm9pZCAwIHx8IGUudGFyZ2V0LmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpIHsgcmV0dXJuIH1cblxuICAgICAgLy8gZG93blxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgPT09IDQwXG4gICAgICAgICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBtZW51LnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIHNob3dQb3B1cCgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBiYWNrc3BhY2VcbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlID09PSA4XG4gICAgICAgICYmIHByb3BzLmhpZGVTZWxlY3RlZCAhPT0gdHJ1ZVxuICAgICAgICAmJiBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSAmJiBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmVtb3ZlQXRJbmRleChwcm9wcy5tb2RlbFZhbHVlLmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgcHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gaG9tZSwgZW5kIC0gMzYsIDM1XG4gICAgICBpZiAoXG4gICAgICAgIChlLmtleUNvZGUgPT09IDM1IHx8IGUua2V5Q29kZSA9PT0gMzYpXG4gICAgICAgICYmICh0eXBlb2YgaW5wdXRWYWx1ZS52YWx1ZSAhPT0gJ3N0cmluZycgfHwgaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSAtMVxuICAgICAgICBtb3ZlT3B0aW9uU2VsZWN0aW9uKGUua2V5Q29kZSA9PT0gMzYgPyAxIDogLTEsIHByb3BzLm11bHRpcGxlKVxuICAgICAgfVxuXG4gICAgICAvLyBwZyB1cCwgcGcgZG93biAtIDMzLCAzNFxuICAgICAgaWYgKFxuICAgICAgICAoZS5rZXlDb2RlID09PSAzMyB8fCBlLmtleUNvZGUgPT09IDM0KVxuICAgICAgICAmJiB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUgIT09IHZvaWQgMFxuICAgICAgKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIG9wdGlvbkluZGV4LnZhbHVlID0gTWF0aC5tYXgoXG4gICAgICAgICAgLTEsXG4gICAgICAgICAgTWF0aC5taW4oXG4gICAgICAgICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlLFxuICAgICAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgKyAoZS5rZXlDb2RlID09PSAzMyA/IC0xIDogMSkgKiB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUudmlld1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICBtb3ZlT3B0aW9uU2VsZWN0aW9uKGUua2V5Q29kZSA9PT0gMzMgPyAxIDogLTEsIHByb3BzLm11bHRpcGxlKVxuICAgICAgfVxuXG4gICAgICAvLyB1cCwgZG93blxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSA0MCkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBtb3ZlT3B0aW9uU2VsZWN0aW9uKGUua2V5Q29kZSA9PT0gMzggPyAtMSA6IDEsIHByb3BzLm11bHRpcGxlKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvcHRpb25zTGVuZ3RoID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuXG4gICAgICAvLyBjbGVhciBzZWFyY2ggYnVmZmVyIGlmIGV4cGlyZWRcbiAgICAgIGlmIChzZWFyY2hCdWZmZXIgPT09IHZvaWQgMCB8fCBzZWFyY2hCdWZmZXJFeHAgPCBEYXRlLm5vdygpKSB7XG4gICAgICAgIHNlYXJjaEJ1ZmZlciA9ICcnXG4gICAgICB9XG5cbiAgICAgIC8vIGtleWJvYXJkIHNlYXJjaCB3aGVuIG5vdCBoYXZpbmcgdXNlLWlucHV0XG4gICAgICBpZiAoXG4gICAgICAgIG9wdGlvbnNMZW5ndGggPiAwXG4gICAgICAgICYmIHByb3BzLnVzZUlucHV0ICE9PSB0cnVlXG4gICAgICAgICYmIGUua2V5ICE9PSB2b2lkIDBcbiAgICAgICAgJiYgZS5rZXkubGVuZ3RoID09PSAxIC8vIHByaW50YWJsZSBjaGFyXG4gICAgICAgICYmIGUuYWx0S2V5ID09PSBlLmN0cmxLZXkgLy8gbm90IGtiZCBzaG9ydGN1dFxuICAgICAgICAmJiAoZS5rZXlDb2RlICE9PSAzMiB8fCBzZWFyY2hCdWZmZXIubGVuZ3RoID4gMCkgLy8gc3BhY2UgaW4gbWlkZGxlIG9mIHNlYXJjaFxuICAgICAgKSB7XG4gICAgICAgIG1lbnUudmFsdWUgIT09IHRydWUgJiYgc2hvd1BvcHVwKGUpXG5cbiAgICAgICAgY29uc3RcbiAgICAgICAgICBjaGFyID0gZS5rZXkudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgICAgICBrZXlSZXBlYXQgPSBzZWFyY2hCdWZmZXIubGVuZ3RoID09PSAxICYmIHNlYXJjaEJ1ZmZlclsgMCBdID09PSBjaGFyXG5cbiAgICAgICAgc2VhcmNoQnVmZmVyRXhwID0gRGF0ZS5ub3coKSArIDE1MDBcbiAgICAgICAgaWYgKGtleVJlcGVhdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICAgIHNlYXJjaEJ1ZmZlciArPSBjaGFyXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hSZSA9IG5ldyBSZWdFeHAoJ14nICsgc2VhcmNoQnVmZmVyLnNwbGl0KCcnKS5tYXAobCA9PiAocmVFc2NhcGVMaXN0LmluZGV4T2YobCkgPiAtMSA/ICdcXFxcJyArIGwgOiBsKSkuam9pbignLionKSwgJ2knKVxuXG4gICAgICAgIGxldCBpbmRleCA9IG9wdGlvbkluZGV4LnZhbHVlXG5cbiAgICAgICAgaWYgKGtleVJlcGVhdCA9PT0gdHJ1ZSB8fCBpbmRleCA8IDAgfHwgc2VhcmNoUmUudGVzdChnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSkgIT09IHRydWUpIHtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBpbmRleCA9IG5vcm1hbGl6ZVRvSW50ZXJ2YWwoaW5kZXggKyAxLCAtMSwgb3B0aW9uc0xlbmd0aCAtIDEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChpbmRleCAhPT0gb3B0aW9uSW5kZXgudmFsdWUgJiYgKFxuICAgICAgICAgICAgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSA9PT0gdHJ1ZVxuICAgICAgICAgICAgfHwgc2VhcmNoUmUudGVzdChnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSkgIT09IHRydWVcbiAgICAgICAgICApKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHNldE9wdGlvbkluZGV4KGluZGV4KVxuICAgICAgICAgICAgc2Nyb2xsVG8oaW5kZXgpXG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBzZXRJbnB1dFZhbHVlKGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gZW50ZXIsIHNwYWNlICh3aGVuIG5vdCB1c2luZyB1c2UtaW5wdXQgYW5kIG5vdCBpbiBzZWFyY2gpLCBvciB0YWIgKHdoZW4gbm90IHVzaW5nIG11bHRpcGxlIGFuZCBvcHRpb24gc2VsZWN0ZWQpXG4gICAgICAvLyBzYW1lIHRhcmdldCBpcyBjaGVja2VkIGFib3ZlXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSAhPT0gMTNcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gMzIgfHwgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgfHwgc2VhcmNoQnVmZmVyICE9PSAnJylcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gOSB8fCB0YWJTaG91bGRTZWxlY3QgPT09IGZhbHNlKVxuICAgICAgKSB7IHJldHVybiB9XG5cbiAgICAgIGUua2V5Q29kZSAhPT0gOSAmJiBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgPiAtMSAmJiBvcHRpb25JbmRleC52YWx1ZSA8IG9wdGlvbnNMZW5ndGgpIHtcbiAgICAgICAgdG9nZ2xlT3B0aW9uKHByb3BzLm9wdGlvbnNbIG9wdGlvbkluZGV4LnZhbHVlIF0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWVNb2RlVmFsaWQgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgZG9uZSA9ICh2YWwsIG1vZGUpID0+IHtcbiAgICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRlTmV3VmFsdWVNb2RlKG1vZGUpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vZGUgPSBwcm9wcy5uZXdWYWx1ZU1vZGVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB1cGRhdGVJbnB1dFZhbHVlKCcnLCBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSwgdHJ1ZSlcblxuICAgICAgICAgIGNvbnN0IGZuID0gbW9kZSA9PT0gJ3RvZ2dsZScgPyB0b2dnbGVPcHRpb24gOiBhZGRcbiAgICAgICAgICBmbih2YWwsIG1vZGUgPT09ICdhZGQtdW5pcXVlJylcblxuICAgICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsICYmIHRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5vbk5ld1ZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBlbWl0KCduZXctdmFsdWUnLCBpbnB1dFZhbHVlLnZhbHVlLCBkb25lKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRvbmUoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNsb3NlTWVudSgpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgc2hvd1BvcHVwKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsRWwgKCkge1xuICAgICAgcmV0dXJuIGhhc0RpYWxvZyA9PT0gdHJ1ZVxuICAgICAgICA/IG1lbnVDb250ZW50UmVmLnZhbHVlXG4gICAgICAgIDogKFxuICAgICAgICAgICAgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCAmJiBtZW51UmVmLnZhbHVlLl9fcVBvcnRhbElubmVyUmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgICAgID8gbWVudVJlZi52YWx1ZS5fX3FQb3J0YWxJbm5lclJlZi52YWx1ZVxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIHJldHVybiBnZXRWaXJ0dWFsU2Nyb2xsRWwoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGlvbiAoKSB7XG4gICAgICBpZiAocHJvcHMuaGlkZVNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHNbICdzZWxlY3RlZC1pdGVtJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2NvcGUudmFsdWUubWFwKHNjb3BlID0+IHNsb3RzWyAnc2VsZWN0ZWQtaXRlbScgXShzY29wZSkpLnNsaWNlKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNsb3RzLnNlbGVjdGVkICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChzbG90cy5zZWxlY3RlZCgpKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudXNlQ2hpcHMgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2NvcGUudmFsdWUubWFwKChzY29wZSwgaSkgPT4gaChRQ2hpcCwge1xuICAgICAgICAgIGtleTogJ29wdGlvbi0nICsgaSxcbiAgICAgICAgICByZW1vdmFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlICYmIGlzT3B0aW9uRGlzYWJsZWQudmFsdWUoc2NvcGUub3B0KSAhPT0gdHJ1ZSxcbiAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICB0ZXh0Q29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICBvblJlbW92ZSAoKSB7IHNjb3BlLnJlbW92ZUF0SW5kZXgoaSkgfVxuICAgICAgICB9LCAoKSA9PiBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAnZWxsaXBzaXMnLFxuICAgICAgICAgIFsgc2NvcGUuaHRtbCA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyBdOiBnZXRPcHRpb25MYWJlbC52YWx1ZShzY29wZS5vcHQpXG4gICAgICAgIH0pKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBbIHZhbHVlQXNIdG1sLnZhbHVlID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IHByb3BzLmRpc3BsYXlWYWx1ZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICA/IHByb3BzLmRpc3BsYXlWYWx1ZVxuICAgICAgICAgICAgOiBzZWxlY3RlZFN0cmluZy52YWx1ZVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFsbE9wdGlvbnMgKCkge1xuICAgICAgaWYgKG5vT3B0aW9ucy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHNbICduby1vcHRpb24nIF0oeyBpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLnZhbHVlIH0pXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBzbG90cy5vcHRpb24gIT09IHZvaWQgMFxuICAgICAgICA/IHNsb3RzLm9wdGlvblxuICAgICAgICA6IHNjb3BlID0+IHtcbiAgICAgICAgICByZXR1cm4gaChRSXRlbSwge1xuICAgICAgICAgICAga2V5OiBzY29wZS5pbmRleCxcbiAgICAgICAgICAgIC4uLnNjb3BlLml0ZW1Qcm9wc1xuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBoKFxuICAgICAgICAgICAgICBRSXRlbVNlY3Rpb24sXG4gICAgICAgICAgICAgICgpID0+IGgoXG4gICAgICAgICAgICAgICAgUUl0ZW1MYWJlbCxcbiAgICAgICAgICAgICAgICAoKSA9PiBoKCdzcGFuJywge1xuICAgICAgICAgICAgICAgICAgWyBzY29wZS5odG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IHNjb3BlLmxhYmVsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgbGV0IG9wdGlvbnMgPSBwYWRWaXJ0dWFsU2Nyb2xsKCdkaXYnLCBvcHRpb25TY29wZS52YWx1ZS5tYXAoZm4pKVxuXG4gICAgICBpZiAoc2xvdHNbICdiZWZvcmUtb3B0aW9ucycgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSBzbG90c1sgJ2JlZm9yZS1vcHRpb25zJyBdKCkuY29uY2F0KG9wdGlvbnMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoTWVyZ2VTbG90KHNsb3RzWyAnYWZ0ZXItb3B0aW9ucycgXSwgb3B0aW9ucylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJbnB1dCAoZnJvbURpYWxvZywgaXNUYXJnZXQpIHtcbiAgICAgIGNvbnN0IGF0dHJzID0gaXNUYXJnZXQgPT09IHRydWUgPyB7IC4uLmNvbWJvYm94QXR0cnMudmFsdWUsIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSB9IDogdm9pZCAwXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogaXNUYXJnZXQgPT09IHRydWUgPyB0YXJnZXRSZWYgOiB2b2lkIDAsXG4gICAgICAgIGtleTogJ2lfdCcsXG4gICAgICAgIGNsYXNzOiBjb21wdXRlZElucHV0Q2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICB2YWx1ZTogaW5wdXRWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5wdXRWYWx1ZS52YWx1ZSA6ICcnLFxuICAgICAgICAvLyByZXF1aXJlZCBmb3IgQW5kcm9pZCBpbiBvcmRlciB0byBzaG93IEVOVEVSIGtleSB3aGVuIGluIGZvcm1cbiAgICAgICAgdHlwZTogJ3NlYXJjaCcsXG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICBpZDogaXNUYXJnZXQgPT09IHRydWUgPyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgOiB2b2lkIDAsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBhdXRvY29tcGxldGU6IHByb3BzLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogKGZyb21EaWFsb2cgIT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlKSB8fCB2b2lkIDAsXG4gICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlLFxuICAgICAgICByZWFkb25seTogcHJvcHMucmVhZG9ubHkgPT09IHRydWUsXG4gICAgICAgIC4uLmlucHV0Q29udHJvbEV2ZW50cy52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoZnJvbURpYWxvZyAhPT0gdHJ1ZSAmJiBoYXNEaWFsb2cgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5jbGFzcykgPT09IHRydWUpIHtcbiAgICAgICAgICBkYXRhLmNsYXNzID0gWyAuLi5kYXRhLmNsYXNzLCAnbm8tcG9pbnRlci1ldmVudHMnIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkYXRhLmNsYXNzICs9ICcgbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2lucHV0JywgZGF0YSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbklucHV0IChlKSB7XG4gICAgICBjbGVhclRpbWVvdXQoaW5wdXRUaW1lcilcblxuICAgICAgaWYgKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQucUNvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgc2V0SW5wdXRWYWx1ZShlLnRhcmdldC52YWx1ZSB8fCAnJylcbiAgICAgIC8vIG1hcmsgaXQgaGVyZSBhcyB1c2VyIGlucHV0IHNvIHRoYXQgaWYgdXBkYXRlSW5wdXRWYWx1ZSBpcyBjYWxsZWRcbiAgICAgIC8vIGJlZm9yZSBmaWx0ZXIgaXMgY2FsbGVkIHRoZSBpbmRpY2F0b3IgaXMgcmVzZXRcbiAgICAgIHVzZXJJbnB1dFZhbHVlID0gdHJ1ZVxuICAgICAgZGVmYXVsdElucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnZhbHVlXG5cbiAgICAgIGlmIChcbiAgICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiAoaGFzRGlhbG9nICE9PSB0cnVlIHx8IGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vbkZpbHRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlucHV0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBmaWx0ZXIoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgICAgfSwgcHJvcHMuaW5wdXREZWJvdW5jZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRJbnB1dFZhbHVlICh2YWwpIHtcbiAgICAgIGlmIChpbnB1dFZhbHVlLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgaW5wdXRWYWx1ZS52YWx1ZSA9IHZhbFxuICAgICAgICBlbWl0KCdpbnB1dC12YWx1ZScsIHZhbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVJbnB1dFZhbHVlICh2YWwsIG5vRmlsdGVyaW5nLCBpbnRlcm5hbCkge1xuICAgICAgdXNlcklucHV0VmFsdWUgPSBpbnRlcm5hbCAhPT0gdHJ1ZVxuXG4gICAgICBpZiAocHJvcHMudXNlSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgc2V0SW5wdXRWYWx1ZSh2YWwpXG5cbiAgICAgICAgaWYgKG5vRmlsdGVyaW5nID09PSB0cnVlIHx8IGludGVybmFsICE9PSB0cnVlKSB7XG4gICAgICAgICAgZGVmYXVsdElucHV0VmFsdWUgPSB2YWxcbiAgICAgICAgfVxuXG4gICAgICAgIG5vRmlsdGVyaW5nICE9PSB0cnVlICYmIGZpbHRlcih2YWwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyICh2YWwsIGtlZXBDbG9zZWQsIGFmdGVyVXBkYXRlRm4pIHtcbiAgICAgIGlmIChwcm9wcy5vbkZpbHRlciA9PT0gdm9pZCAwIHx8IChrZWVwQ2xvc2VkICE9PSB0cnVlICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgIT09IHRydWUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGVtaXQoJ2ZpbHRlci1hYm9ydCcpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdmFsICE9PSAnJ1xuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA+IDBcbiAgICAgICAgJiYgdXNlcklucHV0VmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgdmFsID09PSBnZXRPcHRpb25MYWJlbC52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pXG4gICAgICApIHtcbiAgICAgICAgdmFsID0gJydcbiAgICAgIH1cblxuICAgICAgY29uc3QgbG9jYWxGaWx0ZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIChtZW51LnZhbHVlID0gZmFsc2UpXG4gICAgICB9LCAxMClcblxuICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuICAgICAgZmlsdGVySWQgPSBsb2NhbEZpbHRlcklkXG5cbiAgICAgIGVtaXQoXG4gICAgICAgICdmaWx0ZXInLFxuICAgICAgICB2YWwsXG4gICAgICAgIChmbiwgYWZ0ZXJGbikgPT4ge1xuICAgICAgICAgIGlmICgoa2VlcENsb3NlZCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSAmJiBmaWx0ZXJJZCA9PT0gbG9jYWxGaWx0ZXJJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuXG4gICAgICAgICAgICB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgZm4oKVxuXG4gICAgICAgICAgICAvLyBoaWRlIGluZGljYXRvciB0byBhbGxvdyBhcnJvdyB0byBhbmltYXRlXG4gICAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuXG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtlZXBDbG9zZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgaGlkZVBvcHVwKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlTWVudSh0cnVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG1lbnUudmFsdWUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdHlwZW9mIGFmdGVyRm4gPT09ICdmdW5jdGlvbicgJiYgbmV4dFRpY2soKCkgPT4geyBhZnRlckZuKHByb3h5KSB9KVxuICAgICAgICAgICAgICB0eXBlb2YgYWZ0ZXJVcGRhdGVGbiA9PT0gJ2Z1bmN0aW9uJyAmJiBuZXh0VGljaygoKSA9PiB7IGFmdGVyVXBkYXRlRm4ocHJveHkpIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlICYmIGZpbHRlcklkID09PSBsb2NhbEZpbHRlcklkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG4gICAgICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiAobWVudS52YWx1ZSA9IGZhbHNlKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TWVudSAoKSB7XG4gICAgICByZXR1cm4gaChRTWVudSwge1xuICAgICAgICByZWY6IG1lbnVSZWYsXG4gICAgICAgIGNsYXNzOiBtZW51Q29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogcHJvcHMucG9wdXBDb250ZW50U3R5bGUsXG4gICAgICAgIG1vZGVsVmFsdWU6IG1lbnUudmFsdWUsXG4gICAgICAgIGZpdDogcHJvcHMubWVudVNocmluayAhPT0gdHJ1ZSxcbiAgICAgICAgY292ZXI6IHByb3BzLm9wdGlvbnNDb3ZlciA9PT0gdHJ1ZSAmJiBub09wdGlvbnMudmFsdWUgIT09IHRydWUgJiYgcHJvcHMudXNlSW5wdXQgIT09IHRydWUsXG4gICAgICAgIGFuY2hvcjogcHJvcHMubWVudUFuY2hvcixcbiAgICAgICAgc2VsZjogcHJvcHMubWVudVNlbGYsXG4gICAgICAgIG9mZnNldDogcHJvcHMubWVudU9mZnNldCxcbiAgICAgICAgZGFyazogaXNPcHRpb25zRGFyay52YWx1ZSxcbiAgICAgICAgbm9QYXJlbnRFdmVudDogdHJ1ZSxcbiAgICAgICAgbm9SZWZvY3VzOiB0cnVlLFxuICAgICAgICBub0ZvY3VzOiB0cnVlLFxuICAgICAgICBzcXVhcmU6IHNxdWFyZWRNZW51LnZhbHVlLFxuICAgICAgICB0cmFuc2l0aW9uU2hvdzogcHJvcHMudHJhbnNpdGlvblNob3csXG4gICAgICAgIHRyYW5zaXRpb25IaWRlOiBwcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgIHNlcGFyYXRlQ2xvc2VQb3B1cDogdHJ1ZSxcbiAgICAgICAgLi4ubGlzdGJveEF0dHJzLnZhbHVlLFxuICAgICAgICBvblNjcm9sbFBhc3NpdmU6IG9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICAgICAgb25CZWZvcmVTaG93OiBvbkNvbnRyb2xQb3B1cFNob3csXG4gICAgICAgIG9uQmVmb3JlSGlkZTogb25NZW51QmVmb3JlSGlkZSxcbiAgICAgICAgb25TaG93OiBvbk1lbnVTaG93XG4gICAgICB9LCBnZXRBbGxPcHRpb25zKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVudUJlZm9yZUhpZGUgKGUpIHtcbiAgICAgIG9uQ29udHJvbFBvcHVwSGlkZShlKVxuICAgICAgY2xvc2VNZW51KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1lbnVTaG93ICgpIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0ZpZWxkRm9jdXMgKGUpIHtcbiAgICAgIHN0b3AoZSlcbiAgICAgIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID0gdHJ1ZVxuICAgICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0ZpZWxkQmx1ciAoZSkge1xuICAgICAgc3RvcChlKVxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREaWFsb2cgKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaChRRmllbGQsIHtcbiAgICAgICAgICBjbGFzczogYGNvbC1hdXRvICR7IHN0YXRlLmZpZWxkQ2xhc3MudmFsdWUgfWAsXG4gICAgICAgICAgLi4uaW5uZXJGaWVsZFByb3BzLnZhbHVlLFxuICAgICAgICAgIGZvcjogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgICAgc3F1YXJlOiB0cnVlLFxuICAgICAgICAgIGxvYWRpbmc6IGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSxcbiAgICAgICAgICBpdGVtQWxpZ25lZDogZmFsc2UsXG4gICAgICAgICAgZmlsbGVkOiB0cnVlLFxuICAgICAgICAgIHN0YWNrTGFiZWw6IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID4gMCxcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmxpc3RlbmVycy52YWx1ZSxcbiAgICAgICAgICBvbkZvY3VzOiBvbkRpYWxvZ0ZpZWxkRm9jdXMsXG4gICAgICAgICAgb25CbHVyOiBvbkRpYWxvZ0ZpZWxkQmx1clxuICAgICAgICB9LCB7XG4gICAgICAgICAgLi4uc2xvdHMsXG4gICAgICAgICAgcmF3Q29udHJvbDogKCkgPT4gc3RhdGUuZ2V0Q29udHJvbCh0cnVlKSxcbiAgICAgICAgICBiZWZvcmU6IHZvaWQgMCxcbiAgICAgICAgICBhZnRlcjogdm9pZCAwXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgY29udGVudC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBtZW51Q29udGVudFJlZixcbiAgICAgICAgICBjbGFzczogbWVudUNvbnRlbnRDbGFzcy52YWx1ZSArICcgc2Nyb2xsJyxcbiAgICAgICAgICBzdHlsZTogcHJvcHMucG9wdXBDb250ZW50U3R5bGUsXG4gICAgICAgICAgLi4ubGlzdGJveEF0dHJzLnZhbHVlLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnQsXG4gICAgICAgICAgb25TY3JvbGxQYXNzaXZlOiBvblZpcnR1YWxTY3JvbGxFdnRcbiAgICAgICAgfSwgZ2V0QWxsT3B0aW9ucygpKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaChRRGlhbG9nLCB7XG4gICAgICAgIHJlZjogZGlhbG9nUmVmLFxuICAgICAgICBtb2RlbFZhbHVlOiBkaWFsb2cudmFsdWUsXG4gICAgICAgIHBvc2l0aW9uOiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSA/ICd0b3AnIDogdm9pZCAwLFxuICAgICAgICB0cmFuc2l0aW9uU2hvdzogdHJhbnNpdGlvblNob3dDb21wdXRlZCxcbiAgICAgICAgdHJhbnNpdGlvbkhpZGU6IHByb3BzLnRyYW5zaXRpb25IaWRlLFxuICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbixcbiAgICAgICAgb25CZWZvcmVTaG93OiBvbkNvbnRyb2xQb3B1cFNob3csXG4gICAgICAgIG9uQmVmb3JlSGlkZTogb25EaWFsb2dCZWZvcmVIaWRlLFxuICAgICAgICBvbkhpZGU6IG9uRGlhbG9nSGlkZSxcbiAgICAgICAgb25TaG93OiBvbkRpYWxvZ1Nob3dcbiAgICAgIH0sICgpID0+IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZGlhbG9nJ1xuICAgICAgICAgICsgKGlzT3B0aW9uc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc2VsZWN0X19kaWFsb2ctLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgICAgICsgKGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zZWxlY3RfX2RpYWxvZy0tZm9jdXNlZCcgOiAnJylcbiAgICAgIH0sIGNvbnRlbnQpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nQmVmb3JlSGlkZSAoZSkge1xuICAgICAgb25Db250cm9sUG9wdXBIaWRlKGUpXG5cbiAgICAgIGlmIChkaWFsb2dSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgZGlhbG9nUmVmLnZhbHVlLl9fdXBkYXRlUmVmb2N1c1RhcmdldChcbiAgICAgICAgICBzdGF0ZS5yb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoJy5xLWZpZWxkX19uYXRpdmUgPiBbdGFiaW5kZXhdOmxhc3QtY2hpbGQnKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nSGlkZSAoZSkge1xuICAgICAgaGlkZVBvcHVwKClcbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlICYmIGVtaXQoJ2JsdXInLCBlKVxuICAgICAgcmVzZXRJbnB1dFZhbHVlKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ1Nob3cgKCkge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICBpZiAoXG4gICAgICAgIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKVxuICAgICAgICAmJiB0YXJnZXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBlbFxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1lbnUgKCkge1xuICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSAtMVxuXG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBtZW51LnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgICAgZmlsdGVySWQgPSB2b2lkIDBcblxuICAgICAgICBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgZW1pdCgnZmlsdGVyLWFib3J0JylcbiAgICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93UG9wdXAgKGUpIHtcbiAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGhhc0RpYWxvZyA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpXG4gICAgICAgIGRpYWxvZy52YWx1ZSA9IHRydWVcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vbkZpbHRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGZpbHRlcihpbnB1dFZhbHVlLnZhbHVlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAobm9PcHRpb25zLnZhbHVlICE9PSB0cnVlIHx8IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgbWVudS52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRlUG9wdXAgKCkge1xuICAgICAgZGlhbG9nLnZhbHVlID0gZmFsc2VcbiAgICAgIGNsb3NlTWVudSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXRJbnB1dFZhbHVlICgpIHtcbiAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHVwZGF0ZUlucHV0VmFsdWUoXG4gICAgICAgIHByb3BzLm11bHRpcGxlICE9PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSAmJiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSkgfHwgJydcbiAgICAgICAgICA6ICcnLFxuICAgICAgICB0cnVlLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWVudSAoc2hvdykge1xuICAgICAgbGV0IG9wdGlvbkluZGV4ID0gLTFcblxuICAgICAgaWYgKHNob3cgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHZhbCA9IGdldE9wdGlvblZhbHVlLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSlcbiAgICAgICAgICBvcHRpb25JbmRleCA9IHByb3BzLm9wdGlvbnMuZmluZEluZGV4KHYgPT4gaXNEZWVwRXF1YWwoZ2V0T3B0aW9uVmFsdWUudmFsdWUodiksIHZhbCkpXG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbChvcHRpb25JbmRleClcbiAgICAgIH1cblxuICAgICAgc2V0T3B0aW9uSW5kZXgob3B0aW9uSW5kZXgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVyZW5kZXJNZW51IChuZXdMZW5ndGgsIG9sZExlbmd0aCkge1xuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgtMSwgdHJ1ZSlcblxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKG5ld0xlbmd0aCA+IG9sZExlbmd0aCkge1xuICAgICAgICAgICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdXBkYXRlTWVudSh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNZW51UG9zaXRpb24gKCkge1xuICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gZmFsc2UgJiYgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtZW51UmVmLnZhbHVlLnVwZGF0ZVBvc2l0aW9uKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRyb2xQb3B1cFNob3cgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG4gICAgICBlbWl0KCdwb3B1cC1zaG93JywgZSlcbiAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9IHRydWVcbiAgICAgIHN0YXRlLm9uQ29udHJvbEZvY3VzaW4oZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRyb2xQb3B1cEhpZGUgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG4gICAgICBlbWl0KCdwb3B1cC1oaWRlJywgZSlcbiAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9IGZhbHNlXG4gICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c291dChlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVByZVN0YXRlICgpIHtcbiAgICAgIGhhc0RpYWxvZyA9ICRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5iZWhhdmlvciAhPT0gJ2RpYWxvZydcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHByb3BzLmJlaGF2aW9yICE9PSAnbWVudScgJiYgKFxuICAgICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICAgICA/IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDAgfHwgcHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCB8fCBub09wdGlvbnMudmFsdWUgPT09IGZhbHNlXG4gICAgICAgICAgICA6IHRydWVcbiAgICAgICAgKVxuXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkID0gJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlICYmIGhhc0RpYWxvZyA9PT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICA/ICdmYWRlJ1xuICAgICAgICA6IHByb3BzLnRyYW5zaXRpb25TaG93XG4gICAgfVxuXG4gICAgb25CZWZvcmVVcGRhdGUodXBkYXRlUHJlU3RhdGUpXG4gICAgb25VcGRhdGVkKHVwZGF0ZU1lbnVQb3NpdGlvbilcblxuICAgIHVwZGF0ZVByZVN0YXRlKClcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoaW5wdXRUaW1lcilcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgc2hvd1BvcHVwLCBoaWRlUG9wdXAsXG4gICAgICByZW1vdmVBdEluZGV4LCBhZGQsIHRvZ2dsZU9wdGlvbixcbiAgICAgIGdldE9wdGlvbkluZGV4OiAoKSA9PiBvcHRpb25JbmRleC52YWx1ZSxcbiAgICAgIHNldE9wdGlvbkluZGV4LCBtb3ZlT3B0aW9uU2VsZWN0aW9uLFxuICAgICAgZmlsdGVyLCB1cGRhdGVNZW51UG9zaXRpb24sIHVwZGF0ZUlucHV0VmFsdWUsXG4gICAgICBpc09wdGlvblNlbGVjdGVkLFxuICAgICAgZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZSxcbiAgICAgIGlzT3B0aW9uRGlzYWJsZWQ6ICguLi5hcmdzKSA9PiBpc09wdGlvbkRpc2FibGVkLnZhbHVlLmFwcGx5KG51bGwsIGFyZ3MpID09PSB0cnVlLFxuICAgICAgZ2V0T3B0aW9uVmFsdWU6ICguLi5hcmdzKSA9PiBnZXRPcHRpb25WYWx1ZS52YWx1ZS5hcHBseShudWxsLCBhcmdzKSxcbiAgICAgIGdldE9wdGlvbkxhYmVsOiAoLi4uYXJncykgPT4gZ2V0T3B0aW9uTGFiZWwudmFsdWUuYXBwbHkobnVsbCwgYXJncylcbiAgICB9KVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgaW5uZXJWYWx1ZSxcblxuICAgICAgZmllbGRDbGFzczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgYHEtc2VsZWN0IHEtZmllbGQtLWF1dG8taGVpZ2h0IHEtc2VsZWN0LS13aXRoJHsgcHJvcHMudXNlSW5wdXQgIT09IHRydWUgPyAnb3V0JyA6ICcnIH0taW5wdXRgXG4gICAgICAgICsgYCBxLXNlbGVjdC0td2l0aCR7IHByb3BzLnVzZUNoaXBzICE9PSB0cnVlID8gJ291dCcgOiAnJyB9LWNoaXBzYFxuICAgICAgICArIGAgcS1zZWxlY3QtLSR7IHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gJ211bHRpcGxlJyA6ICdzaW5nbGUnIH1gXG4gICAgICApLFxuXG4gICAgICBpbnB1dFJlZixcbiAgICAgIHRhcmdldFJlZixcbiAgICAgIGhhc1ZhbHVlLFxuICAgICAgc2hvd1BvcHVwLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICAocHJvcHMuaGlkZVNlbGVjdGVkICE9PSB0cnVlICYmIGhhc1ZhbHVlLnZhbHVlID09PSB0cnVlKVxuICAgICAgICB8fCB0eXBlb2YgaW5wdXRWYWx1ZS52YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgfHwgaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggPiAwXG4gICAgICAgIHx8IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5kaXNwbGF5VmFsdWUpXG4gICAgICApLFxuXG4gICAgICBnZXRDb250cm9sQ2hpbGQ6ICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSBmYWxzZSAmJiAoXG4gICAgICAgICAgICBkaWFsb2cudmFsdWUgPT09IHRydWUgLy8gZGlhbG9nIGFsd2F5cyBoYXMgbWVudSBkaXNwbGF5ZWQsIHNvIG5lZWQgdG8gcmVuZGVyIGl0XG4gICAgICAgICAgICB8fCBub09wdGlvbnMudmFsdWUgIT09IHRydWVcbiAgICAgICAgICAgIHx8IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDBcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBoYXNEaWFsb2cgPT09IHRydWUgPyBnZXREaWFsb2coKSA6IGdldE1lbnUoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmhhc1BvcHVwT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGV4cGxpY2l0bHkgc2V0IGl0IG90aGVyd2lzZSBUQUIgd2lsbCBub3QgYmx1ciBjb21wb25lbnRcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBjb250cm9sRXZlbnRzOiB7XG4gICAgICAgIG9uRm9jdXNpbiAoZSkgeyBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpIH0sXG4gICAgICAgIG9uRm9jdXNvdXQgKGUpIHtcbiAgICAgICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c291dChlLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNldElucHV0VmFsdWUoKVxuICAgICAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBvbkNsaWNrIChlKSB7XG4gICAgICAgICAgLy8gbGFiZWwgZnJvbSBRRmllbGQgd2lsbCBwcm9wYWdhdGUgY2xpY2sgb24gdGhlIGlucHV0XG4gICAgICAgICAgcHJldmVudChlKVxuXG4gICAgICAgICAgaWYgKGhhc0RpYWxvZyAhPT0gdHJ1ZSAmJiBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsICYmIHRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaG93UG9wdXAoZSlcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZ2V0Q29udHJvbDogZnJvbURpYWxvZyA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgY29uc3QgaXNUYXJnZXQgPSBmcm9tRGlhbG9nID09PSB0cnVlIHx8IGRpYWxvZy52YWx1ZSAhPT0gdHJ1ZSB8fCBoYXNEaWFsb2cgIT09IHRydWVcblxuICAgICAgICBpZiAocHJvcHMudXNlSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICBjaGlsZC5wdXNoKGdldElucHV0KGZyb21EaWFsb2csIGlzVGFyZ2V0KSlcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVyZSBjYW4gYmUgb25seSBvbmUgKHdoZW4gZGlhbG9nIGlzIG9wZW5lZCB0aGUgY29udHJvbCBpbiBkaWFsb2cgc2hvdWxkIGJlIHRhcmdldClcbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBhdHRycyA9IGlzVGFyZ2V0ID09PSB0cnVlID8gY29tYm9ib3hBdHRycy52YWx1ZSA6IHZvaWQgMFxuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICAgICAgICByZWY6IGlzVGFyZ2V0ID09PSB0cnVlID8gdGFyZ2V0UmVmIDogdm9pZCAwLFxuICAgICAgICAgICAgICBrZXk6ICdkX3QnLFxuICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19mb2N1cy10YXJnZXQnLFxuICAgICAgICAgICAgICBpZDogaXNUYXJnZXQgPT09IHRydWUgPyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgOiB2b2lkIDAsXG4gICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiAoZnJvbURpYWxvZyAhPT0gdHJ1ZSAmJiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUpIHx8IHZvaWQgMCxcbiAgICAgICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgICAgIG9uS2V5ZG93bjogb25UYXJnZXRLZXlkb3duLFxuICAgICAgICAgICAgICBvbktleXVwOiBvblRhcmdldEtleXVwLFxuICAgICAgICAgICAgICBvbktleXByZXNzOiBvblRhcmdldEtleXByZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChpc1RhcmdldCA9PT0gdHJ1ZSAmJiB0eXBlb2YgcHJvcHMuYXV0b2NvbXBsZXRlID09PSAnc3RyaW5nJyAmJiBwcm9wcy5hdXRvY29tcGxldGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fYXV0b2NvbXBsZXRlLWlucHV0JyxcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IHByb3BzLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgICAgICAgICBvbktleXVwOiBvblRhcmdldEF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lUHJvcC52YWx1ZSAhPT0gdm9pZCAwICYmIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaW5uZXJPcHRpb25zVmFsdWUudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IG9wdHMgPSBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5tYXAodmFsdWUgPT4gaCgnb3B0aW9uJywgeyB2YWx1ZSwgc2VsZWN0ZWQ6IHRydWUgfSkpXG5cbiAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgaCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAgICAgICBtdWx0aXBsZTogcHJvcHMubXVsdGlwbGVcbiAgICAgICAgICAgIH0sIG9wdHMpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXR0cnMgPSBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSB8fCBpc1RhcmdldCAhPT0gdHJ1ZSA/IHZvaWQgMCA6IHN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgLi4uYXR0cnNcbiAgICAgICAgfSwgY2hpbGQpXG4gICAgICB9LFxuXG4gICAgICBnZXRJbm5lckFwcGVuZDogKCkgPT4gKFxuICAgICAgICBwcm9wcy5sb2FkaW5nICE9PSB0cnVlICYmIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy5oaWRlRHJvcGRvd25JY29uICE9PSB0cnVlXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19kcm9wZG93bi1pY29uJyArIChtZW51LnZhbHVlID09PSB0cnVlID8gJyByb3RhdGUtMTgwJyA6ICcnKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBkcm9wZG93bkFycm93SWNvbi52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogbnVsbFxuICAgICAgKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdXNlRmllbGQoc3RhdGUpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLXNlbGVjdFxuICAgIHJlZj1cImJhc2VTZWxlY3RcIlxuICAgIGNsYXNzPVwiYmFzZS1zZWxlY3RcIlxuICAgIHYtbW9kZWw9XCJ2YWx1ZVwiXG4gICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgIDpvcHRpb25zPVwib3B0aW9uc1wiXG4gICAgOmJnQ29sb3I9XCJiZ0NvbG9yXCJcbiAgICA6dXNlQ2hpcHM9XCJ1c2VDaGlwc1wiXG4gICAgOnVzZUlucHV0PVwidXNlSW5wdXRcIlxuICAgIDptYXBPcHRpb25zPVwibWFwT3B0aW9uc1wiXG4gICAgOmlucHV0RGVib3VuY2U9XCJpbnB1dERlYm91bmNlXCJcbiAgICA6ZGVib3VuY2U9XCJkZWJvdW5jZVwiXG4gICAgOm5ld1ZhbHVlTW9kZT1cIm5ld1ZhbHVlTW9kZVwiXG4gICAgOm9wdGlvbkxhYmVsPVwib3B0aW9uTGFiZWxcIlxuICAgIDpvcHRpb25WYWx1ZT1cIm9wdGlvblZhbHVlXCJcbiAgICA6b3B0aW9uc0RlbnNlPVwib3B0aW9uc0RlbnNlXCJcbiAgICBwb3B1cC1jb250ZW50LWNsYXNzPVwicS1wYS1zbSBiYXNlLWRyb3Bkb3duXCJcbiAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwib25DaGFuZ2VcIlxuICAgIEBmaWx0ZXI9XCJvbkZpbHRlclwiXG4gICAgQG5ldy12YWx1ZT1cIm9uTmV3VmFsdWVcIlxuICA+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCJpY29uXCIgdi1zbG90OnByZXBlbmQ+XG4gICAgICA8cS1pY29uIHNpemU9XCJ4c1wiIDpuYW1lPVwiaWNvblwiIC8+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1pZj1cIiF1c2VJbnB1dCAmJiBzaG93UGxhY2Vob2xkZXJcIiB2LXNsb3Q6c2VsZWN0ZWQ+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ncmV5LThcIj57eyBwbGFjZWhvbGRlciB9fTwvZGl2PlxuICAgIDwvdGVtcGxhdGU+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCJ1c2VGaWx0ZXJcIiB2LXNsb3Q6YmVmb3JlLW9wdGlvbnM+XG4gICAgICA8c2xvdCBuYW1lPVwiYmVmb3JlLW9wdGlvbnNcIj5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LWlmPVwiIXVzZUlucHV0XCJcbiAgICAgICAgICBjbGFzcz1cInEtbWItc20gYmFzZS1kcm9wZG93bi1maWx0ZXJcIlxuICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJvbkxvYWRGcm9tU2VydmVyXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjUwMFwiXG4gICAgICAgICAgZGVib3VuY2U9XCI1MDBcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICAgICAgPHEtaWNvbiBzaXplPVwieHNcIiBuYW1lPVwiZmFsIGZhLXNlYXJjaFwiIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIm5ld1ZhbHVlTW9kZSAmJiBmaWx0ZXJcIiB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgIGljb249XCJjb250cm9sX3BvaW50XCJcbiAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgQGNsaWNrPVwib25DcmVhdGVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICA8L3Nsb3Q+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmFmdGVyLW9wdGlvbnM+XG4gICAgICA8c2xvdCBuYW1lPVwiYWZ0ZXItb3B0aW9uc1wiPjwvc2xvdD5cbiAgICAgIDxzbG90IG5hbWU9XCJidXR0b25cIiB2LWJpbmQ6b25DcmVhdGU9XCJvbkNyZWF0ZVwiPlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIm5ld1ZhbHVlTW9kZSAmJiBmaWx0ZXJcIj5cbiAgICAgICAgICA8cS1pdGVtIGRlbnNlIGNsYXNzPVwicS1wYS1ub25lXCI+XG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBuby1jYXBzXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJhZGQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBhbGlnbj1cImxlZnRcIlxuICAgICAgICAgICAgICAgIGljb249XCJmYWQgZmEtcGx1cy1jaXJjbGVcIlxuICAgICAgICAgICAgICAgIDpsYWJlbD1cImBBZGQgJHtmaWx0ZXJ9YFwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwib25DcmVhdGVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvc2xvdD5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bm8tb3B0aW9uPlxuICAgICAgPHNsb3QgbmFtZT1cIm5vLW9wdGlvblwiPlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtaWY9XCIhdXNlSW5wdXRcIlxuICAgICAgICAgIGNsYXNzPVwicS1tYi1zbSBiYXNlLWRyb3Bkb3duLWZpbHRlclwiXG4gICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIm9uTG9hZEZyb21TZXJ2ZXJcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGlucHV0LWRlYm91bmNlPVwiNTAwXCJcbiAgICAgICAgICBkZWJvdW5jZT1cIjUwMFwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQ+XG4gICAgICAgICAgICA8cS1pY29uIHNpemU9XCJ4c1wiIG5hbWU9XCJmYWwgZmEtc2VhcmNoXCIgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDxxLWl0ZW0gdi1jbG9zZS1wb3B1cCBjbGlja2FibGUgY2xhc3M9XCJuby1vcHRpb25zXCI+XG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwidGV4dC1ncmV5XCI+e3sgbm9PcHRpb25NZXNzYWdlIH19PC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgPC9xLWl0ZW0+XG4gICAgICA8L3Nsb3Q+XG4gICAgICA8c2xvdCBuYW1lPVwiYnV0dG9uXCIgdi1iaW5kOm9uQ3JlYXRlPVwib25DcmVhdGVcIj5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJuZXdWYWx1ZU1vZGUgJiYgZmlsdGVyXCI+XG4gICAgICAgICAgPHEtaXRlbSBkZW5zZSBjbGFzcz1cInEtcGEtbm9uZVwiPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgICAgIGNsYXNzPVwiYWRkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgYWxpZ249XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICBpY29uPVwiZmFkIGZhLXBsdXMtY2lyY2xlXCJcbiAgICAgICAgICAgICAgICA6bGFiZWw9XCJgQWRkICR7ZmlsdGVyfWBcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uQ3JlYXRlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3Nsb3Q+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgIDxzbG90IG5hbWU9XCJhcHBlbmRcIj48L3Nsb3Q+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9xLXNlbGVjdD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5jb25zdCB2YWxpZGF0ZU5ld1ZhbHVlTW9kZSA9ICh2KSA9PiBbJ2FkZCcsICdhZGQtdW5pcXVlJywgJ3RvZ2dsZSddLmluY2x1ZGVzKHYpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICBmaWx0ZXJNZXRob2Q6IEZ1bmN0aW9uLFxuICAgIHBsYWNlaG9sZGVyOiBTdHJpbmcsXG4gICAgbWFwT3B0aW9uczoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW0Jvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICB9LFxuICAgIG9wdGlvbnNEZW5zZToge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW0Jvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICB9LFxuICAgIGljb246IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEJvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICBub09wdGlvbk1lc3NhZ2U6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJ05vIG9wdGlvbiBmb3VuZC4nLFxuICAgIH0sXG4gICAgdXNlSW5wdXQ6IEJvb2xlYW4sXG4gICAgdXNlQ2hpcHM6IEJvb2xlYW4sXG4gICAgbmV3VmFsdWVNb2RlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlTmV3VmFsdWVNb2RlLFxuICAgIH0sXG4gICAgb25OZXdWYWx1ZTogRnVuY3Rpb24sXG4gICAgcHJldmVudERlZmF1bHQ6IEJvb2xlYW4sXG4gICAgdXNlRmlsdGVyOiBCb29sZWFuLFxuICAgIG9wdGlvblZhbHVlOiBbRnVuY3Rpb24sIFN0cmluZ10sXG4gICAgb3B0aW9uTGFiZWw6IFtGdW5jdGlvbiwgU3RyaW5nXSxcbiAgICBvcHRpb25EaXNhYmxlOiBbRnVuY3Rpb24sIFN0cmluZ10sXG4gICAgcXVlcnk6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtGdW5jdGlvbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiAodmFsKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZmlsdGVyOiB2YWwsXG4gICAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0sXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgYmdDb2xvcjogU3RyaW5nLFxuICAgIGlucHV0RGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiA1MDAsXG4gICAgfSxcbiAgICBkZWJvdW5jZToge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDUwMCxcbiAgICB9LFxuICB9LFxuICBlbWl0czogWyd1cGRhdGU6bW9kZWwtdmFsdWUnLCAnbmV3LXZhbHVlJ10sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB0aGlzLm1vZGVsVmFsdWUsXG4gICAgICBvcHRpb25zOiBbXSxcbiAgICAgIGZpbHRlcjogJycsXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uRmlsdGVyKHZhbCwgdXBkYXRlLCBhYm9ydCkge1xuICAgICAgY29uc29sZS5mdW5jKCdjb21wb25lbnRzL2Jhc2UvQmFzZVNlbGVjdDptZXRob2RzLm9uRmlsdGVyKCknLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKCF0aGlzLmZpbHRlck1ldGhvZCkgcmV0dXJuIHVwZGF0ZSgpO1xuICAgICAgaWYgKHRoaXMuZmlsdGVyTWV0aG9kICYmICF2YWwpIHJldHVybiBhYm9ydCgpO1xuICAgICAgdGhpcy5maWx0ZXIgPSB2YWw7XG4gICAgICB0aGlzLmZpbHRlck1ldGhvZCh0aGlzLnF1ZXJ5KHZhbCkpXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHVwZGF0ZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBkYXRhO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25Mb2FkRnJvbVNlcnZlcih2YWwpIHtcbiAgICAgIGlmICghdGhpcy5maWx0ZXJNZXRob2QpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL0Jhc2VTZWxlY3Q6bWV0aG9kcy5vbkxvYWRGcm9tU2VydmVyKCknLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy5maWx0ZXJNZXRob2QodGhpcy5xdWVyeSh2YWwpKS50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBkYXRhO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbkNoYW5nZSh2YWwpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL0Jhc2VTZWxlY3Q6bWV0aG9kcy5vbkNoYW5nZSgpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTptb2RlbC12YWx1ZScsIHZhbCk7XG4gICAgfSxcbiAgICBvbkNyZWF0ZSgpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL0Jhc2VTZWxlY3Q6bWV0aG9kcy5vbkNyZWF0ZSgpJywgYXJndW1lbnRzKTtcbiAgICAgIGlmICh0aGlzLm9uTmV3VmFsdWUgIT09IHZvaWQgMCkge1xuICAgICAgICB0aGlzLiRlbWl0KCduZXctdmFsdWUnLCB0aGlzLmZpbHRlciwgdGhpcy5kb25lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZG9uZSh0aGlzLmZpbHRlcik7XG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlciA9IG51bGw7XG4gICAgfSxcbiAgICBjbGVhcigpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL0Jhc2VTZWxlY3Q6bWV0aG9kcy5jbGVhcigpJywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOm1vZGVsLXZhbHVlJywgbnVsbCk7XG4gICAgfSxcbiAgICBkb25lKHZhbCwgbW9kZSkge1xuICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRlTmV3VmFsdWVNb2RlKG1vZGUpICE9PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2RlID0gdGhpcy5uZXdWYWx1ZU1vZGU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRyZWZzLmJhc2VTZWxlY3QudXBkYXRlSW5wdXRWYWx1ZSgnJywgdGhpcy5tdWx0aXBsZSAhPT0gdHJ1ZSwgdHJ1ZSk7XG4gICAgICBjb25zdCBmbiA9IG1vZGUgPT09ICd0b2dnbGUnID8gdGhpcy4kcmVmcy5iYXNlU2VsZWN0LnRvZ2dsZU9wdGlvbiA6IHRoaXMuJHJlZnMuYmFzZVNlbGVjdC5hZGQ7XG4gICAgICBmbih2YWwsIG1vZGUgPT09ICdhZGQtdW5pcXVlJyk7XG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLiRyZWZzLmJhc2VTZWxlY3QuZm9jdXMoKTtcbiAgICAgICAgdGhpcy4kcmVmcy5iYXNlU2VsZWN0LmhpZGVQb3B1cCgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvd1BsYWNlaG9sZGVyKCkge1xuICAgICAgcmV0dXJuICghdGhpcy52YWx1ZSAmJiAhdGhpcy51c2VDaGlwcykgfHwgIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPCAxO1xuICAgIH0sXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgIGhhbmRsZXIodmFsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIGNsYXNzPVwiYmFzZS1pY29uLWxhYmVsXCJcbiAgICA6cmlwcGxlPVwiZmFsc2VcIlxuICAgIGRlbnNlXG4gICAgZmxhdFxuICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgOmljb249XCJpY29uXCJcbiAgICA6bGFiZWw9XCJsYWJlbFwiXG4gICAgbm8tY2Fwc1xuICAvPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGQnLFxuXG4gIHByb3BzOiB7XG4gICAgcHJvcHM6IE9iamVjdCxcbiAgICBhdXRvV2lkdGg6IEJvb2xlYW4sXG4gICAgbm9Ib3ZlcjogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGQnICsgKHByb3BzLmF1dG9XaWR0aCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tY29sLWF1dG8td2lkdGgnIDogJycpXG4gICAgICArIChwcm9wcy5ub0hvdmVyID09PSB0cnVlID8gJyBxLXRkLS1uby1ob3ZlcicgOiAnJylcbiAgICAgICsgJyAnXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5wcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCd0ZCcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5hbWUgPSB2bS52bm9kZS5rZXlcbiAgICAgIGNvbnN0IGNvbCA9IChcbiAgICAgICAgKHByb3BzLnByb3BzLmNvbHNNYXAgIT09IHZvaWQgMCA/IHByb3BzLnByb3BzLmNvbHNNYXBbIG5hbWUgXSA6IG51bGwpXG4gICAgICAgIHx8IHByb3BzLnByb3BzLmNvbFxuICAgICAgKVxuXG4gICAgICBpZiAoY29sID09PSB2b2lkIDApIHsgcmV0dXJuIH1cblxuICAgICAgY29uc3QgeyByb3cgfSA9IHByb3BzLnByb3BzXG5cbiAgICAgIHJldHVybiBoKCd0ZCcsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUgKyBjb2wuX190ZENsYXNzKHJvdyksXG4gICAgICAgIHN0eWxlOiBjb2wuX190ZFN0eWxlKHJvdylcbiAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhVbmlxdWVTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGgnLFxuXG4gIHByb3BzOiB7XG4gICAgcHJvcHM6IE9iamVjdCxcbiAgICBhdXRvV2lkdGg6IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogWyAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSB2bVxuXG4gICAgY29uc3Qgb25DbGljayA9IGV2dCA9PiB7IGVtaXQoJ2NsaWNrJywgZXZ0KSB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnByb3BzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGgoJ3RoJywge1xuICAgICAgICAgIGNsYXNzOiBwcm9wcy5hdXRvV2lkdGggPT09IHRydWUgPyAncS10YWJsZS0tY29sLWF1dG8td2lkdGgnIDogJycsXG4gICAgICAgICAgb25DbGlja1xuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgIH1cblxuICAgICAgbGV0IGNvbCwgY2hpbGRcbiAgICAgIGNvbnN0IG5hbWUgPSB2bS52bm9kZS5rZXlcblxuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgY29sID0gcHJvcHMucHJvcHMuY29sc01hcFsgbmFtZSBdXG4gICAgICAgIGlmIChjb2wgPT09IHZvaWQgMCkgeyByZXR1cm4gfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbCA9IHByb3BzLnByb3BzLmNvbFxuICAgICAgfVxuXG4gICAgICBpZiAoY29sLnNvcnRhYmxlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNvbC5hbGlnbiA9PT0gJ3JpZ2h0J1xuICAgICAgICAgID8gJ3Vuc2hpZnQnXG4gICAgICAgICAgOiAncHVzaCdcblxuICAgICAgICBjaGlsZCA9IGhVbmlxdWVTbG90KHNsb3RzLmRlZmF1bHQsIFtdKVxuICAgICAgICBjaGlsZFsgYWN0aW9uIF0oXG4gICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgY2xhc3M6IGNvbC5fX2ljb25DbGFzcyxcbiAgICAgICAgICAgIG5hbWU6ICRxLmljb25TZXQudGFibGUuYXJyb3dVcFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IGhTbG90KHNsb3RzLmRlZmF1bHQpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBjb2wuX190aENsYXNzXG4gICAgICAgICAgKyAocHJvcHMuYXV0b1dpZHRoID09PSB0cnVlID8gJyBxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgOiAnJyksXG4gICAgICAgIHN0eWxlOiBjb2wuaGVhZGVyU3R5bGUsXG4gICAgICAgIG9uQ2xpY2s6IGV2dCA9PiB7XG4gICAgICAgICAgY29sLnNvcnRhYmxlID09PSB0cnVlICYmIHByb3BzLnByb3BzLnNvcnQoY29sKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgb25DbGljayhldnQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ3RoJywgZGF0YSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5jb25zdCBzZXBhcmF0b3JWYWx1ZXMgPSBbICdob3Jpem9udGFsJywgJ3ZlcnRpY2FsJywgJ2NlbGwnLCAnbm9uZScgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUU1hcmt1cFRhYmxlJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIHdyYXBDZWxsczogQm9vbGVhbixcblxuICAgIHNlcGFyYXRvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2hvcml6b250YWwnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHNlcGFyYXRvclZhbHVlcy5pbmNsdWRlcyh2KVxuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbWFya3VwLXRhYmxlIHEtdGFibGVfX2NvbnRhaW5lciBxLXRhYmxlX19jYXJkJ1xuICAgICAgKyBgIHEtdGFibGUtLSR7IHByb3BzLnNlcGFyYXRvciB9LXNlcGFyYXRvcmBcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZGFyayBxLXRhYmxlX19jYXJkLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXRhYmxlLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLmZsYXQgPT09IHRydWUgPyAnIHEtdGFibGUtLWZsYXQnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtdGFibGUtLXNxdWFyZScgOiAnJylcbiAgICAgICsgKHByb3BzLndyYXBDZWxscyA9PT0gZmFsc2UgPyAnIHEtdGFibGUtLW5vLXdyYXAnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlXG4gICAgfSwgW1xuICAgICAgaCgndGFibGUnLCB7IGNsYXNzOiAncS10YWJsZScgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgXSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgY29udGVudCkge1xuICByZXR1cm4gaCgnZGl2JywgcHJvcHMsIFtcbiAgICBoKCd0YWJsZScsIHsgY2xhc3M6ICdxLXRhYmxlJyB9LCBjb250ZW50KVxuICBdKVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlTW91bnQsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFMaXN0IGZyb20gJy4uL2l0ZW0vUUxpc3QuanMnXG5pbXBvcnQgUU1hcmt1cFRhYmxlIGZyb20gJy4uL21hcmt1cC10YWJsZS9RTWFya3VwVGFibGUuanMnXG5pbXBvcnQgZ2V0VGFibGVNaWRkbGUgZnJvbSAnLi4vdGFibGUvZ2V0LXRhYmxlLW1pZGRsZS5qcydcblxuaW1wb3J0IHsgdXNlVmlydHVhbFNjcm9sbCwgdXNlVmlydHVhbFNjcm9sbFByb3BzIH0gZnJvbSAnLi91c2UtdmlydHVhbC1zY3JvbGwuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsVGFyZ2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cyB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5jb25zdCBjb21wcyA9IHtcbiAgbGlzdDogUUxpc3QsXG4gIHRhYmxlOiBRTWFya3VwVGFibGVcbn1cblxuY29uc3QgdHlwZU9wdGlvbnMgPSBbICdsaXN0JywgJ3RhYmxlJywgJ19fcXRhYmxlJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVmlydHVhbFNjcm9sbCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VWaXJ0dWFsU2Nyb2xsUHJvcHMsXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbGlzdCcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gdHlwZU9wdGlvbnMuaW5jbHVkZXModilcbiAgICB9LFxuXG4gICAgaXRlbXM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuXG4gICAgaXRlbXNGbjogRnVuY3Rpb24sXG4gICAgaXRlbXNTaXplOiBOdW1iZXIsXG5cbiAgICBzY3JvbGxUYXJnZXQ6IHtcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGF0dHJzIH0pIHtcbiAgICBsZXQgbG9jYWxTY3JvbGxUYXJnZXRcbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuaXRlbXNTaXplID49IDAgJiYgcHJvcHMuaXRlbXNGbiAhPT0gdm9pZCAwXG4gICAgICAgID8gcGFyc2VJbnQocHJvcHMuaXRlbXNTaXplLCAxMClcbiAgICAgICAgOiAoQXJyYXkuaXNBcnJheShwcm9wcy5pdGVtcykgPyBwcm9wcy5pdGVtcy5sZW5ndGggOiAwKVxuICAgICkpXG5cbiAgICBjb25zdCB7XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSxcbiAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsLFxuICAgICAgcGFkVmlydHVhbFNjcm9sbCxcbiAgICAgIG9uVmlydHVhbFNjcm9sbEV2dFxuICAgIH0gPSB1c2VWaXJ0dWFsU2Nyb2xsKHtcbiAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgsIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQsIGdldFZpcnR1YWxTY3JvbGxFbFxuICAgIH0pXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2NvcGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAodmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFwRm4gPSAoaXRlbSwgaSkgPT4gKHtcbiAgICAgICAgaW5kZXg6IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20gKyBpLFxuICAgICAgICBpdGVtXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gcHJvcHMuaXRlbXNGbiA9PT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMuaXRlbXMuc2xpY2UodmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSwgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG8pLm1hcChtYXBGbilcbiAgICAgICAgOiBwcm9wcy5pdGVtc0ZuKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvIC0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSkubWFwKG1hcEZuKVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXZpcnR1YWwtc2Nyb2xsIHEtdmlydHVhbC1zY3JvbGwnICsgKHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsID09PSB0cnVlID8gJy0taG9yaXpvbnRhbCcgOiAnLS12ZXJ0aWNhbCcpXG4gICAgICArIChwcm9wcy5zY3JvbGxUYXJnZXQgIT09IHZvaWQgMCA/ICcnIDogJyBzY3JvbGwnKVxuICAgIClcblxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zY3JvbGxUYXJnZXQgIT09IHZvaWQgMCA/IHt9IDogeyB0YWJpbmRleDogMCB9XG4gICAgKSlcblxuICAgIHdhdGNoKHZpcnR1YWxTY3JvbGxMZW5ndGgsICgpID0+IHtcbiAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2Nyb2xsVGFyZ2V0LCAoKSA9PiB7XG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsRWwgKCkge1xuICAgICAgcmV0dXJuIHJvb3RSZWYudmFsdWUuJGVsIHx8IHJvb3RSZWYudmFsdWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIHJldHVybiBsb2NhbFNjcm9sbFRhcmdldFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBsb2NhbFNjcm9sbFRhcmdldCA9IGdldFNjcm9sbFRhcmdldChnZXRWaXJ0dWFsU2Nyb2xsRWwoKSwgcHJvcHMuc2Nyb2xsVGFyZ2V0KVxuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25WaXJ0dWFsU2Nyb2xsRXZ0LCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25WaXJ0dWFsU2Nyb2xsRXZ0LCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0ID0gdm9pZCAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX19nZXRWaXJ0dWFsQ2hpbGRyZW4gKCkge1xuICAgICAgbGV0IGNoaWxkID0gcGFkVmlydHVhbFNjcm9sbChcbiAgICAgICAgcHJvcHMudHlwZSA9PT0gJ2xpc3QnID8gJ2RpdicgOiAndGJvZHknLFxuICAgICAgICB2aXJ0dWFsU2Nyb2xsU2NvcGUudmFsdWUubWFwKHNsb3RzLmRlZmF1bHQpXG4gICAgICApXG5cbiAgICAgIGlmIChzbG90cy5iZWZvcmUgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZCA9IHNsb3RzLmJlZm9yZSgpLmNvbmNhdChjaGlsZClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhNZXJnZVNsb3Qoc2xvdHMuYWZ0ZXIsIGNoaWxkKVxuICAgIH1cblxuICAgIG9uQmVmb3JlTW91bnQoKCkgPT4ge1xuICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwoKVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoc2xvdHMuZGVmYXVsdCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1FWaXJ0dWFsU2Nyb2xsOiBkZWZhdWx0IHNjb3BlZCBzbG90IGlzIHJlcXVpcmVkIGZvciByZW5kZXJpbmcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzLnR5cGUgPT09ICdfX3F0YWJsZSdcbiAgICAgICAgPyBnZXRUYWJsZU1pZGRsZShcbiAgICAgICAgICB7IHJlZjogcm9vdFJlZiwgY2xhc3M6ICdxLXRhYmxlX19taWRkbGUgJyArIGNsYXNzZXMudmFsdWUgfSxcbiAgICAgICAgICBfX2dldFZpcnR1YWxDaGlsZHJlbigpXG4gICAgICAgIClcbiAgICAgICAgOiBoKGNvbXBzWyBwcm9wcy50eXBlIF0sIHtcbiAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICByZWY6IHJvb3RSZWYsXG4gICAgICAgICAgY2xhc3M6IFsgYXR0cnMuY2xhc3MsIGNsYXNzZXMudmFsdWUgXSxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlXG4gICAgICAgIH0sIF9fZ2V0VmlydHVhbENoaWxkcmVuKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFNpemVzID0ge1xuICB4czogMixcbiAgc206IDQsXG4gIG1kOiA2LFxuICBsZzogMTAsXG4gIHhsOiAxNFxufVxuXG5mdW5jdGlvbiB3aWR0aCAodmFsLCByZXZlcnNlLCAkcSkge1xuICByZXR1cm4ge1xuICAgIHRyYW5zZm9ybTogcmV2ZXJzZSA9PT0gdHJ1ZVxuICAgICAgPyBgdHJhbnNsYXRlWCgkeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICctJyA6ICcnIH0xMDAlKSBzY2FsZTNkKCR7IC12YWwgfSwxLDEpYFxuICAgICAgOiBgc2NhbGUzZCgkeyB2YWwgfSwxLDEpYFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTGluZWFyUHJvZ3Jlc3MnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBidWZmZXI6IE51bWJlcixcblxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgdHJhY2tDb2xvcjogU3RyaW5nLFxuXG4gICAgcmV2ZXJzZTogQm9vbGVhbixcbiAgICBzdHJpcGU6IEJvb2xlYW4sXG4gICAgaW5kZXRlcm1pbmF0ZTogQm9vbGVhbixcbiAgICBxdWVyeTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuLFxuXG4gICAgYW5pbWF0aW9uU3BlZWQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDIxMDBcbiAgICB9LFxuXG4gICAgaW5zdGFudEZlZWRiYWNrOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IG1vdGlvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLmluZGV0ZXJtaW5hdGUgPT09IHRydWUgfHwgcHJvcHMucXVlcnkgPT09IHRydWUpXG4gICAgY29uc3Qgd2lkdGhSZXZlcnNlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMucmV2ZXJzZSAhPT0gcHJvcHMucXVlcnkpXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgLi4uKHNpemVTdHlsZS52YWx1ZSAhPT0gbnVsbCA/IHNpemVTdHlsZS52YWx1ZSA6IHt9KSxcbiAgICAgICctLXEtbGluZWFyLXByb2dyZXNzLXNwZWVkJzogYCR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tc2BcbiAgICB9KSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGluZWFyLXByb2dyZXNzJ1xuICAgICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMucmV2ZXJzZSA9PT0gdHJ1ZSB8fCBwcm9wcy5xdWVyeSA9PT0gdHJ1ZSA/ICcgcS1saW5lYXItcHJvZ3Jlc3MtLXJldmVyc2UnIDogJycpXG4gICAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyByb3VuZGVkLWJvcmRlcnMnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgdHJhY2tTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHdpZHRoKHByb3BzLmJ1ZmZlciAhPT0gdm9pZCAwID8gcHJvcHMuYnVmZmVyIDogMSwgd2lkdGhSZXZlcnNlLnZhbHVlLCBwcm94eS4kcSkpXG4gICAgY29uc3QgdHJhY2tDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrIGFic29sdXRlLWZ1bGwnXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrLS13aXRoJHsgcHJvcHMuaW5zdGFudEZlZWRiYWNrID09PSB0cnVlID8gJ291dCcgOiAnJyB9LXRyYW5zaXRpb25gXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrLS0keyBpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnZGFyaycgOiAnbGlnaHQnIH1gXG4gICAgICArIChwcm9wcy50cmFja0NvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLnRyYWNrQ29sb3IgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBtb2RlbFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gd2lkdGgobW90aW9uLnZhbHVlID09PSB0cnVlID8gMSA6IHByb3BzLnZhbHVlLCB3aWR0aFJldmVyc2UudmFsdWUsIHByb3h5LiRxKSlcbiAgICBjb25zdCBtb2RlbENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwgYWJzb2x1dGUtZnVsbCdcbiAgICAgICsgYCBxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwtLXdpdGgkeyBwcm9wcy5pbnN0YW50RmVlZGJhY2sgPT09IHRydWUgPyAnb3V0JyA6ICcnIH0tdHJhbnNpdGlvbmBcbiAgICAgICsgYCBxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwtLSR7IG1vdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/ICdpbicgOiAnJyB9ZGV0ZXJtaW5hdGVgXG4gICAgKVxuXG4gICAgY29uc3Qgc3RyaXBlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoeyB3aWR0aDogYCR7IHByb3BzLnZhbHVlICogMTAwIH0lYCB9KSlcbiAgICBjb25zdCBzdHJpcGVDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1saW5lYXItcHJvZ3Jlc3NfX3N0cmlwZSBhYnNvbHV0ZS0keyBwcm9wcy5yZXZlcnNlID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyB9YFxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiB0cmFja0NsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiB0cmFja1N0eWxlLnZhbHVlXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogbW9kZWxDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogbW9kZWxTdHlsZS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBwcm9wcy5zdHJpcGUgPT09IHRydWUgJiYgbW90aW9uLnZhbHVlID09PSBmYWxzZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IHN0cmlwZUNsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiBzdHJpcGVTdHlsZS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAnYXJpYS12YWx1ZW1pbic6IDAsXG4gICAgICAgICdhcmlhLXZhbHVlbWF4JzogMSxcbiAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlXG4gICAgICAgICAgPyB2b2lkIDBcbiAgICAgICAgICA6IHByb3BzLnZhbHVlXG4gICAgICB9LCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIGNoaWxkKSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZU1vdW50LCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgSGlzdG9yeSBmcm9tICcuLi8uLi9oaXN0b3J5LmpzJ1xuaW1wb3J0IHsgdm1IYXNSb3V0ZXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG5sZXQgY291bnRlciA9IDBcblxuZXhwb3J0IGNvbnN0IHVzZUZ1bGxzY3JlZW5Qcm9wcyA9IHtcbiAgZnVsbHNjcmVlbjogQm9vbGVhbixcbiAgbm9Sb3V0ZUZ1bGxzY3JlZW5FeGl0OiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VGdWxsc2NyZWVuRW1pdHMgPSBbICd1cGRhdGU6ZnVsbHNjcmVlbicsICdmdWxsc2NyZWVuJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gdm1cblxuICBsZXQgaGlzdG9yeUVudHJ5LCBmdWxsc2NyZWVuRmlsbGVyTm9kZSwgY29udGFpbmVyXG4gIGNvbnN0IGluRnVsbHNjcmVlbiA9IHJlZihmYWxzZSlcblxuICB2bUhhc1JvdXRlcih2bSkgPT09IHRydWUgJiYgd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCAoKSA9PiB7XG4gICAgcHJvcHMubm9Sb3V0ZUZ1bGxzY3JlZW5FeGl0ICE9PSB0cnVlICYmIGV4aXRGdWxsc2NyZWVuKClcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5mdWxsc2NyZWVuLCB2ID0+IHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlICE9PSB2KSB7XG4gICAgICB0b2dnbGVGdWxsc2NyZWVuKClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goaW5GdWxsc2NyZWVuLCB2ID0+IHtcbiAgICBlbWl0KCd1cGRhdGU6ZnVsbHNjcmVlbicsIHYpXG4gICAgZW1pdCgnZnVsbHNjcmVlbicsIHYpXG4gIH0pXG5cbiAgZnVuY3Rpb24gdG9nZ2xlRnVsbHNjcmVlbiAoKSB7XG4gICAgaWYgKGluRnVsbHNjcmVlbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgZXhpdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNldEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGluRnVsbHNjcmVlbi52YWx1ZSA9IHRydWVcbiAgICBjb250YWluZXIgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGQoZnVsbHNjcmVlbkZpbGxlck5vZGUsIHByb3h5LiRlbClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb3h5LiRlbClcblxuICAgIGNvdW50ZXIrK1xuICAgIGlmIChjb3VudGVyID09PSAxKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZnVsbHNjcmVlbi1taXhpbicpXG4gICAgfVxuXG4gICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgaGFuZGxlcjogZXhpdEZ1bGxzY3JlZW5cbiAgICB9XG4gICAgSGlzdG9yeS5hZGQoaGlzdG9yeUVudHJ5KVxuICB9XG5cbiAgZnVuY3Rpb24gZXhpdEZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgIT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChoaXN0b3J5RW50cnkgIT09IHZvaWQgMCkge1xuICAgICAgSGlzdG9yeS5yZW1vdmUoaGlzdG9yeUVudHJ5KVxuICAgICAgaGlzdG9yeUVudHJ5ID0gdm9pZCAwXG4gICAgfVxuXG4gICAgY29udGFpbmVyLnJlcGxhY2VDaGlsZChwcm94eS4kZWwsIGZ1bGxzY3JlZW5GaWxsZXJOb2RlKVxuICAgIGluRnVsbHNjcmVlbi52YWx1ZSA9IGZhbHNlXG5cbiAgICBjb3VudGVyID0gTWF0aC5tYXgoMCwgY291bnRlciAtIDEpXG5cbiAgICBpZiAoY291bnRlciA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWZ1bGxzY3JlZW4tbWl4aW4nKVxuXG4gICAgICBpZiAocHJveHkuJGVsLnNjcm9sbEludG9WaWV3ICE9PSB2b2lkIDApIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHByb3h5LiRlbC5zY3JvbGxJbnRvVmlldygpIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25CZWZvcmVNb3VudCgoKSA9PiB7XG4gICAgZnVsbHNjcmVlbkZpbGxlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHByb3BzLmZ1bGxzY3JlZW4gPT09IHRydWUgJiYgc2V0RnVsbHNjcmVlbigpXG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KGV4aXRGdWxsc2NyZWVuKVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgdG9nZ2xlRnVsbHNjcmVlbixcbiAgICBzZXRGdWxsc2NyZWVuLFxuICAgIGV4aXRGdWxsc2NyZWVuXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBpbkZ1bGxzY3JlZW4sXG4gICAgdG9nZ2xlRnVsbHNjcmVlblxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc29ydERhdGUgKGEsIGIpIHtcbiAgcmV0dXJuIChuZXcgRGF0ZShhKSkgLSAobmV3IERhdGUoYikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0Qm9vbGVhbiAoYSwgYikge1xuICByZXR1cm4gYSAmJiAhYlxuICAgID8gLTFcbiAgICA6ICghYSAmJiBiID8gMSA6IDApXG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgc29ydERhdGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3NvcnQuanMnXG5pbXBvcnQgeyBpc051bWJlciwgaXNEYXRlLCBpc09iamVjdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaXMuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVNvcnRQcm9wcyA9IHtcbiAgc29ydE1ldGhvZDogRnVuY3Rpb24sXG4gIGJpbmFyeVN0YXRlU29ydDogQm9vbGVhbixcbiAgY29sdW1uU29ydE9yZGVyOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHZhbGlkYXRvcjogdiA9PiB2ID09PSAnYWQnIHx8IHYgPT09ICdkYScsXG4gICAgZGVmYXVsdDogJ2FkJ1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZVNvcnQgKHByb3BzLCBjb21wdXRlZFBhZ2luYXRpb24sIGNvbExpc3QsIHNldFBhZ2luYXRpb24pIHtcbiAgY29uc3QgY29sdW1uVG9Tb3J0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHsgc29ydEJ5IH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcblxuICAgIHJldHVybiBzb3J0QnlcbiAgICAgID8gY29sTGlzdC52YWx1ZS5maW5kKGRlZiA9PiBkZWYubmFtZSA9PT0gc29ydEJ5KSB8fCBudWxsXG4gICAgICA6IG51bGxcbiAgfSlcblxuICBjb25zdCBjb21wdXRlZFNvcnRNZXRob2QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuc29ydE1ldGhvZCAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLnNvcnRNZXRob2RcbiAgICAgIDogKGRhdGEsIHNvcnRCeSwgZGVzY2VuZGluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbCA9IGNvbExpc3QudmFsdWUuZmluZChkZWYgPT4gZGVmLm5hbWUgPT09IHNvcnRCeSlcbiAgICAgICAgICBpZiAoY29sID09PSB2b2lkIDAgfHwgY29sLmZpZWxkID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3RcbiAgICAgICAgICAgIGRpciA9IGRlc2NlbmRpbmcgPT09IHRydWUgPyAtMSA6IDEsXG4gICAgICAgICAgICB2YWwgPSB0eXBlb2YgY29sLmZpZWxkID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgID8gdiA9PiBjb2wuZmllbGQodilcbiAgICAgICAgICAgICAgOiB2ID0+IHZbIGNvbC5maWVsZCBdXG5cbiAgICAgICAgICByZXR1cm4gZGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBsZXRcbiAgICAgICAgICAgICAgQSA9IHZhbChhKSxcbiAgICAgICAgICAgICAgQiA9IHZhbChiKVxuXG4gICAgICAgICAgICBpZiAoQSA9PT0gbnVsbCB8fCBBID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIC0xICogZGlyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoQiA9PT0gbnVsbCB8fCBCID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDEgKiBkaXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2wuc29ydCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2wuc29ydChBLCBCLCBhLCBiKSAqIGRpclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKEEpID09PSB0cnVlICYmIGlzTnVtYmVyKEIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiAoQSAtIEIpICogZGlyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNEYXRlKEEpID09PSB0cnVlICYmIGlzRGF0ZShCKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc29ydERhdGUoQSwgQikgKiBkaXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQSA9PT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiBCID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChBIC0gQikgKiBkaXJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgWyBBLCBCIF0gPSBbIEEsIEIgXS5tYXAocyA9PiAocyArICcnKS50b0xvY2FsZVN0cmluZygpLnRvTG93ZXJDYXNlKCkpXG5cbiAgICAgICAgICAgIHJldHVybiBBIDwgQlxuICAgICAgICAgICAgICA/IC0xICogZGlyXG4gICAgICAgICAgICAgIDogKEEgPT09IEIgPyAwIDogZGlyKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgKSlcblxuICBmdW5jdGlvbiBzb3J0IChjb2wgLyogU3RyaW5nKGNvbCBuYW1lKSBvciBPYmplY3QoY29sIGRlZmluaXRpb24pICovKSB7XG4gICAgbGV0IHNvcnRPcmRlciA9IHByb3BzLmNvbHVtblNvcnRPcmRlclxuXG4gICAgaWYgKGlzT2JqZWN0KGNvbCkgPT09IHRydWUpIHtcbiAgICAgIGlmIChjb2wuc29ydE9yZGVyKSB7XG4gICAgICAgIHNvcnRPcmRlciA9IGNvbC5zb3J0T3JkZXJcbiAgICAgIH1cblxuICAgICAgY29sID0gY29sLm5hbWVcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBkZWYgPSBjb2xMaXN0LnZhbHVlLmZpbmQoZGVmID0+IGRlZi5uYW1lID09PSBjb2wpXG4gICAgICBpZiAoZGVmICE9PSB2b2lkIDAgJiYgZGVmLnNvcnRPcmRlcikge1xuICAgICAgICBzb3J0T3JkZXIgPSBkZWYuc29ydE9yZGVyXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHsgc29ydEJ5LCBkZXNjZW5kaW5nIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcblxuICAgIGlmIChzb3J0QnkgIT09IGNvbCkge1xuICAgICAgc29ydEJ5ID0gY29sXG4gICAgICBkZXNjZW5kaW5nID0gc29ydE9yZGVyID09PSAnZGEnXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmJpbmFyeVN0YXRlU29ydCA9PT0gdHJ1ZSkge1xuICAgICAgZGVzY2VuZGluZyA9ICFkZXNjZW5kaW5nXG4gICAgfVxuICAgIGVsc2UgaWYgKGRlc2NlbmRpbmcgPT09IHRydWUpIHtcbiAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhZCcpIHtcbiAgICAgICAgc29ydEJ5ID0gbnVsbFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlc2NlbmRpbmcgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHsgLy8gYXNjZW5kaW5nXG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYWQnKSB7XG4gICAgICAgIGRlc2NlbmRpbmcgPSB0cnVlXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc29ydEJ5ID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhZ2luYXRpb24oeyBzb3J0QnksIGRlc2NlbmRpbmcsIHBhZ2U6IDEgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29sdW1uVG9Tb3J0LFxuICAgIGNvbXB1dGVkU29ydE1ldGhvZCxcbiAgICBzb3J0XG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkLCB3YXRjaCwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZUZpbHRlclByb3BzID0ge1xuICBmaWx0ZXI6IFsgU3RyaW5nLCBPYmplY3QgXSxcbiAgZmlsdGVyTWV0aG9kOiBGdW5jdGlvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVGaWx0ZXIgKHByb3BzLCBzZXRQYWdpbmF0aW9uKSB7XG4gIGNvbnN0IGNvbXB1dGVkRmlsdGVyTWV0aG9kID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmZpbHRlck1ldGhvZCAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLmZpbHRlck1ldGhvZFxuICAgICAgOiAocm93cywgdGVybXMsIGNvbHMsIGNlbGxWYWx1ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxvd2VyVGVybXMgPSB0ZXJtcyA/IHRlcm1zLnRvTG93ZXJDYXNlKCkgOiAnJ1xuICAgICAgICAgIHJldHVybiByb3dzLmZpbHRlcihcbiAgICAgICAgICAgIHJvdyA9PiBjb2xzLnNvbWUoY29sID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gY2VsbFZhbHVlKGNvbCwgcm93KSArICcnXG4gICAgICAgICAgICAgIGNvbnN0IGhheXN0YWNrID0gKHZhbCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsID09PSAnbnVsbCcpID8gJycgOiB2YWwudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICByZXR1cm4gaGF5c3RhY2suaW5kZXhPZihsb3dlclRlcm1zKSAhPT0gLTFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICkpXG5cbiAgd2F0Y2goXG4gICAgKCkgPT4gcHJvcHMuZmlsdGVyLFxuICAgICgpID0+IHtcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgc2V0UGFnaW5hdGlvbih7IHBhZ2U6IDEgfSwgdHJ1ZSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICB7IGRlZXA6IHRydWUgfVxuICApXG5cbiAgcmV0dXJuIHsgY29tcHV0ZWRGaWx0ZXJNZXRob2QgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5mdW5jdGlvbiBzYW1lUGFnaW5hdGlvbiAob2xkUGFnLCBuZXdQYWcpIHtcbiAgZm9yIChjb25zdCBwcm9wIGluIG5ld1BhZykge1xuICAgIGlmIChuZXdQYWdbIHByb3AgXSAhPT0gb2xkUGFnWyBwcm9wIF0pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBmaXhQYWdpbmF0aW9uIChwKSB7XG4gIGlmIChwLnBhZ2UgPCAxKSB7XG4gICAgcC5wYWdlID0gMVxuICB9XG4gIGlmIChwLnJvd3NQZXJQYWdlICE9PSB2b2lkIDAgJiYgcC5yb3dzUGVyUGFnZSA8IDEpIHtcbiAgICBwLnJvd3NQZXJQYWdlID0gMFxuICB9XG4gIHJldHVybiBwXG59XG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVBhZ2luYXRpb25Qcm9wcyA9IHtcbiAgcGFnaW5hdGlvbjogT2JqZWN0LFxuICByb3dzUGVyUGFnZU9wdGlvbnM6IHtcbiAgICB0eXBlOiBBcnJheSxcbiAgICBkZWZhdWx0OiAoKSA9PiBbIDUsIDcsIDEwLCAxNSwgMjAsIDI1LCA1MCwgMCBdXG4gIH0sXG5cbiAgJ29uVXBkYXRlOnBhZ2luYXRpb24nOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZVBhZ2luYXRpb25TdGF0ZSAodm0sIGdldENlbGxWYWx1ZSkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0IH0gPSB2bVxuXG4gIGNvbnN0IGlubmVyUGFnaW5hdGlvbiA9IHJlZihcbiAgICBPYmplY3QuYXNzaWduKHtcbiAgICAgIHNvcnRCeTogbnVsbCxcbiAgICAgIGRlc2NlbmRpbmc6IGZhbHNlLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHJvd3NQZXJQYWdlOiBwcm9wcy5yb3dzUGVyUGFnZU9wdGlvbnMubGVuZ3RoID4gMFxuICAgICAgICA/IHByb3BzLnJvd3NQZXJQYWdlT3B0aW9uc1sgMCBdXG4gICAgICAgIDogNVxuICAgIH0sIHByb3BzLnBhZ2luYXRpb24pXG4gIClcblxuICBjb25zdCBjb21wdXRlZFBhZ2luYXRpb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcGFnID0gcHJvcHNbICdvblVwZGF0ZTpwYWdpbmF0aW9uJyBdICE9PSB2b2lkIDBcbiAgICAgID8geyAuLi5pbm5lclBhZ2luYXRpb24udmFsdWUsIC4uLnByb3BzLnBhZ2luYXRpb24gfVxuICAgICAgOiBpbm5lclBhZ2luYXRpb24udmFsdWVcblxuICAgIHJldHVybiBmaXhQYWdpbmF0aW9uKHBhZylcbiAgfSlcblxuICBjb25zdCBpc1NlcnZlclNpZGUgPSBjb21wdXRlZCgoKSA9PiBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucm93c051bWJlciAhPT0gdm9pZCAwKVxuXG4gIGZ1bmN0aW9uIHNlbmRTZXJ2ZXJSZXF1ZXN0IChwYWdpbmF0aW9uKSB7XG4gICAgcmVxdWVzdFNlcnZlckludGVyYWN0aW9uKHtcbiAgICAgIHBhZ2luYXRpb24sXG4gICAgICBmaWx0ZXI6IHByb3BzLmZpbHRlclxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZXF1ZXN0U2VydmVySW50ZXJhY3Rpb24gKHByb3AgPSB7fSkge1xuICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGVtaXQoJ3JlcXVlc3QnLCB7XG4gICAgICAgIHBhZ2luYXRpb246IHByb3AucGFnaW5hdGlvbiB8fCBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUsXG4gICAgICAgIC8vIEZJWE1FOiAncHJvcHMuZmlsdGVyJyBpcyBzdHJpbmcvb2JqZWN0LCBidXQgJ3Byb3AuZmlsdGVyJyBjYW4gYmUgY29udHJvbGxlZCBieSB0aGUgdXNlciwgYW5kIHRoZSBkb2NzIGFyZSBzdWdnZXN0aW5nICdwcm9wLmZpbHRlcicgaXMgYSBmdW5jdGlvblxuICAgICAgICAvLyBTbywgdmFsdWUgb2YgJ2ZpbHRlcicgYmVjb21lcyBmdW5jdGlvbi9zdHJpbmcvb2JqZWN0LCB3aGljaCBtYWtlcyBhIGxvdCBvZiB0aGluZ3MgdW5wcmVkaWN0YWJsZSBhbmQgY2FuIGJyZWFrIHRoaW5nc1xuICAgICAgICAvLyBFaXRoZXIgdXBkYXRlIHRoZSBkb2NzIHRvIHNheSAncHJvcC5maWx0ZXInIHNob3VsZCBiZSBhIHN0cmluZy9vYmplY3QsIG9yIHVzZSAncHJvcC5maWx0ZXIgfHwgcHJvcHMuZmlsdGVyTWV0aG9kJyBvciBtYXliZSBnZXQgJ2NvbXB1dGVkRmlsdGVyRnVuY3Rpb24nIGhlcmUgYW5kIHVzZSB0aGF0IGluc3RlYWQgb2YgJ3Byb3BzLmZpbHRlck1ldGhvZCdcbiAgICAgICAgLy8gVGhlIGV4YW1wbGVzIG9uIG91ciBkb2NzIGFyZSB1c2luZyAnZmlsdGVyJyBhcyBhIHN0cmluZyBpbiBvblJlcXVlc3QgaGFuZGxlciwgYnV0IHRoZSBKU09OIEFQSSBpcyBzYXlpbmcgJ2ZpbHRlcicgaXMgYSBmdW5jdGlvblxuICAgICAgICBmaWx0ZXI6IHByb3AuZmlsdGVyIHx8IHByb3BzLmZpbHRlcixcbiAgICAgICAgZ2V0Q2VsbFZhbHVlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBzZXRQYWdpbmF0aW9uICh2YWwsIGZvcmNlU2VydmVyUmVxdWVzdCkge1xuICAgIGNvbnN0IG5ld1BhZ2luYXRpb24gPSBmaXhQYWdpbmF0aW9uKHtcbiAgICAgIC4uLmNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZSxcbiAgICAgIC4uLnZhbFxuICAgIH0pXG5cbiAgICBpZiAoc2FtZVBhZ2luYXRpb24oY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLCBuZXdQYWdpbmF0aW9uKSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGlzU2VydmVyU2lkZS52YWx1ZSA9PT0gdHJ1ZSAmJiBmb3JjZVNlcnZlclJlcXVlc3QgPT09IHRydWUpIHtcbiAgICAgICAgc2VuZFNlcnZlclJlcXVlc3QobmV3UGFnaW5hdGlvbilcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChpc1NlcnZlclNpZGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHNlbmRTZXJ2ZXJSZXF1ZXN0KG5ld1BhZ2luYXRpb24pXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBwcm9wcy5wYWdpbmF0aW9uICE9PSB2b2lkIDBcbiAgICAgICYmIHByb3BzWyAnb25VcGRhdGU6cGFnaW5hdGlvbicgXSAhPT0gdm9pZCAwXG4gICAgKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6cGFnaW5hdGlvbicsIG5ld1BhZ2luYXRpb24pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaW5uZXJQYWdpbmF0aW9uLnZhbHVlID0gbmV3UGFnaW5hdGlvblxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5uZXJQYWdpbmF0aW9uLFxuICAgIGNvbXB1dGVkUGFnaW5hdGlvbixcbiAgICBpc1NlcnZlclNpZGUsXG5cbiAgICByZXF1ZXN0U2VydmVySW50ZXJhY3Rpb24sXG4gICAgc2V0UGFnaW5hdGlvblxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZVBhZ2luYXRpb24gKHZtLCBpbm5lclBhZ2luYXRpb24sIGNvbXB1dGVkUGFnaW5hdGlvbiwgaXNTZXJ2ZXJTaWRlLCBzZXRQYWdpbmF0aW9uLCBmaWx0ZXJlZFNvcnRlZFJvd3NOdW1iZXIpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICBjb25zdCBjb21wdXRlZFJvd3NOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaXNTZXJ2ZXJTaWRlLnZhbHVlID09PSB0cnVlXG4gICAgICA/IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5yb3dzTnVtYmVyIHx8IDBcbiAgICAgIDogZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyLnZhbHVlXG4gICkpXG5cbiAgY29uc3QgZmlyc3RSb3dJbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB7IHBhZ2UsIHJvd3NQZXJQYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcbiAgICByZXR1cm4gKHBhZ2UgLSAxKSAqIHJvd3NQZXJQYWdlXG4gIH0pXG5cbiAgY29uc3QgbGFzdFJvd0luZGV4ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHsgcGFnZSwgcm93c1BlclBhZ2UgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZVxuICAgIHJldHVybiBwYWdlICogcm93c1BlclBhZ2VcbiAgfSlcblxuICBjb25zdCBpc0ZpcnN0UGFnZSA9IGNvbXB1dGVkKCgpID0+IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5wYWdlID09PSAxKVxuXG4gIGNvbnN0IHBhZ2VzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSA9PT0gMFxuICAgICAgPyAxXG4gICAgICA6IE1hdGgubWF4KFxuICAgICAgICAxLFxuICAgICAgICBNYXRoLmNlaWwoY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlIC8gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLnJvd3NQZXJQYWdlKVxuICAgICAgKVxuICApKVxuXG4gIGNvbnN0IGlzTGFzdFBhZ2UgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgbGFzdFJvd0luZGV4LnZhbHVlID09PSAwXG4gICAgICA/IHRydWVcbiAgICAgIDogY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLnBhZ2UgPj0gcGFnZXNOdW1iZXIudmFsdWVcbiAgKSlcblxuICBjb25zdCBjb21wdXRlZFJvd3NQZXJQYWdlT3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBvcHRzID0gcHJvcHMucm93c1BlclBhZ2VPcHRpb25zLmluY2x1ZGVzKGlubmVyUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSlcbiAgICAgID8gcHJvcHMucm93c1BlclBhZ2VPcHRpb25zXG4gICAgICA6IFsgaW5uZXJQYWdpbmF0aW9uLnZhbHVlLnJvd3NQZXJQYWdlIF0uY29uY2F0KHByb3BzLnJvd3NQZXJQYWdlT3B0aW9ucylcblxuICAgIHJldHVybiBvcHRzLm1hcChjb3VudCA9PiAoe1xuICAgICAgbGFiZWw6IGNvdW50ID09PSAwID8gJHEubGFuZy50YWJsZS5hbGxSb3dzIDogJycgKyBjb3VudCxcbiAgICAgIHZhbHVlOiBjb3VudFxuICAgIH0pKVxuICB9KVxuXG4gIHdhdGNoKHBhZ2VzTnVtYmVyLCAobGFzdFBhZ2UsIG9sZExhc3RQYWdlKSA9PiB7XG4gICAgaWYgKGxhc3RQYWdlID09PSBvbGRMYXN0UGFnZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFBhZ2UgPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucGFnZVxuICAgIGlmIChsYXN0UGFnZSAmJiAhY3VycmVudFBhZ2UpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiAxIH0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGxhc3RQYWdlIDwgY3VycmVudFBhZ2UpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiBsYXN0UGFnZSB9KVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiBmaXJzdFBhZ2UgKCkge1xuICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiAxIH0pXG4gIH1cblxuICBmdW5jdGlvbiBwcmV2UGFnZSAoKSB7XG4gICAgY29uc3QgeyBwYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcbiAgICBpZiAocGFnZSA+IDEpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiBwYWdlIC0gMSB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRQYWdlICgpIHtcbiAgICBjb25zdCB7IHBhZ2UsIHJvd3NQZXJQYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcbiAgICBpZiAobGFzdFJvd0luZGV4LnZhbHVlID4gMCAmJiBwYWdlICogcm93c1BlclBhZ2UgPCBjb21wdXRlZFJvd3NOdW1iZXIudmFsdWUpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiBwYWdlICsgMSB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxhc3RQYWdlICgpIHtcbiAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogcGFnZXNOdW1iZXIudmFsdWUgfSlcbiAgfVxuXG4gIGlmIChwcm9wc1sgJ29uVXBkYXRlOnBhZ2luYXRpb24nIF0gIT09IHZvaWQgMCkge1xuICAgIGVtaXQoJ3VwZGF0ZTpwYWdpbmF0aW9uJywgeyAuLi5jb21wdXRlZFBhZ2luYXRpb24udmFsdWUgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlyc3RSb3dJbmRleCxcbiAgICBsYXN0Um93SW5kZXgsXG4gICAgaXNGaXJzdFBhZ2UsXG4gICAgaXNMYXN0UGFnZSxcbiAgICBwYWdlc051bWJlcixcbiAgICBjb21wdXRlZFJvd3NQZXJQYWdlT3B0aW9ucyxcbiAgICBjb21wdXRlZFJvd3NOdW1iZXIsXG5cbiAgICBmaXJzdFBhZ2UsXG4gICAgcHJldlBhZ2UsXG4gICAgbmV4dFBhZ2UsXG4gICAgbGFzdFBhZ2VcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVJvd1NlbGVjdGlvblByb3BzID0ge1xuICBzZWxlY3Rpb246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ25vbmUnLFxuICAgIHZhbGlkYXRvcjogdiA9PiBbICdzaW5nbGUnLCAnbXVsdGlwbGUnLCAnbm9uZScgXS5pbmNsdWRlcyh2KVxuICB9LFxuICBzZWxlY3RlZDoge1xuICAgIHR5cGU6IEFycmF5LFxuICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlUm93U2VsZWN0aW9uRW1pdHMgPSBbICd1cGRhdGU6c2VsZWN0ZWQnLCAnc2VsZWN0aW9uJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZVJvd1NlbGVjdGlvbiAocHJvcHMsIGVtaXQsIGNvbXB1dGVkUm93cywgZ2V0Um93S2V5KSB7XG4gIGNvbnN0IHNlbGVjdGVkS2V5cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBrZXlzID0ge31cbiAgICBwcm9wcy5zZWxlY3RlZC5tYXAoZ2V0Um93S2V5LnZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBrZXlzWyBrZXkgXSA9IHRydWVcbiAgICB9KVxuICAgIHJldHVybiBrZXlzXG4gIH0pXG5cbiAgY29uc3QgaGFzU2VsZWN0aW9uTW9kZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gcHJvcHMuc2VsZWN0aW9uICE9PSAnbm9uZSdcbiAgfSlcblxuICBjb25zdCBzaW5nbGVTZWxlY3Rpb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLnNlbGVjdGlvbiA9PT0gJ3NpbmdsZSdcbiAgfSlcblxuICBjb25zdCBtdWx0aXBsZVNlbGVjdGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gcHJvcHMuc2VsZWN0aW9uID09PSAnbXVsdGlwbGUnXG4gIH0pXG5cbiAgY29uc3QgYWxsUm93c1NlbGVjdGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICBjb21wdXRlZFJvd3MudmFsdWUubGVuZ3RoID4gMCAmJiBjb21wdXRlZFJvd3MudmFsdWUuZXZlcnkoXG4gICAgICByb3cgPT4gc2VsZWN0ZWRLZXlzLnZhbHVlWyBnZXRSb3dLZXkudmFsdWUocm93KSBdID09PSB0cnVlXG4gICAgKVxuICApXG5cbiAgY29uc3Qgc29tZVJvd3NTZWxlY3RlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgYWxsUm93c1NlbGVjdGVkLnZhbHVlICE9PSB0cnVlXG4gICAgJiYgY29tcHV0ZWRSb3dzLnZhbHVlLnNvbWUocm93ID0+IHNlbGVjdGVkS2V5cy52YWx1ZVsgZ2V0Um93S2V5LnZhbHVlKHJvdykgXSA9PT0gdHJ1ZSlcbiAgKVxuXG4gIGNvbnN0IHJvd3NTZWxlY3RlZE51bWJlciA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnNlbGVjdGVkLmxlbmd0aClcblxuICBmdW5jdGlvbiBpc1Jvd1NlbGVjdGVkIChrZXkpIHtcbiAgICByZXR1cm4gc2VsZWN0ZWRLZXlzLnZhbHVlWyBrZXkgXSA9PT0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24gKCkge1xuICAgIGVtaXQoJ3VwZGF0ZTpzZWxlY3RlZCcsIFtdKVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0aW9uIChrZXlzLCByb3dzLCBhZGRlZCwgZXZ0KSB7XG4gICAgZW1pdCgnc2VsZWN0aW9uJywgeyByb3dzLCBhZGRlZCwga2V5cywgZXZ0IH0pXG5cbiAgICBjb25zdCBwYXlsb2FkID0gc2luZ2xlU2VsZWN0aW9uLnZhbHVlID09PSB0cnVlXG4gICAgICA/IChhZGRlZCA9PT0gdHJ1ZSA/IHJvd3MgOiBbXSlcbiAgICAgIDogKFxuICAgICAgICAgIGFkZGVkID09PSB0cnVlXG4gICAgICAgICAgICA/IHByb3BzLnNlbGVjdGVkLmNvbmNhdChyb3dzKVxuICAgICAgICAgICAgOiBwcm9wcy5zZWxlY3RlZC5maWx0ZXIoXG4gICAgICAgICAgICAgIHJvdyA9PiBrZXlzLmluY2x1ZGVzKGdldFJvd0tleS52YWx1ZShyb3cpKSA9PT0gZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuXG4gICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgcGF5bG9hZClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGFzU2VsZWN0aW9uTW9kZSxcbiAgICBzaW5nbGVTZWxlY3Rpb24sXG4gICAgbXVsdGlwbGVTZWxlY3Rpb24sXG4gICAgYWxsUm93c1NlbGVjdGVkLFxuICAgIHNvbWVSb3dzU2VsZWN0ZWQsXG4gICAgcm93c1NlbGVjdGVkTnVtYmVyLFxuXG4gICAgaXNSb3dTZWxlY3RlZCxcbiAgICBjbGVhclNlbGVjdGlvbixcbiAgICB1cGRhdGVTZWxlY3Rpb25cbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCB9IGZyb20gJ3Z1ZSdcblxuZnVuY3Rpb24gZ2V0VmFsICh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKVxuICAgID8gdmFsLnNsaWNlKClcbiAgICA6IFtdXG59XG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVJvd0V4cGFuZFByb3BzID0ge1xuICBleHBhbmRlZDogQXJyYXkgLy8gdi1tb2RlbDpleHBhbmRlZFxufVxuXG5leHBvcnQgY29uc3QgdXNlVGFibGVSb3dFeHBhbmRFbWl0cyA9IFsgJ3VwZGF0ZTpleHBhbmRlZCcgXVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVSb3dFeHBhbmQgKHByb3BzLCBlbWl0KSB7XG4gIGNvbnN0IGlubmVyRXhwYW5kZWQgPSByZWYoZ2V0VmFsKHByb3BzLmV4cGFuZGVkKSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5leHBhbmRlZCwgdmFsID0+IHtcbiAgICBpbm5lckV4cGFuZGVkLnZhbHVlID0gZ2V0VmFsKHZhbClcbiAgfSlcblxuICBmdW5jdGlvbiBpc1Jvd0V4cGFuZGVkIChrZXkpIHtcbiAgICByZXR1cm4gaW5uZXJFeHBhbmRlZC52YWx1ZS5pbmNsdWRlcyhrZXkpXG4gIH1cblxuICBmdW5jdGlvbiBzZXRFeHBhbmRlZCAodmFsKSB7XG4gICAgaWYgKHByb3BzLmV4cGFuZGVkICE9PSB2b2lkIDApIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTpleHBhbmRlZCcsIHZhbClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpbm5lckV4cGFuZGVkLnZhbHVlID0gdmFsXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRXhwYW5kZWQgKGtleSwgYWRkKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gaW5uZXJFeHBhbmRlZC52YWx1ZS5zbGljZSgpXG4gICAgY29uc3QgaW5kZXggPSB0YXJnZXQuaW5kZXhPZihrZXkpXG5cbiAgICBpZiAoYWRkID09PSB0cnVlKSB7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRhcmdldC5wdXNoKGtleSlcbiAgICAgICAgc2V0RXhwYW5kZWQodGFyZ2V0KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRhcmdldC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICBzZXRFeHBhbmRlZCh0YXJnZXQpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpc1Jvd0V4cGFuZGVkLFxuICAgIHNldEV4cGFuZGVkLFxuICAgIHVwZGF0ZUV4cGFuZGVkXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaXMuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZUNvbHVtblNlbGVjdGlvblByb3BzID0ge1xuICB2aXNpYmxlQ29sdW1uczogQXJyYXlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uIChwcm9wcywgY29tcHV0ZWRQYWdpbmF0aW9uLCBoYXNTZWxlY3Rpb25Nb2RlKSB7XG4gIGNvbnN0IGNvbExpc3QgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmNvbHVtbnMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHByb3BzLmNvbHVtbnNcbiAgICB9XG5cbiAgICAvLyB3ZSBpbmZlciBjb2x1bW5zIGZyb20gZmlyc3Qgcm93XG4gICAgY29uc3Qgcm93ID0gcHJvcHMucm93c1sgMCBdXG5cbiAgICByZXR1cm4gcm93ICE9PSB2b2lkIDBcbiAgICAgID8gT2JqZWN0LmtleXMocm93KS5tYXAobmFtZSA9PiAoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBsYWJlbDogbmFtZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICBmaWVsZDogbmFtZSxcbiAgICAgICAgYWxpZ246IGlzTnVtYmVyKHJvd1sgbmFtZSBdKSA/ICdyaWdodCcgOiAnbGVmdCcsXG4gICAgICAgIHNvcnRhYmxlOiB0cnVlXG4gICAgICB9KSlcbiAgICAgIDogW11cbiAgfSlcblxuICBjb25zdCBjb21wdXRlZENvbHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgeyBzb3J0QnksIGRlc2NlbmRpbmcgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgY29uc3QgY29scyA9IHByb3BzLnZpc2libGVDb2x1bW5zICE9PSB2b2lkIDBcbiAgICAgID8gY29sTGlzdC52YWx1ZS5maWx0ZXIoY29sID0+IGNvbC5yZXF1aXJlZCA9PT0gdHJ1ZSB8fCBwcm9wcy52aXNpYmxlQ29sdW1ucy5pbmNsdWRlcyhjb2wubmFtZSkgPT09IHRydWUpXG4gICAgICA6IGNvbExpc3QudmFsdWVcblxuICAgIHJldHVybiBjb2xzLm1hcChjb2wgPT4ge1xuICAgICAgY29uc3QgYWxpZ24gPSBjb2wuYWxpZ24gfHwgJ3JpZ2h0J1xuICAgICAgY29uc3QgYWxpZ25DbGFzcyA9IGB0ZXh0LSR7IGFsaWduIH1gXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvbCxcbiAgICAgICAgYWxpZ24sXG4gICAgICAgIF9faWNvbkNsYXNzOiBgcS10YWJsZV9fc29ydC1pY29uIHEtdGFibGVfX3NvcnQtaWNvbi0tJHsgYWxpZ24gfWAsXG4gICAgICAgIF9fdGhDbGFzczogYWxpZ25DbGFzc1xuICAgICAgICAgICsgKGNvbC5oZWFkZXJDbGFzc2VzICE9PSB2b2lkIDAgPyAnICcgKyBjb2wuaGVhZGVyQ2xhc3NlcyA6ICcnKVxuICAgICAgICAgICsgKGNvbC5zb3J0YWJsZSA9PT0gdHJ1ZSA/ICcgc29ydGFibGUnIDogJycpXG4gICAgICAgICAgKyAoY29sLm5hbWUgPT09IHNvcnRCeSA/IGAgc29ydGVkICR7IGRlc2NlbmRpbmcgPT09IHRydWUgPyAnc29ydC1kZXNjJyA6ICcnIH1gIDogJycpLFxuXG4gICAgICAgIF9fdGRTdHlsZTogY29sLnN0eWxlICE9PSB2b2lkIDBcbiAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgdHlwZW9mIGNvbC5zdHlsZSAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgID8gKCkgPT4gY29sLnN0eWxlXG4gICAgICAgICAgICAgICAgOiBjb2wuc3R5bGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6ICgpID0+IG51bGwsXG5cbiAgICAgICAgX190ZENsYXNzOiBjb2wuY2xhc3NlcyAhPT0gdm9pZCAwXG4gICAgICAgICAgPyAoXG4gICAgICAgICAgICAgIHR5cGVvZiBjb2wuY2xhc3NlcyAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgID8gKCkgPT4gYWxpZ25DbGFzcyArICcgJyArIGNvbC5jbGFzc2VzXG4gICAgICAgICAgICAgICAgOiByb3cgPT4gYWxpZ25DbGFzcyArICcgJyArIGNvbC5jbGFzc2VzKHJvdylcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6ICgpID0+IGFsaWduQ2xhc3NcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIGNvbnN0IGNvbXB1dGVkQ29sc01hcCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBuYW1lcyA9IHt9XG4gICAgY29tcHV0ZWRDb2xzLnZhbHVlLmZvckVhY2goY29sID0+IHtcbiAgICAgIG5hbWVzWyBjb2wubmFtZSBdID0gY29sXG4gICAgfSlcbiAgICByZXR1cm4gbmFtZXNcbiAgfSlcblxuICBjb25zdCBjb21wdXRlZENvbHNwYW4gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLnRhYmxlQ29sc3BhbiAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLnRhYmxlQ29sc3BhblxuICAgICAgOiBjb21wdXRlZENvbHMudmFsdWUubGVuZ3RoICsgKGhhc1NlbGVjdGlvbk1vZGUudmFsdWUgPT09IHRydWUgPyAxIDogMClcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGNvbExpc3QsXG4gICAgY29tcHV0ZWRDb2xzLFxuICAgIGNvbXB1dGVkQ29sc01hcCxcbiAgICBjb21wdXRlZENvbHNwYW5cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFUaCBmcm9tICcuL1FUaC5qcydcblxuaW1wb3J0IFFTZXBhcmF0b3IgZnJvbSAnLi4vc2VwYXJhdG9yL1FTZXBhcmF0b3IuanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRVmlydHVhbFNjcm9sbCBmcm9tICcuLi92aXJ0dWFsLXNjcm9sbC9RVmlydHVhbFNjcm9sbC5qcydcbmltcG9ydCBRU2VsZWN0IGZyb20gJy4uL3NlbGVjdC9RU2VsZWN0LmpzJ1xuaW1wb3J0IFFMaW5lYXJQcm9ncmVzcyBmcm9tICcuLi9saW5lYXItcHJvZ3Jlc3MvUUxpbmVhclByb2dyZXNzLmpzJ1xuaW1wb3J0IFFDaGVja2JveCBmcm9tICcuLi9jaGVja2JveC9RQ2hlY2tib3guanMnXG5pbXBvcnQgUUJ0biBmcm9tICcuLi9idG4vUUJ0bi5qcydcblxuaW1wb3J0IGdldFRhYmxlTWlkZGxlIGZyb20gJy4vZ2V0LXRhYmxlLW1pZGRsZS5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB7IGNvbW1vblZpcnRQcm9wc0xpc3QgfSBmcm9tICcuLi92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMnXG5pbXBvcnQgdXNlRnVsbHNjcmVlbiwgeyB1c2VGdWxsc2NyZWVuUHJvcHMsIHVzZUZ1bGxzY3JlZW5FbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZ1bGxzY3JlZW4uanMnXG5cbmltcG9ydCB7IHVzZVRhYmxlU29ydCwgdXNlVGFibGVTb3J0UHJvcHMgfSBmcm9tICcuL3RhYmxlLXNvcnQuanMnXG5pbXBvcnQgeyB1c2VUYWJsZUZpbHRlciwgdXNlVGFibGVGaWx0ZXJQcm9wcyB9IGZyb20gJy4vdGFibGUtZmlsdGVyLmpzJ1xuaW1wb3J0IHsgdXNlVGFibGVQYWdpbmF0aW9uU3RhdGUsIHVzZVRhYmxlUGFnaW5hdGlvbiwgdXNlVGFibGVQYWdpbmF0aW9uUHJvcHMgfSBmcm9tICcuL3RhYmxlLXBhZ2luYXRpb24uanMnXG5pbXBvcnQgeyB1c2VUYWJsZVJvd1NlbGVjdGlvbiwgdXNlVGFibGVSb3dTZWxlY3Rpb25Qcm9wcywgdXNlVGFibGVSb3dTZWxlY3Rpb25FbWl0cyB9IGZyb20gJy4vdGFibGUtcm93LXNlbGVjdGlvbi5qcydcbmltcG9ydCB7IHVzZVRhYmxlUm93RXhwYW5kLCB1c2VUYWJsZVJvd0V4cGFuZFByb3BzLCB1c2VUYWJsZVJvd0V4cGFuZEVtaXRzIH0gZnJvbSAnLi90YWJsZS1yb3ctZXhwYW5kLmpzJ1xuaW1wb3J0IHsgdXNlVGFibGVDb2x1bW5TZWxlY3Rpb24sIHVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uUHJvcHMgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi1zZWxlY3Rpb24uanMnXG5cbmltcG9ydCB7IGluamVjdFByb3AsIGluamVjdE11bHRpcGxlUHJvcHMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2luamVjdC1vYmotcHJvcC5qcydcbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5jb25zdCBib3R0b21DbGFzcyA9ICdxLXRhYmxlX19ib3R0b20gcm93IGl0ZW1zLWNlbnRlcidcblxuY29uc3QgY29tbW9uVmlydFByb3BzT2JqID0ge31cbmNvbW1vblZpcnRQcm9wc0xpc3QuZm9yRWFjaChwID0+IHsgY29tbW9uVmlydFByb3BzT2JqWyBwIF0gPSB7fSB9KVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYmxlJyxcblxuICBwcm9wczoge1xuICAgIHJvd3M6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuICAgIHJvd0tleToge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIEZ1bmN0aW9uIF0sXG4gICAgICBkZWZhdWx0OiAnaWQnXG4gICAgfSxcblxuICAgIGNvbHVtbnM6IEFycmF5LFxuICAgIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgICBpY29uRmlyc3RQYWdlOiBTdHJpbmcsXG4gICAgaWNvblByZXZQYWdlOiBTdHJpbmcsXG4gICAgaWNvbk5leHRQYWdlOiBTdHJpbmcsXG4gICAgaWNvbkxhc3RQYWdlOiBTdHJpbmcsXG5cbiAgICB0aXRsZTogU3RyaW5nLFxuXG4gICAgaGlkZUhlYWRlcjogQm9vbGVhbixcblxuICAgIGdyaWQ6IEJvb2xlYW4sXG4gICAgZ3JpZEhlYWRlcjogQm9vbGVhbixcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIHNlcGFyYXRvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2hvcml6b250YWwnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2hvcml6b250YWwnLCAndmVydGljYWwnLCAnY2VsbCcsICdub25lJyBdLmluY2x1ZGVzKHYpXG4gICAgfSxcbiAgICB3cmFwQ2VsbHM6IEJvb2xlYW4sXG5cbiAgICB2aXJ0dWFsU2Nyb2xsOiBCb29sZWFuLFxuICAgIHZpcnR1YWxTY3JvbGxUYXJnZXQ6IHtcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG4gICAgLi4uY29tbW9uVmlydFByb3BzT2JqLFxuXG4gICAgbm9EYXRhTGFiZWw6IFN0cmluZyxcbiAgICBub1Jlc3VsdHNMYWJlbDogU3RyaW5nLFxuICAgIGxvYWRpbmdMYWJlbDogU3RyaW5nLFxuICAgIHNlbGVjdGVkUm93c0xhYmVsOiBGdW5jdGlvbixcbiAgICByb3dzUGVyUGFnZUxhYmVsOiBTdHJpbmcsXG4gICAgcGFnaW5hdGlvbkxhYmVsOiBGdW5jdGlvbixcblxuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZ3JleS04J1xuICAgIH0sXG5cbiAgICB0aXRsZUNsYXNzOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIHRhYmxlU3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgdGFibGVDbGFzczogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICB0YWJsZUhlYWRlclN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIHRhYmxlSGVhZGVyQ2xhc3M6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgY2FyZENvbnRhaW5lckNsYXNzOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIGNhcmRDb250YWluZXJTdHlsZTogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICBjYXJkU3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgY2FyZENsYXNzOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuXG4gICAgaGlkZUJvdHRvbTogQm9vbGVhbixcbiAgICBoaWRlU2VsZWN0ZWRCYW5uZXI6IEJvb2xlYW4sXG4gICAgaGlkZU5vRGF0YTogQm9vbGVhbixcbiAgICBoaWRlUGFnaW5hdGlvbjogQm9vbGVhbixcblxuICAgIG9uUm93Q2xpY2s6IEZ1bmN0aW9uLFxuICAgIG9uUm93RGJsY2xpY2s6IEZ1bmN0aW9uLFxuICAgIG9uUm93Q29udGV4dG1lbnU6IEZ1bmN0aW9uLFxuXG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZUZ1bGxzY3JlZW5Qcm9wcyxcblxuICAgIC4uLnVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uUHJvcHMsXG4gICAgLi4udXNlVGFibGVGaWx0ZXJQcm9wcyxcbiAgICAuLi51c2VUYWJsZVBhZ2luYXRpb25Qcm9wcyxcbiAgICAuLi51c2VUYWJsZVJvd0V4cGFuZFByb3BzLFxuICAgIC4uLnVzZVRhYmxlUm93U2VsZWN0aW9uUHJvcHMsXG4gICAgLi4udXNlVGFibGVTb3J0UHJvcHNcbiAgfSxcblxuICBlbWl0czogW1xuICAgICdyZXF1ZXN0JywgJ3ZpcnR1YWwtc2Nyb2xsJyxcbiAgICAuLi51c2VGdWxsc2NyZWVuRW1pdHMsXG4gICAgLi4udXNlVGFibGVSb3dFeHBhbmRFbWl0cyxcbiAgICAuLi51c2VUYWJsZVJvd1NlbGVjdGlvbkVtaXRzXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSB2bVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyBpbkZ1bGxzY3JlZW4sIHRvZ2dsZUZ1bGxzY3JlZW4gfSA9IHVzZUZ1bGxzY3JlZW4oKVxuXG4gICAgY29uc3QgZ2V0Um93S2V5ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgdHlwZW9mIHByb3BzLnJvd0tleSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHByb3BzLnJvd0tleVxuICAgICAgICA6IHJvdyA9PiByb3dbIHByb3BzLnJvd0tleSBdXG4gICAgKSlcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB2aXJ0U2Nyb2xsUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgaGFzVmlydFNjcm9sbCA9IGNvbXB1dGVkKCgpID0+IHByb3BzLmdyaWQgIT09IHRydWUgJiYgcHJvcHMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSlcblxuICAgIGNvbnN0IGNhcmREZWZhdWx0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJyBxLXRhYmxlX19jYXJkJ1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRhYmxlX19jYXJkLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tc3F1YXJlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZmxhdCcgOiAnJylcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLXRhYmxlLS1ib3JkZXJlZCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBfX2NvbnRhaW5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXRhYmxlX19jb250YWluZXIgcS10YWJsZS0tJHsgcHJvcHMuc2VwYXJhdG9yIH0tc2VwYXJhdG9yIGNvbHVtbiBuby13cmFwYFxuICAgICAgKyAocHJvcHMuZ3JpZCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZ3JpZCcgOiBjYXJkRGVmYXVsdENsYXNzLnZhbHVlKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRhYmxlLS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtdGFibGUtLWRlbnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMud3JhcENlbGxzID09PSBmYWxzZSA/ICcgcS10YWJsZS0tbm8td3JhcCcgOiAnJylcbiAgICAgICsgKGluRnVsbHNjcmVlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgZnVsbHNjcmVlbiBzY3JvbGwnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgY29udGFpbmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgX19jb250YWluZXJDbGFzcy52YWx1ZSArIChwcm9wcy5sb2FkaW5nID09PSB0cnVlID8gJyBxLXRhYmxlLS1sb2FkaW5nJyA6ICcnKVxuICAgIClcblxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gcHJvcHMudGFibGVTdHlsZSArIHByb3BzLnRhYmxlQ2xhc3MgKyBwcm9wcy50YWJsZUhlYWRlclN0eWxlICsgcHJvcHMudGFibGVIZWFkZXJDbGFzcyArIF9fY29udGFpbmVyQ2xhc3MudmFsdWUsXG4gICAgICAoKSA9PiB7IGhhc1ZpcnRTY3JvbGwudmFsdWUgPT09IHRydWUgJiYgdmlydFNjcm9sbFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB2aXJ0U2Nyb2xsUmVmLnZhbHVlLnJlc2V0KCkgfVxuICAgIClcblxuICAgIGNvbnN0IHtcbiAgICAgIGlubmVyUGFnaW5hdGlvbixcbiAgICAgIGNvbXB1dGVkUGFnaW5hdGlvbixcbiAgICAgIGlzU2VydmVyU2lkZSxcblxuICAgICAgcmVxdWVzdFNlcnZlckludGVyYWN0aW9uLFxuICAgICAgc2V0UGFnaW5hdGlvblxuICAgIH0gPSB1c2VUYWJsZVBhZ2luYXRpb25TdGF0ZSh2bSwgZ2V0Q2VsbFZhbHVlKVxuXG4gICAgY29uc3QgeyBjb21wdXRlZEZpbHRlck1ldGhvZCB9ID0gdXNlVGFibGVGaWx0ZXIocHJvcHMsIHNldFBhZ2luYXRpb24pXG4gICAgY29uc3QgeyBpc1Jvd0V4cGFuZGVkLCBzZXRFeHBhbmRlZCwgdXBkYXRlRXhwYW5kZWQgfSA9IHVzZVRhYmxlUm93RXhwYW5kKHByb3BzLCBlbWl0KVxuXG4gICAgY29uc3QgZmlsdGVyZWRTb3J0ZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IHJvd3MgPSBwcm9wcy5yb3dzXG5cbiAgICAgIGlmIChpc1NlcnZlclNpZGUudmFsdWUgPT09IHRydWUgfHwgcm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJvd3NcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBzb3J0QnksIGRlc2NlbmRpbmcgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgICBpZiAocHJvcHMuZmlsdGVyKSB7XG4gICAgICAgIHJvd3MgPSBjb21wdXRlZEZpbHRlck1ldGhvZC52YWx1ZShyb3dzLCBwcm9wcy5maWx0ZXIsIGNvbXB1dGVkQ29scy52YWx1ZSwgZ2V0Q2VsbFZhbHVlKVxuICAgICAgfVxuXG4gICAgICBpZiAoY29sdW1uVG9Tb3J0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHJvd3MgPSBjb21wdXRlZFNvcnRNZXRob2QudmFsdWUoXG4gICAgICAgICAgcHJvcHMucm93cyA9PT0gcm93cyA/IHJvd3Muc2xpY2UoKSA6IHJvd3MsXG4gICAgICAgICAgc29ydEJ5LFxuICAgICAgICAgIGRlc2NlbmRpbmdcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm93c1xuICAgIH0pXG5cbiAgICBjb25zdCBmaWx0ZXJlZFNvcnRlZFJvd3NOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBmaWx0ZXJlZFNvcnRlZFJvd3MudmFsdWUubGVuZ3RoKVxuXG4gICAgY29uc3QgY29tcHV0ZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IHJvd3MgPSBmaWx0ZXJlZFNvcnRlZFJvd3MudmFsdWVcblxuICAgICAgaWYgKGlzU2VydmVyU2lkZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gcm93c1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHJvd3NQZXJQYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcblxuICAgICAgaWYgKHJvd3NQZXJQYWdlICE9PSAwKSB7XG4gICAgICAgIGlmIChmaXJzdFJvd0luZGV4LnZhbHVlID09PSAwICYmIHByb3BzLnJvd3MgIT09IHJvd3MpIHtcbiAgICAgICAgICBpZiAocm93cy5sZW5ndGggPiBsYXN0Um93SW5kZXgudmFsdWUpIHtcbiAgICAgICAgICAgIHJvd3MgPSByb3dzLnNsaWNlKDAsIGxhc3RSb3dJbmRleC52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcm93cyA9IHJvd3Muc2xpY2UoZmlyc3RSb3dJbmRleC52YWx1ZSwgbGFzdFJvd0luZGV4LnZhbHVlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dzXG4gICAgfSlcblxuICAgIGNvbnN0IHtcbiAgICAgIGhhc1NlbGVjdGlvbk1vZGUsXG4gICAgICBzaW5nbGVTZWxlY3Rpb24sXG4gICAgICBtdWx0aXBsZVNlbGVjdGlvbixcbiAgICAgIGFsbFJvd3NTZWxlY3RlZCxcbiAgICAgIHNvbWVSb3dzU2VsZWN0ZWQsXG4gICAgICByb3dzU2VsZWN0ZWROdW1iZXIsXG5cbiAgICAgIGlzUm93U2VsZWN0ZWQsXG4gICAgICBjbGVhclNlbGVjdGlvbixcbiAgICAgIHVwZGF0ZVNlbGVjdGlvblxuICAgIH0gPSB1c2VUYWJsZVJvd1NlbGVjdGlvbihwcm9wcywgZW1pdCwgY29tcHV0ZWRSb3dzLCBnZXRSb3dLZXkpXG5cbiAgICBjb25zdCB7IGNvbExpc3QsIGNvbXB1dGVkQ29scywgY29tcHV0ZWRDb2xzTWFwLCBjb21wdXRlZENvbHNwYW4gfSA9IHVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uKHByb3BzLCBjb21wdXRlZFBhZ2luYXRpb24sIGhhc1NlbGVjdGlvbk1vZGUpXG5cbiAgICBjb25zdCB7IGNvbHVtblRvU29ydCwgY29tcHV0ZWRTb3J0TWV0aG9kLCBzb3J0IH0gPSB1c2VUYWJsZVNvcnQocHJvcHMsIGNvbXB1dGVkUGFnaW5hdGlvbiwgY29sTGlzdCwgc2V0UGFnaW5hdGlvbilcblxuICAgIGNvbnN0IHtcbiAgICAgIGZpcnN0Um93SW5kZXgsXG4gICAgICBsYXN0Um93SW5kZXgsXG4gICAgICBpc0ZpcnN0UGFnZSxcbiAgICAgIGlzTGFzdFBhZ2UsXG4gICAgICBwYWdlc051bWJlcixcbiAgICAgIGNvbXB1dGVkUm93c1BlclBhZ2VPcHRpb25zLFxuICAgICAgY29tcHV0ZWRSb3dzTnVtYmVyLFxuXG4gICAgICBmaXJzdFBhZ2UsXG4gICAgICBwcmV2UGFnZSxcbiAgICAgIG5leHRQYWdlLFxuICAgICAgbGFzdFBhZ2VcbiAgICB9ID0gdXNlVGFibGVQYWdpbmF0aW9uKHZtLCBpbm5lclBhZ2luYXRpb24sIGNvbXB1dGVkUGFnaW5hdGlvbiwgaXNTZXJ2ZXJTaWRlLCBzZXRQYWdpbmF0aW9uLCBmaWx0ZXJlZFNvcnRlZFJvd3NOdW1iZXIpXG5cbiAgICBjb25zdCBub3RoaW5nVG9EaXNwbGF5ID0gY29tcHV0ZWQoKCkgPT4gY29tcHV0ZWRSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMClcblxuICAgIGNvbnN0IHZpcnRQcm9wcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHt9XG5cbiAgICAgIGNvbW1vblZpcnRQcm9wc0xpc3RcbiAgICAgICAgLmZvckVhY2gocCA9PiB7IGFjY1sgcCBdID0gcHJvcHNbIHAgXSB9KVxuXG4gICAgICBpZiAoYWNjLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGFjYy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUgPSBwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/IDI4IDogNDhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0pXG5cbiAgICBmdW5jdGlvbiByZXNldFZpcnR1YWxTY3JvbGwgKCkge1xuICAgICAgaGFzVmlydFNjcm9sbC52YWx1ZSA9PT0gdHJ1ZSAmJiB2aXJ0U2Nyb2xsUmVmLnZhbHVlLnJlc2V0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5ICgpIHtcbiAgICAgIGlmIChwcm9wcy5ncmlkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBnZXRHcmlkQm9keSgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhlYWRlciA9IHByb3BzLmhpZGVIZWFkZXIgIT09IHRydWUgPyBnZXRUSGVhZCA6IG51bGxcblxuICAgICAgaWYgKGhhc1ZpcnRTY3JvbGwudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgdG9wUm93ID0gc2xvdHNbICd0b3Atcm93JyBdXG4gICAgICAgIGNvbnN0IGJvdHRvbVJvdyA9IHNsb3RzWyAnYm90dG9tLXJvdycgXVxuXG4gICAgICAgIGNvbnN0IHZpcnRTbG90cyA9IHtcbiAgICAgICAgICBkZWZhdWx0OiBwcm9wcyA9PiBnZXRUQm9keVRSKHByb3BzLml0ZW0sIHNsb3RzLmJvZHksIHByb3BzLmluZGV4KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvcFJvdyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY29uc3QgdG9wQ29udGVudCA9IGgoJ3Rib2R5JywgdG9wUm93KHsgY29sczogY29tcHV0ZWRDb2xzLnZhbHVlIH0pKVxuXG4gICAgICAgICAgdmlydFNsb3RzLmJlZm9yZSA9IGhlYWRlciA9PT0gbnVsbFxuICAgICAgICAgICAgPyAoKSA9PiB0b3BDb250ZW50XG4gICAgICAgICAgICA6ICgpID0+IFsgaGVhZGVyKCkgXS5jb25jYXQodG9wQ29udGVudClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoZWFkZXIgIT09IG51bGwpIHtcbiAgICAgICAgICB2aXJ0U2xvdHMuYmVmb3JlID0gaGVhZGVyXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm90dG9tUm93ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICB2aXJ0U2xvdHMuYWZ0ZXIgPSAoKSA9PiBoKCd0Ym9keScsIGJvdHRvbVJvdyh7IGNvbHM6IGNvbXB1dGVkQ29scy52YWx1ZSB9KSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoKFFWaXJ0dWFsU2Nyb2xsLCB7XG4gICAgICAgICAgcmVmOiB2aXJ0U2Nyb2xsUmVmLFxuICAgICAgICAgIGNsYXNzOiBwcm9wcy50YWJsZUNsYXNzLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy50YWJsZVN0eWxlLFxuICAgICAgICAgIC4uLnZpcnRQcm9wcy52YWx1ZSxcbiAgICAgICAgICBzY3JvbGxUYXJnZXQ6IHByb3BzLnZpcnR1YWxTY3JvbGxUYXJnZXQsXG4gICAgICAgICAgaXRlbXM6IGNvbXB1dGVkUm93cy52YWx1ZSxcbiAgICAgICAgICB0eXBlOiAnX19xdGFibGUnLFxuICAgICAgICAgIHRhYmxlQ29sc3BhbjogY29tcHV0ZWRDb2xzcGFuLnZhbHVlLFxuICAgICAgICAgIG9uVmlydHVhbFNjcm9sbDogb25WU2Nyb2xsXG4gICAgICAgIH0sIHZpcnRTbG90cylcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGdldFRCb2R5KClcbiAgICAgIF1cblxuICAgICAgaWYgKGhlYWRlciAhPT0gbnVsbCkge1xuICAgICAgICBjaGlsZC51bnNoaWZ0KGhlYWRlcigpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0VGFibGVNaWRkbGUoe1xuICAgICAgICBjbGFzczogWyAncS10YWJsZV9fbWlkZGxlIHNjcm9sbCcsIHByb3BzLnRhYmxlQ2xhc3MgXSxcbiAgICAgICAgc3R5bGU6IHByb3BzLnRhYmxlU3R5bGVcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvICh0b0luZGV4LCBlZGdlKSB7XG4gICAgICBpZiAodmlydFNjcm9sbFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB2aXJ0U2Nyb2xsUmVmLnZhbHVlLnNjcm9sbFRvKHRvSW5kZXgsIGVkZ2UpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0b0luZGV4ID0gcGFyc2VJbnQodG9JbmRleCwgMTApXG4gICAgICBjb25zdCByb3dFbCA9IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcihgdGJvZHkgdHI6bnRoLW9mLXR5cGUoJHsgdG9JbmRleCArIDEgfSlgKVxuXG4gICAgICBpZiAocm93RWwgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsVGFyZ2V0ID0gcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCcucS10YWJsZV9fbWlkZGxlLnNjcm9sbCcpXG4gICAgICAgIGNvbnN0IHsgb2Zmc2V0VG9wIH0gPSByb3dFbFxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBvZmZzZXRUb3AgPCBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID8gJ2RlY3JlYXNlJyA6ICdpbmNyZWFzZSdcblxuICAgICAgICBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID0gb2Zmc2V0VG9wXG5cbiAgICAgICAgZW1pdCgndmlydHVhbC1zY3JvbGwnLCB7XG4gICAgICAgICAgaW5kZXg6IHRvSW5kZXgsXG4gICAgICAgICAgZnJvbTogMCxcbiAgICAgICAgICB0bzogaW5uZXJQYWdpbmF0aW9uLnZhbHVlLnJvd3NQZXJQYWdlIC0gMSxcbiAgICAgICAgICBkaXJlY3Rpb25cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblZTY3JvbGwgKGluZm8pIHtcbiAgICAgIGVtaXQoJ3ZpcnR1YWwtc2Nyb2xsJywgaW5mbylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9ncmVzcyAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKFFMaW5lYXJQcm9ncmVzcywge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJsZV9fbGluZWFyLXByb2dyZXNzJyxcbiAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXG4gICAgICAgICAgdHJhY2tDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICB9KVxuICAgICAgXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRCb2R5VFIgKHJvdywgYm9keVNsb3QsIHBhZ2VJbmRleCkge1xuICAgICAgY29uc3RcbiAgICAgICAga2V5ID0gZ2V0Um93S2V5LnZhbHVlKHJvdyksXG4gICAgICAgIHNlbGVjdGVkID0gaXNSb3dTZWxlY3RlZChrZXkpXG5cbiAgICAgIGlmIChib2R5U2xvdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBib2R5U2xvdChcbiAgICAgICAgICBnZXRCb2R5U2NvcGUoe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgcGFnZUluZGV4LFxuICAgICAgICAgICAgX190ckNsYXNzOiBzZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgYm9keUNlbGwgPSBzbG90c1sgJ2JvZHktY2VsbCcgXSxcbiAgICAgICAgY2hpbGQgPSBjb21wdXRlZENvbHMudmFsdWUubWFwKGNvbCA9PiB7XG4gICAgICAgICAgY29uc3RcbiAgICAgICAgICAgIGJvZHlDZWxsQ29sID0gc2xvdHNbIGBib2R5LWNlbGwtJHsgY29sLm5hbWUgfWAgXSxcbiAgICAgICAgICAgIHNsb3QgPSBib2R5Q2VsbENvbCAhPT0gdm9pZCAwID8gYm9keUNlbGxDb2wgOiBib2R5Q2VsbFxuXG4gICAgICAgICAgcmV0dXJuIHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBzbG90KGdldEJvZHlDZWxsU2NvcGUoeyBrZXksIHJvdywgcGFnZUluZGV4LCBjb2wgfSkpXG4gICAgICAgICAgICA6IGgoJ3RkJywge1xuICAgICAgICAgICAgICBjbGFzczogY29sLl9fdGRDbGFzcyhyb3cpLFxuICAgICAgICAgICAgICBzdHlsZTogY29sLl9fdGRTdHlsZShyb3cpXG4gICAgICAgICAgICB9LCBnZXRDZWxsVmFsdWUoY29sLCByb3cpKVxuICAgICAgICB9KVxuXG4gICAgICBpZiAoaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNbICdib2R5LXNlbGVjdGlvbicgXVxuICAgICAgICBjb25zdCBjb250ZW50ID0gc2xvdCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90KGdldEJvZHlTZWxlY3Rpb25TY29wZSh7IGtleSwgcm93LCBwYWdlSW5kZXggfSkpXG4gICAgICAgICAgOiBbXG4gICAgICAgICAgICAgIGgoUUNoZWNrYm94LCB7XG4gICAgICAgICAgICAgICAgbW9kZWxWYWx1ZTogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgICAgICAgICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiAoYWRkaW5nLCBldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGlvbihbIGtleSBdLCBbIHJvdyBdLCBhZGRpbmcsIGV2dClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICBoKCd0ZCcsIHsgY2xhc3M6ICdxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgfSwgY29udGVudClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0geyBrZXksIGNsYXNzOiB7IHNlbGVjdGVkIH0gfVxuXG4gICAgICBpZiAocHJvcHMub25Sb3dDbGljayAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRhdGEuY2xhc3NbICdjdXJzb3ItcG9pbnRlcicgXSA9IHRydWVcbiAgICAgICAgZGF0YS5vbkNsaWNrID0gZXZ0ID0+IHtcbiAgICAgICAgICBlbWl0KCdSb3dDbGljaycsIGV2dCwgcm93LCBwYWdlSW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm9uUm93RGJsY2xpY2sgIT09IHZvaWQgMCkge1xuICAgICAgICBkYXRhLmNsYXNzWyAnY3Vyc29yLXBvaW50ZXInIF0gPSB0cnVlXG4gICAgICAgIGRhdGEub25EYmxjbGljayA9IGV2dCA9PiB7XG4gICAgICAgICAgZW1pdCgnUm93RGJsY2xpY2snLCBldnQsIHJvdywgcGFnZUluZGV4KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vblJvd0NvbnRleHRtZW51ICE9PSB2b2lkIDApIHtcbiAgICAgICAgZGF0YS5jbGFzc1sgJ2N1cnNvci1wb2ludGVyJyBdID0gdHJ1ZVxuICAgICAgICBkYXRhLm9uQ29udGV4dG1lbnUgPSBldnQgPT4ge1xuICAgICAgICAgIGVtaXQoJ1Jvd0NvbnRleHRtZW51JywgZXZ0LCByb3csIHBhZ2VJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgndHInLCBkYXRhLCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUQm9keSAoKSB7XG4gICAgICBjb25zdFxuICAgICAgICBib2R5ID0gc2xvdHMuYm9keSxcbiAgICAgICAgdG9wUm93ID0gc2xvdHNbICd0b3Atcm93JyBdLFxuICAgICAgICBib3R0b21Sb3cgPSBzbG90c1sgJ2JvdHRvbS1yb3cnIF1cblxuICAgICAgbGV0IGNoaWxkID0gY29tcHV0ZWRSb3dzLnZhbHVlLm1hcChcbiAgICAgICAgKHJvdywgcGFnZUluZGV4KSA9PiBnZXRUQm9keVRSKHJvdywgYm9keSwgcGFnZUluZGV4KVxuICAgICAgKVxuXG4gICAgICBpZiAodG9wUm93ICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQgPSB0b3BSb3coeyBjb2xzOiBjb21wdXRlZENvbHMudmFsdWUgfSkuY29uY2F0KGNoaWxkKVxuICAgICAgfVxuICAgICAgaWYgKGJvdHRvbVJvdyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkID0gY2hpbGQuY29uY2F0KGJvdHRvbVJvdyh7IGNvbHM6IGNvbXB1dGVkQ29scy52YWx1ZSB9KSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ3Rib2R5JywgY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keVNjb3BlIChkYXRhKSB7XG4gICAgICBpbmplY3RCb2R5Q29tbW9uU2NvcGUoZGF0YSlcblxuICAgICAgZGF0YS5jb2xzID0gZGF0YS5jb2xzLm1hcChjb2wgPT4ge1xuICAgICAgICBjb25zdCBjID0geyAuLi5jb2wgfVxuICAgICAgICBpbmplY3RQcm9wKGMsICd2YWx1ZScsICgpID0+IGdldENlbGxWYWx1ZShjb2wsIGRhdGEucm93KSlcbiAgICAgICAgcmV0dXJuIGNcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBkYXRhXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keUNlbGxTY29wZSAoZGF0YSkge1xuICAgICAgaW5qZWN0Qm9keUNvbW1vblNjb3BlKGRhdGEpXG4gICAgICBpbmplY3RQcm9wKGRhdGEsICd2YWx1ZScsICgpID0+IGdldENlbGxWYWx1ZShkYXRhLmNvbCwgZGF0YS5yb3cpKVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5U2VsZWN0aW9uU2NvcGUgKGRhdGEpIHtcbiAgICAgIGluamVjdEJvZHlDb21tb25TY29wZShkYXRhKVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbmplY3RCb2R5Q29tbW9uU2NvcGUgKGRhdGEpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICBjb2xzOiBjb21wdXRlZENvbHMudmFsdWUsXG4gICAgICAgIGNvbHNNYXA6IGNvbXB1dGVkQ29sc01hcC52YWx1ZSxcbiAgICAgICAgc29ydCxcbiAgICAgICAgcm93SW5kZXg6IGZpcnN0Um93SW5kZXgudmFsdWUgKyBkYXRhLnBhZ2VJbmRleCxcbiAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWUsXG4gICAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZVxuICAgICAgfSlcblxuICAgICAgaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSAmJiBpbmplY3RQcm9wKFxuICAgICAgICBkYXRhLFxuICAgICAgICAnc2VsZWN0ZWQnLFxuICAgICAgICAoKSA9PiBpc1Jvd1NlbGVjdGVkKGRhdGEua2V5KSxcbiAgICAgICAgKGFkZGluZywgZXZ0KSA9PiB7XG4gICAgICAgICAgdXBkYXRlU2VsZWN0aW9uKFsgZGF0YS5rZXkgXSwgWyBkYXRhLnJvdyBdLCBhZGRpbmcsIGV2dClcbiAgICAgICAgfVxuICAgICAgKVxuXG4gICAgICBpbmplY3RQcm9wKFxuICAgICAgICBkYXRhLFxuICAgICAgICAnZXhwYW5kJyxcbiAgICAgICAgKCkgPT4gaXNSb3dFeHBhbmRlZChkYXRhLmtleSksXG4gICAgICAgIGFkZGluZyA9PiB7IHVwZGF0ZUV4cGFuZGVkKGRhdGEua2V5LCBhZGRpbmcpIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDZWxsVmFsdWUgKGNvbCwgcm93KSB7XG4gICAgICBjb25zdCB2YWwgPSB0eXBlb2YgY29sLmZpZWxkID09PSAnZnVuY3Rpb24nID8gY29sLmZpZWxkKHJvdykgOiByb3dbIGNvbC5maWVsZCBdXG4gICAgICByZXR1cm4gY29sLmZvcm1hdCAhPT0gdm9pZCAwID8gY29sLmZvcm1hdCh2YWwsIHJvdykgOiB2YWxcbiAgICB9XG5cbiAgICBjb25zdCBtYXJnaW5hbHNTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBwYWdpbmF0aW9uOiBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUsXG4gICAgICBwYWdlc051bWJlcjogcGFnZXNOdW1iZXIudmFsdWUsXG4gICAgICBpc0ZpcnN0UGFnZTogaXNGaXJzdFBhZ2UudmFsdWUsXG4gICAgICBpc0xhc3RQYWdlOiBpc0xhc3RQYWdlLnZhbHVlLFxuICAgICAgZmlyc3RQYWdlLFxuICAgICAgcHJldlBhZ2UsXG4gICAgICBuZXh0UGFnZSxcbiAgICAgIGxhc3RQYWdlLFxuXG4gICAgICBpbkZ1bGxzY3JlZW46IGluRnVsbHNjcmVlbi52YWx1ZSxcbiAgICAgIHRvZ2dsZUZ1bGxzY3JlZW5cbiAgICB9KSlcblxuICAgIGZ1bmN0aW9uIGdldFRvcERpdiAoKSB7XG4gICAgICBjb25zdFxuICAgICAgICB0b3AgPSBzbG90cy50b3AsXG4gICAgICAgIHRvcExlZnQgPSBzbG90c1sgJ3RvcC1sZWZ0JyBdLFxuICAgICAgICB0b3BSaWdodCA9IHNsb3RzWyAndG9wLXJpZ2h0JyBdLFxuICAgICAgICB0b3BTZWxlY3Rpb24gPSBzbG90c1sgJ3RvcC1zZWxlY3Rpb24nIF0sXG4gICAgICAgIGhhc1NlbGVjdGlvbiA9IGhhc1NlbGVjdGlvbk1vZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAmJiB0b3BTZWxlY3Rpb24gIT09IHZvaWQgMFxuICAgICAgICAgICYmIHJvd3NTZWxlY3RlZE51bWJlci52YWx1ZSA+IDAsXG4gICAgICAgIHRvcENsYXNzID0gJ3EtdGFibGVfX3RvcCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgaXRlbXMtY2VudGVyJ1xuXG4gICAgICBpZiAodG9wICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IHRvcENsYXNzIH0sIFsgdG9wKG1hcmdpbmFsc1Njb3BlLnZhbHVlKSBdKVxuICAgICAgfVxuXG4gICAgICBsZXQgY2hpbGRcblxuICAgICAgaWYgKGhhc1NlbGVjdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZCA9IHRvcFNlbGVjdGlvbihtYXJnaW5hbHNTY29wZS52YWx1ZSkuc2xpY2UoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNoaWxkID0gW11cblxuICAgICAgICBpZiAodG9wTGVmdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlLWNvbnRyb2wnIH0sIFtcbiAgICAgICAgICAgICAgdG9wTGVmdChtYXJnaW5hbHNTY29wZS52YWx1ZSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb3BzLnRpdGxlKSB7XG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19jb250cm9sJyB9LCBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogWyAncS10YWJsZV9fdGl0bGUnLCBwcm9wcy50aXRsZUNsYXNzIF1cbiAgICAgICAgICAgICAgfSwgcHJvcHMudGl0bGUpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodG9wUmlnaHQgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19zZXBhcmF0b3IgY29sJyB9KVxuICAgICAgICApXG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2NvbnRyb2wnIH0sIFtcbiAgICAgICAgICAgIHRvcFJpZ2h0KG1hcmdpbmFsc1Njb3BlLnZhbHVlKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IHRvcENsYXNzIH0sIGNoaWxkKVxuICAgIH1cblxuICAgIGNvbnN0IGhlYWRlclNlbGVjdGVkVmFsdWUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzb21lUm93c1NlbGVjdGVkLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IGFsbFJvd3NTZWxlY3RlZC52YWx1ZVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBnZXRUSGVhZCAoKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGdldFRIZWFkVFIoKVxuXG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBzbG90cy5sb2FkaW5nID09PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCd0cicsIHsgY2xhc3M6ICdxLXRhYmxlX19wcm9ncmVzcycgfSwgW1xuICAgICAgICAgICAgaCgndGgnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncmVsYXRpdmUtcG9zaXRpb24nLFxuICAgICAgICAgICAgICBjb2xzcGFuOiBjb21wdXRlZENvbHNwYW4udmFsdWVcbiAgICAgICAgICAgIH0sIGdldFByb2dyZXNzKCkpXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgndGhlYWQnLCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUSGVhZFRSICgpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGhlYWRlciA9IHNsb3RzLmhlYWRlcixcbiAgICAgICAgaGVhZGVyQ2VsbCA9IHNsb3RzWyAnaGVhZGVyLWNlbGwnIF1cblxuICAgICAgaWYgKGhlYWRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoZWFkZXIoXG4gICAgICAgICAgZ2V0SGVhZGVyU2NvcGUoeyBoZWFkZXI6IHRydWUgfSlcbiAgICAgICAgKS5zbGljZSgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gY29tcHV0ZWRDb2xzLnZhbHVlLm1hcChjb2wgPT4ge1xuICAgICAgICBjb25zdFxuICAgICAgICAgIGhlYWRlckNlbGxDb2wgPSBzbG90c1sgYGhlYWRlci1jZWxsLSR7IGNvbC5uYW1lIH1gIF0sXG4gICAgICAgICAgc2xvdCA9IGhlYWRlckNlbGxDb2wgIT09IHZvaWQgMCA/IGhlYWRlckNlbGxDb2wgOiBoZWFkZXJDZWxsLFxuICAgICAgICAgIHByb3BzID0gZ2V0SGVhZGVyU2NvcGUoeyBjb2wgfSlcblxuICAgICAgICByZXR1cm4gc2xvdCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90KHByb3BzKVxuICAgICAgICAgIDogaChRVGgsIHtcbiAgICAgICAgICAgIGtleTogY29sLm5hbWUsXG4gICAgICAgICAgICBwcm9wc1xuICAgICAgICAgIH0sICgpID0+IGNvbC5sYWJlbClcbiAgICAgIH0pXG5cbiAgICAgIGlmIChzaW5nbGVTZWxlY3Rpb24udmFsdWUgPT09IHRydWUgJiYgcHJvcHMuZ3JpZCAhPT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZC51bnNoaWZ0KFxuICAgICAgICAgIGgoJ3RoJywgeyBjbGFzczogJ3EtdGFibGUtLWNvbC1hdXRvLXdpZHRoJyB9LCAnICcpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG11bHRpcGxlU2VsZWN0aW9uLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHNsb3QgPSBzbG90c1sgJ2hlYWRlci1zZWxlY3Rpb24nIF1cbiAgICAgICAgY29uc3QgY29udGVudCA9IHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdChnZXRIZWFkZXJTY29wZSh7fSkpXG4gICAgICAgICAgOiBbXG4gICAgICAgICAgICAgIGgoUUNoZWNrYm94LCB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgICAgIG1vZGVsVmFsdWU6IGhlYWRlclNlbGVjdGVkVmFsdWUudmFsdWUsXG4gICAgICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZSxcbiAgICAgICAgICAgICAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IG9uTXVsdGlwbGVTZWxlY3Rpb25TZXRcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cblxuICAgICAgICBjaGlsZC51bnNoaWZ0KFxuICAgICAgICAgIGgoJ3RoJywgeyBjbGFzczogJ3EtdGFibGUtLWNvbC1hdXRvLXdpZHRoJyB9LCBjb250ZW50KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXG4gICAgICAgIGgoJ3RyJywge1xuICAgICAgICAgIGNsYXNzOiBwcm9wcy50YWJsZUhlYWRlckNsYXNzLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy50YWJsZUhlYWRlclN0eWxlXG4gICAgICAgIH0sIGNoaWxkKVxuICAgICAgXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlclNjb3BlIChkYXRhKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgY29sczogY29tcHV0ZWRDb2xzLnZhbHVlLFxuICAgICAgICBzb3J0LFxuICAgICAgICBjb2xzTWFwOiBjb21wdXRlZENvbHNNYXAudmFsdWUsXG4gICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2VcbiAgICAgIH0pXG5cbiAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpbmplY3RQcm9wKFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICAgICAgICAoKSA9PiBoZWFkZXJTZWxlY3RlZFZhbHVlLnZhbHVlLFxuICAgICAgICAgIG9uTXVsdGlwbGVTZWxlY3Rpb25TZXRcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTXVsdGlwbGVTZWxlY3Rpb25TZXQgKHZhbCkge1xuICAgICAgaWYgKHNvbWVSb3dzU2VsZWN0ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdmFsID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgdXBkYXRlU2VsZWN0aW9uKFxuICAgICAgICBjb21wdXRlZFJvd3MudmFsdWUubWFwKGdldFJvd0tleS52YWx1ZSksXG4gICAgICAgIGNvbXB1dGVkUm93cy52YWx1ZSxcbiAgICAgICAgdmFsXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbmF2SWNvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGljbyA9IFtcbiAgICAgICAgcHJvcHMuaWNvbkZpcnN0UGFnZSB8fCAkcS5pY29uU2V0LnRhYmxlLmZpcnN0UGFnZSxcbiAgICAgICAgcHJvcHMuaWNvblByZXZQYWdlIHx8ICRxLmljb25TZXQudGFibGUucHJldlBhZ2UsXG4gICAgICAgIHByb3BzLmljb25OZXh0UGFnZSB8fCAkcS5pY29uU2V0LnRhYmxlLm5leHRQYWdlLFxuICAgICAgICBwcm9wcy5pY29uTGFzdFBhZ2UgfHwgJHEuaWNvblNldC50YWJsZS5sYXN0UGFnZVxuICAgICAgXVxuICAgICAgcmV0dXJuICRxLmxhbmcucnRsID09PSB0cnVlID8gaWNvLnJldmVyc2UoKSA6IGljb1xuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBnZXRCb3R0b21EaXYgKCkge1xuICAgICAgaWYgKHByb3BzLmhpZGVCb3R0b20gPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChub3RoaW5nVG9EaXNwbGF5LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm9wcy5oaWRlTm9EYXRhID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gcHJvcHMubG9hZGluZyA9PT0gdHJ1ZVxuICAgICAgICAgID8gcHJvcHMubG9hZGluZ0xhYmVsIHx8ICRxLmxhbmcudGFibGUubG9hZGluZ1xuICAgICAgICAgIDogKHByb3BzLmZpbHRlciA/IHByb3BzLm5vUmVzdWx0c0xhYmVsIHx8ICRxLmxhbmcudGFibGUubm9SZXN1bHRzIDogcHJvcHMubm9EYXRhTGFiZWwgfHwgJHEubGFuZy50YWJsZS5ub0RhdGEpXG5cbiAgICAgICAgY29uc3Qgbm9EYXRhID0gc2xvdHNbICduby1kYXRhJyBdXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9EYXRhICE9PSB2b2lkIDBcbiAgICAgICAgICA/IFsgbm9EYXRhKHsgbWVzc2FnZSwgaWNvbjogJHEuaWNvblNldC50YWJsZS53YXJuaW5nLCBmaWx0ZXI6IHByb3BzLmZpbHRlciB9KSBdXG4gICAgICAgICAgOiBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtdGFibGVfX2JvdHRvbS1ub2RhdGEtaWNvbicsXG4gICAgICAgICAgICAgICAgbmFtZTogJHEuaWNvblNldC50YWJsZS53YXJuaW5nXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IGJvdHRvbUNsYXNzICsgJyBxLXRhYmxlX19ib3R0b20tLW5vZGF0YScgfSwgY2hpbGRyZW4pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJvdHRvbSA9IHNsb3RzLmJvdHRvbVxuXG4gICAgICBpZiAoYm90dG9tICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IGJvdHRvbUNsYXNzIH0sIFsgYm90dG9tKG1hcmdpbmFsc1Njb3BlLnZhbHVlKSBdKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IHByb3BzLmhpZGVTZWxlY3RlZEJhbm5lciAhPT0gdHJ1ZSAmJiBoYXNTZWxlY3Rpb25Nb2RlLnZhbHVlID09PSB0cnVlICYmIHJvd3NTZWxlY3RlZE51bWJlci52YWx1ZSA+IDBcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fY29udHJvbCcgfSwgW1xuICAgICAgICAgICAgICBoKCdkaXYnLCBbXG4gICAgICAgICAgICAgICAgKHByb3BzLnNlbGVjdGVkUm93c0xhYmVsIHx8ICRxLmxhbmcudGFibGUuc2VsZWN0ZWRSZWNvcmRzKShyb3dzU2VsZWN0ZWROdW1iZXIudmFsdWUpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXVxuXG4gICAgICBpZiAocHJvcHMuaGlkZVBhZ2luYXRpb24gIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogYm90dG9tQ2xhc3MgKyAnIGp1c3RpZnktZW5kJ1xuICAgICAgICB9LCBnZXRQYWdpbmF0aW9uRGl2KGNoaWxkKSlcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IGJvdHRvbUNsYXNzIH0sIGNoaWxkKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFnU2VsZWN0aW9uIChwYWcpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oe1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICByb3dzUGVyUGFnZTogcGFnLnZhbHVlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhZ2luYXRpb25EaXYgKGNoaWxkKSB7XG4gICAgICBsZXQgY29udHJvbFxuICAgICAgY29uc3RcbiAgICAgICAgeyByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLFxuICAgICAgICBwYWdpbmF0aW9uTGFiZWwgPSBwcm9wcy5wYWdpbmF0aW9uTGFiZWwgfHwgJHEubGFuZy50YWJsZS5wYWdpbmF0aW9uLFxuICAgICAgICBwYWdpbmF0aW9uU2xvdCA9IHNsb3RzLnBhZ2luYXRpb24sXG4gICAgICAgIGhhc09wdHMgPSBwcm9wcy5yb3dzUGVyUGFnZU9wdGlvbnMubGVuZ3RoID4gMVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fc2VwYXJhdG9yIGNvbCcgfSlcbiAgICAgIClcblxuICAgICAgaWYgKGhhc09wdHMgPT09IHRydWUpIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fY29udHJvbCcgfSwgW1xuICAgICAgICAgICAgaCgnc3BhbicsIHsgY2xhc3M6ICdxLXRhYmxlX19ib3R0b20taXRlbScgfSwgW1xuICAgICAgICAgICAgICBwcm9wcy5yb3dzUGVyUGFnZUxhYmVsIHx8ICRxLmxhbmcudGFibGUucmVjb3Jkc1BlclBhZ2VcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgaChRU2VsZWN0LCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncS10YWJsZV9fc2VsZWN0IGlubGluZSBxLXRhYmxlX19ib3R0b20taXRlbScsXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgbW9kZWxWYWx1ZTogcm93c1BlclBhZ2UsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IGNvbXB1dGVkUm93c1BlclBhZ2VPcHRpb25zLnZhbHVlLFxuICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6IHJvd3NQZXJQYWdlID09PSAwXG4gICAgICAgICAgICAgICAgPyAkcS5sYW5nLnRhYmxlLmFsbFJvd3NcbiAgICAgICAgICAgICAgICA6IHJvd3NQZXJQYWdlLFxuICAgICAgICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWUsXG4gICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICBvcHRpb25zRGVuc2U6IHRydWUsXG4gICAgICAgICAgICAgIG9wdGlvbnNDb3ZlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBvblBhZ1NlbGVjdGlvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChwYWdpbmF0aW9uU2xvdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnRyb2wgPSBwYWdpbmF0aW9uU2xvdChtYXJnaW5hbHNTY29wZS52YWx1ZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb250cm9sID0gW1xuICAgICAgICAgIGgoJ3NwYW4nLCByb3dzUGVyUGFnZSAhPT0gMCA/IHsgY2xhc3M6ICdxLXRhYmxlX19ib3R0b20taXRlbScgfSA6IHt9LCBbXG4gICAgICAgICAgICByb3dzUGVyUGFnZVxuICAgICAgICAgICAgICA/IHBhZ2luYXRpb25MYWJlbChmaXJzdFJvd0luZGV4LnZhbHVlICsgMSwgTWF0aC5taW4obGFzdFJvd0luZGV4LnZhbHVlLCBjb21wdXRlZFJvd3NOdW1iZXIudmFsdWUpLCBjb21wdXRlZFJvd3NOdW1iZXIudmFsdWUpXG4gICAgICAgICAgICAgIDogcGFnaW5hdGlvbkxhYmVsKDEsIGZpbHRlcmVkU29ydGVkUm93c051bWJlci52YWx1ZSwgY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlKVxuICAgICAgICAgIF0pXG4gICAgICAgIF1cblxuICAgICAgICBpZiAocm93c1BlclBhZ2UgIT09IDAgJiYgcGFnZXNOdW1iZXIudmFsdWUgPiAxKSB7XG4gICAgICAgICAgY29uc3QgYnRuUHJvcHMgPSB7XG4gICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICByb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgZmxhdDogdHJ1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYnRuUHJvcHMuc2l6ZSA9ICdzbSdcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYWdlc051bWJlci52YWx1ZSA+IDIgJiYgY29udHJvbC5wdXNoKFxuICAgICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICAgIGtleTogJ3BnRmlyc3QnLFxuICAgICAgICAgICAgICAuLi5idG5Qcm9wcyxcbiAgICAgICAgICAgICAgaWNvbjogbmF2SWNvbi52YWx1ZVsgMCBdLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0ZpcnN0UGFnZS52YWx1ZSxcbiAgICAgICAgICAgICAgb25DbGljazogZmlyc3RQYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcblxuICAgICAgICAgIGNvbnRyb2wucHVzaChcbiAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICBrZXk6ICdwZ1ByZXYnLFxuICAgICAgICAgICAgICAuLi5idG5Qcm9wcyxcbiAgICAgICAgICAgICAgaWNvbjogbmF2SWNvbi52YWx1ZVsgMSBdLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0ZpcnN0UGFnZS52YWx1ZSxcbiAgICAgICAgICAgICAgb25DbGljazogcHJldlBhZ2VcbiAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAga2V5OiAncGdOZXh0JyxcbiAgICAgICAgICAgICAgLi4uYnRuUHJvcHMsXG4gICAgICAgICAgICAgIGljb246IG5hdkljb24udmFsdWVbIDIgXSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNMYXN0UGFnZS52YWx1ZSxcbiAgICAgICAgICAgICAgb25DbGljazogbmV4dFBhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgcGFnZXNOdW1iZXIudmFsdWUgPiAyICYmIGNvbnRyb2wucHVzaChcbiAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICBrZXk6ICdwZ0xhc3QnLFxuICAgICAgICAgICAgICAuLi5idG5Qcm9wcyxcbiAgICAgICAgICAgICAgaWNvbjogbmF2SWNvbi52YWx1ZVsgMyBdLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0xhc3RQYWdlLnZhbHVlLFxuICAgICAgICAgICAgICBvbkNsaWNrOiBsYXN0UGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2NvbnRyb2wnIH0sIGNvbnRyb2wpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEdyaWRIZWFkZXIgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBwcm9wcy5ncmlkSGVhZGVyID09PSB0cnVlXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaCgndGFibGUnLCB7IGNsYXNzOiAncS10YWJsZScgfSwgW1xuICAgICAgICAgICAgICBnZXRUSGVhZChoKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgICAgIDogKFxuICAgICAgICAgICAgcHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBzbG90cy5sb2FkaW5nID09PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyBnZXRQcm9ncmVzcyhoKVxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19taWRkbGUnIH0sIGNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEdyaWRCb2R5ICgpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBzbG90cy5pdGVtICE9PSB2b2lkIDBcbiAgICAgICAgPyBzbG90cy5pdGVtXG4gICAgICAgIDogc2NvcGUgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gc2NvcGUuY29scy5tYXAoXG4gICAgICAgICAgICBjb2wgPT4gaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2dyaWQtaXRlbS1yb3cnIH0sIFtcbiAgICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2dyaWQtaXRlbS10aXRsZScgfSwgWyBjb2wubGFiZWwgXSksXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0tdmFsdWUnIH0sIFsgY29sLnZhbHVlIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChoYXNTZWxlY3Rpb25Nb2RlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNbICdib2R5LXNlbGVjdGlvbicgXVxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/IHNsb3Qoc2NvcGUpXG4gICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgaChRQ2hlY2tib3gsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZTogc2NvcGUuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgICAgICAgICAgICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogKGFkZGluZywgZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0aW9uKFsgc2NvcGUua2V5IF0sIFsgc2NvcGUucm93IF0sIGFkZGluZywgZXZ0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2dyaWQtaXRlbS1yb3cnIH0sIGNvbnRlbnQpLFxuICAgICAgICAgICAgICBoKFFTZXBhcmF0b3IsIHsgZGFyazogaXNEYXJrLnZhbHVlIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICdxLXRhYmxlX19ncmlkLWl0ZW0tY2FyZCcgKyBjYXJkRGVmYXVsdENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICBwcm9wcy5jYXJkQ2xhc3NcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdHlsZTogcHJvcHMuY2FyZFN0eWxlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcHJvcHMub25Sb3dDbGljayAhPT0gdm9pZCAwXG4gICAgICAgICAgICB8fCBwcm9wcy5vblJvd0RibGNsaWNrICE9PSB2b2lkIDBcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGRhdGEuY2xhc3NbIDAgXSArPSAnIGN1cnNvci1wb2ludGVyJ1xuXG4gICAgICAgICAgICBpZiAocHJvcHMub25Sb3dDbGljayAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGRhdGEub25DbGljayA9IGV2dCA9PiB7XG4gICAgICAgICAgICAgICAgZW1pdCgnUm93Q2xpY2snLCBldnQsIHNjb3BlLnJvdywgc2NvcGUucGFnZUluZGV4KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5vblJvd0RibGNsaWNrICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgZGF0YS5vbkRibGNsaWNrID0gZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICBlbWl0KCdSb3dEYmxjbGljaycsIGV2dCwgc2NvcGUucm93LCBzY29wZS5wYWdlSW5kZXgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0gY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC00IGNvbC1sZy0zJ1xuICAgICAgICAgICAgICArIChzY29wZS5zZWxlY3RlZCA9PT0gdHJ1ZSA/ICcgcS10YWJsZV9fZ3JpZC1pdGVtLS1zZWxlY3RlZCcgOiAnJylcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCdkaXYnLCBkYXRhLCBjaGlsZClcbiAgICAgICAgICBdKVxuICAgICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgJ3EtdGFibGVfX2dyaWQtY29udGVudCByb3cnLFxuICAgICAgICAgIHByb3BzLmNhcmRDb250YWluZXJDbGFzc1xuICAgICAgICBdLFxuICAgICAgICBzdHlsZTogcHJvcHMuY2FyZENvbnRhaW5lclN0eWxlXG4gICAgICB9LCBjb21wdXRlZFJvd3MudmFsdWUubWFwKChyb3csIHBhZ2VJbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbShnZXRCb2R5U2NvcGUoe1xuICAgICAgICAgIGtleTogZ2V0Um93S2V5LnZhbHVlKHJvdyksXG4gICAgICAgICAgcm93LFxuICAgICAgICAgIHBhZ2VJbmRleFxuICAgICAgICB9KSlcbiAgICAgIH0pKVxuICAgIH1cblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyBhbmQgbmVlZGVkIGNvbXB1dGVkIHByb3BzXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgcmVxdWVzdFNlcnZlckludGVyYWN0aW9uLFxuICAgICAgc2V0UGFnaW5hdGlvbixcbiAgICAgIGZpcnN0UGFnZSxcbiAgICAgIHByZXZQYWdlLFxuICAgICAgbmV4dFBhZ2UsXG4gICAgICBsYXN0UGFnZSxcbiAgICAgIGlzUm93U2VsZWN0ZWQsXG4gICAgICBjbGVhclNlbGVjdGlvbixcbiAgICAgIGlzUm93RXhwYW5kZWQsXG4gICAgICBzZXRFeHBhbmRlZCxcbiAgICAgIHNvcnQsXG4gICAgICByZXNldFZpcnR1YWxTY3JvbGwsXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIGdldENlbGxWYWx1ZVxuICAgIH0pXG5cbiAgICBpbmplY3RNdWx0aXBsZVByb3BzKHZtLnByb3h5LCB7XG4gICAgICBmaWx0ZXJlZFNvcnRlZFJvd3M6ICgpID0+IGZpbHRlcmVkU29ydGVkUm93cy52YWx1ZSxcbiAgICAgIGNvbXB1dGVkUm93czogKCkgPT4gY29tcHV0ZWRSb3dzLnZhbHVlLFxuICAgICAgY29tcHV0ZWRSb3dzTnVtYmVyOiAoKSA9PiBjb21wdXRlZFJvd3NOdW1iZXIudmFsdWVcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gWyBnZXRUb3BEaXYoKSBdXG4gICAgICBjb25zdCBkYXRhID0geyByZWY6IHJvb3RSZWYsIGNsYXNzOiBjb250YWluZXJDbGFzcy52YWx1ZSB9XG5cbiAgICAgIGlmIChwcm9wcy5ncmlkID09PSB0cnVlKSB7XG4gICAgICAgIGNoaWxkLnB1c2goZ2V0R3JpZEhlYWRlcigpKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICAgIGNsYXNzOiBbIGRhdGEuY2xhc3MsIHByb3BzLmNhcmRDbGFzcyBdLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5jYXJkU3R5bGVcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgZ2V0Qm9keSgpLFxuICAgICAgICBnZXRCb3R0b21EaXYoKVxuICAgICAgKVxuXG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBzbG90cy5sb2FkaW5nKClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2JywgZGF0YSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgY29uc3Qgc2tlbGV0b25UeXBlcyA9IFtcbiAgJ3RleHQnLCAncmVjdCcsICdjaXJjbGUnLFxuICAnUUJ0bicsICdRQmFkZ2UnLCAnUUNoaXAnLCAnUVRvb2xiYXInLFxuICAnUUNoZWNrYm94JywgJ1FSYWRpbycsICdRVG9nZ2xlJyxcbiAgJ1FTbGlkZXInLCAnUVJhbmdlJywgJ1FJbnB1dCcsXG4gICdRQXZhdGFyJ1xuXVxuXG5leHBvcnQgY29uc3Qgc2tlbGV0b25BbmltYXRpb25zID0gW1xuICAnd2F2ZScsICdwdWxzZScsICdwdWxzZS14JywgJ3B1bHNlLXknLCAnZmFkZScsICdibGluaycsICdub25lJ1xuXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNrZWxldG9uJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHNrZWxldG9uVHlwZXMuaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAncmVjdCdcbiAgICB9LFxuXG4gICAgYW5pbWF0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gc2tlbGV0b25BbmltYXRpb25zLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ3dhdmUnXG4gICAgfSxcbiAgICBhbmltYXRpb25TcGVlZDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMTUwMFxuICAgIH0sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG5cbiAgICBzaXplOiBTdHJpbmcsXG4gICAgd2lkdGg6IFN0cmluZyxcbiAgICBoZWlnaHQ6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzaXplID0gcHJvcHMuc2l6ZSAhPT0gdm9pZCAwXG4gICAgICAgID8gWyBwcm9wcy5zaXplLCBwcm9wcy5zaXplIF1cbiAgICAgICAgOiBbIHByb3BzLndpZHRoLCBwcm9wcy5oZWlnaHQgXVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAnLS1xLXNrZWxldG9uLXNwZWVkJzogYCR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tc2AsXG4gICAgICAgIHdpZHRoOiBzaXplWyAwIF0sXG4gICAgICAgIGhlaWdodDogc2l6ZVsgMSBdXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtc2tlbGV0b24gcS1za2VsZXRvbi0tJHsgaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJ2RhcmsnIDogJ2xpZ2h0JyB9IHEtc2tlbGV0b24tLXR5cGUtJHsgcHJvcHMudHlwZSB9YFxuICAgICAgKyAocHJvcHMuYW5pbWF0aW9uICE9PSAnbm9uZScgPyBgIHEtc2tlbGV0b24tLWFuaW0gcS1za2VsZXRvbi0tYW5pbS0keyBwcm9wcy5hbmltYXRpb24gfWAgOiAnJylcbiAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1za2VsZXRvbi0tc3F1YXJlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtc2tlbGV0b24tLWJvcmRlcmVkJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKHByb3BzLnRhZywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8ZGl2IHYtaWY9XCIhaGlkZVRvcFwiIGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1tZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy04XCI+XG4gICAgICAgIDxxLXNrZWxldG9uIGhlaWdodD1cIjM5cHhcIiB0eXBlPVwiUUJ0blwiIHdpZHRoPVwiMjUwcHhcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTRcIj5cbiAgICAgICAgPHEtc2tlbGV0b24gaGVpZ2h0PVwiMzlweFwiIHdpZHRoPVwiMTUwcHhcIiBjbGFzcz1cImZsb2F0LXJpZ2h0XCIgdHlwZT1cIlFCdG5cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHEtbWFya3VwLXRhYmxlIHNxdWFyZSBmbGF0IGNsYXNzPVwicS1tdC1sZ1wiPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoIGNsYXNzPVwidGV4dC1sZWZ0XCIgc3R5bGU9XCJ3aWR0aDogMTUwcHhcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPHRoIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gYW5pbWF0aW9uPVwiYmxpbmtcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgPC90aD5cbiAgICAgICAgICA8dGggY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1za2VsZXRvbiBhbmltYXRpb249XCJibGlua1wiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICA8L3RoPlxuICAgICAgICAgIDx0aCBjbGFzcz1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPHRoIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gYW5pbWF0aW9uPVwiYmxpbmtcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgPC90aD5cbiAgICAgICAgICA8dGggY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+PC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgPHRyIHYtZm9yPVwibiBpbiByb3dOdW1uZXJzXCIgOmtleT1cIm5cIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiB3aWR0aD1cIjg1cHhcIiAvPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gYW5pbWF0aW9uPVwiYmxpbmtcIiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNTBweFwiIC8+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1za2VsZXRvbiBhbmltYXRpb249XCJibGlua1wiIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCIzNXB4XCIgLz5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiB3aWR0aD1cIjY1cHhcIiAvPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gYW5pbWF0aW9uPVwiYmxpbmtcIiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiMjVweFwiIC8+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJmYWwgZmEtZWxsaXBzaXMtaFwiIGNvbG9yPVwiZ3JleS00XCIgY2xhc3M9XCJxLW1yLXNtXCIgc2l6ZT1cInNtXCIgLz5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90Ym9keT5cbiAgICA8L3EtbWFya3VwLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIHJvd051bW5lcnM6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDEwLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgaGlkZVRvcDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtZHJhd2VyXG4gICAgICBzaWRlPVwicmlnaHRcIlxuICAgICAgcmVmPVwiZmlsdGVyXCJcbiAgICAgIGJvcmRlcmVkXG4gICAgICA6d2lkdGg9XCIyODBcIlxuICAgICAgOmJyZWFrcG9pbnQ9XCI1MDBcIlxuICAgICAgY29udGVudC1jbGFzcz1cImJnLWdyZXktM1wiXG4gICAgPlxuICAgICAgPHEtdG9vbGJhciBzdHlsZT1cImhlaWdodDogODlweFwiIGxpZ2h0PlxuICAgICAgICA8cS10b29sYmFyLXRpdGxlIGNsYXNzPVwicS1tbC14c1wiPnt7IGZpbHRlclRpdGxlIH19PC9xLXRvb2xiYXItdGl0bGU+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IHJvdW5kIGRlbnNlIEBjbGljaz1cIiRyZWZzLmZpbHRlci5oaWRlKClcIiAvPlxuICAgICAgPC9xLXRvb2xiYXI+XG4gICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgIDxxLWNhcmQgY2xhc3M9XCJiZy10cmFuc3BhcmVudFwiIGZsYXQgc3F1YXJlPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgcS1jb2wtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPHNsb3QgbmFtZT1cImFkdmFuY2VkLWZpbHRlclwiIHYtYmluZDpzeW5jUGFnaW5hdGlvbj1cInN5bmNQYWdpbmF0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBmaWx0ZXJzXCIgOmtleT1cImluZGV4XCIgY2xhc3M9XCJjb2wtMTIgZmlsdGVyLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiaXRlbS50aXRsZVwiIGNsYXNzPVwidGV4dC1sYWJlbFwiPnt7IGl0ZW0udGl0bGUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPGNvbXBvbmVudFxuICAgICAgICAgICAgICAgIDppcz1cIml0ZW0uY29tcG9uZW50XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic3luY1BhZ2luYXRpb25baXRlbS5rZXldXCJcbiAgICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VuZFNlcnZlclJlcXVlc3RcIlxuICAgICAgICAgICAgICAgIHYtYmluZD1cIml0ZW1cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRyYXdlcj5cbiAgICA8dGVtcGxhdGUgdi1pZj1cInN5bmNQYWdpbmF0aW9uLmxvYWRlZFwiPlxuICAgICAgPHEtdGFibGVcbiAgICAgICAgY2xhc3M9XCJtYWluLXRhYmxlXCJcbiAgICAgICAgc3F1YXJlXG4gICAgICAgIDpncmlkPVwiZ3JpZFwiXG4gICAgICAgIDpyb3dzPVwicm93c1wiXG4gICAgICAgIDpjb2x1bW5zPVwiY29sdW1uc1wiXG4gICAgICAgIDpib3JkZXJlZD1cImJvcmRlcmVkXCJcbiAgICAgICAgOmhpZGUtaGVhZGVyPVwiaGlkZUhlYWRlclwiXG4gICAgICAgIDpmbGF0PVwiZmxhdFwiXG4gICAgICAgIHJvdy1rZXk9XCJpZFwiXG4gICAgICAgIDpoaWRlLXBhZ2luYXRpb249XCJoaWRlUGFnaW5hdGlvblwiXG4gICAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJyb3dzUGVyUGFnZU9wdGlvbnNcIlxuICAgICAgICA6ZmlsdGVyPVwic3luY1BhZ2luYXRpb24uZmlsdGVyXCJcbiAgICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwic3luY1BhZ2luYXRpb25cIlxuICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICA6c2VsZWN0aW9uPVwic2VsZWN0aW9uXCJcbiAgICAgICAgdi1tb2RlbDpzZWxlY3RlZD1cInNlbGVjdGVkXCJcbiAgICAgICAgQHJlcXVlc3Q9XCJvblJlcXVlc3RcIlxuICAgICAgICBAcm93LWNsaWNrPVwib25Sb3dDbGlja2VkXCJcbiAgICAgICAgOm5vLWRhdGEtbGFiZWw9XCJub0RhdGFMYWJlbFwiXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiIWhpZGVUb3BcIiB2LXNsb3Q6dG9wPVwic2NvcGVcIj5cbiAgICAgICAgICA8c2xvdFxuICAgICAgICAgICAgbmFtZT1cInRvcFwiXG4gICAgICAgICAgICB2LWJpbmQ9XCJzY29wZVwiXG4gICAgICAgICAgICB2LWJpbmQ6cGVybWlzc2lvbnM9XCJwZXJtaXNzaW9uc1wiXG4gICAgICAgICAgICB2LWJpbmQ6c2VsZWN0ZWQ9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICB2LWJpbmQ6dG9vbGJhcj1cInRvb2xiYXJJdGVtc1wiXG4gICAgICAgICAgICB2LWJpbmQ6b25Ub29sYmFyQ2xpY2tlZD1cIm9uVG9vbGJhckNsaWNrZWRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IDpjbGFzcz1cImBjb2wtc20tJHt0b3BMZWZ0V2lkdGh9IGNvbC14cy0xMmBcIj5cbiAgICAgICAgICAgICAgICAgIDxzbG90XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ0b3AtbGVmdFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBlcm1pc3Npb25zPVwicGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c2VsZWN0ZWQ9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDp0b29sYmFyPVwidG9vbGJhckl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwic3luY1BhZ2luYXRpb24uZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUXVpY2sgc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhc3luY1BhZ2luYXRpb24uZmlsdGVyXCIgbmFtZT1cImZhcyBmYS1zZWFyY2hcIiBzaXplPVwiMTZweFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgOmNsYXNzPVwiYGNvbC1zbS0ke3RvcFJpZ2h0V2lkdGh9IGNvbC14cy0xMiB0ZXh0LXJpZ2h0YFwiPlxuICAgICAgICAgICAgICAgICAgPHNsb3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInRvcC1yaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBlcm1pc3Npb25zPVwicGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c2VsZWN0ZWQ9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDp0b29sYmFyPVwidG9vbGJhckl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIiFzeW5jUGFnaW5hdGlvbi5kZWxldGVkICYmIHNlbGVjdGVkLmxlbmd0aCA+IDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b29sYmFyLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZT1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFoYXNQZXJtaXNzaW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246ICdEZWxldGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGljb249XCJmYXMgZmEtdHJhc2gtYWx0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCIxM3B4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRvb2xiYXJDbGlja2VkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2RlbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZz1cIjhweCAyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b29sYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuby1jYXBzXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cInN5bmNQYWdpbmF0aW9uLmRlbGV0ZWQgJiYgc2VsZWN0ZWQubGVuZ3RoID4gMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRvb2xiYXItaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWhhc1Blcm1pc3Npb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogJ0RlbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImZhcyBmYS10cmFzaC11bmRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIjEzcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG9vbGJhckNsaWNrZWQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAncmVzdG9yZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZz1cIjhweCAyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b29sYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJSZXN0b3JlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gdG9vbGJhckl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LXNob3c9XCJoYXNQZXJtaXNzaW9uKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9vbGJhci1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIml0ZW0uY29tcG9uZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXM9XCJpdGVtLmNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInN5bmNQYWdpbmF0aW9uW2l0ZW0ua2V5XVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIm9uVG9vbGJhckNsaWNrZWQoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZD1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCIxM3B4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvblRvb2xiYXJDbGlja2VkKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nPVwiOXB4IDIwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZD1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmhlYWRlci1zZWxlY3Rpb249XCJzY29wZVwiPlxuICAgICAgICAgIDxzbG90IG5hbWU9XCJoZWFkZXItc2VsZWN0aW9uXCIgdi1iaW5kPVwic2NvcGVcIj5cbiAgICAgICAgICAgIDxxLWNoZWNrYm94IHNpemU9XCJzbVwiIHYtbW9kZWw9XCJzY29wZS5zZWxlY3RlZFwiIC8+XG4gICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1zZWxlY3Rpb249XCJzY29wZVwiPlxuICAgICAgICAgIDxzbG90IG5hbWU9XCJib2R5LXNlbGVjdGlvblwiIHYtYmluZD1cInNjb3BlXCI+XG4gICAgICAgICAgICA8cS1jaGVja2JveCBzaXplPVwic21cIiB2LW1vZGVsPVwic2NvcGUuc2VsZWN0ZWRcIiAvPlxuICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJzbG90IGluIHRhYmxlU2xvdHNcIiB2LXNsb3Q6W3Nsb3RdPVwicHJvcHNcIj5cbiAgICAgICAgICA8c2xvdFxuICAgICAgICAgICAgOm5hbWU9XCJzbG90XCJcbiAgICAgICAgICAgIHYtYmluZD1cInByb3BzXCJcbiAgICAgICAgICAgIHYtYmluZDpwcm9wcz1cInByb3BzXCJcbiAgICAgICAgICAgIHYtYmluZDpwZXJtaXNzaW9ucz1cInBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgIHYtYmluZDphY3Rpb25zPVwiYWN0aW9uSXRlbXNcIlxuICAgICAgICAgICAgdi1iaW5kOm9uQWN0aW9uQ2xpY2tlZD1cIm9uQWN0aW9uQ2xpY2tlZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj57eyBwcm9wcy52YWx1ZSB9fTwvcS10ZD5cbiAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9ucz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLWJ0biByb3VuZCBmbGF0IGRlbnNlIGljb249XCJmYWwgZmEtZWxsaXBzaXMtaFwiIEBjbGljay5zdG9wPlxuICAgICAgICAgICAgICA8cS1tZW51IGRlbnNlPlxuICAgICAgICAgICAgICAgIDxxLWxpc3QgY2xhc3M9XCJxLXBhLXNtXCIgZGVuc2Ugc3R5bGU9XCJtaW4td2lkdGg6IDEwMHB4XCI+XG4gICAgICAgICAgICAgICAgICA8YmFzZS1pdGVtXG4gICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBhY3Rpb25JdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIHYtc2hvdz1cImhhc1Blcm1pc3Npb24oaXRlbSwgcHJvcHMpXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25BY3Rpb25DbGlja2VkKGl0ZW0sIHByb3BzKVwiXG4gICAgICAgICAgICAgICAgICAgIDppY29uPVwiaXRlbS5pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwiaXRlbS5sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICA8L3EtbWVudT5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6aXRlbT1cInByb3BzXCI+XG4gICAgICAgICAgPHNsb3RcbiAgICAgICAgICAgIG5hbWU9XCJpdGVtXCJcbiAgICAgICAgICAgIHYtYmluZDpwcm9wcz1cInByb3BzXCJcbiAgICAgICAgICAgIHYtYmluZDpwZXJtaXNzaW9ucz1cInBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgIHYtYmluZDphY3Rpb25zPVwiYWN0aW9uSXRlbXNcIlxuICAgICAgICAgICAgdi1iaW5kOm9uQWN0aW9uQ2xpY2tlZD1cIm9uQWN0aW9uQ2xpY2tlZFwiXG4gICAgICAgICAgICB2LWJpbmQ6aGFzUGVybWlzc2lvbj1cImhhc1Blcm1pc3Npb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgdi1iaW5kOmNsYXNzPVwiY2FyZENsYXNzXCIgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICB0YWc9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgOmNsYXNzPVwie1xuICAgICAgICAgICAgICAgICAgJ2JnLWdyZWVuLTInOiBwcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICdiZy13aGl0ZSc6ICFwcm9wcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiB2LWlmPVwiWydzaW5nbGUnLCAnbXVsdGlwbGUnXS5pbmNsdWRlcyhzZWxlY3Rpb24pXCIgYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgPHEtY2hlY2tib3ggZGVuc2Ugdi1tb2RlbD1cInByb3BzLnNlbGVjdGVkXCIgLz5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxzbG90XG4gICAgICAgICAgICAgICAgICBuYW1lPVwiaXRlbS1zZWxlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgdi1iaW5kOnByb3BzPVwicHJvcHNcIlxuICAgICAgICAgICAgICAgICAgdi1iaW5kOnBlcm1pc3Npb25zPVwicGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgdi1iaW5kOmFjdGlvbnM9XCJhY3Rpb25JdGVtc1wiXG4gICAgICAgICAgICAgICAgICB2LWJpbmQ6b25BY3Rpb25DbGlja2VkPVwib25BY3Rpb25DbGlja2VkXCJcbiAgICAgICAgICAgICAgICAgIHYtYmluZDpoYXNQZXJtaXNzaW9uPVwiaGFzUGVybWlzc2lvblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiaXRlbS1ib2R5XCIgdi1iaW5kPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInEtbWIteHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJjb2wgaW4gcHJvcHMuY29scy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtKSA9PiAhWydhY3Rpb25zJywgJ2lkJ10uaW5jbHVkZXMoaXRlbS5uYW1lKSAmJiBpdGVtLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICApXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJjb2wubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIWhpZGVJdGVtTGFiZWxcIiBjbGFzcz1cInEtdGFibGVfX2dyaWQtaXRlbS10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBjb2wubGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJgaXRlbS1ib2R5LSR7Y29sLm5hbWV9YFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZD1cInByb3BzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnZhbHVlPVwiY29sLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7IGNvbC52YWx1ZSB9fTwvc2xvdFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gdi1pZj1cIiFub0FjdGlvbnNcIiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGZsYXQgZGVuc2UgaWNvbj1cImZhbCBmYS1lbGxpcHNpcy1oXCIgQGNsaWNrLnN0b3A+XG4gICAgICAgICAgICAgICAgICAgIDxxLW1lbnUgZGVuc2U+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtbGlzdCBjbGFzcz1cInEtcGEtc21cIiBkZW5zZSBzdHlsZT1cIm1pbi13aWR0aDogMTAwcHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxiYXNlLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGFjdGlvbkl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1zaG93PVwiaGFzUGVybWlzc2lvbihpdGVtLCBwcm9wcylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvbkFjdGlvbkNsaWNrZWQoaXRlbSwgcHJvcHMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOmljb249XCJpdGVtLmljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJpdGVtLmxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1tZW51PlxuICAgICAgICAgICAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCIhISRzbG90cy5ib3R0b21cIiB2LXNsb3Q6Ym90dG9tPVwic2NvcGVcIj5cbiAgICAgICAgICA8c2xvdCBuYW1lPVwiYm90dG9tXCIgdi1iaW5kPVwic2NvcGVcIj48L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtdGFibGU+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgPHNsb3QgbmFtZT1cInByZS1sb2FkZXJcIj5cbiAgICAgICAgPHRhYmxlLXNrZWxldG9uIDpoaWRlLXRvcD1cImhpZGVUb3BcIiA6cm93LW51bW5lcnM9XCI4XCIgLz5cbiAgICAgIDwvc2xvdD5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFRhYmxlU2tlbGV0b24gZnJvbSAnLi4vc2tlbGV0b24vVGFibGVTa2VsZXRvbi52dWUnO1xuXG5jb25zdCBleGNlcHRTbG90cyA9IFtcbiAgJ2FkdmFuY2VkLWZpbHRlcicsXG4gICdwcmUtbG9hZGVyJyxcbiAgJ2hlYWRlci1zZWxlY3Rpb24nLFxuICAnYm9keS1zZWxlY3Rpb24nLFxuICAnYm9keS1jZWxsLWFjdGlvbnMnLFxuICAnYm90dG9tJyxcbiAgJ2l0ZW0nLFxuICAnaXRlbS1zZWxlY3Rpb24nLFxuICAndG9wJyxcbiAgJ3RvcC1sZWZ0JyxcbiAgJ3RvcC1yaWdodCcsXG4gICd0b3AtYm90dG9tJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czogeyBUYWJsZVNrZWxldG9uIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdGVkOiBbXSxcbiAgICB9O1xuICB9LFxuICBwcm9wczoge1xuICAgIHN0b3JlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgfSxcbiAgICBtb2R1bGU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtPYmplY3RdLFxuICAgIH0sXG4gICAgY29sdW1uczoge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0eXBlOiBbQXJyYXldLFxuICAgICAgZGVmYXVsdDogKCkgPT4gW10sXG4gICAgfSxcbiAgICByb3dzOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR5cGU6IFtBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXSxcbiAgICB9LFxuICAgIHRvb2xiYXI6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXSxcbiAgICB9LFxuICAgIGFjdGlvbnM6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXSxcbiAgICB9LFxuICAgIGZpbHRlcnM6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtBcnJheV0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXSxcbiAgICB9LFxuICAgIHBhZ2luYXRpb246IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHlwZTogW09iamVjdF0sXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIGhpZGVQYWdpbmF0aW9uOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIGhpZGVJdGVtTGFiZWw6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgbm9BY3Rpb25zOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIG5vVHJhc2g6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgcm93c1BlclBhZ2VPcHRpb25zOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQXJyYXldLFxuICAgICAgZGVmYXVsdDogKCkgPT4gWzE1LCAzMCwgNTBdLFxuICAgIH0sXG4gICAgZmlsdGVyOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAgYm9yZGVyZWQ6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgZmxhdDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW0Jvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIGhpZGVIZWFkZXI6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgaGlkZVRvcDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW0Jvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICBub1Blcm1pc3Npb25zOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIGxvYWRpbmc6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgbG9hZGVkOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIHByZXZlbnREZWZhdWx0OiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIHNlbGVjdGlvbjoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdBdmFpbGFibGUgb3B0aW9uczogc2luZ2xlLCBtdWx0aXBsZSBhbmQgbm9uZScsXG4gICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICdub25lJyxcbiAgICB9LFxuICAgIGZpbHRlclRpdGxlOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICdGaWx0ZXJzJyxcbiAgICB9LFxuICAgIGZpbHRlckljb246IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJ2ZhbCBmYS1maWx0ZXInLFxuICAgIH0sXG4gICAgcmVsYXRlZERlbGV0ZU1lc3NhZ2U6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEJvb2xlYW5dLFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgJ1BsZWFzZSBub3RlIHRoYXQgb25jZSB5b3UgcGVybWFuZW50bHkgZGVsZXRlIHR5cGUgbW9kdWxlLCBhbnkgcmVsYXRlZChzKSB3aGVyZSB0aGV5IGhhdmUgYWRkZWQgdG8gd2lsbCBsb3NlIHRoZW0gdG9vLicsXG4gICAgfSxcbiAgICBub0RhdGFMYWJlbDoge1xuICAgICAgdHlwZTogW1N0cmluZ10sXG4gICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgfSxcbiAgICBjYXJkQ2xhc3M6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmddLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgIH0sXG4gICAgdG9wUmlnaHRXaWR0aDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogW051bWJlcl0sXG4gICAgICBkZWZhdWx0OiA5LFxuICAgICAgZGVzY3JpcHRpb246ICdtYXggdmFsdWUgMTIgYW5kIG1pbiB2YWx1ZSAxJyxcbiAgICAgIHZhbGlkYXRvcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPD0gMTIgfHwgdmFsdWUgPj0gMTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICAnc3luY1BhZ2luYXRpb24ucm93c1BlclBhZ2UnKCkge1xuICAgICAgdGhpcy5zZW5kU2VydmVyUmVxdWVzdCgpO1xuICAgIH0sXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvblJlcXVlc3QocHJvcHMpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL2Jhc2UtdGFibGU6bWV0aG9kcy5vblJlcXVlc3QoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KCdyZXF1ZXN0JywgcHJvcHMpO1xuICAgIH0sXG4gICAgb25Sb3dDbGlja2VkKGV2dCwgcm93KSB7XG4gICAgICBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9iYXNlLXRhYmxlOm1ldGhvZHMub25Sb3dDbGlja2VkKCknLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kZW1pdCgncm93LWNsaWNrZWQnLCBldnQsIHJvdyk7XG4gICAgfSxcbiAgICBvbkFjdGlvbkNsaWNrZWQoaXRlbSwgcHJvcHMpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL2Jhc2UtdGFibGU6bWV0aG9kcy5vbkFjdGlvbkNsaWNrZWQoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KCdhY3Rpb24tY2xpY2tlZCcsIGl0ZW0uYWN0aW9uLCBwcm9wcy5yb3cpO1xuXG4gICAgICAvLyBjaGVja2VkIGRlZmF1bHQgYWN0aW9ucyBzdGF0dXNcbiAgICAgIGlmICh0aGlzLnByZXZlbnREZWZhdWx0KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHN3aXRjaCAoaXRlbS5hY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICB0aGlzLmhhc1N0b3JlKCk7XG4gICAgICAgICAgdGhpcy4kY29yZVxuICAgICAgICAgICAgLmNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyAke3RoaXMubW9kdWxlLnNpbmd1bGFyfT9gKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlXG4gICAgICAgICAgICAgICAgLmRlbGV0ZShwcm9wcy5yb3cuaWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kU2VydmVyUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kY29yZS5lcnJvcihlcnJvciwgeyB0aXRsZTogJ0Vycm9yJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXN0b3JlJzpcbiAgICAgICAgICB0aGlzLmhhc1N0b3JlKCk7XG4gICAgICAgICAgdGhpcy4kY29yZVxuICAgICAgICAgICAgLmNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXN0b3JlIHRoaXMgJHt0aGlzLm1vZHVsZS5zaW5ndWxhcn0/YClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZVxuICAgICAgICAgICAgICAgIC5yZXN0b3JlKHByb3BzLnJvdy5pZClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKGVycm9yLCB7IHRpdGxlOiAnRXJyb3InIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZvcmNlLWRlbGV0ZSc6XG4gICAgICAgICAgdGhpcy5oYXNTdG9yZSgpO1xuICAgICAgICAgIHRoaXMuJGNvcmVcbiAgICAgICAgICAgIC5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcGVybWFuZW50bHkgZGVsZXRlIHRoaXMgJHt0aGlzLm1vZHVsZS5zaW5ndWxhcn0/YCwge1xuICAgICAgICAgICAgICBzdWJUaXRsZTogdGhpcy5yZWxhdGVkRGVsZXRlTWVzc2FnZVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90eXBlL2csICd0aGlzJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvbW9kdWxlL2csIHRoaXMubW9kdWxlLnNpbmd1bGFyKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmVcbiAgICAgICAgICAgICAgICAuZm9yY2VEZWxldGUocHJvcHMucm93LmlkKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFNlcnZlclJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGNvcmUuZXJyb3IoZXJyb3IsIHsgdGl0bGU6ICdFcnJvcicgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncm91dGUnOlxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0ucm91dGUsXG4gICAgICAgICAgICBwYXJhbXM6IGl0ZW0ucGFyYW1zID8gaXRlbS5wYXJhbXMocHJvcHMucm93KSA6IHt9LFxuICAgICAgICAgICAgcXVlcnk6IGl0ZW0ucXVlcnkgPyBpdGVtLnF1ZXJ5KHByb3BzLnJvdykgOiB7fSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpdGVtLmFjdGlvbihwcm9wcy5yb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uVG9vbGJhckNsaWNrZWQoaXRlbSkge1xuICAgICAgY29uc29sZS5mdW5jKCdjb21wb25lbnRzL2Jhc2UvYmFzZS10YWJsZTptZXRob2RzLm9uVG9vbGJhckNsaWNrZWQoKScsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLiRlbWl0KCd0b29sYmFyLWNsaWNrZWQnLCBpdGVtKTtcblxuICAgICAgLy8gY2hlY2tlZCBkZWZhdWx0IGFjdGlvbnMgc3RhdHVzXG4gICAgICBpZiAodGhpcy5wcmV2ZW50RGVmYXVsdCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBzd2l0Y2ggKGl0ZW0uYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgdGhpcy5oYXNTdG9yZSgpO1xuICAgICAgICAgIHRoaXMuJGNvcmVcbiAgICAgICAgICAgIC5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHNlbGVjdGVkICR7dGhpcy5tb2R1bGUucGx1cmFsfT9gKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnN0b3JlXG4gICAgICAgICAgICAgICAgLmRlbGV0ZVNlbGVjdGVkKG1hcCh0aGlzLnNlbGVjdGVkLCAnaWQnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKGVycm9yLCB7IHRpdGxlOiAnRXJyb3InIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Jlc3RvcmUnOlxuICAgICAgICAgIHRoaXMuaGFzU3RvcmUoKTtcbiAgICAgICAgICB0aGlzLiRjb3JlXG4gICAgICAgICAgICAuY29uZmlybShgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc3RvcmUgc2VsZWN0ZWQgJHt0aGlzLm1vZHVsZS5wbHVyYWx9P2ApXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmVcbiAgICAgICAgICAgICAgICAucmVzdG9yZVNlbGVjdGVkKG1hcCh0aGlzLnNlbGVjdGVkLCAnaWQnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRjb3JlLmVycm9yKGVycm9yLCB7IHRpdGxlOiAnRXJyb3InIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZvcmNlLWRlbGV0ZSc6XG4gICAgICAgICAgdGhpcy5oYXNTdG9yZSgpO1xuICAgICAgICAgIHRoaXMuJGNvcmVcbiAgICAgICAgICAgIC5jb25maXJtKFxuICAgICAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHBlcm1hbmVudGx5IGRlbGV0ZSBzZWxlY3RlZCAke3RoaXMubW9kdWxlLnBsdXJhbH0/YCxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN1YlRpdGxlOiB0aGlzLnJlbGF0ZWREZWxldGVNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdHlwZS9nLCAnc2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL21vZHVsZS9nLCB0aGlzLm1vZHVsZS5wbHVyYWwpLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmVcbiAgICAgICAgICAgICAgICAuZm9yY2VEZWxldGVTZWxlY3RlZChtYXAodGhpcy5zZWxlY3RlZCwgJ2lkJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kU2VydmVyUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kY29yZS5lcnJvcihlcnJvciwgeyB0aXRsZTogJ0Vycm9yJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyb3V0ZSc6XG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogaXRlbS5yb3V0ZSxcbiAgICAgICAgICAgIHBhcmFtczogaXRlbS5wYXJhbXMsXG4gICAgICAgICAgICBxdWVyeTogaXRlbS5xdWVyeSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmlsdGVyJzpcbiAgICAgICAgICB0aGlzLiRyZWZzLmZpbHRlci5zaG93KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JlcXVlc3QnOlxuICAgICAgICAgIHRoaXMuc2VuZFNlcnZlclJlcXVlc3QoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpdGVtLmFjdGlvbihpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZW5kU2VydmVyUmVxdWVzdCgpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgIHRoaXMub25SZXF1ZXN0KHtcbiAgICAgICAgcGFnaW5hdGlvbjogdGhpcy5zeW5jUGFnaW5hdGlvbixcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2hvd0ZpbHRlcigpIHtcbiAgICAgIGNvbnNvbGUuZnVuYygnY29tcG9uZW50cy9iYXNlL2Jhc2UtdGFibGU6bWV0aG9kcy5zaG93RmlsdGVyKCknLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy4kcmVmcy5maWx0ZXIuc2hvdygpO1xuICAgIH0sXG4gICAgaGFzUGVybWlzc2lvbihpdGVtLCBwcm9wcyA9IGZhbHNlKSB7XG4gICAgICAvLyBjb25zb2xlLmZ1bmMoJ2NvbXBvbmVudHMvYmFzZS9iYXNlLXRhYmxlOm1ldGhvZHMuaGFzUGVybWlzc2lvbigpJywgYXJndW1lbnRzKVxuXG4gICAgICAvLyBwZXJtaXNzaW9uIGRvZXNuJ3QgZXhpc3RcbiAgICAgIGlmICh0aGlzLm5vUGVybWlzc2lvbnMpIHJldHVybiB0cnVlO1xuXG4gICAgICBpZiAoaXRlbS5tb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vIHJldHVybiAoXG4gICAgICAgIC8vICAgdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXBwL2hhc1Blcm1pc3Npb24nXShpdGVtLm1vZHVsZSkgJiZcbiAgICAgICAgLy8gICB0aGlzLiRzdG9yZS5nZXR0ZXJzWydhcHAvaGFzTW9kdWxlUGVybWlzc2lvbiddKGl0ZW0ubW9kdWxlLCBpdGVtLnBlcm1pc3Npb24pXG4gICAgICAgIC8vICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtLmNvbmRpdGlvbiAmJiBpdGVtLnBlcm1pc3Npb24gJiYgcHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zLmluY2x1ZGVzKGl0ZW0ucGVybWlzc2lvbikgJiYgaXRlbS5jb25kaXRpb24ocHJvcHMucm93LCB0aGlzLnBlcm1pc3Npb25zKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmNvbmRpdGlvbiAmJiAhaXRlbS5wZXJtaXNzaW9uICYmIHByb3BzKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmNvbmRpdGlvbihwcm9wcy5yb3csIHRoaXMucGVybWlzc2lvbnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wZXJtaXNzaW9ucy5pbmNsdWRlcyhpdGVtLnBlcm1pc3Npb24pIHx8ICFpdGVtLnBlcm1pc3Npb247XG4gICAgfSxcbiAgICBoYXNTdG9yZSgpIHtcbiAgICAgIGlmICghdGhpcy5zdG9yZSkgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc3luY1BhZ2luYXRpb246IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnaW5hdGlvbjtcbiAgICAgIH0sXG4gICAgICBzZXQodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9LFxuICAgIH0sXG4gICAgYWN0aW9uSXRlbXMoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuYWN0aW9ucyB8fCBbXSkuZmlsdGVyKFxuICAgICAgICAoaXRlbSkgPT4gaXRlbS5kZWxldGVkID09PSB0aGlzLnN5bmNQYWdpbmF0aW9uLmRlbGV0ZWQgfHwgaXRlbS5kZWxldGVkID09PSAnYWxsJ1xuICAgICAgKTtcbiAgICB9LFxuICAgIHRvb2xiYXJJdGVtcygpIHtcbiAgICAgIHJldHVybiAodGhpcy50b29sYmFyIHx8IFtdKS5maWx0ZXIoXG4gICAgICAgIChpdGVtKSA9PiBpdGVtLmRlbGV0ZWQgPT09IHRoaXMuc3luY1BhZ2luYXRpb24uZGVsZXRlZCB8fCBpdGVtLmRlbGV0ZWQgPT09ICdhbGwnXG4gICAgICApO1xuICAgIH0sXG4gICAgcGVybWlzc2lvbnMoKSB7XG4gICAgICAvLyByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXBwL2dldFBlcm1pc3Npb25zJ10odGhpcy5tb2R1bGUubmFtZSk7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICB0YWJsZVNsb3RzKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuJHNsb3RzKS5maWx0ZXIoKGl0ZW0pID0+ICFleGNlcHRTbG90cy5pbmNsdWRlcyhpdGVtKSk7XG4gICAgfSxcbiAgICB0b3BMZWZ0V2lkdGgoKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IDEyIC0gdGhpcy50b3BSaWdodFdpZHRoO1xuICAgICAgcmV0dXJuIHdpZHRoIHx8IDEyO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVJhdGlvUHJvcHMgPSB7XG4gIHJhdGlvOiBbIFN0cmluZywgTnVtYmVyIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBuYXR1cmFsUmF0aW8pIHtcbiAgLy8gcmV0dXJuIHJhdGlvU3R5bGVcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCByYXRpbyA9IE51bWJlcihcbiAgICAgIHByb3BzLnJhdGlvIHx8IChuYXR1cmFsUmF0aW8gIT09IHZvaWQgMCA/IG5hdHVyYWxSYXRpby52YWx1ZSA6IHZvaWQgMClcbiAgICApXG5cbiAgICByZXR1cm4gaXNOYU4ocmF0aW8pICE9PSB0cnVlICYmIHJhdGlvID4gMFxuICAgICAgPyB7IHBhZGRpbmdCb3R0b206IGAkeyAxMDAgLyByYXRpbyB9JWAgfVxuICAgICAgOiBudWxsXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyL1FTcGlubmVyLmpzJ1xuXG5pbXBvcnQgdXNlUmF0aW8sIHsgdXNlUmF0aW9Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJhdGlvLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5jb25zdCBkZWZhdWx0UmF0aW8gPSAxNiAvIDlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbWcnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUmF0aW9Qcm9wcyxcblxuICAgIHNyYzogU3RyaW5nLFxuICAgIHNyY3NldDogU3RyaW5nLFxuICAgIHNpemVzOiBTdHJpbmcsXG5cbiAgICBhbHQ6IFN0cmluZyxcbiAgICBjcm9zc29yaWdpbjogU3RyaW5nLFxuICAgIGRlY29kaW5nOiBTdHJpbmcsXG4gICAgcmVmZXJyZXJwb2xpY3k6IFN0cmluZyxcblxuICAgIGRyYWdnYWJsZTogQm9vbGVhbixcblxuICAgIGxvYWRpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsYXp5J1xuICAgIH0sXG4gICAgZmV0Y2hwcmlvcml0eToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2F1dG8nXG4gICAgfSxcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIGluaXRpYWxSYXRpbzoge1xuICAgICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgICAgZGVmYXVsdDogZGVmYXVsdFJhdGlvXG4gICAgfSxcblxuICAgIHBsYWNlaG9sZGVyU3JjOiBTdHJpbmcsXG5cbiAgICBmaXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjb3ZlcidcbiAgICB9LFxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnNTAlIDUwJSdcbiAgICB9LFxuXG4gICAgaW1nQ2xhc3M6IFN0cmluZyxcbiAgICBpbWdTdHlsZTogT2JqZWN0LFxuXG4gICAgbm9TcGlubmVyOiBCb29sZWFuLFxuICAgIG5vTmF0aXZlTWVudTogQm9vbGVhbixcbiAgICBub1RyYW5zaXRpb246IEJvb2xlYW4sXG5cbiAgICBzcGlubmVyQ29sb3I6IFN0cmluZyxcbiAgICBzcGlubmVyU2l6ZTogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2xvYWQnLCAnZXJyb3InIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCBuYXR1cmFsUmF0aW8gPSByZWYocHJvcHMuaW5pdGlhbFJhdGlvKVxuICAgIGNvbnN0IHJhdGlvU3R5bGUgPSB1c2VSYXRpbyhwcm9wcywgbmF0dXJhbFJhdGlvKVxuXG4gICAgbGV0IGxvYWRUaW1lclxuXG4gICAgY29uc3QgaW1hZ2VzID0gW1xuICAgICAgcmVmKG51bGwpLFxuICAgICAgcmVmKHByb3BzLnBsYWNlaG9sZGVyU3JjICE9PSB2b2lkIDAgPyB7IHNyYzogcHJvcHMucGxhY2Vob2xkZXJTcmMgfSA6IG51bGwpXG4gICAgXVxuXG4gICAgY29uc3QgcG9zaXRpb24gPSByZWYoMClcblxuICAgIGNvbnN0IGlzTG9hZGluZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBoYXNFcnJvciA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtaW1nIHEtaW1nLS0keyBwcm9wcy5ub05hdGl2ZU1lbnUgPT09IHRydWUgPyAnbm8tJyA6ICcnIH1tZW51YFxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcbiAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0XG4gICAgfSkpXG5cbiAgICBjb25zdCBpbWdDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1pbWdfX2ltYWdlICR7IHByb3BzLmltZ0NsYXNzICE9PSB2b2lkIDAgPyBwcm9wcy5pbWdDbGFzcyArICcgJyA6ICcnIH1gXG4gICAgICArIGBxLWltZ19faW1hZ2UtLXdpdGgkeyBwcm9wcy5ub1RyYW5zaXRpb24gPT09IHRydWUgPyAnb3V0JyA6ICcnIH0tdHJhbnNpdGlvbmBcbiAgICApXG5cbiAgICBjb25zdCBpbWdTdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICAuLi5wcm9wcy5pbWdTdHlsZSxcbiAgICAgIG9iamVjdEZpdDogcHJvcHMuZml0LFxuICAgICAgb2JqZWN0UG9zaXRpb246IHByb3BzLnBvc2l0aW9uXG4gICAgfSkpXG5cbiAgICB3YXRjaCgoKSA9PiBnZXRDdXJyZW50U3JjKCksIGFkZEltYWdlKVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudFNyYyAoKSB7XG4gICAgICByZXR1cm4gcHJvcHMuc3JjIHx8IHByb3BzLnNyY3NldCB8fCBwcm9wcy5zaXplc1xuICAgICAgICA/IHtcbiAgICAgICAgICAgIHNyYzogcHJvcHMuc3JjLFxuICAgICAgICAgICAgc3Jjc2V0OiBwcm9wcy5zcmNzZXQsXG4gICAgICAgICAgICBzaXplczogcHJvcHMuc2l6ZXNcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEltYWdlIChpbWdQcm9wcykge1xuICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcblxuICAgICAgaWYgKGltZ1Byb3BzID09PSBudWxsKSB7XG4gICAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGltYWdlc1sgMCBdLnZhbHVlID0gbnVsbFxuICAgICAgICBpbWFnZXNbIDEgXS52YWx1ZSA9IG51bGxcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlzTG9hZGluZy52YWx1ZSA9IHRydWVcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXS52YWx1ZSA9IGltZ1Byb3BzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Mb2FkICh7IHRhcmdldCB9KSB7XG4gICAgICAvLyBpZiBjb21wb25lbnQgaGFzIGJlZW4gYWxyZWFkeSBkZXN0cm95ZWRcbiAgICAgIGlmIChsb2FkVGltZXIgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcblxuICAgICAgbmF0dXJhbFJhdGlvLnZhbHVlID0gdGFyZ2V0Lm5hdHVyYWxIZWlnaHQgPT09IDBcbiAgICAgICAgPyAwLjVcbiAgICAgICAgOiB0YXJnZXQubmF0dXJhbFdpZHRoIC8gdGFyZ2V0Lm5hdHVyYWxIZWlnaHRcblxuICAgICAgd2FpdEZvckNvbXBsZXRlbmVzcyh0YXJnZXQsIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2FpdEZvckNvbXBsZXRlbmVzcyAodGFyZ2V0LCBjb3VudCkge1xuICAgICAgLy8gcHJvdGVjdCBhZ2FpbnN0IHJ1bm5pbmcgZm9yZXZlclxuICAgICAgaWYgKGxvYWRUaW1lciA9PT0gbnVsbCB8fCBjb3VudCA9PT0gMTAwMCkgeyByZXR1cm4gfVxuXG4gICAgICBpZiAodGFyZ2V0LmNvbXBsZXRlID09PSB0cnVlKSB7XG4gICAgICAgIG9uUmVhZHkodGFyZ2V0KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxvYWRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdhaXRGb3JDb21wbGV0ZW5lc3ModGFyZ2V0LCBjb3VudCArIDEpXG4gICAgICAgIH0sIDUwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkgKGltZykge1xuICAgICAgLy8gaWYgY29tcG9uZW50IGhhcyBiZWVuIGFscmVhZHkgZGVzdHJveWVkXG4gICAgICBpZiAobG9hZFRpbWVyID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIHBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24udmFsdWUgPT09IDEgPyAwIDogMVxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gbnVsbFxuICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcbiAgICAgIGVtaXQoJ2xvYWQnLCBpbWcuY3VycmVudFNyYyB8fCBpbWcuc3JjKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycikge1xuICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICBoYXNFcnJvci52YWx1ZSA9IHRydWVcbiAgICAgIGltYWdlc1sgMCBdLnZhbHVlID0gbnVsbFxuICAgICAgaW1hZ2VzWyAxIF0udmFsdWUgPSBudWxsXG4gICAgICBlbWl0KCdlcnJvcicsIGVycilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250YWluZXIgKGtleSwgY2hpbGQpIHtcbiAgICAgIHJldHVybiBoKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBjbGFzczogJ3EtaW1nX19jb250YWluZXIgYWJzb2x1dGUtZnVsbCcsIGtleSB9LFxuICAgICAgICBjaGlsZFxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEltYWdlIChpbmRleCkge1xuICAgICAgY29uc3QgaW1nID0gaW1hZ2VzWyBpbmRleCBdLnZhbHVlXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGtleTogJ2ltZ18nICsgaW5kZXgsXG4gICAgICAgIGNsYXNzOiBpbWdDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IGltZ1N0eWxlLnZhbHVlLFxuICAgICAgICBjcm9zc29yaWdpbjogcHJvcHMuY3Jvc3NvcmlnaW4sXG4gICAgICAgIGRlY29kaW5nOiBwcm9wcy5kZWNvZGluZyxcbiAgICAgICAgcmVmZXJyZXJwb2xpY3k6IHByb3BzLnJlZmVycmVycG9saWN5LFxuICAgICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodCxcbiAgICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgICBsb2FkaW5nOiBwcm9wcy5sb2FkaW5nLFxuICAgICAgICBmZXRjaHByaW9yaXR5OiBwcm9wcy5mZXRjaHByaW9yaXR5LFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgIGRyYWdnYWJsZTogcHJvcHMuZHJhZ2dhYmxlLFxuICAgICAgICAuLi5pbWdcbiAgICAgIH1cblxuICAgICAgaWYgKHBvc2l0aW9uLnZhbHVlID09PSBpbmRleCkge1xuICAgICAgICBkYXRhLmNsYXNzICs9ICcgcS1pbWdfX2ltYWdlLS13YWl0aW5nJ1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHsgb25Mb2FkLCBvbkVycm9yIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGF0YS5jbGFzcyArPSAnIHEtaW1nX19pbWFnZS0tbG9hZGVkJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0Q29udGFpbmVyKCdpbWcnICsgaW5kZXgsIGgoJ2ltZycsIGRhdGEpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgaWYgKGlzTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGtleTogJ2NvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1pbWdfX2NvbnRlbnQgYWJzb2x1dGUtZnVsbCBxLWFuY2hvci0tc2tpcCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHNbIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJ2Vycm9yJyA6ICdkZWZhdWx0JyBdKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAga2V5OiAnbG9hZGluZycsXG4gICAgICAgIGNsYXNzOiAncS1pbWdfX2xvYWRpbmcgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyJ1xuICAgICAgfSwgKFxuICAgICAgICBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzLmxvYWRpbmcoKVxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBwcm9wcy5ub1NwaW5uZXIgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHZvaWQgMFxuICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICBoKFFTcGlubmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHByb3BzLnNwaW5uZXJDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICBzaXplOiBwcm9wcy5zcGlubmVyU2l6ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKVxuICAgICAgKSlcbiAgICB9XG5cbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBpZiAoX19RVUFTQVJfU1NSX0NMSUVOVF9fICYmIGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgICAgIGFkZEltYWdlKGdldEN1cnJlbnRTcmMoKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhZGRJbWFnZShnZXRDdXJyZW50U3JjKCkpXG4gICAgICB9XG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dChsb2FkVGltZXIpXG4gICAgICAgIGxvYWRUaW1lciA9IG51bGxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXVxuXG4gICAgICBpZiAocmF0aW9TdHlsZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb250ZW50LnB1c2goXG4gICAgICAgICAgaCgnZGl2JywgeyBrZXk6ICdmaWxsZXInLCBzdHlsZTogcmF0aW9TdHlsZS52YWx1ZSB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNFcnJvci52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAoaW1hZ2VzWyAwIF0udmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb250ZW50LnB1c2goZ2V0SW1hZ2UoMCkpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1hZ2VzWyAxIF0udmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb250ZW50LnB1c2goZ2V0SW1hZ2UoMSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICBoKFRyYW5zaXRpb24sIHsgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZScgfSwgZ2V0Q29udGVudClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcm9sZTogJ2ltZycsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMuYWx0XG4gICAgICB9LCBjb250ZW50KVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtaW1nIDpyYXRpbz1cInJhdGlvXCIgY2xhc3M9XCJ0aHVtYm5haWxcIiA6c3JjPVwic3JjXCIgLz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgbWVkaWE6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICB9LFxuICAgIHJhdGlvOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAoKSA9PiAxNiAvIDksXG4gICAgfSxcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzcmMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tZWRpYSA/IHRoaXMubWVkaWEudXJsIDogJy9pbWcvcGxhY2Vob2xkZXIucG5nJztcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9zZmNfbWFpbiIsIl9jcmVhdGVCbG9jayIsIl9ub3JtYWxpemVDbGFzcyIsIl9yZW5kZXJTbG90IiwiaCIsIndpZHRoIiwiX2hvaXN0ZWRfMSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfaG9pc3RlZF8yIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9vcGVuQmxvY2siLCJfaG9pc3RlZF8zIiwiX3RvRGlzcGxheVN0cmluZyIsImRlZmF1bHRTaXplcyIsImVsIiwidmFsaWRhdGVOZXdWYWx1ZU1vZGUiLCJvcHRpb25JbmRleCIsImF0dHJzIiwiZGVmIiwibGFzdFBhZ2UiLCJjbGVhclNlbGVjdGlvbiIsInByb3BzIiwiX2hvaXN0ZWRfNSIsIl9ob2lzdGVkXzYiLCJfaG9pc3RlZF83IiwiX2hvaXN0ZWRfNCIsIl9yZW5kZXJMaXN0IiwibWFwIiwiX3Jlc29sdmVEeW5hbWljQ29tcG9uZW50IiwiX21lcmdlUHJvcHMiLCJfd2l0aEN0eCIsIl9ub3JtYWxpemVQcm9wcyIsIl9ndWFyZFJlYWN0aXZlUHJvcHMiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3ZTaG93IiwicG9zaXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFzQkEsTUFBS0EsY0FBVTtBQUFBLEVBQ2IsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLE1BQ0osTUFBTSxDQUFDLE9BQU87QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxNQUFNO0FBQUEsSUFDTixnQkFBZ0I7QUFBQSxFQUNqQjtBQUNIOztzQkEvQkVDLFlBaUJRLE1BQUE7QUFBQSxJQWhCTixPQUFNO0FBQUEsSUFDTixXQUFBO0FBQUEsSUFDQyxTQUFTLE9BQUk7QUFBQSxJQUNiLE9BQUtDLGVBQUE7QUFBQSxxQ0FBeUMsT0FBSTtBQUFBLGtCQUFvQixPQUFJO0FBQUEsa0JBQW9CLE9BQUk7QUFBQTsrQkFBeUQsT0FBYztBQUFBO0lBT3pLLE1BQU0sT0FBSTtBQUFBLElBQ1YsT0FBTyxPQUFJO0FBQUEsSUFDWCxNQUFNLE9BQUk7QUFBQSxJQUNYLE1BQUs7QUFBQTtxQkFFTCxNQUFhO0FBQUEsTUFBYkMsV0FBYSxLQUFBLFFBQUEsU0FBQTtBQUFBOzs7Ozs7Ozs7QUNaakIsSUFBQSxZQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxJQUNULE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxF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
