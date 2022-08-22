import { br as Plugin, bs as defineStore } from "./index.38989ee5.js";
import { A as Api } from "./api.7a924254.js";
import { l as lodash } from "./lodash.2b44b28e.js";
const name = "qaravel";
const version = "2.0.0";
const description = "Qaravel is a Combination of Laravel and Quasar";
const productName = "Qaravel";
const author = "DepokSarkar <depokbsmrstu@gmail.com>";
const config = {
  ssl: {
    host: "qaravel.gomedia"
  },
  ssh: {
    user: "coderstm.com",
    server: "ssh.gb.stackcp.com",
    folders: {
      live: "~/qaravel.coderstm.com",
      alpha: "~/qaravel.coderstm.com"
    }
  }
};
const scripts = {
  dev: "yarn build:clean && mix",
  build: "yarn build:clean && mix --production",
  commit: 'clear && git config core.ignorecase false && branch="$(git symbolic-ref -q HEAD)" || "dev" && branch=${branch##refs/heads/} && branch=${branch:-HEAD} && echo Commiting to Branch "$branch" && echo Please type your commit message && read msg && clear && git add . && git commit -m "$msg"',
  "push:git": 'clear && git config core.ignorecase false && branch="$(git symbolic-ref -q HEAD)" || "dev" && branch=${branch##refs/heads/} && branch=${branch:-HEAD} && echo Pushing to Branch "$branch" && echo Please type your commit message && read msg && clear && git add . && git commit -m "$msg" && git push origin "$branch"',
  "push:live": "clear && echo Starting Live Push && yarn build:prod && yarn sync:live && echo Finished Live Push",
  "push:alpha": "clear && echo Starting Alpha Push && yarn build:alpha && yarn sync:alpha && echo Finished Alpha Push ",
  "build:prod": "quasar build -m pwa && yarn make:icons && yarn build",
  "build:alpha": "cross-env BUILD_MODE=alpha quasar build -m pwa -d && yarn make:icons && yarn dev",
  "build:dev": "quasar build -m pwa -d && yarn make:icons && yarn dev",
  "make:icons": "icongenie generate -i app-icon.png",
  "make:ssl": "mkcert $npm_package_config_ssl_host && mkcert -install",
  fresh: "php artisan migrate:fresh --seed",
  "start:web": "yarn && quasar dev",
  "start:queue": "php artisan queue:work --timeout=36000 --stop-when-empty",
  "sync:live": 'echo Starting File Sync && rsync -avz --delete --exclude-from=".syncignore" -e "ssh -p22 -i ~/.ssh/sync" * $npm_package_config_ssh_user@$npm_package_config_ssh_server:$npm_package_config_ssh_folders_live && ssh -i ~/.ssh/sync $npm_package_config_ssh_user@$npm_package_config_ssh_server "cd $npm_package_config_ssh_folders_live && /usr/bin/php81 -f /usr/local/bin/composer2 install && /usr/bin/php81 artisan config:cache && /usr/bin/php81 artisan migrate && /usr/bin/php81 artisan storage:link --force" && echo Finished Live File Sync',
  "sync:alpha": 'echo Starting File Sync && rsync -avz --delete --exclude-from=".syncignore" -e "ssh -p22 -i ~/.ssh/sync" * $npm_package_config_ssh_user@$npm_package_config_ssh_server:$npm_package_config_ssh_folders_alpha && ssh -i ~/.ssh/sync $npm_package_config_ssh_user@$npm_package_config_ssh_server "cd $npm_package_config_ssh_folders_alpha && /usr/bin/php81 -f /usr/local/bin/composer2 install && /usr/bin/php81 artisan config:cache && /usr/bin/php81 artisan migrate && /usr/bin/php81 artisan storage:link --force" && echo Finished Alpha File Sync',
  "build:clean": "echo Cleaning old build && del-cli public/assets public/pdfjs public/mix-manifest.json",
  generate: "./command --init",
  lint: "eslint --ext .js,.vue ./",
  format: 'prettier --write "**/*.{js,vue,scss,html,md,json}" --ignore-path .gitignore',
  test: 'echo "No test specified" && exit 0'
};
const dependencies = {
  "@coders-tm/vue-number-format": "^3.1.2",
  "@fortawesome/fontawesome-pro": "^6.1.2",
  "@quasar/extras": "^1.0.0",
  axios: "^0.27",
  lodash: "^4.17.19",
  pinia: "^2.0.11",
  quasar: "^2.6.0",
  vue: "^3.0.0",
  "vue-i18n": "^9.0.0",
  "vue-router": "^4.0.0"
};
const devDependencies = {
  "@faker-js/faker": "^7.4.0",
  "@intlify/vite-plugin-vue-i18n": "^3.3.1",
  "@originjs/vite-plugin-require-context": "^1.0.9",
  "@quasar/app-vite": "^1.0.0",
  autoprefixer: "^10.4.2",
  "cross-env": "^7.0.3",
  "del-cli": "^5.0.0",
  dotenv: "^16.0.1",
  eslint: "^8.10.0",
  "eslint-config-prettier": "^8.1.0",
  "eslint-plugin-vue": "^9.0.0",
  "laravel-mix": "^6.0.49",
  prettier: "^2.5.1",
  "workbox-build": "^6.5.0",
  "workbox-cacheable-response": "^6.5.0",
  "workbox-core": "^6.5.0",
  "workbox-expiration": "^6.5.0",
  "workbox-precaching": "^6.5.0",
  "workbox-routing": "^6.5.0",
  "workbox-strategies": "^6.5.0"
};
const engines = {
  node: "^18 || ^16 || ^14.19",
  npm: ">= 6.13.4",
  yarn: ">= 1.21.1"
};
var app = {
  name,
  version,
  description,
  productName,
  author,
  "private": true,
  config,
  scripts,
  dependencies,
  devDependencies,
  engines
};
const user = Plugin.getItem("current_user");
const authenticated = Plugin.has("current_user");
const useAppStore = defineStore("app", {
  state: () => ({
    user: user || {},
    authenticated,
    defaultSideMenus: [
      {
        title: "Dashboard",
        icon: "fas fa-tachometer-alt",
        route: "Dashboard",
        module: "Dashboard",
        plans: ["Free"]
      },
      {
        title: "Videos",
        icon: "fas fa-film",
        route: "Videos",
        module: "Videos",
        plans: ["Free"]
      },
      {
        title: "Streams",
        icon: "fas fa-signal-stream",
        route: "Streams",
        module: "Streams",
        plans: ["Free"]
      },
      {
        title: "Teams",
        icon: "fas fa-users",
        route: "Teams",
        module: "Teams",
        plans: ["Free"]
      },
      {
        title: "Publishers",
        icon: "fas fa-bullhorn",
        route: "Publishers",
        module: "Publishers",
        plans: ["Free"]
      }
    ],
    version: app.version
  }),
  getters: {
    hasPermission(state) {
      return (module) => {
        if (state.user.modules) {
          if (state.user.modules.find((item) => item.name === module)) {
            return true;
          }
          return false;
        }
        return false;
      };
    },
    hasModulePermission(state) {
      return (module, permission = false) => {
        if (state.user.modules) {
          const _module = state.user.modules.find((item) => item.name === module);
          if (!permission && _module) {
            return true;
          } else if (permission && _module && _module.permissions.find((item) => item.action === permission)) {
            return true;
          }
          return false;
        }
        return false;
      };
    },
    getPermissions(state) {
      return (module) => {
        if (state.user.modules) {
          var item = state.user.modules.find((item2) => item2.name === module);
          if (!item)
            return [];
          item = lodash.exports.map(item.permissions, "action");
          return item;
        }
        return [];
      };
    },
    isAuthenticated(state) {
      return state.authenticated;
    },
    sideMenus(state) {
      return state.defaultSideMenus;
    }
  },
  actions: {
    async login(playload) {
      await Api.get("csrf-cookie");
      return new Promise((resolve, reject) => {
        Api.post("auth/login", playload).then((response) => {
          this.updateCurrentUser(response);
          resolve(response);
        }).catch((error) => {
          this.updateCurrentUser(false);
          reject(error);
        });
      });
    },
    async signUp(playload) {
      await Api.get("csrf-cookie");
      return new Promise((resolve, reject) => {
        Api.post("auth/signup", playload).then((response) => {
          this.updateCurrentUser(response);
          resolve(response);
        }).catch((error) => {
          this.updateCurrentUser(false);
          reject(error);
        });
      });
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        Api.post("auth/me", {
          guard: this.user.guard
        }).then((response) => {
          this.updateCurrentUser(response);
          resolve(response);
        }).catch((error) => {
          this.updateCurrentUser(false);
          reject(error);
        });
      });
    },
    updateCurrentUser(playload) {
      if (playload) {
        this.authenticated = true;
        this.user = playload;
        Plugin.set("current_user", playload);
      } else {
        this.authenticated = false;
        Plugin.remove("current_user");
      }
    },
    update(playload) {
      return new Promise((resolve, reject) => {
        Api.post("auth/update", playload).then((response) => {
          this.updateCurrentUser(response);
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    password(playload) {
      return new Promise((resolve, reject) => {
        Api.post("auth/password", playload).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    async forgotPassword(playload) {
      await Api.get("csrf-cookie");
      return new Promise((resolve, reject) => {
        Api.post("auth/forgot-password", playload).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    async resetPassword(playload) {
      await Api.get("csrf-cookie");
      return new Promise((resolve, reject) => {
        Api.post("auth/reset-password", playload).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        Api.post("auth/logout", {
          guard: this.user.guard
        }).then((response) => {
          this.updateCurrentUser(false);
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    createAccessToken(playload) {
      return new Promise((resolve, reject) => {
        Api.post("auth/access-token/store", playload).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
});
export { useAppStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmM3MjFkZDhkLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gJ3BpbmlhJztcbmltcG9ydCBBcGkgZnJvbSAnLi4vc2VydmljZXMvYXBpJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gJ3F1YXNhcic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nXG5cbmNvbnN0IHVzZXIgPSBMb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudF91c2VyJyk7XG5jb25zdCBhdXRoZW50aWNhdGVkID0gTG9jYWxTdG9yYWdlLmhhcygnY3VycmVudF91c2VyJyk7XG5cbmV4cG9ydCBjb25zdCB1c2VBcHBTdG9yZSA9IGRlZmluZVN0b3JlKCdhcHAnLCB7XG4gIHN0YXRlOiAoKSA9PiAoe1xuICAgIHVzZXI6IHVzZXIgfHwge30sXG4gICAgYXV0aGVudGljYXRlZCxcbiAgICBkZWZhdWx0U2lkZU1lbnVzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnRGFzaGJvYXJkJyxcbiAgICAgICAgaWNvbjogJ2ZhcyBmYS10YWNob21ldGVyLWFsdCcsXG4gICAgICAgIHJvdXRlOiAnRGFzaGJvYXJkJyxcbiAgICAgICAgbW9kdWxlOiAnRGFzaGJvYXJkJyxcbiAgICAgICAgcGxhbnM6IFsnRnJlZSddLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdWaWRlb3MnLFxuICAgICAgICBpY29uOiAnZmFzIGZhLWZpbG0nLFxuICAgICAgICByb3V0ZTogJ1ZpZGVvcycsXG4gICAgICAgIG1vZHVsZTogJ1ZpZGVvcycsXG4gICAgICAgIHBsYW5zOiBbJ0ZyZWUnXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnU3RyZWFtcycsXG4gICAgICAgIGljb246ICdmYXMgZmEtc2lnbmFsLXN0cmVhbScsXG4gICAgICAgIHJvdXRlOiAnU3RyZWFtcycsXG4gICAgICAgIG1vZHVsZTogJ1N0cmVhbXMnLFxuICAgICAgICBwbGFuczogWydGcmVlJ10sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ1RlYW1zJyxcbiAgICAgICAgaWNvbjogJ2ZhcyBmYS11c2VycycsXG4gICAgICAgIHJvdXRlOiAnVGVhbXMnLFxuICAgICAgICBtb2R1bGU6ICdUZWFtcycsXG4gICAgICAgIHBsYW5zOiBbJ0ZyZWUnXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnUHVibGlzaGVycycsXG4gICAgICAgIGljb246ICdmYXMgZmEtYnVsbGhvcm4nLFxuICAgICAgICByb3V0ZTogJ1B1Ymxpc2hlcnMnLFxuICAgICAgICBtb2R1bGU6ICdQdWJsaXNoZXJzJyxcbiAgICAgICAgcGxhbnM6IFsnRnJlZSddLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHZlcnNpb246IGFwcC52ZXJzaW9uXG4gIH0pLFxuICBnZXR0ZXJzOiB7XG4gICAgaGFzUGVybWlzc2lvbihzdGF0ZSkge1xuICAgICAgcmV0dXJuIChtb2R1bGUpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlLnVzZXIubW9kdWxlcykge1xuICAgICAgICAgIGlmIChzdGF0ZS51c2VyLm1vZHVsZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5uYW1lID09PSBtb2R1bGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBoYXNNb2R1bGVQZXJtaXNzaW9uKHN0YXRlKSB7XG4gICAgICByZXR1cm4gKG1vZHVsZSwgcGVybWlzc2lvbiA9IGZhbHNlKSA9PiB7XG4gICAgICAgIGlmIChzdGF0ZS51c2VyLm1vZHVsZXMpIHtcbiAgICAgICAgICBjb25zdCBfbW9kdWxlID0gc3RhdGUudXNlci5tb2R1bGVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gbW9kdWxlKTtcbiAgICAgICAgICBpZiAoIXBlcm1pc3Npb24gJiYgX21vZHVsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBlcm1pc3Npb24gJiZcbiAgICAgICAgICAgIF9tb2R1bGUgJiZcbiAgICAgICAgICAgIF9tb2R1bGUucGVybWlzc2lvbnMuZmluZCgoaXRlbSkgPT4gaXRlbS5hY3Rpb24gPT09IHBlcm1pc3Npb24pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBnZXRQZXJtaXNzaW9ucyhzdGF0ZSkge1xuICAgICAgcmV0dXJuIChtb2R1bGUpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlLnVzZXIubW9kdWxlcykge1xuICAgICAgICAgIHZhciBpdGVtID0gc3RhdGUudXNlci5tb2R1bGVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gbW9kdWxlKTtcbiAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBbXTtcbiAgICAgICAgICBpdGVtID0gbWFwKGl0ZW0ucGVybWlzc2lvbnMsICdhY3Rpb24nKTtcbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgICB9O1xuICAgIH0sXG4gICAgaXNBdXRoZW50aWNhdGVkKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUuYXV0aGVudGljYXRlZDtcbiAgICB9LFxuICAgIHNpZGVNZW51cyhzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLmRlZmF1bHRTaWRlTWVudXM7XG4gICAgfSxcbiAgfSxcbiAgYWN0aW9uczoge1xuICAgIGFzeW5jIGxvZ2luKHBsYXlsb2FkKSB7XG4gICAgICBhd2FpdCBBcGkuZ2V0KCdjc3JmLWNvb2tpZScpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgQXBpLnBvc3QoJ2F1dGgvbG9naW4nLCBwbGF5bG9hZClcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFVzZXIocmVzcG9uc2UpO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRVc2VyKGZhbHNlKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFzeW5jIHNpZ25VcChwbGF5bG9hZCkge1xuICAgICAgYXdhaXQgQXBpLmdldCgnY3NyZi1jb29raWUnKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIEFwaS5wb3N0KCdhdXRoL3NpZ251cCcsIHBsYXlsb2FkKVxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50VXNlcihyZXNwb25zZSk7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFVzZXIoZmFsc2UpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY3VycmVudFVzZXIoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBBcGkucG9zdCgnYXV0aC9tZScsIHtcbiAgICAgICAgICBndWFyZDogdGhpcy51c2VyLmd1YXJkXG4gICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRVc2VyKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50VXNlcihmYWxzZSk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVDdXJyZW50VXNlcihwbGF5bG9hZCkge1xuICAgICAgaWYgKHBsYXlsb2FkKSB7XG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudXNlciA9IHBsYXlsb2FkO1xuICAgICAgICBMb2NhbFN0b3JhZ2Uuc2V0KCdjdXJyZW50X3VzZXInLCBwbGF5bG9hZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgTG9jYWxTdG9yYWdlLnJlbW92ZSgnY3VycmVudF91c2VyJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGUocGxheWxvYWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIEFwaS5wb3N0KCdhdXRoL3VwZGF0ZScsIHBsYXlsb2FkKVxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50VXNlcihyZXNwb25zZSk7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHBhc3N3b3JkKHBsYXlsb2FkKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBBcGkucG9zdCgnYXV0aC9wYXNzd29yZCcsIHBsYXlsb2FkKVxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBhc3luYyBmb3Jnb3RQYXNzd29yZChwbGF5bG9hZCkge1xuICAgICAgYXdhaXQgQXBpLmdldCgnY3NyZi1jb29raWUnKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIEFwaS5wb3N0KCdhdXRoL2ZvcmdvdC1wYXNzd29yZCcsIHBsYXlsb2FkKVxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBhc3luYyByZXNldFBhc3N3b3JkKHBsYXlsb2FkKSB7XG4gICAgICBhd2FpdCBBcGkuZ2V0KCdjc3JmLWNvb2tpZScpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgQXBpLnBvc3QoJ2F1dGgvcmVzZXQtcGFzc3dvcmQnLCBwbGF5bG9hZClcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbG9nb3V0KCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgQXBpLnBvc3QoJ2F1dGgvbG9nb3V0Jywge1xuICAgICAgICAgIGd1YXJkOiB0aGlzLnVzZXIuZ3VhcmRcbiAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFVzZXIoZmFsc2UpO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjcmVhdGVBY2Nlc3NUb2tlbihwbGF5bG9hZCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgQXBpLnBvc3QoJ2F1dGgvYWNjZXNzLXRva2VuL3N0b3JlJywgcGxheWxvYWQpXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxufSk7XG4iXSwibmFtZXMiOlsiTG9jYWxTdG9yYWdlIiwi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
