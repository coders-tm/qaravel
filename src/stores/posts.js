import { defineStore } from "pinia";
import Api from "../services/api";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    rows: [],
    module: {
      name: "Posts",
      singular: "post",
      plural: "posts",
    },
    columns: [
      {
        name: "title",
        align: "left",
        label: "Title",
        field: "title",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "created_at",
        align: "left",
        label: "Date",
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
        route: "Single Post",
        params: (row) => ({ id: row.id }),
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
        label: "Add post",
        permission: "New",
        action: "route",
        params: { id: "add" },
        route: "Single Post",
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
        Api.post("posts", playload)
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
        Api.post("posts/store", playload)
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
        Api.get(`posts/${playload}`)
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
        Api.put(`posts/${playload.id}`, playload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    destroy(playload) {
      return new Promise((resolve, reject) => {
        Api.delete(`posts/${playload}/destroy`)
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
