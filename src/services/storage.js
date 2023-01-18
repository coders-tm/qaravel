import { Storage as IonicStorage } from "@ionic/storage";
import core from "./core";

export const STORAGE_RES_KEY = "response-database";
export const STORAGE_REQ_KEY = "request";

export const Storage = new IonicStorage({
  name: STORAGE_RES_KEY,
});

/**
 * Get the value associated with the given key.
 * @param key the key to identify this value
 * @returns Returns a promise with the value of the given key
 */
export const get = async (key) => {
  return Storage.get(key);
};

/**
 * Set the value for the given key.
 * @param key the key to identify this value
 * @param value the value for this key
 * @returns Returns a promise that resolves when the key and value are set
 */
export const set = async (key, value) => {
  return Storage.set(key, value);
};

/**
 * Remove any value associated with this key.
 * @param key the key to identify this value
 * @returns Returns a promise that resolves when the value is removed
 */
export const remove = async (key) => {
  return Storage.remove(key);
};

/**
 * Clear the entire key value store. WARNING: HOT!
 * @returns Returns a promise that resolves when the store is cleared
 */
export const clear = async () => {
  return Storage.clear();
};

/**
 * @returns Returns a promise that resolves with the number of keys stored.
 */
export const length = async () => {
  return Storage.length();
};

/**
 * @returns Returns a promise that resolves with the keys in the store.
 */
export const keys = async () => {
  return Storage.keys();
};

export const setRequest = async (playload) => {
  const { data, url, method, headers } = playload;
  const requests = (await get(STORAGE_REQ_KEY)) || [];

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

  return set(STORAGE_REQ_KEY, requests);
};

export const getUri = (playload) => {
  const { url, params } = playload;
  return core.$axios.getUri({ url, params });
};

export const setResponse = async (playload) => {
  const key = getUri(playload.config);
  const value = await set(key, playload.data);
  return value;
};

export default {
  async init() {
    console.func("storage/core:init()", arguments);
    await Storage.create();
  },
  get,
  set,
  remove,
  clear,
  length,
  keys,
  setRequest,
  setResponse,
  getUri,
};
