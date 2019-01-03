<template>
  <div>
    <div>
      <div v-if="isRootPath">
        <v-toolbar color="elevation-0">
          <v-spacer></v-spacer>
            <v-btn color="whitefade elevation-0" @click="goto('/schools/new')">ADD SCHOOL</v-btn>
        </v-toolbar>
        <v-list color="transparent">
          <v-list-tile
            v-for="(school, pos) in schools" :key="pos"
            avatar
            @click="goto('/schools/' + school.id, school)">
            <v-list-tile-avatar color="teal" >
              {{school.name ? school.name[0].toUpperCase() : ''}}
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ school.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ school.category || school.description || 'No description' }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
      <div v-if="!isRootPath">
        <router-view></router-view>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data: () => ({
  }),
  methods: {
    ...mapActions({
      create: 'schools/create',
      delete: 'schools/delete',
      setCurrentSchool: 'schools/setCurrent'
    }),
    goto(path, school){
      this.setCurrentSchool(school)
      this.$router.push(path)
    },
    submit() {
      this.create(this.newSchool)
    },
    deleteSchool(id) {
      this.delete(id)
    }
  },
  computed: {
    ...mapGetters({
      schools: 'schools/schools'
    }),
    isRootPath() {
      return this.$route.path.endsWith('/schools')
    }
  },
  created() {
    this.$store.dispatch('schools/index')
  }
}
</script>

<style lang="scss" scoped>
.v-list {
  background: transparent !important;
}
.v-list__tile--link {
  background: rgba(255,255,255,.1) !important;
}
</style>
