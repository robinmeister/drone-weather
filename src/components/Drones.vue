<script setup lang="ts">
import {reactive, ref, type Ref, watch} from 'vue';
  import DroneCarousel from '@/components/DroneCarousel.vue'
  import dji_fpv from '@/assets/images/dji_fpv.jpg'
  import dji_mini_4_pro from '@/assets/images/dji_mini_4_pro.png'
  import dji_mavic_mini from '@/assets/images/dji_mavic_mini.jpg'
  import dji_avata from '@/assets/images/dji_avata.jpg'
  import dji_mavic_2_pro from '@/assets/images/dji_mavic_2_pro.jpg'
  import dji_mavic_3 from '@/assets/images/dji_mavic_3.jpg'
  import type { Wind } from "@/views/HomeView.vue";

  type Drone = {
    id: number
    name: string
    maxWindResistance: number
    image: string
  }

  type Props = {
    wind: any
  }

  const props = defineProps<Props>();

  let currentwind: Wind = reactive(props.wind);

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

  const filterRecDrones = (wind: Wind) => {
    console.log('Filtering drones with wind:', wind)  
    return drones.filter(drone => drone.maxWindResistance >= currentwind.max)
  }

  const recommended_drones = ref(filterRecDrones(currentwind))
  
  const selectedDrone : Ref<number> = ref(0)  

  const selectDrone = (index: number) => {
    console.log('Selected drone:', index)
    selectedDrone.value = index
  }

  watch(() => props.wind, (newvalue, oldvalue) => {
      currentwind = newvalue;
  })

  console.log(props.wind);

</script>

<template>   
  <div class="drones-container">          
    <p><b>Recommended drones:</b></p>
  </div>  
  <div class="drones">          
    <DroneCarousel :drones="recommended_drones" :selectedDrone="selectedDrone" @selectDrone="selectDrone" />
  </div>
</template>  

<style scoped>
  .drones-container {
    display: flex;
    justify-content: center;    
  }
  .drones {
    display: flex;
    justify-content: center;
  }
</style>

