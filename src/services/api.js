import core from "./core";
import { router } from "../router";
import { LoadingBar } from "quasar";

export default {
  cache: {},
  init() {
    console.log("api.init()", arguments);
  },
  async call(method, endpoint, data = {}, o) {
    console.func("services/api:request.call()", arguments);
    LoadingBar.start();

    // check api mode
    if (core.$useToken) {
      core.$axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${core.$appStore.token}`;
      // core.$axios.defaults.headers.Accept = "application/json";
      Object.assign(data, {
        useToken: true,
      });
    }

    return new Promise((resolve, reject) => {
      var playload = {
        url: endpoint,
        method: method,
        onUploadProgress: (event) => {
          const progress = parseInt(
            Math.round((event.loaded * 100) / event.total)
          );
          // Update state here
          LoadingBar.increment(progress);
        },
        onDownloadProgress: (event) => {
          const progress = parseInt(
            Math.round((event.loaded * 100) / event.total)
          );
          // Update state here
          LoadingBar.increment(progress);
        },
      };

      if (method === "get") {
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

            if (["419", "401"].includes(error.response.status)) {
              reject(error);
              router.push({
                name: "Login",
              });
            } else if (error.response.status === 404) {
              reject(error);
              router.push({
                name: "Error 404",
              });
            }

            if (error.response.data) {
              reject(
                error.response.data.data
                  ? error.response.data.data
                  : error.response.data
              );
            } else {
              reject(error);
            }
            return;
          }
          reject(error);
        });
    });
  },
  get(endpoint, data, o) {
    console.func("services/core:request.get()", arguments);
    return new Promise((resolve, reject) => {
      this.call("get", endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post(endpoint, data, o) {
    console.func("services/core:request.post()", arguments);
    return new Promise((resolve, reject) => {
      this.call("post", endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  put(endpoint, data, o) {
    console.func("services/core:request.put()", arguments);
    return new Promise((resolve, reject) => {
      this.call("put", endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  delete(endpoint, data, o) {
    console.func("services/core:request.delete()", arguments);
    return new Promise((resolve, reject) => {
      this.call("delete", endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  download(endpoint, data, o = {}) {
    console.func("services/core:request.download()", arguments);
    Object.assign(o, {
      responseType: "blob",
    });
    return new Promise((resolve, reject) => {
      this.call("get", endpoint, data, o)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
