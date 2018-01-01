<template>
  <section>
    <div class="row">
      <div class="col-md-12">
        <button value="Back" class="btn btn-default pull-right" type="button" @click="goBack()">Back</button>
      </div>
    </div>
    <div class="row" v-if="repoDetails">
      <div class="col-md-12">
        <h3 class="pull-left" v-if="repoDetails.repo">{{ repoDetails.repo.name }}</h3>
        <h3 class="pull-right" v-if="repoDetails.repo">Issues Count: ({{ repoDetails.repo.open_issues }})</h3>
        <div class="clearfix" v-if="repoDetails.repo"></div>
        <hr>
        <h4 v-if="repoDetails.repo">{{ repoDetails.repo.description }}</h4>
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-md-4">
        <table class="table table-striped">
          <thead>
          <th>Stargazers</th>
          </thead>
          <tbody>
          <tr v-for="starGazer of repoDetails.stargazers">
            <td><img :src="starGazer.avatar_url"> {{ starGazer.login }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'repo-details',
    mounted () {
      this.getRepoDetails({
        ownerName: this.$route.params.owner_name,
        repoName: this.$route.params.repo_name
      })
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['repoDetails'])
    },

    methods: {
      ...mapActions([
        'getRepoDetails'
      ]),
      goBack: () => {
        window.history.back()
      }
    }

  }
</script>

<style scoped>
  img {
    width:50px;
    height:50px;
  }
</style>
