<template>
  <base-section no-row>
    <div>
      <div class="text-h5">Dashboard</div>
      <div class="sub-title">
        This page is blank, content is currently being developed.
      </div>
    </div>
  </base-section>
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
