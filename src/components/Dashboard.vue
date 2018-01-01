<script src="../store/GithubStore.js"></script>
<template>
  <div class="row">


    <div class="col-md-4">
      <h4>
        Organizations <span v-if="orgs.loading">(loading...)</span>
      </h4>
      <hr/>
      <div class="items-container">
        <table class="table table-striped">
          <tbody>
          <tr v-for="org in orgs.items">
            <td>
              {{org.login}}
            </td>
            <td>
              <router-link :to="{ name: 'DashboardWithRepo', params: { repo_name: org.login } }">Details</router-link>
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colSpan="2" v-if="orgs.lastSeenId !== null">
              <a @click="loadOrgs()">Show more...</a>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <div class="col-md-4">
      <h4>
        Repositories <span v-if="repos.loading">(loading...)</span>
      </h4>
      <hr/>
      <div class="items-container">
        <table class="table table-striped">
          <tbody>
          <tr v-for="repo in repos.items">
            <td>
              {{repo.name}}
            </td>
            <td>
              <router-link
                :to="{ name: 'RepoDetails', params: { repo_name: repo.name, owner_name: repo.owner.login } }">Details
              </router-link>
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colSpan="2" v-if="repos.lastPage !== null">
              <a @click="loadRepos()">Show more...</a>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>


    <div class="col-md-4">
      <h4>
        Members <span v-if="members.loading">(loading...)</span>
      </h4>
      <hr/>
      <div class="items-container">
        <table class="table table-striped">
          <tbody>
          <tr v-for="member in members.items">
            <td colspan="2">
               <img :src="member.avatar_url" /> {{member.login}}
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colSpan="2" v-if="members.lastPage !== null">
              <a @click="loadMembers()">Show more...</a>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>


  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'dashboard',
    mounted () {
      this.loadOrgs()

      if (this.selectedOrg !== null) {
        this.loadMembers()
        this.loadRepos()
      }

      if (this.$route.params.repo_name) {
        this.switchOrg(this.$route.params.repo_name)
      }
    },
    data () {
      return {
        selectedOrgInternal: null
      }
    },
    computed: {
      ...mapGetters(['orgs', 'authContext', 'getSelectedOrg', 'repos', 'members'])
    },
    watch: {
      '$route': 'routeChanged',
      'getSelectedOrg': 'orgChanged'
    },
    methods: {
      ...mapActions([
        'loadOrgs', 'switchOrg', 'loadMembers', 'loadRepos'
      ]),

      orgChanged () {
        this.loadMembers()
        this.loadRepos()
      },

      routeChanged () {
        this.switchOrg(this.$route.params.repo_name)
      }
    }
  }
</script>

<style scoped>
  .items-container {
    max-height: 800px;
    overflow-y: auto;
  }

  img {
    width: 50px;
    height: 50px;
  }

  a {
    cursor: pointer;
  }
</style>
