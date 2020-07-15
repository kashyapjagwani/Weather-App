<template>
  <q-page>
    <!-- <q-btn label="get city" @click="showCities" /> -->
    <!-- <p>{{loadTenCities}}</p> -->
    <div class="column items-center">
      <q-input class="q-my-md" v-model="searchCity" outlined placeholder="Enter a city" style="width:500px;"/>
    </div>
    <div class="column items-center" v-for="city in loadTenCities" :key="city.City">
      <div class="col">
        <q-card class="q-mb-sm text-center cursor-pointer" style="width:500px">
          <q-item clickable>
            <q-item-section>
              <q-item-label>{{city.City}}</q-item-label>
              <q-item-label caption lines="2">{{city.State}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

    <div v-show="noCities" class="text-h5 flex flex-center">
      Sorry! No cities found.
    </div>
    
    <div v-show="!noCities" class="q-pt-sm q-pb-md flex flex-center">
      <q-pagination
        v-model="page"
        :min="currentPage" 
        :max="Math.ceil(totalCities/totalCitiesPerPage)"
        :input="true"
        input-class="text-black text-weight-bold"
      >
      </q-pagination>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data() {
    return {
      searchCity: '',
      totalCities: 20,
      noCities: false,
      cities: [
        
      ],
      tenCities: [

      ],
      page: 1,
      currentPage: 1,
      totalCitiesPerPage: 10,
    }
  },
  computed: {
    ...mapGetters('cities', ['getCities']),
    loadTenCities() {
      if(this.searchCity === ''){
        this.totalCities = 20
        return this.cities.slice((this.page-1)*this.totalCitiesPerPage,(this.page-1)*this.totalCitiesPerPage+this.totalCitiesPerPage)
      }
      else {
        this.totalCities = 0
        this.tenCities = []
        this.cities
          .filter(city => {
            if(city.City.toLowerCase().match(this.searchCity.toLowerCase())) {
              ++this.totalCities
              if(!this.tenCities.includes(city)){
                this.tenCities.push(city)
              }
            }
          })
        if(!this.tenCities.length) {
          this.noCities = true
        }
        else {
          this.noCities = false
          return this.tenCities.slice((this.page-1)*this.totalCitiesPerPage,(this.page-1)*this.totalCitiesPerPage+this.totalCitiesPerPage)
        }
      }
    }
  },
  methods: {
    ...mapActions('cities', ['loadCities'])
  },
  created() {
    this.$axios.get('https://indian-cities-api-nocbegfhqg.now.sh/cities')
    .then(cities => {
      this.loadCities({
        data: cities.data
      })
      .then(() => {
        this.cities = this.getCities
      })
      .then(() => {
        this.loadTenCities
      })
    })
  },
}
</script>
