import axios from 'axios'
import core from '../services/core'
import api from '../services/api'
import { colors } from 'quasar'
import _ from 'lodash'

// "async" is optional
export default async ({
  Vue,
  store
}) => {
  console.core(`Loading ${process.env.APP_NAME} services`)

  //    Vue prototypes setup    //
  Vue.prototype.$core = core
  Vue.prototype.$api = api
  Vue.prototype.$user = store.state.app.user
  Vue.prototype.$_ = _
  Vue.prototype.$colors = colors

  //    axios setup    //
  axios.defaults.baseURL = process.env.API_URL
  axios.defaults.withCredentials = true

  //    core prototypes setup    //
  core.$axios = axios
  core.Vue = new Vue()
  core.store = store

  console.core((process.env.DEV ? 'Development' : 'Production'))

  //    call and wait for initial setuo    //
  await core.init()
}
