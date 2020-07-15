<template>
  <q-page class="flex flex-center text-center" :class="timeClass">
    <div v-if="weatherData" class="col">
      <div class="text-h2" style="opacity:.8">{{weatherData.name}}</div>
      <div class="text-h6 text-weight-regular text-grey-8">{{targetState}}</div>
      <div>
        <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" />
      </div>
      <div class="text-h5 q-mt-md">{{weatherData.weather[0].main}}</div>
      <div class="text-h4 q-mt-md">{{Math.round(weatherData.main.temp)}}&deg;C</div>
    </div>
    <div v-else>
      <div class="text-h4" style="opacity:.4">
        Oops. Nothing here... Openweather App doesn't have data for this city
      </div>
      <q-btn
        class="q-mt-xl"
        color="primary"
        text-color="black"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      apiKey: '74d2866467dbc11b5d41e0974d634137',
      targetCity: this.$route.params.city,
      targetState: this.$route.params.state,
      weatherData: null,
    }
  },
  computed: {
    ...mapGetters('weather', ['getWeather']),
    timeClass() {
      if(this.weatherData) {
        if(this.weatherData.weather[0].icon.endsWith('d')) {
          return 'timeDay'
        }
        else {
          return 'timeNight'
        }
      }
    }
  },
  methods: {
    ...mapActions('weather', ['loadWeather']),
  },
  created() {
    this.$q.loading.show()
    this.$axios(`https://api.openweathermap.org/data/2.5/weather?q=${this.targetCity}&appid=${this.apiKey}&units=metric`)
    .then(data => {
      this.loadWeather(data.data)
    })
    .then(() => {
      this.weatherData = this.getWeather
      this.$q.loading.hide()
    })
  }
}
</script>

<style lang="scss" scoped>
  .timeDay {
    background: linear-gradient(to top, #6190e8, #a7bfe8);
    color: black;
  }
  .timeNight {
    background: linear-gradient(to top, #232526, #414345);
    color: white;
  }
</style>