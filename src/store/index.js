import Vuex from 'vuex'
import Vue from 'vue'
import GithubStore from './GithubStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    GithubStore
  }
})
