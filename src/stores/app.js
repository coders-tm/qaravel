import { defineStore } from "pinia";
import Api from "../services/api";
import { LocalStorage } from "quasar";
import { map } from "lodash";
import app from "../../package.json";
import { Plugins } from "@capacitor/core";

const { Device } = Plugins;

const user = LocalStorage.getItem("current_user");
const token = LocalStorage.getItem("token");
const authenticated = LocalStorage.has("current_user");

export const useAppStore = defineStore("app", {
  state: () => ({
    user: user || {},
    token,
    authenticated,
    version: app.version,
    isDirt: false,
    isLoading: false,
    stats: {},
    title: null,
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
          const _module = state.user.modules.find(
            (item) => item.name === module
          );
          if (!permission && _module) {
            return true;
          } else if (
            permission &&
            _module &&
            _module.permissions.find((item) => item.action === permission)
          ) {
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
          var item = state.user.modules.find((item) => item.name === module);
          if (!item) return [];
          item = map(item.permissions, "action");
          return item;
        }
        return [];
      };
    },
    isAuthenticated(state) {
      return state.authenticated;
    },
    modules(state) {
      return state.user.modules;
    },
  },
  actions: {
    async login(playload) {
      if (process.env.API_MODE !== "token") {
        await Api.get("csrf-cookie");
      } else {
        const { uuid } = await Device.getInfo();
        playload.device_id = uuid;
      }
      return new Promise((resolve, reject) => {
        Api.post(`auth/${playload.guard}/login`, playload)
          .then((response) => {
            this.updateCurrentUser(response);
            resolve(response);
          })
          .catch((error) => {
            this.updateCurrentUser(false);
            reject(error);
          });
      });
    },
    async signUp(playload) {
      if (process.env.API_MODE !== "token") {
        await Api.get("csrf-cookie");
      }
      return new Promise((resolve, reject) => {
        Api.post(`auth/${playload.guard}/signup`, playload)
          .then((response) => {
            this.updateCurrentUser(response);
            resolve(response);
          })
          .catch((error) => {
            this.updateCurrentUser(false);
            reject(error);
          });
      });
    },
    currentUser(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${playload}/me`)
          .then((response) => {
            const user = response;
            if (!response.address) {
              Object.assign(user, {
                address: {},
              });
            }
            this.updateCurrentUser(user);
            resolve(user);
          })
          .catch((error) => {
            this.updateCurrentUser(false);
            reject(error);
          });
      });
    },
    updateCurrentUser(playload) {
      if (playload) {
        this.authenticated = true;
        if ("token" in playload) {
          const { user, token } = playload;
          this.user = user;
          this.token = token;
          LocalStorage.set("current_user", user);
          LocalStorage.set("token", token);
        } else {
          this.user = playload;
          LocalStorage.set("current_user", playload);
        }
      } else {
        this.authenticated = false;
        LocalStorage.remove("current_user");
        LocalStorage.remove("token");
      }
    },
    update(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${playload.guard}/update`, playload)
          .then((response) => {
            this.updateCurrentUser(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getModules(playload) {
      return new Promise((resolve, reject) => {
        Api.get("admins/modules", playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getStats(playload) {
      return new Promise((resolve, reject) => {
        Api.get(`application/stats`, playload)
          .then((response) => {
            this.stats = response;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getSettings(playload) {
      return new Promise((resolve, reject) => {
        Api.get(`application/settings/${playload}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateSettings(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`application/settings`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changePassword(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${playload.guard}/change-password`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async forgotPassword(playload) {
      if (process.env.API_MODE !== "token") {
        await Api.get("csrf-cookie");
      }
      return new Promise((resolve, reject) => {
        Api.post(`auth/${playload.guard}/forgot-password`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async resetPassword(playload) {
      if (process.env.API_MODE !== "token") {
        await Api.get("csrf-cookie");
      }
      return new Promise((resolve, reject) => {
        Api.post(`auth/${playload.guard}/reset-password`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${playload}/logout`)
          .then((response) => {
            this.updateCurrentUser(false);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setIsDirt(playload) {
      this.isDirt = playload;
      if (!playload) {
        this.isLoading = false;
      }
    },
    setIsLoading(playload) {
      this.isLoading = playload;
    },
    setTitle(playload) {
      this.title = playload;
    },
  },
});
