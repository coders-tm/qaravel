import { defineStore } from "pinia";
import Api from "../services/api";
import core from "../services/core";

export const useAnnouncementStore = defineStore("announcement", {
  state: () => ({
    rows: [],
    module: {
      name: "Announcements",
      singular: "announcement",
      plural: "announcements",
    },
    columns: [
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date_formated",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "open_at",
        align: "left",
        label: "Open at",
        field: (row) => (row.is_closed ? "-" : row.open_at_formated),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "close_at",
        align: "left",
        label: "Close at",
        field: (row) => (row.is_closed ? "-" : row.close_at_formated),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "note",
        align: "left",
        label: "Note",
        field: "note",
        style: "width: 250px; white-space: normal",
        sortable: false,
      },
      {
        name: "created_at",
        align: "left",
        label: "Created at",
        field: "created_at",
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
        route: "Single Announcement",
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
        label: "Add announcement",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Announcement",
        color: "primary",
        deleted: "all",
        width: "12",
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
        Api.get("announcements", playload)
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
        Api.post("announcements/store", playload)
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
        Api.get(`announcements/${playload}`)
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
        Api.put(`announcements/${playload.id}`, playload)
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
        Api.delete(`announcements/${playload}/destroy`)
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
