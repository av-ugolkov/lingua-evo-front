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
  <router-view></router-view>
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

<script setup>
import { ref, onMounted } from "vue";

let interval = null
const loading = ref(true);
const error = ref(null);
const word = ref("");

onMounted(() => {
  created()
})

function created() {
  fetchData();
  interval = setInterval(fetchData, 60000);
}

function fetchData() {
  fetch('http://localhost:5000/word/get_random', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ language_code: 'en' })
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