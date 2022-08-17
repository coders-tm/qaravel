import core from './core';
import { router } from '../router';
import { LoadingBar } from 'quasar';

export default {
  cache: {},
  init() {
    console.log('api.init()', arguments);
  },
  async call(method, endpoint, data, o) {
    console.func('services/api:request.call()', arguments);
    LoadingBar.start();
    return new Promise((resolve, reject) => {
      var playload = {
        url: endpoint,
        method: method,
        onUploadProgress: (event) => {
          const progress = parseInt(Math.round((event.loaded * 100) / event.total));
          // Update state here
          LoadingBar.increment(progress);
        },
        onDownloadProgress: (event) => {
          const progress = parseInt(Math.round((event.loaded * 100) / event.total));
          // Update state here
          LoadingBar.increment(progress);
        },
      };

      if (method === 'get') {
        playload.params = data;
      } else {
        playload.data = data;
      }

      if (o && o.responseType) {
        playload.responseType = o.responseType;
      }

      core
        .$axios(playload)
        .then((response) => {
          resolve(response.data);
          LoadingBar.stop();
        })
        .catch((error) => {
          LoadingBar.stop();
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            if (['419', '401'].includes(error.response.status)) {
              router.push({
                name: 'Login',
              });
            } else if (error.response.status === 404) {
              router.push({
                name: 'Error 404',
              });
            }

            if (error.response.data) {
              console.error('case1', error.response.data);
              reject(error.response.data.data ? error.response.data.data : error.response.data);
            }
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error('case2', error.request);
            reject(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('case3', error.message);
            reject(error.message);
          }
        });
    });
  },
  get(endpoint, data, o) {
    console.func('services/core:request.get()', arguments);
    return new Promise((resolve, reject) => {
      this.call('get', endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post(endpoint, data, o) {
    console.func('services/core:request.post()', arguments);
    return new Promise((resolve, reject) => {
      this.call('post', endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  put(endpoint, data, o) {
    console.func('services/core:request.put()', arguments);
    return new Promise((resolve, reject) => {
      this.call('put', endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  delete(endpoint, data, o) {
    console.func('services/core:request.delete()', arguments);
    return new Promise((resolve, reject) => {
      this.call('delete', endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  download(endpoint, data, o = {}) {
    console.func('services/core:request.download()', arguments);
    Object.assign(o, {
      responseType: 'blob',
    });
    return new Promise((resolve, reject) => {
      this.call('get', endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
