<script setup lang="ts">
import { onBeforeMount } from "vue";
import { MainData } from "@/assets/appdata/maindata";

  import WeatherInfo from "@/components/WeatherInfo.vue";
  import Drones from "@/components/Drones.vue";
  import WeekDaySelection from "@/components/WeekDaySelection.vue";
  import LocationInput from "@/components/LocationInput.vue";
  import { ref, type Ref } from "vue";
  import { Skeleton } from "@/components/ui/skeleton";

  const loading : Ref<boolean> = ref<boolean>(false);
  const error : Ref<boolean> = ref<boolean>(false);

  const coordinates : Ref<{ lat: number; lon: number } | undefined> = ref(undefined);
  const today : string = new Date().toLocaleDateString("en-US", { weekday: "short" });   
  const day : Ref<string> = ref(today); 

  const fetchData = async (day: string) => {
    loading.value = true;
    error.value = false;
    console.log("Fetching data for coordinates:", coordinates.value, "and day:", day);
    // fetch data
    loading.value = false;
  };

  const setCoordinates = (value: { lat: number; lon: number }) => {
    console.log("Setting coordinates:", value);
    coordinates.value = value;
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  const setError = (value: boolean) => {
    error.value = value;
  };

  const setDay = (value: string) => {
    day.value = value;
    fetchData(value);
  };

  onBeforeMount(async () => {
    const maindata = new MainData()
    await maindata.init("Velbert");
    console.log(maindata);
  });

  console.log("Error:", error);
  console.log("Loading:", loading);
</script>

<template>
  <div>
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
        <WeatherInfo />
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
  .header {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;    
  }
</style>
