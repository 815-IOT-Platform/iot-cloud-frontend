
const mdmc = {
  state: {
    mdmcRole: '',
    mdmcTab: '',
    mdmcStatus: ''
  },

  mutations: {
    SET_MDMC_ROLE: (state, mdmcRole) => {
      state.mdmcRole = mdmcRole
    },
    SET_MDMC_TAB: (state, mdmcTab) => {
      state.mdmcTab = mdmcTab
    },
    SET_MDMC_Status: (state, mdmcStatus) => {
      state.mdmcTab = mdmcStatus
    }
  },

  actions: {

  }
}

export default mdmc
