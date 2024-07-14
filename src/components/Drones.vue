<script setup lang="ts">
  import {
    Card,    
  } from '@/components/ui/card'
  import { ref, type Ref } from 'vue';

  const drones = ref([
    {
      id: 1,
      name: 'Drone 1',
      description: 'This is the first drone',
      image: '../assets/drone.png',
    },
    {
      id: 2,
      name: 'Drone 2',
      description: 'This is the second drone',
      image: '../assets/drone.png',
    },
    {
      id: 3,
      name: 'Drone 3',
      description: 'This is the third drone',
      image: '../assets/drone.png',
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
  <div class="drones flex flex-wrap gap-4">
    <div class="selected-drone">
      <Card v-if="selectedDrone !== undefined" class="selected-drone-card">
        <img src="../assets/drone.png" alt="Drone" class="img" />
      </Card>
    </div>  
    <div class="drones flex flex-wrap gap-4">
      <Card
        v-for="(drone, index) in drones"
        :key="index"
        class="drone"
        :class="{ 'selected': selectedDrone === index }"
        @click="selectDrone(index)"
      >
        <img src="../assets/drone.png" alt="Drone" class="img" />
      </Card>
    </div>
  </div>
</template>  

<style scoped>

  .drones {
    justify-content: center;
  }

  .drone {
    cursor: pointer;
    max-width: 80px;
    max-height: 80px;
  }

  .drone.selected {
    border: 1px solid #000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .selected-drone-card {
    max-width: 200px;
    max-height: 200px;            
  }

  .img {
    width: 100%;
    height: 100%;
  }
</style>

