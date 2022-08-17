export function hasPermission (state) {
  console.func('store/app/getters:hasPermission()', arguments)
  return module => {
    if (state.user.permissions) {
      if (state.user.permissions.find(item => item.module === module)) {
        return true
      }
      return false
    }
    return false
  }
}
