<template>
  <div class="container">
    <div class="form-group">
      <select class="form-control" v-model="selectWeatherType">
        <option v-for="(wType, index) in weatherTypes" :key="index">
          {{ wType }}
        </option>
      </select>
    </div>
    <h1 v-if="watherData.value">
      {{ watherData.value.city.name }}
    </h1>
    <div
      class="row"
      v-if="selectWeatherType === 'forecast' && watherData.value"
    >
      <div
        class="col-3"
        v-for="(item, index) in watherData.value.list"
        :key="index"
      >
        <div class="card text-center">
          <div class="date">
            {{ getDateFormat(item.dt_txt) }}
          </div>
          <div class="temp">
            <div>
              {{ item.main.temp_max }} &#8451;
            </div>
          </div>
          <div class="card__description">
            {{ getCapitalizeFormat(item.weather[0].description) }}
          </div>
          <div class="card__image">
            <img :src="getIcon(item.weather[0].icon)" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from 'vue'
import moment from 'moment'
import fetchWeatherApi from '@/api/api'
export default {
  name: 'App',
  setup() {
    const city = ref('Kyiv')
    const selectWeatherType = ref('forecast')
    const weatherTypes = reactive(['forecast', 'weather'])
    const watherData = reactive([])

    const fetchWeather = async () => {
      const params = {
        weatherType: selectWeatherType.value,
        city: city.value
      }
      watherData.value = await fetchWeatherApi(params)
      console.log(watherData.value)
    }

    onMounted(fetchWeather)

    watch(selectWeatherType, fetchWeather)

    const getIcon = code => {
      return `http://openweathermap.org/img/wn/${code}@2x.png`
    }

    /*const dayText = ref('')
    const dayNum = ref('')
    const month = ref('')
    const time = ref('')*/
    const getDateFormat = date => {
      moment.locale('ru')
      date
      //let newDate = moment(date)
      //return newDate.format('dddd DD MMMM - HH:mm')
      //return `${newDate.format('dddd')}${newDate.format('DD')}${newDate.format('DD')}`
      return '<span>Test</span>'
    }

    const getCapitalizeFormat = text => {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }

    return {
      getIcon,
      watherData,
      weatherTypes,
      getDateFormat,
      selectWeatherType,
      getCapitalizeFormat
    }
  }
}
</script>
