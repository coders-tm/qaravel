import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";

export const useStaffStore = defineStore("staff", {
  state: () => ({
    rows: [],
    module: {
      name: "Staff",
      singular: "staff",
      plural: "staff",
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
        name: "email",
        align: "left",
        label: "Email",
        field: "email",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "last_login",
        align: "left",
        label: "Last login",
        field: "last_login",
        format: (val) => (val ? val.date_time : null),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "groups",
        align: "left",
        label: "Groups",
        field: "groups",
        format: (val) => (val ? val.map((item) => item.name).toString() : null),
        style: "width: 40px",
        sortable: false,
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
        name: "is_supper_admin",
        align: "left",
        label: "Admin",
        field: "is_supper_admin",
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
        route: "Single Staff",
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
        label: "Add staff",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Staff",
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
        Api.get("admins", playload)
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
        Api.post("admins/store", playload)
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
        Api.get(`admins/${playload}`)
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
        Api.put(`admins/${playload.id}`, playload)
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
        Api.delete(`admins/${playload}/destroy`)
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
        Api.post(`admins/${playload.id}/change-active`)
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
    changeAdmin(playload) {
      return new Promise((resolve, reject) => {
        Api.post(`admins/${playload.id}/change-admin`)
          .then((response) => {
            playload.is_supper_admin = !playload.is_supper_admin;
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
