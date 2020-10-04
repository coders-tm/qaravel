<template>
  <q-expansion-item
    v-if="sub_link"
    v-model="active"
    expand-separator
    :icon="icon"
    :label="title"
    header-class="text-white"
    expand-icon-class="text-white"
    active-class="bg-primary"
    @click="active = !active"
    :to="route"
  >
    <q-item v-for="(item, index) in sub_link" :key="index"
      clickable
      tag="a"
      :to="{ name: item.route }"
      class="text-white"
      active-class="bg-heather text-black"
    >
      <q-item-section avatar style="min-width: auto" class="q-pr-md">
        <q-icon :name="item.icon"></q-icon>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
  <q-item
    v-else
    clickable
    tag="a"
    :to="{ name: route }"
    class="text-white"
    active-class="bg-primary"
  >
    <q-item-section avatar style="min-width: auto" class="q-pr-md">
      <q-icon :name="icon"></q-icon>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    route: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    sub_link: {
      title: {
        type: String,
        required: true
      },

      route: {
        type: String,
        default: ''
      },

      icon: {
        type: String,
        default: ''
      }
    }
  },
  data () {
    return {
      active: false
    }
  }
}
</script>
<style>
  .q-expansion-item .q-item__section--avatar {min-width: auto;}
</style>
