<template>
  <div>
    <div>Schools</div>
    <div>
      <div>
        <form @submit.prevent="submit">
          <input type="text" v-model="newSchool.name" required>
          <button type="submit">Submit</button>

        </form>
      </div>
      <div v-for="(school, pos) in schools" :key="pos">
        <span>{{school.name}}</span>
        <span><button @click="deleteSchool(school.id)">X</button></span>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    text: "dfdjhf",
    newSchool: {
    }
  }),
  methods: {
    ...mapActions({
      create: 'schools/create',
      delete: 'schools/delete'
    }),
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
  },
  created() {
    this.$store.dispatch('schools/index')
  }
}
</script>

<style>

</style>
