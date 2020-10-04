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
  },
  watch: {
    $route (to, from) {
      this.title = to.name
    }
  },
  computed: {
    title: {
      get () {
        return this.$route.name
      },
      set (val) {
        return val
      }
    }
  },
  meta () {
    return {
      // sets document title
      title: this.title,
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: title => `${title} | ${process.env.APP_NAME}`,

      // <noscript> tags
      noscript: {
        default: 'This is content for browsers with no JS (or disabled JS)'
      }
    }
  }
}
</script>
