<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <a href="#" class="navbar-brand">Auth0 with Vue and Vuex Example</a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <button v-if="!authenticated" class="btn btn-primary" @click='login()'>Sign In</button>
          <a v-if="authenticated" href="/" class='nav-link' @click='logout()'>Log Out</a>
        </li>
      </ul>
    </nav>
    Home 
    <span><router-link to="/wards">Wards</router-link></span>
    <span><router-link to="/schools">Schools</router-link></span>
    <div v-if="authenticated">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions(['login', 'logout']),
  },
  computed: mapGetters(['authenticated']),
  created() {
    // this.$store.dispatch('schools/index')
  }
}
</script>

<style>

</style>
