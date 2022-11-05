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

export const useClassListStore = defineStore("class-list", {
  state: () => ({
    rows: [],
    module: {
      name: "Classes",
      singular: "class",
      plural: "classes",
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
        name: "capacity",
        align: "left",
        label: "Capacity",
        field: "capacity",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "description",
        align: "left",
        label: "Description",
        field: "description",
        style: "width: 300px; white-space: normal",
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
      {
        name: "has_description",
        align: "left",
        label: "Show Description",
        field: "has_description",
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
        route: "Single Class",
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
        tooltip: "Export as CSV",
        icon: "fas fa-file-csv",
        action: "export",
        color: "primary",
        deleted: "all",
        type: "csv",
        padding: "14px",
      },
      {
        icon: "fad fa-plus-circle",
        label: "Add class",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Class",
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
        Api.get("class-lists", playload)
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
        Api.get("class-lists/options", playload)
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
        Api.post("class-lists/store", playload)
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
        Api.get(`class-lists/${playload}`)
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
        Api.put(`class-lists/${playload.id}`, playload)
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
        Api.delete(`class-lists/${playload}/destroy`)
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
        Api.post(`class-lists/${playload.id}/change-active`)
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
    changeHasDescription(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`class-lists/${playload.id}/change-has-description`)
          .then((response) => {
            playload.has_description = !playload.has_description;
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
