<script setup lang="ts">
  import {
    Card,    
  } from '@/components/ui/card'
  import { ref, type Ref } from 'vue';
  import DroneCarousel from '@/components/DroneCarousel.vue'
  import dji_fpv from '@/assets/images/dji_fpv.jpg'
  import dji_mini_4_pro from '@/assets/images/dji_mini_4_pro.png'
  import dji_mavic_mini from '@/assets/images/dji_mavic_mini.jpg'

  const drones = ref([
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
        name: 'DJI FPV',
        maxWindResistance: 49,
        image: dji_fpv,
      },
      {
        id: 5,
        name: 'DJI FPV',
        maxWindResistance: 49,
        image: dji_fpv,
      },
      {
        id: 6,
        name: 'DJI FPV',
        maxWindResistance: 49,
        image: dji_fpv,
      }
    ]);
  
  const selectedDrone : Ref<number> = ref(0)

  const selectDrone = (index: number) => {
    console.log('Selected drone:', index)
    selectedDrone.value = index
  }

  console.log('Selected drone:', selectedDrone)

</script>

<template>   
  <div class="drones">      
    <DroneCarousel :drones="drones" :selectedDrone="selectedDrone" @selectDrone="selectDrone" />
  </div>
</template>  

<style scoped>
  .drones {
    display: flex;
    justify-content: center;
  }
</style>

