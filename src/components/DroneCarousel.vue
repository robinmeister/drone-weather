<script setup lang="ts">
import { ref } from 'vue'
import { watchOnce } from '@vueuse/core'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  drones: { id: number, name: string, maxWindResistance: number, image: string }[]
  selectedDrone: number
}

const props = defineProps<Props>()
const emit = defineEmits(['selectDrone'])


const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value)
    return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value)
    return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi)
    return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
</script>

<template>
  <div class="drone-carousel">
    <div class="w-full sm:w-auto">
      <Carousel
        class="relative w-full max-w-xs"
        @init-api="(val) => emblaMainApi = val"
      >
        <CarouselContent>
          <CarouselItem v-for="(drone, index) in drones" :key="index">
            <div class="p-1">
              <Card>
                <CardContent class="flex items-center justify-center p-6">
                  <div class="flex flex-col gap-2">
                    <h2 class="text-xl font-semibold">{{ drone.name }}</h2>
                    <div class="text-sm">Max. Wind Resistance: {{ drone.maxWindResistance }} km/h</div>
                  </div>
                  <img :src="drone.image" alt="drone" class="w-32 h-32 object-cover" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <Carousel
        class="relative w-full max-w-xs"
        @init-api="(val) => emblaThumbnailApi = val"
      >
        <CarouselContent class="flex gap-1 ml-0">
          <CarouselItem v-for="(drone, index) in drones" :key="index" class="pl-0 basis-1/3 cursor-pointer" @click="onThumbClick(index)">
            <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <img :src="drone.image" alt="drone" class="w-16 h-12 object-cover" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </div>
</template>


<style scoped>
  .drone-carousel {
    display: flex;
    justify-content: center;
    gap: 1rem;
    max-width: 80vw;
  }
</style>