export function List (state, playload) {
  state.data = playload
}
export function Push (state, playload) {
  state.data.push(playload)
}
export function Add (state, playload) {
  state.data.unshift(playload)
}
export function Edit (state, payload) {
  console.log('commitEdit', payload)
  // const item = state.data.find(item => item.id === payload.id)
  // Object.assign(item, payload)
}
export function Delete (state, playload) {
  state.data.splice(playload)
}
export function Active (state, payload) {
  const data = state.data.find(item => item.id === payload.id)
  data.active = !data.active
}
