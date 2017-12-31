<template>
  <div v-if="authContext.isAuthenticated">

  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'dashboard',
    mounted () {
      this.$store.watch(state => {
        this.loadOrgsInternal(state.GithubStore.authContext.isAuthenticated)
      })
    },
    data () {
      return {
        isAuthenticatedComponent: false
      }
    },
    computed: {
      ...mapGetters(['orgs', 'authContext'])
    },
    methods: {
      ...mapActions([
        'loadOrgs'
      ]),

      loadOrgsInternal (isAuthenticated) {
        if (isAuthenticated) {
          this.loadOrgs();
        }
      }
    }
  }
</script>

<style scoped>

</style>
