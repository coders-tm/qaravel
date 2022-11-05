import { defineStore } from "pinia";
import Api from "../services/api";

export const useMemberReportStore = defineStore("member-report", {
  state: () => ({
    module: {
      name: "Member reports",
      singular: "member report",
      plural: "member reports",
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
        name: "phone",
        align: "left",
        label: "Phone",
        field: "phone",
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
        name: "status",
        align: "left",
        label: "Status",
        field: "status",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "hourspw",
        align: "left",
        label: "Hours",
        field: "hourspw",
        format: (val) => core.money(val),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "rentpw",
        align: "left",
        label: "Rent",
        field: "rentpw",
        format: (val) => core.money(val),
        style: "width: 40px",
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
  }),
  getters: {
    //
  },
  actions: {
    get(playload) {
      return new Promise((resolve, reject) => {
        Api.get("users/reports", playload)
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
