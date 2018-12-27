<template>
  <div>
    <div>Wards</div>
    <div>
      <div>
        <form @submit.prevent="submit">
          <input type="text" v-model="newWard.name" required>
          <button type="submit">Submit</button>

        </form>
      </div>
      <div v-for="(ward, pos) in wards" :key="pos">
        <span>{{ward.name}}</span>
        <span><button @click="deleteWard(ward.id)">X</button></span>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    text: "dfdjhf",
    newWard: {
    }
  }),
  methods: {
    ...mapActions({
      create: 'wards/create',
      delete: 'wards/delete'
    }),
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
  },
  created() {
    this.$store.dispatch('wards/index')
  }
}
</script>

<style>

</style>
