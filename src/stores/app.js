import { defineStore } from 'pinia';
import Api from '../services/api';
import { LocalStorage } from 'quasar';
import { map } from 'lodash';
import app from '../../package.json'

const user = LocalStorage.getItem('current_user');
const authenticated = LocalStorage.has('current_user');

export const useAppStore = defineStore('app', {
  state: () => ({
    user: user || {},
    authenticated,
    defaultSideMenus: [
      {
        title: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        route: 'Dashboard',
        module: 'Dashboard',
        plans: ['Free'],
      },
      {
        title: 'Videos',
        icon: 'fas fa-film',
        route: 'Videos',
        module: 'Videos',
        plans: ['Free'],
      },
      {
        title: 'Streams',
        icon: 'fas fa-signal-stream',
        route: 'Streams',
        module: 'Streams',
        plans: ['Free'],
      },
      {
        title: 'Teams',
        icon: 'fas fa-users',
        route: 'Teams',
        module: 'Teams',
        plans: ['Free'],
      },
      {
        title: 'Publishers',
        icon: 'fas fa-bullhorn',
        route: 'Publishers',
        module: 'Publishers',
        plans: ['Free'],
      },
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
          item = map(item.permissions, 'action');
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
    },
  },
  actions: {
    async login(playload) {
      await Api.get('csrf-cookie');
      return new Promise((resolve, reject) => {
        Api.post('auth/login', playload)
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
      await Api.get('csrf-cookie');
      return new Promise((resolve, reject) => {
        Api.post('auth/signup', playload)
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
    currentUser() {
      return new Promise((resolve, reject) => {
        Api.post('auth/me', {
          guard: this.user.guard
        })
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
    updateCurrentUser(playload) {
      if (playload) {
        this.authenticated = true;
        this.user = playload;
        LocalStorage.set('current_user', playload);
      } else {
        this.authenticated = false;
        LocalStorage.remove('current_user');
      }
    },
    update(playload) {
      return new Promise((resolve, reject) => {
        Api.post('auth/update', playload)
          .then((response) => {
            this.updateCurrentUser(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    password(playload) {
      return new Promise((resolve, reject) => {
        Api.post('auth/password', playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async forgotPassword(playload) {
      await Api.get('csrf-cookie');
      return new Promise((resolve, reject) => {
        Api.post('auth/forgot-password', playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async resetPassword(playload) {
      await Api.get('csrf-cookie');
      return new Promise((resolve, reject) => {
        Api.post('auth/reset-password', playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        Api.post('auth/logout', {
          guard: this.user.guard
        })
          .then((response) => {
            this.updateCurrentUser(false);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    createAccessToken(playload) {
      return new Promise((resolve, reject) => {
        Api.post('auth/access-token/store', playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
