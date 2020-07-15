<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created() {
    this.$axios.get('https://indian-cities-api-nocbegfhqg.now.sh/cities').then(cities => {
      this.loadCities({
        data: cities.data
      })
    })
  },
  methods: {
    ...mapActions('cities', ['loadCities'])
  }
}
</script>
