<template>
  <q-avatar
    class="base-avatar-widget"
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
      <q-badge v-if="user.status" color="transparent" floating>
        <q-icon
          dense
          round
          name="brightness_1"
          :color="user.status == 'online' ? 'positive' : 'grey'"
          size="10px"
        />
      </q-badge>
    </template>
    <template v-else-if="user.name">
      <span>{{ user.name.charAt(0) }}</span>
      <q-badge v-if="user.status" color="transparent" floating>
        <q-icon
          dense
          round
          name="brightness_1"
          :color="user.status == 'online' ? 'positive' : 'grey'"
          size="10px"
        />
      </q-badge>
    </template>
    <template v-else-if="user.company_name">
      <span>{{ user.company_name.charAt(0) }}</span>
      <q-badge v-if="user.status" color="transparent" floating>
        <q-icon
          dense
          round
          name="brightness_1"
          :color="user.status == 'online' ? 'positive' : 'grey'"
          size="10px"
        />
      </q-badge>
    </template>
    <base-tooltip-widget v-if="tooltip" position="top">{{
      user.name
    }}</base-tooltip-widget>
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
};
</script>
