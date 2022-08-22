import {
  LocalStorage,
  Dialog,
  uid,
  Cookies,
  openURL,
  Notify,
  exportFile,
  date,
  format,
  copyToClipboard,
} from "quasar";

import { NumberFormat } from "@coders-tm/vue-number-format";
import BaseAlert from "../components/base/BaseAlert.vue";

const { capitalize, humanStorageSize } = format;

let emitTimer;

export default {
  modules: {},
  async init() {
    console.func("services/core:init()", arguments);
    if (Cookies.has("qaravel-gdpr-accept") !== true) {
      Notify.create({
        message:
          "We use cookies to improve user experience, manage user sessions and analyze website traffic. By clicking “Accept” you consent to store on your device all the technologies described in our Cookie Policy. Please read our Terms and Conditions and Privacy Policy for full details by clicking the Learn More button.",
        multiline: true,
        classes: "bg-grey-10",
        timeout: 0,
        position: "bottom-right",
        actions: [
          {
            label: "Accept",
            color: "yellow",
            handler() {
              Cookies.set("qaravel-gdpr-accept", true, {
                expires: 5 * 365,
              });
            },
          },
          {
            label: "Learn more",
            color: "grey",
            noDismiss: true,
            handler() {
              openURL(process.env.COOKIE_URL);
            },
          },
        ],
      });
    }
  },
  app: {},
  closeDate(refs) {
    Object.keys(refs).forEach((ref) => {
      if (ref.indexOf("ds_") !== -1) {
        refs[ref].hide();
      }
    });
  },
  confirm(msg, o) {
    console.func("services/core:confirm()", arguments);
    return new Promise((resolve, reject) => {
      var strMsg = [];
      if (typeof msg === "object") {
        strMsg.push(msg.message);
      } else {
        strMsg.push(msg);
      }

      Dialog.create({
        component: BaseAlert,
        componentProps: {
          msg: strMsg,
          icon: "warning",
          title: o && o.title ? o.title : "Please Confirm",
          subTitle: o && o.subTitle ? o.subTitle : false,
          ok: {
            label: o && o.ok ? o.ok : "Confirm",
            color: o && o.okColor ? o.okColor : "positive",
          },
          cancel: {
            label: o && o.cancel ? o.cancel : "Cancel",
            color: o && o.cancelColor ? o.cancelColor : "grey",
          },
        },
      })
        .onOk(() => {
          resolve("ok");
        })
        .onCancel(() => {
          reject("cancel");
        });
    });
  },
  error(msg, o) {
    console.func("services/core:error()", arguments);
    var strMsg = [];
    if (typeof msg === "object") {
      if (msg.errors) {
        Object.keys(msg.errors).forEach(function (key) {
          if (typeof msg.errors[key] === "string") {
            strMsg.push({
              icon: "exclamation-circle",
              text: msg.errors[key],
            });
          } else {
            msg.errors[key].forEach((val) => {
              strMsg.push({
                color: "negative",
                icon: "exclamation-circle",
                text: val,
              });
            });
          }
        });
      } else {
        strMsg.push(msg.message);
      }
    } else {
      strMsg.push(msg);
    }

    Dialog.create({
      component: BaseAlert,
      componentProps: {
        msg: strMsg,
        icon: "error",
        title: o && o.title ? o.title : "Error",
      },
    }).onOk(() => {
      console.log("OK");
    });
  },
  success(msg, o) {
    console.func("services/core:success()", arguments);
    Dialog.create({
      component: BaseAlert,
      componentProps: {
        msg: msg,
        icon: o && o.icon ? o.icon : "success",
        title: o && o.title ? o.title : "Success",
      },
    }).onOk(() => {
      console.log("OK");
    });
  },
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  data(min, max, limit) {
    const data = [];
    for (let i = 0; i <= limit; i++) {
      data.push(this.random(min, max));
    }
    return data;
  },
  slug(obj) {
    return obj
      .toString()
      .trim()
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  },
  category(list, key) {
    return list.map((element) => element[key]).join(", ");
  },
  async importScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      script.addEventListener("load", (event) => {
        resolve();
      });
      script.addEventListener("error", () =>
        reject('Error loading script "' + src + '"')
      );
      script.addEventListener("abort", () =>
        reject('Script loading aborted for "' + src + '"')
      );
      document.head.appendChild(script);
    });
  },
  wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== undefined ? formatFn(val) : val;

    formatted =
      formatted === undefined || formatted === null ? "" : String(formatted);

    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`;
  },
  export(table, name, type = "text/csv") {
    const content = [table.columns.map((col) => this.wrapCsvValue(col.label))]
      .concat(
        table.data.map((row) =>
          table.columns
            .map((col) =>
              this.wrapCsvValue(
                typeof col.field === "function"
                  ? col.field(row)
                  : row[col.field === undefined ? col.name : col.field],
                col.format
              )
            )
            .join(",")
        )
      )
      .join("\r\n");

    const status = exportFile(name + "_" + Date.now() + ".csv", content, type);

    if (status !== true) {
      Notify.create({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning",
      });
    }
  },
  b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {
      type: contentType,
    });
    return blob;
  },
  getBlobURL(data) {
    const blob = this.b64toBlob(data, "text/plain");
    const url = URL.createObjectURL(blob);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
    return url;
  },
  getDate(d) {
    if (d && typeof d === "string") {
      if (d.indexOf("-") !== -1) {
        d = date.extractDate(d, "YYYY-MM-DD");
      } else if (d.indexOf("/") !== -1) {
        d = date.extractDate(d, "DD/MM/YYYY");
      }
    } else if (!d || typeof d === "string") {
      d = new Date();
    }

    return d;
  },
  length(obj, o) {
    var len = 0;
    if (obj && typeof obj.length === "undefined") {
      Object.keys(obj).forEach(function (key) {
        len++;
      });
    } else if (obj) {
      len = obj.length;
    }
    return len;
  },
  sort(arr, field, dir) {
    console.log("core.sort()", arguments);
    if (dir) {
      return arr.sort((a, b) =>
        a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
      );
    } else {
      return arr.sort((a, b) =>
        a[field] > b[field] ? -1 : b[field] > a[field] ? 1 : 0
      );
    }
  },
  humanSize(number) {
    return humanStorageSize(number);
  },
  capitalize(text) {
    if (text) {
      return capitalize(text);
    } else {
      return text;
    }
  },
  valid: {
    email: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
  formatDate(d, type) {
    var format = "DD/MM/YYYY";

    switch (type) {
      case "sql":
        format = "YYYY-MM-DD";
        break;
    }
    if (d && typeof d === "string") {
      d = this.getDate(d);
    }
    if (typeof d.getMonth === "function") {
      d = date.formatDate(d, format);
    }

    return d;
  },
  openURL(url) {
    console.func("services/core:openURL()", arguments);
    openURL(url);
  },
  uid() {
    console.func("services/core:uid()", arguments);
    return uid();
  },
  dataURLtoFile(dataurl, filename) {
    console.func("services/core:dataURLtoFile()", arguments);
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  },
  combinations(...args) {
    var r = [],
      max = args.length - 1;
    function helper(arr, i) {
      for (var j = 0, l = args[i].length; j < l; j++) {
        var a = arr.slice(0);
        a.push(args[i][j]);
        if (i === max) {
          r.push(a);
        } else {
          helper(a, i + 1);
        }
      }
    }
    helper([], 0);
    return r;
  },
  money(value, config = {}) {
    return this.formatNumber(value, config);
  },
  formatNumber(value, config = {}) {
    // Package: Vue Number Format
    // Docs: https://vue-number-format.netlify.app/guide/config.html
    const options = Object.assign(
      {
        prefix: "£",
        reverseFill: true,
        precision: 2,
      },
      config
    );
    const integer = parseInt(
      (Number(value).toFixed(options.precision) *
        Number(`1e${options.precision + 1}`)) /
        10
    );
    return new NumberFormat(options).format(integer);
  },
  debounce(func, wait, immediate) {
    console.func("services/core:debounce()", arguments);
    if (immediate) {
      return func.call();
    }
    clearTimeout(emitTimer);
    emitTimer = setTimeout(() => {
      return func.call();
    }, wait);
  },
  copyToClipboard(text, message) {
    console.func("services/core:copyToClipboard()", arguments);
    copyToClipboard(text).then(() => {
      Notify.create({
        message: message || "Successfully coppied to clipboard.",
      });
    });
  },
  errorMessage(key, errors) {
    return this.hasError(key, errors) ? errors[key].join(", ") : "";
  },
  hasError(key, errors) {
    return key in errors;
  },
  getLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  },
};
