<template>
  <div class="weather__card">
    <div class="date">
      {{ date }}
    </div>
    <div class="temp">
      <div>{{ temp }} &#8451;</div>
    </div>
    <div class="weather__description">
      {{ description }}
    </div>
    <div class="weather__image">
      <img :src="image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: ['date', 'temp', 'description', 'image']
}
</script>
