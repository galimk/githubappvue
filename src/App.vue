<template>
  <div id="app" class="container">
    <auth></auth>
    <router-view/>
  </div>
</template>

<script>
import auth from './components/Auth'

export default {
  name: 'app',
  components: {
    auth
  }
}
</script>

<style>
  .error {
    color: red;
  }
</style>
