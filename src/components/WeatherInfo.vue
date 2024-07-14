<script setup lang="ts">
import {type Ref, ref, watch} from "vue";

  const props = defineProps({
    wind: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  });

  let currentwind: Ref<number> = ref(props.wind);
  let currentdate: Ref<string> = ref(props.date);

  watch(() => props.wind, (newwind, oldwind) => {
      if (newwind !== oldwind) {
        currentwind.value = newwind;
      }
  });

  watch(() => props.date, (newdate, olddate) => {
    if (newdate !== olddate) {
      currentdate.value = newdate;
    }
  });
</script>

<template>
  <div class="weather-info">
    <div class="weather-info-card">
      <div class="weather-info-icon">
        <!--<img :src="'../assets/'  + '.png'" :alt="weather.description" />-->
      </div>
      <div class="weather-info-details">
        <p class="w-full text-center text-black font-light text-xs"> {{ currentdate }} </p>
        <p class="wind">Wind: {{ currentwind  }} km/h</p>
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