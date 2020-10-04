import core from '../services/core'

export default {
  cache: {},
  init () {
    console.log('api.init()', arguments)
  },
  async call (method, endpoint, data, o) {
    console.func('services/api:request.call()', arguments)
    return new Promise((resolve, reject) => {
      var playload = {
        url: endpoint,
        method: method
      }
      if (method === 'get') {
        playload.params = data
      } else {
        playload.data = data
      }
      core.$axios(playload).then(response => {
        resolve(response.data)
      }).catch((error) => {
        if (error.response && error.response.data) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(error.response.data)
          reject(error.response.data.data ? error.response.data.data : error.response.data)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(error.request)
          reject(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error(error.message)
          reject(error.message)
        }
        // console.log(error.config)
        // console.error(data)
      })
    })
  },
  get (endpoint, data, o) {
    console.func('services/core:request.get()', arguments)
    return new Promise((resolve, reject) => {
      this.call('get', endpoint, data, o).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post (endpoint, data, o) {
    console.func('services/core:request.post()', arguments)
    return new Promise((resolve, reject) => {
      this.call('post', endpoint, data, o).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  put (endpoint, data, o) {
    console.func('services/core:request.put()', arguments)
    return new Promise((resolve, reject) => {
      this.call('put', endpoint, data, o).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete (endpoint, data, o) {
    console.func('services/core:request.delete()', arguments)
    return new Promise((resolve, reject) => {
      this.call('delete', endpoint, data, o).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
