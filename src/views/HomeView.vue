<script setup lang="ts">
  import { MainData } from "@/assets/appdata/maindata";
  import WeatherInfo from "@/components/WeatherInfo.vue";
  import Drones from "@/components/Drones.vue";
  import WeekDaySelection from "@/components/WeekDaySelection.vue";
  import LocationInput from "@/components/LocationInput.vue";
  import { ref, type Ref } from "vue";
  import { Skeleton } from "@/components/ui/skeleton";

  /*
  export type Wind = {
    date: Date
    max: number
    speed_10: number
    speed_80: number
    speed_120: number
    speed_180: number
  }
  */

  let currentWind: Ref<any> = ref({
    date: new Date(),
    max: 0,
    speed_10: 0,
    speed_80: 0,
    speed_120: 0,
    speed_180: 0
  });


  let loadData: Ref<Boolean> = ref(false);
  let inputData: Ref<string> = ref('');

  const loading : Ref<boolean> = ref<boolean>(false);
  const error : Ref<boolean> = ref<boolean>(false);

  const coordinates : Ref<{ lat: number; lon: number } | undefined> = ref(undefined);
  const today : string = new Date().toLocaleDateString("en-US", { weekday: "short" });   
  const day : Ref<string> = ref(today);
  const index: Ref<number> = ref(0); //index von den Wochentagen die geklickt wurden (Dienstag 1, Mittwoch 2, Donnertsg 3 usw.)

  const fetchData = async (day: string) => {
    loading.value = true;
    error.value = false;
    console.log("Fetching data for coordinates:", coordinates.value, "and day:", day);
    await fetchWeatherData(index.value);
    loading.value = false;
    loadData.value = true;
  };

  const setCoordinates = async (value: { lat: number; lon: number }) => {
    console.log("Setting coordinates:", value);
    coordinates.value = value;
    await fetchWeatherData(0);
    loadData.value = true;
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  const setError = (value: boolean) => {
    error.value = value;
  };

  const setDay = async (value: any) => {
    day.value = value.day;
    index.value = value.index;
    await fetchData(value);
  };

  async function handleEnter(value: string) {
      inputData.value = value;
      await fetchData(today);
  }

  //momentan nur für windspeed_10 → muss noch auf 80, 120 und 180 erweitert werden
  async function fetchWeatherData(indexDay: number) {
    const currentTime: Date = new Date();
    const num: number = currentTime.getHours();

    if (indexDay !== 0) {
      currentTime.setDate(currentTime.getDate() + indexDay);
    }

    const dateFrom: string = currentTime.toISOString().split("T")[0];
    const dateTo: string = currentTime.toISOString().split("T")[0];

    console.log("Date from " + dateFrom);
    console.log("Day to " + dateTo);

    const weatherData = new MainData();
    await weatherData.init(coordinates.value, inputData.value, dateFrom, dateTo);
    const max = weatherData.location?.weatherdata?.maxWindspeed;
    currentWind.value = {...weatherData.location?.weatherdata?.windspeed[num], max: max as number};
  }

  console.log("Error:", error.value);
  console.log("Loading:", loading.value);
</script>

<template>
  <div class="weather-app">
    <!-- <header class="header">
      <h1>Drone - Weather</h1>
    </header> -->
    <main class="container mx-auto p-4">
      <LocationInput 
        v-model="coordinates" 
        @search="fetchData"
        @key:enter="handleEnter"
        @update:coordinates="setCoordinates"
        @update:error="setError"
        @update:loading="setLoading"
      />
      <div v-if="loading">
        <div class="flex flex-col space-y-3">
          <Skeleton class="h-[125px] w-[250px] rounded-xl" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
          </div>
        </div>
      </div>
      <div v-if="error && !loading">Error fetching data</div>
      <div v-if="!loading && !error && loadData">
        <Drones :wind="currentWind" />
        <WeatherInfo :wind="currentWind" />
        <WeekDaySelection
          :day="day"
          @update:day="setDay"
          @update:loading="setLoading"
          @update:error="setError"
        />
      </div>  
    </main>
  </div>
</template>

<style scoped>
  .weather-app {
    display: flex;
    flex-direction: column;
    height: 100%;  
    background-color: #f1f1f1;  
  }

  .header {
    background-color: #3498db;
    color: white;
    padding: 1rem;
    text-align: center;
  }

  .container {    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 500px;        
  }
</style>
