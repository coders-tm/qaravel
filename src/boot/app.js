import { boot } from "quasar/wrappers";
import axios from "axios";
import core from "../services/core";
import storage, { Storage } from "../services/storage";
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
  app.config.globalProperties.$storage = Storage;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$colors = colors;
  app.config.globalProperties.$app = appStore;

  //    axios setup    //
  axios.defaults.baseURL = process.env.API_URL;

  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      console.log("request error", error);
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      console.log("response error", error);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  //    core prototypes setup    //
  core.$axios = axios;
  core.$store = store;
  core.$storage = Storage;
  core.$appStore = appStore;

  console.core("Mode: " + process.env.APP_ENV || "Development");

  //    call and wait for initial setup    //
  await core.init();
  await storage.init();
  await network.init();
});
