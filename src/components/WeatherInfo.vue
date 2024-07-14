<script setup lang="ts">
import {reactive, type Ref, ref, watch} from "vue";
import type {Wind} from "@/views/HomeView.vue";

  type Props = {
    wind: any
  }

  const props = defineProps<Props>();

  let currentwind: Wind = reactive(props.wind)

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }

    watch(() => props.wind, (newwind) => {
      currentwind = newwind;
    });
</script>

<template>
  <div class="weather-info">
    <div class="weather-info-card">
      <div class="weather-info-icon">
        <!--<img :src="'../assets/'  + '.png'" :alt="weather.description" />-->
      </div>
      <div class="weather-info-details">
        <p> {{ formatDate(currentwind.date) }} </p>
        <table class="wind-table">
          <tr class="wind-table-row">
            <th class="wind-table-header">Max Wind</th>
            <td class="wind-table-data">{{ currentwind.max }} km/h</td>
          </tr>
          <tr class="wind-table-row">
            <th class="wind-table-header">Wind at 10m</th>
            <td class="wind-table-data">{{ currentwind.speed_10 }} km/h</td>
          </tr>
          <tr class="wind-table-row">
            <th class="wind-table-header">Wind at 80m</th>
            <td class="wind-table-data">{{ currentwind.speed_80 }} km/h</td>
          </tr>
          <tr class="wind-table-row">
            <th class="wind-table-header">Wind at 120m</th>
            <td class="wind-table-data">{{ currentwind.speed_120 }} km/h</td>
          </tr>
          <tr class="wind-table-row">
            <th class="wind-table-header">Wind at 180m</th>
            <td class="wind-table-data">{{ currentwind.speed_180 }} km/h</td>
          </tr>
        </table>
        <!-- <p class="temperature">{{  }}°C</p>
        <p class="description">{{  }}</p> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
  .weather-info {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .weather-info-card {
    display: flex;
    width: 90%;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

  .wind-table {
    width: 100%;
    border-collapse: collapse;
  }

  .wind-table-row {
    border-bottom: 1px solid #f0f0f0;
  }

  .wind-table-header {
    padding: 0.5rem;
    text-align: left;
    font-weight: bold;
  }

  .wind-table-data {
    padding: 0.5rem;
    text-align: right;
  }

  .wind-table-data:first-child {
    text-align: left;
  }

  .wind-table-data:last-child {
    border-right: none;
  }

</style>