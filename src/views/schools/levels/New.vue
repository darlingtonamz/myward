<template>
  <div>      
    <div>
      <br>
      <center>
        <v-card color="" class=""
        max-width="500">
        
          <v-toolbar color="elevation-0">
            <v-btn flat icon color="" @click="goto('/schools/' + school.id)">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            
            <span class="headline">New Level in {{school.name}}</span>
          </v-toolbar>
          <v-container>
            <v-form v-model="valid">
              <v-text-field
                v-model="level.name"
                :rules="nameRules"
                :counter="50"
                label="Name"
                required
              ></v-text-field>
              <v-textarea
                box
                v-model="level.description"
                label="Description"
              ></v-textarea>
              <v-card-actions>
                <v-btn
                  :disabled="!valid"
                  color="accent"
                  @click="submit"
                >submit</v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </center>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['school'],
  data: () => ({
    level: {},
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 50) || 'Name must be less than 50 characters'
    ],
    valid: false,
    categories: ['primary', 'secondary', 'tertiary']
  }),
  watch: {
    school(value) {
      this.level['school_id'] = value.id
    }
  },
  methods: {
    ...mapActions({
      create: 'levels/create',
    }),
    goto(path){
      this.$router.push(path)
    },
    submit() {
      this.create(this.level)
      .then((result) => {
        this.goto('/schools/' + this.school.id)
      }).catch((err) => {
        console.log('Failed to create level', err)
      });
    },
  }

}
</script>

<style>

</style>
