import { _ as _export_sfc, bC as mapActions, U as createBlock, V as withCtx, S as openBlock, a3 as QCard, d as createVNode, W as createBaseVNode, $ as toDisplayString, Z as QCardSection, a6 as createTextVNode, a2 as QBtn } from "./index.fb242601.js";
import { Q as QSkeleton } from "./QSkeleton.d304a049.js";
import { Q as QSpace } from "./QSpace.e84829d4.js";
import { Q as QToolbar } from "./QToolbar.39aff243.js";
import { Q as QPage } from "./QPage.b2ce6e50.js";
import { u as usePostsStore } from "./posts.aafd98ef.js";
import "./api.b3e7b694.js";
import "./BaseAlert.d7479406.js";
const _sfc_main = {
  data() {
    return {
      post: {},
      loaded: false
    };
  },
  methods: {
    ...mapActions(usePostsStore, ["show"]),
    onLoad() {
      console.func("pages/users/SinglePostPage:methods.onLoad()", arguments);
      this.loaded = false;
      this.show(this.id).then((post) => {
        this.post = post;
        this.loaded = true;
      }).catch((error) => {
        this.$core.error(error);
        this.$router.push({
          name: "Posts"
        });
      });
    }
  },
  computed: {
    id() {
      return this.$route.params.post;
    }
  },
  mounted() {
    this.onLoad();
  },
  watch: {
    $route(to, from) {
      if (to.name === from.name) {
        this.onLoad();
      }
    }
  }
};
const _hoisted_1 = { class: "text-h6" };
const _hoisted_2 = { class: "text-subtitle2" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      $data.loaded ? (openBlock(), createBlock(QCard, { key: 0 }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, toDisplayString($data.post.title), 1),
              createBaseVNode("div", _hoisted_2, toDisplayString($data.post.user.name), 1)
            ]),
            _: 1
          }),
          createVNode(QCardSection, { class: "q-pt-none" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($data.post.description), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : (openBlock(), createBlock(QCard, { key: 1 }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(QSkeleton, {
                animation: "blink",
                type: "text"
              }),
              createVNode(QSkeleton, {
                width: "150px",
                animation: "blink",
                type: "text"
              })
            ]),
            _: 1
          }),
          createVNode(QCardSection, { class: "q-pt-none" }, {
            default: withCtx(() => [
              createVNode(QSkeleton, { type: "text" }),
              createVNode(QSkeleton, { type: "text" }),
              createVNode(QSkeleton, {
                width: "60%",
                type: "text"
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })),
      createVNode(QToolbar, null, {
        default: withCtx(() => [
          createVNode(QSpace),
          createVNode(QBtn, {
            flat: "",
            color: "primary",
            icon: "fal fa-arrow-left",
            label: "Go back to posts",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.back()),
            class: "q-mt-md"
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var SinglePostPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "SinglePostPage.vue"]]);
export { SinglePostPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlUG9zdFBhZ2UuODQ2YjQ5NjYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy91c2Vycy9TaW5nbGVQb3N0UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1wYWdlIHBhZGRpbmc+XG4gICAgPHEtY2FyZCB2LWlmPVwibG9hZGVkXCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+e3sgcG9zdC50aXRsZSB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIj57eyBwb3N0LnVzZXIubmFtZSB9fTwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgICB7eyBwb3N0LmRlc2NyaXB0aW9uIH19XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICAgIDxxLWNhcmQgdi1lbHNlPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1za2VsZXRvbiBhbmltYXRpb249XCJibGlua1wiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPHEtc2tlbGV0b24gd2lkdGg9XCIxNTBweFwiIGFuaW1hdGlvbj1cImJsaW5rXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPHEtc2tlbGV0b24gd2lkdGg9XCI2MCVcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICAgIDxxLXRvb2xiYXI+XG4gICAgICA8cS1zcGFjZSAvPlxuICAgICAgPHEtYnRuXG4gICAgICAgIGZsYXRcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgaWNvbj1cImZhbCBmYS1hcnJvdy1sZWZ0XCJcbiAgICAgICAgbGFiZWw9XCJHbyBiYWNrIHRvIHBvc3RzXCJcbiAgICAgICAgQGNsaWNrPVwiJHJvdXRlci5iYWNrKClcIlxuICAgICAgICBjbGFzcz1cInEtbXQtbWRcIlxuICAgICAgLz5cbiAgICA8L3EtdG9vbGJhcj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbmltcG9ydCB7IG1hcEFjdGlvbnMgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IHVzZVBvc3RzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9wb3N0c1wiO1xuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0OiB7fSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIC4uLm1hcEFjdGlvbnModXNlUG9zdHNTdG9yZSwgW1wic2hvd1wiXSksXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5mdW5jKFwicGFnZXMvdXNlcnMvU2luZ2xlUG9zdFBhZ2U6bWV0aG9kcy5vbkxvYWQoKVwiLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvdyh0aGlzLmlkKVxuICAgICAgICAudGhlbigocG9zdCkgPT4ge1xuICAgICAgICAgIHRoaXMucG9zdCA9IHBvc3Q7XG4gICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy4kY29yZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJQb3N0c1wiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGlkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlLnBhcmFtcy5wb3N0O1xuICAgIH0sXG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5vbkxvYWQoKTtcbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICAkcm91dGUodG8sIGZyb20pIHtcbiAgICAgIGlmICh0by5uYW1lID09PSBmcm9tLm5hbWUpIHtcbiAgICAgICAgdGhpcy5vbkxvYWQoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFzQ0EsTUFBSyxZQUFVO0FBQUEsRUFDYixPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsTUFBTSxDQUFFO0FBQUEsTUFDUixRQUFRO0FBQUE7RUFFWDtBQUFBLEVBQ0QsU0FBUztBQUFBLElBQ1AsR0FBRyxXQUFXLGVBQWUsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNyQyxTQUFTO0FBQ1AsY0FBUSxLQUFLLCtDQUErQyxTQUFTO0FBQ3JFLFdBQUssU0FBUztBQUNkLFdBQUssS0FBSyxLQUFLLEVBQUUsRUFDZCxLQUFLLENBQUMsU0FBUztBQUNkLGFBQUssT0FBTztBQUNaLGFBQUssU0FBUztBQUFBLE9BQ2YsRUFDQSxNQUFNLENBQUMsVUFBVTtBQUNoQixhQUFLLE1BQU0sTUFBTSxLQUFLO0FBQ3RCLGFBQUssUUFBUSxLQUFLO0FBQUEsVUFDaEIsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDRCxVQUFVO0FBQUEsSUFDUixLQUFLO0FBQ0gsYUFBTyxLQUFLLE9BQU8sT0FBTztBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUFBLEVBQ0QsVUFBVTtBQUNSLFNBQUssT0FBTTtBQUFBLEVBQ1o7QUFBQSxFQUNELE9BQU87QUFBQSxJQUNMLE9BQU8sSUFBSSxNQUFNO0FBQ2YsVUFBSSxHQUFHLFNBQVMsS0FBSyxNQUFNO0FBQ3pCLGFBQUssT0FBTTtBQUFBLE1BQ2I7QUFBQSxJQUNEO0FBQUEsRUFDRjtBQUNIO0FBMUVhLE1BQUEsYUFBQSxFQUFBLE9BQU0sVUFBUztBQUNmLE1BQUEsYUFBQSxFQUFBLE9BQU0saUJBQWdCOztzQkFKakNBLFlBZ0NTLE9BQUEsRUFBQSxTQUFBLE1BaENNO0FBQUEscUJBQ2IsTUFRUztBQUFBLE1BUkssTUFBTSx1QkFBcEJBLFlBUVMsT0FBQSxFQUFBLEtBQUEsRUFBQSxHQUFBO0FBQUEseUJBUFAsTUFHaUI7QUFBQSxVQUhqQkMsWUFHaUIsY0FBQSxNQUFBO0FBQUEsNkJBRmYsTUFBMkM7QUFBQSxjQUEzQ0MsZ0JBQTJDLE9BQTNDLFlBQXdCQyxnQkFBQSxNQUFBLEtBQUssS0FBSyxHQUFBLENBQUE7QUFBQSxjQUNsQ0QsZ0JBQXNELE9BQXRELFlBQXNEQyxnQkFBdkIsV0FBSyxLQUFLLElBQUksR0FBQSxDQUFBO0FBQUE7OztVQUUvQ0YsWUFFaUIsY0FBQSxFQUFBLE9BQUEsWUFGSSxHQUFZO0FBQUEsNkJBQy9CLE1BQXNCO0FBQUEsY0FBbkJHLGdCQUFBRCxnQkFBQSxNQUFBLEtBQUssV0FBVyxHQUFBLENBQUE7QUFBQTs7Ozs7MEJBR3ZCSCxZQVVTLE9BQUEsRUFBQSxLQUFBLEVBQUEsR0FBQTtBQUFBLHlCQVRQLE1BR2lCO0FBQUEsVUFIakJDLFlBR2lCLGNBQUEsTUFBQTtBQUFBLDZCQUZmLE1BQTRDO0FBQUEsY0FBNUNBLFlBQTRDLFdBQUE7QUFBQSxnQkFBaEMsV0FBVTtBQUFBLGdCQUFRLE1BQUs7QUFBQTtjQUNuQ0EsWUFBMEQsV0FBQTtBQUFBLGdCQUE5QyxPQUFNO0FBQUEsZ0JBQVEsV0FBVTtBQUFBLGdCQUFRLE1BQUs7QUFBQTs7OztVQUVuREEsWUFJaUIsY0FBQSxFQUFBLE9BQUEsWUFKSSxHQUFZO0FBQUEsNkJBQy9CLE1BQTBCO0FBQUEsY0FBMUJBLFlBQTBCLFdBQUEsRUFBQSxNQUFBLE9BQWQsQ0FBSTtBQUFBLGNBQ2hCQSxZQUEwQixXQUFBLEVBQUEsTUFBQSxPQUFkLENBQUk7QUFBQSxjQUNoQkEsWUFBc0MsV0FBQTtBQUFBLGdCQUExQixPQUFNO0FBQUEsZ0JBQU0sTUFBSztBQUFBOzs7Ozs7O01BR2pDQSxZQVVZLFVBQUEsTUFBQTtBQUFBLHlCQVRWLE1BQVc7QUFBQSxVQUFYQSxZQUFXLE1BQUE7QUFBQSxVQUNYQSxZQU9FLE1BQUE7QUFBQSxZQU5BLE1BQUE7QUFBQSxZQUNBLE9BQU07QUFBQSxZQUNOLE1BQUs7QUFBQSxZQUNMLE9BQU07QUFBQSxZQUNMLFNBQUssT0FBQSxPQUFBLE9BQUEsS0FBQSxZQUFFLEtBQU8sUUFBQyxLQUFJO0FBQUEsWUFDcEIsT0FBTTtBQUFBOzs7Ozs7Ozs7OyJ9
