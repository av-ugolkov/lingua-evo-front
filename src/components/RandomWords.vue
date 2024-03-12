<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import require from "@/scripts/require";


let interval = 0
const loading = ref(true)
const error = ref(null)
const word = ref("")

onMounted(() => {
  fetchData();
  interval = setInterval(fetchData, 60000);
})

onUnmounted(() => {
  clearInterval(interval);
})

function fetchData() {
  require('/word/random?language_code=en', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      word.value = data["text"];
    })
    .catch((error) => {
      error.value = error;
      clearInterval(interval);
    }).finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <div class="container">
    <div class="grid-container">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else-if="error">
        {{ error }}
      </div>
      <div v-else>
        {{ word }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .grid-container {
    display: grid;
    place-items: center;
    height: 100vh;
  }
}
</style>