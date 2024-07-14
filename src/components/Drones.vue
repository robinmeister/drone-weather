<script setup lang="ts">
  import {
    Card,    
  } from '@/components/ui/card'
  import { ref, type Ref } from 'vue';
  import { MainData } from "@/assets/appdata/maindata";
  import DroneCarousel from '@/components/DroneCarousel.vue'
  import dji_fpv from '@/assets/images/dji_fpv.jpg'
  import dji_mini_4_pro from '@/assets/images/dji_mini_4_pro.png'
  import dji_mavic_mini from '@/assets/images/dji_mavic_mini.jpg'
  import dji_avata from '@/assets/images/dji_avata.jpg'
  import dji_mavic_2_pro from '@/assets/images/dji_mavic_2_pro.jpg'
  import dji_mavic_3 from '@/assets/images/dji_mavic_3.jpg'

  type Drone = {
    id: number
    name: string
    maxWindResistance: number
    image: string
  }

  /* type Weather = {
    date: Date
    maxTemp: number
    maxWindSpeed: number
    minTemp: number
    minWindSpeed: number
    rain: boolean
    snow: boolean
    windspeed: WindSpeed[]
  }

  type WindSpeed = {
    date: Date
    speed_10: number
    speed_80: number
    speed_120: number
    speed_180: number
  }
 */
  interface Props {
    weather: {
      type: MainData,
      required: true
    }
  }  

  const props = defineProps<Props>();

  const drones : Drone[] = [
      {
        id: 1,
        name: 'DJI Mavic Mini',
        maxWindResistance: 28,
        image: dji_mavic_mini,
      },
      {
        id: 2,
        name: 'DJI Mini 4 Pro',
        maxWindResistance: 38,
        image: dji_mini_4_pro,
      },
      {
        id: 3,
        name: 'DJI FPV',
        maxWindResistance: 49,
        image: dji_fpv,
      },
      {
        id: 4,
        name: 'DJI Avata',
        maxWindResistance: 38,
        image: dji_avata,
      },
      {
        id: 5,
        name: 'DJI Mavic 2 Pro',
        maxWindResistance: 38,
        image: dji_mavic_2_pro,
      },
      {
        id: 6,
        name: 'DJI Mavic 3',
        maxWindResistance: 43,
        image: dji_mavic_3,
      }
    ]     

  const filterRecDrones = (weather: MainData) => {
    console.log('Filtering drones for weather:', weather)
    const maxWindSpeed = weather.location?.weatherdata?.maxWindspeed
    console.log('Max wind speed:', maxWindSpeed)
    return drones.filter(drone => drone.maxWindResistance >= maxWindSpeed)
  }

  const recommended_drones = ref(filterRecDrones(props.weather))
  
  const selectedDrone : Ref<number> = ref(0)  

  const selectDrone = (index: number) => {
    console.log('Selected drone:', index)
    selectedDrone.value = index
  }

  console.log("Weather Data: ", props.weather.location?.weatherdata)
  console.log('Selected drone:', selectedDrone)

</script>

<template>   
  <div class="drones">      
    <DroneCarousel :drones="recommended_drones" :selectedDrone="selectedDrone" @selectDrone="selectDrone" />
  </div>
</template>  

<style scoped>
  .drones {
    display: flex;
    justify-content: center;
  }
</style>

