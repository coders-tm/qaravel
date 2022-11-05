import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";

const status_options = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Active",
    value: true,
  },
];

export const useLocationStore = defineStore("location", {
  state: () => ({
    rows: [],
    module: {
      name: "Locations",
      singular: "location",
      plural: "locations",
    },
    columns: [
      {
        name: "label",
        align: "left",
        label: "Label",
        field: "label",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "created_at",
        align: "left",
        label: "Created at",
        field: "created_at",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "is_active",
        align: "left",
        label: "Active",
        field: "is_active",
        format: (val) => (val ? "Yes" : "No"),
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
        route: "Single Location",
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
        title: "Status",
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "active",
        placeholder: "Select",
        optionsDense: true,
        style: "width: 150px",
        mapOptions: true,
        emitValue: true,
        options: status_options,
        prefix: "Status:",
        deleted: "all",
        width: "6",
      },
      {
        icon: "fad fa-plus-circle",
        label: "Add location",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Location",
        color: "primary",
        deleted: "all",
        width: "6",
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
        Api.get("locations", playload)
          .then((response) => {
            this.rows = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    options(playload) {
      return new Promise((resolve, reject) => {
        Api.get("locations/options", playload)
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
        Api.post("locations/store", playload)
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
        Api.get(`locations/${playload}`)
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
        Api.put(`locations/${playload.id}`, playload)
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
        Api.delete(`locations/${playload}/destroy`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changeActive(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`locations/${playload.id}/change-active`)
          .then((response) => {
            playload.is_active = !playload.is_active;
            const { message } = response;
            core.success(message);
            resolve(response);
          })
          .catch((error) => {
            core.error(error);
            reject(error);
          });
      });
    },
  },
});
