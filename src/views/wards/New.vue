<template>
  <div>      
    <div>
      <br>
      <center>
        <v-card color="" class=""
        max-width="500">
        
          <v-toolbar color="elevation-0">
            <v-btn flat icon color="" @click="goto('/wards')">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            
            <span class="headline">New Ward</span>
          </v-toolbar>
          <v-container>
            <v-form v-model="valid">
              <v-text-field
                v-model="ward.name"
                :rules="nameRules"
                :counter="50"
                label="Name"
                required
              ></v-text-field>
              <v-select
                :items="categories"
                label="Category"
                :rules="categoryRules"
                v-model="ward.category"
              ></v-select>
              <v-textarea
                box
                v-model="ward.description"
                :rules="descriptionRules"
                label="Description"
                required
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
  data: () => ({
    ward: {},
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 50) || 'Name must be less than 50 characters'
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
      v => (v && v.length >= 10) || 'Description must be greater than 9 characters'
    ],
    categoryRules: [
      v => !!v || 'Category is required',
    ],
    valid: false,
    categories: ['primary', 'secondary', 'tertiary']
  }),
  methods: {
    ...mapActions({
      create: 'wards/create',
    }),
    goto(path){
      this.$router.push(path)
    },
    submit() {
      this.create(this.ward)
      .then((result) => {
        this.goto('/wards')
      }).catch((err) => {
        console.log('Failed to create ward')
      });
    },
  }

}
</script>

<style>

</style>
