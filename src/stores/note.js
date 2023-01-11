import { defineStore } from "pinia";
import Api from "../services/api";

export const useNoteStore = defineStore("note", {
  state: () => ({
    rows: [],
  }),
  actions: {
    delete(playload) {
      return new Promise((resolve, reject) => {
        Api.delete(`logs/${playload}/destroy`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    update(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`logs/${playload.id}`, playload)
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
