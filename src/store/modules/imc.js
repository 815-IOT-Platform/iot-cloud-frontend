// import Vue from 'vue'
// import { login,  } from '@/api/login'

const imc = {

  state: {
    curRole: '',
    curTab: ''
  },

  mutations: {
    SET_CUR_ROLE: (state, curRole) => {
      state.curRole = curRole
    },
    SET_CUR_TAB: (state, curTab) => {
      state.curTab = curTab
    }
  },

  actions: {
    // 登录
    // Login ({ commit }, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     login(userInfo).then(response => {
    //       const result = response
    //       Vue.ls.set(ACCESS_TOKEN, result.token, 12 * 60 * 60 * 1000)
    //       commit('SET_TOKEN', result.token)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }

  }
}

export default imc
