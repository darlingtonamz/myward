<template>
  <div>
    <div>
      <center>
        <v-avatar color="teal">
          <span class="white--text headline">C</span>
        </v-avatar>
        <div>{{school.name}}</div>
        <div>{{school.category || school.description}}</div>
      </center>
      <!-- <form @submit.prevent="submit">
        <input type="text" v-model="newSchool.name" required>
        <button type="submit">Submit</button>

      </form> -->
      <v-card color="" class="">
        <v-toolbar color="elevation-0">
          <v-btn flat icon color="" @click="goto('/schools')">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span>Levels</span>
          <v-spacer></v-spacer>          
          <v-btn color="transparent elevation-0">
            ADD LEVEL
          </v-btn>
          <v-menu
          v-model="showMenu"
          absolute
          offset-y
          style="max-width: 600px">
            <v-btn flat icon color=""
            slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile
              v-for="(item, index) in menuItems"
              :key="index"
              @click="">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <div>
        </div>
        <v-container>
          list
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    showMenu: false,
    menuItems: [
      {
        title: "Delete"
      }
    ]
  }),
  computed: {
    ...mapGetters({
      school: 'schools/current'
    })
  },
  methods: {
    ...mapActions({
      delete: 'schools/delete',
    }),
    goto(path){
      this.$router.push(path)
    },
    deleteSchool() {
      this.delete(this.school.id)
      .then((result) => {
        this.goto('/schools')
      }).catch((err) => {
        console.log('Failed to delete school')
      });
    },
  },
  created() {
    this.$store.dispatch('schools/show', this.$route.params.id)
  }
}
</script>

<style>

</style>
