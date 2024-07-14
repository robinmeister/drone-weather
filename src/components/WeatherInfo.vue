<script setup lang="ts">
  import { ref, type Ref } from 'vue';

  const weather = ref({
    temperature: 0,
    description: '',
    icon: '',
    wind: 0,    
  })

  const fetchWeather = async (lat: number, lon: number) => {
    console.log('Fetching weather for:', lat, lon)
    // fetch weather data
    weather.value = {
      temperature: 25,
      description: 'Sunny',
      icon: 'sun',
      wind: 10,
    }
  }

  fetchWeather(0, 0)
</script>

<template>
  <div class="weather-info">
    <div class="weather-info-card">
      <div class="weather-info-icon">
        <img :src="'../assets/' + weather.icon + '.png'" :alt="weather.description" />
      </div>
      <div class="weather-info-details">
        <p class="wind">Wind: {{ weather.wind }} km/h</p>
        <p class="temperature">{{ weather.temperature }}°C</p>
        <p class="description">{{ weather.description }}</p>        
      </div>
    </div>
  </div>
</template>

<style scoped>
  .weather-info {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .weather-info-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #f0f0f0;
  }

  .weather-info-icon img {
    width: 4rem;
    height: 4rem;
  }

  .weather-info-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .wind {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .temperature {
    font-size: 1rem;
  }

  .description {
    font-size: 0.75rem;
  }
</style>