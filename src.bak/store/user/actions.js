import Api from '../../services/api'

export function List ({ commit }, playload) {
  return new Promise((resolve, reject) => {
    Api.get('users', playload).then(response => {
      commit('List', response)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
export function Show ({ commit }, playload) {
  return new Promise((resolve, reject) => {
    Api.get('users/' + playload).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
export function Update ({ commit }, playload) {
  return new Promise((resolve, reject) => {
    Api.put('users/' + playload.id, playload).then(response => {
      commit('Edit', response)
      console.log(response)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
