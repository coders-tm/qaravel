<template>
  <base-table
    class="opening-times"
    hide-top
    hide-pagination
    :rows-per-page-options="[0]"
    :columns="columns"
    :rows="options"
    :loaded="loaded"
  >
    <template v-slot:body-cell-open_at="props">
      <base-time-input v-model="props.row.open_at" />
    </template>
    <template v-slot:body-cell-close_at="props">
      <base-time-input v-model="props.row.close_at" />
    </template>
  </base-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          name: "name",
          align: "left",
          label: "Day",
          field: "name",
        },
        {
          name: "open_at",
          align: "left",
          label: "Open at",
          field: "open_at",
        },
        {
          name: "close_at",
          align: "left",
          label: "Close at",
          field: "close_at",
        },
      ],
    },
    options: Array,
    loaded: Boolean,
  },
};
</script>
