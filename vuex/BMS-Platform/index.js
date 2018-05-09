import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  userInfo: [],
  baseUrl: '',
  activePath: '',
  defaultMenu: '',
  password: '',
  logindata: {
    username: '',
    pwd: '',
    unionid: 0,
    ip: '',
    devicetoken: '',
    devicetype: 0
  },
  adminview: 0,
  remoteloading0: false,
  unions: [],
  hospitals: [],
  departments: [],
  commonSection: [],
  clinicalranks: [],
  teachingranks: [],
  educations: [],
  pathologies: []
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
