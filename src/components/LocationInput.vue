<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ref, type Ref } from 'vue';
import { AlertCircle } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const emit = defineEmits(['update:loading', 'update:error', 'update:coordinates'])

const location = ref('')
const correctLocation : Ref<boolean | undefined> = ref(undefined)
const coordinates = ref({ lat: 0, lon: 0 })

const searchLocation = async (event: MouseEvent) => {
  event.preventDefault()
  if (!location.value) return
  console.log('Searching for location:', location.value)
  emit('update:loading', true)
  const geocoding_api_key = import.meta.env.VITE_GEOCODING_API_KEY
  const address = location.value
  const url = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${geocoding_api_key}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    if(data && data.length > 0) {
      const { lat, lon } = data[0]
      console.log('Location found:', lat, lon)
      correctLocation.value = true
      coordinates.value = { lat, lon }
      emit('update:coordinates', { lat, lon })
      emit('update:loading', false)
    } else {
      console.error('Location not found:', location.value)
      correctLocation.value = false
    }
  } catch (error) {
    console.error('Error fetching location:', error)
    emit('update:error', true)
  }
}

</script>

<template>
  <div class="location-input flex flex-col gap-4">
    <div class="location-error" v-if="correctLocation === false">
      <Alert variant="destructive">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Location not found. Please try again.
        </AlertDescription>
      </Alert>
    </div>
    <div class="flex w-full max-w-sm items-center gap-1.5">      
      <Input v-model="location" placeholder="Enter a location" />
      <Button 
        class="search-button"
        @click="searchLocation"        
      >
        <img src="../assets/icons/search.svg" alt="Search" />
      </Button>      
    </div>
  </div>
</template>

<style scoped>
  .location-input {
    margin-top: 0.5rem;
    justify-content: center;
    gap: 1rem;
  }

  .location-error {
    display: flex;
    justify-content: center;
  }

  .selected-location {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    align-items: center;
    text-decoration: underline;    
  }

  .search-button {
    background-color: #3498db;
  }
</style>
