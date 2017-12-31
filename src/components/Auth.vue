<template>
  <div>
    <section class="auth" v-if="!authContext.isAuthenticated">
      <h3>Login to Github {{authContext.isAuthenticated}}</h3>
      <hr/>
      <div class="row">
        <div class="col-md-10">
          <div class="form-group">
            <input type="text" v-model="token" id="token" class="form-control" placeholder="Token"/>
          </div>
        </div>
        <div class="col-md-2">
          <button type="button" @click="validateToken(token)" :disabled="token == null || token.length === 0"
                  class="btn btn-primary">Authenticate
          </button>
        </div>
      </div>
      <div v-if="authContext.invalidToken" class="row">
        <div class="col-md-12">
          <span class="error">Invalid token. Try again!</span>
        </div>
      </div>
    </section>
    <section v-if="authContext.isAuthenticated">
      <div class="row">
        <div class="col-md-10">
          <h3>Github user: {{authContext.userName}}</h3>
        </div>
        <div class="col-md-2">
          <button type="button" @click="clearTokenAndLogOut" class="btn btn-primary logout-button pull-right">
            Logout
          </button>
        </div>
      </div>
      <hr/>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'auth',
    data () {
      return {
        token: ''
      }
    },
    computed: {
      ...mapGetters(['authContext'])
    },
    methods: {
      ...mapActions([
        'validateToken',
        'logOut'
      ]),

      clearTokenAndLogOut () {
        this.token = null
        this.logOut()
      }
    }
  }
</script>

<style scoped>
  .auth button {
    width: 100%;
  }

  .logout-button {
    margin-top: 15px;
  }


</style>
