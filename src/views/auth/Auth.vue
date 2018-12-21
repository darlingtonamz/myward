<template>
  <div class="authenticating">
    Authenticating... {{authMessage}}
  </div>
</template>

<script>
import router from '@/router'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Auth',

  methods: mapActions(['handleAuthentication']),

  data () {
    this.handleAuthentication()
      .then((result) => {
        router.push({ name: 'Home' })
      }).catch((err) => {/* show failure */});

    return {}
  },
  computed: {
    ...mapState({
      authMessage: state => state.session.authMessage,
      test: state => state.test,
    })
  }
}
</script>