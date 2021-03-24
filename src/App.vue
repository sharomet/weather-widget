<template>
  <div class="container">
    <div class="select-control">
      <div class="form-group">
        <label for="city">City</label>
        <input
          type="text"
          class="form-control"
          id="city"
          v-model="cityModel"
          @input="changeInputCity"
        />
        <ul class="city-list" v-if="showCityList">
          <li
            v-for="(city, index) in citySearch"
            :key="city + index"
            @click="selectCity(city)"
          >
            {{ city }}
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="weatherType">Weather Type</label>
        <select
          class="form-control"
          id="weatherType"
          v-model="weatherTypeModel"
        >
          <option
            v-for="(type, index) in weatherTypeList"
            :key="type + index"
            :value="type"
          >
            {{ capitalizeText(type) }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="lang">Language</label>
        <select class="form-control" id="lang" v-model="langModel" @change="changeLanguage">
          <option
            v-for="(lang, index) in langList"
            :key="lang.value + index"
            :value="lang.value"
          >
            {{ lang.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="weather">
      <div v-for="(item, index) in watherData.list" :key="index">
        <div class="weather__card">
          <div class="date">
            {{ capitalizeText(getDateFormat(item.dt_txt)) }}
          </div>
          <div class="temp">
            <div>
              {{ item.main.temp_max }} &#8451;
            </div>
          </div>
          <div class="weather__description">
            {{ capitalizeText(item.weather[0].description) }}
          </div>
          <div class="weather__image">
            <img :src="getWatherIcon(item.weather[0].icon)" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import fetchWeatherData from './api/api'
export default {
  name: 'App',
  data() {
    return {
      weatherTypeModel: 'forecast',
      weatherTypeList: ['forecast', 'weather'],
      cityModel: 'Zaporizhia',
      cityList: ['Kyiv', 'Zaporizhia', 'Dnipro', 'Poltava', 'Sumy', 'Lviv'],
      citySearch: [],
      showCityList: false,
      langModel: 'en',
      langList: [
        {
          name: 'English',
          value: 'en'
        },
        {
          name: 'Ukrainian',
          value: 'uk'
        },
        {
          name: 'Russian',
          value: 'ru'
        }
      ],
      watherData: []
    }
  },

  mounted() {
    this.fetchWeather()
  },

  methods: {
    async fetchWeather() {
      const params = {
        city: this.cityModel,
        type: this.weatherTypeModel,
        lang: this.langModel
      }
      this.watherData = await fetchWeatherData(params)
    },
    changeInputCity() {
      if (this.cityModel.length) {
        this.citySearch = this.cityList.filter(item =>
          item.toLowerCase().includes(this.cityModel.toLowerCase())
        )
        this.showCityList = true
      } else {
        this.showCityList = false
      }
    },
    selectCity(city) {
      this.cityModel = city
      this.fetchWeather()
      this.showCityList = false
    },
    changeLanguage() {
      this.fetchWeather()
    },
    getWatherIcon(code) {
      return `http://openweathermap.org/img/wn/${code}@2x.png`
    },
    getDateFormat(date) {
      moment.locale(this.langModel)
      return moment(date).format('dddd DD MMMM - HH:mm')
    },
    capitalizeText(text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
  }
}
</script>
