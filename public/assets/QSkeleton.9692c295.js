import { v as createComponent, J as useDarkProps, L as useDark, c as computed, h, I as hSlot, g as getCurrentInstance } from "./index.94c1c68b.js";
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
export { QSkeleton as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNrZWxldG9uLjk2OTJjMjk1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NrZWxldG9uL1FTa2VsZXRvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCBza2VsZXRvblR5cGVzID0gW1xuICAndGV4dCcsICdyZWN0JywgJ2NpcmNsZScsXG4gICdRQnRuJywgJ1FCYWRnZScsICdRQ2hpcCcsICdRVG9vbGJhcicsXG4gICdRQ2hlY2tib3gnLCAnUVJhZGlvJywgJ1FUb2dnbGUnLFxuICAnUVNsaWRlcicsICdRUmFuZ2UnLCAnUUlucHV0JyxcbiAgJ1FBdmF0YXInXG5dXG5cbmV4cG9ydCBjb25zdCBza2VsZXRvbkFuaW1hdGlvbnMgPSBbXG4gICd3YXZlJywgJ3B1bHNlJywgJ3B1bHNlLXgnLCAncHVsc2UteScsICdmYWRlJywgJ2JsaW5rJywgJ25vbmUnXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2tlbGV0b24nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gc2tlbGV0b25UeXBlcy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdyZWN0J1xuICAgIH0sXG5cbiAgICBhbmltYXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBza2VsZXRvbkFuaW1hdGlvbnMuaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnd2F2ZSdcbiAgICB9LFxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxNTAwXG4gICAgfSxcblxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcblxuICAgIHNpemU6IFN0cmluZyxcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBwcm9wcy5zaXplICE9PSB2b2lkIDBcbiAgICAgICAgPyBbIHByb3BzLnNpemUsIHByb3BzLnNpemUgXVxuICAgICAgICA6IFsgcHJvcHMud2lkdGgsIHByb3BzLmhlaWdodCBdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICctLXEtc2tlbGV0b24tc3BlZWQnOiBgJHsgcHJvcHMuYW5pbWF0aW9uU3BlZWQgfW1zYCxcbiAgICAgICAgd2lkdGg6IHNpemVbIDAgXSxcbiAgICAgICAgaGVpZ2h0OiBzaXplWyAxIF1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1za2VsZXRvbiBxLXNrZWxldG9uLS0keyBpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnZGFyaycgOiAnbGlnaHQnIH0gcS1za2VsZXRvbi0tdHlwZS0keyBwcm9wcy50eXBlIH1gXG4gICAgICArIChwcm9wcy5hbmltYXRpb24gIT09ICdub25lJyA/IGAgcS1za2VsZXRvbi0tYW5pbSBxLXNrZWxldG9uLS1hbmltLSR7IHByb3BzLmFuaW1hdGlvbiB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXNrZWxldG9uLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1za2VsZXRvbi0tYm9yZGVyZWQnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPTyxNQUFNLGdCQUFnQjtBQUFBLEVBQzNCO0FBQUEsRUFBUTtBQUFBLEVBQVE7QUFBQSxFQUNoQjtBQUFBLEVBQVE7QUFBQSxFQUFVO0FBQUEsRUFBUztBQUFBLEVBQzNCO0FBQUEsRUFBYTtBQUFBLEVBQVU7QUFBQSxFQUN2QjtBQUFBLEVBQVc7QUFBQSxFQUFVO0FBQUEsRUFDckI7QUFDRjtBQUVPLE1BQU0scUJBQXFCO0FBQUEsRUFDaEM7QUFBQSxFQUFRO0FBQUEsRUFBUztBQUFBLEVBQVc7QUFBQSxFQUFXO0FBQUEsRUFBUTtBQUFBLEVBQVM7QUFDMUQ7QUFFQSxJQUFBLFlBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELE1BQU07QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFdBQVcsT0FBSyxjQUFjLFNBQVMsQ0FBQztBQUFBLE1BQ3hDLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixXQUFXLE9BQUssbUJBQW1CLFNBQVMsQ0FBQztBQUFBLE1BQzdDLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxnQkFBZ0I7QUFBQSxNQUNkLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxNQUN4QixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBRVYsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLEVBQ1Q7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxLQUFLLG1CQUFvQjtBQUMvQixVQUFNLFNBQVMsUUFBUSxPQUFPLEdBQUcsTUFBTSxFQUFFO0FBRXpDLFVBQU0sUUFBUSxTQUFTLE1BQU07QUFDM0IsWUFBTSxPQUFPLE1BQU0sU0FBUyxTQUN4QixDQUFFLE1BQU0sTUFBTSxNQUFNLElBQU0sSUFDMUIsQ0FBRSxNQUFNLE9BQU8sTUFBTSxNQUFRO0FBRWpDLGFBQU87QUFBQSxRQUNMLHNCQUFzQixHQUFJLE1BQU07QUFBQSxRQUNoQyxPQUFPLEtBQU07QUFBQSxRQUNiLFFBQVEsS0FBTTtBQUFBLE1BQ2Y7QUFBQSxJQUNQLENBQUs7QUFFRCxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLDBCQUEyQixPQUFPLFVBQVUsT0FBTyxTQUFTLDRCQUE4QixNQUFNLFVBQzdGLE1BQU0sY0FBYyxTQUFTLHNDQUF1QyxNQUFNLGNBQWUsT0FDekYsTUFBTSxXQUFXLE9BQU8sd0JBQXdCLE9BQ2hELE1BQU0sYUFBYSxPQUFPLDBCQUEwQjtBQUFBLElBQ3hEO0FBRUQsV0FBTyxNQUFNLEVBQUUsTUFBTSxLQUFLO0FBQUEsTUFDeEIsT0FBTyxRQUFRO0FBQUEsTUFDZixPQUFPLE1BQU07QUFBQSxJQUNuQixHQUFPLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUN4QjtBQUNILENBQUM7OyJ9
