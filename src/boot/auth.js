export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const authenticated = store.state.app.authenticated
    const auth = to.meta.auth
    if (auth && authenticated) {
      next()
    } else if (auth && !authenticated) {
      next({ name: 'Login', params: { to: to } })
    } else {
      next()
    }
  })
  router.beforeResolve((to, from, next) => {
    const module = to.meta.module
    if (module) {
      if (store.getters['app/hasPermission'](module)) {
        console.log('hasPermission', store.getters['app/hasPermission'](module))
        next()
      } else {
        next({ name: 'Dashboard' })
      }
    } else {
      next()
    }
  })
}
