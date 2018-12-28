<template>
  <div>      
    <div>
      <br>
      <center>
        <v-card color="" class=""
        max-width="500">
        
          <v-toolbar color="elevation-0">
            <v-btn flat icon color="" @click="goto('/schools')">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            
            <span class="headline">New School</span>
          </v-toolbar>
          <!-- <v-card-title primary-title>
            <div>
              <div class="headline">Unlimited music now</div>
              <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Listen now</v-btn>
          </v-card-actions> -->
          <!-- <v-card-title>
            <div>
              <div class="headline">New School</div>
              <span>Add a new school to the list of schools that your Wards/Children attend.</span>
            </div>
          </v-card-title> -->
          <v-container>
            <v-form v-model="valid">
              <v-text-field
                v-model="school.name"
                :rules="nameRules"
                :counter="50"
                label="Name"
                required
              ></v-text-field>
              <v-select
                :items="categories"
                label="Category"
                :rules="categoryRules"
                v-model="school.category"
              ></v-select>
              <v-textarea
                box
                v-model="school.description"
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
      
      <!-- <form @submit.prevent="submit">
        <input type="text" v-model="newSchool.name" required>
        <button type="submit">Submit</button>

      </form> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    school: {},
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
      create: 'schools/create',
    }),
    goto(path){
      this.$router.push(path)
    },
    submit() {
      this.create(this.school)
      .then((result) => {
        this.goto('/schools')
      }).catch((err) => {
        console.log('Failed to create school')
      });
    },
  }

}
</script>

<style>

</style>
