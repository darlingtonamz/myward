<template>
  <div>
    <div v-if="isRootPath">
      <v-card color="" class="">
        <v-toolbar color="elevation-0">
          <v-btn flat icon color="" @click="goto('/schools')">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span>Levels</span>
          <v-spacer></v-spacer>          
          <v-btn color="transparent elevation-0" @click="goto('/schools/' + school.id + '/new', {school})">
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
          <v-list color="transparent">
            <v-list-tile
              v-for="(level, pos) in levels" :key="pos"
              avatar
              @click="goto('/levels/' + level.id, level)">
              <v-list-tile-avatar color="teal" >
                A
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ level.name }} Level</v-list-tile-title>
                <v-list-tile-sub-title>{{ level.description || 'No description' }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-container>
      </v-card>
    </div>
    <div v-if="!isRootPath">
      <router-view :school="school"></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewLevel from './New'
export default {
  props: ['school'],
  components: {NewLevel},
  data: () => ({
    showMenu: false,
    menuItems: [],
  }),
  methods: {
    ...mapActions({
      create: 'levels/create',
      delete: 'levels/delete',
      setCurrentLevel: 'levels/setCurrent'
    }),
    goto(path, level){
      this.setCurrentLevel(level)
      this.$router.push(path)
    },
    submit() {
      this.create(this.newLevel)
    },
    deleteLevel(id) {
      this.delete(id)
    }
  },
  watch: {
    school() {
      this.$store.dispatch('levels/index', this.school.id)
    }
  },
  computed: {
    ...mapGetters({
      levels: 'levels/levels'
    }),
    isRootPath() {
      return this.$route.path.endsWith(this.school.id)
    }
  },
  created() {
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
