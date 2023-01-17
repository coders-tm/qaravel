import { Storage as IonicStorage } from "@ionic/storage";

export const Storage = new IonicStorage();

export default {
  async init() {
    console.func("storage/core:init()", arguments);
    await Storage.create();
  },
  Storage,
};
