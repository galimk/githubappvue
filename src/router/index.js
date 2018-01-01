import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/Dashboard'
import RepoDetails from '../components/RepoDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: {template: `<span></span>`}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (!window.localStorage.getItem('accessToken')) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard/:repo_name',
      name: 'DashboardWithRepo',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (!window.localStorage.getItem('accessToken')) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/repo-details/:owner_name/:repo_name',
      name: 'RepoDetails',
      component: RepoDetails,
      beforeEnter: (to, from, next) => {
        if (!window.localStorage.getItem('accessToken')) {
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})
