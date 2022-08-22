import { v as createComponent, r as ref, bk as provide, aW as onDeactivated, aX as onActivated, o as onMounted, h, I as hSlot, g as getCurrentInstance, Q as stopAndPrevent, ac as nextTick, ay as addFocusFn, bl as formKey } from "./index.8d5ea4b7.js";
var QForm = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validation-success", "validation-error"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const promises = [];
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      const index = ++validateIndex;
      const emitEvent = (res, ref2) => {
        emit("validation-" + (res === true ? "success" : "error"), ref2);
      };
      for (let i = 0; i < registeredComponents.length; i++) {
        const comp = registeredComponents[i];
        const valid = comp.validate();
        if (typeof valid.then === "function") {
          promises.push(
            valid.then(
              (valid2) => ({ valid: valid2, comp }),
              (err) => ({ valid: false, comp, err })
            )
          );
        } else if (valid !== true) {
          if (props.greedy === false) {
            emitEvent(false, comp);
            if (focus2 === true && typeof comp.focus === "function") {
              comp.focus();
            }
            return Promise.resolve(false);
          }
          promises.push({ valid: false, comp });
        }
      }
      if (promises.length === 0) {
        emitEvent(true);
        return Promise.resolve(true);
      }
      return Promise.all(promises).then((res) => {
        const errors = res.filter((r) => r.valid !== true);
        if (errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true;
        }
        const { valid, comp, err } = errors[0];
        if (index === validateIndex) {
          err !== void 0 && console.error(err);
          emitEvent(false, comp);
          if (focus2 === true && valid !== true && typeof comp.focus === "function") {
            comp.focus();
          }
        }
        return false;
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      const index = validateIndex + 1;
      validate().then((val) => {
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null) {
          return;
        }
        const target = rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex > -1);
        target !== null && target !== void 0 && target.focus({ preventScroll: true });
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index > -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });
    let shouldActivate = false;
    onDeactivated(() => {
      shouldActivate = true;
    });
    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });
    onMounted(() => {
      props.autofocus === true && focus();
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
export { QForm as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUZvcm0uZjAyMGJhZTguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZm9ybS9RRm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCByZWYsIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgbmV4dFRpY2ssIHByb3ZpZGUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZm9ybUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FGb3JtJyxcblxuICBwcm9wczoge1xuICAgIGF1dG9mb2N1czogQm9vbGVhbixcbiAgICBub0Vycm9yRm9jdXM6IEJvb2xlYW4sXG4gICAgbm9SZXNldEZvY3VzOiBCb29sZWFuLFxuICAgIGdyZWVkeTogQm9vbGVhbixcblxuICAgIG9uU3VibWl0OiBGdW5jdGlvblxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXNldCcsICd2YWxpZGF0aW9uLXN1Y2Nlc3MnLCAndmFsaWRhdGlvbi1lcnJvcicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG5cbiAgICBsZXQgdmFsaWRhdGVJbmRleCA9IDBcbiAgICBjb25zdCByZWdpc3RlcmVkQ29tcG9uZW50cyA9IFtdXG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSAoc2hvdWxkRm9jdXMpIHtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gW11cbiAgICAgIGNvbnN0IGZvY3VzID0gdHlwZW9mIHNob3VsZEZvY3VzID09PSAnYm9vbGVhbidcbiAgICAgICAgPyBzaG91bGRGb2N1c1xuICAgICAgICA6IHByb3BzLm5vRXJyb3JGb2N1cyAhPT0gdHJ1ZVxuXG4gICAgICBjb25zdCBpbmRleCA9ICsrdmFsaWRhdGVJbmRleFxuXG4gICAgICBjb25zdCBlbWl0RXZlbnQgPSAocmVzLCByZWYpID0+IHtcbiAgICAgICAgZW1pdCgndmFsaWRhdGlvbi0nICsgKHJlcyA9PT0gdHJ1ZSA/ICdzdWNjZXNzJyA6ICdlcnJvcicpLCByZWYpXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVnaXN0ZXJlZENvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY29tcCA9IHJlZ2lzdGVyZWRDb21wb25lbnRzWyBpIF1cbiAgICAgICAgY29uc3QgdmFsaWQgPSBjb21wLnZhbGlkYXRlKClcblxuICAgICAgICBpZiAodHlwZW9mIHZhbGlkLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKFxuICAgICAgICAgICAgdmFsaWQudGhlbihcbiAgICAgICAgICAgICAgdmFsaWQgPT4gKHsgdmFsaWQsIGNvbXAgfSksXG4gICAgICAgICAgICAgIGVyciA9PiAoeyB2YWxpZDogZmFsc2UsIGNvbXAsIGVyciB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWxpZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChwcm9wcy5ncmVlZHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBlbWl0RXZlbnQoZmFsc2UsIGNvbXApXG5cbiAgICAgICAgICAgIGlmIChmb2N1cyA9PT0gdHJ1ZSAmJiB0eXBlb2YgY29tcC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBjb21wLmZvY3VzKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHsgdmFsaWQ6IGZhbHNlLCBjb21wIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHByb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBlbWl0RXZlbnQodHJ1ZSlcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzLmZpbHRlcihyID0+IHIudmFsaWQgIT09IHRydWUpXG5cbiAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiBlbWl0RXZlbnQodHJ1ZSlcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyB2YWxpZCwgY29tcCwgZXJyIH0gPSBlcnJvcnNbIDAgXVxuXG4gICAgICAgIC8vIGlmIG5vdCBvdXRkYXRlZCBhbHJlYWR5XG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCkge1xuICAgICAgICAgIGVyciAhPT0gdm9pZCAwICYmIGNvbnNvbGUuZXJyb3IoZXJyKVxuXG4gICAgICAgICAgZW1pdEV2ZW50KGZhbHNlLCBjb21wKVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZm9jdXMgPT09IHRydWVcbiAgICAgICAgICAgICYmIHZhbGlkICE9PSB0cnVlXG4gICAgICAgICAgICAmJiB0eXBlb2YgY29tcC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29tcC5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbiAoKSB7XG4gICAgICB2YWxpZGF0ZUluZGV4KytcblxuICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgICAgdHlwZW9mIGNvbXAucmVzZXRWYWxpZGF0aW9uID09PSAnZnVuY3Rpb24nICYmIGNvbXAucmVzZXRWYWxpZGF0aW9uKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VibWl0IChldnQpIHtcbiAgICAgIGV2dCAhPT0gdm9pZCAwICYmIHN0b3BBbmRQcmV2ZW50KGV2dClcblxuICAgICAgY29uc3QgaW5kZXggPSB2YWxpZGF0ZUluZGV4ICsgMVxuXG4gICAgICB2YWxpZGF0ZSgpLnRoZW4odmFsID0+IHtcbiAgICAgICAgLy8gaWYgbm90IG91dGRhdGVkICYmIHZhbGlkYXRpb24gc3VjY2VlZGVkXG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAocHJvcHMub25TdWJtaXQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZW1pdCgnc3VibWl0JywgZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChldnQgIT09IHZvaWQgMCAmJiBldnQudGFyZ2V0ICE9PSB2b2lkIDAgJiYgdHlwZW9mIGV2dC50YXJnZXQuc3VibWl0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldnQudGFyZ2V0LnN1Ym1pdCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0IChldnQpIHtcbiAgICAgIGV2dCAhPT0gdm9pZCAwICYmIHN0b3BBbmRQcmV2ZW50KGV2dClcblxuICAgICAgZW1pdCgncmVzZXQnKVxuXG4gICAgICBuZXh0VGljaygoKSA9PiB7IC8vIGFsbG93IHVzZXJsYW5kIHRvIHJlc2V0IHZhbHVlcyBiZWZvcmVcbiAgICAgICAgcmVzZXRWYWxpZGF0aW9uKClcbiAgICAgICAgaWYgKHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm9wcy5ub1Jlc2V0Rm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgICBmb2N1cygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGlmIChyb290UmVmLnZhbHVlID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSwgW2RhdGEtYXV0b2ZvY3VzXScpXG4gICAgICAgICAgfHwgQXJyYXkucHJvdG90eXBlLmZpbmQuY2FsbChyb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0YWJpbmRleF0nKSwgZWwgPT4gZWwudGFiSW5kZXggPiAtMSlcblxuICAgICAgICB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0ICE9PSB2b2lkIDAgJiYgdGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBwcm92aWRlKGZvcm1LZXksIHtcbiAgICAgIGJpbmRDb21wb25lbnQgKHZtUHJveHkpIHtcbiAgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMucHVzaCh2bVByb3h5KVxuICAgICAgfSxcblxuICAgICAgdW5iaW5kQ29tcG9uZW50ICh2bVByb3h5KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcmVnaXN0ZXJlZENvbXBvbmVudHMuaW5kZXhPZih2bVByb3h5KVxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgIHJlZ2lzdGVyZWRDb21wb25lbnRzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgc2hvdWxkQWN0aXZhdGUgPSBmYWxzZVxuXG4gICAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgICB9KVxuXG4gICAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgc2hvdWxkQWN0aXZhdGUgPT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIGZvY3VzKClcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBmb2N1cygpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHtcbiAgICAgIHZhbGlkYXRlLFxuICAgICAgcmVzZXRWYWxpZGF0aW9uLFxuICAgICAgc3VibWl0LFxuICAgICAgcmVzZXQsXG4gICAgICBmb2N1cyxcbiAgICAgIGdldFZhbGlkYXRpb25Db21wb25lbnRzOiAoKSA9PiByZWdpc3RlcmVkQ29tcG9uZW50c1xuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZm9ybScsIHtcbiAgICAgIGNsYXNzOiAncS1mb3JtJyxcbiAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgIG9uU3VibWl0OiBzdWJtaXQsXG4gICAgICBvblJlc2V0OiByZXNldFxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbImZvY3VzIiwicmVmIiwidmFsaWQiXSwibWFwcGluZ3MiOiI7QUFRQSxJQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0ws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
