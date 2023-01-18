import { Storage as IonicStorage } from "@ionic/storage";
import core from "./core";

export const STORAGE_REQ_KEY = "request_database";

export const Storage = new IonicStorage();

export const setRequest = async (playload) => {
  const { data, url, method, headers } = playload;
  const requests = (await Storage.get(STORAGE_REQ_KEY)) || [];

  core.warning(
    "It will be synced with server when you will get back to online.",
    {
      title: "Data stored in offline!",
    }
  );

  requests.push({
    config: { data, url, method, headers },
    time: new Date().getTime(),
    id: core.uid(),
  });

  return Storage.set(STORAGE_REQ_KEY, requests);
};

export default {
  async init() {
    console.func("storage/core:init()", arguments);
    await Storage.create();
  },
  setRequest,
  Storage,
};
