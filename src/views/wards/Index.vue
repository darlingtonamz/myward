<template>
  <div>
    <div>
      <div v-if="isRootPath">
        
        <v-layout align-center justify-start row fill-height wrap>
          <v-flex xs12 sm5 md3
            v-for="(ward, pos) in wards" :key="pos"
            @click="goto('/wards/' + ward.id, ward)">
            <v-hover>
              <center
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 2 : 0}`">
                <div>
                  <v-avatar color="teal">
                    <span class="white--text headline">
                      {{ward.name ? ward.name[0].toUpperCase() : ''}}
                    </span>
                  </v-avatar>
                </div>
                <div>
                  <br>
                  <div class="headline">{{ ward.name }}</div>
                  <div>{{ ward.currentLevel || 'current level : school' }}</div>
                </div>
              </center>
            </v-hover>
          </v-flex>
        </v-layout>

        <center>
          <br>
          <br>
          <v-spacer></v-spacer>
            <v-btn color="whitefade elevation-0" @click="goto('/wards/new')">ADD WARD</v-btn>
        </center>
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
      create: 'wards/create',
      delete: 'wards/delete',
      setCurrentWard: 'wards/setCurrent'
    }),
    goto(path, ward){
      this.setCurrentWard(ward)
      this.$router.push(path)
    },
    submit() {
      this.create(this.newWard)
    },
    deleteWard(id) {
      this.delete(id)
    }
  },
  computed: {
    ...mapGetters({
      wards: 'wards/wards'
    }),
    isRootPath() {
      return this.$route.path.endsWith('/wards')
    }
  },
  created() {
    this.$store.dispatch('wards/index')
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
