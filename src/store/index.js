import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import i18n from './modules/i18n'
import permission from './modules/permission'
import getters from './getters'
import imc from './modules/imc'
import mdmc from './modules/mdmc'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    i18n,
    permission,
    imc,
    mdmc
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
