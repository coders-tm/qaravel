import { defineStore } from "pinia";
import Api from "../services/api";

export const useGroupStore = defineStore("group", {
  state: () => ({
    rows: [],
    module: {
      name: "Groups",
      singular: "group",
      plural: "groups",
    },
    columns: [
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "description",
        align: "left",
        label: "Description",
        field: "description",
        style: "width: 40px",
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: [
      {
        label: "Edit",
        permission: "Edit",
        action: "route",
        route: "Single Group",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: "Delete",
        permission: "Delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: "Restore",
        permission: "Delete",
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
      },
    ],
    toolbar: [
      {
        icon: "fad fa-plus-circle",
        label: "Add group",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Group",
        color: "primary",
        deleted: "all",
      },
    ],
    filters: [],
  }),
  getters: {
    //
  },
  actions: {
    get(playload) {
      return new Promise((resolve, reject) => {
        Api.get("groups", playload)
          .then((response) => {
            this.rows = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    store(playload) {
      return new Promise((resolve, reject) => {
        Api.post("groups/store", playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    show(playload) {
      return new Promise((resolve, reject) => {
        Api.get(`groups/${playload}`)
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
        Api.put(`groups/${playload.id}`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    delete(playload) {
      return new Promise((resolve, reject) => {
        Api.delete(`groups/${playload}/destroy`)
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
