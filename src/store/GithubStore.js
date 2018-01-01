import request from 'superagent'

const state = {
  authContext: {
    isAuthenticated: window.localStorage.getItem('userName') != null,
    accessToken: window.localStorage.getItem('accessToken'),
    userName: window.localStorage.getItem('userName'),
    invalidToken: false
  },

  orgs: {
    lastSeenId: null,
    items: [],
    loading: false,
    lastPage: null
  },

  members: {
    lastPage: 1,
    items: [],
    loading: false,
    lastSeenId: null
  },

  repos: {
    lastPage: 1,
    items: [],
    loading: false,
    lastSeenId: null
  },

  selectedOrg: null,
  orgSearchInvalid: false,
  switchToOrg: null,
  repo: null,
  stargazers: []
}

const GithubBaseUri = 'https://api.github.com/'

const fetchGitHubData = (endpoint, param, commit, actionName, byPage) => {
  commit(`${actionName}_init`)
  let getUri = byPage ? `${GithubBaseUri}${endpoint}?page=${param}`
    : (param ? `${GithubBaseUri}${endpoint}?since=${param}` : `${GithubBaseUri}${endpoint}`)

  return request.get(getUri).end((err, res) => {
    if (err) {
      commit(`${actionName}_failure`)
    } else {
      let data = JSON.parse(res.text)
      commit(`${actionName}_success`, data)
    }
  })
}

const actions = {
  validateToken ({commit}, token) {
    return new Promise((resolve, reject) => {
      return request.get(`${GithubBaseUri}?access_token=${token}`).end((err) => {
        if (!err) {
          request.get(`${GithubBaseUri}user?access_token=${token}`).end((err2, res2) => {
            if (!err2) {
              let data = JSON.parse(res2.text)
              commit('set_user', {userName: data.login, accessToken: token})
              resolve()
            } else {
              commit('token_invalid')
              reject(new Error('invalid token'))
            }
          })
        } else {
          commit('token_invalid')
          reject(new Error('invalid token'))
        }
      })
    })
  },
  loadOrgs ({commit, state}) {
    fetchGitHubData('organizations', state.orgs.lastSeenId, commit, 'load_orgs', false)
  },
  loadRepos ({commit, state}) {
    fetchGitHubData(`orgs/${state.selectedOrg}/repos`, state.repos.lastPage, commit, 'load_repos', true)
  },
  loadMembers ({commit, state}) {
    fetchGitHubData(`orgs/${state.selectedOrg}/members`, state.members.lastPage, commit, 'load_members', true)
  },
  switchOrg ({commit}, org) {
    commit('switch_org', org)
  },
  logOut ({commit}) {
    commit('log_out')
  }
}

const mutations = {
  token_invalid (state) {
    state.authContext.isAuthenticated = false
    state.authContext.invalidToken = true
  },

  switch_org (state, org) {
    state.repos.items = []
    state.repos.lastPage = 1
    state.members.items = []
    state.members.lastPage = 1
    state.selectedOrg = org
  },

  set_user (state, user) {
    state.authContext.userName = user.userName
    state.authContext.accessToken = user.accessToken
    state.authContext.isAuthenticated = true
    state.authContext.invalidToken = false
    window.localStorage.setItem('accessToken', user.accessToken)
    window.localStorage.setItem('userName', user.userName)
  },

  log_out (state) {
    state.authContext.isAuthenticated = false
    state.authContext.accessToken = null
    state.authContext.userName = null
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('userName')
  },

  load_orgs_success (state, data) {
    for (let item of data) {
      state.orgs.items.push(item)
    }
    state.orgs.lastSeenId = data.length === 30 ? data[data.length - 1].id : null
    state.orgs.loading = false
  },

  load_repos_success (state, data) {
    for (let item of data) {
      state.repos.items.push(item)
    }
    state.repos.lastPage = data.length == 30 ? state.repos.lastPage + 1 : null;
    state.repos.loading = false
  },


  load_members_success (state, data) {
    for (let item of data) {
      state.members.items.push(item)
    }
    state.members.lastPage = data.length == 30 ? state.members.lastPage + 1 : null;
    state.members.loading = false
  },

  load_repos_failure () {
    state.repos.loading = false;
  },

  load_members_failure () {
    state.members.loading = false;
  },

  load_repos_init () {
    state.repos.loading = true;
  },

  load_members_init () {
    state.members.loading = true;
  },

  load_orgs_failure () {
    state.orgs.loading = false
  },

  load_orgs_init () {
    state.orgs.loading = true
  }
}

const getters = {
  authContext (state) {
    return state.authContext
  },

  orgs (state) {
    return state.orgs
  },

  getSelectedOrg () {
    return state.selectedOrg
  },

  repos (state) {
    return state.repos
  },

  members (state) {
    return state.members
  }
}

export default {
  state, actions, mutations, getters
}
