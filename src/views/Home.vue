<template>
  <v-app>
    <v-container>

      <v-toolbar app color="elevation-0">
        <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
        
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <button v-if="!authenticated" class="btn btn-primary" @click='login()'>Sign In</button>
            <!-- <a v-if="authenticated" href="/" class='nav-link' @click='logout()'>Log Out</a> -->
        <!-- <v-avatar color="teal" size="36px">
          <span class="white--text headline">C</span>
        </v-avatar> -->
        <v-menu
        v-if="authenticated" 
        v-model="showMenu"
        absolute
        offset-y
        style="max-width: 600px">
          <!-- <v-btn flat icon color=""
          slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn> -->
          <v-avatar color="teal" size="36px"
          slot="activator">
            <span class="white--text headline">C</span>
          </v-avatar>

          <v-list>
            <v-list-tile
            :key="0"
            @click='logout()'>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        
      </v-toolbar>
      <v-content>
        <v-tabs
          v-model="activeTab"
          color="transparent"
          dark
          slider-color="yellow">
          <v-tab
            v-for="(tab, pos) in tabs"
            :key="pos"
            ripple @click="goto(tab.path)">
              {{tab.name}}
          </v-tab>
          <v-tab-item
            v-for="n in 3"
            :key="n">
          </v-tab-item>
        </v-tabs>
        <!-- <span><router-link to="/wards">Wards</router-link></span>
        <span><router-link to="/schools">Schools</router-link></span> -->
        <router-view v-if="authenticated"></router-view>
        <!-- <HelloWorld/> -->
      </v-content>
      <v-footer :fixed="fixed" app>
        <span>Amanze &copy; 2018</span>
      </v-footer>
      <!-- <Snackbar ref="snackbar"/> -->
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    title: "Home",
    showMenu: false,
    tabs: [
      {
        name: "Wards",
        path: "/wards"
      }, 
      {
        name: "Schools",
        path: "/schools"
      }
    ],
    activeTab: 0,
    fixed: true
  }),
  methods: {
    ...mapActions(['login', 'logout']),
    goto(path) {
      this.$router.push(path)
    }
  },
  computed: mapGetters(['authenticated']),
  created() {
    // this.$store.dispatch('schools/index')
    this.tabs.forEach((value, pos) => {
      if (this.$route.path.endsWith(value.path)) {
        this.activeTab = pos
      }
    })
  }
}
</script>

<style lang="scss">
@import url('../assets/scss/_variables.scss');
$primary: #30A3CE;
$secondary: #0090C4;
#app {
  background-color: $primary; // for old browsers
  background-image: linear-gradient(to bottom right, $primary, $secondary);
  color: rgba(255, 255, 255, 0.8) !important
}
nav {
  background: transparent !important;
}
footer {
  background: $primary !important;
  color: rgba(255, 255, 255, 0.8) !important
}
</style>
