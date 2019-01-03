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
      <LevelsIndex :school="school"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LevelsIndex from './levels/Index'
export default {
  components: {LevelsIndex},
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
