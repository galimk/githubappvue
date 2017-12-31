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
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/:repo_name',
      name: 'DashboardWithRepo',
      component: Dashboard
    },
    {
      path: '/repo-details/:owner_name/:repo_name',
      name: 'RepoDetails',
      component: RepoDetails
    }
  ]
})
