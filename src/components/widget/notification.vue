<template>
  <q-item v-close-popup clickable v-ripple>
    <q-item-section avatar>
      <avatar :user="notification.user" size="40px"/>
    </q-item-section>

    <q-item-section>
      <q-item-label caption class="text-p15" v-html="notification.content" />
      <q-item-label caption class="text-p12 text-grey-8" >{{notification.time}}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    notification: {
      required: true,
      type: Object
    }
  }
}
</script>
