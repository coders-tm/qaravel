import { f as boot } from "./index.8d5ea4b7.js";
import { u as useAppStore } from "./app.89142b40.js";
import "./api.ea8a70e6.js";
import "./BaseAlert.7b9d1a3e.js";
import "./lodash.2b44b28e.js";
var auth = boot(async ({ router, store }) => {
  const app = useAppStore();
  router.beforeEach((to, from, next) => {
    const auth2 = to.meta.auth;
    if (auth2) {
      if (app.isAuthenticated) {
        next();
      } else {
        next({ name: "Login", params: { to } });
      }
    } else {
      next();
    }
  });
  router.beforeResolve((to, from, next) => {
    const module = to.meta.module;
    if (module) {
      if (module === "Dashboard" && !app.hasPermission(module)) {
        next({ name: "Error 404" });
      } else if (app.hasPermission(module)) {
        next();
      } else {
        next({ name: "Dashboard" });
      }
    } else {
      next();
    }
  });
});
export { auth as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC40OGNkMGFmYi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Jvb3QvYXV0aC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBib290IH0gZnJvbSBcInF1YXNhci93cmFwcGVyc1wiO1xuaW1wb3J0IHsgdXNlQXBwU3RvcmUgfSBmcm9tIFwic3RvcmVzL2FwcFwiO1xuXG4vLyBcImFzeW5jXCIgaXMgb3B0aW9uYWw7XG4vLyBtb3JlIGluZm8gb24gcGFyYW1zOiBodHRwczovL3YyLnF1YXNhci5kZXYvcXVhc2FyLWNsaS9ib290LWZpbGVzXG5leHBvcnQgZGVmYXVsdCBib290KGFzeW5jICh7IHJvdXRlciwgc3RvcmUgfSkgPT4ge1xuICBjb25zdCBhcHAgPSB1c2VBcHBTdG9yZSgpO1xuICByb3V0ZXIuYmVmb3JlRWFjaCgodG8sIGZyb20sIG5leHQpID0+IHtcbiAgICBjb25zdCBhdXRoID0gdG8ubWV0YS5hdXRoO1xuICAgIGlmIChhdXRoKSB7XG4gICAgICBpZiAoYXBwLmlzQXV0aGVudGljYXRlZCkge1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0KHsgbmFtZTogXCJMb2dpblwiLCBwYXJhbXM6IHsgdG86IHRvIH0gfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQoKTtcbiAgICB9XG4gIH0pO1xuICByb3V0ZXIuYmVmb3JlUmVzb2x2ZSgodG8sIGZyb20sIG5leHQpID0+IHtcbiAgICBjb25zdCBtb2R1bGUgPSB0by5tZXRhLm1vZHVsZTtcbiAgICBpZiAobW9kdWxlKSB7XG4gICAgICBpZiAobW9kdWxlID09PSBcIkRhc2hib2FyZFwiICYmICFhcHAuaGFzUGVybWlzc2lvbihtb2R1bGUpKSB7XG4gICAgICAgIG5leHQoeyBuYW1lOiBcIkVycm9yIDQwNFwiIH0pO1xuICAgICAgfSBlbHNlIGlmIChhcHAuaGFzUGVybWlzc2lvbihtb2R1bGUpKSB7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHQoeyBuYW1lOiBcIkRhc2hib2FyZFwiIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbImF1dGgiXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0EsSUFBZSxPQUFBLEtBQUssT0FBTyxFQUFFLFFBQVEsWUFBWTtBQUMvQyxRQUFNLE1BQU07QUFDWixTQUFPLFdBQVcsQ0FBQyxJQUFJLE1BQU0sU0FBUztBQUNwQyxVQUFNQSxRQUFPLEdBQUcsS0FBSztBQUNyQixRQUFJQSxPQUFNO0FBQ1IsVUFBSSxJQUFJLGlCQUFpQjtBQUN2QjtNQUNSLE9BQWE7QUFDTCxhQUFLLEVBQUUsTUFBTSxTQUFTLFFBQVEsRUFBRSxHQUFRLEVBQUEsQ0FBRTtBQUFBLE1BQzNDO0FBQUEsSUFDUCxPQUFXO0FBQ0w7SUFDRDtBQUFBLEVBQ0wsQ0FBRztBQUNELFNBQU8sY0FBYyxDQUFDLElBQUksTUFBTSxTQUFTO0FBQ3ZDLFVBQU0sU0FBUyxHQUFHLEtBQUs7QUFDdkIsUUFBSSxRQUFRO0FBQ1YsVUFBSSxXQUFXLGVBQWUsQ0FBQyxJQUFJLGNBQWMsTUFBTSxHQUFHO0FBQ3hELGFBQUssRUFBRSxNQUFNLFlBQVcsQ0FBRTtBQUFBLE1BQzNCLFdBQVUsSUFBSSxjQUFjLE1BQU0sR0FBRztBQUNwQztNQUNSLE9BQWE7QUFDTCxhQUFLLEVBQUUsTUFBTSxZQUFXLENBQUU7QUFBQSxNQUMzQjtBQUFBLElBQ1AsT0FBVztBQUNMO0lBQ0Q7QUFBQSxFQUNMLENBQUc7QUFDSCxDQUFDOzsifQ==
