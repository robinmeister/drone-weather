<script setup lang="ts">
import { reactive } from "vue";
import { MainData } from "@/assets/appdata/maindata";

  import WeatherInfo from "@/components/WeatherInfo.vue";
  import Drones from "@/components/Drones.vue";
  import WeekDaySelection from "@/components/WeekDaySelection.vue";
  import LocationInput from "@/components/LocationInput.vue";
  import { ref, type Ref } from "vue";
  import { Skeleton } from "@/components/ui/skeleton";

  let weatherdata: MainData;

  const loading : Ref<boolean> = ref<boolean>(false);
  const error : Ref<boolean> = ref<boolean>(false);

  const coordinates : Ref<{ lat: number; lon: number } | undefined> = ref(undefined);
  const today : string = new Date().toLocaleDateString("en-US", { weekday: "short" });   
  const day : Ref<string> = ref(today);
  const dayjson: any = reactive({});

  const fetchData = async (day: string) => {
    loading.value = true;
    error.value = false;
    console.log("Fetching data for coordinates:", coordinates.value, "and day:", day);
    // fetch data
    loading.value = false;
  };

  const setCoordinates = async (value: { lat: number; lon: number }) => {
    console.log("Setting coordinates:", value);
    coordinates.value = value;
    weatherdata = reactive(new MainData());
    await weatherdata.init(coordinates.value);
    console.log(weatherdata);
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  const setError = (value: boolean) => {
    error.value = value;
  };

  const setDay = (value: string) => {
    day.value = value;
    //fetchData(value);
  };

  const setDayJson = (value: any) => {
    day.value = value.daystring
    console.log("Nummer " + value.daynum);
    //fetchData(value);
  };

  console.log("Error:", error.value);
  console.log("Loading:", loading.value);
</script>

<template>
  <div class="weather-app">
    <header class="header">
      <h1>Drone - Weather</h1>
    </header>
    <main class="container mx-auto p-4">
      <LocationInput 
        v-model="coordinates" 
        @search="fetchData" 
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
      <div v-if="!loading && !error && coordinates">
        <Drones />
        <WeatherInfo :weather="weatherdata"/>
        <WeekDaySelection
          :day="day"
          @update:day="setDayJson"
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
