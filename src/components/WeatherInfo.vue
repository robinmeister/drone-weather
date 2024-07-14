<script setup lang="ts">
import {type Ref, ref, watch} from "vue";
  import { MainData } from "@/assets/appdata/maindata";

  defineProps({
    weather: {
      type: MainData,
      required: true
    }
  });

  const currentTime: Date = new Date();
  const num: number = currentTime.getHours();

</script>

<template>
  <div class="weather-info">
    <div class="weather-info-card">
      <div class="weather-info-icon">
        <!--<img :src="'../assets/'  + '.png'" :alt="weather.description" />-->
      </div>
      <div class="weather-info-details">
        <p class="wind">Wind: {{ weather.location?.weatherdata?.windspeed[num].speed_10  }} km/h</p>
        <p class="temperature">{{  }}°C</p>
        <p class="description">{{  }}</p>
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