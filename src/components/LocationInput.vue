<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ref, type Ref } from 'vue';
import { AlertCircle } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const emit = defineEmits(['update:loading', 'update:error', 'update:coordinates', 'key:enter'])

const location = ref('')
const correctLocation : Ref<boolean | undefined> = ref(undefined)

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
      <Input v-model="location" placeholder="Enter a location" @keydown.enter="emit('key:enter', location)" />
      <Button 
        class="search-button"
        @click="emit('key:enter', location)"        
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
