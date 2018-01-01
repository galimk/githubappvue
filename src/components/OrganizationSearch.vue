<template>
  <section class="search-panel">
    <h4>Search organization</h4>
    <div>
      <div class="form-group left">
        <input type="organization" v-model="organizationName" class="form-control search-box" id="organization"
               placeholder="Organization Name">
      </div>
      <button class="btn btn-primary search-button" @click.prevent="searchOrg(organizationName)"
              :disabled="organizationName == null || organizationName.length === 0">Search
      </button>
      <div class="clearfix"></div>
    </div>
    <div v-if="orgSearchInvalid">
      <div class="error">Invalid organization. Try again!</div>
    </div>
  </section>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'organization-search',
    mounted () {
    },
    data () {
      return {
        organizationName: null
      }
    },
    computed: {
      ...mapGetters(['orgSearchInvalid'])
    },

    methods: {
      ...mapActions([
        'searchOrg'
      ])
    }
  }
</script>
<style scoped>

  .error {
    margin-top:10px;
  }

  .search-box {
    float: left;
    width: 270px;
  }

  .search-button {
    float: right;
    width: 85px;
  }

  .search-panel {
    margin-bottom: 25px;
  }
</style>
