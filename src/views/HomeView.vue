<script setup lang="ts">
import { onBeforeMount } from "vue";
import {MainData} from "@/assets/appdata/maindata";

onBeforeMount(async () => {
  const maindata = new MainData()
  await maindata.init("Velbert");
  console.log(maindata);
});
</script>

<template>
  <div>

  </div>
</template>
