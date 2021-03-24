<template>
  <div class="weather">
    <WeatherCard
      v-for="(item, index) in watherData"
      :key="index"
      :date="capitalizeText(getDateFormat(item.dt_txt))"
      :temp="Math.round(item.main.temp)"
      :description="capitalizeText(item.weather[0].description)"
      :image="getWatherIcon(item.weather[0].icon)"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { capitalizeText } from '@/utils'
import WeatherCard from './WeatherCard'
export default {
  name: 'Weather',
  props: ['watherData', 'lang'],
  components: {
    WeatherCard
  },
  methods: {
    getWatherIcon(code) {
      return `http://openweathermap.org/img/wn/${code}@2x.png`
    },
    getDateFormat(date) {
      moment.locale(this.lang)
      return moment(date).format('dddd, DD MMMM - HH:mm')
    },
    capitalizeText: capitalizeText
  }
}
</script>
