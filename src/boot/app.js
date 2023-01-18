import { boot } from "quasar/wrappers";
import axios, { AxiosError } from "axios";
import core from "../services/core";
import storage from "../services/storage";
import network from "../services/network";
import api from "../services/api";
import { colors } from "quasar";
import { useAppStore } from "stores/app";

const appStore = useAppStore();

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, store }) => {
  console.core(`Loading ${process.env.APP_NAME} services`);

  //    app prototypes setup    //
  app.config.globalProperties.$core = core;
  app.config.globalProperties.$storage = storage;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$colors = colors;
  app.config.globalProperties.$app = appStore;

  //    axios setup    //
  axios.defaults.baseURL = process.env.API_URL;

  // Add a response interceptor
  axios.interceptors.response.use(
    async function (response) {
      console.log("boot/app.axios.interceptors.response:success", response);
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      storage.setResponse(response);
      return response;
    },
    async function (error) {
      console.log("boot/app.axios.interceptors.response:error", error);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const { code, config } = error;
      const { method } = config;
      if (code === AxiosError.ERR_NETWORK) {
        if (method === "get") {
          const key = storage.getUri(config);
          const data = await storage.get(key);
          if (data) {
            return Promise.resolve({
              ...error,
              data,
            });
          }
        } else {
          storage.setRequest(config);
        }
      }
      return Promise.reject(error);
    }
  );

  //    core prototypes setup    //
  core.$axios = axios;
  core.$store = store;
  core.$storage = storage;
  core.$appStore = appStore;

  console.core("Mode: " + process.env.APP_ENV || "Development");

  //    call and wait for initial setup    //
  await core.init();
  await storage.init();
  await network.init();
});
