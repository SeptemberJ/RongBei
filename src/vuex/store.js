import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { Notification } from 'element-ui'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  userName: null,
  userId: null,
  pathName: null,
  btLoading: false,
  menuIdx: '2',
  moduleIdx: 2,
  imgPreUrl: 'http://ep23767307.qicp.vip:31379/upload/'
}
// actions dispatch触发
const actions = {
  unitUserInfo ({commit, state}, INFO) {
    commit('setUserInfo', INFO)
  },
  changePath ({commit, state}, PATH) {
    commit('setPath', PATH)
  },
  toggleLoadingBt ({commit, state}, STATUS) {
    commit('setLoadingBt', STATUS)
  },
  changeMenuIdx ({commit, state}, IDX) {
    commit('setMenu', IDX)
  },
  changeModuleIdx ({commit, state}, IDX) {
    commit('setModuleIdx', IDX)
  },
  showNotice ({commit, state}, overDateStr) {
    Notification.closeAll()
    Notification({
      title: '提示',
      message: '请及时修改如下证件的有效期： ' + overDateStr,
      offset: 50,
      type: 'warning',
      duration: 0
    })
  },
  hideNotice  ({commit, state}) {
    Notification.closeAll()
  }
}

const mutations = {
  setUserInfo (state, INFO) {
    state.userName = INFO.name
    state.userId = INFO.id
  },
  setPath (state, PATH) {
    state.pathName = PATH
  },
  setLoadingBt (state, STATUS) {
    state.btLoading = STATUS
  },
  setMenu (state, IDX) {
    state.menuIdx = IDX
  },
  setModuleIdx (state, IDX) {
    state.moduleIdx = IDX
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  // getters,
  actions,
  mutations,
  // strict: debug,
  plugins: [vuexLocal.plugin]
  // plugins: debug ? [createLogger()] : []
})
