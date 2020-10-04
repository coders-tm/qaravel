<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { QSpinnerCube } from 'quasar'

export default {
  methods: {
    ...mapActions('app', ['User']),
    onReady () {
      this.$q.loading.show({
        spinner: QSpinnerCube,
        spinnerColor: 'orange',
        spinnerSize: 80,
        backgroundColor: 'white'
      })
      this.User().then(response => {
        this.$q.loading.hide()
      }).catch(() => {
        this.$q.loading.hide()
        if (this.$route.meta.auth) {
          this.$router.push({ name: 'Login' })
        }
      })
    }
  },
  mounted () {
    this.onReady()
  }
}
</script>
