<template>
  <q-avatar
    class="base-avatar"
    :rounded="rounded"
    :size="size"
    :style="{
      background: user.calendar_color
        ? user.calendar_color
        : 'var(--q-secondary)',
    }"
    text-color="white"
  >
    <template v-if="user.avatar">
      <img :src="user.avatar.url" />
      <q-badge
        v-if="['online', 'offline'].includes(user.status)"
        color="transparent"
        floating
      >
        <q-icon
          dense
          round
          name="brightness_1"
          :color="user.status == 'online' ? 'positive' : 'grey'"
          size="10px"
        />
      </q-badge>
    </template>
    <template v-else-if="user.name || user.company_name">
      <span>{{ letters }}</span>
      <q-badge
        v-if="['online', 'offline'].includes(user.status)"
        color="transparent"
        floating
      >
        <q-icon
          dense
          round
          name="brightness_1"
          :color="user.status == 'online' ? 'positive' : 'grey'"
          size="10px"
        />
      </q-badge>
    </template>
    <base-tooltip v-if="tooltip" position="top">{{ user.name }}</base-tooltip>
  </q-avatar>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object,
    },
    size: {
      required: false,
      type: String,
      default: "60px",
    },
    tooltip: Boolean,
    rounded: Boolean,
  },
  computed: {
    letters() {
      return (this.user.name || this.user.company_name)
        .split(" ")
        .map((item) => item.charAt(0))
        .join("");
    },
  },
};
</script>
