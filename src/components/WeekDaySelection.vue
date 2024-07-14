<script setup lang="ts">
import { type Ref } from 'vue';

interface Props {
  day: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:day', 'update:loading', 'update:error'])

const days = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun']
const daysjson = [
    {daystring: 'Mon', daynum: 0},
    {daystring: 'Tue', daynum: 1},
    {daystring: 'Wen', daynum: 2},
    {daystring: 'Thu', daynum: 3},
    {daystring: 'Fri', daynum: 4},
    {daystring: 'Sat', daynum: 5},
    {daystring: 'Sun', daynum: 6}];

const selectDay = async (index: number) => {
  console.log('Selected day:', index)
  emit('update:day', daysjson[index])
}

</script>

<template>
  <div class="week-day-selection">    
    <footer>
      <div class="week-days flex gap-4">
        <div class="week-days flex gap-1">
          <div class="week-day" :class="{ 'selected': props.day === days[index] }" v-for="(day, index) in days" :key="index">
            <p class="text-center" @click="selectDay(index)">{{ day }}</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  .week-day-selection {
    margin-top: 8rem;

  }

  .week-days {
    justify-content: center;
  }

  .week-day {
    padding: 0.6rem;
    border-radius: 0.5rem;
    height: auto;
    width: auto;
    background-color: #f0f0f0;
    cursor: pointer;
  }

  .week-day:hover {
    background-color: #e0e0e0;
  }

  .week-day.selected {
    background-color: #333;
    color: white;
  }
</style>