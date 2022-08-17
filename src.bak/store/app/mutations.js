export function currentUser (state, playload) {
  state.user = playload
}
export function Authenticated (state, playload) {
  state.authenticated = playload
}

export function getItems (state, playload) {
  state.items = playload
}

export function updateProduct (state, payload) {
  const item = state.products.find(item => item.id === payload.id)
  Object.assign(item, payload)
}

export function deleteProduct (state, payload) {
  const index = state.products.findIndex(item => item.id === payload.id)
  if (index !== -1) state.products.splice(index, 1)
  console.log('state.products', state.products)
}

export function popularProducts (state, playload) {
  state.popularProducts = playload
}

export function getMenus (state, playload) {
  state.menus = playload
}
