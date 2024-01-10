<template>
  <div class="container">
    <div class="grid-container">
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div v-else-if="error" class="error">
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

<script>

let interval = null

export default {
  name: "MainPage",
  data() {
    return {
      loading: true,
      word: ""
    };
  },
  created() {
    this.fetchData();
    interval = setInterval(this.fetchData, 5000);
  },
  // watch: {
  //   $route: "http://localhost:5000/word/get_random"
  // },
  methods: {
    fetchData() {
      this.error = null
      fetch('http://localhost:5000/word/get_random', {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language_code: 'en' })
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.word = data["text"]
        })
        .catch((error) => {
          this.error = error
          clearInterval(interval)
        }).finally(() => {
          this.loading = false
        });
    }
  }
};
</script>