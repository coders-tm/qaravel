<template>
  <q-chip
    dense
    :class="{ status: true, multiple: multiple }"
    :style="{
      background: changeAlpha(color, 0.3),
    }"
    size="12px"
    :ripple="false"
  >
    <q-icon
      :style="{
        color: changeAlpha(color, 0.99),
      }"
      :name="icon"
    />
    {{ type }}
  </q-chip>
</template>

<script>
import { colors } from "quasar";
const { getPaletteColor, changeAlpha } = colors;

export default {
  props: {
    type: {
      required: true,
      type: String,
    },
    multiple: Boolean,
  },
  data() {
    return {
      changeAlpha,
    };
  },
  computed: {
    color() {
      let color = getPaletteColor("grey");
      switch (this.type) {
        case "Active":
        case "Enabled":
        case "Online":
        case "Returned":
        case "Completed":
        case "Resolved":
        case "Paid":
          color = getPaletteColor("positive");
          break;
        case "Ongoing":
        case "Partially received":
          color = getPaletteColor("teal-3");
          break;
        case "Draft":
          color = getPaletteColor("grey");
          break;
        case "Pending":
        case "In progress":
        case "Scheduled":
          color = getPaletteColor("warning");
          break;
        case "Rejected":
        case "Cancelled":
        case "Failed":
        case "Disable":
        case "Disabled":
        case "Expired":
        case "Deactive":
          color = getPaletteColor("negative");
          break;
      }
      return color;
    },
    icon() {
      let icon = "fas fa-circle";
      switch (this.type) {
        case "Active":
        case "Enabled":
        case "Online":
        case "Completed":
          icon = "fas fa-check-circle";
          break;
        case "Partially received":
          icon = "fas fa-sort-circle-down";
          break;
        case "Paid":
          icon = "fas fa-usd-circle";
          break;
        case "Draft":
          icon = "fas fa-draw-circle";
          break;
        case "Pending":
        case "Scheduled":
        case "Open":
          icon = "fas fa-dot-circle";
          break;
        case "Rejected":
        case "Cancelled":
        case "Failed":
        case "Disable":
        case "Disabled":
        case "Expired":
          icon = "fas fa-exclamation-circle";
          break;
      }
      return icon;
    },
  },
};
</script>
<style lang="sass">
.status
  .q-icon
    font-size: .8em
    margin-right: .3em
</style>
